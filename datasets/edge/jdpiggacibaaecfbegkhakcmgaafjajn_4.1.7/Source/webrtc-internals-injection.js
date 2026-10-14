/**
 * This script is part of the Videochat Extension project and is injected into chrome://webrtc-internals
 * to enable advanced browser-level WebRTC monitoring capabilities.
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
 * 1. Monkey-patch chrome.send to avoid extra getStandardStats calls for performance reasons
 * 2. Register own WebUI Listerners using cr.js to provide monitoring functionality
 * 3. Unregister all existing WebUI listeners after a delay to avoid conflicts
 * 4. Transform raw WebRTC stats payloads—including comprehensive stats conversion—before dispatching them via custom DOM events.
 * 5. Captures WebRTC-related events from chrome://webrtc-internals
 * 6. Dispatches validated events to content-script via custom events
 * 7. Maintains clean separation between MAIN world and ISOLATED world contexts
 * 
 * After user grants permission, the script is registered in ensureUniversalScriptsAreRegistered in the service worker.
 * injected-script is injected into chrome://webrtc-internals in MAIN world, content-script is in ISOLATED world.
 * injected-script redirects WebRTC events to the content script, which then redirects to background.
 */

'use strict';

// this script runs at document_start to patch chrome.send to prevent original page logic from being executed
// the goal is to replace original WebUI listeners with custom ones, and to do that reliably in all circumstances
// a lot of failsafes are used to ensure that original page logic is prevented as soon as possible

let VE_browserModePatchingFinished = false;
let VE_browserModePatchingStarted = 0;
let VE_originalChromeSend;
let VE_originalChromeSendIsPatched = false;
let VE_originalFinishedDOMLoadSuppressed = false;
let VE_originalFinishedDOMArguments = [];
let VE_FinishedDOMLoadApplied = false;

const VE_isDev = false;

let devLog = {
    log: () => { },
    error: () => { },
    warn: () => { },
    info: () => { },
    dir: () => { },
    time: () => { },
    timeEnd: () => { },
    debug: () => { },
    table: () => { }
};

function PatchChromeSend(when) {
    if (VE_originalChromeSendIsPatched) {
        return
    }
    if (chrome && chrome.send) {
        VE_originalChromeSend = chrome.send;
        chrome.send = function () {
            if (arguments[0] === "getStandardStats") {
                devLog.log('getStandardStats blocked')
                return
            }
            if (arguments[0] === 'finishedDOMLoad') {
                VE_originalFinishedDOMArguments = arguments;
                VE_originalFinishedDOMLoadSuppressed = true;
                devLog.log('finishedDOMLoad triggered')
                return
            }
            return VE_originalChromeSend.apply(chrome, arguments)
        }
        VE_originalChromeSendIsPatched = true;
        if (console && console.log) {
            console.log('chrome.send patched at', when)
        }
    }
}

PatchChromeSend('document_start')

let VE_webUiListenersInitialized = false;
const VE_customWebUiEventListeners = [];

let VE_readyStateChangeTriggered = false;

document.addEventListener("readystatechange", (event) => {
    VE_readyStateChangeTriggered = true;
    initDevLog()
    devLog.log('[readystatechange] event.target.readyState', event.target.readyState)
    if (event.target.readyState === 'interactive' || event.target.readyState === 'complete') {
        devLog.log('[readystatechange] patching chrome.send')
        PatchChromeSend(event.target.readyState)
    }
    if (event.target.readyState === 'complete') {
        devLog.log('[readystatechange] trying to patch browser mode')
        tryBrowserModePatching()
    }
});


