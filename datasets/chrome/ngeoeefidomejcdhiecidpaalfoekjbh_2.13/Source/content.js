/**********************************************************
 * Utilities (TOP-LEVEL — shared by everything)
 **********************************************************/
let currentPlatform = detectPlatform();
let isGenerating = false;
let isBypassingFilter = false;

// ─── Feature Flag ────────────────────────────────────────────────────────────
// Set to `true` to enable Dynamic Context globally (toggle visible, feature active).
// Set to `false` to disable it for ALL chats — the toggle is hidden from the UI
// and the feature is fully gated; nothing needs to be removed/commented out.
const DYNAMIC_CONTEXT_FEATURE_FLAG = false;
// ─────────────────────────────────────────────────────────────────────────────

// Dynamic Context toggle & Tier — loaded from storage
let dynamicContextEnabled = DYNAMIC_CONTEXT_FEATURE_FLAG ? true : false;
let userTier = 'basic';

chrome.storage.local.get(["dynamicContextEnabled", "tier"], (data) => {
  // Only honour the stored preference when the feature flag is ON.
  dynamicContextEnabled = DYNAMIC_CONTEXT_FEATURE_FLAG
    ? ((data.dynamicContextEnabled === undefined) ? true : data.dynamicContextEnabled)
    : false;
  userTier = data.tier || 'basic';
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.dynamicContextEnabled)
    // Only apply the change when the feature flag is ON.
    dynamicContextEnabled = DYNAMIC_CONTEXT_FEATURE_FLAG ? changes.dynamicContextEnabled.newValue : false;
  if (changes.tier) userTier = changes.tier.newValue;
});

// Injection Constants
const CONTEXT_MARKERS = [
  "Adding capsule context",
  "Adding Context of Capsule",
  "Additional Context:",
  "**ACTIVE CAPSULE CONTEXT**",
  "Adding capsule context to this conversation! Say Hi."
];
const INJECTION_SUFFIX = "\n\nAdding capsule context to this conversation! Say Hi.";
const SEND_WAIT = 3000;
const CLEANUP_WAIT = 4000;
const STOP_WAIT = 4000;

function toggleLoading(loading) {
  isGenerating = loading;
  const btn = document.getElementById('tilantra-capsule-chat-button');
  if (btn) {
    if (loading) btn.classList.add('loading');
    else btn.classList.remove('loading');
  }

  const batchBtn = document.getElementById('capsule-batch-generate-btn');
  if (batchBtn) {
    if (loading) {
      batchBtn.innerHTML = '<div class="tilantra-capsule-loader" style="display:block"></div> Processing...';
      batchBtn.disabled = true;
    } else {
      batchBtn.innerHTML = getBatchButtonInnerHtml();
      batchBtn.disabled = false;
      updateBatchButton();
    }
  }

  // Notify extension popup
  if (isContextValid()) {
    chrome.runtime.sendMessage({ type: loading ? "GENERATION_STARTED" : "GENERATION_COMPLETE" });
  }
}

/**********************************************************
 * MESSAGE HANDLERS
 **********************************************************/

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  if (msg.type === "GET_CHAT_TITLE") {
    sendResponse({ title: getChatTitle() });
    return false;
  }
  if (msg.type === "RELOAD_PAGE") {
    window.location.reload(true);
    sendResponse({ success: true });
    return false;
  }
  // Use an async IIFE for the remaining logic
  (async () => {
    /* ===== GENERATE SUMMARY ===== */
    if (msg.type === "GENERATE_SUMMARY") {
      const tag = msg.payload?.tag || "auto-generated";


      if (currentPlatform.startsWith("chatgpt")) {
        // ChatGPT flow (covers chatgpt + chatgpt-project)
        try {
          toggleLoading(true);
          await waitForMessagesFromChatGPT();
          const msgs = await getMessagesFromChatGPT();
          await generateCapsuleFromMessages(msgs, tag);
        } catch (err) {
          const errMsg = (err?.message || String(err)).toLowerCase();
          if (err === "upgrade_required" || errMsg.includes("upgrade_required") || errMsg.includes("limit") || errMsg.includes("internal server error")) {
            showCustomModal("Capsule creation limit reached. Please upgrade your tier to proceed.", true);
          } else {
            showCustomModal("Summary failed: " + (err.message || err));
          }
        } finally {
          toggleLoading(false);
        }
      }
      else if (currentPlatform === "gemini") {
        // Gemini flow
        try {
          toggleLoading(true);
          await waitForMessagesFromGemini();
          const msgs = await getMessagesFromGemini();
          await generateCapsuleFromMessages(msgs, tag);
        } catch (err) {
          const errMsg = (err?.message || String(err)).toLowerCase();
          if (err === "upgrade_required" || errMsg.includes("upgrade_required") || errMsg.includes("limit") || errMsg.includes("internal server error")) {
            showCustomModal("Capsule creation limit reached. Please upgrade your tier to proceed.", true);
          } else {
            showCustomModal("Summary failed: " + (err.message || err));
          }
        } finally {
          toggleLoading(false);
        }
      }
      // [CLAUDE FLOW]
      else if (currentPlatform.startsWith("claude")) {
        try {
          toggleLoading(true);
          await waitForMessagesFromClaude();
          const msgs = await getMessagesFromClaude();
          await generateCapsuleFromMessages(msgs, tag);
        } catch (err) {
          const errMsg = (err?.message || String(err)).toLowerCase();
          if (err === "upgrade_required" || errMsg.includes("upgrade_required") || errMsg.includes("limit") || errMsg.includes("internal server error")) {
            showCustomModal("Capsule creation limit reached. Please upgrade your tier to proceed.", true);
          } else {
            showCustomModal("Summary failed: " + (err.message || err));
          }
        } finally {
          toggleLoading(false);
        }
      }
      // [DEEPSEEK FLOW]
      else if (currentPlatform === "deepseek") {
        try {
          toggleLoading(true);
          await waitForMessagesFromDeepSeek();
          const msgs = await getMessagesFromDeepSeek();
          await generateCapsuleFromMessages(msgs, tag);
        } catch (err) {
          const errMsg = (err?.message || String(err)).toLowerCase();
          if (err === "upgrade_required" || errMsg.includes("upgrade_required") || errMsg.includes("limit") || errMsg.includes("internal server error")) {
            showCustomModal("Capsule creation limit reached. Please upgrade your tier to proceed.", true);
          } else {
            showCustomModal("Summary failed: " + (err.message || err));
          }
        } finally {
          toggleLoading(false);
        }
      }
      // [PERPLEXITY FLOW]
      else if (currentPlatform === "perplexity") {
        try {
          toggleLoading(true);
          await waitForMessagesFromPerplexity();
          const msgs = await getMessagesFromPerplexity();
          await generateCapsuleFromMessages(msgs, tag);
        } catch (err) {
          const errMsg = (err?.message || String(err)).toLowerCase();
          if (err === "upgrade_required" || errMsg.includes("upgrade_required") || errMsg.includes("limit") || errMsg.includes("internal server error")) {
            showCustomModal("Capsule creation limit reached. Please upgrade your tier to proceed.", true);
          } else {
            showCustomModal("Summary failed: " + (err.message || err));
          }
        } finally {
          toggleLoading(false);
        }
      }
      // [COPILOT FLOW]
      else if (currentPlatform === "copilot") {
        try {
          toggleLoading(true);
          await waitForMessagesFromCopilot();
          const msgs = await getMessagesFromCopilot();
          await generateCapsuleFromMessages(msgs, tag);
        } catch (err) {
          const errMsg = (err?.message || String(err)).toLowerCase();
          if (err === "upgrade_required" || errMsg.includes("upgrade_required") || errMsg.includes("limit") || errMsg.includes("internal server error")) {
            showCustomModal("Capsule creation limit reached. Please upgrade your tier to proceed.", true);
          } else {
            showCustomModal("Summary failed: " + (err.message || err));
          }
        } finally {
          toggleLoading(false);
        }
      }
      // [GROK FLOW]
      else if (currentPlatform === "grok") {
        try {
          toggleLoading(true);
          await waitForMessagesFromGrok();
          const msgs = await getMessagesFromGrok();
          await generateCapsuleFromMessages(msgs, tag);
        } catch (err) {
          const errMsg = (err?.message || String(err)).toLowerCase();
          if (err === "upgrade_required" || errMsg.includes("upgrade_required") || errMsg.includes("limit") || errMsg.includes("internal server error")) {
            showCustomModal("Capsule creation limit reached. Please upgrade your tier to proceed.", true);
          } else {
            showCustomModal("Summary failed: " + (err.message || err));
          }
        } finally {
          toggleLoading(false);
        }
      }
      // [GMAIL FLOW]
      else if (currentPlatform === "mail" || currentPlatform === "gmail") {
        try {
          toggleLoading(true);
          const msgs = await getMessagesFromGmail();
          await generateCapsuleFromMessages(msgs, tag);
        } catch (err) {
          const errMsg = (err?.message || String(err)).toLowerCase();
          if (err === "upgrade_required" || errMsg.includes("upgrade_required") || errMsg.includes("limit") || errMsg.includes("internal server error")) {
            showCustomModal("Capsule creation limit reached. Please upgrade your tier to proceed.", true);
          } else {
            showCustomModal("Summary failed: " + (err.message || err));
          }
        } finally {
          toggleLoading(false);
        }
      }
      // [OUTLOOK FLOW]
      else if (currentPlatform === "outlook") {
        try {
          toggleLoading(true);
          const msgs = await getMessagesFromOutlook();
          await generateCapsuleFromMessages(msgs, tag);
        } catch (err) {
          const errMsg = (err?.message || String(err)).toLowerCase();
          if (err === "upgrade_required" || errMsg.includes("upgrade_required") || errMsg.includes("limit") || errMsg.includes("internal server error")) {
            showCustomModal("Capsule creation limit reached. Please upgrade your tier to proceed.", true);
          } else {
            showCustomModal("Summary failed: " + (err.message || err));
          }
        } finally {
          toggleLoading(false);
        }
      }
      // [LOVABLE FLOW]
      else if (currentPlatform === "lovable") {
        try {
          toggleLoading(true);
          await waitForMessagesFromLovable();
          const msgs = await getMessagesFromLovable();
          await generateCapsuleFromMessages(msgs, tag);
        } catch (err) {
          const errMsg = (err?.message || String(err)).toLowerCase();
          if (err === "upgrade_required" || errMsg.includes("upgrade_required") || errMsg.includes("limit") || errMsg.includes("internal server error")) {
            showCustomModal("Capsule creation limit reached. Please upgrade your tier to proceed.", true);
          } else {
            showCustomModal("Summary failed: " + (err.message || err));
          }
        } finally {
          toggleLoading(false);
        }
      }
      // [REPLIT FLOW]
      else if (currentPlatform === "replit") {
        try {
          toggleLoading(true);
          // Check if this is a batch request from the dashboard
          const batchUrls = msg.payload?.urls;
          if (batchUrls && batchUrls.length > 0) {
            await handleReplitBatchGeneration(batchUrls, tag);
          } else {
            await waitForMessagesFromReplit();
            const msgs = await getMessagesFromReplit();
            await generateCapsuleFromMessages(msgs, tag);
          }
        } catch (err) {
          const errMsg = (err?.message || String(err)).toLowerCase();
          if (err === "upgrade_required" || errMsg.includes("upgrade_required") || errMsg.includes("limit") || errMsg.includes("internal server error")) {
            showCustomModal("Capsule creation limit reached. Please upgrade your tier to proceed.", true);
          } else {
            showCustomModal("Summary failed: " + (err.message || err));
          }
        } finally {
          toggleLoading(false);
        }
      }
      // [EMERGENT FLOW]
      else if (currentPlatform === "emergent") {
        try {
          toggleLoading(true);
          await waitForMessagesFromEmergent();
          const msgs = await getMessagesFromEmergent();
          await generateCapsuleFromMessages(msgs, tag);
        } catch (err) {
          const errMsg = (err?.message || String(err)).toLowerCase();
          if (err === "upgrade_required" || errMsg.includes("upgrade_required") || errMsg.includes("limit") || errMsg.includes("internal server error")) {
            showCustomModal("Capsule creation limit reached. Please upgrade your tier to proceed.", true);
          } else {
            showCustomModal("Summary failed: " + (err.message || err));
          }
        } finally {
          toggleLoading(false);
        }
      }
      // [NOTEBOOKLM FLOW]
      else if (currentPlatform === "notebooklm") {
        try {
          toggleLoading(true);
          await waitForMessagesFromNotebookLM();
          const msgs = await getMessagesFromNotebookLM();
          await generateCapsuleFromMessages(msgs, tag);
        } catch (err) {
          const errMsg = (err?.message || String(err)).toLowerCase();
          if (err === "upgrade_required" || errMsg.includes("upgrade_required") || errMsg.includes("limit") || errMsg.includes("internal server error")) {
            showCustomModal("Capsule creation limit reached. Please upgrade your tier to proceed.", true);
          } else {
            showCustomModal("Summary failed: " + (err.message || err));
          }
        } finally {
          toggleLoading(false);
        }
      }
    }

    /* ===== GENERATE VERSION ===== */
    if (msg.type === "GENERATE_VERSION") {
      const capsuleId = msg.payload?.capsuleId;


      let msgs = [];
      try {
        toggleLoading(true);
        if (currentPlatform === "gemini") {
          await waitForMessagesFromGemini();
          msgs = await getMessagesFromGemini();
        } else if (currentPlatform.startsWith("claude")) {
          await waitForMessagesFromClaude();
          msgs = await getMessagesFromClaude();
        } else if (currentPlatform === "deepseek") {
          await waitForMessagesFromDeepSeek();
          msgs = await getMessagesFromDeepSeek();
        } else if (currentPlatform.startsWith("chatgpt")) {
          await waitForMessagesFromChatGPT();
          msgs = await getMessagesFromChatGPT();
        } else if (currentPlatform === "perplexity") {
          await waitForMessagesFromPerplexity();
          msgs = await getMessagesFromPerplexity();
        } else if (currentPlatform === "copilot") {
          await waitForMessagesFromCopilot();
          msgs = await getMessagesFromCopilot();
        } else if (currentPlatform === "grok") {
          await waitForMessagesFromGrok();
          msgs = await getMessagesFromGrok();
        } else if (currentPlatform === "lovable") {
          await waitForMessagesFromLovable();
          msgs = await getMessagesFromLovable();
        } else if (currentPlatform === "replit") {
          await waitForMessagesFromReplit();
          msgs = await getMessagesFromReplit();
        } else if (currentPlatform === "emergent") {
          await waitForMessagesFromEmergent();
          msgs = await getMessagesFromEmergent();
        } else if (currentPlatform === "notebooklm") {
          await waitForMessagesFromNotebookLM();
          msgs = await getMessagesFromNotebookLM();
        }

        const filteredMsgs = getPostDropMessages(msgs);
        await generateVersionFromMessages(filteredMsgs, capsuleId);
      } catch (err) {
        const errMsg = (err?.message || String(err)).toLowerCase();
        if (err === "upgrade_required" || errMsg.includes("upgrade_required") || errMsg.includes("limit") || errMsg.includes("internal server error")) {
          showCustomModal("To access this feature please upgrade your tier", true);
        } else {
          showCustomModal("Version generation failed: " + (err.message || err));
        }
        chrome.runtime.sendMessage({ type: "GENERATION_COMPLETE", success: false });
      } finally {
        toggleLoading(false);
      }
    }

    /* ===== ACTIVATE INJECTOR ===== */
    if (msg.type === "ACTIVATE_INJECTOR") {

      // Accept capsuleId from message payload or fallback to storage
      const capsuleIdFromMessage = msg.capsuleId;

      if (capsuleIdFromMessage) {
        // Start Animation
        showDroppingAnimation();

        // Use the capsule ID passed from the message
        fetchAndInjectCapsule(capsuleIdFromMessage);
      } else {
        // Fallback to lastCapsuleId from storage (backward compatibility)
        if (isContextValid()) {
          chrome.storage.local.get("lastCapsuleId", data => {
            const capsuleId = data.lastCapsuleId;
            if (!capsuleId) {
              showCustomModal("No capsule ID found. Please generate a capsule first.");
              return;
            }
            fetchAndInjectCapsule(capsuleId);
          });
        }
      }
    }
  })();

  return true; // Keep channel open
});

function fetchAndInjectCapsule(capsuleId, mode = 'chat') {

  if (!isContextValid()) {
    showCustomModal("Extension context invalidated. Please refresh the page.");
    return;
  }

  const conversationId = getConversationId();

  chrome.runtime.sendMessage({
    type: "getCapsule",
    payload: { capsuleId, conversationId }
  }, (res) => {
    if (!res?.success) {
      console.error("❌ Failed to fetch capsule details:", res?.error);
      const rawErr = res?.error || "Unknown error";
      const cleanErr = rawErr.replace(/^Error:\s*/i, "").replace(/^Retrieval failed:\s*/i, "");
      showCustomModal(cleanErr);
      return;
    }

    const capsuleData = res.data;
    const summary = capsuleData.summary || capsuleData.output || capsuleData.text || capsuleData.response;
    const capsuleTag = capsuleData.tag || "";
    const attachmentRefs = capsuleData.attachments || [];

    if (!summary) {
      console.error("❌ No summary found in capsule data:", capsuleData);
      showCustomModal("Capsule data retrieved, but no summary was found.");
      return;
    }

    // Store local convo→capsule mapping so version-choice fires when generating from this conversation.
    // (The backend only stores a mapping on capsule CREATE, not on GET, so we track drops locally.)
    if (conversationId) {
      chrome.storage.local.get("localConvoMappings", ({ localConvoMappings = {} }) => {
        localConvoMappings[conversationId] = capsuleId;
        chrome.storage.local.set({ localConvoMappings });
      });
    } else {
      // No conversationId yet (brand-new chat) — watch for one to appear then store it
      pendingCapsuleId = capsuleId;
      startConversationIdWatcher();
    }

    // 2. Fetch full content for each attachment
    const fetchFullContent = (refs) => {
      if (refs.length > 0) {
        const fullAttachments = [];
        const fetchPromises = refs.map((ref, index) => {
          return new Promise((resolve) => {
            chrome.runtime.sendMessage({
              type: "GET_ATTACHMENT_CONTENT",
              payload: { assetId: ref.asset_id }
            }, (attRes) => {
              if (attRes?.success && attRes.data) {
                const fullAtt = attRes.data;
                fullAttachments.push({
                  type: fullAtt.media_type || 'image',
                  filename: fullAtt.filename,
                  mime: fullAtt.content_type,
                  base64: fullAtt.base64_data
                });
              } else {
                console.warn(`⚠️ [Content] Failed to fetch full metadata for asset: ${ref.asset_id}`, attRes?.error);
              }
              resolve();
            });
          });
        });

        Promise.all(fetchPromises).then(async () => {
          let finalAttachments = fullAttachments;
          const { tier } = await chrome.storage.local.get("tier");

          if (fullAttachments.length > 0 && tier !== 'basic') {
            finalAttachments = await showAttachmentSelector(fullAttachments, currentPlatform);
            if (finalAttachments === null) {
              hideDroppingAnimation();
              return;
            }
          } else if (tier === 'basic') {
            finalAttachments = []; // Basic users only get text
          }
          if (mode === 'source') {
            window.dispatchEvent(new CustomEvent("CAPSULE_NOTEBOOKLM_INJECT_SOURCE", {
              detail: { summary, tag: capsuleTag, attachments: finalAttachments }
            }));
            hideDroppingAnimation();
          } else {
            injectCapsuleSummary(summary, finalAttachments, capsuleTag);
          }
        });
      } else {
        if (mode === 'source') {
          window.dispatchEvent(new CustomEvent("CAPSULE_NOTEBOOKLM_INJECT_SOURCE", {
            detail: { summary, tag: capsuleTag, attachments: [] }
          }));
          hideDroppingAnimation();
        } else {
          injectCapsuleSummary(summary, [], capsuleTag);
        }
      }
    };

    if (attachmentRefs.length === 0 && (capsuleData.attachment_count || 0) > 0) {
      chrome.runtime.sendMessage({
        type: "GET_CAPSULE_ATTACHMENT_LIST",
        payload: { capsuleId: capsuleId }
      }, (listRes) => {
        if (listRes?.success && Array.isArray(listRes.data)) {
          fetchFullContent(listRes.data);
        } else {
          console.error("❌ [Content] Failed to fetch attachment list:", listRes?.error);
          fetchFullContent([]); // Fallback to summary only
        }
      });
    } else {
      fetchFullContent(attachmentRefs);
    }
  });
}

