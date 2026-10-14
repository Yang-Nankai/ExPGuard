// Import steam service functions
importScripts("content/steamService.js");

// Track pending Steam login checks
const pendingLoginChecks = new Map();

// Track tabs that are being checked for login status
const loginCheckTabs = new Set();

// Session storage for cursor data (in-memory storage)
const sessionStorage = new Map();

// Track active age detection sessions
const activeAgeDetections = new Map();

// Track active data query sessions
const activeDataQueries = new Map();

// Track relay ports (content scripts connected via long-lived ports)
const relayPorts = new Set();

// Handle port connections from relay content scripts
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "relayPort") {
    relayPorts.add(port);
    console.log("Relay port connected");
    
    // Handle messages from relay via port
    port.onMessage.addListener((request) => {
      // Extract requestId for response matching
      const requestId = request.requestId;
      const type = request.type;
      
      // Helper to send response back via port
      let responseSent = false;
      const sendPortResponse = (response) => {
        if (!responseSent && requestId) {
          responseSent = true;
          try {
            port.postMessage({
              ...response,
              requestId: requestId,
            });
          } catch (error) {
            console.error("Failed to send port response:", error);
          }
        }
      };
      
      // Route to existing message handlers
      try {
        const result = handleMessage(request, null, sendPortResponse);
        
        // If handleMessage returns false (no async handler) and didn't call sendResponse,
        // send default error response for requests with requestId
        // Note: If result is true, handler will call sendResponse asynchronously
        if (requestId && result === false && !responseSent) {
          // No handler matched - send default error response
          sendPortResponse({ error: "Unknown message type" });
        }
      } catch (error) {
        // Error occurred in handler - send error response
        if (requestId && !responseSent) {
          sendPortResponse({ error: error.message || "Unknown error" });
        }
      }
    });
    
    // Clean up on disconnect
    port.onDisconnect.addListener(() => {
      relayPorts.delete(port);
      console.log("Relay port disconnected");
    });
  }
});

// Helper function to send message to relay ports
function sendToRelayPorts(message) {
  const disconnectedPorts = [];
  
  for (const port of relayPorts) {
    try {
      port.postMessage(message);
    } catch (error) {
      // Port might be disconnected
      disconnectedPorts.push(port);
    }
  }
  
  // Clean up disconnected ports
  for (const port of disconnectedPorts) {
    relayPorts.delete(port);
  }
}

