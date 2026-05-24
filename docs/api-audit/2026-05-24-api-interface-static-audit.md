# 接口调用一致性静态审计报告（2026-05-24）

## 1. 审计范围与基线

本轮按用户要求执行只读静态审计：先生成报告，不修改业务代码，不手工修改生成接口。

接口规范基线为当前工作区已生成的 admin 接口产物：

- `apps/web-ele/src/api/core/**`
- `apps/web-ele/src/api/types/**`

生成脚本事实源：`pnpm -F @vben/web-ele run att`，脚本入口为 `apps/web-ele/src/utils/openapi-generator/index.ts`，Apifox 生成配置在 `apps/web-ele/src/utils/openapi-generator/config.ts`。

本轮未执行：

- 未运行 `pnpm -F @vben/web-ele run att`
- 未调用 Apifox
- 未调用后端接口
- 未抓包
- 未修改生成接口、生成类型或业务代码

当前生成类型注释中的 `@更新时间` 汇总为：`2026-05-09 22:20:06`。

审计开始时工作区已有未提交改动，本轮将其视为当前事实，不回退、不整理：

- `.trae/rules/04-model-types.md`
- `apps/web-ele/src/api/types/content.d.ts`
- `apps/web-ele/src/api/types/workflow.d.ts`

## 2. 静态统计结果

| 指标                              | 数量 |
| --------------------------------- | ---: |
| 生成 API 导出总数                 |  347 |
| 生成类型别名/接口总数             | 1022 |
| 扫描业务源文件数                  |  302 |
| 生成 API 调用点总数               |  366 |
| 有直接生成函数调用的 API          |  303 |
| 只作为符号/组件参数引用的 API     |    6 |
| 通过同路径手写/上传入口覆盖的 API |    7 |
| 生成但完全未引用的 API            |   31 |
| 手写 `requestClient` 调用点       |    5 |
| 原始 `/api/...` 路径引用          |   10 |
| 缺失的生成 API 导入               |    0 |
| 缺失的生成类型导入                |    0 |

对账公式：

```text
347 generated = 303 direct-call + 6 symbol-reference + 7 endpoint-only + 31 unreferenced
```

按模块统计：

| 模块         | 生成 | 直接调用 | 符号引用 | 同路径手写/上传 | 完全未引用 |
| ------------ | ---- | -------- | -------- | --------------- | ---------- |
| adReward     | 4    | 4        | 0        | 0               | 0          |
| agreement    | 6    | 5        | 0        | 1               | 0          |
| announcement | 6    | 6        | 0        | 0               | 0          |
| api          | 2    | 0        | 0        | 0               | 2          |
| appConfig    | 2    | 2        | 0        | 0               | 0          |
| appPage      | 6    | 5        | 0        | 0               | 1          |
| appUpdate    | 5    | 5        | 0        | 0               | 0          |
| appUsers     | 22   | 17       | 0        | 0               | 5          |
| audit        | 1    | 1        | 0        | 0               | 0          |
| auth         | 5    | 4        | 0        | 1               | 0          |
| checkIn      | 14   | 14       | 0        | 0               | 0          |
| comment      | 4    | 3        | 1        | 0               | 0          |
| content      | 96   | 84       | 0        | 3               | 9          |
| coupon       | 5    | 5        | 0        | 0               | 0          |
| dictionary   | 13   | 13       | 0        | 0               | 0          |
| forum        | 58   | 48       | 4        | 0               | 6          |
| growth       | 30   | 23       | 0        | 0               | 7          |
| membership   | 14   | 14       | 0        | 0               | 0          |
| message      | 10   | 10       | 0        | 0               | 0          |
| payment      | 6    | 6        | 0        | 0               | 0          |
| report       | 3    | 2        | 1        | 0               | 0          |
| system       | 4    | 3        | 0        | 1               | 0          |
| systemUser   | 8    | 8        | 0        | 0               | 0          |
| task         | 9    | 9        | 0        | 0               | 0          |
| upload       | 1    | 0        | 0        | 1               | 0          |
| wallet       | 4    | 4        | 0        | 0               | 0          |
| workflow     | 9    | 8        | 0        | 0               | 1          |

## 3. 已确认问题清单

### 3.1 漫画归档导入面板未适配 `WorkflowErrorFactsDto` 可空性变化

