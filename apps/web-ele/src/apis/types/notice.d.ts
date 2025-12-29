/**
 *  类型定义 [NoticeCreateRequest]
 *  @来源 客户端管理/通知公告
 *  @更新时间 2025-12-29 16:56:58
 */
export type NoticeCreateRequest = CreateNoticeDto;

export type NoticeCreateResponse = IdDto;

/**
 *  类型定义 [NoticePageRequest]
 *  @来源 客户端管理/通知公告
 *  @更新时间 2025-12-29 16:56:58
 */
export type NoticePageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 所启用的平台 */
  enablePlatform?: any;

  /* 结束时间 */
  endDate?: any;

  /* 是否置顶 */
  isPinned?: any;

  /* 是否发布 */
  isPublished?: boolean;

  /* 通知类型 */
  noticeType?: number;

  /* 排序字段，json格式 */
  orderBy?: any;

  /* 关联页面id */
  pageId?: any;

  /* 当前页码 */
  pageIndex?: any;

  /* 单页大小，最大500，默认15 */
  pageSize?: any;

  /* 优先级 */
  priorityLevel?: number;

  /* 发布结束时间 */
  publishEndTime?: any;

  /* 发布开始时间 */
  publishStartTime?: any;

  /* 是否弹窗显示 */
  showAsPopup?: any;

  /* 开始时间 */
  startDate?: any;

  /* 通知标题 */
  title?: string;
};

export type NoticePageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: NoticePageResponseDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [NoticeDetailRequest]
 *  @来源 客户端管理/通知公告
 *  @更新时间 2025-12-29 16:56:58
 */
export type NoticeDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type NoticeDetailResponse = BaseNoticeDto;

/**
 *  类型定义 [NoticeUpdateRequest]
 *  @来源 客户端管理/通知公告
 *  @更新时间 2025-12-29 16:56:58
 */
export type NoticeUpdateRequest = UpdateNoticeDto;

export type NoticeUpdateResponse = IdDto;

/**
 *  类型定义 [NoticeUpdateStatusRequest]
 *  @来源 客户端管理/通知公告
 *  @更新时间 2025-12-29 16:56:58
 */
export type NoticeUpdateStatusRequest = UpdateNoticeStatusDto;

export type NoticeUpdateStatusResponse = BatchOperationResponseDto;

/**
 *  类型定义 [NoticeDeleteRequest]
 *  @来源 客户端管理/通知公告
 *  @更新时间 2025-12-29 16:56:58
 */
export type NoticeDeleteRequest = IdDto;

export type NoticeDeleteResponse = BatchOperationResponseDto;

/**
 *  类型定义 [CreateNoticeDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-29 16:56:58
 */
export type CreateNoticeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 通知内容详情 */
  content: string;
  /* 启用的平台 */
  enablePlatform: number[];
  /* 是否置顶 */
  isPinned?: any;
  /* 通知类型 */
  noticeType: 0 | 1 | 2 | 3;
  /* 关联页面id */
  pageId?: any;
  /* 通知弹窗背景图片URL */
  popupBackgroundImage?: any;
  /* 优先级 */
  priorityLevel: 0 | 1 | 2 | 3;
  /* 发布结束时间 */
  publishEndTime?: any;
  /* 发布开始时间 */
  publishStartTime?: any;
  /* 是否弹窗显示 */
  showAsPopup?: any;

  /* 通知标题 */
  title: string;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-29 16:56:58
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [NoticePageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-29 16:56:58
 */
export type NoticePageResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 启用的平台 */
  enablePlatform: number[];
  /* 主键id */
  id: number;
  /* 是否置顶 */
  isPinned?: any;
  /* 是否发布 */
  isPublished: boolean;
  /* 通知类型 */
  noticeType: 0 | 1 | 2 | 3;
  /* 关联页面id */
  pageId?: any;
  /* 通知弹窗背景图片URL */
  popupBackgroundImage?: any;
  /* 优先级 */
  priorityLevel: 0 | 1 | 2 | 3;
  /* 发布结束时间 */
  publishEndTime?: any;
  /* 发布开始时间 */
  publishStartTime?: any;
  /* 阅读次数 */
  readCount?: any;
  /* 是否弹窗显示 */
  showAsPopup?: any;
  /* 通知标题 */
  title: string;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [BaseNoticeDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-29 16:56:58
 */
export type BaseNoticeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 通知内容详情 */
  content: string;
  /* 创建时间 */
  createdAt: string;
  /* 启用的平台 */
  enablePlatform: number[];
  /* 主键id */
  id: number;
  /* 是否置顶 */
  isPinned?: any;
  /* 是否发布 */
  isPublished: boolean;
  /* 通知类型 */
  noticeType: 0 | 1 | 2 | 3;
  /* 关联页面id */
  pageId?: any;
  /* 通知弹窗背景图片URL */
  popupBackgroundImage?: any;
  /* 优先级 */
  priorityLevel: 0 | 1 | 2 | 3;
  /* 发布结束时间 */
  publishEndTime?: any;
  /* 发布开始时间 */
  publishStartTime?: any;
  /* 阅读次数 */
  readCount?: any;
  /* 是否弹窗显示 */
  showAsPopup?: any;
  /* 通知标题 */
  title: string;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [UpdateNoticeDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-29 16:56:58
 */
export type UpdateNoticeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 通知内容详情 */
  content: string;
  /* 启用的平台 */
  enablePlatform: number[];
  /* 主键id */
  id: number;
  /* 是否置顶 */
  isPinned?: any;
  /* 通知类型 */
  noticeType: 0 | 1 | 2 | 3;
  /* 关联页面id */
  pageId?: any;
  /* 通知弹窗背景图片URL */
  popupBackgroundImage?: any;
  /* 优先级 */
  priorityLevel: 0 | 1 | 2 | 3;
  /* 发布结束时间 */
  publishEndTime?: any;
  /* 发布开始时间 */
  publishStartTime?: any;
  /* 是否弹窗显示 */
  showAsPopup?: any;

  /* 通知标题 */
  title: string;
};

/**
 *  类型定义 [UpdateNoticeStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-29 16:56:58
 */
export type UpdateNoticeStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否发布 */
  isPublished: boolean;
};

/**
 *  类型定义 [BatchOperationResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-29 16:56:58
 */
export type BatchOperationResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 操作成功的数据量 */
  count: number;
};
