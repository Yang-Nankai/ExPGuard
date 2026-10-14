import { cT as getAdaPrecision, d as defineComponent, w as useTranslation, D as computed, e as ref, P as networkId, G as watch, m as createElementBlock, o as openBlock, V as normalizeClass, p as createBaseVNode, t as createCommentVNode, B as toDisplayString, F as Fragment, S as renderList } from './index.js';
import { o as isNaN, i as isZero, f as isGreaterThanZero, a as isLessThanZero } from './bigmath.js';
import { u as useFormatter } from './useFormatter.js';
import { c as copyToClipboard } from './index3.js';
import { u as useNotifications } from './useNotification.js';
import { u as useBalanceVisible } from './useBalanceVisible.js';

const coinPrecision = getAdaPrecision();
const useCoinPrecision = () => {
  return {
    coinPrecision
  };
};

const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FormattedAmount",
  props: {
    amount: { type: String, required: true, default: "0" },
    isWholeNumber: { type: Boolean, required: false, default: false },
    // true = value in ADA vs false = value in lovelace
    decimals: { type: Number, required: false, default: -1 },
    displayDecimals: { type: Number, required: false, default: -1 },
    currency: { type: String, required: false, default: "ADA" },
    percent: { type: Boolean, required: false, default: false },
    textCSS: { type: String, required: false, default: "" },
    wholeCSS: { type: String, required: false, default: "" },
    groupCSS: { type: String, required: false, default: "" },
    decimalCSS: { type: String, required: false, default: "" },
    fractionCSS: { type: String, required: false, default: "" },
    literalCSS: { type: String, required: false, default: "" },
    symbolCSS: { type: String, required: false, default: "" },
    balanceAlwaysVisible: { type: Boolean, required: false, default: false },
    withSign: { type: Boolean, required: false, default: false },
    showFraction: { type: Boolean, required: false, default: true },
    hideFractionIfZero: { type: Boolean, required: false, default: false },
    trimFraction: { type: Boolean, required: false, default: true },
    compact: { type: Boolean, required: false, default: false },
    colored: { type: Boolean, required: false, default: false },
    clipboardEnabled: { type: Boolean, required: false, default: true },
    isNeutral: { type: Boolean, required: false, default: false },
    cssText: { type: String, required: false, default: "" },
    cssSign: { type: String, required: false, default: "" },
    cssColor: { type: String, required: false, default: "" },
    cssTextPositive: { type: String, required: false, default: "text-txt-green" },
    cssTextNegative: { type: String, required: false, default: "text-txt-red" },
    cssTextNeutral: { type: String, required: false, default: "text-txt-gray" },
    cssBackgroundPositive: { type: String, required: false, default: "" },
    cssBackgroundNegative: { type: String, required: false, default: "" },
    cssBackgroundNeutral: { type: String, required: false, default: "" },
    notificationText: { type: String, required: false, default: "" },
    prefix: { type: String, required: false, default: "" },
    suffix: { type: String, required: false, default: "" }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const {
      showCopied,
      showError
    } = useNotifications();
    const $t = useTranslation().t;
    const { isBalanceVisible } = useBalanceVisible();
    const {
      formatAmount,
      formatPercent,
      getNetworkDecimals,
      getCompactDecimals
    } = useFormatter();
    const { coinPrecision } = useCoinPrecision();
    const displayDecimals = computed(() => {
      if (props.displayDecimals >= 0) {
        return props.displayDecimals;
      }
      return coinPrecision.value;
    });
    const decimalPlaces = ref(props.decimals >= 0 ? props.decimals : getNetworkDecimals(networkId.value));
    watch(() => props.decimals, () => {
      decimalPlaces.value = props.decimals >= 0 ? props.decimals : getNetworkDecimals(networkId.value);
    });
    const isVisible = computed(() => props.balanceAlwaysVisible || isBalanceVisible.value || props.percent);
    const safeAmount = computed(() => {
      if (typeof props.amount === "undefined" || props.amount === null || isNaN(props.amount)) {
        if (props.amount === "-") {
          return "-";
        }
        console.warn("FormattedAmount: Invalid amount prop. Returning 0.", props.amount);
        return "0";
      }
      return props.amount;
    });
    const formattedAmount = computed(() => {
      let _safeAmount = safeAmount.value;
      if (safeAmount.value === "-") {
        _safeAmount = "0";
      }
      const f = props.percent ? formatPercent(parseFloat(String(_safeAmount)), props.decimals, props.withSign) : formatAmount(String(_safeAmount), props.isWholeNumber, isVisible.value, displayDecimals.value, decimalPlaces.value, props.currency, props.withSign, props.compact);
      if (safeAmount.value === "-") {
        for (const item of f) {
          if (item.type === "integer") {
            item.value = "-";
          }
          if (item.type === "fraction") {
            item.value = "--";
          }
        }
      } else {
        let removedFraction = false;
        if (props.compact && props.displayDecimals === -1 && !props.percent) {
          const integerIndex = f.findIndex((s) => s.type === "integer");
          const fractionIndex = f.findIndex((s) => s.type === "fraction");
          if (integerIndex >= 0 && fractionIndex >= 0) {
            f[fractionIndex].value = f[fractionIndex].value.slice(0, getCompactDecimals(f[integerIndex].value.length));
          }
        }
        if (props.hideFractionIfZero) {
          const fractionIndex = f.findIndex((s) => s.type === "fraction");
          if (fractionIndex >= 0 && isZero(f[fractionIndex].value)) {
            f.splice(fractionIndex, 1);
            removedFraction = true;
          }
        }
        if (props.trimFraction) {
          const fractionIndex = f.findIndex((s) => s.type === "fraction");
          if (fractionIndex >= 0) {
            f[fractionIndex].value = f[fractionIndex].value.replace(/0+$/, "");
            if (isZero(f[fractionIndex].value)) {
              f.splice(fractionIndex, 1);
              removedFraction = true;
            }
          }
        }
        if (removedFraction) {
          const decimalIndex = f.findIndex((s) => s.type === "decimal");
          if (decimalIndex >= 0) {
            f.splice(decimalIndex, 1);
          }
        }
      }
      return f;
    });
    const hideDust = computed(() => {
      if (props.hideFractionIfZero) {
        return !formattedAmount.value.some((s) => s.type === "fraction" && !isZero(s.value));
      } else {
        return false;
      }
    });
    const isPositiveAmount = computed(() => !isNaN(props.amount) && isGreaterThanZero(props.amount));
    const isNegativeAmount = computed(() => !isNaN(props.amount) && isLessThanZero(props.amount));
    const colorCSS = computed(() => {
      if (props.isNeutral) {
        return props.cssTextNeutral;
      }
      if (!props.colored) {
        return "";
      }
      if (isPositiveAmount.value) {
        return props.cssTextPositive;
      }
      if (isNegativeAmount.value) {
        return props.cssTextNegative;
      }
      return props.cssTextNeutral;
    });
    const bgCSS = computed(() => {
      if (props.isNeutral) {
        return props.cssBackgroundNeutral;
      }
      if (!props.colored) {
        return "";
      }
      if (isPositiveAmount.value) {
        return props.cssBackgroundPositive;
      }
      if (isNegativeAmount.value) {
        return props.cssBackgroundNegative;
      }
      return props.cssBackgroundNeutral;
    });
    const visibilityCSS = computed(() => {
      if (isVisible.value) {
        return "";
      }
      return "h-4 sm:h-4.5 mt-0.5 sm:mt-0.5";
    });
    __expose({ isPositiveAmount });
    const onCopyToClipboard = (event) => {
      if (!props.clipboardEnabled) {
        return;
      }
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      const filtered = formattedAmount.value.filter((item) => item.type !== "literal" && item.type !== "currency").map((item) => item.value);
      const copyText = props.compact ? props.amount : filtered.join("").replace("+", "");
      return copyToClipboard(copyText).then((res) => {
        if (res) {
          if (props.notificationText) {
            showCopied(props.notificationText);
          } else {
            showCopied(copyText);
          }
        } else {
          showError($t("common:copied:failed") + ".");
        }
        return res;
      }).catch((err) => {
        showError($t("common:copied:failed") + ": " + err);
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["flex flex-row numeric", __props.textCSS + " " + __props.cssText + " " + bgCSS.value + " " + (__props.clipboardEnabled ? "cursor-pointer" : "")]),
        onClick: onCopyToClipboard
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["relative flex flex-row et-jc-ic truncate", colorCSS.value + " " + __props.cssColor])
        }, [
          __props.prefix ? (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString(__props.prefix), 1)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(formattedAmount.value, (s, index) => {
            return openBlock(), createElementBlock(Fragment, { key: index }, [
              s.type === "integer" ? (openBlock(), createElementBlock("span", {
                key: 0,
                class: normalizeClass(__props.wholeCSS + " " + visibilityCSS.value)
              }, toDisplayString(s.value), 3)) : s.type === "group" ? (openBlock(), createElementBlock("span", {
                key: 1,
                class: normalizeClass(__props.groupCSS + " " + visibilityCSS.value)
              }, toDisplayString(s.value), 3)) : s.type === "decimal" && __props.showFraction && !hideDust.value && isVisible.value ? (openBlock(), createElementBlock("span", {
                key: 2,
                class: normalizeClass(__props.decimalCSS + " " + visibilityCSS.value)
              }, toDisplayString(s.value), 3)) : s.type === "fraction" && __props.showFraction && !hideDust.value && isVisible.value ? (openBlock(), createElementBlock("span", {
                key: 3,
                class: normalizeClass(__props.fractionCSS + " " + visibilityCSS.value)
              }, toDisplayString(s.value), 3)) : s.type === "literal" ? (openBlock(), createElementBlock("span", {
                key: 4,
                class: normalizeClass(__props.literalCSS + " " + visibilityCSS.value)
              }, toDisplayString(s.value), 3)) : s.type === "currency" ? (openBlock(), createElementBlock("span", {
                key: 5,
                class: normalizeClass(__props.symbolCSS)
              }, toDisplayString(s.value), 3)) : s.type.endsWith("Sign") && isVisible.value ? (openBlock(), createElementBlock("span", {
                key: 6,
                class: normalizeClass(__props.cssSign + " " + visibilityCSS.value)
              }, toDisplayString(s.value), 3)) : s.type === "compact" ? (openBlock(), createElementBlock("span", {
                key: 7,
                class: normalizeClass(__props.symbolCSS)
              }, toDisplayString(s.value), 3)) : createCommentVNode("", true)
            ], 64);
          }), 128)),
          __props.suffix ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(__props.suffix), 1)) : createCommentVNode("", true)
        ], 2)
      ], 2);
    };
  }
});

export { _sfc_main as _, useCoinPrecision as u };
