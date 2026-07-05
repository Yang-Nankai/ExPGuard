# ExPGuard 架构评估与后续工作路线

生成日期：2026-07-05  
分析对象：当前仓库 `D:\Ph0jav7\ExtensionSecurity\ExPGuard`

## 1. 工具定位

ExPGuard 是一个面向 Chrome / Firefox WebExtension 的静态安全分析工具。它不是简单的 API 关键字扫描器，而是通过扩展组件建模、JavaScript AST / CFG / def-use 分析、内置 API 语义建模和污点传播，识别隐私泄露、权限滥用、请求伪造、代码注入、存储污染等 source-to-sink 数据流。

当前实现的主要输入形态：

- `DIR`：未打包扩展目录。
- `CRX`：Chrome 扩展包。
- `WEB`：Chrome Web Store 在线扩展。
- `XPI`：Firefox add-on 包。

主要输出：

- `summary.json`：机器可读的全局流摘要、覆盖率、文件统计、错误状态。
- `report.txt`：人类可读的逐文件污点报告。
- 可选 `report.html`：自包含 HTML 报告。
- `analysis.log`：分析过程日志。

## 2. 当前架构速览

### 2.1 顶层调用链

当前命令入口在 `src/main.ts`，`analyze` 子命令收集输入类型、路径、输出目录、扩展 ID、规则文件和 HTML 报告开关。之后进入 `src/run.ts` 的 `runSingleTask`。

核心流水线如下：

```text
CLI main.ts
  -> runSingleTask()
    -> epgModelBuilder.analyze()
      -> loadExtensionAsync()
        -> CRX / DIR / WEB / XPI loader
      -> ExtensionContext()
        -> 读取 manifest
        -> 收集 JS 文件
        -> ScriptUsageTracker 根据 manifest 和 HTML 组件标记 frame
      -> ExtensionContext.analyzeScriptsInOrder()
        -> ScriptDependencyGraph + topoSort
        -> 每个脚本：parse AST
        -> ScopeTree
        -> CFG
        -> def-use / inter-procedural analysis
        -> builtin semantics
        -> TaintManager 记录 source / propagation / sink
    -> generateGlobalReport()
    -> getGlobalSummary()
    -> 写出 report / summary / html
    -> cleanupArtifacts()
```

### 2.2 关键模块职责

| 层次 | 主要文件 / 目录 | 职责 |
|---|---|---|
| CLI / Runner | `src/main.ts`, `src/run.ts` | 参数解析、日志、规则加载、输出汇总、报告生成、artifact 清理 |
| Extension Loader | `src/extension/extensionLoader.ts`, `src/loader/*` | 解包 CRX / XPI、复制 DIR、下载 WEB、验证 ID |
| Extension Model | `src/extension/*` | manifest、脚本注册表、依赖图、组件发现、frame 标记 |
| AST / CFG | `src/ast/*`, `src/cfg/*`, `src/flownode/*` | JS 解析、容错解析、控制流图、FlowNode 模型 |
| Scope | `src/scope/*` | page/function/block/for/switch/catch/class 等作用域树 |
| Def-Use | `src/def-use/*` | 抽象值 Def、表达式求值、reaching definitions、函数调用分析、import/export |
| Builtin Semantics | `src/def-use/builtins/*` | JS / Browser / Chrome / Firefox alias / third-party library 的语义建模 |
| Taint | `src/taint/*`, `src/constants/taint.ts` | source/sink/sanitizer 分类、污点 DAG、跨上下文桥接、规则匹配、严重性 |
| Reports | `src/taint/report.ts`, `src/taint/htmlReport.ts` | 文本和 HTML 报告 |
| Tests / Samples | `tests/*`, `samples/*` | 单元、集成、样例扩展和回归夹具 |

当前代码规模上，`src` 下约 236 个文件，`tests` 下约 108 个文件，`samples` 下约 44 个文件。测试覆盖的方向较广，说明工具已经进入“可持续演进”的阶段，而不是单一研究原型。

