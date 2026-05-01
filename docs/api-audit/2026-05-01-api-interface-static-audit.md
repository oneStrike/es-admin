# 接口调用一致性静态审计报告（2026-05-01）

## 1. 审计范围与基线

本次审计基于 `$deep-interview` 与 `$ralplan` 产物执行：

- `.omx/specs/deep-interview-api-interface-audit.md`
- `.omx/plans/prd-api-interface-static-audit.md`
- `.omx/plans/test-spec-api-interface-static-audit.md`

审计性质：

- 只读静态审计。
- 只输出问题清单与生成但未对接接口清单。
- 不修业务代码。
- 不修改生成接口代码。
- 不重新生成接口。
- 不后端联调。
- 不抓包。
- 不使用子代理。

用户已确认当前项目里的生成接口信息就是最新官方接口信息，因此本次以以下生成产物为接口规范基线：

- `apps/web-ele/src/api/core/**`
- `apps/web-ele/src/api/types/**`

业务扫描范围：

- `apps/web-ele/src/**/*.ts`
- `apps/web-ele/src/**/*.tsx`
- `apps/web-ele/src/**/*.vue`

排除范围：

- `apps/web-ele/src/api/core/**`
- `apps/web-ele/src/api/types/**`

## 2. 静态统计结果

| 指标                                         | 数量 |
| -------------------------------------------- | ---: |
| 生成 API 导出总数                            |  294 |
| `apps/web-ele/src/**` 中有静态引用的生成 API |  225 |
| 生成但未对接 API                             |   69 |
| 扫描业务源文件数                             |  230 |

对账公式：

```text
294 generated = 225 used/referenced + 69 generated-but-unwired
```

按模块统计：

| 模块         | 生成 | 已引用 | 未对接 |
| ------------ | ---: | -----: | -----: |
| agreement    |    5 |      5 |      0 |
| announcement |    6 |      6 |      0 |
| api          |    2 |      2 |      0 |
| appConfig    |    2 |      2 |      0 |
| appPage      |    6 |      5 |      1 |
| appUpdate    |    5 |      5 |      0 |
| appUsers     |   22 |     19 |      3 |
| audit        |    1 |      1 |      0 |
| auth         |    5 |      4 |      1 |
| checkIn      |   14 |      9 |      5 |
| comment      |    4 |      0 |      4 |
| content      |   87 |     78 |      9 |
| dictionary   |   13 |     13 |      0 |
| forum        |   57 |     37 |     20 |
| growth       |   30 |     19 |     11 |
| message      |   10 |      0 |     10 |
| report       |    3 |      0 |      3 |
| system       |    4 |      3 |      1 |
| systemUser   |    8 |      8 |      0 |
| task         |    9 |      9 |      0 |
| upload       |    1 |      0 |      1 |

## 3. 响应格式说明

生成 API 方法通过 `requestClient` 返回解包后的业务数据，而不是原始 `{ code, data, message }` 响应包。

依据：

- `apps/web-ele/src/api/request.ts:80` 定义 `normalizeResponseData`。
- `apps/web-ele/src/api/request.ts:91` 调用 `unwrapApiResponse(responseData, status)`。
- `apps/web-ele/src/api/request.ts:143` 将默认 `requestClient` 配置为 `responseReturn: 'data'`。
- `apps/web-ele/src/api/error.ts:167` 定义 `unwrapApiResponse`。
- `apps/web-ele/src/api/error.ts:172-173` 成功时返回 `payload.data`。

因此本次审计以“业务代码消费解包后的生成类型”为判断基准。

## 4. 已确认问题清单

### 4.1 论坛话题标签页仍调用已不存在的 `forumTags*` 接口

| 字段 | 内容 |
| --- | --- |
| 接口函数名 | `forumTagsPageApi`、`forumTagsDetailApi`、`forumTagsCreateApi`、`forumTagsUpdateApi`、`forumTagsDeleteApi` |
| 接口文件 | 旧函数已不在 `apps/web-ele/src/api/core/forum.ts` / `apps/web-ele/src/api/core/index.ts` 中导出 |
| 业务调用文件/行号 | `apps/web-ele/src/views/forum/tags/index.vue:13-17`、`:36`、`:68`、`:85-86`、`:92`、`:100`、`:166` |
| 问题类型 | 接口函数名称不存在 / 接口域已重命名或替换 |
| 生成依据 | 当前生成接口提供的是 `forumHashtagsPageApi`、`forumHashtagsDetailApi`、`forumHashtagsCreateApi`、`forumHashtagsUpdateApi`、`forumHashtagsUpdateHiddenApi`、`forumHashtagsUpdateAuditStatusApi`，见 `apps/web-ele/src/api/core/forum.ts:527-569` 与 `apps/web-ele/src/api/core/index.ts:224-229` |
| 实际业务侧用法 | 页面仍按旧 `forumTags*` API 做列表、详情、新增、更新、删除、启用状态切换 |
| 风险说明 | `vue-tsc` 已报 `#/api/core` 无对应导出；论坛标签页无法通过类型检查，运行时构建也会因导入不存在而失败 |
| 建议后续处理 | 后续修复任务中确认“标签”是否已迁移为“话题/Hashtag”；若是，页面应整体迁移到 `forumHashtags*` 契约，并重新对齐字段和操作能力；若不是，应由后端补回对应接口定义后重新生成 |

