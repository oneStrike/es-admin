/**
 *  类型定义 [AppUsersPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 账号 */
  account?: string

  /* 删除态筛选（active=未删除，deleted=已删除，all=全部） */
  deletedScope?: null | string

  /* 邮箱 */
  emailAddress?: null | string

  /* 结束时间 */
  endDate?: null | string

  /* 主键id */
  id?: number

  /* 是否启用 */
  isEnabled?: boolean

  /* 最后登录结束时间 */
  lastLoginEndDate?: null | string

  /* 最后登录开始时间 */
  lastLoginStartDate?: null | string

  /* 等级ID */
  levelId?: null | number

  /* 昵称 */
  nickname?: string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 手机号 */
  phoneNumber?: null | string

  /* 开始时间 */
  startDate?: null | string

  /* 用户状态（1=NORMAL，2=MUTED，3=PERMANENT_MUTED，4=BANNED，5=PERMANENT_BANNED） */
  status?: number
}

export type AppUsersPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AdminAppUserPageItemDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [AppUsersDetailRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type AppUsersDetailResponse = AdminAppUserDetailDto

/**
 *  类型定义 [AppUsersCreateRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersCreateRequest = CreateAdminAppUserDto

export type AppUsersCreateResponse = boolean

/**
 *  类型定义 [AppUsersProfileUpdateRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersProfileUpdateRequest = UpdateAdminAppUserProfileDto

export type AppUsersProfileUpdateResponse = boolean

/**
 *  类型定义 [AppUsersUpdateEnabledRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersUpdateEnabledRequest = UpdateAdminAppUserEnabledDto

export type AppUsersUpdateEnabledResponse = boolean

/**
 *  类型定义 [AppUsersUpdateStatusRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersUpdateStatusRequest = UpdateAdminAppUserStatusDto

export type AppUsersUpdateStatusResponse = boolean

/**
 *  类型定义 [AppUsersDeleteRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersDeleteRequest = IdDto

export type AppUsersDeleteResponse = boolean

/**
 *  类型定义 [AppUsersRestoreRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersRestoreRequest = IdDto

export type AppUsersRestoreResponse = boolean

/**
 *  类型定义 [AppUsersRebuildFollowCountRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersRebuildFollowCountRequest = UserIdDto

export type AppUsersRebuildFollowCountResponse = AdminAppUserFollowCountRepairResultDto

export type AppUsersRebuildFollowCountAllResponse = boolean

/**
 *  类型定义 [AppUsersPasswordResetRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersPasswordResetRequest = ResetAdminAppUserPasswordDto

export type AppUsersPasswordResetResponse = boolean

/**
 *  类型定义 [AppUsersPointsStatsRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersPointsStatsRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 用户id */
  userId: number
}

export type AppUsersPointsStatsResponse = AdminAppUserPointStatsDto

/**
 *  类型定义 [AppUsersPointsRecordPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersPointsRecordPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 关联的规则ID */
  ruleId?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 关联目标ID */
  targetId?: null | number

  /* 关联目标类型 */
  targetType?: null | number

  /* 用户id */
  userId: number
}

export type AppUsersPointsRecordPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AdminAppUserPointRecordDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [AppUsersPointsGrantRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersPointsGrantRequest = AddAdminAppUserPointsDto

export type AppUsersPointsGrantResponse = boolean

/**
 *  类型定义 [AppUsersPointsConsumeRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersPointsConsumeRequest = ConsumeAdminAppUserPointsDto

export type AppUsersPointsConsumeResponse = boolean

/**
 *  类型定义 [AppUsersExperienceStatsRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersExperienceStatsRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 用户id */
  userId: number
}

export type AppUsersExperienceStatsResponse = AdminAppUserExperienceStatsDto

/**
 *  类型定义 [AppUsersExperienceRecordPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersExperienceRecordPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 关联的规则ID */
  ruleId?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 用户id */
  userId: number
}

export type AppUsersExperienceRecordPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AdminAppUserExperienceRecordDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [AppUsersGrowthRecordPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersGrowthRecordPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 资产类型（1=POINTS，2=EXPERIENCE） */
  assetType?: number

  /* 结束时间 */
  endDate?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 关联的规则ID */
  ruleId?: null | number

  /* 成长规则类型。完整编码、语义、治理态与实现状态以 EventDefinitionMap / EventDefinitionService 为唯一事实源。 账本与历史记录展示可能包含 implemented / declared / legacy_compat 三类事件编码。（1=CREATE_TOPIC，2=CREATE_REPLY，3=TOPIC_LIKED，4=REPLY_LIKED，5=TOPIC_FAVORITED，6=DAILY_CHECK_IN，7=ADMIN，8=TOPIC_VIEW，9=TOPIC_REPORT，16=TOPIC_COMMENT，10=CREATE_COMMENT，11=COMMENT_LIKED，12=COMMENT_REPORT，100=COMIC_WORK_VIEW，101=COMIC_WORK_LIKE，102=COMIC_WORK_FAVORITE，103=COMIC_WORK_REPORT，104=COMIC_WORK_COMMENT，200=NOVEL_WORK_VIEW，201=NOVEL_WORK_LIKE，202=NOVEL_WORK_FAVORITE，203=NOVEL_WORK_REPORT，204=NOVEL_WORK_COMMENT，300=COMIC_CHAPTER_READ，301=COMIC_CHAPTER_LIKE，302=COMIC_CHAPTER_PURCHASE，303=COMIC_CHAPTER_DOWNLOAD，304=COMIC_CHAPTER_EXCHANGE，305=COMIC_CHAPTER_REPORT，306=COMIC_CHAPTER_COMMENT，400=NOVEL_CHAPTER_READ，401=NOVEL_CHAPTER_LIKE，402=NOVEL_CHAPTER_PURCHASE，403=NOVEL_CHAPTER_DOWNLOAD，404=NOVEL_CHAPTER_EXCHANGE，405=NOVEL_CHAPTER_REPORT，406=NOVEL_CHAPTER_COMMENT，600=BADGE_EARNED，601=PROFILE_COMPLETE，602=AVATAR_UPLOAD，700=FOLLOW_USER，701=BE_FOLLOWED，702=SHARE_CONTENT，703=INVITE_USER，800=REPORT_VALID，801=REPORT_INVALID） */
  ruleType?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 关联目标ID */
  targetId?: null | number

  /* 关联目标类型 */
  targetType?: null | number

  /* 用户id */
  userId: number
}

export type AppUsersGrowthRecordPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AdminAppUserGrowthLedgerRecordDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [AppUsersExperienceGrantRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersExperienceGrantRequest = AddAdminAppUserExperienceDto

export type AppUsersExperienceGrantResponse = boolean

/**
 *  类型定义 [AppUsersBadgesPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersBadgesPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 业务域标识 */
  business?: null | string

  /* 结束时间 */
  endDate?: null | string

  /* 事件键 */
  eventKey?: null | string

  /* 是否启用 */
  isEnabled?: boolean

  /* 徽章名称 */
  name?: string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 徽章类型（1=系统徽章, 2=成就徽章, 3=活动徽章） */
  type?: number

  /* 用户id */
  userId: number
}

