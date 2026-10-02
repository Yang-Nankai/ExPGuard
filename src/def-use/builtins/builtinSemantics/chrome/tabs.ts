import { createChromeBuiltinSemantics } from "./utils";
import { BuiltInSemantics, Def, defFactory, DefFactory, interAnalyzer, taintManager } from "../index";
import { scriptUsageTracker } from "../../../../extension/scriptUsageTracker";




// --------------------- chrome.tabs -------------------
createChromeBuiltinSemantics({
  apiName: "chrome.tabs.captureVisibleTab",
  callbackIndex: 2,
  sourceType: "CHROME_TABS_CAPUTURE_VISIBLE_TAB",
  createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
});

/**
 * A tab-update event carries a browsing URL even though it is delivered by an
 * event listener rather than a query API. Treat both `changeInfo.url` and the
 * current `tab.url` as sensitive browser data: background scripts can observe
 * them for every tab when the extension has the `tabs`/host permission.
 */
BuiltInSemantics.register(
  "chrome.tabs.onUpdated.addListener",
  (args, callNode, astNode) => {
    const callback = args[0];
    if (!Def.isFunctionDef(callback)) {
      return defFactory.createUndefinedDef(callNode);
    }

    interAnalyzer.setCurrentSideEffects();

    const tabId = defFactory.createUnknownDef(callNode);
    const changeInfo = defFactory.createObjectDef(callNode);
    const tab = defFactory.createObjectDef(callNode);
    const changeUrl = defFactory.createUnknownDef(callNode);
    const tabUrl = defFactory.createUnknownDef(callNode);

    changeInfo.setProperty("url", changeUrl);
    changeInfo.setProperty("status", defFactory.createLiteralDef(callNode, "loading"));
    tab.setProperty("url", tabUrl);

    taintManager.createTaintSource(
      changeUrl,
      "CHROME_TABS_ONUPDATED_URL",
      astNode,
      false,
      "chrome.tabs.onUpdated[changeInfo.url]",
    );
    taintManager.createTaintSource(
      tabUrl,
      "CHROME_TABS_ONUPDATED_URL",
      astNode,
      false,
      "chrome.tabs.onUpdated[tab.url]",
    );

    interAnalyzer.analyze(
      callNode,
      callback,
      [tabId, changeInfo, tab],
      null,
      astNode,
    );
    return defFactory.createUndefinedDef(callNode);
  },
);

createChromeBuiltinSemantics({
  apiName: "chrome.tabs.detectLanguage",
  callbackIndex: 1,
  sourceType: "CHROME_TABS_DETECT_LANUAGE",
  createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
});

createChromeBuiltinSemantics({
  apiName: "chrome.tabs.create",
  sinkArgs: [{ index: 0, sinkType: "CHROME_TABS_CREATE_OPTIONS" }],
  callbackIndex: 1,
});

// --------------------- chrome.tabs.executeScript -------------------
BuiltInSemantics.register(
  "chrome.tabs.executeScript",
  (args, callNode, astNode, _thisDef) => {
    interAnalyzer.setCurrentSideEffects(); // side effect

    if (args.length === 0) {
      return defFactory.createUndefinedDef(callNode);
    }

    let details: Def | undefined;
    let callbackFunc: Def | undefined;

    // Possible calling formats:
    // executeScript(details, callback)
    // executeScript(tabId, details, callback)

    if (args.length === 1) {
      details = args[0];
    } else if (args.length === 2) {
      if (Def.isObjectDef(args[0])) {
        details = args[0];
        callbackFunc = args[1];
      } else {
        details = args[1];
      }
    } else if (args.length >= 3) {
      details = args[1];
      callbackFunc = args[2];
    }

    // -------------------------
    // Sink: details.code
    // Sink: details.file
    // -------------------------
    if (details && Def.isObjectDef(details)) {
      const codeDef = details.lookupProperty("code");
      const fileDef = details.lookupProperty("file");

      if (Def.isLiteralDef(fileDef) && typeof fileDef.value === "string") {
        scriptUsageTracker.markReferencedScriptByPathOrUrlByKey(
          callNode.scopeTree?.key,
          fileDef.value,
        );
      }

      if (codeDef) {
        taintManager.checkSink(codeDef, "CHROME_TABS_EXECUTE", astNode);
      }
    }

    // -------------------------
    // callback-style
    // -------------------------
    if (callbackFunc && Def.isFunctionDef(callbackFunc)) {
      // Simple: don't care the result
      interAnalyzer.analyze(callNode, callbackFunc, [], null, astNode);
    }

    return defFactory.createUndefinedDef(callNode);
  },
);