### 4.2 论坛标签页面和模型引用已不存在的 `ForumTags*` / `BaseForumTagDto` 类型

| 字段 | 内容 |
| --- | --- |
| 接口函数名 | `forumHashtagsPageApi` 等新生成接口未被该页面使用；旧 `ForumTags*` 类型不存在 |
| 接口文件 | `apps/web-ele/src/api/types/forum.d.ts` |
| 业务调用文件/行号 | `apps/web-ele/src/views/forum/tags/index.vue:4-6`、`:31`、`:65-66`、`:82`、`:91`、`:97`；`apps/web-ele/src/views/forum/tags/model/shared.ts:1`、`:73`；`apps/web-ele/src/views/forum/tags/model/detail.ts:1`、`:5` |
| 问题类型 | 返回字段/请求字段类型名称不存在；页面字段仍按旧标签 DTO 使用 |
| 生成依据 | 当前生成类型提供 `BaseForumHashtagDto`，见 `apps/web-ele/src/api/types/forum.d.ts:2271-2315`；请求类型为 `ForumHashtagsPageRequest` / `ForumHashtagsCreateRequest` / `ForumHashtagsUpdateRequest`，见 `apps/web-ele/src/api/types/forum.d.ts:799`、`:865`、`:874` |
| 实际业务侧用法 | 页面仍使用 `BaseForumTagDto`、`ForumTagsCreateRequest`、`ForumTagsUpdateRequest`、`ForumTagsDetailResponse` |
| 风险说明 | `vue-tsc` 已报这些类型均无导出；页面的字段语义也与新 DTO 不一致 |
| 建议后续处理 | 后续修复时将旧 `Tag` 类型替换为当前 `Hashtag` 类型，并重新设计字段映射 |

### 4.3 论坛标签表单字段与当前 `Hashtag` 契约不一致

| 字段 | 内容 |
| --- | --- |
| 接口函数名 | `forumHashtagsCreateApi`、`forumHashtagsUpdateApi` |
| 接口文件 | `apps/web-ele/src/api/core/forum.ts:543`、`:551` |
| 业务调用文件/行号 | `apps/web-ele/src/views/forum/tags/model/shared.ts:12-70`、`:91-97`、`:111-117` |
| 问题类型 | 请求字段名称 / 返回字段展示字段不一致 |
| 生成依据 | `CreateForumHashtagDto` 要求 `displayName`，可选 `description`、`manualBoost`，见 `apps/web-ele/src/api/types/forum.d.ts:2322-2332`；`BaseForumHashtagDto` 返回 `displayName`、`followerCount`、`topicRefCount`、`commentRefCount`、`isHidden`、`manualBoost`、`auditStatus`，见 `apps/web-ele/src/api/types/forum.d.ts:2271-2315` |
| 实际业务侧用法 | 表单字段仍为 `name`、`icon`、`sortOrder`、`isEnabled`、`description`；表格列仍读取 `useCount`、`isEnabled` |
| 风险说明 | 即使把 API 名改成 `forumHashtags*`，当前 payload 仍缺少必填 `displayName`，并包含当前契约未声明的旧字段 |
| 建议后续处理 | 后续修复时重新梳理论坛“标签/话题”页面的产品语义；最小适配应至少把名称字段改为 `displayName`，把启用状态改为隐藏/审核相关字段，移除旧 `icon/sortOrder/isEnabled/useCount` 假设 |

### 4.4 论坛主题页的话题标签关联仍依赖已不存在的 `forumTags*` 关联接口

