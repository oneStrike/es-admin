/**
 *  类型定义 [AppUsersPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 账号 */
  account?: string;

  /* 删除态筛选（0=未删除；1=已删除；2=全部） */
  deletedScope?: number;

  /* 邮箱 */
  emailAddress?: string;

  /* 注册结束时间 */
  endDate?: string;

  /* 主键id */
  id?: number;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 最后登录结束时间 */
  lastLoginEndDate?: string;

  /* 最后登录开始时间 */
  lastLoginStartDate?: string;

  /* 等级ID */
  levelId?: number;

  /* 昵称 */
  nickname?: string;

  /* 排序字段，json格式 */
  orderBy?: string;

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 单页大小，最大500，默认15 */
  pageSize?: number;

  /* 手机号 */
  phoneNumber?: string;

  /* 注册开始时间 */
  startDate?: string;

  /* 用户状态（1=正常；2=禁言；3=永久禁言；4=封禁；5=永久封禁） */
  status?: number;
};

export type AppUsersPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: AdminAppUserPageItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [AppUsersDetailRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type AppUsersDetailResponse = AdminAppUserDetailDto;

/**
 *  类型定义 [AppUsersCreateRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersCreateRequest = CreateAdminAppUserDto;

export type AppUsersCreateResponse = boolean;

/**
 *  类型定义 [AppUsersProfileUpdateRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersProfileUpdateRequest = UpdateAdminAppUserProfileDto;

export type AppUsersProfileUpdateResponse = boolean;

/**
 *  类型定义 [AppUsersUpdateEnabledRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersUpdateEnabledRequest = UpdateAdminAppUserEnabledDto;

export type AppUsersUpdateEnabledResponse = boolean;

/**
 *  类型定义 [AppUsersUpdateStatusRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersUpdateStatusRequest = UpdateAdminAppUserStatusDto;

export type AppUsersUpdateStatusResponse = boolean;

/**
 *  类型定义 [AppUsersDeleteRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersDeleteRequest = IdDto;

export type AppUsersDeleteResponse = boolean;

/**
 *  类型定义 [AppUsersRestoreRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersRestoreRequest = IdDto;

export type AppUsersRestoreResponse = boolean;

/**
 *  类型定义 [AppUsersRebuildFollowCountRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersRebuildFollowCountRequest = UserIdDto;

export type AppUsersRebuildFollowCountResponse =
  AdminAppUserFollowCountRepairResultDto;

export type AppUsersRebuildFollowCountAllResponse = boolean;

/**
 *  类型定义 [AppUsersPasswordResetRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersPasswordResetRequest = ResetAdminAppUserPasswordDto;

export type AppUsersPasswordResetResponse = boolean;

/**
 *  类型定义 [AppUsersPointsStatsRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersPointsStatsRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 用户id */
  userId: number;
};

export type AppUsersPointsStatsResponse = UserPointStatsFieldsDto;

/**
 *  类型定义 [AppUsersPointsRecordPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersPointsRecordPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: string;

  /* 排序字段，json格式 */
  orderBy?: string;

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 单页大小，最大500，默认15 */
  pageSize?: number;

  /* 关联的规则ID */
  ruleId?: number;

  /* 开始时间 */
  startDate?: string;

  /* 关联目标ID */
  targetId?: number;

  /* 关联目标类型 */
  targetType?: number;

  /* 用户 ID */
  userId: number;
};

export type AppUsersPointsRecordPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: AdminAppUserPointRecordDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [AppUsersPointsGrantRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersPointsGrantRequest = AdminAppUserGrowthRuleActionDto;

export type AppUsersPointsGrantResponse = boolean;

/**
 *  类型定义 [AppUsersPointsConsumeRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersPointsConsumeRequest = ConsumeAdminAppUserPointsDto;

export type AppUsersPointsConsumeResponse = boolean;

/**
 *  类型定义 [AppUsersExperienceStatsRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersExperienceStatsRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 用户id */
  userId: number;
};

export type AppUsersExperienceStatsResponse = AdminAppUserExperienceStatsDto;

