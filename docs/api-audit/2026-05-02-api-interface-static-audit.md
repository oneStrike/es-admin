# 接口调用一致性静态审计报告（2026-05-02）

## 1. 审计范围与基线

本轮按上一轮审计规范重新全量执行，只读静态审计，不修代码。

用户已确认最新接口信息已经生成，因此本轮官方接口规范基线为当前生成产物：

- `apps/web-ele/src/api/core/**`
- `apps/web-ele/src/api/types/**`

业务扫描范围：

- `apps/web-ele/src/**/*.ts`
- `apps/web-ele/src/**/*.tsx`
- `apps/web-ele/src/**/*.vue`

排除范围：

- `apps/web-ele/src/api/core/**`
- `apps/web-ele/src/api/types/**`

本轮未执行：

- 未运行 `pnpm -F @vben/web-ele run att`
- 未调用 Apifox
- 未调用后端接口
- 未抓包
- 未修改生成接口代码、生成类型或业务代码

审计开始前工作区已存在未提交改动，包括最新生成的 `apps/web-ele/src/api/**` 文件以及少量业务文件；本轮审计将这些改动视作当前事实，不回退、不整理。

## 2. 响应格式基准

生成 API 方法通过 `requestClient` 返回解包后的业务数据，而不是原始 `{ code, data, message }` 响应包。

依据：

- `apps/web-ele/src/api/request.ts:80` 定义 `normalizeResponseData`
- `apps/web-ele/src/api/request.ts:91` 调用 `unwrapApiResponse(responseData, status)`
- `apps/web-ele/src/api/request.ts:142-144` 将默认 `requestClient` 配置为 `responseReturn: 'data'`
- `apps/web-ele/src/api/error.ts:167` 定义 `unwrapApiResponse`
- `apps/web-ele/src/api/error.ts:172-173` 成功时返回 `payload.data`

因此本轮按“业务代码消费解包后的生成类型”判断响应字段。

## 3. 静态统计结果

| 指标                                         | 数量 |
| -------------------------------------------- | ---: |
| 生成 API 导出总数                            |  294 |
| `apps/web-ele/src/**` 中有静态引用的生成 API |  257 |
| 其中直接函数调用                             |  251 |
| 仅作为组件/回调参数引用                      |    6 |
| 生成但未对接 API                             |   37 |
| 扫描业务源文件数                             |  247 |

对账公式：

```text
294 generated = 257 referenced + 37 generated-but-unwired
```

仅作为组件/回调参数引用但没有 `xxxApi(...)` 直接调用的接口为：

- `commentDetailApi`：传给详情组件 `:api`
- `reportDetailApi`：传给详情组件 `:api`
- `forumTopicUpdatePinnedApi`
- `forumTopicUpdateFeaturedApi`
- `forumTopicUpdateLockedApi`
- `forumTopicUpdateHiddenApi`

这些属于功能性引用，不计入未对接。

按模块统计：

| 模块         | 生成 | 已引用 | 直接调用 | 未对接 |
| ------------ | ---: | -----: | -------: | -----: |
| agreement    |    5 |      5 |        5 |      0 |
| announcement |    6 |      6 |        6 |      0 |
| api          |    2 |      2 |        2 |      0 |
| appConfig    |    2 |      2 |        2 |      0 |
| appPage      |    6 |      5 |        5 |      1 |
| appUpdate    |    5 |      5 |        5 |      0 |
| appUsers     |   22 |     19 |       19 |      3 |
| audit        |    1 |      1 |        1 |      0 |
| auth         |    5 |      4 |        4 |      1 |
| checkIn      |   14 |      9 |        9 |      5 |
| comment      |    4 |      4 |        3 |      0 |
| content      |   87 |     78 |       78 |      9 |
| dictionary   |   13 |     13 |       13 |      0 |
| forum        |   57 |     52 |       48 |      5 |
| growth       |   30 |     19 |       19 |     11 |
| message      |   10 |     10 |       10 |      0 |
| report       |    3 |      3 |        2 |      0 |
| system       |    4 |      3 |        3 |      1 |
| systemUser   |    8 |      8 |        8 |      0 |
| task         |    9 |      9 |        9 |      0 |
| upload       |    1 |      0 |        0 |      1 |

