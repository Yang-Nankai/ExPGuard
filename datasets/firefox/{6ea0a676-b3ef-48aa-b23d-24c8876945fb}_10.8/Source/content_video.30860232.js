// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"kf1w1":[function(require,module,exports,__globalThis) {
var _playr = require("./plugins/playr");
var _netflix = require("./plugins/netflix");
var _amazon = require("./plugins/amazon");
var _disney = require("./plugins/disney");
let player, w2gMessage = null, canSync = true, videoIntervall = null, url = window.location.href;
if (url.match(/^https:\/\/www.netflix.com/)) player = new (0, _netflix.NtFlx)();
else if (url.match(/^https:\/\/.*amazon\./)) player = new (0, _amazon.Amzn)();
else if (url.match(/^https:\/\/.*disneyplus\.com/)) player = new (0, _disney.Disn)();
else player = new (0, _playr.Playr)();
let domReady = new Promise(function(resolve, reject) {
    if (document.readyState === 'loading') document.addEventListener("DOMContentLoaded", resolve);
    else resolve();
    setTimeout(function() {
        resolve();
    }, 5000);
});
domReady.then(function() {
    if (self === top) {
        let iurl = chrome.runtime.getURL("controls.html");
        let host = document.createElement("div");
        let shadow = host.attachShadow({
            mode: "closed"
        });
        let shadow_style = document.createElement("style");
        shadow_style.innerHTML = "#w2g-player-controls {position: fixed; bottom: -42px; left: 0; width: 100%; height: 42px; z-index: 2147483647; transition: all 0.2s ease-out; }";
        shadow.appendChild(shadow_style);
        w2gMessage = document.createElement("iframe");
        w2gMessage.setAttribute("id", "w2g-player-controls");
        w2gMessage.setAttribute("frameborder", "0");
        w2gMessage.setAttribute("src", iurl);
        shadow.appendChild(w2gMessage);
        document.body.appendChild(host);
        setTimeout(function() {
            w2gMessage.style.bottom = "0px";
        }, 1500);
        setInterval(function() {
            if (!document.body.contains(host)) document.body.appendChild(host);
        }, 1000);
        let furl = new URL(iurl);
        window.addEventListener("message", function(msg) {
            if (msg.source === w2gMessage.contentWindow && msg.origin === furl.origin) {
                if (msg.data.resync) window.location.href = url;
                else if (msg.data.newurl) chrome.runtime.sendMessage({
                    "newurl": {
                        url: window.location.href,
                        title: document.title
                    }
                });
                else if (typeof msg.data.show_ui !== "undefined") {
                    if (msg.data.show_ui === true) w2gMessage.style.bottom = "0px";
                    else w2gMessage.style.bottom = "-35px";
                } else chrome.runtime.sendMessage(msg.data);
            }
        });
    }
});
videoIntervall = setInterval(attachToVideo, 1000);
setInterval(function() {
    if (self === top) chrome.runtime.sendMessage({
        "checkurl": window.location.href
    });
}, 1000);
chrome.runtime.onMessage.addListener(function(msg) {
    if (w2gMessage && msg.ui_update) w2gMessage.contentWindow.postMessage(msg, "*");
    else {
        if (player && canSync && msg.play && player.paused === true) player.play();
        else if (player && canSync && msg.pause && player.paused === false) player.pause();
        else if (player && canSync && typeof msg.seek !== "undefined") player.currentTime = msg.seek;
        else if (msg.urlok) {
            if (msg.urlok.result) canSync = true;
            else {
                canSync = false;
                if (w2gMessage) w2gMessage.contentWindow.postMessage({
                    resync: true
                }, "*");
            }
        } else if (canSync && typeof msg.videofound !== "undefined") {
            if (w2gMessage) w2gMessage.contentWindow.postMessage(msg, "*");
        }
    }
});
function handlePlay(evt) {
    chrome.runtime.sendMessage({
        "durationchange": player.duration
    });
    chrome.runtime.sendMessage({
        "play": true
    });
}
function handlePause() {
    chrome.runtime.sendMessage({
        "pause": true
    });
}
function handleTimeUpdate() {
    chrome.runtime.sendMessage({
        "timeupdate": player.currentTime
    });
}
function handleDurationChange() {
    chrome.runtime.sendMessage({
        "durationchange": player.duration
    });
}
function handleEnded() {
    chrome.runtime.sendMessage({
        "ended": true
    });
}
function attachToVideo() {
    let score = player.getVidScore();
    if (score > 0) {
        player.addEventListener("play", handlePlay);
        player.addEventListener("pause", handlePause);
        player.addEventListener("timeupdate", handleTimeUpdate);
        player.addEventListener("durationchange", handleDurationChange);
        player.addEventListener("ended", handleEnded);
        chrome.runtime.sendMessage({
            "videofound": score
        });
        chrome.runtime.sendMessage({
            "durationchange": player.duration
        });
        if (player.paused) chrome.runtime.sendMessage({
            "pause": true
        });
        else chrome.runtime.sendMessage({
            "play": true
        });
    }
}

},{"./plugins/playr":"iyK1M","./plugins/netflix":"9oz85","./plugins/amazon":"kh00E","./plugins/disney":"kD5CO"}],"iyK1M":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Playr", ()=>Playr);
var _defineProperty = require("@swc/helpers/_/_define_property");
class Playr {
    get paused() {
        return this.video.paused;
    }
    get currentTime() {
        return this.video.currentTime;
    }
    set currentTime(t) {
        this.video.currentTime = t;
    }
    get duration() {
        return isFinite(this.video.duration) ? this.video.duration : 10800;
    }
    play() {
        this.video.play();
    }
    pause() {
        this.video.pause();
    }
    addVideos() {
        this.videos = document.querySelectorAll("video");
        let shadowRoots = this._getShadowDoms();
        shadowRoots.forEach((function(s) {
            try {
                let vs = s.querySelectorAll("video");
                this.videos = [
                    ...this.videos
                ].concat([
                    ...vs
                ]);
            } catch (e) {}
        }).bind(this));
    }
    getVidScore() {
        let i, highest = {
            s: 0,
            v: null
        };
        if (this.videos.length > 0) {
            for(i = 0; i < this.videos.length; i++)if (this.videos[i].readyState > 0 && this.videos[i].offsetParent !== null) {
                let score = this.videos[i].videoHeight * this.videos[i].videoWidth * (isFinite(this.videos[i].duration) ? this.videos[i].duration + 1 : 1);
                if (score >= highest.s) highest = {
                    s: score,
                    v: this.videos[i]
                };
            }
        }
        if (highest.s > 0 && highest.v !== this.video) {
            this._removeEventListeners();
            this.video = highest.v;
            return highest.s;
        } else return 0;
    }
    addEventListener(evt, handler) {
        this.eventListeners.push(arguments);
        this.video.addEventListener(...arguments);
    }
    _removeEventListeners() {
        this.eventListeners.forEach((function(ele) {
            this.video.removeEventListener(...ele);
        }).bind(this));
        this.eventListeners = [];
    }
    _injectScript(file_path, tag) {
        var node = document.getElementsByTagName(tag)[0];
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', file_path);
        node.appendChild(script);
    }
    _getShadow(ele) {
        try {
            if (chrome.dom?.openOrClosedShadowRoot) return chrome.dom.openOrClosedShadowRoot(ele);
            else if (ele.openOrClosedShadowRoot) return ele.openOrClosedShadowRoot;
            else return undefined;
        } catch (e) {
            return undefined;
        }
    }
    _getShadowDoms() {
        const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
        let currentNode = treeWalker.currentNode;
        let sr, shadowRoots = [];
        while(currentNode){
            sr = this._getShadow(currentNode);
            if (sr) shadowRoots.push(sr);
            currentNode = treeWalker.nextNode();
        }
        return shadowRoots;
    }
    _sendEvent(ele, evt, x, y) {
        let event = new PointerEvent(evt, {
            pointerId: 1,
            isPrimary: !0,
            view: window,
            bubbles: !0,
            cancelable: !0,
            clientX: x,
            clientY: y
        });
        ele.dispatchEvent(event);
    }
    constructor(){
        (0, _defineProperty._)(this, "video", null);
        (0, _defineProperty._)(this, "videos", []);
        (0, _defineProperty._)(this, "eventListeners", []);
        (0, _defineProperty._)(this, "domReady", new Promise(function(resolve, reject) {
            if (document.readyState === 'loading') document.addEventListener("DOMContentLoaded", resolve);
            else resolve();
        }));
        this.domReady.then((function() {
            this.addVideos();
            setInterval((function() {
                this.addVideos();
            }).bind(this), 2000);
        }).bind(this));
    }
}

},{"@swc/helpers/_/_define_property":"j0i7h","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"j0i7h":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_", ()=>_define_property);
function _define_property(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"1LDZ5":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"9oz85":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "NtFlx", ()=>NtFlx);
var _playr = require("./playr");
class NtFlx extends (0, _playr.Playr) {
    get currentTime() {
        return this.video.currentTime;
    }
    set currentTime(t) {
        window.postMessage({
            type: "w2g_seek",
            val: t
        });
    }
    constructor(){
        super(...arguments);
        this._injectScript(chrome.runtime.getURL("javascript/adapter/w2g_netflix_adapter.js"), 'body');
    }
}

},{"./playr":"iyK1M","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"kh00E":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Amzn", ()=>Amzn);
var _playr = require("./playr");
let offset = 0;
class Amzn extends (0, _playr.Playr) {
    get currentTime() {
        let t = null, s = 0, multi = [
            1,
            60,
            3600
        ];
        try {
            t = document.querySelector(".atvwebplayersdk-timeindicator-text").innerText.split("/")[0].trim().split(":").reverse();
            for(let i = 0; i < t.length; i++)s += t[i] * multi[i];
        } catch (e) {}
        if (s > 0) offset = this.video.currentTime - s;
        return this.video.currentTime - offset;
    }
    set currentTime(t) {
        this.video.currentTime = t + offset;
    }
}

},{"./playr":"iyK1M","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"kD5CO":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Disn", ()=>Disn);
var _playr = require("./playr");
class Disn extends (0, _playr.Playr) {
    get currentTime() {
        let slider = document.querySelector(".progress-bar .slider-container");
        if (slider) return Number(slider.getAttribute("aria-valuenow"));
        else return 0;
    }
    set currentTime(t) {
        let slider = document.querySelector(".progress-bar .slider-container");
        let fract = t / this.duration;
        let r = slider.getBoundingClientRect();
        let x = r.left + r.width * fract;
        let y = r.top + r.height / 2;
        this._sendEvent(slider, "pointerdown", x, y);
        this._sendEvent(slider, "pointerup", x, y);
    }
    get duration() {
        let slider = document.querySelector(".progress-bar .slider-container");
        if (slider) return Number(slider.getAttribute("aria-valuemax"));
        else return 0;
    }
}

},{"./playr":"iyK1M","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}]},["kf1w1"], "kf1w1", "parcelRequire94c2")

