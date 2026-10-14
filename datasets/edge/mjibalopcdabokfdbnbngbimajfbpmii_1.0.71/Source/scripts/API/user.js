/* global chrome */
import getConfig from '../config/default.js';
import { authFetch } from '../../modules/fetch.js';
import { responseHandler } from './apiHelper.js';
import { getToken } from '../misc/storage.js';
import { userActions } from '../enums/actions.js';

export const getUserInfo = async (tabId, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURL = config.BASE_URL;
  if (token) {
    try {
      const res = await authFetch(baseURL + '/user/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.accessToken,
        },
      });

      const data = await responseHandler(res, tabId, responseAction);

      if (data) {
        chrome.tabs.sendMessage(tabId, { action: responseAction, body: data });
      } else {
        console.error('Error while executing get user info request!');
      }
    } catch (e) {
      console.error('Error while executing get user info request!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const getLicenseInfo = async (tabId, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURLV2 = config.BASE_URL_V2;
  if (token) {
    try {
      const res = await authFetch(baseURLV2 + '/linkedin/getLicenseInfo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.accessToken,
        },
      });

      const data = await responseHandler(res, tabId, responseAction);

      if (data) {
        chrome.tabs.sendMessage(tabId, { action: responseAction, body: data });
      } else {
        console.error('Error while executing get license info request!');
      }
    } catch (e) {
      console.error('Error while executing get license info request!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};
