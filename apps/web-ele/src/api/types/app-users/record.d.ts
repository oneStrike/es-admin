/**
 *  类型定义 [RecordPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type RecordPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码 */
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

  /* 应用端用户ID */
  userId: number
}

export type RecordPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AdminAppUserPointRecordDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ExperienceRecordPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type ExperienceRecordPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码 */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 关联的规则ID */
  ruleId?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 应用端用户ID */
  userId: number
}

export type ExperienceRecordPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AdminAppUserExperienceRecordDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [AdminAppUserPointRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
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
 *  类型定义 [AdminAppUserExperienceRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
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