export type AppUsersBadgesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AdminAppUserBadgeItemDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [AppUsersBadgesAssignRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersBadgesAssignRequest = AssignAdminAppUserBadgeDto

export type AppUsersBadgesAssignResponse = boolean

/**
 *  类型定义 [AppUsersBadgesRevokeRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-04-02 09:03:22
 */
export type AppUsersBadgesRevokeRequest = AssignAdminAppUserBadgeDto

export type AppUsersBadgesRevokeResponse = boolean

/**
 *  类型定义 [AdminAppUserPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type AdminAppUserPageItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 账号 */
  account: string
  /* 头像URL */
  avatarUrl?: null | string
  /* 封禁原因 */
  banReason?: null | string
  /* 封禁到期时间 */
  banUntil?: null | string
  /* 个人简介 */
  bio?: null | string
  /* 出生日期 */
  birthDate?: null | string
  /* 用户计数 */
  counts: AdminAppUserCountDto
  /* 创建时间 */
  createdAt: string
  /* 删除时间（软删除） */
  deletedAt?: null | string
  /* 邮箱 */
  emailAddress?: null | string
  /* 经验值 */
  experience: number
  /* 性别（0=未知，1=男，2=女，3=其他，4=保密） */
  genderType: 0 | 1 | 2 | 3 | 4
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 最后登录时间 */
  lastLoginAt?: null | string
  /* 最后登录IP */
  lastLoginIp?: null | string
  /* 等级ID */
  levelId?: null | number
  /* 等级名称 */
  levelName?: null | string
  /* 昵称 */
  nickname: string
  /* 手机号 */
  phoneNumber?: null | string
  /* 积分 */
  points: number
  /* 个性签名 */
  signature?: null | string
  /* 用户状态（1=NORMAL，2=MUTED，3=PERMANENT_MUTED，4=BANNED，5=PERMANENT_BANNED） */
  status: 1 | 2 | 3 | 4 | 5

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [AdminAppUserCountDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type AdminAppUserCountDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 发出的评论总数 */
  commentCount: number
  /* 评论收到的点赞总数 */
  commentReceivedLikeCount: number
  /* 发出的收藏总数 */
  favoriteCount: number
  /* 用户粉丝总数 */
  followersCount: number
  /* 关注作者总数 */
  followingAuthorCount: number
  /* 关注板块总数 */
  followingSectionCount: number
  /* 关注用户总数 */
  followingUserCount: number
  /* 论坛主题数 */
  forumTopicCount: number
  /* 论坛主题收到的收藏总数 */
  forumTopicReceivedFavoriteCount: number
  /* 论坛主题收到的点赞总数 */
  forumTopicReceivedLikeCount: number

  /* 发出的点赞总数 */
  likeCount: number
}

/**
 *  类型定义 [AdminAppUserDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type AdminAppUserDetailDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 账号 */
  account: string
  /* 头像URL */
  avatarUrl?: null | string
  /* 已拥有徽章数量 */
  badgeCount: number
  /* 封禁原因 */
  banReason?: null | string
  /* 封禁到期时间 */
  banUntil?: null | string
  /* 个人简介 */
  bio?: null | string
  /* 出生日期 */
  birthDate?: null | string
  /* 用户计数 */
  counts?: AdminAppUserCountDto
  /* 创建时间 */
  createdAt: string
  /* 删除时间（软删除） */
  deletedAt?: null | string
  /* 邮箱 */
  emailAddress?: null | string
  /* 经验值 */
  experience: number
  /* 经验统计 */
  experienceStats: AdminAppUserExperienceStatsDto
  /* 性别（0=未知，1=男，2=女，3=其他，4=保密） */
  genderType: 0 | 1 | 2 | 3 | 4
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 最后登录时间 */
  lastLoginAt?: null | string
  /* 最后登录IP */
  lastLoginIp?: null | string
  /* 等级信息 */
  level?: AdminAppUserLevelDto
  /* 等级ID */
  levelId?: null | number
  /* 昵称 */
  nickname: string
  /* 手机号 */
  phoneNumber?: null | string
  /* 积分 */
  points: number
  /* 积分统计 */
  pointStats: AdminAppUserPointStatsDto
  /* 个性签名 */
  signature?: null | string
  /* 用户状态（1=NORMAL，2=MUTED，3=PERMANENT_MUTED，4=BANNED，5=PERMANENT_BANNED） */
  status: 1 | 2 | 3 | 4 | 5

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [AdminAppUserLevelDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type AdminAppUserLevelDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number
  /* 等级名称 */
  name: string

  /* 所需经验值 */
  requiredExperience: number
}

/**
 *  类型定义 [AdminAppUserPointStatsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type AdminAppUserPointStatsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 当前积分 */
  currentPoints: number
  /* 今日消耗积分 */
  todayConsumed: number

  /* 今日获得积分 */
  todayEarned: number
}

/**
 *  类型定义 [AdminAppUserExperienceStatsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type AdminAppUserExperienceStatsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 当前经验值 */
  currentExperience: number
  /* 距离下一等级的经验差值 */
  gapToNextLevel?: null | number
  /* 当前等级信息 */
  level?: AdminAppUserLevelDto
  /* 下一等级信息 */
  nextLevel?: AdminAppUserLevelDto

  /* 今日获得经验值 */
  todayEarned: number
}

/**
 *  类型定义 [CreateAdminAppUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type CreateAdminAppUserDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 头像URL */
  avatarUrl?: null | string
  /* 个人简介 */
  bio?: null | string
  /* 出生日期 */
  birthDate?: null | string
  /* 邮箱 */
  emailAddress?: null | string
  /* 性别（0=未知，1=男，2=女，3=其他，4=保密） */
  genderType?: 0 | 1 | 2 | 3 | 4
  /* 是否启用 */
  isEnabled?: boolean
  /* 昵称 */
  nickname: string
  /* 前端 RSA 加密后的密码 */
  password: string
  /* 手机号 */
  phoneNumber?: null | string
  /* 个性签名 */
  signature?: null | string

  /* 用户状态（1=NORMAL，2=MUTED，3=PERMANENT_MUTED，4=BANNED，5=PERMANENT_BANNED） */
  status?: 1 | 2 | 3 | 4 | 5
}

