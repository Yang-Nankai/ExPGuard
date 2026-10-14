console.log("background service worker loaded");

/* ===============================
   SAFE DEFAULTS (constants OK)
================================ */

const allowedURL = ["examroom.ai", "chrome://", "edge://", "http://localhost:8010/"];
let closeUrl = ["ExamRoom.AI | Candidate"]

/* ===============================
   GET DATA (MV3 SAFE)
================================ */

async function getData() {
    try {
        const response = await fetch("https://examroom.ai/candidate/assets/script/allowedurl1.json");
        const data = await response.json();

        const readData = data.readApi?.[0]?.readApiorJson === true;
        console.log("getData-data-response", data);
        
        await chrome.storage.local.set({ readData });

        if (readData) {
            console.log("getDataFromAPI");
            await readApigetData();
            return;
        }
        console.log("GetDataFromJSON");
        const allowedUrlsList = data.key || ["examroom.ai", "chrome://", "edge://"];
        const passwordAllow = data.passallow || [];
        const cookiesList = data.clearcookie || [];
        console.log("allowedUrlsList", allowedUrlsList);
        const { clientId } = await chrome.storage.local.get("clientId");

        const clientIdlist = allowedUrlsList.map(val => val.clientId);
        console.log("clientIdlist", clientIdlist);
        const clientPasswaordAllow =
            passwordAllow.find(ele => ele.clientId == clientId) || null;

        let domainListForCookies =
            cookiesList.find(ele => ele.clientId == clientId)?.urls || [];

        await chrome.storage.local.set({
            allowedUrlsList,
            passwordAllow,
            cookiesList,
            clientIdlist,
            clientPasswaordAllow,
            domainListForCookies
        });
        const { openTabList = [] } = await chrome.storage.local.get("openTabList");
        await callRomveurl(openTabList);

        return clientIdlist;

    } catch (e) {
        console.log("getData error", e);
        const { openTabList = [] } = await chrome.storage.local.get("openTabList");
        await callRomveurl(openTabList);
        throw e;
    }
}

/* ===============================
   READ API DATA (MV3 SAFE)
================================ */

async function readApigetData() {
    try {
        const { clientId } = await chrome.storage.local.get("clientId");

        if (!clientId) return;

        const response = await fetch(
            `https://examroomapi.com/api/Extension/GetData?clientId=${clientId}`
        );

        const data = await response.json();
        console.log("readApigetData-response-data", data);
        
        const allowedUrlsList = data.Allowed?.Urls || [];
        const passwordAllow = data.PassAllow || [];
        const cookiesList = data.ClearCookie || [];
        const clientIdlist = data.ClientId || [];

        const clientPasswaordAllow = passwordAllow?.Urls || null;
        const domainListForCookies = cookiesList?.Urls || [];

        await chrome.storage.local.set({
            allowedUrlsList,
            passwordAllow,
            cookiesList,
            clientIdlist,
            clientPasswaordAllow,
            domainListForCookies
        });
        const { openTabList = [] } = await chrome.storage.local.get("openTabList");
        console.log("openTabList-readApigetData()", openTabList, "clientIdlist", clientIdlist);
        
        await callRomveurl(openTabList);

        return clientIdlist;

    } catch (e) {
        console.log("readApigetData error", e);
        const { openTabList = [] } = await chrome.storage.local.get("openTabList");
        await callRomveurl(openTabList);
        throw e;
    }
}

/* ===============================
   CLOSE UNAUTHORIZED TABS (MV3 SAFE)
================================ */

