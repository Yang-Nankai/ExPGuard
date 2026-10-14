import { g as getNetworkDecimals } from './NetworkId.js';
import { d as defineComponent, D as computed, P as networkId, c as createBlock, o as openBlock, V as normalizeClass } from './index.js';
import { u as useAppMode } from './useAppMode.js';
import { u as useCoinPrecision, _ as _sfc_main$1 } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdaAmount",
  props: {
    amount: { type: String, required: true, default: "0" },
    cssBackgroundPositive: { type: String, required: false, default: "bg-bg-positive/90" },
    cssBackgroundNegative: { type: String, required: false, default: "bg-bg-negative/90" },
    cssBackgroundNeutral: { type: String, required: false, default: "bg-bg-neutral/100" },
    cssTextPositive: { type: String, required: false, default: "et-text-gradient-positive" },
    cssTextNegative: { type: String, required: false, default: "et-text-gradient-negative" },
    cssTextNeutral: { type: String, required: false, default: "" },
    compact: { type: Boolean, required: false, default: false },
    colored: { type: Boolean, required: false, default: true },
    invisibleIfZero: { type: Boolean, required: false, default: false },
    withSign: { type: Boolean, required: false, default: true },
    displayDecimals: { type: Number, required: false, default: -1 }
  },
  setup(__props) {
    useAppMode();
    const props = __props;
    const { coinPrecision } = useCoinPrecision();
    const displayDecimals = computed(() => {
      if (props.displayDecimals >= 0) {
        return props.displayDecimals;
      }
      return coinPrecision.value ?? getNetworkDecimals(networkId.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, {
        class: normalizeClass(["shrink-0 py-0.5 sm:py-1 px-2.5 sm:px-3 rounded-full shadow-sm shadow-dark/25", (__props.compact ? "" : "") + " " + (__props.invisibleIfZero && __props.amount === "0" ? "opacity-0" : "")]),
        cssText: (__props.compact ? "text-sm" : "text-base") + " et-jc-ic font-medium",
        cssSign: "-mt-px mr-0.5",
        "css-text-positive": __props.cssTextPositive,
        "css-text-negative": __props.cssTextNegative,
        "css-text-neutral": __props.cssTextNeutral,
        "css-background-positive": __props.cssBackgroundPositive,
        "css-background-negative": __props.cssBackgroundNegative,
        "css-background-neutral": __props.cssBackgroundNeutral,
        amount: __props.amount,
        "display-decimals": displayDecimals.value,
        colored: __props.colored,
        "with-sign": __props.withSign,
        "hide-fraction-if-zero": displayDecimals.value === -1,
        "trim-fraction": ""
      }, null, 8, ["class", "cssText", "css-text-positive", "css-text-negative", "css-text-neutral", "css-background-positive", "css-background-negative", "css-background-neutral", "amount", "display-decimals", "colored", "with-sign", "hide-fraction-if-zero"]);
    };
  }
});

export { _sfc_main as _ };
