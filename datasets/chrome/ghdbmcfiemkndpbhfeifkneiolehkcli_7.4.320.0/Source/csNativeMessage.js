// Copyright ©2022-2026 FUJIFILM Healthcare Americas Corporation. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic, mechanical or otherwise, is prohibited without the prior written consent of the copyright owner.
// Filename: csNativeMessage.js

function logExtError(err) {
    err && console.log(`[Messaging Extension]:${err.message}`);
}

window.onerror = function (e, source, line, col, err) {
    console.log(`[ERR]: at ${source} (${line},${col})\n${err.message}`);
    logExtError(chrome.runtime.lastError);
}

function postPageEvent(eventName, param = null) {
    document.dispatchEvent(new CustomEvent(eventName, { bubbles: false, cancelable: true, detail: param }));
}

function init() {
    document.documentElement.setAttribute("native", true);
    postPageEvent("nativeHostInit");

    // pre-fetch hostname
    if (!!document.documentElement.getAttribute("hostName")) return;

    // taking hostname when the document gets ready (once the worklist opens)
    getHostName();
}

async function getHostName() {
    const docEl = document.documentElement;

    try {
        // If hostname already set, return it early
        const existingHostName = docEl.getAttribute("hostName");
        if (existingHostName) {
            return existingHostName;
        }

        // Fetch hostname via chrome runtime message
        const response = await chrome.runtime.sendMessage({ isNativeMsg: true, type: "GetHostName" });
        const hostName = response?.toUpperCase();

        if (hostName) {
            docEl.setAttribute("hostName", hostName);
            localStorage.setItem("Synapse.Extension.HostName", hostName);
        }

        return hostName;
    } catch (err) {
        logExtError(err);
        return null;
    }
}

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        logExtError(chrome.runtime.lastError);
        if (message.action === "nativeHostDisconnect") {
            document.documentElement.setAttribute("native", false);
            document.documentElement.setAttribute("hostName", "");
        }
        postPageEvent(message.action, message.errorCode);
    });

// document ready equivalent listener
document.addEventListener(
    "DOMContentLoaded",
    function () {
        // set this to document so that client can read it.
        document.documentElement.setAttribute("extension", true);

        // initialize port for native messaging
        chrome.runtime.sendMessage({ isNativeMsg: true, type: "InitPort" })
            .then(response => init())
            .catch(err => logExtError(err));
    }
);

// Unload the SynapseMessaging.exe.
window.addEventListener(
    "pagehide",
    function (event) {
        // background script will handle the termination of messaging hub
        // based on the reference count against the origin url
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, isLogoff: false, type: "UnloadHub" }).catch(err => logExtError(err));
        } catch (ex) {
            console.log("[ERR] Exception in pagehide. " + ex.message);
        }
    }
);

// Unload the SynapseMessaging.exe during synapse logoff.
document.addEventListener(
    "unloadHub",
    function (event) {
        // forceful termination of hub. this message will post from worklist log off
        // background script will handle the termination of messaging hub
        localStorage.removeItem("Synapse.Extension.HostName");
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, isLogoff: true, type: "UnloadHub" }).catch(err => logExtError(err));
        } catch (ex) {
            console.log("[ERR] Exception in unloadHub. " + ex.message);
        }
    },
    true
);

document.addEventListener(
    "getHostName",
    async () => {
        try {
            const hostName = await getHostName();
            postPageEvent("onGetHostName", hostName);
        } catch (ex) {
            // when extension disabled in between, exception will happen for chrome.runtime.sendMessage
            console.log(`[ERR] Exception in getHostName: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "launchApplication",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "LaunchApplication", param: event.detail }).catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in launchApplication: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "logMessage",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "LogMessage", param: event.detail }).catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in logMessage: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "traceMemory",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "TraceMemory", param: event.detail }).catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in traceMemory: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "lockCursor",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "LockCursor", param: event.detail }).catch(err => logExtError(err));
        } catch (exe) {
            console.log(`[ERR] Exception in lockCursor: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "releaseCursor",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "ReleaseCursor" }).catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in releaseCursor: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "setCursorPosition",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "SetCursorPosition", param: event.detail }).catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in setCursorPosition: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "getColorMonitorRect",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "GetColorMonitorRect", param: event.detail })
                .then(response => postPageEvent("onGetColorMonitorRect", response))
                .catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in getColorMonitorRect: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "getDirectPrintScheme",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "GetDirectPrintScheme" })
                .then(response => postPageEvent("onGetDirectPrintScheme", response))
                .catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in getDirectPrintScheme: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "getDefaultPrinterSettings",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "GetDefaultPrinterSettings" })
                .then(response => postPageEvent("onGetDefaultPrinterSettings", response))
                .catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in getDefaultPrintSettings: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "doDirectPrint",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "DoDirectPrint", param: event.detail }).catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in doDirectPrint: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "getHybridStatus",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "GetHybridStatus" })
                .then(response => postPageEvent("onGetHybridStatus", response))
                .catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in getHybridStatus: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "launchHybridViewer",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "LaunchHybridViewer", param: event.detail })
                .then(response => postPageEvent("onLaunchHybridViewer", response))
                .catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in launchHybridViewer: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "launchDiagnosticViewer",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "LaunchDiagnosticViewer", param: event.detail })
                .then(response => postPageEvent("onLaunchDiagnosticViewer", response))
                .catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in launchDiagnosticViewer: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "getMemoryUsage",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "GetMemoryUsage" })
                .then(response => postPageEvent("onGetMemoryUsage", response))
                .catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in getMemoryUsage: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "getUserId",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "GetUserId" })
                .then(response => postPageEvent("onGetUserId", response))
                .catch(err = logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in getUserId: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "getRegistryValue",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "GetRegistryValue", param: event.detail })
                .then(response => postPageEvent("onGetRegistryValue", response))
                .catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in getRegistryValue: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "setRegistryValue",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "SetRegistryValue", param: event.detail }).catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in setRegistryValue: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "getLastInputTime",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "GetLastInputTime", param: event.detail })
                .then(response => postPageEvent("onGetLastInputTime", response))
                .catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in getLastInputTime: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "getKeyStatus",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "GetKeyStatus", param: event.detail })
                .then(response => postPageEvent("onGetKeyStatus", response))
                .catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in getKeyStatus: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "getMachineSettings",
    function (event) {
        try {
            chrome.runtime.sendMessage({ isNativeMsg: true, type: "GetMachineSettings" })
                .then(response => postPageEvent("onGetMachineSettings", response))
                .catch(err => logExtError(err));
        } catch (ex) {
            console.log(`[ERR] Exception in getMachineSettings: ${ex.message}`);
        }
    },
    true
);

document.addEventListener(
    "isActive",
    function (event) {
        try {
            // dummy post page event to keep the extension active
            postPageEvent("onActive", true);
        } catch (ex) {
            console.log(`[ERR] Exception in isActive: ${ex.message}`);
        }
    },
    true
);