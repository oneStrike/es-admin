# Web-Ele 接口重构对接记录

## 说明

本文档记录本次 `apps/web-ele` 业务层对接新生成接口与类型的排查和修复结果。

- 生成产物以 `apps/web-ele/src/api/core/**`、`apps/web-ele/src/api/types/**` 为唯一真值来源。
- 本次未直接修改任何生成接口和生成类型，只在业务层做字段映射、请求适配和展示修复。
- 目标是严格按新字段和新数据结构完成适配，不主动改变原有业务意图。

## 已完成适配

### 1. Growth 奖励规则页

涉及文件：

- `apps/web-ele/src/views/user-manager/growth/experience/index.vue`
- `apps/web-ele/src/views/user-manager/growth/experience/modules/model/shared.ts`
- `apps/web-ele/src/views/user-manager/growth/experience/modules/model/detail.ts`
- `apps/web-ele/src/views/user-manager/growth/points/index.vue`
- `apps/web-ele/src/views/user-manager/growth/points/modules/model/shared.ts`
- `apps/web-ele/src/views/user-manager/growth/points/modules/model/detail.ts`
- `apps/web-ele/src/views/user-manager/growth/model/constants.ts`

处理结果：

- 经验规则页和积分规则页已从旧的分离接口迁移到统一的 `growthRewardRules*` 接口。
- 通过固定 `assetType` 区分页面语义：
  - 积分页：`assetType = 1`
  - 经验页：`assetType = 2`
- 奖励数值字段已从旧的 `points / experience` 统一切换为新字段 `delta`。
- 提交时补齐了新接口要求的 `assetKey: ''`。
- 成长事件下拉常量已补全到当前生成类型声明的完整枚举范围，避免旧事件码缺失。

### 2. Growth 等级规则页

涉及文件：

- `apps/web-ele/src/views/user-manager/growth/level-rules/modules/model/shared.ts`
- `apps/web-ele/src/views/user-manager/growth/level-rules/modules/model/detail.ts`

处理结果：

- 表单字段已从旧的 `discount` 切换为新字段 `purchasePayableRate`。
- 详情卡片同步展示了新的积分支付比例字段。

### 3. 用户任务页

涉及文件：

- `apps/web-ele/src/views/user-manager/tasks/index.vue`
- `apps/web-ele/src/views/user-manager/tasks/model/shared.ts`
- `apps/web-ele/src/views/user-manager/tasks/model/detail.ts`

处理结果：

- 任务奖励字段已从旧的 `rewardConfig` 切换为新字段 `rewardItems`。
- 表单层保留文本编辑方式，但已桥接为 JSON 数组输入输出，提交前会解析为 `rewardItems[]`。
- 详情页已改为按 `rewardItems` 展示奖励摘要。

### 4. 用户画像页

涉及文件：

- `apps/web-ele/src/views/user-manager/profile/components/user-operation-modal.vue`
- `apps/web-ele/src/views/user-manager/profile/index.vue`
- `apps/web-ele/src/views/user-manager/profile/model/shared.ts`
- `apps/web-ele/src/views/user-manager/profile/model/detail.ts`

处理结果：

- 积分统计类型已从旧的 `AdminAppUserPointStatsDto` 切换到新类型 `UserPointStatsFieldsDto`。
- 新建用户时已改为和重置密码一致，先拉取公钥，再做 RSA 加密后提交密码。
- 编辑资料回填已从顶层 `bio / signature` 读取，不再访问旧的 `forumProfile`。
- 列表筛选的 `deletedScope` 已切换为新接口的数字值域 `0 / 1 / 2`。
- 用户列表和详情中的社区画像计数已改为从 `counts` 结构读取。

### 5. 签到计划页

涉及文件：

- `apps/web-ele/src/views/user-manager/check-in/index.vue`
- `apps/web-ele/src/views/user-manager/check-in/model/plan-modal.ts`
- `apps/web-ele/src/views/user-manager/check-in/model/shared.ts`
- `apps/web-ele/src/views/user-manager/check-in/model/plan-modal.test.ts`

处理结果：

- 奖励结构已从旧的 `baseRewardConfig / rewardConfig` 桥接到新结构 `baseRewardItems / rewardItems`。
- 当前界面仍保留“积分 / 经验”输入方式，但模型层已完成：
  - `rewardItems[] -> { points, experience }` 解析
  - `{ points, experience } -> rewardItems[]` 提交
- 签到计划列表默认奖励列已切换到 `baseRewardItems`。
- 对账列表筛选字段已对齐新请求字段：
  - `rewardStatus -> recordSettlementStatus`
  - `grantStatus -> grantSettlementStatus`
- 连续奖励展示已改为读取 `grant.rewardSettlement.*` 嵌套结构。
- `plan-modal` 相关单测已整体迁移到 `rewardItems` 结构。

## 静态排查结论

结合当前生成类型、`vue-tsc`、调用点检索和业务层手工核对，当前已明确完成适配的高风险域为：