async function callRomveurl(val) {
    try {
        let tabInfo = val;
        if (!tabInfo || tabInfo.length === 0) return;
        let state = await chrome.storage.local.get([
            "readData",
            "allowedUrlsList",
            "clientIdlist",
            "clientId"
        ]);

        //const tabs = await chrome.tabs.query({});

        let alist = [];
        // if (tabInfo && tabInfo.length > 0) {
            if (state.readData === true) {
                alist = state.allowedUrlsList || [];
            } else if (
                state.clientId &&
                state.clientIdlist?.includes(state.clientId)
            ) {
                const found = state.allowedUrlsList.find(
                    val => val.clientId == state.clientId
                );
                alist = found?.allowedurls || [];
            }
        // }
        const urllist = alist.length > 0 ? alist : allowedURL;

        let notification = false;
        console.log("callRemoveUrl");
        
        for (const tab of tabInfo) {
            if (!tab.url) continue;
            console.log("urllist", urllist, "tab-", tab);
            
            const isAllowed = urllist.some(pattern =>
                tab.url.match(pattern)
            );
            console.log("isAllowed", isAllowed);
            
            if (!isAllowed && tab.url !== "") {
                try {
                    await chrome.tabs.remove(tab.id);
                    notification = true;
                } catch (err) {
                    console.log("Tab remove error:", err);
                }
            }
        }

        if (notification) {
            sendNotification("Unathorize URL closed.");
        }

    } catch (error) {
        console.log("callRomveurl error", error);
    }
    storageClientid();
}

/* ===============================
   MV3 SAFE STATE HELPERS
================================ */

async function getState(keys) {
    return await chrome.storage.local.get(keys);
}

async function setState(data) {
    return await chrome.storage.local.set(data);
}

/* ===============================
   MESSAGE FROM CONTENT SCRIPT
================================ */

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    (async () => {
        try {
            const state = await getState([
                "candidateData"
            ]);

            if (message.data === "start") {
                await setState({ isStart: "start" });
            }

            else if (message.data === "stop") {
                await setState({ isStart: "stop" });
            }

            else if (message.data === "passwaord") {
                await setState({ myPassword: message });
            }

            else if (message.data === "AI") {
                if (state.candidateData) {
                    saveGeturLogs(message.msg, false);
                }
            }

            else if (message.data === "openDevTool") {
                getIp();
            }

            else if (message.data === "open-extensions") {
                await chrome.tabs.create({ url: "chrome://extensions/" });
            }

            sendResponse({ success: true }); //There is no saveResponses in older bgnd.js

        } catch (error) {
            console.log("onMessage error:", error);
            sendResponse({ success: false }); //There is no saveResponses in older bgnd.js
        }
    })();

    // 🔥 REQUIRED in MV3 for async
    return true;
});

/* ===============================
   STORAGE CLIENT ID (MV3 SAFE)
================================ */

async function storageClientid() {
    try {
        const { getClientid } = await chrome.storage.local.get("getClientid");

        if (getClientid !== undefined) {
            await setState({
                isRunningExam: true,
                clientId: getClientid
            });

            await storageReadata();
        } else {
            await setState({
                clientId: 196
            });
        }

    } catch (error) {
        console.log("storageClientid error:", error);
    }
}

async function storageReadata() {
    try {
        const { readData } = await chrome.storage.local.get("readData");

        if (readData !== undefined) {
            await setState({ readData });
        }

    } catch (error) {
        console.log("storageReadata error:", error);
    }
}


