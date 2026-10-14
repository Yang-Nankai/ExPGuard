import { aF as removeSignalListener, b2 as onInterval20s, dD as onInterval60s, aM as el, aN as sl, aE as addSignalListener, P as networkId, bL as onNetworkIdUpdated, dE as BroadcastMsgType, aC as dispatchSignal, dF as doSendClose, G as watch, dG as getBackendServer, dH as setNetworkId, aj as api, aX as json, aV as now, ci as doLoadTxAssetMetadata } from './index.js';
import { s as sleep, _ as __getAssetInfoMap, J as AssetDB, K as addAllAssetInfoToMap, L as fetchAssetInfo } from './useAppAccountBalances.js';
import { O as requestData, E as ErrorSync, A as ApiRequestType } from './epochParams.js';
import { o as onUpdateChainTip, a as onUpdateOnTip } from './chainTip.js';
import { dl as onFocus, ax as doInitApp, dj as doSetActiveApp } from './app2.js';
import { o as onAppOpen, a as onAppClose, s as setActiveInstance, b as instanceAppId, u as useDappAccount } from './appState.js';
import { l as loadDecryptedMsgMapFromStore } from './decryptedMsg.js';
import { f as isSupportedNetworkId, n as networkIdList } from './NetworkId.js';
import { j as doLoadContractMapping, C as ContractMappingDB, k as updateContractMapping } from './contractMapping.js';
import { u as useBuildAccount } from './lib.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { u as useGuard, G as GuardBlockListDB } from './useGuards.js';

let __initEternlPromise = void 0;
const _initEternlPromise = new Promise(async (resolve, reject) => {
  while (!__initEternlPromise) {
    await sleep(50);
  }
  await __initEternlPromise;
  return resolve();
});
const getEternlInitPromise = () => _initEternlPromise;
const setEternlInitPromise = (p) => {
  __initEternlPromise = p;
};

const doLog$1 = false;
const storeId$8 = "chainTipRestStore";
let _numFailedCalls = 999;
const onPullChainTipInterval = async () => {
  removeSignalListener(onInterval20s, storeId$8, doLog$1);
  removeSignalListener(onInterval60s, storeId$8, doLog$1);
  let updated = false;
  try {
    const chainTip = await requestChainTip();
    if (doLog$1) ;
    if (chainTip && chainTip.blockNo > 0) {
      onUpdateChainTip(chainTip);
      updated = true;
      _numFailedCalls = 0;
      addSignalListener(onInterval60s, storeId$8, onPullChainTipInterval, doLog$1);
    } else {
      addSignalListener(onInterval20s, storeId$8, onPullChainTipInterval, doLog$1);
    }
  } catch (err) {
    addSignalListener(onInterval20s, storeId$8, onPullChainTipInterval, doLog$1);
  }
  if (!updated) {
    onUpdateOnTip(++_numFailedCalls);
  }
};
const updateChainTip = async () => {
  await onPullChainTipInterval();
  return true;
};
const requestChainTip = () => {
  return requestData(
    networkId.value,
    storeId$8,
    ApiRequestType.syncChainTip,
    ErrorSync.syncChainTip,
    {
      id: storeId$8
    },
    async (data) => {
      return data.chainTip;
    }
  );
};

const storeId$7 = "chainTipController";
const startPullingChainTip = async (log) => {
  return updateChainTip();
};
addSignalListener(onFocus, storeId$7, () => startPullingChainTip());
addSignalListener(doInitApp, storeId$7, () => startPullingChainTip());
addSignalListener(onNetworkIdUpdated, storeId$7, () => startPullingChainTip());

const storeId$6 = "appController";
addSignalListener(BroadcastMsgType.open, storeId$6, onAppOpen);
addSignalListener(BroadcastMsgType.close, storeId$6, onAppClose);
addSignalListener(doSetActiveApp, storeId$6, setActiveInstance);
addSignalListener(onFocus, storeId$6, setActiveInstance);
const _beforeunload = async () => {
  await dispatchSignal(doSendClose, instanceAppId);
  return false;
};
const init$1 = () => {
  const isSupported = typeof window !== "undefined";
  if (!isSupported) {
    return;
  }
  window.addEventListener("beforeunload", _beforeunload);
};
init$1();

const storeId$5 = "backendServerController";
const init = () => {
  watch(networkId, () => setNetworkId(networkId.value), { immediate: true });
  setInterval(() => getBackendServer(networkId.value, true), 5 * 60 * 1e3);
};
addSignalListener(doInitApp, storeId$5, init);

const storeId$4 = "decryptedMsgController";
const load$2 = () => {
  return loadDecryptedMsgMapFromStore();
};
addSignalListener(doInitApp, storeId$4, load$2);

