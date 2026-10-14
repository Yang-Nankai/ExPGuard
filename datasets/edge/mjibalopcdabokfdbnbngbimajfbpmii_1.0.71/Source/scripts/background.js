/* global chrome */
import {
  augmentedWritingAnalysis,
  createLinkedinEvent,
  createUserBehavior,
  formatText,
  getBehaviorLastSession,
  quickOptimization,
  saveIgnoredSuggestions,
} from './API/augmentedWriting.js';
import {
  analyzeLinkedinContacts,
  analyzeLinkedinMessageThread,
  analyzeLinkedinRecruiterMessageThread,
  analyzeLinkedinSalesNavMessageThread,
  checkAnalysisResults,
  getContactRequestPhase,
  getLinkedinContact,
  getLinkedinRecruiterContact,
  getLinkedinRecruiterUserFromUserName,
  getLinkedinSalesNavContact,
  getLinkedinSalesNavUserFromUserName,
  getLinkedinUserFromUserName,
} from './API/linkedin.js';
import { getTemplates } from './API/templates.js';
import { createBoosterProject, getAllBoosterProjects, getTextVariantStream } from './API/textGeneration.js';
import { getRefreshToken } from './API/token.js';
import { getLicenseInfo, getUserInfo } from './API/user.js';
import getConfig from './config/default.js';
import {
  LinkedinEventActions,
  apiActions,
  augmentedWritingActions,
  generalActions,
  linkedinActions,
  templateActions,
  textGenerationActions,
  userActions,
} from './enums/actions.js';
import { getCurrentTab } from './misc/browser.js';
import { onExtensionActivated, onExtensionInstalled, onExtensionUpdated } from './misc/listeners.js';

onExtensionInstalled();

onExtensionActivated();

onExtensionUpdated();

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  if (request.action === 'sign-in') {
    const user = request.body.user;
    const token = request.body.token;

    chrome.storage.local.set({ token });
    chrome.storage.local.set({ user });

    chrome.tabs.query({}, (tabs) =>
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, { action: generalActions.MINIMIZE_EXTENSION }).catch((e) => {
          return false;
        });
      })
    );
  }

  if (request.action === 'sign-out') {
    chrome?.storage.local.remove(['user', 'token']);
  }

  if (request.action === 'get-linkedin-cookies') {
    chrome.cookies.getAll({ domain: '.www.linkedin.com' }, (cookies) => {
      const liAt = cookies.find((cookie) => cookie.name === 'li_at');
      const jSessionId = cookies.find((cookie) => cookie.name === 'JSESSIONID');
      const liA = cookies.find((cookie) => cookie.name === 'li_a');

      sendResponse({ action: 'linkedin-cookies', body: { liAt, jSessionId, liA } });
    });
  }

  if (request.ping === 'check-installation') {
    sendResponse({ ping: 'success' });
  }
});

