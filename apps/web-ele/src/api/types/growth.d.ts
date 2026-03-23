/**
 *  类型定义 [GrowthPointsRulesPageRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthPointsRulesPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 是否启用 */
  isEnabled?: boolean

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从0开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 规则类型（论坛：1=发表主题，2=发表回复，3=主题被点赞，4=回复被点赞，5=主题被收藏，6=每日签到，7=管理员操作，8=主题浏览，9=主题举报，10=发表评论，11=评论被点赞，12=评论被举报，16=主题被评论；漫画作品：100=浏览，101=点赞，102=收藏，103=举报，104=评论；小说作品：200=浏览，201=点赞，202=收藏，203=举报，204=评论；漫画章节：300=阅读，301=点赞，302=购买，303=下载，304=兑换，305=举报，306=评论；小说章节：400=阅读，401=点赞，402=购买，403=下载，404=兑换，405=举报，406=评论；徽章与成就：600=获得徽章，601=完善资料，602=上传头像；社交：700=关注用户，701=被关注，702=分享内容，703=邀请用户；举报处理：800=举报有效，801=举报无效） */
  type?: number
}

export type GrowthPointsRulesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseUserPointRuleDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [GrowthPointsRulesDetailRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthPointsRulesDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type GrowthPointsRulesDetailResponse = BaseUserPointRuleDto

/**
 *  类型定义 [GrowthPointsRulesCreateRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthPointsRulesCreateRequest = CreateUserPointRuleDto

export type GrowthPointsRulesCreateResponse = boolean

/**
 *  类型定义 [GrowthPointsRulesUpdateRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthPointsRulesUpdateRequest = UpdateUserPointRuleDto

export type GrowthPointsRulesUpdateResponse = boolean

/**
 *  类型定义 [GrowthExperienceRulesPageRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthExperienceRulesPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 是否启用 */
  isEnabled?: boolean

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从0开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 规则类型（论坛：1=发表主题，2=发表回复，3=主题被点赞，4=回复被点赞，5=主题被收藏，6=每日签到，7=管理员操作，8=主题浏览，9=主题举报，10=发表评论，11=评论被点赞，12=评论被举报，16=主题被评论；漫画作品：100=浏览，101=点赞，102=收藏，103=举报，104=评论；小说作品：200=浏览，201=点赞，202=收藏，203=举报，204=评论；漫画章节：300=阅读，301=点赞，302=购买，303=下载，304=兑换，305=举报，306=评论；小说章节：400=阅读，401=点赞，402=购买，403=下载，404=兑换，405=举报，406=评论；徽章与成就：600=获得徽章，601=完善资料，602=上传头像；社交：700=关注用户，701=被关注，702=分享内容，703=邀请用户；举报处理：800=举报有效，801=举报无效） */
  type?: number
}

export type GrowthExperienceRulesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseUserExperienceRuleDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [GrowthExperienceRulesDetailRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthExperienceRulesDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type GrowthExperienceRulesDetailResponse = BaseUserExperienceRuleDto

/**
 *  类型定义 [GrowthExperienceRulesCreateRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthExperienceRulesCreateRequest = CreateUserExperienceRuleDto

export type GrowthExperienceRulesCreateResponse = boolean

/**
 *  类型定义 [GrowthExperienceRulesUpdateRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthExperienceRulesUpdateRequest = UpdateUserExperienceRuleDto

export type GrowthExperienceRulesUpdateResponse = boolean

/**
 *  类型定义 [GrowthExperienceRulesDeleteRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthExperienceRulesDeleteRequest = IdDto

export type GrowthExperienceRulesDeleteResponse = boolean

/**
 *  类型定义 [GrowthExperienceRulesGrantRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthExperienceRulesGrantRequest = AddUserExperienceDto

export type GrowthExperienceRulesGrantResponse = boolean

/**
 *  类型定义 [GrowthExperienceRulesRecordPageRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthExperienceRulesRecordPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从0开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 关联的规则ID */
  ruleId?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 用户ID */
  userId: number
}

export type GrowthExperienceRulesRecordPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: UserExperienceRecordDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [GrowthExperienceRulesRecordDetailRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthExperienceRulesRecordDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type GrowthExperienceRulesRecordDetailResponse = UserExperienceRecordDetailDto

/**
 *  类型定义 [GrowthExperienceRulesStatsRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthExperienceRulesStatsRequest = {
  
  /** 任意合法数值 */
  [property: string]: any

  userId: number
}

export type GrowthExperienceRulesStatsResponse = UserExperienceStatsDto

