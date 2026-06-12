/**
 *  类型定义 [AppPageCreateRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppPageCreateRequest = CreateAppPageDto;

export type AppPageCreateResponse = boolean;

/**
 *  类型定义 [AppPagePageRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppPagePageRequest = {
  /* 页面权限级别（0=游客；1=登录；2=会员；3=高级会员） */
  accessLevel?: null | number;

  /* 页面编码（唯一标识） */
  code?: null | string;

  /* 启用平台筛选 JSON 字符串，例如 [1,2] */
  enablePlatform?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 页面启用状态 */
  isEnabled?: boolean | null;

  /* 页面名称 */
  name?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type AppPagePageResponse = {
  /* 列表数据 */
  list?: AppPageOutputDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [AppPageDetailRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppPageDetailRequest = {
  /* 主键id */
  id: number;
};

export type AppPageDetailResponse = AppPageOutputDto;

/**
 *  类型定义 [AppPageCodeDetailRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppPageCodeDetailRequest = {
  /* 页面编码（唯一标识） */
  code: string;
};

export type AppPageCodeDetailResponse = AppPageOutputDto;

/**
 *  类型定义 [AppPageUpdateRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppPageUpdateRequest = UpdateAppPageDto;

export type AppPageUpdateResponse = boolean;

/**
 *  类型定义 [AppPageDeleteRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppPageDeleteRequest = IdsDto;

export type AppPageDeleteResponse = boolean;

/**
 *  类型定义 [CreateAppPageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateAppPageDto = {
  /* 页面权限级别（0=游客；1=登录；2=会员；3=高级会员） */
  accessLevel: number;
  /* 页面编码（唯一标识） */
  code: string;
  /* 页面描述信息 */
  description?: null | string;
  /* 启用的平台（1=H5；2=App；3=小程序） */
  enablePlatform?: null | number[];
  /* 页面启用状态 */
  isEnabled: boolean;
  /* 页面名称 */
  name: string;
  /* 页面路径（URL 路径） */
  path: string;
  /* 页面标题 */
  title: string;
};

/**
 *  类型定义 [AppPageOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AppPageOutputDto = {
  /* 页面权限级别（0=游客；1=登录；2=会员；3=高级会员） */
  accessLevel: number;
  /* 页面编码（唯一标识） */
  code: string;
  /* 创建时间 */
  createdAt: string;
  /* 页面描述信息 */
  description?: null | string;
  /* 启用的平台（1=H5；2=App；3=小程序） */
  enablePlatform?: null | number[];
  /* 主键id */
  id: number;
  /* 页面启用状态 */
  isEnabled: boolean;
  /* 页面名称 */
  name: string;
  /* 页面路径（URL 路径） */
  path: string;
  /* 页面标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [UpdateAppPageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateAppPageDto = {
  /* 页面权限级别（0=游客；1=登录；2=会员；3=高级会员） */
  accessLevel?: null | number;
  /* 页面编码（唯一标识） */
  code?: null | string;
  /* 页面描述信息 */
  description?: null | string;
  /* 启用的平台（1=H5；2=App；3=小程序） */
  enablePlatform?: null | number[];
  /* 主键id */
  id: number;
  /* 页面启用状态 */
  isEnabled?: boolean | null;
  /* 页面名称 */
  name?: null | string;
  /* 页面路径（URL 路径） */
  path?: null | string;
  /* 页面标题 */
  title?: null | string;
};

/**
 *  类型定义 [IdsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type IdsDto = {
  /* 主键id集合 */
  ids: number[];
};

/**
 *  类型定义 [BaseAppPageDto]
 *  @来源 legacy compatibility alias
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseAppPageDto = AppPageOutputDto;