## 3. 检测原理

### 3.1 组件与 frame 建模

`ScriptUsageTracker` 是当前工程中很关键的一层。它根据 manifest 和部分运行时可静态解析 API，把脚本映射到 frame：

- `BG`：background scripts / service worker / background page。
- `CS`：content scripts。
- `EX`：popup / options / side panel / override page / extension page。
- `DT`：devtools page / panel。
- `OF`：offscreen document。
- `UNKNOWN`：未能从 manifest 或引用关系定位的脚本。

组件发现已经覆盖：

- `content_scripts[*].js`
- `background.scripts`
- `background.service_worker`
- `background.page`
- `action.default_popup`
- `browser_action.default_popup`
- `page_action.default_popup`
- `options_page`
- `options_ui.page`
- `side_panel.default_path`
- `devtools_page`
- `chrome_url_overrides`
- `chrome.offscreen.createDocument({ url: "..." })`
- `chrome.devtools.panels.create(..., "panel.html", ...)`
- HTML 中的 external script 和 inline script 物化

frame 的价值不只是标记来源，还会影响过滤策略和严重性。例如 background / offscreen 中的 `window.message` 类 source 被视为不可触发，content script 的 `matches` 和 externally_connectable 配置会影响严重性评级。

### 3.2 控制流与 def-use

每个脚本先构造 `ScopeTree`，再为 page scope 和 function scope 构造 CFG。`reachingDefinitionAnalyzer` 在 CFG 上进行前向 worklist 分析，`generateHandler` 和 `expressionTypeHandler` 负责从 AST 计算新的抽象定义。

核心抽象值是 `Def`：

- `ObjectDef`：对象、数组、消息 payload、DOM element 等。
- `FunctionDef`：用户函数。
- `BuiltInFunctionDef`：内置语义函数。
- `LiteralDef`：字面量。
- `UnknownDef` / `UndefinedDef`。
- `PromiseDef`：Promise 语义。
- `ImplicitDef`：多候选集合，适合处理动态选择和 union 式结果。

函数调用由 `InterProceduralAnalyzer` 分发：

1. `ImplicitDef`：逐个候选分析并合并。
2. `BuiltInFunctionDef`：执行注册的语义 handler。
3. `FunctionDef`：绑定实参到形参，进入 callee scope 继续 reaching-definition 分析。
4. 其他情况：返回 `UnknownDef`，必要时做 fallback taint propagation。

这种设计让工具可以在“静态分析”中尽量模拟实际执行中的数据传递，但仍保留对未知动态行为的保守兜底。

### 3.3 内置语义驱动 source / sink

ExPGuard 的 source / sink 很多不是通过正则扫描出现的，而是在内置语义中创建。例如：

- `chrome.cookies.getAll` 的 callback 参数成为 cookie 信息 source。
- `chrome.runtime.onMessageExternal.addListener` 的 message 参数成为 attacker input source。
- `window.addEventListener("message", cb)` 中的 `event.data` 成为 web attacker input source。
- `document.getElementById` / `querySelector` 返回的 element 属性成为 DOM source。
- `fetch`、XHR、WebSocket、axios、jQuery ajax 参数成为 network sink。
- `eval`、`new Function`、`setTimeout(string)`、WebAssembly、Worker URL、debugger Runtime.evaluate 成为 code execution sink。
- `chrome.bookmarks.create`、`chrome.history.addUrl`、`chrome.tabs.executeScript` 等成为 privileged sink。

Firefox 的 `browser.*` 通过 alias 到同一棵 `chrome.*` Def 树复用语义，这是一个成本很低且有效的跨浏览器策略。

### 3.4 污点传播与跨上下文桥接

`TaintManager` 为每个文件维护一个 `TaintContext`：

- `sources`
- `sinks`
- `sanitizers`
- `defToTaintIds`
- `pathDag`
- `sourceKeyToTaintId`

传播不是简单记录线性路径，而是记录以 taint id 为键的 DAG。这样可以在报告阶段压缩重复路径并支持跨上下文合成。

