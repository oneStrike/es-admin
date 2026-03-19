export type PlatformListResponse = PlatformResponseDto[]

/**
 *  类型定义 [PlatformResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type PlatformResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 平台名称code */
  code: string

  /* 平台名称 */
  name: string
}