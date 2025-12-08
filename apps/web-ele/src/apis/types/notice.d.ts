/**
 *  类型定义 [NoticeCreateRequest]
 *  @来源 客户端通知模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type NoticeCreateRequest = CreateNoticeDto

export type NoticeCreateResponse = IdDto

/**
 *  类型定义 [NoticePageRequest]
 *  @来源 客户端通知模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type NoticePageRequest = {
  /* 单页大小，最大500，默认15 */
  pageSize?: number

  /* 当前页码 */
  pageIndex?: number

  /* 排序字段，json格式 */
  orderBy?: string

  /* 开始时间 */
  startDate?: string

  /* 结束时间 */
  endDate?: string

  /* 通知标题 */
  title?: string

  /* 通知类型 */
  noticeType?: number

  /* 优先级 */
  priorityLevel?: number

  /* 发布开始时间 */
  publishStartTime?: string

  /* 发布结束时间 */
  publishEndTime?: string

  /* 关联页面id */
  pageId?: number

  /* 是否发布 */
  isPublished?: boolean

  /* 是否置顶 */
  isPinned?: boolean

  /* 是否弹窗显示 */
  showAsPopup?: boolean

  /* 所启用的平台 */
  enablePlatform?: string

  /** 任意合法数值 */
  [property: string]: any
}

export type NoticePageResponse = {
  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: NoticePageResponseDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [NoticeDetailRequest]
 *  @来源 客户端通知模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type NoticeDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type NoticeDetailResponse = BaseNoticeDto

/**
 *  类型定义 [NoticeUpdateRequest]
 *  @来源 客户端通知模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type NoticeUpdateRequest = UpdateNoticeDto

export type NoticeUpdateResponse = IdDto

/**
 *  类型定义 [NoticeUpdateStatusRequest]
 *  @来源 客户端通知模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type NoticeUpdateStatusRequest = UpdateNoticeStatusDto

export type NoticeUpdateStatusResponse = BatchOperationResponseDto

/**
 *  类型定义 [NoticeDeleteRequest]
 *  @来源 客户端通知模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type NoticeDeleteRequest = IdDto

export type NoticeDeleteResponse = BatchOperationResponseDto

/**
 *  类型定义 [CreateNoticeDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type CreateNoticeDto = {
  /* 通知标题 */
  title: string
  /* 通知内容详情 */
  content: string
  /* 通知类型 */
  noticeType: 0 | 1 | 2 | 3
  /* 优先级 */
  priorityLevel: 0 | 1 | 2 | 3
  /* 发布开始时间 */
  publishStartTime?: string
  /* 发布结束时间 */
  publishEndTime?: string
  /* 关联页面id */
  pageId?: number
  /* 通知弹窗背景图片URL */
  popupBackgroundImage?: string
  /* 启用的平台 */
  enablePlatform: number
  /* 是否置顶 */
  isPinned?: boolean
  /* 是否弹窗显示 */
  showAsPopup?: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type IdDto = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [NoticePageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type NoticePageResponseDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 通知标题 */
  title: string
  /* 通知类型 */
  noticeType: 0 | 1 | 2 | 3
  /* 优先级 */
  priorityLevel: 0 | 1 | 2 | 3
  /* 发布开始时间 */
  publishStartTime?: string
  /* 发布结束时间 */
  publishEndTime?: string
  /* 关联页面id */
  pageId?: number
  /* 通知弹窗背景图片URL */
  popupBackgroundImage?: string
  /* 是否发布 */
  isPublished: boolean
  /* 启用的平台 */
  enablePlatform: number
  /* 是否置顶 */
  isPinned?: boolean
  /* 是否弹窗显示 */
  showAsPopup?: boolean
  /* 阅读次数 */
  readCount?: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseNoticeDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type BaseNoticeDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 通知标题 */
  title: string
  /* 通知内容详情 */
  content: string
  /* 通知类型 */
  noticeType: 0 | 1 | 2 | 3
  /* 优先级 */
  priorityLevel: 0 | 1 | 2 | 3
  /* 发布开始时间 */
  publishStartTime?: string
  /* 发布结束时间 */
  publishEndTime?: string
  /* 关联页面id */
  pageId?: number
  /* 通知弹窗背景图片URL */
  popupBackgroundImage?: string
  /* 是否发布 */
  isPublished: boolean
  /* 启用的平台 */
  enablePlatform: number
  /* 是否置顶 */
  isPinned?: boolean
  /* 是否弹窗显示 */
  showAsPopup?: boolean
  /* 阅读次数 */
  readCount?: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateNoticeDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type UpdateNoticeDto = {
  /* 通知标题 */
  title: string
  /* 通知内容详情 */
  content: string
  /* 通知类型 */
  noticeType: 0 | 1 | 2 | 3
  /* 优先级 */
  priorityLevel: 0 | 1 | 2 | 3
  /* 发布开始时间 */
  publishStartTime?: string
  /* 发布结束时间 */
  publishEndTime?: string
  /* 关联页面id */
  pageId?: number
  /* 通知弹窗背景图片URL */
  popupBackgroundImage?: string
  /* 启用的平台 */
  enablePlatform: number
  /* 是否置顶 */
  isPinned?: boolean
  /* 是否弹窗显示 */
  showAsPopup?: boolean
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateNoticeStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type UpdateNoticeStatusDto = {
  /* 是否发布 */
  isPublished: boolean
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BatchOperationResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type BatchOperationResponseDto = {
  /* 操作成功的数据量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}