/**
 *  类型定义 [AppUsersExperienceRecordPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersExperienceRecordPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 幂等业务键 */
  bizKey?: string;

  /* 经验变更方向（1=增加；2=减少） */
  deltaDirection?: number;

  /* 结束时间 */
  endDate?: string;

  /* 是否只看有关联规则的记录 */
  hasRule?: boolean;

  /* 最大经验变更值 */
  maxDelta?: number;

  /* 最小经验变更值 */
  minDelta?: number;

  /* 排序字段，json格式 */
  orderBy?: string;

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 单页大小，最大100，默认15 */
  pageSize?: number;

  /* 关联的规则ID */
  ruleId?: number;

  /* 成长记录关联的事件编码，直接复用统一事件定义编码。 */
  ruleType?: number;

  /* 账本来源（如 growth_rule、task_bonus、purchase） */
  source?: string;

  /* 开始时间 */
  startDate?: string;

  /* 关联目标ID */
  targetId?: number;

  /* 关联目标类型 */
  targetType?: number;

  /* 用户 ID */
  userId: number;
};

export type AppUsersExperienceRecordPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: AdminAppUserExperienceRecordDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [AppUsersGrowthRecordPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersGrowthRecordPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 资产类型（1=积分；2=经验） */
  assetType?: number;

  /* 结束时间 */
  endDate?: string;

  /* 排序字段，json格式 */
  orderBy?: string;

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 单页大小，最大500，默认15 */
  pageSize?: number;

  /* 关联的规则ID */
  ruleId?: number;

  /* 成长记录关联的事件编码，直接复用统一事件定义编码。 */
  ruleType?: number;

  /* 开始时间 */
  startDate?: string;

  /* 关联目标ID */
  targetId?: number;

  /* 关联目标类型 */
  targetType?: number;

  /* 用户id */
  userId: number;
};

export type AppUsersGrowthRecordPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: AdminAppUserGrowthLedgerRecordDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [AppUsersExperienceGrantRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersExperienceGrantRequest = AdminAppUserGrowthRuleActionDto;

export type AppUsersExperienceGrantResponse = boolean;

/**
 *  类型定义 [AppUsersBadgesPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersBadgesPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 业务域标识 */
  business?: string;

  /* 事件键 */
  eventKey?: string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 徽章名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: string;

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 单页大小，最大500，默认15 */
  pageSize?: number;

  /* 徽章类型（1=系统徽章；2=成就徽章；3=活动徽章） */
  type?: number;

  /* 用户id */
  userId: number;
};

