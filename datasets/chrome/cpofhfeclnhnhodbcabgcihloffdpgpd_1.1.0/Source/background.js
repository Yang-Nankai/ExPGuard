/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Events.js"
/*!***********************!*\
  !*** ./src/Events.js ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OnInstalledReason: () => (/* binding */ OnInstalledReason),
/* harmony export */   OnUpdateReason: () => (/* binding */ OnUpdateReason),
/* harmony export */   getUserUid: () => (/* binding */ getUserUid),
/* harmony export */   registerContentScripts: () => (/* binding */ registerContentScripts)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var getUserUid = function getUserUid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};
var OnInstalledReason = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var data;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          data = {
            domain: 'https://custom-cursor.com/cursor-trails',
            collections: [{
              "id": 1,
              "name": "Sparkles & Twinkles",
              "description": "Sparkles & Twinkles Collection is a set of styles for Custom Cursor Trails that add a variety of glittering and sparkling effects to the cursor trail. This collection includes styles like Gold Sparkles, Silver Sparkles, Blue Sparkles, and Color Sparkles that add bright and vibrant colors along with shimmering effects. The collection also includes styles like Twinkle, which creates a gentle and subtle twinkle effect, and Galaxy, which adds a mesmerizing trail of stars to the cursor. With this collection, you can enhance your browsing experience with a variety of dazzling and enchanting effects that will make your cursor trail stand out.",
              "slug": "sparkles-and-twinkles",
              "short_description": "A collection of bright and shiny trails in Cursor Trails that add saturation and interactivity to the cursor on your website. Let your visitors enjoy the beautiful trail effect",
              "url": "https://custom-cursor.com/cursor-trails/sparkles-and-twinkles",
              "image": "",
              "items": [{
                "id": 1,
                "name": "Gold Sparkles",
                "slug": "gold-sparkles",
                "short_description": "Gold Sparkles Cursor Trail is a style for Custom Cursor Trails that adds shimmering gold sparkles to the cursor trail. Each movement of the cursor leaves a trail of bright and stunning golden sparkles that create vivid and impressive transitions on the screen. This style adds luxury and exclusivity to your browsing experience and may be an ideal choice for those who love sparkling and opulent effects.",
                "image": "https://custom-cursor.com/cursortrails/images/patterns/gold-sparkle.svg",
                "pattern": "goldSparkles",
                "url": "https://custom-cursor.com/cursor-trails/sparkles-and-twinkles/gold-sparkles"
              }, {
                "id": 2,
                "name": "Silver Sparkles",
                "slug": "silver-sparkles",
                "short_description": "Silver Sparkles Cursor Trail is a style for Custom Cursor Trails that adds shiny silver sparkles to the cursor trail. Each movement of the cursor leaves a trail of bright silver sparkles that create wonderful gradients and transitions on the screen. This style adds elegance and subtlety to your browsing experience and may be an ideal choice for those who are looking for a beautiful yet restrained effect for their cursor.",
                "image": "https://custom-cursor.com/cursortrails/images/patterns/silver-sparkle.svg",
                "pattern": "silverSparkles",
                "url": "https://custom-cursor.com/cursor-trails/sparkles-and-twinkles/silver-sparkles"
              }, {
                "id": 3,
                "name": "Color Sparkles",
                "slug": "color-sparkles",
                "short_description": "Color Sparkles Trail is a style for Custom Cursor Trails that adds bright and colorful sparkles to the cursor trail. Each movement of the cursor leaves a trail of beautiful colored sparkles that create incredible gradients and transitions on the screen. This style adds a lot of colors and vibrancy to your browsing experience and may be an ideal choice for those who love bright and colorful effects.",
                "image": "https://custom-cursor.com/cursortrails/images/patterns/color-sparkle.svg",
                "pattern": "colorSparkles",
                "url": "https://custom-cursor.com/cursor-trails/sparkles-and-twinkles/color-sparkles"
              }, {
                "id": 4,
                "name": "Blue Sparkles",
                "slug": "blue-sparkles",
                "short_description": "Blue Sparkles Cursor Trail is a style for Custom Cursor Trails that adds shiny blue sparkles to the cursor trail. Each movement of the cursor leaves a trail of beautiful blue sparkles that create stunning gradients and transitions on the screen. This style adds a unique freshness and distinctiveness to your browsing experience and may be an ideal choice for those who love blue shades and sparkling effects.",
                "image": "https://custom-cursor.com/cursortrails/images/patterns/blue-sparkle.svg",
                "pattern": "blueSparkles",
                "url": "https://custom-cursor.com/cursor-trails/sparkles-and-twinkles/blue-sparkles"
              }, {
                "id": 5,
                "name": "Glitter",
                "slug": "glitter",
                "short_description": "Glitter Trail is an effect for Custom Cursor Trails that adds shiny sparkles to the cursor trail. Each movement of the cursor leaves a trail of colorful sparkles that create stunning gradients and shades on the screen. This effect adds a lot of light and shine to your browsing experience and may be an ideal choice for those who love shiny and luxurious effects.",
                "image": "https://custom-cursor.com/cursortrails/images/patterns/glitter.svg",
                "pattern": "glitter",
                "url": "https://custom-cursor.com/cursor-trails/sparkles-and-twinkles/glitter"
              }, {
                "id": 6,
                "name": "Color Glitter",
                "slug": "color-glitter",
                "short_description": "Color Glitter Trail is a style for Custom Cursor Trails that adds sparkles and colorful gradients to the cursor trail. Each movement of the cursor is accompanied by bright, colorful sparkles, adding liveliness and energy to your browsing experience on the web.",
                "image": "https://custom-cursor.com/cursortrails/images/patterns/color-glitter.svg",
                "pattern": "colorGlitter",
                "url": "https://custom-cursor.com/cursor-trails/sparkles-and-twinkles/color-glitter"
              }, {
                "id": 7,
                "name": "Gold Stars",
                "slug": "gold-star",
                "short_description": null,
                "image": "https://custom-cursor.com/cursortrails/images/patterns/gold-star.svg",
                "pattern": "goldStars",
                "url": "https://custom-cursor.com/cursor-trails/sparkles-and-twinkles/gold-star",
                animationType: "flash",
                duration: 1000
              }, {
                "id": 8,
                "name": "Silver Stars",
                "slug": "silver-star",
                "short_description": "Silver Stars Trail is a style for Custom Cursor Trails that adds shimmering silver stars to the cursor trail. Each movement of the cursor leaves a trail of beautiful silver stars that create a smooth and gentle intersection on the screen. This style adds elegance and enchantment to your browsing experience and may be an ideal choice for those who love bright, gentle effects.\r\n\r\n\r\n",
                "image": "https://custom-cursor.com/cursortrails/images/patterns/silver-star.svg",
                "pattern": "silverStars",
                "url": "https://custom-cursor.com/cursor-trails/sparkles-and-twinkles/silver-star"
              }, {
                "id": 9,
                "name": "Color Stars",
                "slug": "color-star",
                "short_description": null,
                "image": "https://custom-cursor.com/cursortrails/images/patterns/color-star.svg",
                "pattern": "colorStars",
                "url": "https://custom-cursor.com/cursor-trails/sparkles-and-twinkles/color-star",
                animationType: "flash",
                duration: 1000
              }, {
                "id": 10,
                "name": "Blue Stars",
                "slug": "blue-star",
                "short_description": null,
                "image": "https://custom-cursor.com/cursortrails/images/patterns/blue-star.svg",
                "pattern": "blueStars",
                "url": "https://custom-cursor.com/cursor-trails/sparkles-and-twinkles/blue-star",
                animationType: "flash",
                duration: 1000
              }, {
                "id": 11,
                "name": "Blue Stars 2",
                "slug": "blue-star-2",
                "short_description": null,
                "image": "https://custom-cursor.com/cursortrails/images/patterns/blue-moon.svg",
                "pattern": "blueStars2",
                "url": "https://custom-cursor.com/cursor-trails/sparkles-and-twinkles/blue-star-2",
                animationType: "flash",
                duration: 1000
              }, {
                "id": 12,
                "name": "Gold Stars 2",
                "slug": "gold-star-2",
                "short_description": null,
                "image": "https://custom-cursor.com/cursortrails/images/patterns/gold-moon.svg",
                "pattern": "goldStars2",
                "url": "https://custom-cursor.com/cursor-trails/sparkles-and-twinkles/gold-star-2",
                animationType: "flash",
                duration: 1000
              }]
            }],
            size: 32,
            current: {
              "id": 1,
              "name": "Gold Sparkles",
              "slug": "gold-sparkles",
              "short_description": "Gold Sparkles Cursor Trail is a style for Custom Cursor Trails that adds shimmering gold sparkles to the cursor trail. Each movement of the cursor leaves a trail of bright and stunning golden sparkles that create vivid and impressive transitions on the screen. This style adds luxury and exclusivity to your browsing experience and may be an ideal choice for those who love sparkling and opulent effects.",
              "image": "https://custom-cursor.com/cursortrails/images/patterns/gold-sparkle.svg",
              "pattern": "goldSparkles",
              "url": "https://custom-cursor.com/cursor-trails/sparkles-and-twinkles/gold-sparkles",
              animationType: "gust",
              duration: 1000,
              step: 2
            },
            version: chrome.runtime.getManifest().version,
            favorites: [],
            di: new Date().getTime(),
            uid: getUserUid(),
            animationType: "gust",
            duration: 1000,
            isEnable: true
          };
          chrome.storage.local.set(data, function () {
            chrome.tabs.create({
              url: "https://custom-cursor.com/cursor-trails/success?utm_source=ext&utm_medium=install&utm_campaign=sussess"
            });
            chrome.tabs.query({}, function (tabs) {
              tabs.forEach(function (tab) {
                chrome.scripting.executeScript({
                  target: {
                    tabId: tab.id
                  },
                  files: ['content.js']
                }, function () {});
              });
            });
            return true;
          });
        case 1:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function OnInstalledReason() {
    return _ref.apply(this, arguments);
  };
}();
var OnUpdateReason = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          chrome.storage.local.set({
            du: new Date().getTime(),
            size: 32,
            rotator: {
              status: false,
              type: 'request',
              value: 60
            }
          }, function () {
            //chrome.tabs.create({url: `https://custom-cursor.com/en/packs?utm_source=ext&utm_medium=install&utm_campaign=install_succesful`})
            return true;
          });
        case 1:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function OnUpdateReason() {
    return _ref2.apply(this, arguments);
  };
}();
var registerContentScripts = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var props;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return chrome.scripting.unregisterContentScripts();
        case 1:
          props = {
            'matches': ['*://*/*'],
            'allFrames': true,
            'matchOriginAsFallback': true,
            'runAt': 'document_start'
          };
          _context3.n = 2;
          return chrome.scripting.registerContentScripts([_objectSpread({
            'id': 'cursor',
            'js': ['content.js'],
            'world': 'ISOLATED'
          }, props)]);
        case 2:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return function registerContentScripts() {
    return _ref3.apply(this, arguments);
  };
}();


