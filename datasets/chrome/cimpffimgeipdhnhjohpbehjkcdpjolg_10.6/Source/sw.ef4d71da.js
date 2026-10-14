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
})({"d0zzj":[function(require,module,exports,__globalThis) {
module.bundle.extendImportMap({
    "aBS0j": "content_video.9c4954f8.js",
    "ihmLI": "content_video.a0c21fdc.css",
    "7FxYJ": "options.03629958.html",
    "arOAy": "w2g-logo.64e997da.svg",
    "bNglB": "controls.9a4931b4.css",
    "uTgcq": "popup.1417f5fe.css",
    "3J5Ci": "controls.2f920c02.css",
    "9Cfl6": "options.ecbe193c.js"
});

},{}],"k9s3Z":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _contentVideoJs = require("url:./content_video.js");
var _contentVideoJsDefault = parcelHelpers.interopDefault(_contentVideoJs);
var _contentVideoCss = require("url:../css/content_video.css");
var _contentVideoCssDefault = parcelHelpers.interopDefault(_contentVideoCss);
var _optionsEjs = require("url:../options.ejs");
var _optionsEjsDefault = parcelHelpers.interopDefault(_optionsEjs);
let content_css = (0, _contentVideoCssDefault.default).split("/").slice(-1).pop().split("?")[0];
let content_js = (0, _contentVideoJsDefault.default).split("/").slice(-1).pop().split("?")[0];
const allowed_hosts = /^https:\/\/(?:(stage|rooms)\.)?w2g.tv(:|\/|$)/;
let db, db_promise = new Promise(function(resolve, reject) {
    chrome.storage.session.get([
        'db'
    ]).then(function(d) {
        db = d.db || {};
        resolve();
    });
});
chrome.runtime.onMessage.addListener(function(msg, sender) {
    db_promise.then(function() {
        if (sender.url.match(allowed_hosts)) {
            if (msg.openSite) chrome.windows.create({
                left: 10,
                top: 10,
                width: 1024,
                height: 680,
                type: navigator.userAgent.toLowerCase().indexOf('firefox') > -1 || navigator.userAgent.indexOf("OPR") > -1 ? "normal" : "popup",
                url: msg.openSite.url
            }).then(function(w) {
                db[sender.tab.id] = {
                    type: "window",
                    stab: w.tabs[w.tabs.length - 1].id,
                    tframe: null,
                    vframe: null,
                    vidscore: 0,
                    syncurl: msg.openSite.url
                };
                chrome.storage.session.set({
                    db: db
                }).then(function() {
                    chrome.tabs.sendMessage(sender.tab.id, {
                        "windowOpened": true
                    }, {
                        frameId: 0
                    });
                });
            });
            if (db[sender.tab.id]) {
                if (db[sender.tab.id].type === "window") {
                    if (msg.closeSite) _closeWindow(sender.tab.id);
                    else if (msg.focusSite) chrome.tabs.get(db[sender.tab.id].stab).then(function(tab) {
                        chrome.windows.update(tab.windowId, {
                            focused: true
                        });
                    });
                }
                if (msg.urlok) {
                    msg.urlok.syncurl = db[sender.tab.id].syncurl;
                    chrome.tabs.sendMessage(db[sender.tab.id].stab, msg);
                } else if (db[sender.tab.id].vframe !== null) chrome.tabs.sendMessage(db[sender.tab.id].stab, msg, {
                    frameId: db[sender.tab.id].vframe
                });
            }
        } else if (sender.tab) {
            let m = _getKeyByTab(sender.tab.id);
            if (m) {
                if (msg.newurl && sender.frameId === db[m].tframe) chrome.tabs.get(sender.tab.id).then(function(controlledTab) {
                    chrome.tabs.sendMessage(m, {
                        "content_loaded": {
                            url: msg.newurl.url,
                            title: msg.newurl.title,
                            thumb: controlledTab.favIconUrl && controlledTab.favIconUrl.startsWith("http") ? controlledTab.favIconUrl : "https://w2g.tv/static/providers/10.png"
                        }
                    }, {
                        frameId: 0
                    });
                });
                else if (msg.checkurl) chrome.tabs.sendMessage(m, msg, {
                    frameId: 0
                });
                else if (msg.videofound) {
                    if (msg.videofound > db[m].vidscore) {
                        db[m].vidscore = msg.videofound;
                        db[m].vframe = sender.frameId;
                        chrome.storage.session.set({
                            db: db
                        });
                        if (db[m].type === "window" && db[m].tframe !== null) chrome.tabs.sendMessage(db[m].stab, msg, {
                            frameId: db[m].tframe
                        });
                    }
                } else if (db[m].vframe === sender.frameId) {
                    if (db[m].type === "window" && db[m].tframe !== null) chrome.tabs.sendMessage(db[m].stab, {
                        ui_update: msg
                    }, {
                        frameId: db[m].tframe
                    });
                    chrome.tabs.sendMessage(m, msg, {
                        frameId: 0
                    });
                } else if (sender.frameId === 0 && (msg.ui_seek !== undefined || msg.ui_toggle !== undefined || msg.checkurl !== undefined)) chrome.tabs.sendMessage(m, msg, {
                    frameId: 0
                });
            }
        }
    });
});
chrome.webNavigation.onDOMContentLoaded.addListener(function(detail) {
    db_promise.then(function() {
        let m = _getKeyByTab(detail.tabId);
        if (m) switch(db[m].type){
            case "window":
                _insertContentScript(detail.tabId, detail.frameId);
                if (detail.frameType ? detail.frameType === "outermost_frame" : detail.frameId === 0) {
                    db[m].vidscore = 0;
                    db[m].tframe = detail.frameId;
                    chrome.storage.session.set({
                        db: db
                    });
                }
                break;
            case "embed":
                new Promise(function(resolve, reject) {
                    function traverse(id) {
                        if (id === 0) reject();
                        else if (id === db[m].tframe) resolve();
                        else chrome.webNavigation.getFrame({
                            tabId: detail.tabId,
                            frameId: id
                        }).then(function(frame) {
                            traverse(frame.parentFrameId);
                        });
                    }
                    if (detail.frameId !== db[m].tframe) traverse(detail.frameId);
                    else reject();
                }).then(function() {
                    _insertContentScript(detail.tabId, detail.frameId);
                }).catch(function() {});
                break;
        }
    });
});
chrome.webNavigation.onBeforeNavigate.addListener(function(detail) {
    if (detail.url.indexOf("https://mediaplay.cc/oembed.html?url=") === 0) db_promise.then(function() {
        chrome.webNavigation.getFrame({
            tabId: detail.tabId,
            frameId: 0
        }).then(function(f) {
            if (f.url.match(allowed_hosts)) {
                db[detail.tabId] = {
                    type: "embed",
                    stab: detail.tabId,
                    tframe: detail.frameId,
                    vframe: null,
                    vidscore: 0,
                    syncurl: ""
                };
                chrome.storage.session.set({
                    db: db
                });
            }
        });
    });
    else if (detail.frameId === 0 && db[detail.tabId]) _closeWindow(detail.tabId);
});
chrome.tabs.onRemoved.addListener(function(id) {
    db_promise.then(function() {
        if (db[id]) _closeWindow(id);
        else {
            let m = _getKeyByTab(id);
            if (m) {
                chrome.tabs.sendMessage(m, {
                    "reset": true
                }, {
                    frameId: 0
                });
                chrome.tabs.sendMessage(m, {
                    "windowClosed": true
                }, {
                    frameId: 0
                });
            }
        }
    });
});
chrome.runtime.onInstalled.addListener(function(details) {
    if (chrome.declarativeNetRequest) {
        let url = chrome.runtime.getURL(".").match(/^moz-extension:\/\/(\S+)\/$/);
        url = url ? url[1] : chrome.runtime.id;
        const rules = [
            {
                id: 1,
                action: {
                    type: 'modifyHeaders',
                    requestHeaders: [
                        {
                            header: 'Origin',
                            operation: 'set',
                            value: "https://w2g.tv"
                        },
                        {
                            header: 'Referer',
                            operation: 'set',
                            value: "https://w2g.tv/"
                        }
                    ]
                },
                condition: {
                    initiatorDomains: [
                        url
                    ],
                    requestMethods: [
                        'get',
                        'post',
                        'put'
                    ],
                    resourceTypes: [
                        'xmlhttprequest'
                    ]
                }
            }
        ];
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: rules.map((r)=>r.id),
            addRules: rules
        });
    }
    chrome.permissions.contains({
        origins: [
            '<all_urls>'
        ]
    }, (result)=>{
        if (result !== true) {
            if (details.reason === "install") chrome.tabs.create({
                url: (0, _optionsEjsDefault.default)
            });
        }
    });
});
function _closeWindow(tab) {
    if (db[tab] && db[tab].type === "window") chrome.tabs.get(db[tab].stab).then(function(t) {
        chrome.windows.remove(t.windowId);
        delete db[tab];
        chrome.storage.session.set({
            db: db
        });
    });
}
function _insertContentScript(tab, frame) {
    chrome.scripting.insertCSS({
        target: {
            tabId: tab,
            frameIds: [
                frame
            ]
        },
        files: [
            content_css
        ]
    }).catch(function(e) {
        console.log(e);
    });
    chrome.scripting.executeScript({
        target: {
            tabId: tab,
            frameIds: [
                frame
            ]
        },
        files: [
            content_js
        ]
    }).catch(function(e) {
        console.log(e);
    });
}
function _getKeyByTab(id) {
    for(const k in db)if (Object.hasOwn(db, k)) {
        if (db[k].stab == id) return parseInt(k);
    }
    return null;
}

},{"url:./content_video.js":"80ab1","url:../css/content_video.css":"fWPb5","url:../options.ejs":"g6uTO","@parcel/transformer-js/src/esmodule-helpers.js":"fXupl"}],"80ab1":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("aBS0j");

},{}],"fWPb5":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("ihmLI");

},{}],"g6uTO":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("7FxYJ");

},{}],"fXupl":[function(require,module,exports,__globalThis) {
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

},{}]},["d0zzj","k9s3Z"], "k9s3Z", "parcelRequire94c2", "./", "/")

