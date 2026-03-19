/**
 *  类型定义 [ExperienceRulesPageRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-19 23:58:08
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

  /* 规则类型（论坛：1=发表主题，2=发表回复，3=主题被点赞，4=回复被点赞，5=主题被收藏，6=每日签到，7=管理员操作，8=主题浏览，9=主题举报，10=发表评论，11=评论被点赞，12=评论被举报，16=主题被评论；漫画作品：100=浏览，101=点赞，102=收藏，103=举报，104=评论；小说作品：200=浏览，201=点赞，202=收藏，203=举报，204=评论；漫画章节：300=阅读，301=点赞，302=购买，303=下载，304=兑换，305=举报，306=评论；小说章节：400=阅读，401=点赞，402=购买，403=下载，404=兑换，405=举报，406=评论；徽章与成就：600=获得徽章，601=完善资料，602=上传头像；社交：700=关注用户，701=被关注，702=分享内容，703=邀请用户；举报处理：800=举报有效，801=举报无效） */
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
 *  @更新时间 2026-03-19 23:58:08
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
 *  @更新时间 2026-03-19 23:58:08
 */
export type ExperienceRulesCreateRequest = CreateUserExperienceRuleDto

export type ExperienceRulesCreateResponse = boolean

/**
 *  类型定义 [ExperienceRulesUpdateRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type ExperienceRulesUpdateRequest = UpdateUserExperienceRuleDto

export type ExperienceRulesUpdateResponse = boolean

/**
 *  类型定义 [ExperienceRulesDeleteRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type ExperienceRulesDeleteRequest = IdDto

export type ExperienceRulesDeleteResponse = boolean

/**
 *  类型定义 [ExperienceRulesGrantRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type ExperienceRulesGrantRequest = AddUserExperienceDto

export type ExperienceRulesGrantResponse = boolean

/**
 *  类型定义 [ExperienceRulesStatsRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-19 23:58:08
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
 *  @更新时间 2026-03-19 23:58:08
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
 *  @更新时间 2026-03-19 23:58:08
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
 *  @更新时间 2026-03-19 23:58:08
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
 *  @更新时间 2026-03-19 23:58:08
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
 *  @更新时间 2026-03-19 23:58:08
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
 *  类型定义 [UserExperienceStatsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
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
 *  @更新时间 2026-03-19 23:58:08
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