/**
 *  类型定义 [GrowthExperienceRecordPageRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthExperienceRecordPageRequest = {
  /* 幂等业务键 */
  bizKey?: string;

  /* 经验变更方向（1=增加；2=减少） */
  deltaDirection?: null | number;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否只看有关联规则的记录 */
  hasRule?: boolean | null;

  /* 最大经验变更值 */
  maxDelta?: null | number;

  /* 最小经验变更值 */
  minDelta?: null | number;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 关联的规则ID */
  ruleId?: null | number;

  /* 成长记录关联的事件编码（1=发帖奖励；2=回复奖励；3=主题获赞；4=回复获赞；5=主题被收藏；6=每日签到；7=后台人工调整；8=主题浏览；9=主题举报历史口径；10=评论奖励；11=评论获赞；12=评论举报历史口径；16=主题被评论；100=漫画作品浏览；101=漫画作品点赞；102=漫画作品收藏；103=漫画作品举报历史口径；104=漫画作品评论；200=小说作品浏览；201=小说作品点赞；202=小说作品收藏；203=小说作品举报历史口径；204=小说作品评论；300=漫画章节阅读；301=漫画章节点赞；302=漫画章节购买；303=漫画章节下载；304=漫画章节兑换；305=漫画章节举报历史口径；306=漫画章节评论；400=小说章节阅读；401=小说章节点赞；402=小说章节购买；403=小说章节下载；404=小说章节兑换；405=小说章节举报历史口径；406=小说章节评论；600=获得徽章；601=完善资料；602=上传头像；700=关注用户；701=被关注；702=分享内容；703=邀请用户；800=举报有效；801=举报无效） */
  ruleType?: null | number;

  /* 账本来源（如 growth_rule、task_bonus、purchase） */
  source?: null | string;

  /* 开始时间 */
  startDate?: null | string;

  /* 关联目标ID */
  targetId?: null | number;

  /* 关联目标类型 */
  targetType?: null | number;

  /* 用户 ID；不传则按全局经验审计查询 */
  userId?: null | number;
};

export type GrowthExperienceRecordPageResponse = {
  /* 列表数据 */
  list: UserExperienceRecordDto[];

  /* 当前页码（从1开始） */
  pageIndex: number;

  /* 每页条数 */
  pageSize: number;

  /* 总条数 */
  total: number;
};

/**
 *  类型定义 [GrowthExperienceRecordDetailRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthExperienceRecordDetailRequest = {
  /* 主键id */
  id: number;
};

export type GrowthExperienceRecordDetailResponse =
  UserExperienceRecordDetailDto;

/**
 *  类型定义 [GrowthExperienceStatsRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthExperienceStatsRequest = {
  /* 关联的用户ID */
  userId: number;
};

export type GrowthExperienceStatsResponse = UserExperienceStatsDto;

/**
 *  类型定义 [GrowthLevelRulesPageRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthLevelRulesPageRequest = {
  /* 业务域标识 */
  business?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 等级名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type GrowthLevelRulesPageResponse = {
  /* 列表数据 */
  list: UserLevelRuleOutputDto[];

  /* 当前页码（从1开始） */
  pageIndex: number;

  /* 每页条数 */
  pageSize: number;

  /* 总条数 */
  total: number;
};

/**
 *  类型定义 [GrowthLevelRulesDetailRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthLevelRulesDetailRequest = {
  /* 主键id */
  id: number;
};

export type GrowthLevelRulesDetailResponse = UserLevelRuleOutputDto;

/**
 *  类型定义 [GrowthLevelRulesCreateRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthLevelRulesCreateRequest = CreateUserLevelRuleDto;

export type GrowthLevelRulesCreateResponse = boolean;

/**
 *  类型定义 [GrowthLevelRulesUpdateRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthLevelRulesUpdateRequest = UpdateUserLevelRuleDto;

export type GrowthLevelRulesUpdateResponse = boolean;

/**
 *  类型定义 [GrowthLevelRulesDeleteRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthLevelRulesDeleteRequest = IdDto;

export type GrowthLevelRulesDeleteResponse = boolean;

/**
 *  类型定义 [GrowthLevelRulesUserDetailRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthLevelRulesUserDetailRequest = {
  /* 主键id */
  id: number;
};

export type GrowthLevelRulesUserDetailResponse = UserLevelInfoDto;

/**
 *  类型定义 [GrowthLevelRulesPermissionCheckRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthLevelRulesPermissionCheckRequest =
  CheckUserLevelPermissionDto;

export type GrowthLevelRulesPermissionCheckResponse =
  UserLevelPermissionResultDto;

export type GrowthLevelRulesStatsResponse = UserLevelStatisticsDto;

/**
 *  类型定义 [GrowthBadgesPageRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthBadgesPageRequest = {
  /* 业务域标识 */
  business?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 事件键 */
  eventKey?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 徽章名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 徽章类型（1=系统徽章；2=成就徽章；3=活动徽章） */
  type?: number;
};

export type GrowthBadgesPageResponse = {
  /* 列表数据 */
  list: UserBadgeOutputDto[];

  /* 当前页码（从1开始） */
  pageIndex: number;

  /* 每页条数 */
  pageSize: number;

  /* 总条数 */
  total: number;
};

/**
 *  类型定义 [GrowthBadgesDetailRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthBadgesDetailRequest = {
  /* 主键id */
  id: number;
};

export type GrowthBadgesDetailResponse = UserBadgeOutputDto;

