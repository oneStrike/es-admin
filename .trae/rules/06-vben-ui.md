# Vben UI 与弹窗布局规范

适用范围：`apps/web-ele/src/**` 中页面容器、弹窗、抽屉、表单、表格、分页、弹窗选择器与 Element Plus 使用边界。

## Vben 组件优先

- 业务页面优先使用 Vben 与项目封装组件。
- 只要 Vben 或项目业务层已有等价能力，就禁止在业务层直接搭建 Element Plus 的同类容器组件。
- 上游 Vben 已提供能力且业务侧需要接入时，优先在 `apps/web-ele/src` 通过 adapter、wrapper 或现有业务组件内部替换落地，不直接修改 `packages/**` 基座。
- 大量页面已经依赖同一业务入口时，应优先保留业务 API 并替换内部实现，例如保留 schema 的 `RichText` 别名、保留 `EsRecordDetail` 弹窗连接协议、通过 `EsTableAction` 包装表格操作。
- 只有新增业务面或调用协议确实需要变化时，才逐步扩展新的组件别名或调用方式；不要为了露出上游组件名而批量改动稳定页面。
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
- 单一业务页面不要拆成“空壳 `index.vue` + 单个本地整页 `*Panel` 组件”。如果 `index.vue` 只负责包一层 `Page` 并渲染一个未复用的本地组件，应将该组件的页面逻辑直接放在 `index.vue`。
- 多个 tab/panel 并列、组件被多处复用、作为弹窗/抽屉连接组件、或确有独立生命周期/懒加载边界时，可以保留独立组件。

## Element Plus 边界

- 禁止在有 Vben 或项目封装等价能力时直接使用 `el-dialog`、`el-drawer`、`el-table`、`el-pagination`。
- 禁止手写整套查询表单、手写页面容器或重复封装同类基础能力。
- Element Plus 仅允许作为小型业务原子控件使用，例如表格 slot 内的状态标签、提示、轻量按钮、日期选择等。
- 详情展示容器优先使用 `VbenDescriptions` 或项目详情封装；`el-descriptions` 不应在业务详情弹窗中继续扩散。
- 表格 slot 或操作列中禁止使用 `el-popconfirm`；需要确认的操作统一在脚本中使用 `useConfirm`，避免在 VxeGrid 单元格内嵌确认浮层造成交互和状态管理分散。
- 如果后续 Vben 或项目组件提供同等直接入口，应迁回 Vben 或项目封装。
- 如确实需要绕过 Vben 组件，必须在改动说明中写明原因、替代方案和后续迁移条件。

## 卡片、文本与主题适配

- 页面中的卡片、说明区、状态面板等视觉容器，应优先使用 Vben/项目封装；没有等价封装时，优先使用 `el-card` 等已有主题组件。
- 禁止用 `bg-white`、`bg-slate-*`、`border-slate-*`、`text-slate-*` 等浅色 Tailwind 类重复手写组件库已经提供的卡片背景、边框、阴影和文本颜色。
- Tailwind 在业务页面中优先用于布局、间距、响应式和必要的排版辅助；背景、边框、文本颜色等主题相关样式应优先交给组件库、CSS 变量或项目主题 token。
- `apps/web-ele` 模板中严禁新增 `style` 或 `:style` 属性；布局、尺寸、间距、溢出、定位、比例等静态样式优先使用 Tailwind CSS 工具类或 Tailwind 任意值。
- Tailwind 无法清晰表达的复杂样式、第三方组件覆盖样式或复用样式，应抽成语义化 class，并写入当前组件的 `<style scoped>` 或同域样式文件；不要退回模板内联样式。
- 只有运行时动态值确实无法通过 class 映射表达时，才允许保留极小范围的样式绑定，并应优先用 CSS 变量加 class 承载静态规则；提交说明需说明原因。
- 普通说明、弱提示、状态文本、列表/详情单元格文本应优先使用 `el-text` 或组件库暴露的文本能力，避免在业务模板中散落硬编码浅色文本类。
- 确需在自有元素上使用 Tailwind 颜色类时，必须同步提供 `dark:` 分支，或改用 Element Plus/Vben CSS 变量；不得留下只适配浅色模式的视觉实现。
- 内联 `code`、路径、文件名等自有展示元素不得固定浅色背景和文字颜色，应使用组件库文本组件、CSS 变量或完整的明暗主题类。

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
