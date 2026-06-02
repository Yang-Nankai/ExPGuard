// Global objects
const GLOBAL_OBJECTS: string[] = ["globalThis", "window", "global", "self"];

// Language built-ins
const JS_OBJECTS: string[] = [
  "Object",
  "Array",
  "Function",
  "Map",
  "URL",
  "String",
  "Promise",
  "Set",
  "JSON",
  "Blob",
  "FormData",
  "TextEncoder",
  "Uint8Array",
  "XMLHttpRequest",
  "WebSocket",
  "localStorage",
  "sessionStorage",
  "document",
  "navigator",
  "location",
  "screen",
  "crypto",
  "URLSearchParams",
];

const JS_FUNCTIONS: string[] = [
  "fetch",
  "decodeURI",
  "encodeURI",
  "decodeURIComponent",
  "encodeURIComponent",
  "eval",
  "setTimeout",
  "setInterval",
  "atob",
  "btoa",
  "postMessage",
  "addEventListener",
  // Scalar casts — wired up with taint-preserving semantics in
  // builtinSemantics/browser/api.ts. Must be listed here so they are bound
  // as page-scope locals; otherwise the analyzer falls back to UnknownDef
  // and silently loses taint through `parseInt(taintedString)`.
  "parseInt",
  "parseFloat",
  "isNaN",
  "isFinite",
];

const LIBRARY_NAMES: string[] = [
  "JQuery",
  "$",
  "lodash",
  "_",
  "axios",
  "CryptoJS",
  "base64",
  // Front-end frameworks. Modeled in builtinSemantics/library/{react,vue,angular}.ts.
  // Listed here so calls like `React.createElement(...)` / `new Vue({...})` /
  // `$sce.trustAsHtml(...)` in *user* code bind to the modeled builtin instead
  // of falling back to UnknownDef and dropping taint.
  "React",
  "ReactDOM",
  "Vue",
  "$sce",
];

// Extension objects
const EXTENSION_OBJECTS: string[] = ["chrome"];

export const PAGE_BUILTINS: string[] = [
  ...GLOBAL_OBJECTS,
  ...JS_OBJECTS,
  ...JS_FUNCTIONS,
  ...EXTENSION_OBJECTS,
  ...LIBRARY_NAMES
];
