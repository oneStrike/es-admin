/**
 *  类型定义 [AnnouncementCreateRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-05-09 22:20:06
 */
export type AnnouncementCreateRequest = CreateAnnouncementDto;

export type AnnouncementCreateResponse = boolean;

/**
 *  类型定义 [AnnouncementPageRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-05-09 22:20:06
 */
export type AnnouncementPageRequest = {
  /* 公告类型（0=平台公告；1=活动公告；2=维护公告；3=更新公告；4=政策公告） */
  announcementType?: 0 | 1 | 2 | 3 | 4;

  /* 启用平台筛选 JSON 字符串，例如 [1,2] */
  enablePlatform?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 消息中心扇出状态（0=待处理；1=处理中；2=成功；3=失败） */
  fanoutStatus?: 0 | 1 | 2 | 3 | null;

  /* 是否置顶 */
  isPinned?: boolean;

  /* 是否仅筛选已发布公告 */
  isPublished?: boolean | null;

  /* 是否同步到消息中心 */
  isRealtime?: boolean;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 关联页面 id */
  pageId?: null | number;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 公告优先级（0=低优先级；1=中优先级；2=高优先级；3=紧急） */
  priorityLevel?: 0 | 1 | 2 | 3;

  /* 发布结束时间 */
  publishEndTime?: null | string;

  /* 发布开始时间 */
  publishStartTime?: null | string;

  /* 派生发布状态（未发布；待生效；生效中；已过期） */
  publishStatus?: 'active' | 'expired' | 'scheduled' | 'unpublished' | null;

  /* 是否弹窗显示 */
  showAsPopup?: boolean;

  /* 开始时间 */
  startDate?: null | string;

  /* 公告标题 */
  title?: string;
};

export type AnnouncementPageResponse = {
  /* 列表数据 */
  list?: AnnouncementPageItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [AnnouncementDetailRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-05-09 22:20:06
 */
export type AnnouncementDetailRequest = {
  /* 主键id */
  id: number;
};

export type AnnouncementDetailResponse = AnnouncementDetailDto;

/**
 *  类型定义 [AnnouncementUpdateRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-05-09 22:20:06
 */
export type AnnouncementUpdateRequest = UpdateAnnouncementDto;

export type AnnouncementUpdateResponse = boolean;

/**
 *  类型定义 [AnnouncementUpdateStatusRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-05-09 22:20:06
 */
export type AnnouncementUpdateStatusRequest = UpdatePublishedStatusDto;

export type AnnouncementUpdateStatusResponse = boolean;

/**
 *  类型定义 [AnnouncementDeleteRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-05-09 22:20:06
 */
export type AnnouncementDeleteRequest = IdDto;

export type AnnouncementDeleteResponse = boolean;

/**
 *  类型定义 [AnnouncementRetryFanoutRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-05-09 22:20:06
 */
export type AnnouncementRetryFanoutRequest = IdDto;

export type AnnouncementRetryFanoutResponse = boolean;

/**
 *  类型定义 [CreateAnnouncementDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateAnnouncementDto = {
  /* 公告类型（0=平台公告；1=活动公告；2=维护公告；3=更新公告；4=政策公告） */
  announcementType: 0 | 1 | 2 | 3 | 4;
  /* 公告内容详情 */
  content: string;
  /* 启用的平台（1=H5；2=App；3=小程序） */
  enablePlatform?: (1 | 2 | 3)[];
  /* 是否置顶 */
  isPinned: boolean;
  /* 是否同步到消息中心 */
  isRealtime: boolean;
  /* 关联页面 id */
  pageId?: null | number;
  /* 公告弹窗背景图片 URL */
  popupBackgroundImage?: null | string;
  /* 弹窗背景图片位置（CSS background-position 值，默认居中） */
  popupBackgroundPosition?:
    | 'bottom center'
    | 'bottom left'
    | 'bottom right'
    | 'center'
    | 'left center'
    | 'right center'
    | 'top center'
    | 'top left'
    | 'top right';
  /* 公告优先级（0=低优先级；1=中优先级；2=高优先级；3=紧急） */
  priorityLevel: 0 | 1 | 2 | 3;
  /* 发布结束时间 */
  publishEndTime?: null | string;
  /* 发布开始时间 */
  publishStartTime?: null | string;
  /* 是否弹窗显示 */
  showAsPopup: boolean;
  /* 公告摘要 */
  summary?: null | string;
  /* 公告标题 */
  title: string;
};

/**
 *  类型定义 [AnnouncementPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AnnouncementPageItemDto = {
  /* 公告类型（0=平台公告；1=活动公告；2=维护公告；3=更新公告；4=政策公告） */
  announcementType: 0 | 1 | 2 | 3 | 4;
  /* 公告内容详情 */
  content: string;
  /* 创建时间 */
  createdAt: string;
  /* 启用的平台（1=H5；2=App；3=小程序） */
  enablePlatform: (1 | 2 | 3)[];
  /* 最近一次消息中心扇出目标事件 */
  fanoutDesiredEventKey: null | string;
  /* 最近一次消息中心扇出错误 */
  fanoutLastError: null | string;
  /* 消息中心扇出状态（0=待处理；1=处理中；2=成功；3=失败） */
  fanoutStatus: 0 | 1 | 2 | 3 | null;
  /* 最近一次消息中心扇出更新时间 */
  fanoutUpdatedAt: null | string;
  /* 主键id */
  id: number;
  /* 是否置顶 */
  isPinned: boolean;
  /* 是否发布 */
  isPublished: boolean;
  /* 是否同步到消息中心 */
  isRealtime: boolean;
  /* 关联页面 id */
  pageId: null | number;
  /* 公告弹窗背景图片 URL */
  popupBackgroundImage: null | string;
  /* 弹窗背景图片位置（CSS background-position 值，默认居中） */
  popupBackgroundPosition:
    | 'bottom center'
    | 'bottom left'
    | 'bottom right'
    | 'center'
    | 'left center'
    | 'right center'
    | 'top center'
    | 'top left'
    | 'top right';
  /* 公告优先级（0=低优先级；1=中优先级；2=高优先级；3=紧急） */
  priorityLevel: 0 | 1 | 2 | 3;
  /* 发布结束时间 */
  publishEndTime: null | string;
  /* 发布开始时间 */
  publishStartTime: null | string;
  /* 派生发布状态（未发布；待生效；生效中；已过期） */
  publishStatus: 'active' | 'expired' | 'scheduled' | 'unpublished';
  /* 是否弹窗显示 */
  showAsPopup: boolean;
  /* 公告摘要 */
  summary: null | string;
  /* 公告标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;
  /* 浏览次数 */
  viewCount: number;
};

