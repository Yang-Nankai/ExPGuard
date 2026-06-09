#!/bin/bash
# Script to create obfuscated_code_injection sample

SAMPLE_DIR="samples/obfuscated_code_injection"

echo "Creating obfuscated_code_injection sample files..."

# Create manifest.json
cat > "$SAMPLE_DIR/manifest.json" << 'EOF'
{
  "manifest_version": 3,
  "name": "Advanced Theme Engine",
  "version": "3.0.1",
  "description": "Dynamic theme engine with custom scripting support",
  "permissions": ["storage", "scripting"],
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

# Create obfuscator.js
cat > "$SAMPLE_DIR/obfuscator.js" << 'EOF'
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
EOF

# Create content.js
cat > "$SAMPLE_DIR/content.js" << 'EOF'
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
EOF

# Create background.js
cat > "$SAMPLE_DIR/background.js" << 'EOF'
// background.js - Advanced obfuscation patterns in background
// Frame: BG_1
//
// Flow patterns exercised:
//   1. CHROME_RUNTIME_ONMESSAGE → [obfuscation] → EVAL
//   2. STORAGE_DATA → [decode chain] → NEW_FUNCTION

import { fromCharCodes, decodeAndConcat, xorCipher } from "./obfuscator.js";

// ─── Message-driven Code Execution ─────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  // Technique: XOR decoding + eval
  if (msg.type === "EXEC_XOR") {
    const encrypted = msg.encrypted;                            // SOURCE
    const key = "secret";
    const decrypted = xorCipher(encrypted, key);

    eval(decrypted);                                            // SINK EVAL
    sendResponse({ success: true });
  }

  // Technique: Multi-stage Base64 decode
  if (msg.type === "EXEC_MULTISTAGE") {
    const stage1 = atob(msg.stage1);                           // SOURCE
    const stage2 = atob(stage1);
    const stage3 = atob(stage2);

    const func = new Function(stage3);                         // SINK NEW_FUNCTION
    func();
    sendResponse({ success: true });
  }

  // Technique: Computed member expression
  if (msg.type === "EXEC_COMPUTED") {
    const code = msg.code;                                     // SOURCE
    const execMethod = ["e", "v", "a", "l"].join("");

    globalThis[execMethod](code);                              // SINK EVAL
    sendResponse({ success: true });
  }

  return true;
});

// ─── Storage-driven Execution ──────────────────────────────────────
// Read obfuscated code from storage and execute
async function loadAndExecuteFromStorage() {
  const result = await chrome.storage.local.get(["obfuscatedScript"]);

  if (result.obfuscatedScript) {
    const encoded = result.obfuscatedScript;                   // SOURCE STORAGE_DATA

    // Decode chain: Base64 → XOR → Execute
    const decoded = atob(encoded);
    const decrypted = xorCipher(decoded, "key");

    const executor = new Function(decrypted);                  // SINK NEW_FUNCTION
    executor();
  }
}

// Periodic execution check
setInterval(loadAndExecuteFromStorage, 60000);
EOF

# Create README.md
cat > "$SAMPLE_DIR/README.md" << 'EOF'
# Obfuscated Code Injection Sample

## 攻击场景

使用多种混淆技术的代码注入攻击，测试工具对复杂代码模式的追踪能力。

## 混淆技术

1. **字符串分割** - `atob("..." + "..." + "...")`
2. **字符码转换** - `String.fromCharCode(101,118,97,108)` → "eval"
3. **间接调用** - `window["e"+"val"](...)`
4. **数组索引** - `funcs[0]` 选择 eval
5. **代理函数** - 通过包装函数间接调用
6. **XOR 编码** - 加密后解密执行
7. **多阶段解码** - Base64 套娃解码

## 预期检测流程

### 流程 1-7: WINDOW_MESSAGE_EVENT → EVAL/TIME_EVAL/NEW_FUNCTION
- 各种混淆技术最终都应该追踪到代码执行 sink

### 流程 8: CHROME_RUNTIME_ONMESSAGE → EVAL/NEW_FUNCTION
- 消息驱动的混淆执行

### 流程 9: STORAGE_DATA → NEW_FUNCTION
- 存储中的混淆代码执行

## 运行测试

```bash
npm run build
node dist/main.js analyze --type DIR --input ./samples/obfuscated_code_injection/ --out ./output/obfuscated_code_injection/ --id aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

## 检测挑战

- ✅ 字符串拼接是否保留污点？
- ✅ String.fromCharCode 是否追踪？
- ✅ 计算属性访问 obj[key] 是否追踪？
- ✅ 数组索引选择函数是否追踪？
- ⚠️ 多层包装函数调用是否追踪？
- ⚠️ atob 连续调用是否保留污点？
- ⚠️ XOR 加密/解密是否影响追踪？

## 预期检测结果

应检测到至少 7-9 个代码注入流程
EOF

echo "✅ Sample 2 (obfuscated_code_injection) created successfully!"
echo ""
echo "Files created:"
ls -la "$SAMPLE_DIR"