async function injectCapsuleSummary(summary, attachments = [], capsuleTag = "") {
  // Build the tag pointer line — user-visible only, NOT part of the AI summary
  const MAX_TAG_LEN = 25;
  const tagLabel = capsuleTag
    ? (capsuleTag.length > MAX_TAG_LEN
      ? capsuleTag.slice(0, MAX_TAG_LEN) + "..."
      : capsuleTag)
    : null;
  // Single-line trigger visible as the user turn in the conversation
  const visibleTrigger = tagLabel
    ? `Adding Context of Capsule: ${tagLabel} ! Say Hi. 👀`
    : "Adding capsule context to this conversation ! Say Hi. 👀";
  // Trigger opening animation
  showOpeningAnimation();

  /* --- MULTIMODAL: Helper to drop files into ChatGPT --- */
  async function dropFilesIntoChatGPT(files) {
    const target = document.querySelector('#prompt-textarea') || document.querySelector('textarea');
    if (!target || files.length === 0) return;

    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));

    target.dispatchEvent(mmCreateDragEvent('dragenter', dataTransfer));
    target.dispatchEvent(mmCreateDragEvent('dragover', dataTransfer));
    target.dispatchEvent(mmCreateDragEvent('drop', dataTransfer));

    await mmWait(200);

    // Clean up overlay
    const allDivs = document.querySelectorAll('div');
    let overlay = null;
    for (const div of allDivs) {
      if (div.textContent.includes("Drop any file here")) { overlay = div; break; }
    }
    const cleanupTargets = [target, document.body, window];
    if (overlay) cleanupTargets.unshift(overlay);
    cleanupTargets.forEach(el => {
      el.dispatchEvent(mmCreateDragEvent('dragleave', dataTransfer));
      el.dispatchEvent(mmCreateDragEvent('dragend', dataTransfer));
      el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });
  }

  /* --- MULTIMODAL: Helper to drop files into Gemini --- */
  async function dropFilesIntoGemini(files) {
    const editor = document.querySelector('.ql-editor');
    if (!editor || files.length === 0) return;

    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));

    // Method A: Paste (best for images)
    const pasteEvent = new ClipboardEvent('paste', {
      bubbles: true, cancelable: true, composed: true,
      clipboardData: dataTransfer
    });
    editor.dispatchEvent(pasteEvent);

    // Method B: Drop (best for PDFs)
    editor.dispatchEvent(mmCreateDragEvent('dragenter', dataTransfer));
    editor.dispatchEvent(mmCreateDragEvent('dragover', dataTransfer));
    editor.dispatchEvent(mmCreateDragEvent('drop', dataTransfer));
  }

  /* --- MULTIMODAL: Helper to drop files into DeepSeek --- */
  async function dropFilesIntoDeepSeek(files) {
    // User reported dropping anywhere works
    const target = document.body;
    if (files.length === 0) return;

    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));

    target.dispatchEvent(mmCreateDragEvent('dragenter', dataTransfer));
    target.dispatchEvent(mmCreateDragEvent('dragover', dataTransfer));
    target.dispatchEvent(mmCreateDragEvent('drop', dataTransfer));
  }

  /* --- MULTIMODAL: Helper to drop files into Claude --- */
  async function dropFilesIntoClaude(files) {
    if (files.length === 0) return;

    for (const a of attachments) {
      window.dispatchEvent(
        new CustomEvent('CAPSULE_CLAUDE_INJECT_FILES', {
          detail: {
            attachments: [{
              base64: a.base64,
              filename: a.filename,
              mime: a.mime
            }]
          }
        })
      );

      await mmWait(1200);
    }

  }

  /* --- MULTIMODAL: Helper to drop files into Copilot --- */
  async function dropFilesIntoCopilot(files) {
    if (!files || files.length === 0) return;
    // Dispatch to copilot-inserter.js (page-world) which sets the file input correctly.
    // NOTE: We pass raw attachments data (base64/filename/mime) that copilot-inserter expects.
    // No drag-drop fallback needed — copilot-inserter.js handles file injection via the
    // native file input, which is the correct single injection path for Copilot.
    window.dispatchEvent(new CustomEvent('CAPSULE_COPILOT_INJECT_FILES', {
      detail: {
        attachments: attachments.map(a => ({ base64: a.base64, filename: a.filename, mime: a.mime }))
      }
    }));
    // Wait for copilot-inserter.js to process the file input event
    await mmWait(800);
  }

  /* --- MULTIMODAL: Helper to drop files into Perplexity --- */
  async function dropFilesIntoPerplexity(files) {
    if (files.length === 0) return;
    // Prefer page-world file input injection (inserter listens for CAPSULE_PERPLEXITY_INJECT_FILES)
    window.dispatchEvent(new CustomEvent('CAPSULE_PERPLEXITY_INJECT_FILES', {
      detail: {
        attachments: attachments.map(a => ({ base64: a.base64, filename: a.filename, mime: a.mime }))
      }
    }));
    await mmWait(500);
    // Fallback: drag-drop on input area in case file input isn't found in page world
    const target = document.querySelector('#ask-input') || document.querySelector('div[role="textbox"][aria-placeholder*="follow-up"]') || document.querySelector('textarea[placeholder], textarea, div[contenteditable="true"]') || document.body;
    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));
    if (target.focus) target.focus();
    target.dispatchEvent(mmCreateDragEvent('dragenter', dataTransfer));
    target.dispatchEvent(mmCreateDragEvent('dragover', dataTransfer));
    target.dispatchEvent(mmCreateDragEvent('drop', dataTransfer));
    target.dispatchEvent(mmCreateDragEvent('dragleave', dataTransfer));
  }

  /* --- MULTIMODAL: Helper to drop files into Grok --- */
  async function dropFilesIntoGrok(files) {
    if (!files || files.length === 0) return;
    // Prefer page-world file input injection (grok-inserter.js listens for CAPSULE_GROK_INJECT_FILES)
    window.dispatchEvent(new CustomEvent('CAPSULE_GROK_INJECT_FILES', {
      detail: {
        attachments: attachments.map(a => ({ base64: a.base64, filename: a.filename, mime: a.mime }))
      }
    }));
    await mmWait(600);
    // Fallback: simulate a drag-drop onto the composer in case the file input isn't found
    const target = document.querySelector('div[contenteditable="true"][role="textbox"][aria-label="Ask Grok anything"]') ||
      document.querySelector('form textarea') ||
      document.querySelector('textarea') ||
      document.body;
    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));
    if (target.focus) target.focus();
    target.dispatchEvent(mmCreateDragEvent('dragenter', dataTransfer));
    target.dispatchEvent(mmCreateDragEvent('dragover', dataTransfer));
    target.dispatchEvent(mmCreateDragEvent('drop', dataTransfer));
    target.dispatchEvent(mmCreateDragEvent('dragleave', dataTransfer));
  }

  /* --- CHATGPT --- */
  if (currentPlatform === "chatgpt") {
    if (!isContextValid()) {
      console.warn("🚫 Extension context invalidated.");
      return;
    }
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("gpt-inserter.js") + "?v=" + Date.now();
    script.onload = () => {
      window.dispatchEvent(new CustomEvent("CAPSULE_DATA", {
        detail: {
          summary: summary,
          tagPointer: visibleTrigger
        }
      }));
      script.remove();
    };
    (document.head || document.documentElement).appendChild(script);

    // Hybrid Injection: Send a visible confirmation message to trigger the fetch
    // If there are attachments, drop them first, then send text
    const attachmentDelay = attachments.length > 0 ? 3000 : 0;

    // Drop attachments if present
    if (attachments.length > 0) {
      const files = attachments.map(a => mmBase64ToFile(a.base64, a.filename, a.mime));
      dropFilesIntoChatGPT(files);
    }

    setTimeout(() => {
      try {
        const textBox = document.querySelector('#prompt-textarea');
        if (!textBox) {
          console.warn("⚠️ ChatGPT prompt textarea not found");
          return;
        }

        const confirmationMsg = visibleTrigger;

        // Focus and insert text
        textBox.focus();
        document.execCommand('insertText', false, confirmationMsg);

        // Fallback if execCommand fails
        if (textBox.innerText.trim() !== confirmationMsg && textBox.value !== confirmationMsg) {
          if (textBox.tagName.toLowerCase() === 'textarea') {
            textBox.value = confirmationMsg;
          } else {
            textBox.innerHTML = `<p>${confirmationMsg}</p>`;
          }
          textBox.dispatchEvent(new Event('input', { bubbles: true }));
        }

        // Click send button when enabled (waits for file uploads to complete)
        const clickSendWhenEnabled = (startTime = Date.now()) => {
          const sendButton = document.querySelector('button[aria-label="Send prompt"]') ||
            document.querySelector('button[data-testid="send-button"]');

          if (sendButton && !sendButton.disabled) {
            isBypassingFilter = true;
            sendButton.click();
            setTimeout(() => (isBypassingFilter = false), 1500);
            return;
          }

          // Safety timeout: 20 seconds
          if (Date.now() - startTime > 20000) {
            console.warn("⚠️ ChatGPT send button polling timed out.");
            const enterEvent = new KeyboardEvent("keydown", {
              bubbles: true,
              cancelable: true,
              key: "Enter",
              code: "Enter",
              keyCode: 13,
            });
            textBox.dispatchEvent(enterEvent);
            return;
          }

          setTimeout(() => clickSendWhenEnabled(startTime), 500);
        };

        clickSendWhenEnabled();

      } catch (err) {
        console.error("❌ Error during ChatGPT hybrid injection:", err);
      }
    }, 1000 + attachmentDelay);
  }

  /* --- GEMINI --- */
  else if (currentPlatform === "gemini") {
    try {
      const hasAttachments = attachments.length > 0;
      const attachmentsForFollowup = hasAttachments ? attachments.slice() : [];

      const attachmentDelay = 1000; // Added base delay for Gemini stability

      setTimeout(() => {
        try {
          const textBox = document.querySelector('rich-textarea div[contenteditable="true"]');
          if (!textBox) throw new Error("Text box not found");

          textBox.textContent = summary + "\n\n**ACTIVE CAPSULE CONTEXT:" + (tagLabel || "") + "**";
          textBox.dispatchEvent(new Event('input', { bubbles: true }));

          setTimeout(() => {
            const sendButton = document.querySelector('button[aria-label*="Send"], button[data-test-id="send-button"]');
            if (!sendButton) {
              console.error("❌ Send button not found");
              return;
            }

            window.dispatchEvent(new Event("UNLOCK_GEMINI_SEND"));
            isBypassingFilter = true;
            sendButton.click();
            setTimeout(() => isBypassingFilter = false, 1000);

            // Lightly reset the composer after a short delay
            setTimeout(() => {
              textBox.textContent = "Start asking stuff here again!";
              textBox.dispatchEvent(new Event('input', { bubbles: true }));
            }, CLEANUP_WAIT);

            // Restore original behavior: auto-press Stop after a short delay
            setTimeout(() => {
              const stopButton = document.querySelector('button[aria-label*="Stop"]');
              if (stopButton) {
                stopButton.click();
              }

              // After Stop, if there are attachments, send a SECOND message
              // that only includes attachments + a short note. Do NOT stop again.
              if (hasAttachments) {
                const followupBox = document.querySelector('rich-textarea div[contenteditable="true"]');
                if (!followupBox) return;

                const files = attachmentsForFollowup.map(a => mmBase64ToFile(a.base64, a.filename, a.mime));
                if (files.length > 0) {
                  dropFilesIntoGemini(files);
                }

                const note = "Here are files related to the injected capsule context.";

                // Give Gemini enough time to register the dropped files
                // before typing and sending the follow-up message.
                setTimeout(() => {
                  followupBox.textContent = note;
                  followupBox.dispatchEvent(new Event('input', { bubbles: true }));

                  setTimeout(() => {
                    const sendButton2 = document.querySelector('button[aria-label*="Send"], button[data-test-id="send-button"]');
                    if (!sendButton2) {
                      console.error("❌ Follow-up send button not found");
                      return;
                    }

                    window.dispatchEvent(new Event("UNLOCK_GEMINI_SEND"));
                    isBypassingFilter = true;
                    sendButton2.click();
                    setTimeout(() => isBypassingFilter = false, 1000);
                  }, SEND_WAIT);
                }, 6000);
              }
            }, STOP_WAIT);
          }, SEND_WAIT);
        } catch (innerErr) {
          console.error("❌ Error injecting Gemini text:", innerErr);
        }
      }, attachmentDelay);
    } catch (err) {
      console.error("❌ Error injecting capsule:", err);
      showCustomModal("Failed to inject capsule: " + err.message);
    }
  }

  /* --- NOTEBOOKLM --- */
  else if (currentPlatform === "notebooklm") {
    if (!isContextValid()) {
      console.warn("🚫 Extension context invalidated.");
      return;
    }
    
    // Dispatch data for privacy masking
    window.dispatchEvent(new CustomEvent("CAPSULE_DATA", {
      detail: {
        summary: summary,
        tagPointer: visibleTrigger
      }
    }));

    // Send attachments if present
    if (attachments && attachments.length > 0) {
      window.dispatchEvent(new CustomEvent('CAPSULE_NOTEBOOKLM_INJECT_FILES', {
        detail: {
          attachments: attachments.map(a => ({ base64: a.base64, filename: a.filename, mime: a.mime }))
        }
      }));
    }

    const performTextInjection = () => {
      setTimeout(() => {
        try {
          const textBox = document.querySelector('textarea.query-box-input') ||
                          document.querySelector('textarea[placeholder*="Ask a question" i]') ||
                          document.querySelector('textarea[aria-label="Query box"]') ||
                          document.querySelector('div[contenteditable="true"]');
          if (!textBox) throw new Error("NotebookLM text box not found");

          const fullContent = summary + "\n\n**ACTIVE CAPSULE CONTEXT:" + (tagLabel || "") + "**";
          textBox.focus();
          document.execCommand('selectAll');
          document.execCommand('delete');
          const success = document.execCommand('insertText', false, fullContent);

          if (!success || (textBox.tagName === 'TEXTAREA' ? textBox.value.trim().length === 0 : textBox.innerText.trim().length === 0)) {
            if (textBox.tagName === 'TEXTAREA') {
              textBox.value = fullContent;
            } else {
              textBox.textContent = fullContent;
            }
          }
          textBox.dispatchEvent(new Event('input', { bubbles: true }));

          setTimeout(() => {
            const sendButton = document.querySelector('button[aria-label*="Send"]') || 
                               document.querySelector('button[aria-label*="Submit"]') ||
                               document.querySelector('button.submit-button');
            isBypassingFilter = true;
            if (sendButton && !sendButton.disabled) {
              sendButton.click();
            } else {
              const enterEvent = new KeyboardEvent('keydown', {
                bubbles: true, cancelable: true, key: 'Enter', code: 'Enter', keyCode: 13
              });
              textBox.dispatchEvent(enterEvent);
            }
            setTimeout(() => isBypassingFilter = false, 1500);

            // Reset composer lightly
            setTimeout(() => {
              if (textBox.tagName === 'TEXTAREA') {
                textBox.value = "";
              } else {
                textBox.textContent = "";
              }
              textBox.dispatchEvent(new Event('input', { bubbles: true }));
            }, CLEANUP_WAIT);

          }, SEND_WAIT);

        } catch (err) {
          console.error("❌ Error injecting capsule:", err);
          showCustomModal("Failed to inject capsule: " + err.message);
        }
      }, 1000);
    };

    if (attachments && attachments.length > 0) {
      const onFilesDone = (e) => {
        window.removeEventListener('CAPSULE_NOTEBOOKLM_FILES_DONE', onFilesDone);
        console.log("👉 Capsule Hub: File upload finished, proceeding with text injection.", e.detail);
        // Add a 1.2s delay to let the UI settle after popup close before sending text
        setTimeout(performTextInjection, 1200);
      };
      window.addEventListener('CAPSULE_NOTEBOOKLM_FILES_DONE', onFilesDone);
    } else {
      performTextInjection();
    }
  }

  /* --- CLAUDE --- */
  else if (currentPlatform.startsWith("claude")) {
    try {
      const textBox = document.querySelector('div[contenteditable="true"]');
      if (!textBox) throw new Error("Claude text box not found");

      const fullContent = summary + "\n\n**ACTIVE CAPSULE CONTEXT:" + (tagLabel || "") + "**";

      function claudeClickSend() {
        const sendButton = document.querySelector('button[aria-label*="Send message" i]') ||
          document.querySelector('button[aria-label*="Send Message" i]') ||
          document.querySelector('button[type="submit"]');
        isBypassingFilter = true;
        if (sendButton && !sendButton.disabled) {
          sendButton.click();
        } else {
          textBox.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Enter', code: 'Enter', keyCode: 13 }));
        }
        setTimeout(() => isBypassingFilter = false, 1000);
        setTimeout(() => {
          textBox.innerHTML = "<p>Start asking stuff here again!</p>";
          setTimeout(() => {
            const stopButton = document.querySelector('button[aria-label="Stop generating"]');
            if (stopButton) stopButton.click();
          }, STOP_WAIT);
        }, CLEANUP_WAIT);
      }

      if (attachments.length > 0) {
        const attPayload = attachments.map(a => ({ base64: a.base64, filename: a.filename, mime: a.mime }));

        // Inject file into Claude's input area first — Claude uploads it to its servers
        // immediately (no conversation needed). Once the attachment card appears we type
        // the text and send everything together as a single first message.
        window.dispatchEvent(new CustomEvent('CAPSULE_CLAUDE_INJECT_FILES', { detail: { attachments: attPayload } }));

        // Wait for Claude to finish uploading the file before typing text.
        await mmWait(3500);

        textBox.focus();
        const success = document.execCommand('insertText', false, fullContent);
        if (!success || textBox.innerText.trim().length === 0) {
          textBox.innerHTML = `<p>${fullContent}</p>`;
          textBox.dispatchEvent(new Event('input', { bubbles: true }));
        }

        setTimeout(claudeClickSend, SEND_WAIT);

      } else {
        // No attachments — just inject text and send
        textBox.focus();
        const success = document.execCommand('insertText', false, fullContent);
        if (!success || textBox.innerText.trim().length === 0) {
          textBox.innerHTML = `<p>${fullContent}</p>`;
          textBox.dispatchEvent(new Event('input', { bubbles: true }));
        }

        setTimeout(() => {
          const sendButton = document.querySelector('button[aria-label*="Send message" i]') ||
            document.querySelector('button[aria-label*="Send Message" i]') ||
            document.querySelector('button[type="submit"]');
          isBypassingFilter = true;
          if (sendButton && !sendButton.disabled) {
            sendButton.click();
          } else {
            textBox.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Enter', code: 'Enter', keyCode: 13 }));
          }
          setTimeout(() => isBypassingFilter = false, 1000);
          setTimeout(() => {
            textBox.innerHTML = "<p>Start asking stuff here again!</p>";
            setTimeout(() => {
              const stopButton = document.querySelector('button[aria-label="Stop generating"]');
              if (stopButton) stopButton.click();
            }, STOP_WAIT);
          }, CLEANUP_WAIT);
        }, SEND_WAIT);
      }

    } catch (err) {
      console.error("❌ Error injecting Claude capsule:", err);
      alert("Failed: " + err.message);
    }
  }

  /* --- LOVABLE --- */
  else if (currentPlatform === "lovable") {
    try {
      const fullContent = summary + "\n\n**ACTIVE CAPSULE CONTEXT: " + (tagLabel || "") + "**";
      // We use the postMessage flow to communicate with lovable-inserter.js
      injectLovableInserter();
      setTimeout(() => {
        window.postMessage({
          type: "INSERT_CAPSULE_CONTENT",
          content: fullContent
        }, "*");
      }, 500);
    } catch (err) {
      console.error("❌ Error injecting Lovable capsule:", err);
    }
  }

  /* --- REPLIT --- */
  else if (currentPlatform === "replit" || currentPlatform === "replit-project") {
    try {
      const fullContent = summary + "\n\n**ACTIVE CAPSULE CONTEXT: " + (tagLabel || "") + "**";
      injectReplitInserter();
      setTimeout(() => {
        window.postMessage({
          type: "INSERT_CAPSULE_CONTENT",
          content: fullContent
        }, "*");
      }, 500);

      // Drop attachments if present
      if (attachments.length > 0) {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('CAPSULE_REPLIT_INJECT_FILES', {
            detail: {
              attachments: attachments.map(a => ({
                base64: a.base64, filename: a.filename, mime: a.mime
              }))
            }
          }));
        }, 1500);
      }
    } catch (err) {
      console.error("❌ Error injecting Replit capsule:", err);
    }
  }

  /* --- EMERGENT --- */
  else if (currentPlatform === "emergent") {
    if (!isContextValid()) return;
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("emergent-inserter.js") + "?v=" + Date.now();
    script.onload = () => {
      // Trigger privacy masking
      window.dispatchEvent(new CustomEvent("CAPSULE_DATA", {
        detail: { summary: summary, tagPointer: visibleTrigger }
      }));
      script.remove();

      // Drop files via page-world event (after script has loaded and registered listeners)
      if (attachments.length > 0) {
        window.dispatchEvent(new CustomEvent('CAPSULE_EMERGENT_INJECT_FILES', {
          detail: {
            attachments: attachments.map(a => ({ base64: a.base64, filename: a.filename, mime: a.mime }))
          }
        }));
      }

      // Drop text via page-world event (summary + active capsule context suffix)
      const fullContent = summary + "\n\n**ACTIVE CAPSULE CONTEXT: " + (tagLabel || "") + "**";
      const attachmentDelay = attachments.length > 0 ? 3000 : 1000;
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('CAPSULE_EMERGENT_INJECT_TEXT', {
          detail: { content: fullContent }
        }));
      }, attachmentDelay);
    };
    (document.head || document.documentElement).appendChild(script);
  }

  /* --- PERPLEXITY --- */
  else if (currentPlatform === "perplexity") {
    try {
      // 1. Auto-Stop Generation if currently generating
      const stopButton = document.querySelector('button[aria-label*="Cancel"], button[aria-label*="Stop"], button:has(svg use[href*="cancel"]), button:has(svg use[href*="stop"])');
      if (stopButton) {
        stopButton.click();
      }

      // 2. Drop attachments
      let attachmentDelay = 0;
      if (attachments.length > 0) {
        const files = attachments.map(a => mmBase64ToFile(a.base64, a.filename, a.mime));
        dropFilesIntoPerplexity(files);
        attachmentDelay = 3000;
      }

      setTimeout(() => {
        // 3. Inject text via Lexical Paste event
        const textBox = document.querySelector('div#ask-input[contenteditable="true"]') || document.querySelector('div[role="textbox"][aria-placeholder*="follow-up"]');
        if (!textBox) {
          console.error("Perplexity Lexical text box not found");
          return;
        }

        const fullContent = summary + INJECTION_SUFFIX;

        textBox.focus();
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('text/plain', fullContent);
        const pasteEvent = new ClipboardEvent('paste', {
          bubbles: true,
          cancelable: true,
          clipboardData: dataTransfer
        });
        textBox.dispatchEvent(pasteEvent);

        // 4. Send Message and Stop Generation again if needed
        setTimeout(() => {
          const sendButton = document.querySelector('button[aria-label="Submit"]') || document.querySelector('button[aria-label*="Send"], button[type="submit"]');

          isBypassingFilter = true;
          if (sendButton && !sendButton.disabled) {
            sendButton.click();
          } else {
            const enterEvent = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Enter', code: 'Enter', keyCode: 13 });
            textBox.dispatchEvent(enterEvent);
          }
          setTimeout(() => isBypassingFilter = false, 1500);

          setTimeout(() => {
            // Cleanup input field text safely for Lexical
            const clearDataTransfer = new DataTransfer();
            clearDataTransfer.setData('text/plain', 'Start asking stuff here again!');
            textBox.dispatchEvent(new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData: clearDataTransfer }));
          }, CLEANUP_WAIT);

        }, SEND_WAIT);
      }, attachmentDelay);
    } catch (err) {
      console.error("❌ Error injecting Perplexity capsule:", err);
      alert("Failed: " + err.message);
    }
  }

  /* --- DEEPSEEK --- */
  else if (currentPlatform === "deepseek") {
    try {
      // Drop attachments first if present
      if (attachments.length > 0) {
        const files = attachments.map(a => mmBase64ToFile(a.base64, a.filename, a.mime));
        dropFilesIntoDeepSeek(files);
      }

      const attachmentDelay = attachments.length > 0 ? 3000 : 0;

      setTimeout(() => {
        // Robust selector for DeepSeek textarea
        const textBox = document.querySelector('textarea#chat-input') ||
          document.querySelector('textarea[placeholder*="DeepSeek"]') ||
          document.querySelector('textarea');
        if (!textBox) {
          console.error("DeepSeek text box not found");
          return;
        }

        // Set value and trigger input event
        textBox.value = summary + "\n\n**ACTIVE CAPSULE CONTEXT:" + (tagLabel || "") + "**";
        textBox.dispatchEvent(new Event('input', { bubbles: true }));

        setTimeout(() => {
          const getSendButton = () =>
            document.querySelector('div._52c986b[role="button"]') ||
            document.querySelector('div[role="button"]:has(svg path[d*="M8.3125 0.981587"])') ||
            document.querySelector('div._7436101[role="button"]') ||
            document.querySelector('button[aria-label="Send Message"]') ||
            document.querySelector('div[role="button"]:has(.ds-icon--send)');

          const clickAndFollowUp = (btn) => {
            isBypassingFilter = true;

            if (btn && btn.getAttribute('aria-disabled') !== 'true') {
              btn.click();
            } else {
              // Fallback: Simulate 'Enter' key
              const enterEvent = new KeyboardEvent('keydown', {
                bubbles: true, cancelable: true, key: 'Enter', code: 'Enter', keyCode: 13
              });
              textBox.dispatchEvent(enterEvent);
            }

            setTimeout(() => isBypassingFilter = false, 1000);

            // Follow-up actions: Stop generation and then set placeholder
            setTimeout(() => {
              // 1. Try User-provided XPath
              const xpathResult = document.evaluate('//*[@id="root"]/div/div/div[2]/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div/div/div[2]/div[3]/div[2]/div/div[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
              const stopButtonXPath = xpathResult.singleNodeValue;

              // 2. Try Semantic/SVG Fallbacks
              const stopButtonFallback = document.querySelector('.ds-icon--stop')?.closest('div[role="button"]') ||
                document.querySelector('div[role="button"]:has(.ds-icon--stop)');

              const finalStopButton = stopButtonXPath || stopButtonFallback;

              if (finalStopButton) {
                finalStopButton.click();
              }

              // Add placeholder text AFTER the stop attempt
              setTimeout(() => {
                const activeTextBox = document.querySelector('textarea#chat-input') ||
                  document.querySelector('textarea[placeholder*="DeepSeek"]') ||
                  document.querySelector('textarea');

                if (activeTextBox) {
                  activeTextBox.focus();
                  activeTextBox.value = "Start asking stuff here again!";
                  activeTextBox.dispatchEvent(new Event('input', { bubbles: true }));
                }
              }, CLEANUP_WAIT);
            }, STOP_WAIT);
          };

          const initialBtn = getSendButton();

          if (!initialBtn) {
            console.warn("DeepSeek send button not found, trying Enter fallback");
            clickAndFollowUp(null);
            return;
          }

          // If already enabled, click immediately.
          if (initialBtn.getAttribute('aria-disabled') !== 'true') {
            clickAndFollowUp(initialBtn);
            return;
          }

          // Otherwise, wait until DeepSeek finishes processing attachments
          // and enables the send button (up to 30 seconds).
          const MAX_WAIT_MS = 30000;
          const start = Date.now();

          const observer = new MutationObserver(() => {
            const btn = getSendButton();
            if (!btn) return;

            const ready = btn.getAttribute('aria-disabled') !== 'true';
            const timedOut = Date.now() - start > MAX_WAIT_MS;

            if (ready || timedOut) {
              observer.disconnect();
              clickAndFollowUp(ready ? btn : null);
            }
          });

          observer.observe(initialBtn, {
            attributes: true,
            attributeFilter: ['aria-disabled']
          });
        }, SEND_WAIT);

      }, attachmentDelay);

    } catch (err) {
      console.error("❌ Error injecting DeepSeek capsule:", err);
      showCustomModal("Failed: " + err.message);
    }
  }

  /* --- COPILOT --- */
  else if (currentPlatform === "copilot") {
    try {
      if (attachments.length > 0) {
        const files = attachments.map(a => mmBase64ToFile(a.base64, a.filename, a.mime));
        dropFilesIntoCopilot(files);
      }

      const attachmentDelay = attachments.length > 0 ? 3000 : 0;
      setTimeout(() => {
        const textBox = document.querySelector('textarea#searchbox') || document.querySelector('textarea');
        if (!textBox) {
          console.error("Copilot text box not found");
          return;
        }

        textBox.focus();
        const fullContent = summary + "\n\n**ACTIVE CAPSULE CONTEXT:" + (tagLabel || "") + "**";

        // Copilot typically uses controlled inputs; trying value + event
        textBox.value = fullContent;
        textBox.dispatchEvent(new Event('input', { bubbles: true }));

        setTimeout(() => {
          const sendBtn = document.querySelector('button[aria-label="Submit"]') || document.querySelector('button[title*="Submit"]');
          if (sendBtn && !sendBtn.disabled) {
            sendBtn.click();
          } else {
            const enterEvent = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Enter', code: 'Enter', keyCode: 13 });
            textBox.dispatchEvent(enterEvent);
          }

          // Clear the text box after sending — set to empty string to avoid
          // Copilot's React state picking up residual text and locking the input
          setTimeout(() => {
            if (textBox) {
              textBox.value = "";
              textBox.dispatchEvent(new Event('input', { bubbles: true }));
            }
          }, CLEANUP_WAIT);
        }, SEND_WAIT);
      }, attachmentDelay);
    } catch (err) {
      console.error("❌ Error injecting Copilot capsule:", err);
      showCustomModal("Failed: " + err.message);
    }
  }

  /* --- GROK --- */
  else if (currentPlatform === "grok") {
    try {
      // Grok exposes two composer surfaces, both with aria-label="Ask Grok anything":
      //  - a plain <textarea> (empty / landing state)
      //  - a TipTap/ProseMirror contenteditable div (once text is being edited)
      const proseBox = document.querySelector('div[contenteditable="true"][role="textbox"][aria-label="Ask Grok anything"]') ||
        document.querySelector('div.ProseMirror[contenteditable="true"]');
      const textArea = document.querySelector('textarea[aria-label="Ask Grok anything"]') ||
        document.querySelector('form textarea') ||
        document.querySelector('textarea');
      const textBox = proseBox || textArea;
      if (!textBox) {
        console.error("Grok text box not found");
        showCustomModal("Grok input box not found.");
        return;
      }

      const fullContent = summary + "\n\n**ACTIVE CAPSULE CONTEXT:" + (tagLabel || "") + "**";

      // Drop attachments first (if any), then wait for the upload to register
      let attachmentDelay = 0;
      if (attachments.length > 0) {
        const files = attachments.map(a => mmBase64ToFile(a.base64, a.filename, a.mime));
        dropFilesIntoGrok(files);
        attachmentDelay = 3000;
      }

      setTimeout(() => {
      textBox.focus();

      if (proseBox) {
        // ProseMirror/TipTap: inject via a synthetic paste so the editor parses
        // newlines into paragraphs (same approach as Perplexity's Lexical box).
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('text/plain', fullContent);
        proseBox.dispatchEvent(new ClipboardEvent('paste', {
          bubbles: true, cancelable: true, clipboardData: dataTransfer
        }));
      } else {
        // Plain textarea: native value setter + input event so React registers it
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
        if (nativeSetter) nativeSetter.call(textArea, fullContent);
        else textArea.value = fullContent;
        textArea.dispatchEvent(new Event('input', { bubbles: true }));
      }

      setTimeout(() => {
        const sendBtn = document.querySelector('button[data-testid="chat-submit"]:not([disabled])') ||
          document.querySelector('button[type="submit"][aria-label="Submit"]:not([disabled])') ||
          document.querySelector('button[type="submit"]:not([disabled])');
        if (sendBtn && !sendBtn.disabled) {
          sendBtn.click();
        } else {
          const enterEvent = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Enter', code: 'Enter', keyCode: 13 });
          textBox.dispatchEvent(enterEvent);
        }

        // Only the textarea needs manual clearing; ProseMirror resets itself on send
        // and blanking its innerHTML would strip the empty <p> the editor requires.
        setTimeout(() => {
          if (!proseBox && textArea) {
            const ns = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
            if (ns) ns.call(textArea, ""); else textArea.value = "";
            textArea.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }, CLEANUP_WAIT);
      }, SEND_WAIT);
      }, attachmentDelay);
    } catch (err) {
      console.error("❌ Error injecting Grok capsule:", err);
      showCustomModal("Failed: " + err.message);
    }
  }


  // Show Success Toast
  showToast("Capsule Injected Successfully!");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#10b981";
  toast.style.color = "white";
  toast.style.padding = "10px 16px";
  toast.style.borderRadius = "8px";
  toast.style.fontFamily = "system-ui, sans-serif";
  toast.style.fontSize = "14px";
  toast.style.fontWeight = "600";
  toast.style.zIndex = "999999";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  toast.style.transition = "opacity 0.3s, transform 0.3s";
  toast.style.transform = "translateY(20px)";
  toast.style.opacity = "0";

  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  }, 10);

  // Remove toast
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**********************************************************
 * AUTO-INJECT PRIVACY SCRIPTS
 **********************************************************/

