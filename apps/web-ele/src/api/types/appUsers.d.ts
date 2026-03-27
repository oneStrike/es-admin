/**
 *  类型定义 [AppUsersPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
 */
export type AppUsersCreateRequest = CreateAdminAppUserDto

export type AppUsersCreateResponse = boolean

/**
 *  类型定义 [AppUsersProfileUpdateRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-27 21:17:41
 */
export type AppUsersProfileUpdateRequest = UpdateAdminAppUserProfileDto

export type AppUsersProfileUpdateResponse = boolean

/**
 *  类型定义 [AppUsersUpdateEnabledRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-27 21:17:41
 */
export type AppUsersUpdateEnabledRequest = UpdateAdminAppUserEnabledDto

export type AppUsersUpdateEnabledResponse = boolean

/**
 *  类型定义 [AppUsersUpdateStatusRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-27 21:17:41
 */
export type AppUsersUpdateStatusRequest = UpdateAdminAppUserStatusDto

export type AppUsersUpdateStatusResponse = boolean

/**
 *  类型定义 [AppUsersDeleteRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-27 21:17:41
 */
export type AppUsersDeleteRequest = IdDto

export type AppUsersDeleteResponse = boolean

/**
 *  类型定义 [AppUsersRestoreRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-27 21:17:41
 */
export type AppUsersRestoreRequest = IdDto

export type AppUsersRestoreResponse = boolean

/**
 *  类型定义 [AppUsersRebuildFollowCountRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-27 21:17:41
 */
export type AppUsersRebuildFollowCountRequest = UserIdDto

export type AppUsersRebuildFollowCountResponse = AdminAppUserFollowCountRepairResultDto

export type AppUsersRebuildFollowCountAllResponse = boolean

/**
 *  类型定义 [AppUsersPasswordResetRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-27 21:17:41
 */
export type AppUsersPasswordResetRequest = ResetAdminAppUserPasswordDto

export type AppUsersPasswordResetResponse = boolean

/**
 *  类型定义 [AppUsersPointsStatsRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
 */
export type AppUsersPointsGrantRequest = AddAdminAppUserPointsDto

export type AppUsersPointsGrantResponse = boolean

/**
 *  类型定义 [AppUsersPointsConsumeRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-27 21:17:41
 */
export type AppUsersPointsConsumeRequest = ConsumeAdminAppUserPointsDto

export type AppUsersPointsConsumeResponse = boolean

/**
 *  类型定义 [AppUsersExperienceStatsRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
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
 *  类型定义 [AppUsersExperienceGrantRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-27 21:17:41
 */
export type AppUsersExperienceGrantRequest = AddAdminAppUserExperienceDto

export type AppUsersExperienceGrantResponse = boolean

/**
 *  类型定义 [AppUsersBadgesPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
 */
export type AppUsersBadgesAssignRequest = AssignAdminAppUserBadgeDto

export type AppUsersBadgesAssignResponse = boolean

/**
 *  类型定义 [AppUsersBadgesRevokeRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-27 21:17:41
 */
export type AppUsersBadgesRevokeRequest = AssignAdminAppUserBadgeDto

export type AppUsersBadgesRevokeResponse = boolean

/**
 *  类型定义 [AdminAppUserPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
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
  /* 粉丝总数 */
  followersCount: number
  /* 发起关注总数 */
  followingCount: number
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
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
 */
export type AdminAppUserFollowCountRepairResultDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 粉丝总数 */
  followersCount: number
  /* 发起关注总数 */
  followingCount: number

  /* 用户id */
  userId: number
}

/**
 *  类型定义 [ResetAdminAppUserPasswordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
 */
export type AdminAppUserPointRecordDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 变化后积分 */
  afterPoints: number
  /* 变化前积分 */
  beforePoints: number
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
 *  @更新时间 2026-03-27 21:17:41
 */
export type AddAdminAppUserPointsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 备注 */
  remark?: null | string
  /* 规则类型（论坛：1=发表主题，2=发表回复，3=主题被点赞，4=回复被点赞，5=主题被收藏，6=每日签到，7=管理员操作，8=主题浏览，9=主题举报，10=发表评论，11=评论被点赞，12=评论被举报，16=主题被评论；漫画作品：100=浏览，101=点赞，102=收藏，103=举报，104=评论；小说作品：200=浏览，201=点赞，202=收藏，203=举报，204=评论；漫画章节：300=阅读，301=点赞，302=购买，303=下载，304=兑换，305=举报，306=评论；小说章节：400=阅读，401=点赞，402=购买，403=下载，404=兑换，405=举报，406=评论；徽章与成就：600=获得徽章，601=完善资料，602=上传头像；社交：700=关注用户，701=被关注，702=分享内容，703=邀请用户；举报处理：800=举报有效，801=举报无效） */
  ruleType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801

  /* 用户id */
  userId: number
}

/**
 *  类型定义 [ConsumeAdminAppUserPointsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-27 21:17:41
 */
export type ConsumeAdminAppUserPointsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 关联兑换ID */
  exchangeId?: null | number
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
 *  @更新时间 2026-03-27 21:17:41
 */
export type AdminAppUserExperienceRecordDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 变化后经验值 */
  afterExperience: number
  /* 变化前经验值 */
  beforeExperience: number
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

  /* 关联的用户ID */
  userId: number
}

/**
 *  类型定义 [AddAdminAppUserExperienceDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-27 21:17:41
 */
export type AddAdminAppUserExperienceDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 备注 */
  remark?: null | string
  /* 规则类型（论坛：1=发表主题，2=发表回复，3=主题被点赞，4=回复被点赞，5=主题被收藏，6=每日签到，7=管理员操作，8=主题浏览，9=主题举报，10=发表评论，11=评论被点赞，12=评论被举报，16=主题被评论；漫画作品：100=浏览，101=点赞，102=收藏，103=举报，104=评论；小说作品：200=浏览，201=点赞，202=收藏，203=举报，204=评论；漫画章节：300=阅读，301=点赞，302=购买，303=下载，304=兑换，305=举报，306=评论；小说章节：400=阅读，401=点赞，402=购买，403=下载，404=兑换，405=举报，406=评论；徽章与成就：600=获得徽章，601=完善资料，602=上传头像；社交：700=关注用户，701=被关注，702=分享内容，703=邀请用户；举报处理：800=举报有效，801=举报无效） */
  ruleType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801

  /* 用户id */
  userId: number
}

/**
 *  类型定义 [AdminAppUserBadgeItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
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
 *  @更新时间 2026-03-27 21:17:41
 */
export type AssignAdminAppUserBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 徽章ID */
  badgeId: number

  /* 用户id */
  userId: number
}