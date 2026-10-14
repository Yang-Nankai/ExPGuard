import { P as networkId, ba as trimAllStrings, bp as Dexie } from './index.js';
import { j as networkAddressPrefix } from './NetworkId.js';
import { T as AccountDB, Z as RefDB, a5 as ITxBalanceType } from './app2.js';
import { g as getContractAddressesByLabel } from './contractMapping.js';

const txHashReg = /^[0-9a-f]{64}$/;
const putTxBalance = (networkId2, id, item) => AccountDB.getDB(networkId2, id).then((db) => db.txList.put(item));
const bulkPutTxBalanceList = (networkId2, id, itemList) => AccountDB.getDB(networkId2, id).then((db) => db.txList.bulkPut(itemList));
const getTxBalanceList = (networkId2, id, limit = 20, offset = 0, reverse = true, config) => {
  return AccountDB.getDB(networkId2, id).then((db) => {
    return db.transaction("r", [db.txList], async (tx) => {
      let query = db.txList.orderBy("[slot+idx+t]");
      if (config) {
        let res = applyQuerySearch(db.txList, config);
        if (res && res.query) {
          query = res.query;
        }
      }
      if (reverse) {
        return (await query.reverse().offset(offset).limit(limit).toArray()).sort((a, b) => {
          const slotDiff = b.slot - a.slot;
          if (slotDiff !== 0) {
            return slotDiff;
          }
          return b.idx - a.idx;
        });
      } else {
        return (await query.offset(offset).limit(limit).toArray()).sort((a, b) => {
          const slotDiff = b.slot - a.slot;
          if (slotDiff !== 0) {
            return slotDiff;
          }
          return b.idx - a.idx;
        });
      }
    });
  });
};
const getTxBalanceListOldest = (networkId2, id, limit = 20, offset = 0) => {
  return AccountDB.getDB(networkId2, id).then((db) => {
    return db.transaction("r", [db.txList], async (tx) => {
      const query = db.txList.orderBy("slot");
      return query.offset(offset).limit(limit).toArray();
    });
  });
};
const getTxHashList = (networkId2, id) => AccountDB.getDB(networkId2, id).then((db) => db.txList.toCollection().primaryKeys());
const getTxBalanceListTest = (networkId2, id) => AccountDB.getDB(networkId2, id).then((db) => db.txList.toArray());
const hasUninitializedTx = (networkId2, id) => AccountDB.getDB(networkId2, id).then((db) => db.txList.where("t").equals(ITxBalanceType.uninitialized).limit(1).count());
const getTxBalanceListCounts = (networkId2, id) => AccountDB.getDB(networkId2, id).then(async (db) => {
  const calls = [];
  calls.push(db.txList.count());
  calls.push(db.txList.where("t").equals(ITxBalanceType.uninitialized).count());
  const res = await Promise.all(calls);
  const numTxHashes = res[0];
  const numTxHashesUninitialized = res[1];
  return { numTxHashes, numTxHashesUninitialized };
});
const getFirstUninitialized = (networkId2, id) => AccountDB.getDB(networkId2, id).then((db) => db.txList.where("[slot+idx+t]").below([Dexie.maxKey, Dexie.maxKey, ITxBalanceType.withdrawal]).first());
const getLastUninitialized = (networkId2, id) => AccountDB.getDB(networkId2, id).then((db) => db.txList.where("[slot+idx+t]").below([Dexie.maxKey, Dexie.maxKey, ITxBalanceType.withdrawal]).last());
const getNextUninitialized = (networkId2, id, limit) => AccountDB.getDB(networkId2, id).then((db) => {
  return db.transaction("r", [db.txList], (tx) => {
    return db.txList.orderBy("slot").reverse().and((tx2) => tx2.t === ITxBalanceType.uninitialized).limit(limit).toArray();
  });
});
const searchTxBalanceByContract = async (networkId2, id, config, excludeTxList = [], limit = 100) => {
  let searchStrList = [];
  const addrList = [];
  const addrIdList = [];
  if (config.searchStr || config.searchStrList.length > 0) {
    searchStrList = [...config.searchStrList];
    if (config.searchStr) {
      for (const searchStr of trimAllStrings(config.searchStr.trim().split(","))) {
        if (searchStr.length > 0 && !searchStrList.includes(searchStr)) {
          searchStrList.push(searchStr);
        }
      }
    }
    for (let i = searchStrList.length - 1; i >= 0; i--) {
      const searchStr = searchStrList[i] = searchStrList[i]?.toLowerCase();
      const contractAddrList = getContractAddressesByLabel([searchStr]);
      if (contractAddrList.length > 0) {
        addrList.push(...contractAddrList);
        searchStrList.splice(i, 1);
      }
    }
    if (addrList.length > 0) {
      addrIdList.push(...await RefDB.getRefListByRefs(networkId2, id, addrList));
    }
  }
  if (addrIdList.length === 0) {
    return [];
  }
  return AccountDB.getDB(networkId2, id).then(
    (db) => db.txList.where("al").anyOf(addrIdList).distinct().sortBy("[slot+idx+t]").then((matches) => matches.filter((m) => !excludeTxList.includes(m.hash)).slice(-limit))
  );
};
const applyQuerySearch = (db, config) => {
  let query = db.orderBy("slot");
  if (typeof config.slotStart === "number" && typeof config.slotEnd === "number") {
    query = db.where("[slot+idx+t]").between([config.slotStart, Dexie.minKey, Dexie.minKey], [config.slotEnd, Dexie.maxKey, Dexie.maxKey], true, true).reverse();
  } else if (typeof config.slotStart === "number") {
    query = db.where("[slot+idx+t]").aboveOrEqual([config.slotStart, Dexie.minKey, Dexie.minKey]).reverse();
  } else if (typeof config.slotEnd === "number") {
    query = db.where("[slot+idx+t]").belowOrEqual([config.slotEnd, Dexie.maxKey, Dexie.maxKey]).reverse();
  }
  const isSorted = !!query;
  if (typeof config.coinLow === "number" && typeof config.coinHigh === "number") {
    query = query ? query.and((tx) => tx.c >= config.coinLow && tx.c <= config.coinHigh && tx.t !== 0) : db.where("c").between(config.coinLow, config.coinHigh, true, true).and((tx) => tx.t !== 0);
  } else if (typeof config.coinLow === "number") {
    query = query ? query.and((tx) => tx.c >= config.coinLow && tx.t !== 0) : db.where("c").aboveOrEqual(config.coinLow).and((tx) => tx.t !== 0);
  } else if (typeof config.coinHigh === "number") {
    query = query ? query.and((tx) => tx.c <= config.coinHigh && tx.t !== 0) : db.where("c").belowOrEqual(config.coinHigh).and((tx) => tx.t !== 0);
  }
  return {
    isSorted,
    query
  };
};
const searchTxBalance = async (networkId2, id, config, limit = 100) => {
  let searchStrList = [];
  const addrList = [];
  const assetList = [];
  const txHashList = [];
  const numberList = [];
  const refIdList = [];
  const addrIdList = [];
  if (config.searchStr || config.searchStrList.length > 0) {
    searchStrList = [...config.searchStrList];
    if (config.searchStr) {
      for (const searchStr of trimAllStrings(config.searchStr.trim().split(","))) {
        if (searchStr.length > 0 && !searchStrList.includes(searchStr)) {
          searchStrList.push(searchStr);
        }
      }
    }
    for (let i = searchStrList.length - 1; i >= 0; i--) {
      const searchStr = searchStrList[i] = searchStrList[i]?.toLowerCase();
      if (searchStr.startsWith(networkAddressPrefix[networkId2]) && searchStr.length >= 58) {
        addrList.push(searchStr);
        searchStrList.splice(i, 1);
      } else if (searchStr.startsWith("asset") && searchStr.length >= 44) {
        assetList.push(searchStr);
        searchStrList.splice(i, 1);
      } else if (txHashReg.test(searchStr)) {
        txHashList.push(searchStr);
        searchStrList.splice(i, 1);
      } else {
        if (!Number.isNaN(searchStr)) {
          const searchStrNbr = Number(searchStr);
          if (searchStrNbr >= 0) {
            numberList.push(searchStrNbr);
            searchStrList.splice(i, 1);
          }
        }
      }
    }
    if (addrList.length > 0) {
      addrIdList.push(...await RefDB.getRefListByRefs(networkId2, id, addrList));
    }
    if (assetList.length > 0) {
      refIdList.push(...await RefDB.getRefListByRefs(networkId2, id, assetList));
    }
  }
  return AccountDB.getDB(networkId2, id).then((db) => {
    return db.transaction("r", [db.txList], async (tx) => {
      let query = null;
      let isSorted = !!query;
      if (config) {
        let res = applyQuerySearch(db.txList, config);
        if (res && res.query) {
          query = res.query;
          isSorted = res.isSorted;
        }
      }
      if (addrIdList.length > 0) {
        query = query ? query.and((tx2) => tx2.al.some((item) => addrIdList.includes(item))) : db.txList.where("al").anyOf(addrIdList);
        if (txHashList.length > 0) {
          query = query ? query.or("hash").anyOf(txHashList) : db.txList.where("hash").anyOf(txHashList);
        }
      } else if (txHashList.length > 0) {
        query = query ? query.and((tx2) => txHashList.includes(tx2.hash)) : db.txList.where("hash").anyOf(txHashList);
      }
      if (refIdList.length > 0 || searchStrList.length > 0 || numberList.length > 0) {
        const filterFn = (tx2) => {
          try {
            if (numberList.length > 0) {
              if (tx2.slot > 0 && numberList.includes(tx2.slot)) {
                return true;
              }
              if ((tx2.block ?? 0) > 0 && numberList.includes(tx2.block)) {
                return true;
              }
            }
            if (tx2.al && refIdList.length > 0) {
              if (refIdList.some((id2) => tx2.al.includes(id2))) {
                return true;
              }
            }
            if (tx2.tags && tx2.tags.length > 0 && refIdList.length > 0) {
              if (refIdList.some((id2) => tx2.tags.includes(id2))) {
                return true;
              }
            }
            if (tx2.msg && searchStrList.length > 0) {
              if (tx2.msg.some((line) => searchStrList.some((searchStr) => line.toLowerCase().includes(searchStr)))) {
                return true;
              }
            }
            return false;
          } catch (err) {
            console.warn("searchTx:", err?.message ?? err, tx2);
            return false;
          }
        };
        query = query ? query.and(filterFn) : db.txList.filter(filterFn);
      }
      if (!query) {
        return [];
      }
      if (isSorted) {
        return query.distinct().limit(limit).toArray();
      } else {
        return query.distinct().sortBy("[slot+idx+t]").then((matches) => matches.slice(-limit));
      }
    });
  });
};
const getTxHistory = (networkId2, accountId, total, limit = 20, offset = 0, config) => {
  if (total - offset < total / 2) {
    if (offset + limit > total) {
      limit = total - offset;
    }
    offset = Math.max(total - offset - limit, 0);
    return getTxBalanceList(networkId2, accountId, limit, offset, false, config);
  } else {
    return getTxBalanceList(networkId2, accountId, limit, offset, true, config);
  }
};
const getTxHistoryOldestToNewest = (networkId2, accountId, limit = 20, offset = 0) => getTxBalanceListOldest(networkId2, accountId, limit, offset);
const getRewardHistory = async (accountId, refId, limit = 20, offset = 0, reverse = true) => {
  return await AccountDB.getRewardHistory(networkId.value, accountId, refId, limit, offset, reverse);
};
const getRewardHistoryCount = async (accountId, refId) => {
  return await AccountDB.getRewardHistoryCount(networkId.value, accountId, refId);
};
const getTxBalanceListRange = (networkId2, id, slotStart, slotEnd) => AccountDB.getDB(networkId2, id).then((db) => db.txList.where("slot").between(slotStart, slotEnd, true, true).toArray());
const getTxBalanceListRangeCount = (networkId2, id, slotStart, slotEnd) => AccountDB.getDB(networkId2, id).then((db) => db.txList.where("slot").between(slotStart, slotEnd, true, true).count());
const HistoryDB = {
  putTxBalance,
  bulkPutTxBalanceList,
  getTxBalanceList,
  getTxBalanceListTest,
  getTxBalanceListCounts,
  hasUninitializedTx,
  getFirstUninitialized,
  getLastUninitialized,
  getNextUninitialized,
  searchTxBalance,
  searchTxBalanceByContract,
  getTxHashList,
  getTxHistory,
  getTxHistoryOldestToNewest,
  getTxBalanceListRange,
  getTxBalanceListRangeCount,
  getRewardHistory,
  getRewardHistoryCount
};

export { HistoryDB as H, getRewardHistory as g };