// Gemini Privacy Script
if (currentPlatform === "gemini" && isContextValid()) {
  const privacyScript = document.createElement("script");
  privacyScript.src = chrome.runtime.getURL("gemini-inserter.js") + "?v=" + Date.now();
  privacyScript.onload = () => {
    privacyScript.remove();
  };
  (document.head || document.documentElement).appendChild(privacyScript);
}
// claude-inserter.js is a "world": "MAIN" content script in manifest.json — injected by Chrome directly.

// DeepSeek Privacy Script
if (currentPlatform === "deepseek" && isContextValid()) {
  const privacyScript = document.createElement("script");
  privacyScript.src = chrome.runtime.getURL("ds-inserter.js") + "?v=" + Date.now();
  privacyScript.onload = () => {
    privacyScript.remove();
  };
  (document.head || document.documentElement).appendChild(privacyScript);
}
// Perplexity Privacy Script
if (currentPlatform === "perplexity" && isContextValid()) {
  const privacyScript = document.createElement("script");
  privacyScript.src = chrome.runtime.getURL("perplexity-inserter.js") + "?v=" + Date.now();
  privacyScript.onload = () => {
    privacyScript.remove();
  };
  (document.head || document.documentElement).appendChild(privacyScript);
}
// Copilot Privacy Script
if (currentPlatform === "copilot" && isContextValid()) {
  const privacyScript = document.createElement("script");
  privacyScript.src = chrome.runtime.getURL("copilot-inserter.js") + "?v=" + Date.now();
  privacyScript.onload = () => {
    privacyScript.remove();
  };
  (document.head || document.documentElement).appendChild(privacyScript);
}
// Grok Privacy Script
if (currentPlatform === "grok" && isContextValid()) {
  const privacyScript = document.createElement("script");
  privacyScript.src = chrome.runtime.getURL("grok-inserter.js") + "?v=" + Date.now();
  privacyScript.onload = () => {
    privacyScript.remove();
  };
  (document.head || document.documentElement).appendChild(privacyScript);
}

// Lovable inserter init
if (currentPlatform === "lovable" && isContextValid()) {
  injectLovableInserter();
}

// Replit inserter init (home page is detected as replit-project but still has a prompt box)
if ((currentPlatform === "replit" || currentPlatform === "replit-project") && isContextValid()) {
  injectReplitInserter();
}

// Outlook inserter init (injects capsule button into reading pane toolbar)
if (currentPlatform === "outlook" && isContextValid()) {
  if (!document.getElementById('outlook-inserter-script')) {
    const outlookScript = document.createElement('script');
    outlookScript.id = 'outlook-inserter-script';
    outlookScript.src = chrome.runtime.getURL('outlook-inserter.js') + "?v=" + Date.now();
    outlookScript.onload = () => { outlookScript.remove(); };
    (document.head || document.documentElement).appendChild(outlookScript);
  }
}

// NotebookLM Inserter Script (loads immediately so listeners are ready for drag & drop)
if (currentPlatform === "notebooklm" && isContextValid()) {
  if (!document.getElementById('notebooklm-inserter-script')) {
    const notebookScript = document.createElement('script');
    notebookScript.id = 'notebooklm-inserter-script';
    notebookScript.src = chrome.runtime.getURL('notebooklm-inserter.js') + "?v=" + Date.now();
    notebookScript.onload = () => { notebookScript.remove(); };
    (document.head || document.documentElement).appendChild(notebookScript);
  }
}

function injectLovableInserter() {
  if (document.getElementById('lovable-inserter-script')) return;
  const script = document.createElement('script');
  script.id = 'lovable-inserter-script';
  script.src = chrome.runtime.getURL("lovable-inserter.js") + "?v=" + Date.now();
  script.onload = () => {
    script.remove();
  };
  (document.head || document.documentElement).appendChild(script);
}

function injectReplitInserter() {
  if (document.getElementById('replit-inserter-script')) return;
  const script = document.createElement('script');
  script.id = 'replit-inserter-script';
  script.src = chrome.runtime.getURL("replit-inserter.js") + "?v=" + Date.now();
  script.onload = () => { script.remove(); };
  (document.head || document.documentElement).appendChild(script);
}

/**********************************************************
 * BOOT LOG
 **********************************************************/
console.log("🧠 Capsule Hub by Tilantra loaded");

/**********************************************************
 * DRAG AND DROP HANDLER
 **********************************************************/

// We use capture: true to intercept the event BEFORE the site (e.g. Claude) sees it.
let dragCounter = 0;
let dragOverlay = null;

// NotebookLM Dual Overlays
let notebookLMChatOverlay = null;
let notebookLMSourceOverlay = null;

function createSingleOverlay(overlayText) {
  const overlay = document.createElement('div');
  overlay.className = 'tilantra-notebooklm-drag-overlay';
  overlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 600;
    pointer-events: none;
    z-index: 10000;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  `;
  overlay.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px;">
      <img src="${chrome.runtime.getURL('capsule.png')}" style="width:20px; height:20px; object-fit:contain;">
      <span class="tilantra-drag-overlay-text-span">${overlayText}</span>
    </div>
  `;
  return overlay;
}

function setOverlayState(overlay, isActive) {
  if (!overlay) return;
  if (isActive) {
    overlay.style.background = 'rgba(23, 17, 39, 0.92)';
    overlay.style.border = '2px dashed #818cf8';
    overlay.style.color = '#c7d2fe';
    overlay.style.opacity = '1';
    overlay.style.transform = 'scale(1)';
  } else {
    // Inactive (light opacity when not hovered)
    overlay.style.background = 'rgba(23, 17, 39, 0.45)';
    overlay.style.border = '1px dashed rgba(129, 140, 248, 0.3)';
    overlay.style.color = 'rgba(199, 210, 254, 0.6)';
    overlay.style.opacity = '0.7';
    overlay.style.transform = 'scale(0.99)';
  }
}

function ensureNotebookLMOverlays() {
  if (currentPlatform !== 'notebooklm') return;

  const sourcePanelEl = document.querySelector('.source-panel') || document.querySelector('nav[aria-label*="Sources" i]');
  const chatBoxEl = document.querySelector('textarea.query-box-input') || 
                    document.querySelector('textarea[placeholder*="Ask a question" i]') || 
                    document.querySelector('textarea[aria-label="Query box"]');

  if (sourcePanelEl && !notebookLMSourceOverlay) {
    notebookLMSourceOverlay = createSingleOverlay("Drop to Add as Source");
    
    // Ensure relative positioning on the source panel
    const origPosition = window.getComputedStyle(sourcePanelEl).position;
    if (origPosition !== 'relative' && origPosition !== 'absolute' && origPosition !== 'fixed') {
      sourcePanelEl.style.position = 'relative';
    }
    sourcePanelEl.appendChild(notebookLMSourceOverlay);
    setOverlayState(notebookLMSourceOverlay, false);
  }

  if (chatBoxEl && !notebookLMChatOverlay) {
    notebookLMChatOverlay = createSingleOverlay("Drop Capsule Here");
    
    const container = chatBoxEl.parentElement;
    if (container) {
      const origPosition = window.getComputedStyle(container).position;
      if (origPosition !== 'relative' && origPosition !== 'absolute' && origPosition !== 'fixed') {
        container.style.position = 'relative';
      }
      container.appendChild(notebookLMChatOverlay);
      setOverlayState(notebookLMChatOverlay, false);
    }
  }
}

