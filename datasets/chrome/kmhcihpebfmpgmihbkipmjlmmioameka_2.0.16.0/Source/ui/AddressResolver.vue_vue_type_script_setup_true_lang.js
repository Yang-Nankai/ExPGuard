import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { m as createElementBlock, o as openBlock, p as createBaseVNode, d as defineComponent, ab as mergeModels, w as useTranslation, ac as useModel, e as ref, D as computed, G as watch, c as createBlock, t as createCommentVNode, z as resolveComponent, aO as withKeys, y as withCtx, W as resolveDynamicComponent, B as toDisplayString, n as createVNode, u as unref, v as createStaticVNode, a0 as renderSlot, ad as dispatchSignalSync, aS as onUpdateTfBundleSize, ae as isRef, f as onMounted, aE as addSignalListener, k as onUnmounted, aF as removeSignalListener, P as networkId, aM as el, aN as sl, bI as DEFAULT_ACCOUNT_ID, N as nextTick, Y as toRefs, x as useScreenSize, aP as markRaw, V as normalizeClass, F as Fragment, S as renderList, U as withModifiers, a1 as withDirectives, a2 as resolveDirective } from './index.js';
import { I as IconFxLoader } from './IconFxLoader.js';
import { I as IconAlert02 } from './IconAlert02.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { c as appFormatTag } from './language.js';
import { g as getRandomId, f as getRequestData, A as ApiRequestType, N as onUIAccountSelected } from './epochParams.js';
import { aJ as AdaHandleError, e as getIAppAccountById, aK as isValidSendAddress, bT as isScriptAddress, d3 as UnstoppableDomainsError, E as ErrorBuildTx, d4 as walletAccountNameList, aq as getIAppAccountByAddress } from './app2.js';
import { o as onAddressBookEntryUpdated, c as onAddressBookEntryDeleted, e as getAddressBookEntryByMode, b as getAddressBookEntryByAddress, f as getAddressBookEntryByName, u as updateAddressBookEntry, h as deleteAddressBookEntry, i as addressBookNames } from './contractMapping.js';
import { S as SendModeAdaHandle, s as SendModeCardano, t as SendModeCardanoScript, u as SendModeUnstoppableDomains, C as CONTRACT_BADGE, _ as _sfc_main$f } from './Badge.vue_vue_type_script_setup_true_lang.js';
import { B as getCachedHandle, p as getAssetCDNImage, o as MediaSize, C as resolveAdaHandle, D as isAdaHandle, E as getReceiveAddress, i as useAccountSettings } from './useAppAccountBalances.js';
import { u as unstoppableDomainsLogo, c as cardanoLogo, a as adaHandleLogo } from './image.js';
import { u as useBuildAccount } from './lib.js';
import { a as useWalletAccount } from './TransactionAssetList.vue_vue_type_script_setup_true_lang.js';
import { b as useAddressInfos } from './TransactionUTxODetails.vue_vue_type_script_setup_true_lang.js';
import { u as useModalSelectAccount } from './IconPlusSign.js';
import { u as useModalScanQR, I as IconQR } from './IconQR.js';
import { I as IconCancel01 } from './IconCancel01.js';
import { u as useNotifications } from './useNotification.js';
import { _ as _sfc_main$i } from './ContextMenu.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$e } from './TransactionUTxOAddress.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$d } from './ResolvedImage.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$g } from './AdaHandleName.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$h } from './BannerWarning.vue_vue_type_script_setup_true_lang.js';
import { B as ButtonRow } from './ButtonRow.js';

const _sfc_main$c = {  };

const _hoisted_1$b = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$5(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$b, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",
      stroke: "currentColor",
      "stroke-width": "1.5"
    }, null, -1),
    createBaseVNode("path", {
      d: "M12.0025 7.03857L12.0025 14.0889M12.0025 14.0889C12.3286 14.0933 12.6503 13.8691 12.8876 13.5956L14.4771 11.8129M12.0025 14.0889C11.6879 14.0847 11.3693 13.8618 11.1174 13.5955L9.51864 11.8129M7.98633 17.0386L15.9863 17.0386",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    }, null, -1)
  ]))]))
}
const IconDownload = /*#__PURE__*/_export_sfc(_sfc_main$c, [['render',_sfc_render$5]]);

const _sfc_main$b = {  };

const _hoisted_1$a = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$4(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$a, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      color: "currentColor"
    }, [
      createBaseVNode("path", { d: "M12.5 2h.273c3.26 0 4.892 0 6.024.798c.324.228.612.5.855.805c.848 1.066.848 2.6.848 5.67v2.545c0 2.963 0 4.445-.469 5.628c-.754 1.903-2.348 3.403-4.37 4.113c-1.257.441-2.83.441-5.98.441c-1.798 0-2.698 0-3.416-.252c-1.155-.406-2.066-1.263-2.497-2.35c-.268-.676-.268-1.523-.268-3.216V12" }),
      createBaseVNode("path", { d: "M20.5 12a3.333 3.333 0 0 1-3.333 3.333c-.666 0-1.451-.116-2.098.057a1.67 1.67 0 0 0-1.179 1.179c-.173.647-.057 1.432-.057 2.098A3.333 3.333 0 0 1 10.5 22m-6-17.5C4.992 3.994 6.3 2 7 2m2.5 2.5C9.008 3.994 7.7 2 7 2m0 0v8" })
    ], -1)
  ]))]))
}
const IconFileUpload = /*#__PURE__*/_export_sfc(_sfc_main$b, [['render',_sfc_render$4]]);

