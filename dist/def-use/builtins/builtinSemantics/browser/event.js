"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("../../../../constants/event");
const index_1 = require("../index");
/**
 * Common handler for addEventListener logic.
 * Supports both standard "message" events and generic custom events.
 */
const handleEventListener = (args, callNode, astNode, isWindowEvent) => {
    const [eventType, callback] = args;
    // Validate that the event type is a literal and callback is a function
    if (!index_1.Def.isLiteralDef(eventType) || !index_1.Def.isFunctionDef(callback))
        return;
    const eventName = String(eventType.value);
    index_1.interAnalyzer.setCurrentSideEffects();
    // Initialize the Event object definition
    const event = index_1.defFactory.createObjectDef(callNode);
    if (eventName === "message") {
        /** * Special handling for 'message' events (Cross-document messaging).
         * We define 'data' and 'origin' properties as potential taint sources.
         */
        const data = index_1.defFactory.createUnknownDef(callNode);
        const origin = index_1.defFactory.createUnknownDef(callNode);
        event.setProperty("data", data);
        event.setProperty("origin", origin);
        index_1.taintManager.createTaintSource(data, "WINDOW_MESSAGE_EVENT", astNode, false, "window.addEventListener(message)");
    }
    else if (!event_1.JS_EVENT_NAMES.includes(eventName)) {
        /**
         * Handling for Custom Events (Events not in the standard JS_EVENT_NAMES list).
         * Mark the entire event object as a taint source for custom event logic.
         */
        index_1.taintManager.createTaintSource(event, isWindowEvent ? "WINDOW_CUSTOM_EVENT" : "TARGET_CUSTOM_EVENT", astNode, false, `${isWindowEvent ? "window" : "target"}.addEventListener(${eventName})`);
    }
    else {
        // Skip analysis for standard non-data-carrying events (e.g., click, scroll)
        return undefined;
    }
    // Perform inter-procedural analysis on the callback with the mocked event object
    index_1.interAnalyzer.analyze(callNode, callback, [event], null, astNode);
};
// --------------------- window.addEventListener -------------------
index_1.BuiltInSemantics.register("addEventListener", (args, callNode, astNode) => {
    return handleEventListener(args, callNode, astNode, true);
});
// --------------------- target.addEventListener -------------------
index_1.BuiltInSemantics.register("target.addEventListener", (args, callNode, astNode) => {
    return handleEventListener(args, callNode, astNode, false);
});
// --------------------- window.postMessage -------------------
index_1.BuiltInSemantics.register("postMessage", (args, callNode, astNode) => {
    var _a;
    const message = args[0];
    const targetOrigin = args[1];
    const outer = (_a = (0, index_1.literalOuter)(targetOrigin)) !== null && _a !== void 0 ? _a : "[UNKNOWN ORIGIN]";
    // If the message being sent is tainted, check it against the postMessage sink
    if (message === null || message === void 0 ? void 0 : message.isTainted) {
        index_1.taintManager.checkSink(message, "WINDOW_POSTMESSAGE", astNode, outer);
    }
    return undefined;
});
