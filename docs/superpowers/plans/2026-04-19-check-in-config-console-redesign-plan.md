# 签到配置台重构实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将 `es-admin` 的旧签到计划页面重构为基于新后端合同的三段式签到配置台，并补齐 `es-server` 的最小历史只读能力与跨仓库 OpenAPI 同步链路。

**架构：** 先在 `es-server` 增加只读的连续奖励轮次历史查询能力，并通过 `publish-api:admin` 同步到 Apifox；再在 `es-admin` 通过 `att` 生成新 API 类型，重建签到页面为 `基础配置 / 连续奖励轮次 / 奖励对账` 三个 tab。基础配置改为“预览驱动 + 抽屉编辑”，前端内部状态统一向 `rewardItems[]` 靠拢，但当前 UI 仅开放积分/经验快捷编辑。

**技术栈：** NestJS、Drizzle、Vue 3、Element Plus、Vben、Vitest、Jest、pnpm

---

## 文件结构

### `es-server`

- 修改：`E:/Code/es/es-server/libs/growth/src/check-in/dto/check-in-definition.dto.ts`
  - 新增历史分页/详情 DTO，补齐只读轮次历史 contract
- 修改：`E:/Code/es/es-server/libs/growth/src/check-in/check-in-definition.service.ts`
  - 提供历史 page/detail 查询与只读映射逻辑
- 修改：`E:/Code/es/es-server/libs/growth/src/check-in/check-in.service.ts`
  - 暴露新的 history facade 方法
- 修改：`E:/Code/es/es-server/apps/admin-api/src/modules/check-in/check-in.controller.ts`
  - 增加 `streak-round/history/page` 与 `streak-round/history/detail`
- 修改：`E:/Code/es/es-server/libs/growth/src/check-in/check-in-definition.service.spec.ts`
  - 增加 history page/detail 与只读语义测试

### `es-admin`

- 修改：`E:/Code/es/es-admin/apps/web-ele/src/api/core/checkIn.ts`
  - 通过生成同步 history API
- 修改：`E:/Code/es/es-admin/apps/web-ele/src/api/types/checkIn.d.ts`
  - 通过生成同步 history DTO 类型
- 修改：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/index.vue`
  - 重建页面为三 tab 配置台
- 创建：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/components/check-in-config-panel.vue`
  - 基础配置与预览驱动编辑
- 创建：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/components/check-in-round-panel.vue`
  - 当前轮次编辑与历史轮次只读展示
- 创建：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/components/check-in-reconciliation-panel.vue`
  - 奖励对账展示与补偿动作
- 创建：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/model/config.ts`
  - 基础配置状态、校验、预览、payload 构造
- 创建：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/model/streak-round.ts`
  - 当前轮次状态、校验、payload 构造
- 创建：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/model/reconciliation.ts`
  - 对账页表格 schema 与查询表单
- 修改：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/model/shared.ts`
  - 通用奖励项、状态、格式化工具
- 修改：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/model/plan-modal.test.ts`
  - 改写为新模型层测试入口
- 删除：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/components/check-in-plan-modal.vue`
- 删除：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/components/check-in-plan-reward-preview-modal.vue`
- 删除：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/model/detail.ts`
- 删除：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/model/plan-modal.ts`
- 删除：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/model/reward-preview.ts`

## 任务 1：补齐 `es-server` 轮次历史只读 contract

**文件：**
- 修改：`E:/Code/es/es-server/libs/growth/src/check-in/dto/check-in-definition.dto.ts`
- 修改：`E:/Code/es/es-server/libs/growth/src/check-in/check-in-definition.service.ts`
- 修改：`E:/Code/es/es-server/libs/growth/src/check-in/check-in.service.ts`
- 修改：`E:/Code/es/es-server/apps/admin-api/src/modules/check-in/check-in.controller.ts`
- 测试：`E:/Code/es/es-server/libs/growth/src/check-in/check-in-definition.service.spec.ts`

- [ ] **步骤 1：为历史只读查询编写失败的服务层测试**

```ts
it('returns history page items with predecessor and successor context', async () => {
  const result = await service.getRoundHistoryPage({ pageIndex: 1, pageSize: 15 });
  expect(result.list[0]).toMatchObject({
    isCurrent: true,
    predecessorRoundId: 2,
  });
});

it('returns read-only history detail for archived rounds', async () => {
  const result = await service.getRoundHistoryDetail({ id: 2 });
  expect(result).toMatchObject({
    isCurrent: false,
    rewardRules: [{ ruleCode: 'rule-7' }],
  });
});
```

- [ ] **步骤 2：运行测试验证失败**

