## 接口与视图匹配核查报告

### 范围与方法

- 扫描范围：apps/web-ele/src/api/core 下所有 API 模块
- 视图范围：apps/web-ele/src/views 下所有 .vue 与 .ts
- 匹配规则：以接口函数名（\*Api）在视图内直接引用为准
- 说明：若接口仅在 store、service 或组合式函数中调用，仍会被视为未在视图直接引用

### 未被视图引用的接口清单

#### 协议管理

- agreementCreateApi — /api/admin/agreement/create — apps/web-ele/src/api/core/agreement/agreement.ts
- agreementUpdateApi — /api/admin/agreement/update — apps/web-ele/src/api/core/agreement/agreement.ts
- agreementDeleteApi — /api/admin/agreement/delete — apps/web-ele/src/api/core/agreement/agreement.ts
- agreementPageApi — /api/admin/agreement/page — apps/web-ele/src/api/core/agreement/agreement.ts
- agreementDetailApi — /api/admin/agreement/detail — apps/web-ele/src/api/core/agreement/agreement.ts

#### 上传

- uploadUploadFileApi — /api/admin/upload/upload-file — apps/web-ele/src/api/core/upload/upload.ts

#### 系统健康

- systemHealthApi — /api/system/health — apps/web-ele/src/api/core/health/system.ts
- systemReadyApi — /api/system/ready — apps/web-ele/src/api/core/health/system.ts

#### 页面配置

- appPageDetailByCodeApi — /api/admin/app-page/detail-by-code — apps/web-ele/src/api/core/app-page/appPage.ts

#### 认证

- authLoginApi — /api/admin/auth/login — apps/web-ele/src/api/core/auth/auth.ts
- authLogoutApi — /api/admin/auth/logout — apps/web-ele/src/api/core/auth/auth.ts
- authRefreshTokenApi — /api/admin/auth/refresh-token — apps/web-ele/src/api/core/auth/auth.ts
- authPublicKeyApi — /api/admin/auth/public-key — apps/web-ele/src/api/core/auth/auth.ts

#### 用户

- userUnlockApi — /api/admin/user/unlock — apps/web-ele/src/api/core/user/user.ts

#### 用户成长概览

- userGrowthOverviewApi — /api/admin/user-growth/overview — apps/web-ele/src/api/core/user-growth/userGrowth.ts

#### 用户成长：积分规则

- pointsRulesAddPointsApi — /api/admin/user-growth/points-rules/add-points — apps/web-ele/src/api/core/user-growth/pointsRules.ts
- pointsRulesConsumePointsApi — /api/admin/user-growth/points-rules/consume-points — apps/web-ele/src/api/core/user-growth/pointsRules.ts
- pointsRulesRecordsPageApi — /api/admin/user-growth/points-rules/records-page — apps/web-ele/src/api/core/user-growth/pointsRules.ts
- pointsRulesRecordsDetailApi — /api/admin/user-growth/points-rules/records-detail — apps/web-ele/src/api/core/user-growth/pointsRules.ts
- pointsRulesUserStatsApi — /api/admin/user-growth/points-rules/user-stats — apps/web-ele/src/api/core/user-growth/pointsRules.ts
- pointsRulesSyncComicApi — /api/admin/user-growth/points-rules/sync-comic — apps/web-ele/src/api/core/user-growth/pointsRules.ts

#### 用户成长：等级规则

- levelRulesUserLevelInfoApi — /api/admin/user-growth/level-rules/user-level-info — apps/web-ele/src/api/core/user-growth/levelRules.ts
- levelRulesCheckPermissionApi — /api/admin/user-growth/level-rules/check-permission — apps/web-ele/src/api/core/user-growth/levelRules.ts
- levelRulesStatisticsApi — /api/admin/user-growth/level-rules/statistics — apps/web-ele/src/api/core/user-growth/levelRules.ts

#### 用户成长：经验规则

