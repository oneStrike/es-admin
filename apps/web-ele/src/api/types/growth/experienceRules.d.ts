/**
 *  类型定义 [ExperienceRulesPageRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type ExperienceRulesPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 是否启用 */
  isEnabled?: boolean

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码 */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到, 7=管理员操作, 8=主题浏览, 9=举报, 100=漫画浏览, 101=漫画点赞, 102=漫画收藏, 200=小说浏览, 201=小说点赞, 202=小说收藏, 300=章节阅读, 301=章节点赞, 302=章节购买, 303=章节下载, 304=章节兑换） */
  type?: number
}

export type ExperienceRulesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseUserExperienceRuleDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ExperienceRulesDetailRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type ExperienceRulesDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ExperienceRulesDetailResponse = BaseUserExperienceRuleDto

/**
 *  类型定义 [ExperienceRulesCreateRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type ExperienceRulesCreateRequest = CreateUserExperienceRuleDto

export type ExperienceRulesCreateResponse = boolean

/**
 *  类型定义 [ExperienceRulesUpdateRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type ExperienceRulesUpdateRequest = UpdateUserExperienceRuleDto

export type ExperienceRulesUpdateResponse = boolean

/**
 *  类型定义 [ExperienceRulesDeleteRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type ExperienceRulesDeleteRequest = IdDto

export type ExperienceRulesDeleteResponse = boolean

/**
 *  类型定义 [ExperienceRulesGrantRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type ExperienceRulesGrantRequest = AddUserExperienceDto

export type ExperienceRulesGrantResponse = boolean

/**
 *  类型定义 [ExperienceRulesStatsRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type ExperienceRulesStatsRequest = {
  
  /** 任意合法数值 */
  [property: string]: any

  userId: number
}

export type ExperienceRulesStatsResponse = UserExperienceStatsDto

/**
 *  类型定义 [BaseUserExperienceRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type BaseUserExperienceRuleDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 每日上限（0=无限制） */
  dailyLimit: number
  /* 经验值变化 */
  experience: number
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 备注 */
  remark?: null | string
  /* 总上限（0=无限制） */
  totalLimit: number
  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到, 7=管理员操作, 8=主题浏览, 9=举报, 100=漫画浏览, 101=漫画点赞, 102=漫画收藏, 200=小说浏览, 201=小说点赞, 202=小说收藏, 300=章节阅读, 301=章节点赞, 302=章节购买, 303=章节下载, 304=章节兑换） */
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [CreateUserExperienceRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type CreateUserExperienceRuleDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 每日上限（0=无限制） */
  dailyLimit: number
  /* 经验值变化 */
  experience: number
  /* 是否启用 */
  isEnabled: boolean
  /* 备注 */
  remark?: null | string
  /* 总上限（0=无限制） */
  totalLimit: number

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到, 7=管理员操作, 8=主题浏览, 9=举报, 100=漫画浏览, 101=漫画点赞, 102=漫画收藏, 200=小说浏览, 201=小说点赞, 202=小说收藏, 300=章节阅读, 301=章节点赞, 302=章节购买, 303=章节下载, 304=章节兑换） */
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801
}

/**
 *  类型定义 [UpdateUserExperienceRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UpdateUserExperienceRuleDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 每日上限（0=无限制） */
  dailyLimit?: number
  /* 经验值变化 */
  experience?: number
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled?: boolean
  /* 备注 */
  remark?: null | string
  /* 总上限（0=无限制） */
  totalLimit?: number

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到, 7=管理员操作, 8=主题浏览, 9=举报, 100=漫画浏览, 101=漫画点赞, 102=漫画收藏, 200=小说浏览, 201=小说点赞, 202=小说收藏, 300=章节阅读, 301=章节点赞, 302=章节购买, 303=章节下载, 304=章节兑换） */
  type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801
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
 *  类型定义 [AddUserExperienceDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AddUserExperienceDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 备注 */
  remark?: null | string
  /* 规则类型 */
  ruleType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801

  /* 用户ID */
  userId: number
}

/**
 *  类型定义 [UserExperienceStatsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UserExperienceStatsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 当前经验值 */
  currentExperience: number
  /* 当前等级信息 */
  level?: UserExperienceLevelDto

  /* 今日获得经验值 */
  todayEarned: number
}

/**
 *  类型定义 [UserExperienceLevelDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UserExperienceLevelDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number
  /* 等级名称 */
  name: string

  /* 所需经验值 */
  requiredExperience: number
}