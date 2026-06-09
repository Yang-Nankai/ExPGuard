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
