import { _ as _sfc_main$5 } from './SwapElement.vue_vue_type_script_setup_true_lang.js';
import { a as _sfc_main$4, _ as _sfc_main$6 } from './OpenOrders.vue_vue_type_script_setup_true_lang.js';
import { G as watch, aY as onBeforeUnmount, e as ref, P as networkId, aj as api, aM as el, aX as json, d as defineComponent, w as useTranslation, m as createElementBlock, o as openBlock, V as normalizeClass, p as createBaseVNode, B as toDisplayString, u as unref, D as computed, c as createBlock, y as withCtx, n as createVNode, z as resolveComponent, H as createTextVNode } from './index.js';
import { g as getSwapURL } from './swap.js';
import { u as useMonsterSwapData } from './useSubmitTx.js';
import { _ as _sfc_main$3 } from './SwapTimeAgo.vue_vue_type_script_setup_true_lang.js';
import './bigmath.js';
import './useFormatter.js';
import './NetworkId.js';
import './language.js';
import './app2.js';
import './epochParams.js';
import './useApp.js';
import './_plugin-vue_export-helper.js';
import './IconSettings.vue_vue_type_script_setup_true_lang.js';
import './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import './index3.js';
import './useNotification.js';
import './notification.js';
import './useBalanceVisible.js';
import './ButtonRow.js';
import './ExternalLink.vue_vue_type_script_setup_true_lang.js';
import './image.js';
import './IconChevronDown.js';
import './TokenIcon.vue_vue_type_script_setup_true_lang.js';
import './index2.js';
import './BannerWarning.vue_vue_type_script_setup_true_lang.js';
import './IconAlert02.js';
import './lib.js';
import './useAppAccountBalances.js';
import './chain.js';
import './creds.js';
import './ErrorSignTx.js';
import './useSignTx.js';
import './IconCancel01.js';
import './ErrorSubmitTx.js';
import './parse.js';
import './generateConfig.js';

const marketOrders = ref([]);
const isLoadingMarketOrders = ref(false);
let _currentIn = null;
let _currentOut = null;
let _globalRequest = null;
let _toid = -1;
const fetchMarketOrders = async (marketPair) => {
  const url = `${getSwapURL()}/${networkId.value}/v2/swap/marketOrders`;
  isLoadingMarketOrders.value = true;
  try {
    if (_globalRequest) {
      _globalRequest?.abort();
      _globalRequest = null;
    }
    let _localReq = null;
    const res = await api.post(url, marketPair, { handOverRequest: (req) => {
      _localReq = req;
      _globalRequest = req;
    } }, 12e3).catch((err) => {
      console.error(el("fetchMarketOrders"), json(err));
    });
    if (_localReq !== _globalRequest) {
      throw "Skipping market orders request";
    }
    _globalRequest = null;
    const orderList = res?.data?.orders;
    if (!orderList || !Array.isArray(orderList)) {
      marketOrders.value = [];
    } else {
      marketOrders.value = res.data.orders;
    }
  } catch (err) {
    console.error("Error: fetchMarketOrders:", err);
  }
  isLoadingMarketOrders.value = false;
};
const useMonsterAnalytics = () => {
  const {
    inputToken,
    outputToken
  } = useMonsterSwapData();
  const requestMarketOrders = () => {
    resetTimeout();
    if (!inputToken.value || !outputToken.value) {
      if (_globalRequest) {
        _globalRequest?.abort();
        _globalRequest = null;
      }
      marketOrders.value = [];
      return;
    }
    if (_currentIn !== inputToken.value?.policyId || _currentOut !== outputToken.value?.policyId) {
      marketOrders.value = [];
    }
    _currentIn = inputToken.value?.policyId;
    _currentOut = outputToken.value?.policyId;
    return fetchMarketOrders({
      tokenIn: inputToken.value.policyId + inputToken.value.hexName,
      tokenOut: outputToken.value.policyId + outputToken.value.hexName,
      limit: 40
    });
  };
  const resetTimeout = () => {
    clearInterval(_toid);
    _toid = setInterval(requestMarketOrders, 1e3 * 20);
  };
  watch([inputToken, outputToken], requestMarketOrders, { immediate: true, deep: true });
  onBeforeUnmount(() => {
    if (_globalRequest) {
      _globalRequest?.abort();
      _globalRequest = null;
    }
    clearInterval(_toid);
  });
  return {
    inputToken,
    outputToken,
    marketOrders,
    isLoadingMarketOrders
  };
};

const _hoisted_1$2 = { class: "max-w-full truncate" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "OrderType",
  props: {
    type: { type: String, required: true }
  },
  setup(__props) {
    const $t = useTranslation().t;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["max-2xs:max-w-14 truncate flex et-jc-ic px-2 py-1 rounded-full et-text-xs", {
          "bg-bg-negative text-txt-negative!": __props.type === "sell",
          "bg-bg-positive text-txt-positive!": __props.type === "buy",
          "bg-[#ef4444]": __props.type === "cancel"
        }])
      }, [
        createBaseVNode("span", _hoisted_1$2, toDisplayString(unref($t)("swap-openOrders:types." + __props.type)), 1)
      ], 2);
    };
  }
});

