# ALIGNMENT\_用户成长模块改造

## 项目上下文分析

- 技术栈：Vue 3 + Vite + TypeScript，路由使用 vue-router
- 路由结构：动态路由模块位于 `apps/web-ele/src/router/routes/modules/`
- 用户管理路由：`apps/web-ele/src/router/routes/modules/user-manager.ts`
- 现状问题：路由已重构但业务视图未对齐，存在重复子路由与视图缺失风险
- 业务域边界：用户成长（积分/经验/等级/徽章）已与 forum 分离

## 原始需求

- 按 6A 工作流推进改造
- 先输出方案与文档，确认后再改代码
- 允许修改路由配置，但不允许调整路由层级
- 路由配置存在重复或不合理需调整
- 若路由配置存在但缺少视图组件，需创建对应视图文件
- 占位视图允许最简演示代码，便于后期扩展

## 需求理解

- 路由层级保持不变，仅修正子路由的 name/path/component 与重复配置
- 视图文件与路由一一对应，缺失即补齐占位视图
- 用户成长相关视图迁移至 `src/views/user-growth/`，路由组件指向新位置
- 重复 `/reports` 子路由按 `meta.title` 语义拆分为独立子路由

## 边界确认

- 不修改父级路由结构与层级
- 暂不实施代码改动，仅输出 6A 文档与方案
- 允许后续在确认后进行视图创建与路由修复

## 关键假设

- 路由配置允许调整 name/path/component，但保持父级不变
- 视图占位文件可使用 Page 容器组件进行最简展示
- `meta.title` 作为菜单标题与语义来源，需与路由语义一致

## 相关文件

- 路由模块：[user-manager.ts](file:///d:/code/es/es-admin/apps/web-ele/src/router/routes/modules/user-manager.ts)
- 方案文档：[改造方案.md](file:///d:/code/es/es-admin/docs/用户成长模块改造/改造方案.md)