## 4. 已确认问题清单

本轮未发现新的可确认接口错配。

支撑证据：

- `pnpm -F @vben/web-ele run typecheck` 通过。
- `pnpm -C apps/web-ele exec vitest run src/views/user-manager/check-in/model/plan-modal.test.ts` 通过。
- 上轮主要问题已不再出现：
  - 旧 `forumTags*` / `ForumTags*` / `BaseForumTagDto` API 和类型未在业务调用中继续出现；仅保留路由名 `ForumTags`。
  - 论坛话题创建/更新已按当前契约提交 `html` 字段，见 `apps/web-ele/src/views/forum/topic/index.vue:202-220`。
  - 论坛话题标签页已迁移到 `forumHashtags*` 与 `BaseForumHashtagDto`，见 `apps/web-ele/src/views/forum/tags/index.vue:146-208`。
  - 论坛板块 create/update payload 已拆分为显式 builder，见 `apps/web-ele/src/views/forum/sections/index.vue:248-280`。
  - 评论、消息、举报模块已经有业务引用，不再整模块未接入。
  - 敏感词检测、替换、状态、数量接口已接入检测抽屉，见 `apps/web-ele/src/views/forum/sensitive-word/components/sensitive-word-detect-drawer.vue:143-184`。
  - 签到配置/连续签到接口已按当前类型对齐，并有模型测试覆盖。

## 5. 静态不确定项 / 后续确认项

### 5.1 生成 DTO 仍普遍包含索引签名

多个生成类型仍包含：

```ts
[property: string]: any
```

影响：

- TypeScript 不能严格拦截多余字段。
- 对象展开、表单原值透传、宽泛类型断言可能携带后端未声明字段。

本轮没有发现因此导致的可确认错配，但这仍降低“多余字段”静态证明能力。

### 5.2 部分业务 payload 仍依赖宽泛断言或表单原值展开

代表位置：

| 位置 | 涉及接口 | 静态风险 |
| --- | --- | --- |
| `apps/web-ele/src/views/system-manager/system-config/index.vue:192-341` | `systemUpdateApi` | `submitData as any` 绕过最终请求类型校验，嵌套配置项只能依据当前构造逻辑人工判断。 |
| `apps/web-ele/src/views/content-manager/comic-manager/core/index.vue:174-200` | `contentComicCreateApi` / `contentComicUpdateApi` | 从表单值展开后再转 union request，可能携带额外字段；当前已显式补齐关键默认值。 |
| `apps/web-ele/src/views/content-manager/novel-manager/core/index.vue:172-202` | `contentNovelCreateApi` / `contentNovelUpdateApi` | 与漫画主表类似，依赖表单 schema 与生成 DTO 同步。 |
| `apps/web-ele/src/views/app-manager/app-update/index.vue:77-84` | `appUpdateCreateApi` / `appUpdateUpdateApi` | 由 `buildAppUpdateSubmitPayload` 归一化后再断言，类型检查通过但多余字段仍受索引签名影响。 |

建议后续若要进一步提高确定性，可把这些 payload builder 改成 `satisfies XxxRequest` 返回，或减少生成器里的宽泛索引签名。

### 5.3 上传类生成 wrapper 未直接表达 multipart 文件参数

以下生成接口函数未被直接调用，但对应功能并不一定缺失：

- `systemIp2regionUploadApi`
- `uploadFileUploadApi`
- `contentComicChapterContentUploadApi`
- `contentComicChapterContentArchivePreviewApi`
- `contentNovelChapterContentUploadApi`

当前业务里相关上传通过 `requestClient.upload` 或 `EsUpload` 的 `upload-url` 完成，例如：

