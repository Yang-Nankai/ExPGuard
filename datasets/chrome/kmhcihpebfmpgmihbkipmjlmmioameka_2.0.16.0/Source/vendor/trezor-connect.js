(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TrezorConnect"] = factory();
	else
		root["TrezorConnect"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 6:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,10],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,6],"min_firmware_version":[2,7,2],"bootloader_version":[2,1,10],"firmware_revision":"2a65d18200580005dc419b9569ed97fae440806a","translations":{"cs-CZ":"firmware/translations/t3t1/translation-T3T1-cs-CZ-2.8.10.bin","de-DE":"firmware/translations/t3t1/translation-T3T1-de-DE-2.8.10.bin","es-ES":"firmware/translations/t3t1/translation-T3T1-es-ES-2.8.10.bin","fr-FR":"firmware/translations/t3t1/translation-T3T1-fr-FR-2.8.10.bin","it-IT":"firmware/translations/t3t1/translation-T3T1-it-IT-2.8.10.bin","pt-BR":"firmware/translations/t3t1/translation-T3T1-pt-BR-2.8.10.bin"},"url":"firmware/t3t1/trezor-t3t1-2.8.10-bitcoinonly.bin","fingerprint":"11d3f68d08f3f95c04dd526826f81eb7918df85928cfcef73beeae3132342bf0","changelog":"* Visual cues to distinguish unlocked state on Homescreen.\\n* Replaced \\"next page\\" icon with \\"...\\" ellipsis when confirming long message.\\n* Allow firmware upgrade even if language change failed."}');

/***/ }),

/***/ 16:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,6,2],"min_bridge_version":[1,1,5],"min_bootloader_version":[1,0,0],"min_firmware_version":[1,0,0],"bootloader_version":[1,5,0],"firmware_revision":"c9113fd3f5fcd78e9e560dbac75ed5aae359eb2d","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.6.2.bin","fingerprint":"d31304f793854e343df6ccf1804f7e2abf48ddcd82a379ca2d3711d54127e138","changelog":"* Add possibility to set custom auto-lock delay\\n* Bitcoin Cash cashaddr support\\n* Zcash Overwinter hardfork support\\n* Support for new coins:\\n  - Decred, Bitcoin Private, Fujicoin, Groestlcoin, Vertcoin, Viacoin, Zcoin\\n* Support for new Ethereum networks:\\n  - EOS Classic, Ethereum Social, Ellaism, Callisto, EtherGem, Wanchain\\n* Support for 500+ new Ethereum tokens"}');

/***/ }),

/***/ 46:
/***/ ((module) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ 91:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,9,4],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,8,0],"firmware_revision":"ffa96205fb5e22b43e7b08a3dbc3cdeee0931de3","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.9.4.bin","fingerprint":"867017bd784cc4e9ce6f0875c61ea86f89b19380d54045c34608b85472998000","changelog":"* Replacement transaction signing for replace-by-fee.\\n* Support for Output Descriptors export.\\n* Show Ypub/Zpub correctly for multisig GetAddress.\\n* Show amounts in mBTC, uBTC and sat denominations."}');

/***/ }),

/***/ 198:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,10,5],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,10,0],"firmware_revision":"3f12742669bd782cac374a1750d517f4fd88c43b","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.10.5.bin","fingerprint":"7619fcc73c43ca8a3e6aad3dc3eb6551fed05bb218340efe01a02bb96e9f346b","changelog":"* Support for blindly signing EIP-712 data."}');

/***/ }),

/***/ 260:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,3],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,7],"min_firmware_version":[2,8,3],"bootloader_version":[2,1,8],"firmware_revision":"7f373ae71eca855dd41b4a0fdcc7cadaa13a8281","translations":{"cs-CZ":"firmware/translations/t3b1/translation-T3B1-cs-CZ-2.8.3.bin","de-DE":"firmware/translations/t3b1/translation-T3B1-de-DE-2.8.3.bin","es-ES":"firmware/translations/t3b1/translation-T3B1-es-ES-2.8.3.bin","fr-FR":"firmware/translations/t3b1/translation-T3B1-fr-FR-2.8.3.bin","it-IT":"firmware/translations/t3b1/translation-T3B1-it-IT-2.8.3.bin","pt-BR":"firmware/translations/t3b1/translation-T3B1-pt-BR-2.8.3.bin"},"url":"firmware/t3b1/trezor-t3b1-2.8.3.bin","fingerprint":"b659bdc5ddce208d46ce649fc7a8995ae49541c7c41a88ddaac5dfc038ffb5de","changelog":"* Renamed MATIC to POL, following a network upgrade.\\n* Fix persistent word when going to previous word during recovery process.\\n* Fix display orientation south."}');

/***/ }),

/***/ 263:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,6,4],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,4],"firmware_revision":"42e9ed0e09033d474dee1a560fe5870646fa440e","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.6.4-bitcoinonly.bin","fingerprint":"e78da8a00354dd1223da081600f881b71bd297dd565e7a2c0a9880e52575d127","changelog":"* The display of spaced addresses has been refined, offering a more user-friendly and visually optimized experience. \\n* Boot-up logo display has been optimized, contributing to a smoother and more visually appealing device startup."}');

/***/ }),

/***/ 278:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,0],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,6],"min_firmware_version":[2,7,2],"bootloader_version":[2,1,6],"firmware_revision":"dd4671a5104952ef505d28d1f9e94d1484b4607a","translations":{"cs-CZ":"firmware/translations/t3t1/translation-T3T1-cs-CZ-2.8.0.bin","de-DE":"firmware/translations/t3t1/translation-T3T1-de-DE-2.8.0.bin","es-ES":"firmware/translations/t3t1/translation-T3T1-es-ES-2.8.0.bin","fr-FR":"firmware/translations/t3t1/translation-T3T1-fr-FR-2.8.0.bin"},"url":"firmware/t3t1/trezor-t3t1-2.8.0.bin","fingerprint":"bd199ce0934769aca5c3a91f71fd48e533d88c8cf087b76ac49db415fa08c286","changelog":"* Added tutorial flow. \\n* Added Animated device label on homescreen/lockscreen. \\n* Added word counter during wallet creation. \\n* Improved change homescreen flow. \\n* Improved swipe behavior and animations. \\n* Increased Optiga read timeout to avoid spurious RSODs. \\n* Fixed swipe back from address QR code screen. \\n* Fixed device authenticity check. \\n* Removed CoSi functionality."}');

/***/ }),

/***/ 544:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,3,2],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"63ebb8ccb56fc17a72eef91db36a37ff3176519d","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.3.2.bin","fingerprint":"f5ccdca0cbe163ecb93df726da72b69abb93f70d24d295db00b3ca2738216160","changelog":"* Introduces \'Autolock\' feature, which automatically locks the device to enforce the PIN entry after a certain period.\\n* Updates the Cardano support to enable staking and other Shelley updates.\\n* Reintroduces the ability to spend pre-Overwinter (2018) funds on Zcash-like coins.\\n* Fixes compatibility issues with Casa and GreenAddress.\\n* Adds support for multiple change outputs in outgoing transactions.\\n* Improves some interface elements."}');

/***/ }),

/***/ 639:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,0],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,1],"min_firmware_version":[2,6,1],"bootloader_version":[2,1,4],"firmware_revision":"dd4671a5104952ef505d28d1f9e94d1484b4607a","translations":{"cs-CZ":"firmware/translations/t2b1/translation-T2B1-cs-CZ-2.8.0.bin","de-DE":"firmware/translations/t2b1/translation-T2B1-de-DE-2.8.0.bin","es-ES":"firmware/translations/t2b1/translation-T2B1-es-ES-2.8.0.bin","fr-FR":"firmware/translations/t2b1/translation-T2B1-fr-FR-2.8.0.bin","it-IT":"firmware/translations/t2b1/translation-T2B1-it-IT-2.8.0.bin","pt-BR":"firmware/translations/t2b1/translation-T2B1-pt-BR-2.8.0.bin"},"url":"firmware/t2b1/trezor-t2b1-2.8.0.bin","fingerprint":"cf3ce230a69a681199f74cf6ac8c6c431f8fa7e0d0183437f93c5cc029fbd155","changelog":"* Removed CoSi functionality. \\n* Increased Optiga read timeout to avoid spurious RSODs."}');

/***/ }),

/***/ 659:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,8],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,8],"firmware_revision":"592590cf66a9b62dfeee7e4d2afb6e01005e5b2c","translations":{"cs-CZ":"firmware/translations/t2t1/translation-T2T1-cs-CZ-2.8.8.bin","de-DE":"firmware/translations/t2t1/translation-T2T1-de-DE-2.8.8.bin","es-ES":"firmware/translations/t2t1/translation-T2T1-es-ES-2.8.8.bin","fr-FR":"firmware/translations/t2t1/translation-T2T1-fr-FR-2.8.8.bin","it-IT":"firmware/translations/t2t1/translation-T2T1-it-IT-2.8.8.bin","pt-BR":"firmware/translations/t2t1/translation-T2T1-pt-BR-2.8.8.bin"},"url":"firmware/t2t1/trezor-t2t1-2.8.8.bin","fingerprint":"f4888bed3e75205464910f3956d1f3ad19bb73e093b31c9141a66226a7081990","changelog":"* Fix \\"PIN attempts exceeded\\" screen\\n* Fixed a bug resulting in restarting the recovery flow when inputting 33-word mnemonic"}');

/***/ }),

/***/ 727:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,4,1],"min_bridge_version":[1,1,5],"min_bootloader_version":[1,0,0],"min_firmware_version":[1,0,0],"firmware_revision":"ae37ea8a9a2ab96e60714451a7a9502e0ef1ffc9","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.4.1.bin","fingerprint":"92636493f76f352213e681bbc26eb3a8844f7b8a3044214b65c3c2c10a0f788c","changelog":"* Support for Zcash JoinSplit transactions\\n* Enable device lock after 10 minutes of inactivity\\n* Enable device lock by pressing left button for 2 seconds\\n* Confirm dialog for U2F counter change"}');

/***/ }),

/***/ 821:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,5,1],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"85a26d2c9593bcdf858c2d718d79951ca927a0c3","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.5.1-bitcoinonly.bin","fingerprint":"db5d7b211532f717a32fe0b1bd3e3df6ad5464079a896a7f7492ab6e9e030bb5","changelog":"* Support Electrum signatures in VerifyMessage.\\n* Bitcoin bech32 addresses QR codes have bigger pixels which are easier to scan.\\n* Trezor will refuse to sign UTXOs that do not match the provided derivation path (e.g., transactions belonging to a different wallet, or synthetic transaction inputs)."}');

/***/ }),

/***/ 900:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,13,0],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,12,0],"min_firmware_version":[1,12,0],"bootloader_version":[1,12,1],"firmware_revision":"592590cf66a9b62dfeee7e4d2afb6e01005e5b2c","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.13.0-bitcoinonly.bin","fingerprint":"253042fb209c78e02482c645b16cc9894c19124e9c9c0c1051b3c68b6e7c700b","changelog":"* Multisig-related changes.\\n* Reworked PIN processing.\\n* Allow showing XPUB using a QR code."}');

/***/ }),

/***/ 1014:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,7,0],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,4],"firmware_revision":"45e8a842a31e62a6d43d7f6ccac62a45e1198ef0","translations":{"cs-CZ":"firmware/translations/t2t1/translation-T2T1-cs-CZ-2.7.0.bin","de-DE":"firmware/translations/t2t1/translation-T2T1-de-DE-2.7.0.bin","es-ES":"firmware/translations/t2t1/translation-T2T1-es-ES-2.7.0.bin","fr-FR":"firmware/translations/t2t1/translation-T2T1-fr-FR-2.7.0.bin"},"url":"firmware/t2t1/trezor-t2t1-2.7.0.bin","fingerprint":"53a645218792e413ad06c27320b7d1adc944b690ce831301bbf11c30352d3278","changelog":"* Add translations capability. \\n* Allow for going back to previous word in recovery process. \\n* Clear sign ETH staking transactions on Everstake pool. [Universal fw only] \\n* Display descriptors for BTC Taproot public keys. \\n* Fixed blank display delay on startup when display orientation is set to other than north. \\n* Multiple Solana instructions improved. [Universal fw only]"}');

/***/ }),

/***/ 1052:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,13,0],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,12,0],"min_firmware_version":[1,12,0],"bootloader_version":[1,12,1],"firmware_revision":"592590cf66a9b62dfeee7e4d2afb6e01005e5b2c","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.13.0.bin","fingerprint":"356433bd9de6cb564bf7778fc5de73c56197459523358f267e9235af9e1ce46d","changelog":"* Multisig-related changes.\\n* Reworked PIN processing.\\n* Allow showing XPUB using a QR code."}');

/***/ }),

/***/ 1174:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,10],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,7],"min_firmware_version":[2,8,3],"bootloader_version":[2,1,10],"firmware_revision":"2a65d18200580005dc419b9569ed97fae440806a","translations":{"cs-CZ":"firmware/translations/t3b1/translation-T3B1-cs-CZ-2.8.10.bin","de-DE":"firmware/translations/t3b1/translation-T3B1-de-DE-2.8.10.bin","es-ES":"firmware/translations/t3b1/translation-T3B1-es-ES-2.8.10.bin","fr-FR":"firmware/translations/t3b1/translation-T3B1-fr-FR-2.8.10.bin","it-IT":"firmware/translations/t3b1/translation-T3B1-it-IT-2.8.10.bin","pt-BR":"firmware/translations/t3b1/translation-T3B1-pt-BR-2.8.10.bin"},"url":"firmware/t3b1/trezor-t3b1-2.8.10-bitcoinonly.bin","fingerprint":"5a0aa661b61d056f72b83bf0d5c7eb4ddc84d6370fb977be794b145e49e8ff3f","changelog":"* Upgrade bundled bootloader to 2.1.10.\\n* Replaced \\"next page\\" icon with \\"...\\" ellipsis when confirming long message.\\n* Allow firmware upgrade even if language change failed."}');

/***/ }),

/***/ 1201:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,4,2],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"9276b1702361f70e094286e2f89e919d8a230d5c","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.4.2.bin","fingerprint":"54ccf155510b5292bd17ed748409d0d135112e24e62eb74184639460beecb213","changelog":"* Support for Ethereum EIP1559 transactions.\\n* Re-enabled Firo support.\\n* Memory optimization of BTC signing and CBOR decoding.\\n* Support for large Cardano transactions.\\n* Remove Lisk."}');

/***/ }),

/***/ 1231:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,0],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,6],"min_firmware_version":[2,7,2],"bootloader_version":[2,1,6],"firmware_revision":"dd4671a5104952ef505d28d1f9e94d1484b4607a","translations":{"cs-CZ":"firmware/translations/t3t1/translation-T3T1-cs-CZ-2.8.0.bin","de-DE":"firmware/translations/t3t1/translation-T3T1-de-DE-2.8.0.bin","es-ES":"firmware/translations/t3t1/translation-T3T1-es-ES-2.8.0.bin","fr-FR":"firmware/translations/t3t1/translation-T3T1-fr-FR-2.8.0.bin"},"url":"firmware/t3t1/trezor-t3t1-2.8.0-bitcoinonly.bin","fingerprint":"3dc847cc396fe83f5a324242097a4cf97fc64acf90516efcfcf23b6d3103a992","changelog":"* Added tutorial flow. \\n* Added Animated device label on homescreen/lockscreen. \\n* Added word counter during wallet creation. \\n* Improved change homescreen flow. \\n* Improved swipe behavior and animations. \\n* Increased Optiga read timeout to avoid spurious RSODs. \\n* Fixed swipe back from address QR code screen. \\n* Fixed device authenticity check. \\n* Removed CoSi functionality."}');

/***/ }),

/***/ 1413:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,4,3],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"595b14254c1abb2be3f69e42c7932f1eca8cf1b1","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.4.3.bin","fingerprint":"a07f69d8d2065006a79c6b5636bd046496dbcb3820b41f1d604d8a4605ca4056","changelog":"* Support Taproot.\\n* Show address confirmation in SignMessage.\\n* Support for advanced Cardano transactions and different derivations for compatibility.\\n* Ethereum support for EIP712 (signing typed data)."}');

/***/ }),

/***/ 1474:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,4,2],"min_bridge_version":[1,1,5],"min_bootloader_version":[1,0,0],"min_firmware_version":[1,0,0],"firmware_revision":"14399f100e862608c24a7e214e9ce971c4d32457","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.4.2.bin","fingerprint":"a4b39f01bd134d01d7534821445bf779dbe6c25f0fcf7c7cb285a79b17f25e0a","changelog":"* New Matrix-based recovery method\\n* Minor Ethereum fixes (including EIP-155 replay protection)\\n* Minor USB, U2F and GPG fixes"}');

/***/ }),

/***/ 1652:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,0,9],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,5],"bootloader_version":[2,0,0],"firmware_revision":"7c2e9ed5a51dc00dec9d195878c5ad57016b4889","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.0.9.bin","fingerprint":"87be93d6966e7a9eff78dc7b434d1a138ec8d1ee0300882d16f90b606f3a806b","changelog":"* Small Monero and Segwit bugfixes"}');

/***/ }),

/***/ 1673:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,10,4],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,10,0],"firmware_revision":"595b14254c1abb2be3f69e42c7932f1eca8cf1b1","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.10.4-bitcoinonly.bin","fingerprint":"30d858b022e218f27854f071d568e5a696c937f1316d83b93aadcd178f3b0a38","changelog":"* Support Taproot.\\n* Show address confirmation in SignMessage."}');

/***/ }),

/***/ 1698:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,6,3],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,4],"firmware_revision":"2c7cc6e0255dee2339b445b5551eaffb88dbd1b4","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.6.3-bitcoinonly.bin","fingerprint":"1765518ca4025d4d46362d07128bb38413831511a2aff0dee1b05e6e58ff5317","changelog":"* QR Code for Extended Public Keys (XPUBs). \\n* Adjusted buttons for multipage content scrolling, providing a more intuitive and user-friendly experience. \\n* The new bootloader version 2.1.4 is now included for enhanced system performance and security."}');

/***/ }),

/***/ 1709:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,3,5],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"ffa96205fb5e22b43e7b08a3dbc3cdeee0931de3","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.3.5.bin","fingerprint":"c0a6cacfed5c7a691314919c22307c29fbe9522071a9a28669769c014762d386","changelog":"* Replacement transaction signing for replace-by-fee and PayJoin.\\n* Support for Output Descriptors export.\\n* Paginated display for signing/verifying long messages.\\n* Show Ypub/Zpub correctly for multisig GetAddress.\\n* Show amounts in mBTC, uBTC and sat denominations."}');

/***/ }),

/***/ 1814:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,10],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,6],"min_firmware_version":[2,7,2],"bootloader_version":[2,1,10],"firmware_revision":"2a65d18200580005dc419b9569ed97fae440806a","translations":{"cs-CZ":"firmware/translations/t3t1/translation-T3T1-cs-CZ-2.8.10.bin","de-DE":"firmware/translations/t3t1/translation-T3T1-de-DE-2.8.10.bin","es-ES":"firmware/translations/t3t1/translation-T3T1-es-ES-2.8.10.bin","fr-FR":"firmware/translations/t3t1/translation-T3T1-fr-FR-2.8.10.bin","it-IT":"firmware/translations/t3t1/translation-T3T1-it-IT-2.8.10.bin","pt-BR":"firmware/translations/t3t1/translation-T3T1-pt-BR-2.8.10.bin"},"url":"firmware/t3t1/trezor-t3t1-2.8.10.bin","fingerprint":"f6f50b4a419b041a59620ef681047c27af0902798e0227397c532dd70736694a","changelog":"* Add Nostr support (in debug mode only!).\\n* Visual cues to distinguish unlocked state on Homescreen.\\n* Solana: rent fee calculation [#4933]\\n* Solana: loadable token definitions [#3541]\\n* Replaced \\"next page\\" icon with \\"...\\" ellipsis when confirming long message.\\n* Updated EIP-1559 fee-related labels.\\n* Allow firmware upgrade even if language change failed.\\n* Solana: fees calculation is now exact [#4965]"}');

/***/ }),

/***/ 1847:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,4,0],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"ea3596ad89a7993ad7b9d62798de94325ad1717a","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.4.0.bin","fingerprint":"d90265ee6d7d499c7d938b5322f71f27042da8a6fdaed54c224d31b65e868def","changelog":"* Locking the device by holding finger on the homescreen.\\n* Support PIN of unlimited length.\\n* Allow decreasing the output value in RBF transactions.\\n* Reduce memory fragmentation.\\n* Update FIDO icons.\\n* Improve wording when showing multisig XPUBs."}');

/***/ }),

/***/ 1854:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,9],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,7],"min_firmware_version":[2,8,3],"bootloader_version":[2,1,8],"firmware_revision":"fad9682201cf9289bba2adb66e6e07ed1cf78936","translations":{"cs-CZ":"firmware/translations/t3b1/translation-T3B1-cs-CZ-2.8.9.bin","de-DE":"firmware/translations/t3b1/translation-T3B1-de-DE-2.8.9.bin","es-ES":"firmware/translations/t3b1/translation-T3B1-es-ES-2.8.9.bin","fr-FR":"firmware/translations/t3b1/translation-T3B1-fr-FR-2.8.9.bin","it-IT":"firmware/translations/t3b1/translation-T3B1-it-IT-2.8.9.bin","pt-BR":"firmware/translations/t3b1/translation-T3B1-pt-BR-2.8.9.bin"},"url":"firmware/t3b1/trezor-t3b1-2.8.9.bin","fingerprint":"5b3a639c5b6423d87f4c0a3855dc4be8ad7e5be6d6b1b33f93ab1a54f3f36a91","changelog":"* Ability to cancel recovery on word count selection screen.\\n* New UI for confirming long messages.\\n* Solana staking confirmation dialogs."}');

/***/ }),

/***/ 1895:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,3,5],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"ffa96205fb5e22b43e7b08a3dbc3cdeee0931de3","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.3.5-bitcoinonly.bin","fingerprint":"53e7ee5bfc75cfa6412d8de5461b1ea8d9b7e10970ce7cadae9cbb1e17bbb77d","changelog":"* Replacement transaction signing for replace-by-fee and PayJoin.\\n* Support for Output Descriptors export.\\n* Paginated display for signing/verifying long messages.\\n* Show Ypub/Zpub correctly for multisig GetAddress.\\n* Show amounts in mBTC, uBTC and sat denominations."}');

/***/ }),

/***/ 1906:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,6,0],"min_bridge_version":[1,1,5],"min_bootloader_version":[1,0,0],"min_firmware_version":[1,0,0],"firmware_revision":"723cf295a72ce07b96047901bb8c2e461a2488f8","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.6.0.bin","fingerprint":"e40f6ce12724c2d24234a7752953b88fd9ec28b3ec72c0dbfa280095a67a06ca","changelog":"* Native SegWit (Bech32) address support\\n* Show recognized BIP44/BIP49 paths in GetAddress dialog\\n* NEM support\\n* Expanse and UBIQ chains support\\n* Bitcoin Gold, DigiByte, Monacoin support\\n* Ed25519 collective signatures (CoSi) support"}');

/***/ }),

/***/ 1923:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,13,1],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,12,0],"min_firmware_version":[1,12,0],"bootloader_version":[1,12,1],"firmware_revision":"2a65d18200580005dc419b9569ed97fae440806a","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.13.1.bin","fingerprint":"f588657818ccf99b0046ede3f87eeaf17a0e6e6f1b7853344e18b846ca835328","changelog":"* Clear sign ETH staking transactions on Everstake pool.\\n* Use GWei when formatting large ETH amounts."}');

/***/ }),

/***/ 2090:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,9,3],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,8,0],"firmware_revision":"0d5f00668fb3d1c093ff3c879311a91d3a7175c8","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.9.3.bin","fingerprint":"2589f456559f813d1149be1022e62f2d48fbe28f4d02de933bd888d91035cace","changelog":"* Improves the Passphrase feature by showing the entered passphrase on the Trezor screen before opening the wallet.\\n* Adds support for Verge (XVG).\\n* Drops support for Metaverse (ETP), GINcoin (GIN), Pesetacoin (PTC), and Zel (ZEL).\\n* Re-enables spending coins from Bitcoin paths (fixing some compatibility issues with Bitcoin Cash wallets).\\n* Fixes smaller issues in the user interface."}');

/***/ }),

/***/ 2096:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,12,1],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,12,0],"min_firmware_version":[1,12,0],"bootloader_version":[1,12,1],"firmware_revision":"1eb0eb9d91b092e571aac63db4ebff2a07fd8a1f","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.12.1-bitcoinonly.bin","fingerprint":"985fb6a8c87f7547fb810f6c4a8331ebf19c677445810358778eb21eca78a181","changelog":"* Fee rate shown when replacing transaction.\\n* Ledger Live legacy derivation path m/44\'/coin_type\'/0\'/account is now supported.\\n* SLIP-0019 proofs of ownership for native SegWit implemented.\\n* SLIP-0025 coinjoin accounts implemented for testing purposes.\\n* Bech32 addresses now not converting to uppercase in QR code to increase compatibility.\\n* Decimals of fee rate extended to 2 digits.\\n* Only \\"sat\\" displayed instead of \\"sat BTC\\".\\n* Bootloader 1.12.1. included."}');

/***/ }),

/***/ 2366:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,8,2],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,8,0],"firmware_revision":"3c19e3167d69902305a27f10e43abb5fc7a0254d","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.8.2.bin","fingerprint":"909742eddcffdc72ca854557962ecad90e97585770f514170abe7a691b0c6eb1","changelog":"* Security improvements\\n* Fix display of non-divisible OMNI amounts"}');

/***/ }),

/***/ 2385:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":true,"version":[1,6,1],"min_bridge_version":[1,1,5],"min_bootloader_version":[1,0,0],"min_firmware_version":[1,0,0],"bootloader_version":[1,4,0],"firmware_revision":"9588e8f2736b60916f51e470deb18f55112a6ebc","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.6.1.bin","fingerprint":"83c3190a94e524ac83a1704eb584a2ab53f8a65a893b1ab52e7135812857c807","changelog":"* Use fixed-width font for addresses\\n* Lots of under-the-hood improvements\\n* Fixed issue with write-protection settings"}');

/***/ }),

/***/ 2472:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,5,2],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"0d87b55ba4fed7eecc72bf2a94ee473830b095e9","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.5.2-bitcoinonly.bin","fingerprint":"76aa25f9602cfb03cd3e07a82ac09226344eb355355aec216295e43b675eedf7","changelog":"* Show the fee rate on the signing confirmation screen. \\n* Show thousands separator when displaying large amounts."}');

/***/ }),

/***/ 2644:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,11,2],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,11,0],"firmware_revision":"0d87b55ba4fed7eecc72bf2a94ee473830b095e9","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.11.2-bitcoinonly.bin","fingerprint":"7e51546f4411ecf44688c681ada72a18495fd08e91f3a0429ab91bc4415b362a","changelog":"* Show the fee rate on the signing confirmation screen. \\n* Show thousands separator when displaying large amounts \\n* Fix potential security issues in recovery workflow. \\n* Fix key extraction vulnerability in Cothority Collective Signing (CoSi). \\n* Fix nonce bias in CoSi signing."}');

/***/ }),

/***/ 2759:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,5,3],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"2f03ace311584988d5aeab58fd1acf24ef54711a","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.5.3-bitcoinonly.bin","fingerprint":"c094c84ba958129885fa725ee6ddb781b580fd2c7851e83aef9054ba4a10526c","changelog":"* Add SLIP-0025 CoinJoin accounts. \\n* Show red error header when Trezor doesn\'t see USB data connection. \\n* Show fee rate when replacing transaction. \\n* Optimize the signing of BTC transactions. \\n* Extend decimals of fee rate to 2 digits. \\n* Display only “sat” instead of “sat BTC”."}');

/***/ }),

/***/ 2778:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,7],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,7],"min_firmware_version":[2,8,3],"bootloader_version":[2,1,8],"firmware_revision":"8a254aa8eae82f99630df63f40e4d290066a3efc","translations":{"cs-CZ":"firmware/translations/t3b1/translation-T3B1-cs-CZ-2.8.7.bin","de-DE":"firmware/translations/t3b1/translation-T3B1-de-DE-2.8.7.bin","es-ES":"firmware/translations/t3b1/translation-T3B1-es-ES-2.8.7.bin","fr-FR":"firmware/translations/t3b1/translation-T3B1-fr-FR-2.8.7.bin","it-IT":"firmware/translations/t3b1/translation-T3B1-it-IT-2.8.7.bin","pt-BR":"firmware/translations/t3b1/translation-T3B1-pt-BR-2.8.7.bin"},"url":"firmware/t3b1/trezor-t3b1-2.8.7-bitcoinonly.bin","fingerprint":"4737a6e12d0ebff19fec3aceb212adff57bbcea7a44f8208caf91cc656382d94","changelog":"* Show last typed PIN number for short period of time.\\n* Multisig-related changes.\\n* Included new version of bootloader (2.1.8).\\n* Fix translation of the \'Enable labeling\' screen."}');

/***/ }),

/***/ 2780:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,0,10],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,5],"bootloader_version":[2,0,2],"firmware_revision":"5c3a5d4577b568d90bfa3528d0243d74848d994f","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.0.10.bin","fingerprint":"fcaa6ee206c2c121eb2d45d065d66f0879f14be45c244d4acf908be1de22275e","changelog":"* Fix Monero payment ID computation\\n* Fix issue with touch screen and flickering\\n* Add support for OMNI layer: OMNI/MAID/USDT\\n* Add support for new coins: BTX, CPC, GAME, RVN\\n* Add support for new Ethereum tokens"}');

/***/ }),

/***/ 2860:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,11,2],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,11,0],"firmware_revision":"0d87b55ba4fed7eecc72bf2a94ee473830b095e9","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.11.2.bin","fingerprint":"d8b55b68dfe8a8449ce7391e841073ef5d29349638d85b750508bbef5d2de5ec","changelog":"* Show the fee rate on the signing confirmation screen. \\n* Show thousands separator when displaying large amounts \\n* Fix potential security issues in recovery workflow. \\n* Fix key extraction vulnerability in Cothority Collective Signing (CoSi). \\n* Fix nonce bias in CoSi signing."}');

/***/ }),

/***/ 2931:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,6,0],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,0],"firmware_revision":"88e1f8c7a5c7615723664c64b0a25adc0c409dee","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.6.0-bitcoinonly.bin","fingerprint":"54f084dab4be1e64dc2cb970a6de87969407e4d6c48d79acdcf5d374ec0f29d6","changelog":" Show source account path in BTC signing. \\n* Ability to reboot the device into bootloader mode directly, without needing to unplug the device. \\n* Support for Ledger Live legacy derivation path \\"m/44\'/coin_type\'/0\'/account\\". \\n* Redesigned UI. \\n* Homescreen now supports full-screen images."}');

/***/ }),

/***/ 2958:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,3,4],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"50854b9210f7674262c1541272a8c7fd1767b7a9","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.3.4.bin","fingerprint":"58b51a6587993965979a744f8fcd5c4761f11ce4bec6b059a5d56bd0987d6658","changelog":"* This firmware only contains the changes needed after the latest Monero update (HF13) by introducing support for the CLSAG transactions."}');

/***/ }),

/***/ 3005:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,8],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,8],"firmware_revision":"592590cf66a9b62dfeee7e4d2afb6e01005e5b2c","translations":{"cs-CZ":"firmware/translations/t2t1/translation-T2T1-cs-CZ-2.8.8.bin","de-DE":"firmware/translations/t2t1/translation-T2T1-de-DE-2.8.8.bin","es-ES":"firmware/translations/t2t1/translation-T2T1-es-ES-2.8.8.bin","fr-FR":"firmware/translations/t2t1/translation-T2T1-fr-FR-2.8.8.bin","it-IT":"firmware/translations/t2t1/translation-T2T1-it-IT-2.8.8.bin","pt-BR":"firmware/translations/t2t1/translation-T2T1-pt-BR-2.8.8.bin"},"url":"firmware/t2t1/trezor-t2t1-2.8.8-bitcoinonly.bin","fingerprint":"81928bbb5bc855f46a2ccb210173f9676b69d153a513bfa0101abfc063f7aef5","changelog":"* Fix \\"PIN attempts exceeded\\" screen\\n* Fixed a bug resulting in restarting the recovery flow when inputting 33-word mnemonic"}');

/***/ }),

/***/ 3118:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,3],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,7],"min_firmware_version":[2,8,3],"bootloader_version":[2,1,8],"firmware_revision":"7f373ae71eca855dd41b4a0fdcc7cadaa13a8281","translations":{"cs-CZ":"firmware/translations/t3b1/translation-T3B1-cs-CZ-2.8.3.bin","de-DE":"firmware/translations/t3b1/translation-T3B1-de-DE-2.8.3.bin","es-ES":"firmware/translations/t3b1/translation-T3B1-es-ES-2.8.3.bin","fr-FR":"firmware/translations/t3b1/translation-T3B1-fr-FR-2.8.3.bin","it-IT":"firmware/translations/t3b1/translation-T3B1-it-IT-2.8.3.bin","pt-BR":"firmware/translations/t3b1/translation-T3B1-pt-BR-2.8.3.bin"},"url":"firmware/t3b1/trezor-t3b1-2.8.3-bitcoinonly.bin","fingerprint":"070a61b2a8653e4f9857810b6610d0a15f76ba627c7b6e5654a6de9a1c529049","changelog":"* Fix persistent word when going to previous word during recovery process.\\n* Fix display orientation south."}');

/***/ }),

/***/ 3148:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,5,1],"min_bridge_version":[1,1,5],"min_bootloader_version":[1,0,0],"min_firmware_version":[1,0,0],"firmware_revision":"f0d2e7a37142a6d4c7f7e45a6e4427e53123d614","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.5.1.bin","fingerprint":"1c1fa9802cbd6a947a4f3e78f209d3efe49eb4abbacb101bbc3a0a709c742707","changelog":"* Wipe storage after 16 wrong PIN attempts\\n* Enable Segwit for Bitcoin\\n* Bcash aka Bitcoin Cash support\\n* Message signing/verification for Ethereum and Segwit\\n* Make address dialog nicer (switch text/QR via button)\\n* Use checksum for Ethereum addresses\\n* Add more ERC-20 tokens, handle unrecognized ERC-20 tokens\\n* Allow \\"dry run\\" recovery procedure\\n* Allow separated backup procedure"}');