const _hoisted_1$9 = { class: "pl-2 pr-3 py-2 flex et-js-ic cursor-pointer" };
const _hoisted_2$4 = { class: "ml-2 et-text-sm" };
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "TextAreaWithError",
  props: /* @__PURE__ */ mergeModels({
    suggestions: { type: Array, required: false },
    placeholder: { type: String, required: false, default: null },
    allowEnter: { type: Boolean, required: false, default: false },
    queryDelay: { type: Number, required: false, default: 250 },
    preventPaste: { type: Boolean, required: false, default: false },
    preventPasteError: { type: String, required: false, default: "" },
    autofocus: { type: Boolean, required: false, default: void 0 },
    disabled: { type: Boolean, required: false, default: false },
    dropdown: { type: Boolean, required: false, default: true }
  }, {
    "input": { type: [String, Object], required: true },
    "inputModifiers": {},
    "error": { type: void 0, required: false, default: void 0 },
    "errorModifiers": {},
    "success": { type: String, required: false },
    "successModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["enter"], ["update:input", "update:error", "update:success"]),
  setup(__props, { emit: __emit }) {
    const $t = useTranslation().t;
    const input = useModel(__props, "input");
    const error = useModel(__props, "error");
    const success = useModel(__props, "success");
    const props = __props;
    const emit = __emit;
    const { showError } = useNotifications();
    const _suggestions = ref();
    const placeholder = computed(() => {
      return props.placeholder ?? $t("send-recipient:address.placeholder");
    });
    const resetSuggestions = () => {
      if (!props.suggestions) {
        _suggestions.value = void 0;
        return;
      }
      if (props.suggestions.length === 0) {
        _suggestions.value = [];
        return;
      }
      _suggestions.value = typeof props.suggestions[0] === "string" ? props.suggestions.map((s) => ({ id: s, label: s })) : props.suggestions;
    };
    const findGroup = (query) => {
      if (!props.suggestions || props.suggestions.length === 0 || !query) {
        resetSuggestions();
      } else {
        const _query = query.toLowerCase();
        if (typeof props.suggestions[0] === "string") {
          _suggestions.value = props.suggestions.filter((s) => s.toLowerCase().includes(_query)).map((s) => ({ id: s, label: s }));
        } else {
          _suggestions.value = props.suggestions.filter((s) => s.label.toLowerCase().includes(_query));
        }
      }
    };
    const onEnter = (event) => {
      if (props.allowEnter) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      emit("enter");
    };
    const onPaste = (event) => {
      if (props.preventPaste) {
        event.preventDefault();
        event.stopPropagation();
        if (props.preventPasteError) {
          showError(props.preventPasteError);
        }
      }
    };
    watch(() => props.suggestions, () => {
      resetSuggestions();
    }, { immediate: true });
    return (_ctx, _cache) => {
      const _component_AutoComplete = resolveComponent("AutoComplete");
      const _component_Textarea = resolveComponent("Textarea");
      return __props.suggestions ? (openBlock(), createBlock(_component_AutoComplete, {
        key: 0,
        modelValue: input.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => input.value = $event),
        suggestions: _suggestions.value,
        invalid: !!error.value,
        optionLabel: "label",
        dropdown: __props.dropdown,
        autoResize: "",
        autofocus: __props.autofocus,
        disabled: __props.disabled,
        delay: __props.queryDelay,
        showEmptyMessage: false,
        type: "text",
        rows: 1,
        pt: {
          pcinputtext: {
            root: "grow border-0 border-b rounded-none bg-transparent px-1 py-1"
          },
          dropdown: "mr-8 border-0 border-b rounded-none bg-transparent",
          loader: "mr-4 bg-transparent",
          root: "grow w-full"
        },
        placeholder: placeholder.value ?? void 0,
        onPaste: _cache[1] || (_cache[1] = ($event) => onPaste($event)),
        onKeydown: _cache[2] || (_cache[2] = withKeys(($event) => onEnter($event), ["enter"])),
        onComplete: _cache[3] || (_cache[3] = ($event) => findGroup($event.query))
      }, {
        option: withCtx((slotProps) => [
          createBaseVNode("a", _hoisted_1$9, [
            slotProps.option.icon ? (openBlock(), createBlock(resolveDynamicComponent(slotProps.option.icon), {
              key: 0,
              class: "shrink-0 size-5"
            })) : createCommentVNode("", true),
            createBaseVNode("span", _hoisted_2$4, toDisplayString(slotProps.option.label), 1)
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "suggestions", "invalid", "dropdown", "autofocus", "disabled", "delay", "placeholder"])) : typeof input.value === "string" ? (openBlock(), createBlock(_component_Textarea, {
        key: 1,
        modelValue: input.value,
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => input.value = $event),
        invalid: !!error.value,
        autoResize: "",
        autofocus: __props.autofocus,
        disabled: __props.disabled,
        type: "text",
        rows: 1,
        pt: {
          root: "grow w-full pl-0.5 pt-2 pb-1 ml-0 pr-8 min-h-8 sm:min-h-8 border-0 border-b rounded-none bg-transparent  break-all" + (!!success.value ? "border-b-bg-positive" : "  " + (!!error.value ? "border-b-red" : ""))
        },
        placeholder: placeholder.value ?? void 0,
        onKeydown: _cache[5] || (_cache[5] = withKeys(($event) => onEnter($event), ["enter"])),
        onPaste: _cache[6] || (_cache[6] = ($event) => onPaste($event))
      }, null, 8, ["modelValue", "invalid", "autofocus", "disabled", "pt", "placeholder"])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$8 = { class: "w-full flex flex-col et-jb-ic et-gap-md" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "Processing",
  props: /* @__PURE__ */ mergeModels({
    label: { type: String, required: false, default: "" }
  }, {
    "isDoneProcessing": { type: Boolean, required: true },
    "isDoneProcessingModifiers": {},
    "isProcessing": { type: Boolean, required: true },
    "isProcessingModifiers": {}
  }),
  emits: ["update:isDoneProcessing", "update:isProcessing"],
  setup(__props) {
    const $t = useTranslation().t;
    const isDoneProcessing = useModel(__props, "isDoneProcessing");
    const isProcessing = useModel(__props, "isProcessing");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createVNode(IconFxLoader, {
          finished: isDoneProcessing.value,
          onDone: _cache[0] || (_cache[0] = ($event) => isProcessing.value = false)
        }, null, 8, ["finished"]),
        createBaseVNode("span", null, toDisplayString(__props.label || unref($t)("wallet-add-common:status.processing")), 1)
      ]);
    };
  }
});

const _sfc_main$8 = {  };

const _hoisted_1$7 = {
  width: "100%",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  xmlns: "http://www.w3.org/2000/svg"
};

function _sfc_render$3(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$7, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M14.9378 4.86854L5.77443 14.0319C5.30096 14.5047 4.97806 15.1071 4.84642 15.7631L4 20L8.23687 19.152C8.89288 19.0208 9.49449 18.6992 9.9681 18.2256L19.1315 9.06221C19.4068 8.78685 19.6253 8.45995 19.7743 8.10017C19.9233 7.7404 20 7.35479 20 6.96537C20 6.57596 19.9233 6.19035 19.7743 5.83057C19.6253 5.4708 19.4068 5.1439 19.1315 4.86854C18.8561 4.59318 18.5292 4.37475 18.1694 4.22573C17.8097 4.0767 17.424 4 17.0346 4C16.6452 4 16.2596 4.0767 15.8998 4.22573C15.54 4.37475 15.2132 4.59318 14.9378 4.86854Z",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M13 7L17 11",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconPencilOutline = /*#__PURE__*/_export_sfc(_sfc_main$8, [['render',_sfc_render$3]]);

const _sfc_main$7 = {  };

const _hoisted_1$6 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$6, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<path stroke=\"currentColor\" stroke-width=\"1.5\" fill=\"none\" d=\"M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12105 13.2453 4 14.3624 4 15.5C4 16.6376 4.12105 17.7547 4.26781 18.8447Z\"></path><path stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" color=\"currentColor\" fill=\"none\" d=\"M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9\"></path><path stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" color=\"currentColor\" fill=\"none\" d=\"M16 15.49V15.5\"></path><path stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" color=\"currentColor\" fill=\"none\" d=\"M12 15.49V15.5\"></path><path stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" color=\"currentColor\" fill=\"none\" d=\"M8 15.49V15.5\"></path>", 5)
  ]))]))
}
const IconLockClosed = /*#__PURE__*/_export_sfc(_sfc_main$7, [['render',_sfc_render$2]]);

