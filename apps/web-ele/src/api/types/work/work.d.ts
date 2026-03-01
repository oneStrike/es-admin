/**
 *  类型定义 [WorkCreateRequest]
 *  @来源 内容管理/作品管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type WorkCreateRequest = CreateWorkDto;

export type WorkCreateResponse = IdDto;

/**
 *  类型定义 [WorkPageRequest]
 *  @来源 内容管理/作品管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type WorkPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 年龄分级 */
  ageRating?: null | string;

  /* 作者名称 */
  author?: null | string;

  /* 分类ID列表 */
  categoryIds?: any[] | null;

  /* 结束时间 */
  endDate?: null | string;

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

  /* 作品名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 出版社 */
  publisher?: null | string;

  /* 地区代码 */
  region?: string;

  /* 连载状态 */
  serialStatus?: number;

  /* 开始时间 */
  startDate?: null | string;

  /* 标签ID列表 */
  tagIds?: any[] | null;

  /* 作品类型（1=漫画, 2=小说） */
  type: number;
};

export type WorkPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseWorkDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [WorkDetailRequest]
 *  @来源 内容管理/作品管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type WorkDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type WorkDetailResponse = BaseWorkDto;

/**
 *  类型定义 [WorkUpdateRequest]
 *  @来源 内容管理/作品管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type WorkUpdateRequest = UpdateWorkDto;

export type WorkUpdateResponse = IdDto;

/**
 *  类型定义 [WorkUpdateStatusRequest]
 *  @来源 内容管理/作品管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type WorkUpdateStatusRequest = UpdateWorkStatusDto;

export type WorkUpdateStatusResponse = BatchOperationResponseDto;

/**
 *  类型定义 [WorkUpdateRecommendedRequest]
 *  @来源 内容管理/作品管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type WorkUpdateRecommendedRequest = UpdateWorkRecommendedDto;

export type WorkUpdateRecommendedResponse = BatchOperationResponseDto;

/**
 *  类型定义 [WorkUpdateHotRequest]
 *  @来源 内容管理/作品管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type WorkUpdateHotRequest = UpdateWorkHotDto;

export type WorkUpdateHotResponse = BatchOperationResponseDto;

/**
 *  类型定义 [WorkUpdateNewRequest]
 *  @来源 内容管理/作品管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type WorkUpdateNewRequest = UpdateWorkNewDto;

export type WorkUpdateNewResponse = BatchOperationResponseDto;

/**
 *  类型定义 [WorkDeleteRequest]
 *  @来源 内容管理/作品管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type WorkDeleteRequest = IdDto;

export type WorkDeleteResponse = IdDto;

/**
 *  类型定义 [CreateWorkDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type CreateWorkDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 年龄分级 */
  ageRating?: null | string;
  /* 作品别名（支持多别名，用逗号分隔） */
  alias?: null | string;
  /* 关联的作者ID列表 */
  authorIds: number[];
  /* 是否允许评论 */
  canComment: boolean;
  /* 是否允许下载 */
  canDownload: boolean;
  /* 是否允许兑换 */
  canExchange: boolean;
  /* 关联的分类ID列表 */
  categoryIds: number[];
  /* 章节默认兑换积分 */
  chapterExchangePoints: number;
  /* 章节默认购买价格（余额） */
  chapterPrice: number;
  /* 版权信息 */
  copyright?: null | string;
  /* 作品封面URL */
  cover: string;
  /* 作品简介 */
  description: string;
  /* 免责声明 */
  disclaimer?: null | string;
  /* 兑换所需积分 */
  exchangePoints: number;
  /* 是否热门 */
  isHot: boolean;
  /* 是否新作 */
  isNew: boolean;
  /* 是否推荐 */
  isRecommended: boolean;
  /* 语言代码 */
  language: string;
  /* 最后更新时间 */
  lastUpdated?: null | string;
  /* 作品名称 */
  name: string;
  /* 原始来源 */
  originalSource?: null | string;
  /* 作品购买价格（余额） */
  price: number;
  /* 发布日期 */
  publishAt?: null | string;
  /* 出版社 */
  publisher?: null | string;
  /* 购买数 */
  purchaseCount: number;
  /* 评分（1-10分，保留1位小数） */
  rating?: null | number;
  /* 推荐权重 */
  recommendWeight?: null | number;
  /* 地区代码 */
  region: string;
  /* 备注 */
  remark?: null | string;
  /* 阅读所需会员等级ID */
  requiredViewLevelId?: null | number;
  /* 连载状态 */
  serialStatus: 0 | 1 | 2 | 3 | 4;
  /* 关联的标签ID列表 */
  tagIds: number[];
  /* 作品类型（1=漫画, 2=小说） */
  type: 1 | 2;

  /* 查看规则（0=所有人, 1=登录用户, 2=会员, 3=积分购买） */
  viewRule: -1 | 0 | 1 | 2 | 3;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [BaseWorkDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type BaseWorkDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 年龄分级 */
  ageRating?: null | string;
  /* 作品别名（支持多别名，用逗号分隔） */
  alias?: null | string;
  /* 作品作者 */
  authors: WorkAuthorRelationDto[];
  /* 是否允许评论 */
  canComment: boolean;
  /* 是否允许下载 */
  canDownload: boolean;
  /* 是否允许兑换 */
  canExchange: boolean;
  /* 作品分类 */
  categories: WorkCategoryRelationDto[];
  /* 章节默认兑换积分 */
  chapterExchangePoints: number;
  /* 章节默认购买价格（余额） */
  chapterPrice: number;
  /* 版权信息 */
  copyright?: null | string;
  /* 作品封面URL */
  cover: string;
  /* 创建时间 */
  createdAt: string;
  /* 作品简介 */
  description: string;
  /* 免责声明 */
  disclaimer?: null | string;
  /* 下载量 */
  downloadCount: number;
  /* 兑换所需积分 */
  exchangePoints: number;
  /* 收藏数 */
  favoriteCount: number;
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
  lastUpdated?: null | string;
  /* 点赞数 */
  likeCount: number;
  /* 作品名称 */
  name: string;
  /* 原始来源 */
  originalSource?: null | string;
  /* 热度值 */
  popularity: number;
  /* 作品购买价格（余额） */
  price: number;
  /* 发布日期 */
  publishAt?: null | string;
  /* 出版社 */
  publisher?: null | string;
  /* 购买数 */
  purchaseCount: number;
  /* 评分（1-10分，保留1位小数） */
  rating?: null | number;
  /* 评分人数 */
  ratingCount: number;
  /* 推荐权重 */
  recommendWeight?: null | number;
  /* 地区代码 */
  region: string;
  /* 备注 */
  remark?: null | string;
  /* 阅读所需会员等级ID */
  requiredViewLevelId?: null | number;
  /* 连载状态 */
  serialStatus: 0 | 1 | 2 | 3 | 4;
  /* 作品标签 */
  tags: WorkTagRelationDto[];
  /* 作品类型（1=漫画, 2=小说） */
  type: 1 | 2;
  /* 更新时间 */
  updatedAt: string;
  /* 浏览量 */
  viewCount: number;

  /* 查看规则（0=所有人, 1=登录用户, 2=会员, 3=积分购买） */
  viewRule: -1 | 0 | 1 | 2 | 3;
};

