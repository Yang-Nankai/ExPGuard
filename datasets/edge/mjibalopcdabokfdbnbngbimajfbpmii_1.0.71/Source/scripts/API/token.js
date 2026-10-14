/* global chrome */
import getConfig from '../config/default.js';
import { getToken, getUser } from '../misc/storage.js';
import { userActions, apiActions } from '../enums/actions.js';

export const getRefreshToken = async (tabId) => {
  const token = await getToken();
  const user = await getUser();
  const config = await getConfig();
  const baseURL = config.BASE_URL;
  if (token && user) {
    fetch(baseURL + '/refresh-token', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token?.accessToken,
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({
        email: user?.email,
      }),
    })
      .then((refreshResponse) => refreshResponse.json())
      .then((resJson) => {
        if (resJson?.accessToken) {
          chrome.storage.local.set({ token: resJson });
          chrome.tabs.sendMessage(tabId, { action: apiActions.REVALIDATE_TOKEN });
        } else {
          chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'token refresh failed' });
        }
      })
      .catch((refreshErr) => {
        console.log(refreshErr);
        chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'token not refreshable' });
      });
  } else {
    console.log('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};
