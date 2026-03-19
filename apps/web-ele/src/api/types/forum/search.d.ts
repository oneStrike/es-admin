/**
 *  类型定义 [SearchPageRequest]
 *  @来源 论坛管理/论坛搜索
 *  @更新时间 2026-03-19 23:58:08
 */
export type SearchPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 搜索关键词 */
  keyword: string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码 */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 板块ID */
  sectionId?: null | number

  /* 排序类型（latest=LATEST，hot=HOT，relevance=RELEVANCE） */
  sort?: null | string

  /* 开始时间 */
  startDate?: null | string

  /* 标签ID */
  tagId?: null | number

  /* 搜索类型（topic=TOPIC，reply=REPLY，all=ALL） */
  type?: null | string
}

export type SearchPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: ForumSearchResultDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ForumSearchResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type ForumSearchResultDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 收藏数 */
  favoriteCount: number
  /* 点赞数 */
  likeCount: number
  /* 回复内容摘要 */
  replyContentSnippet?: null | string
  /* 回复数 */
  replyCount: number
  /* 回复ID */
  replyId?: null | number
  /* 结果类型（topic=TOPIC，reply=REPLY，all=ALL） */
  resultType: 'all' | 'reply' | 'topic'
  /* 板块ID */
  sectionId: number
  /* 板块名称 */
  sectionName: string
  /* 主题内容摘要 */
  topicContentSnippet?: null | string
  /* 主题ID */
  topicId: number
  /* 主题标题 */
  topicTitle: string
  /* 用户头像 */
  userAvatarUrl?: null | string
  /* 用户ID */
  userId: number
  /* 用户昵称 */
  userNickname: string

  /* 浏览数 */
  viewCount: number
}