/***/ }),

/***/ 3174:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,7,2],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,1],"min_firmware_version":[2,6,1],"bootloader_version":[2,1,4],"firmware_revision":"da75d8f4b67410b40a9cfd2954d183d81dd6e8e8","translations":{"cs-CZ":"firmware/translations/t2b1/translation-T2B1-cs-CZ-2.7.2.bin","de-DE":"firmware/translations/t2b1/translation-T2B1-de-DE-2.7.2.bin","es-ES":"firmware/translations/t2b1/translation-T2B1-es-ES-2.7.2.bin","fr-FR":"firmware/translations/t2b1/translation-T2B1-fr-FR-2.7.2.bin"},"url":"firmware/t2b1/trezor-t2b1-2.7.2-bitcoinonly.bin","fingerprint":"5b6e312430de9db6ad3a843e1ba311f8cff9c6a691c20c0e69b711451a729f40","changelog":"* Introducing repeated backups. \\n* Multi-share backups can now have any number of shares."}');

/***/ }),

/***/ 3186:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,4,1],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"24bb4016388fca4b998285b95dcd408f4ed0bff6","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.4.1-bitcoinonly.bin","fingerprint":"fce4503fcadb68dc72144a562ec0a59e7c8d083e403e01bfc4c584161d79f596","changelog":"* Security and major perfomance improvements.\\n* Fix red screen on shutdown."}');

/***/ }),

/***/ 3191:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,1,1],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,5],"firmware_revision":"7af1d5859458e87efd6957885566aed890a9f781","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.1.1.bin","fingerprint":"1b3166a878658fcd2ff82c7ac9a2587da544fd105f678cc7b4d41cba5a8d4c01","changelog":"* Hotfix for touchscreen freeze\\n* Don\'t rotate the screen via swipe gesture\\n* Set screen rotation via user setting\\n* More strict path validations\\n* Display non-zero locktime values\\n* EOS support\\n* Monero UI fixes\\n* Speed and memory optimizations"}');

/***/ }),

/***/ 3199:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,10,2],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,10,0],"firmware_revision":"24bb4016388fca4b998285b95dcd408f4ed0bff6","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.10.2-bitcoinonly.bin","fingerprint":"e597b6aef5a2e817f532d27b8501f99f189e432a887877bdd3498cd3a0afc431","changelog":"* Security improvements."}');

/***/ }),

/***/ 3283:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,8,1],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,8,0],"firmware_revision":"0a6a5f85729e663fbeae5ce9e5745918ff6f9d5d","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.8.1.bin","fingerprint":"019e849c1eb285a03a92bbad6d18a328af3b4dc6999722ebb47677b403a4cd16","changelog":"* Fix fault when using the device with no PIN* Fix OMNI transactions parsing"}');

/***/ }),

/***/ 3467:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,0,8],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,5],"bootloader_version":[2,0,0],"firmware_revision":"939a93221941df8d454569a674f6fb082bf1d423","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.0.8.bin","fingerprint":"642b6215bda981f8eacafee34dbee5cdeee7d47d49f605bbe2828a8d9b79813d","changelog":"* Monero support\\n* Cardano support\\n* Stellar support\\n* Ripple support\\n* Tezos support\\n* Decred support\\n* Groestlcoin support\\n* Zencash support\\n* Zcash sapling hardfork support\\n* Implemented seedless setup"}');

/***/ }),

/***/ 3472:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,4,0],"min_bridge_version":[1,1,5],"min_bootloader_version":[1,0,0],"min_firmware_version":[1,0,0],"firmware_revision":"e0e190b3dc29bcb0f6ab9699c439fe7bfbcde370","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.4.0.bin","fingerprint":"5764715dbcf8ed88bc0ae1c2f715277f22b67f26c15e1f7543b2b44913b5c255","changelog":"* U2F support\\n* Ethereum support\\n* GPG decryption support\\n* Zcash support"}');

/***/ }),

/***/ 3480:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,10,3],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,10,0],"firmware_revision":"9276b1702361f70e094286e2f89e919d8a230d5c","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.10.3.bin","fingerprint":"bf0cc936a9afbf0a4ae7b727a2817fb69fba432d7230a0ff7b79b4a73b845197","changelog":"* Remove Lisk.\\n* Re-enabled Firo support.\\n* Stricter protobuf field handling in Stellar."}');

/***/ }),

/***/ 3549:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,10,0],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,10,0],"firmware_revision":"f4424ece1ccb7fc0d6cad00ff840fac287a34f07","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.10.0-bitcoinonly.bin","fingerprint":"20a4068c34ff6dd7d8c510350409376cf7ea744ba668fdcf16da8f1d81fed289","changelog":"* Bootloader 1.10.0.\\n* Allow decreasing the output value in RBF transactions.\\n* Support long PIN of up to 50 digits.\\n* Display nLockTime in human-readable form."}');

/***/ }),

/***/ 3617:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,6,4],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,1],"min_firmware_version":[2,6,1],"bootloader_version":[2,1,4],"firmware_revision":"42e9ed0e09033d474dee1a560fe5870646fa440e","translations":{},"url":"firmware/t2b1/trezor-t2b1-2.6.4.bin","fingerprint":"5ac16cb5002aa607908be376378a7fd1a1bc18f7b05e7a047cb1365840cc93ef","changelog":"* Trezor Safe 3 now supports Solana, expanding the range of cryptocurrencies it can securely manage. [Universal fw only] \\n* Ethereum fees are now uniformly presented in Gwei, enhancing clarity and consistency for users. [Universal fw only] \\n* Issue with missing address confirmation screens is now fixed. [Universal fw only] \\n* Resolved an issue related to the invalid encoding of signatures from the Optiga chip."}');

/***/ }),

/***/ 3648:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,10,3],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,10,0],"firmware_revision":"9276b1702361f70e094286e2f89e919d8a230d5c","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.10.3-bitcoinonly.bin","fingerprint":"d1143d2cba9c7dba4d57703d2b7da87859d8668472ffc651177ead6b94e89117","changelog":"* Small code improvements"}');

/***/ }),

/***/ 3663:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,9,0],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,8,0],"firmware_revision":"0b7a8449f8dd003fc415262b05102d113247d3de","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.9.0.bin","fingerprint":"1f40d1e68f9d182888b5b60da5209eff047ec68fcc96a5c9b61b0e55dd07d458","changelog":"* Introduce Wipe Code\\n* Introduce passphrase cache"}');

/***/ }),

/***/ 3701:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,1,5],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,1,0],"firmware_revision":"df0963ec48f01f3d07ffca556e21ff0070cab099","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.1.5-bitcoinonly.bin","fingerprint":"9de90d9f8ca12506f3b9a4cbe7616294144d965d67daa3a03bfe6c0b74a44843","changelog":"* Fix UI for Shamir with 33 words"}');

/***/ }),

/***/ 3724:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,9,3],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,8,0],"firmware_revision":"0d5f00668fb3d1c093ff3c879311a91d3a7175c8","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.9.3-bitcoinonly.bin","fingerprint":"76f899d60ffd9685713cb420d017565c05c43aadaf0e62b645a50a8db69afef6","changelog":"* Improves the Passphrase feature by showing the entered passphrase on the Trezor screen before opening the wallet.\\n* Fixes smaller issues in the user interface."}');

/***/ }),

/***/ 3789:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,11,1],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,10,0],"firmware_revision":"85a26d2c9593bcdf858c2d718d79951ca927a0c3","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.11.1.bin","fingerprint":"f7c60d0b8c2853afd576867c6562aba5ea52bdc2ce34d0dbb8751f52867c3665","changelog":"* Support Electrum signatures in VerifyMessage.\\n* Trezor will refuse to sign UTXOs that do not match the provided derivation path (e.g., transactions belonging to a different wallet, or synthetic transaction inputs).\\n* Zcash v5 transaction format."}');

/***/ }),

/***/ 3794:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,0,7],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,5],"bootloader_version":[2,0,0],"firmware_revision":"5c621800110a791c84865b6b381908e8c2f15283","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.0.7.bin","fingerprint":"f3a42e640e526fba6574fafa520fc7d97ef9f557d24da24d9a2ea4176a4c4164","changelog":"* Bitcoin Cash cashaddr support\\n* Zcash Overwinter hardfork support\\n* NEM support\\n* Lisk support\\n* Show warning on home screen if PIN is not set\\n* Support for new coins:\\n  - Bitcoin Private, Fujicoin, Vertcoin, Viacoin, Zcoin\\n* Support for new Ethereum networks:\\n  - EOS Classic, Ethereum Social, Ellaism, Callisto, EtherGem, Wanchain\\n* Support for 500+ new Ethereum tokens"}');

/***/ }),

/***/ 3826:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,9],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,6],"min_firmware_version":[2,7,2],"bootloader_version":[2,1,10],"firmware_revision":"fad9682201cf9289bba2adb66e6e07ed1cf78936","translations":{"cs-CZ":"firmware/translations/t3t1/translation-T3T1-cs-CZ-2.8.9.bin","de-DE":"firmware/translations/t3t1/translation-T3T1-de-DE-2.8.9.bin","es-ES":"firmware/translations/t3t1/translation-T3T1-es-ES-2.8.9.bin","fr-FR":"firmware/translations/t3t1/translation-T3T1-fr-FR-2.8.9.bin","it-IT":"firmware/translations/t3t1/translation-T3T1-it-IT-2.8.9.bin","pt-BR":"firmware/translations/t3t1/translation-T3T1-pt-BR-2.8.9.bin"},"url":"firmware/t3t1/trezor-t3t1-2.8.9.bin","fingerprint":"3a0228ae58bfd65ba341b33a34138d0d70a9a16f5d2db387f9ee2659d797dedf","changelog":"* Ability to cancel recovery flow on word count selection screen.\\n* New UI for confirming long messages.\\n* Solana staking confirmation dialogs.\\n* Changed \\"swipe to continue\\" to \\"tap to continue\\". Screens still respond to swipe-up, but the preferred interaction method is now tapping the lower part of the screen."}');

/***/ }),

/***/ 3841:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,3,3],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"0d5f00668fb3d1c093ff3c879311a91d3a7175c8","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.3.3-bitcoinonly.bin","fingerprint":"dda77cd7893a5f413f8fc4b2f44d1d43ed4b26e8ced5e6e578cc6b302c1a2310","changelog":"* Advances the Passphrase feature by showing the entered passphrase on the Trezor screen before opening the wallet.\\n* Introduces a hard limit on transaction fees to prevent accidentally paying extra hefty fees (the limit can be manually disabled).\\n* Fixes smaller issues with the user interface, customization, and more."}');

/***/ }),

/***/ 3960:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,9],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,6],"min_firmware_version":[2,7,2],"bootloader_version":[2,1,10],"firmware_revision":"fad9682201cf9289bba2adb66e6e07ed1cf78936","translations":{"cs-CZ":"firmware/translations/t3t1/translation-T3T1-cs-CZ-2.8.9.bin","de-DE":"firmware/translations/t3t1/translation-T3T1-de-DE-2.8.9.bin","es-ES":"firmware/translations/t3t1/translation-T3T1-es-ES-2.8.9.bin","fr-FR":"firmware/translations/t3t1/translation-T3T1-fr-FR-2.8.9.bin","it-IT":"firmware/translations/t3t1/translation-T3T1-it-IT-2.8.9.bin","pt-BR":"firmware/translations/t3t1/translation-T3T1-pt-BR-2.8.9.bin"},"url":"firmware/t3t1/trezor-t3t1-2.8.9-bitcoinonly.bin","fingerprint":"ac995c394f7a7b3ea4cbd9c04977621d6d2fbef30bba856f707f585f34866ac4","changelog":"* Ability to cancel recovery flow on word count selection screen.\\n* New UI for confirming long messages.\\n* Changed \\"swipe to continue\\" to \\"tap to continue\\". Screens still respond to swipe-up, but the preferred interaction method is now tapping the lower part of the screen."}');

/***/ }),

/***/ 3971:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,1,5],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,1,0],"firmware_revision":"df0963ec48f01f3d07ffca556e21ff0070cab099","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.1.5.bin","fingerprint":"40e4bfaf3c5ec77872c1aaaac085aafcc443f60279ca2bb38d29c669233fdf62","changelog":"* Fix for sluggish U2F authentication when using Shamir\\n* Fix UI for Shamir with 33 words\\n* Fix Wanchain signing"}');

/***/ }),

/***/ 4019:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,5,0],"min_bridge_version":[1,1,5],"min_bootloader_version":[1,0,0],"min_firmware_version":[1,0,0],"firmware_revision":"6b74139b4530a4687b4a317b8b08f4329704efc4","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.5.0.bin","fingerprint":"c4eddafd29b580d8482cda68e61bdcf1740d77520ef3a603758646bbffe957ea","changelog":"* Enable Segwit for Testnet and Litecoin\\n* Enable ERC-20 tokens for Ethereum chains"}');

/***/ }),

/***/ 4129:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,3,1],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"c6b2580cd245ee924507f45e9675f857a3d78768","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.3.1.bin","fingerprint":"37178a5ec24e34f8a0599aebcadaf206af3ebadef2fc596665d617dd3e05a5db","changelog":"* Refactor Bitcoin signing"}');

/***/ }),

/***/ 4151:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,3,3],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"0d5f00668fb3d1c093ff3c879311a91d3a7175c8","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.3.3.bin","fingerprint":"46326222f8afcb82e1cd07867bc3bf8836f4e9d0f367e23b58d1e9bc32cd032e","changelog":"* Advances the Passphrase feature by showing the entered passphrase on the Trezor screen before opening the wallet.\\n* Adds support for Verge (XVG).\\n* Drops support for Metaverse (ETP), GINcoin (GIN), Pesetacoin (PTC), and Zel (ZEL).\\n* Introduces a hard limit on transaction fees to prevent accidentally paying extra hefty fees (the limit can be manually disabled).\\n* Resolves the problems with generating the Crown addresses.\\n* Re-enables spending altcoins from Bitcoin paths (fixing some compatibility issues with Bitcoin Cash wallets).\\n* Fixes smaller issues with the user interface, customization, and more."}');

/***/ }),

/***/ 4266:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,10,1],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,10,0],"firmware_revision":"3204fd682429eed23a82b748c05ae569c7f4481f","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.10.1.bin","fingerprint":"36400becf1cdddec22b8150d56ff59eef76d37fef60dc465a6f82b4858903886","changelog":"* Safety checks setting in T1."}');

/***/ }),

/***/ 4304:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,9],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,1],"min_firmware_version":[2,6,1],"bootloader_version":[2,1,8],"firmware_revision":"fad9682201cf9289bba2adb66e6e07ed1cf78936","translations":{"cs-CZ":"firmware/translations/t2b1/translation-T2B1-cs-CZ-2.8.9.bin","de-DE":"firmware/translations/t2b1/translation-T2B1-de-DE-2.8.9.bin","es-ES":"firmware/translations/t2b1/translation-T2B1-es-ES-2.8.9.bin","fr-FR":"firmware/translations/t2b1/translation-T2B1-fr-FR-2.8.9.bin","it-IT":"firmware/translations/t2b1/translation-T2B1-it-IT-2.8.9.bin","pt-BR":"firmware/translations/t2b1/translation-T2B1-pt-BR-2.8.9.bin"},"url":"firmware/t2b1/trezor-t2b1-2.8.9.bin","fingerprint":"f6e03b48ab163f302bb886da197b6a0e7b390efdc5815b419535c5dee5cac1f7","changelog":"* Ability to cancel recovery on word count selection screen.\\n* New UI for confirming long messages.\\n* Solana staking confirmation dialogs."}');

/***/ }),

/***/ 4704:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,4,1],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"24bb4016388fca4b998285b95dcd408f4ed0bff6","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.4.1.bin","fingerprint":"84bc47bb197b3ae7bfb096f03d4a528ccf6c9ef4dfee0aac4022971e4ec91d68","changelog":"* Security and major perfomance improvements.\\n* Cardano fixes.\\n* Fix red screen on shutdown."}');

/***/ }),

/***/ 4817:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,11,1],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,10,0],"firmware_revision":"85a26d2c9593bcdf858c2d718d79951ca927a0c3","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.11.1-bitcoinonly.bin","fingerprint":"8e17b95b5d302f203de3a8fe27959efd25e3d5140ac9b5e60412f1b3f624995d","changelog":"* Support Electrum signatures in VerifyMessage.\\n* Trezor will refuse to sign UTXOs that do not match the provided derivation path (e.g., transactions belonging to a different wallet, or synthetic transaction inputs)."}');

/***/ }),

/***/ 4835:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,4,2],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"9276b1702361f70e094286e2f89e919d8a230d5c","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.4.2-bitcoinonly.bin","fingerprint":"60fee3c9775d8ccf71099f6f7d277463efd128414cfb9be45656b1a26eeb7301","changelog":"* Memory optimization of BTC signing."}');

/***/ }),

/***/ 4849:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,0,6],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,5],"bootloader_version":[2,0,0],"firmware_revision":"886888b7750402d9a9e12bd990e75c0a8dc6cc86","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.0.6.bin","fingerprint":"4eccabf2fd7e121ed0da657c064a65c5694402497e60ea2ac2dcf1e118db9cc6","changelog":"* Fix layout for Ethereum transactions\\n* Fix public key generation for SSH and GPG\\n* Add special characters to passphrase keyboard"}');

/***/ }),

/***/ 4877:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,9,4],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,8,0],"firmware_revision":"ffa96205fb5e22b43e7b08a3dbc3cdeee0931de3","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.9.4-bitcoinonly.bin","fingerprint":"3f73dfbcfc48f66c8814f6562524d81888230e0acd1c19b52b6e8772c6c67e7f","changelog":"* Replacement transaction signing for replace-by-fee.\\n* Support for Output Descriptors export.\\n* Show Ypub/Zpub correctly for multisig GetAddress.\\n* Show amounts in mBTC, uBTC and sat denominations."}');

/***/ }),

/***/ 4995:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,7,2],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,6,0],"firmware_revision":"0b26c529ec49daf584f322f3ef959c79694c8cf5","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.7.2.bin","fingerprint":"4d5c7ac191dba315b2433af27c187925fb713d06984cc6f566231d809dd8d370","changelog":"* Add support for OMNI layer: OMNI/MAID/USDT\\n* U2F fixes\\n* Don\'t ask for PIN if it has been just set"}');

/***/ }),

/***/ 5032:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,1,8],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"8eb6ce08995514c67d175b7197feeadeccc48ff0","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.1.8.bin","fingerprint":"8a5fa12132651b6e33344fd025d0d90885f5cc1c342427ebcea4f0ae98b50d8c","changelog":"* Support Tezos 005-BABYLON hardfork\\n* Show XPUBs in GetAddress for multisig\\n* Security improvements"}');

/***/ }),

/***/ 5120:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,6,3],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,4],"firmware_revision":"2c7cc6e0255dee2339b445b5551eaffb88dbd1b4","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.6.3.bin","fingerprint":"9ff0874f2ce3579a7502747578cef65c824097d906e7150b0142f6b9aa395a43","changelog":"* QR Code for Extended Public Keys (XPUBs). \\n* Adjusted buttons for multipage content scrolling, providing a more intuitive and user-friendly experience. \\n* The new bootloader version 2.1.4 is now included for enhanced system performance and security."}');

/***/ }),

/***/ 5160:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,9],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,7],"min_firmware_version":[2,8,3],"bootloader_version":[2,1,8],"firmware_revision":"fad9682201cf9289bba2adb66e6e07ed1cf78936","translations":{"cs-CZ":"firmware/translations/t3b1/translation-T3B1-cs-CZ-2.8.9.bin","de-DE":"firmware/translations/t3b1/translation-T3B1-de-DE-2.8.9.bin","es-ES":"firmware/translations/t3b1/translation-T3B1-es-ES-2.8.9.bin","fr-FR":"firmware/translations/t3b1/translation-T3B1-fr-FR-2.8.9.bin","it-IT":"firmware/translations/t3b1/translation-T3B1-it-IT-2.8.9.bin","pt-BR":"firmware/translations/t3b1/translation-T3B1-pt-BR-2.8.9.bin"},"url":"firmware/t3b1/trezor-t3b1-2.8.9-bitcoinonly.bin","fingerprint":"d3905f15221f7b2733e5496986ceb1a3b39f390c4439e2d3cc89d5f3b7423278","changelog":"* Ability to cancel recovery on word count selection screen.\\n* New UI for confirming long messages."}');

/***/ }),

/***/ 5223:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,6,4],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,1],"min_firmware_version":[2,6,1],"bootloader_version":[2,1,4],"firmware_revision":"42e9ed0e09033d474dee1a560fe5870646fa440e","translations":{},"url":"firmware/t2b1/trezor-t2b1-2.6.4-bitcoinonly.bin","fingerprint":"013d595fc621c12324afd90721c6a37d055d853f6af54d5432e27e6a425656dd","changelog":"* Resolved an issue related to the invalid encoding of signatures from the Optiga chip."}');

/***/ }),

/***/ 5328:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,1],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,6],"min_firmware_version":[2,7,2],"bootloader_version":[2,1,6],"firmware_revision":"632b9561559b7ab6824bb7eeac072874e07b7b82","translations":{"cs-CZ":"firmware/translations/t3t1/translation-T3T1-cs-CZ-2.8.1.bin","de-DE":"firmware/translations/t3t1/translation-T3T1-de-DE-2.8.1.bin","es-ES":"firmware/translations/t3t1/translation-T3T1-es-ES-2.8.1.bin","fr-FR":"firmware/translations/t3t1/translation-T3T1-fr-FR-2.8.1.bin"},"url":"firmware/t3t1/trezor-t3t1-2.8.1-bitcoinonly.bin","fingerprint":"6b17de0c89c9a7876687d6b9c44673f4aca7f8819237a755090848a3829bc36b","changelog":"* Added PIN keyboard animation.\\n* Added menu entry animation.\\n* Added screen brightness settings.\\n* Screen transitions and animations were improved and are now more smooth.\\n* Improved precision of PIN validation countdown.\\n* Improved instruction screens during multi-share recovery process.\\n* New UI of firmware update.\\n* Improved share words swiping animation during wallet creation.\\n* Fixed title sometimes not fitting into result screen.\\n* Improved touch layer precision.\\n* Fixed “More info” screen during multi-share backup creation.\\n* Fixed title sometimes not fitting into result screen.\\n* Adjusted detection of swipes: vertical swipes are preferred over horizontal swipes now."}');

/***/ }),

/***/ 5356:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,9],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,8],"firmware_revision":"fad9682201cf9289bba2adb66e6e07ed1cf78936","translations":{"cs-CZ":"firmware/translations/t2t1/translation-T2T1-cs-CZ-2.8.9.bin","de-DE":"firmware/translations/t2t1/translation-T2T1-de-DE-2.8.9.bin","es-ES":"firmware/translations/t2t1/translation-T2T1-es-ES-2.8.9.bin","fr-FR":"firmware/translations/t2t1/translation-T2T1-fr-FR-2.8.9.bin","it-IT":"firmware/translations/t2t1/translation-T2T1-it-IT-2.8.9.bin","pt-BR":"firmware/translations/t2t1/translation-T2T1-pt-BR-2.8.9.bin"},"url":"firmware/t2t1/trezor-t2t1-2.8.9.bin","fingerprint":"ec61dba50be195f1cbb78688a0b92fb293c23150b68f5dab3b44420a106fca17","changelog":"* Ability to cancel recovery on word count selection screen.\\n* Account info for ETH transactions.\\n* New UI for confirming long messages.\\n* Solana staking confirmation dialogs."}');

/***/ }),

/***/ 5552:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,1,0],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,5],"bootloader_version":[2,0,3],"firmware_revision":"3f0e3a334e03f49ff819d14cbbec00194c586c27","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.1.0.bin","fingerprint":"bb5b0308807b45d41d1e2ab66a468152997ad69a01099789d8a35e464cde999f","changelog":"* Security improvements\\n* Upgraded to new storage format\\n* Ripple, Stellar, Cardano and NEM fixes\\n* New coins: ATS, AXE, FLO, GIN, KMD, NIX,\\n  PIVX, REOSC, XPM, XSN, ZCL\\n* New ETH tokens"}');

/***/ }),

/***/ 5564:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,3,6],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"b19cbf67c6c7c38513947b703df6d4409c59bc98","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.3.6.bin","fingerprint":"0efa3ba6135caea7693d145d60441eeb46283fe0b8b1fd59a04af33a638ad237","changelog":"* Add compatibility paths for Unchained Capital"}');

/***/ }),

/***/ 5570:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,6,3],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,1],"min_firmware_version":[2,6,1],"bootloader_version":[2,1,4],"firmware_revision":"2c7cc6e0255dee2339b445b5551eaffb88dbd1b4","translations":{},"url":"firmware/t2b1/trezor-t2b1-2.6.3-bitcoinonly.bin","fingerprint":"6aecc9d9fd137a661f38ce36713aa0889b77ec4d35d91c68e01bda225cda2850","changelog":"* QR Code for Extended Public Keys (XPUBs). \\n* The new bootloader version 2.1.4 is now included for enhanced system performance and security. \\n* The screen will now automatically turn off when the device is locked, helping to extend the life of the OLED display and save energy."}');

/***/ }),

/***/ 5653:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,10,4],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,10,0],"firmware_revision":"595b14254c1abb2be3f69e42c7932f1eca8cf1b1","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.10.4.bin","fingerprint":"74dfdfb9addb9d90fedb2c88794b7236af521d21ef0096f9080c25b597c8af86","changelog":"* Support Taproot.\\n* Show address confirmation in SignMessage.\\n* Support for Ethereum EIP-1559 transactions."}');

/***/ }),

/***/ 5763:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,3,6],"min_bridge_version":[1,1,5],"min_bootloader_version":[1,0,0],"min_firmware_version":[1,0,0],"firmware_revision":"36b9d80120348700264bba518a533d4f82d79cbd","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.3.6.bin","fingerprint":"03b559a758961b2bfd4443e6c36c10025268cf033ecd376fdd7a79ff658bf511","changelog":"* Enable advanced transactions such as ones with REPLACE-BY-FEE and CHECKLOCKTIMEVERIFY\\n* Fix message signing for altcoins\\n* Message verification now shows address\\n* Enable GPG signing support\\n* Enable Ed25519 curve (for SSH and GPG)\\n* Use separate deterministic hierarchy for NIST256P1 and Ed25519 curves\\n* Users using SSH already need to regenerate their keys using the new firmware!!!"}');

/***/ }),

/***/ 5814:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,3,6],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"b19cbf67c6c7c38513947b703df6d4409c59bc98","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.3.6-bitcoinonly.bin","fingerprint":"e2cab40bb4c6ae65417b80ad564b905796038a0f5e6d0f50cead257fdd3a9c2d","changelog":"* Add compatibility paths for Unchained Capital"}');

/***/ }),

/***/ 5946:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,1,8],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"8eb6ce08995514c67d175b7197feeadeccc48ff0","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.1.8-bitcoinonly.bin","fingerprint":"ec752e9fa99a29979497e093b32bdb2b592783e2b48c87d8f6f0c18c73cd3022","changelog":"* Show XPUBs in GetAddress for multisig\\n* Security improvements"}');

/***/ }),

/***/ 6059:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,9,2],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,8,0],"firmware_revision":"cde8f31ec2ddcb7d35e36edbcf8a71dda983a9ea","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.9.2-bitcoinonly.bin","fingerprint":"2762c0ff78c96e23d1d348330e0a3cdf45d83c8fc8c2d48853b7cb602ddc19bb","changelog":"* Adds support for multiple change outputs in outgoing transactions."}');

/***/ }),

/***/ 6081:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,6,0],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,0],"firmware_revision":"88e1f8c7a5c7615723664c64b0a25adc0c409dee","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.6.0.bin","fingerprint":"050526db604b9acceef2a5a8561bc99ecbe337909283ebb927b556d8e9b13872","changelog":"* Show source account path in BTC signing. \\n* Address confirmation screen added to EIP712 signing flow. \\n* Ability to reboot the device into bootloader mode directly, without needing to unplug the device. \\n* Support for Ledger Live legacy derivation path \\"m/44\'/coin_type\'/0\'/account\\". \\n* Redesigned UI. \\n* Homescreen now supports full-screen images. \\n* Force basic attestation in FIDO2 for google.com."}');

/***/ }),

/***/ 6545:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,4,0],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"ea3596ad89a7993ad7b9d62798de94325ad1717a","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.4.0-bitcoinonly.bin","fingerprint":"89c91287ab7a9cd3ec246b6822a0d04b7d40401abef706cccafbb7b98bd6a3d7","changelog":"* Locking the device by holding finger on the homescreen.\\n* Support PIN of unlimited length.\\n* Allow decreasing the output value in RBF transactions.\\n* Reduce memory fragmentation.\\n* Improve wording when showing multisig XPUBs."}');

/***/ }),

/***/ 6600:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,10],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,1],"min_firmware_version":[2,6,1],"bootloader_version":[2,1,8],"firmware_revision":"2a65d18200580005dc419b9569ed97fae440806a","translations":{"cs-CZ":"firmware/translations/t2b1/translation-T2B1-cs-CZ-2.8.10.bin","de-DE":"firmware/translations/t2b1/translation-T2B1-de-DE-2.8.10.bin","es-ES":"firmware/translations/t2b1/translation-T2B1-es-ES-2.8.10.bin","fr-FR":"firmware/translations/t2b1/translation-T2B1-fr-FR-2.8.10.bin","it-IT":"firmware/translations/t2b1/translation-T2B1-it-IT-2.8.10.bin","pt-BR":"firmware/translations/t2b1/translation-T2B1-pt-BR-2.8.10.bin"},"url":"firmware/t2b1/trezor-t2b1-2.8.10-bitcoinonly.bin","fingerprint":"5bd50bbcf6435f97b6dc46f96ad11235965cd8a78619c573c3c0aca6822e9ed2","changelog":"* Replaced \\"next page\\" icon with \\"...\\" ellipsis when confirming long message.\\n* Allow firmware upgrade even if language change failed."}');

/***/ }),

/***/ 6614:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,7],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,1],"min_firmware_version":[2,6,1],"bootloader_version":[2,1,8],"firmware_revision":"8a254aa8eae82f99630df63f40e4d290066a3efc","translations":{"cs-CZ":"firmware/translations/t2b1/translation-T2B1-cs-CZ-2.8.7.bin","de-DE":"firmware/translations/t2b1/translation-T2B1-de-DE-2.8.7.bin","es-ES":"firmware/translations/t2b1/translation-T2B1-es-ES-2.8.7.bin","fr-FR":"firmware/translations/t2b1/translation-T2B1-fr-FR-2.8.7.bin","it-IT":"firmware/translations/t2b1/translation-T2B1-it-IT-2.8.7.bin","pt-BR":"firmware/translations/t2b1/translation-T2B1-pt-BR-2.8.7.bin"},"url":"firmware/t2b1/trezor-t2b1-2.8.7.bin","fingerprint":"554c6586df79e1281dd377bfb99d7b2594dbac66d749837c6a78b9c5e0751098","changelog":"* Show last typed PIN number for short period of time.\\n* Multisig-related changes.\\n* Simplify UI of Cardano transactions initiated by Trezor Suite.\\n* Included new version of bootloader (2.1.8).\\n* Fix ETH account number detection.\\n* New EVM call contract flow UI.\\n* Fix translation of the \'Enable labeling\' screen."}');

/***/ }),

/***/ 6622:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,3],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,6],"min_firmware_version":[2,7,2],"bootloader_version":[2,1,8],"firmware_revision":"7f373ae71eca855dd41b4a0fdcc7cadaa13a8281","translations":{"cs-CZ":"firmware/translations/t3t1/translation-T3T1-cs-CZ-2.8.3.bin","de-DE":"firmware/translations/t3t1/translation-T3T1-de-DE-2.8.3.bin","es-ES":"firmware/translations/t3t1/translation-T3T1-es-ES-2.8.3.bin","fr-FR":"firmware/translations/t3t1/translation-T3T1-fr-FR-2.8.3.bin","it-IT":"firmware/translations/t3t1/translation-T3T1-it-IT-2.8.3.bin","pt-BR":"firmware/translations/t3t1/translation-T3T1-pt-BR-2.8.3.bin"},"url":"firmware/t3t1/trezor-t3t1-2.8.3-bitcoinonly.bin","fingerprint":"9eaf99a9420d2a3b9377102eb06b938f5a1886ecb06cccde7fd3cb7a39e1abd7","changelog":"* Added reassuring screen when entering empty passphrase on device.\\n* Fix persistent word when going to previous word during recovery process.\\n* Added missing info about remaining shares in super-shamir recovery."}');

/***/ }),

/***/ 6634:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,10,5],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,10,0],"firmware_revision":"3f12742669bd782cac374a1750d517f4fd88c43b","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.10.5-bitcoinonly.bin","fingerprint":"1d319f643fe2ba5c247b178c7f73b989ab4e43d914a60468566ee7cc5bb9dde0","changelog":"* Small code improvements."}');

/***/ }),

/***/ 6724:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,1],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,6],"firmware_revision":"632b9561559b7ab6824bb7eeac072874e07b7b82","translations":{"cs-CZ":"firmware/translations/t2t1/translation-T2T1-cs-CZ-2.8.1.bin","de-DE":"firmware/translations/t2t1/translation-T2T1-de-DE-2.8.1.bin","es-ES":"firmware/translations/t2t1/translation-T2T1-es-ES-2.8.1.bin","fr-FR":"firmware/translations/t2t1/translation-T2T1-fr-FR-2.8.1.bin","it-IT":"firmware/translations/t2t1/translation-T2T1-it-IT-2.8.1.bin","pt-BR":"firmware/translations/t2t1/translation-T2T1-pt-BR-2.8.1.bin"},"url":"firmware/t2t1/trezor-t2t1-2.8.1.bin","fingerprint":"d3af84a212d32785449ca6575e3cf2a641920b353a82dec9f059083ea5d4b149","changelog":"* Fixed displaying of a progress indicator for the formatting operation.\\n* Improve precision of PIN validation countdown.\\n* Solana: Improved support for AToken Create operation."}');

/***/ }),

