# ES Admin 协作规范

本文件是当前仓库的集中式协作规范，适用于 AI 助手和人工协作者。未在本文明确说明的事项，优先遵循用户当次明确要求，再遵循仓库现有配置与脚本。

## 1. 规则优先级

1. 用户或需求方在当前任务中的明确指令
2. 本文件
3. 仓库现有自动化配置与脚本
4. 根目录 README 与各子目录 README

## 2. 仓库定位

- 当前仓库是一个基于 `pnpm` 的 monorepo。
- 主要工作区包括 `apps/*`、`packages/*`、`internal/*`、`scripts/*`、`playground`。
- 默认业务开发入口是 `apps/web-ele`，业务代码默认落在 `apps/web-ele/src/**`。

## 3. 改动边界

- 默认只在当前任务直接相关的文件内修改，保持改动最小化。
- 不做与当前任务无关的重构、升级、目录迁移或风格清洗。
- 发现工作区已有未提交改动时，不要回退、覆盖或整理不属于当前任务的变更。

### 3.1 Vben 基座保护

- 未经用户明确授权，不允许改动 Vben 基座代码。
- 默认将以下内容视为 Vben 基座或通用底座：
  - `packages/**`
  - `internal/**`
  - `scripts/**`
  - 根目录通用构建、Lint、格式化、提交规范配置
- 业务需求优先通过业务层封装、适配、组合、配置注入等方式解决，避免直接下沉修改基座。
- 如果任务看起来必须修改 Vben 基座，先停下来说明原因，等待用户确认后再动手。

## 4. 测试与调试文件规则

- 允许为了定位问题、验证修复或辅助开发，临时创建测试文件、脚本和调试代码。
- 这里的“临时文件”包括但不限于：
  - `*.spec.ts`、`*.spec.js`
  - `*.test.ts`、`*.test.js`
  - 临时调试脚本
  - 临时验证页面
  - 只为本次任务加入的 `console`、日志、断言、mock 代码
- 一旦任务完成、问题定位结束或测试已经通过，必须删除本次任务新增的临时测试文件与调试痕迹。
- 默认不把临时测试文件作为最终交付物提交。
- 只有在用户明确要求补充正式测试，或任务目标本身就是建设长期测试资产时，才允许保留新增测试文件。
- 仓库中原本已经存在的正式测试文件不属于“临时文件”，不要误删。

## 5. 生成代码与业务代码约束

- 涉及 `apps/web-ele/src/api/**`、`apps/web-ele/src/api/types/**` 一类接口产物时，只允许通过现有脚本生成，禁止手动修改、手动补丁或手工同步。
- 当前已有脚本：`pnpm -F @vben/web-ele run att`
- 如需调整接口定义、类型结构或生成结果，必须修改生成源、生成模板或脚本输入后重新生成，不允许直接编辑生成产物。
- 排查接口不一致时，应先核对官方接口规范、生成源和当前生成结果；不要为了让业务代码通过而在生成产物里临时改字段、改类型或补兼容逻辑。
- 业务层如需适配接口字段，只能在页面、model、service/helper 等非生成文件中做显式映射，并保留后端契约字段的清晰边界。
- 已生成但尚未对接的接口，应在排查结论或任务文档中单独列出，不应通过删除生成代码、手改类型或伪造调用来掩盖未对接状态。
- 业务逻辑、页面交互、页面级适配优先放在 `apps/web-ele/src/**` 内完成。
- 业务 UI schema、表格列、详情展示、提交 payload 和回填映射不得暴露生成契约中不存在的业务字段；后端新增字段必须先通过 `pnpm -F @vben/web-ele run att` 同步到生成类型，再接入页面。
- 新增或调整业务字段时，必须同时检查生成请求/响应类型、表单 schema、提交 payload、详情/编辑回填、列表/详情展示、搜索/表格派生关系；不能只改其中一处让字段链路断裂。
- 生成 DTO 中即使存在 `[property: string]: any` 之类宽松索引，也不得把整份表单值直接透传给接口；提交和查询 payload 应显式白名单构造，只传后端契约允许的字段。

### 5.1 表单、筛选与表格字段复用