/**
 *  类型定义 [UpdateAdminAppUserProfileDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type UpdateAdminAppUserProfileDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 头像URL */
  avatarUrl?: null | string
  /* 个人简介 */
  bio?: null | string
  /* 出生日期 */
  birthDate?: null | string
  /* 邮箱 */
  emailAddress?: null | string
  /* 性别（0=未知，1=男，2=女，3=其他，4=保密） */
  genderType?: 0 | 1 | 2 | 3 | 4
  /* 主键id */
  id: number
  /* 昵称 */
  nickname?: string
  /* 手机号 */
  phoneNumber?: null | string

  /* 个性签名 */
  signature?: null | string
}

/**
 *  类型定义 [UpdateAdminAppUserEnabledDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type UpdateAdminAppUserEnabledDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否启用 */
  isEnabled: boolean
}

/**
 *  类型定义 [UpdateAdminAppUserStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type UpdateAdminAppUserStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 封禁或禁言原因 */
  banReason?: null | string
  /* 封禁或禁言截止时间 */
  banUntil?: null | string
  /* 主键id */
  id: number

  /* 用户状态（1=NORMAL，2=MUTED，3=PERMANENT_MUTED，4=BANNED，5=PERMANENT_BANNED） */
  status: 1 | 2 | 3 | 4 | 5
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

/**
 *  类型定义 [UserIdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type UserIdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 用户id */
  userId: number
}

/**
 *  类型定义 [AdminAppUserFollowCountRepairResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type AdminAppUserFollowCountRepairResultDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 用户粉丝总数 */
  followersCount: number
  /* 关注作者总数 */
  followingAuthorCount: number
  /* 关注板块总数 */
  followingSectionCount: number
  /* 关注用户总数 */
  followingUserCount: number

  /* 用户id */
  userId: number
}

/**
 *  类型定义 [ResetAdminAppUserPasswordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type ResetAdminAppUserPasswordDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 前端 RSA 加密后的新密码 */
  password: string
}

/**
 *  类型定义 [AdminAppUserPointRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type AdminAppUserPointRecordDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 变化后积分 */
  afterPoints: number
  /* 变化前积分 */
  beforePoints: number
  /* 幂等业务键 */
  bizKey: string
  /* 扩展上下文（仅返回白名单解释字段） */
  context?: null | string
  /* 创建时间 */
  createdAt: string
  /* 主键id */
  id: number
  /* 积分变化（正数为获得，负数为消费） */
  points: number
  /* 备注 */
  remark?: null | string
  /* 关联的规则ID */
  ruleId?: null | number
  /* 成长规则类型。完整编码、语义、治理态与实现状态以 EventDefinitionMap / EventDefinitionService 为唯一事实源。 账本与历史记录展示可能包含 implemented / declared / legacy_compat 三类事件编码。（1=CREATE_TOPIC，2=CREATE_REPLY，3=TOPIC_LIKED，4=REPLY_LIKED，5=TOPIC_FAVORITED，6=DAILY_CHECK_IN，7=ADMIN，8=TOPIC_VIEW，9=TOPIC_REPORT，16=TOPIC_COMMENT，10=CREATE_COMMENT，11=COMMENT_LIKED，12=COMMENT_REPORT，100=COMIC_WORK_VIEW，101=COMIC_WORK_LIKE，102=COMIC_WORK_FAVORITE，103=COMIC_WORK_REPORT，104=COMIC_WORK_COMMENT，200=NOVEL_WORK_VIEW，201=NOVEL_WORK_LIKE，202=NOVEL_WORK_FAVORITE，203=NOVEL_WORK_REPORT，204=NOVEL_WORK_COMMENT，300=COMIC_CHAPTER_READ，301=COMIC_CHAPTER_LIKE，302=COMIC_CHAPTER_PURCHASE，303=COMIC_CHAPTER_DOWNLOAD，304=COMIC_CHAPTER_EXCHANGE，305=COMIC_CHAPTER_REPORT，306=COMIC_CHAPTER_COMMENT，400=NOVEL_CHAPTER_READ，401=NOVEL_CHAPTER_LIKE，402=NOVEL_CHAPTER_PURCHASE，403=NOVEL_CHAPTER_DOWNLOAD，404=NOVEL_CHAPTER_EXCHANGE，405=NOVEL_CHAPTER_REPORT，406=NOVEL_CHAPTER_COMMENT，600=BADGE_EARNED，601=PROFILE_COMPLETE，602=AVATAR_UPLOAD，700=FOLLOW_USER，701=BE_FOLLOWED，702=SHARE_CONTENT，703=INVITE_USER，800=REPORT_VALID，801=REPORT_INVALID） */
  ruleType?: null | number
  /* 关联目标ID */
  targetId?: null | number
  /* 关联目标类型 */
  targetType?: null | number

  /* 关联的用户ID */
  userId: number
}

