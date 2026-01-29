# Docker 构建缓存优化设计文档

## 1. 整体架构
不涉及新的架构组件，仅修改 CI/CD 流程配置。

## 2. 核心修改
### .gitea/workflows/web-ele-docker.yml
在 `docker/build-push-action` 步骤中增加缓存配置。

```yaml
      - name: Build image locally (no push)
        uses: docker/build-push-action@v5
        with:
          context: .
          file: apps/web-ele/Dockerfile
          push: false
          load: true
          tags: ${{ env.IMAGE_NAME }}:latest
          # 新增缓存配置
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

## 3. 数据流向
1. **Pull**: Docker Buildx 从 Actions Cache 服务拉取之前的构建缓存层。
2. **Build**: 构建过程中尝试复用缓存层。
3. **Push**: 构建完成后，将新的缓存层推送到 Actions Cache 服务。

## 4. 异常处理
- 如果 Cache 服务不可用，Buildx 会忽略错误并继续构建（默认行为）。
