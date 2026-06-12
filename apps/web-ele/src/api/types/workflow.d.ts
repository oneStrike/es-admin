/**
 *  类型定义 [WorkflowPageRequest]
 *  @来源 系统管理/工作流
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowPageRequest = {
  /* 归档筛选范围（未归档；已归档；全部） */
  archiveScope?: 'active' | 'all' | 'archived' | null;

  /* 结束时间 */
  endDate?: null | string;

  /* 工作流任务ID */
  jobId?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 任务状态（1=草稿；2=待处理；3=处理中；4=成功；5=部分失败；6=失败；7=已取消；8=已过期） */
  status?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  /* 工作流类型 */
  workflowType?: string;
};

export type WorkflowPageResponse = {
  /* 列表数据 */
  list?: WorkflowJobDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [WorkflowDetailRequest]
 *  @来源 系统管理/工作流
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowDetailRequest = {
  /* 工作流任务ID */
  jobId: string;
};

export type WorkflowDetailResponse = WorkflowJobDetailDto;

/**
 *  类型定义 [WorkflowRecordPageRequest]
 *  @来源 系统管理/工作流
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowRecordPageRequest = {
  /* 工作流执行轮次ID */
  attemptId?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 事件类型过滤；不传时默认返回关键生命周期/诊断记录（1=创建草稿；2=确认任务；3=认领执行轮次；4=心跳；5=进度更新；6=条目成功；7=条目失败；8=执行轮次完成；9=请求取消；10=人工重试；11=草稿过期；12=资源清理） */
  eventTypes?: (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12)[];

  /* 工作流任务ID */
  jobId: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type WorkflowRecordPageResponse = {
  /* 列表数据 */
  list?: WorkflowRecordDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [WorkflowNotificationListRequest]
 *  @来源 系统管理/工作流
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowNotificationListRequest = {
  /* 同一游标时间下已读取的最后通知事件ID */
  afterId?: null | number;

  /* 游标时间；只返回该时间之后的通知事件 */
  createdAfter?: null | string;

  /* 通知事实类型过滤；不传时返回执行完成、异常重试、最终失败 */
  kinds?: ('failed' | 'retrying' | 'success')[];

  /* 返回条数；默认20，最大50 */
  limit?: null | number;
};

export type WorkflowNotificationListResponse =
  WorkflowNotificationListResponseDto;

/**
 *  类型定义 [WorkflowItemPageRequest]
 *  @来源 系统管理/工作流
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowItemPageRequest = {
  /* 结束时间 */
  endDate?: null | string;

  /* 工作流任务ID */
  jobId?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 条目状态（1=待处理；2=处理中；3=成功；4=失败；5=重试中；6=已跳过） */
  status?: 1 | 2 | 3 | 4 | 5 | 6;
};

export type WorkflowItemPageResponse = {
  /* 列表数据 */
  list?: WorkflowItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

export type WorkflowTypeOptionsResponse = WorkflowTypeOptionsResponseDto;

/**
 *  类型定义 [WorkflowCancelRequest]
 *  @来源 系统管理/工作流
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowCancelRequest = WorkflowJobIdDto;

export type WorkflowCancelResponse = WorkflowJobDto;

/**
 *  类型定义 [WorkflowArchiveRequest]
 *  @来源 系统管理/工作流
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowArchiveRequest = WorkflowJobIdDto;

export type WorkflowArchiveResponse = WorkflowJobDto;

/**
 *  类型定义 [WorkflowRetryItemsRequest]
 *  @来源 系统管理/工作流
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowRetryItemsRequest = WorkflowRetryItemsDto;

export type WorkflowRetryItemsResponse = WorkflowJobDto;

/**
 *  类型定义 [WorkflowExpireRequest]
 *  @来源 系统管理/工作流
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowExpireRequest = WorkflowJobIdDto;

export type WorkflowExpireResponse = WorkflowJobDto;

/**
 *  类型定义 [WorkflowJobDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowJobDto = {
  /* 归档时间；为空表示未归档 */
  archivedAt: null | string;
  /* 取消请求时间 */
  cancelRequestedAt: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 展示名称 */
  displayName: string;
  /* 草稿过期时间 */
  expiresAt: null | string;
  /* 失败条目数 */
  failedItemCount: number;
  /* 完成时间 */
  finishedAt: null | string;
  /* 主键ID */
  id: number;
  /* 工作流任务ID */
  jobId: string;
  /* 操作者类型（1=后台管理员；2=系统） */
  operatorType: 1 | 2;
  /* 后台管理员操作者ID；系统任务为空 */
  operatorUserId: null | number;
  /* 当前进度展示代码；后台根据代码和上下文生成文案 */
  progressCode: null | string;
  /* 当前进度展示上下文 */
  progressContext: null | Record<string, any>;
  /* 结构化进度详情快照；用于展示当前运行中的子进度 */
  progressDetail: null | Record<string, any>;
  /* 进度百分比 */
  progressPercent: number;
  /* 选中条目数 */
  selectedItemCount: number;
  /* 跳过条目数 */
  skippedItemCount: number;
  /* 开始处理时间 */
  startedAt: null | string;
  /* 任务状态（1=草稿；2=待处理；3=处理中；4=成功；5=部分失败；6=失败；7=已取消；8=已过期） */
  status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /* 成功条目数 */
  successItemCount: number;
  /* 运行时非查询诊断摘要 */
  summary: null | Record<string, any>;
  /* 更新时间 */
  updatedAt: string;
  /* 工作流类型 */
  workflowType: string;
};

/**
 *  类型定义 [WorkflowJobDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowJobDetailDto = {
  /* 归档时间；为空表示未归档 */
  archivedAt: null | string;
  /* 执行轮次列表 */
  attempts: WorkflowAttemptDto[];
  /* 取消请求时间 */
  cancelRequestedAt: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 展示名称 */
  displayName: string;
  /* 草稿过期时间 */
  expiresAt: null | string;
  /* 失败条目数 */
  failedItemCount: number;
  /* 完成时间 */
  finishedAt: null | string;
  /* 主键ID */
  id: number;
  /* 工作流任务ID */
  jobId: string;
  /* 操作者类型（1=后台管理员；2=系统） */
  operatorType: 1 | 2;
  /* 后台管理员操作者ID；系统任务为空 */
  operatorUserId: null | number;
  /* 当前进度展示代码；后台根据代码和上下文生成文案 */
  progressCode: null | string;
  /* 当前进度展示上下文 */
  progressContext: null | Record<string, any>;
  /* 结构化进度详情快照；用于展示当前运行中的子进度 */
  progressDetail: null | Record<string, any>;
  /* 进度百分比 */
  progressPercent: number;
  /* 选中条目数 */
  selectedItemCount: number;
  /* 跳过条目数 */
  skippedItemCount: number;
  /* 开始处理时间 */
  startedAt: null | string;
  /* 任务状态（1=草稿；2=待处理；3=处理中；4=成功；5=部分失败；6=失败；7=已取消；8=已过期） */
  status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /* 成功条目数 */
  successItemCount: number;
  /* 运行时非查询诊断摘要 */
  summary: null | Record<string, any>;
  /* 更新时间 */
  updatedAt: string;
  /* 工作流类型 */
  workflowType: string;
};