- `apps/web-ele/src/views/system-manager/ip-geolocation/index.vue:83-84`
- `apps/web-ele/src/hooks/useUpload.ts:22-24`
- `apps/web-ele/src/enum/api.ts:9-13`
- `apps/web-ele/src/views/content-manager/comic-manager/chapter/archive-import-panel.vue:339-340`

建议后续确认生成器是否需要为 `multipart/form-data` 生成带文件参数的专用 wrapper；否则这些生成函数会长期表现为“未直接引用”。

## 6. 生成但未对接接口清单

以下 API 在当前生成代码中存在，但在 `apps/web-ele/src/**` 业务源文件中没有发现生成函数名的功能性引用。

| 模块 | 接口函数 | 接口文件 | 生成签名 | 引用状态 | 推断分类 | 建议后续动作 |
| --- | --- | --- | --- | --- | --- | --- |
| appPage | `appPageCodeDetailApi` | `apps/web-ele/src/api/core/appPage.ts` | `(params: AppPageCodeDetailRequest) => Promise<AppPageCodeDetailResponse>` | 无引用 | 未接入详情能力 | 确认页面管理是否需要按 code 查询详情。 |
| appUsers | `appUsersRebuildFollowCountApi` | `apps/web-ele/src/api/core/appUsers.ts` | `(params: AppUsersRebuildFollowCountRequest) => Promise<AppUsersRebuildFollowCountResponse>` | 无引用 | 后台维护能力预留 | 确认用户管理是否需要单用户重建关注数入口。 |
| appUsers | `appUsersRebuildFollowCountAllApi` | `apps/web-ele/src/api/core/appUsers.ts` | `() => Promise<AppUsersRebuildFollowCountAllResponse>` | 无引用 | 后台维护能力预留 | 确认是否需要批量重建入口。 |
| appUsers | `appUsersGrowthRecordPageApi` | `apps/web-ele/src/api/core/appUsers.ts` | `(params: AppUsersGrowthRecordPageRequest) => Promise<AppUsersGrowthRecordPageResponse>` | 无引用 | 未接入功能 | 用户画像已接积分/经验/徽章记录，确认是否还需要综合成长记录 tab。 |
| auth | `authTokenRefreshApi` | `apps/web-ele/src/api/core/auth.ts` | `(params: AuthTokenRefreshRequest) => Promise<AuthTokenRefreshResponse>` | 无生成 API 引用 | 基础能力/手写特殊路径 | 当前 `apps/web-ele/src/api/request.ts:64-65` 使用 `authRequestClient.post('/api/admin/auth/token/refresh')`，疑似为避免鉴权拦截递归；建议保留特殊路径或单独评估封装。 |
| checkIn | `checkInCalendarDetailApi` | `apps/web-ele/src/api/core/checkIn.ts` | `(params: CheckInCalendarDetailRequest) => Promise<CheckInCalendarDetailResponse>` | 无引用 | 未接入详情能力 | 确认签到日历详情是否需要后台页面。 |
| checkIn | `checkInCalendarUserDetailApi` | `apps/web-ele/src/api/core/checkIn.ts` | `(params: CheckInCalendarUserDetailRequest) => Promise<CheckInCalendarUserDetailResponse>` | 无引用 | 未接入详情能力 | 确认是否需要用户签到日历详情。 |
| checkIn | `checkInCalendarSignedUserPageApi` | `apps/web-ele/src/api/core/checkIn.ts` | `(params: CheckInCalendarSignedUserPageRequest) => Promise<CheckInCalendarSignedUserPageResponse>` | 无引用 | 未接入列表能力 | 确认是否需要已签到用户列表。 |
| checkIn | `checkInStreakDetailApi` | `apps/web-ele/src/api/core/checkIn.ts` | `(params: CheckInStreakDetailRequest) => Promise<CheckInStreakDetailResponse>` | 无引用 | 未接入详情能力 | 当前连续签到面板用列表数据编辑，确认是否需要详情回填。 |
| checkIn | `checkInStreakHistoryDetailApi` | `apps/web-ele/src/api/core/checkIn.ts` | `(params: CheckInStreakHistoryDetailRequest) => Promise<CheckInStreakHistoryDetailResponse>` | 无引用 | 未接入详情能力 | 当前只接历史列表，确认是否需要版本详情抽屉。 |
| content | `contentComicChapterContentUploadApi` | `apps/web-ele/src/api/core/content.ts` | `(params: ContentComicChapterContentUploadRequest) => Promise<ContentComicChapterContentUploadResponse>` | 无生成函数引用 | 上传 wrapper 被通用上传替代 | 当前 `UploadUrlMapEnum.COMIC` 指向同一路径；确认是否需要改用生成 wrapper 或修生成器 multipart 支持。 |
| content | `contentComicChapterContentUpdateApi` | `apps/web-ele/src/api/core/content.ts` | `(params: ContentComicChapterContentUpdateRequest) => Promise<ContentComicChapterContentUpdateResponse>` | 无引用 | 未接入编辑能力 | 确认漫画章节图片元数据是否需要编辑入口。 |
| content | `contentComicChapterContentArchivePreviewApi` | `apps/web-ele/src/api/core/content.ts` | `(params: ContentComicChapterContentArchivePreviewRequest) => Promise<ContentComicChapterContentArchivePreviewResponse>` | 无生成函数引用 | 上传 wrapper 被手写上传替代 | 归档预览使用 `requestClient.upload` 同一路径；确认是否需要生成器支持文件参数。 |
| content | `contentNovelChapterContentUploadApi` | `apps/web-ele/src/api/core/content.ts` | `(params: ContentNovelChapterContentUploadRequest) => Promise<ContentNovelChapterContentUploadResponse>` | 无生成函数引用 | 上传 wrapper 被通用上传替代 | 小说章节编辑器使用上传 URL，确认是否需要生成 wrapper。 |
| content | `contentAuthorRebuildFollowCountApi` | `apps/web-ele/src/api/core/content.ts` | `(params: ContentAuthorRebuildFollowCountRequest) => Promise<ContentAuthorRebuildFollowCountResponse>` | 无引用 | 后台维护能力预留 | 确认作者关注数重建入口。 |
| content | `contentAuthorRebuildFollowCountAllApi` | `apps/web-ele/src/api/core/content.ts` | `() => Promise<ContentAuthorRebuildFollowCountAllResponse>` | 无引用 | 后台维护能力预留 | 确认作者关注数批量重建入口。 |
| content | `contentAuthorRebuildWorkCountApi` | `apps/web-ele/src/api/core/content.ts` | `(params: ContentAuthorRebuildWorkCountRequest) => Promise<ContentAuthorRebuildWorkCountResponse>` | 无引用 | 后台维护能力预留 | 确认作者作品数重建入口。 |
| content | `contentAuthorRebuildWorkCountAllApi` | `apps/web-ele/src/api/core/content.ts` | `() => Promise<ContentAuthorRebuildWorkCountAllResponse>` | 无引用 | 后台维护能力预留 | 确认作者作品数批量重建入口。 |
| content | `contentEmojiPackUpdateSceneTypeApi` | `apps/web-ele/src/api/core/content.ts` | `(params: ContentEmojiPackUpdateSceneTypeRequest) => Promise<ContentEmojiPackUpdateSceneTypeResponse>` | 无引用 | 未接入独立操作 | 表情包创建/更新已处理场景类型，确认是否仍需要单独更新场景类型操作。 |
| forum | `forumModeratorsDetailApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumModeratorsDetailRequest) => Promise<ForumModeratorsDetailResponse>` | 无引用 | 未接入详情能力 | 版主管理当前主要使用列表和编辑数据，确认是否需要详情回填。 |
| forum | `forumSearchPageApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumSearchPageRequest) => Promise<ForumSearchPageResponse>` | 无引用 | 未接入功能 | 确认是否需要论坛全局搜索后台页。 |
| forum | `forumSensitiveWordStatsApi` | `apps/web-ele/src/api/core/forum.ts` | `(params?: ForumSensitiveWordStatsRequest) => Promise<ForumSensitiveWordStatsResponse>` | 无引用 | 统计变体/可能被 full stats 替代 | 当前使用 `forumSensitiveWordStatsFullApi`，确认普通 stats 是否保留。 |
| forum | `forumSensitiveWordDetectHighestLevelApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumSensitiveWordDetectHighestLevelRequest) => Promise<ForumSensitiveWordDetectHighestLevelResponse>` | 无引用 | 检测变体/可能被 detect 替代 | 当前检测接口返回 `highestLevel`，确认是否还需要单独最高等级检测接口。 |
| forum | `forumSectionGroupsUpdateEnabledApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumSectionGroupsUpdateEnabledRequest) => Promise<ForumSectionGroupsUpdateEnabledResponse>` | 无引用 | 未接入独立操作 | 分组创建/更新含状态，确认是否需要单独启停入口。 |
| growth | `growthExperienceRecordPageApi` | `apps/web-ele/src/api/core/growth.ts` | `(params: GrowthExperienceRecordPageRequest) => Promise<GrowthExperienceRecordPageResponse>` | 无引用 | 未接入功能/可能由用户画像替代 | 确认是否需要独立成长经验记录页。 |
| growth | `growthExperienceRecordDetailApi` | `apps/web-ele/src/api/core/growth.ts` | `(params: GrowthExperienceRecordDetailRequest) => Promise<GrowthExperienceRecordDetailResponse>` | 无引用 | 未接入详情能力 | 同上。 |
| growth | `growthExperienceStatsApi` | `apps/web-ele/src/api/core/growth.ts` | `(params: GrowthExperienceStatsRequest) => Promise<GrowthExperienceStatsResponse>` | 无引用 | 未接入统计能力 | 确认是否需要成长经验统计。 |
| growth | `growthLevelRulesUserDetailApi` | `apps/web-ele/src/api/core/growth.ts` | `(params: GrowthLevelRulesUserDetailRequest) => Promise<GrowthLevelRulesUserDetailResponse>` | 无引用 | 未接入详情能力 | 确认是否需要用户等级详情入口。 |
| growth | `growthLevelRulesPermissionCheckApi` | `apps/web-ele/src/api/core/growth.ts` | `(params: GrowthLevelRulesPermissionCheckRequest) => Promise<GrowthLevelRulesPermissionCheckResponse>` | 无引用 | 未接入工具能力 | 确认是否需要权限检查工具。 |
| growth | `growthLevelRulesStatsApi` | `apps/web-ele/src/api/core/growth.ts` | `() => Promise<GrowthLevelRulesStatsResponse>` | 无引用 | 未接入统计能力 | 等级规则统计未接入。 |
| growth | `growthBadgesStatsApi` | `apps/web-ele/src/api/core/growth.ts` | `() => Promise<GrowthBadgesStatsResponse>` | 无引用 | 未接入统计能力 | 徽章统计未接入。 |
| growth | `growthRuleEventsPageApi` | `apps/web-ele/src/api/core/growth.ts` | `(params?: GrowthRuleEventsPageRequest) => Promise<GrowthRuleEventsPageResponse>` | 无引用 | 未接入配置能力 | 成长事件列表未接入。 |
| growth | `growthRewardSettlementPageApi` | `apps/web-ele/src/api/core/growth.ts` | `(params?: GrowthRewardSettlementPageRequest) => Promise<GrowthRewardSettlementPageResponse>` | 无引用 | 未接入结算对账 | 成长奖励结算页未接入。 |
| growth | `growthRewardSettlementRetryApi` | `apps/web-ele/src/api/core/growth.ts` | `(params: GrowthRewardSettlementRetryRequest) => Promise<GrowthRewardSettlementRetryResponse>` | 无引用 | 未接入重试能力 | 成长奖励结算单条重试未接入。 |
| growth | `growthRewardSettlementRetryPendingBatchApi` | `apps/web-ele/src/api/core/growth.ts` | `(params?: GrowthRewardSettlementRetryPendingBatchRequest) => Promise<GrowthRewardSettlementRetryPendingBatchResponse>` | 无引用 | 未接入批量重试能力 | 成长奖励待处理批量重试未接入。 |
| system | `systemIp2regionUploadApi` | `apps/web-ele/src/api/core/system.ts` | `() => Promise<SystemIp2regionUploadResponse>` | 无生成函数引用 | 上传 wrapper 被手写上传替代 | 当前页面用 `requestClient.upload<SystemIp2regionUploadResponse>` 同一路径，确认是否需要生成器支持文件参数。 |
| upload | `uploadFileUploadApi` | `apps/web-ele/src/api/core/upload.ts` | `() => Promise<UploadFileUploadResponse>` | 无生成函数引用 | 通用上传封装替代 | 当前 `useUpload` 使用 `requestClient.upload` 与动态 URL；确认是否保留生成 wrapper。 |

