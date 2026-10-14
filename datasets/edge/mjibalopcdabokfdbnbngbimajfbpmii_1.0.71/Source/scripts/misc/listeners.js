/* global chrome */
import getConfig from '../config/default.js';
import { apiActions, generalActions } from '../enums/actions.js';

export const onExtensionInstalled = () => {
  chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      chrome.storage.local.get(['installed', 'hostDomain'], async ({ installed, hostDomain }) => {
        if (!installed) {
          if (!hostDomain) {
            const config = await getConfig();
            chrome.tabs.create({
              url: `${config.HOST_DOMAIN}/dashboard/extension/installation/success`,
              active: true,
            });
          } else {
            chrome.tabs.create({
              url: `${hostDomain}/dashboard/extension/installation/success`,
              active: true,
            });
          }

          chrome.storage.local.set({ installed: true });

          (async () => {
            const config = await getConfig();
            chrome.storage.local.set({ hostDomain: config.HOST_DOMAIN });
          })();
        }
      });
    }

    if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
      (async () => {
        const config = await getConfig();

        chrome.storage.local.set({ hostDomain: config.HOST_DOMAIN });
      })();
    }
  });
};

export const onExtensionActivated = () => {
  chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.sendMessage(activeInfo.tabId, { action: apiActions.REVALIDATE_TOKEN }).catch((e) => {
      return false;
    });
  });
};

export const onExtensionUpdated = () => {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    chrome.tabs
      .sendMessage(tabId, {
        action: generalActions.URL_CHANGED,
        body: { currentUrl: changeInfo.url },
      })
      .catch((e) => {
        return false;
      });
  });
};