function hideNotebookLMOverlays() {
  if (notebookLMSourceOverlay) {
    notebookLMSourceOverlay.remove();
    notebookLMSourceOverlay = null;
  }
  if (notebookLMChatOverlay) {
    notebookLMChatOverlay.remove();
    notebookLMChatOverlay = null;
  }
}

function showDragOverlay(targetInput, overlayText = "Drop Capsule Here") {
  const container = targetInput.parentElement;
  if (dragOverlay) {
    const textSpan = dragOverlay.querySelector('#tilantra-drag-overlay-text');
    if (textSpan) textSpan.innerText = overlayText;
    if (container && dragOverlay.parentElement !== container) {
      const origPosition = window.getComputedStyle(container).position;
      if (origPosition !== 'relative' && origPosition !== 'absolute' && origPosition !== 'fixed') {
        container.style.position = 'relative';
      }
      container.appendChild(dragOverlay);
    }
    return;
  }
  
  dragOverlay = document.createElement('div');
  dragOverlay.id = 'tilantra-drag-drop-overlay';
  dragOverlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(17, 24, 39, 0.95);
    border: 2px dashed #818cf8;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #818cf8;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 600;
    pointer-events: none;
    z-index: 10000;
    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    animation: tilantraOverlayFadeIn 0.2s ease-out;
  `;
  dragOverlay.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px;">
      <img src="${chrome.runtime.getURL('capsule.png')}" style="width:20px; height:20px; object-fit:contain;">
      <span id="tilantra-drag-overlay-text">${overlayText}</span>
    </div>
    <style>
      @keyframes tilantraOverlayFadeIn {
        from { opacity: 0; transform: scale(0.98); }
        to { opacity: 1; transform: scale(1); }
      }
    </style>
  `;
  
  if (container) {
    const origPosition = window.getComputedStyle(container).position;
    if (origPosition !== 'relative' && origPosition !== 'absolute' && origPosition !== 'fixed') {
      container.style.position = 'relative';
    }
    container.appendChild(dragOverlay);
  }
}

function hideDragOverlay() {
  if (dragOverlay) {
    dragOverlay.remove();
    dragOverlay = null;
  }
}

document.addEventListener("drop", (e) => {
  if (!e || !e.dataTransfer) return;
  
  let data = null;
  try {
    data = e.dataTransfer.getData("text/plain");
  } catch (err) {
    // Ignore sandbox or security wrapper errors accessing dataTransfer
    return;
  }

  if (data && data.startsWith("CAPSULE_ID:")) {
    // Stop the site's default behavior (e.g. Claude pasting the ID)
    e.preventDefault();
    e.stopPropagation();

    dragCounter = 0;
    if (currentPlatform === 'notebooklm') {
      hideNotebookLMOverlays();
    } else {
      hideDragOverlay();
    }

    const capsuleId = data.replace("CAPSULE_ID:", "");

    let mode = 'chat';
    if (currentPlatform === 'notebooklm') {
      const isSourcePanel = e.target.closest('.source-panel, source-picker, .source-panel-content, nav[aria-label*="Sources" i]');
      if (isSourcePanel) {
        mode = 'source';
      }
    }

    if (mode === 'source') {
      chrome.storage.local.get("tier", (storageData) => {
        if (storageData.tier === 'elite' || storageData.tier === 'enterprise') {
          showDroppingAnimation();
          fetchAndInjectCapsule(capsuleId, 'source');
        } else {
          showCustomModal("Source Injection is an Elite feature. Please upgrade to use this.");
        }
      });
    } else {
      showDroppingAnimation();
      fetchAndInjectCapsule(capsuleId, 'chat');
    }

    // Cleanup any lingering drag/drop overlays and states on the page!
    setTimeout(() => {
      const targets = [e.target, document.body, window];
      const allDivs = document.querySelectorAll('div');
      for (const div of allDivs) {
        const text = (div.textContent || "").toLowerCase();
        if (text.includes("drop") || text.includes("upload") || text.includes("drag")) {
          targets.unshift(div);
        }
      }

      const dataTransfer = e.dataTransfer || new DataTransfer();
      targets.forEach(el => {
        if (el) {
          el.dispatchEvent(new DragEvent('dragleave', { bubbles: true, cancelable: true, composed: true, dataTransfer }));
          el.dispatchEvent(new DragEvent('dragend', { bubbles: true, cancelable: true, composed: true, dataTransfer }));
          el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        }
      });
    }, 50);
  }
}, true); // true = capture phase


// Necessary to allow dropping
document.addEventListener("dragover", (e) => {
  if (currentPlatform === 'notebooklm') {
    if (e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types.includes("text/plain")) {
      e.preventDefault();
      
      ensureNotebookLMOverlays();
      
      const isSourcePanel = e.target.closest('.source-panel, source-picker, .source-panel-content, nav[aria-label*="Sources" i]');
      if (isSourcePanel) {
        setOverlayState(notebookLMSourceOverlay, true);
        setOverlayState(notebookLMChatOverlay, false);
      } else {
        const isChatBox = e.target.closest('.query-box, chat-panel, .chat-panel, .query-box-input');
        if (isChatBox) {
          setOverlayState(notebookLMSourceOverlay, false);
          setOverlayState(notebookLMChatOverlay, true);
        } else {
          setOverlayState(notebookLMSourceOverlay, false);
          setOverlayState(notebookLMChatOverlay, false);
        }
      }
    }
  } else {
    e.preventDefault();
  }
}, true);

document.addEventListener("dragenter", (e) => {
  if (currentPlatform === 'notebooklm') {
    if (e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types.includes("text/plain")) {
      dragCounter++;
      
      ensureNotebookLMOverlays();
      
      const isSourcePanel = e.target.closest('.source-panel, source-picker, .source-panel-content, nav[aria-label*="Sources" i]');
      if (isSourcePanel) {
        setOverlayState(notebookLMSourceOverlay, true);
        setOverlayState(notebookLMChatOverlay, false);
      } else {
        const isChatBox = e.target.closest('.query-box, chat-panel, .chat-panel, .query-box-input');
        if (isChatBox) {
          setOverlayState(notebookLMSourceOverlay, false);
          setOverlayState(notebookLMChatOverlay, true);
        } else {
          setOverlayState(notebookLMSourceOverlay, false);
          setOverlayState(notebookLMChatOverlay, false);
        }
      }
    }
  }
}, true);

document.addEventListener("dragleave", (e) => {
  if (currentPlatform === 'notebooklm') {
    if (e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types.includes("text/plain")) {
      dragCounter--;
      if (dragCounter <= 0) {
        dragCounter = 0;
        hideNotebookLMOverlays();
      }
    }
  }
}, true);

document.addEventListener("dragend", (e) => {
  dragCounter = 0;
  if (currentPlatform === 'notebooklm') {
    hideNotebookLMOverlays();
  } else {
    hideDragOverlay();
  }
}, true);

/**********************************************************
 * CHAT INPUT BUTTON INJECTION
 **********************************************************/


function ensureStylesInjected() {
  if (!document.getElementById('tilantra-capsule-styles')) {
    const style = document.createElement('style');
    style.id = 'tilantra-capsule-styles';
    style.textContent = `
        .tilantra-capsule-button-container {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin: 0 4px !important;
            vertical-align: middle !important;
            z-index: 9999 !important;
            height: 32px !important;
            width: 32px !important;
            border-radius: 50% !important;
            transition: all 0.2s !important;
            flex-shrink: 0 !important;
        }
        .tilantra-capsule-button-container:hover {
            background: rgba(255, 255, 255, 0.1) !important;
            transform: translateY(-1px) !important;
        }
        .tilantra-capsule-logo-btn {
            width: 22px !important;
            height: 22px !important;
            cursor: pointer !important;
            transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)) !important;
            display: block !important;
        }
        .tilantra-capsule-logo-btn:hover {
            transform: scale(1.15) !important;
        }
        .tilantra-capsule-loader {
            display: none !important;
            width: 22px !important;
            height: 22px !important;
            border: 2px solid #818cf8 !important;
            border-radius: 50% !important;
            border-top-color: transparent !important;
            animation: capsule-spin 0.6s linear infinite !important;
        }
        @keyframes capsule-spin { to { transform: rotate(360deg); } }
        .tilantra-capsule-button-container.loading .tilantra-capsule-logo-btn { display: none !important; }
        .tilantra-capsule-button-container.loading .tilantra-capsule-loader { display: block !important; }
        .tilantra-capsule-menu {
            display: none;
            position: fixed;
            background: #111827;
            border: 1px solid #1f2937;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.7);
            padding: 6px;
            min-width: 180px;
            flex-direction: column;
            gap: 4px;
            z-index: 100000;
            animation: capsuleMenuPop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes capsuleMenuPop {
            from { opacity: 0; transform: translateY(10px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .tilantra-capsule-menu.show { display: flex; }
        .tilantra-capsule-menu .tilantra-capsule-action-btn {
            display: flex !important; align-items: center !important; gap: 10px !important;
            width: 100% !important; padding: 10px 14px !important; border: none !important;
            background: transparent !important; color: #f3f4f6 !important; cursor: pointer !important;
            font-size: 13px !important; font-weight: 600 !important; border-radius: 10px !important;
            transition: all 0.2s !important; text-align: left !important;
            font-family: system-ui, -apple-system, sans-serif !important;
        }
        .tilantra-capsule-menu .tilantra-capsule-action-btn:hover { background: #1f2937 !important; color: #818cf8 !important; }
        .tilantra-capsule-menu .tilantra-capsule-action-btn svg { color: #6366f1; flex-shrink: 0; }
        .tilantra-capsule-enhance-wrapper { position: relative; display: flex; align-items: center; gap: 10px; width: 100%; }
        .tilantra-beta-badge {
            position: absolute; top: -2px; right: 10px;
            font-size: 7px !important; font-weight: 600 !important; letter-spacing: 0.07em !important;
            color: rgba(255,255,255,0.45) !important; background: transparent !important;
            border: 1px solid rgba(255,255,255,0.25) !important;
            padding: 0px 4px !important; border-radius: 4px !important;
            line-height: 1.6 !important; pointer-events: none !important;
            font-family: system-ui, -apple-system, sans-serif !important;
        }
        .tilantra-capsule-divider { height: 1px; background: #1f2937; margin: 4px 0; }
        .tilantra-capsule-toggle-row {
            display: flex; align-items: center; gap: 10px;
            padding: 8px 14px; cursor: pointer;
        }
        .tilantra-capsule-toggle-label { font-size: 12px; color: #9ca3af; }
        .capsule-project-checkbox-container {
            display: flex !important; align-items: center !important;
            margin-right: 15px !important; z-index: 999 !important;
            order: -1 !important; pointer-events: auto !important;
        }
    .capsule-batch-btn {
        position: fixed !important; bottom: 30px !important; right: 30px !important;
        background: linear-gradient(145deg, #111827 0%, #0f172a 100%) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important; color: white !important;
        padding: 10px 20px !important; border-radius: 100px !important;
        backdrop-filter: blur(12px) !important; font-weight: 600 !important; font-size: 13px !important;
        cursor: pointer !important; z-index: 99999 !important; display: flex !important;
        align-items: center !important; gap: 12px !important;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        opacity: 0; transform: translateY(20px) scale(0.95); pointer-events: none; user-select: none !important;
    }
    .capsule-batch-btn.show { opacity: 1 !important; transform: translateY(0) scale(1) !important; pointer-events: auto !important; }
    
    .capsule-thread-counter-btn {
        position: fixed !important; bottom: 90px !important; right: 30px !important;
        background: linear-gradient(145deg, #1f2937 0%, #111827 100%) !important;
        border: 1px solid rgba(99, 102, 241, 0.4) !important; color: white !important;
        padding: 10px 20px !important; border-radius: 100px !important;
        backdrop-filter: blur(12px) !important; font-weight: 600 !important; font-size: 13px !important;
        cursor: pointer !important; z-index: 99999 !important; display: flex !important;
        align-items: center !important; gap: 12px !important;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        opacity: 0; transform: translateY(20px) scale(0.95); pointer-events: none; user-select: none !important;
    }
    .capsule-thread-counter-btn.show { opacity: 1 !important; transform: translateY(0) scale(1) !important; pointer-events: auto !important; }
    .btn-badge { background: #6366f1 !important; color: white !important; padding: 2px 8px !important; border-radius: 10px !important; font-size: 11px; font-weight: 800; }

        .capsule-project-checkbox {
            appearance: none !important;
            -webkit-appearance: none !important;
            width: 18px !important;
            height: 18px !important;
            border: 2px solid #6366f1 !important;
            border-radius: 4px !important;
            background: transparent !important;
            cursor: pointer !important;
            position: relative !important;
            transition: all 0.2s ease !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
        .capsule-project-checkbox:hover {
            transform: scale(1.05) !important;
            border-color: #4f46e5 !important;
        }
        .capsule-project-checkbox:checked {
            background: #6366f1 !important;
            border-color: #6366f1 !important;
        }
        .capsule-project-checkbox:checked::after {
            content: "✓" !important;
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            color: white !important;
            font-size: 12px !important;
            font-weight: bold !important;
            display: block !important;
        }
        .tilantra-dc-checkbox {
            appearance: none !important;
            -webkit-appearance: none !important;
            width: 14px !important;
            height: 14px !important;
            border: 2px solid #4b5563 !important;
            border-radius: 3px !important;
            background: transparent !important;
            cursor: pointer !important;
            flex-shrink: 0 !important;
            transition: border-color 0.15s, background 0.15s !important;
            position: relative !important;
        }
        .tilantra-dc-checkbox:checked {
            background: #6366f1 !important;
            border-color: #6366f1 !important;
        }
        .tilantra-dc-checkbox:checked::after {
            content: '' !important;
            position: absolute !important;
            left: 2px !important;
            top: -1px !important;
            width: 5px !important;
            height: 9px !important;
            border: 2px solid #fff !important;
            border-top: none !important;
            border-left: none !important;
            transform: rotate(45deg) !important;
            display: block !important;
        }

        /* =====================================================
         * IDLE NUDGE: pulsing glow on the capsule logo icon
         * ===================================================== */
        @keyframes capsule-idle-glow {
            0%, 100% { filter: drop-shadow(0 0 4px rgba(99,102,241,0.55)) drop-shadow(0 2px 4px rgba(0,0,0,0.2)); }
            50%       { filter: drop-shadow(0 0 11px rgba(129,140,248,0.90)) drop-shadow(0 2px 4px rgba(0,0,0,0.2)); }
        }
        .tilantra-capsule-logo-btn.idle-glow,
        #gmail-capsule-btn.idle-glow {
            animation: capsule-idle-glow 2.2s ease-in-out infinite !important;
        }

        /* Nudge tooltip pill */
        .tilantra-nudge-tooltip {
            position: fixed;
            background: rgba(15, 23, 42, 0.90);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            color: #e0e7ff;
            font-size: 12px;
            font-weight: 600;
            font-family: system-ui, -apple-system, sans-serif;
            padding: 6px 14px;
            border-radius: 20px;
            border: 1px solid rgba(99, 102, 241, 0.50);
            box-shadow: 0 4px 20px rgba(0,0,0,0.50), 0 0 0 1px rgba(129,140,248,0.10);
            white-space: nowrap;
            z-index: 100001;
            pointer-events: none;
            opacity: 0;
            transform: translateY(5px);
            transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .tilantra-nudge-tooltip.visible {
            opacity: 1;
            transform: translateY(0);
        }
        /* downward caret connecting tooltip to button */
        .tilantra-nudge-tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 5px solid transparent;
            border-top-color: rgba(15, 23, 42, 0.90);
        }

        /* Animated three-dot reveal inside the nudge tooltip.
           Phase 1: each dot pops in sequentially (one-shot, stays lit).
           Phase 2: all three pulse-glow together once all are visible. */
        .tilantra-nudge-dots {
            display: inline-flex;
            align-items: center;
            gap: 3px;
            margin-left: 6px;
            vertical-align: middle;
        }
        .tilantra-nudge-dots span {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #818cf8;
            opacity: 0;
            /* One-shot reveal — fill: forwards keeps each dot lit permanently */
            animation: nudge-dot-appear 0.3s ease forwards;
        }
        /* Stagger: dot 1 then 2 then 3, each stays lit */
        .tilantra-nudge-dots span:nth-child(1) { animation-delay: 0s; }
        .tilantra-nudge-dots span:nth-child(2) { animation-delay: 0.35s; }
        .tilantra-nudge-dots span:nth-child(3) { animation-delay: 0.70s; }
        @keyframes nudge-dot-appear {
            from { opacity: 0; transform: scale(0.4); }
            to   { opacity: 1; transform: scale(1);   }
        }
`;
    document.head.appendChild(style);
  }


}

/**********************************************************
 * IDLE NUDGE
 * Shows a glowing aura + floating tooltip on the capsule
 * button once per calendar day per user.
 **********************************************************/
const NUDGE_MESSAGES = [
  "Capture today's context",
  null, // filled dynamically with "Want <other platform>'s opinion?" — see _getNudgeMessages()
  "Your AI needs context",
];

// Platform display names for the cross-platform nudge message
const _PLATFORM_NAMES = {
  'chatgpt': 'ChatGPT', 'chatgpt-project': 'ChatGPT',
  'claude': 'Claude', 'claude-project': 'Claude',
  'gemini': 'Gemini',
  'deepseek': 'DeepSeek',
  'perplexity': 'Perplexity',
  'lovable': 'Lovable',
  'replit': 'Replit',
  'notebooklm': 'NotebookLM',
};
const _ALL_PLATFORM_NAMES = ['ChatGPT', 'Claude', 'Gemini', 'DeepSeek', 'Perplexity', 'Replit', 'NotebookLM'];

/**
 * Returns the 3-message nudge array with the cross-platform message
 * computed at call-time based on the current active platform.
 */
function _getNudgeMessages() {
  const currentName = _PLATFORM_NAMES[currentPlatform] || '';
  const alternatives = _ALL_PLATFORM_NAMES.filter(p => p !== currentName);
  const suggested = alternatives[Math.floor(Math.random() * alternatives.length)];
  return [
    NUDGE_MESSAGES[0],
    `Want ${suggested}'s opinion?`,
    NUDGE_MESSAGES[2],
  ];
}
let _nudgeTooltipEl = null;
let _nudgeDismissHandler = null;
let _nudgeSessionShown = false;  // prevents re-show after dismiss within the same page session

/** Returns true if lastNudgeShownAt is a timestamp from today's calendar date */
function _isNudgeShownToday(lastNudgeShownAt) {
  if (!lastNudgeShownAt) return false;
  const last = new Date(lastNudgeShownAt);
  const now = new Date();
  return last.getFullYear() === now.getFullYear() &&
    last.getMonth() === now.getMonth() &&
    last.getDate() === now.getDate();
}

/** Returns a platform-specific storage key so each platform tracks its own once-per-day nudge independently. */
function _getNudgePlatformKey() {
  const p = currentPlatform || '';
  if (p.startsWith('chatgpt')) return 'nudgeShownAt_chatgpt';
  if (p.startsWith('claude')) return 'nudgeShownAt_claude';
  if (p === 'gmail' || p === 'mail') return 'nudgeShownAt_gmail';
  return `nudgeShownAt_${p || 'unknown'}`;
}

function checkAndApplyIdleNudge() {
  if (!isContextValid()) return;
  if (_nudgeSessionShown) return; // guard: only one nudge at a time

  // Resolve anchor element — differs between AI platforms and Gmail
  let anchorEl = null;
  const chatBtn = document.getElementById('tilantra-capsule-chat-button');
  if (chatBtn) {
    // AI platform: glow the inner logo image
    anchorEl = chatBtn.querySelector('.tilantra-capsule-logo-btn') || chatBtn;
  } else {
    // Gmail: the standalone capsule button injected by gmail-inserter.js
    const gmailBtn = document.getElementById('gmail-capsule-btn');
    if (gmailBtn) anchorEl = gmailBtn;
  }
  if (!anchorEl) return;

  // Each platform has its own once-per-day counter so opening Claude after GPT
  // still shows the nudge on Claude within the same day
  const storageKey = _getNudgePlatformKey();
  chrome.storage.local.get(['authToken', storageKey], ({ authToken, [storageKey]: lastNudgeShownAt }) => {
    if (!authToken) return; // not logged in — no nudge
    if (_isNudgeShownToday(lastNudgeShownAt)) return; // already nudged on this platform today

    // Mark as shown for this session AND this calendar day so the polling
    // loop never triggers a second show
    _nudgeSessionShown = true;
    chrome.storage.local.set({ [storageKey]: Date.now() });

    // Apply glow to the anchor
    anchorEl.classList.add('idle-glow');

    // Show the tooltip
    _showNudgeTooltip(anchorEl);
  });
}

