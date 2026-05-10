# 注释规范

适用范围：`apps/web-ele/src/**` 中业务页面、model、composable/helper、接口适配、Vben/VxeGrid 集成，以及必要的任务文档。

## 默认原则

- 本仓库不追求“注释覆盖率”，而追求“维护者看到注释后能少走弯路”。
- 注释默认解释原因、约束、边界、业务语义、兼容性、风险和副作用，不逐句翻译代码。
- 注释必须符合 `es-admin` 的前端项目实际；不要机械照搬后端项目的“所有方法都要注释”规则。
- 代码本身已经足够清晰时，默认不补额外注释。
- 不要为了“看起来完整”写模板化空注释。
- 默认使用简体中文，专有名词、框架名、协议名、组件名、字段名保留英文。

## 注释形式

- 导出稳定业务符号、复杂常量对象、跨 surface schema，优先使用 JSDoc。
- 局部实现原因、兼容性 workaround、性能取舍、特殊分支，优先使用紧邻代码的行注释。
- Vue `<script setup>` 内的简单事件、简单 computed、直接字段透传不要求注释。
- 同一符号只保留一组有效注释；禁止为同一个类型、方法、字段堆叠多段重复注释。
- 若注释与实现不一致，应立即修正或删除；不要保留历史描述。

## 必须写注释的场景

- 导出的稳定业务 schema、options、columns extra、payload 构造函数、分页查询构造函数。
- 同一字段会同时影响 create/edit/search/table/detail 多个 surface 的源 schema。
- 非显而易见的 API 字段映射、旧页面字段兼容、生成契约缺口适配、故意不传某些字段。
- Vben、VbenModal、VbenVxeGrid、`formatQuery(...)`、`formSchemaTransform` 的非默认用法。
- 为绕开组件限制、历史接口差异或旧数据兼容而保留的 workaround。
- 有隐藏状态、副作用、异步竞态、缓存一致性、权限前提或跨模块复用的 composable/helper。
- 统计看板、临时选择器弹窗、纯聚合列表等无法从业务源 schema 派生的例外。
- 操作列、复杂 slot、formatter、cellRender 中存在业务判断、权限分支或状态组合展示时。
- 容易误删的兼容路由、兼容字段、过渡命名、旧接口桥接逻辑。

## 不强制写注释的场景

- 简单局部函数、简单点击事件、简单弹窗开关。
- 直接调用 API 并返回结果的薄封装。
- 自解释的 computed、ref、watch 参数同步。
- 单纯把源 schema 传给 `toTableColumns(...)` 或 `toSearchSchema(...)` 的常规代码。
- 已由字段名、类型、组件名和同域模式共同表达清楚的普通字段。

## 如何写

- 注释应优先回答“为什么这里不能按默认模式写”。
- 对业务 schema，说明字段在表单、筛选、表格、详情或 payload 中的共享边界。
- 对 payload 构造，说明字段白名单、兼容映射、默认值和故意省略项。
- 对分页构造，说明 VxeGrid 分页字段如何映射到后端分页契约。
- 对 Vben/VxeGrid workaround，说明组件限制、布局约束或历史原因。
- 对复杂 formatter/slot，说明业务状态组合规则，而不是复述渲染语法。
- 注释应短，通常 1 到 2 行；若需要长篇解释，优先沉到任务文档或模块 README。

## 禁止项

- 禁止逐行翻译代码，例如“点击按钮”“设置 visible 为 true”“调用接口获取数据”。
- 禁止为所有函数机械补注释。
- 禁止用注释替代命名、结构拆分和类型收敛。
- 禁止注释复述变量名、函数名、字段名或 `if` 条件。
- 禁止保留与当前生成接口、页面行为或组件能力不一致的历史注释。
- 禁止为了满足规则伪造无业务含义的 schema 字段或说明。

## 正反例

允许：

```ts
// 弹窗选择器只展示聚合结果，无法从编辑表单 schema 派生列。
const rewardSummaryColumns = [...]
```

允许：

```ts
// 后端仍使用 pageIndex/pageSize，VxeGrid 的 currentPage 必须在 model 层收敛。
export function buildRewardQuery(
  page: VxePage,
  formValues: RewardSearchValues,
) {
  return {
    pageIndex: page.currentPage,
    pageSize: page.pageSize,
    ...formValues,
  };
}
```

允许：

```ts
/**
 * 会员套餐配置的源字段定义，同时派生编辑表单、列表列和详情展示。
 */
export const vipPlanSchema = [...]
```

禁止：

```ts
// 打开弹窗。
modalApi.open();
```

禁止：

```ts
// 判断是否启用。
if (row.enabled) {
  ...
}
```
