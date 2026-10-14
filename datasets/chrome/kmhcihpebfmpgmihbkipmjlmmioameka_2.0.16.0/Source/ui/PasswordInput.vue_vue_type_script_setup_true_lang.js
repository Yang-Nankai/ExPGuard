const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["ui/web3.js","ui/base2.js","ui/index.js","ui/NetworkId.js","assets/index.css","ui/useSelectedAccount.js","ui/app2.js","ui/bigmath.js","ui/epochParams.js","ui/useAppAccountBalances.js","ui/useBiometricsAction.js","ui/_plugin-vue_export-helper.js","ui/IconAlert02.js","ui/IconPencil.js","ui/native2.js"])))=>i.map(i=>d[i]);
import { b_ as decryptText, r as registerPlugin, _ as __vitePreload, h as isAndroidApp, j as isIosApp, m as createElementBlock, o as openBlock, p as createBaseVNode, d as defineComponent, ab as mergeModels, ac as useModel, w as useTranslation, I as useBiometrics, e as ref, D as computed, G as watch, f as onMounted, N as nextTick, c as createBlock, z as resolveComponent, y as withCtx, t as createCommentVNode, a1 as withDirectives, u as unref, a2 as resolveDirective, n as createVNode, aO as withKeys, B as toDisplayString } from './index.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { u as useWalletSettings } from './useAppAccountBalances.js';
import { u as useBiometricsAction } from './useBiometricsAction.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { I as IconAlert02 } from './IconAlert02.js';
import { I as IconPencil } from './IconPencil.js';

const PW_REGEX_MODERATE = "(^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{12,}))|(^.{16,})";
const PW_REGEX_STRONG = "(^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{16,}))|(^.{22,})";
const regexModerate = new RegExp(PW_REGEX_MODERATE);
const regexStrong = new RegExp(PW_REGEX_STRONG);
var PasswordValidationResult = /* @__PURE__ */ ((PasswordValidationResult2) => {
  PasswordValidationResult2[PasswordValidationResult2["NO_ERROR"] = 0] = "NO_ERROR";
  PasswordValidationResult2[PasswordValidationResult2["ERROR"] = 1] = "ERROR";
  PasswordValidationResult2[PasswordValidationResult2["WEAK"] = 2] = "WEAK";
  PasswordValidationResult2[PasswordValidationResult2["MODERATE"] = 3] = "MODERATE";
  PasswordValidationResult2[PasswordValidationResult2["STRONG"] = 4] = "STRONG";
  PasswordValidationResult2[PasswordValidationResult2["CONFIRMED"] = 5] = "CONFIRMED";
  PasswordValidationResult2[PasswordValidationResult2["NOT_EQUAL"] = 6] = "NOT_EQUAL";
  return PasswordValidationResult2;
})(PasswordValidationResult || {});
const validatePassword = (val, external) => {
  const res = {
    result: 1 /* ERROR */,
    isValid: val === "asdf"
  };
  if (val.length === 0 && !external) {
    res.result = 0 /* NO_ERROR */;
    return res;
  } else if (val.length < 4) {
    return res;
  } else {
    if (regexStrong.test(val)) {
      res.result = 4 /* STRONG */;
      res.isValid = true;
    } else if (regexModerate.test(val)) {
      res.result = 3 /* MODERATE */;
      res.isValid = true;
    } else {
      res.result = 2 /* WEAK */;
    }
    return res;
  }
};
const checkPasswordCorrect = (password, encrypted, pwVersion) => {
  console.log("checkPasswordCorrect", password);
  console.log("checkPasswordCorrect encrypted", encrypted);
  console.log("checkPasswordCorrect pwVersion", pwVersion);
  const content = decryptText(encrypted, password, pwVersion);
  return content !== null && content.length > 0;
};
const usePasswordValidation = () => {
  return {
    validatePassword,
    checkPasswordCorrect
  };
};

/**
 * When one of the storage functions throws, the thrown StorageError
 * will have a .code property that contains one of these values.
 *
 * @modified 5.0.0
 */
