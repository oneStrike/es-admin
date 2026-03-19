/**
 *  类型定义 [ExperienceStatsRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type ExperienceStatsRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 应用端用户ID */
  userId: number
}

export type ExperienceStatsResponse = AdminAppUserExperienceStatsDto

/**
 *  类型定义 [ExperienceGrantRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type ExperienceGrantRequest = AddAdminAppUserExperienceDto

export type ExperienceGrantResponse = boolean

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
 *  类型定义 [AddAdminAppUserExperienceDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type AddAdminAppUserExperienceDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 备注 */
  remark?: null | string
  /* 规则类型（论坛：1=发表主题，2=发表回复，3=主题被点赞，4=回复被点赞，5=主题被收藏，6=每日签到，7=管理员操作，8=主题浏览，9=主题举报，10=发表评论，11=评论被点赞，12=评论被举报，16=主题被评论；漫画作品：100=浏览，101=点赞，102=收藏，103=举报，104=评论；小说作品：200=浏览，201=点赞，202=收藏，203=举报，204=评论；漫画章节：300=阅读，301=点赞，302=购买，303=下载，304=兑换，305=举报，306=评论；小说章节：400=阅读，401=点赞，402=购买，403=下载，404=兑换，405=举报，406=评论；徽章与成就：600=获得徽章，601=完善资料，602=上传头像；社交：700=关注用户，701=被关注，702=分享内容，703=邀请用户；举报处理：800=举报有效，801=举报无效） */
  ruleType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 100 | 101 | 102 | 103 | 104 | 200 | 201 | 202 | 203 | 204 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 600 | 601 | 602 | 700 | 701 | 702 | 703 | 800 | 801

  /* 用户ID */
  userId: number
}