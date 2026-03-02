/**
 *  类型定义 [NovelContentListRequest]
 *  @来源 内容管理/作品管理/章节/内容/小说
 *  @更新时间 2026-03-02 23:55:35
 */
export type NovelContentListRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 章节ID */
  chapterId: number;
};

export type NovelContentListResponse = string;

/**
 *  类型定义 [NovelContentAddRequest]
 *  @来源 内容管理/作品管理/章节/内容/小说
 *  @更新时间 2026-03-02 23:55:35
 */
export type NovelContentAddRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 章节ID */
  chapterId: number;

  /* 作品ID */
  workId: number;
};

export type NovelContentAddResponse = FileUploadResponseDto;

/**
 *  类型定义 [NovelContentDeleteRequest]
 *  @来源 内容管理/作品管理/章节/内容/小说
 *  @更新时间 2026-03-02 23:55:35
 */
export type NovelContentDeleteRequest = ChapterIdDto;

export type NovelContentDeleteResponse = IdDto;

/**
 *  类型定义 [FileUploadResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-02 23:55:35
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
 *  类型定义 [ChapterIdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-02 23:55:35
 */
export type ChapterIdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 章节ID */
  chapterId: number;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-02 23:55:35
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};
