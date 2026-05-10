# 表单、筛选、表格与分页规范

适用范围：`apps/web-ele/src/**` 内业务表单、查询筛选、表格列、详情展示、弹窗选择器和 VxeGrid 分页请求。

## 源 schema 优先

- 业务表单、查询筛选和表格列应优先复用同一份 `EsFormSchema` 字段定义，避免为同一业务字段重复维护多套 label、field、组件语义和枚举映射。
- 新增或改造业务列表时，必须先确定一个本模块内的源 schema，例如 `formSchema`、`xxxFormSchema`、`xxxListSchema`。
- 表格列默认通过 `formSchemaTransform.toTableColumns(...)` 从业务 `formSchema` 生成。
- 查询筛选默认通过 `formSchemaTransform.toSearchSchema(...)` 从同一份或同源 schema 派生。
- 禁止为同一业务字段同时维护一份 `formSchema`、一份 `*SearchSchema: EsFormSchema = [...]`、一份 `*TableSchema: EsFormSchema = [...]`。

## Search 与 Table 派生

- `const *TableSchema: EsFormSchema = [...]` 只允许作为临时过渡代码存在。
- 正式业务 model 中应将表格源改名并定位为源 schema，或直接复用已有表单 schema 后调用 `formSchemaTransform.toTableColumns(sourceSchema, extra)`。
- 手写 `export const *SearchSchema: EsFormSchema = [...]` 只允许用于完全没有源 schema 且字段不属于任何业务表单/列表语义的特殊场景。
- 只要字段能从本模块源 schema 表达，就必须使用 `formSchemaTransform.toSearchSchema(sourceSchema, extra)`。
- `toSearchSchema(...)` 是显式白名单转换；业务代码不得调用无 `extra` 参数的 `formSchemaTransform.toSearchSchema(sourceSchema)` 来表达“使用全部字段”。
- 如果确实需要空搜索表单，应使用明确命名的空数组或局部注释说明。

## 默认值与差异覆盖

- 业务列表配置必须按三层默认值判断：
  1. `apps/web-ele/src/adapter/vxe-table.ts` 的 VxeGrid 全局默认值
  2. `formSchemaTransform` 的列/筛选转换默认值
  3. 业务模块 `extra` 或 `gridOptions` 中的真实差异
- `toSearchSchema(...)` 的搜索项合并语义是二次合并：源 schema 的 `componentProps` 先进入搜索默认值，再与 `extra[field].componentProps` 深合并。
- 业务侧 `extra.componentProps` 只写差异项，禁止重复声明默认 `clearable`、默认宽度 `class`、默认 `options: []`，除非本字段确实要覆盖默认行为。
- 修改 `formSchemaTransform.toSearchSchema(...)`、`toTableColumns(...)` 或 `apps/web-ele/src/adapter/vxe-table.ts` 后，必须全量排查 `apps/web-ele/src/views` 的调用点，清理因旧浅合并或旧默认缺失而遗留的重复配置，并在最终说明中列出保留例外。

## 表格列生成

- 表格列的序号列应由 `formSchemaTransform.toTableColumns(...)` 统一生成；不要在业务列表中手写重复的序号列，除非该表格确实无法用 schema 表达。
- 操作列通过 `actions: { show: true }` 显式开启即可。
- `toTableColumns(...)` 已默认提供 `title: '操作'`、`fixed: 'right'`、`slots: { default: 'actions' }` 和默认宽度。
- 业务侧只在按钮数量较多、较少或使用非默认 slot 时补充 `width`、`minWidth`、`slots` 等真实差异。
- 表格列不要重复声明 `vxe-table` 适配层和 `toTableColumns(...)` 已经提供的默认行为，例如 `align: 'center'`、普通列默认 `minWidth: 100`、全局 `showOverflow`、默认 toolbar、默认分页大小、默认远程多排序、默认行 hover 和 `keyField: 'id'`。
- 只有需要改变默认值时才写覆盖项。

