/* global chrome */
import { authFetch } from '../../modules/fetch.js';
import getConfig from '../config/default.js';
import { textGenerationActions, userActions } from '../enums/actions.js';
import { getToken } from '../misc/storage.js';
import { responseHandler } from './apiHelper.js';

export const getTextVariantStream = async (
  tabId,
  profile,
  offer,
  genre,
  occupation,
  problems,
  textVariants,
  globalContact,
  dataLang,
  isFormal,
  includeEmoji,
) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURL = config.BASE_URL_V2;
  if (token) {
    try {
      let tempText = '';
      authFetch(`${baseURL}/boosterProject/getStreamingTextVariant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.accessToken,
          Accept: 'text/event-stream',
        },
        body: JSON.stringify({
          profile,
          offer,
          genre,
          occupation,
          problems,
          variants: textVariants,
          globalContact,
          dataLang,
          isFormal,
          includeEmoji,
        }),
      }).then((response) => {
        // eslint-disable-next-line no-undef
        const readableStream = response.body.pipeThrough(new TextDecoderStream());
        const reader = readableStream.getReader();
        return new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              return reader
                .read()
                .then(({ done, value }) => {
                  // When no more data needs to be consumed, close the stream
                  if (done) {
                    controller.close();
                    chrome.tabs.sendMessage(tabId, {
                      action: textGenerationActions.CREATE_TEXT_GENERATION_STREAM_END,
                      body: { text: tempText, score: 0 },
                    });
                    return;
                  }
                  const regex = /\{.*\}/gm;
                  const found = value.match(regex);
                  if (found) {
                    for (const match of found) {
                      const parsedData = JSON.parse(match);
                      const streamUnit = parsedData?.response ?? '';

                      if (tempText === '' && streamUnit === '\n') {
                        tempText += '';
                      } else {
                        tempText += streamUnit;
                      }
                    }
                  }

                  const newGeneratedText = { text: tempText, score: 0 };
                  chrome.tabs.sendMessage(tabId, { action: textGenerationActions.CREATE_TEXT_GENERATION_STREAM_RESPONSE, body: newGeneratedText });
                  // Enqueue the next data chunk into our target stream
                  controller.enqueue(value);
                  return pump();
                })
                .catch((err) => chrome.tabs.sendMessage(tabId, { action: textGenerationActions.CREATE_TEXT_GENERATION_STREAM_ERROR, body: err }));
            }
          },
        });
      });
    } catch (e) {
      console.error('Error while getting variants stream!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const getAllBoosterProjects = async (tabId, searchParam, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURL = config.BASE_URL_V2;
  if (token) {
    try {
      let url = baseURL + '/boosterProject/getAllBoosterProjects';
      if (searchParam) {
        url = `${baseURL}/boosterProject/getAllBoosterProjects?genre=${searchParam}`;
      }
      const res = await authFetch(url, {
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
        console.error('Error while getting all booster projects!');
      }
    } catch (e) {
      console.error('Error while getting all booster projects!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const getBoosterProjectById = async (tabId, projectId, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURL = config.BASE_URL_V2;
  if (token) {
    try {
      const res = await authFetch(baseURL + `/boosterProject/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.accessToken,
        },
      });

      await responseHandler(res, tabId, responseAction);
    } catch (e) {
      console.error('Error while getting single booster project!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};

export const createBoosterProject = async (tabId, body, responseAction) => {
  const token = await getToken();
  const config = await getConfig();
  const baseURL = config.BASE_URL_V2;
  if (token) {
    try {
      const res = await authFetch(baseURL + '/boosterProject/createBoosterProject', {
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
        console.error('Error while creating a booster project!');
      }
    } catch (e) {
      console.error('Error while creating a booster project!', e);
    }
  } else {
    console.error('no token');
    chrome.tabs.sendMessage(tabId, { action: userActions.LOGOUT_RESPONSE, body: 'no token' });
  }
};
