/**
 *  类型定义 [ExperienceRulesPageRequest]
 *  @来源 论坛模块/经验管理
 *  @更新时间 2026-01-20 22:44:02
 */
export type ExperienceRulesPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

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

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到） */
  type?: number;
};

export type ExperienceRulesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseForumExperienceRuleDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ExperienceRulesDetailRequest]
 *  @来源 论坛模块/经验管理
 *  @更新时间 2026-01-20 22:44:02
 */
export type ExperienceRulesDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ExperienceRulesDetailResponse = BaseForumExperienceRuleDto;

/**
 *  类型定义 [ExperienceRulesCreateRequest]
 *  @来源 论坛模块/经验管理
 *  @更新时间 2026-01-20 22:44:02
 */
export type ExperienceRulesCreateRequest = CreateForumExperienceRuleDto;

export type ExperienceRulesCreateResponse = BaseForumExperienceRuleDto;

/**
 *  类型定义 [ExperienceRulesUpdateRequest]
 *  @来源 论坛模块/经验管理
 *  @更新时间 2026-01-20 22:44:02
 */
export type ExperienceRulesUpdateRequest = UpdateForumExperienceRuleDto;

export type ExperienceRulesUpdateResponse = BaseForumExperienceRuleDto;

/**
 *  类型定义 [ExperienceRulesDeleteRequest]
 *  @来源 论坛模块/经验管理
 *  @更新时间 2026-01-20 22:44:02
 */
export type ExperienceRulesDeleteRequest = IdDto;

export type ExperienceRulesDeleteResponse = BaseForumExperienceRuleDto;

/**
 *  类型定义 [ExperienceAddRequest]
 *  @来源 论坛模块/经验管理
 *  @更新时间 2026-01-20 22:44:02
 */
export type ExperienceAddRequest = AddForumExperienceDto;

export type ExperienceAddResponse = BaseForumExperienceRuleDto;

/**
 *  类型定义 [ExperienceRecordsPageRequest]
 *  @来源 论坛模块/经验管理
 *  @更新时间 2026-01-20 22:44:02
 */
export type ExperienceRecordsPageRequest = {
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

  /* 用户论坛资料ID */
  profileId: number;

  /* 关联的规则ID */
  ruleId?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type ExperienceRecordsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseForumExperienceRuleDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ExperienceRecordsDetailRequest]
 *  @来源 论坛模块/经验管理
 *  @更新时间 2026-01-20 22:44:02
 */
export type ExperienceRecordsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ExperienceRecordsDetailResponse = BaseForumExperienceRuleDto;

/**
 *  类型定义 [ExperienceUserStatsRequest]
 *  @来源 论坛模块/经验管理
 *  @更新时间 2026-01-20 22:44:02
 */
export type ExperienceUserStatsRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  profileId: number;
};

export type ExperienceUserStatsResponse = BaseForumExperienceRuleDto;

/**
 *  类型定义 [BaseForumExperienceRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-20 22:44:02
 */
export type BaseForumExperienceRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 每日上限（0=无限制） */
  dailyLimit: number;
  /* 经验值变化 */
  experience: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 备注 */
  remark?: null | string;
  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到） */
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateForumExperienceRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-20 22:44:02
 */
export type CreateForumExperienceRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 每日上限（0=无限制） */
  dailyLimit: number;
  /* 经验值变化 */
  experience: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 备注 */
  remark?: null | string;

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到） */
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

/**
 *  类型定义 [UpdateForumExperienceRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-20 22:44:02
 */
export type UpdateForumExperienceRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 每日上限（0=无限制） */
  dailyLimit?: number;
  /* 经验值变化 */
  experience?: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 备注 */
  remark?: null | string;

  /* 规则类型（1=发表主题, 2=发表回复, 3=主题被点赞, 4=回复被点赞, 5=主题被收藏, 6=每日签到） */
  type?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-20 22:44:02
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [AddForumExperienceDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-20 22:44:02
 */
export type AddForumExperienceDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 用户ID */
  profileId: number;
  /* 备注 */
  remark?: null | string;

  /* 规则类型 */
  ruleType: number;
};