/***/ 6746:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,10],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,7],"min_firmware_version":[2,8,3],"bootloader_version":[2,1,10],"firmware_revision":"2a65d18200580005dc419b9569ed97fae440806a","translations":{"cs-CZ":"firmware/translations/t3b1/translation-T3B1-cs-CZ-2.8.10.bin","de-DE":"firmware/translations/t3b1/translation-T3B1-de-DE-2.8.10.bin","es-ES":"firmware/translations/t3b1/translation-T3B1-es-ES-2.8.10.bin","fr-FR":"firmware/translations/t3b1/translation-T3B1-fr-FR-2.8.10.bin","it-IT":"firmware/translations/t3b1/translation-T3B1-it-IT-2.8.10.bin","pt-BR":"firmware/translations/t3b1/translation-T3B1-pt-BR-2.8.10.bin"},"url":"firmware/t3b1/trezor-t3b1-2.8.10.bin","fingerprint":"ad763b0193bf2814bdb9807b51226e1c7639693e912e9334db3f446091943369","changelog":"* Upgrade bundled bootloader to 2.1.10.\\n* Add Nostr support (in debug mode only!).\\n* Solana: rent fee calculation [#4933]\\n* Solana: loadable token definitions [#3541]\\n* Replaced \\"next page\\" icon with \\"...\\" ellipsis when confirming long message.\\n* Fixed Solana staking dialog title.\\n* Updated EIP-1559 fee-related labels.\\n* Allow firmware upgrade even if language change failed.\\n* Solana: fees calculation is now exact [#4965]"}');

/***/ }),

/***/ 6792:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,3],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,6],"min_firmware_version":[2,7,2],"bootloader_version":[2,1,8],"firmware_revision":"7f373ae71eca855dd41b4a0fdcc7cadaa13a8281","translations":{"cs-CZ":"firmware/translations/t3t1/translation-T3T1-cs-CZ-2.8.3.bin","de-DE":"firmware/translations/t3t1/translation-T3T1-de-DE-2.8.3.bin","es-ES":"firmware/translations/t3t1/translation-T3T1-es-ES-2.8.3.bin","fr-FR":"firmware/translations/t3t1/translation-T3T1-fr-FR-2.8.3.bin","it-IT":"firmware/translations/t3t1/translation-T3T1-it-IT-2.8.3.bin","pt-BR":"firmware/translations/t3t1/translation-T3T1-pt-BR-2.8.3.bin"},"url":"firmware/t3t1/trezor-t3t1-2.8.3.bin","fingerprint":"0de51126c17cc0ac623800638dc851c0abd5b787cad5f3aa5843ea2c4cf8248a","changelog":"* Added reassuring screen when entering empty passphrase on device.\\n* Improved ETH send and staking flow.\\n* Redesigned FIDO2 UI.\\n* Renamed MATIC to POL, following a network upgrade.\\n* Fix persistent word when going to previous word during recovery process.\\n* Added missing info about remaining shares in super-shamir recovery."}');

/***/ }),

/***/ 6889:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,9,0],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,8,0],"firmware_revision":"0b7a8449f8dd003fc415262b05102d113247d3de","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.9.0-bitcoinonly.bin","fingerprint":"93a670dd20d044bf76cfce6eecd2a85918acdebe616229dbb31250fd03a33870","changelog":"* Introduce Wipe Code\\n* Introduce passphrase cache"}');

/***/ }),

/***/ 6915:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,13,1],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,12,0],"min_firmware_version":[1,12,0],"bootloader_version":[1,12,1],"firmware_revision":"2a65d18200580005dc419b9569ed97fae440806a","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.13.1-bitcoinonly.bin","fingerprint":"f27095f2e08278a209567e254b9921f6e34b28a9c0fc702a268f210e23057c27","changelog":"*"}');

/***/ }),

/***/ 6980:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,10],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,8],"firmware_revision":"2a65d18200580005dc419b9569ed97fae440806a","translations":{"cs-CZ":"firmware/translations/t2t1/translation-T2T1-cs-CZ-2.8.10.bin","de-DE":"firmware/translations/t2t1/translation-T2T1-de-DE-2.8.10.bin","es-ES":"firmware/translations/t2t1/translation-T2T1-es-ES-2.8.10.bin","fr-FR":"firmware/translations/t2t1/translation-T2T1-fr-FR-2.8.10.bin","it-IT":"firmware/translations/t2t1/translation-T2T1-it-IT-2.8.10.bin","pt-BR":"firmware/translations/t2t1/translation-T2T1-pt-BR-2.8.10.bin"},"url":"firmware/t2t1/trezor-t2t1-2.8.10.bin","fingerprint":"91feae69ada0f98b72f19191f1d1e083b579c26079f7e6fcd751fae0902ec72f","changelog":"* Add Nostr support (in debug mode only!).\\n* Solana: rent fee calculation [#4933]\\n* Solana: loadable token definitions [#3541]\\n* Replaced \\"next page\\" icon with \\"...\\" ellipsis when confirming long message.\\n* Fixed upgrade confirmation text overflow.\\n* Fixed Solana staking dialog fonts.\\n* Updated EIP-1559 fee-related labels.\\n* Allow firmware upgrade even if language change failed.\\n* Solana: fees calculation is now exact [#4965]"}');

/***/ }),

/***/ 7195:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,5,1],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"85a26d2c9593bcdf858c2d718d79951ca927a0c3","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.5.1.bin","fingerprint":"782d4934897018cac779eebb0d7c66e21da7789b9cd35e1f99f097bdfd9b7d33","changelog":"* Support Electrum signatures in VerifyMessage.\\n* Support Cardano Alonzo-era transactions (Plutus).\\n* Bitcoin bech32 addresses QR codes have bigger pixels which are easier to scan.\\n* EIP-1559 transaction correctly show final Hold to Confirm screen.\\n* Trezor will refuse to sign UTXOs that do not match the provided derivation path (e.g., transactions belonging to a different wallet, or synthetic transaction inputs).\\n* Zcash v5 transaction format."}');

/***/ }),

/***/ 7359:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,8,3],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,8,0],"firmware_revision":"df0963ec48f01f3d07ffca556e21ff0070cab099","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.8.3-bitcoinonly.bin","fingerprint":"13d6089cb935f453eaddbfe193e0ab37924a7aa66f684355a4fe5c660c18247a","changelog":"* Small code improvements"}');

/***/ }),

/***/ 7367:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,1,7],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"2cabc8b40ce237ee8a7e1926b6269040519d447a","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.1.7-bitcoinonly.bin","fingerprint":"fd92ac173a2cf93cc07ced3287e07800ed10466dc38c0c7240d9b20c689dd1d1","changelog":"* Super Shamir (with Groups)\\n* Fix low memory issue"}');

/***/ }),

/***/ 7468:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,1,4],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,1,0],"firmware_revision":"6a1a02ca3c595067ed02a78f2d6c36eb58eaa9ed","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.1.4.bin","fingerprint":"820611a92605b1ccc612b9bf8550617aec6962bd2484fcb6ae4792bc498654e4","changelog":"* Shamir Backup with Recovery persistence\\n* Touchscreen freeze fix\\n* Fix display of non-divisible OMNI amounts"}');

/***/ }),

/***/ 7485:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":true,"version":[1,5,2],"min_bridge_version":[1,1,5],"min_bootloader_version":[1,0,0],"min_firmware_version":[1,0,0],"firmware_revision":"e4cc08775fc9c204f295442f930326eb7877f2d4","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.5.2.bin","fingerprint":"99f71379dec893fbe109832a1150f338660be686fe6b4903ff10ff751ba4e448","changelog":"* clean memory on start\\n* fix storage import from older versions"}');

/***/ }),

/***/ 7700:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,4,3],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"595b14254c1abb2be3f69e42c7932f1eca8cf1b1","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.4.3-bitcoinonly.bin","fingerprint":"1744efccabd479526392b281b7e0fc7aa2b4ecb454007dff7ca8c1f8171fad90","changelog":"* Support Taproot.\\n* Show address confirmation in SignMessage."}');

/***/ }),

/***/ 7702:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,5,2],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"0d87b55ba4fed7eecc72bf2a94ee473830b095e9","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.5.2.bin","fingerprint":"659b1b698546fa63f24200e148b6f9a7044df31d11a0a5ec7c044f2dd83f4a27","changelog":"* Add support for Monero HF15 features. \\n* Show the fee rate on the signing confirmation screen. \\n* Support for Cardano Babbage era transaction items \\n* Add \\"Show All\\"/\\"Show Simple\\" choice to Cardano transaction signing \\n* Show thousands separator when displaying large amounts. \\n* Fix Decred transaction weight calculation."}');

/***/ }),

/***/ 7704:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,9,1],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,8,0],"firmware_revision":"c6b2580cd245ee924507f45e9675f857a3d78768","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.9.1.bin","fingerprint":"30cde253c46d4fc705f98634a35d06a494cf2a36824622a9c6a573e07f14292d","changelog":"* Refactor Bitcoin signing"}');

/***/ }),

/***/ 7730:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,7,2],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,6],"min_firmware_version":[2,7,2],"bootloader_version":[2,1,6],"firmware_revision":"da75d8f4b67410b40a9cfd2954d183d81dd6e8e8","translations":{"cs-CZ":"firmware/translations/t3t1/translation-T3T1-cs-CZ-2.7.2.bin","de-DE":"firmware/translations/t3t1/translation-T3T1-de-DE-2.7.2.bin","es-ES":"firmware/translations/t3t1/translation-T3T1-es-ES-2.7.2.bin","fr-FR":"firmware/translations/t3t1/translation-T3T1-fr-FR-2.7.2.bin"},"url":"firmware/t3t1/trezor-t3t1-2.7.2.bin","fingerprint":"4daa5fd3c4c92ee0d76855997dde09a7ee25f4165b118c521ab10957c5fc92b0","changelog":"* Introducing repeated backups. \\n* Multi-share backups can now have any number of shares. \\n* Added support for Cardano Conway certificates [Universal fw only]."}');

/***/ }),

/***/ 7816:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,7],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,7],"min_firmware_version":[2,8,3],"bootloader_version":[2,1,8],"firmware_revision":"8a254aa8eae82f99630df63f40e4d290066a3efc","translations":{"cs-CZ":"firmware/translations/t3b1/translation-T3B1-cs-CZ-2.8.7.bin","de-DE":"firmware/translations/t3b1/translation-T3B1-de-DE-2.8.7.bin","es-ES":"firmware/translations/t3b1/translation-T3B1-es-ES-2.8.7.bin","fr-FR":"firmware/translations/t3b1/translation-T3B1-fr-FR-2.8.7.bin","it-IT":"firmware/translations/t3b1/translation-T3B1-it-IT-2.8.7.bin","pt-BR":"firmware/translations/t3b1/translation-T3B1-pt-BR-2.8.7.bin"},"url":"firmware/t3b1/trezor-t3b1-2.8.7.bin","fingerprint":"1dd5ec22c2609beb6d17a97bf9b4f42a18af1c12db2446d29a945f4ece8727f6","changelog":"* Show last typed PIN number for short period of time.\\n* Multisig-related changes.\\n* Simplify UI of Cardano transactions initiated by Trezor Suite.\\n* Included new version of bootloader (2.1.8).\\n* Fix ETH account number detection.\\n* New EVM call contract flow UI.\\n* Fix translation of the \'Enable labeling\' screen."}');

/***/ }),

/***/ 7892:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,7],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,8],"firmware_revision":"8a254aa8eae82f99630df63f40e4d290066a3efc","translations":{"cs-CZ":"firmware/translations/t2t1/translation-T2T1-cs-CZ-2.8.7.bin","de-DE":"firmware/translations/t2t1/translation-T2T1-de-DE-2.8.7.bin","es-ES":"firmware/translations/t2t1/translation-T2T1-es-ES-2.8.7.bin","fr-FR":"firmware/translations/t2t1/translation-T2T1-fr-FR-2.8.7.bin","it-IT":"firmware/translations/t2t1/translation-T2T1-it-IT-2.8.7.bin","pt-BR":"firmware/translations/t2t1/translation-T2T1-pt-BR-2.8.7.bin"},"url":"firmware/t2t1/trezor-t2t1-2.8.7-bitcoinonly.bin","fingerprint":"7bdf5de0c00c5d15c06d526a5b0d22cfd8343eb3e7aa01ee3c4ed60dd063bbf1","changelog":"* Show last typed PIN number for short period of time.\\n* Multisig-related changes.\\n* Included new version of bootloader (2.1.8).\\n* Fix translation of the \'Enable labeling\' screen."}');

/***/ }),

/***/ 7897:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,10,0],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,10,0],"firmware_revision":"f4424ece1ccb7fc0d6cad00ff840fac287a34f07","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.10.0.bin","fingerprint":"595ba3e8e887cba185e03098f9538e18164f72f9fc82445e691abcd03e5cf0a4","changelog":"* Bootloader 1.10.0.\\n* Allow decreasing the output value in RBF transactions.\\n* Support long PIN of up to 50 digits.\\n* Display nLockTime in human-readable form."}');

/***/ }),

/***/ 7900:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,6,3],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,1],"min_firmware_version":[2,6,1],"bootloader_version":[2,1,4],"firmware_revision":"2c7cc6e0255dee2339b445b5551eaffb88dbd1b4","translations":{},"url":"firmware/t2b1/trezor-t2b1-2.6.3.bin","fingerprint":"1aea81cf4a823951540a041ae52d1950efade73531f7640c85805f8950f11a38","changelog":"* QR Code for Extended Public Keys (XPUBs). \\n* The new bootloader version 2.1.4 is now included for enhanced system performance and security. \\n* The screen will now automatically turn off when the device is locked, helping to extend the life of the OLED display and save energy."}');

/***/ }),

/***/ 7912:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,3,4],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"50854b9210f7674262c1541272a8c7fd1767b7a9","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.3.4-bitcoinonly.bin","fingerprint":"085acbba98163284ef86dea637f9442b924e80fea245f5ebb60d5aab3be2b7b6","changelog":"* Small code improvements."}');

/***/ }),

/***/ 7984:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,10],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,1],"min_firmware_version":[2,6,1],"bootloader_version":[2,1,8],"firmware_revision":"2a65d18200580005dc419b9569ed97fae440806a","translations":{"cs-CZ":"firmware/translations/t2b1/translation-T2B1-cs-CZ-2.8.10.bin","de-DE":"firmware/translations/t2b1/translation-T2B1-de-DE-2.8.10.bin","es-ES":"firmware/translations/t2b1/translation-T2B1-es-ES-2.8.10.bin","fr-FR":"firmware/translations/t2b1/translation-T2B1-fr-FR-2.8.10.bin","it-IT":"firmware/translations/t2b1/translation-T2B1-it-IT-2.8.10.bin","pt-BR":"firmware/translations/t2b1/translation-T2B1-pt-BR-2.8.10.bin"},"url":"firmware/t2b1/trezor-t2b1-2.8.10.bin","fingerprint":"db555520689b1af7c18cb20fc2631fbf07ce4f7dd735c7e64ab279e1ad03a33a","changelog":"* Solana: rent fee calculation [#4933]\\n* Solana: loadable token definitions [#3541]\\n* Replaced \\"next page\\" icon with \\"...\\" ellipsis when confirming long message.\\n* Fixed Solana staking dialog title.\\n* Updated EIP-1559 fee-related labels.\\n* Allow firmware upgrade even if language change failed.\\n* Solana: fees calculation is now exact [#4965]"}');

/***/ }),

/***/ 7988:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,7],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,1],"min_firmware_version":[2,6,1],"bootloader_version":[2,1,8],"firmware_revision":"8a254aa8eae82f99630df63f40e4d290066a3efc","translations":{"cs-CZ":"firmware/translations/t2b1/translation-T2B1-cs-CZ-2.8.7.bin","de-DE":"firmware/translations/t2b1/translation-T2B1-de-DE-2.8.7.bin","es-ES":"firmware/translations/t2b1/translation-T2B1-es-ES-2.8.7.bin","fr-FR":"firmware/translations/t2b1/translation-T2B1-fr-FR-2.8.7.bin","it-IT":"firmware/translations/t2b1/translation-T2B1-it-IT-2.8.7.bin","pt-BR":"firmware/translations/t2b1/translation-T2B1-pt-BR-2.8.7.bin"},"url":"firmware/t2b1/trezor-t2b1-2.8.7-bitcoinonly.bin","fingerprint":"6381f8a373f9f91a3cf4000a762b8dbf553d11a4a6d433c8863b2fa9eecfd9f1","changelog":"* Show last typed PIN number for short period of time.\\n* Multisig-related changes.\\n* Included new version of bootloader (2.1.8).\\n* Fix translation of the \'Enable labeling\' screen."}');

/***/ }),

/***/ 8007:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,6,3],"min_bridge_version":[1,1,5],"min_bootloader_version":[1,0,0],"min_firmware_version":[1,0,0],"bootloader_version":[1,5,1],"firmware_revision":"ef86786ff750351ec454c7bae33b4966cfa862d7","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.6.3.bin","fingerprint":"e8dbb4b7fe8384afd4c99790277c2f2f366a1a0f3957aa3545c75371a99a8fcc","changelog":"* Implement RSKIP-60 Ethereum checksum encoding\\n* Add support for new Ethereum networks (ESN, AKA, ETHO, MUSI, PIRL, ATH, GO)\\n* Add support for new 80 Ethereum tokens\\n* Improve MPU configuration"}');

/***/ }),

/***/ 8025:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,9,2],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,8,0],"firmware_revision":"cde8f31ec2ddcb7d35e36edbcf8a71dda983a9ea","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.9.2.bin","fingerprint":"45b83acd1330ddfd5567edbae5ff8028df1c48a493f01d47cc5499ee0be9b991","changelog":"* Reintroduces the ability to spend pre-Overwinter (2018) funds on Zcash-like coins.\\n* Adds support for multiple change outputs in outgoing transactions.\\n* Adds a security check to prevent potential issues with paths used in altcoin transactions."}');

/***/ }),

/***/ 8036:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,7],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,6],"min_firmware_version":[2,7,2],"bootloader_version":[2,1,9],"firmware_revision":"8a254aa8eae82f99630df63f40e4d290066a3efc","translations":{"cs-CZ":"firmware/translations/t3t1/translation-T3T1-cs-CZ-2.8.7.bin","de-DE":"firmware/translations/t3t1/translation-T3T1-de-DE-2.8.7.bin","es-ES":"firmware/translations/t3t1/translation-T3T1-es-ES-2.8.7.bin","fr-FR":"firmware/translations/t3t1/translation-T3T1-fr-FR-2.8.7.bin","it-IT":"firmware/translations/t3t1/translation-T3T1-it-IT-2.8.7.bin","pt-BR":"firmware/translations/t3t1/translation-T3T1-pt-BR-2.8.7.bin"},"url":"firmware/t3t1/trezor-t3t1-2.8.7.bin","fingerprint":"be15ee1f4b7891dc965512455f8d17067ff54a7047e28ed06cec8d56529ab2ef","changelog":"* Show last typed PIN number for short period of time.\\n* Multisig-related changes.\\n* Simplify UI of Cardano transactions initiated by Trezor Suite.\\n* Included new version of bootloader (2.1.9).\\n* Fix ETH account number detection.\\n* Show account info in ETH send/stake flow.\\n* Fix XPUB confirmed success screen title.\\n* New EVM call contract flow UI.\\n* Fix incorrect navigation in handy menu while signing BTC message.\\n* Fix translation of the \'Enable labeling\' screen."}');

/***/ }),

/***/ 8098:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,7,0],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,1],"min_firmware_version":[2,6,1],"bootloader_version":[2,1,4],"firmware_revision":"45e8a842a31e62a6d43d7f6ccac62a45e1198ef0","translations":{"cs-CZ":"firmware/translations/t2b1/translation-T2B1-cs-CZ-2.7.0.bin","de-DE":"firmware/translations/t2b1/translation-T2B1-de-DE-2.7.0.bin","es-ES":"firmware/translations/t2b1/translation-T2B1-es-ES-2.7.0.bin","fr-FR":"firmware/translations/t2b1/translation-T2B1-fr-FR-2.7.0.bin"},"url":"firmware/t2b1/trezor-t2b1-2.7.0.bin","fingerprint":"522eb5db073c0f039f7164360668e75a43399d0b4e40edfd06f77f4401cd98aa","changelog":"* Add translations capability. \\n* Add loader to homescreen when locking the device. \\n* Allow for going back to previous word in recovery process. \\n* Clear sign ETH staking transactions on Everstake pool. [Universal fw only] \\n* Display descriptors for BTC Taproot public keys. \\n* Multiple Solana instructions improved. [Universal fw only] \\n* Add missing semicolon character to the passphrase entry."}');

/***/ }),

/***/ 8134:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,7,2],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,4],"firmware_revision":"da75d8f4b67410b40a9cfd2954d183d81dd6e8e8","translations":{"cs-CZ":"firmware/translations/t2t1/translation-T2T1-cs-CZ-2.7.2.bin","de-DE":"firmware/translations/t2t1/translation-T2T1-de-DE-2.7.2.bin","es-ES":"firmware/translations/t2t1/translation-T2T1-es-ES-2.7.2.bin","fr-FR":"firmware/translations/t2t1/translation-T2T1-fr-FR-2.7.2.bin"},"url":"firmware/t2t1/trezor-t2t1-2.7.2-bitcoinonly.bin","fingerprint":"cba515383705ec6420c54dd1ffdb33ea7ce4bb04bc6d992c2923880daa53d3e1","changelog":"* Introducing repeated backups. \\n* Multi-share backups can now have any number of shares."}');

/***/ }),

/***/ 8314:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,7],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,6],"min_firmware_version":[2,7,2],"bootloader_version":[2,1,9],"firmware_revision":"8a254aa8eae82f99630df63f40e4d290066a3efc","translations":{"cs-CZ":"firmware/translations/t3t1/translation-T3T1-cs-CZ-2.8.7.bin","de-DE":"firmware/translations/t3t1/translation-T3T1-de-DE-2.8.7.bin","es-ES":"firmware/translations/t3t1/translation-T3T1-es-ES-2.8.7.bin","fr-FR":"firmware/translations/t3t1/translation-T3T1-fr-FR-2.8.7.bin","it-IT":"firmware/translations/t3t1/translation-T3T1-it-IT-2.8.7.bin","pt-BR":"firmware/translations/t3t1/translation-T3T1-pt-BR-2.8.7.bin"},"url":"firmware/t3t1/trezor-t3t1-2.8.7-bitcoinonly.bin","fingerprint":"2f58de2b7c2c29b6a2f14909ad0941e4aa9dd6d3e1416ab66c512a743b5385a9","changelog":"* Show last typed PIN number for short period of time.\\n* Multisig-related changes.\\n* Included new version of bootloader (2.1.9).\\n* Fix XPUB confirmed success screen title.\\n* Fix incorrect navigation in handy menu while signing BTC message.\\n* Fix translation of the \'Enable labeling\' screen."}');

/***/ }),

/***/ 8328:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,1,6],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"629fa58d396e732f230866ebe733d268370d7879","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.1.6-bitcoinonly.bin","fingerprint":"4e7f0f95d71631159b9e873f36a812c93a10eca1fad5f38c78ae7fbe4c1f6ed4","changelog":"* Small code improvements."}');

/***/ }),

/***/ 8352:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":true,"version":[2,0,5],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,5],"bootloader_version":[2,0,0],"firmware_revision":"8852fb54820032f4f287414aa250df981d25445f","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.0.5.bin","fingerprint":"851172eab96c07bf9efb43771cb0fd14dc0320a68de047132c7bd787a1ad64e9","changelog":"* First public release"}');

/***/ }),

/***/ 8453:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,0],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,1],"min_firmware_version":[2,6,1],"bootloader_version":[2,1,4],"firmware_revision":"dd4671a5104952ef505d28d1f9e94d1484b4607a","translations":{"cs-CZ":"firmware/translations/t2b1/translation-T2B1-cs-CZ-2.8.0.bin","de-DE":"firmware/translations/t2b1/translation-T2B1-de-DE-2.8.0.bin","es-ES":"firmware/translations/t2b1/translation-T2B1-es-ES-2.8.0.bin","fr-FR":"firmware/translations/t2b1/translation-T2B1-fr-FR-2.8.0.bin","it-IT":"firmware/translations/t2b1/translation-T2B1-it-IT-2.8.0.bin","pt-BR":"firmware/translations/t2b1/translation-T2B1-pt-BR-2.8.0.bin"},"url":"firmware/t2b1/trezor-t2b1-2.8.0-bitcoinonly.bin","fingerprint":"ae088439d44fc8643b8de28e0d7a8720cd3dbb247619f2742604bbe884542558","changelog":"* Removed CoSi functionality. \\n* Increased Optiga read timeout to avoid spurious RSODs."}');

/***/ }),

/***/ 8483:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,3,1],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"c6b2580cd245ee924507f45e9675f857a3d78768","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.3.1-bitcoinonly.bin","fingerprint":"41795ec196f74c5d6acecc09047a5eacf1dfca47b0aeaa8442a69568efe20ddb","changelog":"* Refactor Bitcoin signing"}');

/***/ }),

/***/ 8492:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,7,3],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,6,1],"firmware_revision":"f641e798f91a15c3b09e8dc6a163195dd56f86d2","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.7.3.bin","fingerprint":"10acc6aa4f24aff36627473b98c23dc4f6d0220d33bc1e09cb572f02410ffdaf","changelog":"* Fix USB issue on some Windows 10 installations"}');

/***/ }),

/***/ 8546:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,3,0],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"0b7a8449f8dd003fc415262b05102d113247d3de","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.3.0.bin","fingerprint":"212929f63fe1393e2ff57e06537a38cff281e3cfb3a4e17235079e2f08871e6c","changelog":"* Introduce Wipe code\\n* Introduce SD card protection\\n* Introduce passphrase cache\\n* U2F UX improvements\\n* Security fixes"}');

/***/ }),

/***/ 8590:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,10,1],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,10,0],"firmware_revision":"3204fd682429eed23a82b748c05ae569c7f4481f","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.10.1-bitcoinonly.bin","fingerprint":"74227362016a8763c4d5f5b06eeb7eabe5fbd7ed05798b586cc7f4bfef50d7fe","changelog":"* Safety checks setting in T1."}');

/***/ }),

/***/ 8622:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,9],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,8],"firmware_revision":"fad9682201cf9289bba2adb66e6e07ed1cf78936","translations":{"cs-CZ":"firmware/translations/t2t1/translation-T2T1-cs-CZ-2.8.9.bin","de-DE":"firmware/translations/t2t1/translation-T2T1-de-DE-2.8.9.bin","es-ES":"firmware/translations/t2t1/translation-T2T1-es-ES-2.8.9.bin","fr-FR":"firmware/translations/t2t1/translation-T2T1-fr-FR-2.8.9.bin","it-IT":"firmware/translations/t2t1/translation-T2T1-it-IT-2.8.9.bin","pt-BR":"firmware/translations/t2t1/translation-T2T1-pt-BR-2.8.9.bin"},"url":"firmware/t2t1/trezor-t2t1-2.8.9-bitcoinonly.bin","fingerprint":"e5878fa067df9d1256cdcd86f10869930d85e090c39f807c23f8845472e8d995","changelog":"* Ability to cancel recovery on word count selection screen.\\n* New UI for confirming long messages."}');

/***/ }),

/***/ 8637:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,8,3],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,8,0],"firmware_revision":"df0963ec48f01f3d07ffca556e21ff0070cab099","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.8.3.bin","fingerprint":"496aecfab867504b2283a9f057a0b2fd9d17970a22c81f6ad74232e7b914ce68","changelog":"* Small code improvements"}');

/***/ }),

/***/ 8654:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,1,6],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"629fa58d396e732f230866ebe733d268370d7879","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.1.6.bin","fingerprint":"e2032ad84108a85d4014d477b955b9181a1a56e6f222ef21bb7d47b503a02f0b","changelog":"* Super Shamir (with Groups)\\n* FIDO2 support with credential management"}');

/***/ }),

/***/ 8724:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,7,2],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,4],"firmware_revision":"da75d8f4b67410b40a9cfd2954d183d81dd6e8e8","translations":{"cs-CZ":"firmware/translations/t2t1/translation-T2T1-cs-CZ-2.7.2.bin","de-DE":"firmware/translations/t2t1/translation-T2T1-de-DE-2.7.2.bin","es-ES":"firmware/translations/t2t1/translation-T2T1-es-ES-2.7.2.bin","fr-FR":"firmware/translations/t2t1/translation-T2T1-fr-FR-2.7.2.bin"},"url":"firmware/t2t1/trezor-t2t1-2.7.2.bin","fingerprint":"d64fcf47a8ead6edf0329583e312136d1548d30990c29cfaa2ce7c67197babcc","changelog":"* Introducing repeated backups. \\n* Multi-share backups can now have any number of shares. \\n* Added support for Cardano Conway certificates [Universal fw only]."}');

/***/ }),

/***/ 8730:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,1],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,6],"min_firmware_version":[2,7,2],"bootloader_version":[2,1,6],"firmware_revision":"632b9561559b7ab6824bb7eeac072874e07b7b82","translations":{"cs-CZ":"firmware/translations/t3t1/translation-T3T1-cs-CZ-2.8.1.bin","de-DE":"firmware/translations/t3t1/translation-T3T1-de-DE-2.8.1.bin","es-ES":"firmware/translations/t3t1/translation-T3T1-es-ES-2.8.1.bin","fr-FR":"firmware/translations/t3t1/translation-T3T1-fr-FR-2.8.1.bin"},"url":"firmware/t3t1/trezor-t3t1-2.8.1.bin","fingerprint":"6a064df4a928e1264d682a34cc014fc9272f312e0f8a8270ff88d6f1408fe68b","changelog":"* Added PIN keyboard animation.\\n* Added menu entry animation.\\n* Added screen brightness settings.\\n* Screen transitions and animations were improved and are now more smooth.\\n* Improved precision of PIN validation countdown.\\n* Improved instruction screens during multi-share recovery process.\\n* New UI of firmware update.\\n* Improved share words swiping animation during wallet creation.\\n* Solana: Improved support for AToken Create operation.\\n* Fixed title sometimes not fitting into result screen.\\n* Improved touch layer precision.\\n* Fixed “More info” screen during multi-share backup creation.\\n* Fixed title sometimes not fitting into result screen.\\n* Adjusted detection of swipes: vertical swipes are preferred over horizontal swipes now."}');

/***/ }),

/***/ 8864:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,7,2],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,6],"min_firmware_version":[2,7,2],"bootloader_version":[2,1,6],"firmware_revision":"da75d8f4b67410b40a9cfd2954d183d81dd6e8e8","translations":{"cs-CZ":"firmware/translations/t3t1/translation-T3T1-cs-CZ-2.7.2.bin","de-DE":"firmware/translations/t3t1/translation-T3T1-de-DE-2.7.2.bin","es-ES":"firmware/translations/t3t1/translation-T3T1-es-ES-2.7.2.bin","fr-FR":"firmware/translations/t3t1/translation-T3T1-fr-FR-2.7.2.bin"},"url":"firmware/t3t1/trezor-t3t1-2.7.2-bitcoinonly.bin","fingerprint":"246cca86b0a8cfcac6b7e6b3fcf55f543a8a9c9fd1f8ff88cd0de00640cb25eb","changelog":"* Introducing repeated backups. \\n* Multi-share backups can now have any number of shares."}');

/***/ }),

/***/ 8872:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,10],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,8],"firmware_revision":"2a65d18200580005dc419b9569ed97fae440806a","translations":{"cs-CZ":"firmware/translations/t2t1/translation-T2T1-cs-CZ-2.8.10.bin","de-DE":"firmware/translations/t2t1/translation-T2T1-de-DE-2.8.10.bin","es-ES":"firmware/translations/t2t1/translation-T2T1-es-ES-2.8.10.bin","fr-FR":"firmware/translations/t2t1/translation-T2T1-fr-FR-2.8.10.bin","it-IT":"firmware/translations/t2t1/translation-T2T1-it-IT-2.8.10.bin","pt-BR":"firmware/translations/t2t1/translation-T2T1-pt-BR-2.8.10.bin"},"url":"firmware/t2t1/trezor-t2t1-2.8.10-bitcoinonly.bin","fingerprint":"c280cfbe83b261ef30c64eb58f55538b3cceee01ba7d8f57d6e8cbf92527066b","changelog":"* Replaced \\"next page\\" icon with \\"...\\" ellipsis when confirming long message.\\n* Fixed upgrade confirmation text overflow.\\n* Allow firmware upgrade even if language change failed."}');

/***/ }),

/***/ 8895:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,10,2],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,10,0],"firmware_revision":"24bb4016388fca4b998285b95dcd408f4ed0bff6","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.10.2.bin","fingerprint":"99707b90a504f7e402f26c3d59cbbdacbc52754cebcce79cc47be528fc889338","changelog":"* Security improvements."}');

/***/ }),

/***/ 8920:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,7,0],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,1],"min_firmware_version":[2,6,1],"bootloader_version":[2,1,4],"firmware_revision":"45e8a842a31e62a6d43d7f6ccac62a45e1198ef0","translations":{"cs-CZ":"firmware/translations/t2b1/translation-T2B1-cs-CZ-2.7.0.bin","de-DE":"firmware/translations/t2b1/translation-T2B1-de-DE-2.7.0.bin","es-ES":"firmware/translations/t2b1/translation-T2B1-es-ES-2.7.0.bin","fr-FR":"firmware/translations/t2b1/translation-T2B1-fr-FR-2.7.0.bin"},"url":"firmware/t2b1/trezor-t2b1-2.7.0-bitcoinonly.bin","fingerprint":"bb91489a4790b3668e2f5d574a729a0f43009510550fecb5e04c0937d355b2cf","changelog":"* Add translations capability. \\n* Add loader to homescreen when locking the device. \\n* Allow for going back to previous word in recovery process. \\n* Display descriptors for BTC Taproot public keys. \\n* Add missing semicolon character to the passphrase entry."}');

/***/ }),

/***/ 8962:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,3,2],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"63ebb8ccb56fc17a72eef91db36a37ff3176519d","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.3.2-bitcoinonly.bin","fingerprint":"389cb54fb6fc75489b788ad669ce51f41d47a67af54b8745a0dfe48da38a777f","changelog":"* Introduces \'Autolock\' feature, which automatically locks the device to enforce the PIN entry after a certain period.\\n* Fixes compatibility issues with Casa and GreenAddress.\\n* Adds support for multiple change outputs in outgoing transactions.\\n* Improves some interface elements."}');

