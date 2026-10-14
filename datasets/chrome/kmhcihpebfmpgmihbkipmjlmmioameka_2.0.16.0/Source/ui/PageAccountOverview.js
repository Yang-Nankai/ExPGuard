import { c as isSwapEnabled, d as isStakingEnabled } from './NetworkId.js';
import { i as isSwapSupported, j as isStakingSupported } from './app2.js';
import { d as defineComponent, D as computed, P as networkId, e as ref, m as createElementBlock, o as openBlock, t as createCommentVNode, u as unref, V as normalizeClass, n as createVNode, c as createBlock } from './index.js';
import { u as useAppMode } from './useAppMode.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { u as useHomeSettings } from './useHomeSettings.js';
import { a as _sfc_main$1, b as _sfc_main$2, _ as _sfc_main$5 } from './AdaPriceChart.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$8 } from './CardStakePoolCompact.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$7 } from './CardAccountStakePool.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$9 } from './StakeRewardsChart.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$4 } from './SwapElement.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$6 } from './OpenOrders.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$3 } from './CardDRep2.vue_vue_type_script_setup_true_lang.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import './bigmath.js';
import './epochParams.js';
import './useAppAccountBalances.js';
import './TransactionAssetList.vue_vue_type_script_setup_true_lang.js';
import './parse.js';
import './ErrorSignTx.js';
import './useSignTx.js';
import './creds.js';
import './chain.js';
import './useModalAssetDetails.js';
import './image.js';
import './useGuards.js';
import './IconAlert02.js';
import './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import './useFormatter.js';
import './language.js';
import './index3.js';
import './useNotification.js';
import './notification.js';
import './useBalanceVisible.js';
import './IconCancel01.js';
import './useAdaSymbol.js';
import './useNavigation.js';
import './send.js';
import './useResetScroll.js';
import './useModalReceiveAddress.js';
import './useModalBuyADA.js';
import './SyncInfo.vue_vue_type_script_setup_true_lang.js';
import './FiatAmount.vue_vue_type_script_setup_true_lang.js';
import './useCurrencyAPI.js';
import './currency2.js';
import './index2.js';
import './AdaHandleName.vue_vue_type_script_setup_true_lang.js';
import './txHistory.js';
import './history.js';
import './contractMapping.js';
import './IconSpinner.js';
import './LineSpacer.js';
import './TransactionItem.vue_vue_type_script_setup_true_lang.js';
import './TransactionItemHeader.vue_vue_type_script_setup_true_lang.js';
import './Badge.vue_vue_type_script_setup_true_lang.js';
import './TransactionItemMessages.vue_vue_type_script_setup_true_lang.js';
import './messageEncryption.js';
import './decryptedMsg.js';
import './IconSquareUnlock02.js';
import './chainTip.js';
import './useSubmitTx.js';
import './ErrorSubmitTx.js';
import './lib.js';
import './swap.js';
import './generateConfig.js';
import './govActionList.js';
import './MilkomedaDB.js';
import './IconArrowLB.js';
import './AdaAmount.vue_vue_type_script_setup_true_lang.js';
import './Badges.vue_vue_type_script_setup_true_lang.js';
import './ReceiveListItem.vue_vue_type_script_setup_true_lang.js';
import './CopyToClipboard.vue_vue_type_script_setup_true_lang.js';
import './IconCopy01.js';
import './TransactionUTxOAddress.vue_vue_type_script_setup_true_lang.js';
import './Bech32Display.vue_vue_type_script_setup_true_lang.js';
import './ExplorerLink.vue_vue_type_script_setup_true_lang.js';
import './ContextMenu.vue_vue_type_script_setup_true_lang.js';
import './IconInformationCircle.js';
import './IconLinkSquare01.js';
import './AdaAmountRaw.vue_vue_type_script_setup_true_lang.js';
import './error.js';
import './useModalStakePoolList.js';
import './SocialLinksSmall.vue_vue_type_script_setup_true_lang.js';
import './IconEmail.js';
import './ButtonRow.js';
import './useApp.js';
import './IconSettings.vue_vue_type_script_setup_true_lang.js';
import './ExternalLink.vue_vue_type_script_setup_true_lang.js';
import './IconChevronDown.js';
import './TokenIcon.vue_vue_type_script_setup_true_lang.js';
import './SwapTimeAgo.vue_vue_type_script_setup_true_lang.js';
import './BannerWarning.vue_vue_type_script_setup_true_lang.js';

