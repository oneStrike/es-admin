/**
 *  类型定义 [ReportPageRequest]
 *  @来源 内容治理/举报处理
 *  @更新时间 2026-04-08 08:36:51
 */
export type ReportPageRequest = {
  /* 开始时间 */
  startDate?: string | null

  /* 结束时间 */
  endDate?: string | null

  /* 单页大小，最大500，默认15 */
  pageSize?: number | null

  /* 当前页码（从1开始） */
  pageIndex?: number | null

  /* 排序字段，json格式 */
  orderBy?: string | null

  /* 主键id */
  id?: number

  /* 举报人 ID */
  reporterId?: number

  /* 处理人 ID */
  handlerId?: number | null

  /* 举报目标 ID */
  targetId?: number

  /* 举报目标类型 */
  targetType?: number

  /* 业务场景类型 */
  sceneType?: number

  /* 业务场景根对象 ID */
  sceneId?: number

  /* 举报原因类型 */
  reasonType?: number

  /* 举报状态 */
  status?: number

  /** 任意合法数值 */
  [property: string]: any
}

export type ReportPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: BaseReportDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ReportDetailRequest]
 *  @来源 内容治理/举报处理
 *  @更新时间 2026-04-08 08:36:51
 */
export type ReportDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type ReportDetailResponse = BaseReportDto

/**
 *  类型定义 [ReportHandleRequest]
 *  @来源 内容治理/举报处理
 *  @更新时间 2026-04-08 08:36:51
 */
export type ReportHandleRequest = HandleAdminReportDto

export type ReportHandleResponse = boolean

/**
 *  类型定义 [BaseReportDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type BaseReportDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 举报人 ID */
  reporterId: number
  /* 处理人 ID */
  handlerId?: number | null
  /* 举报目标 ID */
  targetId: number
  /* 举报目标类型 */
  targetType: 1 | 2 | 3 | 4 | 5 | 6 | 7
  /* 业务场景类型 */
  sceneType: 1 | 2 | 3 | 10 | 11 | 12
  /* 业务场景根对象 ID */
  sceneId: number
  /* 评论层级（仅评论目标有值） */
  commentLevel?: number | null
  /* 举报原因类型 */
  reasonType: 1 | 2 | 3 | 4 | 99
  /* 详细说明 */
  description?: string | null
  /* 证据图片URL */
  evidenceUrl?: string | null
  /* 举报状态 */
  status: 1 | 2 | 3 | 4
  /* 处理备注 */
  handlingNote?: string | null
  /* 处理时间 */
  handledAt?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [HandleAdminReportDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type HandleAdminReportDto = {
  /* 主键id */
  id: number
  /* 裁决结果，仅允许已解决或已驳回 */
  status: 3 | 4
  /* 处理备注 */
  handlingNote?: string | null

  /** 任意合法数值 */
  [property: string]: any
}