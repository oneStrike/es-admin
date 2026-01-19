/**
 *  类型定义 [AuditPageRequest]
 *  @来源 系统管理/审计日志
 *  @更新时间 2026-01-17 23:29:28
 */
export type AuditPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 操作类型 */
  actionType?: null | string;

  /* 接口类型（admin/client/system等） */
  apiType?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* IP地址 */
  ip?: null | string;

  /* 操作是否成功 */
  isSuccess?: boolean;

  /* 请求方法 */
  method?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 请求路径 */
  path?: string;

  /* 开始时间 */
  startDate?: null | string;

  /* 用户ID */
  userId?: null | number;

  /* 用户名 */
  username?: null | string;
};

export type AuditPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseAuditDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [BaseAuditDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-17 23:29:28
 */
export type BaseAuditDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 操作类型 */
  actionType?: null | string;
  /* 接口类型（admin/client/system等） */
  apiType?: null | string;
  /* 自定义日志内容 */
  content: string;
  /* 创建时间 */
  createdAt: string;
  /* 设备信息解析结果（JSON） */
  device?: null | string;
  /* 主键id */
  id: number;
  /* IP地址 */
  ip?: null | string;
  /* 操作是否成功 */
  isSuccess: boolean;
  /* 请求方法 */
  method: 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT';
  /* 请求参数（JSON格式） */
  params?: null | string;
  /* 请求路径 */
  path: string;
  /* 更新时间 */
  updatedAt: string;
  /* 设备信息（User-Agent） */
  userAgent?: null | string;
  /* 用户ID */
  userId?: null | number;

  /* 用户名 */
  username?: null | string;
};