// Unified message handler for both port and sendMessage
async function handleMessage(request, sender, sendResponse) {
  if (request.message === "getVersion") {
    sendResponse({ version: chrome.runtime.getManifest().version });
  }
  if (request.message === "logResponse") {
    fetch("https://api.lootspectrum.com/functions/v1/debug-log", {
      method: "POST",
      body: JSON.stringify({
        debug_name: request.debugName,
        status_code: request.statusCode,
        body: JSON.stringify(request.body),
        timestamp: Date.now(),
        error_text: request.errorText ?? null,
      }),
    }).then((response) => {
      console.log(response);
    });
  }
  if (request.type === "checkPermissions") {
    // Check both tabs and host permissions
    Promise.all([
      chrome.permissions.contains({ permissions: ["tabs"] }),
      chrome.permissions.contains({ origins: ["https://*.steamcommunity.com/*"] }),
    ])
      .then(([hasTabsPermission, hasHostPermission]) => {
        sendResponse({
          hasTabsPermission,
          hasHostPermission,
        });
      })
      .catch((error) => {
        console.error("Failed to check permissions:", error);
        sendResponse({
          hasTabsPermission: false,
          hasHostPermission: false,
          error: error.message || "Unknown error",
        });
      });
    return true; // Indicates we will send a response asynchronously
  }
  if (request.type === "requestPermission") {
    // Handle permission requests
    const permissionType = request.permissionType;
    
    if (permissionType === "tabs") {
      // Request tabs permission
      chrome.permissions.request(
        {
          permissions: ["tabs"],
        },
        (granted) => {
          sendResponse({ granted: granted });
        }
      );
      return true; // Indicates we will send a response asynchronously
    } else if (permissionType === "host") {
      // Request host permission for steamcommunity.com (must match manifest pattern)
      chrome.permissions.request(
        {
          origins: ["https://*.steamcommunity.com/*"],
        },
        (granted) => {
          sendResponse({ granted: granted });
        }
      );
      return true; // Indicates we will send a response asynchronously
    } else {
      sendResponse({ granted: false, error: "Unknown permission type" });
    }
  }
  if (request.type === "checkSteamLogon") {
    // Handle Steam logon check by opening tab
    checkSteamLogon((tabId) => {
      // Mark this tab as being checked
      loginCheckTabs.add(tabId);
      
      // Store the pending check with a timeout
      const requestId = Date.now().toString();
      
      const timeoutId = setTimeout(() => {
        // Overall timeout fallback
        if (pendingLoginChecks.has(requestId)) {
          const { sendResponseFunc } = pendingLoginChecks.get(requestId);
          pendingLoginChecks.delete(requestId);
          loginCheckTabs.delete(tabId);
          
          // Close the tab
          chrome.tabs.remove(tabId).catch(() => {
            // Tab might already be closed
          });
          
          // Send not logged in response
          sendResponseFunc({
            success: true,
            loggedIn: false,
          });
        }
      }, 10000); // Overall timeout fallback
      
      pendingLoginChecks.set(requestId, {
        tabId: tabId,
        sendResponseFunc: sendResponse,
        timeoutId: timeoutId,
        pingTimeoutId: null,
      });
      
      // Wait for tab to load, then send ping
      // Tab update listener will handle sending the ping
    }).catch((error) => {
      sendResponse({
        success: false,
        loggedIn: false,
        error: error.message || "Unknown error occurred",
      });
    });
    return true; // Indicates we will send a response asynchronously
  }
  if (request.type === "steamLoginCheckResponse") {
    // Handle response from content script
    const tabId = sender.tab?.id;
    if (!tabId) {
      console.error("No tab ID in login check response");
      return;
    }
    
    // Find the pending check for this tab
    let requestId = null;
    for (const [id, check] of pendingLoginChecks.entries()) {
      if (check.tabId === tabId) {
        requestId = id;
        break;
      }
    }
    
    if (requestId && pendingLoginChecks.has(requestId)) {
      const { sendResponseFunc, timeoutId, pingTimeoutId } = pendingLoginChecks.get(requestId);
      clearTimeout(timeoutId);
      if (pingTimeoutId) {
        clearTimeout(pingTimeoutId);
      }
      pendingLoginChecks.delete(requestId);
      loginCheckTabs.delete(tabId);
      
      // Don't close tab here - let content script handle it after sending cursor
      // Only close on timeout if not logged in
      
      // Send response to original request
      sendResponseFunc({
        success: true,
        loggedIn: request.loggedIn || false,
        username: request.username || null,
        profilePicture: request.profilePicture || null,
      });
    }
    return true; // Indicates we will send a response asynchronously
  }
  if (request.type === "steamCursorData") {
    // Handle cursor data from content script
    const tabId = sender.tab?.id;
    if (tabId) {
      // Store cursor data with profile URL in session storage
      sessionStorage.set(tabId, {
        cursor: request.cursor,
        profileUrl: request.profileUrl || null,
      });
      console.log("Cursor data stored for tab:", tabId);
      console.log("Cursor data:", request.cursor);
      console.log("Profile URL:", request.profileUrl);
      
      // Close the tab after storing cursor data
      chrome.tabs.remove(tabId).catch(() => {
        // Tab might already be closed
      });
    }
    return true;
  }
  if (request.type === "startAgeDetection") {
    // Handle age detection start request
    const sessionId = request.sessionId || Date.now().toString();
    
    // Get cursor data from session storage (use most recent or provided tabId)
    let sessionData = null;
    if (request.tabId && sessionStorage.has(request.tabId)) {
      sessionData = sessionStorage.get(request.tabId);
    } else if (sessionStorage.size > 0) {
      // Use the most recent cursor data
      const lastTabId = Array.from(sessionStorage.keys())[sessionStorage.size - 1];
      sessionData = sessionStorage.get(lastTabId);
    }
    
    if (!sessionData || !sessionData.cursor) {
      sendResponse({
        success: false,
        error: "Missing cursor data",
      });
      return true;
    }
    
    // Use profile URL from session data or request, fallback to request
    let profileUrl = sessionData.profileUrl || request.profileUrl;
    
    if (!profileUrl) {
      sendResponse({
        success: false,
        error: "Missing profile URL",
      });
      return true;
    }
    
    // Build profile URL with inventory history path if needed
    if (!profileUrl.includes("/inventoryhistory/")) {
      profileUrl = `${profileUrl}/inventoryhistory/`;
    }
    
    // Start time from cursor or current time
    const cursorData = sessionData.cursor;
    const startTime = cursorData.time || Math.floor(Date.now() / 1000);
    
    // Create stop flag
    const stopFlag = { stopped: false };
    
    // Status update callback with timeout detection
    const STATUS_TIMEOUT = 5000; // 5 seconds timeout for frontend response
    let statusTimeoutId = null;
    
    const statusCallback = (year, month) => {
      // Clear previous timeout
      if (statusTimeoutId) {
        clearTimeout(statusTimeoutId);
      }
      
      // Send status update to relay (which forwards to frontend)
      sendToRelayPorts({
        type: "ageDetectionStatus",
        sessionId: sessionId,
        year: year,
        month: month,
      });
      
      // Set timeout to detect if frontend doesn't respond
      statusTimeoutId = setTimeout(() => {
        // Frontend didn't respond - stop detection
        console.log("Age detection stopped: frontend not responding");
        stopFlag.stopped = true;
      }, STATUS_TIMEOUT);
      
      // Update stored timeout ID
      const detection = activeAgeDetections.get(sessionId);
      if (detection) {
        detection.statusTimeoutId = statusTimeoutId;
      }
    };
    
    // Store active detection
    const detectionData = {
      stopFlag: stopFlag,
      statusTimeoutId: null,
    };
    activeAgeDetections.set(sessionId, detectionData);
    
    // Start detection asynchronously
    detectInventoryAge(startTime, profileUrl, stopFlag, statusCallback)
      .then((result) => {
        // Clear timeout
        const detection = activeAgeDetections.get(sessionId);
        if (detection && detection.statusTimeoutId) {
          clearTimeout(detection.statusTimeoutId);
        }
        
        activeAgeDetections.delete(sessionId);
        
        if (result.stopped) {
          sendToRelayPorts({
            type: "ageDetectionStopped",
            sessionId: sessionId,
          });
        } else {
          // Save inventory age
          chrome.storage.local.set({
            inventoryAge: {
              profileUrl: profileUrl,
              timestamp: result.timestamp,
            },
          });
          
          sendToRelayPorts({
            type: "ageDetectionComplete",
            sessionId: sessionId,
            timestamp: result.timestamp,
          });
        }
      })
      .catch((error) => {
        activeAgeDetections.delete(sessionId);
        sendToRelayPorts({
          type: "ageDetectionError",
          sessionId: sessionId,
          error: error.message,
        });
      });
    
    sendResponse({
      success: true,
      sessionId: sessionId,
    });
    return true;
  }
  if (request.type === "stopAgeDetection") {
    // Handle age detection stop request
    const sessionId = request.sessionId;
    
    if (sessionId && activeAgeDetections.has(sessionId)) {
      const detection = activeAgeDetections.get(sessionId);
      detection.stopFlag.stopped = true;
      
      if (detection.statusTimeoutId) {
        clearTimeout(detection.statusTimeoutId);
      }
      
      sendResponse({
        success: true,
        sessionId: sessionId,
      });
    } else {
      sendResponse({
        success: false,
        error: "Age detection session not found",
      });
    }
    return true;
  }
  if (request.type === "ageDetectionStatusResponse") {
    // Handle response from frontend acknowledging status update
    const sessionId = request.sessionId;
    
    if (sessionId && activeAgeDetections.has(sessionId)) {
      const detection = activeAgeDetections.get(sessionId);
      
      // Clear timeout - frontend is responding
      if (detection.statusTimeoutId) {
        clearTimeout(detection.statusTimeoutId);
        detection.statusTimeoutId = null;
      }
    }
    return true;
  }
  if (request.type === "startDataQuery") {
    // Handle data query start request
    const sessionId = request.sessionId || Date.now().toString();
    
    // Get cursor data from session storage (use most recent or provided tabId)
    let sessionData = null;
    if (request.tabId && sessionStorage.has(request.tabId)) {
      sessionData = sessionStorage.get(request.tabId);
    } else if (sessionStorage.size > 0) {
      const lastTabId = Array.from(sessionStorage.keys())[sessionStorage.size - 1];
      sessionData = sessionStorage.get(lastTabId);
    }
    
    if (!sessionData || !sessionData.cursor) {
      sendResponse({
        success: false,
        error: "Missing cursor data",
      });
      return true;
    }
    
    let profileUrl = sessionData.profileUrl || request.profileUrl;
    if (!profileUrl) {
      sendResponse({
        success: false,
        error: "Missing profile URL",
      });
      return true;
    }
    
    if (!profileUrl.includes("/inventoryhistory/")) {
      profileUrl = `${profileUrl}/inventoryhistory/`;
    }
    
    // Determine start time: use provided startTimestamp or current time
    const startTime = request.startTimestamp !== undefined && request.startTimestamp !== null
      ? request.startTimestamp
      : Math.floor(Date.now() / 1000);
    
    // Determine end time: use provided endTimestamp or load from inventory age storage
    const determineEndTime = (callback) => {
      if (request.endTimestamp !== undefined && request.endTimestamp !== null) {
        // Use provided endTimestamp (explicit - hard-cut mode)
        callback(request.endTimestamp, true);
      } else {
        // Load inventory age from storage (soft stop - only when no cursor AND beyond age)
        chrome.storage.local.get(['inventoryAge'], (result) => {
          let endTime = null;
          if (result.inventoryAge && result.inventoryAge.timestamp) {
            endTime = result.inventoryAge.timestamp;
          }
          callback(endTime, false);
        });
      }
    };
    
    // Create stop flag
    const stopFlag = { stopped: false };
    
    // Status update callback with timeout detection
    const STATUS_TIMEOUT = 5000; // 5 seconds timeout for frontend response
    let statusTimeoutId = null;
    
    const eventCallback = (events, status) => {
      // Clear previous timeout
      if (statusTimeoutId) {
        clearTimeout(statusTimeoutId);
      }
      
      // Track oldest event timestamp
      if (events && events.length > 0) {
        // Events are sorted by age automatically, so check the last event
        const lastEvent = events[events.length - 1];
        
        if (lastEvent && lastEvent.date) {
          chrome.storage.local.get(['oldestItemTimestamp'], (result) => {
            // Convert date to timestamp if it's a Date object, otherwise use as-is
            const eventTimestamp = lastEvent.date instanceof Date 
              ? lastEvent.date.getTime() 
              : typeof lastEvent.date === 'number' 
                ? lastEvent.date 
                : null;
            
            if (eventTimestamp !== null) {
              const oldestTimestamp = result.oldestItemTimestamp || null;
              
              // Update if no stored timestamp or if this event is older
              if (oldestTimestamp === null || eventTimestamp < oldestTimestamp) {
                chrome.storage.local.set({ oldestItemTimestamp: eventTimestamp });
              }
            }
          });
        }
      }
      
      // Send events and status to relay (which forwards to frontend)
      sendToRelayPorts({
        type: "dataQueryEvents",
        sessionId: sessionId,
        events: events,
        status: status || "green",
      });
      
      // Set timeout to detect if frontend doesn't respond
      statusTimeoutId = setTimeout(() => {
        console.log("Data query stopped: frontend not responding");
        stopFlag.stopped = true;
      }, STATUS_TIMEOUT);
      
      // Update stored timeout ID
      const query = activeDataQueries.get(sessionId);
      if (query) {
        query.statusTimeoutId = statusTimeoutId;
      }
    };
    
    // Store active query
    const queryData = {
      stopFlag: stopFlag,
      statusTimeoutId: null,
    };
    activeDataQueries.set(sessionId, queryData);
    
    // Determine end time and start query asynchronously
    determineEndTime((endTime, isExplicitEndTimestamp) => {
      queryInventoryEvents(startTime, profileUrl, stopFlag, eventCallback, endTime, isExplicitEndTimestamp)
        .then((result) => {
          // Clear timeout
          const query = activeDataQueries.get(sessionId);
          if (query && query.statusTimeoutId) {
            clearTimeout(query.statusTimeoutId);
          }
          
          activeDataQueries.delete(sessionId);
          
          if (result.stopped) {
            sendToRelayPorts({
              type: "dataQueryStopped",
              sessionId: sessionId,
            });
          } else {
            sendToRelayPorts({
              type: "dataQueryComplete",
              sessionId: sessionId,
            });
          }
        })
        .catch((error) => {
          activeDataQueries.delete(sessionId);
          sendToRelayPorts({
            type: "dataQueryError",
            sessionId: sessionId,
            error: error.message,
          });
        });
    });
    
    sendResponse({
      success: true,
      sessionId: sessionId,
    });
    return true;
  }
  if (request.type === "stopDataQuery") {
    // Handle data query stop request
    const sessionId = request.sessionId;
    
    if (sessionId && activeDataQueries.has(sessionId)) {
      const query = activeDataQueries.get(sessionId);
      query.stopFlag.stopped = true;
      
      if (query.statusTimeoutId) {
        clearTimeout(query.statusTimeoutId);
      }
      
      sendResponse({
        success: true,
        sessionId: sessionId,
      });
    } else {
      // Session not found - likely already stopped (e.g., due to timeout auto-stop)
      // Return success since the query is effectively stopped or never existed
      sendResponse({
        success: true,
        sessionId: sessionId,
        alreadyStopped: true,
      });
    }
    return true;
  }
  if (request.type === "dataQueryStatusResponse") {
    // Handle response from frontend acknowledging event receipt (alive ping)
    const sessionId = request.sessionId;
    
    if (sessionId && activeDataQueries.has(sessionId)) {
      const query = activeDataQueries.get(sessionId);
      
      // Clear timeout - frontend is responding
      if (query.statusTimeoutId) {
        clearTimeout(query.statusTimeoutId);
        query.statusTimeoutId = null;
      }
    }
    return true;
  }
  if (request.type === "heartbeat/ping") {
    // Handle heartbeat ping from relay - respond with pong to keep port alive
    const sessionId = request.sessionId;
    
    // Verify session exists (optional - still respond even if it doesn't)
    if (sessionId && activeDataQueries.has(sessionId)) {
      // Session is active - port is alive
    }
    
    // Always respond with pong to acknowledge heartbeat
    sendResponse({
      type: "heartbeat/pong",
      sessionId: sessionId,
    });
    return false; // Synchronous response, no async
  }
  if (request.type === "fetchLatestEventsPage") {
    // Handle fetch latest events page request
    // Get cursor data from session storage (use most recent)
    let sessionData = null;
    if (sessionStorage.size > 0) {
      const lastTabId = Array.from(sessionStorage.keys())[sessionStorage.size - 1];
      sessionData = sessionStorage.get(lastTabId);
    }
    
    let profileUrl = sessionData?.profileUrl || request.profileUrl;
    if (!profileUrl) {
      sendResponse({
        success: false,
        error: "Missing profile URL",
      });
      return true;
    }
    
    if (!profileUrl.includes("/inventoryhistory/")) {
      profileUrl = `${profileUrl}/inventoryhistory/`;
    }
    
    // Create stop flag (not used for single page fetch, but required by function)
    const stopFlag = { stopped: false };
    
    // Fetch latest events page (current time, no cursor)
    const currentTime = Math.floor(Date.now() / 1000);
    
    try {
      const result = await fetchLatestEventsPage(profileUrl, stopFlag);
      
      if (result.success && result.events) {
        sendResponse({
          success: true,
          events: result.events,
        });
      } else {
        sendResponse({
          success: false,
          error: result.error || "Failed to fetch events",
        });
      }
    } catch (error) {
      sendResponse({
        success: false,
        error: error.message || "Unknown error",
      });
    }
    
    return true; // Indicates we will send a response asynchronously
  }
  
  // Return false if no handler matched (for sendMessage compatibility)
  return false;
}

