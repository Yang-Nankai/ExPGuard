import { bp as Dexie, e as ref, P as networkId } from './index.js';
import { n as networkIdList } from './NetworkId.js';

class DecryptedMsgDB extends Dexie {
  list;
  constructor(networkId) {
    super("eternl-" + networkId + "-decryptedmsg");
    this.version(1).stores({
      list: "hash"
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
    db = new DecryptedMsgDB(networkId);
    dbMap[networkId] = db;
  }
  if (!db.isOpen()) {
    await db.open();
  }
  return db;
};
const putDecryptedMsg = (networkId, msg) => {
  return getDB(networkId).then((db) => {
    return db.transaction("rw", [db.list], async (tx) => {
      await db.list.put(msg);
      return true;
    });
  }).catch((error) => {
    return false;
  });
};
const deleteDecryptedMsg = (networkId, hash) => {
  return getDB(networkId).then((db) => {
    return db.transaction("rw", [db.list], async (tx) => {
      await db.list.delete(hash);
      return true;
    });
  }).catch((error) => {
    return false;
  });
};
const getDecryptedMsgList = (networkId) => {
  return getDB(networkId).then((db) => db.list.toArray()).catch((error) => {
    return [];
  });
};
const getDecryptedMsgCount = (networkId) => {
  return getDB(networkId).then((db) => db.list.count()).catch((error) => {
    return -1;
  });
};
const DecryptedMsgDB$1 = {
  putDecryptedMsg,
  deleteDecryptedMsg,
  getDecryptedMsgList,
  getDecryptedMsgCount
};

const decryptedMsgMap = ref(/* @__PURE__ */ new Map());
let _msgCount = 0;
let _timeoutId = -1;
const loadDecryptedMsgMapFromStore = async () => {
  clearTimeout(_timeoutId);
  const newCount = await DecryptedMsgDB$1.getDecryptedMsgCount(networkId.value);
  if (newCount > _msgCount) {
    _msgCount = newCount;
    for (const entry of Object.entries(mapHash(await DecryptedMsgDB$1.getDecryptedMsgList(networkId.value)))) {
      decryptedMsgMap.value.set(entry[0], entry[1]);
    }
  }
};
const saveDecryptedMsg = async (hash, msg) => {
  if (!hash) {
    return;
  }
  const msgCopy = [...msg];
  decryptedMsgMap.value.set(hash, msgCopy);
  await DecryptedMsgDB$1.putDecryptedMsg(networkId.value, { hash, msg: msgCopy });
};
const delDecryptedMsg = async (hash) => {
  decryptedMsgMap.value.delete(hash);
  await DecryptedMsgDB$1.deleteDecryptedMsg(networkId.value, hash);
};
const mapHash = (list) => {
  if (!list || list.length === 0) return {};
  const map = {};
  for (const item of list) {
    map[item.hash] = item.msg;
  }
  return map;
};

export { decryptedMsgMap as a, delDecryptedMsg as d, loadDecryptedMsgMapFromStore as l, saveDecryptedMsg as s };
