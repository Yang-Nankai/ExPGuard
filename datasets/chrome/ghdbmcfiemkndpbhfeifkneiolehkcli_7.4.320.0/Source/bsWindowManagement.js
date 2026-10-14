// Copyright ©2022-2026 FUJIFILM Healthcare Americas Corporation. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic, mechanical or otherwise, is prohibited without the prior written consent of the copyright owner.
// Filename: bsWindowManagement.js

// Default window positions
const windDefPos = { left: 100, top: 100, height: 1000, width: 1000 };
const windowState = {
    Opening: "Opening",
    Opened: "Opened",
    Closed: "Closed"
};
const synapseIntegratedWindowClose_ListenerKey = "ON_SYNAPSE_INTEGRATED_WINDOW_CLOSE";

var helpWindowInfo = {
    restorePending: false
};

var windowStateMap = new Map();
var windowCloseCallbackMap = new Map();
var listenerMap = new Map();
var pollingTimerMap = new Map();
var integratedWindowPosMap = new Map();
var onBoundsChangedTimeout = -1;

function logExtError() {
    if (chrome.runtime.lastError) {
        console.log(`[Messaging Extension]: ${chrome.runtime.lastError.message}`);
    }
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
    logExtError();
    for (key in changes) {
        if (key === "moveTo" && changes[key].newValue !== "") {
            const updateInfo = {
                left: changes[key].newValue.offsetx,
                top: changes[key].newValue.offsety,
                width: changes[key].newValue.width,
                height: changes[key].newValue.height
            };
            chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, updateInfo);
        }
    }
    chrome.storage.sync.set({ 'moveTo': "" });
});

function getTabInfo(windowId, callback) {
    let info = null;
    try {
        chrome.windows.get(windowId, function (win) {
            if (win != null) {
                info = {
                    type: 'tabInfo',
                    windowId: win.id,
                    state: win.state,
                    left: win.left,
                    top: win.top,
                    width: win.width,
                    height: win.height
                };
            }
            callback(info);
        });
        return true;
    } catch (e) {
        console.log(`[ERR] getTabInfo failed for windowId ${windowId} Exception:${e.message} Last error: ${chrome.runtime.lastError}`);
        callback(info);
        return false;
    }
}

function isWindowAlive(tabId, storageKey, callback) {
    try {
        if (storageKey) {
            tabId = getTabId(storageKey) || tabId;
        }

        if (tabId === -1) {
            console.log(`${storageKey} isAlive ignored for tabId ${tabId} `);
            callback({
                'type': 'isAlive',
                tabId: -1,
                windowId: -1
            });
            return;
        }

        chrome.tabs.get(tabId, function (tab) {
            if (chrome.runtime.lastError || !tab) {
                callback({
                    'type': 'isAlive',
                    tabId: -1,
                    windowId: -1
                });
                setWindowState(storageKey, windowState.Closed);
            }
            else if (!!tab) {
                callback({
                    'type': 'isAlive',
                    tabId: tab.id,
                    windowId: tab.windowId,
                    url: tab.pendingUrl || tab.url
                });
                setWindowState(storageKey, windowState.Opened, tab);
            }
        });
    } catch (e) {
        console.log(`[ERR] isAlive failed for ${storageKey} tabId ${tabId} Exception:${e.message} Last error: ${chrome.runtime.lastError}`);
        callback({
            'type': 'isAlive',
            tabId: -1,
            windowId: -1
        });
        setWindowState(storageKey, windowState.Closed);
    }
}

function getStorageKey(request, sender) {
    let storageKey = request.storageKey;
    if (!!storageKey) {
        //Only from Synapse7.3.000 onwards
        const hostname = (new URL(sender.url)).hostname;
        storageKey = `${storageKey}_${hostname}`;
    }
    return storageKey;
}

function getWindowState(storageKey) {
    const val = windowStateMap?.get(storageKey);
    return val || { status: windowState.Closed };
}

function setWindowState(storageKey, status, windowInfo) {
    if (storageKey) {
        if (!windowStateMap) {
            windowStateMap = new Map();
        }
        windowStateMap.set(storageKey, {
            status: status,
            windowInfo: windowInfo || getWindowState(storageKey).windowInfo
        });
    }
}

function removeWindowState(storageKey) {
    windowStateMap?.delete(storageKey);
}

/**
 * Gets storageKey using window id.
 * @param {string} windowId
 */
function getStorageKeyByWindowId(windowId) {
    if (!windowStateMap) {
        return null;
    }

    for (let [storageKey, winState] of windowStateMap) {
        if (windowId === winState?.windowInfo?.windowId) {
            return storageKey;
        }
    }
    return null;
}

/**
 * Gets storageKey using tab id.
 * @param {string} tabId
 */
function getStorageKeyByTabId(tabId) {
    if (!windowStateMap) {
        return null;
    }

    for (let [storageKey, winState] of windowStateMap) {
        if (tabId === winState?.windowInfo?.id) {
            return storageKey;
        }
    }
    return null;
}

/**
 * Gets tab id using storageKey.
 * @param {string} key
 */
function getTabId(storageKey) {
    const winState = getWindowState(storageKey);
    return winState.windowInfo?.id;
}

/**
 * Gets window id using storageKey.
 * @param {string} key
 */
