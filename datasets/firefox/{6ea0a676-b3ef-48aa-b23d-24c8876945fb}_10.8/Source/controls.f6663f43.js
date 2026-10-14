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
})({"ewohz":[function(require,module,exports,__globalThis) {
var _w2Gdataobject = require("../../../js/w2gbind/w2gdataobject");
var _w2Gbind = require("../../../js/w2gbind/w2gbind");
let updateSlider = true, updateTimeout, mouseState = "in";
let controls = {
    systemstate: "searching",
    state: "pause",
    sliderval: 0,
    timeval: 0,
    durationval: 0,
    time: "00:00",
    duration: "00:00",
    autoHide: false,
    toggleHide: function() {
        this.autoHide = !this.autoHide;
    },
    togglePlay: function() {
        _sendMsg({
            "ui_toggle": true
        });
    },
    sliderChange: function() {
        _sendMsg({
            "ui_seek": controls.sliderval / 1000 * controls.durationval
        });
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(function() {
            updateSlider = true;
        }, 2000);
    },
    sliderInput: function() {
        clearTimeout(updateTimeout);
        updateSlider = false;
        if (controls.durationval) controls.time = _toTimeCode(controls.sliderval / 1000 * controls.durationval);
    },
    setNew: function() {
        _sendMsg({
            newurl: true
        });
    },
    reSync: function() {
        _sendMsg({
            resync: true
        });
    }
};
window.addEventListener("message", function(msg) {
    var m = msg.data.ui_update || msg.data;
    if (m.play) controls.state = "play";
    else if (m.pause) controls.state = "pause";
    else if (typeof m.durationchange !== "undefined") {
        controls.durationval = m.durationchange;
        controls.duration = _toTimeCode(m.durationchange);
    } else if (typeof m.timeupdate !== "undefined") {
        controls.timeval = m.timeupdate;
        controls.time = _toTimeCode(m.timeupdate);
        if (controls.durationval && updateSlider) controls.sliderval = Math.round(controls.timeval / controls.durationval * 1000);
    } else if (m.videofound) controls.systemstate = "videofound";
    else if (m.resync) controls.systemstate = "resync";
});
controls = new (0, _w2Gdataobject.W2gDataObject)(controls);
new (0, _w2Gbind.W2gBind)(controls, ".w2g-controls");
controls._addHandler("autoHide", function(p, v) {
    if (v === true) setTimeout(function() {
        _sendMsg({
            "show_ui": false
        });
    }, 500);
});
document.querySelector("body").addEventListener("mouseenter", function() {
    mouseState = "in";
    _sendMsg({
        "show_ui": true
    });
});
document.querySelector("body").addEventListener("mouseleave", function() {
    mouseState = "out";
    if (controls.autoHide === true) setTimeout(function() {
        if (mouseState === "out") _sendMsg({
            "show_ui": false
        });
    }, 1000);
});
function _sendMsg(msg) {
    window.top.postMessage(msg, "*");
}
function _toTimeCode(seconds) {
    seconds = isNaN(seconds) ? 0 : seconds;
    var hours, minutes, retval;
    seconds = Math.round(seconds);
    hours = ("00" + Math.floor(seconds / 3600)).slice(-2);
    seconds = seconds % 3600;
    minutes = ("00" + Math.floor(seconds / 60)).slice(-2);
    seconds = ("00" + seconds % 60).slice(-2);
    retval = hours + ":" + minutes + ":" + seconds;
    return retval;
}

},{"../../../js/w2gbind/w2gdataobject":"7VVht","../../../js/w2gbind/w2gbind":"bca7W"}],"1LDZ5":[function(require,module,exports,__globalThis) {
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

},{}]},["ewohz"], "ewohz", "parcelRequire94c2")

