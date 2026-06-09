// obfuscator.js - Obfuscation utility functions

// Reconstruct function name from character codes
export function fromCharCodes(...codes) {
  return String.fromCharCode(...codes);
}

// Split string into chunks
export function splitString(str, ...indices) {
  const parts = [];
  let start = 0;
  for (const idx of indices) {
    parts.push(str.substring(start, idx));
    start = idx;
  }
  parts.push(str.substring(start));
  return parts;
}

// Indirect property access
export function getProperty(obj, ...parts) {
  const key = parts.join('');
  return obj[key];
}

// Array-based function selector
export function selectFunction(funcs, index) {
  return funcs[index];
}

// Base64 decode and concatenate
export function decodeAndConcat(...encoded) {
  return encoded.map(e => atob(e)).join('');
}

// XOR encoding/decoding
export function xorCipher(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}
