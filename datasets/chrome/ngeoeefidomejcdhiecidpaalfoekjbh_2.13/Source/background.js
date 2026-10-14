// Import Transformers.js
import { pipeline, env } from './lib/transformers.js';

// Configure environment to skip local model check and disable threading for SW compatibility
env.allowLocalModels = false;
env.useBrowserCache = true;
env.backends.onnx.wasm.numThreads = 1;
env.backends.onnx.wasm.proxy = false;

// ─── Feature Flag (keep in sync with content.js) ─────────────────────────────
// Set to `true` to enable Dynamic Context (model will load, filter will run).
// Set to `false` to skip all model loading and semantic filtering entirely.
const DYNAMIC_CONTEXT_FEATURE_FLAG = false;
// ─────────────────────────────────────────────────────────────────────────────


class SemanticFilter {
  constructor() {
    this.pipe = null;
    this.initPromise = null; // Track loading state
    this.modelId = 'Xenova/all-MiniLM-L6-v2';
    this.activeSummaryVector = null;
    this.explicitIntentVector = null; // Layer 0: Explicit context request intent
  }

  async init() {
    // Hard stop — never load the model when DC is disabled
    if (!DYNAMIC_CONTEXT_FEATURE_FLAG) return;
    if (this.pipe) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = pipeline('feature-extraction', this.modelId)
      .then(async p => {
        this.pipe = p;
        console.log("🧠 Model Loaded!");

        // Precompute Layer 0 Intent Vector
        const seedText = EXPLICIT_CONTEXT_PHRASES.join(". ");
        const output = await this.pipe(seedText, { pooling: 'mean', normalize: true });
        this.explicitIntentVector = output.data;

        this.initPromise = null;
      })
      .catch(err => {
        console.error("🧠 Model Load Failed:", err);
        this.initPromise = null;
      });

    return this.initPromise;
  }

  async setCapsuleContext(summaryText) {
    if (!summaryText) return;
    await this.init();

    // 1. Vectorize for Layer 2
    const output = await this.pipe(summaryText, { pooling: 'mean', normalize: true });
    this.activeSummaryVector = output.data;

  }