/***/ },

/***/ "./src/Notification.js"
/*!*****************************!*\
  !*** ./src/Notification.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkAlarm: () => (/* binding */ checkAlarm),
/* harmony export */   fetchDataNotification: () => (/* binding */ fetchDataNotification),
/* harmony export */   initAlarm: () => (/* binding */ initAlarm)
/* harmony export */ });
/* harmony import */ var _actions_getConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions/getConfig */ "./src/actions/getConfig.js");

var initAlarm = function initAlarm() {
  chrome.alarms.create("noSleep", {
    periodInMinutes: 1
  });
  chrome.alarms.onAlarm.addListener(fetchDataNotification);
  checkAlarm();
};
var fetchDataNotification = function fetchDataNotification(alarm) {
  if (alarm.name == "checkNotification") {
    fetch("https://custom-cursor.com/api/notification/custom-cursor-trails/".concat(uid), {
      cors: 'no-cors',
      method: 'POST'
    }).then(function (e) {
      return e.json();
    }).then(function (data) {});
  }
  if (alarm.name == 'showNotification') {
    chrome.notifications.create('Hi', {
      type: 'basic',
      iconUrl: '/logo.png',
      title: 'New cursor trails ',
      message: 'hi',
      priority: 2
    });
  }
  if (alarm.name == 'customCursorNotification') {}
};
function checkAlarm() {
  try {
    chrome.alarms.getAll(function (alarms) {
      var hasAlarm = alarms.some(function (a) {
        return a.name == "rotationTime";
      });
      if (!hasAlarm) {
        (0,_actions_getConfig__WEBPACK_IMPORTED_MODULE_0__.getConfig)().then(function (_ref) {
          var rotator = _ref.rotator;
        } /*if (rotator.status && rotator.type == 'time') {
              chrome.alarms.create("rotationTime", {periodInMinutes: (rotator.value / 60)});
          }*/);
      }
    });
  } catch (e) {}
}