/**
 *  类型定义 [GrowthBadgesCreateRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthBadgesCreateRequest = CreateUserBadgeDto;

export type GrowthBadgesCreateResponse = boolean;

/**
 *  类型定义 [GrowthBadgesUpdateRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthBadgesUpdateRequest = UpdateUserBadgeDto;

export type GrowthBadgesUpdateResponse = boolean;

/**
 *  类型定义 [GrowthBadgesDeleteRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthBadgesDeleteRequest = IdDto;

export type GrowthBadgesDeleteResponse = boolean;

/**
 *  类型定义 [GrowthBadgesUpdateStatusRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthBadgesUpdateStatusRequest = UpdateUserBadgeStatusDto;

export type GrowthBadgesUpdateStatusResponse = boolean;

/**
 *  类型定义 [GrowthBadgesAssignRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthBadgesAssignRequest = AssignUserBadgeDto;

export type GrowthBadgesAssignResponse = boolean;

/**
 *  类型定义 [GrowthBadgesRevokeRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthBadgesRevokeRequest = AssignUserBadgeDto;

export type GrowthBadgesRevokeResponse = boolean;

/**
 *  类型定义 [GrowthBadgesUserPageRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthBadgesUserPageRequest = {
  /* 徽章ID */
  badgeId: number;

  /* 结束时间 */
  endDate?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type GrowthBadgesUserPageResponse = {
  /* 列表数据 */
  list: BadgeUserPageItemDto[];

  /* 当前页码（从1开始） */
  pageIndex: number;

  /* 每页条数 */
  pageSize: number;

  /* 总条数 */
  total: number;
};

export type GrowthBadgesStatsResponse = UserBadgeStatisticsDto;

/**
 *  类型定义 [GrowthRuleEventsPageRequest]
 *  @来源 用户成长/规则聚合视图
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthRuleEventsPageRequest = {
  /* 结束时间 */
  endDate?: null | string;

  /* 是否只看已配置任一基础奖励资产的事件 */
  hasBaseReward?: boolean | null;

  /* 是否只看存在关联任务的事件 */
  hasTask?: boolean | null;

  /* 是否只看已正式接入 producer 的事件 */
  isImplemented?: boolean | null;

  /* 是否只看允许配置基础奖励规则的事件 */
  isRuleConfigurable?: boolean | null;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 成长事件编码（1=发表主题；2=发表回复；3=主题被点赞；4=回复被点赞；5=主题被收藏；6=每日签到；7=管理员操作；8=主题被浏览；9=主题举报；16=帖子被评论；10=发表评论；11=评论被点赞；12=评论举报；100=漫画作品浏览；101=漫画作品点赞；102=漫画作品收藏；103=漫画作品举报；104=漫画作品评论；200=小说作品浏览；201=小说作品点赞；202=小说作品收藏；203=小说作品举报；204=小说作品评论；300=漫画章节阅读；301=漫画章节点赞；302=漫画章节购买；303=漫画章节下载；304=漫画章节兑换；305=漫画章节举报；306=漫画章节评论；400=小说章节阅读；401=小说章节点赞；402=小说章节购买；403=小说章节下载；404=小说章节兑换；405=小说章节举报；406=小说章节评论；600=获得徽章；601=资料完善；602=头像上传；700=关注用户；701=被关注；702=分享内容；703=邀请用户；800=举报有效；801=举报无效） */
  type?: null | number;
};

export type GrowthRuleEventsPageResponse = {
  /* 列表数据 */
  list: GrowthRuleEventPageItemDto[];

  /* 当前页码（从1开始） */
  pageIndex: number;

  /* 每页条数 */
  pageSize: number;

  /* 总条数 */
  total: number;
};

export type GrowthRewardEventOptionListResponse =
  GrowthConfigurableRewardEventOptionDto[];

/**
 *  类型定义 [GrowthRewardSettlementPageRequest]
 *  @来源 用户成长/规则聚合视图
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthRewardSettlementPageRequest = {
  /* 结束时间 */
  endDate?: null | string;

  /* 成长记录关联的事件编码（1=发帖奖励；2=回复奖励；3=主题获赞；4=回复获赞；5=主题被收藏；6=每日签到；7=后台人工调整；8=主题浏览；9=主题举报历史口径；10=评论奖励；11=评论获赞；12=评论举报历史口径；16=主题被评论；100=漫画作品浏览；101=漫画作品点赞；102=漫画作品收藏；103=漫画作品举报历史口径；104=漫画作品评论；200=小说作品浏览；201=小说作品点赞；202=小说作品收藏；203=小说作品举报历史口径；204=小说作品评论；300=漫画章节阅读；301=漫画章节点赞；302=漫画章节购买；303=漫画章节下载；304=漫画章节兑换；305=漫画章节举报历史口径；306=漫画章节评论；400=小说章节阅读；401=小说章节点赞；402=小说章节购买；403=小说章节下载；404=小说章节兑换；405=小说章节举报历史口径；406=小说章节评论；600=获得徽章；601=完善资料；602=上传头像；700=关注用户；701=被关注；702=分享内容；703=邀请用户；800=举报有效；801=举报无效） */
  eventCode?: null | number;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 补偿状态（0=待补偿重试；1=已补偿成功；2=终态失败） */
  settlementStatus?: number;

  /* 补偿记录类型（1=通用成长事件；2=任务奖励；3=签到基础奖励；4=签到连续奖励） */
  settlementType?: number;

  /* 开始时间 */
  startDate?: null | string;

  /* 用户id */
  userId?: number;
};

export type GrowthRewardSettlementPageResponse = {
  /* 列表数据 */
  list: BaseGrowthRewardSettlementDto[];

  /* 当前页码（从1开始） */
  pageIndex: number;

  /* 每页条数 */
  pageSize: number;

  /* 总条数 */
  total: number;
};

