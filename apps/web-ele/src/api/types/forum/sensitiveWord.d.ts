/**
 *  类型定义 [SensitiveWordPageRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type SensitiveWordPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 是否启用 */
  isEnabled?: boolean

  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level?: number

  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode?: number

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码 */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type?: number

  /* 敏感词 */
  word?: string
}

export type SensitiveWordPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseSensitiveWordDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [SensitiveWordCreateRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type SensitiveWordCreateRequest = CreateSensitiveWordDto

export type SensitiveWordCreateResponse = boolean

/**
 *  类型定义 [SensitiveWordUpdateRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type SensitiveWordUpdateRequest = UpdateSensitiveWordDto

export type SensitiveWordUpdateResponse = boolean

/**
 *  类型定义 [SensitiveWordDeleteRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type SensitiveWordDeleteRequest = IdDto

export type SensitiveWordDeleteResponse = boolean

/**
 *  类型定义 [SensitiveWordUpdateStatusRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type SensitiveWordUpdateStatusRequest = UpdateEnabledStatusDto

export type SensitiveWordUpdateStatusResponse = boolean

/**
 *  类型定义 [SensitiveWordDetectRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type SensitiveWordDetectRequest = SensitiveWordDetectDto

export type SensitiveWordDetectResponse = SensitiveWordDetectResponseDto

/**
 *  类型定义 [SensitiveWordStatsRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type SensitiveWordStatsRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 统计类型（level=LEVEL，type=TYPE，topHits=TOP_HITS，recentHits=RECENT_HITS） */
  type?: null | string
}

export type SensitiveWordStatsResponse = SensitiveWordStatisticsResponseDto

/**
 *  类型定义 [SensitiveWordReplaceRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type SensitiveWordReplaceRequest = SensitiveWordReplaceDto

export type SensitiveWordReplaceResponse = SensitiveWordReplaceResponseDto

export type SensitiveWordCountResponse = SensitiveWordCountResponseDto

/**
 *  类型定义 [BaseSensitiveWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type BaseSensitiveWordDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 创建人ID */
  createdBy?: null | number
  /* 命中次数 */
  hitCount: number
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 最后命中时间 */
  lastHitAt?: null | string
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3
  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode: 1 | 2 | 3
  /* 备注 */
  remark?: null | string
  /* 替换词 */
  replaceWord?: null | string
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5
  /* 更新时间 */
  updatedAt: string
  /* 更新人ID */
  updatedBy?: null | number
  /* 版本号（乐观锁） */
  version: number

  /* 敏感词 */
  word: string
}

/**
 *  类型定义 [CreateSensitiveWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type CreateSensitiveWordDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 是否启用 */
  isEnabled: boolean
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3
  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode: 1 | 2 | 3
  /* 备注 */
  remark?: null | string
  /* 替换词 */
  replaceWord?: null | string
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5

  /* 敏感词 */
  word: string
}

/**
 *  类型定义 [UpdateSensitiveWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdateSensitiveWordDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3
  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode: 1 | 2 | 3
  /* 备注 */
  remark?: null | string
  /* 替换词 */
  replaceWord?: null | string
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5

  /* 敏感词 */
  word: string
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
 *  类型定义 [UpdateEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdateEnabledStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 状态 true启用 false禁用 */
  isEnabled: boolean
}

/**
 *  类型定义 [SensitiveWordDetectDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type SensitiveWordDetectDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 检测内容 */
  content: string

  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode?: null | number
}

/**
 *  类型定义 [SensitiveWordDetectResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type SensitiveWordDetectResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 最高敏感等级（1=SEVERE，2=GENERAL，3=LIGHT） */
  highestLevel?: null | number

  /* 命中的敏感词列表 */
  hits: MatchedWordDto[]
}

/**
 *  类型定义 [MatchedWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type MatchedWordDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 结束位置 */
  end: number
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3
  /* 替换词 */
  replaceWord?: null | string
  /* 起始位置 */
  start: number
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5

  /* 敏感词内容 */
  word: string
}

/**
 *  类型定义 [SensitiveWordStatisticsResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type SensitiveWordStatisticsResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 统计结果 */
  data: Record<string, any>[]

  /* 统计类型（level=LEVEL，type=TYPE，topHits=TOP_HITS，recentHits=RECENT_HITS） */
  type: 'level' | 'recentHits' | 'topHits' | 'type'
}

/**
 *  类型定义 [SensitiveWordReplaceDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type SensitiveWordReplaceDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 检测内容 */
  content: string
  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode?: null | number

  /* 替换字符 */
  replaceChar?: null | string
}

/**
 *  类型定义 [SensitiveWordReplaceResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type SensitiveWordReplaceResponseDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 替换后的文本 */
  replacedText: string
}

/**
 *  类型定义 [SensitiveWordCountResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type SensitiveWordCountResponseDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 当前加载的敏感词数量 */
  count: number
}