/**
 *  类型定义 [GrowthLevelRulesPageRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthLevelRulesPageRequest = {
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

  /* 当前页码（从0开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string
}

export type GrowthLevelRulesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseUserLevelRuleDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [GrowthLevelRulesDetailRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthLevelRulesDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type GrowthLevelRulesDetailResponse = BaseUserLevelRuleDto

/**
 *  类型定义 [GrowthLevelRulesCreateRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthLevelRulesCreateRequest = CreateUserLevelRuleDto

export type GrowthLevelRulesCreateResponse = boolean

/**
 *  类型定义 [GrowthLevelRulesUpdateRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthLevelRulesUpdateRequest = UpdateUserLevelRuleDto

export type GrowthLevelRulesUpdateResponse = boolean

/**
 *  类型定义 [GrowthLevelRulesDeleteRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthLevelRulesDeleteRequest = IdDto

export type GrowthLevelRulesDeleteResponse = boolean

/**
 *  类型定义 [GrowthLevelRulesUserDetailRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthLevelRulesUserDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type GrowthLevelRulesUserDetailResponse = UserLevelInfoDto

/**
 *  类型定义 [GrowthLevelRulesPermissionCheckRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthLevelRulesPermissionCheckRequest = CheckUserLevelPermissionDto

export type GrowthLevelRulesPermissionCheckResponse = UserLevelPermissionResultDto

export type GrowthLevelRulesStatsResponse = UserLevelStatisticsDto

/**
 *  类型定义 [GrowthBadgesPageRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthBadgesPageRequest = {
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

  /* 当前页码（从0开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 徽章类型（1=系统徽章, 2=成就徽章, 3=活动徽章） */
  type?: number
}

export type GrowthBadgesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseUserBadgeDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [GrowthBadgesDetailRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthBadgesDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type GrowthBadgesDetailResponse = BaseUserBadgeDto

/**
 *  类型定义 [GrowthBadgesCreateRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthBadgesCreateRequest = CreateUserBadgeDto

export type GrowthBadgesCreateResponse = boolean

/**
 *  类型定义 [GrowthBadgesUpdateRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthBadgesUpdateRequest = UpdateUserBadgeDto

export type GrowthBadgesUpdateResponse = boolean

/**
 *  类型定义 [GrowthBadgesDeleteRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthBadgesDeleteRequest = IdDto

export type GrowthBadgesDeleteResponse = boolean

/**
 *  类型定义 [GrowthBadgesUpdateStatusRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthBadgesUpdateStatusRequest = UpdateUserBadgeStatusDto

export type GrowthBadgesUpdateStatusResponse = boolean

/**
 *  类型定义 [GrowthBadgesAssignRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthBadgesAssignRequest = AssignUserBadgeDto

export type GrowthBadgesAssignResponse = boolean

/**
 *  类型定义 [GrowthBadgesRevokeRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthBadgesRevokeRequest = AssignUserBadgeDto

export type GrowthBadgesRevokeResponse = boolean

/**
 *  类型定义 [GrowthBadgesUserPageRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-24 00:50:36
 */
export type GrowthBadgesUserPageRequest = {
  
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

  /* 当前页码（从0开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 徽章类型（1=系统徽章, 2=成就徽章, 3=活动徽章） */
  type?: number
}

export type GrowthBadgesUserPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BadgeUserPageItemDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

export type GrowthBadgesStatsResponse = UserBadgeStatisticsDto

/**
 *  类型定义 [BaseUserPointRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
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
  /* 规则类型（论坛：1=发表主题，2=发表回复，3=主题被点赞，4=回复被点赞，5=主题被收藏，6=每日签到，7=管理员操作，8=主题浏览，9=主题举报，10=发表评论，11=评论被点赞，12=评论被举报，16=主题被评论；漫画作品：100=浏览，101=点赞，102=收藏，103=举报，104=评论；小说作品：200=浏览，201=点赞，202=收藏，203=举报，204=评论；漫画章节：300=阅读，301=点赞，302=购买，303=下载，304=兑换，305=举报，306=评论；小说章节：400=阅读，401=点赞，402=购买，403=下载，404=兑换，405=举报，406=评论；徽章与成就：600=获得徽章，601=完善资料，602=上传头像；社交：700=关注用户，701=被关注，702=分享内容，703=邀请用户；举报处理：800=举报有效，801=举报无效） */
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [CreateUserPointRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
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

  /* 规则类型（论坛：1=发表主题，2=发表回复，3=主题被点赞，4=回复被点赞，5=主题被收藏，6=每日签到，7=管理员操作，8=主题浏览，9=主题举报，10=发表评论，11=评论被点赞，12=评论被举报，16=主题被评论；漫画作品：100=浏览，101=点赞，102=收藏，103=举报，104=评论；小说作品：200=浏览，201=点赞，202=收藏，203=举报，204=评论；漫画章节：300=阅读，301=点赞，302=购买，303=下载，304=兑换，305=举报，306=评论；小说章节：400=阅读，401=点赞，402=购买，403=下载，404=兑换，405=举报，406=评论；徽章与成就：600=获得徽章，601=完善资料，602=上传头像；社交：700=关注用户，701=被关注，702=分享内容，703=邀请用户；举报处理：800=举报有效，801=举报无效） */
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801
}

/**
 *  类型定义 [UpdateUserPointRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
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

  /* 规则类型（论坛：1=发表主题，2=发表回复，3=主题被点赞，4=回复被点赞，5=主题被收藏，6=每日签到，7=管理员操作，8=主题浏览，9=主题举报，10=发表评论，11=评论被点赞，12=评论被举报，16=主题被评论；漫画作品：100=浏览，101=点赞，102=收藏，103=举报，104=评论；小说作品：200=浏览，201=点赞，202=收藏，203=举报，204=评论；漫画章节：300=阅读，301=点赞，302=购买，303=下载，304=兑换，305=举报，306=评论；小说章节：400=阅读，401=点赞，402=购买，403=下载，404=兑换，405=举报，406=评论；徽章与成就：600=获得徽章，601=完善资料，602=上传头像；社交：700=关注用户，701=被关注，702=分享内容，703=邀请用户；举报处理：800=举报有效，801=举报无效） */
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801
}

