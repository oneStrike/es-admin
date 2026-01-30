# Docker 构建缓存优化需求对齐文档

## 1. 项目上下文分析

- **项目结构**: 基于 TurboRepo 的 Monorepo 结构。
- **CI/CD**: 使用 Gitea Actions (`.gitea/workflows/web-ele-docker.yml`)。
- **构建工具**: Docker Buildx (`docker/build-push-action`)。
- **包管理器**: pnpm (根据 Dockerfile 中的 `pnpm install`)。
- **现状**: 目前 Docker 构建过程中，每次都会重新安装依赖，导致构建速度慢且浪费资源。虽然 Dockerfile 中使用了 `RUN --mount=type=cache,id=pnpm,target=/pnpm/store`，但在 CI 环境中（Ephemeral Runner）如果没有配置外部缓存传输，该本地缓存会在构建结束后丢失。

## 2. 需求理解确认

- **目标**: 优化 Docker 构建流程，缓存 `node_modules` (准确说是 pnpm store)，避免每次重新下载。
- **用户痛点**: "没运行一次就安装一次"，即依赖安装步骤未命中缓存。
- **范围**: 仅针对 `.gitea/workflows/web-ele-docker.yml` 工作流及 `apps/web-ele/Dockerfile`。

## 3. 智能决策策略

- **方案选择**:
  - 在 `docker/build-push-action` 中配置 `cache-from` 和 `cache-to`。
  - 使用 GitHub Actions Cache 后端 (`type=gha`)，这是目前在 Actions 环境中最推荐的方式（Gitea Actions 兼容）。
- **技术细节**:
  - `cache-from: type=gha`
  - `cache-to: type=gha,mode=max`
  - 确保 Dockerfile 中的 `--mount=type=cache` 能利用注入的缓存层。

## 4. 关键决策点

- **Gitea 兼容性**: Gitea Actions 的 Runner (`act_runner`) 通常支持 `type=gha` 缓存。如果不支持，可能需要 fallback 到 `type=local` 并配合 `actions/cache` 手动保存文件，但优先尝试 `type=gha`。
- **假设**: 当前 Runner 支持 Actions Cache API。

## 5. 最终共识

- **任务**: 修改 `.gitea/workflows/web-ele-docker.yml`，添加 Docker Buildx 缓存配置。
- **验收标准**: 第二次构建时，Docker Build 步骤应明显变快，且日志显示使用了缓存（或者至少不再重新下载所有包）。