当前跨上下文主要有两类：

- Message bridge：`runtime.sendMessage` / `runtime.onMessage`、port `connect` / `postMessage` 等通过 pseudo sender / receiver 配对。当 receiver 具备 deferred invoke 时，会在 receiver context 中重新调用 handler，让真实 source 进入接收端分析。
- Storage bridge：`chrome.storage.<area>.set` 和 `get` 先记录 `(area, key)`，报告阶段匹配 set/get，把写入端真实 taint 合成到读取端，并合并 pseudo storage 路径和 downstream sinks。

### 3.5 规则引擎

`src/taint/ruleEngine.ts` 已经把 source/sink 到 FlowType 的映射数据化：

- 默认规则在 `src/taint/rules/default-rules.json`。
- CLI 支持 `--taint-rules <path>` 追加用户规则。
- 支持 JSON 和 JS/TS 导出。
- 采用 all-match 模型，一个 source/sink pair 可以产生多个 FlowType。
- suppress rule 可以屏蔽特定噪声。

这让“策略演进”和“分析引擎演进”解耦，是当前实现中非常重要的工程优点。

## 4. 工程实现优点

### 4.1 分层清晰，可扩展性较好

Loader、Extension Model、Scope / CFG、Def-Use、Builtin Semantics、Taint、Report 基本分层明确。新增 API 覆盖通常有固定路径：

1. 在 `src/taint/types.ts` 增加 source / sink 类型。
2. 在 `src/constants/taint.ts` 归类 capability。
3. 在 `src/def-use/builtins/builtins.ts` 增加 schema。
4. 在 `src/def-use/builtins/builtinSemantics/...` 增加语义。
5. 在默认 rule 或 custom rule 中定义 source/sink 到 FlowType。
6. 添加 sample / fixture / integration test。

这个扩展路径已经被 tests 和文档固化，后续维护成本可控。

### 4.2 组件覆盖面比传统扩展分析更完整

很多扩展分析工具只关注 background 和 content script。当前实现已经覆盖 popup、options、side panel、devtools、offscreen、override page、inline script 等扩展页面。这会显著提升真实扩展中的漏洞发现率，因为大量敏感逻辑会藏在 extension UI 或 offscreen 文档里。

### 4.3 规则数据化降低误报治理成本

默认规则和自定义规则叠加的设计很好。检测策略可以在不改动核心分析代码的情况下调整，比如：

- 添加“cookie -> fetch body = DATA_LEAK”。
- 抑制某个业务场景中已知安全的 source/sink pair。
- 为不同审计目标维护不同 rule set。

### 4.4 跨上下文建模有现实价值

扩展安全问题经常不是单文件问题，而是 content script -> background -> privileged API，或者 popup -> background -> storage/network。当前 message bridge 和 storage bridge 能覆盖这类典型路径，是工具区别于普通 JS taint analyzer 的核心优势。

### 4.5 有回归测试和样例生态

`tests/integration` 已覆盖样例扩展、组件发现、敏感数据外传、新 sink、框架 sink、Firefox namespace、自定义规则、HTML report 等场景。`samples` 和 `tests/fixtures` 也能作为后续能力扩展的落脚点。

### 4.6 报告信息面向审计可用

`summary.json` 包含 flowType、source/sink 类型、文件、frame、frame constraint、message/storage passing、severity、代码片段等。对后续批量分析、排序、去重、人工复核都比较友好。

## 5. 工程实现不足

### 5.1 全局 singleton 状态较多，批量/嵌入式场景风险高

`taintManager`、`scopeController`、`scriptUsageTracker`、`componentRegistry`、`taintRuleEngine`、`interAnalyzer` 等都带有全局状态。测试中经常显式调用 `taintManager.resetAll()` 和 `scopeController.clear()`，但 `runSingleTask` 当前并不会统一 reset 全部分析状态，而是依赖“每个 CLI 进程只跑一次”的假设。

风险：