  async checkRelevance(userInput, authToken = null) {
    // Dynamic Context (Semantic Filter) only for Elite and Enterprise
    const { tier } = await chrome.storage.local.get("tier");
    if (tier !== 'elite' && tier !== 'enterprise' && tier !== 'trial') {
      return { hasIntent: false, score: 0, layer: 0 };
    }

    // 0. Auto-Restore Context if missing
    if (!this.activeSummaryVector) {
      const { lastCapsuleId } = await chrome.storage.local.get("lastCapsuleId");
      if (lastCapsuleId) {
        // We need an authToken to fetch. If not provided, try to get it.
        const token = authToken || (await chrome.storage.local.get("authToken")).authToken;
        if (token) {
          try {
            // Re-use logic similar to GET_CAPSULES but simplified
            const res = await fetch(`${API_BASE_URL}/capsules/${lastCapsuleId}`, {
              headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
              const data = await res.json();
              const summary = data.summary || (data.content?.messages?.[0]?.content?.substring(0, 500));
              if (summary) {
                await this.setCapsuleContext(summary);
              }
            }
          } catch (err) {
            console.error("🧠 Semantic Filter: Restoration failed:", err);
          }
        }
      }
    }


    // Layer 0: Explicit Intent Check (Always run if query is short or contains keywords)
    // We run this first as it bypasses the need for capsule context.
    await this.init();
    if (this.pipe && this.explicitIntentVector) {
      const output = await this.pipe(userInput, { pooling: 'mean', normalize: true });
      const inputVector = output.data;
      const explicitScore = this.cosineSimilarity(this.explicitIntentVector, inputVector);

      // Threshold for explicit intent (high because we want to be sure)
      const isMathMatch = explicitScore > 0.75;

      // Explicit substring check (highly reliable for commands mixed into questions)
      const inputLower = userInput.toLowerCase();
      const isStringMatch = EXPLICIT_CONTEXT_PHRASES.some(phrase => inputLower.includes(phrase));

      const isExplicitMatch = isMathMatch || isStringMatch;

      if (isExplicitMatch) {
        return { hasIntent: true, score: explicitScore, layer: 0 };
      }
    }

    if (!this.pipe || !this.activeSummaryVector) {
      console.warn("🧠 Semantic Filter: Context or Model missing.");
      return { hasIntent: false, score: 0, layer: 0 };
    }

    // 2. Layer 2: Semantic Relevance
    // We already have the inputVector from Layer 0 if it ran
    const output = await this.pipe(userInput, { pooling: 'mean', normalize: true });
    const inputVector = output.data;
    const semanticScore = this.cosineSimilarity(this.activeSummaryVector, inputVector);

    const isSemanticMatch = semanticScore > 0.3; // Lowered from 0.4 for realistic chat queries


    return { hasIntent: isSemanticMatch, score: semanticScore, layer: 2 };
  }

  cosineSimilarity(vecA, vecB) {
    let dot = 0.0;
    let normA = 0.0;
    let normB = 0.0;
    for (let i = 0; i < vecA.length; i++) {
      dot += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

// Only instantiate when Dynamic Context is enabled — avoids allocating
// the pipeline object and loading the WASM/model when the flag is off.
const semanticFilter = DYNAMIC_CONTEXT_FEATURE_FLAG ? new SemanticFilter() : null;

// Regexes for modification
const ZERO_WIDTH_REGEX = /[\u200B-\u200D\uFEFF]/g;

// Explicit "get more context" phrases for fast local matching (Layer 0)
const EXPLICIT_CONTEXT_PHRASES = [
  "fetch more context",
  "need more context",
  "get more context",
  "more context please",
  "add more context",
  "load more context",
  "inject more context",
  "bring more context",
  "pull more context",
  "fetch context",
  "get context",
];

/* ========== MULTIMODAL: GEMINI PDF DOWNLOAD INTERCEPTION ========== */

let activeDownloadTasks = [];

chrome.downloads.onCreated.addListener((item) => {
  if (activeDownloadTasks.length === 0) return;
  chrome.downloads.cancel(item.id);

  const task = activeDownloadTasks.shift();
  clearTimeout(task.timeoutId);

  if (item.url.startsWith("blob:")) {
    task.sendResponse({ success: true, type: "blob_url", url: item.url, mime: item.mime || "application/octet-stream" });
    return;
  }

  // Layered fetch approach: 
  // 1. Try fetching without credentials (often works for short-lived token URLs and avoids CORS wildcard block)
  fetch(item.url)
    .then(r => {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.blob();
    })
    .catch(async (e) => {
      const r2 = await fetch(item.url, { credentials: 'include' });
      if (!r2.ok) throw new Error("HTTP " + r2.status);
      return r2.blob();
    })
    .then(async (blob) => {
      const base64 = await blobToBase64(blob);
      const basename = item.filename ? item.filename.split(/[\\/]/).pop() : null;
      task.sendResponse({ success: true, base64, mime: blob.type || item.mime || "application/octet-stream", filename: basename });
    })
    .catch(err => {
      task.sendResponse({ success: true, type: "blob_url", url: item.url, mime: item.mime || "application/octet-stream", fallback: true });
    });
});

/* ========== CLAUDE: NEW TAB WATCHER ========== */
// When Claude opens a PDF in a new tab, we capture the tab's URL and close it immediately.

let claudeTabWatcherCallback = null;
let claudeTabWatcherSourceTabId = null;

chrome.tabs.onCreated.addListener((tab) => {
  if (!claudeTabWatcherCallback) return;

  // Slight delay to let the tab's URL populate
  setTimeout(() => {
    chrome.tabs.get(tab.id, (freshTab) => {
      if (chrome.runtime.lastError || !freshTab) return;
      const url = freshTab.url || freshTab.pendingUrl || '';

      // Only intercept tabs spawned from our watched Claude tab
      if (freshTab.openerTabId !== claudeTabWatcherSourceTabId) return;

      // Close the tab immediately
      chrome.tabs.remove(tab.id, () => { });

      if (claudeTabWatcherCallback) {
        claudeTabWatcherCallback({ success: true, url });
        claudeTabWatcherCallback = null;
        claudeTabWatcherSourceTabId = null;
      }
    });
  }, 300);
});


function blobToBase64(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
const API_BASE_URL = "https://backend.tilantra.com";
//const API_BASE_URL = "http://localhost:8000";

/* ========== END MULTIMODAL ADDITIONS ========== */

// Set uninstall URL for feedback
chrome.runtime.setUninstallURL("https://forms.gle/G5jFAiHe8XgrKjP86");

const CLIENT_ID = '750844809451-u97uohm07ij7ujj6djrpgr0qgfdj6n7k.apps.googleusercontent.com';
const REDIRECT_URI = chrome.identity.getRedirectURL();
const SCOPES = ["email", "profile"].join(" ");

// Listen for messages from the Guidera website to sync login
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  if (request.type === "SYNC_AUTH") {
    const { authToken, authExp, userEmail, tier, username } = request.payload;
    if (authToken && authExp && userEmail) {
      const updateData = { authToken, authExp, userEmail };
      if (tier) updateData.tier = tier;
      if (username) updateData.username = username;

      chrome.storage.local.set(updateData, () => {
        sendResponse({ success: true });
      });
      return true; // Keep channel open for async response
    } else {
      sendResponse({ success: false, error: "Missing payload data" });
    }
  }
});

const CONTROL_CHARS_REGEX = /[\x00-\x08\x0B\x0C\x0E-\x1F]/g;
const CODE_FENCE_REGEX = /```[\s\S]*?```/g;
const INLINE_CODE_REGEX = /`([^ `]*)`/g;

function normalizeUnicode(text) {
  return text.normalize("NFKC");
}

function cleanLLMText(text) {
  if (!text || typeof text !== "string") return "";

  let cleaned = text;

  // 1. Normalize unicode
  cleaned = normalizeUnicode(cleaned);
  // 2. Remove zero-width chars
  cleaned = cleaned.replace(ZERO_WIDTH_REGEX, "");
  // 3. Remove control characters
  cleaned = cleaned.replace(CONTROL_CHARS_REGEX, "");
  // 4. Strip markdown code fences
  cleaned = cleaned.replace(CODE_FENCE_REGEX, match =>
    match.replace(/```/g, "")
  );
  // 5. Remove inline backticks
  cleaned = cleaned.replace(INLINE_CODE_REGEX, "$1");
  // 6. Normalize smart quotes
  cleaned = cleaned
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'");
  // 7. Normalize excessive whitespace
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  return cleaned;
}

