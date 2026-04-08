/**
 *  类型定义 [AuditPageRequest]
 *  @来源 系统管理/审计日志
 *  @更新时间 2026-04-08 08:36:51
 */
export type AuditPageRequest = {
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

  /* 用户ID */
  userId?: number | null

  /* 用户名 */
  username?: string | null

  /* 接口类型（admin/app/system等） */
  apiType?: string | null

  /* IP地址 */
  ip?: string | null

  /* 请求方法 */
  method?: string

  /* 请求路径 */
  path?: string

  /* 操作类型编码 */
  actionType?: string | null

  /* 操作是否成功 */
  isSuccess?: boolean

  /** 任意合法数值 */
  [property: string]: any
}

export type AuditPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: AuditItemDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AuditItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type AuditItemDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 用户ID */
  userId?: number | null
  /* 用户名 */
  username?: string | null
  /* 接口类型（admin/app/system等） */
  apiType?: string | null
  /* IP地址 */
  ip?: string | null
  /* 请求方法 */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'
  /* 请求路径 */
  path: string
  /* 请求参数（JSON格式） */
  params?: string | null
  /* 操作类型编码 */
  actionType?: string | null
  /* 操作是否成功 */
  isSuccess: boolean
  /* 设备信息（User-Agent） */
  userAgent?: string | null
  /* 设备信息解析结果（JSON） */
  device?: string | null
  /* 自定义日志内容 */
  content: string
  /* 操作类型展示文案 */
  actionTypeLabel?: string | null

  /** 任意合法数值 */
  [property: string]: any
}