// Copyright ©2022-2026 FUJIFILM Healthcare Americas Corporation. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic, mechanical or otherwise, is prohibited without the prior written consent of the copyright owner.
// Filename: bsNativeMessage.js

var port = null;
var callbacks = {};
var connections = {};
var initFailureCallback = null;
var lastError = null;

/**
 * Check for chrome error and log the error message
 */
function logExtError() {
    chrome.runtime.lastError && console.log(`[Messaging Extension]:${chrome.runtime.lastError.message}`);
}

/**
 * Connect the port to native messaging hub.
 */
function connectPort() {
    try {
        this.port = chrome.runtime.connectNative("fujifilm.synapse.nativemessaging");
        this.port.onDisconnect.addListener(onPortDisconnected);
        this.port.onMessage.addListener(onPortMsgReceived);
        // check port validity, even if the native host is not available, we will get a allocated port
        // but to verify the port is valid, we should try out postMessage this will give you exception if port is invalid. most of the time
        this.port.postMessage({ type: 'warmup', key: '', param: '' });

        this.callbacks["nativeHostStartup"] = (msg) => {
            logExtError();
            // only sending message to tabs which loaded the content script.
            // it will avoid unnecessary exception logging
            chrome.tabs.query({ url: chrome.runtime.getManifest().content_scripts[1].matches },
                (tabs) => {
                    logExtError();
                    tabs.forEach(tab => { chrome.tabs.sendMessage(tab.id, { action: msg, errorCode: null }); });
                });
        }

        // disconnect callback registering. this will call during onDisconnect
        this.callbacks["nativeHostDisconnect"] = (data) => {
            logExtError();
            chrome.tabs.query({ url: chrome.runtime.getManifest().content_scripts[1].matches },
                (tabs) => {
                    logExtError();
                    tabs.forEach(tab => { chrome.tabs.sendMessage(tab.id, { action: "nativeHostDisconnect", errorCode: lastError }); });
                    lastError = null;
                });
        };
    } catch (e) {
        this.port = null;
        return false;
    }
    return true;
};

function clear() {
    this.port = null;
    this.connections = {};
    terminateCallbacks();
}

function terminateCallbacks() {
    try {
        //Informs any infinitely waiting pending callback about the port disconnect
        if (!this.callbacks) return;
        for (let key in this.callbacks) {
            const callback = this.callbacks[key];
            try {
                !!callback && callback(null);
            } catch (e) {
            }
        }
    } catch (e) {
    } finally {
        this.callbacks = {};
    }
}

/**
 * Message receiver from native host.Framework invoked this, when native host writes to output stream
 * @param {any} message - string message from hub
             */
function onPortMsgReceived(message) {
    logExtError();
    try {
        if (!message || !message.key) return;
        const callback = this.callbacks[message.key];
        !!callback && callback(message.data);
        delete this.callbacks[message.key];
    } catch (e) {
    }
}

/**
 * Framework invoke this when port is disconnected
 */
function onPortDisconnected() {
    logExtError();
    try {
        this.clear();
    } catch (e) {
        this.port = null;
    }
};

/**
 * Listener for nativeMessage.js events
 */
chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    logExtError();
    try {
        // message not belongs to here
        if (!request.isNativeMsg) return false;

        if (request.type === "InitPort") {
            const ref = parseInt(this.connections[sender.origin]);
            this.connections[sender.origin] = isNaN(ref) ? 1 : ref + 1;
            if (!!port) {
                callback();
                return true;
            }
            if (connectPort()) { callback(); }
            return true;
        }

        if (!port) {
            callback(request.type === "LaunchHybridViewer" ? false : null);
            return false;
        }

        let sendMsg = true;
        // If logging off from synapse, unload the messaging hub without checking ref count.
        if (request.type === "UnloadHub" && !request.isLogoff) {
            const ref = parseInt(this.connections[sender.origin]);
            if (ref > 1) {
                this.connections[sender.origin] = ref - 1;
                return true;
            }
            delete this.connections[sender.origin];
            sendMsg = Object.keys(this.connections).length === 0; // reference count is zero, send unload msg to NativeHub
        }

        if (sendMsg) {
            const key = request.type + "_" + Date.now();
            const param = !request.param ? "" : request.param;
            port.postMessage({ type: request.type, key: key, param: param });
            //callback collects against <ActionName>_<Tick Count> key for handling parallel calls.
            if (!!callback) {
                this.callbacks[key] = callback;
            }
            // clear the variables after sending exit message to native exe.
            request.type === "UnloadHub" && this.clear();
        }
        return true;
    } catch (e) {
        console.log(`[ERR] Exception in extension native messaging handler. ${e.message}\nLast error: ${chrome.runtime.lastError}`);
        return false;
    }
});