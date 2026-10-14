/**
 * This script is part of the Videochat Extension project and runs in the ISOLATED world of chrome://webrtc-internals.
 * It serves as a bridge between the injected script (running in MAIN world) and the extension's service worker.
 * 
 * Copyright (c) 2021-2025, Fyodor Kurlyuk
 * ALL RIGHTS RESERVED.
 * Any unauthorized use, reproduction, or modification is strictly prohibited.
 * 
 * FEATURE ACCESSIBILITY AND SAFETY:
 * 1. Access is strictly limited to direct project supporters on Patreon, ensuring only a small,
 *    dedicated portion of the userbase can utilize this feature
 * 2. Users are presented with a comprehensive modal explaining chrome:// URL access implications
 * 3. Only after a 30-second delay are users given the option to enable the required Chrome flag
 * 4. Both content and injected scripts are registered per session and require explicit user action
 *    to be activated, ensuring conscious opt-in for each browser session. Scripts are unregistered 
 *    when connection with the background service worker is established.
 * 
 * IMPLEMENTATION NOTE:
 * This script intentionally uses plain JavaScript without any external dependencies or frameworks
 * to minimize security risks when accessing chrome:// URLs. This ensures maximum stability
 * and predictability of the code running in this sensitive context.
 * 
 * Key responsibilities:
 * 1. Creates and manages UI elements to show connection status to users
 * 2. Implements robust connection management with the extension's service worker
 * 3. Handles message routing from injected-script to the service worker
 * 4. Provides automatic reconnection with exponential backoff
 * 5. Maintains message queue for reliability during connection interruptions
 * 6. Hides all other content in the page (though it is disabled by injection script)
 * 
 * The script works in conjunction with webrtc-internals-injection.js, where injected-script captures WebRTC events
 * and this content-script forwards them to the extension's page through the service worker.
 */

'use strict';

const searchParameters = new URLSearchParams(window.location.search)
const isVe = searchParameters.get('videochat-extension-browser-mode') === 'true'
if (!isVe) {
    throw new Error('Content script was suppressed because the videochat-extension-browser-mode parameter is not present');
} else {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message === 'hello?') {
            console.log('background script attempted to close the tab, but content script is still running');
        }
    });
    console.log('videochat-extension\'s content-script started');
}

// Change document title
document.title = 'Videochat Extension - Browser Mode';

const pageStyle = document.createElement('style');
pageStyle.textContent = `
    /* Base styles */
    html, body {
        overflow: hidden !important;
        background: #1a1a1a !important;
        margin: 0 !important;
        padding: 0 !important;
        color: #ffffff;
    }
    
    /* Hide everything in the body */
    body > *:not(#videochat-extension-container) {
        display: none !important;
    }

    .close-button {
        background: #d93025;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        margin-top: 15px;
    }

    .close-button:hover {
        background: #b71c1c;
    }

    .error-status {
        color: #d93025 !important;
    }
`;
document.head.appendChild(pageStyle);

// Create a container for our status display
const container = document.createElement('div');
container.id = 'videochat-extension-container';
container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #1a1a1a;
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

// Create header container
const headerContainer = document.createElement('div');
headerContainer.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 35px;
    margin-bottom: 30px;
`;

// Create title element
const titleElement = document.createElement('div');
titleElement.id = 'videochat-extension-title';
titleElement.textContent = 'Videochat Extension';
titleElement.style.cssText = `
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 8px;
    text-align: center;
    color: #8ab4f8;
    letter-spacing: 0.3px;
`;

// Create explanation element
const explanationElement = document.createElement('div');
explanationElement.id = 'videochat-extension-explanation';
explanationElement.textContent = 'Browser Mode • WebRTC Internals';
explanationElement.style.cssText = `
    font-size: 13px;
    text-align: center;
    color: #9aa0a6;
    font-weight: 500;
