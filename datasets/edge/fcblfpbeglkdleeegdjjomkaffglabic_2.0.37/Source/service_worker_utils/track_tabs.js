const crmPopupWindows = {};
const sidepanelWindows = {};
const portMap = new Map(); // map for saving window ids for each connection

const toggleSidepanel = async function (url, windowId, maintain) {
  // Commented this if because of uniting extensions (user can press on phone number to open extension then reset query , but press again on phone number)
  // also added date to url to force reload

  // if (url !== sidepanelWindows[windowId]?.url) {

  chrome.sidePanel.setOptions(
    {
      path: `sidepanel.html?url=${encodeURIComponent(
        url
      )}&t=${Date.now()}`,
      enabled: true,
    },
    () => {
      chrome.sidePanel.open({ windowId });
    }
  );
  sidepanelWindows[windowId] = { url };
  // } else if (!maintain) {
  //   await chrome.sidePanel.setOptions({ enabled: false });
  //   sidepanelWindows[windowId] = {};
  // }
};

chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === 'matadorExtSidePanel') {
    // For saving window ids on our side
    port.onMessage.addListener((message) => {
      if (message.windowId) {
        portMap.set(port, message.windowId);
      }
    });
    // Handling close event
    port.onDisconnect.addListener(() => {
      const windowId = portMap.get(port);
      sidepanelWindows[windowId] = {};
      portMap.delete(port);
    });
  }
});

const closeSidepanel = async function () {
  await chrome.sidePanel.setOptions({ enabled: false });
};

const openMatadorPopup = async function (windowId, url) {
  const crmPopup = await chrome.windows.get(windowId);

  const popup = {
    url,
    left: crmPopup.left + crmPopup.width - 500,
    top: crmPopup.top,
    width: 400,
    height: Math.min(crmPopup.height, 700),
  };
  // console.log({popup})

  const popupWin = await chrome.windows.create({
    url: url,
    type: 'popup',
    left: popup.left,
    top: popup.top,
    width: popup.width,
    height: popup.height,
  });
  popup.windowId = popupWin.id;

  crmPopupWindows[windowId] = { popup };
};

const updateOrCloseMatadorPopup = async function (
  win,
  url,
  maintain
) {
  if (win.popup.url !== url) {
    const tabs = await chrome.tabs.query({
      windowId: win.popup.windowId,
    });
    await chrome.tabs.update(tabs[0].id, { url });
    await chrome.windows.update(win.popup.windowId, {
      focused: true,
    });
    win.popup.url = url;
  } else if (!maintain) {
    await chrome.windows.remove(win.popup.windowId);
    win.popup = null;
  } else {
    await chrome.windows.update(win.popup.windowId, {
      focused: true,
    });
  }
};

const isFromPopup = function (windowId) {
  return !!crmPopupWindows[windowId];
};

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  const windowId = sender.tab?.windowId;

  switch (request.action) {
    case 'TOGGLE_CONVERSATION_LIST':
      if (isFromPopup(windowId)) {
        const win = crmPopupWindows[windowId];
        if (!win.popup) {
          await openMatadorPopup(windowId, request.url);
        } else {
          await updateOrCloseMatadorPopup(win, request.url);
        }
      } else {
        await toggleSidepanel(request.url, windowId);
      }
      break;
    case 'TOGGLE_CONVERSATION':
      if (isFromPopup(windowId)) {
        const win = crmPopupWindows[windowId];
        if (!win.popup) {
          await openMatadorPopup(windowId, request.url);
        } else {
          await updateOrCloseMatadorPopup(
            win,
            request.url,
            request.maintain
          );
        }
      } else {
        await toggleSidepanel(
          request.url,
          windowId,
          request.maintain
        );
      }
      break;
  }
});

chrome.windows.onCreated.addListener(
  async function (window) {
    console.log('New window created', window);
    if (window.id && !crmPopupWindows[window.id]) {
      crmPopupWindows[window.id] = { popup: null };
    }
  },
  { windowTypes: ['popup'] }
);

chrome.runtime.onMessageExternal.addListener(function (request) {
  if (request.action === 'openTab') {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      (tabs) => {
        if (tabs.length > 0) {
          const currentTab = tabs[0];
          const newTabIndex = currentTab.index + 1;
          chrome.tabs.create({
            url: request.url,
            index: newTabIndex,
          });
        }
      }
    );
    return true;
  }
});

chrome.windows.onRemoved.addListener(
  async function (windowId) {
    console.log('Window removed', windowId);
    const win = crmPopupWindows[windowId];
    if (win) {
      if (win.popup) {
        await chrome.windows.remove(win.popup.windowId);
      } else {
        Object.values(crmPopupWindows).forEach((w) => {
          if (w?.popup?.windowId === windowId) {
            w.popup = null;
          }
        });
      }
      delete crmPopupWindows[windowId];
    } else {
      Object.values(crmPopupWindows).forEach((w) => {
        if (w?.popup?.windowId === windowId) {
          w.popup = null;
        }
      });
    }
  },
  { windowTypes: ['popup'] }
);
