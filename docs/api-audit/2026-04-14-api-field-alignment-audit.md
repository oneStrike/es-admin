# 接口字段对齐审计记录（2026-04-14）

## 1. 审计目标

本次审计的目标是：

- 基于当前仓库里**已经实际调用**的接口，逐一核对业务代码里使用的字段与自动生成的接口类型声明是否一致。
- 不修改 `apps/web-ele/src/api/**` 与 `apps/web-ele/src/api/types/**` 下的生成产物，只调整业务层适配代码。
- 在一次性梳理完成后，输出可复核的修改记录，供后续审查使用。

## 2. 审计范围

### 2.1 扫描范围

- 工作区：`apps/web-ele/src/**`
- 接口来源：`#/api/core`
- 类型来源：`#/api/types`

### 2.2 审计方法

本次审计采用了 3 层校验：

1. 通过 TypeScript AST 扫描 `apps/web-ele/src/**` 中对 `#/api/core` 的实际导入，确认“已调用接口”范围。
2. 以生成类型为准执行 `vue-tsc --noEmit --skipLibCheck`，定位字段不一致、枚举值变化、必填字段新增等问题。
3. 对改动最集中的 `checkIn` 模块补跑 `vitest`，确认字段映射调整后业务辅助逻辑仍然成立。

### 2.3 已调用接口总量

- 本次静态扫描共识别到 **227 个** 已调用的 API 导出。
- 本次存在字段或枚举适配变更的接口域共 **4 组**：
  - `appUpdate`
  - `contentComicChapterContentArchive`
  - `forumTopic`
  - `checkIn`

其余已调用接口在当前生成类型下未暴露新的静态不一致，本次未修改其业务代码。

## 3. 修改总览

### 3.1 实际修改文件

- `apps/web-ele/src/views/app-manager/app-update/index.vue`
- `apps/web-ele/src/views/app-manager/app-update/model/detail.ts`
- `apps/web-ele/src/views/app-manager/app-update/model/shared.ts`
- `apps/web-ele/src/views/content-manager/comic-manager/chapter/archive-import-panel.vue`
- `apps/web-ele/src/views/forum/topic/index.vue`
- `apps/web-ele/src/views/user-manager/check-in/index.vue`
- `apps/web-ele/src/views/user-manager/check-in/components/check-in-plan-modal.vue`
- `apps/web-ele/src/views/user-manager/check-in/components/check-in-plan-reward-preview-modal.vue`
- `apps/web-ele/src/views/user-manager/check-in/model/plan-modal.ts`
- `apps/web-ele/src/views/user-manager/check-in/model/plan-modal.test.ts`
- `apps/web-ele/src/views/user-manager/check-in/model/shared.ts`

### 3.2 未修改但已核对的生成产物

以下目录仅作为审计基准读取，未直接修改：

- `apps/web-ele/src/api/core/**`
- `apps/web-ele/src/api/types/**`

## 4. 逐接口域审计与修正明细

## 4.1 `appUpdate` 接口域

### 涉及接口

- `appUpdatePageApi`
- `appUpdateDetailApi`
- `appUpdateCreateApi`
- `appUpdateUpdateApi`
- `appUpdateUpdateStatusApi`

### 生成类型变化

本次生成类型中，以下字段从旧的字符串语义调整为数值枚举：

| 类型 | 字段 | 旧业务侧认知 | 当前生成类型 |
| --- | --- | --- | --- |
| `AppUpdateReleaseListItemDto` | `platform` | `'ios' | 'android'` | `1 | 2` |
| `AppUpdateReleaseDetailDto` | `platform` | `'ios' | 'android'` | `1 | 2` |
| `CreateAppUpdateReleaseDto` | `platform` | `'ios' | 'android'` | `1 | 2` |
| `UpdateAppUpdateReleaseDto` | `platform` | `'ios' | 'android'` | `1 | 2` |
| `AppUpdateReleaseDetailDto` | `packageSourceType` | `'upload' | 'url'` | `number`（当前接口语义为 `1=后台上传；2=外部下载地址`） |
| `CreateAppUpdateReleaseDto` | `packageSourceType` | `'upload' | 'url'` | `number` |
| `UpdateAppUpdateReleaseDto` | `packageSourceType` | `'upload' | 'url'` | `number` |

