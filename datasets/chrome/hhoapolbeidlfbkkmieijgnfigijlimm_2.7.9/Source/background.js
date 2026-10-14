/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9038:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./abema/abema.json": 6310,
	"./amazon/amazon.json": 9423,
	"./coupangplay/coupangplay.json": 9011,
	"./danet/danet.json": 6480,
	"./disneyplus/disneyplus.json": 1492,
	"./dorama/dorama.json": 5781,
	"./gamer/gamer.json": 3599,
	"./hbogo/hbogo.json": 2354,
	"./hotstar/hotstar.json": 3979,
	"./iq/iq.json": 4234,
	"./kktv/kktv.json": 6785,
	"./laftel/laftel.json": 1816,
	"./linetv/linetv.json": 5943,
	"./m-78/m-78.json": 7825,
	"./mubi/mubi.json": 1713,
	"./netflix/netflix.json": 1187,
	"./paramountplus/paramountplus.json": 4122,
	"./pops/pops.json": 224,
	"./serieson/serieson.json": 5284,
	"./tokusatsu-fc/tokusatsu-fc.json": 7893,
	"./tver/tver.json": 9144,
	"./tving/tving.json": 9324,
	"./twitch/twitch.json": 9836,
	"./unext/unext.json": 9406,
	"./vidio/vidio.json": 4946,
	"./vimeo/vimeo.json": 513,
	"./viu/viu.json": 4192,
	"./watcha/watcha.json": 3752,
	"./wavve/wavve.json": 1747,
	"./wetv/wetv.json": 8348,
	"./youtube/youtube.json": 6605,
	"./zee5/zee5.json": 4989
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 9038;

/***/ }),

/***/ 6310:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"abema","serviceName":"AbemaTV","shortcode":"ab","url":"https://abema.tv/","origins":["https://abema.tv/"],"contentScripts":[{"id":"abema-content","matches":["https://abema.tv/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/abema/abema-inject.js"]}');

/***/ }),

/***/ 9423:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"amazon","serviceName":"Amazon Prime Video","shortcode":"am","url":"https://www.amazon.co.jp/Amazon-Video/b?ie=UTF8&node=2351649051","origins":["https://www.amazon.co.jp/"],"contentScripts":[{"id":"amazon-content","matches":["https://www.amazon.co.jp/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/amazon/amazon-inject.js"]}');

/***/ }),

/***/ 9011:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"coupangplay","serviceName":"coupang play","shortcode":"co","url":"https://www.coupangplay.com/","origins":["https://www.coupangplay.com/"],"contentScripts":[{"id":"coupangplay-content","matches":["https://www.coupangplay.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/coupangplay/coupangplay-inject.js"]}');

/***/ }),

/***/ 6480:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"danet","serviceName":"DANET","shortcode":"da","url":"https://danet.vn/","origins":["https://danet.vn/"],"contentScripts":[{"id":"danet-content","matches":["https://danet.vn/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/danet/danet-inject.js"]}');

/***/ }),

/***/ 1492:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"disneyplus","serviceName":"Disney+","shortcode":"di","url":"https://www.disneyplus.com/","origins":["https://www.disneyplus.com/"],"contentScripts":[{"id":"disneyplus-content","matches":["https://www.disneyplus.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/disneyplus/disneyplus-inject.js"]}');

/***/ }),

/***/ 5781:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"dorama","serviceName":"dorama korea","shortcode":"do","url":"https://www.dorama.kr/","origins":["https://www.dorama.kr/"],"contentScripts":[{"id":"dorama-content","matches":["https://www.dorama.kr/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/dorama/dorama-inject.js"]}');

/***/ }),

/***/ 3599:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"gamer","serviceName":"動畫瘋","shortcode":"ga","url":"https://ani.gamer.com.tw/","origins":["https://ani.gamer.com.tw/"],"contentScripts":[{"id":"gamer-content","matches":["https://ani.gamer.com.tw/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/gamer/gamer-inject.js"]}');

/***/ }),

/***/ 2354:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"hbogo","serviceName":"HBO GO","shortcode":"hb","url":"https://www.hbogo.co.th/","origins":["https://www.hbogo.co.th/"],"contentScripts":[{"id":"hbogo-content","matches":["https://www.hbogo.co.th/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/hbogo/hbogo-inject.js"]}');

/***/ }),

/***/ 3979:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"hotstar","serviceName":"Disney+ hotstar","shortcode":"ho","url":"https://www.hotstar.com/","origins":["https://www.hotstar.com/"],"contentScripts":[{"id":"hotstar-content","matches":["https://www.hotstar.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/hotstar/hotstar-inject.js"]}');

/***/ }),

/***/ 4234:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"iq","serviceName":"iQIYI","shortcode":"iq","url":"https://www.iq.com/","origins":["https://www.iq.com/"],"contentScripts":[{"id":"iq-content","matches":["https://www.iq.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/iq/iq-inject.js"]}');

/***/ }),

/***/ 6785:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"kktv","serviceName":"KKTV","shortcode":"kk","url":"https://www.kktv.me/","origins":["https://kktv.me/","https://www.kktv.me/"],"contentScripts":[{"id":"kktv-content","matches":["https://www.kktv.me/*","https://kktv.me/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/kktv/kktv-inject.js"]}');

/***/ }),

/***/ 1816:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"laftel","serviceName":"LAFTEL","shortcode":"la","url":"https://laftel.net/","origins":["https://laftel.net/","https://www.laftel.net/"],"contentScripts":[{"id":"laftel-content","matches":["https://laftel.net/*","https://www.laftel.net/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/laftel/laftel-inject.js"]}');

/***/ }),

/***/ 5943:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"linetv","serviceName":"LineTV","shortcode":"li","url":"https://www.linetv.tw","origins":["https://www.linetv.tw/","https://access.line.me/"],"contentScripts":[{"id":"linetv-content","matches":["https://www.linetv.tw/*","https://access.line.me/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/linetv/linetv-inject.js"]}');

/***/ }),

/***/ 7825:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"m-78","serviceName":"TSUBURAYA IMAGINATION","shortcode":"m-","url":"https://imagination.m-78.jp/","origins":["https://imagination.m-78.jp/","https://account.m-78.jp/"],"contentScripts":[{"id":"m-78-content","matches":["https://imagination.m-78.jp/*","https://account.m-78.jp/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/m-78/m-78-inject.js"]}');

/***/ }),

/***/ 1713:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"mubi","serviceName":"MUBI","shortcode":"mu","url":"https://mubi.com/","origins":["https://mubi.com/","https://www.mubi.com/"],"contentScripts":[{"id":"mubi-content","matches":["https://mubi.com/*","https://www.mubi.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/mubi/mubi-inject.js"]}');

/***/ }),

/***/ 1187:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"netflix","serviceName":"NETFLIX","shortcode":"ne","url":"https://www.netflix.com/","origins":["https://www.netflix.com/"],"contentScripts":[{"id":"netflix-content","matches":["https://www.netflix.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/netflix/netflix-inject.js"]}');

/***/ }),

/***/ 4122:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"paramountplus","serviceName":"Paramount+","shortcode":"pa","url":"https://www.paramountplus.com/","origins":["https://www.paramountplus.com/"],"contentScripts":[{"id":"paramountplus-content","matches":["https://www.paramountplus.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/paramountplus/paramountplus-inject.js"]}');

/***/ }),

/***/ 224:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"pops","serviceName":"pops","shortcode":"po","url":"https://pops.tv/","origins":["https://pops.tv/"],"contentScripts":[{"id":"pops-content","matches":["https://pops.tv/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/pops/pops-inject.js"]}');

/***/ }),

/***/ 5284:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"serieson","serviceName":"SERIES ON","shortcode":"se","url":"https://serieson.naver.com/","origins":["https://serieson.naver.com/"],"contentScripts":[{"id":"serieson-content","matches":["https://serieson.naver.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/serieson/serieson-inject.js"]}');

/***/ }),

/***/ 7893:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"tokusatsu-fc","serviceName":"東映特撮ファンクラブ","shortcode":"to","url":"https://tokusatsu-fc.jp/","origins":["https://tokusatsu-fc.jp/","https://pc.tokusatsu-fc.jp/","https://account.bandainamcoid.com/"],"contentScripts":[{"id":"tokusatsu-fc-content","matches":["https://tokusatsu-fc.jp/*","https://pc.tokusatsu-fc.jp/*","https://account.bandainamcoid.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/tokusatsu-fc/tokusatsu-fc-inject.js"]}');

/***/ }),

/***/ 9144:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"tver","serviceName":"TVer","shortcode":"tV","url":"https://tver.jp/","origins":["https://tver.jp/","https://www.tver.jp/"],"contentScripts":[{"id":"tver-content","matches":["https://tver.jp/*","https://www.tver.jp/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/tver/tver-inject.js"]}');

/***/ }),

/***/ 9324:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"tving","serviceName":"TVING","shortcode":"tv","url":"https://www.tving.com/","origins":["https://www.tving.com/"],"contentScripts":[{"id":"tving-content","matches":["https://www.tving.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/tving/tving-inject.js"]}');

/***/ }),

/***/ 9836:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"twitch","serviceName":"Twitch","shortcode":"tw","url":"https://www.twitch.tv/","origins":["https://www.twitch.tv/"],"contentScripts":[{"id":"twitch-content","matches":["https://www.twitch.tv/*"],"js":["ott/twitch/twitch-content.js"]}],"injectScripts":["ott/twitch/twitch-inject.js"]}');

/***/ }),

/***/ 9406:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"unext","serviceName":"U-NEXT","shortcode":"un","url":"https://video.unext.jp/","origins":["https://video.unext.jp/","https://www.video.unext.jp/"],"contentScripts":[{"id":"unext-content","matches":["https://video.unext.jp/*","https://www.video.unext.jp/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/unext/unext-inject.js"]}');

/***/ }),

/***/ 4946:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"vidio","serviceName":"Vidio","shortcode":"vJ","url":"https://www.vidio.com/","origins":["https://www.vidio.com/"],"contentScripts":[{"id":"vidio-content","matches":["https://www.vidio.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/vidio/vidio-inject.js"]}');

/***/ }),

/***/ 513:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"vimeo","serviceName":"Vimeo","shortcode":"vI","url":"https://vimeo.com/","origins":["https://vimeo.com/","https://www.vimeo.com/","https://player.vimeo.com/"],"contentScripts":[{"id":"vimeo-content","matches":["https://vimeo.com/*","https://www.vimeo.com/*","https://player.vimeo.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/vimeo/vimeo-inject.js"]}');

/***/ }),

/***/ 4192:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"viu","serviceName":"Viu","shortcode":"vi","url":"https://www.viu.com/","origins":["https://www.viu.com/"],"contentScripts":[{"id":"viu-content","matches":["https://www.viu.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/viu/viu-inject.js"]}');

/***/ }),

/***/ 3752:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"watcha","serviceName":"WATCHA","shortcode":"wA","url":"https://watcha.com/","origins":["https://watcha.com/","https://www.watcha.com/"],"contentScripts":[{"id":"watcha-content","matches":["https://watcha.com/*","https://www.watcha.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/watcha/watcha-inject.js"]}');

/***/ }),

