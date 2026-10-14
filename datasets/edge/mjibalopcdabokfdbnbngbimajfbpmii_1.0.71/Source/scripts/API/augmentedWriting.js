/* global chrome */
import { authFetch } from '../../modules/fetch.js';
import getConfig from '../config/default.js';
import { userActions } from '../enums/actions.js';
import { getToken } from '../misc/storage.js';
import { responseHandler } from './apiHelper.js';

const AWTypes = {
  TALENT: 'talent',
  BRAND: 'brand',
  CUSTOMER: 'customer',
  CUSTOMER_LONG: 'customer-long',
  BLOG: 'blog',
  LINKEDIN: 'linkedin',
  LINKEDIN_MSG: 'linkedin_msg',
};

const AWTriggers = {
  DomainChange: 'domainChange',
  Suggestion: 'suggestion',
  Manual: 'manual',
  ContactChanged: 'contactChanged',
  LoadText: 'loadText',
};

export const augmentedWritingAnalysis = async (tabId, body, responseAction, signal) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURL = config.BASE_URL;
  if (token) {
    try {
      const res = await authFetch(baseURL + '/augmentedWriting/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token?.accessToken,
        },
        body: JSON.stringify(body),
        signal: signal,
      });

      const data = await responseHandler(res, tabId, responseAction);

      if (data) {
        chrome.tabs.sendMessage(tabId, { action: responseAction, body: data });
      } else {
        console.error('Error while executing augmented writing analysis!');
      }
    } catch (e) {
      if (!e[1]?.signal.aborted) {
        console.error('Error while executing augmented writing analysis!', e);
      }
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const createUserBehavior = async (tabId, session, sessionStatus, scoresValue, responseAction, wordCount) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURL = config.BASE_URL;
  if (token) {
    try {
      const res = await authFetch(baseURL + '/userBehavior', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.accessToken,
        },
        body: JSON.stringify({
          session: session,
          sessionStatus: sessionStatus,
          scoresValue: scoresValue,
          wordCount,
          domain: AWTypes.LINKEDIN_MSG,
          awTrigger: AWTriggers.Manual,
        }),
      });

      await responseHandler(res, tabId, responseAction);
    } catch (e) {
      console.error('Error while executing create user behavior request!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const getBehaviorLastSession = async (tabId, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURL = config.BASE_URL;
  if (token) {
    try {
      const res = await authFetch(baseURL + '/userBehavior/lastSession', {
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
        console.error('Error while executing get user behavior last session request!');
      }
    } catch (e) {
      console.error('Error while executing get user behavior last session request!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const createLinkedinEvent = async (tabId, assessmentName, contact, scoresValue, responseAction, usedAt, eventType) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURL = config.BASE_URL_V2;
  if (token) {
    try {
      const res = await authFetch(baseURL + '/linkedinevent', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.accessToken,
        },
        body: JSON.stringify({
          assessmentName: assessmentName,
          contact: contact,
          finalScore: scoresValue ? scoresValue : undefined,
          usedAt: usedAt,
          eventType,
        }),
      });

      await responseHandler(res, tabId, responseAction);
    } catch (e) {
      console.error('Error while executing create linkedin event request!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const saveIgnoredSuggestions = async (tabId, fingerprints, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURL = config.BASE_URL_V2;
  if (token) {
    try {
      const res = await authFetch(baseURL + '/ignore/saveIgnoredSuggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.accessToken,
        },
        body: JSON.stringify({
          fingerprints,
        }),
      });

      await responseHandler(res, tabId, responseAction);
    } catch (e) {
      console.error('Error while saving ignored suggestions from augmented writing!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const quickOptimization = async (tabId, body, count, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURL = config.BASE_URL;
  if (token) {
    try {
      const res = await authFetch(baseURL + '/augmentedWriting/quick_optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.accessToken,
        },
        body: JSON.stringify(body),
      });

      const data = await responseHandler(res, tabId, responseAction);

      if (data) {
        chrome.tabs.sendMessage(tabId, { action: responseAction, body: data, count, requestBody: body });
      } else {
        console.error('Error while Augmented Writing quick optimization analysis!');
      }
    } catch (e) {
      console.error('Error while Augmented Writing quick optimization analysis!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const formatText = async (tabId, body, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURL = config.BASE_URL_V2;
  if (token) {
    try {
      const res = await authFetch(baseURL + '/formatText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.accessToken,
        },
        body: JSON.stringify(body),
      });

      const data = await responseHandler(res, tabId, responseAction);

      if (data) {
        chrome.tabs.sendMessage(tabId, { action: responseAction, body: data });
      } else {
        console.error('Error while automated text formatting!');
      }
    } catch (e) {
      console.error('Error while automated text formatting!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};
