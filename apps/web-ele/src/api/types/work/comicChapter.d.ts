/**
 *  类型定义 [ComicChapterCreateRequest]
 *  @来源 内容管理/漫画章节模块
 *  @更新时间 2026-02-04 10:33:56
 */
export type ComicChapterCreateRequest = CreateComicChapterDto;

export type ComicChapterCreateResponse = IdDto;

/**
 *  类型定义 [ComicChapterPageRequest]
 *  @来源 内容管理/漫画章节模块
 *  @更新时间 2026-02-04 10:33:56
 */
export type ComicChapterPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 是否允许评论 */
  canComment?: boolean;

  /* 关联的漫画ID */
  comicId?: number;

  /* 下载规则（0: 禁止, 1: 允许, 2: VIP可下载, 3: 积分可下载） */
  downloadRule?: number;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否为试读章节 */
  isPreview?: boolean;

  /* 发布状态（true: 已发布, false: 未发布） */
  isPublished?: boolean;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买） */
  readRule?: number;

  /* 开始时间 */
  startDate?: null | string;

  /* 章节标题 */
  title?: string;
};

export type ComicChapterPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: ComicChapterPageResponseDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ComicChapterDetailRequest]
 *  @来源 内容管理/漫画章节模块
 *  @更新时间 2026-02-04 10:33:56
 */
export type ComicChapterDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ComicChapterDetailResponse = ComicChapterDetailDto;

/**
 *  类型定义 [ComicChapterUpdateRequest]
 *  @来源 内容管理/漫画章节模块
 *  @更新时间 2026-02-04 10:33:56
 */
export type ComicChapterUpdateRequest = UpdateComicChapterDto;

export type ComicChapterUpdateResponse = IdDto;

/**
 *  类型定义 [ComicChapterDeleteRequest]
 *  @来源 内容管理/漫画章节模块
 *  @更新时间 2026-02-04 10:33:56
 */
export type ComicChapterDeleteRequest = IdDto;

export type ComicChapterDeleteResponse = IdDto;

/**
 *  类型定义 [ComicChapterSwapSortOrderRequest]
 *  @来源 内容管理/漫画章节模块
 *  @更新时间 2026-02-04 10:33:56
 */
export type ComicChapterSwapSortOrderRequest = DragReorderDto;

export type ComicChapterSwapSortOrderResponse = DragReorderDto;

/**
 *  类型定义 [CreateComicChapterDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-04 10:33:56
 */
export type CreateComicChapterDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否允许评论 */
  canComment: boolean;
  /* 关联的漫画ID */
  comicId: number;
  /* 章节描述 */
  description?: null | string;
  /* 下载所需要的积分 */
  downloadPoints?: null | number;
  /* 下载规则（0: 禁止, 1: 允许, 2: VIP可下载, 3: 积分可下载） */
  downloadRule: 0 | 1 | 2 | 3;
  /* 是否为试读章节 */
  isPreview: boolean;
  /* 发布状态（true: 已发布, false: 未发布） */
  isPublished: boolean;
  /* 发布时间 */
  publishAt?: null | string;
  /* 购买需要消耗的积分 */
  readPoints?: null | number;
  /* 查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买） */
  readRule: 0 | 1 | 2 | 3;
  /* 管理员备注 */
  remark?: null | string;
  /* 允许下载的会员等级ID */
  requiredDownloadLevelId?: null | number;
  /* 允许查看的会员等级ID */
  requiredReadLevelId?: null | number;
  /* 章节序号（用于排序） */
  sortOrder: number;
  /* 章节副标题或描述 */
  subtitle?: null | string;
  /* 章节缩略图 */
  thumbnail?: null | string;

  /* 章节标题 */
  title: string;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-04 10:33:56
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [ComicChapterPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-04 10:33:56
 */
export type ComicChapterPageResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否允许评论 */
  canComment: boolean;
  /* 关联的漫画ID */
  comicId: number;
  /* 评论数 */
  commentCount: number;
  /* 创建时间 */
  createdAt: string;
  /* 下载所需要的积分 */
  downloadPoints?: null | number;
  /* 下载规则（0: 禁止, 1: 允许, 2: VIP可下载, 3: 积分可下载） */
  downloadRule: 0 | 1 | 2 | 3;
  /* 主键id */
  id: number;
  /* 是否为试读章节 */
  isPreview: boolean;
  /* 发布状态（true: 已发布, false: 未发布） */
  isPublished: boolean;
  /* 点赞数 */
  likeCount: number;
  /* 发布时间 */
  publishAt?: null | string;
  /* 购买次数 */
  purchaseCount: number;
  /* 购买需要消耗的积分 */
  readPoints?: null | number;
  /* 查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买） */
  readRule: 0 | 1 | 2 | 3;
  /* 允许下载的会员等级ID */
  requiredDownloadLevelId?: null | number;
  /* 允许查看的会员等级ID */
  requiredReadLevelId?: null | number;
  /* 章节序号（用于排序） */
  sortOrder: number;
  /* 章节副标题或描述 */
  subtitle?: null | string;
  /* 章节缩略图 */
  thumbnail?: null | string;
  /* 章节标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;

  /* 阅读次数 */
  viewCount: number;
};

