/**
 *  类型定义 [ComicChapterCreateRequest]
 *  @来源 内容管理/漫画管理模块/章节管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type ComicChapterCreateRequest = CreateComicChapterDto;

export type ComicChapterCreateResponse = IdDto;

/**
 *  类型定义 [ComicChapterPageRequest]
 *  @来源 内容管理/漫画管理模块/章节管理
 *  @更新时间 2026-01-27 15:37:13
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
 *  @来源 内容管理/漫画管理模块/章节管理
 *  @更新时间 2026-01-27 15:37:13
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
 *  @来源 内容管理/漫画管理模块/章节管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type ComicChapterUpdateRequest = UpdateComicChapterDto;

export type ComicChapterUpdateResponse = IdDto;

/**
 *  类型定义 [ComicChapterBatchDeleteRequest]
 *  @来源 内容管理/漫画管理模块/章节管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type ComicChapterBatchDeleteRequest = IdsDto;

export type ComicChapterBatchDeleteResponse = IdDto;

/**
 *  类型定义 [ComicChapterUpdateStatusRequest]
 *  @来源 内容管理/漫画管理模块/章节管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type ComicChapterUpdateStatusRequest = BatchUpdatePublishedStatusDto;

export type ComicChapterUpdateStatusResponse = IdDto;

/**
 *  类型定义 [ComicChapterSwapNumbersRequest]
 *  @来源 内容管理/漫画管理模块/章节管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type ComicChapterSwapNumbersRequest = DragReorderDto;

export type ComicChapterSwapNumbersResponse = DragReorderDto;

/**
 *  类型定义 [ComicChapterContentsRequest]
 *  @来源 内容管理/漫画管理模块/章节内容管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type ComicChapterContentsRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ComicChapterContentsResponse = string[];

/**
 *  类型定义 [ComicChapterAddContentRequest]
 *  @来源 内容管理/漫画管理模块/章节内容管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type ComicChapterAddContentRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 章节ID */
  chapterId: number;

  /* 漫画ID */
  comicId: number;
};

export type ComicChapterAddContentResponse = UploadResponseDto;

/**
 *  类型定义 [ComicChapterUpdateContentRequest]
 *  @来源 内容管理/漫画管理模块/章节内容管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type ComicChapterUpdateContentRequest = UpdateChapterContentDto;

export type ComicChapterUpdateContentResponse = string[];

/**
 *  类型定义 [ComicChapterDeleteContentRequest]
 *  @来源 内容管理/漫画管理模块/章节内容管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type ComicChapterDeleteContentRequest = DeleteChapterContentDto;

export type ComicChapterDeleteContentResponse = string[];

/**
 *  类型定义 [ComicChapterMoveContentRequest]
 *  @来源 内容管理/漫画管理模块/章节内容管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type ComicChapterMoveContentRequest = MoveChapterContentDto;

export type ComicChapterMoveContentResponse = string[];

/**
 *  类型定义 [ComicChapterClearContentsRequest]
 *  @来源 内容管理/漫画管理模块/章节内容管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type ComicChapterClearContentsRequest = IdDto;

export type ComicChapterClearContentsResponse = IdDto;

/**
 *  类型定义 [CreateComicChapterDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-27 15:37:13
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
 *  @更新时间 2026-01-27 15:37:13
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
 *  @更新时间 2026-01-27 15:37:13
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
 *  @更新时间 2026-01-27 15:37:13
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
 *  @更新时间 2026-01-27 15:37:13
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
 *  @更新时间 2026-01-27 15:37:13
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
 *  @更新时间 2026-01-27 15:37:13
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
 *  类型定义 [IdsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-27 15:37:13
 */
export type IdsDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id集合 */
  ids: number[];
};

/**
 *  类型定义 [BatchUpdatePublishedStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-27 15:37:13
 */
export type BatchUpdatePublishedStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id集合 */
  ids: number[];

  /* 发布状态 true发布 false取消发布 */
  isPublished: boolean;
};

/**
 *  类型定义 [DragReorderDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-27 15:37:13
 */
export type DragReorderDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前拖拽元素的id */
  dragId: number;

  /* 拖拽的目标位置id */
  targetId: number;
};

/**
 *  类型定义 [UploadResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-27 15:37:13
 */
export type UploadResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 文件名 */
  filename: string;
  /* 文件路径 */
  filePath: string;
  /* 文件大小 */
  fileSize: number;
  /* 文件类型 */
  fileType: string;
  /* 文件类型mimeType */
  mimeType: string;
  /* 原始文件名 */
  originalName: string;
  /* 文件场景 */
  scene: string;

  /* 上传时间 */
  uploadTime: string;
};

/**
 *  类型定义 [UpdateChapterContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-27 15:37:13
 */
export type UpdateChapterContentDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 要更新的内容（图片URL） */
  content: string;
  /* 主键id */
  id: number;

  /* 插入位置索引（可选，默认添加到末尾） */
  index: number;
};

/**
 *  类型定义 [DeleteChapterContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-27 15:37:13
 */
export type DeleteChapterContentDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 要删除的内容索引 */
  index: number[];
};

/**
 *  类型定义 [MoveChapterContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-27 15:37:13
 */
export type MoveChapterContentDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 源索引位置 */
  fromIndex: number;
  /* 主键id */
  id: number;

  /* 目标索引位置 */
  toIndex: number;
};