## 单元格展示

- 日期列优先使用全局 `CellDate`，创建/更新时间优先使用 `toTableColumns(...)` 的 `createdAt` / `updatedAt` extra。
- 图片 URL 优先使用 `CellImage`。
- 枚举、布尔、状态类字段优先使用 `CellTag` 或 `CellText`。
- 简单链接文本优先使用 `CellLink`。
- 只有复杂交互、组合展示或业务按钮组才使用 slot。
- `toTableColumns(...)` 会从源 schema 的 `componentProps.options` 推导常见表格渲染。
- 业务模块如果只是复用源 schema 里的同一组选项，禁止重复写 `cellRender.props.mapOptions`。
- 确需改变展示形态时只写 `cellRender: { name: 'CellTag' }` 或 `CellText`，让选项数据继续来自源 schema。
- `CellTag` / `CellText` 的未知枚举值必须显示原始值或 `-`，禁止因为 options 未命中而渲染空标签。
- 只有字段不在源 schema 中、表格展示故意使用另一组选项、或存在复杂 slot/formatter/交互展示时，才允许在业务 `extra` 中保留显式 `mapOptions`。
- 表格 formatter 的空值兜底默认使用空值判断，例如 `cellValue ?? '-'`；不要对可能是数字或布尔值的字段使用 `cellValue || '-'`，避免把 `0` 或 `false` 误显示成 `-`。

## 允许手写的例外

- 表格、筛选或展示字段只在以下情况允许手写补充：
  - 字段不属于表单语义
  - 纯展示/操作列
  - 统计聚合列
  - 弹窗选择器的临时列
  - 需要特殊 slot/formatter/cellRender
- 此时也应优先通过 `toTableColumns` 的 `extra` 参数追加或覆盖；只有无法映射到 schema 字段时才保留手写 columns。
- 统计看板、临时选择器弹窗、纯聚合列表等确实无法从业务源 schema 派生的例外，需要在改动说明或局部注释中说明原因；不要为了满足规则伪造无业务含义的表单字段。

## 复用与归属

- 新增或改造业务列表时，应先检查是否已有可复用的 `formSchema`、`searchSchema` 或同域 model/shared 定义。
- 确需新增 schema 时，应放在对应业务模块的 `model` 层并与现有命名方式保持一致。
- 同一业务字段的 label、枚举选项、格式化、显示/筛选语义应尽量集中在同域 `model` 或 shared 文件中维护，不要在页面、弹窗、表格 slot 中各写一套。
- 搜索表单、列表表格、弹窗选择器如果使用同一组字段，应优先从同源 schema 派生。
- create/edit/search/table/detail 等不同 surface 可以有不同字段集合，但同一业务字段的原子定义应来自同域字段目录或同源 schema。
- 不要复制粘贴一组相同 field/label/rules/componentProps 后分别维护。

## VxeGrid 分页请求

- 使用 `useVbenVxeGrid` 的远程分页列表，应明确把 Vxe 的 `page.currentPage`、`page.pageSize` 映射为后端分页契约字段。
- 当前后端默认使用 `pageIndex`、`pageSize`。
- 通用列表优先复用 `#/adapter/vxe-table` 的 `formatQuery(...)`。
- 如果某个接口需要额外上下文参数，应在 `formatQuery(...)` 外显式合并，不要在视图里散落手写分页对象。
- 弹窗内、详情内或特殊列表若不适合直接使用 `formatQuery(...)`，应在同域 model/helper 中提供请求构造函数，例如把 `{ currentPage, pageSize }` 转成 `{ pageIndex, pageSize, ...业务上下文 }`。
- 分页请求构造函数必须只传后端契约允许的字段，不要把 VxeGrid 的内部状态、UI-only 字段或临时筛选对象透传给接口。
- 新增或调整分页映射时，应补充聚焦单测或至少执行现有 model 测试，验证 `pageIndex`、`pageSize` 和业务上下文参数没有丢失、改名或多传。