| 字段 | 内容 |
| --- | --- |
| 涉及接口/类型 | `ContentComicChapterContentArchiveDetailResponse`、`WorkflowErrorFactsDto` |
| 生成类型依据 | `apps/web-ele/src/api/types/content.d.ts:2253` 将 `lastError` 生成为 `lastError?: WorkflowErrorFactsDto`，不再是 `null \| WorkflowErrorFactsDto` |
| 业务位置 | `apps/web-ele/src/views/content-manager/comic-manager/chapter/archive-import-panel.vue:646-652` |
| 业务现状 | 确认导入后把 `taskDetail.value.lastError` 置为 `null`，随后继续读取 `taskDetail.value.jobId` |
| 验证证据 | `pnpm -F @vben/web-ele run typecheck` 报 TS2322 和 TS18047 |
| 风险 | 当前 admin 类型检查失败；若构建链路依赖 typecheck，会阻塞发布 |
| 建议后续动作 | 后续修复时用 `undefined`/省略字段替代 `null`，并在局部保存 `jobId` 或收窄 ref 后再调用 `fetchTaskDetail` |

类型检查输出：

```text
src/views/content-manager/comic-manager/chapter/archive-import-panel.vue(648,7): error TS2322: Type 'null' is not assignable to type '{ ... } | undefined'.
src/views/content-manager/comic-manager/chapter/archive-import-panel.vue(652,27): error TS18047: 'taskDetail.value' is possibly 'null'.
```

### 3.2 字典列表 hook 的请求字段与响应形态均不符合当前生成契约

| 字段 | 内容 |
| --- | --- |
| 涉及接口 | `dictionaryItemListApi` |
| 生成请求类型 | `DictionaryItemListRequest` 仅声明 `dictionaryCode: string`，见 `apps/web-ele/src/api/types/dictionary.d.ts:156-162` |
| 生成响应类型 | `DictionaryItemListResponse = BaseDictionaryItemDto`，见 `apps/web-ele/src/api/types/dictionary.d.ts:164` |
| 业务位置 | `apps/web-ele/src/hooks/useDict.ts:24-31` |
| 业务现状 | 请求额外传 `isEnabled: true`；返回值先转 `unknown`，再断言为 `BaseDictionaryItemDto[]` 并调用 `forEach` |
| 问题字段 | 请求多余字段 `isEnabled`；响应消费期望数组但生成类型为单个 DTO |
| 风险 | TypeScript 被 `unknown` 断言绕过，运行时若后端按当前契约返回单对象会直接触发断言异常；若后端真实返回数组，则 OpenAPI/生成类型本身可能落后或描述错误 |
| 建议后续动作 | 先确认后端 `/api/admin/dictionary/item/list` 真实返回；若当前生成契约正确，业务应移除 `isEnabled` 并改成单对象/其他接口；若契约错误，应修生成源后重新生成 |

### 3.3 用户运营弹窗仍向成长操作接口提交旧 `remark` 字段

| 字段 | 内容 |
| --- | --- |
| 涉及接口 | `appUsersPointsGrantApi`、`appUsersPointsConsumeApi`、`appUsersExperienceGrantApi` |
| 生成类型依据 | `AdminAppUserGrowthRuleActionDto` 使用 `operationNote?: null \| string`，见 `apps/web-ele/src/api/types/appUsers.d.ts:877-935`；`ConsumeAdminAppUserPointsDto` 使用 `operationNote?: null \| string`，见 `apps/web-ele/src/api/types/appUsers.d.ts:942-960` |
| 业务位置 | `apps/web-ele/src/views/user-manager/profile/components/user-operation-modal.vue:779-826` |
| 业务现状 | 三个提交 payload 都传旧字段 `remark`，取值来自 `values.remark?.trim()` 的结果 |
| 问题字段 | 旧字段 `remark` 已不是当前请求 DTO 字段；当前请求字段名为 `operationNote` |
| 风险 | 备注不会按最新契约提交；由于生成 DTO 含 `[property: string]: any`，typecheck 不会拦截这个多余字段 |
| 建议后续动作 | 后续修复时保留 UI 字段名也可以，但提交 payload 应显式映射为 `operationNote` |

## 4. 特殊但未判定为错误的对接

这些接口没有直接调用生成 wrapper，但同一路径已有手写调用或上传 URL，对接上需要保留特殊说明：

