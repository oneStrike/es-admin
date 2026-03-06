/**
 *  类型定义 [AppPageCreateRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-03-07 00:42:13
 */
export type AppPageCreateRequest = BaseAppPageDto;

export type AppPageCreateResponse = IdDto;

/**
 *  类型定义 [AppPagePageRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-03-07 00:42:13
 */
export type AppPagePageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 页面权限级别 */
  accessLevel?: number;

  /* 页面编码（唯一标识） */
  code?: string;

  /* 所启用的平台 */
  enablePlatform?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 页面启用状态 */
  isEnabled?: boolean;

  /* 页面名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type AppPagePageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: AppPageResponseDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [AppPageDetailByIdRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-03-07 00:42:13
 */
export type AppPageDetailByIdRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  id: number;
};

export type AppPageDetailByIdResponse = BaseAppPageDto;

/**
 *  类型定义 [AppPageDetailByCodeRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-03-07 00:42:13
 */
export type AppPageDetailByCodeRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  code: string;
};

export type AppPageDetailByCodeResponse = BaseAppPageDto;

/**
 *  类型定义 [AppPageUpdateRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-03-07 00:42:13
 */
export type AppPageUpdateRequest = UpdateAppPageDto;

export type AppPageUpdateResponse = IdDto;

/**
 *  类型定义 [AppPageBatchDeleteRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-03-07 00:42:13
 */
export type AppPageBatchDeleteRequest = IdsDto;

export type AppPageBatchDeleteResponse = BatchOperationResponseDto;

/**
 *  类型定义 [BaseAppPageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type BaseAppPageDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 页面权限级别 */
  accessLevel: 0 | 1 | 2 | 3;
  /* 页面编码（唯一标识） */
  code: string;
  /* 创建时间 */
  createdAt: string;
  /* 页面描述信息 */
  description?: null | string;
  /* 启用的平台 */
  enablePlatform: number[];
  /* 主键id */
  id: number;
  /* 页面启用状态 */
  isEnabled: boolean;
  /* 页面名称 */
  name: string;
  /* 页面路径（URL路径） */
  path: string;
  /* 页面标题 */
  title: string;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [AppPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type AppPageResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 页面权限级别 */
  accessLevel: 0 | 1 | 2 | 3;
  /* 页面编码（唯一标识） */
  code: string;
  /* 创建时间 */
  createdAt: string;
  /* 启用的平台 */
  enablePlatform: number[];
  /* 主键id */
  id: number;
  /* 页面启用状态 */
  isEnabled: boolean;
  /* 页面名称 */
  name: string;
  /* 页面路径（URL路径） */
  path: string;
  /* 页面标题 */
  title: string;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [UpdateAppPageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type UpdateAppPageDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 页面权限级别 */
  accessLevel?: 0 | 1 | 2 | 3;
  /* 页面编码（唯一标识） */
  code?: string;
  /* 页面描述信息 */
  description?: null | string;
  /* 启用的平台 */
  enablePlatform?: number[];
  /* 主键id */
  id: number;
  /* 页面启用状态 */
  isEnabled?: boolean;
  /* 页面名称 */
  name?: string;
  /* 页面路径（URL路径） */
  path?: string;

  /* 页面标题 */
  title?: string;
};

/**
 *  类型定义 [IdsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type IdsDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id集合 */
  ids: number[];
};

/**
 *  类型定义 [BatchOperationResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type BatchOperationResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 操作成功的数据量 */
  count: number;
};