## 7. 静态排查方法与命令摘要

已执行：

```powershell
pnpm -F @vben/web-ele run typecheck
pnpm -C apps/web-ele exec vitest run src/views/user-manager/check-in/model/plan-modal.test.ts
rg -n "forumTags|ForumTags|BaseForumTagDto|ForumTagsTopic|AssignTopic|UnassignTopic" apps/web-ele/src --glob "!api/core/**" --glob "!api/types/**"
rg -n "as any|Record<string, any>|as unknown|as [A-Za-z0-9]+Request|as [A-Za-z0-9]+Dto|@ts-expect-error|@ts-ignore" apps/web-ele/src --glob "!api/core/**" --glob "!api/types/**"
rg -n "\[property: string\]: any" apps/web-ele/src/api/types
```

另使用内联 Node 脚本只读解析：

- `apps/web-ele/src/api/core/**/*.ts` 中的 `export async function *Api`
- `apps/web-ele/src/**/*.{ts,tsx,vue}` 中的函数名引用与直接调用
- 生成/引用/未对接矩阵

该脚本未写入仓库文件。

## 8. 验证记录

### 8.1 类型检查

执行：

```powershell
pnpm -F @vben/web-ele run typecheck
```

结果：通过。

### 8.2 现有单元测试

执行：