/**
 *  类型定义 [GrowthRewardSettlementRetryRequest]
 *  @来源 用户成长/规则聚合视图
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthRewardSettlementRetryRequest = IdDto;

export type GrowthRewardSettlementRetryResponse = boolean;

/**
 *  类型定义 [GrowthRewardSettlementRetryPendingBatchRequest]
 *  @来源 用户成长/规则聚合视图
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthRewardSettlementRetryPendingBatchRequest =
  RetryGrowthRewardSettlementBatchDto;

export type GrowthRewardSettlementRetryPendingBatchResponse =
  GrowthRewardSettlementRetryBatchResultDto;

/**
 *  类型定义 [GrowthRewardRulesPageRequest]
 *  @来源 用户成长/奖励规则管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthRewardRulesPageRequest = {
  /* 资产类型（1=积分；2=经验；3=道具；4=虚拟货币；5=等级） */
  assetType?: number;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 规则归档状态筛选：1=当前规则；2=已归档；3=全部 */
  status?: null | number;

  /* 成长规则类型（1=发帖奖励；2=回复奖励；3=主题获赞；4=回复获赞；5=主题被收藏；6=每日签到；7=后台人工调整；8=主题浏览；9=主题举报历史口径；10=评论奖励；11=评论获赞；12=评论举报历史口径；16=主题被评论；100=漫画作品浏览；101=漫画作品点赞；102=漫画作品收藏；103=漫画作品举报历史口径；104=漫画作品评论；200=小说作品浏览；201=小说作品点赞；202=小说作品收藏；203=小说作品举报历史口径；204=小说作品评论；300=漫画章节阅读；301=漫画章节点赞；302=漫画章节购买；303=漫画章节下载；304=漫画章节兑换；305=漫画章节举报历史口径；306=漫画章节评论；400=小说章节阅读；401=小说章节点赞；402=小说章节购买；403=小说章节下载；404=小说章节兑换；405=小说章节举报历史口径；406=小说章节评论；600=获得徽章；601=完善资料；602=上传头像；700=关注用户；701=被关注；702=分享内容；703=邀请用户；800=举报有效；801=举报无效） */
  type?: number;
};

export type GrowthRewardRulesPageResponse = {
  /* 列表数据 */
  list: GrowthRewardRuleOutputDto[];

  /* 当前页码（从1开始） */
  pageIndex: number;

  /* 每页条数 */
  pageSize: number;

  /* 总条数 */
  total: number;
};

/**
 *  类型定义 [GrowthRewardRulesDetailRequest]
 *  @来源 用户成长/奖励规则管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthRewardRulesDetailRequest = {
  /* 主键id */
  id: number;
};

export type GrowthRewardRulesDetailResponse = GrowthRewardRuleOutputDto;

/**
 *  类型定义 [GrowthRewardRulesCreateRequest]
 *  @来源 用户成长/奖励规则管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthRewardRulesCreateRequest = CreateGrowthRewardRuleDto;

export type GrowthRewardRulesCreateResponse = boolean;

/**
 *  类型定义 [GrowthRewardRulesUpdateRequest]
 *  @来源 用户成长/奖励规则管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthRewardRulesUpdateRequest = UpdateGrowthRewardRuleDto;

export type GrowthRewardRulesUpdateResponse = boolean;

/**
 *  类型定义 [GrowthRewardRulesArchiveRequest]
 *  @来源 用户成长/奖励规则管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthRewardRulesArchiveRequest = ArchiveGrowthRewardRuleDto;

export type GrowthRewardRulesArchiveResponse = boolean;

/**
 *  类型定义 [UserExperienceRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserExperienceRecordDto = {
  /* 变化后经验值 */
  afterExperience: number;
  /* 变化前经验值 */
  beforeExperience: number;
  /* 幂等业务键 */
  bizKey: string;
  /* 扩展上下文（仅返回白名单解释字段）；无上下文时为 null */
  context: null | Record<string, any>;
  /* 创建时间 */
  createdAt: string;
  /* 经验值变化 */
  experience: number;
  /* 主键ID */
  id: number;
  /* 账本说明文案；无说明时为 null */
  remark: null | string;
  /* 关联的规则 ID；无规则时为 null */
  ruleId: null | number;
  /* 成长记录关联的事件编码（1=发帖奖励；2=回复奖励；3=主题获赞；4=回复获赞；5=主题被收藏；6=每日签到；7=后台人工调整；8=主题浏览；9=主题举报历史口径；10=评论奖励；11=评论获赞；12=评论举报历史口径；16=主题被评论；100=漫画作品浏览；101=漫画作品点赞；102=漫画作品收藏；103=漫画作品举报历史口径；104=漫画作品评论；200=小说作品浏览；201=小说作品点赞；202=小说作品收藏；203=小说作品举报历史口径；204=小说作品评论；300=漫画章节阅读；301=漫画章节点赞；302=漫画章节购买；303=漫画章节下载；304=漫画章节兑换；305=漫画章节举报历史口径；306=漫画章节评论；400=小说章节阅读；401=小说章节点赞；402=小说章节购买；403=小说章节下载；404=小说章节兑换；405=小说章节举报历史口径；406=小说章节评论；600=获得徽章；601=完善资料；602=上传头像；700=关注用户；701=被关注；702=分享内容；703=邀请用户；800=举报有效；801=举报无效）；无事件时为 null */
  ruleType: null | number;
  /* 账本来源；无来源时为 null */
  source: null | string;
  /* 关联目标 ID；无目标时为 null */
  targetId: null | number;
  /* 关联目标类型；无目标时为 null */
  targetType: null | number;
  /* 更新时间；账本记录无更新时间时为 null */
  updatedAt: null | string;
  user: null | UserExperienceRecordUserDto;
  /* 关联的用户ID */
  userId: number;
};

/**
 *  类型定义 [UserExperienceRecordUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserExperienceRecordUserDto = {
  /* 账号 */
  account: string;
  /* 头像URL */
  avatarUrl: null | string;
  /* 主键id */
  id: number;
  /* 昵称 */
  nickname: string;
};

