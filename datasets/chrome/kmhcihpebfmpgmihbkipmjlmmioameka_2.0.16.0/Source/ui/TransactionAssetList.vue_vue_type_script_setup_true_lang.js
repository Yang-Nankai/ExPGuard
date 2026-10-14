import { aA as isHDAccount, bJ as doForceSyncAccount, h as calcAccountTxBalance, Y as createITxBalance } from './app2.js';
import { a as parseTxShowRequest } from './parse.js';
import { D as computed, az as dispatchSignalSyncTo, bI as DEFAULT_ACCOUNT_ID, G as watch, f as onMounted, aE as addSignalListener, cJ as doOpenTxViewer, k as onUnmounted, aF as removeSignalListener, O as useModalTransactionViewerLight, e as ref, P as networkId, d as defineComponent, m as createElementBlock, o as openBlock, V as normalizeClass, w as useTranslation, t as createCommentVNode, B as toDisplayString, n as createVNode, p as createBaseVNode, u as unref, z as resolveComponent, F as Fragment, y as withCtx, c as createBlock, U as withModifiers, S as renderList } from './index.js';
import { n as useAppWallet, u as useWalletSettings, k as useAppAccount, j as useAppAccountBalances, i as useAccountSettings, p as getAssetCDNImage, o as MediaSize, r as getSortedAssetDetailsList } from './useAppAccountBalances.js';
import { f as getRequestData, A as ApiRequestType, E as ErrorSync, u as useSelectedAccount } from './epochParams.js';
import { n as neg, f as isGreaterThanZero } from './bigmath.js';
import { u as useModalAssetDetails } from './useModalAssetDetails.js';
import { n as noLogo, c as cardanoLogo } from './image.js';
import { u as useGuard } from './useGuards.js';
import { I as IconAlert02 } from './IconAlert02.js';
import { _ as _sfc_main$5 } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import { I as IconCancel01 } from './IconCancel01.js';

function useWalletAccount(walletId, accountId) {
  const appWallet = useAppWallet(walletId);
  const walletSettings = useWalletSettings(appWallet);
  const walletData = walletSettings.data;
  const walletAccountId = walletSettings.walletAccountId;
  const _accountId = computed(() => !!accountId.value ? accountId.value : walletAccountId.value);
  const appAccount = useAppAccount(appWallet, _accountId);
  const appAccountBalances = useAppAccountBalances(appAccount);
  const accountSettings = useAccountSettings(appAccount);
  const accountData = accountSettings.data;
  const utxoMap = accountSettings.utxoMap;
  const accountList = computed(() => {
    if (!walletData.value) {
      return [];
    }
    return walletData.value.wallet.accountList.filter((account) => isHDAccount(account.path)).sort((a, b) => a.path[2] - b.path[2]);
  });
  const hasAccount = computed(() => accountList.value.length > 0);
  const forceSyncAccount = () => {
    if (appAccount.value) {
      dispatchSignalSyncTo(appAccount.value.id, doForceSyncAccount);
    }
  };
  return {
    walletId,
    accountId,
    appWallet,
    appAccount,
    walletData,
    walletSettings,
    accountData,
    accountList,
    hasAccount,
    accountSettings,
    accountBalances: appAccountBalances,
    utxoMap,
    forceSyncAccount
  };
}