```powershell
pnpm -C apps/web-ele exec vitest run src/views/user-manager/check-in/model/plan-modal.test.ts
```

结果：通过，`1` 个测试文件，`17` 条测试全部通过。

## 9. 剩余风险

- 本报告是静态审计，不能证明后端运行时实际返回值完全符合 OpenAPI。
- 生成类型中存在大量 `[property: string]: any`，多余字段无法完全由 TypeScript 拦截。
- 部分业务表单提交仍通过 `Record<string, any>`、对象展开或类型断言组装 payload，当前未发现可确认错配，但静态确定性弱于显式 `satisfies`。
- 上传类生成函数没有表达文件参数，导致业务侧使用 `requestClient.upload` 或通用上传组件而不是生成 wrapper；这类接口是否应计为“功能已接但 wrapper 未用”需要团队统一口径。
- 未对接接口的“推断分类”基于静态引用与页面语义，是否属于产品缺口仍需产品/后端确认。

## 10. 后续建议

1. 对 37 个未对接接口按产品优先级确认：优先看成长结算、签到日历详情、论坛搜索、后台维护类重建操作。
2. 单独处理 multipart 生成策略，避免上传接口长期生成“无参数 wrapper”。
3. 若要提升审计精度，优先减少生成 DTO 的索引签名，或在业务层把高风险 payload builder 改为显式 `satisfies XxxRequest`。
