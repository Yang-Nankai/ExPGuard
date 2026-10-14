import { bD as getRef, bE as forceSetLS, D as computed, e as ref, P as networkId, ad as dispatchSignalSync, bF as getApiURL, bG as error, aM as el, aV as now, bH as DEFAULT_WS_TIMEOUT_MS, bI as DEFAULT_ACCOUNT_ID, bJ as getEpochParams, bK as ChainError, aE as addSignalListener, bL as onNetworkIdUpdated, bM as setEpochParams, aC as dispatchSignal, bN as onEpochParamsUpdated } from './index.js';
import './NetworkId.js';

const getDappWalletId = (networkId) => getRef("dappWalledId_" + networkId);
const setDappWalletId = (networkId, value) => {
  getDappWalletId(networkId).value = value;
  forceSetLS("dappWalledId_" + networkId, value);
};
const getDappAccountId = (networkId) => getRef("dappAccountId_" + networkId);
const setDappAccountId = (networkId, value) => {
  getDappAccountId(networkId).value = value;
  forceSetLS("dappAccountId_" + networkId, value);
};
const getDappAccountUpdated = (networkId) => getRef("dappAccountUpdated_" + networkId);
const setDappAccountUpdated = (networkId, value) => {
  getDappAccountUpdated(networkId).value = value;
  forceSetLS("dappAccountUpdated_" + networkId, value);
};
const getFixedDappWalletId = (networkId) => getRef("fixedDappWalledId_" + networkId);
const setFixedDappWalletId = (networkId, value) => {
  getFixedDappWalletId(networkId).value = value;
  forceSetLS("fixedDappWalledId_" + networkId, value);
};
const getFixedDappAccountId = (networkId) => getRef("fixedDappAccountId_" + networkId);
const setFixedDappAccountId = (networkId, value) => {
  getFixedDappAccountId(networkId).value = value;
  forceSetLS("fixedDappAccountId_" + networkId, value);
};
const getSelectedWalletAccountId = (networkId, walletId) => getRef("selectedAccountId_" + networkId + "_" + walletId);
const setSelectedWalletAccountId = (networkId, walletId, value) => {
  getSelectedWalletAccountId(networkId, walletId).value = value;
  forceSetLS("selectedAccountId_" + networkId + "_" + walletId, value);
};
const getSelectedAccountId = (networkId) => getRef("selectedAccountId_" + networkId);
const setSelectedAccountId = (networkId, value) => {
  getSelectedAccountId(networkId).value = value;
  forceSetLS("selectedAccountId_" + networkId, value);
};
const getSelectedWalletId = (networkId) => getRef("selectedWalletId_" + networkId);
const setSelectedWalletId = (networkId, walletId) => {
  getSelectedWalletId(networkId).value = walletId;
  forceSetLS("selectedWalletId_" + networkId, walletId);
};

const _walletId = ref(getSelectedWalletId(networkId.value).value);
const _accountId = ref(getSelectedAccountId(networkId.value).value);
const selectedWalletId = computed(() => _walletId.value);
const selectedAccountId = computed(() => _accountId.value);
computed(() => {
  const lsRef = getSelectedWalletId(networkId.value);
  const lsValue = lsRef.value;
  return lsValue;
});
computed(() => {
  const lsRef = getSelectedAccountId(networkId.value);
  const lsValue = lsRef.value;
  return lsValue;
});
const __switchSelectedWalletAccount = (walletId, accountId) => {
  __setSelectedWalletId(walletId);
  __setSelectedAccountId(accountId);
  __setSelectedWalletAccountId(walletId, accountId);
};
const __setSelectedWalletId = (walletId) => {
  if (_walletId.value !== walletId) {
    _walletId.value = walletId;
    setSelectedWalletId(networkId.value, walletId);
  }
};
const __setSelectedAccountId = (accountId) => {
  if (_accountId.value !== accountId) {
    _accountId.value = accountId;
    setSelectedAccountId(networkId.value, accountId);
  }
};
const __getSelectedWalletAccountId = (walletId) => {
  const lsRef = getSelectedWalletAccountId(networkId.value, walletId);
  const lsValue = lsRef.value;
  return lsValue;
};
const __setSelectedWalletAccountId = (walletId, accountId) => {
  setSelectedWalletAccountId(networkId.value, walletId, accountId);
  return accountId;
};