/**
 *  类型定义 [WorkflowAttemptDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowAttemptDto = {
  /* 工作流执行轮次ID */
  attemptId: string;
  /* 执行轮次序号 */
  attemptNo: number;
  /* 当前处理节点 */
  claimedBy: null | string;
  /* claim 过期时间 */
  claimExpiresAt: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 错误事实；admin 负责根据 code/context 表达 */
  error: null | WorkflowErrorFactsDto;
  /* 失败条目数 */
  failedItemCount: number;
  /* 完成时间 */
  finishedAt: null | string;
  /* 最近心跳时间 */
  heartbeatAt: null | string;
  /* 主键ID */
  id: number;
  /* 最早可被处理节点领取的时间 */
  notBeforeAt: null | string;
  /* 选中条目数 */
  selectedItemCount: number;
  /* 跳过条目数 */
  skippedItemCount: number;
  /* 开始处理时间 */
  startedAt: null | string;
  /* 执行轮次状态（1=待处理；2=处理中；3=成功；4=部分失败；5=失败；6=已取消） */
  status: 1 | 2 | 3 | 4 | 5 | 6;
  /* 成功条目数 */
  successItemCount: number;
  /* 触发类型（1=首次确认；2=人工重试；3=系统恢复） */
  triggerType: 1 | 2 | 3;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [WorkflowErrorFactsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowErrorFactsDto = {
  /* 错误或状态码，返回归档导入、内容导入、三方导入、数据库写入或工作流运行错误等稳定代码 */
  code:
    | 'ARCHIVE_CHAPTER_IMPORT_FAILED'
    | 'ARCHIVE_IMPORT_CHAPTER_NOT_FOUND'
    | 'ARCHIVE_IMPORT_DEPTH_EXCEEDED'
    | 'ARCHIVE_IMPORT_INVALID_CHAPTER_ID_DIR'
    | 'ARCHIVE_IMPORT_ITEM_IGNORED'
    | 'ARCHIVE_IMPORT_MATCHED'
    | 'ARCHIVE_IMPORT_MISSING_CHAPTER_ID'
    | 'ARCHIVE_IMPORT_NO_IMAGES'
    | 'ARCHIVE_IMPORT_OVERWRITE_WARNING'
    | 'ARCHIVE_IMPORT_PROGRESS_UPDATED'
    | 'ATTEMPT_LEASE_EXPIRED'
    | 'CONTENT_IMPORT_IMAGE_PROGRESS_UPDATED'
    | 'CONTENT_IMPORT_ITEM_FAILED'
    | 'CONTENT_IMPORT_PROGRESS_UPDATED'
    | 'CONTENT_IMPORT_RATE_LIMITED'
    | 'CONTENT_IMPORT_RETRY_EXHAUSTED'
    | 'DATABASE_WRITE_FAILED'
    | 'THIRD_PARTY_CHAPTER_IMPORT_FAILED'
    | 'THIRD_PARTY_IMAGE_IMPORT_FAILED'
    | 'THIRD_PARTY_IMPORT_COMPLETED'
    | 'THIRD_PARTY_RESOURCE_PARSE_FAILED'
    | 'THIRD_PARTY_SYNC_COMPLETED'
    | 'UNKNOWN_WORKFLOW_ERROR'
    | 'UNKNOWN_WORKFLOW_PROGRESS'
    | (string & {});
  /* 可公开给 admin 表达层使用的事实 */
  context: Record<string, any>;
  /* 错误领域 */
  domain: string;
  /* 是否可重试 */
  retryable: boolean;
  /* 严重级别 */
  severity: string;
  /* 错误阶段 */
  stage: string;
};

/**
 *  类型定义 [WorkflowRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowRecordDto = {
  /* 工作流执行轮次ID */
  attemptId: null | string;
  /* 执行轮次序号 */
  attemptNo: null | number;
  /* 创建时间 */
  createdAt: string;
  /* 事件诊断详情 */
  detail: null | Record<string, any>;
  /* 事件码 */
  eventCode: string;
  /* 事件类型（1=创建草稿；2=确认任务；3=认领执行轮次；4=心跳；5=进度更新；6=条目成功；7=条目失败；8=执行轮次完成；9=请求取消；10=人工重试；11=草稿过期；12=资源清理） */
  eventType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /* 主键ID */
  id: number;
};