| 模块 | 生成接口 | 路径 | 业务引用 | 说明 |
| --- | --- | --- | --- | --- |
| agreement | `agreementAccessApi` | `/api/admin/agreement/access` | apps/web-ele/src/views/app-manager/agreement/access-preview.ts:5 | 手写 text/html 访问；生成响应为 undefined，当前不适合直接用 JSON wrapper。 |
| auth | `authTokenRefreshApi` | `/api/admin/auth/token/refresh` | apps/web-ele/src/api/request.ts:65 | 鉴权刷新特殊链路，使用 authRequestClient 避免默认鉴权拦截递归。 |
| content | `contentComicChapterContentArchivePreviewApi` | `/api/admin/content/comic/chapter-content/archive/preview` | apps/web-ele/src/enum/api.ts:13 | 上传/文件类入口，通过 upload URL 或 requestClient.upload 对接；生成 wrapper 未表达文件参数。 |
| content | `contentComicChapterContentUploadApi` | `/api/admin/content/comic/chapter-content/upload` | apps/web-ele/src/enum/api.ts:11 | 上传/文件类入口，通过 upload URL 或 requestClient.upload 对接；生成 wrapper 未表达文件参数。 |
| content | `contentNovelChapterContentUploadApi` | `/api/admin/content/novel/chapter-content/upload` | apps/web-ele/src/views/content-manager/novel-manager/chapter/content-editor.vue:94 | 上传/文件类入口，通过 upload URL 或 requestClient.upload 对接；生成 wrapper 未表达文件参数。 |
| system | `systemIp2regionUploadApi` | `/api/admin/system/ip2region/upload` | apps/web-ele/src/views/system-manager/ip-geolocation/index.vue:28 | 上传/文件类入口，通过 upload URL 或 requestClient.upload 对接；生成 wrapper 未表达文件参数。 |
| upload | `uploadFileUploadApi` | `/api/admin/upload/file/upload` | apps/web-ele/src/components/es-editor/es-editor.vue:126<br>apps/web-ele/src/enum/api.ts:10 | 上传/文件类入口，通过 upload URL 或 requestClient.upload 对接；生成 wrapper 未表达文件参数。 |

## 5. 仅符号引用的生成接口

这些接口没有 `xxxApi(...)` 直接调用，但被作为组件参数、操作配置或回调函数引用，不计入未对接：

| 模块 | 接口 | 引用文件 |
| --- | --- | --- |
| comment | `commentDetailApi` | apps/web-ele/src/views/content-governance/comments/index.vue |
| forum | `forumTopicUpdateFeaturedApi` | apps/web-ele/src/views/forum/topic/index.vue |
| forum | `forumTopicUpdateHiddenApi` | apps/web-ele/src/views/forum/topic/index.vue |
| forum | `forumTopicUpdateLockedApi` | apps/web-ele/src/views/forum/topic/index.vue |
| forum | `forumTopicUpdatePinnedApi` | apps/web-ele/src/views/forum/topic/index.vue |
| report | `reportDetailApi` | apps/web-ele/src/views/content-governance/reports/index.vue |

## 6. 生成但完全未引用接口清单

以下接口在当前生成层存在，但在 `apps/web-ele/src/**` 中没有发现生成函数名引用，也没有发现同路径手写/上传入口：