/***/ 1747:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"wavve","serviceName":"Wavve","shortcode":"wa","url":"https://www.wavve.com/","origins":["https://www.wavve.com/"],"contentScripts":[{"id":"wavve-content","matches":["https://www.wavve.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/wavve/wavve-inject.js"]}');

/***/ }),

/***/ 8348:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"wetv","serviceName":"WeTV","shortcode":"we","url":"https://wetv.vip/","origins":["https://wetv.vip/","https://www.wetv.vip/"],"contentScripts":[{"id":"wetv-content","matches":["https://wetv.vip/*","https://www.wetv.vip/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/wetv/wetv-inject.js"]}');

/***/ }),

/***/ 6605:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"youtube","serviceName":"YouTube","shortcode":"yo","url":"https://www.youtube.com/","origins":["https://www.youtube.com/"],"contentScripts":[{"id":"youtube-content","matches":["https://www.youtube.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/youtube/youtube-inject.js"]}');

/***/ }),

/***/ 4989:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"zee5","serviceName":"ZEE5","shortcode":"ze","url":"https://www.zee5.com/","origins":["https://www.zee5.com/"],"contentScripts":[{"id":"zee5-content","matches":["https://www.zee5.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/zee5/zee5-inject.js"]}');

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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/native.js
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const esm_browser_native = ({
  randomUUID
});
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const esm_browser_stringify = ((/* unused pure expression or super */ null && (stringify)));
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v4.js




function v4(options, buf, offset) {
  if (esm_browser_native.randomUUID && !buf && !options) {
    return esm_browser_native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

/* harmony default export */ const esm_browser_v4 = (v4);
;// CONCATENATED MODULE: ./lib/ott.js
/* eslint-disable no-undef */
const data = {};

function importAll(r) {
  r.keys().forEach(key => {
    const {
      name,
      serviceName,
      url,
      origins,
      contentScripts,
      injectScripts,
      shortcode
    } = r(key);
    data[name] = {
      name,
      serviceName,
      url,
      origins,
      contentScripts,
      injectScripts,
      shortcode
    };
  });
}
/* function importAll(r) {
  const dataEntries = r.keys().sort().map((key) => {
    const { index, name, url, origins, contentScripts, injectScripts } = r(key)
    return [name, {
      index,
      name,
      url,
      origins,
      contentScripts,
      injectScripts
    }];
  });

  // index에 따라 dataEntries를 정렬
  dataEntries.sort((a, b) => a[1].index - b[1].index);

  // 정렬된 dataEntries를 data 객체에 추가
  for (const [name, dataEntry] of dataEntries) {
    data[name] = dataEntry;
  }
}
 */


function removeAllSearchParams(url) {
  const urlObj = new URL(url);
  urlObj.search = '';
  return urlObj.toString();
}

importAll(__webpack_require__(9038));
/* harmony default export */ const lib_ott = ({
  data: Object.values(data),
  get: service => data[service],
  matchingOTT: str => {
    if (data[str]) return [data[str]];
    const result = {};
    const url = removeAllSearchParams(str);

    for (const [name, ott] of Object.entries(data)) {
      for (const contentScript of ott.contentScripts) {
        for (const matchPattern of contentScript.matches) {
          if (new URLPattern(matchPattern).test(url)) {
            result[name] = ott;
            break;
          }
        }

        if (result[name]) break;
      }
    }

    return Object.values(result);
  },
  matchingContentScripts: str => {
    const result = [];
    const url = removeAllSearchParams(str);

    for (const ott of Object.values(data)) {
      for (const contentScript of ott.contentScripts) {
        for (const matchPattern of contentScript.matches) {
          if (new URLPattern(matchPattern).test(url)) {
            result.push(contentScript);
          }
        }
      }
    }

    return result;
  }
});
;// CONCATENATED MODULE: ./lib/playlistToBase64.js

const stateToNumber = {
  playing: '1',
  paused: '2',
  browsing: '3',
  'something else': '4',
  ads: '5'
};
const numberToState = {
  1: 'playing',
  2: 'paused',
  3: 'browsing',
  4: 'something else',
  5: 'ads'
};

function toBase64(num) {
  num = Math.round(num); // 숫자를 반올림하여 정수로 변환

  const digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let str = '';
  let r;

  while (num > 0) {
    r = num % 64;
    str = digits[r] + str;
    num = Math.floor(num / 64);
  }

  return str;
}

function fromBase64(str) {
  const digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let num = 0;
  const len = str.length;

  for (let i = 0; i < len; i++) {
    num = num * 64 + digits.indexOf(str[i]);
  }

  return num;
}

const urlShortCodeMap = new Map();
const shortCodeUrlMap = new Map();
const websiteNameShortcodeMap = new Map();
console.log('ottsdata', lib_ott.data); // 첫 번째 패스: 모든 고유한 OTT 이름에 대한 단축코드 불러오기

lib_ott.data.forEach(ott => {
  if (!websiteNameShortcodeMap.has(ott.name)) {
    const shortcode = ott.shortcode;
    websiteNameShortcodeMap.set(ott.name, shortcode);
  }
}); // 두 번째 패스: 각 OTT의 오리진에 대한 단축코드 생성

lib_ott.data.forEach(ott => {
  const shortCodeName = websiteNameShortcodeMap.get(ott.name);
  ott.origins.forEach((origin, index) => {
    if (origin.endsWith('/')) {
      origin = origin.slice(0, -1); // 마지막 문자가 '/'인지 확인하고 삭제
    }

    const shortCode = shortCodeName + index.toString();
    urlShortCodeMap.set(origin, shortCode);
    shortCodeUrlMap.set(shortCode, origin);
  });
}); // Additional hard-coded mappings
// 영문 대소문자 + 한자리 숫자조합. 대문자를 우선시 한다

const additionalMappings = [{
  url: 'https://www.netflix.com/watch',
  shortCode: 'N1'
}, {
  url: 'https://www.youtube.com/watch',
  shortCode: 'Y1'
}, {
  url: 'https://www.youtube.com/watch?v=',
  shortCode: 'Y2'
} // More mappings can be added here...
];
additionalMappings.forEach(({
  url,
  shortCode
}) => {
  if (url.endsWith('/')) {
    url = url.slice(0, -1); // 마지막 문자가 '/'인지 확인하고 삭제
  }

  if (shortCode.startsWith('ht')) {
    console.warn(`shortCode could not starts with 'ht': ${shortCode}. Skipping...`);
    return;
  } // Check for potential collisions


  if (urlShortCodeMap.has(url)) {
    console.warn(`Collision detected for URL: ${url}. Skipping...`);
    return;
  }

  if (shortCodeUrlMap.has(shortCode)) {
    console.warn(`Collision detected for short code: ${shortCode}. Skipping...`);
    return;
  }

  urlShortCodeMap.set(url, shortCode);
  shortCodeUrlMap.set(shortCode, url);
});

function urlToShortCode(url) {
  // map의 keys를 배열로 가져와서 길이에 따라 내림차순으로 정렬합니다.
  const sortedKeys = Array.from(urlShortCodeMap.keys()).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    if (url.startsWith(key)) {
      return url.replace(key, urlShortCodeMap.get(key));
    }
  }

  return url; // 변환할 수 없는 경우 원래 URL 반환
}

function shortCodeToUrl(shortUrl) {
  for (const [key, value] of urlShortCodeMap.entries()) {
    if (shortUrl.startsWith(value)) {
      return shortUrl.replace(value, key);
    }
  }

  return shortUrl; // 변환할 수 없는 경우 원래 URL 반환
}

function toHourElapsedTime(unixTimeMs) {
  const now = new Date();
  const thisHour = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours()));
  return unixTimeMs - thisHour.getTime();
}

function fromHourElapsedTime(elapsedTimeMs) {
  const now = new Date();
  const thisHour = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours()));
  let result = thisHour.getTime() + elapsedTimeMs;

  if (result > now.getTime()) {
    const differenceInMs = result - now.getTime();
    const differenceInHours = Math.ceil(differenceInMs / (1000 * 60 * 60));
    const previousHour = new Date(result);
    previousHour.setHours(previousHour.getHours() - differenceInHours);
    result = previousHour.getTime() + elapsedTimeMs;
  }

  return result;
}

function convertToCondensedPlaylistTuple(playlist) {
  const shortUrl = urlToShortCode(playlist.url);
  return [shortUrl, stateToNumber[playlist.state] || playlist.state, toBase64(playlist.lastPlayTime), toBase64(toHourElapsedTime(playlist.lastVideoEventTime || playlist.lastMsgReceived)) // lastMsgReceived만 있을경우 이를 사용합니다.
  ];
}

function convertToPlayList(condensedPlaylistTuple) {
  const fullUrl = shortCodeToUrl(condensedPlaylistTuple[0]);
  return {
    url: fullUrl,
    state: numberToState[condensedPlaylistTuple[1]] || condensedPlaylistTuple[1],
    lastPlayTime: fromBase64(condensedPlaylistTuple[2]),
    lastVideoEventTime: fromHourElapsedTime(fromBase64(condensedPlaylistTuple[3]))
  };
}

function encode(playlist) {
  const filteredPlaylist = convertToCondensedPlaylistTuple(playlist);
  const pipeString = filteredPlaylist.join('|');
  const base64String = btoa(pipeString);
  return base64String;
}
function decode(base64String) {
  const pipeString = atob(base64String).split('|');

  if (pipeString.length < 4) {
    const andString = atob(base64String).split('&');
    const playlist = convertToPlayList(andString);
    return playlist;
  }

  const playlist = convertToPlayList(pipeString);
  return playlist;
}
/* harmony default export */ const playlistToBase64 = ({
  encode,
  decode
});
;// CONCATENATED MODULE: ./lib/utils.js

function debounce(func, wait) {
  let timeout;

  let _args;

  return function executedFunction(...args) {
    _args = args;

    const later = () => {
      clearTimeout(timeout);
      timeout = null;
      func(..._args);
    };

    if (timeout) return;
    timeout = setTimeout(later, wait);
  };
}
/* export function debounceAsync(func, wait) {
  let timeout
  let _args
  return function executedFunction(...args) {
    _args = args
    return new Promise((resolve, reject) => {
      const later = async () => {
        clearTimeout(timeout)
        timeout = null
        try {
          const result = await func(..._args)
          resolve(result)
        } catch (err) {
          reject(err)
        }
      }
      if (timeout) return reject(new Error('Function call was debounced'))
      timeout = setTimeout(later, wait)
    })
  }
} */

