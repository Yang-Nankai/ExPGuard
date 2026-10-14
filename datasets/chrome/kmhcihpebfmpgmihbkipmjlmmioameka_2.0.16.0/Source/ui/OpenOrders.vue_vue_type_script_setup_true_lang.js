import { d as defineComponent, x as useScreenSize, Y as toRefs, D as computed, m as createElementBlock, o as openBlock, c as createBlock, t as createCommentVNode, p as createBaseVNode, n as createVNode, B as toDisplayString, u as unref, e as ref, f as onMounted, z as resolveComponent, y as withCtx, P as networkId, w as useTranslation, G as watch, aY as onBeforeUnmount, F as Fragment, S as renderList } from './index.js';
import { u as useBuildAccount } from './lib.js';
import { u as useMonsterSwapData, a as useMonsterSwapAPI } from './useSubmitTx.js';
import { _ as _sfc_main$6 } from './SwapTimeAgo.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$5 } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$4 } from './TokenIcon.vue_vue_type_script_setup_true_lang.js';
import { a as _sfc_main$7, b as _sfc_main$8 } from './SwapElement.vue_vue_type_script_setup_true_lang.js';
import { I as IconCancel01 } from './IconCancel01.js';

const _hoisted_1$2 = { class: "flex flex-row et-js-ic et-gap-sm h-10" };
const _hoisted_2$2 = { class: "flex flex-col" };
const _hoisted_3$1 = { class: "h-2.5 et-text-2xs" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SwapToken",
  props: {
    token: { type: Object, required: false, default: void 0 },
    tokenString: { type: String, required: false, default: "" },
    policyId: { type: String, required: false, default: "" },
    hexName: { type: String, required: false, default: "" },
    quantity: { type: String, required: true }
  },
  setup(__props) {
    const { isSmallerThanSM } = useScreenSize();
    const {
      tokenList
    } = useMonsterSwapData();
    const props = __props;
    const {
      token,
      tokenString,
      policyId,
      hexName
    } = toRefs(props);
    const _token = computed(() => {
      if (props.token) return props.token;
      if (tokenString.value) {
        return tokenList.value.find((_token2) => _token2.policyId + _token2.hexName === tokenString.value);
      }
      if (policyId.value && hexName.value) {
        return tokenList.value.find((_token2) => _token2.policyId + _token2.hexName === policyId.value + hexName.value);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        _token.value ? (openBlock(), createBlock(_sfc_main$4, {
          key: 0,
          "policy-id": _token.value.policyId,
          "hex-name": _token.value.hexName,
          name: _token.value.name
        }, null, 8, ["policy-id", "hex-name", "name"])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("div", _hoisted_3$1, toDisplayString(_token.value?.ticker), 1),
          createVNode(_sfc_main$5, {
            "css-text": "text-sm",
            amount: __props.quantity,
            decimals: _token.value?.decimals,
            "display-decimals": unref(isSmallerThanSM) ? 0 : 2,
            currency: _token.value?.ticker === "ADA" ? "ADA" : ""
          }, null, 8, ["amount", "decimals", "display-decimals", "currency"])
        ])
      ]);
    };
  }
});

