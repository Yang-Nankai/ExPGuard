import { D as computed, e as ref, G as watch, aE as addSignalListener, aC as dispatchSignal } from './index.js';
import { c as getDateIdFromSlot } from './chain.js';
import { H as HistoryDB } from './history.js';
import { A as searchForAssetId } from './useAppAccountBalances.js';
import { aB as onTxHistoryAccountUpdated, aa as onAccountDataUpdated, d2 as doUpdatePendingTxStatus } from './app2.js';
import { d as appUseUtc, b as appTimezone } from './language.js';

const storeId = "txHistoryController";
const appAccount = ref(null);
const accountData = ref(null);
const _isUpdating = ref(false);
const _numTxTotal = ref(0);
const _numTxLoaded = ref(0);
const _numItemsPerPage = ref(10);
const _numMaxSearchResults = ref(1e4);
const _txList = ref([]);
const _txListFirst = ref([]);
const _searchConfig = ref(null);
const _dbPage = computed(() => (currentPage.value - 1) * _numItemsPerPage.value);
const _txListPage = computed(() => {
  const numItems = _txList.value.length;
  let endIndex = Math.min(_dbPage.value + _numItemsPerPage.value, numItems);
  if (!!_searchConfig.value) {
    return _txList.value.slice(_dbPage.value, endIndex);
  }
  return _txList.value;
});
const _txListDatePage = computed(() => {
  const list = [];
  const _appAccount = appAccount.value;
  if (!_appAccount) {
    return [];
  }
  const networkId = _appAccount.data.state.networkId;
  const tz = appUseUtc.value ? "UTC" : appTimezone.value;
  for (const entry of _txListPage.value) {
    const dateId = getDateIdFromSlot(networkId, entry.slot, tz);
    const _dateTimestamp = Date.UTC(dateId.year, dateId.month - 1, dateId.day);
    const listEntry = list.find((item) => item.date === _dateTimestamp);
    if (!listEntry) {
      list.push({
        date: _dateTimestamp,
        txList: [entry]
      });
    } else {
      listEntry.txList.push(entry);
    }
  }
  return list;
});
const txListRecentNumEntries = ref(3);
const _txListRecentPage = computed(() => {
  return _txListFirst.value.slice(0, txListRecentNumEntries.value);
});
const isUpdating = computed(() => _isUpdating.value);
computed(() => _txList.value);
const txListPage = computed(() => _txListPage.value);
const txListRecentPage = computed(() => _txListRecentPage.value);
const txListDatePage = computed(() => _txListDatePage.value);
const hasSearchConfig = computed(() => !!_searchConfig.value);
const numTxTotalAccount = computed(() => appAccount.value?.data.state.numTxHashes ?? 0);
const numTxTotal = computed(() => _numTxTotal.value);
const numTxLoaded = computed(() => _numTxLoaded.value);
const numItemsPerPage = computed(() => _numItemsPerPage.value);
computed(() => _numMaxSearchResults.value);
const numPages = computed(() => Math.ceil(numTxTotal.value / _numItemsPerPage.value));
const currentPage = ref(1);
const first = ref();
let _lastAccountId = "";
const initTxList = async (numItemsPerPage2 = 10, numMaxSearchResults2 = 1e4) => {
  resetTxList();
  _numItemsPerPage.value = numItemsPerPage2;
  _numMaxSearchResults.value = numMaxSearchResults2;
  if (_searchConfig.value) {
    await searchTxList(_searchConfig.value);
  } else {
    await updateTxList(true);
  }
};
const updateTxList = async (doUpdateNumbers) => {
  const _appAccount = appAccount.value;
  if (!_appAccount) {
    return resetTxList();
  }
  const networkId = _appAccount.data.state.networkId;
  const accountId = _appAccount.id;
  const state = _appAccount.data.state;
  if (_lastAccountId !== accountId) {
    _isUpdating.value = true;
  }
  _lastAccountId = accountId;
  if (doUpdateNumbers) {
    const numTx = state.numTxHashes;
    const numTxNotLoaded = state.numTxHashesUninitialized;
    _numTxTotal.value = numTx;
    _numTxLoaded.value = numTx - numTxNotLoaded;
  }
  let total = _numTxTotal.value;
  let offset = _dbPage.value;
  let limit = _numItemsPerPage.value;
  _txList.value = await HistoryDB.getTxHistory(networkId, accountId, total, limit, offset);
  _txListFirst.value = await HistoryDB.getTxHistory(networkId, accountId, total, txListRecentNumEntries.value, 0);
  await dispatchSignal(doUpdatePendingTxStatus);
  _isUpdating.value = false;
};
const searchTxList = async (config) => {
  if (!config || !Object.values(config).some((c) => c !== null && (Array.isArray(c) ? c.length > 0 : true))) {
    _searchConfig.value = null;
    return updateTxList(true);
  }
  const _appAccount = appAccount.value;
  if (!_appAccount) {
    return resetTxList();
  }
  _isUpdating.value = true;
  const networkId = _appAccount.data.state.networkId;
  const accountId = _appAccount.id;
  const multipleSearchList = config.searchStrList;
  if (config.searchStr && config.searchStr.length > 0 && !multipleSearchList.includes(config.searchStr)) {
    multipleSearchList.push(config.searchStr);
  }
  const txBalanceList = [];
  if (multipleSearchList.length > 0) {
    const additionalAssetIdList = [];
    for (let i = 0; i < multipleSearchList.length; i++) {
      const searchStr = multipleSearchList[i];
      const assetIdList = searchForAssetId(searchStr);
      if (assetIdList && (assetIdList?.length ?? 0) > 0) {
        for (const assetId of assetIdList) {
          if (!additionalAssetIdList.includes(assetId)) {
            additionalAssetIdList.push(assetId);
          }
        }
      }
    }
    config.searchStrList.push(...additionalAssetIdList);
  }
  const txList2 = await searchTxHistory(networkId, accountId, config, _numMaxSearchResults.value);
  txBalanceList.push(...txList2);
  _searchConfig.value = config;
  txBalanceList.sort((a, b) => b.slot - a.slot);
  _txList.value = txBalanceList;
  _numTxTotal.value = _txList.value.length;
  currentPage.value = 1;
  first.value = 0;
  _isUpdating.value = false;
};
const resetTxList = () => {
  _numTxTotal.value = 0;
  currentPage.value = 1;
  first.value = 0;
  _txList.value = [];
  _isUpdating.value = false;
};
const searchTxHistory = async (networkId, accountId, config, limit) => {
  const res1 = await HistoryDB.searchTxBalance(networkId, accountId, config, limit);
  const res2 = await HistoryDB.searchTxBalanceByContract(networkId, accountId, config, res1.map((tx) => tx.hash), limit ? limit - res1.length : limit);
  return res1.concat(res2).sort((a, b) => b.slot - a.slot || b.idx - a.idx);
};
const updateCurrentData = async (doUpdateNumbers = false) => {
  if (hasSearchConfig.value) ; else {
    await updateTxList(doUpdateNumbers);
  }
};
watch(currentPage, () => {
  updateCurrentData();
});
watch(accountData, (value) => {
  initTxList();
});
addSignalListener(onTxHistoryAccountUpdated, storeId, (_appAccount) => {
  appAccount.value = _appAccount ?? null;
  accountData.value = _appAccount?.data ?? null;
});
addSignalListener(onAccountDataUpdated, storeId, (_appAccount) => {
  if (_appAccount.id === appAccount.value?.id) {
    return updateCurrentData(true);
  }
});

export { txListRecentNumEntries as a, numTxTotalAccount as b, numTxLoaded as c, numPages as d, numItemsPerPage as e, first as f, currentPage as g, txListDatePage as h, isUpdating as i, txListPage as j, numTxTotal as n, searchTxList as s, txListRecentPage as t };