const loadTxCbor = async (networkId, accountId, txHash) => {
  if (!txHash) {
    return null;
  }
  return loadTxCborList(networkId, accountId, [txHash]);
};
const loadTxCborList = async (networkId, accountId, txHashList) => {
  if (!accountId) {
    accountId = DEFAULT_ACCOUNT_ID;
  }
  return getRequestData()(
    networkId,
    accountId,
    ApiRequestType.syncTxCbor,
    ErrorSync.loadTxCborList,
    {
      id: accountId,
      txHashList
    },
    async (data) => {
      if (!data.txCborList) {
        throw "missingTxCborList";
      }
      return data.txCborList;
    }
  );
};
const loadTxByron = async (networkId, accountId, txHash) => {
  if (!txHash) {
    return null;
  }
  return loadTxByronList(networkId, accountId, [txHash]);
};
const loadTxByronList = async (networkId, accountId, txHashList) => {
  if (txHashList.length === 0) {
    return [];
  }
  if (!accountId) {
    accountId = DEFAULT_ACCOUNT_ID;
  }
  return getRequestData()(
    networkId,
    accountId,
    ApiRequestType.syncTxByron,
    ErrorSync.loadTxByronList,
    {
      id: accountId,
      txHashList
    },
    async (data) => {
      return data.txByronList ?? [];
    }
  );
};

const {
  showModalTransactionViewer,
  isWider,
  isTweeningOut,
  suppressOpenModal,
  doToggleWidth
} = useModalTransactionViewerLight();
const _txViewerHistory = ref([]);
const _walletId = ref(null);
const _accountId = ref(null);
const _txBalance = ref(null);
const _localTx = ref(null);
const _isStagingTx = ref(false);
let _tweenOutTrigger;
const tweenOutModalTransactionViewer = () => {
  if (_tweenOutTrigger) {
    isTweeningOut.value = true;
    _tweenOutTrigger();
  }
};
const useModalTransactionViewer = (walletId, accountId, tweenOutTrigger, addOpenTxListeners = false) => {
  const {
    selectedAccountId,
    selectedWalletId
  } = useSelectedAccount();
  let _isOpener = false;
  const openModalTransactionViewer = (txBalance, localTx, isStagingTx) => {
    _isOpener = true;
    _walletId.value = walletId.value ?? selectedWalletId.value;
    _accountId.value = accountId.value ?? selectedAccountId.value;
    _txBalance.value = txBalance;
    _localTx.value = localTx ?? null;
    _isStagingTx.value = isStagingTx ?? false;
    showModalTransactionViewer.value = !suppressOpenModal.value;
    isTweeningOut.value = false;
  };
  const closeModalTransactionViewer = () => {
    _isOpener = false;
    showModalTransactionViewer.value = false;
    _txBalance.value = null;
    _localTx.value = null;
    _walletId.value = null;
    _accountId.value = null;
    _isStagingTx.value = false;
    isTweeningOut.value = true;
    _txViewerHistory.value.length = 0;
  };
  watch([walletId, accountId, selectedWalletId, selectedAccountId], () => {
    if (_isOpener && (showModalTransactionViewer.value || suppressOpenModal.value) && walletId.value && accountId.value) {
      _walletId.value = walletId.value;
      _accountId.value = accountId.value;
    }
  });
  let _walletAccount;
  const _doOpenTxViewer = async (txHash, isPreviousTransaction = false) => {
    if (!txHash) {
      return;
    }
    if (!isPreviousTransaction && (showModalTransactionViewer.value || suppressOpenModal.value) && _txBalance.value?.hash && _txBalance.value?.hash !== txHash) {
      _txViewerHistory.value.push(_txBalance.value?.hash);
    }
    const txCborList = await loadTxCbor(networkId.value, _accountId.value, txHash);
    if (txCborList && txCborList.length > 0) {
      const txCbor = txCborList[0];
      if (!_walletAccount) {
        _walletAccount = useWalletAccount(_walletId, _accountId);
      }
      const _appAccount = _walletAccount?.appAccount.value;
      const res = await parseTxShowRequest(txCbor.cbor, _appAccount);
      if (_appAccount && res.builtTx) {
        const txBalance = await calcAccountTxBalance(_appAccount, res.builtTx);
        txBalance.slot = txCbor.slot;
        txBalance.block = txCbor.block;
        openModalTransactionViewer(
          txBalance,
          res.builtTx
        );
      } else {
        openModalTransactionViewer(
          createITxBalance({ hash: txHash, slot: -1, idx: -1 }),
          void 0
        );
      }
    }
  };
  const showPreviousTx = () => {
    const txHash = _txViewerHistory.value.pop();
    if (txHash) {
      _doOpenTxViewer(txHash, true);
    }
  };
  const doTxHashSearch = (txHash, addToHistory = true) => {
    if (txHash) {
      _doOpenTxViewer(txHash, !addToHistory);
    }
  };
  if (tweenOutTrigger) {
    _tweenOutTrigger = tweenOutTrigger;
  }
  if (addOpenTxListeners) {
    const storeId = "useModalTransactionViewer";
    _walletAccount = useWalletAccount(_walletId, _accountId);
    const appAccount = _walletAccount.appAccount;
    onMounted(() => {
      addSignalListener(doOpenTxViewer, storeId, _doOpenTxViewer);
      watch(appAccount, (value, oldValue) => {
        if ((showModalTransactionViewer.value || suppressOpenModal.value) && value !== oldValue) {
          _doOpenTxViewer(_txBalance.value?.hash, false);
        }
      });
    });
    onUnmounted(() => {
      removeSignalListener(doOpenTxViewer, storeId);
    });
  }
  return {
    showModalTransactionViewer,
    isWider,
    isTweeningOut,
    openModalTransactionViewer,
    closeModalTransactionViewer,
    tweenOutModalTransactionViewer,
    txBalance: _txBalance,
    localTx: _localTx,
    walletId: _walletId,
    accountId: _accountId,
    txViewerHistory: _txViewerHistory,
    isStagingTx: _isStagingTx,
    doToggleWidth,
    doTxHashSearch,
    showPreviousTx
  };
};

