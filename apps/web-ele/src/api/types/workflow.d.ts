/**
 *  类型定义 [WorkflowPageRequest]
 *  @来源 系统管理/工作流
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 归档筛选范围（active=未归档；archived=已归档；all=全部） */
  archiveScope?: null | string;

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
  status?: number;

  /* 工作流类型 */
  workflowType?: string;
};

export type WorkflowPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

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
  /** 任意合法数值 */
  [property: string]: any;

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
  /** 任意合法数值 */
  [property: string]: any;

  /* 工作流 attempt ID */
  attemptId?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 事件类型过滤；不传时默认返回关键生命周期/诊断记录 */
  eventTypes?: any[];

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
  /** 任意合法数值 */
  [property: string]: any;

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
  /** 任意合法数值 */
  [property: string]: any;

  /* 同一游标时间下已读取的最后通知事件ID */
  afterId?: null | number;

  /* 游标时间；只返回该时间之后的通知事件 */
  createdAfter?: null | string;

  /* 通知事实类型过滤；不传时返回执行完成、异常重试、最终失败 */
  kinds?: any[];

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
  /** 任意合法数值 */
  [property: string]: any;

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
  status?: number;
};

export type WorkflowItemPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: ContentImportItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

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
export type WorkflowArchiveRequest = WorkflowArchiveDto;

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
export type WorkflowExpireRequest = WorkflowExpireDto;

export type WorkflowExpireResponse = WorkflowJobDto;

/**
 *  类型定义 [WorkflowJobDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowJobDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 归档时间；为空表示未归档 */
  archivedAt?: null | string;
  /* 取消请求时间 */
  cancelRequestedAt?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 展示名称 */
  displayName: string;
  /* 草稿过期时间 */
  expiresAt?: null | string;
  /* 失败条目数 */
  failedItemCount: number;
  /* 完成时间 */
  finishedAt?: null | string;
  /* 主键ID */
  id: number;
  /* 工作流任务ID */
  jobId: string;
  /* 操作者类型（1=后台管理员；2=系统） */
  operatorType: 1 | 2;
  /* 后台管理员操作者ID；系统任务为空 */
  operatorUserId?: null | number;
  /* 当前进度展示代码；后台根据代码和上下文生成文案 */
  progressCode?: null | string;
  /* 当前进度展示上下文 */
  progressContext?: null | Record<string, any>;
  /* 结构化进度详情快照；用于展示当前运行中的子进度 */
  progressDetail?: null | Record<string, any>;
  /* 进度百分比 */
  progressPercent: number;
  /* 选中条目数 */
  selectedItemCount: number;
  /* 跳过条目数 */
  skippedItemCount: number;
  /* 开始处理时间 */
  startedAt?: null | string;
  /* 任务状态（1=草稿；2=待处理；3=处理中；4=成功；5=部分失败；6=失败；7=已取消；8=已过期） */
  status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /* 成功条目数 */
  successItemCount: number;
  /* 运行时非查询诊断摘要 */
  summary?: null | Record<string, any>;
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
  /** 任意合法数值 */
  [property: string]: any;
  /* 归档时间；为空表示未归档 */
  archivedAt?: null | string;
  /* attempt 列表 */
  attempts: WorkflowAttemptDto[];
  /* 取消请求时间 */
  cancelRequestedAt?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 展示名称 */
  displayName: string;
  /* 草稿过期时间 */
  expiresAt?: null | string;
  /* 失败条目数 */
  failedItemCount: number;
  /* 完成时间 */
  finishedAt?: null | string;
  /* 主键ID */
  id: number;
  /* 工作流任务ID */
  jobId: string;
  /* 操作者类型（1=后台管理员；2=系统） */
  operatorType: 1 | 2;
  /* 后台管理员操作者ID；系统任务为空 */
  operatorUserId?: null | number;
  /* 当前进度展示代码；后台根据代码和上下文生成文案 */
  progressCode?: null | string;
  /* 当前进度展示上下文 */
  progressContext?: null | Record<string, any>;
  /* 结构化进度详情快照；用于展示当前运行中的子进度 */
  progressDetail?: null | Record<string, any>;
  /* 进度百分比 */
  progressPercent: number;
  /* 选中条目数 */
  selectedItemCount: number;
  /* 跳过条目数 */
  skippedItemCount: number;
  /* 开始处理时间 */
  startedAt?: null | string;
  /* 任务状态（1=草稿；2=待处理；3=处理中；4=成功；5=部分失败；6=失败；7=已取消；8=已过期） */
  status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /* 成功条目数 */
  successItemCount: number;
  /* 运行时非查询诊断摘要 */
  summary?: null | Record<string, any>;
  /* 更新时间 */
  updatedAt: string;

  /* 工作流类型 */
  workflowType: string;
};

/**
 *  类型定义 [WorkflowErrorFactsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-20 18:30:00
 */
