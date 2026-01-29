# 构建优化共识文档

## 1. 核心目标
解决构建过程中 I/O 过高导致系统死机的问题。

## 2. 达成共识的方案
### 2.1 资源限制策略
- **内存限制 (Heap Memory)**: 从 `8GB` (8192MB) 降低至 `4GB` (4096MB)。
  - *理由*: 8GB 堆内存对于单次构建过大，容易耗尽物理内存触发磁盘 Swap，导致 IO 阻塞。4GB 对绝大多数前端构建场景充足。
- **并发限制 (Concurrency)**: 限制 TurboRepo 并发数为 `2` (或根据 CPU 核心数动态调整，保守起见设为 2)。
  - *理由*: 默认全核并发会瞬间拉高 CPU 和内存峰值，导致系统卡顿。

### 2.2 修改范围
1.  `package.json`: 全局构建脚本。
2.  `apps/web-ele/Dockerfile`: 容器化构建配置。

## 3. 验收标准
- 构建过程不再导致系统无响应。
- Docker 镜像能成功构建。

---

# 系统设计与任务拆分

## 1. 修改点设计

### 1.1 package.json
```json
// Before
"build": "cross-env NODE_OPTIONS=--max-old-space-size=8192 turbo build"

// After
"build": "cross-env NODE_OPTIONS=--max-old-space-size=4096 turbo build --concurrency=2"
```

### 1.2 apps/web-ele/Dockerfile
```dockerfile
# Before
ENV NODE_OPTIONS=--max-old-space-size=8192

# After
ENV NODE_OPTIONS=--max-old-space-size=4096
```

## 2. 任务列表
- [ ] 修改 `package.json`
- [ ] 修改 `apps/web-ele/Dockerfile`
- [ ] 验证构建命令