// Keep compatibility with chrome.runtime.onMessage for other scripts (e.g., steamService)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const result = handleMessage(request, sender, sendResponse);
  
  // If handleMessage returns true, it means we're handling async response
  // If it returns false, we need to return false for chrome.runtime.onMessage
  return result === true;
});

// Listen for tab updates to detect when the Steam page finishes loading
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only process tabs that are being checked for login
  if (!loginCheckTabs.has(tabId)) {
    return;
  }
  
  // Wait for the tab to complete loading
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('steamcommunity.com')) {
    // Find the pending check for this tab
    let requestId = null;
    for (const [id, check] of pendingLoginChecks.entries()) {
      if (check.tabId === tabId) {
        requestId = id;
        break;
      }
    }
    
    if (requestId && pendingLoginChecks.has(requestId)) {
      const check = pendingLoginChecks.get(requestId);
      
      // Only send ping if we haven't already sent it
      if (check.pingTimeoutId !== null && check.pingTimeoutId !== undefined) {
        return; // Already sent ping, skip
      }
      
      // Send status ping to content script
      chrome.tabs.sendMessage(tabId, {
        type: 'steamLoginCheckPing'
      }).catch((error) => {
        // Content script might not be ready or tab might have navigated away
        console.error('Failed to send ping to content script:', error);
        
        // If ping fails, treat as not logged in
        if (pendingLoginChecks.has(requestId)) {
          const { sendResponseFunc, timeoutId } = pendingLoginChecks.get(requestId);
          clearTimeout(timeoutId);
          pendingLoginChecks.delete(requestId);
          loginCheckTabs.delete(tabId);
          
          // Close the tab
          chrome.tabs.remove(tabId).catch(() => {
            // Tab might already be closed
          });
          
          // Send not logged in response
          sendResponseFunc({
            success: true,
            loggedIn: false,
          });
        }
      });
      
      // Set timeout for response (2 seconds)
      const pingTimeoutId = setTimeout(() => {
        // No response within 2 seconds - assume not logged in
        if (pendingLoginChecks.has(requestId)) {
          const { sendResponseFunc, timeoutId } = pendingLoginChecks.get(requestId);
          clearTimeout(timeoutId);
          pendingLoginChecks.delete(requestId);
          loginCheckTabs.delete(tabId);
          
          // Close the tab
          chrome.tabs.remove(tabId).catch(() => {
            // Tab might already be closed
          });
          
          // Send not logged in response
          sendResponseFunc({
            success: true,
            loggedIn: false,
          });
        }
      }, 2000);
      
      // Update the pending check with ping timeout
      check.pingTimeoutId = pingTimeoutId;
      pendingLoginChecks.set(requestId, check);
      
      // Make tab inactive
      chrome.tabs.update(tabId, { active: false }).catch(() => {
        // Tab might already be closed
      });
    }
  }
});
