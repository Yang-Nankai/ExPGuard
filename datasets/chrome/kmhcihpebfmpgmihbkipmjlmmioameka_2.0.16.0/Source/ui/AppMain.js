const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["ui/Preloader.js","ui/index.js","ui/NetworkId.js","assets/index.css","ui/eternl-256.js","ui/useModuleLoader.js","ui/index2.js","ui/usePreloader.js","ui/App.js","ui/Divider.js","ui/iconify.js","ui/language.js","ui/useFormatter.js","ui/bigmath.js","ui/app2.js","ui/epochParams.js","ui/BannerWarning.vue_vue_type_script_setup_true_lang.js","ui/IconAlert02.js","ui/_plugin-vue_export-helper.js","ui/TimezoneSetting.vue_vue_type_script_setup_true_lang.js","ui/currency2.js","ui/useCurrencyAPI.js","ui/useModalSelectCurrency.js","ui/InputSearch.vue_vue_type_script_setup_true_lang.js","ui/IconCancel01.js","ui/IconSearch01.js","ui/useNotification.js","ui/notification.js","ui/useFileSystemAccess.js","ui/chainTip.js","ui/chain.js","ui/NetworkIcons.js","ui/TabsToSelect.vue_vue_type_script_setup_true_lang.js","ui/Modal.vue_vue_type_script_setup_true_lang.js","ui/ModalHeader.vue_vue_type_script_setup_true_lang.js","ui/IconInformationCircle.js","ui/ModalContentCard.js","ui/image.js","ui/Badge.vue_vue_type_script_setup_true_lang.js","ui/contractMapping.js","ui/useModalSelectLanguage.js","ui/web2.js"])))=>i.map(i=>d[i]);
import { d as defineComponent, c as createBlock, o as openBlock, u as unref, a as defineAsyncComponent, _ as __vitePreload, b as appVersion, i as isPWAApp, r as registerPlugin, e as ref, f as onMounted, g as isMobileApp, h as isAndroidApp, j as isIosApp, k as onUnmounted, C as Capacitor, l as useTheme, m as createElementBlock, n as createVNode, p as createBaseVNode, q as setBlockTracking, t as createCommentVNode, F as Fragment } from './index.js';
import { u as useModuleLoader } from './useModuleLoader.js';
import { G as GradientBar2 } from './GradientBar2.js';
import './usePreloader.js';
import './NetworkId.js';
import './index2.js';
import './_plugin-vue_export-helper.js';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ModuleLoaderBar",
  setup(__props) {
    const {
      showModuleLoaderBar,
      progress
    } = useModuleLoader();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(GradientBar2, {
        progress: unref(progress),
        show: unref(showModuleLoaderBar)
      }, null, 8, ["progress", "show"]);
    };
  }
});

const moduleId$2 = "preloaderModule";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "PreloaderModule",
  setup(__props) {
    const {
      addModule,
      updateModuleLoadProgress
    } = useModuleLoader();
    addModule(moduleId$2);
    const Module = defineAsyncComponent({
      loader: async () => {
        updateModuleLoadProgress(moduleId$2, Math.random() * 0.15 + 0.5);
        const _comp = await __vitePreload(() => import('./Preloader.js'),true              ?__vite__mapDeps([0,1,2,3,4,5,6,7]):void 0);
        updateModuleLoadProgress(moduleId$2, Math.random() * 0.15 + 0.65);
        updateModuleLoadProgress(moduleId$2, 1);
        return _comp;
      },
      delay: 0
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Module));
    };
  }
});

// Register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

var isLocalhost = function () { return Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
); };

var waitWindowLoad;
// https://github.com/yyx990803/register-service-worker/pull/33#discussion_r394181861
if (typeof window !== 'undefined') {
  // Typically, a browser that supports `serviceWorker` should also have supported
  // `Promise`. But as this package can be used in environments without service
  // worker support (in that case it would do nothing), there's a chance that
  // `Promise` does not exist. So we must check for its existence first.
  if (typeof Promise !== 'undefined') {
    waitWindowLoad = new Promise(function (resolve) { return window.addEventListener('load', resolve); });
  } else {
    waitWindowLoad = { then: function (cb) { return window.addEventListener('load', cb); } };
  }
}

