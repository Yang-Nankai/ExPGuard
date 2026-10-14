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
  var $parcel$bundleURL;function $parcel$resolve(url) {  url = importMap[url] || url;  if (!$parcel$bundleURL) {    try {      throw new Error();    } catch (err) {      var matches = ('' + err.stack).match(        /(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g,      );      if (matches) {        $parcel$bundleURL = matches[0];      } else {        return distDir + url;      }    }  }  return new URL(distDir + url, $parcel$bundleURL).toString();}newRequire.resolve = $parcel$resolve;function $parcel$extendImportMap(map) {  Object.assign(importMap, map);}newRequire.extendImportMap = $parcel$extendImportMap;

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
})({"kkymK":[function(require,module,exports,__globalThis) {
module.bundle.extendImportMap({
    "9cZCp": "1.7774c926.png",
    "aOuun": "vimeo.ff2a1f9c.js",
    "hM09k": "youtube-DE.418619c4.json",
    "3E6sQ": "youtube-EN.814f2935.json",
    "6j3n9": "youtube-ES.57769cd0.json",
    "4ExYD": "youtube-FR.151b29c8.json",
    "fxM0U": "youtube-IT.22d53e5c.json",
    "gxarM": "youtube-NL.162181e0.json",
    "YTNie": "youtube-PL.52e22381.json",
    "8avj8": "youtube-TR.bf2d3506.json",
    "82TJT": "youtube-US.814f2935.json",
    "apERV": "33.7a424336.png",
    "lKWVt": "2.bbd021da.png",
    "9r9Tw": "35.679ead21.png",
    "73e7t": "34.ffe429f0.png",
    "apybz": "7.869c0e49.png",
    "7ZFxv": "22.0838bc34.png",
    "jIelK": "20.948bb4f4.png",
    "5uqYi": "32.66d022f4.png",
    "lgBM1": "19.4c018825.png",
    "lGVA4": "37.86c31928.png",
    "3UKkX": "38.f4bdfac0.png",
    "3whmU": "12.ab3da155.png",
    "2UoI0": "14.d7198626.png",
    "1Vdka": "36.f5f10f7d.png",
    "4o4ci": "13.6949acb8.png",
    "3Ak17": "11.805dd8a6.png",
    "5n88T": "3.05e2000b.png",
    "b704u": "8.b856401a.png",
    "gIBXU": "4.a429afec.png",
    "4HdFd": "9.21cbda7c.png",
    "e4qew": "15.0e1bebaf.png",
    "aFoi0": "30.2616e0d4.png",
    "aHVUJ": "31.e70b3b01.png",
    "gfh34": "28.3d98d00b.png",
    "7cyig": "23.012c986a.png",
    "a4Z0N": "24.1ec6ef2c.png",
    "5jTsr": "10.fda3a601.png"
});

},{}],"kUQVP":[function(require,module,exports,__globalThis) {
var _w2Ghelpers = require("../../../js/w2ghelpers");
var _w2Gextension = require("./components/w2gextension");
var _w2Glogin = require("./components/w2glogin");
var _w2Gapps = require("../../../js/components/w2gapps");
let w2gLogin, w2gExtension, w2gApps;
(0, _w2Ghelpers.$w2g).domReady().then(function() {
    if (window.location.href.indexOf("?popout=true") !== -1) document.querySelector("body").classList.add("w2g-popout");
    document.querySelector("#search-bar-input").focus();
    w2gExtension = new (0, _w2Gextension.W2gExtension)(".w2g-extension");
    w2gLogin = new (0, _w2Glogin.W2gLogin)(".w2g-login");
    w2gApps = new (0, _w2Gapps.W2gApps)(".w2g-apps", true);
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }).then(function(tabs) {
        if (tabs[0] && tabs[0].url && tabs[0].url.indexOf("http") === 0 && tabs[0].url.indexOf("https://w2g.tv") !== 0) w2gApps.lookupAndRender(tabs[0].url);
    });
    w2gLogin._addHandler("authenticated", function(prop, val) {
        w2gApps.auth = val;
        w2gExtension.jid = w2gLogin.jid;
        if (val === true) w2gExtension.fetchRooms();
    });
    w2gApps._addHandler("searchSubmit", function() {
        w2gExtension.showRooms = false;
    });
    w2gApps._addHandler("play", function(ctx, args) {
        (0, _w2Ghelpers.$w2g).postJSON("/rooms/create.json", {
            share: args[1].id,
            title: args[1].title,
            thumb: args[1].thumb
        }).then((function(data) {
            chrome.tabs.create({
                url: "https://w2g.tv/room/?room_id=" + data.streamkey
            });
        }).bind(this));
    });
    w2gApps._addHandler("shareToggled", function(ctx, args) {
        w2gExtension.toggleShare(args[0]);
    });
    w2gApps._addHandler("showResults", function() {
        if (w2gApps.showResults === false) {
            w2gExtension.shareInitiated = false;
            w2gExtension.shareActive = false;
            w2gExtension.showRooms = true;
        }
    });
    w2gLogin.check();
});

},{"../../../js/w2ghelpers":"f460H","./components/w2gextension":"2BhUu","./components/w2glogin":"1Pi1W","../../../js/components/w2gapps":"kTKaZ"}],"f460H":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "$w2g", ()=>$w2g);
var _apiconfig = require("./apiconfig");
let $w2g = function() {
    //Polyfills
    if (window.NodeList && !NodeList.prototype.forEach) NodeList.prototype.forEach = Array.prototype.forEach;
    let exp = {}, doneProm = {}, prtxProms = {}, api_host = (0, _apiconfig.ApiManager).apihost, readyProm = new Promise(function(resolve, reject) {
        if (document.readyState === 'loading') document.addEventListener("DOMContentLoaded", resolve);
        else resolve();
    }), consentProm = new Promise(function(cres, crej) {
        if (window.__gpp) window.__gpp('addEventListener', function(d) {
            if (d.pingData.signalStatus === "ready" && (d.pingData.applicableSections.length === 0 || d.pingData.applicableSections.includes(-1) || d.pingData.sectionList.length > 0)) cres();
        });
        else cres();
    });
    readyProm.then(function() {
        var dimmer = document.querySelector("#site-dimmer");
        if (dimmer) dimmer.addEventListener("click", function(evt) {
            if (evt.target == dimmer && dimmer.classList.contains("w2g-nodim") === false) exp.hideModal();
            else if (evt.target.classList.contains("cancel")) exp.hideModal();
        });
    });
    exp.showAlert = function(title, body) {
        var modal = document.querySelector("#alert-modal");
        modal.querySelector(".w2g-alert-title").innerText = title;
        modal.querySelector(".w2g-alert-message").innerHTML = body;
        return this.showModal("#alert-modal", false);
    };
    exp.showModal = function(ele, nodim) {
        exp.hideModal();
        if (doneProm[ele] && typeof doneProm[ele] === "function") {
            doneProm[ele]();
            doneProm[ele] = null;
        }
        return new Promise(function(resolve, reject) {
            doneProm[ele] = resolve;
            var node = document.querySelector(ele);
            if (node) {
                document.querySelector("#site-dimmer").classList.remove("hidden");
                document.querySelector("#site-dimmer").classList.add("flex");
                document.querySelector("body").classList.add("w2g-modal-open");
                if (nodim) document.querySelector("#site-dimmer").classList.add("w2g-nodim");
                node.classList.remove("hidden");
                node.classList.add("block");
                node.scrollTop = 0;
            } else doneProm[ele]();
        });
    };
    exp.activateAutoMenu = function(ele) {
        var index = 0;
        ele.classList.remove("w2g-menu-notify");
        ele.classList.add("w2g-active");
        ele.parentElement.querySelectorAll("div").forEach(function(link, idx) {
            if (link === ele) index = idx;
            else link.classList.remove("w2g-active");
        });
        while(ele){
            let tabs = ele.parentElement?.querySelectorAll(".w2g-menu-tab");
            if (tabs && tabs.length > 0) {
                tabs.forEach(function(tab, i) {
                    if (i === index) tab.classList.add("w2g-active");
                    else tab.classList.remove("w2g-active");
                });
                break;
            }
            ele = ele.parentElement;
        }
    };
    exp.scrollDiv = function(scrollContainer, scrollTo, duration) {
        return new Promise(function(resolve, reject) {
            var steps = duration / 1000 * 60, step = (scrollTo - scrollContainer.scrollTop) / steps, counter = 0;
            function tick() {
                if (++counter < steps) {
                    scrollContainer.scrollTop += step;
                    window.requestAnimationFrame(tick);
                } else {
                    scrollContainer.scrollTop = scrollTo;
                    resolve();
                }
            }
            tick();
        });
    };
    exp.scrollWindow = function(scrollTo, duration) {
        return new Promise(function(resolve, reject) {
            var steps = duration / 1000 * 60, step = (scrollTo - window.scrollY) / steps, counter = 0;
            function tick() {
                if (++counter < steps) {
                    let pos = window.scrollY;
                    window.scrollTo(0, pos + step);
                    window.requestAnimationFrame(tick);
                } else {
                    window.scrollTo(0, scrollTo);
                    resolve();
                }
            }
            tick();
        });
    };
    exp.hideModal = function(id) {
        if (!id || document.querySelector(id)) {
            var dimmer = document.querySelector("#site-dimmer");
            document.querySelectorAll("#site-dimmer > div").forEach(function(ele) {
                ele.classList.remove("flex");
                ele.classList.add("hidden");
            });
            dimmer.classList.remove("block");
            dimmer.classList.add("hidden");
            dimmer.classList.remove("w2g-nodim");
            document.querySelector("body").classList.remove("w2g-modal-open");
            for(var cb in doneProm)if (doneProm.hasOwnProperty(cb) && typeof doneProm[cb] === "function") doneProm[cb]();
        }
    };
    exp.showTooltip = function(ele, text, direction, hide, timeout) {
        var node = document.querySelector(ele), template = null;
        switch(direction){
            case "left":
                template = "w2g-popup-left-center";
                break;
            case "bottom":
                template = "w2g-popup-bottom-right";
                break;
        }
        if (template) {
            var tpl = document.querySelector("#" + template).cloneNode(true);
            tpl.removeAttribute("id");
            tpl.querySelector('.w2g-popup-content').innerText = text;
            tpl.querySelector('.animate__animated').classList.add('animate__bounceIn');
            node.appendChild(tpl);
            tpl.classList.remove("hidden");
            if (hide) tpl.addEventListener("click", function() {
                _remove(tpl);
            }, {
                once: true
            });
            if (timeout) setTimeout(function() {
                _remove(tpl);
            }, timeout);
        }
        function _remove(tpl) {
            let ani = tpl.querySelector('.animate__animated');
            tpl.addEventListener('animationend', ()=>{
                tpl.remove();
            });
            ani.classList.remove('animate__bounceIn');
            ani.classList.add('animate__bounceOut');
        }
    };
    exp.loadAssets = function(assets) {
        var counter = 0, id;
        if (typeof assets === "string") assets = [
            assets
        ];
        return new Promise(function(resolve, reject) {
            for(var i = 0; i < assets.length; i++){
                id = "w2gasset_" + genHash(assets[i]);
                if (document.querySelector("#" + id)) checkComplete();
                else {
                    if (assets[i].endsWith(".js")) {
                        var script = document.createElement("script");
                        script.addEventListener("load", checkComplete);
                        script.setAttribute("src", assets[i]);
                        script.setAttribute("id", id);
                        document.getElementsByTagName("head")[0].appendChild(script);
                    } else if (assets[i].endsWith(".css")) {
                        var link = document.createElement("link");
                        link.addEventListener("load", checkComplete);
                        link.setAttribute("href", assets[i]);
                        link.setAttribute("type", "text/css");
                        link.setAttribute("rel", "stylesheet");
                        link.setAttribute("id", id);
                        link.setAttribute("media", "screen,print");
                        document.getElementsByTagName("head")[0].appendChild(link);
                    }
                }
            }
            function checkComplete() {
                counter++;
                if (counter === assets.length) resolve();
            }
            function genHash(str) {
                var hash = 0;
                if (str.length === 0) return hash;
                for(var i = 0; i < str.length; i++){
                    var char = str.charCodeAt(i);
                    hash = (hash << 5) - hash + char;
                    hash = hash & hash;
                }
                return hash;
            }
        });
    };
    exp.querySelector = function(sel) {
        return document.querySelector(sel) || document.createElement("DIV");
    };
    exp.domReady = function() {
        return readyProm;
    };
    exp.clamp = function(num, min, max) {
        return Math.max(min, Math.min(num, max));
    };
    exp.canAutoPlay = function() {
        return new Promise(function(mres, mrej) {
            try {
                var vblob = new Blob([
                    new Uint8Array([
                        0,
                        0,
                        0,
                        28,
                        102,
                        116,
                        121,
                        112,
                        105,
                        115,
                        111,
                        109,
                        0,
                        0,
                        2,
                        0,
                        105,
                        115,
                        111,
                        109,
                        105,
                        115,
                        111,
                        50,
                        109,
                        112,
                        52,
                        49,
                        0,
                        0,
                        0,
                        8,
                        102,
                        114,
                        101,
                        101,
                        0,
                        0,
                        2,
                        239,
                        109,
                        100,
                        97,
                        116,
                        33,
                        16,
                        5,
                        32,
                        164,
                        27,
                        255,
                        192,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        55,
                        167,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        112,
                        33,
                        16,
                        5,
                        32,
                        164,
                        27,
                        255,
                        192,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        55,
                        167,
                        128,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        112,
                        0,
                        0,
                        2,
                        194,
                        109,
                        111,
                        111,
                        118,
                        0,
                        0,
                        0,
                        108,
                        109,
                        118,
                        104,
                        100,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        3,
                        232,
                        0,
                        0,
                        0,
                        47,
                        0,
                        1,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        64,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        3,
                        0,
                        0,
                        1,
                        236,
                        116,
                        114,
                        97,
                        107,
                        0,
                        0,
                        0,
                        92,
                        116,
                        107,
                        104,
                        100,
                        0,
                        0,
                        0,
                        3,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        2,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        47,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        64,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        36,
                        101,
                        100,
                        116,
                        115,
                        0,
                        0,
                        0,
                        28,
                        101,
                        108,
                        115,
                        116,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        47,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        100,
                        109,
                        100,
                        105,
                        97,
                        0,
                        0,
                        0,
                        32,
                        109,
                        100,
                        104,
                        100,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        172,
                        68,
                        0,
                        0,
                        8,
                        0,
                        85,
                        196,
                        0,
                        0,
                        0,
                        0,
                        0,
                        45,
                        104,
                        100,
                        108,
                        114,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        115,
                        111,
                        117,
                        110,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        83,
                        111,
                        117,
                        110,
                        100,
                        72,
                        97,
                        110,
                        100,
                        108,
                        101,
                        114,
                        0,
                        0,
                        0,
                        1,
                        15,
                        109,
                        105,
                        110,
                        102,
                        0,
                        0,
                        0,
                        16,
                        115,
                        109,
                        104,
                        100,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        36,
                        100,
                        105,
                        110,
                        102,
                        0,
                        0,
                        0,
                        28,
                        100,
                        114,
                        101,
                        102,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        12,
                        117,
                        114,
                        108,
                        32,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        211,
                        115,
                        116,
                        98,
                        108,
                        0,
                        0,
                        0,
                        103,
                        115,
                        116,
                        115,
                        100,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        87,
                        109,
                        112,
                        52,
                        97,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        2,
                        0,
                        16,
                        0,
                        0,
                        0,
                        0,
                        172,
                        68,
                        0,
                        0,
                        0,
                        0,
                        0,
                        51,
                        101,
                        115,
                        100,
                        115,
                        0,
                        0,
                        0,
                        0,
                        3,
                        128,
                        128,
                        128,
                        34,
                        0,
                        2,
                        0,
                        4,
                        128,
                        128,
                        128,
                        20,
                        64,
                        21,
                        0,
                        0,
                        0,
                        0,
                        1,
                        244,
                        0,
                        0,
                        1,
                        243,
                        249,
                        5,
                        128,
                        128,
                        128,
                        2,
                        18,
                        16,
                        6,
                        128,
                        128,
                        128,
                        1,
                        2,
                        0,
                        0,
                        0,
                        24,
                        115,
                        116,
                        116,
                        115,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        2,
                        0,
                        0,
                        4,
                        0,
                        0,
                        0,
                        0,
                        28,
                        115,
                        116,
                        115,
                        99,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        2,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        28,
                        115,
                        116,
                        115,
                        122,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        2,
                        0,
                        0,
                        1,
                        115,
                        0,
                        0,
                        1,
                        116,
                        0,
                        0,
                        0,
                        20,
                        115,
                        116,
                        99,
                        111,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        44,
                        0,
                        0,
                        0,
                        98,
                        117,
                        100,
                        116,
                        97,
                        0,
                        0,
                        0,
                        90,
                        109,
                        101,
                        116,
                        97,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        33,
                        104,
                        100,
                        108,
                        114,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        109,
                        100,
                        105,
                        114,
                        97,
                        112,
                        112,
                        108,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        45,
                        105,
                        108,
                        115,
                        116,
                        0,
                        0,
                        0,
                        37,
                        169,
                        116,
                        111,
                        111,
                        0,
                        0,
                        0,
                        29,
                        100,
                        97,
                        116,
                        97,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        76,
                        97,
                        118,
                        102,
                        53,
                        54,
                        46,
                        52,
                        48,
                        46,
                        49,
                        48,
                        49
                    ])
                ], {
                    type: 'video/mp4'
                });
                var vurl = URL.createObjectURL(vblob);
                var vele = document.createElement("video");
                vele.src = vurl;
                vele.play().then(function() {
                    mres(true);
                }).catch(function() {
                    mres(false);
                });
                setTimeout(function() {
                    mres(false);
                }, 2000);
            } catch (e) {
                mres(false);
            }
        });
    };
    exp.consentGiven = function() {
        return consentProm;
    };
    exp.show = function(selector, mode) {
        document.querySelectorAll(selector).forEach(function(ele) {
            ele.style.display = mode || "block";
        });
    };
    exp.hide = function(selector) {
        document.querySelectorAll(selector).forEach(function(ele) {
            ele.style.display = "none";
        });
    };
    exp.postJSON = function(url, data, method, credentials) {
        url = _absUrl(url);
        data = data || {};
        return new Promise(function(resolve, reject) {
            fetch(url, {
                method: method || 'POST',
                credentials: credentials || "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(function(data) {
                if (data.ok || data.redirected) data.json().then(function(json) {
                    resolve(json);
                }).catch(function() {
                    resolve();
                });
                else data.json().then(function(json) {
                    reject(json);
                }).catch(function() {
                    reject(data.status);
                });
            }).catch(function(e) {
                reject(500);
            });
        });
    };
    exp.getJSON = function(url, method, headers, credentials) {
        url = _absUrl(url);
        return new Promise(function(resolve, reject) {
            fetch(url, {
                method: method || 'GET',
                credentials: credentials || "include",
                cache: 'no-cache',
                headers: headers || {}
            }).then(function(data) {
                if (data.ok || data.redirected) data.json().then(function(json) {
                    resolve(json);
                }).catch(function() {
                    reject();
                });
                else data.json().then(function(json) {
                    reject(json);
                }).catch(function() {
                    reject();
                });
            }).catch(reject);
        });
    };
    exp.fetchPRTX = function(url, options) {
        url = _absUrl(url);
        var key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return new Promise(function(resolve, reject) {
            if (w2g.extensionInfo.installed) {
                prtxProms[key] = {
                    resolve: resolve,
                    reject: reject
                };
                window.postMessage({
                    fetchPRX: {
                        url: url,
                        options: options,
                        key: key
                    }
                });
            } else reject("no_extension");
        });
    };
    exp.makeID = function(length) {
        var result = [];
        var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for(var i = 0; i < length; i++)result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        return result.join('');
    };
    window.addEventListener("message", function(event) {
        if (event.origin === window.origin && event.data.type && event.data.type === "ptrxres") {
            if (prtxProms[event.data.key]) {
                if (event.data.error) prtxProms[event.data.key].reject("failed_fetch");
                else prtxProms[event.data.key].resolve(event.data.data);
                delete prtxProms[event.data.key];
            }
        }
    });
    exp.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || /Mac/.test(navigator.userAgent) && typeof navigator.maxTouchPoints !== "undefined" && navigator.maxTouchPoints > 1;
    exp.getScript = function(source) {
        return new Promise(function(resolve, reject) {
            var script = document.createElement('script');
            var head = document.getElementsByTagName('head')[0];
            script.async = 1;
            script.onload = script.onreadystatechange = function(evt, isAbort) {
                if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                    script.onload = script.onreadystatechange = null;
                    script = undefined;
                    if (!isAbort) resolve();
                    else reject();
                }
            };
            script.onerror = function() {
                reject();
            };
            script.src = source;
            head.appendChild(script);
        });
    };
    exp.storageAvailable = function(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return e instanceof DOMException && // everything except Firefox
            (e.code === 22 || // Firefox
            e.code === 1014 || // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' || // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && // acknowledge QuotaExceededError only if there's something already stored
            storage && storage.length !== 0;
        }
    };
    exp.setStorage = function(key, val, duration) {
        if (exp.storageAvailable('localStorage')) {
            window.localStorage.setItem(key, JSON.stringify({
                v: val,
                ttl: duration ? Date.now() + duration * 1000 : -1
            }));
            return true;
        } else return false;
    };
    exp.getStorage = function(key) {
        if (exp.storageAvailable('localStorage')) {
            let val = window.localStorage.getItem(key);
            if (val) try {
                val = JSON.parse(val);
                if (val.ttl && (val.ttl === -1 || val.ttl > Date.now())) return val.v;
                else {
                    window.localStorage.removeItem(key);
                    return undefined;
                }
            } catch (e) {
                window.localStorage.removeItem(key);
                return undefined;
            }
            else return undefined;
        } else return undefined;
    };
    exp.setStorageIfNot = function(key, val, duration) {
        if (!exp.getStorage(key)) {
            exp.setStorage(key, val, duration);
            return true;
        } else return false;
    };
    exp.layout = document.querySelector("html").getAttribute("data-layout");
    exp.w2g_ab_val = exp.getStorage("w2g_ab_val");
    if (!exp.w2g_ab_val) {
        exp.w2g_ab_val = Math.ceil(Math.random() * 10);
        exp.setStorage("w2g_ab_val", exp.w2g_ab_val, 60000);
    }
    function _absUrl(url) {
        return url.indexOf("http") === 0 || url.indexOf("chrome-extension") === 0 ? url : "https://" + api_host + url;
    }
    return exp;
}();

},{"./apiconfig":"1Xihd","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"1Xihd":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ApiManager", ()=>ApiManager);
let ApiManager = {
    apihost: "w2g-api.w2g.tv"
};

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

},{}],"2BhUu":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "W2gExtension", ()=>W2gExtension);
var _w2Ghelpers = require("../../../../js/w2ghelpers");
var _w2Gdataobject = require("../../../../js/w2gbind/w2gdataobject");
var _w2Gbind = require("../../../../js/w2gbind/w2gbind");
let W2gExtension = function(eleClass) {
    var w2gExtension, shareObj, shareRoom;
    var extensionObj = {
        shareInitiated: false,
        shareActive: false,
        shareName: "",
        rooms: [],
        review: "hidden",
        jid: "",
        roomsLoaded: false,
        showRooms: true,
        permissions: true,
        sharePlaylists: [],
        requestPermissions: function() {
            chrome.permissions.request({
                origins: [
                    '<all_urls>'
                ]
            }, (result)=>{
                window.location.reload();
            });
        },
        fetchRooms: function() {
            (0, _w2Ghelpers.$w2g).getJSON("/streams").then((function(s) {
                this.rooms = s;
            }).bind(this)).catch(function() {
                console.log("Can not fetch rooms.");
            });
        },
        createNewRoom: function() {
            (0, _w2Ghelpers.$w2g).postJSON("/rooms/create.json").then(function(data) {
                var openurl = "https://w2g.tv/room/?room_id=" + data.streamkey;
                chrome.tabs.create({
                    url: openurl
                });
            });
        },
        copy_url: function(a, b) {
            if (navigator.clipboard) navigator.clipboard.writeText("https://w2g.tv/room/?room_id=" + b.streamkey);
        },
        roomClick: function(a, b) {
            if (this.shareInitiated) {
                shareRoom = b;
                this.shareName = b.persistent_name || "Temporary Room";
                this.showRooms = false;
                this.shareActive = true;
            } else chrome.tabs.create({
                url: "https://w2g.tv/room/?room_id=" + b.streamkey
            });
        },
        cancelShare: function() {
            shareRoom = null;
            this.shareName = "";
            this.showRooms = true;
            this.shareActive = false;
            this.sharePlaylists = [];
        },
        toggleShare: function(ele) {
            if (ele.price === "share") {
                shareObj = ele;
                this.showRooms = true;
                this.shareInitiated = true;
            } else {
                shareRoom = null;
                shareObj = null;
                this.shareName = "", this.showRooms = true;
                this.sharePlaylists = [];
                this.shareInitiated = false;
                this.shareActive = false;
            }
        },
        shareItem: function() {
            var open = true;
            for(var i = 0; i < this.rooms.length; i++)if (this.rooms[i].streamkey === shareRoom.streamkey) {
                for(var t = 0; t < this.rooms[i].users.length; t++)if (this.rooms[i].users[t].jid === this.jid && this.rooms[i].users[t].online) {
                    open = false;
                    break;
                }
                break;
            }
            (0, _w2Ghelpers.$w2g).postJSON("/rooms/" + shareRoom.streamkey + "/sync_update", {
                item_url: shareObj.id,
                item_title: shareObj.title,
                item_thumb: shareObj.thumb
            }).then((function() {
                if (open === true) chrome.tabs.create({
                    url: "https://w2g.tv/room/?room_id=" + shareRoom.streamkey
                });
                this.shareActive = false;
                this.showRooms = true;
            }).bind(this));
        },
        addToPlaylist: function(para, playlist) {
            (0, _w2Ghelpers.$w2g).postJSON("/rooms/" + shareRoom.streamkey + "/playlists/" + playlist.key + "/playlist_items/sync_update", {
                'add_items': JSON.stringify([
                    {
                        "url": shareObj.id,
                        "title": shareObj.title,
                        "thumb": shareObj.thumb
                    }
                ])
            }).then((function() {
                this.shareActive = false;
                this.showRooms = true;
            }).bind(this));
        },
        closeFeedback: function() {
            this.review = "hidden";
        },
        feedbackPositive: function() {
            chrome.storage.local.set({
                revshown_1: 1
            });
            this.review = "positive";
        },
        feedbackNegative: function() {
            chrome.storage.local.set({
                revshown_1: 2
            });
            this.review = "negative";
        }
    };
    w2gExtension = new (0, _w2Gdataobject.W2gDataObject)(extensionObj);
    new (0, _w2Gbind.W2gBind)(w2gExtension, eleClass);
    w2gExtension._addHandler("shareName", function(prop, val) {
        if (shareRoom) (0, _w2Ghelpers.$w2g).getJSON("/streams/" + shareRoom.streamkey + "/playlists").then((function(data) {
            w2gExtension.sharePlaylists = data;
        }).bind(this));
    });
    chrome.storage.local.get([
        'popcount'
    ]).then(function(res) {
        let count = typeof res.popcount === "undefined" ? 0 : res.popcount;
        count++;
        if (count >= 10) chrome.storage.local.get([
            'revshown_1'
        ]).then(function(r) {
            if (typeof r.revshown_1 === "undefined") w2gExtension.review = "question";
        });
        chrome.storage.local.set({
            popcount: count
        });
    });
    chrome.permissions.contains({
        origins: [
            '<all_urls>'
        ]
    }, (result)=>{
        w2gExtension.permissions = result;
    });
    return w2gExtension;
};

},{"../../../../js/w2ghelpers":"f460H","../../../../js/w2gbind/w2gdataobject":"7VVht","../../../../js/w2gbind/w2gbind":"bca7W","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"1Pi1W":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "W2gLogin", ()=>W2gLogin);
var _w2Ghelpers = require("../../../../js/w2ghelpers");
var _w2Gdataobject = require("../../../../js/w2gbind/w2gdataobject");
var _w2Gbind = require("../../../../js/w2gbind/w2gbind");
let W2gLogin = function(eleClass) {
    var loginObj;
    var loginForm = {
        authenticated: false,
        jid: null,
        email: "",
        password: "",
        errors: [],
        processing: false,
        showError: false,
        showDialog: true,
        popoutWindow: function() {
            var href = window.location.href;
            chrome.windows.create({
                url: href + "?popout=true",
                type: 'popup',
                width: 400,
                height: 600
            });
            window.close();
        },
        check: function() {
            var data = {};
            (0, _w2Ghelpers.$w2g).postJSON("/auth/sign_in.json").then((function(d) {
                if (d.error) this.authenticated = false;
                else {
                    this.jid = d.jid;
                    this.authenticated = true;
                }
            }).bind(this)).catch((function() {
                this.authenticated = false;
            }).bind(this));
        },
        openLogin: function() {
            chrome.tabs.create({
                url: "https://w2g.tv/account"
            });
        }
    };
    loginObj = new (0, _w2Gdataobject.W2gDataObject)(loginForm);
    new (0, _w2Gbind.W2gBind)(loginObj, eleClass);
    return loginObj;
};

},{"../../../../js/w2ghelpers":"f460H","../../../../js/w2gbind/w2gdataobject":"7VVht","../../../../js/w2gbind/w2gbind":"bca7W","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"kTKaZ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "W2gApps", ()=>W2gApps);
var _w2Ghelpers = require("../w2ghelpers");
var _w2Gdataobject = require("../w2gbind/w2gdataobject");
var _w2Gbind = require("../w2gbind/w2gbind");
var _youtubeProvider = require("../providers/youtube-provider");
var _streamingProvider = require("../providers/streaming-provider");
var _vimeoProvider = require("../providers/vimeo-provider");
var _kickProvider = require("../providers/kick-provider");
var _appleProvider = require("../providers/apple-provider");
var _twitchProvider = require("../providers/twitch-provider");
var _tiktokProvider = require("../providers/tiktok-provider");
var _w2GpodcastsProvider = require("../providers/w2gpodcasts-provider");
var _radioProvider = require("../providers/radio-provider");
var _w2GshortsProvider = require("../providers/w2gshorts-provider");
var _sunoProvider = require("../providers/suno-provider");
var _udioProvider = require("../providers/udio-provider");
var _instagramProvider = require("../providers/instagram-provider");
var _twitterProvider = require("../providers/twitter-provider");
var _tenorProvider = require("../providers/tenor-provider");
var _pinterestProvider = require("../providers/pinterest-provider");
var _coubProvider = require("../providers/coub-provider");
var _dailymotionProvider = require("../providers/dailymotion-provider");
var _facebookProvider = require("../providers/facebook-provider");
var _soundcloudProvider = require("../providers/soundcloud-provider");
var _mixcloudProvider = require("../providers/mixcloud-provider");
var _slidesProvider = require("../providers/slides-provider");
var _osmProvider = require("../providers/osm-provider");
var _snipzeroProvider = require("../providers/snipzero-provider");
var _nativeProvider = require("../providers/native-provider");
var _w2GcamProvider = require("../providers/w2gcam-provider");
var _w2GscreenProvider = require("../providers/w2gscreen-provider");
var _w2GsyncProvider = require("../providers/w2gsync-provider");
let W2gApps = function(eleClass, extension) {
    let providers = [], activeApp = null, availApps = [], sorted_providers = {}, shouldSuggest = true, sugStop = 0;
    if (extension === true) providers = [
        (0, _youtubeProvider.W2gYoutube),
        (0, _vimeoProvider.W2gVimeo),
        (0, _appleProvider.W2gApple),
        (0, _twitchProvider.W2gTwitch),
        (0, _kickProvider.W2gKick),
        (0, _tiktokProvider.W2gTikTok),
        (0, _radioProvider.W2gRadio),
        (0, _udioProvider.W2gUdio),
        (0, _sunoProvider.W2gSuno),
        (0, _w2GshortsProvider.W2gShorts),
        (0, _instagramProvider.W2gInstagram),
        (0, _twitterProvider.W2gTwitter),
        (0, _tenorProvider.W2gTenor),
        (0, _pinterestProvider.W2gPinterest),
        (0, _coubProvider.W2gCoub),
        (0, _dailymotionProvider.W2gDailymotion),
        (0, _facebookProvider.W2gFacebook),
        (0, _soundcloudProvider.W2gSoundcloud),
        (0, _mixcloudProvider.W2gMixcloud),
        (0, _slidesProvider.W2gSlides),
        (0, _osmProvider.W2gOsm),
        (0, _snipzeroProvider.W2gSnipZero),
        (0, _nativeProvider.W2gNative),
        (0, _w2GsyncProvider.W2gSync)
    ];
    else providers = [
        (0, _youtubeProvider.W2gYoutube),
        (0, _streamingProvider.W2gStreaming),
        (0, _w2GcamProvider.W2gCam),
        (0, _w2GscreenProvider.W2gScreenshare),
        (0, _appleProvider.W2gApple),
        (0, _vimeoProvider.W2gVimeo),
        (0, _twitchProvider.W2gTwitch),
        (0, _kickProvider.W2gKick),
        (0, _tiktokProvider.W2gTikTok),
        (0, _radioProvider.W2gRadio),
        (0, _udioProvider.W2gUdio),
        (0, _sunoProvider.W2gSuno),
        (0, _w2GpodcastsProvider.W2gPodcasts),
        (0, _w2GshortsProvider.W2gShorts),
        (0, _instagramProvider.W2gInstagram),
        (0, _twitterProvider.W2gTwitter),
        (0, _tenorProvider.W2gTenor),
        (0, _pinterestProvider.W2gPinterest),
        (0, _coubProvider.W2gCoub),
        (0, _dailymotionProvider.W2gDailymotion),
        (0, _facebookProvider.W2gFacebook),
        (0, _soundcloudProvider.W2gSoundcloud),
        (0, _mixcloudProvider.W2gMixcloud),
        (0, _slidesProvider.W2gSlides),
        (0, _osmProvider.W2gOsm),
        (0, _snipzeroProvider.W2gSnipZero),
        (0, _nativeProvider.W2gNative),
        (0, _w2GsyncProvider.W2gSync)
    ];
    var appsObj = {
        activeDescription: "Search OR paste a link to any site",
        activeLogo: "",
        activeName: "",
        sortedApps: [],
        showApps: false,
        showAppsNote: true,
        auth: false,
        searchTerm: "",
        searchPage: 1,
        searchResults: [],
        searchResults_1: [],
        searchResults_2: [],
        showResults: false,
        itemsFound: false,
        canSearch: true,
        __searchInput: document.createElement("input"),
        __playGoInput: document.createElement("input"),
        canImport: false,
        importRunning: false,
        showPlayAndGo: false,
        importDone: false,
        searching: false,
        blockAddAll: false,
        canLoadMore: false,
        searchSuggestions: [],
        searchRendered: function() {},
        inputFocus: function() {},
        searchInitiated: function() {},
        click: function(val, app) {
            this.searchTerm = "";
            this.searchSuggestions = [];
            this.canLoadMore = false;
            this.activateMenu(app);
            if (app.provider_type === "browse") this.searchSubmitTopbar(true);
            if (this.__searchInput && (0, _w2Ghelpers.$w2g).isMobile === false) this.__searchInput.focus();
        },
        dblclick: function(val, app) {
            this.searchTerm = "";
            this.searchSuggestions = [];
            this.canLoadMore = false;
            this.activateMenu(app);
            this.showApps = false;
            this.searchSubmitTopbar();
        },
        imgLoadError: function(ele, app, evt) {
            evt.target.naturalWidth === 120 && evt.target.naturalHeight === 90 && app.id.indexOf("//www.youtube.com");
        },
        activateMenu: function(app) {
            this.showAppsNote = false;
            this.activeDescription = app.description || "Search OR paste a link to any site";
            this.activeLogo = app.icon_path || "";
            this.activeName = app.provider_name || "";
            app.active = true;
            if (activeApp !== app) {
                activeApp.active = false;
                activeApp = app;
            }
            setTimeout((function() {
                this.showAppsNote = true;
            }).bind(this), 0);
            this.searchSuggestions = [];
        },
        activateApp: function(name) {
            let app = availApps.find((ele)=>ele.provider_name === name);
            if (app) this.activateMenu(app);
        },
        playAndGoSubmit: function() {
            this.lookup(this.searchTerm.trim(), (function(vid, provider) {
                if (vid.length > 0) {
                    this.play(null, vid[0]);
                    this.showPlayAndGo = false;
                }
                this.searchTerm = "";
            }).bind(this));
        },
        searchSubmitTopbar: function(close) {
            this.searchSubmit(close);
        },
        searchSubmit: function(close) {
            shouldSuggest = false;
            this.canImport = false;
            this.importDone = false;
            this.importRunning = false;
            this.searchResults = [];
            this.searchSuggestions = [];
            this.searchResults_1 = [];
            this.searchResults_2 = [];
            this.searchPage = 1;
            this.itemsFound = true;
            this.showApps = typeof close === "undefined" ? false : !close;
            this.showResults = true;
            this.canLoadMore = false;
            if (this.searchTerm.trim().indexOf('http') === 0) this.submitLookup();
            else this.search();
            this.searchInitiated();
        },
        search: function() {
            this.searching = true;
            var term = this.searchTerm.indexOf("publisher:") === 0 ? this.searchTerm : encodeURIComponent(this.searchTerm);
            activeApp.search(term, 10, this.searchPage, (function(data) {
                this.setResults(data);
                if (this.__searchInput && (0, _w2Ghelpers.$w2g).isMobile === true) this.__searchInput.blur();
                this.searchRendered();
            }).bind(this));
        },
        setResults: function(data) {
            _loadResults(data);
            this.itemsFound = data.length > 0;
            this.canLoadMore = data.length >= 10 && activeApp.provider_name !== "youtube";
        },
        submitLookup: function() {
            this.searching = true;
            this.canImport = false;
            this.importDone = false;
            this.importRunning = false;
            this.lookup(this.searchTerm.trim(), (function(vid, provider) {
                this.itemsFound = vid.length > 0;
                _loadResults(vid);
                if (vid.length > 0) {
                    this.activateMenu(provider);
                    if (vid.length > 1) this.canImport = true;
                    this.searchRendered();
                }
            }).bind(this));
        },
        inputPaste: function() {
            setTimeout((function() {
                if (this.searchTerm.indexOf("http") === 0) this.searchSubmitTopbar();
            }).bind(this), 1);
        },
        handleSuggestions: function(obj, para, evt) {
            if (evt.keyCode === 38 || evt.keyCode === 40) {
                evt.preventDefault();
                if (this.searchSuggestions.length > 0) {
                    let ele = this.searchSuggestions.findIndex((ele)=>ele.a === true);
                    if (ele >= 0) this.searchSuggestions[ele].a = false;
                    ele = evt.keyCode === 38 ? ele - 1 : ele + 1;
                    ele = ele < 0 ? this.searchSuggestions.length - 1 : ele;
                    ele = ele > this.searchSuggestions.length - 1 ? 0 : ele;
                    this.searchSuggestions[ele].a = true;
                    this.searchTerm = this.searchSuggestions[ele].t;
                }
            }
        },
        setSuggestion: function(obj, ele) {
            this.searchTerm = ele.t;
            this.searchSubmitTopbar();
        },
        fetchSuggestions: function() {
            shouldSuggest = true;
            if (this.searchTerm.trim().indexOf('http') !== 0 && this.searchTerm.length >= 3 && (sugStop === 0 || this.searchTerm.length <= sugStop) && activeApp && typeof activeApp.getSearchSuggestion !== "undefined") activeApp.getSearchSuggestion(this.searchTerm, (function(res) {
                if (shouldSuggest === true) {
                    if (res.length === 0 && this.searchTerm > 3) sugStop = this.searchTerm.length;
                    else sugStop = 0;
                    res = res.slice(0, 10);
                    let data = [];
                    res.forEach(function(ele) {
                        data.push({
                            t: ele,
                            a: false
                        });
                    });
                    if (this.searchTerm.length >= 3) this.searchSuggestions = data;
                }
            }).bind(this));
            else if (this.searchTerm.length === 0) this.searchSuggestions = [];
        },
        lookupAndRender: function(url) {
            this.searchSuggestions = [];
            this.searching = true;
            this.showResults = true;
            this.canImport = false;
            this.importDone = false;
            this.importRunning = false;
            this.lookup(url.trim(), (function(vid, provider) {
                this.itemsFound = vid.length > 0;
                _loadResults(vid);
            }).bind(this));
        },
        lookup: function(url, cb) {
            var result, i, success = false;
            for(i = 0; i < availApps.length; i++)try {
                result = availApps[i].videoLookUp(url, function(p) {
                    return function(vid, prov) {
                        if (vid[0]) vid[0].provider_icon = p.icon_path;
                        cb(vid, p);
                    };
                }(availApps[i]), availApps[i].active);
                if (result) {
                    success = true;
                    break;
                }
            } catch (e) {
                console.log(e);
            }
            if (success === false) cb([], "Error");
        },
        getProvider (url) {
            for(i = 0; i < availApps.length; i++){
                if (availApps[i].videoLookUp(url)) return availApps[i];
            }
            return false;
        },
        clearSearch: function() {
            this.searchTerm = "";
            this.searchSuggestions = [];
            this.showPlayAndGo = false;
            if (this.__searchInput) this.__searchInput.focus();
        },
        play: function(val, ele) {
            if (ele.collection) {
                this.searchTerm = ele.id;
                this.searchSubmit();
            }
        },
        share: function(val, ele) {
            ele.price = ele.price === "share" ? "" : "share";
            this.searchResults = [
                ele
            ];
            this.shareToggled(ele);
        },
        shareToggled: function() {},
        addToPl: function(val, ele) {},
        addAllToPl: function(val, ele) {},
        suggest: function(val, ele) {},
        loadMore: function() {
            if (this.canLoadMore) {
                this.searchPage++;
                this.search();
            }
        },
        loadMoreFromPub: function(val, ele) {
            if (ele.publisherID) {
                this.searchTerm = "publisher:" + ele.publisherID;
                this.searchPage = 1;
                this.search();
            }
        },
        toggleApps: function() {
            this.showApps = !this.showApps;
        }
    };
    for(var i = 0; i < providers.length; i++){
        var prov = new providers[i]();
        if (typeof sorted_providers[prov.provider_category] === "undefined") sorted_providers[prov.provider_category] = [];
        sorted_providers[prov.provider_category].push(prov);
    }
    for(const p in sorted_providers)if (sorted_providers.hasOwnProperty(p)) appsObj.sortedApps.push({
        category: p,
        providers: sorted_providers[p]
    });
    var w2gApps = new (0, _w2Gdataobject.W2gDataObject)(appsObj);
    appsObj.sortedApps.forEach(function(a) {
        for(let i = 0; i < a.providers.length; i++)availApps.push(a.providers[i]);
    });
    availApps.sort(function(a, b) {
        return a.lookupFallback === true ? 1 : b.lookupFallback === true ? -1 : 0;
    });
    activeApp = availApps[0];
    activeApp.active = true;
    appsObj.activeLogo = activeApp.icon_path;
    appsObj.activeName = activeApp.provider_name;
    appsObj.activeDescription = activeApp.description || "Search OR paste a link to any site";
    w2gApps._addHandler("showApps", function(prop, val) {
        if (val) w2gApps.searchSuggestions = [];
        if (w2gApps.__searchInput && (0, _w2Ghelpers.$w2g).isMobile === true) w2gApps.__searchInput.blur();
    });
    w2gApps._addHandler("showPlayAndGo", function(prop, val) {
        if (w2gApps.__playGoInput) {
            if (val) w2gApps.__playGoInput.focus();
            else w2gApps.__playGoInput.blur();
            w2gApps.searchTerm = "";
        }
    });
    function _loadResults(data) {
        w2gApps.searching = false;
        w2gApps.searchResults = data;
        if (w2gApps.searchPage === 1) {
            if (window.innerWidth <= 965) {
                w2gApps.searchResults_1 = data.slice(0, 2);
                w2gApps.searchResults_2 = data.slice(2);
            } else {
                w2gApps.searchResults_1 = data.slice(0, 2);
                w2gApps.searchResults_2 = data.slice(2);
            }
        } else {
            var items = [
                w2gApps.searchResults_2.length,
                0
            ].concat(data);
            Array.prototype.splice.apply(w2gApps.searchResults_2, items);
        }
    }
    new (0, _w2Gbind.W2gBind)(w2gApps, eleClass);
    return w2gApps;
};

},{"../w2ghelpers":"f460H","../w2gbind/w2gdataobject":"7VVht","../w2gbind/w2gbind":"bca7W","../providers/youtube-provider":"koimI","../providers/streaming-provider":"4LY6V","../providers/vimeo-provider":"8IgZH","../providers/kick-provider":"74Zms","../providers/apple-provider":"e2G5P","../providers/twitch-provider":"dMgoP","../providers/tiktok-provider":"lWcDZ","../providers/w2gpodcasts-provider":"6HaB7","../providers/radio-provider":"jdtTj","../providers/w2gshorts-provider":"hoqXQ","../providers/suno-provider":"ccJLI","../providers/udio-provider":"8zFs3","../providers/instagram-provider":"fL5u8","../providers/twitter-provider":"7XOnk","../providers/tenor-provider":"5rSfs","../providers/pinterest-provider":"hp0L1","../providers/coub-provider":"1lCxH","../providers/dailymotion-provider":"42BCK","../providers/facebook-provider":"4XDSt","../providers/soundcloud-provider":"dMYwn","../providers/mixcloud-provider":"cyE8P","../providers/slides-provider":"f2Qsi","../providers/osm-provider":"7LRST","../providers/snipzero-provider":"aniX9","../providers/native-provider":"aOT4L","../providers/w2gcam-provider":"a1fQb","../providers/w2gscreen-provider":"avBTO","../providers/w2gsync-provider":"azOZx","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"koimI":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Youtube API and init player
parcelHelpers.export(exports, "W2gYoutube", ()=>W2gYoutube);
var _w2Ghelpers = require("../w2ghelpers");
var _1Png = require("url:../../img/providers/1.png");
var _1PngDefault = parcelHelpers.interopDefault(_1Png);
var _json = require("url:../../../data/yt/*.json");
function W2gYoutube() {
    this.provider_name = "youtube";
    this.provider_type = "search";
    this.provider_category = "video";
    this.icon_path = (0, _1PngDefault.default);
    this.description = "Search OR Paste a link to a Youtube video";
    this.active = false;
    this.nextToken = "";
    this.saveSearch = "Save Search";
    this.ytRegions = [
        "DE",
        "US",
        "GB",
        "FR",
        "SE",
        "CA",
        "IT",
        "ES",
        "PL",
        "AT",
        "NL"
    ];
}
//Lookup video info through youtube API
W2gYoutube.prototype.videoLookUp = function(url, callback) {
    var listparser = url.match(/\/\/(?:www\.|music\.|m\.)?youtube.com\/\S+list=(\S+)$/);
    var idparser = url.match(/\/\/(?:www\.|music\.|m\.)?(?:youtube\.com|youtu\.be|youtube-nocookie\.com)[\S]*(?:v=|embed\/|v\/|\/)([^"&?=\/\s]{11})/);
    var results = [], shouldWait = 0, waitCount = 0;
    if (listparser && callback) {
        shouldWait++;
        (0, _w2Ghelpers.$w2g).getJSON("https://search.w2g.tv/w2g_search/playlist?id=" + listparser[1]).then((function(videos) {
            var clip;
            videos.forEach((function(v) {
                clip = {};
                clip.id = v.url;
                clip.provider = this.provider_name;
                clip.title = v.title;
                clip.publisher = v.creator;
                clip.publisherID = null;
                clip.desc = "";
                clip.price = "";
                clip.thumb = v.thumb;
                results.push(clip);
            }).bind(this));
            check();
        }).bind(this));
    }
    if (idparser && callback) {
        shouldWait++;
        (0, _w2Ghelpers.$w2g).getJSON("https://search.w2g.tv/w2g_search/lookup?url=//www.youtube.com/watch?v=" + idparser[1]).then((function(data) {
            var info = {};
            info.id = data.url;
            info.provider = this.provider_name;
            info.title = data.title;
            info.publisher = data.creator || "";
            info.publisherID = null;
            info.desc = "";
            info.price = "";
            info.thumb = data.thumb;
            results.unshift(info);
            check();
        }).bind(this)).catch((function() {
            var info = {};
            info.id = "//www.youtube.com/watch?v=" + idparser[1];
            info.provider = this.provider_name;
            info.title = url;
            info.publisher = "";
            info.publisherID = null;
            info.desc = "";
            info.price = "";
            info.thumb = "https://i.ytimg.com/vi/" + idparser[1] + "/mqdefault.jpg";
            results.unshift(info);
            check();
        }).bind(this));
    }
    function check() {
        waitCount++;
        if (waitCount >= shouldWait) {
            if (shouldWait > 1 && results.length > 1) results.shift();
            callback(results, "youtube");
        }
    }
    return listparser !== null || idparser !== null;
};
W2gYoutube.prototype.search = function(term, count, page, callback) {
    if (term.indexOf("publisher:") === 0) (0, _w2Ghelpers.$w2g).getJSON("https://search.w2g.tv/w2g_search/channel?id=" + term.split(":")[1]).then((function(videos) {
        var results = [], clip, channelID;
        videos.forEach((function(v) {
            //channelID = v.creatorurl ? v.creatorurl.match(/\/channel\/(\S+)$/) : null;
            //channelID = channelID && channelID.length === 2 ? channelID[1] : "";
            clip = {};
            clip.id = v.url;
            clip.provider = this.provider_name;
            clip.title = v.title;
            clip.publisher = v.creator || "";
            clip.publisherID = nullS;
            clip.desc = "";
            clip.price = "";
            clip.thumb = v.thumb;
            results.push(clip);
        }).bind(this));
        callback(results, "youtube");
    }).bind(this));
    else if (term !== "") (0, _w2Ghelpers.$w2g).getJSON("https://search.w2g.tv/w2g_search/search?q=" + term).then((function(videos) {
        var results = [], clip, channelID;
        videos.forEach((function(v) {
            //channelID = v.creatorurl ? v.creatorurl.match(/\/channel\/(\S+)$/) : null;
            //channelID = channelID && channelID.length === 2 ? channelID[1] : "";
            clip = {};
            clip.id = v.url;
            clip.provider = this.provider_name;
            clip.title = v.title;
            clip.publisher = v.creator || "";
            clip.publisherID = null;
            clip.desc = "";
            clip.price = "";
            clip.thumb = v.thumb;
            results.push(clip);
        }).bind(this));
        callback(results, "youtube");
    }).bind(this)).catch(function() {
        callback([], "youtube");
    });
    else {
        var region = this.ytRegions.indexOf(navigator.language.toUpperCase()) !== -1 ? navigator.language.toUpperCase() : "US";
        var results = [], clip;
        (0, _w2Ghelpers.$w2g).getJSON(_json["youtube-" + region]).then((function(v) {
            let itms = v.items.slice(0, 15);
            itms.forEach((function(v, i) {
                clip = {};
                clip.id = "//www.youtube.com/watch?v=" + (typeof v.id === "object" ? v.id.videoId : v.id);
                clip.provider = this.provider_name;
                clip.title = v.snippet.title;
                clip.publisher = v.snippet.channelTitle;
                clip.publisherID = null;
                clip.date = new Date(v.snippet.publishedAt).toDateString();
                clip.desc = v.snippet.description;
                clip.price = "";
                clip.thumb = v.snippet.thumbnails.medium.url;
                results.push(clip);
            }).bind(this));
            callback(results, "youtube");
        }).bind(this));
    }
};
W2gYoutube.prototype.getSearchSuggestion = function(term, callback) {
    (0, _w2Ghelpers.$w2g).getJSON("https://search.w2g.tv/w2g_search/suggestions?q=" + term).then(function(data) {
        callback(data);
    });
};

},{"../w2ghelpers":"f460H","url:../../img/providers/1.png":"edcsQ","url:../../../data/yt/*.json":"2s6Lx","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"edcsQ":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("9cZCp");

},{}],"2s6Lx":[function(require,module,exports,__globalThis) {
const _temp0 = require("f296c2e68a7ba815");
const _temp1 = require("3735e63db6b27f13");
const _temp2 = require("9a64401e8aecfec9");
const _temp3 = require("7299e3fe57ebf783");
const _temp4 = require("6d8e1e983e7bf1e1");
const _temp5 = require("4aebfa70ff35ba76");
const _temp6 = require("e809ebfa8d40d531");
const _temp7 = require("aa0d928600dc7f48");
const _temp8 = require("f3f33d5d449e3591");
const _temp9 = require("cd83897c646a7e9c");
module.exports = {
    "vimeo": _temp0,
    "youtube-DE": _temp1,
    "youtube-EN": _temp2,
    "youtube-ES": _temp3,
    "youtube-FR": _temp4,
    "youtube-IT": _temp5,
    "youtube-NL": _temp6,
    "youtube-PL": _temp7,
    "youtube-TR": _temp8,
    "youtube-US": _temp9
};

},{"f296c2e68a7ba815":"7xEzX","3735e63db6b27f13":"1wUXA","9a64401e8aecfec9":"6sfqn","7299e3fe57ebf783":"9mOqp","6d8e1e983e7bf1e1":"gAfZz","4aebfa70ff35ba76":"052yJ","e809ebfa8d40d531":"cNcSy","aa0d928600dc7f48":"crjL6","f3f33d5d449e3591":"42fSj","cd83897c646a7e9c":"8ncqf"}],"7xEzX":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("aOuun");

},{}],"1wUXA":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("hM09k");

},{}],"6sfqn":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("3E6sQ");

},{}],"9mOqp":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("6j3n9");

},{}],"gAfZz":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("4ExYD");

},{}],"052yJ":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("fxM0U");

},{}],"cNcSy":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("gxarM");

},{}],"crjL6":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("YTNie");

},{}],"42fSj":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("8avj8");

},{}],"8ncqf":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("82TJT");

},{}],"4LY6V":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "W2gStreaming", ()=>W2gStreaming);
var _33Png = require("url:../../img/providers/33.png");
var _33PngDefault = parcelHelpers.interopDefault(_33Png);
function W2gStreaming() {
    this.provider_name = "Streaming";
    this.provider_type = "search";
    this.provider_category = "video";
    this.icon_path = (0, _33PngDefault.default);
    this.active = false;
    this.description = "Paste a link to any streaming service. (Account / Subscription required for each user of this room.)";
}
W2gStreaming.prototype.videoLookUp = function(url, callback) {
    return false;
};
//Search for video through facebook API
W2gStreaming.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};

},{"url:../../img/providers/33.png":"awCEV","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"awCEV":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("apERV");

},{}],"8IgZH":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Youtube API and init player
parcelHelpers.export(exports, "W2gVimeo", ()=>W2gVimeo);
var _w2Ghelpers = require("../w2ghelpers");
var _2Png = require("url:../../img/providers/2.png");
var _2PngDefault = parcelHelpers.interopDefault(_2Png);
function W2gVimeo() {
    this.provider_name = "vimeo";
    this.provider_type = "search";
    this.provider_category = "video";
    this.icon_path = (0, _2PngDefault.default);
    this.description = "Search OR Paste a link to a Vimeo video";
    this.active = false;
    this.defaultSearch = "short film";
    this.saveSearch = false;
}
//Lookup video info through youtube API
W2gVimeo.prototype.videoLookUp = function(url, callback) {
    var clip = {};
    if (url.match(/^https?:\/\/vimeo\.com/)) {
        if (callback) (0, _w2Ghelpers.$w2g).getJSON("https://vimeo.com/api/oembed.json?url=" + url, "GET", null, "omit").then((function(v) {
            clip.id = url;
            clip.provider = this.provider_name;
            clip.title = v.title || "Vimeo Video";
            clip.publisher = v.author_name || "Vimeo";
            clip.publisherID = null;
            clip.desc = "";
            clip.price = "";
            clip.thumb = v.thumbnail_url || "https://static.w2g.tv/static/providers/2.png";
            clip.duration = v.duration || 1;
            clip.cc = false;
            clip.explicit = false;
            callback([
                clip
            ], "vimeo");
        }).bind(this)).catch((function(err) {
            callback([], "vimeo");
        }).bind(this));
        return true;
    } else return false;
};
W2gVimeo.prototype.search = function(term, count, page, callback) {
    function parseResponse(data) {
        var results = [], clip;
        data.data.forEach((function(v, i) {
            clip = {};
            clip.id = "//vimeo.com/" + v.uri.split("/")[2];
            clip.provider = this.provider_name;
            clip.title = v.name;
            clip.publisher = v.user.name;
            clip.publisherID = v.user.uri.split("/")[2];
            clip.date = new Date(v.created_time).toDateString();
            clip.desc = v.description;
            clip.price = "";
            clip.thumb = v.pictures[2].link;
            results.push(clip);
        }).bind(this));
        callback(results, "vimeo");
    }
    var safe = this.saveSearch;
    var safesearch = safe === true ? "&filter=content_rating&filter_content_rating=safe" : "";
    if (term.indexOf("publisher:") === 0) (0, _w2Ghelpers.$w2g).getJSON("https://search.w2g.tv/badger_api/api/vimeo/users/" + term.split(":")[1] + "/videos?client_id=1857ad39c4dbead68e92c46df04539664debda97&page=" + page + "&fields=uri,name,description,pictures,created_time,user.uri,user.name&sort=modified_time&per_page=" + count, "GET", null, "omit").then(parseResponse.bind(this));
    else if (term !== "") (0, _w2Ghelpers.$w2g).getJSON("https://search.w2g.tv/badger_api/api/vimeo/videos?query=" + term + safesearch + "&client_id=1857ad39c4dbead68e92c46df04539664debda97&page=" + page + "&fields=uri,name,description,pictures,created_time,user.uri,user.name&per_page=" + count, "GET", null, "omit").then(parseResponse.bind(this));
    else (0, _w2Ghelpers.$w2g).getJSON("https://search.w2g.tv/badger_api/api/vimeo/videos?query=funny" + safesearch + "&client_id=1857ad39c4dbead68e92c46df04539664debda97&page=" + page + "&fields=uri,name,description,pictures,created_time,user.uri,user.name&per_page=" + count, "GET", null, "omit").then(parseResponse.bind(this));
};

},{"../w2ghelpers":"f460H","url:../../img/providers/2.png":"bIWXc","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"bIWXc":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("lKWVt");

},{}],"74Zms":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "W2gKick", ()=>W2gKick);
var _35Png = require("url:../../img/providers/35.png");
var _35PngDefault = parcelHelpers.interopDefault(_35Png);
function W2gKick() {
    this.provider_name = "kick";
    this.provider_type = "search";
    this.provider_category = "video";
    this.icon_path = (0, _35PngDefault.default);
    this.active = false;
    this.description = "Paste a link to a kick.com live stream.";
}
W2gKick.prototype.videoLookUp = function(url, callback) {
    return false;
};
//Search for video through facebook API
W2gKick.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};

},{"url:../../img/providers/35.png":"eCFwG","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"eCFwG":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("9r9Tw");

},{}],"e2G5P":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "W2gApple", ()=>W2gApple);
var _34Png = require("url:../../img/providers/34.png");
var _34PngDefault = parcelHelpers.interopDefault(_34Png);
var _w2Ghelpers = require("../w2ghelpers");
const stores = '["dz","ao","ai","ag","ar","am","au","at","az","bs","bh","bb","by","be","bz","bj","bm","bt","bo","ba","bw","br","vg","bg","kh","cm","ca","cv","ky","td","cl","cn","co","cr","hr","cy","cz","ci","cd","dk","dm","do","ec","eg","sv","ee","sz","fj","fi","fr","ga","gm","ge","de","gh","gr","gd","gt","gw","gy","hn","hk","hu","is","in","id","iq","ie","il","it","jm","jp","jo","kz","ke","kr","xk","kw","kg","la","lv","lb","lr","ly","lt","lu","mo","mg","mw","my","mv","ml","mt","mr","mu","mx","fm","md","mn","me","ms","ma","mz","mm","na","np","nl","nz","ni","ne","ng","mk","no","om","pa","pg","py","pe","ph","pl","pt","qa","cg","ro","ru","rw","sa","sn","rs","sc","sl","sg","sk","si","sb","za","es","lk","kn","lc","vc","sr","se","ch","tw","tj","tz","th","to","tt","tn","tm","tc","tr","ae","ug","ua","gb","us","uy","uz","vu","ve","vn","ye","zm","zw"]';
let storefront = "us";
(0, _w2Ghelpers.$w2g).getJSON("/users/get_userlocation").then(function(res) {
    storefront = res.country.toLowerCase();
});
function W2gApple() {
    this.provider_name = "Apple Music";
    this.provider_type = "search";
    this.provider_category = "music";
    this.active = false;
    this.icon_path = (0, _34PngDefault.default);
    this.description = "Search OR paste a link to a song on Apple Music (BETA) (https://music.apple.com/...)";
    this.defaultSearch = "music";
    this.saveSearch = false;
    this.currentKey = null;
    this.getKey = function() {
        return new Promise((function(resolve, reject) {
            if (!this.currentKey) (0, _w2Ghelpers.$w2g).getJSON("https://static.w2g.tv/static/tokens/aplm.json", null, null, "omit").then((function(data) {
                this.currentKey = data.key;
                resolve(this.currentKey);
            }).bind(this)).catch(function() {
                reject("no key");
            });
            else resolve(this.currentKey);
        }).bind(this));
    };
}
//Lookup video info through youtube API
W2gApple.prototype.videoLookUp = function(url, callback) {
    let results = [], match = url.match(/^https:\/\/music\.apple\.com\/([a-z]+)\/\S+i=([0-9]+)/);
    if (match && match.length === 3) {
        if (callback) this.getKey().then((function(access_token) {
            (0, _w2Ghelpers.$w2g).getJSON("https://api.music.apple.com/v1/catalog/" + match[1] + "/songs/" + match[2], "GET", {
                'Authorization': 'Bearer ' + access_token
            }, "omit").then((function(d) {
                if (d.data && d.data[0]) results.push({
                    id: d.data[0].attributes.url,
                    provider: "applemusic",
                    title: d.data[0].attributes.artistName + " - " + d.data[0].attributes.name,
                    publisher: null,
                    publisherID: null,
                    desc: "",
                    thumb: d.data[0].attributes.artwork.url.replace("{w}", "200").replace("{h}", "200")
                });
                callback(results, this.provider_name);
            }).bind(this)).catch(function() {
                callback([]);
            });
        }).bind(this));
        return true;
    } else return false;
};
W2gApple.prototype.search = function(term, count, page, callback) {
    let results = [];
    this.getKey().then((function(access_token) {
        (0, _w2Ghelpers.$w2g).getJSON("https://api.music.apple.com/v1/catalog/" + storefront + "/search?types=songs&limit=25&term=" + term.replace(" ", "+"), "GET", {
            'Authorization': 'Bearer ' + access_token
        }, "omit").then((function(d) {
            if (d.results.songs) d.results.songs.data.forEach((function(s) {
                results.push({
                    id: s.attributes.url,
                    provider: "applemusic",
                    title: s.attributes.artistName + " - " + s.attributes.name,
                    publisher: null,
                    publisherID: null,
                    desc: "",
                    thumb: s.attributes.artwork.url.replace("{w}", "200").replace("{h}", "200")
                });
            }).bind(this));
            callback(results, this.provider_name);
        }).bind(this)).catch(function() {
            callback([]);
        });
    }).bind(this));
};
W2gApple.prototype.getSearchSuggestion = function(term, callback) {
    this.getKey().then((function(access_token) {
        (0, _w2Ghelpers.$w2g).getJSON("https://api.music.apple.com/v1/catalog/" + storefront + "/search/suggestions?types=songs&kinds=terms,topResults&limit=10&term=" + term.replace(" ", "+"), "GET", {
            'Authorization': 'Bearer ' + access_token
        }, "omit").then(function(res) {
            let data = [];
            if (res.results && res.results.suggestions.length > 1) res.results.suggestions.forEach(function(r) {
                if (r.kind === "terms") data.push(r.displayTerm);
                else if (r.kind === "topResults") data.push(r.content.attributes.artistName.toLowerCase() + " " + r.content.attributes.name.toLowerCase());
            });
            callback(data);
        });
    }).bind(this));
};

},{"url:../../img/providers/34.png":"a2f8W","../w2ghelpers":"f460H","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"a2f8W":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("73e7t");

},{}],"dMgoP":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Youtube API and init player
parcelHelpers.export(exports, "W2gTwitch", ()=>W2gTwitch);
var _w2Ghelpers = require("../w2ghelpers");
var _7Png = require("url:../../img/providers/7.png");
var _7PngDefault = parcelHelpers.interopDefault(_7Png);
function W2gTwitch() {
    this.provider_name = "twitch";
    this.provider_type = "search";
    this.provider_category = "video";
    this.icon_path = (0, _7PngDefault.default);
    this.active = false;
    this.defaultSearch = "featured";
    this.description = "Paste a link to a Twitch stream video or clip.";
    this.currentKey = null;
    this.getKey = function() {
        return new Promise((function(resolve, reject) {
            if (!this.currentKey) (0, _w2Ghelpers.$w2g).getJSON("https://static.w2g.tv/static/tokens/twitch.json", null, null, "omit").then((function(data) {
                this.currentKey = data.access_token;
                resolve(this.currentKey);
            }).bind(this)).catch(function() {
                reject("no key");
            });
            else resolve(this.currentKey);
        }).bind(this));
    };
}
W2gTwitch.prototype.videoLookUp = function(url, callback) {
    var clip, data, matches;
    if (url.match(/^https?:\/\/([a-z]+\.)?twitch\.tv\/.+/)) {
        matches = url.match(/^https?:\/\/(?:[a-z]+\.)?twitch\.tv\/.+\/clip\/([a-zA-Z0-9_\-]+)/) || url.match(/^https?:\/\/clips\.twitch\.tv\/([a-zA-Z0-9_\-]+)$/);
        if (matches && matches.length === 2) {
            if (callback) this.getKey().then((function(access_token) {
                (0, _w2Ghelpers.$w2g).getJSON("https://api.twitch.tv/helix/clips?id=" + matches[1], "GET", {
                    'Client-ID': 'jcrgthxmtvgmyk50ftscbxgc4a732cm',
                    'Authorization': 'Bearer ' + access_token
                }, "omit").then((function(d) {
                    if (d.data.length > 0) {
                        data = d.data[0];
                        clip = {};
                        clip.id = data.url;
                        clip.provider = this.provider_name;
                        clip.title = data.title;
                        clip.publisher = data.broadcaster_name;
                        clip.publisherID = data.broadcaster_id;
                        clip.desc = "";
                        clip.price = "";
                        clip.thumb = data.thumbnail_url;
                        clip.duration = 0;
                        clip.cc = false;
                        clip.explicit = false;
                        callback([
                            clip
                        ], this.provider_name);
                    } else callback([], this.provider_name);
                }).bind(this)).catch((function() {
                    callback([], this.provider_name);
                }).bind(this));
            }).bind(this));
            return true;
        }
        matches = url.match(/^https?:\/\/(?:[a-z]+\.)?twitch\.tv\/videos\/([0-9]+)/);
        if (matches && matches.length === 2) {
            if (callback) this.getKey().then((function(access_token) {
                (0, _w2Ghelpers.$w2g).getJSON("https://api.twitch.tv/helix/videos?id=" + matches[1], "GET", {
                    'Client-ID': 'jcrgthxmtvgmyk50ftscbxgc4a732cm',
                    'Authorization': 'Bearer ' + access_token
                }, "omit").then((function(d) {
                    if (d.data.length > 0) {
                        data = d.data[0];
                        clip = {};
                        clip.id = data.url;
                        clip.provider = this.provider_name;
                        clip.title = data.title;
                        clip.publisher = data.user_name;
                        clip.publisherID = data.user_id;
                        clip.desc = "";
                        clip.price = "";
                        clip.thumb = data.thumbnail_url.replace("%{width}x%{height}", "800x450");
                        clip.duration = 0;
                        clip.cc = false;
                        clip.explicit = false;
                        callback([
                            clip
                        ], this.provider_name);
                    } else callback([], this.provider_name);
                }).bind(this)).catch((function() {
                    callback([], this.provider_name);
                }).bind(this));
            }).bind(this));
            return true;
        }
        matches = url.match(/^https?:\/\/(?:[a-z]+\.)?twitch\.tv\/(\w+)/);
        if (matches && matches.length === 2) {
            if (callback) this.getKey().then((function(access_token) {
                (0, _w2Ghelpers.$w2g).getJSON("https://api.twitch.tv/helix/streams?user_login=" + matches[1], "GET", {
                    'Client-ID': 'jcrgthxmtvgmyk50ftscbxgc4a732cm',
                    'Authorization': 'Bearer ' + access_token
                }, "omit").then((function(d) {
                    if (d.data.length > 0) {
                        data = d.data[0];
                        clip = {};
                        clip.id = url;
                        clip.provider = this.provider_name;
                        clip.title = data.title;
                        clip.publisher = data.user_name;
                        clip.publisherID = data.user_id;
                        clip.desc = "";
                        clip.price = "";
                        clip.thumb = data.thumbnail_url.replace("{width}x{height}", "800x450");
                        clip.duration = 0;
                        clip.cc = false;
                        clip.explicit = false;
                        callback([
                            clip
                        ], this.provider_name);
                    } else callback([], this.provider_name);
                }).bind(this)).catch((function() {
                    callback([], this.provider_name);
                }).bind(this));
            }).bind(this));
            return true;
        }
        return false;
    } else return false;
};
W2gTwitch.prototype.search = function(term, count, page, callback) {
    var results = [], clip;
    if (term.indexOf("publisher:") === 0) this.getKey().then((function(access_token) {
        (0, _w2Ghelpers.$w2g).getJSON("https://api.twitch.tv/helix/videos?first=50&user_id=" + term.split(":")[1], "GET", {
            'Client-ID': 'jcrgthxmtvgmyk50ftscbxgc4a732cm',
            'Authorization': 'Bearer ' + access_token
        }, "omit").then((function(d) {
            d.data.forEach((function(v, i) {
                clip = {};
                clip.id = v.url;
                clip.provider = this.provider_name;
                clip.title = v.title;
                clip.publisher = v.user_name;
                clip.publisherID = v.user_id;
                clip.desc = "";
                clip.price = "";
                clip.thumb = v.thumbnail_url ? v.thumbnail_url.replace("%{width}x%{height}", "800x450") : "https://static.w2g.tv/static/providers/7.png";
                results.push(clip);
            }).bind(this));
            callback(results, this.provider_name);
        }).bind(this));
    }).bind(this));
    else callback(results, this.provider_name);
};

},{"../w2ghelpers":"f460H","url:../../img/providers/7.png":"594Dw","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"594Dw":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("apybz");

},{}],"lWcDZ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Facebook API and init player
parcelHelpers.export(exports, "W2gTikTok", ()=>W2gTikTok);
var _w2Ghelpers = require("../w2ghelpers");
var _22Png = require("url:../../img/providers/22.png");
var _22PngDefault = parcelHelpers.interopDefault(_22Png);
function W2gTikTok() {
    this.provider_name = "TikTok";
    this.provider_type = "search";
    this.provider_category = "social";
    this.icon_path = (0, _22PngDefault.default);
    this.active = false;
    this.description = "Paste a link to a TikTok video.";
}
var matcher = [
    {
        pattern: /^https:\/\/www\.tiktok\.com/,
        url: "https://www.tiktok.com/oembed?url=#{url}"
    }
];
W2gTikTok.prototype.videoLookUp = function(url, callback) {
    var matched = false;
    for(var i = 0; i < matcher.length; i++)if (url.match(matcher[i].pattern)) {
        matched = true;
        if (callback) (0, _w2Ghelpers.$w2g).getJSON(matcher[i].url.replace("#{url}", url), null, null, 'omit').then((function(vid) {
            if (vid.html) {
                var info = {};
                info.id = url;
                info.provider = this.provider_name;
                info.title = vid.title || "<untitled>";
                info.publisher = vid.author_name;
                info.publisherID = null;
                info.desc = "";
                info.price = "";
                info.thumb = vid.thumbnail_url;
                info.cc = false;
                info.duration = 0;
                info.explicit = false;
                callback([
                    info
                ], this.provider_name);
            } else callback([], this.provider_name);
        }).bind(this)).catch((function() {
            callback([], this.provider_name);
        }).bind(this));
        break;
    }
    return matched;
};
//Search for video through facebook API
W2gTikTok.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};

},{"../w2ghelpers":"f460H","url:../../img/providers/22.png":"jxazy","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"jxazy":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("7ZFxv");

},{}],"6HaB7":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Youtube API and init player
parcelHelpers.export(exports, "W2gPodcasts", ()=>W2gPodcasts);
var _w2Ghelpers = require("../w2ghelpers");
var _jsonP = require("../utils/jsonP");
var _20Png = require("url:../../img/providers/20.png");
var _20PngDefault = parcelHelpers.interopDefault(_20Png);
function W2gPodcasts() {
    this.provider_name = "Podcasts";
    this.provider_type = "search";
    this.provider_category = "music";
    this.icon_path = (0, _20PngDefault.default);
    this.description = "Search or Paste a link to a podcast's website (e.g. Apple Podcasts) or RSS feed.";
    this.active = false;
    this.defaultSearch = "";
    this.saveSearch = false;
}
//Lookup video info through youtube API
W2gPodcasts.prototype.videoLookUp = function(url, callback, active) {
    var results = [], clip;
    var matches = url.match(/^https?:\/\/podcasts\.apple\.com\/.+id(\d+)/);
    var getRSS = (function(url) {
        (0, _w2Ghelpers.$w2g).getJSON("https://search.w2g.tv/badger_api/api/podcasts/feed?url=" + url).then((function(v) {
            var pc_image = "https://static.w2g.tv/static/providers/20.png";
            if (v.image && v.image.url) pc_image = v.image.url;
            else if (v.itunes && v.itunes.image) pc_image = v.itunes.image;
            v.items.forEach((function(track) {
                try {
                    clip = {};
                    clip.thumb = pc_image;
                    clip.id = track.enclosure.url;
                    clip.provider = this.provider_name;
                    clip.title = track.title;
                    clip.publisher = v.title;
                    clip.publisherID = null;
                    clip.desc = "";
                    clip.price = "";
                    clip.duration = 0;
                    clip.cc = false;
                    clip.explicit = false;
                    results.push(clip);
                } catch (e) {
                    console.log("Can not add track");
                }
            }).bind(this));
            callback(results, this.provider_name);
        }).bind(this)).catch((function() {
            callback([], this.provider_name);
        }).bind(this));
    }).bind(this);
    if (matches && matches.length === 2) {
        if (callback) (0, _jsonP.jsonp).fetchJSONP("https://itunes.apple.com/lookup?id=" + matches[1] + "&entity=podcast", function(data) {
            if (data && data.results) getRSS(data.results[0].feedUrl);
            else callback([], this.provider_name);
        });
        return true;
    } else if (active) {
        if (callback) getRSS(url);
        return true;
    } else return false;
};
W2gPodcasts.prototype.search = function(term, count, page, callback) {
    let results = [], clip;
    (0, _jsonP.jsonp).fetchJSONP("https://itunes.apple.com/search?term=" + term + "&media=podcast", (function(data) {
        data.results.forEach((function(p) {
            clip = {};
            clip.id = p.collectionViewUrl;
            clip.provider = this.provider_name;
            clip.title = p.collectionName;
            clip.publisher = p.artistName;
            clip.publisherID = null;
            clip.desc = "";
            clip.price = "";
            clip.thumb = p.artworkUrl600;
            clip.collection = true;
            results.push(clip);
        }).bind(this));
        callback(results, this.provider_name);
    }).bind(this));
};

},{"../w2ghelpers":"f460H","../utils/jsonP":"d1BtE","url:../../img/providers/20.png":"gSe4q","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"d1BtE":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "jsonp", ()=>jsonp);
let jsonp = function() {
    let exp = {}, uniqueCB = 0;
    exp.fetchJSONP = function(url, callback) {};
    return exp;
}();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"gSe4q":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("jIelK");

},{}],"jdtTj":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "W2gRadio", ()=>W2gRadio);
var _32Png = require("url:../../img/providers/32.png");
var _32PngDefault = parcelHelpers.interopDefault(_32Png);
var _w2Ghelpers = require("../w2ghelpers");
function W2gRadio() {
    this.provider_name = "WebRadio";
    this.provider_type = "search";
    this.provider_category = "music";
    this.icon_path = (0, _32PngDefault.default);
    this.active = false;
    this.description = "Search for a station - powered by radio-browser.info";
    this.defaultSearch = "music";
    this.saveSearch = false;
}
//Lookup video info through youtube API
W2gRadio.prototype.videoLookUp = function(url, callback) {
    let match = url.match(/^w2g-podcast:\/\/({.+})$/);
    if (match && match.length === 2) try {
        let station = JSON.parse(match[1]);
        if (station.type === "radio") {
            if (callback) callback([
                {
                    id: url,
                    provider: this.provider_name,
                    title: station.name,
                    thumb: "https://static.w2g.tv/static/providers/32.png"
                }
            ], this.provider_name);
            return true;
        } else return false;
    } catch  {
        return false;
    }
    else return false;
};
W2gRadio.prototype.search = function(term, count, page, callback) {
    let results = [];
    (0, _w2Ghelpers.$w2g).getJSON("https://all.api.radio-browser.info/json/stations/search?limit=10&name=" + term + "&hidebroken=true&order=clickcount&reverse=true", null, null, 'omit').then((function(res) {
        res.forEach((function(s) {
            results.push({
                id: "w2g-podcast://" + JSON.stringify({
                    type: "radio",
                    title: s.name,
                    thumb: null,
                    url: s.stationuuid
                }),
                provider: this.provider_name,
                title: s.name,
                publisher: null,
                publisherID: null,
                desc: "",
                thumb: "https://static.w2g.tv/static/providers/32.png"
            });
        }).bind(this));
        callback(results, this.provider_name);
    }).bind(this)).catch(function() {
        callback([]);
    });
};

},{"url:../../img/providers/32.png":"1fXku","../w2ghelpers":"f460H","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"1fXku":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("5uqYi");

},{}],"hoqXQ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "W2gShorts", ()=>W2gShorts);
var _w2Ghelpers = require("../w2ghelpers");
var _19Png = require("url:../../img/providers/19.png");
var _19PngDefault = parcelHelpers.interopDefault(_19Png);
function W2gShorts() {
    this.provider_name = "w2gshorts";
    this.provider_type = "browse";
    this.provider_category = "video";
    this.icon_path = (0, _19PngDefault.default);
    this.description = "Select one of the videos bellow.";
    this.active = false;
    this.__videoDB = null;
}
W2gShorts.prototype.videoLookUp = function(url, callback) {
    var matches = url.match(/^https:\/\/w2gshorts.com\/view\.html\?id=([0-9a-z]+)$/), results = [];
    if (matches && matches.length === 2) {
        if (callback) {
            this.__videoDB = this.__videoDB || (0, _w2Ghelpers.$w2g).getJSON("https://w2gshorts.com/content.json", null, null, 'omit');
            this.__videoDB.then((function(videos) {
                var video = videos.find(function(v) {
                    return v.id === matches[1];
                }), clip;
                clip = {};
                clip.id = url;
                clip.provider = this.provider_name;
                clip.title = video.title;
                clip.publisher = video.attribution;
                clip.publisherID = null;
                clip.desc = video.desc;
                clip.price = "";
                clip.thumb = video.thumb;
                results.push(clip);
                callback(results, "W2gShorts");
            }).bind(this));
        }
        return true;
    } else return false;
};
W2gShorts.prototype.search = function(term, count, page, callback, safe) {
    this.__videoDB = this.__videoDB || (0, _w2Ghelpers.$w2g).getJSON("https://w2gshorts.com/content.json", null, null, 'omit');
    var results = [], clip;
    this.__videoDB.then((function(videos) {
        videos.forEach((function(video) {
            clip = {};
            clip.id = "https://w2gshorts.com/view.html?id=" + video.id;
            clip.provider = this.provider_name;
            clip.title = video.title;
            clip.publisher = video.attribution;
            clip.publisherID = null;
            clip.desc = video.desc;
            clip.price = "";
            clip.thumb = video.thumb;
            results.push(clip);
        }).bind(this));
        callback(results, "W2gShorts");
    }).bind(this));
};

},{"../w2ghelpers":"f460H","url:../../img/providers/19.png":"ihosI","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"ihosI":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("lgBM1");

},{}],"ccJLI":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Youtube API and init player
parcelHelpers.export(exports, "W2gSuno", ()=>W2gSuno);
var _37Png = require("url:../../img/providers/37.png");
var _37PngDefault = parcelHelpers.interopDefault(_37Png);
function W2gSuno() {
    this.provider_name = "suno.ai";
    this.provider_type = "search";
    this.provider_category = "music";
    this.icon_path = (0, _37PngDefault.default);
    this.description = "Paste a link to a suno.ai song";
    this.active = false;
    this.defaultSearch = "";
    this.saveSearch = false;
}
//Lookup video info through youtube API
W2gSuno.prototype.videoLookUp = function(url, callback) {
    var clip, match = url.match(/^https:\/\/(?:app.)?suno.(?:ai|com)\/song\/([a-zA-Z0-9-_]+)/);
    if (match && match.length === 2) {
        if (callback) {
            clip = {};
            clip.id = "https://cdn1.suno.ai/" + match[1] + ".mp4";
            clip.provider = this.provider_name;
            clip.title = "Suno AI Song";
            clip.publisher = "--";
            clip.publisherID = null;
            clip.desc = "";
            clip.price = "";
            clip.thumb = "https://static.w2g.tv/static/providers/37.png";
            clip.duration = 0;
            clip.cc = false;
            clip.explicit = false;
            callback([
                clip
            ], "suno");
        }
        return true;
    } else return false;
};
W2gSuno.prototype.search = function(term, count, page, callback) {
    callback([], "instagram");
};

},{"url:../../img/providers/37.png":"hmDud","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"hmDud":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("lGVA4");

},{}],"8zFs3":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Youtube API and init player
parcelHelpers.export(exports, "W2gUdio", ()=>W2gUdio);
var _w2Ghelpers = require("../w2ghelpers");
var _38Png = require("url:../../img/providers/38.png");
var _38PngDefault = parcelHelpers.interopDefault(_38Png);
function W2gUdio() {
    this.provider_name = "udio";
    this.provider_type = "search";
    this.provider_category = "music";
    this.icon_path = (0, _38PngDefault.default);
    this.description = "Paste a link to an Udio song.";
    this.active = false;
    this.defaultSearch = "";
}
//Lookup video info through youtube API
W2gUdio.prototype.videoLookUp = function(url, callback) {
    if (url.match(/^https:\/\/(?:www\.)?udio.com/)) {
        if (callback) {
            var matches = url.match(/^https:\/\/(?:www\.)?udio.com\/songs\/([a-zA-Z0-9-_]+)/);
            if (matches && matches.length >= 2) (0, _w2Ghelpers.$w2g).getJSON("https://search.w2g.tv/badger_api/api/udio/lookup?id=" + matches[1]).then((function(v) {
                var clip = {};
                clip.id = v.url;
                clip.provider = this.provider_name;
                clip.title = v.title;
                clip.publisher = "on Udio";
                clip.publisherID = null;
                clip.desc = "";
                clip.price = "";
                clip.thumb = v.imgurl;
                clip.duration = 0;
                clip.cc = false;
                clip.explicit = false;
                callback([
                    clip
                ], this.provider_name);
            }).bind(this));
            else callback([], this.provider_name);
        }
        return true;
    } else return false;
};
W2gUdio.prototype.search = function(term, count, page, callback, safe) {
    callback([], this.provider_name);
};

},{"../w2ghelpers":"f460H","url:../../img/providers/38.png":"1BuvY","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"1BuvY":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("3UKkX");

},{}],"fL5u8":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Youtube API and init player
parcelHelpers.export(exports, "W2gInstagram", ()=>W2gInstagram);
var _12Png = require("url:../../img/providers/12.png");
var _12PngDefault = parcelHelpers.interopDefault(_12Png);
function W2gInstagram() {
    this.provider_name = "instagram";
    this.provider_type = "search";
    this.provider_category = "social";
    this.icon_path = (0, _12PngDefault.default);
    this.description = "Paste a link to an Instagram post or IGTV video";
    this.active = false;
    this.defaultSearch = "new";
    this.saveSearch = false;
}
//Lookup video info through youtube API
W2gInstagram.prototype.videoLookUp = function(url, callback) {
    var clip;
    if (url.match(/^https?:\/\/www.instagram.com\/(p|tv)\/\S+$/)) {
        if (callback) {
            clip = {};
            clip.id = url;
            clip.provider = this.provider_name;
            clip.title = "Instagram Post";
            clip.publisher = "--";
            clip.publisherID = null;
            clip.desc = "";
            clip.price = "";
            clip.thumb = "https://static.w2g.tv/static/providers/12.png";
            clip.duration = 0;
            clip.cc = false;
            clip.explicit = false;
            callback([
                clip
            ], "instagram");
        }
        return true;
    } else return false;
};
W2gInstagram.prototype.search = function(term, count, page, callback) {
    callback([], "instagram");
};

},{"url:../../img/providers/12.png":"3bAsi","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"3bAsi":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("3whmU");

},{}],"7XOnk":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Youtube API and init player
parcelHelpers.export(exports, "W2gTwitter", ()=>W2gTwitter);
var _14Png = require("url:../../img/providers/14.png");
var _14PngDefault = parcelHelpers.interopDefault(_14Png);
function W2gTwitter() {
    this.provider_name = "X";
    this.provider_type = "search";
    this.provider_category = "social";
    this.icon_path = (0, _14PngDefault.default);
    this.description = "Paste a link to an X post.";
    this.active = false;
    this.defaultSearch = "new";
    this.saveSearch = false;
}
//Lookup video info through youtube API
W2gTwitter.prototype.videoLookUp = function(url, callback) {
    var clip;
    var matches = url.match(/^https?:\/\/(mobile\.)?(twitter|x)\.com.+status(es)?\/([0-9]+)/);
    if (matches && matches.length === 5) {
        if (callback) {
            clip = {};
            clip.id = url;
            clip.provider = this.provider_name;
            clip.title = "X Post";
            clip.publisher = "--";
            clip.publisherID = null;
            clip.desc = "";
            clip.price = "";
            clip.thumb = "https://static.w2g.tv/static/providers/14.png";
            clip.duration = 0;
            clip.cc = false;
            clip.explicit = false;
            callback([
                clip
            ], this.provider_name);
        }
        return true;
    } else return false;
};
W2gTwitter.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};

},{"url:../../img/providers/14.png":"jQw6S","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"jQw6S":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("2UoI0");

},{}],"5rSfs":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "W2gTenor", ()=>W2gTenor);
var _w2Ghelpers = require("../w2ghelpers");
var _36Png = require("url:../../img/providers/36.png");
var _36PngDefault = parcelHelpers.interopDefault(_36Png);
var _langmanager = require("../langmanager");
function W2gTenor() {
    this.provider_name = "tenor";
    this.provider_type = "search";
    this.provider_category = "fun";
    this.icon_path = (0, _36PngDefault.default);
    this.description = "Search or paste a link to Tenor gif";
    this.active = false;
    this.defaultSearch = "funny";
    this.saveSearch = false;
}
W2gTenor.prototype.videoLookUp = function(url, callback) {
    var matches = url.match(/^https:\/\/tenor\.com\/view\/\S+?([0-9]+)$/);
    if (matches && matches.length === 2) {
        if (callback) {
            var results = [], clip;
            (0, _w2Ghelpers.$w2g).getJSON("https://search.w2g.tv/badger_api/api/tenor/v2/posts?ids=" + matches[1], null, null, 'omit').then((function(data) {
                data.results.forEach((function(v) {
                    clip = {};
                    clip.id = v.media_formats.mp4.url;
                    clip.provider = this.provider_name;
                    clip.title = v.content_description;
                    clip.publisher = "Powered By Tenor";
                    clip.publisherID = null;
                    clip.date = "";
                    clip.desc = "";
                    clip.price = "";
                    clip.thumb = v.media_formats.nanogif.url;
                    results.push(clip);
                }).bind(this));
                callback(results, this.provider_name);
            }).bind(this));
        }
        return true;
    } else return false;
};
W2gTenor.prototype.search = function(term, count, page, callback) {
    let url;
    if (term) url = "https://search.w2g.tv/badger_api/api/tenor/v2/search?q=" + term;
    else url = "https://search.w2g.tv/badger_api/api/tenor/v2/featured";
    (0, _w2Ghelpers.$w2g).getJSON(url, null, null, 'omit').then((function(data) {
        var results = [], clip;
        data.results.forEach((function(v) {
            clip = {};
            clip.id = v.media_formats.mp4.url;
            clip.provider = this.provider_name;
            clip.title = v.content_description;
            clip.publisher = "Powered By Tenor";
            clip.publisherID = null;
            clip.date = "";
            clip.desc = "";
            clip.price = "";
            clip.thumb = v.media_formats.nanogif.url;
            results.push(clip);
        }).bind(this));
        callback(results, this.provider_name);
    }).bind(this)).catch((function() {
        callback([], this.provider_name);
    }).bind(this));
};
W2gTenor.prototype.getSearchSuggestion_disabled = function(term, callback) {
    (0, _w2Ghelpers.$w2g).getJSON("https://search.w2g.tv/badger_api/api/tenor/v2/autocomplete?q=" + term + "&locale=" + (0, _langmanager.GetLang).lang, null, null, 'omit').then(function(data) {
        callback(data.results);
    });
};

},{"../w2ghelpers":"f460H","url:../../img/providers/36.png":"9y87o","../langmanager":"edYpJ","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"9y87o":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("1Vdka");

},{}],"edYpJ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GetLang", ()=>GetLang);
var _jsCookie = require("js-cookie");
var _jsCookieDefault = parcelHelpers.interopDefault(_jsCookie);
var _w2Ghelpers = require("./w2ghelpers");
let path_lang = window.location.pathname.match(/^\/([a-z]{2})(?:\/\S*$|$)/);
if (path_lang) (0, _jsCookieDefault.default).set("w2glang", path_lang[1], {
    secure: true,
    domain: "w2g.tv",
    expires: 365
});
(0, _w2Ghelpers.$w2g).domReady().then(function() {
    let menu = document.querySelector(".w2g-lang-menu");
    if (menu) menu.addEventListener("click", function(e) {
        let lang = e.target.getAttribute("data-lang").trim();
        if (path_lang) {
            let reg = new RegExp("^\/" + path_lang[1]);
            window.location.pathname = window.location.pathname.replace(reg, lang);
        } else window.location.pathname = lang + "/" + window.location.pathname;
    });
});
let GetLang = {
    lang: document.querySelector("html").getAttribute("lang") || "en"
};

},{"js-cookie":"k5Qo3","./w2ghelpers":"f460H","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"k5Qo3":[function(require,module,exports,__globalThis) {
(function(global, factory) {
    module.exports = factory();
})(this, function() {
    'use strict';
    /* eslint-disable no-var */ function assign(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source)target[key] = source[key];
        }
        return target;
    }
    /* eslint-enable no-var */ /* eslint-disable no-var */ var defaultConverter = {
        read: function(value) {
            if (value[0] === '"') value = value.slice(1, -1);
            return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
        },
        write: function(value) {
            return encodeURIComponent(value).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
        }
    };
    /* eslint-enable no-var */ /* eslint-disable no-var */ function init(converter, defaultAttributes) {
        function set(name, value, attributes) {
            if (typeof document === 'undefined') return;
            attributes = assign({}, defaultAttributes, attributes);
            if (typeof attributes.expires === 'number') attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
            if (attributes.expires) attributes.expires = attributes.expires.toUTCString();
            name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
            var stringifiedAttributes = '';
            for(var attributeName in attributes){
                if (!attributes[attributeName]) continue;
                stringifiedAttributes += '; ' + attributeName;
                if (attributes[attributeName] === true) continue;
                // Considers RFC 6265 section 5.2:
                // ...
                // 3.  If the remaining unparsed-attributes contains a %x3B (";")
                //     character:
                // Consume the characters of the unparsed-attributes up to,
                // not including, the first %x3B (";") character.
                // ...
                stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
            }
            return document.cookie = name + '=' + converter.write(value, name) + stringifiedAttributes;
        }
        function get(name) {
            if (typeof document === 'undefined' || arguments.length && !name) return;
            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all.
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var jar = {};
            for(var i = 0; i < cookies.length; i++){
                var parts = cookies[i].split('=');
                var value = parts.slice(1).join('=');
                try {
                    var found = decodeURIComponent(parts[0]);
                    jar[found] = converter.read(value, found);
                    if (name === found) break;
                } catch (e) {}
            }
            return name ? jar[name] : jar;
        }
        return Object.create({
            set,
            get,
            remove: function(name, attributes) {
                set(name, '', assign({}, attributes, {
                    expires: -1
                }));
            },
            withAttributes: function(attributes) {
                return init(this.converter, assign({}, this.attributes, attributes));
            },
            withConverter: function(converter) {
                return init(assign({}, this.converter, converter), this.attributes);
            }
        }, {
            attributes: {
                value: Object.freeze(defaultAttributes)
            },
            converter: {
                value: Object.freeze(converter)
            }
        });
    }
    var api = init(defaultConverter, {
        path: '/'
    });
    /* eslint-enable no-var */ return api;
});

},{}],"hp0L1":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Youtube API and init player
parcelHelpers.export(exports, "W2gPinterest", ()=>W2gPinterest);
var _w2Ghelpers = require("../w2ghelpers");
var _13Png = require("url:../../img/providers/13.png");
var _13PngDefault = parcelHelpers.interopDefault(_13Png);
function W2gPinterest() {
    this.provider_name = "pinterest";
    this.provider_type = "search";
    this.provider_category = "social";
    this.icon_path = (0, _13PngDefault.default);
    this.description = "Paste a link to a Pinterest pin";
    this.active = false;
    this.defaultSearch = "new";
    this.saveSearch = false;
}
//Lookup video info through youtube API
W2gPinterest.prototype.videoLookUp = function(url, callback) {
    var id, clip;
    if (url.match(/^https?:\/\/www.pinterest.[a-z.]{2,6}\/pin\/\S+$/)) {
        if (callback) (0, _w2Ghelpers.$w2g).getJSON("https://search.w2g.tv/badger_api/api/pt/lookup?q=" + url).then((function(v) {
            clip = {};
            clip.id = url;
            clip.provider = this.provider_name;
            clip.title = v.title;
            clip.publisher = "";
            clip.publisherID = null;
            clip.desc = "";
            clip.price = "";
            clip.thumb = v.imgurl;
            clip.duration = 0;
            clip.cc = false;
            clip.explicit = false;
            callback([
                clip
            ], "pinterest");
        }).bind(this)).catch((function() {
            callback([], "pinterest");
        }).bind(this));
        return true;
    } else return false;
};
W2gPinterest.prototype.search = function(term, count, page, callback) {
    callback([], "pinterest");
};

},{"../w2ghelpers":"f460H","url:../../img/providers/13.png":"2HnvI","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"2HnvI":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("4o4ci");

},{}],"1lCxH":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "W2gCoub", ()=>W2gCoub);
var _w2Ghelpers = require("../w2ghelpers");
var _11Png = require("url:../../img/providers/11.png");
var _11PngDefault = parcelHelpers.interopDefault(_11Png);
function W2gCoub() {
    this.provider_name = "coub";
    this.provider_type = "search";
    this.provider_category = "fun";
    this.icon_path = (0, _11PngDefault.default);
    this.description = "Search OR Paste a link to a Coub video";
    this.active = false;
    this.defaultSearch = "new";
    this.saveSearch = false;
}
//Lookup video info through youtube API
W2gCoub.prototype.videoLookUp = function(url, callback) {
    var id, clip, v, parser;
    parser = document.createElement('a');
    parser.href = url;
    if (parser.host.indexOf("coub") === 0) {
        if (callback) {
            id = url.split("/").pop();
            (0, _w2Ghelpers.$w2g).getJSON("https://europe-west1-divine-course-232115.cloudfunctions.net/coubLookup?id=" + id, null, null, 'omit').then((function(v) {
                clip = {};
                clip.id = "https://coub.com/view/" + v.permalink;
                clip.provider = this.provider_name;
                clip.title = v.title;
                clip.publisher = v.channel.title;
                clip.publisherID = null;
                clip.desc = "";
                clip.price = "";
                clip.thumb = v.picture;
                clip.duration = 0;
                clip.cc = false;
                clip.explicit = false;
                callback([
                    clip
                ], "coub");
            }).bind(this));
        }
        return true;
    } else return false;
};
W2gCoub.prototype.search = function(term, count, page, callback) {
    function parseResponse(data) {
        var results = [], clip;
        data.coubs.forEach((function(v, i) {
            clip = {};
            clip.id = "https://coub.com/view/" + v.permalink;
            clip.provider = this.provider_name;
            clip.title = v.title;
            clip.publisher = v.channel.title;
            clip.publisherID = null;
            clip.date = new Date(v.created_at).toDateString();
            clip.desc = "";
            clip.price = "";
            clip.thumb = v.picture;
            results.push(clip);
        }).bind(this));
        callback(results, "coub");
    }
    if (term !== "") (0, _w2Ghelpers.$w2g).getJSON("https://europe-west1-divine-course-232115.cloudfunctions.net/coubSearch?q=" + encodeURIComponent(term) + "&page=" + page, null, null, 'omit').then(parseResponse.bind(this));
    else (0, _w2Ghelpers.$w2g).getJSON("https://europe-west1-divine-course-232115.cloudfunctions.net/coubSearch?q=funny&page=" + page, null, null, 'omit').then(parseResponse.bind(this));
};

},{"../w2ghelpers":"f460H","url:../../img/providers/11.png":"7cdUf","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"7cdUf":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("3Ak17");

},{}],"42BCK":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "W2gDailymotion", ()=>W2gDailymotion);
var _3Png = require("url:../../img/providers/3.png");
var _3PngDefault = parcelHelpers.interopDefault(_3Png);
function W2gDailymotion() {
    this.provider_name = "dailymotion";
    this.provider_type = "search";
    this.provider_category = "video";
    this.icon_path = (0, _3PngDefault.default);
    this.description = "Search OR Paste a link to a Dailymotion video";
    this.active = false;
    this.defaultSearch = "music covers";
    this.saveSearch = false;
}
//Lookup video info through youtube API
W2gDailymotion.prototype.videoLookUp = function(url, callback) {
    var id, clip, matches = url.match(/^https?:\/\/(dai\.ly|www\.dailymotion\.com\/video)\/([0-9a-z]+)/);
    if (matches && matches.length === 3) {
        if (callback) {
            id = matches[2];
            fetch("https://api.dailymotion.com/video/" + id + "?fields=description,duration,explicit,owner.username,thumbnail_360_url,title,url").then((function(data) {
                data.json().then((function(v) {
                    clip = {};
                    clip.id = v.url;
                    clip.provider = this.provider_name;
                    clip.title = v.title;
                    clip.publisher = v["owner.username"];
                    clip.publisherID = v["owner.id"];
                    clip.desc = v.description;
                    clip.price = "";
                    clip.thumb = v.thumbnail_360_url;
                    clip.duration = v.duration;
                    clip.cc = false;
                    clip.explicit = v.explicit;
                    callback([
                        clip
                    ], "dailymotion");
                }).bind(this));
            }).bind(this)).catch(function() {
                callback([], "dailymotion");
            });
        }
        return true;
    } else return false;
};
W2gDailymotion.prototype.search = function(term, count, page, callback) {
    term = term || this.defaultSearch;
    var safe = this.saveSearch;
    var results = [], clip, safesearch = safe === true ? "1" : "0";
    function parseResponse(data) {
        data.list.forEach((function(v, i) {
            clip = {};
            clip.id = v.url;
            clip.provider = this.provider_name;
            clip.title = v.title;
            clip.publisher = v["owner.username"];
            clip.publisherID = v["owner.id"];
            clip.date = new Date(v.created_time * 1000).toDateString();
            clip.desc = v.description;
            clip.price = "";
            clip.thumb = v.thumbnail_240_url;
            results.push(clip);
        }).bind(this));
        callback(results, "dailymotion");
    }
    if (term.indexOf("publisher:") === 0) fetch("https://api.dailymotion.com/videos?owners=" + term.split(":")[1] + "&page=" + page + "&limit=" + count + "&family_filter=" + safesearch + "&sort=recent&fields=description,duration,created_time,owner.username,owner.id,thumbnail_240_url,title,url").then((function(data) {
        data.json().then((function(obj) {
            parseResponse.call(this, obj);
        }).bind(this));
    }).bind(this));
    else fetch("https://api.dailymotion.com/videos?search=" + term + "&page=" + page + "&limit=" + count + "&family_filter=" + safesearch + "&sort=relevance&fields=description,duration,created_time,owner.username,owner.id,thumbnail_240_url,title,url").then((function(data) {
        data.json().then((function(obj) {
            parseResponse.call(this, obj);
        }).bind(this));
    }).bind(this));
};

},{"url:../../img/providers/3.png":"ec0tl","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"ec0tl":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("5n88T");

},{}],"4XDSt":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Facebook API and init player
parcelHelpers.export(exports, "W2gFacebook", ()=>W2gFacebook);
var _8Png = require("url:../../img/providers/8.png");
var _8PngDefault = parcelHelpers.interopDefault(_8Png);
function W2gFacebook() {
    this.provider_name = "facebook";
    this.provider_type = "search";
    this.provider_category = "social";
    this.icon_path = (0, _8PngDefault.default);
    this.active = false;
    this.description = "Paste a direkt link to a public video on Facebook. (https://fb.watch/[videoID] or https://www.facebook.com/[user]/videos/[videoID])";
}
W2gFacebook.prototype.videoLookUp = function(url, callback) {
    if (url.match(/^(http|https):\/\/\S+\.facebook.com\/\S+\/videos\/\S+$/) || url.match(/^(http|https):\/\/\S+\.facebook.com\/watch\S+$/) || url.match(/^((http|https):)?\/\/fb\.watch\/.+/)) {
        if (callback) {
            var info = {};
            info.id = url;
            info.provider = this.provider_name;
            info.title = "Facebook Video";
            info.publisher = "--";
            info.publisherID = null;
            info.desc = "";
            info.price = "";
            info.thumb = "https://static.w2g.tv/static/providers/8.png";
            info.cc = false;
            info.duration = 0;
            info.explicit = false;
            callback([
                info
            ], "facebook");
        }
        return true;
    } else return false;
};
//Search for video through facebook API
W2gFacebook.prototype.search = function(term, count, page, callback) {
    callback([], "facebook");
};

},{"url:../../img/providers/8.png":"9FSMm","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"9FSMm":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("b704u");

},{}],"dMYwn":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Youtube API and init player
parcelHelpers.export(exports, "W2gSoundcloud", ()=>W2gSoundcloud);
var _w2Ghelpers = require("../w2ghelpers");
var _4Png = require("url:../../img/providers/4.png");
var _4PngDefault = parcelHelpers.interopDefault(_4Png);
function W2gSoundcloud() {
    this.provider_name = "soundcloud";
    this.provider_type = "search";
    this.provider_category = "music";
    this.icon_path = (0, _4PngDefault.default);
    this.description = "Paste a link to a single Soundcloud track (no sets).";
    this.active = false;
    this.defaultSearch = "electro";
    this.hostName = "https://" + (window.location.protocol.indexOf("http") === 0 ? window.location.hostname : "w2g.tv");
}
//Lookup video info through youtube API
W2gSoundcloud.prototype.videoLookUp = function(url, callback) {
    if (url.match(/^https:\/\/soundcloud.com/)) {
        if (callback) {
            var matches = url.match(/^https:\/\/soundcloud.com\/([a-z0-9-_]+\/(?!sets)[a-z0-9-_]+)($|\?)/);
            if (matches && matches.length >= 2) (0, _w2Ghelpers.$w2g).getJSON("https://search.w2g.tv/badger_api/api/soundcloud/lookup?id=" + matches[1]).then((function(v) {
                var clip = {};
                clip.id = v.url;
                clip.provider = this.provider_name;
                clip.title = v.title;
                clip.publisher = "on Soundcloud";
                clip.publisherID = null;
                clip.desc = "";
                clip.price = "";
                clip.thumb = v.imgurl;
                clip.duration = 0;
                clip.cc = false;
                clip.explicit = false;
                callback([
                    clip
                ], this.provider_name);
            }).bind(this));
            else callback([], this.provider_name);
        }
        return true;
    } else return false;
};
W2gSoundcloud.prototype.search = function(term, count, page, callback, safe) {
    callback([], this.provider_name);
};

},{"../w2ghelpers":"f460H","url:../../img/providers/4.png":"1Z0k7","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"1Z0k7":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("gIBXU");

},{}],"cyE8P":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Youtube API and init player
parcelHelpers.export(exports, "W2gMixcloud", ()=>W2gMixcloud);
var _9Png = require("url:../../img/providers/9.png");
var _9PngDefault = parcelHelpers.interopDefault(_9Png);
function W2gMixcloud() {
    this.provider_name = "mixcloud";
    this.provider_type = "search";
    this.provider_category = "music";
    this.icon_path = (0, _9PngDefault.default);
    this.description = "Search OR Paste a link to a Mixcloud track";
    this.active = false;
    this.defaultSearch = "funky";
}
//Lookup video info through youtube API
W2gMixcloud.prototype.videoLookUp = function(url, callback) {
    var parser = document.createElement('a');
    parser.href = url;
    if (parser.host.indexOf("www.mixcloud") === 0) {
        if (callback) fetch("https://api.mixcloud.com" + parser.pathname).then((function(d) {
            if (d.ok) d.json().then((function(data) {
                var clip = {};
                clip.id = data.url;
                clip.provider = this.provider_name;
                clip.title = data.name;
                clip.publisher = data.user.name;
                clip.publisherID = data.user.username;
                clip.desc = "";
                clip.price = "";
                clip.thumb = data.pictures.medium;
                clip.duration = data.audio_length;
                clip.cc = false;
                clip.explicit = false;
                callback([
                    clip
                ], "mixcloud");
            }).bind(this));
            else callback([], "mixcloud");
        }).bind(this));
        return true;
    } else return false;
};
W2gMixcloud.prototype.search = function(term, count, page, callback, safe) {
    term = term || this.defaultSearch;
    var results = [], clip;
    function parseResponse(data) {
        data.data.forEach((function(v, i) {
            clip = {};
            clip.id = v.url;
            clip.provider = this.provider_name;
            clip.title = v.name;
            clip.publisher = v.user.name;
            clip.publisherID = v.user.username;
            clip.date = new Date(v.created_time).toDateString();
            clip.desc = "";
            clip.price = "";
            clip.thumb = v.pictures.medium;
            results.push(clip);
        }).bind(this));
        callback(results, "mixcloud");
    }
    var qurl = term.indexOf("publisher:") === 0 ? "https://api.mixcloud.com/" + term.split(":")[1] + "/cloudcasts/?limit=" + count + "&offset=" + count * (page - 1) : "https://api.mixcloud.com/search/?q=" + term + "&type=cloudcast" + "&limit=" + count + "&offset=" + count * (page - 1);
    fetch(qurl).then((function(d) {
        if (d.ok) d.json().then((function(data) {
            parseResponse.call(this, data);
        }).bind(this));
    }).bind(this));
};

},{"url:../../img/providers/9.png":"a9FX0","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"a9FX0":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("4HdFd");

},{}],"f2Qsi":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Youtube API and init player
parcelHelpers.export(exports, "W2gSlides", ()=>W2gSlides);
var _w2Ghelpers = require("../w2ghelpers");
var _15Png = require("url:../../img/providers/15.png");
var _15PngDefault = parcelHelpers.interopDefault(_15Png);
function W2gSlides() {
    this.provider_name = "slides";
    this.provider_type = "search";
    this.provider_category = "other";
    this.icon_path = (0, _15PngDefault.default);
    this.description = "Paste a link to a slides.com presentation";
    this.active = false;
    this.defaultSearch = "new";
    this.saveSearch = false;
}
//Lookup video info through youtube API
W2gSlides.prototype.videoLookUp = function(url, callback) {
    var clip, matches = url.match(/^https:\/\/([\w-]+\.)?slides.com\/[\w-]+\/[\w-]+/);
    if (matches && matches.length === 2) {
        if (callback) (0, _w2Ghelpers.$w2g).getJSON("https://search.w2g.tv/badger_api/api/slides/lookup?q=" + url).then((function(v) {
            clip = {};
            clip.id = v.url;
            clip.provider = this.provider_name;
            clip.title = v.title;
            clip.publisher = matches[1];
            clip.publisherID = null;
            clip.desc = "";
            clip.price = "";
            clip.thumb = v.imgurl;
            clip.duration = 0;
            clip.cc = false;
            clip.explicit = false;
            callback([
                clip
            ], this.provider_name);
        }).bind(this)).catch((function() {
            callback([], this.provider_name);
        }).bind(this));
        return true;
    } else return false;
};
W2gSlides.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};

},{"../w2ghelpers":"f460H","url:../../img/providers/15.png":"6JZaq","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"6JZaq":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("e4qew");

},{}],"7LRST":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "W2gOsm", ()=>W2gOsm);
var _30Png = require("url:../../img/providers/30.png");
var _30PngDefault = parcelHelpers.interopDefault(_30Png);
function W2gOsm() {
    this.provider_name = "OSM Map";
    this.provider_type = "browse";
    this.provider_category = "other";
    this.icon_path = (0, _30PngDefault.default);
    this.active = false;
    this.description = "Paste a link to OpenStreetMap.";
}
W2gOsm.prototype.videoLookUp = function(url, callback) {
    var res = url.match(/^https:\/\/www.openstreetmap.org\/#map=(\d+)\/(\d+.\d+)\/(\d+.\d+)&layers=([A-Z]+)/);
    if (res && res.length === 5) {
        if (callback) {
            var info = {};
            info.id = res[0];
            info.provider = this.provider_name;
            info.title = "OSM: " + res[2] + "/" + res[3];
            info.publisher = "";
            info.publisherID = null;
            info.desc = "";
            info.price = "";
            info.thumb = "https://static.w2g.tv/static/providers/30.png";
            info.cc = false;
            info.duration = 0;
            info.explicit = false;
            callback([
                info
            ], this.provider_name);
        }
        return true;
    } else return false;
};
W2gOsm.prototype.search = function(term, count, page, callback) {
    var results = [];
    var clip = {};
    clip.id = "https://www.openstreetmap.org/#map=5/46.574/10.569&layers=T";
    clip.provider = this.provider_name;
    clip.title = "OpenStreetMap";
    clip.publisher = "";
    clip.publisherID = null;
    clip.desc = "";
    clip.price = "";
    clip.thumb = "https://static.w2g.tv/static/providers/30.png";
    results.push(clip);
    callback(results, this.provider_name);
};

},{"url:../../img/providers/30.png":"8ZlwO","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"8ZlwO":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("aFoi0");

},{}],"aniX9":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Facebook API and init player
parcelHelpers.export(exports, "W2gSnipZero", ()=>W2gSnipZero);
var _31Png = require("url:../../img/providers/31.png");
var _31PngDefault = parcelHelpers.interopDefault(_31Png);
function W2gSnipZero() {
    this.provider_name = "snipzero";
    this.provider_type = "search";
    this.provider_category = "other";
    this.icon_path = (0, _31PngDefault.default);
    this.active = false;
    this.description = "Paste a direkt link to a <a class='underline' href='https://snipzero.com/' target='_blank'><b>SnipZero</b></a> snip.";
}
W2gSnipZero.prototype.videoLookUp = function(url, callback) {
    var matches = url.match(/^https:\/\/snipzero\.com\/snip\.html\?s=([a-z0-9-]+)/);
    if (matches && matches.length === 2) {
        if (callback) {
            var info = {};
            info.id = url;
            info.provider = this.provider_name;
            info.title = "SnipZero Snip";
            info.publisher = "--";
            info.publisherID = null;
            info.desc = "";
            info.price = "";
            info.thumb = "https://snipzero-data.b-cdn.net/snip/" + matches[1] + ".jpg?width=240&height=240";
            info.cc = false;
            info.duration = 0;
            info.explicit = false;
            callback([
                info
            ], "snipzero");
        }
        return true;
    } else return false;
};
//Search for video through facebook API
W2gSnipZero.prototype.search = function(term, count, page, callback) {
    callback([], "snipzero");
};

},{"url:../../img/providers/31.png":"buEYH","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"buEYH":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("aHVUJ");

},{}],"aOT4L":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "W2gNative", ()=>W2gNative);
var _28Png = require("url:../../img/providers/28.png");
var _28PngDefault = parcelHelpers.interopDefault(_28Png);
function W2gNative() {
    this.provider_name = "Direct Link";
    this.provider_type = "search";
    this.provider_category = "video";
    this.icon_path = (0, _28PngDefault.default);
    this.active = false;
    this.description = "Paste a direct https link to a video or audio file. (.mp4 .mp3 .flac .aac .wav .webm .ogv .mpd .m3u8 .gifv)";
}
W2gNative.prototype.videoLookUp = function(url, callback) {
    var res = url.match(/^https?:\/\/[^?]+\.(mp4|mpd|mp3|aac|wav|webm|ogv|m3u8|gifv|flac)(?:$|\?)\S*/i);
    if (res) {
        if (callback) {
            var info = {};
            info.id = url;
            info.provider = this.provider_name;
            info.title = url;
            info.publisher = "";
            info.publisherID = null;
            info.desc = "";
            info.price = "";
            info.thumb = "https://static.w2g.tv/static/providers/28.png";
            info.cc = false;
            info.duration = 0;
            info.explicit = false;
            callback([
                info
            ], this.provider_name);
        }
        return true;
    } else return false;
};
//Search for video through facebook API
W2gNative.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};

},{"url:../../img/providers/28.png":"hjvZs","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"hjvZs":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("gfh34");

},{}],"a1fQb":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Facebook API and init player
parcelHelpers.export(exports, "W2gCam", ()=>W2gCam);
var _23Png = require("url:../../img/providers/23.png");
var _23PngDefault = parcelHelpers.interopDefault(_23Png);
function W2gCam() {
    this.provider_name = "webcam";
    this.provider_type = "browse";
    this.provider_category = "screenshare";
    this.icon_path = (0, _23PngDefault.default);
    this.active = false;
    this.description = "Select one of the active webcams below.";
}
W2gCam.prototype.videoLookUp = function(url, callback) {
    if (!callback && url.indexOf("w2gcam://") === 0) return true;
    else return false;
};
//Search for video through facebook API
W2gCam.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};

},{"url:../../img/providers/23.png":"jnGBV","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"jnGBV":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("7cyig");

},{}],"avBTO":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Load Facebook API and init player
parcelHelpers.export(exports, "W2gScreenshare", ()=>W2gScreenshare);
var _24Png = require("url:../../img/providers/24.png");
var _24PngDefault = parcelHelpers.interopDefault(_24Png);
function W2gScreenshare() {
    this.provider_name = "screenshare";
    this.provider_type = "browse";
    this.provider_category = "screenshare";
    this.icon_path = (0, _24PngDefault.default);
    this.active = false;
    this.description = "Select one of the active screenshares below.";
}
W2gScreenshare.prototype.videoLookUp = function(url, callback) {
    if (!callback && url.indexOf("w2gscreen://") === 0) return true;
    else return false;
};
//Search for video through facebook API
W2gScreenshare.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};

},{"url:../../img/providers/24.png":"3XJ7j","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"3XJ7j":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("a4Z0N");

},{}],"azOZx":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "W2gSync", ()=>W2gSync);
var _10Png = require("url:../../img/providers/10.png");
var _10PngDefault = parcelHelpers.interopDefault(_10Png);
function W2gSync() {
    this.provider_name = "W2gSync";
    this.provider_type = "search";
    this.provider_category = "video";
    this.icon_path = (0, _10PngDefault.default);
    this.active = false;
    this.lookupFallback = true; // Move to last position for lookup.
    this.description = "Paste a link to any website that contains a video into the searchbar.";
}
W2gSync.prototype.videoLookUp = function(url, callback) {
    var res = url.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+'.~#,;!?()&/=]*)$/);
    if (res) {
        if (callback) {
            var info = {};
            info.id = res[0];
            info.provider = this.provider_name;
            info.title = res[0];
            info.publisher = "";
            info.publisherID = null;
            info.desc = "";
            info.price = "";
            info.thumb = "https://static.w2g.tv/static/providers/10.png";
            info.cc = false;
            info.duration = 0;
            info.explicit = false;
            callback([
                info
            ], this.provider_name);
        }
        return true;
    } else return false;
};
//Search for video through facebook API
W2gSync.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};

},{"url:../../img/providers/10.png":"59zav","@parcel/transformer-js/src/esmodule-helpers.js":"1LDZ5"}],"59zav":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("5jTsr");

},{}]},["kkymK","kUQVP"], "kUQVP", "parcelRequire94c2", "./", "/")