/**
 *  类型定义 [AddAdminAppUserPointsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type AddAdminAppUserPointsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 人工操作稳定键，用于重试复用同一次补发请求 */
  operationKey: string
  /* 备注 */
  remark?: null | string
  /* 成长规则类型。完整编码、语义、治理态与实现状态以 EventDefinitionMap / EventDefinitionService 为唯一事实源。 管理端人工补发通常建议使用 ADMIN；若补录治理结果，请使用当前正式事件编码，而不要继续使用历史兼容 *_REPORT。（1=CREATE_TOPIC，2=CREATE_REPLY，3=TOPIC_LIKED，4=REPLY_LIKED，5=TOPIC_FAVORITED，6=DAILY_CHECK_IN，7=ADMIN，8=TOPIC_VIEW，9=TOPIC_REPORT，16=TOPIC_COMMENT，10=CREATE_COMMENT，11=COMMENT_LIKED，12=COMMENT_REPORT，100=COMIC_WORK_VIEW，101=COMIC_WORK_LIKE，102=COMIC_WORK_FAVORITE，103=COMIC_WORK_REPORT，104=COMIC_WORK_COMMENT，200=NOVEL_WORK_VIEW，201=NOVEL_WORK_LIKE，202=NOVEL_WORK_FAVORITE，203=NOVEL_WORK_REPORT，204=NOVEL_WORK_COMMENT，300=COMIC_CHAPTER_READ，301=COMIC_CHAPTER_LIKE，302=COMIC_CHAPTER_PURCHASE，303=COMIC_CHAPTER_DOWNLOAD，304=COMIC_CHAPTER_EXCHANGE，305=COMIC_CHAPTER_REPORT，306=COMIC_CHAPTER_COMMENT，400=NOVEL_CHAPTER_READ，401=NOVEL_CHAPTER_LIKE，402=NOVEL_CHAPTER_PURCHASE，403=NOVEL_CHAPTER_DOWNLOAD，404=NOVEL_CHAPTER_EXCHANGE，405=NOVEL_CHAPTER_REPORT，406=NOVEL_CHAPTER_COMMENT，600=BADGE_EARNED，601=PROFILE_COMPLETE，602=AVATAR_UPLOAD，700=FOLLOW_USER，701=BE_FOLLOWED，702=SHARE_CONTENT，703=INVITE_USER，800=REPORT_VALID，801=REPORT_INVALID） */
  ruleType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801

  /* 用户id */
  userId: number
}

/**
 *  类型定义 [ConsumeAdminAppUserPointsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type ConsumeAdminAppUserPointsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 关联兑换ID */
  exchangeId?: null | number
  /* 人工操作稳定键，用于重试复用同一次补发请求 */
  operationKey: string
  /* 消费积分数量 */
  points: number
  /* 备注 */
  remark?: null | string
  /* 关联目标ID */
  targetId?: null | number
  /* 关联目标类型 */
  targetType?: null | number

  /* 用户id */
  userId: number
}