/**
 *  类型定义 [BaseUserExperienceRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
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
  /* 规则类型（论坛：1=发表主题，2=发表回复，3=主题被点赞，4=回复被点赞，5=主题被收藏，6=每日签到，7=管理员操作，8=主题浏览，9=主题举报，10=发表评论，11=评论被点赞，12=评论被举报，16=主题被评论；漫画作品：100=浏览，101=点赞，102=收藏，103=举报，104=评论；小说作品：200=浏览，201=点赞，202=收藏，203=举报，204=评论；漫画章节：300=阅读，301=点赞，302=购买，303=下载，304=兑换，305=举报，306=评论；小说章节：400=阅读，401=点赞，402=购买，403=下载，404=兑换，405=举报，406=评论；徽章与成就：600=获得徽章，601=完善资料，602=上传头像；社交：700=关注用户，701=被关注，702=分享内容，703=邀请用户；举报处理：800=举报有效，801=举报无效） */
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [CreateUserExperienceRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
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

  /* 规则类型（论坛：1=发表主题，2=发表回复，3=主题被点赞，4=回复被点赞，5=主题被收藏，6=每日签到，7=管理员操作，8=主题浏览，9=主题举报，10=发表评论，11=评论被点赞，12=评论被举报，16=主题被评论；漫画作品：100=浏览，101=点赞，102=收藏，103=举报，104=评论；小说作品：200=浏览，201=点赞，202=收藏，203=举报，204=评论；漫画章节：300=阅读，301=点赞，302=购买，303=下载，304=兑换，305=举报，306=评论；小说章节：400=阅读，401=点赞，402=购买，403=下载，404=兑换，405=举报，406=评论；徽章与成就：600=获得徽章，601=完善资料，602=上传头像；社交：700=关注用户，701=被关注，702=分享内容，703=邀请用户；举报处理：800=举报有效，801=举报无效） */
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801
}

/**
 *  类型定义 [UpdateUserExperienceRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
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

  /* 规则类型（论坛：1=发表主题，2=发表回复，3=主题被点赞，4=回复被点赞，5=主题被收藏，6=每日签到，7=管理员操作，8=主题浏览，9=主题举报，10=发表评论，11=评论被点赞，12=评论被举报，16=主题被评论；漫画作品：100=浏览，101=点赞，102=收藏，103=举报，104=评论；小说作品：200=浏览，201=点赞，202=收藏，203=举报，204=评论；漫画章节：300=阅读，301=点赞，302=购买，303=下载，304=兑换，305=举报，306=评论；小说章节：400=阅读，401=点赞，402=购买，403=下载，404=兑换，405=举报，406=评论；徽章与成就：600=获得徽章，601=完善资料，602=上传头像；社交：700=关注用户，701=被关注，702=分享内容，703=邀请用户；举报处理：800=举报有效，801=举报无效） */
  type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
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
 *  @更新时间 2026-03-24 00:50:36
 */
export type AddUserExperienceDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 备注 */
  remark?: null | string
  /* 规则类型（论坛：1=发表主题，2=发表回复，3=主题被点赞，4=回复被点赞，5=主题被收藏，6=每日签到，7=管理员操作，8=主题浏览，9=主题举报，10=发表评论，11=评论被点赞，12=评论被举报，16=主题被评论；漫画作品：100=浏览，101=点赞，102=收藏，103=举报，104=评论；小说作品：200=浏览，201=点赞，202=收藏，203=举报，204=评论；漫画章节：300=阅读，301=点赞，302=购买，303=下载，304=兑换，305=举报，306=评论；小说章节：400=阅读，401=点赞，402=购买，403=下载，404=兑换，405=举报，406=评论；徽章与成就：600=获得徽章，601=完善资料，602=上传头像；社交：700=关注用户，701=被关注，702=分享内容，703=邀请用户；举报处理：800=举报有效，801=举报无效） */
  ruleType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801

  /* 用户ID */
  userId: number
}