var StorageErrorType;
(function (StorageErrorType) {
    /**
     * The key is null or empty.
     */
    StorageErrorType["missingKey"] = "missingKey";
    /**
     * `get()` found the data, but it is corrupted.
     */
    StorageErrorType["invalidData"] = "invalidData";
    /**
     * A system-level error occurred when getting/setting data from/to the store.
     */
    StorageErrorType["osError"] = "osError";
    /**
     * An unclassified system-level error occurred.
     */
    StorageErrorType["unknownError"] = "unknownError";
})(StorageErrorType || (StorageErrorType = {}));
/**
 * iOS only
 *
 * The keychain access option for the storage. The default is
 * `whenUnlocked`. For more information, see:
 * https://developer.apple.com/documentation/security/keychain_services/keychain_items/item_attribute_keys_and_values#1679100
 */
var KeychainAccess;
(function (KeychainAccess) {
    /**
      The data in the keychain item can be accessed only while the device is
      unlocked by the user.
  
      This is recommended for items that need to be accessible only while the
      application is in the foreground. Items with this attribute migrate to
      a new device when using encrypted backups.
  
      This is the default value for keychain items added without explicitly
      setting an accessibility constant.
     */
    KeychainAccess[KeychainAccess["whenUnlocked"] = 0] = "whenUnlocked";
    /**
      The data in the keychain item can be accessed only while the device is
      unlocked by the user.
  
      This is recommended for items that need to be accessible only while the
      application is in the foreground. Items with this attribute do not migrate
      to a new device. Thus, after restoring from a backup of a different device,
      these items will not be present.
     */
    KeychainAccess[KeychainAccess["whenUnlockedThisDeviceOnly"] = 1] = "whenUnlockedThisDeviceOnly";
    /**
      The data in the keychain item cannot be accessed after a restart until the
      device has been unlocked once by the user.
  
      After the first unlock, the data remains accessible until the next restart.
      This is recommended for items that need to be accessed by background
      applications. Items with this attribute migrate to a new device when using
      encrypted backups.
     */
    KeychainAccess[KeychainAccess["afterFirstUnlock"] = 2] = "afterFirstUnlock";
    /**
      The data in the keychain item cannot be accessed after a restart until
      the device has been unlocked once by the user.
  
      After the first unlock, the data remains accessible until the next restart.
      This is recommended for items that need to be accessed by background
      applications. Items with this attribute do not migrate to a new device.
      Thus, after restoring from a backup of a different device, these items
      will not be present.
     */
    KeychainAccess[KeychainAccess["afterFirstUnlockThisDeviceOnly"] = 3] = "afterFirstUnlockThisDeviceOnly";
    /**
      The data in the keychain can only be accessed when the device is unlocked.
      Only available if a passcode is set on the device.
  
      This is recommended for items that only need to be accessible while the
      application is in the foreground. Items with this attribute never migrate
      to a new device. After a backup is restored to a new device, these items
      are missing. No items can be stored in this class on devices without a
      passcode. Disabling the device passcode causes all items in this class to
      be deleted.
     */
    KeychainAccess[KeychainAccess["whenPasscodeSetThisDeviceOnly"] = 4] = "whenPasscodeSetThisDeviceOnly";
})(KeychainAccess || (KeychainAccess = {}));
/**
 * If one of the storage functions throws, it will throw a StorageError which
 * will have a .code property that can be tested against StorageErrorType,
 * and a .message property will have a message suitable for debugging purposes.
 *
 * @modified 5.0.0
 */
class StorageError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'StorageError';
        this.code = code;
    }
}

const proxy = registerPlugin('SecureStorage', {
    web: async () => {
        const module = await __vitePreload(() => import('./web3.js'),true              ?__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13]):void 0);
        return new module.SecureStorageWeb();
    },
    ios: async () => {
        const module = await __vitePreload(() => import('./native2.js'),true              ?__vite__mapDeps([14,1,2,3,4,5,6,7,8,9,10,11,12,13]):void 0);
        return new module.SecureStorageNative(proxy);
    },
    android: async () => {
        const module = await __vitePreload(() => import('./native2.js'),true              ?__vite__mapDeps([14,1,2,3,4,5,6,7,8,9,10,11,12,13]):void 0);
        return new module.SecureStorageNative(proxy);
    },
});

