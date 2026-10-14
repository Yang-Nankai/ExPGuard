import { bp as Dexie } from './index.js';
import { n as networkIdList } from './NetworkId.js';

class MilkomedaDB extends Dexie {
  asset;
  constructor(networkId) {
    super("eternl-" + networkId + "-milkomeda");
    this.version(1).stores({
      asset: "idCardano"
    });
  }
}
const dbMap = networkIdList.reduce((o, n) => {
  o[n] = null;
  return o;
}, {});
const getDB = async (networkId) => {
  let db = dbMap[networkId];
  if (!db) {
    db = new MilkomedaDB(networkId);
    dbMap[networkId] = db;
  }
  if (!db.isOpen()) {
    await db.open();
  }
  return db;
};
const bulkPutAssetData = (networkId, list) => {
  return getDB(networkId).then((db) => {
    return db.transaction("rw", [db.asset], async (tx) => {
      await db.asset.bulkPut(list);
      return true;
    });
  }).catch((error) => {
    return false;
  });
};
const getAssetList = (networkId) => {
  return getDB(networkId).then((db) => db.asset.toArray()).catch((error) => {
    return [];
  });
};
const MilkomedaDB$1 = {
  bulkPutAssetData,
  getAssetList
};

export { MilkomedaDB$1 as M };
