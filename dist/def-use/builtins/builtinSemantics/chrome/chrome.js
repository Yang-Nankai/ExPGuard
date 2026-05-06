"use strict";
// import { Node } from "acorn";
// import { SinkType, SourceType } from "../../../../taint";
// import {
//   BuiltInSemantics,
//   BuiltInSemanticExec,
//   DefFactory,
//   defFactory,
//   literalOuter,
//   literalExtensionId,
//   Def,
//   FunctionDef,
//   ObjectDef,
//   interAnalyzer,
//   taintManager,
//   BuiltInRegistry
// } from "../index";
// import { FlowNode } from "../../../../flownode/flownode";
// import logger from "../../../../utils/logger";
// /**
//  * ======================================================
//  * ================= Chrome API Semantics ===============
//  * ======================================================
//  */
// type ReturnDefFactory = (callNode: FlowNode, astNode: any) => any;
// function createChromeApiSemantics({
//   apiName,
//   callbackIndex,
//   sourceType,
//   createReturnDef,
// }: {
//   apiName: string;
//   callbackIndex?: number;
//   sourceType: SourceType;
//   createReturnDef: ReturnDefFactory;
// }) {
//   BuiltInSemantics.register(apiName, (args, callNode, astNode, _thisDef) => {
//     const createDef = () => {
//       const def = createReturnDef(callNode, astNode);
//       interAnalyzer.setCurrentSideEffects(); // side effect
//       taintManager.createTaintSource(def, sourceType, astNode);
//       return def;
//     };
//     // ---------- callback-style ----------
//     if (
//       callbackIndex !== undefined &&
//       args.length > callbackIndex &&
//       Def.isFunctionDef(args[callbackIndex])
//     ) {
//       const callbackFunc = args[callbackIndex];
//       const retDef = createDef();
//       interAnalyzer.analyze(callNode, callbackFunc, [retDef], null, astNode);
//       return defFactory.createUndefinedDef(callNode);
//     }
//     // ---------- promise-style ----------
//     const retPromise = defFactory.createPromiseDef(callNode);
//     const retDef = createDef();
//     retPromise.resolve(retDef);
//     return retPromise;
//   });
// }
// // --------------------- chrome.bookmarks-------------------
// function createBookmarkArrayDef(callNode: FlowNode, astNode: any) {
//   return DefFactory.createArrayInstanceDef(callNode, astNode, []);
// }
// ["get", "getChildren", "getRecent", "getSubTree", "search"].forEach((name) =>
//   createChromeApiSemantics({
//     apiName: `chrome.bookmarks.${name}`,
//     callbackIndex: 1,
//     sourceType: "CHROME_BOOKMARK_INFO",
//     createReturnDef: createBookmarkArrayDef,
//   }),
// );
// createChromeApiSemantics({
//   apiName: "chrome.bookmarks.getTree",
//   callbackIndex: 0,
//   sourceType: "CHROME_BOOKMARK_INFO",
//   createReturnDef: createBookmarkArrayDef,
// });
// // --------------------- chrome.cookies -------------------
// createChromeApiSemantics({
//   apiName: "chrome.cookies.getAll",
//   callbackIndex: 1,
//   sourceType: "CHROME_COOKIES_INFO",
//   createReturnDef: (callNode, astNode) =>
//     DefFactory.createArrayInstanceDef(callNode, astNode, []),
// });
// createChromeApiSemantics({
//   apiName: "chrome.cookies.get",
//   callbackIndex: 1,
//   sourceType: "CHROME_COOKIES_INFO",
//   createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
// });
// createChromeApiSemantics({
//   apiName: "chrome.cookies.getAllCookieStores",
//   callbackIndex: 0,
//   sourceType: "CHROME_COOKIES_STORE",
//   createReturnDef: (callNode, astNode) =>
//     DefFactory.createArrayInstanceDef(callNode, astNode, []),
// });
// // --------------------- chrome.downloads -------------------
// createChromeApiSemantics({
//   apiName: "chrome.downloads.search",
//   callbackIndex: 1,
//   sourceType: "CHROME_DOWNLOADS_SEARCH",
//   createReturnDef: (callNode, astNode) =>
//     DefFactory.createArrayInstanceDef(callNode, astNode, []),
// });
// createChromeApiSemantics({
//   apiName: "chrome.downloads.getFileIcon",
//   callbackIndex: 2,
//   sourceType: "CHROME_DOWNLOADS_FILEICON",
//   createReturnDef: (callNode, astNode) =>
//     DefFactory.createArrayInstanceDef(callNode, astNode, []),
// });
// // --------------------- chrome.history -------------------
// createChromeApiSemantics({
//   apiName: "chrome.history.search",
//   callbackIndex: 1,
//   sourceType: "CHROME_HISTORY_INFO",
//   createReturnDef: (callNode, astNode) =>
//     DefFactory.createArrayInstanceDef(callNode, astNode, []),
// });
// createChromeApiSemantics({
//   apiName: "chrome.history.getVisits",
//   callbackIndex: 0,
//   sourceType: "CHROME_HISTORY_INFO",
//   createReturnDef: (callNode, astNode) =>
//     DefFactory.createArrayInstanceDef(callNode, astNode, []),
// });
// // --------------------- chrome.readingList -------------------
// createChromeApiSemantics({
//   apiName: "chrome.readingList.query",
//   callbackIndex: 1,
//   sourceType: "CHROME_READINGLIST_INFO",
//   createReturnDef: (callNode, astNode) =>
//     DefFactory.createArrayInstanceDef(callNode, astNode, []),
// });
// // --------------------- chrome.management -------------------
// createChromeApiSemantics({
//   apiName: "chrome.management.get",
//   callbackIndex: 1,
//   sourceType: "CHROME_MANAGEMENT_INFO",
//   createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
// });
// createChromeApiSemantics({
//   apiName: "chrome.management.getAll",
//   callbackIndex: 0,
//   sourceType: "CHROME_MANAGEMENT_INFO",
//   createReturnDef: (callNode, astNode) =>
//     DefFactory.createArrayInstanceDef(callNode, astNode, []),
// });
// BuiltInSemantics.register(
//   "chrome.management.setEnabled",
//   (args, callNode, astNode, _thisDef) => {
//     interAnalyzer.setCurrentSideEffects(); // side effect
//     const [idDef, enabledDef, callbackFunc] = args;
//     // Sink: extension id
//     if (idDef) {
//       taintManager.checkSink(idDef, "CHROME_MANAGEMENT_SETENABLED_ID", astNode);
//     }
//     // Sink: enable/disable flag
//     if (enabledDef) {
//       taintManager.checkSink(enabledDef, "CHROME_MANAGEMENT_SETENABLED_FLAG", astNode);
//     }
//     // callback-style
//     if (Def.isFunctionDef(callbackFunc)) {
//       interAnalyzer.analyze(callNode, callbackFunc, [], null, astNode);
//       return defFactory.createUndefinedDef(callNode);
//     }
//     // promise-style
//     return defFactory.createPromiseDef(callNode);
//   }
// );
// BuiltInSemantics.register(
//   "chrome.management.uninstall",
//   (args, callNode, astNode, _thisDef) => {
//     interAnalyzer.setCurrentSideEffects(); // side effect
//     const [idDef, callbackFunc] = args;
//     // Sink: extension id
//     if (idDef) {
//       taintManager.checkSink(idDef, "CHROME_MANAGEMENT_UNINSTALL_ID", astNode);
//     }
//     if (Def.isFunctionDef(callbackFunc)) {
//       interAnalyzer.analyze(callNode, callbackFunc, [], null, astNode);
//       return defFactory.createUndefinedDef(callNode);
//     }
//     return defFactory.createPromiseDef(callNode);
//   }
// );
// BuiltInSemantics.register(
//   "chrome.management.launchApp",
//   (args, callNode, astNode, _thisDef) => {
//     interAnalyzer.setCurrentSideEffects(); // side effect
//     const [idDef, callbackFunc] = args;
//     // Sink: launched app id
//     if (idDef) {
//       taintManager.checkSink(idDef, "CHROME_MANAGEMENT_LAUNCHAPP_ID", astNode);
//     }
//     if (Def.isFunctionDef(callbackFunc)) {
//       interAnalyzer.analyze(callNode, callbackFunc, [], null, astNode);
//       return defFactory.createUndefinedDef(callNode);
//     }
//     return defFactory.createPromiseDef(callNode);
//   }
// );
// // --------------------- chrome.pageCapture -------------------
// createChromeApiSemantics({
//   apiName: "chrome.pageCapture.saveAsMHTML",
//   callbackIndex: 1,
//   sourceType: "CHROME_PAGECAPTURE_MHTML",
//   createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
// });
// // --------------------- chrome.system -------------------
// createChromeApiSemantics({
//   apiName: "chrome.system.cpu.getInfo",
//   callbackIndex: 0,
//   sourceType: "CHROME_SYSTEM_CPU",
//   createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
// });
// createChromeApiSemantics({
//   apiName: "chrome.system.display.getDisplayLayout",
//   callbackIndex: 0,
//   sourceType: "CHROME_SYSTEM_DISPLAY_LAYOUT",
//   createReturnDef: (callNode, astNode) =>
//     DefFactory.createArrayInstanceDef(callNode, astNode, []),
// });
// createChromeApiSemantics({
//   apiName: "chrome.system.display.getInfo",
//   callbackIndex: 1,
//   sourceType: "CHROME_SYSTEM_DISPLAY",
//   createReturnDef: (callNode, astNode) =>
//     DefFactory.createArrayInstanceDef(callNode, astNode, []),
// });
// createChromeApiSemantics({
//   apiName: "chrome.system.memory.getInfo",
//   callbackIndex: 0,
//   sourceType: "CHROME_SYSTEM_MEMORY",
//   createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
// });
// createChromeApiSemantics({
//   apiName: "chrome.system.storage.getInfo",
//   callbackIndex: 0,
//   sourceType: "CHROME_SYSTEM_STORAGE",
//   createReturnDef: (callNode, astNode) =>
//     DefFactory.createArrayInstanceDef(callNode, astNode, []),
// });
// // --------------------- chrome.tabs -------------------
// createChromeApiSemantics({
//   apiName: "chrome.tabs.captureVisibleTab",
//   callbackIndex: 2,
//   sourceType: "CHROME_TABS_CAPUTURE_VISIBLE_TAB",
//   createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
// });
// createChromeApiSemantics({
//   apiName: "chrome.tabs.detectLanguage",
//   callbackIndex: 1,
//   sourceType: "CHROME_TABS_DETECT_LANUAGE",
//   createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
// });
// // --------------------- chrome.gcm -------------------
// BuiltInSemantics.register(
//   "chrome.gcm.send",
//   (args, callNode, astNode, _thisDef) => {
//     interAnalyzer.setCurrentSideEffects(); // side effect
//     const [message, callbackFunc] = args;
//     taintManager.checkSink(message, "CHROME_GCM_SEND", astNode);
//     // Handle the callback
//     if (Def.isFunctionDef(callbackFunc)) {
//       interAnalyzer.analyze(callNode, callbackFunc, [], null, astNode);
//     }
//     return undefined;
//   },
// );
// // --------------------- chrome.topSites -------------------
// createChromeApiSemantics({
//   apiName: "chrome.topSites.get",
//   callbackIndex: 0,
//   sourceType: "CHROME_TOPSITES_INFO",
//   createReturnDef: (callNode, astNode) =>
//     DefFactory.createArrayInstanceDef(callNode, astNode, []),
// });
// // --------------------- chrome.identity -------------------
// createChromeApiSemantics({
//   apiName: "chrome.identity.getAuthToken",
//   callbackIndex: 1,
//   sourceType: "CHROME_IDENTITY_TOKEN",
//   createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
// });
// createChromeApiSemantics({
//   apiName: "chrome.identity.getProfileUserInfo",
//   callbackIndex: 1,
//   sourceType: "CHROME_IDENTITY_PROFILE",
//   createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
// });
// /**
//  * Register chrome.storage.[area].set semantics.
//  */
// function registerStorageSet(area: "local" | "sync" | "session") {
//   const sinkTypeMap = {
//     local: "CHROME_LOCAL_STORAGE",
//     sync: "CHROME_SYNC_STORAGE",
//     session: "CHROME_SESSION_STORAGE",
//   } as const;
//   const sinkType = sinkTypeMap[area];
//   BuiltInSemantics.register(
//     `chrome.storage.${area}.set`,
//     (args, callNode, astNode, _thisDef) => {
//       // Mark this call as having side effects
//       interAnalyzer.setCurrentSideEffects();
//       const [items, callbackFunc] = args;
//       /**
//        * Only object form is supported by Chrome API:
//        * chrome.storage.xxx.set({ key: value })
//        */
//       if (Def.isObjectDef(items)) {
//         for (const [key, value] of items.props) {
//           // record storage set
//           taintManager.recordStorageSet(area, key, value, astNode);
//           // Treat storage write as a sink
//           // If value is tainted → this is a sensitive flow
//           taintManager.checkSink(value, sinkType, astNode, key);
//         }
//       }
//       // Callback style
//       if (Def.isFunctionDef(callbackFunc)) {
//         interAnalyzer.analyze(callNode, callbackFunc, [], null, astNode);
//       }
//       return undefined;
//     }
//   );
// }
// // Register storage set semantics
// registerStorageSet("local");
// registerStorageSet("sync");
// registerStorageSet("session");
// // --------------------- chrome.storage.[area].get helper ---------------------
// /**
//  * Resolve values from the simulated storage model based on different key types.
//  */
// function resolveStorageValue(
//   area: "local" | "sync" | "session",
//   keyDef: Def | undefined,
//   callNode: FlowNode,
//   astNdoe: Node
// ): ObjectDef {
//   const result = defFactory.createObjectDef(callNode);
//   if (!keyDef) return result;
//   /**
//    * Read a single key from storage and attach it to result.
//    * Also propagates taint if the stored value is tainted.
//    */
//   const attachStoredValue = (key: string) => {
//     const stored = defFactory.createUnknownDef(callNode);
//     taintManager.recordStorageGet(area, key, stored, astNdoe);
//     result.setProperty(key, stored);
//   };
//   // Case 0: null / undefined / no argument
//   if (
//     !keyDef ||
//     (Def.isLiteralDef(keyDef) &&
//       (keyDef.value === null || keyDef.value === undefined))
//   ) {
//     // If get the all items, then set a taint
//     taintManager.createTaintSource(result, "STORAGE_ALL_ITEMS", astNdoe, false, `storage.all.items[${area}]`);
//     return result;
//   }
//   //  Case 1: Literal key 
//   if (Def.isLiteralDef(keyDef)) {
//     attachStoredValue(String(keyDef.value));
//     return result;
//   }
//   // Case 2: Array of keys 
//   if (
//     Def.isObjectDef(keyDef) &&
//     keyDef.proto === BuiltInRegistry.getArrayPrototype()
//   ) {
//     for (const element of keyDef.values) {
//       if (Def.isLiteralDef(element)) {
//         attachStoredValue(String(element.value));
//       }
//     }
//     return result;
//   }
//   // Case 3: Object with default values
//   if (Def.isObjectDef(keyDef)) {
//     for (const [propName] of keyDef.props) {
//       attachStoredValue(String(propName));
//     }
//     return result;
//   }
//   // Unknown key type
//   return result;
// }
// /**
//  * Register chrome.storage.[area].get semantics.
//  */
// function registerStorageGet(area: "local" | "sync" | "session") {
//   BuiltInSemantics.register(
//     `chrome.storage.${area}.get`,
//     (args, callNode, astNode) => {
//       interAnalyzer.setCurrentSideEffects();
//       const [keys, callback] = args;
//       const result = resolveStorageValue(
//         area,
//         keys,
//         callNode,
//         astNode
//       );
//       // Callback style
//       if (Def.isFunctionDef(callback)) {
//         interAnalyzer.analyze(callNode, callback, [result], null, astNode);
//         return undefined;
//       }
//       // Promise style
//       return defFactory.createPromiseDef(callNode, result);
//     }
//   );
// }
// // --------------------- Register storage areas ---------------------
// registerStorageGet("local");
// registerStorageGet("sync");
// registerStorageGet("session");
// // --------------------- chrome.scripting.executeScript -------------------
// BuiltInSemantics.register(
//   "chrome.scripting.executeScript",
//   (args, callNode, astNode, _thisDef) => {
//     interAnalyzer.setCurrentSideEffects(); // side effect
//     const options = args[0];
//     if (Def.isObjectDef(options)) {
//       const funcDef = options.lookupProperty("func");
//       const argsDef = options.lookupProperty("args");
//       if (Def.isFunctionDef(funcDef)) {
//         const argDefs = Def.isObjectDef(argsDef) ? [...argsDef.values] : [];
//         interAnalyzer.analyze(callNode, funcDef, argDefs, null, astNode);
//       }
//       return defFactory.createPromiseDef(callNode);
//     }
//   },
// );
// // --------------------- chrome.tabs.executeScript -------------------
// BuiltInSemantics.register(
//   "chrome.tabs.executeScript",
//   (args, callNode, astNode, _thisDef) => {
//     interAnalyzer.setCurrentSideEffects(); // side effect
//     if (args.length === 0) {
//       return defFactory.createUndefinedDef(callNode);
//     }
//     let details: Def | undefined;
//     let callbackFunc: Def | undefined;
//     // Possible calling formats:
//     // executeScript(details, callback)
//     // executeScript(tabId, details, callback)
//     if (args.length === 1) {
//       details = args[0];
//     } else if (args.length === 2) {
//       if (Def.isObjectDef(args[0])) {
//         details = args[0];
//         callbackFunc = args[1];
//       } else {
//         details = args[1];
//       }
//     } else if (args.length >= 3) {
//       details = args[1];
//       callbackFunc = args[2];
//     }
//     // -------------------------
//     // Sink: details.code
//     // Sink: details.file
//     // -------------------------
//     if (details && Def.isObjectDef(details)) {
//       const codeDef = details.lookupProperty("code");
//       // const fileDef = details.lookupProperty("file");
//       if (codeDef) {
//         taintManager.checkSink(codeDef, "CHROME_TABS_EXECUTE", astNode);
//       }
//     }
//     // -------------------------
//     // callback-style
//     // -------------------------
//     if (callbackFunc && Def.isFunctionDef(callbackFunc)) {
//       // Simple: don't care the result
//       interAnalyzer.analyze(callNode, callbackFunc, [], null, astNode);
//     }
//     return defFactory.createUndefinedDef(callNode);
//   },
// );
// /**
//  * ======================================================
//  * ============ Chrome Event Listener Semantics =========
//  * ======================================================
//  */
// function createChromeEventListenerSemantics({
//   apiName,
//   sourceIndexes = [],
//   sourceType,
//   paramDefs,
// }: {
//   apiName: string;
//   sourceIndexes: number[];
//   sourceType: SourceType;
//   paramDefs: Array<(callNode: FlowNode) => Def>;
// }) {
//   const sourceIndexSet = new Set(sourceIndexes);
//   BuiltInSemantics.register(apiName, (args, callNode, astNode) => {
//     // chrome.xxx.addListener(cb)
//     if (args.length === 0 || !Def.isFunctionDef(args[0])) {
//       return defFactory.createUndefinedDef(callNode);
//     }
//     const callbackFunc = args[0];
//     const callbackArgs = paramDefs.map((factory, index) => {
//       const def = factory(callNode);
//       if (sourceIndexSet.has(index)) {
//         taintManager.createTaintSource(def, sourceType, astNode);
//       }
//       return def;
//     });
//     interAnalyzer.analyze(callNode, callbackFunc, callbackArgs, null, astNode);
//     return defFactory.createUndefinedDef(callNode);
//   });
// }
// // ------------------------chrome.bookmarks.onCreated.addListener-----------------
// createChromeEventListenerSemantics({
//   apiName: "chrome.bookmarks.onCreated.addListener",
//   sourceIndexes: [1],
//   sourceType: "CHROME_BOOKMARKS_ONCREATED",
//   paramDefs: [
//     (callNode) => defFactory.createLiteralDef(callNode, "BOOKMARK_ID"), // id
//     (callNode) => defFactory.createUnknownDef(callNode), // bookmark
//   ],
// });
// // ----------------------  chrome.cookies.onChanged.addListener
// createChromeEventListenerSemantics({
//   apiName: "chrome.cookies.onChanged.addListener",
//   sourceIndexes: [0],
//   sourceType: "CHROME_COOKIES_ONCHANGED",
//   paramDefs: [
//     (callNode) => defFactory.createUnknownDef(callNode), // changeInfo
//   ],
// });
// // ----------------------- chrome.downloads.onChanged.addListener
// createChromeEventListenerSemantics({
//   apiName: "chrome.downloads.onChanged.addListener",
//   sourceIndexes: [0],
//   sourceType: "CHROME_DOWNLOADS_ONCHANGED",
//   paramDefs: [
//     (callNode) => defFactory.createUnknownDef(callNode), // delta
//   ],
// });
// // ------------------------ chrome.downloads.onCreated.addListener
// createChromeEventListenerSemantics({
//   apiName: "chrome.downloads.onCreated.addListener",
//   sourceIndexes: [0],
//   sourceType: "CHROME_DOWNLOADS_ONCREATED",
//   paramDefs: [
//     (callNode) => defFactory.createUnknownDef(callNode), // delta
//   ],
// });
// // ------------------------ chrome.history.onVisited.addListener
// createChromeEventListenerSemantics({
//   apiName: "chrome.history.onVisited.addListener",
//   sourceIndexes: [0],
//   sourceType: "CHROME_HISTORY_ONVISITED",
//   paramDefs: [
//     (callNode) => defFactory.createUnknownDef(callNode), // delta
//   ],
// });
// createChromeEventListenerSemantics({
//   apiName: "chrome.management.onEnabled.addListener",
//   sourceIndexes: [0],
//   sourceType: "CHROME_MANAGEMENT_ONENABLED",
//   paramDefs: [
//     (callNode) => defFactory.createUnknownDef(callNode), // ExtensionInfo
//   ],
// });
// createChromeEventListenerSemantics({
//   apiName: "chrome.management.onDisabled.addListener",
//   sourceIndexes: [0],
//   sourceType: "CHROME_MANAGEMENT_ONDISABLED",
//   paramDefs: [
//     (callNode) => defFactory.createUnknownDef(callNode), // ExtensionInfo
//   ],
// });
// createChromeEventListenerSemantics({
//   apiName: "chrome.management.onInstalled.addListener",
//   sourceIndexes: [0],
//   sourceType: "CHROME_MANAGEMENT_ONINSTALLED",
//   paramDefs: [
//     (callNode) => defFactory.createUnknownDef(callNode), // ExtensionInfo
//   ],
// });
// // ------------------------ chrome.downloads.download
// BuiltInSemantics.register(
//   "chrome.downloads.download",
//   (args, callNode, astNode, _thisDef) => {
//     interAnalyzer.setCurrentSideEffects(); // side effect
//     const options = args[0];
//     if (Def.isObjectDef(options)) {
//       const urlDef = options.lookupProperty("url");
//       taintManager.checkSink(urlDef, "CHROME_DOWNLOADS_URL", astNode)
//       return defFactory.createPromiseDef(callNode);
//     }
//   },
// );
// // --------------------- runtime.sendMessage -------------------
// function recordSendMessageTaint(
//   message: Def | undefined,
//   astNode: any,
//   callNode: FlowNode,
//   outer?: string,
// ) {
//   // Try to obtain the actual source type of the message
//   const contextFile = callNode.scopeTree?.key;
//   if (!message || !message.isTainted || !contextFile) return undefined;
//   const channel = outer
//     ? "runtime.single.external.sender.message"
//     : "runtime.single.sender.message";
//   taintManager.addPseudoTaintSender({
//     taintDef: message,
//     astNode,
//     contextFilename: contextFile,
//     channel: channel,
//     ...(outer ? { outer } : {}),
//   });
// }
// // --------------------- runtime.sendResponse -------------------
// function createResponsePromise(
//   callNode: FlowNode,
//   astNode: any,
//   outer?: string,
// ) {
//   interAnalyzer.setCurrentSideEffects(); // side effect
//   const retDef = defFactory.createUnknownDef(callNode);
//   const promise = defFactory.createPromiseDef(callNode, retDef);
//   const taintId = taintManager.createTaintSource(retDef, "PSEUDO_MESSAGE", astNode, true);
//   taintManager.addPseudoTaintReceiver({
//     taintId,
//     astNode,
//     contextFilename: callNode.scopeTree?.key!,
//     channel: "runtime.single.response.message",
//     targetDef: retDef,
//     ...(outer ? { outer } : {}),
//   });
//   return promise;
// }
// BuiltInSemantics.register("runtime.sendResponse", (args, callNode, astNode) => {
//   const [response] = args;
//   if (!response?.isTainted) return;
//   taintManager.addPseudoTaintSender({
//     taintDef: response,
//     astNode,
//     contextFilename: callNode.scopeTree?.key!,
//     channel: "runtime.single.response.message",
//   });
//   return undefined;
// });
// // -------------- Chrome sendMessag Helper ----------------
// type SendMessageConfig = {
//   apiName: string;
//   parseFirstArg: (arg: Def) => any;
//   hasExternalChannel?: boolean;
// };
// function createSendMessageHandler(config: SendMessageConfig) {
//   return (args: Def[], callNode: any, astNode: any): Def => {
//     const paramCount = args.length;
//     if (paramCount === 0) return defFactory.createUndefinedDef(callNode);
//     const lastArgIsFunction =
//       paramCount > 0 && Def.isFunctionDef(args[paramCount - 1]);
//     const contextFilename = callNode.scopeTree?.key;
//     if (!contextFilename) {
//       console.warn(`Missing context filename for ${config.apiName}`, callNode);
//       return defFactory.createUndefinedDef(callNode);
//     }
//     const parseArgs = () => {
//       let firstArg: any, message: Def | undefined, callback: Def | undefined;
//       let hasFirstArg = false;
//       if (lastArgIsFunction) {
//         callback = args[paramCount - 1];
//         switch (paramCount) {
//           case 1:
//             logger.warn(
//               `Invalid ${config.apiName} call: only callback provided`,
//             );
//             return { message: undefined, callback };
//           case 2:
//             message = args[0];
//             break;
//           case 3:
//             hasFirstArg = true;
//             firstArg = config.parseFirstArg(args[0]);
//             message = args[1];
//             break;
//           case 4:
//             hasFirstArg = true;
//             firstArg = Def.isLiteralDef(args[0])
//               ? config.parseFirstArg(args[0])
//               : undefined;
//             message = args[1];
//             break;
//         }
//       } else {
//         switch (paramCount) {
//           case 1:
//             message = args[0];
//             break;
//           case 2:
//           case 3:
//             hasFirstArg = true;
//             firstArg =
//               paramCount === 3
//                 ? Def.isLiteralDef(args[0])
//                   ? config.parseFirstArg(args[0])
//                   : undefined
//                 : config.parseFirstArg(args[0]);
//             message = args[1];
//             break;
//         }
//       }
//       return { hasFirstArg, firstArg, message, callback };
//     };
//     const { hasFirstArg, firstArg, message, callback } = parseArgs();
//     if (message === undefined) {
//       logger.warn(
//         `${config.apiName} called without message argument`,
//         callNode,
//       );
//       return defFactory.createUndefinedDef(callNode);
//     }
//     recordSendMessageTaint(message, astNode, callNode, firstArg);
//     if (callback && Def.isFunctionDef(callback)) {
//       const responseDef = defFactory.createUnknownDef(callNode);
//       const taintId = taintManager.createTaintSource(
//         responseDef,
//         "PSEUDO_MESSAGE",
//         astNode,
//         true,
//       );
//       const channel =
//         config.hasExternalChannel && firstArg
//           ? `runtime.single.external.response.message`
//           : `runtime.single.response.message`;
//       taintManager.addPseudoTaintReceiver({
//         taintId,
//         astNode,
//         contextFilename,
//         channel,
//         targetDef: responseDef,
//         ...(firstArg ? { outer: firstArg } : {}),
//       });
//       interAnalyzer.analyze(callNode, callback, [responseDef], null, astNode);
//       return defFactory.createUndefinedDef(callNode);
//     }
//     return createResponsePromise(callNode, astNode, firstArg);
//   };
// }
// // --------------------- chrome.runtime.sendMessage -------------------
// BuiltInSemantics.register(
//   "chrome.runtime.sendMessage",
//   createSendMessageHandler({
//     apiName: "chrome.runtime.sendMessage",
//     parseFirstArg: literalExtensionId,
//     hasExternalChannel: true,
//   }),
// );
// // --------------------- chrome.tabs.sendMessage -------------------
// BuiltInSemantics.register(
//   "chrome.tabs.sendMessage",
//   createSendMessageHandler({
//     apiName: "chrome.tabs.sendMessage",
//     parseFirstArg: literalOuter,
//     hasExternalChannel: false,
//   }),
// );
// // --------------------- chrome.runtime.onMessage.addListener -------------------
// BuiltInSemantics.register(
//   "chrome.runtime.onMessage.addListener",
//   (args, callNode, astNode) => {
//     interAnalyzer.setCurrentSideEffects(); // side effect
//     const callbackFunc = args[0];
//     if (!Def.isFunctionDef(callbackFunc)) return;
//     const message = defFactory.createUnknownDef(callNode);
//     const sender = defFactory.createUnknownDef(callNode);
//     const sendResponse = defFactory.createBuiltInFunctionDef(
//       callNode,
//       "runtime.sendResponse",
//     );
//     sendResponse.semanticExec = BuiltInSemantics.get("runtime.sendResponse");
//     const taintId = taintManager.createTaintSource(
//       message,
//       "PSEUDO_MESSAGE",
//       astNode,
//       true,
//     );
//     taintManager.addPseudoTaintReceiver({
//       taintId,
//       astNode,
//       contextFilename: callNode.scopeTree?.key!,
//       channel: "runtime.single.sender.message",
//       targetDef: message,
//     });
//     interAnalyzer.analyze(
//       callNode,
//       callbackFunc,
//       [message, sender, sendResponse],
//       null,
//       astNode,
//     );
//     return undefined;
//   },
// );
// // --------------------- runtime.port.postMessage -------------------
// BuiltInSemantics.register(
//   "runtime.port.postMessage",
//   (args, callNode, astNode, thisDef) => {
//     interAnalyzer.setCurrentSideEffects(); // side effect
//     const message = args[0];
//     if (!message?.isTainted) return undefined;
//     const contextFile = callNode.scopeTree?.key;
//     if (!contextFile) return undefined;
//     const outer = (thisDef as any)?.__outer;
//     const channel = outer
//       ? "runtime.connect.external.sender.message"
//       : "runtime.connect.sender.message";
//     taintManager.addPseudoTaintSender({
//       taintDef: message,
//       astNode,
//       contextFilename: callNode.scopeTree?.key!,
//       channel: channel,
//       ...(outer ? { outer } : {}),
//     });
//     return undefined;
//   },
// );
// // --------------------- runtime.port.onMessage.addListener -------------------
// BuiltInSemantics.register(
//   "runtime.port.onMessage.addListener",
//   (args, callNode, astNode, thisDef) => {
//     interAnalyzer.setCurrentSideEffects(); // side effect
//     const callback = args[0];
//     const contextFile = callNode.scopeTree?.key;
//     if (!Def.isFunctionDef(callback) || !contextFile) return undefined;
//     const message = defFactory.createUnknownDef(callNode);
//     const taintId = taintManager.createTaintSource(
//       message,
//       "PSEUDO_MESSAGE",
//       astNode,
//       true,
//     );
//     const outer = (thisDef as any)?.__outer;
//     const channel = outer
//       ? "runtime.connect.external.sender.message"
//       : "runtime.connect.sender.message";
//     taintManager.addPseudoTaintReceiver({
//       taintId,
//       astNode,
//       contextFilename: contextFile,
//       channel: channel,
//       targetDef: message,
//       ...(outer ? { outer } : {}),
//     });
//     interAnalyzer.analyze(callNode, callback, [message], null, astNode);
//     return undefined;
//   },
// );
// // --------------------- chrome.runtime.connect -------------------
// BuiltInSemantics.register(
//   "chrome.runtime.connect",
//   (args, callNode, _astNode) => {
//     // chrome.runtime.connect(extensionId?: string, connectInfo?: object): Port
//     const extensionId = Def.isLiteralDef(args[0])
//       ? literalExtensionId(args[0])
//       : undefined;
//     // do not consider port name
//     const port = defFactory.createObjectDef(callNode);
//     (port as any).__outer = extensionId;
//     // postMessage semantic
//     const postMessage = defFactory.createBuiltInFunctionDef(
//       callNode,
//       "runtime.port.postMessage",
//     );
//     postMessage.semanticExec = BuiltInSemantics.get("runtime.port.postMessage");
//     // onMessage  semantic
//     const onMessage = defFactory.createObjectDef(callNode);
//     (onMessage as any).__outer = extensionId;
//     const addListener = defFactory.createBuiltInFunctionDef(
//       callNode,
//       "runtime.port.onMessage.addListener",
//     );
//     addListener.semanticExec = BuiltInSemantics.get(
//       "runtime.port.onMessage.addListener",
//     );
//     onMessage.setProperty("addListener", addListener);
//     port.setProperty("postMessage", postMessage);
//     port.setProperty("onMessage", onMessage);
//     return port;
//   },
// );
// // --------------------- chrome.runtime.onConnect.addListener -------------------
// BuiltInSemantics.register(
//   "chrome.runtime.onConnect.addListener",
//   (args, callNode, astNode) => {
//     interAnalyzer.setCurrentSideEffects(); // side effect
//     const callback = args[0];
//     if (!Def.isFunctionDef(callback)) return undefined;
//     // do not consider portName
//     const port = defFactory.createObjectDef(callNode);
//     // postMessage semantic
//     const postMessage = defFactory.createBuiltInFunctionDef(
//       callNode,
//       "runtime.port.postMessage",
//     );
//     postMessage.semanticExec = BuiltInSemantics.get("runtime.port.postMessage");
//     // onMessage.addListener semantic
//     const onMessage = defFactory.createObjectDef(callNode);
//     const addListener = defFactory.createBuiltInFunctionDef(
//       callNode,
//       "runtime.port.onMessage.addListener",
//     );
//     addListener.semanticExec = BuiltInSemantics.get(
//       "runtime.port.onMessage.addListener",
//     );
//     onMessage.setProperty("addListener", addListener);
//     port.setProperty("postMessage", postMessage);
//     port.setProperty("onMessage", onMessage);
//     interAnalyzer.analyze(callNode, callback, [port], null, astNode);
//     return undefined;
//   },
// );
// // --------------------- runtime.sendResponse.external -------------------
// BuiltInSemantics.register(
//   "runtime.sendResponse.external",
//   (args, callNode, astNode) => {
//     const response = args[0];
//     if (!response?.isTainted) return;
//     taintManager.checkSink(response, "RUNTIME_SINGLE_EXTERNAL_SENDRESPONSE", astNode, "runtime.single.external.response.message")
//     // taintManager.addPseudoTaintSender({
//     //   taintDef: response,
//     //   astNode,
//     //   contextFilename: callNode.scopeTree?.key!,
//     //   channel: "runtime.single.external.response.message",
//     //   outer: "RUNTIME-SINGLE-EXTERNAL-SENDRESPONSE",
//     // });
//     return undefined;
//   },
// );
// // --------------------- chrome.runtime.onMessageExternal.addListener -------------------
// BuiltInSemantics.register(
//   "chrome.runtime.onMessageExternal.addListener",
//   (args, callNode, astNode) => {
//     interAnalyzer.setCurrentSideEffects(); // side effect
//     const callback = args[0];
//     if (!Def.isFunctionDef(callback)) return undefined;
//     const message = defFactory.createUnknownDef(callNode);
//     const sender = defFactory.createUnknownDef(callNode);
//     // sendResponse semantic
//     const sendResponse = defFactory.createBuiltInFunctionDef(
//       callNode,
//       "runtime.sendResponse.external",
//     );
//     sendResponse.semanticExec = BuiltInSemantics.get(
//       "runtime.sendResponse.external",
//     );
//     // Pseudo taint source
//     const taintId = taintManager.createTaintSource(
//       message,
//       "CHROME_MESSAGE_EXTERNAL",
//       astNode,
//       false, // TODO: 这里设置的问题，需要去掉后面
//     );
//     taintManager.addPseudoTaintReceiver({
//       taintId,
//       astNode,
//       contextFilename: callNode.scopeTree?.key!,
//       channel: "runtime.single.external.sender.message",
//       targetDef: message,
//       outer: "RUNTIME-SINGLE-EXTERANL-ONMESSAGEEXTERNAL",
//     });
//     interAnalyzer.analyze(
//       callNode,
//       callback,
//       [message, sender, sendResponse],
//       null,
//       astNode,
//     );
//     return undefined;
//   },
// );
// // --------------------- runtime.port.external.postMessage -------------------
// BuiltInSemantics.register(
//   "runtime.port.external.postMessage",
//   (args, callNode, astNode, _thisDef) => {
//     const message = args[0];
//     const contextFile = callNode.scopeTree?.key;
//     if (!message || !message.isTainted || !contextFile) return undefined;
//     taintManager.addPseudoTaintSender({
//       taintDef: message,
//       astNode,
//       contextFilename: contextFile,
//       channel: "runtime.connect.external.sender.message",
//       outer: "RUNTIME-CONNECT-EXTERANL-POSTMESSAGE",
//     });
//     return undefined;
//   },
// );
// // --------------------- runtime.port.onMessage.addListener -------------------
// BuiltInSemantics.register(
//   "runtime.port.external.onMessage.addListener",
//   (args, callNode, astNode, thisDef) => {
//     interAnalyzer.setCurrentSideEffects(); // side effect
//     const callback = args[0];
//     const contextFile = callNode.scopeTree?.key;
//     if (!Def.isFunctionDef(callback) || !contextFile) return undefined;
//     const message = defFactory.createUnknownDef(callNode);
//     const taintId = taintManager.createTaintSource(
//       message,
//       "CHROME_CONNECT_EXTERNAL",
//       astNode,
//       false,
//     );
//     taintManager.addPseudoTaintReceiver({
//       taintId,
//       astNode,
//       contextFilename: contextFile,
//       channel: "runtime.connect.external.sender.message",
//       targetDef: message,
//       outer: "RUNTIME-CONNECT-EXTERNAL-ONMESSAGE",
//     });
//     interAnalyzer.analyze(callNode, callback, [message], null, astNode);
//     return undefined;
//   },
// );
// // --------------------- chrome.runtime.onConnectExternal.addListener -------------------
// BuiltInSemantics.register(
//   "chrome.runtime.onConnectExternal.addListener",
//   (args, callNode, astNode) => {
//     interAnalyzer.setCurrentSideEffects(); // side effect
//     const callback = args[0];
//     if (!Def.isFunctionDef(callback)) return;
//     // do not consider portName
//     const port = defFactory.createObjectDef(callNode);
//     // port.postMessage semantic
//     const postMessage = defFactory.createBuiltInFunctionDef(
//       callNode,
//       "runtime.port.external.postMessage",
//     );
//     postMessage.semanticExec = BuiltInSemantics.get(
//       "runtime.port.external.postMessage",
//     );
//     // port.onMessage.addListener semantic
//     const onMessage = defFactory.createObjectDef(callNode);
//     const addListener = defFactory.createBuiltInFunctionDef(
//       callNode,
//       "runtime.port.external.onMessage.addListener",
//     );
//     addListener.semanticExec = BuiltInSemantics.get(
//       "runtime.port.external.onMessage.addListener",
//     );
//     onMessage.setProperty("addListener", addListener);
//     port.setProperty("postMessage", postMessage);
//     port.setProperty("onMessage", onMessage);
//     interAnalyzer.analyze(callNode, callback, [port], null, astNode);
//     return undefined;
//   },
// );
// // --------------------- chrome.runtime.sendNativeMessage -------------------
// BuiltInSemantics.register(
//   "chrome.runtime.sendNativeMessage",
//   (args, callNode, astNode) => {
//     const paramCount = args.length;
//     if (paramCount === 0)
//       return defFactory.createUndefinedDef(callNode);
//     const lastArgIsFunction =
//       paramCount > 0 && Def.isFunctionDef(args[paramCount - 1]);
//     const contextFilename = callNode.scopeTree?.key;
//     if (!contextFilename)
//       return defFactory.createUndefinedDef(callNode);
//     let nativeApp: string | undefined;
//     let message: Def | undefined;
//     let callback: Def | undefined;
//     // chrome.runtime.sendNativeMessage(appName, message, callback?)
//     if (lastArgIsFunction) {
//       callback = args[paramCount - 1];
//       nativeApp = Def.isLiteralDef(args[0])
//         ? literalOuter(args[0])
//         : "UNKNOWN_APPLICATION";
//       message = args[1];
//     } else {
//       nativeApp = Def.isLiteralDef(args[0])
//         ? literalOuter(args[0])
//         : "UNKNOWN_APPLICATION";
//       message = args[1];
//     }
//     if (!message)
//       return defFactory.createUndefinedDef(callNode);
//     // tainted request → native host
//     if (message.isTainted) {
//       taintManager.addPseudoTaintSender({
//         taintDef: message,
//         astNode,
//         contextFilename,
//         channel: "runtime.native.single.sender.message",
//         ...(nativeApp ? { outer: nativeApp } : {}),
//       });
//     }
//     // callback style
//     if (callback && Def.isFunctionDef(callback)) {
//       const responseDef = defFactory.createUnknownDef(callNode);
//       const taintId = taintManager.createTaintSource(
//         responseDef,
//         "CHROME_NATIVE_RESPONSE",
//         astNode,
//         false,
//       );
//       taintManager.addPseudoTaintReceiver({
//         taintId,
//         astNode,
//         contextFilename,
//         channel: "runtime.native.single.response.message",
//         targetDef: responseDef,
//         ...(nativeApp ? { outer: nativeApp } : {}),
//       });
//       interAnalyzer.analyze(callNode, callback, [responseDef], null, astNode);
//       return defFactory.createUndefinedDef(callNode);
//     }
//     // Promise style
//     const retDef = defFactory.createUnknownDef(callNode);
//     const promise = defFactory.createPromiseDef(callNode, retDef);
//     const taintId = taintManager.createTaintSource(
//       retDef,
//       "CHROME_NATIVE_RESPONSE",
//       astNode,
//       false,
//     );
//     taintManager.addPseudoTaintReceiver({
//       taintId,
//       astNode,
//       contextFilename,
//       channel: "runtime.native.single.response.message",
//       targetDef: retDef,
//       ...(nativeApp ? { outer: nativeApp } : {}),
//     });
//     return promise;
//   },
// );
// // --------------------- runtime.native.port.postMessage -------------------
// BuiltInSemantics.register(
//   "runtime.native.port.postMessage",
//   (args, callNode, astNode, thisDef) => {
//     interAnalyzer.setCurrentSideEffects();
//     const message = args[0];
//     const contextFile = callNode.scopeTree?.key;
//     if (!message?.isTainted || !contextFile)
//       return undefined;
//     const outer = (thisDef as any)?.__outer;
//     console.log("-----------", message.isTainted, contextFile, outer);
//     taintManager.addPseudoTaintSender({
//       taintDef: message,
//       astNode,
//       contextFilename: contextFile,
//       channel: "runtime.native.connect.sender.message",
//       ...(outer ? { outer } : {}),
//     });
//     return undefined;
//   },
// );
// // --------------------- chrome.runtime.connectNative -------------------
// BuiltInSemantics.register(
//   "chrome.runtime.connectNative",
//   (args, callNode) => {
//     // chrome.runtime.connectNative(applicationName: string): Port
//     const appName = Def.isLiteralDef(args[0])
//       ? literalOuter(args[0])
//       : undefined;
//     const port = defFactory.createObjectDef(callNode);
//     (port as any).__outer = appName;
//     // postMessage semantic
//     const postMessage = defFactory.createBuiltInFunctionDef(
//       callNode,
//       "runtime.native.port.postMessage",
//     );
//     postMessage.semanticExec = BuiltInSemantics.get(
//       "runtime.native.port.postMessage",
//     );
//     // onMessage semantic
//     const onMessage = defFactory.createObjectDef(callNode);
//     (onMessage as any).__outer = appName;
//     const addListener = defFactory.createBuiltInFunctionDef(
//       callNode,
//       "runtime.native.port.onMessage.addListener",
//     );
//     addListener.semanticExec = BuiltInSemantics.get(
//       "runtime.native.port.onMessage.addListener",
//     );
//     onMessage.setProperty("addListener", addListener);
//     port.setProperty("postMessage", postMessage);
//     port.setProperty("onMessage", onMessage);
//     return port;
//   },
// );
// // --------------------- runtime.native.port.onMessage.addListener -------------------
// BuiltInSemantics.register(
//   "runtime.native.port.onMessage.addListener",
//   (args, callNode, astNode, thisDef) => {
//     interAnalyzer.setCurrentSideEffects();
//     const callback = args[0];
//     const contextFile = callNode.scopeTree?.key;
//     if (!Def.isFunctionDef(callback) || !contextFile)
//       return undefined;
//     const message = defFactory.createUnknownDef(callNode);
//     const taintId = taintManager.createTaintSource(
//       message,
//       "CHROME_NATIVE_CONNECT",
//       astNode,
//       false,
//     );
//     const outer = (thisDef as any)?.__outer;
//     taintManager.addPseudoTaintReceiver({
//       taintId,
//       astNode,
//       contextFilename: contextFile,
//       channel: "runtime.native.connect.sender.message",
//       targetDef: message,
//       ...(outer ? { outer } : {}),
//     });
//     interAnalyzer.analyze(callNode, callback, [message], null, astNode);
//     return undefined;
//   },
// );
// // --------------------- chrome.runtime.onConnectNative.addListener -------------------
// BuiltInSemantics.register(
//   "chrome.runtime.onConnectNative.addListener",
//   (args, callNode, astNode) => {
//     interAnalyzer.setCurrentSideEffects();
//     const callback = args[0];
//     if (!Def.isFunctionDef(callback))
//       return undefined;
//     const port = defFactory.createObjectDef(callNode);
//     // postMessage
//     const postMessage = defFactory.createBuiltInFunctionDef(
//       callNode,
//       "runtime.native.port.postMessage",
//     );
//     postMessage.semanticExec = BuiltInSemantics.get(
//       "runtime.native.port.postMessage",
//     );
//     // onMessage
//     const onMessage = defFactory.createObjectDef(callNode);
//     const addListener = defFactory.createBuiltInFunctionDef(
//       callNode,
//       "runtime.native.port.onMessage.addListener",
//     );
//     addListener.semanticExec = BuiltInSemantics.get(
//       "runtime.native.port.onMessage.addListener",
//     );
//     onMessage.setProperty("addListener", addListener);
//     port.setProperty("postMessage", postMessage);
//     port.setProperty("onMessage", onMessage);
//     interAnalyzer.analyze(callNode, callback, [port], null, astNode);
//     return undefined;
//   },
// );