function initDevLog() {
    if (document.readyState !== 'complete' && document.readyState !== 'interactive') {
        return
    }
    devLog = (() => {
        if (!VE_isDev) {
            // Return no-op functions when not in dev mode
            return {
                log: () => { },
                error: () => { },
                warn: () => { },
                info: () => { },
                dir: () => { },
                time: () => { },
                timeEnd: () => { },
                debug: () => { },
                table: () => { }
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
            debug: console.debug.bind(console),
            table: console.table.bind(console)
        };
    })();
}

async function tryBrowserModePatching() {
    if (VE_browserModePatchingStarted === 0) {
        devLog.log('[tryBrowserModePatching] first attempt, marking start time')
        VE_browserModePatchingStarted = Date.now();
    }
    if (VE_browserModePatchingFinished) {
        devLog.log('[tryBrowserModePatching] browser mode patching was already finished, stopping')
        return
    }
    if (!VE_originalChromeSendIsPatched) {
        devLog.log('[tryBrowserModePatching] chrome.send is not patched, trying to patch now')
        PatchChromeSend('browserModePatching')
        devLog.log('[tryBrowserModePatching] setting timeout to try again in 1 second')
        setTimeout(tryBrowserModePatching, 1000);
        return
    }
    if (document && document.readyState && document.readyState !== 'complete') {
        devLog.log('[tryBrowserModePatching] document is not ready, setting timeout to try again in 1 second')
        setTimeout(tryBrowserModePatching, 1000);
        return
    }
    
    devLog.log('[tryBrowserModePatching] checking if videochat-extension-browser-mode parameter is present')
    const searchParameters = new URLSearchParams(window.location.search)
    const isVe = searchParameters.get('videochat-extension-browser-mode') === 'true'
    devLog.log('[tryBrowserModePatching] videochat-extension-browser-mode parameter is', isVe)
    if (!isVe) {
        VE_browserModePatchingFinished = true;
        devLog.log('[tryBrowserModePatching] videochat-extension-browser-mode parameter is not present, suppressing patching')
        console.warn('Patching was suppressed because the videochat-extension-browser-mode parameter is not present')
        chrome.send = VE_originalChromeSend;
        if (VE_originalFinishedDOMLoadSuppressed && !VE_FinishedDOMLoadApplied) {
            VE_FinishedDOMLoadApplied = true;
            VE_originalChromeSend.apply(chrome, VE_originalFinishedDOMArguments)
        }
        return
    }

    if (!VE_originalFinishedDOMLoadSuppressed) {
        devLog.log('[tryBrowserModePatching] originalFinishedDOMLoadSuppressed is false, checking if 10 seconds have passed')
        if (Date.now() - VE_browserModePatchingStarted < 10000) {
            devLog.log('[tryBrowserModePatching] less than 10 seconds have passed, setting timeout to try again in 1 second')
            setTimeout(tryBrowserModePatching, 1000);
            return
        } else {
            devLog.log('[tryBrowserModePatching] we probably missed the finishedDOMLoad event, so wont have to send it manually')
            // considering that we missed the finishedDOMLoad event
            VE_FinishedDOMLoadApplied = true;
        }
    }

    function validateData(data) {
        if (typeof data !== 'object' || data === null) {
            throw new Error('Invalid data format');
        }
        return true;
    }

    function dispatchDataToContentScript(type, data) {
        try {
            validateData(data);
            const event = new CustomEvent(type, {
                detail: {
                    data: data,
                    timestamp: new Date()
                }
            });
            document.dispatchEvent(event);
        } catch (error) {
            // devLog.error('Data dispatch failed:', error);
        }
    }
    function addPeerConnection(data) {
        devLog.log('addPeerConnection', data)
        dispatchDataToContentScript('videochat-extension-add-peer-connection', data)
    }

    function updatePeerConnection(data) {
        devLog.log('updatePeerConnection', data)
        dispatchDataToContentScript('videochat-extension-update-peer-connection', data)
    }

    function removePeerConnection(data) {
        devLog.log('removePeerConnection', data)
        dispatchDataToContentScript('videochat-extension-remove-peer-connection', data)
    }

    function addStandardStats(data) {
        const transformedReports = {};

        data.reports.forEach(report => {
            // Handle both old and new formats
            let reportId, reportType, timestamp, statsData;
            
            // NEW format (Chromium M134+): reports is array of [id, statsObject] tuples
            if (Array.isArray(report) && report.length >= 2) {
                reportId = report[0];
                statsData = report[1];
                timestamp = statsData.timestamp;
                reportType = statsData.type;
                
                // Stats are already in object format with all properties
                const transformedStats = { ...statsData };
                
                // Ensure id and timestamp are present
                if (!transformedStats.id) transformedStats.id = reportId;
                if (!transformedStats.timestamp) transformedStats.timestamp = timestamp;
                
                // Add mediaType if kind exists
                if (transformedStats.kind) {
                    transformedStats.mediaType = transformedStats.kind;
                }
                
                transformedReports[reportId] = transformedStats;
            }
            // OLD format (pre-M134): reports is array of objects with stats.values array
            else if (report && report.stats && Array.isArray(report.stats.values)) {
                const { values, timestamp } = report.stats;
                const transformedStats = {
                    id: report.id,
                    timestamp: timestamp,
                    type: report.type
                };

                // Convert values array to object, handling every pair of items
                for (let i = 0; i < values.length; i += 2) {
                    const key = values[i];
                    const value = values[i + 1];

                    // Convert numeric strings to numbers
                    if (!isNaN(value) && value !== '') {
                        transformedStats[key] = Number(value);
                    } else {
                        transformedStats[key] = value;
                    }
                }

                // Add mediaType if kind exists
                if (transformedStats.kind) {
                    transformedStats.mediaType = transformedStats.kind;
                }

                // Add to transformed reports object using ID as key
                transformedReports[report.id] = transformedStats;
            }
        });

        // Replace the reports array with our transformed object
        data.reports = transformedReports;

        devLog.log('addStandardStats', data);
        dispatchDataToContentScript('videochat-extension-add-standard-stats', data);
    }

    // the list of new webui event listeners to be registered
    // new function to apply custom WebUI listeners

    async function applyCustomWebUiListeners() {
        if (VE_webUiListenersInitialized || VE_browserModePatchingFinished) {
            return false;
        }
        const webUiEventListenersRegistrations = [
            { name: 'add-peer-connection', callback: addPeerConnection },
            { name: 'update-peer-connection', callback: updatePeerConnection },
            { name: 'remove-peer-connection', callback: removePeerConnection },
            { name: 'add-standard-stats', callback: addStandardStats },
            // { name: 'update-all-peer-connections', callback: data => devLog.log(data) }
        ];

        // the list of original webui event listeners to be removed
        const webUiEventListenersToRemove = [
            'add-peer-connection',
            'update-peer-connection',
            'update-all-peer-connections',
            'remove-peer-connection',
            'add-standard-stats',
            'add-media',
            'update-media',
            'remove-media-for-renderer',
            'event-log-recordings-file-selection-cancelled',
            'audio-debug-recordings-file-selection-cancelled'
        ];
        const { addWebUiListener, removeWebUiListener } = await import('chrome://resources/js/cr.js')

        if (!VE_webUiListenersInitialized) {
            VE_webUiListenersInitialized = true;
            // Remove original WebUI listeners
            webUiEventListenersToRemove.forEach(webUiEventName => {
                for (let uid = 1; uid <= 20; uid++) {
                    if (VE_customWebUiEventListeners.some(registration => registration.webUiEventName === webUiEventName && registration.uid === uid)) {
                        continue;
                    }
                    const removed = removeWebUiListener({ eventName: webUiEventName, uid });
                    if (removed) {
                        devLog.log(`Removed WebUiListener: ${webUiEventName} with uid: ${uid}`);
                    }
                }
            });

            // Register new custom WebUI listeners
            webUiEventListenersRegistrations.forEach(({ name, callback }) => {
                const { eventName: webUiEventName, uid } = addWebUiListener(name, callback);
                devLog.log(`Registered VE WebUiListener: ${webUiEventName} with uid: ${uid}`);
                VE_customWebUiEventListeners.push({ webUiEventName, uid });
            });
        }

        return true;
    }

    devLog.log('[tryBrowserModePatching] applying custom WebUI listeners')
    applyCustomWebUiListeners().then(result => {
        devLog.log('[tryBrowserModePatching] custom WebUI listeners applied', result)
        if (result) {
            devLog.log('[tryBrowserModePatching] originalFinishedDOMLoadSuppressed is', VE_originalFinishedDOMLoadSuppressed)
            devLog.log('[tryBrowserModePatching] VE_FinishedDOMLoadApplied is', VE_FinishedDOMLoadApplied)
            if (VE_originalFinishedDOMLoadSuppressed && !VE_FinishedDOMLoadApplied) {
                devLog.log('[tryBrowserModePatching] sending finishedDOMLoad')
                VE_FinishedDOMLoadApplied = true;
                VE_originalChromeSend.apply(chrome, VE_originalFinishedDOMArguments)
                devLog.log('[tryBrowserModePatching] finishedDOMLoad sent')
            }
            VE_browserModePatchingFinished = true;
            devLog.log('[tryBrowserModePatching] browser mode patching finished')

            // Listen for getStats events from content script
            document.addEventListener('videochat-extension-getStats', () => {
                VE_originalChromeSend.apply(chrome, ['getStandardStats']);
            });
        }
    });
}

(() => {
    // Add timeout failsafe
    try {
        setTimeout(() => {
            if (!VE_readyStateChangeTriggered) {
                devLog.warn('readystatechange event did not fire within timeout, proceeding with patching');
                PatchChromeSend('timeout_fallback');
                if (document.readyState === 'complete') {
                    initDevLog()
                    devLog.log('[timeout_fallback] trying to patch browser mode')
                    tryBrowserModePatching();
                } else {
                    // If document is not complete yet, set up one final check
                    setTimeout(() => {
                        if (!VE_readyStateChangeTriggered) {
                            devLog.warn('Forcing browserModePatching after final timeout');
                            tryBrowserModePatching();
                        }
                    }, 5000);
                }
            }
        }, 10000);
    } catch (error) {
        devLog.error('Error in timeout fallback:', error);
    }
})()