/**
 *  类型定义 [UserExperienceRecordDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserExperienceRecordDetailDto = {
  /* 变化后经验值 */
  afterExperience: number;
  /* 变化前经验值 */
  beforeExperience: number;
  /* 幂等业务键 */
  bizKey: string;
  /* 扩展上下文（仅返回白名单解释字段）；无上下文时为 null */
  context: null | Record<string, any>;
  /* 创建时间 */
  createdAt: string;
  /* 完整诊断上下文；无上下文时为 null */
  diagnosticContext: null | Record<string, any>;
  /* 经验值变化 */
  experience: number;
  /* 主键ID */
  id: number;
  /* 账本说明文案；无说明时为 null */
  remark: null | string;
  /* 关联的规则 ID；无规则时为 null */
  ruleId: null | number;
  /* 成长记录关联的事件编码（1=发帖奖励；2=回复奖励；3=主题获赞；4=回复获赞；5=主题被收藏；6=每日签到；7=后台人工调整；8=主题浏览；9=主题举报历史口径；10=评论奖励；11=评论获赞；12=评论举报历史口径；16=主题被评论；100=漫画作品浏览；101=漫画作品点赞；102=漫画作品收藏；103=漫画作品举报历史口径；104=漫画作品评论；200=小说作品浏览；201=小说作品点赞；202=小说作品收藏；203=小说作品举报历史口径；204=小说作品评论；300=漫画章节阅读；301=漫画章节点赞；302=漫画章节购买；303=漫画章节下载；304=漫画章节兑换；305=漫画章节举报历史口径；306=漫画章节评论；400=小说章节阅读；401=小说章节点赞；402=小说章节购买；403=小说章节下载；404=小说章节兑换；405=小说章节举报历史口径；406=小说章节评论；600=获得徽章；601=完善资料；602=上传头像；700=关注用户；701=被关注；702=分享内容；703=邀请用户；800=举报有效；801=举报无效）；无事件时为 null */
  ruleType: null | number;
  /* 账本来源；无来源时为 null */
  source: null | string;
  /* 关联目标 ID；无目标时为 null */
  targetId: null | number;
  /* 关联目标类型；无目标时为 null */
  targetType: null | number;
  /* 更新时间；账本记录无更新时间时为 null */
  updatedAt: null | string;
  user: null | UserExperienceRecordUserDto;
  /* 关联的用户ID */
  userId: number;
};

/**
 *  类型定义 [UserExperienceStatsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserExperienceStatsDto = {
  /* 当前经验值 */
  currentExperience: number;
  level: null | UserExperienceLevelDto;
  /* 今日获得经验值 */
  todayEarned: number;
};

/**
 *  类型定义 [UserExperienceLevelDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserExperienceLevelDto = {
  /* 主键id */
  id: number;
  /* 等级名称 */
  name: string;
  /* 所需经验值 */
  requiredExperience: number;
};

/**
 *  类型定义 [UserLevelRuleOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserLevelRuleOutputDto = {
  /* 业务域标识 */
  business: null | string;
  /* 等级专属颜色（十六进制） */
  color: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 每日收藏次数上限（0=不限制） */
  dailyFavoriteLimit: number;
  /* 每日点赞次数上限（0=不限制） */
  dailyLikeLimit: number;
  /* 每日回复和评论数量上限（0=不限制） */
  dailyReplyCommentLimit: number;
  /* 每日发帖数量上限（0=不限制） */
  dailyTopicLimit: number;
  /* 等级描述 */
  description: null | string;
  /* 等级图标URL */
  icon: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 等级名称 */
  name: string;
  /* 发帖间隔秒数（0=不限制） */
  postInterval: number;
  /* 积分支付比例（0-1之间的小数，1表示原价支付） */
  purchasePayableRate: string;
  /* 所需经验值 */
  requiredExperience: number;
  /* 排序值（0=默认排序，数值越小越靠前） */
  sortOrder: number;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateUserLevelRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateUserLevelRuleDto = {
  /* 业务域标识 */
  business?: null | string;
  /* 等级专属颜色（十六进制） */
  color?: null | string;
  /* 每日收藏次数上限（0=不限制） */
  dailyFavoriteLimit: number;
  /* 每日点赞次数上限（0=不限制） */
  dailyLikeLimit: number;
  /* 每日回复和评论数量上限（0=不限制） */
  dailyReplyCommentLimit: number;
  /* 每日发帖数量上限（0=不限制） */
  dailyTopicLimit: number;
  /* 等级描述 */
  description?: null | string;
  /* 等级图标URL */
  icon?: null | string;
  /* 是否启用 */
  isEnabled: boolean;
  /* 等级名称 */
  name: string;
  /* 发帖间隔秒数（0=不限制） */
  postInterval: number;
  /* 积分支付比例（0-1之间的小数，1表示原价支付） */
  purchasePayableRate: string;
  /* 所需经验值 */
  requiredExperience: number;
  /* 排序值（0=默认排序，数值越小越靠前） */
  sortOrder: number;
};

/**
 *  类型定义 [UpdateUserLevelRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateUserLevelRuleDto = {
  /* 业务域标识 */
  business?: null | string;
  /* 等级专属颜色（十六进制） */
  color?: null | string;
  /* 每日收藏次数上限（0=不限制） */
  dailyFavoriteLimit?: number;
  /* 每日点赞次数上限（0=不限制） */
  dailyLikeLimit?: number;
  /* 每日回复和评论数量上限（0=不限制） */
  dailyReplyCommentLimit?: number;
  /* 每日发帖数量上限（0=不限制） */
  dailyTopicLimit?: number;
  /* 等级描述 */
  description?: null | string;
  /* 等级图标URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 等级名称 */
  name?: string;
  /* 发帖间隔秒数（0=不限制） */
  postInterval?: number;
  /* 积分支付比例（0-1之间的小数，1表示原价支付） */
  purchasePayableRate?: string;
  /* 所需经验值 */
  requiredExperience?: number;
  /* 排序值（0=默认排序，数值越小越靠前） */
  sortOrder?: number;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type IdDto = {
  /* 主键id */
  id: number;
};

