import { d as defineComponent, D as computed, c as createBlock, t as createCommentVNode, u as unref, P as networkId, o as openBlock } from './index.js';
import { u as useCurrencyAPI } from './useCurrencyAPI.js';
import { _ as _sfc_main$1 } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FiatAmount",
  props: {
    amount: { type: String, required: true, default: "0" },
    decimals: { type: Number, required: false, default: 0 },
    displayDecimals: { type: Number, required: false, default: 2 },
    trimFraction: { type: Boolean, required: false, default: false },
    clipboardEnabled: { type: Boolean, required: false },
    cssText: { type: String, required: false, default: " et-jc-ic " },
    cssColor: { type: String, required: false, default: " text-txt-muted et-text-sm " },
    priceOfDay: { type: Number, required: false, default: 0 }
  },
  setup(__props) {
    const props = __props;
    const {
      activeCurrency,
      getCurrencyAmount
    } = useCurrencyAPI();
    const currencyAmount = computed(() => getCurrencyAmount(props.amount, props.priceOfDay));
    return (_ctx, _cache) => {
      return unref(networkId) === "mainnet" && unref(activeCurrency).id ? (openBlock(), createBlock(_sfc_main$1, {
        key: 0,
        class: "rounded-full overflow-hidden",
        "css-text": __props.cssText,
        "css-color": __props.cssColor,
        "css-sign": "-mt-px mr-0.5",
        amount: currencyAmount.value,
        currency: unref(activeCurrency).id,
        decimals: __props.decimals,
        "display-decimals": __props.displayDecimals,
        "clipboard-enabled": __props.clipboardEnabled,
        "trim-fraction": __props.trimFraction
      }, null, 8, ["css-text", "css-color", "amount", "currency", "decimals", "display-decimals", "clipboard-enabled", "trim-fraction"])) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