| 字段 | 内容 |
| --- | --- |
| 接口函数名 | `forumTagsTopicTagListApi`、`forumTagsAssignTopicApi`、`forumTagsUnassignTopicApi`、`forumTagsPageApi` |
| 接口文件 | 当前生成 `apps/web-ele/src/api/core/forum.ts` 中无这些函数 |
| 业务调用文件/行号 | `apps/web-ele/src/views/forum/topic/index.vue:16-19`、`:163`、`:168`、`:267`、`:270` |
| 问题类型 | 接口函数名称不存在 / 关联功能契约缺失 |
| 生成依据 | 当前生成文件只有 `forumHashtags*` CRUD / 审核 / 隐藏接口，见 `apps/web-ele/src/api/core/forum.ts:527-569`；未生成 topic-tag list/assign/unassign 接口 |
| 实际业务侧用法 | 主题页仍打开标签弹窗，读取已选标签，再调用 assign/unassign 接口维护主题标签 |
| 风险说明 | `vue-tsc` 已报这些 API 无导出；该弹窗和主题标签分配流程不可用 |
| 建议后续处理 | 后续需确认当前后端是否取消后台手动维护主题标签；若保留，应补充接口定义；若改为 hashtag 自动解析，应移除或重做该弹窗 |

### 4.5 论坛主题创建/更新 payload 缺少当前必填 `html` 字段

| 字段 | 内容 |
| --- | --- |
| 接口函数名 | `forumTopicCreateApi`、`forumTopicUpdateApi` |
| 接口文件 | `apps/web-ele/src/api/core/forum.ts:319`、`:327` |
| 业务调用文件/行号 | `apps/web-ele/src/views/forum/topic/index.vue:202-208`、`:217-222`、`:226`、`:232` |
| 问题类型 | 请求字段缺失 / 字段名称沿用旧契约 |
| 生成依据 | `CreateForumTopicDto` 必填 `html`，见 `apps/web-ele/src/api/types/forum.d.ts:1787-1791`；`UpdateForumTopicDto` 必填 `html`，见 `apps/web-ele/src/api/types/forum.d.ts:1810-1814` |
| 实际业务侧用法 | 创建和更新都传 `content: values.content.trim()`，没有传 `html` |
| 风险说明 | `vue-tsc` 已报 `html` 缺失；提交主题时请求结构不符合当前生成契约 |
| 建议后续处理 | 后续修复时把编辑器内容转换为 `html` 字段；如果仍需要纯文本字段，应由后端接口定义明确新增，而不是前端继续传 `content` |

## 5. 静态不确定项 / 需要后续确认

### 5.1 论坛板块提交 payload 通过宽泛 cast 绕过请求结构校验

| 字段 | 内容 |
| --- | --- | --- |
| 接口函数名 | `forumSectionsCreateApi`、`forumSectionsUpdateApi` |
| 接口文件 | `apps/web-ele/src/api/core/forum.ts:415`、`:423` |
| 业务调用文件/行号 | `apps/web-ele/src/views/forum/sections/index.vue:133-145` |
| 问题类型 | 请求结构静态不可证明 / 类型断言掩盖字段风险 |
| 生成依据 | `CreateForumSectionDto` 必填 `cover`、`icon`、`isEnabled`、`name`、`sortOrder`、`topicReviewPolicy`，见 `apps/web-ele/src/api/types/forum.d.ts:2061-2084`；`UpdateForumSectionDto` 必填 `id`，见 `apps/web-ele/src/api/types/forum.d.ts:2092-2114` |
| 实际业务侧用法 | `payload` 由 `...(values as Record<string, any>)` 加 `followersCount`、`groupId` 组成，再强转为 `ForumSectionsCreateRequest | ForumSectionsUpdateRequest` |
| 风险说明 | `vue-tsc` 已报该转换可能错误；从静态层面无法确认新增时必填字段一定齐全，更新时也无法确认 `id` 一定存在；同时 `followersCount` 不属于 create/update DTO 的显式字段 |
| 建议后续处理 | 后续修复时拆分 create/update payload builder，去掉宽泛 union cast，并按生成 DTO 明确列出允许提交字段；`followersCount` 是否允许提交需后端确认 |

### 5.2 生成 DTO 大量包含 `[property: string]: any`，会降低静态审计确定性

| 字段 | 内容 |
| --- | --- |
| 接口函数名 | 多个生成接口 |
| 接口文件 | `apps/web-ele/src/api/types/**` |
| 业务调用文件/行号 | 多处 payload builder / 表格查询参数 |
| 问题类型 | 静态不确定性 |
| 生成依据 | 例如 `CreateForumTopicDto`、`CreateForumSectionDto`、`ForumSectionsPageRequest` 都带索引签名 |
| 实际业务侧用法 | 多处业务代码通过对象展开、`Record<string, any>`、类型断言传参 |
| 风险说明 | 多余字段不会被 TypeScript 严格拦截，静态审计只能确认明显缺失/不存在，不能证明后端接受所有额外字段 |
| 建议后续处理 | 后续若要提升质量，应从生成器或接口定义层面减少宽泛索引签名，或在业务层建立显式 payload builder |

