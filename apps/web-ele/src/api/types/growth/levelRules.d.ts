/**
 *  类型定义 [LevelRulesPageRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type LevelRulesPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 业务域标识 */
  business?: null | string

  /* 结束时间 */
  endDate?: null | string

  /* 是否启用 */
  isEnabled?: boolean

  /* 等级名称 */
  name?: string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码 */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string
}

export type LevelRulesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseUserLevelRuleDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [LevelRulesDetailRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type LevelRulesDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type LevelRulesDetailResponse = BaseUserLevelRuleDto

/**
 *  类型定义 [LevelRulesCreateRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type LevelRulesCreateRequest = CreateUserLevelRuleDto

export type LevelRulesCreateResponse = boolean

/**
 *  类型定义 [LevelRulesUpdateRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type LevelRulesUpdateRequest = UpdateUserLevelRuleDto

export type LevelRulesUpdateResponse = boolean

/**
 *  类型定义 [LevelRulesDeleteRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type LevelRulesDeleteRequest = IdDto

export type LevelRulesDeleteResponse = boolean

export type LevelRulesStatsResponse = UserLevelStatisticsDto

/**
 *  类型定义 [BaseUserLevelRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type BaseUserLevelRuleDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 等级徽章URL */
  badge?: null | string
  /* 黑名单上限 */
  blacklistLimit: number
  /* 业务域标识 */
  business?: null | string
  /* 等级专属颜色（十六进制） */
  color?: null | string
  /* 创建时间 */
  createdAt: string
  /* 每日收藏次数上限，0表示无限制 */
  dailyFavoriteLimit: number
  /* 每日点赞次数上限，0表示无限制 */
  dailyLikeLimit: number
  /* 每日回复和评论数量上限，0表示无限制 */
  dailyReplyCommentLimit: number
  /* 每日发帖数量上限，0表示无限制 */
  dailyTopicLimit: number
  /* 等级描述 */
  description?: null | string
  /* 积分购买折扣（0-1之间的小数） */
  discount: string
  /* 等级图标URL */
  icon?: null | string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 所需登录天数 */
  loginDays: number
  /* 等级名称 */
  name: string
  /* 发帖间隔秒数（防刷屏），0表示无限制 */
  postInterval: number
  /* 所需经验值 */
  requiredExperience: number
  /* 排序值（数值越小越靠前） */
  sortOrder: number
  /* 更新时间 */
  updatedAt: string

  /* 作品收藏上限 */
  workCollectionLimit: number
}

/**
 *  类型定义 [CreateUserLevelRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type CreateUserLevelRuleDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 等级徽章URL */
  badge?: null | string
  /* 黑名单上限 */
  blacklistLimit: number
  /* 业务域标识 */
  business?: null | string
  /* 等级专属颜色（十六进制） */
  color?: null | string
  /* 每日收藏次数上限，0表示无限制 */
  dailyFavoriteLimit: number
  /* 每日点赞次数上限，0表示无限制 */
  dailyLikeLimit: number
  /* 每日回复和评论数量上限，0表示无限制 */
  dailyReplyCommentLimit: number
  /* 每日发帖数量上限，0表示无限制 */
  dailyTopicLimit: number
  /* 等级描述 */
  description?: null | string
  /* 积分购买折扣（0-1之间的小数） */
  discount: string
  /* 等级图标URL */
  icon?: null | string
  /* 是否启用 */
  isEnabled: boolean
  /* 所需登录天数 */
  loginDays: number
  /* 等级名称 */
  name: string
  /* 发帖间隔秒数（防刷屏），0表示无限制 */
  postInterval: number
  /* 所需经验值 */
  requiredExperience: number
  /* 排序值（数值越小越靠前） */
  sortOrder: number

  /* 作品收藏上限 */
  workCollectionLimit: number
}

/**
 *  类型定义 [UpdateUserLevelRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UpdateUserLevelRuleDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 等级徽章URL */
  badge?: null | string
  /* 黑名单上限 */
  blacklistLimit?: number
  /* 业务域标识 */
  business?: null | string
  /* 等级专属颜色（十六进制） */
  color?: null | string
  /* 每日收藏次数上限，0表示无限制 */
  dailyFavoriteLimit?: number
  /* 每日点赞次数上限，0表示无限制 */
  dailyLikeLimit?: number
  /* 每日回复和评论数量上限，0表示无限制 */
  dailyReplyCommentLimit?: number
  /* 每日发帖数量上限，0表示无限制 */
  dailyTopicLimit?: number
  /* 等级描述 */
  description?: null | string
  /* 积分购买折扣（0-1之间的小数） */
  discount?: string
  /* 等级图标URL */
  icon?: null | string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled?: boolean
  /* 所需登录天数 */
  loginDays?: number
  /* 等级名称 */
  name?: string
  /* 发帖间隔秒数（防刷屏），0表示无限制 */
  postInterval?: number
  /* 所需经验值 */
  requiredExperience?: number
  /* 排序值（数值越小越靠前） */
  sortOrder?: number

  /* 作品收藏上限 */
  workCollectionLimit?: number
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

/**
 *  类型定义 [UserLevelStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UserLevelStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 启用的等级数量 */
  enabledLevels: number
  /* 等级分布 */
  levelDistribution: UserLevelDistributionItemDto[]

  /* 总等级数量 */
  totalLevels: number
}

/**
 *  类型定义 [UserLevelDistributionItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UserLevelDistributionItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 等级ID */
  levelId: number
  /* 等级名称 */
  levelName: string

  /* 该等级用户数量 */
  userCount: number
}