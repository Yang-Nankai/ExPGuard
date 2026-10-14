/* global chrome */
import { authFetch } from '../../modules/fetch.js';
import getConfig from '../config/default.js';
import { linkedinActions, userActions } from '../enums/actions.js';
import { getToken } from '../misc/storage.js';
import { linkedInGetSalesNavUserCustomResponseHandler, linkedInGetUserCustomResponseHandler, responseHandler } from './apiHelper.js';

export const getLinkedinContact = async (tabId, profileId, liAt, jSessionId, lang, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURLV2 = config.BASE_URL_V2;
  if (token) {
    try {
      const res = await authFetch(baseURLV2 + `/linkedin/addContact?lang=${lang}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token?.accessToken,
        },
        body: JSON.stringify({ liAtCookie: liAt.value, sessionCookie: jSessionId.value, profileId: profileId }),
      });

      const data = await linkedInGetUserCustomResponseHandler(res, tabId, responseAction, token, liAt.value, jSessionId.value, profileId, baseURLV2);

      if (data) {
        chrome.tabs.sendMessage(tabId, {
          action: linkedinActions.GET_LINKEDIN_CONTACT_BY_ID_RESPONSE,
          body: data,
          linkedInHandle: profileId,
        });
      } else {
        console.error('Error while executing get linkedin contact request!');
      }
    } catch (e) {
      console.error('Error while executing get linkedin contact request!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const getLinkedinSalesNavContact = async (tabId, profileId, liAt, jSessionId, seatCookie, lang, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURLV2 = config.BASE_URL_V2;
  if (token) {
    try {
      const res = await authFetch(baseURLV2 + `/linkedin/salesNav/addContact?lang=${lang}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token?.accessToken,
        },
        body: JSON.stringify({
          liAtCookie: liAt.value,
          seatCookie: seatCookie.value,
          sessionCookie: jSessionId.value,
          profileId: profileId,
        }),
      });

      const data = await linkedInGetSalesNavUserCustomResponseHandler(
        res,
        tabId,
        responseAction,
        token,
        liAt.value,
        jSessionId.value,
        seatCookie.value,
        profileId,
        baseURLV2
      );

      if (data) {
        chrome.tabs.sendMessage(tabId, {
          action: linkedinActions.GET_LINKEDIN_CONTACT_BY_ID_RESPONSE,
          body: data,
          linkedInHandle: profileId,
        });
      } else {
        console.error('Error while executing get linkedin sales nav contact request!');
      }
    } catch (e) {
      console.error('Error while executing get linkedin sales nav contact request!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const getLinkedinRecruiterContact = async (tabId, profileId, liAt, jSessionId, seatCookie, lang, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURLV2 = config.BASE_URL_V2;
  if (token) {
    try {
      const res = await authFetch(baseURLV2 + `/linkedin/lirec/addContact?lang=${lang}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token?.accessToken,
        },
        body: JSON.stringify({
          liAtCookie: liAt.value,
          seatCookie: seatCookie.value,
          sessionCookie: jSessionId.value,
          profileId: profileId,
        }),
      });

      const data = await linkedInGetSalesNavUserCustomResponseHandler(
        res,
        tabId,
        responseAction,
        token,
        liAt.value,
        jSessionId.value,
        seatCookie.value,
        profileId,
        baseURLV2,
      );

      if (data) {
        chrome.tabs.sendMessage(tabId, {
          action: linkedinActions.GET_LINKEDIN_CONTACT_BY_ID_RESPONSE,
          body: data,
          linkedInHandle: profileId,
        });
      } else {
        console.error('Error while executing get linkedin recruiter contact request!');
      }
    } catch (e) {
      console.error('Error while executing get linkedin recruiter contact request!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const getLinkedinUserFromUserName = async (tabId, profileId, liAt, jSessionId, source, lang, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURLV2 = config.BASE_URL_V2;
  if (token) {
    try {
      const res = await authFetch(baseURLV2 + `/linkedin/getProfileFromUserName?lang=${lang}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token?.accessToken,
        },
        body: JSON.stringify({ liAtCookie: liAt.value, sessionCookie: jSessionId.value, profileId: profileId }),
      });

      const data = await responseHandler(res, tabId, responseAction);

      if (data) {
        chrome.tabs.sendMessage(tabId, {
          action: linkedinActions.GET_LINKEDIN_CONTACT_BY_ID_RESPONSE,
          body: data,
          linkedInHandle: profileId,
          source: source,
        });
      } else {
        console.error('Error while executing get linkedin user from name request!');
      }
    } catch (e) {
      console.error('Error while executing get linkedin user from name request!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const getLinkedinSalesNavUserFromUserName = async (tabId, profileId, liAt, jSessionId, seatCookie, source, lang, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURLV2 = config.BASE_URL_V2;
  if (token) {
    try {
      const res = await authFetch(baseURLV2 + `/linkedin/salesNav/getProfileFromUserName?lang=${lang}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token?.accessToken,
        },
        body: JSON.stringify({
          liAtCookie: liAt.value,
          sessionCookie: jSessionId.value,
          seatCookie: seatCookie.value,
          profileId: profileId,
        }),
      });

      const data = await responseHandler(res, tabId, responseAction);

      if (data) {
        chrome.tabs.sendMessage(tabId, {
          action: linkedinActions.GET_LINKEDIN_CONTACT_BY_ID_RESPONSE,
          body: data,
          linkedInHandle: profileId,
          source: source,
        });
      } else {
        console.error('Error while executing get linkedin sales nav user from name request!');
      }
    } catch (e) {
      console.error('Error while executing get linkedin sales nav user from name request!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const getLinkedinRecruiterUserFromUserName = async (tabId, profileId, liAt, jSessionId, seatCookie, source, lang, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURLV2 = config.BASE_URL_V2;
  if (token) {
    try {
      const res = await authFetch(baseURLV2 + `/linkedin/lirec/getProfileFromUserName?lang=${lang}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token?.accessToken,
        },
        body: JSON.stringify({
          liAtCookie: liAt.value,
          sessionCookie: jSessionId.value,
          seatCookie: seatCookie.value,
          profileId: profileId,
        }),
      });

      const data = await responseHandler(res, tabId, responseAction);

      if (data) {
        chrome.tabs.sendMessage(tabId, {
          action: linkedinActions.GET_LINKEDIN_CONTACT_BY_ID_RESPONSE,
          body: data,
          linkedInHandle: profileId,
          source: source,
        });
      } else {
        console.error('Error while executing get linkedin recruiter user from name request!');
      }
    } catch (e) {
      console.error('Error while executing get linkedin recruiter user from name request!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const analyzeLinkedinMessageThread = async (tabId, threadId, liAt, jSessionId, lang, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURLV2 = config.BASE_URL_V2;
  if (token) {
    try {
      await authFetch(baseURLV2 + '/linkedin/addMessageThread', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token?.accessToken,
        },
        body: JSON.stringify({ liAtCookie: liAt.value, sessionCookie: jSessionId.value, threadId: threadId }),
      });

      // const dataAddThread = await responseHandler(resAddThread, tabId, responseAction);

      const resProfile = await authFetch(baseURLV2 + `/linkedin/getProfileFromThread?lang=${lang}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token?.accessToken,
        },
        body: JSON.stringify({ liAtCookie: liAt.value, sessionCookie: jSessionId.value, threadId: threadId }),
      });

      const dataProfile = await responseHandler(resProfile, tabId, responseAction);
      if (dataProfile) {
        chrome.tabs.sendMessage(tabId, {
          action: linkedinActions.GET_LINKEDIN_CONTACT_BY_ID_RESPONSE,
          body: dataProfile,
        });
      } else {
        console.error('Error while executing get linkedin profile from message thread request!');
      }
    } catch (e) {
      console.error('Error while executing analyze linkedin message thread request!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const analyzeLinkedinSalesNavMessageThread = async (tabId, threadId, liAt, jSessionId, seatCookie, lang, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURLV2 = config.BASE_URL_V2;
  if (token) {
    try {
      const resAddThread = await authFetch(baseURLV2 + '/linkedin/salesNav/addMessageThread', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token?.accessToken,
        },
        body: JSON.stringify({
          liAtCookie: liAt.value,
          sessionCookie: jSessionId.value,
          seatCookie: seatCookie.value,
          threadId: threadId,
        }),
      });

      const dataAddThread = await responseHandler(resAddThread, tabId, responseAction);

      if (dataAddThread) {
        const resProfile = await authFetch(baseURLV2 + `/linkedin/salesNav/getProfileFromThread?lang=${lang}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token?.accessToken,
          },
          body: JSON.stringify({
            liAtCookie: liAt.value,
            sessionCookie: jSessionId.value,
            seatCookie: seatCookie.value,
            threadId: threadId,
          }),
        });

        const dataProfile = await responseHandler(resProfile, tabId, responseAction);
        if (dataProfile) {
          chrome.tabs.sendMessage(tabId, {
            action: linkedinActions.GET_LINKEDIN_CONTACT_BY_ID_RESPONSE,
            body: dataProfile,
          });
        } else {
          console.error('Error while executing get linkedin sales nav profile from message thread request!');
        }
      } else {
        console.error('Error while executing add linkedin sales nav message thread request!');
      }
    } catch (e) {
      console.error('Error while executing analyze linkedin sales nav message thread request!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const analyzeLinkedinRecruiterMessageThread = async (tabId, profileId, liAt, jSessionId, seatCookie, lang, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURLV2 = config.BASE_URL_V2;
  if (token) {
    try {
      const res = await authFetch(baseURLV2 + `/linkedin/lirec/addMessageThread?lang=${lang}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token?.accessToken,
        },
        body: JSON.stringify({
          liAtCookie: liAt.value,
          sessionCookie: jSessionId.value,
          seatCookie: seatCookie.value,
          profileId: profileId,
        }),
      });

      const data = await responseHandler(res, tabId, responseAction);

      if (data) {
        chrome.tabs.sendMessage(tabId, {
          action: linkedinActions.GET_LINKEDIN_CONTACT_BY_ID_RESPONSE,
          body: data,
          linkedInHandle: profileId,
        });
      } else {
        console.error('Error while executing add linkedin recruiter message thread request!');
      }
    } catch (e) {
      console.error('Error while executing analyze linkedin recruiter message thread request!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const analyzeLinkedinContacts = async (tabId, liAt, jSessionId, lang, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURL = config.BASE_URL;
  if (token) {
    try {
      const res = await authFetch(baseURL + `/metrics/initialKpi?lang=${lang}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token?.accessToken,
        },
        body: JSON.stringify({
          liAtCookie: liAt.value,
          sessionCookie: jSessionId.value,
        }),
      });
      const data = await responseHandler(res, tabId, responseAction);
      if (data) {
        chrome.tabs.sendMessage(tabId, {
          action: linkedinActions.ANALYZE_LINKEDIN_CONTACTS,
          finished: data === true,
        });
      }
  } catch (e) {
    console.error('Error while analyzing linkedin contacts', e);
  }
} else {
  console.error('no token');
  chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
}
};

