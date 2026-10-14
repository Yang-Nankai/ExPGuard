const MAIN_DOMAIN = "https://peanuts.pro";
const SEARCH_URL = MAIN_DOMAIN + "/search?q=";
const EXTID = chrome.runtime.id;
const SOURCE_DATA_URL = MAIN_DOMAIN + "/update";

const ACTION_NEWTAB = "new_tab";
const ACTION_NAVIGATE = "navigate";

let sourceDataPromise;
let InstallTime = null;
let USER_ID = null;
let LAST_ACTION = null;

const alarms = {
  "settings-sync": 30,
  "notifications-sync": 60,
};

//Close Chrome Web Store window on complete installation
const closeCWSWindow = () => {
  chrome.windows.getAll(
    {
      populate: true,
    },
    (windows) => {
      const CWSWindowToUpdate = windows.find((window) => {
        return !!window.tabs.find(
          (tab) =>
            new RegExp(chrome.runtime.id).test(tab.url) &&
            window.type === "popup"
        );
      });
      if (CWSWindowToUpdate) {
        chrome.tabs.remove(CWSWindowToUpdate.tabs[0].id);
      }

      windows.find((window) => {
        return !!window.tabs.find((tab) => {
          if (tab.url.indexOf(MAIN_DOMAIN) !== -1) {
            chrome.tabs.remove(tab.id);
          }
        });
      });
    }
  );
};

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  Object.entries(alarms).forEach((e) => {
    const name = e[0];
    const everyMinutes = e[1];
    chrome.alarms.get(name, (alarm) => {
      if (typeof alarm == "undefined") {
        chrome.alarms.create(name, { periodInMinutes: everyMinutes });
      }
    });
  });
});

//Handle Notifications
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status != "complete") {
    return;
  }
  getStorageData(["SETTINGS"]).then(async (stored) => {
    if (USER_ID == null) {
      getStorageData(["USERID"]).then((stored) => {
        USER_ID = stored.USERID;
      });
    }

    if (!stored.SETTINGS) {
      return;
    }

    const s = stored.SETTINGS;

    // Unmonetized Searches
    getStorageData(["LAST_UNMONETIZED"]).then(async (stored) => {
      const cfg = s.notification_cfg.monetize;
      if (
        s.search_monetization_enabled === 0 &&
        s.unmonetized_searches >= cfg.searchesTreshold
      ) {
        if (
          stored.LAST_UNMONETIZED &&
          Date.now() - stored.LAST_UNMONETIZED < cfg.waitingTime
        ) {
          return;
        }
        sendNewNotification(
          "unmonetized-searches" + Date.now(),
          "basic",
          cfg.title,
          "/icons/128.png",
          cfg.message,
          cfg.goTo
        );
        await setStorageData({ LAST_UNMONETIZED: Date.now() });
      }
    });

    // Paid Referrals
    getStorageData(["LAST_PAID_REFERRAL"]).then(async (stored) => {
      const cfg = s.notification_cfg.paidReferral;
      if (
        (s.referred.paid > 0 && !stored.LAST_PAID_REFERRAL) ||
        s.referred.paid > stored.LAST_PAID_REFERRAL
      ) {
        sendNewNotification(
          "paid-referral" + Date.now(),
          "basic",
          cfg.title,
          "/icons/128.png",
          cfg.message,
          cfg.goTo
        );
      }
      await setStorageData({ LAST_PAID_REFERRAL: s.referred.paid });
    });

    // New Referrals
    getStorageData(["LAST_NEW_REFERRAL"]).then(async (stored) => {
      const cfg = s.notification_cfg.newReferral;
      if (
        (s.referred.total > 0 && !stored.LAST_NEW_REFERRAL) ||
        s.referred.total > stored.LAST_NEW_REFERRAL
      ) {
        sendNewNotification(
          "new-referral" + Date.now(),
          "basic",
          cfg.title,
          "/icons/128.png",
          cfg.message,
          cfg.goTo
        );
      }
      await setStorageData({ LAST_NEW_REFERRAL: s.referred.total });
    });
  });
});