const _hoisted_1$5 = { class: "et-text-md font-semibold text-txt-negative cap-first" };
const _hoisted_2$3 = {
  key: 0,
  class: "text-txt-negative break-words whitespace-pre-wrap"
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "BannerError",
  props: {
    headline: { type: String },
    caption: { type: String }
  },
  setup(__props) {
    const panel = ref();
    const onToggleCollapsed = () => {
      panel.value?.toggle();
    };
    return (_ctx, _cache) => {
      const _component_Panel = resolveComponent("Panel");
      return openBlock(), createBlock(_component_Panel, {
        ref_key: "panel",
        ref: panel,
        class: "w-full bg-bg-negative rounded-2xl!",
        pt: {
          pctogglebutton: {
            root: "bg-bg-negative hover:bg-bg-app/20 text-txt-negative outline-txt-negative"
          },
          content: __props.caption ? "" : "py-0"
        },
        toggleable: !!__props.caption && __props.caption.length > 0
      }, {
        header: withCtx(() => [
          createBaseVNode("div", {
            class: "w-full flex et-ic et-gap-sme cursor-pointer",
            onClick: onToggleCollapsed
          }, [
            renderSlot(_ctx.$slots, "icon", {}, () => [
              createVNode(IconAlert02, { class: "shrink-0 grow-0 w-5 sm:w-6 fill-none text-txt-negative" })
            ]),
            createBaseVNode("span", _hoisted_1$5, toDisplayString(__props.headline), 1)
          ])
        ]),
        default: withCtx(() => [
          __props.caption ? (openBlock(), createElementBlock("span", _hoisted_2$3, toDisplayString(__props.caption), 1)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["pt", "toggleable"]);
    };
  }
});

const { accountSettings } = useSelectedAccount();
const {
  isTfEnabled,
  tfBundleSize,
  toggleTF,
  updateTFBundleSize
} = accountSettings;
const MIN_TOKEN_BUNDLE_SIZE = 1;
const MAX_TOKEN_BUNDLE_SIZE = 150;
const useTokenFragmentation = () => {
  const fragInput = ref(tfBundleSize.value);
  const validateFragInput = async (valueArg) => {
    if (fragInput.value) {
      await updateTFBundleSize(Number(fragInput.value));
      dispatchSignalSync(onUpdateTfBundleSize, fragInput.value);
    }
  };
  return {
    MIN_TOKEN_BUNDLE_SIZE,
    MAX_TOKEN_BUNDLE_SIZE,
    isTfEnabled,
    tfBundleSize,
    fragInput,
    toggleTF,
    updateTFBundleSize,
    validateFragInput
  };
};

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "TokenFragmentationNumberInput",
  setup(__props) {
    const { accountSettings } = useSelectedAccount();
    const { isTfEnabled } = accountSettings;
    const {
      validateFragInput,
      fragInput,
      MAX_TOKEN_BUNDLE_SIZE,
      MIN_TOKEN_BUNDLE_SIZE
    } = useTokenFragmentation();
    const updateInput = async (input) => {
      return validateFragInput(input);
    };
    const onReset = () => {
      fragInput.value = 20;
    };
    watch(fragInput, () => {
      if (fragInput.value === 0) {
        onReset();
      }
    });
    return (_ctx, _cache) => {
      const _component_InputNumber = resolveComponent("InputNumber");
      return openBlock(), createBlock(_component_InputNumber, {
        modelValue: unref(fragInput),
        "onUpdate:modelValue": [
          _cache[0] || (_cache[0] = ($event) => isRef(fragInput) ? fragInput.value = $event : null),
          updateInput
        ],
        class: "w-full",
        disabled: !unref(isTfEnabled),
        max: unref(MAX_TOKEN_BUNDLE_SIZE),
        min: unref(MIN_TOKEN_BUNDLE_SIZE),
        locale: unref(appFormatTag)
      }, null, 8, ["modelValue", "disabled", "max", "min", "locale"]);
    };
  }
});

const doLog$2 = false;
const storeId$3 = "useAdaHandle";
const sendMode$3 = SendModeAdaHandle;
const useAdaHandle = (addressResolver) => {
  const {
    output,
    addressBookEntry,
    addrInput,
    addrInputError,
    addrInputModeFixed,
    addrInputMode,
    showResolveButton,
    isResolving,
    isResolved,
    resolvedAddr,
    isImageResolving,
    isImageResolved,
    resolvedImage,
    resolveImageError,
    resolveImageErrorType,
    onErrorAddress
  } = addressResolver;
  const isActiveMode = ref(false);
  const isValidModeAddress = ref(false);
  const lastEvaluatedAddr = ref("");
  const checkValidModeAddress = () => {
    if (addrInputModeFixed.value && !isActiveMode.value) {
      return;
    }
    const addr = addrInput.value.trim();
    if (isAdaHandle(addr)) {
      isValidModeAddress.value = true;
      return true;
    }
    isValidModeAddress.value = false;
    return false;
  };
  const checkAddressBookEntry = (_addr) => {
    if (addrInputMode.value === sendMode$3) {
      const addr = addrInput.value.trim();
      addressBookEntry.value = getAddressBookEntryByMode(addr, sendMode$3) ?? getAddressBookEntryByAddress(_addr ?? addr) ?? getAddressBookEntryByName(addr);
      if (addressBookEntry.value) {
        const handle = getCachedHandle(addr);
        if (handle) {
          setResolvedAddress(addr, handle.address);
          resolveImage(handle.fingerprint);
        } else {
          resolveAddress(addr);
        }
      }
    }
  };
  const checkResolved = () => {
    setUnresolved();
    if (addrInputModeFixed.value && !isActiveMode.value) {
      return;
    }
    const addr = addrInput.value.trim();
    const handle = getCachedHandle(addr);
    if (handle) {
      resolveAddress(addr);
    }
  };
  const reevaluate = (force = false) => {
    if (typeof addrInput.value === "object") {
      return;
    }
    if (addrInputModeFixed.value && !isActiveMode.value) {
      return;
    }
    if (lastEvaluatedAddr.value === addrInput.value.trim() && !force) {
      return;
    }
    lastEvaluatedAddr.value = addrInput.value.trim();
    checkValidModeAddress();
    checkAddressBookEntry();
    if (addrInputMode.value === sendMode$3) {
      if (isValidModeAddress.value) {
        addrInputError.value = "";
        if (!addressBookEntry.value) {
          checkResolved();
        }
      } else {
        if (addrInput.value.trim().length > 0) {
          onErrorAddress("sendMode:adaHandle.error.invalid", "translate", -1, storeId$3);
        } else {
          addrInputError.value = "";
        }
        setUnresolved();
      }
    }
  };
  const onModeActivated = () => {
    isActiveMode.value = true;
    showResolveButton.value = true;
    reevaluate(true);
  };
  const onModeDeactivated = () => {
    isActiveMode.value = false;
  };
  const setUnresolved = () => {
    resolvedAddr.value = "";
    isResolved.value = false;
    if (output.value) {
      output.value.adaHandle = "";
      output.value.adaHandleAddress = "";
    }
  };
  const setResolvedAddress = (handle, addr) => {
    resolvedAddr.value = addr;
    isResolved.value = true;
    if (output.value) {
      output.value.adaHandle = handle;
      output.value.adaHandleAddress = addr;
    }
  };
  const resolveAddress = async (_forcedAddr) => {
    if (addrInputMode.value !== sendMode$3) {
      return;
    }
    if (_forcedAddr) {
      addrInput.value = _forcedAddr.trim();
    }
    const addr = addrInput.value.trim();
    resetResolvedAddress();
    isResolving.value = true;
    isImageResolving.value = true;
    try {
      const handle = await resolveAdaHandle(networkId.value, addr);
      if (doLog$2) ;
      setResolvedAddress(addr, handle.address);
      resolveImage(handle.fingerprint);
      checkAddressBookEntry(handle.address);
    } catch (err) {
      if (err === AdaHandleError.invalidAddress) {
        onErrorAddress("sendMode:adaHandle.error.address.invalid", "translate", -1, storeId$3);
      } else if (err === AdaHandleError.invalidAdaHandle) {
        onErrorAddress("sendMode:adaHandle.error.invalid", "translate", -1, storeId$3);
      } else if (err === AdaHandleError.adaHandleNotResolved) {
        onErrorAddress("sendMode:adaHandle.error.resolve", "translate", -1, storeId$3);
      } else {
        console.error(err);
        onErrorAddress(err, "string", -1, storeId$3);
      }
    }
    isResolving.value = false;
  };
  const resetResolvedAddress = () => {
    isResolving.value = false;
    setUnresolved();
    isImageResolving.value = false;
    isImageResolved.value = false;
    resolvedImage.value = "";
    resolveImageError.value = "";
    resolveImageErrorType.value = "translate";
  };
  const resolveImage = async (fingerprint) => {
    isImageResolving.value = true;
    const assetCDN = await getAssetCDNImage(fingerprint, MediaSize.HIGH);
    if (!assetCDN) {
      resolveImageError.value = "sendMode:adaHandle.error.image";
      resolveImageErrorType.value = "translate";
    } else {
      resolvedImage.value = assetCDN;
      isImageResolved.value = true;
    }
    isImageResolving.value = false;
  };
  watch(addrInput, (value) => {
    if (addrInputModeFixed.value && !isActiveMode.value) {
      return;
    }
    reevaluate();
  }, { immediate: true });
  watch(isValidModeAddress, (value) => {
  }, { immediate: true });
  const signalId = storeId$3 + getRandomId();
  onMounted(() => {
    addSignalListener(onAddressBookEntryUpdated, signalId, checkAddressBookEntry);
    addSignalListener(onAddressBookEntryDeleted, signalId, checkAddressBookEntry);
  });
  onUnmounted(() => {
    removeSignalListener(onAddressBookEntryUpdated, signalId);
    removeSignalListener(onAddressBookEntryDeleted, signalId);
  });
  return {
    isActiveMode,
    isValidModeAddress,
    onModeActivated,
    onModeDeactivated,
    resolveAddress,
    resetResolvedAddress,
    resolveImage
  };
};

const storeId$2 = "useCardanoMode";
const sendMode$2 = SendModeCardano;
const useCardanoMode = (addressResolver) => {
  const {
    addressBookEntry,
    validateImmediately,
    addrInput,
    addrInputError,
    addrInputModeFixed,
    addrInputMode,
    showResolveButton,
    resolvedAddr,
    isResolved,
    onErrorAddress
  } = addressResolver;
  const isActiveMode = ref(false);
  const isValidModeAddress = ref(false);
  const lastEvaluatedAddr = ref("");
  const checkValidModeAddress = () => {
    if (addrInputModeFixed.value && !isActiveMode.value) {
      return;
    }
    const addr = addrInput.value.trim();
    if (isValidSendAddress(networkId.value, addr) && !isScriptAddress(addr)) {
      isValidModeAddress.value = true;
      return true;
    }
    isValidModeAddress.value = false;
    return false;
  };
  const checkHasAddressBookName = () => {
    if (addrInputMode.value === sendMode$2 && typeof addrInput.value === "object" && addrInput.value.type === "ab") {
      const input = addrInput.value.label;
      const _addressBookEntry = getAddressBookEntryByName(input);
      if (_addressBookEntry) {
        if (isAdaHandle(_addressBookEntry.name)) {
          addrInput.value = _addressBookEntry.name;
        } else {
          addrInput.value = _addressBookEntry.address;
        }
      }
    }
  };
  const checkHasAccount = () => {
    if (addrInputMode.value === sendMode$2 && typeof addrInput.value === "object" && addrInput.value.type === "acc") {
      const accountId = addrInput.value.id;
      const appAccount = getIAppAccountById(accountId);
      if (!appAccount) {
        return;
      }
      const receiveAddress = getReceiveAddress(appAccount.data);
      if (receiveAddress) {
        addrInput.value = receiveAddress.bech32;
      }
    }
  };
  const checkAddressBookEntry = () => {
    if (addrInputMode.value === sendMode$2) {
      const addr = addrInput.value;
      addressBookEntry.value = getAddressBookEntryByMode(addr, sendMode$2) ?? getAddressBookEntryByAddress(addr);
    }
  };
  const reevaluate = (force = false) => {
    if (addrInputModeFixed.value && !isActiveMode.value) {
      return;
    }
    if (lastEvaluatedAddr.value === addrInput.value && !force) {
      return;
    }
    checkHasAddressBookName();
    checkHasAccount();
    if (typeof addrInput.value === "object") {
      addrInput.value = addrInput.value.label;
    }
    checkValidModeAddress();
    checkAddressBookEntry();
    lastEvaluatedAddr.value = addrInput.value;
    if (addrInputMode.value === sendMode$2) {
      if (isValidModeAddress.value) {
        addrInputError.value = "";
        resolvedAddr.value = addrInput.value;
        isResolved.value = true;
      } else {
        if (addrInput.value.length > 0) {
          onErrorAddress("sendMode:cardano.error.invalid", "translate", -1);
        } else {
          addrInputError.value = "";
        }
        resolvedAddr.value = "";
        isResolved.value = false;
      }
    }
  };
  const onModeActivated = () => {
    isActiveMode.value = true;
    showResolveButton.value = false;
    clearTimeout(_toid);
    reevaluate(true);
  };
  const onModeDeactivated = () => {
    isActiveMode.value = false;
  };
  let _toid = -1;
  watch(addrInput, (value) => {
    if (addrInputModeFixed.value && !isActiveMode.value) {
      return;
    }
    clearTimeout(_toid);
    if (validateImmediately.value) {
      reevaluate();
    } else {
      _toid = setTimeout(reevaluate, 250);
    }
  }, { immediate: true });
  watch(isValidModeAddress, (value) => {
  }, { immediate: true });
  const signalId = storeId$2 + getRandomId();
  onMounted(() => {
    addSignalListener(onAddressBookEntryUpdated, signalId, checkAddressBookEntry);
    addSignalListener(onAddressBookEntryDeleted, signalId, checkAddressBookEntry);
  });
  onUnmounted(() => {
    removeSignalListener(onAddressBookEntryUpdated, signalId);
    removeSignalListener(onAddressBookEntryDeleted, signalId);
  });
  return {
    isActiveMode,
    isValidModeAddress,
    onModeActivated,
    onModeDeactivated
  };
};

const doLog$1 = false;
const storeId$1 = "useCardanoScriptMode";
const sendMode$1 = SendModeCardanoScript;
const useCardanoScript = (addressResolver) => {
  const {
    addressBookEntry,
    validateImmediately,
    addrInput,
    addrInputError,
    addrInputModeFixed,
    addrInputMode,
    showResolveButton,
    resolvedAddr,
    isResolved,
    onErrorAddress
  } = addressResolver;
  const isActiveMode = ref(false);
  const isValidModeAddress = ref(false);
  const lastEvaluatedAddr = ref("");
  const checkValidModeAddress = () => {
    if (addrInputModeFixed.value && !isActiveMode.value) {
      return;
    }
    const addr = addrInput.value.trim();
    if (addr.length !== 0) {
      try {
        if (isValidSendAddress(networkId.value, addr) && isScriptAddress(addr)) {
          if (doLog$1) ;
          isValidModeAddress.value = true;
          return true;
        }
      } catch (e) {
      }
    }
    isValidModeAddress.value = false;
    return false;
  };
  const checkAddressBookEntry = () => {
    if (addrInputMode.value === sendMode$1) {
      const addr = addrInput.value.trim();
      addressBookEntry.value = getAddressBookEntryByMode(addr, sendMode$1) ?? getAddressBookEntryByAddress(addr);
    }
  };
  const reevaluate = (force = false) => {
    if (typeof addrInput.value === "object") {
      return;
    }
    if (addrInputModeFixed.value && !isActiveMode.value) {
      return;
    }
    if (lastEvaluatedAddr.value === addrInput.value.trim() && !force) {
      return;
    }
    lastEvaluatedAddr.value = addrInput.value.trim();
    checkValidModeAddress();
    checkAddressBookEntry();
    if (addrInputMode.value === sendMode$1) {
      if (isValidModeAddress.value) {
        addrInputError.value = "";
        resolvedAddr.value = addrInput.value.trim();
        isResolved.value = true;
      } else {
        if (addrInput.value.trim().length > 0) {
          onErrorAddress("sendMode:cardanoScript.error.invalid", "translate", -1);
        } else {
          addrInputError.value = "";
        }
        resolvedAddr.value = "";
        isResolved.value = false;
      }
    }
  };
  const onModeActivated = () => {
    isActiveMode.value = true;
    showResolveButton.value = false;
    clearTimeout(_toid);
    reevaluate(true);
  };
  const onModeDeactivated = () => {
    isActiveMode.value = false;
  };
  let _toid = -1;
  watch(addrInput, (value) => {
    if (addrInputModeFixed.value && !isActiveMode.value) {
      return;
    }
    clearTimeout(_toid);
    if (validateImmediately.value) {
      reevaluate();
    } else {
      _toid = setTimeout(reevaluate, 250);
    }
  }, { immediate: true });
  watch(isValidModeAddress, (value) => {
  }, { immediate: true });
  const signalId = storeId$1 + getRandomId();
  onMounted(() => {
    addSignalListener(onAddressBookEntryUpdated, signalId, checkAddressBookEntry);
    addSignalListener(onAddressBookEntryDeleted, signalId, checkAddressBookEntry);
  });
  onUnmounted(() => {
    removeSignalListener(onAddressBookEntryUpdated, signalId);
    removeSignalListener(onAddressBookEntryDeleted, signalId);
  });
  return {
    isActiveMode,
    isValidModeAddress,
    onModeActivated,
    onModeDeactivated
  };
};

const cache = [];
const getCachedDomain = (domain) => {
  if (!isUnstoppableDomain(domain)) {
    return null;
  }
  const cachedEntry = cache.find((entry) => entry.name === domain);
  console.log(
    "getCachedHandle",
    domain,
    cachedEntry,
    (cachedEntry?.cachedAt ?? 0) + 5 * 60 * 1e3,
    Date.now(),
    (cachedEntry?.cachedAt ?? 0) + 5 * 60 * 1e3 > Date.now()
  );
  if (cachedEntry && (cachedEntry?.cachedAt ?? 0) + 5 * 60 * 1e3 > Date.now()) {
    console.log("getCachedDomain", domain, cachedEntry);
    return cachedEntry.address;
  }
  return null;
};
const isUnstoppableDomain = (value) => !!value && value.length > 5 && !value.startsWith("$") && value.split(".").length === 2;
const resolveUnstoppableDomain = async (networkId, domain) => {
  if (!isUnstoppableDomain(domain)) {
    throw UnstoppableDomainsError.invalidDomain;
  }
  const cachedDomain = getCachedDomain(domain);
  if (cachedDomain) {
    return cachedDomain;
  }
  try {
    const accountId = DEFAULT_ACCOUNT_ID;
    const address = await getRequestData()(
      networkId,
      accountId,
      ApiRequestType.resolveUnstoppableDomain,
      UnstoppableDomainsError.notResolved,
      {
        id: accountId,
        domain
      },
      async (data) => data?.address ?? null
    );
    if (address === "noresult") {
      throw UnstoppableDomainsError.domainNotFound;
    } else if (address === "noaddress") {
      throw UnstoppableDomainsError.addressNotSet;
    } else if (!address || !isValidSendAddress(networkId, address)) {
      throw UnstoppableDomainsError.invalidAddress;
    }
    if (domain) {
      for (let i = cache.length - 1; i >= 0; i--) {
        if (cache[i].name === domain) {
          cache.splice(i, 1);
        }
      }
      cache.push({
        name: domain,
        cachedAt: Date.now(),
        address
      });
    }
    return address;
  } catch (err) {
    if (typeof err === "string") {
      if (err.includes(":")) {
        const errorParts = err.split(":");
        throw errorParts[errorParts.length - 2];
      } else {
        throw err;
      }
    }
    throw err?.message ?? JSON.stringify(err);
  }
};

const doLog = false;
const storeId = "useUnstoppableDomains";
const sendMode = SendModeUnstoppableDomains;
const useUnstoppableDomainsModule = (addressResolver) => {
  const {
    output,
    addressBookEntry,
    addrInput,
    addrInputError,
    addrInputModeFixed,
    addrInputMode,
    showResolveButton,
    isResolving,
    isResolved,
    resolvedAddr,
    isImageResolving,
    isImageResolved,
    resolvedImage,
    resolveImageError,
    resolveImageErrorType,
    onErrorAddress
  } = addressResolver;
  const isActiveMode = ref(false);
  const isValidModeAddress = ref(false);
  const lastEvaluatedAddr = ref("");
  const checkValidModeAddress = () => {
    if (addrInputModeFixed.value && !isActiveMode.value) {
      return;
    }
    const addr = addrInput.value.trim();
    if (isUnstoppableDomain(addr)) {
      isValidModeAddress.value = true;
      return true;
    }
    isValidModeAddress.value = false;
    return false;
  };
  const checkAddressBookEntry = (_addr) => {
    if (addrInputMode.value === sendMode) {
      const addr = addrInput.value.trim();
      addressBookEntry.value = getAddressBookEntryByMode(addr, sendMode) ?? getAddressBookEntryByAddress(addr ?? addr);
      if (addressBookEntry.value) {
        const address = getCachedDomain(addr);
        if (address) {
          setResolvedAddress(addr, address);
        } else {
          resolveAddress(addr);
        }
      }
    }
  };
  const checkResolved = () => {
    setUnresolved();
    if (addrInputModeFixed.value && !isActiveMode.value) {
      return;
    }
    const addr = addrInput.value.trim();
    const address = getCachedDomain(addr);
    if (address) {
      resolveAddress(addr);
    }
  };
  const reevaluate = (force = false) => {
    if (typeof addrInput.value === "object") {
      return;
    }
    if (addrInputModeFixed.value && !isActiveMode.value) {
      return;
    }
    if (lastEvaluatedAddr.value === addrInput.value.trim() && !force) {
      return;
    }
    lastEvaluatedAddr.value = addrInput.value.trim();
    checkValidModeAddress();
    checkAddressBookEntry();
    if (addrInputMode.value === sendMode) {
      if (isValidModeAddress.value) {
        addrInputError.value = "";
        if (!addressBookEntry.value) {
          checkResolved();
        }
      } else {
        if (addrInput.value.trim().length > 0) {
          onErrorAddress("sendMode:unstoppableDomains.error.invalid", "translate", -1, storeId);
        } else {
          addrInputError.value = "";
        }
        setUnresolved();
      }
    }
  };
  const onModeActivated = () => {
    isActiveMode.value = true;
    showResolveButton.value = true;
    reevaluate(true);
  };
  const onModeDeactivated = () => {
    isActiveMode.value = false;
  };
  const setUnresolved = () => {
    resolvedAddr.value = "";
    isResolved.value = false;
    if (output.value) {
      output.value.unstoppabledomain = "";
      output.value.unstoppabledomainAddress = "";
    }
  };
  const setResolvedAddress = (domain, addr) => {
    if (isScriptAddress(addr)) {
      throw UnstoppableDomainsError.invalidAddress;
    }
    resolvedAddr.value = addr;
    isResolved.value = true;
    if (output.value) {
      output.value.unstoppabledomain = domain;
      output.value.unstoppabledomainAddress = addr;
    }
  };
  const resolveAddress = async (_forcedAddr) => {
    if (addrInputMode.value !== sendMode) {
      return;
    }
    if (_forcedAddr) {
      addrInput.value = _forcedAddr.trim();
    }
    const addr = addrInput.value.trim();
    resetResolvedAddress();
    isResolving.value = true;
    isImageResolving.value = true;
    try {
      const address = await resolveUnstoppableDomain(networkId.value, addr);
      if (doLog) ;
      setResolvedAddress(addr, address);
      resolveImage();
      checkAddressBookEntry(address);
    } catch (err) {
      if (err === UnstoppableDomainsError.invalidAddress) {
        onErrorAddress("sendMode:unstoppableDomains.error.address.invalid", "translate", -1, storeId);
      } else if (err === UnstoppableDomainsError.addressNotSet) {
        onErrorAddress("sendMode:unstoppableDomains.error.address.notSet", "translate", -1, storeId);
      } else if (err === UnstoppableDomainsError.domainNotFound) {
        onErrorAddress("sendMode:unstoppableDomains.error.resolve", "translate", -1, storeId);
      } else if (err === UnstoppableDomainsError.invalidDomain) {
        onErrorAddress("sendMode:unstoppableDomains.error.invalid", "translate", -1, storeId);
      } else if (err === UnstoppableDomainsError.notResolved) {
        onErrorAddress("sendMode:unstoppableDomains.error.domain.resolve", "translate", -1, storeId);
      } else {
        console.error(err);
        onErrorAddress(err, "string", -1, storeId);
      }
    }
    isResolving.value = false;
  };
  const resetResolvedAddress = () => {
    isResolving.value = false;
    setUnresolved();
    isImageResolving.value = false;
    isImageResolved.value = false;
    resolvedImage.value = "";
    resolveImageError.value = "";
    resolveImageErrorType.value = "translate";
  };
  const resolveImage = () => {
    isImageResolving.value = true;
    resolvedImage.value = unstoppableDomainsLogo;
    isImageResolved.value = true;
    isImageResolving.value = false;
  };
  watch(addrInput, (value) => {
    if (addrInputModeFixed.value && !isActiveMode.value) {
      return;
    }
    reevaluate();
  }, { immediate: true });
  watch(isValidModeAddress, (value) => {
  }, { immediate: true });
  const signalId = storeId + getRandomId();
  onMounted(() => {
    addSignalListener(onAddressBookEntryUpdated, signalId, checkAddressBookEntry);
    addSignalListener(onAddressBookEntryDeleted, signalId, checkAddressBookEntry);
  });
  onUnmounted(() => {
    removeSignalListener(onAddressBookEntryUpdated, signalId);
    removeSignalListener(onAddressBookEntryDeleted, signalId);
  });
  return {
    isActiveMode,
    isValidModeAddress,
    onModeActivated,
    onModeDeactivated,
    resolveAddress,
    resetResolvedAddress
  };
};

const useSendMode = (addressResolver) => {
  const {
    addrInputMode,
    addrInputModeFixed
  } = addressResolver;
  const adaHandle = useAdaHandle(addressResolver);
  const cardano = useCardanoMode(addressResolver);
  const cardanoScript = useCardanoScript(addressResolver);
  const unstoppableDomains = useUnstoppableDomainsModule(addressResolver);
  const availableModes = {
    adaHandle,
    cardano,
    cardanoScript,
    unstoppableDomains
  };
  watch(addrInputMode, (newValue, oldValue) => {
    availableModes[oldValue].onModeDeactivated();
    availableModes[newValue].onModeActivated();
  });
  const maybeAutoSwitchSendMode = () => {
    if (!addrInputModeFixed.value) {
      if (adaHandle.isValidModeAddress.value) {
        addrInputMode.value = "adaHandle";
      } else if (unstoppableDomains.isValidModeAddress.value) {
        addrInputMode.value = "unstoppableDomains";
      } else if (cardanoScript.isValidModeAddress.value) {
        addrInputMode.value = "cardanoScript";
      } else {
        addrInputMode.value = "cardano";
      }
    }
  };
  watch(adaHandle.isValidModeAddress, () => {
    maybeAutoSwitchSendMode();
  });
  watch(unstoppableDomains.isValidModeAddress, () => {
    maybeAutoSwitchSendMode();
  });
  watch(cardanoScript.isValidModeAddress, () => {
    maybeAutoSwitchSendMode();
  });
  watch(cardano.isValidModeAddress, () => {
    maybeAutoSwitchSendMode();
  });
  const resolveAddress = async () => {
    adaHandle.resolveAddress();
    unstoppableDomains.resolveAddress();
  };
  const resetResolvedAddress = async () => {
    adaHandle.resetResolvedAddress();
    unstoppableDomains.resetResolvedAddress();
  };
  addrInputMode.value = "cardano";
  return {
    resolveAddress,
    resetResolvedAddress
  };
};

function useAddressResolver(output) {
  let _lastUUID = "-1";
  const addressBookEntry = ref(null);
  const validateImmediately = ref(false);
  const addrInput = ref("");
  const addrInputError = ref("");
  const addrInputErrorType = ref("string");
  const addrInputMode = ref("cardano");
  const addrInputModeFixed = ref(false);
  const isResolving = ref(false);
  const isResolved = ref(false);
  const resolvedAddr = ref("");
  const showAddrInput = ref(true);
  const showResolveButton = ref(false);
  const isImageResolved = ref(false);
  const isImageResolving = ref(false);
  const resolvedImage = ref("");
  const resolveImageError = ref("");
  const resolveImageErrorType = ref("string");
  const onErrorAddress = (error, type = "translate", outputIndex, storeId2 = "") => {
    if (storeId2) {
      console.log(el(storeId2), sl("onError"), error, type);
    }
    if (typeof error === "string" && error?.startsWith(ErrorBuildTx.missingAddress)) {
      const _outputIndex = parseInt(error.split(".")[2]);
      if (_outputIndex === outputIndex) {
        addrInputError.value = { msg: "send-recipient:error.addAddress", isWarning: true };
        addrInputErrorType.value = "translate";
      }
    } else {
      addrInputError.value = error;
      addrInputErrorType.value = type;
    }
  };
  const updateRefs = () => {
    resolvedAddr.value = "";
    isResolving.value = false;
    isResolved.value = false;
    resolvedImage.value = "";
    resolveImageError.value = "";
    resolveImageErrorType.value = "string";
    isImageResolved.value = false;
    isImageResolving.value = false;
    showAddrInput.value = true;
    showResolveButton.value = false;
    addrInputError.value = "";
    addrInputErrorType.value = "string";
    if (output.value) {
      let addr = "";
      if (output.value.adaHandle) {
        addr = output.value.adaHandle ?? "";
        addrInputMode.value = "adaHandle";
        addrInputModeFixed.value = true;
      } else if (output.value.unstoppabledomain) {
        addr = output.value.unstoppabledomain ?? "";
        addrInputMode.value = "unstoppableDomains";
        addrInputModeFixed.value = true;
      } else if (output.value.address) {
        addr = output.value.address ?? "";
        addrInputMode.value = "cardano";
        addrInputModeFixed.value = false;
      } else {
        addrInputMode.value = "cardano";
        addrInputModeFixed.value = false;
      }
      addrInput.value = addr;
    } else {
      addrInput.value = "";
    }
  };
  watch(output, (value) => {
    if (!value) {
      return;
    }
    if (value.uuid === _lastUUID) {
      return;
    }
    _lastUUID = value.uuid;
    updateRefs();
  }, { immediate: true });
  watch(resolvedAddr, (newVal) => {
    if (!output.value) {
      return;
    }
    output.value.address = newVal ?? "";
  });
  return {
    output,
    addressBookEntry,
    validateImmediately,
    addrInput,
    addrInputError,
    addrInputErrorType,
    addrInputMode,
    addrInputModeFixed,
    isResolving,
    isResolved,
    resolvedAddr,
    showAddrInput,
    showResolveButton,
    isImageResolving,
    isImageResolved,
    resolvedImage,
    resolveImageError,
    resolveImageErrorType,
    onErrorAddress
  };
}
function useAddressResolverSendMode(output) {
  const addressResolver = useAddressResolver(output);
  const {
    addressBookEntry,
    validateImmediately,
    addrInput,
    addrInputError,
    addrInputErrorType,
    addrInputMode,
    addrInputModeFixed,
    isResolving,
    isResolved,
    resolvedAddr,
    showResolveButton
  } = addressResolver;
  const sendMode = useSendMode(addressResolver);
  const {
    resolveAddress,
    resetResolvedAddress
  } = sendMode;
  const doResolveAddress = () => {
    if (addressResolver.isResolved.value) {
      return;
    }
    return resolveAddress();
  };
  const onResetAddrInput = () => {
    addrInput.value = "";
    addrInputError.value = "";
    isResolved.value = false;
    if (output.value) {
      output.value.address = "";
    }
  };
  const onResetResolvedAddress = () => {
    resetResolvedAddress();
    onResetAddrInput();
  };
  const onSelectAddress = (address) => {
    if (isResolved.value && (resolvedAddr.value === address || addrInput.value === address)) {
      return;
    }
    const maybeAddressBookEntry = getAddressBookEntryByAddress(address);
    if (maybeAddressBookEntry) {
      onSelectAddressBookEntry(maybeAddressBookEntry);
      return;
    }
    isResolved.value = false;
    validateImmediately.value = true;
    addrInputModeFixed.value = false;
    addrInputMode.value = isScriptAddress(address) ? "cardanoScript" : "cardano";
    addrInput.value = address;
    nextTick(() => {
      validateImmediately.value = false;
    });
  };
  const doSelectAddressBookEntry = (name) => {
    const maybeAddressBookEntry = getAddressBookEntryByName(name);
    if (maybeAddressBookEntry) {
      onSelectAddressBookEntry(maybeAddressBookEntry);
      return;
    }
  };
  const onSelectAddressBookEntry = (entry) => {
    if (!entry) {
      return;
    }
    if (addressBookEntry.value && addressBookEntry.value?.name === entry.name) {
      return;
    }
    isResolved.value = false;
    validateImmediately.value = true;
    addrInputModeFixed.value = false;
    if (!entry.mode) {
      if (entry.address.startsWith("$")) {
        entry.mode = SendModeAdaHandle;
      } else if (entry.address.split(".").length === 2) {
        entry.mode = SendModeUnstoppableDomains;
      } else {
        entry.mode = isScriptAddress(entry.address) ? "cardanoScript" : "cardano";
      }
    }
    addrInputMode.value = entry.mode ?? "cardano";
    if (entry.mode === SendModeAdaHandle || entry.mode === SendModeUnstoppableDomains) {
      addrInput.value = entry.name;
    } else {
      addrInput.value = entry.address;
    }
    nextTick(() => {
      validateImmediately.value = false;
    });
  };
  const onQrCode = (payload) => {
    if (payload) {
      addrInput.value = payload;
    }
  };
  return {
    addressResolver,
    sendMode,
    doResolveAddress,
    doSelectAddressBookEntry,
    onResetAddrInput,
    onResetResolvedAddress,
    onSelectAddress,
    onSelectAddressBookEntry,
    onQrCode
  };
}

const showModal = ref(false);
const isFilterSet = ref(false);
const policyFilter = ref("");
const nameFilter = ref("");
const resetFilter = ref(false);
let _accountTxOutput = void 0;
const openModalAddAsset = async (accountTxOutput, policy, name, _resetFilter) => {
  _accountTxOutput = accountTxOutput;
  showModal.value = true;
  resetFilter.value = !!_resetFilter;
  if (policy) {
    policyFilter.value = policy;
    isFilterSet.value = true;
  }
  if (name) {
    nameFilter.value = name;
    isFilterSet.value = true;
  }
};
const closeModalAddAsset = () => {
  showModal.value = false;
  _accountTxOutput = void 0;
  nameFilter.value = "";
  policyFilter.value = "";
  isFilterSet.value = false;
  resetFilter.value = false;
};
const useModalAddAsset = () => {
  return {
    showModalAddAsset: showModal,
    openModalAddAsset,
    closeModalAddAsset,
    getAccountTxOutput: () => _accountTxOutput,
    isFilterSet,
    resetFilter,
    policyFilter,
    nameFilter
  };
};

const _show = ref(false);
const _add = ref(false);
const _entry = ref();
const _cb = ref();
const entry = computed(() => _entry.value);
const openModalAddressBook = (onChangedEntry, entry2) => {
  _entry.value = entry2;
  _add.value = false;
  _show.value = true;
  _cb.value = onChangedEntry;
};
const openModalAddToAddressBook = (onNameEntered, entry2) => {
  _entry.value = entry2;
  _add.value = true;
  _show.value = true;
  _cb.value = onNameEntered;
};
const closeModalAddressBook = () => {
  _show.value = false;
};
const setEntry = (entry2) => {
  _entry.value = entry2;
  if (_cb.value && !_add.value) {
    _cb.value(entry2);
  }
};
const onName = (name, address, addressMode) => {
  if (_cb.value && _add.value) {
    _cb.value(name, address, addressMode);
  }
};
const useModalAddressBook = () => {
  const _showModalAddressBook = computed(() => _show.value && !_add.value);
  const _showModalAddToAddressBook = computed(() => _show.value && _add.value);
  return {
    showModalAddressBook: _showModalAddressBook,
    showModalAddToAddressBook: _showModalAddToAddressBook,
    entry: _entry,
    openModalAddressBook,
    openModalAddToAddressBook,
    closeModalAddressBook,
    setAddressBookEntry: setEntry,
    onAddressBookEntryName: onName,
    onSelectedAddressBookEntry: _cb,
    selectedAddressBookEntry: entry
  };
};

const _sfc_main$4 = {  };

const _hoisted_1$4 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$4, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<path d=\"M14 8.99988H18\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path><path d=\"M14 12.4999H17\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path><rect x=\"2\" y=\"2.99988\" width=\"20\" height=\"18\" rx=\"5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"></rect><path d=\"M5 15.9999C6.20831 13.4188 10.7122 13.249 12 15.9999\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M10.5 8.99988C10.5 10.1044 9.60457 10.9999 8.5 10.9999C7.39543 10.9999 6.5 10.1044 6.5 8.99988C6.5 7.89531 7.39543 6.99988 8.5 6.99988C9.60457 6.99988 10.5 7.89531 10.5 8.99988Z\" stroke=\"currentColor\" stroke-width=\"1.5\"></path>", 5)
  ]))]))
}
const IconUserAccount = /*#__PURE__*/_export_sfc(_sfc_main$4, [['render',_sfc_render$1]]);