function register (swUrl, hooks) {
  if ( hooks === void 0 ) hooks = {};

  var registrationOptions = hooks.registrationOptions; if ( registrationOptions === void 0 ) registrationOptions = {};
  delete hooks.registrationOptions;

  var emit = function (hook) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    if (hooks && hooks[hook]) {
      hooks[hook].apply(hooks, args);
    }
  };

  if ('serviceWorker' in navigator) {
    waitWindowLoad.then(function () {
      if (isLocalhost()) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, emit, registrationOptions);
        navigator.serviceWorker.ready.then(function (registration) {
          emit('ready', registration);
        }).catch(function (error) { return handleError(emit, error); });
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl, emit, registrationOptions);
        navigator.serviceWorker.ready.then(function (registration) {
          emit('ready', registration);
        }).catch(function (error) { return handleError(emit, error); });
      }
    });
  }
}

function handleError (emit, error) {
  if (!navigator.onLine) {
    emit('offline');
  }
  emit('error', error);
}

function registerValidSW (swUrl, emit, registrationOptions) {
  navigator.serviceWorker
    .register(swUrl, registrationOptions)
    .then(function (registration) {
      emit('registered', registration);
      if (registration.waiting) {
        emit('updated', registration);
        return
      }
      registration.onupdatefound = function () {
        emit('updatefound', registration);
        var installingWorker = registration.installing;
        installingWorker.onstatechange = function () {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.
              emit('updated', registration);
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              emit('cached', registration);
            }
          }
        };
      };
    })
    .catch(function (error) { return handleError(emit, error); });
}

function checkValidServiceWorker (swUrl, emit, registrationOptions) {
  // Check if the service worker can be found.
  fetch(swUrl)
    .then(function (response) {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (response.status === 404) {
        // No service worker found.
        emit('error', new Error(("Service worker not found at " + swUrl)));
        unregister();
      } else if (response.headers.get('content-type').indexOf('javascript') === -1) {
        emit('error', new Error(
          "Expected " + swUrl + " to have javascript content-type, " +
          "but received " + (response.headers.get('content-type'))));
        unregister();
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, emit, registrationOptions);
      }
    })
    .catch(function (error) { return handleError(emit, error); });
}

function unregister () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.unregister();
    }).catch(function (error) { return handleError(emit, error); });
  }
}

const registerSW = async (sw, scope, showPrompt) => {
  if (appVersion.major === 2 && appVersion.minor === 0 && (appVersion.patch === 3 || appVersion.patch === 5 || appVersion.patch === 6)) {
    console.warn("SW: unregister v1 sw.js");
    unregister();
  }
  register(sw, {
    registrationOptions: { scope },
    async updated(registration) {
      console.log("New content is available; please refresh.", registration);
      await registration.unregister();
    },
    ready(registration) {
    },
    registered(registration) {
    },
    cached(registration) {
    },
    updatefound(registration) {
    },
    offline() {
    },
    error(err) {
    }
  });
};

const moduleId$1 = "pwa";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "PWAModule",
  setup(__props) {
    const {
      addModule,
      updateModuleLoadProgress
    } = useModuleLoader();
    if (isPWAApp()) {
      addModule(moduleId$1);
      console.warn("SW: sw.js");
      registerSW("/sw.js", "/");
      updateModuleLoadProgress(moduleId$1, 1);
    }
    return (_ctx, _cache) => {
      return null;
    };
  }
});

// Adapted from https://stackoverflow.com/a/8809472/2993077
if (!globalThis.crypto?.randomUUID) {
    if (!globalThis.crypto) {
        globalThis.crypto = {};
    }

    globalThis.crypto.randomUUID = () => {
        let
            d = new Date().getTime(),
            d2 = (performance?.now && (performance.now() * 1000)) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };
}

