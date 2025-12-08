/**
 *  类型定义 [AuditPageRequest]
 *  @来源 审计日志模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type AuditPageRequest = {
  /* 单页大小，最大500，默认15 */
  pageSize?: number

  /* 当前页码 */
  pageIndex?: number

  /* 排序字段，json格式 */
  orderBy?: string

  /* 开始时间 */
  startDate?: string

  /* 结束时间 */
  endDate?: string

  /* 用户ID */
  userId?: number

  /* 用户名 */
  username?: string

  /* 接口类型（admin/client/system等） */
  apiType?: string

  /* IP地址 */
  ip?: string

  /* 请求方法 */
  method?: string

  /* 请求路径 */
  path?: string

  /* 操作类型 */
  actionType?: string

  /* 操作是否成功 */
  isSuccess?: boolean

  /** 任意合法数值 */
  [property: string]: any
}

export type AuditPageResponse = {
  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: BaseAuditDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseAuditDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type BaseAuditDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 用户ID */
  userId?: number
  /* 用户名 */
  username?: string
  /* 接口类型（admin/client/system等） */
  apiType?: 'admin' | 'client' | 'system' | 'public'
  /* IP地址 */
  ip?: string
  /* 请求方法 */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'
  /* 请求路径 */
  path: string
  /* 请求参数（JSON格式） */
  params?: string
  /* 操作类型 */
  actionType?: '用户登录' | '用户登出' | '创建数据' | '更新数据' | '删除数据' | '文件上传' | '文件下载' | '数据导出' | '数据导入'
  /* 操作是否成功 */
  isSuccess: boolean
  /* 设备信息（User-Agent） */
  userAgent?: string
  /* 设备信息解析结果（JSON） */
  device?: string
  /* 自定义日志内容 */
  content: string

  /** 任意合法数值 */
  [property: string]: any
}