function _showNudgeTooltip(anchorEl) {
  // Build the message list fresh (generates the dynamic cross-platform message)
  const messages = _getNudgeMessages();

  let msg;
  if (anchorEl.id === 'gmail-capsule-btn') {
    // Gmail context: only show the cross-platform "Want <X>'s opinion?" message (index 1)
    msg = messages[1];
  } else {
    // AI platform: pick a random message
    msg = messages[Math.floor(Math.random() * messages.length)];
  }

  _nudgeTooltipEl = document.createElement('div');
  _nudgeTooltipEl.className = 'tilantra-nudge-tooltip';
  _nudgeTooltipEl.textContent = msg;

  // Append animated three-dot ellipsis after the message text
  const dotsEl = document.createElement('span');
  dotsEl.className = 'tilantra-nudge-dots';
  dotsEl.innerHTML = '<span></span><span></span><span></span>';
  _nudgeTooltipEl.appendChild(dotsEl);

  document.body.appendChild(_nudgeTooltipEl);

  function _positionTooltip() {
    if (!_nudgeTooltipEl || !document.body.contains(_nudgeTooltipEl)) return;
    const rect = anchorEl.getBoundingClientRect();
    const tw = _nudgeTooltipEl.offsetWidth || 170;
    const th = _nudgeTooltipEl.offsetHeight || 30;
    const gap = 8;
    let left = rect.left + rect.width / 2 - tw / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
    _nudgeTooltipEl.style.left = `${left}px`;
    _nudgeTooltipEl.style.top = `${Math.max(10, rect.top - th - gap)}px`;
  }

  // Two rAF passes so the browser has rendered and we get accurate dimensions
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!_nudgeTooltipEl) return;
      _positionTooltip();
      _nudgeTooltipEl.classList.add('visible');
    });
  });

  // Auto-dismiss after 4 seconds
  const autoDismissTimer = setTimeout(() => _dismissNudgeTooltip(anchorEl), 4000);

  // Dismiss immediately on any page click
  _nudgeDismissHandler = () => {
    clearTimeout(autoDismissTimer);
    _dismissNudgeTooltip(anchorEl);
  };
  document.addEventListener('click', _nudgeDismissHandler, { once: true });
}

function _dismissNudgeTooltip(anchorEl) {
  if (_nudgeDismissHandler) {
    document.removeEventListener('click', _nudgeDismissHandler);
    _nudgeDismissHandler = null;
  }
  // Remove the glow from the icon
  if (anchorEl) anchorEl.classList.remove('idle-glow');
  if (_nudgeTooltipEl) {
    _nudgeTooltipEl.classList.remove('visible');
    const el = _nudgeTooltipEl;
    _nudgeTooltipEl = null;
    setTimeout(() => { if (el.parentNode) el.remove(); }, 350);
  }
}

function findEmergentSendButton() {
  // 1. Direct match by bottom-left chatbox submit test ID
  let btn = Array.from(document.querySelectorAll('[data-testid="chat-input-submit"]'))
    .find(el => el.getBoundingClientRect().height > 0);
  if (btn) return btn;

  // 2. Fallback: local traversal starting strictly from bottom-left chatbox input
  const chatInputs = Array.from(document.querySelectorAll('[data-testid="chat-input"]'))
    .filter(el => el.getBoundingClientRect().height > 0);
  const chatInput = chatInputs[0];
  if (chatInput) {
    let chatContainer = chatInput;
    for (let i = 0; i < 6; i++) {
      if (chatContainer.parentElement) {
        chatContainer = chatContainer.parentElement;
        if (chatContainer.querySelectorAll('svg').length >= 2) break;
      }
    }
    const svgs = Array.from(chatContainer.querySelectorAll('svg'));
    if (svgs.length > 0) {
      const lastSvg = svgs[svgs.length - 1];
      return lastSvg.closest('button, [role="button"], a') || lastSvg.parentElement;
    }
  }
  return null;
}

async function injectButtonIfNeeded() {
  if (!isContextValid()) return;
  const existing = document.getElementById('tilantra-capsule-chat-button');

  // Only show if logged in
  let authToken;
  try {
    const data = await chrome.storage.local.get("authToken");
    authToken = data.authToken;
  } catch (e) {
    return; // Context invalidated or storage fail
  }
  if (!authToken) {
    if (existing) existing.remove();
    return;
  }

  let container = null;
  let insertBefore = null;

  if (currentPlatform === 'chatgpt' || currentPlatform === 'chatgpt-project') {
    // Use the user-suggested #thread-bottom for maximum stability across conversation switches
    const threadBottom = document.getElementById('thread-bottom') || document.querySelector('form');

    // If a button exists but isn't in THIS thread's control area, it's stale (from a previous chat)
    if (existing && threadBottom && !threadBottom.contains(existing)) {
      existing.remove();
    }

    if (threadBottom) {
      // Find the flex row that contains the dictate, voice, and send buttons
      const sendBtn = threadBottom.querySelector('button[data-testid="send-button"]') ||
        threadBottom.querySelector('button[aria-label="Send prompt"]');

      if (sendBtn) {
        // The direct parent of the send button is usually where we want to insert.
        container = sendBtn.parentElement;
        if (container.tagName === 'SPAN' || container.tagName === 'DIV') {
          container = container.parentElement;
          insertBefore = sendBtn.parentElement;
        } else {
          insertBefore = sendBtn;
        }
      } else {
        container = threadBottom.querySelector('.ms-auto.flex.items-center') ||
          threadBottom.querySelector('[grid-area="trailing"] div');
        if (container) insertBefore = container.lastElementChild;
      }
    }

    // If the button is already in the correct place, we can stop here
    if (existing && container && container.contains(existing)) {
      return;
    }
  } else {
    if (currentPlatform === 'perplexity') {
      // Re-check each interval so the button follows SPA navigation (home → conversation and back)
      // Home page uses Dictation/Voice mode buttons; conversation page uses Submit button
      const anchor = document.querySelector('button[aria-label="Submit"]') ||
        document.querySelector('button[aria-label="Dictation"]') ||
        document.querySelector('button[aria-label="Voice mode"]');
      if (existing && anchor) {
        // The flex row that contains all right-side buttons
        const rightRow = anchor.closest('[class*="col-start-3"]') ||
          anchor.closest('[class*="justify-self-end"]') ||
          anchor.parentElement?.parentElement;
        if (rightRow && rightRow.contains(existing)) return;
      }
      if (existing) existing.remove();
    } else if (currentPlatform === 'grok') {
      // Follow SPA navigation: the home page exposes the voice-mode button and a
      // conversation exposes the Submit button (same slot). Re-anchor whenever the
      // pill isn't sitting beside the current anchor, so it survives re-renders
      // without needing a page reload.
      const anchor = document.querySelector('button[data-testid="chat-submit"]') ||
        document.querySelector('button[type="submit"][aria-label="Submit"]') ||
        document.querySelector('button[aria-label^="Enter voice mode"]') ||
        document.querySelector('button[aria-label*="voice mode" i]');
      if (existing && anchor && anchor.parentElement && anchor.parentElement.contains(existing)) {
        return; // already correctly placed next to the live anchor
      }
      if (existing) existing.remove();
    } else if (currentPlatform === 'emergent') {
      const isChatPage = window.location.pathname.includes('/chat');
      if (existing) {
        if (isChatPage) {
          if (existing.parentElement !== document.body) {
            existing.remove();
          } else {
            // Keep button in document.body, but let layout updates reposition it
            return;
          }
        } else {
          if (existing.parentElement === document.body) {
            existing.remove();
          }
        }
      }
    } else {
      // Original logic for other platforms
      if (existing && document.body.contains(existing)) return;
      if (existing) existing.remove();
    }

    if (currentPlatform === 'gemini') {
      // Gemini: Try to place it near the "Add files" plus button or "Tools" button
      const addBtn = document.querySelector('button[aria-label="Upload files"]') ||
        document.querySelector('button[aria-label="Add files"]') ||
        document.querySelector('.upload-button') ||
        document.querySelector('button[mattooltip="Upload files"]');

      const toolsBtn = document.querySelector('button[aria-label="Tools"]') ||
        document.querySelector('.toolbox-drawer-button') ||
        document.querySelector('button:has(.toolbox-drawer-button-label-icon-text)') ||
        document.querySelector('div[role="button"]:has(.toolbox-drawer-button-label-icon-text)');

      if (toolsBtn) {
        // Try to place BEFORE the Tools drawer (Left of Tools)
        const drawer = toolsBtn.closest('toolbox-drawer');
        if (drawer && drawer.parentElement) {
          container = drawer.parentElement;
          insertBefore = drawer;
        } else {
          // Fallback
          container = toolsBtn.parentElement;
          insertBefore = toolsBtn.nextSibling;
        }
      } else if (addBtn) {
        // Try to place AFTER the Uploader container (Right of Add)
        const uploaderContainer = addBtn.closest('.uploader-button-container') || addBtn.closest('uploader');
        if (uploaderContainer && uploaderContainer.parentElement) {
          container = uploaderContainer.parentElement;
          insertBefore = uploaderContainer.nextSibling;
        } else {
          // Fallback
          container = addBtn.parentElement;
          insertBefore = addBtn.nextSibling;
        }
      } else {
        // Fallback (Left side container preferred)
        const leftContainer = document.querySelector('.input-buttons-wrapper-left') ||
          document.querySelector('.input-area-buttons-left');

        if (leftContainer) {
          container = leftContainer;
        } else {
          // Last resort: Right side
          container = document.querySelector('.input-buttons-wrapper-bottom') ||
            document.querySelector('.trailing-actions-wrapper');
        }
      }
    } else if (currentPlatform === 'deepseek') {
      // DeepSeek: Left of the attachment (upload) button
      const attachBtn = document.querySelector('div[role="button"]:has(svg path[d^="M5.5498"])') ||
        document.querySelector('.f02f0e25') ||
        document.querySelector('div[role="button"]:has(.ds-icon--upload)');

      if (attachBtn) {
        container = attachBtn.parentElement;
        insertBefore = attachBtn;
      } else {
        const sendBtn = document.querySelector('div._7436101[role="button"]') ||
          document.querySelector('button[aria-label="Send"]');
        if (sendBtn) {
          container = sendBtn.parentElement;
          insertBefore = sendBtn;
        }
      }
    } else if (currentPlatform === 'claude' || currentPlatform === 'claude-project') {
      // Claude: Find the input area and its button container
      // Look for the contenteditable div first to ensure we're in the right area
      const inputBox = document.querySelector('div[contenteditable="true"]');

      if (inputBox) {
        // Find the parent fieldset or form that contains the input
        const inputContainer = inputBox.closest('fieldset') || inputBox.closest('form') || inputBox.closest('div[class*="relative"]');

        if (inputContainer) {
          // Look for button containers within or near the input container
          // Try multiple selectors for the button row
          const buttonRow = inputContainer.querySelector('div.flex.items-center') ||
            inputContainer.querySelector('div[class*="flex"][class*="items-center"]') ||
            inputContainer.querySelector('div[class*="gap"]');

          if (buttonRow) {
            container = buttonRow;

            // Try to position before the send button or model selector
            const sendBtn = buttonRow.querySelector('button[aria-label*="Send"]') ||
              buttonRow.querySelector('button[type="submit"]');
            const modelSelector = buttonRow.querySelector('button[aria-haspopup="menu"]');

            if (sendBtn) {
              insertBefore = sendBtn;
            } else if (modelSelector) {
              insertBefore = modelSelector;
            }
          }
        }
      }

      // Fallback: Use more general selectors
      if (!container) {
        const sendBtn = document.querySelector('button[aria-label*="Send Message"]') ||
          document.querySelector('button[aria-label*="Send message"]');

        if (sendBtn) {
          container = sendBtn.parentElement;
          insertBefore = sendBtn;
        }
      }
    } else if (currentPlatform === 'lovable') {
      // Lovable: Target the chat input in the sidebar
      const inputBox = document.querySelector('[aria-label="Chat input"]') ||
        document.querySelector('.ProseMirror');
      if (inputBox) {
        const plusBtn = document.querySelector('[data-testid="create-form-plus-menu-trigger"]');
        if (plusBtn) {
          container = plusBtn.parentElement;
          insertBefore = plusBtn.nextSibling;
        } else {
          container = inputBox.closest('.flex.flex-col') || inputBox.parentElement;
        }
      }
    } else if (currentPlatform === 'perplexity') {
      // On the home page the right-side buttons are Dictation + Voice mode (no Submit yet).
      // In a conversation the Submit button is present on the right side too.
      // We always target the right-side button row and insert BEFORE the Dictation button
      // (home: [Model] [CAPSULE] [Dictation] [Voice mode])
      // or BEFORE Submit (conversation: [...] [CAPSULE] [Submit])
      const submitBtn = document.querySelector('button[aria-label="Submit"]');
      const dictationBtn = document.querySelector('button[aria-label="Dictation"]');
      const voiceBtn = document.querySelector('button[aria-label="Voice mode"]');

      if (submitBtn) {
        // Conversation page — place before Submit
        container = submitBtn.parentElement;
        insertBefore = submitBtn;
      } else if (dictationBtn) {
        // Home page — the Dictation button sits inside a div.relative wrapper inside the right-side flex row
        const dictWrapper = dictationBtn.closest('.relative') || dictationBtn.parentElement;
        container = dictWrapper ? dictWrapper.parentElement : null;
        insertBefore = dictWrapper;
      } else if (voiceBtn) {
        // Fallback: place before the Voice mode button wrapper
        const voiceWrapper = voiceBtn.closest('.relative') || voiceBtn.parentElement;
        container = voiceWrapper ? voiceWrapper.parentElement : null;
        insertBefore = voiceWrapper;
      }
    } else if (currentPlatform === 'notebooklm') {
      const submitBtn = document.querySelector('query-box button.submit-button') ||
                        document.querySelector('button.submit-button') ||
                        document.querySelector('button[aria-label="Submit"]');
      if (submitBtn) {
        container = submitBtn.parentElement;
        insertBefore = submitBtn;
      }
    } else if (currentPlatform === 'replit' || currentPlatform === 'replit-project') {
      // In-app Agent uses a CodeMirror editor with a submit button (data-cy="ai-prompt-submit").
      const submitBtn = document.querySelector('button[data-cy="ai-prompt-submit"]') ||
        document.querySelector('button[aria-label="Start"]');
      if (submitBtn) {
        container = submitBtn.parentElement;
        insertBefore = submitBtn;
      } else {
        // Home page (replit.com/~): native <textarea> prompt box with an up-arrow
        // submit. Anchor off the textarea — walk up to the action row holding the
        // Plan / mic / send buttons and place the capsule button there.
        const promptArea = document.querySelector('textarea[placeholder*="mobile" i]') ||
          document.querySelector('textarea[placeholder]') ||
          document.querySelector('div.cm-content[contenteditable="true"]');
        if (promptArea) {
          let chatContainer = promptArea;
          for (let i = 0; i < 6; i++) {
            if (!chatContainer.parentElement) break;
            chatContainer = chatContainer.parentElement;
            if (chatContainer.querySelectorAll('button').length >= 1) break;
          }
          const sendBtn = chatContainer.querySelector('button[aria-label*="Send" i]') ||
            chatContainer.querySelector('button:last-of-type');
          if (sendBtn) {
            container = sendBtn.parentElement;
            insertBefore = sendBtn;
          } else {
            container = chatContainer;
          }
        } else {
          // Fallback: find the footer overlay area
          const footerOverlay = document.querySelector('div[class*="footerOverlay"]') ||
            document.querySelector('div[class*="CompactStackingBox"][class*="footerOverlay"]');
          if (footerOverlay) {
            container = footerOverlay;
          }
        }
      }
    } else if (currentPlatform === 'emergent') {
      const isChatPage = window.location.pathname.includes('/chat');
      console.log("💊 Emergent platform detected. isChatPage =", isChatPage, "URL =", window.location.href);

      if (isChatPage) {
        // --- CHAT PAGE CODE ---
        const sendBtn = findEmergentSendButton();
        console.log("💊 Found sendBtn on chat page:", sendBtn);
        if (sendBtn) {
          container = document.body; // Use body for chat page to bypass re-renders
          insertBefore = sendBtn; // Use sendBtn as local anchor
        }
      } else {
        // --- HOMEPAGE CODE (uses the first fix that worked perfectly on the homepage) ---
        const chatInput = document.querySelector('textarea, [contenteditable], [placeholder*="Message" i], [placeholder*="Build" i]');
        console.log("💊 Chat input found on homepage:", chatInput);
        if (chatInput) {
          let chatContainer = chatInput;
          // Traverse up to find the common container holding the buttons
          for (let i = 0; i < 6; i++) {
            if (chatContainer.parentElement) {
              chatContainer = chatContainer.parentElement;
              if (chatContainer.querySelectorAll('button').length >= 2) {
                break;
              }
            }
          }
          console.log("💊 Traversed homepage chatContainer:", chatContainer);

          if (chatContainer) {
            const publicBtn = Array.from(chatContainer.querySelectorAll('button, div[role="button"]'))
              .find(b => b.textContent && b.textContent.toLowerCase().includes('public'));
            console.log("💊 Homepage publicBtn found:", publicBtn);

            if (publicBtn) {
              container = publicBtn.parentElement;
              insertBefore = publicBtn;
            } else {
              container = chatInput.parentElement;
            }
          }
        }
      }
      console.log("💊 Final injection targets: container =", container, "insertBefore =", insertBefore);
    } else if (currentPlatform === 'copilot') {
      // Helper to pierce Shadow DOM for Copilot
      function deepQuery(selector, root = document.body) {
        if (!root || !root.tagName) return null;
        if (root.matches && root.matches(selector)) return root;
        if (root.shadowRoot) {
          const res = deepQuery(selector, root.shadowRoot);
          if (res) return res;
        }
        if (root.children) {
          for (const child of root.children) {
            const res = deepQuery(selector, child);
            if (res) return res;
          }
        }
        return null;
      }

      // Check for New Copilot Layout first (bottom action bar flex row):
      // [left: + / Smart / pen buttons]  ...  [right: mic/waveform button]
      // Always target the RIGHT side for consistent placement on both homepage and chat page.
      const bottomBar = deepQuery('.relative.bottom-0.flex.justify-between') ||
        deepQuery('[class*="composer"] [class*="bottom-0"]') ||
        deepQuery('.w-expanded-composer [class*="bottom-0"]');

      if (bottomBar) {
        // Use RIGHT container (lastElementChild) for consistent right-side placement
        const rightContainer = bottomBar.lastElementChild || bottomBar;
        if (rightContainer) {
          container = rightContainer;

          if (window.getComputedStyle(container).display !== 'flex') {
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.gap = '8px';
          }

          // Insert BEFORE the first visible button in the right container (mic/waveform)
          const rightBtn = rightContainer.querySelector('button') || rightContainer.querySelector('[role="button"]');
          if (rightBtn) {
            insertBefore = rightBtn;
          }
        }
      }

      // Fallback for Old Copilot Layout
      if (!container) {
        const textBox = deepQuery('#searchbox') || deepQuery('textarea[placeholder*="Copilot" i]') || deepQuery('textarea');

        if (textBox) {
          // The button is labelled "Talk to Copilot" or "Submit"!
          // We can find it directly using accessibility labels.
          let targetBtn = deepQuery('[aria-label*="Talk to Copilot" i]') ||
            deepQuery('[aria-label*="Submit" i]') ||
            deepQuery('[aria-label*="Send" i]') ||
            deepQuery('[aria-label*="voice" i]') ||
            deepQuery('[aria-label*="microphone" i]');

          if (targetBtn) {
            container = targetBtn.parentElement;

            if (container && window.getComputedStyle(container).display !== 'flex') {
              container.style.display = 'flex';
              container.style.alignItems = 'center';
              container.style.gap = '8px';
            }

            insertBefore = targetBtn; // Place right next to the mic/submit button
          }
        }
      }
    } else if (currentPlatform === 'grok') {
      // Anchor the capsule button to whatever occupies the composer's right cluster.
      // In a conversation the Submit button is present; on the home/new-chat page
      // it doesn't exist yet, so fall back to the voice-mode (waveform) button.
      const anchorBtn = document.querySelector('button[data-testid="chat-submit"]') ||
        document.querySelector('button[type="submit"][aria-label="Submit"]') ||
        document.querySelector('button[type="submit"]') ||
        document.querySelector('button[aria-label^="Enter voice mode"]') ||
        document.querySelector('button[aria-label*="voice mode" i]');
      if (anchorBtn) {
        container = anchorBtn.parentElement;
        if (container && window.getComputedStyle(container).display !== 'flex') {
          container.style.display = 'flex';
          container.style.alignItems = 'center';
          container.style.gap = '8px';
        }
        insertBefore = anchorBtn;
      }
      // No anchor this tick (composer mid-render) → leave container null and let the
      // next observer tick place the pill once the button exists, rather than
      // dropping it in the wrong spot under the "+" button.
    }
  }

  if (container) {
    const btn = createCapsuleButton();
    if (isGenerating) btn.classList.add('loading');

    if (currentPlatform === 'emergent') {
      const isChatPage = window.location.pathname.includes('/chat');

      if (isChatPage) {
        // --- CHAT PAGE: Decoupled body attachment + fixed positioning next to sendBtn ---
        if (!document.body.contains(btn)) {
          document.body.appendChild(btn);
        }

        if (insertBefore) {
          let anchor = insertBefore;
          const parent = insertBefore.parentElement;
          if (parent) {
            const siblings = Array.from(parent.querySelectorAll('button, [role="button"], svg'))
              .filter(el => {
                const r = el.getBoundingClientRect();
                return r.height > 0 && r.width > 0;
              });
            if (siblings.length > 0) {
              siblings.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
              anchor = siblings[0];
            }
          }
          const rect = anchor.getBoundingClientRect();
          btn.style.position = 'fixed';
          btn.style.zIndex = '999999';
          btn.style.top = `${rect.top + (rect.height - 32) / 2}px`;
          btn.style.left = `${rect.left - 38}px`; // 32px width + 6px gap
        }

        // Keep alignment perfectly responsive on scrolls and page resizes
        if (!window._emergentScrollAttached) {
          window._emergentScrollAttached = true;
          const updatePos = () => {
            const b = document.getElementById('tilantra-capsule-chat-button');
            if (b) {
              const sendBtn = findEmergentSendButton();
              if (sendBtn) {
                let anchor = sendBtn;
                const parent = sendBtn.parentElement;
                if (parent) {
                  const siblings = Array.from(parent.querySelectorAll('button, [role="button"], svg'))
                    .filter(el => {
                      const r = el.getBoundingClientRect();
                      return r.height > 0 && r.width > 0;
                    });
                  if (siblings.length > 0) {
                    siblings.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
                    anchor = siblings[0];
                  }
                }
                const r = anchor.getBoundingClientRect();
                b.style.top = `${r.top + (r.height - 32) / 2}px`;
                b.style.left = `${r.left - 38}px`;
              }
            }
          };
          window.addEventListener('scroll', updatePos, { passive: true });
          window.addEventListener('resize', updatePos, { passive: true });
          document.addEventListener('scroll', updatePos, { capture: true, passive: true });
          // Run updatePos periodically every 250ms to instantly adapt to React layout changes
          setInterval(updatePos, 250);
        }
      } else {
        // --- HOMEPAGE: Inline flow (allows native flexbox to align it perfectly centered) ---
        const existingBtn = document.getElementById('tilantra-capsule-chat-button');
        if (existingBtn) {
          if (container && container.contains(existingBtn)) {
            return;
          }
          existingBtn.remove();
        }

        // Strip off any fixed coordinates
        btn.style.position = '';
        btn.style.top = '';
        btn.style.left = '';
        btn.style.zIndex = '';

        if (insertBefore && insertBefore.parentElement === container) {
          container.insertBefore(btn, insertBefore);
        } else {
          container.appendChild(btn);
        }
      }
    } else {
      // Inject style into shadow root if the button is placed inside one (Copilot)
      const rootNode = container.getRootNode();
      if (rootNode instanceof ShadowRoot && !rootNode.getElementById('tilantra-capsule-styles-shadow')) {
        const styleClone = document.getElementById('tilantra-capsule-styles').cloneNode(true);
        styleClone.id = 'tilantra-capsule-styles-shadow';
        rootNode.appendChild(styleClone);
      }

      if (insertBefore && (insertBefore.parentElement === container || insertBefore.parentNode === container)) {
        container.insertBefore(btn, insertBefore);
      } else {
        container.appendChild(btn);
      }
    }
  }
}