export const checkAnalysisResults = async (tabId, phaseId, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURL = config.BASE_URL;
  if (token) {
    try {
      const res = await authFetch(baseURL + `/metrics/linkedKpiForProfiles?phaseId=${phaseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token?.accessToken,
        },
      });
      const data = await responseHandler(res, tabId, responseAction);
      if (data) {
        let count = 0;
        const profiles = Object.values(data.profilesMap);
        profiles.forEach((profile) => {
          count = count + profile.absoluteCount;
        });
        chrome.tabs.sendMessage(tabId, {
          action: linkedinActions.GET_CONTACT_ANALYSIS_RESULTS,
          count,
        });
      }
  } catch (e) {
    console.error('Error while retrieving analysis results', e);
  }
} else {
  console.error('no token');
  chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
}
};

export const getContactRequestPhase = async (tabId, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURL = config.BASE_URL;
  if (token) {
    try {
      const res = await authFetch(baseURL + '/phases', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token?.accessToken,
        },
      });
      const data = await responseHandler(res, tabId, responseAction);
      if (data) {
        let contactPhase;
        data.phases.forEach((phase) => {
          if (phase.name === 'Contactrequest') {
            contactPhase = phase.id;
          }
        });
        chrome.tabs.sendMessage(tabId, {
          action: linkedinActions.GET_CONTACT_REQUEST_PHASE,
          phaseId : contactPhase,
        });
      }
  } catch (e) {
    console.error('Error while retrieving phases from api', e);
  }
} else {
  console.error('no token');
  chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
}
};