`;

// Create content container
const contentContainer = document.createElement('div');
contentContainer.style.cssText = `
    background: #2d2d2d;
    border-radius: 12px;
    padding: 20px;
    width: 90%;
    max-width: 320px;
    border: 1px solid #404040;
    display: flex;
    flex-direction: column;
`;

// Create message element
const messageElement = document.createElement('div');
messageElement.id = 'videochat-extension-message';
messageElement.textContent = 'Monitoring WebRTC connections';
messageElement.style.cssText = `
    font-size: 14px;
    text-align: center;
    margin-bottom: 8px;
    color: #9aa0a6;
    font-weight: 500;
`;

// Event tracking variables
let eventCount = 0;
let lastEventTime = null;

// Create stats container with new unified style
const statsContainer = document.createElement('div');
statsContainer.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 15px;
    width: 100%;
    font-size: 11px;
    color: #9aa0a6;
`;

// Create event counter element with new minimal style
const eventCounterElement = document.createElement('div');
eventCounterElement.id = 'event-counter';
eventCounterElement.style.cssText = `
    white-space: nowrap;
`;
eventCounterElement.textContent = 'Events: 0';

// Create separator
const separator = document.createElement('div');
separator.textContent = '•';
separator.style.cssText = `
    color: #404040;
`;

// Create last event time element with new minimal style
const lastEventElement = document.createElement('div');
lastEventElement.id = 'last-event-time';
lastEventElement.style.cssText = `
    white-space: nowrap;
`;
lastEventElement.textContent = 'Last event: never';

// Add elements to stats container
statsContainer.appendChild(eventCounterElement);
statsContainer.appendChild(separator);
statsContainer.appendChild(lastEventElement);

// Update the event tracking UI function
function updateEventStats() {
    eventCounterElement.textContent = `Events: ${eventCount}`;
    lastEventElement.textContent = lastEventTime ? 
        `Last: ${new Date(lastEventTime).toLocaleTimeString()}` : 
        'Last: never';
}

// Create status element with improved styling
const statusElement = document.createElement('div');
statusElement.id = 'videochat-extension-status';
statusElement.style.cssText = `
    font-size: 13px;
    text-align: center;
    padding: 12px;
    background: #1a1a1a;
    border-radius: 8px;
    max-width: 100%;
    word-wrap: break-word;
    color: #34a853;
    border: 1px solid #404040;
    max-height: 80px;
    overflow-y: auto;
    margin-top: auto;
`;

// Create footer container
const footerContainer = document.createElement('div');
footerContainer.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin-top: auto;
    margin-bottom: 20px;
`;

// Create close button
const closeButton = document.createElement('button');
closeButton.id = 'close-window-button';
closeButton.className = 'close-button';
closeButton.textContent = 'Close Window';
closeButton.onclick = () => window.close();

// Create footer element with updated style
const footerElement = document.createElement('div');
footerElement.textContent = 'Keep this window open while using Browser Mode';
footerElement.style.cssText = `
    font-size: 12px;
    color: #9aa0a6;
