import { d as defineComponent, ab as mergeModels, ac as useModel, w as useTranslation, J as usePINLogin, e as ref, G as watch, f as onMounted, N as nextTick, bY as getPINType, bU as PIN_NUMBER_ONLY, m as createElementBlock, o as openBlock, n as createVNode, p as createBaseVNode, c as createBlock, ai as Transition, y as withCtx, B as toDisplayString, u as unref, H as createTextVNode, T as Teleport, t as createCommentVNode } from './index.js';
import { I as IconCheckmarkCircle02 } from './IconCheckmarkCircle02.js';
import { _ as _sfc_main$2 } from './ButtonOutline.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$1 } from './PasswordInput.vue_vue_type_script_setup_true_lang.js';

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
  class: "h-10"
};
const _hoisted_6 = { class: "flex flex-col et-js-is et-gap-sm pb-2" };
const _hoisted_7 = { class: "grow flex et-je" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PINLogin",
  props: /* @__PURE__ */ mergeModels({
    autofocus: { type: Boolean, required: false, default: void 0 },
    setPinChecked: { type: Boolean, required: false, default: true },
    hideReset: { type: Boolean, required: false, default: false },
    buttonTeleport: { type: String, required: false, default: null }
  }, {
    "pinConfirmed": { type: Boolean, required: true, default: false },
    "pinConfirmedModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["pinConfirmed", "reset"], ["update:pinConfirmed"]),
  setup(__props, { emit: __emit }) {
    const pinConfirmed = useModel(__props, "pinConfirmed");
    const props = __props;
    const emit = __emit;
    const $t = useTranslation().t;
    const { checkPin } = usePINLogin();
    const inputPinConfirm = ref(null);
    const pinConfirm = ref("");
    const checking = ref(false);
    const errorPin = ref("");
    const useOnlyNumbers = ref(false);
    let toid = -1;
    const delayedCheckPin = (pin) => {
      checking.value = true;
      errorPin.value = "";
      clearTimeout(toid);
      toid = setTimeout(() => {
        if (checkPin(pin, props.setPinChecked)) {
          pinConfirmed.value = true;
          emit("pinConfirmed");
        } else {
          errorPin.value = $t("pin:access.error.confirm");
          pinConfirmed.value = false;
        }
        checking.value = false;
      }, 150);
    };
    const onPinConfirmChanged = async () => {
      if (pinConfirm.value?.length >= 4) {
        delayedCheckPin(pinConfirm.value);
      } else {
        errorPin.value = "";
        pinConfirmed.value = false;
      }
    };
    const doReset = () => {
      pinConfirm.value = "";
      pinConfirmed.value = false;
      onPinConfirmChanged();
      doFocus();
      emit("reset");
    };
    const doFocus = () => {
      if (!props.autofocus) {
        return;
      }
      if (inputPinConfirm.value) {
        document.getElementById("inputPinConfirm1")?.focus();
      }
    };
    watch(pinConfirm, () => {
      nextTick(onPinConfirmChanged);
    });
    watch(inputPinConfirm, () => {
      nextTick(doFocus);
    });
    onMounted(() => {
      doReset();
      nextTick(doFocus);
      onPinConfirmChanged();
      useOnlyNumbers.value = getPINType().value === PIN_NUMBER_ONLY;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(Transition, {
          name: "fade-fast",
          mode: "out-in"
        }, {
          default: withCtx(() => [
            errorPin.value ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(errorPin.value), 1)) : checking.value ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(unref($t)("pin:access.checking")), 1)) : pinConfirmed.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
              createTextVNode(toDisplayString(unref($t)("pin:access.confirmed")) + " ", 1),
              createVNode(IconCheckmarkCircle02, { class: "h-6 aspect-square text-txt-green" })
            ])) : (openBlock(), createElementBlock("div", _hoisted_5, " "))
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_6, [
          createVNode(_sfc_main$1, {
            input: pinConfirm.value,
            "onUpdate:input": _cache[0] || (_cache[0] = ($event) => pinConfirm.value = $event),
            useOnlyNumbers: useOnlyNumbers.value,
            autofocus: "",
            "skip-validation": "",
            "center-input": "",
            meter: false,
            placeholder: ""
          }, null, 8, ["input", "useOnlyNumbers"])
        ]),
        (openBlock(), createBlock(Teleport, {
          defer: "",
          to: __props.buttonTeleport
        }, [
          createBaseVNode("div", _hoisted_7, [
            _cache[1] || (_cache[1] = createBaseVNode("div", null, null, -1)),
            !__props.hideReset ? (openBlock(), createBlock(_sfc_main$2, {
              key: 0,
              label: unref($t)("common:reset"),
              onClick: doReset
            }, null, 8, ["label"])) : createCommentVNode("", true)
          ])
        ], 8, ["to"]))
      ]);
    };
  }
});

export { _sfc_main as _ };
