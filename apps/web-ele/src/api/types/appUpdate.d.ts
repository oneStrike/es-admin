/**
 *  类型定义 [AppUpdatePageRequest]
 *  @来源 APP管理/版本更新
 *  @更新时间 2026-04-14 17:17:49
 */
export type AppUpdatePageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 内部构建号 */
  buildCode?: number

  /* 结束时间 */
  endDate?: null | string

  /* 是否强制更新 */
  forceUpdate?: boolean

  /* 是否已发布 */
  isPublished?: boolean

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 发布平台（1=苹果端；2=安卓端） */
  platform?: number

  /* 开始时间 */
  startDate?: null | string

  /* 展示版本号 */
  versionName?: string
}

export type AppUpdatePageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AppUpdateReleaseListItemDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [AppUpdateDetailRequest]
 *  @来源 APP管理/版本更新
 *  @更新时间 2026-04-14 17:17:49
 */
export type AppUpdateDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type AppUpdateDetailResponse = AppUpdateReleaseDetailDto

/**
 *  类型定义 [AppUpdateCreateRequest]
 *  @来源 APP管理/版本更新
 *  @更新时间 2026-04-14 17:17:49
 */
export type AppUpdateCreateRequest = CreateAppUpdateReleaseDto

export type AppUpdateCreateResponse = boolean

/**
 *  类型定义 [AppUpdateUpdateRequest]
 *  @来源 APP管理/版本更新
 *  @更新时间 2026-04-14 17:17:49
 */
export type AppUpdateUpdateRequest = UpdateAppUpdateReleaseDto

export type AppUpdateUpdateResponse = boolean

/**
 *  类型定义 [AppUpdateUpdateStatusRequest]
 *  @来源 APP管理/版本更新
 *  @更新时间 2026-04-14 17:17:49
 */
export type AppUpdateUpdateStatusRequest = UpdatePublishedStatusDto

export type AppUpdateUpdateStatusResponse = boolean

/**
 *  类型定义 [AppUpdateReleaseListItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-14 17:17:49
 */
export type AppUpdateReleaseListItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 内部构建号 */
  buildCode: number
  /* 创建时间 */
  createdAt: string
  /* 是否强制更新 */
  forceUpdate: boolean
  /* 是否配置自定义下载页地址 */
  hasCustomDownloadUrl: boolean
  /* 是否配置安装包地址 */
  hasPackageUrl: boolean
  /* 主键id */
  id: number
  /* 是否已发布 */
  isPublished: boolean
  /* 发布平台（1=苹果端；2=安卓端） */
  platform: 1 | 2
  /* 发布时间 */
  publishedAt?: null | string
  /* 商店地址数量 */
  storeLinkCount: number
  /* 更新时间 */
  updatedAt: string

  /* 展示版本号 */
  versionName: string
}

/**
 *  类型定义 [AppUpdateReleaseDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-14 17:17:49
 */
export type AppUpdateReleaseDetailDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 内部构建号 */
  buildCode: number
  /* 创建时间 */
  createdAt: string
  /* 创建人 ID */
  createdById?: null | number
  /* 自定义下载页地址 */
  customDownloadUrl?: null | string
  /* 是否强制更新 */
  forceUpdate: boolean
  /* 主键id */
  id: number
  /* 是否已发布 */
  isPublished: boolean
  /* 上传安装包大小（字节） */
  packageFileSize?: null | number
  /* 上传安装包 MIME 类型 */
  packageMimeType?: null | string
  /* 上传安装包原始文件名 */
  packageOriginalName?: null | string
  /* 安装包来源（1=后台上传；2=外部下载地址） */
  packageSourceType?: null | number
  /* 安装包地址 */
  packageUrl?: null | string
  /* 发布平台（1=苹果端；2=安卓端） */
  platform: 1 | 2
  /* 更新弹窗背景图地址 */
  popupBackgroundImage?: null | string
  /* 更新弹窗背景图位置（居中、顶部居中、顶部靠左、顶部靠右、底部居中、底部靠左、底部靠右、左侧居中、右侧居中） */
  popupBackgroundPosition?: null | string
  /* 发布时间 */
  publishedAt?: null | string
  /* 更新说明 */
  releaseNotes?: null | string
  /* 应用商店地址列表 */
  storeLinks?: AppUpdateStoreLinkSnapshotDto[]
  /* 更新时间 */
  updatedAt: string
  /* 更新人 ID */
  updatedById?: null | number

  /* 展示版本号 */
  versionName: string
}

