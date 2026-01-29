# Docker 镜像加速配置指南

你遇到的错误 `failed to resolve source metadata for docker.io/library/nginx:stable-alpine: ... i/o timeout` 是由于国内服务器无法直接访问 Docker Hub 导致的。

请根据你的环境选择以下一种方式进行配置。

## 方案一：在 1panel 面板中配置（推荐）

如果你的服务器安装了 1panel，这是最简单的办法。

1.  登录 **1panel 面板**。
2.  点击左侧菜单的 **“容器”**。
3.  点击顶部的 **“配置”** 选项卡。
4.  在 **“镜像加速”** 输入框中，填入可用的镜像源地址。
5.  点击 **“保存”**（系统会自动重启 Docker 服务）。

**推荐的镜像源列表（请按需添加）：**

```
https://docker.m.daocloud.io
https://huecker.io
https://dockerhub.timeweb.cloud
https://noohub.ru
```

_(注意：国内镜像源经常变动，如果上述失效，请搜索最新的可用源)_

## 方案二：手动修改 Docker 配置文件 (Linux)

如果你没有 1panel 或想手动配置：

1.  **编辑配置文件**：

    ```bash
    sudo nano /etc/docker/daemon.json
    ```

    _(如果文件不存在则新建)_

2.  **写入以下内容**：

    ```json
    {
      "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://huecker.io",
        "https://dockerhub.timeweb.cloud",
        "https://noohub.ru"
      ]
    }
    ```

3.  **重载并重启 Docker**：

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl restart docker
    ```

4.  **验证配置**：执行 `docker info`，在输出末尾查看 `Registry Mirrors` 字段是否包含你配置的地址。

## 方案三：针对 Gitea Actions (如果是在 Runner 中报错)

如果这个报错出现在 Gitea Actions 的 Runner 日志中，你需要确保 **运行 Runner 的宿主机** 已经按照上述“方案一”或“方案二”配置了镜像加速。

Runner 通常会直接使用宿主机的 Docker 守护进程，因此宿主机的网络配置会直接影响构建过程。
