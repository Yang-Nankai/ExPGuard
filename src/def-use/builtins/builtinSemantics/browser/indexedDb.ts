import {
  BuiltInSemantics,
  Def,
  defFactory,
  ObjectDef,
  interAnalyzer,
} from "../index";

/**
 * A deliberately small IndexedDB model.  IndexedDB is frequently used as a
 * delayed exfiltration buffer, so treating it as an opaque browser primitive
 * breaks otherwise intact source -> encrypt -> upload flows.  We keep one
 * conservative summary record per abstract database rather than attempting
 * to model the full keyspace or transaction lifecycle.
 */
export const IDB_SUCCESS_RESULT = "__epg_idb_success_result";
export const QI_CLASS_MARKER = "__epg_qi_wrapper";
const QI_CONTENTS = "__epg_qi_contents";
const IDB_DATABASE = "__epg_idb_database";
const IDB_CONTENTS = "__epg_idb_contents";

function bindMethod(owner: ObjectDef, name: string, callNode: any) {
  const method = defFactory.createBuiltInFunctionDef(
    callNode,
    name,
    BuiltInSemantics.get(name),
  );
  method.thisDef = owner;
  owner.setProperty(name.slice(name.lastIndexOf(".") + 1), method);
}

function createDatabase(callNode: any): ObjectDef {
  const database = defFactory.createObjectDef(callNode);
  bindMethod(database, "IDBDatabase.transaction", callNode);
  return database;
}

function createTransaction(database: ObjectDef, callNode: any): ObjectDef {
  const transaction = defFactory.createObjectDef(callNode);
  transaction.setProperty(IDB_DATABASE, database);
  bindMethod(transaction, "IDBTransaction.objectStore", callNode);
  return transaction;
}

function createStore(database: ObjectDef, callNode: any): ObjectDef {
  const store = defFactory.createObjectDef(callNode);
  store.setProperty(IDB_DATABASE, database);
  for (const method of ["put", "get", "openCursor", "count", "clear"]) {
    bindMethod(store, `IDBObjectStore.${method}`, callNode);
  }
  return store;
}

function createRequest(result: Def, callNode: any): ObjectDef {
  const request = defFactory.createObjectDef(callNode);
  request.setProperty(IDB_SUCCESS_RESULT, result);
  return request;
}

function successResult(thisDef: Def | null): Def | null {
  if (!Def.isObjectDef(thisDef)) return null;
  return thisDef.getProperty(IDB_SUCCESS_RESULT);
}

function databaseFor(thisDef: Def | null): ObjectDef | null {
  if (!Def.isObjectDef(thisDef)) return null;
  const database = thisDef.getProperty(IDB_DATABASE);
  return Def.isObjectDef(database) ? database : null;
}

function contentsFor(database: ObjectDef, callNode: any): ObjectDef {
  const contents = database.getProperty(IDB_CONTENTS);
  if (Def.isObjectDef(contents)) return contents;
  const fresh = defFactory.createObjectDef(callNode);
  database.setProperty(IDB_CONTENTS, fresh);
  return fresh;
}

/** Model the small Promise-based IndexedDB wrapper used by ModHeader. */
function qiContents(owner: Def | null, callNode: any): ObjectDef {
  if (!Def.isObjectDef(owner)) return defFactory.createObjectDef(callNode);
  const existing = owner.getProperty(QI_CONTENTS);
  if (Def.isObjectDef(existing)) return existing;
  const fresh = defFactory.createObjectDef(callNode);
  owner.setProperty(QI_CONTENTS, fresh);
  return fresh;
}

BuiltInSemantics.register("Qi.open", (_args, callNode, _astNode, thisDef) => {
  const db = defFactory.createObjectDef(callNode);
  if (Def.isObjectDef(thisDef)) thisDef.setProperty("__epg_qi_db", db);
  return defFactory.createPromiseDef(callNode, db);
});

BuiltInSemantics.register("Qi.put", (args, callNode, _astNode, thisDef) => {
  const contents = qiContents(thisDef, callNode);
  if (args[0]) contents.setProperty("key", args[0]);
  if (args[1]) contents.setProperty("value", args[1]);
  return defFactory.createPromiseDef(callNode, defFactory.createUndefinedDef(callNode));
});

