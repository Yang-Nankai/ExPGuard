/**
 * `chrome.devtools.panels.create(title, iconPath, pagePath, callback?)`
 *
 * A devtools page can register one or more panels in DevTools; each panel
 * loads its own HTML, which can in turn pull in JavaScript that runs in the
 * privileged devtools context. We want those panel scripts in the analysis
 * pipeline because they are a legitimate sink/source surface.
 *
 * Strategy: when `pagePath` is a literal string, register the corresponding
 * HTML as an `extension_page` of type `devtools_panel`. The `chrome.devtools`
 * APIs are only callable from inside a `devtools_page` (Chrome enforces this
 * at runtime), so the caller frame must already be `DT_*`.
 *
 * Dynamic page paths are skipped with a debug log — same conservative policy
 * as `chrome.offscreen.createDocument`.
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
  "chrome.devtools.panels.create",
  (args, callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();

    // chrome.devtools.panels.create(title, iconPath, pagePath, callback?)
    const pagePathArg = args[2];
    const callback = args[3];

    if (Def.isLiteralDef(pagePathArg) && typeof pagePathArg.value === "string") {
      const callerKey = callNode.scopeTree?.key;
      scriptUsageTracker.registerRuntimeDiscoveredComponent({
        type: "devtools_panel",
        htmlRelPath: pagePathArg.value,
        manifestSource: "runtime:chrome.devtools.panels.create",
        discoveredFromScriptKey: callerKey,
      });
    } else {
      logger.debug(
        "[DEVTOOLS] chrome.devtools.panels.create called with non-literal pagePath — skipping component discovery",
      );
    }

    // The API returns a `panel` object; we model it as a fresh object so any
    // downstream `.onShown.addListener(...)` calls have something to attach
    // to. We also evaluate the callback if provided — Chrome invokes it with
    // the created panel object.
    const panel = defFactory.createObjectDef(callNode);

    if (Def.isFunctionDef(callback)) {
      interAnalyzer.analyze(callNode, callback, [panel], null, astNode);
    }

    return panel;
  },
);
