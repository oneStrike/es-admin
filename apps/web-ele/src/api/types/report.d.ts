/**
 *  类型定义 [ReportPageRequest]
 *  @来源 内容治理/举报处理
 *  @更新时间 2026-04-14 17:17:49
 */
export type ReportPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 处理人 ID */
  handlerId?: null | number

  /* 主键id */
  id?: number

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 举报原因类型（1=垃圾信息；2=不当内容；3=骚扰；4=版权侵权；99=其他） */
  reasonType?: number

  /* 举报人 ID */
  reporterId?: number

  /* 业务场景根对象 ID */
  sceneId?: number

  /* 业务场景类型（1=漫画作品；2=小说作品；3=论坛主题；10=漫画章节；11=小说章节；12=用户主页） */
  sceneType?: number

  /* 开始时间 */
  startDate?: null | string

  /* 举报状态（1=待处理；2=处理中；3=已解决；4=已驳回） */
  status?: number

  /* 举报目标 ID */
  targetId?: number

  /* 举报目标类型（1=漫画；2=小说；3=漫画章节；4=小说章节；5=论坛主题；6=评论；7=用户） */
  targetType?: number
}

export type ReportPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseReportDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ReportDetailRequest]
 *  @来源 内容治理/举报处理
 *  @更新时间 2026-04-14 17:17:49
 */
export type ReportDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ReportDetailResponse = BaseReportDto

/**
 *  类型定义 [ReportHandleRequest]
 *  @来源 内容治理/举报处理
 *  @更新时间 2026-04-14 17:17:49
 */
export type ReportHandleRequest = HandleAdminReportDto

export type ReportHandleResponse = boolean

/**
 *  类型定义 [BaseReportDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-14 17:17:49
 */
export type BaseReportDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 评论层级（1=根评论；2=回复评论） */
  commentLevel?: null | number
  /* 创建时间 */
  createdAt: string
  /* 详细说明 */
  description?: null | string
  /* 证据图片URL */
  evidenceUrl?: null | string
  /* 处理时间 */
  handledAt?: null | string
  /* 处理人 ID */
  handlerId?: null | number
  /* 处理备注 */
  handlingNote?: null | string
  /* 主键id */
  id: number
  /* 举报原因类型（1=垃圾信息；2=不当内容；3=骚扰；4=版权侵权；99=其他） */
  reasonType: 1 | 2 | 3 | 4 | 99
  /* 举报人 ID */
  reporterId: number
  /* 业务场景根对象 ID */
  sceneId: number
  /* 业务场景类型（1=漫画作品；2=小说作品；3=论坛主题；10=漫画章节；11=小说章节；12=用户主页） */
  sceneType: 1 | 2 | 3 | 10 | 11 | 12
  /* 举报状态（1=待处理；2=处理中；3=已解决；4=已驳回） */
  status: 1 | 2 | 3 | 4
  /* 举报目标 ID */
  targetId: number
  /* 举报目标类型（1=漫画；2=小说；3=漫画章节；4=小说章节；5=论坛主题；6=评论；7=用户） */
  targetType: 1 | 2 | 3 | 4 | 5 | 6 | 7

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [HandleAdminReportDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-14 17:17:49
 */
export type HandleAdminReportDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 处理备注 */
  handlingNote?: null | string
  /* 主键id */
  id: number

  /* 裁决结果，仅允许已解决或已驳回 */
  status: 3 | 4
}