/**
 *  类型定义 [AdminAppUserExperienceRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type AdminAppUserExperienceRecordDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 变化后经验值 */
  afterExperience: number
  /* 变化前经验值 */
  beforeExperience: number
  /* 幂等业务键 */
  bizKey: string
  /* 扩展上下文（仅返回白名单解释字段） */
  context?: null | string
  /* 创建时间 */
  createdAt: string
  /* 经验值变化 */
  experience: number
  /* 主键id */
  id: number
  /* 备注 */
  remark?: null | string
  /* 关联的规则ID */
  ruleId?: null | number
  /* 成长规则类型。完整编码、语义、治理态与实现状态以 EventDefinitionMap / EventDefinitionService 为唯一事实源。 账本与历史记录展示可能包含 implemented / declared / legacy_compat 三类事件编码。（1=CREATE_TOPIC，2=CREATE_REPLY，3=TOPIC_LIKED，4=REPLY_LIKED，5=TOPIC_FAVORITED，6=DAILY_CHECK_IN，7=ADMIN，8=TOPIC_VIEW，9=TOPIC_REPORT，16=TOPIC_COMMENT，10=CREATE_COMMENT，11=COMMENT_LIKED，12=COMMENT_REPORT，100=COMIC_WORK_VIEW，101=COMIC_WORK_LIKE，102=COMIC_WORK_FAVORITE，103=COMIC_WORK_REPORT，104=COMIC_WORK_COMMENT，200=NOVEL_WORK_VIEW，201=NOVEL_WORK_LIKE，202=NOVEL_WORK_FAVORITE，203=NOVEL_WORK_REPORT，204=NOVEL_WORK_COMMENT，300=COMIC_CHAPTER_READ，301=COMIC_CHAPTER_LIKE，302=COMIC_CHAPTER_PURCHASE，303=COMIC_CHAPTER_DOWNLOAD，304=COMIC_CHAPTER_EXCHANGE，305=COMIC_CHAPTER_REPORT，306=COMIC_CHAPTER_COMMENT，400=NOVEL_CHAPTER_READ，401=NOVEL_CHAPTER_LIKE，402=NOVEL_CHAPTER_PURCHASE，403=NOVEL_CHAPTER_DOWNLOAD，404=NOVEL_CHAPTER_EXCHANGE，405=NOVEL_CHAPTER_REPORT，406=NOVEL_CHAPTER_COMMENT，600=BADGE_EARNED，601=PROFILE_COMPLETE，602=AVATAR_UPLOAD，700=FOLLOW_USER，701=BE_FOLLOWED，702=SHARE_CONTENT，703=INVITE_USER，800=REPORT_VALID，801=REPORT_INVALID） */
  ruleType?: null | number
  /* 关联目标ID */
  targetId?: null | number
  /* 关联目标类型 */
  targetType?: null | number

  /* 关联的用户ID */
  userId: number
}

/**
 *  类型定义 [AdminAppUserGrowthLedgerRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type AdminAppUserGrowthLedgerRecordDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 变更后余额 */
  afterValue: number
  /* 资产类型（1=POINTS，2=EXPERIENCE） */
  assetType: 1 | 2
  /* 变更前余额 */
  beforeValue: number
  /* 幂等业务键 */
  bizKey: string
  /* 扩展上下文（仅返回白名单解释字段） */
  context?: null | string
  /* 创建时间 */
  createdAt: string
  /* 变更值（正数为发放，负数为扣减） */
  delta: number
  /* 主键id */
  id: number
  /* 备注 */
  remark?: null | string
  /* 关联的规则ID */
  ruleId?: null | number
  /* 成长规则类型。完整编码、语义、治理态与实现状态以 EventDefinitionMap / EventDefinitionService 为唯一事实源。 账本与历史记录展示可能包含 implemented / declared / legacy_compat 三类事件编码。（1=CREATE_TOPIC，2=CREATE_REPLY，3=TOPIC_LIKED，4=REPLY_LIKED，5=TOPIC_FAVORITED，6=DAILY_CHECK_IN，7=ADMIN，8=TOPIC_VIEW，9=TOPIC_REPORT，16=TOPIC_COMMENT，10=CREATE_COMMENT，11=COMMENT_LIKED，12=COMMENT_REPORT，100=COMIC_WORK_VIEW，101=COMIC_WORK_LIKE，102=COMIC_WORK_FAVORITE，103=COMIC_WORK_REPORT，104=COMIC_WORK_COMMENT，200=NOVEL_WORK_VIEW，201=NOVEL_WORK_LIKE，202=NOVEL_WORK_FAVORITE，203=NOVEL_WORK_REPORT，204=NOVEL_WORK_COMMENT，300=COMIC_CHAPTER_READ，301=COMIC_CHAPTER_LIKE，302=COMIC_CHAPTER_PURCHASE，303=COMIC_CHAPTER_DOWNLOAD，304=COMIC_CHAPTER_EXCHANGE，305=COMIC_CHAPTER_REPORT，306=COMIC_CHAPTER_COMMENT，400=NOVEL_CHAPTER_READ，401=NOVEL_CHAPTER_LIKE，402=NOVEL_CHAPTER_PURCHASE，403=NOVEL_CHAPTER_DOWNLOAD，404=NOVEL_CHAPTER_EXCHANGE，405=NOVEL_CHAPTER_REPORT，406=NOVEL_CHAPTER_COMMENT，600=BADGE_EARNED，601=PROFILE_COMPLETE，602=AVATAR_UPLOAD，700=FOLLOW_USER，701=BE_FOLLOWED，702=SHARE_CONTENT，703=INVITE_USER，800=REPORT_VALID，801=REPORT_INVALID） */
  ruleType?: null | number
  /* 关联目标ID */
  targetId?: null | number
  /* 关联目标类型 */
  targetType?: null | number

  /* 关联的用户ID */
  userId: number
}

