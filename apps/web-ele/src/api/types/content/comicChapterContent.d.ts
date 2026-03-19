/**
 *  类型定义 [ComicChapterContentListRequest]
 *  @来源 内容管理/漫画章节内容
 *  @更新时间 2026-03-19 23:58:08
 */
export type ComicChapterContentListRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ComicChapterContentListResponse = string[]

/**
 *  类型定义 [ComicChapterContentUploadRequest]
 *  @来源 内容管理/漫画章节内容
 *  @更新时间 2026-03-19 23:58:08
 */
export type ComicChapterContentUploadRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 章节ID */
  chapterId: number

  /* 作品ID */
  workId: number
}

export type ComicChapterContentUploadResponse = FileUploadResponseDto

/**
 *  类型定义 [ComicChapterContentUpdateRequest]
 *  @来源 内容管理/漫画章节内容
 *  @更新时间 2026-03-19 23:58:08
 */
export type ComicChapterContentUpdateRequest = UpdateComicContentDto

export type ComicChapterContentUpdateResponse = IdDto

/**
 *  类型定义 [ComicChapterContentDeleteRequest]
 *  @来源 内容管理/漫画章节内容
 *  @更新时间 2026-03-19 23:58:08
 */
export type ComicChapterContentDeleteRequest = DeleteComicContentDto

export type ComicChapterContentDeleteResponse = string[]

/**
 *  类型定义 [ComicChapterContentMoveRequest]
 *  @来源 内容管理/漫画章节内容
 *  @更新时间 2026-03-19 23:58:08
 */
export type ComicChapterContentMoveRequest = MoveComicContentDto

export type ComicChapterContentMoveResponse = string[]

/**
 *  类型定义 [ComicChapterContentClearRequest]
 *  @来源 内容管理/漫画章节内容
 *  @更新时间 2026-03-19 23:58:08
 */
export type ComicChapterContentClearRequest = IdDto

export type ComicChapterContentClearResponse = IdDto

/**
 *  类型定义 [FileUploadResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
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
 *  类型定义 [UpdateComicContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdateComicContentDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 章节ID */
  chapterId: number
  /* 内容路径 */
  content: string

  /* 内容索引 */
  index: number
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
 *  类型定义 [DeleteComicContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type DeleteComicContentDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 章节ID */
  chapterId: number

  /* 内容索引列表 */
  index: number[]
}

/**
 *  类型定义 [MoveComicContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type MoveComicContentDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 章节ID */
  chapterId: number
  /* 源索引 */
  fromIndex: number

  /* 目标索引 */
  toIndex: number
}