let controller = new AbortController();
let signal = controller.signal;

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  const config = await getConfig();
  const supportedLanguages = config.SUPPORTED_LANGUAGES;

  // user actions

  if (request.action === userActions.GET_USER_INFO_REQUEST) {
    await getUserInfo(sender.tab.id, userActions.GET_USER_INFO_RESPONSE);
  }

  if (request.action === userActions.GET_LINKEDIN_LICENSE_INFO_REQUEST) {
    await getLicenseInfo(sender.tab.id, userActions.GET_LINKEDIN_LICENSE_INFO_RESPONSE);
  }

  // api actions

  if (request.action === apiActions.GET_REFRESH_TOKEN) {
    getRefreshToken(sender.tab.id);
  }

  // general actions

  if (request.action === generalActions.RESIZE_WINDOW) {
    chrome.tabs.sendMessage(sender.tab.id, { action: generalActions.RESIZE_WINDOW, body: request.body });
  }

  if (request.action === generalActions.SCROLL) {
    chrome.tabs.sendMessage(sender.tab.id, { action: generalActions.SCROLL, body: request.body });
  }

  if (request.action === generalActions.GET_CURRENT_URL) {
    const currentTab = await getCurrentTab();
    chrome.tabs.sendMessage(sender.tab.id, { action: generalActions.GET_CURRENT_URL, body: currentTab });
  }

  // linkedin actions

  if (request.action === linkedinActions.ANALYZE_LINKEDIN_USER) {
    chrome.cookies.getAll({ domain: 'linkedin.com' }, async function (cookies) {
      const profileId = request.body.profileId;
      const liAt = cookies.find((cookie) => cookie.name === 'li_at');
      const jSessionId = cookies.find((cookie) => cookie.name === 'JSESSIONID');

      const lang = request.body.lang && supportedLanguages.includes(request.body.lang) ? request.body.lang : 'de';

      await getLinkedinContact(sender.tab.id, profileId, liAt, jSessionId, lang, linkedinActions.ANALYZE_LINKEDIN_USER);
    });
  }

  if (request.action === linkedinActions.ANALYZE_LINKEDIN_SALESNAV_USER) {
    chrome.cookies.getAll({ domain: 'linkedin.com' }, async function (cookies) {
      const profileId = request.body.profileId;
      const liAt = cookies.find((cookie) => cookie.name === 'li_at');
      const jSessionId = cookies.find((cookie) => cookie.name === 'JSESSIONID');
      const seatCookie = cookies.find((cookie) => cookie.name === 'li_a');
      const lang = request.body.lang && supportedLanguages.includes(request.body.lang) ? request.body.lang : 'de';

      await getLinkedinSalesNavContact(sender.tab.id, profileId, liAt, jSessionId, seatCookie, lang, linkedinActions.ANALYZE_LINKEDIN_SALESNAV_USER);
    });
  }

  if (request.action === linkedinActions.ANALYZE_LINKEDIN_REC_USER) {
    chrome.cookies.getAll({ domain: 'linkedin.com' }, async function (cookies) {
      const profileId = request.body.profileId;
      const liAt = cookies.find((cookie) => cookie.name === 'li_at');
      const jSessionId = cookies.find((cookie) => cookie.name === 'JSESSIONID');
      const seatCookie = cookies.find((cookie) => cookie.name === 'li_a');
      const lang = request.body.lang && supportedLanguages.includes(request.body.lang) ? request.body.lang : 'de';

      await getLinkedinRecruiterContact(sender.tab.id, profileId, liAt, jSessionId, seatCookie, lang, linkedinActions.ANALYZE_LINKEDIN_REC_USER);
    });
  }

  if (request.action === linkedinActions.GET_LINKEDIN_USER) {
    chrome.cookies.getAll({ domain: 'linkedin.com' }, async function (cookies) {
      const profileId = request.body.profileId;
      const liAt = cookies.find((cookie) => cookie.name === 'li_at');
      const jSessionId = cookies.find((cookie) => cookie.name === 'JSESSIONID');
      const source = request?.source;
      const lang = request.body.lang && supportedLanguages.includes(request.body.lang) ? request.body.lang : 'de';

      await getLinkedinUserFromUserName(sender.tab.id, profileId, liAt, jSessionId, source, lang, linkedinActions.GET_LINKEDIN_USER);
    });
  }

  if (request.action === linkedinActions.GET_LINKEDIN_SALESNAV_USER) {
    chrome.cookies.getAll({ domain: 'linkedin.com' }, async function (cookies) {
      const profileId = request.body.profileId;
      const liAt = cookies.find((cookie) => cookie.name === 'li_at');
      const jSessionId = cookies.find((cookie) => cookie.name === 'JSESSIONID');
      const seatCookie = cookies.find((cookie) => cookie.name === 'li_a');
      const source = request?.source;
      const lang = request.body.lang && supportedLanguages.includes(request.body.lang) ? request.body.lang : 'de';

      await getLinkedinSalesNavUserFromUserName(
        sender.tab.id,
        profileId,
        liAt,
        jSessionId,
        seatCookie,
        source,
        lang,
        linkedinActions.GET_LINKEDIN_SALESNAV_USER
      );
    });
  }

  if (request.action === linkedinActions.GET_LINKEDIN_REC_USER) {
    chrome.cookies.getAll({ domain: 'linkedin.com' }, async function (cookies) {
      const profileId = request.body.profileId;
      const liAt = cookies.find((cookie) => cookie.name === 'li_at');
      const jSessionId = cookies.find((cookie) => cookie.name === 'JSESSIONID');
      const seatCookie = cookies.find((cookie) => cookie.name === 'li_a');
      const source = request?.source;
      const lang = request.body.lang && supportedLanguages.includes(request.body.lang) ? request.body.lang : 'de';

      await getLinkedinRecruiterUserFromUserName(
        sender.tab.id,
        profileId,
        liAt,
        jSessionId,
        seatCookie,
        source,
        lang,
        linkedinActions.GET_LINKEDIN_REC_USER
      );
    });
  }

  if (request.action === linkedinActions.ANALYZE_LINKEDIN_MESSAGE) {
    chrome.cookies.getAll({ domain: 'linkedin.com' }, async function (cookies) {
      const threadId = request.body.threadId;
      const liAt = cookies.find((cookie) => cookie.name === 'li_at');
      const jSessionId = cookies.find((cookie) => cookie.name === 'JSESSIONID');
      const lang = request.body.lang && supportedLanguages.includes(request.body.lang) ? request.body.lang : 'de';

      await analyzeLinkedinMessageThread(sender.tab.id, threadId, liAt, jSessionId, lang, linkedinActions.ANALYZE_LINKEDIN_MESSAGE);
    });
  }

  if (request.action === linkedinActions.ANALYZE_LINKEDIN_SALESNAV_MESSAGE) {
    chrome.cookies.getAll({ domain: 'linkedin.com' }, async function (cookies) {
      const threadId = request.body.threadId;
      const liAt = cookies.find((cookie) => cookie.name === 'li_at');
      const jSessionId = cookies.find((cookie) => cookie.name === 'JSESSIONID');
      const seatCookie = cookies.find((cookie) => cookie.name === 'li_a');
      const lang = request.body.lang && supportedLanguages.includes(request.body.lang) ? request.body.lang : 'de';

      await analyzeLinkedinSalesNavMessageThread(
        sender.tab.id,
        threadId,
        liAt,
        jSessionId,
        seatCookie,
        lang,
        linkedinActions.ANALYZE_LINKEDIN_SALESNAV_MESSAGE
      );
    });
  }

  if (request.action === linkedinActions.ANALYZE_LINKEDIN_REC_MESSAGE) {
    chrome.cookies.getAll({ domain: 'linkedin.com' }, async function (cookies) {
      const profileId = request.body.profileId;
      const liAt = cookies.find((cookie) => cookie.name === 'li_at');
      const jSessionId = cookies.find((cookie) => cookie.name === 'JSESSIONID');
      const seatCookie = cookies.find((cookie) => cookie.name === 'li_a');
      const lang = request.body.lang && supportedLanguages.includes(request.body.lang) ? request.body.lang : 'de';

      await analyzeLinkedinRecruiterMessageThread(
        sender.tab.id,
        profileId,
        liAt,
        jSessionId,
        seatCookie,
        lang,
        linkedinActions.ANALYZE_LINKEDIN_REC_MESSAGE
      );
    });
  }

  if (request.action === linkedinActions.ANALYZE_LINKEDIN_CONTACTS) {
    chrome.cookies.getAll({ domain: 'linkedin.com' }, async function (cookies) {
      const liAt = cookies.find((cookie) => cookie.name === 'li_at');
      const jSessionId = cookies.find((cookie) => cookie.name === 'JSESSIONID');
      const lang = 'de';

      await analyzeLinkedinContacts(sender.tab.id, liAt, jSessionId, lang, linkedinActions.ANALYZE_LINKEDIN_CONTACTS);
    });
  }

  if (request.action === linkedinActions.GET_CONTACT_ANALYSIS_RESULTS) {
    await checkAnalysisResults(sender.tab.id, request.phaseId, linkedinActions.GET_CONTACT_ANALYSIS_RESULTS);
  }

  if (request.action === linkedinActions.GET_CONTACT_REQUEST_PHASE) {
    await getContactRequestPhase(sender.tab.id, linkedinActions.GET_CONTACT_REQUEST_PHASE);
  }

  // augmented writing actions

  if (request.action === augmentedWritingActions.POST_AUGMENTED_WRITING_SUGGESTIONS_REQUEST) {
    await augmentedWritingAnalysis(sender.tab.id, request.body, augmentedWritingActions.POST_AUGMENTED_WRITING_SUGGESTIONS_RESPONSE, signal);
  }

  if (request.action === apiActions.ABORT_REQUEST) {
    controller.abort('New analysis has been initiated');

    controller = new AbortController();
    signal = controller.signal;
  }

  if (request.action === augmentedWritingActions.CATEGORY_CLICK) {
    chrome.tabs.sendMessage(sender.tab.id, { action: augmentedWritingActions.CATEGORY_CLICK, body: request.body });
  }

  if (request.action === augmentedWritingActions.RESET_FIELD_HIGHLIGHTS) {
    chrome.tabs.sendMessage(sender.tab.id, { action: augmentedWritingActions.RESET_FIELD_HIGHLIGHTS });
  }

  if (request.action === augmentedWritingActions.RESET_PANEL_HIGHLIGHTS) {
    chrome.tabs.sendMessage(sender.tab.id, { action: augmentedWritingActions.RESET_PANEL_HIGHLIGHTS });
  }

  if (request.action === augmentedWritingActions.RELOAD_HIGHLIGHTS) {
    chrome.tabs.sendMessage(sender.tab.id, { action: augmentedWritingActions.RELOAD_HIGHLIGHTS });
  }

  if (request.action === augmentedWritingActions.ANALYZE_TEXT) {
    chrome.tabs.sendMessage(sender.tab.id, { action: augmentedWritingActions.ANALYZE_TEXT });
  }

  if (request.action === augmentedWritingActions.INSERT_BY_CLICKABLE_MODE) {
    chrome.tabs.sendMessage(sender.tab.id, { action: augmentedWritingActions.INSERT_BY_CLICKABLE_MODE, body: request.body });
  }

  if (request.action === augmentedWritingActions.HIGHLIGHT_FIRST_SUGGESTION) {
    chrome.tabs.sendMessage(sender.tab.id, { action: augmentedWritingActions.HIGHLIGHT_FIRST_SUGGESTION, body: request.body });
  }

  if (request.action === augmentedWritingActions.REMOVE_HIGHLIGHT_FROM_CLICKABLE_MODE) {
    chrome.tabs.sendMessage(sender.tab.id, { action: augmentedWritingActions.REMOVE_HIGHLIGHT_FROM_CLICKABLE_MODE, body: request.body });
  }

  if (request.action === augmentedWritingActions.CREATE_USER_BEHAVIOR) {
    const session = request.body.session;
    const sessionStatus = request.body.sessionStatus;
    const scores = request.body.scores;
    const scoresValue = {
      jointPosAchieve: scores.jointPosAchieve,
      jointPosAffil: scores.jointPosAffil,
      jointPosPower: scores.jointPosPower,
      authenticity: scores.authenticity,
      regFocus: scores.regFocus,
      diversity: scores.diversity,
      overall: scores.overall,
    };
    const wordCount = request.body.wordCount;

    await createUserBehavior(sender.tab.id, session, sessionStatus, scoresValue, augmentedWritingActions.CREATE_USER_BEHAVIOR, wordCount);
  }

  if (request.action === LinkedinEventActions.CREATE_LI_EVENT_REQUEST) {
    const assessmentName = request.body.assessmentName;
    const contact = request.body.contact;
    const scores = request.body.scores;
    const eventType = request.body.eventType;
    const scoresValue = scores
      ? {
          jointPosAchieve: scores.percentiles.text.jointPosAchieve,
          jointPosAffil: scores.percentiles.text.jointPosAffil,
          jointPosPower: scores.percentiles.text.jointPosPower,
          authenticity: scores.percentiles.text.authenticity,
          regFocus: scores.percentiles.text.regFocus,
          diversity: scores.diversity,
          overall: scores.overall,
        }
      : undefined;
    const usedAt = request.body.usedAt;

    await createLinkedinEvent(sender.tab.id, assessmentName, contact, scoresValue, LinkedinEventActions.CREATE_LI_EVENT_RESPONSE, usedAt, eventType);
  }

  if (request.action === augmentedWritingActions.GET_BEHAVIOR_LAST_SESSION) {
    await getBehaviorLastSession(sender.tab.id, augmentedWritingActions.GET_BEHAVIOR_LAST_SESSION_RESPONSE);
  }

  if (request.action === augmentedWritingActions.SAVE_IGNORED_SUGGESTIONS) {
    const fingerprints = request.body.fingerprints;
    await saveIgnoredSuggestions(sender.tab.id, fingerprints, augmentedWritingActions.SAVE_IGNORED_SUGGESTIONS);
  }

  if (request.action === augmentedWritingActions.QUICK_OPTIMIZATION) {
    await quickOptimization(sender.tab.id, request.body, request.count, augmentedWritingActions.QUICK_OPTIMIZATION);
  }

  if (request.action === augmentedWritingActions.FORMAT_TEXT) {
    await formatText(sender.tab.id, request.body, augmentedWritingActions.FORMAT_TEXT);
  }

  // template actions

  if (request.action === templateActions.GET_EMAIL_TEMPLATES_REQUEST) {
    const assessmentName = request.body.assessmentName;

    await getTemplates(sender.tab.id, assessmentName, templateActions.GET_EMAIL_TEMPLATES_RESPONSE);
  }

  // text generation actions

  if (request.action === textGenerationActions.GET_BOOSTER_PROJECTS_REQUEST) {
    const { searchParam } = request.body;
    await getAllBoosterProjects(sender.tab.id, searchParam, textGenerationActions.GET_BOOSTER_PROJECTS_RESPONSE);
  }

  if (request.action === textGenerationActions.GET_BOOSTER_PROJECT_ID_REQUEST) {
    const { projectId } = request.body;
    await getAllBoosterProjects(sender.tab.id, projectId, textGenerationActions.GET_BOOSTER_PROJECT_ID_RESPONSE);
  }

  if (request.action === textGenerationActions.CREATE_TEXT_GENERATION_STREAM_REQUEST) {
    const { profile, offer, genre, occupation, problems, textVariants, globalContact, dataLang, isFormal, includeEmoji } = request.body;
    await getTextVariantStream(
      sender.tab.id,
      profile,
      offer,
      genre,
      occupation,
      problems,
      textVariants,
      globalContact,
      dataLang,
      isFormal,
      includeEmoji
    );
  }

  if (request.action === textGenerationActions.CREATE_BOOSTER_PROJECT_REQUEST) {
    const body = request.body;
    await createBoosterProject(sender.tab.id, body, textGenerationActions.CREATE_BOOSTER_PROJECT_RESPONSE);
  }
});
