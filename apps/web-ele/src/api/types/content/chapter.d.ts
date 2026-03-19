/**
 *  类型定义 [ChapterListRequest]
 *  @来源 内容管理/漫画管理/三方平台解析
 *  @更新时间 2026-03-19 23:58:08
 */
export type ChapterListRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 漫画ID */
  comicId: string

  /* 平台代码 */
  platform: string
}

export type ChapterListResponse = Record<string, any>[]