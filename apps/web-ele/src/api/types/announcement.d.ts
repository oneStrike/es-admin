/**
 *  类型定义 [AnnouncementCreateRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-03-25 23:30:38
 */
export type AnnouncementCreateRequest = CreateAnnouncementDto

export type AnnouncementCreateResponse = boolean

/**
 *  类型定义 [AnnouncementPageRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-03-25 23:30:38
 */
export type AnnouncementPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 公告类型（0=PLATFORM，1=ACTIVITY，2=MAINTENANCE，3=UPDATE，4=POLICY） */
  announcementType?: number

  /* 启用平台筛选 JSON 字符串 */
  enablePlatform?: null | string

  /* 结束时间 */
  endDate?: null | string

  /* 是否置顶 */
  isPinned?: boolean

  /* 是否发布 */
  isPublished?: boolean

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 关联页面id */
  pageId?: null | number

  /* 当前页码（从0开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 优先级（0=LOW，1=MEDIUM，2=HIGH，3=URGENT） */
  priorityLevel?: number

  /* 发布结束时间 */
  publishEndTime?: null | string

  /* 发布开始时间 */
  publishStartTime?: null | string

  /* 是否弹窗显示 */
  showAsPopup?: boolean

  /* 开始时间 */
  startDate?: null | string

  /* 公告标题 */
  title?: string
}

export type AnnouncementPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AnnouncementPageResponseDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [AnnouncementDetailRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-03-25 23:30:38
 */
export type AnnouncementDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type AnnouncementDetailResponse = AnnouncementDetailDto

/**
 *  类型定义 [AnnouncementUpdateRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-03-25 23:30:38
 */
export type AnnouncementUpdateRequest = UpdateAnnouncementDto

export type AnnouncementUpdateResponse = boolean

/**
 *  类型定义 [AnnouncementUpdateStatusRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-03-25 23:30:38
 */
export type AnnouncementUpdateStatusRequest = UpdateAnnouncementStatusDto

export type AnnouncementUpdateStatusResponse = boolean

/**
 *  类型定义 [AnnouncementDeleteRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-03-25 23:30:38
 */
export type AnnouncementDeleteRequest = IdDto

export type AnnouncementDeleteResponse = boolean

/**
 *  类型定义 [CreateAnnouncementDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-25 23:30:38
 */
export type CreateAnnouncementDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 公告类型（0=PLATFORM，1=ACTIVITY，2=MAINTENANCE，3=UPDATE，4=POLICY） */
  announcementType: 0 | 1 | 2 | 3 | 4
  /* 公告内容详情 */
  content: string
  /* 启用的平台 */
  enablePlatform?: any[] | null
  /* 是否置顶 */
  isPinned: boolean
  /* 关联页面id */
  pageId?: null | number
  /* 公告弹窗背景图片URL */
  popupBackgroundImage?: null | string
  /* 优先级（0=LOW，1=MEDIUM，2=HIGH，3=URGENT） */
  priorityLevel: 0 | 1 | 2 | 3
  /* 发布结束时间 */
  publishEndTime?: null | string
  /* 发布开始时间 */
  publishStartTime?: null | string
  /* 是否弹窗显示 */
  showAsPopup: boolean
  /* 公告摘要 */
  summary?: null | string

  /* 公告标题 */
  title: string
}

/**
 *  类型定义 [AnnouncementPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-25 23:30:38
 */
export type AnnouncementPageResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 公告类型（0=PLATFORM，1=ACTIVITY，2=MAINTENANCE，3=UPDATE，4=POLICY） */
  announcementType: 0 | 1 | 2 | 3 | 4
  /* 创建时间 */
  createdAt: string
  /* 启用的平台 */
  enablePlatform?: any[] | null
  /* 主键id */
  id: number
  /* 是否置顶 */
  isPinned: boolean
  /* 是否发布 */
  isPublished: boolean
  /* 关联页面id */
  pageId?: null | number
  /* 优先级（0=LOW，1=MEDIUM，2=HIGH，3=URGENT） */
  priorityLevel: 0 | 1 | 2 | 3
  /* 发布结束时间 */
  publishEndTime?: null | string
  /* 发布开始时间 */
  publishStartTime?: null | string
  /* 是否弹窗显示 */
  showAsPopup: boolean
  /* 公告摘要 */
  summary?: null | string
  /* 公告标题 */
  title: string
  /* 更新时间 */
  updatedAt: string

  /* 浏览次数 */
  viewCount: number
}

/**
 *  类型定义 [AnnouncementDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-25 23:30:38
 */
export type AnnouncementDetailDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 公告类型（0=PLATFORM，1=ACTIVITY，2=MAINTENANCE，3=UPDATE，4=POLICY） */
  announcementType: 0 | 1 | 2 | 3 | 4
  /* 公告关联页面 */
  appPage: RelatedPageDto
  /* 公告内容详情 */
  content: string
  /* 创建时间 */
  createdAt: string
  /* 启用的平台 */
  enablePlatform?: any[] | null
  /* 主键id */
  id: number
  /* 是否置顶 */
  isPinned: boolean
  /* 是否发布 */
  isPublished: boolean
  /* 关联页面id */
  pageId?: null | number
  /* 公告弹窗背景图片URL */
  popupBackgroundImage?: null | string
  /* 优先级（0=LOW，1=MEDIUM，2=HIGH，3=URGENT） */
  priorityLevel: 0 | 1 | 2 | 3
  /* 发布结束时间 */
  publishEndTime?: null | string
  /* 发布开始时间 */
  publishStartTime?: null | string
  /* 是否弹窗显示 */
  showAsPopup: boolean
  /* 公告摘要 */
  summary?: null | string
  /* 公告标题 */
  title: string
  /* 更新时间 */
  updatedAt: string

  /* 浏览次数 */
  viewCount: number
}

/**
 *  类型定义 [RelatedPageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-25 23:30:38
 */
export type RelatedPageDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 页面编码（唯一标识） */
  code: string
  /* 主键id */
  id: number
  /* 页面名称 */
  name: string

  /* 页面路径（URL路径） */
  path: string
}

/**
 *  类型定义 [UpdateAnnouncementDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-25 23:30:38
 */
export type UpdateAnnouncementDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 公告类型（0=PLATFORM，1=ACTIVITY，2=MAINTENANCE，3=UPDATE，4=POLICY） */
  announcementType: 0 | 1 | 2 | 3 | 4
  /* 公告内容详情 */
  content: string
  /* 启用的平台 */
  enablePlatform?: any[] | null
  /* 主键id */
  id: number
  /* 是否置顶 */
  isPinned: boolean
  /* 关联页面id */
  pageId?: null | number
  /* 公告弹窗背景图片URL */
  popupBackgroundImage?: null | string
  /* 优先级（0=LOW，1=MEDIUM，2=HIGH，3=URGENT） */
  priorityLevel: 0 | 1 | 2 | 3
  /* 发布结束时间 */
  publishEndTime?: null | string
  /* 发布开始时间 */
  publishStartTime?: null | string
  /* 是否弹窗显示 */
  showAsPopup: boolean
  /* 公告摘要 */
  summary?: null | string

  /* 公告标题 */
  title: string
}

/**
 *  类型定义 [UpdateAnnouncementStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-25 23:30:38
 */
export type UpdateAnnouncementStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否发布 */
  isPublished: boolean
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-25 23:30:38
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}