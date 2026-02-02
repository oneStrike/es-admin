export type StatisticsFullResponse = ForumSensitiveWordStatisticsDataDto;

/**
 *  类型定义 [ForumSensitiveWordStatisticsDataDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-02 23:36:28
 */
export type ForumSensitiveWordStatisticsDataDto = {
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
  /* 按级别分组的统计信息 */
  levelStatistics: ForumForumSensitiveWordLevelStatisticsDto[];
  /* 最近命中的敏感词（Top 20） */
  recentHitWords: ForumSensitiveWordRecentHitStatisticsDto[];
  /* 今日命中次数 */
  todayHits: number;
  /* 命中次数最多的敏感词（Top 20） */
  topHitWords: ForumSensitiveWordTopHitStatisticsDto[];
  /* 敏感词总命中次数 */
  totalHits: number;
  /* 敏感词总数 */
  totalWords: number;

  /* 按类型分组的统计信息 */
  typeStatistics: ForumForumSensitiveWordTypeStatisticsDto[];
};

/**
 *  类型定义 [ForumForumSensitiveWordLevelStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-02 23:36:28
 */
export type ForumForumSensitiveWordLevelStatisticsDto = {
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
 *  类型定义 [ForumForumSensitiveWordTypeStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-02 23:36:28
 */
export type ForumForumSensitiveWordTypeStatisticsDto = {
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
 *  类型定义 [ForumSensitiveWordTopHitStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-02 23:36:28
 */
export type ForumSensitiveWordTopHitStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 命中次数 */
  hitCount: number;
  /* 最后命中时间 */
  lastHitAt: Record<string, any>;
  /* 敏感词级别 */
  level: 1 | 2 | 3;
  /* 敏感词类型 */
  type: 1 | 2 | 3 | 4 | 5;

  /* 敏感词内容 */
  word: string;
};

/**
 *  类型定义 [ForumSensitiveWordRecentHitStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-02 23:36:28
 */
export type ForumSensitiveWordRecentHitStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 命中次数 */
  hitCount: number;
  /* 最后命中时间 */
  lastHitAt: string;
  /* 敏感词级别 */
  level: 1 | 2 | 3;
  /* 敏感词类型 */
  type: 1 | 2 | 3 | 4 | 5;

  /* 敏感词内容 */
  word: string;
};
