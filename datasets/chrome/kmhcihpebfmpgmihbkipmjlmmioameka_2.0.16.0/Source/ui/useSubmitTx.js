import { aI as toHexArray, aJ as toHexString, am as Buffer$1, bD as getRef, cX as getObjRef, bE as forceSetLS, cY as ETERNL_COLLATERAL_EXP_MS, aj as api, al as getErrorMsg, e as ref, D as computed, a_ as useDebounceFn, cZ as LOVELACE, aM as el, P as networkId, aC as dispatchSignal, aX as json, c_ as getAutoSubmitTx, b7 as onTxSubmitted, c$ as getSubmitApiEndpoint, d0 as DEFAULT_ETERNL_ENDPOINT } from './index.js';
import { E as ErrorSubmitTx } from './ErrorSubmitTx.js';
import { F as FixedTransaction, s as safeFreeCSLObject, b4 as TransactionHash, b5 as blake2b256, bH as loadUnknownUtxos, c2 as getUtxoCborList, c3 as getFilteredUtxoList, c4 as createTransactionOutputJSON, bW as getDonationAddress, c5 as getValueJSONFromCbor, c6 as getAllUsedAddresses, c7 as getAddressCbor, ab as getLockedUtxos, aC as getScriptState, aI as getRewardAddressFromCred, aD as getBaseAddressFromCred, aE as getEnterpriseAddressFromCred, c8 as setRewardsLocked, c9 as updateBalances, r as createIBalance, v as addToBalance, ca as decreaseBalance, cb as getBalanceCbor, f as freeCSLObjects, cc as doProcessSubmittedTxList } from './app2.js';
import { a as isLessThanZero, s as subtract, f as isGreaterThanZero, m as multiply, d as divide } from './bigmath.js';
import { e as errorInvalidInputAmount, b as errorInvalidAmount, c as errorPaginateRange, d as errorNoSubmitTx, f as errorSubmitTxFailed, p as parseTxSignRequest } from './parse.js';
import { y as getChangeAddress, z as addToAssetFingerprintMap } from './useAppAccountBalances.js';
import { s as selectForAmount, u as useBuildAccount } from './lib.js';
import { g as getSwapURL } from './swap.js';
import { c as doShowUiNotification } from './notification.js';
import { n as networkIdList, h as getNetworkId } from './NetworkId.js';
import { g as getTransactionFromCbor } from './useSignTx.js';
import { c as checkEpochParams } from './epochParams.js';
import { g as generateTxConfig } from './generateConfig.js';

const reinjectVkeywitnesses = (txCbor, signedTxHex, cslWitnessSet) => {
  if (txCbor) {
    try {
      const fixedTx = FixedTransaction.from_bytes(toHexArray(txCbor));
      const vkeyWitnesses = cslWitnessSet.vkeys();
      if (vkeyWitnesses) {
        for (let i = 0; i < vkeyWitnesses.len(); i++) {
          const vkey = vkeyWitnesses.get(i);
          fixedTx.add_vkey_witness(vkey);
          safeFreeCSLObject(vkey);
        }
      }
      signedTxHex = toHexString(fixedTx.to_bytes());
      safeFreeCSLObject(vkeyWitnesses);
      safeFreeCSLObject(fixedTx);
    } catch (e) {
    }
  }
  return signedTxHex;
};
const getTransactionHashFromCbor = (txCbor) => {
  let txHash = null;
  if (txCbor) {
    try {
      const fixedTx = FixedTransaction.from_bytes(toHexArray(txCbor));
      const decodedTxBody = fixedTx.raw_body();
      const cslTxHash = TransactionHash.from_bytes(blake2b256(Buffer$1.from(decodedTxBody)));
      txHash = toHexString(cslTxHash.to_bytes());
      safeFreeCSLObject(cslTxHash);
      safeFreeCSLObject(fixedTx);
    } catch (e) {
    }
  }
  return txHash;
};
const getTransactionBodyFromCbor = (txCbor) => {
  let bodyCbor = null;
  if (txCbor) {
    try {
      const fixedTx = FixedTransaction.from_bytes(toHexArray(txCbor));
      const decodedTxBody = fixedTx.raw_body();
      bodyCbor = toHexString(decodedTxBody);
      safeFreeCSLObject(fixedTx);
    } catch (e) {
    }
  }
  return bodyCbor;
};

const getSlippage = () => getRef("slippage", "300");
const setSlippage = (slippage) => {
  const _ref = getSlippage();
  _ref.value = slippage;
  forceSetLS("slippage", _ref.value);
};
const getDEXBlocklist = () => getObjRef("dexblocklist", []);
const setDEXBlocklist = (blocklist) => {
  const _ref = getDEXBlocklist();
  _ref.value = blocklist;
  forceSetLS("dexblocklist", _ref.value);
};
const getAggBlocklist = () => getObjRef("aggblocklist", []);
const setAggBlocklist = (blocklist) => {
  const _ref = getAggBlocklist();
  _ref.value = blocklist;
  forceSetLS("aggblocklist", _ref.value);
};

const doMonsterAwake = "doMonsterAwake";
const doMonsterSleep = "doMonsterSleep";
const doMonsterWaiting = "doMonsterWaiting";
const doMonsterBored = "doMonsterBored";
const doMonsterHappy = "doMonsterHappy";
const doMonsterGreedy = "doMonsterGreedy";
const doMonsterAngry = "doMonsterAngry";