const _sfc_main$3 = {  };

const _hoisted_1$3 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$3, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M4.5 10C4.5 6.22876 4.5 4.34315 5.67157 3.17157C6.84315 2 8.72876 2 12.5 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H12.5C8.72876 22 6.84315 22 5.67157 20.8284C4.5 19.6569 4.5 17.7712 4.5 14V10Z",
      stroke: "currentColor",
      "stroke-width": "1.5"
    }, null, -1),
    createBaseVNode("path", {
      d: "M4.5 6H2M4.5 12H2M4.5 18H2",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M15.2748 8.49261C15.2748 9.59715 14.3794 10.4926 13.2749 10.4926C12.1704 10.4926 11.275 9.59715 11.275 8.49261C11.275 7.38808 12.1704 6.49268 13.2749 6.49268C14.3794 6.49268 15.2748 7.38808 15.2748 8.49261Z",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M9.31982 15.7161C10.3782 14.0868 12.0589 13.4762 13.2749 13.4774C14.491 13.4787 16.1224 14.0868 17.1807 15.7161C17.2492 15.8215 17.268 15.9512 17.2063 16.0607C16.9588 16.4996 16.1903 17.3705 15.6352 17.4296C14.9975 17.4974 13.3291 17.5069 13.2762 17.5072C13.2232 17.5069 11.5034 17.4974 10.8653 17.4296C10.3103 17.3705 9.5418 16.4996 9.29429 16.0607C9.23254 15.9512 9.25139 15.8215 9.31982 15.7161Z",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconContactBook = /*#__PURE__*/_export_sfc(_sfc_main$3, [['render',_sfc_render]]);

const _hoisted_1$2 = { class: "resolved-address grow w-full" };
const _hoisted_2$2 = { class: "relative w-full flex flex-col 2xs:flex 2xs:flex-row et-js-ic et-gap-md" };
const _hoisted_3$2 = { class: "w-full flex flex-nowrap et-gap-md" };
const _hoisted_4$2 = { class: "grow w-full flex flex-col et-js-is et-gap-md" };
const _hoisted_5$1 = { class: "w-full h-8" };
const _hoisted_6$1 = { class: "w-full flex flex-row flex-wrap et-js-ic et-gap-sm" };
const _hoisted_7 = {
  key: 0,
  class: "break-all"
};
const _hoisted_8 = { class: "grow 2xs:grow flex flex-row flex-wrap et-js et-ic et-gap-sm" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ResolvedAddress",
  props: {
    walletId: { type: String, required: true },
    accountId: { type: String, required: true },
    addressResolverSendMode: { type: Object, required: true },
    hideAddToAddressBook: { type: Boolean, required: false, default: false },
    noAccountBadgeActions: { type: Boolean, required: false, default: false }
  },
  emits: ["selectAddressBook", "reset"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const $t = useTranslation().t;
    const {
      walletId,
      accountId
    } = toRefs(props);
    const { addressResolver } = props.addressResolverSendMode;
    const {
      addrInput,
      addrInputMode,
      addressBookEntry,
      resolvedAddr
    } = addressResolver;
    const {
      isSmallerThanSM,
      isSmallerThanMD
    } = useScreenSize();
    const {
      openModalAddressBook,
      openModalAddToAddressBook
    } = useModalAddressBook();
    const hasImage = computed(() => addrInputMode.value === SendModeAdaHandle || addrInputMode.value === SendModeUnstoppableDomains);
    const addressInfos = useAddressInfos(resolvedAddr, { walletId, accountId });
    const addressBadges = computed(() => addressInfos.addressBadges.value);
    const accountBadges = computed(() => addressInfos.accountBadges.value);
    const addressAccount = computed(() => addressInfos.addressAccount.value);
    const {
      adaHandle
    } = useAccountSettings(addressAccount);
    const { adaHandleName } = adaHandle;
    const hasSendModeBadge = computed(() => addressBadges.value.some((badge) => badge.id === addrInputMode.value));
    const hasAddressBookBadge = computed(() => addressBadges.value.some((badge) => badge.id.startsWith("addressbook")));
    const hasContractBadge = computed(() => addressBadges.value.some((badge) => badge.type === CONTRACT_BADGE));
    const onAddressBookEntry = (entry) => {
      if (entry) {
        emit("selectAddressBook", entry);
      }
    };
    const onClickBadge = (isAddressBookBadge) => {
      if (isAddressBookBadge && addressBookEntry.value) {
        openModalAddressBook(onAddressBookEntry, addressBookEntry.value);
      }
    };
    const saveAddressBookEntry = (name, address) => {
      if (!name || !address) {
        return;
      }
      if (!addressBookEntry.value) {
        updateAddressBookEntry(name, resolvedAddr.value, addrInputMode.value, addrInput.value);
      } else {
        updateAddressBookEntry(name, resolvedAddr.value, addrInputMode.value, addressBookEntry.value.name);
      }
    };
    const onAddToAddressBook = () => {
      console.log("onAddToAddressBook", { hasImage: hasImage.value, addrInput: addrInput.value, resolvedAddr: resolvedAddr.value, addrInputMode: addrInputMode.value });
      if (hasImage.value) {
        saveAddressBookEntry(addrInput.value, resolvedAddr.value);
      } else {
        openModalAddToAddressBook(saveAddressBookEntry, { address: resolvedAddr.value, name: "", mode: addrInputMode.value });
      }
    };
    const contextMenuItems = computed(
      () => [
        {
          id: "add-addressbook",
          icon: markRaw(IconContactBook),
          label: $t("addressBook:contextMenu.add"),
          fn: onAddToAddressBook,
          show: !hasContractBadge.value && !props.hideAddToAddressBook && !addressBookEntry.value
        },
        {
          id: "edit-addressbook",
          icon: markRaw(IconContactBook),
          label: $t("addressBook:contextMenu.edit"),
          fn: () => openModalAddToAddressBook(saveAddressBookEntry, addressBookEntry.value),
          show: !!addressBookEntry.value && !hasImage.value
        },
        {
          id: "update-addressbook",
          icon: markRaw(IconContactBook),
          label: $t("addressBook:contextMenu.update"),
          fn: () => updateAddressBookEntry(addressBookEntry.value.name, resolvedAddr.value, addrInputMode.value, addrInput.value),
          highlighted: true,
          show: !!addressBookEntry.value && resolvedAddr.value !== addressBookEntry.value.address
        },
        {
          id: "delete-addressbook",
          icon: markRaw(IconContactBook),
          label: $t("addressBook:contextMenu.delete"),
          fn: () => deleteAddressBookEntry(addressBookEntry.value.name),
          show: !!addressBookEntry.value
        },
        {
          id: "reset",
          icon: markRaw(IconCancel01),
          label: $t("common:reset"),
          fn: () => emit("reset")
        }
      ]
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", _hoisted_2$2, [
          hasImage.value ? (openBlock(), createBlock(_sfc_main$d, {
            key: 0,
            "address-resolver-send-mode": __props.addressResolverSendMode,
            size: "w-24",
            title: unref(addressBookEntry)?.name ?? ""
          }, null, 8, ["address-resolver-send-mode", "title"])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_3$2, [
            createBaseVNode("div", _hoisted_4$2, [
              createBaseVNode("div", _hoisted_5$1, [
                createVNode(_sfc_main$e, {
                  class: normalizeClass(["grow mt-3", "cursor-auto"]),
                  address: unref(resolvedAddr),
                  "full-width": false,
                  small: unref(isSmallerThanSM),
                  "additional-menu-options": contextMenuItems.value
                }, null, 8, ["address", "small", "additional-menu-options"])
              ]),
              createBaseVNode("div", _hoisted_6$1, [
                !hasSendModeBadge.value && !hasAddressBookBadge.value && !unref(adaHandleName) && unref(addrInput) !== unref(resolvedAddr) ? (openBlock(), createElementBlock("span", _hoisted_7, toDisplayString(unref(addrInput)), 1)) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_8, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(addressBadges.value, (badge) => {
                    return openBlock(), createBlock(_sfc_main$f, {
                      class: normalizeClass(badge.id.startsWith("addressbook") ? "cursor-pointer" : "cursor-auto"),
                      badge,
                      size: unref(isSmallerThanMD) ? "small" : void 0,
                      "css-label": "",
                      "force-button": "",
                      onClick: withModifiers(($event) => onClickBadge(badge.id.startsWith("addressbook")), ["prevent", "stop"])
                    }, null, 8, ["class", "badge", "size", "onClick"]);
                  }), 256)),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(accountBadges.value, (badge) => {
                    return openBlock(), createBlock(_sfc_main$f, {
                      badge,
                      "css-label": "",
                      "no-action": __props.noAccountBadgeActions,
                      "no-hover": __props.noAccountBadgeActions,
                      size: unref(isSmallerThanMD) ? "small" : void 0
                    }, null, 8, ["badge", "no-action", "no-hover", "size"]);
                  }), 256)),
                  unref(adaHandleName) ? (openBlock(), createBlock(_sfc_main$g, {
                    key: 0,
                    class: "grow-0! px-4 py-1.5 md:py-2.25 rounded-full bg-[#0d0f26] text-sm! md:text-base!",
                    "ada-handle-name": unref(adaHandleName)
                  }, null, 8, ["ada-handle-name"])) : createCommentVNode("", true)
                ])
              ])
            ]),
            renderSlot(_ctx.$slots, "coinAndDelete")
          ])
        ])
      ]);
    };
  }
});

