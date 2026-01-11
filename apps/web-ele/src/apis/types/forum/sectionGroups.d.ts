/**
 *  类型定义 [SectionGroupsListRequest]
 *  @来源 论坛模块/板块组管理
 *  @更新时间 2026-01-11 21:58:01
 */
export type SectionGroupsListRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 分组名称 */
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

export type SectionGroupsListResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: CreateForumSectionGroupDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [SectionGroupsDetailRequest]
 *  @来源 论坛模块/板块组管理
 *  @更新时间 2026-01-11 21:58:01
 */
export type SectionGroupsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type SectionGroupsDetailResponse = CreateForumSectionGroupDto;

export type SectionGroupsAllEnabledResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 响应状态码 */
  code?: number;

  /* 响应消息 */
  message?: string;
};

/**
 *  类型定义 [SectionGroupsAddRequest]
 *  @来源 论坛模块/板块组管理
 *  @更新时间 2026-01-11 21:58:01
 */
export type SectionGroupsAddRequest = CreateForumSectionGroupDto;

export type SectionGroupsAddResponse = CreateForumSectionGroupDto;

/**
 *  类型定义 [SectionGroupsUpdateRequest]
 *  @来源 论坛模块/板块组管理
 *  @更新时间 2026-01-11 21:58:01
 */
export type SectionGroupsUpdateRequest = UpdateForumSectionGroupDto;

export type SectionGroupsUpdateResponse = UpdateForumSectionGroupDto;

/**
 *  类型定义 [SectionGroupsRemoveRequest]
 *  @来源 论坛模块/板块组管理
 *  @更新时间 2026-01-11 21:58:01
 */
export type SectionGroupsRemoveRequest = IdDto;

export type SectionGroupsRemoveResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 响应状态码 */
  code?: number;

  /* 响应消息 */
  message?: string;
};

export type SectionGroupsUpdateEnabledResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 响应状态码 */
  code?: number;

  /* 响应消息 */
  message?: string;
};

/**
 *  类型定义 [CreateForumSectionGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-11 21:58:01
 */
export type CreateForumSectionGroupDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分组描述 */
  description?: null | string;
  /* 是否启用 */
  isEnabled: boolean;
  /* 分组名称 */
  name: string;

  /* 排序权重 */
  sortOrder: number;
};

/**
 *  类型定义 [UpdateForumSectionGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-11 21:58:01
 */
export type UpdateForumSectionGroupDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分组描述 */
  description?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 分组名称 */
  name?: string;

  /* 排序权重 */
  sortOrder?: number;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-11 21:58:01
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};