const eternlCollateralMap = networkIdList.reduce((o, n) => {
  o[n] = null;
  return o;
}, {});
function useCollateral() {
  const _eternlCollateral = async (networkId) => {
    let eternlCollateral = eternlCollateralMap[networkId];
    if (!eternlCollateral || Date.now() > eternlCollateral.lastUpdate + ETERNL_COLLATERAL_EXP_MS) {
      const res = await api.get("/" + networkId + "/v2/misc/collateral/fetch", void 0, 3e3);
      if (res?.data?.utxo) {
        const _collateralList = [];
        await loadUnknownUtxos(networkId, _collateralList, [res.data.utxo]);
        if (_collateralList.length > 0) {
          const collateralCborList = getUtxoCborList(_collateralList);
          eternlCollateral = {
            cbor: collateralCborList[0],
            lastUpdate: Date.now()
          };
          eternlCollateralMap[networkId] = eternlCollateral;
        }
      }
    }
    return eternlCollateral?.cbor ?? null;
  };
  return {
    getEternlCollateral: _eternlCollateral
  };
}

const extCip30 = { cip: 30 };
const extCip95 = { cip: 95 };
const extCip103 = { cip: 103 };
const extCip104 = { cip: 104 };
const extCip142 = { cip: 142 };
const supportedExtensions = [
  extCip30,
  extCip95,
  extCip103,
  extCip104,
  extCip142
];
const autoGrantWithCIP30List = [
  extCip103,
  extCip142
];
const METHOD = {
  enable: "enable",
  isEnabled: "isEnabled",
  getExtensions: "getExtensions",
  getNetworkId: "getNetworkId",
  getBalance: "getBalance",
  getChangeAddress: "getChangeAddress",
  getRewardAddresses: "getRewardAddresses",
  getRewardAddress: "getRewardAddress",
  getUnusedAddresses: "getUnusedAddresses",
  getForcedUnusedAddresses: "getForcedUnusedAddresses",
  getUsedAddresses: "getUsedAddresses",
  getUtxos: "getUtxos",
  getCollateral: "getCollateral",
  getLockedUtxos: "getLockedUtxos",
  signData: "signData",
  signTx: "signTx",
  submitTx: "submitTx",
  syncAccount: "syncAccount",
  enableLogs: "enableLogs",
  // CIP-95
  getPubDRepKey: "getPubDRepKey",
  getRegisteredPubStakeKeys: "getRegisteredPubStakeKeys",
  getUnregisteredPubStakeKeys: "getUnregisteredPubStakeKeys",
  // CIP-103
  signTxs: "signTxs",
  // CIP-104
  getAccountPub: "getAccountPub",
  // CIP-142
  getNetworkMagic: "getNetworkMagic",
  // experimental
  getConnectedNetworkId: "getConnectedNetworkId"
};
const DEFAULT_PAGINATE = { page: 0, limit: Number.MAX_SAFE_INTEGER };