/**
 *  类型定义 [WorkflowNotificationListResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowNotificationListResponseDto = {
  /* 工作流通知事实列表 */
  list: WorkflowNotificationItemDto[];
  /* 同一游标时间下下一次轮询游标ID */
  nextAfterId: null | number;
  /* 下一次轮询游标时间 */
  nextCreatedAfter: null | string;
  /* 服务端当前时间；用于首次进入时静默建立游标 */
  serverTime: string;
};

/**
 *  类型定义 [WorkflowNotificationItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowNotificationItemDto = {
  /* 通知事件创建时间 */
  createdAt: string;
  /* 展示名称 */
  displayName: string;
  /* 失败条目数 */
  failedItemCount: number;
  /* 通知事件ID */
  id: number;
  /* 工作流任务ID */
  jobId: string;
  /* 通知事实类型（执行完成；异常后正在系统重试；最终失败） */
  kind: 'failed' | 'retrying' | 'success';
  /* 下次系统重试时间；仅重试中通知可能存在 */
  nextRetryAt: null | string;
  /* 选中条目数 */
  selectedItemCount: number;
  /* 跳过条目数 */
  skippedItemCount: number;
  /* 任务状态（1=草稿；2=待处理；3=处理中；4=成功；5=部分失败；6=失败；7=已取消；8=已过期） */
  status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /* 成功条目数 */
  successItemCount: number;
  /* 更新时间 */
  updatedAt: string;
  /* 工作流类型 */
  workflowType: string;
};

/**
 *  类型定义 [WorkflowItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowItemDto = {
  /* 失败次数 */
  failureCount: number;
  /* 主键ID */
  id: number;
  /* 工作流条目ID */
  itemId: string;
  /* 最近错误事实；admin 负责根据 code/context 表达 */
  lastError: null | WorkflowErrorFactsDto;
  /* 条目元数据 */
  metadata: null | Record<string, any>;
  /* 下次可重试时间 */
  nextRetryAt: null | string;
  /* 条目状态（1=待处理；2=处理中；3=成功；4=失败；5=重试中；6=已跳过） */
  status: 1 | 2 | 3 | 4 | 5 | 6;
  /* 业务对象 ID */
  subjectId: null | number;
  /* 业务对象展示名 */
  subjectLabel: null | string;
  /* 业务对象类型 */
  subjectType: null | string;
  /* 成功数量 */
  successCount: number;
  /* 条目标题 */
  title: string;
  /* 总数量 */
  totalCount: number;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [WorkflowTypeOptionsResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowTypeOptionsResponseDto = {
  /* 工作流类型选项列表 */
  list: WorkflowTypeOptionDto[];
};

/**
 *  类型定义 [WorkflowTypeOptionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowTypeOptionDto = {
  /* 工作流说明 */
  description: null | string;
  /* 是否可在后台筛选中展示为启用 */
  enabled: boolean;
  /* 运营侧展示名称 */
  label: string;
  /* 工作流类型 */
  type: string;
};

/**
 *  类型定义 [WorkflowJobIdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowJobIdDto = {
  /* 工作流任务ID */
  jobId: string;
};

/**
 *  类型定义 [WorkflowRetryItemsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowRetryItemsDto = {
  /* 重试条目ID列表 */
  itemIds: string[];
  /* 工作流任务ID */
  jobId: string;
};