/**
 *  类型定义 [UserLevelInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserLevelInfoDto = {
  /* 当前经验值 */
  currentExperience: number;
  /* 等级专属颜色（十六进制） */
  levelColor: null | string;
  /* 等级描述 */
  levelDescription: null | string;
  /* 等级图标URL */
  levelIcon: null | string;
  /* 等级ID */
  levelId: number;
  /* 等级名称 */
  levelName: string;
  /* 下一等级所需经验值 */
  nextLevelExperience: null | number;
  /* 等级权限 */
  permissions: UserLevelPermissionsDto;
  /* 升级进度百分比 */
  progressPercentage: number;
};

/**
 *  类型定义 [UserLevelPermissionsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserLevelPermissionsDto = {
  /* 每日收藏次数上限（0=不限制） */
  dailyFavoriteLimit: number;
  /* 每日点赞次数上限（0=不限制） */
  dailyLikeLimit: number;
  /* 每日回复和评论数量上限（0=不限制） */
  dailyReplyCommentLimit: number;
  /* 每日发帖数量上限（0=不限制） */
  dailyTopicLimit: number;
  /* 发帖间隔秒数（0=不限制） */
  postInterval: number;
};

/**
 *  类型定义 [CheckUserLevelPermissionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckUserLevelPermissionDto = {
  /* 业务域标识；默认业务域传空或不传，论坛业务域传 forum */
  business?: null | string;
  /* 权限类型（每日发帖数量上限；每日回复和评论数量上限；发帖间隔秒数；每日点赞次数上限；每日收藏次数上限） */
  permissionType:
    | 'dailyFavoriteLimit'
    | 'dailyLikeLimit'
    | 'dailyReplyCommentLimit'
    | 'dailyTopicLimit'
    | 'postInterval';
  /* 用户ID */
  userId: number;
};

/**
 *  类型定义 [UserLevelPermissionResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserLevelPermissionResultDto = {
  /* 当前等级名称 */
  currentLevel: string;
  /* 距上次发帖/回复已过秒数，仅 postInterval 返回 */
  elapsedSeconds: null | number;
  /* 是否有权限 */
  hasPermission: boolean;
  /* 限制数量 */
  limit: null | number;
  /* 间隔限制秒数，仅 postInterval 返回 */
  limitSeconds: null | number;
  /* 下次允许操作时间，仅 postInterval 且受限时返回 */
  nextAllowedAt: null | string;
  /* 剩余数量 */
  remaining: null | number;
  /* 距离下次允许操作剩余秒数，仅 postInterval 返回 */
  remainingSeconds: null | number;
  /* 已使用数量 */
  used: null | number;
};

/**
 *  类型定义 [UserLevelStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserLevelStatisticsDto = {
  /* 启用的等级数量 */
  enabledLevels: number;
  /* 等级分布 */
  levelDistribution: UserLevelDistributionItemDto[];
  /* 总等级数量 */
  totalLevels: number;
};

/**
 *  类型定义 [UserLevelDistributionItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserLevelDistributionItemDto = {
  /* 等级ID */
  levelId: number;
  /* 等级名称 */
  levelName: string;
  /* 该等级用户数量 */
  userCount: number;
};

/**
 *  类型定义 [UserBadgeOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserBadgeOutputDto = {
  /* 业务域标识 */
  business: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 徽章描述 */
  description: null | string;
  /* 事件键 */
  eventKey: null | string;
  /* 徽章图标URL */
  icon: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 徽章名称 */
  name: string;
  /* 排序值（0=默认排序，数值越小越靠前） */
  sortOrder: number;
  /* 徽章类型（1=系统徽章；2=成就徽章；3=活动徽章） */
  type: number;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateUserBadgeDto = {
  /* 业务域标识 */
  business?: null | string;
  /* 徽章描述 */
  description?: null | string;
  /* 事件键 */
  eventKey?: null | string;
  /* 徽章图标URL */
  icon?: null | string;
  /* 是否启用 */
  isEnabled: boolean;
  /* 徽章名称 */
  name: string;
  /* 排序值（0=默认排序，数值越小越靠前） */
  sortOrder: number;
  /* 徽章类型（1=系统徽章；2=成就徽章；3=活动徽章） */
  type: number;
};

/**
 *  类型定义 [UpdateUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateUserBadgeDto = {
  /* 业务域标识 */
  business?: null | string;
  /* 徽章描述 */
  description?: null | string;
  /* 事件键 */
  eventKey?: null | string;
  /* 徽章图标URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 徽章名称 */
  name: string;
  /* 排序值（0=默认排序，数值越小越靠前） */
  sortOrder: number;
  /* 徽章类型（1=系统徽章；2=成就徽章；3=活动徽章） */
  type: number;
};

/**
 *  类型定义 [UpdateUserBadgeStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateUserBadgeStatusDto = {
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
};

/**
 *  类型定义 [AssignUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AssignUserBadgeDto = {
  /* 徽章ID */
  badgeId: number;
  /* 用户ID */
  userId: number;
};

/**
 *  类型定义 [BadgeUserPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BadgeUserPageItemDto = {
  /* 徽章ID */
  badgeId: number;
  /* 获得时间 */
  createdAt: string;
  /* 用户信息 */
  user: BadgeUserInfoDto;
  /* 用户ID */
  userId: number;
};

/**
 *  类型定义 [BadgeUserInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BadgeUserInfoDto = {
  /* 头像地址 */
  avatar: null | string;
  /* 主键id */
  id: number;
  /* 等级名称 */
  level: null | string;
  /* 昵称 */
  nickname: string;
  /* 当前积分 */
  point: number;
};

