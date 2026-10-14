/* global chrome */
import getConfig from '../scripts/config/default.js';
import { getCurrentTab } from '../scripts/misc/browser.js';
import { getToken, getUser } from '../scripts/misc/storage.js';
import { userActions } from '../scripts/enums/actions.js';

const authFetch = function () {
  return new Promise(async (resolve, reject) => {
    const originalReq = arguments;
    try {
      const tab = await getCurrentTab();
      const token = await getToken();
      const user = await getUser();
      const config = await getConfig();
      const baseURL = config.BASE_URL;

      if (token && token?.accessToken && user && user?.email) {
        fetch
          .apply(this, arguments)
          .then((response) => {
            if (response.status === 401 && !originalReq[1].__isRetryRequest) {
              originalReq[1].__isRetryRequest = true;
              const res = fetch(baseURL + '/refresh-token', {
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
                    originalReq[1].headers.Authorization = 'Bearer ' + resJson.accessToken;
                    chrome?.storage.local.set({ token: resJson });
                    return fetch.apply(this, originalReq);
                  } else {
                    chrome.tabs.sendMessage(tab?.id, { action: userActions.LOGOUT_RESPONSE, body: 'token refresh failed' });
                  }
                })
                .catch((refreshErr) => {
                  chrome.tabs.sendMessage(tab?.id, { action: userActions.LOGOUT_RESPONSE, body: 'token not refreshable' });
                });
              resolve(res);
              return true;
            }
            resolve(response);
            return true;
          })
          .catch((error) => {
            console.log(error);
            reject(arguments);
            return false;
          });
      } else {
        console.log('no token');
        chrome.tabs.sendMessage(tab?.id, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
      }
    } catch (e) {
      console.log(e);
    }
  });
};

export { authFetch };