/**
 *  类型定义 [AddAdminAppUserExperienceDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type AddAdminAppUserExperienceDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 人工操作稳定键，用于重试复用同一次补发请求 */
  operationKey: string
  /* 备注 */
  remark?: null | string
  /* 成长规则类型。完整编码、语义、治理态与实现状态以 EventDefinitionMap / EventDefinitionService 为唯一事实源。 管理端人工补发通常建议使用 ADMIN；若补录治理结果，请使用当前正式事件编码，而不要继续使用历史兼容 *_REPORT。（1=CREATE_TOPIC，2=CREATE_REPLY，3=TOPIC_LIKED，4=REPLY_LIKED，5=TOPIC_FAVORITED，6=DAILY_CHECK_IN，7=ADMIN，8=TOPIC_VIEW，9=TOPIC_REPORT，16=TOPIC_COMMENT，10=CREATE_COMMENT，11=COMMENT_LIKED，12=COMMENT_REPORT，100=COMIC_WORK_VIEW，101=COMIC_WORK_LIKE，102=COMIC_WORK_FAVORITE，103=COMIC_WORK_REPORT，104=COMIC_WORK_COMMENT，200=NOVEL_WORK_VIEW，201=NOVEL_WORK_LIKE，202=NOVEL_WORK_FAVORITE，203=NOVEL_WORK_REPORT，204=NOVEL_WORK_COMMENT，300=COMIC_CHAPTER_READ，301=COMIC_CHAPTER_LIKE，302=COMIC_CHAPTER_PURCHASE，303=COMIC_CHAPTER_DOWNLOAD，304=COMIC_CHAPTER_EXCHANGE，305=COMIC_CHAPTER_REPORT，306=COMIC_CHAPTER_COMMENT，400=NOVEL_CHAPTER_READ，401=NOVEL_CHAPTER_LIKE，402=NOVEL_CHAPTER_PURCHASE，403=NOVEL_CHAPTER_DOWNLOAD，404=NOVEL_CHAPTER_EXCHANGE，405=NOVEL_CHAPTER_REPORT，406=NOVEL_CHAPTER_COMMENT，600=BADGE_EARNED，601=PROFILE_COMPLETE，602=AVATAR_UPLOAD，700=FOLLOW_USER，701=BE_FOLLOWED，702=SHARE_CONTENT，703=INVITE_USER，800=REPORT_VALID，801=REPORT_INVALID） */
  ruleType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801

  /* 用户id */
  userId: number
}

/**
 *  类型定义 [AdminAppUserBadgeItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type AdminAppUserBadgeItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 徽章信息 */
  badge: BaseUserBadgeDto

  /* 创建时间 */
  createdAt: string
}

/**
 *  类型定义 [BaseUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type BaseUserBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 业务域标识 */
  business?: null | string
  /* 创建时间 */
  createdAt: string
  /* 徽章描述 */
  description: string
  /* 事件键 */
  eventKey?: null | string
  /* 徽章图标URL */
  icon: string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 徽章名称 */
  name: string
  /* 排序值（数值越小越靠前） */
  sortOrder: number
  /* 徽章类型（1=系统徽章, 2=成就徽章, 3=活动徽章） */
  type: 1 | 2 | 3

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [AssignAdminAppUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 09:03:22
 */
export type AssignAdminAppUserBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 徽章ID */
  badgeId: number

  /* 用户id */
  userId: number
}