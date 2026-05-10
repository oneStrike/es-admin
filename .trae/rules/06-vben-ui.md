# Vben UI 与弹窗布局规范

适用范围：`apps/web-ele/src/**` 中页面容器、弹窗、抽屉、表单、表格、分页、弹窗选择器与 Element Plus 使用边界。

## Vben 组件优先

- 业务页面优先使用 Vben 与项目封装组件。
- 只要 Vben 或项目业务层已有等价能力，就禁止在业务层直接搭建 Element Plus 的同类容器组件。
- 页面壳、弹窗、抽屉、表单、表格、分页和弹窗选择器默认使用：
  - `Page`
  - `useVbenModal` / `VbenModal`
  - `useVbenDrawer` / `VbenDrawer`
  - `useVbenForm`
  - `useVbenVxeGrid`
  - `EsModalForm`
  - `EsModalTable`
  - `#/components/es-*`
- 新增页面或改造页面前，应先查找同类模块的 Vben 用法，优先复用已有模式。

## Page 使用

- `apps/web-ele` 业务页面中的 `Page` 只作为内容容器使用。
- 绝对禁止添加 `title`、`:title`，也禁止通过 `v-bind` 向 `Page` 透传 `title`。
- 页面标题统一由路由 `meta.title` 和菜单系统承载，避免页面内重复标题、面包屑语义漂移和菜单语义偏差。

## Element Plus 边界

- 禁止在有 Vben 或项目封装等价能力时直接使用 `el-dialog`、`el-drawer`、`el-table`、`el-pagination`。
- 禁止手写整套查询表单、手写页面容器或重复封装同类基础能力。
- Element Plus 仅允许作为小型业务原子控件使用，例如表格 slot 内的状态标签、提示、轻量按钮、日期选择等。
- 如果后续 Vben 或项目组件提供同等直接入口，应迁回 Vben 或项目封装。
- 如确实需要绕过 Vben 组件，必须在改动说明中写明原因、替代方案和后续迁移条件。

## 弹窗与表格布局

- 弹窗内承载表格时，优先使用 `useVbenModal` 连接组件模式和 `useVbenVxeGrid`。
- 不要用 `el-dialog + el-table + el-pagination` 重新搭建。
- 父组件打开连接弹窗时，默认使用 `modalApi.setData(...).open()` 传递上下文。
- 子组件通过 `useVbenModal({ onOpenChange })` 与 `modalApi.getData()` 读取上下文，避免为弹窗专门维护一组 `visible` 和初始参数 props。
- 需要固定弹窗高度时，Modal 根容器应同时设置明确高度和最大高度，例如 `class: '!h-[86vh] !max-h-[86vh] ...'`。
- 不要只设置 `max-h` 后让默认内容滚动行为决定高度。
- Modal 内容区承载自适应表格时，应通过 `contentClass` 明确 `min-h-0` 和 `overflow-hidden`。
- 内部布局使用 `flex h-full min-h-0 flex-col`，表格容器使用 `flex-1 min-h-0`，让 VxeGrid 占满剩余空间。
- 顶部查询区、概览区、操作区应分区清晰。
- 不要把查询控件、统计指标、说明文字、操作按钮全部挤在同一行，也不要让顶部信息区过度侵占表格高度。
- 弹窗中的复杂展示列应优先使用 VxeGrid slots 或 cellRender。
- 状态标签、提示、轻量按钮等小型原子控件可以留在 slot 内，但表格、分页和弹窗容器必须交给 Vben/项目封装。
