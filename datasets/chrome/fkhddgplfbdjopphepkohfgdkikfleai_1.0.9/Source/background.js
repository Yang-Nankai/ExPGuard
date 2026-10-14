import backendMap from './backendMap.js';

const PARENT_GUARD_ID = 'bambuser-parent-guard';

let workQueue = [];
let workItem;
let enabledTabs;
let nextRuleId;
let agentToolPorts = {};

async function bootstrap() {
  enabledTabs = {};
  nextRuleId = 1;
  const sessionRules = await chrome.declarativeNetRequest.getSessionRules();
  if (sessionRules.length > 0) {
    // Current session rules exists which means we have activated the extension in this browser session. Try to restore
    // the current values due to Service Worker lifetime 5min restart.
    const storage = await chrome.storage.local.get({
      enabledTabs,
      nextRuleId,
    });
    enabledTabs = storage.enabledTabs;
    nextRuleId = storage.nextRuleId;
  } else {
    // When not having any current session rules, it's a new browser session and any previously stored values should be
    // reset to initial values.
    await chrome.storage.local.set({
      enabledTabs,
      nextRuleId,
    });
  }
  await syncParentGuardRegistration();
}

function isValidHostname(o) {
  if (typeof o !== 'string' || o.length > 253) return false;
  const labels = o.split('.');
  if (labels.length < 2) return false;
  if (!/^[a-z]{2,}$/i.test(labels[labels.length - 1])) return false; // alphabetic TLD
  return labels.every(l => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(l));
}

function activeOriginMatchPatterns() {
  const origins = new Set(
    Object.values(enabledTabs).flatMap(t => (t.surfBehind ? t.surfBehind.origins : []))
  );
  const patterns = [];
  for (const o of origins) {
    if (isValidHostname(o)) {
      patterns.push(`https://${o}/*`, `https://*.${o}/*`);
    } else {
      console.warn('Skipping invalid origin for parent guard:', o);
    }
  }
  return patterns;
}

async function syncParentGuardRegistration() {
  try {
    const matches = activeOriginMatchPatterns();
    const existing = await chrome.scripting
      .getRegisteredContentScripts({ ids: [PARENT_GUARD_ID] }).catch(() => []);
    if (matches.length === 0) {
      if (existing.length) await chrome.scripting.unregisterContentScripts({ ids: [PARENT_GUARD_ID] });
      return;
    }
    const def = {
      id: PARENT_GUARD_ID,
      js: ['parent-guard.js'],
      matches,
      allFrames: true,            // the merchant page is a sub_frame
      runAt: 'document_start',    // beats every page script
      world: 'MAIN',              // isolated world can't touch the page's `parent`
      persistAcrossSessions: false,
    };
    try {
      await chrome.scripting.registerContentScripts([def]);
    } catch {
      await chrome.scripting.updateContentScripts([def]);
    }
  } catch (e) {
    console.warn('Failed to sync parent guard registration', e && e.message);
  }
}

function queueWork(fn) {
  if (typeof fn !== 'function') throw new Error('Expecting to queue a work function');
  workQueue.push(fn);
  doWork();
}

async function doWork() {
  if (!workItem && workQueue.length > 0) {
    workItem = workQueue.shift();
    try {
      await workItem();
    } catch (e) {
      console.error('Work error', e.message);
    }
    workItem = null;
    doWork();
  }
}

async function removeTab(tabId) {
  if (!enabledTabs[tabId]) return;
  const { whitelistRuleIds = [] } = enabledTabs[tabId].surfBehind || {};
  console.log('Clearing session rules for tab', tabId, whitelistRuleIds);
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: whitelistRuleIds,
  });
  delete enabledTabs[tabId];
  if (Object.keys(enabledTabs).length === 0) nextRuleId = 1;

  await chrome.storage.local.set({
    enabledTabs,
    nextRuleId,
  });

  if (agentToolPorts[tabId]) {
    agentToolPorts[tabId].disconnect();
    delete agentToolPorts[tabId];
  }
  await syncParentGuardRegistration();
}

