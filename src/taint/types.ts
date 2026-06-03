import { Node } from "acorn";
import Def from "../def-use/types/def";
import { FlowNode } from "../flownode/flownode";

/** ----------------------------------------
 * Types
 * ---------------------------------------- */
export type SourceType =
  // TABS
  | "CHROME_TABS_DETECT_LANUAGE"
  | "CHROME_TABS_CAPUTURE_VISIBLE_TAB"
  // BOOKMARKS
  | "CHROME_BOOKMARK_INFO"
  // COOKIES
  | "CHROME_COOKIES_INFO"
  | "CHROME_COOKIES_STORE"
  // HISTORY
  | "CHROME_HISTORY_INFO"
  // READINGLIST
  | "CHROME_READINGLIST_INFO"
  // MANAGEMENT
  | "CHROME_MANAGEMENT_INFO"
  // DOWNLOADS
  | "CHROME_DOWNLOADS_SEARCH"
  | "CHROME_DOWNLOADS_FILEICON"
  // FONTSETTINGS
  | "CHROME_FONTSETTINGS_FONTLIST"
  // SYSTEM
  | "CHROME_SYSTEM_CPU"
  | "CHROME_SYSTEM_DISPLAY_LAYOUT"
  | "CHROME_SYSTEM_DISPLAY"
  | "CHROME_SYSTEM_MEMORY"
  | "CHROME_SYSTEM_STORAGE"
  // TOPSITES
  | "CHROME_TOPSITES_INFO"
  // PAGECAPTURE
  | "CHROME_PAGECAPTURE_MHTML"
  // IDENTITY
  | "CHROME_IDENTITY_TOKEN"
  | "CHROME_IDENTITY_PROFILE"
  // MANAGED STORAGE (enterprise-policy data — sensitive, high-integrity)
  | "CHROME_MANAGED_STORAGE"
  // NAVIGATOR
  | "NAVIGAROR_GEOLOCATION"
  | "NAVIGATOR_CLIPBOARD"
  | "NAVIGATOR_CONNECTION"
  | "NAVIGATOR_DEVICE_MEMORY"
  | "NAVIGATOR_HARDWARE_CONCURRENCY"
  | "NAVIGATOR_LANGUAGE"
  | "NAVIGATOR_MAX_TOUCH_POINTS"
  | "NAVIGATOR_PLATFORM"
  | "NAVIGATOR_PLUGINS"
  | "NAVIGATOR_USER_AGENT"
  | "NAVIGATOR_GPU_ADAPTER"
  // DOCUMENT
  | "DOCUMENT_LOCATION"
  | "DOCUMENT_COOKIE"
  | "DOCUMENT_URL"
  | "DOCUMENT_TITLE"
  // SCREEN
  | "SCREEN_INFO"
  // DOCUMENT.GETELEMENTBYID
  | "ELEMENT_TEXT_CONTENT"
  | "ELEMENT_INNER_HTML"
  | "ELEMENT_OUTER_HTML"
  | "ELEMENT_VALUE"
  // JQUERY
  | "JQUERY_ELEMENT_VAL"
  | "JQUERY_ELEMENT_TEXT"
  | "JQUERY_ELEMENT_HTML"
  // CHROME EVENTS
  | "CHROME_BOOKMARKS_ONCREATED"
  | "CHROME_COOKIES_ONCHANGED"
  | "CHROME_DOWNLOADS_ONCHANGED"
  | "CHROME_DOWNLOADS_ONCREATED"
  | "CHROME_HISTORY_ONVISITED"
  | "CHROME_MANAGEMENT_ONENABLED"
  | "CHROME_MANAGEMENT_ONDISABLED"
  | "CHROME_MANAGEMENT_ONINSTALLED"
  // WINDOW ADDEVENETLISTENER MESSAGE
  | "CHROME_SENDMESSAGE_EXTERNAL_RESPONSE"
  | "CHROME_CONNECT_ONMESSAGE_EXTERANL"
  | "CHROME_ONMESSAGEEXTERNAL_MESSAGE"
  | "CHROME_ONCONNECTEXTERNAL_ONMESSAGE"
  | "CHROME_SENDNATIVEMESSAGE_EXTERNAL_RESPONSE"
  | "CHROME_CONNECTNATIVE_ONMESSAGE"
  // EVENT
  | "WINDOW_MESSAGE_EVENT"
  | "WINDOW_CUSTOM_EVENT"
  | "TARGET_CUSTOM_EVENT"
  // RESPONSE
  | "JQUERY_AJAX_RESPONSE"
  | "FETCH_RESPONSE"
  | "XML_HTTP_RESPONSE"
  | "AXIOS_RESPONSE"
  | "AXIOS_GET_RESPONSE"
  | "AXIOS_POST_RESPONSE"
  | "AXIOS_REQUEST_RESPONSE"
  // STORAGE
  | "STORAGE_ALL_ITEMS"
  // PSEUDO
  | "PSEUDO_MESSAGE"
  | "PSEUDO_STORAGE"
  ;
  
  