const useSecureStorage = () => {
  const getWalletIdSpendingPassword = (appWallet) => {
    return appWallet.id + "_sp";
  };
  const supportSecureStorage = () => {
    return isIosApp() || isAndroidApp();
  };
  const setPrefix = async () => {
    await proxy.setKeyPrefix("Eternl");
  };
  const storeValue = async (key, value) => {
    if (supportSecureStorage()) {
      await setPrefix();
      try {
        await proxy.setItem(key, value);
        console.log(`String saved successfully with key: ${key}`);
      } catch (error) {
        console.error("Error while saving string:", error);
      }
    }
  };
  const getString = async (key) => {
    if (supportSecureStorage()) {
      await setPrefix();
      try {
        const result = await proxy.getItem(key);
        if (result) {
          return result;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error while retrieving string:", error);
        return null;
      }
    }
  };
  const removeItem = async (key) => {
    await proxy.removeItem(key);
  };
  const clear = async () => {
    await proxy.clear();
  };
  return {
    getString,
    storeValue,
    supportSecureStorage,
    clear,
    removeItem,
    getWalletId: getWalletIdSpendingPassword
  };
};

const _sfc_main$6 = {  };

const _hoisted_1$6 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$5(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$6, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M4 8h16M4 16h16M6 20L18 4",
      color: "currentColor"
    }, null, -1)
  ]))]))
}
const IconNotEqual = /*#__PURE__*/_export_sfc(_sfc_main$6, [['render',_sfc_render$5]]);

const _sfc_main$5 = {  };

const _hoisted_1$5 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$4(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$5, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      color: "currentColor"
    }, [
      createBaseVNode("path", { d: "M13.408 16.668s.625 0 1.25 1.334c0 0 1.986-3.334 3.75-4m-1.465-7.001h.01m-5.01 0h.01m-5.01 0h.01m.939 4.968H5.008a3.004 3.004 0 0 1-3.008-3v-3.97c0-1.657 1.347-3 3.008-3h13.984a3.004 3.004 0 0 1 3.008 3v4.13" }),
      createBaseVNode("path", { d: "M22 16.002c0-3.314-2.694-6-6.017-6s-6.017 2.686-6.017 6s2.694 6 6.017 6s6.017-2.687 6.017-6" })
    ], -1)
  ]))]))
}
const IconInputOk = /*#__PURE__*/_export_sfc(_sfc_main$5, [['render',_sfc_render$4]]);

const _sfc_main$4 = {  };

const _hoisted_1$4 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$3(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$4, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M2 12.5a2 2 0 0 1 2-2a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3a2 2 0 0 1-2-2zm13.479-4.694l-.267.86c-.218.705-.327 1.057-.243 1.336a1 1 0 0 0 .42.547c.251.158.63.158 1.39.158h.404c2.57 0 3.855 0 4.462.76q.104.131.185.277c.467.848-.064 1.991-1.126 4.277c-.974 2.098-1.462 3.147-2.366 3.764q-.132.09-.27.17c-.952.545-2.132.545-4.492.545h-.511c-2.86 0-4.289 0-5.177-.86C7 18.779 7 17.394 7 14.624v-.974c0-1.455 0-2.183.258-2.85c.259-.666.753-1.213 1.743-2.309l4.091-4.53c.103-.114.154-.17.2-.21a1.033 1.033 0 0 1 1.442.091c.04.045.083.108.17.234c.135.196.202.294.261.392c.528.871.687 1.906.446 2.89c-.027.109-.062.222-.132.448",
      color: "currentColor"
    }, null, -1)
  ]))]))
}
const IconThumbsUp = /*#__PURE__*/_export_sfc(_sfc_main$4, [['render',_sfc_render$3]]);

const _sfc_main$3 = {  };

const _hoisted_1$3 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$3, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "m7.653 4.786l-.178.557c-.146.456-.218.684-.162.864a.64.64 0 0 0 .28.354c.167.102.42.102.926.102h.27c1.713 0 2.57 0 2.974.492q.07.085.123.18c.312.548-.042 1.288-.75 2.767c-.65 1.357-.974 2.036-1.577 2.435a3 3 0 0 1-.18.11C8.744 13 7.957 13 6.384 13h-.34c-1.907 0-2.86 0-3.452-.557S2 10.99 2 9.198v-.63c0-.942 0-1.413.172-1.844s.502-.786 1.162-1.494L6.06 2.298a2 2 0 0 1 .133-.136a.704.704 0 0 1 .962.06c.027.028.055.07.113.15c.09.128.135.191.175.254c.351.564.458 1.234.297 1.87c-.018.07-.042.144-.088.29m8.696 14.428l.177-.557c.146-.456.218-.684.162-.864a.64.64 0 0 0-.28-.354c-.167-.102-.42-.102-.926-.102h-.27c-1.713 0-2.57 0-2.974-.492a1.3 1.3 0 0 1-.123-.18c-.312-.548.042-1.288.75-2.767c.65-1.357.974-2.036 1.577-2.435q.089-.06.18-.11C15.256 11 16.043 11 17.616 11h.34c1.907 0 2.86 0 3.452.557S22 13.01 22 14.802v.63c0 .942 0 1.413-.172 1.844s-.502.786-1.162 1.494l-2.727 2.932c-.069.073-.103.11-.133.136a.704.704 0 0 1-.962-.06a2 2 0 0 1-.113-.15c-.09-.128-.135-.191-.175-.254a2.4 2.4 0 0 1-.297-1.87c.018-.07.042-.144.088-.29",
      color: "currentColor"
    }, null, -1)
  ]))]))
}
const IconThumbsUpDown = /*#__PURE__*/_export_sfc(_sfc_main$3, [['render',_sfc_render$2]]);