const { getEternlCollateral } = useCollateral();
const cip30_getPaginate = (args, index = 0) => {
  const paginate = { page: DEFAULT_PAGINATE.page, limit: DEFAULT_PAGINATE.limit };
  if (args && args.length > index && !!args[index]) {
    const arg = args[index];
    const page = Number(arg.page);
    const limit = Number(arg.limit);
    if (!Number.isNaN(page) && !Number.isNaN(limit)) {
      paginate.page = page >= 0 ? page : DEFAULT_PAGINATE.page;
      paginate.limit = limit >= 1 ? limit : DEFAULT_PAGINATE.limit;
    }
  }
  return paginate;
};
const cip30_getAmount = (args, index = 0) => {
  if (args && args.length > index && !!args[index] && typeof args[index] === "string") {
    return args[index];
  }
  return null;
};
const cip30_getTx = (args, index = 0) => {
  if (args && args.length > index && !!args[index] && typeof args[index] === "string") {
    return args[index];
  }
  return null;
};
const cip30_getTxs = (args, index = 0) => {
  if (args && args.length > index && !!args[index] && Array.isArray(args[index])) {
    if (args[index].some((tx) => !tx.hasOwnProperty("cbor") || typeof tx.cbor !== "string")) {
      return null;
    }
    return args[index];
  }
  return null;
};
const cip30_getBoolean = (args, index = 1) => {
  if (args && args.length > index) {
    return !!args[index];
  }
  return false;
};
const cip30_enable = (extensions) => {
  const unsupportedExtensionList = [];
  if (!extensions || !Array.isArray(extensions)) {
    extensions = [extCip30];
  }
  for (const extension of extensions) {
    if (!extension.hasOwnProperty("cip") || Number.isNaN(parseInt(extension.cip))) {
      return void 0;
    }
    if (!supportedExtensions.some((e) => e.cip === extension.cip)) {
      if (unsupportedExtensionList.some((e) => e.cip === extension.cip)) {
        continue;
      }
      unsupportedExtensionList.push(extension);
    }
  }
  return unsupportedExtensionList.length === 0 ? null : unsupportedExtensionList;
};
const cip30_getNetworkId = (networkId) => {
  let respNetworkId = void 0;
  try {
    respNetworkId = getNetworkId(networkId);
  } catch (e) {
  }
  return respNetworkId;
};
const cip30_getChangeAddress = (appAccount) => {
  const changeAddr = getChangeAddress(appAccount.data);
  if (changeAddr) {
    const addrCbor = toHexString(changeAddr.csl.to_bytes());
    safeFreeCSLObject(changeAddr.csl);
    return addrCbor;
  }
  return null;
};
const cip30_getUnusedAddresses = (appAccount) => {
  const accountData = appAccount.data;
  const changeAddr = getChangeAddress(accountData, true);
  if (changeAddr) {
    const addrCbor = toHexString(changeAddr.csl.to_bytes());
    safeFreeCSLObject(changeAddr.csl);
    return [addrCbor];
  }
  const addrList = [];
  const {
    isPayScript,
    isStakeScript
  } = getScriptState(accountData, true, true);
  if (accountData.keys.payment.length > 0) {
    const stakeCred = accountData.keys.stake.length > 0 ? accountData.keys.stake[0].cred : null;
    for (const key of accountData.keys.payment) {
      if (!key.used) {
        const addrCbor = getAddressCbor(
          stakeCred ? getBaseAddressFromCred(key.cred, stakeCred, accountData.state.networkId, isPayScript, isStakeScript) : getEnterpriseAddressFromCred(key.cred, accountData.state.networkId, isPayScript)
        );
        if (addrCbor) {
          addrList.push(addrCbor);
          if (addrList.length >= 20) {
            break;
          }
        }
      }
    }
  }
  return addrList;
};
const _getForcedUnusedAddresses = (appAccount) => {
  const accountData = appAccount.data;
  const addrList = [];
  const {
    isPayScript,
    isStakeScript
  } = getScriptState(accountData, true, true);
  if (accountData.keys.payment.length > 0) {
    const stakeCred = accountData.keys.stake.length > 0 ? accountData.keys.stake[0].cred : null;
    for (const key of accountData.keys.payment) {
      if (!key.used) {
        const addr = stakeCred ? getBaseAddressFromCred(key.cred, stakeCred, accountData.state.networkId, isPayScript, isStakeScript) : getEnterpriseAddressFromCred(key.cred, accountData.state.networkId, isPayScript);
        if (addr) {
          addrList.push(addr);
          if (addrList.length >= 1) {
            break;
          }
        }
      }
    }
    if (addrList.length === 0) {
      const addr = stakeCred ? getBaseAddressFromCred(accountData.keys.payment[0].cred, stakeCred, accountData.state.networkId, isPayScript, isStakeScript) : getEnterpriseAddressFromCred(accountData.keys.payment[0].cred, accountData.state.networkId, isPayScript);
      if (addr) {
        addrList.push(addr);
      }
    }
  }
  return addrList;
};
const cip30_getForcedUnusedAddresses = (appAccount) => {
  const addrList = _getForcedUnusedAddresses(appAccount);
  for (let i = 0; i < addrList.length; i++) {
    const addrCbor = getAddressCbor(addrList[i]);
    if (addrCbor) {
      addrList[i] = addrCbor;
    }
  }
  return addrList;
};
const cip30_getUsedAddresses = (appAccount, paginate) => {
  let addrList = [];
  const accountData = appAccount.data;
  const usedAddresses = getAllUsedAddresses(accountData);
  const customAddrBech32 = accountData.settings.sam.addr ?? null;
  if (customAddrBech32) {
    const index = usedAddresses.indexOf(customAddrBech32);
    if (index !== -1) {
      usedAddresses.splice(index, 1);
    }
    usedAddresses.unshift(customAddrBech32);
  }
  for (const addrBech32 of usedAddresses) {
    const addrCbor = getAddressCbor(addrBech32);
    if (addrCbor) {
      addrList.push(addrCbor);
    }
  }
  if (paginate.limit <= addrList.length) {
    const numPages = Math.ceil(addrList.length / paginate.limit);
    if (paginate.page < numPages) {
      const startIndex = paginate.page * paginate.limit;
      const endIndex = startIndex + paginate.limit;
      addrList = addrList.filter((value, index) => index >= startIndex && index < endIndex);
    } else {
      throw errorPaginateRange(numPages);
    }
  }
  return addrList;
};
const cip30_getRewardAddresses = (appAccount) => {
  const accountData = appAccount.data;
  let addrList = [];
  if (accountData.keys.stake.length > 0) {
    const { isStakeScript } = getScriptState(accountData, false, true);
    for (const key of accountData.keys.stake) {
      const addr = getRewardAddressFromCred(key.cred, accountData.state.networkId, isStakeScript);
      const addrCbor = getAddressCbor(addr);
      if (addrCbor) {
        addrList.push(addrCbor);
      }
    }
  }
  return addrList;
};
const cip30_getRewardAddress = (appAccount) => {
  const accountData = appAccount.data;
  if (accountData.keys.stake.length > 0) {
    const { isStakeScript } = getScriptState(accountData, false, true);
    for (const key of accountData.keys.stake) {
      const addr = getRewardAddressFromCred(key.cred, accountData.state.networkId, isStakeScript);
      const addrCbor = getAddressCbor(addr);
      if (addrCbor) {
        return addrCbor;
      }
    }
  }
  return null;
};
const cip30_getBalance = async (appAccount) => {
  const accountData = appAccount.data;
  setRewardsLocked(accountData.account.id, true);
  const balances = updateBalances(appAccount);
  const balance = createIBalance();
  addToBalance(balance, balances.lockedAvailable, true, true);
  addToBalance(balance, balances.lockedByTokens, true, true);
  decreaseBalance(balance, balances.locked, true, true);
  if (!appAccount.data.settings.collateral.eternl) {
    decreaseBalance(balance, balances.collateral, true, true);
  }
  if (isLessThanZero(balance.coin)) {
    balance.coin = "0";
    if (balance.multiasset) {
      delete balance.multiasset;
    }
  }
  const balanceCbor = getBalanceCbor(balance);
  return balanceCbor;
};
const cip30_getUtxos = async (appAccount, amount, paginate) => {
  const filterCollateral = !appAccount.data.settings.collateral.eternl;
  const { utxoList } = getFilteredUtxoList(appAccount, filterCollateral, true, true, false);
  let _utxoList = [];
  if (amount) {
    let step = 0;
    try {
      const accountData = appAccount.data;
      const wantedAmount = createTransactionOutputJSON();
      wantedAmount.address = getDonationAddress(appAccount.data.state.networkId);
      wantedAmount.amount = getValueJSONFromCbor(amount);
      step = 1;
      const userOutputList = [wantedAmount];
      const txConfig = generateTxConfig(appAccount, checkEpochParams(accountData.state.networkId), 0, 0);
      const {
        chosenInputList
      } = await selectForAmount(userOutputList, txConfig, appAccount);
      _utxoList.push(...getUtxoCborList(chosenInputList));
    } catch (e) {
      console.error(e);
      if (step === 0) {
        throw errorInvalidInputAmount(e);
      } else {
        throw errorInvalidAmount(e);
      }
    }
  } else {
    _utxoList.push(...getUtxoCborList(utxoList));
  }
  if (paginate.limit <= _utxoList.length) {
    const numPages = Math.ceil(_utxoList.length / paginate.limit);
    if (paginate.page < numPages) {
      const startIndex = paginate.page * paginate.limit;
      const endIndex = startIndex + paginate.limit;
      _utxoList = _utxoList.filter((value, index) => index >= startIndex && index < endIndex);
    } else {
      throw errorPaginateRange(numPages);
    }
  }
  return _utxoList;
};
const cip30_getCollateral = async (appAccount) => {
  let collateralList;
  if (appAccount.data.settings.collateral.eternl) {
    try {
      const networkId = appAccount.data.state.networkId;
      const eternlCollateral = await getEternlCollateral(networkId);
      if (eternlCollateral) {
        collateralList = [eternlCollateral];
      }
    } catch (err) {
      console.error("cip30_getCollateral:", getErrorMsg(err));
    }
  }
  if (!collateralList) {
    collateralList = getUtxoCborList(appAccount.utxoMap.collateral);
  }
  return collateralList;
};
const cip30_getLockedUtxos = async (appAccount) => {
  const utxoList = getLockedUtxos(appAccount);
  const lockedList = getUtxoCborList(utxoList);
  return lockedList;
};
const cip30_submitTx = async (networkId, txCbor) => {
  if (txCbor === null) {
    throw errorNoSubmitTx();
  }
  const free = [];
  const res = getTransactionFromCbor(networkId, txCbor, 0, free);
  if (!res.builtTx) {
    throw errorNoSubmitTx();
  }
  const resSubmit = await useSubmitTx().submitTx(networkId, txCbor, res.builtTx);
  freeCSLObjects(free);
  if (resSubmit.error) {
    console.log("submitTx: resSubmit:", typeof resSubmit.error, resSubmit.error);
    let error = resSubmit.error;
    if (typeof error === "string" && error.startsWith(ErrorSubmitTx.failed + ".")) {
      let errorArr = error.split(".");
      errorArr.shift();
      errorArr.shift();
      error = errorArr.join(".");
    }
    throw errorSubmitTxFailed(error);
  }
  if (resSubmit.status && resSubmit.status >= 200 && resSubmit.status <= 299) {
    return res.txHash;
  } else {
    throw errorSubmitTxFailed(resSubmit.status + "?");
  }
};
const cip30_getConnectedNetworkId = (networkId) => {
  let respNetworkId = void 0;
  try {
    respNetworkId = networkId;
  } catch (e) {
  }
  return respNetworkId;
};

