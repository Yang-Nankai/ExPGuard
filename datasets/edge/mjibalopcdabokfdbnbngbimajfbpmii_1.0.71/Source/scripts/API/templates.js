/* global chrome */
import { authFetch } from '../../modules/fetch.js';
import { getToken } from '../misc/storage.js';
import getConfig from '../config/default.js';
import { userActions } from '../enums/actions.js';
import { responseHandler } from './apiHelper.js';

export const getTemplates = async (tabId, assessmentName, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURL = config.BASE_URL;
  if (token) {
    try {
      const res = await authFetch(baseURL + `/emailTemplates/${assessmentName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.accessToken,
        },
      });

      const data = await responseHandler(res, tabId, responseAction);

      if (data) {
        chrome.tabs.sendMessage(tabId, { action: responseAction, body: data });
      } else {
        console.error('Error while executing get templates request!');
      }
    } catch (e) {
      console.error('Error while executing get templates request!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};
