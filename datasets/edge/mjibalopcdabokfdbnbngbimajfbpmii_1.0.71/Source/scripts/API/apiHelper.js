/* global chrome */
import { authFetch } from '../../modules/fetch.js';
import { apiActions, augmentedWritingActions, linkedinActions } from '../enums/actions.js';

export const responseHandler = (response, tabId, action, data = {}) => {
  if (response) {
    if (response.ok) {
      if (action === augmentedWritingActions.POST_AUGMENTED_WRITING_SUGGESTIONS_REQUEST) {
        chrome.tabs.sendMessage(tabId, {
          action: augmentedWritingActions.SET_CORE_COMMIT,
          body: { coreCommit: response.headers.get('100w-core-commit') },
        });
      }
      return response.json();
    } else {
      if (response.status >= 400 && response.status < 500 && response.status !== 409) {
        response
          .json()
          .then((err) => chrome.tabs.sendMessage(tabId, { action: `${action}${apiActions.ERROR}`, body: err }))
          .catch((e) => {
            console.log('Error in response handler: ', e);
            chrome.tabs.sendMessage(tabId, { action: `${action}${apiActions.ERROR}`, body: e });
          });
      } else if (response.status >= 500) {
        chrome.tabs.sendMessage(tabId, {
          action: `${action}${apiActions.ERROR}`,
          body: { message: `${response.status}: ${apiActions.ERROR} - Our server has issues with ${action}.\nPlease try again later.` },
        });
      } else {
        chrome.tabs.sendMessage(tabId, {
          action: `${action}${apiActions.ERROR}`,
          body: { message: `${response.status}: Unknown ${apiActions.ERROR} with ${action}.\nPlease try again later.` },
        });
      }
      return false;
    }
  } else {
    chrome.tabs.sendMessage(tabId, {
      action: `${action}${apiActions.ERROR}`,
      body: { message: `000: Unknown ${apiActions.ERROR} with ${action}.\nPlease try again later.` },
    });
    return false;
  }
};

export const linkedInGetUserCustomResponseHandler = (response, tabId, action, token, liAtCookie, sessionCookie, threadId, baseURLV2) => {
  if (response) {
    if (response.ok) {
      return response.json();
    } else {
      if (response.status >= 400 && response.status < 500) {
        if (response.status === 401) {
          response
            .json()
            .then((err) => chrome.tabs.sendMessage(tabId, { action: `${action}${apiActions.ERROR}`, body: err }))
            .catch((e) => {
              console.log('Error in response handler: ', e);
              chrome.tabs.sendMessage(tabId, { action: `${action}${apiActions.ERROR}`, body: e });
            });
        } else {
          authFetch(baseURLV2 + '/linkedin/getProfileFromThread', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token?.accessToken,
            },
            body: JSON.stringify({ liAtCookie, sessionCookie, threadId }),
          })
            .then((response) => responseHandler(response, tabId, linkedinActions.ANALYZE_LINKEDIN_MESSAGE))
            .then((data) => {
              if (data) {
                chrome.tabs.sendMessage(tabId, { action: linkedinActions.GET_LINKEDIN_CONTACT_BY_ID_RESPONSE, body: data });
              }
            })
            .catch((e) => {
              console.log('Error in linkedin response handler: ', e);
              chrome.tabs.sendMessage(tabId, { action: `${action}${apiActions.ERROR}`, body: e });
            });
        }
      } else if (response.status >= 500) {
        chrome.tabs.sendMessage(tabId, {
          action: `${action}${apiActions.ERROR}`,
          body: { message: `${response.status}: ${apiActions.ERROR} - Our server has issues with ${action}.\nPlease try again later.` },
        });
      } else {
        chrome.tabs.sendMessage(tabId, {
          action: `${action}${apiActions.ERROR}`,
          body: { message: `${response.status}: Unknown ${apiActions.ERROR} with ${action}.\nPlease try again later.` },
        });
      }
      return false;
    }
  } else {
    chrome.tabs.sendMessage(tabId, {
      action: `${action}${apiActions.ERROR}`,
      body: { message: `000: Unknown ${apiActions.ERROR} with ${action}.\nPlease try again later.` },
    });
    return false;
  }
};

export const linkedInGetSalesNavUserCustomResponseHandler = (
  response,
  tabId,
  action,
  token,
  liAtCookie,
  sessionCookie,
  seatCookie,
  threadId,
  baseURLV2
) => {
  if (response) {
    if (response.ok) {
      return response.json();
    } else {
      if (response.status >= 400 && response.status < 500) {
        if (response.status === 401) {
          response
            .json()
            .then((err) => chrome.tabs.sendMessage(tabId, { action: `${action}${apiActions.ERROR}`, body: err }))
            .catch((e) => {
              console.log('Error in response handler: ', e);
              chrome.tabs.sendMessage(tabId, { action: `${action}${apiActions.ERROR}`, body: e });
            });
        } else {
          authFetch(baseURLV2 + '/linkedin/salesNav/getProfileFromThread', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token?.accessToken,
            },
            body: JSON.stringify({ liAtCookie, sessionCookie, seatCookie, threadId }),
          })
            .then((response) => responseHandler(response, tabId, linkedinActions.ANALYZE_LINKEDIN_MESSAGE))
            .then((data) => {
              if (data) {
                chrome.tabs.sendMessage(tabId, { action: linkedinActions.GET_LINKEDIN_CONTACT_BY_ID_RESPONSE, body: data });
              }
            })
            .catch((e) => {
              console.log('Error in linkedin response handler: ', e);
              chrome.tabs.sendMessage(tabId, { action: `${action}${apiActions.ERROR}`, body: e });
            });
        }
      } else if (response.status >= 500) {
        chrome.tabs.sendMessage(tabId, {
          action: `${action}${apiActions.ERROR}`,
          body: { message: `${response.status}: ${apiActions.ERROR} - Our server has issues with ${action}.\nPlease try again later.` },
        });
      } else {
        chrome.tabs.sendMessage(tabId, {
          action: `${action}${apiActions.ERROR}`,
          body: { message: `${response.status}: Unknown ${apiActions.ERROR} with ${action}.\nPlease try again later.` },
        });
      }
      return false;
    }
  } else {
    chrome.tabs.sendMessage(tabId, {
      action: `${action}${apiActions.ERROR}`,
      body: { message: `000: Unknown ${apiActions.ERROR} with ${action}.\nPlease try again later.` },
    });
    return false;
  }
};