function getWindowId(storageKey) {
    const winState = getWindowState(storageKey);
    return winState.windowInfo?.windowId;
}

/**
 * Close windows using their window key.
 * @param {string} key
 */
function closeWindowByWindowKey(key) {
    const tabId = getTabId(key);
    if (!!tabId) {
        try {
            chrome.tabs.remove(tabId);
        } catch (ex) {
            console.log(`[ERR] Exception in extension window management handler when executing closeWindowByWindowKey. ${ex.message}\nLast error: ${chrome.runtime.lastError}`);
        } finally {
            setWindowState(key, windowState.Closed);
        }
    }
}

/**
 * Opens window.
 * @param {any} request
 * @param {any} sender
 * @param {any} callback
 */
function openWindow(storageKey, request, sender, callback) {
    try {
        if (/WebHelp5/i.test(request.url)) {
            helpWindowInfo.restorePending = true;
        }
        if (!request.width && !request.height && !request.left && !request.top) {
            // create window in minimized state if size values are not provided
            return openWindowMinimized(storageKey, request, sender.tab.incognito, callback);
        }
        setWindowState(storageKey, windowState.Opening);
        let windowTop = 0;
        displayInfo.getData().then((displays) => {
            const primaryDisplay = displays.find(d => d.isPrimary) || displays[0];
            const { left, top, height } = primaryDisplay.workArea;
            windowTop = top + height - 20;
        }).catch((err) => {
            windowTop = 0;
        }).finally(() => {
            chrome.windows.create({
                url: request.url,
                type: 'popup',
                incognito: sender.tab.incognito,
                width: 20,
                height: 20,
                left: 0,
                top: windowTop
            }).then((win) => {
                logExtError();
                setTimeout(() => {
                    chrome.windows.update(win.id, {
                        left: request.left,
                        top: request.top,
                        height: request.height,
                        width: request.width
                    });
                }, 300);
                setWindowState(storageKey, windowState.Opened, win.tabs[0]);
                callback({ 'type': 'openwindow', windowId: win.id, tabId: win.tabs[0].id, windowStorageKey: storageKey });
            }).catch((ex) => {
                console.log(`[ERR] Exception in openWindow promise. ${ex.message}\nLast error: ${chrome.runtime.lastError}`);
                handleOpenWindowFailed(storageKey, () => openWindowInDefaultPosition(storageKey, request, sender.tab.incognito, callback));
            });
        });
    } catch (ex) {
        //remove window state
        handleOpenWindowFailed(request.storageKey, () => openWindowInDefaultPosition(storageKey, request, sender.tab.incognito, callback));
        console.log(`[ERR] Exception in openWindow. ${ex.message}\nLast error: ${chrome.runtime.lastError}`);
    }
}

/**
 * Opens tab window.
 * @param {any} request
 * @param {any} sender
 * @param {any} callback
 */
function openTabWindow(storageKey, request, sender, callback) {
    try {
        setWindowState(storageKey, windowState.Opening);
        chrome.tabs.create({
            url: request.url,
            active: true
        }).then((tab) => {
            logExtError();
            setWindowState(storageKey, windowState.Opened, tab);
            callback({ 'type': 'opentabwindow', windowId: tab.windowId, tabId: tab.id, windowStorageKey: storageKey });
        }).catch((ex) => {
            console.log(`[ERR] Exception in openTabWindow promise. ${ex.message}\nLast error: ${chrome.runtime.lastError}`);
            handleOpenWindowFailed(storageKey, () => openWindowInDefaultPosition(storageKey, request, sender.tab.incognito, callback));
        });
    } catch (ex) {
        //remove window state
        handleOpenWindowFailed(request.storageKey, () => openWindowInDefaultPosition(storageKey, request, sender.tab.incognito, callback));
        console.log(`[ERR] Exception in openTabWindow. ${ex.message}\nLast error: ${chrome.runtime.lastError}`);
    }
}

/**
 * Get tab details which contains the given key in url.
 * @param {any} urlCheckKeyList
 * @param {any} callback
 * @param {any} storageKey
 * @param {any} needWindowStateUpdate
 */
function getTabInfoContainsUrlKey(urlCheckKeyList, callback, storageKey, needWindowStateUpdate) {
    if (!urlCheckKeyList || urlCheckKeyList.length === 0 || !callback) {
        !!callback && callback({ type: 'tabInfo', windowId: -1, tabId: -1, url: "" });
        return true;
    }

    try {
        chrome.tabs.query({}, function (tabs) {
            if (tabs?.length > 0) {
                for (let urlKey of urlCheckKeyList) {
                    if (urlKey?.length > 0) {
                        let reUsableTabs = tabs.filter(tabItem => tabItem?.url?.toLowerCase()?.includes(urlKey?.toLowerCase()));
                        let tab = (reUsableTabs?.length > 0) ? reUsableTabs[0] : null;
                        if (!!tab) {
                            if (!!storageKey && needWindowStateUpdate) {
                                setWindowState(storageKey, windowState.Opened, tab);
                            }
                            callback({ type: 'tabInfo', windowId: tab.windowId, tabId: tab.id, url: tab.url });
                            return;
                        }
                    }
                }
            }
            callback({ type: 'tabInfo', windowId: -1, tabId: -1, url: "" });
        });
        return true;
    } catch (e) {
        console.log(`[ERR] getTabInfoContainsUrlKey failed for urlCheckKeyList ${urlCheckKeyList} Exception:${e.message} Last error: ${chrome.runtime.lastError}`);
        callback({ type: 'tabInfo', windowId: -1, tabId: -1, url: "" });
        return true;
    }
}

