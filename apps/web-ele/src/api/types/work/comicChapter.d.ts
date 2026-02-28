/**
 *  类型定义 [ComicChapterCreateRequest]
 *  @来源 内容管理/漫画章节模块
 *  @更新时间 2026-03-01 00:17:14
 */
export type ComicChapterCreateRequest = CreateWorkChapterDto;

export type ComicChapterCreateResponse = IdDto;

/**
 *  类型定义 [ComicChapterPageRequest]
 *  @来源 内容管理/漫画章节模块
 *  @更新时间 2026-03-01 00:17:14
 */
export type ComicChapterPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否为试读章节 */
  isPreview?: boolean;

  /* 发布状态 */
  isPublished?: boolean;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 章节标题 */
  title?: string;

  /* 查看规则（-1=继承, 0=所有人, 1=登录用户, 2=会员, 3=积分购买） */
  viewRule?: number;

  /* 作品ID */
  workId: number;
};

export type ComicChapterPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: IdDto[];

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
 *  @更新时间 2026-03-01 00:17:14
 */
export type ComicChapterDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ComicChapterDetailResponse = IdDto;

/**
 *  类型定义 [ComicChapterUpdateRequest]
 *  @来源 内容管理/漫画章节模块
 *  @更新时间 2026-03-01 00:17:14
 */
export type ComicChapterUpdateRequest = UpdateWorkChapterDto;

export type ComicChapterUpdateResponse = IdDto;

/**
 *  类型定义 [ComicChapterDeleteRequest]
 *  @来源 内容管理/漫画章节模块
 *  @更新时间 2026-03-01 00:17:14
 */
export type ComicChapterDeleteRequest = IdDto;

export type ComicChapterDeleteResponse = IdDto;

/**
 *  类型定义 [ComicChapterSwapSortOrderRequest]
 *  @来源 内容管理/漫画章节模块
 *  @更新时间 2026-03-01 00:17:14
 */
export type ComicChapterSwapSortOrderRequest = DragReorderDto;

export type ComicChapterSwapSortOrderResponse = DragReorderDto;

/**
 *  类型定义 [CreateWorkChapterDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 00:17:14
 */
export type CreateWorkChapterDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否允许评论 */
  canComment: boolean;
  /* 是否允许下载 */
  canDownload: boolean;
  /* 是否允许兑换 */
  canExchange: boolean;
  /* 内容存储路径 */
  content?: null | string;
  /* 章节封面 */
  cover?: null | string;
  /* 章节描述 */
  description?: null | string;
  /* 章节兑换积分 */
  exchangePoints: number;
  /* 是否为试读章节 */
  isPreview: boolean;
  /* 发布状态 */
  isPublished: boolean;
  /* 章节价格（0=免费） */
  price: number;
  /* 发布时间 */
  publishAt?: null | string;
  /* 备注 */
  remark?: null | string;
  /* 阅读所需会员等级ID */
  requiredViewLevelId?: null | number;
  /* 章节序号 */
  sortOrder: number;
  /* 章节副标题 */
  subtitle?: null | string;
  /* 章节标题 */
  title: string;
  /* 查看规则（-1=继承, 0=所有人, 1=登录用户, 2=会员, 3=积分购买） */
  viewRule: -1 | 0 | 1 | 2 | 3;
  /* 作品ID */
  workId: number;

  /* 作品类型（1=漫画, 2=小说） */
  workType: number;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 00:17:14
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [UpdateWorkChapterDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 00:17:14
 */
export type UpdateWorkChapterDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否允许评论 */
  canComment?: boolean;
  /* 是否允许下载 */
  canDownload?: boolean;
  /* 是否允许兑换 */
  canExchange?: boolean;
  /* 内容存储路径 */
  content?: null | string;
  /* 章节封面 */
  cover?: null | string;
  /* 章节描述 */
  description?: null | string;
  /* 章节兑换积分 */
  exchangePoints?: number;
  /* 主键id */
  id: number;
  /* 是否为试读章节 */
  isPreview?: boolean;
  /* 发布状态 */
  isPublished?: boolean;
  /* 章节价格（0=免费） */
  price?: number;
  /* 发布时间 */
  publishAt?: null | string;
  /* 备注 */
  remark?: null | string;
  /* 阅读所需会员等级ID */
  requiredViewLevelId?: null | number;
  /* 章节序号 */
  sortOrder?: number;
  /* 章节副标题 */
  subtitle?: null | string;
  /* 章节标题 */
  title?: string;
  /* 查看规则（-1=继承, 0=所有人, 1=登录用户, 2=会员, 3=积分购买） */
  viewRule?: -1 | 0 | 1 | 2 | 3;
  /* 作品ID */
  workId?: number;

  /* 作品类型（1=漫画, 2=小说） */
  workType?: number;
};

/**
 *  类型定义 [DragReorderDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 00:17:14
 */
export type DragReorderDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前拖拽元素的id */
  dragId: number;

  /* 拖拽的目标位置id */
  targetId: number;
};