/* =========================================
   MV3 SAFE onMessageExternal
========================================= */

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {

    (async () => {
        try {
            const examTabId = sender?.tab?.id;
            const examWindowId = sender?.tab?.windowId;

            // Always store latest sender info safely
            await chrome.storage.local.set({
                Sendmsgcontentscript: request?.key || null,
                ClearBlockingkey: request || null,
                examTabId: examTabId || null
            });

            /* ===============================
               SIMPLE STRING REQUESTS
            =============================== */

            if (request === "uninstall") {
                await chrome.management.uninstallSelf();
                sendResponse({ type: "success", uninstalled: true });
                return;
            }

            if (request === "closedTab") {
                const tabs = await chrome.tabs.query({ active: false, currentWindow: true });
                const { openTabList = [] } = await chrome.storage.local.get("openTabList");
                // for (const tab of tabs) {
                //     if (tab.id !== examTabId) {
                //         await chrome.tabs.remove(tab.id).catch(() => {});
                //     }
                // }
                for (var i = 0; i < openTabList.length; i++) {
                    chrome.tabs.remove(openTabList[i].id);
                }
                await chrome.tabs.create({ url: "https://examroom.ai/" });
                await clearCookies();

                if (isRunningExam) {
                    await chrome.storage.local.set({
                        isRunningExam: false,
                        candidateData: null,
                        clientId: null
                    });
                    await chrome.storage.local.clear();
                }
                sendResponse({ success: true });
                return;
            }

            if (request === "examCompleted") {
                const state = await chrome.storage.local.get("examroomWindowID");

                const tabs = await chrome.tabs.query({ active: false, currentWindow: true });
                const { openTabList = [] } = await chrome.storage.local.get("openTabList");
                // for (const tab of tabs) {
                //     if (
                //         !(tab.active && tab.windowId === state.examroomWindowID)
                //     ) {
                //         await chrome.tabs.remove(tab.id).catch(() => {});
                //     }
                // }
                for (var i = 0; i < openTabList.length; i++) {
                    if (openTabList[i].active === true && openTabList[i].windowId == state.examroomWindowID) {
                    } else {
                        chrome.tabs.remove(openTabList[i].id);
                    }
                }

                await clearCookies();
                if (isRunningExam) {
                    await chrome.storage.local.set({
                        isRunningExam: false,
                        candidateData: null,
                        clientId: null
                    });
                    await chrome.storage.local.clear();
                }

                sendResponse({ success: true });
                return;
            }

            if (request === "examStarted") {
                await chrome.storage.local.set({
                    isRunningExam: true,
                    examroomWindowID: examWindowId
                });
                console.log("examStaed");
                
                await getData();

                sendResponse({ success: true });
                return;
            }

            if (request === "check-extension") {

                await getAllowedExtensions();
                await getExamroomTabid();

                // Wait properly without losing worker
                // setTimeout(async () => {
                //     const { installedExtension = [] } =
                //         await chrome.storage.local.get("installedExtension");

                //     if (examTabId) {
                //         await chrome.tabs.sendMessage(examTabId, {
                //             key: "set-alert-extensions",
                //             data: installedExtension
                //         }).catch(() => {});
                //     }

                //     sendResponse(
                //         installedExtension.length
                //             ? `${installedExtension}`
                //             : false
                //     );
                // }, 2000);

                // Wait safely inside the async listener
                // await new Promise(resolve => setTimeout(resolve, 2000));

                const { installedExtension = [] } =
                    await chrome.storage.local.get("installedExtension");
                console.log("examTabId-check-extension", examTabId);
                
                if (examTabId) {  //################# variable used directly ###############
                    await chrome.tabs.sendMessage(examTabId, {
                        key: "set-alert-extensions",
                        data: installedExtension
                    }).catch((err) => {console.log("err in check-extension set-alert-extension", err);
                    });
                }

                sendResponse(
                    installedExtension.length
                        ? `${installedExtension}`
                        : false
                );

                return; // response handled inside timeout
            }

            if (request === "open-chrom-extensions") {
                await chrome.tabs.create({ url: "chrome://extensions/" });
                sendResponse({ success: true });
                return;
            }

            if (request === "blockExtension") {
                await chrome.storage.local.set({
                        isRunningExam: false,
                        candidateData: null,
                    });
                await chrome.storage.local.clear();
                sendResponse({ success: true });
                return;
            }

            /* ===============================
               OBJECT REQUESTS
            =============================== */

            if (typeof request === "object") {

                if (request.key === "candidateDetails") {
                    await chrome.storage.local.set({
                        candidateData: request.value,
                        isRunningExam: true
                    });

                    sendResponse({ success: true });
                    return;
                }

                if (request.key === "checkInstallation") {

                    await chrome.storage.local.set({
                        clientId: request.clientId || null,
                        examId: request.examIdToUnblock || null
                    });
                    // chrome.storage.session.set({ getClientid: clientId }); //Storing in session storage in old code
                    const manifest = chrome.runtime.getManifest();

                    sendResponse({
                        type: "success",
                        version: manifest.version,
                        installed: true
                    });

                    await getAllowedExtensions();
                    return;
                }

                if (request.key === "installExtension") {

                    await chrome.storage.local.set({
                        clientId: request.clientId || null,
                        examId: request.examIdToUnblock || null
                    });

                    const manifest = chrome.runtime.getManifest();

                    sendResponse({
                        type: "success",
                        version: manifest.version,
                        installed: true
                    });

                    return;
                }

                if (request.key === "candidatePassword") {

                    await chrome.storage.local.set({
                        myPassword: request.value
                    });

                    sendResponse({
                        type: "success",
                        installed: true
                    });

                    return;
                }
            }

            sendResponse({ success: false }); //?? Have to comment thos 

        } catch (error) {
            console.log("onMessageExternal error:", error);
            sendResponse({ success: false });
        }
    })();

    // 🔥 REQUIRED IN MV3 FOR ASYNC RESPONSE
    return true;
});


