# ES Admin 协作规范

适用范围：本仓库内的所有人类贡献者与 AI agent。

本文件只保留项目级最小约束、决策顺序与验证基线。具体规范事实源已收敛至 `.trae/rules/PROJECT_RULES.md`。

## 1. 决策顺序

1. 用户或需求方在当前任务中的明确指令。
2. 本文件的项目级最小约束与验证基线。
3. `.trae/rules/PROJECT_RULES.md` 及其索引的专项规范。
4. 仓库现有自动化配置、脚本与同域稳定实现。
5. 根目录 README 与各子目录 README。

若规范与当前可运行代码、生成接口契约、Vben 基座现实或部署约束冲突，以兼容性优先，并在交付说明中记录冲突点与暂行决策。

## 2. 项目级最小约束

- 当前仓库是基于 `pnpm` 的 monorepo；默认业务开发入口是 `apps/web-ele`。
- 默认只修改当前任务直接相关文件，保持改动最小化。
- 不做与当前任务无关的重构、升级、目录迁移或风格清洗。
- 发现工作区已有未提交改动时，不要回退、覆盖或整理不属于当前任务的变更。
- 未经用户明确授权，不修改 Vben 基座或通用底座，详见 `.trae/rules/01-workspace-boundaries.md`。
- 涉及生成 API、业务 schema、表格/筛选、Vben 组件或 VxeGrid 分页时，先对齐对应专项规范。
- 规范未覆盖的场景，优先复用同业务域相邻模块的稳定实现，并在交付说明中记录判断依据。

## 3. 规范入口

- 单一规范事实源：`.trae/rules/PROJECT_RULES.md`
- 工作区与改动边界：`.trae/rules/01-workspace-boundaries.md`
- 生成 API 与业务契约：`.trae/rules/02-generated-api.md`
- 表单、筛选、表格与分页：`.trae/rules/03-form-table-schema.md`
- 业务 model 与类型：`.trae/rules/04-model-types.md`
- 注释规范：`.trae/rules/05-comments.md`
- Vben UI 与弹窗布局：`.trae/rules/06-vben-ui.md`
- 工具链、验证与提交：`.trae/rules/07-tooling-verification.md`

## 4. 验证基线

- 仅文档或规范改动：至少运行与改动文件直接相关的格式检查。Markdown 默认使用 `pnpm exec oxfmt --check <files...>`。
- 业务页面或业务代码改动：至少执行相关类型检查或项目可用性验证。
- 生成接口、类型结构、表单 schema、提交 payload 或表格/筛选链路变化：至少确认生成结果与类型检查通过。
- 通用组件、适配层或规则影响面较大时：补充 `pnpm lint`、`pnpm check` 或相关测试。
- 只有实际执行并确认输出后，才能声称“已完成”“已修复”或“已通过”。

## 5. 提交与交付

- 提交信息遵循当前 `commitlint` 配置与 Conventional Commits。
- 输出结论必须基于当前仓库事实，不凭空假设目录职责和实现细节。
- 如果用户要求与本文件或专项规范冲突，以用户当次明确要求为准，并在执行时显式说明偏离点。
