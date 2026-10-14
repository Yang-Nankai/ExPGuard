import { a1 as addSignalListener, w as watch, S as dispatchSignalSync, J as networkId, c8 as isOffscreenMode, c9 as isSignTxMode, a0 as dispatchSignal, m as el, p as sl, U as json, ca as setNetworkId, Z as api, r as ref, cb as isSupportedNetworkId, n as networkIdList, b1 as removeSignalListener } from './signTx.js';
import { bg as sleep, dy as onSyncLeader, dm as useDappAccount, dz as doPostInitApp, au as appAccount, dA as SyncPriority, dB as doSyncAccount, dC as onRemoveAllAccountsFromSync, dD as setAppAccountAndWallet, dE as WalletDB, d3 as AccountDB, cP as getIAppWallet, av as getIAppAccount, b1 as doReloadAccount, bj as onTxHistoryAccountUpdated, b0 as isSyncLeader, cp as useGuard, dF as doSetActiveApp, dG as GuardBlockListDB, aD as doInitApp, dH as loadDecryptedMsgMapFromStore, dI as doLoadContractMapping, bX as onInterval60s, O as now, dJ as ContractMappingDB, dK as updateContractMapping, dL as loadAddressBook, dM as loadCSL, dN as getCSLBigNum } from './useDetailedTxInfo.js';

let __initEternlPromise$1 = void 0;
const _initEternlPromise = new Promise(async (resolve, reject) => {
  while (!__initEternlPromise$1) {
    await sleep(50);
  }
  await __initEternlPromise$1;
  return resolve();
});
const getEternlInitPromise = () => _initEternlPromise;
const setEternlInitPromise = (p) => {
  __initEternlPromise$1 = p;
};

const doLogAction = false;
const storeId$5 = "onlyDappAccount";
let _toid = -1;
const {
  dappAccountId,
  dappWalletId,
  dappAccountUpdated
} = useDappAccount();
const updateDappAccount = async () => {
  const walletId = dappWalletId.value;
  const accountId = dappAccountId.value;
  if (!walletId || !accountId) {
    setAppAccountAndWallet(null, null);
    return;
  }
  const walletList = await WalletDB.getWalletDataList(networkId.value);
  let appAccount2 = null;
  let appWallet = null;
  for (const walletData of walletList) {
    const wallet = walletData.wallet;
    if (wallet.id === walletId) {
      const accountList = wallet.accountList;
      for (const account of accountList) {
        if (account.id === accountId) {
          const accountData = await AccountDB.getAccountData(networkId.value, account);
          if (!accountData) {
            break;
          }
          appWallet = getIAppWallet(walletId, walletData, true);
          appAccount2 = getIAppAccount(accountId, walletId, accountData);
          break;
        }
      }
      if (appWallet && appAccount2) {
        break;
      }
    }
  }
  if (!appAccount2) {
    appAccount2 = null;
    appWallet = null;
  } else {
    if (isOffscreenMode() || isSignTxMode()) {
      try {
        await dispatchSignal(doReloadAccount, appAccount2);
        if (doLogAction) ;
        if (!appAccount2.utxoMap) {
          appAccount2 = null;
          appWallet = null;
        }
      } catch (err) {
        console.error(el(storeId$5), sl("updateDappAccount"), "reloadAccount", err);
        appAccount2 = null;
        appWallet = null;
      }
    }
  }
  setAppAccountAndWallet(appAccount2, appWallet);
  dispatchSignalSync(onTxHistoryAccountUpdated, appAccount2);
  addAccountToSync(isSyncLeader());
  await setNetworkId(networkId.value);
};
const addAccountToSync = (isSyncLeader2) => {
  if (isSyncLeader2 && appAccount.value) {
    dispatchSignalSync(doSyncAccount, appAccount.value, SyncPriority.high);
  } else {
    dispatchSignalSync(onRemoveAllAccountsFromSync);
  }
};
addSignalListener(onSyncLeader, storeId$5, (isSyncLeader2) => addAccountToSync(isSyncLeader2));
watch(dappAccountUpdated, () => {
  clearTimeout(_toid);
  _toid = setTimeout(() => {
    updateDappAccount();
  }, 250);
}, { immediate: true });
const init = async () => {
  await setNetworkId(networkId.value);
  await updateDappAccount();
};
addSignalListener(doPostInitApp, storeId$5, init);

const fileHashSubstringLength = 8;

const callAPIPost = async (url, payload, networkId, commit, onError) => {
  try {
    if (networkId === null) {
      throw new Error("Error: callAPIPost: no valid network set");
    }
    const res = await api.post("/" + networkId + url, payload);
    commit(res);
  } catch (e) {
    if (onError) {
      onError(e);
    }
  }
};

