import { a0 as addSignalListener, w as watch, S as dispatchSignalSync, J as networkId, b5 as isOffscreenMode, b6 as isSignTxMode, U as dispatchSignal, m as el, p as sl, V as json, b7 as setNetworkId, Z as Dexie, r as ref, B as computed, $ as api } from './signData.js';
import { bR as sleep, c4 as onSyncLeader, c5 as useDappAccount, c6 as doPostInitApp, ap as appAccount, c7 as SyncPriority, c8 as doSyncAccount, c9 as onRemoveAllAccountsFromSync, ca as setAppAccountAndWallet, cb as WalletDB, cc as AccountDB, cd as getIAppWallet, aq as getIAppAccount, aW as doReloadAccount, bU as onTxHistoryAccountUpdated, aV as isSyncLeader, ce as doSetActiveApp, cf as loadCSL, cg as loadCMS, ch as getCSLBigNum, ax as doInitApp } from './cms.js';

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
const storeId$1 = "onlyDappAccount";
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
        console.error(el(storeId$1), sl("updateDappAccount"), "reloadAccount", err);
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
addSignalListener(onSyncLeader, storeId$1, (isSyncLeader2) => addAccountToSync(isSyncLeader2));
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
addSignalListener(doPostInitApp, storeId$1, init);

const fileHashSubstringLength = 8;

class GuardBlockListDB extends Dexie {
  entry;
  domain;
  allowlist;
  address;
  asset;
  info;
  constructor() {
    super("eternl-guard-blocklist");
    this.version(2).stores({
      entry: "++id, filename",
      domain: "id, *domain",
      allowlist: "id, *domain",
      address: "id, *address",
      asset: "id, *assets",
      info: "id"
    });
  }
}
let guardBlockListDB = null;
const getDB = async () => {
  let db = guardBlockListDB;
  if (!db) {
    db = new GuardBlockListDB();
    guardBlockListDB = db;
  }
  if (!db.isOpen()) {
    await db.open();
  }
  return db;
};
const bulkAddGuardReport = async (reports) => getDB().then((db) => {
  if (reports.r.length === 0) {
    return;
  }
  db.transaction("rw", [db.info, db.entry, db.domain, db.allowlist, db.asset, db.address], async (tx) => {
    await db.info.clear();
    await db.entry.clear();
    await db.domain.clear();
    await db.allowlist.clear();
    await db.asset.clear();
    await db.address.clear();
    await db.info.put({
      id: 1,
      timestamp: Date.now(),
      lastHash: reports.h
    });
    for (const report of reports.r) {
      let inserted = await db.entry.put({
        filename: report.filename,
        description: report.description
      });
      if (report.domains && report.domains.length > 0) {
        await db.domain.put({
          id: inserted,
          domain: report.domains
        });
      }
      if (report.allowlist && report.allowlist.length > 0) {
        await db.allowlist.put({
          id: inserted,
          domain: report.allowlist
        });
      }
      if (report.related_assets && report.related_assets.length > 0) {
        await db.asset.put({
          id: inserted,
          assets: report.related_assets
        });
      }
      if (report.associated_addresses && report.associated_addresses.length > 0) {
        await db.address.put({
          id: inserted,
          address: report.associated_addresses
        });
      }
    }
  });
});
const getLastImportInfo = () => getDB().then((db) => db.info.get(1));
const findDomain = (url) => getDB().then((db) => db.domain.where("domain").anyOf(url).toArray());
const isBlockedDomain = (url) => getDB().then((db) => db.domain.where("domain").equals(url).toArray().then((res) => res.length > 0));
const isAllowedDomain = (url) => getDB().then((db) => db.allowlist.where("domain").equals(url).toArray().then((res) => res.length > 0));
const findAsset = (asset) => getDB().then((db) => db.asset.where("assets").equals(asset).toArray());
const findAddress = (address) => getDB().then((db) => db.address.where("address").anyOf(address).toArray());
const getScamDomainList = () => getDB().then((db) => db.domain.toArray());
const getScamAddressesList = () => getDB().then((db) => db.address.toArray());
const getScamAssetList = () => getDB().then((db) => db.asset.toArray());
const GuardBlockListDB$1 = {
  bulkAddGuardReport,
  getLastImportInfo,
  isBlockedDomain,
  isAllowedDomain,
  findDomain,
  findAsset,
  findAddress,
  getScamAssetList,
  getScamDomainList,
  getScamAddressesList
};