/**
 *  类型定义 [UserBadgeStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserBadgeStatisticsDto = {
  /* 停用数 */
  disabledCount: number;
  /* 启用数 */
  enabledCount: number;
  /* 热门徽章 */
  topBadges: UserBadgeTopBadgeItemDto[];
  /* 总分配次数 */
  totalAssignments: number;
  /* 总徽章数 */
  totalBadges: number;
  /* 类型分布 */
  typeDistribution: UserBadgeTypeDistributionItemDto[];
};

/**
 *  类型定义 [UserBadgeTypeDistributionItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserBadgeTypeDistributionItemDto = {
  /* 数量 */
  count: number;
  /* 徽章类型（1=系统徽章；2=成就徽章；3=活动徽章） */
  type: number;
};

/**
 *  类型定义 [UserBadgeTopBadgeItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserBadgeTopBadgeItemDto = {
  badge: null | UserBadgeOutputDto;
  /* 分配次数 */
  count: number;
};

/**
 *  类型定义 [GrowthRuleEventPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthRuleEventPageItemDto = {
  /* 基础奖励资产规则摘要列表 */
  assetRules: GrowthRuleAssetSummaryDto[];
  /* 不可配置原因；可配置时为 null */
  disabledReason: null | string;
  /* 事件所属领域（论坛；评论；漫画作品；小说作品；漫画章节；小说章节；互动；徽章；资料；社交；举报；系统） */
  domain:
    | 'badge'
    | 'comic_chapter'
    | 'comic_work'
    | 'comment'
    | 'engagement'
    | 'forum'
    | 'novel_chapter'
    | 'novel_work'
    | 'profile'
    | 'report'
    | 'social'
    | 'system';
  /* 成长事件名称 */
  eventName: string;
  /* 治理闸门类型（无闸门；主题审核；评论审核；举报裁决） */
  governanceGate:
    | 'comment_approval'
    | 'none'
    | 'report_judgement'
    | 'topic_approval';
  /* 是否已配置任一基础奖励 */
  hasBaseReward: boolean;
  /* 是否存在关联任务 */
  hasTask: boolean;
  /* 实现状态（已声明；已实现；历史兼容） */
  implStatus: 'declared' | 'implemented' | 'legacy_compat';
  /* 是否已正式接入 producer */
  isImplemented: boolean;
  /* 是否允许配置基础奖励规则 */
  isRuleConfigurable: boolean;
  /* 基础奖励与任务 bonus 的默认叠加策略说明 */
  rewardPolicy: string;
  /* 成长事件英文 key */
  ruleKey: string;
  /* 成长事件编码（1=发表主题；2=发表回复；3=主题被点赞；4=回复被点赞；5=主题被收藏；6=每日签到；7=管理员操作；8=主题被浏览；9=主题举报；16=帖子被评论；10=发表评论；11=评论被点赞；12=评论举报；100=漫画作品浏览；101=漫画作品点赞；102=漫画作品收藏；103=漫画作品举报；104=漫画作品评论；200=小说作品浏览；201=小说作品点赞；202=小说作品收藏；203=小说作品举报；204=小说作品评论；300=漫画章节阅读；301=漫画章节点赞；302=漫画章节购买；303=漫画章节下载；304=漫画章节兑换；305=漫画章节举报；306=漫画章节评论；400=小说章节阅读；401=小说章节点赞；402=小说章节购买；403=小说章节下载；404=小说章节兑换；405=小说章节举报；406=小说章节评论；600=获得徽章；601=资料完善；602=头像上传；700=关注用户；701=被关注；702=分享内容；703=邀请用户；800=举报有效；801=举报无效） */
  ruleType: number;
  /* 是否支持配置经验奖励规则 */
  supportsExperienceRule: boolean;
  /* 是否支持任务消费 */
  supportsTaskObjective: boolean;
  /* 关联任务摘要 */
  taskBinding: GrowthRuleTaskBindingSummaryDto;
};

/**
 *  类型定义 [GrowthRuleAssetSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthRuleAssetSummaryDto = {
  /* 奖励值 */
  amount: number;
  /* 资产键；积分/经验为 null，扩展资产使用稳定业务键 */
  assetKey: null | string;
  /* 资产类型（1=积分；2=经验；3=道具；4=虚拟货币；5=等级） */
  assetType: number;
  /* 每日上限（0=无限制） */
  dailyLimit: number;
  /* 该资产规则是否存在 */
  exists: boolean;
  /* 规则 ID */
  id: number;
  /* 规则是否启用 */
  isEnabled: boolean;
  /* 规则备注 */
  remark: null | string;
  /* 总上限（0=无限制） */
  totalLimit: number;
};

/**
 *  类型定义 [GrowthRuleTaskBindingSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthRuleTaskBindingSummaryDto = {
  /* 启用中的任务数 */
  enabledTaskCount: number;
  /* 是否存在关联任务 */
  exists: boolean;
  /* 已发布任务数 */
  publishedTaskCount: number;
  /* 关联任务总数 */
  relatedTaskCount: number;
  /* 关联任务场景类型列表（1=新手引导任务；2=日常任务；4=活动任务） */
  sceneTypes: number[];
  /* 关联任务 ID 列表 */
  taskIds: number[];
};