const _hoisted_1$1 = { class: "flex flex-col -mt-1" };
const _hoisted_2$1 = { class: "flex flex-row et-jb-ic" };
const _hoisted_3$1 = { class: "et-text-md font-bold" };
const _hoisted_4$1 = { class: "et-text-xs" };
const _hoisted_5$1 = { class: "text-txt-green" };
const _hoisted_6 = { class: "text-txt-red" };
const _hoisted_7 = { class: "text-txt-muted et-text-xs" };
const _hoisted_8 = { class: "flex et-jc-ic" };
const _hoisted_9 = { class: "mt-3" };
const _hoisted_10 = {
  key: 0,
  class: "et-text-sm"
};
const _hoisted_11 = {
  key: 1,
  class: "et-text-sm"
};
const _hoisted_12 = {
  key: 2,
  class: "et-text-sm"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MarketOrders",
  setup(__props) {
    const sellCount = computed(() => marketOrders.value.filter((_swap) => _swap.type === "sell").length ?? 0);
    const buyCount = computed(() => marketOrders.value.filter((_swap) => _swap.type === "buy").length ?? 0);
    const {
      inputToken,
      outputToken,
      marketOrders,
      isLoadingMarketOrders
    } = useMonsterAnalytics();
    const $t = useTranslation().t;
    return (_ctx, _cache) => {
      const _component_Column = resolveComponent("Column");
      const _component_DataTable = resolveComponent("DataTable");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, { class: "break-inside-avoid" }, {
        title: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, [
            createBaseVNode("div", _hoisted_2$1, [
              createBaseVNode("div", _hoisted_3$1, toDisplayString(unref($t)("swap-marketOrders:title")), 1),
              createBaseVNode("div", _hoisted_4$1, [
                createTextVNode(toDisplayString(unref($t)("swap-marketOrders:orderCount.total", { total: unref(marketOrders).length })) + " ", 1),
                createBaseVNode("span", _hoisted_5$1, toDisplayString(unref($t)("swap-marketOrders:orderCount.buy", { buy: buyCount.value })), 1),
                createBaseVNode("span", _hoisted_6, toDisplayString(unref($t)("swap-marketOrders:orderCount.sell", { sell: sellCount.value })), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_7, toDisplayString(unref($t)("swap-marketOrders:caption")), 1)
          ])
        ]),
        content: withCtx(() => [
          createVNode(_component_DataTable, {
            rows: 10,
            paginator: unref(marketOrders).length > 10,
            "paginator-position": "bottom",
            value: unref(marketOrders),
            pt: {
              root: "flex flex-col",
              emptyMessageCell: "p-0 border-none",
              pcpaginator: {
                root: "flex flex-row flex-nowrap et-js-is mt-4",
                page: "bg-bg-2",
                next: "bg-bg-2",
                prev: "bg-bg-2",
                first: "bg-bg-2",
                last: "bg-bg-2",
                pcrowperpagedropdown: {
                  root: "pl-5 pr-2"
                }
              }
            }
          }, {
            empty: withCtx(() => [
              createBaseVNode("div", _hoisted_9, [
                unref(isLoadingMarketOrders) ? (openBlock(), createElementBlock("div", _hoisted_10, toDisplayString(unref($t)("swap-marketOrders:loading")), 1)) : !unref(inputToken) || !unref(outputToken) ? (openBlock(), createElementBlock("div", _hoisted_11, toDisplayString(unref($t)("swap-marketOrders:select")), 1)) : (openBlock(), createElementBlock("div", _hoisted_12, toDisplayString(unref($t)("swap-marketOrders:empty")), 1))
              ])
            ]),
            default: withCtx(() => [
              createVNode(_component_Column, {
                header: unref($t)("swap-marketOrders:time"),
                class: "pl-0 pr-1 py-0 border-0"
              }, {
                body: withCtx((slotProps) => [
                  createVNode(_sfc_main$3, {
                    timestamp: slotProps.data?.submitTime
                  }, null, 8, ["timestamp"])
                ]),
                _: 1
              }, 8, ["header"]),
              createVNode(_component_Column, {
                header: unref($t)("swap-marketOrders:type"),
                class: "px-1 py-0 border-0"
              }, {
                body: withCtx((slotProps) => [
                  createBaseVNode("div", _hoisted_8, [
                    createVNode(_sfc_main$2, {
                      type: slotProps.data?.type
                    }, null, 8, ["type"])
                  ])
                ]),
                _: 1
              }, 8, ["header"]),
              createVNode(_component_Column, {
                header: unref($t)("swap-marketOrders:in"),
                class: "px-1 py-0 border-0"
              }, {
                body: withCtx((slotProps) => [
                  createVNode(_sfc_main$4, {
                    tokenString: slotProps.data?.token_in,
                    quantity: slotProps.data?.amount_in
                  }, null, 8, ["tokenString", "quantity"])
                ]),
                _: 1
              }, 8, ["header"]),
              createVNode(_component_Column, {
                header: unref($t)("swap-marketOrders:out"),
                class: "pl-1 pr-0 py-0 border-0"
              }, {
                body: withCtx((slotProps) => [
                  createVNode(_sfc_main$4, {
                    tokenString: slotProps.data?.token_out,
                    quantity: slotProps.data?.amount_out
                  }, null, 8, ["tokenString", "quantity"])
                ]),
                _: 1
              }, 8, ["header"])
            ]),
            _: 1
          }, 8, ["paginator", "value"])
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1 = { class: "page-portfolio flex flex-col et-max-width-page" };
const _hoisted_2 = { class: "relative w-full flex flex-col et-js et-gap-md @container" };
const _hoisted_3 = { class: "grid grid-cols-1 @4xl:grid-cols-2 et-gap-md" };
const _hoisted_4 = { class: "flex flex-col et-gap-md auto-rows-min" };
const _hoisted_5 = { class: "flex flex-col et-gap-md auto-rows-min" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageSwap",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createVNode(_sfc_main$5),
              createVNode(_sfc_main$6)
            ]),
            createBaseVNode("div", _hoisted_5, [
              createVNode(_sfc_main$1)
            ])
          ])
        ])
      ]);
    };
  }
});

export { _sfc_main as default };
