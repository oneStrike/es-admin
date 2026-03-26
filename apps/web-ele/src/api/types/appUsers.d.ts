/**
 *  类型定义 [AppUsersPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersPageRequest = {
  /* 主键id */
  id?: number

  /* 账号 */
  account?: string

  /* 手机号 */
  phoneNumber?: string | null

  /* 邮箱 */
  emailAddress?: string | null

  /* 等级ID */
  levelId?: number | null

  /* 昵称 */
  nickname?: string

  /* 是否启用 */
  isEnabled?: boolean

  /* 用户状态（1=NORMAL，2=MUTED，3=PERMANENT_MUTED，4=BANNED，5=PERMANENT_BANNED） */
  status?: number

  /* 开始时间 */
  startDate?: string | null

  /* 结束时间 */
  endDate?: string | null

  /* 单页大小，最大500，默认15 */
  pageSize?: number | null

  /* 当前页码（从1开始） */
  pageIndex?: number | null

  /* 排序字段，json格式 */
  orderBy?: string | null

  /* 删除态筛选（active=未删除，deleted=已删除，all=全部） */
  deletedScope?: string | null

  /* 最后登录开始时间 */
  lastLoginStartDate?: string | null

  /* 最后登录结束时间 */
  lastLoginEndDate?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

export type AppUsersPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: AdminAppUserPageItemDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AppUsersDetailRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type AppUsersDetailResponse = AdminAppUserDetailDto

/**
 *  类型定义 [AppUsersCreateRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersCreateRequest = CreateAdminAppUserDto

export type AppUsersCreateResponse = boolean

/**
 *  类型定义 [AppUsersProfileUpdateRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersProfileUpdateRequest = UpdateAdminAppUserProfileDto

export type AppUsersProfileUpdateResponse = boolean

/**
 *  类型定义 [AppUsersUpdateEnabledRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersUpdateEnabledRequest = UpdateAdminAppUserEnabledDto

export type AppUsersUpdateEnabledResponse = boolean

/**
 *  类型定义 [AppUsersUpdateStatusRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersUpdateStatusRequest = UpdateAdminAppUserStatusDto

export type AppUsersUpdateStatusResponse = boolean

/**
 *  类型定义 [AppUsersDeleteRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersDeleteRequest = IdDto

export type AppUsersDeleteResponse = boolean

/**
 *  类型定义 [AppUsersRestoreRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersRestoreRequest = IdDto

export type AppUsersRestoreResponse = boolean

/**
 *  类型定义 [AppUsersRebuildFollowCountRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersRebuildFollowCountRequest = UserIdDto

export type AppUsersRebuildFollowCountResponse = AdminAppUserFollowCountRepairResultDto

export type AppUsersRebuildFollowCountAllResponse = boolean

/**
 *  类型定义 [AppUsersPasswordResetRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersPasswordResetRequest = ResetAdminAppUserPasswordDto

export type AppUsersPasswordResetResponse = boolean

/**
 *  类型定义 [AppUsersPointsStatsRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersPointsStatsRequest = {
  /* 用户id */
  userId: number

  /** 任意合法数值 */
  [property: string]: any
}

export type AppUsersPointsStatsResponse = AdminAppUserPointStatsDto

/**
 *  类型定义 [AppUsersPointsRecordPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersPointsRecordPageRequest = {
  /* 用户id */
  userId: number

  /* 开始时间 */
  startDate?: string | null

  /* 结束时间 */
  endDate?: string | null

  /* 单页大小，最大500，默认15 */
  pageSize?: number | null

  /* 当前页码（从1开始） */
  pageIndex?: number | null

  /* 排序字段，json格式 */
  orderBy?: string | null

  /* 关联的规则ID */
  ruleId?: number | null

  /* 关联目标类型 */
  targetType?: number | null

  /* 关联目标ID */
  targetId?: number | null

  /** 任意合法数值 */
  [property: string]: any
}

export type AppUsersPointsRecordPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: AdminAppUserPointRecordDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AppUsersPointsGrantRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersPointsGrantRequest = AddAdminAppUserPointsDto

export type AppUsersPointsGrantResponse = boolean

/**
 *  类型定义 [AppUsersPointsConsumeRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersPointsConsumeRequest = ConsumeAdminAppUserPointsDto

export type AppUsersPointsConsumeResponse = boolean

/**
 *  类型定义 [AppUsersExperienceStatsRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersExperienceStatsRequest = {
  /* 用户id */
  userId: number

  /** 任意合法数值 */
  [property: string]: any
}

export type AppUsersExperienceStatsResponse = AdminAppUserExperienceStatsDto