/***/ }),

/***/ 8996:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,3,0],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"0b7a8449f8dd003fc415262b05102d113247d3de","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.3.0-bitcoinonly.bin","fingerprint":"bddc0fd3b52fd32d94b776048f62b3d03dcb6ab90140e482a042a2863093115f","changelog":"* Introduce Wipe code\\n* Introduce SD card protection\\n* Introduce passphrase cache\\n* Security fixes"}');

/***/ }),

/***/ 9034:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,7],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,8],"firmware_revision":"8a254aa8eae82f99630df63f40e4d290066a3efc","translations":{"cs-CZ":"firmware/translations/t2t1/translation-T2T1-cs-CZ-2.8.7.bin","de-DE":"firmware/translations/t2t1/translation-T2T1-de-DE-2.8.7.bin","es-ES":"firmware/translations/t2t1/translation-T2T1-es-ES-2.8.7.bin","fr-FR":"firmware/translations/t2t1/translation-T2T1-fr-FR-2.8.7.bin","it-IT":"firmware/translations/t2t1/translation-T2T1-it-IT-2.8.7.bin","pt-BR":"firmware/translations/t2t1/translation-T2T1-pt-BR-2.8.7.bin"},"url":"firmware/t2t1/trezor-t2t1-2.8.7.bin","fingerprint":"7f7bae53913c3a339f22adddb16db70b11bcf908af1c7a5986bae09af9d4ab62","changelog":"* Show last typed PIN number for short period of time.\\n* Multisig-related changes.\\n* Simplify UI of Cardano transactions initiated by Trezor Suite.\\n* Included new version of bootloader (2.1.8).\\n* Fix ETH account number detection.\\n* New EVM call contract flow UI.\\n* Fix translation of the \'Enable labeling\' screen."}');

/***/ }),

/***/ 9168:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,7,2],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,1],"min_firmware_version":[2,6,1],"bootloader_version":[2,1,4],"firmware_revision":"da75d8f4b67410b40a9cfd2954d183d81dd6e8e8","translations":{"cs-CZ":"firmware/translations/t2b1/translation-T2B1-cs-CZ-2.7.2.bin","de-DE":"firmware/translations/t2b1/translation-T2B1-de-DE-2.7.2.bin","es-ES":"firmware/translations/t2b1/translation-T2B1-es-ES-2.7.2.bin","fr-FR":"firmware/translations/t2b1/translation-T2B1-fr-FR-2.7.2.bin"},"url":"firmware/t2b1/trezor-t2b1-2.7.2.bin","fingerprint":"d072560f34782faf5537aa08a48c4e24671d4c60e9c291a00bfbf12cbc425666","changelog":"* Introducing repeated backups. \\n* Multi-share backups can now have any number of shares. \\n* Added support for Cardano Conway certificates [Universal fw only]."}');

/***/ }),

/***/ 9302:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"version":1,"timestamp":"2025-09-07T15:05:42.979Z","sequence":1,"releases":{"T1B1":{"bitcoin-only":{"firmware_type":"bitcoin-only","conditions":{"environment":{"min_suite_version":"25.9.0","min_suite_native_version":"25.9.0"},"rollout_probability":100},"releasePath":"firmware/t1b1/bitcoinonly/t1b1-1.13.1-bitcoinonly.json"},"universal":{"firmware_type":"universal","conditions":{"environment":{"min_suite_version":"25.9.0","min_suite_native_version":"25.9.0"},"rollout_probability":100},"releasePath":"firmware/t1b1/universal/t1b1-1.13.1-universal.json"}},"T2B1":{"bitcoin-only":{"firmware_type":"bitcoin-only","conditions":{"environment":{"min_suite_version":"25.9.0","min_suite_native_version":"25.9.0"},"rollout_probability":100},"releasePath":"firmware/t2b1/bitcoinonly/t2b1-2.8.10-bitcoinonly.json"},"universal":{"firmware_type":"universal","conditions":{"environment":{"min_suite_version":"25.9.0","min_suite_native_version":"25.9.0"},"rollout_probability":100},"releasePath":"firmware/t2b1/universal/t2b1-2.8.10-universal.json"}},"T2T1":{"bitcoin-only":{"firmware_type":"bitcoin-only","conditions":{"environment":{"min_suite_version":"25.9.0","min_suite_native_version":"25.9.0"},"rollout_probability":100},"releasePath":"firmware/t2t1/bitcoinonly/t2t1-2.8.10-bitcoinonly.json"},"universal":{"firmware_type":"universal","conditions":{"environment":{"min_suite_version":"25.9.0","min_suite_native_version":"25.9.0"},"rollout_probability":100},"releasePath":"firmware/t2t1/universal/t2t1-2.8.10-universal.json"}},"T3B1":{"bitcoin-only":{"firmware_type":"bitcoin-only","conditions":{"environment":{"min_suite_version":"25.9.0","min_suite_native_version":"25.9.0"},"rollout_probability":100},"releasePath":"firmware/t3b1/bitcoinonly/t3b1-2.8.10-bitcoinonly.json"},"universal":{"firmware_type":"universal","conditions":{"environment":{"min_suite_version":"25.9.0","min_suite_native_version":"25.9.0"},"rollout_probability":100},"releasePath":"firmware/t3b1/universal/t3b1-2.8.10-universal.json"}},"T3T1":{"bitcoin-only":{"firmware_type":"bitcoin-only","conditions":{"environment":{"min_suite_version":"25.9.0","min_suite_native_version":"25.9.0"},"rollout_probability":100},"releasePath":"firmware/t3t1/bitcoinonly/t3t1-2.8.10-bitcoinonly.json"},"universal":{"firmware_type":"universal","conditions":{"environment":{"min_suite_version":"25.9.0","min_suite_native_version":"25.9.0"},"rollout_probability":100},"releasePath":"firmware/t3t1/universal/t3t1-2.8.10-universal.json"}}},"intermediaries":{"T1B1":[{"min_firmware_version":[1,6,2],"min_bootloader_version":[1,8,0],"version":1},{"min_firmware_version":[1,12,0],"min_bootloader_version":[1,12,0],"version":2},{"min_firmware_version":[1,12,1],"min_bootloader_version":[1,12,1],"version":3}]}}');

/***/ }),

/***/ 9336:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,12,1],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,12,0],"min_firmware_version":[1,12,0],"bootloader_version":[1,12,1],"firmware_revision":"1eb0eb9d91b092e571aac63db4ebff2a07fd8a1f","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.12.1.bin","fingerprint":"3c694191f5b66a65cb5bb209adbf113cb40209e644b77162ba996bb7ee8f382b","changelog":"* Fee rate shown when replacing transaction.\\n* Ledger Live legacy derivation path m/44\'/coin_type\'/0\'/account is now supported.\\n* SLIP-0019 proofs of ownership for native SegWit implemented.\\n* SLIP-0025 coinjoin accounts implemented for testing purposes.\\n* Bech32 addresses now not converting to uppercase in QR code to increase compatibility.\\n* Decimals of fee rate extended to 2 digits.\\n* Only \\"sat\\" displayed instead of \\"sat BTC\\".\\n* Bootloader 1.12.1. included.\\n* Stellar addresses now shown in full + as a QR code.\\n* Ethereum fees now wrapped to the next line when needed."}');

/***/ }),

/***/ 9405:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,6,4],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,4],"firmware_revision":"42e9ed0e09033d474dee1a560fe5870646fa440e","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.6.4.bin","fingerprint":"441faa92156e8ae0b8247f9434c3ec8cf6ffd872f16fc593b22c4460dfd93913","changelog":"* Trezor Model T now supports Solana, expanding the range of cryptocurrencies it can securely manage. [Universal fw only] \\n* Ethereum fees are now uniformly presented in Gwei, enhancing clarity and consistency for users. [Universal fw only] \\n* The display of spaced addresses has been refined, offering a more user-friendly and visually optimized experience. \\n* Boot-up logo display has been optimized, contributing to a smoother and more visually appealing device startup."}');

/***/ }),

/***/ 9482:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,9,1],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,8,0],"firmware_revision":"c6b2580cd245ee924507f45e9675f857a3d78768","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.9.1-bitcoinonly.bin","fingerprint":"ee743e3bd1e424ceb45a1d877a5422e7af449706f636c459cdd8bb0d4796cba5","changelog":"* Refactor Bitcoin signing"}');

/***/ }),

/***/ 9502:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,9],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,1,1],"min_firmware_version":[2,6,1],"bootloader_version":[2,1,8],"firmware_revision":"fad9682201cf9289bba2adb66e6e07ed1cf78936","translations":{"cs-CZ":"firmware/translations/t2b1/translation-T2B1-cs-CZ-2.8.9.bin","de-DE":"firmware/translations/t2b1/translation-T2B1-de-DE-2.8.9.bin","es-ES":"firmware/translations/t2b1/translation-T2B1-es-ES-2.8.9.bin","fr-FR":"firmware/translations/t2b1/translation-T2B1-fr-FR-2.8.9.bin","it-IT":"firmware/translations/t2b1/translation-T2B1-it-IT-2.8.9.bin","pt-BR":"firmware/translations/t2b1/translation-T2B1-pt-BR-2.8.9.bin"},"url":"firmware/t2b1/trezor-t2b1-2.8.9-bitcoinonly.bin","fingerprint":"bde9c5ef485548746150e07a9c5081c25f2bdf127707a41f3c487ca83a6c0667","changelog":"* Ability to cancel recovery on word count selection screen.\\n* New UI for confirming long messages."}');

/***/ }),

/***/ 9653:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,5,3],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"2f03ace311584988d5aeab58fd1acf24ef54711a","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.5.3.bin","fingerprint":"4f57dca1abc1a60d82c4fef7c96e86d784fc7a1e5e3da724dd2ae4d14c6350bf","changelog":"* Add SLIP-0025 CoinJoin accounts. \\n* Show red error header when Trezor doesn\'t see USB data connection. \\n* Add support for Zcash unified addresses. \\n* Show fee rate when replacing transaction. \\n* Optimize the signing of BTC transactions. \\n* Support for Cardano CIP-36 governance registration format. \\n* Extend decimals of fee rate to 2 digits. \\n* Display only “sat” instead of “sat BTC”. \\n* Fix sending XMR transaction to an integrated address. \\n* Fix XMR primary address display."}');

/***/ }),

/***/ 9678:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,7,1],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,6,0],"firmware_revision":"83f1906cad648c560cd560577317046606398630","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.7.1.bin","fingerprint":"1c303c50bb45d3f35da9e962d8405d0b8e89cc45e122496a48fce3995fa71d48","changelog":"* Switch from HID to WebUSB\\n* Add support for Stellar\\n* Add support for Lisk\\n* Add support for Zcash Sapling hardfork\\n* Implement seedless setup"}');

/***/ }),

/***/ 9734:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,8,1],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,6],"firmware_revision":"632b9561559b7ab6824bb7eeac072874e07b7b82","translations":{"cs-CZ":"firmware/translations/t2t1/translation-T2T1-cs-CZ-2.8.1.bin","de-DE":"firmware/translations/t2t1/translation-T2T1-de-DE-2.8.1.bin","es-ES":"firmware/translations/t2t1/translation-T2T1-es-ES-2.8.1.bin","fr-FR":"firmware/translations/t2t1/translation-T2T1-fr-FR-2.8.1.bin","it-IT":"firmware/translations/t2t1/translation-T2T1-it-IT-2.8.1.bin","pt-BR":"firmware/translations/t2t1/translation-T2T1-pt-BR-2.8.1.bin"},"url":"firmware/t2t1/trezor-t2t1-2.8.1-bitcoinonly.bin","fingerprint":"38ab127fcf4263a18a3b07593301fdd2c6a1a96360b62c131adb849b5d18fae3","changelog":"* Fixed displaying of a progress indicator for the formatting operation.\\n* Improve precision of PIN validation countdown."}');

/***/ }),

/***/ 9821:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,1,7],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"firmware_revision":"2cabc8b40ce237ee8a7e1926b6269040519d447a","translations":{},"url":"firmware/t2t1/trezor-t2t1-2.1.7.bin","fingerprint":"acf1b4c6fec3624a8fc53f9130ff53d690c3fa1c134bd4ca3e58ee7b5a0441d8","changelog":"* Super Shamir (with Groups)\\n* FIDO2 support with credential management\\n* Fix low memory issue"}');

/***/ }),

/***/ 9928:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[2,7,0],"min_bridge_version":[2,0,7],"min_bootloader_version":[2,0,0],"min_firmware_version":[2,0,8],"bootloader_version":[2,1,4],"firmware_revision":"45e8a842a31e62a6d43d7f6ccac62a45e1198ef0","translations":{"cs-CZ":"firmware/translations/t2t1/translation-T2T1-cs-CZ-2.7.0.bin","de-DE":"firmware/translations/t2t1/translation-T2T1-de-DE-2.7.0.bin","es-ES":"firmware/translations/t2t1/translation-T2T1-es-ES-2.7.0.bin","fr-FR":"firmware/translations/t2t1/translation-T2T1-fr-FR-2.7.0.bin"},"url":"firmware/t2t1/trezor-t2t1-2.7.0-bitcoinonly.bin","fingerprint":"c94f07150a6f0bb2862d4c31c6059862aab14f0073dea581118eef51a983bc30","changelog":"* Add translations capability. \\n* Allow for going back to previous word in recovery process. \\n* Display descriptors for BTC Taproot public keys. \\n* Fixed blank display delay on startup when display orientation is set to other than north."}');

/***/ }),

/***/ 9948:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"required":false,"version":[1,8,0],"min_bridge_version":[2,0,25],"min_bootloader_version":[1,5,0],"min_firmware_version":[1,6,2],"bootloader_version":[1,8,0],"firmware_revision":"964a622bb512aa85cfcc3e451fc70729cc15bb4f","translations":{},"url":"firmware/t1b1/trezor-t1b1-1.8.0.bin","fingerprint":"d65f0c07a6a9c53d8b5287798eb53154b33f9e87cd38a3701970e3d0a750a659","changelog":"* Security improvements\\n* Upgraded to new storage format\\n* Stellar and NEM fixes\\n* New coins: ATS, KMD, XPM, XSN, ZCL\\n* New ETH tokens"}');

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

// UNUSED EXPORTS: BLOCKCHAIN, BLOCKCHAIN_EVENT, Bip32, BitcoinNetworkInfo, BlockchainLink, Bundle, CARDANO, CORE_EVENT, CardanoAddressParameters, CardanoAssetGroup, CardanoAuxiliaryData, CardanoAuxiliaryDataSupplement, CardanoCVoteRegistrationDelegation, CardanoCVoteRegistrationParameters, CardanoCertificate, CardanoCertificatePointer, CardanoCollateralInput, CardanoDRep, CardanoGetAddress, CardanoGetNativeScriptHash, CardanoGetPublicKey, CardanoInput, CardanoMessageHeaders, CardanoMessageProtectedHeaders, CardanoMessageUnprotectedHeaders, CardanoMint, CardanoNativeScript, CardanoNativeScriptHash, CardanoOutput, CardanoPoolMargin, CardanoPoolMetadata, CardanoPoolOwner, CardanoPoolParameters, CardanoPoolRelay, CardanoReferenceInput, CardanoRequiredSigner, CardanoSignMessage, CardanoSignTransaction, CardanoSignTransactionExtended, CardanoSignedMessage, CardanoSignedTxData, CardanoSignedTxWitness, CardanoToken, CardanoWithdrawal, CoinInfo, CoinObj, CoinSupport, DEFAULT_SORTING_STRATEGY, DEVICE, DEVICE_EVENT, DerivationPath, DeviceUniquePath, ERRORS, EosAuthorization, EosPublicKey, EosSDKTransaction, EosSignTransaction, EosTxAction, EosTxActionCommon, EosTxHeader, EthereumAccessList, EthereumNetworkInfo, EthereumNetworkInfoDefinitionValues, EthereumSignMessage, EthereumSignTransaction, EthereumSignTypedData, EthereumSignTypedDataMessage, EthereumSignTypedDataTypes, EthereumSignTypedHash, EthereumSignedTx, EthereumTransaction, EthereumTransactionEIP1559, EthereumVerifyMessage, FIRMWARE, FeeInfo, FeeLevel, FirmwareType, GetAddress, GetPublicKey, IFRAME, MiscNetworkInfo, NEM, NETWORK, Network, POPUP, PROTO, PublicKey, RESPONSE_EVENT, RipplePayment, RippleSignTransaction, RippleSignedTx, RippleTransaction, SelectFeeLevel, SignMessage, SolanaComposeTransaction, SolanaComposedTransaction, SolanaProgramName, SolanaPublicKey, SolanaSignTransaction, SolanaSignedTransaction, SolanaTxAdditionalInfo, SolanaTxTokenAccountInfo, StellarAccountMergeOperation, StellarAllowTrustOperation, StellarAsset, StellarBumpSequenceOperation, StellarChangeTrustOperation, StellarClaimClaimableBalanceOperation, StellarCreateAccountOperation, StellarInflationOperation, StellarManageBuyOfferOperation, StellarManageDataOperation, StellarManageSellOfferOperation, StellarOperation, StellarOperationMessage, StellarPassiveSellOfferOperation, StellarPathPaymentStrictReceiveOperation, StellarPathPaymentStrictSendOperation, StellarPaymentOperation, StellarSetOptionsOperation, StellarSignTransaction, StellarSignedTx, StellarTransaction, TRANSPORT, TRANSPORT_EVENT, TezosDelegationOperation, TezosManagerTransfer, TezosOperation, TezosOriginationOperation, TezosParametersManager, TezosRevealOperation, TezosSignTransaction, TezosTransactionOperation, UI, UI_EVENT, UI_REQUEST, UI_RESPONSE, VerifyMessage, WEBEXTENSION, createBlockchainMessage, createDeviceMessage, createErrorMessage, createIFrameMessage, createPopupMessage, createResponseMessage, createTransportMessage, createUiMessage, createUiResponse, parseConnectSettings, parseMessage

;// ../connect/src/events/ui-request.ts
/*
 * messages to UI emitted as UI_EVENT
 */

const ui_request_UI_EVENT = 'UI_EVENT';
const UI_REQUEST = {
  TRANSPORT: 'ui-no_transport',
  BOOTLOADER: 'ui-device_bootloader_mode',
  NOT_IN_BOOTLOADER: 'ui-device_not_in_bootloader_mode',
  REQUIRE_MODE: 'ui-device_require_mode',
  INITIALIZE: 'ui-device_not_initialized',
  SEEDLESS: 'ui-device_seedless',
  FIRMWARE_OLD: 'ui-device_firmware_old',
  FIRMWARE_OUTDATED: 'ui-device_firmware_outdated',
  FIRMWARE_NOT_SUPPORTED: 'ui-device_firmware_unsupported',
  FIRMWARE_NOT_COMPATIBLE: 'ui-device_firmware_not_compatible',
  FIRMWARE_NOT_INSTALLED: 'ui-device_firmware_not_installed',
  FIRMWARE_PROGRESS: 'ui-firmware-progress',
  FIRMWARE_PROGRESS_UNEXPECTED_DELAY: 'ui-firmware-progress-unexpected-delay',
  /** connect is waiting for device to be automatically reconnected */
  FIRMWARE_RECONNECT: 'ui-firmware_reconnect',
  FIRMWARE_DISCONNECT: 'ui-firmware_disconnect',
  FIRMWARE_DOWNLOADED: 'ui-firmware_downloaded',
  DEVICE_NEEDS_BACKUP: 'ui-device_needs_backup',
  REQUEST_UI_WINDOW: 'ui-request_window',
  CLOSE_UI_WINDOW: 'ui-close_window',
  REQUEST_PERMISSION: 'ui-request_permission',
  REQUEST_CONFIRMATION: 'ui-request_confirmation',
  REQUEST_PIN: 'ui-request_pin',
  INVALID_PIN: 'ui-invalid_pin',
  INVALID_PIN_ATTEMPTS_DEPLETED: 'ui-invalid_pin_attempts_depleted',
  REQUEST_PASSPHRASE: 'ui-request_passphrase',
  REQUEST_PASSPHRASE_ON_DEVICE: 'ui-request_passphrase_on_device',
  INVALID_PASSPHRASE: 'ui-invalid_passphrase',
  REQUEST_THP_PAIRING: 'ui-request_thp_pairing',
  CONNECT: 'ui-connect',
  LOADING: 'ui-loading',
  SET_OPERATION: 'ui-set_operation',
  SELECT_DEVICE: 'ui-select_device',
  SELECT_ACCOUNT: 'ui-select_account',
  SELECT_FEE: 'ui-select_fee',
  UPDATE_CUSTOM_FEE: 'ui-update_custom_fee',
  INSUFFICIENT_FUNDS: 'ui-insufficient_funds',
  REQUEST_BUTTON: 'ui-button',
  REQUEST_WORD: 'ui-request_word',
  LOGIN_CHALLENGE_REQUEST: 'ui-login_challenge_request',
  BUNDLE_PROGRESS: 'ui-bundle_progress',
  ADDRESS_VALIDATION: 'ui-address_validation',
  IFRAME_FAILURE: 'ui-iframe_failure'
};

// ButtonRequest_FirmwareUpdate is a artificial button request thrown by "uploadFirmware" method
// at the beginning of the uploading process

// todo: not used at the moment

/**
 * Prompt user to reconnect device during firmware installation.
 */

const createUiMessage = (type, payload) => ({
  event: ui_request_UI_EVENT,
  type,
  payload
});
;// ../connect/src/events/ui-response.ts

/*
 * messages from UI sent by popup or using .uiResponse method
 */

const UI_RESPONSE = {
  RECEIVE_PERMISSION: 'ui-receive_permission',
  RECEIVE_CONFIRMATION: 'ui-receive_confirmation',
  RECEIVE_FIRMWARE: 'ui-receive_firmware',
  RECEIVE_PIN: 'ui-receive_pin',
  RECEIVE_PASSPHRASE: 'ui-receive_passphrase',
  RECEIVE_THP_PAIRING_TAG: 'ui-receive_thp_pairing_tag',
  RECEIVE_DEVICE: 'ui-receive_device',
  RECEIVE_ACCOUNT: 'ui-receive_account',
  RECEIVE_FEE: 'ui-receive_fee',
  RECEIVE_WORD: 'ui-receive_word',
  INVALID_PASSPHRASE_ACTION: 'ui-invalid_passphrase_action',
  CHANGE_SETTINGS: 'ui-change_settings',
  LOGIN_CHALLENGE_RESPONSE: 'ui-login_challenge_response'
};
const createUiResponse = (type, payload) => ({
  event: UI_EVENT,
  type,
  payload
});
;// ../connect/src/events/index.ts














// NOTE: for backward compatibility wrap ui const into one
const UI = {
  ...UI_REQUEST,
  ...UI_RESPONSE
};
;// ../connect/src/factory.ts

const factory = ({
  eventEmitter,
  manifest,
  init,
  call,
  setTransports,
  requestLogin,
  uiResponse,
  cancel,
  dispose
}, extraMethods = {}) => ({
  manifest,
  init,
  setTransports,
  on: (type, fn) => {
    eventEmitter.on(type, fn);
  },
  off: (type, fn) => {
    eventEmitter.removeListener(type, fn);
  },
  removeAllListeners: type => {
    if (typeof type === 'string') {
      eventEmitter.removeAllListeners(type);
    } else {
      eventEmitter.removeAllListeners();
    }
  },
  uiResponse,
  // methods

  bleUnpair: params => call({
    ...params,
    method: 'bleUnpair'
  }),
  blockchainGetAccountBalanceHistory: params => call({
    ...params,
    method: 'blockchainGetAccountBalanceHistory'
  }),
  blockchainGetCurrentFiatRates: params => call({
    ...params,
    method: 'blockchainGetCurrentFiatRates'
  }),
  blockchainGetFiatRatesForTimestamps: params => call({
    ...params,
    method: 'blockchainGetFiatRatesForTimestamps'
  }),
  blockchainGetInfo: params => call({
    ...params,
    method: 'blockchainGetInfo'
  }),
  blockchainEvmRpcCall: params => call({
    ...params,
    method: 'blockchainEvmRpcCall'
  }),
  blockchainDisconnect: params => call({
    ...params,
    method: 'blockchainDisconnect'
  }),
  blockchainEstimateFee: params => call({
    ...params,
    method: 'blockchainEstimateFee'
  }),
  blockchainGetTransactions: params => call({
    ...params,
    method: 'blockchainGetTransactions'
  }),
  blockchainSetCustomBackend: params => call({
    ...params,
    method: 'blockchainSetCustomBackend'
  }),
  blockchainSubscribe: params => call({
    ...params,
    method: 'blockchainSubscribe'
  }),
  blockchainSubscribeFiatRates: params => call({
    ...params,
    method: 'blockchainSubscribeFiatRates'
  }),
  blockchainUnsubscribe: params => call({
    ...params,
    method: 'blockchainUnsubscribe'
  }),
  blockchainUnsubscribeFiatRates: params => call({
    ...params,
    method: 'blockchainUnsubscribeFiatRates'
  }),
  requestLogin: params => requestLogin(params),
  cardanoGetAddress: params => call({
    ...params,
    method: 'cardanoGetAddress',
    useEventListener: eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0
  }),
  cardanoGetNativeScriptHash: params => call({
    ...params,
    method: 'cardanoGetNativeScriptHash'
  }),
  cardanoGetPublicKey: params => call({
    ...params,
    method: 'cardanoGetPublicKey'
  }),
  cardanoSignTransaction: params => call({
    ...params,
    method: 'cardanoSignTransaction'
  }),
  cardanoSignMessage: params => call({
    ...params,
    method: 'cardanoSignMessage'
  }),
  cardanoComposeTransaction: params => call({
    ...params,
    method: 'cardanoComposeTransaction'
  }),
  cipherKeyValue: params => call({
    ...params,
    method: 'cipherKeyValue'
  }),
  evoluGetNode: params => call({
    ...params,
    method: 'evoluGetNode'
  }),
  composeTransaction: params => call({
    ...params,
    method: 'composeTransaction'
  }),
  discoverAccounts: params => call({
    ...params,
    method: 'discoverAccounts'
  }),
  ethereumGetAddress: params => call({
    ...params,
    method: 'ethereumGetAddress',
    useEventListener: eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0
  }),
  ethereumGetPublicKey: params => call({
    ...params,
    method: 'ethereumGetPublicKey'
  }),
  ethereumSignMessage: params => call({
    ...params,
    method: 'ethereumSignMessage'
  }),
  ethereumSignTransaction: params => call({
    ...params,
    method: 'ethereumSignTransaction'
  }),
  // @ts-expect-error generic param
  ethereumSignTypedData: params => call({
    ...params,
    method: 'ethereumSignTypedData'
  }),
  ethereumVerifyMessage: params => call({
    ...params,
    method: 'ethereumVerifyMessage'
  }),
  getAccountDescriptor: params => call({
    ...params,
    method: 'getAccountDescriptor'
  }),
  getAccountInfo: params => call({
    ...params,
    method: 'getAccountInfo'
  }),
  getAddress: params => call({
    ...params,
    method: 'getAddress',
    useEventListener: eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0
  }),
  getDeviceState: params => call({
    ...params,
    method: 'getDeviceState'
  }),
  getFeatures: params => call({
    ...params,
    method: 'getFeatures'
  }),
  getFirmwareHash: params => call({
    ...params,
    method: 'getFirmwareHash'
  }),
  getOwnershipId: params => call({
    ...params,
    method: 'getOwnershipId'
  }),
  getOwnershipProof: params => call({
    ...params,
    method: 'getOwnershipProof'
  }),
  getPublicKey: params => call({
    ...params,
    method: 'getPublicKey'
  }),
  getNonce: params => call({
    ...params,
    method: 'getNonce'
  }),
  nemGetAddress: params => call({
    ...params,
    method: 'nemGetAddress',
    useEventListener: eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0
  }),
  nemSignTransaction: params => call({
    ...params,
    method: 'nemSignTransaction'
  }),
  pushTransaction: params => call({
    ...params,
    method: 'pushTransaction'
  }),
  rippleGetAddress: params => call({
    ...params,
    method: 'rippleGetAddress',
    useEventListener: eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0
  }),
  rippleSignTransaction: params => call({
    ...params,
    method: 'rippleSignTransaction'
  }),
  signMessage: params => call({
    ...params,
    method: 'signMessage'
  }),
  signTransaction: params => call({
    ...params,
    method: 'signTransaction'
  }),
  solanaComposeTransaction: params => call({
    ...params,
    method: 'solanaComposeTransaction'
  }),
  solanaGetPublicKey: params => call({
    ...params,
    method: 'solanaGetPublicKey'
  }),
  solanaGetAddress: params => call({
    ...params,
    method: 'solanaGetAddress'
  }),
  solanaSignTransaction: params => call({
    ...params,
    method: 'solanaSignTransaction'
  }),
  stellarGetAddress: params => call({
    ...params,
    method: 'stellarGetAddress',
    useEventListener: eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0
  }),
  stellarSignTransaction: params => call({
    ...params,
    method: 'stellarSignTransaction'
  }),
  tezosGetAddress: params => call({
    ...params,
    method: 'tezosGetAddress',
    useEventListener: eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0
  }),
  tezosGetPublicKey: params => call({
    ...params,
    method: 'tezosGetPublicKey'
  }),
  tezosSignTransaction: params => call({
    ...params,
    method: 'tezosSignTransaction'
  }),
  unlockPath: params => call({
    ...params,
    method: 'unlockPath'
  }),
  eosGetPublicKey: params => call({
    ...params,
    method: 'eosGetPublicKey'
  }),
  eosSignTransaction: params => call({
    ...params,
    method: 'eosSignTransaction'
  }),
  verifyMessage: params => call({
    ...params,
    method: 'verifyMessage'
  }),
  resetDevice: params => call({
    ...params,
    method: 'resetDevice'
  }),
  loadDevice: params => call({
    ...params,
    method: 'loadDevice'
  }),
  wipeDevice: params => call({
    ...params,
    method: 'wipeDevice'
  }),
  applyFlags: params => call({
    ...params,
    method: 'applyFlags'
  }),
  applySettings: params => call({
    ...params,
    method: 'applySettings'
  }),
  getSettings: () => call({
    method: 'getSettings'
  }),
  authenticateDevice: params => call({
    ...params,
    method: 'authenticateDevice'
  }),
  authorizeCoinjoin: params => call({
    ...params,
    method: 'authorizeCoinjoin'
  }),
  cancelCoinjoinAuthorization: params => call({
    ...params,
    method: 'cancelCoinjoinAuthorization'
  }),
  showDeviceTutorial: params => call({
    ...params,
    method: 'showDeviceTutorial'
  }),
  backupDevice: params => call({
    ...params,
    method: 'backupDevice'
  }),
  changeLanguage: params => call({
    ...params,
    method: 'changeLanguage'
  }),
  changePin: params => call({
    ...params,
    method: 'changePin'
  }),
  changeWipeCode: params => call({
    ...params,
    method: 'changeWipeCode'
  }),
  firmwareUpdate: params => call({
    ...params,
    method: 'firmwareUpdate'
  }),
  recoveryDevice: params => call({
    ...params,
    method: 'recoveryDevice'
  }),
  getCoinInfo: params => call({
    ...params,
    method: 'getCoinInfo'
  }),
  setBrightness: params => call({
    ...params,
    method: 'setBrightness'
  }),
  setBusy: params => call({
    ...params,
    method: 'setBusy'
  }),
  setProxy: params => call({
    ...params,
    method: 'setProxy'
  }),
  thpGetCredentials: params => call({
    ...params,
    method: 'thpGetCredentials'
  }),
  thpRemoveCredentials: params => call({
    ...params,
    method: 'thpRemoveCredentials'
  }),
  dispose,
  cancel,
  ...extraMethods
});
;// ../utils/src/getMutex.ts
/**
 * Ensures that since the awaited lock is obtained until unlock return from it
 * is called, no other part of code can enter the same lock.
 *
 * Optionally, it also takes `lockId` param, in which case only actions with
 * the same lock id are blocking each other.
 *
 * Example:
 *
 * ```
 * const lock = getMutex();
 *
 * lock().then(unlock => writeToSocket('foo').finally(unlock));
 * lock().then(unlock => writeToSocket('bar').finally(unlock));
 * lock('differentLockId').then(unlock => writeToAnotherSocket('baz').finally(unlock));
 *
 * const unlock = await lock();
 * await readFromSocket();
 * unlock();
 * ```
 */
const getMutex = () => {
  const DEFAULT_ID = Symbol();
  const locks = {};
  return async (lockId = DEFAULT_ID) => {
    while (locks[lockId]) {
      await locks[lockId];
    }
    let resolve = () => {};
    locks[lockId] = new Promise(res => {
      resolve = res;
    }).finally(() => {
      delete locks[lockId];
    });
    return resolve;
  };
};
;// ../utils/src/getSynchronize.ts


/**
 * Ensures that all async actions passed to the returned function are called
 * immediately one after another, without interfering with each other.
 * Optionally, it also takes `lockId` param, in which case only actions with
 * the same lock id are blocking each other.
 *
 * Example:
 *
 * ```
 * const synchronize = getSynchronize();
 * synchronize(() => asyncAction1());
 * synchronize(() => asyncAction2());
 * synchronize(() => asyncAction3(), 'differentLockId');
 * ```
 */
