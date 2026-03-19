/**
 *  类型定义 [AgreementCreateRequest]
 *  @来源 APP管理/协议管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type AgreementCreateRequest = CreateAgreementDto

export type AgreementCreateResponse = boolean

/**
 *  类型定义 [AgreementUpdateRequest]
 *  @来源 APP管理/协议管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type AgreementUpdateRequest = UpdateAgreementDto

export type AgreementUpdateResponse = boolean

/**
 *  类型定义 [AgreementUpdateStatusRequest]
 *  @来源 APP管理/协议管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type AgreementUpdateStatusRequest = UpdatePublishedStatusDto

export type AgreementUpdateStatusResponse = boolean

/**
 *  类型定义 [AgreementDeleteRequest]
 *  @来源 APP管理/协议管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type AgreementDeleteRequest = IdDto

export type AgreementDeleteResponse = boolean

/**
 *  类型定义 [AgreementPageRequest]
 *  @来源 APP管理/协议管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type AgreementPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 是否已发布 */
  isPublished?: boolean

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码 */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 是否展示在登录注册页 */
  showInAuth?: boolean

  /* 开始时间 */
  startDate?: null | string

  /* 协议标题 */
  title?: string
}

export type AgreementPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: ListOrPageAgreementResponseDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [AgreementDetailRequest]
 *  @来源 APP管理/协议管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type AgreementDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type AgreementDetailResponse = BaseAgreementDto

/**
 *  类型定义 [CreateAgreementDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type CreateAgreementDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 协议内容 */
  content: string
  /* 是否强制重新同意 */
  isForce: boolean
  /* 是否已发布 */
  isPublished: boolean
  /* 是否展示在登录注册页 */
  showInAuth: boolean
  /* 协议标题 */
  title: string

  /* 版本号 */
  version: string
}

/**
 *  类型定义 [UpdateAgreementDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdateAgreementDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 协议内容 */
  content: string
  /* 主键id */
  id: number
  /* 是否强制重新同意 */
  isForce: boolean
  /* 是否已发布 */
  isPublished: boolean
  /* 是否展示在登录注册页 */
  showInAuth: boolean
  /* 协议标题 */
  title: string

  /* 版本号 */
  version: string
}

/**
 *  类型定义 [UpdatePublishedStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdatePublishedStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 发布状态 true发布 false取消发布 */
  isPublished: boolean
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

/**
 *  类型定义 [ListOrPageAgreementResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type ListOrPageAgreementResponseDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 协议内容 */
  content: string
}

/**
 *  类型定义 [BaseAgreementDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type BaseAgreementDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 协议内容 */
  content: string
  /* 创建时间 */
  createdAt: string
  /* 主键id */
  id: number
  /* 是否强制重新同意 */
  isForce: boolean
  /* 是否已发布 */
  isPublished: boolean
  /* 发布时间 */
  publishedAt?: null | string
  /* 是否展示在登录注册页 */
  showInAuth: boolean
  /* 协议标题 */
  title: string
  /* 更新时间 */
  updatedAt: string

  /* 版本号 */
  version: string
}