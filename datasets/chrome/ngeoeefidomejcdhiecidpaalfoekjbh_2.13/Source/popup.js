const loginView = document.getElementById("loginView");
const teamView = document.getElementById("teamView");

const DEBUG_REDIRECT_URI = chrome.identity.getRedirectURL();

const actionView = document.getElementById("actionView");
const versionChoiceView = document.getElementById("versionChoiceView");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const googleLoginBtn = document.getElementById("googleLoginBtn");
const restartNudge = document.getElementById("restartNudge");
const closeNudge = document.getElementById("closeNudge");

const teamList = document.getElementById("teamList");
const teamSelectDropdown = document.getElementById("teamSelectDropdown");
const changeTeamLink = document.getElementById("changeTeamLink");

const capsuleTagInput = document.getElementById("capsuleTag");
const generateBtn = document.getElementById("generate");
const genSpinner = document.getElementById("genSpinner");
const genText = document.getElementById("genText");
const viewCapsulesBtn = document.getElementById("viewCapsules");
const logoutBtn = document.getElementById("logout");
const refreshTeamsBtn = document.getElementById("refreshTeams");
const refreshCapsulesBtn = document.getElementById("refreshCapsules");

const capsulesView = document.getElementById("capsulesView");
const capsulesListContainer = document.getElementById("capsulesListContainer");
const backToActions = document.getElementById("backToActions");
const teamFilterContainer = document.getElementById("teamFilterContainer");
const teamFilter = document.getElementById("teamFilter");
const featuredFilter = document.getElementById("featuredFilter");
const capsuleSearchInput = document.getElementById("capsuleSearch");

const scrollUpBtn = document.getElementById("scrollUpBtn");
const scrollDownBtn = document.getElementById("scrollDownBtn");
const teamScrollUp = document.getElementById("teamScrollUp");
const teamScrollDown = document.getElementById("teamScrollDown");

const newVersionBtn = document.getElementById("newVersionBtn");
const newCapsuleBtn = document.getElementById("newCapsuleBtn");
const backFromVersion = document.getElementById("backFromVersion");
const verSpinner = document.getElementById("verSpinner");
const verText = document.getElementById("verText");
const newCapSpinner = document.getElementById("newCapSpinner");
const newCapText = document.getElementById("newCapText");
const newCapsuleTagInput = document.getElementById("newCapsuleTag");


const backFromCreate = document.getElementById("backFromCreate");
const createTeamView = document.getElementById("createTeamView");
const createTeamFromSelection = document.getElementById("createTeamFromSelection");
const workPrivatelyLink = document.getElementById("workPrivatelyLink");

const teamDetailsPanel = document.getElementById("teamDetailsPanel");
const teamDetailsName = document.getElementById("teamDetailsName");
const teamDetailsDescription = document.getElementById("teamDetailsDescription");
const teamDetailsColor = document.getElementById("teamDetailsColor");

const teamMembersList = document.getElementById("teamMembersList");
const addMemberForm = document.getElementById("addMemberForm");
const newMemberEmail = document.getElementById("newMemberEmail");
const submitAddMember = document.getElementById("submitAddMember");
const deleteTeamDetailBtn = document.getElementById("deleteTeamDetailBtn");

const newTeamName = document.getElementById("newTeamName");
const newTeamDescription = document.getElementById("newTeamDescription");
const newTeamColor = document.getElementById("newTeamColor");
const submitCreateTeam = document.getElementById("submitCreateTeam");
const cancelCreateTeam = document.getElementById("cancelCreateTeam");
const colorSwatchGrid = document.getElementById("colorSwatchGrid");

let teamDetailsReturnView = 'teams'; // 'teams' or 'actions'

let allCapsules = [];
let featuredCapsules = [];
let selectedCapsuleId = null;
let currentMappedCapsuleId = null;
let activeAction = null; // 'generate', 'version', or 'new_capsule'
let allTeams = [];
let selectedTeamForDetails = null;
let currentUserEmail = null;
let currentUsername = null;
let tier = "basic";
let pendingTutorialStart = false;

// Upgrade Modal Elements
const upgradeModal = document.getElementById("upgradeModal");
const upgradeModalMessage = document.getElementById("upgradeModalMessage");
const closeUpgradeModal = document.getElementById("closeUpgradeModal");
const okUpgradeModal = document.getElementById("okUpgradeModal");
const upgradeNowBtn = document.getElementById("upgradeNowBtn");
const userTierBadge = document.getElementById("userTierBadge");
const tierLabel = document.getElementById("tierLabel");


// Listen for storage changes to keep state in sync
chrome.storage.onChanged.addListener((changes) => {
  if (changes.userEmail) {
    currentUserEmail = changes.userEmail.newValue;
  }
  if (changes.username) {
    currentUsername = changes.username.newValue;
  }
  if (changes.tier) {
    tier = changes.tier.newValue || "basic";
    updateTierBadge();
  }

  // Force a re-render if we are in capsules view and critical info changed
  if (changes.userEmail || changes.username || changes.tier) {
    if (!capsulesView.classList.contains('hidden')) {
      filterAndRenderCapsules();
    }
  }
});

/* ---------- CACHE UTILITIES ---------- */

function saveToCache(key, data) {
  const cacheKey = `cache_${key}`;
  chrome.storage.local.set({ [cacheKey]: data, [`${cacheKey}_ts`]: Date.now() });
}

async function loadFromCache(key) {
  const cacheKey = `cache_${key}`;
  return new Promise(resolve => {
    chrome.storage.local.get([cacheKey], (result) => {
      resolve(result[cacheKey] || null);
    });
  });
}

// Preload and resize drag icon using a canvas + dataURL for maximum compatibility
const finalDragImage = new Image();
const dragCanvas = document.createElement('canvas');
dragCanvas.width = 24;
dragCanvas.height = 24;
const ctx = dragCanvas.getContext('2d');
const dragIconSource = new Image();
dragIconSource.src = "capsule.png";
dragIconSource.onload = () => {
  ctx.drawImage(dragIconSource, 0, 0, 24, 24);
  finalDragImage.src = dragCanvas.toDataURL();
  finalDragImage.style.position = "absolute";
  finalDragImage.style.top = "-9999px";
  finalDragImage.style.left = "-9999px";
  document.body.appendChild(finalDragImage);
};

/* ---------- AUTH & STATE ---------- */

