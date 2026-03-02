/**
 *  类型定义 [ChapterContentListRequest]
 *  @来源 内容管理/漫画章节内容模块
 *  @更新时间 2026-03-02 23:55:35
 */
export type ChapterContentListRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ChapterContentListResponse = string[];

/**
 *  类型定义 [ChapterContentAddRequest]
 *  @来源 内容管理/漫画章节内容模块
 *  @更新时间 2026-03-02 23:55:35
 */
export type ChapterContentAddRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 章节ID */
  chapterId: number;

  /* 作品ID */
  workId: number;
};

export type ChapterContentAddResponse = FileUploadResponseDto;

/**
 *  类型定义 [ChapterContentUpdateRequest]
 *  @来源 内容管理/漫画章节内容模块
 *  @更新时间 2026-03-02 23:55:35
 */
export type ChapterContentUpdateRequest = UpdateComicContentDto;

export type ChapterContentUpdateResponse = IdDto;

/**
 *  类型定义 [ChapterContentDeleteRequest]
 *  @来源 内容管理/漫画章节内容模块
 *  @更新时间 2026-03-02 23:55:35
 */
export type ChapterContentDeleteRequest = DeleteComicContentDto;

export type ChapterContentDeleteResponse = string[];

/**
 *  类型定义 [ChapterContentMoveRequest]
 *  @来源 内容管理/漫画章节内容模块
 *  @更新时间 2026-03-02 23:55:35
 */
export type ChapterContentMoveRequest = MoveComicContentDto;

export type ChapterContentMoveResponse = string[];

/**
 *  类型定义 [ChapterContentClearRequest]
 *  @来源 内容管理/漫画章节内容模块
 *  @更新时间 2026-03-02 23:55:35
 */
export type ChapterContentClearRequest = IdDto;

export type ChapterContentClearResponse = IdDto;

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
 *  类型定义 [UpdateComicContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-02 23:55:35
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

/**
 *  类型定义 [DeleteComicContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-02 23:55:35
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
 *  @更新时间 2026-03-02 23:55:35
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