export type WorkflowErrorFactsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 错误或状态码 */
  code: string;
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
 *  类型定义 [WorkflowAttemptDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-20 18:30:00
 */
export type WorkflowAttemptDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 工作流 attempt ID */
  attemptId: string;
  /* attempt 序号 */
  attemptNo: number;
  /* 当前处理 worker */
  claimedBy?: null | string;
  /* claim 过期时间 */
  claimExpiresAt?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 错误事实；admin 负责根据 code/context 表达 */
  error?: null | WorkflowErrorFactsDto;
  /* 失败条目数 */
  failedItemCount: number;
  /* 完成时间 */
  finishedAt?: null | string;
  /* 最近心跳时间 */
  heartbeatAt?: null | string;
  /* 主键ID */
  id: number;
  /* 最早可被 worker 消费的时间 */
  notBeforeAt?: null | string;
  /* 选中条目数 */
  selectedItemCount: number;
  /* 跳过条目数 */
  skippedItemCount: number;
  /* 开始处理时间 */
  startedAt?: null | string;
  /* attempt状态（1=待处理；2=处理中；3=成功；4=部分失败；5=失败；6=已取消） */
  status: 1 | 2 | 3 | 4 | 5 | 6;
  /* 成功条目数 */
  successItemCount: number;
  /* 触发类型（1=首次确认；2=人工重试；3=系统恢复） */
  triggerType: 1 | 2 | 3;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [WorkflowRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowRecordDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 工作流 attempt ID */
  attemptId?: null | string;
  /* attempt 序号 */
  attemptNo?: null | number;
  /* 创建时间 */
  createdAt: string;
  /* 事件诊断详情 */
  detail?: null | Record<string, any>;
  /* 事件码 */
  eventCode: string;
  /* 事件类型（1=创建草稿；2=确认任务；3=claim attempt；4=心跳；5=进度更新；6=条目成功；7=条目失败；8=attempt完成；9=请求取消；10=人工重试；11=草稿过期；12=资源清理） */
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
  /** 任意合法数值 */
  [property: string]: any;
  /* 工作流通知事实列表 */
  list: WorkflowNotificationItemDto[];
  /* 同一游标时间下下一次轮询游标ID */
  nextAfterId?: null | number;
  /* 下一次轮询游标时间 */
  nextCreatedAfter?: null | string;

  /* 服务端当前时间；用于首次进入时静默建立游标 */
  serverTime: string;
};

/**
 *  类型定义 [WorkflowNotificationItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowNotificationItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
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
  /* 通知事实类型（success=执行完成；retrying=异常后正在系统重试；failed=最终失败） */
  kind: 'failed' | 'retrying' | 'success';
  /* 下次系统重试时间；仅重试中通知可能存在 */
  nextRetryAt?: null | string;
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
 *  类型定义 [ContentImportItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentImportItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 已安排自动重试次数 */
  autoRetryCount: number;
  /* 失败次数 */
  failureCount: number;
  /* 主键ID */
  id: number;
  /* 图片成功数 */
  imageSuccessCount: number;
  /* 图片总数 */
  imageTotal: number;
  /* 内容导入条目ID */
  itemId: string;
  /* 条目类型（1=漫画章节） */
  itemType: 1;
  /* 最近错误事实；admin 负责根据 code/context 表达 */
  lastError?: null | WorkflowErrorFactsDto;
  /* 最近自动重试事实；admin 负责根据 code/context 表达 */
  lastRetry?: null | WorkflowErrorFactsDto;
  /* 本地章节ID */
  localChapterId?: null | number;
  /* 最大自动重试次数 */
  maxAutoRetries: number;
  /* 条目元数据 */
  metadata?: null | Record<string, any>;
  /* 自动重试下次可执行时间 */
  nextRetryAt?: null | string;
  /* 三方章节ID */
  providerChapterId?: null | string;
  /* 排序值 */
  sortOrder: number;
  /* 当前阶段（1=预览中；2=读取来源；3=准备元数据；4=读取内容；5=导入图片；6=写入内容；7=清理残留；8=已完成） */
  stage: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /* 条目状态（1=待处理；2=处理中；3=成功；4=失败；5=重试中；6=已跳过） */
  status: 1 | 2 | 3 | 4 | 5 | 6;
  /* 章节标题 */
  title: string;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [WorkflowJobIdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowJobIdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 工作流任务ID */
  jobId: string;
};

/**
 *  类型定义 [WorkflowArchiveDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowArchiveDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 工作流任务ID */
  jobId: string;
};

/**
 *  类型定义 [WorkflowRetryItemsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowRetryItemsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 重试条目ID列表 */
  itemIds: string[];

  /* 工作流任务ID */
  jobId: string;
};

/**
 *  类型定义 [WorkflowExpireDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowExpireDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 工作流任务ID */
  jobId: string;
};