function createCapsuleButton() {
  const btn = document.createElement('span');
  btn.id = 'tilantra-capsule-chat-button';
  btn.className = 'tilantra-capsule-button-container';

  btn.innerHTML = `
        <img src="${chrome.runtime.getURL('capsule.png')}" class="tilantra-capsule-logo-btn" title="Capsule Hub">
        <div class="tilantra-capsule-loader"></div>
    `;

  const isEmailPlatform = currentPlatform === 'gmail' || currentPlatform === 'mail' || currentPlatform === 'outlook';

  if (isEmailPlatform) {
    // Email platforms: clicking the button directly opens the popup (no Generate/Drop menu)
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const tag = getChatTitle();
      chrome.storage.local.set({ capturedTag: tag }, () => {
        chrome.runtime.sendMessage({ type: "OPEN_POPUP" });
      });
    };
  } else {
    // AI platforms: show the Generate / Drop menu on click
    const logo = btn.querySelector('.tilantra-capsule-logo-btn');

    let menu = document.getElementById('capsule-global-menu');
    if (!menu) {
      menu = document.createElement('div');
      menu.id = 'capsule-global-menu';
      menu.className = 'tilantra-capsule-menu';
      menu.innerHTML = `
          <button id="capsule-generate-btn" class="tilantra-capsule-action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20"/></svg>
              Generate
          </button>
          <button id="capsule-drop-btn" class="tilantra-capsule-action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Drop
          </button>
          <button id="capsule-enhance-btn" class="tilantra-capsule-action-btn" style="position:relative; overflow:visible !important;">
              <span class="tilantra-beta-badge">BETA</span>
              <span class="tilantra-capsule-enhance-wrapper">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>
                Cook This Prompt
              </span>
          </button>
          <div class="tilantra-capsule-divider" style="${DYNAMIC_CONTEXT_FEATURE_FLAG ? '' : 'display:none;'}"></div>
          <div id="capsule-dynamic-context-row" class="tilantra-capsule-toggle-row" style="${DYNAMIC_CONTEXT_FEATURE_FLAG ? '' : 'display:none;'}">
              <input type="checkbox" id="capsule-dc-checkbox" class="tilantra-dc-checkbox" ${dynamicContextEnabled ? 'checked' : ''} />
              <span class="tilantra-capsule-toggle-label">Dynamic Context</span>
          </div>
      `;
      document.body.appendChild(menu);

      menu.querySelector('#capsule-generate-btn').onclick = async (e) => {
        e.stopPropagation();
        if (!isContextValid()) {
          showCustomModal("Extension context invalidated. Please refresh the page.");
          return;
        }
        menu.classList.remove('show');

        const tag = getChatTitle();
        const convoId = getConversationId();
        const { tier } = await chrome.storage.local.get("tier");

        if (convoId && tier !== 'basic') {
          toggleLoading(true);
          // Check local mapping first (covers capsules that were dropped, not generated, in this conversation)
          chrome.storage.local.get("localConvoMappings", ({ localConvoMappings = {} }) => {
            const localCapsuleId = localConvoMappings[convoId];
            if (localCapsuleId) {
              toggleLoading(false);
              chrome.storage.local.set({ "showVersionChoiceOnce": localCapsuleId }, () => {
                chrome.runtime.sendMessage({ type: "OPEN_POPUP" });
              });
              return;
            }
            chrome.runtime.sendMessage({
              type: "CHECK_CONVO_MAPPING",
              payload: { conversationId: convoId }
            }, async (res) => {
              if (res?.success && res.data?.capsule_id) {
                toggleLoading(false);
                chrome.storage.local.set({ "showVersionChoiceOnce": res.data.capsule_id }, () => {
                  chrome.runtime.sendMessage({ type: "OPEN_POPUP" });
                });
              } else {
                await proceedWithGeneration(tag);
              }
            });
          });
        } else {
          await proceedWithGeneration(tag);
        }
      };

      menu.querySelector('#capsule-drop-btn').onclick = (e) => {
        e.stopPropagation();
        if (!isContextValid()) {
          showCustomModal("Extension context invalidated. Please refresh the page.");
          return;
        }
        menu.classList.remove('show');

        chrome.storage.local.set({ "showLibraryOnce": true }, () => {
          chrome.runtime.sendMessage({ type: "OPEN_POPUP" });
        });
      };

      menu.querySelector('#capsule-enhance-btn').onclick = async (e) => {
        e.stopPropagation();
        menu.classList.remove('show');
        await handleEnhancePrompt();
      };

      // Dynamic Context checkbox handler
      menu.querySelector('#capsule-dc-checkbox').onclick = (e) => {
        e.stopPropagation();
        if (!isContextValid()) {
          showCustomModal("Extension context invalidated. Please refresh the page.");
          return;
        }
        dynamicContextEnabled = menu.querySelector('#capsule-dc-checkbox').checked;
        chrome.storage.local.set({ dynamicContextEnabled });
        showToast(dynamicContextEnabled ? 'Dynamic Context ON ✓' : 'Dynamic Context OFF');
      };
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.tilantra-capsule-menu').forEach(m => m.classList.remove('show'));
      }
    });

    logo.onclick = async (e) => {
      e.stopPropagation();
      if (!isContextValid()) {
        showCustomModal("Extension context invalidated. Please refresh the page.");
        return;
      }
      if (!menu) return;
      const isShowing = menu.classList.contains('show');

      document.querySelectorAll('.tilantra-capsule-menu').forEach(m => m.classList.remove('show'));

      if (!isShowing) {
        // Sync checkbox to current in-memory state before showing
        const cb = menu.querySelector('#capsule-dc-checkbox');
        if (cb) cb.checked = dynamicContextEnabled;
        const rect = logo.getBoundingClientRect();

        menu.style.top = '';
        menu.style.bottom = '';
        menu.style.left = '';
        menu.style.right = '';

        // Show first to measure actual dimensions (accounts for hidden rows/flags)
        menu.classList.add('show');
        const menuHeight = menu.offsetHeight;
        const menuWidth = menu.offsetWidth;
        const topValue = rect.top - menuHeight - 8; // 8px gap above button

        const leftValue = rect.left;
        const rightEdge = leftValue + menuWidth;
        const viewportWidth = window.innerWidth;

        if (menu) {
          if (rightEdge > viewportWidth - 10) {
            menu.style.right = `${viewportWidth - rect.right}px`;
            menu.style.left = 'auto';
          } else {
            menu.style.left = `${leftValue}px`;
            menu.style.right = 'auto';
          }
          menu.style.top = `${Math.max(10, topValue)}px`;
        }

        // Hide Dynamic Context when feature flag is OFF, or for Basic/Pro tiers
        const { tier } = await chrome.storage.local.get("tier");
        const dcRow = menu.querySelector('#capsule-dynamic-context-row');
        const divider = menu.querySelector('.tilantra-capsule-divider');
        if (!DYNAMIC_CONTEXT_FEATURE_FLAG || tier === 'basic' || tier === 'pro') {
          if (dcRow) dcRow.style.display = 'none';
          if (divider) divider.style.display = 'none';
        } else {
          if (dcRow) dcRow.style.display = 'flex';
          if (divider) divider.style.display = 'block';
        }
      } else {
        menu.classList.remove('show');
      }
    };

    document.addEventListener('click', () => {
      menu.classList.remove('show');
    });
  }

  return btn;
}

async function proceedWithGeneration(tag) {
  if (!isContextValid()) {
    showCustomModal("Extension context invalidated. Please refresh the page.");
    return;
  }
  let msgs = [];
  const { tier } = await chrome.storage.local.get("tier");
  const opts = { includeAttachments: tier !== 'basic' };

  try {
    if (currentPlatform === 'chatgpt') msgs = await getMessagesFromChatGPT();
    else if (currentPlatform === 'gemini') msgs = await getMessagesFromGemini();
    else if (currentPlatform.startsWith('claude')) msgs = await getMessagesFromClaude();
    else if (currentPlatform === 'deepseek') msgs = await getMessagesFromDeepSeek();
    else if (currentPlatform === 'perplexity') msgs = await getMessagesFromPerplexity();
    else if (currentPlatform === 'lovable') msgs = await getMessagesFromLovable();
    else if (currentPlatform === 'replit') msgs = await getMessagesFromReplit();
    else if (currentPlatform === 'emergent') msgs = await getMessagesFromEmergent(opts);
    else if (currentPlatform === 'gmail' || currentPlatform === 'mail') msgs = await getMessagesFromGmail();
    else if (currentPlatform === 'outlook') msgs = await getMessagesFromOutlook();
    else if (currentPlatform === 'copilot') msgs = await getMessagesFromCopilot();
    else if (currentPlatform === 'grok') msgs = await getMessagesFromGrok();
    else if (currentPlatform === 'notebooklm') msgs = await getMessagesFromNotebookLM();

    if (msgs && msgs.length > 0) {
      toggleLoading(true);
      try {
        await generateCapsuleFromMessages(msgs, tag);
      } finally {
        toggleLoading(false);
      }
    } else {
      showCustomModal("No messages found. Please start a conversation first.");
    }
  } catch (err) {
    console.error("Capsule Gen Error:", err);
    const errMsg = (err?.message || String(err)).toLowerCase();
    if (err === "upgrade_required" || errMsg.includes("upgrade_required") || errMsg.includes("limit") || errMsg.includes("internal server error")) {
      showCustomModal("Capsule creation limit reached. Please upgrade your tier to proceed.", true);
    } else {
      showCustomModal("Capsule Generation Error: " + (err.message || err));
    }
    toggleLoading(false);
  }
}

// Start watching for input areas
if (isContextValid()) {
  setInterval(() => {
    if (!isContextValid()) return;
    currentPlatform = detectPlatform();
    ensureStylesInjected();
    injectButtonIfNeeded();
    injectMultiSelectUI();
    checkAndApplyIdleNudge();
  }, 1000);

  ensureStylesInjected();
  injectButtonIfNeeded();
  injectMultiSelectUI();
  initFastFilterWatcher();
  checkAndApplyIdleNudge(); // immediate check on page load
}

/**********************************************************
 * PROJECT & EMAIL MULTI-SELECT
 **********************************************************/
function injectMultiSelectUI() {
  if (currentPlatform !== 'claude-project' && currentPlatform !== 'chatgpt-project' && currentPlatform !== 'replit-project' && currentPlatform !== 'gmail' && currentPlatform !== 'mail' && currentPlatform !== 'outlook' && currentPlatform !== 'emergent') {
    const btn = document.getElementById('capsule-batch-generate-btn');
    if (btn) btn.classList.remove('show');
    document.querySelectorAll('.capsule-project-checkbox-container').forEach(el => el.remove());
    return;
  }

  let itemsToInject = [];

  if (currentPlatform === 'claude-project') {
    itemsToInject = Array.from(document.querySelectorAll('a[href*="/chat/"]')).filter(a => {
      const text = (a.innerText || "").toLowerCase();
      return text.includes('last message') || a.parentElement.innerText.toLowerCase().includes('last message');
    }).map(a => ({ el: a, url: a.href }));
  } else if (currentPlatform === 'chatgpt-project') {
    itemsToInject = Array.from(document.querySelectorAll('a[href*="/c/"], a[href*="/chat/"], a[data-testid*="chat-link"]')).filter(a => {
      const nav = a.closest('nav');
      if (nav) return false;
      const rect = a.getBoundingClientRect();
      if (rect.left < 300) return false;
      return a.innerText.length > 0;
    }).map(a => ({ el: a, url: a.href }));
  } else if (currentPlatform === 'gmail' || currentPlatform === 'mail') {
    // Gmail List Rows
    itemsToInject = Array.from(document.querySelectorAll('tr.zA, div[role="row"]')).map(tr => {
      // Find ANY link that might be a thread link (matches #inbox/..., #all/..., etc)
      const link = tr.querySelector('a[href*="#"]');
      if (!link) return null;
      // We keep the 'tr' as the element to inject into later
      return { el: tr, url: link.href, isEmail: true };
    }).filter(x => x);
  } else if (currentPlatform === 'outlook') {
    // Outlook List Rows
    itemsToInject = Array.from(document.querySelectorAll('div[role="row"], div[data-convid], [aria-label="Message list"] [role="listitem"], .hcU7z, [data-automationid="DetailsRow"], .listDefault')).map(row => {
      // Find a link or use a fallback
      const link = row.querySelector('a[href*="/mail/"], a[data-ktp-execute-target], button[aria-label]');
      const fallbackLink = link || row.closest('a') || row.querySelector('a');
      const url = fallbackLink ? (fallbackLink.href || window.location.href) : window.location.href;
      return { el: row, url: url, isEmail: true };
    }).filter(x => x);
  } else if (currentPlatform === 'replit-project') {
    // Replit Dashboard - List View ONLY (Targeting data-href rows found in debug logs)
    itemsToInject = Array.from(document.querySelectorAll('tr[data-href*="/@"]')).map(row => {
      const href = row.getAttribute('data-href');
      if (!href) return null;

      // Target the first cell (usually empty/checkbox column) or the name cell
      const targetCell = row.querySelector('td') || row.firstElementChild;
      if (!targetCell) return null;

      // Ensure URL is absolute for the iframe generator
      const fullUrl = href.startsWith('http') ? href : `https://replit.com${href}`;

      return { el: targetCell, url: fullUrl, isReplitList: true };
    }).filter(Boolean);
  } else if (currentPlatform === 'emergent') {
    const taskRows = Array.from(document.querySelectorAll('tr, [role="row"], div[class*="row"]')).filter(row => {
      const text = row.textContent || '';
      return text.includes('EMT -') && !row.querySelector('.capsule-project-checkbox-container');
    });

    itemsToInject = taskRows.map(row => {
      const targetCell = row.querySelector('td') || row.firstElementChild;
      if (!targetCell) return null;

      const link = row.querySelector('a');
      let url = link ? link.href : window.location.origin + '/chat';

      return { el: targetCell, url: url, isEmergentList: true };
    }).filter(Boolean);
  }

  if (currentPlatform === 'gmail' || currentPlatform === 'mail' || currentPlatform === 'outlook') {
    // Gmail/Outlook already have native multi-select checkboxes for list view.
    // We only need the batch CTA for list view.
    ensureBatchButton();
    updateBatchButton();
    // Thread-specific logic (checkboxes/counter) removed as per user request.
    const threadBtn = document.getElementById('capsule-thread-counter-btn');
    if (threadBtn) threadBtn.classList.remove('show');
    return;
  }

  if (currentPlatform === 'replit-project' || currentPlatform === 'emergent') {
    ensureBatchButton();
    updateBatchButton();
  }

  if (itemsToInject.length === 0) {
    const btn = document.getElementById('capsule-batch-generate-btn');
    if (btn) btn.classList.remove('show');
    return;
  }

  itemsToInject.forEach(item => {
    if (item.el.querySelector('.capsule-project-checkbox-container')) return;

    const container = document.createElement('div');
    container.className = 'capsule-project-checkbox-container';
    if (item.isEmail) {
      container.style.cssText = 'margin-left: 10px; margin-right: 10px; display: flex; align-items: center; min-width: 30px; justify-content: center; z-index: 1000; position: relative;';
    }
    container.innerHTML = `<input type="checkbox" class="capsule-project-checkbox" data-url="${item.url}" style="width: 20px; height: 20px; cursor: pointer;">`;
    container.onclick = (e) => {
      e.stopPropagation();
    };

    if (item.isEmail && (currentPlatform === 'gmail' || currentPlatform === 'mail')) {
      // Gmail: Target the standard checkbox/star cell (now searching from the 'tr')
      const cell = item.el.querySelector('td.oZ-x3, td.apU, td[role="gridcell"]') || item.el.firstElementChild;
      if (cell) {
        container.style.cssText = 'display: inline-flex; margin-right: 8px; margin-left: 4px; align-items: center; min-width: 30px; justify-content: center; z-index: 1000; position: relative;';
        cell.prepend(container);
      } else {
        item.el.prepend(container);
      }
    } else if (item.isEmail && currentPlatform === 'outlook') {
      // Outlook: Try to find a safe inner wrapper to prepend to
      const inner = item.el.querySelector('div[data-automationid="DetailsRow"], .hcU7z, .zItB1') || item.el.firstElementChild || item.el;

      if (inner !== item.el) {
        container.style.display = 'inline-flex';
        // If we found an inner wrapper, ensure it can hold our checkbox
        const innerStyle = window.getSelection ? window.getComputedStyle(inner) : {};
        if (innerStyle.display !== 'flex') {
          inner.style.display = 'flex';
          inner.style.alignItems = 'center';
        }
        inner.prepend(container);
      } else {
        // Fallback to row itself
        if (item.el.style.display !== 'flex') {
          item.el.style.display = 'flex';
          item.el.style.alignItems = 'center';
        }
        item.el.prepend(container);
      }
    } else if (item.isReplitList) {
      // Replit List View - Direct injection into name container
      container.style.cssText = 'display: inline-flex !important; align-items: center !important; justify-content: center !important; z-index: 1000 !important; margin-right: 12px !important; position: relative !important; min-width: 20px !important;';
      item.el.style.display = 'flex';
      item.el.style.alignItems = 'center';
      item.el.prepend(container);
    } else if (item.isEmergentList) {
      // Emergent List View - Direct injection into ID column cell
      container.style.cssText = 'display: inline-flex !important; align-items: center !important; justify-content: center !important; z-index: 1000 !important; margin-right: 10px !important; position: relative !important; min-width: 20px !important;';
      const style = window.getSelection ? window.getComputedStyle(item.el) : {};
      if (style.display !== 'flex') {
        item.el.style.display = 'flex';
        item.el.style.alignItems = 'center';
      }
      item.el.prepend(container);
    } else {
      item.el.style.display = 'flex';
      item.el.style.alignItems = 'center';
      container.style.marginRight = '10px';
      container.style.marginLeft = '5px';
      item.el.prepend(container);
    }

    const input = container.querySelector('input');
    input.onclick = (e) => {
      e.stopPropagation();
    };
    input.onchange = (e) => {
      updateBatchButton();
    };
  });


  // 2. Inject/Update Batch Button
  ensureBatchButton();
}