const onUIAccountSelected = "onUIAccountSelected";
const onSelectedAccountIdSet = "onSelectedAccountIdSet";
const doSwitchSelectedWalletAccount = "doSwitchSelectedWalletAccount";
const onSwitchSelectedWalletAccount = "onSwitchSelectedWalletAccount";
const doSetUiSelectedAccount = "doSetUiSelectedAccount";
const doToggleFixedDappAccountId = "doToggleFixedDappAccountId";
const doToggleLockedUtxo = "doToggleLockedUtxo";
const doToggleSelectedUtxo = "doToggleSelectedUtxo";
const doClearSelectedUtxos = "doClearSelectedUtxos";
const onLockedUtxoToggled = "onLockedUtxoToggled";
const onSelectedUtxoToggled = "onSelectedUtxoToggled";
const doUpdateAccountBalances = "doUpdateAccountBalances";
const onAccountBalancesUpdated = "onAccountBalancesUpdated";
const onAppAccountAddedToAppWallet = "onAppAccountAddedToAppWallet";
const doAddAccountToRecovery = "doAddAccountToRecovery";
const doAddWalletToRecovery = "doAddWalletToRecovery";
const doGetWalletListFromRecovery = "doGetWalletListFromRecovery";
const doRemoveWalletFromRecovery = "doRemoveWalletFromRecovery";
const doUpdateWalletRecoveryData = "doUpdateWalletRecoveryData";
const doGetAccountSettingsFromRecovery = "doGetAccountSettingsFromRecovery";

const switchWalletAccount = (walletId, accountId) => {
  dispatchSignalSync(doSwitchSelectedWalletAccount, walletId, accountId);
};
function useSelectedAccount() {
  return {
    selectedAccountId,
    selectedWalletId,
    switchWalletAccount
  };
}

const isNumber = (n) => Number(n) === n;

const createIEpochParameterStore = (networkId) => {
  return {
    networkId,
    network: networkId,
    epochNo: 0,
    totals: createITotals(),
    isAtLeastBabbageEra: false,
    isAtLeastConwayEra: false,
    isAtLeastConwayEra2: false,
    txFeePerByte: 0,
    minUTxOValue: 0,
    stakePoolDeposit: 0,
    utxoCostPerSize: 0,
    utxoCostPerWord: 0,
    decentralization: 0,
    poolRetireMaxEpoch: 0,
    extraPraosEntropy: null,
    collateralPercentage: 0,
    stakePoolTargetNum: 0,
    maxBlockBodySize: 0,
    maxTxSize: 0,
    treasuryCut: 0,
    minPoolCost: 0,
    maxCollateralInputs: 0,
    maxValueSize: 0,
    maxBlockExecutionUnits: {
      memory: 0,
      steps: 0
    },
    maxBlockHeaderSize: 0,
    costModels: {},
    maxTxExecutionUnits: {
      memory: 0,
      steps: 0
    },
    protocolVersion: {
      minor: 0,
      major: 0
    },
    txFeeFixed: 0,
    stakeAddressDeposit: 0,
    monetaryExpansion: 0,
    poolPledgeInfluence: 0,
    executionUnitPrices: {
      memory: 0,
      steps: 0
    },
    costModelId: 0,
    nonce: "",
    pvt: {
      motionNoConfidence: 0,
      committeeNormal: 0,
      committeeNoConfidence: 0,
      hardForkInitiation: 0,
      PPSecurityGroup: 0
    },
    dvt: {
      motionNoConfidence: 0,
      committeeNormal: 0,
      committeeNoConfidence: 0,
      hardForkInitiation: 0,
      updateToConstitution: 0,
      PPNetworkGroup: 0,
      PPEconomicGroup: 0,
      PPTechnicalGroup: 0,
      PPGovGroup: 0,
      TreasuryWithdrawal: 0
    },
    committee: {
      minSize: 0,
      maxTermLength: 0
    },
    govAction: {
      lifeTime: 0,
      deposit: 0
    },
    drep: {
      deposit: 0,
      activity: 0
    }
  };
};
const createITotals = () => {
  return {
    circulation: "0",
    treasury: "0",
    rewards: "0",
    supply: "0",
    reserves: "0",
    reservesDepletion: "0",
    blockLossFactor: 1
  };
};

