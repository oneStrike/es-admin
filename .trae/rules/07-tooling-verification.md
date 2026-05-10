# 工具链、验证与提交规范

适用范围：包管理、运行方式、代码风格、临时测试文件、验证命令与提交信息。

## 包管理与运行方式

- 统一使用 `pnpm`，不要混用 `npm`、`yarn` 作为日常开发命令。
- 版本要求遵循根目录 `package.json`：
  - Node.js：`^20.19.0 || ^22.18.0 || ^24.0.0`
  - pnpm：`>=10.0.0`
- 常用命令以根目录 `package.json` 为准：
  - 启动开发：`pnpm dev`
  - 格式化：`pnpm format`
  - Lint：`pnpm lint`
  - 类型与依赖检查：`pnpm check`
  - 单元测试：`pnpm test:unit`

## 代码风格与自动化校验

- 基础格式遵循 `.editorconfig`：
  - UTF-8
  - LF
  - 2 空格缩进
  - 保留文件结尾换行
  - 默认单引号
  - 最大行宽 100
- 统一遵循现有工具链，不自建重复规则：
  - `oxfmt`
  - `oxlint`
  - `eslint`
  - `stylelint`
  - `cspell`
  - `vitest`
  - `vue-tsc`
- Vue 样式禁止使用 `:deep`、`::v-deep`、`/deep/`。
- 需要覆盖组件库或子组件样式时，优先使用组件暴露的 `class`、`body-class`、`style`、CSS 变量，或使用带明确业务前缀的非 scoped 选择器，避免深度穿透。
- 默认不覆盖 Element Plus 的内建视觉样式；如无明确需求，直接使用组件默认样式，仅在业务容器、布局层和自有元素上补充样式。

## 测试与调试文件

- 允许为了定位问题、验证修复或辅助开发，临时创建测试文件、脚本和调试代码。
- 临时文件包括但不限于：
  - `*.spec.ts`、`*.spec.js`
  - `*.test.ts`、`*.test.js`
  - 临时调试脚本
  - 临时验证页面
  - 只为本次任务加入的 `console`、日志、断言、mock 代码
- 一旦任务完成、问题定位结束或测试已经通过，必须删除本次任务新增的临时测试文件与调试痕迹。
- 默认不把临时测试文件作为最终交付物提交。
- 只有在用户明确要求补充正式测试，或任务目标本身就是建设长期测试资产时，才允许保留新增测试文件。
- 仓库中原本已经存在的正式测试文件不属于“临时文件”，不要误删。

## 验证要求

- 改动完成后，按改动范围执行最小必要验证，不跳过与本次改动直接相关的检查。
- 仅文档或规范改动：至少运行与改动文件直接相关的格式检查。Markdown 默认使用 `pnpm exec oxfmt --check <files...>`。
- 页面或业务代码改动：至少执行相关类型检查或项目可用性验证。
- 接口或类型改动：至少确认生成结果与类型检查通过。
- 通用规范改动：至少执行对应的格式化和 Lint。
- 涉及回归风险时：补充单元测试或执行现有测试命令。
- 只有在实际执行并确认结果后，才能声称“已完成”“已修复”或“已通过”。
- 如果因为环境、权限、依赖或时间原因无法完成某项验证，需要在交付说明中明确写出未验证项与风险。

## Lefthook

- 根目录已接入 `lefthook`，提交前会自动执行对应检查：
  - Markdown：`oxfmt`
  - Vue：`oxfmt + oxlint + eslint + stylelint`
  - JS/TS：`oxfmt + oxlint + eslint`
  - 样式文件：`oxfmt + stylelint`
  - commit message：`commitlint`

## 提交规范

- 提交信息遵循 Conventional Commits。
- 允许的 `type` 以当前 `commitlint` 配置为准：
  - `feat`
  - `fix`
  - `perf`
  - `style`
  - `docs`
  - `test`
  - `refactor`
  - `build`
  - `ci`
  - `chore`
  - `revert`
  - `types`
  - `release`
- `scope` 需使用仓库允许范围；不确定时，优先使用已有 package 名称或 `project`。
- 提交标题长度上限为 108 个字符。