const storeId$3 = "contractMappingAPI";
const pullContractMapping = async (networkId) => {
  if (!isSupportedNetworkId(networkId)) {
    throw new Error("Error: pullContractMapping: network not supported: " + networkId);
  }
  const url = "/dapp/mapping/entries.payment.json";
  const res = await api.get(url).catch((err) => {
    console.error(el(storeId$3), el("pullContractMapping"), json(err));
  });
  if (res) {
    return res;
  }
  return null;
};

const doLog = false;
const storeId$2 = "contractController";
let _lastUpdateMap = networkIdList.reduce((o, n) => {
  o[n] = -1;
  return o;
}, {});
const loadContractMappingData = async () => {
  removeSignalListener(onInterval60s, storeId$2);
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
  addSignalListener(onInterval60s, storeId$2, loadContractMappingData);
  return true;
};
const load$1 = () => {
  return loadContractMappingData();
};
addSignalListener(doLoadContractMapping, storeId$2, load$1);

const storeId$1 = "assetV2Controller";
const MAX_CHUNK_SIZE = 1e3;
const ASSET_INFO_TTL = 1e3 * 60 * 60 * 24 * 7;
let _syncStart = -1;
let _syncStartTx = -1;
const handleAccountAssets = async () => {
  if (_syncStart > 0) {
    return;
  }
  _syncStart = now();
  const balanceList = [];
  const accountIdSet = /* @__PURE__ */ new Set();
  if (selectedAccount.appAccount.value) {
    accountIdSet.add(selectedAccount.appAccount.value.id);
    balanceList.push(selectedAccount.appAccount.value.data.balance);
  }
  if (dappAccount.dappAccount.value && !accountIdSet.has(dappAccount.dappAccount.value.id)) {
    balanceList.push(dappAccount.dappAccount.value.data.balance);
  }
  if (buildAccount.buildAccount.value && !accountIdSet.has(buildAccount.buildAccount.value.id)) {
    balanceList.push(buildAccount.buildAccount.value.data.balance);
  }
  const _assetInfoMap = __getAssetInfoMap();
  for (const balance of balanceList) {
    if (!balance) {
      continue;
    }
    if (!balance.multiasset) {
      continue;
    }
    const newAssetMap = {};
    const multiAssetList = Object.entries(balance.multiasset);
    let numTotal = 0;
    let numNew = 0;
    for (const multiAsset of multiAssetList) {
      const policyId = multiAsset[0];
      const assetNameList = Object.keys(multiAsset[1]);
      numTotal += assetNameList.length;
      const assetInfoMap = _assetInfoMap.get(policyId);
      if (assetInfoMap) {
        const knownAssetNameList = Object.keys(assetInfoMap);
        for (let i = assetNameList.length - 1; i >= 0; i--) {
          if (knownAssetNameList.includes(assetNameList[i])) {
            assetNameList.splice(i, 1);
          }
        }
      }
      if (assetNameList.length > 0) {
        newAssetMap[policyId] = assetNameList;
        numNew += assetNameList.length;
      }
    }
    if (numNew === 0) {
      continue;
    }
    const unknownAssets = {};
    const dbAssetInfoMap = await AssetDB.getAssets(networkId.value, newAssetMap) ?? {};
    addAllAssetInfoToMap(dbAssetInfoMap);
    let numDb = 0;
    const newAssetsEntries = Object.entries(newAssetMap);
    for (const entry of newAssetsEntries) {
      const policyId = entry[0];
      const assetNameList = entry[1];
      const dbAssetInfoList = dbAssetInfoMap[policyId];
      if (!dbAssetInfoList) {
        unknownAssets[policyId] = assetNameList;
      } else {
        numDb += dbAssetInfoList.length;
        const dbAssetNameList = dbAssetInfoList.map((a) => a.h);
        unknownAssets[policyId] = assetNameList.filter((hex) => !dbAssetNameList.includes(hex));
        for (const dbAsset of dbAssetInfoList) {
          if ((dbAsset.t ?? 0) + ASSET_INFO_TTL < _syncStart) {
            unknownAssets[policyId].push(dbAsset.h);
            numDb--;
          }
        }
      }
    }
    let numUnknown = numNew - numDb;
    if (numUnknown === 0) {
      continue;
    }
    const fetchedAssets = {};
    let startChunk = now();
    while (numUnknown > 0) {
      startChunk = now();
      const chunk = {};
      let chunkSize = 0;
      for (const policyId in unknownAssets) {
        chunk[policyId] = unknownAssets[policyId];
        chunkSize += unknownAssets[policyId].length;
        delete unknownAssets[policyId];
        if (chunkSize > MAX_CHUNK_SIZE) {
          break;
        }
      }
      if (chunkSize === 0) {
        break;
      }
      numUnknown -= chunkSize;
      const _fetchedAssets = await fetchAssetInfo(networkId.value, chunk);
      for (const policyId in _fetchedAssets) {
        for (const asset of _fetchedAssets[policyId]) {
          asset.t = startChunk;
        }
        fetchedAssets[policyId] = _fetchedAssets[policyId];
      }
      addAllAssetInfoToMap(dbAssetInfoMap);
      await AssetDB.putAssets(networkId.value, fetchedAssets);
    }
  }
  _syncStart = -1;
};
const loadMissingMetadata = async (multiasset) => {
  if (_syncStartTx > 0) {
    return;
  }
  _syncStartTx = now();
  const balanceList = [];
  const accountIdSet = /* @__PURE__ */ new Set();
  if (selectedAccount.appAccount.value) {
    accountIdSet.add(selectedAccount.appAccount.value.id);
    balanceList.push(selectedAccount.appAccount.value.data.balance);
  }
  if (dappAccount.dappAccount.value && !accountIdSet.has(dappAccount.dappAccount.value.id)) {
    balanceList.push(dappAccount.dappAccount.value.data.balance);
  }
  if (buildAccount.buildAccount.value && !accountIdSet.has(buildAccount.buildAccount.value.id)) {
    balanceList.push(buildAccount.buildAccount.value.data.balance);
  }
  const _assetInfoMap = __getAssetInfoMap();
  const newAssetMap = {};
  const multiAssetList = Object.entries(multiasset);
  let numTotal = 0;
  let numNew = 0;
  for (const multiAsset of multiAssetList) {
    const policyId = multiAsset[0];
    const assetNameList = Object.keys(multiAsset[1]);
    numTotal += assetNameList.length;
    const assetInfoMap = _assetInfoMap.get(policyId);
    if (assetInfoMap) {
      const knownAssetNameList = Object.keys(assetInfoMap);
      for (let i = assetNameList.length - 1; i >= 0; i--) {
        if (knownAssetNameList.includes(assetNameList[i])) {
          assetNameList.splice(i, 1);
        }
      }
    }
    if (assetNameList.length > 0) {
      newAssetMap[policyId] = assetNameList;
      numNew += assetNameList.length;
    }
  }
  if (numNew === 0) {
    return;
  }
  const unknownAssets = {};
  const dbAssetInfoMap = await AssetDB.getAssets(networkId.value, newAssetMap) ?? {};
  addAllAssetInfoToMap(dbAssetInfoMap);
  let numDb = 0;
  const newAssetsEntries = Object.entries(newAssetMap);
  for (const entry of newAssetsEntries) {
    const policyId = entry[0];
    const assetNameList = entry[1];
    const dbAssetInfoList = dbAssetInfoMap[policyId];
    if (!dbAssetInfoList) {
      unknownAssets[policyId] = assetNameList;
    } else {
      numDb += dbAssetInfoList.length;
      const dbAssetNameList = dbAssetInfoList.map((a) => a.h);
      unknownAssets[policyId] = assetNameList.filter((hex) => !dbAssetNameList.includes(hex));
      for (const dbAsset of dbAssetInfoList) {
        if ((dbAsset.t ?? 0) + ASSET_INFO_TTL < _syncStartTx) {
          unknownAssets[policyId].push(dbAsset.h);
          numDb--;
        }
      }
    }
  }
  let numUnknown = numNew - numDb;
  if (numUnknown === 0) {
    return;
  }
  const fetchedAssets = {};
  let startChunk = now();
  while (numUnknown > 0) {
    startChunk = now();
    const chunk = {};
    let chunkSize = 0;
    for (const policyId in unknownAssets) {
      chunk[policyId] = unknownAssets[policyId];
      chunkSize += unknownAssets[policyId].length;
      delete unknownAssets[policyId];
      if (chunkSize > MAX_CHUNK_SIZE) {
        break;
      }
    }
    if (chunkSize === 0) {
      break;
    }
    numUnknown -= chunkSize;
    const _fetchedAssets = await fetchAssetInfo(networkId.value, chunk);
    for (const policyId in _fetchedAssets) {
      for (const asset of _fetchedAssets[policyId]) {
        asset.t = startChunk;
      }
      fetchedAssets[policyId] = _fetchedAssets[policyId];
    }
    addAllAssetInfoToMap(dbAssetInfoMap);
    await AssetDB.putAssets(networkId.value, fetchedAssets);
  }
  _syncStartTx = -1;
};
const buildAccount = useBuildAccount();
const dappAccount = useDappAccount();
const selectedAccount = useSelectedAccount();
watch(buildAccount.accountBalance, () => {
  handleAccountAssets();
}, { deep: true });
watch(dappAccount.accountBalance, () => {
  handleAccountAssets();
}, { deep: true });
watch(selectedAccount.accountBalance, () => {
  handleAccountAssets();
}, { deep: true });
addSignalListener(doLoadTxAssetMetadata, storeId$1, loadMissingMetadata);

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
const storeId = "guardController";
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
const load = () => {
  if (_loadedOnce) {
    return;
  }
  _loadedOnce = true;
  loadGuard();
};
addSignalListener(doSetActiveApp, storeId, load);

export { getEternlInitPromise as g, setEternlInitPromise as s };