chrome.storage.local.get(["authToken", "authExp", "selectedTeamName"], ({ authToken, authExp, selectedTeamName }) => {
  const now = Math.floor(Date.now() / 1000);

  if (authToken && authExp && authExp > now) {
    chrome.storage.local.get(["userEmail", "username", "tier"], async ({ userEmail, username, tier: storedTier }) => {
      if (userEmail) currentUserEmail = userEmail;
      if (username) currentUsername = username;
      if (storedTier) tier = storedTier;
      updateTierBadge(); // Ensure badge is ready on startup

      // Load teams first to ensure dropdown populates correctly
      const cachedTeams = await loadFromCache('teams');
      if (cachedTeams) {
        allTeams = cachedTeams;
      }

      if (selectedTeamName) {
        showActions(selectedTeamName);
      } else if (userEmail) {
        // Fallback: Default to private actions if no team selected
        showActions("Private");
      } else {
        showLogin();
      }

      // ALWAYS trigger a background refresh of teams/tier on startup.
      // Check tutorial flag BEFORE fetchAndShowTeams redirects to teams view.
      // NOTE: pendingTutorialStart must be set INSIDE the get callback so it is
      // set synchronously before fetchAndShowTeams → showActions() fires.
      if (userEmail) {
        const tutorialKey = `hasSeenTutorial_v4_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
        chrome.storage.local.get(tutorialKey, (result) => {
          if (!result[tutorialKey]) {
            chrome.storage.local.set({ [tutorialKey]: true });
            pendingTutorialStart = true; // showActions() will pick this up
          }
          fetchAndShowTeams(userEmail, false);
        });
      }

      // Check if we should jump to library (set by chat button)
      chrome.storage.local.get(["showLibraryOnce", "showVersionChoiceOnce"], ({ showLibraryOnce, showVersionChoiceOnce }) => {
        if (showLibraryOnce) {
          chrome.storage.local.remove("showLibraryOnce");
          setTimeout(showCapsulesView, 100); // Small delay to ensure view is ready
        } else if (showVersionChoiceOnce) {
          const capsuleId = showVersionChoiceOnce;
          chrome.storage.local.remove("showVersionChoiceOnce");
          currentMappedCapsuleId = capsuleId;

          // Fetch existing details to pre-fill the tag and show version choice
          setGenerationLoading(true);
          fetchCapsuleDetailsRaw(capsuleId).then(detailsRes => {
            setGenerationLoading(false);
            if (detailsRes?.success) {
              const existingTag = detailsRes.data?.tag || "";
              newCapsuleTagInput.value = existingTag;
            }
            showVersionChoice();
          }).catch(() => {
            setGenerationLoading(false);
            showVersionChoice();
          });
        }
      });
    });
  } else {
    showLogin();
  }
  setGenerationLoading(false);

  // Check for captured tag from Gmail (or other platforms)
  chrome.storage.local.get(["capturedTag"], ({ capturedTag }) => {
    if (capturedTag) {
      capsuleTagInput.value = capturedTag;
      // We don't clear it immediately anymore; we let the live fetch overwrite/clear it
    }

    // ALWAYS perform a live fetch from the active tab to ensure freshness (Write-Through)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "GET_CHAT_TITLE" }, (res) => {
          if (res && res.title) {
            capsuleTagInput.value = res.title;
          }
          // Clear capturedTag from storage once we have (or tried to get) a fresh title
          if (capturedTag) {
            chrome.storage.local.remove(["capturedTag"]);
          }
        });
      } else if (capturedTag) {
        // Fallback: Clear it if we can't even query the tab
        chrome.storage.local.remove(["capturedTag"]);
      }
    });
  });
});


/* ---------- VIEW MANAGEMENT ---------- */

function switchView(targetView, options = {}) {
  const views = [
    loginView, teamView, actionView, capsulesView,
    versionChoiceView, createTeamView, teamDetailsPanel
  ];

  // Hide all views
  views.forEach(view => {
    if (view) view.classList.add("hidden");
  });

  // Show target view
  if (targetView) {
    targetView.classList.remove("hidden");
  }

  // Handle body classes
  if (!document.body.classList.contains("tutorial-mode")) {
    document.body.classList.remove("login-mode", "expanded");
    if (options.bodyClass) {
      document.body.classList.add(options.bodyClass);
    }
  }

  // Handle footer
  const footer = document.querySelector(".footer");
  if (footer) {
    if (options.showFooter === false) {
      footer.classList.add("hidden");
    } else {
      footer.classList.remove("hidden");
    }
  }

  // Handle logout button
  if (logoutBtn) {
    if (options.showLogout === false) {
      logoutBtn.classList.add("hidden");
    } else {
      logoutBtn.classList.remove("hidden");
    }
  }
}

function showLogin() {
  switchView(loginView, {
    bodyClass: "login-mode",
    showFooter: false,
    showLogout: false
  });
}

function showTeams() {
  switchView(teamView);
}

function showActions(teamName) {
  switchView(actionView);

  populateMainTeamDropdown();

  const teamDisplay = document.querySelector(".selected-team-display");
  const changeTeamText = document.getElementById("changeTeamLink");
  if (teamDisplay && changeTeamText) {
    if (teamName === "Private" || !teamName || teamName === "Work Privately") {
      changeTeamText.textContent = "Join Team";
    } else {
      changeTeamText.textContent = "Manage Team";
    }
    teamDisplay.classList.remove("hidden");
  }

  // Fire pending tutorial start — this is the only reliable point where
  // the action view is fully visible after all view-switching is complete.
  if (pendingTutorialStart) {
    pendingTutorialStart = false;
    setTimeout(() => startTutorial(), 200);
  }
}

function showVersionChoice() {
  switchView(versionChoiceView);
}

function extractConvoId(url) {
  if (url.includes('gemini.google.com') || url.includes('aistudio.google.com')) {
    const match = url.match(/\/app\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  } else if (url.includes('claude.ai')) {
    const match = url.match(/\/chat\/([a-z0-9-]+)/);
    return match ? match[1] : null;
  } else if (url.includes('chat.deepseek.com')) {
    const match = url.match(/\/a\/chat\/s\/([a-z0-9-]+)/);
    return match ? match[1] : null;
  } else if (url.includes('chatgpt.com')) {
    const match = url.match(/\/c\/([a-z0-9-]+)/);
    return match ? match[1] : null;
  } else if (url.includes('perplexity.ai')) {
    const match = url.match(/\/search\/([^\/?#]+)/);
    if (!match) return null;
    const parts = match[1].split('-');
    return parts[parts.length - 1] || null;
  } else if (url.includes('notebooklm.google.com')) {
    const match = url.match(/\/notebook\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  } else if (url.includes('grok.com')) {
    const match = url.match(/\/(?:chat|c)\/([a-zA-Z0-9-]+)/);
    return match ? match[1] : null;
  }
  return null;
}

/* ---------- LOGIN FLOW ---------- */

loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  setLoading(loginBtn, true, "Signing in...");

  try {
    chrome.runtime.sendMessage({
      type: "LOGIN",
      payload: { email, password }
    }, (res) => {
      if (res?.success) {
        const data = res.data;
        chrome.storage.local.set({
          authToken: data.authToken || data.token,
          authExp: data.authExp || data.exp,
          userEmail: email
        }, () => {
          if (data.tier) {
            tier = data.tier;
            chrome.storage.local.set({ tier: data.tier });
          }
          fetchAndShowTeams(email);
          handleLoginSuccess(false);
        });
      } else {
        alert(res?.error || "Login failed");
        setLoading(loginBtn, false, "Sign in");
      }
    });
  } catch (err) {
    alert("Login message failed");
    console.error(err);
    setLoading(loginBtn, false, "Sign in");
  }
});

googleLoginBtn.addEventListener("click", () => {
  setLoading(googleLoginBtn, true, "Signing in...");

  chrome.runtime.sendMessage({ type: "START_GOOGLE_LOGIN" }, (res) => {
    if (chrome.runtime.lastError) {
      console.error("Message error:", chrome.runtime.lastError);
      alert("Extension error: " + chrome.runtime.lastError.message);
      setLoading(googleLoginBtn, false, "Sign in with Google");
      return;
    }

    if (res?.success) {
      const data = res.data;
      chrome.storage.local.set({
        authToken: data.authToken || data.token,
        authExp: data.authExp || data.exp,
        userEmail: data.email
      }, () => {
        if (data.tier) {
          tier = data.tier;
          chrome.storage.local.set({ tier: data.tier });
        }
        fetchAndShowTeams(data.email);
        setLoading(googleLoginBtn, false, "Sign in with Google");
        handleLoginSuccess(true);
      });
    } else {
      console.error("Google Auth failed:", res?.error);
      alert("Google login failed: " + (res?.error || "Unknown error"));
      setLoading(googleLoginBtn, false, "Sign in with Google");
    }
  });
});

async function handleLoginSuccess(isStandardOrGoogle) {
  // 1. Automatic Tab Refresh
  const refreshed = await refreshActiveTab();

  // 2. Conditional Restart Nudge (only if refresh wasn't possible)
  if (!refreshed && restartNudge) {
    restartNudge.classList.remove("hidden");
  }

  // 3. Tutorial Autostart — set flag so showActions() fires it after teams load
  chrome.storage.local.get("userEmail", ({ userEmail }) => {
    if (userEmail) {
      const tutorialKey = `hasSeenTutorial_v4_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
      chrome.storage.local.get(tutorialKey, (result) => {
        if (!result[tutorialKey]) {
          chrome.storage.local.set({ [tutorialKey]: true });
          pendingTutorialStart = true; // showActions() will pick this up
        }
      });
    }
  });
}

async function refreshActiveTab() {
  return new Promise((resolve) => {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = (tabs && tabs.length > 0) ? tabs[0] : null;

        if (!activeTab || !activeTab.url || !activeTab.id) {
          resolve(false);
          return;
        }

        const url = activeTab.url.toLowerCase();
        const supportedHosts = [
          'chatgpt.com', 'chat.openai.com', 'claude.ai',
          'gemini.google.com', 'aistudio.google.com',
          'perplexity.ai', 'deepseek.com', 'lovable.dev',
          'replit.com', 'app.emergent.sh', 'copilot.microsoft.com',
          'outlook.live.com', 'outlook.office.com', 'outlook.office365.com',
          'notebooklm.google.com', 'grok.com'
        ];

        const isSupported = supportedHosts.some(host => url.includes(host));

        if (isSupported) {
          // Brave and some chromium variants might block chrome.tabs.reload
          // We'll try tabs.reload first, and use sendMessage as a guaranteed fallback.
          try {
            chrome.tabs.reload(activeTab.id, { bypassCache: true }, () => {
              if (chrome.runtime.lastError) {
                // Fallback to Content Script message
                chrome.tabs.sendMessage(activeTab.id, { type: "RELOAD_PAGE" }, (res) => {
                  resolve(true); // Always resolve true if we sent the message
                });
              } else {
                resolve(true);
              }
            });
          } catch (reloadErr) {
            // Immediate fallback
            chrome.tabs.sendMessage(activeTab.id, { type: "RELOAD_PAGE" }, (res) => {
              resolve(true);
            });
          }
        } else {
          resolve(false);
        }
      });
    } catch (err) {
      resolve(false);
    }
  });
}

if (closeNudge) {
  closeNudge.addEventListener("click", () => {
    restartNudge.classList.add("hidden");
  });
}

