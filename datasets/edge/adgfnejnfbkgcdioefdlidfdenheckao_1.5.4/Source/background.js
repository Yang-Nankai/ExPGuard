/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background.ts":
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CacheEntry_1 = __webpack_require__(/*! ./helpers/CacheEntry */ "./src/helpers/CacheEntry.ts");
const Constants_1 = __webpack_require__(/*! ./helpers/Constants */ "./src/helpers/Constants.ts");
const cache = new Map();
const formattedCache = new Map();
let refreshFrequency = 30000;
let userDataInterval = setInterval(getUserData, refreshFrequency);
const urlStatus = new Map();
function getUserData() {
    chrome.runtime.sendNativeMessage(Constants_1.default.sonarBackendApplication, {
        Command: 'GetUserData',
        Arguments: {},
    }, (response) => {
        if (!chrome.runtime.lastError && response) {
            console.log(response);
        }
        if (response && !response.Error) {
            const userData = response.Data;
            chrome.storage.local.set({
                [Constants_1.default.userDataKey]: userData,
            });
            const newRefreshFrequency = userData.RefreshFrequencyInSeconds * 1000;
            if (newRefreshFrequency !== refreshFrequency && newRefreshFrequency) {
                refreshFrequency = newRefreshFrequency;
                clearInterval(userDataInterval);
                userDataInterval = setInterval(getUserData, refreshFrequency);
            }
        }
    });
}
const errsOnTab = [];
function getCacheEntry(tabId) {
    if (tabId == null) {
        return null;
    }
    let cacheObject = cache[Constants_1.default.tabPrefix + tabId];
    if (cacheObject == null) {
        cacheObject = new CacheEntry_1.default(tabId);
        cache[Constants_1.default.tabPrefix + tabId] = cacheObject;
    }
    return cacheObject;
}
function notifyCacheUpdated(tabId, isUpdateToClean = false) {
    formattedCache[Constants_1.default.tabPrefix + tabId] = isUpdateToClean
        ? getCacheEntry(tabId).clear()
        : getCacheEntry(tabId).getFullData();
    const payload = {};
    payload[Constants_1.default.dataKey] = formattedCache;
    chrome.storage.local.set(payload);
    // send message to popup script that the cache has been refreshed for the given tab
    chrome.runtime.sendMessage({ name: Constants_1.default.refreshPrefix + tabId });
}
chrome.webRequest.onCompleted.addListener((details) => {
    const url = new URL(details.url);
    const requestTabId = details.tabId;
    if (requestTabId < 0 || url.protocol === 'chrome-extension:') {
        return;
    }
    urlStatus.set(details.url, details.statusCode);
    if (400 <= details.statusCode && details.statusCode < 600) {
        const entry = JSON.stringify({
            id: 'webpage_error',
            type: 'asset',
            url: details.url,
            data: {
                type: 'asset',
            },
        });
        const key = details.tabId.toString() + '_request';
        chrome.storage.local.get([key], (data) => {
            let toSave = [];
            if (typeof data[key] !== 'undefined') {
                toSave = [...data[key]];
            }
            toSave.push(entry);
            chrome.storage.local.set({ [key]: toSave }, () => {
                chrome.runtime.sendMessage({ name: 'webpage_error_request', id: key });
            });
        });
    }
    const cacheEntry = getCacheEntry(requestTabId);
    cacheEntry.update(details);
    notifyCacheUpdated(requestTabId);
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (!chrome.runtime.lastError && tabs.length > 0 && requestTabId === tabs[0].id) {
            // send message to content script that there are new resources available
            chrome.tabs.sendMessage(tabs[0].id, Constants_1.default.resourcesMessage);
        }
    });
}, { urls: ['<all_urls>'] }, ['responseHeaders']);
chrome.tabs.onActivated.addListener((activeInfo) => {
    notifyCacheUpdated(activeInfo.tabId);
    chrome.tabs.sendMessage(activeInfo.tabId, { id: 'tabActivated', tabId: activeInfo.tabId });
    chrome.storage.local.set({ currentTab: activeInfo.tabId });
});
chrome.tabs.onCreated.addListener((infoTab) => {
    chrome.tabs.sendMessage(infoTab.id, { id: 'onCreated', tabId: infoTab.id });
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    chrome.tabs.sendMessage(tabId, { id: 'tabUpdate', tabId, changeInfo });
});
chrome.tabs.onRemoved.addListener((tabId) => {
    delete cache[Constants_1.default.tabPrefix + tabId];
    delete formattedCache[Constants_1.default.tabPrefix + tabId];
    chrome.storage.local.set({ [tabId]: '' });
});
chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.name === Constants_1.default.rumRequestSentEvent) {
        // send rum request on the backend
        //adding "st" status code in Rum request
        if (message.data && message.data.data) {
            const msgData = JSON.parse(message.data.data);
            msgData['st'] = urlStatus.get(msgData['rf']);
            message.data.data = JSON.stringify(msgData);
        }
        chrome.runtime.sendNativeMessage(Constants_1.default.sonarBackendApplication, {
            Command: 'Rum',
            Arguments: {
                Data: message.data.data,
                Host: message.data.host,
                UserAgent: navigator.userAgent,
            },
        }, (response) => {
            if (!chrome.runtime.lastError && response) {
                console.log(response);
            }
        });
        if (message.data.runTraceroute) {
            // execute traceroute on the backend
            chrome.runtime.sendNativeMessage(Constants_1.default.sonarBackendApplication, {
                Command: 'Traceroute',
                Arguments: {
                    Host: message.data.host,
                    SiteId: message.data.siteId,
                    SessionId: message.data.sessionId,
                    UserAgent: navigator.userAgent,
                },
            }, (response) => {
                if (!chrome.runtime.lastError && response) {
                    console.log(response);
                }
            });
        }
        return;
    }
    const senderTab = sender.tab.id;
    const key = senderTab.toString();
    const cacheEntry = getCacheEntry(senderTab);
    // these messages are coming from the content script
    switch (message.name) {
        case Constants_1.default.loadTimeMessage:
            cacheEntry.loadTime = message.data;
            break;
        case Constants_1.default.errorCountMessage:
            cacheEntry.errorCount = message.data;
            break;
        case Constants_1.default.timingsMessage:
            cacheEntry.addTimings(message.data);
            break;
        case Constants_1.default.visualsLoadedTimeMessage:
            const visualsLoadedTime = cacheEntry.visualsLoadedTime;
            if (visualsLoadedTime < message.data) {
                cacheEntry.visualsLoadedTime = message.data;
            }
            break;
        case Constants_1.default.fails:
            chrome.storage.local.set({ [key]: message.data }, () => {
                chrome.runtime.sendMessage({ name: 'webpage_error', id: key });
            });
            break;
        case Constants_1.default.cleanCache:
            const keyErrosRequests = key + '_request';
            notifyCacheUpdated(key, true);
            chrome.storage.local.set({ [keyErrosRequests]: [] });
            break;
    }
    notifyCacheUpdated(senderTab);
});
getUserData();


/***/ }),

/***/ "./src/helpers/CacheEntry.ts":
/*!***********************************!*\
  !*** ./src/helpers/CacheEntry.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TabResource_1 = __webpack_require__(/*! ./TabResource */ "./src/helpers/TabResource.ts");
const Timings_1 = __webpack_require__(/*! ./Timings */ "./src/helpers/Timings.ts");
const SonarData_1 = __webpack_require__(/*! ./SonarData */ "./src/helpers/SonarData.ts");
class CacheEntry {
    constructor(tabId) {
        this.errorCount = 0;
        this.visualsLoadedTime = 0;
        this.tabId = 0;
        this.loadTime = 0;
        this.tabResources = new TabResource_1.TabResources();
        this.timings = new Timings_1.TimingsCollection();
        this.tabId = tabId;
    }
    update(details) {
        if (details.type === 'main_frame')
            this.clear();
        this.tabResources.add(details);
    }
    addTimings(resources) {
        this.timings.add(resources, this.loadTime);
    }
    getFullData() {
        return SonarData_1.default.create(this);
    }
    clear() {
        this.errorCount = 0;
        this.loadTime = 0;
        this.timings.clear();
        this.visualsLoadedTime = 0;
        this.tabResources.clear();
    }
}
exports.default = CacheEntry;


/***/ }),

/***/ "./src/helpers/Constants.ts":
/*!**********************************!*\
  !*** ./src/helpers/Constants.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Constants {
}
exports.default = Constants;
Constants.tabPrefix = 'tab_';
Constants.refreshPrefix = 'refresh_';
Constants.resourcesMessage = 'resources';
Constants.loadTimeMessage = 'loadTime';
Constants.errorCountMessage = 'errorCount';
Constants.timingsMessage = 'timings';
Constants.visualsLoadedTimeMessage = 'visualsLoadedTime';
Constants.dataKey = 'data';
Constants.userDataKey = 'userData';
Constants.rumRequestSentEvent = 'rumRequestSent';
Constants.catchpointUrl = 'http://www.catchpoint.com/';
Constants.isAdvancedModeKey = 'isAdvancedMode';
Constants.sonarBackendApplication = 'com.catchpoint.sonarbackend';
Constants.fails = 'webpage_error';
Constants.catchpointMonitoringUrl = 'https://www.catchpoint.com/endpoint-monitoring';
Constants.cleanCache = 'clean_cache';
Constants.catchpointUserExperience = 'Catchpoint User Experience';


/***/ }),

/***/ "./src/helpers/SonarData.ts":
/*!**********************************!*\
  !*** ./src/helpers/SonarData.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TabResource_1 = __webpack_require__(/*! ./TabResource */ "./src/helpers/TabResource.ts");
