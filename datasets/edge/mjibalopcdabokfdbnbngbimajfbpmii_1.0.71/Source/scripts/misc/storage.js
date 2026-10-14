/* global chrome */
import { apiActions } from '../enums/actions.js';
import { getCurrentTab } from './browser.js';

export const getToken = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      chrome.storage.local.get('token', ({ token }) => {
        if (token) {
          resolve(token);
          return true;
        } else {
          reject(false);
          return false;
        }
      });
    } catch (e) {
      const tab = await getCurrentTab();
      if (tab) {
        chrome.tabs.sendMessage(tab.id, {
          action: `CHROME_STORAGE_${apiActions.ERROR}`,
          body: { message: 'Chrome Storage seems to be overused, please wait a moment and try again.' },
        });
      }
      console.log('Chrome storage error! ', e);
      reject(false);
      return false;
    }
  }).catch((e) => console.log(e));
};

export const getUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      chrome.storage.local.get('user', ({ user }) => {
        if (user) {
          resolve(user);
          return true;
        } else {
          reject(false);
          return false;
        }
      });
    } catch (e) {
      const tab = await getCurrentTab();
      if (tab) {
        chrome.tabs.sendMessage(tab.id, {
          action: `CHROME_STORAGE_${apiActions.ERROR}`,
          body: { message: 'Chrome Storage seems to be overused, please wait a moment and try again.' },
        });
      }
      console.log('Chrome storage error! ', e);
      reject(false);
      return false;
    }
  }).catch((e) => console.log(e));
};

export const saveContacts = async (contacts) => {
  chrome.storage.sync.set({ analysisContacts: contacts });
};

export const getContactsFromStorage = async (tabId, hashedEmails, profiles, responseAction) => {
  chrome.storage.sync.get('analysisContacts', ({ analysisContacts }) => {
    chrome.tabs.sendMessage(tabId, {
      action: responseAction,
      body: {
        analysisContacts,
        hashedEmailsResponse: hashedEmails,
        profiles: profiles,
      },
    });
  });
};