- experienceRulesAddApi — /api/admin/user-growth/experience-rules/add — apps/web-ele/src/api/core/user-growth/experienceRules.ts
- experienceRulesRecordsPageApi — /api/admin/user-growth/experience-rules/records-page — apps/web-ele/src/api/core/user-growth/experienceRules.ts
- experienceRulesRecordsDetailApi — /api/admin/user-growth/experience-rules/records-detail — apps/web-ele/src/api/core/user-growth/experienceRules.ts
- experienceRulesUserStatsApi — /api/admin/user-growth/experience-rules/user-stats — apps/web-ele/src/api/core/user-growth/experienceRules.ts

#### 用户成长：徽章

- badgesPageApi — /api/admin/user-growth/badges/page — apps/web-ele/src/api/core/user-growth/badges.ts
- badgesDetailApi — /api/admin/user-growth/badges/detail — apps/web-ele/src/api/core/user-growth/badges.ts
- badgesCreateApi — /api/admin/user-growth/badges/create — apps/web-ele/src/api/core/user-growth/badges.ts
- badgesUpdateApi — /api/admin/user-growth/badges/update — apps/web-ele/src/api/core/user-growth/badges.ts
- badgesDeleteApi — /api/admin/user-growth/badges/delete — apps/web-ele/src/api/core/user-growth/badges.ts
- badgesUpdateStatusApi — /api/admin/user-growth/badges/update-status — apps/web-ele/src/api/core/user-growth/badges.ts
- badgesAssignApi — /api/admin/user-growth/badges/assign — apps/web-ele/src/api/core/user-growth/badges.ts
- badgesRevokeApi — /api/admin/user-growth/badges/revoke — apps/web-ele/src/api/core/user-growth/badges.ts
- badgesUsersApi — /api/admin/user-growth/badges/users — apps/web-ele/src/api/core/user-growth/badges.ts
- badgesStatisticsApi — /api/admin/user-growth/badges/statistics — apps/web-ele/src/api/core/user-growth/badges.ts

#### 用户成长：成长事件

- eventsPageApi — /api/admin/user-growth/events/page — apps/web-ele/src/api/core/user-growth/events.ts

#### 论坛：主题

- topicPageApi — /api/admin/forum/topic/page — apps/web-ele/src/api/core/forum/topic.ts
- topicDetailApi — /api/admin/forum/topic/detail — apps/web-ele/src/api/core/forum/topic.ts
- topicCreateApi — /api/admin/forum/topic/create — apps/web-ele/src/api/core/forum/topic.ts
- topicUpdateApi — /api/admin/forum/topic/update — apps/web-ele/src/api/core/forum/topic.ts
- topicDeleteApi — /api/admin/forum/topic/delete — apps/web-ele/src/api/core/forum/topic.ts
- topicUpdatePinnedApi — /api/admin/forum/topic/update-pinned — apps/web-ele/src/api/core/forum/topic.ts
- topicUpdateFeaturedApi — /api/admin/forum/topic/update-featured — apps/web-ele/src/api/core/forum/topic.ts
- topicUpdateLockedApi — /api/admin/forum/topic/update-locked — apps/web-ele/src/api/core/forum/topic.ts
- topicUpdateHiddenApi — /api/admin/forum/topic/update-hidden — apps/web-ele/src/api/core/forum/topic.ts
- topicUpdateAuditStatusApi — /api/admin/forum/topic/update-audit-status — apps/web-ele/src/api/core/forum/topic.ts
- topicIncrementViewCountApi — /api/admin/forum/topic/increment-view-count — apps/web-ele/src/api/core/forum/topic.ts

#### 论坛：标签

- tagsListApi — /api/admin/forum/tags/list — apps/web-ele/src/api/core/forum/tags.ts
- tagsDetailApi — /api/admin/forum/tags/detail — apps/web-ele/src/api/core/forum/tags.ts
- tagsPopularApi — /api/admin/forum/tags/popular — apps/web-ele/src/api/core/forum/tags.ts
- tagsSystemApi — /api/admin/forum/tags/system — apps/web-ele/src/api/core/forum/tags.ts
- tagsUserApi — /api/admin/forum/tags/user — apps/web-ele/src/api/core/forum/tags.ts
- tagsTopicTagsApi — /api/admin/forum/tags/topic-tags — apps/web-ele/src/api/core/forum/tags.ts
- tagsAddApi — /api/admin/forum/tags/add — apps/web-ele/src/api/core/forum/tags.ts
- tagsUpdateApi — /api/admin/forum/tags/update — apps/web-ele/src/api/core/forum/tags.ts
- tagsRemoveApi — /api/admin/forum/tags/remove — apps/web-ele/src/api/core/forum/tags.ts
- tagsAssignApi — /api/admin/forum/tags/assign — apps/web-ele/src/api/core/forum/tags.ts
- tagsRemoveTagApi — /api/admin/forum/tags/remove-tag — apps/web-ele/src/api/core/forum/tags.ts