const _hoisted_1$3 = ["src"];
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "TransactionAssetImage",
  props: {
    assetDetails: { type: Object, required: true },
    isNFT: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const { isSpamAsset } = useGuard();
    const isScam = computed(() => isSpamAsset(props.assetDetails));
    const imgSrc = ref(noLogo);
    const setImageSrc = async (force = false) => {
      const assetDetails = props.assetDetails;
      if (!assetDetails) {
        imgSrc.value = cardanoLogo;
        return;
      }
      const isAda = assetDetails.p.length === 0 || assetDetails.p === ".";
      if (isAda) {
        imgSrc.value = cardanoLogo;
        return;
      }
      if (networkId.value === "guild" || networkId.value === "sancho") {
        imgSrc.value = noLogo;
        return;
      }
      imgSrc.value = await getAssetCDNImage(assetDetails.f, MediaSize.LOW) ?? noLogo;
    };
    watch(() => props.assetDetails, () => setImageSrc(), { immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("img", {
        class: normalizeClass(["asset-image h-full object-cover", isScam.value ? "grayscale" : ""]),
        src: imgSrc.value,
        alt: "Image of token"
      }, null, 10, _hoisted_1$3);
    };
  }
});

const _hoisted_1$2 = {
  key: 1,
  class: "relative w-full max-w-[25%] py-1 h-full flex et-jc-ic pointer-events-auto"
};
const _hoisted_2$1 = { class: "ml-2 max-w-full truncate" };
const _hoisted_3 = {
  key: 2,
  class: "w-px h-6 bg-gray opacity-5"
};
const _hoisted_4 = {
  key: 3,
  class: "h-full"
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TransactionAssetName",
  props: {
    assetDetails: { type: Object, required: true },
    isNFT: { type: Boolean, required: false, default: false },
    compact: { type: Boolean, required: false, default: false },
    isNeutral: { type: Boolean, required: false, default: false },
    hideColors: { type: Boolean, required: false, default: false },
    withSign: { type: Boolean, required: false, default: true },
    isInput: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const _amount = computed(() => props.assetDetails.t.q ?? "0");
    const amount = computed(() => props.isInput ? neg(_amount.value) : _amount.value);
    const hasAssetInfo = computed(() => !!props.assetDetails.ai);
    const decimals = computed(() => props.assetDetails.ai?.tr?.d ?? 0);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["asset-amount-name relative max-w-[85%] h-full et-gap-xs sm:et-gap-sm", __props.compact ? "et-text-sm" : ""])
      }, [
        !!__props.assetDetails.n ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["w-full truncate", !__props.assetDetails.n && !hasAssetInfo.value ? "max-w-[75%] " : "max-w-[100%] "])
        }, toDisplayString(__props.assetDetails.n), 3)) : createCommentVNode("", true),
        !__props.assetDetails.n && !hasAssetInfo.value ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
          createVNode(IconAlert02, { class: "h-full aspect-square" }),
          createBaseVNode("span", _hoisted_2$1, toDisplayString(unref($t)("common:metadata.missing")), 1)
        ])) : createCommentVNode("", true),
        !__props.isNFT ? (openBlock(), createElementBlock("div", _hoisted_3)) : createCommentVNode("", true),
        !__props.isNFT ? (openBlock(), createElementBlock("div", _hoisted_4, [
          createVNode(_sfc_main$5, {
            cssText: "h-full et-jc-ic",
            cssSign: "-mt-px mr-0.5",
            "css-text-positive": "et-text-gradient-positive",
            "css-text-negative": "et-text-gradient-negative",
            "css-text-neutral": "",
            amount: amount.value,
            decimals: decimals.value,
            "display-decimals": decimals.value,
            currency: "",
            isNeutral: __props.isNeutral,
            colored: !__props.isNeutral,
            "with-sign": __props.withSign,
            "trim-fraction": "",
            "hide-fraction-if-zero": ""
          }, null, 8, ["amount", "decimals", "display-decimals", "isNeutral", "colored", "with-sign"])
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
});

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TransactionAssetScam",
  props: {
    assetDetails: { type: Object, required: true },
    compact: { type: Boolean, required: false, default: false },
    roundedFull: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const { isSpamAsset } = useGuard();
    const isScam = computed(() => isSpamAsset(props.assetDetails));
    return (_ctx, _cache) => {
      return isScam.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["absolute left-0 right-0 top-0 bottom-0 flex flex-col et-jc-is px-2 bg-black/80", __props.roundedFull ? "rounded-full" : "rounded-sm"])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["w-full text-txt-negative flex flex-row et-jc-ic", __props.compact ? "" : ""])
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["w-24 flex flex-row et-jc-ic bg-bg-negative border border-border-negative et-text-sm font-semibold rounded-full", __props.compact ? "h-4 sm:h-5" : "h-5 sm:h-6"])
          }, toDisplayString(unref($t)("scam:token.label")), 3)
        ], 2)
      ], 2)) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$1 = { class: "shrink-0 aspect-square rounded-full overflow-hidden" };
