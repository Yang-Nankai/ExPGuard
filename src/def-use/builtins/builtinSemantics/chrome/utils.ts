import {
  BuiltInSemantics,
  Def,
  defFactory,
  FlowNode,
  interAnalyzer,
  SinkType,
  SourceType,
  taintManager,
} from "../index";

type ReturnDefFactory = (callNode: FlowNode, astNode: any) => any;

/**
 * Helper: common chrome api builtin semantics handler
 */
export function createChromeBuiltinSemantics({
  apiName,
  callbackIndex,
  sourceType,
  createReturnDef,
  sinkArgs = [],
}: {
  apiName: string;
  callbackIndex?: number;
  sourceType?: SourceType; // optional for action-style
  createReturnDef?: ReturnDefFactory; // optional for action-style
  sinkArgs?: { index: number; sinkType: SinkType, remark?: string }[];
}) {
  BuiltInSemantics.register(apiName, (args, callNode, astNode, _thisDef) => {
    // Always mark side effect
    interAnalyzer.setCurrentSideEffects();

    // ---- handle sinkArgs ----
    for (const { index, sinkType, remark } of sinkArgs) {
      if (args[index]) {
        taintManager.checkSink(args[index], sinkType, astNode, remark);
      }
    }

    // ---------- callback-style ----------
    if (
      callbackIndex !== undefined &&
      args.length > callbackIndex &&
      Def.isFunctionDef(args[callbackIndex])
    ) {
      const callbackFunc = args[callbackIndex];

      // If it's source-style, pass the source def to the callback.
      let callbackArgDef: Def | null = null;
      if (sourceType && createReturnDef) {
        callbackArgDef = createReturnDef(callNode, astNode);
        if (callbackArgDef) {
          taintManager.createTaintSource(callbackArgDef, sourceType, astNode);
        }
      }

      interAnalyzer.analyze(
        callNode,
        callbackFunc,
        callbackArgDef ? [callbackArgDef] : [],
        null,
        astNode,
      );

      return defFactory.createUndefinedDef(callNode);
    }

    // ---------- promise-style ----------
    if (sourceType && createReturnDef) {
      const retPromise = defFactory.createPromiseDef(callNode);
      const retDef = createReturnDef(callNode, astNode);
      taintManager.createTaintSource(retDef, sourceType, astNode);
      retPromise.resolve(retDef);
      return retPromise;
    }

    // action-style: just return promise<void>
    return defFactory.createPromiseDef(callNode);
  });
}


export function createChromeEventListenerSemantics({
  apiName,
  sourceIndexes = [],
  sourceType,
  paramDefs,
}: {
  apiName: string;
  sourceIndexes: number[];
  sourceType: SourceType;
  paramDefs: Array<(callNode: FlowNode) => Def>;
}) {
  const sourceIndexSet = new Set(sourceIndexes);

  BuiltInSemantics.register(apiName, (args, callNode, astNode) => {
    // chrome.xxx.addListener(cb)
    if (args.length === 0 || !Def.isFunctionDef(args[0])) {
      return defFactory.createUndefinedDef(callNode);
    }

    const callbackFunc = args[0];

    const callbackArgs = paramDefs.map((factory, index) => {
      const def = factory(callNode);
      if (sourceIndexSet.has(index)) {
        taintManager.createTaintSource(def, sourceType, astNode);
      }
      return def;
    });

    interAnalyzer.analyze(callNode, callbackFunc, callbackArgs, null, astNode);
    return defFactory.createUndefinedDef(callNode);
  });
}