async function fetchAndShowTeams(email, shouldSwitchView = true) {
  currentUserEmail = email;

  // 1. Show cached data immediately
  const cachedTeams = await loadFromCache('teams');
  if (cachedTeams) {
    allTeams = cachedTeams;
    renderTeamList(cachedTeams);
    if (shouldSwitchView) showTeams();
  }

  // 2. Fetch fresh data in background
  if (refreshTeamsBtn) refreshTeamsBtn.classList.add("spinning");

  chrome.runtime.sendMessage({
    type: "GET_USER_TEAMS",
    payload: {}
  }, (res) => {
    if (refreshTeamsBtn) refreshTeamsBtn.classList.remove("spinning");

    if (res?.success) {
      const teams = res.teams || [];
      const username = res.username || currentUsername || "";
      const currentTier = res.tier || tier || "basic";
      allTeams = teams;
      tier = currentTier;
      updateTierBadge(); // Initial badge state

      if (username) {
        currentUsername = username;
        chrome.storage.local.set({ username: username });
      }
      chrome.storage.local.set({ tier: currentTier });

      saveToCache('teams', teams);
      renderTeamList(teams);
      populateMainTeamDropdown();
      if (!cachedTeams && shouldSwitchView) showTeams();
    } else {
      console.error("Error fetching teams:", res?.error);
      if (!cachedTeams) {
        alert("Could not load teams. Please try again.");
        setLoading(loginBtn, false, "Sign in");
      }
    }
  });
}

function updateTierBadge() {
  if (!userTierBadge || !tierLabel) return;
  const displayTier = tier || "basic";
  tierLabel.textContent = displayTier.charAt(0).toUpperCase() + displayTier.slice(1);

  // Cleanup old classes
  userTierBadge.classList.remove("tier-basic", "tier-pro", "tier-elite", "tier-enterprise", "tier-trial");
  userTierBadge.classList.add(`tier-${displayTier}`);

  // Custom title for Trial
  if (displayTier === "trial") {
    userTierBadge.title = "Trial Pack: All features unlocked (Limited time)";
  } else {
    userTierBadge.title = "Upgrade your tier";
  }
}

userTierBadge?.addEventListener("click", () => {
  window.open("https://capsulehub.tilantra.com/billing", "_blank");
});

function renderTeamList(teams) {
  teamList.innerHTML = "";

  // Basic users should not see any teams listed at all
  if (tier === 'basic') {
    teamView.classList.add("no-teams");
    return;
  }

  // Add/remove class based on team count for centered button layout
  if (teams.length === 0) {
    teamView.classList.add("no-teams");
  } else {
    teamView.classList.remove("no-teams");
  }

  teams.forEach(team => {
    const btn = document.createElement("button");
    btn.className = "team-li-item";

    const dot = document.createElement("div");
    dot.className = "team-dot";
    dot.style.background = team.color_tag || team.color || "#6366f1";

    const name = document.createElement("span");
    name.textContent = team.name;

    const teamId = team.team_id || team.id || team._id;

    const settingsBtn = document.createElement("div");
    settingsBtn.className = "team-settings-btn"; // No has-tooltip anymore
    settingsBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    settingsBtn.onclick = (e) => {
      e.stopPropagation();
      teamDetailsReturnView = 'teams';
      loadTeamDetails(teamId);
    };

    btn.appendChild(dot);
    btn.appendChild(name);
    // Personal workspace doesn't have details/management
    if (teamId && teamId !== "") {
      btn.appendChild(settingsBtn);
    }
    btn.onclick = () => selectTeam(teamId, team.name);
    teamList.appendChild(btn);
  });
  if (teamList) {
    teamList.addEventListener("scroll", () => updateScrollIndicators(teamList, teamScrollUp, teamScrollDown));
    setTimeout(() => updateScrollIndicators(teamList, teamScrollUp, teamScrollDown), 0);
  }
}

function selectTeam(teamId, teamName) {
  chrome.storage.local.set({ selectedTeam: teamId, selectedTeamName: teamName }, () => {
    showActions(teamName);
    setLoading(loginBtn, false, "Sign in");
  });
}

function populateMainTeamDropdown() {
  if (!teamSelectDropdown) return;
  chrome.storage.local.get(["selectedTeam"], ({ selectedTeam }) => {
    teamSelectDropdown.innerHTML = '<option value="">Private</option>';
    allTeams.forEach(team => {
      const option = document.createElement("option");
      option.value = team.team_id || team.id || team._id;
      option.textContent = team.name;
      teamSelectDropdown.appendChild(option);
    });
    teamSelectDropdown.value = selectedTeam || "";
  });
}

teamSelectDropdown.addEventListener("change", () => {
  const teamId = teamSelectDropdown.value;
  const teamName = teamSelectDropdown.options[teamSelectDropdown.selectedIndex].text;
  selectTeam(teamId, teamName);
});

/* ---------- TEAM CHANGE ---------- */

changeTeamLink.addEventListener("click", () => {
  chrome.storage.local.get("userEmail", ({ userEmail }) => {
    if (userEmail) {
      fetchAndShowTeams(userEmail);
    } else {
      showLogin();
    }
  });
});

/* ---------- LOGOUT ---------- */

logoutBtn.addEventListener("click", () => {
  chrome.storage.local.get(null, (items) => {
    const allKeys = Object.keys(items);
    const keysToRemove = [
      "authToken", "authExp", "selectedTeam", "selectedTeamName",
      "userEmail", "capsuleSummary", "lastCapsuleId", "showLibraryOnce",
      "tier", "username", "localConvoMappings"
    ];

    // Also remove any cached teams or capsules
    allKeys.forEach(key => {
      if (key.startsWith("cache_") || key.startsWith("capsules_")) {
        keysToRemove.push(key);
      }
    });

    chrome.storage.local.remove(keysToRemove, () => {
      currentUserEmail = null;
      allCapsules = [];
      allTeams = [];
      showLogin();
    });
  });
});

/* ---------- ACTIONS & GENERATION ---------- */

generateBtn.addEventListener("click", () => {
  const tag = capsuleTagInput.value.trim();

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (!tabs[0]) return;

    const convoId = extractConvoId(tabs[0].url);
    if (!convoId || tier === 'basic') {
      activeAction = "generate";
      triggerStandardGeneration(tabs[0].id, tag);
      return;
    }

    setGenerationLoading(true);

    function handleMappedCapsule(capsuleId) {
      currentMappedCapsuleId = capsuleId;
      fetchCapsuleDetailsRaw(currentMappedCapsuleId).then(detailsRes => {
        setGenerationLoading(false);
        const existingTag = detailsRes?.success ? (detailsRes.data?.tag || "") : "";
        newCapsuleTagInput.value = tag || existingTag;
        showVersionChoice();
      }).catch(() => {
        setGenerationLoading(false);
        newCapsuleTagInput.value = tag || "";
        showVersionChoice();
      });
    }

    // Check local mapping first (covers capsules dropped into this conversation, not generated)
    chrome.storage.local.get("localConvoMappings", ({ localConvoMappings = {} }) => {
      const localCapsuleId = localConvoMappings[convoId];
      if (localCapsuleId) {
        handleMappedCapsule(localCapsuleId);
        return;
      }
      chrome.runtime.sendMessage({
        type: "CHECK_CONVO_MAPPING",
        payload: { conversationId: convoId }
      }, (res) => {
        setGenerationLoading(false);
        if (res?.success && res.data?.capsule_id) {
          handleMappedCapsule(res.data.capsule_id);
        } else {
          activeAction = "generate";
          triggerStandardGeneration(tabs[0].id, tag);
        }
      });
    });
  });
});

function triggerStandardGeneration(tabId, tag) {
  chrome.tabs.sendMessage(tabId, {
    type: "GENERATE_SUMMARY",
    payload: { tag: tag }
  });
}

newVersionBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (!tabs[0]) return;
    activeAction = "version";
    setVersionLoading(true);
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "GENERATE_VERSION",
      payload: { capsuleId: currentMappedCapsuleId }
    });
  });
});

newCapsuleBtn.addEventListener("click", () => {
  const tag = newCapsuleTagInput.value.trim();
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (!tabs[0]) return;
    activeAction = "new_capsule";
    setNewCapsuleLoading(true);
    triggerStandardGeneration(tabs[0].id, tag);
  });
});

backFromVersion.addEventListener("click", () => {
  chrome.storage.local.get(["selectedTeamName"], ({ selectedTeamName }) => {
    showActions(selectedTeamName || "Personal Workspace");
  });
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "GENERATION_STARTED") {
    if (activeAction === "version") {
      setVersionLoading(true);
    } else if (activeAction === "new_capsule") {
      setNewCapsuleLoading(true, "Generating...");
    } else {
      // Default to standard generate loading if activeAction is null or "generate"
      setGenerationLoading(true, "Generating...");
    }
  }
  /* Status (e.g. "Checking attachments [2/5]") is shown on the capsule logo on the page, not in the popup. */
  if (msg.type === "GENERATION_COMPLETE") {
    setGenerationLoading(false);
    setVersionLoading(false);
    setNewCapsuleLoading(false);
    if (msg.success) {
      window.close();
    } else if (msg.error === "upgrade_required" || (msg.error && msg.error.toLowerCase().includes("internal server error"))) {
      showUpgradeModal("Capsule creation limit reached. Please upgrade your tier to proceed.", true);
    }
  }
});

