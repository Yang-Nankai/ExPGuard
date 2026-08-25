import logger from "../../../../utils/logger";
import { scriptUsageTracker } from "../../../../extension/scriptUsageTracker";
import {
  BuiltInSemantics,
  Def,
  defFactory,
  FlowNode,
  interAnalyzer,
  literalExtensionId,
  literalOuter,
  taintManager,
} from "../index";
import {
  getReceiverMessageProtocol,
  getSenderMessageProtocol,
  projectMessageForReceiver,
} from "../../../../taint/messageProtocol";

// --------------------- chrome.runtime.getURL -------------------
BuiltInSemantics.register("chrome.runtime.getURL", (args, callNode, astNode) => {
  const pathArg = args[0];

  if (Def.isLiteralDef(pathArg) && typeof pathArg.value === "string") {
    // A script element appended to the document executes in the tab's MAIN
    // world. Do not inherit the caller's isolated-CS frame for this narrow
    // pattern: doing so would incorrectly grant the injected page script the
    // extension privileges of its loader.
    const fromScriptKey = callNode.scopeTree?.key;
    const canRunAsContentScript = fromScriptKey
      ? scriptUsageTracker
          .getScriptFrameDescriptorsByKey(fromScriptKey)
          .some((frame) => frame.family === "CS")
      : false;
    const mainWorldInjection =
      canRunAsContentScript &&
      scriptUsageTracker.isMainWorldScriptReference(
        callNode,
        astNode,
        fromScriptKey,
      );
    scriptUsageTracker.markReferencedScriptByPathOrUrlByKey(
      callNode.scopeTree?.key,
      pathArg.value,
      true,
      mainWorldInjection ? "MAIN" : undefined,
    );

    // Keep literal path to support downstream file resolution in static model.
    return defFactory.createLiteralDef(callNode, pathArg.value);
  }

  return defFactory.createUnknownDef(callNode);
});

// ======================================================
// Helper: sendMessage taint handling
// ======================================================
function recordSendMessageTaint(
  message: Def | undefined,
  astNode: any,
  callNode: FlowNode,
  outer?: string,
) {
  const contextFile = callNode.scopeTree?.key;

  if (!message || !message.isTainted || !contextFile) return;

  // External extension communication → sink
  if (outer) {
    taintManager.checkSink(
      message,
      "CHROME_RUNTIME_SENDMESSAGE_EXTERNAL",
      astNode,
      outer,
    );
    return;
  } else {
    // Internal communication → pseudo channel
    taintManager.addPseudoTaintSender({
      taintDef: message,
      astNode,
      contextFilename: contextFile,
      channel: "runtime.single.sender.message",
      protocol: getSenderMessageProtocol(message, contextFile),
    });
  }
}

// --------------------- runtime.sendResponse -------------------
function createResponsePromise(
  callNode: FlowNode,
  astNode: any,
  hasExternalChannel?: boolean,
  outer?: string,
) {
  interAnalyzer.setCurrentSideEffects(); // side effect

  const retDef = defFactory.createUnknownDef(callNode);
  const promise = defFactory.createPromiseDef(callNode, retDef);

  if (hasExternalChannel && outer) {
    taintManager.createTaintSource(
      retDef,
      "CHROME_SENDMESSAGE_EXTERNAL_RESPONSE",
      astNode,
      false,
      outer,
    );
  } else {
    const taintId = taintManager.createTaintSource(
      retDef,
      "PSEUDO_MESSAGE",
      astNode,
      true,
    );

    taintManager.addPseudoTaintReceiver({
      taintId,
      astNode,
      contextFilename: callNode.scopeTree?.key!,
      channel: "runtime.single.response.message",
      targetDef: retDef,
    });
  }

  return promise;
}

BuiltInSemantics.register("runtime.sendResponse", (args, callNode, astNode) => {
  const [response] = args;

  if (!response?.isTainted) return;

  taintManager.addPseudoTaintSender({
    taintDef: response,
    astNode,
    contextFilename: callNode.scopeTree?.key!,
    channel: "runtime.single.response.message",
  });

  return undefined;
});

// ======================================================
// SendMessage handler factory
// ======================================================
type SendMessageConfig = {
  apiName: string;
  parseFirstArg: (arg: Def) => any;
  hasExternalChannel?: boolean;
};

