import { JS_EVENT_NAMES } from "../../../../constants/event";
import {
  BuiltInSemantics,
  defFactory,
  Def,
  interAnalyzer,
  taintManager,
  literalOuter,
} from "../index";
import { createElementDef } from "./document";

/**
 * Standard DOM events whose event object carries web-page-controlled payload
 * data beyond `target`. The named property is modeled as an opaque value
 * carrying the same capability as any other page-derived content.
 */
const EVENT_PAYLOAD_PROPERTIES: Record<string, string[]> = {
  paste: ["clipboardData"],
  copy: ["clipboardData"],
  cut: ["clipboardData"],
  drop: ["dataTransfer"],
  drag: ["dataTransfer"],
  dragstart: ["dataTransfer"],
  dragend: ["dataTransfer"],
  dragover: ["dataTransfer"],
  dragenter: ["dataTransfer"],
  dragleave: ["dataTransfer"],
  submit: ["submitter"],
  hashchange: ["newURL", "oldURL"],
};

/**
 * Build the event object handed to a standard DOM event handler.
 *
 * `target` / `currentTarget` are modeled as real DOM elements, so
 * `event.target.value` inside a `click` / `input` / `submit` handler yields the
 * usual `ELEMENT_VALUE` source. The event object itself is deliberately *not*
 * marked as a taint source: a click is not attacker-supplied data, and blanket
 * tainting would misclassify ordinary UI code as ATTACKER_INPUT. The value of
 * analyzing these handlers is reachability — the sources and sinks written
 * inside the handler body, and every function only reachable through it.
 */
export const buildStandardEventDef = (
  callNode: any,
  astNode: any,
  eventName: string,
) => {
  const event = defFactory.createObjectDef(callNode);

  const target = createElementDef(callNode, astNode, `event(${eventName})`);
  event.setProperty("target", target);
  event.setProperty("currentTarget", target);
  event.setProperty("srcElement", target);
  event.setProperty("type", defFactory.createLiteralDef(callNode, eventName));

  for (const prop of EVENT_PAYLOAD_PROPERTIES[eventName] ?? []) {
    const payload = defFactory.createUnknownDef(callNode);
    event.setProperty(prop, payload);
    taintManager.createTaintSource(
      payload,
      "ELEMENT_VALUE",
      astNode,
      false,
      `event(${eventName}).${prop}`,
    );
  }

  return event;
};

/**
 * Common handler for addEventListener logic.
 * Supports both standard "message" events and generic custom events.
 */
/**
 * Analyze a DOM-style callback without relying on a concrete
 * `addEventListener` call.  Library summaries (currently jQuery's event
 * helpers) reuse this so that skipping a vendor implementation does not skip
 * extension-owned handlers registered through that library.
 */
export function analyzeDomEventHandler(
  eventName: string | null,
  callback: Def | undefined,
  callNode: any,
  astNode: any,
  isWindowEvent: boolean,
) {
  // The callback must be analyzable. Accept a concrete function OR an ImplicitDef
  // set of candidate functions — obfuscated RPC bridges register the handler via a
  // computed method name (e.g. `comm['handle' + srcId].bind(comm)`), which resolves
  // to an ImplicitDef; the inter-procedural analyzer iterates such candidates.
  if (!Def.isFunctionDef(callback) && !Def.isImplicitDef(callback)) return;

  // The event name may be a string literal (the common case) OR a computed /
  // dynamic value (e.g. obfuscated RPC bridges register listeners on a runtime
  // event name such as `document.addEventListener(comm.sid, handler)` where
  // `comm.sid = vmid + destId`). A non-literal name is `null` here; we must NOT
  // drop it — an attacker can dispatch an event of any (page-observable) name, so
  // a dynamically-named listener is conservatively a custom-event taint source.
  interAnalyzer.setCurrentSideEffects();

  if (eventName !== null && JS_EVENT_NAMES.includes(eventName) && eventName !== "message") {
    /**
     * Standard DOM event (click / submit / input / keydown / ...).
     *
     * These used to be skipped entirely, which meant the handler body — and
     * everything reachable only through it — was never analyzed. Real-world
     * form hijacking, keylogging and click-triggered activation all live in
     * exactly these handlers, so skipping them was a systematic
     * false-negative source (see `samples/event_driven_attack`).
     */
    const domEvent = buildStandardEventDef(callNode, astNode, eventName);
    interAnalyzer.analyze(callNode, callback, [domEvent], null, astNode);
    return undefined;
  }

  // Initialize the Event object definition
  const event = defFactory.createObjectDef(callNode);

  if (eventName === "message") {
    /** * Special handling for 'message' events (Cross-document messaging).
     * We define 'data' and 'origin' properties as potential taint sources.
     */
    const data = defFactory.createUnknownDef(callNode);
    const origin = defFactory.createUnknownDef(callNode);

    event.setProperty("data", data);
    event.setProperty("origin", origin);

    taintManager.createTaintSource(
      data,
      "WINDOW_MESSAGE_EVENT",
      astNode,
      false,
      "window.addEventListener(message)",
    );
  } else if (eventName === null || !JS_EVENT_NAMES.includes(eventName)) {
    /**
     * Custom Events (a name not in JS_EVENT_NAMES) AND dynamically-named
     * listeners (eventName === null). Both are treated as custom-event taint
     * sources: the whole event object is marked tainted, so `event.detail` /
     * `event.data` forwarded through the handler carry taint. A dynamic name is
     * over-approximated as a custom event rather than silently dropped.
     */
    taintManager.createTaintSource(
      event,
      isWindowEvent ? "WINDOW_CUSTOM_EVENT" : "TARGET_CUSTOM_EVENT",
      astNode,
      false,
      `${isWindowEvent ? "window" : "target"}.addEventListener(${eventName ?? "<dynamic>"})`,
    );
  }

  // Perform inter-procedural analysis on the callback with the mocked event object
  interAnalyzer.analyze(callNode, callback, [event], null, astNode);
}

const handleEventListener = (args: Def[], callNode: any, astNode: any, isWindowEvent: boolean) => {
  const [eventType, callback] = args;
  const eventName = Def.isLiteralDef(eventType) ? String(eventType.value) : null;
  return analyzeDomEventHandler(eventName, callback, callNode, astNode, isWindowEvent);
};

// --------------------- window.addEventListener -------------------
BuiltInSemantics.register("addEventListener", (args, callNode, astNode) => {
  return handleEventListener(args, callNode, astNode, true);
});

// --------------------- target.addEventListener -------------------
BuiltInSemantics.register("target.addEventListener", (args, callNode, astNode) => {
  return handleEventListener(args, callNode, astNode, false);
});

// --------------------- window.postMessage -------------------
BuiltInSemantics.register("postMessage", (args, callNode, astNode) => {
  const message = args[0];
  const targetOrigin = args[1];

  const outer = literalOuter(targetOrigin) ?? "[UNKNOWN ORIGIN]";
  
  // If the message being sent is tainted, check it against the postMessage sink
  if (message?.isTainted) {
    taintManager.checkSink(message, "WINDOW_POSTMESSAGE", astNode, outer);
  }

  return undefined;
});
