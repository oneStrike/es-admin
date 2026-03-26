/**
 *  类型定义 [AgreementCreateRequest]
 *  @来源 APP管理/协议管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AgreementCreateRequest = CreateAgreementDto

export type AgreementCreateResponse = boolean

/**
 *  类型定义 [AgreementUpdateRequest]
 *  @来源 APP管理/协议管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AgreementUpdateRequest = UpdateAgreementDto

export type AgreementUpdateResponse = boolean

/**
 *  类型定义 [AgreementUpdateStatusRequest]
 *  @来源 APP管理/协议管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AgreementUpdateStatusRequest = UpdatePublishedStatusDto

export type AgreementUpdateStatusResponse = boolean

/**
 *  类型定义 [AgreementDeleteRequest]
 *  @来源 APP管理/协议管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AgreementDeleteRequest = IdDto

export type AgreementDeleteResponse = boolean

/**
 *  类型定义 [AgreementPageRequest]
 *  @来源 APP管理/协议管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AgreementPageRequest = {
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

  /* 协议标题 */
  title?: string

  /* 是否展示在登录注册页 */
  showInAuth?: boolean

  /* 是否已发布 */
  isPublished?: boolean

  /** 任意合法数值 */
  [property: string]: any
}

export type AgreementPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: ListOrPageAgreementResponseDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AgreementDetailRequest]
 *  @来源 APP管理/协议管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type AgreementDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type AgreementDetailResponse = BaseAgreementDto

/**
 *  类型定义 [CreateAgreementDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type CreateAgreementDto = {
  /* 协议标题 */
  title: string
  /* 协议内容 */
  content: string
  /* 版本号 */
  version: string
  /* 是否强制重新同意 */
  isForce: boolean
  /* 是否展示在登录注册页 */
  showInAuth: boolean
  /* 是否已发布 */
  isPublished: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateAgreementDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateAgreementDto = {
  /* 协议标题 */
  title: string
  /* 协议内容 */
  content: string
  /* 版本号 */
  version: string
  /* 是否强制重新同意 */
  isForce: boolean
  /* 是否展示在登录注册页 */
  showInAuth: boolean
  /* 是否已发布 */
  isPublished: boolean
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdatePublishedStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
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
 *  @更新时间 2026-03-26 22:03:53
 */
export type IdDto = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ListOrPageAgreementResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type ListOrPageAgreementResponseDto = {
  /* 协议内容 */
  content: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseAgreementDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type BaseAgreementDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 协议标题 */
  title: string
  /* 协议内容 */
  content: string
  /* 版本号 */
  version: string
  /* 是否强制重新同意 */
  isForce: boolean
  /* 是否展示在登录注册页 */
  showInAuth: boolean
  /* 是否已发布 */
  isPublished: boolean
  /* 发布时间 */
  publishedAt?: string | null

  /** 任意合法数值 */
  [property: string]: any
}