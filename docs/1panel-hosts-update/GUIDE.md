# 1panel 自动更新 hosts 指南

本指南将帮助你在 1panel 面板中设置定时任务，自动从 Gitee 拉取最新的 GitHub Hosts 配置，加速国内访问 GitHub。

## 1. 准备脚本

我们已经准备好了一个脚本，脚本内容如下（你可以直接复制）：

```bash
#!/bin/bash

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
cat "$TEMP_HOSTS" > "$HOSTS_FILE"
rm "$TEMP_HOSTS"

echo "Hosts 文件更新成功！"
```

## 2. 在 1panel 中添加计划任务

1. 登录你的 **1panel 面板**。
2. 在左侧菜单栏点击 **“计划任务”**。
3. 点击 **“创建任务”** 按钮。
4. 填写任务信息：
   - **任务类型**: 选择 `Shell 脚本`。
   - **任务名称**: 例如 `自动更新GitHub Hosts`。
   - **执行周期**: 建议选择 `每天`，时间可以设为凌晨，例如 `02:00`。
   - **脚本内容**: 将上面的脚本内容完整复制粘贴到输入框中。
5. 点击 **“确认”** 保存。

## 3. 验证执行

1. 在计划任务列表中，找到刚才创建的任务。
2. 点击右侧的 **“执行”** 按钮进行一次手动测试。
3. 点击 **“日志”** 查看执行结果，如果显示 `Hosts 文件更新成功！` 则说明脚本运行正常。
4. 你也可以在服务器终端查看 `/etc/hosts` 文件，确认末尾是否已添加 GitHub 相关的 IP 映射。

## 4. 注意事项

- **备份**: 脚本会自动将旧的 hosts 文件备份到 `/tmp/hosts_backup` 目录，并保留最近 7 天的备份。如果出现问题，可以从这里恢复。
- **安全性**: 该脚本仅会修改 `# GITHUB HOSTS START` 和 `# GITHUB HOSTS END` 之间的内容，不会影响你原本在 hosts 文件中手动添加的其他记录。