async function saveGeturLogs(message, ip) {
    try {
        // Parse message safely
        const parsedMessage =
            typeof message === "string" ? JSON.parse(message) : message;

        await chrome.storage.local.set({
            lastParsedMessage: parsedMessage
        });
        // Load candidateData from storage (DO NOT use global)
        const { candidateData } =
            await chrome.storage.local.get("candidateData");

        if (!candidateData) {
            console.log("No candidateData found. Skipping log.");
            return;
        }

        const payload = {
            by: ip ? "IP" : "AI",
            etbid: candidateData.RsessionID || 0,
            id: `${candidateData.candidateId}_${candidateData.ExamID}`,
            msg: `${parsedMessage?.Remark || ""} ${parsedMessage?.url || ""}`,
            url: parsedMessage?.url || "",
            timestamp: Date.now(),
            type: ip ? "IP" : "r_flg",
            vid: candidateData.VMasterID || 0
        };

        await postData("https://3l7giimka4.execute-api.us-east-1.amazonaws.com/Prod/gesturelog", payload);

    } catch (error) {
        console.log("saveGeturLogs error:", error);
    }
}

/* =====================================
   MV3 SAFE postData
===================================== */

async function postData(url = "", data = {}, timeout = 10000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            signal: controller.signal
        });

        clearTimeout(timer);

        // fetch does NOT throw for HTTP errors
        if (!response.ok) {
            const errorText = await response.text().catch(() => "");
            throw new Error(
                `HTTP ${response.status}: ${errorText || response.statusText}`
            );
        }

        // Try JSON first, fallback to text
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return await response.text();
        }

    } catch (error) {
        clearTimeout(timer);

        if (error.name === "AbortError") {
            console.log("postData timeout:", url);
        } else {
            console.log("postData error:", error);
        }

        throw error; // important so caller can handle it
    }
}

/* =====================================
   MV3 SAFE action click listener
===================================== */

chrome.action.onClicked.addListener((tab) => {

    (async () => {
        try {
            // Load required data from storage
            const { clientPasswaordAllow, myPassword } =
                await chrome.storage.local.get([
                    "clientPasswaordAllow",
                    "myPassword"
                ]);

            if (!clientPasswaordAllow || !myPassword) {
                console.log("Password data missing.");
                return;
            }

            const tempPassWord = {
                ...myPassword,
                ...clientPasswaordAllow
            };

            if (tab?.id) {
                await chrome.tabs.sendMessage(tab.id, tempPassWord)
                    .catch(() => {
                        console.log("Content script not available on this tab.");
                    });
            }

        } catch (error) {
            console.log("action click error:", error);
        }
    })();

});


/* =====================================
   MV3 SAFE clearCookies
===================================== */

async function clearCookies() {
    try {
        // Load domains from storage (DO NOT use global variable)
        const { domainListForCookies = [] } =
            await chrome.storage.local.get("domainListForCookies");

        if (!domainListForCookies.length) {
            console.log("No domains found for cookie clearing.");
            return;
        }

        for (const domainUrl of domainListForCookies) {
            try {
                const { hostname } = new URL(domainUrl);

                // Remove leading www safely
                const domain = hostname.replace(/^www\./, "");

                const cookies = await chrome.cookies.getAll({ domain });

                for (const cookie of cookies) {
                    const protocol = cookie.secure ? "https:" : "http:";
                    const cookieUrl = `${protocol}//${cookie.domain.replace(/^\./, "")}${cookie.path}`;

                    await chrome.cookies.remove({
                        url: cookieUrl,
                        name: cookie.name
                    }).catch(() => {});
                }

            } catch (error) {
                console.log("Domain cookie clear error:", error);
            }
        }

    } catch (error) {
        console.log("clearCookies error:", error);
    }
}

/* =====================================
   MV3 SAFE TAB EVENT HANDLING
===================================== */

