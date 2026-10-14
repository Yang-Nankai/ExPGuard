import { d as defineComponent, D as computed, f as onMounted, k as onUnmounted, c as createBlock, o as openBlock, z as resolveComponent, U as withModifiers, y as withCtx, n as createVNode, p as createBaseVNode, a0 as renderSlot, m as createElementBlock, t as createCommentVNode, u as unref } from './index.js';
import { u as useTxInfos, _ as _sfc_main$1 } from './TransactionItemHeader.vue_vue_type_script_setup_true_lang.js';
import { u as useModalTransactionViewer, _ as _sfc_main$3 } from './TransactionAssetList.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$2 } from './TransactionItemMessages.vue_vue_type_script_setup_true_lang.js';

const _hoisted_1 = { class: "w-full flex flex-col et-gap-sm" };
const _hoisted_2 = { class: "flex flex-col et-gap-sm" };
const _hoisted_3 = {
  key: 0,
  class: "w-full flex flex-row flex-wrap et-je-is et-gap-sm"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TransactionItem",
  props: {
    txBalance: { type: Object, required: true },
    localTx: { type: Object, required: false, default: () => void 0 },
    walletId: { type: String, required: false, default: "" },
    accountId: { type: String, required: false, default: "" },
    stagingTx: { type: Boolean, required: false, default: false },
    pendingTx: { type: Boolean, required: false, default: false },
    sendTx: { type: Boolean, required: false, default: false },
    signed: { type: Boolean, required: false, default: false },
    autoOpen: { type: Boolean, required: false, default: false },
    autoClose: { type: Boolean, required: false, default: false },
    minimal: { type: Boolean, required: false, default: false },
    showAssets: { type: Boolean, required: false, default: false },
    amountToShow: { type: Number, required: false, default: 2 }
  },
  setup(__props) {
    const props = __props;
    const walletId = computed(() => props.walletId || null);
    const accountId = computed(() => props.accountId || null);
    const localBalance = computed(() => props.txBalance);
    const localTx = computed(() => props.localTx);
    const doShowAssets = computed(() => props.showAssets && !!localBalance.value.multiasset);
    const {
      txBalance,
      openModalTransactionViewer,
      tweenOutModalTransactionViewer
    } = useModalTransactionViewer(walletId, accountId, void 0, false);
    const txInfos = useTxInfos(localBalance, localTx, {
      signedTx: props.signed,
      pendingTx: props.pendingTx,
      stagingTx: props.stagingTx,
      sentTx: props.sendTx
    });
    const isOpenInViewer = computed(() => txBalance.value?.hash === localBalance.value.hash);
    const toggleModalTransactionViewer = (event) => {
      event.preventDefault();
      if (txBalance.value?.hash === localBalance.value.hash) {
        tweenOutModalTransactionViewer();
      } else {
        openModalTransactionViewer(localBalance.value, localTx.value, props.sendTx);
      }
    };
    onMounted(() => {
      if (props.autoOpen) {
        openModalTransactionViewer(localBalance.value, localTx.value, props.sendTx);
      }
    });
    onUnmounted(() => {
      if (props.autoOpen || props.autoClose) {
        setTimeout(() => {
          if (txBalance.value?.hash === localBalance.value.hash) {
            tweenOutModalTransactionViewer();
          }
        }, 300);
      }
    });
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        class: "transaction-item w-full p-0 et-js-ic rounded-card shadow-sm border-1 border-[var(--p-content-border-color)] data-active:border-border-highlight/50 hover:data-active:border-border-highlight bg-[var(--p-card-background)] hover:bg-[var(--p-button-text-secondary-hover-background)]",
        severity: "secondary",
        "data-ui": isOpenInViewer.value ? "active" : "",
        text: "",
        onClick: withModifiers(toggleModalTransactionViewer, ["prevent", "stop"])
      }, {
        default: withCtx(() => [
          createVNode(_component_Card, {
            class: "w-full bg-transparent border-0 rounded-lg!",
            pt: {
              body: doShowAssets.value ? "pa-card" : "pt-card px-card pb-card-no-assets"
            }
          }, {
            content: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createBaseVNode("div", _hoisted_2, [
                  createVNode(_sfc_main$1, {
                    "tx-infos": unref(txInfos),
                    minimal: __props.minimal
                  }, null, 8, ["tx-infos", "minimal"]),
                  createVNode(_sfc_main$2, {
                    "tx-messages": unref(txInfos).txMessages,
                    "is-compact": ""
                  }, null, 8, ["tx-messages"])
                ]),
                doShowAssets.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
                  createVNode(_sfc_main$3, {
                    "multi-asset": localBalance.value.multiasset,
                    "amount-to-show": __props.amountToShow
                  }, null, 8, ["multi-asset", "amount-to-show"])
                ])) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "footer")
            ]),
            _: 3
          }, 8, ["pt"])
        ]),
        _: 3
      }, 8, ["data-ui"]);
    };
  }
});

export { _sfc_main as _ };
