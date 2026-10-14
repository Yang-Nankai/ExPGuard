import {checkStoredSettings, setupCookieListeners, setupTabListeners} from "./storage.js";


const getword = async (info, tab) => {
    try {
        await chrome.tabs.sendMessage(tab.id, {
            tabChanged: false,
            selectedText: true
        });
    } catch (err) {
        console.error('Error in getWord:', err.message);
    }
}

async function setupContextMenu() {
    await chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        id: 'translate-selection',
        title: chrome.i18n.getMessage("translate"),
        contexts: ["selection"],
    });
}

const welcomePage = () => chrome.tabs.create({url:chrome.runtime.getURL("pages/welcome/welcome.html")})

const tabChanged = async tab => {
    try {
        if (!tab || !Number.isInteger(tab.tabId)) {
            console.error('Invalid tab or tabId in tabChanged:', tab?.tabId);
            return;
        }

        const tabInfo = await chrome.tabs.get(tab.tabId);

        if (tabInfo.url && !tabInfo.url.startsWith('chrome://') && tabInfo.status === 'complete') {
            try {
                await chrome.tabs.sendMessage(tab.tabId, { tabChanged: true });
            } catch (err) {
                if (err.message.includes('Receiving end does not exist')) {
                    console.log('Content script not loaded in tab (tabChanged):', tabInfo.url);
                } else {
                    console.error('Error sending message in tabChanged:', err.message);
                }
            }
        }
    } catch (err) {
        console.error('Error in tabChanged:', err.message);
    }
}


const handleMessage = (request, sender, sendResponse) => {
    const { headers, body, url, type, translation, notify } = request;
    fetch(url, {method: "POST", body, headers})
    .then(res =>  res.json())
    .then(jsonRes => {
        if (type === "TranslateContext") {
            const { translate } = jsonRes;
            chrome.storage.local.set({currentContextTranslation: translate[0].value})
            sendResponse({contextTranslation: translate[0].value});
        } else if (type === "Translate") {
            const { transcription, translate, sound_url, errorType } = jsonRes;

            if (errorType) {
                sendResponse({ errorType });
            }

            chrome.storage.local.set({currentTranslation: { transcription, translate, sound_url }})
            sendResponse({ transcription, translate, sound_url });
        } else if (type === "SetWords") {
            chrome.storage.local.get(null, settings => {
                const { historyTranslations } = settings;
                if (jsonRes.data[0].error && jsonRes.data[0].error.code === '6') {
                    sendResponse({response: "meatballs"});
                } else {
                    const { origin, combinedTranslation } = jsonRes.data[0].word;
                    const formattedHistoryTranslations = [];
                    historyTranslations.map((transObj, i) => {
                        if (transObj.source !== origin) {
                            formattedHistoryTranslations.push(transObj)
                        }
                    })
                    chrome.storage.local.set({historyTranslations: [{source: origin, target: combinedTranslation}, ...formattedHistoryTranslations]})
                    notify && chrome.notifications.create({
                        "type": "basic",
                        "title": "Ваш словарь обновлен",
                        "iconUrl": chrome.runtime.getURL("../img/logo-paw.png"),
                        "message": `${origin} — ${combinedTranslation}`
                    });``
                    sendResponse({response: "ok"});
                }
            });
        }
    })
    .catch(err => console.log(err))
    return true;
  }



chrome.runtime.onMessage.addListener(handleMessage);

chrome.runtime.onInstalled.addListener(async () => {
    const settings = await new Promise((resolve) => {
        chrome.storage.local.get(null, resolve);
    });
    await checkStoredSettings(settings);
    await setupContextMenu();
    welcomePage();
});

setupContextMenu();

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'translate-selection') {
        getword(info, tab);
    }
});

chrome.tabs.onActivated.addListener(tabChanged);

setupCookieListeners();
setupTabListeners();