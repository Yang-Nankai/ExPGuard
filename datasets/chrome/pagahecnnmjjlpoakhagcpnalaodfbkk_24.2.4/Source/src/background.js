var APP_DATA = {
};
var popupId;

function getAppData(key) {
    if (key) return APP_DATA[key];

    return APP_DATA;
}

function setAppData(key, newValue) {
    if (key) {
        var oldValue = getAppData(key);

        if (typeof newValue !== 'object' && newValue === oldValue) return;
        //console.log('setData:', key, ', old:', oldValue, ', new:', newValue);

        APP_DATA[key] = newValue;
    }
}

function updateContextMenus() {
    chrome.contextMenus.removeAll();
    const options = getAppData('options');
    if (options && (options.slack || options.chatwork)) {
        var patterns = [];
        if (options.slack) {
            patterns.push('*://*.slack.com/*');
        }
        if (options.chatwork) {
            patterns.push('*://*.chatwork.com/*');            
        }
        chrome.contextMenus.create({
            id: MENU_ITEM_EDITABLE,
            title: chrome.i18n.getMessage('gmail_hover_title'),
            contexts: ['editable'],
            documentUrlPatterns: patterns
        }, function() {});
    }
}

function broadcastToContentScript(msgObj) {
    function sendMessageToTab(tabId, msgObj) {
        chrome.tabs.sendMessage(tabId, msgObj);
    }
    chrome.tabs.query({
        url: ['*://*.slack.com/*', '*://mail.google.com/*', '*://inbox.google.com/*', '*://*.chatwork.com/*'],
    }, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            sendMessageToTab(tab.id, msgObj);
        }
    });
}

function openPopup() {
    function createWindow() {
        chrome.windows.getCurrent(function(win) {
            const left = ((screen.width / 2) - (POPUP_WIDTH / 2)) + win.left;
            const top = ((screen.height / 2) - (POPUP_HEIGHT / 2)) + win.top;

            chrome.windows.create({
                url: '/html/popup.html',
                type: 'popup',
                focused: true,
                width: POPUP_WIDTH,
                height: POPUP_HEIGHT,
                top: Math.round(top),
                left: Math.round(left),
            }, function(popupWindow) {
                popupId = popupWindow.id; 
            });
        });
    }
    
    if (popupId) {
        chrome.windows.update(popupId, {
            focused: true,
        }, function() {
            if (chrome.runtime.lastError) createWindow();
        });
    } else {
        createWindow();
    }
}

function onContextMenuClicked(info, tab) {
    if (info.menuItemId === MENU_ITEM_EDITABLE) {
        chrome.tabs.sendMessage(tab.id, {
            'type': 'load_embedded_webapp',
            'item': 'editable',
        });
    }
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (sender.id !== chrome.runtime.id) return;

    const options = getAppData('options');

    if (msg.type === 'update-setting') {
        if (options) {
            if (msg.name === 'activateGmail') {
                options.gmail = msg.value === true;
            } else if (msg.name === 'activateSlack') {
                options.slack = msg.value === true;
            } else if (msg.name === 'activateChatwork') {
                options.chatwork = msg.value === true;
            }
            chrome.storage.sync.set({options: options});
            updateContextMenus();
        }
    } else if (msg.type === 'local_storage' && msg.key) {
        const value = window.localStorage.getItem(msg.key);
        sendResponse(value);
    }
});

function init() {
    chrome.storage.sync.get(null, function (res) {
        var options = res && res.options ? res.options : {};
        const defaultOptions = {
            gmail: true,
            slack: true,
            chatwork: true,
        };
        Object.assign(options, defaultOptions);

        chrome.storage.sync.set({options: options});
        setAppData('options', options);
        updateContextMenus();
    });
    chrome.browserAction.onClicked.addListener(openPopup);
    chrome.contextMenus.onClicked.addListener(onContextMenuClicked);
}

init();