const _hoisted_2 = { class: "w-24 sm:w-32 flex flex-col rounded overflow-hidden" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TransactionAsset",
  props: {
    assetDetails: { type: Object, required: true },
    rightAlign: { type: Boolean, required: false, default: false },
    truncate: { type: Boolean, required: false, default: false },
    showDescription: { type: Boolean, required: false, default: false },
    hideColors: { type: Boolean, required: false, default: false },
    compact: { type: Boolean, required: false, default: false },
    isNeutral: { type: Boolean, required: false, default: false },
    isNFT: { type: Boolean, required: false, default: false },
    withSign: { type: Boolean, required: false, default: true },
    isInput: { type: Boolean, required: false, default: false },
    removable: { type: Boolean, required: false, default: false }
  },
  emits: ["remove"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const {
      openModalAssetDetails
    } = useModalAssetDetails();
    const assetDetails = computed(() => props.assetDetails);
    const _isPositiveSum = computed(() => isGreaterThanZero(assetDetails.value.t.q));
    const isPositiveSum = computed(() => props.isInput ? !_isPositiveSum.value : _isPositiveSum.value);
    const op = ref();
    const showPopover = (event) => {
      op.value?.show(event);
    };
    const hidePopover = (event) => {
      op.value?.hide(event);
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Popover = resolveComponent("Popover");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_Button, {
          class: normalizeClass([
            "asset relative max-w-full p-0 flex flex-row et-js-ic overflow-visible! border-0 shadow-sm",
            (__props.removable ? "pr-0" : "pr-4") + " " + (__props.compact ? "et-text-sm" : "") + " " + (__props.isNFT ? "rounded-lg! rounded-r-full!" : "rounded-full!") + " " + (isPositiveSum.value && !__props.hideColors && !__props.isNeutral ? "bg-bg-positive/90 outline-bg-positive" : "") + " " + (!isPositiveSum.value && !__props.hideColors && !__props.isNeutral ? "bg-bg-negative/90" : "") + " " + (__props.isNeutral ? "bg-bg-neutral/100" : "") + " " + (__props.hideColors ? "" : "")
          ]),
          text: "",
          onMouseenter: withModifiers(showPopover, ["prevent", "stop"]),
          onMouseleave: withModifiers(hidePopover, ["prevent", "stop"]),
          onClick: _cache[1] || (_cache[1] = withModifiers(($event) => {
            hidePopover($event);
            unref(openModalAssetDetails)(assetDetails.value);
          }, ["stop", "prevent"]))
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1$1, [
              createVNode(_sfc_main$4, {
                class: normalizeClass(["aspect-square", __props.compact ? "w-7" : "w-8"]),
                "asset-details": assetDetails.value,
                isNFT: __props.isNFT
              }, null, 8, ["class", "asset-details", "isNFT"])
            ]),
            createVNode(_sfc_main$3, {
              class: normalizeClass([
                "grow inline-flex et-jc-ic et-gap-sm font-medium",
                (__props.compact ? "et-text-xs" : "") + " " + (isPositiveSum.value && !__props.hideColors && !__props.isNeutral ? "et-text-gradient-positive" : "") + " " + (!isPositiveSum.value && !__props.hideColors && !__props.isNeutral ? "et-text-gradient-negative" : "") + " " + (__props.isNeutral ? "text-white" : "")
              ]),
              "asset-details": assetDetails.value,
              isNFT: __props.isNFT,
              compact: __props.compact,
              "is-neutral": __props.isNeutral,
              hideColors: __props.hideColors,
              "with-sign": __props.withSign,
              "is-input": __props.isInput
            }, null, 8, ["class", "asset-details", "isNFT", "compact", "is-neutral", "hideColors", "with-sign", "is-input"]),
            createVNode(_sfc_main$2, {
              "asset-details": assetDetails.value,
              compact: __props.compact,
              "rounded-full": ""
            }, null, 8, ["asset-details", "compact"]),
            __props.removable ? (openBlock(), createBlock(_component_Button, {
              key: 0,
              severity: "secondary",
              class: "p-0 ml-1 mr-1.5 size-5 min-sm:size-5 rounded-full!",
              rounded: "",
              onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.$emit("remove"), ["stop", "prevent"]))
            }, {
              default: withCtx(() => [
                createVNode(IconCancel01, { class: "w-3 sm:w-4" })
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["class"]),
        createVNode(_component_Popover, {
          ref_key: "op",
          ref: op,
          "pt:content:class": "p-0"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_2, [
              createVNode(_sfc_main$4, {
                class: "p-2",
                "asset-details": assetDetails.value,
                isNFT: __props.isNFT
              }, null, 8, ["asset-details", "isNFT"]),
              createVNode(_sfc_main$2, {
                "asset-details": assetDetails.value,
                compact: __props.compact
              }, null, 8, ["asset-details", "compact"]),
              createBaseVNode("div", {
                class: normalizeClass(["h-2", __props.isNFT ? "bg-blue" : "bg-green"])
              }, null, 2)
            ])
          ]),
          _: 1
        }, 512)
      ], 64);
    };
  }
});

