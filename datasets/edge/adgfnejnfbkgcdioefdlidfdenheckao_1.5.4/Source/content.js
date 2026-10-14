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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/content.ts":
/*!************************!*\
  !*** ./src/content.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __webpack_require__(/*! ./helpers/Constants */ "./src/helpers/Constants.ts");
const UserData_1 = __webpack_require__(/*! ./helpers/UserData */ "./src/helpers/UserData.ts");
('use strict');
const errors = [];
chrome.runtime.sendMessage({ name: 'webpage_error', data: [] });
chrome.runtime.sendMessage({ name: 'clean_cache' });
function getResources() {
    const initiatorTypes = ['img', 'iframe', 'css', 'script', 'subdocument'];
    const requests = window.performance.getEntriesByType('resource');
    for (const request of requests) {
        if (initiatorTypes.indexOf(request.initiatorType) > -1) {
            chrome.runtime.sendMessage({
                name: Constants_1.default.visualsLoadedTimeMessage,
                data: Math.round(request.responseEnd),
            });
        }
    }
}
function measureResources() {
    if (performance.timing.loadEventEnd <= 0) {
        return;
    }
    chrome.runtime.sendMessage({
        name: Constants_1.default.timingsMessage,
        data: performance.getEntriesByType('resource'),
    });
}
function initialize() {
    // adding a delay is important, otherwise we won't be able to gather any metrics
    setTimeout(() => {
        if (window === top) {
            const delay = 2000;
            // this is needed to make sure we capture all resources
            setTimeout(() => {
                getResources();
            }, delay);
        }
        const load = performance.timing.loadEventEnd - performance.timing.navigationStart;
        chrome.runtime.sendMessage({
            name: Constants_1.default.loadTimeMessage,
            data: load,
        });
        measureResources();
    }, 1);
    chrome.storage.local.get(Constants_1.default.userDataKey, (data) => {
        const url = window.location.hostname;
        const userData = data[Constants_1.default.userDataKey];
        // we want to inject rum.js once per page, not in iframes
        const isIframe = window.self !== window.top;
        if (!userData || !userData.Entities || isIframe) {
            return;
        }
        const entity = UserData_1.default.getEntity(userData, url);
        if (entity) {
            var iframe = document.createElement("iframe");
            iframe.src = "about:blank";
            iframe.setAttribute('data-source', Constants_1.default.catchpointUserExperience);
            iframe.setAttribute('id', 'cue-iframe');
            var style = iframe.style;
            style.position = "absolute";
            style.top = "-10000px";
            style.left = "-1000px";
            iframe.addEventListener('load', function (event) {
                var frame = event.currentTarget;
                var iframeDocument = frame.contentDocument;
                if (iframeDocument) {
                    var rumScript = iframeDocument.createElement('script');
                    rumScript.type = 'text/javascript';
                    rumScript.src = chrome.runtime.getURL('rum.js');
                    rumScript.setAttribute('data-source', Constants_1.default.catchpointUserExperience);
                    rumScript.setAttribute('sonarUniqueId', userData.UniqueId.toString());
                    rumScript.setAttribute('rumUrl', userData.RumUrl.toString());
                    rumScript.setAttribute('sonarSiteId', entity.site_id.toString());
                    iframeDocument.body.appendChild(rumScript);
                }
            });
            if (document.body) {
                document.body.insertAdjacentElement('afterbegin', iframe);
            }
        }
    });
}
function codeToInject() {
    window.addEventListener('unhandledrejection', function (_) {
        window.postMessage({
            id: 'webpage_error',
            type: 'script',
            url: window.location.href,
            data: {
                type: 'script',
            },
        }, '*');
    });
    window.console.error = function (...args) {
        const argsArray = [];
        for (const i in args) {
            argsArray.push(args[i]);
        }
        window.postMessage({
            id: 'webpage_error',
            type: 'script',
            url: window.location.href,
            data: {
                type: 'script',
            },
        }, '*');
    };
    window.addEventListener('error', function (e) {
        if (e.message && e.message.search('404') !== -1) {
            window.postMessage({
                id: 'webpage_error',
                type: 'script',
                url: e.filename === '' ? window.location.href : e.filename,
                data: {
                    type: 'script',
                },
            }, '*');
        }
        else {
            window.postMessage({
                id: 'webpage_error',
                type: 'script',
                url: e.filename === '' ? window.location.href : e.filename,
                data: {
                    type: 'script',
                },
            }, '*');
        }
    });
}
// REMOVING CODE INJECTION BC A BUG AT EBAY'S PAGE
// injecting code
// var script = document.createElement('script');
// script.textContent = '(' + codeToInject + '())';
// (document.head || document.documentElement).appendChild(script);
// script.parentNode.removeChild(script);
performance.setResourceTimingBufferSize(300);
if (document.readyState === 'complete') {
    initialize();
    const array = window.location.href.split('#');
    if (array[array.length - 1] === 'report') {
        const element = document.querySelectorAll('.ant-btn.report-issue-size-button')[0];
        element.click();
    }
}
else {
    window.addEventListener('load', () => {
        initialize();
        const array = window.location.href.split('#');
        if (array[array.length - 1] === 'report') {
            const element = document.querySelectorAll('.ant-btn.report-issue-size-button')[0];
            element.click();
        }
    });
}
window.addEventListener(Constants_1.default.rumRequestSentEvent, (e) => {
    chrome.runtime.sendMessage({
        name: Constants_1.default.rumRequestSentEvent,
        data: e.detail,
    });
});
window.addEventListener('message', (event) => {
    if (event.data.id === 'webpage_error') {
        errors.push(JSON.stringify({ type: event.data.type, url: event.data.url }));
        chrome.runtime.sendMessage({ name: 'webpage_error', data: errors });
    }
});
chrome.runtime.onMessage.addListener((name, _) => {
    if (name === Constants_1.default.resourcesMessage) {
        measureResources();
    }
});


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

