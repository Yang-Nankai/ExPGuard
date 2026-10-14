// If extension does not have a popup, this will be executed
// when the extension icon is clicked
chrome.action.onClicked.addListener(async tab => {
    try {
        await chrome.scripting.insertCSS({
            target: {
                tabId: tab.id
            },
            files: ['css/capture.css']
        });
        await chrome.scripting.executeScript({
            target: {
                tabId: tab.id
            },
            files: ['js/capture.js']
        });
    }
    catch (e) {
        console.error(e);
    }
});

// Hotkeys
chrome.commands.onCommand.addListener((command) => {
    const settings = {
        useHotKeys: false,
        etfi: false
    };
    // get settings from storage and then react to the hotkey
    // if the option is enabled
    chrome.storage.sync.get(settings).then((prefs) => {
        if (prefs.etfi.length >= 18 && prefs.etfi.charAt(17) === '1' && prefs.useHotKeys) {
            switch (command) {
                case 'extract-text':
                    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
                        try {
                            const tabId = tabs[0].id;
                            await chrome.scripting.insertCSS({
                                target: {
                                    tabId: tabId
                                },
                                files: ['css/capture.css']
                            });
                            await chrome.scripting.executeScript({
                                target: {
                                    tabId: tabId
                                },
                                files: ['js/capture.js']
                            });
                        }
                        catch (e) {
                            console.error(e);
                        }
                    });
                    break;
                case 'open-history':
                    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
                        try {
                            // open languages popup
                            const tabId = tabs[0].id;
                            await chrome.scripting.executeScript({
                                target: {
                                    tabId: tabId
                                },
                                files: ['js/history-app.js']
                            });
                        }
                        catch (e) {
                            console.error(e);
                        }
                    });
                    break;
                case 'open-languages':
                    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
                        try {
                            // open languages popup
                            const tabId = tabs[0].id;
                            await chrome.scripting.executeScript({
                                target: {
                                    tabId: tabId
                                },
                                files: ['js/langs-app.js']
                            });
                        }
                        catch (e) {
                            console.error(e);
                        }
                    });
                    break;
                case 'open-uploader':
                    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
                        try {
                            const tabId = tabs[0].id;
                            await chrome.scripting.executeScript({
                                target: {
                                    tabId: tabId
                                },
                                files: ['js/uploader-app.js']
                            });
                        }
                        catch (e) {
                            console.error(e);
                        }
                    });
                    break;
            }
        }
    });

});

