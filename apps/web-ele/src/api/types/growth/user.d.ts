/**
 *  类型定义 [UserDetailRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type UserDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type UserDetailResponse = UserLevelInfoDto

/**
 *  类型定义 [UserPageRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type UserPageRequest = {
  
  /** 任意合法数值 */
  [property: string]: any

  badgeId: number

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

  /* 当前页码 */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 徽章类型（1=系统徽章, 2=成就徽章, 3=活动徽章） */
  type?: number
}

export type UserPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BadgeUserPageItemDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [UserLevelInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UserLevelInfoDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 当前经验值 */
  currentExperience: number
  /* 等级徽章URL */
  levelBadge?: null | string
  /* 等级专属颜色（十六进制） */
  levelColor?: null | string
  /* 等级描述 */
  levelDescription?: null | string
  /* 等级图标URL */
  levelIcon?: null | string
  /* 等级ID */
  levelId: number
  /* 等级名称 */
  levelName: string
  /* 下一等级所需经验值 */
  nextLevelExperience?: null | number
  /* 等级权限 */
  permissions: UserLevelPermissionsDto

  /* 升级进度百分比 */
  progressPercentage?: null | number
}

/**
 *  类型定义 [UserLevelPermissionsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UserLevelPermissionsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 每日收藏次数上限，0表示无限制 */
  dailyFavoriteLimit: number
  /* 每日点赞次数上限，0表示无限制 */
  dailyLikeLimit: number
  /* 每日回复和评论数量上限，0表示无限制 */
  dailyReplyCommentLimit: number
  /* 每日发帖数量上限，0表示无限制 */
  dailyTopicLimit: number

  /* 发帖间隔秒数（防刷屏），0表示无限制 */
  postInterval: number
}

/**
 *  类型定义 [BadgeUserPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type BadgeUserPageItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 徽章ID */
  badgeId: number
  /* 创建时间 */
  createdAt: string
  /* 主键id */
  id: number
  /* 用户信息 */
  user: BadgeUserInfoDto

  /* 用户ID */
  userId: number
}

/**
 *  类型定义 [BadgeUserInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type BadgeUserInfoDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 头像地址 */
  avatar?: null | string
  /* 用户ID */
  id: number
  /* 等级名称 */
  level?: null | string
  /* 昵称 */
  nickname?: null | string

  /* 当前积分 */
  point: number
}