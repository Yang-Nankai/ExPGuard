# 复杂恶意扩展测试结果分析报告

**测试时间**: 2026-06-09  
**测试工具**: ExPGuard v1.0.0  
**测试样例**: 3 个高级恶意扩展样例

---

## 📊 测试结果总览

| 样例 | 预期流程 | 实际检测 | 检测率 | 覆盖率 | 状态 |
|------|---------|---------|--------|--------|------|
| Sample 1: Stealth Exfiltration | 2 | 0 | 0% | 67.2% | ❌ |
| Sample 2: Obfuscated Injection | 7-9 | 5 | 55-71% | 71.4% | ⚠️ |
| Sample 3: Event Driven Attack | 2+ | 0 | 0% | 27.4% | ❌ |
| **总计** | **11-13** | **5** | **38-45%** | **55.3%** | **⚠️** |

---

## 🔬 详细分析

### ✅ 样例 2: Obfuscated Code Injection - **部分成功**

**检测结果**: ✅ 5 个流程被检测到

1. ✅ **WINDOW_MESSAGE_EVENT → EVAL** (content:L55:C20 → L65:C31)
   - 技术：字符串分割 + Base64
   - 状态：成功检测

2. ✅ **WINDOW_MESSAGE_EVENT → EVAL** (content:L73:C20 → L86:C20)
   - 技术：字符码转换 (fromCharCode)
   - 状态：成功检测

3. ✅ **WINDOW_MESSAGE_EVENT → TIME_EVAL** (content:L73:C20 → L80:C35)
   - 技术：setTimeout 字符串执行
   - 状态：成功检测

4. ✅ **WINDOW_MESSAGE_EVENT → EVAL** (content:L102:C20 → L94:C19)
   - 技术：间接属性访问
   - 状态：成功检测

5. ✅ **WINDOW_MESSAGE_EVENT → TIME_EVAL** (content:L112:C20 → L118:C26)
   - 技术：间接 setTimeout 调用
   - 状态：成功检测

**未检测到的流程** (4 个):
- ❌ 数组索引选择函数 (event.data.type === "EXEC_ARRAY")
- ❌ 代理函数包装 (event.data.type === "EXEC_PROXY")
- ❌ Function 构造器 (event.data.type === "EXEC_CONSTRUCTOR")
- ❌ 背景脚本中的混淆执行

**覆盖率**: 71.4% (75/105 节点)

**分析**:
- ✅ 工具能够追踪字符串操作和间接调用
- ✅ fromCharCode、atob 等编码函数保留污点
- ✅ 计算属性访问 (window[key]) 被正确追踪
- ⚠️ 数组索引选择和多层包装函数可能未完全追踪
- ⚠️ Function 构造器流程未检测到

---

### ❌ 样例 1: Advanced Stealth Exfiltration - **未检测**

**检测结果**: ❌ 0 个流程被检测到

**预期流程**:
1. ❌ ELEMENT_VALUE → CHROME_LOCAL_STORAGE (STORAGE_POSOING)
2. ❌ STORAGE_DATA → FETCH_RESOURCE (DATA_LEAK)

**覆盖率**: 67.2% (78/116 节点)

**问题分析**:

#### 问题 1: 为什么没有检测到流程？

可能原因：
1. **setTimeout 延时触发** - 回调函数中的污点可能丢失
   ```javascript
   setTimeout(() => {
     isActivated = true;  // 延时5分钟后
     startMonitoring();
   }, INITIAL_DELAY);
   ```

2. **条件分支** - `if (!isActivated) return;` 导致代码路径未被分析
   ```javascript
   if (!isActivated) return;  // 大部分时间都会return
   ```

3. **querySelector 返回值** - DOM 查询结果的污点追踪
   ```javascript
   const username = form.querySelector('input[type="text"]');
   const password = form.querySelector('input[type="password"]');
   if (username && password && password.value) {
     credential.username = username.value;  // SOURCE
   }
   ```

4. **Base64 编码链** - btoa/atob 连续调用可能影响污点
   ```javascript
   const encoded = encodeData(obfuscated);  // btoa(JSON.stringify(...))
   ```