export type PropagateType =
  | "ASSIGN"
  | "ARGUMENT"
  | "RETURN"
  | "ELEMENT"
  | "GLOBAL"
  | "INITIAL"
  | "MUTATE"
  | "COPY"
  | "STORAGE"
  | "ITERATE"
  | "MERGE"
  | "MESSAGE"
  | "EVENT"
  | "OTHER"
  ;

export type SinkType =
  | "NEW_FUNCTION"
  | "EVAL"
  | "TIME_EVAL"
  // Implicit / privileged code-execution surfaces beyond eval().
  | "WASM_INSTANTIATE"          // WebAssembly.instantiate(tainted buffer) — runs code
  | "WORKER_URL"               // new Worker(taintedUrl) / Blob-URL worker bootstrap
  | "CHROME_DEBUGGER_COMMAND"   // chrome.debugger.sendCommand(..,"Runtime.evaluate",{expression})
  | "FETCH_RESOURCE"
  | "FETCH_OPTIONS"
  // Granular fetch init sinks. The init object is split so that data placed in
  // a request *body* (exfiltration) can be distinguished from data placed in a
  // request *header* (benign auth — e.g. a cookie sent as the Cookie header).
  | "FETCH_BODY"
  | "FETCH_HEADERS"
  | "JQUERY_AJAX_URL"
  | "JQUERY_AJAX_DATA"
  | "JQUERY_AJAX_SETTINGS_URL"
  | "JQUERY_AJAX_SETTINGS_DATA"
  | "JQUERY_GET_URL"
  | "JQUERY_GET_DATA"
  | "JQUERY_POST_URL"
  | "JQUERY_POST_DATA"
  | "JQUERY_SETTINGS_URL"
  | "JQUERY_SETTINGS_DATA"
  | "JQUERY_GLOBAL_EVAL"
  | "XML_HTTP_REQUEST_OPEN"
  | "XML_HTTP_REQUEST_SEND"
  | "XML_HTTP_REQUEST_SETHEADER"
  | "AXIOS_URL"
  | "AXIOS_DATA"
  | "AXIOS_HEADERS"
  | "WEBSOCKET_URL"
  | "WEBSOCKET_DATA"
  | "WEB_LOCAL_STORAGE_SET_KEY"
  | "WEB_LOCAL_STORAGE_SET_VALUE"
  | "WEB_LOCAL_STORAGE_REMOVE"
  | "WEB_SESSION_STORAGE_SET_KEY"
  | "WEB_SESSION_STORAGE_SET_VALUE"
  | "WEB_SESSION_STORAGE_REMOVE"
  | "JQUERY_ELEMENT_VAL_SET"
  | "JQUERY_ELEMENT_TEXT_SET"
  | "JQUERY_ELEMENT_HTML_SET"
  // Generic DOM innerHTML/outerHTML write. Reserved for the member-assignment
  // sink (`el.innerHTML = x`) follow-up; modeled frameworks reuse it where a
  // raw DOM property write is the most faithful representation.
  | "DOM_INNER_HTML"
  // Front-end framework HTML-injection sinks. These are the call-based forms
  // that survive bundling/compilation, so they fire even when the framework
  // itself is a minified vendor file.
  | "REACT_DANGEROUS_HTML"     // React dangerouslySetInnerHTML.__html (incl. JSX)
  | "VUE_V_HTML"               // Vue v-html / template / render innerHTML
  | "VUE_COMPILE"              // Vue.compile(tainted) — runtime template codegen
  | "ANGULAR_BYPASS_SECURITY"  // DomSanitizer.bypassSecurityTrust* / $sce.trustAs*
  // TODO: Need to finish this in future
  // | "DOCUMENT_VAL_SET"
  // | "DOCUMENT_TEXT_SET"
  | "DOCUMENT_WRITE"
  | "DOCUMENT_EXECCOMMAND"
  // Chrome Action
  | "CHROME_ACTION_DISABLE_TABID"
  | "CHROME_ACTION_ENABLE_TABID"
  | "CHROME_ACTION_BADGE_OPTIONS"
  | "CHROME_ACTION_ICON_OPTIONS"
  | "CHROME_ACTION_POPUP_OPTIONS"
  | "CHROME_ACTION_TITLE_OPTIONS"
  // Chrome Alarms
  | "CHROME_ALARMS_CREATE_OPTIONS"
  | "CHROME_ALARMS_CLEAR_NAME"
  // Chrome Bookmarks
  | "CHROME_BOOKMARK_CREATE_INFO"
  | "CHROME_BOOKMARK_MOVE_ID"
  | "CHROME_BOOKMARK_MOVE_DESTINATION"
  | "CHROME_BOOKMARK_REMOVE_ID"
  | "CHROME_BOOKMARK_REMOVE_TREE_ID"
  | "CHROME_BOOKMARK_UPDATE_ID"
  | "CHROME_BOOKMARK_UPDATE_INFO"
  // Chrome Browsing
  | "CHROME_BROWSINGDATA_REMOVE"
  // Chrome Cookies
  | "CHROME_COOKIES_SET_OPTIONS"
  | "CHROME_COOKIES_REMOVE_OPTIONS"
  // Chrome ContentSettings
  | "CHROME_CONTENTSETTINGS_SET"
  | "CHROME_CONTENTSETTINGS_CLEAR"
  // Chrome DeclarativeContent
  | "CHROME_DECLARATIVECONTENT_RULES"
  | "CHROME_DECLARATIVECONTENT_RULE_IDS"
  // Chrome Downloads
  | "CHROME_DOWNLOADS_REMOVE_ID"
  | "CHROME_DOWNLOADS_OPTIONS"
  // Chrome FontSettings
  | "CHROME_FONTSETTINGS_SET_OPTIONS"
  | "CHROME_FONTSETTINGS_SIZE_OPTIONS"
  // Chrome GCM
  | "CHROME_GCM_SEND"
  // Chrome History
  | "CHROME_HISTORY_ADD_URL"
  | "CHROME_HISTORY_DELETE_RANGE"
  | "CHROME_HISTORY_DELETE_URL"
  // Chrome Management
  | "CHROME_MANAGEMENT_SETENABLED_ID"
  | "CHROME_MANAGEMENT_SETENABLED_FLAG"
  | "CHROME_MANAGEMENT_UNINSTALL_ID"
  | "CHROME_MANAGEMENT_LAUNCHAPP_ID"
  // Chrome Notifications
  | "CHROME_NOTIFICATIONS_CREATE_OPTIONS"
  | "CHROME_NOTIFICATIONS_UPDATE_ID"
  | "CHROME_NOTIFICATIONS_UPDATE_OPTIONS"
  | "CHROME_NOTIFICATIONS_CLEAR_ID"
  // Chrome Proxy
  | "CHROME_PROXY_SETTINGS_SET"
  // Chrome ReadingList
  | "CHROME_READINGLIST_ADD_OPTIONS"
  | "CHROME_READINGLIST_REMOVE_URL"
  | "CHROME_READINGLIST_UPDATE_OPTIONS"
  // Chrome Runtime
  | "CHROME_RUNTIME_SENDMESSAGE_EXTERNAL"
  | "CHROME_RUNTIME_CONNECT_POSTMESSAGE_EXTERNAL"
  | "CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE"
  | "CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE"
  | "CHROME_RUNTIME_SENDNATIVEMESSAGE_EXTERNAL"
  | "CHROME_RUNTIME_ONCONNECTNATIVE_POSTMESSAGE"
  // Chrome Storage
  | "CHROME_LOCAL_STORAGE"
  | "CHROME_SYNC_STORAGE"
  | "CHROME_SESSION_STORAGE"
  // Chrome Tabs
  | "CHROME_TABS_CREATE_OPTIONS"
  | "CHROME_TABS_EXECUTE"
  // Chrome DeclarativeNetRequest — dynamic request rewriting (privileged).
  | "CHROME_DECLARATIVENETREQUEST_RULES"
  // Chrome Window
  | "CHROME_WINDOWS_UPDATE_OPTIONS"
  | "CHROME_WINDOWS_CREATE_OPTIONS"
  // Window Message
  | "WINDOW_POSTMESSAGE"
  ;