export type AppUsersBadgesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: UserBadgeItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [AppUsersBadgesAssignRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersBadgesAssignRequest = AssignUserBadgeDto;

export type AppUsersBadgesAssignResponse = boolean;

/**
 *  类型定义 [AppUsersBadgesRevokeRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppUsersBadgesRevokeRequest = AssignUserBadgeDto;

export type AppUsersBadgesRevokeResponse = boolean;

/**
 *  类型定义 [AdminAppUserPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminAppUserPageItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 账号 */
  account: string;
  /* 头像URL */
  avatarUrl?: null | string;
  /* 封禁原因 */
  banReason?: null | string;
  /* 封禁到期时间 */
  banUntil?: null | string;
  /* 个人简介 */
  bio?: null | string;
  /* 出生日期 */
  birthDate?: null | string;
  /* 用户计数 */
  counts: AdminAppUserCountDto;
  /* 创建时间 */
  createdAt: string;
  /* 删除时间 */
  deletedAt?: null | string;
  /* 邮箱 */
  emailAddress?: null | string;
  /* 当前经验值 */
  experience: number;
  /* 性别（0=未知；1=男性；2=女性；3=其他；4=保密） */
  genderType: 0 | 1 | 2 | 3 | 4;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 最后登录时间 */
  lastLoginAt?: null | string;
  /* 最后登录IP */
  lastLoginIp?: null | string;
  /* 等级ID */
  levelId?: null | number;
  /* 等级名称 */
  levelName?: null | string;
  /* 昵称 */
  nickname: string;
  /* 手机号 */
  phoneNumber?: null | string;
  /* 当前积分 */
  points: number;
  /* 个人主页背景图片URL */
  profileBackgroundImageUrl?: null | string;
  /* 个性签名 */
  signature?: null | string;
  /* 用户状态（1=正常；2=禁言；3=永久禁言；4=封禁；5=永久封禁） */
  status: 1 | 2 | 3 | 4 | 5;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [AdminAppUserCountDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminAppUserCountDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 发出的评论总数 */
  commentCount: number;
  /* 评论收到的点赞总数 */
  commentReceivedLikeCount: number;
  /* 发出的收藏总数 */
  favoriteCount: number;
  /* 用户粉丝总数 */
  followersCount: number;
  /* 关注作者总数 */
  followingAuthorCount: number;
  /* 关注论坛话题总数 */
  followingHashtagCount: number;
  /* 关注板块总数 */
  followingSectionCount: number;
  /* 关注用户总数 */
  followingUserCount: number;
  /* 论坛主题数 */
  forumTopicCount: number;
  /* 论坛主题收到的收藏总数 */
  forumTopicReceivedFavoriteCount: number;
  /* 论坛主题收到的点赞总数 */
  forumTopicReceivedLikeCount: number;

  /* 发出的点赞总数 */
  likeCount: number;
};

/**
 *  类型定义 [AdminAppUserDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminAppUserDetailDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 账号 */
  account: string;
  /* 头像URL */
  avatarUrl?: null | string;
  /* 已拥有徽章数量 */
  badgeCount: number;
  /* 封禁原因 */
  banReason?: null | string;
  /* 封禁到期时间 */
  banUntil?: null | string;
  /* 个人简介 */
  bio?: null | string;
  /* 出生日期 */
  birthDate?: null | string;
  /* 用户计数 */
  counts?: AdminAppUserCountDto;
  /* 创建时间 */
  createdAt: string;
  /* 删除时间 */
  deletedAt?: null | string;
  /* 邮箱 */
  emailAddress?: null | string;
  /* 当前经验值 */
  experience: number;
  /* 经验统计 */
  experienceStats: AdminAppUserExperienceStatsDto;
  /* 性别（0=未知；1=男性；2=女性；3=其他；4=保密） */
  genderType: 0 | 1 | 2 | 3 | 4;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 最后登录时间 */
  lastLoginAt?: null | string;
  /* 最后登录IP */
  lastLoginIp?: null | string;
  /* 等级信息 */
  level?: AdminAppUserLevelDto;
  /* 等级ID */
  levelId?: null | number;
  /* 昵称 */
  nickname: string;
  /* 手机号 */
  phoneNumber?: null | string;
  /* 当前积分 */
  points: number;
  /* 积分统计 */
  pointStats: UserPointStatsFieldsDto;
  /* 个人主页背景图片URL */
  profileBackgroundImageUrl?: null | string;
  /* 个性签名 */
  signature?: null | string;
  /* 用户状态（1=正常；2=禁言；3=永久禁言；4=封禁；5=永久封禁） */
  status: 1 | 2 | 3 | 4 | 5;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [AdminAppUserLevelDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminAppUserLevelDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;
  /* 等级名称 */
  name: string;

  /* 所需经验值 */
  requiredExperience: number;
};

/**
 *  类型定义 [UserPointStatsFieldsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserPointStatsFieldsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前积分 */
  currentPoints: number;
  /* 今日消耗积分 */
  todayConsumed: number;

  /* 今日获得积分 */
  todayEarned: number;
};

/**
 *  类型定义 [AdminAppUserExperienceStatsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminAppUserExperienceStatsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前经验值 */
  currentExperience: number;
  /* 距离下一等级的经验差值 */
  gapToNextLevel?: null | number;
  /* 当前等级信息 */
  level?: AdminAppUserLevelDto;
  /* 下一等级信息 */
  nextLevel?: AdminAppUserLevelDto;

  /* 今日获得经验值 */
  todayEarned: number;
};

