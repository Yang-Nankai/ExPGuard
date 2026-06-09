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