/**
 *  类型定义 [AnnouncementDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AnnouncementDetailDto = {
  /* 公告类型（0=平台公告；1=活动公告；2=维护公告；3=更新公告；4=政策公告） */
  announcementType: 0 | 1 | 2 | 3 | 4;
  /* 公告关联页面 */
  appPage: AnnouncementRelatedPageDto;
  /* 公告内容详情 */
  content: string;
  /* 创建时间 */
  createdAt: string;
  /* 启用的平台（1=H5；2=App；3=小程序） */
  enablePlatform: (1 | 2 | 3)[];
  /* 最近一次消息中心扇出目标事件 */
  fanoutDesiredEventKey: null | string;
  /* 最近一次消息中心扇出错误 */
  fanoutLastError: null | string;
  /* 消息中心扇出状态（0=待处理；1=处理中；2=成功；3=失败） */
  fanoutStatus: 0 | 1 | 2 | 3 | null;
  /* 最近一次消息中心扇出更新时间 */
  fanoutUpdatedAt: null | string;
  /* 主键id */
  id: number;
  /* 是否置顶 */
  isPinned: boolean;
  /* 是否发布 */
  isPublished: boolean;
  /* 是否同步到消息中心 */
  isRealtime: boolean;
  /* 关联页面 id */
  pageId: null | number;
  /* 公告弹窗背景图片 URL */
  popupBackgroundImage: null | string;
  /* 弹窗背景图片位置（CSS background-position 值，默认居中） */
  popupBackgroundPosition:
    | 'bottom center'
    | 'bottom left'
    | 'bottom right'
    | 'center'
    | 'left center'
    | 'right center'
    | 'top center'
    | 'top left'
    | 'top right';
  /* 公告优先级（0=低优先级；1=中优先级；2=高优先级；3=紧急） */
  priorityLevel: 0 | 1 | 2 | 3;
  /* 发布结束时间 */
  publishEndTime: null | string;
  /* 发布开始时间 */
  publishStartTime: null | string;
  /* 派生发布状态（未发布；待生效；生效中；已过期） */
  publishStatus: 'active' | 'expired' | 'scheduled' | 'unpublished';
  /* 是否弹窗显示 */
  showAsPopup: boolean;
  /* 公告摘要 */
  summary: null | string;
  /* 公告标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;
  /* 浏览次数 */
  viewCount: number;
};

/**
 *  类型定义 [AnnouncementRelatedPageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AnnouncementRelatedPageDto = {
  /* 页面编码（唯一标识） */
  code: string;
  /* 主键id */
  id: number;
  /* 页面名称 */
  name: string;
  /* 页面路径（URL 路径） */
  path: string;
};

/**
 *  类型定义 [UpdateAnnouncementDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateAnnouncementDto = {
  /* 公告类型（0=平台公告；1=活动公告；2=维护公告；3=更新公告；4=政策公告） */
  announcementType?: 0 | 1 | 2 | 3 | 4;
  /* 公告内容详情 */
  content?: string;
  /* 启用的平台（1=H5；2=App；3=小程序） */
  enablePlatform?: (1 | 2 | 3)[];
  /* 主键id */
  id: number;
  /* 是否置顶 */
  isPinned?: boolean;
  /* 是否同步到消息中心 */
  isRealtime?: boolean;
  /* 关联页面 id */
  pageId?: null | number;
  /* 公告弹窗背景图片 URL */
  popupBackgroundImage?: null | string;
  /* 弹窗背景图片位置（CSS background-position 值，默认居中） */
  popupBackgroundPosition?:
    | 'bottom center'
    | 'bottom left'
    | 'bottom right'
    | 'center'
    | 'left center'
    | 'right center'
    | 'top center'
    | 'top left'
    | 'top right';
  /* 公告优先级（0=低优先级；1=中优先级；2=高优先级；3=紧急） */
  priorityLevel?: 0 | 1 | 2 | 3;
  /* 发布结束时间 */
  publishEndTime?: null | string;
  /* 发布开始时间 */
  publishStartTime?: null | string;
  /* 是否弹窗显示 */
  showAsPopup?: boolean;
  /* 公告摘要 */
  summary?: null | string;
  /* 公告标题 */
  title?: string;
};

/**
 *  类型定义 [UpdatePublishedStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdatePublishedStatusDto = {
  /* 主键id */
  id: number;
  /* 发布状态 true发布 false取消发布 */
  isPublished: boolean;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type IdDto = {
  /* 主键id */
  id: number;
};
