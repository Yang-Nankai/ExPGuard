import { e as ref, cI as isBexApp, bl as WALLET_VERSION_BETA, d2 as isBetaApp, d3 as isStagingApp, g as isMobileApp, Z as useLocalStorage, m as createElementBlock, o as openBlock, p as createBaseVNode, G as watch, aE as addSignalListener, aT as onNetworkFeaturesUpdated, d4 as onBackendServerSet, k as onUnmounted, aF as removeSignalListener, Q as reactive, d5 as isSwapAllowed, aP as markRaw, P as networkId, X as useDesktopMenuCollapsed, d as defineComponent, D as computed, c as createBlock, t as createCommentVNode, u as unref, z as resolveComponent, $ as createSlots, y as withCtx, n as createVNode, V as normalizeClass, H as createTextVNode, B as toDisplayString, U as withModifiers, w as useTranslation } from './index.js';
import { d as isStakingEnabled, c as isSwapEnabled, l as isDappBrowserEnabled, k as isGovernanceEnabled, m as isCatalystEnabled } from './NetworkId.js';
import { j as isStakingSupported, i as isSwapSupported, cV as isDAppSupported, cW as isGovDelegSupported, cX as isCatalystSupported, a as fixedDappWalletId, aA as isHDAccount, u as useDappAccount } from './app2.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { u as useHomeSettings } from './useHomeSettings.js';
import { u as useModalScanQR, I as IconQR } from './IconQR.js';
import { I as IconNumberedList } from './IconNumberedList.js';
import { I as IconAssetsOutline } from './IconAssetsOutline.js';
import { I as IconGlobe } from './IconInfo.js';
import { I as IconVoting } from './IconVoting.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { I as IconPieChart, u as useAppWalletIdList } from './IconPieChart.js';
import { I as IconTransactionOutline } from './IconTransactionOutline.js';
import { I as IconStakingOutline } from './IconStakingOutline.js';
import { I as IconMonsterSwap } from './IconMonsterSwap.js';
import { b as IconMultiSig } from './IconUserGroup.js';
import { a as useWalletAccount } from './TransactionAssetList.vue_vue_type_script_setup_true_lang.js';
import { u as useModalSelectAccount } from './IconPlusSign.js';
import { c as _sfc_main$9, d as _sfc_main$a, M as MultiSigGradient, b as IconLockEnabled, e as IconComputerProgramming01, _ as _sfc_main$d } from './SyncInfo.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$b } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$c } from './FiatAmount.vue_vue_type_script_setup_true_lang.js';

const versionInfo = ref("");
const showVersionInfo$1 = () => {
  let info = WALLET_VERSION_BETA + " (";
  if (isBetaApp()) {
    info += "beta - ";
  }
  if (isStagingApp()) {
    info += "*";
  }
  if (isBexApp()) {
    info += "extension";
  } else if (isMobileApp()) {
    info += "mobile";
  } else {
    info += "web";
  }
  info += ")";
  versionInfo.value = info;
};
const hideVersionInfo$1 = () => {
  versionInfo.value = "";
};
const useBottomVersionInfo = () => {
  return {
    versionInfo,
    showVersionInfo: showVersionInfo$1,
    hideVersionInfo: hideVersionInfo$1
  };
};

const {
  showVersionInfo,
  hideVersionInfo
} = useBottomVersionInfo();
const showModal = ref(false);
const panelIndex = ref(-1);
const toggleSettings = () => {
  if (!showModal.value) {
    openModalSettings();
  } else {
    closeModalSettings();
  }
};
const openModalSettings = (index = -1) => {
  panelIndex.value = index;
  showModal.value = true;
  showVersionInfo();
};
const closeModalSettings = () => {
  showModal.value = false;
  panelIndex.value = -1;
  hideVersionInfo();
};
const useModalSettings = () => {
  return {
    showModalSettings: showModal,
    openModalSettings,
    closeModalSettings,
    toggleSettings,
    panelIndex
  };
};

const showWalletListMenu = useLocalStorage("showWalletListMenu", false, { listenToStorageChanges: true });
const useWalletListMenu = () => {
  return {
    showWalletListMenu
  };
};

