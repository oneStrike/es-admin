/**
 *  类型定义 [AnnouncementCreateRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-04-08 08:36:51
 */
export type AnnouncementCreateRequest = CreateAnnouncementDto

export type AnnouncementCreateResponse = boolean

/**
 *  类型定义 [AnnouncementPageRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-04-08 08:36:51
 */
export type AnnouncementPageRequest = {
  /* 开始时间 */
  startDate?: string | null

  /* 结束时间 */
  endDate?: string | null

  /* 单页大小，最大500，默认15 */
  pageSize?: number | null

  /* 当前页码（从1开始） */
  pageIndex?: number | null

  /* 排序字段，json格式 */
  orderBy?: string | null

  /* 公告标题 */
  title?: string

  /* 公告类型（0=平台公告；1=活动公告；2=维护公告；3=更新公告；4=政策公告） */
  announcementType?: number

  /* 公告优先级（0=低优先级；1=中优先级；2=高优先级；3=紧急） */
  priorityLevel?: number

  /* 发布开始时间 */
  publishStartTime?: string | null

  /* 发布结束时间 */
  publishEndTime?: string | null

  /* 关联页面 id */
  pageId?: number | null

  /* 是否置顶 */
  isPinned?: boolean

  /* 是否弹窗显示 */
  showAsPopup?: boolean

  /* 是否仅筛选已发布公告 */
  isPublished?: boolean | null

  /* 启用平台筛选 JSON 字符串，例如 [1,2] */
  enablePlatform?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

export type AnnouncementPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: BaseAnnouncementDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AnnouncementDetailRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-04-08 08:36:51
 */
export type AnnouncementDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type AnnouncementDetailResponse = AnnouncementDetailDto

/**
 *  类型定义 [AnnouncementUpdateRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-04-08 08:36:51
 */
export type AnnouncementUpdateRequest = UpdateAnnouncementDto

export type AnnouncementUpdateResponse = boolean

/**
 *  类型定义 [AnnouncementUpdateStatusRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-04-08 08:36:51
 */
export type AnnouncementUpdateStatusRequest = UpdatePublishedStatusDto

export type AnnouncementUpdateStatusResponse = boolean

/**
 *  类型定义 [AnnouncementDeleteRequest]
 *  @来源 APP管理/系统公告
 *  @更新时间 2026-04-08 08:36:51
 */
export type AnnouncementDeleteRequest = IdDto

export type AnnouncementDeleteResponse = boolean

/**
 *  类型定义 [CreateAnnouncementDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type CreateAnnouncementDto = {
  /* 公告标题 */
  title: string
  /* 公告内容详情 */
  content: string
  /* 公告摘要 */
  summary?: string | null
  /* 公告类型（0=平台公告；1=活动公告；2=维护公告；3=更新公告；4=政策公告） */
  announcementType: 0 | 1 | 2 | 3 | 4
  /* 公告优先级（0=低优先级；1=中优先级；2=高优先级；3=紧急） */
  priorityLevel: 0 | 1 | 2 | 3
  /* 发布开始时间 */
  publishStartTime?: string | null
  /* 发布结束时间 */
  publishEndTime?: string | null
  /* 关联页面 id */
  pageId?: number | null
  /* 公告弹窗背景图片 URL */
  popupBackgroundImage?: string | null
  /* 启用的平台（1=H5；2=App；3=小程序） */
  enablePlatform?: any[] | null
  /* 是否置顶 */
  isPinned: boolean
  /* 是否弹窗显示 */
  showAsPopup: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseAnnouncementDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type BaseAnnouncementDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 公告标题 */
  title: string
  /* 公告内容详情 */
  content: string
  /* 公告摘要 */
  summary?: string | null
  /* 公告类型（0=平台公告；1=活动公告；2=维护公告；3=更新公告；4=政策公告） */
  announcementType: 0 | 1 | 2 | 3 | 4
  /* 公告优先级（0=低优先级；1=中优先级；2=高优先级；3=紧急） */
  priorityLevel: 0 | 1 | 2 | 3
  /* 发布开始时间 */
  publishStartTime?: string | null
  /* 发布结束时间 */
  publishEndTime?: string | null
  /* 关联页面 id */
  pageId?: number | null
  /* 公告弹窗背景图片 URL */
  popupBackgroundImage?: string | null
  /* 是否发布 */
  isPublished: boolean
  /* 启用的平台（1=H5；2=App；3=小程序） */
  enablePlatform?: any[] | null
  /* 是否置顶 */
  isPinned: boolean
  /* 是否弹窗显示 */
  showAsPopup: boolean
  /* 浏览次数 */
  viewCount: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AnnouncementDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type AnnouncementDetailDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 公告标题 */
  title: string
  /* 公告内容详情 */
  content: string
  /* 公告摘要 */
  summary?: string | null
  /* 公告类型（0=平台公告；1=活动公告；2=维护公告；3=更新公告；4=政策公告） */
  announcementType: 0 | 1 | 2 | 3 | 4
  /* 公告优先级（0=低优先级；1=中优先级；2=高优先级；3=紧急） */
  priorityLevel: 0 | 1 | 2 | 3
  /* 发布开始时间 */
  publishStartTime?: string | null
  /* 发布结束时间 */
  publishEndTime?: string | null
  /* 关联页面 id */
  pageId?: number | null
  /* 公告弹窗背景图片 URL */
  popupBackgroundImage?: string | null
  /* 是否发布 */
  isPublished: boolean
  /* 启用的平台（1=H5；2=App；3=小程序） */
  enablePlatform?: any[] | null
  /* 是否置顶 */
  isPinned: boolean
  /* 是否弹窗显示 */
  showAsPopup: boolean
  /* 浏览次数 */
  viewCount: number
  /* 公告关联页面 */
  appPage?: AnnouncementRelatedPageDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AnnouncementRelatedPageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type AnnouncementRelatedPageDto = {
  /* 主键id */
  id: number
  /* 页面编码（唯一标识） */
  code: string
  /* 页面路径（URL 路径） */
  path: string
  /* 页面名称 */
  name: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateAnnouncementDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type UpdateAnnouncementDto = {
  /* 主键id */
  id: number
  /* 公告标题 */
  title?: string
  /* 公告内容详情 */
  content?: string
  /* 公告摘要 */
  summary?: string | null
  /* 公告类型（0=平台公告；1=活动公告；2=维护公告；3=更新公告；4=政策公告） */
  announcementType?: 0 | 1 | 2 | 3 | 4
  /* 公告优先级（0=低优先级；1=中优先级；2=高优先级；3=紧急） */
  priorityLevel?: 0 | 1 | 2 | 3
  /* 发布开始时间 */
  publishStartTime?: string | null
  /* 发布结束时间 */
  publishEndTime?: string | null
  /* 关联页面 id */
  pageId?: number | null
  /* 公告弹窗背景图片 URL */
  popupBackgroundImage?: string | null
  /* 启用的平台（1=H5；2=App；3=小程序） */
  enablePlatform?: any[] | null
  /* 是否置顶 */
  isPinned?: boolean
  /* 是否弹窗显示 */
  showAsPopup?: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdatePublishedStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type UpdatePublishedStatusDto = {
  /* 主键id */
  id: number
  /* 发布状态 true发布 false取消发布 */
  isPublished: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type IdDto = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}