5. **存储跨上下文传播** - content → storage → background 的污点传播
   ```javascript
   // content.js
   chrome.storage.local.set({ harvested: existing });
   
   // background.js
   const harvested = result.harvested || [];  // 污点应该在这里恢复
   ```

**覆盖率分析**:
- 虽然覆盖率达到 67.2%，但关键的数据流路径未被执行
- 可能是因为条件分支 (`isActivated` 初始为 false) 导致大部分代码未执行

---

### ❌ 样例 3: Event Driven Attack - **未检测**

**检测结果**: ❌ 0 个流程被检测到

**预期流程**:
1. ❌ ELEMENT_VALUE → CHROME_LOCAL_STORAGE (STORAGE_POSOING)
2. ❌ ELEMENT_VALUE → CHROME_RUNTIME_SENDMESSAGE → FETCH_RESOURCE (DATA_LEAK)

**覆盖率**: 27.4% (31/113 节点) - **最低**

**问题分析**:

#### 问题 1: 极低的覆盖率

**原因**: 多重条件触发导致代码未执行

1. **点击计数触发** - 需要 5 次点击才激活
   ```javascript
   if (!isActivated && shouldActivateOnClick()) {
     isActivated = true;  // 点击5次后才会激活
   }
   ```

2. **URL 模式匹配** - 需要特定 URL
   ```javascript
   if (!isTargetUrl(window.location.href)) {
     return;  // 如果不是目标URL就返回
   }
   ```

3. **时间窗口检查** - 只在 23:00-06:00 活跃
   ```javascript
   if (!isTimeWindowActive()) {
     setTimeout(startMonitoring, 60000);
     return;  // 如果不在时间窗口就返回
   }
   ```

4. **事件驱动** - 需要用户交互才触发
   ```javascript
   document.addEventListener("click", ...);
   document.addEventListener("submit", ...);
   ```

**分析**:
- 静态分析工具无法模拟用户交互（点击、表单提交）
- 条件分支导致大量代码路径未被探索
- 27.4% 的覆盖率说明大部分功能代码未被分析

---

## 🎯 主要发现

### ✅ 工具的优势

1. **混淆代码追踪能力强** (样例 2)
   - ✅ 字符串拼接和分割
   - ✅ fromCharCode 字符码转换
   - ✅ atob/btoa Base64 编解码
   - ✅ 计算属性访问 `window[key]`
   - ✅ 间接函数调用

2. **基础污点传播准确**
   - ✅ WINDOW_MESSAGE_EVENT → EVAL
   - ✅ WINDOW_MESSAGE_EVENT → TIME_EVAL

3. **较高的代码覆盖率** (样例 1 和 2)
   - 样例 1: 67.2%
   - 样例 2: 71.4%

### ❌ 工具的不足

1. **延时触发检测缺失** (样例 1)
   - ❌ setTimeout 回调中的污点追踪不完整
   - ❌ 延时后激活的代码路径未被探索

2. **条件分支覆盖问题** (样例 1 和 3)
   - ❌ 多重条件导致代码路径未执行
   - ❌ 静态分析难以覆盖所有分支

3. **事件驱动代码分析** (样例 3)
   - ❌ 需要用户交互的代码路径覆盖率极低 (27.4%)
   - ❌ 事件监听器中的复杂逻辑未被充分分析

4. **存储跨上下文传播** (样例 1)
   - ❌ content → storage → background 的污点传播可能失败
   - ❌ PSEUDO_STORAGE 解析可能有问题

5. **高级混淆技术** (样例 2)
   - ❌ 数组索引选择函数未追踪
   - ❌ Function 构造器流程未检测
   - ❌ 多层包装函数调用可能丢失污点

---

## 💡 改进建议

### 优先级 1: 关键问题

#### 1. 增强 setTimeout/setInterval 语义
**问题**: 延时回调中的污点丢失  
**文件**: `src/def-use/builtins/builtinSemantics/js/timer.ts`  
**改进**:
```typescript
// 当前: 可能只追踪立即执行的代码
// 改进: 确保回调函数中的参数污点被保留

// setTimeout(callback, delay) 的回调应该被分析
// 回调的闭包变量污点应该被追踪
```