function debounceAsync(func, wait) {
  let timeout;

  let _args;

  let resolves = [];
  let rejects = [];

  const later = async () => {
    clearTimeout(timeout);
    timeout = null;

    try {
      const result = await func(..._args);
      resolves.forEach(resolve => resolve(result));
    } catch (error) {
      rejects.forEach(reject => reject(error));
    } finally {
      resolves = [];
      rejects = [];
    }
  };

  return function executedFunction(...args) {
    _args = args;
    return new Promise((resolve, reject) => {
      resolves.push(resolve);
      rejects.push(reject);
      if (timeout) return;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    });
  };
}
function getLocalStorage(keys) {
  return new Promise(resolve => {
    chrome.storage.local.get(keys, result => {
      resolve(result);
    });
  });
}
function setLocalStorage(keyValueObj) {
  return chrome.storage.loca.set(keyValueObj);
}
function findTabs(match) {
  return new Promise(resolve => {
    chrome.tabs.query(match, function (tabs) {
      resolve(tabs);
    });
  });
}
function updateServiceNameInUrl(serviceSelectUrl) {
  let _serviceSelectUrl = serviceSelectUrl;
  if (!_serviceSelectUrl) return _serviceSelectUrl;

  try {
    const urlObject = new URL(_serviceSelectUrl);
    const ottService = urlObject.searchParams.get('service');

    if (ottService) {
      const ottServiceList = String(ottService).split(',');
      const serviceNameList = ottServiceList.map(ottService => {
        return encodeURIComponent(lib_ott.get(ottService).serviceName);
      });
      const separator = urlObject.searchParams.size > 0 ? '&' : '?';
      _serviceSelectUrl += separator + 'serviceName=' + serviceNameList.join(',');
    }
  } catch (e) {
    console.error('updateServiceNameInUrl Error:', e);
  }

  return _serviceSelectUrl;
}
;// CONCATENATED MODULE: ./lib/screenaAPI.js



