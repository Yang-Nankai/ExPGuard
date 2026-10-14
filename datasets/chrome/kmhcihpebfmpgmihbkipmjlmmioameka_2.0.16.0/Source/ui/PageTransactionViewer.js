const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["ui/initEternlTxViewer.js","ui/index.js","ui/NetworkId.js","assets/index.css","ui/app2.js","ui/bigmath.js","ui/epochParams.js","ui/cms.js","ui/guard.js","ui/useAppAccountBalances.js","ui/chainTip.js","ui/chain.js","ui/appState.js","ui/decryptedMsg.js","ui/contractMapping.js","ui/lib.js","ui/creds.js","ui/ErrorSignTx.js","ui/useSignTx.js","ui/useSelectedAccount.js","ui/useGuards.js","ui/currency.js","ui/useCurrencyAPI.js","ui/currency2.js","ui/language.js"])))=>i.map(i=>d[i]);
import { d as defineComponent, w as useTranslation, x as useScreenSize, e as ref, O as useModalTransactionViewerLight, m as createElementBlock, o as openBlock, p as createBaseVNode, n as createVNode, y as withCtx, u as unref, c as createBlock, t as createCommentVNode, _ as __vitePreload, G as watch, z as resolveComponent, P as networkId } from './index.js';
import { c as calcNeutralTxBalance, f as freeCSLObjects } from './app2.js';
import { g as getTransactionFromCbor } from './useSignTx.js';
import { _ as _sfc_main$2, u as useDetailedTxInfo, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$5 } from './ModalAssetDetails.vue_vue_type_script_setup_true_lang.js';
import { u as useWitnesses } from './creds.js';
import { u as useNotifications } from './useNotification.js';
import { u as useModalTransactionViewer } from './TransactionAssetList.vue_vue_type_script_setup_true_lang.js';
import { u as useModuleLoader } from './useModuleLoader.js';
import { u as usePreloader } from './usePreloader.js';
import { B as ButtonRow } from './ButtonRow.js';
import { _ as _sfc_main$1 } from './ModalHeader.vue_vue_type_script_setup_true_lang.js';
import './NetworkId.js';
import './bigmath.js';
import './epochParams.js';
import './useAppMode.js';
import './TransactionItemHeader.vue_vue_type_script_setup_true_lang.js';
import './Badge.vue_vue_type_script_setup_true_lang.js';
import './_plugin-vue_export-helper.js';
import './image.js';
import './IconCancel01.js';
import './IconAlert02.js';
import './contractMapping.js';
import './TransactionItemMessages.vue_vue_type_script_setup_true_lang.js';
import './messageEncryption.js';
import './decryptedMsg.js';
import './IconSquareUnlock02.js';
import './chain.js';
import './chainTip.js';
import './useFormatter.js';
import './language.js';
import './useSubmitTx.js';
import './ErrorSubmitTx.js';
import './parse.js';
import './ErrorSignTx.js';
import './useAppAccountBalances.js';
import './lib.js';
import './swap.js';
import './notification.js';
import './generateConfig.js';
import './govActionList.js';
import './useSelectedAccount.js';
import './MilkomedaDB.js';
import './IconArrowLB.js';
import './FiatAmount.vue_vue_type_script_setup_true_lang.js';
import './useCurrencyAPI.js';
import './currency2.js';
import './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import './index3.js';
import './useBalanceVisible.js';
import './AdaAmount.vue_vue_type_script_setup_true_lang.js';
import './Badges.vue_vue_type_script_setup_true_lang.js';
import './TabsToSelect.vue_vue_type_script_setup_true_lang.js';
import './ModalContentCard.js';
import './ExplorerLink.vue_vue_type_script_setup_true_lang.js';
import './ContextMenu.vue_vue_type_script_setup_true_lang.js';
import './IconCopy01.js';
import './IconInformationCircle.js';
import './IconLinkSquare01.js';
import './CopyToClipboard.vue_vue_type_script_setup_true_lang.js';
import './GovActionEntry.vue_vue_type_script_setup_true_lang.js';
import './Bech32Display.vue_vue_type_script_setup_true_lang.js';
import './IconChevronUp.js';
import './IconChevronDown.js';
import './CardDRep2.vue_vue_type_script_setup_true_lang.js';
import './error.js';
import './useAdaSymbol.js';
import './SocialLinksSmall.vue_vue_type_script_setup_true_lang.js';
import './IconEmail.js';
import './useGuards.js';
import './usePaginator.js';
import './TransactionUTxODetails.vue_vue_type_script_setup_true_lang.js';
import './address.js';
import './IconChevronRight.js';
import './TransactionUTxOAddress.vue_vue_type_script_setup_true_lang.js';
import './IconArrowUp01.js';
import './MultiSigDecryptMetadata.vue_vue_type_script_setup_true_lang.js';
import './PasswordInput.vue_vue_type_script_setup_true_lang.js';
import './useBiometricsAction.js';
import './IconPencil.js';
import './ButtonOutline.vue_vue_type_script_setup_true_lang.js';
import './IconSearch01.js';
import './useModalAssetDetails.js';
import './AssetListCardImage.vue_vue_type_script_setup_true_lang.js';
import './useModalImage.js';
import './useNavigation.js';
import './send.js';
import './useResetScroll.js';
import './Modal.vue_vue_type_script_setup_true_lang.js';
import './index2.js';
import './useTokenPrices.js';