/**
 * Opens window in default position and size.
 * @param {any} request
 * @param {any} incognito
 * @param {any} callback
 */
function openWindowInDefaultPosition(storageKey, request, incognito, callback) {
    try {
        setWindowState(storageKey, windowState.Opening);
        chrome.windows.create({
            url: request.url,
            type: 'popup',
            incognito: incognito,
            width: windDefPos.width,
            height: windDefPos.height,
            left: windDefPos.left,
            top: windDefPos.top
        }).then((win) => {
            setWindowState(storageKey, windowState.Opened, win.tabs[0]);
            callback({ 'type': 'openwindow', windowId: win.id, tabId: win.tabs[0].id, windowStorageKey: storageKey });
        }).catch((ex) => {
            handleOpenWindowFailed(storageKey);
            console.log(`[ERR] Exception openWindowInDefaultPosition promise. ${ex.message}\nLast error: ${chrome.runtime.lastError}`);
        });
    } catch (ex) {
        handleOpenWindowFailed(storageKey);
        console.log(`[ERR] Exception in openWindowInDefaultPosition. ${ex.message}\nLast error: ${chrome.runtime.lastError}`);
    }
}

/**
 * Opens window in minimized state.
 * @param {any} storageKey
 * @param {any} request
 * @param {any} incognito
 * @param {any} callback
 */
function openWindowMinimized(storageKey, request, incognito, callback) {
    try {
        setWindowState(storageKey, windowState.Opening);
        let windowTop = 0;
        displayInfo.getData().then((displays) => {
            const primaryDisplay = displays.find(d => d.isPrimary) || displays[0];
            const { left, top, height } = primaryDisplay.workArea;
            windowTop = top + height - 20;
        }).catch((err) => {
            windowTop = 0;
        }).finally(() => {
            chrome.windows.create({
                url: request.url,
                type: 'popup',
                incognito: incognito,
                width: 20,
                height: 20,
                left: 0,
                top: windowTop
            }).then((win) => {
                setWindowState(storageKey, windowState.Opened, win.tabs[0]);
                callback({ 'type': 'openwindow', windowId: win.id, tabId: win.tabs[0].id, windowStorageKey: storageKey });
            }).catch((ex) => {
                handleOpenWindowFailed(storageKey);
                console.log(`[ERR] Exception in openWindowMinimized promise. ${ex.message}\nLast error: ${chrome.runtime.lastError}`);
            });
        });
    } catch (ex) {
        handleOpenWindowFailed(storageKey);
        console.log(`[ERR] Exception in openWindowMinimized. ${ex.message}\nLast error: ${chrome.runtime.lastError}`);
    }
}

function handleOpenWindowFailed(storageKey, reOpenCallback = undefined) {
    const winStateInfo = getWindowState(storageKey);
    if (winStateInfo.status !== windowState.Opened) {
        //remove window state
        removeWindowState(storageKey);
        //Try to open window in default position
        !!reOpenCallback && reOpenCallback();
    }
}

function handleAppWindowClosedEvent(closedId, getStorageKeyByIdFunc) {
    const closedWindowStorageKey = getStorageKeyByIdFunc(closedId);
    if (!closedWindowStorageKey || closedWindowStorageKey.length === 0) {
        console.log(`[ERR] handleAppWindowClosedEvent callback failed for windowId/tabId ${closedId} - Invalid closed window storage key.`);
        return;
    }

    try {
        // Send window close message back to all the listening content scripts
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {
                    type: 'onApplicationWindowRemoved',
                    responseData: { windowStorageKey: closedWindowStorageKey }
                });
            });
        });
    } catch (e) {
        console.log(`[ERR] handleAppWindowClosedEvent callback failed for ${closedWindowStorageKey}; window state windowStorageKey ${storageKey} Exception:${e.message} Last error: ${chrome.runtime.lastError}`);
    } finally {
        setWindowState(closedWindowStorageKey, windowState.Closed);
        stopHeartbeatIfNoWindowsOpen();
    }
}

function setWindowCloseCallback(storageKey, callback) {
    if (!storageKey) return;

    if (!windowCloseCallbackMap) {
        windowCloseCallbackMap = new Map();
    }
    const callbacks = windowCloseCallbackMap.get(storageKey) || [];
    //Pushes window close requests from various clients under the closing window storageKey
    callbacks.push(callback);
    windowCloseCallbackMap.set(storageKey, callbacks);
}

function windowCloseListener(closedWinId) {
    handleIntegratedWindowCloseEvent(closedWinId);
    handleAppWindowClosedEvent(closedWinId, (closedWinId) => getStorageKeyByWindowId(closedWinId));
    try {
        handleWindowClosed(closedWinId, (storageKey) => getWindowId(storageKey));
    } catch (e) {
        console.log(`[ERR] windowCloseListener failed for windowId ${closedWinId} Exception:${e.message} Last error: ${chrome.runtime.lastError}`);
    }
}