function setGenerationLoading(isLoading, text = "Checking...") {
  if (isLoading) {
    generateBtn.disabled = true;
    genSpinner.classList.remove("hidden");
    genText.textContent = text;
  } else {
    generateBtn.disabled = false;
    genSpinner.classList.add("hidden");
    genText.textContent = "Generate Capsule";
  }
}

function setVersionLoading(isLoading) {
  if (isLoading) {
    newVersionBtn.disabled = true;
    newCapsuleBtn.disabled = true;
    verSpinner.classList.remove("hidden");
    verText.textContent = "Creating...";
  } else {
    newVersionBtn.disabled = false;
    newCapsuleBtn.disabled = false;
    verSpinner.classList.add("hidden");
    verText.textContent = "New Version";
  }
}

function setNewCapsuleLoading(isLoading, text = "New Capsule") {
  if (isLoading) {
    newVersionBtn.disabled = true;
    newCapsuleBtn.disabled = true;
    newCapSpinner.classList.remove("hidden");
    newCapText.textContent = text === "Generating..." ? "Generating..." : "Creating...";
  } else {
    newVersionBtn.disabled = false;
    newCapsuleBtn.disabled = false;
    newCapSpinner.classList.add("hidden");
    newCapText.textContent = "New Capsule";
  }
}

viewCapsulesBtn.addEventListener("click", () => {
  showCapsulesView();
});

backToActions.addEventListener("click", () => {
  showActionsView();
});

if (refreshTeamsBtn) {
  refreshTeamsBtn.addEventListener("click", () => {
    chrome.storage.local.get("userEmail", ({ userEmail }) => {
      if (userEmail) fetchAndShowTeams(userEmail);
    });
  });
}

if (refreshCapsulesBtn) {
  refreshCapsulesBtn.addEventListener("click", () => {
    fetchUserCapsules(teamFilter.value || "");
  });
}

function showCapsulesView() {
  switchView(capsulesView, { bodyClass: "expanded" });


  chrome.storage.local.get(["userEmail"], ({ userEmail }) => {
    if (userEmail) {
      setupTeamFilter(userEmail);
    } else {
      fetchUserCapsules();
    }
  });
}

function showActionsView() {
  chrome.storage.local.get(["selectedTeamName", "selectedTeam"], ({ selectedTeamName, selectedTeam }) => {
    showActions(selectedTeamName || selectedTeam || "default-team");
    selectedCapsuleId = null;
  });
}

async function setupTeamFilter(email) {
  // 1. Load from cache first
  const cachedTeams = await loadFromCache('teams');
  if (cachedTeams) {
    allTeams = cachedTeams;
    renderTeamFilterUI(cachedTeams);
  }

  // 2. Background fetch
  chrome.runtime.sendMessage({
    type: "GET_USER_TEAMS",
    payload: {}
  }, (res) => {
    if (res?.success) {
      const teams = res.teams || [];
      allTeams = teams;
      saveToCache('teams', teams);

      if (res.username) {
        currentUsername = res.username;
        chrome.storage.local.set({ username: res.username });
      }

      renderTeamFilterUI(teams);
    }
  });

  if (capsulesListContainer) {
    capsulesListContainer.addEventListener("scroll", () => updateScrollIndicators(capsulesListContainer, scrollUpBtn, scrollDownBtn));
  }
}

function renderTeamFilterUI(teams) {
  // We no longer load or save the 'selectedTeam' here to avoid clashing with the generation settings.
  // The filter in this view is now session-based.

  // Default selection: "ALL" if teams exist, otherwise "" (Private)
  let currentTeamSelection = (teams && teams.length > 0) ? "ALL" : "";

  // Show the filter UI for all users so they can access "Featured Capsules"
  teamFilterContainer.classList.remove("hidden");

  // Populate dropdown options
  if (teams && teams.length > 0) {
    teamFilter.innerHTML = '<option value="ALL">All Teams</option><option value="">Private</option>';
  } else {
    teamFilter.innerHTML = '<option value="">Private</option>';
  }

  if (teams) {
    teams.forEach(team => {
      const option = document.createElement("option");
      option.value = team.team_id || team.id || team._id;
      option.textContent = team.name;
      teamFilter.appendChild(option);
    });
  }

  // Add Featured Capsules at the bottom
  const featuredOption = document.createElement("option");
  featuredOption.value = "featured";
  featuredOption.textContent = "✨ Featured Capsules";
  teamFilter.appendChild(featuredOption);

  teamFilter.onchange = () => {
    if (teamFilter.value === "featured") {
      fetchFeaturedCapsules();
    } else {
      fetchUserCapsules(teamFilter.value);
    }
  };

  // Set current selection and fetch data
  teamFilter.value = currentTeamSelection;
  if (currentTeamSelection === "featured") {
    fetchFeaturedCapsules();
  } else {
    fetchUserCapsules(currentTeamSelection);
  }
}

// Featured filter listener
if (featuredFilter) {
  featuredFilter.addEventListener("change", () => {
    if (featuredFilter.value === "featured") {
      // Reset team filter selection
      if (teamFilter) teamFilter.value = "";
      fetchFeaturedCapsules();
    } else {
      // Restore user's capsules
      const team = teamFilter ? teamFilter.value : "";
      fetchUserCapsules(team);
    }
  });
}

function updateScrollIndicators(container, upBtn, downBtn) {
  if (!container || !upBtn || !downBtn) return;
  const { scrollTop, scrollHeight, clientHeight } = container;

  if (scrollTop > 5) {
    upBtn.classList.remove("hidden");
  } else {
    upBtn.classList.add("hidden");
  }

  if (scrollTop + clientHeight < scrollHeight - 5) {
    downBtn.classList.remove("hidden");
  } else {
    downBtn.classList.add("hidden");
  }
}

if (capsuleSearchInput) {
  capsuleSearchInput.addEventListener("input", () => {
    filterAndRenderCapsules();
  });
}

function filterAndRenderCapsules() {
  const query = capsuleSearchInput.value.trim().toLowerCase();

  // If showing featured shelf, filter within featured capsules
  if (teamFilter && teamFilter.value === "featured") {
    const filtered = featuredCapsules.filter(c => {
      const tag = (c.tag || "").toLowerCase();
      const summary = (c.summary || c.text || c.content || "").toLowerCase();
      return !query || tag.includes(query) || summary.includes(query);
    });
    renderCapsulesList(filtered);
    return;
  }

  if (!query) {
    renderCapsulesList(allCapsules);
    return;
  }
  const filtered = allCapsules.filter(c => {
    const tag = (c.tag || "").toLowerCase();
    const summary = (c.summary || c.text || c.content || "").toLowerCase();
    return tag.includes(query) || summary.includes(query);
  });
  renderCapsulesList(filtered);
}

async function fetchFeaturedCapsules() {
  capsulesListContainer.innerHTML = '<div class="loading-capsules">Loading featured capsules...</div>';
  chrome.runtime.sendMessage({ type: "GET_FEATURED_CAPSULES" }, (res) => {
    if (res?.success) {
      featuredCapsules = res.results || [];
      if (featuredCapsules.length === 0) {
        capsulesListContainer.innerHTML = '<div class="no-capsules-msg">No featured capsules available yet.</div>';
      } else {
        renderCapsulesList(featuredCapsules);
      }
    } else {
      capsulesListContainer.innerHTML = '<div class="no-capsules-msg">Failed to load featured capsules.</div>';
    }
  });
}

async function fetchUserCapsules(team = "") {
  chrome.storage.local.get(["authToken", "userEmail"], async ({ authToken, userEmail }) => {
    if (userEmail) currentUserEmail = userEmail;
    if (!authToken) {
      capsulesListContainer.innerHTML = '<div class="no-capsules-msg">Not authenticated</div>';
      return;
    }

    // 1. Show cached data immediately
    const cacheKey = `capsules_${team || 'private'}`;
    const cachedCapsules = await loadFromCache(cacheKey);
    if (cachedCapsules) {
      allCapsules = cachedCapsules;
      filterAndRenderCapsules();
    } else {
      capsulesListContainer.innerHTML = '<div class="loading-capsules">Loading capsules...</div>';
    }

    // 2. Fetch fresh data
    if (refreshCapsulesBtn) refreshCapsulesBtn.classList.add("spinning");

    try {
      chrome.runtime.sendMessage({
        type: "GET_CAPSULES",
        payload: { team, authToken }
      }, (res) => {
        if (refreshCapsulesBtn) refreshCapsulesBtn.classList.remove("spinning");

        if (res?.success) {
          const capsules = res.results || [];
          allCapsules = capsules;
          saveToCache(cacheKey, capsules);

          if (capsules.length === 0) {
            capsulesListContainer.innerHTML = '<div class="no-capsules-msg">No capsules found</div>';
            return;
          }
          filterAndRenderCapsules();
        } else {
          console.error("Error fetching capsules:", res?.error);
          if (!cachedCapsules) {
            capsulesListContainer.innerHTML = '<div class="no-capsules-msg">Failed to load capsules</div>';
          }
        }
      });
    } catch (err) {
      console.error("Error messaging for capsules:", err);
      if (refreshCapsulesBtn) refreshCapsulesBtn.classList.remove("spinning");
      if (!cachedCapsules) {
        capsulesListContainer.innerHTML = '<div class="no-capsules-msg">Failed to load capsules</div>';
      }
    }
  });
}

