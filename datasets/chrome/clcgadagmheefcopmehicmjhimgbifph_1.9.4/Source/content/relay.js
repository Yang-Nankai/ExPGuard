/**
 * Relay Content Script
 *
 * Pure relay that forwards messages between the web page and background script.
 * Handles bidirectional communication transparently.
 */

// Establish long-lived port connection to background script
let port = chrome.runtime.connect({ name: "relayPort" });

// Track pending requests for async responses
const pendingRequests = new Map();
let requestIdCounter = 0;

// Track active data query heartbeat intervals
const dataQueryHeartbeats = new Map();

// Heartbeat interval duration (send ping every 5 seconds during data queries)
const HEARTBEAT_INTERVAL_MS = 5000;

// Track if we're currently reconnecting
let isReconnecting = false;

// Function to reconnect the port
function reconnectPort() {
  if (isReconnecting) {
    return; // Already reconnecting
  }
  
  isReconnecting = true;
  console.log("Reconnecting port...");
  
  try {
    // Create new port connection
    port = chrome.runtime.connect({ name: "relayPort" });
    
    // Set up message listener again
    port.onMessage.addListener(handlePortMessage);
    
    // Set up disconnect listener again
    port.onDisconnect.addListener(handlePortDisconnect);
    
    console.log("Port reconnected successfully");
    isReconnecting = false;
  } catch (error) {
    console.error("Failed to reconnect port:", error);
    isReconnecting = false;
    // Retry after a short delay
    setTimeout(() => {
      if (!port || !port.onMessage) {
        reconnectPort();
      }
    }, 1000);
  }
}

// Handle port disconnection
function handlePortDisconnect() {
  console.error("Port disconnected, clearing pending requests");
  // Reject all pending requests
  for (const [requestId, { reject }] of pendingRequests.entries()) {
    reject(new Error("Port disconnected"));
  }
  pendingRequests.clear();
  
  // Clear all heartbeat intervals
  for (const [sessionId, intervalId] of dataQueryHeartbeats.entries()) {
    clearInterval(intervalId);
  }
  dataQueryHeartbeats.clear();
  
  // Reconnect automatically
  reconnectPort();
}

// Handle messages from background via port
function handlePortMessage(response) {
  // Handle response messages with requestId
  if (response.requestId && pendingRequests.has(response.requestId)) {
    const { resolve, reject } = pendingRequests.get(response.requestId);
    pendingRequests.delete(response.requestId);
    
    if (response.error) {
      reject(new Error(response.error));
    } else {
      resolve(response);
    }
    return;
  }
  
  // Handle heartbeat response (pong)
  if (response.type === "heartbeat/pong") {
    // Heartbeat acknowledged - no action needed, just keeps port alive
    return;
  }
  
  // Handle push messages from background (ageDetectionStatus, etc.)
  if (response.type === "ageDetectionStatus") {
    window.postMessage(
      {
        type: "relay/ageDetectionStatus",
        sessionId: response.sessionId,
        year: response.year,
        month: response.month,
      },
      window.location.origin
    );
    return;
  }
  
  if (response.type === "ageDetectionComplete") {
    window.postMessage(
      {
        type: "relay/ageDetectionComplete",
        sessionId: response.sessionId,
        timestamp: response.timestamp,
      },
      window.location.origin
    );
    return;
  }
  
  if (response.type === "ageDetectionStopped") {
    window.postMessage(
      {
        type: "relay/ageDetectionStopped",
        sessionId: response.sessionId,
      },
      window.location.origin
    );
    return;
  }
  
  if (response.type === "ageDetectionError") {
    window.postMessage(
      {
        type: "relay/ageDetectionError",
        sessionId: response.sessionId,
        error: response.error,
      },
      window.location.origin
    );
    return;
  }
  
  if (response.type === "dataQueryEvents") {
    window.postMessage(
      {
        type: "relay/dataQueryEvents",
        sessionId: response.sessionId,
        events: response.events,
        status: response.status || "green",
      },
      window.location.origin
    );
    return;
  }
  
  if (response.type === "dataQueryComplete") {
    // Stop heartbeat for this session
    stopDataQueryHeartbeat(response.sessionId);
    
    window.postMessage(
      {
        type: "relay/dataQueryComplete",
        sessionId: response.sessionId,
      },
      window.location.origin
    );
    return;
  }
  
  if (response.type === "dataQueryStopped") {
    // Stop heartbeat for this session
    stopDataQueryHeartbeat(response.sessionId);
    
    window.postMessage(
      {
        type: "relay/dataQueryStopped",
        sessionId: response.sessionId,
      },
      window.location.origin
    );
    return;
  }
  
  if (response.type === "dataQueryError") {
    // Stop heartbeat for this session
    stopDataQueryHeartbeat(response.sessionId);
    
    window.postMessage(
      {
        type: "relay/dataQueryError",
        sessionId: response.sessionId,
        error: response.error,
      },
      window.location.origin
    );
    return;
  }
}

