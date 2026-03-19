/**
 *  类型定义 [NotificationPageRequest]
 *  @来源 论坛管理/通知管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type NotificationPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 是否已读 */
  isRead?: boolean

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码 */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 关联主题ID */
  topicId?: null | number

  /* 通知类型 */
  type?: number

  /* 接收用户ID */
  userId?: number
}

export type NotificationPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseForumNotificationDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [NotificationDetailRequest]
 *  @来源 论坛管理/通知管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type NotificationDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type NotificationDetailResponse = BaseForumNotificationDto

/**
 *  类型定义 [NotificationCreateRequest]
 *  @来源 论坛管理/通知管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type NotificationCreateRequest = CreateForumNotificationDto

export type NotificationCreateResponse = BaseForumNotificationDto

/**
 *  类型定义 [NotificationDeleteRequest]
 *  @来源 论坛管理/通知管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type NotificationDeleteRequest = IdDto

export type NotificationDeleteResponse = IdDto

/**
 *  类型定义 [BaseForumNotificationDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type BaseForumNotificationDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 通知内容 */
  content: string
  /* 创建时间 */
  createdAt: string
  /* 过期时间 */
  expiredAt?: null | string
  /* 主键id */
  id: number
  /* 是否已读 */
  isRead: boolean
  /* 优先级 */
  priority: 1 | 2 | 3 | 4
  /* 已读时间 */
  readAt?: null | string
  /* 关联回复ID */
  replyId?: null | number
  /* 通知标题 */
  title: string
  /* 关联主题ID */
  topicId?: null | number
  /* 通知类型 */
  type: 1 | 2 | 3 | 4 | 5 | 6

  /* 接收用户ID */
  userId: number
}

/**
 *  类型定义 [CreateForumNotificationDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type CreateForumNotificationDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 通知内容 */
  content: string
  /* 过期时间 */
  expiredAt?: null | string
  /* 优先级 */
  priority: 1 | 2 | 3 | 4
  /* 关联回复ID */
  replyId?: null | number
  /* 通知标题 */
  title: string
  /* 关联主题ID */
  topicId?: null | number
  /* 通知类型 */
  type: 1 | 2 | 3 | 4 | 5 | 6

  /* 接收用户ID */
  userId: number
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}