let lastCapturedData = null;
let dataForLangsPage = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    chrome.management.getSelf((self) => {
        if (self.installType == 'development') {
            console.log('[DEV] received message from content script: ', request, sender);
        }
    });

    if (request.message === 'capture_text') {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            try {
                const tabId = tabs[0].id;
                await chrome.scripting.insertCSS({
                    target: {
                        tabId: tabId
                    },
                    files: ['css/capture.css']
                });
                await chrome.scripting.executeScript({
                    target: {
                        tabId: tabId
                    },
                    files: ['js/capture.js']
                });

                // need to send any response, otherwise the callback
                // in the popup will not work
                sendResponse({});
            }
            catch (e) {
                sendResponse({
                    error: 'Unable to launch the extension on this page.'
                });
                console.error(e);
            }
        });

    }

    if (request.message == 'close_content_app') {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            try {
                const tabId = tabs[0].id;
                // appContainerId is a unique identifier of the app container
                // that needs to be closed
                const appContainerId = request.appContainerId;
                await chrome.scripting.executeScript({
                    target: {
                        tabId: tabId
                    },
                    // find container by id and remove it - this will close the content app
                    function: (appContainerId) => {
                        const container = document.getElementById(appContainerId);
                        if (container) {
                            container.remove();
                        }
                    },
                    args: [
                        appContainerId
                    ]
                });
            }
            catch (e) {
                // console.error(e);
            }
        });
    }

    if (request.message === 'open_uploader') {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            try {
                const tabId = tabs[0].id;
                await chrome.scripting.executeScript({
                    target: {
                        tabId: tabId
                    },
                    files: ['js/uploader-app.js']
                });

                // need to send any response, otherwise the callback
                // in the popup will not work
                sendResponse({});
            }
            catch (e) {
                sendResponse({
                    error: 'Unable to launch the extension on this page.'
                });
                console.error(e);
            }
        });
    }

    if (request.message === 'show_uploader_in_new_tab') {
        // open google.com in a new tab, wait for it to load, then open the page
        chrome.tabs.create({
            active: true,
            url: 'https://google.com',
        }, async tab => {
            chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
                if (info.status === 'complete' && tabId === tab.id) {
                    chrome.tabs.onUpdated.removeListener(listener);

                    try {
                        const tabId = tab.id;
                        chrome.scripting.executeScript({
                            target: {
                                tabId: tabId
                            },
                            files: ['js/uploader-app.js']
                        }).then(() => {
                            // need to send any response, otherwise the callback
                            // in the popup will not work
                            sendResponse({});
                        });
                    }
                    catch (e) {
                        sendResponse({
                            error: 'Unable to launch the uploader on this page.'
                        });
                        console.error(e);
                    }
                }
            });
        });
    }


    if (request.message === 'uploader_paste_image_from_clipboard') {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            try {
                const tabId = tabs[0].id;
                await chrome.scripting.executeScript({
                    target: {
                        tabId: tabId
                    },
                    func: () => {
                        const container = document.querySelector('.etfi-uploader-container');
                        const shadow = container.shadowRoot;
                        const frame = shadow.querySelector('iframe');
                        // It will be something like "chrome-extension://<extension-id>/"
                        const origin = chrome.runtime.getURL('/');
                        // it was not working without setTimeout
                        setTimeout(() => {
                            // focus on the iframe content to allow clipboard access
                            frame.contentWindow.focus();
                            frame.contentWindow.postMessage({
                                command: 'paste_image_from_clipboard'
                            }, origin);
                        },
                            // delay is needed to allow the focus to work - I guess, the extension popup
                            // keeps the focus until it's closed
                            300
                        );
                    },
                    args: [
                    ]
                });
            }
            catch (e) {
                console.error('uploader_paste_image_from_clipboard command error', e);
            }

        });
    }

    if (request.message == 'close_uploader') {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            try {
                const tabId = tabs[0].id;
                await chrome.scripting.executeScript({
                    target: {
                        tabId: tabId
                    },
                    // find container by id and remove it - this will close the content app
                    function: () => {
                        const container = document.getElementsByClassName('etfi-uploader-container')[0];
                        if (container) {
                            container.remove();
                        }
                    },
                    args: [
                    ]
                });
            }
            catch (e) {
                // console.error(e);
            }
        });
    }

    if (request.message === 'open_history') {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            try {
                const tabId = tabs[0].id;
                await chrome.scripting.executeScript({
                    target: {
                        tabId: tabId
                    },
                    files: ['js/history-app.js']
                });
            }
            catch (e) {
                // console.error(e);
            }
        });
    }

    if (request.message == 'close_history_app') {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            try {
                const tabId = tabs[0].id;
                await chrome.scripting.executeScript({
                    target: {
                        tabId: tabId
                    },
                    // find container by id and remove it - this will close the content app
                    function: () => {
                        const container = document.getElementsByClassName('etfi-history-container')[0];
                        if (container) {
                            container.remove();
                        }
                    },
                    args: [
                    ]
                });
            }
            catch (e) {
                // console.error(e);
            }
        });
    }

    if (request.message == 'close_languages_app') {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            try {
                const tabId = tabs[0].id;
                await chrome.scripting.executeScript({
                    target: {
                        tabId: tabId
                    },
                    // find container by id and remove it - this will close the content app
                    function: () => {
                        const container = document.getElementsByClassName('etfi-langs-container')[0];
                        if (container) {
                            container.remove();
                        }
                    },
                    args: [
                    ]
                });
            }
            catch (e) {
                // console.error(e);
            }
        });
    }

    // this comes from the popup with the main content app
    if (request.message === 'open_languages') {
        dataForLangsPage = request;

        try {
            // open languages popup
            chrome.scripting.executeScript({
                target: {
                    tabId: sender.tab.id
                },
                files: ['js/langs-app.js']
            });
        }
        catch (e) {
            // console.error(e);
        }

    }

    // This is called after the content/langs page is loaded.
    if (request.message === 'languages_page_ready') {
        const sourceImageData = dataForLangsPage.sourceImageData;
        const cropBox = dataForLangsPage.cropBox;
        // send source image data to the languages app
        chrome.scripting.executeScript({
            target: {
                tabId: sender.tab.id
            },
            func: (sourceImageData, cropBox) => {
                const container = document.querySelector('.etfi-langs-container');
                const shadow = container.shadowRoot;
                const frame = shadow.querySelector('iframe');
                // It will be something like "chrome-extension://<extension-id>/"
                const origin = chrome.runtime.getURL('/');
                // it was not working without setTimeout
                setTimeout(() => {
                    frame.contentWindow.postMessage({
                        command: 'set_source_image_data',
                        data: {
                            sourceImageData: sourceImageData,
                            cropBox: cropBox
                        }
                    }, origin);
                }, 100);
            },
            args: [sourceImageData, cropBox]
        });
    }

    if (request.message === 'run_ocr_engine_from_languages'
        || request.message === 'run_ocr_engine_from_main') {

        (async () => {
            // where recognized text goes to?
            const targetApp = request.message === 'run_ocr_engine_from_languages' ? 'languages' : 'main';
            const lang = request.langId;
            // const accuracy = request.accuracy;
            const sourceImageData = request.sourceImageData;
            const cropBox = request.cropBox;
            try {
                const target = {
                    tabId: sender.tab.id
                };
                await chrome.scripting.executeScript({
                    target,
                    files: ['js/helpers.js']
                });
                // start
                chrome.scripting.executeScript({
                    target,
                    func: (lang, href, box, targetApp) => {
                        etfiExtractText(null, 'normal', lang, href, box, targetApp);
                    },
                    args: [lang, sourceImageData, cropBox, targetApp]
                });
                sendResponse({});
            }
            catch (e) {
                sendResponse({
                    error: e
                });
                // console.error(e);
            }
        })();
    }

    if (request.message === 'history_updated') {
        // send message to all tabs so that app can refetch the history
        chrome.tabs.query({}, async (tabs) => {
            // console.log('found tabs', tabs.length);
            for (const tab of tabs) {
                try {
                    await chrome.scripting.executeScript({
                        target: {
                            tabId: tab.id
                        },
                        func: (tabId) => {
                            const container = document.querySelector('.etfi-app-container');
                            if (container) {
                                const shadow = container.shadowRoot;
                                const frame = shadow.querySelector('.etfi-app-content-iframe');
                                // It will be something like "chrome-extension://<extension-id>/"
                                const origin = chrome.runtime.getURL('/');
                                // it was not working without setTimeout
                                setTimeout(() => {
                                    frame.contentWindow.postMessage({
                                        command: 'history_updated'
                                    }, origin);
                                }, 50);
                            }
                        },
                        args: [tab.id]
                    });
                }
                catch (e) {
                    // console.error(e);
                }
            }
        });
    }

    if (request.message === 'language_selected') {
        const langId = request.langId;
        // send message to all tabs so that app can refetch the history
        chrome.tabs.query({}, async (tabs) => {
            for (const tab of tabs) {
                try {
                    await chrome.scripting.executeScript({
                        target: {
                            tabId: tab.id
                        },
                        func: (langId) => {
                            const container = document.querySelector('.etfi-app-container');
                            if (container) {
                                const shadow = container.shadowRoot;
                                const frame = shadow.querySelector('iframe');
                                // It will be something like "chrome-extension://<extension-id>/"
                                const origin = chrome.runtime.getURL('/');
                                // it was not working without setTimeout
                                setTimeout(() => {
                                    frame.contentWindow.postMessage({
                                        command: 'language_selected',
                                        data: {
                                            langId: langId
                                        }
                                    }, origin);
                                }, 50);
                            }
                        },
                        args: [langId]
                    });
                }
                catch (e) {
                    // console.error(e);
                }
            }
        });
    }

    if (request.message === 'captured') {
        const { width, height } = request;

        if (!width || !height) {
            // TODO: maybe some error message?
            return;
        }

        lastCapturedData = request;

        try {
            // Just open the OCR UI
            const target = {
                tabId: sender.tab.id
            };
            // await
            chrome.scripting.executeScript({
                target,
                files: ['js/content-app.js']
            });
            // await
            chrome.scripting.executeScript({
                target,
                files: ['js/helpers.js']
            });
        }
        catch (e) {
            // console.error(e);
        }
    }

    // This is called after the content/index page is loaded.
    if (request.message === 'can_receive_extracted_text') {
        const { devicePixelRatio, left, top, width, height } = lastCapturedData;

        chrome.tabs.captureVisibleTab(sender.tab.windowId, {
            format: 'png'
        }, async href => {

            // NOTE: href is a Data URL of a captured screenshot

            // start
            const settings = {
                ocrLanguageId: 'eng',
                ocrAccuracy: '4.0.0',
                ocrFrequentLanguages: ['eng', 'fra', 'deu', 'rus', 'ara']
            };
            // get settings from storage and then run OCR on the href
            // where the screenshot is stored in the form of Data URL
            chrome.storage.sync.get(settings).then((prefs) => {
                chrome.scripting.executeScript({
                    // console.log('worker prefs', prefs);
                    // const container = document.querySelector('.etfi-app-container:last-of-type');
                    // const shadow = container.shadowRoot;
                    // const frame = shadow.querySelector('.etfi-app-content-iframe');
                    // // It will be something like "chrome-extension://<extension-id>/"
                    // const origin = chrome.runtime.getURL('/');
                    // // it was not working without setTimeout
                    // setTimeout(() => {
                    //     frame.contentWindow.postMessage({
                    //         command: 'data_to_ocr',
                    //         prefs,
                    //         href,
                    //         box
                    //     }, origin);
                    // }, 50);

                    target: {
                        tabId: sender.tab.id
                    },
                    func: (prefs, href, box) => {
                        etfiExtractText(null, 'normal', prefs.ocrLanguageId, href, box);
                    },
                    args: [prefs, href, {
                        width: width * devicePixelRatio,
                        height: height * devicePixelRatio,
                        left: left * devicePixelRatio,
                        top: top * devicePixelRatio
                    }]
                });
            });

        });

    }

    // send langs list to the content script
    if (request.message == 'langs_list') {
        const langs = request.langs || [];

        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            func: (langs) => {
                window.etfiLangs = langs;
            },
            args: [langs]
        });
    }

    // Indicates that an asynchronous response is being processed
    // (sendResponse is not working for me without this)
    // https://stackoverflow.com/q/48107746
    return true;
});