#### 论坛：版主

- moderatorsListApi — /api/admin/forum/moderators/list — apps/web-ele/src/api/core/forum/moderators.ts
- moderatorsAddApi — /api/admin/forum/moderators/add — apps/web-ele/src/api/core/forum/moderators.ts
- moderatorsUpdateApi — /api/admin/forum/moderators/update — apps/web-ele/src/api/core/forum/moderators.ts
- moderatorsRemoveApi — /api/admin/forum/moderators/remove — apps/web-ele/src/api/core/forum/moderators.ts
- moderatorsSectionAssignApi — /api/admin/forum/moderators/section-assign — apps/web-ele/src/api/core/forum/moderators.ts

#### 论坛：敏感词检测

- detectHighestLevelApi — /api/admin/forum/sensitive-word/detect/highest-level — apps/web-ele/src/api/core/forum/detect.ts
- detectStatusApi — /api/admin/forum/sensitive-word/detect/status — apps/web-ele/src/api/core/forum/detect.ts

#### 论坛：板块与板块组

- sectionGroupsUpdateEnabledApi — /api/admin/forum/section-groups/update-enabled — apps/web-ele/src/api/core/forum/sectionGroups.ts
- sectionsTreeApi — /api/admin/forum/sections/tree — apps/web-ele/src/api/core/forum/sections.ts
- sectionsSwapSortOrderApi — /api/admin/forum/sections/swap-sort-order — apps/web-ele/src/api/core/forum/sections.ts

#### 论坛：敏感词

- sensitiveWordDetectApi — /api/admin/forum/sensitive-word/detect — apps/web-ele/src/api/core/forum/sensitiveWord.ts
- sensitiveWordStatisticsApi — /api/admin/forum/sensitive-word/statistics — apps/web-ele/src/api/core/forum/sensitiveWord.ts
- sensitiveWordReplaceApi — /api/admin/forum/sensitive-word/replace — apps/web-ele/src/api/core/forum/sensitiveWord.ts
- sensitiveWordCountApi — /api/admin/forum/sensitive-word/count — apps/web-ele/src/api/core/forum/sensitiveWord.ts

#### 内容管理：漫画

- comicUpdateStatusApi — /api/admin/work/comic/update-status — apps/web-ele/src/api/core/work/comic.ts
- comicUpdateRecommendedApi — /api/admin/work/comic/update-recommended — apps/web-ele/src/api/core/work/comic.ts
- comicUpdateHotApi — /api/admin/work/comic/update-hot — apps/web-ele/src/api/core/work/comic.ts
- comicUpdateNewApi — /api/admin/work/comic/update-new — apps/web-ele/src/api/core/work/comic.ts

#### 内容管理：章节内容

- chapterContentAddApi — /api/admin/work/chapter-content/add — apps/web-ele/src/api/core/work/chapterContent.ts
- chapterContentUpdateApi — /api/admin/work/chapter-content/update — apps/web-ele/src/api/core/work/chapterContent.ts
- chapterContentBatchUpdateApi — /api/admin/work/chapter-content/batch-update — apps/web-ele/src/api/core/work/chapterContent.ts

#### 内容管理：第三方漫画

- thirdPartyPlatformApi — /api/admin/work/comic/third-party/platform — apps/web-ele/src/api/core/work/thirdParty.ts
- thirdPartyChapterApi — /api/admin/work/comic/third-party/chapter — apps/web-ele/src/api/core/work/thirdParty.ts
- thirdPartyChapterContentApi — /api/admin/work/comic/third-party/chapter-content — apps/web-ele/src/api/core/work/thirdParty.ts
