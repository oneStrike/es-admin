/**
 *  类型定义 [ComicCreateRequest]
 *  @来源 漫画管理模块
 *  @更新时间 2025-12-18 09:21:02
 */
export type ComicCreateRequest = CreateComicDto;

export type ComicCreateResponse = IdDto;

/**
 *  类型定义 [ComicPageRequest]
 *  @来源 漫画管理模块
 *  @更新时间 2025-12-18 09:21:02
 */
export type ComicPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 年龄分级 */
  ageRating?: string;

  /* 作者名称 */
  author?: string;

  /* 关联的分类ID列表 */
  categoryIds?: any[];

  /* 结束时间 */
  endDate?: string;

  /* 是否热门 */
  isHot?: boolean;

  /* 是否新作 */
  isNew?: boolean;

  /* 发布状态 */
  isPublished?: boolean;

  /* 是否推荐 */
  isRecommended?: boolean;

  /* 语言代码 */
  language?: string;

  /* 漫画名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: string;

  /* 当前页码 */
  pageIndex?: number;

  /* 单页大小，最大500，默认15 */
  pageSize?: number;

  /* 出版社 */
  publisher?: string;

  /* 地区代码 */
  region?: string;

  /* 连载状态 */
  serialStatus?: number;

  /* 开始时间 */
  startDate?: string;

  /* 关联的标签ID列表 */
  tagIds?: any[];
};

export type ComicPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseComicDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ComicDetailRequest]
 *  @来源 漫画管理模块
 *  @更新时间 2025-12-18 09:21:02
 */
export type ComicDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ComicDetailResponse = BaseComicDto;

/**
 *  类型定义 [ComicUpdateRequest]
 *  @来源 漫画管理模块
 *  @更新时间 2025-12-18 09:21:02
 */
export type ComicUpdateRequest = UpdateComicDto;

export type ComicUpdateResponse = IdDto;

/**
 *  类型定义 [ComicDeleteRequest]
 *  @来源 漫画管理模块
 *  @更新时间 2025-12-18 09:21:02
 */
export type ComicDeleteRequest = IdDto;

export type ComicDeleteResponse = IdDto;

/**
 *  类型定义 [ComicUpdateStatusRequest]
 *  @来源 漫画管理模块
 *  @更新时间 2025-12-18 09:21:02
 */
export type ComicUpdateStatusRequest = UpdateComicStatusDto;

export type ComicUpdateStatusResponse = BatchOperationResponseDto;

/**
 *  类型定义 [ComicUpdateRecommendedRequest]
 *  @来源 漫画管理模块
 *  @更新时间 2025-12-18 09:21:02
 */
export type ComicUpdateRecommendedRequest = UpdateComicRecommendedDto;

export type ComicUpdateRecommendedResponse = BatchOperationResponseDto;

/**
 *  类型定义 [ComicUpdateHotRequest]
 *  @来源 漫画管理模块
 *  @更新时间 2025-12-18 09:21:02
 */
export type ComicUpdateHotRequest = UpdateComicHotDto;

export type ComicUpdateHotResponse = BatchOperationResponseDto;

/**
 *  类型定义 [ComicUpdateNewRequest]
 *  @来源 漫画管理模块
 *  @更新时间 2025-12-18 09:21:02
 */
export type ComicUpdateNewRequest = UpdateComicNewDto;

export type ComicUpdateNewResponse = BatchOperationResponseDto;

/**
 *  类型定义 [CreateComicDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-18 09:21:02
 */