const _sfc_main$8 = {  };

const _hoisted_1$7 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$5(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$7, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M7.08848 4.76243L6.08847 5.54298C4.57181 6.72681 3.81348 7.31873 3.40674 8.15333C3 8.98792 3 9.95205 3 11.8803V13.9715C3 17.7562 3 19.6485 4.17157 20.8243C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8243C21 19.6485 21 17.7562 21 13.9715V11.8803C21 9.95205 21 8.98792 20.5933 8.15333C20.1865 7.31873 19.4282 6.72681 17.9115 5.54298L16.9115 4.76243C14.5521 2.92081 13.3724 2 12 2C10.6276 2 9.44787 2.92081 7.08848 4.76243Z",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M15 16.5H17V18.5M15 16.5V18.5H17M15 16.5L17 18.5",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const HomeOutline = /*#__PURE__*/_export_sfc(_sfc_main$8, [['render',_sfc_render$5]]);

const _sfc_main$7 = {  };

const _hoisted_1$6 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$4(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$6, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M20.3927 8.03168L18.6457 6.51461C17.3871 5.42153 16.8937 4.83352 16.2121 5.04139C15.3622 5.30059 15.642 6.93609 15.642 7.48824C14.3206 7.48824 12.9468 7.38661 11.6443 7.59836C7.34453 8.29742 6 11.3566 6 14.6525C7.21697 13.9065 8.43274 13.0746 9.8954 12.7289C11.7212 12.2973 13.7603 12.5032 15.642 12.5032C15.642 13.0554 15.3622 14.6909 16.2121 14.9501C16.9844 15.1856 17.3871 14.5699 18.6457 13.4769L20.3927 11.9598C21.4642 11.0293 22 10.564 22 9.99574C22 9.4275 21.4642 8.96223 20.3927 8.03168Z",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M10.5676 3C6.70735 3.00694 4.68594 3.10152 3.39411 4.39073C2 5.78202 2 8.02125 2 12.4997C2 16.9782 2 19.2174 3.3941 20.6087C4.78821 22 7.03198 22 11.5195 22C16.0071 22 18.2509 22 19.645 20.6087C20.6156 19.64 20.9104 18.2603 21 16",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconSend = /*#__PURE__*/_export_sfc(_sfc_main$7, [['render',_sfc_render$4]]);

const _sfc_main$6 = {  };

const _hoisted_1$5 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$3(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$5, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M12 22C11.1818 22 10.4002 21.6754 8.83693 21.0262C4.94564 19.4101 3 18.6021 3 17.2429V7.74463M12 22C12.8182 22 13.5998 21.6754 15.1631 21.0262C19.0544 19.4101 21 18.6021 21 17.2429V7.74463M12 22V12.1687M3 7.74463C3 8.3485 3.80157 8.72983 5.40472 9.49248L8.32592 10.8822C10.1288 11.7399 11.0303 12.1687 12 12.1687M3 7.74463C3 7.14076 3.80157 6.75944 5.40472 5.99678L7.5 5M21 7.74463C21 8.3485 20.1984 8.72983 18.5953 9.49248L15.6741 10.8822C13.8712 11.7399 12.9697 12.1687 12 12.1687M21 7.74463C21 7.14076 20.1984 6.75944 18.5953 5.99678L16.5 5M6 13.1518L8 14.135",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M12.0037 2L12.0037 8.99995M12.0037 8.99995C12.2668 9.00351 12.5263 8.81972 12.7178 8.59534L14 7.06174M12.0037 8.99995C11.7499 8.99652 11.4929 8.81368 11.2897 8.59534L10 7.06174",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    }, null, -1)
  ]))]))
}
const IconReceive = /*#__PURE__*/_export_sfc(_sfc_main$6, [['render',_sfc_render$3]]);

const _sfc_main$5 = {  };

