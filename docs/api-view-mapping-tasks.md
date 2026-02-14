## 接口补全视图任务清单

### 任务说明

- 任务目标：为未被视图引用的接口补充对应视图与调用
- 任务输出：新增或完善视图页面、页面内接口调用与交互逻辑
- 任务顺序：按模块拆分，后续可逐条确认与实施

### 任务清单

#### 协议管理

- [已完成] 新增协议管理视图并接入 agreementCreateApi
- [已完成] 新增协议管理视图并接入 agreementUpdateApi
- [已完成] 新增协议管理视图并接入 agreementDeleteApi
- [已完成] 新增协议管理视图并接入 agreementPageApi
- [已完成] 新增协议管理视图并接入 agreementDetailApi

#### 系统健康

- [已完成] 新增系统健康视图并接入 systemHealthApi
- [已完成] 新增系统健康视图并接入 systemReadyApi

#### 页面配置

- 补充页面配置视图功能并接入 appPageDetailByCodeApi

#### 认证

- 补充认证视图功能并接入 authLoginApi
- 补充认证视图功能并接入 authLogoutApi
- 补充认证视图功能并接入 authRefreshTokenApi
- 补充认证视图功能并接入 authPublicKeyApi

#### 用户

- 补充用户管理视图功能并接入 userUnlockApi

#### 用户成长概览

- 新增用户成长概览视图并接入 userGrowthOverviewApi

#### 用户成长：积分规则

- 补充积分规则视图功能并接入 pointsRulesAddPointsApi
- 补充积分规则视图功能并接入 pointsRulesConsumePointsApi
- 补充积分规则视图功能并接入 pointsRulesRecordsPageApi
- 补充积分规则视图功能并接入 pointsRulesRecordsDetailApi
- 补充积分规则视图功能并接入 pointsRulesUserStatsApi
- 补充积分规则视图功能并接入 pointsRulesSyncComicApi

#### 用户成长：等级规则

- 补充等级规则视图功能并接入 levelRulesUserLevelInfoApi
- 补充等级规则视图功能并接入 levelRulesCheckPermissionApi
- 补充等级规则视图功能并接入 levelRulesStatisticsApi

#### 用户成长：经验规则

- 补充经验规则视图功能并接入 experienceRulesAddApi
- 补充经验规则视图功能并接入 experienceRulesRecordsPageApi
- 补充经验规则视图功能并接入 experienceRulesRecordsDetailApi
- 补充经验规则视图功能并接入 experienceRulesUserStatsApi

#### 用户成长：徽章

- 新增徽章管理视图并接入 badgesPageApi
- 新增徽章管理视图并接入 badgesDetailApi
- 新增徽章管理视图并接入 badgesCreateApi
- 新增徽章管理视图并接入 badgesUpdateApi
- 新增徽章管理视图并接入 badgesDeleteApi
- 新增徽章管理视图并接入 badgesUpdateStatusApi
- 新增徽章管理视图并接入 badgesAssignApi
- 新增徽章管理视图并接入 badgesRevokeApi
- 新增徽章管理视图并接入 badgesUsersApi
- 新增徽章管理视图并接入 badgesStatisticsApi

#### 用户成长：成长事件

- 新增成长事件视图并接入 eventsPageApi

#### 论坛：主题

- 新增论坛主题视图并接入 topicPageApi
- 新增论坛主题视图并接入 topicDetailApi
- 新增论坛主题视图并接入 topicCreateApi
- 新增论坛主题视图并接入 topicUpdateApi
- 新增论坛主题视图并接入 topicDeleteApi
- 新增论坛主题视图并接入 topicUpdatePinnedApi
- 新增论坛主题视图并接入 topicUpdateFeaturedApi
- 新增论坛主题视图并接入 topicUpdateLockedApi
- 新增论坛主题视图并接入 topicUpdateHiddenApi
- 新增论坛主题视图并接入 topicUpdateAuditStatusApi
- 新增论坛主题视图并接入 topicIncrementViewCountApi

#### 论坛：标签

- 新增论坛标签视图并接入 tagsListApi
- 新增论坛标签视图并接入 tagsDetailApi
- 新增论坛标签视图并接入 tagsPopularApi
- 新增论坛标签视图并接入 tagsSystemApi
- 新增论坛标签视图并接入 tagsUserApi
- 新增论坛标签视图并接入 tagsTopicTagsApi
- 新增论坛标签视图并接入 tagsAddApi
- 新增论坛标签视图并接入 tagsUpdateApi
- 新增论坛标签视图并接入 tagsRemoveApi
- 新增论坛标签视图并接入 tagsAssignApi
- 新增论坛标签视图并接入 tagsRemoveTagApi

#### 论坛：版主

- 新增论坛版主视图并接入 moderatorsListApi
- 新增论坛版主视图并接入 moderatorsAddApi
- 新增论坛版主视图并接入 moderatorsUpdateApi
- 新增论坛版主视图并接入 moderatorsRemoveApi
- 新增论坛版主视图并接入 moderatorsSectionAssignApi

#### 论坛：敏感词检测

- 新增敏感词检测视图并接入 detectHighestLevelApi
- 新增敏感词检测视图并接入 detectStatusApi

#### 论坛：板块与板块组

- 补充板块管理视图功能并接入 sectionGroupsUpdateEnabledApi
- 补充板块管理视图功能并接入 sectionsTreeApi
- 补充板块管理视图功能并接入 sectionsSwapSortOrderApi

#### 论坛：敏感词

- 补充敏感词视图功能并接入 sensitiveWordDetectApi
- 补充敏感词视图功能并接入 sensitiveWordStatisticsApi
- 补充敏感词视图功能并接入 sensitiveWordReplaceApi
- 补充敏感词视图功能并接入 sensitiveWordCountApi

#### 内容管理：漫画

- 补充漫画管理视图功能并接入 comicUpdateStatusApi
- 补充漫画管理视图功能并接入 comicUpdateRecommendedApi
- 补充漫画管理视图功能并接入 comicUpdateHotApi
- 补充漫画管理视图功能并接入 comicUpdateNewApi

#### 内容管理：章节内容

- 补充章节内容视图功能并接入 chapterContentAddApi
- 补充章节内容视图功能并接入 chapterContentUpdateApi
- 补充章节内容视图功能并接入 chapterContentBatchUpdateApi

#### 内容管理：第三方漫画

- 补充第三方漫画视图功能并接入 thirdPartyPlatformApi
- 补充第三方漫画视图功能并接入 thirdPartyChapterApi
- 补充第三方漫画视图功能并接入 thirdPartyChapterContentApi
