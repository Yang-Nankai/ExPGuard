"use strict";
// import path from 'path';
// import Set from './utils/set';
// // List of supported event function names
// const EVENT_FUNCTION_NAMES = [
//     "abort", "afterprint", "animationend", "animationiteration", "animationstart",
//     "beforeprint", "beforeunload", "blur", "canplay", "canplaythrough", "change",
//     "click", "contextmenu", "copy", "cut", "dblclick", "drag", "dragend", "dragenter",
//     "dragleave", "dragover", "dragstart", "drop", "durationchange", "ended", "error",
//     "focus", "focusin", "focusout", "fullscreenchange", "fullscreenerror", "hashchange",
//     "input", "invalid", "keydown", "keypress", "keyup", "load", "loadeddata", "loadedmetadata",
//     "loadstart", "message", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover",
//     "mouseout", "mouseup", "mousewheel", "offline", "online", "open", "pagehide", "pageshow",
//     "paste", "pause", "play", "playing", "popstate", "progress", "ratechange", "resize", "reset",
//     "scroll", "search", "seeked", "seeking", "select", "show", "stalled", "storage", "submit",
//     "suspend", "timeupdate", "toggle", "touchcancel", "touchend", "touchmove", "touchstart",
//     "transitionend", "unload", "volumechange", "waiting", "wheel"
// ];
// // Categorized DOM events by their interface types
// const DOMEvents = {
//     UIEvent: "abort DOMActivate error load resize scroll select unload",
//     ProgressEvent: "abort error load loadend loadstart progress timeout",
//     Event: "abort afterprint beforeprint cached canplay canplaythrough change chargingchange chargingtimechange checking close dischargingtimechange DOMContentLoaded downloading durationchange emptied ended error fullscreenchange fullscreenerror input invalid languagechange levelchange loadeddata loadedmetadata noupdate obsolete offline online open orientationchange pause pointerlockchange pointerlockerror play playing ratechange readystatechange reset seeked seeking stalled submit success suspend timeupdate updateready visibilitychange volumechange waiting",
//     AnimationEvent: "animationend animationiteration animationstart",
//     BeforeUnloadEvent: "beforeunload",
//     TimeEvent: "beginEvent endEvent repeatEvent",
//     OtherEvent: "blocked complete upgradeneeded versionchange",
//     FocusEvent: "blur focus focusin focusout",
//     MouseEvent: "click contextmenu dblclick mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup show",
//     OfflineAudioCompletionEvent: "complete",
//     CompositionEvent: "compositionend compositionstart compositionupdate",
//     ClipboardEvent: "copy cut paste",
//     DeviceLightEvent: "devicelight",
//     DeviceMotionEvent: "devicemotion",
//     DeviceOrientationEvent: "deviceorientation",
//     MutationEvent: "DOMAttrModified DOMCharacterDataModified DOMNodeInserted DOMNodeInsertedIntoDocument DOMNodeRemoved DOMNodeRemovedFromDocument DOMSubtreeModified",
//     DragEvent: "drag dragend dragenter dragleave dragover dragstart drop",
//     GamepadEvent: "gamepadconnected gamepaddisconnected",
//     HashChangeEvent: "hashchange",
//     KeyboardEvent: "keydown keypress keyup",
//     PageTransitionEvent: "pagehide pageshow",
//     PopStateEvent: "popstate",
//     StorageEvent: "storage",
//     TouchEvent: "touchcancel touchend touchmove touchstart",
//     TransitionEvent: "transitionend",
//     WheelEvent: "wheel"
// };
// // Pre-computed Set of all DOM events for O(1) lookups
// const DOMEventSet = new Set<string>(
//     Object.values(DOMEvents).flatMap(events => 
//         events.split(' ').filter(Boolean)
//     )
// );
// /**
//  * Central configuration class containing application constants
//  */
// export class Constants {
//     // Project directory paths
//     static readonly PROJECT_PATH = path.resolve(__dirname, '../');
//     static readonly SRC_PATH = path.resolve(this.PROJECT_PATH, 'src');
//     static readonly LOG_PATH = path.resolve(this.PROJECT_PATH, 'logs');
//     static readonly LOG_FILE = path.resolve(this.LOG_PATH, 'app.log');
//     static readonly DATA_PATH = path.resolve(this.PROJECT_PATH, 'data');
//     static readonly EXTENSION_FOLDER = path.resolve(this.DATA_PATH, 'extensions');
//     // Timeout configuration (10 minutes in milliseconds)
//     static timeoutPDGGeneration = 1000 * 60 * 10;
//     // Debug mode flags
//     static DEBUG = false;
//     static devDEBUG = false;
//     // Static analysis configuration
//     static staticModelPrintPhases = true;
//     static tolerantMode = false;
//     // Supported language identifiers
//     static readonly JS_LANG = 'js';
//     // Event system constants
//     static readonly EVENT_FUNCTION_NAMES = EVENT_FUNCTION_NAMES;
//     static readonly DOMEvents = DOMEvents;
//     /**
//      * Checks if an event exists in the DOM events catalog
//      * @param eventName - The event name to check
//      * @returns boolean indicating existence
//      */
//     static eventExists = (eventName: string) => DOMEventSet.has(eventName);
//     // Chrome API Identifier Simplify
//     static readonly CHROME_ROOT: string = 'chrome';
//     static readonly TOP_LEVEL_API_NAMES: readonly string[] = [
//         'accessibilityFeatures', 'action', 'alarms', 'audio', 'bookmarks', 'browserAction', 'browsingData', 
//         'certificateProvider', 'commands', 'contentSettings', 'contextMenus', 'cookies', 'debugger', 
//         'declarativeContent', 'declarativeNetRequest', 'declarativeWebRequest', 'desktopCapture', 
//         'dns', 'documentScan', 'dom', 'downloads',  'events', 'extension', 'extensionTypes', 'fileBrowserHandler', 
//         'fileSystemProvider', 'fontSettings', 'gcm', 'history', 'i18n', 'identity', 'idle', 'instanceID', 
//         'loginState', 'management', 'notifications', 'offscreen', 'omnibox', 'pageAction', 
//         'pageCapture', 'permissions', 'platformKeys', 'power', 'printerProvider', 'printing', 
//         'printingMetrics', 'privacy', 'processes', 'proxy', 'readingList', 'runtime', 'scripting', 
//         'search', 'sessions', 'sidePanel', 'storage', 'systemLog', 'tabCapture', 'tabGroups', 'tabs', 'topSites', 
//         'tts', 'ttsEngine', 'types', 'userScripts', 'vpnProvider', 'wallpaper', 'webAuthenticationProxy', 
//         'webNavigation', 'webRequest', 'windows'
//     ] as const;
//     static readonly SECOND_LEVEL_NAMESPACES: readonly string[] = [
//         'devtools', 'enterprise', 'input', 'system'
//     ] as const;
//     static readonly SECOND_LEVEL_API_MAP: Readonly<Record<string, readonly string[]>> = {
//         devtools: ['inspectedWindow', 'network', 'panels', 'performance', 'recorder'],
//         enterprise: ['hardwarePlatform', 'networkingAttributes', 'platformKeys', 'deviceAttributes'],
//         input: ['ime'],
//         system: ['cpu', 'display', 'memory', 'storage']
//     } as const;
//     static readonly CHROME_API_METHODS: readonly string[] = [
//         'chrome.runtime.sendMessage'
//     ];
//     static readonly CHROME_API_EVENTS: readonly string[] = [
//         'chrome.runtime.onMessage.addListener'
//     ];
//     static readonly CHROME_API_METHOD_TO_EVENT: Readonly<Map<string, string>> = new Map([
//         ['chrome.runtime.sendMessage', 'chrome.runtime.onMessage.addListener']
//     ]);  
// }