function tabCloseListener(closedTabId) {
    handleAppWindowClosedEvent(closedTabId, (closedTabId) => getStorageKeyByTabId(closedTabId));
    try {
        handleWindowClosed(closedTabId, (storageKey) => getTabId(storageKey));
    } catch (e) {
        console.log(`[ERR] tabCloseListener failed for tabId ${closedTabId} Exception:${e.message} Last error: ${chrome.runtime.lastError}`);
    }
}

function handleWindowClosed(winId, getWinIdFunc) {
    for (let [storageKey, callbacks] of windowCloseCallbackMap) {
        if (winId === getWinIdFunc(storageKey)) {
            while (callbacks && callbacks.length) {
                try {
                    //Pops each callback from the list of callbacks
                    const callback = callbacks.pop();
                    !!callback && callback({
                        'type': 'onWindowRemoved',
                        windowId: winId,
                        closed: true
                    });
                } catch (e) {
                    console.log(`[ERR] handleWindowClosed callback failed for storageKey ${storageKey} windowId/tabId ${winId} Exception:${e.message} Last error: ${chrome.runtime.lastError}`);
                }
            }
            //Deletes the closed window entry from the Map after executing all callbacks
            //clients will have to resubscribe as there is a limitation of callback expiry in existing onMessage listener
            windowCloseCallbackMap.delete(storageKey);
            break;
        }
    }
    handlePollingMapOnWindowClosed(winId, getWinIdFunc);
}

function setListener(listenerKey, storageKey, request) {
    if (!listenerKey || !storageKey) return;

    if (!listenerMap) {
        listenerMap = new Map();
    }

    let listenerItem = listenerMap.get(listenerKey) || null;
    if (!listenerItem) {
        listenerItem = new Map();
        listenerMap.set(listenerKey, listenerItem);
    }

    // if the listener is not existing then add 'listener request' to array.
    const listenerItemRequests = listenerItem.get(storageKey) || [];
    const selectedRequest = listenerItemRequests.find(obj => {
        return obj.listenerId === request.listenerId
    });
    if (!selectedRequest) {
        listenerItemRequests.push(request);
    }

    // add listener callback & request for the selected window (storageKey)
    listenerItem.set(storageKey, listenerItemRequests);
}

function initializePolling(listenerKey, pollingUrl, pollingInterval, pollingAuthorization, pollingContentType) {
    let timer = pollingTimerMap.get(listenerKey) || null;
    if (!!timer && timer !== -1) {
        console.log("Polling time already initialied for " + listenerKey);
        return;
    }

    timer = setInterval(async function (listenerKey, pollingUrl, pollingAuthorization, pollingContentType) {
        try {
            const responseData = await fetchUrl(pollingUrl, pollingAuthorization, pollingContentType);
            if (responseData) {
                onPollingSuccess(listenerKey, JSON.parse(responseData));
            }
        } catch (e) {
            console.log("Extension Polling Exception : " + listenerKey + " Message : " + e.message);
        }
    }, pollingInterval, listenerKey, pollingUrl, pollingAuthorization, pollingContentType);
    pollingTimerMap.set(listenerKey, timer);
}

async function fetchUrl(url, authorization, contentType) {
    try {
        const response = await fetch(url,
            {
                method: "GET",
                headers: {
                    Authorization: authorization,
                    'Content-Type': contentType
                }
            });
        return await response.text();
    } catch (e) {
        console.log("Extension fetch url failed : " + url);
    }
    return null;
}

function onPollingSuccess(listenerKey, responseData) {
    onListnerSuccess(listenerKey, 'onPollingSuccess', responseData);
}

function handlePollingMapOnWindowClosed(winId, getWinIdFunc) {
    if (!listenerMap) {
        return;
    }

    const expiredListenerKeyList = [];
    for (let [listenerKey, listenerItem] of listenerMap) {
        if (!!listenerItem) {
            let closedStorageKey = null;
            for (let [storageKey, pollingObject] of listenerItem) {
                if (winId === getWinIdFunc(storageKey)) {
                    closedStorageKey = storageKey;
                    break;
                }
            }

            if (!!closedStorageKey) {
                listenerItem.delete(closedStorageKey);
            }

            if (listenerItem.size === 0) {
                expiredListenerKeyList.push(listenerKey);
            }
        }
    }

    for (let i = 0; i < expiredListenerKeyList.length; i++) {
        listenerMap.delete(expiredListenerKeyList[i]);
        const timer = pollingTimerMap.get(expiredListenerKeyList[i]) || null;
        if (!!timer) {
            clearInterval(timer);
            pollingTimerMap.delete(expiredListenerKeyList[i]);
        }
    }
}

function onListnerSuccess(listenerKey, responseType, responseData) {
    const listenerItem = listenerMap.get(listenerKey) || null;
    if (!listenerItem) {
        return;
    }

    for (let [storageKey, listenerItemRequests] of listenerItem) {
        if (!!listenerItemRequests && listenerItemRequests.length > 0) {
            for (let index = 0; index < listenerItemRequests.length; index++) {
                if (!!listenerItemRequests[index]) {
                    // send response data into content script
                    try {
                        chrome.tabs.sendMessage(getTabId(storageKey),
                            {
                                type: responseType,
                                listenerKey: listenerKey,
                                request: listenerItemRequests[index],
                                responseData: responseData
                            });
                    } catch (ex) {
                        console.log(`[ERR] Exception in extension window management handler ${responseType} - (${storageKey} window - ${listenerKey}). ${ex.message}\nLast error: ${chrome.runtime.lastError}`);
                    }
                }
            }
        }
    }
}