const _sfc_main$2 = {  };

const _hoisted_1$2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$2, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M2 11.5a2 2 0 0 0 2 2a3 3 0 0 0 3-3v-4a3 3 0 0 0-3-3a2 2 0 0 0-2 2zm13.479 4.694l-.267-.86c-.218-.705-.327-1.057-.243-1.336a.98.98 0 0 1 .42-.547c.251-.158.63-.158 1.39-.158h.404c2.57 0 3.855 0 4.462-.76q.104-.131.185-.277c.467-.848-.064-1.991-1.126-4.277c-.974-2.098-1.462-3.147-2.366-3.764a4 4 0 0 0-.27-.17c-.952-.545-2.132-.545-4.492-.545h-.511c-2.86 0-4.289 0-5.177.86C7 5.222 7 6.607 7 9.377v.974c0 1.455 0 2.183.258 2.85c.259.666.753 1.213 1.743 2.309l4.091 4.53c.103.114.154.17.2.21a1.033 1.033 0 0 0 1.442-.091c.04-.045.083-.108.17-.234a9 9 0 0 0 .261-.392a3.8 3.8 0 0 0 .446-2.89a8 8 0 0 0-.132-.448",
      color: "currentColor"
    }, null, -1)
  ]))]))
}
const IconThumbsDown = /*#__PURE__*/_export_sfc(_sfc_main$2, [['render',_sfc_render$1]]);

const _sfc_main$1 = {  };

const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$1, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M2.5 8.18677C2.60406 6.08705 2.91537 4.77792 3.84664 3.84664C4.77792 2.91537 6.08705 2.60406 8.18677 2.5M21.5 8.18677C21.3959 6.08705 21.0846 4.77792 20.1534 3.84664C19.2221 2.91537 17.9129 2.60406 15.8132 2.5M15.8132 21.5C17.9129 21.3959 19.2221 21.0846 20.1534 20.1534C21.0846 19.2221 21.3959 17.9129 21.5 15.8132M8.18676 21.5C6.08705 21.3959 4.77792 21.0846 3.84664 20.1534C2.91537 19.2221 2.60406 17.9129 2.5 15.8132",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M16.5 15.5V11C16.5 8.51472 14.4853 6.5 12 6.5C9.51472 6.5 7.5 8.51472 7.5 11V15.5",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M13.5 12.5V11C13.5 10.1716 12.8284 9.5 12 9.5C11.1716 9.5 10.5 10.1716 10.5 11V16.5M13.5 15.5V17.5",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconFingerprint = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render]]);