/**
 *  类型定义 [GrowthConfigurableRewardEventOptionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthConfigurableRewardEventOptionDto = {
  /* 事件所属领域（论坛；评论；漫画作品；小说作品；漫画章节；小说章节；互动；徽章；资料；社交；举报；系统） */
  domain:
    | 'badge'
    | 'comic_chapter'
    | 'comic_work'
    | 'comment'
    | 'engagement'
    | 'forum'
    | 'novel_chapter'
    | 'novel_work'
    | 'profile'
    | 'report'
    | 'social'
    | 'system';
  /* 成长事件名称 */
  eventName: string;
  /* 治理闸门类型（无闸门；主题审核；评论审核；举报裁决） */
  governanceGate:
    | 'comment_approval'
    | 'none'
    | 'report_judgement'
    | 'topic_approval';
  /* 实现状态（已声明；已实现；历史兼容） */
  implStatus: 'declared' | 'implemented' | 'legacy_compat';
  /* 是否已正式接入 producer */
  isImplemented: boolean;
  /* 是否允许配置基础奖励规则 */
  isRuleConfigurable: boolean;
  /* 成长事件英文 key */
  ruleKey: string;
  /* 成长事件编码（1=发表主题；2=发表回复；3=主题被点赞；4=回复被点赞；5=主题被收藏；6=每日签到；7=管理员操作；8=主题被浏览；9=主题举报；16=帖子被评论；10=发表评论；11=评论被点赞；12=评论举报；100=漫画作品浏览；101=漫画作品点赞；102=漫画作品收藏；103=漫画作品举报；104=漫画作品评论；200=小说作品浏览；201=小说作品点赞；202=小说作品收藏；203=小说作品举报；204=小说作品评论；300=漫画章节阅读；301=漫画章节点赞；302=漫画章节购买；303=漫画章节下载；304=漫画章节兑换；305=漫画章节举报；306=漫画章节评论；400=小说章节阅读；401=小说章节点赞；402=小说章节购买；403=小说章节下载；404=小说章节兑换；405=小说章节举报；406=小说章节评论；600=获得徽章；601=资料完善；602=头像上传；700=关注用户；701=被关注；702=分享内容；703=邀请用户；800=举报有效；801=举报无效） */
  ruleType: number;
  /* 是否支持配置经验奖励规则 */
  supportsExperienceRule: boolean;
};

/**
 *  类型定义 [BaseGrowthRewardSettlementDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseGrowthRewardSettlementDto = {
  /* 奖励幂等业务键 */
  bizKey: string;
  /* 创建时间 */
  createdAt: string;
  /* 成长记录关联的事件编码（1=发帖奖励；2=回复奖励；3=主题获赞；4=回复获赞；5=主题被收藏；6=每日签到；7=后台人工调整；8=主题浏览；9=主题举报历史口径；10=评论奖励；11=评论获赞；12=评论举报历史口径；16=主题被评论；100=漫画作品浏览；101=漫画作品点赞；102=漫画作品收藏；103=漫画作品举报历史口径；104=漫画作品评论；200=小说作品浏览；201=小说作品点赞；202=小说作品收藏；203=小说作品举报历史口径；204=小说作品评论；300=漫画章节阅读；301=漫画章节点赞；302=漫画章节购买；303=漫画章节下载；304=漫画章节兑换；305=漫画章节举报历史口径；306=漫画章节评论；400=小说章节阅读；401=小说章节点赞；402=小说章节购买；403=小说章节下载；404=小说章节兑换；405=小说章节举报历史口径；406=小说章节评论；600=获得徽章；601=完善资料；602=上传头像；700=关注用户；701=被关注；702=分享内容；703=邀请用户；800=举报有效；801=举报无效） */
  eventCode: null | number;
  /* 成长事件 key */
  eventKey: null | string;
  /* 原始事件发生时间 */
  eventOccurredAt: string;
  /* 主键id */
  id: number;
  /* 最近一次失败原因 */
  lastError: null | string;
  /* 最近一次重试时间 */
  lastRetryAt: null | string;
  /* 本次补偿关联到账本记录 ID 列表 */
  ledgerRecordIds: number[];
  /* 补偿重放用的原始载荷快照；通用成长事件、任务奖励、签到基础奖励、签到连续奖励会分别写入各自结构 */
  requestPayload: string;
  /* 已执行的补偿重试次数 */
  retryCount: number;
  /* 最近一次补偿状态落定时间 */
  settledAt: null | string;
  /* 补偿结果类型（1=本次真实落账；2=命中幂等未重复落账；3=本次处理失败） */
  settlementResultType: null | number;
  /* 补偿状态（0=待补偿重试；1=已补偿成功；2=终态失败） */
  settlementStatus: number;
  /* 补偿记录类型（1=通用成长事件；2=任务奖励；3=签到基础奖励；4=签到连续奖励） */
  settlementType: number;
  /* 奖励来源 */
  source: string;
  /* 来源事实主键（任务奖励通常为 instanceId） */
  sourceRecordId: null | number;
  /* 目标 ID */
  targetId: null | number;
  /* 目标类型 */
  targetType: null | number;
  /* 更新时间 */
  updatedAt: string;
  /* 归属用户 ID */
  userId: number;
};

/**
 *  类型定义 [RetryGrowthRewardSettlementBatchDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type RetryGrowthRewardSettlementBatchDto = {
  /* 本次最多扫描的待补偿记录数 */
  limit?: null | number;
};

/**
 *  类型定义 [GrowthRewardSettlementRetryBatchResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthRewardSettlementRetryBatchResultDto = {
  /* 本次补偿后仍未成功的记录数 */
  failedCount: number;
  /* 本次扫描到的补偿记录数 */
  scannedCount: number;
  /* 本次补偿成功数 */
  succeededCount: number;
};

