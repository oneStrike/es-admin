# ALIGNMENT_1panel-hosts-update

## 1. 项目上下文分析

- **目标**: 在 1panel 面板管理的服务器上自动更新 `/etc/hosts`。
- **源地址**: `https://gitee.com/if-the-wind/github-hosts/raw/main/hosts`
- **环境**: Linux 服务器 (1panel 通常运行在 Linux 上)。
- **工具**: Shell 脚本 + 1panel 计划任务。

## 2. 需求理解确认

- **核心需求**: 定时拉取远程 hosts 内容并应用到本地系统，以解决 GitHub 访问慢/无法访问的问题。
- **安全性要求**:
  - 不能覆盖系统原有的重要 hosts 配置（如 localhost）。
  - 需要有备份机制。
  - 需要具备幂等性（多次运行不会导致文件无限增长）。

## 3. 技术方案

- **脚本逻辑**:
  1. 定义起始和结束标记（例如 `# GITHUB HOSTS START`）。
  2. 备份当前 `/etc/hosts`。
  3. 下载远程 hosts 文件。
  4. 使用 `sed` 清理旧的标记块。
  5. 将新内容追加到文件中。
- **1panel 配置**:
  - 在“计划任务”中添加 Shell 脚本任务。
  - 设置执行周期（例如每天凌晨）。

## 4. 最终共识

- 输出一个 `update_hosts.sh` 脚本文件。
- 输出一份 `GUIDE.md` 指导用户如何在 1panel 中配置。