/**
 *  类型定义 [AppUsersExperienceRecordPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersExperienceRecordPageRequest = {
  /* 用户id */
  userId: number

  /* 开始时间 */
  startDate?: string | null

  /* 结束时间 */
  endDate?: string | null

  /* 单页大小，最大500，默认15 */
  pageSize?: number | null

  /* 当前页码（从1开始） */
  pageIndex?: number | null

  /* 排序字段，json格式 */
  orderBy?: string | null

  /* 关联的规则ID */
  ruleId?: number | null

  /** 任意合法数值 */
  [property: string]: any
}

export type AppUsersExperienceRecordPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: AdminAppUserExperienceRecordDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AppUsersExperienceGrantRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersExperienceGrantRequest = AddAdminAppUserExperienceDto

export type AppUsersExperienceGrantResponse = boolean

/**
 *  类型定义 [AppUsersBadgesPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersBadgesPageRequest = {
  /* 用户id */
  userId: number

  /* 开始时间 */
  startDate?: string | null

  /* 结束时间 */
  endDate?: string | null

  /* 单页大小，最大500，默认15 */
  pageSize?: number | null

  /* 当前页码（从1开始） */
  pageIndex?: number | null

  /* 排序字段，json格式 */
  orderBy?: string | null

  /* 徽章名称 */
  name?: string

  /* 业务域标识 */
  business?: string | null

  /* 事件键 */
  eventKey?: string | null

  /* 徽章类型（1=系统徽章, 2=成就徽章, 3=活动徽章） */
  type?: number

  /* 是否启用 */
  isEnabled?: boolean

  /** 任意合法数值 */
  [property: string]: any
}

export type AppUsersBadgesPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: AdminAppUserBadgeItemDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AppUsersBadgesAssignRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersBadgesAssignRequest = AssignAdminAppUserBadgeDto

export type AppUsersBadgesAssignResponse = boolean

