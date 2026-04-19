/**
 *  类型定义 [AuditPageRequest]
 *  @来源 系统管理/审计日志
 *  @更新时间 2026-04-19 15:54:06
 */
export type AuditPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 操作类型（1=登录；2=登出；3=创建；4=更新；5=删除；6=上传；7=下载；8=导出；9=导入） */
  actionType?: null | number

  /* 接口类型（1=管理端；2=应用端；3=系统端；4=公共端） */
  apiType?: null | number

  /* 结束时间 */
  endDate?: null | string

  /* IP地址 */
  ip?: null | string

  /* 操作是否成功 */
  isSuccess?: boolean

  /* 请求方法（GET；POST；PUT；DELETE；PATCH；HEAD；OPTIONS） */
  method?: string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 请求路径 */
  path?: string

  /* 开始时间 */
  startDate?: null | string

  /* 用户ID */
  userId?: null | number

  /* 用户名 */
  username?: null | string
}

export type AuditPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AuditItemDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [AuditItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type AuditItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 操作类型（1=登录；2=登出；3=创建；4=更新；5=删除；6=上传；7=下载；8=导出；9=导入） */
  actionType?: null | number
  /* 操作类型展示文案 */
  actionTypeLabel?: null | string
  /* 接口类型（1=管理端；2=应用端；3=系统端；4=公共端） */
  apiType?: null | number
  /* 自定义日志内容 */
  content: string
  /* 创建时间 */
  createdAt: string
  /* 设备信息解析结果（JSON） */
  device?: null | string
  /* 主键id */
  id: number
  /* IP地址 */
  ip?: null | string
  /* 操作是否成功 */
  isSuccess: boolean
  /* 请求方法（GET；POST；PUT；DELETE；PATCH；HEAD；OPTIONS） */
  method: 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT'
  /* 请求参数（JSON格式） */
  params?: null | string
  /* 请求路径 */
  path: string
  /* 更新时间 */
  updatedAt: string
  /* 设备信息（User-Agent） */
  userAgent?: null | string
  /* 用户ID */
  userId?: null | number

  /* 用户名 */
  username?: null | string
}