const spamDomains = ref([]);
const spamAddress = ref([]);
const spamAssets = ref([]);
const useGuard = () => {
  const isDomainOnBlockList = async (urlToCheck) => {
    let url;
    try {
      url = new URL(urlToCheck);
    } catch (err) {
      return false;
    }
    let urlParts = url.hostname.split(".");
    let tld = "";
    let domain = "";
    let checkDomain = "";
    if (urlParts.length > 1) {
      tld = urlParts[urlParts.length - 1] ?? "";
      domain = urlParts[urlParts.length - 2] ?? "";
      checkDomain = domain + "." + tld;
    } else if (urlParts.length === 1) {
      domain = urlParts[urlParts.length - 1] ?? "";
      checkDomain = domain;
    }
    if (await GuardBlockListDB$1.isAllowedDomain(checkDomain)) {
      return false;
    }
    if (await GuardBlockListDB$1.isBlockedDomain(domain)) {
      return true;
    }
    while (urlParts.length > 0) {
      checkDomain = urlParts.join(".");
      if (await GuardBlockListDB$1.isBlockedDomain(checkDomain)) {
        return true;
      }
      urlParts.shift();
      if (urlParts.length === 0) {
        break;
      }
    }
    return false;
  };
  const isAddressOnBlockList = (address) => {
    return spamAddress.value.includes(address);
  };
  const isAssetOnBlockList = (asset) => spamAssets.value.includes(asset);
  const getScamAssetList = () => GuardBlockListDB$1.getScamAssetList();
  const cacheServerScamInfos = async () => {
    const guardDomains = await GuardBlockListDB$1.getScamDomainList();
    for (let domains of guardDomains ?? []) {
      for (let domain of domains.domain ?? []) {
        if (!spamDomains.value.includes(domain)) {
          spamDomains.value.push(domain);
        }
      }
    }
    const guardAssets = await GuardBlockListDB$1.getScamAssetList();
    for (let assets of guardAssets ?? []) {
      for (let asset of assets.assets ?? []) {
        if (!spamAssets.value.includes(asset)) {
          spamAssets.value.push(asset);
        }
      }
    }
    const guardAddress = await GuardBlockListDB$1.getScamAddressesList();
    for (let addresses of guardAddress ?? []) {
      for (let address of addresses.address ?? []) {
        if (!spamAddress.value.includes(address)) {
          spamAddress.value.push(address);
        }
      }
    }
  };
  const isSpamAsset = (asset) => {
    if (spamAssets.value.length === 0) ;
    return spamAssets.value.includes(asset.f);
  };
  const numSpamAssets = computed(() => spamAssets.value.length);
  const _spamAssets = computed(() => spamAssets.value);
  return {
    isDomainOnBlockList,
    isAddressOnBlockList,
    isAssetOnBlockList,
    getScamAssetList,
    spamAssets: _spamAssets,
    isSpamAsset,
    numSpamAssets,
    cacheServerScamInfos
  };
};

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
    const lastImportInfo = await GuardBlockListDB$1.getLastImportInfo();
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
  } = GuardBlockListDB$1;
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

let __initEternlPromise = void 0;
const _initEternlSign = async (progress) => {
  if (progress) {
    progress.value = 0;
  }
  performance.now();
  await Promise.all([loadCSL(networkId.value), loadCMS()]);
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
