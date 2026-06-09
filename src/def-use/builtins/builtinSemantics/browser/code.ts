import {
  BuiltInSemantics,
  Def,
  defFactory,
  taintManager,
} from "../index";

// =====================================================================
// Implicit code-execution surfaces beyond eval()/new Function().
// =====================================================================

// --------------------- new Worker(url) -------------------
// new Worker(scriptUrl) bootstraps a new JS execution context from a URL. When
// the URL is attacker-controlled — classically `URL.createObjectURL(blob)` with
// a tainted blob, or a tainted remote URL — this runs adversary code. Treat the
// URL argument as a WORKER_URL (code-execution) sink.
BuiltInSemantics.register(
  "Worker.prototype.constructor",
  (args, callNode, astNode, thisDef) => {
    const newObj = Def.isObjectDef(thisDef)
      ? thisDef
      : defFactory.createObjectDef(callNode);

    const [urlDef] = args;
    if (urlDef) {
      taintManager.checkSink(urlDef, "WORKER_URL", astNode, "worker.url");
    }

    return newObj;
  },
);

// --------------------- WebAssembly.instantiate / compile -------------------
// WebAssembly.instantiate(bufferOrModule, importObject) compiles and runs a wasm
// module. A tainted buffer is arbitrary native-ish code execution. Both
// instantiate() and compile() take the module bytes as arg[0].
function registerWasmCodeSink(effect: string) {
  BuiltInSemantics.register(effect, (args, callNode, astNode) => {
    const [bufferDef] = args;
    if (bufferDef) {
      taintManager.checkSink(bufferDef, "WASM_INSTANTIATE", astNode, effect);
    }
    // instantiate/compile return promises; the resolved module/instance is not
    // a taint source we track further here.
    return defFactory.createPromiseDef(callNode);
  });
}

registerWasmCodeSink("WebAssembly.instantiate");
registerWasmCodeSink("WebAssembly.instantiateStreaming");
registerWasmCodeSink("WebAssembly.compile");
registerWasmCodeSink("WebAssembly.compileStreaming");