// Set up initial message and disconnect listeners
port.onMessage.addListener(handlePortMessage);
port.onDisconnect.addListener(handlePortDisconnect);

// Start heartbeat for a data query session
function startDataQueryHeartbeat(sessionId) {
  // Stop any existing heartbeat for this session
  stopDataQueryHeartbeat(sessionId);
  
  // Send initial ping immediately
  sendHeartbeat(sessionId);
  
  // Set up interval to send periodic pings
  const intervalId = setInterval(() => {
    sendHeartbeat(sessionId);
  }, HEARTBEAT_INTERVAL_MS);
  
  dataQueryHeartbeats.set(sessionId, intervalId);
}

// Stop heartbeat for a data query session
function stopDataQueryHeartbeat(sessionId) {
  if (dataQueryHeartbeats.has(sessionId)) {
    clearInterval(dataQueryHeartbeats.get(sessionId));
    dataQueryHeartbeats.delete(sessionId);
  }
}

// Send heartbeat ping
function sendHeartbeat(sessionId) {
  sendPortMessage({
    type: "heartbeat/ping",
    sessionId: sessionId,
  }).catch((error) => {
    // Heartbeat failed - session might have ended, stop heartbeat
    console.warn(`Heartbeat failed for session ${sessionId}:`, error);
    stopDataQueryHeartbeat(sessionId);
  });
}

// Helper function to send message via port and wait for response
function sendPortMessage(message, retryCount = 0) {
  return new Promise((resolve, reject) => {
    const requestId = ++requestIdCounter;
    
    // Set timeout for request (10 seconds)
    const timeout = setTimeout(() => {
      if (pendingRequests.has(requestId)) {
        pendingRequests.delete(requestId);
        reject(new Error("Request timeout"));
      }
    }, 10000);
    
    pendingRequests.set(requestId, {
      resolve: (response) => {
        clearTimeout(timeout);
        resolve(response);
      },
      reject: (error) => {
        clearTimeout(timeout);
        reject(error);
      },
    });
    
    // Helper to handle port disconnect and retry
    const handlePortDisconnectAndRetry = () => {
      if (retryCount < 2) {
        console.log("Port disconnected, reconnecting and retrying...");
        pendingRequests.delete(requestId);
        clearTimeout(timeout);
        
        // Trigger reconnection if not already in progress
        if (!isReconnecting) {
          reconnectPort();
        }
        
        // Wait for reconnection, then retry
        const checkReconnect = setInterval(() => {
          if (!isReconnecting && port && port.onMessage) {
            clearInterval(checkReconnect);
            // Retry sending the message
            sendPortMessage(message, retryCount + 1)
              .then(resolve)
              .catch(reject);
          }
        }, 100);
        
        // Timeout for reconnection check
        setTimeout(() => {
          clearInterval(checkReconnect);
          if (!port || !port.onMessage) {
            reject(new Error("Failed to reconnect port"));
          }
        }, 5000);
      } else {
        // Max retries reached
        pendingRequests.delete(requestId);
        clearTimeout(timeout);
        reject(new Error("Port disconnected and reconnection failed after retries"));
      }
    };
    
    // Check if port is disconnected and reconnect if needed
    const sendMessage = () => {
      // Check if port exists and appears connected
      if (!port || !port.onMessage) {
        // Port doesn't exist - reconnect and retry
        handlePortDisconnectAndRetry();
        return;
      }
      
      try {
        port.postMessage({
          ...message,
          requestId: requestId,
        });
        
        // Check for Chrome runtime errors after posting message
        if (chrome.runtime.lastError) {
          const errorMsg = chrome.runtime.lastError.message;
          if (errorMsg && errorMsg.includes("disconnected")) {
            handlePortDisconnectAndRetry();
            return;
          }
        }
      } catch (error) {
        // Check if error is about disconnected port
        const errorMessage = error.message || String(error);
        if (
          errorMessage.includes("disconnected") ||
          errorMessage.includes("Extension context invalidated") ||
          errorMessage.includes("Attempting to use a disconnected port")
        ) {
          handlePortDisconnectAndRetry();
          return;
        } else {
          // Other error - reject immediately
          pendingRequests.delete(requestId);
          clearTimeout(timeout);
          reject(error);
        }
      }
    };
    
    sendMessage();
  });
}