globalThis.crypto.randomUUID.bind(globalThis.crypto);

const moduleId = "appModule";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppModule",
  setup(__props) {
    const {
      addModule,
      updateModuleLoadProgress
    } = useModuleLoader();
    addModule(moduleId);
    const Module = defineAsyncComponent({
      loader: async () => {
        updateModuleLoadProgress(moduleId, 0.05);
        updateModuleLoadProgress(moduleId, 0.25);
        const _comp = await __vitePreload(() => import('./App.js'),true              ?__vite__mapDeps([8,1,2,3,6,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]):void 0);
        updateModuleLoadProgress(moduleId, 1);
        return _comp;
      },
      delay: 0
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Module));
    };
  }
});

/// <reference types="@capacitor/cli" />
var KeyboardStyle;
(function (KeyboardStyle) {
    /**
     * Dark keyboard.
     *
     * @since 1.0.0
     */
    KeyboardStyle["Dark"] = "DARK";
    /**
     * Light keyboard.
     *
     * @since 1.0.0
     */
    KeyboardStyle["Light"] = "LIGHT";
    /**
     * On iOS 13 and newer the keyboard style is based on the device appearance.
     * If the device is using Dark mode, the keyboard will be dark.
     * If the device is using Light mode, the keyboard will be light.
     * On iOS 12 the keyboard will be light.
     *
     * @since 1.0.0
     */
    KeyboardStyle["Default"] = "DEFAULT";
})(KeyboardStyle || (KeyboardStyle = {}));
var KeyboardResize;
(function (KeyboardResize) {
    /**
     * Only the `body` HTML element will be resized.
     * Relative units are not affected, because the viewport does not change.
     *
     * @since 1.0.0
     */
    KeyboardResize["Body"] = "body";
    /**
     * Only the `ion-app` HTML element will be resized.
     * Use it only for Ionic Framework apps.
     *
     * @since 1.0.0
     */
    KeyboardResize["Ionic"] = "ionic";
    /**
     * The whole native Web View will be resized when the keyboard shows/hides.
     * This affects the `vh` relative unit.
     *
     * @since 1.0.0
     */
    KeyboardResize["Native"] = "native";
    /**
     * Neither the app nor the Web View are resized.
     *
     * @since 1.0.0
     */
    KeyboardResize["None"] = "none";
})(KeyboardResize || (KeyboardResize = {}));

const Keyboard = registerPlugin('Keyboard');

const SafeArea = registerPlugin('SafeArea', {
    web: () => __vitePreload(() => import('./web2.js'),true              ?__vite__mapDeps([41,1,2,3]):void 0).then(m => new m.SafeAreaWeb()),
});