### 业务层修正

#### 1. 平台字段映射改为数值枚举

- 文件：`apps/web-ele/src/views/app-manager/app-update/model/shared.ts`
- 修正内容：
  - 将平台选项从字符串值改为数值值：
    - `安卓端 -> 2`
    - `苹果端 -> 1`
  - `platformOptionsObj` 的索引改为 `Record<number, ...>`。

#### 2. 安装包来源字段改为数值枚举

- 文件：`apps/web-ele/src/views/app-manager/app-update/model/shared.ts`
- 修正内容：
  - 将安装包来源选项从字符串改为数值：
    - `后台上传 -> 1`
    - `外部下载地址 -> 2`
  - 所有依赖 `packageSourceType` 的显示条件、上传值回填、提交组装逻辑，统一改为按数值判断。

#### 3. 列表页与详情页标签展示同步调整

- 文件：`apps/web-ele/src/views/app-manager/app-update/index.vue`
- 修正内容：
  - 平台标签判断从 `row.platform === 'ios'` 改为 `row.platform === 1`。

- 文件：`apps/web-ele/src/views/app-manager/app-update/model/detail.ts`
- 修正内容：
  - 安装包来源文案判断从 `detail.packageSourceType === 'url'` 改为 `detail.packageSourceType === 2`。

### 影响字段汇总

- `platform`
- `packageSourceType`

## 4.2 `contentComicChapterContentArchive` 接口域

### 涉及接口

- `contentComicChapterContentArchiveDetailApi`
- `contentComicChapterContentArchiveConfirmApi`
- 以及上传后返回的 `ContentComicChapterContentArchivePreviewResponse`

### 生成类型变化

`ComicArchiveTaskResponseDto` 与 `ComicArchiveResultItemDto` 中的状态字段已改为数值枚举：

| 类型 | 字段 | 旧业务侧认知 | 当前生成类型 |
| --- | --- | --- | --- |
| `ComicArchiveTaskResponseDto` | `status` | `'draft' | 'pending' | 'processing' | 'success' | ...` | `0 | 1 | 2 | 3 | 4 | 5 | 6 | 7` |
| `ComicArchiveResultItemDto` | `status` | `'success' | 'failed' | 'skipped' | ...` | `0 | 1 | 2` |

### 业务层修正

- 文件：`apps/web-ele/src/views/content-manager/comic-manager/chapter/archive-import-panel.vue`

#### 1. 建立显式数值状态常量

新增：

- `ARCHIVE_STATUS`
- `ARCHIVE_RESULT_STATUS`

用于统一替代页面内原先的字符串状态字面量。

#### 2. 终态、处理中态集合按数值重建

修正内容：

- `terminalStatuses`
- `processingStatuses`
- `statusLabelMap`
- `statusTypeMap`
- `resultStatusLabelMap`
- `resultStatusTypeMap`

全部从字符串键改为数值键。

#### 3. 任务状态判断与回填同步改为数值

修正内容：

- 确认阶段判断：`status === 0`
- 后台处理中判断：`status in {1, 2}`
- 成功提示判断：`status === 3`
- 部分失败提示判断：`status === 4`
- 确认导入后将本地任务状态置为 `1`（待处理）

### 影响字段汇总

- `ComicArchiveTaskResponseDto.status`
- `ComicArchiveResultItemDto.status`

## 4.3 `forumTopic` 接口域

### 涉及接口

- `forumTopicCreateApi`
- `forumTopicUpdateApi`
- `forumTopicDetailApi`

### 生成类型变化

生成类型中新增了必填字段：

| 类型 | 字段 | 当前生成类型要求 |
| --- | --- | --- |
| `CreateForumTopicDto` | `mentions` | `MentionDraftDto[]`，无提及时也必须传空数组 |
| `UpdateForumTopicDto` | `mentions` | `MentionDraftDto[]`，无提及时也必须传空数组 |

### 业务层修正

