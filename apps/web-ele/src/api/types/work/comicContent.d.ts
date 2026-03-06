/**
 *  类型定义 [ComicContentListRequest]
 *  @来源 内容管理/作品管理/章节/内容/漫画
 *  @更新时间 2026-03-07 00:42:13
 */
export type ComicContentListRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 章节ID */
  chapterId: number;
};

export type ComicContentListResponse = string[];

/**
 *  类型定义 [ComicContentAddRequest]
 *  @来源 内容管理/作品管理/章节/内容/漫画
 *  @更新时间 2026-03-07 00:42:13
 */
export type ComicContentAddRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 章节ID */
  chapterId: number;

  /* 作品ID */
  workId: number;
};

export type ComicContentAddResponse = FileUploadResponseDto;

/**
 *  类型定义 [ComicContentUpdateRequest]
 *  @来源 内容管理/作品管理/章节/内容/漫画
 *  @更新时间 2026-03-07 00:42:13
 */
export type ComicContentUpdateRequest = UpdateComicContentDto;

export type ComicContentUpdateResponse = ChapterIdQueryDto;

/**
 *  类型定义 [ComicContentDeleteRequest]
 *  @来源 内容管理/作品管理/章节/内容/漫画
 *  @更新时间 2026-03-07 00:42:13
 */
export type ComicContentDeleteRequest = DeleteComicContentDto;

export type ComicContentDeleteResponse = string[];

/**
 *  类型定义 [ComicContentMoveRequest]
 *  @来源 内容管理/作品管理/章节/内容/漫画
 *  @更新时间 2026-03-07 00:42:13
 */
export type ComicContentMoveRequest = MoveComicContentDto;

export type ComicContentMoveResponse = string[];

/**
 *  类型定义 [ComicContentClearRequest]
 *  @来源 内容管理/作品管理/章节/内容/漫画
 *  @更新时间 2026-03-07 00:42:13
 */
export type ComicContentClearRequest = ChapterIdQueryDto;

export type ComicContentClearResponse = ChapterIdQueryDto;

/**
 *  类型定义 [FileUploadResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
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
 *  类型定义 [UpdateComicContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type UpdateComicContentDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 章节ID */
  chapterId: number;
  /* 内容路径 */
  content: string;

  /* 内容索引 */
  index: number;
};

/**
 *  类型定义 [ChapterIdQueryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type ChapterIdQueryDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 章节ID */
  chapterId: number;
};

/**
 *  类型定义 [DeleteComicContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type DeleteComicContentDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 章节ID */
  chapterId: number;

  /* 内容索引列表 */
  index: number[];
};

/**
 *  类型定义 [MoveComicContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type MoveComicContentDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 章节ID */
  chapterId: number;
  /* 源索引 */
  fromIndex: number;

  /* 目标索引 */
  toIndex: number;
};
