"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../../../utils/logger"));
const scriptUsageTracker_1 = require("../../../../extension/scriptUsageTracker");
const index_1 = require("../index");
// --------------------- chrome.runtime.getURL -------------------
index_1.BuiltInSemantics.register("chrome.runtime.getURL", (args, callNode) => {
    var _a;
    const pathArg = args[0];
    if (index_1.Def.isLiteralDef(pathArg) && typeof pathArg.value === "string") {
        scriptUsageTracker_1.scriptUsageTracker.markReferencedScriptByPathOrUrlByKey((_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key, pathArg.value);
        // Keep literal path to support downstream file resolution in static model.
        return index_1.defFactory.createLiteralDef(callNode, pathArg.value);
    }
    return index_1.defFactory.createUnknownDef(callNode);
});
// ======================================================
// Helper: sendMessage taint handling
// ======================================================
function recordSendMessageTaint(message, astNode, callNode, outer) {
    var _a;
    const contextFile = (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key;
    if (!message || !message.isTainted || !contextFile)
        return;
    // External extension communication → sink
    if (outer) {
        index_1.taintManager.checkSink(message, "CHROME_RUNTIME_SENDMESSAGE_EXTERNAL", astNode, outer);
        return;
    }
    else {
        // Internal communication → pseudo channel
        index_1.taintManager.addPseudoTaintSender({
            taintDef: message,
            astNode,
            contextFilename: contextFile,
            channel: "runtime.single.sender.message",
        });
    }
}
// --------------------- runtime.sendResponse -------------------
function createResponsePromise(callNode, astNode, hasExternalChannel, outer) {
    var _a;
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const retDef = index_1.defFactory.createUnknownDef(callNode);
    const promise = index_1.defFactory.createPromiseDef(callNode, retDef);
    if (hasExternalChannel && outer) {
        index_1.taintManager.createTaintSource(retDef, "CHROME_SENDMESSAGE_EXTERNAL_RESPONSE", astNode, false, outer);
    }
    else {
        const taintId = index_1.taintManager.createTaintSource(retDef, "PSEUDO_MESSAGE", astNode, true);
        index_1.taintManager.addPseudoTaintReceiver({
            taintId,
            astNode,
            contextFilename: (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key,
            channel: "runtime.single.response.message",
            targetDef: retDef,
        });
    }
    return promise;
}
index_1.BuiltInSemantics.register("runtime.sendResponse", (args, callNode, astNode) => {
    var _a;
    const [response] = args;
    if (!(response === null || response === void 0 ? void 0 : response.isTainted))
        return;
    index_1.taintManager.addPseudoTaintSender({
        taintDef: response,
        astNode,
        contextFilename: (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key,
        channel: "runtime.single.response.message",
    });
    return undefined;
});
function createSendMessageHandler(config) {
    return (args, callNode, astNode) => {
        var _a;
        const paramCount = args.length;
        if (paramCount === 0)
            return index_1.defFactory.createUndefinedDef(callNode);
        const lastArgIsFunction = paramCount > 0 && index_1.Def.isFunctionDef(args[paramCount - 1]);
        const contextFilename = (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key;
        if (!contextFilename) {
            logger_1.default.warn(`Missing context filename for ${config.apiName}`, callNode);
            return index_1.defFactory.createUndefinedDef(callNode);
        }
        const parseArgs = () => {
            let firstArg, message, callback;
            let hasFirstArg = false;
            if (lastArgIsFunction) {
                callback = args[paramCount - 1];
                switch (paramCount) {
                    case 1:
                        logger_1.default.warn(`Invalid ${config.apiName} call: only callback provided`);
                        return { message: undefined, callback };
                    case 2:
                        message = args[0];
                        break;
                    case 3:
                        hasFirstArg = true;
                        firstArg = config.parseFirstArg(args[0]);
                        message = args[1];
                        break;
                    case 4:
                        hasFirstArg = true;
                        firstArg = index_1.Def.isLiteralDef(args[0])
                            ? config.parseFirstArg(args[0])
                            : undefined;
                        message = args[1];
                        break;
                }
            }
            else {
                switch (paramCount) {
                    case 1:
                        message = args[0];
                        break;
                    case 2:
                    case 3:
                        hasFirstArg = true;
                        firstArg =
                            paramCount === 3
                                ? index_1.Def.isLiteralDef(args[0])
                                    ? config.parseFirstArg(args[0])
                                    : undefined
                                : config.parseFirstArg(args[0]);
                        message = args[1];
                        break;
                }
            }
            return { hasFirstArg, firstArg, message, callback };
        };
        const { hasFirstArg, firstArg, message, callback } = parseArgs();
        if (message === undefined) {
            logger_1.default.warn(`${config.apiName} called without message argument`, callNode);
            return index_1.defFactory.createUndefinedDef(callNode);
        }
        recordSendMessageTaint(message, astNode, callNode, firstArg);
        if (callback && index_1.Def.isFunctionDef(callback)) {
            const responseDef = index_1.defFactory.createUnknownDef(callNode);
            if (config.hasExternalChannel && firstArg) {
                index_1.taintManager.createTaintSource(responseDef, "CHROME_SENDMESSAGE_EXTERNAL_RESPONSE", astNode, false, firstArg);
            }
            else {
                const taintId = index_1.taintManager.createTaintSource(responseDef, "PSEUDO_MESSAGE", astNode, true);
                index_1.taintManager.addPseudoTaintReceiver({
                    taintId,
                    astNode,
                    targetDef: responseDef,
                    contextFilename,
                    channel: "runtime.single.response.message",
                    deferredMessage: {
                        callNode,
                        astNode,
                        invoke: (message) => {
                            index_1.interAnalyzer.analyze(callNode, callback, [message], null, astNode);
                        },
                    },
                });
            }
            return index_1.defFactory.createUndefinedDef(callNode);
        }
        return createResponsePromise(callNode, astNode, config.hasExternalChannel, firstArg);
    };
}
// --------------------- chrome.runtime.sendMessage -------------------
index_1.BuiltInSemantics.register("chrome.runtime.sendMessage", createSendMessageHandler({
    apiName: "chrome.runtime.sendMessage",
    parseFirstArg: index_1.literalExtensionId,
    hasExternalChannel: true,
}));
// --------------------- chrome.tabs.sendMessage -------------------
index_1.BuiltInSemantics.register("chrome.tabs.sendMessage", createSendMessageHandler({
    apiName: "chrome.tabs.sendMessage",
    parseFirstArg: index_1.literalOuter,
    hasExternalChannel: false,
}));
// --------------------- chrome.runtime.onMessage.addListener -------------------
index_1.BuiltInSemantics.register("chrome.runtime.onMessage.addListener", (args, callNode, astNode) => {
    var _a;
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const callbackFunc = args[0];
    if (!index_1.Def.isFunctionDef(callbackFunc))
        return;
    const message = index_1.defFactory.createUnknownDef(callNode);
    const sender = index_1.defFactory.createUnknownDef(callNode);
    const sendResponse = index_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.sendResponse");
    sendResponse.semanticExec = index_1.BuiltInSemantics.get("runtime.sendResponse");
    const taintId = index_1.taintManager.createTaintSource(message, "PSEUDO_MESSAGE", astNode, true);
    index_1.taintManager.addPseudoTaintReceiver({
        taintId,
        astNode,
        targetDef: message,
        contextFilename: (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key,
        channel: "runtime.single.sender.message",
        deferredMessage: {
            callNode,
            astNode,
            invoke: (message) => {
                index_1.interAnalyzer.analyze(callNode, callbackFunc, [message, sender, sendResponse], null, astNode);
            },
        },
    });
    return undefined;
});
// --------------------- runtime.port.postMessage -------------------
index_1.BuiltInSemantics.register("runtime.port.postMessage", (args, callNode, astNode, thisDef) => {
    var _a, _b;
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const message = args[0];
    if (!(message === null || message === void 0 ? void 0 : message.isTainted))
        return undefined;
    const contextFile = (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key;
    if (!contextFile)
        return undefined;
    const outer = thisDef === null || thisDef === void 0 ? void 0 : thisDef.__outer;
    if (outer) {
        index_1.taintManager.checkSink(message, "CHROME_RUNTIME_CONNECT_POSTMESSAGE_EXTERNAL", astNode, outer);
    }
    else {
        index_1.taintManager.addPseudoTaintSender({
            taintDef: message,
            astNode,
            contextFilename: (_b = callNode.scopeTree) === null || _b === void 0 ? void 0 : _b.key,
            channel: "runtime.connect.sender.message",
        });
    }
    return undefined;
});
// --------------------- runtime.port.onMessage.addListener -------------------
index_1.BuiltInSemantics.register("runtime.port.onMessage.addListener", (args, callNode, astNode, thisDef) => {
    var _a;
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const callback = args[0];
    const contextFile = (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key;
    if (!index_1.Def.isFunctionDef(callback) || !contextFile)
        return undefined;
    const message = index_1.defFactory.createUnknownDef(callNode);
    const outer = thisDef === null || thisDef === void 0 ? void 0 : thisDef.__outer;
    if (outer) {
        index_1.taintManager.createTaintSource(message, "CHROME_CONNECT_ONMESSAGE_EXTERANL", astNode, false, outer);
    }
    else {
        const taintId = index_1.taintManager.createTaintSource(message, "PSEUDO_MESSAGE", astNode, true);
        index_1.taintManager.addPseudoTaintReceiver({
            taintId,
            astNode,
            targetDef: message,
            contextFilename: contextFile,
            channel: "runtime.connect.sender.message",
            deferredMessage: {
                callNode,
                astNode,
                invoke: (message) => {
                    index_1.interAnalyzer.analyze(callNode, callback, [message], null, astNode);
                },
            },
        });
    }
    return undefined;
});
// --------------------- chrome.runtime.connect -------------------
index_1.BuiltInSemantics.register("chrome.runtime.connect", (args, callNode, _astNode) => {
    // chrome.runtime.connect(extensionId?: string, connectInfo?: object): Port
    const extensionId = index_1.Def.isLiteralDef(args[0])
        ? (0, index_1.literalExtensionId)(args[0])
        : undefined;
    // do not consider port name
    const port = index_1.defFactory.createObjectDef(callNode);
    port.__outer = extensionId;
    // postMessage semantic
    const postMessage = index_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.port.postMessage");
    postMessage.semanticExec = index_1.BuiltInSemantics.get("runtime.port.postMessage");
    // onMessage  semantic
    const onMessage = index_1.defFactory.createObjectDef(callNode);
    onMessage.__outer = extensionId;
    const addListener = index_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.port.onMessage.addListener");
    addListener.semanticExec = index_1.BuiltInSemantics.get("runtime.port.onMessage.addListener");
    onMessage.setProperty("addListener", addListener);
    port.setProperty("postMessage", postMessage);
    port.setProperty("onMessage", onMessage);
    return port;
});
// --------------------- chrome.runtime.onConnect.addListener -------------------
index_1.BuiltInSemantics.register("chrome.runtime.onConnect.addListener", (args, callNode, astNode) => {
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const callback = args[0];
    if (!index_1.Def.isFunctionDef(callback))
        return undefined;
    // do not consider portName
    const port = index_1.defFactory.createObjectDef(callNode);
    // postMessage semantic
    const postMessage = index_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.port.postMessage");
    postMessage.semanticExec = index_1.BuiltInSemantics.get("runtime.port.postMessage");
    // onMessage.addListener semantic
    const onMessage = index_1.defFactory.createObjectDef(callNode);
    const addListener = index_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.port.onMessage.addListener");
    addListener.semanticExec = index_1.BuiltInSemantics.get("runtime.port.onMessage.addListener");
    onMessage.setProperty("addListener", addListener);
    port.setProperty("postMessage", postMessage);
    port.setProperty("onMessage", onMessage);
    index_1.interAnalyzer.analyze(callNode, callback, [port], null, astNode);
    return undefined;
});
// --------------------- runtime.sendResponse.external -------------------
index_1.BuiltInSemantics.register("runtime.sendResponse.external", (args, _callNode, astNode) => {
    const response = args[0];
    if (!(response === null || response === void 0 ? void 0 : response.isTainted))
        return;
    index_1.taintManager.checkSink(response, "CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE", astNode, "chrome.runtime.onMessageExternal.addListener[sendResponse]");
    return undefined;
});
// --------------------- chrome.runtime.onMessageExternal.addListener -------------------
index_1.BuiltInSemantics.register("chrome.runtime.onMessageExternal.addListener", (args, callNode, astNode) => {
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const callback = args[0];
    if (!index_1.Def.isFunctionDef(callback))
        return undefined;
    const message = index_1.defFactory.createUnknownDef(callNode);
    const sender = index_1.defFactory.createUnknownDef(callNode);
    // sendResponse semantic
    const sendResponse = index_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.sendResponse.external");
    sendResponse.semanticExec = index_1.BuiltInSemantics.get("runtime.sendResponse.external");
    // Pseudo taint source
    index_1.taintManager.createTaintSource(message, "CHROME_ONMESSAGEEXTERNAL_MESSAGE", astNode, false, "chrome.runtime.onMessageExternal.addListener[message]");
    index_1.interAnalyzer.analyze(callNode, callback, [message, sender, sendResponse], null, astNode);
    return undefined;
});
// --------------------- runtime.port.external.postMessage -------------------
index_1.BuiltInSemantics.register("runtime.port.external.postMessage", (args, callNode, astNode, _thisDef) => {
    var _a;
    const message = args[0];
    const contextFile = (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key;
    if (!message || !message.isTainted || !contextFile)
        return undefined;
    index_1.taintManager.checkSink(message, "CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE", astNode, "chrome.runtime.onConnectExternal.addListener[postMessage]");
    return undefined;
});
// --------------------- runtime.port.onMessage.addListener -------------------
index_1.BuiltInSemantics.register("runtime.port.external.onMessage.addListener", (args, callNode, astNode, thisDef) => {
    var _a;
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const callback = args[0];
    const contextFile = (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key;
    if (!index_1.Def.isFunctionDef(callback) || !contextFile)
        return undefined;
    const message = index_1.defFactory.createUnknownDef(callNode);
    index_1.taintManager.createTaintSource(message, "CHROME_ONCONNECTEXTERNAL_ONMESSAGE", astNode, false, "chrome.runtime.onConnectExternal.addListener[onMessage]");
    index_1.interAnalyzer.analyze(callNode, callback, [message], null, astNode);
    return undefined;
});
// --------------------- chrome.runtime.onConnectExternal.addListener -------------------
index_1.BuiltInSemantics.register("chrome.runtime.onConnectExternal.addListener", (args, callNode, astNode) => {
    index_1.interAnalyzer.setCurrentSideEffects(); // side effect
    const callback = args[0];
    if (!index_1.Def.isFunctionDef(callback))
        return;
    // do not consider portName
    const port = index_1.defFactory.createObjectDef(callNode);
    // port.postMessage semantic
    const postMessage = index_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.port.external.postMessage");
    postMessage.semanticExec = index_1.BuiltInSemantics.get("runtime.port.external.postMessage");
    // port.onMessage.addListener semantic
    const onMessage = index_1.defFactory.createObjectDef(callNode);
    const addListener = index_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.port.external.onMessage.addListener");
    addListener.semanticExec = index_1.BuiltInSemantics.get("runtime.port.external.onMessage.addListener");
    onMessage.setProperty("addListener", addListener);
    port.setProperty("postMessage", postMessage);
    port.setProperty("onMessage", onMessage);
    index_1.interAnalyzer.analyze(callNode, callback, [port], null, astNode);
    return undefined;
});
// --------------------- chrome.runtime.sendNativeMessage -------------------
index_1.BuiltInSemantics.register("chrome.runtime.sendNativeMessage", (args, callNode, astNode) => {
    var _a;
    const paramCount = args.length;
    if (paramCount === 0)
        return index_1.defFactory.createUndefinedDef(callNode);
    const lastArgIsFunction = paramCount > 0 && index_1.Def.isFunctionDef(args[paramCount - 1]);
    const contextFilename = (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key;
    if (!contextFilename)
        return index_1.defFactory.createUndefinedDef(callNode);
    let nativeApp;
    let message;
    let callback;
    // chrome.runtime.sendNativeMessage(appName, message, callback?)
    if (lastArgIsFunction) {
        callback = args[paramCount - 1];
        nativeApp = index_1.Def.isLiteralDef(args[0])
            ? (0, index_1.literalOuter)(args[0])
            : "UNKNOWN_APPLICATION";
        message = args[1];
    }
    else {
        nativeApp = index_1.Def.isLiteralDef(args[0])
            ? (0, index_1.literalOuter)(args[0])
            : "UNKNOWN_APPLICATION";
        message = args[1];
    }
    if (!message)
        return index_1.defFactory.createUndefinedDef(callNode);
    // tainted request → native host
    index_1.taintManager.checkSink(message, "CHROME_RUNTIME_SENDNATIVEMESSAGE_EXTERNAL", astNode, nativeApp);
    const responseDef = index_1.defFactory.createUnknownDef(callNode);
    index_1.taintManager.createTaintSource(responseDef, "CHROME_SENDNATIVEMESSAGE_EXTERNAL_RESPONSE", astNode, false, nativeApp);
    // callback style
    if (callback && index_1.Def.isFunctionDef(callback)) {
        index_1.interAnalyzer.analyze(callNode, callback, [responseDef], null, astNode);
        return index_1.defFactory.createUndefinedDef(callNode);
    }
    // Promise style
    const promise = index_1.defFactory.createPromiseDef(callNode, responseDef);
    return promise;
});
// --------------------- runtime.native.port.postMessage -------------------
index_1.BuiltInSemantics.register("runtime.native.port.postMessage", (args, callNode, astNode, thisDef) => {
    var _a;
    index_1.interAnalyzer.setCurrentSideEffects();
    const message = args[0];
    const contextFile = (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key;
    if (!(message === null || message === void 0 ? void 0 : message.isTainted) || !contextFile)
        return undefined;
    const outer = thisDef === null || thisDef === void 0 ? void 0 : thisDef.__outer;
    index_1.taintManager.checkSink(message, "CHROME_RUNTIME_ONCONNECTNATIVE_POSTMESSAGE", astNode, outer);
    return undefined;
});
// --------------------- runtime.native.port.onMessage.addListener -------------------
index_1.BuiltInSemantics.register("runtime.native.port.onMessage.addListener", (args, callNode, astNode, thisDef) => {
    var _a;
    index_1.interAnalyzer.setCurrentSideEffects();
    const callback = args[0];
    const contextFile = (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.key;
    if (!index_1.Def.isFunctionDef(callback) || !contextFile)
        return undefined;
    const message = index_1.defFactory.createUnknownDef(callNode);
    const outer = thisDef === null || thisDef === void 0 ? void 0 : thisDef.__outer;
    index_1.taintManager.createTaintSource(message, "CHROME_CONNECTNATIVE_ONMESSAGE", astNode, false, outer);
    index_1.interAnalyzer.analyze(callNode, callback, [message], null, astNode);
    return undefined;
});
// --------------------- chrome.runtime.connectNative -------------------
index_1.BuiltInSemantics.register("chrome.runtime.connectNative", (args, callNode) => {
    // chrome.runtime.connectNative(applicationName: string): Port
    const appName = index_1.Def.isLiteralDef(args[0]) ? (0, index_1.literalOuter)(args[0]) : undefined;
    const port = index_1.defFactory.createObjectDef(callNode);
    port.__outer = appName;
    // postMessage semantic
    const postMessage = index_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.native.port.postMessage");
    postMessage.semanticExec = index_1.BuiltInSemantics.get("runtime.native.port.postMessage");
    // onMessage semantic
    const onMessage = index_1.defFactory.createObjectDef(callNode);
    onMessage.__outer = appName;
    const addListener = index_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.native.port.onMessage.addListener");
    addListener.semanticExec = index_1.BuiltInSemantics.get("runtime.native.port.onMessage.addListener");
    onMessage.setProperty("addListener", addListener);
    port.setProperty("postMessage", postMessage);
    port.setProperty("onMessage", onMessage);
    return port;
});
// --------------------- chrome.runtime.onConnectNative.addListener -------------------
index_1.BuiltInSemantics.register("chrome.runtime.onConnectNative.addListener", (args, callNode, astNode) => {
    index_1.interAnalyzer.setCurrentSideEffects();
    const callback = args[0];
    if (!index_1.Def.isFunctionDef(callback))
        return undefined;
    const port = index_1.defFactory.createObjectDef(callNode);
    // postMessage
    const postMessage = index_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.native.port.postMessage");
    postMessage.semanticExec = index_1.BuiltInSemantics.get("runtime.native.port.postMessage");
    // onMessage
    const onMessage = index_1.defFactory.createObjectDef(callNode);
    const addListener = index_1.defFactory.createBuiltInFunctionDef(callNode, "runtime.native.port.onMessage.addListener");
    addListener.semanticExec = index_1.BuiltInSemantics.get("runtime.native.port.onMessage.addListener");
    onMessage.setProperty("addListener", addListener);
    port.setProperty("postMessage", postMessage);
    port.setProperty("onMessage", onMessage);
    index_1.interAnalyzer.analyze(callNode, callback, [port], null, astNode);
    return undefined;
});