const _hoisted_1 = { class: "@container" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageAccountOverview",
  setup(__props) {
    useAppMode();
    const {
      appAccount,
      selectedAccountId,
      selectedWalletId,
      accountSettings,
      accountGovernance
    } = useSelectedAccount();
    const { delegatedDRepId } = accountGovernance;
    const {
      showAdaChartOnHome,
      showStakeKeyOnHome,
      showRewardsChartOnHome,
      showStakePoolOnHome,
      showDRepOnHome,
      showMonsterSwapOnHome,
      isMonsterSwapAllowed} = useHomeSettings();
    const hasStakeHistory = accountSettings.hasStakeHistory;
    const isMainnet = computed(() => networkId.value === "mainnet");
    const signType = computed(() => appAccount.value?.data.account.signType ?? "mnemonic");
    const showSwap = computed(() => isMonsterSwapAllowed.value && showMonsterSwapOnHome.value && isSwapEnabled(networkId.value) && isSwapSupported(signType.value));
    const showAdaPrice = computed(() => showAdaChartOnHome.value && isMainnet.value);
    const _isStakingEnabled = computed(() => isStakingEnabled(networkId.value) && isStakingSupported(signType.value));
    const showStakeKey = computed(() => showStakeKeyOnHome.value && _isStakingEnabled.value);
    const showRewardsChart = computed(() => showRewardsChartOnHome.value && hasStakeHistory.value && _isStakingEnabled.value);
    const showDRep = computed(() => showDRepOnHome.value && delegatedDRepId.value && _isStakingEnabled.value);
    ref("#overview-column-1");
    ref("#overview-column-1");
    ref("#overview-column-1");
    ref("#overview-column-1");
    ref("#overview-column-2");
    ref("#overview-column-2");
    ref("#overview-column-3");
    ref("#overview-column-3");
    ref("#overview-column-3");
    computed(() => {
      let numElements2 = 0;
      if (showAdaPrice.value) {
        numElements2 += 1;
      }
      if (showSwap.value) {
        numElements2 += 2;
      }
      if (showStakeKey.value) {
        numElements2 += 1;
      }
      if (showRewardsChart.value) {
        numElements2 += 1;
      }
      if (showDRep.value) {
        numElements2 += 1;
      }
      if (showStakePoolOnHome.value) {
        numElements2 += 1;
      }
      return numElements2;
    });
    const cssColumns = computed(() => {
      let numElements2 = 0;
      if (showSwap.value) {
        numElements2 += 2;
      }
      if (showAdaPrice.value) {
        numElements2 += 1;
      }
      if (showStakeKey.value) {
        numElements2 += 1;
      }
      if (showRewardsChart.value) {
        numElements2 += 1;
      }
      if (showDRep.value) {
        numElements2 += 1;
      }
      if (showStakePoolOnHome.value) {
        numElements2 += 1;
      }
      let css = "et-space-y-md et-gap-md columns-1 @3xl:columns-2 ";
      let maxWidth = "lg:et-max-width-page ";
      if (numElements2 > 2) {
        css += "@4xl:columns-2 ";
        maxWidth = "et-max-width-page ";
      }
      if (numElements2 > 3) {
        css += "@7xl:columns-3 ";
        maxWidth = "lg:max-w-5xl ";
      }
      if (numElements2 > 5) {
        css += "@9xl:columns-4 ";
        maxWidth = "lg:max-w-full ";
      }
      return maxWidth + css;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        unref(selectedWalletId) && unref(selectedAccountId) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(cssColumns.value)
        }, [
          createVNode(_sfc_main$1, {
            class: "break-inside-avoid",
            "wallet-id": unref(selectedWalletId),
            "account-id": unref(selectedAccountId)
          }, null, 8, ["wallet-id", "account-id"]),
          showSwap.value ? (openBlock(), createBlock(_sfc_main$4, {
            key: 0,
            class: "break-inside-avoid"
          })) : createCommentVNode("", true),
          showAdaPrice.value ? (openBlock(), createBlock(_sfc_main$5, {
            key: 1,
            class: "break-inside-avoid",
            "no-background": false
          })) : createCommentVNode("", true),
          showSwap.value ? (openBlock(), createBlock(_sfc_main$6, {
            key: 2,
            "hide-empty": ""
          })) : createCommentVNode("", true),
          createVNode(_sfc_main$2, {
            class: "break-inside-avoid",
            "wallet-id": unref(selectedWalletId),
            "account-id": unref(selectedAccountId),
            "num-entries": 3,
            "hide-tx-button": ""
          }, null, 8, ["wallet-id", "account-id"]),
          unref(showStakePoolOnHome) ? (openBlock(), createBlock(_sfc_main$7, {
            key: 3,
            "show-open-pool-list": false,
            "show-open-history": ""
          })) : createCommentVNode("", true),
          showStakeKey.value ? (openBlock(), createBlock(_sfc_main$8, { key: 4 })) : createCommentVNode("", true),
          showRewardsChart.value ? (openBlock(), createBlock(_sfc_main$9, {
            key: 5,
            class: "break-inside-avoid",
            "no-background": false,
            "show-button": true
          })) : createCommentVNode("", true),
          showDRep.value && unref(delegatedDRepId) ? (openBlock(), createBlock(_sfc_main$3, {
            key: 6,
            class: "break-inside-avoid",
            cardDRepId: unref(delegatedDRepId),
            size: "small",
            "show-list-button": ""
          }, null, 8, ["cardDRepId"])) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true)
      ]);
    };
  }
});

const PageAccountOverview = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-af8913bf"]]);

export { PageAccountOverview as default };
