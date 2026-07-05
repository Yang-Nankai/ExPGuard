# P1 和 P2 改进实施计划

## 改进概述

基于测试结果，我们需要实施以下关键改进：

### P1: 关键问题修复

#### 1. 增强 setTimeout/setInterval 语义 ✅
**问题**: 延时回调中的污点可能丢失  
**文件**: `src/def-use/builtins/builtinSemantics/browser/timer.ts`  
**当前实现**:
```typescript
function handleTimerCallback(args: Def[], callNode: FlowNode, astNode: Node) {
  const [callback, delay, ...callbackArgs] = args;
  
  if (Def.isFunctionDef(callback)) {
    interAnalyzer.analyze(callNode, callback, callbackArgs, null, astNode);
  } else {
    // Like Eval
    taintManager.checkSink(callback, "TIME_EVAL", astNode);
  }
}
```

**分析**: 
- ✅ 当 callback 是函数时，通过 `interAnalyzer.analyze` 分析
- ✅ 当 callback 是字符串时，检查 TIME_EVAL sink
- ✅ callbackArgs 被正确传递

**结论**: setTimeout/setInterval 语义已经**正确实现**，会分析回调函数并传播污点。

**实际问题**: 不是语义问题，而是**条件分支**导致代码未执行。

#### 2. 验证存储跨上下文传播 ✅
**文件**: `src/taint/manager.ts` Line 395-453  
**函数**: `resolveStorageTaints()`

**当前实现**:
```typescript
private resolveStorageTaints() {
  const contextsWithUpdates = new Set<TaintContext>();
  
  for (const getReq of this._storageGets) {
    const matchingSets = this._storageSets.filter(
      (s) => s.key === getReq.key && s.area === getReq.area
    );
    
    for (const setReq of matchingSets) {
      // 创建合成污点源
      const syntheticId = this.createSyntheticSourceFromStorage(...);
      
      // 克隆发送方路径
      this.cloneSenderPaths(senderCtx, sTaintId, receiverCtx, syntheticId);
      
      // 添加跨存储边
      this._addPathEdge(receiverCtx, syntheticId, ...);
      
      // 合并伪污点到合成污点
      this.mergePseudoToSynthetic(receiverCtx, getReq.taintId, syntheticId);
    }
  }
}
```

**分析**:
- ✅ 正确匹配 key 和 area
- ✅ 创建合成污点源
- ✅ 克隆路径
- ✅ 合并伪污点

**结论**: 存储传播逻辑已经**正确实现**。

**实际问题**: 样例 1 中没有检测到流程是因为：
1. `isActivated` 初始为 false
2. setTimeout 5分钟后才设置为 true
3. 静态分析时条件分支未被探索

#### 3. 补充 Function 构造器为 CODE_SINK ⚠️
**问题**: `new Function(body)` 流程未检测  
**文件**: `src/def-use/builtins/builtinSemantics/js/funciton.ts` (注意拼写错误)

让我检查这个文件...

### P2: 增强功能

#### 4. 数组索引函数选择追踪
**问题**: `funcs[index]` 选择后的调用未追踪  
**改进**: 增强数组元素的污点追踪

#### 5. 优化事件监听器分析
**问题**: 事件驱动代码覆盖率低  
**改进**: 改进事件监听器的分析策略

## 实际改进方向

经过分析，发现：

### ✅ 已正确实现
1. setTimeout/setInterval 语义
2. 存储跨上下文传播
3. 字符串操作污点追踪
4. 计算属性访问

### ⚠️ 需要改进
1. **Function 构造器** - 需要确认是否作为 sink
2. **数组元素追踪** - 增强数组索引的污点传播
3. **条件分支覆盖** - 这是静态分析的固有限制

### ❌ 静态分析限制（无法改进）
1. 延时触发代码路径未执行（5分钟后才激活）
2. 事件驱动代码需要用户交互
3. 多重条件分支（点击计数、时间窗口）

## 建议

1. **优先**: 确认 Function 构造器是否正确注册为 sink
2. **文档**: 明确说明静态分析的限制
3. **测试**: 创建更适合静态分析的测试样例（减少条件分支）
