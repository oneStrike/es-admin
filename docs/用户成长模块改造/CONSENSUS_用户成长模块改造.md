# CONSENSUS\_用户成长模块改造

## 明确需求与验收标准

- 需求
  - 修正用户管理模块下重复与不合理的子路由配置
  - 为路由配置所需但缺失的视图文件创建最简占位视图
  - 用户成长相关视图迁移到 `src/views/user-growth/` 并更新路由指向
  - 不改变路由层级结构
  - 先出方案文档，确认后再动代码
- 验收标准
  - 子路由的 name/path 唯一且语义与 `meta.title` 一致
  - 所有 `component` 指向的 `.vue` 文件存在
  - 占位视图统一使用最简结构，便于后续扩展
  - 路由层级保持不变

## 技术实现方案

- 路由修正
  - 在 `routes/modules/user-manager.ts` 中，拆分重复的 `/reports` 子路由为：
    - `members`（会员管理）
    - `check-in`（签到管理）
    - `tasks`（任务管理）
  - 使用相对 path（不以 `/` 开头），确保归属 `/user-manager`
  - component 指向新建视图路径
- 视图补齐
  - 若路由指向视图不存在，则创建 `index.vue` 占位视图
  - 占位视图使用 `Page` 容器 + 语义文案
- 用户成长迁移
  - 路由组件指向 `src/views/user-growth/<模块>/index.vue`
  - 不使用 TS/Vite 路径别名

## 技术约束与集成方案

- 不改变父级路由与层级
- 仅在 `routes/modules` 内调整子路由
- 视图目录命名统一使用小写短横线

## 任务边界

- 本阶段仅输出方案与 6A 文档
- 不实施代码改动

## 参考位置

- 路由模块：[user-manager.ts](file:///d:/code/es/es-admin/apps/web-ele/src/router/routes/modules/user-manager.ts)
- 方案文档：[改造方案.md](file:///d:/code/es/es-admin/docs/用户成长模块改造/改造方案.md)