async function isRecording(screenaUser, state, callback) {
  try {
    const response = await fetch(screenaUser.apiEndPoint + '/event/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        rui: esm_browser_v4()
      },
      body: JSON.stringify({
        userid: screenaUser.uid,
        platform: state.service,
        videoid: state.videoId
      })
    });
    const result = await response.json();
    if (result?.isEvents) callback(true);else callback(false);
  } catch (e) {
    sendErrorLog(e, 'screenaAPI isRecording');
    console.error(e);
  }
}
async function sendRecords(screenaUser, state) {
  console.log('sendRecords', screenaUser, state);

  try {
    const response = await fetch(screenaUser.apiEndPoint + '/event/stamp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        rui: esm_browser_v4()
      },
      body: JSON.stringify({
        userid: screenaUser.uid,
        platform: state.service,
        videoid: state.videoId,
        playtime: state.currentTime,
        duration: state.duration
      })
    });
    const result = await response.json();
  } catch (e) {
    sendErrorLog(e, 'screenaAPI sendRecords');
    console.error(e);
  }

  return true;
}
async function createAnonymousRoom(apiEndPoint = 'https://api.screena.com') {
  try {
    const response = await fetch(apiEndPoint + '/anonymous/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        rui: esm_browser_v4()
      },
      body: JSON.stringify({
        room_name: 'anonymous room',
        is_private: false,
        is_show_contents: true
      })
    });
    const result = await response.json();
    console.log('createAnonymousRoom', result);
    return {
      roomId: result.data.room_id,
      uid: result.data.uid
    };
  } catch (e) {
    sendErrorLog(e, 'screenaAPI createAnonymousRoom');
    console.error(e);
  }
}
async function updateAnonymousRoom(uid, roomId, {
  state,
  currentTime,
  duration,
  embedUrl,
  interaction,
  service,
  serviceName,
  title,
  url,
  videoId,
  metadata,
  lastVideoEventTime
}, apiEndPoint = 'https://api.screena.com') {
  try {
    const playlist = {
      url,
      embedUrl,
      state,
      service,
      serviceName,
      title,
      duration,
      lastMsgReceived: lastVideoEventTime,
      lastInteraction: interaction,
      videoId,
      metadata: metadata || {},
      lastPlayTime: currentTime
    }; // Modify the origin based on the original origin

    const response = await fetch(`${apiEndPoint}/anonymous/rooms/${roomId}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        rui: esm_browser_v4()
      },
      body: JSON.stringify({
        uid,
        play_list: playlist
      })
    });
    if (response.status === 404) return 'invalid_room';
    const result = await response.json();
    console.log('updateAnonymousRoom result', result);
    return result.success ? 'success' : 'failed';
  } catch (e) {
    throw new Error(e);
  }
}
async function sendSyncMessageToChat(uid, roomId, {
  state,
  currentTime,
  duration,
  embedUrl,
  interaction,
  service,
  title,
  url,
  videoId,
  metadata,
  lastVideoEventTime
}, apiEndPoint = 'https://api.screena.com', origin = 'https://www.screena.com') {
  try {
    const playlist = {
      url,
      embedUrl,
      state,
      service,
      title,
      duration,
      lastMsgReceived: lastVideoEventTime,
      lastInteraction: interaction,
      videoId,
      metadata: metadata || {},
      lastPlayTime: currentTime
    };
    const code = encode(playlist);
    let search = code; // Modify the origin based on the original origin

    let newOrigin;

    if (origin.startsWith('https://www.screena.com') || origin.startsWith('https://screena.com')) {
      newOrigin = 'https://t.screena.com/';
    } else if (origin.startsWith('https://stg.screena.com')) {
      newOrigin = 'https://t.screena.com/'; // Add dev=1 to the search parameters

      search += '&dev=1';
    } else {
      newOrigin = origin.startsWith('https://') ? origin.substring(8) : origin;
    }

    const urlMsg = newOrigin + (newOrigin.includes('t.screena.com') ? '?' : '/watchparty/join-anonymous?') + search;
    const response = await fetch(`${apiEndPoint}/anonymous/rooms/${roomId}/twitch/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        rui: esm_browser_v4()
      },
      body: JSON.stringify({
        uid,
        url_msg: urlMsg
      })
    });
    if (response.status === 404) return 'invalid_room';
    const result = await response.json();
    console.log('sendSyncMessageToChat result', result);
    return result.success ? 'success' : 'failed';
  } catch (e) {
    throw new Error(e);
  }
}
async function connentWithTwitch(uid, roomId, code, redirectUrl, apiEndPoint = 'https://api.screena.com') {
  try {
    const response = await fetch(`${apiEndPoint}/anonymous/rooms/${roomId}/twitch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        rui: esm_browser_v4()
      },
      body: JSON.stringify({
        uid,
        data: {
          code,
          redirect_uri: redirectUrl
        }
      })
    });
    if (response.status === 404) return false;
    if (response.status >= 200 && response.status < 300) return true;
    throw new Error(`connentWithTwitch error ${response.status}:${response}`);
  } catch (e) {
    throw new Error(e);
  }
}
async function disconnectWithTwitch(uid, roomId, apiEndPoint = 'https://api.screena.com') {
  try {
    const response = await fetch(`${apiEndPoint}/anonymous/rooms/${roomId}/twitch`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        rui: esm_browser_v4()
      },
      body: JSON.stringify({
        uid
      })
    });
    if (response.status === 404) return false;
    if (response.status >= 200 && response.status < 300) return true;
    throw new Error(`disconnectWithTwitch error ${response.status}:${response}`);
  } catch (e) {
    throw new Error(e);
  }
} // error log check api

async function sendErrorLog(error, hint, service) {
  try {
    console.log('sendErrorLog', error, hint, service);
    /* 
    const { anonymousRoomId, anonymousUserId, screenaUser } = await getLocalStorage(['anonymousRoomId','anonymousUserId','screenaUser'])
    const uid = screenaUser?.uid || undefined
    const apiEndPoint = screenaUser?.apiEndPoint || 'https://api.screena.com'
     const response = fetch(
      `${apiEndPoint}/logs/extension`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          rui: uuidv4()
      },
      body: JSON.stringify({
        error_log: String(error),
        error_name: String(error?.name),
        error_msg: String(error?.message),
        hint,
        uid,
        platform: service,
        anonymous_uid: anonymousUserId,
        anonymous_room_id: anonymousRoomId,
        extension_ver: chrome.runtime.getManifest().version
      })
    })
    */
  } catch (e) {
    console.error(e);
  }
}
;// CONCATENATED MODULE: ./lib/rearrange.js
async function rearrange(f, data = [], errorAllowed = 20, maxTries = 50) {
  const RH = data[0];
  const testData = [data];
  let a = new Array(RH.length).fill(1);
  let b = new Array(RH.length).fill(0);
  let tries = 0;

  while (testData.length <= 0 || maxDifference(testData[testData.length - 1][1], RH) > errorAllowed) {
    if (tries++ >= maxTries) break;
    const l = testData.length;

    let _x, _y;

    switch (l) {
      case 0:
        _y = await f(RH);
        testData[0] = [RH, _y];
        break;

      case 1:
        b = subs(testData[0][1], testData[0][0]);
        _x = divide(subs(RH, b), a);
        _y = await f(_x);
        testData[1] = [_x, _y];
        break;

      default:
        ;
        [b, a] = linearRegression(testData, a);
        _x = divide(subs(RH, b), a);
        _x = _x.map(v => Math.round(v));
        _y = await f(_x);
        testData[testData.length] = [_x, _y];
    }

    console.log('rearrange', testData, maxDifference(testData[testData.length - 1][1], RH));
  }
}

function maxDifference(A, B) {
  return max(subs(A, B).map(x => Math.abs(x)));
}

function subs(A, B) {
  const result = [];

  for (let i = 0; i < A.length; i++) {
    result[i] = A[i] - B[i];
  }

  return result;
}

function divide(A, B) {
  const result = [];

  for (let i = 0; i < A.length; i++) {
    result[i] = A[i] / B[i];
  }

  return result;
}

function max(A) {
  return A.reduce((pre, cur) => pre > cur ? pre : cur);
}

function regress(x, y, slp, last = 10) {
  const n = x.length <= last ? 10 : x.length;
  const drop = x.length <= last ? 0 : x.length - last;
  let xSum = 0;
  let ySum = 0;
  let xSquared = 0;
  let xY = 0;

  for (let i = drop; i < x.length; i++) {
    xSum += x[i];
    ySum += y[i];
    xSquared += x[i] * x[i];
    xY += x[i] * y[i];
  }

  const numerator = n * xY - xSum * ySum;
  const slope = n * xSquared - xSum * xSum === 0 ? slp : numerator / (n * xSquared - xSum * xSum);
  const intercept = 1 / n * ySum - slope * (1 / n) * xSum;
  return [intercept, slope];
}

function linearRegression(data, slp) {
  const dim = data[0][0].length;
  const a = [];
  const b = [];

  for (let i = 0; i < dim; i++) {
    ;
    [b[i], a[i]] = regress(data.map(l => l[0][i]), data.map(l => l[1][i]), slp[i]);
  }

  return [b, a];
}
;// CONCATENATED MODULE: ./lib/tab.js




const sidebarWidth = 326;
function checkIfScreena(str) {
  if (str === 'screena') return true;

  try {
    const urlObj = new URL(str);
    urlObj.search = '';
    urlObj.hash = '';
    const url = urlObj.toString();

    for (const matchPattern of ['https://screena.com/*', 'https://*.screena.com/*', 'http://localhost:3000/*']) {
      // eslint-disable-next-line no-undef
      if (new URLPattern(matchPattern).test(url)) return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}
async function checkContentScripts(str) {
  if (checkIfScreena(str)) return true;
  const ott = lib_ott.matchingOTT(str)[0];
  if (!ott) throw Error('requestPermission Error: invalid input:' + str);
  const permission = await chrome.permissions.contains({
    permissions: ['tabs'],
    origins: ott.origins
  });
  if (!permission) return false;
  const registered = await chrome.scripting.getRegisteredContentScripts({
    ids: ott.contentScripts.map(contentScript => contentScript.id)
  });
  if (ott.contentScripts.length === registered.length) return true;
  return false;
}
async function registerContentScripts(str, execute = false) {
  console.log('registerContentScripts', str, str.split(','));
  const otts = [];
  str.split(',').forEach(_str => {
    if (checkIfScreena(_str)) return;
    const ott = lib_ott.matchingOTT(_str)[0];
    if (!ott) throw Error('requestPermission Error: invalid input:' + str);
    otts.push(ott);
  });
  console.log('otts', otts);
  const granted = await chrome.permissions.request({
    permissions: ['scripting'],
    origins: otts.reduce((acc, cuv) => acc.concat(cuv.origins), [])
  });
  if (!granted) return false;

  for (const contentScript of otts.reduce((acc, cuv) => acc.concat(cuv.contentScripts), [])) {
    const success = await chrome.scripting.registerContentScripts([contentScript]).then(() => true).catch(e => {
      if (String(e).includes('Duplicate script ID')) return false;
      throw new Error('checkContentScripts Error :' + JSON.stringify(contentScript));
    });

    if (!success) {
      await chrome.scripting.updateContentScripts([contentScript]);
    } // If execute flag is set, execute the script in matching tabs.


    if (execute) {
      console.log('executeScript', contentScript);
      chrome.tabs.query({
        url: contentScript.matches
      }, function (tabs) {
        tabs.forEach(function (tab) {
          console.log('executeScripttabs', tab);
          chrome.scripting.executeScript({
            target: {
              tabId: tab.id
            },
            files: contentScript.js
          }).catch(error => {
            sendErrorLog(error, 'tab registerContentScripts');
            console.error(`Error executing script on tab ${tab.id}: ${error.message}`);
          });
        });
      });
    }
  }

  return true;
}
const PlayerTab = {
  tab: async () => {
    try {
      const tab = await chrome.tabs.get((await getLocalStorage(['playerTabId']))?.playerTabId);
      return tab;
    } catch (e) {//
    }
  },
  tabId: async () => {
    return (await PlayerTab.tab())?.id;
  },
  sendMessage: async msg => {
    const {
      service,
      data
    } = msg;
    const url = data?.url;

    if (!(await checkContentScripts(url || service))) {
      throw new Error(`no permission error: '${service}' '${url}'`);
    }

    const tabId = await PlayerTab.tabId();
    return await new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(tabId, msg, response => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response);
        }
      });
    });
  },
  open: async ({
    service,
    screen,
    serviceSelectUrl
  }) => {
    if (!(await checkContentScripts(serviceSelectUrl || service))) {
      throw new Error(`no permission error: '${service}' '${serviceSelectUrl}' `);
    }

    const _url = serviceSelectUrl || lib_ott.get(service).url;

    const window = await chrome.windows.create({
      state: 'normal',
      left: screen.left,
      top: screen.top,
      width: screen.width - sidebarWidth,
      height: screen.height,
      type: 'popup'
    });
    const tab = await chrome.tabs.create({
      url: _url,
      windowId: window.id
    });
    console.log('player window: ', window);
    console.log('player tab id: ', tab.id);
    chrome.storage.local.set({
      playerTabId: tab.id
    });
    await rearrange(async screen => {
      const result = await chrome.windows.update(window.id, {
        state: 'normal',
        left: Math.round(screen[0]),
        top: Math.round(screen[1]),
        width: Math.round(screen[2]),
        height: Math.round(screen[3])
      });
      return [result.left, result.top, result.width, result.height];
    }, [[screen.left, screen.top, screen.width - sidebarWidth, screen.height], [window.left, window.top, window.width, window.height]]);
  },
  update: async ({
    service,
    serviceSelectUrl
  }) => {
    if (!(await checkContentScripts(serviceSelectUrl || service))) {
      throw new Error(`no permission error: '${service}' '${serviceSelectUrl}'`);
    }

    const _url = serviceSelectUrl || lib_ott.get(service).url;

    const playerTab = await PlayerTab.tab();
    if (!playerTab) return false;
    if (playerTab.url === _url) return false;
    chrome.windows.update(playerTab.windowId, {
      focused: true
    });
    chrome.tabs.update(playerTab.id, {
      url: _url,
      highlighted: true
    });
    return true;
  }
};
const SideTab = {
  tab: async () => {
    try {
      const tab = await chrome.tabs.get((await getLocalStorage(['sideTabId']))?.sideTabId);
      return tab;
    } catch (e) {//
    }
  },
  tabId: async () => {
    return (await SideTab.tab())?.id;
  },
  sendMessage: async msg => {
    const tabId = await SideTab.tabId();
    return await new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(tabId, msg, response => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response);
        }
      });
    });
  },
  open: async ({
    url,
    screen
  }) => {
    const window = await chrome.windows.create({
      state: 'normal',
      left: screen.left + screen.width - sidebarWidth,
      top: screen.top,
      width: sidebarWidth,
      height: screen.height,
      type: 'popup'
    });
    const tab = await chrome.tabs.create({
      url,
      windowId: window.id
    });
    console.log('sidebar window: ', window);
    console.log('sidebar tab id: ', tab.id);
    chrome.storage.local.set({
      sideTabId: tab.id
    });
    await rearrange(async screen => {
      const result = await chrome.windows.update(window.id, {
        state: 'normal',
        left: Math.round(screen[0]),
        top: Math.round(screen[1]),
        width: Math.round(screen[2]),
        height: Math.round(screen[3])
      });
      return [result.left, result.top, result.width, result.height];
    }, [[screen.left + screen.width - sidebarWidth, screen.top, sidebarWidth, screen.height], [window.left, window.top, window.width, window.height]]);
  },
  update: async ({
    url
  }) => {
    const sideTab = await SideTab.tab();
    if (!sideTab) return false;
    chrome.windows.update(sideTab.windowId, {
      focused: true
    });
    chrome.tabs.update(sideTab.id, {
      url,
      highlighted: true
    });
    return true;
  }
};
;// CONCATENATED MODULE: ./lib/errorLog.js

function onCheckVideoSync(beforeVideoData, msg, sender, sendResponse) {
  const {
    host,
    guest
  } = msg.data;
  const {
    url,
    service,
    contentId,
    state,
    currentTime
  } = guest;
  const beforeHost = Object.assign({}, beforeVideoData.get('host'));
  const beforeGuest = Object.assign({}, beforeVideoData.get('guest'));
  beforeVideoData.set('host', host);
  beforeVideoData.set('guest', guest);
  const log = JSON.stringify({
    host: beforeHost,
    beforeGuest,
    afterGuest: guest
  }); // 1. Host, Guest의 상태 상관없이 서비스가 다르다면 Sync 문제

  if (beforeHost.service !== beforeGuest.service !== service) {
    sendErrorLog(log, 'background checkVideoSyncError serviceUnSync', service);
    return;
  } // 2. Host 'browsing, something else' || Guest 'omething else' 상태라면 Sync 깨진 상태이므로 무시


  const beforeHostState = beforeHost.state;
  const beforeGuestState = beforeGuest.state;

  if (beforeHostState === 'browsing' || beforeHostState === 'something else' || beforeGuestState === 'something else') {
    return;
  } // 3. 2번으로 인해 Sync 깨진 상태가 아니라면 같은 컨텐츠를 보고있는지 확인: url || contentId 동일하다면 Sync 되었다고 간주


  const beforeHostUrl = beforeHost.url;
  const beforeHostContentId = beforeHost.contentId;

  if (!(beforeHostUrl && url && beforeHostUrl === url) && !(beforeHostContentId && contentId && beforeHostContentId === contentId)) {
    sendErrorLog(log, 'background checkVideoSyncError locationUnSync', service);
    return;
  } // 4. Host,Guest 'play, pause' 상태일때, Host와 상태가 다르면 Sync 문제


  if (beforeHostState === 'playing' || beforeHostState === 'paused' || beforeGuestState === 'playing' || beforeGuestState === 'paused') {
    const timegap = beforeHost.currentTime - currentTime;
    const timegapAllowed = beforeHost.interaction === 'periodic' ? 3000 : 500;

    if (beforeHostState === state && timegap <= timegapAllowed && timegap >= -timegapAllowed) {
      return;
    }

    sendErrorLog(log, 'background checkVideoSyncError videoUnSync', service);
  }
}
;// CONCATENATED MODULE: ./lib/cooldown.js
class CooldownController {
  constructor(func, cooldown, compareArgs) {
    this.func = func;
    this.cooldown = cooldown;
    this.compareArgs = compareArgs;
    this.methodCallRecord = null;
  }

  async run(...args) {
    console.log('CooldownController run', this);
    const now = Date.now();

    if (!this.methodCallRecord || !this.compareArgs(this.methodCallRecord.args, args) || now - this.methodCallRecord.time >= this.cooldown) {
      const response = await this.func(...args);
      this.methodCallRecord = {
        args,
        time: Date.now()
      };
      return response;
    } else {
      5; // Calculate the remaining cooldown time in seconds

      const remainingCooldown = ((this.cooldown - (now - this.methodCallRecord.time)) / 1000).toFixed(2);
      throw new Error(`Cooldown - The method cannot be called. Please wait ${remainingCooldown} more seconds.`);
    }
  }

  static withCooldown(func, cooldown, compareArgs = (lastArgs, currentArgs) => JSON.stringify(lastArgs) === JSON.stringify(currentArgs)) {
    const controller = new CooldownController(func, cooldown, compareArgs);
    return (...args) => controller.run(...args);
  }

}
const withCooldown = CooldownController.withCooldown;
;// CONCATENATED MODULE: ./lib/googleAnalytics.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function generateClientId() {
  const firstPart = Math.floor(Math.random() * 1e10); // Generate a random 10-digit number

  const secondPart = Math.floor(Math.random() * 1e10); // Generate a second random 10-digit number

  const clientId = `${firstPart}.${secondPart}`;
  return clientId;
}

class GoogleAnalytics {
  constructor(measurementId, apiSecret) {
    _defineProperty(this, "onJoinStreamingWatchparty", withCooldown(async channel => {
      const eventDetails = {
        name: 'join_streaming_watchparty',
        params: {
          event_name: 'join_streaming_watchparty',
          platform: 'twitch',
          channel
        }
      };
      await this.report([eventDetails]);
    }, 60 * 1000));

    _defineProperty(this, "onSendPlaylistToPlayer", withCooldown(async (channel, service, url) => {
      const now = Date.now();
      let joinDuration = this.lastSendedSPP ? now - this.lastSendedSPP : 0;

      if (joinDuration > 180 * 1000) {
        joinDuration = 0;
        this.lastSendedSPP = now;
      }

      const events = [{
        name: 'send_playlist_to_player',
        params: {
          event_name: 'send_playlist_to_player',
          platform: 'twitch',
          channel,
          service,
          url,
          join_duration: joinDuration
        }
      }];
      await this.report(events);
      this.lastSendedSPP = now;
    }, 60 * 1000));

    _defineProperty(this, "onSyncPlaylistToTimer", withCooldown(async (roomId, {
      service,
      title,
      url
    }) => {
      const now = Date.now();
      let joinDuration = this.lastSendedSPT ? now - this.lastSendedSPT : 0;

      if (joinDuration > 180 * 1000) {
        joinDuration = 0;
        this.lastSendedSPT = now;
      }

      const events = [{
        name: 'timer_deck_logs',
        params: {
          event_name: 'timer_deck_logs',
          service,
          url,
          title,
          roomId,
          join_duration: joinDuration
        }
      }]; // console.log('onSyncPlaylistToTimer', events)

      try {
        await this.initialize();
        await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${this.measurementId}&api_secret=${this.apiSecret}`, {
          method: 'POST',
          body: JSON.stringify({
            client_id: this.clientLogsId,
            user_properties: this.user_properties,
            events
          })
        });
      } catch (error) {
        sendErrorLog(error, 'googleAnalytics report');
        console.error('GoogleAnalytics Report error:', error);
      }

      this.lastSendedSPT = now;
    }, 60 * 1000));

    _defineProperty(this, "onInstall", async () => {
      const events = [{
        name: 'install',
        params: {
          event_name: 'install'
        }
      }];
      await this.report(events);
    });

    _defineProperty(this, "createAnonymousAccount", async ({
      anonymousRoomId
    }) => {
      const events = [{
        name: 'createAnonymousAccount',
        params: {
          event_name: 'createAnonymousAccount',
          roomId: anonymousRoomId
        }
      }];
      await this.report(events);
    });

    _defineProperty(this, "openTimer", async ({
      anonymousRoomId,
      url,
      service
    }) => {
      const events = [{
        name: 'openTimer',
        params: {
          event_name: 'openTimer',
          roomId: anonymousRoomId,
          url,
          service
        }
      }];
      await this.report(events);
    });

    this.measurementId = measurementId;
    this.apiSecret = apiSecret;
    this.clientId = null;
    this.clientLogsId = null;
    this.initializing = false;
    this.methodCallRecords = {}; // To track the last details of each event

    this.user_properties = {};
  }

  async initialize() {
    if (this.initializing) {
      return;
    }

    this.initializing = true;

    if (!this.clientId) {
      const storedClientId = (await getLocalStorage('ga_client_id')).ga_client_id;
      this.clientId = storedClientId || generateClientId();

      if (!storedClientId) {
        chrome.storage.local.set({
          ga_client_id: this.clientId
        });
      }
    }

    if (!this.clientLogsId) {
      const storedClientId = (await getLocalStorage('ga_client_logs_id')).ga_client_logs_id;
      this.clientLogsId = storedClientId || generateClientId();

      if (!storedClientId) {
        chrome.storage.local.set({
          ga_client_logs_id: this.clientLogsId
        });
      }
    }

    if (!this.user_properties.user_type) {
      const from = (await getLocalStorage('from')).from;
      this.user_properties.from = from;
    }

    if (navigator?.language) {
      this.user_properties.language = navigator.language;
    }

    this.initializing = false;
  }

  async report(events) {
    try {
      await this.initialize();
      await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${this.measurementId}&api_secret=${this.apiSecret}`, {
        method: 'POST',
        body: JSON.stringify({
          client_id: this.clientId,
          user_properties: this.user_properties,
          events
        })
      });
    } catch (error) {
      sendErrorLog(error, 'googleAnalytics report');
      console.error('GoogleAnalytics Report error:', error);
    }
  }

}
const GoogleAnalyticsInstance = new GoogleAnalytics('G-TQZ7X6CZE1', '-zLJRLClSNSlt6hjAffvZA');
GoogleAnalyticsInstance.initialize();
/* harmony default export */ const googleAnalytics = (GoogleAnalyticsInstance);
;// CONCATENATED MODULE: ./lib/install.js



function isValidUrl(urlString) {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
}

function extractValidUrlsFromTabs(tabs, param) {
  return tabs.reduce((result, tab) => {
    const value = new URL(tab.url).searchParams.get(param);

    if (isValidUrl(value)) {
      return result.concat(value);
    }

    return result;
  }, []);
}

chrome.runtime.onInstalled.addListener(async function (details) {
  if (details.reason === 'install') {
    const tabs = await findTabs({
      url: 'https://chrome.google.com/*hhoapolbeidlfbkkmieijgnfigijlimm*'
    });
    const ga_client_id = extractValidUrlsFromTabs(tabs, 'ga_client_id')[0];
    const redirects = extractValidUrlsFromTabs(tabs, 'redirect');
    const from = extractValidUrlsFromTabs(tabs, 'from');

    if (ga_client_id) {
      chrome.storage.local.get('ga_client_id', function (data) {
        if (!data.ga_client_id) {
          chrome.storage.local.set({
            ga_client_id: ga_client_id
          });
        }
      });
    }

    if (from) {
      chrome.storage.local.get('from', function (data) {
        if (!data.user_type) {
          chrome.storage.local.set({
            from: from
          });
        }
      });
    }

    tabs.reduce((result, tab) => {
      if (result === null) {
        const autoclose = new URL(tab.url).searchParams.get('autoclose');

        if (autoclose === 'false' || !autoclose) {
          chrome.tabs.remove(tab.id);
        }
      }

      return result;
    }, null);
    chrome.tabs.query({
      url: ['https://*.screena.com/*', ...redirects]
    }, function (tabs) {
      if (tabs.length === 0) {
        chrome.tabs.create({
          url: redirects[0] || 'https://www.screena.com/'
        });
      } else {
        tabs.forEach(function (t) {
          chrome.tabs.reload(t.id);
        });
      }
    });
    googleAnalytics.onInstall();
  }
});
chrome.action.onClicked.addListener(function () {
  chrome.tabs.query({
    url: ['https://www.screena.com/*']
  }, function (tabs) {
    if (tabs.length === 0 || tabs[tabs.length - 1].active) {
      chrome.tabs.create({
        url: 'https://www.screena.com/'
      });
    } else {
      chrome.windows.update(tabs[tabs.length - 1].windowId, {
        focused: true
      });
      chrome.tabs.highlight({
        tabs: tabs[tabs.length - 1].index
      });
    }
  });
});
chrome.runtime.setUninstallURL('https://www.screena.com/detail/uninstall?extId=' + chrome.runtime.id + '&version=' + chrome.runtime.getManifest().version);
;// CONCATENATED MODULE: ./lib/chatSyncController.js







const chatSyncController_sidebarWidth = 600;

function getMatchedTabDetails(match) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({
      url: match
    }, function (tabs) {
      if (tabs.length) {
        resolve({
          tabId: tabs[0].id,
          url: tabs[0].url
        });
      } else {
        reject(new Error('No matching tabs found'));
      }
    });
  });
}

async function getTwitchTab(channel) {
  try {
    const twitchTabs = await findTabs({
      url: [channel ? `https://www.twitch.tv/${channel}*` : `https://www.twitch.tv/*`]
    });
    if (twitchTabs.length === 1) return twitchTabs[0];
    if (twitchTabs.length === 0) throw new Error('failed to find twitchTabs');
    const tabs = await findTabs({
      url: [channel ? `https://www.twitch.tv/${channel}*` : `https://www.twitch.tv/*`, 'https://*.screena.com/*']
    });
    let lastScreenaIndex = tabs.slice().reverse().findIndex(tab => tab.url.includes('screena.com'));
    lastScreenaIndex = lastScreenaIndex >= 0 ? tabs.length - 1 - lastScreenaIndex : lastScreenaIndex;
    let lastTwitchIndexBeforeLastScreena = -1;

    if (lastScreenaIndex !== -1) {
      for (let i = 0; i < lastScreenaIndex; i++) {
        if (!tabs[i].url.includes('screena.com')) {
          lastTwitchIndexBeforeLastScreena = i;
        }
      }
    }

    return lastTwitchIndexBeforeLastScreena >= 0 ? tabs[lastTwitchIndexBeforeLastScreena] : twitchTabs[twitchTabs.length - 1];
  } catch (e) {
    sendErrorLog(e, 'chatSyncController getTwitchTab');
    console.error('getTwitchTab Error:', e);
    throw new Error('failed to find twitch tabs');
  }
}