- 业务表单、查询筛选和表格列应优先复用同一份 `EsFormSchema` 字段定义，避免为同一业务字段重复维护多套 label、field、组件语义和枚举映射。
- 表格列默认通过 `formSchemaTransform.toTableColumns(...)` 从业务 `formSchema` 生成；查询筛选默认通过 `formSchemaTransform.toSearchSchema(...)` 从同一份或同源 schema 派生。
- 业务列表配置必须按三层默认值判断：先遵守 `apps/web-ele/src/adapter/vxe-table.ts` 的 VxeGrid 全局默认值，再遵守 `formSchemaTransform` 的列/筛选转换默认值，最后才在业务模块 `extra` 或 `gridOptions` 中写差异。
- 新增或改造业务列表时，必须先确定一个本模块内的源 schema（例如 `formSchema`、`xxxFormSchema`、`xxxListSchema`）；表格列和查询筛选都应从这个源 schema 派生，再通过 `extra` 覆盖展示差异。禁止为同一业务字段同时维护一份 `formSchema`、一份 `*SearchSchema: EsFormSchema = [...]`、一份 `*TableSchema: EsFormSchema = [...]`。
- `const *TableSchema: EsFormSchema = [...]` 只允许作为临时过渡代码存在；正式业务 model 中应改名并定位为源 schema（如 `xxxListSchema`），或直接复用已有表单 schema 后调用 `formSchemaTransform.toTableColumns(sourceSchema, extra)`。
- 手写 `export const *SearchSchema: EsFormSchema = [...]` 只允许用于完全没有源 schema 且字段不属于任何业务表单/列表语义的特殊场景；只要字段能从本模块源 schema 表达，就必须使用 `formSchemaTransform.toSearchSchema(sourceSchema, extra)`。
- `toSearchSchema(...)` 的搜索项合并语义是二次合并：源 schema 的 `componentProps` 先进入搜索默认值，再与 `extra[field].componentProps` 深合并；业务侧 `extra.componentProps` 只写差异项，禁止重复声明默认 `clearable`、默认宽度 `class`、默认 `options: []`，除非本字段确实要覆盖默认行为。
- `toSearchSchema(...)` 是显式白名单转换；业务代码不得调用无 `extra` 参数的 `formSchemaTransform.toSearchSchema(sourceSchema)` 来表达“使用全部字段”。如果确实需要空搜索表单，应使用明确命名的空数组或局部注释说明。
- 修改 `formSchemaTransform.toSearchSchema(...)`、`toTableColumns(...)` 或 `apps/web-ele/src/adapter/vxe-table.ts` 后，必须全量排查 `apps/web-ele/src/views` 的调用点，清理因旧浅合并或旧默认缺失而遗留的重复配置，并在最终说明中列出保留例外。
- 表格列的序号列应由 `formSchemaTransform.toTableColumns(...)` 统一生成；不要在业务列表中手写重复的序号列，除非该表格确实无法用 schema 表达。
- 操作列通过 `actions: { show: true }` 显式开启即可；`toTableColumns(...)` 已默认提供 `title: '操作'`、`fixed: 'right'`、`slots: { default: 'actions' }` 和默认宽度。业务侧只在按钮数量较多、较少或使用非默认 slot 时补充 `width` / `minWidth` / `slots` 等真实差异。
- 表格列不要重复声明 `vxe-table` 适配层和 `toTableColumns(...)` 已经提供的默认行为，例如 `align: 'center'`、普通列默认 `minWidth: 100`、全局 `showOverflow`、默认 toolbar、默认分页大小、默认远程多排序、默认行 hover 和 `keyField: 'id'`。只有需要改变默认值时才写覆盖项。
- 日期列优先使用全局 `CellDate`，创建/更新时间优先使用 `toTableColumns(...)` 的 `createdAt` / `updatedAt` extra；图片 URL 优先使用 `CellImage`；枚举、布尔、状态类字段优先使用 `CellTag` 或 `CellText`；简单链接文本优先使用 `CellLink`。只有复杂交互、组合展示或业务按钮组才使用 slot。
- `toTableColumns(...)` 会从源 schema 的 `componentProps.options` 推导常见表格渲染：多选、布尔、RadioGroup、状态类字段和带 `color` / `type` 的 options 默认推导为 `CellTag`，普通 `Select` options 默认推导为 `CellText`。业务模块如果只是复用源 schema 里的同一组选项，禁止重复写 `cellRender.props.mapOptions`；确需改变展示形态时只写 `cellRender: { name: 'CellTag' }` 或 `CellText`，让选项数据继续来自源 schema。
- `CellTag` / `CellText` 的未知枚举值必须显示原始值或 `-`，禁止因为 options 未命中而渲染空标签。只有字段不在源 schema 中、表格展示故意使用另一组选项、或存在复杂 slot/formatter/交互展示时，才允许在业务 `extra` 中保留显式 `mapOptions`。
- 对于已经由源 schema 表达的枚举、布尔、状态类字段，业务 `extra` 不应只为了 `title`、`minWidth`、`width` 再声明同名字段；这类弱差异优先沉到 `formSchemaTransform` 或适配层默认值，只有存在 formatter、slot、fixed、sort、sortable、hide/show、非源字段或真实业务命名差异时才保留。
- 表格 formatter 的空值兜底默认使用空值判断（例如 `cellValue ?? '-'`），不要对可能是数字或布尔值的字段使用 `cellValue || '-'`，避免把 `0` 或 `false` 误显示成 `-`。
- 表格、筛选或展示字段只在以下情况允许手写补充：字段不属于表单语义、是纯展示/操作列、统计聚合列、弹窗选择器的临时列，或需要特殊 slot/formatter/cellRender。此时也应优先通过 `toTableColumns` 的 `extra` 参数追加或覆盖；只有无法映射到 schema 字段时才保留手写 columns。
- 统计看板、临时选择器弹窗、纯聚合列表等确实无法从业务源 schema 派生的例外，需要在改动说明或局部注释中说明原因；不要为了满足规则伪造无业务含义的表单字段。
- 新增或改造业务列表时，应先检查是否已有可复用的 `formSchema`、`searchSchema` 或同域 model/shared 定义；确需新增 schema 时，应放在对应业务模块的 `model` 层并与现有命名方式保持一致。
- 同一业务字段的 label、枚举选项、格式化、显示/筛选语义应尽量集中在同域 `model` 或 shared 文件中维护，不要在页面、弹窗、表格 slot 中各写一套。
- 搜索表单、列表表格、弹窗选择器如果使用同一组字段，应优先从同源 schema 派生；只有操作列、聚合列、状态组合展示等无法表达的内容，才允许作为额外列补充。
- create/edit/search/table/detail 等不同 surface 可以有不同字段集合，但同一业务字段的原子定义应来自同域字段目录或同源 schema；不要复制粘贴一组相同 field/label/rules/componentProps 后分别维护。