/***/ "./src/helpers/UserData.ts":
/*!*********************************!*\
  !*** ./src/helpers/UserData.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UserData {
    static getEntity(userData, url) {
        for (let i = 0; i < userData.Entities.length; i++) {
            const entity = userData.Entities[i];
            const re = new RegExp(entity.host, 'i');
            if (re.exec(url)) {
                return entity;
            }
        }
        return null;
    }
}
exports.default = UserData;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL1VzZXJEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7O1FBRUE7UUFDQTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbkVhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsb0JBQW9CLG1CQUFPLENBQUMsdURBQXFCO0FBQ2pELG1CQUFtQixtQkFBTyxDQUFDLHFEQUFvQjtBQUMvQztBQUNBO0FBQ0EsNEJBQTRCLGtDQUFrQztBQUM5RCw0QkFBNEIsc0JBQXNCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBLG9DQUFvQyw2Q0FBNkM7QUFDakYsb0NBQW9DLHNDQUFzQztBQUMxRTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUM3S1k7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDckJhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBLHVCQUF1Qiw4QkFBOEI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb250ZW50LnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgQ29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL0NvbnN0YW50c1wiKTtcclxuY29uc3QgVXNlckRhdGFfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvVXNlckRhdGFcIik7XHJcbigndXNlIHN0cmljdCcpO1xyXG5jb25zdCBlcnJvcnMgPSBbXTtcclxuY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBuYW1lOiAnd2VicGFnZV9lcnJvcicsIGRhdGE6IFtdIH0pO1xyXG5jaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IG5hbWU6ICdjbGVhbl9jYWNoZScgfSk7XHJcbmZ1bmN0aW9uIGdldFJlc291cmNlcygpIHtcclxuICAgIGNvbnN0IGluaXRpYXRvclR5cGVzID0gWydpbWcnLCAnaWZyYW1lJywgJ2NzcycsICdzY3JpcHQnLCAnc3ViZG9jdW1lbnQnXTtcclxuICAgIGNvbnN0IHJlcXVlc3RzID0gd2luZG93LnBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoJ3Jlc291cmNlJyk7XHJcbiAgICBmb3IgKGNvbnN0IHJlcXVlc3Qgb2YgcmVxdWVzdHMpIHtcclxuICAgICAgICBpZiAoaW5pdGlhdG9yVHlwZXMuaW5kZXhPZihyZXF1ZXN0LmluaXRpYXRvclR5cGUpID4gLTEpIHtcclxuICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogQ29uc3RhbnRzXzEuZGVmYXVsdC52aXN1YWxzTG9hZGVkVGltZU1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBNYXRoLnJvdW5kKHJlcXVlc3QucmVzcG9uc2VFbmQpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gbWVhc3VyZVJlc291cmNlcygpIHtcclxuICAgIGlmIChwZXJmb3JtYW5jZS50aW1pbmcubG9hZEV2ZW50RW5kIDw9IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgbmFtZTogQ29uc3RhbnRzXzEuZGVmYXVsdC50aW1pbmdzTWVzc2FnZSxcclxuICAgICAgICBkYXRhOiBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKCdyZXNvdXJjZScpLFxyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuICAgIC8vIGFkZGluZyBhIGRlbGF5IGlzIGltcG9ydGFudCwgb3RoZXJ3aXNlIHdlIHdvbid0IGJlIGFibGUgdG8gZ2F0aGVyIGFueSBtZXRyaWNzXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpZiAod2luZG93ID09PSB0b3ApIHtcclxuICAgICAgICAgICAgY29uc3QgZGVsYXkgPSAyMDAwO1xyXG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5lZWRlZCB0byBtYWtlIHN1cmUgd2UgY2FwdHVyZSBhbGwgcmVzb3VyY2VzXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2V0UmVzb3VyY2VzKCk7XHJcbiAgICAgICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbG9hZCA9IHBlcmZvcm1hbmNlLnRpbWluZy5sb2FkRXZlbnRFbmQgLSBwZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0O1xyXG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICAgICAgbmFtZTogQ29uc3RhbnRzXzEuZGVmYXVsdC5sb2FkVGltZU1lc3NhZ2UsXHJcbiAgICAgICAgICAgIGRhdGE6IGxvYWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWVhc3VyZVJlc291cmNlcygpO1xyXG4gICAgfSwgMSk7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoQ29uc3RhbnRzXzEuZGVmYXVsdC51c2VyRGF0YUtleSwgKGRhdGEpID0+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XHJcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSBkYXRhW0NvbnN0YW50c18xLmRlZmF1bHQudXNlckRhdGFLZXldO1xyXG4gICAgICAgIC8vIHdlIHdhbnQgdG8gaW5qZWN0IHJ1bS5qcyBvbmNlIHBlciBwYWdlLCBub3QgaW4gaWZyYW1lc1xyXG4gICAgICAgIGNvbnN0IGlzSWZyYW1lID0gd2luZG93LnNlbGYgIT09IHdpbmRvdy50b3A7XHJcbiAgICAgICAgaWYgKCF1c2VyRGF0YSB8fCAhdXNlckRhdGEuRW50aXRpZXMgfHwgaXNJZnJhbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBlbnRpdHkgPSBVc2VyRGF0YV8xLmRlZmF1bHQuZ2V0RW50aXR5KHVzZXJEYXRhLCB1cmwpO1xyXG4gICAgICAgIGlmIChlbnRpdHkpIHtcclxuICAgICAgICAgICAgdmFyIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XHJcbiAgICAgICAgICAgIGlmcmFtZS5zcmMgPSBcImFib3V0OmJsYW5rXCI7XHJcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtc291cmNlJywgQ29uc3RhbnRzXzEuZGVmYXVsdC5jYXRjaHBvaW50VXNlckV4cGVyaWVuY2UpO1xyXG4gICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdpZCcsICdjdWUtaWZyYW1lJyk7XHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IGlmcmFtZS5zdHlsZTtcclxuICAgICAgICAgICAgc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgICAgIHN0eWxlLnRvcCA9IFwiLTEwMDAwcHhcIjtcclxuICAgICAgICAgICAgc3R5bGUubGVmdCA9IFwiLTEwMDBweFwiO1xyXG4gICAgICAgICAgICBpZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZyYW1lID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICAgICAgICAgIHZhciBpZnJhbWVEb2N1bWVudCA9IGZyYW1lLmNvbnRlbnREb2N1bWVudDtcclxuICAgICAgICAgICAgICAgIGlmIChpZnJhbWVEb2N1bWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBydW1TY3JpcHQgPSBpZnJhbWVEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICAgICAgICAgICAgICBydW1TY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bVNjcmlwdC5zcmMgPSBjaHJvbWUucnVudGltZS5nZXRVUkwoJ3J1bS5qcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bVNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc291cmNlJywgQ29uc3RhbnRzXzEuZGVmYXVsdC5jYXRjaHBvaW50VXNlckV4cGVyaWVuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bVNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3NvbmFyVW5pcXVlSWQnLCB1c2VyRGF0YS5VbmlxdWVJZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBydW1TY3JpcHQuc2V0QXR0cmlidXRlKCdydW1VcmwnLCB1c2VyRGF0YS5SdW1VcmwudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVtU2NyaXB0LnNldEF0dHJpYnV0ZSgnc29uYXJTaXRlSWQnLCBlbnRpdHkuc2l0ZV9pZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZnJhbWVEb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJ1bVNjcmlwdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCBpZnJhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gY29kZVRvSW5qZWN0KCkge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VuaGFuZGxlZHJlamVjdGlvbicsIGZ1bmN0aW9uIChfKSB7XHJcbiAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgaWQ6ICd3ZWJwYWdlX2Vycm9yJyxcclxuICAgICAgICAgICAgdHlwZTogJ3NjcmlwdCcsXHJcbiAgICAgICAgICAgIHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdzY3JpcHQnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sICcqJyk7XHJcbiAgICB9KTtcclxuICAgIHdpbmRvdy5jb25zb2xlLmVycm9yID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgICBjb25zdCBhcmdzQXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gYXJncykge1xyXG4gICAgICAgICAgICBhcmdzQXJyYXkucHVzaChhcmdzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgaWQ6ICd3ZWJwYWdlX2Vycm9yJyxcclxuICAgICAgICAgICAgdHlwZTogJ3NjcmlwdCcsXHJcbiAgICAgICAgICAgIHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdzY3JpcHQnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sICcqJyk7XHJcbiAgICB9O1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoZS5tZXNzYWdlICYmIGUubWVzc2FnZS5zZWFyY2goJzQwNCcpICE9PSAtMSkge1xyXG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgaWQ6ICd3ZWJwYWdlX2Vycm9yJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdzY3JpcHQnLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBlLmZpbGVuYW1lID09PSAnJyA/IHdpbmRvdy5sb2NhdGlvbi5ocmVmIDogZS5maWxlbmFtZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc2NyaXB0JyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sICcqJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgaWQ6ICd3ZWJwYWdlX2Vycm9yJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdzY3JpcHQnLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBlLmZpbGVuYW1lID09PSAnJyA/IHdpbmRvdy5sb2NhdGlvbi5ocmVmIDogZS5maWxlbmFtZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc2NyaXB0JyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sICcqJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuLy8gUkVNT1ZJTkcgQ09ERSBJTkpFQ1RJT04gQkMgQSBCVUcgQVQgRUJBWSdTIFBBR0VcclxuLy8gaW5qZWN0aW5nIGNvZGVcclxuLy8gdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4vLyBzY3JpcHQudGV4dENvbnRlbnQgPSAnKCcgKyBjb2RlVG9JbmplY3QgKyAnKCkpJztcclxuLy8gKGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4vLyBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xyXG5wZXJmb3JtYW5jZS5zZXRSZXNvdXJjZVRpbWluZ0J1ZmZlclNpemUoMzAwKTtcclxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcclxuICAgIGluaXRpYWxpemUoKTtcclxuICAgIGNvbnN0IGFycmF5ID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKTtcclxuICAgIGlmIChhcnJheVthcnJheS5sZW5ndGggLSAxXSA9PT0gJ3JlcG9ydCcpIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFudC1idG4ucmVwb3J0LWlzc3VlLXNpemUtYnV0dG9uJylbMF07XHJcbiAgICAgICAgZWxlbWVudC5jbGljaygpO1xyXG4gICAgfVxyXG59XHJcbmVsc2Uge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIGNvbnN0IGFycmF5ID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKTtcclxuICAgICAgICBpZiAoYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV0gPT09ICdyZXBvcnQnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYW50LWJ0bi5yZXBvcnQtaXNzdWUtc2l6ZS1idXR0b24nKVswXTtcclxuICAgICAgICAgICAgZWxlbWVudC5jbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKENvbnN0YW50c18xLmRlZmF1bHQucnVtUmVxdWVzdFNlbnRFdmVudCwgKGUpID0+IHtcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICBuYW1lOiBDb25zdGFudHNfMS5kZWZhdWx0LnJ1bVJlcXVlc3RTZW50RXZlbnQsXHJcbiAgICAgICAgZGF0YTogZS5kZXRhaWwsXHJcbiAgICB9KTtcclxufSk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoZXZlbnQuZGF0YS5pZCA9PT0gJ3dlYnBhZ2VfZXJyb3InKSB7XHJcbiAgICAgICAgZXJyb3JzLnB1c2goSlNPTi5zdHJpbmdpZnkoeyB0eXBlOiBldmVudC5kYXRhLnR5cGUsIHVybDogZXZlbnQuZGF0YS51cmwgfSkpO1xyXG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgbmFtZTogJ3dlYnBhZ2VfZXJyb3InLCBkYXRhOiBlcnJvcnMgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG5hbWUsIF8pID0+IHtcclxuICAgIGlmIChuYW1lID09PSBDb25zdGFudHNfMS5kZWZhdWx0LnJlc291cmNlc01lc3NhZ2UpIHtcclxuICAgICAgICBtZWFzdXJlUmVzb3VyY2VzKCk7XHJcbiAgICB9XHJcbn0pO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jbGFzcyBDb25zdGFudHMge1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IENvbnN0YW50cztcclxuQ29uc3RhbnRzLnRhYlByZWZpeCA9ICd0YWJfJztcclxuQ29uc3RhbnRzLnJlZnJlc2hQcmVmaXggPSAncmVmcmVzaF8nO1xyXG5Db25zdGFudHMucmVzb3VyY2VzTWVzc2FnZSA9ICdyZXNvdXJjZXMnO1xyXG5Db25zdGFudHMubG9hZFRpbWVNZXNzYWdlID0gJ2xvYWRUaW1lJztcclxuQ29uc3RhbnRzLmVycm9yQ291bnRNZXNzYWdlID0gJ2Vycm9yQ291bnQnO1xyXG5Db25zdGFudHMudGltaW5nc01lc3NhZ2UgPSAndGltaW5ncyc7XHJcbkNvbnN0YW50cy52aXN1YWxzTG9hZGVkVGltZU1lc3NhZ2UgPSAndmlzdWFsc0xvYWRlZFRpbWUnO1xyXG5Db25zdGFudHMuZGF0YUtleSA9ICdkYXRhJztcclxuQ29uc3RhbnRzLnVzZXJEYXRhS2V5ID0gJ3VzZXJEYXRhJztcclxuQ29uc3RhbnRzLnJ1bVJlcXVlc3RTZW50RXZlbnQgPSAncnVtUmVxdWVzdFNlbnQnO1xyXG5Db25zdGFudHMuY2F0Y2hwb2ludFVybCA9ICdodHRwOi8vd3d3LmNhdGNocG9pbnQuY29tLyc7XHJcbkNvbnN0YW50cy5pc0FkdmFuY2VkTW9kZUtleSA9ICdpc0FkdmFuY2VkTW9kZSc7XHJcbkNvbnN0YW50cy5zb25hckJhY2tlbmRBcHBsaWNhdGlvbiA9ICdjb20uY2F0Y2hwb2ludC5zb25hcmJhY2tlbmQnO1xyXG5Db25zdGFudHMuZmFpbHMgPSAnd2VicGFnZV9lcnJvcic7XHJcbkNvbnN0YW50cy5jYXRjaHBvaW50TW9uaXRvcmluZ1VybCA9ICdodHRwczovL3d3dy5jYXRjaHBvaW50LmNvbS9lbmRwb2ludC1tb25pdG9yaW5nJztcclxuQ29uc3RhbnRzLmNsZWFuQ2FjaGUgPSAnY2xlYW5fY2FjaGUnO1xyXG5Db25zdGFudHMuY2F0Y2hwb2ludFVzZXJFeHBlcmllbmNlID0gJ0NhdGNocG9pbnQgVXNlciBFeHBlcmllbmNlJztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY2xhc3MgVXNlckRhdGEge1xyXG4gICAgc3RhdGljIGdldEVudGl0eSh1c2VyRGF0YSwgdXJsKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1c2VyRGF0YS5FbnRpdGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBlbnRpdHkgPSB1c2VyRGF0YS5FbnRpdGllc1tpXTtcclxuICAgICAgICAgICAgY29uc3QgcmUgPSBuZXcgUmVnRXhwKGVudGl0eS5ob3N0LCAnaScpO1xyXG4gICAgICAgICAgICBpZiAocmUuZXhlYyh1cmwpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZW50aXR5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFVzZXJEYXRhO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9