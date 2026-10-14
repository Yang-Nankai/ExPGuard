var lib;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 880:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const MAXSIZE = 8000;
function getByteSize(data) {
    return JSON.stringify(data).length;
}
function trimByteSize(data) {
    var copy = data.slice(0);
    var bytesize = getByteSize(copy);
    while (bytesize > MAXSIZE) {
        var item = copy[copy.length - 1];
        bytesize -= getByteSize(item) + 1;
        copy.splice(copy.length - 1, 1);
    }
    return copy;
}
function writeSortedArrayLossy(data, cb) {
    var value = undefined;
    Object.keys(data).forEach(function (key) {
        if (Array.isArray(data[key]) == false) {
            throw new Error("The data given to writeSortedArrayLossy was not of type array.");
        }
        else {
            var wrappeddata = {};
            wrappeddata[key] = {
                ts: new Date().getTime(),
                data: data[key]
            };
            chrome.storage.local.set(wrappeddata, function () {
                wrappeddata[key].data = trimByteSize(wrappeddata[key].data);
                chrome.storage.sync.set(wrappeddata, function () {
                    if (cb)
                        cb();
                });
            });
        }
    });
}
exports.writeSortedArrayLossy = writeSortedArrayLossy;
function readSortedArrayLossy(keys, cb) {
    var response = {};
    chrome.storage.local.get(keys, function (packedLocalData) {
        chrome.storage.sync.get(keys, function (packedSyncData) {
            if (keys.length > 0 &&
                keys.every(function (key) {
                    return (packedLocalData.hasOwnProperty(key) &&
                        packedSyncData.hasOwnProperty(key));
                })) {
                keys.forEach(function (key) {
                    var localData = packedLocalData[key];
                    var syncData = packedSyncData[key];
                    var localRawData = (localData && localData.data) ? localData.data : undefined;
                    var localTs = (localData && localData.ts) ? localData.ts : 0;
                    var syncTs = (syncData && syncData.ts) ? syncData.ts : 0;
                    if (syncData && syncTs > localTs) {
                        response[key] = syncData.data;
                    }
                    else {
                        response[key] = localData.data;
                    }
                });
                cb(response);
            }
            else {
                cb(new Error("The data being requested does not exist.\nData: " + JSON.stringify(keys)));
            }
        });
    });
}
exports.readSortedArrayLossy = readSortedArrayLossy;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
function fromEntries(arrayOfProperties) {
    var object = {};
    arrayOfProperties.forEach(function (element) {
        Object.keys(element).forEach(function (key) {
            object[key] = element[key];
        });
    });
    return object;
}
exports.fromEntries = fromEntries;
function entries(Input) {
    var array = [];
    Object.keys(Input).forEach(function (key) {
        var object = {};
        object[key] = Input[key];
        array.push(object);
    });
    return array;
}
exports.entries = entries;
class Context {
    constructor(data) {
        var self = this;
        self.value = data;
    }
    then(Function) {
        var self = this;
        self.value = Function(self.value);
        return self;
    }
}
Promise.prototype._then = async function (Function) {
    var self = this;
    self.context.then(await Function);
    var promise = new Promise(function (resolve) {
        resolve(self.context.value);
    });
    promise.context = self.context;
    return promise;
};
Promise.prototype._from = async function (data) {
    var self = this;
    Promise.prototype.context = new Context(data);
    return self._then(self._do);
};
async function first(_Function) {
    var promise = new Promise(function (resolve) {
        resolve();
    });
    Promise.prototype._do = _Function;
    return promise;
}
exports.first = first;
function getEl(Input) {
    return document.querySelector(Input);
}
exports.getEl = getEl;
function regexpEscape(input) {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
exports.regexpEscape = regexpEscape;
const _syncdata = __webpack_require__(880);
exports.syncdata = {
    get: _syncdata.readSortedArrayLossy,
    set: _syncdata.writeSortedArrayLossy
};

})();

lib = __webpack_exports__;
/******/ })()
;