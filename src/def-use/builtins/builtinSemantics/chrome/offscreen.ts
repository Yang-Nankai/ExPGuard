/**
 * `chrome.offscreen.createDocument({ url, reasons, justification })`
 *
 * Offscreen documents are full extension pages but have no UI; they exist so
 * MV3 service workers can call APIs that require a DOM (audio, blobs,
 * clipboard, ...). They run in the extension permissions context and can
 * `chrome.runtime.sendMessage` straight to the background — that makes them a
 * legitimate intermediate node in privilege-escalation flows.
 *
 * Best-effort static discovery: when the `url` argument is a string literal
 * (the common case — the URL almost always points to a fixed HTML page
 * shipped with the extension), we register the page as a runtime-discovered
 * component. Dynamic / non-literal URLs are skipped with a debug log; the
 * call still proceeds as a side effect.
 */
import logger from "../../../../utils/logger";
import { scriptUsageTracker } from "../../../../extension/scriptUsageTracker";
import {
  BuiltInSemantics,
  Def,
  defFactory,
  interAnalyzer,
} from "../index";

BuiltInSemantics.register(
  "chrome.offscreen.createDocument",
  (args, callNode, _astNode) => {
    interAnalyzer.setCurrentSideEffects();

    const options = args[0];
    let urlLiteral: string | undefined;

    if (Def.isLiteralDef(options) && typeof options.value === "string") {
      // Defensive: docs require an object, but tolerate the unlikely
      // string-style invocation just in case obfuscators normalize it.
      urlLiteral = options.value;
    } else if (Def.isObjectDef(options)) {
      const urlDef = options.lookupProperty("url");
      if (Def.isLiteralDef(urlDef) && typeof urlDef.value === "string") {
        urlLiteral = urlDef.value;
      }
    }

    if (!urlLiteral) {
      logger.debug(
        "[OFFSCREEN] chrome.offscreen.createDocument called with non-literal URL — skipping component discovery",
      );
      return defFactory.createPromiseDef(callNode);
    }

    // `url` is usually a path; sometimes a `chrome-extension://<id>/...` URL.
    // `scriptUsageTracker` already knows how to peel that off.
    const callerKey = callNode.scopeTree?.key;
    scriptUsageTracker.registerRuntimeDiscoveredComponent({
      type: "offscreen",
      htmlRelPath: urlLiteral,
      manifestSource: "runtime:chrome.offscreen.createDocument",
      discoveredFromScriptKey: callerKey,
    });

    return defFactory.createPromiseDef(callNode);
  },
);

// `closeDocument` / `hasDocument` are present in the API surface for
// completeness; they're modelled as side-effecting no-ops so callers don't
// get an `UnknownDef` back where a promise is expected.
BuiltInSemantics.register(
  "chrome.offscreen.closeDocument",
  (_args, callNode, _astNode) => {
    interAnalyzer.setCurrentSideEffects();
    return defFactory.createPromiseDef(callNode);
  },
);

BuiltInSemantics.register(
  "chrome.offscreen.hasDocument",
  (_args, callNode, _astNode) => {
    interAnalyzer.setCurrentSideEffects();
    return defFactory.createPromiseDef(callNode);
  },
);