### 5.1.1 业务 model 边界与类型推导

- 业务模块必须自己维护自己的 `model` 文件；跨模块共用的内容只能放在同域 `shared` 目录中，并且只能包含无业务归属的基础 helper、分页查询映射、通用格式化或通用状态枚举。
- 禁止把多个业务模块的 schema、columns、detail、payload、options 合并进一个集中式大 model 文件，也禁止新增“兼容导出层”把旧集中入口继续暴露给业务模块。
- 页面列表行类型必须优先从生成 API 响应中推导，例如 `NonNullable<XxxPageResponse['list']>[number]`；不要手写一份与 DTO 重复的行类型。
- 创建、更新、查询、确认等提交 payload 必须由生成 API 请求类型约束，优先在对象字面量处使用 `satisfies XxxRequest` 校验；函数返回类型默认交给 TypeScript 推导，除非公共 API 边界、递归结构或泛型约束确实需要显式返回类型。
- 表单值、详情记录和业务行记录禁止使用 `Record<string, any>` 或宽泛 `any` 作为领域类型；如确实是通用基础组件边界，使用 `Record<string, unknown>` 并在进入具体业务 payload 前显式白名单转换。
- 生成 DTO 中的宽松索引签名只代表后端生成契约，不得在业务 model 中继续扩散；业务代码应从生成类型中选取、派生、约束，而不是复制 DTO 字段或放宽成 `any`。

### 5.2 Vben 组件优先规则

- 业务页面优先使用 Vben 与项目封装组件；只要 Vben 或项目业务层已有等价能力，就禁止在业务层直接搭建 Element Plus 的同类容器组件。
- 页面壳、弹窗、抽屉、表单、表格、分页和弹窗选择器默认使用 `Page`、`useVbenModal`/`VbenModal`、`useVbenDrawer`/`VbenDrawer`、`useVbenForm`、`useVbenVxeGrid`、`EsModalForm`、`EsModalTable`、`#/components/es-*` 等现有能力。
- `apps/web-ele` 业务页面中的 `Page` 只作为内容容器使用，绝对禁止添加 `title`、`:title`，也禁止通过 `v-bind` 向 `Page` 透传 `title`；页面标题统一由路由 `meta.title` 和菜单系统承载，避免页面内重复标题、面包屑语义漂移和菜单语义偏差。
- 禁止在有 Vben 或项目封装等价能力时直接使用 `el-dialog`、`el-drawer`、`el-table`、`el-pagination`、手写整套查询表单、手写页面容器或重复封装同类基础能力。
- Element Plus 仅允许作为小型业务原子控件使用，例如表格 slot 内的状态标签、提示、轻量按钮、日期选择等；如果后续 Vben 或项目组件提供同等直接入口，应迁回 Vben 或项目封装。
- 如确实需要绕过 Vben 组件，必须在改动说明中写明原因、替代方案和后续迁移条件。
- 新增页面或改造页面前，应先查找同类模块的 Vben 用法，优先复用已有模式；不要因为局部实现方便而绕过 Vben 的页面、弹窗、表单、表格、分页能力。