/**
 *  类型定义 [GrowthRewardRuleOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthRewardRuleOutputDto = {
  /* 归档时间；为空表示当前生效规则 */
  archivedAt: null | string;
  /* 归档操作者管理员 ID；系统迁移自动归档为空 */
  archivedBy: null | number;
  /* 归档原因说明 */
  archiveReason: null | string;
  /* 归档原因码 */
  archiveReasonCode: null | string;
  /* 资产键；积分/经验必须为空字符串，道具/虚拟货币/等级必须提供稳定业务键 */
  assetKey?: null | string;
  /* 资产类型（1=积分；2=经验；3=道具；4=虚拟货币；5=等级） */
  assetType: number;
  /* 创建时间 */
  createdAt: string;
  /* 每日上限（0=无限制） */
  dailyLimit: number;
  /* 规则变动值；必须为正整数 */
  delta: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 备注 */
  remark: null | string;
  /* 总上限（0=无限制） */
  totalLimit: number;
  /* 成长规则类型（1=发帖奖励；2=回复奖励；3=主题获赞；4=回复获赞；5=主题被收藏；6=每日签到；7=后台人工调整；8=主题浏览；9=主题举报历史口径；10=评论奖励；11=评论获赞；12=评论举报历史口径；16=主题被评论；100=漫画作品浏览；101=漫画作品点赞；102=漫画作品收藏；103=漫画作品举报历史口径；104=漫画作品评论；200=小说作品浏览；201=小说作品点赞；202=小说作品收藏；203=小说作品举报历史口径；204=小说作品评论；300=漫画章节阅读；301=漫画章节点赞；302=漫画章节购买；303=漫画章节下载；304=漫画章节兑换；305=漫画章节举报历史口径；306=漫画章节评论；400=小说章节阅读；401=小说章节点赞；402=小说章节购买；403=小说章节下载；404=小说章节兑换；405=小说章节举报历史口径；406=小说章节评论；600=获得徽章；601=完善资料；602=上传头像；700=关注用户；701=被关注；702=分享内容；703=邀请用户；800=举报有效；801=举报无效） */
  type: number;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateGrowthRewardRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateGrowthRewardRuleDto = {
  /* 资产键；积分/经验必须为空字符串，道具/虚拟货币/等级必须提供稳定业务键 */
  assetKey?: null | string;
  /* 资产类型（1=积分；2=经验；3=道具；4=虚拟货币；5=等级） */
  assetType: number;
  /* 每日上限（0=无限制） */
  dailyLimit: number;
  /* 规则变动值；必须为正整数 */
  delta: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 备注 */
  remark?: null | string;
  /* 总上限（0=无限制） */
  totalLimit: number;
  /* 成长规则类型（1=发帖奖励；2=回复奖励；3=主题获赞；4=回复获赞；5=主题被收藏；6=每日签到；7=后台人工调整；8=主题浏览；9=主题举报历史口径；10=评论奖励；11=评论获赞；12=评论举报历史口径；16=主题被评论；100=漫画作品浏览；101=漫画作品点赞；102=漫画作品收藏；103=漫画作品举报历史口径；104=漫画作品评论；200=小说作品浏览；201=小说作品点赞；202=小说作品收藏；203=小说作品举报历史口径；204=小说作品评论；300=漫画章节阅读；301=漫画章节点赞；302=漫画章节购买；303=漫画章节下载；304=漫画章节兑换；305=漫画章节举报历史口径；306=漫画章节评论；400=小说章节阅读；401=小说章节点赞；402=小说章节购买；403=小说章节下载；404=小说章节兑换；405=小说章节举报历史口径；406=小说章节评论；600=获得徽章；601=完善资料；602=上传头像；700=关注用户；701=被关注；702=分享内容；703=邀请用户；800=举报有效；801=举报无效） */
  type: number;
};

/**
 *  类型定义 [UpdateGrowthRewardRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateGrowthRewardRuleDto = {
  /* 资产键；积分/经验必须为空字符串，道具/虚拟货币/等级必须提供稳定业务键 */
  assetKey?: null | string;
  /* 资产类型（1=积分；2=经验；3=道具；4=虚拟货币；5=等级） */
  assetType?: number;
  /* 每日上限（0=无限制） */
  dailyLimit?: number;
  /* 规则变动值；必须为正整数 */
  delta?: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 备注 */
  remark?: null | string;
  /* 总上限（0=无限制） */
  totalLimit?: number;
  /* 成长规则类型（1=发帖奖励；2=回复奖励；3=主题获赞；4=回复获赞；5=主题被收藏；6=每日签到；7=后台人工调整；8=主题浏览；9=主题举报历史口径；10=评论奖励；11=评论获赞；12=评论举报历史口径；16=主题被评论；100=漫画作品浏览；101=漫画作品点赞；102=漫画作品收藏；103=漫画作品举报历史口径；104=漫画作品评论；200=小说作品浏览；201=小说作品点赞；202=小说作品收藏；203=小说作品举报历史口径；204=小说作品评论；300=漫画章节阅读；301=漫画章节点赞；302=漫画章节购买；303=漫画章节下载；304=漫画章节兑换；305=漫画章节举报历史口径；306=漫画章节评论；400=小说章节阅读；401=小说章节点赞；402=小说章节购买；403=小说章节下载；404=小说章节兑换；405=小说章节举报历史口径；406=小说章节评论；600=获得徽章；601=完善资料；602=上传头像；700=关注用户；701=被关注；702=分享内容；703=邀请用户；800=举报有效；801=举报无效） */
  type?: number;
};

/**
 *  类型定义 [ArchiveGrowthRewardRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ArchiveGrowthRewardRuleDto = {
  /* 归档原因说明 */
  archiveReason?: null | string;
  /* 主键id */
  id: number;
};

/**
 *  类型定义 [BaseGrowthRewardRuleDto]
 *  @来源 legacy compatibility alias
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseGrowthRewardRuleDto = GrowthRewardRuleOutputDto;

/**
 *  类型定义 [BaseUserBadgeDto]
 *  @来源 legacy compatibility alias
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseUserBadgeDto = UserBadgeOutputDto;

/**
 *  类型定义 [BaseUserLevelRuleDto]
 *  @来源 legacy compatibility alias
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseUserLevelRuleDto = UserLevelRuleOutputDto;

/**
 *  类型定义 [GrowthRewardSettlementPageItemDto]
 *  @来源 legacy compatibility alias
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthRewardSettlementPageItemDto = BaseGrowthRewardSettlementDto;