function sendMessage(tabId, msg) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, msg, response => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

class ChatSyncController {
  constructor() {
    this.id = `ChatSyncController-${Math.random().toString(36).substr(2, 9)}`;
    this.channel = null;
    this.chatTabId = null;
    this.chatSyncPlayerTabId = null;
    this.playlist = null;
    this.syncWithChat = false;
    this.requestChatSyncFailCount = 0;
    this.syncWithChatInterval = null; // To clear the setInterval

    this.sendPlaylistInterval = null; // To clear the setInterval

    this.isChatAlive = false;
    this.screenaOrigin = 'https://www.screena.com';
    this.syncDifferenceInitialValue = -5000;
    this.syncDifference = this.syncDifferenceInitialValue;
    this.messageTimeouts = []; // 저장된 timeout ID들
  }

  async init(channel = null, code = null, screenaOrigin = null) {
    this.clear();
    this.channel = channel;

    if (code) {
      this.playlist = decode(code);
      chrome.storage.local.set({
        lastCodeReceived: code
      });
    }

    if (screenaOrigin) {
      this.screenaOrigin = screenaOrigin;
    }

    try {
      const {
        chatTabId,
        chatSyncPlayerTabId,
        lastCodeReceived
      } = await getLocalStorage(['chatTabId', 'chatSyncPlayerTabId', 'lastCodeReceived']);
      this.chatTabId = chatTabId;
      this.chatSyncPlayerTabId = chatSyncPlayerTabId;
      this.playlist = lastCodeReceived && decode(lastCodeReceived);
      const chatTab = await chrome.tabs.get(this.chatTabId);
      this.channel = new URL(chatTab.url).pathname.split('/')[1] || null; // Get the first segment of the pathname

      const chatSyncPlayerTab = await chrome.tabs.get(this.chatSyncPlayerTabId);

      if (chatTab && chatSyncPlayerTab && this.playlist && this.channel) {
        this.requestChatSync();
        this.syncWithChatInterval && clearInterval(this.syncWithChatInterval);
        this.syncWithChatInterval = setInterval(() => this.requestChatSync(), 5000);
        this.sendPlaylistToPlayer();
        this.sendPlaylistInterval && clearInterval(this.sendPlaylistInterval);
        this.sendPlaylistInterval = setInterval(() => this.sendPlaylistToPlayer(), 5000);
      }
    } catch (e) {
      sendErrorLog(e, 'chatSyncController init');
      console.error('ChatSyncController init error:', e);
    }
  }