const getSynchronize = mutex => {
  const lock = mutex ?? getMutex();
  return (action, lockId) => lock(lockId).then(unlock => Promise.resolve().then(action).finally(unlock));
};
;// ../connect/src/constants/errors.ts
const ERROR_CODES = {
  Init_NotInitialized: 'TrezorConnect not initialized',
  // race condition: call on not initialized Core (usually hot-reloading)
  Init_AlreadyInitialized: 'TrezorConnect has been already initialized',
  // thrown by .init called multiple times
  Init_IframeBlocked: 'Iframe blocked',
  // iframe injection blocked (ad-blocker)
  Init_IframeTimeout: 'Iframe timeout',
  // iframe didn't load in specified time
  Init_ManifestMissing: 'Manifest not set. Read more at https://github.com/trezor/trezor-suite/blob/develop/docs/packages/connect/index.md',
  // manifest is not set

  Popup_ConnectionMissing: 'Unable to establish connection with iframe',
  // thrown by popup
  Desktop_ConnectionMissing: 'Unable to establish connection with Suite',
  // thrown by suite-desktop

  Transport_Missing: 'Transport is missing',
  // no transport available

  Method_InvalidPackage: 'This package is not suitable to work with browser. Use @trezor/connect-web package instead',
  // thrown by node and react-native env while using regular 'web' package
  Method_InvalidParameter: '',
  // replaced by generic text
  Method_NotAllowed: 'Method not allowed for this configuration',
  // example: device management in popup mode
  Method_PermissionsNotGranted: 'Permissions not granted',
  // permission/confirmation not granted in popup
  Method_Cancel: 'Canceled',
  // permission/confirmation not granted in popup OR .cancel() custom error
  Method_Interrupted: 'Popup closed',
  // interruption: popup closed
  Method_UnknownCoin: 'Coin not found',
  // coin definition not found
  Method_AddressNotMatch: 'Addresses do not match',
  // thrown by all getAddress methods with custom UI validation
  Method_Discovery_BundleException: '',
  // thrown by getAccountInfo method
  Method_Override: 'override',
  // inner "error", it's more like a interruption
  Method_NoResponse: 'Call resolved without response',
  // thrown by npm index(es), call to Core resolved without response, should not happen
  Method_Unsupported: 'Unsupported method',
  // 3rd party called a method unknown by current version

  Backend_NotSupported: 'BlockchainLink settings not found in coins.json',
  // thrown by methods which using backends, blockchainLink not defined for this coin
  Backend_WorkerMissing: '',
  // thrown by BlockchainLink class, worker not specified
  Backend_Disconnected: 'Backend disconnected',
  // thrown by BlockchainLink class
  Backend_Invalid: 'Invalid backend',
  // thrown by BlockchainLink class, invalid backend (ie: backend for wrong coin set)
  Backend_Error: '',
  // thrown by BlockchainLink class, generic message from 'blockchain-link'

  Runtime: '',
  // thrown from several places, this shouldn't ever happen tho

  Device_NotFound: 'Device not found',
  Device_InitializeFailed: '',
  // generic error from firmware while calling "Initialize" message
  Device_FwException: '',
  // generic FirmwareException type
  Device_ModeException: '',
  // generic Device.UnexpectedMode type
  Device_Disconnected: 'Device disconnected',
  // device disconnected during call
  Device_UsedElsewhere: 'Device is used in another window',
  // interruption: current session toked by other application
  Device_InvalidState: 'Passphrase is incorrect',
  // authorization error (device state comparison)
  Device_CallInProgress: 'Device call in progress',
  // thrown when trying to make another call while current is still running
  Device_MultipleNotSupported: 'Multiple devices are not supported',
  // thrown by methods which require single device
  Device_MissingCapability: 'Device is missing capability',
  // thrown by methods which require specific capability
  Device_MissingCapabilityBtcOnly: 'Device is missing capability (BTC only)',
  // thrown by methods which require specific capability when using BTC only firmware
  Device_ThpPairingTagInvalid: 'Pairing tag mismatch',
  // thrown by RECEIVE_THP_PAIRING_TAG handler
  Device_ThpStateMissing: 'ThpState missing',
  // thrown by thp related actions
  Device_ThpPairingMethodsException: 'No common pairing methods',
  // device doesn't support requested pairing method(s)

  Failure_UnknownCode: 'Unknown error',
  Failure_EntropyCheck: '',
  // message from verifyEntropy process

  Deeplink_VersionMismatch: 'Not compatible with current version of the app'
};
class TrezorError extends Error {
  constructor(code, message, options) {
    super(message, options);
    this.code = code;
    this.message = message;
  }

  // Error.prototype.toString() does not include custom property `code`
  toString() {
    return `${this.name} (code: ${this.code}): ${this.message}`;
  }
}
const nestError = cause => cause instanceof TrezorError ? new TrezorError(cause.code, cause.message, {
  cause
}) : new Error(cause.message, {
  cause
});
class TransportError extends (/* unused pure expression or super */ null && (Error)) {}
const TypedError = (id, message) => new TrezorError(id, message || ERROR_CODES[id] || id);

// serialize Error/TypeError object into payload error type (Error object/class is converted to string while sent via postMessage)
const errors_serializeError = payload => {
  const error = payload?.error instanceof Error ? payload.error : payload;
  return error instanceof Error ? {
    error: error.message,
    code: 'code' in error ? error.code : 'Failure_UnknownCode'
  } : {
    ...payload
  };
};

// trezord error prefix.
// user has insufficient permissions. may occur in Linux (missing udev rules), Windows and MacOS.
const LIBUSB_ERROR_MESSAGE = 'LIBUSB_ERROR';
;// ../connect/src/events/core.ts
const CORE_EVENT = 'CORE_EVENT';
// parse MessageEvent .data into CoreMessage
const parseMessage = messageData => {
  const message = {
    event: messageData.event,
    type: messageData.type,
    payload: messageData.payload,
    device: messageData.device
  };
  if (typeof messageData.id === 'number') {
    message.id = messageData.id;
  }
  if (typeof messageData.success === 'boolean') {
    message.success = messageData.success;
  }
  return message;
};

// common response used straight from npm index (not from Core)
const createErrorMessage = error => ({
  success: false,
  payload: {
    error: error.message,
    code: error.code
  }
});
;// ../connect/src/utils/proxy-event-emitter.ts
/**
 * ProxyEventEmitter is an EventEmitter that allows to use multiple EventEmitters as one
 * This is used in connect-web to allow switching between iframe and core-in-popup implementations
 */
class ProxyEventEmitter {
  constructor(eventEmitters) {
    this.eventEmitters = eventEmitters;
  }
  emit(eventName, ...args) {
    this.eventEmitters.forEach(emitter => emitter.emit(eventName, ...args));
    return true;
  }
  on(eventName, listener) {
    this.eventEmitters.forEach(emitter => emitter.on(eventName, listener));
    return this;
  }
  off(eventName, listener) {
    this.eventEmitters.forEach(emitter => emitter.off(eventName, listener));
    return this;
  }
  once(eventName, listener) {
    this.eventEmitters.forEach(emitter => emitter.once(eventName, listener));
    return this;
  }
  addListener(eventName, listener) {
    this.eventEmitters.forEach(emitter => emitter.addListener(eventName, listener));
    return this;
  }
  prependListener(eventName, listener) {
    this.eventEmitters.forEach(emitter => emitter.prependListener(eventName, listener));
    return this;
  }
  prependOnceListener(eventName, listener) {
    this.eventEmitters.forEach(emitter => emitter.prependOnceListener(eventName, listener));
    return this;
  }
  removeAllListeners(event) {
    this.eventEmitters.forEach(emitter => emitter.removeAllListeners(event));
    return this;
  }
  removeListener(eventName, listener) {
    this.eventEmitters.forEach(emitter => emitter.removeListener(eventName, listener));
    return this;
  }
  setMaxListeners(n) {
    this.eventEmitters.forEach(emitter => emitter.setMaxListeners(n));
    return this;
  }

  // for the following methods, we just use the first EventEmitter
  // since all EventEmitters should be in sync, the result should be the same
  eventNames() {
    return this.eventEmitters[0].eventNames();
  }
  getMaxListeners() {
    return this.eventEmitters[0].getMaxListeners();
  }
  listenerCount(eventName, listener) {
    return this.eventEmitters[0].listenerCount(eventName, listener);
  }
  rawListeners(eventName) {
    return this.eventEmitters[0].rawListeners(eventName);
  }
  listeners(eventName) {
    return this.eventEmitters[0].listeners(eventName);
  }
}
;// ../connect/src/impl/dynamic.ts




/**
 * Implementation of TrezorConnect that can dynamically switch between different implementations.
 *
 */
class TrezorConnectDynamic {
  callPending = 0;
  beforeCallSynchronize = getSynchronize();
  constructor({
    implementations,
    getInitTarget,
    handleBeforeCall,
    handleErrorFallback
  }) {
    this.implementations = implementations;
    this.currentTarget = this.implementations[0].type;
    this.getInitTarget = getInitTarget;
    this.handleBeforeCall = handleBeforeCall;
    this.handleErrorFallback = handleErrorFallback;
    this.eventEmitter = new ProxyEventEmitter(this.implementations.map(impl => impl.impl.eventEmitter));
  }
  getTarget() {
    return this.implementations.find(impl => impl.type === this.currentTarget).impl;
  }
  getTargetType() {
    return this.currentTarget;
  }
  async switchTarget(target) {
    if (this.currentTarget === target) {
      return;
    }
    if (!this.lastSettings) {
      throw TypedError('Init_ManifestMissing');
    }

    // Go back to the old target if the new target fails to initialize
    const oldTargetType = this.getTargetType();
    const oldTarget = this.getTarget();
    try {
      this.currentTarget = target;
      await this.getTarget().init(this.lastSettings);
      await oldTarget.dispose();
    } catch {
      this.currentTarget = oldTargetType;
    }
  }
  manifest(manifest) {
    this.lastSettings = {
      ...this.lastSettings,
      manifest
    };
    this.getTarget().manifest(manifest);
  }
  async init(settings) {
    if (!settings?.manifest) {
      throw TypedError('Init_ManifestMissing');
    }
    // Save settings for later use
    this.lastSettings = settings;
    this.currentTarget = this.getInitTarget(settings);
    this.callPending = 0;

    // Initialize the target
    try {
      return await this.getTarget().init(this.lastSettings);
    } catch (error) {
      // Handle error by switching to other implementation if available as defined in `handleErrorFallback`.
      if (await this.handleErrorFallback(error.code)) {
        return;
      }
      throw error;
    }
  }
  setTransports({
    transports
  }) {
    this.lastSettings = {
      ...this.lastSettings,
      transports
    };
    this.getTarget().setTransports({
      transports
    });
  }
  async call(params) {
    try {
      // Edge case - if there are simultaneous calls, we only want to call `handleBeforeCall` once
      if (this.callPending === 0) {
        await this.beforeCallSynchronize(async () => {
          this.callPending++;
          await this.handleBeforeCall();
        });
      }
      const response = await this.getTarget().call(params);
      if (!response.success) {
        if (await this.handleErrorFallback(response.payload.code)) {
          return await this.getTarget().call(params);
        }
      }
      return response;
    } catch (error) {
      // Don't throw but return error payload
      return createErrorMessage(error);
    } finally {
      this.callPending--;
    }
  }
  requestLogin(params) {
    return this.getTarget().requestLogin(params);
  }
  uiResponse(params) {
    return this.getTarget().uiResponse(params);
  }
  cancel(error) {
    return this.getTarget().cancel(error);
  }
  dispose() {
    this.eventEmitter.removeAllListeners();
    this.callPending = 0;
    return this.getTarget().dispose();
  }
}
;// ../connect/src/data/thpSettings.ts
const parseThpSettings = ({
  manifest,
  thp
}) => {
  const settings = {
    pairingMethods: []
  };
  if (Array.isArray(thp?.pairingMethods)) {
    settings.pairingMethods = thp.pairingMethods;
  } else {
    settings.pairingMethods = ['CodeEntry'];
  }
  if (typeof thp?.hostName === 'string') {
    settings.hostName = thp.hostName;
  }
  if (typeof thp?.appName === 'string') {
    settings.appName = thp.appName;
  } else if (typeof manifest?.appName === 'string') {
    settings.appName = manifest?.appName;
  }
  if (typeof thp?.staticKey === 'string') {
    settings.staticKey = thp.staticKey;
  }
  if (Array.isArray(thp?.knownCredentials)) {
    settings.knownCredentials = thp.knownCredentials.flatMap(k => {
      if (k && typeof k === 'object' && typeof k.credential === 'string' && typeof k.trezor_static_public_key === 'string') {
        return k;
      }
      return [];
    });
  }
  return settings;
};
;// ../connect/src/data/version.ts
const VERSION = '9.6.3';
const versionN = VERSION.split('.').map(s => parseInt(s, 10));
const isBeta = VERSION.includes('beta');
const DEFAULT_DOMAIN_MAJOR_VER = `https://connect.trezor.io/${versionN[0]}/`;
const DEFAULT_DOMAIN = isBeta ? `https://connect.trezor.io/${VERSION}/` : DEFAULT_DOMAIN_MAJOR_VER;

// Increment with content script changes
const CONTENT_SCRIPT_VERSION = 1;
// Increment with deeplink protocol changes
const DEEPLINK_VERSION = 1;
;// ../connect/src/data/connectSettings.ts
// origin: https://github.com/trezor/connect/blob/develop/src/js/data/ConnectSettings.js



/*
 * Initial settings for connect.
 * It could be changed by passing values into TrezorConnect.init(...) method
 */

const DEFAULT_PRIORITY = 2;
const initialSettings = {
  configSrc: './data/config.json',
  // constant
  version: VERSION,
  // constant
  debug: false,
  priority: DEFAULT_PRIORITY,
  trustedHost: true,
  connectSrc: DEFAULT_DOMAIN,
  iframeSrc: `${DEFAULT_DOMAIN}iframe.html`,
  popup: false,
  popupSrc: `${DEFAULT_DOMAIN}popup.html`,
  webusbSrc: `${DEFAULT_DOMAIN}webusb.html`,
  transports: undefined,
  pendingTransportEvent: true,
  env: 'node',
  lazyLoad: false,
  timestamp: new Date().getTime(),
  interactionTimeout: 1200,
  // 20 minutes
  sharedLogger: true,
  deeplinkUrl: `${DEFAULT_DOMAIN}deeplink/${DEEPLINK_VERSION}/`,
  transportReconnect: true
};
const parseManifest = manifest => {
  if (!manifest) return;
  if (typeof manifest.email !== 'string') return;
  if (typeof manifest.appUrl !== 'string') return;
  // todo [connect10]: appName should become required
  if (typeof manifest.appName !== 'undefined' && typeof manifest.appName !== 'string') return;
  if (typeof manifest.appIcon !== 'undefined' && typeof manifest.appIcon !== 'string') return;
  return {
    email: manifest.email,
    appUrl: manifest.appUrl,
    appName: manifest.appName,
    appIcon: manifest.appIcon
  };
};
const parseLocalFirmwares = localFirmwares => {
  if (!localFirmwares) return;
  if (typeof localFirmwares.firmwareDir !== 'string') return;
  if (!Array.isArray(localFirmwares.firmwareList)) return;
  return {
    firmwareDir: localFirmwares.firmwareDir,
    firmwareList: localFirmwares.firmwareList
  };
};