function getTeamName(teamId) {
  if (!teamId || teamId === "") {
    return "Private";
  }
  const team = allTeams.find(t =>
    t.team_id === teamId ||
    t.id === teamId ||
    t._id === teamId
  );
  return team ? team.name : teamId;
}

async function renderCapsulesList(capsules) {
  // Ensure we have the current user email and username before rendering
  if (!currentUserEmail || !currentUsername) {
    const data = await new Promise(r => chrome.storage.local.get(["userEmail", "username"], r));
    if (data.userEmail) currentUserEmail = data.userEmail;
    if (data.username) currentUsername = data.username;
  }

  capsulesListContainer.innerHTML = "";

  const privateCapsules = capsules.filter(c => !c.team || c.team === "");
  const teamCapsules = capsules.filter(c => c.team && c.team !== "");

  // Show sections if we have both or if we are in "ALL" mode
  const showSections = teamFilter.value === "ALL" && privateCapsules.length > 0 && teamCapsules.length > 0;

  if (privateCapsules.length > 0) {
    if (showSections) {
      const header = document.createElement("div");
      header.className = "capsule-group-header";
      header.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        Private Capsules
      `;
      capsulesListContainer.appendChild(header);
    }
    privateCapsules.forEach(capsule => {
      const item = createCapsuleItem(capsule);
      capsulesListContainer.appendChild(item);
    });
  }

  if (teamCapsules.length > 0) {
    if (showSections) {
      const header = document.createElement("div");
      header.className = "capsule-group-header";
      header.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        Team Capsules
      `;
      capsulesListContainer.appendChild(header);
    }
    teamCapsules.forEach(capsule => {
      const item = createCapsuleItem(capsule);
      capsulesListContainer.appendChild(item);
    });
  }

  setTimeout(() => updateScrollIndicators(capsulesListContainer, scrollUpBtn, scrollDownBtn), 0);
}

function createCapsuleItem(capsule) {
  const item = document.createElement("div");
  item.className = "capsule-item";
  item.dataset.capsuleId = capsule.capsule_id;

  const tag = document.createElement("div");
  tag.className = "capsule-item-tag";
  tag.textContent = capsule.tag || "Untitled";

  const author = document.createElement("div");
  author.className = "capsule-item-author";
  author.textContent = `Created by: ${capsule.created_by || "Unknown"}`;

  const isOwner = (capsule.created_by || "").trim() === (currentUsername || "").trim() || (capsule.created_by || "").trim() === (currentUserEmail || "").trim();
  const isTeamMember = capsule.team && allTeams.some(t => (t.team_id || t.id || t._id) === capsule.team);
  const canEdit = isOwner || isTeamMember;

  if (canEdit && !item.classList.contains("featured-item")) {
    const editBtn = document.createElement("button");
    editBtn.className = "edit-capsule-btn";
    editBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
    `;
    editBtn.title = "Edit Tag";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      startEditingTag(capsule, tag, editBtn);
    });
    // Insert after tag or append? Let's wrap tag in a header container
    const tagHeader = document.createElement("div");
    tagHeader.className = "capsule-tag-header";
    tagHeader.appendChild(tag);
    tagHeader.appendChild(editBtn);
    item.appendChild(tagHeader);
  } else {
    item.appendChild(tag);
  }

  const teamRow = document.createElement("div");
  teamRow.className = "capsule-item-team-row";

  const teamLabel = document.createElement("span");
  teamLabel.textContent = "Team: ";

  const teamChip = document.createElement("span");
  teamChip.className = "capsule-item-team";
  const teamNameStr = getTeamName(capsule.team);
  teamChip.textContent = teamNameStr;

  // Find team color if available
  const teamObj = allTeams.find(t =>
    t.name === teamNameStr ||
    t.team_id === capsule.team ||
    t.id === capsule.team ||
    t._id === capsule.team
  );
  if (teamObj && (teamObj.color || teamObj.color_tag)) {
    const color = teamObj.color || teamObj.color_tag;
    teamChip.style.backgroundColor = `${color}1A`;
    teamChip.style.borderColor = `${color}4D`;
    teamChip.style.color = color;
    teamChip.style.borderStyle = "solid";
  }

  teamRow.appendChild(teamLabel);
  teamRow.appendChild(teamChip);

  const privateIndicator = document.createElement("div");
  privateIndicator.className = "capsule-item-private";

  if (canEdit && !capsule.team && allTeams.length > 0) {
    const lockIcon = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    `;

    privateIndicator.innerHTML = lockIcon;

    const teamSelect = document.createElement("select");
    teamSelect.className = "inline-team-select";

    const privateOption = document.createElement("option");
    privateOption.value = "";
    privateOption.textContent = "Private Capsule";
    teamSelect.appendChild(privateOption);

    allTeams.forEach(t => {
      const option = document.createElement("option");
      option.value = t.team_id || t.id || t._id;
      option.textContent = t.name;
      teamSelect.appendChild(option);
    });

    teamSelect.addEventListener("change", (e) => {
      const newTeam = e.target.value;
      if (newTeam) {
        if (confirm(`Move this capsule to the team "${getTeamName(newTeam)}"? This can only be done once.`)) {
          updateCapsuleTeam(capsule, newTeam, item);
        } else {
          teamSelect.value = "";
        }
      }
    });

    teamSelect.addEventListener("click", e => e.stopPropagation());

    privateIndicator.appendChild(teamSelect);
  } else {
    privateIndicator.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
      <span>Private</span>
    `;
  }

  const version = document.createElement("div");
  version.className = "capsule-version";
  const vCount = capsule.current_version_number || 1;
  version.textContent = `v${vCount}`;
  version.style.background = getVersionGradient(vCount);

  const MODEL_LOGOS = {
    chatgpt: 'ChatgptLogo.png',
    claude: 'ClaudeLogo.png',
    deepseek: 'DeepseekLogo.png',
    gemini: 'GeminiLogo.png',
    copilot: 'CopilotLogo.png',
    gmail: 'GmailLogo.png',
    perplexity: 'PerplexityLogo.png',
    lovable: 'LovableLogo.png',
    outlook: 'OutlookLogo.png',
    replit: 'ReplitLogo.png',
    emergent: 'EmergentLogo.png',
    notebooklm: 'NotebooklmLogo.png',
    grok: 'GrokLogo.png',
    mcp: 'mcp.png',
    default: 'capsule.png'
  };

  const extractedFromArr = Array.isArray(capsule.extracted_from) ? capsule.extracted_from : (capsule.extracted_from ? [capsule.extracted_from] : []);
  const extractedFrom = document.createElement("div");
  extractedFrom.className = "capsule-item-extracted-from";

  if (extractedFromArr.length > 0) {
    extractedFromArr.forEach((source, index) => {
      const key = source.toLowerCase();
      let imgSrc = MODEL_LOGOS.default;
      let type = 'default';
      if (key.includes('gpt')) { imgSrc = MODEL_LOGOS.chatgpt; type = 'chatgpt'; }
      else if (key.includes('claude')) { imgSrc = MODEL_LOGOS.claude; type = 'claude'; }
      else if (key.includes('deepseek')) { imgSrc = MODEL_LOGOS.deepseek; type = 'deepseek'; }
      else if (key.includes('gemini')) { imgSrc = MODEL_LOGOS.gemini; type = 'gemini'; }
      else if (key.includes('copilot')) { imgSrc = MODEL_LOGOS.copilot; type = 'copilot'; }
      else if (key === 'mail' || key.includes('gmail') || key.includes('mail.google')) { imgSrc = MODEL_LOGOS.gmail; type = 'gmail'; }
      else if (key.includes('perplexity')) { imgSrc = MODEL_LOGOS.perplexity; type = 'perplexity'; }
      else if (key.includes('lovable')) { imgSrc = MODEL_LOGOS.lovable; type = 'lovable'; }
      else if (key.includes('outlook')) { imgSrc = MODEL_LOGOS.outlook; type = 'outlook'; }
      else if (key.includes('replit')) { imgSrc = MODEL_LOGOS.replit; type = 'replit'; }
      else if (key.includes('emergent')) { imgSrc = MODEL_LOGOS.emergent; type = 'emergent'; }
      else if (key.includes('notebooklm')) { imgSrc = MODEL_LOGOS.notebooklm; type = 'notebooklm'; }
      else if (key.includes('grok')) { imgSrc = MODEL_LOGOS.grok; type = 'grok'; }
      else if (key.includes('mcp')) { imgSrc = MODEL_LOGOS.mcp; type = 'mcp'; }

      const img = document.createElement("img");
      img.className = `model-logo logo-${type}`;
      img.src = imgSrc;
      img.title = source;
      if (index >= 2) img.classList.add("extra-icon");
      extractedFrom.appendChild(img);
    });

    if (extractedFromArr.length > 2) {
      const badge = document.createElement("div");
      badge.className = "more-badge";
      badge.textContent = `+${extractedFromArr.length - 2}`;
      extractedFrom.appendChild(badge);
    }
  } else {
    extractedFrom.classList.add("hidden");
  }

  const createdDate = capsule.created_at ? new Date(capsule.created_at).toLocaleString() : "Unknown date";
  const metaInfo = [
    `Created by: ${capsule.created_by || "Unknown"}`,
    capsule.team && capsule.team !== "" ? `Team: ${teamNameStr}` : null,
    extractedFromArr.length > 0 ? `Extracted from: ${extractedFromArr.join(", ")}` : null,
    `Created: ${createdDate}`
  ].filter(Boolean).join("\n");
  item.title = metaInfo;

  item.draggable = true;
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", `CAPSULE_ID:${capsule.capsule_id}`);
    e.dataTransfer.effectAllowed = "copy";
    if (finalDragImage && finalDragImage.src) {
      e.dataTransfer.setDragImage(finalDragImage, 12, 12);
    }
  });

  item.addEventListener("click", () => {
    document.querySelectorAll(".capsule-item").forEach(c => c.classList.remove("selected"));
    item.classList.add("selected");
    selectedCapsuleId = capsule.capsule_id;
  });

  if (capsule.team && capsule.team !== "") {
    item.appendChild(teamRow);
  } else {
    item.appendChild(privateIndicator);
  }
  item.appendChild(extractedFrom);
  item.appendChild(author);
  item.appendChild(version);

  if (isOwner) {
    item.classList.add("can-delete");
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-capsule-btn";
    deleteBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    `;
    deleteBtn.title = "Delete Capsule";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm(`Are you sure you want to delete the capsule "${capsule.tag || 'Untitled'}"?`)) {
        deleteCapsule(capsule.capsule_id, item);
      }
    });
    item.appendChild(deleteBtn);
  }

  return item;
}

