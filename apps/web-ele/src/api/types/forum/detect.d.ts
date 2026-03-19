/**
 *  类型定义 [DetectHighestLevelRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type DetectHighestLevelRequest = SensitiveWordDetectDto

export type DetectHighestLevelResponse = SensitiveWordHighestLevelResponseDto

export type DetectStatusResponse = SensitiveWordDetectStatusResponseDto

/**
 *  类型定义 [SensitiveWordDetectDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type SensitiveWordDetectDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 检测内容 */
  content: string

  /* 匹配模式 */
  matchMode?: null | number
}

/**
 *  类型定义 [SensitiveWordHighestLevelResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type SensitiveWordHighestLevelResponseDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 敏感词最高等级 */
  highestLevel?: null | number
}

/**
 *  类型定义 [SensitiveWordDetectStatusResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type SensitiveWordDetectStatusResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 检测器是否就绪 */
  isReady: boolean

  /* 已加载的敏感词数量 */
  wordCount: number
}