function createSendMessageHandler(config: SendMessageConfig) {
  return (args: Def[], callNode: any, astNode: any): Def => {
    const paramCount = args.length;
    if (paramCount === 0) return defFactory.createUndefinedDef(callNode);

    const lastArgIsFunction =
      paramCount > 0 && Def.isFunctionDef(args[paramCount - 1]);
    const contextFilename = callNode.scopeTree?.key;

    if (!contextFilename) {
      logger.warn(`Missing context filename for ${config.apiName}`, callNode);
      return defFactory.createUndefinedDef(callNode);
    }

    const parseArgs = () => {
      let firstArg: any, message: Def | undefined, callback: Def | undefined;
      let hasFirstArg = false;

      if (lastArgIsFunction) {
        callback = args[paramCount - 1];

        switch (paramCount) {
          case 1:
            logger.warn(
              `Invalid ${config.apiName} call: only callback provided`,
            );
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
            firstArg = Def.isLiteralDef(args[0])
              ? config.parseFirstArg(args[0])
              : undefined;
            message = args[1];
            break;
        }
      } else {
        switch (paramCount) {
          case 1:
            message = args[0];
            break;
          case 2:
          case 3:
            hasFirstArg = true;
            firstArg =
              paramCount === 3
                ? Def.isLiteralDef(args[0])
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
      logger.warn(
        `${config.apiName} called without message argument`,
        callNode,
      );
      return defFactory.createUndefinedDef(callNode);
    }

    recordSendMessageTaint(message, astNode, callNode, firstArg);

    if (callback && Def.isFunctionDef(callback)) {
      const responseDef = defFactory.createUnknownDef(callNode);

      if (config.hasExternalChannel && firstArg) {
        taintManager.createTaintSource(
          responseDef,
          "CHROME_SENDMESSAGE_EXTERNAL_RESPONSE",
          astNode,
          false,
          firstArg,
        );
      } else {
        const taintId = taintManager.createTaintSource(
          responseDef,
          "PSEUDO_MESSAGE",
          astNode,
          true,
        );

        taintManager.addPseudoTaintReceiver({
          taintId,
          astNode,
          targetDef: responseDef,
          contextFilename,
          channel: "runtime.single.response.message",
          deferredMessage: {
            callNode,
            astNode,
            invoke: (message: Def) => {
              interAnalyzer.analyze(
                callNode,
                callback,
                [message],
                null,
                astNode,
              );
            },
          },
        });
      }

      return defFactory.createUndefinedDef(callNode);
    }

    return createResponsePromise(
      callNode,
      astNode,
      config.hasExternalChannel,
      firstArg,
    );
  };
}

// --------------------- chrome.runtime.sendMessage -------------------
BuiltInSemantics.register(
  "chrome.runtime.sendMessage",
  createSendMessageHandler({
    apiName: "chrome.runtime.sendMessage",
    parseFirstArg: literalExtensionId,
    hasExternalChannel: true,
  }),
);

// --------------------- chrome.tabs.sendMessage -------------------
BuiltInSemantics.register(
  "chrome.tabs.sendMessage",
  createSendMessageHandler({
    apiName: "chrome.tabs.sendMessage",
    parseFirstArg: literalOuter,
    hasExternalChannel: false,
  }),
);

// --------------------- chrome.runtime.onMessage.addListener -------------------
BuiltInSemantics.register(
  "chrome.runtime.onMessage.addListener",
  (args, callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects(); // side effect

    const callbackFunc = args[0];
    if (!Def.isFunctionDef(callbackFunc)) return;

    const message = defFactory.createUnknownDef(callNode);
    const sender = defFactory.createUnknownDef(callNode);

    const sendResponse = defFactory.createBuiltInFunctionDef(
      callNode,
      "runtime.sendResponse",
    );
    sendResponse.semanticExec = BuiltInSemantics.get("runtime.sendResponse");

    const taintId = taintManager.createTaintSource(
      message,
      "PSEUDO_MESSAGE",
      astNode,
      true,
    );

    taintManager.addPseudoTaintReceiver({
      taintId,
      astNode,
      targetDef: message,
      contextFilename: callNode.scopeTree?.key!,
      channel: "runtime.single.sender.message",
      protocol: getReceiverMessageProtocol(
        callbackFunc,
        callNode.scopeTree?.key!,
      ),
      deferredMessage: {
        callNode,
        astNode,
        invoke: (message: Def) => {
          const deliveredMessage = projectMessageForReceiver(message, callNode);
          interAnalyzer.analyze(
            callNode,
            callbackFunc,
            [deliveredMessage, sender, sendResponse],
            null,
            astNode,
          );
        },
      },
    });

    return undefined;
  },
);

// --------------------- runtime.port.postMessage -------------------
BuiltInSemantics.register(
  "runtime.port.postMessage",
  (args, callNode, astNode, thisDef) => {
    interAnalyzer.setCurrentSideEffects(); // side effect

    const message = args[0];
    if (!message?.isTainted) return undefined;

    const contextFile = callNode.scopeTree?.key;
    if (!contextFile) return undefined;

    const outer = (thisDef as any)?.__outer;

    if (outer) {
      taintManager.checkSink(
        message,
        "CHROME_RUNTIME_CONNECT_POSTMESSAGE_EXTERNAL",
        astNode,
        outer,
      );
    } else {
      taintManager.addPseudoTaintSender({
        taintDef: message,
        astNode,
        contextFilename: callNode.scopeTree?.key!,
        channel: "runtime.connect.sender.message",
      });
    }

    return undefined;
  },
);

// --------------------- runtime.port.onMessage.addListener -------------------
BuiltInSemantics.register(
  "runtime.port.onMessage.addListener",
  (args, callNode, astNode, thisDef) => {
    interAnalyzer.setCurrentSideEffects(); // side effect

    const callback = args[0];
    const contextFile = callNode.scopeTree?.key;
    if (!Def.isFunctionDef(callback) || !contextFile) return undefined;

    const message = defFactory.createUnknownDef(callNode);
    const outer = (thisDef as any)?.__outer;

    if (outer) {
      taintManager.createTaintSource(
        message,
        "CHROME_CONNECT_ONMESSAGE_EXTERANL",
        astNode,
        false,
        outer,
      );
    } else {
      const taintId = taintManager.createTaintSource(
        message,
        "PSEUDO_MESSAGE",
        astNode,
        true,
      );

      taintManager.addPseudoTaintReceiver({
        taintId,
        astNode,
        targetDef: message,
        contextFilename: contextFile,
        channel: "runtime.connect.sender.message",
        deferredMessage: {
          callNode,
          astNode,
          invoke: (message: Def) => {
            interAnalyzer.analyze(callNode, callback, [message], null, astNode);
          },
        },
      });
    }

    return undefined;
  },
);

// --------------------- chrome.runtime.connect -------------------
BuiltInSemantics.register(
  "chrome.runtime.connect",
  (args, callNode, _astNode) => {
    // chrome.runtime.connect(extensionId?: string, connectInfo?: object): Port
    const extensionId = Def.isLiteralDef(args[0])
      ? literalExtensionId(args[0])
      : undefined;

    // do not consider port name
    const port = defFactory.createObjectDef(callNode);

    (port as any).__outer = extensionId;

    // postMessage semantic
    const postMessage = defFactory.createBuiltInFunctionDef(
      callNode,
      "runtime.port.postMessage",
    );
    postMessage.semanticExec = BuiltInSemantics.get("runtime.port.postMessage");

    // onMessage  semantic
    const onMessage = defFactory.createObjectDef(callNode);
    (onMessage as any).__outer = extensionId;
    const addListener = defFactory.createBuiltInFunctionDef(
      callNode,
      "runtime.port.onMessage.addListener",
    );
    addListener.semanticExec = BuiltInSemantics.get(
      "runtime.port.onMessage.addListener",
    );

    onMessage.setProperty("addListener", addListener);

    port.setProperty("postMessage", postMessage);
    port.setProperty("onMessage", onMessage);

    return port;
  },
);

// --------------------- chrome.runtime.onConnect.addListener -------------------
BuiltInSemantics.register(
  "chrome.runtime.onConnect.addListener",
  (args, callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects(); // side effect

    const callback = args[0];
    if (!Def.isFunctionDef(callback)) return undefined;

    // do not consider portName
    const port = defFactory.createObjectDef(callNode);

    // postMessage semantic
    const postMessage = defFactory.createBuiltInFunctionDef(
      callNode,
      "runtime.port.postMessage",
    );
    postMessage.semanticExec = BuiltInSemantics.get("runtime.port.postMessage");

    // onMessage.addListener semantic
    const onMessage = defFactory.createObjectDef(callNode);
    const addListener = defFactory.createBuiltInFunctionDef(
      callNode,
      "runtime.port.onMessage.addListener",
    );
    addListener.semanticExec = BuiltInSemantics.get(
      "runtime.port.onMessage.addListener",
    );

    onMessage.setProperty("addListener", addListener);

    port.setProperty("postMessage", postMessage);
    port.setProperty("onMessage", onMessage);

    interAnalyzer.analyze(callNode, callback, [port], null, astNode);

    return undefined;
  },
);

// --------------------- runtime.sendResponse.external -------------------
BuiltInSemantics.register(
  "runtime.sendResponse.external",
  (args, _callNode, astNode) => {
    const response = args[0];
    if (!response?.isTainted) return;

    taintManager.checkSink(
      response,
      "CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE",
      astNode,
      "chrome.runtime.onMessageExternal.addListener[sendResponse]",
    );

    return undefined;
  },
);

// --------------------- P1 sender-guard helpers -------------------
// Detect patterns like:
//   if (sender.id === "trusted-ext-id") { ... }
//   if (sender.origin !== "https://example.com") return;
//   if (sender.url === "https://example.com/page") { ... }
// Only checks top-level `if`/`switch`/expression statements to avoid
// treating isDevelopment-gated or deeply nested guards as unconditional.

const _SENDER_GUARD_PROPS = new Set(["id", "origin", "url"]);

/** Walk a binary / logical / unary test node and return true iff it contains
 *  a strict equality/inequality check of sender.<id|origin|url> against a
 *  non-empty string literal. Only follows `||` chains, not `&&`, to avoid
 *  treating `isDev && sender.origin === "..."` as an unconditional guard. */
function _isSenderGuardTest(node: any, senderName: string): boolean {
  if (!node || typeof node !== "object") return false;

  if (node.type === "BinaryExpression" &&
      (node.operator === "===" || node.operator === "!==")) {
    for (const [left, right] of [[node.left, node.right], [node.right, node.left]]) {
      if (
        left?.type === "MemberExpression" &&
        left.object?.type === "Identifier" &&
        left.object.name === senderName &&
        left.property?.type === "Identifier" &&
        _SENDER_GUARD_PROPS.has(left.property.name) &&
        right?.type === "Literal" &&
        typeof right.value === "string" &&
        right.value !== ""
      ) {
        return true;
      }
    }
  }

  // sender.id === "a" || sender.id === "b"
  if (node.type === "LogicalExpression" && node.operator === "||") {
    return _isSenderGuardTest(node.left, senderName) ||
           _isSenderGuardTest(node.right, senderName);
  }

  // !(...)
  if (node.type === "UnaryExpression" && node.operator === "!") {
    return _isSenderGuardTest(node.argument, senderName);
  }

  return false;
}

/**
 * Return true when the callback function body contains a top-level sender
 * identity guard on the named parameter.  Scanning only the outermost
 * statement list avoids picking up guards that are themselves conditional
 * (e.g. an isDevelopment gate wrapping a localhost origin check).
 */
function _hasSenderGuard(callbackAst: any, senderName: string): boolean {
  const body = callbackAst?.body;
  if (!Array.isArray(body)) return false;

  for (const stmt of body) {
    if (!stmt) continue;
    if (stmt.type === "IfStatement" && _isSenderGuardTest(stmt.test, senderName)) {
      return true;
    }
    // bare logical short-circuit: sender.id === "x" || return;
    if (stmt.type === "ExpressionStatement" &&
        _isSenderGuardTest(stmt.expression, senderName)) {
      return true;
    }
  }
  return false;
}

// --------------------- chrome.runtime.onMessageExternal.addListener -------------------
BuiltInSemantics.register(
  "chrome.runtime.onMessageExternal.addListener",
  (args, callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects(); // side effect

    const callback = args[0];
    if (!Def.isFunctionDef(callback)) return undefined;

    const message = defFactory.createUnknownDef(callNode);
    const sender = defFactory.createUnknownDef(callNode);

    // sendResponse semantic
    const sendResponse = defFactory.createBuiltInFunctionDef(
      callNode,
      "runtime.sendResponse.external",
    );
    sendResponse.semanticExec = BuiltInSemantics.get(
      "runtime.sendResponse.external",
    );

    // P1: detect sender identity guard in the callback body.
    // The sender parameter is at index 1; extract its name from the raw AST.
    const funcNode = callback.functionNode as any;
    const senderParam = funcNode?.params?.[1];
    const senderName =
      senderParam?.type === "Identifier" ? senderParam.name : null;
    const isGuarded =
      senderName != null &&
      _hasSenderGuard(funcNode?.body, senderName);

    const remarkBase =
      "chrome.runtime.onMessageExternal.addListener[message]";
    const remark = isGuarded ? `${remarkBase}|sender-guarded` : remarkBase;

    // Pseudo taint source
    taintManager.createTaintSource(
      message,
      "CHROME_ONMESSAGEEXTERNAL_MESSAGE",
      astNode,
      false,
      remark,
    );

    interAnalyzer.analyze(
      callNode,
      callback,
      [message, sender, sendResponse],
      null,
      astNode,
    );

    return undefined;
  },
);

// --------------------- runtime.port.external.postMessage -------------------
BuiltInSemantics.register(
  "runtime.port.external.postMessage",
  (args, callNode, astNode, _thisDef) => {
    const message = args[0];
    const contextFile = callNode.scopeTree?.key;
    if (!message || !message.isTainted || !contextFile) return undefined;

    taintManager.checkSink(
      message,
      "CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE",
      astNode,
      "chrome.runtime.onConnectExternal.addListener[postMessage]",
    );

    return undefined;
  },
);

// --------------------- runtime.port.onMessage.addListener -------------------
BuiltInSemantics.register(
  "runtime.port.external.onMessage.addListener",
  (args, callNode, astNode, thisDef) => {
    interAnalyzer.setCurrentSideEffects(); // side effect

    const callback = args[0];
    const contextFile = callNode.scopeTree?.key;
    if (!Def.isFunctionDef(callback) || !contextFile) return undefined;

    const message = defFactory.createUnknownDef(callNode);

    taintManager.createTaintSource(
      message,
      "CHROME_ONCONNECTEXTERNAL_ONMESSAGE",
      astNode,
      false,
      "chrome.runtime.onConnectExternal.addListener[onMessage]",
    );

    interAnalyzer.analyze(callNode, callback, [message], null, astNode);

    return undefined;
  },
);

// --------------------- chrome.runtime.onConnectExternal.addListener -------------------
BuiltInSemantics.register(
  "chrome.runtime.onConnectExternal.addListener",
  (args, callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects(); // side effect

    const callback = args[0];
    if (!Def.isFunctionDef(callback)) return;

    // do not consider portName
    const port = defFactory.createObjectDef(callNode);

    // port.postMessage semantic
    const postMessage = defFactory.createBuiltInFunctionDef(
      callNode,
      "runtime.port.external.postMessage",
    );
    postMessage.semanticExec = BuiltInSemantics.get(
      "runtime.port.external.postMessage",
    );

    // port.onMessage.addListener semantic
    const onMessage = defFactory.createObjectDef(callNode);
    const addListener = defFactory.createBuiltInFunctionDef(
      callNode,
      "runtime.port.external.onMessage.addListener",
    );
    addListener.semanticExec = BuiltInSemantics.get(
      "runtime.port.external.onMessage.addListener",
    );

    onMessage.setProperty("addListener", addListener);

    port.setProperty("postMessage", postMessage);
    port.setProperty("onMessage", onMessage);

    interAnalyzer.analyze(callNode, callback, [port], null, astNode);

    return undefined;
  },
);

// --------------------- chrome.runtime.sendNativeMessage -------------------
BuiltInSemantics.register(
  "chrome.runtime.sendNativeMessage",
  (args, callNode, astNode) => {
    const paramCount = args.length;
    if (paramCount === 0) return defFactory.createUndefinedDef(callNode);

    const lastArgIsFunction =
      paramCount > 0 && Def.isFunctionDef(args[paramCount - 1]);

    const contextFilename = callNode.scopeTree?.key;
    if (!contextFilename) return defFactory.createUndefinedDef(callNode);

    let nativeApp: string | undefined;
    let message: Def | undefined;
    let callback: Def | undefined;

    // chrome.runtime.sendNativeMessage(appName, message, callback?)
    if (lastArgIsFunction) {
      callback = args[paramCount - 1];
      nativeApp = Def.isLiteralDef(args[0])
        ? literalOuter(args[0])
        : "UNKNOWN_APPLICATION";
      message = args[1];
    } else {
      nativeApp = Def.isLiteralDef(args[0])
        ? literalOuter(args[0])
        : "UNKNOWN_APPLICATION";
      message = args[1];
    }

    if (!message) return defFactory.createUndefinedDef(callNode);

    // tainted request → native host
    taintManager.checkSink(
      message,
      "CHROME_RUNTIME_SENDNATIVEMESSAGE_EXTERNAL",
      astNode,
      nativeApp,
    );

    const responseDef = defFactory.createUnknownDef(callNode);

    taintManager.createTaintSource(
      responseDef,
      "CHROME_SENDNATIVEMESSAGE_EXTERNAL_RESPONSE",
      astNode,
      false,
      nativeApp,
    );

    // callback style
    if (callback && Def.isFunctionDef(callback)) {
      interAnalyzer.analyze(callNode, callback, [responseDef], null, astNode);
      return defFactory.createUndefinedDef(callNode);
    }
    // Promise style
    const promise = defFactory.createPromiseDef(callNode, responseDef);

    return promise;
  },
);

// --------------------- runtime.native.port.postMessage -------------------
BuiltInSemantics.register(
  "runtime.native.port.postMessage",
  (args, callNode, astNode, thisDef) => {
    interAnalyzer.setCurrentSideEffects();

    const message = args[0];
    const contextFile = callNode.scopeTree?.key;

    if (!message?.isTainted || !contextFile) return undefined;

    const outer = (thisDef as any)?.__outer;

    taintManager.checkSink(
      message,
      "CHROME_RUNTIME_ONCONNECTNATIVE_POSTMESSAGE",
      astNode,
      outer,
    );

    return undefined;
  },
);

// --------------------- runtime.native.port.onMessage.addListener -------------------
BuiltInSemantics.register(
  "runtime.native.port.onMessage.addListener",
  (args, callNode, astNode, thisDef) => {
    interAnalyzer.setCurrentSideEffects();

    const callback = args[0];
    const contextFile = callNode.scopeTree?.key;
    if (!Def.isFunctionDef(callback) || !contextFile) return undefined;

    const message = defFactory.createUnknownDef(callNode);

    const outer = (thisDef as any)?.__outer;

    taintManager.createTaintSource(
      message,
      "CHROME_CONNECTNATIVE_ONMESSAGE",
      astNode,
      false,
      outer,
    );

    interAnalyzer.analyze(callNode, callback, [message], null, astNode);

    return undefined;
  },
);

// --------------------- chrome.runtime.connectNative -------------------
BuiltInSemantics.register("chrome.runtime.connectNative", (args, callNode) => {
  // chrome.runtime.connectNative(applicationName: string): Port

  const appName = Def.isLiteralDef(args[0]) ? literalOuter(args[0]) : undefined;

  const port = defFactory.createObjectDef(callNode);
  (port as any).__outer = appName;

  // postMessage semantic
  const postMessage = defFactory.createBuiltInFunctionDef(
    callNode,
    "runtime.native.port.postMessage",
  );

  postMessage.semanticExec = BuiltInSemantics.get(
    "runtime.native.port.postMessage",
  );

  // onMessage semantic
  const onMessage = defFactory.createObjectDef(callNode);
  (onMessage as any).__outer = appName;

  const addListener = defFactory.createBuiltInFunctionDef(
    callNode,
    "runtime.native.port.onMessage.addListener",
  );

  addListener.semanticExec = BuiltInSemantics.get(
    "runtime.native.port.onMessage.addListener",
  );

  onMessage.setProperty("addListener", addListener);

  port.setProperty("postMessage", postMessage);
  port.setProperty("onMessage", onMessage);

  return port;
});

// --------------------- chrome.runtime.onConnectNative.addListener -------------------
BuiltInSemantics.register(
  "chrome.runtime.onConnectNative.addListener",
  (args, callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();

    const callback = args[0];
    if (!Def.isFunctionDef(callback)) return undefined;

    const port = defFactory.createObjectDef(callNode);

    // postMessage
    const postMessage = defFactory.createBuiltInFunctionDef(
      callNode,
      "runtime.native.port.postMessage",
    );
    postMessage.semanticExec = BuiltInSemantics.get(
      "runtime.native.port.postMessage",
    );

    // onMessage
    const onMessage = defFactory.createObjectDef(callNode);
    const addListener = defFactory.createBuiltInFunctionDef(
      callNode,
      "runtime.native.port.onMessage.addListener",
    );
    addListener.semanticExec = BuiltInSemantics.get(
      "runtime.native.port.onMessage.addListener",
    );

    onMessage.setProperty("addListener", addListener);

    port.setProperty("postMessage", postMessage);
    port.setProperty("onMessage", onMessage);

    interAnalyzer.analyze(callNode, callback, [port], null, astNode);

    return undefined;
  },
);