### 5.3 弹窗与表格布局规范

- 弹窗内承载表格时，优先使用 `useVbenModal` 连接组件模式和 `useVbenVxeGrid`，不要用 `el-dialog + el-table + el-pagination` 重新搭建。
- 父组件打开连接弹窗时，默认使用 `modalApi.setData(...).open()` 传递上下文；子组件通过 `useVbenModal({ onOpenChange })` 与 `modalApi.getData()` 读取上下文，避免为弹窗专门维护一组 `visible` 和初始参数 props。
- 需要固定弹窗高度时，Modal 根容器应同时设置明确高度和最大高度，例如 `class: '!h-[86vh] !max-h-[86vh] ...'`；不要只设置 `max-h` 后让默认内容滚动行为决定高度。
- Modal 内容区承载自适应表格时，应通过 `contentClass` 明确 `min-h-0` 和 `overflow-hidden`，内部布局使用 `flex h-full min-h-0 flex-col`，表格容器使用 `flex-1 min-h-0`，让 VxeGrid 占满剩余空间。
- 顶部查询区、概览区、操作区应分区清晰；不要把查询控件、统计指标、说明文字、操作按钮全部挤在同一行，也不要让顶部信息区过度侵占表格高度。
- 弹窗中的复杂展示列应优先使用 VxeGrid slots 或 cellRender；状态标签、提示、轻量按钮等小型原子控件可以留在 slot 内，但表格、分页和弹窗容器必须交给 Vben/项目封装。

### 5.4 VxeGrid 分页请求规范

- 使用 `useVbenVxeGrid` 的远程分页列表，应明确把 Vxe 的 `page.currentPage`、`page.pageSize` 映射为后端分页契约字段，当前后端默认使用 `pageIndex`、`pageSize`。
- 通用列表优先复用 `#/adapter/vxe-table` 的 `formatQuery(...)`；如果某个接口需要额外上下文参数，应在 `formatQuery(...)` 外显式合并，不要在视图里散落手写分页对象。
- 弹窗内、详情内或特殊列表若不适合直接使用 `formatQuery(...)`，应在同域 model/helper 中提供请求构造函数，例如把 `{ currentPage, pageSize }` 转成 `{ pageIndex, pageSize, ...业务上下文 }`。
- 分页请求构造函数必须只传后端契约允许的字段，不要把 VxeGrid 的内部状态、UI-only 字段或临时筛选对象透传给接口。
- 新增或调整分页映射时，应补充聚焦单测或至少执行现有 model 测试，验证 `pageIndex`、`pageSize` 和业务上下文参数没有丢失、改名或多传。

## 6. 包管理与运行方式

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

## 7. 代码风格与自动化校验

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
- 根目录已接入 `lefthook`，提交前会自动执行对应检查：
  - Markdown：`oxfmt`
  - Vue：`oxfmt + oxlint + eslint + stylelint`
  - JS/TS：`oxfmt + oxlint + eslint`
  - 样式文件：`oxfmt + stylelint`
  - commit message：`commitlint`

## 8. 验证要求

- 改动完成后，按改动范围执行最小必要验证，不跳过与本次改动直接相关的检查。
- 典型对应关系如下：
  - 页面或业务代码改动：至少执行相关类型检查或项目可用性验证
  - 接口或类型改动：至少确认生成结果与类型检查通过
  - 通用规范改动：至少执行对应的格式化和 Lint
  - 涉及回归风险时：补充单元测试或执行现有测试命令
- 只有在实际执行并确认结果后，才能声称“已完成”“已修复”或“已通过”。
- 如果因为环境、权限、依赖或时间原因无法完成某项验证，需要在交付说明中明确写出未验证项与风险。

## 9. 提交规范

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

## 10. 协作要求

- 输出结论要基于当前仓库事实，不凭空假设目录职责和实现细节。
- 修改前先理解现有模式，新增内容尽量与当前结构保持一致。
- 如果用户要求与本文件冲突，以用户当次明确要求为准，并在执行时显式说明偏离点。
