FROM node:24-slim AS builder

# 配置 pnpm 与 Node 构建环境
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_OPTIONS=--max-old-space-size=2048
ENV TZ=Asia/Shanghai

RUN npm i -g corepack
WORKDIR /app

# 复制整个工作区（.dockerignore 已过滤不必要内容）
COPY . /app

# 安装依赖（启用 pnpm 缓存）
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# 构建（排除 docs 以加速构建）
RUN pnpm run build

# 允许通过参数选择要部署的应用目录，默认部署 Element Plus 应用
ARG APP_PATH=apps/web-ele

# 简单校验构建产物是否存在
RUN test -d "/app/${APP_PATH}/dist" || (echo "Build dist not found at /app/${APP_PATH}/dist" && ls -la "/app/${APP_PATH}" && exit 1)

RUN echo "Builder Success 🎉"

FROM nginx:stable-alpine AS production
ARG APP_PATH=apps/web-ele
# 配置 nginx 及 mjs MIME 类型
RUN echo "types { application/javascript js mjs; }" > /etc/nginx/conf.d/mjs.conf \
    && rm -rf /etc/nginx/conf.d/default.conf

# 复制构建产物到 nginx 站点目录
COPY --from=builder /app/${APP_PATH}/dist /usr/share/nginx/html

# 复制仓库内自带的 nginx 配置，确保监听 8080 与 SPA 路由
COPY --from=builder /app/scripts/deploy/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
