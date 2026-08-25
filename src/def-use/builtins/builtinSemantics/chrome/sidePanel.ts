/**
 * `chrome.sidePanel.*` semantics — no taint sources or sinks today.
 *
 * The side panel HTML itself is discovered via `manifest.side_panel.default_path`
 * in `scriptUsageTracker`. The runtime APIs (`setOptions`, `setPanelBehavior`,
 * `open`) only change UI plumbing and don't introduce new taint flows, so they
 * are modelled as side-effect-only no-ops. Registering them explicitly stops
 * `BuiltInSemantics.get` from logging "Can't find" warnings for legit calls.
 */
import {
  BuiltInSemantics,
  defFactory,
  interAnalyzer,
} from "../index";

for (const name of [
  "chrome.sidePanel.setOptions",
  "chrome.sidePanel.setPanelBehavior",
  "chrome.sidePanel.open",
]) {
  BuiltInSemantics.register(name, (_args, callNode, _astNode) => {
    interAnalyzer.setCurrentSideEffects();
    return defFactory.createPromiseDef(callNode);
  });
}