function updateBatchButton() {
  const selectedCount = (currentPlatform === 'gmail' || currentPlatform === 'mail')
    ? getSelectedGmailThreadTargets().length
    : currentPlatform === 'outlook'
      ? getNativeSelectedEmailRows().length
      : document.querySelectorAll('.capsule-project-checkbox:checked').length;

  const batchBtn = document.getElementById('capsule-batch-generate-btn');
  if (!batchBtn) return;

  if (selectedCount === 0) {
    batchBtn.classList.remove('show');
    batchBtn.style.opacity = ''; // Clear inline opacity to allow CSS to hide it
    return;
  }

  batchBtn.classList.add('show');
  const badge = batchBtn.querySelector('.btn-badge');
  if (badge) badge.innerText = selectedCount;
  batchBtn.disabled = false;
}


async function handleBatchGeneration() {
  if (isGenerating) return;

  const selected = (currentPlatform === 'gmail' || currentPlatform === 'mail')
    ? getSelectedGmailThreadTargets()
    : (currentPlatform === 'outlook')
      ? getNativeSelectedEmailRows()
      : Array.from(document.querySelectorAll('.capsule-project-checkbox:checked'));
  if (selected.length === 0) return;

  try {
    toggleLoading(true);
    const batchBtn = document.getElementById('capsule-batch-generate-btn');

    const combinedHistory = [];

    if (currentPlatform === 'mail' || currentPlatform === 'gmail') {
      for (const [i, target] of selected.entries()) {
        if (batchBtn) batchBtn.innerHTML = `<div class="tilantra-capsule-loader" style="display:block"></div> Extracting Email ${i + 1}/${selected.length}...`;
        const msgs = await extractMessagesFromGmailThreadTarget(target, i + 1);
        if (msgs && msgs.length > 0) combinedHistory.push(...msgs);
      }
    } else if (currentPlatform === 'outlook') {
      for (const [i, row] of selected.entries()) {
        if (batchBtn) batchBtn.innerHTML = `<div class="tilantra-capsule-loader" style="display:block"></div> Extracting Email ${i + 1}/${selected.length}...`;
        const msgs = await extractMessagesFromSelectedEmailRow(row, i + 1);
        if (msgs && msgs.length > 0) combinedHistory.push(...msgs);
      }
    } else {
      const chatUrls = selected.map(cb => cb.dataset.url);
      for (const [i, url] of chatUrls.entries()) {
        if (batchBtn) batchBtn.innerHTML = `<div class="tilantra-capsule-loader" style="display:block"></div> Extracting Chat ${i + 1}/${chatUrls.length}...`;
        const msgs = await extractMessagesFromUrl(url);
        if (msgs && msgs.length > 0) {
          const chatTitle = msgs[0].text.substring(0, 50) + "...";
          combinedHistory.push({ role: 'user', text: `--- START OF CHAT: ${chatTitle} ---` });
          combinedHistory.push(...msgs);
        }
      }
    }

    if (combinedHistory.length > 0) {
      const batchTag = (currentPlatform === 'gmail' || currentPlatform === 'mail' || currentPlatform === 'outlook')
        ? "Batch Email Capsule"
        : "Batch Project Capsule";
      await generateCapsuleFromMessages(combinedHistory, batchTag);

      if (currentPlatform !== 'gmail' && currentPlatform !== 'mail' && currentPlatform !== 'outlook') {
        selected.forEach(cb => cb.checked = false);
      }

      if (batchBtn) {
        batchBtn.classList.remove('show');
      }
      updateBatchButton();
    } else {
      showCustomModal("Failed to extract messages from selected items.");
    }

  } catch (err) {
    console.error("Batch fail:", err);
    const errMsg = (err && err.message) ? err.message : (typeof err === "string" ? err : "Unknown error");
    showCustomModal("Batch generation failed: " + errMsg);
  } finally {
    toggleLoading(false);
  }
}

function getBatchButtonInnerHtml() {
  const isEmail = currentPlatform === 'gmail' || currentPlatform === 'mail' || currentPlatform === 'outlook';
  const capsuleIcon = `<img src="${chrome.runtime.getURL('capsule.png')}" style="width: 22px; height: 22px; object-fit: contain; display: inline-block; vertical-align: middle; margin-right: 8px;">`;
  const plusIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;

  const icon = isEmail ? capsuleIcon : plusIcon;
  const labelText = isEmail ? 'Generate Email Capsule' : 'Generate Multi-Capsule';

  return `${icon}<span class="capsule-batch-label" style="display: flex; align-items: center; justify-content: center;">${labelText}</span><span class="btn-badge">0</span>`;
}

// ─── Thread Detection Helpers ───────────────────────────────────────────────
function isInGmailThread() {
  if (currentPlatform !== 'gmail' && currentPlatform !== 'mail') return false;
  // Gmail thread URLs look like #inbox/threadId, #all/threadId, etc.
  return /mail\.google\.com.*#(inbox|all|sent|starred|spam|trash|search)\/[a-zA-Z0-9]+/.test(window.location.href);
}

function isInOutlookThread() {
  if (currentPlatform !== 'outlook') return false;
  // Outlook reading pane: subject header OR message body is visible
  return !!document.querySelector(
    // Reading pane subject line
    'div[role="main"] h1, .QBy00, [data-test-id="message-subject"], .Fk_vG, ' +
    // Reading pane content containers (always present when mail is open)
    'div[aria-label="Message body"], .rps_a, [data-test-id="message-body-container"]'
  );
}


function ensureBatchButton() {
  let batchBtn = document.getElementById('capsule-batch-generate-btn');
  if (!batchBtn) {
    batchBtn = document.createElement('button');
    batchBtn.id = 'capsule-batch-generate-btn';
    batchBtn.className = 'capsule-batch-btn';
    batchBtn.innerHTML = getBatchButtonInnerHtml();
    const isEmail = (currentPlatform === 'gmail' || currentPlatform === 'mail' || currentPlatform === 'outlook');
    batchBtn.setAttribute('aria-label', isEmail ? 'Generate Email Capsule' : 'Generate Multi-Capsule');
    document.body.appendChild(batchBtn);
    batchBtn.onclick = handleBatchGeneration;
    updateBatchButton(); // Call update to ensure icon/text is set correctly
  }
  return batchBtn;
}

function getNativeSelectedEmailRows() {
  if (currentPlatform === 'gmail' || currentPlatform === 'mail') {
    return Array.from(document.querySelectorAll(
      'tr.zA[aria-selected="true"], tr.zA[aria-checked="true"], tr.zA div[role="checkbox"][aria-checked="true"]'
    )).map(el => el.closest('tr.zA') || el).filter(Boolean);
  }
  if (currentPlatform === 'outlook') {
    const selected = Array.from(document.querySelectorAll(
      'div[role="row"][aria-selected="true"], ' +
      '[data-automationid="DetailsRow"][aria-selected="true"], ' +
      'div[role="option"][aria-selected="true"], ' +
      '.is-selected'
    ));
    // Fallback: check for checked native checkboxes in rows
    document.querySelectorAll('div[role="checkbox"][aria-checked="true"]').forEach(cb => {
      const row = cb.closest('div[role="row"], [data-automationid="DetailsRow"], div[role="option"], .hcU7z, .zItB1');
      if (row && !selected.includes(row) && row.getBoundingClientRect().height > 20) {
        // We ensure height > 20 to avoid hidden or tiny UI artifacts
        selected.push(row);
      }
    });
    return selected;
  }
  return [];
}

function getSelectedGmailThreadTargets() {
  const rows = Array.from(document.querySelectorAll('tr.zA, tr[role="row"][data-legacy-thread-id]'));
  const targets = [];
  const seen = new Set();
  const hashParts = (window.location.hash || "#inbox").replace(/^#/, "").split("/");
  const mailboxPath = hashParts[0] || "inbox";

  for (const row of rows) {
    const nativeCheckbox = row.querySelector('div[role="checkbox"], div.T-Jo, span[role="checkbox"], input[type="checkbox"]');
    const isChecked = nativeCheckbox?.getAttribute('aria-checked') === 'true' ||
      nativeCheckbox?.classList?.contains('T-Jo-auh') ||
      nativeCheckbox?.checked === true ||
      row.querySelector('div[role="checkbox"][aria-checked="true"], span[role="checkbox"][aria-checked="true"]');
    if (!isChecked) continue;

    const threadLink = row.querySelector('a[href*="#"], a[href*="/mail/u/"]');
    const threadId =
      row.getAttribute('data-legacy-thread-id') ||
      row.dataset?.legacyThreadId ||
      row.getAttribute('data-thread-perm-id') ||
      row.querySelector('[data-legacy-thread-id]')?.getAttribute('data-legacy-thread-id');
    let url = threadLink?.href || null;
    if (!url && threadId) {
      url = `${window.location.origin}/mail/u/0/#${mailboxPath}/${threadId}`;
    }
    if (!url) continue;

    const key = threadId || url;
    if (seen.has(key)) continue;
    seen.add(key);

    targets.push({ row, url, label: getEmailRowLabel(row, targets.length + 1) });
  }

  return targets;
}

function getEmailRowLabel(row, index) {
  if (!row) return `Email ${index}`;
  const candidates = (currentPlatform === 'gmail' || currentPlatform === 'mail')
    ? ['span[data-thread-id]', '.bog', '.y6 span', '.yP', '[email]']
    : ['span[title]', '[data-automationid="SubjectLine"]', '[aria-label*="Subject"]', '.QBy00'];
  for (const selector of candidates) {
    const el = row.querySelector(selector);
    const text = (el?.textContent || el?.getAttribute?.('title') || "").trim();
    if (text) return text.slice(0, 80);
  }
  return `Email ${index}`;
}

async function extractMessagesFromSelectedEmailRow(row, index) {
  if (!row) return [];
  const label = getEmailRowLabel(row, index);
  row.scrollIntoView({ block: 'center' });
  row.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  await mmWait((currentPlatform === 'gmail' || currentPlatform === 'mail') ? 1600 : 2000);

  const msgs = (currentPlatform === 'gmail' || currentPlatform === 'mail')
    ? await getMessagesFromGmail({ includeAttachments: true })
    : await getMessagesFromOutlook({ includeAttachments: true });

  if (!msgs || msgs.length === 0) return [];
  return [{ role: 'user', text: `--- START OF EMAIL: ${label} ---` }, ...msgs];
}

async function extractMessagesFromGmailThreadTarget(target, index) {
  if (!target) return [];
  const label = target.label || `Email ${index}`;

  const openViaRowClick = async () => {
    if (!target.row || !document.contains(target.row)) return false;
    try {
      target.row.scrollIntoView({ block: 'center' });
      target.row.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      return await waitForGmailThreadReady(7000);
    } catch (_) {
      return false;
    }
  };

  const openViaHashNavigation = async () => {
    if (!target.url) return false;
    try {
      const parsed = new URL(target.url, window.location.origin);
      if (window.location.hash !== parsed.hash) {
        // Use hash navigation so Gmail SPA route changes without full page reload.
        window.location.hash = parsed.hash;
      }
      return await waitForGmailThreadReady(9000);
    } catch (_) {
      return false;
    }
  };

  const buildFallbackFromRow = () => {
    if (!target.row) return [];
    const rowText = (target.row.innerText || "").replace(/\s+/g, " ").trim();
    if (!rowText) return [];
    return [{
      role: 'user',
      text: `From Gmail row (${label}):\n${rowText}`
    }];
  };

  try {
    let opened = await openViaRowClick();
    if (!opened) {
      opened = await openViaHashNavigation();
    }
    if (!opened) {
      const fallback = buildFallbackFromRow();
      if (fallback.length > 0) {
        return [{ role: 'user', text: `--- START OF EMAIL: ${label} ---` }, ...fallback];
      }
      return [];
    }
  } catch (e) {
    console.warn("Gmail navigation failed, attempting direct click fallback", e);
    const opened = await openViaRowClick();
    if (!opened) {
      const fallback = buildFallbackFromRow();
      if (fallback.length > 0) {
        return [{ role: 'user', text: `--- START OF EMAIL: ${label} ---` }, ...fallback];
      }
      return [];
    }
  }

  const msgs = await getMessagesFromGmail({ includeAttachments: true });
  if (!msgs || msgs.length === 0) {
    const fallback = buildFallbackFromRow();
    if (fallback.length === 0) return [];
    return [{ role: 'user', text: `--- START OF EMAIL: ${label} ---` }, ...fallback];
  }
  return [{ role: 'user', text: `--- START OF EMAIL: ${label} ---` }, ...msgs];
}

async function waitForGmailThreadReady(timeoutMs = 8000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const hasThreadBodies = document.querySelectorAll('.adn.ads .a3s.aiL, .a3s.aiL').length > 0;
    const hasSubject = !!document.querySelector('h2[aria-label="Message subject"], .hP');
    if (hasThreadBodies || hasSubject) {
      // Let Gmail render collapsed replies and message HTML fully.
      await mmWait(500);
      return true;
    }
    await mmWait(250);
  }
  return false;
}

async function extractMessagesFromUrl(url) {
  const extractConversationIdFromUrl = (chatUrl) => {
    try {
      const parsed = new URL(chatUrl, window.location.origin);
      const match = parsed.pathname.match(/\/c\/([a-z0-9-]+)/i);
      return match ? match[1] : null;
    } catch (e) {
      return null;
    }
  };

  const parseChatGptApiConversation = (payload) => {
    const mapping = payload?.mapping || {};
    const rawNodes = Object.values(mapping);

    const ordered = rawNodes
      .filter((node) => node?.message)
      .sort((a, b) => {
        const aTime = Number(a.message?.create_time || 0);
        const bTime = Number(b.message?.create_time || 0);
        return aTime - bTime;
      });

    const messages = [];
    for (const node of ordered) {
      const msg = node.message;
      const role = msg?.author?.role;
      if (role !== "user" && role !== "assistant" && role !== "system") continue;

      const content = msg?.content;
      let text = "";

      if (Array.isArray(content?.parts)) {
        text = content.parts
          .map((part) => (typeof part === "string" ? part : (part?.text || "")))
          .filter(Boolean)
          .join("\n");
      } else if (typeof content?.text === "string") {
        text = content.text;
      }

      text = (text || "").trim();
      if (!text) continue;
      messages.push({ role, text, attachments: [] });
    }

    return messages;
  };

  const tryExtractViaChatGptApi = async (chatUrl) => {
    const conversationId = extractConversationIdFromUrl(chatUrl);
    if (!conversationId || conversationId === "undefined") {
      console.warn("Capsule: No valid conversationId found for", chatUrl);
      return [];
    }

    try {
      const apiUrl = `${window.location.origin}/backend-api/conversation/${conversationId}`;
      const res = await fetch(apiUrl, {
        method: "GET",
        credentials: "include",
        headers: { "Accept": "application/json" }
      });
      if (!res.ok) {
        // console.warn(`Capsule: API fetch failed for ${conversationId} with status ${res.status}`);
        return [];
      }
      const data = await res.json();
      const parsed = parseChatGptApiConversation(data);
      return parsed;
    } catch (err) {
      console.warn("ChatGPT API extraction failed, falling back to iframe:", err);
      return [];
    }
  };

  // For ChatGPT (including Projects), use backend conversation API first.
  // It returns complete turn history and avoids partial sidebar/DOM snippets.
  if (currentPlatform.startsWith('chatgpt')) {
    const viaApi = await tryExtractViaChatGptApi(url);
    if (viaApi.length > 0) {
      return viaApi;
    }
  }

  return new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    // Use visibility and position instead of display:none to ensure the browser renders the content
    iframe.style.cssText = 'position: fixed; top: 0; left: 0; width: 1280px; height: 800px; opacity: 0; pointer-events: none; z-index: -9999;';
    document.body.appendChild(iframe);

    const timeout = setTimeout(() => {
      cleanup();
      resolve([]);
    }, 25000); // Increased timeout for ChatGPT

    const cleanup = () => {
      clearTimeout(timeout);
      if (iframe.parentElement) iframe.remove();
    };

    let isExtracting = false;
    const tryExtract = async () => {
      if (isExtracting) return;
      isExtracting = true;
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        if (!doc) {
          isExtracting = false;
          return;
        }

        if (currentPlatform.startsWith('claude')) {
          await waitForMessagesFromClaude({ scope: doc });

          let msgs = [];
          // Retry up to 3 times if we only found 1 message (likely just the user prompt), 
          // as assistant messages can take longer to hydrate in an iframe.
          for (let attempt = 0; attempt < 3; attempt++) {
            await new Promise(r => setTimeout(r, 2000));
            msgs = await getMessagesFromClaude({ scope: doc, includeAttachments: false });
            if (msgs.length >= 2) break;
          }

          cleanup();
          resolve(msgs);
        } else if (currentPlatform.startsWith('chatgpt')) {
          await waitForMessagesFromChatGPT({ scope: doc });

          let msgs = [];
          for (let attempt = 0; attempt < 3; attempt++) {
            await new Promise(r => setTimeout(r, 2000));
            msgs = await getMessagesFromChatGPT({ scope: doc, includeAttachments: false });
            if (msgs.length >= 2) break;
          }

          cleanup();
          resolve(msgs);
        } else if (currentPlatform === 'gmail' || currentPlatform === 'mail') {
          // Gmail might need more time or specific handling in iframe
          await mmWait(3000);
          const msgs = await getMessagesFromGmail({ scope: doc });
          cleanup();
          resolve(msgs);
        } else if (currentPlatform === 'outlook') {
          await mmWait(4000);
          const msgs = await getMessagesFromOutlook({ scope: doc });
          cleanup();
          resolve(msgs);
        } else if (currentPlatform === 'replit' || currentPlatform === 'replit-project') {
          await waitForMessagesFromReplit(15000, doc);
          let msgs = [];
          // Replit Agent can take a while to render the prose blocks
          for (let attempt = 0; attempt < 3; attempt++) {
            await new Promise(r => setTimeout(r, 2000));
            msgs = await getMessagesFromReplit({ scope: doc, includeAttachments: false });
            if (msgs.length >= 2) break;
          }
          cleanup();
          resolve(msgs);
        } else if (currentPlatform === 'emergent') {
          await waitForMessagesFromEmergent(15000);
          let msgs = [];
          for (let attempt = 0; attempt < 3; attempt++) {
            await new Promise(r => setTimeout(r, 2000));
            msgs = await getMessagesFromEmergent({ scope: doc, includeAttachments: false });
            if (msgs.length > 0) break;
          }
          cleanup();
          resolve(msgs);
        }
      } catch (e) {
        isExtracting = false;
        // Keep trying until timeout
      }
    };

    iframe.onload = () => {
      // Poll for content since SPA might take time to render inside iframe
      const interval = setInterval(() => {
        if (!iframe.parentElement) {
          clearInterval(interval);
          return;
        }
        tryExtract();
      }, 1000);

      // Stop interval after 15s if nothing found
      setTimeout(() => clearInterval(interval), 15000);
    };
  });
}