  async requestChatSync() {
    let response = null;

    try {
      response = await sendMessage(this.chatTabId, {
        type: 'observeChatMessages',
        channel: this.channel
      });
    } catch (error) {
      sendErrorLog(error, 'chatSyncController sendMessage');
      console.error(`sendMessage failed with error: ${error.message}`);
    }

    if (response === 'success') {
      this.syncWithChat = true;
      this.isChatAlive = true;
      this.requestChatSyncFailCount = 0; // Reset the fail count when the request is successful
    } else if (this.syncWithChat) {
      // Only increase the fail count if syncWithChat is true
      this.requestChatSyncFailCount++;

      if (this.requestChatSyncFailCount >= 3) {
        // Check if the request has failed 3 times in a row
        this.syncWithChat = false;
        this.isChatAlive = false;

        try {
          const tab = await chrome.tabs.get(this.chatTabId);
          this.isChatAlive = tab.url.includes(this.channel);
        } catch (e) {
          sendErrorLog(e, 'chatSyncController requestChatSync');
          console.error(e);
          this.isChatAlive = false;
        }
      }
    }
  }

  async openPlayer(screen, code = '') {
    try {
      const playlist = code ? decode(code) : this.playlist;
      const url = playlist.url;
      let tab;
      let windowId;

      if (this.chatSyncPlayerTabId) {
        try {
          tab = await chrome.tabs.get(this.chatSyncPlayerTabId);
          await chrome.tabs.update(this.chatSyncPlayerTabId, {
            url
          });
          windowId = tab.windowId;
        } catch (error) {
          sendErrorLog(error, 'chatSyncController openPlayer');
          console.error('Error getting existing tab:', error);
        }
      }

      if (!tab) {
        const window = await chrome.windows.create({
          state: 'normal',
          left: screen.left,
          top: screen.top,
          width: screen.width - chatSyncController_sidebarWidth,
          height: screen.height,
          type: 'popup'
        });
        windowId = window.id;
        tab = await chrome.tabs.create({
          url,
          windowId: window.id
        });
      }

      this.chatSyncPlayerTabId = tab.id;
      chrome.storage.local.set({
        chatSyncPlayerTabId: tab.id
      });
      const window = await chrome.windows.get(windowId);
      this.sendPlaylistInterval && clearInterval(this.sendPlaylistInterval);
      this.sendPlaylistInterval = setInterval(() => this.sendPlaylistToPlayer(), 5000);
      await rearrange(async screen => {
        const result = await chrome.windows.update(windowId, {
          state: 'normal',
          left: Math.round(screen[0]),
          top: Math.round(screen[1]),
          width: Math.round(screen[2]),
          height: Math.round(screen[3])
        });
        return [result.left, result.top, result.width, result.height];
      }, [[screen.left, screen.top, screen.width - chatSyncController_sidebarWidth, screen.height], [window.left, window.top, window.width, window.height]]);
    } catch (e) {
      throw new Error('openPlayer Error:', e);
    }
  }

  async focusChatRoom(screen) {
    try {
      const twitchTab = await getTwitchTab(this.channel); // console.log('twitchTab', twitchTab)

      if (!this.channel) {
        this.channel = new URL(twitchTab.url).pathname.split('/')[1] || null; // Get the first segment of the pathname
      }

      googleAnalytics.onJoinStreamingWatchparty(this.channel).catch(() => {
        /* pass */
      });
      this.chatTabId = twitchTab.id;
      chrome.storage.local.set({
        chatTabId: this.chatTabId
      });
      this.syncWithChat = true;
      this.isChatAlive = true;
      this.requestChatSync();
      this.syncWithChatInterval && clearInterval(this.syncWithChatInterval);
      this.syncWithChatInterval = setInterval(() => this.requestChatSync(), 5000);
      const tab = await chrome.tabs.get(this.chatTabId);
      const window = await chrome.windows.get(tab.windowId);
      chrome.windows.update(window.id, {
        focused: true,
        state: 'normal',
        left: screen.left + screen.width - chatSyncController_sidebarWidth,
        top: screen.top,
        width: chatSyncController_sidebarWidth,
        height: screen.height
      });
      chrome.tabs.update(this.chatTabId, {
        highlighted: true
      });
      await sendMessage(this.chatTabId, {
        type: 'rearrange',
        channel: this.channel
      });
    } catch (e) {
      throw new Error(`focusChatRoom Error: ${e.message}`);
    }
  }

  async sendPlaylistToPlayer(interaction) {
    try {
      if (!this.playlist) throw new Error('No playlist is set to be sent to the player.');
      let service;
      let serviceName;

      try {
        const ottData = lib_ott.matchingOTT(this.playlist.url)[0];
        service = ottData.name;
        serviceName = ottData.serviceName;
      } catch (error) {
        throw new Error(`Error matching OTT service: ${this.playlist.url} ${error.message}`);
      }

      const hasPermission = await checkContentScripts(service);

      if (!hasPermission) {
        const servicePermissionUrl = `${this.screenaOrigin}/service-permission?url=${this.playlist.url}&service=${service}&serviceName=${serviceName}`;
        const tab = await chrome.tabs.get(this.chatSyncPlayerTabId);

        if (tab.url !== servicePermissionUrl) {
          await chrome.tabs.update(this.chatSyncPlayerTabId, {
            url: servicePermissionUrl
          });
        }

        throw new Error(`no permission error: '${service}'`);
      }

      const delay = this.playlist.lastVideoEventTime - this.syncDifference - Date.now();
      const currentTime = this.playlist.state === 'playing' ? this.playlist.lastPlayTime - (delay < 0 ? delay : 0) : this.playlist.lastPlayTime;
      const message = {
        type: 'state',
        data: {
          url: this.playlist.url,
          service,
          serviceName,
          state: this.playlist.state,
          currentTime,
          interaction: interaction || this.playlist.state
        },
        settingWidget: true,
        syncDifference: this.syncDifference,
        origin: this.screenaOrigin
      };
      googleAnalytics.onSendPlaylistToPlayer(this.channel, message.data.service, message.data.url).catch(() => {
        /* pass */
      });

      const sendMessageToTab = (resolve, reject) => {
        chrome.tabs.sendMessage(this.chatSyncPlayerTabId, message, response => {
          if (chrome.runtime.lastError) {
            if (this.isChatAlive === false) {
              this.clear();
            }

            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(response);
          }
        });
      };

      return new Promise((resolve, reject) => {
        if (delay > 0) {
          const timeoutId = setTimeout(() => {
            this.messageTimeouts = this.messageTimeouts.filter(id => id !== timeoutId);
            sendMessageToTab(resolve, reject);
          }, delay);
          this.messageTimeouts.push(timeoutId); // timeout ID를 저장
        } else {
          sendMessageToTab(resolve, reject);
        }
      });
    } catch (e) {
      sendErrorLog(e, 'chatSyncController sendPlaylistToPlayer');
      console.error('sendPlaylistToPlayer Error:', e);
    }
  }

  onSyncFromChat(code) {
    this.playlist = decode(code);
    chrome.storage.local.set({
      lastCodeReceived: code
    });
    this.sendPlaylistInterval && clearInterval(this.sendPlaylistInterval);
    this.sendPlaylistToPlayer();
    this.sendPlaylistInterval = setInterval(() => this.sendPlaylistToPlayer(), 5000);
  }

  setSyncDifference({
    reset,
    syncDifference
  }) {
    if (reset) {
      this.syncDifference = this.syncDifferenceInitialValue;
    } else {
      this.syncDifference = syncDifference;
    } // 새로운 동기화 차이를 설정할 때 예약된 모든 메시지를 취소


    this.messageTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.messageTimeouts = []; // 저장된 timeout ID들을 초기화

    this.sendPlaylistToPlayer();
  }

  clear() {
    // console.log('ChatSyncControllerClear', this)
    this.sendPlaylistInterval && clearInterval(this.sendPlaylistInterval);
    this.syncWithChatInterval && clearInterval(this.syncWithChatInterval);
    this.chatTabId = null;
    this.chatSyncPlayerTabId = null;
    this.playlist = null;
    this.channel = null;
    this.syncWithChat = false;
    this.requestChatSyncFailCount = 0;
    this.isChatAlive = false;
  }

}
;// CONCATENATED MODULE: ./lib/timerController.js
function timerController_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








function sendMessageToTab(tabId, message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, response => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

function sendMessageToTabWithRetry(tabId, message, maxRetries = 5, delay = 200) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    function sendMessage() {
      sendMessageToTab(tabId, message).then(response => {
        resolve(response);
      }).catch(error => {
        if (++attempts === maxRetries) {
          reject(error);
        } else {
          setTimeout(sendMessage, delay);
        }
      });
    }

    sendMessage();
  });
}

class TimerController {
  constructor() {
    timerController_defineProperty(this, "updateTimer", async state => {
      try {
        let result;
        {
          const {
            screenaUser,
            anonymousRoomId,
            anonymousUserId
          } = await getLocalStorage(['screenaUser', 'anonymousRoomId', 'anonymousUserId']);
          if (!anonymousRoomId || !anonymousUserId) return false;
          result = await updateAnonymousRoom(anonymousUserId, anonymousRoomId, state, screenaUser?.apiEndPoint, screenaUser?.origin);
          googleAnalytics.onSyncPlaylistToTimer(anonymousRoomId, state);
        }

        if (result === 'invalid_room') {
          await this.create();
          const {
            screenaUser,
            anonymousRoomId,
            anonymousUserId
          } = await getLocalStorage(['screenaUser', 'anonymousRoomId', 'anonymousUserId']);
          if (!anonymousRoomId || !anonymousUserId) return false;
          result = await updateAnonymousRoom(anonymousUserId, anonymousRoomId, state, screenaUser?.apiEndPoint, screenaUser?.origin);
          googleAnalytics.onSyncPlaylistToTimer(anonymousRoomId, state);
        }

        return result;
      } catch (e) {
        sendErrorLog(e, 'timerController updateTimerWithCooldown');
        console.error(e);
        return 'failed';
      }
    });

    timerController_defineProperty(this, "checkUpdateTimerArgsSimilar", (lastArgs, currentArgs) => {
      this.requestPlayerStateCount = 0;
      const last = lastArgs[0];
      const current = currentArgs[0]; // Check if url is the same for last and current data

      const isUrlEqual = last.url === current.url; // Check if state is the same for last and current data

      const isStateEqual = last.state === current.state;
      const isTitleEqual = last.title === current.title; // Calculate duration difference
      // 라이브 스트리밍의 경우 duration이 지속적으로 변할 수 있어서 쿨다운 이상으로 차이가 나면 업데이트 하도록 설정

      const isDurationDiffLessThan60000 = Math.abs(last.duration - current.duration) < 30000; // Calculate time difference and check if it's less than 1000

      const isTimeDifferenceLessThan1000 = current.state !== 'playing' || Math.abs(last.currentTime - last.lastVideoEventTime - (current.currentTime - current.lastVideoEventTime)) < 1000; // Return true only if url, state are the same and time difference is less than 1000

      return isUrlEqual && isStateEqual && isTimeDifferenceLessThan1000 && isDurationDiffLessThan60000 && isTitleEqual;
    });

    timerController_defineProperty(this, "updateTimerWithCooldown", withCooldown(this.updateTimer, 10000, this.checkUpdateTimerArgsSimilar));

    timerController_defineProperty(this, "sendSyncMessageToChat", async state => {
      try {
        // console.log('sendSyncMessageToChat',state);
        const {
          screenaUser,
          anonymousRoomId,
          anonymousUserId
        } = await getLocalStorage(['screenaUser', 'anonymousRoomId', 'anonymousUserId']);
        if (!anonymousRoomId || !anonymousUserId) return;
        const result = await sendSyncMessageToChat(anonymousUserId, anonymousRoomId, state, screenaUser?.apiEndPoint, screenaUser?.origin);
        return result;
      } catch (e) {
        console.error('sendSyncMessageToChatWithCooldown', e);
      }
    });

    timerController_defineProperty(this, "updateSettings", async ({
      syncMessageInterval,
      syncMessageDebounce
    }) => {
      if (syncMessageInterval) {
        this.syncMessageInterval = syncMessageInterval;
        chrome.storage.local.set({
          syncMessageInterval
        });
      }

      if (syncMessageDebounce) {
        this.syncMessageDebounce = syncMessageDebounce;
        chrome.storage.local.set({
          syncMessageDebounce
        });
      }

      this.syncMessageCooldownController.cooldown = this.syncMessageInterval;
      this.sendSyncMessageToChatWithCooldown = debounceAsync(this.syncMessageCooldownController.run.bind(this.syncMessageCooldownController), this.syncMessageDebounce);
    });

    this.id = `TimerController-${Math.random().toString(36).substr(2, 9)}`;
    this.timerTabId = null;
    this.requestPlayerStateInterval = null;
    this.requestPlayerStateCount = 0;
    this.syncMessageInterval = 120 * 1000;
    this.syncMessageDebounce = 5000;
    this.syncMessageCooldownController = new CooldownController(this.sendSyncMessageToChat, this.syncMessageInterval, this.checkSyncMessageSimilar);
    this.sendSyncMessageToChatWithCooldown = debounceAsync(this.syncMessageCooldownController.run.bind(this.syncMessageCooldownController), this.syncMessageDebounce);
  }