const Timings_1 = __webpack_require__(/*! ./Timings */ "./src/helpers/Timings.ts");
class SonarData {
    constructor() {
        this.tabId = 0;
        this.totalSize = 0;
        this.loadTime = 0;
        this.errorCount = 0;
        this.visualsLoadedTime = 0;
        this.imageResource = new TabResource_1.FormattedTabResource(0, 0, 0, 0, 0, 0);
        this.scriptResource = new TabResource_1.FormattedTabResource(0, 0, 0, 0, 0, 0);
        this.cssResource = new TabResource_1.FormattedTabResource(0, 0, 0, 0, 0, 0);
        this.htmlResource = new TabResource_1.FormattedTabResource(0, 0, 0, 0, 0, 0);
        this.otherResource = new TabResource_1.FormattedTabResource(0, 0, 0, 0, 0, 0);
        this.timings = new Timings_1.FormattedTimings([], [], [], [], []);
    }
    static create(entry) {
        return {
            tabId: entry.tabId,
            totalSize: entry.tabResources.getTotalSize(),
            loadTime: entry.loadTime,
            errorCount: entry.errorCount,
            visualsLoadedTime: entry.visualsLoadedTime,
            imageResource: entry.tabResources.getFormattedImageResource(),
            scriptResource: entry.tabResources.getFormattedScriptResource(),
            cssResource: entry.tabResources.getFormattedCssResource(),
            htmlResource: entry.tabResources.getFormattedHtmlResource(),
            otherResource: entry.tabResources.getFormattedOtherResource(),
            timings: entry.timings.getFormattedTimings(),
        };
    }
}
exports.default = SonarData;


/***/ }),

/***/ "./src/helpers/TabResource.ts":
/*!************************************!*\
  !*** ./src/helpers/TabResource.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TabResources = exports.TabResource = exports.FormattedTabResource = void 0;
class FormattedTabResource {
    constructor(totalResourcesCount, resourcesCount, maxCount, resourcesSize, maxSize, totalSize) {
        this.size = resourcesSize;
        this.sizeWidth = this.formatPercentage(resourcesSize === 0 ? 0 : (resourcesSize / maxSize) * 100);
        this.sizePercentage = this.formatPercentage((resourcesSize / totalSize) * 100);
        this.count = resourcesCount;
        this.countPercentage = this.formatPercentage((resourcesCount / totalResourcesCount) * 100);
        this.countWidth = this.formatPercentage(resourcesCount === 0 ? 0 : (resourcesCount / maxCount) * 100);
    }
    formatPercentage(num) {
        return Math.round(num * 100) / 100;
    }
    static create(resource, resources) {
        return new FormattedTabResource(resources.getTotalResourcesCount(), resource.length, resources.getMaxCount(), resources.getResourceSize(resource), resources.getMaxSize(), resources.getTotalSize());
    }
}
exports.FormattedTabResource = FormattedTabResource;
class TabResource {
}
exports.TabResource = TabResource;
class TabResources {
    constructor() {
        this.imageResources = [];
        this.scriptResources = [];
        this.cssResources = [];
        this.htmlResources = [];
        this.otherResources = [];
    }
    add(details) {
        let resourceArray;
        const url = details.url;
        // figure out which resource array we need to update
        switch (details.type) {
            case 'image':
                resourceArray = this.imageResources;
                break;
            case 'script':
                resourceArray = this.scriptResources;
                break;
            case 'stylesheet':
                resourceArray = this.cssResources;
                break;
            case 'main_frame':
                resourceArray = this.htmlResources;
                break;
            case 'xmlhttprequest':
                resourceArray = this.htmlResources;
                break;
            case 'sub_frame':
                resourceArray = this.htmlResources;
                break;
            default:
                resourceArray = this.otherResources;
                break;
        }
        const resource = {
            size: 0,
            url: url,
            host: url.split('/').slice(0, 3).join('/'),
        };
        // get the content-length of the request
        for (let i = 0; i < details.responseHeaders.length; i++) {
            const header = details.responseHeaders[i];
            //TODO: what if there is no content length (i.e. chunked response)?
            if (header.name.toLowerCase() === 'content-length') {
                const value = parseInt(header.value);
                if (!isNaN(value)) {
                    resource.size = value;
                    break;
                }
            }
        }
        resourceArray.push(resource);
    }
    getFormattedImageResource() {
        return FormattedTabResource.create(this.imageResources, this);
    }
    getFormattedScriptResource() {
        return FormattedTabResource.create(this.scriptResources, this);
    }
    getFormattedCssResource() {
        return FormattedTabResource.create(this.cssResources, this);
    }
    getFormattedHtmlResource() {
        return FormattedTabResource.create(this.htmlResources, this);
    }
    getFormattedOtherResource() {
        return FormattedTabResource.create(this.otherResources, this);
    }
    getTotalResourcesCount() {
        let resources = this.imageResources;
        resources = resources.concat(this.scriptResources);
        resources = resources.concat(this.cssResources);
        resources = resources.concat(this.htmlResources);
        resources = resources.concat(this.otherResources);
        return resources.length;
    }
    getMaxCount() {
        let maxLength = this.imageResources.length;
        maxLength = Math.max(this.scriptResources.length, maxLength);
        maxLength = Math.max(this.cssResources.length, maxLength);
        maxLength = Math.max(this.htmlResources.length, maxLength);
        maxLength = Math.max(this.otherResources.length, maxLength);
        return maxLength;
    }
    getMaxSize() {
        let maxSize = this.getResourceSize(this.imageResources);
        maxSize = Math.max(this.getResourceSize(this.scriptResources), maxSize);
        maxSize = Math.max(this.getResourceSize(this.cssResources), maxSize);
        maxSize = Math.max(this.getResourceSize(this.htmlResources), maxSize);
        maxSize = Math.max(this.getResourceSize(this.otherResources), maxSize);
        return maxSize;
    }
    getTotalSize() {
        let size = this.getResourceSize(this.imageResources);
        size += this.getResourceSize(this.scriptResources);
        size += this.getResourceSize(this.cssResources);
        size += this.getResourceSize(this.htmlResources);
        size += this.getResourceSize(this.otherResources);
        return size;
    }
    getResourceSize(resource) {
        let size = 0;
        for (let i = 0; i < resource.length; i++) {
            const resourceSize = resource[i].size;
            if (resourceSize == null) {
                continue;
            }
            size += resourceSize;
        }
        return size;
    }
    getAllResources() {
        let resources = this.imageResources;
        resources = resources.concat(this.scriptResources);
        resources = resources.concat(this.cssResources);
        resources = resources.concat(this.htmlResources);
        resources = resources.concat(this.otherResources);
        return resources;
    }
    clear() {
        this.imageResources = [];
        this.scriptResources = [];
        this.cssResources = [];
        this.htmlResources = [];
        this.otherResources = [];
    }
}
exports.TabResources = TabResources;


/***/ }),