function handleOnRegisterListner(listenerKey, listenerStorageKey, targetParams, request, sender) {
    if (!listenerKey) return;

    setListener(listenerKey, listenerStorageKey, request);
    subscribeWindowRemovedListner();

    if (!!targetParams?.storageKey) { // update target window storage key
        targetParams.storageKey = appendHostNameOnStorageKey(targetParams.storageKey, sender);
    }

    switch (listenerKey) {
        case synapseIntegratedWindowClose_ListenerKey:
            bindIntegratedWindowCloseEvent(targetParams?.storageKey, listenerKey);
            break;
        default:
            break;
    }
}

function appendHostNameOnStorageKey(storageKey, sender) {
    if (!!storageKey) { // Only from Synapse7.3.000 onwards
        const hostname = (new URL(sender.url)).hostname;
        storageKey = `${storageKey}_${hostname}`;
    }
    return storageKey;
}

function subscribeWindowRemovedListner() {
    if (!chrome.windows.onRemoved.hasListener(windowCloseListener)) {
        chrome.windows.onRemoved.addListener(windowCloseListener); // subscribes to window close events
    }
    if (!chrome.tabs.onRemoved.hasListener(tabCloseListener)) {
        chrome.tabs.onRemoved.addListener(tabCloseListener); // subscribes to tab close events
    }
}

function unSubscribeWindowRemovedListner() {
    if (chrome.windows.onRemoved.hasListener(windowCloseListener)) {
        chrome.windows.onRemoved.removeListener(windowCloseListener); // subscribes to window close events
    }
    if (chrome.tabs.onRemoved.hasListener(tabCloseListener)) {
        chrome.tabs.onRemoved.removeListener(tabCloseListener); // subscribes to tab close events
    }
}

function windowBoundChangedListener(selectedWindow) {
    if (onBoundsChangedTimeout) {
        clearTimeout(onBoundsChangedTimeout);
    }

    onBoundsChangedTimeout = setTimeout(() => {
        updateIntegratedWindowPosChanges(selectedWindow?.id);
    }, 500);
}

function bindIntegratedWindowCloseEvent(storageKey, listenerKey) {
    if (!storageKey || !listenerKey) return;

    if (!integratedWindowPosMap) {
        integratedWindowPosMap = new Map();
    }
    // Save 'Integrated window position' changes - To save this on 'Integrated Window close' event
    let positionInfo = integratedWindowPosMap.get(storageKey) || null;
    if (!positionInfo) {
        positionInfo = { tabInfo: null, listenerKeys: [] };
    }

    if (positionInfo.listenerKeys.indexOf(listenerKey) === -1) {
        positionInfo.listenerKeys.push(listenerKey);
    }

    integratedWindowPosMap.set(storageKey, positionInfo);

    if (!chrome.windows.onBoundsChanged.hasListener(windowBoundChangedListener)) {
        chrome.windows.onBoundsChanged.addListener(windowBoundChangedListener); // subscribes to window bound events
    }
}

function updateIntegratedWindowPosChanges(selectedWindowId) {
    if (!integratedWindowPosMap || (integratedWindowPosMap.size === 0) || !selectedWindowId || selectedWindowId <= 0) {
        return;
    }

    // If 'update window info on close event' is registered then update current window position on map;
    // To send this window position details to windowmanager - save into local storage & DB
    for (let [storageKey, positionInfo] of integratedWindowPosMap) {
        if (selectedWindowId === getWindowId(storageKey)) {
            getTabInfo(selectedWindowId, (currentInfo) => {
                positionInfo.tabInfo = currentInfo;
                integratedWindowPosMap.set(storageKey, positionInfo);
            });
            break;
        }
    }
}

function handleIntegratedWindowCloseEvent(closedWinId) {
    if (!integratedWindowPosMap || (integratedWindowPosMap.size === 0) || !closedWinId || closedWinId <= 0) {
        return;
    }

    try {
        for (let [storageKey, positionInfo] of integratedWindowPosMap) {
            if (closedWinId === getWindowId(storageKey)) {
                if (!positionInfo || !positionInfo.tabInfo
                    || !positionInfo.listenerKeys || positionInfo.listenerKeys.length === 0) {
                    break;
                }

                for (let index = 0; index < positionInfo.listenerKeys.length; index++) {
                    try {
                        const listenerKey = positionInfo.listenerKeys[index];
                        onListnerSuccess(listenerKey, 'windowPositionOnWindowClose', positionInfo.tabInfo);
                    } catch (e) {
                        console.log(`[ERR] handleIntegratedWindowCloseEvent callback failed for storageKey ${storageKey} windowId/tabId ${closedWinId} Exception:${e.message} Last error: ${chrome.runtime.lastError}`);
                    }
                }
                break;
            }
        }
    } catch (e) {
        console.log(`[ERR] handleIntegratedWindowCloseEvent failed for windowId ${closedWinId} Exception:${e.message} Last error: ${chrome.runtime.lastError}`);
    }
}