function fetchUserProfile(token, sendResponse) {
  let userProfile = null;
  fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(profile => {
      userProfile = profile;
      return fetch(`${API_BASE_URL}/users/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });
    })
    .then(res => {
      if (!res.ok) throw new Error("Google login failed on backend");
      return res.json();
    })
    .then(data => {
      if (!data.email && userProfile && userProfile.email) {
        data.email = userProfile.email;
      }
      if (data.tier) {
        chrome.storage.local.set({ tier: data.tier });
      }
      // Ensure tokens are saved in background as well for immediate consistency
      const tokenToSave = data.authToken || data.token;
      const expToSave = data.authExp || data.exp;
      if (tokenToSave) {
        chrome.storage.local.set({
          authToken: tokenToSave,
          authExp: expToSave,
          userEmail: data.email
        });
      }
      sendResponse({ success: true, data });
    })
    .catch(err => {
      console.error("Login flow error:", err);
      sendResponse({ success: false, error: err.toString() });
    });
}

/* ========== ATTACHMENT HELPERS ========== */

async function uploadAttachment(att, authToken) {
  // Strip data URI prefix (e.g., "data:image/png;base64,") if present
  let base64Data = att.base64 || "";
  if (base64Data.includes(";base64,")) {
    base64Data = base64Data.split(";base64,")[1];
  }

  const payload = {
    base64_data: base64Data,
    filename: att.filename,
    content_type: att.mime || att.type
  };

  const res = await fetch(`${API_BASE_URL}/capsules/attachments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    let errText = "";
    try { errText = await res.text(); } catch (e) { }
    throw new Error(`Upload failed: ${res.status} ${res.statusText} - ${errText}`);
  }
  return res.json();
}

async function fetchAttachmentContent(assetId, authToken) {
  const res = await fetch(`${API_BASE_URL}/capsules/attachments/${assetId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${authToken}`
    }
  });

  if (!res.ok) {
    console.error(`❌ [Background] Fetch failed for ${assetId}: ${res.status} ${res.statusText}`);
    throw new Error(`Fetch failed: ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}

const getResults = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data.results || data.capsules || [];
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  /* ========== MULTIMODAL: IMAGE & PDF HELPERS FOR GEMINI ========== */

  if (request.action === "downloadImage") {
    fetch(request.url, { credentials: 'include', cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.blob();
      })
      .then(blob => blobToBase64(blob))
      .then(base64 => sendResponse({ success: true, base64 }))
      .catch(err => {
        console.warn(`downloadImage failed: ${err.message}`);
        sendResponse({ success: false, error: err.toString() });
      });
    return true;
  }

  if (request.action === "expectDownload") {
    const task = {
      sendResponse,
      timeoutId: null
    };
    task.timeoutId = setTimeout(() => {
      const idx = activeDownloadTasks.indexOf(task);
      if (idx !== -1) {
        activeDownloadTasks.splice(idx, 1);
        sendResponse({ success: false, error: "Timeout" });
      }
    }, 15000);
    activeDownloadTasks.push(task);
    return true;
  }

  if (request.action === "cancelExpectDownload") {
    // Content script found an inline viewer path — cancel the oldest pending task immediately
    if (activeDownloadTasks.length > 0) {
      const task = activeDownloadTasks.shift();
      clearTimeout(task.timeoutId);
      task.sendResponse({ success: false, error: "Cancelled" });
    }
    sendResponse({ success: true });
    return false;
  }

  if (request.action === "watchClaudeTab") {
    // Start watching for new tabs opened from this Claude tab
    claudeTabWatcherCallback = sendResponse;
    claudeTabWatcherSourceTabId = sender.tab?.id || request.sourceTabId || null;
    // Auto-cancel after 3 seconds if no new tab appeared
    setTimeout(() => {
      if (claudeTabWatcherCallback) {
        claudeTabWatcherCallback({ success: false, reason: 'timeout' });
        claudeTabWatcherCallback = null;
        claudeTabWatcherSourceTabId = null;
      }
    }, 3000);
    return true; // async response
  }

  if (request.action === "stopClaudeTabWatch") {
    // Content script is aborting the watch early (e.g. modal opened instead)
    if (claudeTabWatcherCallback) {
      claudeTabWatcherCallback({ success: false, reason: 'cancelled' });
      claudeTabWatcherCallback = null;
      claudeTabWatcherSourceTabId = null;
    }
    sendResponse({ success: true });
    return false;
  }


  /* ========== END MULTIMODAL HELPERS ========== */

  if (request.type === "generateCapsule") {

    chrome.storage.local.get(["authToken", "selectedTeam"], async ({ authToken, selectedTeam }) => {
      if (!authToken) {
        sendResponse({ success: false, error: "Not authenticated" });
        return;
      }

      try {
        const rawAttachments = request.payload.attachments || [];
        const attachmentIds = [];

        // 1. Upload attachments individually
        if (rawAttachments.length > 0) {
          for (const att of rawAttachments) {
            try {
              const data = await uploadAttachment(att, authToken);
              if (data.asset_id) {
                attachmentIds.push(data.asset_id);
              }
            } catch (err) {
              console.error(`❌ Failed to upload ${att.filename}:`, err);
            }
          }
        }

        // 2. Clean the messages
        const cleanedMessages = request.payload.messages.map(msg => ({
          role: (msg.role === "user" || msg.role === "system") ? msg.role : "assistant",
          content: cleanLLMText(msg.text || msg.content)
        }));


        const payload = {
          content: {
            messages: cleanedMessages,
            metadata: {
              source: "chrome-extension"
            }
          },
          attachment_ids: attachmentIds,
          extracted_from: request.payload.extracted_from || "unknown",
          tag: request.payload.tag || "auto-generated",
          team: (selectedTeam === "" || selectedTeam === null) ? "" : (selectedTeam || ""),
          conversation_id: request.payload.conversationId
        };

        const res = await fetch(`${API_BASE_URL}/capsules`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          let errMsg = `Creation failed: ${res.statusText}`;
          try {
            const errData = await res.json();
            errMsg = errData.detail || errData.message || JSON.stringify(errData);
          } catch (e) {
            try { errMsg = await res.text(); } catch (e2) { }
          }
          throw new Error(errMsg);
        }
        const data = await res.json();

        // Store last capsule ID
        const capsuleId = data.capsule_id || data.id;
        if (capsuleId) {
          chrome.storage.local.set({ lastCapsuleId: capsuleId });
        }

        // Track when the last capsule was created for the idle nudge feature
        chrome.storage.local.set({ lastCapsuleCreatedAt: Date.now() });

        // Set semantic context after we have the summary (only when DC feature is ON)
        if (DYNAMIC_CONTEXT_FEATURE_FLAG) {
          if (data.summary) {
            await semanticFilter.setCapsuleContext(data.summary);
          } else if (cleanedMessages.length > 0) {
            await semanticFilter.setCapsuleContext(cleanedMessages[0].content.substring(0, 500));
          }
        }

        sendResponse({ success: true, data });

      } catch (err) {
        console.error("❌ generateCapsule Error:", err);
        sendResponse({ success: false, error: err.toString() });
      }
    });

    return true; // keep channel open
  }

  if (request.type === "getCapsule") {
    chrome.storage.local.get("authToken", ({ authToken }) => {
      if (!authToken) {
        sendResponse({ success: false, error: "Not authenticated" });
        return;
      }

      const capsuleId = request.payload.capsuleId;
      const conversationId = request.payload.conversationId;
      if (!capsuleId) {
        sendResponse({ success: false, error: "No capsuleId provided" });
        return;
      }

      let url = `${API_BASE_URL}/capsules/${capsuleId}`;
      if (conversationId) {
        url += `?conversation_id=${encodeURIComponent(conversationId)}`;
      }

      fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      })
        .then(async res => {
          if (!res.ok) {
            let detail = res.statusText;
            try { const body = await res.json(); if (body?.detail) detail = body.detail; } catch (_) {}
            throw new Error(detail);
          }
          return res.json();
        })
        .then(data => {
          // Cache the summary and set as active capsule (only when DC feature is ON)
          if (DYNAMIC_CONTEXT_FEATURE_FLAG) {
            if (data.summary) {
              semanticFilter.setCapsuleContext(data.summary);
            } else if (data.content && data.content.messages && data.content.messages.length > 0) {
              semanticFilter.setCapsuleContext(data.content.messages[0].content.substring(0, 500));
            }
          }
          chrome.storage.local.set({ lastCapsuleId: capsuleId });
          sendResponse({ success: true, data });
        })
        .catch(err =>
          sendResponse({ success: false, error: err.toString() })
        );
    });

    return true;
  }

  /* NEW HANDLERS */

  if (request.type === "LOGIN") {
    const { email, password } = request.payload;
    fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (!res.ok) throw new Error("Invalid credentials");
        return res.json();
      })
      .then(data => {
        if (data.tier) {
          chrome.storage.local.set({ tier: data.tier });
        }
        sendResponse({ success: true, data });
      })
      .catch(err => sendResponse({ success: false, error: err.toString() }));
    return true;
  }

  if (request.type === "START_GOOGLE_LOGIN") {
    const authUrl = new URL('https://accounts.google.com/o/oauth2/auth');
    authUrl.searchParams.set('client_id', CLIENT_ID);
    authUrl.searchParams.set('response_type', 'token');
    authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.set('scope', SCOPES);
    authUrl.searchParams.set('prompt', 'select_account');

    chrome.identity.launchWebAuthFlow({
      url: authUrl.href,
      interactive: true
    }, (redirectUrl) => {
      if (chrome.runtime.lastError || !redirectUrl) {
        console.error("Login failed:", chrome.runtime.lastError?.message);
        sendResponse({ success: false, error: chrome.runtime.lastError?.message || "Login failed" });
        return;
      }

      const urlHash = new URL(redirectUrl).hash;
      const params = new URLSearchParams(urlHash.substring(1));
      const token = params.get('access_token');

      if (token) {
        fetchUserProfile(token, sendResponse);
      } else {
        sendResponse({ success: false, error: "Token not found in redirect" });
      }
    });

    return true; // Keep channel open
  }

  if (request.type === "GOOGLE_LOGIN") {
    const { token } = request.payload;
    fetch(`${API_BASE_URL}/users/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    })
      .then(res => {
        if (!res.ok) throw new Error("Google login failed on backend");
        return res.json();
      })
      .then(data => {
        if (data.tier) {
          chrome.storage.local.set({ tier: data.tier });
        }
        sendResponse({ success: true, data });
      })
      .catch(err => sendResponse({ success: false, error: err.toString() }));
    return true;
  }

  if (request.type === "GET_USER_TEAMS") {
    chrome.storage.local.get(["authToken", "userEmail"], ({ authToken, userEmail }) => {

      if (!authToken || !userEmail) {
        console.error("❌ Not authenticated");
        sendResponse({ success: false, error: "Not authenticated" });
        return;
      }

      // First, get user data to retrieve team IDs
      const userUrl = `${API_BASE_URL}/users/getsingleUser?email=${encodeURIComponent(userEmail)}`;

      fetch(userUrl, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error(`Failed to fetch user details: ${res.status}`);
          return res.json();
        })
        .then(async userData => {
          const userTeams = userData.teams || [];
          const tier = userData.tier || "basic";

          // Store tier
          chrome.storage.local.set({ tier: tier });

          // If no teams, return empty array
          if (userTeams.length === 0) {
            sendResponse({ success: true, teams: [], username: userData.username });
            return;
          }

          // Extract team IDs from the teams array (handle both string IDs and objects)
          const teamIds = userTeams.map(team => {
            if (typeof team === 'string') return team;
            if (team.team_id) return team.team_id;
            if (team.id) return team.id;
            return null;
          }).filter(Boolean);


          // Fetch detailed info for each team
          const teamPromises = teamIds.map(teamId => {
            const teamUrl = `${API_BASE_URL}/teams/${teamId}`;
            return fetch(teamUrl, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${authToken}`
              }
            })
              .then(res => {
                return res.ok ? res.json() : null;
              })
              .catch(err => {
                console.error(`❌ Error fetching team ${teamId}:`, err);
                return null;
              });
          });

          const teams = await Promise.all(teamPromises);
          const validTeams = teams.filter(team => team !== null);

          sendResponse({ success: true, teams: validTeams, username: userData.username, tier: tier });
        })
        .catch(err => {
          console.error("❌ GET_USER_TEAMS error:", err);
          sendResponse({ success: false, error: err.toString() });
        });
    });
    return true;
  }

  if (request.type === "GET_CAPSULES") {
    const { team, authToken } = request.payload;
    const authHeader = { "Authorization": `Bearer ${authToken}` };


    let url;
    if (team === "ALL") {
      url = `${API_BASE_URL}/capsules/user/all-teams-collection`;
    } else if (team === "") {
      url = `${API_BASE_URL}/capsules/private`;
    } else {
      url = `${API_BASE_URL}/capsules/team/${encodeURIComponent(team)}`;
    }

    fetch(url, {
      method: "GET",
      headers: authHeader
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch capsules");
        return res.json();
      })
      .then(data => {
        const results = getResults(data);

        // Cache the newest capsule's timestamp for the idle nudge feature
        if (results.length > 0) {
          const newest = results.reduce((a, b) =>
            new Date(a.created_at || 0) > new Date(b.created_at || 0) ? a : b
          );
          if (newest.created_at) {
            chrome.storage.local.set({ lastCapsuleCreatedAt: new Date(newest.created_at).getTime() });
          }
        }

        sendResponse({ success: true, results });
      })
      .catch(err => sendResponse({ success: false, error: err.toString() }));
    return true;
  }

  if (request.type === "GET_FEATURED_CAPSULES") {
    fetch(`${API_BASE_URL}/capsules/featured`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch featured capsules");
        return res.json();
      })
      .then(data => sendResponse({ success: true, results: getResults(data) }))
      .catch(err => sendResponse({ success: false, error: err.toString() }));
    return true;
  }

  if (request.type === "CHECK_CONVO_MAPPING") {
    const { conversationId } = request.payload;

    chrome.storage.local.get(["authToken", "localConvoMappings"], ({ authToken, localConvoMappings = {} }) => {
      // 1. Check local cache first
      if (localConvoMappings[conversationId]) {
        sendResponse({
          success: true,
          data: {
            capsule_id: localConvoMappings[conversationId],
            source: 'local'
          }
        });
        return;
      }

      // 2. Fallback to backend
      if (!authToken) {
        sendResponse({ success: false, error: "Not authenticated" });
        return;
      }
      fetch(`${API_BASE_URL}/capsules/convo-mapping/${conversationId}`, {
        headers: { "Authorization": `Bearer ${authToken}` }
      })
        .then(res => res.json())
        .then(data => {
          sendResponse({ success: true, data });
        })
        .catch(err => {
          console.error("❌ [CHECK_CONVO_MAPPING] Error:", err);
          sendResponse({ success: false, error: err.toString() });
        });
    });
    return true;
  }

  if (request.type === "ENHANCE_PROMPT") {
    const { prompt, history } = request.payload;

    let combinedPrompt = prompt;
    if (history && Array.isArray(history) && history.length > 0) {
      // Limit to the last 6 messages to prevent hitting token/size limits
      const slicedHistory = history.slice(-6);
      const historyText = slicedHistory
        .map(msg => `${(msg.role || "user").toUpperCase()}: ${msg.text || msg.content || ""}`)
        .join('\n\n');
      combinedPrompt = `**CONVERSATION HISTORY**:\n\n${historyText}\n\n---\n\nUsing the conversation history above as context, please enhance the following current prompt:\n\n${prompt}`;
    }

    chrome.storage.local.get("authToken", ({ authToken }) => {
      if (!authToken) {
        sendResponse({ success: false, error: "Not authenticated" });
        return;
      }
      fetch(`${API_BASE_URL}/suggestion`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: combinedPrompt })
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch suggestions");
          return res.json();
        })
        .then(data => {
          sendResponse({ success: true, suggestions: data.suggestions || [] });
        })
        .catch(err => {
          console.error("❌ [ENHANCE_PROMPT] Error:", err);
          sendResponse({ success: false, error: err.toString() });
        });
    });
    return true;
  }

  if (request.type === "CREATE_TEAM") {
    const { name, description, color_tag } = request.payload;
    chrome.storage.local.get("authToken", ({ authToken }) => {
      if (!authToken) {
        sendResponse({ success: false, error: "Not authenticated" });
        return;
      }

      fetch(`${API_BASE_URL}/teams/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({ name, description, color_tag })
      })
        .then(async res => {
          if (!res.ok) {
            let errMsg = "Failed to create team";
            try {
              const errData = await res.json();
              errMsg = errData.detail || errData.message || JSON.stringify(errData);
            } catch (e) {
              try { errMsg = await res.text(); } catch (e2) { }
            }
            throw new Error(errMsg);
          }
          return res.json();
        })
        .then(data => sendResponse({ success: true, data }))
        .catch(err => sendResponse({ success: false, error: err.toString() }));
    });
    return true;
  }

  if (request.type === "GET_TEAM_DETAILS") {
    const { teamId } = request.payload;
    chrome.storage.local.get("authToken", ({ authToken }) => {
      if (!authToken) {
        sendResponse({ success: false, error: "Not authenticated" });
        return;
      }

      fetch(`${API_BASE_URL}/teams/${teamId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch team details");
          return res.json();
        })
        .then(data => sendResponse({ success: true, data }))
        .catch(err => sendResponse({ success: false, error: err.toString() }));
    });
    return true;
  }

  if (request.type === "ADD_TEAM_MEMBER") {
    const { teamId, email } = request.payload;
    chrome.storage.local.get("authToken", ({ authToken }) => {
      if (!authToken) {
        sendResponse({ success: false, error: "Not authenticated" });
        return;
      }

      fetch(`${API_BASE_URL}/teams/${teamId}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({ email })
      })
        .then(async res => {
          if (!res.ok) {
            let errMsg = "Failed to add member";
            try {
              const errData = await res.json();
              errMsg = errData.detail || errData.message || JSON.stringify(errData);
            } catch (e) {
              try { errMsg = await res.text(); } catch (e2) { }
            }
            throw new Error(errMsg);
          }
          return res.json();
        })
        .then(data => sendResponse({ success: true, data }))
        .catch(err => sendResponse({ success: false, error: err.toString() }));
    });
    return true;
  }

  if (request.type === "REMOVE_TEAM_MEMBER") {
    const { teamId, email } = request.payload;
    chrome.storage.local.get("authToken", ({ authToken }) => {
      if (!authToken) {
        sendResponse({ success: false, error: "Not authenticated" });
        return;
      }

      fetch(`${API_BASE_URL}/teams/${teamId}/members/${encodeURIComponent(email)}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      })
        .then(async res => {
          if (!res.ok) {
            let errMsg = "Failed to remove member";
            try {
              const errData = await res.json();
              errMsg = errData.detail || errData.message || JSON.stringify(errData);
            } catch (e) {
              try { errMsg = await res.text(); } catch (e2) { }
            }
            throw new Error(errMsg);
          }
          return res.json();
        })
        .then(data => sendResponse({ success: true, data }))
        .catch(err => sendResponse({ success: false, error: err.toString() }));
    });
    return true;
  }

  if (request.type === "DELETE_TEAM") {
    const { teamId } = request.payload;
    chrome.storage.local.get("authToken", ({ authToken }) => {
      if (!authToken) {
        sendResponse({ success: false, error: "Not authenticated" });
        return;
      }

      fetch(`${API_BASE_URL}/teams/${teamId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to delete team");
          sendResponse({ success: true });
        })
        .catch(err => sendResponse({ success: false, error: err.toString() }));
    });
    return true;
  }

  if (request.type === "createCapsuleVersion") {
    const { capsuleId, messages, extracted_from, attachments } = request.payload;
    chrome.storage.local.get(["authToken"], async ({ authToken }) => {
      if (!authToken) {
        sendResponse({ success: false, error: "Not authenticated" });
        return;
      }

      try {
        const rawAttachments = attachments || [];
        const attachmentIds = [];

        // 1. Upload attachments individually
        if (rawAttachments.length > 0) {
          for (const att of rawAttachments) {
            try {
              const data = await uploadAttachment(att, authToken);
              if (data.asset_id) {
                attachmentIds.push(data.asset_id);
              }
            } catch (err) {
              console.error(`❌ Failed to upload ${att.filename}:`, err);
            }
          }
        }

        // 2. Clean the messages
        const cleanedMessages = messages.map(msg => ({
          role: (msg.role === "user" || msg.role === "system") ? msg.role : "assistant",
          content: cleanLLMText(msg.text || msg.content)
        }));

        const payload = {
          content: {
            messages: cleanedMessages,
            metadata: { source: "chrome-extension" }
          },
          attachment_ids: attachmentIds,
          extracted_from: extracted_from || "unknown"
        };

        const res = await fetch(`${API_BASE_URL}/capsules/${capsuleId}/versions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          let errMsg = `Version creation failed: ${res.statusText}`;
          try {
            const errData = await res.json();
            errMsg = errData.detail || errData.message || JSON.stringify(errData);
          } catch (e) {
            try { errMsg = await res.text(); } catch (e2) { }
          }
          throw new Error(errMsg);
        }
        const data = await res.json();
        sendResponse({ success: true, data });

      } catch (err) {
        console.error("❌ Version Creation Error:", err);
        sendResponse({ success: false, error: err.toString() });
      }
    });
    return true;
  }

  if (request.type === "DELETE_CAPSULE") {
    const { capsuleId, authToken } = request.payload;
    fetch(`${API_BASE_URL}/capsules/${capsuleId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    })
      .then(async res => {
        if (!res.ok) {
          let errMsg = "Failed to delete capsule";
          try {
            const errData = await res.json();
            errMsg = errData.detail || errData.message || JSON.stringify(errData);
          } catch (e) {
            try { errMsg = await res.text(); } catch (e2) { }
          }
          throw new Error(errMsg);
        }
        return res.json();
      })
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.toString() }));
    return true;
  }

  if (request.type === "UPDATE_CAPSULE_TAG") {
    const { capsuleId, tag, authToken } = request.payload;
    fetch(`${API_BASE_URL}/capsules/${capsuleId}/tag`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({ tag })
    })
      .then(async res => {
        if (!res.ok) {
          let errMsg = "Failed to update tag";
          try {
            const errData = await res.json();
            errMsg = errData.detail || errData.message || JSON.stringify(errData);
          } catch (e) {
            try { errMsg = await res.text(); } catch (e2) { }
          }
          throw new Error(errMsg);
        }
        return res.json();
      })
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.toString() }));
    return true;
  }

  if (request.type === "UPDATE_CAPSULE_TEAM") {
    const { capsuleId, team, authToken } = request.payload;
    fetch(`${API_BASE_URL}/capsules/${capsuleId}/team`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({ team })
    })
      .then(async res => {
        if (!res.ok) {
          let errMsg = "Failed to update team";
          try {
            const errData = await res.json();
            errMsg = errData.detail || errData.message || JSON.stringify(errData);
          } catch (e) {
            try { errMsg = await res.text(); } catch (e2) { }
          }
          throw new Error(errMsg);
        }
        return res.json();
      })
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.toString() }));
    return true;
  }

  if (request.type === "OPEN_POPUP") {
    if (chrome.action && typeof chrome.action.openPopup === 'function') {
      chrome.action.openPopup().catch(err => {
        console.error("❌ Failed to open popup:", err);
      });
    } else {
      console.warn("⚠️ chrome.action.openPopup is not available in this browser version.");
    }
    return false;
  }

  // Download attachment with CORS bypass
  if (request.type === "downloadAttachment") {
    const isS3 = request.payload.url.includes('s3.amazonaws.com');
    const fetchOptions = {
      cache: 'no-store',
      // S3 presigned URLs often reject requests with credentials/cookies
      credentials: isS3 ? 'omit' : 'include'
    };

    fetch(request.payload.url, fetchOptions)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);

        let contentType = r.headers.get('content-type') || '';
        // Clean up common generic types
        if (contentType.toLowerCase() === 'binary/octet-stream') contentType = 'application/octet-stream';

        // Strategy: If it's JSON, it's likely a redirect to a download_url (New ChatGPT style)
        if (contentType.includes('application/json')) {
          const cloned = r.clone();
          const json = await cloned.json();
          if (json.download_url) {
            return fetch(json.download_url, { credentials: 'include', cache: 'no-store' }).then(res => {
              return { res, contentType: res.headers.get('content-type') || contentType };
            });
          }
        }

        return { res: r, contentType };
      })
      .then(async ({ res: r, contentType }) => {
        if (!r || !r.ok) throw new Error("Redirect fetch failed or no response");
        const blob = await r.blob();
        const base64 = await blobToBase64(blob);
        // Use the blob's type if the header was generic
        const finalMime = (contentType === 'application/octet-stream' && blob.type) ? blob.type : contentType;
        sendResponse({ success: true, base64, mime: finalMime });
      })
      .catch(err => {
        console.warn(`Attachment download failed: ${err.message}`);
        sendResponse({ success: false, error: err.toString() });
      });
    return true;
  }

  if (request.type === "GET_ATTACHMENT_CONTENT") {
    const { assetId } = request.payload;
    chrome.storage.local.get("authToken", ({ authToken }) => {
      if (!authToken) {
        console.error("❌ [Background] Auth token missing in GET_ATTACHMENT_CONTENT");
        sendResponse({ success: false, error: "Not authenticated" });
        return;
      }
      fetchAttachmentContent(assetId, authToken)
        .then(data => {
          sendResponse({ success: true, data });
        })
        .catch(err => {
          console.error(`❌ [Background] Error handling GET_ATTACHMENT_CONTENT for ${assetId}:`, err);
          sendResponse({ success: false, error: err.toString() });
        });
    });
    return true;
  }

  if (request.type === "RUN_FAST_FILTER") {
    // Short-circuit: feature is off — no model load, no filtering
    if (!DYNAMIC_CONTEXT_FEATURE_FLAG) {
      sendResponse({ success: true, shouldInterfere: false });
      return true;
    }

    const { input, history, conversationId } = request.payload;

    chrome.storage.local.get(["authToken", "lastCapsuleId"], async ({ authToken, lastCapsuleId }) => {
      if (!authToken) {
        console.warn("🔍 [DynamicContext] ✖ Aborted: Missing authToken");
        sendResponse({ success: false, error: "Missing authToken" });
        return;
      }
      if (!lastCapsuleId) {
        console.warn("🔍 [DynamicContext] ✖ Aborted: Missing lastCapsuleId");
        sendResponse({ success: false, error: "Missing lastCapsuleId" });
        return;
      }

      // ── Layer 0 & 2: Intent Detection ────────────────────────────
      const { hasIntent, score, layer } = await semanticFilter.checkRelevance(input, authToken);

      // ── Context-Aware Query Construction ─────────────────────────
      // Find the most recent assistant message to provide semantic depth for RAG.
      // This helps when the user asks a follow-up ("tell me more") about the AI's last response.
      const prevAIMsg = [...history.slice(0, -1)].reverse().find(m =>
        (m.role === 'assistant' || m.role === 'model' || m.role === 'AI') && (m.text || m.content)
      );
      const prevText = prevAIMsg ? (prevAIMsg.text || prevAIMsg.content || "").trim() : "";
      const combinedQuery = prevText ? `${prevText}\n${input}` : input;

      // If Layer 0 (Explicit Intent) matches, we bypass Layer 1 (History) 
      if (hasIntent && layer === 0) {
        triggerFetch(combinedQuery);
        return;
      }

      // Layer 1: History Check (Redundancy Guard for Layer 2)
      const relevantHistory = history.slice(0, -1);
      const searchStr = input.toLowerCase().substring(0, 60);

      const isAlreadyInHistory = relevantHistory.some(msg => {
        const text = (msg.text || msg.content || "").toLowerCase();
        if (text.includes(searchStr)) {
          return true;
        }
        return false;
      });

      if (isAlreadyInHistory) {
        sendResponse({ success: true, shouldInterfere: false });
        return;
      }

      // Layer 2: Semantic Relevance Check
      if (hasIntent && layer === 2) {
        triggerFetch(combinedQuery);
      } else {
        sendResponse({ success: true, shouldInterfere: false, score, layer });
      }

      function triggerFetch(queryText) {
        // Trigger Dynamic Context Fetch with augmented query
        fetchDetailedContext(conversationId || lastCapsuleId, queryText, authToken)
          .then(context => {
            sendResponse({
              success: true,
              shouldInterfere: true,
              context,
              capsuleId: lastCapsuleId,
              score: score,
              layer: layer
            });
          })
          .catch(err => {
            console.error("🔍 [DynamicContext] ❌ fetchDetailedContext FAILED:", err);
            sendResponse({ success: false, error: err.toString() });
          });
      }
    });
    return true;
  }
});