  async init() {
    if (this.timerTabId === null) {
      try {
        this.ga_client_id = (await getLocalStorage('ga_client_id')).ga_client_id || '';
        this.syncMessageInterval = (await getLocalStorage(['syncMessageInterval']))?.syncMessageInterval || 120 * 1000;
        this.syncMessageDebounce = (await getLocalStorage(['syncMessageDebounce']))?.syncMessageDebounce || 5000;
        this.syncMessageCooldownController.cooldown = this.syncMessageInterval;
        this.sendSyncMessageToChatWithCooldown = debounceAsync(this.syncMessageCooldownController.run.bind(this.syncMessageCooldownController), this.syncMessageDebounce);
        this.timerTabId = (await getLocalStorage(['timerTabId'])).timerTabId;
        const timerTab = await chrome.tabs.get(this.timerTabId);
        if (!timerTab) return;
        this.requestPlayerStateCount = 0;
        this.requestPlayerStateInterval && clearInterval(this.requestPlayerStateInterval);
        this.requestPlayerStateInterval = setInterval(() => this.requestPlayerState(), 3000);
      } catch (e) {
        sendErrorLog(e, 'timerController init');
        console.error('TimerController init Error:', e);
      }
    }
  }

  async open(tab) {
    // console.log('TimerController open', this, tab)
    const granted = await registerContentScripts(tab.url, true);
    if (!granted) return new Error();
    await sendMessageToTabWithRetry(tab.id, {
      type: 'openTimer'
    });
    this.timerTabId = tab.id;
    chrome.storage.local.set({
      timerTabId: tab.id
    });
    const {
      anonymousRoomId,
      anonymousUserId,
      apiEndPoint,
      origin
    } = await this.getRoomInfo();

    if (!this.ga_client_id) {
      this.ga_client_id = (await getLocalStorage('ga_client_id')).ga_client_id || '';
    }

    const msg = {
      type: 'updateTimerWidget',
      origin,
      apiEndPoint,
      anonymousRoomId,
      anonymousUserId,
      openModal: true,
      forceUpdate: true,
      ga_client_id: this.ga_client_id
    };
    googleAnalytics.openTimer({
      anonymousRoomId,
      url: tab.url,
      service: lib_ott.matchingOTT(tab.url)
    });
    await sendMessageToTabWithRetry(tab.id, msg);
    this.requestPlayerStateCount = 0;
    this.requestPlayerStateInterval && clearInterval(this.requestPlayerStateInterval);
    this.requestPlayerStateInterval = setInterval(() => this.requestPlayerState(), 3000);
  }

  async onPlayerUpdated(tab) {
    // console.log('TimerController onPlayerUpdated', this, tab)
    const permission = await checkContentScripts(tab.url);
    if (!permission) return;
    const response = await sendMessageToTab(tab.id, {
      type: 'openTimer'
    });

    if (response) {
      const {
        anonymousRoomId,
        apiEndPoint,
        origin,
        anonymousUserId
      } = await this.getRoomInfo();
      const msg = {
        type: 'updateTimerWidget',
        origin,
        apiEndPoint,
        anonymousRoomId,
        anonymousUserId,
        openModal: false,
        ga_client_id: this.ga_client_id
      };
      sendMessageToTabWithRetry(tab.id, msg);
    }
  }

  async create() {
    // console.log('TimerController create', this)
    const {
      screenaUser
    } = await getLocalStorage(['screenaUser']);
    const {
      roomId,
      uid
    } = await createAnonymousRoom(screenaUser?.apiEndPoint);
    chrome.storage.local.set({
      anonymousRoomId: roomId,
      anonymousUserId: uid
    });
    googleAnalytics.createAnonymousAccount({
      roomId
    });
    sendMessageToTab(this.timerTabId, {
      type: 'updateTimerWidget',
      origin: screenaUser?.origin || '',
      apiEndPoint: screenaUser?.apiEndPoint || '',
      anonymousRoomId: roomId,
      anonymousUserId: uid,
      ga_client_id: this.ga_client_id
    });
    return {
      origin: screenaUser?.origin || '',
      apiEndPoint: screenaUser?.apiEndPoint || '',
      anonymousRoomId: roomId,
      anonymousUserId: uid
    };
  }

  async getRoomInfo() {
    const {
      anonymousRoomId,
      anonymousUserId,
      screenaUser
    } = await getLocalStorage(['anonymousRoomId', 'anonymousUserId', 'screenaUser']); // console.log('getRoomInfo', anonymousRoomId, anonymousUserId, screenaUser)

    if (anonymousRoomId && anonymousUserId) {
      return {
        origin: screenaUser?.origin || undefined,
        apiEndPoint: screenaUser?.apiEndPoint || undefined,
        anonymousRoomId,
        anonymousUserId
      };
    } else return await this.create();
  }

  checkSyncMessageSimilar(lastArgs, currentArgs) {
    this.requestPlayerStateCount = 0;
    const last = lastArgs[0];
    const current = currentArgs[0]; // Check if url is the same for last and current data

    const isUrlEqual = last.url === current.url; // Check if state is the same for last and current data

    const isStateEqual = last.state === current.state; // Calculate time difference and check if it's less than 1000

    const isTimeDifferenceLessThan1000 = current.state !== 'playing' || Math.abs(last.currentTime - last.lastVideoEventTime - (current.currentTime - current.lastVideoEventTime)) < 1000; // Return true only if url, state are the same and time difference is less than 1000

    return isUrlEqual && isStateEqual && isTimeDifferenceLessThan1000;
  }

  async onMessageFromTimerTab(msg) {
    try {
      console.log('onMessageFromTimerTab', this, msg.data);
      const response = await this.updateTimerWithCooldown(msg.data);
      await this.sendSyncMessageToChatWithCooldown(msg.data);
      return response;
    } catch (e) {
      if (!e.toString().includes('Cooldown')) console.error('onMessageFromTimerTab', e);
    }
  }

  async connectTwitch(msg) {
    try {
      const {
        anonymousRoomId,
        anonymousUserId,
        apiEndPoint
      } = await this.getRoomInfo();

      if (msg.data.room_id !== anonymousRoomId) {
        console.error('roomId mismatch', msg.data.room_id, anonymousRoomId);
        return 'failed';
      } // console.log('connentWithTwitch')


      const result = await connentWithTwitch(anonymousUserId, anonymousRoomId, msg.data.code, msg.data.redirect_uri, apiEndPoint); // console.log('connentWithTwitch result', result)

      if (result) {
        const {
          anonymousRoomId,
          apiEndPoint,
          origin
        } = await this.getRoomInfo();
        sendMessageToTab(this.timerTabId, {
          type: 'updateTimerWidget',
          origin,
          apiEndPoint,
          anonymousRoomId,
          anonymousUserId,
          openModal: false,
          forceUpdate: true,
          ga_client_id: this.ga_client_id
        });
        return 'success';
      }

      return 'failed';
    } catch (e) {
      console.error('onConnectTwitch', e);
    }
  }

  async disconnectTwitch() {
    try {
      const {
        anonymousRoomId,
        anonymousUserId,
        apiEndPoint
      } = await this.getRoomInfo();
      const response = await disconnectWithTwitch(anonymousUserId, anonymousRoomId, apiEndPoint);

      if (response) {
        return 'success';
      }

      return 'failed';
    } catch (e) {
      console.error('onDisconnectTwitch', e);
    }
  }

  async requestPlayerState() {
    // console.log('TimerController requestPlayerState', this)
    const {
      anonymousRoomId,
      anonymousUserId,
      apiEndPoint,
      origin
    } = await this.getRoomInfo();
    this.requestPlayerStateCount += 1;

    if (this.requestPlayerStateCount > 5) {
      try {
        const timerTab = await chrome.tabs.get(this.timerTabId);
        if (!timerTab) clearInterval(this.requestPlayerStateInterval);else if (this.requestPlayerStateCount > 1000) {
          clearInterval(this.requestPlayerStateInterval);
          this.requestPlayerStateCount = 0;
          await sendMessageToTabWithRetry(this.timerTabId, {
            type: 'closeTimer'
          });
        }
      } catch (e) {
        console.error('requestPlayerState error', e);
        clearInterval(this.requestPlayerStateInterval);
      }
    }

    sendMessageToTab(this.timerTabId, {
      type: 'updateTimerWidget',
      origin,
      apiEndPoint,
      anonymousRoomId,
      anonymousUserId,
      openModal: false,
      forceUpdate: false,
      ga_client_id: this.ga_client_id
    });
  }

}
;// CONCATENATED MODULE: ./lib/timer.js







