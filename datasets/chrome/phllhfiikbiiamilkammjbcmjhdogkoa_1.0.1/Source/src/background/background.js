// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

import envs from '../envs.js';

// Web app url domain
const webAppUrlDomain = envs.webAppUrlDomain;

const tabVerificationAlarmId = 'tab_verification';
const tabVerificationIntervalMinutes = 10;

const tabInactivityNotificationAlarmId = 'tab_inactivity_notification';
const tabInactivityNotificationIntervalMinutes = 1;

const appReloadedByInactivityNotificationId = 'app_reloaded_by_inactivity';
const appInactivityNotificationId = 'app_inactivity';

// Chrome extentions actions types.
const GET_MANIFEST = 'GET_MANIFEST';
const NEW_ORDER_ACTION = 'NEW_ORDER_ACTION';
const PING_ACTION = 'PING_ACTION';
const PLAY_CANCELED_ORDER_AUDIO_ACTION = 'PLAY_CANCELED_ORDER_AUDIO_ACTION';
const PLAY_NEW_ORDER_AUDIO_ACTION = 'PLAY_NEW_ORDER_AUDIO_ACTION';
const PLAY_OFFLINE_AUDIO_ACTION = 'PLAY_OFFLINE_AUDIO_ACTION';

const windowState = {
  FULLSCREEN: 'fullscreen',
  MAXIMIZED: 'maximized',
  MINIMIZED: 'minimized',
};

const query = (options) =>
  new Promise((resolve) => chrome.tabs.query(options, resolve));

const queryPartnersTabs = async () => {
  return query({
    url: [`http://${webAppUrlDomain}/*`, `https://${webAppUrlDomain}/*`],
  });
};

const queryAutoDiscardablePartnersTabs = async () => {
  return query({
    autoDiscardable: true,
    url: [`http://${webAppUrlDomain}/*`, `https://${webAppUrlDomain}/*`],
  });
};

const queryDiscardedPartnersTabs = async () => {
  return query({
    discarded: true,
    url: [`http://${webAppUrlDomain}/*`, `https://${webAppUrlDomain}/*`],
  });
};

const queryPinnedPartnersTabs = async () => {
  return query({
    pinned: true,
    url: [`http://${webAppUrlDomain}/*`, `https://${webAppUrlDomain}/*`],
  });
};

const queryAnyPinnedPartnersTab = async () => {
  const pinnedTabs = await queryPinnedPartnersTabs();
  return !!pinnedTabs && pinnedTabs.length > 0;
};

const notifyIfDiscardedPartnersTabs = async () => {
  const discardedPartnerTabs = await queryDiscardedPartnersTabs();

  if (!discardedPartnerTabs || discardedPartnerTabs.length === 0) return;

  chrome.notifications.clear(appInactivityNotificationId, () => {
    chrome.notifications.create(
      appInactivityNotificationId,
      {
        iconUrl: '../../images/rappi_48.png',
        type: 'basic',
        title: chrome.i18n.getMessage('appInactivityNotificationTitle'),
        message: chrome.i18n.getMessage('appInactivityNotificationMessage'),
      },
      function (notificationId) {},
    );
  });
};

const reloadDiscardedPartnersTabs = async () => {
  const discardedPartnerTabs = await queryDiscardedPartnersTabs();

  if (!discardedPartnerTabs || discardedPartnerTabs.length === 0) return;

  console.log('reloadDiscardedPartnersTabs - ', discardedPartnerTabs);

  discardedPartnerTabs.forEach((tab) =>
    chrome.tabs.reload(tab.id, { bypassCache: false }, () => {}),
  );

  chrome.notifications.clear(appReloadedByInactivityNotificationId, () => {
    chrome.notifications.create(
      appReloadedByInactivityNotificationId,
      {
        iconUrl: '../../images/rappi_48.png',
        type: 'basic',
        title: chrome.i18n.getMessage(
          'appReloadedByInactivityNotificationTitle',
        ),
        message: chrome.i18n.getMessage(
          'appReloadedByInactivityNotificationMessage',
        ),
      },
      function (notificationId) {},
    );
  });
};

const updateToNotDiscardable = (tabId) => {
  try {
    chrome.tabs.update(tabId, { autoDiscardable: false });
  } catch (ex) {
    console.error('updateToNotDiscardable - ', ex);
  }
};

const updateBulkToNotDiscardable = (tabs) => {
  if (!tabs) return;

  console.log('updateBulkToNotDiscardable - ', tabs);

  tabs.forEach((tab) => updateToNotDiscardable(tab.id));
};

const updateBulkPartnersTabsToNotDiscardable = async () => {
  const autoDiscardablePartnerTabs = await queryAutoDiscardablePartnersTabs();

  if (!autoDiscardablePartnerTabs) return;

  updateBulkToNotDiscardable(autoDiscardablePartnerTabs);
};

const pinTab = (tabId) => {
  chrome.tabs.update(tabId, { pinned: true });
};

const ensurePinnedPartnersTab = async () => {
  const anyPinnedTab = await queryAnyPinnedPartnersTab();

  if (anyPinnedTab) return;

  const partnersTabs = await queryPartnersTabs();

  if (!partnersTabs || partnersTabs.length === 0 || !partnersTabs[0]) return;
  console.log('ensurePinnedPartnersTab - ', partnersTabs[0]);
  pinTab(partnersTabs[0].id);
};