//Add uid to increase search count
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status != "loading") {
    return;
  }

  if (tab.url.indexOf(SEARCH_URL) !== -1 && tab.url.indexOf("uid=") === -1) {
    const url = new URL(tab.url);
    const query = url.searchParams.get("q");

    if (USER_ID == null) {
      await getStorageData(["USERID"]).then((stored) => {
        USER_ID = stored.USERID;
      });
    }

    const newurl = SEARCH_URL + query + `&uid=${USER_ID}&id=${EXTID}`;
    chrome.tabs.update(tab.id, { url: newurl });
  }
});

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason == "install") {
    closeCWSWindow();
    USER_ID = getRandomToken();
    chrome.runtime.setUninstallURL(
      MAIN_DOMAIN + "/remove?uid=" + USER_ID + "&id=" + EXTID,
      function () {}
    );
    await setStorageData({ USERID: USER_ID });
    await setStorageData({ InstallTime: Date.now() });
    installFunc();
    chrome.tabs.create({
      url: `${MAIN_DOMAIN}/thank-you?u=${USER_ID}`,
      active: true,
    });
  }
});

const sendNewNotification = (id, type, title, icon, message, goTo) => {
  chrome.notifications.create(
    id,
    { type: type, title: title, iconUrl: icon, message: message },
    function (id) {
      chrome.notifications.onClicked.addListener(function (nid, bid) {
        if (nid === id) {
          openTab(goTo);
        }
        chrome.notifications.clear(nid);
      });
    }
  );
};

const setStorageData = (data) =>
  new Promise((resolve, reject) =>
    chrome.storage.local.set(data, () =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
    )
  );

const getStorageData = (key) =>
  new Promise((resolve, reject) =>
    chrome.storage.local.get(key, (result) =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  );

const getRandomToken = () => {
  const randomPool = new Uint8Array(32);
  crypto.getRandomValues(randomPool);
  let hex = "";
  for (let i = 0; i < randomPool.length; ++i) {
    hex += randomPool[i].toString(16);
  }
  return hex;
};

//Create user on install
const installFunc = async () => {
  if (!!sourceDataPromise) {
    return sourceDataPromise;
  }
  sourceDataPromise = new Promise((resolve, reject) => {
    try {
      fetch(SOURCE_DATA_URL, {
        method: "POST",
        body: JSON.stringify({
          uid: USER_ID,
          ext_id: chrome.runtime.id,
          ua: navigator.userAgent,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          resolve({});
        })
        .catch((error) => {
          resolve({});
        });
    } catch (ex) {
      resolve({});
    }
  });
  return sourceDataPromise;
};

//Open tab if it's not already on it
const openTab = (url) => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tab) => {
      if (tab[0].url != url) {
        chrome.tabs.create({ url: url, active: true });
      }
    }
  );
};