const _hoisted_1 = {
  key: 1,
  class: "et-card-bg-2"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TransactionAssetList",
  props: {
    multiAsset: { type: Object, required: true },
    amountToShow: { type: Number, required: false, default: 2 },
    hideColors: { type: Boolean, required: false, default: false },
    compact: { type: Boolean, required: false, default: false },
    isNeutral: { type: Boolean, required: false, default: false },
    removable: { type: Boolean, required: false, default: false },
    isInput: { type: Boolean, required: false, default: false },
    withSign: { type: Boolean, required: false, default: true }
  },
  emits: ["assetUpdate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const _sortedAssetDetailsList = ref([]);
    const showAll = ref(false);
    const isLoading = ref(false);
    const multiAsset = computed(() => props.multiAsset);
    const assetDetailsListPage = computed(() => {
      return _sortedAssetDetailsList.value.slice(0, showAll.value ? _sortedAssetDetailsList.value?.length : props.amountToShow);
    });
    const loadAssetList = async () => {
      isLoading.value = true;
      _sortedAssetDetailsList.value = await getSortedAssetDetailsList(multiAsset.value);
      isLoading.value = false;
    };
    const onRemove = (assetDetails) => {
      onAssetUpdate("delete", [assetDetails]);
    };
    const onAssetUpdate = (type, assetList) => {
      emit("assetUpdate", type, assetList);
    };
    watch(multiAsset, () => {
      loadAssetList();
    }, { immediate: true, deep: true });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock(Fragment, null, [
        !isLoading.value && assetDetailsListPage.value.length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(assetDetailsListPage.value, (assetDetails) => {
            return openBlock(), createBlock(_sfc_main$1, {
              "asset-details": assetDetails,
              compact: __props.compact,
              "is-neutral": __props.isNeutral,
              "hide-colors": __props.hideColors,
              "with-sign": __props.withSign,
              "is-input": __props.isInput,
              removable: __props.removable,
              onRemove: ($event) => onRemove(assetDetails)
            }, null, 8, ["asset-details", "compact", "is-neutral", "hide-colors", "with-sign", "is-input", "removable", "onRemove"]);
          }), 256)),
          _sortedAssetDetailsList.value.length - assetDetailsListPage.value.length > 0 && _sortedAssetDetailsList.value.length > assetDetailsListPage.value.length ? (openBlock(), createBlock(_component_Button, {
            key: 0,
            class: normalizeClass(["et-text-xs whitespace-nowrap shadow-sm", __props.compact ? "px-3 py-1.25" : "px-4 py-2"]),
            severity: "secondary",
            label: "+" + (_sortedAssetDetailsList.value.length - __props.amountToShow) + " " + _ctx.$t("common:more"),
            rounded: "",
            outlined: "",
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => showAll.value = true, ["stop", "prevent"]))
          }, null, 8, ["class", "label"])) : showAll.value && _sortedAssetDetailsList.value.length > 0 ? (openBlock(), createBlock(_component_Button, {
            key: 1,
            class: normalizeClass(["et-text-xs whitespace-nowrap shadow-sm", __props.compact ? "py-1.25" : "py-2"]),
            severity: "secondary",
            label: _ctx.$t("common:button.hideAssets"),
            rounded: "",
            outlined: "",
            onClick: _cache[1] || (_cache[1] = withModifiers(($event) => showAll.value = false, ["stop", "prevent"]))
          }, null, 8, ["class", "label"])) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true),
        isLoading.value ? (openBlock(), createElementBlock("div", _hoisted_1, toDisplayString(_ctx.$t("common:loading")) + "... ", 1)) : createCommentVNode("", true)
      ], 64);
    };
  }
});

export { _sfc_main as _, useWalletAccount as a, _sfc_main$1 as b, loadTxByron as c, loadTxCbor as l, useModalTransactionViewer as u };
