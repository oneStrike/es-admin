/**
 *  类型定义 [ChapterContentListRequest]
 *  @来源 内容管理/漫画章节内容模块
 *  @更新时间 2026-03-01 22:12:30
 */
export type ChapterContentListRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ChapterContentListResponse = string[];

export type ChapterContentAddResponse = FileUploadResponseDto;

export type ChapterContentUpdateResponse = IdDto;

export type ChapterContentDeleteResponse = string[];

export type ChapterContentMoveResponse = string[];

/**
 *  类型定义 [ChapterContentClearRequest]
 *  @来源 内容管理/漫画章节内容模块
 *  @更新时间 2026-03-01 22:12:30
 */
export type ChapterContentClearRequest = IdDto;

export type ChapterContentClearResponse = IdDto;

/**
 *  类型定义 [FileUploadResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 22:12:30
 */
export type FileUploadResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 文件名 */
  filename: string;
  /* 文件路径 */
  filePath: string;
  /* 文件大小 */
  fileSize: number;
  /* 文件类型 */
  fileType: string;
  /* MIME 类型 */
  mimeType: string;
  /* 原始文件名 */
  originalName: string;
  /* 场景 */
  scene: string;

  /* 上传时间 */
  uploadTime: string;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 22:12:30
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};