`;

// Add elements to containers
headerContainer.appendChild(titleElement);
headerContainer.appendChild(explanationElement);

contentContainer.appendChild(messageElement);
contentContainer.appendChild(statsContainer);
contentContainer.appendChild(statusElement);

footerContainer.appendChild(closeButton);
footerContainer.appendChild(footerElement);

// Add containers to main container
container.appendChild(headerContainer);
container.appendChild(contentContainer);
container.appendChild(footerContainer);

// Add our container to the body
document.body.appendChild(container);

/**
 * Console wrapper that only logs in development mode
 */
const devLog = (() => {
    const isDev = !('update_url' in chrome.runtime.getManifest());
    if (!isDev) {
        // Return no-op functions when not in dev mode
        return {
            log: () => {},
            error: () => {},
            warn: () => {},
            info: () => {},
            dir: () => {},
            time: () => {},
            timeEnd: () => {},
            debug: () => {}
        };
    }
    // In dev mode, return bound console methods
    return {
        log: console.log.bind(console),
        error: console.error.bind(console),
        warn: console.warn.bind(console),
        info: console.info.bind(console),
        dir: console.dir.bind(console),
        time: console.time.bind(console),
        timeEnd: console.timeEnd.bind(console),
        debug: console.debug.bind(console)
    };
})();

// Custom ping handler outside the class scope
const handleUniversalPing = (() => {
    let lastTickTime = Date.now();
    let statsConfig = {
        getStats: true,
        statsInterval: 1000,
        getStatsRandomly: false,
        statsIntervalMin: 1000,
        statsIntervalMax: 3000
    };
    let nextInterval = 1000; // Initial interval
    
    // Function to generate next random interval
    const generateNextInterval = () => {
        if (!statsConfig.getStatsRandomly) return statsConfig.statsInterval;
        return Math.floor(Math.random() * (statsConfig.statsIntervalMax - statsConfig.statsIntervalMin + 1)) + statsConfig.statsIntervalMin;
    };
    
    return (timestamp, config) => {
        // Update stats configuration if provided
        if (config) {
            statsConfig = { ...statsConfig, ...config };
            // Generate new interval immediately when config changes
            nextInterval = generateNextInterval();
        }

        // Check if we should collect stats
        if (statsConfig.getStats) {
            const now = Date.now();
            if (now - lastTickTime >= nextInterval) {
                lastTickTime = now;
                // Generate next interval for the next tick
                nextInterval = generateNextInterval();
                // Dispatch getStats event
                document.dispatchEvent(new CustomEvent('videochat-extension-getStats'));
            }
        }
    };
})();

// Connection management class
class ConnectionManager {
    constructor() {
        this.sourcePort = null;
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 10;
        this.messageQueue = [];
        this.pingInterval = null;
        this.reconnectTimeout = null;
        this.isExtensionInvalidated = false;
        this.lastUniversalPing = Date.now();
        this.connect();
    }

    connect() {
        if (this.isConnecting || this.isExtensionInvalidated) return;
        this.isConnecting = true;

        try {
            this.sourcePort = chrome.runtime.connect({name: "chrome-webrtc"});
            this.setupListeners();
            this.reconnectAttempts = 0;
            this.isConnecting = false;
            this.processMessageQueue();
            this.updateStatus('Successfully connected to the extension', 'green');
        } catch (error) {
            this.handleConnectionError(error);
        }
    }

    setupListeners() {
        if (!this.sourcePort) return;

        // setInterval seems to get throttled in inactive windows
        // so we need sophisticated workaround using worker-timers in ui/universal.ts
        this.sourcePort.onMessage.addListener((mes) => {
            if (mes.type === 'universal-ping') {
                // Update last ping time
                this.lastUniversalPing = Date.now();
                // Send pong back
                this.sendMessage({
                    type: 'universal-pong',
                    timestamp: Date.now()
                });
                this.sendMessage({
                    type: 'ping',
                    source: 'chrome-webrtc-content'
                });
                
                // Call the external ping handler with config
                handleUniversalPing(mes.timestamp, mes.config);
                return;
            }

            if (mes !== "pong") {
                // Handle non-pong messages
                devLog.debug('Received message:', mes);
            }
        });

        this.sourcePort.onDisconnect.addListener(() => {
            this.handleDisconnect();
        });

        // Setup ping interval - every 2 seconds for better responsiveness
        this.setupPingInterval();
    }

    setupPingInterval() {
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
        }

        this.pingInterval = setInterval(() => {
            if (this.sourcePort) {
                try {
                    // Send ping with source identification
                    this.sourcePort.postMessage({
                        type: 'ping',
                        source: 'chrome-webrtc-content'
                    });
                } catch (error) {
                    this.handleConnectionError(error);
                }
            }
        }, 2000);
    }

    handleDisconnect() {
        this.updateStatus('Disconnected - attempting to reconnect...', 'yellow');
        this.cleanup();
        this.scheduleReconnect();
    }

    handleConnectionError(error) {
        devLog.error('Connection error:', error);
        
        if (error.message === "Extension context invalidated.") {
            this.isExtensionInvalidated = true;
            this.updateStatus('Extension has been updated, reloaded, or removed. Please restart Browser Mode.', 'red');
            this.cleanup();
            return;
        }

        this.isConnecting = false;
        this.cleanup();
        this.scheduleReconnect();
    }

    scheduleReconnect() {
        if (this.isExtensionInvalidated || 
            this.reconnectAttempts >= this.maxReconnectAttempts) {
            this.updateStatus('Failed to reconnect. Please restart Browser Mode.', 'red');
            return;
        }

        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }

        // Exponential backoff: 1s, 2s, 4s, 8s, etc. up to 30s
        const delay = Math.min(Math.pow(2, this.reconnectAttempts) * 1000, 30000);
        this.reconnectTimeout = setTimeout(() => {
            this.reconnectAttempts++;
            this.connect();
        }, delay);
    }

    cleanup() {
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }
        if (this.sourcePort) {
            try {
                this.sourcePort.disconnect();
            } catch (error) {
                devLog.error('Error during cleanup:', error);
            }
            this.sourcePort = null;
        }
    }

    static updateStatus(message, level = 'green') {
        const statusColors = {
            'red': '#d93025',
            'yellow': '#f29900',
            'green': '#34a853'
        };

        const color = statusColors[level] || statusColors.green;
        
        // Update the status message
        statusElement.textContent = message;
        statusElement.style.color = color;

        devLog.log('Connection status:', message, `(${level})`);
    }

    updateStatus(message, level = 'green') {
        ConnectionManager.updateStatus(message, level);
    }

    sendMessage(message) {
        if (!this.sourcePort) {
            this.messageQueue.push(message);
            this.connect();
            return;
        }

        try {
            this.sourcePort.postMessage(message);
        } catch (error) {
            this.messageQueue.push(message);
            this.handleConnectionError(error);
        }
    }

    processMessageQueue() {
        while (this.messageQueue.length > 0 && this.sourcePort) {
            const message = this.messageQueue.shift();
            try {
                this.sourcePort.postMessage(message);
            } catch (error) {
                this.messageQueue.unshift(message); // Put message back at front of queue
                this.handleConnectionError(error);
                break;
            }
        }
    }
}

// Create connection manager instance
const connectionManager = new ConnectionManager();

// Event listeners using the connection manager
document.addEventListener('videochat-extension-add-peer-connection', function (e) {
    eventCount++;
    lastEventTime = Date.now();
    updateEventStats();
    connectionManager.sendMessage({timestamp: e.detail.timestamp, type: "BM-add-peer-connection", payload: e.detail.data});
});

document.addEventListener('videochat-extension-update-peer-connection', function (e) {
    eventCount++;
    lastEventTime = Date.now();
    updateEventStats();
    if (e.detail.data.time) {
        const payload = {...e.detail.data};
        payload.time = new Date(parseFloat(payload.time));
        connectionManager.sendMessage({timestamp: new Date(payload.time), type: "BM-update-peer-connection", payload: payload});
    } else {
        connectionManager.sendMessage({timestamp: e.detail.timestamp, type: "BM-update-peer-connection", payload: e.detail.data});
    }
});

document.addEventListener('videochat-extension-remove-peer-connection', function (e) {
    eventCount++;
    lastEventTime = Date.now();
    updateEventStats();
    connectionManager.sendMessage({timestamp: e.detail.timestamp, type: "BM-remove-peer-connection", payload: e.detail.data});
});

document.addEventListener('videochat-extension-add-standard-stats', function (e) {
    eventCount++;
    lastEventTime = Date.now();
    updateEventStats();
    connectionManager.sendMessage({timestamp: e.detail.timestamp, type: "BM-add-standard-stats", payload: e.detail.data});
});

// marking the tab as active so that the background can detect the reload and close the tab
const marker = new URL(window.location);
marker.searchParams.set('videochat-extension-script-executed', 'true');
window.history.replaceState({}, '', marker.toString());