/***/ "./src/helpers/Timings.ts":
/*!********************************!*\
  !*** ./src/helpers/Timings.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TimingsCollection = exports.Timings = exports.MillisecondTiming = exports.FormattedTimings = void 0;
class FormattedTimings {
    constructor(bottleneck, dns, connect, wait, response) {
        this.bottlenecks = this.sortAndTakeTop(bottleneck);
        this.dns = this.sortAndTakeTop(dns);
        this.connect = this.sortAndTakeTop(connect);
        this.wait = this.sortAndTakeTop(wait);
        this.response = this.sortAndTakeTop(response);
    }
    sortAndTakeTop(timings) {
        const top = 5;
        function compare(a, b) {
            if (a.ms < b.ms) {
                return 1;
            }
            if (a.ms > b.ms) {
                return -1;
            }
            return 0;
        }
        const arraySlice = timings.sort(compare).slice(0, top);
        let maximumMilliseconds = 0;
        for (let i = 0; i < arraySlice.length; i++) {
            maximumMilliseconds = Math.max(maximumMilliseconds, arraySlice[i].ms);
        }
        for (let i = 0; i < arraySlice.length; i++) {
            const element = arraySlice[i];
            if (element.ms === 0) {
                element.width = 0;
                continue;
            }
            element.width = (element.ms / maximumMilliseconds) * 100;
        }
        return arraySlice;
    }
}
exports.FormattedTimings = FormattedTimings;
class MillisecondTiming {
    constructor(name, ms) {
        this.name = name;
        this.ms = this.formatMilliseconds(ms);
    }
    formatMilliseconds(ms) {
        return Math.round(ms);
    }
}
exports.MillisecondTiming = MillisecondTiming;
class Timings {
    constructor(resource) {
        this.name = resource.name;
        this.dns = resource.domainLookupEnd - resource.domainLookupStart;
        this.connect = resource.connectEnd - resource.connectStart;
        this.start = resource.startTime;
        this.end = resource.responseEnd;
        this.response = resource.responseEnd - resource.startTime;
        this.wait = resource.responseStart > 0 ? resource.responseStart - resource.startTime : 0;
    }
}
exports.Timings = Timings;
class TimingsCollection {
    constructor() {
        this.timings = [];
    }
    add(resources, loadTime) {
        for (let i = 0; i < resources.length; i++) {
            const resource = resources[i];
            let found = false;
            const timings = new Timings(resource);
            // if an entry with the same name already exists, replace it
            for (let i = 0; i < this.timings.length; i++) {
                if (this.timings[i].name === resource.name) {
                    this.timings[i] = timings;
                    found = true;
                    break;
                }
            }
            if (found)
                continue;
            this.timings.push(timings);
        }
        this.calculateBottlenecks(this.timings, loadTime);
    }
    calculateBottlenecks(timings, loadTime) {
        for (let i = 0; i < timings.length; i++) {
            const timing = timings[i];
            if (!this.isBeforeLoad(timing, loadTime)) {
                timing.bottleneck = 0;
                continue;
            }
            const timingSections = [{ start: timing.start, end: timing.end }];
            for (let j = 0; j < timings.length; j++) {
                if (i === j) {
                    continue;
                }
                const otherTiming = timings[j];
                if (!this.isBeforeLoad(otherTiming, loadTime)) {
                    continue;
                }
                if (this.removeOverlaps(timingSections, otherTiming.start, otherTiming.end)) {
                    break;
                }
            }
            if (timingSections.length === 0) {
                timing.bottleneck = 0;
            }
            else {
                timing.bottleneck = this.addSections(timingSections);
            }
        }
    }
    isBeforeLoad(rawSection, loadTime) {
        return loadTime == null || rawSection.end <= loadTime;
    }
    removeOverlaps(timingSections, start, end) {
        const toAdd = [];
        const toRemove = [];
        // a bottleneck is time that a given host/request is the only one on the wire
        // this algorithm tries to find a section that is not overlapped
        for (let i = 0; i < timingSections.length; i++) {
            const section = timingSections[i];
            if (start > section.start && start < section.end && end > section.end) {
                // sec.start ---- start ---- sec.end ---- end
                section.end = start; // sec.start ---- start
            }
            else if (end > section.start && end < section.end && start < section.start) {
                // start ---- sec.start ---- end ---- sec.end
                section.start = end; // end ---- sec.end
            }
            else if (start > section.start && start < section.end && end > section.start && end < section.end) {
                // sec.start ---- start ---- end ---- sec.end
                toAdd.push({ start: end, end: section.end }); // end ---- sec.end
                section.end = start; // sec.start ---- start
            }
            else if (start < section.start && end > section.end) {
                // start ---- sec.start ---- sec.end ---- end
                toRemove.push(i);
            }
        }
        if (toRemove.length > 0) {
            for (let i = toRemove.length - 1; i >= 0; i--) {
                timingSections.splice(toRemove[i], 1);
            }
        }
        if (toAdd.length > 0) {
            timingSections = timingSections.concat(toAdd);
        }
        return timingSections.length === 0;
    }
    addSections(sections) {
        let total = 0;
        for (let i = 0; i < sections.length; i++) {
            total += sections[i].end - sections[i].start;
        }
        return total;
    }
    getFormattedTimings() {
        const bottleneck = [];
        const dns = [];
        const connect = [];
        const wait = [];
        const response = [];
        const hosts = {};
        for (let i = 0; i < this.timings.length; i++) {
            const timingData = this.timings[i];
            const host = timingData.name.split('/').slice(0, 3).join('/'); // shorten urls to only 3 segments max
            let hostObject = hosts[host];
            if (hostObject == null) {
                hostObject = {
                    dns: 0,
                    connect: 0,
                    wait: 0,
                    response: 0,
                    bottleneck: 0,
                };
                hosts[host] = hostObject;
            }
            hostObject.dns += timingData.dns;
            hostObject.connect += timingData.connect;
            hostObject.wait += timingData.wait;
            hostObject.response += timingData.response;
            hostObject.bottleneck += timingData.bottleneck;
        }
        for (const name in hosts) {
            if (!hosts.hasOwnProperty(name)) {
                continue;
            }
            const hostObject = hosts[name];
            bottleneck.push(new MillisecondTiming(name, hostObject.bottleneck));
            dns.push(new MillisecondTiming(name, hostObject.dns));
            connect.push(new MillisecondTiming(name, hostObject.connect));
            wait.push(new MillisecondTiming(name, hostObject.wait));
            response.push(new MillisecondTiming(name, hostObject.response));
        }
        return new FormattedTimings(bottleneck, dns, connect, wait, response);
    }
    clear() {
        this.timings = [];
    }
}
exports.TimingsCollection = TimingsCollection;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvQ2FjaGVFbnRyeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy9Db25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvU29uYXJEYXRhLnRzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL1RhYlJlc291cmNlLnRzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL1RpbWluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuRWE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxxQkFBcUIsbUJBQU8sQ0FBQyx5REFBc0I7QUFDbkQsb0JBQW9CLG1CQUFPLENBQUMsdURBQXFCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxrREFBa0Q7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxnQkFBZ0I7QUFDdEQsNENBQTRDLHlDQUF5QztBQUNyRixhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG9DQUFvQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDLEdBQUcsdUJBQXVCO0FBQzNCO0FBQ0E7QUFDQSwrQ0FBK0MsOENBQThDO0FBQzdGLDhCQUE4QiwrQkFBK0I7QUFDN0QsQ0FBQztBQUNEO0FBQ0EseUNBQXlDLHFDQUFxQztBQUM5RSxDQUFDO0FBQ0Q7QUFDQSxvQ0FBb0MscUNBQXFDO0FBQ3pFLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsY0FBYztBQUM1QyxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLHNCQUFzQjtBQUM1RCw0Q0FBNEMsaUNBQWlDO0FBQzdFLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyx5QkFBeUI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7O0FDbkxhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsc0JBQXNCLG1CQUFPLENBQUMsbURBQWU7QUFDN0Msa0JBQWtCLG1CQUFPLENBQUMsMkNBQVc7QUFDckMsb0JBQW9CLG1CQUFPLENBQUMsK0NBQWE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbENhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3JCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELHNCQUFzQixtQkFBTyxDQUFDLG1EQUFlO0FBQzdDLGtCQUFrQixtQkFBTyxDQUFDLDJDQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbENhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixvQ0FBb0M7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdkphO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsdUJBQXVCO0FBQzlDO0FBQ0E7QUFDQSx1QkFBdUIsdUJBQXVCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHlCQUF5QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyx1Q0FBdUM7QUFDNUUsMkJBQTJCLG9CQUFvQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMkJBQTJCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLCtCQUErQixFQUFFO0FBQzdELG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxRQUFRO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHlCQUF5QjtBQUNoRDtBQUNBLDBFQUEwRTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJhY2tncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYmFja2dyb3VuZC50c1wiKTtcbiIsIid1c2Ugc3RyaWN0JztcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYWNoZUVudHJ5XzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL0NhY2hlRW50cnlcIik7XHJcbmNvbnN0IENvbnN0YW50c18xID0gcmVxdWlyZShcIi4vaGVscGVycy9Db25zdGFudHNcIik7XHJcbmNvbnN0IGNhY2hlID0gbmV3IE1hcCgpO1xyXG5jb25zdCBmb3JtYXR0ZWRDYWNoZSA9IG5ldyBNYXAoKTtcclxubGV0IHJlZnJlc2hGcmVxdWVuY3kgPSAzMDAwMDtcclxubGV0IHVzZXJEYXRhSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChnZXRVc2VyRGF0YSwgcmVmcmVzaEZyZXF1ZW5jeSk7XHJcbmNvbnN0IHVybFN0YXR1cyA9IG5ldyBNYXAoKTtcclxuZnVuY3Rpb24gZ2V0VXNlckRhdGEoKSB7XHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTmF0aXZlTWVzc2FnZShDb25zdGFudHNfMS5kZWZhdWx0LnNvbmFyQmFja2VuZEFwcGxpY2F0aW9uLCB7XHJcbiAgICAgICAgQ29tbWFuZDogJ0dldFVzZXJEYXRhJyxcclxuICAgICAgICBBcmd1bWVudHM6IHt9LFxyXG4gICAgfSwgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFjaHJvbWUucnVudGltZS5sYXN0RXJyb3IgJiYgcmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVzcG9uc2UgJiYgIXJlc3BvbnNlLkVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJEYXRhID0gcmVzcG9uc2UuRGF0YTtcclxuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtcclxuICAgICAgICAgICAgICAgIFtDb25zdGFudHNfMS5kZWZhdWx0LnVzZXJEYXRhS2V5XTogdXNlckRhdGEsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBuZXdSZWZyZXNoRnJlcXVlbmN5ID0gdXNlckRhdGEuUmVmcmVzaEZyZXF1ZW5jeUluU2Vjb25kcyAqIDEwMDA7XHJcbiAgICAgICAgICAgIGlmIChuZXdSZWZyZXNoRnJlcXVlbmN5ICE9PSByZWZyZXNoRnJlcXVlbmN5ICYmIG5ld1JlZnJlc2hGcmVxdWVuY3kpIHtcclxuICAgICAgICAgICAgICAgIHJlZnJlc2hGcmVxdWVuY3kgPSBuZXdSZWZyZXNoRnJlcXVlbmN5O1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh1c2VyRGF0YUludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIHVzZXJEYXRhSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChnZXRVc2VyRGF0YSwgcmVmcmVzaEZyZXF1ZW5jeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5jb25zdCBlcnJzT25UYWIgPSBbXTtcclxuZnVuY3Rpb24gZ2V0Q2FjaGVFbnRyeSh0YWJJZCkge1xyXG4gICAgaWYgKHRhYklkID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGxldCBjYWNoZU9iamVjdCA9IGNhY2hlW0NvbnN0YW50c18xLmRlZmF1bHQudGFiUHJlZml4ICsgdGFiSWRdO1xyXG4gICAgaWYgKGNhY2hlT2JqZWN0ID09IG51bGwpIHtcclxuICAgICAgICBjYWNoZU9iamVjdCA9IG5ldyBDYWNoZUVudHJ5XzEuZGVmYXVsdCh0YWJJZCk7XHJcbiAgICAgICAgY2FjaGVbQ29uc3RhbnRzXzEuZGVmYXVsdC50YWJQcmVmaXggKyB0YWJJZF0gPSBjYWNoZU9iamVjdDtcclxuICAgIH1cclxuICAgIHJldHVybiBjYWNoZU9iamVjdDtcclxufVxyXG5mdW5jdGlvbiBub3RpZnlDYWNoZVVwZGF0ZWQodGFiSWQsIGlzVXBkYXRlVG9DbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBmb3JtYXR0ZWRDYWNoZVtDb25zdGFudHNfMS5kZWZhdWx0LnRhYlByZWZpeCArIHRhYklkXSA9IGlzVXBkYXRlVG9DbGVhblxyXG4gICAgICAgID8gZ2V0Q2FjaGVFbnRyeSh0YWJJZCkuY2xlYXIoKVxyXG4gICAgICAgIDogZ2V0Q2FjaGVFbnRyeSh0YWJJZCkuZ2V0RnVsbERhdGEoKTtcclxuICAgIGNvbnN0IHBheWxvYWQgPSB7fTtcclxuICAgIHBheWxvYWRbQ29uc3RhbnRzXzEuZGVmYXVsdC5kYXRhS2V5XSA9IGZvcm1hdHRlZENhY2hlO1xyXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHBheWxvYWQpO1xyXG4gICAgLy8gc2VuZCBtZXNzYWdlIHRvIHBvcHVwIHNjcmlwdCB0aGF0IHRoZSBjYWNoZSBoYXMgYmVlbiByZWZyZXNoZWQgZm9yIHRoZSBnaXZlbiB0YWJcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgbmFtZTogQ29uc3RhbnRzXzEuZGVmYXVsdC5yZWZyZXNoUHJlZml4ICsgdGFiSWQgfSk7XHJcbn1cclxuY2hyb21lLndlYlJlcXVlc3Qub25Db21wbGV0ZWQuYWRkTGlzdGVuZXIoKGRldGFpbHMpID0+IHtcclxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZGV0YWlscy51cmwpO1xyXG4gICAgY29uc3QgcmVxdWVzdFRhYklkID0gZGV0YWlscy50YWJJZDtcclxuICAgIGlmIChyZXF1ZXN0VGFiSWQgPCAwIHx8IHVybC5wcm90b2NvbCA9PT0gJ2Nocm9tZS1leHRlbnNpb246Jykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHVybFN0YXR1cy5zZXQoZGV0YWlscy51cmwsIGRldGFpbHMuc3RhdHVzQ29kZSk7XHJcbiAgICBpZiAoNDAwIDw9IGRldGFpbHMuc3RhdHVzQ29kZSAmJiBkZXRhaWxzLnN0YXR1c0NvZGUgPCA2MDApIHtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgaWQ6ICd3ZWJwYWdlX2Vycm9yJyxcclxuICAgICAgICAgICAgdHlwZTogJ2Fzc2V0JyxcclxuICAgICAgICAgICAgdXJsOiBkZXRhaWxzLnVybCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2Fzc2V0JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBrZXkgPSBkZXRhaWxzLnRhYklkLnRvU3RyaW5nKCkgKyAnX3JlcXVlc3QnO1xyXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChba2V5XSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgbGV0IHRvU2F2ZSA9IFtdO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFba2V5XSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHRvU2F2ZSA9IFsuLi5kYXRhW2tleV1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRvU2F2ZS5wdXNoKGVudHJ5KTtcclxuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgW2tleV06IHRvU2F2ZSB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IG5hbWU6ICd3ZWJwYWdlX2Vycm9yX3JlcXVlc3QnLCBpZDoga2V5IH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbnN0IGNhY2hlRW50cnkgPSBnZXRDYWNoZUVudHJ5KHJlcXVlc3RUYWJJZCk7XHJcbiAgICBjYWNoZUVudHJ5LnVwZGF0ZShkZXRhaWxzKTtcclxuICAgIG5vdGlmeUNhY2hlVXBkYXRlZChyZXF1ZXN0VGFiSWQpO1xyXG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgdGFicyA9PiB7XHJcbiAgICAgICAgaWYgKCFjaHJvbWUucnVudGltZS5sYXN0RXJyb3IgJiYgdGFicy5sZW5ndGggPiAwICYmIHJlcXVlc3RUYWJJZCA9PT0gdGFic1swXS5pZCkge1xyXG4gICAgICAgICAgICAvLyBzZW5kIG1lc3NhZ2UgdG8gY29udGVudCBzY3JpcHQgdGhhdCB0aGVyZSBhcmUgbmV3IHJlc291cmNlcyBhdmFpbGFibGVcclxuICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFic1swXS5pZCwgQ29uc3RhbnRzXzEuZGVmYXVsdC5yZXNvdXJjZXNNZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSwgeyB1cmxzOiBbJzxhbGxfdXJscz4nXSB9LCBbJ3Jlc3BvbnNlSGVhZGVycyddKTtcclxuY2hyb21lLnRhYnMub25BY3RpdmF0ZWQuYWRkTGlzdGVuZXIoKGFjdGl2ZUluZm8pID0+IHtcclxuICAgIG5vdGlmeUNhY2hlVXBkYXRlZChhY3RpdmVJbmZvLnRhYklkKTtcclxuICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZUluZm8udGFiSWQsIHsgaWQ6ICd0YWJBY3RpdmF0ZWQnLCB0YWJJZDogYWN0aXZlSW5mby50YWJJZCB9KTtcclxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IGN1cnJlbnRUYWI6IGFjdGl2ZUluZm8udGFiSWQgfSk7XHJcbn0pO1xyXG5jaHJvbWUudGFicy5vbkNyZWF0ZWQuYWRkTGlzdGVuZXIoKGluZm9UYWIpID0+IHtcclxuICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGluZm9UYWIuaWQsIHsgaWQ6ICdvbkNyZWF0ZWQnLCB0YWJJZDogaW5mb1RhYi5pZCB9KTtcclxufSk7XHJcbmNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcigodGFiSWQsIGNoYW5nZUluZm8pID0+IHtcclxuICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYklkLCB7IGlkOiAndGFiVXBkYXRlJywgdGFiSWQsIGNoYW5nZUluZm8gfSk7XHJcbn0pO1xyXG5jaHJvbWUudGFicy5vblJlbW92ZWQuYWRkTGlzdGVuZXIoKHRhYklkKSA9PiB7XHJcbiAgICBkZWxldGUgY2FjaGVbQ29uc3RhbnRzXzEuZGVmYXVsdC50YWJQcmVmaXggKyB0YWJJZF07XHJcbiAgICBkZWxldGUgZm9ybWF0dGVkQ2FjaGVbQ29uc3RhbnRzXzEuZGVmYXVsdC50YWJQcmVmaXggKyB0YWJJZF07XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBbdGFiSWRdOiAnJyB9KTtcclxufSk7XHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgc2VuZGVyKSA9PiB7XHJcbiAgICBpZiAobWVzc2FnZS5uYW1lID09PSBDb25zdGFudHNfMS5kZWZhdWx0LnJ1bVJlcXVlc3RTZW50RXZlbnQpIHtcclxuICAgICAgICAvLyBzZW5kIHJ1bSByZXF1ZXN0IG9uIHRoZSBiYWNrZW5kXHJcbiAgICAgICAgLy9hZGRpbmcgXCJzdFwiIHN0YXR1cyBjb2RlIGluIFJ1bSByZXF1ZXN0XHJcbiAgICAgICAgaWYgKG1lc3NhZ2UuZGF0YSAmJiBtZXNzYWdlLmRhdGEuZGF0YSkge1xyXG4gICAgICAgICAgICBjb25zdCBtc2dEYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgIG1zZ0RhdGFbJ3N0J10gPSB1cmxTdGF0dXMuZ2V0KG1zZ0RhdGFbJ3JmJ10pO1xyXG4gICAgICAgICAgICBtZXNzYWdlLmRhdGEuZGF0YSA9IEpTT04uc3RyaW5naWZ5KG1zZ0RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTmF0aXZlTWVzc2FnZShDb25zdGFudHNfMS5kZWZhdWx0LnNvbmFyQmFja2VuZEFwcGxpY2F0aW9uLCB7XHJcbiAgICAgICAgICAgIENvbW1hbmQ6ICdSdW0nLFxyXG4gICAgICAgICAgICBBcmd1bWVudHM6IHtcclxuICAgICAgICAgICAgICAgIERhdGE6IG1lc3NhZ2UuZGF0YS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgSG9zdDogbWVzc2FnZS5kYXRhLmhvc3QsXHJcbiAgICAgICAgICAgICAgICBVc2VyQWdlbnQ6IG5hdmlnYXRvci51c2VyQWdlbnQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSwgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yICYmIHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAobWVzc2FnZS5kYXRhLnJ1blRyYWNlcm91dGUpIHtcclxuICAgICAgICAgICAgLy8gZXhlY3V0ZSB0cmFjZXJvdXRlIG9uIHRoZSBiYWNrZW5kXHJcbiAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmROYXRpdmVNZXNzYWdlKENvbnN0YW50c18xLmRlZmF1bHQuc29uYXJCYWNrZW5kQXBwbGljYXRpb24sIHtcclxuICAgICAgICAgICAgICAgIENvbW1hbmQ6ICdUcmFjZXJvdXRlJyxcclxuICAgICAgICAgICAgICAgIEFyZ3VtZW50czoge1xyXG4gICAgICAgICAgICAgICAgICAgIEhvc3Q6IG1lc3NhZ2UuZGF0YS5ob3N0LFxyXG4gICAgICAgICAgICAgICAgICAgIFNpdGVJZDogbWVzc2FnZS5kYXRhLnNpdGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBTZXNzaW9uSWQ6IG1lc3NhZ2UuZGF0YS5zZXNzaW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgVXNlckFnZW50OiBuYXZpZ2F0b3IudXNlckFnZW50LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSwgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNocm9tZS5ydW50aW1lLmxhc3RFcnJvciAmJiByZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHNlbmRlclRhYiA9IHNlbmRlci50YWIuaWQ7XHJcbiAgICBjb25zdCBrZXkgPSBzZW5kZXJUYWIudG9TdHJpbmcoKTtcclxuICAgIGNvbnN0IGNhY2hlRW50cnkgPSBnZXRDYWNoZUVudHJ5KHNlbmRlclRhYik7XHJcbiAgICAvLyB0aGVzZSBtZXNzYWdlcyBhcmUgY29taW5nIGZyb20gdGhlIGNvbnRlbnQgc2NyaXB0XHJcbiAgICBzd2l0Y2ggKG1lc3NhZ2UubmFtZSkge1xyXG4gICAgICAgIGNhc2UgQ29uc3RhbnRzXzEuZGVmYXVsdC5sb2FkVGltZU1lc3NhZ2U6XHJcbiAgICAgICAgICAgIGNhY2hlRW50cnkubG9hZFRpbWUgPSBtZXNzYWdlLmRhdGE7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgQ29uc3RhbnRzXzEuZGVmYXVsdC5lcnJvckNvdW50TWVzc2FnZTpcclxuICAgICAgICAgICAgY2FjaGVFbnRyeS5lcnJvckNvdW50ID0gbWVzc2FnZS5kYXRhO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIENvbnN0YW50c18xLmRlZmF1bHQudGltaW5nc01lc3NhZ2U6XHJcbiAgICAgICAgICAgIGNhY2hlRW50cnkuYWRkVGltaW5ncyhtZXNzYWdlLmRhdGEpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIENvbnN0YW50c18xLmRlZmF1bHQudmlzdWFsc0xvYWRlZFRpbWVNZXNzYWdlOlxyXG4gICAgICAgICAgICBjb25zdCB2aXN1YWxzTG9hZGVkVGltZSA9IGNhY2hlRW50cnkudmlzdWFsc0xvYWRlZFRpbWU7XHJcbiAgICAgICAgICAgIGlmICh2aXN1YWxzTG9hZGVkVGltZSA8IG1lc3NhZ2UuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY2FjaGVFbnRyeS52aXN1YWxzTG9hZGVkVGltZSA9IG1lc3NhZ2UuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIENvbnN0YW50c18xLmRlZmF1bHQuZmFpbHM6XHJcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IFtrZXldOiBtZXNzYWdlLmRhdGEgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBuYW1lOiAnd2VicGFnZV9lcnJvcicsIGlkOiBrZXkgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIENvbnN0YW50c18xLmRlZmF1bHQuY2xlYW5DYWNoZTpcclxuICAgICAgICAgICAgY29uc3Qga2V5RXJyb3NSZXF1ZXN0cyA9IGtleSArICdfcmVxdWVzdCc7XHJcbiAgICAgICAgICAgIG5vdGlmeUNhY2hlVXBkYXRlZChrZXksIHRydWUpO1xyXG4gICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBba2V5RXJyb3NSZXF1ZXN0c106IFtdIH0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIG5vdGlmeUNhY2hlVXBkYXRlZChzZW5kZXJUYWIpO1xyXG59KTtcclxuZ2V0VXNlckRhdGEoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgVGFiUmVzb3VyY2VfMSA9IHJlcXVpcmUoXCIuL1RhYlJlc291cmNlXCIpO1xyXG5jb25zdCBUaW1pbmdzXzEgPSByZXF1aXJlKFwiLi9UaW1pbmdzXCIpO1xyXG5jb25zdCBTb25hckRhdGFfMSA9IHJlcXVpcmUoXCIuL1NvbmFyRGF0YVwiKTtcclxuY2xhc3MgQ2FjaGVFbnRyeSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0YWJJZCkge1xyXG4gICAgICAgIHRoaXMuZXJyb3JDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy52aXN1YWxzTG9hZGVkVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy50YWJJZCA9IDA7XHJcbiAgICAgICAgdGhpcy5sb2FkVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy50YWJSZXNvdXJjZXMgPSBuZXcgVGFiUmVzb3VyY2VfMS5UYWJSZXNvdXJjZXMoKTtcclxuICAgICAgICB0aGlzLnRpbWluZ3MgPSBuZXcgVGltaW5nc18xLlRpbWluZ3NDb2xsZWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy50YWJJZCA9IHRhYklkO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGRldGFpbHMpIHtcclxuICAgICAgICBpZiAoZGV0YWlscy50eXBlID09PSAnbWFpbl9mcmFtZScpXHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLnRhYlJlc291cmNlcy5hZGQoZGV0YWlscyk7XHJcbiAgICB9XHJcbiAgICBhZGRUaW1pbmdzKHJlc291cmNlcykge1xyXG4gICAgICAgIHRoaXMudGltaW5ncy5hZGQocmVzb3VyY2VzLCB0aGlzLmxvYWRUaW1lKTtcclxuICAgIH1cclxuICAgIGdldEZ1bGxEYXRhKCkge1xyXG4gICAgICAgIHJldHVybiBTb25hckRhdGFfMS5kZWZhdWx0LmNyZWF0ZSh0aGlzKTtcclxuICAgIH1cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMuZXJyb3JDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5sb2FkVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy50aW1pbmdzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy52aXN1YWxzTG9hZGVkVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy50YWJSZXNvdXJjZXMuY2xlYXIoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBDYWNoZUVudHJ5O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jbGFzcyBDb25zdGFudHMge1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IENvbnN0YW50cztcclxuQ29uc3RhbnRzLnRhYlByZWZpeCA9ICd0YWJfJztcclxuQ29uc3RhbnRzLnJlZnJlc2hQcmVmaXggPSAncmVmcmVzaF8nO1xyXG5Db25zdGFudHMucmVzb3VyY2VzTWVzc2FnZSA9ICdyZXNvdXJjZXMnO1xyXG5Db25zdGFudHMubG9hZFRpbWVNZXNzYWdlID0gJ2xvYWRUaW1lJztcclxuQ29uc3RhbnRzLmVycm9yQ291bnRNZXNzYWdlID0gJ2Vycm9yQ291bnQnO1xyXG5Db25zdGFudHMudGltaW5nc01lc3NhZ2UgPSAndGltaW5ncyc7XHJcbkNvbnN0YW50cy52aXN1YWxzTG9hZGVkVGltZU1lc3NhZ2UgPSAndmlzdWFsc0xvYWRlZFRpbWUnO1xyXG5Db25zdGFudHMuZGF0YUtleSA9ICdkYXRhJztcclxuQ29uc3RhbnRzLnVzZXJEYXRhS2V5ID0gJ3VzZXJEYXRhJztcclxuQ29uc3RhbnRzLnJ1bVJlcXVlc3RTZW50RXZlbnQgPSAncnVtUmVxdWVzdFNlbnQnO1xyXG5Db25zdGFudHMuY2F0Y2hwb2ludFVybCA9ICdodHRwOi8vd3d3LmNhdGNocG9pbnQuY29tLyc7XHJcbkNvbnN0YW50cy5pc0FkdmFuY2VkTW9kZUtleSA9ICdpc0FkdmFuY2VkTW9kZSc7XHJcbkNvbnN0YW50cy5zb25hckJhY2tlbmRBcHBsaWNhdGlvbiA9ICdjb20uY2F0Y2hwb2ludC5zb25hcmJhY2tlbmQnO1xyXG5Db25zdGFudHMuZmFpbHMgPSAnd2VicGFnZV9lcnJvcic7XHJcbkNvbnN0YW50cy5jYXRjaHBvaW50TW9uaXRvcmluZ1VybCA9ICdodHRwczovL3d3dy5jYXRjaHBvaW50LmNvbS9lbmRwb2ludC1tb25pdG9yaW5nJztcclxuQ29uc3RhbnRzLmNsZWFuQ2FjaGUgPSAnY2xlYW5fY2FjaGUnO1xyXG5Db25zdGFudHMuY2F0Y2hwb2ludFVzZXJFeHBlcmllbmNlID0gJ0NhdGNocG9pbnQgVXNlciBFeHBlcmllbmNlJztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgVGFiUmVzb3VyY2VfMSA9IHJlcXVpcmUoXCIuL1RhYlJlc291cmNlXCIpO1xyXG5jb25zdCBUaW1pbmdzXzEgPSByZXF1aXJlKFwiLi9UaW1pbmdzXCIpO1xyXG5jbGFzcyBTb25hckRhdGEge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy50YWJJZCA9IDA7XHJcbiAgICAgICAgdGhpcy50b3RhbFNpemUgPSAwO1xyXG4gICAgICAgIHRoaXMubG9hZFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuZXJyb3JDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy52aXN1YWxzTG9hZGVkVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5pbWFnZVJlc291cmNlID0gbmV3IFRhYlJlc291cmNlXzEuRm9ybWF0dGVkVGFiUmVzb3VyY2UoMCwgMCwgMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5zY3JpcHRSZXNvdXJjZSA9IG5ldyBUYWJSZXNvdXJjZV8xLkZvcm1hdHRlZFRhYlJlc291cmNlKDAsIDAsIDAsIDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMuY3NzUmVzb3VyY2UgPSBuZXcgVGFiUmVzb3VyY2VfMS5Gb3JtYXR0ZWRUYWJSZXNvdXJjZSgwLCAwLCAwLCAwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLmh0bWxSZXNvdXJjZSA9IG5ldyBUYWJSZXNvdXJjZV8xLkZvcm1hdHRlZFRhYlJlc291cmNlKDAsIDAsIDAsIDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMub3RoZXJSZXNvdXJjZSA9IG5ldyBUYWJSZXNvdXJjZV8xLkZvcm1hdHRlZFRhYlJlc291cmNlKDAsIDAsIDAsIDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMudGltaW5ncyA9IG5ldyBUaW1pbmdzXzEuRm9ybWF0dGVkVGltaW5ncyhbXSwgW10sIFtdLCBbXSwgW10pO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGNyZWF0ZShlbnRyeSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRhYklkOiBlbnRyeS50YWJJZCxcclxuICAgICAgICAgICAgdG90YWxTaXplOiBlbnRyeS50YWJSZXNvdXJjZXMuZ2V0VG90YWxTaXplKCksXHJcbiAgICAgICAgICAgIGxvYWRUaW1lOiBlbnRyeS5sb2FkVGltZSxcclxuICAgICAgICAgICAgZXJyb3JDb3VudDogZW50cnkuZXJyb3JDb3VudCxcclxuICAgICAgICAgICAgdmlzdWFsc0xvYWRlZFRpbWU6IGVudHJ5LnZpc3VhbHNMb2FkZWRUaW1lLFxyXG4gICAgICAgICAgICBpbWFnZVJlc291cmNlOiBlbnRyeS50YWJSZXNvdXJjZXMuZ2V0Rm9ybWF0dGVkSW1hZ2VSZXNvdXJjZSgpLFxyXG4gICAgICAgICAgICBzY3JpcHRSZXNvdXJjZTogZW50cnkudGFiUmVzb3VyY2VzLmdldEZvcm1hdHRlZFNjcmlwdFJlc291cmNlKCksXHJcbiAgICAgICAgICAgIGNzc1Jlc291cmNlOiBlbnRyeS50YWJSZXNvdXJjZXMuZ2V0Rm9ybWF0dGVkQ3NzUmVzb3VyY2UoKSxcclxuICAgICAgICAgICAgaHRtbFJlc291cmNlOiBlbnRyeS50YWJSZXNvdXJjZXMuZ2V0Rm9ybWF0dGVkSHRtbFJlc291cmNlKCksXHJcbiAgICAgICAgICAgIG90aGVyUmVzb3VyY2U6IGVudHJ5LnRhYlJlc291cmNlcy5nZXRGb3JtYXR0ZWRPdGhlclJlc291cmNlKCksXHJcbiAgICAgICAgICAgIHRpbWluZ3M6IGVudHJ5LnRpbWluZ3MuZ2V0Rm9ybWF0dGVkVGltaW5ncygpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gU29uYXJEYXRhO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlRhYlJlc291cmNlcyA9IGV4cG9ydHMuVGFiUmVzb3VyY2UgPSBleHBvcnRzLkZvcm1hdHRlZFRhYlJlc291cmNlID0gdm9pZCAwO1xyXG5jbGFzcyBGb3JtYXR0ZWRUYWJSZXNvdXJjZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0b3RhbFJlc291cmNlc0NvdW50LCByZXNvdXJjZXNDb3VudCwgbWF4Q291bnQsIHJlc291cmNlc1NpemUsIG1heFNpemUsIHRvdGFsU2l6ZSkge1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHJlc291cmNlc1NpemU7XHJcbiAgICAgICAgdGhpcy5zaXplV2lkdGggPSB0aGlzLmZvcm1hdFBlcmNlbnRhZ2UocmVzb3VyY2VzU2l6ZSA9PT0gMCA/IDAgOiAocmVzb3VyY2VzU2l6ZSAvIG1heFNpemUpICogMTAwKTtcclxuICAgICAgICB0aGlzLnNpemVQZXJjZW50YWdlID0gdGhpcy5mb3JtYXRQZXJjZW50YWdlKChyZXNvdXJjZXNTaXplIC8gdG90YWxTaXplKSAqIDEwMCk7XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IHJlc291cmNlc0NvdW50O1xyXG4gICAgICAgIHRoaXMuY291bnRQZXJjZW50YWdlID0gdGhpcy5mb3JtYXRQZXJjZW50YWdlKChyZXNvdXJjZXNDb3VudCAvIHRvdGFsUmVzb3VyY2VzQ291bnQpICogMTAwKTtcclxuICAgICAgICB0aGlzLmNvdW50V2lkdGggPSB0aGlzLmZvcm1hdFBlcmNlbnRhZ2UocmVzb3VyY2VzQ291bnQgPT09IDAgPyAwIDogKHJlc291cmNlc0NvdW50IC8gbWF4Q291bnQpICogMTAwKTtcclxuICAgIH1cclxuICAgIGZvcm1hdFBlcmNlbnRhZ2UobnVtKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQobnVtICogMTAwKSAvIDEwMDtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjcmVhdGUocmVzb3VyY2UsIHJlc291cmNlcykge1xyXG4gICAgICAgIHJldHVybiBuZXcgRm9ybWF0dGVkVGFiUmVzb3VyY2UocmVzb3VyY2VzLmdldFRvdGFsUmVzb3VyY2VzQ291bnQoKSwgcmVzb3VyY2UubGVuZ3RoLCByZXNvdXJjZXMuZ2V0TWF4Q291bnQoKSwgcmVzb3VyY2VzLmdldFJlc291cmNlU2l6ZShyZXNvdXJjZSksIHJlc291cmNlcy5nZXRNYXhTaXplKCksIHJlc291cmNlcy5nZXRUb3RhbFNpemUoKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Gb3JtYXR0ZWRUYWJSZXNvdXJjZSA9IEZvcm1hdHRlZFRhYlJlc291cmNlO1xyXG5jbGFzcyBUYWJSZXNvdXJjZSB7XHJcbn1cclxuZXhwb3J0cy5UYWJSZXNvdXJjZSA9IFRhYlJlc291cmNlO1xyXG5jbGFzcyBUYWJSZXNvdXJjZXMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pbWFnZVJlc291cmNlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2NyaXB0UmVzb3VyY2VzID0gW107XHJcbiAgICAgICAgdGhpcy5jc3NSZXNvdXJjZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmh0bWxSZXNvdXJjZXMgPSBbXTtcclxuICAgICAgICB0aGlzLm90aGVyUmVzb3VyY2VzID0gW107XHJcbiAgICB9XHJcbiAgICBhZGQoZGV0YWlscykge1xyXG4gICAgICAgIGxldCByZXNvdXJjZUFycmF5O1xyXG4gICAgICAgIGNvbnN0IHVybCA9IGRldGFpbHMudXJsO1xyXG4gICAgICAgIC8vIGZpZ3VyZSBvdXQgd2hpY2ggcmVzb3VyY2UgYXJyYXkgd2UgbmVlZCB0byB1cGRhdGVcclxuICAgICAgICBzd2l0Y2ggKGRldGFpbHMudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdpbWFnZSc6XHJcbiAgICAgICAgICAgICAgICByZXNvdXJjZUFycmF5ID0gdGhpcy5pbWFnZVJlc291cmNlcztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzY3JpcHQnOlxyXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VBcnJheSA9IHRoaXMuc2NyaXB0UmVzb3VyY2VzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0eWxlc2hlZXQnOlxyXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VBcnJheSA9IHRoaXMuY3NzUmVzb3VyY2VzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21haW5fZnJhbWUnOlxyXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VBcnJheSA9IHRoaXMuaHRtbFJlc291cmNlcztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd4bWxodHRwcmVxdWVzdCc6XHJcbiAgICAgICAgICAgICAgICByZXNvdXJjZUFycmF5ID0gdGhpcy5odG1sUmVzb3VyY2VzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N1Yl9mcmFtZSc6XHJcbiAgICAgICAgICAgICAgICByZXNvdXJjZUFycmF5ID0gdGhpcy5odG1sUmVzb3VyY2VzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXNvdXJjZUFycmF5ID0gdGhpcy5vdGhlclJlc291cmNlcztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByZXNvdXJjZSA9IHtcclxuICAgICAgICAgICAgc2l6ZTogMCxcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIGhvc3Q6IHVybC5zcGxpdCgnLycpLnNsaWNlKDAsIDMpLmpvaW4oJy8nKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIGdldCB0aGUgY29udGVudC1sZW5ndGggb2YgdGhlIHJlcXVlc3RcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRldGFpbHMucmVzcG9uc2VIZWFkZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IGRldGFpbHMucmVzcG9uc2VIZWFkZXJzW2ldO1xyXG4gICAgICAgICAgICAvL1RPRE86IHdoYXQgaWYgdGhlcmUgaXMgbm8gY29udGVudCBsZW5ndGggKGkuZS4gY2h1bmtlZCByZXNwb25zZSk/XHJcbiAgICAgICAgICAgIGlmIChoZWFkZXIubmFtZS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC1sZW5ndGgnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlSW50KGhlYWRlci52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlLnNpemUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXNvdXJjZUFycmF5LnB1c2gocmVzb3VyY2UpO1xyXG4gICAgfVxyXG4gICAgZ2V0Rm9ybWF0dGVkSW1hZ2VSZXNvdXJjZSgpIHtcclxuICAgICAgICByZXR1cm4gRm9ybWF0dGVkVGFiUmVzb3VyY2UuY3JlYXRlKHRoaXMuaW1hZ2VSZXNvdXJjZXMsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgZ2V0Rm9ybWF0dGVkU2NyaXB0UmVzb3VyY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIEZvcm1hdHRlZFRhYlJlc291cmNlLmNyZWF0ZSh0aGlzLnNjcmlwdFJlc291cmNlcywgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBnZXRGb3JtYXR0ZWRDc3NSZXNvdXJjZSgpIHtcclxuICAgICAgICByZXR1cm4gRm9ybWF0dGVkVGFiUmVzb3VyY2UuY3JlYXRlKHRoaXMuY3NzUmVzb3VyY2VzLCB0aGlzKTtcclxuICAgIH1cclxuICAgIGdldEZvcm1hdHRlZEh0bWxSZXNvdXJjZSgpIHtcclxuICAgICAgICByZXR1cm4gRm9ybWF0dGVkVGFiUmVzb3VyY2UuY3JlYXRlKHRoaXMuaHRtbFJlc291cmNlcywgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBnZXRGb3JtYXR0ZWRPdGhlclJlc291cmNlKCkge1xyXG4gICAgICAgIHJldHVybiBGb3JtYXR0ZWRUYWJSZXNvdXJjZS5jcmVhdGUodGhpcy5vdGhlclJlc291cmNlcywgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBnZXRUb3RhbFJlc291cmNlc0NvdW50KCkge1xyXG4gICAgICAgIGxldCByZXNvdXJjZXMgPSB0aGlzLmltYWdlUmVzb3VyY2VzO1xyXG4gICAgICAgIHJlc291cmNlcyA9IHJlc291cmNlcy5jb25jYXQodGhpcy5zY3JpcHRSZXNvdXJjZXMpO1xyXG4gICAgICAgIHJlc291cmNlcyA9IHJlc291cmNlcy5jb25jYXQodGhpcy5jc3NSZXNvdXJjZXMpO1xyXG4gICAgICAgIHJlc291cmNlcyA9IHJlc291cmNlcy5jb25jYXQodGhpcy5odG1sUmVzb3VyY2VzKTtcclxuICAgICAgICByZXNvdXJjZXMgPSByZXNvdXJjZXMuY29uY2F0KHRoaXMub3RoZXJSZXNvdXJjZXMpO1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZXMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgZ2V0TWF4Q291bnQoKSB7XHJcbiAgICAgICAgbGV0IG1heExlbmd0aCA9IHRoaXMuaW1hZ2VSZXNvdXJjZXMubGVuZ3RoO1xyXG4gICAgICAgIG1heExlbmd0aCA9IE1hdGgubWF4KHRoaXMuc2NyaXB0UmVzb3VyY2VzLmxlbmd0aCwgbWF4TGVuZ3RoKTtcclxuICAgICAgICBtYXhMZW5ndGggPSBNYXRoLm1heCh0aGlzLmNzc1Jlc291cmNlcy5sZW5ndGgsIG1heExlbmd0aCk7XHJcbiAgICAgICAgbWF4TGVuZ3RoID0gTWF0aC5tYXgodGhpcy5odG1sUmVzb3VyY2VzLmxlbmd0aCwgbWF4TGVuZ3RoKTtcclxuICAgICAgICBtYXhMZW5ndGggPSBNYXRoLm1heCh0aGlzLm90aGVyUmVzb3VyY2VzLmxlbmd0aCwgbWF4TGVuZ3RoKTtcclxuICAgICAgICByZXR1cm4gbWF4TGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgZ2V0TWF4U2l6ZSgpIHtcclxuICAgICAgICBsZXQgbWF4U2l6ZSA9IHRoaXMuZ2V0UmVzb3VyY2VTaXplKHRoaXMuaW1hZ2VSZXNvdXJjZXMpO1xyXG4gICAgICAgIG1heFNpemUgPSBNYXRoLm1heCh0aGlzLmdldFJlc291cmNlU2l6ZSh0aGlzLnNjcmlwdFJlc291cmNlcyksIG1heFNpemUpO1xyXG4gICAgICAgIG1heFNpemUgPSBNYXRoLm1heCh0aGlzLmdldFJlc291cmNlU2l6ZSh0aGlzLmNzc1Jlc291cmNlcyksIG1heFNpemUpO1xyXG4gICAgICAgIG1heFNpemUgPSBNYXRoLm1heCh0aGlzLmdldFJlc291cmNlU2l6ZSh0aGlzLmh0bWxSZXNvdXJjZXMpLCBtYXhTaXplKTtcclxuICAgICAgICBtYXhTaXplID0gTWF0aC5tYXgodGhpcy5nZXRSZXNvdXJjZVNpemUodGhpcy5vdGhlclJlc291cmNlcyksIG1heFNpemUpO1xyXG4gICAgICAgIHJldHVybiBtYXhTaXplO1xyXG4gICAgfVxyXG4gICAgZ2V0VG90YWxTaXplKCkge1xyXG4gICAgICAgIGxldCBzaXplID0gdGhpcy5nZXRSZXNvdXJjZVNpemUodGhpcy5pbWFnZVJlc291cmNlcyk7XHJcbiAgICAgICAgc2l6ZSArPSB0aGlzLmdldFJlc291cmNlU2l6ZSh0aGlzLnNjcmlwdFJlc291cmNlcyk7XHJcbiAgICAgICAgc2l6ZSArPSB0aGlzLmdldFJlc291cmNlU2l6ZSh0aGlzLmNzc1Jlc291cmNlcyk7XHJcbiAgICAgICAgc2l6ZSArPSB0aGlzLmdldFJlc291cmNlU2l6ZSh0aGlzLmh0bWxSZXNvdXJjZXMpO1xyXG4gICAgICAgIHNpemUgKz0gdGhpcy5nZXRSZXNvdXJjZVNpemUodGhpcy5vdGhlclJlc291cmNlcyk7XHJcbiAgICAgICAgcmV0dXJuIHNpemU7XHJcbiAgICB9XHJcbiAgICBnZXRSZXNvdXJjZVNpemUocmVzb3VyY2UpIHtcclxuICAgICAgICBsZXQgc2l6ZSA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNvdXJjZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCByZXNvdXJjZVNpemUgPSByZXNvdXJjZVtpXS5zaXplO1xyXG4gICAgICAgICAgICBpZiAocmVzb3VyY2VTaXplID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNpemUgKz0gcmVzb3VyY2VTaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2l6ZTtcclxuICAgIH1cclxuICAgIGdldEFsbFJlc291cmNlcygpIHtcclxuICAgICAgICBsZXQgcmVzb3VyY2VzID0gdGhpcy5pbWFnZVJlc291cmNlcztcclxuICAgICAgICByZXNvdXJjZXMgPSByZXNvdXJjZXMuY29uY2F0KHRoaXMuc2NyaXB0UmVzb3VyY2VzKTtcclxuICAgICAgICByZXNvdXJjZXMgPSByZXNvdXJjZXMuY29uY2F0KHRoaXMuY3NzUmVzb3VyY2VzKTtcclxuICAgICAgICByZXNvdXJjZXMgPSByZXNvdXJjZXMuY29uY2F0KHRoaXMuaHRtbFJlc291cmNlcyk7XHJcbiAgICAgICAgcmVzb3VyY2VzID0gcmVzb3VyY2VzLmNvbmNhdCh0aGlzLm90aGVyUmVzb3VyY2VzKTtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2VzO1xyXG4gICAgfVxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5pbWFnZVJlc291cmNlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2NyaXB0UmVzb3VyY2VzID0gW107XHJcbiAgICAgICAgdGhpcy5jc3NSZXNvdXJjZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmh0bWxSZXNvdXJjZXMgPSBbXTtcclxuICAgICAgICB0aGlzLm90aGVyUmVzb3VyY2VzID0gW107XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5UYWJSZXNvdXJjZXMgPSBUYWJSZXNvdXJjZXM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVGltaW5nc0NvbGxlY3Rpb24gPSBleHBvcnRzLlRpbWluZ3MgPSBleHBvcnRzLk1pbGxpc2Vjb25kVGltaW5nID0gZXhwb3J0cy5Gb3JtYXR0ZWRUaW1pbmdzID0gdm9pZCAwO1xyXG5jbGFzcyBGb3JtYXR0ZWRUaW1pbmdzIHtcclxuICAgIGNvbnN0cnVjdG9yKGJvdHRsZW5lY2ssIGRucywgY29ubmVjdCwgd2FpdCwgcmVzcG9uc2UpIHtcclxuICAgICAgICB0aGlzLmJvdHRsZW5lY2tzID0gdGhpcy5zb3J0QW5kVGFrZVRvcChib3R0bGVuZWNrKTtcclxuICAgICAgICB0aGlzLmRucyA9IHRoaXMuc29ydEFuZFRha2VUb3AoZG5zKTtcclxuICAgICAgICB0aGlzLmNvbm5lY3QgPSB0aGlzLnNvcnRBbmRUYWtlVG9wKGNvbm5lY3QpO1xyXG4gICAgICAgIHRoaXMud2FpdCA9IHRoaXMuc29ydEFuZFRha2VUb3Aod2FpdCk7XHJcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IHRoaXMuc29ydEFuZFRha2VUb3AocmVzcG9uc2UpO1xyXG4gICAgfVxyXG4gICAgc29ydEFuZFRha2VUb3AodGltaW5ncykge1xyXG4gICAgICAgIGNvbnN0IHRvcCA9IDU7XHJcbiAgICAgICAgZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XHJcbiAgICAgICAgICAgIGlmIChhLm1zIDwgYi5tcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGEubXMgPiBiLm1zKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFycmF5U2xpY2UgPSB0aW1pbmdzLnNvcnQoY29tcGFyZSkuc2xpY2UoMCwgdG9wKTtcclxuICAgICAgICBsZXQgbWF4aW11bU1pbGxpc2Vjb25kcyA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheVNsaWNlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1heGltdW1NaWxsaXNlY29uZHMgPSBNYXRoLm1heChtYXhpbXVtTWlsbGlzZWNvbmRzLCBhcnJheVNsaWNlW2ldLm1zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheVNsaWNlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVNsaWNlW2ldO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5tcyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC53aWR0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbGVtZW50LndpZHRoID0gKGVsZW1lbnQubXMgLyBtYXhpbXVtTWlsbGlzZWNvbmRzKSAqIDEwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5U2xpY2U7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Gb3JtYXR0ZWRUaW1pbmdzID0gRm9ybWF0dGVkVGltaW5ncztcclxuY2xhc3MgTWlsbGlzZWNvbmRUaW1pbmcge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgbXMpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubXMgPSB0aGlzLmZvcm1hdE1pbGxpc2Vjb25kcyhtcyk7XHJcbiAgICB9XHJcbiAgICBmb3JtYXRNaWxsaXNlY29uZHMobXMpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChtcyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5NaWxsaXNlY29uZFRpbWluZyA9IE1pbGxpc2Vjb25kVGltaW5nO1xyXG5jbGFzcyBUaW1pbmdzIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlc291cmNlKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gcmVzb3VyY2UubmFtZTtcclxuICAgICAgICB0aGlzLmRucyA9IHJlc291cmNlLmRvbWFpbkxvb2t1cEVuZCAtIHJlc291cmNlLmRvbWFpbkxvb2t1cFN0YXJ0O1xyXG4gICAgICAgIHRoaXMuY29ubmVjdCA9IHJlc291cmNlLmNvbm5lY3RFbmQgLSByZXNvdXJjZS5jb25uZWN0U3RhcnQ7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHJlc291cmNlLnN0YXJ0VGltZTtcclxuICAgICAgICB0aGlzLmVuZCA9IHJlc291cmNlLnJlc3BvbnNlRW5kO1xyXG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSByZXNvdXJjZS5yZXNwb25zZUVuZCAtIHJlc291cmNlLnN0YXJ0VGltZTtcclxuICAgICAgICB0aGlzLndhaXQgPSByZXNvdXJjZS5yZXNwb25zZVN0YXJ0ID4gMCA/IHJlc291cmNlLnJlc3BvbnNlU3RhcnQgLSByZXNvdXJjZS5zdGFydFRpbWUgOiAwO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVGltaW5ncyA9IFRpbWluZ3M7XHJcbmNsYXNzIFRpbWluZ3NDb2xsZWN0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudGltaW5ncyA9IFtdO1xyXG4gICAgfVxyXG4gICAgYWRkKHJlc291cmNlcywgbG9hZFRpbWUpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCByZXNvdXJjZSA9IHJlc291cmNlc1tpXTtcclxuICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWluZ3MgPSBuZXcgVGltaW5ncyhyZXNvdXJjZSk7XHJcbiAgICAgICAgICAgIC8vIGlmIGFuIGVudHJ5IHdpdGggdGhlIHNhbWUgbmFtZSBhbHJlYWR5IGV4aXN0cywgcmVwbGFjZSBpdFxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGltaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGltaW5nc1tpXS5uYW1lID09PSByZXNvdXJjZS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1pbmdzW2ldID0gdGltaW5ncztcclxuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGZvdW5kKVxyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIHRoaXMudGltaW5ncy5wdXNoKHRpbWluZ3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUJvdHRsZW5lY2tzKHRoaXMudGltaW5ncywgbG9hZFRpbWUpO1xyXG4gICAgfVxyXG4gICAgY2FsY3VsYXRlQm90dGxlbmVja3ModGltaW5ncywgbG9hZFRpbWUpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgdGltaW5nID0gdGltaW5nc1tpXTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQmVmb3JlTG9hZCh0aW1pbmcsIGxvYWRUaW1lKSkge1xyXG4gICAgICAgICAgICAgICAgdGltaW5nLmJvdHRsZW5lY2sgPSAwO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgdGltaW5nU2VjdGlvbnMgPSBbeyBzdGFydDogdGltaW5nLnN0YXJ0LCBlbmQ6IHRpbWluZy5lbmQgfV07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGltaW5ncy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IGopIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyVGltaW5nID0gdGltaW5nc1tqXTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0JlZm9yZUxvYWQob3RoZXJUaW1pbmcsIGxvYWRUaW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVtb3ZlT3ZlcmxhcHModGltaW5nU2VjdGlvbnMsIG90aGVyVGltaW5nLnN0YXJ0LCBvdGhlclRpbWluZy5lbmQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRpbWluZ1NlY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGltaW5nLmJvdHRsZW5lY2sgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGltaW5nLmJvdHRsZW5lY2sgPSB0aGlzLmFkZFNlY3Rpb25zKHRpbWluZ1NlY3Rpb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlzQmVmb3JlTG9hZChyYXdTZWN0aW9uLCBsb2FkVGltZSkge1xyXG4gICAgICAgIHJldHVybiBsb2FkVGltZSA9PSBudWxsIHx8IHJhd1NlY3Rpb24uZW5kIDw9IGxvYWRUaW1lO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlT3ZlcmxhcHModGltaW5nU2VjdGlvbnMsIHN0YXJ0LCBlbmQpIHtcclxuICAgICAgICBjb25zdCB0b0FkZCA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHRvUmVtb3ZlID0gW107XHJcbiAgICAgICAgLy8gYSBib3R0bGVuZWNrIGlzIHRpbWUgdGhhdCBhIGdpdmVuIGhvc3QvcmVxdWVzdCBpcyB0aGUgb25seSBvbmUgb24gdGhlIHdpcmVcclxuICAgICAgICAvLyB0aGlzIGFsZ29yaXRobSB0cmllcyB0byBmaW5kIGEgc2VjdGlvbiB0aGF0IGlzIG5vdCBvdmVybGFwcGVkXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aW1pbmdTZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gdGltaW5nU2VjdGlvbnNbaV07XHJcbiAgICAgICAgICAgIGlmIChzdGFydCA+IHNlY3Rpb24uc3RhcnQgJiYgc3RhcnQgPCBzZWN0aW9uLmVuZCAmJiBlbmQgPiBzZWN0aW9uLmVuZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gc2VjLnN0YXJ0IC0tLS0gc3RhcnQgLS0tLSBzZWMuZW5kIC0tLS0gZW5kXHJcbiAgICAgICAgICAgICAgICBzZWN0aW9uLmVuZCA9IHN0YXJ0OyAvLyBzZWMuc3RhcnQgLS0tLSBzdGFydFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGVuZCA+IHNlY3Rpb24uc3RhcnQgJiYgZW5kIDwgc2VjdGlvbi5lbmQgJiYgc3RhcnQgPCBzZWN0aW9uLnN0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzdGFydCAtLS0tIHNlYy5zdGFydCAtLS0tIGVuZCAtLS0tIHNlYy5lbmRcclxuICAgICAgICAgICAgICAgIHNlY3Rpb24uc3RhcnQgPSBlbmQ7IC8vIGVuZCAtLS0tIHNlYy5lbmRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzdGFydCA+IHNlY3Rpb24uc3RhcnQgJiYgc3RhcnQgPCBzZWN0aW9uLmVuZCAmJiBlbmQgPiBzZWN0aW9uLnN0YXJ0ICYmIGVuZCA8IHNlY3Rpb24uZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzZWMuc3RhcnQgLS0tLSBzdGFydCAtLS0tIGVuZCAtLS0tIHNlYy5lbmRcclxuICAgICAgICAgICAgICAgIHRvQWRkLnB1c2goeyBzdGFydDogZW5kLCBlbmQ6IHNlY3Rpb24uZW5kIH0pOyAvLyBlbmQgLS0tLSBzZWMuZW5kXHJcbiAgICAgICAgICAgICAgICBzZWN0aW9uLmVuZCA9IHN0YXJ0OyAvLyBzZWMuc3RhcnQgLS0tLSBzdGFydFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHN0YXJ0IDwgc2VjdGlvbi5zdGFydCAmJiBlbmQgPiBzZWN0aW9uLmVuZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gc3RhcnQgLS0tLSBzZWMuc3RhcnQgLS0tLSBzZWMuZW5kIC0tLS0gZW5kXHJcbiAgICAgICAgICAgICAgICB0b1JlbW92ZS5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0b1JlbW92ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0b1JlbW92ZS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgdGltaW5nU2VjdGlvbnMuc3BsaWNlKHRvUmVtb3ZlW2ldLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodG9BZGQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aW1pbmdTZWN0aW9ucyA9IHRpbWluZ1NlY3Rpb25zLmNvbmNhdCh0b0FkZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aW1pbmdTZWN0aW9ucy5sZW5ndGggPT09IDA7XHJcbiAgICB9XHJcbiAgICBhZGRTZWN0aW9ucyhzZWN0aW9ucykge1xyXG4gICAgICAgIGxldCB0b3RhbCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0b3RhbCArPSBzZWN0aW9uc1tpXS5lbmQgLSBzZWN0aW9uc1tpXS5zdGFydDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRvdGFsO1xyXG4gICAgfVxyXG4gICAgZ2V0Rm9ybWF0dGVkVGltaW5ncygpIHtcclxuICAgICAgICBjb25zdCBib3R0bGVuZWNrID0gW107XHJcbiAgICAgICAgY29uc3QgZG5zID0gW107XHJcbiAgICAgICAgY29uc3QgY29ubmVjdCA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHdhaXQgPSBbXTtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGhvc3RzID0ge307XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRpbWluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgdGltaW5nRGF0YSA9IHRoaXMudGltaW5nc1tpXTtcclxuICAgICAgICAgICAgY29uc3QgaG9zdCA9IHRpbWluZ0RhdGEubmFtZS5zcGxpdCgnLycpLnNsaWNlKDAsIDMpLmpvaW4oJy8nKTsgLy8gc2hvcnRlbiB1cmxzIHRvIG9ubHkgMyBzZWdtZW50cyBtYXhcclxuICAgICAgICAgICAgbGV0IGhvc3RPYmplY3QgPSBob3N0c1tob3N0XTtcclxuICAgICAgICAgICAgaWYgKGhvc3RPYmplY3QgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaG9zdE9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBkbnM6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdDogMCxcclxuICAgICAgICAgICAgICAgICAgICB3YWl0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdHRsZW5lY2s6IDAsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgaG9zdHNbaG9zdF0gPSBob3N0T2JqZWN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhvc3RPYmplY3QuZG5zICs9IHRpbWluZ0RhdGEuZG5zO1xyXG4gICAgICAgICAgICBob3N0T2JqZWN0LmNvbm5lY3QgKz0gdGltaW5nRGF0YS5jb25uZWN0O1xyXG4gICAgICAgICAgICBob3N0T2JqZWN0LndhaXQgKz0gdGltaW5nRGF0YS53YWl0O1xyXG4gICAgICAgICAgICBob3N0T2JqZWN0LnJlc3BvbnNlICs9IHRpbWluZ0RhdGEucmVzcG9uc2U7XHJcbiAgICAgICAgICAgIGhvc3RPYmplY3QuYm90dGxlbmVjayArPSB0aW1pbmdEYXRhLmJvdHRsZW5lY2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBpbiBob3N0cykge1xyXG4gICAgICAgICAgICBpZiAoIWhvc3RzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBob3N0T2JqZWN0ID0gaG9zdHNbbmFtZV07XHJcbiAgICAgICAgICAgIGJvdHRsZW5lY2sucHVzaChuZXcgTWlsbGlzZWNvbmRUaW1pbmcobmFtZSwgaG9zdE9iamVjdC5ib3R0bGVuZWNrKSk7XHJcbiAgICAgICAgICAgIGRucy5wdXNoKG5ldyBNaWxsaXNlY29uZFRpbWluZyhuYW1lLCBob3N0T2JqZWN0LmRucykpO1xyXG4gICAgICAgICAgICBjb25uZWN0LnB1c2gobmV3IE1pbGxpc2Vjb25kVGltaW5nKG5hbWUsIGhvc3RPYmplY3QuY29ubmVjdCkpO1xyXG4gICAgICAgICAgICB3YWl0LnB1c2gobmV3IE1pbGxpc2Vjb25kVGltaW5nKG5hbWUsIGhvc3RPYmplY3Qud2FpdCkpO1xyXG4gICAgICAgICAgICByZXNwb25zZS5wdXNoKG5ldyBNaWxsaXNlY29uZFRpbWluZyhuYW1lLCBob3N0T2JqZWN0LnJlc3BvbnNlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgRm9ybWF0dGVkVGltaW5ncyhib3R0bGVuZWNrLCBkbnMsIGNvbm5lY3QsIHdhaXQsIHJlc3BvbnNlKTtcclxuICAgIH1cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMudGltaW5ncyA9IFtdO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVGltaW5nc0NvbGxlY3Rpb24gPSBUaW1pbmdzQ29sbGVjdGlvbjtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==