| 模块 | 接口函数 | 生成签名 | 路径 | 建议后续动作 |
| --- | --- | --- | --- | --- |
| api | `apiHealthApi` | `() => Promise<ApiHealthResponse>` | `/api/health` | 健康检查/就绪检查，通常不需要后台页面直接接入。 |
| api | `apiReadyApi` | `() => Promise<ApiReadyResponse>` | `/api/ready` | 健康检查/就绪检查，通常不需要后台页面直接接入。 |
| appPage | `appPageCodeDetailApi` | `(params: AppPageCodeDetailRequest) => Promise<AppPageCodeDetailResponse>` | `/api/admin/app-page/code/detail` | 详情能力未接入，确认列表编辑是否已满足产品需求。 |
| appUsers | `appUsersExperienceStatsApi` | `(params: AppUsersExperienceStatsRequest) => Promise<AppUsersExperienceStatsResponse>` | `/api/admin/app-users/experience/stats` | 统计能力未接入，确认是否需要卡片或详情入口。 |
| appUsers | `appUsersGrowthRecordPageApi` | `(params: AppUsersGrowthRecordPageRequest) => Promise<AppUsersGrowthRecordPageResponse>` | `/api/admin/app-users/growth/record/page` | 记录列表未接入，确认是否被用户画像/运营页替代。 |
| appUsers | `appUsersPointsStatsApi` | `(params: AppUsersPointsStatsRequest) => Promise<AppUsersPointsStatsResponse>` | `/api/admin/app-users/points/stats` | 统计能力未接入，确认是否需要卡片或详情入口。 |
| appUsers | `appUsersRebuildFollowCountAllApi` | `() => Promise<AppUsersRebuildFollowCountAllResponse>` | `/api/admin/app-users/rebuild-follow-count-all` | 后台维护/重建类能力，确认是否需要运维入口。 |
| appUsers | `appUsersRebuildFollowCountApi` | `(params: AppUsersRebuildFollowCountRequest) => Promise<AppUsersRebuildFollowCountResponse>` | `/api/admin/app-users/rebuild-follow-count` | 后台维护/重建类能力，确认是否需要运维入口。 |
| content | `contentAuthorRebuildFollowCountAllApi` | `() => Promise<ContentAuthorRebuildFollowCountAllResponse>` | `/api/admin/content/author/rebuild-follow-count-all` | 后台维护/重建类能力，确认是否需要运维入口。 |
| content | `contentAuthorRebuildFollowCountApi` | `(params: ContentAuthorRebuildFollowCountRequest) => Promise<ContentAuthorRebuildFollowCountResponse>` | `/api/admin/content/author/rebuild-follow-count` | 后台维护/重建类能力，确认是否需要运维入口。 |
| content | `contentAuthorRebuildWorkCountAllApi` | `() => Promise<ContentAuthorRebuildWorkCountAllResponse>` | `/api/admin/content/author/rebuild-work-count-all` | 后台维护/重建类能力，确认是否需要运维入口。 |
| content | `contentAuthorRebuildWorkCountApi` | `(params: ContentAuthorRebuildWorkCountRequest) => Promise<ContentAuthorRebuildWorkCountResponse>` | `/api/admin/content/author/rebuild-work-count` | 后台维护/重建类能力，确认是否需要运维入口。 |
| content | `contentComicChapterContentUpdateApi` | `(params: ContentComicChapterContentUpdateRequest) => Promise<ContentComicChapterContentUpdateResponse>` | `/api/admin/content/comic/chapter-content/update` | 确认是否为预留接口或缺少 UI 入口。 |
| content | `contentComicThirdPartyChapterListApi` | `(params: ContentComicThirdPartyChapterListRequest) => Promise<ContentComicThirdPartyChapterListResponse>` | `/api/admin/content/comic/third-party/chapter/list` | 确认是否为预留接口或缺少 UI 入口。 |
| content | `contentComicThirdPartyDetailApi` | `(params: ContentComicThirdPartyDetailRequest) => Promise<ContentComicThirdPartyDetailResponse>` | `/api/admin/content/comic/third-party/detail` | 详情能力未接入，确认列表编辑是否已满足产品需求。 |
| content | `contentComicThirdPartyImportItemPageApi` | `(params?: ContentComicThirdPartyImportItemPageRequest) => Promise<ContentComicThirdPartyImportItemPageResponse>` | `/api/admin/content/comic/third-party/import/item/page` | 确认是否为预留接口或缺少 UI 入口。 |
| content | `contentEmojiPackUpdateSceneTypeApi` | `(params: ContentEmojiPackUpdateSceneTypeRequest) => Promise<ContentEmojiPackUpdateSceneTypeResponse>` | `/api/admin/content/emoji-pack/update-scene-type` | 独立场景类型更新未接入，当前创建/更新可能已覆盖。 |
| forum | `forumModeratorActionLogPageApi` | `(params?: ForumModeratorActionLogPageRequest) => Promise<ForumModeratorActionLogPageResponse>` | `/api/admin/forum/moderator-action-log/page` | 确认是否为预留接口或缺少 UI 入口。 |
| forum | `forumModeratorsDetailApi` | `(params: ForumModeratorsDetailRequest) => Promise<ForumModeratorsDetailResponse>` | `/api/admin/forum/moderators/detail` | 详情能力未接入，确认列表编辑是否已满足产品需求。 |
| forum | `forumSearchPageApi` | `(params: ForumSearchPageRequest) => Promise<ForumSearchPageResponse>` | `/api/admin/forum/search/page` | 搜索能力未接入，确认是否需要后台搜索页。 |
| forum | `forumSectionGroupsUpdateEnabledApi` | `(params: ForumSectionGroupsUpdateEnabledRequest) => Promise<ForumSectionGroupsUpdateEnabledResponse>` | `/api/admin/forum/section-groups/update-enabled` | 独立启停操作未接入，确认是否已由创建/更新表单覆盖。 |
| forum | `forumSensitiveWordDetectHighestLevelApi` | `(params: ForumSensitiveWordDetectHighestLevelRequest) => Promise<ForumSensitiveWordDetectHighestLevelResponse>` | `/api/admin/forum/sensitive-word/detect/highest-level` | 确认是否为预留接口或缺少 UI 入口。 |
| forum | `forumSensitiveWordStatsApi` | `(params?: ForumSensitiveWordStatsRequest) => Promise<ForumSensitiveWordStatsResponse>` | `/api/admin/forum/sensitive-word/stats` | 统计能力未接入，确认是否需要卡片或详情入口。 |
| growth | `growthBadgesStatsApi` | `() => Promise<GrowthBadgesStatsResponse>` | `/api/admin/growth/badges/stats` | 统计能力未接入，确认是否需要卡片或详情入口。 |
| growth | `growthExperienceRecordDetailApi` | `(params: GrowthExperienceRecordDetailRequest) => Promise<GrowthExperienceRecordDetailResponse>` | `/api/admin/growth/experience/record/detail` | 详情能力未接入，确认列表编辑是否已满足产品需求。 |
| growth | `growthExperienceRecordPageApi` | `(params: GrowthExperienceRecordPageRequest) => Promise<GrowthExperienceRecordPageResponse>` | `/api/admin/growth/experience/record/page` | 记录列表未接入，确认是否被用户画像/运营页替代。 |
| growth | `growthExperienceStatsApi` | `(params: GrowthExperienceStatsRequest) => Promise<GrowthExperienceStatsResponse>` | `/api/admin/growth/experience/stats` | 统计能力未接入，确认是否需要卡片或详情入口。 |
| growth | `growthLevelRulesPermissionCheckApi` | `(params: GrowthLevelRulesPermissionCheckRequest) => Promise<GrowthLevelRulesPermissionCheckResponse>` | `/api/admin/growth/level-rules/permission/check` | 确认是否为预留接口或缺少 UI 入口。 |
| growth | `growthLevelRulesStatsApi` | `() => Promise<GrowthLevelRulesStatsResponse>` | `/api/admin/growth/level-rules/stats` | 统计能力未接入，确认是否需要卡片或详情入口。 |
| growth | `growthLevelRulesUserDetailApi` | `(params: GrowthLevelRulesUserDetailRequest) => Promise<GrowthLevelRulesUserDetailResponse>` | `/api/admin/growth/level-rules/user/detail` | 详情能力未接入，确认列表编辑是否已满足产品需求。 |
| workflow | `workflowRecordPageApi` | `(params: WorkflowRecordPageRequest) => Promise<WorkflowRecordPageResponse>` | `/api/admin/workflow/record/page` | 记录列表未接入，确认是否被用户画像/运营页替代。 |