运行：`pnpm test -- --runInBand --runTestsByPath libs/growth/src/check-in/check-in-definition.service.spec.ts`
预期：FAIL，报错缺少 `getRoundHistoryPage` / `getRoundHistoryDetail` 或返回结构不匹配。

- [ ] **步骤 3：新增历史 DTO**

```ts
export class QueryCheckInStreakRoundHistoryPageDto extends PageDto {}

export class CheckInStreakRoundHistoryPageItemDto extends BaseDto {
  roundCode!: string;
  version!: number;
  status!: CheckInStreakRoundStatusEnum;
  isCurrent!: boolean;
  predecessorRoundId?: number | null;
  predecessorRoundCode?: string | null;
  successorRoundId?: number | null;
  successorRoundCode?: string | null;
}

export class CheckInStreakRoundHistoryDetailResponseDto
  extends CheckInStreakRoundHistoryPageItemDto {
  rewardRules!: CheckInStreakRewardRuleItemDto[];
}
```

- [ ] **步骤 4：在 definition service 中实现 page/detail 查询**

```ts
async getRoundHistoryPage(query: QueryCheckInStreakRoundHistoryPageDto) {
  const page = await this.drizzle.ext.findPagination(this.checkInStreakRoundConfigTable, {
    where: inArray(this.checkInStreakRoundConfigTable.status, [
      CheckInStreakRoundStatusEnum.ACTIVE,
      CheckInStreakRoundStatusEnum.ARCHIVED,
    ]),
    ...query,
  });
  const relationMaps = await this.buildRoundRelationMaps(page.list, this.db);
  return {
    ...page,
    list: page.list.map((round) => this.toRoundHistoryPageItem(round, relationMaps)),
  };
}

async getRoundHistoryDetail(query: IdDto) {
  const round = await this.db.query.checkInStreakRoundConfig.findFirst({ where: { id: query.id } });
  // active + archived only
  return {
    ...this.toRoundHistoryPageItem(round, relationMaps),
    rewardRules: definition.rewardRules,
  };
}
```

- [ ] **步骤 5：在 facade 和 controller 暴露两个只读接口**

```ts
@Get('streak-round/history/page')
async getRoundHistoryPage(@Query() query: QueryCheckInStreakRoundHistoryPageDto) {
  return this.checkInService.getRoundHistoryPage(query);
}

@Get('streak-round/history/detail')
async getRoundHistoryDetail(@Query() query: IdDto) {
  return this.checkInService.getRoundHistoryDetail(query);
}
```

- [ ] **步骤 6：运行类型检查和 targeted Jest**

运行：`pnpm type-check`
预期：PASS

运行：`pnpm test -- --runInBand --runTestsByPath libs/growth/src/check-in/check-in-definition.service.spec.ts libs/growth/src/check-in/check-in-execution.service.spec.ts libs/growth/src/check-in/check-in-runtime.service.spec.ts libs/growth/src/check-in/check-in-streak-round.spec.ts`
预期：PASS

- [ ] **步骤 7：同步 admin OpenAPI 到 Apifox**

运行：`pnpm publish-api:admin`
预期：PASS，并看到新增 `streak-round/history/page` 与 `streak-round/history/detail` 被发布。

- [ ] **步骤 8：Commit**

```bash
git -C E:/Code/es/es-server add apps/admin-api/src/modules/check-in/check-in.controller.ts libs/growth/src/check-in/check-in-definition.service.ts libs/growth/src/check-in/check-in.service.ts libs/growth/src/check-in/dto/check-in-definition.dto.ts libs/growth/src/check-in/check-in-definition.service.spec.ts
git -C E:/Code/es/es-server commit -m "feat: add read-only check-in round history contract"
```

## 任务 2：刷新 `es-admin` 生成层并确认类型对齐

**文件：**
- 修改：`E:/Code/es/es-admin/apps/web-ele/src/api/core/checkIn.ts`
- 修改：`E:/Code/es/es-admin/apps/web-ele/src/api/types/checkIn.d.ts`

- [ ] **步骤 1：运行生成脚本刷新 `checkIn` API**

运行：`pnpm att:ele`
预期：PASS，且生成结果包含 `checkInStreakRoundHistoryPageApi`、`checkInStreakRoundHistoryDetailApi` 以及对应类型。

- [ ] **步骤 2：验证生成层包含历史接口**

运行：`rg -n "history/page|history/detail|CheckInStreakRoundHistory" E:/Code/es/es-admin/apps/web-ele/src/api/core/checkIn.ts E:/Code/es/es-admin/apps/web-ele/src/api/types/checkIn.d.ts`
预期：命中历史 page/detail API 与 DTO。

- [ ] **步骤 3：Commit**