let _notifications;
const eternlSwapTimeout = 1e4;
const {
  accountData,
  buildAccount,
  accountSettings,
  accountBalances
} = useBuildAccount();
const doLog = false;
const isLoadingOpenOrders = ref(false);
const isWaitingForEstimate = ref(false);
const isWaitingForMarkSubmit = ref(false);
const isWaitingForBuild = ref(false);
const fetchSwapConfig = async (networkId2) => {
  if (networkId2 !== "mainnet") {
    return void 0;
  }
  const url = `${getSwapURL()}/${networkId2}/v2/swap/config`;
  try {
    const res = await api.get(url, void 0, eternlSwapTimeout);
    if (res?.data) {
      if (doLog) ;
      return res.data;
    }
  } catch (err) {
    handleError(err, "Could not fetch swap config.", false);
  }
  return void 0;
};
const fetchTokenList = async (networkId2) => {
  if (networkId2 !== "mainnet") {
    return [];
  }
  const url = `${getSwapURL()}/${networkId2}/v2/swap/tokenlist`;
  try {
    const res = await api.get(url, void 0, eternlSwapTimeout);
    if (res?.data && Array.isArray(res.data)) {
      if (doLog) ;
      addToAssetFingerprintMap(res.data);
      return res.data;
    }
  } catch (err) {
    console.error(err);
    console.warn("Error: Could not fetch token list.", err?.responseText ?? err);
  }
  return [];
};
const fetchSwapEstimate = async (networkId2, swapData) => {
  if (networkId2 !== "mainnet") {
    return null;
  }
  const url = `${getSwapURL()}/${networkId2}/v2/swap/estimate`;
  try {
    isWaitingForEstimate.value = true;
    dispatchSignal(doMonsterWaiting);
    const res = await api.post(url, swapData, eternlSwapTimeout + 2e3);
    isWaitingForEstimate.value = false;
    if (res?.data) {
      if (doLog) ;
      return res.data;
    }
  } catch (err) {
    isWaitingForEstimate.value = false;
    handleError(err, "Could not fetch swap estimate.");
  }
  return null;
};
const fetchSwapTransaction = async (networkId2, swapData) => {
  if (isWaitingForBuild.value) {
    const msg = "Already building swap transaction.";
    console.warn(msg);
    _notifications?.showWarning(msg);
    return null;
  }
  if (networkId2 !== "mainnet") {
    return null;
  }
  const url = `${getSwapURL()}/${networkId2}/v2/swap/build`;
  try {
    isWaitingForBuild.value = true;
    const res = await api.post(url, swapData, eternlSwapTimeout + 2e3);
    console.log("fetchSwapTransaction response:", res);
    isWaitingForBuild.value = false;
    if (res?.data) {
      if (doLog) ;
      return res.data;
    }
  } catch (req) {
    isWaitingForBuild.value = false;
    console.error(req);
    console.warn("Error: Could not fetch swap transaction.", req);
    const res = req.response || req.responseText || "";
    if (res !== "") {
      try {
        const errData = JSON.parse(res);
        const msg = errData?.msg ?? errData;
        _notifications?.showError("Could not fetch swap transaction: " + msg);
        dispatchSignal(doMonsterAngry);
        return null;
      } catch (e) {
        console.error("Error parsing swap transaction error response:", e);
      }
    }
  }
  return null;
};
const fetchOpenOrders = async (networkId2, addressList) => {
  if (!addressList || addressList.length === 0) {
    return [];
  }
  if (networkId2 !== "mainnet") {
    return [];
  }
  const url = `${getSwapURL()}/${networkId2}/v2/swap/pending`;
  try {
    isLoadingOpenOrders.value = true;
    const res = await api.post(url, { addressList }, eternlSwapTimeout);
    isLoadingOpenOrders.value = false;
    if (res?.data) {
      if (doLog) ;
      return res.data;
    }
  } catch (err) {
    isLoadingOpenOrders.value = false;
    handleError(err, "Could not fetch open orders.");
  }
  return [];
};
const handleError = (err, prefix, showNotification = true) => {
  console.error(err);
  console.warn("Error: " + prefix, err);
  if (!showNotification) {
    return;
  }
  const msg = err?.data?.msg ?? err?.data ?? err?.msg ?? err;
  if (typeof msg === "object") {
    _notifications?.showError(prefix);
    return;
  }
  _notifications?.showError(prefix + msg);
};
const DefaultADAToken = {
  "ticker": "ADA",
  "name": "Cardano",
  "policyId": LOVELACE,
  "hexName": "",
  "decimals": 6
  // TODO: use network decimals
};
const inputToken = ref(DefaultADAToken);
const outputToken = ref();
const inputAmount = ref();
const outputAmount = ref();
const openOrders = ref([]);
const isTfEnabled = accountSettings.isTfEnabled;
const inputAmountFull = computed(() => {
  return multiply(inputAmount.value ?? 0, Math.pow(10, inputToken.value?.decimals ?? 0));
});
const outputAmountFull = computed(() => {
  return multiply(outputAmount.value ?? 0, Math.pow(10, outputToken.value?.decimals ?? 0));
});
const _lockedAvailable = computed(() => {
  if (isTfEnabled.value) {
    let total = subtract(
      accountBalances.value?.lockedAvailableTF.total ?? "0",
      accountBalances.value?.txFees.total ?? "0"
    );
    total = subtract(total, accountBalances.value?.locked.total ?? "0");
    return subtract(total, 2e7);
  } else {
    let total = subtract(
      accountBalances.value?.lockedAvailable.total ?? "0",
      accountBalances.value?.txFees.total ?? "0"
    );
    total = subtract(total, accountBalances.value?.locked.total ?? "0");
    return subtract(total, 2e7);
  }
});
const inputTokenBalance = computed(() => {
  if (inputToken.value.policyId === DefaultADAToken.policyId) {
    return _lockedAvailable.value;
  }
  return accountData.value?.balance?.multiasset?.[inputToken.value?.policyId ?? ""]?.[inputToken.value?.hexName ?? ""] ?? "0";
});
const outputTokenBalance = computed(() => {
  if (outputToken.value?.policyId === DefaultADAToken.policyId) {
    return _lockedAvailable.value;
  }
  return accountData.value?.balance?.multiasset?.[outputToken.value?.policyId ?? ""]?.[outputToken.value?.hexName ?? ""] ?? "0";
});
const inputType = ref("in");
const swapEstimate = ref();
const builtSwap = ref();
const swapConfig = ref();
const tokenList = ref([]);
ref([]);
const slippage = getSlippage();
const blockList = getDEXBlocklist();
const disabledAggregatorList = getAggBlocklist();
let lastUpdated = ref(0);
const useMonsterSwapAPI = () => {
  const cancelOrder = async (networkId2, cancelTxs, aggregator) => {
    const url = `${getSwapURL()}/${networkId2}/v2/swap/cancel`;
    if (!buildAccount.value) {
      return null;
    }
    let collateral = getUtxoCborList(buildAccount.value.utxoMap.collateral)[0];
    const changeAddress = cip30_getChangeAddress(buildAccount.value);
    if (!buildAccount) {
      return null;
    }
    if (!changeAddress) {
      return null;
    }
    if (!collateral && aggregator !== "SteelSwap") {
      return null;
    }
    let cancelOrders = {
      change_address: changeAddress,
      collateral_utxo: collateral,
      ttl: 300,
      tx_list: cancelTxs,
      utxos: await cip30_getUtxos(buildAccount.value, null, cip30_getPaginate([])),
      aggregator,
      order_id: aggregator === "DexHunter" ? cancelTxs[0].order_id : void 0
    };
    const res = await api.post(url, cancelOrders).catch((err) => {
      handleError(err, "Could not cancel order.");
    });
    if (res?.data) {
      let _preparedTxs = [];
      for (const _txCbor of res.data) {
        _preparedTxs.push({ cbor: _txCbor, partialSign: false });
      }
      await parseTxSignRequest(buildAccount.value, "cc", _preparedTxs, "monsterswap-cancel");
    }
    return null;
  };
  return {
    fetchSwapConfig,
    fetchTokenList,
    fetchSwapEstimate,
    fetchSwapTransaction,
    fetchOpenOrders,
    cancelOrder,
    isLoadingOpenOrders
  };
};
const useMonsterSwapData = () => {
  const showMessage = async (msg) => {
    await dispatchSignal(doShowUiNotification, msg);
  };
  _notifications = {
    showError: (msg) => {
      showMessage({
        type: "error",
        message: msg
      });
    },
    showWarning: (msg) => {
      showMessage({
        type: "warning",
        message: msg
      });
    }
  };
  const {
    fetchSwapEstimate: fetchSwapEstimate2,
    fetchSwapTransaction: fetchSwapTransaction2,
    fetchOpenOrders: fetchOpenOrders2
  } = useMonsterSwapAPI();
  const resetSwapInput = () => {
    inputToken.value = DefaultADAToken;
    outputToken.value = void 0;
    inputAmount.value = void 0;
    outputAmount.value = void 0;
    swapEstimate.value = void 0;
    dispatchSignal(doMonsterAngry);
  };
  const lastEstimateExec = ref(0);
  const tryUpdateEstimate = useDebounceFn(async () => {
    if (!inputToken.value || !outputToken.value) {
      return null;
    }
    if (isGreaterThanZero(inputAmount.value ?? 0)) {
      if (Date.now() - lastEstimateExec.value < 500) {
        return null;
      }
      lastEstimateExec.value = Date.now();
      return updateEstimate();
    } else {
      swapEstimate.value = void 0;
      outputAmount.value = void 0;
      lastUpdated.value = Date.now();
    }
    return null;
  }, 300);
  const updateEstimate = async () => {
    try {
      const _inputToken = JSON.parse(JSON.stringify(inputToken.value));
      const _outputToken = JSON.parse(JSON.stringify(outputToken.value));
      const _inputAmount = JSON.parse(JSON.stringify(inputAmount.value));
      const res = await fetchSwapEstimate2(networkId.value, {
        quantity: inputType.value === "in" ? inputAmountFull.value : outputAmountFull.value,
        token_in: inputToken.value?.policyId + inputToken.value?.hexName,
        token_out: outputToken.value?.policyId + outputToken.value?.hexName,
        type: inputType.value,
        slippage: 0,
        discountAssets: [],
        blocklist: blockList.value,
        aggBlocklist: disabledAggregatorList.value
      });
      if (!res || res.aggregator === "NONE") {
        swapEstimate.value = void 0;
        outputAmount.value = void 0;
        lastUpdated.value = Date.now();
        return null;
      }
      if (_inputToken.ticker !== inputToken.value.ticker || _outputToken.ticker !== outputToken.value?.ticker || _inputAmount !== inputAmount.value) {
        console.error("Failed");
        return null;
      }
      swapEstimate.value = res;
      lastUpdated.value = Date.now();
      if (inputType.value === "in") {
        outputAmount.value = Number(divide(res?.quantity_out ?? 0, Math.pow(10, outputToken.value?.decimals ?? 0)));
      } else {
        inputAmount.value = Number(divide(res?.quantity_in ?? 0, Math.pow(10, inputToken.value?.decimals ?? 0)));
      }
      dispatchSignal(doMonsterAwake);
      return res;
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  const buildSwap = async () => {
    const receiveAddress = accountSettings.receiveAddress.value?.bech32;
    const changeAddress = accountSettings.changeAddress.value?.addr?.bech32;
    if (!receiveAddress) {
      return null;
    }
    if (!changeAddress) {
      return null;
    }
    if (!swapEstimate.value) {
      return null;
    }
    if (!outputToken.value) {
      return null;
    }
    if (!buildAccount.value) {
      return null;
    }
    const res = await fetchSwapTransaction2(networkId.value, {
      address: receiveAddress,
      aggregator: swapEstimate.value.aggregator,
      change_address: changeAddress,
      quantity: inputType.value === "in" ? inputAmountFull.value : outputAmountFull.value,
      slippage: Number(slippage.value),
      //default: 3%
      token_in: inputToken.value.policyId + inputToken.value.hexName,
      token_out: outputToken.value.policyId + outputToken.value.hexName,
      ttl: 900,
      blocklist: blockList.value,
      type: inputType.value,
      utxos: await cip30_getUtxos(buildAccount.value, null, cip30_getPaginate([])),
      uuid: swapEstimate.value.uuid
    });
    if (!res) {
      return null;
    }
    await dispatchSignal(doMonsterHappy);
    builtSwap.value = res;
    await parseTxSignRequest(buildAccount.value, "cc", [{ cbor: res.tx_cbor, partialSign: res.partial_sign }], "monsterswap", swapEstimate.value.uuid);
    return res;
  };
  const getOpenOrders = async (_selectedAccountId) => {
    if (!buildAccount.value) {
      return [];
    }
    const addrCborList = cip30_getUsedAddresses(buildAccount.value, { page: 0, limit: 9999 });
    if (!addrCborList) {
      return [];
    }
    openOrders.value = await fetchOpenOrders2(networkId.value, addrCborList);
    if (_selectedAccountId !== accountData.value?.account.id) {
      return [];
    }
    return openOrders.value;
  };
  const markAsSubmitted = async (networkId2, swapData) => {
    if (networkId2 !== "mainnet") {
      return null;
    }
    const url = `${getSwapURL()}/${networkId2}/v2/swap/mark-submitted`;
    try {
      isWaitingForMarkSubmit.value = true;
      const res = await api.post(url, swapData, eternlSwapTimeout + 2e3);
      isWaitingForMarkSubmit.value = false;
      if (res?.data) {
        if (doLog) ;
        return res.data;
      }
    } catch (err) {
      isWaitingForEstimate.value = false;
      console.warn("Error: Could not mark as submitted.", err);
      const msg = err?.data?.msg ?? err?.data ?? err?.msg ?? err;
      _notifications?.showError(msg);
    }
    return null;
  };
  const toggleProtocolOnBlocklist = (protocol) => {
    if (blockList.value.includes(protocol)) {
      const protocolData = swapConfig.value?.DEXs.find((_protocol) => _protocol.label === protocol);
      if (protocolData) {
        for (const version of protocolData.versions) {
          blockList.value = blockList.value.filter((_version) => _version !== version.label);
        }
      }
      blockList.value = blockList.value.filter((_protocol) => _protocol !== protocol);
    } else {
      blockList.value.push(protocol);
    }
    setDEXBlocklist(blockList.value);
    return true;
  };
  const toggleAggregatorOnBlocklist = (aggregator) => {
    if (disabledAggregatorList.value.includes(aggregator)) {
      disabledAggregatorList.value = disabledAggregatorList.value.filter((_aggregator) => _aggregator !== aggregator);
    } else {
      disabledAggregatorList.value.push(aggregator);
    }
    setAggBlocklist(disabledAggregatorList.value);
    return true;
  };
  const switchInputAndOutput = async () => {
    inputAmount.value = 0;
    outputAmount.value = 0;
    if (!inputToken.value || !outputToken.value) return;
    let _inputToken = inputToken.value;
    let _outputToken = outputToken.value;
    inputToken.value = _outputToken;
    outputToken.value = _inputToken;
  };
  return {
    slippage,
    inputToken,
    outputToken,
    inputAmount,
    outputAmount,
    tokenList,
    swapEstimate,
    builtSwap,
    inputType,
    lastUpdated,
    swapConfig,
    blockList,
    toggleProtocolOnBlocklist,
    disabledAggregatorList,
    toggleAggregatorOnBlocklist,
    inputTokenBalance,
    outputTokenBalance,
    switchInputAndOutput,
    DefaultADAToken,
    getOpenOrders,
    openOrders,
    isLoadingOpenOrders,
    resetSwapInput,
    tryUpdateEstimate,
    isWaitingForEstimate,
    isWaitingForBuild,
    buildSwap,
    spendableLovelace: _lockedAvailable,
    markAsSubmitted
  };
};

const submitTx = async (networkId, txCbor, tx) => {
  try {
    const uuid = Array.isArray(tx) ? tx[0].trackingUuid : tx.trackingUuid;
    const resCode = await sendTransaction(networkId, txCbor, "cc", uuid);
    if (resCode >= 200 && resCode <= 299) {
      const txList = Array.isArray(tx) ? [...tx] : [tx];
      await dispatchSignal(doProcessSubmittedTxList, [...txList], []);
      await dispatchSignal(onTxSubmitted, txList);
      return {
        status: resCode
      };
    } else {
      return {
        status: resCode,
        error: ErrorSubmitTx.failed
      };
    }
  } catch (err) {
    console.error("submitTx:", err);
    if (typeof err === "object") {
      const data = err?.data;
      let okList = [];
      let failedList = [];
      if (data && data.okList && Array.isArray(data.okList)) {
        if (Array.isArray(tx)) {
          okList = tx.filter((t) => data.okList.includes(t.hash));
        } else if (data.okList.includes(tx.hash)) {
          okList = [tx];
        }
      }
      if (data && data.failedList && Array.isArray(data.failedList)) {
        if (Array.isArray(tx)) {
          failedList = tx.filter((t) => data.failedList.includes(t.hash));
        } else if (data.failedList.includes(tx.hash)) {
          failedList = [tx];
        }
      }
      await dispatchSignal(doProcessSubmittedTxList, okList, failedList);
    }
    return {
      error: ErrorSubmitTx.failed + "." + (typeof err === "string" ? err : err?.errorMsg ?? JSON.stringify(err)),
      errorList: err?.errors
    };
  }
};
const sendTransaction = async (networkId, serializedTx, type, trackingUuid) => {
  let url = "/" + networkId + "/v1/wallet/send/tx";
  let payload;
  let customApiURL = getSubmitApiEndpoint(networkId).value;
  if (customApiURL !== DEFAULT_ETERNL_ENDPOINT) {
    if (typeof serializedTx === "string") {
      serializedTx = [serializedTx];
    }
    if (!customApiURL) {
      throw "No custom submit API URL set.";
    } else if (!customApiURL.startsWith("http")) {
      throw "Wrong format; custom submit API URL (must start with http).";
    }
    const okList = [];
    const failedList = [];
    const errors = [];
    for (const tx of serializedTx) {
      const txHash = getTransactionHashFromCbor(tx);
      if (!txHash) {
        throw "Could not get tx hash from CBOR.";
      }
      try {
        let res = await api.postCbor(customApiURL, tx);
        const resCode = res.status;
        if (resCode >= 200 && resCode <= 299) {
          okList.push(txHash);
        } else {
          failedList.push(txHash);
          let data = { status: resCode };
          try {
            data.error = JSON.parse(res.responseText);
          } catch (e) {
            data.error = res.responseText;
          }
          errors.push({ message: "Failed to submit tx: " + txHash, data: res.data, code: res.status });
        }
      } catch (req) {
        failedList.push(txHash);
        if (req?.response && (req.responseType === "" || req.responseType === "text")) {
          let data = { status: req.status };
          try {
            data.error = JSON.parse(req.responseText);
          } catch (e) {
            data.error = req.responseText;
          }
          errors.push({ message: "Failed to submit tx: " + txHash, data });
        } else {
          errors.push({ message: "Failed to submit tx: " + txHash, data: "Could not connect to custom API endpoint. Please make sure your custom endpoint has set the correct CORS header." });
        }
      }
    }
    let str = "";
    if (failedList.length > 0) {
      if (okList && okList.length > 0) {
        str += "\nsubmitted:\n";
        for (const txHash of okList) {
          str += txHash + "\n";
        }
        str += "\n";
      }
      if (failedList && failedList.length > 0) {
        str += "\n";
        str += "\n";
        for (let i = 0; i < failedList.length; i++) {
          if (errors && i < errors.length) {
            const txError = errors[i];
            str += txError.message + "\n";
            if (txError.data) {
              str += "Data: " + JSON.stringify(txError.data) + "\n";
            }
          }
        }
      }
      throw {
        errorMsg: str,
        errors,
        data: { okList, failedList }
      };
    }
    return 200;
  } else {
    payload = {
      txHash: serializedTx,
      type
    };
    try {
      let res = await api.post(url, payload);
      if (res.status >= 200 && res.status <= 299) {
        if (trackingUuid) {
          const { markAsSubmitted } = useMonsterSwapData();
          if ("okList" in res.data && Array.isArray(res.data.okList)) {
            await markAsSubmitted(networkId, {
              buildRequestUuid: trackingUuid,
              transactionId: res.data.okList[0]
            });
          }
        }
      }
      return res.status;
    } catch (req) {
      let res;
      try {
        res = JSON.parse(req.responseText);
      } catch (e) {
        res = req.responseText;
      }
      if (typeof res === "object" && res?.data) {
        const data = res.data ?? {};
        let str = "";
        const okList = data.okList;
        const failedList = data.failedList;
        const errors = data.errors;
        if (okList && okList.length > 0) {
          str += "\nsubmitted:\n";
          for (const txHash of okList) {
            str += txHash + "\n";
          }
          str += "\n";
        }
        if (failedList && failedList.length > 0) {
          for (let i = failedList.length - 1; i >= 0; i--) {
            try {
              const txHash = getTransactionHashFromCbor(failedList[i]);
              if (txHash) {
                failedList[i] = txHash;
              }
            } catch (e) {
            }
          }
          str += "failed:\n";
          for (let i = 0; i < failedList.length; i++) {
            const txHash = failedList[i];
            str += txHash + "\n";
            if (errors && i < errors.length) {
              const txError = errors[i];
              str += txError.message + "\n";
              if (txError.data) {
                str += "Data: " + JSON.stringify(txError.data) + "\n";
              }
            }
          }
        }
        if (res.status) {
          str = "(" + res.status + ")" + (str ? "\n" + str : "");
        }
        throw {
          errorMsg: str,
          errors,
          data: res.data
        };
      }
      throw "Unknown error: " + (typeof res === "object" ? JSON.stringify(res) : res);
    }
  }
};
const useSubmitTx = () => {
  return {
    doAutoSubmit: getAutoSubmitTx(),
    submitTx
  };
};

export { cip30_getBalance as A, cip30_submitTx as B, cip30_getTx as C, reinjectVkeywitnesses as D, getTransactionBodyFromCbor as E, getSlippage as F, setSlippage as G, supportedExtensions as H, cip30_getBoolean as I, cip30_getTxs as J, METHOD as M, useMonsterSwapAPI as a, doMonsterSleep as b, doMonsterBored as c, doMonsterAwake as d, doMonsterGreedy as e, doMonsterWaiting as f, doMonsterHappy as g, doMonsterAngry as h, useSubmitTx as i, cip30_getConnectedNetworkId as j, cip30_getNetworkId as k, cip30_enable as l, autoGrantWithCIP30List as m, extCip30 as n, cip30_getForcedUnusedAddresses as o, cip30_getLockedUtxos as p, cip30_getCollateral as q, cip30_getUtxos as r, cip30_getAmount as s, cip30_getPaginate as t, useMonsterSwapData as u, cip30_getChangeAddress as v, cip30_getRewardAddress as w, cip30_getRewardAddresses as x, cip30_getUnusedAddresses as y, cip30_getUsedAddresses as z };