- 文件：`apps/web-ele/src/views/forum/topic/index.vue`

#### 1. 新增创建请求字段

- 在 `normalizeCreatePayload` 返回值中补充：
  - `mentions: []`

#### 2. 新增更新请求字段

- 在 `normalizeEditPayload` 返回值中补充：
  - `mentions: []`

### 影响字段汇总

- `mentions`

## 4.4 `checkIn` 接口域

### 涉及接口

- `checkInPlanPageApi`
- `checkInPlanDetailApi`
- `checkInPlanCreateApi`
- `checkInPlanUpdateApi`
- `checkInPlanUpdateStatusApi`
- `checkInReconciliationPageApi`
- `checkInReconciliationRepairApi`

### 生成类型变化

本次 `checkIn` 接口域的核心变化有 3 类：

#### 1. 周期类型改为数值枚举

| 类型 | 字段 | 旧业务侧认知 | 当前生成类型 |
| --- | --- | --- | --- |
| `CheckInPlanPageItemDto` | `cycleType` | `'weekly' | 'monthly'` | `1 | 2` |
| `CheckInPlanDetailResponseDto` | `cycleType` | `'weekly' | 'monthly'` | `1 | 2` |
| `CreateCheckInPlanDto` | `cycleType` | `'weekly' | 'monthly'` | `1 | 2` |
| `UpdateCheckInPlanDto` | `cycleType` | `'weekly' | 'monthly'` | `1 | 2` |

#### 2. 周期模式类型改为数值枚举

| 类型 | 字段 | 旧业务侧认知 | 当前生成类型 |
| --- | --- | --- | --- |
| `CheckInPatternRewardRuleItemDto` | `patternType` | `'WEEKDAY' | 'MONTH_DAY' | 'MONTH_LAST_DAY'` | `1 | 2 | 3` |
| `CreateCheckInPatternRewardRuleDto` | `patternType` | `'WEEKDAY' | 'MONTH_DAY' | 'MONTH_LAST_DAY'` | `1 | 2 | 3` |

#### 3. 对账来源类型改为数值枚举

| 类型 | 字段 | 旧业务侧认知 | 当前生成类型 |
| --- | --- | --- | --- |
| `CheckInReconciliationItemDto` | `resolvedRewardSourceType` | `'BASE_REWARD' | 'DATE_RULE' | 'PATTERN_RULE'` | `1 | 2 | 3` |

### 业务层修正

#### 4.4.1 模型层统一引入数值常量

- 文件：`apps/web-ele/src/views/user-manager/check-in/model/plan-modal.ts`

新增常量：

- `CHECK_IN_CYCLE_TYPE`
  - `WEEKLY = 1`
  - `MONTHLY = 2`
- `CHECK_IN_PATTERN_TYPE`
  - `WEEKDAY = 1`
  - `MONTH_DAY = 2`
  - `MONTH_LAST_DAY = 3`

目的：

- 避免业务代码继续散落字符串字面量。
- 让表单 Schema、规则转换、日期计算、提交组装都对齐到生成类型。

#### 4.4.2 基础信息表单改为数值周期类型

- 文件：`apps/web-ele/src/views/user-manager/check-in/model/plan-modal.ts`
- 修正内容：
  - 周期类型选项由字符串值改为数值值。
  - 默认计划模型的 `cycleType` 改为 `1`。
  - `getDefaultPlanStartDate`、`normalizePlanBoundaryDate`、`getPlanBusinessRuleError` 等函数的周期判断全部改为数值比较。

#### 4.4.3 周期规则草稿与提交组装改为数值模式类型

- 文件：`apps/web-ele/src/views/user-manager/check-in/model/plan-modal.ts`
- 修正内容：
  - `createPatternRuleKey`
  - `resolveMonthlyRewardMode`
  - `resolveWeeklyRewardMode`
  - `buildPlanWithRewardPayload`
  - `toWeeklyPatternDraft`
  - `toMonthlyPatternDraft`
  - `comparePatternRuleDraft`
  - `getPatternRuleForDate`

以上函数全部由字符串模式判断改为数值模式判断，但保留了规则 key 的字符串格式，如：

