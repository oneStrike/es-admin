export type ThirdPartyPlatformResponse = PlatformResponseDto[];

/**
 *  类型定义 [ThirdPartySearchRequest]
 *  @来源 内容管理/漫画管理模块/三方平台内容解析
 *  @更新时间 2026-01-27 15:37:13
 */
export type ThirdPartySearchRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 搜索关键词 */
  keyword: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 平台代码 */
  platform: string;

  /* 开始时间 */
  startDate?: null | string;
};

export type ThirdPartySearchResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: SearchComicItemDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ThirdPartyDetailRequest]
 *  @来源 内容管理/漫画管理模块/三方平台内容解析
 *  @更新时间 2026-01-27 15:37:13
 */
export type ThirdPartyDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 漫画ID */
  comicId: string;

  /* 平台代码 */
  platform: string;
};

export type ThirdPartyDetailResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: SearchComicItemDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ThirdPartyChapterRequest]
 *  @来源 内容管理/漫画管理模块/三方平台内容解析
 *  @更新时间 2026-01-27 15:37:13
 */
export type ThirdPartyChapterRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 漫画ID */
  comicId: string;

  /* 平台代码 */
  platform: string;
};

export type ThirdPartyChapterResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: SearchComicItemDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ThirdPartyChapterContentRequest]
 *  @来源 内容管理/漫画管理模块/三方平台内容解析
 *  @更新时间 2026-01-27 15:37:13
 */
export type ThirdPartyChapterContentRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 漫画ID */
  comicId: string;

  /* 平台代码 */
  platform: string;
};

export type ThirdPartyChapterContentResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: SearchComicItemDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [PlatformResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-27 15:37:13
 */
export type PlatformResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 平台名称code */
  code: string;

  /* 平台名称 */
  name: string;
};

/**
 *  类型定义 [SearchComicItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-27 15:37:13
 */
export type SearchComicItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 作者列表 */
  author: string[];
  /* 封面图片URL */
  cover: string;
  /* 主键id */
  id: number;
  /* 漫画名称 */
  name: string;

  /* 来源平台 */
  source: string;
};
