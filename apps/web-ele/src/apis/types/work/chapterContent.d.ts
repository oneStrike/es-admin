/**
 *  类型定义 [ChapterContentListRequest]
 *  @来源 内容管理/漫画章节内容模块
 *  @更新时间 2026-01-28 16:45:52
 */
export type ChapterContentListRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ChapterContentListResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: string[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ChapterContentAddRequest]
 *  @来源 内容管理/漫画章节内容模块
 *  @更新时间 2026-01-28 16:45:52
 */
export type ChapterContentAddRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 章节ID */
  chapterId: number;

  /* 漫画ID */
  comicId: number;
};

export type ChapterContentAddResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 响应状态码 */
  code?: number;

  /* 响应消息 */
  message?: string;
};

/**
 *  类型定义 [ChapterContentUpdateRequest]
 *  @来源 内容管理/漫画章节内容模块
 *  @更新时间 2026-01-28 16:45:52
 */
export type ChapterContentUpdateRequest = UpdateChapterContentDto;

export type ChapterContentUpdateResponse = IdDto;

/**
 *  类型定义 [ChapterContentDeleteRequest]
 *  @来源 内容管理/漫画章节内容模块
 *  @更新时间 2026-01-28 16:45:52
 */
export type ChapterContentDeleteRequest = DeleteChapterContentDto;

export type ChapterContentDeleteResponse = string;

/**
 *  类型定义 [ChapterContentMoveRequest]
 *  @来源 内容管理/漫画章节内容模块
 *  @更新时间 2026-01-28 16:45:52
 */
export type ChapterContentMoveRequest = MoveChapterContentDto;

export type ChapterContentMoveResponse = string;

/**
 *  类型定义 [ChapterContentBatchUpdateRequest]
 *  @来源 内容管理/漫画章节内容模块
 *  @更新时间 2026-01-28 16:45:52
 */
export type ChapterContentBatchUpdateRequest = BatchUpdateChapterContentsDto;

export type ChapterContentBatchUpdateResponse = IdDto;

/**
 *  类型定义 [ChapterContentClearRequest]
 *  @来源 内容管理/漫画章节内容模块
 *  @更新时间 2026-01-28 16:45:52
 */
export type ChapterContentClearRequest = IdDto;

export type ChapterContentClearResponse = IdDto;

/**
 *  类型定义 [UpdateChapterContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-28 16:45:52
 */
export type UpdateChapterContentDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 要更新的内容（图片URL） */
  content: string;
  /* 主键id */
  id: number;

  /* 插入位置索引（可选，默认添加到末尾） */
  index: number;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-28 16:45:52
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [DeleteChapterContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-28 16:45:52
 */
export type DeleteChapterContentDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 要删除的内容索引 */
  index: number[];
};

/**
 *  类型定义 [MoveChapterContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-28 16:45:52
 */
export type MoveChapterContentDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 源索引位置 */
  fromIndex: number;
  /* 主键id */
  id: number;

  /* 目标索引位置 */
  toIndex: number;
};

/**
 *  类型定义 [BatchUpdateChapterContentsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-28 16:45:52
 */
export type BatchUpdateChapterContentsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 新的内容数组（JSON格式） */
  contents: string[];

  /* 主键id */
  id: number;
};