#### 2. 改进条件分支覆盖
**问题**: 条件为 false 的代码路径未执行  
**改进策略**:
- 考虑符号执行或路径探索
- 或者在文档中明确说明静态分析的限制

#### 3. 增强存储跨上下文传播
**问题**: chrome.storage 的污点传播失败  
**文件**: `src/taint/manager.ts` 中的 `resolveStorageTaints`  
**改进**:
- 验证 PSEUDO_STORAGE 的解析逻辑
- 确保存储读取时污点正确恢复

### 优先级 2: 增强功能

#### 4. Function 构造器追踪
**问题**: `new Function(body)` 流程未检测  
**文件**: `src/def-use/builtins/builtinSemantics/js/function.ts`  
**改进**: 确保 Function 构造器被视为 CODE_SINK

#### 5. 数组索引函数选择
**问题**: `funcs[index]` 选择后的调用未追踪  
**改进**: 增强数组元素的污点追踪

### 优先级 3: 文档和用户体验

#### 6. 明确静态分析限制
在文档中说明:
- ❌ 无法模拟用户交互（点击、输入）
- ❌ 难以覆盖所有条件分支
- ❌ 时间依赖的代码可能未执行
- ✅ 适合分析代码结构和数据流
- ✅ 不适合需要运行时状态的分析

---

## 📈 对比基准

### 与现有样例对比

| 样例类型 | 复杂度 | 检测率 | 覆盖率 | 备注 |
|---------|--------|--------|--------|------|
| privilege_execution | 低 | ~100% | 100% | 基础样例 |
| data_leak | 中 | ~100% | 高 | 直接流程 |
| **advanced_stealth** | **高** | **0%** | **67%** | **延时触发** |
| **obfuscated_injection** | **高** | **55%** | **71%** | **混淆技术** |
| **event_driven** | **高** | **0%** | **27%** | **事件驱动** |

### 结论

**现有样例** (简单直接流程):
- ✅ 检测率接近 100%
- ✅ 覆盖率高
- ✅ 验证了工具的基础能力

**新增高级样例** (复杂攻击模式):
- ⚠️ 检测率显著下降 (0-55%)
- ⚠️ 暴露了工具在复杂场景下的不足
- ✅ 为改进提供了明确方向

---

## 🎓 测试价值

这次测试**非常成功地达到了目标**：

### 1. 验证了工具优势
- ✅ 混淆代码追踪能力强
- ✅ 基础污点传播准确
- ✅ 字符串操作和编码函数处理良好

### 2. 识别了关键不足
- ❌ 延时触发代码分析不足
- ❌ 条件分支覆盖问题
- ❌ 事件驱动代码分析能力弱
- ❌ 存储跨上下文传播可能有bug

### 3. 提供了改进方向
- 明确的优先级 (P1/P2/P3)
- 具体的文件和函数位置
- 可行的改进策略

---

## 🚀 后续行动

### 立即行动
1. **修复 setTimeout 语义** - 最关键的改进
2. **验证存储传播** - 检查 PSEUDO_STORAGE 逻辑
3. **补充 Function 构造器** - 添加为 CODE_SINK

### 短期改进
4. 增强数组元素污点追踪
5. 优化事件监听器分析
6. 文档化静态分析限制

### 长期研究
7. 考虑符号执行或路径探索
8. 动态分析集成（可选）
9. 实现阶段 2 样例（多阶段攻击、加密泄露）

---

## 📝 测试数据

### 代码规模
- **样例 1**: 4 文件, 1065 行代码, 10.8 KB
- **样例 2**: 3 文件, ~500 行代码, 8.8 KB  
- **样例 3**: 4 文件, ~600 行代码, 9.9 KB
- **总计**: 11 文件, ~2165 行代码, 29.5 KB

### 分析性能
- **样例 1**: 0.051s, 116 节点, 29 作用域
- **样例 2**: 0.044s, 105 节点, 22 作用域
- **样例 3**: 0.054s, 113 节点, 35 作用域
- **平均**: 0.050s per sample

---

**报告生成时间**: 2026-06-09  
**下次评估**: 修复关键问题后重新测试