- `WEEKDAY:1`
- `MONTH_DAY:15`
- `MONTH_LAST_DAY`

也就是说：

- **接口字段 `patternType` 改为数值**
- **前端内部规则 key 继续保持字符串标识**

这两层语义已彻底拆开，避免再次混用。

#### 4.4.4 计划弹窗视图层同步切换到数值枚举

- 文件：`apps/web-ele/src/views/user-manager/check-in/components/check-in-plan-modal.vue`

修正内容：

- 月计划 / 周计划判断由字符串改为 `CHECK_IN_CYCLE_TYPE` 常量。
- 月末规则、按周规则、按月固定日期规则的 `patternType` 绑定值改为 `CHECK_IN_PATTERN_TYPE` 常量。
- `syncPlanDateSchema` 入参类型同步改为 `1 | 2`。

#### 4.4.5 奖励预览页同步切换到数值周期类型

- 文件：`apps/web-ele/src/views/user-manager/check-in/components/check-in-plan-reward-preview-modal.vue`

修正内容：

- 周视图 / 月视图分支判断改为 `CHECK_IN_CYCLE_TYPE.WEEKLY`。

#### 4.4.6 对账页奖励来源标签改为数值枚举

- 文件：`apps/web-ele/src/views/user-manager/check-in/model/shared.ts`
- 修正内容：
  - `checkInCycleTypeOptions` 改为数值值。
  - `checkInPatternTypeOptions` 改为数值值。
  - `checkInRewardSourceOptions` 改为数值值。

- 文件：`apps/web-ele/src/views/user-manager/check-in/index.vue`
- 修正内容：
  - `formatRewardSourceLabel` 的参数类型由 `string` 改为 `number`。

#### 4.4.7 测试基线全部迁移到新枚举

- 文件：`apps/web-ele/src/views/user-manager/check-in/model/plan-modal.test.ts`

修正内容：

- 所有 `cycleType` 测试数据由字符串改为数值常量。
- 所有 `patternType` 测试数据由字符串改为数值常量。
- 规则 key 断言仍保留字符串格式，不与接口枚举混淆。

### 影响字段汇总

- `cycleType`
- `patternType`
- `resolvedRewardSourceType`

## 5. 审计结论

### 5.1 本次确认存在不一致并完成修正的字段

| 接口域 | 字段 |
| --- | --- |
| `appUpdate` | `platform`、`packageSourceType` |
| `contentComicChapterContentArchive` | `status`（任务状态）、`status`（结果状态） |
| `forumTopic` | `mentions` |
| `checkIn` | `cycleType`、`patternType`、`resolvedRewardSourceType` |

### 5.2 本次未直接修改的已调用接口

通过 AST 扫描确认的其余 **223 个** 已调用接口，在当前生成类型下未出现新的静态字段不一致，本次不做业务代码改动。

## 6. 验证记录

### 6.1 类型检查

执行命令：

```bash
pnpm -C apps/web-ele run typecheck
```

结果：

- 通过。

### 6.2 单元测试

执行命令：

```bash
pnpm -C apps/web-ele exec vitest run src/views/user-manager/check-in/model/plan-modal.test.ts
```

结果：

- 通过，`1` 个测试文件、`22` 条测试全部通过。

### 6.3 验证过程中的附加观察

在执行 `vitest` 时，Vite 对现有文件 `apps/web-ele/src/views/2026-04-14-schema-relations-admin-breaking.md` 发出了预处理告警，原因是该 Markdown 文件位于 `src/views` 下，被当作模块参与了解析。

该告警**不影响本次测试结果通过**，也**不属于本次接口字段适配修改范围**，因此本次未处理。

## 7. 后续复核建议

- 后续若再次执行接口生成脚本，优先关注是否继续存在“字符串枚举改数值枚举”的情况，尤其是后台枚举字段。
- 对于新增必填数组字段（如 `mentions`），建议在页面层统一提供默认空数组，避免每个提交函数单独补齐。
- 建议后续将“接口枚举值”和“前端展示 key”彻底分层，不再共用一套字面量语义。
