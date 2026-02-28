export type StatisticsFullResponse = SensitiveWordStatisticsDataDto;

/**
 *  类型定义 [SensitiveWordStatisticsDataDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 01:57:48
 */
export type SensitiveWordStatisticsDataDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 禁用的敏感词数量 */
  disabledWords: number;
  /* 启用的敏感词数量 */
  enabledWords: number;
  /* 最近一月命中次数 */
  lastMonthHits: number;
  /* 最近一周命中次数 */
  lastWeekHits: number;
  /* 级别统计 */
  levelStatistics: SensitiveWordLevelStatisticsDto[];
  /* 最近命中的敏感词 */
  recentHitWords: SensitiveWordRecentHitStatisticsDto[];
  /* 今日命中次数 */
  todayHits: number;
  /* 热门敏感词 */
  topHitWords: SensitiveWordTopHitStatisticsDto[];
  /* 总命中次数 */
  totalHits: number;
  /* 敏感词总数 */
  totalWords: number;

  /* 类型统计 */
  typeStatistics: SensitiveWordTypeStatisticsDto[];
};

/**
 *  类型定义 [SensitiveWordLevelStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 01:57:48
 */
export type SensitiveWordLevelStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 该级别的敏感词数量 */
  count: number;
  /* 该级别的敏感词命中总次数 */
  hitCount: number;
  /* 敏感词级别 */
  level: 1 | 2 | 3;

  /* 级别名称 */
  levelName: string;
};

/**
 *  类型定义 [SensitiveWordTypeStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 01:57:48
 */
export type SensitiveWordTypeStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 该类型的敏感词数量 */
  count: number;
  /* 该类型的敏感词命中总次数 */
  hitCount: number;
  /* 敏感词类型 */
  type: 1 | 2 | 3 | 4 | 5;

  /* 类型名称 */
  typeName: string;
};

/**
 *  类型定义 [SensitiveWordTopHitStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 01:57:48
 */
export type SensitiveWordTopHitStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 命中次数 */
  hitCount: number;
  /* 最后命中时间 */
  lastHitAt?: null | string;
  /* 敏感词级别 */
  level: number;
  /* 敏感词类型 */
  type: number;

  /* 敏感词 */
  word: string;
};

/**
 *  类型定义 [SensitiveWordRecentHitStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 01:57:48
 */
export type SensitiveWordRecentHitStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 命中次数 */
  hitCount: number;
  /* 最后命中时间 */
  lastHitAt: string;
  /* 敏感词级别 */
  level: number;
  /* 敏感词类型 */
  type: number;

  /* 敏感词 */
  word: string;
};
