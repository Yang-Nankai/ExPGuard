import { e as ref, Z as useLocalStorage, m as createElementBlock, o as openBlock, p as createBaseVNode, d as defineComponent, dr as effectScope, G as watch, D as computed, a0 as renderSlot, aK as normalizeStyle, u as unref, V as normalizeClass, ds as toRef, dt as createPropsRestProxy, f as onMounted, a7 as useSlots, k as onUnmounted, n as createVNode, y as withCtx, bo as getCurrentInstance, Q as reactive, aB as inject, aR as onBeforeMount, F as Fragment, S as renderList, N as nextTick, aY as onBeforeUnmount, t as createCommentVNode, du as isMemoSame, c as createBlock, b$ as shallowRef, B as toDisplayString, ae as isRef, Y as toRefs$1, dv as customRef, dw as getCurrentScope, dx as toValue$1, dy as onScopeDispose, aQ as provide, z as resolveComponent, c0 as h, dz as useAttrs, af as mergeProps, W as resolveDynamicComponent, H as createTextVNode, aP as markRaw, dA as readonly, be as getDefaultExportFromCjs, T as Teleport, U as withModifiers, x as useScreenSize, w as useTranslation, P as networkId, ab as mergeModels, ac as useModel, a1 as withDirectives, a2 as resolveDirective, $ as createSlots } from './index.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { g as getRandomId } from './epochParams.js';
import { dg as createIMultiSig } from './app2.js';
import { _ as _sfc_main$l } from './TabsToSelect.vue_vue_type_script_setup_true_lang.js';
import { I as IconCheckmarkCircle02 } from './IconCheckmarkCircle02.js';
import { I as IconAlert02 } from './IconAlert02.js';
import { u as useFormatter } from './useFormatter.js';
import { u as useNotifications } from './useNotification.js';
import { c as appFormatTag } from './language.js';
import { I as IconUserGroup } from './IconUserGroup.js';
import { g as getTimestampFromSlot, b as getCalculatedSlotFromBlockTime } from './chain.js';
import { I as IconEpochTimer } from './IconEpochTimer.js';
import { I as IconInformationCircle } from './IconInformationCircle.js';

const createIUIMultiSigParticipant = (ref) => {
  const _participant = {
    ...createIMultiSig("", []),
    name: ref?.name ?? ""
  };
  if (ref?.description) {
    _participant.description = ref.description;
  }
  if (ref?.icon) {
    _participant.icon = ref.icon;
  }
  return _participant;
};

const _show$2 = ref(false);
const openModalMultiSigWallet = () => {
  _show$2.value = true;
};
const closeModalMultiSigWallet = () => {
  _show$2.value = false;
};
const useModalMultiSigWallet = () => {
  return {
    showModalMultiSigWallet: _show$2,
    openModalMultiSigWallet,
    closeModalMultiSigWallet
  };
};

const _show$1 = ref(false);
const _isWider = useLocalStorage("showMSParticipantViewerWide", false);
const _participant = ref(createIUIMultiSigParticipant());
const _type = ref("payment");
const _stakeMirrored = ref(true);
const _stakeDisabled = ref(false);
const _drepMirrored = ref(true);
const _drepDisabled = ref(false);
const _readonly = ref(false);
const _createMode = ref(true);
const _editMode = ref(false);
const _metadata = ref(null);
let _tweenOutTrigger;
const tweenOutModalMultiSigParticipantViewer = () => {
  if (_tweenOutTrigger) {
    _tweenOutTrigger();
  }
};
const doToggleWidth = () => {
  _isWider.value = !_isWider.value;
};
const openModalMultiSigParticipantViewer = (participant, readonly) => {
  _participant.value = participant;
  _readonly.value = readonly;
  if (!_participant.value.description) {
    _participant.value.description = "";
  }
  if (!_participant.value.icon) {
    _participant.value.icon = "";
  }
  if (!_participant.value.valid) {
    _participant.value.valid = true;
  }
  _show$1.value = true;
};
const closeModalMultiSigParticipantViewer = () => {
  _show$1.value = false;
};
const reset = () => {
  _participant.value.pub = "";
  _participant.value.path = [];
  _participant.value.keys.payment = [];
  _participant.value.keys.stake = [];
  _participant.value.keys.drep = [];
  _participant.value.valid = true;
  _participant.value.name = "";
  _participant.value.icon = "";
  _participant.value.description = "";
};
const checkParticipantValidity = (type, node) => {
  let numKeys = 0;
  let changed = false;
  if (type === "payment") {
    numKeys = node.data?.participant?.keys?.payment?.length ?? 0;
  } else if (type === "stake") {
    numKeys = node.data?.participant?.keys?.stake?.length ?? 0;
  } else if (type === "drep") {
    numKeys = node.data?.participant?.keys?.drep?.length ?? 0;
  }
  const isValid = numKeys > 0 && node.data?.participant?.valid === true;
  if (node.data?.valid !== isValid) {
    node.data.valid = isValid;
    changed = true;
  }
  return changed;
};
const useModalMultiSigFlow = (tweenOutTrigger) => {
  if (tweenOutTrigger) {
    _tweenOutTrigger = tweenOutTrigger;
  }
  return {
    showModalMultiSigParticipantViewer: _show$1,
    openModalMultiSigParticipantViewer,
    closeModalMultiSigParticipantViewer,
    tweenOutModalMultiSigParticipantViewer,
    doToggleWidth,
    reset,
    checkParticipantValidity,
    stakeMirrored: _stakeMirrored,
    stakeDisabled: _stakeDisabled,
    drepMirrored: _drepMirrored,
    drepDisabled: _drepDisabled,
    isWider: _isWider,
    participant: _participant,
    type: _type,
    readonly: _readonly,
    createMode: _createMode,
    editMode: _editMode,
    metadata: _metadata
  };
};

const _sfc_main$k = {  };

const _hoisted_1$g = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$8(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$g, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("defs", null, null, -1),
    createBaseVNode("path", {
      fill: "currentColor",
      d: "M9.731,16.982 L9.731,17.011 C9.726,17.423 9.392,17.754 8.981,17.754 L8.974,17.754 C8.886,17.754 8.803,17.738 8.725,17.71 C5.8,17.706 4.189,17.633 2.979,16.639 C2.71,16.412 2.501,16.201 2.318,15.971 C1.246,14.664 1.246,12.93 1.246,9.48 C1.246,6.03 1.246,4.291 2.323,2.983 C2.525,2.739 2.743,2.519 2.972,2.326 C2.975,2.323 2.978,2.321 2.981,2.319 L2.981,2.319 C4.292,1.25 6.025,1.25 9.479,1.25 C12.933,1.25 14.665,1.25 15.976,2.319 C15.978,2.321 15.979,2.322 15.981,2.323 C15.982,2.324 15.984,2.325 15.985,2.327 C16.217,2.523 16.435,2.743 16.634,2.984 C17.636,4.198 17.706,5.818 17.711,8.769 C17.73,8.834 17.742,8.903 17.743,8.974 C17.749,9.388 17.417,9.728 17.003,9.734 L14.036,9.774 L14.026,9.774 C13.618,9.774 13.283,9.445 13.276,9.034 C13.271,8.62 13.602,8.28 14.017,8.274 L16.21,8.245 C16.194,5.807 16.085,4.674 15.478,3.938 C15.339,3.769 15.186,3.614 15.025,3.478 C14.127,2.75 12.573,2.75 9.48,2.75 C6.387,2.75 4.832,2.75 3.934,3.478 C3.775,3.613 3.622,3.768 3.48,3.939 C2.747,4.829 2.747,6.384 2.747,9.48 C2.747,12.576 2.747,14.131 3.482,15.023 L3.491,15.035 C3.611,15.187 3.753,15.33 3.939,15.486 C4.7,16.112 5.975,16.198 8.238,16.209 L8.259,14.037 C8.262,13.625 8.597,13.294 9.009,13.294 L9.016,13.294 C9.429,13.298 9.762,13.637 9.759,14.051 L9.731,16.952 L9.731,16.96 C9.731,16.967 9.731,16.975 9.731,16.982 Z M11.366,22.702 L11.247,22.681 C10.41,22.535 8.668,22.23 8.282,20.065 C8.209,19.657 8.481,19.268 8.889,19.195 C9.297,19.123 9.686,19.394 9.759,19.802 C9.946,20.854 10.571,21.04 11.505,21.203 L11.63,21.225 C12.038,21.298 12.309,21.688 12.236,22.096 C12.17,22.459 11.854,22.713 11.498,22.713 L11.5,22.714 C11.455,22.714 11.41,22.71 11.366,22.702 Z M8.877,11.792 C8.469,11.719 8.198,11.33 8.27,10.922 C8.655,8.761 10.403,8.454 11.244,8.306 L11.245,8.305 L11.352,8.286 C11.76,8.213 12.151,8.484 12.224,8.891 C12.297,9.299 12.026,9.689 11.618,9.762 L11.505,9.782 C10.564,9.947 9.934,10.135 9.747,11.185 C9.682,11.548 9.366,11.803 9.009,11.803 L9.009,11.804 C8.965,11.804 8.922,11.8 8.877,11.792 Z M21.232,11.186 C21.044,10.135 20.413,9.948 19.473,9.783 L19.36,9.763 C18.951,9.69 18.681,9.3 18.754,8.892 C18.827,8.484 19.218,8.213 19.625,8.287 L19.733,8.306 L19.734,8.306 C20.574,8.454 22.323,8.763 22.708,10.923 C22.781,11.331 22.51,11.72 22.101,11.793 C22.056,11.801 22.013,11.805 21.969,11.805 L21.969,11.804 C21.612,11.804 21.295,11.549 21.232,11.186 Z M18.753,22.088 C18.684,21.68 18.959,21.293 19.368,21.224 L19.5,21.202 C20.434,21.051 21.062,20.873 21.264,19.83 C21.344,19.423 21.737,19.158 22.143,19.237 C22.551,19.316 22.816,19.71 22.736,20.116 C22.319,22.264 20.577,22.547 19.74,22.682 L19.617,22.702 C19.574,22.709 19.532,22.712 19.492,22.712 L19.492,22.714 C19.132,22.714 18.815,22.454 18.753,22.088 Z M13.262,22.014 C13.257,21.6 13.589,21.26 14.002,21.254 L16.969,21.214 L16.979,21.214 C17.388,21.214 17.722,21.543 17.729,21.954 C17.735,22.368 17.403,22.708 16.989,22.714 L14.023,22.754 L14.012,22.754 C13.604,22.754 13.269,22.425 13.262,22.014 Z M21.934,17.734 C21.521,17.73 21.188,17.391 21.191,16.977 L21.219,14.017 C21.223,13.605 21.559,13.274 21.969,13.274 L21.976,13.274 C22.39,13.278 22.723,13.617 22.719,14.031 L22.691,16.991 C22.688,17.403 22.353,17.734 21.941,17.734 Z"
    }, null, -1)
  ]))]))
}
const IconCopy02 = /*#__PURE__*/_export_sfc(_sfc_main$k, [['render',_sfc_render$8]]);

const _show = ref(false);
const _inputMetadata = ref(null);
const _outputMetadata = ref(null);
const openModalMultiSigEncrypt = (metadata) => {
  _inputMetadata.value = metadata;
  _outputMetadata.value = null;
  _show.value = true;
};
const closeModalMultiSigEncrypt = (tweenUp) => {
  _show.value = false;
  _inputMetadata.value = null;
};
const useModalMultiSigEncrypt = () => {
  return {
    showModalMultiSigEncrypt: _show,
    inputMetadata: _inputMetadata,
    outputMetadata: _outputMetadata,
    openModalMultiSigEncrypt,
    closeModalMultiSigEncrypt
  };
};

const _sfc_main$j = {  };

const _hoisted_1$f = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$7(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$f, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M12 17c.227 0 .438-.106.86-.318l3.39-1.704c1.5-.754 2.25-1.131 2.25-1.728v-7.5M12 17c-.227 0-.438-.106-.86-.318l-3.39-1.704c-1.5-.754-2.25-1.131-2.25-1.728v-7.5M12 17V9.5m6.5-3.75c0-.597-.75-.974-2.25-1.728l-3.39-1.704C12.438 2.106 12.227 2 12 2s-.438.106-.86.318L7.75 4.022C6.25 4.776 5.5 5.153 5.5 5.75m13 0c0 .597-.75.974-2.25 1.728l-3.39 1.704c-.422.212-.633.318-.86.318M5.5 5.75c0 .597.75.974 2.25 1.728l3.39 1.704c.422.212.633.318.86.318m-2 11.25c0-.69.56-1.25 1.25-1.25h1.5c.69 0 1.25.56 1.25 1.25m-4 0c0 .69.56 1.25 1.25 1.25h1.5c.69 0 1.25-.56 1.25-1.25m-4 0H5m9 0h5",
      color: "currentColor"
    }, null, -1)
  ]))]))
}
const IconBlockChain = /*#__PURE__*/_export_sfc(_sfc_main$j, [['render',_sfc_render$7]]);

const _sfc_main$i = {  };

const _hoisted_1$e = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$6(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$e, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      color: "currentColor"
    }, [
      createBaseVNode("path", { d: "M12.5 2h.273c3.26 0 4.892 0 6.024.798c.324.228.612.5.855.805c.848 1.066.848 2.6.848 5.67v2.545c0 2.963 0 4.445-.469 5.628c-.754 1.903-2.348 3.403-4.37 4.113c-1.257.441-2.83.441-5.98.441c-1.798 0-2.698 0-3.416-.252c-1.155-.406-2.066-1.263-2.497-2.35c-.268-.676-.268-1.523-.268-3.216V12" }),
      createBaseVNode("path", { d: "M20.5 12a3.333 3.333 0 0 1-3.333 3.333c-.666 0-1.451-.116-2.098.057a1.67 1.67 0 0 0-1.179 1.179c-.173.647-.057 1.432-.057 2.098A3.333 3.333 0 0 1 10.5 22m-6-14.5C4.992 8.006 6.3 10 7 10m2.5-2.5C9.008 8.006 7.7 10 7 10m0 0V2" })
    ], -1)
  ]))]))
}
const IconFileDownload = /*#__PURE__*/_export_sfc(_sfc_main$i, [['render',_sfc_render$6]]);

const _sfc_main$h = {  };

const _hoisted_1$d = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$5(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$d, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("defs", null, null, -1),
    createBaseVNode("path", {
      fill: "currentColor",
      d: "M12.75,22.75 C6.813,22.75 2,17.937 2,12 C2,6.063 6.813,1.25 12.75,1.25 C18.687,1.25 23.5,6.063 23.5,12 C23.5,17.937 18.687,22.75 12.75,22.75 Z M3.5,12 C3.5,17.109 7.641,21.25 12.75,21.25 C15.034,21.25 17.125,20.422 18.739,19.05 L5.7,6.011 C4.328,7.625 3.5,9.716 3.5,12 Z M19.8,17.989 C21.172,16.375 22,14.284 22,12 C22,6.891 17.859,2.75 12.75,2.75 C10.466,2.75 8.375,3.578 6.761,4.95 Z"
    }, null, -1)
  ]))]))
}
const IconUnavailable = /*#__PURE__*/_export_sfc(_sfc_main$h, [['render',_sfc_render$5]]);

function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
const isClient = typeof window !== "undefined" && typeof document !== "undefined";
const isDef$1 = (val) => typeof val !== "undefined";
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const noop$3 = () => {
};
function createFilterWrapper(filter2, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter2(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
const bypassFilter = (invoke) => {
  return invoke();
};
function pausableFilter(extendFilter = bypassFilter) {
  const isActive = ref(true);
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value)
      extendFilter(...args);
  };
  return { isActive: readonly(isActive), pause, resume, eventFilter };
}
function promiseTimeout(ms, throwOnTimeout = false, reason = "Timeout") {
  return new Promise((resolve, reject) => {
    if (throwOnTimeout)
      setTimeout(() => reject(reason), ms);
    else
      setTimeout(resolve, ms);
  });
}
function watchWithFilter(source, cb, options = {}) {
  const {
    eventFilter = bypassFilter,
    ...watchOptions
  } = options;
  return watch(
    source,
    createFilterWrapper(
      eventFilter,
      cb
    ),
    watchOptions
  );
}
function watchPausable(source, cb, options = {}) {
  const {
    eventFilter: filter2,
    ...watchOptions
  } = options;
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter2);
  const stop = watchWithFilter(
    source,
    cb,
    {
      ...watchOptions,
      eventFilter
    }
  );
  return { stop, pause, resume, isActive };
}
function toRefs(objectRef, options = {}) {
  if (!isRef(objectRef))
    return toRefs$1(objectRef);
  const result = Array.isArray(objectRef.value) ? Array.from({ length: objectRef.value.length }) : {};
  for (const key in objectRef.value) {
    result[key] = customRef(() => ({
      get() {
        return objectRef.value[key];
      },
      set(v) {
        var _a;
        const replaceRef = (_a = toValue(options.replaceRef)) != null ? _a : true;
        if (replaceRef) {
          if (Array.isArray(objectRef.value)) {
            const copy = [...objectRef.value];
            copy[key] = v;
            objectRef.value = copy;
          } else {
            const newObject = { ...objectRef.value, [key]: v };
            Object.setPrototypeOf(newObject, Object.getPrototypeOf(objectRef.value));
            objectRef.value = newObject;
          }
        } else {
          objectRef.value[key] = v;
        }
      }
    }));
  }
  return result;
}
function createUntil(r, isNot = false) {
  function toMatch(condition, { flush = "sync", deep = false, timeout: timeout2, throwOnTimeout } = {}) {
    let stop = null;
    const watcher = new Promise((resolve) => {
      stop = watch(
        r,
        (v) => {
          if (condition(v) !== isNot) {
            stop == null ? void 0 : stop();
            resolve(v);
          }
        },
        {
          flush,
          deep,
          immediate: true
        }
      );
    });
    const promises = [watcher];
    if (timeout2 != null) {
      promises.push(
        promiseTimeout(timeout2, throwOnTimeout).then(() => toValue(r)).finally(() => stop == null ? void 0 : stop())
      );
    }
    return Promise.race(promises);
  }
  function toBe(value, options) {
    if (!isRef(value))
      return toMatch((v) => v === value, options);
    const { flush = "sync", deep = false, timeout: timeout2, throwOnTimeout } = options != null ? options : {};
    let stop = null;
    const watcher = new Promise((resolve) => {
      stop = watch(
        [r, value],
        ([v1, v2]) => {
          if (isNot !== (v1 === v2)) {
            stop == null ? void 0 : stop();
            resolve(v1);
          }
        },
        {
          flush,
          deep,
          immediate: true
        }
      );
    });
    const promises = [watcher];
    if (timeout2 != null) {
      promises.push(
        promiseTimeout(timeout2, throwOnTimeout).then(() => toValue(r)).finally(() => {
          stop == null ? void 0 : stop();
          return toValue(r);
        })
      );
    }
    return Promise.race(promises);
  }
  function toBeTruthy(options) {
    return toMatch((v) => Boolean(v), options);
  }
  function toBeNull(options) {
    return toBe(null, options);
  }
  function toBeUndefined(options) {
    return toBe(void 0, options);
  }
  function toBeNaN(options) {
    return toMatch(Number.isNaN, options);
  }
  function toContains(value, options) {
    return toMatch((v) => {
      const array2 = Array.from(v);
      return array2.includes(value) || array2.includes(toValue(value));
    }, options);
  }
  function changed(options) {
    return changedTimes(1, options);
  }
  function changedTimes(n = 1, options) {
    let count = -1;
    return toMatch(() => {
      count += 1;
      return count >= n;
    }, options);
  }
  if (Array.isArray(toValue(r))) {
    const instance = {
      toMatch,
      toContains,
      changed,
      changedTimes,
      get not() {
        return createUntil(r, !isNot);
      }
    };
    return instance;
  } else {
    const instance = {
      toMatch,
      toBe,
      toBeTruthy,
      toBeNull,
      toBeNaN,
      toBeUndefined,
      changed,
      changedTimes,
      get not() {
        return createUntil(r, !isNot);
      }
    };
    return instance;
  }
}
function until(r) {
  return createUntil(r);
}
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = isClient ? window : void 0;
function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options] = args;
  }
  if (!target)
    return noop$3;
  if (!Array.isArray(events))
    events = [events];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = isObject(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function createKeyPredicate$1(keyFilter) {
  if (typeof keyFilter === "function")
    return keyFilter;
  else if (typeof keyFilter === "string")
    return (event) => event.key === keyFilter;
  else if (Array.isArray(keyFilter))
    return (event) => keyFilter.includes(event.key);
  return () => true;
}
function onKeyStroke(...args) {
  let key;
  let handler;
  let options = {};
  if (args.length === 3) {
    key = args[0];
    handler = args[1];
    options = args[2];
  } else if (args.length === 2) {
    if (typeof args[1] === "object") {
      key = true;
      handler = args[0];
      options = args[1];
    } else {
      key = args[0];
      handler = args[1];
    }
  } else {
    key = true;
    handler = args[0];
  }
  const {
    target = defaultWindow,
    eventName = "keydown",
    passive = false,
    dedupe = false
  } = options;
  const predicate = createKeyPredicate$1(key);
  const listener = (e) => {
    if (e.repeat && toValue(dedupe))
      return;
    if (predicate(e))
      handler(e);
  };
  return useEventListener(target, eventName, listener, passive);
}
function cloneFnJSON(source) {
  return JSON.parse(JSON.stringify(source));
}
function useVModel(props, key, emit, options = {}) {
  var _a, _b, _c;
  const {
    clone = false,
    passive = false,
    eventName,
    deep = false,
    defaultValue,
    shouldEmit
  } = options;
  const vm = getCurrentInstance();
  const _emit = emit || (vm == null ? void 0 : vm.emit) || ((_a = vm == null ? void 0 : vm.$emit) == null ? void 0 : _a.bind(vm)) || ((_c = (_b = vm == null ? void 0 : vm.proxy) == null ? void 0 : _b.$emit) == null ? void 0 : _c.bind(vm == null ? void 0 : vm.proxy));
  let event = eventName;
  if (!key) {
    {
      key = "modelValue";
    }
  }
  event = event || `update:${key.toString()}`;
  const cloneFn = (val) => !clone ? val : typeof clone === "function" ? clone(val) : cloneFnJSON(val);
  const getValue = () => isDef$1(props[key]) ? cloneFn(props[key]) : defaultValue;
  const triggerEmit = (value) => {
    if (shouldEmit) {
      if (shouldEmit(value))
        _emit(event, value);
    } else {
      _emit(event, value);
    }
  };
  if (passive) {
    const initialValue = getValue();
    const proxy = ref(initialValue);
    let isUpdating = false;
    watch(
      () => props[key],
      (v) => {
        if (!isUpdating) {
          isUpdating = true;
          proxy.value = cloneFn(v);
          nextTick(() => isUpdating = false);
        }
      }
    );
    watch(
      proxy,
      (v) => {
        if (!isUpdating && (v !== props[key] || deep))
          triggerEmit(v);
      },
      { deep }
    );
    return proxy;
  } else {
    return computed({
      get() {
        return getValue();
      },
      set(value) {
        triggerEmit(value);
      }
    });
  }
}
var noop$2 = { value: () => {
} };
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t))
      throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames$1(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0)
      name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    return { type: t, name };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._, T = parseTypenames$1(typename + "", _), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i < n)
        if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name)))
          return t;
      return;
    }
    if (callback != null && typeof callback !== "function")
      throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type)
        _[t] = set$1(_[t], typename.name, callback);
      else if (callback == null)
        for (t in _)
          _[t] = set$1(_[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _)
      copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0)
      for (var args = new Array(n), i = 0, n, t; i < n; ++i)
        args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type))
      throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i)
      t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type))
      throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i)
      t[i].value.apply(that, args);
  }
};
function get$1(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}
function set$1(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop$2, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null)
    type.push({ name, value: callback });
  return type;
}
var xhtml = "http://www.w3.org/1999/xhtml";
const namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function namespace(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
    name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? { space: namespaces[prefix], local: name } : name;
}
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator(name) {
  var fullname = namespace(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
function none() {
}
function selector(selector2) {
  return selector2 == null ? none : function() {
    return this.querySelector(selector2);
  };
}
function selection_select(select2) {
  if (typeof select2 !== "function")
    select2 = selector(select2);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select2.call(node, node.__data__, i, group))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection$1(subgroups, this._parents);
}
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}
function empty() {
  return [];
}
function selectorAll(selector2) {
  return selector2 == null ? empty : function() {
    return this.querySelectorAll(selector2);
  };
}
function arrayAll(select2) {
  return function() {
    return array(select2.apply(this, arguments));
  };
}
function selection_selectAll(select2) {
  if (typeof select2 === "function")
    select2 = arrayAll(select2);
  else
    select2 = selectorAll(select2);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select2.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection$1(subgroups, parents);
}
function matcher(selector2) {
  return function() {
    return this.matches(selector2);
  };
}
function childMatcher(selector2) {
  return function(node) {
    return node.matches(selector2);
  };
}
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selection_selectChild(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}
var filter = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selection_selectChildren(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}
function selection_filter(match) {
  if (typeof match !== "function")
    match = matcher(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection$1(subgroups, this._parents);
}
function sparse(update) {
  return new Array(update.length);
}
function selection_enter() {
  return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector2) {
    return this._parent.querySelector(selector2);
  },
  querySelectorAll: function(selector2) {
    return this._parent.querySelectorAll(selector2);
  }
};
function constant$3(x) {
  return function() {
    return x;
  };
}
function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function selection_data(value, key) {
  if (!arguments.length)
    return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function")
    value = constant$3(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1)
          i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength)
          ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection$1(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}
function selection_exit() {
  return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
}
function selection_join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter)
      enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update)
      update = update.selection();
  }
  if (onexit == null)
    exit.remove();
  else
    onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
function selection_merge(context) {
  var selection2 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection$1(merges, this._parents);
}
function selection_order() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4)
          next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}
function selection_sort(compare) {
  if (!compare)
    compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection$1(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
function selection_call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
function selection_nodes() {
  return Array.from(this);
}
function selection_node() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node)
        return node;
    }
  }
  return null;
}
function selection_size() {
  let size = 0;
  for (const node of this)
    ++size;
  return size;
}
function selection_empty() {
  return !this.node();
}
function selection_each(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i])
        callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}
function attrRemove$1(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS$1(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant$1(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS$1(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction$1(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.removeAttribute(name);
    else
      this.setAttribute(name, v);
  };
}
function attrFunctionNS$1(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.removeAttributeNS(fullname.space, fullname.local);
    else
      this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function selection_attr(name, value) {
  var fullname = namespace(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS$1 : attrRemove$1 : typeof value === "function" ? fullname.local ? attrFunctionNS$1 : attrFunction$1 : fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, value));
}
function defaultView(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}
function styleRemove$1(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant$1(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction$1(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.style.removeProperty(name);
    else
      this.style.setProperty(name, v, priority);
  };
}
function selection_style(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove$1 : typeof value === "function" ? styleFunction$1 : styleConstant$1)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      delete this[name];
    else
      this[name] = v;
  };
}
function selection_property(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n)
    list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n)
    list.remove(names[i]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function selection_classed(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n)
      if (!list.contains(names[i]))
        return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
function textRemove() {
  this.textContent = "";
}
function textConstant$1(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction$1(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function selection_text(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction$1 : textConstant$1)(value)) : this.node().textContent;
}
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function selection_html(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
function raise() {
  if (this.nextSibling)
    this.parentNode.appendChild(this);
}
function selection_raise() {
  return this.each(raise);
}
function lower() {
  if (this.previousSibling)
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function selection_lower() {
  return this.each(lower);
}
function selection_append(name) {
  var create2 = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}
function constantNull() {
  return null;
}
function selection_insert(name, before) {
  var create2 = typeof name === "function" ? name : creator(name), select2 = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select2.apply(this, arguments) || null);
  });
}
function remove() {
  var parent = this.parentNode;
  if (parent)
    parent.removeChild(this);
}
function selection_remove() {
  return this.each(remove);
}
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
function selection_datum(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0)
      name = t.slice(i + 1), t = t.slice(0, i);
    return { type: t, name };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on)
      return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i)
      on.length = i;
    else
      delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on)
      for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
    this.addEventListener(typename.type, listener, options);
    o = { type: typename.type, name: typename.name, value, listener, options };
    if (!on)
      this.__on = [o];
    else
      on.push(o);
  };
}
function selection_on(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on)
      for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i)
    this.each(on(typenames[i], value, options));
  return this;
}
function dispatchEvent(node, type, params) {
  var window2 = defaultView(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params)
      event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else
      event.initEvent(type, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}
function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}
function selection_dispatch(type, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}
function* selection_iterator() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i])
        yield node;
    }
  }
}
var root = [null];
function Selection$1(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection$1([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection$1.prototype = selection.prototype = {
  constructor: Selection$1,
  select: selection_select,
  selectAll: selection_selectAll,
  selectChild: selection_selectChild,
  selectChildren: selection_selectChildren,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  join: selection_join,
  merge: selection_merge,
  selection: selection_selection,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  clone: selection_clone,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch,
  [Symbol.iterator]: selection_iterator
};
function select(selector2) {
  return typeof selector2 === "string" ? new Selection$1([[document.querySelector(selector2)]], [document.documentElement]) : new Selection$1([[selector2]], root);
}
function sourceEvent(event) {
  let sourceEvent2;
  while (sourceEvent2 = event.sourceEvent)
    event = sourceEvent2;
  return event;
}
function pointer(event, node) {
  event = sourceEvent(event);
  if (node === void 0)
    node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}
const nonpassive = { passive: false };
const nonpassivecapture = { capture: true, passive: false };
function nopropagation$1(event) {
  event.stopImmediatePropagation();
}
function noevent$1(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}
function dragDisable(view) {
  var root2 = view.document.documentElement, selection2 = select(view).on("dragstart.drag", noevent$1, nonpassivecapture);
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", noevent$1, nonpassivecapture);
  } else {
    root2.__noselect = root2.style.MozUserSelect;
    root2.style.MozUserSelect = "none";
  }
}
function yesdrag(view, noclick) {
  var root2 = view.document.documentElement, selection2 = select(view).on("dragstart.drag", null);
  if (noclick) {
    selection2.on("click.drag", noevent$1, nonpassivecapture);
    setTimeout(function() {
      selection2.on("click.drag", null);
    }, 0);
  }
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", null);
  } else {
    root2.style.MozUserSelect = root2.__noselect;
    delete root2.__noselect;
  }
}
const constant$2 = (x) => () => x;
function DragEvent(type, {
  sourceEvent: sourceEvent2,
  subject,
  target,
  identifier,
  active,
  x,
  y,
  dx,
  dy,
  dispatch: dispatch2
}) {
  Object.defineProperties(this, {
    type: { value: type, enumerable: true, configurable: true },
    sourceEvent: { value: sourceEvent2, enumerable: true, configurable: true },
    subject: { value: subject, enumerable: true, configurable: true },
    target: { value: target, enumerable: true, configurable: true },
    identifier: { value: identifier, enumerable: true, configurable: true },
    active: { value: active, enumerable: true, configurable: true },
    x: { value: x, enumerable: true, configurable: true },
    y: { value: y, enumerable: true, configurable: true },
    dx: { value: dx, enumerable: true, configurable: true },
    dy: { value: dy, enumerable: true, configurable: true },
    _: { value: dispatch2 }
  });
}
DragEvent.prototype.on = function() {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};
function defaultFilter$1(event) {
  return !event.ctrlKey && !event.button;
}
function defaultContainer() {
  return this.parentNode;
}
function defaultSubject(event, d) {
  return d == null ? { x: event.x, y: event.y } : d;
}
function defaultTouchable$1() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function drag() {
  var filter2 = defaultFilter$1, container = defaultContainer, subject = defaultSubject, touchable = defaultTouchable$1, gestures = {}, listeners = dispatch("start", "drag", "end"), active = 0, mousedownx, mousedowny, mousemoving, touchending, clickDistance2 = 0;
  function drag2(selection2) {
    selection2.on("mousedown.drag", mousedowned).filter(touchable).on("touchstart.drag", touchstarted).on("touchmove.drag", touchmoved, nonpassive).on("touchend.drag touchcancel.drag", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function mousedowned(event, d) {
    if (touchending || !filter2.call(this, event, d))
      return;
    var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
    if (!gesture)
      return;
    select(event.view).on("mousemove.drag", mousemoved, nonpassivecapture).on("mouseup.drag", mouseupped, nonpassivecapture);
    dragDisable(event.view);
    nopropagation$1(event);
    mousemoving = false;
    mousedownx = event.clientX;
    mousedowny = event.clientY;
    gesture("start", event);
  }
  function mousemoved(event) {
    noevent$1(event);
    if (!mousemoving) {
      var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
      mousemoving = dx * dx + dy * dy > clickDistance2;
    }
    gestures.mouse("drag", event);
  }
  function mouseupped(event) {
    select(event.view).on("mousemove.drag mouseup.drag", null);
    yesdrag(event.view, mousemoving);
    noevent$1(event);
    gestures.mouse("end", event);
  }
  function touchstarted(event, d) {
    if (!filter2.call(this, event, d))
      return;
    var touches = event.changedTouches, c = container.call(this, event, d), n = touches.length, i, gesture;
    for (i = 0; i < n; ++i) {
      if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
        nopropagation$1(event);
        gesture("start", event, touches[i]);
      }
    }
  }
  function touchmoved(event) {
    var touches = event.changedTouches, n = touches.length, i, gesture;
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        noevent$1(event);
        gesture("drag", event, touches[i]);
      }
    }
  }
  function touchended(event) {
    var touches = event.changedTouches, n = touches.length, i, gesture;
    if (touchending)
      clearTimeout(touchending);
    touchending = setTimeout(function() {
      touchending = null;
    }, 500);
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        nopropagation$1(event);
        gesture("end", event, touches[i]);
      }
    }
  }
  function beforestart(that, container2, event, d, identifier, touch) {
    var dispatch2 = listeners.copy(), p = pointer(touch || event, container2), dx, dy, s;
    if ((s = subject.call(that, new DragEvent("beforestart", {
      sourceEvent: event,
      target: drag2,
      identifier,
      active,
      x: p[0],
      y: p[1],
      dx: 0,
      dy: 0,
      dispatch: dispatch2
    }), d)) == null)
      return;
    dx = s.x - p[0] || 0;
    dy = s.y - p[1] || 0;
    return function gesture(type, event2, touch2) {
      var p0 = p, n;
      switch (type) {
        case "start":
          gestures[identifier] = gesture, n = active++;
          break;
        case "end":
          delete gestures[identifier], --active;
        case "drag":
          p = pointer(touch2 || event2, container2), n = active;
          break;
      }
      dispatch2.call(
        type,
        that,
        new DragEvent(type, {
          sourceEvent: event2,
          subject: s,
          target: drag2,
          identifier,
          active: n,
          x: p[0] + dx,
          y: p[1] + dy,
          dx: p[0] - p0[0],
          dy: p[1] - p0[1],
          dispatch: dispatch2
        }),
        d
      );
    };
  }
  drag2.filter = function(_) {
    return arguments.length ? (filter2 = typeof _ === "function" ? _ : constant$2(!!_), drag2) : filter2;
  };
  drag2.container = function(_) {
    return arguments.length ? (container = typeof _ === "function" ? _ : constant$2(_), drag2) : container;
  };
  drag2.subject = function(_) {
    return arguments.length ? (subject = typeof _ === "function" ? _ : constant$2(_), drag2) : subject;
  };
  drag2.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$2(!!_), drag2) : touchable;
  };
  drag2.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? drag2 : value;
  };
  drag2.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag2) : Math.sqrt(clickDistance2);
  };
  return drag2;
}
function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`), reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`), reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`), reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`), reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`), reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0)
    r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h2, s, l, a) {
  if (a <= 0)
    h2 = s = l = NaN;
  else if (l <= 0 || l >= 1)
    h2 = s = NaN;
  else if (s <= 0)
    h2 = NaN;
  return new Hsl(h2, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h2 = NaN, s = max - min, l = (max + min) / 2;
  if (s) {
    if (r === max)
      h2 = (g - b) / s + (g < b) * 6;
    else if (g === max)
      h2 = (b - r) / s + 2;
    else
      h2 = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h2 *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h2;
  }
  return new Hsl(h2, s, l, o.opacity);
}
function hsl(h2, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h2) : new Hsl(h2, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h2, s, l, opacity) {
  this.h = +h2;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h2 = this.h % 360 + (this.h < 0) * 360, s = isNaN(h2) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h2 >= 240 ? h2 - 240 : h2 + 120, m1, m2),
      hsl2rgb(h2, m1, m2),
      hsl2rgb(h2 < 120 ? h2 + 240 : h2 - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h2, m1, m2) {
  return (h2 < 60 ? m1 + (m2 - m1) * h2 / 60 : h2 < 180 ? m2 : h2 < 240 ? m1 + (m2 - m1) * (240 - h2) / 60 : m1) * 255;
}
const constant$1 = (x) => () => x;
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant$1(isNaN(a) ? b : a);
}
const interpolateRgb = function rgbGamma(y) {
  var color2 = gamma(y);
  function rgb$1(start2, end) {
    var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.r = r(t);
      start2.g = g(t);
      start2.b = b(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  }
  rgb$1.gamma = rgbGamma;
  return rgb$1;
}(1);
function numberArray(a, b) {
  if (!b)
    b = [];
  var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
  return function(t) {
    for (i = 0; i < n; ++i)
      c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}
function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}
function genericArray(a, b) {
  var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
  for (i = 0; i < na; ++i)
    x[i] = interpolate$1(a[i], b[i]);
  for (; i < nb; ++i)
    c[i] = b[i];
  return function(t) {
    for (i = 0; i < na; ++i)
      c[i] = x[i](t);
    return c;
  };
}
function date(a, b) {
  var d = /* @__PURE__ */ new Date();
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}
function interpolateNumber(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}
function object(a, b) {
  var i = {}, c = {}, k;
  if (a === null || typeof a !== "object")
    a = {};
  if (b === null || typeof b !== "object")
    b = {};
  for (k in b) {
    if (k in a) {
      i[k] = interpolate$1(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }
  return function(t) {
    for (k in i)
      c[k] = i[k](t);
    return c;
  };
}
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function interpolateString(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i])
        s[i] += bs;
      else
        s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i])
        s[i] += bm;
      else
        s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: interpolateNumber(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i])
      s[i] += bs;
    else
      s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2)
      s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}
function interpolate$1(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant$1(b) : (t === "number" ? interpolateNumber : t === "string" ? (c = color(b)) ? (b = c, interpolateRgb) : interpolateString : b instanceof color ? interpolateRgb : b instanceof Date ? date : isNumberArray(b) ? numberArray : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : interpolateNumber)(a, b);
}
var degrees = 180 / Math.PI;
var identity$1 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b))
    a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d)
    c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d))
    c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c)
    a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}
var svgNode;
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity$1 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null)
    return identity$1;
  if (!svgNode)
    svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate()))
    return identity$1;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: interpolateNumber(xa, xb) }, { i: i - 2, x: interpolateNumber(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180)
        b += 360;
      else if (b - a > 180)
        a += 360;
      q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b) });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b) });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: interpolateNumber(xa, xb) }, { i: i - 2, x: interpolateNumber(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s = [], q = [];
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n)
        s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
var epsilon2 = 1e-12;
function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}
function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}
function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}
const interpolateZoom = function zoomRho(rho, rho2, rho4) {
  function zoom2(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      };
    } else {
      var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      };
    }
    i.duration = S * 1e3 * rho / Math.SQRT2;
    return i;
  }
  zoom2.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };
  return zoom2;
}(Math.SQRT2, 2, 4);
var frame = 0, timeout$1 = 0, interval = 0, pokeDelay = 1e3, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance === "object" && performance.now ? performance : Date, setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail)
        taskTail._next = this;
      else
        taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0)
      t._call.call(void 0, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout$1 = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay)
    clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time)
        time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame)
    return;
  if (timeout$1)
    timeout$1 = clearTimeout(timeout$1);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity)
      timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval)
      interval = clearInterval(interval);
  } else {
    if (!interval)
      clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}
function timeout(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}
var emptyOn = dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule(node, name, id2, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules)
    node.__transition = {};
  else if (id2 in schedules)
    return;
  create(node, id2, {
    name,
    index,
    // For context during callback.
    group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id2) {
  var schedule2 = get(node, id2);
  if (schedule2.state > CREATED)
    throw new Error("too late; already scheduled");
  return schedule2;
}
function set(node, id2) {
  var schedule2 = get(node, id2);
  if (schedule2.state > STARTED)
    throw new Error("too late; already running");
  return schedule2;
}
function get(node, id2) {
  var schedule2 = node.__transition;
  if (!schedule2 || !(schedule2 = schedule2[id2]))
    throw new Error("transition not found");
  return schedule2;
}
function create(node, id2, self) {
  var schedules = node.__transition, tween;
  schedules[id2] = self;
  self.timer = timer(schedule2, 0, self.time);
  function schedule2(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start2, self.delay, self.time);
    if (self.delay <= elapsed)
      start2(elapsed - self.delay);
  }
  function start2(elapsed) {
    var i, j, n, o;
    if (self.state !== SCHEDULED)
      return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name)
        continue;
      if (o.state === STARTED)
        return timeout(start2);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id2) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING)
      return;
    self.state = STARTED;
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id2];
    for (var i in schedules)
      return;
    delete node.__transition;
  }
}
function interrupt(node, name) {
  var schedules = node.__transition, schedule2, active, empty2 = true, i;
  if (!schedules)
    return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule2 = schedules[i]).name !== name) {
      empty2 = false;
      continue;
    }
    active = schedule2.state > STARTING && schedule2.state < ENDING;
    schedule2.state = ENDED;
    schedule2.timer.stop();
    schedule2.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule2.index, schedule2.group);
    delete schedules[i];
  }
  if (empty2)
    delete node.__transition;
}
function selection_interrupt(name) {
  return this.each(function() {
    interrupt(this, name);
  });
}
function tweenRemove(id2, name) {
  var tween0, tween1;
  return function() {
    var schedule2 = set(this, id2), tween = schedule2.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule2.tween = tween1;
  };
}
function tweenFunction(id2, name, value) {
  var tween0, tween1;
  if (typeof value !== "function")
    throw new Error();
  return function() {
    var schedule2 = set(this, id2), tween = schedule2.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n)
        tween1.push(t);
    }
    schedule2.tween = tween1;
  };
}
function transition_tween(name, value) {
  var id2 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get(this.node(), id2).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
}
function tweenValue(transition, name, value) {
  var id2 = transition._id;
  transition.each(function() {
    var schedule2 = set(this, id2);
    (schedule2.value || (schedule2.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get(node, id2).value[name];
  };
}
function interpolate(a, b) {
  var c;
  return (typeof b === "number" ? interpolateNumber : b instanceof color ? interpolateRgb : (c = color(b)) ? (b = c, interpolateRgb) : interpolateString)(a, b);
}
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, interpolate2, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
  };
}
function attrConstantNS(fullname, interpolate2, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
  };
}
function attrFunction(name, interpolate2, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
  };
}
function attrFunctionNS(fullname, interpolate2, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
  };
}
function transition_attr(name, value) {
  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}
function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function transition_attrTween(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}
function delayFunction(id2, value) {
  return function() {
    init(this, id2).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id2, value) {
  return value = +value, function() {
    init(this, id2).delay = value;
  };
}
function transition_delay(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get(this.node(), id2).delay;
}
function durationFunction(id2, value) {
  return function() {
    set(this, id2).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id2, value) {
  return value = +value, function() {
    set(this, id2).duration = value;
  };
}
function transition_duration(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get(this.node(), id2).duration;
}
function easeConstant(id2, value) {
  if (typeof value !== "function")
    throw new Error();
  return function() {
    set(this, id2).ease = value;
  };
}
function transition_ease(value) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value)) : get(this.node(), id2).ease;
}
function easeVarying(id2, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function")
      throw new Error();
    set(this, id2).ease = v;
  };
}
function transition_easeVarying(value) {
  if (typeof value !== "function")
    throw new Error();
  return this.each(easeVarying(this._id, value));
}
function transition_filter(match) {
  if (typeof match !== "function")
    match = matcher(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}
function transition_merge(transition) {
  if (transition._id !== this._id)
    throw new Error();
  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0)
      t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id2, name, listener) {
  var on0, on1, sit = start(name) ? init : set;
  return function() {
    var schedule2 = sit(this, id2), on = schedule2.on;
    if (on !== on0)
      (on1 = (on0 = on).copy()).on(name, listener);
    schedule2.on = on1;
  };
}
function transition_on(name, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
}
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition)
      if (+i !== id2)
        return;
    if (parent)
      parent.removeChild(this);
  };
}
function transition_remove() {
  return this.on("end.remove", removeFunction(this._id));
}
function transition_select(select2) {
  var name = this._name, id2 = this._id;
  if (typeof select2 !== "function")
    select2 = selector(select2);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select2.call(node, node.__data__, i, group))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id2, i, subgroup, get(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id2);
}
function transition_selectAll(select2) {
  var name = this._name, id2 = this._id;
  if (typeof select2 !== "function")
    select2 = selectorAll(select2);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children2 = select2.call(node, node.__data__, i, group), child, inherit2 = get(node, id2), k = 0, l = children2.length; k < l; ++k) {
          if (child = children2[k]) {
            schedule(child, name, id2, k, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id2);
}
var Selection = selection.prototype.constructor;
function transition_selection() {
  return new Selection(this._groups, this._parents);
}
function styleNull(name, interpolate2) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, string10 = string1);
  };
}
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, interpolate2, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
  };
}
function styleFunction(name, interpolate2, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null)
      string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
  return function() {
    var schedule2 = set(this, id2), on = schedule2.on, listener = schedule2.value[key] == null ? remove2 || (remove2 = styleRemove(name)) : void 0;
    if (on !== on0 || listener0 !== listener)
      (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule2.on = on1;
  };
}
function transition_style(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
}
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function transition_styleTween(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function transition_text(value) {
  return this.tween("text", typeof value === "function" ? textFunction(tweenValue(this, "text", value)) : textConstant(value == null ? "" : value + ""));
}
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function transition_textTween(value) {
  var key = "text";
  if (arguments.length < 1)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key, textTween(value));
}
function transition_transition() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit2 = get(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}
function transition_end() {
  var on0, on1, that = this, id2 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0)
        resolve();
    } };
    that.each(function() {
      var schedule2 = set(this, id2), on = schedule2.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule2.on = on1;
    });
    if (size === 0)
      resolve();
  });
}
var id = 0;
function Transition(groups, parents, name, id2) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id2;
}
function newId() {
  return ++id;
}
var selection_prototype = selection.prototype;
Transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition_transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  textTween: transition_textTween,
  remove: transition_remove,
  tween: transition_tween,
  delay: transition_delay,
  duration: transition_duration,
  ease: transition_ease,
  easeVarying: transition_easeVarying,
  end: transition_end,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function selection_transition(name) {
  var id2, timing;
  if (name instanceof Transition) {
    id2 = name._id, name = name._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id2, i, group, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups, this._parents, name, id2);
}
selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;
const constant = (x) => () => x;
function ZoomEvent(type, {
  sourceEvent: sourceEvent2,
  target,
  transform,
  dispatch: dispatch2
}) {
  Object.defineProperties(this, {
    type: { value: type, enumerable: true, configurable: true },
    sourceEvent: { value: sourceEvent2, enumerable: true, configurable: true },
    target: { value: target, enumerable: true, configurable: true },
    transform: { value: transform, enumerable: true, configurable: true },
    _: { value: dispatch2 }
  });
}
function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var identity = new Transform(1, 0, 0);
Transform.prototype;
function nopropagation(event) {
  event.stopImmediatePropagation();
}
function noevent(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}
function defaultFilter(event) {
  return (!event.ctrlKey || event.type === "wheel") && !event.button;
}
function defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}
function defaultTransform() {
  return this.__zoom || identity;
}
function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 2e-3) * (event.ctrlKey ? 10 : 1);
}
function defaultTouchable() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function defaultConstrain(transform, extent, translateExtent) {
  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0], dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0], dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1], dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
  return transform.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}
function zoom() {
  var filter2 = defaultFilter, extent = defaultExtent, constrain = defaultConstrain, wheelDelta2 = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate2 = interpolateZoom, listeners = dispatch("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
  function zoom2(selection2) {
    selection2.property("__zoom", defaultTransform).on("wheel.zoom", wheeled, { passive: false }).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  zoom2.transform = function(collection, transform, point, event) {
    var selection2 = collection.selection ? collection.selection() : collection;
    selection2.property("__zoom", defaultTransform);
    if (collection !== selection2) {
      schedule2(collection, transform, point, event);
    } else {
      selection2.interrupt().each(function() {
        gesture(this, arguments).event(event).start().zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform).end();
      });
    }
  };
  zoom2.scaleBy = function(selection2, k, p, event) {
    zoom2.scaleTo(selection2, function() {
      var k0 = this.__zoom.k, k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    }, p, event);
  };
  zoom2.scaleTo = function(selection2, k, p, event) {
    zoom2.transform(selection2, function() {
      var e = extent.apply(this, arguments), t0 = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t0.invert(p0), k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    }, p, event);
  };
  zoom2.translateBy = function(selection2, x, y, event) {
    zoom2.transform(selection2, function() {
      return constrain(this.__zoom.translate(
        typeof x === "function" ? x.apply(this, arguments) : x,
        typeof y === "function" ? y.apply(this, arguments) : y
      ), extent.apply(this, arguments), translateExtent);
    }, null, event);
  };
  zoom2.translateTo = function(selection2, x, y, p, event) {
    zoom2.transform(selection2, function() {
      var e = extent.apply(this, arguments), t = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(identity.translate(p0[0], p0[1]).scale(t.k).translate(
        typeof x === "function" ? -x.apply(this, arguments) : -x,
        typeof y === "function" ? -y.apply(this, arguments) : -y
      ), e, translateExtent);
    }, p, event);
  };
  function scale(transform, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
  }
  function translate(transform, p0, p1) {
    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
    return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
  }
  function centroid(extent2) {
    return [(+extent2[0][0] + +extent2[1][0]) / 2, (+extent2[0][1] + +extent2[1][1]) / 2];
  }
  function schedule2(transition, transform, point, event) {
    transition.on("start.zoom", function() {
      gesture(this, arguments).event(event).start();
    }).on("interrupt.zoom end.zoom", function() {
      gesture(this, arguments).event(event).end();
    }).tween("zoom", function() {
      var that = this, args = arguments, g = gesture(that, args).event(event), e = extent.apply(that, args), p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point, w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a = that.__zoom, b = typeof transform === "function" ? transform.apply(that, args) : transform, i = interpolate2(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
      return function(t) {
        if (t === 1)
          t = b;
        else {
          var l = i(t), k = w / l[2];
          t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
        }
        g.zoom(null, t);
      };
    });
  }
  function gesture(that, args, clean) {
    return !clean && that.__zooming || new Gesture(that, args);
  }
  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }
  Gesture.prototype = {
    event: function(event) {
      if (event)
        this.sourceEvent = event;
      return this;
    },
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform) {
      if (this.mouse && key !== "mouse")
        this.mouse[1] = transform.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch")
        this.touch0[1] = transform.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch")
        this.touch1[1] = transform.invert(this.touch1[0]);
      this.that.__zoom = transform;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type) {
      var d = select(this.that).datum();
      listeners.call(
        type,
        this.that,
        new ZoomEvent(type, {
          sourceEvent: this.sourceEvent,
          target: zoom2,
          transform: this.that.__zoom,
          dispatch: listeners
        }),
        d
      );
    }
  };
  function wheeled(event, ...args) {
    if (!filter2.apply(this, arguments))
      return;
    var g = gesture(this, args).event(event), t = this.__zoom, k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta2.apply(this, arguments)))), p = pointer(event);
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    } else if (t.k === k)
      return;
    else {
      g.mouse = [p, t.invert(p)];
      interrupt(this);
      g.start();
    }
    noevent(event);
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }
  function mousedowned(event, ...args) {
    if (touchending || !filter2.apply(this, arguments))
      return;
    var currentTarget = event.currentTarget, g = gesture(this, args, true).event(event), v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = pointer(event, currentTarget), x0 = event.clientX, y0 = event.clientY;
    dragDisable(event.view);
    nopropagation(event);
    g.mouse = [p, this.__zoom.invert(p)];
    interrupt(this);
    g.start();
    function mousemoved(event2) {
      noevent(event2);
      if (!g.moved) {
        var dx = event2.clientX - x0, dy = event2.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.event(event2).zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event2, currentTarget), g.mouse[1]), g.extent, translateExtent));
    }
    function mouseupped(event2) {
      v.on("mousemove.zoom mouseup.zoom", null);
      yesdrag(event2.view, g.moved);
      noevent(event2);
      g.event(event2).end();
    }
  }
  function dblclicked(event, ...args) {
    if (!filter2.apply(this, arguments))
      return;
    var t0 = this.__zoom, p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p0), k1 = t0.k * (event.shiftKey ? 0.5 : 2), t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);
    noevent(event);
    if (duration > 0)
      select(this).transition().duration(duration).call(schedule2, t1, p0, event);
    else
      select(this).call(zoom2.transform, t1, p0, event);
  }
  function touchstarted(event, ...args) {
    if (!filter2.apply(this, arguments))
      return;
    var touches = event.touches, n = touches.length, g = gesture(this, args, event.changedTouches.length === n).event(event), started, i, t, p;
    nopropagation(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer(t, this);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0)
        g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
      else if (!g.touch1 && g.touch0[2] !== p[2])
        g.touch1 = p, g.taps = 0;
    }
    if (touchstarting)
      touchstarting = clearTimeout(touchstarting);
    if (started) {
      if (g.taps < 2)
        touchfirst = p[0], touchstarting = setTimeout(function() {
          touchstarting = null;
        }, touchDelay);
      interrupt(this);
      g.start();
    }
  }
  function touchmoved(event, ...args) {
    if (!this.__zooming)
      return;
    var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t, p, l;
    noevent(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer(t, this);
      if (g.touch0 && g.touch0[2] === t.identifier)
        g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier)
        g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    } else if (g.touch0)
      p = g.touch0[0], l = g.touch0[1];
    else
      return;
    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }
  function touchended(event, ...args) {
    if (!this.__zooming)
      return;
    var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t;
    nopropagation(event);
    if (touchending)
      clearTimeout(touchending);
    touchending = setTimeout(function() {
      touchending = null;
    }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier)
        delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier)
        delete g.touch1;
    }
    if (g.touch1 && !g.touch0)
      g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0)
      g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else {
      g.end();
      if (g.taps === 2) {
        t = pointer(t, this);
        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
          var p = select(this).on("dblclick.zoom");
          if (p)
            p.apply(this, arguments);
        }
      }
    }
  }
  zoom2.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta2 = typeof _ === "function" ? _ : constant(+_), zoom2) : wheelDelta2;
  };
  zoom2.filter = function(_) {
    return arguments.length ? (filter2 = typeof _ === "function" ? _ : constant(!!_), zoom2) : filter2;
  };
  zoom2.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom2) : touchable;
  };
  zoom2.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom2) : extent;
  };
  zoom2.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom2) : [scaleExtent[0], scaleExtent[1]];
  };
  zoom2.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom2) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };
  zoom2.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom2) : constrain;
  };
  zoom2.duration = function(_) {
    return arguments.length ? (duration = +_, zoom2) : duration;
  };
  zoom2.interpolate = function(_) {
    return arguments.length ? (interpolate2 = _, zoom2) : interpolate2;
  };
  zoom2.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom2 : value;
  };
  zoom2.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom2) : Math.sqrt(clickDistance2);
  };
  zoom2.tapDistance = function(_) {
    return arguments.length ? (tapDistance = +_, zoom2) : tapDistance;
  };
  return zoom2;
}
var Position = /* @__PURE__ */ ((Position2) => {
  Position2["Left"] = "left";
  Position2["Top"] = "top";
  Position2["Right"] = "right";
  Position2["Bottom"] = "bottom";
  return Position2;
})(Position || {});
var SelectionMode = /* @__PURE__ */ ((SelectionMode2) => {
  SelectionMode2["Partial"] = "partial";
  SelectionMode2["Full"] = "full";
  return SelectionMode2;
})(SelectionMode || {});
var ConnectionLineType = /* @__PURE__ */ ((ConnectionLineType2) => {
  ConnectionLineType2["Bezier"] = "default";
  ConnectionLineType2["SimpleBezier"] = "simple-bezier";
  ConnectionLineType2["Straight"] = "straight";
  ConnectionLineType2["Step"] = "step";
  ConnectionLineType2["SmoothStep"] = "smoothstep";
  return ConnectionLineType2;
})(ConnectionLineType || {});
var ConnectionMode = /* @__PURE__ */ ((ConnectionMode2) => {
  ConnectionMode2["Strict"] = "strict";
  ConnectionMode2["Loose"] = "loose";
  return ConnectionMode2;
})(ConnectionMode || {});
var MarkerType = /* @__PURE__ */ ((MarkerType2) => {
  MarkerType2["Arrow"] = "arrow";
  MarkerType2["ArrowClosed"] = "arrowclosed";
  return MarkerType2;
})(MarkerType || {});
var PanOnScrollMode = /* @__PURE__ */ ((PanOnScrollMode2) => {
  PanOnScrollMode2["Free"] = "free";
  PanOnScrollMode2["Vertical"] = "vertical";
  PanOnScrollMode2["Horizontal"] = "horizontal";
  return PanOnScrollMode2;
})(PanOnScrollMode || {});
const inputTags = ["INPUT", "SELECT", "TEXTAREA"];
const defaultDoc = typeof document !== "undefined" ? document : null;
function isInputDOMNode(event) {
  var _a, _b;
  const target = ((_b = (_a = event.composedPath) == null ? void 0 : _a.call(event)) == null ? void 0 : _b[0]) || event.target;
  const hasAttribute = typeof (target == null ? void 0 : target.hasAttribute) === "function" ? target.hasAttribute("contenteditable") : false;
  const closest = typeof (target == null ? void 0 : target.closest) === "function" ? target.closest(".nokey") : null;
  return inputTags.includes(target == null ? void 0 : target.nodeName) || hasAttribute || !!closest;
}
function wasModifierPressed(event) {
  return event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;
}
function isKeyMatch(pressedKey, keyToMatch, pressedKeys, isKeyUp) {
  const keyCombination = keyToMatch.replace("+", "\n").replace("\n\n", "\n+").split("\n").map((k) => k.trim().toLowerCase());
  if (keyCombination.length === 1) {
    return pressedKey.toLowerCase() === keyToMatch.toLowerCase();
  }
  if (!isKeyUp) {
    pressedKeys.add(pressedKey.toLowerCase());
  }
  const isMatch = keyCombination.every(
    (key, index) => pressedKeys.has(key) && Array.from(pressedKeys.values())[index] === keyCombination[index]
  );
  if (isKeyUp) {
    pressedKeys.delete(pressedKey.toLowerCase());
  }
  return isMatch;
}
function createKeyPredicate(keyFilter, pressedKeys) {
  return (event) => {
    if (!event.code && !event.key) {
      return false;
    }
    const keyOrCode = useKeyOrCode(event.code, keyFilter);
    if (Array.isArray(keyFilter)) {
      return keyFilter.some((key) => isKeyMatch(event[keyOrCode], key, pressedKeys, event.type === "keyup"));
    }
    return isKeyMatch(event[keyOrCode], keyFilter, pressedKeys, event.type === "keyup");
  };
}
function useKeyOrCode(code, keysToWatch) {
  return keysToWatch.includes(code) ? "code" : "key";
}
function useKeyPress(keyFilter, options) {
  const target = computed(() => toValue$1(options == null ? void 0 : options.target) ?? defaultDoc);
  const isPressed = shallowRef(toValue$1(keyFilter) === true);
  let modifierPressed = false;
  const pressedKeys = /* @__PURE__ */ new Set();
  let currentFilter = createKeyFilterFn(toValue$1(keyFilter));
  watch(
    () => toValue$1(keyFilter),
    (nextKeyFilter, previousKeyFilter) => {
      if (typeof previousKeyFilter === "boolean" && typeof nextKeyFilter !== "boolean") {
        reset();
      }
      currentFilter = createKeyFilterFn(nextKeyFilter);
    },
    {
      immediate: true
    }
  );
  useEventListener(["blur", "contextmenu"], reset);
  onKeyStroke(
    (...args) => currentFilter(...args),
    (e) => {
      var _a, _b;
      const actInsideInputWithModifier = toValue$1(options == null ? void 0 : options.actInsideInputWithModifier) ?? true;
      const preventDefault = toValue$1(options == null ? void 0 : options.preventDefault) ?? false;
      modifierPressed = wasModifierPressed(e);
      const preventAction = (!modifierPressed || modifierPressed && !actInsideInputWithModifier) && isInputDOMNode(e);
      if (preventAction) {
        return;
      }
      const target2 = ((_b = (_a = e.composedPath) == null ? void 0 : _a.call(e)) == null ? void 0 : _b[0]) || e.target;
      const isInteractiveElement = (target2 == null ? void 0 : target2.nodeName) === "BUTTON" || (target2 == null ? void 0 : target2.nodeName) === "A";
      if (!preventDefault && (modifierPressed || !isInteractiveElement)) {
        e.preventDefault();
      }
      isPressed.value = true;
    },
    { eventName: "keydown", target }
  );
  onKeyStroke(
    (...args) => currentFilter(...args),
    (e) => {
      const actInsideInputWithModifier = toValue$1(options == null ? void 0 : options.actInsideInputWithModifier) ?? true;
      if (isPressed.value) {
        const preventAction = (!modifierPressed || modifierPressed && !actInsideInputWithModifier) && isInputDOMNode(e);
        if (preventAction) {
          return;
        }
        modifierPressed = false;
        isPressed.value = false;
      }
    },
    { eventName: "keyup", target }
  );
  function reset() {
    modifierPressed = false;
    pressedKeys.clear();
    isPressed.value = toValue$1(keyFilter) === true;
  }
  function createKeyFilterFn(keyFilter2) {
    if (keyFilter2 === null) {
      reset();
      return () => false;
    }
    if (typeof keyFilter2 === "boolean") {
      reset();
      isPressed.value = keyFilter2;
      return () => false;
    }
    if (Array.isArray(keyFilter2) || typeof keyFilter2 === "string") {
      return createKeyPredicate(keyFilter2, pressedKeys);
    }
    return keyFilter2;
  }
  return isPressed;
}
const ARIA_NODE_DESC_KEY = "vue-flow__node-desc";
const ARIA_EDGE_DESC_KEY = "vue-flow__edge-desc";
const ARIA_LIVE_MESSAGE = "vue-flow__aria-live";
const elementSelectionKeys = ["Enter", " ", "Escape"];
const arrowKeyDiffs = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
};
function nodeToRect(node) {
  return {
    ...node.computedPosition || { x: 0, y: 0 },
    width: node.dimensions.width || 0,
    height: node.dimensions.height || 0
  };
}
function getOverlappingArea(rectA, rectB) {
  const xOverlap = Math.max(0, Math.min(rectA.x + rectA.width, rectB.x + rectB.width) - Math.max(rectA.x, rectB.x));
  const yOverlap = Math.max(0, Math.min(rectA.y + rectA.height, rectB.y + rectB.height) - Math.max(rectA.y, rectB.y));
  return Math.ceil(xOverlap * yOverlap);
}
function getDimensions(node) {
  return {
    width: node.offsetWidth,
    height: node.offsetHeight
  };
}
function clamp(val, min = 0, max = 1) {
  return Math.min(Math.max(val, min), max);
}
function clampPosition(position, extent) {
  return {
    x: clamp(position.x, extent[0][0], extent[1][0]),
    y: clamp(position.y, extent[0][1], extent[1][1])
  };
}
function getHostForElement(element) {
  const doc = element.getRootNode();
  if ("elementFromPoint" in doc) {
    return doc;
  }
  return window.document;
}
function isEdge(element) {
  return element && typeof element === "object" && "id" in element && "source" in element && "target" in element;
}
function isNode(element) {
  return element && typeof element === "object" && "id" in element && "position" in element && !isEdge(element);
}
function isGraphNode(element) {
  return isNode(element) && "computedPosition" in element;
}
function isNumeric(n) {
  return !Number.isNaN(n) && Number.isFinite(n);
}
function isRect(obj) {
  return isNumeric(obj.width) && isNumeric(obj.height) && isNumeric(obj.x) && isNumeric(obj.y);
}
function parseNode(node, existingNode, parentNode) {
  const initialState = {
    id: node.id.toString(),
    type: node.type ?? "default",
    dimensions: markRaw({
      width: 0,
      height: 0
    }),
    computedPosition: markRaw({
      z: 0,
      ...node.position
    }),
    // todo: shouldn't be defined initially, as we want to use handleBounds to check if a node was actually initialized or not
    handleBounds: {
      source: [],
      target: []
    },
    draggable: void 0,
    selectable: void 0,
    connectable: void 0,
    focusable: void 0,
    selected: false,
    dragging: false,
    resizing: false,
    initialized: false,
    isParent: false,
    position: {
      x: 0,
      y: 0
    },
    data: isDef(node.data) ? node.data : {},
    events: markRaw(isDef(node.events) ? node.events : {})
  };
  return Object.assign(existingNode ?? initialState, node, { id: node.id.toString(), parentNode });
}
function parseEdge(edge, existingEdge, defaultEdgeOptions) {
  var _a, _b;
  const initialState = {
    id: edge.id.toString(),
    type: edge.type ?? (existingEdge == null ? void 0 : existingEdge.type) ?? "default",
    source: edge.source.toString(),
    target: edge.target.toString(),
    sourceHandle: (_a = edge.sourceHandle) == null ? void 0 : _a.toString(),
    targetHandle: (_b = edge.targetHandle) == null ? void 0 : _b.toString(),
    updatable: edge.updatable ?? (defaultEdgeOptions == null ? void 0 : defaultEdgeOptions.updatable),
    selectable: edge.selectable ?? (defaultEdgeOptions == null ? void 0 : defaultEdgeOptions.selectable),
    focusable: edge.focusable ?? (defaultEdgeOptions == null ? void 0 : defaultEdgeOptions.focusable),
    data: isDef(edge.data) ? edge.data : {},
    events: markRaw(isDef(edge.events) ? edge.events : {}),
    label: edge.label ?? "",
    interactionWidth: edge.interactionWidth ?? (defaultEdgeOptions == null ? void 0 : defaultEdgeOptions.interactionWidth),
    ...defaultEdgeOptions ?? {}
  };
  return Object.assign(existingEdge ?? initialState, edge, { id: edge.id.toString() });
}
function getConnectedElements(nodeOrId, nodes, edges, dir) {
  const id2 = typeof nodeOrId === "string" ? nodeOrId : nodeOrId.id;
  const connectedIds = /* @__PURE__ */ new Set();
  const origin = dir === "source" ? "target" : "source";
  for (const edge of edges) {
    if (edge[origin] === id2) {
      connectedIds.add(edge[dir]);
    }
  }
  return nodes.filter((n) => connectedIds.has(n.id));
}
function getOutgoers(...args) {
  if (args.length === 3) {
    const [nodeOrId2, nodes, edges] = args;
    return getConnectedElements(nodeOrId2, nodes, edges, "target");
  }
  const [nodeOrId, elements] = args;
  const nodeId = typeof nodeOrId === "string" ? nodeOrId : nodeOrId.id;
  const outgoers = elements.filter((el) => isEdge(el) && el.source === nodeId);
  return outgoers.map((edge) => elements.find((el) => isNode(el) && el.id === edge.target));
}
function getIncomers(...args) {
  if (args.length === 3) {
    const [nodeOrId2, nodes, edges] = args;
    return getConnectedElements(nodeOrId2, nodes, edges, "source");
  }
  const [nodeOrId, elements] = args;
  const nodeId = typeof nodeOrId === "string" ? nodeOrId : nodeOrId.id;
  const incomers = elements.filter((el) => isEdge(el) && el.target === nodeId);
  return incomers.map((edge) => elements.find((el) => isNode(el) && el.id === edge.source));
}
function getEdgeId({ source, sourceHandle, target, targetHandle }) {
  return `vueflow__edge-${source}${sourceHandle ?? ""}-${target}${targetHandle ?? ""}`;
}
function connectionExists(edge, elements) {
  return elements.some(
    (el) => isEdge(el) && el.source === edge.source && el.target === edge.target && (el.sourceHandle === edge.sourceHandle || !el.sourceHandle && !edge.sourceHandle) && (el.targetHandle === edge.targetHandle || !el.targetHandle && !edge.targetHandle)
  );
}
function rendererPointToPoint({ x, y }, { x: tx, y: ty, zoom: tScale }) {
  return {
    x: x * tScale + tx,
    y: y * tScale + ty
  };
}
function pointToRendererPoint({ x, y }, { x: tx, y: ty, zoom: tScale }, snapToGrid = false, snapGrid = [1, 1]) {
  const position = {
    x: (x - tx) / tScale,
    y: (y - ty) / tScale
  };
  return snapToGrid ? snapPosition(position, snapGrid) : position;
}
function getBoundsOfBoxes(box1, box2) {
  return {
    x: Math.min(box1.x, box2.x),
    y: Math.min(box1.y, box2.y),
    x2: Math.max(box1.x2, box2.x2),
    y2: Math.max(box1.y2, box2.y2)
  };
}
function rectToBox({ x, y, width, height }) {
  return {
    x,
    y,
    x2: x + width,
    y2: y + height
  };
}
function boxToRect({ x, y, x2, y2 }) {
  return {
    x,
    y,
    width: x2 - x,
    height: y2 - y
  };
}
function getRectOfNodes(nodes) {
  let box = {
    x: Number.POSITIVE_INFINITY,
    y: Number.POSITIVE_INFINITY,
    x2: Number.NEGATIVE_INFINITY,
    y2: Number.NEGATIVE_INFINITY
  };
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    box = getBoundsOfBoxes(
      box,
      rectToBox({
        ...node.computedPosition,
        ...node.dimensions
      })
    );
  }
  return boxToRect(box);
}
function getNodesInside(nodes, rect, viewport = { x: 0, y: 0, zoom: 1 }, partially = false, excludeNonSelectableNodes = false) {
  const paneRect = {
    ...pointToRendererPoint(rect, viewport),
    width: rect.width / viewport.zoom,
    height: rect.height / viewport.zoom
  };
  const visibleNodes = [];
  for (const node of nodes) {
    const { dimensions, selectable = true, hidden = false } = node;
    const width = dimensions.width ?? node.width ?? null;
    const height = dimensions.height ?? node.height ?? null;
    if (excludeNonSelectableNodes && !selectable || hidden) {
      continue;
    }
    const overlappingArea = getOverlappingArea(paneRect, nodeToRect(node));
    const notInitialized = width === null || height === null;
    const partiallyVisible = partially && overlappingArea > 0;
    const area = (width ?? 0) * (height ?? 0);
    const isVisible = notInitialized || partiallyVisible || overlappingArea >= area;
    if (isVisible || node.dragging) {
      visibleNodes.push(node);
    }
  }
  return visibleNodes;
}
function getConnectedEdges(nodesOrId, edges) {
  const nodeIds = /* @__PURE__ */ new Set();
  if (typeof nodesOrId === "string") {
    nodeIds.add(nodesOrId);
  } else if (nodesOrId.length >= 1) {
    for (const n of nodesOrId) {
      nodeIds.add(n.id);
    }
  }
  return edges.filter((edge) => nodeIds.has(edge.source) || nodeIds.has(edge.target));
}
function getTransformForBounds(bounds, width, height, minZoom, maxZoom, padding = 0.1, offset = { x: 0, y: 0 }) {
  const xZoom = width / (bounds.width * (1 + padding));
  const yZoom = height / (bounds.height * (1 + padding));
  const zoom2 = Math.min(xZoom, yZoom);
  const clampedZoom = clamp(zoom2, minZoom, maxZoom);
  const boundsCenterX = bounds.x + bounds.width / 2;
  const boundsCenterY = bounds.y + bounds.height / 2;
  const x = width / 2 - boundsCenterX * clampedZoom + (offset.x ?? 0);
  const y = height / 2 - boundsCenterY * clampedZoom + (offset.y ?? 0);
  return { x, y, zoom: clampedZoom };
}
function getXYZPos(parentPos, computedPosition) {
  return {
    x: computedPosition.x + parentPos.x,
    y: computedPosition.y + parentPos.y,
    z: (parentPos.z > computedPosition.z ? parentPos.z : computedPosition.z) + 1
  };
}
function isParentSelected(node, nodeLookup) {
  if (!node.parentNode) {
    return false;
  }
  const parent = nodeLookup.get(node.parentNode);
  if (!parent) {
    return false;
  }
  if (parent.selected) {
    return true;
  }
  return isParentSelected(parent, nodeLookup);
}
function getMarkerId(marker, vueFlowId) {
  if (typeof marker === "undefined") {
    return "";
  }
  if (typeof marker === "string") {
    return marker;
  }
  const idPrefix = vueFlowId ? `${vueFlowId}__` : "";
  return `${idPrefix}${Object.keys(marker).sort().map((key) => `${key}=${marker[key]}`).join("&")}`;
}
function wheelDelta(event) {
  const factor = event.ctrlKey && isMacOs() ? 10 : 1;
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 2e-3) * factor;
}
function calcAutoPanVelocity(value, min, max) {
  if (value < min) {
    return clamp(Math.abs(value - min), 1, min) / min;
  }
  if (value > max) {
    return -clamp(Math.abs(value - max), 1, min) / min;
  }
  return 0;
}
function calcAutoPan(pos, bounds, speed = 15, distance2 = 40) {
  const xMovement = calcAutoPanVelocity(pos.x, distance2, bounds.width - distance2) * speed;
  const yMovement = calcAutoPanVelocity(pos.y, distance2, bounds.height - distance2) * speed;
  return [xMovement, yMovement];
}
function handleParentExpand(updateItem, parent) {
  if (parent) {
    const extendWidth = updateItem.position.x + updateItem.dimensions.width - parent.dimensions.width;
    const extendHeight = updateItem.position.y + updateItem.dimensions.height - parent.dimensions.height;
    if (extendWidth > 0 || extendHeight > 0 || updateItem.position.x < 0 || updateItem.position.y < 0) {
      let parentStyles = {};
      if (typeof parent.style === "function") {
        parentStyles = { ...parent.style(parent) };
      } else if (parent.style) {
        parentStyles = { ...parent.style };
      }
      parentStyles.width = parentStyles.width ?? `${parent.dimensions.width}px`;
      parentStyles.height = parentStyles.height ?? `${parent.dimensions.height}px`;
      if (extendWidth > 0) {
        if (typeof parentStyles.width === "string") {
          const currWidth = Number(parentStyles.width.replace("px", ""));
          parentStyles.width = `${currWidth + extendWidth}px`;
        } else {
          parentStyles.width += extendWidth;
        }
      }
      if (extendHeight > 0) {
        if (typeof parentStyles.height === "string") {
          const currWidth = Number(parentStyles.height.replace("px", ""));
          parentStyles.height = `${currWidth + extendHeight}px`;
        } else {
          parentStyles.height += extendHeight;
        }
      }
      if (updateItem.position.x < 0) {
        const xDiff = Math.abs(updateItem.position.x);
        parent.position.x = parent.position.x - xDiff;
        if (typeof parentStyles.width === "string") {
          const currWidth = Number(parentStyles.width.replace("px", ""));
          parentStyles.width = `${currWidth + xDiff}px`;
        } else {
          parentStyles.width += xDiff;
        }
        updateItem.position.x = 0;
      }
      if (updateItem.position.y < 0) {
        const yDiff = Math.abs(updateItem.position.y);
        parent.position.y = parent.position.y - yDiff;
        if (typeof parentStyles.height === "string") {
          const currWidth = Number(parentStyles.height.replace("px", ""));
          parentStyles.height = `${currWidth + yDiff}px`;
        } else {
          parentStyles.height += yDiff;
        }
        updateItem.position.y = 0;
      }
      parent.dimensions.width = Number(parentStyles.width.toString().replace("px", ""));
      parent.dimensions.height = Number(parentStyles.height.toString().replace("px", ""));
      if (typeof parent.style === "function") {
        parent.style = (p) => {
          const styleFunc = parent.style;
          return {
            ...styleFunc(p),
            ...parentStyles
          };
        };
      } else {
        parent.style = {
          ...parent.style,
          ...parentStyles
        };
      }
    }
  }
}
function applyChanges(changes, elements) {
  var _a, _b;
  const addRemoveChanges = changes.filter((c) => c.type === "add" || c.type === "remove");
  for (const change of addRemoveChanges) {
    if (change.type === "add") {
      const index = elements.findIndex((el) => el.id === change.item.id);
      if (index === -1) {
        elements.push(change.item);
      }
    } else if (change.type === "remove") {
      const index = elements.findIndex((el) => el.id === change.id);
      if (index !== -1) {
        elements.splice(index, 1);
      }
    }
  }
  const elementIds = elements.map((el) => el.id);
  for (const element of elements) {
    for (const currentChange of changes) {
      if (currentChange.id !== element.id) {
        continue;
      }
      switch (currentChange.type) {
        case "select":
          element.selected = currentChange.selected;
          break;
        case "position":
          if (isGraphNode(element)) {
            if (typeof currentChange.position !== "undefined") {
              element.position = currentChange.position;
            }
            if (typeof currentChange.dragging !== "undefined") {
              element.dragging = currentChange.dragging;
            }
            if (element.expandParent && element.parentNode) {
              const parent = elements[elementIds.indexOf(element.parentNode)];
              if (parent && isGraphNode(parent)) {
                handleParentExpand(element, parent);
              }
            }
          }
          break;
        case "dimensions":
          if (isGraphNode(element)) {
            if (typeof currentChange.dimensions !== "undefined") {
              element.dimensions = currentChange.dimensions;
            }
            if (typeof currentChange.updateStyle !== "undefined" && currentChange.updateStyle) {
              element.style = {
                ...element.style || {},
                width: `${(_a = currentChange.dimensions) == null ? void 0 : _a.width}px`,
                height: `${(_b = currentChange.dimensions) == null ? void 0 : _b.height}px`
              };
            }
            if (typeof currentChange.resizing !== "undefined") {
              element.resizing = currentChange.resizing;
            }
            if (element.expandParent && element.parentNode) {
              const parent = elements[elementIds.indexOf(element.parentNode)];
              if (parent && isGraphNode(parent)) {
                const parentInit = !!parent.dimensions.width && !!parent.dimensions.height;
                if (!parentInit) {
                  nextTick(() => {
                    handleParentExpand(element, parent);
                  });
                } else {
                  handleParentExpand(element, parent);
                }
              }
            }
          }
          break;
      }
    }
  }
  return elements;
}
function createSelectionChange(id2, selected) {
  return {
    id: id2,
    type: "select",
    selected
  };
}
function createAdditionChange(item) {
  return {
    item,
    type: "add"
  };
}
function createNodeRemoveChange(id2) {
  return {
    id: id2,
    type: "remove"
  };
}
function createEdgeRemoveChange(id2, source, target, sourceHandle, targetHandle) {
  return {
    id: id2,
    source,
    target,
    sourceHandle: sourceHandle || null,
    targetHandle: targetHandle || null,
    type: "remove"
  };
}
function getSelectionChanges(items, selectedIds = /* @__PURE__ */ new Set(), mutateItem = false) {
  const changes = [];
  for (const [id2, item] of items) {
    const willBeSelected = selectedIds.has(id2);
    if (!(item.selected === void 0 && !willBeSelected) && item.selected !== willBeSelected) {
      if (mutateItem) {
        item.selected = willBeSelected;
      }
      changes.push(createSelectionChange(item.id, willBeSelected));
    }
  }
  return changes;
}
const noop$1 = () => {
};
function createExtendedEventHook(defaultHandler) {
  const listeners = /* @__PURE__ */ new Set();
  let emitter = noop$1;
  let hasEmitListeners = () => false;
  const hasListeners = () => listeners.size > 0 || hasEmitListeners();
  const setEmitter = (fn) => {
    emitter = fn;
  };
  const removeEmitter = () => {
    emitter = noop$1;
  };
  const setHasEmitListeners = (fn) => {
    hasEmitListeners = fn;
  };
  const removeHasEmitListeners = () => {
    hasEmitListeners = () => false;
  };
  const off = (fn) => {
    listeners.delete(fn);
  };
  const on = (fn) => {
    listeners.add(fn);
    const offFn = () => off(fn);
    tryOnScopeDispose(offFn);
    return { off: offFn };
  };
  const trigger = (param) => {
    const queue = [emitter];
    if (hasListeners()) {
      queue.push(...listeners);
    } else if (defaultHandler) {
      queue.push(defaultHandler);
    }
    return Promise.allSettled(queue.map((fn) => fn(param)));
  };
  return {
    on,
    off,
    trigger,
    hasListeners,
    listeners,
    setEmitter,
    removeEmitter,
    setHasEmitListeners,
    removeHasEmitListeners
  };
}
function hasSelector(target, selector2, node) {
  let current = target;
  do {
    if (current && current.matches(selector2)) {
      return true;
    } else if (current === node) {
      return false;
    }
    current = current.parentElement;
  } while (current);
  return false;
}
function getDragItems(nodeLookup, nodesDraggable, mousePos, nodeId) {
  var _a, _b;
  const dragItems = /* @__PURE__ */ new Map();
  for (const [id2, node] of nodeLookup) {
    if ((node.selected || node.id === nodeId) && (!node.parentNode || !isParentSelected(node, nodeLookup)) && (node.draggable || nodesDraggable && typeof node.draggable === "undefined")) {
      const internalNode = nodeLookup.get(id2);
      if (internalNode) {
        dragItems.set(id2, {
          id: node.id,
          position: node.position || { x: 0, y: 0 },
          distance: {
            x: mousePos.x - ((_a = node.computedPosition) == null ? void 0 : _a.x) || 0,
            y: mousePos.y - ((_b = node.computedPosition) == null ? void 0 : _b.y) || 0
          },
          from: { x: node.computedPosition.x, y: node.computedPosition.y },
          extent: node.extent,
          parentNode: node.parentNode,
          dimensions: { ...node.dimensions },
          expandParent: node.expandParent
        });
      }
    }
  }
  return Array.from(dragItems.values());
}
function getEventHandlerParams({
  id: id2,
  dragItems,
  findNode
}) {
  const extendedDragItems = [];
  for (const dragItem of dragItems) {
    const node = findNode(dragItem.id);
    if (node) {
      extendedDragItems.push(node);
    }
  }
  return [id2 ? extendedDragItems.find((n) => n.id === id2) : extendedDragItems[0], extendedDragItems];
}
function getExtentPadding(padding) {
  if (Array.isArray(padding)) {
    switch (padding.length) {
      case 1:
        return [padding[0], padding[0], padding[0], padding[0]];
      case 2:
        return [padding[0], padding[1], padding[0], padding[1]];
      case 3:
        return [padding[0], padding[1], padding[2], padding[1]];
      case 4:
        return padding;
      default:
        return [0, 0, 0, 0];
    }
  }
  return [padding, padding, padding, padding];
}
function getParentExtent(currentExtent, node, parent) {
  const [top, right, bottom, left] = typeof currentExtent !== "string" ? getExtentPadding(currentExtent.padding) : [0, 0, 0, 0];
  if (parent && typeof parent.computedPosition.x !== "undefined" && typeof parent.computedPosition.y !== "undefined" && typeof parent.dimensions.width !== "undefined" && typeof parent.dimensions.height !== "undefined") {
    return [
      [parent.computedPosition.x + left, parent.computedPosition.y + top],
      [
        parent.computedPosition.x + parent.dimensions.width - right,
        parent.computedPosition.y + parent.dimensions.height - bottom
      ]
    ];
  }
  return false;
}
function getExtent(item, triggerError, extent, parent) {
  let currentExtent = item.extent || extent;
  if ((currentExtent === "parent" || !Array.isArray(currentExtent) && (currentExtent == null ? void 0 : currentExtent.range) === "parent") && !item.expandParent) {
    if (item.parentNode && parent && item.dimensions.width && item.dimensions.height) {
      const parentExtent = getParentExtent(currentExtent, item, parent);
      if (parentExtent) {
        currentExtent = parentExtent;
      }
    } else {
      triggerError(new VueFlowError(ErrorCode.NODE_EXTENT_INVALID, item.id));
      currentExtent = extent;
    }
  } else if (Array.isArray(currentExtent)) {
    const parentX = (parent == null ? void 0 : parent.computedPosition.x) || 0;
    const parentY = (parent == null ? void 0 : parent.computedPosition.y) || 0;
    currentExtent = [
      [currentExtent[0][0] + parentX, currentExtent[0][1] + parentY],
      [currentExtent[1][0] + parentX, currentExtent[1][1] + parentY]
    ];
  } else if (currentExtent !== "parent" && (currentExtent == null ? void 0 : currentExtent.range) && Array.isArray(currentExtent.range)) {
    const [top, right, bottom, left] = getExtentPadding(currentExtent.padding);
    const parentX = (parent == null ? void 0 : parent.computedPosition.x) || 0;
    const parentY = (parent == null ? void 0 : parent.computedPosition.y) || 0;
    currentExtent = [
      [currentExtent.range[0][0] + parentX + left, currentExtent.range[0][1] + parentY + top],
      [currentExtent.range[1][0] + parentX - right, currentExtent.range[1][1] + parentY - bottom]
    ];
  }
  return currentExtent === "parent" ? [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
  ] : currentExtent;
}
function clampNodeExtent({ width, height }, extent) {
  return [extent[0], [extent[1][0] - (width || 0), extent[1][1] - (height || 0)]];
}
function calcNextPosition(node, nextPosition, triggerError, nodeExtent, parentNode) {
  const extent = clampNodeExtent(node.dimensions, getExtent(node, triggerError, nodeExtent, parentNode));
  const clampedPos = clampPosition(nextPosition, extent);
  return {
    position: {
      x: clampedPos.x - ((parentNode == null ? void 0 : parentNode.computedPosition.x) || 0),
      y: clampedPos.y - ((parentNode == null ? void 0 : parentNode.computedPosition.y) || 0)
    },
    computedPosition: clampedPos
  };
}
function getHandlePosition(node, handle, fallbackPosition = Position.Left, center = false) {
  const x = ((handle == null ? void 0 : handle.x) ?? 0) + node.computedPosition.x;
  const y = ((handle == null ? void 0 : handle.y) ?? 0) + node.computedPosition.y;
  const { width, height } = handle ?? getNodeDimensions(node);
  if (center) {
    return { x: x + width / 2, y: y + height / 2 };
  }
  const position = (handle == null ? void 0 : handle.position) ?? fallbackPosition;
  switch (position) {
    case Position.Top:
      return { x: x + width / 2, y };
    case Position.Right:
      return { x: x + width, y: y + height / 2 };
    case Position.Bottom:
      return { x: x + width / 2, y: y + height };
    case Position.Left:
      return { x, y: y + height / 2 };
  }
}
function getEdgeHandle(bounds, handleId) {
  if (!bounds) {
    return null;
  }
  return (!handleId ? bounds[0] : bounds.find((d) => d.id === handleId)) || null;
}
function isEdgeVisible({
  sourcePos,
  targetPos,
  sourceWidth,
  sourceHeight,
  targetWidth,
  targetHeight,
  width,
  height,
  viewport
}) {
  const edgeBox = {
    x: Math.min(sourcePos.x, targetPos.x),
    y: Math.min(sourcePos.y, targetPos.y),
    x2: Math.max(sourcePos.x + sourceWidth, targetPos.x + targetWidth),
    y2: Math.max(sourcePos.y + sourceHeight, targetPos.y + targetHeight)
  };
  if (edgeBox.x === edgeBox.x2) {
    edgeBox.x2 += 1;
  }
  if (edgeBox.y === edgeBox.y2) {
    edgeBox.y2 += 1;
  }
  const viewBox = rectToBox({
    x: (0 - viewport.x) / viewport.zoom,
    y: (0 - viewport.y) / viewport.zoom,
    width: width / viewport.zoom,
    height: height / viewport.zoom
  });
  const xOverlap = Math.max(0, Math.min(viewBox.x2, edgeBox.x2) - Math.max(viewBox.x, edgeBox.x));
  const yOverlap = Math.max(0, Math.min(viewBox.y2, edgeBox.y2) - Math.max(viewBox.y, edgeBox.y));
  const overlappingArea = Math.ceil(xOverlap * yOverlap);
  return overlappingArea > 0;
}
function getEdgeZIndex(edge, findNode, elevateEdgesOnSelect = false) {
  const hasZIndex = typeof edge.zIndex === "number";
  let z = hasZIndex ? edge.zIndex : 0;
  const source = findNode(edge.source);
  const target = findNode(edge.target);
  if (!source || !target) {
    return 0;
  }
  if (elevateEdgesOnSelect) {
    z = hasZIndex ? edge.zIndex : Math.max(source.computedPosition.z || 0, target.computedPosition.z || 0);
  }
  return z;
}
var ErrorCode = /* @__PURE__ */ ((ErrorCode2) => {
  ErrorCode2["MISSING_STYLES"] = "MISSING_STYLES";
  ErrorCode2["MISSING_VIEWPORT_DIMENSIONS"] = "MISSING_VIEWPORT_DIMENSIONS";
  ErrorCode2["NODE_INVALID"] = "NODE_INVALID";
  ErrorCode2["NODE_NOT_FOUND"] = "NODE_NOT_FOUND";
  ErrorCode2["NODE_MISSING_PARENT"] = "NODE_MISSING_PARENT";
  ErrorCode2["NODE_TYPE_MISSING"] = "NODE_TYPE_MISSING";
  ErrorCode2["NODE_EXTENT_INVALID"] = "NODE_EXTENT_INVALID";
  ErrorCode2["EDGE_INVALID"] = "EDGE_INVALID";
  ErrorCode2["EDGE_NOT_FOUND"] = "EDGE_NOT_FOUND";
  ErrorCode2["EDGE_SOURCE_MISSING"] = "EDGE_SOURCE_MISSING";
  ErrorCode2["EDGE_TARGET_MISSING"] = "EDGE_TARGET_MISSING";
  ErrorCode2["EDGE_TYPE_MISSING"] = "EDGE_TYPE_MISSING";
  ErrorCode2["EDGE_SOURCE_TARGET_SAME"] = "EDGE_SOURCE_TARGET_SAME";
  ErrorCode2["EDGE_SOURCE_TARGET_MISSING"] = "EDGE_SOURCE_TARGET_MISSING";
  ErrorCode2["EDGE_ORPHANED"] = "EDGE_ORPHANED";
  ErrorCode2["USEVUEFLOW_OPTIONS"] = "USEVUEFLOW_OPTIONS";
  return ErrorCode2;
})(ErrorCode || {});
const messages = {
  [
    "MISSING_STYLES"
    /* MISSING_STYLES */
  ]: () => `It seems that you haven't loaded the necessary styles. Please import '@vue-flow/core/dist/style.css' to ensure that the graph is rendered correctly`,
  [
    "MISSING_VIEWPORT_DIMENSIONS"
    /* MISSING_VIEWPORT_DIMENSIONS */
  ]: () => "The Vue Flow parent container needs a width and a height to render the graph",
  [
    "NODE_INVALID"
    /* NODE_INVALID */
  ]: (id2) => `Node is invalid
Node: ${id2}`,
  [
    "NODE_NOT_FOUND"
    /* NODE_NOT_FOUND */
  ]: (id2) => `Node not found
Node: ${id2}`,
  [
    "NODE_MISSING_PARENT"
    /* NODE_MISSING_PARENT */
  ]: (id2, parentId) => `Node is missing a parent
Node: ${id2}
Parent: ${parentId}`,
  [
    "NODE_TYPE_MISSING"
    /* NODE_TYPE_MISSING */
  ]: (type) => `Node type is missing
Type: ${type}`,
  [
    "NODE_EXTENT_INVALID"
    /* NODE_EXTENT_INVALID */
  ]: (id2) => `Only child nodes can use a parent extent
Node: ${id2}`,
  [
    "EDGE_INVALID"
    /* EDGE_INVALID */
  ]: (id2) => `An edge needs a source and a target
Edge: ${id2}`,
  [
    "EDGE_SOURCE_MISSING"
    /* EDGE_SOURCE_MISSING */
  ]: (id2, source) => `Edge source is missing
Edge: ${id2} 
Source: ${source}`,
  [
    "EDGE_TARGET_MISSING"
    /* EDGE_TARGET_MISSING */
  ]: (id2, target) => `Edge target is missing
Edge: ${id2} 
Target: ${target}`,
  [
    "EDGE_TYPE_MISSING"
    /* EDGE_TYPE_MISSING */
  ]: (type) => `Edge type is missing
Type: ${type}`,
  [
    "EDGE_SOURCE_TARGET_SAME"
    /* EDGE_SOURCE_TARGET_SAME */
  ]: (id2, source, target) => `Edge source and target are the same
Edge: ${id2} 
Source: ${source} 
Target: ${target}`,
  [
    "EDGE_SOURCE_TARGET_MISSING"
    /* EDGE_SOURCE_TARGET_MISSING */
  ]: (id2, source, target) => `Edge source or target is missing
Edge: ${id2} 
Source: ${source} 
Target: ${target}`,
  [
    "EDGE_ORPHANED"
    /* EDGE_ORPHANED */
  ]: (id2) => `Edge was orphaned (suddenly missing source or target) and has been removed
Edge: ${id2}`,
  [
    "EDGE_NOT_FOUND"
    /* EDGE_NOT_FOUND */
  ]: (id2) => `Edge not found
Edge: ${id2}`,
  // deprecation errors
  [
    "USEVUEFLOW_OPTIONS"
    /* USEVUEFLOW_OPTIONS */
  ]: () => `The options parameter is deprecated and will be removed in the next major version. Please use the id parameter instead`
};
class VueFlowError extends Error {
  constructor(code, ...args) {
    var _a;
    super((_a = messages[code]) == null ? void 0 : _a.call(messages, ...args));
    this.name = "VueFlowError";
    this.code = code;
    this.args = args;
  }
}
function isMouseEvent(event) {
  return "clientX" in event;
}
function isUseDragEvent(event) {
  return "sourceEvent" in event;
}
function getEventPosition(event, bounds) {
  const isMouse = isMouseEvent(event);
  let evtX;
  let evtY;
  if (isMouse) {
    evtX = event.clientX;
    evtY = event.clientY;
  } else if ("touches" in event && event.touches.length > 0) {
    evtX = event.touches[0].clientX;
    evtY = event.touches[0].clientY;
  } else if ("changedTouches" in event && event.changedTouches.length > 0) {
    evtX = event.changedTouches[0].clientX;
    evtY = event.changedTouches[0].clientY;
  } else {
    evtX = 0;
    evtY = 0;
  }
  return {
    x: evtX - ((bounds == null ? void 0 : bounds.left) ?? 0),
    y: evtY - ((bounds == null ? void 0 : bounds.top) ?? 0)
  };
}
const isMacOs = () => {
  var _a;
  return typeof navigator !== "undefined" && ((_a = navigator == null ? void 0 : navigator.userAgent) == null ? void 0 : _a.indexOf("Mac")) >= 0;
};
function getNodeDimensions(node) {
  var _a, _b;
  return {
    width: ((_a = node.dimensions) == null ? void 0 : _a.width) ?? node.width ?? 0,
    height: ((_b = node.dimensions) == null ? void 0 : _b.height) ?? node.height ?? 0
  };
}
function snapPosition(position, snapGrid = [1, 1]) {
  return {
    x: snapGrid[0] * Math.round(position.x / snapGrid[0]),
    y: snapGrid[1] * Math.round(position.y / snapGrid[1])
  };
}
const alwaysValid$1 = () => true;
function resetRecentHandle(handleDomNode) {
  handleDomNode == null ? void 0 : handleDomNode.classList.remove("valid", "connecting", "vue-flow__handle-valid", "vue-flow__handle-connecting");
}
function getNodesWithinDistance(position, nodeLookup, distance2) {
  const nodes = [];
  const rect = {
    x: position.x - distance2,
    y: position.y - distance2,
    width: distance2 * 2,
    height: distance2 * 2
  };
  for (const node of nodeLookup.values()) {
    if (getOverlappingArea(rect, nodeToRect(node)) > 0) {
      nodes.push(node);
    }
  }
  return nodes;
}
const ADDITIONAL_DISTANCE = 250;
function getClosestHandle(position, connectionRadius, nodeLookup, fromHandle) {
  var _a, _b;
  let closestHandles = [];
  let minDistance = Number.POSITIVE_INFINITY;
  const closeNodes = getNodesWithinDistance(position, nodeLookup, connectionRadius + ADDITIONAL_DISTANCE);
  for (const node of closeNodes) {
    const allHandles = [...((_a = node.handleBounds) == null ? void 0 : _a.source) ?? [], ...((_b = node.handleBounds) == null ? void 0 : _b.target) ?? []];
    for (const handle of allHandles) {
      if (fromHandle.nodeId === handle.nodeId && fromHandle.type === handle.type && fromHandle.id === handle.id) {
        continue;
      }
      const { x, y } = getHandlePosition(node, handle, handle.position, true);
      const distance2 = Math.sqrt((x - position.x) ** 2 + (y - position.y) ** 2);
      if (distance2 > connectionRadius) {
        continue;
      }
      if (distance2 < minDistance) {
        closestHandles = [{ ...handle, x, y }];
        minDistance = distance2;
      } else if (distance2 === minDistance) {
        closestHandles.push({ ...handle, x, y });
      }
    }
  }
  if (!closestHandles.length) {
    return null;
  }
  if (closestHandles.length > 1) {
    const oppositeHandleType = fromHandle.type === "source" ? "target" : "source";
    return closestHandles.find((handle) => handle.type === oppositeHandleType) ?? closestHandles[0];
  }
  return closestHandles[0];
}
function isValidHandle(event, {
  handle,
  connectionMode,
  fromNodeId,
  fromHandleId,
  fromType,
  doc,
  lib,
  flowId,
  isValidConnection = alwaysValid$1
}, edges, nodes, findNode, nodeLookup) {
  const isTarget = fromType === "target";
  const handleDomNode = handle ? doc.querySelector(`.${lib}-flow__handle[data-id="${flowId}-${handle == null ? void 0 : handle.nodeId}-${handle == null ? void 0 : handle.id}-${handle == null ? void 0 : handle.type}"]`) : null;
  const { x, y } = getEventPosition(event);
  const handleBelow = doc.elementFromPoint(x, y);
  const handleToCheck = (handleBelow == null ? void 0 : handleBelow.classList.contains(`${lib}-flow__handle`)) ? handleBelow : handleDomNode;
  const result = {
    handleDomNode: handleToCheck,
    isValid: false,
    connection: null,
    toHandle: null
  };
  if (handleToCheck) {
    const handleType = getHandleType(void 0, handleToCheck);
    const handleNodeId = handleToCheck.getAttribute("data-nodeid");
    const handleId = handleToCheck.getAttribute("data-handleid");
    const connectable = handleToCheck.classList.contains("connectable");
    const connectableEnd = handleToCheck.classList.contains("connectableend");
    if (!handleNodeId || !handleType) {
      return result;
    }
    const connection = {
      source: isTarget ? handleNodeId : fromNodeId,
      sourceHandle: isTarget ? handleId : fromHandleId,
      target: isTarget ? fromNodeId : handleNodeId,
      targetHandle: isTarget ? fromHandleId : handleId
    };
    result.connection = connection;
    const isConnectable = connectable && connectableEnd;
    const isValid = isConnectable && (connectionMode === ConnectionMode.Strict ? isTarget && handleType === "source" || !isTarget && handleType === "target" : handleNodeId !== fromNodeId || handleId !== fromHandleId);
    result.isValid = isValid && isValidConnection(connection, {
      nodes,
      edges,
      sourceNode: findNode(connection.source),
      targetNode: findNode(connection.target)
    });
    result.toHandle = getHandle(handleNodeId, handleType, handleId, nodeLookup, connectionMode, true);
  }
  return result;
}
function getHandleType(edgeUpdaterType, handleDomNode) {
  if (edgeUpdaterType) {
    return edgeUpdaterType;
  } else if (handleDomNode == null ? void 0 : handleDomNode.classList.contains("target")) {
    return "target";
  } else if (handleDomNode == null ? void 0 : handleDomNode.classList.contains("source")) {
    return "source";
  }
  return null;
}
function getConnectionStatus(isInsideConnectionRadius, isHandleValid) {
  let connectionStatus = null;
  if (isHandleValid) {
    connectionStatus = "valid";
  } else if (isInsideConnectionRadius && !isHandleValid) {
    connectionStatus = "invalid";
  }
  return connectionStatus;
}
function isConnectionValid(isInsideConnectionRadius, isHandleValid) {
  let isValid = null;
  if (isHandleValid) {
    isValid = true;
  } else if (isInsideConnectionRadius && !isHandleValid) {
    isValid = false;
  }
  return isValid;
}
function getHandle(nodeId, handleType, handleId, nodeLookup, connectionMode, withAbsolutePosition = false) {
  var _a, _b, _c;
  const node = nodeLookup.get(nodeId);
  if (!node) {
    return null;
  }
  const handles = connectionMode === ConnectionMode.Strict ? (_a = node.handleBounds) == null ? void 0 : _a[handleType] : [...((_b = node.handleBounds) == null ? void 0 : _b.source) ?? [], ...((_c = node.handleBounds) == null ? void 0 : _c.target) ?? []];
  const handle = (handleId ? handles == null ? void 0 : handles.find((h2) => h2.id === handleId) : handles == null ? void 0 : handles[0]) ?? null;
  return handle && withAbsolutePosition ? { ...handle, ...getHandlePosition(node, handle, handle.position, true) } : handle;
}
const oppositePosition = {
  [Position.Left]: Position.Right,
  [Position.Right]: Position.Left,
  [Position.Top]: Position.Bottom,
  [Position.Bottom]: Position.Top
};
const productionEnvs = ["production", "prod"];
function warn(message, ...args) {
  if (isDev()) {
    console.warn(`[Vue Flow]: ${message}`, ...args);
  }
}
function isDev() {
  return !productionEnvs.includes("production");
}
function getHandleBounds(type, nodeElement, nodeBounds, zoom2, nodeId) {
  const handles = nodeElement.querySelectorAll(`.vue-flow__handle.${type}`);
  if (!(handles == null ? void 0 : handles.length)) {
    return null;
  }
  return Array.from(handles).map((handle) => {
    const handleBounds = handle.getBoundingClientRect();
    return {
      id: handle.getAttribute("data-handleid"),
      type,
      nodeId,
      position: handle.getAttribute("data-handlepos"),
      x: (handleBounds.left - nodeBounds.left) / zoom2,
      y: (handleBounds.top - nodeBounds.top) / zoom2,
      ...getDimensions(handle)
    };
  });
}
function handleNodeClick(node, multiSelectionActive, addSelectedNodes, removeSelectedNodes, nodesSelectionActive, unselect = false, nodeEl) {
  nodesSelectionActive.value = false;
  if (!node.selected) {
    addSelectedNodes([node]);
  } else if (unselect || node.selected && multiSelectionActive) {
    removeSelectedNodes([node]);
    nextTick(() => {
      nodeEl.blur();
    });
  }
}
function isDef(val) {
  const unrefVal = unref(val);
  return typeof unrefVal !== "undefined";
}
function addEdgeToStore(edgeParams, edges, triggerError, defaultEdgeOptions) {
  if (!edgeParams || !edgeParams.source || !edgeParams.target) {
    triggerError(new VueFlowError(ErrorCode.EDGE_INVALID, (edgeParams == null ? void 0 : edgeParams.id) ?? `[ID UNKNOWN]`));
    return false;
  }
  let edge;
  if (isEdge(edgeParams)) {
    edge = edgeParams;
  } else {
    edge = {
      ...edgeParams,
      id: getEdgeId(edgeParams)
    };
  }
  edge = parseEdge(edge, void 0, defaultEdgeOptions);
  if (connectionExists(edge, edges)) {
    return false;
  }
  return edge;
}
function updateEdgeAction(edge, newConnection, prevEdge, shouldReplaceId, triggerError) {
  if (!newConnection.source || !newConnection.target) {
    triggerError(new VueFlowError(ErrorCode.EDGE_INVALID, edge.id));
    return false;
  }
  if (!prevEdge) {
    triggerError(new VueFlowError(ErrorCode.EDGE_NOT_FOUND, edge.id));
    return false;
  }
  const { id: id2, ...rest } = edge;
  return {
    ...rest,
    id: shouldReplaceId ? getEdgeId(newConnection) : id2,
    source: newConnection.source,
    target: newConnection.target,
    sourceHandle: newConnection.sourceHandle,
    targetHandle: newConnection.targetHandle
  };
}
function createGraphNodes(nodes, findNode, triggerError) {
  const parentNodes = {};
  const nextNodes = [];
  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];
    if (!isNode(node)) {
      triggerError(
        new VueFlowError(ErrorCode.NODE_INVALID, node == null ? void 0 : node.id) || `[ID UNKNOWN|INDEX ${i}]`
      );
      continue;
    }
    const parsed = parseNode(node, findNode(node.id), node.parentNode);
    if (node.parentNode) {
      parentNodes[node.parentNode] = true;
    }
    nextNodes[i] = parsed;
  }
  for (const node of nextNodes) {
    const parentNode = findNode(node.parentNode) || nextNodes.find((n) => n.id === node.parentNode);
    if (node.parentNode && !parentNode) {
      triggerError(new VueFlowError(ErrorCode.NODE_MISSING_PARENT, node.id, node.parentNode));
    }
    if (node.parentNode || parentNodes[node.id]) {
      if (parentNodes[node.id]) {
        node.isParent = true;
      }
      if (parentNode) {
        parentNode.isParent = true;
      }
    }
  }
  return nextNodes;
}
function addConnectionToLookup(type, connection, connectionKey, connectionLookup, nodeId, handleId) {
  let key = nodeId;
  const nodeMap = connectionLookup.get(key) || /* @__PURE__ */ new Map();
  connectionLookup.set(key, nodeMap.set(connectionKey, connection));
  key = `${nodeId}-${type}`;
  const typeMap = connectionLookup.get(key) || /* @__PURE__ */ new Map();
  connectionLookup.set(key, typeMap.set(connectionKey, connection));
  if (handleId) {
    key = `${nodeId}-${type}-${handleId}`;
    const handleMap = connectionLookup.get(key) || /* @__PURE__ */ new Map();
    connectionLookup.set(key, handleMap.set(connectionKey, connection));
  }
}
function updateConnectionLookup(connectionLookup, edgeLookup, edges) {
  connectionLookup.clear();
  for (const edge of edges) {
    const { source: sourceNode, target: targetNode, sourceHandle = null, targetHandle = null } = edge;
    const connection = { edgeId: edge.id, source: sourceNode, target: targetNode, sourceHandle, targetHandle };
    const sourceKey = `${sourceNode}-${sourceHandle}--${targetNode}-${targetHandle}`;
    const targetKey = `${targetNode}-${targetHandle}--${sourceNode}-${sourceHandle}`;
    addConnectionToLookup("source", connection, targetKey, connectionLookup, sourceNode, sourceHandle);
    addConnectionToLookup("target", connection, sourceKey, connectionLookup, targetNode, targetHandle);
  }
}
function areSetsEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }
  for (const item of a) {
    if (!b.has(item)) {
      return false;
    }
  }
  return true;
}
function createGraphEdges(nextEdges, isValidConnection, findNode, findEdge, onError, defaultEdgeOptions, nodes, edges) {
  const validEdges = [];
  for (const edgeOrConnection of nextEdges) {
    const edge = isEdge(edgeOrConnection) ? edgeOrConnection : addEdgeToStore(edgeOrConnection, edges, onError, defaultEdgeOptions);
    if (!edge) {
      continue;
    }
    const sourceNode = findNode(edge.source);
    const targetNode = findNode(edge.target);
    if (!sourceNode || !targetNode) {
      onError(new VueFlowError(ErrorCode.EDGE_SOURCE_TARGET_MISSING, edge.id, edge.source, edge.target));
      continue;
    }
    if (!sourceNode) {
      onError(new VueFlowError(ErrorCode.EDGE_SOURCE_MISSING, edge.id, edge.source));
      continue;
    }
    if (!targetNode) {
      onError(new VueFlowError(ErrorCode.EDGE_TARGET_MISSING, edge.id, edge.target));
      continue;
    }
    if (isValidConnection) {
      const isValid = isValidConnection(edge, {
        edges,
        nodes,
        sourceNode,
        targetNode
      });
      if (!isValid) {
        onError(new VueFlowError(ErrorCode.EDGE_INVALID, edge.id));
        continue;
      }
    }
    const existingEdge = findEdge(edge.id);
    validEdges.push({
      ...parseEdge(edge, existingEdge, defaultEdgeOptions),
      sourceNode,
      targetNode
    });
  }
  return validEdges;
}
const VueFlow = Symbol("vueFlow");
const NodeId = Symbol("nodeId");
const NodeRef = Symbol("nodeRef");
const EdgeId = Symbol("edgeId");
const EdgeRef = Symbol("edgeRef");
const Slots = Symbol("slots");
function useDrag(params) {
  const {
    vueFlowRef,
    snapToGrid,
    snapGrid,
    noDragClassName,
    nodeLookup,
    nodeExtent,
    nodeDragThreshold,
    viewport,
    autoPanOnNodeDrag,
    autoPanSpeed,
    nodesDraggable,
    panBy,
    findNode,
    multiSelectionActive,
    nodesSelectionActive,
    selectNodesOnDrag,
    removeSelectedElements,
    addSelectedNodes,
    updateNodePositions,
    emits
  } = useVueFlow();
  const { onStart, onDrag, onStop, onClick, el, disabled, id: id2, selectable, dragHandle } = params;
  const dragging = shallowRef(false);
  let dragItems = [];
  let dragHandler;
  let containerBounds = null;
  let lastPos = { x: void 0, y: void 0 };
  let mousePosition = { x: 0, y: 0 };
  let dragEvent = null;
  let dragStarted = false;
  let nodePositionsChanged = false;
  let autoPanId = 0;
  let autoPanStarted = false;
  const getPointerPosition = useGetPointerPosition();
  const updateNodes = ({ x, y }) => {
    lastPos = { x, y };
    let hasChange = false;
    dragItems = dragItems.map((n) => {
      const nextPosition = { x: x - n.distance.x, y: y - n.distance.y };
      const { computedPosition } = calcNextPosition(
        n,
        snapToGrid.value ? snapPosition(nextPosition, snapGrid.value) : nextPosition,
        emits.error,
        nodeExtent.value,
        n.parentNode ? findNode(n.parentNode) : void 0
      );
      hasChange = hasChange || n.position.x !== computedPosition.x || n.position.y !== computedPosition.y;
      n.position = computedPosition;
      return n;
    });
    nodePositionsChanged = nodePositionsChanged || hasChange;
    if (!hasChange) {
      return;
    }
    updateNodePositions(dragItems, true, true);
    dragging.value = true;
    if (dragEvent) {
      const [currentNode, nodes] = getEventHandlerParams({
        id: id2,
        dragItems,
        findNode
      });
      onDrag({ event: dragEvent, node: currentNode, nodes });
    }
  };
  const autoPan = () => {
    if (!containerBounds) {
      return;
    }
    const [xMovement, yMovement] = calcAutoPan(mousePosition, containerBounds, autoPanSpeed.value);
    if (xMovement !== 0 || yMovement !== 0) {
      const nextPos = {
        x: (lastPos.x ?? 0) - xMovement / viewport.value.zoom,
        y: (lastPos.y ?? 0) - yMovement / viewport.value.zoom
      };
      if (panBy({ x: xMovement, y: yMovement })) {
        updateNodes(nextPos);
      }
    }
    autoPanId = requestAnimationFrame(autoPan);
  };
  const startDrag = (event, nodeEl) => {
    dragStarted = true;
    const node = findNode(id2);
    if (!selectNodesOnDrag.value && !multiSelectionActive.value && node) {
      if (!node.selected) {
        removeSelectedElements();
      }
    }
    if (node && toValue$1(selectable) && selectNodesOnDrag.value) {
      handleNodeClick(
        node,
        multiSelectionActive.value,
        addSelectedNodes,
        removeSelectedElements,
        nodesSelectionActive,
        false,
        nodeEl
      );
    }
    const pointerPos = getPointerPosition(event.sourceEvent);
    lastPos = pointerPos;
    dragItems = getDragItems(nodeLookup.value, nodesDraggable.value, pointerPos, id2);
    if (dragItems.length) {
      const [currentNode, nodes] = getEventHandlerParams({
        id: id2,
        dragItems,
        findNode
      });
      onStart({ event: event.sourceEvent, node: currentNode, nodes });
    }
  };
  const eventStart = (event, nodeEl) => {
    var _a;
    if (event.sourceEvent.type === "touchmove" && event.sourceEvent.touches.length > 1) {
      return;
    }
    nodePositionsChanged = false;
    if (nodeDragThreshold.value === 0) {
      startDrag(event, nodeEl);
    }
    lastPos = getPointerPosition(event.sourceEvent);
    containerBounds = ((_a = vueFlowRef.value) == null ? void 0 : _a.getBoundingClientRect()) || null;
    mousePosition = getEventPosition(event.sourceEvent, containerBounds);
  };
  const eventDrag = (event, nodeEl) => {
    const pointerPos = getPointerPosition(event.sourceEvent);
    if (!autoPanStarted && dragStarted && autoPanOnNodeDrag.value) {
      autoPanStarted = true;
      autoPan();
    }
    if (!dragStarted) {
      const x = pointerPos.xSnapped - (lastPos.x ?? 0);
      const y = pointerPos.ySnapped - (lastPos.y ?? 0);
      const distance2 = Math.sqrt(x * x + y * y);
      if (distance2 > nodeDragThreshold.value) {
        startDrag(event, nodeEl);
      }
    }
    if ((lastPos.x !== pointerPos.xSnapped || lastPos.y !== pointerPos.ySnapped) && dragItems.length && dragStarted) {
      dragEvent = event.sourceEvent;
      mousePosition = getEventPosition(event.sourceEvent, containerBounds);
      updateNodes(pointerPos);
    }
  };
  const eventEnd = (event) => {
    let isClick = false;
    if (!dragStarted && !dragging.value && !multiSelectionActive.value) {
      const evt = event.sourceEvent;
      const pointerPos = getPointerPosition(evt);
      const x = pointerPos.xSnapped - (lastPos.x ?? 0);
      const y = pointerPos.ySnapped - (lastPos.y ?? 0);
      const distance2 = Math.sqrt(x * x + y * y);
      if (distance2 !== 0 && distance2 <= nodeDragThreshold.value) {
        onClick == null ? void 0 : onClick(evt);
        isClick = true;
      }
    }
    if (dragItems.length && !isClick) {
      if (nodePositionsChanged) {
        updateNodePositions(dragItems, false, false);
        nodePositionsChanged = false;
      }
      const [currentNode, nodes] = getEventHandlerParams({
        id: id2,
        dragItems,
        findNode
      });
      onStop({ event: event.sourceEvent, node: currentNode, nodes });
    }
    dragItems = [];
    dragging.value = false;
    autoPanStarted = false;
    dragStarted = false;
    lastPos = { x: void 0, y: void 0 };
    cancelAnimationFrame(autoPanId);
  };
  watch([() => toValue$1(disabled), el], ([isDisabled, nodeEl], _, onCleanup) => {
    if (nodeEl) {
      const selection2 = select(nodeEl);
      if (!isDisabled) {
        dragHandler = drag().on("start", (event) => eventStart(event, nodeEl)).on("drag", (event) => eventDrag(event, nodeEl)).on("end", (event) => eventEnd(event)).filter((event) => {
          const target = event.target;
          const unrefDragHandle = toValue$1(dragHandle);
          return !event.button && (!noDragClassName.value || !hasSelector(target, `.${noDragClassName.value}`, nodeEl) && (!unrefDragHandle || hasSelector(target, unrefDragHandle, nodeEl)));
        });
        selection2.call(dragHandler);
      }
      onCleanup(() => {
        selection2.on(".drag", null);
        if (dragHandler) {
          dragHandler.on("start", null);
          dragHandler.on("drag", null);
          dragHandler.on("end", null);
        }
      });
    }
  });
  return dragging;
}
function createEdgeHooks() {
  return {
    doubleClick: createExtendedEventHook(),
    click: createExtendedEventHook(),
    mouseEnter: createExtendedEventHook(),
    mouseMove: createExtendedEventHook(),
    mouseLeave: createExtendedEventHook(),
    contextMenu: createExtendedEventHook(),
    updateStart: createExtendedEventHook(),
    update: createExtendedEventHook(),
    updateEnd: createExtendedEventHook()
  };
}
function useEdgeHooks(edge, emits) {
  const edgeHooks = createEdgeHooks();
  edgeHooks.doubleClick.on((event) => {
    var _a, _b;
    emits.edgeDoubleClick(event);
    (_b = (_a = edge.events) == null ? void 0 : _a.doubleClick) == null ? void 0 : _b.call(_a, event);
  });
  edgeHooks.click.on((event) => {
    var _a, _b;
    emits.edgeClick(event);
    (_b = (_a = edge.events) == null ? void 0 : _a.click) == null ? void 0 : _b.call(_a, event);
  });
  edgeHooks.mouseEnter.on((event) => {
    var _a, _b;
    emits.edgeMouseEnter(event);
    (_b = (_a = edge.events) == null ? void 0 : _a.mouseEnter) == null ? void 0 : _b.call(_a, event);
  });
  edgeHooks.mouseMove.on((event) => {
    var _a, _b;
    emits.edgeMouseMove(event);
    (_b = (_a = edge.events) == null ? void 0 : _a.mouseMove) == null ? void 0 : _b.call(_a, event);
  });
  edgeHooks.mouseLeave.on((event) => {
    var _a, _b;
    emits.edgeMouseLeave(event);
    (_b = (_a = edge.events) == null ? void 0 : _a.mouseLeave) == null ? void 0 : _b.call(_a, event);
  });
  edgeHooks.contextMenu.on((event) => {
    var _a, _b;
    emits.edgeContextMenu(event);
    (_b = (_a = edge.events) == null ? void 0 : _a.contextMenu) == null ? void 0 : _b.call(_a, event);
  });
  edgeHooks.updateStart.on((event) => {
    var _a, _b;
    emits.edgeUpdateStart(event);
    (_b = (_a = edge.events) == null ? void 0 : _a.updateStart) == null ? void 0 : _b.call(_a, event);
  });
  edgeHooks.update.on((event) => {
    var _a, _b;
    emits.edgeUpdate(event);
    (_b = (_a = edge.events) == null ? void 0 : _a.update) == null ? void 0 : _b.call(_a, event);
  });
  edgeHooks.updateEnd.on((event) => {
    var _a, _b;
    emits.edgeUpdateEnd(event);
    (_b = (_a = edge.events) == null ? void 0 : _a.updateEnd) == null ? void 0 : _b.call(_a, event);
  });
  return Object.entries(edgeHooks).reduce(
    (hooks, [key, value]) => {
      hooks.emit[key] = value.trigger;
      hooks.on[key] = value.on;
      return hooks;
    },
    { emit: {}, on: {} }
  );
}
function useGetPointerPosition() {
  const { viewport, snapGrid, snapToGrid, vueFlowRef } = useVueFlow();
  return (event) => {
    var _a;
    const containerBounds = ((_a = vueFlowRef.value) == null ? void 0 : _a.getBoundingClientRect()) ?? { left: 0, top: 0 };
    const evt = isUseDragEvent(event) ? event.sourceEvent : event;
    const { x, y } = getEventPosition(evt, containerBounds);
    const pointerPos = pointToRendererPoint({ x, y }, viewport.value);
    const { x: xSnapped, y: ySnapped } = snapToGrid.value ? snapPosition(pointerPos, snapGrid.value) : pointerPos;
    return {
      xSnapped,
      ySnapped,
      ...pointerPos
    };
  };
}
function alwaysValid() {
  return true;
}
function useHandle({
  handleId,
  nodeId,
  type,
  isValidConnection,
  edgeUpdaterType,
  onEdgeUpdate,
  onEdgeUpdateEnd
}) {
  const {
    id: flowId,
    vueFlowRef,
    connectionMode,
    connectionRadius,
    connectOnClick,
    connectionClickStartHandle,
    nodesConnectable,
    autoPanOnConnect,
    autoPanSpeed,
    findNode,
    panBy,
    startConnection,
    updateConnection,
    endConnection,
    emits,
    viewport,
    edges,
    nodes,
    isValidConnection: isValidConnectionProp,
    nodeLookup
  } = useVueFlow();
  let connection = null;
  let isValid = false;
  let handleDomNode = null;
  function handlePointerDown(event) {
    var _a;
    const isTarget = toValue$1(type) === "target";
    const isMouseTriggered = isMouseEvent(event);
    const doc = getHostForElement(event.target);
    const clickedHandle = event.currentTarget;
    if (clickedHandle && (isMouseTriggered && event.button === 0 || !isMouseTriggered)) {
      let onPointerMove = function(event2) {
        connectionPosition = getEventPosition(event2, containerBounds);
        closestHandle = getClosestHandle(
          pointToRendererPoint(connectionPosition, viewport.value, false, [1, 1]),
          connectionRadius.value,
          nodeLookup.value,
          fromHandle
        );
        if (!autoPanStarted) {
          autoPan();
          autoPanStarted = true;
        }
        const result = isValidHandle(
          event2,
          {
            handle: closestHandle,
            connectionMode: connectionMode.value,
            fromNodeId: toValue$1(nodeId),
            fromHandleId: toValue$1(handleId),
            fromType: isTarget ? "target" : "source",
            isValidConnection: isValidConnectionHandler,
            doc,
            lib: "vue",
            flowId,
            nodeLookup: nodeLookup.value
          },
          edges.value,
          nodes.value,
          findNode,
          nodeLookup.value
        );
        handleDomNode = result.handleDomNode;
        connection = result.connection;
        isValid = isConnectionValid(!!closestHandle, result.isValid);
        const newConnection2 = {
          // from stays the same
          ...previousConnection,
          isValid,
          to: result.toHandle && isValid ? rendererPointToPoint({ x: result.toHandle.x, y: result.toHandle.y }, viewport.value) : connectionPosition,
          toHandle: result.toHandle,
          toPosition: isValid && result.toHandle ? result.toHandle.position : oppositePosition[fromHandle.position],
          toNode: result.toHandle ? nodeLookup.value.get(result.toHandle.nodeId) : null
        };
        if (isValid && closestHandle && (previousConnection == null ? void 0 : previousConnection.toHandle) && newConnection2.toHandle && previousConnection.toHandle.type === newConnection2.toHandle.type && previousConnection.toHandle.nodeId === newConnection2.toHandle.nodeId && previousConnection.toHandle.id === newConnection2.toHandle.id && previousConnection.to.x === newConnection2.to.x && previousConnection.to.y === newConnection2.to.y) {
          return;
        }
        const connectingHandle = closestHandle ?? result.toHandle;
        updateConnection(
          connectingHandle && isValid ? rendererPointToPoint(
            {
              x: connectingHandle.x,
              y: connectingHandle.y
            },
            viewport.value
          ) : connectionPosition,
          result.toHandle,
          getConnectionStatus(!!connectingHandle, isValid)
        );
        previousConnection = newConnection2;
        if (!closestHandle && !isValid && !handleDomNode) {
          return resetRecentHandle(prevActiveHandle);
        }
        if (connection && connection.source !== connection.target && handleDomNode) {
          resetRecentHandle(prevActiveHandle);
          prevActiveHandle = handleDomNode;
          handleDomNode.classList.add("connecting", "vue-flow__handle-connecting");
          handleDomNode.classList.toggle("valid", !!isValid);
          handleDomNode.classList.toggle("vue-flow__handle-valid", !!isValid);
        }
      }, onPointerUp = function(event2) {
        if ("touches" in event2 && event2.touches.length > 0) {
          return;
        }
        if ((closestHandle || handleDomNode) && connection && isValid) {
          if (!onEdgeUpdate) {
            emits.connect(connection);
          } else {
            onEdgeUpdate(event2, connection);
          }
        }
        emits.connectEnd(event2);
        if (edgeUpdaterType) {
          onEdgeUpdateEnd == null ? void 0 : onEdgeUpdateEnd(event2);
        }
        resetRecentHandle(prevActiveHandle);
        cancelAnimationFrame(autoPanId);
        endConnection(event2);
        autoPanStarted = false;
        isValid = false;
        connection = null;
        handleDomNode = null;
        doc.removeEventListener("mousemove", onPointerMove);
        doc.removeEventListener("mouseup", onPointerUp);
        doc.removeEventListener("touchmove", onPointerMove);
        doc.removeEventListener("touchend", onPointerUp);
      };
      const node = findNode(toValue$1(nodeId));
      let isValidConnectionHandler = toValue$1(isValidConnection) || isValidConnectionProp.value || alwaysValid;
      if (!isValidConnectionHandler && node) {
        isValidConnectionHandler = (!isTarget ? node.isValidTargetPos : node.isValidSourcePos) || alwaysValid;
      }
      let closestHandle;
      let autoPanId = 0;
      const { x, y } = getEventPosition(event);
      const handleType = getHandleType(toValue$1(edgeUpdaterType), clickedHandle);
      const containerBounds = (_a = vueFlowRef.value) == null ? void 0 : _a.getBoundingClientRect();
      if (!containerBounds || !handleType) {
        return;
      }
      const fromHandleInternal = getHandle(toValue$1(nodeId), handleType, toValue$1(handleId), nodeLookup.value, connectionMode.value);
      if (!fromHandleInternal) {
        return;
      }
      let prevActiveHandle;
      let connectionPosition = getEventPosition(event, containerBounds);
      let autoPanStarted = false;
      const autoPan = () => {
        if (!autoPanOnConnect.value) {
          return;
        }
        const [xMovement, yMovement] = calcAutoPan(connectionPosition, containerBounds, autoPanSpeed.value);
        panBy({ x: xMovement, y: yMovement });
        autoPanId = requestAnimationFrame(autoPan);
      };
      const fromHandle = {
        ...fromHandleInternal,
        nodeId: toValue$1(nodeId),
        type: handleType,
        position: fromHandleInternal.position
      };
      const fromNodeInternal = nodeLookup.value.get(toValue$1(nodeId));
      const from = getHandlePosition(fromNodeInternal, fromHandle, Position.Left, true);
      const newConnection = {
        inProgress: true,
        isValid: null,
        from,
        fromHandle,
        fromPosition: fromHandle.position,
        fromNode: fromNodeInternal,
        to: connectionPosition,
        toHandle: null,
        toPosition: oppositePosition[fromHandle.position],
        toNode: null
      };
      startConnection(
        {
          nodeId: toValue$1(nodeId),
          id: toValue$1(handleId),
          type: handleType,
          position: (clickedHandle == null ? void 0 : clickedHandle.getAttribute("data-handlepos")) || Position.Top,
          ...connectionPosition
        },
        {
          x: x - containerBounds.left,
          y: y - containerBounds.top
        }
      );
      emits.connectStart({ event, nodeId: toValue$1(nodeId), handleId: toValue$1(handleId), handleType });
      let previousConnection = newConnection;
      doc.addEventListener("mousemove", onPointerMove);
      doc.addEventListener("mouseup", onPointerUp);
      doc.addEventListener("touchmove", onPointerMove);
      doc.addEventListener("touchend", onPointerUp);
    }
  }
  function handleClick(event) {
    var _a, _b;
    if (!connectOnClick.value) {
      return;
    }
    const isTarget = toValue$1(type) === "target";
    if (!connectionClickStartHandle.value) {
      emits.clickConnectStart({ event, nodeId: toValue$1(nodeId), handleId: toValue$1(handleId) });
      startConnection(
        {
          nodeId: toValue$1(nodeId),
          type: toValue$1(type),
          id: toValue$1(handleId),
          position: Position.Top,
          ...getEventPosition(event)
        },
        void 0,
        true
      );
      return;
    }
    let isValidConnectionHandler = toValue$1(isValidConnection) || isValidConnectionProp.value || alwaysValid;
    const node = findNode(toValue$1(nodeId));
    if (!isValidConnectionHandler && node) {
      isValidConnectionHandler = (!isTarget ? node.isValidTargetPos : node.isValidSourcePos) || alwaysValid;
    }
    if (node && (typeof node.connectable === "undefined" ? nodesConnectable.value : node.connectable) === false) {
      return;
    }
    const doc = getHostForElement(event.target);
    const result = isValidHandle(
      event,
      {
        handle: {
          nodeId: toValue$1(nodeId),
          id: toValue$1(handleId),
          type: toValue$1(type),
          position: Position.Top,
          ...getEventPosition(event)
        },
        connectionMode: connectionMode.value,
        fromNodeId: connectionClickStartHandle.value.nodeId,
        fromHandleId: connectionClickStartHandle.value.id ?? null,
        fromType: connectionClickStartHandle.value.type,
        isValidConnection: isValidConnectionHandler,
        doc,
        lib: "vue",
        flowId,
        nodeLookup: nodeLookup.value
      },
      edges.value,
      nodes.value,
      findNode,
      nodeLookup.value
    );
    const isOwnHandle = ((_a = result.connection) == null ? void 0 : _a.source) === ((_b = result.connection) == null ? void 0 : _b.target);
    if (result.isValid && result.connection && !isOwnHandle) {
      emits.connect(result.connection);
    }
    emits.clickConnectEnd(event);
    endConnection(event, true);
  }
  return {
    handlePointerDown,
    handleClick
  };
}
function useNodeId() {
  return inject(NodeId, "");
}
function useNode(id2) {
  const nodeId = id2 ?? useNodeId() ?? "";
  const nodeEl = inject(NodeRef, ref(null));
  const { findNode, edges, emits } = useVueFlow();
  const node = findNode(nodeId);
  if (!node) {
    emits.error(new VueFlowError(ErrorCode.NODE_NOT_FOUND, nodeId));
  }
  return {
    id: nodeId,
    nodeEl,
    node,
    parentNode: computed(() => findNode(node.parentNode)),
    connectedEdges: computed(() => getConnectedEdges([node], edges.value))
  };
}
function createNodeHooks() {
  return {
    doubleClick: createExtendedEventHook(),
    click: createExtendedEventHook(),
    mouseEnter: createExtendedEventHook(),
    mouseMove: createExtendedEventHook(),
    mouseLeave: createExtendedEventHook(),
    contextMenu: createExtendedEventHook(),
    dragStart: createExtendedEventHook(),
    drag: createExtendedEventHook(),
    dragStop: createExtendedEventHook()
  };
}
function useNodeHooks(node, emits) {
  const nodeHooks = createNodeHooks();
  nodeHooks.doubleClick.on((event) => {
    var _a, _b;
    emits.nodeDoubleClick(event);
    (_b = (_a = node.events) == null ? void 0 : _a.doubleClick) == null ? void 0 : _b.call(_a, event);
  });
  nodeHooks.click.on((event) => {
    var _a, _b;
    emits.nodeClick(event);
    (_b = (_a = node.events) == null ? void 0 : _a.click) == null ? void 0 : _b.call(_a, event);
  });
  nodeHooks.mouseEnter.on((event) => {
    var _a, _b;
    emits.nodeMouseEnter(event);
    (_b = (_a = node.events) == null ? void 0 : _a.mouseEnter) == null ? void 0 : _b.call(_a, event);
  });
  nodeHooks.mouseMove.on((event) => {
    var _a, _b;
    emits.nodeMouseMove(event);
    (_b = (_a = node.events) == null ? void 0 : _a.mouseMove) == null ? void 0 : _b.call(_a, event);
  });
  nodeHooks.mouseLeave.on((event) => {
    var _a, _b;
    emits.nodeMouseLeave(event);
    (_b = (_a = node.events) == null ? void 0 : _a.mouseLeave) == null ? void 0 : _b.call(_a, event);
  });
  nodeHooks.contextMenu.on((event) => {
    var _a, _b;
    emits.nodeContextMenu(event);
    (_b = (_a = node.events) == null ? void 0 : _a.contextMenu) == null ? void 0 : _b.call(_a, event);
  });
  nodeHooks.dragStart.on((event) => {
    var _a, _b;
    emits.nodeDragStart(event);
    (_b = (_a = node.events) == null ? void 0 : _a.dragStart) == null ? void 0 : _b.call(_a, event);
  });
  nodeHooks.drag.on((event) => {
    var _a, _b;
    emits.nodeDrag(event);
    (_b = (_a = node.events) == null ? void 0 : _a.drag) == null ? void 0 : _b.call(_a, event);
  });
  nodeHooks.dragStop.on((event) => {
    var _a, _b;
    emits.nodeDragStop(event);
    (_b = (_a = node.events) == null ? void 0 : _a.dragStop) == null ? void 0 : _b.call(_a, event);
  });
  return Object.entries(nodeHooks).reduce(
    (hooks, [key, value]) => {
      hooks.emit[key] = value.trigger;
      hooks.on[key] = value.on;
      return hooks;
    },
    { emit: {}, on: {} }
  );
}
function useUpdateNodePositions() {
  const { getSelectedNodes, nodeExtent, updateNodePositions, findNode, snapGrid, snapToGrid, nodesDraggable, emits } = useVueFlow();
  return (positionDiff, isShiftPressed = false) => {
    const xVelo = snapToGrid.value ? snapGrid.value[0] : 5;
    const yVelo = snapToGrid.value ? snapGrid.value[1] : 5;
    const factor = isShiftPressed ? 4 : 1;
    const positionDiffX = positionDiff.x * xVelo * factor;
    const positionDiffY = positionDiff.y * yVelo * factor;
    const nodeUpdates = [];
    for (const node of getSelectedNodes.value) {
      if (node.draggable || nodesDraggable && typeof node.draggable === "undefined") {
        const nextPosition = { x: node.computedPosition.x + positionDiffX, y: node.computedPosition.y + positionDiffY };
        const { computedPosition } = calcNextPosition(
          node,
          nextPosition,
          emits.error,
          nodeExtent.value,
          node.parentNode ? findNode(node.parentNode) : void 0
        );
        nodeUpdates.push({
          id: node.id,
          position: computedPosition,
          from: node.position,
          distance: { x: positionDiff.x, y: positionDiff.y },
          dimensions: node.dimensions
        });
      }
    }
    updateNodePositions(nodeUpdates, true, false);
  };
}
const DEFAULT_PADDING = 0.1;
const defaultEase = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
function noop() {
  warn("Viewport not initialized yet.");
  return Promise.resolve(false);
}
const initialViewportHelper = {
  zoomIn: noop,
  zoomOut: noop,
  zoomTo: noop,
  fitView: noop,
  setCenter: noop,
  fitBounds: noop,
  project: (position) => position,
  screenToFlowCoordinate: (position) => position,
  flowToScreenCoordinate: (position) => position,
  setViewport: noop,
  setTransform: noop,
  getViewport: () => ({ x: 0, y: 0, zoom: 1 }),
  getTransform: () => ({ x: 0, y: 0, zoom: 1 }),
  viewportInitialized: false
};
function useViewportHelper(state) {
  function zoom2(scale, transitionOptions) {
    return new Promise((resolve) => {
      if (state.d3Selection && state.d3Zoom) {
        state.d3Zoom.interpolate((transitionOptions == null ? void 0 : transitionOptions.interpolate) === "linear" ? interpolate$1 : interpolateZoom).scaleBy(
          getD3Transition(state.d3Selection, transitionOptions == null ? void 0 : transitionOptions.duration, transitionOptions == null ? void 0 : transitionOptions.ease, () => {
            resolve(true);
          }),
          scale
        );
      } else {
        resolve(false);
      }
    });
  }
  function transformViewport(x, y, zoom22, transitionOptions) {
    return new Promise((resolve) => {
      var _a;
      const { x: clampedX, y: clampedY } = clampPosition({ x: -x, y: -y }, state.translateExtent);
      const nextTransform = identity.translate(-clampedX, -clampedY).scale(zoom22);
      if (state.d3Selection && state.d3Zoom) {
        (_a = state.d3Zoom) == null ? void 0 : _a.interpolate((transitionOptions == null ? void 0 : transitionOptions.interpolate) === "linear" ? interpolate$1 : interpolateZoom).transform(
          getD3Transition(state.d3Selection, transitionOptions == null ? void 0 : transitionOptions.duration, transitionOptions == null ? void 0 : transitionOptions.ease, () => {
            resolve(true);
          }),
          nextTransform
        );
      } else {
        resolve(false);
      }
    });
  }
  return computed(() => {
    const isInitialized = state.d3Zoom && state.d3Selection && state.dimensions.width && state.dimensions.height;
    if (!isInitialized) {
      return initialViewportHelper;
    }
    return {
      viewportInitialized: true,
      // todo: allow passing scale as option
      zoomIn: (options) => {
        return zoom2(1.2, options);
      },
      zoomOut: (options) => {
        return zoom2(1 / 1.2, options);
      },
      zoomTo: (zoomLevel, options) => {
        return new Promise((resolve) => {
          if (state.d3Selection && state.d3Zoom) {
            state.d3Zoom.interpolate((options == null ? void 0 : options.interpolate) === "linear" ? interpolate$1 : interpolateZoom).scaleTo(
              getD3Transition(state.d3Selection, options == null ? void 0 : options.duration, options == null ? void 0 : options.ease, () => {
                resolve(true);
              }),
              zoomLevel
            );
          } else {
            resolve(false);
          }
        });
      },
      setViewport: (transform, options) => {
        return transformViewport(transform.x, transform.y, transform.zoom, options);
      },
      setTransform: (transform, options) => {
        return transformViewport(transform.x, transform.y, transform.zoom, options);
      },
      getViewport: () => ({
        x: state.viewport.x,
        y: state.viewport.y,
        zoom: state.viewport.zoom
      }),
      getTransform: () => {
        return {
          x: state.viewport.x,
          y: state.viewport.y,
          zoom: state.viewport.zoom
        };
      },
      fitView: (options = {
        padding: DEFAULT_PADDING,
        includeHiddenNodes: false,
        duration: 0
      }) => {
        var _a, _b;
        const nodesToFit = [];
        for (const node of state.nodes) {
          const isVisible = node.dimensions.width && node.dimensions.height && ((options == null ? void 0 : options.includeHiddenNodes) || !node.hidden);
          if (isVisible) {
            if (!((_a = options.nodes) == null ? void 0 : _a.length) || ((_b = options.nodes) == null ? void 0 : _b.length) && options.nodes.includes(node.id)) {
              nodesToFit.push(node);
            }
          }
        }
        if (!nodesToFit.length) {
          return Promise.resolve(false);
        }
        const bounds = getRectOfNodes(nodesToFit);
        const { x, y, zoom: zoom22 } = getTransformForBounds(
          bounds,
          state.dimensions.width,
          state.dimensions.height,
          options.minZoom ?? state.minZoom,
          options.maxZoom ?? state.maxZoom,
          options.padding ?? DEFAULT_PADDING,
          options.offset
        );
        return transformViewport(x, y, zoom22, options);
      },
      setCenter: (x, y, options) => {
        const nextZoom = typeof (options == null ? void 0 : options.zoom) !== "undefined" ? options.zoom : state.maxZoom;
        const centerX = state.dimensions.width / 2 - x * nextZoom;
        const centerY = state.dimensions.height / 2 - y * nextZoom;
        return transformViewport(centerX, centerY, nextZoom, options);
      },
      fitBounds: (bounds, options = { padding: DEFAULT_PADDING }) => {
        const { x, y, zoom: zoom22 } = getTransformForBounds(
          bounds,
          state.dimensions.width,
          state.dimensions.height,
          state.minZoom,
          state.maxZoom,
          options.padding
        );
        return transformViewport(x, y, zoom22, options);
      },
      project: (position) => pointToRendererPoint(position, state.viewport, state.snapToGrid, state.snapGrid),
      screenToFlowCoordinate: (position) => {
        if (state.vueFlowRef) {
          const { x: domX, y: domY } = state.vueFlowRef.getBoundingClientRect();
          const correctedPosition = {
            x: position.x - domX,
            y: position.y - domY
          };
          return pointToRendererPoint(correctedPosition, state.viewport, state.snapToGrid, state.snapGrid);
        }
        return { x: 0, y: 0 };
      },
      flowToScreenCoordinate: (position) => {
        if (state.vueFlowRef) {
          const { x: domX, y: domY } = state.vueFlowRef.getBoundingClientRect();
          const correctedPosition = {
            x: position.x + domX,
            y: position.y + domY
          };
          return rendererPointToPoint(correctedPosition, state.viewport);
        }
        return { x: 0, y: 0 };
      }
    };
  });
}
function getD3Transition(selection2, duration = 0, ease = defaultEase, onEnd = () => {
}) {
  const hasDuration = typeof duration === "number" && duration > 0;
  if (!hasDuration) {
    onEnd();
  }
  return hasDuration ? selection2.transition().duration(duration).ease(ease).on("end", onEnd) : selection2;
}
function useWatchProps(models, props, store) {
  const scope = effectScope(true);
  scope.run(() => {
    const watchModelValue = () => {
      scope.run(() => {
        let pauseModel;
        let pauseStore;
        let immediateStore = !!(store.nodes.value.length || store.edges.value.length);
        pauseModel = watchPausable([models.modelValue, () => {
          var _a, _b;
          return (_b = (_a = models.modelValue) == null ? void 0 : _a.value) == null ? void 0 : _b.length;
        }], ([elements]) => {
          if (elements && Array.isArray(elements)) {
            pauseStore == null ? void 0 : pauseStore.pause();
            store.setElements(elements);
            if (!pauseStore && !immediateStore && elements.length) {
              immediateStore = true;
            } else {
              pauseStore == null ? void 0 : pauseStore.resume();
            }
          }
        });
        pauseStore = watchPausable(
          [store.nodes, store.edges, () => store.edges.value.length, () => store.nodes.value.length],
          ([nodes, edges]) => {
            var _a;
            if (((_a = models.modelValue) == null ? void 0 : _a.value) && Array.isArray(models.modelValue.value)) {
              pauseModel == null ? void 0 : pauseModel.pause();
              models.modelValue.value = [...nodes, ...edges];
              nextTick(() => {
                pauseModel == null ? void 0 : pauseModel.resume();
              });
            }
          },
          { immediate: immediateStore }
        );
        onScopeDispose(() => {
          pauseModel == null ? void 0 : pauseModel.stop();
          pauseStore == null ? void 0 : pauseStore.stop();
        });
      });
    };
    const watchNodesValue = () => {
      scope.run(() => {
        let pauseModel;
        let pauseStore;
        let immediateStore = !!store.nodes.value.length;
        pauseModel = watchPausable([models.nodes, () => {
          var _a, _b;
          return (_b = (_a = models.nodes) == null ? void 0 : _a.value) == null ? void 0 : _b.length;
        }], ([nodes]) => {
          if (nodes && Array.isArray(nodes)) {
            pauseStore == null ? void 0 : pauseStore.pause();
            store.setNodes(nodes);
            if (!pauseStore && !immediateStore && nodes.length) {
              immediateStore = true;
            } else {
              pauseStore == null ? void 0 : pauseStore.resume();
            }
          }
        });
        pauseStore = watchPausable(
          [store.nodes, () => store.nodes.value.length],
          ([nodes]) => {
            var _a;
            if (((_a = models.nodes) == null ? void 0 : _a.value) && Array.isArray(models.nodes.value)) {
              pauseModel == null ? void 0 : pauseModel.pause();
              models.nodes.value = [...nodes];
              nextTick(() => {
                pauseModel == null ? void 0 : pauseModel.resume();
              });
            }
          },
          { immediate: immediateStore }
        );
        onScopeDispose(() => {
          pauseModel == null ? void 0 : pauseModel.stop();
          pauseStore == null ? void 0 : pauseStore.stop();
        });
      });
    };
    const watchEdgesValue = () => {
      scope.run(() => {
        let pauseModel;
        let pauseStore;
        let immediateStore = !!store.edges.value.length;
        pauseModel = watchPausable([models.edges, () => {
          var _a, _b;
          return (_b = (_a = models.edges) == null ? void 0 : _a.value) == null ? void 0 : _b.length;
        }], ([edges]) => {
          if (edges && Array.isArray(edges)) {
            pauseStore == null ? void 0 : pauseStore.pause();
            store.setEdges(edges);
            if (!pauseStore && !immediateStore && edges.length) {
              immediateStore = true;
            } else {
              pauseStore == null ? void 0 : pauseStore.resume();
            }
          }
        });
        pauseStore = watchPausable(
          [store.edges, () => store.edges.value.length],
          ([edges]) => {
            var _a;
            if (((_a = models.edges) == null ? void 0 : _a.value) && Array.isArray(models.edges.value)) {
              pauseModel == null ? void 0 : pauseModel.pause();
              models.edges.value = [...edges];
              nextTick(() => {
                pauseModel == null ? void 0 : pauseModel.resume();
              });
            }
          },
          { immediate: immediateStore }
        );
        onScopeDispose(() => {
          pauseModel == null ? void 0 : pauseModel.stop();
          pauseStore == null ? void 0 : pauseStore.stop();
        });
      });
    };
    const watchMaxZoom = () => {
      scope.run(() => {
        watch(
          () => props.maxZoom,
          () => {
            if (props.maxZoom && isDef(props.maxZoom)) {
              store.setMaxZoom(props.maxZoom);
            }
          },
          {
            immediate: true
          }
        );
      });
    };
    const watchMinZoom = () => {
      scope.run(() => {
        watch(
          () => props.minZoom,
          () => {
            if (props.minZoom && isDef(props.minZoom)) {
              store.setMinZoom(props.minZoom);
            }
          },
          { immediate: true }
        );
      });
    };
    const watchTranslateExtent = () => {
      scope.run(() => {
        watch(
          () => props.translateExtent,
          () => {
            if (props.translateExtent && isDef(props.translateExtent)) {
              store.setTranslateExtent(props.translateExtent);
            }
          },
          {
            immediate: true
          }
        );
      });
    };
    const watchNodeExtent = () => {
      scope.run(() => {
        watch(
          () => props.nodeExtent,
          () => {
            if (props.nodeExtent && isDef(props.nodeExtent)) {
              store.setNodeExtent(props.nodeExtent);
            }
          },
          {
            immediate: true
          }
        );
      });
    };
    const watchApplyDefault = () => {
      scope.run(() => {
        watch(
          () => props.applyDefault,
          () => {
            if (isDef(props.applyDefault)) {
              store.applyDefault.value = props.applyDefault;
            }
          },
          {
            immediate: true
          }
        );
      });
    };
    const watchAutoConnect = () => {
      scope.run(() => {
        const autoConnector = async (params) => {
          let connection = params;
          if (typeof props.autoConnect === "function") {
            connection = await props.autoConnect(params);
          }
          if (connection !== false) {
            store.addEdges([connection]);
          }
        };
        watch(
          () => props.autoConnect,
          () => {
            if (isDef(props.autoConnect)) {
              store.autoConnect.value = props.autoConnect;
            }
          },
          { immediate: true }
        );
        watch(
          store.autoConnect,
          (autoConnectEnabled, _, onCleanup) => {
            if (autoConnectEnabled) {
              store.onConnect(autoConnector);
            } else {
              store.hooks.value.connect.off(autoConnector);
            }
            onCleanup(() => {
              store.hooks.value.connect.off(autoConnector);
            });
          },
          { immediate: true }
        );
      });
    };
    const watchRest = () => {
      const skip = [
        "id",
        "modelValue",
        "translateExtent",
        "nodeExtent",
        "edges",
        "nodes",
        "maxZoom",
        "minZoom",
        "applyDefault",
        "autoConnect"
      ];
      for (const key of Object.keys(props)) {
        const propKey = key;
        if (!skip.includes(propKey)) {
          const propValue = toRef(() => props[propKey]);
          const storeRef = store[propKey];
          if (isRef(storeRef)) {
            scope.run(() => {
              watch(
                propValue,
                (nextValue) => {
                  if (isDef(nextValue)) {
                    storeRef.value = nextValue;
                  }
                },
                { immediate: true }
              );
            });
          }
        }
      }
    };
    const runAll = () => {
      watchModelValue();
      watchNodesValue();
      watchEdgesValue();
      watchMinZoom();
      watchMaxZoom();
      watchTranslateExtent();
      watchNodeExtent();
      watchApplyDefault();
      watchAutoConnect();
      watchRest();
    };
    runAll();
  });
  return () => scope.stop();
}
function createHooks() {
  return {
    edgesChange: createExtendedEventHook(),
    nodesChange: createExtendedEventHook(),
    nodeDoubleClick: createExtendedEventHook(),
    nodeClick: createExtendedEventHook(),
    nodeMouseEnter: createExtendedEventHook(),
    nodeMouseMove: createExtendedEventHook(),
    nodeMouseLeave: createExtendedEventHook(),
    nodeContextMenu: createExtendedEventHook(),
    nodeDragStart: createExtendedEventHook(),
    nodeDrag: createExtendedEventHook(),
    nodeDragStop: createExtendedEventHook(),
    nodesInitialized: createExtendedEventHook(),
    miniMapNodeClick: createExtendedEventHook(),
    miniMapNodeDoubleClick: createExtendedEventHook(),
    miniMapNodeMouseEnter: createExtendedEventHook(),
    miniMapNodeMouseMove: createExtendedEventHook(),
    miniMapNodeMouseLeave: createExtendedEventHook(),
    connect: createExtendedEventHook(),
    connectStart: createExtendedEventHook(),
    connectEnd: createExtendedEventHook(),
    clickConnectStart: createExtendedEventHook(),
    clickConnectEnd: createExtendedEventHook(),
    paneReady: createExtendedEventHook(),
    init: createExtendedEventHook(),
    move: createExtendedEventHook(),
    moveStart: createExtendedEventHook(),
    moveEnd: createExtendedEventHook(),
    selectionDragStart: createExtendedEventHook(),
    selectionDrag: createExtendedEventHook(),
    selectionDragStop: createExtendedEventHook(),
    selectionContextMenu: createExtendedEventHook(),
    selectionStart: createExtendedEventHook(),
    selectionEnd: createExtendedEventHook(),
    viewportChangeStart: createExtendedEventHook(),
    viewportChange: createExtendedEventHook(),
    viewportChangeEnd: createExtendedEventHook(),
    paneScroll: createExtendedEventHook(),
    paneClick: createExtendedEventHook(),
    paneContextMenu: createExtendedEventHook(),
    paneMouseEnter: createExtendedEventHook(),
    paneMouseMove: createExtendedEventHook(),
    paneMouseLeave: createExtendedEventHook(),
    edgeContextMenu: createExtendedEventHook(),
    edgeMouseEnter: createExtendedEventHook(),
    edgeMouseMove: createExtendedEventHook(),
    edgeMouseLeave: createExtendedEventHook(),
    edgeDoubleClick: createExtendedEventHook(),
    edgeClick: createExtendedEventHook(),
    edgeUpdateStart: createExtendedEventHook(),
    edgeUpdate: createExtendedEventHook(),
    edgeUpdateEnd: createExtendedEventHook(),
    updateNodeInternals: createExtendedEventHook(),
    error: createExtendedEventHook((err) => warn(err.message))
  };
}
function useHooks(emit, hooks) {
  const inst = getCurrentInstance();
  onBeforeMount(() => {
    for (const [key, value] of Object.entries(hooks.value)) {
      const listener = (data) => {
        emit(key, data);
      };
      value.setEmitter(listener);
      tryOnScopeDispose(value.removeEmitter);
      value.setHasEmitListeners(() => hasVNodeListener(key));
      tryOnScopeDispose(value.removeHasEmitListeners);
    }
  });
  function hasVNodeListener(event) {
    var _a;
    const key = toHandlerKey(event);
    const h2 = (_a = inst == null ? void 0 : inst.vnode.props) == null ? void 0 : _a[key];
    return !!h2;
  }
}
function toHandlerKey(event) {
  const [head, ...rest] = event.split(":");
  const camel = head.replace(/(?:^|-)(\w)/g, (_, c) => c.toUpperCase());
  return `on${camel}${rest.length ? `:${rest.join(":")}` : ""}`;
}
function useState() {
  return {
    vueFlowRef: null,
    viewportRef: null,
    nodes: [],
    edges: [],
    connectionLookup: /* @__PURE__ */ new Map(),
    nodeTypes: {},
    edgeTypes: {},
    initialized: false,
    dimensions: {
      width: 0,
      height: 0
    },
    viewport: { x: 0, y: 0, zoom: 1 },
    d3Zoom: null,
    d3Selection: null,
    d3ZoomHandler: null,
    minZoom: 0.5,
    maxZoom: 2,
    translateExtent: [
      [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
    ],
    nodeExtent: [
      [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
    ],
    selectionMode: SelectionMode.Full,
    paneDragging: false,
    preventScrolling: true,
    zoomOnScroll: true,
    zoomOnPinch: true,
    zoomOnDoubleClick: true,
    panOnScroll: false,
    panOnScrollSpeed: 0.5,
    panOnScrollMode: PanOnScrollMode.Free,
    paneClickDistance: 0,
    panOnDrag: true,
    edgeUpdaterRadius: 10,
    onlyRenderVisibleElements: false,
    defaultViewport: { x: 0, y: 0, zoom: 1 },
    nodesSelectionActive: false,
    userSelectionActive: false,
    userSelectionRect: null,
    defaultMarkerColor: "#b1b1b7",
    connectionLineStyle: {},
    connectionLineType: null,
    connectionLineOptions: {
      type: ConnectionLineType.Bezier,
      style: {}
    },
    connectionMode: ConnectionMode.Loose,
    connectionStartHandle: null,
    connectionEndHandle: null,
    connectionClickStartHandle: null,
    connectionPosition: { x: Number.NaN, y: Number.NaN },
    connectionRadius: 20,
    connectOnClick: true,
    connectionStatus: null,
    isValidConnection: null,
    snapGrid: [15, 15],
    snapToGrid: false,
    edgesUpdatable: false,
    edgesFocusable: true,
    nodesFocusable: true,
    nodesConnectable: true,
    nodesDraggable: true,
    nodeDragThreshold: 1,
    elementsSelectable: true,
    selectNodesOnDrag: true,
    multiSelectionActive: false,
    selectionKeyCode: "Shift",
    multiSelectionKeyCode: isMacOs() ? "Meta" : "Control",
    zoomActivationKeyCode: isMacOs() ? "Meta" : "Control",
    deleteKeyCode: "Backspace",
    panActivationKeyCode: "Space",
    hooks: createHooks(),
    applyDefault: true,
    autoConnect: false,
    fitViewOnInit: false,
    fitViewOnInitDone: false,
    noDragClassName: "nodrag",
    noWheelClassName: "nowheel",
    noPanClassName: "nopan",
    defaultEdgeOptions: void 0,
    elevateEdgesOnSelect: false,
    elevateNodesOnSelect: true,
    autoPanOnNodeDrag: true,
    autoPanOnConnect: true,
    autoPanSpeed: 15,
    disableKeyboardA11y: false,
    ariaLiveMessage: ""
  };
}
const storeOptionsToSkip = [
  "id",
  "vueFlowRef",
  "viewportRef",
  "initialized",
  "modelValue",
  "nodes",
  "edges",
  "maxZoom",
  "minZoom",
  "translateExtent",
  "hooks",
  "defaultEdgeOptions"
];
function useActions(state, nodeLookup, edgeLookup) {
  const viewportHelper = useViewportHelper(state);
  const updateNodeInternals = (ids) => {
    const updateIds = ids ?? [];
    state.hooks.updateNodeInternals.trigger(updateIds);
  };
  const getIncomers$1 = (nodeOrId) => {
    return getIncomers(nodeOrId, state.nodes, state.edges);
  };
  const getOutgoers$1 = (nodeOrId) => {
    return getOutgoers(nodeOrId, state.nodes, state.edges);
  };
  const getConnectedEdges$1 = (nodesOrId) => {
    return getConnectedEdges(nodesOrId, state.edges);
  };
  const getHandleConnections = ({ id: id2, type, nodeId }) => {
    var _a;
    const handleSuffix = id2 ? `-${type}-${id2}` : `-${type}`;
    return Array.from(((_a = state.connectionLookup.get(`${nodeId}${handleSuffix}`)) == null ? void 0 : _a.values()) ?? []);
  };
  const findNode = (id2) => {
    if (!id2) {
      return;
    }
    return nodeLookup.value.get(id2);
  };
  const findEdge = (id2) => {
    if (!id2) {
      return;
    }
    return edgeLookup.value.get(id2);
  };
  const updateNodePositions = (dragItems, changed, dragging) => {
    var _a, _b;
    const changes = [];
    for (const node of dragItems) {
      const change = {
        id: node.id,
        type: "position",
        dragging,
        from: node.from
      };
      if (changed) {
        change.position = node.position;
        if (node.parentNode) {
          const parentNode = findNode(node.parentNode);
          change.position = {
            x: change.position.x - (((_a = parentNode == null ? void 0 : parentNode.computedPosition) == null ? void 0 : _a.x) ?? 0),
            y: change.position.y - (((_b = parentNode == null ? void 0 : parentNode.computedPosition) == null ? void 0 : _b.y) ?? 0)
          };
        }
      }
      changes.push(change);
    }
    if (changes == null ? void 0 : changes.length) {
      state.hooks.nodesChange.trigger(changes);
    }
  };
  const updateNodeDimensions = (updates) => {
    if (!state.vueFlowRef) {
      return;
    }
    const viewportNode = state.vueFlowRef.querySelector(".vue-flow__transformationpane");
    if (!viewportNode) {
      return;
    }
    const style = window.getComputedStyle(viewportNode);
    const { m22: zoom2 } = new window.DOMMatrixReadOnly(style.transform);
    const changes = [];
    for (const element of updates) {
      const update = element;
      const node = findNode(update.id);
      if (node) {
        const dimensions = getDimensions(update.nodeElement);
        const doUpdate = !!(dimensions.width && dimensions.height && (node.dimensions.width !== dimensions.width || node.dimensions.height !== dimensions.height || update.forceUpdate));
        if (doUpdate) {
          const nodeBounds = update.nodeElement.getBoundingClientRect();
          node.dimensions = dimensions;
          node.handleBounds.source = getHandleBounds("source", update.nodeElement, nodeBounds, zoom2, node.id);
          node.handleBounds.target = getHandleBounds("target", update.nodeElement, nodeBounds, zoom2, node.id);
          changes.push({
            id: node.id,
            type: "dimensions",
            dimensions
          });
        }
      }
    }
    if (!state.fitViewOnInitDone && state.fitViewOnInit) {
      viewportHelper.value.fitView().then(() => {
        state.fitViewOnInitDone = true;
      });
    }
    if (changes.length) {
      state.hooks.nodesChange.trigger(changes);
    }
  };
  const elementSelectionHandler = (elements, selected) => {
    const nodeIds = /* @__PURE__ */ new Set();
    const edgeIds = /* @__PURE__ */ new Set();
    for (const element of elements) {
      if (isNode(element)) {
        nodeIds.add(element.id);
      } else if (isEdge(element)) {
        edgeIds.add(element.id);
      }
    }
    const changedNodes = getSelectionChanges(nodeLookup.value, nodeIds, true);
    const changedEdges = getSelectionChanges(edgeLookup.value, edgeIds);
    if (state.multiSelectionActive) {
      for (const nodeId of nodeIds) {
        changedNodes.push(createSelectionChange(nodeId, selected));
      }
      for (const edgeId of edgeIds) {
        changedEdges.push(createSelectionChange(edgeId, selected));
      }
    }
    if (changedNodes.length) {
      state.hooks.nodesChange.trigger(changedNodes);
    }
    if (changedEdges.length) {
      state.hooks.edgesChange.trigger(changedEdges);
    }
  };
  const addSelectedNodes = (nodes) => {
    if (state.multiSelectionActive) {
      const nodeChanges = nodes.map((node) => createSelectionChange(node.id, true));
      state.hooks.nodesChange.trigger(nodeChanges);
      return;
    }
    state.hooks.nodesChange.trigger(getSelectionChanges(nodeLookup.value, new Set(nodes.map((n) => n.id)), true));
    state.hooks.edgesChange.trigger(getSelectionChanges(edgeLookup.value));
  };
  const addSelectedEdges = (edges) => {
    if (state.multiSelectionActive) {
      const changedEdges = edges.map((edge) => createSelectionChange(edge.id, true));
      state.hooks.edgesChange.trigger(changedEdges);
      return;
    }
    state.hooks.edgesChange.trigger(getSelectionChanges(edgeLookup.value, new Set(edges.map((e) => e.id))));
    state.hooks.nodesChange.trigger(getSelectionChanges(nodeLookup.value, /* @__PURE__ */ new Set(), true));
  };
  const addSelectedElements = (elements) => {
    elementSelectionHandler(elements, true);
  };
  const removeSelectedNodes = (nodes) => {
    const nodesToUnselect = nodes || state.nodes;
    const nodeChanges = nodesToUnselect.map((n) => {
      n.selected = false;
      return createSelectionChange(n.id, false);
    });
    state.hooks.nodesChange.trigger(nodeChanges);
  };
  const removeSelectedEdges = (edges) => {
    const edgesToUnselect = edges || state.edges;
    const edgeChanges = edgesToUnselect.map((e) => {
      e.selected = false;
      return createSelectionChange(e.id, false);
    });
    state.hooks.edgesChange.trigger(edgeChanges);
  };
  const removeSelectedElements = (elements) => {
    if (!elements || !elements.length) {
      return elementSelectionHandler([], false);
    }
    const changes = elements.reduce(
      (changes2, curr) => {
        const selectionChange = createSelectionChange(curr.id, false);
        if (isNode(curr)) {
          changes2.nodes.push(selectionChange);
        } else {
          changes2.edges.push(selectionChange);
        }
        return changes2;
      },
      { nodes: [], edges: [] }
    );
    if (changes.nodes.length) {
      state.hooks.nodesChange.trigger(changes.nodes);
    }
    if (changes.edges.length) {
      state.hooks.edgesChange.trigger(changes.edges);
    }
  };
  const setMinZoom = (minZoom) => {
    var _a;
    (_a = state.d3Zoom) == null ? void 0 : _a.scaleExtent([minZoom, state.maxZoom]);
    state.minZoom = minZoom;
  };
  const setMaxZoom = (maxZoom) => {
    var _a;
    (_a = state.d3Zoom) == null ? void 0 : _a.scaleExtent([state.minZoom, maxZoom]);
    state.maxZoom = maxZoom;
  };
  const setTranslateExtent = (translateExtent) => {
    var _a;
    (_a = state.d3Zoom) == null ? void 0 : _a.translateExtent(translateExtent);
    state.translateExtent = translateExtent;
  };
  const setNodeExtent = (nodeExtent) => {
    state.nodeExtent = nodeExtent;
    updateNodeInternals();
  };
  const setPaneClickDistance = (clickDistance) => {
    var _a;
    (_a = state.d3Zoom) == null ? void 0 : _a.clickDistance(clickDistance);
  };
  const setInteractive = (isInteractive) => {
    state.nodesDraggable = isInteractive;
    state.nodesConnectable = isInteractive;
    state.elementsSelectable = isInteractive;
  };
  const setNodes = (nodes) => {
    const nextNodes = nodes instanceof Function ? nodes(state.nodes) : nodes;
    if (!state.initialized && !nextNodes.length) {
      return;
    }
    state.nodes = createGraphNodes(nextNodes, findNode, state.hooks.error.trigger);
  };
  const setEdges = (edges) => {
    const nextEdges = edges instanceof Function ? edges(state.edges) : edges;
    if (!state.initialized && !nextEdges.length) {
      return;
    }
    const validEdges = createGraphEdges(
      nextEdges,
      state.isValidConnection,
      findNode,
      findEdge,
      state.hooks.error.trigger,
      state.defaultEdgeOptions,
      state.nodes,
      state.edges
    );
    updateConnectionLookup(state.connectionLookup, edgeLookup.value, validEdges);
    state.edges = validEdges;
  };
  const setElements = (elements) => {
    const nextElements = elements instanceof Function ? elements([...state.nodes, ...state.edges]) : elements;
    if (!state.initialized && !nextElements.length) {
      return;
    }
    setNodes(nextElements.filter(isNode));
    setEdges(nextElements.filter(isEdge));
  };
  const addNodes = (nodes) => {
    let nextNodes = nodes instanceof Function ? nodes(state.nodes) : nodes;
    nextNodes = Array.isArray(nextNodes) ? nextNodes : [nextNodes];
    const graphNodes = createGraphNodes(nextNodes, findNode, state.hooks.error.trigger);
    const changes = [];
    for (const node of graphNodes) {
      changes.push(createAdditionChange(node));
    }
    if (changes.length) {
      state.hooks.nodesChange.trigger(changes);
    }
  };
  const addEdges = (params) => {
    let nextEdges = params instanceof Function ? params(state.edges) : params;
    nextEdges = Array.isArray(nextEdges) ? nextEdges : [nextEdges];
    const validEdges = createGraphEdges(
      nextEdges,
      state.isValidConnection,
      findNode,
      findEdge,
      state.hooks.error.trigger,
      state.defaultEdgeOptions,
      state.nodes,
      state.edges
    );
    const changes = [];
    for (const edge of validEdges) {
      changes.push(createAdditionChange(edge));
    }
    if (changes.length) {
      state.hooks.edgesChange.trigger(changes);
    }
  };
  const removeNodes = (nodes, removeConnectedEdges = true, removeChildren = false) => {
    const nextNodes = nodes instanceof Function ? nodes(state.nodes) : nodes;
    const nodesToRemove = Array.isArray(nextNodes) ? nextNodes : [nextNodes];
    const nodeChanges = [];
    const edgeChanges = [];
    function createEdgeRemovalChanges(nodes2) {
      const connectedEdges = getConnectedEdges$1(nodes2);
      for (const edge of connectedEdges) {
        if (isDef(edge.deletable) ? edge.deletable : true) {
          edgeChanges.push(createEdgeRemoveChange(edge.id, edge.source, edge.target, edge.sourceHandle, edge.targetHandle));
        }
      }
    }
    function createChildrenRemovalChanges(id2) {
      const children2 = [];
      for (const node of state.nodes) {
        if (node.parentNode === id2) {
          children2.push(node);
        }
      }
      if (children2.length) {
        for (const child of children2) {
          nodeChanges.push(createNodeRemoveChange(child.id));
        }
        if (removeConnectedEdges) {
          createEdgeRemovalChanges(children2);
        }
        for (const child of children2) {
          createChildrenRemovalChanges(child.id);
        }
      }
    }
    for (const item of nodesToRemove) {
      const currNode = typeof item === "string" ? findNode(item) : item;
      if (!currNode) {
        continue;
      }
      if (isDef(currNode.deletable) && !currNode.deletable) {
        continue;
      }
      nodeChanges.push(createNodeRemoveChange(currNode.id));
      if (removeConnectedEdges) {
        createEdgeRemovalChanges([currNode]);
      }
      if (removeChildren) {
        createChildrenRemovalChanges(currNode.id);
      }
    }
    if (edgeChanges.length) {
      state.hooks.edgesChange.trigger(edgeChanges);
    }
    if (nodeChanges.length) {
      state.hooks.nodesChange.trigger(nodeChanges);
    }
  };
  const removeEdges = (edges) => {
    const nextEdges = edges instanceof Function ? edges(state.edges) : edges;
    const edgesToRemove = Array.isArray(nextEdges) ? nextEdges : [nextEdges];
    const changes = [];
    for (const item of edgesToRemove) {
      const currEdge = typeof item === "string" ? findEdge(item) : item;
      if (!currEdge) {
        continue;
      }
      if (isDef(currEdge.deletable) && !currEdge.deletable) {
        continue;
      }
      changes.push(
        createEdgeRemoveChange(
          typeof item === "string" ? item : item.id,
          currEdge.source,
          currEdge.target,
          currEdge.sourceHandle,
          currEdge.targetHandle
        )
      );
    }
    state.hooks.edgesChange.trigger(changes);
  };
  const updateEdge2 = (oldEdge, newConnection, shouldReplaceId = true) => {
    const prevEdge = findEdge(oldEdge.id);
    if (!prevEdge) {
      return false;
    }
    const prevEdgeIndex = state.edges.indexOf(prevEdge);
    const newEdge = updateEdgeAction(oldEdge, newConnection, prevEdge, shouldReplaceId, state.hooks.error.trigger);
    if (newEdge) {
      const [validEdge] = createGraphEdges(
        [newEdge],
        state.isValidConnection,
        findNode,
        findEdge,
        state.hooks.error.trigger,
        state.defaultEdgeOptions,
        state.nodes,
        state.edges
      );
      state.edges = state.edges.map((edge, index) => index === prevEdgeIndex ? validEdge : edge);
      updateConnectionLookup(state.connectionLookup, edgeLookup.value, [validEdge]);
      return validEdge;
    }
    return false;
  };
  const updateEdgeData = (id2, dataUpdate, options = { replace: false }) => {
    const edge = findEdge(id2);
    if (!edge) {
      return;
    }
    const nextData = typeof dataUpdate === "function" ? dataUpdate(edge) : dataUpdate;
    edge.data = options.replace ? nextData : { ...edge.data, ...nextData };
  };
  const applyNodeChanges2 = (changes) => {
    return applyChanges(changes, state.nodes);
  };
  const applyEdgeChanges2 = (changes) => {
    const changedEdges = applyChanges(changes, state.edges);
    updateConnectionLookup(state.connectionLookup, edgeLookup.value, changedEdges);
    return changedEdges;
  };
  const updateNode = (id2, nodeUpdate, options = { replace: false }) => {
    const node = findNode(id2);
    if (!node) {
      return;
    }
    const nextNode = typeof nodeUpdate === "function" ? nodeUpdate(node) : nodeUpdate;
    if (options.replace) {
      state.nodes.splice(state.nodes.indexOf(node), 1, nextNode);
    } else {
      Object.assign(node, nextNode);
    }
  };
  const updateNodeData = (id2, dataUpdate, options = { replace: false }) => {
    const node = findNode(id2);
    if (!node) {
      return;
    }
    const nextData = typeof dataUpdate === "function" ? dataUpdate(node) : dataUpdate;
    node.data = options.replace ? nextData : { ...node.data, ...nextData };
  };
  const startConnection = (startHandle, position, isClick = false) => {
    if (isClick) {
      state.connectionClickStartHandle = startHandle;
    } else {
      state.connectionStartHandle = startHandle;
    }
    state.connectionEndHandle = null;
    state.connectionStatus = null;
    if (position) {
      state.connectionPosition = position;
    }
  };
  const updateConnection = (position, result = null, status = null) => {
    if (state.connectionStartHandle) {
      state.connectionPosition = position;
      state.connectionEndHandle = result;
      state.connectionStatus = status;
    }
  };
  const endConnection = (event, isClick) => {
    state.connectionPosition = { x: Number.NaN, y: Number.NaN };
    state.connectionEndHandle = null;
    state.connectionStatus = null;
    if (isClick) {
      state.connectionClickStartHandle = null;
    } else {
      state.connectionStartHandle = null;
    }
  };
  const getNodeRect = (nodeOrRect) => {
    const isRectObj = isRect(nodeOrRect);
    const node = isRectObj ? null : isGraphNode(nodeOrRect) ? nodeOrRect : findNode(nodeOrRect.id);
    if (!isRectObj && !node) {
      return [null, null, isRectObj];
    }
    const nodeRect = isRectObj ? nodeOrRect : nodeToRect(node);
    return [nodeRect, node, isRectObj];
  };
  const getIntersectingNodes = (nodeOrRect, partially = true, nodes = state.nodes) => {
    const [nodeRect, node, isRect2] = getNodeRect(nodeOrRect);
    if (!nodeRect) {
      return [];
    }
    const intersections = [];
    for (const n of nodes || state.nodes) {
      if (!isRect2 && (n.id === node.id || !n.computedPosition)) {
        continue;
      }
      const currNodeRect = nodeToRect(n);
      const overlappingArea = getOverlappingArea(currNodeRect, nodeRect);
      const partiallyVisible = partially && overlappingArea > 0;
      if (partiallyVisible || overlappingArea >= currNodeRect.width * currNodeRect.height || overlappingArea >= Number(nodeRect.width) * Number(nodeRect.height)) {
        intersections.push(n);
      }
    }
    return intersections;
  };
  const isNodeIntersecting = (nodeOrRect, area, partially = true) => {
    const [nodeRect] = getNodeRect(nodeOrRect);
    if (!nodeRect) {
      return false;
    }
    const overlappingArea = getOverlappingArea(nodeRect, area);
    const partiallyVisible = partially && overlappingArea > 0;
    return partiallyVisible || overlappingArea >= Number(nodeRect.width) * Number(nodeRect.height);
  };
  const panBy = (delta) => {
    const { viewport, dimensions, d3Zoom, d3Selection, translateExtent } = state;
    if (!d3Zoom || !d3Selection || !delta.x && !delta.y) {
      return false;
    }
    const nextTransform = identity.translate(viewport.x + delta.x, viewport.y + delta.y).scale(viewport.zoom);
    const extent = [
      [0, 0],
      [dimensions.width, dimensions.height]
    ];
    const constrainedTransform = d3Zoom.constrain()(nextTransform, extent, translateExtent);
    const transformChanged = state.viewport.x !== constrainedTransform.x || state.viewport.y !== constrainedTransform.y || state.viewport.zoom !== constrainedTransform.k;
    d3Zoom.transform(d3Selection, constrainedTransform);
    return transformChanged;
  };
  const setState = (options) => {
    const opts = options instanceof Function ? options(state) : options;
    const exclude = [
      "d3Zoom",
      "d3Selection",
      "d3ZoomHandler",
      "viewportRef",
      "vueFlowRef",
      "dimensions",
      "hooks"
    ];
    if (isDef(opts.defaultEdgeOptions)) {
      state.defaultEdgeOptions = opts.defaultEdgeOptions;
    }
    const elements = opts.modelValue || opts.nodes || opts.edges ? [] : void 0;
    if (elements) {
      if (opts.modelValue) {
        elements.push(...opts.modelValue);
      }
      if (opts.nodes) {
        elements.push(...opts.nodes);
      }
      if (opts.edges) {
        elements.push(...opts.edges);
      }
      setElements(elements);
    }
    const setSkippedOptions = () => {
      if (isDef(opts.maxZoom)) {
        setMaxZoom(opts.maxZoom);
      }
      if (isDef(opts.minZoom)) {
        setMinZoom(opts.minZoom);
      }
      if (isDef(opts.translateExtent)) {
        setTranslateExtent(opts.translateExtent);
      }
    };
    for (const o of Object.keys(opts)) {
      const key = o;
      const option = opts[key];
      if (![...storeOptionsToSkip, ...exclude].includes(key) && isDef(option)) {
        state[key] = option;
      }
    }
    until(() => state.d3Zoom).not.toBeNull().then(setSkippedOptions);
    if (!state.initialized) {
      state.initialized = true;
    }
  };
  const toObject = () => {
    const nodes = [];
    const edges = [];
    for (const node of state.nodes) {
      const {
        computedPosition: _,
        handleBounds: __,
        selected: ___,
        dimensions: ____,
        isParent: _____,
        resizing: ______,
        dragging: _______,
        events: _________,
        ...rest
      } = node;
      nodes.push(rest);
    }
    for (const edge of state.edges) {
      const { selected: _, sourceNode: __, targetNode: ___, events: ____, ...rest } = edge;
      edges.push(rest);
    }
    return JSON.parse(
      JSON.stringify({
        nodes,
        edges,
        position: [state.viewport.x, state.viewport.y],
        zoom: state.viewport.zoom,
        viewport: state.viewport
      })
    );
  };
  const fromObject = (obj) => {
    return new Promise((resolve) => {
      const { nodes, edges, position, zoom: zoom2, viewport } = obj;
      if (nodes) {
        setNodes(nodes);
      }
      if (edges) {
        setEdges(edges);
      }
      if ((viewport == null ? void 0 : viewport.x) && (viewport == null ? void 0 : viewport.y) || position) {
        const x = (viewport == null ? void 0 : viewport.x) || position[0];
        const y = (viewport == null ? void 0 : viewport.y) || position[1];
        const nextZoom = (viewport == null ? void 0 : viewport.zoom) || zoom2 || state.viewport.zoom;
        return until(() => viewportHelper.value.viewportInitialized).toBe(true).then(() => {
          viewportHelper.value.setViewport({
            x,
            y,
            zoom: nextZoom
          }).then(() => {
            resolve(true);
          });
        });
      } else {
        resolve(true);
      }
    });
  };
  const $reset = () => {
    const resetState = useState();
    state.edges = [];
    state.nodes = [];
    if (state.d3Zoom && state.d3Selection) {
      const updatedTransform = identity.translate(resetState.defaultViewport.x ?? 0, resetState.defaultViewport.y ?? 0).scale(clamp(resetState.defaultViewport.zoom ?? 1, resetState.minZoom, resetState.maxZoom));
      const bbox = state.viewportRef.getBoundingClientRect();
      const extent = [
        [0, 0],
        [bbox.width, bbox.height]
      ];
      const constrainedTransform = state.d3Zoom.constrain()(updatedTransform, extent, resetState.translateExtent);
      state.d3Zoom.transform(state.d3Selection, constrainedTransform);
    }
    setState(resetState);
  };
  return {
    updateNodePositions,
    updateNodeDimensions,
    setElements,
    setNodes,
    setEdges,
    addNodes,
    addEdges,
    removeNodes,
    removeEdges,
    findNode,
    findEdge,
    updateEdge: updateEdge2,
    updateEdgeData,
    updateNode,
    updateNodeData,
    applyEdgeChanges: applyEdgeChanges2,
    applyNodeChanges: applyNodeChanges2,
    addSelectedElements,
    addSelectedNodes,
    addSelectedEdges,
    setMinZoom,
    setMaxZoom,
    setTranslateExtent,
    setNodeExtent,
    setPaneClickDistance,
    removeSelectedElements,
    removeSelectedNodes,
    removeSelectedEdges,
    startConnection,
    updateConnection,
    endConnection,
    setInteractive,
    setState,
    getIntersectingNodes,
    getIncomers: getIncomers$1,
    getOutgoers: getOutgoers$1,
    getConnectedEdges: getConnectedEdges$1,
    getHandleConnections,
    isNodeIntersecting,
    panBy,
    fitView: (params) => viewportHelper.value.fitView(params),
    zoomIn: (transitionOpts) => viewportHelper.value.zoomIn(transitionOpts),
    zoomOut: (transitionOpts) => viewportHelper.value.zoomOut(transitionOpts),
    zoomTo: (zoomLevel, transitionOpts) => viewportHelper.value.zoomTo(zoomLevel, transitionOpts),
    setViewport: (params, transitionOpts) => viewportHelper.value.setViewport(params, transitionOpts),
    setTransform: (params, transitionOpts) => viewportHelper.value.setTransform(params, transitionOpts),
    getViewport: () => viewportHelper.value.getViewport(),
    getTransform: () => viewportHelper.value.getTransform(),
    setCenter: (x, y, opts) => viewportHelper.value.setCenter(x, y, opts),
    fitBounds: (params, opts) => viewportHelper.value.fitBounds(params, opts),
    project: (params) => viewportHelper.value.project(params),
    screenToFlowCoordinate: (params) => viewportHelper.value.screenToFlowCoordinate(params),
    flowToScreenCoordinate: (params) => viewportHelper.value.flowToScreenCoordinate(params),
    toObject,
    fromObject,
    updateNodeInternals,
    viewportHelper,
    $reset,
    $destroy: () => {
    }
  };
}
const _hoisted_1$9$1 = ["data-id", "data-handleid", "data-nodeid", "data-handlepos"];
const __default__$f = {
  name: "Handle",
  compatConfig: { MODE: 3 }
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  ...__default__$f,
  props: {
    id: { default: null },
    type: {},
    position: { default: () => Position.Top },
    isValidConnection: { type: Function },
    connectable: { type: [Boolean, Number, String, Function], default: void 0 },
    connectableStart: { type: Boolean, default: true },
    connectableEnd: { type: Boolean, default: true }
  },
  setup(__props, { expose: __expose }) {
    const props = createPropsRestProxy(__props, ["position", "connectable", "connectableStart", "connectableEnd", "id"]);
    const type = toRef(() => props.type ?? "source");
    const isValidConnection = toRef(() => props.isValidConnection ?? null);
    const {
      id: flowId,
      connectionStartHandle,
      connectionClickStartHandle,
      connectionEndHandle,
      vueFlowRef,
      nodesConnectable,
      noDragClassName,
      noPanClassName
    } = useVueFlow();
    const { id: nodeId, node, nodeEl, connectedEdges } = useNode();
    const handle = ref();
    const isConnectableStart = toRef(() => typeof __props.connectableStart !== "undefined" ? __props.connectableStart : true);
    const isConnectableEnd = toRef(() => typeof __props.connectableEnd !== "undefined" ? __props.connectableEnd : true);
    const isConnecting = toRef(
      () => {
        var _a, _b, _c, _d, _e, _f;
        return ((_a = connectionStartHandle.value) == null ? void 0 : _a.nodeId) === nodeId && ((_b = connectionStartHandle.value) == null ? void 0 : _b.id) === __props.id && ((_c = connectionStartHandle.value) == null ? void 0 : _c.type) === type.value || ((_d = connectionEndHandle.value) == null ? void 0 : _d.nodeId) === nodeId && ((_e = connectionEndHandle.value) == null ? void 0 : _e.id) === __props.id && ((_f = connectionEndHandle.value) == null ? void 0 : _f.type) === type.value;
      }
    );
    const isClickConnecting = toRef(
      () => {
        var _a, _b, _c;
        return ((_a = connectionClickStartHandle.value) == null ? void 0 : _a.nodeId) === nodeId && ((_b = connectionClickStartHandle.value) == null ? void 0 : _b.id) === __props.id && ((_c = connectionClickStartHandle.value) == null ? void 0 : _c.type) === type.value;
      }
    );
    const { handlePointerDown, handleClick } = useHandle({
      nodeId,
      handleId: __props.id,
      isValidConnection,
      type
    });
    const isConnectable = computed(() => {
      if (typeof __props.connectable === "string" && __props.connectable === "single") {
        return !connectedEdges.value.some((edge) => {
          const id2 = edge[`${type.value}Handle`];
          if (edge[type.value] !== nodeId) {
            return false;
          }
          return id2 ? id2 === __props.id : true;
        });
      }
      if (typeof __props.connectable === "number") {
        return connectedEdges.value.filter((edge) => {
          const id2 = edge[`${type.value}Handle`];
          if (edge[type.value] !== nodeId) {
            return false;
          }
          return id2 ? id2 === __props.id : true;
        }).length < __props.connectable;
      }
      if (typeof __props.connectable === "function") {
        return __props.connectable(node, connectedEdges.value);
      }
      return isDef(__props.connectable) ? __props.connectable : nodesConnectable.value;
    });
    onMounted(() => {
      var _a;
      if (!node.dimensions.width || !node.dimensions.height) {
        return;
      }
      const existingBounds = (_a = node.handleBounds[type.value]) == null ? void 0 : _a.find((b) => b.id === __props.id);
      if (!vueFlowRef.value || existingBounds) {
        return;
      }
      const viewportNode = vueFlowRef.value.querySelector(".vue-flow__transformationpane");
      if (!nodeEl.value || !handle.value || !viewportNode || !__props.id) {
        return;
      }
      const nodeBounds = nodeEl.value.getBoundingClientRect();
      const handleBounds = handle.value.getBoundingClientRect();
      const style = window.getComputedStyle(viewportNode);
      const { m22: zoom2 } = new window.DOMMatrixReadOnly(style.transform);
      const nextBounds = {
        id: __props.id,
        position: __props.position,
        x: (handleBounds.left - nodeBounds.left) / zoom2,
        y: (handleBounds.top - nodeBounds.top) / zoom2,
        type: type.value,
        nodeId,
        ...getDimensions(handle.value)
      };
      node.handleBounds[type.value] = [...node.handleBounds[type.value] ?? [], nextBounds];
    });
    function onPointerDown(event) {
      const isMouseTriggered = isMouseEvent(event);
      if (isConnectable.value && isConnectableStart.value && (isMouseTriggered && event.button === 0 || !isMouseTriggered)) {
        handlePointerDown(event);
      }
    }
    function onClick(event) {
      if (!nodeId || !connectionClickStartHandle.value && !isConnectableStart.value) {
        return;
      }
      if (isConnectable.value) {
        handleClick(event);
      }
    }
    __expose({
      handleClick,
      handlePointerDown,
      onClick,
      onPointerDown
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "handle",
        ref: handle,
        "data-id": `${unref(flowId)}-${unref(nodeId)}-${__props.id}-${type.value}`,
        "data-handleid": __props.id,
        "data-nodeid": unref(nodeId),
        "data-handlepos": _ctx.position,
        class: normalizeClass(["vue-flow__handle", [
          `vue-flow__handle-${_ctx.position}`,
          `vue-flow__handle-${__props.id}`,
          unref(noDragClassName),
          unref(noPanClassName),
          type.value,
          {
            connectable: isConnectable.value,
            connecting: isClickConnecting.value,
            connectablestart: isConnectableStart.value,
            connectableend: isConnectableEnd.value,
            connectionindicator: isConnectable.value && (isConnectableStart.value && !isConnecting.value || isConnectableEnd.value && isConnecting.value)
          }
        ]]),
        onMousedown: onPointerDown,
        onTouchstartPassive: onPointerDown,
        onClick
      }, [
        renderSlot(_ctx.$slots, "default", { id: _ctx.id })
      ], 42, _hoisted_1$9$1);
    };
  }
});
const DefaultNode = function({
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top,
  label: _label,
  connectable = true,
  isValidTargetPos,
  isValidSourcePos,
  data
}) {
  const label = data.label ?? _label;
  return [
    h(_sfc_main$f, { type: "target", position: targetPosition, connectable, isValidConnection: isValidTargetPos }),
    typeof label !== "string" && label ? h(label) : h(Fragment, [label]),
    h(_sfc_main$f, { type: "source", position: sourcePosition, connectable, isValidConnection: isValidSourcePos })
  ];
};
DefaultNode.props = ["sourcePosition", "targetPosition", "label", "isValidTargetPos", "isValidSourcePos", "connectable", "data"];
DefaultNode.inheritAttrs = false;
DefaultNode.compatConfig = { MODE: 3 };
const DefaultNode$1 = DefaultNode;
const OutputNode = function({
  targetPosition = Position.Top,
  label: _label,
  connectable = true,
  isValidTargetPos,
  data
}) {
  const label = data.label ?? _label;
  return [
    h(_sfc_main$f, { type: "target", position: targetPosition, connectable, isValidConnection: isValidTargetPos }),
    typeof label !== "string" && label ? h(label) : h(Fragment, [label])
  ];
};
OutputNode.props = ["targetPosition", "label", "isValidTargetPos", "connectable", "data"];
OutputNode.inheritAttrs = false;
OutputNode.compatConfig = { MODE: 3 };
const OutputNode$1 = OutputNode;
const InputNode = function({
  sourcePosition = Position.Bottom,
  label: _label,
  connectable = true,
  isValidSourcePos,
  data
}) {
  const label = data.label ?? _label;
  return [
    typeof label !== "string" && label ? h(label) : h(Fragment, [label]),
    h(_sfc_main$f, { type: "source", position: sourcePosition, connectable, isValidConnection: isValidSourcePos })
  ];
};
InputNode.props = ["sourcePosition", "label", "isValidSourcePos", "connectable", "data"];
InputNode.inheritAttrs = false;
InputNode.compatConfig = { MODE: 3 };
const InputNode$1 = InputNode;
const _hoisted_1$8$1 = ["transform"];
const _hoisted_2$2$1 = ["width", "height", "x", "y", "rx", "ry"];
const _hoisted_3$1$1 = ["y"];
const __default__$e = {
  name: "EdgeText",
  compatConfig: { MODE: 3 }
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  ...__default__$e,
  props: {
    x: {},
    y: {},
    label: {},
    labelStyle: { default: () => ({}) },
    labelShowBg: { type: Boolean, default: true },
    labelBgStyle: { default: () => ({}) },
    labelBgPadding: { default: () => [2, 4] },
    labelBgBorderRadius: { default: 2 }
  },
  setup(__props) {
    const box = ref({ x: 0, y: 0, width: 0, height: 0 });
    const el = ref(null);
    const transform = computed(() => `translate(${__props.x - box.value.width / 2} ${__props.y - box.value.height / 2})`);
    onMounted(getBox);
    watch([() => __props.x, () => __props.y, el, () => __props.label], getBox);
    function getBox() {
      if (!el.value) {
        return;
      }
      const nextBox = el.value.getBBox();
      if (nextBox.width !== box.value.width || nextBox.height !== box.value.height) {
        box.value = nextBox;
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("g", {
        transform: transform.value,
        class: "vue-flow__edge-textwrapper"
      }, [
        _ctx.labelShowBg ? (openBlock(), createElementBlock("rect", {
          key: 0,
          class: "vue-flow__edge-textbg",
          width: `${box.value.width + 2 * _ctx.labelBgPadding[0]}px`,
          height: `${box.value.height + 2 * _ctx.labelBgPadding[1]}px`,
          x: -_ctx.labelBgPadding[0],
          y: -_ctx.labelBgPadding[1],
          style: normalizeStyle(_ctx.labelBgStyle),
          rx: _ctx.labelBgBorderRadius,
          ry: _ctx.labelBgBorderRadius
        }, null, 12, _hoisted_2$2$1)) : createCommentVNode("", true),
        createBaseVNode("text", mergeProps(_ctx.$attrs, {
          ref_key: "el",
          ref: el,
          class: "vue-flow__edge-text",
          y: box.value.height / 2,
          dy: "0.3em",
          style: _ctx.labelStyle
        }), [
          renderSlot(_ctx.$slots, "default", {}, () => [
            typeof _ctx.label !== "string" ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.label), { key: 0 })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(_ctx.label), 1)
            ], 64))
          ])
        ], 16, _hoisted_3$1$1)
      ], 8, _hoisted_1$8$1);
    };
  }
});
const _hoisted_1$7$1 = ["id", "d", "marker-end", "marker-start"];
const _hoisted_2$1$1 = ["d", "stroke-width"];
const __default__$d = {
  name: "BaseEdge",
  inheritAttrs: false,
  compatConfig: { MODE: 3 }
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  ...__default__$d,
  props: {
    id: {},
    labelX: {},
    labelY: {},
    path: {},
    label: {},
    markerStart: {},
    markerEnd: {},
    interactionWidth: { default: 20 },
    labelStyle: {},
    labelShowBg: { type: Boolean },
    labelBgStyle: {},
    labelBgPadding: {},
    labelBgBorderRadius: {}
  },
  setup(__props, { expose: __expose }) {
    const pathEl = ref(null);
    const interactionEl = ref(null);
    const labelEl = ref(null);
    const attrs = useAttrs();
    __expose({
      pathEl,
      interactionEl,
      labelEl
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("path", mergeProps(unref(attrs), {
          id: _ctx.id,
          ref_key: "pathEl",
          ref: pathEl,
          d: _ctx.path,
          class: "vue-flow__edge-path",
          "marker-end": _ctx.markerEnd,
          "marker-start": _ctx.markerStart
        }), null, 16, _hoisted_1$7$1),
        _ctx.interactionWidth ? (openBlock(), createElementBlock("path", {
          key: 0,
          ref_key: "interactionEl",
          ref: interactionEl,
          fill: "none",
          d: _ctx.path,
          "stroke-width": _ctx.interactionWidth,
          "stroke-opacity": 0,
          class: "vue-flow__edge-interaction"
        }, null, 8, _hoisted_2$1$1)) : createCommentVNode("", true),
        _ctx.label && _ctx.labelX && _ctx.labelY ? (openBlock(), createBlock(_sfc_main$e, {
          key: 1,
          ref_key: "labelEl",
          ref: labelEl,
          x: _ctx.labelX,
          y: _ctx.labelY,
          label: _ctx.label,
          "label-show-bg": _ctx.labelShowBg,
          "label-bg-style": _ctx.labelBgStyle,
          "label-bg-padding": _ctx.labelBgPadding,
          "label-bg-border-radius": _ctx.labelBgBorderRadius,
          "label-style": _ctx.labelStyle
        }, null, 8, ["x", "y", "label", "label-show-bg", "label-bg-style", "label-bg-padding", "label-bg-border-radius", "label-style"])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
function getSimpleEdgeCenter({
  sourceX,
  sourceY,
  targetX,
  targetY
}) {
  const xOffset = Math.abs(targetX - sourceX) / 2;
  const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
  const yOffset = Math.abs(targetY - sourceY) / 2;
  const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;
  return [centerX, centerY, xOffset, yOffset];
}
function getBezierEdgeCenter({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourceControlX,
  sourceControlY,
  targetControlX,
  targetControlY
}) {
  const centerX = sourceX * 0.125 + sourceControlX * 0.375 + targetControlX * 0.375 + targetX * 0.125;
  const centerY = sourceY * 0.125 + sourceControlY * 0.375 + targetControlY * 0.375 + targetY * 0.125;
  const offsetX = Math.abs(centerX - sourceX);
  const offsetY = Math.abs(centerY - sourceY);
  return [centerX, centerY, offsetX, offsetY];
}
function calculateControlOffset(distance2, curvature) {
  if (distance2 >= 0) {
    return 0.5 * distance2;
  } else {
    return curvature * 25 * Math.sqrt(-distance2);
  }
}
function getControlWithCurvature({ pos, x1, y1, x2, y2, c }) {
  let ctX, ctY;
  switch (pos) {
    case Position.Left:
      ctX = x1 - calculateControlOffset(x1 - x2, c);
      ctY = y1;
      break;
    case Position.Right:
      ctX = x1 + calculateControlOffset(x2 - x1, c);
      ctY = y1;
      break;
    case Position.Top:
      ctX = x1;
      ctY = y1 - calculateControlOffset(y1 - y2, c);
      break;
    case Position.Bottom:
      ctX = x1;
      ctY = y1 + calculateControlOffset(y2 - y1, c);
      break;
  }
  return [ctX, ctY];
}
function getBezierPath(bezierPathParams) {
  const {
    sourceX,
    sourceY,
    sourcePosition = Position.Bottom,
    targetX,
    targetY,
    targetPosition = Position.Top,
    curvature = 0.25
  } = bezierPathParams;
  const [sourceControlX, sourceControlY] = getControlWithCurvature({
    pos: sourcePosition,
    x1: sourceX,
    y1: sourceY,
    x2: targetX,
    y2: targetY,
    c: curvature
  });
  const [targetControlX, targetControlY] = getControlWithCurvature({
    pos: targetPosition,
    x1: targetX,
    y1: targetY,
    x2: sourceX,
    y2: sourceY,
    c: curvature
  });
  const [labelX, labelY, offsetX, offsetY] = getBezierEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourceControlX,
    sourceControlY,
    targetControlX,
    targetControlY
  });
  return [
    `M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`,
    labelX,
    labelY,
    offsetX,
    offsetY
  ];
}
function getControl({ pos, x1, y1, x2, y2 }) {
  let ctX, ctY;
  switch (pos) {
    case Position.Left:
    case Position.Right:
      ctX = 0.5 * (x1 + x2);
      ctY = y1;
      break;
    case Position.Top:
    case Position.Bottom:
      ctX = x1;
      ctY = 0.5 * (y1 + y2);
      break;
  }
  return [ctX, ctY];
}
function getSimpleBezierPath(simpleBezierPathParams) {
  const {
    sourceX,
    sourceY,
    sourcePosition = Position.Bottom,
    targetX,
    targetY,
    targetPosition = Position.Top
  } = simpleBezierPathParams;
  const [sourceControlX, sourceControlY] = getControl({
    pos: sourcePosition,
    x1: sourceX,
    y1: sourceY,
    x2: targetX,
    y2: targetY
  });
  const [targetControlX, targetControlY] = getControl({
    pos: targetPosition,
    x1: targetX,
    y1: targetY,
    x2: sourceX,
    y2: sourceY
  });
  const [centerX, centerY, offsetX, offsetY] = getBezierEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourceControlX,
    sourceControlY,
    targetControlX,
    targetControlY
  });
  return [
    `M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`,
    centerX,
    centerY,
    offsetX,
    offsetY
  ];
}
const handleDirections = {
  [Position.Left]: { x: -1, y: 0 },
  [Position.Right]: { x: 1, y: 0 },
  [Position.Top]: { x: 0, y: -1 },
  [Position.Bottom]: { x: 0, y: 1 }
};
function getDirection({
  source,
  sourcePosition = Position.Bottom,
  target
}) {
  if (sourcePosition === Position.Left || sourcePosition === Position.Right) {
    return source.x < target.x ? { x: 1, y: 0 } : { x: -1, y: 0 };
  }
  return source.y < target.y ? { x: 0, y: 1 } : { x: 0, y: -1 };
}
function distance(a, b) {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}
function getPoints({
  source,
  sourcePosition = Position.Bottom,
  target,
  targetPosition = Position.Top,
  center,
  offset
}) {
  const sourceDir = handleDirections[sourcePosition];
  const targetDir = handleDirections[targetPosition];
  const sourceGapped = { x: source.x + sourceDir.x * offset, y: source.y + sourceDir.y * offset };
  const targetGapped = { x: target.x + targetDir.x * offset, y: target.y + targetDir.y * offset };
  const dir = getDirection({
    source: sourceGapped,
    sourcePosition,
    target: targetGapped
  });
  const dirAccessor = dir.x !== 0 ? "x" : "y";
  const currDir = dir[dirAccessor];
  let points;
  let centerX, centerY;
  const sourceGapOffset = { x: 0, y: 0 };
  const targetGapOffset = { x: 0, y: 0 };
  const [defaultCenterX, defaultCenterY, defaultOffsetX, defaultOffsetY] = getSimpleEdgeCenter({
    sourceX: source.x,
    sourceY: source.y,
    targetX: target.x,
    targetY: target.y
  });
  if (sourceDir[dirAccessor] * targetDir[dirAccessor] === -1) {
    centerX = center.x ?? defaultCenterX;
    centerY = center.y ?? defaultCenterY;
    const verticalSplit = [
      { x: centerX, y: sourceGapped.y },
      { x: centerX, y: targetGapped.y }
    ];
    const horizontalSplit = [
      { x: sourceGapped.x, y: centerY },
      { x: targetGapped.x, y: centerY }
    ];
    if (sourceDir[dirAccessor] === currDir) {
      points = dirAccessor === "x" ? verticalSplit : horizontalSplit;
    } else {
      points = dirAccessor === "x" ? horizontalSplit : verticalSplit;
    }
  } else {
    const sourceTarget = [{ x: sourceGapped.x, y: targetGapped.y }];
    const targetSource = [{ x: targetGapped.x, y: sourceGapped.y }];
    if (dirAccessor === "x") {
      points = sourceDir.x === currDir ? targetSource : sourceTarget;
    } else {
      points = sourceDir.y === currDir ? sourceTarget : targetSource;
    }
    if (sourcePosition === targetPosition) {
      const diff = Math.abs(source[dirAccessor] - target[dirAccessor]);
      if (diff <= offset) {
        const gapOffset = Math.min(offset - 1, offset - diff);
        if (sourceDir[dirAccessor] === currDir) {
          sourceGapOffset[dirAccessor] = (sourceGapped[dirAccessor] > source[dirAccessor] ? -1 : 1) * gapOffset;
        } else {
          targetGapOffset[dirAccessor] = (targetGapped[dirAccessor] > target[dirAccessor] ? -1 : 1) * gapOffset;
        }
      }
    }
    if (sourcePosition !== targetPosition) {
      const dirAccessorOpposite = dirAccessor === "x" ? "y" : "x";
      const isSameDir = sourceDir[dirAccessor] === targetDir[dirAccessorOpposite];
      const sourceGtTargetOppo = sourceGapped[dirAccessorOpposite] > targetGapped[dirAccessorOpposite];
      const sourceLtTargetOppo = sourceGapped[dirAccessorOpposite] < targetGapped[dirAccessorOpposite];
      const flipSourceTarget = sourceDir[dirAccessor] === 1 && (!isSameDir && sourceGtTargetOppo || isSameDir && sourceLtTargetOppo) || sourceDir[dirAccessor] !== 1 && (!isSameDir && sourceLtTargetOppo || isSameDir && sourceGtTargetOppo);
      if (flipSourceTarget) {
        points = dirAccessor === "x" ? sourceTarget : targetSource;
      }
    }
    const sourceGapPoint = { x: sourceGapped.x + sourceGapOffset.x, y: sourceGapped.y + sourceGapOffset.y };
    const targetGapPoint = { x: targetGapped.x + targetGapOffset.x, y: targetGapped.y + targetGapOffset.y };
    const maxXDistance = Math.max(Math.abs(sourceGapPoint.x - points[0].x), Math.abs(targetGapPoint.x - points[0].x));
    const maxYDistance = Math.max(Math.abs(sourceGapPoint.y - points[0].y), Math.abs(targetGapPoint.y - points[0].y));
    if (maxXDistance >= maxYDistance) {
      centerX = (sourceGapPoint.x + targetGapPoint.x) / 2;
      centerY = points[0].y;
    } else {
      centerX = points[0].x;
      centerY = (sourceGapPoint.y + targetGapPoint.y) / 2;
    }
  }
  const pathPoints = [
    source,
    { x: sourceGapped.x + sourceGapOffset.x, y: sourceGapped.y + sourceGapOffset.y },
    ...points,
    { x: targetGapped.x + targetGapOffset.x, y: targetGapped.y + targetGapOffset.y },
    target
  ];
  return [pathPoints, centerX, centerY, defaultOffsetX, defaultOffsetY];
}
function getBend(a, b, c, size) {
  const bendSize = Math.min(distance(a, b) / 2, distance(b, c) / 2, size);
  const { x, y } = b;
  if (a.x === x && x === c.x || a.y === y && y === c.y) {
    return `L${x} ${y}`;
  }
  if (a.y === y) {
    const xDir2 = a.x < c.x ? -1 : 1;
    const yDir2 = a.y < c.y ? 1 : -1;
    return `L ${x + bendSize * xDir2},${y}Q ${x},${y} ${x},${y + bendSize * yDir2}`;
  }
  const xDir = a.x < c.x ? 1 : -1;
  const yDir = a.y < c.y ? -1 : 1;
  return `L ${x},${y + bendSize * yDir}Q ${x},${y} ${x + bendSize * xDir},${y}`;
}
function getSmoothStepPath(smoothStepPathParams) {
  const {
    sourceX,
    sourceY,
    sourcePosition = Position.Bottom,
    targetX,
    targetY,
    targetPosition = Position.Top,
    borderRadius = 5,
    centerX,
    centerY,
    offset = 20
  } = smoothStepPathParams;
  const [points, labelX, labelY, offsetX, offsetY] = getPoints({
    source: { x: sourceX, y: sourceY },
    sourcePosition,
    target: { x: targetX, y: targetY },
    targetPosition,
    center: { x: centerX, y: centerY },
    offset
  });
  const path = points.reduce((res, p, i) => {
    let segment;
    if (i > 0 && i < points.length - 1) {
      segment = getBend(points[i - 1], p, points[i + 1], borderRadius);
    } else {
      segment = `${i === 0 ? "M" : "L"}${p.x} ${p.y}`;
    }
    res += segment;
    return res;
  }, "");
  return [path, labelX, labelY, offsetX, offsetY];
}
function getStraightPath(straightEdgeParams) {
  const { sourceX, sourceY, targetX, targetY } = straightEdgeParams;
  const [centerX, centerY, offsetX, offsetY] = getSimpleEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY
  });
  return [`M ${sourceX},${sourceY}L ${targetX},${targetY}`, centerX, centerY, offsetX, offsetY];
}
const StraightEdge = defineComponent({
  name: "StraightEdge",
  props: [
    "label",
    "labelStyle",
    "labelShowBg",
    "labelBgStyle",
    "labelBgPadding",
    "labelBgBorderRadius",
    "sourceY",
    "sourceX",
    "targetX",
    "targetY",
    "markerEnd",
    "markerStart",
    "interactionWidth"
  ],
  compatConfig: { MODE: 3 },
  setup(props, { attrs }) {
    return () => {
      const [path, labelX, labelY] = getStraightPath(props);
      return h(_sfc_main$d, {
        path,
        labelX,
        labelY,
        ...attrs,
        ...props
      });
    };
  }
});
const StraightEdge$1 = StraightEdge;
const SmoothStepEdge = defineComponent({
  name: "SmoothStepEdge",
  props: [
    "sourcePosition",
    "targetPosition",
    "label",
    "labelStyle",
    "labelShowBg",
    "labelBgStyle",
    "labelBgPadding",
    "labelBgBorderRadius",
    "sourceY",
    "sourceX",
    "targetX",
    "targetY",
    "borderRadius",
    "markerEnd",
    "markerStart",
    "interactionWidth",
    "offset"
  ],
  compatConfig: { MODE: 3 },
  setup(props, { attrs }) {
    return () => {
      const [path, labelX, labelY] = getSmoothStepPath({
        ...props,
        sourcePosition: props.sourcePosition ?? Position.Bottom,
        targetPosition: props.targetPosition ?? Position.Top
      });
      return h(_sfc_main$d, {
        path,
        labelX,
        labelY,
        ...attrs,
        ...props
      });
    };
  }
});
const SmoothStepEdge$1 = SmoothStepEdge;
const StepEdge = defineComponent({
  name: "StepEdge",
  props: [
    "sourcePosition",
    "targetPosition",
    "label",
    "labelStyle",
    "labelShowBg",
    "labelBgStyle",
    "labelBgPadding",
    "labelBgBorderRadius",
    "sourceY",
    "sourceX",
    "targetX",
    "targetY",
    "markerEnd",
    "markerStart",
    "interactionWidth"
  ],
  setup(props, { attrs }) {
    return () => h(SmoothStepEdge$1, { ...props, ...attrs, borderRadius: 0 });
  }
});
const StepEdge$1 = StepEdge;
const BezierEdge = defineComponent({
  name: "BezierEdge",
  props: [
    "sourcePosition",
    "targetPosition",
    "label",
    "labelStyle",
    "labelShowBg",
    "labelBgStyle",
    "labelBgPadding",
    "labelBgBorderRadius",
    "sourceY",
    "sourceX",
    "targetX",
    "targetY",
    "curvature",
    "markerEnd",
    "markerStart",
    "interactionWidth"
  ],
  compatConfig: { MODE: 3 },
  setup(props, { attrs }) {
    return () => {
      const [path, labelX, labelY] = getBezierPath({
        ...props,
        sourcePosition: props.sourcePosition ?? Position.Bottom,
        targetPosition: props.targetPosition ?? Position.Top
      });
      return h(_sfc_main$d, {
        path,
        labelX,
        labelY,
        ...attrs,
        ...props
      });
    };
  }
});
const BezierEdge$1 = BezierEdge;
const SimpleBezierEdge = defineComponent({
  name: "SimpleBezierEdge",
  props: [
    "sourcePosition",
    "targetPosition",
    "label",
    "labelStyle",
    "labelShowBg",
    "labelBgStyle",
    "labelBgPadding",
    "labelBgBorderRadius",
    "sourceY",
    "sourceX",
    "targetX",
    "targetY",
    "markerEnd",
    "markerStart",
    "interactionWidth"
  ],
  compatConfig: { MODE: 3 },
  setup(props, { attrs }) {
    return () => {
      const [path, labelX, labelY] = getSimpleBezierPath({
        ...props,
        sourcePosition: props.sourcePosition ?? Position.Bottom,
        targetPosition: props.targetPosition ?? Position.Top
      });
      return h(_sfc_main$d, {
        path,
        labelX,
        labelY,
        ...attrs,
        ...props
      });
    };
  }
});
const SimpleBezierEdge$1 = SimpleBezierEdge;
const defaultNodeTypes = {
  input: InputNode$1,
  default: DefaultNode$1,
  output: OutputNode$1
};
const defaultEdgeTypes = {
  default: BezierEdge$1,
  straight: StraightEdge$1,
  step: StepEdge$1,
  smoothstep: SmoothStepEdge$1,
  simplebezier: SimpleBezierEdge$1
};
function useGetters(state, nodeLookup, edgeLookup) {
  const getNode = computed(() => (id2) => nodeLookup.value.get(id2));
  const getEdge = computed(() => (id2) => edgeLookup.value.get(id2));
  const getEdgeTypes = computed(() => {
    const edgeTypes = {
      ...defaultEdgeTypes,
      ...state.edgeTypes
    };
    const keys = Object.keys(edgeTypes);
    for (const e of state.edges) {
      e.type && !keys.includes(e.type) && (edgeTypes[e.type] = e.type);
    }
    return edgeTypes;
  });
  const getNodeTypes = computed(() => {
    const nodeTypes = {
      ...defaultNodeTypes,
      ...state.nodeTypes
    };
    const keys = Object.keys(nodeTypes);
    for (const n of state.nodes) {
      n.type && !keys.includes(n.type) && (nodeTypes[n.type] = n.type);
    }
    return nodeTypes;
  });
  const getNodes = computed(() => {
    if (state.onlyRenderVisibleElements) {
      return getNodesInside(
        state.nodes,
        {
          x: 0,
          y: 0,
          width: state.dimensions.width,
          height: state.dimensions.height
        },
        state.viewport,
        true
      );
    }
    return state.nodes;
  });
  const getEdges = computed(() => {
    if (state.onlyRenderVisibleElements) {
      const visibleEdges = [];
      for (const edge of state.edges) {
        const source = nodeLookup.value.get(edge.source);
        const target = nodeLookup.value.get(edge.target);
        if (isEdgeVisible({
          sourcePos: source.computedPosition || { x: 0, y: 0 },
          targetPos: target.computedPosition || { x: 0, y: 0 },
          sourceWidth: source.dimensions.width,
          sourceHeight: source.dimensions.height,
          targetWidth: target.dimensions.width,
          targetHeight: target.dimensions.height,
          width: state.dimensions.width,
          height: state.dimensions.height,
          viewport: state.viewport
        })) {
          visibleEdges.push(edge);
        }
      }
      return visibleEdges;
    }
    return state.edges;
  });
  const getElements = computed(() => [...getNodes.value, ...getEdges.value]);
  const getSelectedNodes = computed(() => {
    const selectedNodes = [];
    for (const node of state.nodes) {
      if (node.selected) {
        selectedNodes.push(node);
      }
    }
    return selectedNodes;
  });
  const getSelectedEdges = computed(() => {
    const selectedEdges = [];
    for (const edge of state.edges) {
      if (edge.selected) {
        selectedEdges.push(edge);
      }
    }
    return selectedEdges;
  });
  const getSelectedElements = computed(() => [
    ...getSelectedNodes.value,
    ...getSelectedEdges.value
  ]);
  const getNodesInitialized = computed(() => {
    const initializedNodes = [];
    for (const node of state.nodes) {
      if (!!node.dimensions.width && !!node.dimensions.height && node.handleBounds !== void 0) {
        initializedNodes.push(node);
      }
    }
    return initializedNodes;
  });
  const areNodesInitialized = computed(
    () => getNodes.value.length > 0 && getNodesInitialized.value.length === getNodes.value.length
  );
  return {
    getNode,
    getEdge,
    getElements,
    getEdgeTypes,
    getNodeTypes,
    getEdges,
    getNodes,
    getSelectedElements,
    getSelectedNodes,
    getSelectedEdges,
    getNodesInitialized,
    areNodesInitialized
  };
}
class Storage {
  constructor() {
    this.currentId = 0;
    this.flows = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    var _a;
    const vueApp = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app;
    const existingInstance = (vueApp == null ? void 0 : vueApp.config.globalProperties.$vueFlowStorage) ?? Storage.instance;
    Storage.instance = existingInstance ?? new Storage();
    if (vueApp) {
      vueApp.config.globalProperties.$vueFlowStorage = Storage.instance;
    }
    return Storage.instance;
  }
  set(id2, flow) {
    return this.flows.set(id2, flow);
  }
  get(id2) {
    return this.flows.get(id2);
  }
  remove(id2) {
    return this.flows.delete(id2);
  }
  create(id2, preloadedState) {
    const state = useState();
    const reactiveState = reactive(state);
    const hooksOn = {};
    for (const [n, h2] of Object.entries(reactiveState.hooks)) {
      const name = `on${n.charAt(0).toUpperCase() + n.slice(1)}`;
      hooksOn[name] = h2.on;
    }
    const emits = {};
    for (const [n, h2] of Object.entries(reactiveState.hooks)) {
      emits[n] = h2.trigger;
    }
    const nodeLookup = computed(() => {
      const nodesMap = /* @__PURE__ */ new Map();
      for (const node of reactiveState.nodes) {
        nodesMap.set(node.id, node);
      }
      return nodesMap;
    });
    const edgeLookup = computed(() => {
      const edgesMap = /* @__PURE__ */ new Map();
      for (const edge of reactiveState.edges) {
        edgesMap.set(edge.id, edge);
      }
      return edgesMap;
    });
    const getters = useGetters(reactiveState, nodeLookup, edgeLookup);
    const actions = useActions(reactiveState, nodeLookup, edgeLookup);
    actions.setState({ ...reactiveState, ...preloadedState });
    const flow = {
      ...hooksOn,
      ...getters,
      ...actions,
      ...toRefs(reactiveState),
      nodeLookup,
      edgeLookup,
      emits,
      id: id2,
      vueFlowVersion: "1.46.5",
      $destroy: () => {
        this.remove(id2);
      }
    };
    this.set(id2, flow);
    return flow;
  }
  getId() {
    return `vue-flow-${this.currentId++}`;
  }
}
function useVueFlow(idOrOpts) {
  const storage = Storage.getInstance();
  const scope = getCurrentScope();
  const isOptsObj = typeof idOrOpts === "object";
  const options = isOptsObj ? idOrOpts : { id: idOrOpts };
  const id2 = options.id;
  const vueFlowId = id2 ?? (scope == null ? void 0 : scope.vueFlowId);
  let vueFlow;
  if (scope) {
    const injectedState = inject(VueFlow, null);
    if (typeof injectedState !== "undefined" && injectedState !== null && (!vueFlowId || injectedState.id === vueFlowId)) {
      vueFlow = injectedState;
    }
  }
  if (!vueFlow) {
    if (vueFlowId) {
      vueFlow = storage.get(vueFlowId);
    }
  }
  if (!vueFlow || vueFlowId && vueFlow.id !== vueFlowId) {
    const name = id2 ?? storage.getId();
    const state = storage.create(name, options);
    vueFlow = state;
    const vfScope = scope ?? effectScope(true);
    vfScope.run(() => {
      watch(
        state.applyDefault,
        (shouldApplyDefault, __, onCleanup) => {
          const nodesChangeHandler = (changes) => {
            state.applyNodeChanges(changes);
          };
          const edgesChangeHandler = (changes) => {
            state.applyEdgeChanges(changes);
          };
          if (shouldApplyDefault) {
            state.onNodesChange(nodesChangeHandler);
            state.onEdgesChange(edgesChangeHandler);
          } else {
            state.hooks.value.nodesChange.off(nodesChangeHandler);
            state.hooks.value.edgesChange.off(edgesChangeHandler);
          }
          onCleanup(() => {
            state.hooks.value.nodesChange.off(nodesChangeHandler);
            state.hooks.value.edgesChange.off(edgesChangeHandler);
          });
        },
        { immediate: true }
      );
      tryOnScopeDispose(() => {
        if (vueFlow) {
          const storedInstance = storage.get(vueFlow.id);
          if (storedInstance) {
            storedInstance.$destroy();
          } else {
            warn(`No store instance found for id ${vueFlow.id} in storage.`);
          }
        }
      });
    });
  } else {
    if (isOptsObj) {
      vueFlow.setState(options);
    }
  }
  if (scope) {
    provide(VueFlow, vueFlow);
    scope.vueFlowId = vueFlow.id;
  }
  if (isOptsObj) {
    const instance = getCurrentInstance();
    if ((instance == null ? void 0 : instance.type.name) !== "VueFlow") {
      vueFlow.emits.error(new VueFlowError(ErrorCode.USEVUEFLOW_OPTIONS));
    }
  }
  return vueFlow;
}
function useResizeHandler(viewportEl) {
  const { emits, dimensions } = useVueFlow();
  let resizeObserver;
  onMounted(() => {
    const updateDimensions = () => {
      var _a, _b;
      if (!viewportEl.value || !(((_b = (_a = viewportEl.value).checkVisibility) == null ? void 0 : _b.call(_a)) ?? true)) {
        return;
      }
      const size = getDimensions(viewportEl.value);
      if (size.width === 0 || size.height === 0) {
        emits.error(new VueFlowError(ErrorCode.MISSING_VIEWPORT_DIMENSIONS));
      }
      dimensions.value = { width: size.width || 500, height: size.height || 500 };
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    if (viewportEl.value) {
      resizeObserver = new ResizeObserver(() => updateDimensions());
      resizeObserver.observe(viewportEl.value);
    }
    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateDimensions);
      if (resizeObserver && viewportEl.value) {
        resizeObserver.unobserve(viewportEl.value);
      }
    });
  });
}
const __default__$c = {
  name: "UserSelection",
  compatConfig: { MODE: 3 }
};
const _sfc_main$c$1 = /* @__PURE__ */ defineComponent({
  ...__default__$c,
  props: {
    userSelectionRect: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "vue-flow__selection vue-flow__container",
        style: normalizeStyle({
          width: `${_ctx.userSelectionRect.width}px`,
          height: `${_ctx.userSelectionRect.height}px`,
          transform: `translate(${_ctx.userSelectionRect.x}px, ${_ctx.userSelectionRect.y}px)`
        })
      }, null, 4);
    };
  }
});
const _hoisted_1$6$1 = ["tabIndex"];
const __default__$b = {
  name: "NodesSelection",
  compatConfig: { MODE: 3 }
};
const _sfc_main$b$1 = /* @__PURE__ */ defineComponent({
  ...__default__$b,
  setup(__props) {
    const { emits, viewport, getSelectedNodes, noPanClassName, disableKeyboardA11y, userSelectionActive } = useVueFlow();
    const updatePositions = useUpdateNodePositions();
    const el = ref(null);
    const dragging = useDrag({
      el,
      onStart(args) {
        emits.selectionDragStart(args);
        emits.nodeDragStart(args);
      },
      onDrag(args) {
        emits.selectionDrag(args);
        emits.nodeDrag(args);
      },
      onStop(args) {
        emits.selectionDragStop(args);
        emits.nodeDragStop(args);
      }
    });
    onMounted(() => {
      var _a;
      if (!disableKeyboardA11y.value) {
        (_a = el.value) == null ? void 0 : _a.focus({ preventScroll: true });
      }
    });
    const selectedNodesBBox = computed(() => getRectOfNodes(getSelectedNodes.value));
    const innerStyle = computed(() => ({
      width: `${selectedNodesBBox.value.width}px`,
      height: `${selectedNodesBBox.value.height}px`,
      top: `${selectedNodesBBox.value.y}px`,
      left: `${selectedNodesBBox.value.x}px`
    }));
    function onContextMenu(event) {
      emits.selectionContextMenu({ event, nodes: getSelectedNodes.value });
    }
    function onKeyDown(event) {
      if (disableKeyboardA11y) {
        return;
      }
      if (arrowKeyDiffs[event.key]) {
        event.preventDefault();
        updatePositions(
          {
            x: arrowKeyDiffs[event.key].x,
            y: arrowKeyDiffs[event.key].y
          },
          event.shiftKey
        );
      }
    }
    return (_ctx, _cache) => {
      return !unref(userSelectionActive) && selectedNodesBBox.value.width && selectedNodesBBox.value.height ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["vue-flow__nodesselection vue-flow__container", unref(noPanClassName)]),
        style: normalizeStyle({ transform: `translate(${unref(viewport).x}px,${unref(viewport).y}px) scale(${unref(viewport).zoom})` })
      }, [
        createBaseVNode("div", {
          ref_key: "el",
          ref: el,
          class: normalizeClass([{ dragging: unref(dragging) }, "vue-flow__nodesselection-rect"]),
          style: normalizeStyle(innerStyle.value),
          tabIndex: unref(disableKeyboardA11y) ? void 0 : -1,
          onContextmenu: onContextMenu,
          onKeydown: onKeyDown
        }, null, 46, _hoisted_1$6$1)
      ], 6)) : createCommentVNode("", true);
    };
  }
});
function getMousePosition(event, containerBounds) {
  return {
    x: event.clientX - containerBounds.left,
    y: event.clientY - containerBounds.top
  };
}
const __default__$a = {
  name: "Pane",
  compatConfig: { MODE: 3 }
};
const _sfc_main$a$1 = /* @__PURE__ */ defineComponent({
  ...__default__$a,
  props: {
    isSelecting: { type: Boolean },
    selectionKeyPressed: { type: Boolean }
  },
  setup(__props) {
    const {
      vueFlowRef,
      nodes,
      viewport,
      emits,
      userSelectionActive,
      removeSelectedElements,
      userSelectionRect,
      elementsSelectable,
      nodesSelectionActive,
      getSelectedEdges,
      getSelectedNodes,
      removeNodes,
      removeEdges,
      selectionMode,
      deleteKeyCode,
      multiSelectionKeyCode,
      multiSelectionActive,
      edgeLookup,
      nodeLookup,
      connectionLookup,
      defaultEdgeOptions,
      connectionStartHandle
    } = useVueFlow();
    const container = ref(null);
    const selectedNodeIds = ref(/* @__PURE__ */ new Set());
    const selectedEdgeIds = ref(/* @__PURE__ */ new Set());
    const containerBounds = ref();
    const hasActiveSelection = toRef(() => elementsSelectable.value && (__props.isSelecting || userSelectionActive.value));
    const connectionInProgress = toRef(() => connectionStartHandle.value !== null);
    let selectionInProgress = false;
    let selectionStarted = false;
    const deleteKeyPressed = useKeyPress(deleteKeyCode, { actInsideInputWithModifier: false });
    const multiSelectKeyPressed = useKeyPress(multiSelectionKeyCode);
    watch(deleteKeyPressed, (isKeyPressed) => {
      if (!isKeyPressed) {
        return;
      }
      removeNodes(getSelectedNodes.value);
      removeEdges(getSelectedEdges.value);
      nodesSelectionActive.value = false;
    });
    watch(multiSelectKeyPressed, (isKeyPressed) => {
      multiSelectionActive.value = isKeyPressed;
    });
    function wrapHandler(handler, containerRef) {
      return (event) => {
        if (event.target !== containerRef) {
          return;
        }
        handler == null ? void 0 : handler(event);
      };
    }
    function onClick(event) {
      if (selectionInProgress || connectionInProgress.value) {
        selectionInProgress = false;
        return;
      }
      emits.paneClick(event);
      removeSelectedElements();
      nodesSelectionActive.value = false;
    }
    function onContextMenu(event) {
      event.preventDefault();
      event.stopPropagation();
      emits.paneContextMenu(event);
    }
    function onWheel(event) {
      emits.paneScroll(event);
    }
    function onPointerDown(event) {
      var _a, _b, _c;
      containerBounds.value = (_a = vueFlowRef.value) == null ? void 0 : _a.getBoundingClientRect();
      if (!elementsSelectable.value || !__props.isSelecting || event.button !== 0 || event.target !== container.value || !containerBounds.value) {
        return;
      }
      (_c = (_b = event.target) == null ? void 0 : _b.setPointerCapture) == null ? void 0 : _c.call(_b, event.pointerId);
      const { x, y } = getMousePosition(event, containerBounds.value);
      selectionStarted = true;
      selectionInProgress = false;
      removeSelectedElements();
      userSelectionRect.value = {
        width: 0,
        height: 0,
        startX: x,
        startY: y,
        x,
        y
      };
      emits.selectionStart(event);
    }
    function onPointerMove(event) {
      var _a;
      if (!containerBounds.value || !userSelectionRect.value) {
        return;
      }
      selectionInProgress = true;
      const { x: mouseX, y: mouseY } = getEventPosition(event, containerBounds.value);
      const { startX = 0, startY = 0 } = userSelectionRect.value;
      const nextUserSelectRect = {
        startX,
        startY,
        x: mouseX < startX ? mouseX : startX,
        y: mouseY < startY ? mouseY : startY,
        width: Math.abs(mouseX - startX),
        height: Math.abs(mouseY - startY)
      };
      const prevSelectedNodeIds = selectedNodeIds.value;
      const prevSelectedEdgeIds = selectedEdgeIds.value;
      selectedNodeIds.value = new Set(
        getNodesInside(nodes.value, nextUserSelectRect, viewport.value, selectionMode.value === SelectionMode.Partial, true).map(
          (node) => node.id
        )
      );
      selectedEdgeIds.value = /* @__PURE__ */ new Set();
      const edgesSelectable = ((_a = defaultEdgeOptions.value) == null ? void 0 : _a.selectable) ?? true;
      for (const nodeId of selectedNodeIds.value) {
        const connections = connectionLookup.value.get(nodeId);
        if (!connections) {
          continue;
        }
        for (const { edgeId } of connections.values()) {
          const edge = edgeLookup.value.get(edgeId);
          if (edge && (edge.selectable ?? edgesSelectable)) {
            selectedEdgeIds.value.add(edgeId);
          }
        }
      }
      if (!areSetsEqual(prevSelectedNodeIds, selectedNodeIds.value)) {
        const changes = getSelectionChanges(nodeLookup.value, selectedNodeIds.value, true);
        emits.nodesChange(changes);
      }
      if (!areSetsEqual(prevSelectedEdgeIds, selectedEdgeIds.value)) {
        const changes = getSelectionChanges(edgeLookup.value, selectedEdgeIds.value);
        emits.edgesChange(changes);
      }
      userSelectionRect.value = nextUserSelectRect;
      userSelectionActive.value = true;
      nodesSelectionActive.value = false;
    }
    function onPointerUp(event) {
      var _a;
      if (event.button !== 0 || !selectionStarted) {
        return;
      }
      (_a = event.target) == null ? void 0 : _a.releasePointerCapture(event.pointerId);
      if (!userSelectionActive.value && userSelectionRect.value && event.target === container.value) {
        onClick(event);
      }
      userSelectionActive.value = false;
      userSelectionRect.value = null;
      nodesSelectionActive.value = selectedNodeIds.value.size > 0;
      emits.selectionEnd(event);
      if (__props.selectionKeyPressed) {
        selectionInProgress = false;
      }
      selectionStarted = false;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "container",
        ref: container,
        class: normalizeClass(["vue-flow__pane vue-flow__container", { selection: _ctx.isSelecting }]),
        onClick: _cache[0] || (_cache[0] = (event) => hasActiveSelection.value ? void 0 : wrapHandler(onClick, container.value)(event)),
        onContextmenu: _cache[1] || (_cache[1] = ($event) => wrapHandler(onContextMenu, container.value)($event)),
        onWheelPassive: _cache[2] || (_cache[2] = ($event) => wrapHandler(onWheel, container.value)($event)),
        onPointerenter: _cache[3] || (_cache[3] = (event) => hasActiveSelection.value ? void 0 : unref(emits).paneMouseEnter(event)),
        onPointerdown: _cache[4] || (_cache[4] = (event) => hasActiveSelection.value ? onPointerDown(event) : unref(emits).paneMouseMove(event)),
        onPointermove: _cache[5] || (_cache[5] = (event) => hasActiveSelection.value ? onPointerMove(event) : unref(emits).paneMouseMove(event)),
        onPointerup: _cache[6] || (_cache[6] = (event) => hasActiveSelection.value ? onPointerUp(event) : void 0),
        onPointerleave: _cache[7] || (_cache[7] = ($event) => unref(emits).paneMouseLeave($event))
      }, [
        renderSlot(_ctx.$slots, "default"),
        unref(userSelectionActive) && unref(userSelectionRect) ? (openBlock(), createBlock(_sfc_main$c$1, {
          key: 0,
          "user-selection-rect": unref(userSelectionRect)
        }, null, 8, ["user-selection-rect"])) : createCommentVNode("", true),
        unref(nodesSelectionActive) && unref(getSelectedNodes).length ? (openBlock(), createBlock(_sfc_main$b$1, { key: 1 })) : createCommentVNode("", true)
      ], 34);
    };
  }
});
const __default__$9 = {
  name: "Transform",
  compatConfig: { MODE: 3 }
};
const _sfc_main$9$1 = /* @__PURE__ */ defineComponent({
  ...__default__$9,
  setup(__props) {
    const { viewport, fitViewOnInit, fitViewOnInitDone } = useVueFlow();
    const isHidden = computed(() => {
      if (fitViewOnInit.value) {
        return !fitViewOnInitDone.value;
      }
      return false;
    });
    const transform = computed(() => `translate(${viewport.value.x}px,${viewport.value.y}px) scale(${viewport.value.zoom})`);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "vue-flow__transformationpane vue-flow__container",
        style: normalizeStyle({ transform: transform.value, opacity: isHidden.value ? 0 : void 0 })
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 4);
    };
  }
});
const __default__$8 = {
  name: "Viewport",
  compatConfig: { MODE: 3 }
};
const _sfc_main$8$1 = /* @__PURE__ */ defineComponent({
  ...__default__$8,
  setup(__props) {
    const {
      minZoom,
      maxZoom,
      defaultViewport,
      translateExtent,
      zoomActivationKeyCode,
      selectionKeyCode,
      panActivationKeyCode,
      panOnScroll,
      panOnScrollMode,
      panOnScrollSpeed,
      panOnDrag,
      zoomOnDoubleClick,
      zoomOnPinch,
      zoomOnScroll,
      preventScrolling,
      noWheelClassName,
      noPanClassName,
      emits,
      connectionStartHandle,
      userSelectionActive,
      paneDragging,
      d3Zoom: storeD3Zoom,
      d3Selection: storeD3Selection,
      d3ZoomHandler: storeD3ZoomHandler,
      viewport,
      viewportRef,
      paneClickDistance
    } = useVueFlow();
    useResizeHandler(viewportRef);
    const isZoomingOrPanning = shallowRef(false);
    const isPanScrolling = shallowRef(false);
    let panScrollTimeout = null;
    let zoomedWithRightMouseButton = false;
    let mouseButton = 0;
    let prevTransform = {
      x: 0,
      y: 0,
      zoom: 0
    };
    const panKeyPressed = useKeyPress(panActivationKeyCode);
    const selectionKeyPressed = useKeyPress(selectionKeyCode);
    const zoomKeyPressed = useKeyPress(zoomActivationKeyCode);
    const shouldPanOnDrag = toRef(
      () => (!selectionKeyPressed.value || selectionKeyPressed.value && selectionKeyCode.value === true) && (panKeyPressed.value || panOnDrag.value)
    );
    const shouldPanOnScroll = toRef(() => panKeyPressed.value || panOnScroll.value);
    const isSelecting = toRef(() => selectionKeyPressed.value || selectionKeyCode.value === true && shouldPanOnDrag.value !== true);
    const connectionInProgress = toRef(() => connectionStartHandle.value !== null);
    onMounted(() => {
      if (!viewportRef.value) {
        warn("Viewport element is missing");
        return;
      }
      const viewportElement = viewportRef.value;
      const bbox = viewportElement.getBoundingClientRect();
      const d3Zoom = zoom().clickDistance(paneClickDistance.value).scaleExtent([minZoom.value, maxZoom.value]).translateExtent(translateExtent.value);
      const d3Selection = select(viewportElement).call(d3Zoom);
      const d3ZoomHandler = d3Selection.on("wheel.zoom");
      const updatedTransform = identity.translate(defaultViewport.value.x ?? 0, defaultViewport.value.y ?? 0).scale(clamp(defaultViewport.value.zoom ?? 1, minZoom.value, maxZoom.value));
      const extent = [
        [0, 0],
        [bbox.width, bbox.height]
      ];
      const constrainedTransform = d3Zoom.constrain()(updatedTransform, extent, translateExtent.value);
      d3Zoom.transform(d3Selection, constrainedTransform);
      d3Zoom.wheelDelta(wheelDelta);
      storeD3Zoom.value = d3Zoom;
      storeD3Selection.value = d3Selection;
      storeD3ZoomHandler.value = d3ZoomHandler;
      viewport.value = { x: constrainedTransform.x, y: constrainedTransform.y, zoom: constrainedTransform.k };
      d3Zoom.on("start", (event) => {
        var _a;
        if (!event.sourceEvent) {
          return null;
        }
        mouseButton = event.sourceEvent.button;
        isZoomingOrPanning.value = true;
        const flowTransform = eventToFlowTransform(event.transform);
        if (((_a = event.sourceEvent) == null ? void 0 : _a.type) === "mousedown") {
          paneDragging.value = true;
        }
        prevTransform = flowTransform;
        emits.viewportChangeStart(flowTransform);
        emits.moveStart({ event, flowTransform });
      });
      d3Zoom.on("end", (event) => {
        if (!event.sourceEvent) {
          return null;
        }
        isZoomingOrPanning.value = false;
        paneDragging.value = false;
        if (isRightClickPan(shouldPanOnDrag.value, mouseButton ?? 0) && !zoomedWithRightMouseButton) {
          emits.paneContextMenu(event.sourceEvent);
        }
        zoomedWithRightMouseButton = false;
        if (viewChanged(prevTransform, event.transform)) {
          const flowTransform = eventToFlowTransform(event.transform);
          prevTransform = flowTransform;
          emits.viewportChangeEnd(flowTransform);
          emits.moveEnd({ event, flowTransform });
        }
      });
      d3Zoom.filter((event) => {
        var _a;
        const zoomScroll = zoomKeyPressed.value || zoomOnScroll.value;
        const pinchZoom = zoomOnPinch.value && event.ctrlKey;
        const eventButton = event.button;
        const isWheelEvent = event.type === "wheel";
        if (eventButton === 1 && event.type === "mousedown" && (isWrappedWithClass(event, "vue-flow__node") || isWrappedWithClass(event, "vue-flow__edge"))) {
          return true;
        }
        if (!shouldPanOnDrag.value && !zoomScroll && !shouldPanOnScroll.value && !zoomOnDoubleClick.value && !zoomOnPinch.value) {
          return false;
        }
        if (userSelectionActive.value) {
          return false;
        }
        if (connectionInProgress.value && !isWheelEvent) {
          return false;
        }
        if (!zoomOnDoubleClick.value && event.type === "dblclick") {
          return false;
        }
        if (isWrappedWithClass(event, noWheelClassName.value) && isWheelEvent) {
          return false;
        }
        if (isWrappedWithClass(event, noPanClassName.value) && (!isWheelEvent || shouldPanOnScroll.value && isWheelEvent && !zoomKeyPressed.value)) {
          return false;
        }
        if (!zoomOnPinch.value && event.ctrlKey && isWheelEvent) {
          return false;
        }
        if (!zoomScroll && !shouldPanOnScroll.value && !pinchZoom && isWheelEvent) {
          return false;
        }
        if (!zoomOnPinch && event.type === "touchstart" && ((_a = event.touches) == null ? void 0 : _a.length) > 1) {
          event.preventDefault();
          return false;
        }
        if (!shouldPanOnDrag.value && (event.type === "mousedown" || event.type === "touchstart")) {
          return false;
        }
        if (selectionKeyCode.value === true && Array.isArray(panOnDrag.value) && panOnDrag.value.includes(0) && eventButton === 0) {
          return false;
        }
        if (Array.isArray(panOnDrag.value) && !panOnDrag.value.includes(eventButton) && (event.type === "mousedown" || event.type === "touchstart")) {
          return false;
        }
        const buttonAllowed = Array.isArray(panOnDrag.value) && panOnDrag.value.includes(eventButton) || selectionKeyCode.value === true && Array.isArray(panOnDrag.value) && !panOnDrag.value.includes(0) || !eventButton || eventButton <= 1;
        return (!event.ctrlKey || panKeyPressed.value || isWheelEvent) && buttonAllowed;
      });
      watch(
        [userSelectionActive, shouldPanOnDrag],
        () => {
          if (userSelectionActive.value && !isZoomingOrPanning.value) {
            d3Zoom.on("zoom", null);
          } else if (!userSelectionActive.value) {
            d3Zoom.on("zoom", (event) => {
              viewport.value = { x: event.transform.x, y: event.transform.y, zoom: event.transform.k };
              const flowTransform = eventToFlowTransform(event.transform);
              zoomedWithRightMouseButton = isRightClickPan(shouldPanOnDrag.value, mouseButton ?? 0);
              emits.viewportChange(flowTransform);
              emits.move({ event, flowTransform });
            });
          }
        },
        { immediate: true }
      );
      watch(
        [userSelectionActive, shouldPanOnScroll, panOnScrollMode, zoomKeyPressed, zoomOnPinch, preventScrolling, noWheelClassName],
        () => {
          if (shouldPanOnScroll.value && !zoomKeyPressed.value && !userSelectionActive.value) {
            d3Selection.on(
              "wheel.zoom",
              (event) => {
                if (isWrappedWithClass(event, noWheelClassName.value)) {
                  return false;
                }
                const zoomScroll = zoomKeyPressed.value || zoomOnScroll.value;
                const pinchZoom = zoomOnPinch.value && event.ctrlKey;
                const scrollEventEnabled = !preventScrolling.value || shouldPanOnScroll.value || zoomScroll || pinchZoom;
                if (!scrollEventEnabled) {
                  return false;
                }
                event.preventDefault();
                event.stopImmediatePropagation();
                const currentZoom = d3Selection.property("__zoom").k || 1;
                const _isMacOs = isMacOs();
                if (!panKeyPressed.value && event.ctrlKey && zoomOnPinch.value && _isMacOs) {
                  const point = pointer(event);
                  const pinchDelta = wheelDelta(event);
                  const zoom2 = currentZoom * 2 ** pinchDelta;
                  d3Zoom.scaleTo(d3Selection, zoom2, point, event);
                  return;
                }
                const deltaNormalize = event.deltaMode === 1 ? 20 : 1;
                let deltaX = panOnScrollMode.value === PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize;
                let deltaY = panOnScrollMode.value === PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize;
                if (!_isMacOs && event.shiftKey && panOnScrollMode.value !== PanOnScrollMode.Vertical && !deltaX && deltaY) {
                  deltaX = deltaY;
                  deltaY = 0;
                }
                d3Zoom.translateBy(
                  d3Selection,
                  -(deltaX / currentZoom) * panOnScrollSpeed.value,
                  -(deltaY / currentZoom) * panOnScrollSpeed.value
                );
                const nextViewport = eventToFlowTransform(d3Selection.property("__zoom"));
                if (panScrollTimeout) {
                  clearTimeout(panScrollTimeout);
                }
                if (!isPanScrolling.value) {
                  isPanScrolling.value = true;
                  emits.moveStart({ event, flowTransform: nextViewport });
                  emits.viewportChangeStart(nextViewport);
                } else {
                  emits.move({ event, flowTransform: nextViewport });
                  emits.viewportChange(nextViewport);
                  panScrollTimeout = setTimeout(() => {
                    emits.moveEnd({ event, flowTransform: nextViewport });
                    emits.viewportChangeEnd(nextViewport);
                    isPanScrolling.value = false;
                  }, 150);
                }
              },
              { passive: false }
            );
          } else if (typeof d3ZoomHandler !== "undefined") {
            d3Selection.on(
              "wheel.zoom",
              function(event, d) {
                const invalidEvent = !preventScrolling.value && event.type === "wheel" && !event.ctrlKey;
                const zoomScroll = zoomKeyPressed.value || zoomOnScroll.value;
                const pinchZoom = zoomOnPinch.value && event.ctrlKey;
                const scrollEventsDisabled = !zoomScroll && !panOnScroll.value && !pinchZoom && event.type === "wheel";
                if (scrollEventsDisabled || invalidEvent || isWrappedWithClass(event, noWheelClassName.value)) {
                  return null;
                }
                event.preventDefault();
                d3ZoomHandler.call(this, event, d);
              },
              { passive: false }
            );
          }
        },
        { immediate: true }
      );
    });
    function isRightClickPan(pan, usedButton) {
      return usedButton === 2 && Array.isArray(pan) && pan.includes(2);
    }
    function viewChanged(prevViewport, eventTransform) {
      return prevViewport.x !== eventTransform.x && !Number.isNaN(eventTransform.x) || prevViewport.y !== eventTransform.y && !Number.isNaN(eventTransform.y) || prevViewport.zoom !== eventTransform.k && !Number.isNaN(eventTransform.k);
    }
    function eventToFlowTransform(eventTransform) {
      return {
        x: eventTransform.x,
        y: eventTransform.y,
        zoom: eventTransform.k
      };
    }
    function isWrappedWithClass(event, className) {
      return event.target.closest(`.${className}`);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "viewportRef",
        ref: viewportRef,
        class: "vue-flow__viewport vue-flow__container"
      }, [
        createVNode(_sfc_main$a$1, {
          "is-selecting": isSelecting.value,
          "selection-key-pressed": unref(selectionKeyPressed),
          class: normalizeClass({
            connecting: connectionInProgress.value,
            dragging: unref(paneDragging),
            draggable: unref(panOnDrag) === true || Array.isArray(unref(panOnDrag)) && unref(panOnDrag).includes(0)
          })
        }, {
          default: withCtx(() => [
            createVNode(_sfc_main$9$1, null, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
            })
          ]),
          _: 3
        }, 8, ["is-selecting", "selection-key-pressed", "class"])
      ], 512);
    };
  }
});
const _hoisted_1$5$1 = ["id"];
const _hoisted_2$5 = ["id"];
const _hoisted_3$5 = ["id"];
const __default__$7 = {
  name: "A11yDescriptions",
  compatConfig: { MODE: 3 }
};
const _sfc_main$7$1 = /* @__PURE__ */ defineComponent({
  ...__default__$7,
  setup(__props) {
    const { id: id2, disableKeyboardA11y, ariaLiveMessage } = useVueFlow();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          id: `${unref(ARIA_NODE_DESC_KEY)}-${unref(id2)}`,
          style: { "display": "none" }
        }, " Press enter or space to select a node. " + toDisplayString(!unref(disableKeyboardA11y) ? "You can then use the arrow keys to move the node around." : "") + " You can then use the arrow keys to move the node around, press delete to remove it and press escape to cancel. ", 9, _hoisted_1$5$1),
        createBaseVNode("div", {
          id: `${unref(ARIA_EDGE_DESC_KEY)}-${unref(id2)}`,
          style: { "display": "none" }
        }, " Press enter or space to select an edge. You can then press delete to remove it or press escape to cancel. ", 8, _hoisted_2$5),
        !unref(disableKeyboardA11y) ? (openBlock(), createElementBlock("div", {
          key: 0,
          id: `${unref(ARIA_LIVE_MESSAGE)}-${unref(id2)}`,
          "aria-live": "assertive",
          "aria-atomic": "true",
          style: { "position": "absolute", "width": "1px", "height": "1px", "margin": "-1px", "border": "0", "padding": "0", "overflow": "hidden", "clip": "rect(0px, 0px, 0px, 0px)", "clip-path": "inset(100%)" }
        }, toDisplayString(unref(ariaLiveMessage)), 9, _hoisted_3$5)) : createCommentVNode("", true)
      ], 64);
    };
  }
});
function useOnInitHandler() {
  const vfInstance = useVueFlow();
  watch(
    () => vfInstance.viewportHelper.value.viewportInitialized,
    (isInitialized) => {
      if (isInitialized) {
        setTimeout(() => {
          vfInstance.emits.init(vfInstance);
          vfInstance.emits.paneReady(vfInstance);
        }, 1);
      }
    }
  );
}
function shiftX(x, shift, position) {
  if (position === Position.Left) {
    return x - shift;
  }
  if (position === Position.Right) {
    return x + shift;
  }
  return x;
}
function shiftY(y, shift, position) {
  if (position === Position.Top) {
    return y - shift;
  }
  if (position === Position.Bottom) {
    return y + shift;
  }
  return y;
}
const EdgeAnchor = function({
  radius = 10,
  centerX = 0,
  centerY = 0,
  position = Position.Top,
  type
}) {
  return h("circle", {
    class: `vue-flow__edgeupdater vue-flow__edgeupdater-${type}`,
    cx: shiftX(centerX, radius, position),
    cy: shiftY(centerY, radius, position),
    r: radius,
    stroke: "transparent",
    fill: "transparent"
  });
};
EdgeAnchor.props = ["radius", "centerX", "centerY", "position", "type"];
EdgeAnchor.compatConfig = { MODE: 3 };
const EdgeAnchor$1 = EdgeAnchor;
const EdgeWrapper = defineComponent({
  name: "Edge",
  compatConfig: { MODE: 3 },
  props: ["id"],
  setup(props) {
    const {
      id: vueFlowId,
      addSelectedEdges,
      connectionMode,
      edgeUpdaterRadius,
      emits,
      nodesSelectionActive,
      noPanClassName,
      getEdgeTypes,
      removeSelectedEdges,
      findEdge,
      findNode,
      isValidConnection,
      multiSelectionActive,
      disableKeyboardA11y,
      elementsSelectable,
      edgesUpdatable,
      edgesFocusable,
      hooks
    } = useVueFlow();
    const edge = computed(() => findEdge(props.id));
    const { emit, on } = useEdgeHooks(edge.value, emits);
    const slots = inject(Slots);
    const instance = getCurrentInstance();
    const mouseOver = ref(false);
    const updating = ref(false);
    const nodeId = ref("");
    const handleId = ref(null);
    const edgeUpdaterType = ref("source");
    const edgeEl = ref(null);
    const isSelectable = toRef(
      () => typeof edge.value.selectable === "undefined" ? elementsSelectable.value : edge.value.selectable
    );
    const isUpdatable = toRef(() => typeof edge.value.updatable === "undefined" ? edgesUpdatable.value : edge.value.updatable);
    const isFocusable = toRef(() => typeof edge.value.focusable === "undefined" ? edgesFocusable.value : edge.value.focusable);
    provide(EdgeId, props.id);
    provide(EdgeRef, edgeEl);
    const edgeClass = computed(() => edge.value.class instanceof Function ? edge.value.class(edge.value) : edge.value.class);
    const edgeStyle = computed(() => edge.value.style instanceof Function ? edge.value.style(edge.value) : edge.value.style);
    const edgeCmp = computed(() => {
      const name = edge.value.type || "default";
      const slot = slots == null ? void 0 : slots[`edge-${name}`];
      if (slot) {
        return slot;
      }
      let edgeType = edge.value.template ?? getEdgeTypes.value[name];
      if (typeof edgeType === "string") {
        if (instance) {
          const components = Object.keys(instance.appContext.components);
          if (components && components.includes(name)) {
            edgeType = resolveComponent(name, false);
          }
        }
      }
      if (edgeType && typeof edgeType !== "string") {
        return edgeType;
      }
      emits.error(new VueFlowError(ErrorCode.EDGE_TYPE_MISSING, edgeType));
      return false;
    });
    const { handlePointerDown } = useHandle({
      nodeId,
      handleId,
      type: edgeUpdaterType,
      isValidConnection,
      edgeUpdaterType,
      onEdgeUpdate,
      onEdgeUpdateEnd
    });
    return () => {
      const sourceNode = findNode(edge.value.source);
      const targetNode = findNode(edge.value.target);
      const pathOptions = "pathOptions" in edge.value ? edge.value.pathOptions : {};
      if (!sourceNode && !targetNode) {
        emits.error(new VueFlowError(ErrorCode.EDGE_SOURCE_TARGET_MISSING, edge.value.id, edge.value.source, edge.value.target));
        return null;
      }
      if (!sourceNode) {
        emits.error(new VueFlowError(ErrorCode.EDGE_SOURCE_MISSING, edge.value.id, edge.value.source));
        return null;
      }
      if (!targetNode) {
        emits.error(new VueFlowError(ErrorCode.EDGE_TARGET_MISSING, edge.value.id, edge.value.target));
        return null;
      }
      if (!edge.value || edge.value.hidden || sourceNode.hidden || targetNode.hidden) {
        return null;
      }
      let sourceNodeHandles;
      if (connectionMode.value === ConnectionMode.Strict) {
        sourceNodeHandles = sourceNode.handleBounds.source;
      } else {
        sourceNodeHandles = [...sourceNode.handleBounds.source || [], ...sourceNode.handleBounds.target || []];
      }
      const sourceHandle = getEdgeHandle(sourceNodeHandles, edge.value.sourceHandle);
      let targetNodeHandles;
      if (connectionMode.value === ConnectionMode.Strict) {
        targetNodeHandles = targetNode.handleBounds.target;
      } else {
        targetNodeHandles = [...targetNode.handleBounds.target || [], ...targetNode.handleBounds.source || []];
      }
      const targetHandle = getEdgeHandle(targetNodeHandles, edge.value.targetHandle);
      const sourcePosition = (sourceHandle == null ? void 0 : sourceHandle.position) || Position.Bottom;
      const targetPosition = (targetHandle == null ? void 0 : targetHandle.position) || Position.Top;
      const { x: sourceX, y: sourceY } = getHandlePosition(sourceNode, sourceHandle, sourcePosition);
      const { x: targetX, y: targetY } = getHandlePosition(targetNode, targetHandle, targetPosition);
      edge.value.sourceX = sourceX;
      edge.value.sourceY = sourceY;
      edge.value.targetX = targetX;
      edge.value.targetY = targetY;
      return h(
        "g",
        {
          "ref": edgeEl,
          "key": props.id,
          "data-id": props.id,
          "class": [
            "vue-flow__edge",
            `vue-flow__edge-${edgeCmp.value === false ? "default" : edge.value.type || "default"}`,
            noPanClassName.value,
            edgeClass.value,
            {
              updating: mouseOver.value,
              selected: edge.value.selected,
              animated: edge.value.animated,
              inactive: !isSelectable.value && !hooks.value.edgeClick.hasListeners()
            }
          ],
          "tabIndex": isFocusable.value ? 0 : void 0,
          "aria-label": edge.value.ariaLabel === null ? void 0 : edge.value.ariaLabel ?? `Edge from ${edge.value.source} to ${edge.value.target}`,
          "aria-describedby": isFocusable.value ? `${ARIA_EDGE_DESC_KEY}-${vueFlowId}` : void 0,
          "aria-roledescription": "edge",
          "role": isFocusable.value ? "group" : "img",
          ...edge.value.domAttributes,
          "onClick": onEdgeClick,
          "onContextmenu": onEdgeContextMenu,
          "onDblclick": onDoubleClick,
          "onMouseenter": onEdgeMouseEnter,
          "onMousemove": onEdgeMouseMove,
          "onMouseleave": onEdgeMouseLeave,
          "onKeyDown": isFocusable.value ? onKeyDown : void 0
        },
        [
          updating.value ? null : h(edgeCmp.value === false ? getEdgeTypes.value.default : edgeCmp.value, {
            id: props.id,
            sourceNode,
            targetNode,
            source: edge.value.source,
            target: edge.value.target,
            type: edge.value.type,
            updatable: isUpdatable.value,
            selected: edge.value.selected,
            animated: edge.value.animated,
            label: edge.value.label,
            labelStyle: edge.value.labelStyle,
            labelShowBg: edge.value.labelShowBg,
            labelBgStyle: edge.value.labelBgStyle,
            labelBgPadding: edge.value.labelBgPadding,
            labelBgBorderRadius: edge.value.labelBgBorderRadius,
            data: edge.value.data,
            events: { ...edge.value.events, ...on },
            style: edgeStyle.value,
            markerStart: `url('#${getMarkerId(edge.value.markerStart, vueFlowId)}')`,
            markerEnd: `url('#${getMarkerId(edge.value.markerEnd, vueFlowId)}')`,
            sourcePosition,
            targetPosition,
            sourceX,
            sourceY,
            targetX,
            targetY,
            sourceHandleId: edge.value.sourceHandle,
            targetHandleId: edge.value.targetHandle,
            interactionWidth: edge.value.interactionWidth,
            ...pathOptions
          }),
          [
            isUpdatable.value === "source" || isUpdatable.value === true ? [
              h(
                "g",
                {
                  onMousedown: onEdgeUpdaterSourceMouseDown,
                  onMouseenter: onEdgeUpdaterMouseEnter,
                  onMouseout: onEdgeUpdaterMouseOut
                },
                h(EdgeAnchor$1, {
                  "position": sourcePosition,
                  "centerX": sourceX,
                  "centerY": sourceY,
                  "radius": edgeUpdaterRadius.value,
                  "type": "source",
                  "data-type": "source"
                })
              )
            ] : null,
            isUpdatable.value === "target" || isUpdatable.value === true ? [
              h(
                "g",
                {
                  onMousedown: onEdgeUpdaterTargetMouseDown,
                  onMouseenter: onEdgeUpdaterMouseEnter,
                  onMouseout: onEdgeUpdaterMouseOut
                },
                h(EdgeAnchor$1, {
                  "position": targetPosition,
                  "centerX": targetX,
                  "centerY": targetY,
                  "radius": edgeUpdaterRadius.value,
                  "type": "target",
                  "data-type": "target"
                })
              )
            ] : null
          ]
        ]
      );
    };
    function onEdgeUpdaterMouseEnter() {
      mouseOver.value = true;
    }
    function onEdgeUpdaterMouseOut() {
      mouseOver.value = false;
    }
    function onEdgeUpdate(event, connection) {
      emit.update({ event, edge: edge.value, connection });
    }
    function onEdgeUpdateEnd(event) {
      emit.updateEnd({ event, edge: edge.value });
      updating.value = false;
    }
    function handleEdgeUpdater(event, isSourceHandle) {
      if (event.button !== 0) {
        return;
      }
      updating.value = true;
      nodeId.value = isSourceHandle ? edge.value.target : edge.value.source;
      handleId.value = (isSourceHandle ? edge.value.targetHandle : edge.value.sourceHandle) ?? null;
      edgeUpdaterType.value = isSourceHandle ? "target" : "source";
      emit.updateStart({ event, edge: edge.value });
      handlePointerDown(event);
    }
    function onEdgeClick(event) {
      var _a;
      const data = { event, edge: edge.value };
      if (isSelectable.value) {
        nodesSelectionActive.value = false;
        if (edge.value.selected && multiSelectionActive.value) {
          removeSelectedEdges([edge.value]);
          (_a = edgeEl.value) == null ? void 0 : _a.blur();
        } else {
          addSelectedEdges([edge.value]);
        }
      }
      emit.click(data);
    }
    function onEdgeContextMenu(event) {
      emit.contextMenu({ event, edge: edge.value });
    }
    function onDoubleClick(event) {
      emit.doubleClick({ event, edge: edge.value });
    }
    function onEdgeMouseEnter(event) {
      emit.mouseEnter({ event, edge: edge.value });
    }
    function onEdgeMouseMove(event) {
      emit.mouseMove({ event, edge: edge.value });
    }
    function onEdgeMouseLeave(event) {
      emit.mouseLeave({ event, edge: edge.value });
    }
    function onEdgeUpdaterSourceMouseDown(event) {
      handleEdgeUpdater(event, true);
    }
    function onEdgeUpdaterTargetMouseDown(event) {
      handleEdgeUpdater(event, false);
    }
    function onKeyDown(event) {
      var _a;
      if (!disableKeyboardA11y.value && elementSelectionKeys.includes(event.key) && isSelectable.value) {
        const unselect = event.key === "Escape";
        if (unselect) {
          (_a = edgeEl.value) == null ? void 0 : _a.blur();
          removeSelectedEdges([findEdge(props.id)]);
        } else {
          addSelectedEdges([findEdge(props.id)]);
        }
      }
    }
  }
});
const EdgeWrapper$1 = EdgeWrapper;
const ConnectionLine = defineComponent({
  name: "ConnectionLine",
  compatConfig: { MODE: 3 },
  setup() {
    var _a;
    const {
      id: id2,
      connectionMode,
      connectionStartHandle,
      connectionEndHandle,
      connectionPosition,
      connectionLineType,
      connectionLineStyle,
      connectionLineOptions,
      connectionStatus,
      viewport,
      findNode
    } = useVueFlow();
    const connectionLineComponent = (_a = inject(Slots)) == null ? void 0 : _a["connection-line"];
    const fromNode = computed(() => {
      var _a2;
      return findNode((_a2 = connectionStartHandle.value) == null ? void 0 : _a2.nodeId);
    });
    const toNode = computed(() => {
      var _a2;
      return findNode((_a2 = connectionEndHandle.value) == null ? void 0 : _a2.nodeId) ?? null;
    });
    const toXY = computed(() => {
      return {
        x: (connectionPosition.value.x - viewport.value.x) / viewport.value.zoom,
        y: (connectionPosition.value.y - viewport.value.y) / viewport.value.zoom
      };
    });
    const markerStart = computed(
      () => connectionLineOptions.value.markerStart ? `url(#${getMarkerId(connectionLineOptions.value.markerStart, id2)})` : ""
    );
    const markerEnd = computed(
      () => connectionLineOptions.value.markerEnd ? `url(#${getMarkerId(connectionLineOptions.value.markerEnd, id2)})` : ""
    );
    return () => {
      var _a2, _b, _c;
      if (!fromNode.value || !connectionStartHandle.value) {
        return null;
      }
      const startHandleId = connectionStartHandle.value.id;
      const handleType = connectionStartHandle.value.type;
      const fromHandleBounds = fromNode.value.handleBounds;
      let handleBounds = (fromHandleBounds == null ? void 0 : fromHandleBounds[handleType]) ?? [];
      if (connectionMode.value === ConnectionMode.Loose) {
        const oppositeBounds = (fromHandleBounds == null ? void 0 : fromHandleBounds[handleType === "source" ? "target" : "source"]) ?? [];
        handleBounds = [...handleBounds, ...oppositeBounds];
      }
      if (!handleBounds) {
        return null;
      }
      const fromHandle = (startHandleId ? handleBounds.find((d) => d.id === startHandleId) : handleBounds[0]) ?? null;
      const fromPosition = (fromHandle == null ? void 0 : fromHandle.position) ?? Position.Top;
      const { x: fromX, y: fromY } = getHandlePosition(fromNode.value, fromHandle, fromPosition);
      let toHandle = null;
      if (toNode.value) {
        if (connectionMode.value === ConnectionMode.Strict) {
          toHandle = ((_a2 = toNode.value.handleBounds[handleType === "source" ? "target" : "source"]) == null ? void 0 : _a2.find(
            (d) => {
              var _a3;
              return d.id === ((_a3 = connectionEndHandle.value) == null ? void 0 : _a3.id);
            }
          )) || null;
        } else {
          toHandle = ((_b = [...toNode.value.handleBounds.source ?? [], ...toNode.value.handleBounds.target ?? []]) == null ? void 0 : _b.find(
            (d) => {
              var _a3;
              return d.id === ((_a3 = connectionEndHandle.value) == null ? void 0 : _a3.id);
            }
          )) || null;
        }
      }
      const toPosition = ((_c = connectionEndHandle.value) == null ? void 0 : _c.position) ?? (fromPosition ? oppositePosition[fromPosition] : null);
      if (!fromPosition || !toPosition) {
        return null;
      }
      const type = connectionLineType.value ?? connectionLineOptions.value.type ?? ConnectionLineType.Bezier;
      let dAttr = "";
      const pathParams = {
        sourceX: fromX,
        sourceY: fromY,
        sourcePosition: fromPosition,
        targetX: toXY.value.x,
        targetY: toXY.value.y,
        targetPosition: toPosition
      };
      if (type === ConnectionLineType.Bezier) {
        [dAttr] = getBezierPath(pathParams);
      } else if (type === ConnectionLineType.Step) {
        [dAttr] = getSmoothStepPath({
          ...pathParams,
          borderRadius: 0
        });
      } else if (type === ConnectionLineType.SmoothStep) {
        [dAttr] = getSmoothStepPath(pathParams);
      } else if (type === ConnectionLineType.SimpleBezier) {
        [dAttr] = getSimpleBezierPath(pathParams);
      } else {
        dAttr = `M${fromX},${fromY} ${toXY.value.x},${toXY.value.y}`;
      }
      return h(
        "svg",
        { class: "vue-flow__edges vue-flow__connectionline vue-flow__container" },
        h(
          "g",
          { class: "vue-flow__connection" },
          connectionLineComponent ? h(connectionLineComponent, {
            sourceX: fromX,
            sourceY: fromY,
            sourcePosition: fromPosition,
            targetX: toXY.value.x,
            targetY: toXY.value.y,
            targetPosition: toPosition,
            sourceNode: fromNode.value,
            sourceHandle: fromHandle,
            targetNode: toNode.value,
            targetHandle: toHandle,
            markerEnd: markerEnd.value,
            markerStart: markerStart.value,
            connectionStatus: connectionStatus.value
          }) : h("path", {
            "d": dAttr,
            "class": [connectionLineOptions.value.class, connectionStatus.value, "vue-flow__connection-path"],
            "style": {
              ...connectionLineStyle.value,
              ...connectionLineOptions.value.style
            },
            "marker-end": markerEnd.value,
            "marker-start": markerStart.value
          })
        )
      );
    };
  }
});
const ConnectionLine$1 = ConnectionLine;
const _hoisted_1$4$1 = ["id", "markerWidth", "markerHeight", "markerUnits", "orient"];
const __default__$6 = {
  name: "MarkerType",
  compatConfig: { MODE: 3 }
};
const _sfc_main$6$1 = /* @__PURE__ */ defineComponent({
  ...__default__$6,
  props: {
    id: {},
    type: {},
    color: { default: "none" },
    width: { default: 12.5 },
    height: { default: 12.5 },
    markerUnits: { default: "strokeWidth" },
    orient: { default: "auto-start-reverse" },
    strokeWidth: { default: 1 }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("marker", {
        id: _ctx.id,
        class: "vue-flow__arrowhead",
        viewBox: "-10 -10 20 20",
        refX: "0",
        refY: "0",
        markerWidth: `${_ctx.width}`,
        markerHeight: `${_ctx.height}`,
        markerUnits: _ctx.markerUnits,
        orient: _ctx.orient
      }, [
        _ctx.type === unref(MarkerType).ArrowClosed ? (openBlock(), createElementBlock("polyline", {
          key: 0,
          style: normalizeStyle({
            stroke: _ctx.color,
            fill: _ctx.color,
            strokeWidth: _ctx.strokeWidth
          }),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          points: "-5,-4 0,0 -5,4 -5,-4"
        }, null, 4)) : createCommentVNode("", true),
        _ctx.type === unref(MarkerType).Arrow ? (openBlock(), createElementBlock("polyline", {
          key: 1,
          style: normalizeStyle({
            stroke: _ctx.color,
            strokeWidth: _ctx.strokeWidth
          }),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          fill: "none",
          points: "-5,-4 0,0 -5,4"
        }, null, 4)) : createCommentVNode("", true)
      ], 8, _hoisted_1$4$1);
    };
  }
});
const _hoisted_1$3$1 = {
  class: "vue-flow__marker vue-flow__container",
  "aria-hidden": "true"
};
const __default__$5 = {
  name: "MarkerDefinitions",
  compatConfig: { MODE: 3 }
};
const _sfc_main$5$1 = /* @__PURE__ */ defineComponent({
  ...__default__$5,
  setup(__props) {
    const { id: vueFlowId, edges, connectionLineOptions, defaultMarkerColor: defaultColor } = useVueFlow();
    const markers = computed(() => {
      const ids = /* @__PURE__ */ new Set();
      const markers2 = [];
      const createMarkers = (marker) => {
        if (marker) {
          const markerId = getMarkerId(marker, vueFlowId);
          if (!ids.has(markerId)) {
            if (typeof marker === "object") {
              markers2.push({ ...marker, id: markerId, color: marker.color || defaultColor.value });
            } else {
              markers2.push({ id: markerId, color: defaultColor.value, type: marker });
            }
            ids.add(markerId);
          }
        }
      };
      for (const marker of [connectionLineOptions.value.markerEnd, connectionLineOptions.value.markerStart]) {
        createMarkers(marker);
      }
      for (const edge of edges.value) {
        for (const marker of [edge.markerStart, edge.markerEnd]) {
          createMarkers(marker);
        }
      }
      return markers2.sort((a, b) => a.id.localeCompare(b.id));
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", _hoisted_1$3$1, [
        createBaseVNode("defs", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(markers.value, (marker) => {
            return openBlock(), createBlock(_sfc_main$6$1, {
              id: marker.id,
              key: marker.id,
              type: marker.type,
              color: marker.color,
              width: marker.width,
              height: marker.height,
              markerUnits: marker.markerUnits,
              "stroke-width": marker.strokeWidth,
              orient: marker.orient
            }, null, 8, ["id", "type", "color", "width", "height", "markerUnits", "stroke-width", "orient"]);
          }), 128))
        ])
      ]);
    };
  }
});
const __default__$4 = {
  name: "Edges",
  compatConfig: { MODE: 3 }
};
const _sfc_main$4$1 = /* @__PURE__ */ defineComponent({
  ...__default__$4,
  setup(__props) {
    const { findNode, getEdges, elevateEdgesOnSelect } = useVueFlow();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_sfc_main$5$1),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(getEdges), (edge) => {
          return openBlock(), createElementBlock("svg", {
            key: edge.id,
            class: "vue-flow__edges vue-flow__container",
            style: normalizeStyle({ zIndex: unref(getEdgeZIndex)(edge, unref(findNode), unref(elevateEdgesOnSelect)) })
          }, [
            createVNode(unref(EdgeWrapper$1), {
              id: edge.id
            }, null, 8, ["id"])
          ], 4);
        }), 128)),
        createVNode(unref(ConnectionLine$1))
      ], 64);
    };
  }
});
const NodeWrapper = defineComponent({
  name: "Node",
  compatConfig: { MODE: 3 },
  props: ["id", "resizeObserver"],
  setup(props) {
    const {
      id: vueFlowId,
      noPanClassName,
      selectNodesOnDrag,
      nodesSelectionActive,
      multiSelectionActive,
      emits,
      removeSelectedNodes,
      addSelectedNodes,
      updateNodeDimensions,
      onUpdateNodeInternals,
      getNodeTypes,
      nodeExtent,
      elevateNodesOnSelect,
      disableKeyboardA11y,
      ariaLiveMessage,
      snapToGrid,
      snapGrid,
      nodeDragThreshold,
      nodesDraggable,
      elementsSelectable,
      nodesConnectable,
      nodesFocusable,
      hooks
    } = useVueFlow();
    const nodeElement = ref(null);
    provide(NodeRef, nodeElement);
    provide(NodeId, props.id);
    const slots = inject(Slots);
    const instance = getCurrentInstance();
    const updateNodePositions = useUpdateNodePositions();
    const { node, parentNode } = useNode(props.id);
    const { emit, on } = useNodeHooks(node, emits);
    const isDraggable = toRef(() => typeof node.draggable === "undefined" ? nodesDraggable.value : node.draggable);
    const isSelectable = toRef(() => typeof node.selectable === "undefined" ? elementsSelectable.value : node.selectable);
    const isConnectable = toRef(() => typeof node.connectable === "undefined" ? nodesConnectable.value : node.connectable);
    const isFocusable = toRef(() => typeof node.focusable === "undefined" ? nodesFocusable.value : node.focusable);
    const hasPointerEvents = computed(
      () => isSelectable.value || isDraggable.value || hooks.value.nodeClick.hasListeners() || hooks.value.nodeDoubleClick.hasListeners() || hooks.value.nodeMouseEnter.hasListeners() || hooks.value.nodeMouseMove.hasListeners() || hooks.value.nodeMouseLeave.hasListeners()
    );
    const isInit = toRef(() => !!node.dimensions.width && !!node.dimensions.height);
    const nodeCmp = computed(() => {
      const name = node.type || "default";
      const slot = slots == null ? void 0 : slots[`node-${name}`];
      if (slot) {
        return slot;
      }
      let nodeType = node.template || getNodeTypes.value[name];
      if (typeof nodeType === "string") {
        if (instance) {
          const components = Object.keys(instance.appContext.components);
          if (components && components.includes(name)) {
            nodeType = resolveComponent(name, false);
          }
        }
      }
      if (nodeType && typeof nodeType !== "string") {
        return nodeType;
      }
      emits.error(new VueFlowError(ErrorCode.NODE_TYPE_MISSING, nodeType));
      return false;
    });
    const dragging = useDrag({
      id: props.id,
      el: nodeElement,
      disabled: () => !isDraggable.value,
      selectable: isSelectable,
      dragHandle: () => node.dragHandle,
      onStart(event) {
        emit.dragStart(event);
      },
      onDrag(event) {
        emit.drag(event);
      },
      onStop(event) {
        emit.dragStop(event);
      },
      onClick(event) {
        onSelectNode(event);
      }
    });
    const getClass = computed(() => node.class instanceof Function ? node.class(node) : node.class);
    const getStyle = computed(() => {
      const styles = (node.style instanceof Function ? node.style(node) : node.style) || {};
      const width = node.width instanceof Function ? node.width(node) : node.width;
      const height = node.height instanceof Function ? node.height(node) : node.height;
      if (!styles.width && width) {
        styles.width = typeof width === "string" ? width : `${width}px`;
      }
      if (!styles.height && height) {
        styles.height = typeof height === "string" ? height : `${height}px`;
      }
      return styles;
    });
    const zIndex = toRef(() => Number(node.zIndex ?? getStyle.value.zIndex ?? 0));
    onUpdateNodeInternals((updateIds) => {
      if (updateIds.includes(props.id) || !updateIds.length) {
        updateInternals();
      }
    });
    onMounted(() => {
      watch(
        () => node.hidden,
        (isHidden = false, _, onCleanup) => {
          if (!isHidden && nodeElement.value) {
            props.resizeObserver.observe(nodeElement.value);
            onCleanup(() => {
              if (nodeElement.value) {
                props.resizeObserver.unobserve(nodeElement.value);
              }
            });
          }
        },
        { immediate: true, flush: "post" }
      );
    });
    watch([() => node.type, () => node.sourcePosition, () => node.targetPosition], () => {
      nextTick(() => {
        updateNodeDimensions([{ id: props.id, nodeElement: nodeElement.value, forceUpdate: true }]);
      });
    });
    watch(
      [
        () => node.position.x,
        () => node.position.y,
        () => {
          var _a;
          return (_a = parentNode.value) == null ? void 0 : _a.computedPosition.x;
        },
        () => {
          var _a;
          return (_a = parentNode.value) == null ? void 0 : _a.computedPosition.y;
        },
        () => {
          var _a;
          return (_a = parentNode.value) == null ? void 0 : _a.computedPosition.z;
        },
        zIndex,
        () => node.selected,
        () => node.dimensions.height,
        () => node.dimensions.width,
        () => {
          var _a;
          return (_a = parentNode.value) == null ? void 0 : _a.dimensions.height;
        },
        () => {
          var _a;
          return (_a = parentNode.value) == null ? void 0 : _a.dimensions.width;
        }
      ],
      ([newX, newY, parentX, parentY, parentZ, nodeZIndex]) => {
        const xyzPos = {
          x: newX,
          y: newY,
          z: nodeZIndex + (elevateNodesOnSelect.value ? node.selected ? 1e3 : 0 : 0)
        };
        if (typeof parentX !== "undefined" && typeof parentY !== "undefined") {
          node.computedPosition = getXYZPos({ x: parentX, y: parentY, z: parentZ }, xyzPos);
        } else {
          node.computedPosition = xyzPos;
        }
      },
      { flush: "post", immediate: true }
    );
    watch([() => node.extent, nodeExtent], ([nodeExtent2, globalExtent], [oldNodeExtent, oldGlobalExtent]) => {
      if (nodeExtent2 !== oldNodeExtent || globalExtent !== oldGlobalExtent) {
        clampPosition2();
      }
    });
    if (node.extent === "parent" || typeof node.extent === "object" && "range" in node.extent && node.extent.range === "parent") {
      until(() => isInit).toBe(true).then(clampPosition2);
    } else {
      clampPosition2();
    }
    return () => {
      if (node.hidden) {
        return null;
      }
      return h(
        "div",
        {
          "ref": nodeElement,
          "data-id": node.id,
          "class": [
            "vue-flow__node",
            `vue-flow__node-${nodeCmp.value === false ? "default" : node.type || "default"}`,
            {
              [noPanClassName.value]: isDraggable.value,
              dragging: dragging == null ? void 0 : dragging.value,
              draggable: isDraggable.value,
              selected: node.selected,
              selectable: isSelectable.value,
              parent: node.isParent
            },
            getClass.value
          ],
          "style": {
            visibility: isInit.value ? "visible" : "hidden",
            zIndex: node.computedPosition.z ?? zIndex.value,
            transform: `translate(${node.computedPosition.x}px,${node.computedPosition.y}px)`,
            pointerEvents: hasPointerEvents.value ? "all" : "none",
            ...getStyle.value
          },
          "tabIndex": isFocusable.value ? 0 : void 0,
          "role": isFocusable.value ? "group" : void 0,
          "aria-describedby": disableKeyboardA11y.value ? void 0 : `${ARIA_NODE_DESC_KEY}-${vueFlowId}`,
          "aria-label": node.ariaLabel,
          "aria-roledescription": "node",
          ...node.domAttributes,
          "onMouseenter": onMouseEnter,
          "onMousemove": onMouseMove,
          "onMouseleave": onMouseLeave,
          "onContextmenu": onContextMenu,
          "onClick": onSelectNode,
          "onDblclick": onDoubleClick,
          "onKeydown": onKeyDown
        },
        [
          h(nodeCmp.value === false ? getNodeTypes.value.default : nodeCmp.value, {
            id: node.id,
            type: node.type,
            data: node.data,
            events: { ...node.events, ...on },
            selected: node.selected,
            resizing: node.resizing,
            dragging: dragging.value,
            connectable: isConnectable.value,
            position: node.computedPosition,
            dimensions: node.dimensions,
            isValidTargetPos: node.isValidTargetPos,
            isValidSourcePos: node.isValidSourcePos,
            parent: node.parentNode,
            parentNodeId: node.parentNode,
            zIndex: node.computedPosition.z ?? zIndex.value,
            targetPosition: node.targetPosition,
            sourcePosition: node.sourcePosition,
            label: node.label,
            dragHandle: node.dragHandle,
            onUpdateNodeInternals: updateInternals
          })
        ]
      );
    };
    function clampPosition2() {
      const nextPosition = node.computedPosition;
      const { computedPosition, position } = calcNextPosition(
        node,
        snapToGrid.value ? snapPosition(nextPosition, snapGrid.value) : nextPosition,
        emits.error,
        nodeExtent.value,
        parentNode.value
      );
      if (node.computedPosition.x !== computedPosition.x || node.computedPosition.y !== computedPosition.y) {
        node.computedPosition = { ...node.computedPosition, ...computedPosition };
      }
      if (node.position.x !== position.x || node.position.y !== position.y) {
        node.position = position;
      }
    }
    function updateInternals() {
      if (nodeElement.value) {
        updateNodeDimensions([{ id: props.id, nodeElement: nodeElement.value, forceUpdate: true }]);
      }
    }
    function onMouseEnter(event) {
      if (!(dragging == null ? void 0 : dragging.value)) {
        emit.mouseEnter({ event, node });
      }
    }
    function onMouseMove(event) {
      if (!(dragging == null ? void 0 : dragging.value)) {
        emit.mouseMove({ event, node });
      }
    }
    function onMouseLeave(event) {
      if (!(dragging == null ? void 0 : dragging.value)) {
        emit.mouseLeave({ event, node });
      }
    }
    function onContextMenu(event) {
      return emit.contextMenu({ event, node });
    }
    function onDoubleClick(event) {
      return emit.doubleClick({ event, node });
    }
    function onSelectNode(event) {
      if (isSelectable.value && (!selectNodesOnDrag.value || !isDraggable.value || nodeDragThreshold.value > 0)) {
        handleNodeClick(
          node,
          multiSelectionActive.value,
          addSelectedNodes,
          removeSelectedNodes,
          nodesSelectionActive,
          false,
          nodeElement.value
        );
      }
      emit.click({ event, node });
    }
    function onKeyDown(event) {
      if (isInputDOMNode(event) || disableKeyboardA11y.value) {
        return;
      }
      if (elementSelectionKeys.includes(event.key) && isSelectable.value) {
        const unselect = event.key === "Escape";
        handleNodeClick(
          node,
          multiSelectionActive.value,
          addSelectedNodes,
          removeSelectedNodes,
          nodesSelectionActive,
          unselect,
          nodeElement.value
        );
      } else if (isDraggable.value && node.selected && arrowKeyDiffs[event.key]) {
        event.preventDefault();
        ariaLiveMessage.value = `Moved selected node ${event.key.replace("Arrow", "").toLowerCase()}. New position, x: ${~~node.position.x}, y: ${~~node.position.y}`;
        updateNodePositions(
          {
            x: arrowKeyDiffs[event.key].x,
            y: arrowKeyDiffs[event.key].y
          },
          event.shiftKey
        );
      }
    }
  }
});
const NodeWrapper$1 = NodeWrapper;
function useNodesInitialized(options = { includeHiddenNodes: false }) {
  const { nodes } = useVueFlow();
  return computed(() => {
    if (nodes.value.length === 0) {
      return false;
    }
    for (const node of nodes.value) {
      if (options.includeHiddenNodes || !node.hidden) {
        if ((node == null ? void 0 : node.handleBounds) === void 0 || node.dimensions.width === 0 || node.dimensions.height === 0) {
          return false;
        }
      }
    }
    return true;
  });
}
const _hoisted_1$1$1 = { class: "vue-flow__nodes vue-flow__container" };
const __default__$2 = {
  name: "Nodes",
  compatConfig: { MODE: 3 }
};
const _sfc_main$2$1 = /* @__PURE__ */ defineComponent({
  ...__default__$2,
  setup(__props) {
    const { getNodes, updateNodeDimensions, emits } = useVueFlow();
    const nodesInitialized = useNodesInitialized();
    const resizeObserver = ref();
    watch(
      nodesInitialized,
      (isInit) => {
        if (isInit) {
          nextTick(() => {
            emits.nodesInitialized(getNodes.value);
          });
        }
      },
      { immediate: true }
    );
    onMounted(() => {
      resizeObserver.value = new ResizeObserver((entries) => {
        const updates = entries.map((entry) => {
          const id2 = entry.target.getAttribute("data-id");
          return {
            id: id2,
            nodeElement: entry.target,
            forceUpdate: true
          };
        });
        nextTick(() => updateNodeDimensions(updates));
      });
    });
    onBeforeUnmount(() => {
      var _a;
      return (_a = resizeObserver.value) == null ? void 0 : _a.disconnect();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1$1, [
        resizeObserver.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(getNodes), (node, __, ___, _cached) => {
          const _memo = [node.id];
          if (_cached && _cached.key === node.id && isMemoSame(_cached, _memo))
            return _cached;
          const _item = (openBlock(), createBlock(unref(NodeWrapper$1), {
            id: node.id,
            key: node.id,
            "resize-observer": resizeObserver.value
          }, null, 8, ["id", "resize-observer"]));
          _item.memo = _memo;
          return _item;
        }, _cache, 0), 128)) : createCommentVNode("", true)
      ]);
    };
  }
});
function useStylesLoadedWarning() {
  const { emits } = useVueFlow();
  onMounted(() => {
    if (isDev()) {
      const pane = document.querySelector(".vue-flow__pane");
      if (pane && !(window.getComputedStyle(pane).zIndex === "1")) {
        emits.error(new VueFlowError(ErrorCode.MISSING_STYLES));
      }
    }
  });
}
const _hoisted_1$c = /* @__PURE__ */ createBaseVNode("div", { class: "vue-flow__edge-labels" }, null, -1);
const __default__$1$1 = {
  name: "VueFlow",
  compatConfig: { MODE: 3 }
};
const _sfc_main$1$1 = /* @__PURE__ */ defineComponent({
  ...__default__$1$1,
  props: {
    id: {},
    modelValue: {},
    nodes: {},
    edges: {},
    edgeTypes: {},
    nodeTypes: {},
    connectionMode: {},
    connectionLineType: {},
    connectionLineStyle: { default: void 0 },
    connectionLineOptions: { default: void 0 },
    connectionRadius: {},
    isValidConnection: { type: [Function, null], default: void 0 },
    deleteKeyCode: { default: void 0 },
    selectionKeyCode: { type: [Boolean, null], default: void 0 },
    multiSelectionKeyCode: { default: void 0 },
    zoomActivationKeyCode: { default: void 0 },
    panActivationKeyCode: { default: void 0 },
    snapToGrid: { type: Boolean, default: void 0 },
    snapGrid: {},
    onlyRenderVisibleElements: { type: Boolean, default: void 0 },
    edgesUpdatable: { type: [Boolean, String], default: void 0 },
    nodesDraggable: { type: Boolean, default: void 0 },
    nodesConnectable: { type: Boolean, default: void 0 },
    nodeDragThreshold: {},
    elementsSelectable: { type: Boolean, default: void 0 },
    selectNodesOnDrag: { type: Boolean, default: void 0 },
    panOnDrag: { type: [Boolean, Array], default: void 0 },
    minZoom: {},
    maxZoom: {},
    defaultViewport: {},
    translateExtent: {},
    nodeExtent: {},
    defaultMarkerColor: {},
    zoomOnScroll: { type: Boolean, default: void 0 },
    zoomOnPinch: { type: Boolean, default: void 0 },
    panOnScroll: { type: Boolean, default: void 0 },
    panOnScrollSpeed: {},
    panOnScrollMode: {},
    paneClickDistance: {},
    zoomOnDoubleClick: { type: Boolean, default: void 0 },
    preventScrolling: { type: Boolean, default: void 0 },
    selectionMode: {},
    edgeUpdaterRadius: {},
    fitViewOnInit: { type: Boolean, default: void 0 },
    connectOnClick: { type: Boolean, default: void 0 },
    applyDefault: { type: Boolean, default: void 0 },
    autoConnect: { type: [Boolean, Function], default: void 0 },
    noDragClassName: {},
    noWheelClassName: {},
    noPanClassName: {},
    defaultEdgeOptions: {},
    elevateEdgesOnSelect: { type: Boolean, default: void 0 },
    elevateNodesOnSelect: { type: Boolean, default: void 0 },
    disableKeyboardA11y: { type: Boolean, default: void 0 },
    edgesFocusable: { type: Boolean, default: void 0 },
    nodesFocusable: { type: Boolean, default: void 0 },
    autoPanOnConnect: { type: Boolean, default: void 0 },
    autoPanOnNodeDrag: { type: Boolean, default: void 0 },
    autoPanSpeed: {}
  },
  emits: ["nodesChange", "edgesChange", "nodesInitialized", "paneReady", "init", "updateNodeInternals", "error", "connect", "connectStart", "connectEnd", "clickConnectStart", "clickConnectEnd", "moveStart", "move", "moveEnd", "selectionDragStart", "selectionDrag", "selectionDragStop", "selectionContextMenu", "selectionStart", "selectionEnd", "viewportChangeStart", "viewportChange", "viewportChangeEnd", "paneScroll", "paneClick", "paneContextMenu", "paneMouseEnter", "paneMouseMove", "paneMouseLeave", "edgeUpdate", "edgeContextMenu", "edgeMouseEnter", "edgeMouseMove", "edgeMouseLeave", "edgeDoubleClick", "edgeClick", "edgeUpdateStart", "edgeUpdateEnd", "nodeContextMenu", "nodeMouseEnter", "nodeMouseMove", "nodeMouseLeave", "nodeDoubleClick", "nodeClick", "nodeDragStart", "nodeDrag", "nodeDragStop", "miniMapNodeClick", "miniMapNodeDoubleClick", "miniMapNodeMouseEnter", "miniMapNodeMouseMove", "miniMapNodeMouseLeave", "update:modelValue", "update:nodes", "update:edges"],
  setup(__props, { expose: __expose, emit }) {
    const props = __props;
    const slots = useSlots();
    const modelValue = useVModel(props, "modelValue", emit);
    const modelNodes = useVModel(props, "nodes", emit);
    const modelEdges = useVModel(props, "edges", emit);
    const vfInstance = useVueFlow(props);
    const disposeWatchers = useWatchProps({ modelValue, nodes: modelNodes, edges: modelEdges }, props, vfInstance);
    useHooks(emit, vfInstance.hooks);
    useOnInitHandler();
    useStylesLoadedWarning();
    provide(Slots, slots);
    onUnmounted(disposeWatchers);
    __expose(vfInstance);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref: unref(vfInstance).vueFlowRef,
        class: "vue-flow"
      }, [
        createVNode(_sfc_main$8$1, null, {
          default: withCtx(() => [
            createVNode(_sfc_main$4$1),
            _hoisted_1$c,
            createVNode(_sfc_main$2$1),
            renderSlot(_ctx.$slots, "zoom-pane")
          ]),
          _: 3
        }),
        renderSlot(_ctx.$slots, "default"),
        createVNode(_sfc_main$7$1)
      ], 512);
    };
  }
});
const __default__$3 = {
  name: "Panel",
  compatConfig: { MODE: 3 }
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  ...__default__$3,
  props: {
    position: {}
  },
  setup(__props) {
    const props = __props;
    const { userSelectionActive } = useVueFlow();
    const positionClasses = computed(() => `${props.position}`.split("-"));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["vue-flow__panel", positionClasses.value]),
        style: normalizeStyle({ pointerEvents: unref(userSelectionActive) ? "none" : "all" })
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 6);
    };
  }
});

var BackgroundVariant = /* @__PURE__ */ ((BackgroundVariant2) => {
  BackgroundVariant2["Lines"] = "lines";
  BackgroundVariant2["Dots"] = "dots";
  return BackgroundVariant2;
})(BackgroundVariant || {});
const LinePattern = function({ dimensions, size, color }) {
  return h("path", {
    "stroke": color,
    "stroke-width": size,
    "d": `M${dimensions[0] / 2} 0 V${dimensions[1]} M0 ${dimensions[1] / 2} H${dimensions[0]}`
  });
};
const DotPattern = function({ radius, color }) {
  return h("circle", { cx: radius, cy: radius, r: radius, fill: color });
};
({
  [BackgroundVariant.Lines]: LinePattern,
  [BackgroundVariant.Dots]: DotPattern
});
const DefaultBgColors = {
  [BackgroundVariant.Dots]: "#81818a",
  [BackgroundVariant.Lines]: "#eee"
};
const _hoisted_1$b = ["id", "x", "y", "width", "height", "patternTransform"];
const _hoisted_2$4 = {
  key: 2,
  height: "100",
  width: "100"
};
const _hoisted_3$4 = ["fill"];
const _hoisted_4$3 = ["x", "y", "fill"];
const __default__$1 = {
  name: "Background",
  compatConfig: { MODE: 3 }
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: {
    id: {},
    variant: { default: () => BackgroundVariant.Dots },
    gap: { default: 20 },
    size: { default: 1 },
    lineWidth: { default: 1 },
    patternColor: {},
    color: {},
    bgColor: {},
    height: { default: 100 },
    width: { default: 100 },
    x: { default: 0 },
    y: { default: 0 },
    offset: { default: 0 }
  },
  setup(__props) {
    const { id: vueFlowId, viewport } = useVueFlow();
    const background = computed(() => {
      const zoom = viewport.value.zoom;
      const [gapX, gapY] = Array.isArray(__props.gap) ? __props.gap : [__props.gap, __props.gap];
      const scaledGap = [gapX * zoom || 1, gapY * zoom || 1];
      const scaledSize = __props.size * zoom;
      const [offsetX, offsetY] = Array.isArray(__props.offset) ? __props.offset : [__props.offset, __props.offset];
      const scaledOffset = [offsetX * zoom || 1 + scaledGap[0] / 2, offsetY * zoom || 1 + scaledGap[1] / 2];
      return {
        scaledGap,
        offset: scaledOffset,
        size: scaledSize
      };
    });
    const patternId = toRef(() => `pattern-${vueFlowId}${__props.id ? `-${__props.id}` : ""}`);
    const patternColor = toRef(() => __props.color || __props.patternColor || DefaultBgColors[__props.variant || BackgroundVariant.Dots]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        class: "vue-flow__background vue-flow__container",
        style: normalizeStyle({
          height: `${_ctx.height > 100 ? 100 : _ctx.height}%`,
          width: `${_ctx.width > 100 ? 100 : _ctx.width}%`
        })
      }, [
        renderSlot(_ctx.$slots, "pattern-container", { id: patternId.value }, () => [
          createBaseVNode("pattern", {
            id: patternId.value,
            x: unref(viewport).x % background.value.scaledGap[0],
            y: unref(viewport).y % background.value.scaledGap[1],
            width: background.value.scaledGap[0],
            height: background.value.scaledGap[1],
            patternTransform: `translate(-${background.value.offset[0]},-${background.value.offset[1]})`,
            patternUnits: "userSpaceOnUse"
          }, [
            renderSlot(_ctx.$slots, "pattern", {}, () => [
              _ctx.variant === unref(BackgroundVariant).Lines ? (openBlock(), createBlock(unref(LinePattern), {
                key: 0,
                size: _ctx.lineWidth,
                color: patternColor.value,
                dimensions: background.value.scaledGap
              }, null, 8, ["size", "color", "dimensions"])) : _ctx.variant === unref(BackgroundVariant).Dots ? (openBlock(), createBlock(unref(DotPattern), {
                key: 1,
                color: patternColor.value,
                radius: background.value.size / 2
              }, null, 8, ["color", "radius"])) : createCommentVNode("", true),
              _ctx.bgColor ? (openBlock(), createElementBlock("svg", _hoisted_2$4, [
                createBaseVNode("rect", {
                  width: "100%",
                  height: "100%",
                  fill: _ctx.bgColor
                }, null, 8, _hoisted_3$4)
              ])) : createCommentVNode("", true)
            ])
          ], 8, _hoisted_1$b)
        ]),
        createBaseVNode("rect", {
          x: _ctx.x,
          y: _ctx.y,
          width: "100%",
          height: "100%",
          fill: `url(#${patternId.value})`
        }, null, 8, _hoisted_4$3),
        renderSlot(_ctx.$slots, "default", { id: patternId.value })
      ], 4);
    };
  }
});

var graph;
var hasRequiredGraph;

function requireGraph () {
	if (hasRequiredGraph) return graph;
	hasRequiredGraph = 1;

	var DEFAULT_EDGE_NAME = "\x00";
	var GRAPH_NODE = "\x00";
	var EDGE_KEY_DELIM = "\x01";

	// Implementation notes:
	//
	//  * Node id query functions should return string ids for the nodes
	//  * Edge id query functions should return an "edgeObj", edge object, that is
	//    composed of enough information to uniquely identify an edge: {v, w, name}.
	//  * Internally we use an "edgeId", a stringified form of the edgeObj, to
	//    reference edges. This is because we need a performant way to look these
	//    edges up and, object properties, which have string keys, are the closest
	//    we're going to get to a performant hashtable in JavaScript.

	class Graph {
	  _isDirected = true;
	  _isMultigraph = false;
	  _isCompound = false;

	  // Label for the graph itself
	  _label;

	  // Defaults to be set when creating a new node
	  _defaultNodeLabelFn = () => undefined;

	  // Defaults to be set when creating a new edge
	  _defaultEdgeLabelFn = () => undefined;

	  // v -> label
	  _nodes = {};

	  // v -> edgeObj
	  _in = {};

	  // u -> v -> Number
	  _preds = {};

	  // v -> edgeObj
	  _out = {};

	  // v -> w -> Number
	  _sucs = {};

	  // e -> edgeObj
	  _edgeObjs = {};

	  // e -> label
	  _edgeLabels = {};

	  /* Number of nodes in the graph. Should only be changed by the implementation. */
	  _nodeCount = 0;

	  /* Number of edges in the graph. Should only be changed by the implementation. */
	  _edgeCount = 0;

	  _parent;

	  _children;

	  constructor(opts) {
	    if (opts) {
	      this._isDirected = Object.hasOwn(opts, "directed") ? opts.directed : true;
	      this._isMultigraph = Object.hasOwn(opts, "multigraph") ? opts.multigraph : false;
	      this._isCompound = Object.hasOwn(opts, "compound") ? opts.compound : false;
	    }

	    if (this._isCompound) {
	      // v -> parent
	      this._parent = {};

	      // v -> children
	      this._children = {};
	      this._children[GRAPH_NODE] = {};
	    }
	  }

	  /* === Graph functions ========= */

	  /**
	   * Whether graph was created with 'directed' flag set to true or not.
	   */
	  isDirected() {
	    return this._isDirected;
	  }

	  /**
	   * Whether graph was created with 'multigraph' flag set to true or not.
	   */
	  isMultigraph() {
	    return this._isMultigraph;
	  }

	  /**
	   * Whether graph was created with 'compound' flag set to true or not.
	   */
	  isCompound() {
	    return this._isCompound;
	  }

	  /**
	   * Sets the label of the graph.
	   */
	  setGraph(label) {
	    this._label = label;
	    return this;
	  }

	  /**
	   * Gets the graph label.
	   */
	  graph() {
	    return this._label;
	  }


	  /* === Node functions ========== */

	  /**
	   * Sets the default node label. If newDefault is a function, it will be
	   * invoked ach time when setting a label for a node. Otherwise, this label
	   * will be assigned as default label in case if no label was specified while
	   * setting a node.
	   * Complexity: O(1).
	   */
	  setDefaultNodeLabel(newDefault) {
	    this._defaultNodeLabelFn = newDefault;
	    if (typeof newDefault !== 'function') {
	      this._defaultNodeLabelFn = () => newDefault;
	    }

	    return this;
	  }

	  /**
	   * Gets the number of nodes in the graph.
	   * Complexity: O(1).
	   */
	  nodeCount() {
	    return this._nodeCount;
	  }

	  /**
	   * Gets all nodes of the graph. Note, the in case of compound graph subnodes are
	   * not included in list.
	   * Complexity: O(1).
	   */
	  nodes() {
	    return Object.keys(this._nodes);
	  }

	  /**
	   * Gets list of nodes without in-edges.
	   * Complexity: O(|V|).
	   */
	  sources() {
	    var self = this;
	    return this.nodes().filter(v => Object.keys(self._in[v]).length === 0);
	  }

	  /**
	   * Gets list of nodes without out-edges.
	   * Complexity: O(|V|).
	   */
	  sinks() {
	    var self = this;
	    return this.nodes().filter(v => Object.keys(self._out[v]).length === 0);
	  }

	  /**
	   * Invokes setNode method for each node in names list.
	   * Complexity: O(|names|).
	   */
	  setNodes(vs, value) {
	    var args = arguments;
	    var self = this;
	    vs.forEach(function(v) {
	      if (args.length > 1) {
	        self.setNode(v, value);
	      } else {
	        self.setNode(v);
	      }
	    });
	    return this;
	  }

	  /**
	   * Creates or updates the value for the node v in the graph. If label is supplied
	   * it is set as the value for the node. If label is not supplied and the node was
	   * created by this call then the default node label will be assigned.
	   * Complexity: O(1).
	   */
	  setNode(v, value) {
	    if (Object.hasOwn(this._nodes, v)) {
	      if (arguments.length > 1) {
	        this._nodes[v] = value;
	      }
	      return this;
	    }

	    this._nodes[v] = arguments.length > 1 ? value : this._defaultNodeLabelFn(v);
	    if (this._isCompound) {
	      this._parent[v] = GRAPH_NODE;
	      this._children[v] = {};
	      this._children[GRAPH_NODE][v] = true;
	    }
	    this._in[v] = {};
	    this._preds[v] = {};
	    this._out[v] = {};
	    this._sucs[v] = {};
	    ++this._nodeCount;
	    return this;
	  }

	  /**
	   * Gets the label of node with specified name.
	   * Complexity: O(|V|).
	   */
	  node(v) {
	    return this._nodes[v];
	  }

	  /**
	   * Detects whether graph has a node with specified name or not.
	   */
	  hasNode(v) {
	    return Object.hasOwn(this._nodes, v);
	  }

	  /**
	   * Remove the node with the name from the graph or do nothing if the node is not in
	   * the graph. If the node was removed this function also removes any incident
	   * edges.
	   * Complexity: O(1).
	   */
	  removeNode(v) {
	    var self = this;
	    if (Object.hasOwn(this._nodes, v)) {
	      var removeEdge = e => self.removeEdge(self._edgeObjs[e]);
	      delete this._nodes[v];
	      if (this._isCompound) {
	        this._removeFromParentsChildList(v);
	        delete this._parent[v];
	        this.children(v).forEach(function(child) {
	          self.setParent(child);
	        });
	        delete this._children[v];
	      }
	      Object.keys(this._in[v]).forEach(removeEdge);
	      delete this._in[v];
	      delete this._preds[v];
	      Object.keys(this._out[v]).forEach(removeEdge);
	      delete this._out[v];
	      delete this._sucs[v];
	      --this._nodeCount;
	    }
	    return this;
	  }

	  /**
	   * Sets node p as a parent for node v if it is defined, or removes the
	   * parent for v if p is undefined. Method throws an exception in case of
	   * invoking it in context of noncompound graph.
	   * Average-case complexity: O(1).
	   */
	  setParent(v, parent) {
	    if (!this._isCompound) {
	      throw new Error("Cannot set parent in a non-compound graph");
	    }

	    if (parent === undefined) {
	      parent = GRAPH_NODE;
	    } else {
	      // Coerce parent to string
	      parent += "";
	      for (var ancestor = parent; ancestor !== undefined; ancestor = this.parent(ancestor)) {
	        if (ancestor === v) {
	          throw new Error("Setting " + parent+ " as parent of " + v +
	              " would create a cycle");
	        }
	      }

	      this.setNode(parent);
	    }

	    this.setNode(v);
	    this._removeFromParentsChildList(v);
	    this._parent[v] = parent;
	    this._children[parent][v] = true;
	    return this;
	  }

	  _removeFromParentsChildList(v) {
	    delete this._children[this._parent[v]][v];
	  }

	  /**
	   * Gets parent node for node v.
	   * Complexity: O(1).
	   */
	  parent(v) {
	    if (this._isCompound) {
	      var parent = this._parent[v];
	      if (parent !== GRAPH_NODE) {
	        return parent;
	      }
	    }
	  }

	  /**
	   * Gets list of direct children of node v.
	   * Complexity: O(1).
	   */
	  children(v = GRAPH_NODE) {
	    if (this._isCompound) {
	      var children = this._children[v];
	      if (children) {
	        return Object.keys(children);
	      }
	    } else if (v === GRAPH_NODE) {
	      return this.nodes();
	    } else if (this.hasNode(v)) {
	      return [];
	    }
	  }

	  /**
	   * Return all nodes that are predecessors of the specified node or undefined if node v is not in
	   * the graph. Behavior is undefined for undirected graphs - use neighbors instead.
	   * Complexity: O(|V|).
	   */
	  predecessors(v) {
	    var predsV = this._preds[v];
	    if (predsV) {
	      return Object.keys(predsV);
	    }
	  }

	  /**
	   * Return all nodes that are successors of the specified node or undefined if node v is not in
	   * the graph. Behavior is undefined for undirected graphs - use neighbors instead.
	   * Complexity: O(|V|).
	   */
	  successors(v) {
	    var sucsV = this._sucs[v];
	    if (sucsV) {
	      return Object.keys(sucsV);
	    }
	  }

	  /**
	   * Return all nodes that are predecessors or successors of the specified node or undefined if
	   * node v is not in the graph.
	   * Complexity: O(|V|).
	   */
	  neighbors(v) {
	    var preds = this.predecessors(v);
	    if (preds) {
	      const union = new Set(preds);
	      for (var succ of this.successors(v)) {
	        union.add(succ);
	      }

	      return Array.from(union.values());
	    }
	  }

	  isLeaf(v) {
	    var neighbors;
	    if (this.isDirected()) {
	      neighbors = this.successors(v);
	    } else {
	      neighbors = this.neighbors(v);
	    }
	    return neighbors.length === 0;
	  }

	  /**
	   * Creates new graph with nodes filtered via filter. Edges incident to rejected node
	   * are also removed. In case of compound graph, if parent is rejected by filter,
	   * than all its children are rejected too.
	   * Average-case complexity: O(|E|+|V|).
	   */
	  filterNodes(filter) {
	    var copy = new this.constructor({
	      directed: this._isDirected,
	      multigraph: this._isMultigraph,
	      compound: this._isCompound
	    });

	    copy.setGraph(this.graph());

	    var self = this;
	    Object.entries(this._nodes).forEach(function([v, value]) {
	      if (filter(v)) {
	        copy.setNode(v, value);
	      }
	    });

	    Object.values(this._edgeObjs).forEach(function(e) {
	      if (copy.hasNode(e.v) && copy.hasNode(e.w)) {
	        copy.setEdge(e, self.edge(e));
	      }
	    });

	    var parents = {};
	    function findParent(v) {
	      var parent = self.parent(v);
	      if (parent === undefined || copy.hasNode(parent)) {
	        parents[v] = parent;
	        return parent;
	      } else if (parent in parents) {
	        return parents[parent];
	      } else {
	        return findParent(parent);
	      }
	    }

	    if (this._isCompound) {
	      copy.nodes().forEach(v => copy.setParent(v, findParent(v)));
	    }

	    return copy;
	  }

	  /* === Edge functions ========== */

	  /**
	   * Sets the default edge label or factory function. This label will be
	   * assigned as default label in case if no label was specified while setting
	   * an edge or this function will be invoked each time when setting an edge
	   * with no label specified and returned value * will be used as a label for edge.
	   * Complexity: O(1).
	   */
	  setDefaultEdgeLabel(newDefault) {
	    this._defaultEdgeLabelFn = newDefault;
	    if (typeof newDefault !== 'function') {
	      this._defaultEdgeLabelFn = () => newDefault;
	    }

	    return this;
	  }

	  /**
	   * Gets the number of edges in the graph.
	   * Complexity: O(1).
	   */
	  edgeCount() {
	    return this._edgeCount;
	  }

	  /**
	   * Gets edges of the graph. In case of compound graph subgraphs are not considered.
	   * Complexity: O(|E|).
	   */
	  edges() {
	    return Object.values(this._edgeObjs);
	  }

	  /**
	   * Establish an edges path over the nodes in nodes list. If some edge is already
	   * exists, it will update its label, otherwise it will create an edge between pair
	   * of nodes with label provided or default label if no label provided.
	   * Complexity: O(|nodes|).
	   */
	  setPath(vs, value) {
	    var self = this;
	    var args = arguments;
	    vs.reduce(function(v, w) {
	      if (args.length > 1) {
	        self.setEdge(v, w, value);
	      } else {
	        self.setEdge(v, w);
	      }
	      return w;
	    });
	    return this;
	  }

	  /**
	   * Creates or updates the label for the edge (v, w) with the optionally supplied
	   * name. If label is supplied it is set as the value for the edge. If label is not
	   * supplied and the edge was created by this call then the default edge label will
	   * be assigned. The name parameter is only useful with multigraphs.
	   */
	  setEdge() {
	    var v, w, name, value;
	    var valueSpecified = false;
	    var arg0 = arguments[0];

	    if (typeof arg0 === "object" && arg0 !== null && "v" in arg0) {
	      v = arg0.v;
	      w = arg0.w;
	      name = arg0.name;
	      if (arguments.length === 2) {
	        value = arguments[1];
	        valueSpecified = true;
	      }
	    } else {
	      v = arg0;
	      w = arguments[1];
	      name = arguments[3];
	      if (arguments.length > 2) {
	        value = arguments[2];
	        valueSpecified = true;
	      }
	    }

	    v = "" + v;
	    w = "" + w;
	    if (name !== undefined) {
	      name = "" + name;
	    }

	    var e = edgeArgsToId(this._isDirected, v, w, name);
	    if (Object.hasOwn(this._edgeLabels, e)) {
	      if (valueSpecified) {
	        this._edgeLabels[e] = value;
	      }
	      return this;
	    }

	    if (name !== undefined && !this._isMultigraph) {
	      throw new Error("Cannot set a named edge when isMultigraph = false");
	    }

	    // It didn't exist, so we need to create it.
	    // First ensure the nodes exist.
	    this.setNode(v);
	    this.setNode(w);

	    this._edgeLabels[e] = valueSpecified ? value : this._defaultEdgeLabelFn(v, w, name);

	    var edgeObj = edgeArgsToObj(this._isDirected, v, w, name);
	    // Ensure we add undirected edges in a consistent way.
	    v = edgeObj.v;
	    w = edgeObj.w;

	    Object.freeze(edgeObj);
	    this._edgeObjs[e] = edgeObj;
	    incrementOrInitEntry(this._preds[w], v);
	    incrementOrInitEntry(this._sucs[v], w);
	    this._in[w][e] = edgeObj;
	    this._out[v][e] = edgeObj;
	    this._edgeCount++;
	    return this;
	  }

	  /**
	   * Gets the label for the specified edge.
	   * Complexity: O(1).
	   */
	  edge(v, w, name) {
	    var e = (arguments.length === 1
	      ? edgeObjToId(this._isDirected, arguments[0])
	      : edgeArgsToId(this._isDirected, v, w, name));
	    return this._edgeLabels[e];
	  }

	  /**
	   * Gets the label for the specified edge and converts it to an object.
	   * Complexity: O(1)
	   */
	  edgeAsObj() {
	    const edge = this.edge(...arguments);
	    if (typeof edge !== "object") {
	      return {label: edge};
	    }

	    return edge;
	  }

	  /**
	   * Detects whether the graph contains specified edge or not. No subgraphs are considered.
	   * Complexity: O(1).
	   */
	  hasEdge(v, w, name) {
	    var e = (arguments.length === 1
	      ? edgeObjToId(this._isDirected, arguments[0])
	      : edgeArgsToId(this._isDirected, v, w, name));
	    return Object.hasOwn(this._edgeLabels, e);
	  }

	  /**
	   * Removes the specified edge from the graph. No subgraphs are considered.
	   * Complexity: O(1).
	   */
	  removeEdge(v, w, name) {
	    var e = (arguments.length === 1
	      ? edgeObjToId(this._isDirected, arguments[0])
	      : edgeArgsToId(this._isDirected, v, w, name));
	    var edge = this._edgeObjs[e];
	    if (edge) {
	      v = edge.v;
	      w = edge.w;
	      delete this._edgeLabels[e];
	      delete this._edgeObjs[e];
	      decrementOrRemoveEntry(this._preds[w], v);
	      decrementOrRemoveEntry(this._sucs[v], w);
	      delete this._in[w][e];
	      delete this._out[v][e];
	      this._edgeCount--;
	    }
	    return this;
	  }

	  /**
	   * Return all edges that point to the node v. Optionally filters those edges down to just those
	   * coming from node u. Behavior is undefined for undirected graphs - use nodeEdges instead.
	   * Complexity: O(|E|).
	   */
	  inEdges(v, u) {
	    var inV = this._in[v];
	    if (inV) {
	      var edges = Object.values(inV);
	      if (!u) {
	        return edges;
	      }
	      return edges.filter(edge => edge.v === u);
	    }
	  }

	  /**
	   * Return all edges that are pointed at by node v. Optionally filters those edges down to just
	   * those point to w. Behavior is undefined for undirected graphs - use nodeEdges instead.
	   * Complexity: O(|E|).
	   */
	  outEdges(v, w) {
	    var outV = this._out[v];
	    if (outV) {
	      var edges = Object.values(outV);
	      if (!w) {
	        return edges;
	      }
	      return edges.filter(edge => edge.w === w);
	    }
	  }

	  /**
	   * Returns all edges to or from node v regardless of direction. Optionally filters those edges
	   * down to just those between nodes v and w regardless of direction.
	   * Complexity: O(|E|).
	   */
	  nodeEdges(v, w) {
	    var inEdges = this.inEdges(v, w);
	    if (inEdges) {
	      return inEdges.concat(this.outEdges(v, w));
	    }
	  }
	}

	function incrementOrInitEntry(map, k) {
	  if (map[k]) {
	    map[k]++;
	  } else {
	    map[k] = 1;
	  }
	}

	function decrementOrRemoveEntry(map, k) {
	  if (!--map[k]) { delete map[k]; }
	}

	function edgeArgsToId(isDirected, v_, w_, name) {
	  var v = "" + v_;
	  var w = "" + w_;
	  if (!isDirected && v > w) {
	    var tmp = v;
	    v = w;
	    w = tmp;
	  }
	  return v + EDGE_KEY_DELIM + w + EDGE_KEY_DELIM +
	             (name === undefined ? DEFAULT_EDGE_NAME : name);
	}

	function edgeArgsToObj(isDirected, v_, w_, name) {
	  var v = "" + v_;
	  var w = "" + w_;
	  if (!isDirected && v > w) {
	    var tmp = v;
	    v = w;
	    w = tmp;
	  }
	  var edgeObj =  { v: v, w: w };
	  if (name) {
	    edgeObj.name = name;
	  }
	  return edgeObj;
	}

	function edgeObjToId(isDirected, edgeObj) {
	  return edgeArgsToId(isDirected, edgeObj.v, edgeObj.w, edgeObj.name);
	}

	graph = Graph;
	return graph;
}

var version$1;
var hasRequiredVersion$1;

function requireVersion$1 () {
	if (hasRequiredVersion$1) return version$1;
	hasRequiredVersion$1 = 1;
	version$1 = '2.2.4';
	return version$1;
}

var lib;
var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;
	// Includes only the "core" of graphlib
	lib = {
	  Graph: requireGraph(),
	  version: requireVersion$1()
	};
	return lib;
}

var json;
var hasRequiredJson;

function requireJson () {
	if (hasRequiredJson) return json;
	hasRequiredJson = 1;
	var Graph = requireGraph();

	json = {
	  write: write,
	  read: read
	};

	/**
	 * Creates a JSON representation of the graph that can be serialized to a string with
	 * JSON.stringify. The graph can later be restored using json.read.
	 */
	function write(g) {
	  var json = {
	    options: {
	      directed: g.isDirected(),
	      multigraph: g.isMultigraph(),
	      compound: g.isCompound()
	    },
	    nodes: writeNodes(g),
	    edges: writeEdges(g)
	  };

	  if (g.graph() !== undefined) {
	    json.value = structuredClone(g.graph());
	  }
	  return json;
	}

	function writeNodes(g) {
	  return g.nodes().map(function(v) {
	    var nodeValue = g.node(v);
	    var parent = g.parent(v);
	    var node = { v: v };
	    if (nodeValue !== undefined) {
	      node.value = nodeValue;
	    }
	    if (parent !== undefined) {
	      node.parent = parent;
	    }
	    return node;
	  });
	}

	function writeEdges(g) {
	  return g.edges().map(function(e) {
	    var edgeValue = g.edge(e);
	    var edge = { v: e.v, w: e.w };
	    if (e.name !== undefined) {
	      edge.name = e.name;
	    }
	    if (edgeValue !== undefined) {
	      edge.value = edgeValue;
	    }
	    return edge;
	  });
	}

	/**
	 * Takes JSON as input and returns the graph representation.
	 *
	 * @example
	 * var g2 = graphlib.json.read(JSON.parse(str));
	 * g2.nodes();
	 * // ['a', 'b']
	 * g2.edges()
	 * // [ { v: 'a', w: 'b' } ]
	 */
	function read(json) {
	  var g = new Graph(json.options).setGraph(json.value);
	  json.nodes.forEach(function(entry) {
	    g.setNode(entry.v, entry.value);
	    if (entry.parent) {
	      g.setParent(entry.v, entry.parent);
	    }
	  });
	  json.edges.forEach(function(entry) {
	    g.setEdge({ v: entry.v, w: entry.w, name: entry.name }, entry.value);
	  });
	  return g;
	}
	return json;
}

var components_1;
var hasRequiredComponents;

function requireComponents () {
	if (hasRequiredComponents) return components_1;
	hasRequiredComponents = 1;
	components_1 = components;

	function components(g) {
	  var visited = {};
	  var cmpts = [];
	  var cmpt;

	  function dfs(v) {
	    if (Object.hasOwn(visited, v)) return;
	    visited[v] = true;
	    cmpt.push(v);
	    g.successors(v).forEach(dfs);
	    g.predecessors(v).forEach(dfs);
	  }

	  g.nodes().forEach(function(v) {
	    cmpt = [];
	    dfs(v);
	    if (cmpt.length) {
	      cmpts.push(cmpt);
	    }
	  });

	  return cmpts;
	}
	return components_1;
}

/**
 * A min-priority queue data structure. This algorithm is derived from Cormen,
 * et al., "Introduction to Algorithms". The basic idea of a min-priority
 * queue is that you can efficiently (in O(1) time) get the smallest key in
 * the queue. Adding and removing elements takes O(log n) time. A key can
 * have its priority decreased in O(log n) time.
 */

var priorityQueue;
var hasRequiredPriorityQueue;

function requirePriorityQueue () {
	if (hasRequiredPriorityQueue) return priorityQueue;
	hasRequiredPriorityQueue = 1;
	class PriorityQueue {
	  _arr = [];
	  _keyIndices = {};

	  /**
	   * Returns the number of elements in the queue. Takes `O(1)` time.
	   */
	  size() {
	    return this._arr.length;
	  }

	  /**
	   * Returns the keys that are in the queue. Takes `O(n)` time.
	   */
	  keys() {
	    return this._arr.map(function(x) { return x.key; });
	  }

	  /**
	   * Returns `true` if **key** is in the queue and `false` if not.
	   */
	  has(key) {
	    return Object.hasOwn(this._keyIndices, key);
	  }

	  /**
	   * Returns the priority for **key**. If **key** is not present in the queue
	   * then this function returns `undefined`. Takes `O(1)` time.
	   *
	   * @param {Object} key
	   */
	  priority(key) {
	    var index = this._keyIndices[key];
	    if (index !== undefined) {
	      return this._arr[index].priority;
	    }
	  }

	  /**
	   * Returns the key for the minimum element in this queue. If the queue is
	   * empty this function throws an Error. Takes `O(1)` time.
	   */
	  min() {
	    if (this.size() === 0) {
	      throw new Error("Queue underflow");
	    }
	    return this._arr[0].key;
	  }

	  /**
	   * Inserts a new key into the priority queue. If the key already exists in
	   * the queue this function returns `false`; otherwise it will return `true`.
	   * Takes `O(n)` time.
	   *
	   * @param {Object} key the key to add
	   * @param {Number} priority the initial priority for the key
	   */
	  add(key, priority) {
	    var keyIndices = this._keyIndices;
	    key = String(key);
	    if (!Object.hasOwn(keyIndices, key)) {
	      var arr = this._arr;
	      var index = arr.length;
	      keyIndices[key] = index;
	      arr.push({key: key, priority: priority});
	      this._decrease(index);
	      return true;
	    }
	    return false;
	  }

	  /**
	   * Removes and returns the smallest key in the queue. Takes `O(log n)` time.
	   */
	  removeMin() {
	    this._swap(0, this._arr.length - 1);
	    var min = this._arr.pop();
	    delete this._keyIndices[min.key];
	    this._heapify(0);
	    return min.key;
	  }

	  /**
	   * Decreases the priority for **key** to **priority**. If the new priority is
	   * greater than the previous priority, this function will throw an Error.
	   *
	   * @param {Object} key the key for which to raise priority
	   * @param {Number} priority the new priority for the key
	   */
	  decrease(key, priority) {
	    var index = this._keyIndices[key];
	    if (priority > this._arr[index].priority) {
	      throw new Error("New priority is greater than current priority. " +
	          "Key: " + key + " Old: " + this._arr[index].priority + " New: " + priority);
	    }
	    this._arr[index].priority = priority;
	    this._decrease(index);
	  }

	  _heapify(i) {
	    var arr = this._arr;
	    var l = 2 * i;
	    var r = l + 1;
	    var largest = i;
	    if (l < arr.length) {
	      largest = arr[l].priority < arr[largest].priority ? l : largest;
	      if (r < arr.length) {
	        largest = arr[r].priority < arr[largest].priority ? r : largest;
	      }
	      if (largest !== i) {
	        this._swap(i, largest);
	        this._heapify(largest);
	      }
	    }
	  }

	  _decrease(index) {
	    var arr = this._arr;
	    var priority = arr[index].priority;
	    var parent;
	    while (index !== 0) {
	      parent = index >> 1;
	      if (arr[parent].priority < priority) {
	        break;
	      }
	      this._swap(index, parent);
	      index = parent;
	    }
	  }

	  _swap(i, j) {
	    var arr = this._arr;
	    var keyIndices = this._keyIndices;
	    var origArrI = arr[i];
	    var origArrJ = arr[j];
	    arr[i] = origArrJ;
	    arr[j] = origArrI;
	    keyIndices[origArrJ.key] = i;
	    keyIndices[origArrI.key] = j;
	  }
	}

	priorityQueue = PriorityQueue;
	return priorityQueue;
}

var dijkstra_1;
var hasRequiredDijkstra;

function requireDijkstra () {
	if (hasRequiredDijkstra) return dijkstra_1;
	hasRequiredDijkstra = 1;
	var PriorityQueue = requirePriorityQueue();

	dijkstra_1 = dijkstra;

	var DEFAULT_WEIGHT_FUNC = () => 1;

	function dijkstra(g, source, weightFn, edgeFn) {
	  return runDijkstra(g, String(source),
	    weightFn || DEFAULT_WEIGHT_FUNC,
	    edgeFn || function(v) { return g.outEdges(v); });
	}

	function runDijkstra(g, source, weightFn, edgeFn) {
	  var results = {};
	  var pq = new PriorityQueue();
	  var v, vEntry;

	  var updateNeighbors = function(edge) {
	    var w = edge.v !== v ? edge.v : edge.w;
	    var wEntry = results[w];
	    var weight = weightFn(edge);
	    var distance = vEntry.distance + weight;

	    if (weight < 0) {
	      throw new Error("dijkstra does not allow negative edge weights. " +
	                      "Bad edge: " + edge + " Weight: " + weight);
	    }

	    if (distance < wEntry.distance) {
	      wEntry.distance = distance;
	      wEntry.predecessor = v;
	      pq.decrease(w, distance);
	    }
	  };

	  g.nodes().forEach(function(v) {
	    var distance = v === source ? 0 : Number.POSITIVE_INFINITY;
	    results[v] = { distance: distance };
	    pq.add(v, distance);
	  });

	  while (pq.size() > 0) {
	    v = pq.removeMin();
	    vEntry = results[v];
	    if (vEntry.distance === Number.POSITIVE_INFINITY) {
	      break;
	    }

	    edgeFn(v).forEach(updateNeighbors);
	  }

	  return results;
	}
	return dijkstra_1;
}

var dijkstraAll_1;
var hasRequiredDijkstraAll;

function requireDijkstraAll () {
	if (hasRequiredDijkstraAll) return dijkstraAll_1;
	hasRequiredDijkstraAll = 1;
	var dijkstra = requireDijkstra();

	dijkstraAll_1 = dijkstraAll;

	function dijkstraAll(g, weightFunc, edgeFunc) {
	  return g.nodes().reduce(function(acc, v) {
	    acc[v] = dijkstra(g, v, weightFunc, edgeFunc);
	    return acc;
	  }, {});
	}
	return dijkstraAll_1;
}

var tarjan_1;
var hasRequiredTarjan;

function requireTarjan () {
	if (hasRequiredTarjan) return tarjan_1;
	hasRequiredTarjan = 1;
	tarjan_1 = tarjan;

	function tarjan(g) {
	  var index = 0;
	  var stack = [];
	  var visited = {}; // node id -> { onStack, lowlink, index }
	  var results = [];

	  function dfs(v) {
	    var entry = visited[v] = {
	      onStack: true,
	      lowlink: index,
	      index: index++
	    };
	    stack.push(v);

	    g.successors(v).forEach(function(w) {
	      if (!Object.hasOwn(visited, w)) {
	        dfs(w);
	        entry.lowlink = Math.min(entry.lowlink, visited[w].lowlink);
	      } else if (visited[w].onStack) {
	        entry.lowlink = Math.min(entry.lowlink, visited[w].index);
	      }
	    });

	    if (entry.lowlink === entry.index) {
	      var cmpt = [];
	      var w;
	      do {
	        w = stack.pop();
	        visited[w].onStack = false;
	        cmpt.push(w);
	      } while (v !== w);
	      results.push(cmpt);
	    }
	  }

	  g.nodes().forEach(function(v) {
	    if (!Object.hasOwn(visited, v)) {
	      dfs(v);
	    }
	  });

	  return results;
	}
	return tarjan_1;
}

var findCycles_1;
var hasRequiredFindCycles;

function requireFindCycles () {
	if (hasRequiredFindCycles) return findCycles_1;
	hasRequiredFindCycles = 1;
	var tarjan = requireTarjan();

	findCycles_1 = findCycles;

	function findCycles(g) {
	  return tarjan(g).filter(function(cmpt) {
	    return cmpt.length > 1 || (cmpt.length === 1 && g.hasEdge(cmpt[0], cmpt[0]));
	  });
	}
	return findCycles_1;
}

var floydWarshall_1;
var hasRequiredFloydWarshall;

function requireFloydWarshall () {
	if (hasRequiredFloydWarshall) return floydWarshall_1;
	hasRequiredFloydWarshall = 1;
	floydWarshall_1 = floydWarshall;

	var DEFAULT_WEIGHT_FUNC = () => 1;

	function floydWarshall(g, weightFn, edgeFn) {
	  return runFloydWarshall(g,
	    weightFn || DEFAULT_WEIGHT_FUNC,
	    edgeFn || function(v) { return g.outEdges(v); });
	}

	function runFloydWarshall(g, weightFn, edgeFn) {
	  var results = {};
	  var nodes = g.nodes();

	  nodes.forEach(function(v) {
	    results[v] = {};
	    results[v][v] = { distance: 0 };
	    nodes.forEach(function(w) {
	      if (v !== w) {
	        results[v][w] = { distance: Number.POSITIVE_INFINITY };
	      }
	    });
	    edgeFn(v).forEach(function(edge) {
	      var w = edge.v === v ? edge.w : edge.v;
	      var d = weightFn(edge);
	      results[v][w] = { distance: d, predecessor: v };
	    });
	  });

	  nodes.forEach(function(k) {
	    var rowK = results[k];
	    nodes.forEach(function(i) {
	      var rowI = results[i];
	      nodes.forEach(function(j) {
	        var ik = rowI[k];
	        var kj = rowK[j];
	        var ij = rowI[j];
	        var altDistance = ik.distance + kj.distance;
	        if (altDistance < ij.distance) {
	          ij.distance = altDistance;
	          ij.predecessor = kj.predecessor;
	        }
	      });
	    });
	  });

	  return results;
	}
	return floydWarshall_1;
}

var topsort_1;
var hasRequiredTopsort;

function requireTopsort () {
	if (hasRequiredTopsort) return topsort_1;
	hasRequiredTopsort = 1;
	function topsort(g) {
	  var visited = {};
	  var stack = {};
	  var results = [];

	  function visit(node) {
	    if (Object.hasOwn(stack, node)) {
	      throw new CycleException();
	    }

	    if (!Object.hasOwn(visited, node)) {
	      stack[node] = true;
	      visited[node] = true;
	      g.predecessors(node).forEach(visit);
	      delete stack[node];
	      results.push(node);
	    }
	  }

	  g.sinks().forEach(visit);

	  if (Object.keys(visited).length !== g.nodeCount()) {
	    throw new CycleException();
	  }

	  return results;
	}

	class CycleException extends Error {
	  constructor() {
	    super(...arguments);
	  }
	}

	topsort_1 = topsort;
	topsort.CycleException = CycleException;
	return topsort_1;
}

var isAcyclic_1;
var hasRequiredIsAcyclic;

function requireIsAcyclic () {
	if (hasRequiredIsAcyclic) return isAcyclic_1;
	hasRequiredIsAcyclic = 1;
	var topsort = requireTopsort();

	isAcyclic_1 = isAcyclic;

	function isAcyclic(g) {
	  try {
	    topsort(g);
	  } catch (e) {
	    if (e instanceof topsort.CycleException) {
	      return false;
	    }
	    throw e;
	  }
	  return true;
	}
	return isAcyclic_1;
}

var dfs_1;
var hasRequiredDfs;

function requireDfs () {
	if (hasRequiredDfs) return dfs_1;
	hasRequiredDfs = 1;
	dfs_1 = dfs;

	/*
	 * A helper that preforms a pre- or post-order traversal on the input graph
	 * and returns the nodes in the order they were visited. If the graph is
	 * undirected then this algorithm will navigate using neighbors. If the graph
	 * is directed then this algorithm will navigate using successors.
	 *
	 * If the order is not "post", it will be treated as "pre".
	 */
	function dfs(g, vs, order) {
	  if (!Array.isArray(vs)) {
	    vs = [vs];
	  }

	  var navigation = g.isDirected() ? v => g.successors(v) : v => g.neighbors(v);
	  var orderFunc = order === "post" ? postOrderDfs : preOrderDfs;

	  var acc = [];
	  var visited = {};
	  vs.forEach(v => {
	    if (!g.hasNode(v)) {
	      throw new Error("Graph does not have node: " + v);
	    }

	    orderFunc(v, navigation, visited, acc);
	  });

	  return acc;
	}

	function postOrderDfs(v, navigation, visited, acc) {
	  var stack = [[v, false]];
	  while (stack.length > 0) {
	    var curr = stack.pop();
	    if (curr[1]) {
	      acc.push(curr[0]);
	    } else {
	      if (!Object.hasOwn(visited, curr[0])) {
	        visited[curr[0]] = true;
	        stack.push([curr[0], true]);
	        forEachRight(navigation(curr[0]), w => stack.push([w, false]));
	      }
	    }
	  }
	}

	function preOrderDfs(v, navigation, visited, acc) {
	  var stack = [v];
	  while (stack.length > 0) {
	    var curr = stack.pop();
	    if (!Object.hasOwn(visited, curr)) {
	      visited[curr] = true;
	      acc.push(curr);
	      forEachRight(navigation(curr), w => stack.push(w));
	    }
	  }
	}

	function forEachRight(array, iteratee) {
	  var length = array.length;
	  while (length--) {
	    iteratee(array[length], length, array);
	  }

	  return array;
	}
	return dfs_1;
}

var postorder_1;
var hasRequiredPostorder;

function requirePostorder () {
	if (hasRequiredPostorder) return postorder_1;
	hasRequiredPostorder = 1;
	var dfs = requireDfs();

	postorder_1 = postorder;

	function postorder(g, vs) {
	  return dfs(g, vs, "post");
	}
	return postorder_1;
}

var preorder_1;
var hasRequiredPreorder;

function requirePreorder () {
	if (hasRequiredPreorder) return preorder_1;
	hasRequiredPreorder = 1;
	var dfs = requireDfs();

	preorder_1 = preorder;

	function preorder(g, vs) {
	  return dfs(g, vs, "pre");
	}
	return preorder_1;
}

var prim_1;
var hasRequiredPrim;

function requirePrim () {
	if (hasRequiredPrim) return prim_1;
	hasRequiredPrim = 1;
	var Graph = requireGraph();
	var PriorityQueue = requirePriorityQueue();

	prim_1 = prim;

	function prim(g, weightFunc) {
	  var result = new Graph();
	  var parents = {};
	  var pq = new PriorityQueue();
	  var v;

	  function updateNeighbors(edge) {
	    var w = edge.v === v ? edge.w : edge.v;
	    var pri = pq.priority(w);
	    if (pri !== undefined) {
	      var edgeWeight = weightFunc(edge);
	      if (edgeWeight < pri) {
	        parents[w] = v;
	        pq.decrease(w, edgeWeight);
	      }
	    }
	  }

	  if (g.nodeCount() === 0) {
	    return result;
	  }

	  g.nodes().forEach(function(v) {
	    pq.add(v, Number.POSITIVE_INFINITY);
	    result.setNode(v);
	  });

	  // Start from an arbitrary node
	  pq.decrease(g.nodes()[0], 0);

	  var init = false;
	  while (pq.size() > 0) {
	    v = pq.removeMin();
	    if (Object.hasOwn(parents, v)) {
	      result.setEdge(v, parents[v]);
	    } else if (init) {
	      throw new Error("Input graph is not connected: " + g);
	    } else {
	      init = true;
	    }

	    g.nodeEdges(v).forEach(updateNeighbors);
	  }

	  return result;
	}
	return prim_1;
}

var alg;
var hasRequiredAlg;

function requireAlg () {
	if (hasRequiredAlg) return alg;
	hasRequiredAlg = 1;
	alg = {
	  components: requireComponents(),
	  dijkstra: requireDijkstra(),
	  dijkstraAll: requireDijkstraAll(),
	  findCycles: requireFindCycles(),
	  floydWarshall: requireFloydWarshall(),
	  isAcyclic: requireIsAcyclic(),
	  postorder: requirePostorder(),
	  preorder: requirePreorder(),
	  prim: requirePrim(),
	  tarjan: requireTarjan(),
	  topsort: requireTopsort()
	};
	return alg;
}

/**
 * Copyright (c) 2014, Chris Pettitt
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors
 * may be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var graphlib;
var hasRequiredGraphlib;

function requireGraphlib () {
	if (hasRequiredGraphlib) return graphlib;
	hasRequiredGraphlib = 1;
	var lib = requireLib();

	graphlib = {
	  Graph: lib.Graph,
	  json: requireJson(),
	  alg: requireAlg(),
	  version: lib.version
	};
	return graphlib;
}

/*
 * Simple doubly linked list implementation derived from Cormen, et al.,
 * "Introduction to Algorithms".
 */

var list;
var hasRequiredList;

function requireList () {
	if (hasRequiredList) return list;
	hasRequiredList = 1;
	class List {
	  constructor() {
	    let sentinel = {};
	    sentinel._next = sentinel._prev = sentinel;
	    this._sentinel = sentinel;
	  }

	  dequeue() {
	    let sentinel = this._sentinel;
	    let entry = sentinel._prev;
	    if (entry !== sentinel) {
	      unlink(entry);
	      return entry;
	    }
	  }

	  enqueue(entry) {
	    let sentinel = this._sentinel;
	    if (entry._prev && entry._next) {
	      unlink(entry);
	    }
	    entry._next = sentinel._next;
	    sentinel._next._prev = entry;
	    sentinel._next = entry;
	    entry._prev = sentinel;
	  }

	  toString() {
	    let strs = [];
	    let sentinel = this._sentinel;
	    let curr = sentinel._prev;
	    while (curr !== sentinel) {
	      strs.push(JSON.stringify(curr, filterOutLinks));
	      curr = curr._prev;
	    }
	    return "[" + strs.join(", ") + "]";
	  }
	}

	function unlink(entry) {
	  entry._prev._next = entry._next;
	  entry._next._prev = entry._prev;
	  delete entry._next;
	  delete entry._prev;
	}

	function filterOutLinks(k, v) {
	  if (k !== "_next" && k !== "_prev") {
	    return v;
	  }
	}

	list = List;
	return list;
}

var greedyFas;
var hasRequiredGreedyFas;

function requireGreedyFas () {
	if (hasRequiredGreedyFas) return greedyFas;
	hasRequiredGreedyFas = 1;
	let Graph = requireGraphlib().Graph;
	let List = requireList();

	/*
	 * A greedy heuristic for finding a feedback arc set for a graph. A feedback
	 * arc set is a set of edges that can be removed to make a graph acyclic.
	 * The algorithm comes from: P. Eades, X. Lin, and W. F. Smyth, "A fast and
	 * effective heuristic for the feedback arc set problem." This implementation
	 * adjusts that from the paper to allow for weighted edges.
	 */
	greedyFas = greedyFAS;

	let DEFAULT_WEIGHT_FN = () => 1;

	function greedyFAS(g, weightFn) {
	  if (g.nodeCount() <= 1) {
	    return [];
	  }
	  let state = buildState(g, weightFn || DEFAULT_WEIGHT_FN);
	  let results = doGreedyFAS(state.graph, state.buckets, state.zeroIdx);

	  // Expand multi-edges
	  return results.flatMap(e => g.outEdges(e.v, e.w));
	}

	function doGreedyFAS(g, buckets, zeroIdx) {
	  let results = [];
	  let sources = buckets[buckets.length - 1];
	  let sinks = buckets[0];

	  let entry;
	  while (g.nodeCount()) {
	    while ((entry = sinks.dequeue()))   { removeNode(g, buckets, zeroIdx, entry); }
	    while ((entry = sources.dequeue())) { removeNode(g, buckets, zeroIdx, entry); }
	    if (g.nodeCount()) {
	      for (let i = buckets.length - 2; i > 0; --i) {
	        entry = buckets[i].dequeue();
	        if (entry) {
	          results = results.concat(removeNode(g, buckets, zeroIdx, entry, true));
	          break;
	        }
	      }
	    }
	  }

	  return results;
	}

	function removeNode(g, buckets, zeroIdx, entry, collectPredecessors) {
	  let results = collectPredecessors ? [] : undefined;

	  g.inEdges(entry.v).forEach(edge => {
	    let weight = g.edge(edge);
	    let uEntry = g.node(edge.v);

	    if (collectPredecessors) {
	      results.push({ v: edge.v, w: edge.w });
	    }

	    uEntry.out -= weight;
	    assignBucket(buckets, zeroIdx, uEntry);
	  });

	  g.outEdges(entry.v).forEach(edge => {
	    let weight = g.edge(edge);
	    let w = edge.w;
	    let wEntry = g.node(w);
	    wEntry["in"] -= weight;
	    assignBucket(buckets, zeroIdx, wEntry);
	  });

	  g.removeNode(entry.v);

	  return results;
	}

	function buildState(g, weightFn) {
	  let fasGraph = new Graph();
	  let maxIn = 0;
	  let maxOut = 0;

	  g.nodes().forEach(v => {
	    fasGraph.setNode(v, { v: v, "in": 0, out: 0 });
	  });

	  // Aggregate weights on nodes, but also sum the weights across multi-edges
	  // into a single edge for the fasGraph.
	  g.edges().forEach(e => {
	    let prevWeight = fasGraph.edge(e.v, e.w) || 0;
	    let weight = weightFn(e);
	    let edgeWeight = prevWeight + weight;
	    fasGraph.setEdge(e.v, e.w, edgeWeight);
	    maxOut = Math.max(maxOut, fasGraph.node(e.v).out += weight);
	    maxIn  = Math.max(maxIn,  fasGraph.node(e.w)["in"]  += weight);
	  });

	  let buckets = range(maxOut + maxIn + 3).map(() => new List());
	  let zeroIdx = maxIn + 1;

	  fasGraph.nodes().forEach(v => {
	    assignBucket(buckets, zeroIdx, fasGraph.node(v));
	  });

	  return { graph: fasGraph, buckets: buckets, zeroIdx: zeroIdx };
	}

	function assignBucket(buckets, zeroIdx, entry) {
	  if (!entry.out) {
	    buckets[0].enqueue(entry);
	  } else if (!entry["in"]) {
	    buckets[buckets.length - 1].enqueue(entry);
	  } else {
	    buckets[entry.out - entry["in"] + zeroIdx].enqueue(entry);
	  }
	}

	function range(limit) {
	  const range = [];
	  for (let i = 0; i < limit; i++) {
	    range.push(i);
	  }

	  return range;
	}
	return greedyFas;
}

/* eslint "no-console": off */

var util$1;
var hasRequiredUtil$1;

function requireUtil$1 () {
	if (hasRequiredUtil$1) return util$1;
	hasRequiredUtil$1 = 1;

	let Graph = requireGraphlib().Graph;

	util$1 = {
	  addBorderNode,
	  addDummyNode,
	  applyWithChunking,
	  asNonCompoundGraph,
	  buildLayerMatrix,
	  intersectRect,
	  mapValues,
	  maxRank,
	  normalizeRanks,
	  notime,
	  partition,
	  pick,
	  predecessorWeights,
	  range,
	  removeEmptyRanks,
	  simplify,
	  successorWeights,
	  time,
	  uniqueId,
	  zipObject,
	};

	/*
	 * Adds a dummy node to the graph and return v.
	 */
	function addDummyNode(g, type, attrs, name) {
	  var v = name;
	  while (g.hasNode(v)) {
	    v = uniqueId(name);
	  }

	  attrs.dummy = type;
	  g.setNode(v, attrs);
	  return v;
	}

	/*
	 * Returns a new graph with only simple edges. Handles aggregation of data
	 * associated with multi-edges.
	 */
	function simplify(g) {
	  let simplified = new Graph().setGraph(g.graph());
	  g.nodes().forEach(v => simplified.setNode(v, g.node(v)));
	  g.edges().forEach(e => {
	    let simpleLabel = simplified.edge(e.v, e.w) || { weight: 0, minlen: 1 };
	    let label = g.edge(e);
	    simplified.setEdge(e.v, e.w, {
	      weight: simpleLabel.weight + label.weight,
	      minlen: Math.max(simpleLabel.minlen, label.minlen)
	    });
	  });
	  return simplified;
	}

	function asNonCompoundGraph(g) {
	  let simplified = new Graph({ multigraph: g.isMultigraph() }).setGraph(g.graph());
	  g.nodes().forEach(v => {
	    if (!g.children(v).length) {
	      simplified.setNode(v, g.node(v));
	    }
	  });
	  g.edges().forEach(e => {
	    simplified.setEdge(e, g.edge(e));
	  });
	  return simplified;
	}

	function successorWeights(g) {
	  let weightMap = g.nodes().map(v => {
	    let sucs = {};
	    g.outEdges(v).forEach(e => {
	      sucs[e.w] = (sucs[e.w] || 0) + g.edge(e).weight;
	    });
	    return sucs;
	  });
	  return zipObject(g.nodes(), weightMap);
	}

	function predecessorWeights(g) {
	  let weightMap = g.nodes().map(v => {
	    let preds = {};
	    g.inEdges(v).forEach(e => {
	      preds[e.v] = (preds[e.v] || 0) + g.edge(e).weight;
	    });
	    return preds;
	  });
	  return zipObject(g.nodes(), weightMap);
	}

	/*
	 * Finds where a line starting at point ({x, y}) would intersect a rectangle
	 * ({x, y, width, height}) if it were pointing at the rectangle's center.
	 */
	function intersectRect(rect, point) {
	  let x = rect.x;
	  let y = rect.y;

	  // Rectangle intersection algorithm from:
	  // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
	  let dx = point.x - x;
	  let dy = point.y - y;
	  let w = rect.width / 2;
	  let h = rect.height / 2;

	  if (!dx && !dy) {
	    throw new Error("Not possible to find intersection inside of the rectangle");
	  }

	  let sx, sy;
	  if (Math.abs(dy) * w > Math.abs(dx) * h) {
	    // Intersection is top or bottom of rect.
	    if (dy < 0) {
	      h = -h;
	    }
	    sx = h * dx / dy;
	    sy = h;
	  } else {
	    // Intersection is left or right of rect.
	    if (dx < 0) {
	      w = -w;
	    }
	    sx = w;
	    sy = w * dy / dx;
	  }

	  return { x: x + sx, y: y + sy };
	}

	/*
	 * Given a DAG with each node assigned "rank" and "order" properties, this
	 * function will produce a matrix with the ids of each node.
	 */
	function buildLayerMatrix(g) {
	  let layering = range(maxRank(g) + 1).map(() => []);
	  g.nodes().forEach(v => {
	    let node = g.node(v);
	    let rank = node.rank;
	    if (rank !== undefined) {
	      layering[rank][node.order] = v;
	    }
	  });
	  return layering;
	}

	/*
	 * Adjusts the ranks for all nodes in the graph such that all nodes v have
	 * rank(v) >= 0 and at least one node w has rank(w) = 0.
	 */
	function normalizeRanks(g) {
	  let nodeRanks = g.nodes().map(v => {
	    let rank = g.node(v).rank;
	    if (rank === undefined) {
	      return Number.MAX_VALUE;
	    }

	    return rank;
	  });
	  let min = applyWithChunking(Math.min, nodeRanks);
	  g.nodes().forEach(v => {
	    let node = g.node(v);
	    if (Object.hasOwn(node, "rank")) {
	      node.rank -= min;
	    }
	  });
	}

	function removeEmptyRanks(g) {
	  // Ranks may not start at 0, so we need to offset them
	  let nodeRanks = g.nodes().map(v => g.node(v).rank);
	  let offset = applyWithChunking(Math.min, nodeRanks);

	  let layers = [];
	  g.nodes().forEach(v => {
	    let rank = g.node(v).rank - offset;
	    if (!layers[rank]) {
	      layers[rank] = [];
	    }
	    layers[rank].push(v);
	  });

	  let delta = 0;
	  let nodeRankFactor = g.graph().nodeRankFactor;
	  Array.from(layers).forEach((vs, i) => {
	    if (vs === undefined && i % nodeRankFactor !== 0) {
	      --delta;
	    } else if (vs !== undefined && delta) {
	      vs.forEach(v => g.node(v).rank += delta);
	    }
	  });
	}

	function addBorderNode(g, prefix, rank, order) {
	  let node = {
	    width: 0,
	    height: 0
	  };
	  if (arguments.length >= 4) {
	    node.rank = rank;
	    node.order = order;
	  }
	  return addDummyNode(g, "border", node, prefix);
	}

	function splitToChunks(array, chunkSize = CHUNKING_THRESHOLD) {
	  const chunks = [];
	  for (let i = 0; i < array.length; i += chunkSize) {
	    const chunk = array.slice(i, i + chunkSize);
	    chunks.push(chunk);
	  }
	  return chunks;
	}

	const CHUNKING_THRESHOLD = 65535;

	function applyWithChunking(fn, argsArray) {
	  if(argsArray.length > CHUNKING_THRESHOLD) {
	    const chunks = splitToChunks(argsArray);
	    return fn.apply(null, chunks.map(chunk => fn.apply(null, chunk)));
	  } else {
	    return fn.apply(null, argsArray);
	  }
	}

	function maxRank(g) {
	  const nodes = g.nodes();
	  const nodeRanks = nodes.map(v => {
	    let rank = g.node(v).rank;
	    if (rank === undefined) {
	      return Number.MIN_VALUE;
	    }
	    return rank;
	  });

	  return applyWithChunking(Math.max, nodeRanks);
	}

	/*
	 * Partition a collection into two groups: `lhs` and `rhs`. If the supplied
	 * function returns true for an entry it goes into `lhs`. Otherwise it goes
	 * into `rhs.
	 */
	function partition(collection, fn) {
	  let result = { lhs: [], rhs: [] };
	  collection.forEach(value => {
	    if (fn(value)) {
	      result.lhs.push(value);
	    } else {
	      result.rhs.push(value);
	    }
	  });
	  return result;
	}

	/*
	 * Returns a new function that wraps `fn` with a timer. The wrapper logs the
	 * time it takes to execute the function.
	 */
	function time(name, fn) {
	  let start = Date.now();
	  try {
	    return fn();
	  } finally {
	    console.log(name + " time: " + (Date.now() - start) + "ms");
	  }
	}

	function notime(name, fn) {
	  return fn();
	}

	let idCounter = 0;
	function uniqueId(prefix) {
	  var id = ++idCounter;
	  return prefix + ("" + id);
	}

	function range(start, limit, step = 1) {
	  if (limit == null) {
	    limit = start;
	    start = 0;
	  }

	  let endCon = (i) => i < limit;
	  if (step < 0) {
	    endCon = (i) => limit < i;
	  }

	  const range = [];
	  for (let i = start; endCon(i); i += step) {
	    range.push(i);
	  }

	  return range;
	}

	function pick(source, keys) {
	  const dest = {};
	  for (const key of keys) {
	    if (source[key] !== undefined) {
	      dest[key] = source[key];
	    }
	  }

	  return dest;
	}

	function mapValues(obj, funcOrProp) {
	  let func = funcOrProp;
	  if (typeof funcOrProp === 'string') {
	    func = (val) => val[funcOrProp];
	  }

	  return Object.entries(obj).reduce((acc, [k, v]) => {
	    acc[k] = func(v, k);
	    return acc;
	  }, {});
	}

	function zipObject(props, values) {
	  return props.reduce((acc, key, i) => {
	    acc[key] = values[i];
	    return acc;
	  }, {});
	}
	return util$1;
}

var acyclic;
var hasRequiredAcyclic;

function requireAcyclic () {
	if (hasRequiredAcyclic) return acyclic;
	hasRequiredAcyclic = 1;

	let greedyFAS = requireGreedyFas();
	let uniqueId = requireUtil$1().uniqueId;

	acyclic = {
	  run: run,
	  undo: undo
	};

	function run(g) {
	  let fas = (g.graph().acyclicer === "greedy"
	    ? greedyFAS(g, weightFn(g))
	    : dfsFAS(g));
	  fas.forEach(e => {
	    let label = g.edge(e);
	    g.removeEdge(e);
	    label.forwardName = e.name;
	    label.reversed = true;
	    g.setEdge(e.w, e.v, label, uniqueId("rev"));
	  });

	  function weightFn(g) {
	    return e => {
	      return g.edge(e).weight;
	    };
	  }
	}

	function dfsFAS(g) {
	  let fas = [];
	  let stack = {};
	  let visited = {};

	  function dfs(v) {
	    if (Object.hasOwn(visited, v)) {
	      return;
	    }
	    visited[v] = true;
	    stack[v] = true;
	    g.outEdges(v).forEach(e => {
	      if (Object.hasOwn(stack, e.w)) {
	        fas.push(e);
	      } else {
	        dfs(e.w);
	      }
	    });
	    delete stack[v];
	  }

	  g.nodes().forEach(dfs);
	  return fas;
	}

	function undo(g) {
	  g.edges().forEach(e => {
	    let label = g.edge(e);
	    if (label.reversed) {
	      g.removeEdge(e);

	      let forwardName = label.forwardName;
	      delete label.reversed;
	      delete label.forwardName;
	      g.setEdge(e.w, e.v, label, forwardName);
	    }
	  });
	}
	return acyclic;
}

var normalize;
var hasRequiredNormalize;

function requireNormalize () {
	if (hasRequiredNormalize) return normalize;
	hasRequiredNormalize = 1;

	let util = requireUtil$1();

	normalize = {
	  run: run,
	  undo: undo
	};

	/*
	 * Breaks any long edges in the graph into short segments that span 1 layer
	 * each. This operation is undoable with the denormalize function.
	 *
	 * Pre-conditions:
	 *
	 *    1. The input graph is a DAG.
	 *    2. Each node in the graph has a "rank" property.
	 *
	 * Post-condition:
	 *
	 *    1. All edges in the graph have a length of 1.
	 *    2. Dummy nodes are added where edges have been split into segments.
	 *    3. The graph is augmented with a "dummyChains" attribute which contains
	 *       the first dummy in each chain of dummy nodes produced.
	 */
	function run(g) {
	  g.graph().dummyChains = [];
	  g.edges().forEach(edge => normalizeEdge(g, edge));
	}

	function normalizeEdge(g, e) {
	  let v = e.v;
	  let vRank = g.node(v).rank;
	  let w = e.w;
	  let wRank = g.node(w).rank;
	  let name = e.name;
	  let edgeLabel = g.edge(e);
	  let labelRank = edgeLabel.labelRank;

	  if (wRank === vRank + 1) return;

	  g.removeEdge(e);

	  let dummy, attrs, i;
	  for (i = 0, ++vRank; vRank < wRank; ++i, ++vRank) {
	    edgeLabel.points = [];
	    attrs = {
	      width: 0, height: 0,
	      edgeLabel: edgeLabel, edgeObj: e,
	      rank: vRank
	    };
	    dummy = util.addDummyNode(g, "edge", attrs, "_d");
	    if (vRank === labelRank) {
	      attrs.width = edgeLabel.width;
	      attrs.height = edgeLabel.height;
	      attrs.dummy = "edge-label";
	      attrs.labelpos = edgeLabel.labelpos;
	    }
	    g.setEdge(v, dummy, { weight: edgeLabel.weight }, name);
	    if (i === 0) {
	      g.graph().dummyChains.push(dummy);
	    }
	    v = dummy;
	  }

	  g.setEdge(v, w, { weight: edgeLabel.weight }, name);
	}

	function undo(g) {
	  g.graph().dummyChains.forEach(v => {
	    let node = g.node(v);
	    let origLabel = node.edgeLabel;
	    let w;
	    g.setEdge(node.edgeObj, origLabel);
	    while (node.dummy) {
	      w = g.successors(v)[0];
	      g.removeNode(v);
	      origLabel.points.push({ x: node.x, y: node.y });
	      if (node.dummy === "edge-label") {
	        origLabel.x = node.x;
	        origLabel.y = node.y;
	        origLabel.width = node.width;
	        origLabel.height = node.height;
	      }
	      v = w;
	      node = g.node(v);
	    }
	  });
	}
	return normalize;
}

var util;
var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util;
	hasRequiredUtil = 1;

	const { applyWithChunking } = requireUtil$1();

	util = {
	  longestPath: longestPath,
	  slack: slack
	};

	/*
	 * Initializes ranks for the input graph using the longest path algorithm. This
	 * algorithm scales well and is fast in practice, it yields rather poor
	 * solutions. Nodes are pushed to the lowest layer possible, leaving the bottom
	 * ranks wide and leaving edges longer than necessary. However, due to its
	 * speed, this algorithm is good for getting an initial ranking that can be fed
	 * into other algorithms.
	 *
	 * This algorithm does not normalize layers because it will be used by other
	 * algorithms in most cases. If using this algorithm directly, be sure to
	 * run normalize at the end.
	 *
	 * Pre-conditions:
	 *
	 *    1. Input graph is a DAG.
	 *    2. Input graph node labels can be assigned properties.
	 *
	 * Post-conditions:
	 *
	 *    1. Each node will be assign an (unnormalized) "rank" property.
	 */
	function longestPath(g) {
	  var visited = {};

	  function dfs(v) {
	    var label = g.node(v);
	    if (Object.hasOwn(visited, v)) {
	      return label.rank;
	    }
	    visited[v] = true;

	    let outEdgesMinLens = g.outEdges(v).map(e => {
	      if (e == null) {
	        return Number.POSITIVE_INFINITY;
	      }

	      return dfs(e.w) - g.edge(e).minlen;
	    });

	    var rank = applyWithChunking(Math.min, outEdgesMinLens);

	    if (rank === Number.POSITIVE_INFINITY) {
	      rank = 0;
	    }

	    return (label.rank = rank);
	  }

	  g.sources().forEach(dfs);
	}

	/*
	 * Returns the amount of slack for the given edge. The slack is defined as the
	 * difference between the length of the edge and its minimum length.
	 */
	function slack(g, e) {
	  return g.node(e.w).rank - g.node(e.v).rank - g.edge(e).minlen;
	}
	return util;
}

var feasibleTree_1;
var hasRequiredFeasibleTree;

function requireFeasibleTree () {
	if (hasRequiredFeasibleTree) return feasibleTree_1;
	hasRequiredFeasibleTree = 1;

	var Graph = requireGraphlib().Graph;
	var slack = requireUtil().slack;

	feasibleTree_1 = feasibleTree;

	/*
	 * Constructs a spanning tree with tight edges and adjusted the input node's
	 * ranks to achieve this. A tight edge is one that is has a length that matches
	 * its "minlen" attribute.
	 *
	 * The basic structure for this function is derived from Gansner, et al., "A
	 * Technique for Drawing Directed Graphs."
	 *
	 * Pre-conditions:
	 *
	 *    1. Graph must be a DAG.
	 *    2. Graph must be connected.
	 *    3. Graph must have at least one node.
	 *    5. Graph nodes must have been previously assigned a "rank" property that
	 *       respects the "minlen" property of incident edges.
	 *    6. Graph edges must have a "minlen" property.
	 *
	 * Post-conditions:
	 *
	 *    - Graph nodes will have their rank adjusted to ensure that all edges are
	 *      tight.
	 *
	 * Returns a tree (undirected graph) that is constructed using only "tight"
	 * edges.
	 */
	function feasibleTree(g) {
	  var t = new Graph({ directed: false });

	  // Choose arbitrary node from which to start our tree
	  var start = g.nodes()[0];
	  var size = g.nodeCount();
	  t.setNode(start, {});

	  var edge, delta;
	  while (tightTree(t, g) < size) {
	    edge = findMinSlackEdge(t, g);
	    delta = t.hasNode(edge.v) ? slack(g, edge) : -slack(g, edge);
	    shiftRanks(t, g, delta);
	  }

	  return t;
	}

	/*
	 * Finds a maximal tree of tight edges and returns the number of nodes in the
	 * tree.
	 */
	function tightTree(t, g) {
	  function dfs(v) {
	    g.nodeEdges(v).forEach(e => {
	      var edgeV = e.v,
	        w = (v === edgeV) ? e.w : edgeV;
	      if (!t.hasNode(w) && !slack(g, e)) {
	        t.setNode(w, {});
	        t.setEdge(v, w, {});
	        dfs(w);
	      }
	    });
	  }

	  t.nodes().forEach(dfs);
	  return t.nodeCount();
	}

	/*
	 * Finds the edge with the smallest slack that is incident on tree and returns
	 * it.
	 */
	function findMinSlackEdge(t, g) {
	  const edges = g.edges();

	  return edges.reduce((acc, edge) => {
	    let edgeSlack = Number.POSITIVE_INFINITY;
	    if (t.hasNode(edge.v) !== t.hasNode(edge.w)) {
	      edgeSlack = slack(g, edge);
	    }

	    if (edgeSlack < acc[0]) {
	      return [edgeSlack, edge];
	    }

	    return acc;
	  }, [Number.POSITIVE_INFINITY, null])[1];
	}

	function shiftRanks(t, g, delta) {
	  t.nodes().forEach(v => g.node(v).rank += delta);
	}
	return feasibleTree_1;
}

var networkSimplex_1;
var hasRequiredNetworkSimplex;

function requireNetworkSimplex () {
	if (hasRequiredNetworkSimplex) return networkSimplex_1;
	hasRequiredNetworkSimplex = 1;

	var feasibleTree = requireFeasibleTree();
	var slack = requireUtil().slack;
	var initRank = requireUtil().longestPath;
	var preorder = requireGraphlib().alg.preorder;
	var postorder = requireGraphlib().alg.postorder;
	var simplify = requireUtil$1().simplify;

	networkSimplex_1 = networkSimplex;

	// Expose some internals for testing purposes
	networkSimplex.initLowLimValues = initLowLimValues;
	networkSimplex.initCutValues = initCutValues;
	networkSimplex.calcCutValue = calcCutValue;
	networkSimplex.leaveEdge = leaveEdge;
	networkSimplex.enterEdge = enterEdge;
	networkSimplex.exchangeEdges = exchangeEdges;

	/*
	 * The network simplex algorithm assigns ranks to each node in the input graph
	 * and iteratively improves the ranking to reduce the length of edges.
	 *
	 * Preconditions:
	 *
	 *    1. The input graph must be a DAG.
	 *    2. All nodes in the graph must have an object value.
	 *    3. All edges in the graph must have "minlen" and "weight" attributes.
	 *
	 * Postconditions:
	 *
	 *    1. All nodes in the graph will have an assigned "rank" attribute that has
	 *       been optimized by the network simplex algorithm. Ranks start at 0.
	 *
	 *
	 * A rough sketch of the algorithm is as follows:
	 *
	 *    1. Assign initial ranks to each node. We use the longest path algorithm,
	 *       which assigns ranks to the lowest position possible. In general this
	 *       leads to very wide bottom ranks and unnecessarily long edges.
	 *    2. Construct a feasible tight tree. A tight tree is one such that all
	 *       edges in the tree have no slack (difference between length of edge
	 *       and minlen for the edge). This by itself greatly improves the assigned
	 *       rankings by shorting edges.
	 *    3. Iteratively find edges that have negative cut values. Generally a
	 *       negative cut value indicates that the edge could be removed and a new
	 *       tree edge could be added to produce a more compact graph.
	 *
	 * Much of the algorithms here are derived from Gansner, et al., "A Technique
	 * for Drawing Directed Graphs." The structure of the file roughly follows the
	 * structure of the overall algorithm.
	 */
	function networkSimplex(g) {
	  g = simplify(g);
	  initRank(g);
	  var t = feasibleTree(g);
	  initLowLimValues(t);
	  initCutValues(t, g);

	  var e, f;
	  while ((e = leaveEdge(t))) {
	    f = enterEdge(t, g, e);
	    exchangeEdges(t, g, e, f);
	  }
	}

	/*
	 * Initializes cut values for all edges in the tree.
	 */
	function initCutValues(t, g) {
	  var vs = postorder(t, t.nodes());
	  vs = vs.slice(0, vs.length - 1);
	  vs.forEach(v => assignCutValue(t, g, v));
	}

	function assignCutValue(t, g, child) {
	  var childLab = t.node(child);
	  var parent = childLab.parent;
	  t.edge(child, parent).cutvalue = calcCutValue(t, g, child);
	}

	/*
	 * Given the tight tree, its graph, and a child in the graph calculate and
	 * return the cut value for the edge between the child and its parent.
	 */
	function calcCutValue(t, g, child) {
	  var childLab = t.node(child);
	  var parent = childLab.parent;
	  // True if the child is on the tail end of the edge in the directed graph
	  var childIsTail = true;
	  // The graph's view of the tree edge we're inspecting
	  var graphEdge = g.edge(child, parent);
	  // The accumulated cut value for the edge between this node and its parent
	  var cutValue = 0;

	  if (!graphEdge) {
	    childIsTail = false;
	    graphEdge = g.edge(parent, child);
	  }

	  cutValue = graphEdge.weight;

	  g.nodeEdges(child).forEach(e => {
	    var isOutEdge = e.v === child,
	      other = isOutEdge ? e.w : e.v;

	    if (other !== parent) {
	      var pointsToHead = isOutEdge === childIsTail,
	        otherWeight = g.edge(e).weight;

	      cutValue += pointsToHead ? otherWeight : -otherWeight;
	      if (isTreeEdge(t, child, other)) {
	        var otherCutValue = t.edge(child, other).cutvalue;
	        cutValue += pointsToHead ? -otherCutValue : otherCutValue;
	      }
	    }
	  });

	  return cutValue;
	}

	function initLowLimValues(tree, root) {
	  if (arguments.length < 2) {
	    root = tree.nodes()[0];
	  }
	  dfsAssignLowLim(tree, {}, 1, root);
	}

	function dfsAssignLowLim(tree, visited, nextLim, v, parent) {
	  var low = nextLim;
	  var label = tree.node(v);

	  visited[v] = true;
	  tree.neighbors(v).forEach(w => {
	    if (!Object.hasOwn(visited, w)) {
	      nextLim = dfsAssignLowLim(tree, visited, nextLim, w, v);
	    }
	  });

	  label.low = low;
	  label.lim = nextLim++;
	  if (parent) {
	    label.parent = parent;
	  } else {
	    // TODO should be able to remove this when we incrementally update low lim
	    delete label.parent;
	  }

	  return nextLim;
	}

	function leaveEdge(tree) {
	  return tree.edges().find(e => tree.edge(e).cutvalue < 0);
	}

	function enterEdge(t, g, edge) {
	  var v = edge.v;
	  var w = edge.w;

	  // For the rest of this function we assume that v is the tail and w is the
	  // head, so if we don't have this edge in the graph we should flip it to
	  // match the correct orientation.
	  if (!g.hasEdge(v, w)) {
	    v = edge.w;
	    w = edge.v;
	  }

	  var vLabel = t.node(v);
	  var wLabel = t.node(w);
	  var tailLabel = vLabel;
	  var flip = false;

	  // If the root is in the tail of the edge then we need to flip the logic that
	  // checks for the head and tail nodes in the candidates function below.
	  if (vLabel.lim > wLabel.lim) {
	    tailLabel = wLabel;
	    flip = true;
	  }

	  var candidates = g.edges().filter(edge => {
	    return flip === isDescendant(t, t.node(edge.v), tailLabel) &&
	           flip !== isDescendant(t, t.node(edge.w), tailLabel);
	  });

	  return candidates.reduce((acc, edge) => {
	    if (slack(g, edge) < slack(g, acc)) {
	      return edge;
	    }

	    return acc;
	  });
	}

	function exchangeEdges(t, g, e, f) {
	  var v = e.v;
	  var w = e.w;
	  t.removeEdge(v, w);
	  t.setEdge(f.v, f.w, {});
	  initLowLimValues(t);
	  initCutValues(t, g);
	  updateRanks(t, g);
	}

	function updateRanks(t, g) {
	  var root = t.nodes().find(v => !g.node(v).parent);
	  var vs = preorder(t, root);
	  vs = vs.slice(1);
	  vs.forEach(v => {
	    var parent = t.node(v).parent,
	      edge = g.edge(v, parent),
	      flipped = false;

	    if (!edge) {
	      edge = g.edge(parent, v);
	      flipped = true;
	    }

	    g.node(v).rank = g.node(parent).rank + (flipped ? edge.minlen : -edge.minlen);
	  });
	}

	/*
	 * Returns true if the edge is in the tree.
	 */
	function isTreeEdge(tree, u, v) {
	  return tree.hasEdge(u, v);
	}

	/*
	 * Returns true if the specified node is descendant of the root node per the
	 * assigned low and lim attributes in the tree.
	 */
	function isDescendant(tree, vLabel, rootLabel) {
	  return rootLabel.low <= vLabel.lim && vLabel.lim <= rootLabel.lim;
	}
	return networkSimplex_1;
}

var rank_1;
var hasRequiredRank;

function requireRank () {
	if (hasRequiredRank) return rank_1;
	hasRequiredRank = 1;

	var rankUtil = requireUtil();
	var longestPath = rankUtil.longestPath;
	var feasibleTree = requireFeasibleTree();
	var networkSimplex = requireNetworkSimplex();

	rank_1 = rank;

	/*
	 * Assigns a rank to each node in the input graph that respects the "minlen"
	 * constraint specified on edges between nodes.
	 *
	 * This basic structure is derived from Gansner, et al., "A Technique for
	 * Drawing Directed Graphs."
	 *
	 * Pre-conditions:
	 *
	 *    1. Graph must be a connected DAG
	 *    2. Graph nodes must be objects
	 *    3. Graph edges must have "weight" and "minlen" attributes
	 *
	 * Post-conditions:
	 *
	 *    1. Graph nodes will have a "rank" attribute based on the results of the
	 *       algorithm. Ranks can start at any index (including negative), we'll
	 *       fix them up later.
	 */
	function rank(g) {
	  var ranker = g.graph().ranker;
	  if (ranker instanceof Function) {
	    return ranker(g);
	  }

	  switch(g.graph().ranker) {
	  case "network-simplex": networkSimplexRanker(g); break;
	  case "tight-tree": tightTreeRanker(g); break;
	  case "longest-path": longestPathRanker(g); break;
	  case "none": break;
	  default: networkSimplexRanker(g);
	  }
	}

	// A fast and simple ranker, but results are far from optimal.
	var longestPathRanker = longestPath;

	function tightTreeRanker(g) {
	  longestPath(g);
	  feasibleTree(g);
	}

	function networkSimplexRanker(g) {
	  networkSimplex(g);
	}
	return rank_1;
}

var parentDummyChains_1;
var hasRequiredParentDummyChains;

function requireParentDummyChains () {
	if (hasRequiredParentDummyChains) return parentDummyChains_1;
	hasRequiredParentDummyChains = 1;
	parentDummyChains_1 = parentDummyChains;

	function parentDummyChains(g) {
	  let postorderNums = postorder(g);

	  g.graph().dummyChains.forEach(v => {
	    let node = g.node(v);
	    let edgeObj = node.edgeObj;
	    let pathData = findPath(g, postorderNums, edgeObj.v, edgeObj.w);
	    let path = pathData.path;
	    let lca = pathData.lca;
	    let pathIdx = 0;
	    let pathV = path[pathIdx];
	    let ascending = true;

	    while (v !== edgeObj.w) {
	      node = g.node(v);

	      if (ascending) {
	        while ((pathV = path[pathIdx]) !== lca &&
	               g.node(pathV).maxRank < node.rank) {
	          pathIdx++;
	        }

	        if (pathV === lca) {
	          ascending = false;
	        }
	      }

	      if (!ascending) {
	        while (pathIdx < path.length - 1 &&
	               g.node(pathV = path[pathIdx + 1]).minRank <= node.rank) {
	          pathIdx++;
	        }
	        pathV = path[pathIdx];
	      }

	      g.setParent(v, pathV);
	      v = g.successors(v)[0];
	    }
	  });
	}

	// Find a path from v to w through the lowest common ancestor (LCA). Return the
	// full path and the LCA.
	function findPath(g, postorderNums, v, w) {
	  let vPath = [];
	  let wPath = [];
	  let low = Math.min(postorderNums[v].low, postorderNums[w].low);
	  let lim = Math.max(postorderNums[v].lim, postorderNums[w].lim);
	  let parent;
	  let lca;

	  // Traverse up from v to find the LCA
	  parent = v;
	  do {
	    parent = g.parent(parent);
	    vPath.push(parent);
	  } while (parent &&
	           (postorderNums[parent].low > low || lim > postorderNums[parent].lim));
	  lca = parent;

	  // Traverse from w to LCA
	  parent = w;
	  while ((parent = g.parent(parent)) !== lca) {
	    wPath.push(parent);
	  }

	  return { path: vPath.concat(wPath.reverse()), lca: lca };
	}

	function postorder(g) {
	  let result = {};
	  let lim = 0;

	  function dfs(v) {
	    let low = lim;
	    g.children(v).forEach(dfs);
	    result[v] = { low: low, lim: lim++ };
	  }
	  g.children().forEach(dfs);

	  return result;
	}
	return parentDummyChains_1;
}

var nestingGraph;
var hasRequiredNestingGraph;

function requireNestingGraph () {
	if (hasRequiredNestingGraph) return nestingGraph;
	hasRequiredNestingGraph = 1;
	let util = requireUtil$1();

	nestingGraph = {
	  run,
	  cleanup,
	};

	/*
	 * A nesting graph creates dummy nodes for the tops and bottoms of subgraphs,
	 * adds appropriate edges to ensure that all cluster nodes are placed between
	 * these boundaries, and ensures that the graph is connected.
	 *
	 * In addition we ensure, through the use of the minlen property, that nodes
	 * and subgraph border nodes to not end up on the same rank.
	 *
	 * Preconditions:
	 *
	 *    1. Input graph is a DAG
	 *    2. Nodes in the input graph has a minlen attribute
	 *
	 * Postconditions:
	 *
	 *    1. Input graph is connected.
	 *    2. Dummy nodes are added for the tops and bottoms of subgraphs.
	 *    3. The minlen attribute for nodes is adjusted to ensure nodes do not
	 *       get placed on the same rank as subgraph border nodes.
	 *
	 * The nesting graph idea comes from Sander, "Layout of Compound Directed
	 * Graphs."
	 */
	function run(g) {
	  let root = util.addDummyNode(g, "root", {}, "_root");
	  let depths = treeDepths(g);
	  let depthsArr = Object.values(depths);
	  let height = util.applyWithChunking(Math.max, depthsArr) - 1; // Note: depths is an Object not an array
	  let nodeSep = 2 * height + 1;

	  g.graph().nestingRoot = root;

	  // Multiply minlen by nodeSep to align nodes on non-border ranks.
	  g.edges().forEach(e => g.edge(e).minlen *= nodeSep);

	  // Calculate a weight that is sufficient to keep subgraphs vertically compact
	  let weight = sumWeights(g) + 1;

	  // Create border nodes and link them up
	  g.children().forEach(child => dfs(g, root, nodeSep, weight, height, depths, child));

	  // Save the multiplier for node layers for later removal of empty border
	  // layers.
	  g.graph().nodeRankFactor = nodeSep;
	}

	function dfs(g, root, nodeSep, weight, height, depths, v) {
	  let children = g.children(v);
	  if (!children.length) {
	    if (v !== root) {
	      g.setEdge(root, v, { weight: 0, minlen: nodeSep });
	    }
	    return;
	  }

	  let top = util.addBorderNode(g, "_bt");
	  let bottom = util.addBorderNode(g, "_bb");
	  let label = g.node(v);

	  g.setParent(top, v);
	  label.borderTop = top;
	  g.setParent(bottom, v);
	  label.borderBottom = bottom;

	  children.forEach(child => {
	    dfs(g, root, nodeSep, weight, height, depths, child);

	    let childNode = g.node(child);
	    let childTop = childNode.borderTop ? childNode.borderTop : child;
	    let childBottom = childNode.borderBottom ? childNode.borderBottom : child;
	    let thisWeight = childNode.borderTop ? weight : 2 * weight;
	    let minlen = childTop !== childBottom ? 1 : height - depths[v] + 1;

	    g.setEdge(top, childTop, {
	      weight: thisWeight,
	      minlen: minlen,
	      nestingEdge: true
	    });

	    g.setEdge(childBottom, bottom, {
	      weight: thisWeight,
	      minlen: minlen,
	      nestingEdge: true
	    });
	  });

	  if (!g.parent(v)) {
	    g.setEdge(root, top, { weight: 0, minlen: height + depths[v] });
	  }
	}

	function treeDepths(g) {
	  var depths = {};
	  function dfs(v, depth) {
	    var children = g.children(v);
	    if (children && children.length) {
	      children.forEach(child => dfs(child, depth + 1));
	    }
	    depths[v] = depth;
	  }
	  g.children().forEach(v => dfs(v, 1));
	  return depths;
	}

	function sumWeights(g) {
	  return g.edges().reduce((acc, e) => acc + g.edge(e).weight, 0);
	}

	function cleanup(g) {
	  var graphLabel = g.graph();
	  g.removeNode(graphLabel.nestingRoot);
	  delete graphLabel.nestingRoot;
	  g.edges().forEach(e => {
	    var edge = g.edge(e);
	    if (edge.nestingEdge) {
	      g.removeEdge(e);
	    }
	  });
	}
	return nestingGraph;
}

var addBorderSegments_1;
var hasRequiredAddBorderSegments;

function requireAddBorderSegments () {
	if (hasRequiredAddBorderSegments) return addBorderSegments_1;
	hasRequiredAddBorderSegments = 1;
	let util = requireUtil$1();

	addBorderSegments_1 = addBorderSegments;

	function addBorderSegments(g) {
	  function dfs(v) {
	    let children = g.children(v);
	    let node = g.node(v);
	    if (children.length) {
	      children.forEach(dfs);
	    }

	    if (Object.hasOwn(node, "minRank")) {
	      node.borderLeft = [];
	      node.borderRight = [];
	      for (let rank = node.minRank, maxRank = node.maxRank + 1;
	        rank < maxRank;
	        ++rank) {
	        addBorderNode(g, "borderLeft", "_bl", v, node, rank);
	        addBorderNode(g, "borderRight", "_br", v, node, rank);
	      }
	    }
	  }

	  g.children().forEach(dfs);
	}

	function addBorderNode(g, prop, prefix, sg, sgNode, rank) {
	  let label = { width: 0, height: 0, rank: rank, borderType: prop };
	  let prev = sgNode[prop][rank - 1];
	  let curr = util.addDummyNode(g, "border", label, prefix);
	  sgNode[prop][rank] = curr;
	  g.setParent(curr, sg);
	  if (prev) {
	    g.setEdge(prev, curr, { weight: 1 });
	  }
	}
	return addBorderSegments_1;
}

var coordinateSystem;
var hasRequiredCoordinateSystem;

function requireCoordinateSystem () {
	if (hasRequiredCoordinateSystem) return coordinateSystem;
	hasRequiredCoordinateSystem = 1;

	coordinateSystem = {
	  adjust: adjust,
	  undo: undo
	};

	function adjust(g) {
	  let rankDir = g.graph().rankdir.toLowerCase();
	  if (rankDir === "lr" || rankDir === "rl") {
	    swapWidthHeight(g);
	  }
	}

	function undo(g) {
	  let rankDir = g.graph().rankdir.toLowerCase();
	  if (rankDir === "bt" || rankDir === "rl") {
	    reverseY(g);
	  }

	  if (rankDir === "lr" || rankDir === "rl") {
	    swapXY(g);
	    swapWidthHeight(g);
	  }
	}

	function swapWidthHeight(g) {
	  g.nodes().forEach(v => swapWidthHeightOne(g.node(v)));
	  g.edges().forEach(e => swapWidthHeightOne(g.edge(e)));
	}

	function swapWidthHeightOne(attrs) {
	  let w = attrs.width;
	  attrs.width = attrs.height;
	  attrs.height = w;
	}

	function reverseY(g) {
	  g.nodes().forEach(v => reverseYOne(g.node(v)));

	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    edge.points.forEach(reverseYOne);
	    if (Object.hasOwn(edge, "y")) {
	      reverseYOne(edge);
	    }
	  });
	}

	function reverseYOne(attrs) {
	  attrs.y = -attrs.y;
	}

	function swapXY(g) {
	  g.nodes().forEach(v => swapXYOne(g.node(v)));

	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    edge.points.forEach(swapXYOne);
	    if (Object.hasOwn(edge, "x")) {
	      swapXYOne(edge);
	    }
	  });
	}

	function swapXYOne(attrs) {
	  let x = attrs.x;
	  attrs.x = attrs.y;
	  attrs.y = x;
	}
	return coordinateSystem;
}

var initOrder_1;
var hasRequiredInitOrder;

function requireInitOrder () {
	if (hasRequiredInitOrder) return initOrder_1;
	hasRequiredInitOrder = 1;

	let util = requireUtil$1();

	initOrder_1 = initOrder;

	/*
	 * Assigns an initial order value for each node by performing a DFS search
	 * starting from nodes in the first rank. Nodes are assigned an order in their
	 * rank as they are first visited.
	 *
	 * This approach comes from Gansner, et al., "A Technique for Drawing Directed
	 * Graphs."
	 *
	 * Returns a layering matrix with an array per layer and each layer sorted by
	 * the order of its nodes.
	 */
	function initOrder(g) {
	  let visited = {};
	  let simpleNodes = g.nodes().filter(v => !g.children(v).length);
	  let simpleNodesRanks = simpleNodes.map(v => g.node(v).rank);
	  let maxRank = util.applyWithChunking(Math.max, simpleNodesRanks);
	  let layers = util.range(maxRank + 1).map(() => []);

	  function dfs(v) {
	    if (visited[v]) return;
	    visited[v] = true;
	    let node = g.node(v);
	    layers[node.rank].push(v);
	    g.successors(v).forEach(dfs);
	  }

	  let orderedVs = simpleNodes.sort((a, b) => g.node(a).rank - g.node(b).rank);
	  orderedVs.forEach(dfs);

	  return layers;
	}
	return initOrder_1;
}

var crossCount_1;
var hasRequiredCrossCount;

function requireCrossCount () {
	if (hasRequiredCrossCount) return crossCount_1;
	hasRequiredCrossCount = 1;

	let zipObject = requireUtil$1().zipObject;

	crossCount_1 = crossCount;

	/*
	 * A function that takes a layering (an array of layers, each with an array of
	 * ordererd nodes) and a graph and returns a weighted crossing count.
	 *
	 * Pre-conditions:
	 *
	 *    1. Input graph must be simple (not a multigraph), directed, and include
	 *       only simple edges.
	 *    2. Edges in the input graph must have assigned weights.
	 *
	 * Post-conditions:
	 *
	 *    1. The graph and layering matrix are left unchanged.
	 *
	 * This algorithm is derived from Barth, et al., "Bilayer Cross Counting."
	 */
	function crossCount(g, layering) {
	  let cc = 0;
	  for (let i = 1; i < layering.length; ++i) {
	    cc += twoLayerCrossCount(g, layering[i-1], layering[i]);
	  }
	  return cc;
	}

	function twoLayerCrossCount(g, northLayer, southLayer) {
	  // Sort all of the edges between the north and south layers by their position
	  // in the north layer and then the south. Map these edges to the position of
	  // their head in the south layer.
	  let southPos = zipObject(southLayer, southLayer.map((v, i) => i));
	  let southEntries = northLayer.flatMap(v => {
	    return g.outEdges(v).map(e => {
	      return { pos: southPos[e.w], weight: g.edge(e).weight };
	    }).sort((a, b) => a.pos - b.pos);
	  });

	  // Build the accumulator tree
	  let firstIndex = 1;
	  while (firstIndex < southLayer.length) firstIndex <<= 1;
	  let treeSize = 2 * firstIndex - 1;
	  firstIndex -= 1;
	  let tree = new Array(treeSize).fill(0);

	  // Calculate the weighted crossings
	  let cc = 0;
	  southEntries.forEach(entry => {
	    let index = entry.pos + firstIndex;
	    tree[index] += entry.weight;
	    let weightSum = 0;
	    while (index > 0) {
	      if (index % 2) {
	        weightSum += tree[index + 1];
	      }
	      index = (index - 1) >> 1;
	      tree[index] += entry.weight;
	    }
	    cc += entry.weight * weightSum;
	  });

	  return cc;
	}
	return crossCount_1;
}

var barycenter_1;
var hasRequiredBarycenter;

function requireBarycenter () {
	if (hasRequiredBarycenter) return barycenter_1;
	hasRequiredBarycenter = 1;
	barycenter_1 = barycenter;

	function barycenter(g, movable = []) {
	  return movable.map(v => {
	    let inV = g.inEdges(v);
	    if (!inV.length) {
	      return { v: v };
	    } else {
	      let result = inV.reduce((acc, e) => {
	        let edge = g.edge(e),
	          nodeU = g.node(e.v);
	        return {
	          sum: acc.sum + (edge.weight * nodeU.order),
	          weight: acc.weight + edge.weight
	        };
	      }, { sum: 0, weight: 0 });

	      return {
	        v: v,
	        barycenter: result.sum / result.weight,
	        weight: result.weight
	      };
	    }
	  });
	}
	return barycenter_1;
}

var resolveConflicts_1;
var hasRequiredResolveConflicts;

function requireResolveConflicts () {
	if (hasRequiredResolveConflicts) return resolveConflicts_1;
	hasRequiredResolveConflicts = 1;

	let util = requireUtil$1();

	resolveConflicts_1 = resolveConflicts;

	/*
	 * Given a list of entries of the form {v, barycenter, weight} and a
	 * constraint graph this function will resolve any conflicts between the
	 * constraint graph and the barycenters for the entries. If the barycenters for
	 * an entry would violate a constraint in the constraint graph then we coalesce
	 * the nodes in the conflict into a new node that respects the contraint and
	 * aggregates barycenter and weight information.
	 *
	 * This implementation is based on the description in Forster, "A Fast and
	 * Simple Hueristic for Constrained Two-Level Crossing Reduction," thought it
	 * differs in some specific details.
	 *
	 * Pre-conditions:
	 *
	 *    1. Each entry has the form {v, barycenter, weight}, or if the node has
	 *       no barycenter, then {v}.
	 *
	 * Returns:
	 *
	 *    A new list of entries of the form {vs, i, barycenter, weight}. The list
	 *    `vs` may either be a singleton or it may be an aggregation of nodes
	 *    ordered such that they do not violate constraints from the constraint
	 *    graph. The property `i` is the lowest original index of any of the
	 *    elements in `vs`.
	 */
	function resolveConflicts(entries, cg) {
	  let mappedEntries = {};
	  entries.forEach((entry, i) => {
	    let tmp = mappedEntries[entry.v] = {
	      indegree: 0,
	      "in": [],
	      out: [],
	      vs: [entry.v],
	      i: i
	    };
	    if (entry.barycenter !== undefined) {
	      tmp.barycenter = entry.barycenter;
	      tmp.weight = entry.weight;
	    }
	  });

	  cg.edges().forEach(e => {
	    let entryV = mappedEntries[e.v];
	    let entryW = mappedEntries[e.w];
	    if (entryV !== undefined && entryW !== undefined) {
	      entryW.indegree++;
	      entryV.out.push(mappedEntries[e.w]);
	    }
	  });

	  let sourceSet = Object.values(mappedEntries).filter(entry => !entry.indegree);

	  return doResolveConflicts(sourceSet);
	}

	function doResolveConflicts(sourceSet) {
	  let entries = [];

	  function handleIn(vEntry) {
	    return uEntry => {
	      if (uEntry.merged) {
	        return;
	      }
	      if (uEntry.barycenter === undefined ||
	          vEntry.barycenter === undefined ||
	          uEntry.barycenter >= vEntry.barycenter) {
	        mergeEntries(vEntry, uEntry);
	      }
	    };
	  }

	  function handleOut(vEntry) {
	    return wEntry => {
	      wEntry["in"].push(vEntry);
	      if (--wEntry.indegree === 0) {
	        sourceSet.push(wEntry);
	      }
	    };
	  }

	  while (sourceSet.length) {
	    let entry = sourceSet.pop();
	    entries.push(entry);
	    entry["in"].reverse().forEach(handleIn(entry));
	    entry.out.forEach(handleOut(entry));
	  }

	  return entries.filter(entry => !entry.merged).map(entry => {
	    return util.pick(entry, ["vs", "i", "barycenter", "weight"]);
	  });
	}

	function mergeEntries(target, source) {
	  let sum = 0;
	  let weight = 0;

	  if (target.weight) {
	    sum += target.barycenter * target.weight;
	    weight += target.weight;
	  }

	  if (source.weight) {
	    sum += source.barycenter * source.weight;
	    weight += source.weight;
	  }

	  target.vs = source.vs.concat(target.vs);
	  target.barycenter = sum / weight;
	  target.weight = weight;
	  target.i = Math.min(source.i, target.i);
	  source.merged = true;
	}
	return resolveConflicts_1;
}

var sort_1;
var hasRequiredSort;

function requireSort () {
	if (hasRequiredSort) return sort_1;
	hasRequiredSort = 1;
	let util = requireUtil$1();

	sort_1 = sort;

	function sort(entries, biasRight) {
	  let parts = util.partition(entries, entry => {
	    return Object.hasOwn(entry, "barycenter");
	  });
	  let sortable = parts.lhs,
	    unsortable = parts.rhs.sort((a, b) => b.i - a.i),
	    vs = [],
	    sum = 0,
	    weight = 0,
	    vsIndex = 0;

	  sortable.sort(compareWithBias(!!biasRight));

	  vsIndex = consumeUnsortable(vs, unsortable, vsIndex);

	  sortable.forEach(entry => {
	    vsIndex += entry.vs.length;
	    vs.push(entry.vs);
	    sum += entry.barycenter * entry.weight;
	    weight += entry.weight;
	    vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
	  });

	  let result = { vs: vs.flat(true) };
	  if (weight) {
	    result.barycenter = sum / weight;
	    result.weight = weight;
	  }
	  return result;
	}

	function consumeUnsortable(vs, unsortable, index) {
	  let last;
	  while (unsortable.length && (last = unsortable[unsortable.length - 1]).i <= index) {
	    unsortable.pop();
	    vs.push(last.vs);
	    index++;
	  }
	  return index;
	}

	function compareWithBias(bias) {
	  return (entryV, entryW) => {
	    if (entryV.barycenter < entryW.barycenter) {
	      return -1;
	    } else if (entryV.barycenter > entryW.barycenter) {
	      return 1;
	    }

	    return !bias ? entryV.i - entryW.i : entryW.i - entryV.i;
	  };
	}
	return sort_1;
}

var sortSubgraph_1;
var hasRequiredSortSubgraph;

function requireSortSubgraph () {
	if (hasRequiredSortSubgraph) return sortSubgraph_1;
	hasRequiredSortSubgraph = 1;
	let barycenter = requireBarycenter();
	let resolveConflicts = requireResolveConflicts();
	let sort = requireSort();

	sortSubgraph_1 = sortSubgraph;

	function sortSubgraph(g, v, cg, biasRight) {
	  let movable = g.children(v);
	  let node = g.node(v);
	  let bl = node ? node.borderLeft : undefined;
	  let br = node ? node.borderRight: undefined;
	  let subgraphs = {};

	  if (bl) {
	    movable = movable.filter(w => w !== bl && w !== br);
	  }

	  let barycenters = barycenter(g, movable);
	  barycenters.forEach(entry => {
	    if (g.children(entry.v).length) {
	      let subgraphResult = sortSubgraph(g, entry.v, cg, biasRight);
	      subgraphs[entry.v] = subgraphResult;
	      if (Object.hasOwn(subgraphResult, "barycenter")) {
	        mergeBarycenters(entry, subgraphResult);
	      }
	    }
	  });

	  let entries = resolveConflicts(barycenters, cg);
	  expandSubgraphs(entries, subgraphs);

	  let result = sort(entries, biasRight);

	  if (bl) {
	    result.vs = [bl, result.vs, br].flat(true);
	    if (g.predecessors(bl).length) {
	      let blPred = g.node(g.predecessors(bl)[0]),
	        brPred = g.node(g.predecessors(br)[0]);
	      if (!Object.hasOwn(result, "barycenter")) {
	        result.barycenter = 0;
	        result.weight = 0;
	      }
	      result.barycenter = (result.barycenter * result.weight +
	                           blPred.order + brPred.order) / (result.weight + 2);
	      result.weight += 2;
	    }
	  }

	  return result;
	}

	function expandSubgraphs(entries, subgraphs) {
	  entries.forEach(entry => {
	    entry.vs = entry.vs.flatMap(v => {
	      if (subgraphs[v]) {
	        return subgraphs[v].vs;
	      }
	      return v;
	    });
	  });
	}

	function mergeBarycenters(target, other) {
	  if (target.barycenter !== undefined) {
	    target.barycenter = (target.barycenter * target.weight +
	                         other.barycenter * other.weight) /
	                        (target.weight + other.weight);
	    target.weight += other.weight;
	  } else {
	    target.barycenter = other.barycenter;
	    target.weight = other.weight;
	  }
	}
	return sortSubgraph_1;
}

var buildLayerGraph_1;
var hasRequiredBuildLayerGraph;

function requireBuildLayerGraph () {
	if (hasRequiredBuildLayerGraph) return buildLayerGraph_1;
	hasRequiredBuildLayerGraph = 1;
	let Graph = requireGraphlib().Graph;
	let util = requireUtil$1();

	buildLayerGraph_1 = buildLayerGraph;

	/*
	 * Constructs a graph that can be used to sort a layer of nodes. The graph will
	 * contain all base and subgraph nodes from the request layer in their original
	 * hierarchy and any edges that are incident on these nodes and are of the type
	 * requested by the "relationship" parameter.
	 *
	 * Nodes from the requested rank that do not have parents are assigned a root
	 * node in the output graph, which is set in the root graph attribute. This
	 * makes it easy to walk the hierarchy of movable nodes during ordering.
	 *
	 * Pre-conditions:
	 *
	 *    1. Input graph is a DAG
	 *    2. Base nodes in the input graph have a rank attribute
	 *    3. Subgraph nodes in the input graph has minRank and maxRank attributes
	 *    4. Edges have an assigned weight
	 *
	 * Post-conditions:
	 *
	 *    1. Output graph has all nodes in the movable rank with preserved
	 *       hierarchy.
	 *    2. Root nodes in the movable layer are made children of the node
	 *       indicated by the root attribute of the graph.
	 *    3. Non-movable nodes incident on movable nodes, selected by the
	 *       relationship parameter, are included in the graph (without hierarchy).
	 *    4. Edges incident on movable nodes, selected by the relationship
	 *       parameter, are added to the output graph.
	 *    5. The weights for copied edges are aggregated as need, since the output
	 *       graph is not a multi-graph.
	 */
	function buildLayerGraph(g, rank, relationship) {
	  let root = createRootNode(g),
	    result = new Graph({ compound: true }).setGraph({ root: root })
	      .setDefaultNodeLabel(v => g.node(v));

	  g.nodes().forEach(v => {
	    let node = g.node(v),
	      parent = g.parent(v);

	    if (node.rank === rank || node.minRank <= rank && rank <= node.maxRank) {
	      result.setNode(v);
	      result.setParent(v, parent || root);

	      // This assumes we have only short edges!
	      g[relationship](v).forEach(e => {
	        let u = e.v === v ? e.w : e.v,
	          edge = result.edge(u, v),
	          weight = edge !== undefined ? edge.weight : 0;
	        result.setEdge(u, v, { weight: g.edge(e).weight + weight });
	      });

	      if (Object.hasOwn(node, "minRank")) {
	        result.setNode(v, {
	          borderLeft: node.borderLeft[rank],
	          borderRight: node.borderRight[rank]
	        });
	      }
	    }
	  });

	  return result;
	}

	function createRootNode(g) {
	  var v;
	  while (g.hasNode((v = util.uniqueId("_root"))));
	  return v;
	}
	return buildLayerGraph_1;
}

var addSubgraphConstraints_1;
var hasRequiredAddSubgraphConstraints;

function requireAddSubgraphConstraints () {
	if (hasRequiredAddSubgraphConstraints) return addSubgraphConstraints_1;
	hasRequiredAddSubgraphConstraints = 1;
	addSubgraphConstraints_1 = addSubgraphConstraints;

	function addSubgraphConstraints(g, cg, vs) {
	  let prev = {},
	    rootPrev;

	  vs.forEach(v => {
	    let child = g.parent(v),
	      parent,
	      prevChild;
	    while (child) {
	      parent = g.parent(child);
	      if (parent) {
	        prevChild = prev[parent];
	        prev[parent] = child;
	      } else {
	        prevChild = rootPrev;
	        rootPrev = child;
	      }
	      if (prevChild && prevChild !== child) {
	        cg.setEdge(prevChild, child);
	        return;
	      }
	      child = parent;
	    }
	  });

	  /*
	  function dfs(v) {
	    var children = v ? g.children(v) : g.children();
	    if (children.length) {
	      var min = Number.POSITIVE_INFINITY,
	          subgraphs = [];
	      children.forEach(function(child) {
	        var childMin = dfs(child);
	        if (g.children(child).length) {
	          subgraphs.push({ v: child, order: childMin });
	        }
	        min = Math.min(min, childMin);
	      });
	      _.sortBy(subgraphs, "order").reduce(function(prev, curr) {
	        cg.setEdge(prev.v, curr.v);
	        return curr;
	      });
	      return min;
	    }
	    return g.node(v).order;
	  }
	  dfs(undefined);
	  */
	}
	return addSubgraphConstraints_1;
}

var order_1;
var hasRequiredOrder;

function requireOrder () {
	if (hasRequiredOrder) return order_1;
	hasRequiredOrder = 1;

	let initOrder = requireInitOrder();
	let crossCount = requireCrossCount();
	let sortSubgraph = requireSortSubgraph();
	let buildLayerGraph = requireBuildLayerGraph();
	let addSubgraphConstraints = requireAddSubgraphConstraints();
	let Graph = requireGraphlib().Graph;
	let util = requireUtil$1();

	order_1 = order;

	/*
	 * Applies heuristics to minimize edge crossings in the graph and sets the best
	 * order solution as an order attribute on each node.
	 *
	 * Pre-conditions:
	 *
	 *    1. Graph must be DAG
	 *    2. Graph nodes must be objects with a "rank" attribute
	 *    3. Graph edges must have the "weight" attribute
	 *
	 * Post-conditions:
	 *
	 *    1. Graph nodes will have an "order" attribute based on the results of the
	 *       algorithm.
	 */
	function order(g, opts) {
	  if (opts && typeof opts.customOrder === 'function') {
	    opts.customOrder(g, order);
	    return;
	  }

	  let maxRank = util.maxRank(g),
	    downLayerGraphs = buildLayerGraphs(g, util.range(1, maxRank + 1), "inEdges"),
	    upLayerGraphs = buildLayerGraphs(g, util.range(maxRank - 1, -1, -1), "outEdges");

	  let layering = initOrder(g);
	  assignOrder(g, layering);

	  if (opts && opts.disableOptimalOrderHeuristic) {
	    return;
	  }

	  let bestCC = Number.POSITIVE_INFINITY,
	    best;

	  for (let i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
	    sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2);

	    layering = util.buildLayerMatrix(g);
	    let cc = crossCount(g, layering);
	    if (cc < bestCC) {
	      lastBest = 0;
	      best = Object.assign({}, layering);
	      bestCC = cc;
	    }
	  }

	  assignOrder(g, best);
	}

	function buildLayerGraphs(g, ranks, relationship) {
	  return ranks.map(function(rank) {
	    return buildLayerGraph(g, rank, relationship);
	  });
	}

	function sweepLayerGraphs(layerGraphs, biasRight) {
	  let cg = new Graph();
	  layerGraphs.forEach(function(lg) {
	    let root = lg.graph().root;
	    let sorted = sortSubgraph(lg, root, cg, biasRight);
	    sorted.vs.forEach((v, i) => lg.node(v).order = i);
	    addSubgraphConstraints(lg, cg, sorted.vs);
	  });
	}

	function assignOrder(g, layering) {
	  Object.values(layering).forEach(layer => layer.forEach((v, i) => g.node(v).order = i));
	}
	return order_1;
}

var bk;
var hasRequiredBk;

function requireBk () {
	if (hasRequiredBk) return bk;
	hasRequiredBk = 1;

	let Graph = requireGraphlib().Graph;
	let util = requireUtil$1();

	/*
	 * This module provides coordinate assignment based on Brandes and Köpf, "Fast
	 * and Simple Horizontal Coordinate Assignment."
	 */

	bk = {
	  positionX: positionX,
	  findType1Conflicts: findType1Conflicts,
	  findType2Conflicts: findType2Conflicts,
	  addConflict: addConflict,
	  hasConflict: hasConflict,
	  verticalAlignment: verticalAlignment,
	  horizontalCompaction: horizontalCompaction,
	  alignCoordinates: alignCoordinates,
	  findSmallestWidthAlignment: findSmallestWidthAlignment,
	  balance: balance
	};

	/*
	 * Marks all edges in the graph with a type-1 conflict with the "type1Conflict"
	 * property. A type-1 conflict is one where a non-inner segment crosses an
	 * inner segment. An inner segment is an edge with both incident nodes marked
	 * with the "dummy" property.
	 *
	 * This algorithm scans layer by layer, starting with the second, for type-1
	 * conflicts between the current layer and the previous layer. For each layer
	 * it scans the nodes from left to right until it reaches one that is incident
	 * on an inner segment. It then scans predecessors to determine if they have
	 * edges that cross that inner segment. At the end a final scan is done for all
	 * nodes on the current rank to see if they cross the last visited inner
	 * segment.
	 *
	 * This algorithm (safely) assumes that a dummy node will only be incident on a
	 * single node in the layers being scanned.
	 */
	function findType1Conflicts(g, layering) {
	  let conflicts = {};

	  function visitLayer(prevLayer, layer) {
	    let
	      // last visited node in the previous layer that is incident on an inner
	      // segment.
	      k0 = 0,
	      // Tracks the last node in this layer scanned for crossings with a type-1
	      // segment.
	      scanPos = 0,
	      prevLayerLength = prevLayer.length,
	      lastNode = layer[layer.length - 1];

	    layer.forEach((v, i) => {
	      let w = findOtherInnerSegmentNode(g, v),
	        k1 = w ? g.node(w).order : prevLayerLength;

	      if (w || v === lastNode) {
	        layer.slice(scanPos, i+1).forEach(scanNode => {
	          g.predecessors(scanNode).forEach(u => {
	            let uLabel = g.node(u),
	              uPos = uLabel.order;
	            if ((uPos < k0 || k1 < uPos) &&
	                !(uLabel.dummy && g.node(scanNode).dummy)) {
	              addConflict(conflicts, u, scanNode);
	            }
	          });
	        });
	        scanPos = i + 1;
	        k0 = k1;
	      }
	    });

	    return layer;
	  }

	  layering.length && layering.reduce(visitLayer);

	  return conflicts;
	}

	function findType2Conflicts(g, layering) {
	  let conflicts = {};

	  function scan(south, southPos, southEnd, prevNorthBorder, nextNorthBorder) {
	    let v;
	    util.range(southPos, southEnd).forEach(i => {
	      v = south[i];
	      if (g.node(v).dummy) {
	        g.predecessors(v).forEach(u => {
	          let uNode = g.node(u);
	          if (uNode.dummy &&
	              (uNode.order < prevNorthBorder || uNode.order > nextNorthBorder)) {
	            addConflict(conflicts, u, v);
	          }
	        });
	      }
	    });
	  }


	  function visitLayer(north, south) {
	    let prevNorthPos = -1,
	      nextNorthPos,
	      southPos = 0;

	    south.forEach((v, southLookahead) => {
	      if (g.node(v).dummy === "border") {
	        let predecessors = g.predecessors(v);
	        if (predecessors.length) {
	          nextNorthPos = g.node(predecessors[0]).order;
	          scan(south, southPos, southLookahead, prevNorthPos, nextNorthPos);
	          southPos = southLookahead;
	          prevNorthPos = nextNorthPos;
	        }
	      }
	      scan(south, southPos, south.length, nextNorthPos, north.length);
	    });

	    return south;
	  }

	  layering.length && layering.reduce(visitLayer);

	  return conflicts;
	}

	function findOtherInnerSegmentNode(g, v) {
	  if (g.node(v).dummy) {
	    return g.predecessors(v).find(u => g.node(u).dummy);
	  }
	}

	function addConflict(conflicts, v, w) {
	  if (v > w) {
	    let tmp = v;
	    v = w;
	    w = tmp;
	  }

	  let conflictsV = conflicts[v];
	  if (!conflictsV) {
	    conflicts[v] = conflictsV = {};
	  }
	  conflictsV[w] = true;
	}

	function hasConflict(conflicts, v, w) {
	  if (v > w) {
	    let tmp = v;
	    v = w;
	    w = tmp;
	  }
	  return !!conflicts[v] && Object.hasOwn(conflicts[v], w);
	}

	/*
	 * Try to align nodes into vertical "blocks" where possible. This algorithm
	 * attempts to align a node with one of its median neighbors. If the edge
	 * connecting a neighbor is a type-1 conflict then we ignore that possibility.
	 * If a previous node has already formed a block with a node after the node
	 * we're trying to form a block with, we also ignore that possibility - our
	 * blocks would be split in that scenario.
	 */
	function verticalAlignment(g, layering, conflicts, neighborFn) {
	  let root = {},
	    align = {},
	    pos = {};

	  // We cache the position here based on the layering because the graph and
	  // layering may be out of sync. The layering matrix is manipulated to
	  // generate different extreme alignments.
	  layering.forEach(layer => {
	    layer.forEach((v, order) => {
	      root[v] = v;
	      align[v] = v;
	      pos[v] = order;
	    });
	  });

	  layering.forEach(layer => {
	    let prevIdx = -1;
	    layer.forEach(v => {
	      let ws = neighborFn(v);
	      if (ws.length) {
	        ws = ws.sort((a, b) => pos[a] - pos[b]);
	        let mp = (ws.length - 1) / 2;
	        for (let i = Math.floor(mp), il = Math.ceil(mp); i <= il; ++i) {
	          let w = ws[i];
	          if (align[v] === v &&
	              prevIdx < pos[w] &&
	              !hasConflict(conflicts, v, w)) {
	            align[w] = v;
	            align[v] = root[v] = root[w];
	            prevIdx = pos[w];
	          }
	        }
	      }
	    });
	  });

	  return { root: root, align: align };
	}

	function horizontalCompaction(g, layering, root, align, reverseSep) {
	  // This portion of the algorithm differs from BK due to a number of problems.
	  // Instead of their algorithm we construct a new block graph and do two
	  // sweeps. The first sweep places blocks with the smallest possible
	  // coordinates. The second sweep removes unused space by moving blocks to the
	  // greatest coordinates without violating separation.
	  let xs = {},
	    blockG = buildBlockGraph(g, layering, root, reverseSep),
	    borderType = reverseSep ? "borderLeft" : "borderRight";

	  function iterate(setXsFunc, nextNodesFunc) {
	    let stack = blockG.nodes();
	    let elem = stack.pop();
	    let visited = {};
	    while (elem) {
	      if (visited[elem]) {
	        setXsFunc(elem);
	      } else {
	        visited[elem] = true;
	        stack.push(elem);
	        stack = stack.concat(nextNodesFunc(elem));
	      }

	      elem = stack.pop();
	    }
	  }

	  // First pass, assign smallest coordinates
	  function pass1(elem) {
	    xs[elem] = blockG.inEdges(elem).reduce((acc, e) => {
	      return Math.max(acc, xs[e.v] + blockG.edge(e));
	    }, 0);
	  }

	  // Second pass, assign greatest coordinates
	  function pass2(elem) {
	    let min = blockG.outEdges(elem).reduce((acc, e) => {
	      return Math.min(acc, xs[e.w] - blockG.edge(e));
	    }, Number.POSITIVE_INFINITY);

	    let node = g.node(elem);
	    if (min !== Number.POSITIVE_INFINITY && node.borderType !== borderType) {
	      xs[elem] = Math.max(xs[elem], min);
	    }
	  }

	  iterate(pass1, blockG.predecessors.bind(blockG));
	  iterate(pass2, blockG.successors.bind(blockG));

	  // Assign x coordinates to all nodes
	  Object.keys(align).forEach(v => xs[v] = xs[root[v]]);

	  return xs;
	}


	function buildBlockGraph(g, layering, root, reverseSep) {
	  let blockGraph = new Graph(),
	    graphLabel = g.graph(),
	    sepFn = sep(graphLabel.nodesep, graphLabel.edgesep, reverseSep);

	  layering.forEach(layer => {
	    let u;
	    layer.forEach(v => {
	      let vRoot = root[v];
	      blockGraph.setNode(vRoot);
	      if (u) {
	        var uRoot = root[u],
	          prevMax = blockGraph.edge(uRoot, vRoot);
	        blockGraph.setEdge(uRoot, vRoot, Math.max(sepFn(g, v, u), prevMax || 0));
	      }
	      u = v;
	    });
	  });

	  return blockGraph;
	}

	/*
	 * Returns the alignment that has the smallest width of the given alignments.
	 */
	function findSmallestWidthAlignment(g, xss) {
	  return Object.values(xss).reduce((currentMinAndXs, xs) => {
	    let max = Number.NEGATIVE_INFINITY;
	    let min = Number.POSITIVE_INFINITY;

	    Object.entries(xs).forEach(([v, x]) => {
	      let halfWidth = width(g, v) / 2;

	      max = Math.max(x + halfWidth, max);
	      min = Math.min(x - halfWidth, min);
	    });

	    const newMin = max - min;
	    if (newMin < currentMinAndXs[0]) {
	      currentMinAndXs = [newMin, xs];
	    }
	    return currentMinAndXs;
	  }, [Number.POSITIVE_INFINITY, null])[1];
	}

	/*
	 * Align the coordinates of each of the layout alignments such that
	 * left-biased alignments have their minimum coordinate at the same point as
	 * the minimum coordinate of the smallest width alignment and right-biased
	 * alignments have their maximum coordinate at the same point as the maximum
	 * coordinate of the smallest width alignment.
	 */
	function alignCoordinates(xss, alignTo) {
	  let alignToVals = Object.values(alignTo),
	    alignToMin = util.applyWithChunking(Math.min, alignToVals),
	    alignToMax = util.applyWithChunking(Math.max, alignToVals);

	  ["u", "d"].forEach(vert => {
	    ["l", "r"].forEach(horiz => {
	      let alignment = vert + horiz,
	        xs = xss[alignment];

	      if (xs === alignTo) return;

	      let xsVals = Object.values(xs);
	      let delta = alignToMin - util.applyWithChunking(Math.min, xsVals);
	      if (horiz !== "l") {
	        delta = alignToMax - util.applyWithChunking(Math.max,xsVals);
	      }

	      if (delta) {
	        xss[alignment] = util.mapValues(xs, x => x + delta);
	      }
	    });
	  });
	}

	function balance(xss, align) {
	  return util.mapValues(xss.ul, (num, v) => {
	    if (align) {
	      return xss[align.toLowerCase()][v];
	    } else {
	      let xs = Object.values(xss).map(xs => xs[v]).sort((a, b) => a - b);
	      return (xs[1] + xs[2]) / 2;
	    }
	  });
	}

	function positionX(g) {
	  let layering = util.buildLayerMatrix(g);
	  let conflicts = Object.assign(
	    findType1Conflicts(g, layering),
	    findType2Conflicts(g, layering));

	  let xss = {};
	  let adjustedLayering;
	  ["u", "d"].forEach(vert => {
	    adjustedLayering = vert === "u" ? layering : Object.values(layering).reverse();
	    ["l", "r"].forEach(horiz => {
	      if (horiz === "r") {
	        adjustedLayering = adjustedLayering.map(inner => {
	          return Object.values(inner).reverse();
	        });
	      }

	      let neighborFn = (vert === "u" ? g.predecessors : g.successors).bind(g);
	      let align = verticalAlignment(g, adjustedLayering, conflicts, neighborFn);
	      let xs = horizontalCompaction(g, adjustedLayering,
	        align.root, align.align, horiz === "r");
	      if (horiz === "r") {
	        xs = util.mapValues(xs, x => -x);
	      }
	      xss[vert + horiz] = xs;
	    });
	  });


	  let smallestWidth = findSmallestWidthAlignment(g, xss);
	  alignCoordinates(xss, smallestWidth);
	  return balance(xss, g.graph().align);
	}

	function sep(nodeSep, edgeSep, reverseSep) {
	  return (g, v, w) => {
	    let vLabel = g.node(v);
	    let wLabel = g.node(w);
	    let sum = 0;
	    let delta;

	    sum += vLabel.width / 2;
	    if (Object.hasOwn(vLabel, "labelpos")) {
	      switch (vLabel.labelpos.toLowerCase()) {
	      case "l": delta = -vLabel.width / 2; break;
	      case "r": delta = vLabel.width / 2; break;
	      }
	    }
	    if (delta) {
	      sum += reverseSep ? delta : -delta;
	    }
	    delta = 0;

	    sum += (vLabel.dummy ? edgeSep : nodeSep) / 2;
	    sum += (wLabel.dummy ? edgeSep : nodeSep) / 2;

	    sum += wLabel.width / 2;
	    if (Object.hasOwn(wLabel, "labelpos")) {
	      switch (wLabel.labelpos.toLowerCase()) {
	      case "l": delta = wLabel.width / 2; break;
	      case "r": delta = -wLabel.width / 2; break;
	      }
	    }
	    if (delta) {
	      sum += reverseSep ? delta : -delta;
	    }
	    delta = 0;

	    return sum;
	  };
	}

	function width(g, v) {
	  return g.node(v).width;
	}
	return bk;
}

var position_1;
var hasRequiredPosition;

function requirePosition () {
	if (hasRequiredPosition) return position_1;
	hasRequiredPosition = 1;

	let util = requireUtil$1();
	let positionX = requireBk().positionX;

	position_1 = position;

	function position(g) {
	  g = util.asNonCompoundGraph(g);

	  positionY(g);
	  Object.entries(positionX(g)).forEach(([v, x]) => g.node(v).x = x);
	}

	function positionY(g) {
	  let layering = util.buildLayerMatrix(g);
	  let rankSep = g.graph().ranksep;
	  let prevY = 0;
	  layering.forEach(layer => {
	    const maxHeight = layer.reduce((acc, v) => {
	      const height = g.node(v).height;
	      if (acc > height) {
	        return acc;
	      } else {
	        return height;
	      }
	    }, 0);
	    layer.forEach(v => g.node(v).y = prevY + maxHeight / 2);
	    prevY += maxHeight + rankSep;
	  });
	}
	return position_1;
}

var layout_1;
var hasRequiredLayout;

function requireLayout () {
	if (hasRequiredLayout) return layout_1;
	hasRequiredLayout = 1;

	let acyclic = requireAcyclic();
	let normalize = requireNormalize();
	let rank = requireRank();
	let normalizeRanks = requireUtil$1().normalizeRanks;
	let parentDummyChains = requireParentDummyChains();
	let removeEmptyRanks = requireUtil$1().removeEmptyRanks;
	let nestingGraph = requireNestingGraph();
	let addBorderSegments = requireAddBorderSegments();
	let coordinateSystem = requireCoordinateSystem();
	let order = requireOrder();
	let position = requirePosition();
	let util = requireUtil$1();
	let Graph = requireGraphlib().Graph;

	layout_1 = layout;

	function layout(g, opts) {
	  let time = opts && opts.debugTiming ? util.time : util.notime;
	  time("layout", () => {
	    let layoutGraph =
	      time("  buildLayoutGraph", () => buildLayoutGraph(g));
	    time("  runLayout",        () => runLayout(layoutGraph, time, opts));
	    time("  updateInputGraph", () => updateInputGraph(g, layoutGraph));
	  });
	}

	function runLayout(g, time, opts) {
	  time("    makeSpaceForEdgeLabels", () => makeSpaceForEdgeLabels(g));
	  time("    removeSelfEdges",        () => removeSelfEdges(g));
	  time("    acyclic",                () => acyclic.run(g));
	  time("    nestingGraph.run",       () => nestingGraph.run(g));
	  time("    rank",                   () => rank(util.asNonCompoundGraph(g)));
	  time("    injectEdgeLabelProxies", () => injectEdgeLabelProxies(g));
	  time("    removeEmptyRanks",       () => removeEmptyRanks(g));
	  time("    nestingGraph.cleanup",   () => nestingGraph.cleanup(g));
	  time("    normalizeRanks",         () => normalizeRanks(g));
	  time("    assignRankMinMax",       () => assignRankMinMax(g));
	  time("    removeEdgeLabelProxies", () => removeEdgeLabelProxies(g));
	  time("    normalize.run",          () => normalize.run(g));
	  time("    parentDummyChains",      () => parentDummyChains(g));
	  time("    addBorderSegments",      () => addBorderSegments(g));
	  time("    order",                  () => order(g, opts));
	  time("    insertSelfEdges",        () => insertSelfEdges(g));
	  time("    adjustCoordinateSystem", () => coordinateSystem.adjust(g));
	  time("    position",               () => position(g));
	  time("    positionSelfEdges",      () => positionSelfEdges(g));
	  time("    removeBorderNodes",      () => removeBorderNodes(g));
	  time("    normalize.undo",         () => normalize.undo(g));
	  time("    fixupEdgeLabelCoords",   () => fixupEdgeLabelCoords(g));
	  time("    undoCoordinateSystem",   () => coordinateSystem.undo(g));
	  time("    translateGraph",         () => translateGraph(g));
	  time("    assignNodeIntersects",   () => assignNodeIntersects(g));
	  time("    reversePoints",          () => reversePointsForReversedEdges(g));
	  time("    acyclic.undo",           () => acyclic.undo(g));
	}

	/*
	 * Copies final layout information from the layout graph back to the input
	 * graph. This process only copies whitelisted attributes from the layout graph
	 * to the input graph, so it serves as a good place to determine what
	 * attributes can influence layout.
	 */
	function updateInputGraph(inputGraph, layoutGraph) {
	  inputGraph.nodes().forEach(v => {
	    let inputLabel = inputGraph.node(v);
	    let layoutLabel = layoutGraph.node(v);

	    if (inputLabel) {
	      inputLabel.x = layoutLabel.x;
	      inputLabel.y = layoutLabel.y;
	      inputLabel.rank = layoutLabel.rank;

	      if (layoutGraph.children(v).length) {
	        inputLabel.width = layoutLabel.width;
	        inputLabel.height = layoutLabel.height;
	      }
	    }
	  });

	  inputGraph.edges().forEach(e => {
	    let inputLabel = inputGraph.edge(e);
	    let layoutLabel = layoutGraph.edge(e);

	    inputLabel.points = layoutLabel.points;
	    if (Object.hasOwn(layoutLabel, "x")) {
	      inputLabel.x = layoutLabel.x;
	      inputLabel.y = layoutLabel.y;
	    }
	  });

	  inputGraph.graph().width = layoutGraph.graph().width;
	  inputGraph.graph().height = layoutGraph.graph().height;
	}

	let graphNumAttrs = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"];
	let graphDefaults = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" };
	let graphAttrs = ["acyclicer", "ranker", "rankdir", "align"];
	let nodeNumAttrs = ["width", "height", "rank"];
	let nodeDefaults = { width: 0, height: 0 };
	let edgeNumAttrs = ["minlen", "weight", "width", "height", "labeloffset"];
	let edgeDefaults = {
	  minlen: 1, weight: 1, width: 0, height: 0,
	  labeloffset: 10, labelpos: "r"
	};
	let edgeAttrs = ["labelpos"];

	/*
	 * Constructs a new graph from the input graph, which can be used for layout.
	 * This process copies only whitelisted attributes from the input graph to the
	 * layout graph. Thus this function serves as a good place to determine what
	 * attributes can influence layout.
	 */
	function buildLayoutGraph(inputGraph) {
	  let g = new Graph({ multigraph: true, compound: true });
	  let graph = canonicalize(inputGraph.graph());

	  g.setGraph(Object.assign({},
	    graphDefaults,
	    selectNumberAttrs(graph, graphNumAttrs),
	    util.pick(graph, graphAttrs)));

	  inputGraph.nodes().forEach(v => {
	    let node = canonicalize(inputGraph.node(v));
	    const newNode = selectNumberAttrs(node, nodeNumAttrs);
	    Object.keys(nodeDefaults).forEach(k => {
	      if (newNode[k] === undefined) {
	        newNode[k] = nodeDefaults[k];
	      }
	    });

	    g.setNode(v, newNode);
	    g.setParent(v, inputGraph.parent(v));
	  });

	  inputGraph.edges().forEach(e => {
	    let edge = canonicalize(inputGraph.edge(e));
	    g.setEdge(e, Object.assign({},
	      edgeDefaults,
	      selectNumberAttrs(edge, edgeNumAttrs),
	      util.pick(edge, edgeAttrs)));
	  });

	  return g;
	}

	/*
	 * This idea comes from the Gansner paper: to account for edge labels in our
	 * layout we split each rank in half by doubling minlen and halving ranksep.
	 * Then we can place labels at these mid-points between nodes.
	 *
	 * We also add some minimal padding to the width to push the label for the edge
	 * away from the edge itself a bit.
	 */
	function makeSpaceForEdgeLabels(g) {
	  let graph = g.graph();
	  graph.ranksep /= 2;
	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    edge.minlen *= 2;
	    if (edge.labelpos.toLowerCase() !== "c") {
	      if (graph.rankdir === "TB" || graph.rankdir === "BT") {
	        edge.width += edge.labeloffset;
	      } else {
	        edge.height += edge.labeloffset;
	      }
	    }
	  });
	}

	/*
	 * Creates temporary dummy nodes that capture the rank in which each edge's
	 * label is going to, if it has one of non-zero width and height. We do this
	 * so that we can safely remove empty ranks while preserving balance for the
	 * label's position.
	 */
	function injectEdgeLabelProxies(g) {
	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    if (edge.width && edge.height) {
	      let v = g.node(e.v);
	      let w = g.node(e.w);
	      let label = { rank: (w.rank - v.rank) / 2 + v.rank, e: e };
	      util.addDummyNode(g, "edge-proxy", label, "_ep");
	    }
	  });
	}

	function assignRankMinMax(g) {
	  let maxRank = 0;
	  g.nodes().forEach(v => {
	    let node = g.node(v);
	    if (node.borderTop) {
	      node.minRank = g.node(node.borderTop).rank;
	      node.maxRank = g.node(node.borderBottom).rank;
	      maxRank = Math.max(maxRank, node.maxRank);
	    }
	  });
	  g.graph().maxRank = maxRank;
	}

	function removeEdgeLabelProxies(g) {
	  g.nodes().forEach(v => {
	    let node = g.node(v);
	    if (node.dummy === "edge-proxy") {
	      g.edge(node.e).labelRank = node.rank;
	      g.removeNode(v);
	    }
	  });
	}

	function translateGraph(g) {
	  let minX = Number.POSITIVE_INFINITY;
	  let maxX = 0;
	  let minY = Number.POSITIVE_INFINITY;
	  let maxY = 0;
	  let graphLabel = g.graph();
	  let marginX = graphLabel.marginx || 0;
	  let marginY = graphLabel.marginy || 0;

	  function getExtremes(attrs) {
	    let x = attrs.x;
	    let y = attrs.y;
	    let w = attrs.width;
	    let h = attrs.height;
	    minX = Math.min(minX, x - w / 2);
	    maxX = Math.max(maxX, x + w / 2);
	    minY = Math.min(minY, y - h / 2);
	    maxY = Math.max(maxY, y + h / 2);
	  }

	  g.nodes().forEach(v => getExtremes(g.node(v)));
	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    if (Object.hasOwn(edge, "x")) {
	      getExtremes(edge);
	    }
	  });

	  minX -= marginX;
	  minY -= marginY;

	  g.nodes().forEach(v => {
	    let node = g.node(v);
	    node.x -= minX;
	    node.y -= minY;
	  });

	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    edge.points.forEach(p => {
	      p.x -= minX;
	      p.y -= minY;
	    });
	    if (Object.hasOwn(edge, "x")) { edge.x -= minX; }
	    if (Object.hasOwn(edge, "y")) { edge.y -= minY; }
	  });

	  graphLabel.width = maxX - minX + marginX;
	  graphLabel.height = maxY - minY + marginY;
	}

	function assignNodeIntersects(g) {
	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    let nodeV = g.node(e.v);
	    let nodeW = g.node(e.w);
	    let p1, p2;
	    if (!edge.points) {
	      edge.points = [];
	      p1 = nodeW;
	      p2 = nodeV;
	    } else {
	      p1 = edge.points[0];
	      p2 = edge.points[edge.points.length - 1];
	    }
	    edge.points.unshift(util.intersectRect(nodeV, p1));
	    edge.points.push(util.intersectRect(nodeW, p2));
	  });
	}

	function fixupEdgeLabelCoords(g) {
	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    if (Object.hasOwn(edge, "x")) {
	      if (edge.labelpos === "l" || edge.labelpos === "r") {
	        edge.width -= edge.labeloffset;
	      }
	      switch (edge.labelpos) {
	      case "l": edge.x -= edge.width / 2 + edge.labeloffset; break;
	      case "r": edge.x += edge.width / 2 + edge.labeloffset; break;
	      }
	    }
	  });
	}

	function reversePointsForReversedEdges(g) {
	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    if (edge.reversed) {
	      edge.points.reverse();
	    }
	  });
	}

	function removeBorderNodes(g) {
	  g.nodes().forEach(v => {
	    if (g.children(v).length) {
	      let node = g.node(v);
	      let t = g.node(node.borderTop);
	      let b = g.node(node.borderBottom);
	      let l = g.node(node.borderLeft[node.borderLeft.length - 1]);
	      let r = g.node(node.borderRight[node.borderRight.length - 1]);

	      node.width = Math.abs(r.x - l.x);
	      node.height = Math.abs(b.y - t.y);
	      node.x = l.x + node.width / 2;
	      node.y = t.y + node.height / 2;
	    }
	  });

	  g.nodes().forEach(v => {
	    if (g.node(v).dummy === "border") {
	      g.removeNode(v);
	    }
	  });
	}

	function removeSelfEdges(g) {
	  g.edges().forEach(e => {
	    if (e.v === e.w) {
	      var node = g.node(e.v);
	      if (!node.selfEdges) {
	        node.selfEdges = [];
	      }
	      node.selfEdges.push({ e: e, label: g.edge(e) });
	      g.removeEdge(e);
	    }
	  });
	}

	function insertSelfEdges(g) {
	  var layers = util.buildLayerMatrix(g);
	  layers.forEach(layer => {
	    var orderShift = 0;
	    layer.forEach((v, i) => {
	      var node = g.node(v);
	      node.order = i + orderShift;
	      (node.selfEdges || []).forEach(selfEdge => {
	        util.addDummyNode(g, "selfedge", {
	          width: selfEdge.label.width,
	          height: selfEdge.label.height,
	          rank: node.rank,
	          order: i + (++orderShift),
	          e: selfEdge.e,
	          label: selfEdge.label
	        }, "_se");
	      });
	      delete node.selfEdges;
	    });
	  });
	}

	function positionSelfEdges(g) {
	  g.nodes().forEach(v => {
	    var node = g.node(v);
	    if (node.dummy === "selfedge") {
	      var selfNode = g.node(node.e.v);
	      var x = selfNode.x + selfNode.width / 2;
	      var y = selfNode.y;
	      var dx = node.x - x;
	      var dy = selfNode.height / 2;
	      g.setEdge(node.e, node.label);
	      g.removeNode(v);
	      node.label.points = [
	        { x: x + 2 * dx / 3, y: y - dy },
	        { x: x + 5 * dx / 6, y: y - dy },
	        { x: x +     dx    , y: y },
	        { x: x + 5 * dx / 6, y: y + dy },
	        { x: x + 2 * dx / 3, y: y + dy }
	      ];
	      node.label.x = node.x;
	      node.label.y = node.y;
	    }
	  });
	}

	function selectNumberAttrs(obj, attrs) {
	  return util.mapValues(util.pick(obj, attrs), Number);
	}

	function canonicalize(attrs) {
	  var newAttrs = {};
	  if (attrs) {
	    Object.entries(attrs).forEach(([k, v]) => {
	      if (typeof k === "string") {
	        k = k.toLowerCase();
	      }

	      newAttrs[k] = v;
	    });
	  }
	  return newAttrs;
	}
	return layout_1;
}

var debug;
var hasRequiredDebug;

function requireDebug () {
	if (hasRequiredDebug) return debug;
	hasRequiredDebug = 1;
	let util = requireUtil$1();
	let Graph = requireGraphlib().Graph;

	debug = {
	  debugOrdering: debugOrdering
	};

	/* istanbul ignore next */
	function debugOrdering(g) {
	  let layerMatrix = util.buildLayerMatrix(g);

	  let h = new Graph({ compound: true, multigraph: true }).setGraph({});

	  g.nodes().forEach(v => {
	    h.setNode(v, { label: v });
	    h.setParent(v, "layer" + g.node(v).rank);
	  });

	  g.edges().forEach(e => h.setEdge(e.v, e.w, {}, e.name));

	  layerMatrix.forEach((layer, i) => {
	    let layerV = "layer" + i;
	    h.setNode(layerV, { rank: "same" });
	    layer.reduce((u, v) => {
	      h.setEdge(u, v, { style: "invis" });
	      return v;
	    });
	  });

	  return h;
	}
	return debug;
}

var version;
var hasRequiredVersion;

function requireVersion () {
	if (hasRequiredVersion) return version;
	hasRequiredVersion = 1;
	version = "1.1.5";
	return version;
}

/*
Copyright (c) 2012-2014 Chris Pettitt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var dagre$1;
var hasRequiredDagre;

function requireDagre () {
	if (hasRequiredDagre) return dagre$1;
	hasRequiredDagre = 1;
	dagre$1 = {
	  graphlib: requireGraphlib(),

	  layout: requireLayout(),
	  debug: requireDebug(),
	  util: {
	    time: requireUtil$1().time,
	    notime: requireUtil$1().notime
	  },
	  version: requireVersion()
	};
	return dagre$1;
}

var dagreExports = requireDagre();
const dagre = /*@__PURE__*/getDefaultExportFromCjs(dagreExports);

const __default__ = {
  name: "NodeToolbar",
  compatConfig: { MODE: 3 },
  inheritAttrs: false
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: {
    nodeId: {},
    isVisible: { type: Boolean, default: void 0 },
    position: { default: Position.Top },
    offset: { default: 10 },
    align: { default: "center" }
  },
  setup(__props) {
    const props = __props;
    const contextNodeId = inject(NodeId, null);
    const { viewportRef, viewport, getSelectedNodes, findNode } = useVueFlow();
    const nodes = computed(() => {
      const nodeIds = Array.isArray(props.nodeId) ? props.nodeId : [props.nodeId || contextNodeId || ""];
      return nodeIds.reduce((acc, id) => {
        const node = findNode(id);
        if (node) {
          acc.push(node);
        }
        return acc;
      }, []);
    });
    const isActive = computed(
      () => typeof props.isVisible === "boolean" ? props.isVisible : nodes.value.length === 1 && nodes.value[0].selected && getSelectedNodes.value.length === 1
    );
    const nodeRect = computed(() => getRectOfNodes(nodes.value));
    const zIndex = computed(() => Math.max(...nodes.value.map((node) => (node.computedPosition.z || 1) + 1)));
    const wrapperStyle = computed(() => ({
      position: "absolute",
      transform: getTransform(nodeRect.value, viewport.value, props.position, props.offset, props.align),
      zIndex: zIndex.value
    }));
    function getTransform(nodeRect2, transform, position, offset, align) {
      let alignmentOffset = 0.5;
      if (align === "start") {
        alignmentOffset = 0;
      } else if (align === "end") {
        alignmentOffset = 1;
      }
      let pos = [
        (nodeRect2.x + nodeRect2.width * alignmentOffset) * transform.zoom + transform.x,
        nodeRect2.y * transform.zoom + transform.y - offset
      ];
      let shift = [-100 * alignmentOffset, -100];
      switch (position) {
        case Position.Right:
          pos = [
            (nodeRect2.x + nodeRect2.width) * transform.zoom + transform.x + offset,
            (nodeRect2.y + nodeRect2.height * alignmentOffset) * transform.zoom + transform.y
          ];
          shift = [0, -100 * alignmentOffset];
          break;
        case Position.Bottom:
          pos[1] = (nodeRect2.y + nodeRect2.height) * transform.zoom + transform.y + offset;
          shift[1] = 0;
          break;
        case Position.Left:
          pos = [
            nodeRect2.x * transform.zoom + transform.x - offset,
            (nodeRect2.y + nodeRect2.height * alignmentOffset) * transform.zoom + transform.y
          ];
          shift = [-100, -100 * alignmentOffset];
          break;
      }
      return `translate(${pos[0]}px, ${pos[1]}px) translate(${shift[0]}%, ${shift[1]}%)`;
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, {
        to: unref(viewportRef),
        disabled: !unref(viewportRef)
      }, [
        isActive.value && nodes.value.length ? (openBlock(), createElementBlock("div", mergeProps({ key: 0 }, _ctx.$attrs, {
          style: wrapperStyle.value,
          class: "vue-flow__node-toolbar"
        }), [
          renderSlot(_ctx.$slots, "default")
        ], 16)) : createCommentVNode("", true)
      ], 8, ["to", "disabled"]);
    };
  }
});

const _hoisted_1$a = { class: "w-full cap-first" };
const _hoisted_2$3 = { class: "w-full" };
const _hoisted_3$3 = { class: "w-full text-left" };
const _hoisted_4$2 = { class: "w-full text-left" };
const _hoisted_5$1 = { class: "w-full text-left" };
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "FlowNodeRoot",
  props: {
    id: { type: String, required: true },
    data: { type: Object, required: false },
    selected: { type: Boolean, required: false }
  },
  emits: ["add", "delete", "update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const {
      createMode,
      readonly
    } = useModalMultiSigFlow();
    const editPopover = ref();
    const onEdit = (event) => {
      editPopover.value?.show(event);
    };
    const onDelete = () => {
      emit("delete", props.id);
    };
    const onAddRootNode = () => {
      emit("add", "root", props.id);
    };
    const onAddParticipant = () => {
      emit("add", "participant", props.id);
    };
    const onAddTimelock = () => {
      emit("add", "timelock", props.id);
    };
    watch(() => props.data?.requiredSigners, () => {
      emit("update", props.id);
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_InputNumber = resolveComponent("InputNumber");
      const _component_InputGroupAddon = resolveComponent("InputGroupAddon");
      const _component_InputGroup = resolveComponent("InputGroup");
      const _component_Popover = resolveComponent("Popover");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createElementBlock("div", null, [
        createVNode(_component_Button, {
          class: normalizeClass([
            "flex et-gap-sm",
            (__props.selected ? "ring-1 ring-offset-1 ring-offset-black ring-border-highlight " : "") + (!__props.data.children ? "bg-bg-warning text-black" : "")
          ]),
          size: "small",
          severity: "secondary",
          outlined: "",
          rounded: ""
        }, {
          default: withCtx(() => [
            createVNode(IconUserGroup, { class: "size-6" }),
            createBaseVNode("div", null, toDisplayString(__props.data.requiredSigners) + " of " + toDisplayString(__props.data.children || 0), 1)
          ]),
          _: 1
        }, 8, ["class"]),
        !unref(readonly) && unref(createMode) ? (openBlock(), createBlock(unref(_sfc_main$b), {
          key: 0,
          position: unref(Position).Left
        }, {
          default: withCtx(() => [
            createVNode(_component_Card, { pt: {
              body: "p-2",
              content: "flex flex-col et-gap-sm"
            } }, {
              content: withCtx(() => [
                createVNode(_component_Button, {
                  size: "small",
                  disabled: !__props.data.children,
                  rounded: "",
                  onClick: withModifiers(onEdit, ["stop", "prevent"])
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_1$a, toDisplayString(_ctx.$t("common:signers")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                createVNode(_component_Popover, {
                  ref_key: "editPopover",
                  ref: editPopover
                }, {
                  default: withCtx(() => [
                    createVNode(_component_InputGroup, { class: "w-36" }, {
                      default: withCtx(() => [
                        createVNode(_component_InputNumber, {
                          modelValue: __props.data.requiredSigners,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => __props.data.requiredSigners = $event),
                          pt: {
                            pcinputtext: {
                              root: "pl-4 pr-10 text-right rounded-l-full"
                            },
                            incrementbutton: {
                              class: "rounded-none pt-1"
                            },
                            decrementbutton: {
                              class: "rounded-none pb-0.5"
                            }
                          },
                          min: 1,
                          max: __props.data.children,
                          allowEmpty: false,
                          locale: unref(appFormatTag),
                          "show-buttons": ""
                        }, null, 8, ["modelValue", "max", "locale"]),
                        createVNode(_component_InputGroupAddon, { class: "rounded-r-full pl-3 pr-4" }, {
                          default: withCtx(() => [
                            createTextVNode(" of " + toDisplayString(__props.data.children), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 512),
                !__props.data?.isRootNode ? (openBlock(), createBlock(_component_Button, {
                  key: 0,
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: withModifiers(onDelete, ["stop", "prevent"])
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$3, toDisplayString(_ctx.$t("common:delete")), 1)
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                createVNode(_component_Button, {
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: withModifiers(onAddRootNode, ["stop", "prevent"])
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3$3, toDisplayString(_ctx.$t("wallet-multiSig:step.flow.button.addroot")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_Button, {
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: withModifiers(onAddParticipant, ["stop", "prevent"])
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_4$2, toDisplayString(_ctx.$t("wallet-multiSig:step.flow.button.addparticipant")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_Button, {
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: withModifiers(onAddTimelock, ["stop", "prevent"])
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_5$1, toDisplayString(_ctx.$t("wallet-multiSig:step.flow.button.addtimelock")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["position"])) : createCommentVNode("", true),
        !__props.data?.isRootNode ? (openBlock(), createBlock(unref(_sfc_main$f), {
          key: 1,
          type: "target",
          "connectable-end": "",
          position: __props.data.layout === "LR" ? unref(Position).Left : unref(Position).Top
        }, null, 8, ["position"])) : createCommentVNode("", true),
        createVNode(unref(_sfc_main$f), {
          type: "source",
          "connectable-start": "",
          position: __props.data.layout === "LR" ? unref(Position).Right : unref(Position).Bottom
        }, null, 8, ["position"])
      ]);
    };
  }
});

const _hoisted_1$9 = ["stroke"];
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "IconUser",
  props: {
    gradient: { type: String, required: false, default: "" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: __props.gradient ? "url(#" + __props.gradient + ")" : "currentColor"
      }, [..._cache[0] || (_cache[0] = [
        createBaseVNode("path", {
          d: "M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, null, -1),
        createBaseVNode("path", {
          d: "M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z",
          "stroke-width": "1.5"
        }, null, -1)
      ])], 8, _hoisted_1$9);
    };
  }
});

const _hoisted_1$8 = ["src"];
const _hoisted_2$2 = {
  key: 2,
  class: "pr-3"
};
const _hoisted_3$2 = { class: "w-full cap-first" };
const _hoisted_4$1 = { class: "w-full cap-first" };
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "FlowNodeParticipant",
  props: {
    id: { type: String, required: true },
    data: { type: Object, required: false },
    selected: { type: Boolean, required: false }
  },
  emits: ["delete", "update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useScreenSize();
    const {
      readonly,
      createMode,
      showModalMultiSigParticipantViewer,
      openModalMultiSigParticipantViewer,
      tweenOutModalMultiSigParticipantViewer
    } = useModalMultiSigFlow();
    const name = computed(() => {
      const _name = props.data.participant?.name;
      if (_name && _name.length > 0) {
        return _name;
      }
      return null;
    });
    const icon = computed(() => {
      const _icon = props.data.participant?.icon;
      if (_icon && _icon.length > 0) {
        return _icon;
      }
      return null;
    });
    const onEdit = () => {
      openModalMultiSigParticipantViewer(props.data.participant, readonly.value);
    };
    const onDelete = () => {
      tweenOutModalMultiSigParticipantViewer();
      emit("delete", props.id);
    };
    watch(() => props.selected, (selected) => {
      if (selected && showModalMultiSigParticipantViewer.value) {
        onEdit();
      }
    });
    let toUpd = -1;
    watch(() => props.data?.participant, () => {
      clearTimeout(toUpd);
      toUpd = setTimeout(() => emit("update", props.id), 100);
    }, { deep: true });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createElementBlock("div", null, [
        createVNode(_component_Button, {
          class: normalizeClass([
            "flex et-gap-sm p-0",
            (__props.selected ? " ring-1 ring-offset-1 ring-offset-black ring-border-highlight " : "") + (!__props.data.parent || !__props.data.valid ? " bg-bg-warning text-black" : "")
          ]),
          size: "small",
          severity: "secondary",
          outlined: "",
          rounded: ""
        }, {
          default: withCtx(() => [
            icon.value ? (openBlock(), createElementBlock("img", {
              key: 0,
              class: "size-8 rounded-full",
              src: icon.value,
              alt: "icon"
            }, null, 8, _hoisted_1$8)) : (openBlock(), createBlock(_sfc_main$9, {
              key: 1,
              class: normalizeClass(["size-6", name.value ? " ml-3 my-1" : " m-1"])
            }, null, 8, ["class"])),
            name.value ? (openBlock(), createElementBlock("div", _hoisted_2$2, toDisplayString(name.value), 1)) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["class"]),
        !unref(showModalMultiSigParticipantViewer) || !unref(readonly) && unref(createMode) ? (openBlock(), createBlock(unref(_sfc_main$b), {
          key: 0,
          position: unref(Position).Right
        }, {
          default: withCtx(() => [
            createVNode(_component_Card, { pt: {
              body: "p-2",
              content: "flex flex-col et-gap-sm"
            } }, {
              content: withCtx(() => [
                createVNode(_component_Button, {
                  size: "small",
                  rounded: "",
                  onClick: withModifiers(onEdit, ["stop", "prevent"])
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3$2, toDisplayString(unref(readonly) || !unref(createMode) ? _ctx.$t("common:open") : _ctx.$t("common:edit")), 1)
                  ]),
                  _: 1
                }),
                !unref(readonly) && unref(createMode) ? (openBlock(), createBlock(_component_Button, {
                  key: 0,
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: withModifiers(onDelete, ["stop", "prevent"])
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_4$1, toDisplayString(_ctx.$t("common:delete")), 1)
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["position"])) : createCommentVNode("", true),
        createVNode(unref(_sfc_main$f), {
          type: "target",
          "connectable-end": "",
          position: __props.data.layout === "LR" ? unref(Position).Left : unref(Position).Top
        }, null, 8, ["position"])
      ]);
    };
  }
});

const _hoisted_1$7 = {
  key: 0,
  class: "pr-3"
};
const _hoisted_2$1 = { class: "w-full cap-first" };
const _hoisted_3$1 = { class: "w-full cap-first" };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "FlowNodeTimelock",
  props: {
    id: { type: String, required: true },
    data: { type: Object, required: false },
    selected: { type: Boolean, required: false }
  },
  emits: ["delete", "update"],
  setup(__props, { emit: __emit }) {
    const { formatDatetime } = useFormatter();
    const editPopover = ref();
    const infoPopover = ref();
    const timelockDate = ref(null);
    const minDate = ref(/* @__PURE__ */ new Date());
    const props = __props;
    const emit = __emit;
    const {
      readonly,
      createMode
    } = useModalMultiSigFlow();
    const $t = useTranslation().t;
    const { showWarning } = useNotifications();
    const onEdit = () => {
      editPopover.value?.toggle(event);
    };
    const onInfo = () => {
      infoPopover.value?.toggle(event);
    };
    const onDelete = () => {
      emit("delete", props.id);
    };
    const onTimelockUpdate = (_date) => {
      if (!_date) {
        props.data.valid = false;
        return;
      }
      try {
        const time = _date.getTime();
        props.data.timelock = getCalculatedSlotFromBlockTime(networkId.value, time);
        props.data.valid = true;
        if (time - Date.now() > 63113852e3) {
          showWarning($t("wallet-multiSig:step.flow.timelock.warning"));
        }
      } catch (e) {
        props.data.valid = false;
      }
    };
    onMounted(() => {
      const _timelock = props.data.timelock;
      if (_timelock) {
        timelockDate.value = new Date(getTimestampFromSlot(networkId.value, _timelock));
      }
    });
    watch(() => props.data?.timelock, () => {
      emit("update", props.id);
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_DatePicker = resolveComponent("DatePicker");
      const _component_FloatLabel = resolveComponent("FloatLabel");
      const _component_Popover = resolveComponent("Popover");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createElementBlock("div", null, [
        createVNode(_component_Button, {
          class: normalizeClass([
            "flex et-gap-sm p-0",
            (__props.selected ? "ring-1 ring-offset-1 ring-offset-black ring-border-highlight " : "") + (!__props.data.parent || !__props.data.valid ? "bg-bg-warning text-black" : "")
          ]),
          size: "small",
          severity: "secondary",
          outlined: "",
          rounded: ""
        }, {
          default: withCtx(() => [
            createVNode(IconEpochTimer, {
              class: normalizeClass(["size-6", __props.data.timelock ? " ml-3 my-1" : " m-1"])
            }, null, 8, ["class"]),
            __props.data.timelock ? (openBlock(), createElementBlock("div", _hoisted_1$7, toDisplayString(unref(formatDatetime)(unref(getTimestampFromSlot)(unref(networkId), __props.data.timelock))), 1)) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["class"]),
        !unref(readonly) && unref(createMode) ? (openBlock(), createBlock(unref(_sfc_main$b), {
          key: 0,
          position: unref(Position).Right
        }, {
          default: withCtx(() => [
            createVNode(_component_Card, { pt: {
              body: "p-2",
              content: "flex flex-col et-gap-sm"
            } }, {
              content: withCtx(() => [
                createVNode(_component_Popover, {
                  ref_key: "editPopover",
                  ref: editPopover
                }, {
                  default: withCtx(() => [
                    createVNode(_component_FloatLabel, {
                      class: "w-full flex et-gap-sm",
                      variant: "on"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_DatePicker, {
                          modelValue: timelockDate.value,
                          "onUpdate:modelValue": [
                            _cache[0] || (_cache[0] = ($event) => timelockDate.value = $event),
                            onTimelockUpdate
                          ],
                          class: "w-full",
                          pt: { pcinputtext: { root: "rounded-full" } },
                          inputId: "timelockDate",
                          selectionMode: "single",
                          showIcon: "",
                          showButtonBar: "",
                          manualInput: "",
                          showTime: "",
                          hourFormat: "24",
                          iconDisplay: "input",
                          variant: "filled",
                          minDate: minDate.value
                        }, null, 8, ["modelValue", "minDate"]),
                        _cache[1] || (_cache[1] = createBaseVNode("label", {
                          for: "input-timelock-date",
                          class: "pl-1"
                        }, toDisplayString("Unlock date"), -1)),
                        createVNode(_component_Button, {
                          class: "p-0",
                          link: "",
                          onClick: withModifiers(onInfo, ["stop", "prevent"])
                        }, {
                          default: withCtx(() => [
                            createVNode(IconInformationCircle, { class: "size-5 sm:size-6" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 512),
                createVNode(_component_Popover, {
                  ref_key: "infoPopover",
                  ref: infoPopover
                }, {
                  default: withCtx(() => [
                    createBaseVNode("span", null, toDisplayString(unref($t)("wallet-multiSig:step.flow.timelock.info")), 1)
                  ]),
                  _: 1
                }, 512),
                createVNode(_component_Button, {
                  size: "small",
                  rounded: "",
                  onClick: withModifiers(onEdit, ["stop", "prevent"])
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$1, toDisplayString(unref($t)("common:edit")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_Button, {
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: withModifiers(onDelete, ["stop", "prevent"])
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3$1, toDisplayString(unref($t)("common:delete")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["position"])) : createCommentVNode("", true),
        createVNode(unref(_sfc_main$f), {
          type: "target",
          "connectable-end": "",
          position: __props.data.layout === "LR" ? unref(Position).Left : unref(Position).Top
        }, null, 8, ["position"])
      ]);
    };
  }
});

const _sfc_main$6 = {  };

const _hoisted_1$6 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none"
};

function _sfc_render$4(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$6, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M5 9C4.39316 9.58984 2 11.1597 2 12C2 12.8403 4.39316 14.4102 5 15",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M19 9C19.6068 9.58984 22 11.1597 22 12C22 12.8403 19.6068 14.4102 19 15",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M2.42285 11.9795H21.868",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconArrowHorizontal = /*#__PURE__*/_export_sfc(_sfc_main$6, [['render',_sfc_render$4]]);

const _sfc_main$5 = {  };

const _hoisted_1$5 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none"
};

function _sfc_render$3(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$5, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M9 5C9.58984 4.39316 11.1597 2 12 2C12.8403 2 14.4102 4.39316 15 5",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M9 19C9.58984 19.6068 11.1597 22 12 22C12.8403 22 14.4102 19.6068 15 19",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M12 2.23145V21.769",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconArrowVertical = /*#__PURE__*/_export_sfc(_sfc_main$5, [['render',_sfc_render$3]]);

const _sfc_main$4 = {  };

const _hoisted_1$4 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$4, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M18.5016 19.1217L21 21.6217M20 15.1217C20 12.0842 17.5376 9.62173 14.5 9.62173C11.4624 9.62173 9 12.0842 9 15.1217C9 18.1593 11.4624 20.6217 14.5 20.6217C17.5376 20.6217 20 18.1593 20 15.1217Z",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M14.5 13.1217V17.1217M16.5 15.1217H12.5",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M10 3.62173H14M3 10.6217V14.6217M6.5 21.6217C4.567 21.6217 3 20.0547 3 18.1217M17.5 3.62173C19.433 3.62173 21 5.18873 21 7.12173M3 7.12173C3 5.18873 4.567 3.62173 6.5 3.62173",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconZoomInArea = /*#__PURE__*/_export_sfc(_sfc_main$4, [['render',_sfc_render$2]]);

const _sfc_main$3 = {  };

const _hoisted_1$3 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$3, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "currentColor",
      d: "M18,11.742 L17,11.742 C15.461,11.742 14.448,11.742 13.696,11.386 L9.803,15.253 L11.46,15.314 C11.874,15.329 12.197,15.677 12.182,16.091 C12.167,16.496 11.835,16.814 11.433,16.814 L11.434,16.811 L11.406,16.811 L8.664,16.711 C7.845,16.671 7.211,16.008 7.211,15.202 L7.211,12.582 C7.211,12.168 7.547,11.832 7.961,11.832 C8.375,11.832 8.711,12.168 8.711,12.582 L8.711,14.223 L12.624,10.337 C12.25,9.585 12.25,8.562 12.25,6.992 L12.25,5.992 C12.25,3.965 12.25,2.849 13.058,2.049 C13.859,1.242 14.975,1.242 17,1.242 L18,1.242 C20.025,1.242 21.14,1.242 21.946,2.054 C22.75,2.85 22.75,3.966 22.75,5.992 L22.75,6.992 C22.75,9.019 22.75,10.135 21.942,10.935 C21.141,11.742 20.025,11.742 18,11.742 Z M17,2.742 C15.255,2.742 14.469,2.757 14.118,3.111 C13.765,3.461 13.75,4.247 13.75,5.992 L13.75,6.992 C13.75,8.738 13.765,9.524 14.114,9.869 C14.47,10.227 15.256,10.242 17,10.242 L18,10.242 C19.745,10.242 20.531,10.227 20.882,9.873 C21.235,9.523 21.25,8.737 21.25,6.992 L21.25,5.992 C21.25,4.246 21.235,3.46 20.886,3.115 C20.53,2.757 19.744,2.742 18,2.742 Z M1.953,6.234 C1.543,6.175 1.258,5.795 1.318,5.385 C1.502,4.11 1.887,3.239 2.567,2.561 C3.243,1.877 4.117,1.49 5.396,1.309 C5.806,1.252 6.185,1.537 6.243,1.947 C6.301,2.357 6.015,2.736 5.605,2.794 C4.66,2.927 4.07,3.173 3.63,3.618 C3.185,4.062 2.939,4.652 2.803,5.598 C2.749,5.972 2.428,6.241 2.062,6.241 L2.061,6.242 C2.025,6.242 1.989,6.24 1.953,6.234 Z M5.396,22.675 C4.117,22.495 3.243,22.108 2.563,21.419 C1.887,20.747 1.502,19.875 1.318,18.599 C1.259,18.189 1.543,17.809 1.953,17.75 C2.363,17.689 2.743,17.975 2.802,18.386 C2.938,19.332 3.184,19.923 3.625,20.361 C4.069,20.81 4.66,21.057 5.604,21.19 C6.014,21.248 6.3,21.627 6.242,22.037 C6.189,22.412 5.868,22.683 5.5,22.683 L5.501,22.682 C5.466,22.682 5.431,22.68 5.396,22.675 Z M17.757,22.036 C17.699,21.626 17.985,21.247 18.395,21.189 C19.34,21.056 19.93,20.81 20.37,20.365 C20.815,19.922 21.061,19.332 21.197,18.385 C21.256,17.975 21.636,17.69 22.046,17.749 C22.456,17.808 22.741,18.188 22.681,18.598 C22.497,19.875 22.112,20.746 21.432,21.423 C20.756,22.107 19.883,22.494 18.603,22.674 C18.568,22.679 18.532,22.681 18.498,22.681 L18.499,22.682 C18.131,22.682 17.81,22.411 17.757,22.036 Z M1.25,13.992 L1.25,9.992 C1.25,9.578 1.586,9.242 2,9.242 C2.414,9.242 2.75,9.578 2.75,9.992 L2.75,13.992 C2.75,14.406 2.414,14.742 2,14.742 C1.586,14.742 1.25,14.406 1.25,13.992 Z M10,22.742 C9.586,22.742 9.25,22.406 9.25,21.992 C9.25,21.578 9.586,21.242 10,21.242 L14,21.242 C14.414,21.242 14.75,21.578 14.75,21.992 C14.75,22.406 14.414,22.742 14,22.742 Z M21.25,15.492 L21.25,13.492 C21.25,13.078 21.586,12.742 22,12.742 C22.414,12.742 22.75,13.078 22.75,13.492 L22.75,15.492 C22.75,15.906 22.414,16.242 22,16.242 C21.586,16.242 21.25,15.906 21.25,15.492 Z M8.5,2.742 C8.086,2.742 7.75,2.406 7.75,1.992 C7.75,1.578 8.086,1.242 8.5,1.242 L10.5,1.242 C10.914,1.242 11.25,1.578 11.25,1.992 C11.25,2.406 10.914,2.742 10.5,2.742 Z"
    }, null, -1)
  ]))]))
}
const IconMinimizeScreen = /*#__PURE__*/_export_sfc(_sfc_main$3, [['render',_sfc_render$1]]);

const _sfc_main$2 = {  };

const _hoisted_1$2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "24",
  height: "24",
  fill: "none"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$2, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M15.5 21C16.8956 21 17.5933 21 18.1611 20.8278C19.4395 20.44 20.44 19.4395 20.8278 18.1611C21 17.5933 21 16.8956 21 15.5M21 8.5C21 7.10444 21 6.40666 20.8278 5.83886C20.44 4.56046 19.4395 3.56004 18.1611 3.17224C17.5933 3 16.8956 3 15.5 3M8.5 21C7.10444 21 6.40666 21 5.83886 20.8278C4.56046 20.44 3.56004 19.4395 3.17224 18.1611C3 17.5933 3 16.8956 3 15.5M3 8.5C3 7.10444 3 6.40666 3.17224 5.83886C3.56004 4.56046 4.56046 3.56004 5.83886 3.17224C6.40666 3 7.10444 3 8.5 3",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconFullscreen = /*#__PURE__*/_export_sfc(_sfc_main$2, [['render',_sfc_render]]);

const _hoisted_1$1 = { class: "flex et-gap-sm" };
const _hoisted_2 = { class: "flex et-gap-sm" };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = {
  key: 0,
  class: "flex et-gap-sm"
};
const _hoisted_5 = { key: 0 };
const _hoisted_6 = { class: "flex et-gap-sm" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Flow",
  props: /* @__PURE__ */ mergeModels({
    id: { type: String, required: true },
    type: { type: String, required: true }
  }, {
    "nodeList": { type: Array, required: true },
    "nodeListModifiers": {},
    "edgeList": { type: Array, required: true },
    "edgeListModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["nodeUpdate", "edgeUpdate"], ["update:nodeList", "update:edgeList"]),
  setup(__props, { emit: __emit }) {
    const nodeList = useModel(__props, "nodeList");
    const edgeList = useModel(__props, "edgeList");
    const props = __props;
    const emit = __emit;
    const {
      onInit,
      snapToGrid,
      findNode,
      fitView,
      updateNode,
      getNodes,
      getEdges,
      addNodes,
      addEdges,
      setNodes,
      setEdges,
      removeNodes,
      removeEdges,
      addSelectedNodes,
      onNodesChange,
      onEdgesChange
    } = useVueFlow();
    const $t = useTranslation().t;
    const { showError } = useNotifications();
    const {
      readonly,
      createMode,
      tweenOutModalMultiSigParticipantViewer,
      checkParticipantValidity,
      stakeMirrored,
      stakeDisabled,
      drepMirrored,
      drepDisabled
    } = useModalMultiSigFlow();
    const { capitalize } = useFormatter();
    snapToGrid.value = true;
    const fullscreen = ref(false);
    const fitViewSettings = { padding: 0.75 };
    const isDisabled = computed(() => props.type === "stake" && stakeDisabled.value || props.type === "drep" && drepDisabled.value);
    const isMirrored = computed(() => props.type === "stake" && stakeMirrored.value || props.type === "drep" && drepMirrored.value);
    const hasSelectedParticipant = computed(() => {
      for (const node of getNodes.value) {
        if (node.selected && node.type === "participant") {
          return true;
        }
      }
      return false;
    });
    const orphanedNodeList = computed(() => {
      const _nodeList = [];
      for (const node of getNodes.value) {
        if (node.type === "root" && !!node.data?.isRootNode) {
          continue;
        }
        const id = node.id;
        if (!getEdges.value.some((edge) => edge.target === id)) {
          _nodeList.push(node);
        }
      }
      return _nodeList;
    });
    const childLessNodeList = computed(() => {
      const _nodeList = [];
      for (const node of getNodes.value) {
        if (node.type === "root") {
          const id = node.id;
          if (!getEdges.value.some((edge) => edge.source === id)) {
            _nodeList.push(node);
          }
        }
      }
      return _nodeList;
    });
    const allEdgeNodesValid = computed(() => {
      for (const node of getNodes.value) {
        if (node.type === "root") {
          continue;
        }
        if (node.type === "participant" && !node.data.valid) {
          return false;
        }
        if (node.type === "timelock" && !node.data.valid) {
          return false;
        }
      }
      return true;
    });
    const onMirrorToggle = () => {
      if (props.type === "stake") {
        stakeMirrored.value = !stakeMirrored.value;
        readonly.value = stakeMirrored.value;
        tweenOutModalMultiSigParticipantViewer();
      } else if (props.type === "drep") {
        drepMirrored.value = !drepMirrored.value;
        readonly.value = drepMirrored.value;
        tweenOutModalMultiSigParticipantViewer();
      }
    };
    const onDisableToggle = () => {
      if (props.type === "stake") {
        stakeDisabled.value = !stakeDisabled.value;
        tweenOutModalMultiSigParticipantViewer();
      } else if (props.type === "drep") {
        drepDisabled.value = !drepDisabled.value;
        tweenOutModalMultiSigParticipantViewer();
      }
    };
    const onChangeLayout = (layout2) => {
      const oldLayout = getNodes.value[0]?.data?.layout;
      if (oldLayout !== layout2) {
        clearTimeout(toNU);
        toNU = setTimeout(() => emit("nodeUpdate"), 100);
      }
      for (const node of getNodes.value) {
        node.data.layout = layout2;
      }
    };
    const layout = (nodes, edges, direction) => {
      if (!direction) {
        direction = nodeList.value.find((node) => node.data?.isRootNode)?.data?.layout ?? "LR";
      }
      onChangeLayout(direction);
      const dagreGraph = new dagre.graphlib.Graph();
      dagreGraph.setDefaultEdgeLabel(() => ({}));
      const isHorizontal = direction === "LR";
      dagreGraph.setGraph({ rankdir: direction });
      for (const node of nodes) {
        const graphNode = findNode(node.id);
        if (graphNode) {
          dagreGraph.setNode(node.id, { width: graphNode.dimensions.width || 150, height: graphNode.dimensions.height || 50 });
        }
      }
      for (const edge of edges) {
        dagreGraph.setEdge(edge.source, edge.target);
      }
      dagre.layout(dagreGraph);
      return nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
          ...node,
          targetPosition: isHorizontal ? Position.Left : Position.Top,
          sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
          position: { x: nodeWithPosition.x, y: nodeWithPosition.y }
        };
      });
    };
    const layoutGraph = (direction) => {
      setNodes(layout(getNodes.value, getEdges.value, direction));
    };
    const onDeleteNode = (id) => {
      removeNodes(id, true);
    };
    const onAddNode = (type, id) => {
      const newNode = {
        id: getNodes.value.length.toString(),
        type,
        position: { x: 0, y: 0 },
        selectable: true,
        deletable: true,
        connectable: true,
        data: {}
      };
      if (type === "root") {
        newNode.data.requiredSigners = 1;
      } else if (type === "participant") {
        newNode.data.participant = createIUIMultiSigParticipant();
      } else if (type === "timelock") {
        const parentNode = findNode(id);
        if (parentNode) {
          if (parentNode.data.hasTimelock) {
            showError($t("wallet-multiSig:step.flow.error.duplicateTimelock"));
            return;
          }
          parentNode.data.hasTimelock = true;
        }
        newNode.data.timelock = 0;
      }
      addNodes(newNode);
      nextTick(() => {
        addEdges({
          source: id,
          target: newNode.id
        });
        layoutGraph();
      });
    };
    let toNU = -1;
    const onRootUpdate = (id) => {
      const rootNode = findNode(id);
      if (rootNode) {
        clearTimeout(toNU);
        toNU = setTimeout(() => emit("nodeUpdate"), 100);
      }
    };
    const onParticipantUpdate = (id) => {
      if (!createMode.value) {
        return;
      }
      const participantNode = findNode(id);
      if (participantNode) {
        const participant = participantNode.data.participant;
        const id2 = participantNode.id;
        const pub = participant.pub;
        const paymentCred = participant.keys.payment[0]?.cred;
        const stakeCred = participant.keys.stake[0]?.cred;
        const drepCred = participant.keys.drep[0]?.cred;
        if (pub.length > 0) {
          for (const _node of getNodes.value) {
            if (_node.type === "participant" && _node.id !== id2) {
              const _participant = _node.data.participant;
              if (_participant.pub === pub) {
                showError($t("wallet-multiSig:step.participants.error.duplicate"));
                participantNode.data.valid = false;
                return;
              }
            }
          }
        } else if (paymentCred || stakeCred || drepCred) {
          for (const _node of getNodes.value) {
            if (_node.type === "participant" && _node.id !== id2) {
              const _participant = _node.data.participant;
              const _paymentCred = _participant.keys.payment[0]?.cred;
              const _stakeCred = _participant.keys.stake[0]?.cred;
              const _drepCred = _participant.keys.drep[0]?.cred;
              let duplicateCreds = false;
              if (paymentCred && (_paymentCred === paymentCred || _stakeCred === paymentCred || _drepCred === paymentCred)) {
                showError($t("wallet-multiSig:step.participants.error.duplicate"));
                nextTick(() => {
                  participantNode.data.valid = false;
                  participant.keys.payment = [];
                });
                duplicateCreds = true;
              }
              if (stakeCred && (_paymentCred === stakeCred || _stakeCred === stakeCred || _drepCred === stakeCred)) {
                if (!duplicateCreds) {
                  showError($t("wallet-multiSig:step.participants.error.duplicate"));
                }
                nextTick(() => {
                  participantNode.data.valid = false;
                  participant.keys.stake = [];
                });
                duplicateCreds = true;
              }
              if (drepCred && (_paymentCred === drepCred || _stakeCred === drepCred || _drepCred === drepCred)) {
                if (!duplicateCreds) {
                  showError($t("wallet-multiSig:step.participants.error.duplicate"));
                }
                nextTick(() => {
                  participantNode.data.valid = false;
                  participant.keys.drep = [];
                });
                duplicateCreds = true;
              }
              if (duplicateCreds) {
                return;
              }
            }
          }
        }
        checkParticipantValidity(props.type, participantNode);
        clearTimeout(toNU);
        toNU = setTimeout(() => emit("nodeUpdate"), 100);
      }
    };
    const onTimelockUpdate = (id) => {
      const timelockNode = findNode(id);
      if (timelockNode) {
        clearTimeout(toNU);
        toNU = setTimeout(() => emit("nodeUpdate"), 100);
      }
    };
    const onConnect = (event) => {
      const parentNode = getNodes.value.find((node) => node.type === "root" && node.id === event.source);
      if (parentNode) {
        const childNode = findNode(event.target);
        if (childNode) {
          childNode.data.parent = parentNode.id;
          if (childNode.type === "timelock") {
            if (parentNode.data.hasTimelock) {
              showError($t("wallet-multiSig:step.flow.error.duplicateTimelock"));
              return;
            }
          }
        }
        const existingEdge = getEdges.value.find((edge) => edge.target === event.target);
        if (existingEdge) {
          removeEdges(existingEdge);
        }
        addEdges(event);
      }
    };
    onNodesChange((changes) => {
      if (!createMode.value) {
        return;
      }
      if (!changes.some((c) => c.type === "remove" || c.type === "add")) {
        return;
      }
      nodeList.value = getNodes.value;
      setTimeout(() => fitView(fitViewSettings), 10);
      clearTimeout(toNU);
      toNU = setTimeout(() => emit("nodeUpdate"), 100);
    });
    let toEU = -1;
    onEdgesChange((changes) => {
      if (!createMode.value) {
        return;
      }
      if (!changes.some((c) => c.type === "remove" || c.type === "add")) {
        return;
      }
      for (const change of changes) {
        if (change.type === "add") {
          const parentNode = findNode(change.item.source);
          if (parentNode) {
            parentNode.data.children = (parentNode.data.children || 0) + 1;
            const childNode = findNode(change.item.target);
            if (childNode) {
              if (childNode.type === "timelock") {
                parentNode.data.hasTimelock = true;
              }
              childNode.data.parent = parentNode.id;
            }
          }
          clearTimeout(toEU);
          toNU = setTimeout(() => emit("edgeUpdate"), 100);
        } else if (change.type === "remove") {
          const parentNode = findNode(change.source);
          if (parentNode) {
            parentNode.data.children = parentNode.data.children - 1;
            if (parentNode.data.requiredSigners > parentNode.data.children) {
              parentNode.data.requiredSigners = parentNode.data.children || 1;
            }
            const childNode = findNode(change.target);
            if (childNode) {
              if (childNode.type === "timelock") {
                parentNode.data.hasTimelock = false;
              }
              childNode.data.parent = void 0;
            }
          }
          clearTimeout(toEU);
          toNU = setTimeout(() => emit("edgeUpdate"), 100);
        }
      }
      edgeList.value = getEdges.value;
    });
    const addRootNode = () => {
      addNodes({
        id: getNodes.value.length.toString(),
        type: "root",
        position: { x: 0, y: 0 },
        selectable: true,
        deletable: false,
        connectable: true,
        data: {
          direction: "LR",
          isRootNode: true,
          requiredSigners: 1,
          valid: false,
          disabled: false
        }
      });
    };
    onInit((instance) => {
      const _node = findNode(getNodes.value[0].id);
      if (_node) {
        addSelectedNodes([_node]);
      }
    });
    watch(nodeList, () => {
      if (createMode.value) {
        if (nodeList.value.length === 0) {
          nextTick(
            () => {
              stakeMirrored.value = true;
              drepMirrored.value = true;
              setEdges([]);
              addRootNode();
            }
          );
        } else {
          for (const node of getNodes.value) {
            if (node.type === "participant") {
              checkParticipantValidity(props.type, node);
            }
          }
        }
      }
      setTimeout(() => layoutGraph(), 10);
      setTimeout(() => fitView(fitViewSettings), 20);
    }, { immediate: true });
    watch([orphanedNodeList, childLessNodeList, allEdgeNodesValid], () => {
      const rootNode = getNodes.value[0];
      if (!rootNode) {
        return;
      }
      if (orphanedNodeList.value.length === 0 && childLessNodeList.value.length === 0 && allEdgeNodesValid.value) {
        rootNode.data.valid = true;
      } else {
        rootNode.data.valid = false;
      }
    });
    watch([stakeMirrored, drepMirrored], (value) => {
      if (props.type === "stake" && !value[0] || props.type === "drep" && !value[1]) {
        for (const edge of getEdges.value) {
          edge.deletable = true;
        }
        for (const node of getNodes.value) {
          if (node.data?.isRootNode) {
            continue;
          }
          updateNode(node.id, { deletable: true });
        }
      }
    });
    watch(hasSelectedParticipant, (value) => {
      if (!value) {
        tweenOutModalMultiSigParticipantViewer();
      }
    });
    watch(fullscreen, () => setTimeout(() => fitView(fitViewSettings), 10));
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createBlock(_component_Card, {
        class: "w-full overflow-hidden",
        pt: {
          body: "p-0 w-full h-full"
        }
      }, {
        content: withCtx(() => [
          (openBlock(), createBlock(Teleport, {
            to: "#eternl-modal",
            disabled: !fullscreen.value
          }, [
            createVNode(unref(_sfc_main$1$1), {
              class: "relative w-full min-h-96 pointer-events-auto bg-bg-1",
              "connection-line-options": { class: "vue-flow__connection animated" },
              "connection-line-style": { "stroke-width": 2.5 },
              "default-edge-options": { style: { "stroke-width": 2.5 } },
              nodes: isDisabled.value ? [] : nodeList.value,
              edges: isDisabled.value ? [] : edgeList.value,
              "fit-view-on-init": "",
              onConnect
            }, {
              "node-root": withCtx((props2) => [
                createVNode(_sfc_main$a, {
                  id: props2.id,
                  data: props2.data,
                  selected: props2.selected,
                  onAdd: onAddNode,
                  onDelete: onDeleteNode,
                  onUpdate: onRootUpdate
                }, null, 8, ["id", "data", "selected"])
              ]),
              "node-participant": withCtx((props2) => [
                createVNode(_sfc_main$8, {
                  id: props2.id,
                  data: props2.data,
                  selected: props2.selected,
                  onDelete: onDeleteNode,
                  onUpdate: onParticipantUpdate
                }, null, 8, ["id", "data", "selected"])
              ]),
              "node-timelock": withCtx((props2) => [
                createVNode(_sfc_main$7, {
                  id: props2.id,
                  data: props2.data,
                  selected: props2.selected,
                  onDelete: onDeleteNode,
                  onUpdate: onTimelockUpdate
                }, null, 8, ["id", "data", "selected"])
              ]),
              default: withCtx(() => [
                createVNode(unref(_sfc_main$c)),
                unref(createMode) && __props.type !== "payment" ? (openBlock(), createBlock(unref(_sfc_main$g), {
                  key: 0,
                  position: "top-left"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_1$1, [
                      createBaseVNode("div", _hoisted_2, [
                        withDirectives((openBlock(), createBlock(_component_Button, {
                          class: "p-0",
                          link: "",
                          onClick: withModifiers(onDisableToggle, ["stop", "prevent"])
                        }, {
                          default: withCtx(() => [
                            createVNode(IconUnavailable, {
                              class: normalizeClass(["size-5 sm:size-6", isDisabled.value ? "text-txt-highlight" : ""])
                            }, null, 8, ["class"])
                          ]),
                          _: 1
                        })), [
                          [_directive_tooltip, unref($t)("wallet-multiSig:step.flow.tooltip.disable")]
                        ]),
                        isDisabled.value ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(unref($t)("common:disabled")), 1)) : createCommentVNode("", true)
                      ]),
                      !isDisabled.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
                        withDirectives((openBlock(), createBlock(_component_Button, {
                          class: "p-0",
                          link: "",
                          onClick: withModifiers(onMirrorToggle, ["stop", "prevent"])
                        }, {
                          default: withCtx(() => [
                            createVNode(IconCopy02, {
                              class: normalizeClass(["size-5 sm:size-6", isMirrored.value ? "text-txt-highlight" : ""])
                            }, null, 8, ["class"])
                          ]),
                          _: 1
                        })), [
                          [_directive_tooltip, unref($t)("wallet-multiSig:step.flow.tooltip.mirror")]
                        ]),
                        isMirrored.value ? (openBlock(), createElementBlock("div", _hoisted_5, toDisplayString(unref($t)("wallet-multiSig:step.flow.mirrored")), 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                createVNode(unref(_sfc_main$g), { position: "top-right" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_6, [
                      withDirectives((openBlock(), createBlock(_component_Button, {
                        class: "p-0",
                        link: "",
                        onClick: _cache[0] || (_cache[0] = withModifiers(($event) => unref(fitView)(fitViewSettings), ["stop", "prevent"]))
                      }, {
                        default: withCtx(() => [
                          createVNode(IconZoomInArea, { class: "size-5 sm:size-6" })
                        ]),
                        _: 1
                      })), [
                        [_directive_tooltip, unref($t)("wallet-multiSig:step.flow.tooltip.zoomfit")]
                      ]),
                      withDirectives((openBlock(), createBlock(_component_Button, {
                        class: "p-0",
                        link: "",
                        onClick: _cache[1] || (_cache[1] = withModifiers(($event) => layoutGraph("TB"), ["stop", "prevent"]))
                      }, {
                        default: withCtx(() => [
                          createVNode(IconArrowVertical, { class: "size-5 sm:size-6" })
                        ]),
                        _: 1
                      })), [
                        [_directive_tooltip, unref($t)("wallet-multiSig:step.flow.tooltip.topbottom")]
                      ]),
                      withDirectives((openBlock(), createBlock(_component_Button, {
                        class: "p-0",
                        link: "",
                        onClick: _cache[2] || (_cache[2] = withModifiers(($event) => layoutGraph("LR"), ["stop", "prevent"]))
                      }, {
                        default: withCtx(() => [
                          createVNode(IconArrowHorizontal, { class: "size-5 sm:size-6" })
                        ]),
                        _: 1
                      })), [
                        [_directive_tooltip, unref($t)("wallet-multiSig:step.flow.tooltip.leftright")]
                      ]),
                      withDirectives((openBlock(), createBlock(_component_Button, {
                        class: "p-0",
                        link: "",
                        onClick: _cache[3] || (_cache[3] = withModifiers(($event) => fullscreen.value = !fullscreen.value, ["stop", "prevent"]))
                      }, {
                        default: withCtx(() => [
                          !fullscreen.value ? (openBlock(), createBlock(IconFullscreen, {
                            key: 0,
                            class: "size-5 sm:size-6"
                          })) : (openBlock(), createBlock(IconMinimizeScreen, {
                            key: 1,
                            class: "size-5 sm:size-6"
                          }))
                        ]),
                        _: 1
                      })), [
                        [_directive_tooltip, fullscreen.value ? unref($t)("wallet-multiSig:step.flow.tooltip.nofullscreen") : unref(capitalize)(unref($t)("wallet-multiSig:step.flow.tooltip.fullscreen"))]
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["nodes", "edges"])
          ], 8, ["disabled"]))
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1 = { class: "w-full flex flex-col et-js-is et-gap-md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MultiSigWalletFlow",
  props: /* @__PURE__ */ mergeModels({
    showStake: { type: Boolean, required: false, default: true },
    showDRep: { type: Boolean, required: false, default: true }
  }, {
    "paymentNodeList": { type: Array, required: true },
    "paymentNodeListModifiers": {},
    "stakeNodeList": { type: Array, required: true },
    "stakeNodeListModifiers": {},
    "drepNodeList": { type: Array, required: true },
    "drepNodeListModifiers": {},
    "paymentEdgeList": { type: Array, required: true },
    "paymentEdgeListModifiers": {},
    "stakeEdgeList": { type: Array, required: true },
    "stakeEdgeListModifiers": {},
    "drepEdgeList": { type: Array, required: true },
    "drepEdgeListModifiers": {}
  }),
  emits: ["update:paymentNodeList", "update:stakeNodeList", "update:drepNodeList", "update:paymentEdgeList", "update:stakeEdgeList", "update:drepEdgeList"],
  setup(__props) {
    const props = __props;
    const paymentNodeList = useModel(__props, "paymentNodeList");
    const stakeNodeList = useModel(__props, "stakeNodeList");
    const drepNodeList = useModel(__props, "drepNodeList");
    const paymentEdgeList = useModel(__props, "paymentEdgeList");
    const stakeEdgeList = useModel(__props, "stakeEdgeList");
    const drepEdgeList = useModel(__props, "drepEdgeList");
    const $t = useTranslation().t;
    const {
      type,
      readonly,
      createMode,
      stakeMirrored,
      drepMirrored,
      stakeDisabled,
      drepDisabled,
      tweenOutModalMultiSigParticipantViewer,
      checkParticipantValidity
    } = useModalMultiSigFlow();
    const options = computed(() => {
      const _options = [{
        primaryLabel: $t("common:payment"),
        value: 1,
        valid: paymentNodeList.value[0]?.data?.valid ?? false,
        scriptDisabled: false
      }];
      if (props.showStake) {
        _options.push({
          primaryLabel: $t("common:stake"),
          value: 2,
          valid: stakeNodeList.value[0]?.data?.valid ?? false,
          scriptDisabled: stakeDisabled.value
        });
      }
      if (props.showDRep) {
        _options.push({
          primaryLabel: $t("common:dRep"),
          value: 3,
          valid: drepNodeList.value[0]?.data?.valid ?? false,
          scriptDisabled: drepDisabled.value
        });
      }
      return _options;
    });
    const seletedOption = ref(options.value[0]);
    const selectedTab = computed(() => seletedOption.value.value);
    type.value = "payment";
    watch(selectedTab, (value) => {
      if (value === 1) {
        type.value = "payment";
      } else if (value === 2) {
        type.value = "stake";
      } else if (value === 3) {
        type.value = "drep";
      }
      if (createMode.value) {
        if (value === 1) {
          readonly.value = false;
        } else if (value === 2) {
          readonly.value = stakeMirrored.value;
        } else if (value === 3) {
          readonly.value = drepMirrored.value;
        }
      }
      tweenOutModalMultiSigParticipantViewer();
    });
    const doMirrorStake = (nodes, edges) => {
      if (nodes) {
        const _stakeNodeList = JSON.parse(JSON.stringify(paymentNodeList.value));
        let validState = _stakeNodeList[0]?.data?.valid ?? true;
        for (const node of _stakeNodeList) {
          node.deletable = false;
          if (node.type === "participant") {
            checkParticipantValidity("stake", node);
            if (validState && !node.data.valid) {
              validState = false;
              _stakeNodeList[0].data.valid = false;
            }
          }
        }
        stakeNodeList.value = _stakeNodeList;
      }
      if (edges) {
        const _stakeEdgeList = JSON.parse(JSON.stringify(paymentEdgeList.value));
        for (const edge of _stakeEdgeList) {
          edge.deletable = false;
        }
        stakeEdgeList.value = _stakeEdgeList;
      }
    };
    const doMirrorDRep = (nodes, edges) => {
      if (nodes) {
        const _drepNodeList = JSON.parse(JSON.stringify(paymentNodeList.value));
        let validState = _drepNodeList[0]?.data?.valid ?? true;
        for (const node of _drepNodeList) {
          node.deletable = false;
          if (node.type === "participant") {
            checkParticipantValidity("drep", node);
            if (validState && !node.data.valid) {
              validState = false;
              _drepNodeList[0].data.valid = false;
            }
          }
        }
        drepNodeList.value = _drepNodeList;
      }
      if (edges) {
        const _drepEdgeList = JSON.parse(JSON.stringify(paymentEdgeList.value));
        for (const edge of _drepEdgeList) {
          edge.deletable = false;
        }
        drepEdgeList.value = _drepEdgeList;
      }
    };
    const onPaymentNodeUpdate = () => {
      if (stakeMirrored.value) {
        doMirrorStake(true, false);
      }
      if (drepMirrored.value) {
        doMirrorDRep(true, false);
      }
    };
    const onPaymentEdgeUpdate = () => {
      if (stakeMirrored.value) {
        doMirrorStake(false, true);
      }
      if (drepMirrored.value) {
        doMirrorDRep(false, true);
      }
    };
    watch(stakeMirrored, (value) => {
      if (value) {
        doMirrorStake(true, true);
      }
    });
    watch(drepMirrored, (value) => {
      if (value) {
        doMirrorDRep(true, true);
      }
    });
    watch(stakeDisabled, (value) => {
      options.value[1].scriptDisabled = value;
    });
    watch(drepDisabled, (value) => {
      options.value[2].scriptDisabled = value;
    });
    watch(() => paymentNodeList.value[0]?.data?.valid, (value) => {
      options.value[0].valid = value ?? false;
    });
    watch(() => stakeNodeList.value[0]?.data?.valid, (value) => {
      options.value[1].valid = value ?? false;
    });
    watch(() => drepNodeList.value[0]?.data?.valid, (value) => {
      options.value[2].valid = value ?? false;
    });
    watch(paymentNodeList, () => seletedOption.value = options.value[0]);
    onUnmounted(() => tweenOutModalMultiSigParticipantViewer());
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_sfc_main$l, {
          "selected-tab": seletedOption.value,
          "onUpdate:selectedTab": _cache[0] || (_cache[0] = ($event) => seletedOption.value = $event),
          "tab-labels": options.value
        }, createSlots({ _: 2 }, [
          unref(createMode) ? {
            name: "icon-left",
            fn: withCtx(({ item }) => [
              !item.scriptDisabled && item.valid ? (openBlock(), createBlock(IconCheckmarkCircle02, {
                key: 0,
                class: "size-5 text-txt-positive"
              })) : !item.scriptDisabled && !item.valid ? (openBlock(), createBlock(IconAlert02, {
                key: 1,
                class: normalizeClass(["size-5", item.value === 3 ? "text-txt-muted" : "text-txt-negative"])
              }, null, 8, ["class"])) : item.scriptDisabled ? (openBlock(), createBlock(IconUnavailable, {
                key: 2,
                class: "size-5 text-txt-muted"
              })) : createCommentVNode("", true)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["selected-tab", "tab-labels"]),
        selectedTab.value === 1 ? (openBlock(), createBlock(_sfc_main$1, {
          key: 0,
          "node-list": paymentNodeList.value,
          "onUpdate:nodeList": _cache[1] || (_cache[1] = ($event) => paymentNodeList.value = $event),
          "edge-list": paymentEdgeList.value,
          "onUpdate:edgeList": _cache[2] || (_cache[2] = ($event) => paymentEdgeList.value = $event),
          id: unref(getRandomId)(),
          type: "payment",
          onNodeUpdate: onPaymentNodeUpdate,
          onEdgeUpdate: onPaymentEdgeUpdate
        }, null, 8, ["node-list", "edge-list", "id"])) : createCommentVNode("", true),
        selectedTab.value === 2 ? (openBlock(), createBlock(_sfc_main$1, {
          key: 1,
          "node-list": stakeNodeList.value,
          "onUpdate:nodeList": _cache[3] || (_cache[3] = ($event) => stakeNodeList.value = $event),
          "edge-list": stakeEdgeList.value,
          "onUpdate:edgeList": _cache[4] || (_cache[4] = ($event) => stakeEdgeList.value = $event),
          id: unref(getRandomId)(),
          type: "stake"
        }, null, 8, ["node-list", "edge-list", "id"])) : createCommentVNode("", true),
        selectedTab.value === 3 ? (openBlock(), createBlock(_sfc_main$1, {
          key: 2,
          "node-list": drepNodeList.value,
          "onUpdate:nodeList": _cache[5] || (_cache[5] = ($event) => drepNodeList.value = $event),
          "edge-list": drepEdgeList.value,
          "onUpdate:edgeList": _cache[6] || (_cache[6] = ($event) => drepEdgeList.value = $event),
          id: unref(getRandomId)(),
          type: "drep"
        }, null, 8, ["node-list", "edge-list", "id"])) : createCommentVNode("", true)
      ]);
    };
  }
});

export { IconCopy02 as I, _sfc_main as _, useModalMultiSigWallet as a, IconFileDownload as b, IconBlockChain as c, useModalMultiSigEncrypt as d, createIUIMultiSigParticipant as e, _sfc_main$9 as f, IconFullscreen as g, useModalMultiSigFlow as u };
