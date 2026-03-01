/**
 *  类型定义 [PointsRulesRulesPageRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-01 22:12:30
 */
export type PointsRulesRulesPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 业务域标识 */
  business?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到, 7=管理员操作, 8=主题浏览, 9=举报, 101=漫画浏览, 102=漫画点赞, 103=漫画收藏, 111=章节阅读, 112=章节点赞, 113=章节购买, 114=章节下载, 115=章节兑换） */
  type?: number;
};

export type PointsRulesRulesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseUserPointRuleDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [PointsRulesRulesDetailRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-01 22:12:30
 */
export type PointsRulesRulesDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type PointsRulesRulesDetailResponse = BaseUserPointRuleDto;

/**
 *  类型定义 [PointsRulesRulesCreateRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-01 22:12:30
 */
export type PointsRulesRulesCreateRequest = CreateUserPointRuleDto;

export type PointsRulesRulesCreateResponse = BaseUserPointRuleDto;

/**
 *  类型定义 [PointsRulesRulesUpdateRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-01 22:12:30
 */
export type PointsRulesRulesUpdateRequest = UpdateUserPointRuleDto;

export type PointsRulesRulesUpdateResponse = BaseUserPointRuleDto;

/**
 *  类型定义 [PointsRulesAddPointsRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-01 22:12:30
 */
export type PointsRulesAddPointsRequest = AddUserPointsDto;

export type PointsRulesAddPointsResponse = BaseUserPointRuleDto;

/**
 *  类型定义 [PointsRulesConsumePointsRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-01 22:12:30
 */
export type PointsRulesConsumePointsRequest = ConsumeUserPointsDto;

export type PointsRulesConsumePointsResponse = BaseUserPointRuleDto;

/**
 *  类型定义 [PointsRulesRecordsPageRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-01 22:12:30
 */
export type PointsRulesRecordsPageRequest = {
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

export type PointsRulesRecordsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseUserPointRuleDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [PointsRulesRecordsDetailRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-01 22:12:30
 */
export type PointsRulesRecordsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type PointsRulesRecordsDetailResponse = BaseUserPointRuleDto;

/**
 *  类型定义 [PointsRulesUserStatsRequest]
 *  @来源 用户成长/积分管理
 *  @更新时间 2026-03-01 22:12:30
 */
export type PointsRulesUserStatsRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  userId: number;
};

export type PointsRulesUserStatsResponse = BaseUserPointRuleDto;

export type PointsRulesSyncComicResponse = BaseUserPointRuleDto;

/**
 *  类型定义 [BaseUserPointRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 22:12:30
 */
export type BaseUserPointRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 业务域标识 */
  business?: null | string;
  /* 冷却秒数（0=无限制） */
  cooldownSeconds?: null | number;
  /* 创建时间 */
  createdAt: string;
  /* 每日上限（0=无限制） */
  dailyLimit: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 积分变化（正数为获得，负数为消费） */
  points: number;
  /* 备注 */
  remark?: null | string;
  /* 总上限（0=无限制） */
  totalLimit?: null | number;
  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到, 7=管理员操作, 8=主题浏览, 9=举报, 101=漫画浏览, 102=漫画点赞, 103=漫画收藏, 111=章节阅读, 112=章节点赞, 113=章节购买, 114=章节下载, 115=章节兑换） */
  type:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 101
    | 102
    | 103
    | 111
    | 112
    | 113
    | 114
    | 115;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateUserPointRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 22:12:30
 */
export type CreateUserPointRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 业务域标识 */
  business?: null | string;
  /* 冷却秒数（0=无限制） */
  cooldownSeconds?: null | number;
  /* 每日上限（0=无限制） */
  dailyLimit: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 积分变化（正数为获得，负数为消费） */
  points: number;
  /* 备注 */
  remark?: null | string;
  /* 总上限（0=无限制） */
  totalLimit?: null | number;

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到, 7=管理员操作, 8=主题浏览, 9=举报, 101=漫画浏览, 102=漫画点赞, 103=漫画收藏, 111=章节阅读, 112=章节点赞, 113=章节购买, 114=章节下载, 115=章节兑换） */
  type:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 101
    | 102
    | 103
    | 111
    | 112
    | 113
    | 114
    | 115;
};

/**
 *  类型定义 [UpdateUserPointRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 22:12:30
 */
export type UpdateUserPointRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 业务域标识 */
  business?: null | string;
  /* 冷却秒数（0=无限制） */
  cooldownSeconds?: null | number;
  /* 每日上限（0=无限制） */
  dailyLimit?: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 积分变化（正数为获得，负数为消费） */
  points?: number;
  /* 备注 */
  remark?: null | string;
  /* 总上限（0=无限制） */
  totalLimit?: null | number;

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到, 7=管理员操作, 8=主题浏览, 9=举报, 101=漫画浏览, 102=漫画点赞, 103=漫画收藏, 111=章节阅读, 112=章节点赞, 113=章节购买, 114=章节下载, 115=章节兑换） */
  type?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 101
    | 102
    | 103
    | 111
    | 112
    | 113
    | 114
    | 115;
};

/**
 *  类型定义 [AddUserPointsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 22:12:30
 */
export type AddUserPointsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 备注 */
  remark?: null | string;
  /* 规则类型 */
  ruleType:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 101
    | 102
    | 103
    | 111
    | 112
    | 113
    | 114
    | 115;

  /* 用户ID */
  userId: number;
};

/**
 *  类型定义 [ConsumeUserPointsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 22:12:30
 */
export type ConsumeUserPointsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 关联兑换ID */
  exchangeId?: null | number;
  /* 消费积分数量 */
  points: number;
  /* 备注 */
  remark?: null | string;
  /* 关联目标ID */
  targetId?: null | number;
  /* 关联目标类型 */
  targetType?: null | number;

  /* 用户ID */
  userId: number;
};