/**
 *  类型定义 [WorkAuthorRelationDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type WorkAuthorRelationDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 作者信息 */
  author: AuthorInfoDto;

  /* 排序顺序 */
  sortOrder?: null | number;
};

/**
 *  类型定义 [AuthorInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type AuthorInfoDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 作者头像URL */
  avatar?: null | string;
  /* 主键id */
  id: number;
  /* 作者姓名 */
  name: string;

  /* 作者角色类型，1 => 漫画家 2 => 小说家 */
  type: number[];
};

/**
 *  类型定义 [WorkCategoryRelationDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type WorkCategoryRelationDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分类信息 */
  category: CategoryInfoDto;

  /* 排序顺序 */
  sortOrder?: null | number;
};

/**
 *  类型定义 [CategoryInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type CategoryInfoDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分类图标URL */
  icon?: null | string;
  /* 主键id */
  id: number;

  /* 分类名称 */
  name: string;
};

/**
 *  类型定义 [WorkTagRelationDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type WorkTagRelationDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 排序顺序 */
  sortOrder?: null | number;

  /* 标签信息 */
  tag: TagInfoDto;
};

/**
 *  类型定义 [TagInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type TagInfoDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 标签图标URL */
  icon?: null | string;
  /* 主键id */
  id: number;

  /* 标签名称 */
  name: string;
};

