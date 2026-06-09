# 复杂恶意扩展测试样例设计方案

## 📋 背景与目标

当前 ExPGuard 已有 7 个基础测试样例，覆盖了基本的安全漏洞类型。为了验证和改进工具对真实恶意扩展的检测能力，需要设计一套更加复杂、隐蔽的测试样例，模拟真实攻击场景。

## 🎯 设计目标

1. **覆盖真实攻击技术**：延时触发、事件触发、代码混淆、多阶段攻击
2. **测试检测盲区**：识别工具当前无法检测的攻击模式
3. **验证污点追踪能力**：复杂的数据流传播路径
4. **评估绕过技术**：混淆、编码、间接调用等规避手段

## 📊 现有样例分析

| 样例 | 复杂度 | 主要特征 | 限制 |
|------|--------|----------|------|
| privilege_execution | 中 | 直接消息传递、存储轮询 | 无延时、无混淆 |
| code_injection | 低 | 直接 setTimeout(string) | 单一路径 |
| data_leak | 中 | Cookie/History 泄露 | 直接 fetch |
| storage_poisoning | 中 | 自定义事件、存储中转 | 无加密 |
| request_forgery | 中 | 外部消息、多种网络 API | 有消毒器但简单 |
| dom_xss | 低 | 4 种 DOM XSS | 无编码 |
| multi_channel | 高 | Port 通信、跨帧 | 无延时触发 |

**发现的不足**：
- ✗ 无延时触发（setTimeout/setInterval 作为触发器而非注入点）
- ✗ 无复杂混淆（Base64、字符串拼接、间接引用）
- ✗ 无多阶段攻击（先窃取配置，再执行攻击）
- ✗ 无加密通信（加密后的数据泄露）
- ✗ 无条件触发（特定 URL、时间、用户行为）
- ✗ 无反检测技术（检测调试器、随机延时）

## 🎨 新增测试样例设计

### 样例 1: `advanced_stealth_exfiltration/` - 隐蔽数据窃取

**攻击场景**：类似真实的密码窃取扩展，使用多种规避技术

**技术特征**：
1. **延时触发**：注入后等待 5 分钟才开始窃取
2. **条件触发**：只在特定域名（银行网站）触发
3. **分段传输**：数据分多次小批量发送，避免流量异常
4. **Base64 编码**：窃取前编码，规避简单的关键词检测
5. **动态域名**：从加密的配置中解密目标服务器地址

**文件结构**：
```
advanced_stealth_exfiltration/
├── manifest.json          # permissions: cookies, tabs, storage
├── background.js          # 主控逻辑，延时调度
├── content.js            # 表单监听，条件触发
├── config.js             # 混淆的配置（Base64 编码的服务器地址）
└── utils.js              # 编码/解码工具
```

**预期检测流程**：
```
SOURCE: ELEMENT_VALUE (password input)
  ↓ [延时 5min]
  ↓ [Base64 编码]
  ↓ [存储到 chrome.storage.local]
  ↓ [分批读取]
  ↓ [解密服务器地址]
  ↓ [延时发送]
SINK: FETCH_RESOURCE
```

**检测挑战**：
- 延时器（setTimeout）是否被追踪？
- Base64 编码是否导致污点丢失？
- 条件分支是否影响覆盖率？
- 动态字符串拼接是否被追踪？

---

### 样例 2: `obfuscated_code_injection/` - 混淆代码注入

**攻击场景**：使用多种混淆技术的代码注入攻击

**技术特征**：
1. **字符串分割**：`eval(atob("..." + "..." + "..."))`
2. **间接调用**：`window["e"+"val"](...)`
3. **数组索引**：`const funcs = [eval, Function]; funcs[0](...)`
4. **字符码转换**：`String.fromCharCode(101,118,97,108)` → "eval"
5. **代理函数**：`function exec(c) { return eval(c); }; exec(userInput)`

**文件结构**：
```
obfuscated_code_injection/
├── manifest.json
├── content.js            # 多种混淆注入
├── background.js         # 间接调用链
└── obfuscator.js         # 混淆工具函数
```

**预期检测流程**：
```
SOURCE: WINDOW_MESSAGE_EVENT
  ↓ [atob 解码]
  ↓ [字符串拼接: a + b + c]
  ↓ [间接引用: window["eval"]]
  ↓ [代理函数调用]
SINK: EVAL (通过间接路径)
```

**检测挑战**：
- 字符串拼接是否保留污点？
- 间接属性访问（computed property）是否追踪？
- atob/btoa 是否作为消毒器？
- 多层函数调用是否追踪？

---

### 样例 3: `multi_stage_attack/` - 多阶段攻击

**攻击场景**：模拟 APT 式攻击，分阶段窃取和执行

**技术特征**：
1. **阶段 1**：窃取用户 Cookie 和配置
2. **阶段 2**：上传到 C&C 服务器，等待指令
3. **阶段 3**：下载并执行远程代码
4. **持久化**：使用 chrome.alarms 定期检查更新
5. **隐蔽性**：只在非工作时间执行（23:00-06:00）

