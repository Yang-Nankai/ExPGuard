import { bO as setToken, bP as getPIN, bQ as DEFAULT_PIN_HASH, bR as setPINType, M as DEFAULT_PIN, bS as setPIN, bT as encryptText, bU as PIN_NUMBER_ONLY, bV as PIN_COMPLEX, bW as getAppInfo, bX as concatForHash, D as computed, e as ref, bY as getPINType, d as defineComponent, w as useTranslation, I as useBiometrics, G as watch, f as onMounted, aE as addSignalListener, bZ as onBiometricsUpdate, N as nextTick, k as onUnmounted, aF as removeSignalListener, m as createElementBlock, o as openBlock, n as createVNode, p as createBaseVNode, t as createCommentVNode, ai as Transition, y as withCtx, B as toDisplayString, u as unref, H as createTextVNode, ae as isRef, c as createBlock, T as Teleport, z as resolveComponent } from './index.js';
import { I as IconCheckmarkCircle02 } from './IconCheckmarkCircle02.js';
import { B as ButtonRow } from './ButtonRow.js';
import { _ as _sfc_main$1 } from './PasswordInput.vue_vue_type_script_setup_true_lang.js';

const isDefaultPIN = () => getPIN().value === DEFAULT_PIN_HASH;
const deletePin = () => {
  setNewPin(DEFAULT_PIN);
};
const setNewPin = (pin) => {
  const isNumeric = (str) => {
    return /^\d+$/.test(str);
  };
  if (isNumeric(pin)) {
    setPINType(PIN_NUMBER_ONLY);
  } else {
    setPINType(PIN_COMPLEX);
  }
  if (pin === DEFAULT_PIN) {
    setPIN(DEFAULT_PIN_HASH);
  } else {
    setPIN(encryptText(getAppInfo().pen + concatForHash(pin), pin));
  }
};
const usePINSetup = () => {
  setToken(getAppInfo().token);
  return {
    setNewPin,
    isDefaultPIN,
    deletePin
  };
};

const pin = ref("");
const pinConfirm = ref("");
const pinConfirmed = ref(false);
const preConfirmedPin = ref(false);
const usePin = () => {
  const pinEntered = computed(() => pin.value?.length >= 4 && preConfirmedPin.value);
  const pinMatch = computed(() => pinEntered.value && pin.value === pinConfirm.value);
  const useOnlyNumbers = computed(() => getPINType().value === PIN_NUMBER_ONLY);
  return {
    pin,
    pinConfirmed,
    preConfirmedPin,
    useOnlyNumbers,
    pinConfirm,
    pinEntered,
    pinMatch
  };
};