function deleteCapsule(capsuleId, itemElement) {
  chrome.storage.local.get("authToken", ({ authToken }) => {
    if (!authToken) return;

    // Visual feedback
    itemElement.style.opacity = "0.5";
    itemElement.style.pointerEvents = "none";

    chrome.runtime.sendMessage({
      type: "DELETE_CAPSULE",
      payload: { capsuleId, authToken }
    }, (res) => {
      if (res?.success) {
        itemElement.remove();
        allCapsules = allCapsules.filter(c => c.capsule_id !== capsuleId);
        if (selectedCapsuleId === capsuleId) {
          selectedCapsuleId = null;
        }
        updateScrollIndicators(capsulesListContainer, scrollUpBtn, scrollDownBtn);
      } else {
        showUpgradeModal("Failed to delete capsule: " + (res?.error || "Unknown error"));
        itemElement.style.opacity = "1";
        itemElement.style.pointerEvents = "all";
      }
    });
  });
}

function startEditingTag(capsule, tagElement, editBtn) {
  const currentTag = capsule.tag || "Untitled";
  const parent = tagElement.parentNode;

  const input = document.createElement("input");
  input.type = "text";
  input.className = "inline-tag-input";
  input.value = currentTag;

  const originalDisplay = tagElement.style.display;
  const originalEditDisplay = editBtn.style.display;

  tagElement.style.display = "none";
  editBtn.style.display = "none";

  parent.insertBefore(input, tagElement);
  input.focus();
  input.select();

  let isSaving = false;

  const cleanup = () => {
    if (input.parentNode) input.remove();
    tagElement.style.display = originalDisplay;
    editBtn.style.display = originalEditDisplay;
  };

  const save = async () => {
    if (isSaving) return;
    const newTag = input.value.trim();

    if (!newTag || newTag === currentTag) {
      cleanup();
      return;
    }

    isSaving = true;
    input.disabled = true;
    input.style.opacity = "0.7";

    chrome.storage.local.get("authToken", ({ authToken }) => {
      if (!authToken) {
        cleanup();
        return;
      }

      chrome.runtime.sendMessage({
        type: "UPDATE_CAPSULE_TAG",
        payload: { capsuleId: capsule.capsule_id, tag: newTag, authToken }
      }, (res) => {
        if (res?.success) {
          capsule.tag = newTag;
          tagElement.textContent = newTag;

          // Update local cache
          const team = teamFilter ? teamFilter.value : "";
          const cacheKey = `capsules_${team || 'private'}`;

          allCapsules = allCapsules.map(c =>
            c.capsule_id === capsule.capsule_id ? { ...c, tag: newTag } : c
          );

          saveToCache(cacheKey, allCapsules);
          cleanup();
        } else {
          showUpgradeModal("Failed to update tag: " + (res?.error || "Unknown error"));
          isSaving = false;
          input.disabled = false;
          input.style.opacity = "1";
          input.focus();
        }
      });
    });
  };

  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      save();
    } else if (e.key === "Escape") {
      cleanup();
    }
  };

  input.onblur = () => {
    setTimeout(() => {
      if (!isSaving && document.activeElement !== input) {
        save();
      }
    }, 150);
  };
}

function updateCapsuleTeam(capsule, teamId, itemElement) {
  chrome.storage.local.get("authToken", ({ authToken }) => {
    if (!authToken) return;

    // Visual feedback
    itemElement.style.opacity = "0.5";
    itemElement.style.pointerEvents = "none";

    chrome.runtime.sendMessage({
      type: "UPDATE_CAPSULE_TEAM",
      payload: { capsuleId: capsule.capsule_id, team: teamId, authToken }
    }, (res) => {
      if (res?.success) {
        // Update local state manually to ensure immediate consistency
        capsule.team = teamId;

        // Update the global allCapsules array
        allCapsules = allCapsules.map(c =>
          String(c.capsule_id) === String(capsule.capsule_id) ? { ...c, team: teamId } : c
        );

        // Refresh the UI with the updated data
        renderCapsulesList(allCapsules);

        // Update cache
        const currentFilter = teamFilter ? teamFilter.value : "ALL";
        saveToCache(`capsules_${currentFilter || 'private'}`, allCapsules);
      } else {
        showUpgradeModal("Failed to move capsule: " + (res?.error || "Unknown error"));
        itemElement.style.opacity = "1";
        itemElement.style.pointerEvents = "all";
      }
    });
  });
}



function fetchCapsuleDetails(capsuleId) {
  return fetchCapsuleDetailsRaw(capsuleId).then(res => {
    if (res?.success) {
      const data = res.data;
      const summary = data.summary || data.output || data.text || data.response;
      if (!summary) throw new Error("No summary found in capsule");
      return summary;
    } else {
      throw new Error(res?.error || "Fetch failed");
    }
  });
}

function fetchCapsuleDetailsRaw(capsuleId) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({
      type: "getCapsule",
      payload: { capsuleId }
    }, (res) => {
      resolve(res);
    });
  });
}

function setLoading(btn, isLoading, text) {
  if (!btn) return;
  const spinner = btn.querySelector(".spinner");
  const textEl = btn.querySelector("span:not(.spinner)") || btn;

  if (isLoading) {
    btn.disabled = true;
    if (spinner) spinner.classList.remove("hidden");
    if (textEl === btn) {
      btn.textContent = text;
    } else {
      textEl.textContent = text;
    }
  } else {
    btn.disabled = false;
    if (spinner) spinner.classList.add("hidden");
    if (textEl === btn) {
      btn.textContent = text;
    } else {
      textEl.textContent = text;
    }
  }
}

function getVersionGradient(v) {
  // Deeper, high-contrast gradients for the small version tabs
  const hue = (215 + (v * 20)) % 360;
  return `linear-gradient(135deg, hsl(${hue}, 65%, 45%), hsl(${(hue + 25) % 360}, 60%, 35%))`;
}

/* ---------- TEAM MANAGEMENT ---------- */



function showCreateTeamView() {
  if (tier === 'basic' || tier === 'pro') {
    showUpgradeModal("Upgrade to an Enterprise or Elite plan to create and manage teams.");
    return;
  }
  switchView(createTeamView, { bodyClass: "expanded" });

  newTeamName.value = "";
  newTeamDescription.value = "";
  newTeamColor.value = "#6366f1";
}

backFromCreate.addEventListener("click", () => {
  createTeamView.classList.add("hidden");
  showTeams();
});

cancelCreateTeam.addEventListener("click", () => {
  createTeamView.classList.add("hidden");
  showTeams();
});

createTeamFromSelection.addEventListener("click", () => {
  showCreateTeamView();
});

workPrivatelyLink.addEventListener("click", () => {
  selectTeam("", "Work Privately");
});

if (colorSwatchGrid) {
  colorSwatchGrid.addEventListener("click", (e) => {
    const swatch = e.target.closest(".color-swatch");
    if (!swatch) return;

    // Update selection UI
    colorSwatchGrid.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("selected"));
    swatch.classList.add("selected");

    // Update hidden input
    const color = swatch.dataset.color;
    if (newTeamColor) newTeamColor.value = color;
  });
}

const deleteIconSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;

submitCreateTeam.addEventListener("click", () => {
  const name = newTeamName.value.trim();
  const description = newTeamDescription.value.trim();
  const color_tag = newTeamColor.value;

  if (!name) {
    showUpgradeModal("Please enter a team name");
    return;
  }

  setLoading(submitCreateTeam, true, "Creating...");

  chrome.runtime.sendMessage({
    type: "CREATE_TEAM",
    payload: { name, description, color_tag }
  }, (res) => {
    setLoading(submitCreateTeam, false, "Create Team");
    if (res?.success) {
      createTeamView.classList.add("hidden");
      chrome.storage.local.get("userEmail", ({ userEmail }) => {
        fetchAndShowTeams(userEmail);
      });
    } else {
      if (res?.error === "upgrade_required") {
        showUpgradeModal("Upgrade to an Enterprise or Elite plan to create and manage teams.");
      } else {
        showUpgradeModal("Failed to create team: " + (res?.error || "Unknown error"));
      }
    }
  });
});

submitAddMember.addEventListener("click", () => {
  const email = newMemberEmail.value.trim();
  if (!email || !selectedTeamForDetails) {
    showUpgradeModal("Please enter a valid email");
    return;
  }

  setLoading(submitAddMember, true, "Adding...");

  chrome.runtime.sendMessage({
    type: "ADD_TEAM_MEMBER",
    payload: { teamId: selectedTeamForDetails, email }
  }, (res) => {
    setLoading(submitAddMember, false, "Add Member");
    if (res?.success) {
      newMemberEmail.value = "";
      loadTeamDetails(selectedTeamForDetails);
    } else {
      showUpgradeModal("Failed to add member: " + (res?.error || "Unknown error"));
    }
  });
});

deleteTeamDetailBtn.innerHTML = deleteIconSVG;
deleteTeamDetailBtn.addEventListener("click", () => {
  if (selectedTeamForDetails) {
    deleteTeam(selectedTeamForDetails);
  }
});


function deleteTeam(teamId) {
  if (!confirm("Are you sure you want to delete this team? This action cannot be undone.")) {
    return;
  }

  chrome.runtime.sendMessage({
    type: "DELETE_TEAM",
    payload: { teamId }
  }, (res) => {
    if (res?.success) {
      teamDetailsPanel.classList.add("hidden");
      selectedTeamForDetails = null;
      if (teamDetailsReturnView === 'actions') {
        chrome.storage.local.remove(["selectedTeam", "selectedTeamName"], () => {
          chrome.storage.local.get("userEmail", ({ userEmail }) => {
            fetchAndShowTeams(userEmail);
          });
        });
      } else {
        chrome.storage.local.get("userEmail", ({ userEmail }) => {
          fetchAndShowTeams(userEmail);
        });
      }
    } else {
      showUpgradeModal("Failed to delete team: " + (res?.error || "Unknown error"));
    }
  });
}

function loadTeamDetails(teamId) {
  selectedTeamForDetails = teamId;
  chrome.storage.local.get("userEmail", ({ userEmail }) => {
    if (userEmail) currentUserEmail = userEmail;

    chrome.runtime.sendMessage({
      type: "GET_TEAM_DETAILS",
      payload: { teamId }
    }, (res) => {
      if (res?.success) {
        const team = res.data;
        displayTeamDetails(team);
      } else {
        showUpgradeModal("Failed to load team details: " + (res?.error || "Unknown error"));
      }
    });
  });
}

function displayTeamDetails(team) {
  teamDetailsName.textContent = team.name;
  teamDetailsDescription.textContent = team.description || "No description";

  if (teamDetailsColor) {
    teamDetailsColor.style.background = team.color_tag || team.color || "#6366f1";
  }

  // Check if current user is admin
  const isAdmin = currentUserEmail === team.admin_email;

  // Show/hide admin member addition form and delete btn
  if (isAdmin) {
    addMemberForm.classList.remove("hidden");
    deleteTeamDetailBtn.classList.remove("hidden");
  } else {
    addMemberForm.classList.add("hidden");
    deleteTeamDetailBtn.classList.add("hidden");
  }

  // Render members list
  teamMembersList.innerHTML = "";
  (team.members || []).forEach(memberEmail => {
    const memberItem = document.createElement("div");
    memberItem.className = "team-member-item";

    const emailSpan = document.createElement("span");
    emailSpan.textContent = memberEmail;
    memberItem.appendChild(emailSpan);

    // Show delete icon for admin (but not for themselves)
    if (isAdmin && memberEmail !== team.admin_email) {
      const deleteBtn = document.createElement("div");
      deleteBtn.className = "delete-icon";
      deleteBtn.innerHTML = deleteIconSVG;
      deleteBtn.onclick = () => removeMember(team.team_id, memberEmail);
      memberItem.appendChild(deleteBtn);
    }

    // Show admin badge
    if (memberEmail === team.admin_email) {
      const adminBadge = document.createElement("span");
      adminBadge.className = "admin-badge";
      adminBadge.textContent = "Admin";
      memberItem.appendChild(adminBadge);
    }

    teamMembersList.appendChild(memberItem);
  });

  switchView(teamDetailsPanel);
}

closeTeamDetails.addEventListener("click", () => {
  teamDetailsPanel.classList.add("hidden");
  if (teamDetailsReturnView === 'actions') {
    showActionsView();
  } else {
    showTeams();
  }
  selectedTeamForDetails = null;
});

function removeMember(teamId, email) {
  if (!confirm(`Remove ${email} from this team?`)) {
    return;
  }

  chrome.runtime.sendMessage({
    type: "REMOVE_TEAM_MEMBER",
    payload: { teamId, email }
  }, (res) => {
    if (res?.success) {
      loadTeamDetails(teamId);
    } else {
      showUpgradeModal("Upgrade to a Team plan to manage collaborative workspaces.");
    }
  });
}

/* ---------- INTERACTIVE TUTORIAL ---------- */

const helpButton = document.getElementById("helpButton");
const tutorialOverlay = document.getElementById("tutorialOverlay");
const tutorialBox = document.getElementById("tutorialBox");
const tutorialArrow = document.getElementById("tutorialArrow");
const tutorialTitle = document.getElementById("tutorialTitle");
const tutorialText = document.getElementById("tutorialText");
const tutorialProgress = document.getElementById("tutorialProgress");
const nextStepBtn = document.getElementById("nextStep");
const prevStepBtn = document.getElementById("prevStep");
const closeTutorialBtn = document.getElementById("closeTutorial");

let currentTutorialStep = 0;
const tutorialSteps = [
  {
    title: "Welcome to CapsuleHub!",
    text: "This tutorial will guide you through the main features. Click Next to begin.",
    target: null,
    view: "action"
  },
  {
    title: "Name Your Capsule",
    text: "Give your AI context a name. We often auto-fill this from your chat title!",
    target: "#capsuleTag",
    view: "action",
    preferredPosition: "below"
  },
  {
    title: "Generate Context",
    text: "Turn the current chat into a 'Capsule'. You can also use the button inside the AI chat!",
    target: "#generate",
    view: "action"
  },
  {
    title: "Your Capsule Library",
    text: "View all your saved capsules here. You can drag and drop them into any AI chat!",
    target: "#viewCapsules",
    view: "action"
  },
  {
    title: "Manage Teams",
    text: "Switch here to manage your team spaces. You can create, delete and manage members.",
    target: "#changeTeamLink",
    view: "action"
  },
  {
    title: "Select Your Team",
    text: "Switch between working privately or in a team here.",
    target: "#teamSelectDropdown",
    view: "action"
  },
  {
    title: "Select or Create Teams",
    text: "Choose a team to work in, or click '+ Create Team' to create your own team.",
    target: "#createTeamFromSelection",
    view: "teams"
  },
];

helpButton.addEventListener("click", () => {
  startTutorial();
});

closeTutorialBtn.addEventListener("click", stopTutorial);

nextStepBtn.addEventListener("click", () => {
  if (currentTutorialStep < tutorialSteps.length - 1) {
    currentTutorialStep++;
    handleStepTransition();
  } else {
    stopTutorial();
  }
});

prevStepBtn.addEventListener("click", () => {
  if (currentTutorialStep > 0) {
    currentTutorialStep--;
    handleStepTransition();
  }
});

function startTutorial() {
  currentTutorialStep = 0;
  document.body.classList.add("tutorial-mode");
  handleStepTransition();
}