const _hoisted_1$4 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$4, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M19.7085 7.65038C19.8657 7.49323 20.1365 7.47721 20.2957 7.65093C21.2284 8.66824 21.7446 9.42151 21.9146 10.2557C22.0124 10.7357 22.0263 11.2242 21.9557 11.6994C21.7649 12.9836 20.7244 14.0241 18.6434 16.1051L16.1051 18.6434C14.0241 20.7244 12.9836 21.7649 11.6994 21.9557C11.2242 22.0263 10.7357 22.0124 10.2557 21.9146C9.4216 21.7446 8.66841 21.2285 7.65127 20.296C7.47734 20.1366 7.49342 19.8655 7.65074 19.7082C8.52693 18.832 8.48529 17.3698 7.55776 16.4422C6.63022 15.5147 5.16802 15.4731 4.29183 16.3493C4.13451 16.5066 3.86341 16.5227 3.70395 16.3487C2.77146 15.3316 2.25536 14.5784 2.08539 13.7443C1.98759 13.2643 1.97368 12.7758 2.04429 12.3006C2.23513 11.0164 3.27561 9.97588 5.35657 7.89492L7.89492 5.35657C9.97588 3.27561 11.0164 2.23513 12.3006 2.04428C12.7758 1.97368 13.2643 1.98759 13.7443 2.08539C14.5785 2.25538 15.3318 2.77157 16.3491 3.70427C16.5228 3.86355 16.5068 4.13432 16.3496 4.29147C15.4734 5.16765 15.5151 6.62985 16.4426 7.55739C17.3701 8.48493 18.8324 8.52656 19.7085 7.65038Z",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M19 15L9 5",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconVote = /*#__PURE__*/_export_sfc(_sfc_main$5, [['render',_sfc_render$2]]);

const _sfc_main$4 = {  };

const _hoisted_1$3 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$3, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      fill: "none",
      d: "M7 18V16M12 18V15M17 18V13M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
    }, null, -1),
    createBaseVNode("path", {
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      fill: "none",
      d: "M5.99219 11.4863C8.14729 11.5581 13.0341 11.2328 15.8137 6.82132M13.9923 6.28835L15.8678 5.98649C16.0964 5.95738 16.432 6.13785 16.5145 6.35298L17.0104 7.99142"
    }, null, -1)
  ]))]))
}
const IconAnalyticsUp = /*#__PURE__*/_export_sfc(_sfc_main$4, [['render',_sfc_render$1]]);

