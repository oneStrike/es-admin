# 1. Base: 基础环境
FROM node:24-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV TZ=Asia/Shanghai
# 启用 corepack 以使用 pnpm
RUN corepack enable

# 2. Pruner: 提取项目子集
FROM base AS pruner
WORKDIR /app
# 安装 turbo 全局包以便运行 prune
RUN npm install -g turbo
COPY . .
# 仅提取 web-ele 及其依赖的必要文件
RUN turbo prune --scope=@vben/web-ele --docker

# 3. Builder: 安装依赖并构建
FROM base AS builder
WORKDIR /app

ENV NODE_OPTIONS=--max-old-space-size=2048

# 优先复制依赖描述文件 (package.json, lockfile)
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/.npmrc ./
# 安装依赖 (利用 Docker 层缓存 + pnpm store 挂载)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# 复制源码
COPY --from=pruner /app/out/full/ .
# 构建应用 (包含依赖)
RUN pnpm run build --filter=@vben/web-ele

# 4. Runner: 生产环境镜像
FROM nginx:stable-alpine AS production

# 配置 nginx 及 mjs MIME 类型
RUN echo "types { application/javascript js mjs; }" > /etc/nginx/conf.d/mjs.conf \
    && rm -rf /etc/nginx/conf.d/default.conf

# 复制自定义 nginx 配置 (从构建上下文直接复制)
COPY scripts/deploy/nginx.conf /etc/nginx/nginx.conf

# 复制构建产物
COPY --from=builder /app/apps/web-ele/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