// Cors validation copied from Trezor Bridge
// see: https://github.com/trezor/trezord-go/blob/05991cea5900d18bcc6ece5ae5e319d138fc5551/server/api/api.go#L229
// Its pointless to allow `@trezor/connect` endpoints { connectSrc } for domains other than listed below
// `trezord` will block communication anyway
const corsValidator = url => {
  if (typeof url !== 'string') return;
  if (url === '../') return url; // suite-web way
  if (url.match(/^https:\/\/([A-Za-z0-9\-_]+\.)*trezor\.io\//)) return url;
  if (url.match(/^https?:\/\/localhost:[58][0-9]{3}\//)) return url;
  if (url.match(/^https:\/\/([A-Za-z0-9\-_]+\.)*sldev\.cz\//)) return url;
  if (url.match(/^https?:\/\/([A-Za-z0-9\-_]+\.)*trezoriovpjcahpzkrewelclulmszwbqpzmzgub37gbcjlvluxtruqad\.onion\//)) return url;
};
const parseConnectSettings = (input = {}) => {
  const settings = {
    ...initialSettings
  };
  if ('debug' in input) {
    if (typeof input.debug === 'boolean') {
      settings.debug = input.debug;
    } else if (typeof input.debug === 'string') {
      settings.debug = input.debug === 'true';
    }
  }

  // trust level can only be lowered by implementator!
  if (input.trustedHost === false) {
    settings.trustedHost = input.trustedHost;
  }
  if (typeof input.connectSrc === 'string') {
    settings.connectSrc = corsValidator(input.connectSrc);
  } else if (settings.trustedHost) {
    settings.connectSrc = input.connectSrc;
  }
  const src = settings.connectSrc || DEFAULT_DOMAIN;
  settings.iframeSrc = `${src}iframe.html`;
  settings.popupSrc = `${src}popup.html`;
  settings.webusbSrc = `${src}webusb.html`;
  if (typeof input.transportReconnect === 'boolean') {
    settings.transportReconnect = input.transportReconnect;
  }
  if (typeof input.localFirmwares === 'object') {
    settings.localFirmwares = parseLocalFirmwares(input.localFirmwares);
  }
  if (typeof input.firmwareUpdateSource === 'string') {
    settings.firmwareUpdateSource = input.firmwareUpdateSource;
  }
  if (Array.isArray(input.transports)) {
    settings.transports = input.transports;
  }
  if (typeof input.popup === 'boolean') {
    settings.popup = input.popup;
  }
  if (typeof input.lazyLoad === 'boolean') {
    settings.lazyLoad = input.lazyLoad;
  }
  if (typeof input.pendingTransportEvent === 'boolean') {
    settings.pendingTransportEvent = input.pendingTransportEvent;
  }
  if (typeof input.extension === 'string') {
    settings.extension = input.extension;
  }
  if (typeof input.env === 'string') {
    settings.env = input.env;
  }
  if (typeof input.timestamp === 'number') {
    settings.timestamp = input.timestamp;
  }
  if (typeof input.interactionTimeout === 'number') {
    settings.interactionTimeout = input.interactionTimeout;
  }
  if (typeof input.manifest === 'object') {
    settings.manifest = parseManifest(input.manifest);
  }
  if (typeof input.sharedLogger === 'boolean') {
    settings.sharedLogger = input.sharedLogger;
  }
  if (typeof input.coreMode === 'string' && ['auto', 'popup', 'iframe', 'suite-desktop'].includes(input.coreMode)) {
    settings.coreMode = input.coreMode;
  }
  if (typeof input._extendWebextensionLifetime === 'boolean') {
    settings._extendWebextensionLifetime = input._extendWebextensionLifetime;
  }
  if (typeof input.binFilesBaseUrl === 'string') {
    settings.binFilesBaseUrl = input.binFilesBaseUrl;
  }
  if (typeof input.enableFirmwareHashCheck === 'boolean') {
    settings.enableFirmwareHashCheck = Boolean(input.enableFirmwareHashCheck);
  }
  if (
  // non-exhaustive Record is expected, so all we need to validate is that it's an indexable object.
  typeof input.firmwareHashCheckTimeouts === 'object' && input.firmwareHashCheckTimeouts !== null) {
    settings.firmwareHashCheckTimeouts = input.firmwareHashCheckTimeouts;
  }
  if (typeof input.npmVersion === 'string') {
    settings.npmVersion = input.npmVersion;
  }
  settings.thp = parseThpSettings(input);
  return settings;
};
;// ./src/connectSettings.ts

const getEnv = () => {
  if (typeof chrome !== 'undefined' && typeof chrome.runtime?.onConnect !== 'undefined') {
    return 'webextension';
  }
  if (typeof navigator !== 'undefined') {
    if (typeof navigator.product === 'string' && navigator.product.toLowerCase() === 'reactnative') {
      return 'react-native';
    }
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      return 'electron';
    }
  }
  return 'web';
};
/**
 * Settings from host
 * @param input Partial<ConnectSettings>
 */
const connectSettings_parseConnectSettings = (input = {}) => {
  const settings = {
    popup: true,
    ...input
  };
  // For debugging purposes `connectSrc` could be defined in `global.__TREZOR_CONNECT_SRC` variable
  let globalSrc;
  if (typeof window !== 'undefined') {
    // @ts-expect-error not defined in globals outside of the package
    globalSrc = window.__TREZOR_CONNECT_SRC;
  } else if (typeof __webpack_require__.g !== 'undefined') {
    globalSrc = __webpack_require__.g.__TREZOR_CONNECT_SRC;
  }
  if (typeof globalSrc === 'string') {
    settings.connectSrc = globalSrc;
    settings.debug = true;
  }
  if (typeof input.env !== 'string') {
    settings.env = getEnv();
  }
  return parseConnectSettings(settings);
};
// EXTERNAL MODULE: ../../node_modules/events/events.js
var events = __webpack_require__(46);
var events_default = /*#__PURE__*/__webpack_require__.n(events);
;// ../transport/src/constants.ts
// usb const
const CONFIGURATION_ID = 1;
const INTERFACE_ID = 0;
const ENDPOINT_ID = 1;
const DEBUGLINK_INTERFACE_ID = 1;
const DEBUGLINK_ENDPOINT_ID = 2;
const T1_HID_VENDOR = 0x534c;
const T1_HID_PRODUCT = 0x0001;
const WEBUSB_FIRMWARE_PRODUCT = 0x53c1;
const WEBUSB_BOOTLOADER_PRODUCT = 0x53c0;
const TREZOR_USB_DESCRIPTORS = [
// TREZOR v1
// won't get opened, but we can show error at least
{
  vendorId: 0x534c,
  productId: T1_HID_PRODUCT
},
// TREZOR webusb Bootloader
{
  vendorId: 0x1209,
  productId: WEBUSB_BOOTLOADER_PRODUCT
},
// TREZOR webusb Firmware
{
  vendorId: 0x1209,
  productId: WEBUSB_FIRMWARE_PRODUCT
}];

/**
 * How long is single transport action (call, acquire) allowed to take
 */
const ACTION_TIMEOUT = 10000;
const TRANSPORT = {
  /* events */
  START: 'transport-start',
  ERROR: 'transport-error',
  STOPPED: 'transport-stopped',
  DEVICE_CONNECTED: 'transport-device_connected',
  DEVICE_DISCONNECTED: 'transport-device_disconnected',
  DEVICE_SESSION_CHANGED: 'transport-device_session_changed',
  DEVICE_REQUEST_RELEASE: 'transport-device_request_release',
  SEND_MESSAGE_PROGRESS: 'transport-send_message_progress',
  /* messages */
  DISABLE_WEBUSB: 'transport-disable_webusb',
  REQUEST_DEVICE: 'transport-request_device',
  GET_INFO: 'transport-get_info',
  SET_TRANSPORTS: 'transport-set_transports'
};
;// ../connect/src/data/config.ts
// origin: https://github.com/trezor/connect/blob/develop/src/data/config.json


const config = {
  webusb: TREZOR_USB_DESCRIPTORS,
  whitelist: [{
    origin: 'chrome-extension://imloifkgjagghnncjkhggdhalmcnfklk',
    priority: 1
  }, {
    origin: 'chrome-extension://niebkpllfhmpfbffbfifagfgoamhpflf',
    priority: 1
  }, {
    origin: 'file://',
    priority: 2
  }, {
    origin: 'trezor.io',
    priority: 0
  }, {
    origin: 'sldev.cz',
    priority: 0
  }, {
    origin: 'localhost',
    priority: 0
  }, {
    origin: 'trezoriovpjcahpzkrewelclulmszwbqpzmzgub37gbcjlvluxtruqad.onion',
    priority: 0
  }],
  management: [{
    origin: 'trezor.io'
  }, {
    origin: 'sldev.cz'
  }, {
    origin: 'localhost'
  }],
  knownHosts: [{
    origin: 'imloifkgjagghnncjkhggdhalmcnfklk',
    label: 'Trezor Password Manager (Develop)'
  }, {
    origin: 'niebkpllfhmpfbffbfifagfgoamhpflf',
    label: 'Trezor Password Manager'
  }, {
    origin: 'mnpfhpndmjholfdlhpkjfmjkgppmodaf',
    label: 'MetaMask'
  }, {
    origin: 'webextension@metamask.io',
    label: 'MetaMask'
  }, {
    origin: 'nkbihfbeogaeaoehlefnkodbefgpgknn',
    label: 'MetaMask'
  }, {
    origin: 'bpcdaglidgnlggelgbjfagekoapjmccp',
    label: 'Rainbow DEV'
  }, {
    origin: 'opfgelmcmbiajamepnmloijbpoleiama',
    label: 'Rainbow'
  }, {
    origin: 'acmacodkjbdgmoleebolmdjonilkdbch',
    label: 'Rabby'
  }, {
    origin: 'ehnpnhnhcickeknioaiodjmielfaoajd',
    label: 'Ambire DEV'
  }, {
    origin: 'ehgjhhccekdedpbkifaojjaefeohnoea',
    label: 'Ambire'
  }, {
    origin: 'file://',
    label: ' '
  }],
  onionDomains: {
    'trezor.io': 'trezoriovpjcahpzkrewelclulmszwbqpzmzgub37gbcjlvluxtruqad.onion'
  },
  supportedBrowsers: {
    chrome: {
      version: 59,
      download: 'https://www.google.com/chrome/',
      update: 'https://support.google.com/chrome/answer/95414'
    },
    mobilechrome: {
      version: 59,
      download: 'https://www.google.com/chrome/',
      update: 'https://support.google.com/chrome/answer/95414'
    },
    chromium: {
      version: 59,
      download: 'https://www.chromium.org/',
      update: 'https://www.chromium.org/'
    },
    electron: {
      version: 0,
      download: 'https://www.electronjs.org/',
      update: 'https://www.electronjs.org/'
    },
    firefox: {
      version: 54,
      download: 'https://www.mozilla.org/en-US/firefox/new/',
      update: 'https://support.mozilla.org/en-US/kb/update-firefox-latest-version'
    },
    mobilefirefox: {
      version: 54,
      download: 'https://www.mozilla.org/en-US/firefox/new/',
      update: 'https://support.mozilla.org/en-US/kb/update-firefox-latest-version'
    },
    brave: {
      // Chromium based
      version: 59,
      download: 'https://brave.com/download/',
      update: 'https://brave.com/download/'
    },
    edge: {
      // Since version 79, Edge is based on Chromium
      version: 79,
      download: 'https://www.microsoft.com/en-us/edge',
      update: 'https://www.microsoft.com/en-us/edge'
    },
    opera: {
      // Chromium based
      version: 95,
      download: 'https://www.opera.com/download',
      update: 'https://www.opera.com/download'
    }
  },
  supportedFirmware: [{
    coin: ['xrp', 'txrp'],
    methods: ['getAccountInfo'],
    min: {
      T1B1: '0',
      T2T1: '2.1.0'
    },
    max: undefined,
    // NOTE: max field is not used anywhere at the moment, it is here for type compatibility
    comment: ["Since firmware 2.1.0 there is a new protobuf field 'destination_tag' in RippleSignTx"]
  }, {
    coin: ['bnb'],
    min: {
      T1B1: '1.9.0',
      T2T1: '2.3.0'
    },
    comment: ['There were protobuf backwards incompatible changes with introduction of 1.9.0/2.3.0 firmwares']
  }, {
    coin: ['eth', 'tsep', 'thol'],
    min: {
      T1B1: '1.8.0',
      T2T1: '2.1.0'
    },
    comment: ['There were protobuf backwards incompatible changes.']
  }, {
    coin: ['ada', 'tada'],
    min: {
      T1B1: '0',
      T2T1: '2.4.3'
    },
    comment: ['Since 2.4.3 there is initialize.derive_cardano message']
  }, {
    methods: ['rippleGetAddress', 'rippleSignTransaction'],
    min: {
      T1B1: '0',
      T2T1: '2.1.0'
    },
    comment: ["Since firmware 2.1.0 there is a new protobuf field 'destination_tag' in RippleSignTx"]
  }, {
    methods: ['cardanoGetAddress', 'cardanoGetPublicKey'],
    min: {
      T1B1: '0',
      T2T1: '2.4.3'
    },
    comment: ['Since 2.4.3 Cardano derivation behavior has changed']
  }, {
    methods: ['cardanoSignTransaction'],
    min: {
      T1B1: '0',
      T2T1: '2.6.0'
    },
    comment: ['Before 2.6.0 not all Cardano transactions were supported']
  }, {
    methods: ['cardanoGetNativeScriptHash'],
    min: {
      T1B1: '0',
      T2T1: '2.4.3'
    },
    comment: ['Since 2.4.3 Cardano derivation behavior has changed']
  }, {
    methods: ['tezosSignTransaction'],
    min: {
      T1B1: '0',
      T2T1: '2.1.8'
    },
    comment: ['Since 2.1.8 there are new protobuf fields in tezos transaction (Babylon fork)']
  }, {
    methods: ['stellarSignTransaction'],
    min: {
      T1B1: '1.9.0',
      T2T1: '2.3.0'
    },
    comment: ['There were protobuf backwards incompatible changes with introduction of 1.9.0/2.3.0 firmwares']
  }, {
    capabilities: ['replaceTransaction', 'amountUnit'],
    min: {
      T1B1: '1.9.4',
      T2T1: '2.3.5'
    },
    comment: ['new sign tx process since 1.9.4/2.3.5']
  }, {
    capabilities: ['decreaseOutput'],
    min: {
      T1B1: '1.10.0',
      T2T1: '2.4.0'
    },
    comment: ['allow reduce output in RBF transaction since 1.10.0/2.4.0']
  }, {
    capabilities: ['eip1559'],
    min: {
      T1B1: '1.10.4',
      T2T1: '2.4.2'
    },
    comment: ['new eth transaction pricing mechanism (EIP1559) since 1.10.4/2.4.2']
  }, {
    capabilities: ['taproot', 'signMessageNoScriptType'],
    min: {
      T1B1: '1.10.4',
      T2T1: '2.4.3'
    },
    comment: ['new btc accounts taproot since 1.10.4/2.4.3 (BTC + TEST only)', 'SignMessage with no_script_type support']
  }, {
    coin: ['dcr', 'tdcr'],
    methods: ['signTransaction'],
    min: {
      T1B1: '1.10.1',
      T2T1: '2.4.0'
    },
    comment: ['']
  }, {
    methods: ['ethereumSignTypedData'],
    min: {
      T1B1: '1.10.5',
      T2T1: '2.4.3'
    },
    comment: ['EIP-712 typed signing support added in 1.10.5/2.4.3']
  }, {
    capabilities: ['eip712-domain-only'],
    min: {
      T1B1: '1.10.6',
      T2T1: '2.4.4'
    },
    comment: ['EIP-712 domain-only signing, when primaryType=EIP712Domain']
  }, {
    capabilities: ['coinjoin'],
    methods: ['authorizeCoinjoin', 'cancelCoinjoinAuthorization', 'getOwnershipId', 'getOwnershipProof', 'setBusy', 'unlockPath'],
    min: {
      T1B1: '1.12.1',
      T2T1: '2.5.3'
    }
  }, {
    capabilities: ['tutorial'],
    methods: ['showDeviceTutorial'],
    min: {
      T1B1: '0',
      T2T1: '0',
      T3T1: '2.8.0'
    }
  }, {
    methods: ['authenticateDevice'],
    min: {
      T1B1: '0',
      T2T1: '0',
      T3T1: '2.8.0'
    }
  }, {
    capabilities: ['getFirmwareHash'],
    methods: ['getFirmwareHash'],
    min: {
      T1B1: '1.11.1',
      T2T1: '2.5.1'
    }
  }, {
    methods: ['solanaGetPublicKey', 'solanaGetAddress', 'solanaSignTransaction'],
    min: {
      T1B1: '0',
      T2T1: '2.6.4',
      T2B1: '2.6.4'
    }
  }, {
    capabilities: ['chunkify'],
    min: {
      T1B1: '0',
      T2T1: '2.6.3',
      T2B1: '2.6.3'
    },
    comment: ["Since firmware 2.6.3 there is a new protobuf field 'chunkify' in almost all getAddress and signTx methods"]
  }, {
    methods: ['changeLanguage'],
    min: {
      T1B1: '0',
      T2T1: '2.7.0',
      T2B1: '2.7.0'
    }
  }, {
    capabilities: ['entropyCheck'],
    min: {
      T1B1: '1.13.1',
      T2T1: '2.8.7',
      T2B1: '2.8.7',
      T3B1: '2.8.7',
      T3T1: '2.8.7'
    }
  }, {
    capabilities: ['evmApproval'],
    min: {
      T1B1: '0',
      T2T1: '2.9.0',
      T2B1: '2.9.0',
      T3B1: '2.9.0',
      T3T1: '2.9.0'
    },
    comment: ['EVM approval flow for ERC20 tokens, introduced in firmware 2.9.0']
  }, {
    capabilities: ['slip24'],
    methods: ['getNonce'],
    min: {
      T1B1: '0',
      T2T1: '2.9.1',
      T2B1: '2.9.1',
      T3B1: '2.9.1',
      T3T1: '2.9.1'
    },
    comment: ['Since firmware 2.9.1 SLIP-24 is supported']
  }, {
    methods: ['cardanoSignMessage'],
    min: {
      T1B1: '0',
      T2T1: '2.9.1',
      T2B1: '2.9.1',
      T3B1: '2.9.1',
      T3T1: '2.9.1'
    },
    comment: ['Cardano SignMessage call added in 2.9.1']
  }, {
    capabilities: ['evolu'],
    methods: ['evoluGetNode'],
    min: {
      T1B1: '0',
      T2T1: '2.9.2',
      T2B1: '2.9.2',
      T3B1: '2.9.2',
      T3T1: '2.9.2'
    }
  }]
};
;// ../connect/src/events/popup.ts

const POPUP = {
  // Message called from popup.html inline script before "window.onload" event. This is first message from popup to window.opener.
  BOOTSTRAP: 'popup-bootstrap',
  // Message from popup.js to window.opener, called after "window.onload" event. This is second message from popup to window.opener.
  LOADED: 'popup-loaded',
  // Message from popup run in "core" mode. Connect core has been loaded, popup is ready to handle messages
  // This is similar to IFRAME.LOADED message which signals the same but core is loaded in different context
  CORE_LOADED: 'popup-core-loaded',
  // Message from window.opener to popup.js. Send settings to popup. This is first message from window.opener to popup.
  INIT: 'popup-init',
  // Error message from popup to window.opener. Could be thrown during popup initialization process (POPUP.INIT)
  ERROR: 'popup-error',
  // Message to webextensions, opens "trezor-usb-permission.html" within webextension
  EXTENSION_USB_PERMISSIONS: 'open-usb-permissions',
  // Message called from both [popup > iframe] then [iframe > popup] in this exact order.
  // Firstly popup call iframe to resolve popup promise in Core
  // Then iframe reacts to POPUP.HANDSHAKE message and sends ConnectSettings, transport information and requested method details back to popup
  HANDSHAKE: 'popup-handshake',
  // Event emitted from PopupManager at the end of popup closing process.
  // Sent from popup thru window.opener to an iframe because message channel between popup and iframe is no longer available
  CLOSED: 'popup-closed',
  // Message called from iframe to popup, it means that popup will not be needed (example: Blockchain methods are not using popup at all)
  // This will close active popup window and/or clear opening process in PopupManager (maybe popup wasn't opened yet)
  CANCEL_POPUP_REQUEST: 'ui-cancel-popup-request',
  // Message called from inline element in popup.html (window.closeWindow), this is used only with webextensions to properly handle popup close event
  CLOSE_WINDOW: 'window.close',
  // todo: shouldn't it be UI_RESPONSE?
  ANALYTICS_RESPONSE: 'popup-analytics-response',
  /** webextension injected content script and content script notified popup */
  CONTENT_SCRIPT_LOADED: 'popup-content-script-loaded',
  /** method.info async getter result passed from core to popup */
  METHOD_INFO: 'popup-method-info'
};
const createPopupMessage = (type, payload) => ({
  event: UI_EVENT,
  type,
  payload
});
;// ../connect/src/events/call.ts


// conditionally unwrap TrezorConnect api method Success<T> response

// https://github.com/microsoft/TypeScript/issues/32164
// there is no native way how to get Parameters<Fn> for overloaded function
// current TrezorConnect api methods have exactly 2 overloads (if any)

// map TrezorConnect api with unwrapped methods

const RESPONSE_EVENT = 'RESPONSE_EVENT';
const createResponseMessage = (id, success, payload, device) => ({
  event: RESPONSE_EVENT,
  type: RESPONSE_EVENT,
  id,
  success,
  payload: success ? payload : serializeError(payload),
  device: device ? {
    path: device?.getUniquePath(),
    state: device?.getState(),
    instance: device?.getInstance()
  } : undefined
});
;// ../connect/src/events/device.ts
const DEVICE_EVENT = 'DEVICE_EVENT';
const DEVICE = {
  // device list events
  CONNECT: 'device-connect',
  CONNECT_UNACQUIRED: 'device-connect_unacquired',
  DISCONNECT: 'device-disconnect',
  CHANGED: 'device-changed',
  FIRMWARE_VERSION_CHANGED: 'device-firmware_version_changed',
  // This event is triggered every time, the device provides the THP credentials to the Suite.
  // This happens on two occasions:
  //      1) User just entered the Code and the device provided the pairing credentials.
  //      2) User initiated the autoconnect flow and confirmed on the device the autoconnect.
  //         Device then responded with a new credential that allows the Suite to autoconnect.
  THP_CREDENTIALS_CHANGED: 'device-thp_credentials_changed',
  // trezor-link events in protobuf format
  BUTTON: 'button',
  PIN: 'pin',
  PASSPHRASE: 'passphrase',
  PASSPHRASE_ON_DEVICE: 'passphrase_on_device',
  WORD: 'word',
  THP_PAIRING: 'thp_pairing' // ask UI for pairing tag
};
const createDeviceMessage = (type, payload) => ({
  event: DEVICE_EVENT,
  type,
  payload
});
;// ../connect/src/events/transport.ts




const TRANSPORT_EVENT = 'TRANSPORT_EVENT';
const createTransportMessage = (type, payload) => ({
  event: TRANSPORT_EVENT,
  type,
  payload: 'error' in payload ? serializeError(payload) :
  // suggest udev installer without setting "preferred" field
  {
    ...payload,
    udev: suggestUdevInstaller(),
    bridge: suggestBridgeInstaller()
  }
});
;// ../connect/src/events/blockchain.ts
const BLOCKCHAIN_EVENT = 'BLOCKCHAIN_EVENT';
const BLOCKCHAIN = {
  CONNECT: 'blockchain-connect',
  RECONNECTING: 'blockchain-reconnecting',
  ERROR: 'blockchain-error',
  BLOCK: 'blockchain-block',
  NOTIFICATION: 'blockchain-notification',
  FIAT_RATES_UPDATE: 'fiat-rates-update'
};
const createBlockchainMessage = (type, payload) => ({
  event: BLOCKCHAIN_EVENT,
  type,
  payload
});
;// ../connect/src/events/iframe.ts

const IFRAME = {
  // Message called from iframe.html inline script before "window.onload" event. This is first message from iframe to window.opener.
  BOOTSTRAP: 'iframe-bootstrap',
  // Message from iframe.js to window.opener, called after "window.onload" event. This is second message from iframe to window.opener.
  LOADED: 'iframe-loaded',
  // Message from window.opener to iframe.js
  INIT: 'iframe-init',
  // Error message from iframe.js to window.opener. Could be thrown during iframe initialization process
  ERROR: 'iframe-error',
  // Message from window.opener to iframe. Call method
  CALL: 'iframe-call',
  // Message from third party window to iframe to add log to shared worker logger.
  LOG: 'iframe-log'
};
const createIFrameMessage = (type, payload) => ({
  event: UI_EVENT,
  type,
  payload
});
;// ../utils/src/logs.ts
class Log {
  css = '';
  MAX_ENTRIES = 100;
  constructor(prefix, enabled, logWriter) {
    this.prefix = prefix;
    this.enabled = enabled;
    this.messages = [];
    if (logWriter) {
      this.logWriter = logWriter;
    }
  }
  setColors(colors) {
    this.css = typeof window !== 'undefined' && colors[this.prefix] ? colors[this.prefix] : '';
  }
  addMessage({
    level,
    prefix,
    timestamp
  }, ...args) {
    const message = {
      level,
      prefix,
      css: this.css,
      message: args,
      timestamp: timestamp || Date.now()
    };
    this.messages.push(message);
    if (this.logWriter) {
      try {
        this.logWriter.add(message);
      } catch (err) {
        // If this error happens it probably means that we are logging an object with a circular reference.
        // If there is any `device` logged, do it with `device.toMessageObject()` instead.
        console.error('There was an error adding log message', err, message);
      }
    }
    if (this.messages.length > this.MAX_ENTRIES) {
      this.messages.shift();
    }
  }
  setWriter(logWriter) {
    this.logWriter = logWriter;
  }
  log(...args) {
    this.addMessage({
      level: 'log',
      prefix: this.prefix
    }, ...args);
    if (this.enabled) {
      // eslint-disable-next-line no-console
      console.log(`%c${this.prefix}`, this.css, ...args);
    }
  }
  error(...args) {
    this.addMessage({
      level: 'error',
      prefix: this.prefix
    }, ...args);
    if (this.enabled) {
      console.error(`%c${this.prefix}`, this.css, ...args);
    }
  }
  info(...args) {
    this.addMessage({
      level: 'info',
      prefix: this.prefix
    }, ...args);
    if (this.enabled) {
      // eslint-disable-next-line no-console
      console.info(`%c${this.prefix}`, this.css, ...args);
    }
  }
  warn(...args) {
    this.addMessage({
      level: 'warn',
      prefix: this.prefix
    }, ...args);
    if (this.enabled) {
      console.warn(`%c${this.prefix}`, this.css, ...args);
    }
  }
  debug(...args) {
    this.addMessage({
      level: 'debug',
      prefix: this.prefix
    }, ...args);
    if (this.enabled) {
      if (this.css) {
        // eslint-disable-next-line no-console
        console.log(`%c${this.prefix}`, this.css, ...args);
      } else {
        // eslint-disable-next-line no-console
        console.log(this.prefix, ...args);
      }
    }
  }
  getLog() {
    return this.messages;
  }
}
;// ../utils/src/logsManager.ts

class LogsManager {
  logs = {};
  colors = {};
  constructor({
    colors
  }) {
    this.colors = colors;
  }
  initLog(prefix, enabled, logWriter) {
    const instanceWriter = logWriter || this.writer;
    const instance = new Log(prefix, !!enabled, instanceWriter);
    if (this.colors) {
      instance.setColors(this.colors);
    }
    this.logs[prefix] = instance;
    return instance;
  }
  setLogWriter(logWriterFactory) {
    Object.keys(this.logs).forEach(key => {
      this.writer = logWriterFactory();
      if (this.writer) {
        this.logs[key].setWriter(this.writer);
        const {
          messages
        } = this.logs[key];
        // If there are any messages in the log when init, add them to the writer.
        messages.forEach(message => {
          this.writer?.add(message);
        });
      }
    });
  }
  enableLog(enabled) {
    Object.keys(this.logs).forEach(key => {
      this.logs[key].enabled = !!enabled;
    });
  }
  enableLogByPrefix(prefix, enabled) {
    if (this.logs[prefix]) {
      this.logs[prefix].enabled = enabled;
    }
  }
  getLog() {
    let logs = [];
    Object.keys(this.logs).forEach(key => {
      logs = logs.concat(this.logs[key].messages);
    });
    logs.sort((a, b) => a.timestamp - b.timestamp);
    return logs;
  }
}
;// ../connect/src/utils/debug.ts

const green = '#bada55';
const blue = '#20abd8';
const orange = '#f4a744';
const yellow = '#fbd948';
const colors = {
  // blue, npm package related
  '@trezor/connect': `color: ${blue}; background: #000;`,
  '@trezor/connect-web': `color: ${blue}; background: #000;`,
  '@trezor/connect-webextension': `color: ${blue}; background: #000;`,
  // orange, api related
  IFrame: `color: ${orange}; background: #000;`,
  Core: `color: ${orange}; background: #000;`,
  // green, device related
  DeviceList: `color: ${green}; background: #000;`,
  Device: `color: ${green}; background: #000;`,
  DeviceCommands: `color: ${green}; background: #000;`,
  '@trezor/transport': `color: ${green}; background: #000;`,
  InteractionTimeout: `color: ${green}; background: #000;`,
  // yellow, ui related
  '@trezor/connect-popup': `color: ${yellow}; background: #000;`
};
const logsManager = new LogsManager({
  colors
});
const initLog = logsManager.initLog.bind(logsManager);
const setLogWriter = logsManager.setLogWriter.bind(logsManager);
const enableLog = logsManager.enableLog.bind(logsManager);
const enableLogByPrefix = logsManager.enableLogByPrefix.bind(logsManager);
const getLog = logsManager.getLog.bind(logsManager);
;// ../utils/src/createDeferred.ts
// unwrap promise response from Deferred

const createDeferred = id => {
  let localResolve = () => {};
  let localReject = () => {};
  const promise = new Promise((resolve, reject) => {
    localResolve = resolve;
    localReject = reject;
  });
  return {
    id,
    resolve: localResolve,
    reject: localReject,
    promise
  };
};
;// ../utils/src/createDeferredManager.ts

/**
 * Handles the frequently repeated pattern of many deferred promises with unique ids
 * (usually requests), which can be resolved or rejected in a random order, or they can
 * time out
 *
 * @param options optional default timeout and onTimeout callback
 *
 * @returns Deferred promise manager instance
 */
const createDeferredManager = options => {
  const {
    initialId = 0,
    timeout: defaultTimeout = 0,
    onTimeout
  } = options ?? {};
  const promises = [];
  let ID = initialId;
  let timeoutHandle;
  const length = () => promises.length;
  const nextId = () => ID;
  const replanTimeout = () => {
    const now = Date.now();
    const nearestDeadline = promises.reduce((prev, {
      deadline
    }) => (prev && deadline ? Math.min : Math.max)(prev, deadline), 0);
    if (timeoutHandle) clearTimeout(timeoutHandle);
    timeoutHandle = nearestDeadline ?
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setTimeout(timeoutCallback, Math.max(nearestDeadline - now, 0)) // TODO min safe interval instead of zero?
    : undefined;
  };
  const timeoutCallback = () => {
    const now = Date.now();
    promises.filter(promise => promise.deadline && promise.deadline <= now).forEach(promise => {
      onTimeout?.(promise.id);
      promise.deadline = 0;
    });
    replanTimeout();
  };
  const create = (timeout = defaultTimeout) => {
    const promiseId = ID++;
    const deferred = createDeferred(promiseId);
    const deadline = timeout && Date.now() + timeout;
    promises.push({
      ...deferred,
      deadline
    });
    if (timeout) replanTimeout();
    return {
      promiseId,
      promise: deferred.promise
    };
  };
  const extract = promiseId => {
    const index = promises.findIndex(({
      id
    }) => id === promiseId);
    const [promise] = index >= 0 ? promises.splice(index, 1) : [undefined];
    if (promise?.deadline) replanTimeout();
    return promise;
  };
  const resolve = (promiseId, value) => {
    const promise = extract(promiseId);
    promise?.resolve(value);
    return !!promise;
  };
  const reject = (promiseId, error) => {
    const promise = extract(promiseId);
    promise?.reject(error);
    return !!promise;
  };
  const rejectAll = error => {
    promises.forEach(promise => promise.reject(error));
    const deleted = promises.splice(0, promises.length);
    if (deleted.length) replanTimeout();
  };
  return {
    length,
    nextId,
    create,
    resolve,
    reject,
    rejectAll
  };
};
;// ../connect/src/utils/urlUtils.ts
// origin: https://github.com/trezor/connect/blob/develop/src/js/utils/urlUtils.js


const getOrigin = url => {
  if (typeof url !== 'string') return 'unknown';
  if (url.indexOf('file://') === 0) return 'file://';
  const [origin] = url.match(/^https?:\/\/[^/]+/) ?? [];
  return origin ?? 'unknown';
};
const getHost = url => {
  if (typeof url !== 'string') return;
  const [,, uri] = url.match(/^(https?):\/\/([^:/]+)?/i) ?? [];
  if (uri) {
    const parts = uri.split('.');

    // allow localhost subdomains
    if (parts[parts.length - 1] === 'localhost') return 'localhost';
    return parts.length > 2 ?
    // slice subdomain
    parts.slice(parts.length - 2, parts.length).join('.') : uri;
  }
};
const getOnionDomain = (url, dict) => {
  if (Array.isArray(url)) return url.map(u => urlToOnion(u, dict) ?? u);
  if (typeof url === 'string') return urlToOnion(url, dict) ?? url;
  return url;
};
;// ./src/iframe/inlineStyles.ts
// origin: https://github.com/trezor/connect/blob/develop/src/js/iframe/inline-styles.js

const css = '.trezorconnect-container{position:fixed!important;display:-webkit-box!important;display:-webkit-flex!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;-webkit-flex-direction:column!important;-ms-flex-direction:column!important;flex-direction:column!important;-webkit-box-align:center!important;-webkit-align-items:center!important;-ms-flex-align:center!important;align-items:center!important;z-index:10000!important;width:100%!important;height:100%!important;top:0!important;left:0!important;background:rgba(0,0,0,.35)!important;overflow:auto!important;padding:20px!important;margin:0!important}.trezorconnect-container .trezorconnect-window{position:relative!important;display:block!important;width:370px!important;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif!important;margin:auto!important;border-radius:3px!important;background-color:#fff!important;text-align:center!important;overflow:hidden!important}.trezorconnect-container .trezorconnect-window .trezorconnect-head{text-align:left;padding:12px 24px!important;display:-webkit-box!important;display:-webkit-flex!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-align:center!important;-webkit-align-items:center!important;-ms-flex-align:center!important;align-items:center!important}.trezorconnect-container .trezorconnect-window .trezorconnect-head .trezorconnect-logo{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.trezorconnect-container .trezorconnect-window .trezorconnect-head .trezorconnect-close{cursor:pointer!important;height:24px!important}.trezorconnect-container .trezorconnect-window .trezorconnect-head .trezorconnect-close svg{fill:#757575;-webkit-transition:fill .3s ease-in-out!important;transition:fill .3s ease-in-out!important}.trezorconnect-container .trezorconnect-window .trezorconnect-head .trezorconnect-close:hover svg{fill:#494949}.trezorconnect-container .trezorconnect-window .trezorconnect-body{padding:24px 24px 32px!important;background:#FBFBFB!important;border-top:1px solid #EBEBEB}.trezorconnect-container .trezorconnect-window .trezorconnect-body h3{color:#505050!important;font-size:16px!important;font-weight:500!important}.trezorconnect-container .trezorconnect-window .trezorconnect-body p{margin:8px 0 24px!important;font-weight:400!important;color:#A9A9A9!important;font-size:12px!important}.trezorconnect-container .trezorconnect-window .trezorconnect-body button{width:100%!important;padding:12px 24px!important;margin:0!important;border-radius:3px!important;font-size:14px!important;font-weight:300!important;cursor:pointer!important;background:#01B757!important;color:#fff!important;border:0!important;-webkit-transition:background-color .3s ease-in-out!important;transition:background-color .3s ease-in-out!important}.trezorconnect-container .trezorconnect-window .trezorconnect-body button:hover{background-color:#00AB51!important}.trezorconnect-container .trezorconnect-window .trezorconnect-body button:active{background-color:#009546!important}/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlucHV0IiwiJHN0ZGluIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWNBLHlCQUNJLFNBQUEsZ0JBQ0EsUUFBQSxzQkFDQSxRQUFBLHVCQUNBLFFBQUEsc0JBRUEsUUFBQSxlQUNBLG1CQUFBLG1CQUNBLHNCQUFBLGlCQUNBLHVCQUFBLGlCQUNBLG1CQUFBLGlCQUNBLGVBQUEsaUJBRUEsa0JBQUEsaUJBQ0Esb0JBQUEsaUJBQ0EsZUFBQSxpQkNmTSxZQUFhLGlCREFyQixRQUFTLGdCQWtCSCxNQUFBLGVBQ0EsT0FBQSxlQUNBLElBQUEsWUFDQSxLQUFBLFlBQ0EsV0FBQSwwQkFDQSxTQUFBLGVBQ0EsUUFBQSxlQUNBLE9BQUEsWUNkUiwrQ0RYRSxTQUFVLG1CQTZCQSxRQUFBLGdCQUNBLE1BQUEsZ0JBQ0EsWUFBQSxjQUFBLG1CQUFBLFdBQUEsT0FBQSxpQkFBQSxNQUFBLHFCQUNBLE9BQUEsZUNmVixjQUFlLGNEakJmLGlCQWlCRSxlQWtCWSxXQUFBLGlCQ2ZkLFNBQVUsaUJEbUJJLG1FQUNBLFdBQUEsS0NoQmQsUUFBUyxLQUFLLGVEeEJkLFFBQVMsc0JBMENTLFFBQUEsdUJBQ0EsUUFBQSxzQkNmbEIsUUFBUyxlRGlCSyxrQkE1QlosaUJBOEJvQixvQkFBQSxpQkNoQmxCLGVBQWdCLGlCRC9CWixZQWlCTixpQkFzQ1EsdUZBQ0EsaUJBQUEsRUNwQlYsYUFBYyxFRHBDVixTQUFVLEVBMkRBLEtBQUEsRUFFQSx3RkNwQmQsT0FBUSxrQkR6Q1IsT0FBUSxlQWlFTSw0RkFDQSxLQUFBLFFBQ0EsbUJBQUEsS0FBQSxJQUFBLHNCQ3BCZCxXQUFZLEtBQUssSUFBSyxzQkR3QlIsa0dBQ0EsS0FBQSxRQUVBLG1FQUNBLFFBQUEsS0FBQSxLQUFBLGVBQ0EsV0FBQSxrQkFDQSxXQUFBLElBQUEsTUFBQSxRQUVBLHNFQUNBLE1BQUEsa0JBQ0EsVUFBQSxlQ3JCZCxZQUFhLGNEd0JLLHFFQ3JCbEIsT0FBUSxJQUFJLEVBQUksZUR3QkYsWUFBQSxjQUNJLE1BQUEsa0JDdEJsQixVQUFXLGVBRWIsMEVBQ0UsTUFBTyxlQUNQLFFBQVMsS0FBSyxlQUNkLE9BQVEsWUFDUixjQUFlLGNBQ2YsVUFBVyxlQUNYLFlBQWEsY0FDYixPQUFRLGtCQUNSLFdBQVksa0JBQ1osTUFBTyxlQUNQLE9BQVEsWUFDUixtQkFBb0IsaUJBQWlCLElBQUssc0JBQzFDLFdBQVksaUJBQWlCLElBQUssc0JBRXBDLGdGQUNFLGlCQUFrQixrQkFFcEIsaUZBQ0UsaUJBQWtCIn0= */';
/* harmony default export */ const inlineStyles = (css);
;// ./src/iframe/index.ts
// origin: https://github.com/trezor/connect/blob/develop/src/js/iframe/builder.js







let instance;
let origin;
let initPromise = createDeferred();
let timeout = 0;
let error;
const dispose = () => {
  if (instance && instance.parentNode) {
    try {
      instance.parentNode.removeChild(instance);
    } catch {
      // do nothing
    }
  }
  instance = null;
  timeout = 0;
};
const handleIframeBlocked = () => {
  window.clearTimeout(timeout);
  error = TypedError('Init_IframeBlocked');
  dispose();
  initPromise.reject(error);
};
const injectStyleSheet = () => {
  if (!instance) {
    throw TypedError('Init_IframeBlocked');
  }
  const doc = instance.ownerDocument;
  const head = doc.head || doc.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.setAttribute('id', 'TrezorConnectStylesheet');

  // @ts-expect-error
  if (style.styleSheet) {
    // @ts-expect-error
    style.styleSheet.cssText = inlineStyles;
    head.appendChild(style);
  } else {
    style.appendChild(document.createTextNode(inlineStyles));
    head.append(style);
  }
};
const init = async settings => {
  initPromise = createDeferred();
  const existedFrame = document.getElementById('trezorconnect');
  if (existedFrame) {
    instance = existedFrame;
  } else {
    instance = document.createElement('iframe');
    instance.frameBorder = '0';
    instance.width = '0px';
    instance.height = '0px';
    instance.style.position = 'absolute';
    instance.style.display = 'none';
    instance.style.border = '0px';
    instance.style.width = '0px';
    instance.style.height = '0px';
    instance.id = 'trezorconnect';
  }
  let src;
  if (settings.env === 'web') {
    const manifestString = settings.manifest ? JSON.stringify(settings.manifest) : 'undefined'; // note: btoa(undefined) === btoa('undefined') === "dW5kZWZpbmVk"
    const manifest = `version=${settings.version}&manifest=${encodeURIComponent(btoa(JSON.stringify(manifestString)))}`;
    src = `${settings.iframeSrc}?${manifest}`;
  } else {
    src = settings.iframeSrc;
  }
  if (!src.startsWith('http://') && !src.startsWith('https://')) {
    return;
  }
  instance.setAttribute('src', src);
  if (navigator.usb) {
    instance.setAttribute('allow', 'usb');
  }
  origin = getOrigin(instance.src);
  timeout = window.setTimeout(() => {
    initPromise.reject(TypedError('Init_IframeTimeout'));
  }, 10000);
  const onLoad = () => {
    if (!instance) {
      initPromise.reject(TypedError('Init_IframeBlocked'));
      return;
    }
    try {
      // if hosting page is able to access cross-origin location it means that the iframe is not loaded
      const iframeOrigin = instance.contentWindow?.location.origin;
      if (!iframeOrigin || iframeOrigin === 'null') {
        handleIframeBlocked();
        return;
      }
    } catch {
      // empty
    }
    let extension;
    if (typeof chrome !== 'undefined' && chrome.runtime && typeof chrome.runtime.onConnect !== 'undefined') {
      chrome.runtime.onConnect.addListener(() => {});
      extension = chrome.runtime.id;
    }
    instance.contentWindow?.postMessage({
      type: IFRAME.INIT,
      payload: {
        settings,
        extension
      }
    }, origin);
    instance.onload = null;
  };

  // IE hack
  // @ts-expect-error
  if (instance.attachEvent) {
    // @ts-expect-error
    instance.attachEvent('onload', onLoad);
  } else {
    instance.onload = onLoad;
  }
  // inject iframe into host document body
  if (document.body) {
    document.body.appendChild(instance);
    injectStyleSheet();
  }
  try {
    await initPromise.promise;
  } catch (e) {
    // reset state to allow initialization again
    if (instance) {
      if (instance.parentNode) {
        instance.parentNode.removeChild(instance);
      }
      instance = null;
    }
    throw e;
  } finally {
    window.clearTimeout(timeout);
    timeout = 0;
  }
};
const postMessage = message => {
  if (!instance) {
    throw TypedError('Init_IframeBlocked');
  }
  instance.contentWindow?.postMessage(message, origin);
};
const iframe_clearTimeout = () => {
  window.clearTimeout(timeout);
};
const initIframeLogger = () => {
  const logWriterFactory = () => ({
    add: message => {
      postMessage({
        type: IFRAME.LOG,
        payload: message
      });
    }
  });
  setLogWriter(logWriterFactory);
};
;// ../utils/src/scheduleAction.ts
// Ignored when attempts is AttemptParams[]

const SCHEDULE_ACTION_ABORTED_ERROR_MESSAGE = 'Aborted by signal';
class RejectWhenAbortedError extends Error {
  constructor() {
    super(SCHEDULE_ACTION_ABORTED_ERROR_MESSAGE);
  }
}
const isArray = attempts => Array.isArray(attempts);
const resolveAfterMs = (ms, clear) => new Promise((resolve, reject) => {
  const errorSignal = new RejectWhenAbortedError();
  if (clear.aborted) return reject(errorSignal);
  if (ms === undefined) return resolve();
  // eslint-disable-next-line prefer-const
  let timeout;
  const onClear = () => {
    clearTimeout(timeout);
    clear.removeEventListener('abort', onClear);
    reject(errorSignal);
  };
  timeout = setTimeout(() => {
    clear.removeEventListener('abort', onClear);
    resolve();
  }, ms);
  clear.addEventListener('abort', onClear);
});
const rejectAfterMs = (ms, reason, clear) => new Promise((_, reject) => {
  const errorSignal = new RejectWhenAbortedError();
  if (clear.aborted) return reject(errorSignal);
  // eslint-disable-next-line prefer-const
  let timeout;
  const onClear = () => {
    clearTimeout(timeout);
    clear.removeEventListener('abort', onClear);
    reject(errorSignal);
  };
  timeout = setTimeout(() => {
    clear.removeEventListener('abort', onClear);
    reject(reason);
  }, ms);
  clear.addEventListener('abort', onClear);
});
const maybeRejectAfterMs = (ms, reason, clear) => ms === undefined ? [] : [rejectAfterMs(ms, reason, clear)];
const rejectWhenAborted = (signal, clear) => new Promise((_, reject) => {
  const errorSignal = new RejectWhenAbortedError();
  if (clear.aborted) return reject(errorSignal);
  if (signal?.aborted) return reject(errorSignal);
  const onAbort = () => reject(errorSignal);
  signal?.addEventListener('abort', onAbort);
  const onClear = () => {
    signal?.removeEventListener('abort', onAbort);
    clear.removeEventListener('abort', onClear);
    reject(errorSignal);
  };
  clear.addEventListener('abort', onClear);
});
const resolveAction = async (action, clear) => {
  const aborter = new AbortController();
  if (clear.aborted) aborter.abort();
  const onClear = () => {
    clear.removeEventListener('abort', onClear);
    aborter.abort();
  };
  clear.addEventListener('abort', onClear);
  try {
    return await new Promise(resolve => resolve(action(aborter.signal)));
  } finally {
    if (!clear.aborted) clear.removeEventListener('abort', onClear);
  }
};
const attemptLoop = async (attempts, attempt, failure, clear) => {
  // Tries only (attempts - 1) times, because the last attempt throws its error
  for (let a = 0; a < attempts - 1; a++) {
    if (clear.aborted) break;
    const aborter = new AbortController();
    const onClear = () => aborter.abort();
    clear.addEventListener('abort', onClear);
    try {
      return await attempt(a, aborter.signal);
    } catch (error) {
      onClear();
      await failure(a, error);
    } finally {
      clear.removeEventListener('abort', onClear);
    }
  }
  return clear.aborted ? Promise.reject(new RejectWhenAbortedError()) : attempt(attempts - 1, clear);
};
const SCHEDULE_ACTION_TIMEOUT_ERROR_MESSAGE = 'Aborted by timeout';
class ScheduleActionTimeoutError extends Error {
  constructor() {
    super(SCHEDULE_ACTION_TIMEOUT_ERROR_MESSAGE);
  }
}
const SCHEDULE_ACTION_DEADLINE_ERROR_MESSAGE = 'Aborted by deadline';
class ScheduleActionDeadlineError extends Error {
  constructor() {
    super(SCHEDULE_ACTION_DEADLINE_ERROR_MESSAGE);
  }
}
const scheduleAction = async (action, params) => {
  const {
    signal,
    delay,
    attempts,
    timeout,
    deadline,
    gap,
    attemptFailureHandler
  } = params;
  const deadlineMs = deadline && deadline - Date.now();
  const attemptCount = isArray(attempts) ? attempts.length : attempts ?? (deadline ? Infinity : 1);
  const clearAborter = new AbortController();
  const clear = clearAborter.signal;
  const getParams = isArray(attempts) ? attempt => attempts[attempt] : () => ({
    timeout,
    gap
  });
  const errorDeadline = new ScheduleActionDeadlineError();
  const errorTimeout = new ScheduleActionTimeoutError();
  const graceful = params.graceful && signal;
  const actionAborter = new AbortController();
  if (graceful) {
    if (signal.aborted) {
      actionAborter.abort();
    } else {
      const onAbort = () => {
        signal.removeEventListener('abort', onAbort);
        clear.removeEventListener('abort', onAbort);
        actionAborter.abort();
      };
      signal.addEventListener('abort', onAbort);
      clear.addEventListener('abort', onAbort);
    }
  }
  try {
    return await Promise.race([...(graceful ? [] : [rejectWhenAborted(signal, clear)]), ...maybeRejectAfterMs(deadlineMs, errorDeadline, clear), resolveAfterMs(delay, clear).then(() => attemptLoop(attemptCount, (attempt, abort) => Promise.race([...maybeRejectAfterMs(getParams(attempt).timeout, errorTimeout, clear), resolveAction(action, abort)]), (attempt, error) => {
      const errorHandlerResult = attemptFailureHandler?.(error);
      return errorHandlerResult ? Promise.reject(errorHandlerResult) : resolveAfterMs(getParams(attempt).gap ?? 0, clear);
    }, graceful ? actionAborter.signal : clear))]);
  } finally {
    clearAborter.abort();
  }
};
;// ./src/popup/showPopupRequest.ts
// origin: https://github.com/trezor/connect/blob/develop/src/js/popup/showPopupRequest.js

const LAYER_ID = 'TrezorConnectInteractionLayer';
const HTML = `
    <div class="trezorconnect-container" id="${LAYER_ID}">
        <div class="trezorconnect-window">
            <div class="trezorconnect-head">
                <svg class="trezorconnect-logo" x="0px" y="0px" viewBox="0 0 163.7 41.9" width="78px" height="20px" preserveAspectRatio="xMinYMin meet">
                    <polygon points="101.1,12.8 118.2,12.8 118.2,17.3 108.9,29.9 118.2,29.9 118.2,35.2 101.1,35.2 101.1,30.7 110.4,18.1 101.1,18.1"/>
                    <path d="M158.8,26.9c2.1-0.8,4.3-2.9,4.3-6.6c0-4.5-3.1-7.4-7.7-7.4h-10.5v22.3h5.8v-7.5h2.2l4.1,7.5h6.7L158.8,26.9z M154.7,22.5 h-4V18h4c1.5,0,2.5,0.9,2.5,2.2C157.2,21.6,156.2,22.5,154.7,22.5z"/>
                    <path d="M130.8,12.5c-6.8,0-11.6,4.9-11.6,11.5s4.9,11.5,11.6,11.5s11.7-4.9,11.7-11.5S137.6,12.5,130.8,12.5z M130.8,30.3 c-3.4,0-5.7-2.6-5.7-6.3c0-3.8,2.3-6.3,5.7-6.3c3.4,0,5.8,2.6,5.8,6.3C136.6,27.7,134.2,30.3,130.8,30.3z"/>
                    <polygon points="82.1,12.8 98.3,12.8 98.3,18 87.9,18 87.9,21.3 98,21.3 98,26.4 87.9,26.4 87.9,30 98.3,30 98.3,35.2 82.1,35.2 "/>
                    <path d="M24.6,9.7C24.6,4.4,20,0,14.4,0S4.2,4.4,4.2,9.7v3.1H0v22.3h0l14.4,6.7l14.4-6.7h0V12.9h-4.2V9.7z M9.4,9.7 c0-2.5,2.2-4.5,5-4.5s5,2,5,4.5v3.1H9.4V9.7z M23,31.5l-8.6,4l-8.6-4V18.1H23V31.5z"/>
                    <path d="M79.4,20.3c0-4.5-3.1-7.4-7.7-7.4H61.2v22.3H67v-7.5h2.2l4.1,7.5H80l-4.9-8.3C77.2,26.1,79.4,24,79.4,20.3z M71,22.5h-4V18 h4c1.5,0,2.5,0.9,2.5,2.2C73.5,21.6,72.5,22.5,71,22.5z"/>
                    <polygon points="40.5,12.8 58.6,12.8 58.6,18.1 52.4,18.1 52.4,35.2 46.6,35.2 46.6,18.1 40.5,18.1 "/>
                </svg>
                <div class="trezorconnect-close">
                    <svg x="0px" y="0px" viewBox="24 24 60 60" width="24px" height="24px" preserveAspectRatio="xMinYMin meet">
                        <polygon class="st0" points="40,67.9 42.1,70 55,57.1 67.9,70 70,67.9 57.1,55 70,42.1 67.9,40 55,52.9 42.1,40 40,42.1 52.9,55 "/>
                    </svg>
                </div>
            </div>
            <div class="trezorconnect-body">
                <h3>Popup was blocked</h3>
                <p>Please click to "Continue" to open popup manually</p>
                <button class="trezorconnect-open">Continue</button>
            </div>
        </div>
    </div>
`;
const showPopupRequest = (open, cancel) => {
  if (document.getElementById(LAYER_ID)) {
    return;
  }
  const div = document.createElement('div');
  div.id = LAYER_ID;
  div.className = 'trezorconnect-container';
  div.innerHTML = HTML;
  if (document.body) {
    document.body.appendChild(div);
  }
  const button = div.getElementsByClassName('trezorconnect-open')[0];
  button.onclick = () => {
    open();
    if (document.body) {
      document.body.removeChild(div);
    }
  };
  const close = div.getElementsByClassName('trezorconnect-close')[0];
  close.onclick = () => {
    cancel();
    if (document.body) {
      document.body.removeChild(div);
    }
  };
};
;// ../utils/src/typedEventEmitter.ts
/*
Usage example:
type EventMap = {
    obj: { id: string };
    primitive: boolean | number | string | symbol;
    noArgs: undefined;
    multipleArgs: (a: number, b: string, c: boolean) => void;
    [type: `dynamic/${string}`]: boolean;
};
*/


// NOTE: case 1. looks like case 4. but works differently. the order matters

// 4. default

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class TypedEmitter extends events.EventEmitter {
  // implement at least one function
  listenerCount(eventName) {
    return super.listenerCount(eventName);
  }
}
;// ../connect-common/src/storage.ts
// https://github.com/trezor/connect/blob/develop/src/js/storage/index.js


const storageVersion = 2;
const storageName = `storage_v${storageVersion}`;

/**
 * remembered:
 *  - physical device from webusb pairing dialogue
 *  - passphrase to be used
 */

// TODO: move storage somewhere else. Having it here brings couple of problems:
// - We can not import types from connect (would cause cyclic dependency)
// - it has here dependency on window object, not good

const getEmptyState = () => ({
  origin: {}
});
let memoryStorage = getEmptyState();
const getPermanentStorage = () => {
  const ls = localStorage.getItem(storageName);
  return ls ? JSON.parse(ls) : getEmptyState();
};
class Storage extends TypedEmitter {
  save(getNewState, temporary = false) {
    if (temporary || !__webpack_require__.g.window) {
      memoryStorage = getNewState(memoryStorage);
      return;
    }
    try {
      const newState = getNewState(getPermanentStorage());
      localStorage.setItem(storageName, JSON.stringify(newState));
      this.emit('changed', newState);
    } catch {
      // memory storage is fallback of the last resort
      console.warn('long term storage not available');
      memoryStorage = getNewState(memoryStorage);
    }
  }
  saveForOrigin(getNewState, origin, temporary = false) {
    this.save(state => ({
      ...state,
      origin: {
        ...state.origin,
        [origin]: getNewState(state.origin?.[origin] || {})
      }
    }), temporary);
  }
  load(temporary = false) {
    if (temporary || !__webpack_require__.g?.window?.localStorage) {
      return memoryStorage;
    }
    try {
      return getPermanentStorage();
    } catch {
      // memory storage is fallback of the last resort
      console.warn('long term storage not available');
      return memoryStorage;
    }
  }
  loadForOrigin(origin, temporary = false) {
    const state = this.load(temporary);
    return state.origin?.[origin] || {};
  }
}
const storage = new Storage();

;// ../connect-common/src/messageChannel/abstract.ts
/**
 * IMPORTS WARNING
 * this file is bundled into content script so be careful what you are importing not to bloat the bundle
 */



// TODO: so logger should be probably moved to connect common, or this file should be moved to connect
// import type { Log } from '@trezor/connect/src/utils/debug';

/**
 * concepts:
 * - it handshakes automatically with the other side of the channel
 * - it queues messages fired before handshake and sends them after handshake is done
 */
class AbstractMessageChannel extends TypedEmitter {
  messagePromises = {};
  /** queue of messages that were scheduled before handshake */
  messagesQueue = [];
  messageID = 0;
  isConnected = false;
  handshakeMaxRetries = 5;
  handshakeRetryInterval = 2000;

  /**
   * function that passes data to the other side of the channel
   */

  /**
   * channel identifiers that pairs AbstractMessageChannel instances on sending and receiving end together
   */

  constructor({
    sendFn,
    channel,
    logger,
    lazyHandshake = false,
    legacyMode = false
  }) {
    super();
    this.channel = channel;
    this.sendFn = sendFn;
    this.lazyHandshake = lazyHandshake;
    this.legacyMode = legacyMode;
    this.logger = logger;
  }

  /**
   * initiates handshake sequence with peer. resolves after communication with peer is established
   */
  init() {
    if (!this.handshakeFinished) {
      this.handshakeFinished = createDeferred();
      if (this.legacyMode) {
        // Bypass handshake for communication with legacy components
        // We add a delay for enough time for the other side to be ready
        setTimeout(() => {
          this.handshakeFinished?.resolve();
        }, 500);
      }
      if (!this.lazyHandshake) {
        // When `lazyHandshake` handshakeWithPeer will start when received channel-handshake-request.
        this.handshakeWithPeer();
      }
    }
    return this.handshakeFinished.promise;
  }

  /**
   * handshake between both parties of the channel.
   * both parties initiate handshake procedure and keep asking over time in a loop until they time out or receive confirmation from peer
   */
  handshakeWithPeer() {
    this.logger?.log(this.channel.here, 'handshake');
    return scheduleAction(async () => {
      this.postMessage({
        type: 'channel-handshake-request',
        data: {
          success: true,
          payload: undefined
        }
      }, {
        usePromise: false,
        useQueue: false
      });
      await this.handshakeFinished?.promise;
    }, {
      attempts: this.handshakeMaxRetries,
      timeout: this.handshakeRetryInterval
    }).then(() => {
      this.logger?.log(this.channel.here, 'handshake confirmed');
      this.messagesQueue.forEach(message => {
        message.channel = this.channel;
        this.sendFn(message);
      });
      this.messagesQueue = [];
    }).catch(() => {
      this.handshakeFinished?.reject(new Error('handshake failed'));
      this.handshakeFinished = undefined;
    });
  }

  /**
   * message received from communication channel in descendants of this class
   * should be handled by this common onMessage method
   */
  onMessage(_message) {
    // Older code used to send message as a data property of the message object.
    // This is a workaround to keep backward compatibility.
    let message = _message;
    if (this.legacyMode && message.type === undefined && 'data' in message && typeof message.data === 'object' && message.data !== null && 'type' in message.data && typeof message.data.type === 'string') {
      // @ts-expect-error
      message = message.data;
    }
    const {
      channel,
      id,
      type,
      ...data
    } = message;

    // Don't verify channel in legacy mode
    if (!this.legacyMode) {
      if (!channel?.peer || channel.peer !== this.channel.here) {
        // To wrong peer
        return;
      }
      if (!channel?.here || this.channel.peer !== channel.here) {
        // From wrong peer
        return;
      }
    }
    if (type === 'channel-handshake-request') {
      this.postMessage({
        type: 'channel-handshake-confirm',
        data: {
          success: true,
          payload: undefined
        }
      }, {
        usePromise: false,
        useQueue: false
      });
      if (this.lazyHandshake) {
        // When received channel-handshake-request in lazyHandshake mode we start from this side.
        this.handshakeWithPeer();
      }
      return;
    }
    if (type === 'channel-handshake-confirm') {
      this.handshakeFinished?.resolve(undefined);
      return;
    }
    if (this.messagePromises[id]) {
      this.messagePromises[id].resolve({
        id,
        ...data
      });
      delete this.messagePromises[id];
    }
    const messagePromisesLength = Object.keys(this.messagePromises).length;
    if (messagePromisesLength > 5) {
      this.logger?.warn(`too many message promises (${messagePromisesLength}). this feels unexpected!`);
    }

    // @ts-expect-error TS complains for odd reasons
    this.emit('message', message);
  }

  // todo: outgoing messages should be typed
  postMessage(message, {
    usePromise = true,
    useQueue = true
  } = {}) {
    message.channel = this.channel;
    if (!usePromise) {
      try {
        this.sendFn(message);
      } catch {
        if (useQueue) {
          this.messagesQueue.push(message);
        }
      }
      return;
    }
    this.messageID++;
    message.id = this.messageID;
    this.messagePromises[message.id] = createDeferred();
    try {
      this.sendFn(message);
    } catch {
      if (useQueue) {
        this.messagesQueue.push(message);
      }
    }
    return this.messagePromises[message.id].promise;
  }
  resolveMessagePromises(resolvePayload) {
    // This is used when we know that the connection has been interrupted but there might be something waiting for it.
    Object.keys(this.messagePromises).forEach(id => this.messagePromises[id].resolve({
      id,
      payload: resolvePayload
    }));
  }
  clear() {
    this.handshakeFinished = undefined;
  }
}
;// ../connect-common/src/map-releases.ts
// THIS FILE IS AUTO-GENERATED BY a build script. DO NOT EDIT.
const firmwareAssets = {
  release: {
    'releases.v1': __webpack_require__(9302)
  },
  t1b1: {
    bitcoinonly: {
      't1b1-1.10.0-bitcoinonly': __webpack_require__(3549),
      't1b1-1.10.1-bitcoinonly': __webpack_require__(8590),
      't1b1-1.10.2-bitcoinonly': __webpack_require__(3199),
      't1b1-1.10.3-bitcoinonly': __webpack_require__(3648),
      't1b1-1.10.4-bitcoinonly': __webpack_require__(1673),
      't1b1-1.10.5-bitcoinonly': __webpack_require__(6634),
      't1b1-1.11.1-bitcoinonly': __webpack_require__(4817),
      't1b1-1.11.2-bitcoinonly': __webpack_require__(2644),
      't1b1-1.12.1-bitcoinonly': __webpack_require__(2096),
      't1b1-1.13.0-bitcoinonly': __webpack_require__(900),
      't1b1-1.13.1-bitcoinonly': __webpack_require__(6915),
      't1b1-1.8.3-bitcoinonly': __webpack_require__(7359),
      't1b1-1.9.0-bitcoinonly': __webpack_require__(6889),
      't1b1-1.9.1-bitcoinonly': __webpack_require__(9482),
      't1b1-1.9.2-bitcoinonly': __webpack_require__(6059),
      't1b1-1.9.3-bitcoinonly': __webpack_require__(3724),
      't1b1-1.9.4-bitcoinonly': __webpack_require__(4877)
    },
    universal: {
      't1b1-1.10.0-universal': __webpack_require__(7897),
      't1b1-1.10.1-universal': __webpack_require__(4266),
      't1b1-1.10.2-universal': __webpack_require__(8895),
      't1b1-1.10.3-universal': __webpack_require__(3480),
      't1b1-1.10.4-universal': __webpack_require__(5653),
      't1b1-1.10.5-universal': __webpack_require__(198),
      't1b1-1.11.1-universal': __webpack_require__(3789),
      't1b1-1.11.2-universal': __webpack_require__(2860),
      't1b1-1.12.1-universal': __webpack_require__(9336),
      't1b1-1.13.0-universal': __webpack_require__(1052),
      't1b1-1.13.1-universal': __webpack_require__(1923),
      't1b1-1.3.6-universal': __webpack_require__(5763),
      't1b1-1.4.0-universal': __webpack_require__(3472),
      't1b1-1.4.1-universal': __webpack_require__(727),
      't1b1-1.4.2-universal': __webpack_require__(1474),
      't1b1-1.5.0-universal': __webpack_require__(4019),
      't1b1-1.5.1-universal': __webpack_require__(3148),
      't1b1-1.5.2-universal': __webpack_require__(7485),
      't1b1-1.6.0-universal': __webpack_require__(1906),
      't1b1-1.6.1-universal': __webpack_require__(2385),
      't1b1-1.6.2-universal': __webpack_require__(16),
      't1b1-1.6.3-universal': __webpack_require__(8007),
      't1b1-1.7.1-universal': __webpack_require__(9678),
      't1b1-1.7.2-universal': __webpack_require__(4995),
      't1b1-1.7.3-universal': __webpack_require__(8492),
      't1b1-1.8.0-universal': __webpack_require__(9948),
      't1b1-1.8.1-universal': __webpack_require__(3283),
      't1b1-1.8.2-universal': __webpack_require__(2366),
      't1b1-1.8.3-universal': __webpack_require__(8637),
      't1b1-1.9.0-universal': __webpack_require__(3663),
      't1b1-1.9.1-universal': __webpack_require__(7704),
      't1b1-1.9.2-universal': __webpack_require__(8025),
      't1b1-1.9.3-universal': __webpack_require__(2090),
      't1b1-1.9.4-universal': __webpack_require__(91)
    }
  },
  t2b1: {
    bitcoinonly: {
      't2b1-2.6.3-bitcoinonly': __webpack_require__(5570),
      't2b1-2.6.4-bitcoinonly': __webpack_require__(5223),
      't2b1-2.7.0-bitcoinonly': __webpack_require__(8920),
      't2b1-2.7.2-bitcoinonly': __webpack_require__(3174),
      't2b1-2.8.0-bitcoinonly': __webpack_require__(8453),
      't2b1-2.8.10-bitcoinonly': __webpack_require__(6600),
      't2b1-2.8.7-bitcoinonly': __webpack_require__(7988),
      't2b1-2.8.9-bitcoinonly': __webpack_require__(9502)
    },
    universal: {
      't2b1-2.6.3-universal': __webpack_require__(7900),
      't2b1-2.6.4-universal': __webpack_require__(3617),
      't2b1-2.7.0-universal': __webpack_require__(8098),
      't2b1-2.7.2-universal': __webpack_require__(9168),
      't2b1-2.8.0-universal': __webpack_require__(639),
      't2b1-2.8.10-universal': __webpack_require__(7984),
      't2b1-2.8.7-universal': __webpack_require__(6614),
      't2b1-2.8.9-universal': __webpack_require__(4304)
    }
  },
  t2t1: {
    bitcoinonly: {
      't2t1-2.1.5-bitcoinonly': __webpack_require__(3701),
      't2t1-2.1.6-bitcoinonly': __webpack_require__(8328),
      't2t1-2.1.7-bitcoinonly': __webpack_require__(7367),
      't2t1-2.1.8-bitcoinonly': __webpack_require__(5946),
      't2t1-2.3.0-bitcoinonly': __webpack_require__(8996),
      't2t1-2.3.1-bitcoinonly': __webpack_require__(8483),
      't2t1-2.3.2-bitcoinonly': __webpack_require__(8962),
      't2t1-2.3.3-bitcoinonly': __webpack_require__(3841),
      't2t1-2.3.4-bitcoinonly': __webpack_require__(7912),
      't2t1-2.3.5-bitcoinonly': __webpack_require__(1895),
      't2t1-2.3.6-bitcoinonly': __webpack_require__(5814),
      't2t1-2.4.0-bitcoinonly': __webpack_require__(6545),
      't2t1-2.4.1-bitcoinonly': __webpack_require__(3186),
      't2t1-2.4.2-bitcoinonly': __webpack_require__(4835),
      't2t1-2.4.3-bitcoinonly': __webpack_require__(7700),
      't2t1-2.5.1-bitcoinonly': __webpack_require__(821),
      't2t1-2.5.2-bitcoinonly': __webpack_require__(2472),
      't2t1-2.5.3-bitcoinonly': __webpack_require__(2759),
      't2t1-2.6.0-bitcoinonly': __webpack_require__(2931),
      't2t1-2.6.3-bitcoinonly': __webpack_require__(1698),
      't2t1-2.6.4-bitcoinonly': __webpack_require__(263),
      't2t1-2.7.0-bitcoinonly': __webpack_require__(9928),
      't2t1-2.7.2-bitcoinonly': __webpack_require__(8134),
      't2t1-2.8.1-bitcoinonly': __webpack_require__(9734),
      't2t1-2.8.10-bitcoinonly': __webpack_require__(8872),
      't2t1-2.8.7-bitcoinonly': __webpack_require__(7892),
      't2t1-2.8.8-bitcoinonly': __webpack_require__(3005),
      't2t1-2.8.9-bitcoinonly': __webpack_require__(8622)
    },
    universal: {
      't2t1-2.0.10-universal': __webpack_require__(2780),
      't2t1-2.0.5-universal': __webpack_require__(8352),
      't2t1-2.0.6-universal': __webpack_require__(4849),
      't2t1-2.0.7-universal': __webpack_require__(3794),
      't2t1-2.0.8-universal': __webpack_require__(3467),
      't2t1-2.0.9-universal': __webpack_require__(1652),
      't2t1-2.1.0-universal': __webpack_require__(5552),
      't2t1-2.1.1-universal': __webpack_require__(3191),
      't2t1-2.1.4-universal': __webpack_require__(7468),
      't2t1-2.1.5-universal': __webpack_require__(3971),
      't2t1-2.1.6-universal': __webpack_require__(8654),
      't2t1-2.1.7-universal': __webpack_require__(9821),
      't2t1-2.1.8-universal': __webpack_require__(5032),
      't2t1-2.3.0-universal': __webpack_require__(8546),
      't2t1-2.3.1-universal': __webpack_require__(4129),
      't2t1-2.3.2-universal': __webpack_require__(544),
      't2t1-2.3.3-universal': __webpack_require__(4151),
      't2t1-2.3.4-universal': __webpack_require__(2958),
      't2t1-2.3.5-universal': __webpack_require__(1709),
      't2t1-2.3.6-universal': __webpack_require__(5564),
      't2t1-2.4.0-universal': __webpack_require__(1847),
      't2t1-2.4.1-universal': __webpack_require__(4704),
      't2t1-2.4.2-universal': __webpack_require__(1201),
      't2t1-2.4.3-universal': __webpack_require__(1413),
      't2t1-2.5.1-universal': __webpack_require__(7195),
      't2t1-2.5.2-universal': __webpack_require__(7702),
      't2t1-2.5.3-universal': __webpack_require__(9653),
      't2t1-2.6.0-universal': __webpack_require__(6081),
      't2t1-2.6.3-universal': __webpack_require__(5120),
      't2t1-2.6.4-universal': __webpack_require__(9405),
      't2t1-2.7.0-universal': __webpack_require__(1014),
      't2t1-2.7.2-universal': __webpack_require__(8724),
      't2t1-2.8.1-universal': __webpack_require__(6724),
      't2t1-2.8.10-universal': __webpack_require__(6980),
      't2t1-2.8.7-universal': __webpack_require__(9034),
      't2t1-2.8.8-universal': __webpack_require__(659),
      't2t1-2.8.9-universal': __webpack_require__(5356)
    }
  },
  t3b1: {
    bitcoinonly: {
      't3b1-2.8.10-bitcoinonly': __webpack_require__(1174),
      't3b1-2.8.3-bitcoinonly': __webpack_require__(3118),
      't3b1-2.8.7-bitcoinonly': __webpack_require__(2778),
      't3b1-2.8.9-bitcoinonly': __webpack_require__(5160)
    },
    universal: {
      't3b1-2.8.10-universal': __webpack_require__(6746),
      't3b1-2.8.3-universal': __webpack_require__(260),
      't3b1-2.8.7-universal': __webpack_require__(7816),
      't3b1-2.8.9-universal': __webpack_require__(1854)
    }
  },
  t3t1: {
    bitcoinonly: {
      't3t1-2.7.2-bitcoinonly': __webpack_require__(8864),
      't3t1-2.8.0-bitcoinonly': __webpack_require__(1231),
      't3t1-2.8.1-bitcoinonly': __webpack_require__(5328),
      't3t1-2.8.10-bitcoinonly': __webpack_require__(6),
      't3t1-2.8.3-bitcoinonly': __webpack_require__(6622),
      't3t1-2.8.7-bitcoinonly': __webpack_require__(8314),
      't3t1-2.8.9-bitcoinonly': __webpack_require__(3960)
    },
    universal: {
      't3t1-2.7.2-universal': __webpack_require__(7730),
      't3t1-2.8.0-universal': __webpack_require__(278),
      't3t1-2.8.1-universal': __webpack_require__(8730),
      't3t1-2.8.10-universal': __webpack_require__(1814),
      't3t1-2.8.3-universal': __webpack_require__(6792),
      't3t1-2.8.7-universal': __webpack_require__(8036),
      't3t1-2.8.9-universal': __webpack_require__(3826)
    }
  }
};
;// ../connect-common/src/index.ts




;// ./src/channels/serviceworker-window.ts


/**
 * Communication channel between:
 * - here: chrome message port (in service worker)
 * - peer: window.onMessage in trezor-content-script
 */
class ServiceWorkerWindowChannel extends AbstractMessageChannel {
  constructor({
    name,
    channel,
    logger,
    lazyHandshake,
    legacyMode,
    allowSelfOrigin = false,
    currentId
  }) {
    super({
      channel,
      sendFn: message => {
        if (!this.port) throw new Error('port not assigned');
        this.port.postMessage(message);
      },
      logger,
      lazyHandshake,
      legacyMode
    });
    this.name = name;
    this.allowSelfOrigin = allowSelfOrigin;
    this.currentId = currentId;
    this.connect();
  }
  connect() {
    chrome.runtime.onConnect.addListener(port => {
      if (port.name !== this.name) return;
      // Ignore port if name does match, but port created by different popup
      if (this.currentId?.() && this.currentId?.() !== port.sender?.tab?.id) return;
      this.port = port;
      this.port.onMessage.addListener((message, {
        sender
      }) => {
        if (!sender) {
          this.logger?.error('service-worker-window', 'no sender');
          return;
        }
        const {
          origin
        } = sender;
        const whitelist = ['https://connect.trezor.io', 'https://staging-connect.trezor.io', 'https://suite.corp.sldev.cz', 'https://dev.suite.sldev.cz', 'http://localhost:8088'];

        // If service worker is running in web extension and other env of this webextension
        // want to communicate with service worker it should be whitelisted.
        const webextensionId = chrome?.runtime?.id;
        if (webextensionId) {
          whitelist.push(`chrome-extension://${webextensionId}`);
        }
        // For Firefox the webextensionId is different from the URL
        const webextensionUrl = chrome?.runtime?.getURL('');
        if (webextensionUrl) {
          // Without trailing slash
          whitelist.push(webextensionUrl.slice(0, -1));
        }
        if (!origin) {
          this.logger?.error('connect-webextension/messageChannel/extensionPort/onMessage', 'no origin');
          return;
        }
        if (!whitelist.includes(origin)) {
          this.logger?.error('connect-webextension/messageChannel/extensionPort/onMessage', 'origin not whitelisted', origin);
          return;
        }

        // TODO: not completely sure that is necessary to prevent self origin communication sometimes.
        if (origin === self.origin && !this.allowSelfOrigin) {
          return;
        }
        this.onMessage(message);
      });
    });
    this.isConnected = true;
  }
  disconnect() {
    if (!this.isConnected) return;
    this.port?.disconnect();
    this.clear();
    this.isConnected = false;
  }
}
;// ./src/channels/window-window.ts


/**
 * Communication channel between:
 * - here: window.postMessage
 * - peer: window.onMessage
 */

class WindowWindowChannel extends AbstractMessageChannel {
  constructor({
    windowHere,
    windowPeer,
    channel,
    logger,
    origin,
    legacyMode
  }) {
    super({
      channel,
      sendFn: message => {
        windowPeer()?.postMessage(message, origin);
      },
      logger,
      legacyMode
    });
    this._listener = this.listener.bind(this);
    this._windowHere = windowHere;
    this.connect();
  }
  listener(event) {
    const message = {
      ...event.data,
      success: true,
      origin: event.origin,
      payload: event.data.payload || {},
      // This is added for compatibility when communicating with iframe/popup that doesn't have channel defined yet
      channel: event.data.channel || {
        peer: this.channel.here,
        here: this.channel.peer
      }
    };
    this.onMessage(message);
  }
  connect() {
    this._windowHere.addEventListener('message', this._listener);
    this.isConnected = true;
  }
  disconnect() {
    if (!this.isConnected) return;
    this._windowHere.removeEventListener('message', this._listener);
    this.isConnected = false;
  }
}
;// ./src/popup/index.ts
// origin: https://github.com/trezor/connect/blob/develop/src/js/popup/PopupManager.js










// Util
const checkIfTabExists = tabId => new Promise(resolve => {
  if (!tabId) return resolve(false);
  function callback() {
    if (chrome.runtime.lastError) {
      resolve(false);
    } else {
      // Tab exists
      resolve(true);
    }
  }
  chrome.tabs.get(tabId, callback);
});

// Event `POPUP_REQUEST_TIMEOUT` is used to close Popup window when there was no handshake from iframe.
const POPUP_REQUEST_TIMEOUT = 850;
const POPUP_CLOSE_INTERVAL = 500;
const POPUP_OPEN_TIMEOUT = 5000;
class PopupManager extends (events_default()) {
  locked = false;
  extensionTabId = 0;
  constructor(settings, {
    logger
  }) {
    super();
    this.settings = settings;
    this.origin = getOrigin(settings.popupSrc);
    this.logger = logger;
    if (this.isWebExtensionWithTab()) {
      this.channel = new ServiceWorkerWindowChannel({
        name: 'trezor-connect',
        channel: {
          here: '@trezor/connect-webextension',
          peer: '@trezor/connect-content-script'
        },
        logger,
        currentId: () => {
          if (this.popupWindow?.mode === 'tab') return this.popupWindow?.tab.id;
        },
        legacyMode: !this.settings.useCoreInPopup
      });
    } else {
      this.channel = new WindowWindowChannel({
        windowHere: window,
        windowPeer: () => {
          if (this.popupWindow?.mode === 'window') return this.popupWindow?.window;
        },
        channel: {
          here: '@trezor/connect-web',
          peer: '@trezor/connect-popup'
        },
        logger,
        origin: this.origin,
        legacyMode: !this.settings.useCoreInPopup
      });
    }
    if (!this.settings.useCoreInPopup) {
      // If not in core, we need to create a channel for the iframe
      this.iframeHandshakePromise = createDeferred(IFRAME.LOADED);
      this.channelIframe = new WindowWindowChannel({
        windowHere: window,
        windowPeer: () => window,
        channel: {
          here: '@trezor/connect-web',
          peer: '@trezor/connect-iframe'
        },
        logger,
        origin: this.origin
      });
      this.channelIframe?.on('message', this.handleMessage.bind(this));
    }
    if (this.settings.useCoreInPopup) {
      // Core mode
      this.handshakePromise = createDeferred();
      this.channel.on('message', this.handleCoreMessage.bind(this));
      return;
    } else if (this.isWebExtensionWithTab()) {
      // Webextension iframe
      this.channel.on('message', this.handleExtensionMessage.bind(this));
    } else {
      // Web
      this.channel.on('message', this.handleMessage.bind(this));
    }
    this.channel.init();
  }
  async request() {
    // popup request

    // check if current popup window is still open
    if (this.settings.useCoreInPopup && this.popupWindow?.mode === 'tab') {
      const currentPopupExists = await checkIfTabExists(this.popupWindow?.tab?.id);
      if (!currentPopupExists) {
        this.clear();
      }
    }

    // bring popup window to front
    if (this.locked) {
      if (this.popupWindow?.mode === 'tab' && this.popupWindow.tab.id) {
        chrome.tabs.update(this.popupWindow.tab.id, {
          active: true
        });
      } else if (this.popupWindow?.mode === 'window') {
        this.popupWindow.window.focus();
      }
      return;
    }

    // When requesting a popup window and there is a reference to popup window and it is not locked
    // we close it so we can open a new one.
    // This is necessary when popup window is in error state and we want to open a new one.
    if (this.popupWindow && !this.locked) {
      this.close();
    }
    const openFn = this.open.bind(this);
    this.locked = true;
    const timeout = this.settings.env === 'webextension' ? 1 : POPUP_REQUEST_TIMEOUT;
    this.requestTimeout = setTimeout(() => {
      this.requestTimeout = undefined;
      openFn();
    }, timeout);
  }
  unlock() {
    this.locked = false;
  }
  open() {
    const src = this.settings.popupSrc;
    this.popupPromise = createDeferred(POPUP.LOADED);
    const url = this.buildPopupUrl(src);
    this.openWrapper(url);
    this.closeInterval = setInterval(() => {
      if (!this.popupWindow) return;
      if (this.popupWindow.mode === 'tab' && this.popupWindow.tab.id) {
        chrome.tabs.get(this.popupWindow.tab.id, tab => {
          if (!tab) {
            // If no reference to popup window, it was closed by user or by this.close() method.
            this.emitClosed();
            this.clear();
          }
        });
      } else if (this.popupWindow.mode === 'window' && this.popupWindow.window.closed) {
        this.clear();
        this.emitClosed();
      }
    }, POPUP_CLOSE_INTERVAL);
    if (this.settings.useCoreInPopup) {
      // Open timeout not used in Core mode, we can't run showPopupRequest with no DOM
      return;
    }

    // open timeout will be cancelled by POPUP.BOOTSTRAP message
    this.openTimeout = setTimeout(() => {
      this.clear();
      showPopupRequest(this.open.bind(this), () => {
        this.emitClosed();
      });
    }, POPUP_OPEN_TIMEOUT);
  }
  buildPopupUrl(src) {
    const params = new URLSearchParams();
    params.set('version', VERSION);
    params.set('env', this.settings.env);
    // Pass extension ID to popup via query string
    if (this.settings.env === 'webextension' && chrome?.runtime?.id) {
      params.set('extension-id', chrome.runtime.id);
      params.set('cs-ver', CONTENT_SCRIPT_VERSION.toString());
    }
    return src + '?' + params.toString();
  }
  openWrapper(url) {
    if (this.isWebExtensionWithTab()) {
      chrome.windows.getCurrent(currentWindow => {
        this.logger.debug('opening popup. currentWindow: ', currentWindow);
        // Request coming from extension popup,
        // create new window above instead of opening new tab
        if (currentWindow.type !== 'normal') {
          chrome.windows.create({
            url
          }, newWindow => {
            chrome.tabs.query({
              windowId: newWindow?.id,
              active: true
            }, tabs => {
              this.popupWindow = {
                mode: 'tab',
                tab: tabs[0]
              };
              this.injectContentScript(tabs[0].id);
            });
          });
        } else {
          chrome.tabs.query({
            currentWindow: true,
            active: true
          }, tabs => {
            this.extensionTabId = tabs[0].id;
            chrome.tabs.create({
              url,
              index: tabs[0].index + 1
            }, tab => {
              this.popupWindow = {
                mode: 'tab',
                tab
              };
              this.injectContentScript(tab.id);
            });
          });
        }
      });
    } else {
      const windowResult = window.open(url, 'modal');
      if (!windowResult) return;
      this.popupWindow = {
        mode: 'window',
        window: windowResult
      };
    }
    if (!this.channel.isConnected) {
      this.channel.connect();
    }
  }
  injectContentScript = tabId => {
    chrome.permissions.getAll(permissions => {
      if (permissions.permissions?.includes('scripting')) {
        // Retry due to Firefox where the content script is sometimes not injected on the first try
        scheduleAction(() => chrome.scripting.executeScript({
          target: {
            tabId
          },
          // content script is injected into body of func in build time.
          func: () => {
            // <!--content-script-->
          }
        }).then(() => {
          this.logger.debug('content script injected');
        }).catch(error => {
          this.logger.error('content script injection error', error);
          throw error;
        }), {
          attempts: new Array(3).fill({
            timeout: 100
          })
        });
      } else {
        // When permissions for `scripting` are not provided 3rd party integrations have include content-script.js manually.
      }
    });
  };
  handleCoreMessage(message) {
    if (message.type === POPUP.BOOTSTRAP) {
      this.channel.init();
    } else if (message.type === POPUP.LOADED) {
      this.handleMessage(message);
      this.channel.postMessage({
        type: POPUP.INIT,
        payload: {
          settings: this.settings,
          useCore: true
        }
      });
    } else if (message.type === POPUP.CORE_LOADED) {
      this.channel.postMessage({
        type: POPUP.HANDSHAKE,
        // in this case, settings will be validated in popup
        payload: {
          settings: this.settings
        }
      });
      this.handshakePromise?.resolve();
    } else if (message.type === POPUP.CLOSED) {
      this.emitClosed();
    } else if (message.type === POPUP.CONTENT_SCRIPT_LOADED) {
      const {
        contentScriptVersion
      } = message.payload;
      if (contentScriptVersion !== CONTENT_SCRIPT_VERSION) {
        console.warn(`Content script version mismatch. Expected ${CONTENT_SCRIPT_VERSION}, got ${contentScriptVersion}`);
      }
    } else if (message.event === DEVICE_EVENT) {
      this.emit(DEVICE_EVENT, message);
    }
  }
  handleExtensionMessage(data) {
    if (data.type === POPUP.ERROR || data.type === POPUP.LOADED || data.type === POPUP.BOOTSTRAP) {
      this.handleMessage(data);
    } else if (data.type === POPUP.EXTENSION_USB_PERMISSIONS) {
      chrome.tabs.query({
        currentWindow: true,
        active: true
      }, tabs => {
        chrome.tabs.create({
          url: 'trezor-usb-permissions.html',
          index: tabs[0].index + 1
        }, _tab => {
          // do nothing
        });
      });
    } else if (data.type === POPUP.CLOSE_WINDOW) {
      this.clear();
    }
  }
  handleMessage(data) {
    if (data.type === IFRAME.LOADED) {
      this.iframeHandshakePromise?.resolve(data.payload);
    } else if (data.type === POPUP.BOOTSTRAP) {
      // popup is opened properly, now wait for POPUP.LOADED message
      if (this.openTimeout) clearTimeout(this.openTimeout);
    } else if (data.type === POPUP.ERROR && this.popupWindow) {
      // handle popup error
      const errorMessage = data.payload && typeof data.payload.error === 'string' ? data.payload.error : null;
      this.emit(POPUP.CLOSED, errorMessage ? `Popup error: ${errorMessage}` : null);
      this.clear();
    } else if (data.type === POPUP.LOADED) {
      // in case of webextension where bootstrap message is not sent
      if (this.openTimeout) clearTimeout(this.openTimeout);
      if (this.popupPromise) {
        this.popupPromise.resolve();
        this.popupPromise = undefined;
      }
      // popup is successfully loaded
      this.iframeHandshakePromise?.promise.then(payload => {
        // send ConnectSettings to popup
        // note this settings and iframe.ConnectSettings could be different (especially: origin, popup, webusb, debug)
        // now popup is able to load assets
        this.channel.postMessage({
          type: POPUP.INIT,
          payload: {
            ...payload,
            settings: this.settings
          }
        });
      });
    } else if (data.type === POPUP.CANCEL_POPUP_REQUEST) {
      clearTimeout(this.requestTimeout);
      if (this.popupPromise) {
        this.close();
      }
      this.unlock();
    } else if (data.type === UI.CLOSE_UI_WINDOW) {
      this.clear(false);
    }
  }
  clear(focus = true) {
    this.locked = false;
    this.popupPromise = undefined;
    this.handshakePromise = createDeferred();
    if (this.channel) {
      this.channel.disconnect();
    }
    if (this.requestTimeout) {
      clearTimeout(this.requestTimeout);
      this.requestTimeout = undefined;
    }
    if (this.openTimeout) {
      clearTimeout(this.openTimeout);
      this.openTimeout = undefined;
    }
    if (this.closeInterval) {
      clearInterval(this.closeInterval);
      this.closeInterval = undefined;
    }

    // switch to previously focused tab

    if (focus && this.extensionTabId) {
      chrome.tabs.update(this.extensionTabId, {
        active: true
      });
      this.extensionTabId = 0;
    }
  }
  close() {
    if (!this.popupWindow) return;
    this.logger.debug('closing popup');
    if (this.popupWindow.mode === 'tab') {
      let _e = chrome.runtime.lastError;
      if (this.popupWindow.tab.id) {
        chrome.tabs.remove(this.popupWindow.tab.id, () => {
          _e = chrome.runtime.lastError;
          if (_e) {
            this.logger.error('closed with error', _e);
          }
        });
      }
    } else if (this.popupWindow.mode === 'window') {
      this.popupWindow.window.close();
    }
    this.popupWindow = undefined;
    if (this.settings?.useCoreInPopup) {
      this.channel.clear();
    }
  }
  async postMessage(message) {
    // NOTE: This method only seems to be used in one case to show UI.IFRAME_FAILURE
    // Maybe we could handle this in a simpler way?

    // device needs interaction but there is no popup/ui
    // maybe popup request wasn't handled
    // ignore "ui_request_window" type
    if (!this.popupWindow && message.type !== UI.REQUEST_UI_WINDOW && this.openTimeout) {
      this.clear();
      showPopupRequest(this.open.bind(this), () => {
        this.emitClosed();
      });
      return;
    }

    // post message before popup request finalized
    if (this.popupPromise) {
      await this.popupPromise.promise;
    }
    // post message to popup window
    if (this.popupWindow?.mode === 'window') {
      this.popupWindow.window.postMessage(message, this.origin);
    } else if (this.popupWindow?.mode === 'tab') {
      this.channel.postMessage(message);
    }
  }
  isWebExtensionWithTab() {
    // Check if webextension actually has access to chrome.tabs API
    // This is not the case when used in offscreen context
    return this.settings?.env === 'webextension' && typeof chrome !== 'undefined' && typeof chrome?.tabs !== 'undefined';
  }
  emitClosed() {
    if (this.settings?.useCoreInPopup) {
      // When popup is closed we should create a not-real response as if the request was interrupted.
      // Because when popup closes and TrezorConnect is living there it cannot respond, but we know
      // it was interrupted so we safely fake it.
      this.channel.resolveMessagePromises({
        code: 'Method_Interrupted',
        error: POPUP.CLOSED
      });
    }
    this.emit(POPUP.CLOSED);
  }
}
;// ./src/webusb/button.ts
// origin: https://github.com/trezor/connect/blob/develop/src/js/webusb/button.js

const render = (className = '', url) => {
  const query = className || '.trezor-webusb-button';
  const buttons = document.querySelectorAll(query);
  const src = `${url}?${Date.now()}`;
  buttons.forEach(b => {
    if (b.getElementsByTagName('iframe').length < 1) {
      const bounds = b.getBoundingClientRect();
      const btnIframe = document.createElement('iframe');
      btnIframe.frameBorder = '0';
      btnIframe.width = `${Math.round(bounds.width)}px`;
      btnIframe.height = `${Math.round(bounds.height)}px`;
      btnIframe.style.position = 'absolute';
      btnIframe.style.top = '0px';
      btnIframe.style.left = '0px';
      btnIframe.style.zIndex = '1';
      // btnIframe.style.opacity = '0'; // this makes click impossible on cross-origin
      btnIframe.setAttribute('allow', 'usb');
      btnIframe.setAttribute('scrolling', 'no');
      btnIframe.src = src;

      // inject iframe into button
      b.append(btnIframe);
    }
  });
};
/* harmony default export */ const webusb_button = (render);
;// ./src/impl/core-in-iframe.ts


// NOTE: @trezor/connect part is intentionally not imported from the index due to NormalReplacementPlugin
// in packages/suite-build/configs/web.webpack.config.ts










class CoreInIframe {
  eventEmitter = new (events_default())();
  boundHandleMessage = this.handleMessage.bind(this);
  boundDispose = this.dispose.bind(this);
  constructor() {
    this._settings = connectSettings_parseConnectSettings();
    this._log = initLog('@trezor/connect-web');
    this._messagePromises = createDeferredManager({
      initialId: 1
    });
  }
  initPopupManager() {
    const pm = new PopupManager(this._settings, {
      logger: this._log
    });
    pm.on(POPUP.CLOSED, error => {
      postMessage({
        type: POPUP.CLOSED,
        payload: error ? {
          error
        } : null
      });
    });
    return pm;
  }
  manifest(data) {
    this._settings = connectSettings_parseConnectSettings({
      ...this._settings,
      manifest: data
    });
  }
  dispose() {
    this.eventEmitter.removeAllListeners();
    dispose();
    this._settings = connectSettings_parseConnectSettings();
    if (this._popupManager) {
      this._popupManager.close();
    }
    window.removeEventListener('message', this.boundHandleMessage);
    window.removeEventListener('unload', this.boundDispose);
    return Promise.resolve(undefined);
  }
  cancel(error) {
    if (this._popupManager) {
      this._popupManager.emit(POPUP.CLOSED, error);
    }
  }

  // handle message received from iframe
  handleMessage(messageEvent) {
    // ignore messages from domain other then iframe origin
    if (messageEvent.origin !== origin) return;
    const message = parseMessage(messageEvent.data);
    this._log.log('handleMessage', message);
    switch (message.event) {
      case RESPONSE_EVENT:
        {
          const {
            id = 0,
            success,
            payload,
            device
          } = message;
          const resolved = this._messagePromises.resolve(id, {
            id,
            success,
            payload,
            device
          });
          if (!resolved) this._log.warn(`Unknown message id ${id}`);
          break;
        }
      case DEVICE_EVENT:
        // pass DEVICE event up to html
        this.eventEmitter.emit(message.event, message);
        this.eventEmitter.emit(message.type, message.payload); // DEVICE_EVENT also emit single events (connect/disconnect...)
        break;
      case TRANSPORT_EVENT:
        this.eventEmitter.emit(message.event, message);
        this.eventEmitter.emit(message.type, message.payload);
        break;
      case BLOCKCHAIN_EVENT:
        this.eventEmitter.emit(message.event, message);
        this.eventEmitter.emit(message.type, message.payload);
        break;
      case ui_request_UI_EVENT:
        if (message.type === IFRAME.BOOTSTRAP) {
          iframe_clearTimeout();
          break;
        }
        if (message.type === IFRAME.LOADED) {
          initPromise.resolve();
        }
        if (message.type === IFRAME.ERROR) {
          initPromise.reject(message.payload.error);
        }

        // pass UI event up
        this.eventEmitter.emit(message.event, message);
        this.eventEmitter.emit(message.type, message.payload);
        break;
      default:
        this._log.log('Undefined message', messageEvent.data);
    }
  }
  async init(settings) {
    if (instance) {
      throw TypedError('Init_AlreadyInitialized');
    }
    this._settings = connectSettings_parseConnectSettings({
      ...this._settings,
      ...settings
    });
    if (!this._settings.manifest) {
      throw TypedError('Init_ManifestMissing');
    }

    // defaults for connect-web
    if (!this._settings.transports?.length) {
      this._settings.transports = ['BridgeTransport', 'WebUsbTransport'];
    }
    if (!this._settings.coreMode) {
      this._settings.coreMode = 'auto';
    }
    if (this._settings.lazyLoad) {
      // reset "lazyLoad" after first use
      this._settings.lazyLoad = false;
      return;
    }
    if (!this._popupManager) {
      this._popupManager = this.initPopupManager();
    }
    this._log.enabled = !!this._settings.debug;
    window.addEventListener('message', this.boundHandleMessage);
    window.addEventListener('unload', this.boundDispose);
    await init(this._settings);
    if (this._settings.coreMode === 'auto') {
      // Checking bridge availability
      const {
        promiseId,
        promise
      } = this._messagePromises.create();
      this._log.debug('coreMode = auto, Checking bridge availability');
      postMessage({
        id: promiseId,
        type: TRANSPORT.GET_INFO
      });
      const response = await promise;
      this._log.debug('Bridge availability response', response);
      if (response.payload === undefined && navigator.usb && this._settings.transports?.includes('WebUsbTransport')) {
        throw TypedError('Transport_Missing');
      }
    }

    // sharedLogger can be disable but it is enable by default.
    if (this._settings.sharedLogger !== false) {
      // connect-web is running in third-party domain so we use iframe to pass logs to shared worker.
      initIframeLogger();
    }
  }
  setTransports() {
    // TODO: implement
    throw new Error('Unsupported right now');
  }
  async call(params) {
    if (!instance && !timeout) {
      // init popup with lazy loading before iframe initialization
      this._settings = connectSettings_parseConnectSettings(this._settings);
      if (!this._settings.manifest) {
        return createErrorMessage(TypedError('Init_ManifestMissing'));
      }
      if (!this._popupManager) {
        this._popupManager = this.initPopupManager();
      }

      // auto init with default settings
      try {
        // @ts-expect-error manifest could have been changed in the meantime, hard to check this
        await this.init(this._settings);
      } catch (error) {
        if (this._popupManager) {
          this._popupManager.clear();
        }
        return createErrorMessage(error);
      }
    }
    if (timeout) {
      // this.init was called, but iframe doesn't return handshake yet
      await initPromise.promise;
    }
    if (error) {
      // iframe was initialized with error
      return createErrorMessage(error);
    }

    // request popup window it might be used in the future
    if (this._settings.popup && this._popupManager) {
      this._popupManager.request();
    }

    // post message to iframe
    try {
      const {
        promiseId,
        promise
      } = this._messagePromises.create();
      postMessage({
        id: promiseId,
        type: IFRAME.CALL,
        payload: params
      });
      const response = await promise;
      if (response) {
        if (!response.success && response.payload.code !== 'Device_CallInProgress' && this._popupManager) {
          this._popupManager.unlock();
        }
        return response;
      }
      if (this._popupManager) {
        this._popupManager.unlock();
      }
      return createErrorMessage(TypedError('Method_NoResponse'));
    } catch (error) {
      this._log.error('__call error', error);
      if (this._popupManager) {
        this._popupManager.clear(false);
      }
      return createErrorMessage(error);
    }
  }
  uiResponse(response) {
    if (!instance) {
      throw TypedError('Init_NotInitialized');
    }
    postMessage(response);
  }
  renderWebUSBButton(className) {
    webusb_button(className, this._settings.webusbSrc);
  }
  async requestLogin(params) {
    if (typeof params.callback === 'function') {
      const {
        callback
      } = params;

      // TODO: set message listener only if iframe is loaded correctly
      const loginChallengeListener = async event => {
        const {
          data
        } = event;
        if (data && data.type === UI.LOGIN_CHALLENGE_REQUEST) {
          try {
            const payload = await callback();
            postMessage({
              type: UI.LOGIN_CHALLENGE_RESPONSE,
              payload
            });
          } catch (error) {
            postMessage({
              type: UI.LOGIN_CHALLENGE_RESPONSE,
              payload: error.message
            });
          }
        }
      };
      window.addEventListener('message', loginChallengeListener, false);
      const response = await this.call({
        method: 'requestLogin',
        ...params,
        asyncChallenge: true,
        callback: null
      });
      window.removeEventListener('message', loginChallengeListener);
      return response;
    }
    return this.call({
      method: 'requestLogin',
      ...params
    });
  }
  disableWebUSB() {
    if (!instance) {
      throw TypedError('Init_NotInitialized');
    }
    postMessage({
      type: TRANSPORT.DISABLE_WEBUSB
    });
  }

  /**
   * Initiate device pairing procedure.
   */
  async requestWebUSBDevice() {
    try {
      await window.navigator.usb.requestDevice({
        filters: config.webusb
      });
      postMessage({
        type: TRANSPORT.REQUEST_DEVICE
      });
    } catch {
      // user hits cancel gets "DOMException: No device selected."
      // no need to log this
    }
  }
}
const impl = new CoreInIframe();

// Exported to enable using directly
const TrezorConnect = factory({
  // Bind all methods due to shadowing `this`
  eventEmitter: impl.eventEmitter,
  init: impl.init.bind(impl),
  call: impl.call.bind(impl),
  setTransports: impl.setTransports.bind(impl),
  manifest: impl.manifest.bind(impl),
  requestLogin: impl.requestLogin.bind(impl),
  uiResponse: impl.uiResponse.bind(impl),
  cancel: impl.cancel.bind(impl),
  dispose: impl.dispose.bind(impl)
}, {
  renderWebUSBButton: impl.renderWebUSBButton.bind(impl),
  disableWebUSB: impl.disableWebUSB.bind(impl),
  requestWebUSBDevice: impl.requestWebUSBDevice.bind(impl)
});
;// ./src/impl/core-in-popup.ts


// NOTE: @trezor/connect part is intentionally not imported from the index so we do include the whole library.








/**
 * Base class for CoreInPopup methods for TrezorConnect factory.
 * This implementation is directly used here in connect-web, but it is also extended in connect-webextension.
 */
class CoreInPopup {
  eventEmitter = new (events_default())();
  constructor() {
    this._settings = connectSettings_parseConnectSettings();
    this.logger = initLog('@trezor/connect-web');
    this.popupManagerLogger = initLog('@trezor/connect-web/popupManager');
  }
  logWriterFactory(popupManager) {
    return {
      add: message => {
        popupManager.channel.postMessage({
          event: ui_request_UI_EVENT,
          type: IFRAME.LOG,
          payload: message
        }, {
          usePromise: false,
          useQueue: true
        });
      }
    };
  }
  manifest(data) {
    this._settings = connectSettings_parseConnectSettings({
      ...this._settings,
      manifest: data
    });
  }
  dispose() {
    this.eventEmitter.removeAllListeners();
    this._settings = connectSettings_parseConnectSettings();
    if (this._popupManager) {
      this._popupManager.close();
    }
    return Promise.resolve(undefined);
  }
  cancel(error) {
    if (this._popupManager) {
      this._popupManager.emit(POPUP.CLOSED, error);
    }
  }
  init(settings) {
    const oldSettings = connectSettings_parseConnectSettings({
      ...this._settings
    });
    const newSettings = connectSettings_parseConnectSettings({
      ...this._settings,
      ...settings
    });

    // defaults
    if (!newSettings.transports?.length) {
      newSettings.transports = ['BridgeTransport', 'WebUsbTransport'];
    }
    newSettings.useCoreInPopup = true;
    if (typeof window !== 'undefined' && window?.location?.origin) {
      newSettings.origin = window.location.origin;
    }
    const equalSettings = JSON.stringify(oldSettings) === JSON.stringify(newSettings);
    this._settings = newSettings;
    if (!this._popupManager || !equalSettings) {
      if (this._popupManager) this._popupManager.close();
      this._popupManager = new PopupManager(this._settings, {
        logger: this.popupManagerLogger
      });
      this._popupManager.on(DEVICE_EVENT, event => {
        this.eventEmitter.emit(DEVICE_EVENT, event);
      });
      setLogWriter(() => this.logWriterFactory(this._popupManager));
    }
    this.logger.enabled = !!settings.debug;
    if (!this._settings.manifest) {
      throw TypedError('Init_ManifestMissing');
    }
    this.logger.debug('initiated');
    return Promise.resolve();
  }
  setTransports() {
    // TODO: implement
    throw new Error('Unsupported right now');
  }

  /**
   * 1. opens popup
   * 2. sends request to popup where the request is handled by core
   * 3. returns response
   */
  async call(params) {
    this.logger.debug('call', params);
    if (!this._popupManager) {
      return createErrorMessage(TypedError('Init_NotInitialized'));
    }

    // request popup window it might be used in the future
    if (this._settings.popup) {
      await this._popupManager.request();
    }

    // We need to handle the case when the popup is closed during initialization
    // In this case, we need to listen to the POPUP.CLOSED event and return an error
    const popupClosed = createDeferred();
    const popupClosedHandler = () => {
      this.logger.log('Popup closed during initialization');
      popupClosed.reject(TypedError('Method_Interrupted'));
    };
    this._popupManager.once(POPUP.CLOSED, popupClosedHandler);
    try {
      this.logger.debug('call: popup initialing');
      await Promise.race([popupClosed.promise, this.callInit()]);
      this.logger.debug('call: popup initialized');

      // post message to core in popup
      const response = await this._popupManager.channel.postMessage({
        type: IFRAME.CALL,
        payload: params
      });
      this.logger.debug('call: response: ', response);
      if (response) {
        if (this._popupManager && response.success) {
          this._popupManager.clear();
        }
        return {
          success: response.success,
          payload: response.payload,
          device: response.device
        };
      }
      throw TypedError('Method_NoResponse');
    } catch (error) {
      this.logger.error('call: error', error);
      this._popupManager.clear(false);
      return createErrorMessage(error);
    } finally {
      this._popupManager.removeListener(POPUP.CLOSED, popupClosedHandler);
    }
  }
  async callInit() {
    if (!this._popupManager) {
      throw TypedError('Init_NotInitialized');
    }
    await this._popupManager.channel.init();
    if (this._settings.env === 'webextension') {
      // In webextension we init based on the popup promise
      // In core this is handled in the popup manager
      await this._popupManager.popupPromise?.promise;
      this._popupManager.channel.postMessage({
        type: POPUP.INIT,
        payload: {
          settings: this._settings,
          useCore: true
        }
      });
    }
    await this._popupManager.handshakePromise?.promise;
  }
  uiResponse(response) {
    const {
      type,
      payload
    } = response;
    this._popupManager?.channel?.postMessage({
      event: ui_request_UI_EVENT,
      type,
      payload
    });
  }
  renderWebUSBButton() {}
  requestLogin() {
    // todo: not supported yet
    throw TypedError('Method_InvalidPackage');
  }
  disableWebUSB() {
    // todo: not supported yet, probably not needed
    throw TypedError('Method_InvalidPackage');
  }
  requestWebUSBDevice() {
    // not needed - webusb pairing happens in popup
    throw TypedError('Method_InvalidPackage');
  }
}
const core_in_popup_impl = new CoreInPopup();

// Exported to enable using directly
const core_in_popup_TrezorConnect = factory({
  // Bind all methods due to shadowing `this`
  eventEmitter: core_in_popup_impl.eventEmitter,
  init: core_in_popup_impl.init.bind(core_in_popup_impl),
  call: core_in_popup_impl.call.bind(core_in_popup_impl),
  setTransports: core_in_popup_impl.setTransports.bind(core_in_popup_impl),
  manifest: core_in_popup_impl.manifest.bind(core_in_popup_impl),
  requestLogin: core_in_popup_impl.requestLogin.bind(core_in_popup_impl),
  uiResponse: core_in_popup_impl.uiResponse.bind(core_in_popup_impl),
  cancel: core_in_popup_impl.cancel.bind(core_in_popup_impl),
  dispose: core_in_popup_impl.dispose.bind(core_in_popup_impl)
});
;// ../websocket-client/src/ws-browser.ts



/**
 * Provides `EventEmitter` interface for native browser `WebSocket`,
 * same, as `ws` package provides.
 */
class WSWrapper extends events.EventEmitter {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;
  constructor(url, _protocols, _websocketOptions) {
    super();
    this._ws = new WebSocket(url);
    this._ws.onclose = () => {
      this.emit('close');
    };
    this._ws.onopen = () => {
      this.emit('open');
    };

    // WebSocket error Event does not contain any useful description.
    // https://websockets.spec.whatwg.org//#dom-websocket-onerror
    // If the user agent was required to fail the WebSocket connection,
    // or if the WebSocket connection was closed after being flagged as full,
    // fire an event named error at the WebSocket object.
    // https://stackoverflow.com/a/31003057
    this._ws.onerror = _event => {
      this.emit('error', new WebsocketError(`WsWrapper error. Ready state: ${this.readyState}`));
    };
    this._ws.onmessage = message => {
      this.emit('message', message.data);
    };
  }
  close() {
    if (this.readyState === WSWrapper.OPEN) {
      this._ws.close();
    }
  }
  send(message) {
    if (this.readyState !== WSWrapper.OPEN) {
      throw new WebsocketError(`Connection is not open. state: ${this.readyState}`);
    }
    this._ws.send(message);
  }
  get readyState() {
    return this._ws.readyState;
  }
}

// eslint-disable-next-line import/no-default-export
/* harmony default export */ const ws_browser = (WSWrapper);
;// ../websocket-client/src/client.ts


const DEFAULT_TIMEOUT = 20 * 1000;
const DEFAULT_PING_TIMEOUT = 50 * 1000;
class WebsocketError extends Error {}
class WebsocketClient extends TypedEmitter {
  emitter = this;
  ping() {
    return this.sendMessage({
      type: 'ping'
    });
  }
  constructor(options) {
    super();
    this.options = options;
    this.messages = createDeferredManager({
      timeout: this.options.timeout || DEFAULT_TIMEOUT,
      onTimeout: promiseId => this.onMessageTimeout(promiseId)
    });
  }
  initWebsocket({
    url,
    timeout,
    headers,
    agent
  }) {
    // url validation
    if (typeof url !== 'string') {
      throw new WebsocketError('websocket_no_url');
    }
    if (url.startsWith('http')) {
      url = url.replace('http', 'ws');
    }
    return new ws_browser(url, {
      timeout,
      headers: {
        // for convenience auto spoof Origin header in node.js
        Origin: 'https://node.trezor.io',
        ...headers
      },
      agent
    });
  }
  setPingTimeout() {
    clearTimeout(this.pingTimeout);
    const doPing = () => {
      if (this.isConnected()) {
        return this.onPing().catch(() => {});
      }
    };
    this.pingTimeout = this.isConnected() ? setTimeout(doPing, this.options.pingTimeout || DEFAULT_PING_TIMEOUT) : undefined;
  }
  onPing() {
    return this.ping();
  }
  onMessageTimeout(_promiseId) {
    const {
      ws
    } = this;
    if (!ws) return;
    this.messages.rejectAll(new WebsocketError('websocket_timeout'));
    ws.close();
  }
  onError() {
    this.onClose();
  }
  sendMessage(message, {
    timeout
  } = {}) {
    const {
      ws
    } = this;
    if (!ws || !this.isConnected()) throw new WebsocketError('websocket_not_initialized');
    const {
      promiseId,
      promise
    } = this.messages.create(timeout);
    const req = {
      id: promiseId.toString(),
      ...message
    };
    this.setPingTimeout();
    this.options.onSending?.(message);
    ws.send(JSON.stringify(req));
    return promise;
  }
  sendRawMessage(message) {
    const {
      ws
    } = this;
    if (!ws || !this.isConnected()) throw new WebsocketError('websocket_not_initialized');
    ws.send(message, {
      binary: typeof message !== 'string'
    });
    this.setPingTimeout();
  }

  // TODO: data type generic
  // `messageValidation` - additionally validates `data` in the subclass
  //  returns `payload` or throws error to automatically resolve/reject pending message
  //  returns `undefined` to resolve pending message manually in the subclass
  onMessage(message, messageValidation) {
    try {
      const data = JSON.parse(message.toString());
      const messageId = Number(data.id);
      try {
        const payload = messageValidation ? messageValidation(data) : data;
        if (payload) {
          this.messages.resolve(messageId, payload);
        }
      } catch (error) {
        this.messages.reject(messageId, error);
      }
    } catch {
      // empty
    } finally {
      this.setPingTimeout();
    }
  }
  async connect() {
    // if connecting already, just return the promise
    if (this.connectPromise) {
      return this.connectPromise;
    }
    if (this.isConnected()) return Promise.resolve();
    if (this.ws?.readyState === ws_browser.CLOSING) {
      await new Promise(resolve => this.emitter.once('disconnected', resolve));
    }

    // create deferred promise
    const dfd = createDeferred();
    this.connectPromise = dfd.promise;
    const ws = this.createWebsocket ? this.createWebsocket() : this.initWebsocket(this.options);

    // set connection timeout before WebSocket initialization
    const connectionTimeout = setTimeout(() => {
      this.onClose();
      dfd.reject(new WebsocketError('websocket_timeout'));
      try {
        ws.close();
      } catch {
        // empty
      }
    }, this.options.connectionTimeout || this.options.timeout || DEFAULT_TIMEOUT);
    ws.once('error', error => {
      clearTimeout(connectionTimeout);
      this.onClose();
      dfd.reject(new WebsocketError(error.message));
    });
    ws.on('open', () => {
      clearTimeout(connectionTimeout);
      this.init();
      dfd.resolve();
    });
    this.ws = ws;

    // wait for onopen event
    return dfd.promise.finally(() => {
      this.connectPromise = undefined;
    });
  }
  init() {
    const {
      ws
    } = this;
    if (!ws || !this.isConnected()) {
      throw Error('Websocket init cannot be called');
    }

    // remove previous listeners and add new listeners
    ws.removeAllListeners();
    ws.on('error', _error => this.onError());
    ws.on('message', message => this.onMessage(message));
    ws.on('close', () => {
      this.emitter.emit('disconnected');
      this.onClose();
    });
  }
  disconnect() {
    if (this.isConnected()) {
      const disconnectPromise = new Promise(resolve => {
        this.ws?.once('close', resolve);
      });
      this.ws?.close();
      return disconnectPromise;
    }
    return Promise.resolve();
  }
  isConnected() {
    return this.ws?.readyState === ws_browser.OPEN;
  }
  onClose() {
    clearTimeout(this.pingTimeout);
    this.ws?.removeAllListeners();
    this.ws?.on('error', () => {
      // Suppress errors after close
    });
    this.messages.rejectAll(new WebsocketError('Websocket closed unexpectedly'));
  }
  dispose() {
    this.removeAllListeners();
    this.disconnect();
    this.onClose();
  }
}
;// ./src/impl/core-in-suite-desktop.ts


// NOTE: @trezor/connect part is intentionally not imported from the index so we do include the whole library.







/**
 * CoreInSuiteDesktop implementation for TrezorConnect factory.
 */
class CoreInSuiteDesktop {
  eventEmitter = new (events_default())();
  constructor() {
    this._settings = connectSettings_parseConnectSettings();
    this.ws = new WebsocketClient({
      url: 'ws://127.0.0.1:21335/connect-ws'
    });
  }
  manifest(data) {
    this._settings = connectSettings_parseConnectSettings({
      ...this._settings,
      manifest: data
    });
  }
  dispose() {
    this.eventEmitter.removeAllListeners();
    this._settings = connectSettings_parseConnectSettings();
    this.ws.dispose();
    return Promise.resolve(undefined);
  }
  cancel(_error) {
    this.ws.sendMessage({
      type: POPUP.CLOSED,
      payload: {
        error: _error
      }
    });
  }
  async handshake() {
    if (!this.ws) {
      throw TypedError('Desktop_ConnectionMissing', 'No websocket connection');
    }
    try {
      const response = await this.ws.sendMessage({
        type: POPUP.HANDSHAKE,
        payload: {
          settings: this._settings
        }
      }, {
        // can take a while on slower machines due to loading process info
        timeout: 3000
      });
      if (!response) {
        throw TypedError('Desktop_ConnectionMissing', 'No response');
      }
      return response;
    } catch (err) {
      throw TypedError('Desktop_ConnectionMissing', err.message);
    }
  }
  async init(settings) {
    const newSettings = connectSettings_parseConnectSettings({
      ...this._settings,
      ...settings
    });

    // manifest is required in all implementations. for core-in-suite-desktop, also manifest.appName is required
    if (!newSettings.manifest || !newSettings.manifest.appName) {
      throw TypedError('Init_ManifestMissing', 'Manifest is missing or manifest.appName is not set');
    }

    // defaults
    if (!newSettings.transports?.length) {
      newSettings.transports = ['BridgeTransport', 'WebUsbTransport'];
    }
    this._settings = newSettings;
    return await this.connect();
  }
  async connect() {
    try {
      await this.ws.connect();
    } catch (err) {
      throw err instanceof WebsocketError ? TypedError('Desktop_ConnectionMissing', err.message) : err;
    }
  }
  setTransports() {
    // not supported, transports are controlled by suite-desktop.
    throw new Error('Unsupported');
  }
  async call(params) {
    try {
      if (!this.ws.isConnected()) {
        await this.connect();
      }
      await this.handshake();
      const response = await this.ws.sendMessage({
        type: IFRAME.CALL,
        payload: params
      }, {
        // base timeout in WebsocketClient is 20s, setting 0 overrides it.
        // todo: there should be no base timeout in the websocket client. it is just too opinionated
        timeout: 0
      });
      if (!response) {
        throw TypedError('Desktop_ConnectionMissing', 'No response');
      }
      return response;
    } catch (err) {
      return {
        success: false,
        payload: errors_serializeError(err instanceof WebsocketError ? TypedError('Desktop_ConnectionMissing', err.message) : err)
      };
    }
  }

  // this shouldn't be needed, ui response should be handled in suite-desktop
  uiResponse(_response) {
    throw TypedError('Method_InvalidPackage');
  }

  // todo: not supported yet
  requestLogin() {
    throw TypedError('Method_InvalidPackage');
  }

  // not needed, only because of types
  disableWebUSB() {
    throw TypedError('Method_InvalidPackage');
  }

  // not needed, only because of types
  requestWebUSBDevice() {
    throw TypedError('Method_InvalidPackage');
  }

  // not needed, only because of types
  renderWebUSBButton() {}
}
const core_in_suite_desktop_impl = new CoreInSuiteDesktop();

// Exported to enable using directly
const core_in_suite_desktop_TrezorConnect = factory({
  // Bind all methods due to shadowing `this`
  eventEmitter: core_in_suite_desktop_impl.eventEmitter,
  init: core_in_suite_desktop_impl.init.bind(core_in_suite_desktop_impl),
  call: core_in_suite_desktop_impl.call.bind(core_in_suite_desktop_impl),
  setTransports: core_in_suite_desktop_impl.setTransports.bind(core_in_suite_desktop_impl),
  manifest: core_in_suite_desktop_impl.manifest.bind(core_in_suite_desktop_impl),
  requestLogin: core_in_suite_desktop_impl.requestLogin.bind(core_in_suite_desktop_impl),
  uiResponse: core_in_suite_desktop_impl.uiResponse.bind(core_in_suite_desktop_impl),
  cancel: core_in_suite_desktop_impl.cancel.bind(core_in_suite_desktop_impl),
  dispose: core_in_suite_desktop_impl.dispose.bind(core_in_suite_desktop_impl)
});
;// ./src/index.ts






const IFRAME_ERRORS = ['Init_IframeBlocked', 'Init_IframeTimeout', 'Transport_Missing'];
const src_impl = new TrezorConnectDynamic({
  implementations: [{
    type: 'iframe',
    impl: new CoreInIframe()
  }, {
    type: 'core-in-popup',
    impl: new CoreInPopup()
  }, {
    type: 'core-in-suite-desktop',
    impl: new CoreInSuiteDesktop()
  }],
  getInitTarget: settings => {
    if (settings.coreMode === 'iframe') {
      return 'iframe';
    } else if (settings.coreMode === 'popup') {
      return 'core-in-popup';
    } else if (settings.coreMode === 'suite-desktop') {
      return 'core-in-suite-desktop';
    } else {
      if (settings.coreMode && settings.coreMode !== 'auto') {
        console.warn(`Invalid coreMode: ${settings.coreMode}`);
      }
      return 'iframe';
    }
  },
  handleBeforeCall: async () => {
    // Always try if desktop is available again
    const isCoreModeDesktop = src_impl.lastSettings?.coreMode === 'suite-desktop';
    const isCoreModeAuto = src_impl.lastSettings?.coreMode === 'auto' || src_impl.lastSettings?.coreMode === undefined;
    if (isCoreModeDesktop || isCoreModeAuto) {
      await src_impl.switchTarget('core-in-suite-desktop');
    }
  },
  handleErrorFallback: async errorCode => {
    const env = getEnv();
    const isCoreModeDisabled = src_impl.lastSettings?.popup === false || env === 'webextension';
    const isCoreModeAuto = src_impl.lastSettings?.coreMode === 'auto' || src_impl.lastSettings?.coreMode === undefined;

    // Handle desktop errors
    if (src_impl.getTargetType() === 'core-in-suite-desktop' && (errorCode === 'Desktop_ConnectionMissing' || errorCode === 'Method_Unsupported')) {
      await src_impl.switchTarget('iframe');
      return true;
    }

    // Handle iframe errors by switching to core-in-popup
    if (!isCoreModeDisabled && isCoreModeAuto && IFRAME_ERRORS.includes(errorCode)) {
      // Check if WebUSB is available and enabled
      const webUsbUnavailableInBrowser = !navigator?.usb;
      const webUsbDisabledInSettings = src_impl.lastSettings?.transports?.includes('WebUsbTransport') === false;
      if (errorCode === 'Transport_Missing' && (webUsbUnavailableInBrowser || webUsbDisabledInSettings)) {
        // WebUSB not available, no benefit in switching to core-in-popup
        return false;
      }
      await src_impl.switchTarget('core-in-popup');
      return true;
    }
    return false;
  }
});
const src_TrezorConnect = factory({
  eventEmitter: src_impl.eventEmitter,
  init: src_impl.init.bind(src_impl),
  call: src_impl.call.bind(src_impl),
  setTransports: src_impl.setTransports.bind(src_impl),
  manifest: src_impl.manifest.bind(src_impl),
  requestLogin: src_impl.requestLogin.bind(src_impl),
  uiResponse: src_impl.uiResponse.bind(src_impl),
  cancel: src_impl.cancel.bind(src_impl),
  dispose: src_impl.dispose.bind(src_impl)
}, {
  renderWebUSBButton: src_impl.getTarget().renderWebUSBButton.bind(src_impl),
  disableWebUSB: src_impl.getTarget().disableWebUSB.bind(src_impl),
  requestWebUSBDevice: src_impl.getTarget().requestWebUSBDevice.bind(src_impl)
});
/* harmony default export */ const src = (src_TrezorConnect);

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});