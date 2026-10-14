import { bp as Dexie, e as ref, D as computed, P as networkId, aM as el, aN as sl, aX as json } from './index.js';
import { a as getSignTxCredList } from './creds.js';
import { a as shareMultiSigTx } from './multisig.js';
import { n as networkIdList } from './NetworkId.js';

const createITxHash = (hash, slot = 0, idx = 0) => {
  return { hash, slot, idx };
};

const notificationSchemaV1 = {
  list: "id, ts, read, deleted, *entityList"
};
class NotificationDB extends Dexie {
  list;
  constructor(networkId) {
    super("eternl-" + networkId + "-notification");
    this.version(1).stores(notificationSchemaV1);
  }
}
const dbMap = networkIdList.reduce((o, n) => {
  o[n] = null;
  return o;
}, {});
const getDB = async (networkId) => {
  let db = dbMap[networkId];
  if (!db) {
    db = new NotificationDB(networkId);
    dbMap[networkId] = db;
  }
  if (!db.isOpen()) {
    await db.open();
  }
  return db;
};
const putNotification = (networkId, data) => getDB(networkId).then((db) => db.list.put(data));
const clearNotification = (networkId) => getDB(networkId).then((db) => db.list.clear());
const bulkPutNotificationList = (networkId, data) => getDB(networkId).then((db) => db.list.bulkPut(data));
const getNotificationsById = (networkId, idList) => getDB(networkId).then((db) => db.list.bulkGet(idList));
const getNotificationsByEntity = (networkId, entity) => getDB(networkId).then((db) => db.list.where("entityList").equals(entity).toArray());
const setNotificationsRead$1 = (networkId, idList, ts) => getDB(networkId).then((db) => db.list.bulkUpdate(idList.map((item) => ({ key: item, changes: { read: ts } }))));
const setNotificationsDeleted$1 = (networkId, idList, ts) => getDB(networkId).then((db) => db.list.bulkUpdate(idList.map((item) => ({ key: item, changes: { deleted: ts } }))));
const resetNotificationsDeleted$1 = (networkId) => getDB(networkId).then((db) => db.list.where("deleted").notEqual(Number.MAX_SAFE_INTEGER).modify({ deleted: Number.MAX_SAFE_INTEGER }));
const loadNotifications$1 = (networkId, pruneBefore) => {
  return getDB(networkId).then((db) => {
    return db.transaction("rw", db.list, async (tx) => {
      let deleteCount = await db.list.where("read").below(pruneBefore).delete();
      deleteCount += await db.list.where("deleted").below(pruneBefore).delete();
      return db.list.toArray();
    });
  });
};
const NotificationDB$1 = {
  putNotification,
  bulkPutNotificationList,
  clearNotification,
  setNotificationsRead: setNotificationsRead$1,
  setNotificationsDeleted: setNotificationsDeleted$1,
  resetNotificationsDeleted: resetNotificationsDeleted$1,
  getNotificationsById,
  getNotificationsByEntity,
  loadNotifications: loadNotifications$1
};

