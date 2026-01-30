#!/bin/bash

# Auto Deploy Script
# Function: Automatically pull the latest code and build the docker image using apps/web-ele/Dockerfile

# Exit immediately if a command exits with a non-zero status (optional, but we handle errors manually)
# set -e

# Get script directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
# Adjusted Project Root since script is now in scripts/ folder
PROJECT_ROOT="${SCRIPT_DIR}/../"

# Docker configuration
IMAGE_NAME="es-admin-web-ele"
CONTAINER_NAME="es-admin-web-ele"
DOCKERFILE_PATH="apps/web-ele/Dockerfile"
HOST_PORT=8010
CONTAINER_PORT=8080

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARN: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

# Ensure we are in the project root
cd "${PROJECT_ROOT}" || { error "切换到项目根目录失败"; exit 1; }

# 1. Check Docker Environment
log "正在检查 Docker 环境..."
if ! docker info > /dev/null 2>&1; then
    error "Docker 未运行或未安装。请启动 Docker 后重试。"
    exit 1
fi

# 2. Git Operations
log "开始 Git 操作..."

# Check for uncommitted changes
STASH_NEEDED=false
if [[ -n $(git status -s) ]]; then
    warn "检测到本地有未提交的修改。正在暂存以确保更新纯净..."
    git stash save "Auto-deploy stash $(date +'%Y-%m-%d %H:%M:%S')"
    STASH_NEEDED=true
fi

# Get current branch
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)
log "当前分支: ${CURRENT_BRANCH}"

# Fetch remote to check for updates
log "正在检查远程更新..."
git fetch origin "${CURRENT_BRANCH}"

LOCAL_HASH=$(git rev-parse HEAD)
REMOTE_HASH=$(git rev-parse "origin/${CURRENT_BRANCH}")

if [ "$LOCAL_HASH" == "$REMOTE_HASH" ]; then
    log "代码已是最新，无需更新和构建。"
    if [ "$STASH_NEEDED" = true ]; then
        warn "正在恢复暂存的修改..."
        git stash pop
    fi
    exit 0
fi

# Pull latest code
log "发现新版本，正在从远程拉取最新代码..."
if git pull origin "${CURRENT_BRANCH}"; then
    log "代码更新成功。"

    # Check for dependency changes (package.json or pnpm-lock.yaml)
    NEW_HASH=$(git rev-parse HEAD)
    CHANGED_FILES=$(git diff --name-only "${LOCAL_HASH}" "${NEW_HASH}")

    # Log changed files (optional, helpful for debugging)
    # echo "变更的文件列表:"
    # echo "${CHANGED_FILES}"

    if echo "${CHANGED_FILES}" | grep -qE "package.json|pnpm-lock.yaml"; then
        log "检测到依赖配置文件 (package.json 或 pnpm-lock.yaml) 发生变更。"
        log "正在执行 pnpm install..."

        if command -v pnpm &> /dev/null; then
             if pnpm install; then
                log "依赖安装成功。"
             else
                error "依赖安装失败。"
                # We don't exit here to allow docker build to try, or you can exit 1 if strict
                # exit 1
             fi
        else
             warn "未找到 pnpm 命令，无法在本地安装依赖（Docker 构建中通常会自动处理）。"
        fi
    else
        log "依赖配置文件未变更，跳过本地 pnpm install。"
    fi

else
    error "拉取最新代码失败。请检查网络或 Git 配置。"
    if [ "$STASH_NEEDED" = true ]; then
        warn "由于失败，正在恢复暂存的修改..."
        git stash pop
    fi
    exit 1
fi

# 3. Build and Deploy
log "开始构建和部署流程..."

# Check if Dockerfile exists
if [ ! -f "${DOCKERFILE_PATH}" ]; then
    error "未找到 Dockerfile: ${DOCKERFILE_PATH}"
    exit 1
fi

log "正在构建 Docker 镜像 (使用 ${DOCKERFILE_PATH})..."
# Build image from project root
if docker build -f "${DOCKERFILE_PATH}" -t "${IMAGE_NAME}" . ; then
    log "Docker 镜像构建成功。"
else
    error "Docker 镜像构建失败。"
    exit 1
fi

log "正在停止并移除旧容器 (如果存在)..."
docker stop "${CONTAINER_NAME}" >/dev/null 2>&1
docker rm "${CONTAINER_NAME}" >/dev/null 2>&1

log "正在启动新容器..."
# Run new container
if docker run -d -p ${HOST_PORT}:${CONTAINER_PORT} --name "${CONTAINER_NAME}" "${IMAGE_NAME}"; then
    log "部署成功！"
    log "容器名称: ${CONTAINER_NAME}"
    log "访问地址: http://localhost:${HOST_PORT}"
else
    error "启动容器失败。"
    exit 1
fi

# 4. Post-build actions
if [ "$STASH_NEEDED" = true ]; then
    warn "注意：您的本地修改已暂存以允许更新。"
    warn "您可以使用 git stash pop 恢复它们。"
fi

exit 0
