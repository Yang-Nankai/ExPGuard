import { d as defineComponent, ab as mergeModels, ac as useModel, w as useTranslation, D as computed, e as ref, di as useFocus, f as onMounted, N as nextTick, m as createElementBlock, o as openBlock, n as createVNode, t as createCommentVNode, z as resolveComponent, y as withCtx, p as createBaseVNode, u as unref, V as normalizeClass, B as toDisplayString, U as withModifiers, j as isIosApp } from './index.js';
import { g as getRandomId } from './epochParams.js';
import { c as appFormatTag } from './language.js';
import { d as appCurrencySymbol } from './currency2.js';
import { u as useAdaSymbol } from './useAdaSymbol.js';

const _hoisted_1 = { class: "relative w-full" };
const _hoisted_2 = ["for"];
const _hoisted_3 = {
  key: 0,
  class: "absolute right-0 top-0 h-full flex et-jc-ic pr-2"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InputCoin",
  props: /* @__PURE__ */ mergeModels({
    disabled: { type: Boolean, required: false, default: false },
    invalid: { type: Boolean, required: false, default: false },
    autofocus: { type: Boolean, required: false, default: false },
    label: { type: String, required: false },
    minCoinInput: { type: Number, required: false },
    maxCoinInput: { type: Number, required: false },
    assetDecimals: { type: Number, required: false, default: 0 },
    isCoinInput: { type: Boolean, required: false, default: true },
    isCurrencyInput: { type: Boolean, required: false, default: false },
    isSendAllEnabled: { type: Boolean, required: false, default: false },
    isDonation: { type: Boolean, required: false, default: false }
  }, {
    "model": { type: Number, required: false },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["max", "update:value", "alignPopover"], ["update:model"]),
  setup(__props, { emit: __emit }) {
    const model = useModel(__props, "model");
    const props = __props;
    const emit = __emit;
    const $t = useTranslation().t;
    const randomId = getRandomId();
    const {
      adaCurrency,
      adaSymbol
    } = useAdaSymbol();
    const label = computed(() => props.label ?? (props.isCoinInput ? $t("common:enter.adaAmount", { currency: adaCurrency.value }) : $t("common:enter.amount")));
    const minFractionDigits = computed(() => {
      if (isIosApp()) {
        return props.assetDecimals > 0 ? 1 : 0;
      }
      return 0;
    });
    const maxFractionDigits = computed(() => {
      return props.assetDecimals > 0 ? props.assetDecimals : 0;
    });
    const input = ref(null);
    const { focused } = useFocus(input);
    const onAddAllCoins = () => {
      console.warn("onAddAllCoins", props.maxCoinInput);
      if (!props.maxCoinInput || props.maxCoinInput <= 0) {
        return;
      }
      model.value = props.maxCoinInput;
      emit("max");
    };
    const doFocus = () => {
      if (!props.autofocus) {
        return;
      }
      const _input = document.getElementById("input-" + randomId);
      _input?.focus();
      if (!_input) {
        console.warn("Called focus but no button found. (Wait till component is rendered.)");
      }
    };
    let _toid = -1;
    const handleInput = (value) => {
      clearTimeout(_toid);
      _toid = setTimeout(() => {
        emit("update:value", value.value);
      }, 250);
      emit("alignPopover");
    };
    onMounted(() => {
      nextTick(() => {
        const _input = document.getElementById("input-" + randomId);
        if (!_input) {
          console.warn("Called focus but no button found. (Wait till component is rendered.)");
        } else {
          input.value = _input;
        }
        doFocus();
      });
    });
    return (_ctx, _cache) => {
      const _component_InputNumber = resolveComponent("InputNumber");
      const _component_FloatLabel = resolveComponent("FloatLabel");
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_FloatLabel, {
          class: "w-full",
          variant: "on"
        }, {
          default: withCtx(() => [
            createVNode(_component_InputNumber, {
              modelValue: model.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
              class: "w-full h-10",
              ref_key: "input",
              ref: input,
              "input-id": "input-" + unref(randomId),
              disabled: __props.disabled,
              invalid: __props.invalid,
              prefix: __props.isCoinInput ? unref(adaSymbol) + " " : __props.isCurrencyInput ? unref(appCurrencySymbol) + " " : "",
              locale: unref(appFormatTag),
              "input-mode": "decimal",
              autocomplete: "off",
              autocorrect: "off",
              spellcheck: "false",
              type: "text",
              min: __props.minCoinInput,
              max: __props.maxCoinInput,
              "min-fraction-digits": minFractionDigits.value,
              "max-fraction-digits": maxFractionDigits.value,
              pt: {
                pcinputtext: {
                  root: "w-full min-w-48 pl-4 rounded-full bg-secondary-gradient field-sizing-content  " + (!__props.isDonation ? "pr-16" : "pr-4")
                },
                iconfield: { root: "bg-red-700" }
              },
              "highlight-on-focus": "",
              autofocus: "",
              onInput: _cache[1] || (_cache[1] = (event) => handleInput(event))
            }, null, 8, ["modelValue", "input-id", "disabled", "invalid", "prefix", "locale", "min", "max", "min-fraction-digits", "max-fraction-digits", "pt"]),
            createBaseVNode("label", {
              for: "input-" + unref(randomId),
              class: normalizeClass(["pl-1", unref(focused) ? "" : "opacity-100"])
            }, toDisplayString(label.value), 11, _hoisted_2)
          ]),
          _: 1
        }),
        !__props.isDonation && (__props.maxCoinInput ?? 0) > 0 ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createVNode(_component_Button, {
            class: "px-1",
            label: "MAX",
            text: "",
            onClick: withModifiers(onAddAllCoins, ["stop", "prevent"])
          })
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

export { _sfc_main as _ };