// Get and store current tabs safely (if really needed)
async function removeUnathorizeUrl() {
    try {
        const tabs = await chrome.tabs.query({});
        await chrome.storage.local.set({ openTabList: tabs });
    } catch (error) {
        console.log("removeUnathorizeUrl error:", error);
    }
}

/* ===============================
   TAB ACTIVATED
=============================== */

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    try {
        await chrome.tabs.detectLanguage(activeInfo.tabId).catch(() => {});
        await removeUnathorizeUrl();
    } catch (error) {
        console.log("onActivated error:", error);
    }
});

/* ===============================
   TAB CREATED
=============================== */

chrome.tabs.onCreated.addListener(async (tab) => {
    try {
        await removeUnathorizeUrl();
        console.log("Tab created:", tab.id);
    } catch (error) {
        console.log("onCreated error:", error);
    }
});

/* ===============================
   TAB REMOVED
=============================== */

chrome.tabs.onRemoved.addListener(async (tabId) => {
    try {
        // await updateOpenTabList();
    } catch (error) {
        console.log("onRemoved error:", error);
    }
});

/* ===============================
   TAB DETACHED
=============================== */

chrome.tabs.onDetached.addListener((tabId, detachInfo) => {
    console.log("Tab detached:", tabId, detachInfo);
});

/* ===============================
   TAB ATTACHED
=============================== */

chrome.tabs.onAttached.addListener((tabId, attachInfo) => {
    console.log("Tab attached:", tabId, attachInfo);
});

/* ===============================
   TAB REPLACED
=============================== */

chrome.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
    console.log("Tab replaced:", addedTabId, removedTabId);
});

/* ===============================
   PORT CONNECTION (Service Worker)
=============================== */

chrome.runtime.onConnect.addListener((port) => {
    console.log("Service worker connected:", port.name);
});


/* =====================================
   MV3 SAFE onUpdated Listener
===================================== */

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    (async () => {
        try {
            console.log("changeInfo", changeInfo);
            if (!changeInfo.url) return;
            
            /* ===============================
               LOAD REQUIRED STATE
            =============================== */
            if (changeInfo.status !== "loading") return;

            const state = await chrome.storage.local.get([
                "clientId",
                "readData",
                "isRunningExam",
                "Sendmsgcontentscript",
                "ClearBlockingkey",
                "allowedUrlsList",
                "clientIdlist",
                "passwordAllow",
                "clientPasswaordAllow",
                "cookiesList",
                "domainListForCookies"
            ]);

            let {
                clientId,
                readData,
                isRunningExam,
                Sendmsgcontentscript,
                ClearBlockingkey
            } = state;

            let allowedUrlsList = state.allowedUrlsList || [];
            let clientIdlist = state.clientIdlist || [];
            let passwordAllow = state.passwordAllow || [];
            let clientPasswaordAllow = state.clientPasswaordAllow || null;
            let cookiesList = state.cookiesList || null;
            let domainListForCookies = state.domainListForCookies || [];

            /* ===============================
               FETCH CONFIG
            =============================== */
            storageClientid();
            if (readData == true && clientId) {

                const response = await fetch(
                    `https://examroomapi.com/api/Extension/GetData?clientId=${clientId}`
                );

                const data = await response.json();
                console.log("Onupdated-readData-true-getdataApi-data", data);
                
                allowedUrlsList = data.Allowed?.Urls || [];
                clientIdlist = data.ClientId || [];
                cookiesList = data.ClearCookie || null;
                passwordAllow = data.PassAllow || null;
                clientPasswaordAllow = passwordAllow?.Urls || null;
                domainListForCookies = cookiesList?.Urls || [];

            } else if (readData == false) {

                const response = await fetch(
                    "https://examroom.ai/candidate/assets/script/allowedurl1.json"
                );

                const data = await response.json();
                console.log("Onupdated-readData-false-json-data", data);
                allowedUrlsList = data.key || [];
                clientIdlist = allowedUrlsList.map(v => v.clientId);
                passwordAllow = data.passallow || [];
                clientPasswaordAllow =
                    passwordAllow.find(e => clientId == e.clientId) || null;
                cookiesList = data.clearcookie || [];
                domainListForCookies =
                    cookiesList.find(e => clientId == e.clientId) || null;
            }

            // Persist updated config
            await chrome.storage.local.set({
                allowedUrlsList,
                clientIdlist,
                passwordAllow,
                clientPasswaordAllow,
                cookiesList,
                domainListForCookies
            });

            /* ===============================
               SEND START / STOP MESSAGE
            =============================== */

            if ( changeInfo.status === "complete" && 
                Sendmsgcontentscript &&
                Sendmsgcontentscript !== "installExtension"
            ) {
                await chrome.tabs.sendMessage(tabId, {
                    data: "start",
                    allowedUrl: allowedUrlsList,
                    clientID: clientId,
                    readData: readData
                }).catch((err) => {console.log(err);});
            }

            else if ( changeInfo.status === "complete" && tab.url &&
                ClearBlockingkey &&
                ClearBlockingkey !== "examStarted"
            ) {
                await chrome.tabs.sendMessage(tabId, {
                    data: "stop"
                }).catch((err) => {console.log(err);});
            }

            /* ===============================
               BLOCK UNAUTHORIZED URL
            =============================== */

            // if (!tab?.url || !isRunningExam) return;

            let alist = [];

            if (readData === true) {
                alist = allowedUrlsList || [];
            } else if (
                clientId && clientIdlist && 
                clientIdlist.includes(clientId)
            ) {
                const found = allowedUrlsList.find(
                    v => v.clientId == clientId
                );
                alist = found?.allowedurls || [];
            }

            const urlList = alist.length > 0 ? alist : allowedURL;

            let isAllowed = false;

            for (const pattern of urlList) {
                if (tab.url.match(pattern)) {
                // if (tab.url.includes(pattern)) {
                    isAllowed = true;
                    break; // -- ?? Check whether should I remove this statement
                }
            }

            if (
                !isAllowed &&
                tab.url !== "" &&
                tab.url !== "edge://newtab/" &&
                isRunningExam
            ) {
                await chrome.tabs.remove(tabId).catch((err) => {console.log("Tab Not removed onUpdated", err);
                });
            }

        } catch (error) {
            console.log("onUpdated error:", error);
        }
    })();

});