/**********************************************************
 * TEXTBOX & INPUT HELPERS
 **********************************************************/
const getActiveTextBox = () => {
  if (currentPlatform === 'chatgpt') return document.querySelector('#prompt-textarea');
  if (currentPlatform === 'gemini') return document.querySelector('rich-textarea div[contenteditable="true"]');
  if (currentPlatform.startsWith('claude')) {
    const el = document.querySelector('div[contenteditable="true"][data-testid*="input"]') ||
      document.querySelector('div[contenteditable="true"]') ||
      document.querySelector('.whitespace-pre-wrap[contenteditable="true"]');
    return el;
  }
  if (currentPlatform === 'deepseek') return document.querySelector('textarea#chat-input') ||
    document.querySelector('textarea[placeholder*="DeepSeek"]') ||
    document.querySelector('textarea.ds-scroll-area');
  if (currentPlatform === 'lovable') return document.querySelector('[aria-label="Chat input"]') ||
    document.querySelector('.ProseMirror');
  if (currentPlatform === 'notebooklm') {
    return document.querySelector('textarea.query-box-input') ||
      document.querySelector('textarea[placeholder*="Ask a question" i]') ||
      document.querySelector('textarea[aria-label="Query box"]');
  }
  if (currentPlatform === 'emergent') return document.querySelector('textarea') ||
    document.querySelector('div[contenteditable="true"]');
  if (currentPlatform === 'grok') return document.querySelector('div[contenteditable="true"][role="textbox"][aria-label="Ask Grok anything"]') ||
    document.querySelector('div.ProseMirror[contenteditable="true"]') ||
    document.querySelector('textarea[aria-label="Ask Grok anything"]') ||
    document.querySelector('form textarea') ||
    document.querySelector('textarea');
  if (currentPlatform === 'replit' || currentPlatform === 'replit-project') return document.querySelector('#ai-prompt-input div.cm-content[contenteditable="true"]') ||
    document.querySelector('div.cm-content[contenteditable="true"]') ||
    document.querySelector('div[data-cy="ai-prompt-input"] div[contenteditable="true"]') ||
    document.querySelector('textarea');
  return null;
};

const getInputValue = () => {
  const box = getActiveTextBox();
  if (!box) return "";
  if (box.tagName === 'TEXTAREA') return box.value;

  // For Claude's contenteditable (Tiptap/ProseMirror), try innerText then textContent
  let text = box.innerText || "";
  if (!text.trim()) text = box.textContent || "";

  // Some editors hide text in nested paragraphs
  if (!text.trim()) {
    const paragraphs = Array.from(box.querySelectorAll('p'));
    text = paragraphs.map(p => p.innerText || p.textContent).join('\n');
  }

  return text;
};

const setInputValue = (newText) => {
  const box = getActiveTextBox();
  if (!box) return;

  box.focus();

  if (box.tagName === 'TEXTAREA') {
    box.value = newText;
  } else if (currentPlatform === 'replit' || currentPlatform === 'replit-project') {
    // Replit's CodeMirror 6 editor ignores synthetic execCommand('insertText').
    // Select the whole doc, then simulate a paste — CM6's paste handler reads
    // clipboardData and replaces the selection with the new text.
    document.execCommand('selectAll', false, null);
    const dt = new DataTransfer();
    dt.setData('text/plain', newText);
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt, bubbles: true, cancelable: true
    });
    box.dispatchEvent(pasteEvent);
  } else {
    // For contenteditable, select all content and replace it by executing insertText
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(box);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('insertText', false, newText);
  }
  box.dispatchEvent(new Event('input', { bubbles: true }));
};

const appendContextToInput = (context) => {
  const box = getActiveTextBox();
  if (!box) return;
  const extra = `\n\n==================================================\nAdditional Context:\n\n${context}`;

  // Focus the box first
  box.focus();

  if (box.tagName === 'TEXTAREA') {
    box.value += extra;
  } else {
    // For contenteditable, move cursor to end before inserting
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(box);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('insertText', false, extra);
  }
  box.dispatchEvent(new Event('input', { bubbles: true }));
};

/**********************************************************
 * FAST FILTER WATCHER (SEMANTIC TRIPWIRE)
 **********************************************************/
function initFastFilterWatcher() {

  // 1. Listen for Enter key (without Shift)
  // Use window in capture phase to run absolutely first, before Claude's React handlers clear the box
  window.addEventListener('keydown', (e) => {
    try {
      if (e.key === 'Enter' && !e.shiftKey) {
        if (!dynamicContextEnabled) return;
        if (isBypassingFilter) return;

        // Synchronous Tier Check (using cached value)
        if (userTier === 'basic' || userTier === 'pro') return;

        const box = getActiveTextBox();
        if (box && (e.target === box || box.contains(e.target))) {
          const text = getInputValue();
          if (text.trim().length > 5) {
            // Robust check for already-injected context
            if (CONTEXT_MARKERS.some(m => text.includes(m))) {
              return;
            }

            // INTERCEPT SYNCHRONOUSLY
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            (async () => {
              isBypassingFilter = true;
              const capsuleBtn = document.getElementById('tilantra-capsule-chat-button');
              if (capsuleBtn) capsuleBtn.classList.add('capsule-breathing');

              try {
                const result = await processFastFilterIntent(text);
                if (capsuleBtn) capsuleBtn.classList.remove('capsule-breathing');

                if (result && result.context) {
                  appendContextToInput(result.context);
                  await new Promise(r => setTimeout(r, 1200));
                }

                // Trigger send
                const sendBtn = findSendButton();
                if (sendBtn && !sendBtn.disabled) {
                  sendBtn.click();
                } else {
                  const enterEvent = new KeyboardEvent('keydown', {
                    bubbles: true, cancelable: true, key: 'Enter', code: 'Enter', keyCode: 13
                  });
                  box.dispatchEvent(enterEvent);
                }
              } catch (err) {
                console.error("💊 Keydown Async Fail:", err);
              } finally {
                setTimeout(() => isBypassingFilter = false, 1500);
              }
            })();
          }
        }
      }
    } catch (err) {
      console.error("💊 Fast Filter Keydown Fail:", err);
    }
  }, true);

  // 2. Listen for Send Button Clicks
  document.addEventListener('click', (e) => {
    try {
      if (isBypassingFilter) return;

      const target = e.target;
      const closestButton = target.closest('button') || target.closest('div[role="button"]');
      if (!closestButton) return;

      const isSend = isSendButton(closestButton);
      if (isSend) {
        // Feature flag gate — must be ON for dynamic context to intercept clicks
        if (!dynamicContextEnabled) return;
        // Synchronous Tier Check
        if (userTier === 'basic' || userTier === 'pro') return;

        const text = getInputValue();
        if (text.trim().length > 5) {
          if (CONTEXT_MARKERS.some(m => text.includes(m))) return;

          // INTERCEPT SYNCHRONOUSLY
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          (async () => {
            isBypassingFilter = true;
            const capsuleBtn = document.getElementById('tilantra-capsule-chat-button');
            if (capsuleBtn) capsuleBtn.classList.add('capsule-breathing');

            try {
              const result = await processFastFilterIntent(text);
              if (capsuleBtn) capsuleBtn.classList.remove('capsule-breathing');

              if (result && result.context) {
                appendContextToInput(result.context);
                await new Promise(r => setTimeout(r, 1200));
              }

              closestButton.click();
            } catch (err) {
              console.error("💊 Click Async Fail:", err);
            } finally {
              setTimeout(() => isBypassingFilter = false, 1500);
            }
          })();
        }
      }
    } catch (err) {
      console.error("💊 Fast Filter Click Fail:", err);
    }
  }, true);
}

function findSendButton() {
  let btn = null;
  if (currentPlatform === 'chatgpt') {
    btn = document.querySelector('button[data-testid="send-button"]') || document.querySelector('button[aria-label="Send prompt"]');
  } else if (currentPlatform === 'gemini') {
    btn = document.querySelector('button[aria-label*="Send" i], button[data-test-id="send-button"]');
  } else if (currentPlatform.startsWith('claude')) {
    btn = document.querySelector('button[aria-label*="Send message" i]') ||
      document.querySelector('button[aria-label*="Send Message" i]') ||
      document.querySelector('button[type="submit"]');
  } else if (currentPlatform === 'notebooklm') {
    btn = document.querySelector('button[aria-label*="Send" i]') || 
          document.querySelector('button[aria-label*="Submit" i]') || 
          document.querySelector('button.submit-button');
  } else if (currentPlatform === 'deepseek') {
    btn = document.querySelector('div._7436101[role="button"]') ||
      document.querySelector('div[role="button"]:has(.ds-icon--send)');
  } else if (currentPlatform === 'perplexity') {
    btn = document.querySelector('button[aria-label="Submit"]') ||
      document.querySelector('button[aria-label*="Send" i]') ||
      document.querySelector('button[type="submit"]');
  } else if (currentPlatform === 'lovable') {
    btn = document.querySelector('button[aria-label="Submit"]') ||
      document.querySelector('button[type="submit"]');
  } else if (currentPlatform === 'replit') {
    btn = document.querySelector('button[data-cy="ai-prompt-submit"]') ||
      document.querySelector('button[aria-label="Start"]') ||
      document.querySelector('button[aria-label*="Send"]');
  } else if (currentPlatform === 'emergent') {
    const isChatPage = window.location.pathname.includes('/chat');

    if (isChatPage) {
      btn = findEmergentSendButton();
    } else {
      const chatInput = document.querySelector('textarea, [contenteditable], [placeholder*="Message" i], [placeholder*="Build" i]');
      if (chatInput) {
        let chatContainer = chatInput;
        for (let i = 0; i < 6; i++) {
          if (chatContainer.parentElement) {
            chatContainer = chatContainer.parentElement;
            if (chatContainer.querySelectorAll('button').length >= 2) break;
          }
        }
        if (chatContainer) {
          const btns = Array.from(chatContainer.querySelectorAll('button'));
          if (btns.length > 0) {
            btn = btns[btns.length - 1];
          }
        }
      }
    }
  }
  return btn;
}

function isSendButton(btn) {
  if (currentPlatform === 'chatgpt') {
    return btn.matches('[data-testid="send-button"]') || btn.matches('[aria-label="Send prompt"]');
  } else if (currentPlatform === 'gemini') {
    return btn.matches('[aria-label*="Send" i]') || btn.matches('[data-test-id="send-button"]');
  } else if (currentPlatform.startsWith('claude')) {
    return btn.matches('[aria-label*="Send message" i]') ||
      btn.matches('[aria-label*="Send Message" i]') ||
      btn.matches('button[type="submit"]');
  } else if (currentPlatform === 'notebooklm') {
    return btn.matches('button[aria-label*="Send" i]') || 
           btn.matches('button[aria-label*="Submit" i]') || 
           btn.matches('button.submit-button');
  }
  else if (currentPlatform === 'deepseek') {
    return btn.matches('div._7436101[role="button"]') ||
      btn.matches('div[role="button"]:has(.ds-icon--send)') ||
      !!btn.querySelector('.ds-icon--send') ||
      (!!btn.querySelector('svg') && !btn.querySelector('.ds-icon--stop'));
  } else if (currentPlatform === 'perplexity') {
    return btn.matches('button[aria-label="Submit"]') ||
      btn.matches('button[aria-label*="Send" i]') ||
      btn.matches('button[type="submit"]');
  } else if (currentPlatform === 'lovable') {
    return btn.matches('button[aria-label="Submit"]') ||
      btn.matches('button[type="submit"]');
  } else if (currentPlatform === 'replit') {
    return btn.matches('[data-cy="ai-prompt-submit"]') ||
      btn.matches('button[aria-label="Start"]') ||
      btn.matches('button[aria-label*="Send"]');
  } else if (currentPlatform === 'emergent') {
    if (btn.matches('button[aria-label*="Send"]')) return true;
    const parent = btn.parentElement;
    if (parent) {
      const clickableSvgs = Array.from(parent.querySelectorAll('svg')).map(svg => svg.closest('button, [role="button"], a') || svg.parentElement);
      if (clickableSvgs.length > 0 && clickableSvgs[clickableSvgs.length - 1] === btn) return true;
    }
    return false;
  }
  return false;
}

async function processFastFilterIntent(input) {
  // Respect the Dynamic Context toggle — if OFF, skip all filtering
  if (!dynamicContextEnabled) {
    return null;
  }

  // Use broader marker check
  if (CONTEXT_MARKERS.some(m => input.includes(m))) {
    return null;
  }

  const { lastCapsuleId } = await chrome.storage.local.get("lastCapsuleId");
  if (!lastCapsuleId) {
    return null;
  }

  const convoId = getConversationId();
  let history = [];
  const options = { includeAttachments: false };
  if (currentPlatform === 'chatgpt') history = await getMessagesFromChatGPT(options);
  else if (currentPlatform === 'gemini') history = await getMessagesFromGemini(options);
  else if (currentPlatform.startsWith('claude')) history = await getMessagesFromClaude(options);
  else if (currentPlatform === 'deepseek') history = await getMessagesFromDeepSeek(options);
  else if (currentPlatform === 'perplexity') history = await getMessagesFromPerplexity(options);
  else if (currentPlatform === 'lovable') history = await getMessagesFromLovable(options);
  else if (currentPlatform === 'replit') history = await getMessagesFromReplit(options);
  else if (currentPlatform === 'emergent') history = await getMessagesFromEmergent(options);
  else if (currentPlatform === 'grok') history = await getMessagesFromGrok(options);

  return new Promise((resolve) => {
    chrome.runtime.sendMessage({
      type: "RUN_FAST_FILTER",
      payload: {
        input: input,
        history: history,
        conversationId: convoId,
        platform: currentPlatform
      }
    }, (res) => {
      if (res?.success && res.shouldInterfere) {
        resolve({ context: res.context, capsuleId: res.capsuleId });
      } else {
        resolve(null);
      }
    });

    // 20s timeout
    setTimeout(() => resolve(null), 20000);
  });
}

/* ---------- CUSTOM MODAL ---------- */
function showCustomModal(message, isUpgrade = false) {
  const existing = document.getElementById('tilantra-capsule-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'tilantra-capsule-modal';
  modal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 12px;
    padding: 24px;
    z-index: 1000000;
    box-shadow: 0 20px 50px rgba(0,0,0,0.8);
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 280px;
    max-width: 400px;
    font-family: system-ui, -apple-system, sans-serif;
    color: #f3f4f6;
    animation: capsuleModalIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  `;

  const headerTitle = isUpgrade ? "Limit Reached" : "Info";
  const primaryBtnText = isUpgrade ? "Upgrade Now" : "Dismiss";

  modal.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h3 style="margin:0; font-size: 16px; color: ${isUpgrade ? '#f59e0b' : '#818cf8'}; font-weight: 700;">${headerTitle}</h3>
      <button id="close-tilantra-modal" style="background:transparent; border:none; color:#9ca3af; cursor:pointer; font-size:18px;">✕</button>
    </div>
    <div style="font-size: 14px; line-height: 1.6; opacity: 0.9;">${message}</div>
    <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px;">
      ${isUpgrade ? '<button id="cancel-tilantra-modal" style="background:transparent; color:#9ca3af; border:1px solid #1f2937; padding: 8px 16px; border-radius: 8px; font-weight: 600; cursor:pointer; font-size: 13px;">Cancel</button>' : ''}
      <button id="ok-tilantra-modal" style="background:${isUpgrade ? '#f59e0b' : '#6366f1'}; color:white; border:none; padding: 8px 16px; border-radius: 8px; font-weight: 600; cursor:pointer; font-size: 13px;">${primaryBtnText}</button>
    </div>
    <style>
      @keyframes capsuleModalIn {
        from { opacity: 0; transform: translate(-50%, -40%) scale(0.95); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      }
      #ok-tilantra-modal:hover { background: ${isUpgrade ? '#d97706' : '#4f46e5'}; }
    </style>
  `;

  document.body.appendChild(modal);

  const close = () => modal.remove();
  modal.querySelector('#close-tilantra-modal').onclick = close;
  modal.querySelector('#ok-tilantra-modal').onclick = () => {
    if (isUpgrade) {
      window.open("https://capsulehub.tilantra.com/billing", "_blank");
    }
    close();
  };
  if (isUpgrade) {
    modal.querySelector('#cancel-tilantra-modal').onclick = close;
  }

  // Cleanup on Escape
  const keyHandler = (e) => {
    if (e.key === 'Escape') {
      close();
      window.removeEventListener('keydown', keyHandler);
    }
  };
  window.addEventListener('keydown', keyHandler);
}

// Bridge for audio download capture between MAIN world and background
window.addEventListener("CAPSULE_AUDIO_DOWNLOAD_REQUEST", () => {
  chrome.runtime.sendMessage({ action: "expectDownload" }, (response) => {
    window.dispatchEvent(new CustomEvent("CAPSULE_AUDIO_DOWNLOAD_RESPONSE", {
      detail: response || { success: false, error: "No response from background" }
    }));
  });
});

window.addEventListener("CAPSULE_AUDIO_DOWNLOAD_CANCEL", () => {
  chrome.runtime.sendMessage({ action: "cancelExpectDownload" });
});

// Listen for capsule save requests from the page world (e.g. NotebookLM custom buttons)
window.addEventListener("CAPSULE_SAVE_REQUEST", async (e) => {
  const { tag, messages } = e.detail || {};
  if (!messages || messages.length === 0) {
    console.error("❌ CAPSULE_SAVE_REQUEST: No messages provided");
    return;
  }
  try {
    toggleLoading(true);
    await generateCapsuleFromMessages(messages, tag);
  } catch (err) {
    const errMsg = (err?.message || String(err)).toLowerCase();
    if (err === "upgrade_required" || errMsg.includes("upgrade_required") || errMsg.includes("limit") || errMsg.includes("internal server error")) {
      showCustomModal("Capsule creation limit reached. Please upgrade your tier to proceed.", true);
    } else {
      showCustomModal("Summary failed: " + (err.message || err));
    }
  } finally {
    toggleLoading(false);
  }
});

/* ---------- PROMPT ENHANCEMENT ---------- */
async function getChatHistory() {
  let history = [];
  const options = { includeAttachments: false };
  try {
    if (currentPlatform === 'chatgpt') history = await getMessagesFromChatGPT(options);
    else if (currentPlatform === 'gemini') history = await getMessagesFromGemini(options);
    else if (currentPlatform.startsWith('claude')) history = await getMessagesFromClaude(options);
    else if (currentPlatform === 'deepseek') history = await getMessagesFromDeepSeek(options);
    else if (currentPlatform === 'perplexity') history = await getMessagesFromPerplexity(options);
    else if (currentPlatform === 'lovable') history = await getMessagesFromLovable(options);
    else if (currentPlatform === 'replit') history = await getMessagesFromReplit(options);
    else if (currentPlatform === 'emergent') history = await getMessagesFromEmergent(options);
    else if (currentPlatform === 'grok') history = await getMessagesFromGrok(options);
  } catch (e) {
    console.error("Failed to get chat history for prompt enhancement:", e);
  }
  return history;
}

async function handleEnhancePrompt() {
  const userInput = getInputValue();
  if (!userInput.trim()) {
    showCustomModal("Please enter your requirements/prompt in the input box first.");
    return;
  }

  toggleLoading(true);
  const history = await getChatHistory();

  chrome.runtime.sendMessage({
    type: "ENHANCE_PROMPT",
    payload: { prompt: userInput, history }
  }, (res) => {
    toggleLoading(false);
    if (res && res.success && res.suggestions && res.suggestions.length > 0) {
      setInputValue(res.suggestions[0]);
    } else {
      showCustomModal("Failed to enhance prompt: " + (res?.error || "No suggestions received from the server."));
    }
  });
}