const ErrorSync = {
  readUtxoMap: "ErrorSync.readUtxoMap",
  loadUtxoCborList: "ErrorSync.loadUtxoCborList",
  loadUtxoCborFromTxList: "ErrorSync.loadUtxoCborFromTxList",
  loadUtxoCborFromUtxoHashes: "ErrorSync.loadUtxoCborFromUtxoHashes",
  loadUtxoDetailsList: "ErrorSync.loadUtxoDetailsList",
  loadUtxoByronList: "ErrorSync.loadUtxoByronList",
  loadUtxoByronListByAddress: "ErrorSync.loadUtxoByronListByAddress",
  loadUtxoSpentList: "ErrorSync.loadUtxoSpentList",
  loadStakeInfo: "ErrorSync.loadStakeInfo",
  loadRewardCount: "ErrorSync.loadRewardCount",
  loadTxCborList: "ErrorSync.loadTxCborList",
  loadTxByronList: "ErrorSync.loadTxByronList",
  loadTxHashList: "ErrorSync.loadTxHashList",
  loadTxHashCount: "ErrorSync.loadTxHashCount",
  loadTxHashCountChunk: "ErrorSync.loadTxHashCountChunk",
  hasTxHash: "ErrorSync.hasTxHash",
  hasTxHashes: "ErrorSync.hasTxHashes",
  syncPaymentCredList: "ErrorSync.syncPaymentCredList",
  syncCredUsed: "ErrorSync.syncCredUsed",
  syncBalance: "ErrorSync.syncBalance",
  discoverMultiSig: "ErrorSync.discoverMultiSig",
  syncMultiSigMeta: "ErrorSync.syncMultiSigMeta",
  syncMultiSigCredUsed: "ErrorSync.syncMultiSigCredUsed",
  checkSwapConfirmed: "ErrorSync.checkSwapConfirmed",
  syncSchedulerLedger: "ErrorSync.syncSchedulerLedger",
  syncAccountFinish: "ErrorSync.syncAccountFinish",
  syncAccountReport: "ErrorSync.syncAccountReport",
  runSyncAccount: "ErrorSync.runSyncAccount",
  syncAccountLedgerState: "ErrorSync.syncAccountLedgerState",
  syncAccountLedgerState2: "ErrorSync.syncAccountLedgerState2",
  syncAccountHistory: "ErrorSync.syncAccountHistory",
  syncAccountTxHashList: "ErrorSync.syncAccountTxHashList",
  syncAccountTxHashList2: "ErrorSync.syncAccountTxHashList2",
  syncChainTip: "ErrorSync.syncChainTip",
  syncEpochParams: "ErrorSync.syncEpochParams",
  getGovDRepInfo: "ErrorSync.getGovDRepInfo",
  getGovDRepList: "ErrorSync.getGovDRepList",
  getGovProposalList: "ErrorSync.getGovProposalList",
  getGovProposalVotes: "ErrorSync.getGovProposalVotes",
  getFiatProviders: "ErrorSync.getFiatProviders"
};

const getRestURL = () => {
  const apiURL = new URL(getApiURL());
  return apiURL.protocol + "//" + apiURL.hostname + (apiURL.port ? ":" + apiURL.port : "");
};