- 批量分析如果复用同一 Node 进程，可能出现跨扩展污染。
- 自定义规则多次加载可能重复叠加。
- bridge / storage / scope 状态遗漏清理会造成误报或非确定结果。

### 5.2 错误处理偏容错，但可观测性还不够

`ExtensionContext.analyzeScriptsInOrder()` 对单脚本分析异常会记录日志后继续。这适合批量分析，但 summary 对“哪些文件失败、失败在 parse / CFG / def-use / builtin / taint 哪一层”记录不足。实际安全评估中，漏分析文件本身就是重要风险信号。

### 5.3 文档和源码存在编码问题

当前 `docs` 和 `knowledge` 中多份中文或图示内容在 PowerShell 输出中呈现乱码。源码注释中也有部分乱码。这会影响：

- 新贡献者理解成本。
- LLM / 自动化工具读取文档的可靠性。
- 后续生成报告或知识库时的准确性。

### 5.4 运行配置不够环境无关

`config.ts` 中包含固定代理地址、默认 artifact retention 为只保留 `summary.json`、若干配置注释与实际值不一致。这些对本地实验方便，但作为工具化能力会带来部署差异。

### 5.5 报告生成和分析状态耦合较重

storage taint 在 `generateGlobalReport()` / `getGlobalSummary()` 时 resolve，报告阶段会修改 taint contexts。这个做法能延迟合成跨文件流，但也让 report API 不再是纯读操作。多次调用报告接口时，需要非常小心幂等性和重复合成。

### 5.6 性能优化已经开始，但还不系统

当前已有 file timeout、函数调用栈限制、部分缓存、库检测跳过等机制。但还有一些迹象说明性能路径尚未完全稳定：

- 函数调用缓存相关代码有被注释掉的部分。
- `getGlobalSummary` 中仍有 TODO 指出不应在这里打印日志。
- path DAG、def owner index 等已经优化过，但缺少统一 benchmark。

## 6. 检测能力优点

### 6.1 能检测扩展特有的高价值风险

当前 source / sink 类型覆盖了扩展安全中最常见且价值最高的路径：

- 外部消息到特权 API：权限提升。
- Web 页面事件到 storage：存储污染。
- 网络响应到 eval / Function / Worker / WASM：代码注入。
- cookie / history / identity / system info 到消息或网络：隐私泄露。
- attacker input 到 fetch / XHR / WebSocket / axios：请求伪造。
- framework HTML sink：React / Vue / Angular 的 DOM 注入面。

### 6.2 内置语义覆盖 JS / Browser / Chrome / Library 多层

工具不仅建模 `chrome.*`，还建模了 JS 标准对象、DOM、fetch/XHR/WebSocket、storage、crypto、jQuery、axios、lodash、CryptoJS、base64、React、Vue、Angular 等。对真实扩展中常见的封装链和第三方库调用有一定抵抗力。

### 6.3 message / storage 跨文件流是核心竞争力

许多真实漏洞的 source 与 sink 不在同一脚本。当前桥接设计能把 content/popup/options/devtools/offscreen 等组件中的数据传入 background 后继续追踪，这对扩展安全非常关键。

### 6.4 严重性与 manifest 约束结合

仅报告 source-to-sink 还不够。当前 severity 会参考：

- content script `matches`
- `externally_connectable.matches`
- `externally_connectable.ids`
- frame family

这有助于区分“只能由固定页面触发”和“全网可触发”的漏洞。

## 7. 检测原理局限

### 7.1 事件驱动代码覆盖不足

文档和测试夹具已经明确：标准点击、change、submit、keydown 等用户交互事件不会像 `message` 事件一样主动触发 callback 分析。真实扩展中很多逻辑放在 popup click handler、options form submit、content script DOM 事件里，因此会漏报。

这是当前最值得优先改进的检测面。

### 7.2 路径敏感性有限

工具基于 CFG 和 reaching definitions，但不是完整符号执行。条件分支、时间窗口、计数器触发、状态机、多阶段激活等场景容易造成覆盖不足或不可达路径误判。

例如恶意扩展常见模式：

