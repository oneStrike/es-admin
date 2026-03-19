/**
 *  类型定义 [PointsRulesPageRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type PointsRulesPageRequest = {
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

export type PointsRulesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseUserPointRuleDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [PointsRulesDetailRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type PointsRulesDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type PointsRulesDetailResponse = BaseUserPointRuleDto

/**
 *  类型定义 [PointsRulesCreateRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type PointsRulesCreateRequest = CreateUserPointRuleDto

export type PointsRulesCreateResponse = boolean

/**
 *  类型定义 [PointsRulesUpdateRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type PointsRulesUpdateRequest = UpdateUserPointRuleDto

export type PointsRulesUpdateResponse = boolean

/**
 *  类型定义 [BaseUserPointRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type BaseUserPointRuleDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 每日上限（0=无限制） */
  dailyLimit: number
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 积分变化（正数为获得，负数为消费） */
  points: number
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
 *  类型定义 [CreateUserPointRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type CreateUserPointRuleDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 每日上限（0=无限制） */
  dailyLimit: number
  /* 是否启用 */
  isEnabled: boolean
  /* 积分变化（正数为获得，负数为消费） */
  points: number
  /* 备注 */
  remark?: null | string
  /* 总上限（0=无限制） */
  totalLimit: number

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到, 7=管理员操作, 8=主题浏览, 9=举报, 100=漫画浏览, 101=漫画点赞, 102=漫画收藏, 200=小说浏览, 201=小说点赞, 202=小说收藏, 300=章节阅读, 301=章节点赞, 302=章节购买, 303=章节下载, 304=章节兑换） */
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801
}

/**
 *  类型定义 [UpdateUserPointRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UpdateUserPointRuleDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 每日上限（0=无限制） */
  dailyLimit: number
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 积分变化（正数为获得，负数为消费） */
  points: number
  /* 备注 */
  remark?: null | string
  /* 总上限（0=无限制） */
  totalLimit: number

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到, 7=管理员操作, 8=主题浏览, 9=举报, 100=漫画浏览, 101=漫画点赞, 102=漫画收藏, 200=小说浏览, 201=小说点赞, 202=小说收藏, 300=章节阅读, 301=章节点赞, 302=章节购买, 303=章节下载, 304=章节兑换） */
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801
}