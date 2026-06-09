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