async function enableTab(tabId, agentToolUrl) {
  if (enabledTabs[tabId] && enabledTabs[tabId].agentToolUrl === agentToolUrl) return;

  enabledTabs[tabId] = enabledTabs[tabId] || {
    surfBehind: null,
  };
  enabledTabs[tabId].agentToolUrl = agentToolUrl;

  await chrome.storage.local.set({
    enabledTabs,
  });

  console.log('Actiavted tab', tabId);
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

async function enableSurfBehind(tabId, originRules, defaultOrigin, consentCookies, forceUpdate) {
  const enabledTab = enabledTabs[tabId];
  const defaultOriginRules = !!defaultOrigin ? [{ origin: defaultOrigin }] : [];
  const rules = Array.isArray(originRules) && originRules.length > 0 ? originRules : defaultOriginRules;
  const origins = rules.map(rule => rule.origin);
  consentCookies = consentCookies || [];
  if (!enabledTab) throw new Error('Tab not enabled');
  if (!forceUpdate && enabledTab.surfBehind && arraysEqual(enabledTab.surfBehind.origins, origins) && arraysEqual(enabledTab.surfBehind.consentCookies, consentCookies)) return;
  console.log('Enabling surf behind for tab', tabId);
 
  const addRules = rules.map(rule => { 
    const cspHeader = { "header": "content-security-policy", "operation": "remove" };
    if (!!rule.contentSecurityPolicy) {
      cspHeader.operation = 'set';
      cspHeader.value = rule.contentSecurityPolicy;
    }

    const dnrRules = [{
      "id": nextRuleId++,
      "priority": 1,
      "action": {
        "type": "modifyHeaders",
        "responseHeaders": [
          { "header": "x-frame-options", "operation": "remove" },
          cspHeader
        ]
      },
      "condition" : {
        "tabIds": [tabId],
        "urlFilter" : "||" + rule.origin,
        "resourceTypes" : ["sub_frame"]
      } 
    }];

    if (rule.wasBlockedByResource) {
      // When merchant page has implemented a service worker to serve/cache content through we need to be able to intercept these requests before they are cached.
      // Becouse of a bug in Chrome the reported tabId is always -1 with resurceType xmlhttprequest, so therefore we add a similar rule as above but with those changes.
      dnrRules.push({
        "id": nextRuleId++,
        "priority": 1,
        "action": {
          "type": "modifyHeaders",
          "responseHeaders": [
            { "header": "x-frame-options", "operation": "remove" },
            cspHeader
          ]
        },
        "condition" : {
          "tabIds": [-1],
          "urlFilter" : "||" + rule.origin,
          "resourceTypes" : ["xmlhttprequest"]
        }
      });
    }

    return dnrRules;
  }).flat();
  addRules.push({
    'id': nextRuleId++,
    'priority': 1,
    'action': {
      'type': 'redirect',
      'redirect': {
        regexSubstitution: '\\1',
      }
    },
    'condition': {
      regexFilter: "^https://one-to-one\\.bambuser\\.com/activate-surf-behind\\?url=(.+)$",
    }
  });
  console.log('Adding session rules for tab', tabId, enabledTabs[tabId]);
  const removeRuleIds = enabledTab.surfBehind ? enabledTab.surfBehind.whitelistRuleIds : [];
  enabledTabs[tabId].surfBehind = {
    whitelistRuleIds: addRules.map(r => r.id),
    defaultOrigin,
    origins,
    originRules: rules,
    frameId: null, // Will be determined upon frame navigation together with defined origins
    consentCookies,
  };
  await chrome.declarativeNetRequest.updateSessionRules({ 
    addRules,
    removeRuleIds,
  });
  await chrome.storage.local.set({
    enabledTabs,
    nextRuleId,
  });
  await syncParentGuardRegistration();
}

async function handleCommand(command, params, sender, sendResponse) {
  if (command === 'activateMerchant') {
    const { orgId, idToken, defaultOrigin } = params;
    if (!orgId || !idToken) {
      sendResponse({ success: false, error: 'Bad params' });
      return;
    }
    const backend = backendMap[sender.origin];
    if (!backend) {
      sendResponse({ success: false, error: 'Unknown origin' });
      return;
    }

    try {
      const response = await fetch(`${backend}/o/${orgId}/settings/calls/agent/surf-behind`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      const body = await response.json();
      if (body.type === 'native-frame') {
        queueWork(async () => {
          try {
            await enableSurfBehind(sender.tab.id, body.originRules, defaultOrigin, body.consentCookies);
            const enabledTab = enabledTabs[sender.tab.id];
            let currentUrl = null;
            if (enabledTab.surfBehind.frameId) {
              try {
                const surfFrame = await chrome.webNavigation.getFrame({ tabId: sender.tab.id, frameId: enabledTab.surfBehind.frameId })
                currentUrl = surfFrame.url;
              } catch (e) {
                enabledTab.surfBehind.frameId = null;
                await chrome.storage.local.set({
                  enabledTabs,
                });
              }
            }
            sendResponse({ success: true, currentUrl });
          } catch (e) {
            sendResponse({ success: false, error: e.message });
          }
        });
      } else {
        sendResponse({ success: false, error: 'Native frame surf behind not enabled for organization!' });
      }
    } catch (e) {
      sendResponse({ success: false, error: e.message });
    }
  } else if (command === 'fetchMerchantHTML') {
    const { url } = params;
    if (!url) {
      sendResponse({ success: false, error: 'Bad params' });
      return;
    }
    const enabledTab = enabledTabs[sender.tab.id];
    if (!enabledTab || !enabledTab.surfBehind) {
      sendResponse({ success: false, error: 'Not enabled' });
      return;
    }
    if (!isEnabledOrigin(url, enabledTab.surfBehind.origins)) {
      sendResponse({ success: false, error: 'Not a whitelisted domain' });
      return;
    }
    try {
      const response = await fetch(url);
      const html = await response.text();
      sendResponse({ success: true, html });
    } catch (e) {
      sendResponse({ success: false, error: e.message });
    }
  } else {
    sendResponse({ success: false, error: 'Unknown command: ' + command });
  }
}

async function notifyCurrentUrl(tabId, frameId, url) {
  const enabledTab = enabledTabs[tabId];
  const { surfBehind } = enabledTab;
  const postMessage = async () => {
    enabledTab.surfBehind.url = url;
    if (agentToolPorts[tabId]) {
      agentToolPorts[tabId].postMessage({
        eventName: 'navigated-to',
        data: {
          url,
          allowedOrigin: isEnabledOrigin(url, surfBehind.origins),
        },
      });
    }
    await chrome.storage.local.set({
      enabledTabs,
    });
  }

  surfBehind.frameId = surfBehind.frameId || frameId; // This is needed for backwards compabilty but should be removed in favor for the use of our activation url
  if (surfBehind.frameId !== frameId || surfBehind.url === url) return;
  await postMessage();
}

function isEnabledOrigin(sourceUrl, origins) {
  const url = new URL(sourceUrl);
  if (origins.includes(url.host)) return true;
  const parts = url.host.split('.');
  while (parts.length > 1) {
    parts.shift();
    if (origins.includes(parts.join('.'))) return true;
  }
  return false;
}

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
  // Handle commands sent from agent tool on Bambuser dashboard
  queueWork(() => handleCommand(request.command, request.params || {}, sender, sendResponse));
  return true; // Required for async sendResponse
});

