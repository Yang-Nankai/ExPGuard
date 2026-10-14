// Copyright ©2022-2025 FUJIFILM Healthcare Americas Corporation., All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic, mechanical or otherwise, is prohibited without the prior written consent of the copyright owner.
// Filename: csWindowManagement.js

const backgroundMessageResponseTypes = [
    "onPollingSuccess",
    "windowPositionOnWindowClose",
    "onApplicationWindowRemoved",
    "onApplicationWindowOpened"
];

function logExtError(err) {
    if (err) {
        console.log(`[Messaging Extension]: ${err.message}`);
    }
};

document.addEventListener(
    "windowManagerEventEx",
    function (evt) {
        const request = evt?.detail?.request;
        if (!request) return;

        request.listenerId = evt?.detail?.id;
        request.isWindowManagement = true;
        try {
            chrome.runtime.sendMessage(request)
                .then(response => {
                    if (response === undefined || response === null || !response.type) return;
                    if (response.type === "openwindow" || response.type === "opentabwindow") {
                        window.localStorage.setItem(request.storageKey,
                            JSON.stringify({
                                tabId: response.tabId,
                                windowId: response.windowId,
                                opener: request.opener,
                                isMaster: request.isMaster ?? false
                            }));
                        onBackgroundMessage({ type: 'onApplicationWindowOpened', responseData: { windowStorageKey: response.windowStorageKey } }, null, null);
                    } else if (response.type === "isAlive" || response.type === "saveWindowInfo") {
                        let obj = JSON.parse(window.localStorage.getItem(request.storageKey));
                        if (obj === undefined || obj === null) {
                            obj = {};
                        }
                        obj.tabId = response.tabId;
                        obj.windowId = response.windowId;
                        window.localStorage.setItem(request.storageKey, JSON.stringify(obj));
                    }
                    const listenerId = evt?.detail?.id;
                    document.dispatchEvent(new CustomEvent('windowManagerEventComplete_' + listenerId,
                        { detail: { request: request, response: response } }));
                })
                .catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR]: ${ex.message}`);
        }
    }
);

function onBackgroundMessage(response, sender, sendResponse) {
    logExtError(chrome.runtime.lastError);

    if (response === undefined || response === null || !response.type || backgroundMessageResponseTypes.indexOf(response.type) < 0) return;

    switch (response.type) {
        case "onApplicationWindowRemoved":
            document.dispatchEvent(new CustomEvent('onWindowManagerExtEventComplete', { detail: { eventName: "AppWindowClose", response: response } }));
            break;
        case "onApplicationWindowOpened":
            document.dispatchEvent(new CustomEvent('onWindowManagerExtEventComplete', { detail: { eventName: "AppWindowOpen", response: response } }));
            break;
        default:
            const request = response.request;
            const listenerId = request.listenerId;
            document.dispatchEvent(new CustomEvent('windowManagerEventComplete_' + listenerId, { detail: { listenerKey: response.listenerKey, request: request, response: response } }));
    }
};

chrome.runtime.onMessage.removeListener(onBackgroundMessage);
chrome.runtime.onMessage.addListener(onBackgroundMessage);

window.onload = function () {
    //Start heartbeat to keep serviceworker active
    chrome.runtime.sendMessage({ type: 'startHeartBeat', isWindowManagement: true }).catch(err => logExtError(err));
    document.documentElement.setAttribute("extension", true); // set extension attribute
    //to check the tab refresh scenario
    if (window.performance.navigation && window.performance.navigation.type === 1) {
        const request = {
            type: 'onStopPolling',
            isWindowManagement: true
        };

        chrome.runtime.sendMessage(request).catch(err => logExtError(err));
    }
    if (!/WebHelp5/i.test(window.location.href)) return;
    const restoreRequest = getDefaultWindowPosition();
    chrome.runtime.sendMessage(restoreRequest).catch(err => logExtError(err));
};

function getDefaultWindowPosition() {
    const newHeight = Math.min(1000, screen.availHeight);
    const newWidth = Math.min(1000, screen.availWidth);
    let newLeft = screen.availLeft + 100;
    if ((newLeft + newWidth) > screen.availWidth) {
        newLeft = screen.availLeft;
    }
    let newTop = screen.availTop + 100;
    if ((newTop + newHeight) > screen.availHeight) {
        newTop = screen.availTop;
    }
    const restoreRequest = {
        type: 'restore',
        height: newHeight,
        width: newWidth,
        left: newLeft,
        top: newTop,
        isWindowManagement: true
    };
    return restoreRequest;
};

window.onerror = function (e, source, lineno, colno, error) {
    console.log(`[ERR]: at ${source}(${lineno},${colno}\n${error.message}`);
    logExtError(chrome.runtime.lastError);
};