const _hoisted_1$1 = {
  key: 0,
  class: "flex flex-row et-js-ic"
};
const _hoisted_2$1 = { class: "rounded-full overflow-hidden" };
const _hoisted_3$1 = ["src", "alt"];
const _hoisted_4$1 = { class: "ml-3 grow text-center font-medium" };
const _hoisted_5 = { key: 1 };
const _hoisted_6 = { class: "flex items-center" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SelectSendMode",
  props: {
    "addrInputMode": { type: String, required: true },
    "addrInputModeModifiers": {},
    "addrInputModeFixed": { type: Boolean, required: true },
    "addrInputModeFixedModifiers": {}
  },
  emits: ["update:addrInputMode", "update:addrInputModeFixed"],
  setup(__props) {
    const $t = useTranslation().t;
    const { isSmallerThanMD } = useScreenSize();
    const addrInputMode = useModel(__props, "addrInputMode");
    const addrInputModeFixed = useModel(__props, "addrInputModeFixed");
    const sendModeSelectList = ref([
      { label: $t("sendMode:cardano.label"), value: SendModeCardano, image: cardanoLogo },
      { label: $t("sendMode:cardanoScript.label"), value: SendModeCardanoScript, image: cardanoLogo },
      { label: $t("sendMode:adaHandle.label"), value: SendModeAdaHandle, image: adaHandleLogo },
      { label: $t("sendMode:unstoppableDomains.label"), value: SendModeUnstoppableDomains, image: unstoppableDomainsLogo }
    ]);
    const uiSelectedSendMode = ref(sendModeSelectList.value[0]);
    const onUpdateUiSelectedSendMode = (mode) => {
      console.log("onUpdateUiSelectedSendMode", mode);
      addrInputModeFixed.value = mode.value !== "cardano";
      addrInputMode.value = mode.value;
      console.log("onUpdateUiSelectedSendMode addrInputModeFixed", addrInputModeFixed.value, addrInputMode.value);
    };
    watch(addrInputMode, (newMode) => {
      if (uiSelectedSendMode.value.value === newMode) {
        return;
      }
      uiSelectedSendMode.value = sendModeSelectList.value.find((sm) => sm.value === addrInputMode.value) ?? sendModeSelectList.value[0];
    }, { immediate: true });
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      const _directive_tooltip = resolveDirective("tooltip");
      return withDirectives((openBlock(), createBlock(_component_Select, {
        modelValue: uiSelectedSendMode.value,
        "onUpdate:modelValue": [
          _cache[0] || (_cache[0] = ($event) => uiSelectedSendMode.value = $event),
          onUpdateUiSelectedSendMode
        ],
        class: "shrink-0",
        size: unref(isSmallerThanMD) ? "small" : void 0,
        placeholder: unref($t)("common:send"),
        pt: {
          root: "grow xs:grow-0 rounded-full px-0.5 py-0.5 md:px-1 md:py-1",
          label: "p-0 text-left",
          dropdownicon: "size-3"
        },
        options: sendModeSelectList.value,
        optionLabel: "label"
      }, {
        value: withCtx((slotProps) => [
          slotProps.value ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
            createBaseVNode("div", _hoisted_2$1, [
              slotProps.value.image ? (openBlock(), createElementBlock("img", {
                key: 0,
                class: normalizeClass(unref(isSmallerThanMD) ? "size-6" : "size-8"),
                src: slotProps.value.image,
                alt: slotProps.value.label
              }, null, 10, _hoisted_3$1)) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_4$1, toDisplayString(slotProps.value.label), 1)
          ])) : (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(slotProps.placeholder), 1))
        ]),
        option: withCtx((slotProps) => [
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("div", null, toDisplayString(slotProps.option.label), 1)
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "size", "placeholder", "options"])), [
        [
          _directive_tooltip,
          unref($t)("send-recipient:mode.tooltip"),
          void 0,
          { bottom: true }
        ]
      ]);
    };
  }
});