const showReportingInNavi = ref(false);
const _mainMenuItemList = reactive([]);
let _collapseMenuItem = ref(null);
const { appAccount } = useSelectedAccount();
const {
  toggleDesktopMenuCollapsed,
  isDesktopMenuCollapsed
} = useDesktopMenuCollapsed();
const { openModalScanQR } = useModalScanQR();
const { isMonsterSwapAllowed } = useHomeSettings();
const showMonsterSwapInNavi = useLocalStorage("showMonsterSwapInNavi", true, { listenToStorageChanges: true });
const createMenu = ($t) => {
  const createLabel = (label, suffix = "") => {
    return !isDesktopMenuCollapsed.value ? $t("navigation:" + label) + (suffix ? suffix : "") : "";
  };
  isMonsterSwapAllowed.value = isSwapAllowed();
  _mainMenuItemList.length = 0;
  let signType = null;
  if (appAccount.value) {
    signType = appAccount.value.data.account.signType;
  }
  _mainMenuItemList.push({
    routeName: "PageAccountOverview",
    label: createLabel("home"),
    icon: markRaw(HomeOutline)
  });
  _mainMenuItemList.push({
    routeName: "",
    label: "",
    icon: null,
    isDivider: true
  });
  _mainMenuItemList.push({
    routeName: "PageReceive",
    label: createLabel("receive"),
    icon: markRaw(IconReceive)
  });
  _mainMenuItemList.push({
    routeName: "PageSend",
    label: createLabel("send"),
    icon: markRaw(IconSend)
  });
  _mainMenuItemList.push({
    routeName: "PageTransactionList",
    label: createLabel("transactions"),
    icon: markRaw(IconTransactionOutline)
  });
  _mainMenuItemList.push({
    routeName: "",
    label: "",
    icon: null,
    isDivider: true
  });
  _mainMenuItemList.push({
    routeName: "PageAssetList",
    label: createLabel("assets"),
    icon: markRaw(IconAssetsOutline)
  });
  if (isStakingEnabled(networkId.value) && (signType ? isStakingSupported(signType) : true)) {
    _mainMenuItemList.push({
      routeName: "PageStaking",
      label: createLabel("staking"),
      icon: markRaw(IconStakingOutline)
    });
  }
  if (isSwapEnabled(networkId.value) && (signType ? isSwapSupported(signType) : true)) {
    _mainMenuItemList.push({
      routeName: "PagePortfolio",
      label: createLabel("portfolio", $t("navigation:beta")),
      icon: markRaw(IconPieChart)
    });
  }
  if (showReportingInNavi.value) {
    _mainMenuItemList.push({
      routeName: "PageReporting",
      label: createLabel("reporting", $t("navigation:beta")),
      icon: markRaw(IconAnalyticsUp)
    });
  }
  _mainMenuItemList.push({
    routeName: "",
    label: "",
    icon: null,
    isDivider: true
  });
  let addDivider = false;
  if (isSwapAllowed() && isSwapEnabled(networkId.value) && (signType ? isSwapSupported(signType) : true) && showMonsterSwapInNavi.value) {
    _mainMenuItemList.push({
      routeName: "PageSwap",
      label: createLabel("swap"),
      icon: markRaw(IconMonsterSwap)
    });
    addDivider = true;
  }
  if (isDappBrowserEnabled(networkId.value) && (signType ? isDAppSupported(signType) : true)) {
    _mainMenuItemList.push({
      routeName: "PageDAppBrowser",
      label: createLabel("dappBrowser"),
      icon: markRaw(IconGlobe)
    });
    addDivider = true;
  }
  if (addDivider) {
    _mainMenuItemList.push({
      routeName: "",
      label: "",
      icon: null,
      isDivider: true
    });
  }
  addDivider = false;
  if (isGovernanceEnabled(networkId.value) && (signType ? isGovDelegSupported(signType) : true)) {
    _mainMenuItemList.push({
      routeName: "PageGovernance",
      label: createLabel("governance"),
      icon: markRaw(IconVoting)
    });
    addDivider = true;
  }
  if (isCatalystEnabled(networkId.value) && (signType ? isCatalystSupported(signType) : true)) {
    _mainMenuItemList.push({
      routeName: "PageCatalyst",
      label: createLabel("catalyst"),
      icon: markRaw(IconVote)
    });
    addDivider = true;
  }
  if (addDivider) {
    _mainMenuItemList.push({
      routeName: "",
      label: "",
      icon: null,
      isDivider: true
    });
  }
  _mainMenuItemList.push({
    routeName: "PageUtxoList",
    label: createLabel("utxoList"),
    icon: markRaw(IconNumberedList)
  });
  _mainMenuItemList.push({
    label: createLabel("qrScanner"),
    icon: markRaw(IconQR),
    onClick: () => {
      openModalScanQR();
    }
  });
  if (signType && signType === "multisig") {
    _mainMenuItemList.push({
      routeName: "PageMultiSig",
      label: createLabel("multisig"),
      icon: markRaw(IconMultiSig)
    });
  }
  _collapseMenuItem.value = {
    onClick: toggleDesktopMenuCollapsed,
    label: createLabel("collapse"),
    icon: null
  };
};
const useMainMenu = ($t) => {
  watch([appAccount, showMonsterSwapInNavi, showReportingInNavi], () => createMenu($t), { immediate: true });
  addSignalListener(onNetworkFeaturesUpdated, "useMainMenu", () => createMenu($t));
  addSignalListener(onBackendServerSet, "useMainMenu", () => createMenu($t));
  onUnmounted(() => {
    removeSignalListener(onNetworkFeaturesUpdated, "useMainMenu");
    removeSignalListener(onBackendServerSet, "useMainMenu");
  });
  return {
    mainMenuItemList: _mainMenuItemList,
    collapseMenuItem: _collapseMenuItem
  };
};

