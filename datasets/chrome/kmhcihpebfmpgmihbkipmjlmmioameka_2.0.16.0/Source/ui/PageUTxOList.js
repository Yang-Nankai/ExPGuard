import { d as defineComponent, w as useTranslation, x as useScreenSize, m as createElementBlock, o as openBlock, p as createBaseVNode, n as createVNode, $ as createSlots, y as withCtx, u as unref, B as toDisplayString } from './index.js';
import { I as IconNumberedList } from './IconNumberedList.js';
import { _ as _sfc_main$2 } from './AccountUtxoList.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$1 } from './PageHeader.vue_vue_type_script_setup_true_lang.js';
import './NetworkId.js';
import './_plugin-vue_export-helper.js';
import './bigmath.js';
import './useSelectedAccount.js';
import './app2.js';
import './epochParams.js';
import './useAppAccountBalances.js';
import './useAdaSymbol.js';
import './useFormatter.js';
import './language.js';
import './AdaAmount.vue_vue_type_script_setup_true_lang.js';
import './useAppMode.js';
import './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import './index3.js';
import './useNotification.js';
import './notification.js';
import './useBalanceVisible.js';
import './usePaginator.js';
import './Badge.vue_vue_type_script_setup_true_lang.js';
import './image.js';
import './IconCancel01.js';
import './IconAlert02.js';
import './contractMapping.js';
import './AccountUtxoItem.vue_vue_type_script_setup_true_lang.js';
import './TransactionUTxOAddress.vue_vue_type_script_setup_true_lang.js';
import './Bech32Display.vue_vue_type_script_setup_true_lang.js';
import './ExplorerLink.vue_vue_type_script_setup_true_lang.js';
import './ContextMenu.vue_vue_type_script_setup_true_lang.js';
import './IconCopy01.js';
import './IconInformationCircle.js';
import './IconLinkSquare01.js';
import './TransactionUTxODetails.vue_vue_type_script_setup_true_lang.js';
import './address.js';
import './IconChevronRight.js';
import './CopyToClipboard.vue_vue_type_script_setup_true_lang.js';
import './TransactionAssetList.vue_vue_type_script_setup_true_lang.js';
import './parse.js';
import './ErrorSignTx.js';
import './useSignTx.js';
import './creds.js';
import './chain.js';
import './useModalAssetDetails.js';
import './useGuards.js';
import './Badges.vue_vue_type_script_setup_true_lang.js';
import './IconSquareUnlock02.js';
import './useModalOpen.js';
import './AssetListFilters.vue_vue_type_script_setup_true_lang.js';
import './error.js';
import './ErrorSubmitTx.js';
import './useHomeSettings.js';
import './InputSearch.vue_vue_type_script_setup_true_lang.js';
import './IconSearch01.js';
import './InputCoin.vue_vue_type_script_setup_true_lang.js';
import './currency2.js';
import './Modal.vue_vue_type_script_setup_true_lang.js';
import './index2.js';
import './ModalHeader.vue_vue_type_script_setup_true_lang.js';
import './ModalContentCard.js';
import './IconFxLoader.js';
import './DrawSVGPlugin.js';

const _hoisted_1 = { class: "page-utxo-list flex flex-col et-max-width-page" };
const _hoisted_2 = { class: "relative w-full flex flex-col et-js et-gap-md" };
const _hoisted_3 = { class: "" };
const _hoisted_4 = { class: "text-txt-muted" };
const _hoisted_5 = { class: "flex flex-col et-gap-xl" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageUTxOList",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      isSmallerThanXS
    } = useScreenSize();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$1, {
            title: unref($t)("utxoList-page:title")
          }, createSlots({
            icon: withCtx(() => [
              createVNode(IconNumberedList, { class: "size-5" })
            ]),
            _: 2
          }, [
            !unref(isSmallerThanXS) ? {
              name: "caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_3, toDisplayString(unref($t)("utxoList-page:caption")), 1)
              ]),
              key: "0"
            } : void 0,
            !unref(isSmallerThanXS) ? {
              name: "sub-caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_4, toDisplayString(unref($t)("utxoList-page:subCaption")), 1)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["title"]),
          createBaseVNode("div", _hoisted_5, [
            createVNode(_sfc_main$2)
          ])
        ])
      ]);
    };
  }
});

export { _sfc_main as default };