## 7. 字段级审计数据

本轮已生成字段级机器清单：`.omx/tmp/admin-api-audit-2026-05-24.json`。

该清单包含：

- `apiTypeInfo`：每个生成 API 的请求类型、响应类型、请求字段、响应字段、必填/可选字段。
- `typeFields`：1022 个生成类型别名/接口的字段明细。
- `calls`：366 个生成 API 调用点、调用文件、行号、实参顶层字段。
- `directRequests` 与 `rawEndpointRefs`：手写请求和原始 `/api/...` 路径引用。
- `requestIssues`：机器初筛字段疑点；其中本报告第 3 节列出的是人工复核后的确认项。

注意：`.omx/` 被仓库忽略，该 JSON 是本轮本地审计证据，不属于业务代码改动。

## 8. 静态限制与剩余风险

- 本报告只基于当前生成产物和前端源码，不证明后端运行时实际返回完全符合 OpenAPI。
- 生成 DTO 仍大量包含 `[property: string]: any`，多余字段不会被 TypeScript 自动拦截；本轮通过 AST 对对象字面量做了额外比对。
- 对象展开、跨文件 payload builder、复杂条件分支仍需要人工复核；本报告只把人工确认的字段错配列为问题。
- 上传类接口目前生成 wrapper 无法表达文件参数，业务侧继续使用 `requestClient.upload` 或 URL 常量，这类需要团队统一口径。

## 9. 本轮执行命令摘要

```powershell
rg "^export async function" apps/web-ele/src/api/core -g '*.ts'
pnpm -F @vben/web-ele run typecheck
rg -n "WorkflowErrorFactsDto|lastError\?|lastRetry\?|warning\?|error\?" apps/web-ele/src/api/types/content.d.ts apps/web-ele/src/api/types/workflow.d.ts
rg -n "operationNote|remark" apps/web-ele/src/api/types apps/web-ele/src/views/user-manager/profile/components/user-operation-modal.vue
```
