# 优化构建流程以降低 I/O 压力

## 1. 项目与需求分析

### 1.1 现状分析
- **项目结构**: 基于 TurboRepo 和 PNPM 的 Monorepo。
- **构建目标**: `apps/web-ele` (基于 Vite + Vue)。
- **当前问题**: 构建过程中 I/O 过高，导致系统死机。
- **关键配置**:
  - `Dockerfile`: 使用 `node:24-slim`，设置了 `max-old-space-size=8192` (8GB)。
  - `COPY . /app`: 复制整个代码库。
  - `package.json`: `build` 脚本也硬编码了 `max-old-space-size=8192`。

### 1.2 问题诊断
导致系统死机和高 I/O 的主要原因可能是：
1.  **内存分配过大 (Critical)**: `max-old-space-size=8192` 允许 Node.js 进程使用高达 8GB 内存。如果物理内存不足（特别是在同时运行其他服务或 IDE 时），操作系统会频繁进行 Swap (虚拟内存交换)，导致磁盘 I/O 飙升和系统无响应。
2.  **并发度不受控**: TurboRepo 默认会尝试最大化并发。
3.  **构建上下文过大**: 虽然 `.dockerignore` 排除了一些文件，但 `COPY . /app` 仍然可能复制不必要的文件。

## 2. 智能决策与优化策略

### 2.1 核心策略：资源限制与流程优化

1.  **降低内存上限**: 将 `max-old-space-size` 降低到合理水平 (如 4GB)，避免触发系统 Swap。
2.  **限制并发**: 在构建命令中限制 TurboRepo 的并发数。
3.  **优化 Docker 构建**:
    - 使用 `turbo prune` (可选，但推荐) 或优化 COPY 顺序。
    - 确保利用好 Docker 层缓存。

### 2.2 待确认问题
- 构建机器的物理内存是多少？
- 是否必须保留 8GB 的堆内存设置？(通常前端构建 4GB 足够，除非项目极其庞大)

## 3. 拟定方案 (待确认)

### 方案 A: 调整资源限制 (推荐，改动小见效快)
1.  修改 `package.json` 中的 `build` 脚本，降低 `max-old-space-size` (例如 4096)。
2.  修改 `Dockerfile` 中的 `NODE_OPTIONS`。
3.  在构建命令中增加 `--concurrency` 限制。

### 方案 B: 深度优化 Docker 构建 (Turbo Prune)
1.  使用 `turbo prune --scope=@vben/web-ele --docker` 提取仅构建所需的子集。
2.  构建更轻量的 Docker 镜像。
3.  *注：这能加快构建速度，但解决“死机”问题的核心还是资源限制。*

## 4. 建议的行动计划

我们将优先执行 **方案 A**，直接解决导致死机的资源瓶颈。

1.  **修改 `package.json`**:
    - 将 `build` 脚本中的 `max-old-space-size=8192` 改为 `4096` (或更低，如 `3072`)。
    - 添加 `--concurrency` 参数。
2.  **修改 `Dockerfile`**:
    - 同步更新 `ENV NODE_OPTIONS`。
    - 考虑分步 COPY 以优化缓存 (可选)。
3.  **验证**:
    - 运行构建观察系统资源占用。

请确认是否同意先从 **降低内存限制** 和 **限制并发** 入手？
