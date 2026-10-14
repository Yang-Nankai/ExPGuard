import { e as ref, D as computed, ad as dispatchSignalSync, m as createElementBlock, o as openBlock, p as createBaseVNode } from './index.js';
import { c1 as getIAppWallet, aA as isHDAccount, aY as purpose } from './app2.js';
import { N as onUIAccountSelected } from './epochParams.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';

const _setUiSelectedWalletId = (_walletId, walletId) => {
  if (_walletId.value !== walletId) {
    _walletId.value = walletId;
  }
};
const _setUiSelectedAccountId = (_accountId, accountId) => {
  if (_accountId.value !== accountId) {
    _accountId.value = accountId;
  }
};
const useUiSelectedAccount = () => {
  const _walletId = ref("");
  const _accountId = ref("");
  const uiSelectedWalletId = computed(() => _walletId.value);
  const uiSelectedAccountId = computed(() => _accountId.value);
  const setUiSelectedWalletId = (walletId, preselectAccount = true) => {
    let changed = false;
    const appWallet = getIAppWallet(walletId);
    if (!appWallet) {
      changed = uiSelectedWalletId.value !== walletId;
      _setUiSelectedWalletId(_walletId, "");
      _setUiSelectedAccountId(_accountId, "");
      return changed;
    }
    if (uiSelectedWalletId.value !== walletId) {
      _setUiSelectedWalletId(_walletId, walletId);
      changed = true;
      if (preselectAccount && !appWallet.data.wallet.accountList.some((account) => account.id === uiSelectedAccountId.value)) {
        setUiWalletAccountId(appWallet);
      }
    }
    return changed;
  };
  const setUiWalletAccountId = (appWallet) => {
    let accountId = "";
    if (appWallet.data.wallet.accountList.length > 0) {
      const accountList = appWallet.data.wallet.accountList.sort((a, b) => {
        if (a.path[0] === purpose.hdwallet && b.path[0] !== purpose.hdwallet) return -1;
        if (a.path[0] !== purpose.hdwallet && b.path[0] === purpose.hdwallet) return 1;
        return a.path[2] - b.path[2];
      });
      const account = accountList[0];
      if (isHDAccount(account.path)) {
        accountId = accountList[0].id;
      }
    }
    if (uiSelectedAccountId.value !== accountId) {
      _setUiSelectedAccountId(_accountId, accountId);
    }
    return accountId;
  };
  const setUiSelectedAccountId = (accountId, preselectWalletAccount = true) => {
    let changed = false;
    const appWallet = getIAppWallet(uiSelectedWalletId.value);
    if (!appWallet) {
      if (uiSelectedWalletId.value !== "" || uiSelectedAccountId.value !== "") {
        _setUiSelectedWalletId(_walletId, "");
        _setUiSelectedAccountId(_accountId, "");
        changed = true;
      }
      return changed;
    }
    if (preselectWalletAccount && !appWallet.data.wallet.accountList.some((account2) => account2.id === accountId)) {
      setUiWalletAccountId(appWallet);
      return changed;
    }
    const account = appWallet.data.wallet.accountList.find((account2) => account2.id === accountId);
    if (!account || !isHDAccount(account.path)) ; else if (uiSelectedAccountId.value !== accountId) {
      _setUiSelectedAccountId(_accountId, accountId);
      changed = true;
    }
    return changed;
  };
  return {
    uiSelectedWalletId,
    uiSelectedAccountId,
    setUiSelectedWalletId,
    setUiSelectedAccountId
  };
};

const {
  uiSelectedWalletId,
  uiSelectedAccountId,
  setUiSelectedWalletId,
  setUiSelectedAccountId
} = useUiSelectedAccount();
const _callerId = ref("");
const _isModalSelectAccountOpen = ref(false);
const _isModalSelectAccountListOpen = ref(false);
const _isModalSelectWalletOnly = ref(false);
const _canAddWallet = ref(true);
const _editAccounts = ref(false);
const _autoAddAccount = ref(false);
const _modalMode = ref("select");
const _excludedTypes = ref([]);
const useModalSelectAccount = () => {
  const setModalSelectAccountOpen = (open, mode = "select", callerId = "", canAddWallet = true, isSelectWalletOnly = false, excludedTypes = []) => {
    if (open) {
      _callerId.value = callerId;
      _modalMode.value = mode;
      _canAddWallet.value = canAddWallet;
      _isModalSelectWalletOnly.value = isSelectWalletOnly;
      _excludedTypes.value = excludedTypes;
      _editAccounts.value = false;
      _autoAddAccount.value = false;
      if (callerId.startsWith("ButtonOpenAddAccount")) {
        const walletId = callerId.split("_")[1];
        callerId = "ButtonOpenAddAccount";
        _callerId.value = callerId;
        _editAccounts.value = true;
        _autoAddAccount.value = true;
        setUiSelectedWalletId(walletId, false);
      } else {
        setUiSelectedWalletId("", false);
      }
      setUiSelectedAccountId("", false);
    } else {
      dispatchSignalSync(onUIAccountSelected, _callerId.value, uiSelectedWalletId.value, uiSelectedAccountId.value);
    }
    _isModalSelectAccountOpen.value = open && mode !== "list";
    _isModalSelectAccountListOpen.value = open && mode === "list";
  };
  const modalCallerId = computed(() => _callerId.value);
  const isModalSelectAccountOpen = computed(() => _isModalSelectAccountOpen.value);
  const isModalSelectAccountListOpen = computed(() => _isModalSelectAccountListOpen.value);
  const modalSelectAccountMode = computed(() => _modalMode.value);
  const modalCanAddWallet = computed(() => _canAddWallet.value);
  const modalIsSelectWalletOnly = computed(() => _isModalSelectWalletOnly.value);
  const modalExcludedTypes = computed(() => _excludedTypes.value);
  return {
    modalCallerId,
    editAccounts: _editAccounts,
    autoAddAccount: _autoAddAccount,
    isModalSelectAccountOpen,
    isModalSelectAccountListOpen,
    modalSelectAccountMode,
    modalCanAddWallet,
    modalIsSelectWalletOnly,
    modalExcludedTypes,
    setModalSelectAccountOpen,
    uiSelectedWalletId,
    uiSelectedAccountId,
    setUiSelectedWalletId,
    setUiSelectedAccountId
  };
};

const _sfc_main = {  };

const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  fill: "none"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M12 4V20M20 12H4",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconPlusSign = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { IconPlusSign as I, useModalSelectAccount as u };
