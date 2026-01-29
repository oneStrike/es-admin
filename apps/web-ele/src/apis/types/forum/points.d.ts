/**
 *  类型定义 [PointsRulesPageRequest]
 *  @来源 论坛模块/积分管理
 *  @更新时间 2026-01-29 15:24:37
 */
export type PointsRulesPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 规则名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到） */
  type?: number;
};

export type PointsRulesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseForumPointRuleDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [PointsRulesDetailRequest]
 *  @来源 论坛模块/积分管理
 *  @更新时间 2026-01-29 15:24:37
 */
export type PointsRulesDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type PointsRulesDetailResponse = BaseForumPointRuleDto;

/**
 *  类型定义 [PointsRulesCreateRequest]
 *  @来源 论坛模块/积分管理
 *  @更新时间 2026-01-29 15:24:37
 */
export type PointsRulesCreateRequest = CreateForumPointRuleDto;

export type PointsRulesCreateResponse = BaseForumPointRuleDto;

/**
 *  类型定义 [PointsRulesUpdateRequest]
 *  @来源 论坛模块/积分管理
 *  @更新时间 2026-01-29 15:24:37
 */
export type PointsRulesUpdateRequest = UpdateForumPointRuleDto;

export type PointsRulesUpdateResponse = BaseForumPointRuleDto;

/**
 *  类型定义 [PointsAddPointsRequest]
 *  @来源 论坛模块/积分管理
 *  @更新时间 2026-01-29 15:24:37
 */
export type PointsAddPointsRequest = AddForumPointsDto;

export type PointsAddPointsResponse = BaseForumPointRuleDto;

/**
 *  类型定义 [PointsConsumePointsRequest]
 *  @来源 论坛模块/积分管理
 *  @更新时间 2026-01-29 15:24:37
 */
export type PointsConsumePointsRequest = ConsumeForumPointsDto;

export type PointsConsumePointsResponse = BaseForumPointRuleDto;

/**
 *  类型定义 [PointsRecordsPageRequest]
 *  @来源 论坛模块/积分管理
 *  @更新时间 2026-01-29 15:24:37
 */
export type PointsRecordsPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 关联的规则ID */
  ruleId?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 用户ID */
  userId: number;
};

export type PointsRecordsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseForumPointRuleDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [PointsRecordsDetailRequest]
 *  @来源 论坛模块/积分管理
 *  @更新时间 2026-01-29 15:24:37
 */
export type PointsRecordsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type PointsRecordsDetailResponse = BaseForumPointRuleDto;

/**
 *  类型定义 [PointsUserStatsRequest]
 *  @来源 论坛模块/积分管理
 *  @更新时间 2026-01-29 15:24:37
 */
export type PointsUserStatsRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  userId: number;
};

export type PointsUserStatsResponse = BaseForumPointRuleDto;

export type PointsSyncComicResponse = BaseForumPointRuleDto;

/**
 *  类型定义 [BaseForumPointRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-29 15:24:37
 */
export type BaseForumPointRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 每日上限（0=无限制） */
  dailyLimit: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 规则名称 */
  name: string;
  /* 积分变化（正数为获得，负数为消费） */
  points: number;
  /* 备注 */
  remark?: null | string;
  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到） */
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateForumPointRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-29 15:24:37
 */
export type CreateForumPointRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 每日上限（0=无限制） */
  dailyLimit: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 规则名称 */
  name: string;
  /* 积分变化（正数为获得，负数为消费） */
  points: number;
  /* 备注 */
  remark?: null | string;

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到） */
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

/**
 *  类型定义 [UpdateForumPointRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-29 15:24:37
 */
export type UpdateForumPointRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 每日上限（0=无限制） */
  dailyLimit?: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 规则名称 */
  name?: string;
  /* 积分变化（正数为获得，负数为消费） */
  points?: number;
  /* 备注 */
  remark?: null | string;

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到） */
  type?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

/**
 *  类型定义 [AddForumPointsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-29 15:24:37
 */
export type AddForumPointsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 备注 */
  remark?: null | string;
  /* 规则类型 */
  ruleType: 1 | 2 | 3 | 4 | 5 | 6 | 7;

  /* 用户ID */
  userId: number;
};

/**
 *  类型定义 [ConsumeForumPointsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-29 15:24:37
 */
export type ConsumeForumPointsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 消费积分数量 */
  points: number;
  /* 备注 */
  remark?: null | string;

  /* 用户ID */
  userId: number;
};
