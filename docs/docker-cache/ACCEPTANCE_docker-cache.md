# Docker 构建缓存优化验收文档

## 执行记录

### 1. 修改工作流文件

- [x] 已更新 `.gitea/workflows/web-ele-docker.yml`，添加了 `cache-from: type=gha` 和 `cache-to: type=gha,mode=max`。

## 验证计划

由于 CI 环境由用户管理，请用户按以下步骤验证：

1. 提交更改到仓库。
2. 观察首次构建（Warm-up）：此时会生成缓存，速度可能不会明显提升。
3. 触发第二次构建：此时应命中缓存，构建速度应显著提升，且 Docker 构建日志中应出现 `CACHED` 字样（针对 `RUN --mount=type=cache` 步骤或其他层）。

## 注意事项

- 确保 Gitea Runner 配置了 Cache 服务（通常默认配置即可）。
- 如果使用的是本地 Runner 且重启了宿主机，缓存可能会被清除（取决于 Runner 配置）。