/**
 *  类型定义 [CreateAdminAppUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateAdminAppUserDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 头像URL */
  avatarUrl?: null | string;
  /* 个人简介 */
  bio?: null | string;
  /* 出生日期 */
  birthDate?: null | string;
  /* 邮箱 */
  emailAddress?: null | string;
  /* 性别（0=未知；1=男性；2=女性；3=其他；4=保密） */
  genderType?: 0 | 1 | 2 | 3 | 4;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 昵称 */
  nickname: string;
  /* 前端 RSA 加密后的密码 */
  password: string;
  /* 手机号 */
  phoneNumber?: null | string;
  /* 个人主页背景图片URL */
  profileBackgroundImageUrl?: null | string;
  /* 个性签名 */
  signature?: null | string;

  /* 用户状态（1=正常；2=禁言；3=永久禁言；4=封禁；5=永久封禁） */
  status?: 1 | 2 | 3 | 4 | 5;
};

/**
 *  类型定义 [UpdateAdminAppUserProfileDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateAdminAppUserProfileDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 头像URL */
  avatarUrl?: null | string;
  /* 个人简介 */
  bio?: null | string;
  /* 出生日期 */
  birthDate?: null | string;
  /* 邮箱 */
  emailAddress?: null | string;
  /* 性别（0=未知；1=男性；2=女性；3=其他；4=保密） */
  genderType?: 0 | 1 | 2 | 3 | 4;
  /* 主键id */
  id: number;
  /* 昵称 */
  nickname?: string;
  /* 手机号 */
  phoneNumber?: null | string;
  /* 个人主页背景图片URL */
  profileBackgroundImageUrl?: null | string;

  /* 个性签名 */
  signature?: null | string;
};

/**
 *  类型定义 [UpdateAdminAppUserEnabledDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateAdminAppUserEnabledDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否启用 */
  isEnabled: boolean;
};

/**
 *  类型定义 [UpdateAdminAppUserStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateAdminAppUserStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 封禁原因 */
  banReason?: null | string;
  /* 封禁到期时间 */
  banUntil?: null | string;
  /* 主键id */
  id: number;

  /* 用户状态（1=正常；2=禁言；3=永久禁言；4=封禁；5=永久封禁） */
  status: 1 | 2 | 3 | 4 | 5;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [UserIdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserIdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 用户id */
  userId: number;
};

/**
 *  类型定义 [AdminAppUserFollowCountRepairResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminAppUserFollowCountRepairResultDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 用户粉丝总数 */
  followersCount: number;
  /* 关注作者总数 */
  followingAuthorCount: number;
  /* 关注板块总数 */
  followingSectionCount: number;
  /* 关注用户总数 */
  followingUserCount: number;

  /* 用户id */
  userId: number;
};

/**
 *  类型定义 [ResetAdminAppUserPasswordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ResetAdminAppUserPasswordDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 前端 RSA 加密后的新密码 */
  password: string;
};

/**
 *  类型定义 [AdminAppUserPointRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminAppUserPointRecordDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 变化后积分 */
  afterPoints: number;
  /* 变化前积分 */
  beforePoints: number;
  /* 扩展上下文（仅返回白名单解释字段） */
  context?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 积分变化（正数为获得，负数为消费） */
  points: number;
  /* 账本说明文案 */
  remark?: null | string;
  /* 关联的规则ID */
  ruleId?: null | number;
  /* 成长记录关联的事件编码，直接复用统一事件定义编码。 */
  ruleType?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 16
    | 100
    | 101
    | 102
    | 103
    | 104
    | 200
    | 201
    | 202
    | 203
    | 204
    | 300
    | 301
    | 302
    | 303
    | 304
    | 305
    | 306
    | 400
    | 401
    | 402
    | 403
    | 404
    | 405
    | 406
    | 600
    | 601
    | 602
    | 700
    | 701
    | 702
    | 703
    | 800
    | 801
    | null;
  /* 关联目标ID */
  targetId?: null | number;
  /* 关联目标类型 */
  targetType?: null | number;

  /* 关联的用户ID */
  userId: number;
};

/**
 *  类型定义 [AdminAppUserGrowthRuleActionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminAppUserGrowthRuleActionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 人工操作稳定键，用于重试复用同一次补发请求 */
  operationKey: string;
  /* 内部操作备注，仅用于审计与排障，不会作为用户账本说明文案 */
  operationNote?: null | string;
  /* 人工操作目标规则类型，直接复用统一事件定义编码。 */
  ruleType:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 16
    | 100
    | 101
    | 102
    | 103
    | 104
    | 200
    | 201
    | 202
    | 203
    | 204
    | 300
    | 301
    | 302
    | 303
    | 304
    | 305
    | 306
    | 400
    | 401
    | 402
    | 403
    | 404
    | 405
    | 406
    | 600
    | 601
    | 602
    | 700
    | 701
    | 702
    | 703
    | 800
    | 801;

  /* 用户id */
  userId: number;
};

