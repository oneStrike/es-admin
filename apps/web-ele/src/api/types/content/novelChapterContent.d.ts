/**
 *  类型定义 [NovelChapterContentDetailRequest]
 *  @来源 内容管理/小说章节内容
 *  @更新时间 2026-03-19 21:17:36
 */
export type NovelChapterContentDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type NovelChapterContentDetailResponse = string

/**
 *  类型定义 [NovelChapterContentUploadRequest]
 *  @来源 内容管理/小说章节内容
 *  @更新时间 2026-03-19 21:17:36
 */
export type NovelChapterContentUploadRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 章节ID */
  chapterId: number

  /* 作品ID */
  workId: number
}

export type NovelChapterContentUploadResponse = FileUploadResponseDto

/**
 *  类型定义 [NovelChapterContentDeleteRequest]
 *  @来源 内容管理/小说章节内容
 *  @更新时间 2026-03-19 21:17:36
 */
export type NovelChapterContentDeleteRequest = IdDto

export type NovelChapterContentDeleteResponse = IdDto

/**
 *  类型定义 [FileUploadResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type FileUploadResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 文件名 */
  filename: string
  /* 文件路径 */
  filePath: string
  /* 文件大小 */
  fileSize: number
  /* 文件类型 */
  fileType: string
  /* MIME 类型 */
  mimeType: string
  /* 原始文件名 */
  originalName: string
  /* 场景 */
  scene: string

  /* 上传时间 */
  uploadTime: string
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}