```bash
git -C E:/Code/es/es-admin add apps/web-ele/src/api/core/checkIn.ts apps/web-ele/src/api/types/checkIn.d.ts apps/web-ele/src/api/core/index.ts apps/web-ele/src/api/types/*.d.ts
git -C E:/Code/es/es-admin commit -m "types: regenerate admin check-in history api"
```

## 任务 3：重建签到页为三段式配置台

**文件：**
- 修改：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/index.vue`
- 创建：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/components/check-in-config-panel.vue`
- 创建：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/components/check-in-round-panel.vue`
- 创建：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/components/check-in-reconciliation-panel.vue`

- [ ] **步骤 1：替换顶层页面为三 tab 配置台**

```vue
<el-tabs v-model="activeTab">
  <el-tab-pane label="基础配置" name="config">
    <CheckInConfigPanel />
  </el-tab-pane>
  <el-tab-pane label="连续奖励轮次" name="round">
    <CheckInRoundPanel />
  </el-tab-pane>
  <el-tab-pane label="奖励对账" name="reconciliation">
    <CheckInReconciliationPanel />
  </el-tab-pane>
</el-tabs>
```

- [ ] **步骤 2：实现基础配置面板，保留本地缓冲保存**

```ts
const enabled = ref(false);
const formState = reactive(createDefaultConfigFormState());

async function handleSave() {
  const error = validateConfigForm(formState);
  if (error) return;
  await checkInConfigUpdateApi(buildConfigUpdatePayload(enabled.value, formState));
  await loadConfig();
}
```

- [ ] **步骤 3：实现当前轮次面板，并固定 transport 字段**

```ts
async function handleSave() {
  const error = validateRoundForm(formState);
  if (error) return;
  await checkInStreakRoundUpdateApi(buildRoundUpdatePayload(formState));
  await Promise.all([loadRoundDetail(), loadHistory()]);
}
```

约束：
- `status = ACTIVE`
- `nextRoundStrategy = INHERIT`
- `nextRoundConfigId` 省略

- [ ] **步骤 4：将历史轮次做成只读列表 + 详情抽屉**

```ts
const historyList = ref<CheckInStreakRoundHistoryPageItemDto[]>([]);
const historyDetail = ref<CheckInStreakRoundHistoryDetailResponse | null>(null);
```

要求：
- 只能查看详情
- 不能出现任何历史编辑按钮

- [ ] **步骤 5：保留奖励对账表格与补偿能力**

```ts
const [ReconciliationGrid, reconciliationGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(reconciliationSearchFormSchema),
  gridOptions: reconciliationGridOptions,
});
```

- [ ] **步骤 6：运行页面级 IA 搜索验证**

运行：`rg -n "基础配置|连续奖励轮次|奖励对账" E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/index.vue`
预期：命中三个新 tab 标签。

运行：`rg -n "新增签到计划|计划管理|切换状态|编辑历史轮次" E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in`
预期：无命中。

- [ ] **步骤 7：Commit**

```bash
git -C E:/Code/es/es-admin add apps/web-ele/src/views/user-manager/check-in/index.vue apps/web-ele/src/views/user-manager/check-in/components/check-in-config-panel.vue apps/web-ele/src/views/user-manager/check-in/components/check-in-round-panel.vue apps/web-ele/src/views/user-manager/check-in/components/check-in-reconciliation-panel.vue
git -C E:/Code/es/es-admin commit -m "feat: rebuild check-in page as config console"
```

## 任务 4：重建模型层并让奖励状态向 `rewardItems[]` 靠拢

**文件：**
- 修改：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/model/shared.ts`
- 创建：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/model/config.ts`
- 创建：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/model/streak-round.ts`
- 创建：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/model/reconciliation.ts`
- 修改：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/model/plan-modal.test.ts`
- 删除：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/model/detail.ts`
- 删除：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/model/plan-modal.ts`
- 删除：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/model/reward-preview.ts`

- [ ] **步骤 1：把通用奖励工具抽到 `shared.ts`**

```ts
export function buildRewardItems(points?: number, experience?: number) {
  // 构造 rewardItems[]
}

export function parseRewardItems(rewardItems?: GrowthRewardItemDto[] | null) {
  // 从 rewardItems[] 投影回 points / experience
}
```

- [ ] **步骤 2：在 `config.ts` 中实现基础配置 owner**

```ts
export type CheckInConfigFormState = {
  baseRewardExperience?: number;
  baseRewardPoints?: number;
  dateRules: CheckInConfigDateRuleDraft[];
  makeupPeriodType: 1 | 2;
  patternRules: CheckInConfigPatternRuleDraft[];
  periodicAllowance: number;
};
```

要求：
- `rewardItems[]` 为真实提交结构
- `points / experience` 为当前快捷编辑投影

- [ ] **步骤 3：在 `streak-round.ts` 中实现当前轮次 owner**

