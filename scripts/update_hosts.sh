#!/bin/bash

# 检查是否以 root 权限运行
if [ "$EUID" -ne 0 ]; then
  echo "请使用 root 权限运行此脚本 (例如: sudo ./update_hosts.sh)"
  exit 1
fi

# 配置部分
HOSTS_URL="https://gitee.com/if-the-wind/github-hosts/raw/main/hosts"
HOSTS_FILE="/etc/hosts"
START_MARK="# GITHUB HOSTS START"
END_MARK="# GITHUB HOSTS END"
BACKUP_DIR="/tmp/hosts_backup"

# 创建备份目录
mkdir -p "$BACKUP_DIR"

# 1. 下载最新的 hosts 文件
echo "正在下载最新的 hosts 文件..."
NEW_HOSTS_CONTENT=$(curl -s -L "$HOSTS_URL")

if [ -z "$NEW_HOSTS_CONTENT" ]; then
    echo "错误：无法下载 hosts 文件或文件为空。"
    exit 1
fi

# 检查下载内容是否看起来像 hosts 文件 (简单检查)
if ! echo "$NEW_HOSTS_CONTENT" | grep -q "github"; then
    echo "警告：下载的内容似乎不包含 'github' 关键字，可能不是预期的 hosts 文件。"
    # 这里可以选择退出，或者继续但发出警告。为了安全起见，我们继续但记录日志。
fi

# 2. 备份当前的 hosts 文件
BACKUP_FILE="$BACKUP_DIR/hosts_$(date +%Y%m%d_%H%M%S).bak"
cp "$HOSTS_FILE" "$BACKUP_FILE"
echo "已备份当前 hosts 到 $BACKUP_FILE"

# 3. 处理 hosts 文件
# 创建一个临时文件来构建新的 hosts 内容
TEMP_HOSTS=$(mktemp)

# 将原 hosts 文件中除了标记块之外的内容复制到临时文件
if grep -q "$START_MARK" "$HOSTS_FILE"; then
    # 如果存在旧的标记块，则删除它
    sed "/$START_MARK/,/$END_MARK/d" "$HOSTS_FILE" > "$TEMP_HOSTS"
else
    # 如果不存在，直接复制
    cp "$HOSTS_FILE" "$TEMP_HOSTS"
fi

# 确保文件末尾有换行符
if [ -n "$(tail -c 1 "$TEMP_HOSTS")" ]; then
    echo "" >> "$TEMP_HOSTS"
fi

# 追加新的内容块
echo "$START_MARK" >> "$TEMP_HOSTS"
echo "# 更新时间: $(date)" >> "$TEMP_HOSTS"
echo "$NEW_HOSTS_CONTENT" >> "$TEMP_HOSTS"
echo "$END_MARK" >> "$TEMP_HOSTS"

# 4. 应用更改
# 使用 cat 和重定向来覆盖 /etc/hosts，这样可以保留文件权限（通常）
cat "$TEMP_HOSTS" > "$HOSTS_FILE"
rm "$TEMP_HOSTS"

echo "Hosts 文件更新成功！"

# 5. 尝试刷新 DNS 缓存 (可选)
if command -v systemctl &> /dev/null; then
    if systemctl is-active --quiet systemd-resolved; then
        echo "刷新 systemd-resolved DNS 缓存..."
        systemctl restart systemd-resolved
    fi
    if systemctl is-active --quiet nscd; then
        echo "刷新 nscd DNS 缓存..."
        systemctl restart nscd
    fi
fi

# 清理旧的备份（保留最近 7 天的）
find "$BACKUP_DIR" -name "hosts_*.bak" -type f -mtime +7 -delete
