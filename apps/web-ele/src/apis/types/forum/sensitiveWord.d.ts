/**
 *  类型定义 [SensitiveWordPageRequest]
 *  @来源 论坛模块/敏感词管理模块
 *  @更新时间 2026-01-21 10:29:31
 */
export type SensitiveWordPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 敏感词级别 */
  level?: number;

  /* 匹配模式 */
  matchMode?: null | number;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 敏感词类型 */
  type?: number;

  /* 敏感词 */
  word?: string;
};

export type SensitiveWordPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseForumSensitiveWordDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [SensitiveWordCreateRequest]
 *  @来源 论坛模块/敏感词管理模块
 *  @更新时间 2026-01-21 10:29:31
 */
export type SensitiveWordCreateRequest = CreateForumSensitiveWordDto;

export type SensitiveWordCreateResponse = BaseForumSensitiveWordDto;

/**
 *  类型定义 [SensitiveWordUpdateRequest]
 *  @来源 论坛模块/敏感词管理模块
 *  @更新时间 2026-01-21 10:29:31
 */
export type SensitiveWordUpdateRequest = UpdateForumSensitiveWordDto;

export type SensitiveWordUpdateResponse = BaseForumSensitiveWordDto;

/**
 *  类型定义 [SensitiveWordDeleteRequest]
 *  @来源 论坛模块/敏感词管理模块
 *  @更新时间 2026-01-21 10:29:31
 */
export type SensitiveWordDeleteRequest = IdDto;

export type SensitiveWordDeleteResponse = BaseForumSensitiveWordDto;

/**
 *  类型定义 [SensitiveWordUpdateStatusRequest]
 *  @来源 论坛模块/敏感词管理模块
 *  @更新时间 2026-01-21 10:29:31
 */
export type SensitiveWordUpdateStatusRequest = UpdateEnabledStatusDto;

export type SensitiveWordUpdateStatusResponse = BaseForumSensitiveWordDto;

/**
 *  类型定义 [SensitiveWordDetectRequest]
 *  @来源 论坛模块/敏感词管理模块
 *  @更新时间 2026-01-21 10:29:31
 */
export type SensitiveWordDetectRequest = ForumSensitiveWordDetectDto;

export type SensitiveWordDetectResponse = ForumMatchedWordDto[];

/**
 *  类型定义 [SensitiveWordStatisticsRequest]
 *  @来源 论坛模块/敏感词管理模块
 *  @更新时间 2026-01-21 10:29:31
 */
export type SensitiveWordStatisticsRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 统计类型 */
  type?: string;
};

export type SensitiveWordStatisticsResponse =
  ForumSensitiveWordStatisticsResponseDto;

/**
 *  类型定义 [SensitiveWordReplaceRequest]
 *  @来源 论坛模块/敏感词管理模块
 *  @更新时间 2026-01-21 10:29:31
 */
export type SensitiveWordReplaceRequest = ForumSensitiveWordReplaceDto;

export type SensitiveWordReplaceResponse = ForumSensitiveWordReplaceResponseDto;

export type SensitiveWordCountResponse = ForumSensitiveWordCountResponseDto;

/**
 *  类型定义 [BaseForumSensitiveWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-21 10:29:31
 */
export type BaseForumSensitiveWordDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 敏感词级别 */
  level: 1 | 2 | 3;
  /* 匹配模式 */
  matchMode?: null | number;
  /* 备注 */
  remark?: null | string;
  /* 替换词 */
  replaceWord?: null | string;
  /* 敏感词类型 */
  type: 1 | 2 | 3 | 4 | 5;
  /* 更新时间 */
  updatedAt: string;

  /* 敏感词 */
  word: string;
};

/**
 *  类型定义 [CreateForumSensitiveWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-21 10:29:31
 */
export type CreateForumSensitiveWordDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否启用 */
  isEnabled: boolean;
  /* 敏感词级别 */
  level: 1 | 2 | 3;
  /* 匹配模式 */
  matchMode?: null | number;
  /* 备注 */
  remark?: null | string;
  /* 替换词 */
  replaceWord?: null | string;
  /* 敏感词类型 */
  type: 1 | 2 | 3 | 4 | 5;

  /* 敏感词 */
  word: string;
};

/**
 *  类型定义 [UpdateForumSensitiveWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-21 10:29:31
 */
export type UpdateForumSensitiveWordDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 敏感词级别 */
  level: 1 | 2 | 3;
  /* 匹配模式 */
  matchMode?: null | number;
  /* 备注 */
  remark?: null | string;
  /* 替换词 */
  replaceWord?: null | string;
  /* 敏感词类型 */
  type: 1 | 2 | 3 | 4 | 5;

  /* 敏感词 */
  word: string;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-21 10:29:31
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [UpdateEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-21 10:29:31
 */
export type UpdateEnabledStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 状态 true启用 false禁用 */
  isEnabled: boolean;
};

/**
 *  类型定义 [ForumSensitiveWordDetectDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-21 10:29:31
 */
export type ForumSensitiveWordDetectDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 待检测的文本 */
  content: string;

  /* 匹配模式 */
  matchMode?: null | number;
};

/**
 *  类型定义 [ForumMatchedWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-21 10:29:31
 */
export type ForumMatchedWordDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 结束位置 */
  end: number;
  /* 敏感词级别 */
  level: 1 | 2 | 3;
  /* 替换词 */
  replaceWord?: string;
  /* 起始位置 */
  start: number;
  /* 敏感词类型 */
  type: 1 | 2 | 3 | 4 | 5;

  /* 敏感词内容 */
  word: string;
};

/**
 *  类型定义 [ForumSensitiveWordStatisticsResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-21 10:29:31
 */
export type ForumSensitiveWordStatisticsResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 统计数据 */
  data:
    | ForumForumSensitiveWordLevelStatisticsDto[]
    | ForumForumSensitiveWordTypeStatisticsDto[]
    | ForumSensitiveWordRecentHitStatisticsDto[]
    | ForumSensitiveWordTopHitStatisticsDto[];

  /* 统计类型 */
  type: 'level' | 'recentHits' | 'topHits' | 'type';
};

/**
 *  类型定义 [ForumForumSensitiveWordLevelStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-21 10:29:31
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
 *  @更新时间 2026-01-21 10:29:31
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
 *  @更新时间 2026-01-21 10:29:31
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
 *  @更新时间 2026-01-21 10:29:31
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

/**
 *  类型定义 [ForumSensitiveWordReplaceDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-21 10:29:31
 */
export type ForumSensitiveWordReplaceDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 待检测的文本 */
  content: string;
  /* 匹配模式 */
  matchMode?: null | number;

  /* 替换字符 */
  replaceChar?: null | string;
};

/**
 *  类型定义 [ForumSensitiveWordReplaceResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-21 10:29:31
 */
export type ForumSensitiveWordReplaceResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 替换后的文本 */
  replacedText: string;
};

/**
 *  类型定义 [ForumSensitiveWordCountResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-21 10:29:31
 */
export type ForumSensitiveWordCountResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 当前加载的敏感词数量 */
  count: number;
};