var ApiRequestType = /* @__PURE__ */ ((ApiRequestType2) => {
  ApiRequestType2["syncChainTip"] = "/v2/chain/tip";
  ApiRequestType2["syncEpochParams"] = "/v2/chain/epochparams";
  ApiRequestType2["hasTxHashes"] = "/v2/account/has/tx/hashes";
  ApiRequestType2["syncUtxoCbor"] = "/v2/account/sync/utxo/cbor";
  ApiRequestType2["syncUtxoCborFromTx"] = "/v2/account/sync/utxo/cborfromtx";
  ApiRequestType2["syncUtxoCborFromUtxoHashes"] = "/v2/account/sync/utxo/cborfromutxohashes";
  ApiRequestType2["syncUtxoDetails"] = "/v2/account/sync/utxo/details";
  ApiRequestType2["syncUtxoByron"] = "/v2/account/sync/utxo/byron";
  ApiRequestType2["syncUtxoByronByAddress"] = "/v2/account/sync/utxo/byronbyaddress";
  ApiRequestType2["syncUtxoSpent"] = "/v2/account/sync/utxo/spent";
  ApiRequestType2["syncTxCbor"] = "/v2/account/sync/tx/cbor";
  ApiRequestType2["syncTxCborBulk"] = "/v2/account/sync/tx/cbor/bulk";
  ApiRequestType2["syncTxCborExt"] = "/v2/account/sync/tx/cbor/ext";
  ApiRequestType2["syncTxCount"] = "/v2/account/sync/tx/count";
  ApiRequestType2["syncTxHashes"] = "/v2/account/sync/tx/hashes";
  ApiRequestType2["syncPaymentCreds"] = "/v2/account/sync/cred/payment";
  ApiRequestType2["syncCredUsed"] = "/v2/account/sync/cred/used";
  ApiRequestType2["syncTxByron"] = "/v2/account/sync/tx/byron";
  ApiRequestType2["syncStakeInfo"] = "/v2/account/sync/stake/info";
  ApiRequestType2["syncRewardCount"] = "/v2/account/sync/stake/rewardcount";
  ApiRequestType2["syncAccountReport"] = "/v2/account/sync/report";
  ApiRequestType2["syncBalance"] = "/v2/account/sync/balance";
  ApiRequestType2["syncMultiSig"] = "/v2/wallet/sync/multisig";
  ApiRequestType2["syncMultiSigMeta"] = "/v2/wallet/sync/multisig/meta";
  ApiRequestType2["syncMultiSigCredUsed"] = "/v2/wallet/sync/multisig/cred";
  ApiRequestType2["checkSwapConfirmed"] = "/v2/swap/confirmed";
  ApiRequestType2["swapAggEnabled"] = "/v2/swap/aggenabled";
  ApiRequestType2["swapProviders"] = "/v2/swap/providers";
  ApiRequestType2["swapDH"] = "/v2/swap/dh";
  ApiRequestType2["getGovDRepInfo"] = "/v2/gov/drep";
  ApiRequestType2["getGovDRepList"] = "/v2/gov/drep/list";
  ApiRequestType2["getGovProposalList"] = "/v2/gov/proposal/list";
  ApiRequestType2["getGovProposalVotes"] = "/v2/gov/proposal/votes";
  ApiRequestType2["getFiatProviders"] = "/v2/fiat/providers";
  ApiRequestType2["resolveUnstoppableDomain"] = "/v2/unstoppabledomain/resolve";
  return ApiRequestType2;
})(ApiRequestType || {});

const createIApiMessage = (ref) => {
  const msg = { type: ref.type };
  if (ref.networkId) {
    msg.networkId = ref.networkId;
  }
  if (ref.content) {
    msg.content = ref.content;
  }
  if (ref.reqId) {
    msg.reqId = ref.reqId;
  }
  return msg;
};