function handleRestore(windowId, request, callback, retryCount) {
    chrome.windows.update(windowId, {
        state: 'normal',
        left: request.left,
        top: request.top,
        height: request.height,
        width: request.width
    }).then((win) => {
        if (retryCount <= 0 || (win.height === request.height && win.width === request.width && win.top === request.top && win.left === request.left && win.state === 'normal')) {
            return callback({ 'type': 'restore', windowId: win?.id, currentWindow: win });
        }
        // Fallback mechanism for 'chrome.windows.update' issue - Sometimes the minimized window is not updating the position & state.
        // Retry mechanism - Update the window position 7 state after a small delay.
        setTimeout(() => { handleRestore(windowId, request, callback, --retryCount); }, 50);
    }, (reason) => {
        if (!reason.message.includes("Invalid value for bounds")) {
            console.log(`[ERR] handleRestore failed for windowId ${windowId} Exception:${reason} Last error: ${chrome.runtime.lastError}`);
            return callback({ 'type': 'restore', windowId: windowId, currentWindow: null });
        }
        // If the window update failed becuase of the 50% bounds are invisible then adjust the window
        chrome.system.display.getInfo((displays) => {
            const screens = displays.map(d => d.workArea);
            const width = request.width, height = request.height;
            let left = request.left, top = request.top;

            // Find the screen with max overlap (or nearest if no overlap)
            let bestScreen = screens[0], maxOverlap = -1;
            for (const screen of screens) {
                const overlapX = Math.max(0, Math.min(left + width, screen.left + screen.width) - Math.max(left, screen.left));
                const overlapY = Math.max(0, Math.min(top + height, screen.top + screen.height) - Math.max(top, screen.top));
                const overlapArea = overlapX * overlapY;
                if (overlapArea > maxOverlap) {
                    maxOverlap = overlapArea;
                    bestScreen = screen;
                }
            }

            // Clamp to the best screen only    -   horizontally & vertically
            left = Math.round(Math.max(bestScreen.left, Math.min(left, bestScreen.left + bestScreen.width - request.width)));
            top = Math.round(Math.max(bestScreen.top, Math.min(top, bestScreen.top + bestScreen.height - request.height)));

            chrome.windows.update(windowId, {
                state: 'normal',
                left,
                top,
                height,
                width
            }).then((restoreWin) => {
                return callback({ 'type': 'restore', windowId: restoreWin?.id, currentWindow: restoreWin });
            }, (errorReason) => {
                console.log(`[ERR] handleRestore failed for windowId ${windowId} after position auto adjustment completed. Exception:${errorReason} Last error: ${chrome.runtime.lastError}`);
                return callback({ 'type': 'restore', windowId: windowId, currentWindow: null });
            });
        });
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, callback) {
    logExtError();
    try {
        if (!request.isWindowManagement) {
            return false;
        }

        var tabId = sender.tab.id;
        tabId = request.tabId ? parseInt(request.tabId, 10) : tabId;
        var windowId = sender.tab.windowId;
        windowId = request.windowId ? parseInt(request.windowId, 10) : windowId;
        const storageKey = getStorageKey(request, sender);

        //Note:Ensure any newly added "return" statement does not executes before actual callback, Otherwise callback to contentScript goes with empty response and does not get executed afterwards

        if (request.moveTo) {
            var updateInfo = {
                left: request.moveTo.offsetx,
                top: request.moveTo.offsety,
                width: request.moveTo.width,
                height: request.moveTo.height
            };
            chrome.windows.update(windowId, updateInfo);
            !!callback && callback(null);
        } else if (request.type === 'openwindow') {
            const winState = getWindowState(storageKey);
            if (winState.status === windowState.Opening) {
                !!callback && callback(null);
                return;
            }
            if (winState.status === windowState.Opened && !!winState.windowInfo) {
                isWindowAlive(winState.windowInfo.id, storageKey, function (tabInfo) {
                    if (tabInfo.tabId === -1 || tabInfo.windowId === -1) {
                        openWindow(storageKey, request, sender, callback);
                    } else {
                        const requestUrl = new URL(request.url);
                        const tabUrl = new URL(tabInfo.url);
                        if (requestUrl.pathname !== tabUrl.pathname) {
                            //Open window if the same window is used for another URL
                            openWindow(storageKey, request, sender, callback);
                        }
                    }
                });
            } else {
                openWindow(storageKey, request, sender, callback);
            }
        } else if (request.type === 'opentabwindow') {
            const winState = getWindowState(storageKey);
            if (winState.status === windowState.Opening) {
                !!callback && callback(null);
                return;
            }
            if (winState.status === windowState.Opened && !!winState.windowInfo) {
                isWindowAlive(winState.windowInfo.id, storageKey, function (tabInfo) {
                    if (tabInfo.tabId === -1 || tabInfo.windowId === -1) {
                        openTabWindow(storageKey, request, sender, callback);
                    } else {
                        const requestUrl = new URL(request.url);
                        const tabUrl = new URL(tabInfo.url);
                        if (requestUrl.pathname !== tabUrl.pathname) {
                            //Open window if the same window is used for another URL
                            openTabWindow(storageKey, request, sender, callback);
                        }
                    }
                });
            } else {
                openTabWindow(storageKey, request, sender, callback);
            }
        } else if (request.type === 'maximize') {
            if (request.left && request.top && request.height && request.width) {
                chrome.windows.update(windowId, {
                    left: request.left,
                    top: request.top,
                    height: request.height,
                    width: request.width,
                    state: 'maximized'
                }).then((win) => {
                    callback({ 'type': 'maximized', windowId: win?.id, currentWindow: win });
                });
            } else {
                chrome.windows.update(windowId, { state: 'maximized' }).then((win) => {
                    callback({ 'type': 'maximized', windowId: win?.id, currentWindow: win });
                });
            }
        } else if (request.type === 'minimize') {
            chrome.windows.update(windowId, { state: 'minimized' }).then((win) => {
                callback({ 'type': 'minimized', windowId: win?.id, currentWindow: win });
            });
        } else if (request.type === 'normal') {
            const onSuccessCallback = (tabInfo) => {
                if (tabInfo?.state === 'minimized') {
                    chrome.windows.update(windowId, { state: 'normal' }).then((win) => {
                        callback({ 'type': 'normalized', windowId: win?.id, currentWindow: win, 'state': 'normal', 'stateUpdated': true });
                    });
                } else {
                    callback({ 'type': 'normalized', windowId: win?.id, currentWindow: win, 'state': tabInfo?.state, 'stateUpdated': false });
                }
            };
            getTabInfo(windowId, onSuccessCallback);
        } else if (request.type === 'restore') {
            // If restore event is from 'Help Window' then execute only once (After the help window load)
            if (/WebHelp5/i.test(sender.url)) {
                if (!helpWindowInfo.restorePending) return;
                helpWindowInfo.restorePending = false;
            }
            handleRestore(windowId, request, callback, 2);
        } else if (request.type === 'redirect') {
            // This is redirecting the tab.
            try {
                chrome.tabs.update(tabId, { url: request.url },
                    (tab) => {
                        callback({ 'type': 'redirect', windowId: tab?.windowId, tabId: tab?.id });
                    });
            } catch (ex) {
                console.log(`[ERR] Exception in extension window management handler when executing redirect. ${ex.message}\nLast error: ${chrome.runtime.lastError}`);
            }
        } else if (request.type === 'focus') {
            try {
                chrome.windows.update(windowId, { focused: true },
                    (win) => {
                        if (storageKey) {
                            tabId = getTabId(storageKey) || tabId;
                        }
                        if (!request.highlight || tabId === -1) {
                            return callback({ 'type': 'focus', windowId: win?.id, currentWindow: win });
                        }
                        chrome.tabs.get(
                            tabId, (tab) => {
                                if (!tab || (!tab.index && tab.index !== 0)) {
                                    return callback({ 'type': 'focus', windowId: win?.id, currentWindow: win });
                                }
                                chrome.tabs.highlight(
                                    {
                                        tabs: tab.index,
                                        windowId: windowId
                                    }, (win) => {
                                        callback({ 'type': 'focus', windowId: win?.id, currentWindow: win });
                                    }
                                );
                            });
                    });
            } catch (ex) {
                console.log(`[ERR] Exception in extension window management handler when executing focus. ${ex.message}\nLast error: ${chrome.runtime.lastError}`);
            }
        } else if (request.type === 'closeWindow') {
            if (!!storageKey) {
                closeWindowByWindowKey(storageKey);
            } else {
                try {
                    chrome.tabs.get(tabId, function (tab) {
                        if (tab) {
                            chrome.tabs.remove(tab.id);
                        } else {
                            console.log("[ERR] No tab exists- closeWindow failed");
                        }
                    });
                } catch (ex) {
                    console.log(`[ERR] Exception in extension window management handler when executing closeWindow. ${ex.message}\nLast error: ${chrome.runtime.lastError}`);
                } finally {
                    setWindowState(storageKey, windowState.Closed);
                }
            }
            !!callback && callback(null);
        } else if (request.type === 'reloadWindow') {
            try {
                if (storageKey) {
                    tabId = getTabId(storageKey) || tabId;
                }
                if (tabId === -1) {
                    console.log(`${storageKey} reloadWindow ignored for tabId ${tabId}`);
                    return;
                }
                chrome.tabs.get(tabId, function (tab) {
                    if (tab) {
                        chrome.tabs.reload(tab.id);
                    } else {
                        console.log("[ERR] No tab exists- reloadWindow failed");
                    }
                });
                !!callback && callback(null);
            } catch (e) {
                console.log(`[ERR] Exception in extension window management handler when executing reloadWindow. ${e.message}\nLast error: ${chrome.runtime.lastError}`);
            }
        } else if (request.type === 'saveWindowInfo') {
            if (!!storageKey) {
                setWindowState(storageKey, windowState.Opened, sender.tab);
            }
            callback({
                'type': 'saveWindowInfo',
                windowId: windowId,
                tabId: tabId
            });
        } else if (request.type === 'isAlive') {
            isWindowAlive(tabId, storageKey, callback);
        } else if (request.type === 'restoreSeriesViewer') {
            if (request.windowId) {
                // Get the size/position of the given window and cascade the current window against it.
                chrome.windows.get(request.windowId, function (win) {
                    chrome.windows.update(windowId, {
                        left: win.left + 20,
                        top: win.top + 20,
                        height: win.height,
                        width: win.width,
                        state: 'normal'
                    });
                });
            } else if (request.parentWindowId) {
                // Center against the given window
                chrome.windows.get(request.parentWindowId, function (win) {
                    chrome.windows.update(windowId, {
                        left: Math.round(win.left + win.width / 2 - 250),
                        top: Math.round(win.top + win.height / 2 - 250),
                        height: 500,
                        width: 500,
                        state: 'normal'
                    });
                });
            }
            !!callback && callback(null);
        } else if (request.type === 'tabInfo') {
            if (request?.urlCheckKeyList?.length > 0) { // get tab details based on the given URL
                return getTabInfoContainsUrlKey(request.urlCheckKeyList, callback, storageKey, true);
            } else {
                return getTabInfo(windowId, callback);
            }
        } else if (request.type === 'onWindowRemoved') {
            if (!!storageKey && !!callback) {
                setWindowCloseCallback(storageKey, callback);
                subscribeWindowRemovedListner();
            }
        } else if (request.type === 'registerWindowClosedEvent') {
            if (!!request.listenerKey) {
                subscribeWindowRemovedListner();
            }
        } else if (request.type === 'onRegisterListener') {
            if (!!storageKey && !!request.listenerKey) {
                handleOnRegisterListner(request.listenerKey, storageKey, request.targetParams, request, sender);
            }
            !!callback && callback(null);
        } else if (request.type === 'onStartPolling') {
            if (!!request.listenerKey && !!request.pollingUrl && !!request.pollingInterval && !!request.pollingAuthorization) {
                initializePolling(request.listenerKey, request.pollingUrl, request.pollingInterval, request.pollingAuthorization, request.pollingContentType);
            }
            !!callback && callback(null);
        } else if (request.type === 'onBroadcastSubscriptionStatus') {
            if (!!request.listenerKey && !!request.cacheStatus) {
                onPollingSuccess(request.listenerKey, request.cacheStatus);
            }
            !!callback && callback(null);
        } else if (request.type === 'onStopPolling') {
            handlePollingMapOnWindowClosed(tabId, (storageKey) => getTabId(storageKey));
            !!callback && callback(null);
        } else if (request.type === 'startHeartBeat') {
            startHeartBeat();
        } else {
            !!callback && callback(null);
        }
        return true;
    } catch (e) {
        console.log(`[ERR] Exception in extension window management handler. ${e.message}\nLast error: ${chrome.runtime.lastError}`);
        return false;
    }
});

let heartbeatTimeout;
// Tracks when a service worker was last alive and extends the service worker lifetime by writing the current time to extension storage every 20 seconds.
async function runHeartbeat() {
    try {
        await chrome.storage.local.set({ 'last-heartbeat': new Date().getTime() });
    } catch (e) {
        console.log(`[ERR] runHeartbeat Exception:${e.message} Last error: ${chrome.runtime.lastError}`);
    }
}

// Starts the heartbeat interval which keeps the service worker alive.
async function startHeartBeat() {
    //clear active timeout
    stopHeartbeat();
    // Run the heartbeat
    await runHeartbeat();
    // Then again every 20 seconds.
    heartbeatTimeout = setTimeout(startHeartBeat, 20 * 1000);
}

function stopHeartbeatIfNoWindowsOpen() {
    try {
        for (let [storageKey, winState] of windowStateMap) {
            if (winState?.status !== windowState.Closed) {
                return;
            }
        }
        //stop hearbeat when all windows are closed.
        stopHeartbeat();
    } catch (e) {
        console.log(`[ERR] stopHeartbeatIfNoWindowsOpen Exception:${e.message} Last error: ${chrome.runtime.lastError}`);
    }
}

function stopHeartbeat() {
    clearTimeout(heartbeatTimeout);
}

const displayInfo = (() => {
    let promise = null;
    let displays = [];
    let lastFetchTime = null;
    let expiredFetchDuration = 1800000; // 30 minutes

    function loadData() {
        displays = [];
        lastFetchTime = null;
        promise = new Promise((resolve, reject) => {
            chrome.system.display.getInfo((displayList) => {
                if (chrome.runtime.lastError || !displayList || displayList.length === 0) {
                    console.log(`[ERR] displayInfo::loadData Failed. Last error: ${chrome.runtime.lastError}`);
                    reject(chrome.runtime.lastError);
                } else {
                    displays = displayList;
                    lastFetchTime = Date.now();
                    resolve(displays);
                }
            });
        }).finally(() => {
            promise = null;
        });

        return promise;
    }

    function validateLastFetchTime() {
        if (!!lastFetchTime && ((Date.now() - lastFetchTime) > expiredFetchDuration)) {
            displays = [];
            lastFetchTime = null;
        }
    }

    return {
        getData: () => {
            validateLastFetchTime();
            if (displays?.length > 0) {
                return Promise.resolve(displays);
            } else if (null !== promise) {
                return promise; // Still loading, return the pending promise
            } else {
                return loadData();
            }
        },
        forceRefresh: () => {
            displays = [];
            lastFetchTime = null;
            return loadData();
        }
    };
})();

displayInfo.forceRefresh();