// Proactive Initialization on background load
if (DYNAMIC_CONTEXT_FEATURE_FLAG && semanticFilter) {
  semanticFilter.init();
}


// Real API for Deep Context Retrieval via RAG
async function fetchDetailedContext(conversationId, query, token) {

  const payload = {
    conversation_id: conversationId,
    query_text: query,
    top_k: 3
  };

  try {
    const res = await fetch(`${API_BASE_URL}/capsules/dynamic-context`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`Backend Error: ${res.status} ${res.statusText}`);

    const data = await res.json();

    if (!data.chunks || data.chunks.length === 0) {
      return null;
    }

    // Deduplicate chunks based on text content to avoid redundancy
    const uniqueChunks = [];
    const seenTexts = new Set();

    (data.chunks || []).forEach(chunk => {
      const text = (chunk.text || "").trim();
      if (text && !seenTexts.has(text)) {
        seenTexts.add(text);
        uniqueChunks.push(chunk);
      }
    });

    if (uniqueChunks.length === 0) {
      return null;
    }

    // Format the chunks into a readable block for LLM injection
    let contextBlock = "Relevant snippets found in Capsule:\n\n";

    uniqueChunks.forEach((chunk, i) => {
      const source = chunk.metadata?.source || "Unknown source";
      const page = chunk.metadata?.page ? ` (Page ${chunk.metadata.page})` : "";
      contextBlock += `--- Snippet ${i + 1} [Source: ${source}${page}] ---\n`;
      contextBlock += `${chunk.text}\n\n`;
    });

    return contextBlock;

  } catch (err) {
    console.error("❌ [Background] fetchDetailedContext failed:", err);
    throw err;
  }
}