chrome.runtime.onConnectExternal.addListener(function(port) {
  agentToolPorts[port.sender.tab.id] = port;
  queueWork(() => enableTab(port.sender.tab.id, port.sender.origin));
  port.onDisconnect.addListener(function(port) {
    queueWork(() => removeTab(port.sender.tab.id));
  });
});

// Clear session rules when whitelisted tab navigates away from our dashboard
chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
  let { url } = details;
  const { tabId, frameId } = details;
  const enabledTab = enabledTabs[tabId];
  if (!enabledTab) return;
  else if (frameId === 0) {
    queueWork(() => removeTab(tabId));
  } else if (enabledTab.surfBehind) {
    if (url.startsWith('https://one-to-one.bambuser.com/activate-surf-behind')) {
      url = new URL(url).searchParams.get('url');
      if (enabledTab.surfBehind.frameId !== frameId) {
        enabledTab.surfBehind.frameId = frameId;
        queueWork(() => chrome.storage.local.set({
          enabledTabs,
        }));
      }
      if (!url) return;
    }
    queueWork(() => notifyCurrentUrl(tabId, frameId, url));
  }
});

chrome.webNavigation.onCommitted.addListener(function(details) {
  const enabledTab = enabledTabs[details.tabId];
  if (!enabledTab || details.url === 'about:blank') return;
  if (enabledTab.surfBehind && enabledTab.surfBehind.frameId === details.frameId) {
    queueWork(() => {
      chrome.scripting.executeScript({
        target: { tabId: details.tabId, frameIds: [details.frameId] },
        world: 'MAIN',
        args: [enabledTab.surfBehind.consentCookies],
        func: (consentCookies) => {
          console.info('INJECTING BAMBUSER AGENT TOOL SCRIPTS');
          window.isBambuserAgentTool = 'Web/1.0';
          if (!consentCookies || !consentCookies.length) return;
          const cookiePropDesc = Object.getOwnPropertyDescriptor(Document.prototype, "cookie");
          cookiePropDesc.set = cookiePropDesc.set.bind(document),
          cookiePropDesc.get = cookiePropDesc.get.bind(document);
          Object.defineProperty(document, "cookie", {
            get: function() {
                return cookiePropDesc.get()
            },
            set: function(e) {
              const cookieName = e.split('=', 1)[0];
              if (!consentCookies.includes(cookieName)) {
                cookiePropDesc.set(e);
                return;
              }
              const parts = e.split(';').map(s => s.trim());
              const modifiedParts = [];
              let hasSecureProp = false;
              let hasSameSite = false;
              for (const part of parts) {
                if (part.startsWith("SameSite=")) {
                  modifiedParts.push("SameSite=None"); // Transform this cookie to a cross domain cookie
                  hasSameSite = true;
                } else if (part.startsWith("expires=")) {
                  continue; // Make this a session cookie
                } else {
                  if (part === 'secure') {
                    hasSecureProp = true;
                  }
                  modifiedParts.push(part);
                }
              }
              if (!hasSameSite) {
                modifiedParts.push("SameSite=None"); // Ensure this cookie is a cross domain cookie
              }
              if (!hasSecureProp) {
                modifiedParts.push('secure'); // SameSite=None requires a secure context
              }
              const modifiedCookie = modifiedParts.join('; ');
              console.info('BAMBUSER AGENT TOOL SCRIPT ADAPTED COOKIE', cookieName);
              cookiePropDesc.set(modifiedCookie)
            },
            configurable: true
          });
        }
      });
    });
  }
});

