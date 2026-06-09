// content.js - Obfuscated code injection patterns
// Frame: CS_1 (matches: <all_urls>)
//
// Flow patterns exercised:
//   1. WINDOW_MESSAGE_EVENT → [obfuscation] → EVAL (CODE_INJECTION)
//   2. WINDOW_MESSAGE_EVENT → [indirect] → TIME_EVAL (CODE_INJECTION)
//   3. WINDOW_MESSAGE_EVENT → [array selector] → NEW_FUNCTION (CODE_INJECTION)
//
// Obfuscation techniques:
//   - String splitting and concatenation
//   - Character code conversion
//   - Indirect property access
//   - Array-based function selection
//   - Base64 encoding chains

import { fromCharCodes, splitString, getProperty, selectFunction, decodeAndConcat } from "./obfuscator.js";

// ─── Technique 1: String Splitting + Base64 ────────────────────────
// SOURCE: WINDOW_MESSAGE_EVENT
// SINK: EVAL (through atob and string concatenation)
window.addEventListener("message", (event) => {
  if (event.data && event.data.type === "EXEC_SPLIT") {
    // Split Base64 encoded code into chunks
    const part1 = "Y29uc29sZS";        // "console"
    const part2 = "5sb2coJ0";        // ".log('O"
    const part3 = "bfuscatedI";       // "bfuscated I"
    const part4 = "nqZWN0aW9uJyk=";    // "njection')"

    const fullEncoded = part1 + part2 + part3 + part4;
    const code = atob(fullEncoded);                             // Decode

    eval(code);                                                 // SINK EVAL
  }
});

// ─── Technique 2: Character Code Conversion ────────────────────────
// SOURCE: WINDOW_MESSAGE_EVENT
// SINK: EVAL (through fromCharCode)
window.addEventListener("message", (event) => {
  if (event.data && event.data.type === "EXEC_CHARCODE") {
    const source = event.data.code;                             // SOURCE

    // Reconstruct "eval" from character codes
    const funcName = fromCharCodes(101, 118, 97, 108);          // "eval"
    const evalFunc = window[funcName];

    evalFunc(source);                                           // SINK EVAL (indirect)
  }
});

// ─── Technique 3: Indirect Property Access ─────────────────────────
// SOURCE: WINDOW_MESSAGE_EVENT
// SINK: EVAL (through computed property)
window.addEventListener("message", (event) => {
  if (event.data && event.data.type === "EXEC_INDIRECT") {
    const payload = event.data.payload;                         // SOURCE

    // Build "eval" through string concatenation
    const e = "e";
    const v = "v";
    const a = "a";
    const l = "l";
    const methodName = e + v + a + l;

    window[methodName](payload);                                // SINK EVAL
  }
});

// ─── Technique 4: Array-Based Function Selection ───────────────────
// SOURCE: WINDOW_MESSAGE_EVENT
// SINK: EVAL/Function (through array indexing)
window.addEventListener("message", (event) => {
  if (event.data && event.data.type === "EXEC_ARRAY") {
    const script = event.data.script;                           // SOURCE

    // Store dangerous functions in array
    const dangerousFuncs = [
      eval,                                                     // index 0
      Function,                                                 // index 1
      (code) => setTimeout(code, 0)                             // index 2
    ];

    const selector = event.data.method || 0;
    const executor = selectFunction(dangerousFuncs, selector);

    executor(script);                                           // SINK (indirect)
  }
});

// ─── Technique 5: Proxy Function ───────────────────────────────────
// SOURCE: WINDOW_MESSAGE_EVENT
// SINK: EVAL (through wrapper function)
function executeCode(code) {
  return eval(code);                                            // SINK EVAL
}

function indirectExecute(payload) {
  return executeCode(payload);
}

window.addEventListener("message", (event) => {
  if (event.data && event.data.type === "EXEC_PROXY") {
    const userCode = event.data.code;                           // SOURCE
    indirectExecute(userCode);
  }
});

// ─── Technique 6: setTimeout with String ───────────────────────────
// SOURCE: WINDOW_MESSAGE_EVENT
// SINK: TIME_EVAL
window.addEventListener("message", (event) => {
  if (event.data && event.data.type === "EXEC_TIMEOUT") {
    const code = event.data.code;                               // SOURCE
    const delay = event.data.delay || 100;

    // Indirect setTimeout call
    const timerFunc = window["set" + "Timeout"];
    timerFunc(code, delay);                                     // SINK TIME_EVAL
  }
});

// ─── Technique 7: new Function Constructor ─────────────────────────
// SOURCE: WINDOW_MESSAGE_EVENT
// SINK: NEW_FUNCTION
window.addEventListener("message", (event) => {
  if (event.data && event.data.type === "EXEC_CONSTRUCTOR") {
    const body = event.data.body;                               // SOURCE

    // Indirect Function constructor
    const FuncConstructor = window["Function"];
    const dynamicFunc = new FuncConstructor("arg", body);       // SINK NEW_FUNCTION

    dynamicFunc(event.data.arg || "default");
  }
});

console.log("[Obfuscated Injection] All listeners registered");