const {
  cacheServerScamInfos
} = useGuard();
let _lastUpdate = -1;
let _toId = setTimeout(() => {
});
const storeId$4 = "guardController";
const loadGuard = async () => {
  clearTimeout(_toId);
  if (_lastUpdate + 12 * 60 * 1e3 < Date.now()) {
    const lastImportInfo = await GuardBlockListDB.getLastImportInfo();
    let hash = null;
    if (lastImportInfo && lastImportInfo.lastHash) {
      hash = lastImportInfo.lastHash.substring(0, fileHashSubstringLength);
    }
    await callAPIPost("/v2/misc/guard", { h: hash }, networkId.value, onLoadList, onErrorList);
  }
  await cacheServerScamInfos();
  _toId = setTimeout(() => {
    loadGuard();
  }, 15 * 60 * 1e3);
};
const processReportImport = async (blockListImport) => {
  const {
    bulkAddGuardReport,
    getLastImportInfo
  } = GuardBlockListDB;
  let importInfo = await getLastImportInfo();
  if (importInfo && importInfo.lastHash === blockListImport.h) {
    return;
  }
  await bulkAddGuardReport(blockListImport);
  importInfo = await getLastImportInfo();
  _lastUpdate = importInfo?.timestamp ?? Date.now();
};
const onLoadList = async (data) => {
  if (data?.data) {
    const reports = data.data;
    await processReportImport(reports);
  } else {
    await onErrorList();
  }
};
const onErrorList = async () => {
};
let _loadedOnce = false;
const load$3 = () => {
  if (_loadedOnce) {
    return;
  }
  _loadedOnce = true;
  loadGuard();
};
addSignalListener(doSetActiveApp, storeId$4, load$3);

ref(true);

const storeId$3 = "decryptedMsgController";
const load$2 = () => {
  return loadDecryptedMsgMapFromStore();
};
addSignalListener(doInitApp, storeId$3, load$2);

const storeId$2 = "contractMappingAPI";
const pullContractMapping = async (networkId) => {
  if (!isSupportedNetworkId(networkId)) {
    throw new Error("Error: pullContractMapping: network not supported: " + networkId);
  }
  const url = "/dapp/mapping/entries.payment.json";
  const res = await api.get(url).catch((err) => {
    console.error(el(storeId$2), el("pullContractMapping"), json(err));
  });
  if (res) {
    return res;
  }
  return null;
};

const doLog = false;
const storeId$1 = "contractController";
let _lastUpdateMap = networkIdList.reduce((o, n) => {
  o[n] = -1;
  return o;
}, {});
const loadContractMappingData = async () => {
  removeSignalListener(onInterval60s, storeId$1);
  if (now() > _lastUpdateMap[networkId.value] + 4 * 60 * 60 * 1e3) {
    try {
      const res = await pullContractMapping(networkId.value);
      if (doLog) ;
      if (!res) {
        throw new Error();
      }
      res.id = networkId.value;
      await ContractMappingDB.putData(res);
      _lastUpdateMap[networkId.value] = now();
      await updateContractMapping();
      if (doLog) ;
    } catch (err) {
    }
  }
  addSignalListener(onInterval60s, storeId$1, loadContractMappingData);
  return true;
};
const load$1 = () => {
  return loadContractMappingData();
};
addSignalListener(doLoadContractMapping, storeId$1, load$1);

const storeId = "addressBookController";
const load = () => {
  return loadAddressBook();
};
addSignalListener(doInitApp, storeId, load);

let __initEternlPromise = void 0;
const _initEternlSign = async (progress) => {
  if (progress) {
    progress.value = 0;
  }
  performance.now();
  await Promise.all([loadCSL(networkId.value)]);
  if (progress) {
    progress.value = 25;
  }
  await Promise.all([
    dispatchSignal(doSetActiveApp),
    // doSetActiveApp -> onSyncLeader for managerV2
    waitForCSL()
  ]);
  if (progress) {
    progress.value = Math.floor(50 + 25 * Math.random());
  }
  await dispatchSignal(doInitApp);
  await dispatchSignal(doPostInitApp);
  if (progress) {
    progress.value = 100;
  }
};
const initEternl = (progress) => {
  if (!__initEternlPromise) {
    __initEternlPromise = _initEternlSign(progress);
    setEternlInitPromise(__initEternlPromise);
  }
  return getEternlInitPromise();
};
const waitCSLInit = new Promise((resolve) => {
  const intervalId = setInterval(() => {
    if (globalThis["cslInitialized"]) {
      const num = getCSLBigNum("1000");
      num.free();
      clearInterval(intervalId);
      resolve(true);
    }
  }, 50);
});
const waitForCSL = () => {
  return waitCSLInit;
};

export { _initEternlSign, initEternl };