## 6. 生成但未对接接口清单

以下 API 在当前生成代码中存在，但在 `apps/web-ele/src/**` 业务源文件中未发现功能性引用。

| 模块 | 接口函数 | 接口文件 | 生成签名 | 引用状态 | 推断分类 | 建议后续动作 |
| --- | --- | --- | --- | --- | --- | --- |
| appPage | `appPageCodeDetailApi` | `apps/web-ele/src/api/core/appPage.ts` | `(params: AppPageCodeDetailRequest) => Promise<AppPageCodeDetailResponse>` | 无引用 | 未接入功能/详情能力预留 | 确认页面管理是否需要按 code 查询详情 |
| appUsers | `appUsersRebuildFollowCountApi` | `apps/web-ele/src/api/core/appUsers.ts` | `(params: AppUsersRebuildFollowCountRequest) => Promise<AppUsersRebuildFollowCountResponse>` | 无引用 | 后台维护能力预留 | 确认是否需要在用户管理页增加重建关注计数操作 |
| appUsers | `appUsersRebuildFollowCountAllApi` | `apps/web-ele/src/api/core/appUsers.ts` | `() => Promise<AppUsersRebuildFollowCountAllResponse>` | 无引用 | 后台维护能力预留 | 确认是否需要批量重建入口 |
| appUsers | `appUsersGrowthRecordPageApi` | `apps/web-ele/src/api/core/appUsers.ts` | `(params: AppUsersGrowthRecordPageRequest) => Promise<AppUsersGrowthRecordPageResponse>` | 无引用 | 未接入功能 | 用户画像弹窗当前接了积分/经验/徽章记录，需确认是否还需要综合成长记录 tab |
| auth | `authTokenRefreshApi` | `apps/web-ele/src/api/core/auth.ts` | `(params: AuthTokenRefreshRequest) => Promise<AuthTokenRefreshResponse>` | 无生成 API 引用 | 基础能力/被手写请求绕过 | `apps/web-ele/src/api/request.ts` 使用 `authRequestClient.post('/api/admin/auth/token/refresh')` 绕过鉴权拦截器；保留该特殊路径或后续评估是否可安全封装 |
| checkIn | `checkInCalendarDetailApi` | `apps/web-ele/src/api/core/checkIn.ts` | `(params: CheckInCalendarDetailRequest) => Promise<CheckInCalendarDetailResponse>` | 无引用 | 未接入功能 | 确认签到日历详情是否需要后台页面 |
| checkIn | `checkInCalendarUserDetailApi` | `apps/web-ele/src/api/core/checkIn.ts` | `(params: CheckInCalendarUserDetailRequest) => Promise<CheckInCalendarUserDetailResponse>` | 无引用 | 未接入功能 | 确认是否需要用户签到日历详情 |
| checkIn | `checkInCalendarSignedUserPageApi` | `apps/web-ele/src/api/core/checkIn.ts` | `(params: CheckInCalendarSignedUserPageRequest) => Promise<CheckInCalendarSignedUserPageResponse>` | 无引用 | 未接入功能 | 确认是否需要已签到用户列表 |
| checkIn | `checkInStreakDetailApi` | `apps/web-ele/src/api/core/checkIn.ts` | `(params: CheckInStreakDetailRequest) => Promise<CheckInStreakDetailResponse>` | 无引用 | 未接入详情能力 | 当前连续签到面板使用列表/发布/终止/历史页；确认是否需要详情抽屉 |
| checkIn | `checkInStreakHistoryDetailApi` | `apps/web-ele/src/api/core/checkIn.ts` | `(params: CheckInStreakHistoryDetailRequest) => Promise<CheckInStreakHistoryDetailResponse>` | 无引用 | 未接入详情能力 | 确认连续奖励历史详情是否需要展示 |
| comment | `commentPageApi` | `apps/web-ele/src/api/core/comment.ts` | `(params?: CommentPageRequest) => Promise<CommentPageResponse>` | 无引用 | 未接入模块 | 评论管理页面未接入；确认是否需要菜单/页面 |
| comment | `commentDetailApi` | `apps/web-ele/src/api/core/comment.ts` | `(params: CommentDetailRequest) => Promise<CommentDetailResponse>` | 无引用 | 未接入模块 | 同上 |
| comment | `commentUpdateAuditStatusApi` | `apps/web-ele/src/api/core/comment.ts` | `(params: CommentUpdateAuditStatusRequest) => Promise<CommentUpdateAuditStatusResponse>` | 无引用 | 未接入模块 | 同上 |
| comment | `commentUpdateHiddenApi` | `apps/web-ele/src/api/core/comment.ts` | `(params: CommentUpdateHiddenRequest) => Promise<CommentUpdateHiddenResponse>` | 无引用 | 未接入模块 | 同上 |
| content | `contentComicChapterContentUploadApi` | `apps/web-ele/src/api/core/content.ts` | `(params: ContentComicChapterContentUploadRequest) => Promise<ContentComicChapterContentUploadResponse>` | 无引用 | 上传能力未接入/由通用上传替代 | 确认漫画章节图片上传是否应走该专用接口 |
| content | `contentComicChapterContentUpdateApi` | `apps/web-ele/src/api/core/content.ts` | `(params: ContentComicChapterContentUpdateRequest) => Promise<ContentComicChapterContentUpdateResponse>` | 无引用 | 未接入编辑能力 | 确认漫画章节图片元数据是否需要编辑入口 |
| content | `contentComicChapterContentArchivePreviewApi` | `apps/web-ele/src/api/core/content.ts` | `(params: ContentComicChapterContentArchivePreviewRequest) => Promise<ContentComicChapterContentArchivePreviewResponse>` | 无引用 | 上传预览能力未接入 | 当前归档面板接了详情/确认；确认预览是否由上传接口或别处替代 |
| content | `contentNovelChapterContentUploadApi` | `apps/web-ele/src/api/core/content.ts` | `(params: ContentNovelChapterContentUploadRequest) => Promise<ContentNovelChapterContentUploadResponse>` | 无引用 | 上传能力未接入/由编辑器替代 | 确认小说章节内容是否需要文件上传入口 |
| content | `contentAuthorRebuildFollowCountApi` | `apps/web-ele/src/api/core/content.ts` | `(params: ContentAuthorRebuildFollowCountRequest) => Promise<ContentAuthorRebuildFollowCountResponse>` | 无引用 | 后台维护能力预留 | 确认作者关注数重建入口 |
| content | `contentAuthorRebuildFollowCountAllApi` | `apps/web-ele/src/api/core/content.ts` | `() => Promise<ContentAuthorRebuildFollowCountAllResponse>` | 无引用 | 后台维护能力预留 | 确认作者关注数批量重建入口 |
| content | `contentAuthorRebuildWorkCountApi` | `apps/web-ele/src/api/core/content.ts` | `(params: ContentAuthorRebuildWorkCountRequest) => Promise<ContentAuthorRebuildWorkCountResponse>` | 无引用 | 后台维护能力预留 | 确认作者作品数重建入口 |
| content | `contentAuthorRebuildWorkCountAllApi` | `apps/web-ele/src/api/core/content.ts` | `() => Promise<ContentAuthorRebuildWorkCountAllResponse>` | 无引用 | 后台维护能力预留 | 确认作者作品数批量重建入口 |
| content | `contentEmojiPackUpdateSceneTypeApi` | `apps/web-ele/src/api/core/content.ts` | `(params: ContentEmojiPackUpdateSceneTypeRequest) => Promise<ContentEmojiPackUpdateSceneTypeResponse>` | 无引用 | 未接入功能 | 表情包管理是否需要单独更新场景类型操作 |
| forum | `forumModeratorsDetailApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumModeratorsDetailRequest) => Promise<ForumModeratorsDetailResponse>` | 无引用 | 未接入详情能力 | 版主页面当前未拉详情；确认是否需要详情/编辑回填 |
| forum | `forumSearchPageApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumSearchPageRequest) => Promise<ForumSearchPageResponse>` | 无引用 | 未接入搜索能力 | 确认是否需要论坛全局搜索后台页 |
| forum | `forumSensitiveWordDetectApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumSensitiveWordDetectRequest) => Promise<ForumSensitiveWordDetectResponse>` | 无引用 | 未接入检测工具 | 可作为敏感词测试工具入口 |
| forum | `forumSensitiveWordStatsApi` | `apps/web-ele/src/api/core/forum.ts` | `(params?: ForumSensitiveWordStatsRequest) => Promise<ForumSensitiveWordStatsResponse>` | 无引用 | 未接入统计变体 | 当前只使用 full stats；确认普通 stats 是否废弃 |
| forum | `forumSensitiveWordReplaceApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumSensitiveWordReplaceRequest) => Promise<ForumSensitiveWordReplaceResponse>` | 无引用 | 未接入工具能力 | 确认是否需要替换预览/处理工具 |
| forum | `forumSensitiveWordDetectHighestLevelApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumSensitiveWordDetectHighestLevelRequest) => Promise<ForumSensitiveWordDetectHighestLevelResponse>` | 无引用 | 未接入检测工具 | 确认是否需要最高等级检测 |
| forum | `forumSensitiveWordDetectStatusApi` | `apps/web-ele/src/api/core/forum.ts` | `() => Promise<ForumSensitiveWordDetectStatusResponse>` | 无引用 | 未接入监控能力 | 确认是否需要检测服务状态 |
| forum | `forumSensitiveWordCountApi` | `apps/web-ele/src/api/core/forum.ts` | `() => Promise<ForumSensitiveWordCountResponse>` | 无引用 | 未接入统计能力 | 确认是否需要敏感词数量卡片 |
| forum | `forumTopicMoveApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumTopicMoveRequest) => Promise<ForumTopicMoveResponse>` | 无引用 | 未接入功能 | 主题移动功能未接入 |
| forum | `forumSectionsTreeApi` | `apps/web-ele/src/api/core/forum.ts` | `() => Promise<ForumSectionsTreeResponse>` | 无引用 | 未接入树形能力 | 当前使用 page 获取板块；确认是否需要树形选择 |
| forum | `forumSectionsRebuildFollowCountApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumSectionsRebuildFollowCountRequest) => Promise<ForumSectionsRebuildFollowCountResponse>` | 无引用 | 后台维护能力预留 | 确认板块关注数重建入口 |
| forum | `forumSectionsRebuildFollowCountAllApi` | `apps/web-ele/src/api/core/forum.ts` | `() => Promise<ForumSectionsRebuildFollowCountAllResponse>` | 无引用 | 后台维护能力预留 | 确认板块关注数批量重建入口 |
| forum | `forumSectionsSwapSortOrderApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumSectionsSwapSortOrderRequest) => Promise<ForumSectionsSwapSortOrderResponse>` | 无引用 | 未接入排序能力 | 板块页面目前未接拖拽排序 |
| forum | `forumSectionGroupsUpdateEnabledApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumSectionGroupsUpdateEnabledRequest) => Promise<ForumSectionGroupsUpdateEnabledResponse>` | 无引用 | 未接入功能 | 分组启用状态单独更新未接入 |
| forum | `forumHashtagsPageApi` | `apps/web-ele/src/api/core/forum.ts` | `(params?: ForumHashtagsPageRequest) => Promise<ForumHashtagsPageResponse>` | 无引用 | 疑似应替换旧 `forumTagsPageApi` | 见问题 4.1/4.2 |
| forum | `forumHashtagsDetailApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumHashtagsDetailRequest) => Promise<ForumHashtagsDetailResponse>` | 无引用 | 疑似应替换旧 `forumTagsDetailApi` | 见问题 4.1/4.2 |
| forum | `forumHashtagsCreateApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumHashtagsCreateRequest) => Promise<ForumHashtagsCreateResponse>` | 无引用 | 疑似应替换旧 `forumTagsCreateApi` | 见问题 4.1/4.2 |
| forum | `forumHashtagsUpdateApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumHashtagsUpdateRequest) => Promise<ForumHashtagsUpdateResponse>` | 无引用 | 疑似应替换旧 `forumTagsUpdateApi` | 见问题 4.1/4.2 |
| forum | `forumHashtagsUpdateHiddenApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumHashtagsUpdateHiddenRequest) => Promise<ForumHashtagsUpdateHiddenResponse>` | 无引用 | 新能力未接入 | 旧页面用 `isEnabled`，需确认是否改为隐藏态 |
| forum | `forumHashtagsUpdateAuditStatusApi` | `apps/web-ele/src/api/core/forum.ts` | `(params: ForumHashtagsUpdateAuditStatusRequest) => Promise<ForumHashtagsUpdateAuditStatusResponse>` | 无引用 | 新能力未接入 | 话题审核状态未接入 |
| growth | `growthExperienceRecordPageApi` | `apps/web-ele/src/api/core/growth.ts` | `(params: GrowthExperienceRecordPageRequest) => Promise<GrowthExperienceRecordPageResponse>` | 无引用 | 未接入功能/可能由 appUsers 经验记录替代 | 确认是否需要独立成长经验记录页 |
| growth | `growthExperienceRecordDetailApi` | `apps/web-ele/src/api/core/growth.ts` | `(params: GrowthExperienceRecordDetailRequest) => Promise<GrowthExperienceRecordDetailResponse>` | 无引用 | 未接入详情能力 | 同上 |
| growth | `growthExperienceStatsApi` | `apps/web-ele/src/api/core/growth.ts` | `(params: GrowthExperienceStatsRequest) => Promise<GrowthExperienceStatsResponse>` | 无引用 | 未接入统计能力 | 确认是否需要成长经验统计 |
| growth | `growthLevelRulesUserDetailApi` | `apps/web-ele/src/api/core/growth.ts` | `(params: GrowthLevelRulesUserDetailRequest) => Promise<GrowthLevelRulesUserDetailResponse>` | 无引用 | 未接入用户等级详情 | 确认是否需要用户等级详情入口 |
| growth | `growthLevelRulesPermissionCheckApi` | `apps/web-ele/src/api/core/growth.ts` | `(params: GrowthLevelRulesPermissionCheckRequest) => Promise<GrowthLevelRulesPermissionCheckResponse>` | 无引用 | 未接入工具能力 | 确认是否需要权限检查工具 |
| growth | `growthLevelRulesStatsApi` | `apps/web-ele/src/api/core/growth.ts` | `() => Promise<GrowthLevelRulesStatsResponse>` | 无引用 | 未接入统计能力 | 等级规则统计未接入 |
| growth | `growthBadgesStatsApi` | `apps/web-ele/src/api/core/growth.ts` | `() => Promise<GrowthBadgesStatsResponse>` | 无引用 | 未接入统计能力 | 徽章统计未接入 |
| growth | `growthRuleEventsPageApi` | `apps/web-ele/src/api/core/growth.ts` | `(params?: GrowthRuleEventsPageRequest) => Promise<GrowthRuleEventsPageResponse>` | 无引用 | 未接入事件配置 | 成长事件列表未接入 |
| growth | `growthRewardSettlementPageApi` | `apps/web-ele/src/api/core/growth.ts` | `(params?: GrowthRewardSettlementPageRequest) => Promise<GrowthRewardSettlementPageResponse>` | 无引用 | 未接入结算对账 | 成长奖励结算页未接入 |
| growth | `growthRewardSettlementRetryApi` | `apps/web-ele/src/api/core/growth.ts` | `(params: GrowthRewardSettlementRetryRequest) => Promise<GrowthRewardSettlementRetryResponse>` | 无引用 | 未接入重试能力 | 成长奖励结算单条重试未接入 |
| growth | `growthRewardSettlementRetryPendingBatchApi` | `apps/web-ele/src/api/core/growth.ts` | `(params?: GrowthRewardSettlementRetryPendingBatchRequest) => Promise<GrowthRewardSettlementRetryPendingBatchResponse>` | 无引用 | 未接入批量重试能力 | 成长奖励待处理批量重试未接入 |
| message | `messageMonitorDeliveryPageApi` | `apps/web-ele/src/api/core/message.ts` | `(params?: MessageMonitorDeliveryPageRequest) => Promise<MessageMonitorDeliveryPageResponse>` | 无引用 | 未接入模块 | 消息监控/通知模板模块未接入菜单或页面 |
| message | `messageMonitorDeliveryRetryApi` | `apps/web-ele/src/api/core/message.ts` | `(params: MessageMonitorDeliveryRetryRequest) => Promise<MessageMonitorDeliveryRetryResponse>` | 无引用 | 未接入模块 | 同上 |
| message | `messageMonitorDispatchPageApi` | `apps/web-ele/src/api/core/message.ts` | `(params?: MessageMonitorDispatchPageRequest) => Promise<MessageMonitorDispatchPageResponse>` | 无引用 | 未接入模块 | 同上 |
| message | `messageMonitorWsSummaryApi` | `apps/web-ele/src/api/core/message.ts` | `(params?: MessageMonitorWsSummaryRequest) => Promise<MessageMonitorWsSummaryResponse>` | 无引用 | 未接入模块 | 同上 |
| message | `messageNotificationTemplatesPageApi` | `apps/web-ele/src/api/core/message.ts` | `(params?: MessageNotificationTemplatesPageRequest) => Promise<MessageNotificationTemplatesPageResponse>` | 无引用 | 未接入模块 | 同上 |
| message | `messageNotificationTemplatesDetailApi` | `apps/web-ele/src/api/core/message.ts` | `(params: MessageNotificationTemplatesDetailRequest) => Promise<MessageNotificationTemplatesDetailResponse>` | 无引用 | 未接入模块 | 同上 |
| message | `messageNotificationTemplatesCreateApi` | `apps/web-ele/src/api/core/message.ts` | `(params: MessageNotificationTemplatesCreateRequest) => Promise<MessageNotificationTemplatesCreateResponse>` | 无引用 | 未接入模块 | 同上 |
| message | `messageNotificationTemplatesUpdateApi` | `apps/web-ele/src/api/core/message.ts` | `(params: MessageNotificationTemplatesUpdateRequest) => Promise<MessageNotificationTemplatesUpdateResponse>` | 无引用 | 未接入模块 | 同上 |
| message | `messageNotificationTemplatesUpdateEnabledApi` | `apps/web-ele/src/api/core/message.ts` | `(params: MessageNotificationTemplatesUpdateEnabledRequest) => Promise<MessageNotificationTemplatesUpdateEnabledResponse>` | 无引用 | 未接入模块 | 同上 |
| message | `messageNotificationTemplatesDeleteApi` | `apps/web-ele/src/api/core/message.ts` | `(params: MessageNotificationTemplatesDeleteRequest) => Promise<MessageNotificationTemplatesDeleteResponse>` | 无引用 | 未接入模块 | 同上 |
| report | `reportPageApi` | `apps/web-ele/src/api/core/report.ts` | `(params?: ReportPageRequest) => Promise<ReportPageResponse>` | 无引用 | 未接入举报模块 | 确认举报管理是否需要后台页面 |
| report | `reportDetailApi` | `apps/web-ele/src/api/core/report.ts` | `(params: ReportDetailRequest) => Promise<ReportDetailResponse>` | 无引用 | 未接入举报模块 | 同上 |
| report | `reportHandleApi` | `apps/web-ele/src/api/core/report.ts` | `(params: ReportHandleRequest) => Promise<ReportHandleResponse>` | 无引用 | 未接入举报模块 | 同上 |
| system | `systemIp2regionUploadApi` | `apps/web-ele/src/api/core/system.ts` | `() => Promise<SystemIp2regionUploadResponse>` | 无引用 | 上传能力未接入 | IP 地理库页面当前只查状态；上传能力未接入 |
| upload | `uploadFileUploadApi` | `apps/web-ele/src/api/core/upload.ts` | `() => Promise<UploadFileUploadResponse>` | 无引用 | 通用上传封装可能替代 | 当前上传组件使用通用上传能力/返回类型，未直接使用生成 wrapper；确认是否保留 |