const maximizeWindow = (tab, callback) => {
  chrome.windows.update(
    tab.windowId,
    {
      drawAttention: true,
      focused: true,
      state: windowState.MAXIMIZED,
    },
    () => {
      console.log('window maximized');
      return callback();
    },
  );
};
const focusWindow = (tab) => {
  chrome.windows.update(
    tab.windowId,
    {
      drawAttention: true,
      focused: true,
    },
    () => {
      console.log('window focused');
      chrome.tabs.highlight({ tabs: tab.index }, () => {
        console.log('tab focused');
      });
    },
  );
};
const minimizeWindow = (windowId, callback) => {
  chrome.windows.update(
    windowId,
    { drawAttention: false, focused: false, state: windowState.MINIMIZED },
    () => {
      console.log('window minimized');
      return callback();
    },
  );
};
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log(`executing alarm - ${tabVerificationAlarmId}`, alarm);
  switch (alarm.name) {
    case tabVerificationAlarmId:
      updateBulkPartnersTabsToNotDiscardable();
      reloadDiscardedPartnersTabs();
      ensurePinnedPartnersTab();
      break;
    case tabInactivityNotificationAlarmId:
      notifyIfDiscardedPartnersTabs();
      break;
    default:
      break;
  }
});

chrome.notifications.onClicked.addListener((notificationId) => {
  focusApp();
});

chrome.runtime.onInstalled.addListener(function () {
  // It is important to remove all rules on installed event and before adding rules.
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          // The extension should work on all domains.
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: '.*' },
          }),
        ],
        actions: [],
      },
    ]);
  });
  console.log('OnInstalled');

  chrome.alarms.create(tabVerificationAlarmId, {
    when: Date.now(),
    periodInMinutes: tabVerificationIntervalMinutes,
  });

  chrome.alarms.create(tabInactivityNotificationAlarmId, {
    when: Date.now(),
    periodInMinutes: tabInactivityNotificationIntervalMinutes,
  });
});

chrome.tabs.onCreated.addListener(function (tab) {
  console.log('onCreated');
  updateBulkPartnersTabsToNotDiscardable();
  reloadDiscardedPartnersTabs();
  ensurePinnedPartnersTab();
});

chrome.tabs.onUpdated.addListener(function (tabId) {
  console.log('onUpdated');
  updateBulkPartnersTabsToNotDiscardable();
});

chrome.runtime.onSuspend.addListener(function () {
  console.log('Unloading.');
});
chrome.runtime.onSuspendCanceled.addListener(function () {
  console.log('onSuspendCanceled.');
});

const minimizeAll = () => {
  return new Promise((resolve, reject) => {
    chrome.windows.getAll({}, (windows) => {
      if (!windows || windows.length === 0) {
        resolve();
        return;
      }
      for (let i = 0; i < windows.length; i++) {
        minimizeWindow(windows[i].id, () => {
          if (i === windows.length - 1) {
            resolve();
            return;
          }
        });
      }
    });
  });
};

const focusApp = (orderId, partnerId) => {
  chrome.tabs.query(
    {
      url: [`http://${webAppUrlDomain}/*`, `https://${webAppUrlDomain}/*`],
    },
    (tabs) => {
      const firstTab = tabs[0];
      if (!firstTab) {
        return;
      }

      chrome.windows.get(firstTab.windowId, {}, (window) => {
        console.log('window found', window);

        let gaLabel = `partner_id=${partnerId}`;
        gaLabel = orderId ? gaLabel + `#order_id=${orderId}` : gaLabel;

        if (!window.focused) {
          minimizeAll().then(() => {
            maximizeWindow(firstTab, () => {
              focusWindow(firstTab);
            });
          });
        } else {
          focusWindow(firstTab);
        }
      });
    },
  );
};

/**
 * It is the audio instance.
 */
/**
 *  Represents the audio currently being played.
 */
const newOrder = (newOrdersTooltip, newOrdersTotal, orderId, partnerId) => {
  chrome.action.setTitle({ title: newOrdersTooltip }, () => {});
  const badgeText = newOrdersTotal > 0 ? newOrdersTotal : '';
  chrome.action.setBadgeText({ text: `${badgeText}` });
  if (orderId != null) {
    focusApp(orderId, partnerId);
  }
};

chrome.runtime.onMessageExternal.addListener(function (
  action,
  sender,
  sendResponse,
) {
  console.log(action);
  console.log(sender);
  console.log(sendResponse);

  try {
    if (
      !sender ||
      !sender.url ||
      sender.url === '' ||
      sender.url.indexOf(webAppUrlDomain) === -1
    ) {
      // If sender is a different app than specified, just return;
      sendResponse({
        success: false,
        message: `Sender url not valid.`,
      });
      return;
    }

    if (!action) {
      // Action must exist.
      console.error('No action was received.');
      sendResponse({
        success: false,
        message: `No action was received.`,
      });
      return;
    }
    switch (action.type) {
      case GET_MANIFEST:
        try {
          const manifest = chrome.runtime.getManifest();
          sendResponse({
            success: true,
            result: manifest,
          });
        } catch (ex) {
          console.error(ex);
        }
        return;
      case NEW_ORDER_ACTION:
        newOrder(
          action.newOrdersTooltip,
          action.newOrdersTotal,
          action.orderId,
          action.partnerId,
        );
        sendResponse({
          success: true,
          result: null,
        });
        return;
      case PLAY_CANCELED_ORDER_AUDIO_ACTION:
        sendResponse({
          success: true,
          result: null,
        });
        return;
      case PLAY_NEW_ORDER_AUDIO_ACTION:
        sendResponse({
          success: true,
          result: null,
        });
        return;
      case PLAY_OFFLINE_AUDIO_ACTION:
        sendResponse({
          success: true,
          result: null,
        });
        return;
      case PING_ACTION:
        sendResponse({
          success: true,
          result: null,
        });
        return;
      default:
        sendResponse({
          success: false,
          result: `Action ${action.type} not found.`,
        });
        return;
    }
  } catch (ex) {
    console.error(ex);
    sendResponse({
      success: false,
      result: `Unexpected error executing action.`,
    });
  }
});