/**
 *  类型定义 [AppUpdateStoreLinkSnapshotDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-14 17:17:49
 */
export type AppUpdateStoreLinkSnapshotDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 渠道编码 */
  channelCode: string
  /* 渠道名称 */
  channelName: string

  /* 应用商店地址 */
  storeUrl: string
}

/**
 *  类型定义 [CreateAppUpdateReleaseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-14 17:17:49
 */
export type CreateAppUpdateReleaseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 内部构建号 */
  buildCode: number
  /* 自定义下载页地址 */
  customDownloadUrl?: null | string
  /* 是否强制更新 */
  forceUpdate: boolean
  /* 上传安装包大小（字节） */
  packageFileSize?: null | number
  /* 上传安装包 MIME 类型 */
  packageMimeType?: null | string
  /* 上传安装包原始文件名 */
  packageOriginalName?: null | string
  /* 安装包来源（1=后台上传；2=外部下载地址） */
  packageSourceType?: null | number
  /* 安装包地址 */
  packageUrl?: null | string
  /* 发布平台（1=苹果端；2=安卓端） */
  platform: 1 | 2
  /* 更新弹窗背景图地址 */
  popupBackgroundImage?: null | string
  /* 更新弹窗背景图位置（居中、顶部居中、顶部靠左、顶部靠右、底部居中、底部靠左、底部靠右、左侧居中、右侧居中） */
  popupBackgroundPosition?: null | string
  /* 更新说明 */
  releaseNotes?: null | string
  /* 应用商店地址列表 */
  storeLinks?: AppUpdateStoreLinkInputDto[]

  /* 展示版本号 */
  versionName: string
}

/**
 *  类型定义 [AppUpdateStoreLinkInputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-14 17:17:49
 */
export type AppUpdateStoreLinkInputDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 渠道编码 */
  channelCode: string

  /* 应用商店地址 */
  storeUrl: string
}

/**
 *  类型定义 [UpdateAppUpdateReleaseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-14 17:17:49
 */
export type UpdateAppUpdateReleaseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 内部构建号 */
  buildCode: number
  /* 自定义下载页地址 */
  customDownloadUrl?: null | string
  /* 是否强制更新 */
  forceUpdate: boolean
  /* 主键id */
  id: number
  /* 上传安装包大小（字节） */
  packageFileSize?: null | number
  /* 上传安装包 MIME 类型 */
  packageMimeType?: null | string
  /* 上传安装包原始文件名 */
  packageOriginalName?: null | string
  /* 安装包来源（1=后台上传；2=外部下载地址） */
  packageSourceType?: null | number
  /* 安装包地址 */
  packageUrl?: null | string
  /* 发布平台（1=苹果端；2=安卓端） */
  platform: 1 | 2
  /* 更新弹窗背景图地址 */
  popupBackgroundImage?: null | string
  /* 更新弹窗背景图位置（居中、顶部居中、顶部靠左、顶部靠右、底部居中、底部靠左、底部靠右、左侧居中、右侧居中） */
  popupBackgroundPosition?: null | string
  /* 更新说明 */
  releaseNotes?: null | string
  /* 应用商店地址列表 */
  storeLinks?: AppUpdateStoreLinkInputDto[]

  /* 展示版本号 */
  versionName: string
}

/**
 *  类型定义 [UpdatePublishedStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-14 17:17:49
 */
export type UpdatePublishedStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 发布状态 true发布 false取消发布 */
  isPublished: boolean
}