const _hoisted_1 = { class: "w-full h-full flex flex-col et-jc-ic et-gap-sm" };
const _hoisted_2 = {
  key: 0,
  class: "h-10 flex flex-row et-jc-ic et-gap-sm text-txt-negative"
};
const _hoisted_3 = {
  key: 1,
  class: "h-10 flex flex-row et-jc-ic et-gap-sm"
};
const _hoisted_4 = {
  key: 2,
  class: "h-10 flex flex-row et-jc-ic et-gap-sm"
};
const _hoisted_5 = {
  key: 3,
  class: "h-10 flex flex-row et-jc-ic et-gap-sm"
};
const _hoisted_6 = { class: "flex flex-col et-js-is et-gap-sm pb-2" };
const _hoisted_7 = { key: 0 };
const _hoisted_8 = { key: 1 };
const _hoisted_9 = { key: 0 };
const storeId = "ModalLogin";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PIN",
  props: {
    autofocus: { type: Boolean, required: false, default: false },
    hideReset: { type: Boolean, required: false, default: false },
    hideSkip: { type: Boolean, required: false, default: false },
    buttonTeleport: { type: String, required: false, default: null }
  },
  emits: ["biometricsEnabled"],
  setup(__props, { emit: __emit }) {
    getPINType().value === PIN_NUMBER_ONLY;
    const props = __props;
    const emit = __emit;
    const $t = useTranslation().t;
    const {
      pin,
      pinConfirmed,
      pinConfirm,
      pinEntered,
      pinMatch,
      preConfirmedPin
    } = usePin();
    const {
      setNewPin
    } = usePINSetup();
    const {
      isAvailable,
      isBiometricsEnabled,
      biometricsAvailable,
      enableBiometrics,
      auth
    } = useBiometrics();
    const biometricsDenied = ref(biometricsAvailable.value && !isAvailable.value);
    const inputPinEnter = ref(null);
    const inputPinConfirm = ref(null);
    const buttonRef = ref(null);
    const errorPin = ref("");
    const doPreConfirm = () => {
      preConfirmedPin.value = true;
    };
    const onUpdateRealPin = (input) => {
      pin.value = input;
    };
    const goToConfirm = () => {
      if (pin.value.length >= 4 && !preConfirmedPin.value) {
        doPreConfirm();
      }
    };
    const onUpdatePinConfirm = (input) => {
      pinConfirm.value = input;
    };
    const checkInputLength = (event) => {
      if (pin.value.length >= 4 && buttonRef.value) {
        doFocusNext();
      }
    };
    const handleKeydownConfirm = () => {
    };
    const handleKeydown = (event) => {
      if (event.key !== "Enter" && buttonRef.value === document.activeElement) {
        if (event.key.length === 1) {
          pin.value += event.key;
          event.preventDefault();
        }
      } else if (event.key === "Enter") {
        goToConfirm();
      }
    };
    const onPinConfirmChanged = (entry) => {
      pinConfirmed.value = pinMatch.value;
      if (pinConfirm.value?.length === pin.value.length) {
        if (pin.value !== pinConfirm.value) {
          errorPin.value = $t("pin:createAccess.error.confirm");
        } else {
          errorPin.value = "";
        }
      }
    };
    const doSkip = () => {
      pin.value = DEFAULT_PIN;
      pinConfirm.value = DEFAULT_PIN;
      preConfirmedPin.value = true;
      nextTick(() => onPinConfirmChanged());
    };
    const doBiometricAuth = async () => {
      if (isBiometricsEnabled.value) {
        const res = await auth();
        if (res) {
          doSkip();
        }
      } else {
        const enable = await auth();
        if (enable) {
          enableBiometrics(enable);
          setNewPin(pin.value);
          emit("biometricsEnabled", true);
        }
      }
    };
    const doFocusNext = () => {
      document.getElementById("modelSetupSettingsBtnNext")?.focus();
    };
    const doReset = (setPin = true) => {
      if (setPin) {
        pin.value = "";
      }
      pinConfirm.value = "";
      pinConfirmed.value = false;
      preConfirmedPin.value = false;
      errorPin.value = "";
      onPinConfirmChanged();
    };
    const doFocus = () => {
      if (!props.autofocus) {
        return;
      }
      if (inputPinEnter.value) {
        document.getElementById("inputPinEnter")?.focus();
      } else if (inputPinConfirm.value) {
        document.getElementById("inputPinConfirm")?.focus();
      }
    };
    const checkBiometricsDeny = (value) => {
      if (!value && biometricsAvailable.value) {
        biometricsDenied.value = true;
      }
    };
    watch(pin, () => {
      if (pin.value === "") {
        doReset(false);
      }
    });
    watch(pinMatch, () => {
      onPinConfirmChanged();
    });
    watch(pinConfirm, () => {
      onPinConfirmChanged();
    });
    watch(inputPinEnter, () => {
      nextTick(doFocus);
    });
    watch(inputPinConfirm, () => {
      nextTick(doFocus);
    });
    onMounted(() => {
      addSignalListener(onBiometricsUpdate, storeId, checkBiometricsDeny);
      doReset();
      nextTick(doFocus);
    });
    onUnmounted(() => {
      removeSignalListener(onBiometricsUpdate, storeId);
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(Transition, {
          name: "fade-fast",
          mode: "out-in"
        }, {
          default: withCtx(() => [
            errorPin.value ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(errorPin.value), 1)) : !unref(pinEntered) ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(unref($t)("pin:createAccess.hint.enter")), 1)) : !unref(pinMatch) ? (openBlock(), createElementBlock("div", _hoisted_4, toDisplayString(unref($t)("pin:createAccess.hint.confirm")), 1)) : unref(pinMatch) ? (openBlock(), createElementBlock("div", _hoisted_5, [
              createTextVNode(toDisplayString(unref($t)("pin:createAccess.confirmed")) + " ", 1),
              createVNode(IconCheckmarkCircle02, { class: "h-6 aspect-square text-txt-green" })
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_6, [
          !unref(pinEntered) ? (openBlock(), createElementBlock("div", _hoisted_7, [
            createVNode(_sfc_main$1, {
              ref: "hiddenInput",
              id: "inputPinEnter",
              input: unref(pin),
              "onUpdate:input": [
                _cache[0] || (_cache[0] = ($event) => isRef(pin) ? pin.value = $event : null),
                onUpdateRealPin
              ],
              autofocus: "",
              "skip-validation": "",
              onKeydown: handleKeydown,
              onInput: checkInputLength,
              meter: false,
              placeholder: ""
            }, null, 8, ["input"])
          ])) : (openBlock(), createElementBlock("div", _hoisted_8, [
            createVNode(_sfc_main$1, {
              ref: "hiddenInput2",
              id: "inputPinConfirm",
              input: unref(pinConfirm),
              "onUpdate:input": [
                _cache[1] || (_cache[1] = ($event) => isRef(pinConfirm) ? pinConfirm.value = $event : null),
                onUpdatePinConfirm
              ],
              autofocus: "",
              "skip-validation": "",
              onKeydown: handleKeydownConfirm,
              meter: false,
              placeholder: ""
            }, null, 8, ["input"])
          ]))
        ]),
        __props.buttonTeleport ? (openBlock(), createElementBlock("div", _hoisted_9, [
          (openBlock(), createBlock(Teleport, {
            defer: "",
            to: __props.buttonTeleport
          }, [
            createVNode(ButtonRow, null, {
              default: withCtx(() => [
                !unref(pinEntered) && !__props.hideSkip ? (openBlock(), createBlock(_component_Button, {
                  key: 0,
                  class: "shrink",
                  pt: { label: "truncate" },
                  label: unref($t)("common:skip"),
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: doSkip
                }, null, 8, ["label"])) : createCommentVNode("", true),
                !__props.hideReset ? (openBlock(), createBlock(_component_Button, {
                  key: 1,
                  class: "shrink",
                  pt: { label: "truncate" },
                  label: unref($t)("common:reset"),
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: _cache[2] || (_cache[2] = ($event) => doReset())
                }, null, 8, ["label"])) : createCommentVNode("", true),
                !unref(preConfirmedPin) ? (openBlock(), createBlock(_component_Button, {
                  key: 2,
                  ref_key: "buttonRef",
                  ref: buttonRef,
                  id: "btnNext",
                  disabled: !(!unref(preConfirmedPin) && unref(pin).length >= 4),
                  class: "shrink",
                  pt: { label: "truncate" },
                  label: unref($t)("common:next"),
                  rounded: "",
                  onClick: doPreConfirm
                }, null, 8, ["disabled", "label"])) : createCommentVNode("", true),
                unref(isAvailable) && unref(pinConfirmed) && !biometricsDenied.value ? (openBlock(), createBlock(_component_Button, {
                  key: 3,
                  class: "shrink",
                  pt: { label: "truncate" },
                  disabled: unref(isBiometricsEnabled),
                  label: unref($t)("pin:biometrics.use"),
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: doBiometricAuth
                }, {
                  icon: withCtx(() => [
                    unref(isBiometricsEnabled) ? (openBlock(), createBlock(IconCheckmarkCircle02, {
                      key: 0,
                      class: "h-6 aspect-square text-txt-green"
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["disabled", "label"])) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ], 8, ["to"]))
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

export { _sfc_main as _, usePINSetup as a, usePin as u };