export type CreateComicDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 年龄分级 */
  ageRating: string;
  /* 漫画别名（支持多别名，用逗号分隔） */
  alias?: string;
  /* 关联的作者ID列表 */
  authorIds: number[];
  /* 关联的分类ID列表 */
  categoryIds: number[];
  /* 版权信息 */
  copyright?: string;
  /* 漫画封面URL */
  cover: string;
  /* 漫画简介 */
  description: string;
  /* 免责声明 */
  disclaimer?: string;
  /* 语言代码 */
  language: string;
  /* 最后更新时间 */
  lastUpdated?: string;
  /* 漫画名称 */
  name: string;
  /* 原始来源 */
  originalSource?: string;
  /* 虚拟热度热度权重（影响热度计算） */
  popularityWeight?: number;
  /* 发布日期 */
  publishAt?: string;
  /* 出版社 */
  publisher?: string;
  /* 评分（1-10分，保留1位小数） */
  rating?: number;
  /* 推荐权重（影响推荐排序） */
  recommendWeight?: number;
  /* 地区代码 */
  region: string;
  /* 管理员备注 */
  remark?: string;
  /* 连载状态 */
  serialStatus: 0 | 1 | 2 | 3;

  /* 关联的标签ID列表 */
  tagIds?: number[];
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-18 09:21:02
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [BaseComicDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-18 09:21:02
 */
export type BaseComicDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 年龄分级 */
  ageRating: string;
  /* 漫画别名（支持多别名，用逗号分隔） */
  alias?: string;
  /* 漫画作者 */
  comicAuthors: ComicAuthorDto[];
  /* 漫画分类 */
  comicCategories: ComicCategoryDto[];
  /* 漫画标签 */
  comicTags: ComicTagDto[];
  /* 版权信息 */
  copyright?: string;
  /* 漫画封面URL */
  cover: string;
  /* 创建时间 */
  createdAt: string;
  /* 软删除时间 */
  deletedAt?: string;
  /* 漫画简介 */
  description: string;
  /* 免责声明 */
  disclaimer?: string;
  /* 主键id */
  id: number;
  /* 是否热门 */
  isHot: boolean;
  /* 是否新作 */
  isNew: boolean;
  /* 发布状态 */
  isPublished: boolean;
  /* 是否推荐 */
  isRecommended: boolean;
  /* 语言代码 */
  language: string;
  /* 最后更新时间 */
  lastUpdated?: string;
  /* 漫画名称 */
  name: string;
  /* 原始来源 */
  originalSource?: string;
  /* 热度值（用于排序） */
  popularity: number;
  /* 虚拟热度热度权重（影响热度计算） */
  popularityWeight?: number;
  /* 发布日期 */
  publishAt?: string;
  /* 出版社 */
  publisher?: string;
  /* 评分（1-10分，保留1位小数） */
  rating?: number;
  /* 推荐权重（影响推荐排序） */
  recommendWeight?: number;
  /* 地区代码 */
  region: string;
  /* 管理员备注 */
  remark?: string;
  /* 连载状态 */
  serialStatus: 0 | 1 | 2 | 3;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [ComicCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-18 09:21:02
 */
export type ComicCategoryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分类ID */
  id: number;

  /* 分类名称 */
  name: string;
};

/**
 *  类型定义 [ComicAuthorDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-18 09:21:02
 */
export type ComicAuthorDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 作者ID */
  id: number;
  /* 是否为主要作者 */
  isPrimary: boolean;
  /* 作者名称 */
  name: string;

  /* 排序 */
  sortOrder: number;
};

/**
 *  类型定义 [ComicTagDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-18 09:21:02
 */
export type ComicTagDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 标签ID */
  id: number;

  /* 标签名称 */
  name: string;
};

/**
 *  类型定义 [UpdateComicDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-18 09:21:02
 */
export type UpdateComicDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 年龄分级 */
  ageRating?: string;
  /* 漫画别名（支持多别名，用逗号分隔） */
  alias?: string;
  /* 关联的作者ID列表 */
  authorIds?: number[];
  /* 关联的分类ID列表 */
  categoryIds?: number[];
  /* 版权信息 */
  copyright?: string;
  /* 漫画封面URL */
  cover?: string;
  /* 漫画简介 */
  description?: string;
  /* 免责声明 */
  disclaimer?: string;
  /* 主键id */
  id: number;
  /* 语言代码 */
  language?: string;
  /* 最后更新时间 */
  lastUpdated?: string;
  /* 漫画名称 */
  name?: string;
  /* 原始来源 */
  originalSource?: string;
  /* 虚拟热度热度权重（影响热度计算） */
  popularityWeight?: number;
  /* 发布日期 */
  publishAt?: string;
  /* 出版社 */
  publisher?: string;
  /* 评分（1-10分，保留1位小数） */
  rating?: number;
  /* 推荐权重（影响推荐排序） */
  recommendWeight?: number;
  /* 地区代码 */
  region?: string;
  /* 管理员备注 */
  remark?: string;
  /* 连载状态 */
  serialStatus?: 0 | 1 | 2 | 3;

  /* 关联的标签ID列表 */
  tagIds?: number[];
};

/**
 *  类型定义 [UpdateComicStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-18 09:21:02
 */
export type UpdateComicStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 发布状态 */
  isPublished: boolean;
};

/**
 *  类型定义 [BatchOperationResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-18 09:21:02
 */
export type BatchOperationResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 操作成功的数据量 */
  count: number;
};

/**
 *  类型定义 [UpdateComicRecommendedDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-18 09:21:02
 */
export type UpdateComicRecommendedDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否推荐 */
  isRecommended: boolean;
};

/**
 *  类型定义 [UpdateComicHotDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-18 09:21:02
 */
export type UpdateComicHotDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否热门 */
  isHot: boolean;
};

/**
 *  类型定义 [UpdateComicNewDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-18 09:21:02
 */
export type UpdateComicNewDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否新作 */
  isNew: boolean;
};