- 延迟一段时间后激活。
- 点击 N 次后启用。
- 只在某些 URL / 时间段 / DOM 条件下执行。
- 先写 storage，后续事件或 alarm 再读取外传。

### 7.3 动态路径和动态组件发现有限

当前 offscreen/devtools panel 的运行时 HTML 发现只支持 literal。`chrome.runtime.getURL("xxx.html")` 指向 HTML 时不会继续解析其 child scripts。`chrome.action.setPopup` / `browserAction.setPopup` 等运行时 UI 入口替换也尚未覆盖。

### 7.4 动态 JS 特性仍有天然难点

以下场景很难通过当前 def-use 体系完全覆盖：

- 高阶函数多层包装。
- 通过数组/对象索引选择函数后调用。
- Proxy / Reflect / getter / setter。
- `with`、动态 prototype 改写。
- 复杂 bundler 运行时 loader。
- eval 后生成的新代码继续执行。

当前已有 `ImplicitDef`、字符串/编码语义和部分 library semantics，但仍需要面向这些动态模式补强。

### 7.5 sanitizer 模型偏粗

当前 hash/sign 类操作会移除 taint。对“安全净化”而言这在某些场景合理，但也可能过度乐观：

- hash(cookie) 外传依然可能是隐私泄露。
- sign(data) 不等于数据不可识别。
- encode/base64 不是 sanitizer，只是转换，这一点当前语义需要持续保证。

建议把 sanitizer 分为“破坏可利用性”和“仍可能泄露信息”两种，避免一刀切清除。

### 7.6 误报治理依赖规则，但缺少上下文判定

规则引擎解决了 source/sink 类型层面的治理，但还没有充分利用：

- URL taint control 的 FULL / PARTIAL。
- network sink 中 URL、body、header 的具体位置。
- permission / host_permissions。
- message sender id / origin 检查。
- storage key 白名单。
- branch guard 中的 sanitizer 或 validator。

这些上下文会直接影响误报率和严重性。

## 8. 未来工作路线

下面的建议按“可实现且能有效提升工具”的标准排序。优先级不是研究新颖性排序，而是工程投入与收益比排序。

### P0：稳定性与可复现实验基线

#### 8.1 增加统一 AnalysisSession，消除跨 run 状态污染

目标：让同一 Node 进程中连续分析多个扩展时结果确定。

建议实现：

- 新增 `AnalysisSession` 或 `resetAnalysisState()`。
- 在 `runSingleTask` 开始处统一 reset：
  - `taintManager.resetAll()`
  - `scopeController.clear()`
  - `scriptUsageTracker.reset()`
  - `componentRegistry.reset()`
  - `interAnalyzer.reset()`
  - `taintRuleEngine.loadDefaults()` 后再加载用户规则
  - ID generators reset
- 增加集成测试：同一进程连续分析 A -> B -> A，断言 A 两次 flows 完全一致，且 B 的 source/sink 不出现在 A 中。

预期收益：

- 支持 batch mode / server mode。
- 降低非确定性误报。
- 后续性能 benchmark 更可信。

#### 8.2 在 summary 中记录 per-file analysis status

目标：把“没发现漏洞”和“文件没分析成功”区分开。

建议实现：

- 在 `ExtensionScript` 或 `ExtensionContext` 中记录：
  - parse status
  - scope status
  - cfg status
  - def-use status
  - error type / message
  - timeout flag
- `summary.json.files[]` 增加这些字段。
- 对失败文件增加 `analysisWarnings`。

预期收益：

- 批量分析结果更可信。
- 人工审计能优先查看漏分析文件。

#### 8.3 修正文档和源码注释编码

目标：恢复中文文档可读性，避免知识资产继续损坏。

建议实现：

- 统一仓库文本文件为 UTF-8。
- 用脚本检测 mojibake 高风险片段。
- 优先修复 `docs/*.md`、`knowledge/*.md`、源码中中文注释。
- 增加 `.editorconfig`，规定 `charset = utf-8`。

