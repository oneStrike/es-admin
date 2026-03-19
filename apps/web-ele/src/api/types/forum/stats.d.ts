export type StatsFullResponse = SensitiveWordStatisticsDataDto

/**
 *  类型定义 [SensitiveWordStatisticsDataDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type SensitiveWordStatisticsDataDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 禁用词数 */
  disabledWords: number
  /* 启用词数 */
  enabledWords: number
  /* 最近一月命中次数 */
  lastMonthHits: number
  /* 最近一周命中次数 */
  lastWeekHits: number
  /* 级别统计 */
  levelStatistics: SensitiveWordLevelStatisticsDto[]
  /* 最近命中词 */
  recentHitWords: SensitiveWordRecentHitStatisticsDto[]
  /* 今日命中次数 */
  todayHits: number
  /* 热门命中词 */
  topHitWords: SensitiveWordTopHitStatisticsDto[]
  /* 总命中次数 */
  totalHits: number
  /* 总词数 */
  totalWords: number

  /* 类型统计 */
  typeStatistics: SensitiveWordTypeStatisticsDto[]
}

/**
 *  类型定义 [SensitiveWordLevelStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type SensitiveWordLevelStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 词数量 */
  count: number
  /* 命中次数 */
  hitCount: number
  /* 敏感词级别 */
  level: 1 | 2 | 3

  /* 级别名称 */
  levelName: string
}

/**
 *  类型定义 [SensitiveWordTypeStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type SensitiveWordTypeStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 词数量 */
  count: number
  /* 命中次数 */
  hitCount: number
  /* 敏感词类型 */
  type: 1 | 2 | 3 | 4 | 5

  /* 类型名称 */
  typeName: string
}

/**
 *  类型定义 [SensitiveWordTopHitStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type SensitiveWordTopHitStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 命中次数 */
  hitCount: number
  /* 最后命中时间 */
  lastHitAt?: null | string
  /* 敏感词级别 */
  level: 1 | 2 | 3
  /* 敏感词类型 */
  type: 1 | 2 | 3 | 4 | 5

  /* 敏感词 */
  word: string
}

/**
 *  类型定义 [SensitiveWordRecentHitStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type SensitiveWordRecentHitStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 命中次数 */
  hitCount: number
  /* 最后命中时间 */
  lastHitAt?: null | string
  /* 敏感词级别 */
  level: 1 | 2 | 3
  /* 敏感词类型 */
  type: 1 | 2 | 3 | 4 | 5

  /* 敏感词 */
  word: string
}