chrome.webNavigation.onErrorOccurred.addListener(function(details) {
  const enabledTab = enabledTabs[details.tabId];
  if (!enabledTab) return;
  if (details.error === "net::ERR_BLOCKED_BY_RESPONSE") {
    queueWork(async () => {
      const url = new URL(details.url)
      console.log(`Origin ${url.origin} was blocked by resource. Trying unregister origin service workers and retrying...`);
      chrome.browsingData.remove({ "origins": [url.origin] }, { "serviceWorkers": true });
      const matchingRules = enabledTab.surfBehind.originRules.filter(r => isEnabledOrigin(details.url, [r.origin]));
      console.log(`Found ${matchingRules.length} rules for origin ${url.origin} that hasn't enabled workaround!`);
      const retry = (matchingRules.length > 0);
      if (retry) {
        for (const rule of matchingRules) {
          let loadedHeader;
          if (typeof rule.contentSecurityPolicy !== 'undefined') {
            console.log(`Using explicit defined CSP header: ${rule.contentSecurityPolicy}`)
          } else {
            try {
              // No explicit CSP header has been configured, try load from actual url instead
              const response = await fetch(details.url, {
                method: 'HEAD'
              });
              loadedHeader = response.headers['content-security-policy'];
            } catch (e) {
              console.warn(`Unable to determine CSP header for ${details.url}`);
            }
          }
          let cspHeader = rule.contentSecurityPolicy || loadedHeader;
          if (!cspHeader) {
            // No CSP header was resolved, construct one that will work for us and also hopefully later when agent
            // browse site in other tab and cached responses are returned from service worker. If this becomes a problem
            // one option to solve it could be to clear the service worker data when call is ended.
            cspHeader = `frame-ancestors 'self' ${enabledTab.agentToolUrl}`;
          } else {
            // Modify existing header to include agent tool origin in "frame-ancestors" CSP rule which will allow the
            // site to also be framed inside current agent tool origin url
            const cspHeaderParts = cspHeader.split(';');
            const frameAncestorsIndex = cspHeaderParts.findIndex(p => p.startsWith('frame-ancestors '));
            if (frameAncestorsIndex >= 0) {
              cspHeaderParts[frameAncestorsIndex] = `${cspHeaderParts[frameAncestorsIndex]} ${enabledTab.agentToolUrl}`;
            } else {
              cspHeaderParts.push(`frame-ancestors 'self' ${enabledTab.agentToolUrl}`);
            }
            cspHeader = cspHeaderParts.join('; ');
          }
          console.log(`Modified CSP header for service worker cache workaround: ${cspHeader}`);
          rule.contentSecurityPolicy = cspHeader;
          rule.wasBlockedByResource = true;
        }
        console.log('Activting service worker DNR workaround...');
        await enableSurfBehind(details.tabId, enabledTab.surfBehind.originRules, enabledTab.surfBehind.defaultOrigin, enabledTab.surfBehind.consentCookies, true);
      }
      if (agentToolPorts[details.tabId]) {
        console.log(`Notifying agent tool that request was blocked. ${retry ? 'Should retry request!' : ''}`);
        agentToolPorts[details.tabId].postMessage({
          eventName: 'navigation-was-blocked',
          url: details.url,
          retry,
        });
      }
    });
  }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  const enabledTab = enabledTabs[details.tabId];
  if (enabledTab && enabledTab.surfBehind) {
    queueWork(() => notifyCurrentUrl(details.tabId, details.frameId, details.url));
  }
});

queueWork(bootstrap);