const doLog = false;
const storeId = "NotificationStore";
const PRUNE_AFTER = 7 * 24 * 60 * 60 * 1e3;
const notificationList = ref([]);
const numUnreadNotifications = ref(0);
const numReadNotifications = ref(0);
const numDeletedNotifications = ref(0);
const numNotifications = computed(() => numUnreadNotifications.value + numReadNotifications.value);
const severity = computed(() => {
  if (numUnreadNotifications.value > 0) {
    return "danger";
  }
  if (numNotifications.value > 0) {
    return "secondary";
  } else {
    return null;
  }
});
const setNotificationsDeleted = async (idList) => {
  await NotificationDB$1.setNotificationsDeleted(networkId.value, idList, Date.now());
  await loadNotifications();
};
const setNotificationsRead = async (_idList) => {
  const maxInt = Number.MAX_SAFE_INTEGER;
  const idList = _idList ?? notificationList.value.filter((item) => item.read === maxInt).map((item) => item.id);
  await NotificationDB$1.setNotificationsRead(networkId.value, idList, Date.now());
  await loadNotifications();
};
const resetNotificationsDeleted = async () => {
  await NotificationDB$1.resetNotificationsDeleted(networkId.value);
  await loadNotifications();
};
const clearNotificationsDeleted = async () => {
  await NotificationDB$1.clearNotification(networkId.value);
  await loadNotifications();
};
const updateMultiSigNotification = async (tx) => {
  if (!tx.cbor) {
    return false;
  }
  const creds = await getSignTxCredList(networkId.value, tx);
  let localNotification = notificationList.value.find((item) => item.id === tx.hash);
  const entityList = /* @__PURE__ */ new Set();
  const signedList = /* @__PURE__ */ new Set();
  for (const item of creds.ownedList) {
    entityList.add(item.accountId);
  }
  for (const cred of creds.scriptCredList) {
    for (const item of cred.ownedList) {
      entityList.add(item.accountId);
    }
    for (const item of cred.signed) {
      signedList.add(item);
    }
  }
  if (localNotification) {
    localNotification.updated = localNotification.read === Number.MAX_SAFE_INTEGER && localNotification.updated === Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : Date.now();
    localNotification.read = Number.MAX_SAFE_INTEGER;
    localNotification.deleted = Number.MAX_SAFE_INTEGER;
    localNotification.txCbor = tx.cbor;
    localNotification.numSignatures = signedList.size;
    localNotification.lastUpdate = Date.now();
    localNotification.entityList = Array.from(entityList);
    localNotification.signedList = Array.from(signedList);
  } else {
    localNotification = {
      id: tx.hash,
      ts: Date.now(),
      read: Number.MAX_SAFE_INTEGER,
      deleted: Number.MAX_SAFE_INTEGER,
      updated: Number.MAX_SAFE_INTEGER,
      type: "txMS",
      entityList: Array.from(entityList),
      txHash: createITxHash(tx.hash),
      txCbor: tx.cbor,
      numSignatures: signedList.size,
      lastUpdate: Date.now(),
      onChain: false
    };
  }
  await NotificationDB$1.putNotification(networkId.value, json(localNotification));
  await loadNotifications();
  return await shareMultiSigTx(networkId.value, tx.cbor);
};
const loadNotifications = async () => {
  const _networkId = networkId.value;
  try {
    const _notificationList = await NotificationDB$1.loadNotifications(_networkId, Date.now() - PRUNE_AFTER);
    if (doLog) ;
    updateNotificationList(_notificationList);
  } catch (err) {
    console.error(el(storeId), sl("loadNotifications"), err);
    notificationList.value = [];
    numReadNotifications.value = 0;
    numUnreadNotifications.value = 0;
    numDeletedNotifications.value = 0;
  }
};
const updateNotificationList = (_notificationList) => {
  const ts = Date.now();
  notificationList.value = [];
  let _numUnreadNotifications = 0;
  let _numReadNotifications = 0;
  let _numDeletedNotifications = 0;
  _notificationList.sort((a, b) => {
    const msLastUpdate = (b.lastUpdate ?? 0) - (a.lastUpdate ?? 0);
    const nTS = b.ts - a.ts;
    return msLastUpdate || nTS;
  });
  for (const item of _notificationList) {
    if (item.deleted !== Number.MAX_SAFE_INTEGER) {
      _numDeletedNotifications++;
      continue;
    } else if (item.read <= ts) {
      _numReadNotifications++;
    } else if (item.deleted === Number.MAX_SAFE_INTEGER) {
      _numUnreadNotifications++;
    }
    notificationList.value.push(item);
  }
  numReadNotifications.value = _numReadNotifications;
  numUnreadNotifications.value = _numUnreadNotifications;
  numDeletedNotifications.value = _numDeletedNotifications;
};

export { numUnreadNotifications as a, numNotifications as b, numDeletedNotifications as c, setNotificationsDeleted as d, clearNotificationsDeleted as e, setNotificationsRead as f, loadNotifications as l, notificationList as n, resetNotificationsDeleted as r, severity as s, updateMultiSigNotification as u };