const _insets = ref();
const _keyboardAvailable = ref();
const _keyboardShows = ref(false);
const useMobileModule = () => {
  return {
    insets: _insets,
    keyboardAvailable: _keyboardAvailable,
    keyboardShows: _keyboardShows
  };
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MobileModule",
  setup(__props) {
    const {
      insets,
      keyboardAvailable,
      keyboardShows
    } = useMobileModule();
    const handleSafeArea = () => {
      SafeArea.getSafeAreaInsets().then((_insets) => {
        insets.value = _insets;
        for (const [key, value] of Object.entries(_insets)) {
          document.documentElement.style.setProperty(`--safe-area-inset-${key}`, `${value}px`);
        }
      });
      SafeArea.addListener("safeAreaChanged", (_insets) => {
        insets.value = _insets;
        for (const [key, value] of Object.entries(_insets)) {
          document.documentElement.style.setProperty(`--safe-area-inset-${key}`, `${value}px`);
        }
      });
    };
    const handleKeyboardAndroid = () => {
      if (!Capacitor.isPluginAvailable("Keyboard")) {
        return;
      }
      keyboardAvailable.value = true;
      const keyboardShowHandler = (info) => {
        keyboardShows.value = true;
        document.body.classList.remove("pb-safe");
      };
      const keyboardHideHandler = () => {
        keyboardShows.value = false;
        document.body.classList.add("pb-safe");
      };
      Keyboard.addListener("keyboardWillShow", keyboardShowHandler);
      Keyboard.addListener("keyboardWillHide", keyboardHideHandler);
    };
    const handleKeyboardIos = () => {
      if (!Capacitor.isPluginAvailable("Keyboard")) {
        return;
      }
      keyboardAvailable.value = true;
      const keyboardShowHandler = (info) => {
        keyboardShows.value = true;
        const kbHeight = info.keyboardHeight || 0;
        document.documentElement.style.setProperty("--ios-keyboard-inset-bottom", `${kbHeight}px`);
        document.body.classList.remove("pb-safe");
        document.body.classList.add("pb-ios-keyboard");
        setTimeout(() => {
          const ae = document.activeElement;
          if (!ae || !(ae.tagName === "INPUT" || ae.tagName === "TEXTAREA" || ae.isContentEditable)) {
            return;
          }
          const popover = document.querySelector(".p-popover");
          if (popover) {
            const rect = popover.getBoundingClientRect();
            const kbTop = window.innerHeight - kbHeight;
            const isObscured = rect.bottom > kbTop - 20;
            if (isObscured) {
              const offset = Math.ceil(rect.bottom - kbTop + 20);
              popover.style.transform = `translateY(-${offset}px)`;
            }
          } else {
            const rect = ae.getBoundingClientRect();
            const kbTop = window.innerHeight - kbHeight;
            const isObscured = rect.bottom > kbTop - 80;
            if (isObscured) {
              const offset = Math.ceil(rect.bottom - kbTop + 80);
              const cont = document.querySelector(".scroll-anchor");
              if (cont) {
                cont.scrollBy({ top: offset, behavior: "smooth" });
              } else {
                console.warn("Could not find a '.scroll-anchor' element to scroll.");
              }
            }
          }
        }, 333);
      };
      const keyboardHideHandler = () => {
        keyboardShows.value = false;
        const popover = document.querySelector(".p-popover");
        if (popover) {
          popover.style.transform = "";
        }
        document.body.classList.remove("pb-ios-keyboard");
        document.body.classList.add("pb-safe");
      };
      Keyboard.setResizeMode({ mode: KeyboardResize.None });
      Keyboard.setScroll({ isDisabled: true });
      Keyboard.addListener("keyboardWillShow", keyboardShowHandler);
      Keyboard.addListener("keyboardWillHide", keyboardHideHandler);
    };
    onMounted(() => {
      if (!isMobileApp()) {
        return;
      }
      document.body.classList.add("min-h-screen-safe", "pt-safe", "pl-safe", "pr-safe", "pb-safe");
      if (isAndroidApp()) {
        document.body.classList.add("h-screen-safe", "max-h-screen-safe");
        handleSafeArea();
        handleKeyboardAndroid();
      } else if (isIosApp()) {
        handleSafeArea();
        handleKeyboardIos();
      }
    });
    onUnmounted(() => {
      Keyboard.removeAllListeners();
    });
    return (_ctx, _cache) => {
      return null;
    };
  }
});

const _hoisted_1 = { class: "absolute top-0 inset-x-0 h-1 overflow-hidden" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppMain",
  setup(__props) {
    const { checkInitialTheme } = useTheme();
    checkInitialTheme();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[0] || (setBlockTracking(-1, true), (_cache[0] = unref(isMobileApp)() ? (openBlock(), createBlock(_sfc_main$1, { key: 0 })) : createCommentVNode("", true)).cacheIndex = 0, setBlockTracking(1), _cache[0]),
        createVNode(_sfc_main$3),
        createVNode(_sfc_main$2),
        createVNode(_sfc_main$4),
        createBaseVNode("div", _hoisted_1, [
          createVNode(_sfc_main$5)
        ])
      ], 64);
    };
  }
});

export { _sfc_main as default };