预期收益：

- 维护成本显著下降。
- 后续 LLM / 自动文档工具读取更可靠。

### P1：提升真实扩展检出率

#### 8.4 事件 callback 覆盖增强

目标：覆盖 popup/options/content scripts 中常见用户事件触发的数据流。

建议实现：

- 在 `browser/event.ts` 或相邻语义中，把以下事件 callback 纳入“可触发分析”：
  - `click`
  - `change`
  - `submit`
  - `input`
  - `keydown` / `keyup`
  - `DOMContentLoaded`
  - `load`
- 对事件对象建模：
  - `event.target.value`
  - `event.target.textContent`
  - `event.currentTarget`
  - form submit 中的表单字段
- 对不携带 attacker data 的事件，仍执行 callback，但不把 event 本身全量污染。
- 增加 tests：
  - popup click -> runtime.sendMessage -> background privileged sink。
  - options submit -> chrome.storage.sync.set。
  - content change -> fetch body。

预期收益：

- 显著提升 extension UI 和用户交互逻辑检出率。
- 直接解决现有高级样例中 event driven 覆盖低的问题。

#### 8.5 动态 HTML / extension page 发现增强

目标：补上运行时打开扩展页面的入口。

建议实现：

- `chrome.runtime.getURL("page.html")` 返回值如果流入：
  - `chrome.tabs.create({ url })`
  - `chrome.windows.create({ url })`
  - `location.href = ...`
  - `window.open(...)`
  则调用 `registerRuntimeDiscoveredComponent({ type: "extension_page" })`。
- `chrome.action.setPopup({ popup: "x.html" })`、MV2 `browserAction.setPopup` 注册 popup component。
- 对 literal template、简单 const 变量，查询 Def 的 literal value，而不是只看 AST literal。

预期收益：

- 覆盖更多真实 UI 入口。
- 减少 UNKNOWN frame 和未分析 HTML-backed scripts。

#### 8.6 message sender / origin guard 建模

目标：降低外部消息相关误报并提高严重性准确度。

建议实现：

- 在 `onMessageExternal` / `onConnectExternal` handler 内识别常见 guard：
  - `sender.id === "..."`
  - allowlist `includes(sender.id)`
  - `sender.origin` / `sender.url` host 检查
  - early return deny 分支
- 把 guard 结果写入 flow metadata：
  - `messageGuardKind`
  - `allowedIds`
  - `allowedOrigins`
  - `guardConfidence`
- severity 中结合 guard 降级。

预期收益：

- 外部消息漏洞排序更准确。
- 报告更容易人工复核。

#### 8.7 storage key / area 精度提升

目标：降低 storage bridge 的误配与漏配。

建议实现：

- 支持更多 key 形态：
  - array keys：`get(["a", "b"])`
  - object defaults：`get({ a: defaultValue })`
  - null / undefined：全量读取
  - template literal / const string
- 为 `set({ [key]: value })` 做 key value 抽象，未知 key 时标记为 wildcard。
- summary 中明确 `storageKeyConfidence`。

预期收益：

- storage poisoning / storage-mediated exfiltration 更准确。

### P2：增强动态 JS 与现代前端覆盖

#### 8.8 数组/对象索引函数调用增强

目标：覆盖 `handlers[type](payload)`、`funcs[i](x)` 等常见分发器。

建议实现：

- `ObjectDef` / array Def 对 property values 维护更完整的 key -> Def 集合。
- 当 key 是 `ImplicitDef` 或 unknown 时，返回候选函数集合 `ImplicitDef`。
- `InterProceduralAnalyzer` 已支持 `ImplicitDef` callee，可直接复用。
- 增加 tests：
  - object dispatch：`handlers[msg.type](msg.data)`。
  - array dispatch：`funcs[index](tainted)`。
  - mixed safe/unsafe candidates，确认不会丢失 unsafe sink。

预期收益：

- 提升混淆代码、命令分发器、插件式架构中的检出率。

#### 8.9 更细粒度 sanitizer / transformer 模型