const chatSyncInstance = new ChatSyncController();
chatSyncInstance.init();
const timerInstance = new TimerController();
timerInstance.init();
const excludeOtts = ['danet', 'hbogo', 'hotstar', 'kktv', 'linetv', 'pops', 'zee5'];
const contextCreateProperties = {
  id: 'openTimer',
  title: chrome.i18n.getMessage('contextMenusTimer'),
  contexts: ['all'],
  documentUrlPatterns: lib_ott.data.reduce((acc, ott) => {
    if (!excludeOtts.includes(ott.name)) {
      return acc.concat(ott.contentScripts.map(script => script.matches).flat());
    }

    return acc;
  }, [])
};
chrome.contextMenus.create(contextCreateProperties, () => {
  console.log('contextMenus create', contextCreateProperties);
});
chrome.contextMenus.onClicked.addListener(async function (info, tab) {
  if (info.menuItemId === 'openTimer') {
    timerInstance.open(tab);
  }
});
async function onStateTimer(msg, sender, sendResponse) {
  if (sender.tab.id !== timerInstance.timerTabId || !(msg.from === 'content' || msg.from === 'player')) return false;
  console.log('onStateTimer', timerInstance);
  const result = await timerInstance.onMessageFromTimerTab(msg);
  sendResponse(result);
  /*   timerInstance
    .onupdateTimerWidget(msg)
    .then((response) => sendResponse(response))
    .catch((e) => {
      console.error('onStateTimer Error:', e)
    }) */
}
async function onConnectTwitch(msg, sender, sendResponse) {
  if (!checkIfScreena(sender.url)) {
    sendErrorLog(sender.url, 'timer onConnectTwitch');
    console.error('connectTwitch failed wrong sender url', sender.url);
    return sendResponse(false);
  }

  const response = await timerInstance.connectTwitch(msg);
  msg.close && chrome.tabs.remove(sender.tab.id);
  sendResponse(response);
}
async function onDisconnectTwitch(msg, sender, sendResponse) {
  const response = await timerInstance.disconnectTwitch();
  sendResponse(response);
}
async function onJoinSyncAnonymous(msg, sender, sendResponse) {
  try {
    // console.log('onJoinSyncAnonymous', msg, sender, sendResponse)
    const code = msg.code;
    const screen = msg.screen;
    const playlist = decode(code);
    const origin = msg.origin || sender.origin;
    const service = playlist.service || lib_ott.matchingOTT(playlist.url)[0].name;
    const channel = msg.channel || playlist.channel;
    const [isTwitchContentRegistered, isServiceContentRegistered] = await Promise.all([checkContentScripts('twitch'), checkContentScripts(service)]);

    if (!isTwitchContentRegistered || !isServiceContentRegistered) {
      let errorMessage = `no permission error:`;
      if (!isTwitchContentRegistered) errorMessage += ' twitch';
      if (!isServiceContentRegistered) errorMessage += ` ${service}`;
      sendErrorLog(errorMessage, 'timer onJoinSyncAnonymous errorMessage');
      console.error(errorMessage);
      sendResponse(errorMessage);
      return;
    }

    await chatSyncInstance.init(channel, code, origin);
    await chatSyncInstance.focusChatRoom(screen);
    await chatSyncInstance.openPlayer(screen);
    chrome.tabs.remove(sender.tab.id);
    return sendResponse('success'); // console.log('onJoinSyncAnonymousResult', chatSyncInstance)
  } catch (e) {
    sendErrorLog(e, 'timer onJoinSyncAnonymous');
    console.error('onJoinSyncAnonymous', e);
    return sendResponse(`onJoinSyncAnonymous: ${e.message}`);
  }
}
async function onObservedChatMessage(msg, sender, sendResponse) {
  const {
    code,
    channel
  } = msg.data; // console.log('onObservedChatMessage', msg.data, chatSyncInstance)

  if (chatSyncInstance.channel === channel) {
    chatSyncInstance.onSyncFromChat(code);
    sendResponse('success');
    return;
  }

  sendResponse();
}
async function onSetSyncDifference(msg, sender, sendResponse) {
  if (sender.tab.id !== chatSyncInstance.chatSyncPlayerTabId) {
    sendResponse();
    return;
  }

  chatSyncInstance.setSyncDifference(msg.data);
}
async function onUpdateTimerSettings(msg, sender, sendResponse) {
  const settings = {};
  if (msg.syncMessageInterval) settings.syncMessageInterval = msg.syncMessageInterval;
  if (msg.syncMessageDebounce) settings.syncMessageDebounce = msg.syncMessageDebounce;
  timerInstance.updateSettings(settings);
  sendResponse(settings);
}
async function onGetTimerSetting(msg, sender, sendResponse) {
  const settings = {
    syncMessageInterval: timerInstance.syncMessageInterval,
    syncMessageDebounce: timerInstance.syncMessageDebounce
  };
  sendResponse(settings);
}
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete') return;
  if (timerInstance.timerTabId !== tabId) return;
  timerInstance.onPlayerUpdated(tab);
});
;// CONCATENATED MODULE: ./background.js







const beforeVideoData = new Map();
const listenerIdonMessageExternal = Math.random().toString(36).substr(2, 9);
chrome.runtime.onMessageExternal.addListener(function (msg, sender, sendResponse) {
  console.log(`onMessageExternal ${listenerIdonMessageExternal}`, msg.type, msg, sender);

  switch (msg.type) {
    case 'version':
      sendResponse({
        version: chrome.runtime.getManifest().version
      });
      break;

    case 'join':
      Promise.all([(async () => {
        const tab = await PlayerTab.tab();

        if (tab && tab.windowId !== sender.tab.windowId) {
          console.log('PlayerTab update');
          await PlayerTab.update(msg);
        } else {
          console.log('PlayerTab open');
          await PlayerTab.open(msg);
        }
      })(), (async () => {
        const tab = await SideTab.tab();

        if (tab && tab.windowId !== sender.tab.windowId) {
          console.log('SideTab update');
          await SideTab.update(msg);
        } else {
          console.log('SideTab open');
          await SideTab.open(msg);
        }
      })()]).then(() => {
        console.log('joined watchparty');
        sendResponse('success');
      }).catch(e => {
        sendErrorLog(e, 'backgroun onMessageExternal join');
        console.error(e);
        if (String(e).includes('no permission error')) return sendResponse(String(e));
        return sendResponse();
      });
      break;
    // notify sidebar that content script in plyaerTab is loaded

    case 'playerReady':
      PlayerTab.tabId().then(tabId => {
        if (tabId === sender.tab.id) SideTab.sendMessage(msg).then(response => sendResponse(response));
      });
      break;

    case 'startSync':
      PlayerTab.sendMessage(msg).then(response => sendResponse(response)).catch(e => {
        sendErrorLog(e, 'background onMessageExternal startSync');
        console.error(e);
        if (String(e).includes('no permission error')) return sendResponse(String(e));
      });
      break;

    case 'selectService':
      ;
      (async () => {
        const _msg = Object.assign({}, msg);

        _msg.serviceSelectUrl = updateServiceNameInUrl(_msg.serviceSelectUrl);

        if (_msg.from === 'installer') {
          chrome.windows.update(sender.tab.windowId, {
            focused: true
          });
          chrome.tabs.update(sender.tab.id, {
            url: _msg.serviceSelectUrl,
            highlighted: true
          });
          return;
        }

        const tab = await PlayerTab.tab();

        if (tab) {
          await PlayerTab.update(_msg);
        } else {
          await PlayerTab.open(_msg);
        }
      })().then(success => {
        if (success) return sendResponse('success');
      }).catch(e => {
        sendErrorLog(e, 'background onMessageExternal selectService');
        console.error(e);
        if (String(e).includes('no permission error')) return sendResponse(String(e));
        return sendResponse();
      });
      break;

    case 'reopenPlayer':
      PlayerTab.tab().then(tab => {
        if (tab && tab.windowId !== sender.tab.windowId) {
          return PlayerTab.update(msg);
        } else {
          return PlayerTab.open(msg);
        }
      }).then(() => {
        sendResponse('success');
      }).catch(e => {
        sendErrorLog(e, 'background onMessageExternal reopenPlayer');
        console.error(e);
        sendResponse();
      });
      break;

    case 'isPlayerTab':
      PlayerTab.tabId().then(tabId => {
        sendResponse(tabId === sender.tab.id);
      });
      break;

    case 'login':
      console.log('onLogin', msg.data);
      chrome.storage.local.set({
        screenaUser: msg.data
      });
      break;

    case 'logout':
      console.log('logout');
      chrome.storage.local.set({
        screenaUser: undefined
      });
      break;

    case 'isRecording':
      chrome.storage.local.get(['screenaUser'], function (result) {
        isRecording(result.screenaUser, msg.data, function (result) {
          return sendResponse(result);
        });
      });
      break;

    case 'records':
      chrome.storage.local.get(['screenaUser'], function (result) {
        sendRecords(result.screenaUser, msg.data);
        return sendResponse('success');
      });
      break;

    case 'registerContentScripts':
      registerContentScripts(msg.service || msg.url, true).then(success => success ? sendResponse(success) : sendResponse());
      break;

    case 'requestUpdateTimer':
      onStateTimer(msg, sender, sendResponse);
      break;

    case 'startBroadcast':
    case 'state':
      ;
      (async () => {
        if (msg.from === 'content' || msg.from === 'player') {
          if (sender.tab.id === (await PlayerTab.tabId())) {
            const response = await SideTab.sendMessage(msg);
            return sendResponse(response);
          }
        } else if (msg.from === 'rtc' || msg.from === 'sidebar') {
          if (sender.tab.id === (await SideTab.tabId())) {
            const response = await PlayerTab.sendMessage(msg);
            return sendResponse(response);
          }
        }
      })().catch(e => {
        sendErrorLog(e, 'background onMessageExternal state');
        console.error('onProcessStateError', e);
        if (String(e).includes('no permission error')) return sendResponse(String(e));
        return sendResponse(null);
      });
      return;

    case 'checkVideoSync':
      console.log('checkVideoSync', msg, sender, sendResponse);

      if (Object.keys(msg.data).length === 0) {
        return;
      }

      if (beforeVideoData.size === 0) {
        beforeVideoData.set('host', msg.data.host);
        beforeVideoData.set('guest', msg.data.guest);
        return;
      }

      onCheckVideoSync(beforeVideoData, msg, sender, sendResponse);
      return;

    case 'connectTwitch':
      onConnectTwitch(msg, sender, sendResponse);
      return;

    case 'disconnectTwitch':
      onDisconnectTwitch(msg, sender, sendResponse);
      return;

    case 'joinSyncAnonymous':
      onJoinSyncAnonymous(msg, sender, sendResponse);
      return;

    case 'setSyncDifference':
      onSetSyncDifference(msg, sender, sendResponse);
      return;

    case 'getTimerSettings':
      onGetTimerSetting(msg, sender, sendResponse);
      return;

    case 'updateTimerSettings':
      onUpdateTimerSettings(msg, sender, sendResponse);
      return;

    case 'reportEvent':
      googleAnalytics.report(msg.data?.events || [msg.data?.event]);
      return;
  }
});
const listenerIdonMessage = Math.random().toString(36).substr(2, 9);
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log(`onMessage ${listenerIdonMessage}`, msg.type, msg, sender);

  switch (msg.type) {
    case 'observedChatMessage':
      onObservedChatMessage(msg, sender, sendResponse);
      break;

    default:
      sendResponse();
  }
});
})();

/******/ })()
;