const _hoisted_1$2 = {
  key: 0,
  class: "absolute -bottom-2 -right-2 w-6 h-6 rounded-sm bg-bg-app p-0.5"
};
const _hoisted_2$1 = {
  key: 0,
  class: "w-full flex flex-row et-js-ic et-gap-sm"
};
const _hoisted_3$1 = { class: "h-full flex flex-col grow et-jc-is" };
const _hoisted_4$1 = {
  key: 0,
  class: "text-left break-all"
};
const _hoisted_5$1 = { key: 0 };
const _hoisted_6$1 = {
  key: 1,
  class: "text-left break-all"
};
const _hoisted_7 = { class: "w-full flex flex-wrap et-js-ic et-gap-x-sm" };
const _hoisted_8 = {
  key: 0,
  class: "p-card-footer-compact-border"
};
const _hoisted_9 = { class: "flex flex-row et-jb-ic py-1.5 px-4" };
const _hoisted_10 = { class: "et-text-xs" };
const _hoisted_11 = { class: "et-text-xs underline" };
const _hoisted_12 = {
  key: 1,
  class: "p-card-footer-compact"
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "WalletListItem",
  props: {
    walletId: { type: String, required: true },
    accountId: { type: String, required: false, default: "" },
    checkExcludedTypes: { type: Boolean, required: false, default: false },
    showDappIcon: { type: Boolean, required: false, default: false },
    showNumAccounts: { type: Boolean, required: false, default: false },
    showSyncState: { type: Boolean, required: false, default: true },
    showSelectedAccountInstead: { type: Boolean, required: false, default: false },
    hideFiatBalance: { type: Boolean, required: false, default: false },
    hideHighlight: { type: Boolean, required: false, default: false },
    isCollapsed: { type: Boolean, required: false, default: false },
    compact: { type: Boolean, required: false, default: false }
  },
  emits: ["selected"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const _walletId = computed(() => props.walletId);
    const _accountId = computed(() => props.accountId);
    const { modalExcludedTypes } = useModalSelectAccount();
    const {
      toggleFixedDappAccountId
    } = useDappAccount();
    const {
      appWallet,
      appAccount,
      walletSettings,
      accountSettings,
      accountData
    } = useWalletAccount(_walletId, _accountId);
    const { selectedWalletId } = useSelectedAccount();
    const accountName = accountSettings.nameShort;
    const walletName = walletSettings.name;
    const balanceTotal = computed(() => {
      if (!props.showSelectedAccountInstead) {
        return appWallet.value?.data.balance.total ?? "0";
      } else {
        return accountData.value?.balance.total ?? "0";
      }
    });
    const isWalletSyncing = walletSettings.isSyncing;
    const checkMarkColor = ref("text-txt-green");
    let _toid = -1;
    watch(isWalletSyncing, (value) => {
      if (value) {
        checkMarkColor.value = "text-txt-green";
      } else {
        checkMarkColor.value = "text-txt-green";
        clearTimeout(_toid);
        _toid = setTimeout(() => {
          checkMarkColor.value = "";
        }, 2e3);
      }
    });
    const signType = computed(() => appWallet.value?.data.wallet.signType);
    const isDappWallet = computed(() => appWallet.value?.isDappWallet ?? false);
    const isFixedAccount = computed(() => isDappWallet.value && fixedDappWalletId.value === _walletId.value);
    const numAccounts = computed(() => {
      if (!appWallet.value) {
        return 0;
      }
      return appWallet.value.data.wallet.accountList.reduce((cnt, acct) => {
        return isHDAccount(acct.path) ? cnt + 1 : cnt;
      }, 0) ?? 0;
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      return (__props.checkExcludedTypes ? signType.value && !unref(modalExcludedTypes).includes(signType.value) : true) ? (openBlock(), createBlock(_component_Card, {
        key: 0,
        class: "shadow-sm",
        pt: {
          root: unref(appWallet)?.id === unref(selectedWalletId) ? __props.hideHighlight ? "" : "border border-border-highlight" : "",
          body: "p-card-body-compact h-full",
          content: "grow"
        }
      }, createSlots({
        content: withCtx(() => [
          createVNode(_component_Button, {
            class: normalizeClass(["relative p-card-content-compact h-full flex flex-row et-js-ic et-gap-md border-0 border-b-1 border-bg-1", __props.compact ? "p-2 sm:p-3 " : "px-3 sm:px-3.5 pt-3.5 pb-3"]),
            "data-ui": __props.isCollapsed ? "compact" : "",
            severity: "secondary",
            text: ""
          }, {
            default: withCtx(() => [
              createVNode(_sfc_main$9, {
                class: normalizeClass(["shrink-0 aspect-square cursor-pointer", __props.compact ? "w-9" : __props.isCollapsed ? "w-10" : "w-10 sm:w-12"]),
                "icon-seed": unref(appWallet)?.data.settings.plate.image ?? void 0,
                "icon-data": unref(appWallet)?.data.settings.plate.data ?? void 0
              }, {
                default: withCtx(() => [
                  unref(appWallet) && !unref(appWallet).isMnemonic ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
                    unref(appWallet).isHardware ? (openBlock(), createBlock(_sfc_main$a, {
                      key: 0,
                      class: "w-full h-full",
                      "sign-type": unref(appWallet)?.data.wallet.signType
                    }, null, 8, ["sign-type"])) : unref(appWallet).isMultiSig ? (openBlock(), createBlock(MultiSigGradient, {
                      key: 1,
                      class: "w-full h-full"
                    })) : unref(appWallet).isReadOnly ? (openBlock(), createBlock(IconLockEnabled, {
                      key: 2,
                      class: "w-full h-full"
                    })) : unref(appWallet).isCLI ? (openBlock(), createBlock(IconComputerProgramming01, {
                      key: 3,
                      class: "w-full h-full"
                    })) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["class", "icon-seed", "icon-data"]),
              !__props.isCollapsed ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
                createBaseVNode("div", _hoisted_3$1, [
                  !__props.showSelectedAccountInstead ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
                    createTextVNode(toDisplayString(unref(walletName)) + " ", 1),
                    __props.showNumAccounts ? (openBlock(), createElementBlock("span", _hoisted_5$1, "(" + toDisplayString(numAccounts.value) + ")", 1)) : createCommentVNode("", true)
                  ])) : (openBlock(), createElementBlock("div", _hoisted_6$1, [
                    createTextVNode(toDisplayString(unref(walletName)) + " ", 1),
                    createBaseVNode("span", null, "(" + toDisplayString(unref(accountName)) + ")", 1)
                  ])),
                  createBaseVNode("div", _hoisted_7, [
                    createVNode(_sfc_main$b, {
                      class: "font-semibold",
                      amount: balanceTotal.value,
                      "clipboard-enabled": false
                    }, null, 8, ["amount"]),
                    !__props.hideFiatBalance ? (openBlock(), createBlock(_sfc_main$c, {
                      key: 0,
                      class: "mt-0.5",
                      amount: balanceTotal.value,
                      "clipboard-enabled": false,
                      prefix: "",
                      suffix: ""
                    }, null, 8, ["amount"])) : createCommentVNode("", true)
                  ])
                ])
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["class", "data-ui"])
        ]),
        _: 2
      }, [
        !__props.isCollapsed && __props.showSyncState ? {
          name: "footer",
          fn: withCtx(() => [
            isFixedAccount.value ? (openBlock(), createElementBlock("div", _hoisted_8, [
              createVNode(_component_Button, {
                class: "w-full bg-bg-info hover:bg-bg-info cursor-pointer",
                unstyled: "",
                onClick: _cache[0] || (_cache[0] = withModifiers(($event) => unref(toggleFixedDappAccountId)(__props.walletId, __props.accountId), ["stop", "prevent"]))
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_9, [
                    createBaseVNode("div", _hoisted_10, toDisplayString(_ctx.$t("common:button.forcedDappAccount")), 1),
                    createBaseVNode("div", _hoisted_11, toDisplayString(_ctx.$t("common:disable")), 1)
                  ])
                ]),
                _: 1
              })
            ])) : (openBlock(), createElementBlock("div", _hoisted_12, [
              createVNode(_sfc_main$d, {
                class: "",
                "wallet-id": __props.walletId,
                "account-id": "''",
                "use-wallet-sync-status": ""
              }, null, 8, ["wallet-id"])
            ]))
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["pt"])) : createCommentVNode("", true);
    };
  }
});

const _tweenUp = ref(false);
const _show = ref(false);
const { hasWallets } = useAppWalletIdList();
const openModalAddWallet = (tweenUp) => {
  _tweenUp.value = tweenUp ?? false;
  _show.value = true;
  setTimeout(() => {
    _tweenUp.value = false;
  }, 75);
};
const closeModalAddWallet = (tweenUp, force) => {
  if (tweenUp) {
    _tweenUp.value = tweenUp ?? false;
    setTimeout(() => {
      _tweenUp.value = false;
      _show.value = false;
    }, 75);
  } else {
    _tweenUp.value = false;
    if (hasWallets.value || force) {
      _show.value = false;
    }
  }
};
const useModalAddWallet = () => {
  return {
    showModalAddWallet: _show,
    tweenUpModalAddWallet: _tweenUp,
    openModalAddWallet,
    closeModalAddWallet
  };
};

const _sfc_main$2 = {  };

const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$1, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M5.32171 9.6829C7.73539 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z",
      stroke: "currentColor",
      "stroke-width": "1.5"
    }, null, -1),
    createBaseVNode("path", {
      d: "M12.2422 17V13C12.2422 12.5286 12.2422 12.2929 12.0957 12.1464C11.9493 12 11.7136 12 11.2422 12",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M11.992 8.99997H12.001",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconWarning = /*#__PURE__*/_export_sfc(_sfc_main$2, [['render',_sfc_render]]);

const _component = ref();
const _componentProps = ref();
const openBottomBar = (component, componentProps) => {
  _component.value = component;
  _componentProps.value = componentProps ?? {};
};
const closeBottomBar = () => {
  _component.value = null;
  _componentProps.value = {};
};
const useBottomBar = () => {
  return {
    bottomBarComponent: _component,
    bottomBarComponentProps: _componentProps,
    isBottomBarOpen: computed(() => !!_component.value),
    openBottomBar,
    closeBottomBar
  };
};

const _hoisted_1 = {
  key: 0,
  class: "absolute -bottom-2 -right-2 w-6 h-6 rounded-sm bg-bg-app p-0.5"
};
const _hoisted_2 = {
  key: 0,
  class: "w-full flex flex-row et-js-ic et-gap-sm"
};
const _hoisted_3 = { class: "h-full flex flex-col grow et-jc-is" };
const _hoisted_4 = { class: "text-left break-all" };
const _hoisted_5 = { class: "p-card-footer-compact px-3 py-1.5 flex et-js-ic et-gap-sm" };
const _hoisted_6 = { class: "" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AccountSignItemCard",
  props: {
    walletId: { type: String, required: true },
    accountId: { type: String, required: true },
    disabled: { type: Boolean, required: false, default: false },
    isSigned: { type: Boolean, required: false, default: false },
    isActive: { type: Boolean, required: false, default: false },
    isConnecting: { type: Boolean, required: false, default: false },
    isCollapsed: { type: Boolean, required: false, default: false },
    compact: { type: Boolean, required: false, default: false },
    hideHighlight: { type: Boolean, required: false, default: false },
    hideSignState: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const _walletId = computed(() => props.walletId);
    const _accountId = computed(() => props.accountId);
    const {
      walletSettings,
      accountSettings,
      appWallet,
      appAccount
    } = useWalletAccount(_walletId, _accountId);
    const walletName = walletSettings.name;
    const accountName = accountSettings.nameShort;
    const signState = computed(() => {
      if (props.isConnecting) {
        return {
          label: $t("sign-tx:account.status.connecting"),
          color: "bg-yellow"
        };
      }
      if (props.isSigned) {
        return {
          label: $t("sign-tx:account.status.signed"),
          color: "bg-green"
        };
      } else {
        if (props.isActive) {
          return {
            label: $t("sign-tx:account.status.unsignedActive"),
            color: "bg-yellow"
          };
        } else {
          return {
            label: $t("sign-tx:account.status.unsigned"),
            color: "bg-red"
          };
        }
      }
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      return unref(appAccount) ? (openBlock(), createBlock(_component_Card, {
        key: 0,
        class: normalizeClass(__props.isActive ? __props.hideHighlight ? "" : "border border-border-highlight" : ""),
        pt: {
          body: "p-card-body-compact h-full",
          content: "grow"
        }
      }, createSlots({
        content: withCtx(() => [
          createVNode(_component_Button, {
            class: normalizeClass(["relative p-card-content-compact h-full flex flex-row et-jc-ic et-gap-md border-0 border-b-1 border-bg-1", (__props.compact ? "p-2 sm:p-3 " : "p-3 sm:p-3.5 ") + (__props.isCollapsed ? "et-js-ic p-3!" : "et-js-ic")]),
            "data-ui": __props.isCollapsed ? "compact" : "",
            disabled: __props.disabled,
            severity: "secondary",
            text: ""
          }, {
            default: withCtx(() => [
              createVNode(_sfc_main$9, {
                class: normalizeClass(["shrink-0 aspect-square cursor-pointer", __props.compact ? "w-9" : __props.isCollapsed ? "w-10" : "w-10 sm:w-12"]),
                "icon-seed": unref(appWallet)?.data.settings.plate.image ?? void 0,
                "icon-data": unref(appWallet)?.data.settings.plate.data ?? void 0
              }, {
                default: withCtx(() => [
                  unref(appWallet) && !unref(appWallet).isMnemonic ? (openBlock(), createElementBlock("div", _hoisted_1, [
                    unref(appWallet).isHardware ? (openBlock(), createBlock(_sfc_main$a, {
                      key: 0,
                      class: "w-full h-full",
                      "sign-type": unref(appWallet)?.data.wallet.signType
                    }, null, 8, ["sign-type"])) : unref(appWallet).isMultiSig ? (openBlock(), createBlock(MultiSigGradient, {
                      key: 1,
                      class: "w-full h-full"
                    })) : unref(appWallet).isReadOnly ? (openBlock(), createBlock(IconLockEnabled, {
                      key: 2,
                      class: "w-full h-full"
                    })) : unref(appWallet).isCLI ? (openBlock(), createBlock(IconComputerProgramming01, {
                      key: 3,
                      class: "w-full h-full"
                    })) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["class", "icon-seed", "icon-data"]),
              !__props.isCollapsed ? (openBlock(), createElementBlock("div", _hoisted_2, [
                createBaseVNode("div", _hoisted_3, [
                  createBaseVNode("div", _hoisted_4, [
                    createTextVNode(toDisplayString(unref(walletName)) + " ", 1),
                    createBaseVNode("span", null, "(" + toDisplayString(unref(accountName)) + ")", 1)
                  ])
                ])
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["class", "data-ui", "disabled"])
        ]),
        _: 2
      }, [
        !__props.hideSignState ? {
          name: "footer",
          fn: withCtx(() => [
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("div", {
                class: normalizeClass(["h-3.5 w-3.5 rounded-full", signState.value.color])
              }, null, 2),
              createBaseVNode("div", _hoisted_6, toDisplayString(signState.value.label), 1)
            ])
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["class"])) : createCommentVNode("", true);
    };
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccountSignItem",
  props: {
    walletId: { type: String, required: true },
    accountId: { type: String, required: true },
    disabled: { type: Boolean, required: false, default: false },
    isSigned: { type: Boolean, required: false, default: false },
    isActive: { type: Boolean, required: false, default: false },
    isConnecting: { type: Boolean, required: false, default: false },
    hideSignState: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return __props.accountId ? (openBlock(), createBlock(_sfc_main$1, {
        key: 0,
        class: "w-full",
        walletId: __props.walletId,
        accountId: __props.accountId,
        disabled: __props.disabled,
        isSigned: __props.isSigned,
        isActive: __props.isActive,
        isConnecting: __props.isConnecting,
        hideSignState: __props.hideSignState
      }, null, 8, ["walletId", "accountId", "disabled", "isSigned", "isActive", "isConnecting", "hideSignState"])) : createCommentVNode("", true);
    };
  }
});

export { HomeOutline as H, IconWarning as I, _sfc_main$3 as _, useModalAddWallet as a, useWalletListMenu as b, useBottomBar as c, _sfc_main as d, useModalSettings as e, useBottomVersionInfo as f, IconSend as g, _sfc_main$1 as h, showReportingInNavi as s, useMainMenu as u };
