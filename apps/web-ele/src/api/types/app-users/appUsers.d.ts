/**
 *  类型定义 [AppUsersPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 23:58:08
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

  /* 当前页码 */
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

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [AppUsersDetailRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 23:58:08
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
 *  @更新时间 2026-03-19 23:58:08
 */
export type AppUsersCreateRequest = CreateAdminAppUserDto

export type AppUsersCreateResponse = boolean

/**
 *  类型定义 [AppUsersUpdateEnabledRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type AppUsersUpdateEnabledRequest = UpdateAdminAppUserEnabledDto

export type AppUsersUpdateEnabledResponse = boolean

/**
 *  类型定义 [AppUsersUpdateStatusRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type AppUsersUpdateStatusRequest = UpdateAdminAppUserStatusDto

export type AppUsersUpdateStatusResponse = boolean

/**
 *  类型定义 [AppUsersDeleteRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type AppUsersDeleteRequest = IdDto

export type AppUsersDeleteResponse = boolean

/**
 *  类型定义 [AppUsersRestoreRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type AppUsersRestoreRequest = IdDto

export type AppUsersRestoreResponse = boolean

/**
 *  类型定义 [AdminAppUserPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
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
  /* 出生日期 */
  birthDate?: null | string
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
  /* 密码 */
  password: string
  /* 手机号 */
  phoneNumber?: null | string
  /* 积分 */
  points: number
  /* 回复数 */
  replyCount: number
  /* 用户状态（1=NORMAL，2=MUTED，3=PERMANENT_MUTED，4=BANNED，5=PERMANENT_BANNED） */
  status: 1 | 2 | 3 | 4 | 5
  /* 主题数 */
  topicCount: number

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [AdminAppUserDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
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
  /* 出生日期 */
  birthDate?: null | string
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
  /* 论坛画像信息 */
  forumProfile?: AdminAppUserForumProfileDto
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
  /* 密码 */
  password: string
  /* 手机号 */
  phoneNumber?: null | string
  /* 积分 */
  points: number
  /* 积分统计 */
  pointStats: AdminAppUserPointStatsDto
  /* 用户状态（1=NORMAL，2=MUTED，3=PERMANENT_MUTED，4=BANNED，5=PERMANENT_BANNED） */
  status: 1 | 2 | 3 | 4 | 5

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [AdminAppUserLevelDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type AdminAppUserLevelDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 等级ID */
  id: number
  /* 等级名称 */
  name: string

  /* 升级所需经验值 */
  requiredExperience: number
}

/**
 *  类型定义 [AdminAppUserForumProfileDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type AdminAppUserForumProfileDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 论坛简介 */
  bio?: null | string
  /* 获收藏数 */
  favoriteCount: number
  /* 获赞数 */
  likeCount: number
  /* 回复数 */
  replyCount: number
  /* 论坛签名 */
  signature?: null | string

  /* 主题数 */
  topicCount: number
}

/**
 *  类型定义 [AdminAppUserPointStatsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
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
 *  @更新时间 2026-03-19 23:58:08
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
 *  @更新时间 2026-03-19 23:58:08
 */
export type CreateAdminAppUserDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 头像URL */
  avatarUrl?: null | string
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
  /* 密码 */
  password: string
  /* 手机号 */
  phoneNumber?: null | string

  /* 用户状态（1=NORMAL，2=MUTED，3=PERMANENT_MUTED，4=BANNED，5=PERMANENT_BANNED） */
  status?: 1 | 2 | 3 | 4 | 5
}

/**
 *  类型定义 [UpdateAdminAppUserEnabledDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
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
 *  @更新时间 2026-03-19 23:58:08
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
 *  @更新时间 2026-03-19 23:58:08
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}