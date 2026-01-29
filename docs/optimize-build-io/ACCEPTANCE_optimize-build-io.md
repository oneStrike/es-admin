# 构建优化验收报告

## 1. 修改概览

### 1.1 package.json
- **变更**: `build` 脚本优化
- **内容**:
  ```diff
  - "build": "cross-env NODE_OPTIONS=--max-old-space-size=8192 turbo build",
  + "build": "cross-env NODE_OPTIONS=--max-old-space-size=4096 turbo build --concurrency=2",
  ```
- **目的**: 降低 Node.js 进程内存上限至 4GB，限制并发任务数为 2，防止内存耗尽。

### 1.2 apps/web-ele/Dockerfile
- **变更**: 环境变量调整
- **内容**:
  ```diff
  - ENV NODE_OPTIONS=--max-old-space-size=8192
  + ENV NODE_OPTIONS=--max-old-space-size=4096
  ```
- **目的**: 确保容器内构建也遵循 4GB 内存限制。

## 2. 验证指南

### 2.1 验证步骤
请在终端执行以下命令进行验证（观察系统资源占用情况）：

1.  **本地构建验证**:
    ```bash
    pnpm run build
    ```
    *预期*: 构建过程平稳，系统无卡顿，内存占用峰值降低。

2.  **Docker 构建验证**:
    ```bash
    # 如果有脚本，可以使用脚本，或者直接 docker build
    docker build -t test-build -f apps/web-ele/Dockerfile .
    ```
    *预期*: Docker 构建成功完成，期间未触发系统死机。

## 3. 结果确认
- [x] 代码修改已完成
- [ ] 用户验证通过 (待用户执行)