export type UrlTaintControl = "FULL" | "PARTIAL";

export interface TaintSinkRecord {
  taintId: number;
  sinkType: SinkType;
  sourceDef: Def;
  astNode: Node;
  remark?: string;
  urlTaintControl?: UrlTaintControl;
}

export interface TaintSanitizerRecord {
  taintId: number;
  sanitizerName: string;
  def: Def;
  astNode: Node;
}

export interface TaintSource {
  taintId: number;
  sourceType: SourceType;
  originDefId: number;
  isPseudo: boolean; // pseudo taint source
  remark?: string;
}

export interface TaintPathRecord {
  taintId: number;
  fromDef: Def;
  toDef: Def;
  astNode: Node;
  PropagateType: PropagateType;
  remark: string;
}

export interface TaintAnalysisSummary {
  hasTaint: boolean;
  hasSink: boolean;
  totalSources: number;
  totalSinks: number;
}

export interface OuterSourceRecord {
  taintId: number;
  outer?: string;
  channel: string;
  astNode: Node;
  originDefId?: number;
  autoPushed?: boolean;
}

export interface OuterSinkRecord extends TaintSinkRecord {
  outer?: string;
  channel?: string;
}


export interface DeferredMessageInvoke {
  callNode: FlowNode;
  astNode: Node;
  invoke: (message: Def) => void;
}