**文件结构**：
```
multi_stage_attack/
├── manifest.json          # permissions: cookies, alarms, storage
├── background.js          # 主控制器，状态机
├── stage1-collector.js   # 数据收集
├── stage2-commander.js   # C&C 通信
├── stage3-executor.js    # 远程代码执行
└── scheduler.js          # 时间调度
```

**预期检测流程**：
```
Stage 1:
  CHROME_COOKIES_INFO → [存储] → FETCH_RESOURCE

Stage 2:
  FETCH_RESPONSE → [存储] → 解析指令

Stage 3:
  FETCH_RESPONSE → [解码] → EVAL
```

**检测挑战**：
- 跨阶段的污点传播（通过存储）
- chrome.alarms 定时器是否追踪？
- 复杂状态机是否影响分析？
- FETCH_RESPONSE → EVAL 是否检测？

---

### 样例 4: `encrypted_exfiltration/` - 加密数据泄露

**攻击场景**：使用加密来隐藏敏感数据传输

**技术特征**：
1. **AES 加密**：使用 Web Crypto API 加密敏感数据
2. **密钥派生**：从硬编码种子生成加密密钥
3. **隐写术**：将加密数据嵌入正常的分析请求
4. **混合数据**：敏感数据和正常数据混合发送

**文件结构**：
```
encrypted_exfiltration/
├── manifest.json
├── background.js          # 加密和发送
├── content.js            # 数据收集
├── crypto-utils.js       # 加密工具
└── steganography.js      # 数据隐藏
```

**预期检测流程**：
```
SOURCE: CHROME_HISTORY_INFO
  ↓ [AES 加密 - 消毒器？]
  ↓ [嵌入到正常 JSON]
SINK: FETCH_RESOURCE
```

**检测挑战**：
- crypto.subtle.encrypt 是否作为消毒器？
- 加密后的数据是否还保留污点？
- 混合在正常数据中是否影响检测？

---

### 样例 5: `event_driven_attack/` - 事件驱动攻击

**攻击场景**：基于用户行为和浏览器事件的触发式攻击

**技术特征**：
1. **鼠标点击触发**：点击特定元素才执行
2. **URL 变化触发**：导航到特定页面才激活
3. **时间窗口**：只在特定时间段内活跃
4. **点击劫持**：修改链接目标，窃取点击数据
5. **表单劫持**：监听表单提交，拦截敏感数据

**文件结构**：
```
event_driven_attack/
├── manifest.json
├── content.js            # 事件监听器
├── background.js         # 事件协调
├── triggers.js           # 触发条件
└── hijacker.js          # 劫持逻辑
```

**预期检测流程**：
```
Trigger: 用户点击登录按钮
  ↓
SOURCE: ELEMENT_VALUE (username, password)
  ↓ [addEventListener("submit")]
  ↓ [event.preventDefault()]
  ↓ [发送到消息]
SINK: CHROME_RUNTIME_SENDMESSAGE → FETCH_RESOURCE
```

**检测挑战**：
- 事件驱动的控制流是否追踪？
- event.preventDefault 后的流程是否分析？
- 条件触发是否影响覆盖率？

---

### 样例 6: `polymorphic_malware/` - 多态恶意代码

**攻击场景**：代码结构动态变化的恶意扩展

**技术特征**：
1. **代码自修改**：运行时生成新的恶意代码
2. **随机化**：每次执行使用不同的变量名和结构
3. **动态导入**：使用 import() 动态加载模块
4. **VM 上下文**：使用 vm2 或类似技术执行隔离代码
5. **反调试**：检测 DevTools，改变行为

**文件结构**：
```
polymorphic_malware/
├── manifest.json
├── background.js          # 主引擎
├── generator.js          # 代码生成器
├── polymorphic.js        # 多态逻辑
└── anti-debug.js         # 反调试
```

**预期检测流程**：
```
SOURCE: FETCH_RESPONSE (下载代码模板)
  ↓ [运行时生成代码]
  ↓ [变量名随机化]
  ↓ [混淆]
SINK: EVAL (动态生成的代码)
```

**检测挑战**：
- 动态代码生成是否影响静态分析？
- import() 动态导入是否追踪？
- 自修改代码是否可检测？

---

### 样例 7: `timing_attack/` - 时序攻击

**攻击场景**：利用时间差进行侧信道攻击

**技术特征**：
1. **延时测量**：测量 API 响应时间推断信息
2. **竞态条件**：利用异步操作的时序差异
3. **缓存探测**：通过时间差探测缓存状态
4. **定时窃取**：在特定时间点读取敏感信息

**文件结构**：
```
timing_attack/
├── manifest.json
├── background.js
├── timing-utils.js       # 高精度计时
└── side-channel.js      # 侧信道攻击
```

**预期检测流程**：
```
测量 chrome.cookies.getAll() 响应时间
  ↓ [推断 Cookie 数量]
  ↓ [发送时序数据]
SINK: FETCH_RESOURCE
```

