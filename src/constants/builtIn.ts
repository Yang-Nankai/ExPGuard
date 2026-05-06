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
];

const LIBRARY_NAMES: string[] = [
  "JQuery",
  "$",
  "lodash",
  "_",
  "axios",
  "CryptoJS",
  "base64",
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