export interface PseudoTaintReceiver {
  taintId: number; // local pseudo-taint id in receiver context (optional but kept for compatibility)
  contextFilename: string;
  astNode: Node;
  channel: string;
  targetDef: Def; // target def where the data arrives
  outer?: string;
  deferredMessage?: DeferredMessageInvoke;
}

export interface PseudoTaintSender {
  contextFilename: string;
  taintDef: Def; // message def in sender context
  astNode: Node;
  channel: string;
  outer?: string;
}

export interface StorageAction {
  area: string;
  key: string;
  contextFilename: string;
  astNode: Node;
}

export interface StorageSet extends StorageAction {
  valueDef: Def;
}

export interface StorageGet extends StorageAction {
  targetDef: Def;
  taintId: number; // initial PSEUDO_STORAGE taint id
}


/**
 * Filter Policy
 */
export type SourceCapability = 
  | "ATTACKER_INPUT"
  | "SENSITIVE_DATA"
  | "SYSTEM_INFO"
  | "NETWORK_RESPONSE"
  | "WEB_CONTENT"
  | "STORAGE_DATA"
  | "UNKNOWN_SOURCE"
  ;

export type SinkCapability = 
  | "CODE_EXECUTION"
  | "NETWORK_SEND"
  | "MESSAGE_RESPONSE"
  | "DOM_WRITE"
  | "STORAGE_WRITE"
  | "PRIVILEGED_OPERATION"
  | "UNKNOWN_SINK"
  ;


export type FlowType = 
  | "PRIVILEGE_ESCALATION"
  | "STORAGE_POSOING"
  | "DOM_XSS"
  | "REQUEST_FORGERY"
  | "CODE_INJECTION"
  | "DATA_LEAK"
  // | "FINGERPRINT_LEAK"
  // | "REMOTE_CODE_EXECUTION"
  // | "DOM-BASE_XSS"
  | "DOM_DATA_LEAK"
  // | "STORAGE_DATA_LEAK"
  ;