```ts
export function buildRoundUpdatePayload(state: CheckInRoundFormState) {
  return {
    status: 1,
    nextRoundStrategy: 1,
    rewardRules: /* map to rewardItems[] */,
    roundCode: state.roundCode.trim(),
  };
}
```

- [ ] **步骤 4：在 `reconciliation.ts` 中保留搜索 schema 与表格列**

```ts
export const reconciliationSearchFormSchema = ...
export const reconciliationColumns = ...
```

- [ ] **步骤 5：改写模型层测试，锁住新数据映射**

```ts
it('builds config update payload with reward item arrays', () => {
  expect(payload.baseRewardItems).toEqual([...]);
});

it('builds round update payload with fixed transport fields', () => {
  expect(payload).toEqual({
    status: 1,
    nextRoundStrategy: 1,
  });
});
```

- [ ] **步骤 6：运行模型层单测验证**

运行：`pnpm test:unit -- apps/web-ele/src/views/user-manager/check-in/model/plan-modal.test.ts`
预期：PASS

- [ ] **步骤 7：Commit**

```bash
git -C E:/Code/es/es-admin add apps/web-ele/src/views/user-manager/check-in/model/shared.ts apps/web-ele/src/views/user-manager/check-in/model/config.ts apps/web-ele/src/views/user-manager/check-in/model/streak-round.ts apps/web-ele/src/views/user-manager/check-in/model/reconciliation.ts apps/web-ele/src/views/user-manager/check-in/model/plan-modal.test.ts
git -C E:/Code/es/es-admin commit -m "refactor: rebuild check-in models around reward items"
```

## 任务 5：做最终跨仓库验证并清理 legacy 引用

**文件：**
- 修改：`E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/**`
- 修改：`E:/Code/es/es-server/libs/growth/src/check-in/**`

- [ ] **步骤 1：运行 `es-server` 最终验证**

运行：`pnpm type-check`
预期：PASS

运行：`pnpm test -- --runInBand --runTestsByPath libs/growth/src/check-in/check-in-definition.service.spec.ts libs/growth/src/check-in/check-in-execution.service.spec.ts libs/growth/src/check-in/check-in-runtime.service.spec.ts libs/growth/src/check-in/check-in-streak-round.spec.ts`
预期：PASS

- [ ] **步骤 2：运行 `es-admin` 最终验证**

运行：`pnpm -F @vben/web-ele run typecheck`
预期：PASS

运行：`pnpm test:unit -- apps/web-ele/src/views/user-manager/check-in/model/plan-modal.test.ts`
预期：PASS

- [ ] **步骤 3：搜索 legacy plan/cycle 依赖**

运行：`rg -n "checkInPlan|计划管理|新增签到计划" E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in`
预期：无命中

- [ ] **步骤 4：确认最终路由 IA**

运行：`rg -n "基础配置|连续奖励轮次|奖励对账" E:/Code/es/es-admin/apps/web-ele/src/views/user-manager/check-in/index.vue`
预期：命中三个 tab 标签

- [ ] **步骤 5：Commit**

```bash
git -C E:/Code/es/es-server add apps/admin-api/src/modules/check-in/check-in.controller.ts libs/growth/src/check-in/check-in-definition.service.ts libs/growth/src/check-in/check-in.service.ts libs/growth/src/check-in/dto/check-in-definition.dto.ts libs/growth/src/check-in/check-in-definition.service.spec.ts
git -C E:/Code/es/es-admin add apps/web-ele/src/views/user-manager/check-in apps/web-ele/src/api/core/checkIn.ts apps/web-ele/src/api/types/checkIn.d.ts apps/web-ele/src/api/core/index.ts apps/web-ele/src/api/types
git -C E:/Code/es/es-admin commit -m "fix: align check-in admin with config console model"
```

## 自检

- 规格覆盖度：已覆盖 `基础配置 / 连续奖励轮次 / 奖励对账`、history 只读、`rewardItems[]` 过渡、抽屉编辑、固定 transport 字段、跨仓库 OpenAPI 同步。
- 占位符扫描：无 `TODO`、`TBD`、占位说明。
- 类型一致性：当前轮次提交统一固定 `status=ACTIVE`、`nextRoundStrategy=INHERIT`；基础配置与当前轮次的 owner 和测试命名一致。

## 执行交接

计划已完成并保存到 `docs/superpowers/plans/2026-04-19-check-in-config-console-redesign-plan.md`。两种执行方式：

**1. 子代理驱动（推荐）** - 每个任务调度一个新的子代理，任务间进行审查，快速迭代

**2. 内联执行** - 在当前会话中使用 executing-plans 执行任务，批量执行并设有检查点

鉴于你前面已经明确要求不要开启子代理，更适合继续走 **内联执行**。*** End Patch