const _hoisted_1 = { class: "p-8 flex flex-col et-js-ic et-gap-lg w-full h-full overflow-auto" };
const _hoisted_2 = { class: "w-full max-w-4xl flex flex-row et-jc-ic et-gap-md" };
const _hoisted_3 = { class: "w-full max-w-4xl flex flex-row et-jc-ic et-gap-md" };
const _hoisted_4 = { class: "w-full max-w-4xl flex flex-row et-jc-ic et-gap-md" };
const moduleId = "mainWalletModule";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageTransactionViewer",
  setup(__props) {
    const $t = useTranslation().t;
    const { isSmallerThanXS } = useScreenSize();
    const { showError } = useNotifications();
    const modal = ref();
    const tweenOut = () => {
      modal.value?.handleClose();
    };
    const {
      showTxDetails,
      showTxDetailsButton
    } = useDetailedTxInfo();
    const { suppressOpenModal } = useModalTransactionViewerLight();
    suppressOpenModal.value = true;
    const {
      txViewerHistory,
      txBalance,
      localTx,
      walletId,
      accountId,
      isWider,
      isStagingTx,
      doToggleWidth,
      showPreviousTx,
      doTxHashSearch
    } = useModalTransactionViewer(ref(null), ref(null), tweenOut, true);
    const { parseWitnesses } = useWitnesses();
    const doTxCborParsing = async (txCbor) => {
      const free = [];
      try {
        const tx = getTransactionFromCbor(networkId.value, txCbor, 0, free);
        const _localTx = tx.builtTx;
        const _localBalance = await calcNeutralTxBalance(networkId.value, _localTx);
        parseWitnesses(_localTx);
        localTx.value = _localTx;
        txBalance.value = _localBalance;
      } catch (e) {
        showError($t("tx-viewer:search.invalidTxCbor"));
      } finally {
        freeCSLObjects(free);
      }
    };
    const {
      progress,
      addModule,
      updateModuleLoadProgress,
      resetProgress
    } = useModuleLoader();
    const {
      showPreloader
    } = usePreloader();
    if (!showPreloader.value) {
      resetProgress();
      showPreloader.value = true;
    }
    addModule(moduleId);
    updateModuleLoadProgress(moduleId, 0.05);
    let _eternl;
    const loadEternl = async () => {
      updateModuleLoadProgress(moduleId, 0.15);
      updateModuleLoadProgress(moduleId, 0.25);
      updateModuleLoadProgress(moduleId, 0.35);
      _eternl = await __vitePreload(() => import('./initEternlTxViewer.js'),true              ?__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]):void 0);
      updateModuleLoadProgress(moduleId, 0.6);
      const stop = watch(progress, (value) => {
        updateModuleLoadProgress(moduleId, 0.6 + value * 0.01 * 0.333);
      });
      await _eternl.initEternl(progress);
      stop();
      updateModuleLoadProgress(moduleId, 1);
    };
    loadEternl();
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$1, {
            headline: unref($t)("tx-viewer:title"),
            "text-left": !unref(isWider) || unref(isSmallerThanXS),
            "hide-info": "",
            "hide-back": "",
            onBack: unref(doToggleWidth)
          }, {
            "pre-close": withCtx(() => [
              unref(txViewerHistory).length > 0 ? (openBlock(), createBlock(_sfc_main$3, {
                key: 0,
                onClick: unref(showPreviousTx)
              }, null, 8, ["onClick"])) : createCommentVNode("", true),
              !unref(isStagingTx) ? (openBlock(), createBlock(_sfc_main$4, {
                key: 1,
                onTxHash: unref(doTxHashSearch),
                onTxCbor: doTxCborParsing
              }, null, 8, ["onTxHash"])) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["headline", "text-left", "onBack"])
        ]),
        createBaseVNode("div", _hoisted_3, [
          createVNode(_sfc_main$2, {
            "tx-balance": !!unref(txBalance) ? unref(txBalance) : void 0,
            "local-tx": unref(localTx) ?? void 0,
            "wallet-id": unref(walletId) ?? "",
            "account-id": unref(accountId) ?? "",
            "staging-tx": unref(isStagingTx),
            "is-tx-viewer": ""
          }, null, 8, ["tx-balance", "local-tx", "wallet-id", "account-id", "staging-tx"])
        ]),
        createBaseVNode("div", _hoisted_4, [
          unref(showTxDetailsButton) ? (openBlock(), createBlock(ButtonRow, { key: 0 }, {
            default: withCtx(() => [
              _cache[1] || (_cache[1] = createBaseVNode("div", {
                id: "modal-tx-viewer-buttons",
                class: "grow shrink flex flex-col truncate"
              }, null, -1)),
              unref(showTxDetailsButton) ? (openBlock(), createBlock(_component_Button, {
                key: 0,
                label: unref(showTxDetails) ? unref($t)("common:button.hideDetails") : unref($t)("common:button.showDetails"),
                severity: "secondary",
                rounded: "",
                outlined: "",
                onClick: _cache[0] || (_cache[0] = ($event) => showTxDetails.value = !unref(showTxDetails))
              }, null, 8, ["label"])) : createCommentVNode("", true)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        createVNode(_sfc_main$5)
      ]);
    };
  }
});

export { _sfc_main as default };