const getRandomId = () => Math.floor(Math.random() * 999999) + "-" + Math.floor(Math.random() * 999999) + "-" + Math.floor(Math.random() * 999999);
const getShortId = () => Math.floor(Math.random() * 9999) + "-" + Math.floor(Math.random() * 9999);

const requestData = (networkId, accountId, type, _error, postData, handleResponse, doRetry = true) => {
  const timerStart = now();
  const _reqId = getShortId();
  return new Promise(async (resolve, reject) => {
    let toidAbort = -1;
    let toidTimeout = -1;
    const _onError = (err) => {
      clearTimeout(toidAbort);
      clearTimeout(toidTimeout);
      if (typeof err !== "string") {
        err = err?.message ?? "unknownError";
      }
      if (err === "server:data:noresult") ; else {
        error("Error: " + el(_reqId, 10) + ": onError (" + (now() - timerStart) + "ms)", accountId, err);
      }
      return reject(_error + ":" + err + ":" + _reqId);
    };
    let onError = _onError;
    const doRequest = async (attempt = 0) => {
      if (doRetry && attempt === 0) {
        onError = () => doRequest(1);
      } else {
        onError = _onError;
      }
      clearTimeout(toidAbort);
      clearTimeout(toidTimeout);
      const msg = createIApiMessage({ type, networkId, content: postData, reqId: _reqId });
      const timeout = DEFAULT_WS_TIMEOUT_MS;
      const abortController = new AbortController();
      toidAbort = setTimeout(() => {
        abortController.abort("abort");
      }, timeout + 25);
      toidTimeout = setTimeout(() => {
        onError("timeout");
      }, timeout + 50);
      let data;
      try {
        const url = getRestURL() + "/" + networkId + "/v2/api";
        let isText = false;
        data = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(msg),
          signal: abortController.signal
        }).then((res) => res.clone().json().catch(() => {
          isText = true;
          return res.text();
        }));
        if (isText) {
          console.error("rest", url, "---", data, "---");
          data = JSON.parse(data);
        }
        await gotResult(data.data);
      } catch (err) {
        onError(err);
      }
    };
    const gotResult = async (msg) => {
      clearTimeout(toidAbort);
      clearTimeout(toidTimeout);
      const data = msg?.content ?? void 0;
      const reqId = msg?.reqId ?? "";
      if (reqId !== _reqId) {
        return onError("server:reqid:" + reqId + ":" + _reqId);
      }
      if (!data) {
        return onError("server:reqid:missingData:" + _reqId);
      }
      if (data.id !== accountId) {
        return onError("server:accountid:" + data.id + ":" + accountId);
      }
      if (data.error) {
        if (data.error === "timeout") {
          return onError("server:" + data.error);
        }
        return onError("server:data:" + data.error);
      }
      try {
        const res = await handleResponse(data);
        return resolve(res);
      } catch (err) {
        return onError("data:" + err);
      }
    };
    try {
      await doRequest();
    } catch (err) {
      return onError(err);
    }
  });
};

const getRequestData = () => {
  {
    return requestData;
  }
};

const syncEpochParams = (networkId, accountId, epochList) => {
  if (!accountId) {
    accountId = DEFAULT_ACCOUNT_ID;
  }
  return getRequestData()(
    networkId,
    accountId,
    ApiRequestType.syncEpochParams,
    ErrorSync.syncEpochParams,
    {
      id: accountId,
      epochList
    },
    async (data) => data.epochParamList.length > 0 ? data.epochParamList : null
  );
};