window.addEventListener("message", async (event) => {
  // Only accept messages from the same window
  if (event.source !== window) {
    return;
  }

  // Handle relay/ping - get version and permissions
  if (event.data && event.data.type === "relay/ping") {
    try {
      // Get extension version from manifest
      let version = "unknown";
      try {
        version = chrome.runtime.getManifest().version;
      } catch (e) {
        console.error("Failed to get extension version:", e);
      }

      // Relay permission check to background script
      const permissionResponse = await sendPortMessage({
        type: "checkPermissions",
      });

      // Get inventoryAge from chrome.storage.local if it exists
      let inventoryAge = null;
      try {
        const storageData = await chrome.storage.local.get("inventoryAge");
        if (storageData.inventoryAge) {
          const raw = storageData.inventoryAge;
          const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
          if (
            parsed &&
            typeof parsed.timestamp === "number" &&
            typeof parsed.profileUrl === "string"
          ) {
            inventoryAge = parsed;
          }
        }
      } catch (e) {
        console.error("Failed to get inventoryAge:", e);
      }

      // Send pong response with version, permission status, and inventoryAge
      window.postMessage(
        {
          type: "relay/pong",
          version: version,
          message: "Pong! Extension is ready.",
          hasTabsPermission: permissionResponse?.hasTabsPermission || false,
          hasHostPermission: permissionResponse?.hasHostPermission || false,
          inventoryAge: inventoryAge,
        },
        event.origin
      );
    } catch (e) {
      console.error("Failed to handle ping:", e);
      window.postMessage(
        {
          type: "relay/pong",
          version: "unknown",
          message: "Error",
          hasTabsPermission: false,
          hasHostPermission: false,
          inventoryAge: null,
        },
        event.origin
      );
    }
    return;
  }

  // Handle relay/requestPermission - forward to background and relay response
  if (event.data && event.data.type === "relay/requestPermission") {
    try {
      // Forward permission request to background script
      const response = await sendPortMessage({
        type: "requestPermission",
        permissionType: event.data.permissionType, // "tabs" or "host"
      });

      // Send response back to webpage
      window.postMessage(
        {
          type: "relay/permissionResponse",
          permissionType: event.data.permissionType,
          granted: response?.granted || false,
          error: response?.error || null,
        },
        event.origin
      );
    } catch (e) {
      console.error("Failed to request permission:", e);
      window.postMessage(
        {
          type: "relay/permissionResponse",
          permissionType: event.data.permissionType,
          granted: false,
          error: e.message || "Unknown error",
        },
        event.origin
      );
    }
    return;
  }

  // Handle relay/checkSteamLogon - forward to background and relay response
  if (event.data && event.data.type === "relay/checkSteamLogon") {
    try {
      // Forward Steam logon check to background script
      const response = await sendPortMessage({
        type: "checkSteamLogon",
      });

      // Send response back to webpage
      window.postMessage(
        {
          type: "relay/steamLogonResponse",
          success: response?.success || false,
          loggedIn: response?.loggedIn || false,
          username: response?.username || null,
          profilePicture: response?.profilePicture || null,
          error: response?.error || null,
        },
        event.origin
      );
    } catch (e) {
      console.error("Failed to check Steam logon:", e);
      window.postMessage(
        {
          type: "relay/steamLogonResponse",
          success: false,
          loggedIn: false,
          username: null,
          profilePicture: null,
          error: e.message || "Unknown error",
        },
        event.origin
      );
    }
    return;
  }

  // Handle relay/startAgeDetection - forward to background and relay response
  if (event.data && event.data.type === "relay/startAgeDetection") {
    try {
      // Forward age detection start to background script
      const response = await sendPortMessage({
        type: "startAgeDetection",
        sessionId: event.data.sessionId,
        profileUrl: event.data.profileUrl,
        tabId: event.data.tabId,
      });

      // Send response back to webpage
      window.postMessage(
        {
          type: "relay/ageDetectionStartResponse",
          success: response?.success || false,
          sessionId: response?.sessionId || null,
          error: response?.error || null,
        },
        event.origin
      );
    } catch (e) {
      console.error("Failed to start age detection:", e);
      window.postMessage(
        {
          type: "relay/ageDetectionStartResponse",
          success: false,
          sessionId: null,
          error: e.message || "Unknown error",
        },
        event.origin
      );
    }
    return;
  }

  // Handle relay/stopAgeDetection - forward to background and relay response
  if (event.data && event.data.type === "relay/stopAgeDetection") {
    try {
      // Forward age detection stop to background script
      const response = await sendPortMessage({
        type: "stopAgeDetection",
        sessionId: event.data.sessionId,
      });

      // Send response back to webpage
      window.postMessage(
        {
          type: "relay/ageDetectionStopResponse",
          success: response?.success || false,
          sessionId: response?.sessionId || null,
          error: response?.error || null,
        },
        event.origin
      );
    } catch (e) {
      console.error("Failed to stop age detection:", e);
      window.postMessage(
        {
          type: "relay/ageDetectionStopResponse",
          success: false,
          sessionId: null,
          error: e.message || "Unknown error",
        },
        event.origin
      );
    }
    return;
  }

  // Handle relay/ageDetectionStatusResponse - forward to background
  if (event.data && event.data.type === "relay/ageDetectionStatusResponse") {
    try {
      // Forward status response acknowledgment to background script
      sendPortMessage({
        type: "ageDetectionStatusResponse",
        sessionId: event.data.sessionId,
      }).catch((e) => {
        console.error("Failed to send age detection status response:", e);
      });
    } catch (e) {
      console.error("Failed to handle age detection status response:", e);
    }
    return;
  }

  // Handle relay/startDataQuery - forward to background and relay response
  if (event.data && event.data.type === "relay/startDataQuery") {
    try {
      // Forward data query start to background script
      const response = await sendPortMessage({
        type: "startDataQuery",
        sessionId: event.data.sessionId,
        profileUrl: event.data.profileUrl,
        tabId: event.data.tabId,
        startTimestamp: event.data.startTimestamp,
        endTimestamp: event.data.endTimestamp,
      });

      // Handle case where response might be undefined
      if (!response) {
        window.postMessage(
          {
            type: "relay/dataQueryStartResponse",
            success: false,
            sessionId: null,
            error: "No response from background script",
          },
          event.origin
        );
        return;
      }

      // Start heartbeat if query started successfully
      if (response.success && response.sessionId) {
        startDataQueryHeartbeat(response.sessionId);
      }
      
      // Send response back to webpage
      window.postMessage(
        {
          type: "relay/dataQueryStartResponse",
          success: response.success || false,
          sessionId: response.sessionId || null,
          error: response.error || null,
        },
        event.origin
      );
    } catch (e) {
      console.error("Failed to start data query:", e);
      window.postMessage(
        {
          type: "relay/dataQueryStartResponse",
          success: false,
          sessionId: null,
          error: e.message || "Unknown error",
        },
        event.origin
      );
    }
    return;
  }

  // Handle relay/stopDataQuery - forward to background and relay response
  if (event.data && event.data.type === "relay/stopDataQuery") {
    try {
      // Stop heartbeat before stopping query
      const sessionId = event.data.sessionId;
      if (sessionId) {
        stopDataQueryHeartbeat(sessionId);
      }
      
      // Forward data query stop to background script
      const response = await sendPortMessage({
        type: "stopDataQuery",
        sessionId: sessionId,
      });

      // Send response back to webpage
      window.postMessage(
        {
          type: "relay/dataQueryStopResponse",
          success: response?.success || false,
          sessionId: response?.sessionId || null,
          error: response?.error || null,
        },
        event.origin
      );
    } catch (e) {
      console.error("Failed to stop data query:", e);
      window.postMessage(
        {
          type: "relay/dataQueryStopResponse",
          success: false,
          sessionId: null,
          error: e.message || "Unknown error",
        },
        event.origin
      );
    }
    return;
  }

  // Handle relay/dataQueryStatusResponse - forward to background
  if (event.data && event.data.type === "relay/dataQueryStatusResponse") {
    try {
      // Forward status response acknowledgment to background script
      sendPortMessage({
        type: "dataQueryStatusResponse",
        sessionId: event.data.sessionId,
      }).catch((e) => {
        console.error("Failed to send data query status response:", e);
      });
    } catch (e) {
      console.error("Failed to handle data query status response:", e);
    }
    return;
  }

  // Handle relay/fetchLatestEventsPage - forward to background and relay response
  if (event.data && event.data.type === "relay/fetchLatestEventsPage") {
    try {
      // Forward latest events page fetch to background script
      const response = await sendPortMessage({
        type: "fetchLatestEventsPage",
        profileUrl: event.data.profileUrl,
      });

      // Send response back to webpage
      window.postMessage(
        {
          type: "relay/latestEventsPage",
          events: response?.events || [],
          error: response?.error || null,
        },
        event.origin
      );
    } catch (e) {
      console.error("Failed to fetch latest events page:", e);
      window.postMessage(
        {
          type: "relay/latestEventsPage",
          events: [],
          error: e.message || "Unknown error",
        },
        event.origin
      );
    }
    return;
  }
});

// Note: Messages from background script are now handled via port.onMessage.addListener above