const _hoisted_1 = {
  key: 1,
  class: "w-full et-flex et-flex-row et-jc-ic"
};
const _hoisted_2 = {
  for: "passwordInput",
  class: "pl-1"
};
const _hoisted_3 = { key: 2 };
const maxTry = 3;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PasswordInput",
  props: /* @__PURE__ */ mergeModels({
    label: { type: String, required: false, default: "" },
    placeholder: { type: String, required: true },
    inputid: { type: String, required: false, default: "passwordInput" },
    preFilledPassword: { type: String, required: false, default: "" },
    skipValidation: { type: Boolean, required: false, default: false },
    meter: { type: Boolean, required: false, default: true },
    disabled: { type: Boolean, required: false, default: false },
    useOnlyNumbers: { type: Boolean, required: false, default: false },
    autofocus: { type: Boolean, required: false, default: false },
    centerInput: { type: Boolean, required: false, default: false },
    allowBiometrics: { type: Boolean, required: false, default: true }
  }, {
    "input": {
      type: String,
      required: true
    },
    "inputModifiers": {},
    "inputState": {
      type: Number,
      required: false,
      default: PasswordValidationResult.NO_ERROR
    },
    "inputStateModifiers": {},
    "isValid": {
      type: Boolean,
      required: false,
      default: true
    },
    "isValidModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["enter", "update"], ["update:input", "update:inputState", "update:isValid"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const input = useModel(
      __props,
      "input"
    );
    const inputState = useModel(
      __props,
      "inputState"
    );
    const isValid = useModel(
      __props,
      "isValid"
    );
    const emit = __emit;
    const { validatePassword } = usePasswordValidation();
    const $t = useTranslation().t;
    const { appWallet } = useSelectedAccount();
    const { enabledBiometrics } = useWalletSettings(appWallet);
    const { auth } = useBiometrics();
    const {
      openBiometricsAction,
      closeBiometricsAction
    } = useBiometricsAction();
    const tryCount = ref(0);
    const showUsePasswordButton = computed(() => tryCount.value >= maxTry);
    const showPasswordInstead = ref(false);
    const validatePasswordText = (value, external) => {
      if (props.skipValidation) {
        emit("update");
        return false;
      }
      const res = validatePassword(value, external);
      inputState.value = res.result;
      isValid.value = res.isValid;
      emit("update");
      return res.isValid;
    };
    const dynamicInputClasses = computed(() => {
      input.value?.length || 0;
      return "";
    });
    const doAuthBiometric = async () => {
      try {
        openBiometricsAction();
        console.warn("auth START");
        const success = await auth();
        console.warn("auth END");
        nextTick(() => {
          console.warn("auth nextTick");
          closeBiometricsAction();
        });
        if (success && appWallet?.value) {
          console.warn("auth useSecureStorage");
          const {
            getString,
            getWalletId,
            supportSecureStorage
          } = useSecureStorage();
          console.warn("auth useSecureStorage", supportSecureStorage);
          if (!supportSecureStorage()) {
            throw new Error("Cannot load old data. Please reset biometrics feature.");
          }
          const password = await getString(getWalletId(appWallet.value));
          console.warn("auth password", password);
          if (password) {
            console.warn("auth validatePasswordText", password);
            const res = validatePasswordText(password, false);
            console.warn("auth val", res);
            if (res) {
              input.value = password;
            }
          }
        } else {
          console.error("auth not successful");
          handleError();
        }
      } catch (err) {
        console.error("error:", err);
        handleError();
      }
    };
    const handleError = () => {
      tryCount.value++;
      inputState.value = PasswordValidationResult.ERROR;
    };
    watch(input, (newValue, oldValue) => {
      validatePasswordText(newValue, false);
    });
    onMounted(() => {
      nextTick(() => {
        if (props.autofocus) {
          document.getElementById("passwordInput")?.focus();
        }
      });
    });
    return (_ctx, _cache) => {
      const _component_InputGroupAddon = resolveComponent("InputGroupAddon");
      const _component_Password = resolveComponent("Password");
      const _component_FloatLabel = resolveComponent("FloatLabel");
      const _component_Button = resolveComponent("Button");
      const _component_InputGroup = resolveComponent("InputGroup");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createBlock(_component_InputGroup, { class: "w-full" }, {
        default: withCtx(() => [
          __props.meter ? (openBlock(), createBlock(_component_InputGroupAddon, {
            key: 0,
            class: "rounded-l-full"
          }, {
            default: withCtx(() => [
              inputState.value === unref(PasswordValidationResult).ERROR ? withDirectives((openBlock(), createBlock(IconAlert02, {
                key: 0,
                class: "et-text-negative"
              }, null, 512)), [
                [
                  _directive_tooltip,
                  unref($t)("password:spending.enter.error"),
                  void 0,
                  { top: true }
                ]
              ]) : inputState.value === unref(PasswordValidationResult).WEAK ? withDirectives((openBlock(), createBlock(IconThumbsDown, { key: 1 }, null, 512)), [
                [
                  _directive_tooltip,
                  unref($t)("password:general.weak"),
                  void 0,
                  { top: true }
                ]
              ]) : inputState.value === unref(PasswordValidationResult).MODERATE ? withDirectives((openBlock(), createBlock(IconThumbsUpDown, { key: 2 }, null, 512)), [
                [
                  _directive_tooltip,
                  unref($t)("password:general.medium"),
                  void 0,
                  { top: true }
                ]
              ]) : inputState.value === unref(PasswordValidationResult).STRONG ? withDirectives((openBlock(), createBlock(IconThumbsUp, { key: 3 }, null, 512)), [
                [
                  _directive_tooltip,
                  unref($t)("password:general.strong"),
                  void 0,
                  { top: true }
                ]
              ]) : inputState.value === unref(PasswordValidationResult).NOT_EQUAL ? withDirectives((openBlock(), createBlock(IconNotEqual, {
                key: 4,
                class: "et-text-negative"
              }, null, 512)), [
                [
                  _directive_tooltip,
                  unref($t)("password:spending.repeat.error"),
                  void 0,
                  { top: true }
                ]
              ]) : inputState.value === unref(PasswordValidationResult).CONFIRMED ? withDirectives((openBlock(), createBlock(IconInputOk, {
                key: 5,
                class: "et-text-positive"
              }, null, 512)), [
                [
                  _directive_tooltip,
                  unref($t)("password:spending.repeat.ok"),
                  void 0,
                  { top: true }
                ]
              ]) : (openBlock(), createBlock(IconPencil, { key: 6 }))
            ]),
            _: 1
          })) : createCommentVNode("", true),
          !__props.allowBiometrics || !unref(enabledBiometrics) || showUsePasswordButton.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
            createVNode(_component_FloatLabel, {
              class: "mx-auto",
              variant: "on"
            }, {
              default: withCtx(() => [
                createVNode(_component_Password, {
                  inputId: __props.inputid,
                  modelValue: input.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => input.value = $event),
                  fluid: "",
                  toggleMask: "",
                  pt: { pcinputtext: { root: (__props.meter ? "rounded-l-none" : "rounded-l-full") + " rounded-r-full pl-4" + dynamicInputClasses.value + (props.centerInput ? " text-center" : "") } },
                  placeholder: __props.meter ? "" : __props.label ? "" : __props.placeholder,
                  promptLabel: !!__props.placeholder ? __props.placeholder : unref($t)("password:general.prompt"),
                  "weak-label": inputState.value === unref(PasswordValidationResult).ERROR ? unref($t)("password:spending.enter.error") : unref($t)("password:general.weak"),
                  "medium-label": unref($t)("password:general.medium"),
                  "strong-label": unref($t)("password:general.strong"),
                  "medium-regex": unref(PW_REGEX_MODERATE),
                  "strong-regex": unref(PW_REGEX_STRONG),
                  disabled: __props.disabled,
                  feedback: __props.meter,
                  invalid: inputState.value === unref(PasswordValidationResult).ERROR,
                  autofocus: __props.autofocus,
                  inputProps: { inputmode: __props.useOnlyNumbers ? "numeric" : "text", maxlength: __props.useOnlyNumbers ? "numeric" : "text" },
                  class: "!h-14 text-center",
                  onKeydown: _cache[1] || (_cache[1] = withKeys(($event) => _ctx.$emit("enter"), ["enter"]))
                }, null, 8, ["inputId", "modelValue", "pt", "placeholder", "promptLabel", "weak-label", "medium-label", "strong-label", "medium-regex", "strong-regex", "disabled", "feedback", "invalid", "autofocus", "inputProps"]),
                createBaseVNode("label", _hoisted_2, toDisplayString(__props.label), 1)
              ]),
              _: 1
            })
          ])) : (openBlock(), createElementBlock("div", _hoisted_3, [
            !showPasswordInstead.value ? (openBlock(), createBlock(_component_Button, {
              key: 0,
              size: "small",
              label: unref($t)("sign-tx:biometrics.sign"),
              severity: "secondary",
              rounded: "",
              outlined: "",
              onClick: doAuthBiometric
            }, {
              icon: withCtx(() => [
                createVNode(IconFingerprint, {
                  class: "size-5",
                  color: "isValid ? 'green':''"
                })
              ]),
              _: 1
            }, 8, ["label"])) : createCommentVNode("", true)
          ]))
        ]),
        _: 1
      });
    };
  }
});

export { IconFingerprint as I, KeychainAccess as K, PasswordValidationResult as P, StorageError as S, _sfc_main as _, StorageErrorType as a, IconThumbsDown as b, IconThumbsUp as c, usePasswordValidation as d, useSecureStorage as u };
