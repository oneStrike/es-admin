/**
 *  类型定义 [DetectHighestLevelRequest]
 *  @来源 论坛模块/敏感词管理模块
 *  @更新时间 2026-01-21 10:29:31
 */
export type DetectHighestLevelRequest = ForumSensitiveWordDetectDto;

export type DetectHighestLevelResponse =
  ForumSensitiveWordHighestLevelResponseDto;

export type DetectStatusResponse = ForumSensitiveWordDetectStatusResponseDto;

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
 *  类型定义 [ForumSensitiveWordHighestLevelResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-21 10:29:31
 */
export type ForumSensitiveWordHighestLevelResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 敏感词最高等级 */
  highestLevel?: 1 | 2 | 3;
};

/**
 *  类型定义 [ForumSensitiveWordDetectStatusResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-21 10:29:31
 */
export type ForumSensitiveWordDetectStatusResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 检测器是否已初始化 */
  isReady: boolean;

  /* 当前加载的敏感词数量 */
  wordCount: number;
};