- `user-manager/check-in`
- `user-manager/growth`
- `user-manager/profile`
- `user-manager/tasks`

对以下范围做了调用点静态扫描，当前未发现需要立即修改的显式断点：

- `views/app-manager/**`
- `views/system-manager/**`
- `hooks/useUpload.ts`
- `components/es-upload/**`

说明：

- 上述“未发现显式断点”基于当前生成类型、调用点引用和现有类型检查结果。
- 由于部分生成 DTO 自带 `[property: string]: any`，这类模块后续如果后端继续调整返回结构，仍建议结合联调数据再做一次人工复核。

## 待确认事项

以下问题无法仅凭当前生成代码做出可靠决策，已统一记录：

### 1. Check-In 对账页的基础奖励结算摘要缺口

新 `CheckInReconciliationItemDto` 里只有 `rewardSettlementId`，没有像连续奖励那样完整返回基础奖励的结算摘要对象。

影响：

- 现有页面很难严格映射基础奖励的结算状态、结果类型、账本记录和最近错误。
- 当前页面只能做保守展示，相关字段语义仍需后端确认。

建议：

- 确认是否应补充基础奖励的结算摘要结构。
- 如果后端本就返回了这些字段但类型未生成出来，需要修正接口定义后重新生成。

### 2. Check-In 奖励资产类型是否需要扩展 UI

新 `rewardItems` 支持 `assetType = 1 / 2 / 3 / 4 / 5`，但当前签到计划页面只提供“积分 / 经验”编辑能力。

当前处理：

- 已先桥接 `assetType = 1 / 2`，保证现有界面可继续工作。

待确认：

- 是否需要把签到页升级为通用奖励项编辑器。

### 3. Growth 奖励规则的负数语义

新 `delta` 字段注释要求“必须为正整数”，而旧页面语义允许“负数表示扣减”。

当前处理：

- 表单已收敛到正整数输入，按新 DTO 约束对齐。

待确认：

- 如果仍需要“扣减型规则”，应由后端明确新的接口契约或拆分新的业务入口。

### 4. 用户列表中的删除态字段

生成的 `AdminAppUserPageItemDto` 未声明 `deletedAt`，但当前页面仍依赖该字段控制部分按钮和展示。

当前处理：

- 由于线上页面逻辑仍依赖它，本次未贸然删改相关交互。

待确认：

- `deletedAt` 是后端仍返回但类型漏生，还是接口确实已调整。

### 5. 用户画像中的“回复数 / 获赞数 / 获收藏数”语义

新 `counts` 结构提供的是：

- `commentCount`
- `forumTopicReceivedLikeCount`
- `commentReceivedLikeCount`
- `forumTopicReceivedFavoriteCount`

当前处理：

- “回复数”暂映射为 `commentCount`
- “获赞数”暂映射为主题获赞 + 评论获赞之和
- “获收藏数”暂映射为主题获收藏数

待确认：

- 页面文案是否仍需保留旧含义，或应同步调整展示名称。

## 本次验证

已执行：

```bash
pnpm -F @vben/web-ele run typecheck
pnpm -F @vben/web-ele exec vitest run src/views/user-manager/check-in/model/plan-modal.test.ts
pnpm exec eslint apps/web-ele/src/views/user-manager/growth/model/constants.ts apps/web-ele/src/views/user-manager/growth/experience/index.vue apps/web-ele/src/views/user-manager/growth/experience/modules/model/shared.ts apps/web-ele/src/views/user-manager/growth/experience/modules/model/detail.ts apps/web-ele/src/views/user-manager/growth/points/index.vue apps/web-ele/src/views/user-manager/growth/points/modules/model/shared.ts apps/web-ele/src/views/user-manager/growth/points/modules/model/detail.ts apps/web-ele/src/views/user-manager/growth/level-rules/modules/model/shared.ts apps/web-ele/src/views/user-manager/growth/level-rules/modules/model/detail.ts apps/web-ele/src/views/user-manager/profile/components/user-operation-modal.vue apps/web-ele/src/views/user-manager/profile/index.vue apps/web-ele/src/views/user-manager/profile/model/shared.ts apps/web-ele/src/views/user-manager/profile/model/detail.ts apps/web-ele/src/views/user-manager/tasks/index.vue apps/web-ele/src/views/user-manager/tasks/model/shared.ts apps/web-ele/src/views/user-manager/tasks/model/detail.ts apps/web-ele/src/views/user-manager/check-in/model/plan-modal.ts apps/web-ele/src/views/user-manager/check-in/model/shared.ts apps/web-ele/src/views/user-manager/check-in/index.vue apps/web-ele/src/views/user-manager/check-in/model/plan-modal.test.ts
```

验证结果：

- `vue-tsc` 通过。
- `plan-modal` 单测 `22/22` 通过。
- 本次修改涉及文件的 ESLint 通过。

补充说明：

- 运行单测时出现过一个仓库内既有 Markdown 文件的 Vite 预转换告警，但测试命令本身返回成功，不影响本次结果判断。