/**
 *  类型定义 [ConsumeAdminAppUserPointsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ConsumeAdminAppUserPointsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 关联兑换ID */
  exchangeId?: null | number;
  /* 人工操作稳定键，用于重试复用同一次补发请求 */
  operationKey: string;
  /* 内部操作备注，仅用于审计与排障，不会作为用户账本说明文案 */
  operationNote?: null | string;
  /* 消费积分数量 */
  points: number;
  /* 关联目标ID */
  targetId?: null | number;
  /* 关联目标类型（1=漫画；2=小说；3=漫画章节；4=小说章节；5=论坛主题） */
  targetType?: null | number;

  /* 用户id */
  userId: number;
};

/**
 *  类型定义 [AdminAppUserExperienceRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminAppUserExperienceRecordDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 变化后经验值 */
  afterExperience: number;
  /* 变化前经验值 */
  beforeExperience: number;
  /* 扩展上下文（仅返回白名单解释字段） */
  context?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 经验值变化 */
  experience: number;
  /* 主键id */
  id: number;
  /* 账本说明文案 */
  remark?: null | string;
  /* 关联的规则ID */
  ruleId?: null | number;
  /* 成长记录关联的事件编码，直接复用统一事件定义编码。 */
  ruleType?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 16
    | 100
    | 101
    | 102
    | 103
    | 104
    | 200
    | 201
    | 202
    | 203
    | 204
    | 300
    | 301
    | 302
    | 303
    | 304
    | 305
    | 306
    | 400
    | 401
    | 402
    | 403
    | 404
    | 405
    | 406
    | 600
    | 601
    | 602
    | 700
    | 701
    | 702
    | 703
    | 800
    | 801
    | null;
  /* 关联目标ID */
  targetId?: null | number;
  /* 关联目标类型 */
  targetType?: null | number;

  /* 关联的用户ID */
  userId: number;
};

/**
 *  类型定义 [AdminAppUserGrowthLedgerRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminAppUserGrowthLedgerRecordDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 变更后余额 */
  afterValue: number;
  /* 资产类型（1=积分；2=经验） */
  assetType: 1 | 2 | 3 | 4 | 5;
  /* 变更前余额 */
  beforeValue: number;
  /* 扩展上下文（仅返回白名单解释字段） */
  context?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 变更值（正数为发放，负数为扣减） */
  delta: number;
  /* 主键id */
  id: number;
  /* 账本说明文案 */
  remark?: null | string;
  /* 关联的规则ID */
  ruleId?: null | number;
  /* 成长记录关联的事件编码，直接复用统一事件定义编码。 */
  ruleType?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 16
    | 100
    | 101
    | 102
    | 103
    | 104
    | 200
    | 201
    | 202
    | 203
    | 204
    | 300
    | 301
    | 302
    | 303
    | 304
    | 305
    | 306
    | 400
    | 401
    | 402
    | 403
    | 404
    | 405
    | 406
    | 600
    | 601
    | 602
    | 700
    | 701
    | 702
    | 703
    | 800
    | 801
    | null;
  /* 关联目标ID */
  targetId?: null | number;
  /* 关联目标类型 */
  targetType?: null | number;
  /* 更新时间 */
  updatedAt?: null | string;

  /* 关联的用户ID */
  userId: number;
};

/**
 *  类型定义 [UserBadgeItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UserBadgeItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 徽章详情 */
  badge: BaseUserBadgeDto;

  /* 获得时间 */
  createdAt: string;
};

/**
 *  类型定义 [BaseUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseUserBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 业务域标识 */
  business?: null | string;
  /* 创建时间 */
  createdAt: string;
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
  type: 1 | 2 | 3;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [AssignUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AssignUserBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 徽章ID */
  badgeId: number;

  /* 用户ID */
  userId: number;
};