/**
 *  类型定义 [UserExperienceRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
 */
export type UserExperienceRecordDto = {
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
 *  类型定义 [UserExperienceRecordDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
 */
export type UserExperienceRecordDetailDto = {
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
  /* 经验所属用户 */
  user: ForumAppUserInfoDto

  /* 关联的用户ID */
  userId: number
}

/**
 *  类型定义 [ForumAppUserInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
 */
export type ForumAppUserInfoDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 账号 */
  account: string
  /* 头像URL */
  avatarUrl?: null | string
  /* 个人简介 */
  bio?: null | string
  /* 出生日期 */
  birthDate?: null | string
  /* 创建时间 */
  createdAt: string
  /* 邮箱 */
  emailAddress?: null | string
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
  /* 昵称 */
  nickname: string
  /* 手机号 */
  phoneNumber?: null | string
  /* 个性签名 */
  signature?: null | string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [UserExperienceStatsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
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
 *  @更新时间 2026-03-24 00:50:36
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

/**
 *  类型定义 [BaseUserLevelRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
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
 *  @更新时间 2026-03-24 00:50:36
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
 *  @更新时间 2026-03-24 00:50:36
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
 *  类型定义 [UserLevelInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
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
 *  @更新时间 2026-03-24 00:50:36
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
 *  类型定义 [CheckUserLevelPermissionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
 */
export type CheckUserLevelPermissionDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 权限类型（dailyTopicLimit=DAILY_TOPIC_LIMIT，dailyReplyCommentLimit=DAILY_REPLY_COMMENT_LIMIT，postInterval=POST_INTERVAL，dailyLikeLimit=DAILY_LIKE_LIMIT，dailyFavoriteLimit=DAILY_FAVORITE_LIMIT） */
  permissionType: 'dailyFavoriteLimit' | 'dailyLikeLimit' | 'dailyReplyCommentLimit' | 'dailyTopicLimit' | 'postInterval'

  /* 用户ID */
  userId: number
}

/**
 *  类型定义 [UserLevelPermissionResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
 */
export type UserLevelPermissionResultDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 当前等级名称 */
  currentLevel: string
  /* 是否有权限 */
  hasPermission: boolean
  /* 限制数量 */
  limit?: null | number
  /* 剩余数量 */
  remaining?: null | number

  /* 已使用数量 */
  used?: null | number
}

/**
 *  类型定义 [UserLevelStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
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
 *  @更新时间 2026-03-24 00:50:36
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

/**
 *  类型定义 [BaseUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
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
 *  类型定义 [CreateUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
 */
export type CreateUserBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 业务域标识 */
  business?: null | string
  /* 徽章描述 */
  description: string
  /* 事件键 */
  eventKey?: null | string
  /* 徽章图标URL */
  icon: string
  /* 是否启用 */
  isEnabled: boolean
  /* 徽章名称 */
  name: string
  /* 排序值（数值越小越靠前） */
  sortOrder: number

  /* 徽章类型（1=系统徽章, 2=成就徽章, 3=活动徽章） */
  type: 1 | 2 | 3
}

/**
 *  类型定义 [UpdateUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
 */
export type UpdateUserBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 业务域标识 */
  business?: null | string
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
}

/**
 *  类型定义 [UpdateUserBadgeStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
 */
export type UpdateUserBadgeStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否启用 */
  isEnabled: boolean
}

/**
 *  类型定义 [AssignUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
 */
export type AssignUserBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 徽章id */
  badgeId: number

  /* 用户id */
  userId: number
}

/**
 *  类型定义 [BadgeUserPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
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
 *  @更新时间 2026-03-24 00:50:36
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

/**
 *  类型定义 [UserBadgeStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
 */
export type UserBadgeStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 停用数 */
  disabledCount: number
  /* 启用数 */
  enabledCount: number
  /* 热门徽章 */
  topBadges: UserBadgeTopBadgeItemDto[]
  /* 总分配次数 */
  totalAssignments: number
  /* 总徽章数 */
  totalBadges: number

  /* 类型分布 */
  typeDistribution: UserBadgeTypeDistributionItemDto[]
}

/**
 *  类型定义 [UserBadgeTypeDistributionItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
 */
export type UserBadgeTypeDistributionItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 数量 */
  count: number

  /* 徽章类型 */
  type: number
}

/**
 *  类型定义 [UserBadgeTopBadgeItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-24 00:50:36
 */
export type UserBadgeTopBadgeItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 徽章信息 */
  badge?: BaseUserBadgeDto

  /* 分配次数 */
  count: number
}