/**
 *  类型定义 [ComicChapterDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-04 10:33:56
 */
export type ComicChapterDetailDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否允许评论 */
  canComment: boolean;
  /* 关联的漫画ID */
  comicId: number;
  /* 评论数 */
  commentCount: number;
  /* 漫画内容（JSON格式存储图片URL数组） */
  contents: string;
  /* 创建时间 */
  createdAt: string;
  /* 章节描述 */
  description?: null | string;
  /* 下载所需要的积分 */
  downloadPoints?: null | number;
  /* 下载规则（0: 禁止, 1: 允许, 2: VIP可下载, 3: 积分可下载） */
  downloadRule: 0 | 1 | 2 | 3;
  /* 主键id */
  id: number;
  /* 是否为试读章节 */
  isPreview: boolean;
  /* 发布状态（true: 已发布, false: 未发布） */
  isPublished: boolean;
  /* 点赞数 */
  likeCount: number;
  /* 发布时间 */
  publishAt?: null | string;
  /* 购买次数 */
  purchaseCount: number;
  /* 购买需要消耗的积分 */
  readPoints?: null | number;
  /* 查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买） */
  readRule: 0 | 1 | 2 | 3;
  /* 关联的漫画信息 */
  relatedComic: RelatedComicDto;
  /* 管理员备注 */
  remark?: null | string;
  /* 允许下载的会员等级信息 */
  requiredDownloadLevel?: RelatedMemberLevelDto;
  /* 允许下载的会员等级ID */
  requiredDownloadLevelId?: null | number;
  /* 允许查看的会员等级信息 */
  requiredReadLevel?: RelatedMemberLevelDto;
  /* 允许查看的会员等级ID */
  requiredReadLevelId?: null | number;
  /* 章节序号（用于排序） */
  sortOrder: number;
  /* 章节副标题或描述 */
  subtitle?: null | string;
  /* 章节缩略图 */
  thumbnail?: null | string;
  /* 章节标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;

  /* 阅读次数 */
  viewCount: number;
};

/**
 *  类型定义 [RelatedComicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-04 10:33:56
 */
export type RelatedComicDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 漫画ID */
  id: number;

  /* 漫画名字 */
  name: string;
};

/**
 *  类型定义 [RelatedMemberLevelDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-04 10:33:56
 */
export type RelatedMemberLevelDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 会员等级颜色 */
  color: string;
  /* 会员等级ID */
  id: number;

  /* 会员等级名称 */
  name: string;
};

/**
 *  类型定义 [UpdateComicChapterDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-04 10:33:56
 */
export type UpdateComicChapterDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否允许评论 */
  canComment: boolean;
  /* 关联的漫画ID */
  comicId: number;
  /* 章节描述 */
  description?: null | string;
  /* 下载所需要的积分 */
  downloadPoints?: null | number;
  /* 下载规则（0: 禁止, 1: 允许, 2: VIP可下载, 3: 积分可下载） */
  downloadRule: 0 | 1 | 2 | 3;
  /* 主键id */
  id: number;
  /* 是否为试读章节 */
  isPreview: boolean;
  /* 发布状态（true: 已发布, false: 未发布） */
  isPublished: boolean;
  /* 发布时间 */
  publishAt?: null | string;
  /* 购买需要消耗的积分 */
  readPoints?: null | number;
  /* 查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买） */
  readRule: 0 | 1 | 2 | 3;
  /* 管理员备注 */
  remark?: null | string;
  /* 允许下载的会员等级ID */
  requiredDownloadLevelId?: null | number;
  /* 允许查看的会员等级ID */
  requiredReadLevelId?: null | number;
  /* 章节序号（用于排序） */
  sortOrder: number;
  /* 章节副标题或描述 */
  subtitle?: null | string;
  /* 章节缩略图 */
  thumbnail?: null | string;

  /* 章节标题 */
  title: string;
};

/**
 *  类型定义 [DragReorderDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-04 10:33:56
 */
export type DragReorderDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前拖拽元素的id */
  dragId: number;

  /* 拖拽的目标位置id */
  targetId: number;
};