const storeId = "epochParamsStore";
const _epochParams = ref(getEpochParams(networkId.value, createIEpochParameterStore(networkId.value)).value);
const epochParams = computed(() => _epochParams.value);
const _loadedOnce = {};
const updateEpochParams = async (chainTip) => {
  if (chainTip.networkId === networkId.value) {
    if (chainTip.epochNo === 0 || epochParams.value.epochNo === chainTip.epochNo && _loadedOnce[networkId.value]) {
      return;
    }
    const __epochParams = await syncEpochParams(networkId.value, storeId, [chainTip.epochNo]);
    if (__epochParams && __epochParams.length === 1) {
      const params = __epochParams[0];
      checkEpochParams(networkId.value, params);
      setEpochParams(networkId.value, params);
      _reloadEpochParams();
      _loadedOnce[networkId.value] = true;
    }
    dispatchSignal(onEpochParamsUpdated);
    return true;
  }
  return _loadedOnce[networkId.value];
};
const checkEpochParams = (_networkId, params) => {
  _networkId = _networkId ?? networkId.value;
  const __epochParams = params ?? epochParams.value;
  if (!__epochParams) {
    throw ChainError.missingEpochParams;
  }
  if (__epochParams.networkId !== _networkId) {
    throw ChainError.networkIdMismatch;
  }
  if (!isNumber(__epochParams.utxoCostPerSize)) {
    throw ChainError.missingUtxoCostPerSize;
  }
  if (!isNumber(__epochParams.maxValueSize)) {
    throw ChainError.missingMaxValueSize;
  }
  if (!isNumber(__epochParams.maxTxSize)) {
    throw ChainError.missingMaxTxSize;
  }
  if (!isNumber(__epochParams.txFeePerByte)) {
    throw ChainError.missingTxFeePerByte;
  }
  if (!isNumber(__epochParams.txFeeFixed)) {
    throw ChainError.missingTxFeeFixed;
  }
  if (!isNumber(__epochParams.stakePoolDeposit)) {
    throw ChainError.missingStakePoolDeposit;
  }
  if (!isNumber(__epochParams.stakeAddressDeposit)) {
    throw ChainError.missingStakeAddressDeposit;
  }
  __epochParams.isAtLeastBabbageEra = __epochParams.protocolVersion.major >= 7;
  __epochParams.isAtLeastConwayEra = __epochParams.protocolVersion.major >= 9;
  __epochParams.isAtLeastConwayEra2 = __epochParams.protocolVersion.major >= 10;
  if (_networkId === "afpm" && __epochParams.utxoCostPerSize === 34482) {
    __epochParams.utxoCostPerSize = 4310;
  }
  return __epochParams;
};
const _reloadEpochParams = () => {
  _epochParams.value = getEpochParams(networkId.value, createIEpochParameterStore(networkId.value)).value;
};
addSignalListener(onNetworkIdUpdated, storeId, () => {
  _reloadEpochParams();
});

export { ApiRequestType as A, onAccountBalancesUpdated as B, doAddWalletToRecovery as C, doRemoveWalletFromRecovery as D, ErrorSync as E, doGetWalletListFromRecovery as F, doUpdateWalletRecoveryData as G, doToggleLockedUtxo as H, doToggleSelectedUtxo as I, onAppAccountAddedToAppWallet as J, doAddAccountToRecovery as K, doGetAccountSettingsFromRecovery as L, syncEpochParams as M, onUIAccountSelected as N, requestData as O, doSetUiSelectedAccount as P, getShortId as Q, __switchSelectedWalletAccount as R, onSelectedAccountIdSet as S, __getSelectedWalletAccountId as _, doClearSelectedUtxos as a, onLockedUtxoToggled as b, checkEpochParams as c, doUpdateAccountBalances as d, epochParams as e, getRequestData as f, getRandomId as g, selectedAccountId as h, doSwitchSelectedWalletAccount as i, getSelectedWalletAccountId as j, updateEpochParams as k, getDappAccountUpdated as l, setDappAccountUpdated as m, getFixedDappWalletId as n, onSwitchSelectedWalletAccount as o, getFixedDappAccountId as p, getDappWalletId as q, getDappAccountId as r, selectedWalletId as s, setDappWalletId as t, useSelectedAccount as u, setDappAccountId as v, setFixedDappWalletId as w, setFixedDappAccountId as x, doToggleFixedDappAccountId as y, onSelectedUtxoToggled as z };