/***/ },

/***/ "./src/actions/getConfig.js"
/*!**********************************!*\
  !*** ./src/actions/getConfig.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getConfig: () => (/* binding */ getConfig),
/* harmony export */   setConfig: () => (/* binding */ setConfig)
/* harmony export */ });
var getConfig = function getConfig() {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get(function (items) {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(items);
    });
  });
};
var setConfig = function setConfig(data) {
  return new Promise(function (resolve, reject) {
    try {
      chrome.storage.local.set(data, function () {
        resolve({
          status: true,
          data: data
        });
      });
    } catch (ex) {
      reject(ex);
    }
  });
};


/***/ },

/***/ "./src/actions/getInstalled.js"
/*!*************************************!*\
  !*** ./src/actions/getInstalled.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getInstalled: () => (/* binding */ getInstalled)
/* harmony export */ });
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var getInstalled = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          chrome.storage.local.get(['collections', 'version', 'uid'], function (_ref2) {
            var collections = _ref2.collections,
              version = _ref2.version,
              uid = _ref2.uid;
            return {
              collections: collections,
              version: version,
              uid: uid,
              action: 'get_installed_collection'
            };
          });
        case 1:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function getInstalled() {
    return _ref.apply(this, arguments);
  };
}();


/***/ }

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
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Events */ "./src/Events.js");
/* harmony import */ var _actions_getInstalled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions/getInstalled */ "./src/actions/getInstalled.js");
/* harmony import */ var _actions_getConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/getConfig */ "./src/actions/getConfig.js");
/* harmony import */ var _Notification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Notification */ "./src/Notification.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }




chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    (0,_Events__WEBPACK_IMPORTED_MODULE_0__.OnInstalledReason)().then(function (response) {});
  } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    (0,_Events__WEBPACK_IMPORTED_MODULE_0__.OnUpdateReason)().then(function (response) {});
  }
});
chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
  (0,_actions_getConfig__WEBPACK_IMPORTED_MODULE_2__.getConfig)().then(/*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(storage) {
      var data, collections, _data, current, _data2, _data3, _data4, _data5, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _t = request.action;
            _context.n = _t === "stop" ? 1 : _t === "start" ? 2 : _t === "changeTrails" ? 3 : _t === "getInstalled" ? 4 : _t === "getConfig" ? 4 : _t === "addItem" ? 5 : _t === "setCurrent" ? 6 : _t === "setPattern" ? 6 : _t === "setItem" ? 7 : _t === "setAnimation" ? 8 : _t === "setDuration" ? 9 : _t === "addCollection" ? 10 : _t === "setConfig" ? 11 : 13;
            break;
          case 1:
            chrome.tabs.query({
              active: true,
              currentWindow: true
            }, function (tabs) {
              if (tabs && tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                  action: "stop"
                }, function (content) {
                  sendResponse({
                    status: true,
                    action: 'stop',
                    content: content
                  });
                });
              } else {
                sendResponse({
                  status: false,
                  error: 'No active tab'
                });
              }
            });
            return _context.a(3, 13);
          case 2:
            chrome.tabs.query({
              active: true,
              currentWindow: true
            }, function (tabs) {
              if (tabs && tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                  action: "start"
                }, function (content) {
                  sendResponse({
                    status: true,
                    action: 'start',
                    content: content
                  });
                });
              } else {
                sendResponse({
                  status: false,
                  error: 'No active tab'
                });
              }
            });
            return _context.a(3, 13);
          case 3:
            chrome.tabs.query({
              active: true,
              currentWindow: true
            }, function (tabs) {
              if (tabs && tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                  action: "changeTrails"
                }, function (content) {
                  sendResponse({
                    status: true,
                    action: 'changeTrails',
                    content: content
                  });
                });
              } else {
                sendResponse({
                  status: false,
                  error: 'No active tab'
                });
              }
            });
            return _context.a(3, 13);
          case 4:
            sendResponse(storage);
            return _context.a(3, 13);
          case 5:
            data = request.data;
            collections = storage.collections;
            collections.map(function (collection) {
              if (collection.id == data.item.collectionId) {
                collection.items.push(data.item);
              }
            });
            chrome.storage.local.set({
              collections: collections
            }, function () {
              sendResponse({
                status: true,
                action: 'addItem'
              });
            });
            return _context.a(3, 13);
          case 6:
            _data = request.data;
            current = storage.current;
            current.pattern = _data.pattern;
            chrome.storage.local.set({
              current: current
            }, function () {
              chrome.tabs.query({
                active: true,
                currentWindow: true
              }, function (tabs) {
                if (tabs && tabs[0]) {
                  chrome.tabs.sendMessage(tabs[0].id, {
                    action: "changeTrails"
                  }, function (content) {
                    sendResponse({
                      status: true,
                      action: 'setCurrent',
                      content: content
                    });
                  });
                } else {
                  sendResponse({
                    status: true,
                    action: 'setCurrent'
                  });
                }
              });
            });
            return _context.a(3, 13);
          case 7:
            _data2 = request.data;
            _data2.trailItem.animationType = _data2.animationType;
            chrome.storage.local.set({
              current: _data2.trailItem,
              animationType: _data2.animationType
            }, function () {
              sendResponse({
                status: true,
                action: 'setItem'
              });
            });
            return _context.a(3, 13);
          case 8:
            _data3 = request.data;
            chrome.storage.local.get(['current'], function (_ref2) {
              var current = _ref2.current;
              current.animationType = _data3.animationType;
              chrome.storage.local.set({
                current: current,
                animationType: _data3.animationType
              }, function () {
                chrome.tabs.query({
                  active: true,
                  currentWindow: true
                }, function (tabs) {
                  if (tabs && tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                      action: "changeTrails"
                    }, function (content) {
                      sendResponse({
                        status: true,
                        action: 'setAnimation',
                        content: content
                      });
                    });
                  } else {
                    sendResponse({
                      status: true,
                      action: 'setAnimation'
                    });
                  }
                });
              });
            });
            return _context.a(3, 13);
          case 9:
            _data4 = request.data;
            chrome.storage.local.get(['current'], function (_ref3) {
              var current = _ref3.current;
              current.duration = _data4.duration;
              chrome.storage.local.set({
                current: current,
                duration: _data4.duration
              }, function () {
                chrome.tabs.query({
                  active: true,
                  currentWindow: true
                }, function (tabs) {
                  if (tabs && tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                      action: "changeTrails"
                    }, function (content) {
                      sendResponse({
                        status: true,
                        action: 'setDuration',
                        content: content
                      });
                    });
                  } else {
                    sendResponse({
                      status: true,
                      action: 'setDuration'
                    });
                  }
                });
              });
            });
            return _context.a(3, 13);
          case 10:
            _data5 = request.data;
            storage.collections.push(_data5.collection);
            chrome.storage.local.set({
              collections: storage.collections
            }, function () {
              sendResponse({
                status: true,
                action: 'addCollection'
              });
            });
            return _context.a(3, 13);
          case 11:
            _context.n = 12;
            return (0,_actions_getConfig__WEBPACK_IMPORTED_MODULE_2__.setConfig)(request.data).then(function (data) {
              chrome.tabs.query({
                active: true,
                currentWindow: true
              }, function (tabs) {
                if (tabs && tabs[0]) {
                  chrome.tabs.sendMessage(tabs[0].id, {
                    action: "changeTrails"
                  }, function (content) {
                    sendResponse(data);
                  });
                } else {
                  sendResponse(data);
                }
              });
            });
          case 12:
            return _context.a(3, 13);
          case 13:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }())["catch"](function (error) {
    console.error('Error in message handler:', error);
    sendResponse({
      status: false,
      error: error.message
    });
  });

  // Return true to indicate we will send a response asynchronously
  return true;
});
chrome.runtime.onStartup.addListener(_Events__WEBPACK_IMPORTED_MODULE_0__.registerContentScripts);
chrome.runtime.onInstalled.addListener(_Events__WEBPACK_IMPORTED_MODULE_0__.registerContentScripts);
chrome.runtime.setUninstallURL("https://custom-cursor.com/cursor-trails/uninstall?utm_source=ext&utm_medium=uninstall&utm_campaign=uninstall");
try {
  (0,_Notification__WEBPACK_IMPORTED_MODULE_3__.initAlarm)();
} catch (e) {}
})();

/******/ })()
;