BuiltInSemantics.register("Qi.get", (args, callNode, _astNode, thisDef) => {
  const contents = qiContents(thisDef, callNode);
  const value = contents.getProperty("value") ?? defFactory.createUnknownDef(callNode);
  return defFactory.createPromiseDef(callNode, value);
});

BuiltInSemantics.register("Qi.cursor", (args, callNode, astNode, thisDef) => {
  const callback = args[0];
  const contents = qiContents(thisDef, callNode);
  const key = contents.getProperty("key") ?? defFactory.createUnknownDef(callNode);
  const value = contents.getProperty("value") ?? defFactory.createUnknownDef(callNode);
  if (Def.isFunctionDef(callback)) {
    // Qi.cursor(callback) invokes callback(key, value) for each record.
    interAnalyzer.analyze(callNode, callback, [key, value], null, astNode);
  }
  return defFactory.createPromiseDef(callNode, defFactory.createLiteralDef(callNode, true));
});

for (const method of ["count", "clear", "add", "delete", "getAllValues", "getAllKeys", "getKey"]) {
  BuiltInSemantics.register(`Qi.${method}`, (_args, callNode) =>
    defFactory.createPromiseDef(callNode, defFactory.createUnknownDef(callNode)),
  );
}
for (const method of ["constructor", "close", "bulkAdd", "deleteDatabase"]) {
  BuiltInSemantics.register(`Qi.${method}`, (_args, callNode) =>
    defFactory.createUndefinedDef(callNode),
  );
}

BuiltInSemantics.register("indexedDB.open", (_args, callNode) => {
  return createRequest(createDatabase(callNode), callNode);
});

BuiltInSemantics.register("IDBDatabase.transaction", (_args, callNode, _astNode, thisDef) => {
  return createTransaction(Def.isObjectDef(thisDef) ? thisDef : createDatabase(callNode), callNode);
});

BuiltInSemantics.register("IDBTransaction.objectStore", (_args, callNode, _astNode, thisDef) => {
  return createStore(databaseFor(thisDef) ?? createDatabase(callNode), callNode);
});

BuiltInSemantics.register("IDBObjectStore.put", (args, callNode, _astNode, thisDef) => {
  const database = databaseFor(thisDef);
  if (database) {
    const contents = contentsFor(database, callNode);
    // `put(value, key)`: retain both parts; a tainted key is just as
    // sensitive as a tainted value once the store is enumerated by a cursor.
    if (args[0]) contents.setProperty("value", args[0]);
    if (args[1]) contents.setProperty("key", args[1]);
  }
  return createRequest(defFactory.createUndefinedDef(callNode), callNode);
});

BuiltInSemantics.register("IDBObjectStore.get", (args, callNode, _astNode, thisDef) => {
  const database = databaseFor(thisDef);
  const contents = database ? contentsFor(database, callNode) : null;
  return createRequest(
    contents?.getProperty("value") ?? defFactory.createUnknownDef(callNode),
    callNode,
  );
});

BuiltInSemantics.register("IDBObjectStore.openCursor", (_args, callNode, _astNode, thisDef) => {
  const database = databaseFor(thisDef);
  const contents = database ? contentsFor(database, callNode) : null;
  const cursor = defFactory.createObjectDef(callNode);
  cursor.setProperty("key", contents?.getProperty("key") ?? defFactory.createUnknownDef(callNode));
  cursor.setProperty("value", contents?.getProperty("value") ?? defFactory.createUnknownDef(callNode));
  bindMethod(cursor, "IDBCursor.continue", callNode);
  return createRequest(cursor, callNode);
});

BuiltInSemantics.register("IDBObjectStore.count", (_args, callNode) => {
  return createRequest(defFactory.createLiteralDef(callNode, 1), callNode);
});

BuiltInSemantics.register("IDBObjectStore.clear", (_args, callNode) => {
  // Leave the summary record intact.  This is conservative and reflects that
  // a clear usually happens after, not before, an exfiltration upload.
  return createRequest(defFactory.createUndefinedDef(callNode), callNode);
});

BuiltInSemantics.register("IDBCursor.continue", (_args, callNode) => {
  return defFactory.createUndefinedDef(callNode);
});
