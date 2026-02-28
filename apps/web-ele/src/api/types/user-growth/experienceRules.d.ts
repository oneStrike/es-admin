/**
 *  类型定义 [ExperienceRulesRulesPageRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-01 01:19:49
 */
export type ExperienceRulesRulesPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 业务域标识 */
  business?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 事件键 */
  eventKey?: null | string;

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

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到, 7=管理员操作, 8=主题浏览, 9=举报, 101=漫画浏览, 102=漫画点赞, 103=漫画收藏, 111=章节阅读, 112=章节点赞, 113=章节购买, 114=章节下载） */
  type?: number;
};

export type ExperienceRulesRulesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseUserExperienceRuleDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ExperienceRulesRulesDetailRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-01 01:19:49
 */
export type ExperienceRulesRulesDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ExperienceRulesRulesDetailResponse = BaseUserExperienceRuleDto;

/**
 *  类型定义 [ExperienceRulesRulesCreateRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-01 01:19:49
 */
export type ExperienceRulesRulesCreateRequest = CreateUserExperienceRuleDto;

export type ExperienceRulesRulesCreateResponse = BaseUserExperienceRuleDto;

/**
 *  类型定义 [ExperienceRulesRulesUpdateRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-01 01:19:49
 */
export type ExperienceRulesRulesUpdateRequest = UpdateUserExperienceRuleDto;

export type ExperienceRulesRulesUpdateResponse = BaseUserExperienceRuleDto;

/**
 *  类型定义 [ExperienceRulesRulesDeleteRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-01 01:19:49
 */
export type ExperienceRulesRulesDeleteRequest = IdDto;

export type ExperienceRulesRulesDeleteResponse = BaseUserExperienceRuleDto;

/**
 *  类型定义 [ExperienceRulesAddRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-01 01:19:49
 */
export type ExperienceRulesAddRequest = AddUserExperienceDto;

export type ExperienceRulesAddResponse = BaseUserExperienceRuleDto;

/**
 *  类型定义 [ExperienceRulesRecordsPageRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-01 01:19:49
 */
export type ExperienceRulesRecordsPageRequest = {
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

export type ExperienceRulesRecordsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseUserExperienceRuleDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ExperienceRulesRecordsDetailRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-01 01:19:49
 */
export type ExperienceRulesRecordsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ExperienceRulesRecordsDetailResponse = BaseUserExperienceRuleDto;

/**
 *  类型定义 [ExperienceRulesUserStatsRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-01 01:19:49
 */
export type ExperienceRulesUserStatsRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  userId: number;
};

export type ExperienceRulesUserStatsResponse = BaseUserExperienceRuleDto;

/**
 *  类型定义 [BaseUserExperienceRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 01:19:49
 */
export type BaseUserExperienceRuleDto = {
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
  /* 事件键 */
  eventKey?: null | string;
  /* 经验值变化 */
  experience: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 备注 */
  remark?: null | string;
  /* 总上限（0=无限制） */
  totalLimit?: null | number;
  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到, 7=管理员操作, 8=主题浏览, 9=举报, 101=漫画浏览, 102=漫画点赞, 103=漫画收藏, 111=章节阅读, 112=章节点赞, 113=章节购买, 114=章节下载） */
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
    | 114;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateUserExperienceRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 01:19:49
 */
export type CreateUserExperienceRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 业务域标识 */
  business?: null | string;
  /* 冷却秒数（0=无限制） */
  cooldownSeconds?: null | number;
  /* 每日上限（0=无限制） */
  dailyLimit: number;
  /* 事件键 */
  eventKey?: null | string;
  /* 经验值变化 */
  experience: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 备注 */
  remark?: null | string;
  /* 总上限（0=无限制） */
  totalLimit?: null | number;

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到, 7=管理员操作, 8=主题浏览, 9=举报, 101=漫画浏览, 102=漫画点赞, 103=漫画收藏, 111=章节阅读, 112=章节点赞, 113=章节购买, 114=章节下载） */
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
    | 114;
};

/**
 *  类型定义 [UpdateUserExperienceRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 01:19:49
 */
export type UpdateUserExperienceRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 业务域标识 */
  business?: null | string;
  /* 冷却秒数（0=无限制） */
  cooldownSeconds?: null | number;
  /* 每日上限（0=无限制） */
  dailyLimit?: number;
  /* 事件键 */
  eventKey?: null | string;
  /* 经验值变化 */
  experience?: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 备注 */
  remark?: null | string;
  /* 总上限（0=无限制） */
  totalLimit?: null | number;

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到, 7=管理员操作, 8=主题浏览, 9=举报, 101=漫画浏览, 102=漫画点赞, 103=漫画收藏, 111=章节阅读, 112=章节点赞, 113=章节购买, 114=章节下载） */
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
    | 114;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 01:19:49
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [AddUserExperienceDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 01:19:49
 */
export type AddUserExperienceDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 备注 */
  remark?: null | string;
  /* 规则类型 */
  ruleType: number;

  /* 用户ID */
  userId: number;
};