async function handleStepTransition() {
  const step = tutorialSteps[currentTutorialStep];

  // Determine if a view switch is needed to set appropriate delay
  let delay = 0;
  let viewSwitchNeeded = false;

  if (step.view === "action") {
    if (actionView.classList.contains("hidden")) {
      showActionsView();
      viewSwitchNeeded = true;
    }
  } else if (step.view === "teams") {
    if (teamView.classList.contains("hidden")) {
      if (currentUserEmail) {
        fetchAndShowTeams(currentUserEmail);
      } else {
        showTeams();
      }
      teamDetailsPanel.classList.add("hidden");
      viewSwitchNeeded = true;
    }
  }

  if (viewSwitchNeeded) {
    // Only hide and delay if we are switching views
    tutorialBox.classList.remove("visible");
    tutorialArrow.classList.remove("visible");
    delay = 150;
    setTimeout(() => {
      tutorialOverlay.classList.remove("hidden");
      showTutorialStep(true);
    }, delay);
  } else {
    // Instant update for same view
    tutorialOverlay.classList.remove("hidden");
    showTutorialStep(false);
  }
}

function stopTutorial() {
  document.body.classList.remove("tutorial-mode");
  // Must clear the inline display style set by startTutorial before adding
  // the hidden class, otherwise the !important inline style overrides it.
  if (tutorialOverlay) {
    tutorialOverlay.style.removeProperty("display");
    tutorialOverlay.classList.add("hidden");
  }
  document.querySelectorAll(".tutorial-target-highlight").forEach(el => {
    el.classList.remove("tutorial-target-highlight");
  });
}

function showTutorialStep(animate = true) {
  const step = tutorialSteps[currentTutorialStep];

  // Apply transition animation only if requested (usually on view switch)
  if (animate) {
    tutorialBox.classList.remove("step-transition");
    void tutorialBox.offsetWidth; // Force reflow
    tutorialBox.classList.add("step-transition");
  } else {
    tutorialBox.classList.remove("step-transition");
  }

  tutorialTitle.textContent = step.title;
  tutorialText.textContent = step.text;
  tutorialProgress.textContent = `${currentTutorialStep + 1} / ${tutorialSteps.length}`;

  prevStepBtn.disabled = currentTutorialStep === 0;
  nextStepBtn.textContent = currentTutorialStep === tutorialSteps.length - 1 ? "Finish" : "Next →";

  // Reset highlight
  document.querySelectorAll(".tutorial-target-highlight").forEach(el => {
    el.classList.remove("tutorial-target-highlight");
  });

  if (step.target) {
    let targetEl = document.querySelector(step.target);

    // Fallback logic for hidden targets (like admin-only elements)
    if ((!targetEl || targetEl.offsetParent === null) && step.fallbackTarget) {
      targetEl = document.querySelector(step.fallbackTarget);
    }

    if (targetEl && targetEl.offsetParent !== null) {
      targetEl.classList.add("tutorial-target-highlight");
      positionTutorialBox(targetEl, step);
      // Reveal UI once position is set
      tutorialBox.classList.add("visible");
      tutorialArrow.classList.add("visible");
    } else {
      centerTutorialBox();
      tutorialBox.classList.add("visible");
    }
  } else {
    centerTutorialBox();
    tutorialBox.classList.add("visible");
  }
}

/* ---------- UPGRADE MODAL ---------- */

/**
 * Maps technical error strings/codes to user-friendly messages.
 * Hides raw technical messages from the UI and logs.
 */
function getFriendlyErrorMessage(raw) {
  if (!raw || typeof raw !== 'string') return "Something went wrong. Please try again later.";
  const msg = raw.toLowerCase();

  // Tier-Related Errors
  if (msg.includes("tier_trial_expired")) return "Your trial has ended. Please upgrade to continue.";
  if (msg.includes("capsule limit reached")) return "You have reached your capsule limit. Upgrade to Elite for unlimited capsules.";
  if (msg.includes("attachments restricted") || msg.includes("does not allow attachments")) return "Your current tier does not allow attachments. Upgrade to Pro or above.";
  if (msg.includes("versioning restricted") || msg.includes("cannot create versions")) return "Versioning is restricted for your current tier. Please upgrade.";
  if (msg.includes("team creation restricted") || msg.includes("only elite and enterprise users can create teams")) return "Only Elite and Enterprise users can create teams. Please upgrade your subscription.";
  if (msg.includes("dynamic context restricted") || msg.includes("dynamic context retrieval is an elite tier feature")) return "Dynamic context retrieval is an Elite tier feature. Please upgrade your subscription.";

  // Common API Errors (Return generic for security and cleanliness)
  if (msg.includes("unauthorized") || msg.includes("authenticated")) return "Authentication required. Please sign in again.";
  if (msg.includes("not found")) return "The requested resource could not be found.";
  if (msg.includes("forbidden") || msg.includes("not a member")) return "Access denied. You don't have permission for this action.";

  // Default for unexpected/technical errors
  return "Something went wrong. Please try again later.";
}

/**
 * Simplified helper to check if an error warrants an upgrade prompt.
 */
function isTierError(raw) {
  if (!raw || typeof raw !== 'string') return false;
  const msg = raw.toLowerCase();
  return msg.includes("tier") ||
    msg.includes("limit") ||
    msg.includes("upgrade") ||
    msg.includes("subscription") ||
    msg.includes("restricted") ||
    msg.includes("allowed");
}

function showInfoModal(message, forceUpgrade = false) {
  const isLimit = isTierError(message) || forceUpgrade;
  const friendlyMsg = isLimit ? getFriendlyErrorMessage(message) : "Something went wrong. Please try again later.";

  const titleEl = document.getElementById("upgradeModalTitle");
  if (titleEl) {
    titleEl.textContent = isLimit ? "Upgrade Required" : "Error";
  }
  if (upgradeModalMessage) {
    upgradeModalMessage.textContent = friendlyMsg;
  }

  // Toggle Upgrade Button visibility
  if (upgradeNowBtn) {
    if (isLimit) {
      upgradeNowBtn.classList.remove("hidden");
    } else {
      upgradeNowBtn.classList.add("hidden");
    }
  }

  if (upgradeModal) {
    upgradeModal.classList.remove("hidden");
  }
}

// Deprecated alias for backward compatibility during refactor
function showUpgradeModal(message, isLimitError = false) {
  showInfoModal(message, isLimitError);
}

if (upgradeNowBtn) {
  upgradeNowBtn.addEventListener("click", () => {
    window.open("https://capsulehub.tilantra.com/billing", "_blank");
    if (upgradeModal) upgradeModal.classList.add("hidden");
  });
}

if (closeUpgradeModal) {
  closeUpgradeModal.addEventListener("click", () => {
    if (upgradeModal) upgradeModal.classList.add("hidden");
  });
}

if (okUpgradeModal) {
  okUpgradeModal.addEventListener("click", () => {
    if (upgradeModal) upgradeModal.classList.add("hidden");
  });
}

if (upgradeModal) {
  upgradeModal.querySelector(".upgrade-modal-backdrop").addEventListener("click", () => {
    upgradeModal.classList.add("hidden");
  });
}

function centerTutorialBox() {
  tutorialBox.style.transform = "translateY(0)";
  tutorialBox.style.marginTop = "0";
  tutorialArrow.classList.remove("visible");
}

function positionTutorialBox(targetEl, step = {}) {
  const rect = targetEl.getBoundingClientRect();
  const boxRect = tutorialBox.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  // Center arrow relative to target, with viewport constraints
  let arrowLeft = rect.left + (rect.width / 2) - 9;
  arrowLeft = Math.max(15, Math.min(viewportWidth - 30, arrowLeft));
  tutorialArrow.style.left = `${arrowLeft}px`;

  // Reset arrow shape classes
  tutorialArrow.classList.remove("tutorial-arrow-up", "tutorial-arrow-down");

  let showBelow = false;
  if (step.preferredPosition === "below") {
    showBelow = true;
  } else if (step.preferredPosition === "above") {
    showBelow = false;
  } else {
    // Default: intelligent choice
    showBelow = rect.bottom + boxRect.height + 40 < viewportHeight;
  }

  let desiredBoxCenterY;
  if (showBelow) {
    // Show box BELOW target (Moving it slightly up towards target)
    desiredBoxCenterY = rect.bottom + 16 + (boxRect.height / 2);
    tutorialArrow.classList.add("tutorial-arrow-up");
    tutorialArrow.style.top = `${rect.bottom + 6}px`;
  } else {
    // Show box ABOVE target (Moving it slightly up away from target)
    desiredBoxCenterY = rect.top - 26 - (boxRect.height / 2);
    tutorialArrow.classList.add("tutorial-arrow-down");
    tutorialArrow.style.top = `${rect.top - 27}px`;
  }

  // Calculate shift from flex center
  let shiftY = desiredBoxCenterY - (viewportHeight / 2);

  // Final bounds protection
  const boxHalfHeight = boxRect.height / 2;
  const currentY = (viewportHeight / 2) + shiftY;
  if (currentY - boxHalfHeight < 10) shiftY = 10 + boxHalfHeight - (viewportHeight / 2);
  if (currentY + boxHalfHeight > viewportHeight - 10) shiftY = viewportHeight - 10 - boxHalfHeight - (viewportHeight / 2);

  tutorialBox.style.transform = `translateY(${shiftY}px)`;
  tutorialBox.style.marginTop = "0";
}