目标：避免 hash/sign 过度清污，并区分 encode / validate / sanitize。

建议实现：

- 将 sanitizer 分类为：
  - `ENCODER`：不清污，只记录转换。
  - `VALIDATOR`：在特定 guard 下约束 taint。
  - `IRREVERSIBLE_TRANSFORM`：降低可利用性，但不一定消除隐私泄露。
  - `HTML_SANITIZER`：仅对 DOM/code injection 有效。
- FlowType 匹配时按 sink 类别决定是否 suppress。
- 报告中展示 sanitizer effect，而不是简单 `sanitized: true/false`。

预期收益：

- 降低漏报隐私泄露。
- 更符合安全审计语义。

#### 8.10 框架与 bundler 运行时识别

目标：覆盖真实扩展中被打包后的 React/Vue/Angular 和模块运行时。

建议实现：

- 扩展 `constants/library.ts` 的库识别，区分“vendor 文件可跳过”和“用户文件调用框架 API 要分析”。
- 识别 webpack / rollup / vite runtime 的常见模块注册与导出模式。
- 对 source map 存在的扩展，记录原始文件映射。

预期收益：

- 提升大型真实扩展检出率。
- 报告定位更接近开发者源码。

### P3：规模化分析与产品化

#### 8.11 建立 benchmark corpus 与指标面板

目标：把工具演进从“样例能跑”变成“指标可比较”。

建议实现：

- 建立 corpus：
  - synthetic positive samples
  - synthetic negative samples
  - real-world extensions
  - known CVE / published vulnerable extensions
- 指标：
  - true positive / false positive / false negative
  - per FlowType precision / recall
  - analyzed files ratio
  - timeout ratio
  - avg / p95 analysis time
  - memory peak
- 每次 PR 跑固定子集，定期跑全量。

预期收益：

- 改进不会靠直觉判断。
- 能发现规则变更带来的误报回归。

#### 8.12 批量分析隔离与并发

目标：稳定分析大规模扩展集合。

建议实现：

- 若继续单进程多任务，必须先完成 `AnalysisSession`。
- 更稳妥路线：worker process 隔离，每个扩展一个子进程。
- 标准化 batch 输出：
  - per-extension summary
  - aggregate flow counts
  - failure reason distribution
  - top risky APIs / extensions

预期收益：

- 工具可以用于数据集研究和持续监控。

#### 8.13 报告审计体验改进

目标：提高人工复核效率。

建议实现：

- HTML 报告中加入：
  - flow timeline 分组
  - source/sink 代码上下文展开
  - message/storage hop 高亮
  - severity filter
  - ruleId filter
  - per-file analysis status
- `summary.json` 增加 stable finding id，便于跨版本 diff。

预期收益：

- 更适合真实审计工作流。

## 9. 建议优先实施顺序

短期最建议做这 5 件事：

1. 统一 reset/session 机制，保证批量分析不串状态。
2. summary 增加 per-file 失败/超时状态，避免把漏分析误认为无漏洞。
3. 增强 click/change/submit/input 等事件 callback 分析。
4. 支持 runtime-discovered extension HTML page 和 runtime popup。
5. 增强 storage key 解析和 message sender guard，降低误报。

这 5 项都能在现有架构内实现，不需要推翻当前分析框架，而且会直接提升工具在真实扩展上的有效性。

## 10. 总结

ExPGuard 当前已经具备比较扎实的扩展静态污点分析架构：它有扩展组件建模、CFG / def-use、内置 API 语义、跨上下文 bridge、数据化规则引擎和可消费的 JSON 报告。优势集中在“浏览器扩展特有语义”上，而不是通用 JS 扫描。

主要短板也很清楚：全局状态影响批量稳定性，事件驱动和动态路径覆盖不足，sanitizer / guard / storage key 等上下文精度还有提升空间。未来工作不应优先追求大而全的符号执行，而应先围绕真实扩展中最常见的触发面和跨上下文模式，把现有语义体系补强。这样投入可控，收益也最直接。