const _hoisted_1$1 = { class: "w-full flex flex-row et-gap-md et-ic" };
const _hoisted_2$1 = { class: "w-full flex flex-row et-gap-sm et-jc-ic" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "OrderSwapVisualization",
  props: {
    tokenIn: { type: String, required: true },
    amountIn: { type: String, required: true },
    tokenOut: { type: String, required: true },
    amountOut: { type: String, required: true }
  },
  setup(__props) {
    const {
      tokenList
    } = useMonsterSwapData();
    const tokenIn = ref();
    const tokenOut = ref();
    const props = __props;
    onMounted(() => {
      tokenIn.value = tokenList.value.find((_token) => _token.policyId + _token.hexName === props.tokenIn);
      tokenOut.value = tokenList.value.find((_token) => _token.policyId + _token.hexName === props.tokenOut);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          tokenIn.value ? (openBlock(), createBlock(_sfc_main$3, {
            key: 0,
            class: "flex-1",
            token: tokenIn.value,
            quantity: __props.amountIn
          }, null, 8, ["token", "quantity"])) : createCommentVNode("", true),
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "shrink-0" }, [
            createBaseVNode("svg", {
              width: "18",
              height: "10",
              viewBox: "0 0 18 10",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                d: "M17.875 5.0012C17.875 5.5259 17.6067 5.9205 17.3138 6.2272C17.041 6.5128 16.6117 6.8509 16.175 7.1949L15.1612 7.9935C14.4187 8.5785 13.7971 9.0681 13.2799 9.3683C12.7596 9.6701 12.1199 9.9154 11.4567 9.6217C10.7754 9.3201 10.5533 8.668 10.4631 8.0812C10.3805 7.5435 10.3753 6.8342 10.375 6H1.125C0.572701 6 0.125 5.5523 0.125 5C0.125 4.4477 0.572701 4 1.125 4H10.375C10.3753 3.1677 10.3807 2.45992 10.4631 1.92321C10.5533 1.33642 10.7754 0.68431 11.4567 0.38265C12.1199 0.0889999 12.7596 0.33426 13.2799 0.63613C13.7971 0.93625 14.4187 1.42591 15.1612 2.01087L16.175 2.80952C16.6117 3.1535 17.041 3.4916 17.3138 3.7772C17.6067 4.0838 17.875 4.4765 17.875 5.0012Z",
                fill: "#C1C1C1"
              })
            ])
          ], -1)),
          tokenOut.value ? (openBlock(), createBlock(_sfc_main$3, {
            key: 1,
            class: "flex-1",
            token: tokenOut.value,
            quantity: __props.amountOut
          }, null, 8, ["token", "quantity"])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "OrderCancel",
  props: {
    order: { type: Object, required: true }
  },
  setup(__props) {
    const { cancelOrder } = useMonsterSwapAPI();
    const props = __props;
    const cancelAllOpen = async () => {
      let pendingSwaps = [];
      let targetAgg = void 0;
      if (props.order.aggregator === "SteelSwap") {
        targetAgg = "SteelSwap";
        for (const _swap of props.order.orders) {
          if (_swap.txStatus === "queued") {
            pendingSwaps.push({
              txHash: _swap.submitTxHash,
              txIndex: _swap.submitTxIndex
            });
          }
        }
      } else if (props.order.aggregator === "DexHunter") {
        targetAgg = "DexHunter";
        pendingSwaps.push({
          order_id: props.order.order_id
        });
      } else if (props.order.aggregator === "Minswap") {
        targetAgg = "Minswap";
        for (const _swap of props.order.orders) {
          if (_swap.txStatus === "queued") {
            pendingSwaps.push({
              txHash: _swap.submitTxHash,
              protocol: _swap.dex
            });
          }
        }
      }
      if (targetAgg) {
        await cancelOrder(networkId.value, pendingSwaps, targetAgg);
      }
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        class: "size-5 sm:size-7 p-0! rounded-sm! sm:rounded-md!",
        outlined: "",
        severity: "secondary",
        onClick: cancelAllOpen
      }, {
        icon: withCtx(() => [
          createVNode(IconCancel01, { class: "size-4 sm:size-5" })
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1 = { class: "flex flex-col -mt-1" };
const _hoisted_2 = { class: "et-text-md font-bold" };
const _hoisted_3 = { class: "et-text-xs text-txt-muted" };
const _hoisted_4 = { class: "mt-2" };
const _hoisted_5 = {
  key: 0,
  class: "et-text-sm"
};
const _hoisted_6 = {
  key: 1,
  class: "et-text-sm"
};
const _hoisted_7 = { class: "w-6 flex flex-col et-jc-ic aspect-square rounded-full overflow-hidden et-bg-4" };
const _hoisted_8 = { class: "w-[80px] flex flex-row et-gap-xs items-start flex-wrap grow-0 shrink-0" };
const _hoisted_9 = { class: "w-6 flex flex-col et-jc-ic aspect-square rounded-full overflow-hidden" };
const _hoisted_10 = { class: "flex flex-col et-jc-ic" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OpenOrders",
  props: {
    hideEmpty: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const $t = useTranslation().t;
    const {
      buildAccountId,
      accountData
    } = useBuildAccount();
    const {
      isLoadingOpenOrders,
      getOpenOrders,
      openOrders
    } = useMonsterSwapData();
    let refreshInterval = -1;
    watch(accountData, () => {
      if (buildAccountId.value) {
        getOpenOrders(buildAccountId.value);
      }
    });
    onMounted(() => {
      if (buildAccountId.value) {
        getOpenOrders(buildAccountId.value);
      }
      refreshInterval = setTimeout(() => {
        if (buildAccountId.value) {
          getOpenOrders(buildAccountId.value);
        }
      }, 2e4);
    });
    onBeforeUnmount(() => {
      clearInterval(refreshInterval);
    });
    return (_ctx, _cache) => {
      const _component_Column = resolveComponent("Column");
      const _component_DataTable = resolveComponent("DataTable");
      const _component_Card = resolveComponent("Card");
      return !__props.hideEmpty || !(__props.hideEmpty && unref(openOrders).length === 0) ? (openBlock(), createBlock(_component_Card, {
        key: 0,
        class: "grow break-inside-avoid"
      }, {
        title: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, toDisplayString(unref($t)("swap-openOrders:title")), 1),
            createBaseVNode("div", _hoisted_3, toDisplayString(unref($t)("swap-openOrders:caption")), 1)
          ])
        ]),
        content: withCtx(() => [
          createVNode(_component_DataTable, {
            rows: __props.hideEmpty ? 5 : 10,
            paginator: unref(openOrders).length > 15,
            "paginator-position": "bottom",
            value: unref(openOrders),
            pt: {
              root: "flex flex-col et-gap-md",
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
              createBaseVNode("div", _hoisted_4, [
                unref(isLoadingOpenOrders) ? (openBlock(), createElementBlock("div", _hoisted_5, toDisplayString(unref($t)("swap-openOrders:loading")), 1)) : (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString(unref($t)("swap-openOrders:noPending")), 1))
              ])
            ]),
            default: withCtx(() => [
              createVNode(_component_Column, {
                header: unref($t)("swap-openOrders:time"),
                class: "pl-0 pr-1 py-0 border-0"
              }, {
                body: withCtx((slotProps) => [
                  createVNode(_sfc_main$6, {
                    timestamp: slotProps.data?.submitTime
                  }, null, 8, ["timestamp"])
                ]),
                _: 1
              }, 8, ["header"]),
              createVNode(_component_Column, {
                header: unref($t)("swap-openOrders:swap"),
                class: "px-1 py-0 border-0"
              }, {
                body: withCtx((slotProps) => [
                  createVNode(_sfc_main$2, {
                    "token-in": slotProps.data.token_in,
                    "amount-in": slotProps.data.amount_in,
                    "token-out": slotProps.data.token_out,
                    "amount-out": slotProps.data.amount_out
                  }, null, 8, ["token-in", "amount-in", "token-out", "amount-out"])
                ]),
                _: 1
              }, 8, ["header"]),
              createVNode(_component_Column, {
                header: unref($t)("swap-openOrders:via"),
                class: "p-2 border-0"
              }, {
                body: withCtx((slotProps) => [
                  createBaseVNode("div", _hoisted_7, [
                    createVNode(_sfc_main$7, {
                      agg: slotProps.data.aggregator
                    }, null, 8, ["agg"])
                  ])
                ]),
                _: 1
              }, 8, ["header"]),
              createVNode(_component_Column, {
                header: unref($t)("swap-openOrders:dexs"),
                class: "p-2 border-0"
              }, {
                body: withCtx((slotProps) => [
                  createBaseVNode("div", _hoisted_8, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(slotProps.data.dexList, (dex) => {
                      return openBlock(), createElementBlock("div", _hoisted_9, [
                        createVNode(_sfc_main$8, { dex }, null, 8, ["dex"])
                      ]);
                    }), 256))
                  ])
                ]),
                _: 1
              }, 8, ["header"]),
              createVNode(_component_Column, {
                header: "",
                class: "px-1 py-0 border-0"
              }, {
                body: withCtx((slotProps) => [
                  createBaseVNode("div", _hoisted_10, [
                    createVNode(_sfc_main$1, {
                      order: slotProps.data,
                      class: "w-5 h-5"
                    }, null, 8, ["order"])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["rows", "paginator", "value"])
        ]),
        _: 1
      })) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _, _sfc_main$3 as a };