**检测挑战**：
- 时间测量本身是否被视为敏感？
- 间接信息泄露是否检测？

---

### 样例 8: `supply_chain_attack/` - 供应链攻击

**攻击场景**：模拟被污染的第三方库

**技术特征**：
1. **恶意依赖**：包含后门的第三方库（如 lodash-evil）
2. **原型污染**：修改 Object.prototype
3. **Polyfill 劫持**：替换标准 API 实现
4. **依赖混淆**：类似但恶意的包名

**文件结构**：
```
supply_chain_attack/
├── manifest.json
├── background.js
├── vendor/
│   ├── lodash-evil.min.js    # 被污染的库
│   └── analytics-fake.js     # 假冒的分析库
└── hijack-prototype.js
```

**预期检测流程**：
```
正常代码调用: _.get(obj, 'path')
  ↓ [lodash 内部被篡改]
  ↓ [窃取 obj 数据]
SINK: FETCH_RESOURCE (在第三方库内)
```

**检测挑战**：
- 第三方库内的恶意代码是否分析？
- 原型污染是否追踪？
- 库文件检测配置是否影响？

---

## 🔬 检测能力评估矩阵

| 攻击技术 | 样例编号 | 当前预期 | 改进方向 |
|----------|----------|----------|----------|
| 延时触发 | 1, 3, 5 | ⚠️ 部分 | 增强 setTimeout/setInterval 追踪 |
| 代码混淆 | 2, 6 | ⚠️ 部分 | 字符串拼接、间接调用追踪 |
| 加密规避 | 4 | ❌ 未知 | 评估加密是否为消毒器 |
| 事件驱动 | 5 | ✅ 应该可以 | 验证事件监听器追踪 |
| 多阶段攻击 | 3 | ⚠️ 部分 | 跨阶段污点传播 |
| 动态代码 | 6 | ❌ 困难 | 静态分析的固有限制 |
| 间接泄露 | 7 | ❌ 未知 | 侧信道检测 |
| 第三方库 | 8 | ✅ 应该可以 | 验证库文件分析策略 |

## 🛠️ 实现计划

### 阶段 1：基础样例实现（优先）
1. **样例 1**: `advanced_stealth_exfiltration/` - 测试延时和编码
2. **样例 2**: `obfuscated_code_injection/` - 测试混淆追踪
3. **样例 5**: `event_driven_attack/` - 测试事件驱动

### 阶段 2：高级样例实现
4. **样例 3**: `multi_stage_attack/` - 测试多阶段
5. **样例 4**: `encrypted_exfiltration/` - 测试加密处理
6. **样例 8**: `supply_chain_attack/` - 测试第三方库

### 阶段 3：研究型样例
7. **样例 6**: `polymorphic_malware/` - 探索动态代码限制
8. **样例 7**: `timing_attack/` - 探索侧信道检测

## 📝 每个样例的交付物

1. **manifest.json** - 完整的扩展清单
2. **源代码文件** - 带详细注释的 JS 文件
3. **README.md** - 攻击场景说明和预期流程
4. **预期结果** - 应检测到的流程列表
5. **测试脚本** - 自动化测试命令

## 🎯 成功标准

### 对于工具的评估
- ✅ **检测成功**：正确识别所有预期的污点流
- ⚠️ **部分检测**：识别部分流程，但有遗漏
- ❌ **检测失败**：未能识别关键攻击路径

### 改进方向
根据测试结果，可能需要改进：
1. **污点传播语义**：补充缺失的 API 语义
2. **控制流分析**：增强异步、事件驱动的追踪
3. **字符串操作**：改进字符串拼接、编码的污点保留
4. **第三方库**：优化库文件的分析策略
5. **消毒器策略**：评估加密等操作是否应为消毒器

## 📊 预期输出报告

对每个样例生成：
```json
{
  "sample": "advanced_stealth_exfiltration",
  "complexity": "high",
  "techniques": ["delay", "base64", "conditional"],
  "expectedFlows": 5,
  "detectedFlows": 3,
  "missedFlows": [
    {
      "reason": "setTimeout callback not traced",
      "source": "ELEMENT_VALUE",
      "sink": "FETCH_RESOURCE"
    }
  ],
  "falsePositives": 0,
  "coverage": 0.85,
  "recommendations": [
    "Enhance setTimeout/setInterval tracking",
    "Improve Base64 encoding taint propagation"
  ]
}
```

## 🔄 迭代改进流程

1. **运行测试** → 记录检测结果
2. **分析差距** → 识别未检测的攻击
3. **改进工具** → 增强语义或分析策略
4. **回归测试** → 验证不影响现有检测
5. **文档更新** → 更新 samples_guide.md

---

**问题讨论**：
1. 是否优先实现某些样例？
2. 是否需要调整某些攻击场景？
3. 是否需要添加其他攻击类型（如 WebRTC 泄露、WebAssembly）？
4. 对于动态代码生成，是否接受静态分析的限制？
