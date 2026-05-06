"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAGE_BUILTINS = void 0;
// Global objects
const GLOBAL_OBJECTS = ["globalThis", "window", "global", "self"];
// Language built-ins
const JS_OBJECTS = [
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
const JS_FUNCTIONS = [
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
const LIBRARY_NAMES = [
    "JQuery",
    "$",
    "lodash",
    "_",
    "axios",
    "CryptoJS",
    "base64",
];
// Extension objects
const EXTENSION_OBJECTS = ["chrome"];
exports.PAGE_BUILTINS = [
    ...GLOBAL_OBJECTS,
    ...JS_OBJECTS,
    ...JS_FUNCTIONS,
    ...EXTENSION_OBJECTS,
    ...LIBRARY_NAMES
];