const _hoisted_1 = { class: "grow flex flex-col et-gap-sm" };
const _hoisted_2 = {
  key: 0,
  class: "flex flex-col et-gap-md"
};
const _hoisted_3 = {
  key: 3,
  class: "grow flex flex-wrap et-js-ic et-gap-sme"
};
const _hoisted_4 = { class: "absolute right-1 top-0 h-full flex flex-col et-jc-ic" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AddressResolver",
  props: {
    disabled: { type: Boolean, required: false, default: false },
    addressBookEntry: { type: Object, required: false },
    addressResolverSendMode: { type: Object, required: false },
    hideSelectFromAddressBook: { type: Boolean, required: false, default: false },
    forceColumnMode: { type: Boolean, required: false, default: false }
  },
  emits: ["reset"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const componentId = "addressResolver_" + getRandomId();
    const $t = useTranslation().t;
    const {
      isSmallerThanXL,
      isSmallerThanMD
    } = useScreenSize();
    const {
      buildWalletId,
      buildAccountId
    } = useBuildAccount();
    const {
      setModalSelectAccountOpen
    } = useModalSelectAccount();
    const {
      openModalAddressBook
    } = useModalAddressBook();
    const { openModalScanQR } = useModalScanQR();
    const _uiSelectedWalletId = ref("");
    const _uiSelectedAccountId = ref("");
    const _uiSelectedAccountSettings = useWalletAccount(_uiSelectedWalletId, _uiSelectedAccountId).accountSettings;
    const data = ref(null);
    const addressResolverSendMode = props.addressResolverSendMode ?? useAddressResolverSendMode(data);
    __expose({ addressResolverSendMode });
    const {
      addressResolver,
      doResolveAddress,
      onResetAddrInput,
      onResetResolvedAddress,
      onSelectAddress,
      onSelectAddressBookEntry,
      onQrCode
    } = addressResolverSendMode;
    const {
      addressBookEntry,
      addrInput,
      addrInputError,
      addrInputErrorType,
      addrInputMode,
      addrInputModeFixed,
      isResolving,
      isResolved,
      resolvedAddr,
      showResolveButton
    } = addressResolver;
    const addressInfos = useAddressInfos(resolvedAddr, { walletId: buildWalletId, accountId: buildAccountId });
    const addressScriptType = computed(() => addressInfos.addressScriptType.value);
    const errorMsg = ref("");
    const suggestions = computed(() => addressBookNames.value.map((name) => ({ id: name, label: name, type: "ab", icon: markRaw(IconContactBook) })).concat(
      walletAccountNameList.value.map((item) => ({ id: item.accountId, label: item.name, type: "acc", icon: markRaw(IconUserAccount) }))
    ));
    const showResolvedAddressWarning = computed(() => {
      if (addressBookEntry.value && resolvedAddr.value) {
        if (addressBookEntry.value.address !== resolvedAddr.value) {
          return true;
        }
      }
      return false;
    });
    const showScriptAddressWarning = computed(() => {
      if (!addressScriptType.value) {
        return false;
      }
      if (addressScriptType.value.startsWith("plutus")) {
        return true;
      }
      if (addressScriptType.value === "unknown") {
        return !getIAppAccountByAddress(resolvedAddr.value);
      }
      return false;
    });
    const showResolvedAddressWarningCaption = computed(() => {
      if (showResolvedAddressWarning.value) {
        return $t("sendMode:adaHandle.banner.change.text").replace("###HANDLE###", addressBookEntry.value?.name ?? "").replace("####OLD####", addressBookEntry.value?.address ?? "").replace("####NEW####", resolvedAddr.value ?? "");
      }
      return "";
    });
    const doResetResolvedAddress = () => {
      onResetResolvedAddress();
      emit("reset");
    };
    const onAccountSelected = (id, walletId, accountId) => {
      if (id !== componentId) {
        return;
      }
      _uiSelectedWalletId.value = walletId;
      _uiSelectedAccountId.value = accountId;
    };
    const onQRDecode = (result) => {
      if (result && result.length > 0) {
        onQrCode(result[0]);
      }
    };
    const contextMenuItems = computed(() => [
      {
        id: "selectAccount",
        icon: markRaw(IconUserAccount),
        label: $t("common:button.selectAccount"),
        fn: () => setModalSelectAccountOpen(true, "ui", componentId, false)
      },
      {
        id: "selectAddressBook",
        icon: markRaw(IconContactBook),
        label: $t("addressBook:contextMenu.select"),
        fn: () => openModalAddressBook(onSelectAddressBookEntry)
      },
      {
        id: "scanQR",
        icon: markRaw(IconQR),
        label: $t("qr:scan.title"),
        fn: () => openModalScanQR(onQRDecode)
      },
      {
        id: "reset",
        icon: markRaw(IconCancel01),
        label: $t("common:reset"),
        fn: onResetAddrInput,
        show: addrInput.value.length !== 0
      }
    ]);
    watch(_uiSelectedAccountSettings.receiveAddress, () => {
      const receiveAddress = _uiSelectedAccountSettings.receiveAddress.value;
      if (receiveAddress) {
        onSelectAddress(receiveAddress.bech32);
      }
    });
    watch(() => props.addressBookEntry, (entry) => {
      if (entry) {
        addrInput.value = entry.address;
        addrInputMode.value = entry.mode ?? "cardano";
      }
    }, { immediate: true, deep: true });
    watch(addrInputError, () => {
      if (typeof addrInputError.value === "object") {
        if (addrInputErrorType.value === "translate") {
          errorMsg.value = $t(addrInputError.value.msg);
        } else {
          errorMsg.value = addrInputError.value.msg;
        }
      } else {
        errorMsg.value = addrInputError.value || "";
      }
    });
    onMounted(() => {
      addSignalListener(onUIAccountSelected, componentId, onAccountSelected);
    });
    onUnmounted(() => {
      removeSignalListener(onUIAccountSelected, componentId);
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        showResolvedAddressWarning.value ? (openBlock(), createBlock(_sfc_main$h, {
          key: 0,
          class: "w-full mb-2 break-all",
          headline: unref($t)("sendMode:adaHandle.banner.change.title"),
          caption: showResolvedAddressWarningCaption.value,
          collapsed: ""
        }, null, 8, ["headline", "caption"])) : createCommentVNode("", true),
        showScriptAddressWarning.value ? (openBlock(), createBlock(_sfc_main$h, {
          key: 1,
          class: "w-full mb-2 break-all",
          headline: addressScriptType.value === "unknown" ? unref($t)("sendMode:cardanoScript.error.unknown.headline") : unref($t)("sendMode:cardanoScript.error.plutus.headline"),
          caption: addressScriptType.value === "unknown" ? unref($t)("sendMode:cardanoScript.error.unknown.caption") : unref($t)("sendMode:cardanoScript.error.plutus.caption"),
          collapsed: ""
        }, null, 8, ["headline", "caption"])) : createCommentVNode("", true),
        unref(addrInputMode) && unref(isResolved) ? (openBlock(), createBlock(_sfc_main$2, {
          key: 2,
          addressResolverSendMode: unref(addressResolverSendMode),
          "wallet-id": unref(buildWalletId) ?? "",
          "account-id": unref(buildAccountId) ?? "",
          "hide-add-to-address-book": __props.disabled,
          onReset: doResetResolvedAddress,
          onSelectAddressBook: unref(onSelectAddressBookEntry),
          "no-account-badge-actions": ""
        }, {
          coinAndDelete: withCtx(() => [
            _ctx.$slots.coinAndDelete || _ctx.$slots.addAssets ? (openBlock(), createElementBlock("div", _hoisted_2, [
              renderSlot(_ctx.$slots, "coinAndDelete"),
              renderSlot(_ctx.$slots, "addAssets")
            ])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["addressResolverSendMode", "wallet-id", "account-id", "hide-add-to-address-book", "onSelectAddressBook"])) : (openBlock(), createElementBlock("div", _hoisted_3, [
          createBaseVNode("div", {
            class: normalizeClass(["flex et-gap-md", __props.forceColumnMode || unref(isSmallerThanXL) ? "w-full flex-col et-js-is" : "grow flex-row et-js-ic"])
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["relative flex et-js-ic et-gap-md", __props.forceColumnMode || unref(isSmallerThanXL) ? "w-full" : "grow"])
            }, [
              createVNode(_sfc_main$a, {
                class: "mt-1",
                input: unref(addrInput),
                "onUpdate:input": _cache[0] || (_cache[0] = ($event) => isRef(addrInput) ? addrInput.value = $event : null),
                error: errorMsg.value,
                "onUpdate:error": _cache[1] || (_cache[1] = ($event) => errorMsg.value = $event),
                success: unref(resolvedAddr),
                "onUpdate:success": _cache[2] || (_cache[2] = ($event) => isRef(resolvedAddr) ? resolvedAddr.value = $event : null),
                suggestions: suggestions.value,
                disabled: __props.disabled,
                dropdown: false,
                autofocus: "",
                onEnter: unref(doResolveAddress)
              }, null, 8, ["input", "error", "success", "suggestions", "disabled", "onEnter"]),
              createBaseVNode("div", _hoisted_4, [
                createVNode(_sfc_main$i, { items: contextMenuItems.value }, null, 8, ["items"])
              ])
            ], 2),
            createVNode(_sfc_main$1, {
              "addr-input-mode": unref(addrInputMode),
              "onUpdate:addrInputMode": _cache[3] || (_cache[3] = ($event) => isRef(addrInputMode) ? addrInputMode.value = $event : null),
              "addr-input-mode-fixed": unref(addrInputModeFixed),
              "onUpdate:addrInputModeFixed": _cache[4] || (_cache[4] = ($event) => isRef(addrInputModeFixed) ? addrInputModeFixed.value = $event : null)
            }, null, 8, ["addr-input-mode", "addr-input-mode-fixed"])
          ], 2),
          renderSlot(_ctx.$slots, "coinAndDelete"),
          createVNode(ButtonRow, null, {
            default: withCtx(() => [
              unref(showResolveButton) ? (openBlock(), createBlock(_component_Button, {
                key: 0,
                class: "grow xs:grow-0",
                size: unref(isSmallerThanMD) ? "small" : void 0,
                severity: "secondary",
                loading: unref(isResolving),
                autofocus: "",
                label: unref(isResolving) ? unref($t)("common:status.resolving") : unref($t)("common:resolve"),
                disabled: unref(addrInput).length === 0 || unref(addrInputError).length > 0 || unref(isResolved),
                rounded: "",
                outlined: "",
                onClick: withModifiers(unref(doResolveAddress), ["stop", "prevent"])
              }, null, 8, ["size", "loading", "label", "disabled", "onClick"])) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "addAssets2")
            ]),
            _: 3
          })
        ]))
      ]);
    };
  }
});

export { IconFileUpload as I, _sfc_main$9 as _, _sfc_main$a as a, IconDownload as b, IconPencilOutline as c, IconLockClosed as d, _sfc_main$6 as e, _sfc_main$5 as f, _sfc_main as g, useModalAddAsset as h, isUnstoppableDomain as i, useModalAddressBook as j, IconUserAccount as k, useTokenFragmentation as l, useAddressResolverSendMode as u };
