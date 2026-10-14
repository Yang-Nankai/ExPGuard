const userActions = {
  LOGOUT_RESPONSE: 'logoutResponse',
  GET_LINKEDIN_LICENSE_INFO_REQUEST: 'getLinkedinLicenseInfoRequest',
  GET_LINKEDIN_LICENSE_INFO_RESPONSE: 'getLinkedinLicenseInfoResponse',
  GET_USER_INFO_REQUEST: 'getUserInfoRequest',
  GET_USER_INFO_RESPONSE: 'getUserInfoResponse',
};

const apiActions = {
  ERROR: 'Error',
  REVALIDATE_TOKEN: 'revalidateToken',
  GET_REFRESH_TOKEN: 'getRefreshToken',
  ABORT_REQUEST: 'abortRequest',
};

const generalActions = {
  RESIZE_WINDOW: 'resizeWindow',
  SCROLL: 'scroll',
  URL_CHANGED: 'urlChanged',
  GET_CURRENT_URL: 'getCurrentUrl',
  MINIMIZE_EXTENSION: 'minimizeExtension',
};

const contactActions = {
  GET_CONTACT_BY_ID_RESPONSE: 'getContactByIdResponse',
};

const linkedinActions = {
  GET_LINKEDIN_USER: 'getLinkedinUser',
  GET_LINKEDIN_SALESNAV_USER: 'getLinkedinSalesNavUser',
  GET_LINKEDIN_REC_USER: 'getLinkedinRecruitmentUser',
  ANALYZE_LINKEDIN_USER: 'analyzeLinkedinUser',
  ANALYZE_LINKEDIN_SALESNAV_USER: 'analyzeLinkedinSalesNavUser',
  ANALYZE_LINKEDIN_REC_USER: 'analyzeLinkedinRecruitmentUser',
  ANALYZE_LINKEDIN_MESSAGE: 'analyzeLinkedinMessage',
  ANALYZE_LINKEDIN_SALESNAV_MESSAGE: 'analyzeLinkedinSalesNavMessage',
  ANALYZE_LINKEDIN_REC_MESSAGE: 'analyzeLinkedinRecruiterMessage',
  GET_LINKEDIN_CONTACT_BY_ID_RESPONSE: 'GetLinkedinContactByIDResponse',
  ANALYZE_LINKEDIN_CONTACTS: 'analyzeLinkedinContacts',
  GET_CONTACT_ANALYSIS_RESULTS: 'getContactAnalysisResults',
  GET_CONTACT_REQUEST_PHASE: 'getContactRequestPhase',
};

const augmentedWritingActions = {
  POST_AUGMENTED_WRITING_SUGGESTIONS_REQUEST: 'postAugmentedWritingSuggestionsRequest',
  POST_AUGMENTED_WRITING_SUGGESTIONS_RESPONSE: 'postAugmentedWritingSuggestionsResponse',
  CATEGORY_CLICK: 'categoryClick',
  RESET_FIELD_HIGHLIGHTS: 'resetFieldHighlights',
  RESET_PANEL_HIGHLIGHTS: 'resetPanelHighlights',
  RELOAD_HIGHLIGHTS: 'reloadHighlights',
  ANALYZE_TEXT: 'analyzeText',
  INSERT_BY_CLICKABLE_MODE: 'insertByClickableMode',
  REMOVE_HIGHLIGHT_FROM_CLICKABLE_MODE: 'removeHighlightFromClickableMode',
  HIGHLIGHT_FIRST_SUGGESTION: 'highlightFirstSuggestion',
  SET_CORE_COMMIT: 'setCoreCommit',
  CREATE_USER_BEHAVIOR: 'createUserBehavior',
  GET_BEHAVIOR_LAST_SESSION: 'getBehaviorLastSession',
  GET_BEHAVIOR_LAST_SESSION_RESPONSE: 'getBehaviorLastSessionResponse',
  SAVE_IGNORED_SUGGESTIONS: 'saveIgnoredSuggestions',
  QUICK_OPTIMIZATION: 'quickOptimization',
  FORMAT_TEXT: 'formatText',
};

const templateActions = {
  GET_EMAIL_TEMPLATES_REQUEST: 'getEmailTemplatesRequest',
  GET_EMAIL_TEMPLATES_RESPONSE: 'getEmailTemplatesResponse',
};

const LinkedinEventActions = {
  CREATE_LI_EVENT_REQUEST: 'createLinkedinEventRequest',
  CREATE_LI_EVENT_RESPONSE: 'createLinkedinEventResponse',
};

const textGenerationActions = {
  GET_BOOSTER_PROJECTS_REQUEST: 'getBoosterProjectsRequest',
  GET_BOOSTER_PROJECTS_RESPONSE: 'getBoosterProjectsResponse',
  GET_BOOSTER_PROJECT_ID_REQUEST: 'getBoosterProjectByIDRequest',
  GET_BOOSTER_PROJECT_ID_RESPONSE: 'getBoosterProjectByIDResponse',
  CREATE_TEXT_GENERATION_STREAM_REQUEST: 'createTextGenerationStreamRequest',
  CREATE_TEXT_GENERATION_STREAM_RESPONSE: 'createTextGenerationStreamResponse',
  CREATE_TEXT_GENERATION_STREAM_ERROR: 'createTextGenerationError',
  CREATE_TEXT_GENERATION_STREAM_END: 'createTextGenerationEnd',
  CREATE_BOOSTER_PROJECT_REQUEST: 'createBoosterProjectRequest',
  CREATE_BOOSTER_PROJECT_RESPONSE: 'createBoosterProjectResponse',
};

export {
  LinkedinEventActions,
  apiActions,
  augmentedWritingActions,
  contactActions,
  generalActions,
  linkedinActions,
  templateActions,
  textGenerationActions,
  userActions,
};