/**
 *  类型定义 [UpdateWorkDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type UpdateWorkDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 年龄分级 */
  ageRating?: null | string;
  /* 作品别名（支持多别名，用逗号分隔） */
  alias?: null | string;
  /* 关联的作者ID列表 */
  authorIds: number[];
  /* 是否允许评论 */
  canComment: boolean;
  /* 是否允许下载 */
  canDownload: boolean;
  /* 是否允许兑换 */
  canExchange: boolean;
  /* 关联的分类ID列表 */
  categoryIds: number[];
  /* 章节默认兑换积分 */
  chapterExchangePoints: number;
  /* 章节默认购买价格（余额） */
  chapterPrice: number;
  /* 版权信息 */
  copyright?: null | string;
  /* 作品封面URL */
  cover: string;
  /* 作品简介 */
  description: string;
  /* 免责声明 */
  disclaimer?: null | string;
  /* 兑换所需积分 */
  exchangePoints: number;
  /* 主键id */
  id: number;
  /* 是否热门 */
  isHot: boolean;
  /* 是否新作 */
  isNew: boolean;
  /* 是否推荐 */
  isRecommended: boolean;
  /* 语言代码 */
  language: string;
  /* 最后更新时间 */
  lastUpdated?: null | string;
  /* 作品名称 */
  name: string;
  /* 原始来源 */
  originalSource?: null | string;
  /* 作品购买价格（余额） */
  price: number;
  /* 发布日期 */
  publishAt?: null | string;
  /* 出版社 */
  publisher?: null | string;
  /* 购买数 */
  purchaseCount: number;
  /* 评分（1-10分，保留1位小数） */
  rating?: null | number;
  /* 推荐权重 */
  recommendWeight?: null | number;
  /* 地区代码 */
  region: string;
  /* 备注 */
  remark?: null | string;
  /* 阅读所需会员等级ID */
  requiredViewLevelId?: null | number;
  /* 连载状态 */
  serialStatus: 0 | 1 | 2 | 3 | 4;
  /* 关联的标签ID列表 */
  tagIds: number[];
  /* 作品类型（1=漫画, 2=小说） */
  type: 1 | 2;

  /* 查看规则（0=所有人, 1=登录用户, 2=会员, 3=积分购买） */
  viewRule: -1 | 0 | 1 | 2 | 3;
};

/**
 *  类型定义 [UpdateWorkStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type UpdateWorkStatusDto = {
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
 *  @更新时间 2026-03-01 13:50:05
 */
export type BatchOperationResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 操作成功的数据量 */
  count: number;
};

/**
 *  类型定义 [UpdateWorkRecommendedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type UpdateWorkRecommendedDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否推荐 */
  isRecommended: boolean;
};

/**
 *  类型定义 [UpdateWorkHotDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type UpdateWorkHotDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否热门 */
  isHot: boolean;
};

/**
 *  类型定义 [UpdateWorkNewDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type UpdateWorkNewDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否新作 */
  isNew: boolean;
};