## 7. 类型检查结果

已执行：

```powershell
pnpm -F @vben/web-ele run typecheck
```

结果：失败，退出码 `2`。

主要错误集中在：

- `apps/web-ele/src/views/forum/tags/**`：旧 `forumTags*` API 和 `ForumTags*` / `BaseForumTagDto` 类型已不存在。
- `apps/web-ele/src/views/forum/topic/**`：旧 `forumTags*` 关联 API 已不存在；创建/更新 payload 缺少当前必填 `html`。
- `apps/web-ele/src/views/forum/sections/index.vue:136-141`：`ForumSectionsCreateRequest | ForumSectionsUpdateRequest` 转换静态不可证明。

这些失败项已分别归入“已确认问题”和“静态不确定项”。

## 8. 静态排查方法与命令摘要

执行过的只读命令包括：

```powershell
pnpm -F @vben/web-ele run typecheck
rg -n "export async function \\w+Api\\(" apps/web-ele/src/api/core
rg -n "\\w+Api\\(" apps/web-ele/src --glob "!api/core/**" --glob "!api/types/**"
rg -n "forumTags|BaseForumTagDto|ForumTags" apps/web-ele/src --glob "!api/core/**" --glob "!api/types/**"
```

另使用一次内联 Node 脚本读取文件并计算生成 API / 已引用 API / 未对接 API 的矩阵。该脚本未写入仓库文件。