chrome.runtime.onInstalled.addListener((details) => {
    // add welcome page
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        // Code to be executed on first install
        // eg. open a tab with a url
        chrome.tabs.create({
            url: "/welcome.html",
        });
        // track install event
        trackEvent('install');
        // store install date
        const installDate = new Date().toISOString();
        chrome.storage.sync.set({ installDate });
    } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        // When extension is updated
    } else if (
        details.reason === chrome.runtime.OnInstalledReason.CHROME_UPDATE
    ) {
        // When browser is updated
    } else if (
        details.reason === chrome.runtime.OnInstalledReason.SHARED_MODULE_UPDATE
    ) {
        // When a shared module is updated
    }
});

// Set uninstall page
chrome.runtime.setUninstallURL('https://forms.gle/9GmSeRnsVYBcv9Gb8');

const connectedPorts = new Set();

chrome.runtime.onConnectExternal.addListener(port => {
    if (
        port.sender?.url &&
        (port.sender.url.includes('onlineapp.pro') ||
            port.sender.url.includes('onlineapp.live') ||
            port.sender.url.includes('onlineapp.stream'))
    ) {
        connectedPorts.add(port);

        port.onDisconnect.addListener(() => {
            connectedPorts.delete(port);
        });
    } else {
        console.warn('Connection attempt from unauthorized domain:', port.sender?.url);
        port.disconnect();
    }
});

