import { JS_EVENT_NAMES } from "../../../../constants/event";
import {
  BuiltInSemantics,
  defFactory,
  Def,
  interAnalyzer,
  taintManager,
  literalOuter,
} from "../index";

/**
 * Common handler for addEventListener logic.
 * Supports both standard "message" events and generic custom events.
 */
const handleEventListener = (args: any[], callNode: any, astNode: any, isWindowEvent: boolean) => {
  const [eventType, callback] = args;

  // Validate that the event type is a literal and callback is a function
  if (!Def.isLiteralDef(eventType) || !Def.isFunctionDef(callback)) return;

  const eventName = String(eventType.value);
  interAnalyzer.setCurrentSideEffects();

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
  } else if (!JS_EVENT_NAMES.includes(eventName)) {
    /**
     * Handling for Custom Events (Events not in the standard JS_EVENT_NAMES list).
     * Mark the entire event object as a taint source for custom event logic.
     */
    taintManager.createTaintSource(
      event,
      isWindowEvent ? "WINDOW_CUSTOM_EVENT" : "TARGET_CUSTOM_EVENT",
      astNode,
      false,
      `${isWindowEvent ? "window" : "target"}.addEventListener(${eventName})`,
    );
  } else {
    // Skip analysis for standard non-data-carrying events (e.g., click, scroll)
    return undefined;
  }

  // Perform inter-procedural analysis on the callback with the mocked event object
  interAnalyzer.analyze(callNode, callback, [event], null, astNode);
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