/**
 *  类型定义 [AppUsersBadgesRevokeRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AppUsersBadgesRevokeRequest = AssignAdminAppUserBadgeDto

export type AppUsersBadgesRevokeResponse = boolean

/**
 *  类型定义 [AdminAppUserPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AdminAppUserPageItemDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 账号 */
  account: string
  /* 手机号 */
  phoneNumber?: string | null
  /* 邮箱 */
  emailAddress?: string | null
  /* 等级ID */
  levelId?: number | null
  /* 昵称 */
  nickname: string
  /* 头像URL */
  avatarUrl?: string | null
  /* 个性签名 */
  signature?: string | null
  /* 个人简介 */
  bio?: string | null
  /* 是否启用 */
  isEnabled: boolean
  /* 性别（0=未知，1=男，2=女，3=其他，4=保密） */
  genderType: 2 | 1 | 3 | 4 | 0
  /* 出生日期 */
  birthDate?: string | null
  /* 积分 */
  points: number
  /* 经验值 */
  experience: number
  /* 用户状态（1=NORMAL，2=MUTED，3=PERMANENT_MUTED，4=BANNED，5=PERMANENT_BANNED） */
  status: 1 | 2 | 3 | 4 | 5
  /* 封禁原因 */
  banReason?: string | null
  /* 封禁到期时间 */
  banUntil?: string | null
  /* 最后登录时间 */
  lastLoginAt?: string | null
  /* 最后登录IP */
  lastLoginIp?: string | null
  /* 删除时间（软删除） */
  deletedAt?: string | null
  /* 等级名称 */
  levelName?: string | null
  /* 用户计数 */
  counts: AdminAppUserCountDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminAppUserCountDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AdminAppUserCountDto = {
  /* 发出的评论总数 */
  commentCount: number
  /* 发出的点赞总数 */
  likeCount: number
  /* 发出的收藏总数 */
  favoriteCount: number
  /* 发起关注总数 */
  followingCount: number
  /* 粉丝总数 */
  followersCount: number
  /* 论坛主题数 */
  forumTopicCount: number
  /* 评论收到的点赞总数 */
  commentReceivedLikeCount: number
  /* 论坛主题收到的点赞总数 */
  forumTopicReceivedLikeCount: number
  /* 论坛主题收到的收藏总数 */
  forumTopicReceivedFavoriteCount: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminAppUserDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AdminAppUserDetailDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 账号 */
  account: string
  /* 手机号 */
  phoneNumber?: string | null
  /* 邮箱 */
  emailAddress?: string | null
  /* 等级ID */
  levelId?: number | null
  /* 昵称 */
  nickname: string
  /* 头像URL */
  avatarUrl?: string | null
  /* 个性签名 */
  signature?: string | null
  /* 个人简介 */
  bio?: string | null
  /* 是否启用 */
  isEnabled: boolean
  /* 性别（0=未知，1=男，2=女，3=其他，4=保密） */
  genderType: 2 | 1 | 3 | 4 | 0
  /* 出生日期 */
  birthDate?: string | null
  /* 积分 */
  points: number
  /* 经验值 */
  experience: number
  /* 用户状态（1=NORMAL，2=MUTED，3=PERMANENT_MUTED，4=BANNED，5=PERMANENT_BANNED） */
  status: 1 | 2 | 3 | 4 | 5
  /* 封禁原因 */
  banReason?: string | null
  /* 封禁到期时间 */
  banUntil?: string | null
  /* 最后登录时间 */
  lastLoginAt?: string | null
  /* 最后登录IP */
  lastLoginIp?: string | null
  /* 删除时间（软删除） */
  deletedAt?: string | null
  /* 等级信息 */
  level?: AdminAppUserLevelDto
  /* 用户计数 */
  counts?: AdminAppUserCountDto
  /* 已拥有徽章数量 */
  badgeCount: number
  /* 积分统计 */
  pointStats: AdminAppUserPointStatsDto
  /* 经验统计 */
  experienceStats: AdminAppUserExperienceStatsDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminAppUserLevelDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AdminAppUserLevelDto = {
  /* 主键id */
  id: number
  /* 等级名称 */
  name: string
  /* 所需经验值 */
  requiredExperience: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminAppUserPointStatsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AdminAppUserPointStatsDto = {
  /* 当前积分 */
  currentPoints: number
  /* 今日获得积分 */
  todayEarned: number
  /* 今日消耗积分 */
  todayConsumed: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminAppUserExperienceStatsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AdminAppUserExperienceStatsDto = {
  /* 当前经验值 */
  currentExperience: number
  /* 今日获得经验值 */
  todayEarned: number
  /* 当前等级信息 */
  level?: AdminAppUserLevelDto
  /* 下一等级信息 */
  nextLevel?: AdminAppUserLevelDto
  /* 距离下一等级的经验差值 */
  gapToNextLevel?: number | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CreateAdminAppUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type CreateAdminAppUserDto = {
  /* 昵称 */
  nickname: string
  /* 手机号 */
  phoneNumber?: string | null
  /* 邮箱 */
  emailAddress?: string | null
  /* 头像URL */
  avatarUrl?: string | null
  /* 个性签名 */
  signature?: string | null
  /* 个人简介 */
  bio?: string | null
  /* 是否启用 */
  isEnabled?: boolean
  /* 性别（0=未知，1=男，2=女，3=其他，4=保密） */
  genderType?: 2 | 1 | 3 | 4 | 0
  /* 出生日期 */
  birthDate?: string | null
  /* 用户状态（1=NORMAL，2=MUTED，3=PERMANENT_MUTED，4=BANNED，5=PERMANENT_BANNED） */
  status?: 1 | 2 | 3 | 4 | 5
  /* 前端 RSA 加密后的密码 */
  password: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateAdminAppUserProfileDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateAdminAppUserProfileDto = {
  /* 主键id */
  id: number
  /* 手机号 */
  phoneNumber?: string | null
  /* 邮箱 */
  emailAddress?: string | null
  /* 昵称 */
  nickname?: string
  /* 头像URL */
  avatarUrl?: string | null
  /* 个性签名 */
  signature?: string | null
  /* 个人简介 */
  bio?: string | null
  /* 性别（0=未知，1=男，2=女，3=其他，4=保密） */
  genderType?: 2 | 1 | 3 | 4 | 0
  /* 出生日期 */
  birthDate?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateAdminAppUserEnabledDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateAdminAppUserEnabledDto = {
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateAdminAppUserStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateAdminAppUserStatusDto = {
  /* 主键id */
  id: number
  /* 用户状态（1=NORMAL，2=MUTED，3=PERMANENT_MUTED，4=BANNED，5=PERMANENT_BANNED） */
  status: 1 | 2 | 3 | 4 | 5
  /* 封禁或禁言原因 */
  banReason?: string | null
  /* 封禁或禁言截止时间 */
  banUntil?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type IdDto = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UserIdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UserIdDto = {
  /* 用户id */
  userId: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminAppUserFollowCountRepairResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AdminAppUserFollowCountRepairResultDto = {
  /* 用户id */
  userId: number
  /* 发起关注总数 */
  followingCount: number
  /* 粉丝总数 */
  followersCount: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ResetAdminAppUserPasswordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type ResetAdminAppUserPasswordDto = {
  /* 主键id */
  id: number
  /* 前端 RSA 加密后的新密码 */
  password: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminAppUserPointRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AdminAppUserPointRecordDto = {
  /* 主键id */
  id: number
  /* 关联的用户ID */
  userId: number
  /* 关联的规则ID */
  ruleId?: number | null
  /* 关联目标类型 */
  targetType?: number | null
  /* 关联目标ID */
  targetId?: number | null
  /* 备注 */
  remark?: string | null
  /* 创建时间 */
  createdAt: string
  /* 积分变化（正数为获得，负数为消费） */
  points: number
  /* 变化前积分 */
  beforePoints: number
  /* 变化后积分 */
  afterPoints: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AddAdminAppUserPointsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AddAdminAppUserPointsDto = {
  /* 用户id */
  userId: number
  /* 规则类型（论坛：1=发表主题，2=发表回复，3=主题被点赞，4=回复被点赞，5=主题被收藏，6=每日签到，7=管理员操作，8=主题浏览，9=主题举报，10=发表评论，11=评论被点赞，12=评论被举报，16=主题被评论；漫画作品：100=浏览，101=点赞，102=收藏，103=举报，104=评论；小说作品：200=浏览，201=点赞，202=收藏，203=举报，204=评论；漫画章节：300=阅读，301=点赞，302=购买，303=下载，304=兑换，305=举报，306=评论；小说章节：400=阅读，401=点赞，402=购买，403=下载，404=兑换，405=举报，406=评论；徽章与成就：600=获得徽章，601=完善资料，602=上传头像；社交：700=关注用户，701=被关注，702=分享内容，703=邀请用户；举报处理：800=举报有效，801=举报无效） */
  ruleType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 16 | 10 | 11 | 12 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801
  /* 备注 */
  remark?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ConsumeAdminAppUserPointsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type ConsumeAdminAppUserPointsDto = {
  /* 用户id */
  userId: number
  /* 消费积分数量 */
  points: number
  /* 关联目标类型 */
  targetType?: number | null
  /* 关联目标ID */
  targetId?: number | null
  /* 关联兑换ID */
  exchangeId?: number | null
  /* 备注 */
  remark?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminAppUserExperienceRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AdminAppUserExperienceRecordDto = {
  /* 主键id */
  id: number
  /* 关联的用户ID */
  userId: number
  /* 关联的规则ID */
  ruleId?: number | null
  /* 备注 */
  remark?: string | null
  /* 创建时间 */
  createdAt: string
  /* 经验值变化 */
  experience: number
  /* 变化前经验值 */
  beforeExperience: number
  /* 变化后经验值 */
  afterExperience: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AddAdminAppUserExperienceDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AddAdminAppUserExperienceDto = {
  /* 用户id */
  userId: number
  /* 规则类型（论坛：1=发表主题，2=发表回复，3=主题被点赞，4=回复被点赞，5=主题被收藏，6=每日签到，7=管理员操作，8=主题浏览，9=主题举报，10=发表评论，11=评论被点赞，12=评论被举报，16=主题被评论；漫画作品：100=浏览，101=点赞，102=收藏，103=举报，104=评论；小说作品：200=浏览，201=点赞，202=收藏，203=举报，204=评论；漫画章节：300=阅读，301=点赞，302=购买，303=下载，304=兑换，305=举报，306=评论；小说章节：400=阅读，401=点赞，402=购买，403=下载，404=兑换，405=举报，406=评论；徽章与成就：600=获得徽章，601=完善资料，602=上传头像；社交：700=关注用户，701=被关注，702=分享内容，703=邀请用户；举报处理：800=举报有效，801=举报无效） */
  ruleType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 16 | 10 | 11 | 12 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801
  /* 备注 */
  remark?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminAppUserBadgeItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AdminAppUserBadgeItemDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 徽章信息 */
  badge: BaseUserBadgeDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type BaseUserBadgeDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 徽章名称 */
  name: string
  /* 徽章描述 */
  description: string
  /* 徽章图标URL */
  icon: string
  /* 业务域标识 */
  business?: string | null
  /* 事件键 */
  eventKey?: string | null
  /* 徽章类型（1=系统徽章, 2=成就徽章, 3=活动徽章） */
  type: 1 | 2 | 3
  /* 排序值（数值越小越靠前） */
  sortOrder: number
  /* 是否启用 */
  isEnabled: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AssignAdminAppUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AssignAdminAppUserBadgeDto = {
  /* 用户id */
  userId: number
  /* 徽章ID */
  badgeId: number

  /** 任意合法数值 */
  [property: string]: any
}