function trackEvent(eventName, additionalData = {}) {
    getUserId(userId => {
        fetch('https://onlineapp.pro/api/track-event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event: eventName,
                // this will be replaced during build
                wallId: parseInt('93'),
                extensionId: chrome.runtime.id,
                userId: userId,
                ...additionalData,
            }),
        });
    });
}

function notifyConnectedClients(notification) {
    connectedPorts.forEach(port => {
        try {
            port.postMessage(notification);
        } catch (error) {
            console.error('Error sending notification to port:', error);
            connectedPorts.delete(port);
        }
    });
}

function getUserId(callback) {
    chrome.storage.sync.get(['user_id'], result => {
        if (result.user_id) {
            callback(result.user_id);
        } else {
            const userId = crypto.randomUUID();
            chrome.storage.sync.set({ user_id: userId, [`pw-93-visitor-id`]: userId }, () => {
                callback(userId);
            });
        }
    });
}

chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    if (
        sender.url &&
        (sender.url.includes('onlineapp.pro') ||
            sender.url.includes('onlineapp.live') ||
            sender.url.includes('onlineapp.stream'))
    ) {
        if (message.source === 'supabase-auth-adapter') {
            switch (message.action) {
                case 'ping':
                    sendResponse({ status: 'ok' });
                    break;

                case 'getItem':
                    try {
                        const { key } = message.data;
                        chrome.storage.sync.get(key, result => {
                            if (chrome.runtime.lastError) {
                                const errorMessage = chrome.runtime.lastError.message;
                                console.error('Storage error:', errorMessage);
                                sendResponse({ status: 'error', message: errorMessage });
                            } else {
                                sendResponse({ status: 'success', value: result[key] || null });
                            }
                        });
                        return true;
                    } catch (error) {
                        console.error('Error in getItem:', error);
                        sendResponse({ status: 'error', message: error.message });
                    }
                    break;

                case 'setItem':
                    try {
                        const { key, value } = message.data;
                        chrome.storage.sync.set({ [key]: value }, () => {
                            if (chrome.runtime.lastError) {
                                const errorMessage = chrome.runtime.lastError.message;
                                console.error('Storage error:', errorMessage);
                                sendResponse({ status: 'error', message: errorMessage });
                            } else {
                                sendResponse({ status: 'success' });
                                notifyConnectedClients({
                                    type: 'storage_update',
                                    action: 'set',
                                    key,
                                    value,
                                    timestamp: Date.now(),
                                });
                            }
                        });
                        return true;
                    } catch (error) {
                        console.error('Error in setItem:', error);
                        sendResponse({ status: 'error', message: error.message });
                    }
                    break;

                case 'removeItem':
                    try {
                        const { key } = message.data;
                        chrome.storage.sync.remove(key, () => {
                            if (chrome.runtime.lastError) {
                                const errorMessage = chrome.runtime.lastError.message;
                                console.error('Storage error:', errorMessage);
                                sendResponse({ status: 'error', message: errorMessage });
                            } else {
                                notifyConnectedClients({
                                    type: 'storage_update',
                                    action: 'remove',
                                    key,
                                    timestamp: Date.now(),
                                });
                                sendResponse({ status: 'success' });
                            }
                        });
                        return true;
                    } catch (error) {
                        console.error('Error in removeItem:', error);
                        sendResponse({ status: 'error', message: error.message });
                    }
                    break;

                default:
                    console.warn('Unknown action:', message.action);
                    sendResponse({ status: 'error', message: 'Unknown action' });
                    break;
            }
        } else if (message.type === 'broadcast') {
            notifyConnectedClients(message.data || message);

            sendResponse({
                status: 'success',
                message: 'Message broadcasted successfully',
                clientsCount: connectedPorts.size,
            });
        } else {
            console.warn('Message has neither source nor type');
            sendResponse({ status: 'error', message: 'Invalid message format' });
        }
    } else {
        console.warn('Message from unauthorized domain:', sender.url);
        sendResponse({ status: 'error', message: 'Unauthorized domain' });
    }

    return true;
})
