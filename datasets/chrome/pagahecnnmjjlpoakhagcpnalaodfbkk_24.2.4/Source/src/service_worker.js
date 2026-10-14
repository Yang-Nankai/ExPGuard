const HOST_NAME_DEV = 'https://dev.rakuten-drive.com';
const HOST_NAME_STG = 'https://stg.rakuten-drive.com';
const HOST_NAME = 'https://www.rakuten-drive.com';
const MAIL_LOGO_URL = `${HOST_NAME}/extension/static/assets/mail_template_logo.png`;

const POPUP_WIDTH = 400;
const POPUP_HEIGHT = 550;

const MENU_ITEM_EDITABLE = 'sendy_editable_context';

const INBOX_APP_ID = 'sdk_Sendy_c228e37245';

function encodeQueryData(data) {
  const ret = [];
  for (const d in data) ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`);
  return ret.join('&');
}

function getBackgroundLocalStorageValue(key, sendResponse) {
  chrome.runtime.sendMessage(chrome.runtime.id, { type: 'storage_get', key }, sendResponse);
}

function getSendyURL(query, sendResponse) {
  let url;
  getBackgroundLocalStorageValue('host_name_prefix', (value) => {
    let hostName;

    if (value == 'dev' || value === 'app-test') {
      hostName = HOST_NAME_DEV;
    } else if (value == 'stg' || value === 'app-staging') {
      hostName = HOST_NAME_STG;
    } else {
      hostName = HOST_NAME;
    }

    if (query) {
      const encodedQuery = encodeQueryData(query);
      url = `${hostName}/extension/?${encodedQuery}`;
    } else {
      url = `${hostName}/extension/`;
    }

    sendResponse(url);
  });
}

const APP_DATA = {
};
let popupId;

function getAppData(key) {
  if (key) return APP_DATA[key];

  return APP_DATA;
}

function setAppData(key, newValue) {
  if (key) {
    const oldValue = getAppData(key);

    if (typeof newValue !== 'object' && newValue === oldValue) return;
    // console.log('setData:', key, ', old:', oldValue, ', new:', newValue);

    APP_DATA[key] = newValue;
  }
}

function updateContextMenus() {
  chrome.contextMenus.removeAll();
  const options = getAppData('options');
  if (options && (options.slack || options.chatwork)) {
    const patterns = [];
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
      documentUrlPatterns: patterns,
    }, () => {});
  }
}

function broadcastToContentScript(msgObj) {
  function sendMessageToTab(tabId, msgObj) {
    chrome.tabs.sendMessage(tabId, msgObj);
  }
  chrome.tabs.query({
    url: ['*://*.slack.com/*', '*://mail.google.com/*', '*://inbox.google.com/*', '*://*.chatwork.com/*'],
  }, (tabs) => {
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      sendMessageToTab(tab.id, msgObj);
    }
  });
}

function openPopup() {
  function createWindow() {
    chrome.windows.getCurrent((win) => {
      const left = ((win.width / 2) - (POPUP_WIDTH / 2)) + win.left;
      const top = ((win.height / 2) - (POPUP_HEIGHT / 2)) + win.top;

      chrome.windows.create({
        url: '/html/popup.html',
        type: 'popup',
        focused: true,
        width: POPUP_WIDTH,
        height: POPUP_HEIGHT,
        top: Math.round(top),
        left: Math.round(left),
      }, (popupWindow) => {
        popupId = popupWindow.id;
      });
    });
  }

  if (popupId) {
    chrome.windows.update(popupId, {
      focused: true,
    }, () => {
      if (chrome.runtime.lastError) createWindow();
    });
  } else {
    createWindow();
  }
}

function onContextMenuClicked(info, tab) {
  if (info.menuItemId === MENU_ITEM_EDITABLE) {
    chrome.tabs.sendMessage(tab.id, {
      type: 'load_embedded_webapp',
      item: 'editable',
    });
  }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id) return true;

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
      chrome.storage.sync.set({ options });
      updateContextMenus();
    }
  } else if (msg.type === 'storage_get' && msg.key) {
    chrome.storage.local.get(msg.key, (result) => {
      const value = result[msg.key];
      sendResponse({ value });
    });
    return true;
  } else if (msg.type === 'inboxsdk__injectPageWorld' && sender.tab) {
    if (chrome.scripting) {
      // MV3
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id, frameIds: [sender.frameId] },
        world: 'MAIN',
        files: ['/lib/pageWorld.js'],
      });
      sendResponse(true);
    } else {
      // MV2 fallback. Tell content script it needs to figure things out.
      sendResponse(false);
    }
  }
});

function init() {
  chrome.storage.sync.get(null, (res) => {
    const options = res && res.options ? res.options : {};
    const defaultOptions = {
      gmail: true,
      slack: true,
      chatwork: true,
    };
    Object.assign(options, defaultOptions);

    chrome.storage.sync.set({ options });
    setAppData('options', options);
    updateContextMenus();
  });

  chrome.action.onClicked.addListener(() => {
    openPopup();
  });
  chrome.contextMenus.onClicked.addListener(onContextMenuClicked);
}

init();