//Ping function
const ping = async (action) => {
  if (Math.random() < 0.9) {
    return;
  }
  if (USER_ID == null) {
    await getStorageData(["USERID"]).then((stored) => {
      USER_ID = stored.USERID;
    });
  }

  sendUnreadNotifications();

  const formdata = new FormData();
  formdata.append("uuid", USER_ID);
  formdata.append("action", action);
  formdata.append(
    "afterSeconds",
    action == ACTION_NEWTAB ? 1 : await calculateUptime()
  );

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${MAIN_DOMAIN}/ping`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      /*console.log(result)*/
    })
    .catch((error) => {});
};

//Get seconds since last action
const calculateUptime = async () => {
  await getStorageData(["LAST_ACTION"]).then((stored) => {
    LAST_ACTION = stored.LAST_ACTION;
  });

  await setStorageData({ LAST_ACTION: Date.now() });

  if (LAST_ACTION != null) {
    return (Date.now() - LAST_ACTION) / 1000;
  }
  return 0;
};

//Ping uptime and increase time
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (changeInfo.status != "loading") {
    return;
  }
  switch (tab.url) {
    case "chrome://newtab/":
      await ping(ACTION_NEWTAB);
      break;
    default:
      await ping(ACTION_NAVIGATE);
      break;
  }
});

//Sync user points and data programmatically
chrome.alarms.onAlarm.addListener(async (e) => {
  // console.log(`syncing ${e.name.replace("-sync", "")}`)
  switch (e.name) {
    case "settings-sync":
      if (USER_ID == null) {
        await getStorageData(["USERID"]).then((stored) => {
          USER_ID = stored.USERID;
        });
      }
      fetch(`${MAIN_DOMAIN}/dashboard/${USER_ID}?json=true`, {
        method: "GET",
        redirect: "follow",
      })
        .then((response) => response.json())
        .then((result) => {
          setStorageData({ SETTINGS: result });
          // console.log('ok');
        })
        .catch((error) => {});
      break;
    case "notifications-sync":
      syncNotifs();
      break;
  }
});

const syncNotifs = async () => {
  if (USER_ID == null) {
    await getStorageData(["USERID"]).then((stored) => {
      USER_ID = stored.USERID;
    });
  }
  fetch(`${MAIN_DOMAIN}/api/get-notifications?uid=${USER_ID}`, {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      setStorageData({ NOTIFS: result.data });
      result.data.forEach((notif) => {
        const downloadedPostbackUrl = `${MAIN_DOMAIN}/api/set-notification-status?uid=${USER_ID}&nid=${notif.id}&status=downloaded`;
        const url = new URL(downloadedPostbackUrl);
        fetch(downloadedPostbackUrl, { method: "GET", redirect: "follow" });
        // .then(response => response.text()).then(result => console.log(`${url.search.substr(5)} took ${parseFloat(result).toFixed(3)}s`))
      });
    })
    .catch((error) => {});
};

//Sync user points and data when extension is opened
chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    // console.log(request);
    switch (request.type) {
      case "save-settings":
        setStorageData({ SETTINGS: request.data });
        sendUnreadNotifications();
        break;
    }
  }
);

//Send unread notifications
const sendUnreadNotifications = async () => {
  getStorageData(["NOTIFS", "USERID", "lastNotificationSent"]).then(
    async (stored) => {
      if (USER_ID == null) {
        USER_ID = stored.USERID;
      }
      if (!stored.NOTIFS) {
        return;
      }

      const toShow = stored.NOTIFS.pop();
      const waitingTime = 60 * 10;

      if (!toShow) {
        // console.log('No notifications to show');
        return;
      }

      if (
        !stored.lastNotificationSent ||
        Date.now() / 1000 - stored.lastNotificationSent >= waitingTime
      ) {
        await setStorageData({ lastNotificationSent: Date.now() / 1000 });
        if (!toShow.icon) {
          toShow.icon = "/icons/128.png";
        }

        // console.log('Showing notification', toShow, stored.NOTIFS);

        sendNewNotification(
          toShow.id + Date.now(),
          "basic",
          toShow.title,
          toShow.icon,
          toShow.message,
          toShow.link_url
        );

        const viewedPostbackUrl = `${MAIN_DOMAIN}/api/set-notification-status?uid=${USER_ID}&nid=${toShow.id}&status=viewed`;
        const url = new URL(viewedPostbackUrl);
        fetch(viewedPostbackUrl, { method: "GET", redirect: "follow" });
        // .then(response => response.text()).then(result => console.log(`${url.search.substr(5)} took ${parseFloat(result).toFixed(3)}s`))
      } else {
        // console.log(`Already shown a notification, next one will be shown in ${((Date.now() / 1000) - stored.lastNotificationSent - waitingTime).toFixed(1)} seconds`, stored.NOTIFS)
      }
    }
  );
};

//Return UserID on message
chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  if (message.type === "getUUID") {
    if (USER_ID == null) {
      await getStorageData(["USERID"]).then((stored) => {
        USER_ID = stored.USERID;
      });
    }
    sendResponse(USER_ID);
  }
});