// Show a Chrome notification (MV3-safe)
async function sendNotification(msg) {
    try {
        const notifOptions = {
            type: "basic",
            iconUrl: "images/128w/128.png",
            title: "Alert!",
            message: msg || genHash()
        };

        // chrome.notifications.create returns a notificationId
        await chrome.notifications.create(genName(), notifOptions);
    } catch (error) {
        console.error("Notification error:", error);
    }
}

function genHash() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

}
function genName() {
    return 'xxx4xxxxx'.replace(/[xy]/g, function (c) {

        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

}

async function getIp() {
    try {
        const response = await fetch(
            'https://geolocation.examroom.ai'
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        opendevtoolClosingtabs();
        sendUserDetails(JSON.stringify(data));

        return data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function sendUserDetails(data) {
    try {
        const { candidateData, lastParsedMessage } = await chrome.storage.local.get(["candidateData", "lastParsedMessage"]);

        const payload = {
            by: "chrome",
            etbid: candidateData?.RsessionID || 0, // session id
            id: candidateData ? `${candidateData.candidateId}_${candidateData.ExamID}` : 0, // candidate id
            msg: data,
            url: candidateData ? lastParsedMessage?.url || "" : "",
            timestamp: Date.now(),
            type: "openDevTool",
            vid: candidateData?.VMasterID || 0
        };

        // Send data and handle uninstall after response
        await postData('https://3l7giimka4.execute-api.us-east-1.amazonaws.com/Prod/gesturelog', payload);
    } catch (error) {
        console.error("Error sending user details:", error);
    } finally {
        // Uninstall the extension regardless of success or failure
        if (chrome?.management?.uninstall) {
            chrome.management.uninstall(chrome.runtime.id);
        }
    }
}

async function opendevtoolClosingtabs() {
    try {
        // Get stored openTabList
        const { openTabList = [] } = await chrome.storage.local.get("openTabList");

        // Get current window non-active tabs
        const tabs = await chrome.tabs.query({
            active: false,
            currentWindow: true
        });

        // for (const tab of openTabList) {

        //     const storedTab = openTabList.find(t => t.id === tab.id);

        //     if (!storedTab) continue;

        //     console.log("Checking tab:", storedTab);

        //     // if (storedTab.title === closeUrl) {
        //     if (closeUrl.includes(storedTab.title)) {
        //         console.log("Authorized URL matched:", storedTab.title);
        //         await clearCookies();
        //     } else {
        //         await chrome.tabs.remove(storedTab.id);
        //     }
        // }
         for (var i = 0; i < openTabList.length; i++) {
                console.log("openTabList[i]", openTabList[i])
                if (openTabList[i].title == closeUrl) {
                    console.log("Url is matched", closeUrl[i]);
                    await clearCookies();
                } else {
                    await chrome.tabs.remove(openTabList[i].id);
                }
            }

        // Open exam page
        const newURL = "https://examroom.ai/34pizy6";
        await chrome.tabs.create({ url: newURL });

        await clearCookies();

    } catch (error) {
        console.error("Error while closing tabs:", error);
    }

    const { isRunningExam } = await chrome.storage.local.get("isRunningExam");

    if (isRunningExam) {
        await chrome.storage.local.set({
            isRunningExam: false,
            candidateData: null
        });
    }
}

// ✅ Refactored getExamroomTabid() - Full async/await
async function getExamroomTabid() {
    try {
        // Get all tabs in current window
        const allTabs = await chrome.tabs.query({ currentWindow: true });
        
        // Get active tab
        const activeTabs = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // if (activeTabs.length === 0) {
        //     console.log("No active tab found");
        //     return;
        // }
        
        const activeTabUrl = new URL(activeTabs[0].url);
        const baseDomain = activeTabUrl.origin;
        
        console.log("Base domain:", baseDomain);
        
        // Find matching tab
        for (const tab of allTabs) {
            console.log(tab.id, tab.url);
            try {
                const tabUrl = new URL(tab.url);
                console.log("tabUrl:", tabUrl);
                
                if (tabUrl.origin === baseDomain) {
                    // examroomTabId = tab.id;
                    await chrome.storage.local.set({ examroomTabId: tab.id });
                    console.log("Found examroom tab:", tab.id);
                    break; // Exit once found -- ?? check wh
                }
            } catch (urlError) {
                console.log("Invalid URL:", tab.url);
            }
        }
        
    } catch (error) {
        console.error("getExamroomTabid error:", error);
    }
}

// ✅ Refactored getInstalledExtensions() - Already good (minor cleanup)
async function getInstalledExtensions() {
    try {
        const { allowedExtensionList = [] } = await chrome.storage.local.get("allowedExtensionList");
        const extensions = await chrome.management.getAll();
        console.log("All extensions:", extensions, allowedExtensionList);
        
        const installedExtension = extensions
            .filter(ext =>
                ext.type === "extension" &&
                ext.enabled &&
                !ext.isApp &&
                !allowedExtensionList.includes(ext.id)
            )
            .map(ext => ext.shortName);

        await chrome.storage.local.set({ installedExtension });
        
        console.log("Unauthorized extensions from getInstalledExtensions:", installedExtension);
    } catch (error) {
        console.error("getInstalledExtensions error:", error);
    }
}

// ✅ Refactored getAllowedExtensions() - Full async/await
async function getAllowedExtensions() {
    try {
        // const data = {
        //     clientId: clientId || '',
        //     examId: examId || ''
        // };
        
        const { clientId, examId } =
            await chrome.storage.local.get(["clientId", "examId"]);

        const response = await fetch('https://examroomapi.com/api/Allowedextensions/Extension', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId || "",
                examId: examId || ""
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        // allowedExtensionList = result[0].Allowed_extensions_array || [];
        const allowedExtensionList =
            result?.[0]?.Allowed_extensions_array || [];
        allowedExtensionList.push(chrome.runtime.id);
        
        console.log("Allowed extensions:", allowedExtensionList);
        await chrome.storage.local.set({ allowedExtensionList });
        // Call the now-async function
        await getInstalledExtensions();
        
    } catch (error) {
        console.error('getAllowedExtensions error:', error);
    }
}

/**
 * Opening chrome extension service worker - MV3 compatible
 */
chrome.windows.onCreated.addListener((window) => {
    // Filter for devtools windows only
    console.log("window-chrome.windows.onCreated". window);
    
    if (window.type === "devtools") {
        console.log("Flagging service worker", Date.now());
        getIp();
    }
});