## 9. 未执行项与剩余风险

未执行：

- 未运行 `pnpm -F @vben/web-ele run att`。
- 未调用 Apifox。
- 未调用后端接口。
- 未抓包。
- 未修改任何业务或生成代码。
- 未使用子代理。

剩余风险：

- 本报告是静态审计，不能证明后端运行时是否返回额外字段。
- 生成类型里存在较多 `[property: string]: any`，多余字段无法完全靠 TypeScript 拦截。
- 当前工作区在审计前已经存在 `apps/web-ele/src/api/**` 与部分 `user-manager` 文件的未提交改动；本次报告不回退也不整理这些既有改动。
- 未对接接口的“分类”是基于静态引用和页面语义的推断，是否属于产品缺口仍需产品/后端确认。

## 10. 后续建议

1. 优先修复论坛 `tags/hashtags` 契约迁移问题，因为它同时导致 API 导入失败、类型导入失败、页面字段错配和主题标签关联流程失效。
2. 修复论坛主题创建/更新 payload，把当前 `content` 字段按接口契约迁移为 `html`。
3. 拆分论坛板块 create/update payload builder，消除宽泛类型断言。
4. 对 69 个未对接接口按产品优先级分批确认：先处理论坛、成长/结算、消息/举报、评论这几类整模块未接入口。
