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
/* harmony default export */ const ott = ({
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
;// CONCATENATED MODULE: ./ott/ott-content.js
// extension content script for ott service. this is part of extension which can access chrome.runtime api

const service = ott.matchingOTT(window.location.href)[0];

function injectScripts(id, scripts) {
  const s = document.createElement('script');
  s.id = id;
  s.src = chrome.runtime.getURL(scripts);

  if (!document.getElementById(s.id)) {
    ;
    (document.head || document.documentElement).append(s);
  }

  console.log(s);
}

if (!window.screenaScriptsInjected) {
  console.log('try to inject ', service);
  service.injectScripts.forEach((scripts, index) => injectScripts(`screena-inject-scripts-#${index}`, scripts));
  window.screenaScriptsInjected = true;
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  switch (msg.type) {
    case 'resize':
    case 'isopen':
      sendResponse({
        screen: {
          left: window.screen.availLeft,
          top: window.screen.availTop,
          height: window.screen.availHeight,
          width: window.screen.availWidth
        }
      });
      break;

    default:
      window.postMessage(msg, window.location.href);
      sendResponse(service.name);
  }
});
})();

/******/ })()
;