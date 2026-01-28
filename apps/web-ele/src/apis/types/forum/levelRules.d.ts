/**
 *  类型定义 [LevelRulesPageRequest]
 *  @来源 论坛模块/等级规则管理
 *  @更新时间 2026-01-28 16:45:52
 */
export type LevelRulesPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 等级名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type LevelRulesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseForumLevelRuleDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [LevelRulesDetailRequest]
 *  @来源 论坛模块/等级规则管理
 *  @更新时间 2026-01-28 16:45:52
 */
export type LevelRulesDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type LevelRulesDetailResponse = BaseForumLevelRuleDto;

/**
 *  类型定义 [LevelRulesCreateRequest]
 *  @来源 论坛模块/等级规则管理
 *  @更新时间 2026-01-28 16:45:52
 */
export type LevelRulesCreateRequest = CreateForumLevelRuleDto;

export type LevelRulesCreateResponse = BaseForumLevelRuleDto;

/**
 *  类型定义 [LevelRulesUpdateRequest]
 *  @来源 论坛模块/等级规则管理
 *  @更新时间 2026-01-28 16:45:52
 */
export type LevelRulesUpdateRequest = UpdateForumLevelRuleDto;

export type LevelRulesUpdateResponse = BaseForumLevelRuleDto;

/**
 *  类型定义 [LevelRulesDeleteRequest]
 *  @来源 论坛模块/等级规则管理
 *  @更新时间 2026-01-28 16:45:52
 */
export type LevelRulesDeleteRequest = IdDto;

export type LevelRulesDeleteResponse = BaseForumLevelRuleDto;

/**
 *  类型定义 [LevelRulesUserLevelInfoRequest]
 *  @来源 论坛模块/等级规则管理
 *  @更新时间 2026-01-28 16:45:52
 */
export type LevelRulesUserLevelInfoRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type LevelRulesUserLevelInfoResponse = UserForumLevelInfoDto;

/**
 *  类型定义 [LevelRulesCheckPermissionRequest]
 *  @来源 论坛模块/等级规则管理
 *  @更新时间 2026-01-28 16:45:52
 */
export type LevelRulesCheckPermissionRequest = CheckForumLevelPermissionDto;

export type LevelRulesCheckPermissionResponse = ForumLevelPermissionResultDto;

export type LevelRulesStatisticsResponse = BaseForumLevelRuleDto;

/**
 *  类型定义 [BaseForumLevelRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-28 16:45:52
 */
export type BaseForumLevelRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 等级徽章URL */
  badge?: null | string;
  /* 等级专属颜色（十六进制） */
  color?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 每日收藏次数上限，0表示无限制 */
  dailyFavoriteLimit: number;
  /* 每日点赞次数上限，0表示无限制 */
  dailyLikeLimit: number;
  /* 每日回复和评论数量上限，0表示无限制 */
  dailyReplyCommentLimit: number;
  /* 每日发帖数量上限，0表示无限制 */
  dailyTopicLimit: number;
  /* 等级描述 */
  description?: null | string;
  /* 等级图标URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 所需登录天数 */
  loginDays: number;
  /* 等级名称 */
  name: string;
  /* 发帖间隔秒数（防刷屏），0表示无限制 */
  postInterval: number;
  /* 所需经验值 */
  requiredExperience: number;
  /* 排序值（数值越小越靠前） */
  sortOrder: number;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateForumLevelRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-28 16:45:52
 */
export type CreateForumLevelRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 等级徽章URL */
  badge?: null | string;
  /* 等级专属颜色（十六进制） */
  color?: null | string;
  /* 每日收藏次数上限，0表示无限制 */
  dailyFavoriteLimit: number;
  /* 每日点赞次数上限，0表示无限制 */
  dailyLikeLimit: number;
  /* 每日回复和评论数量上限，0表示无限制 */
  dailyReplyCommentLimit: number;
  /* 每日发帖数量上限，0表示无限制 */
  dailyTopicLimit: number;
  /* 等级描述 */
  description?: null | string;
  /* 等级图标URL */
  icon?: null | string;
  /* 是否启用 */
  isEnabled: boolean;
  /* 所需登录天数 */
  loginDays: number;
  /* 等级名称 */
  name: string;
  /* 发帖间隔秒数（防刷屏），0表示无限制 */
  postInterval: number;
  /* 所需经验值 */
  requiredExperience: number;

  /* 排序值（数值越小越靠前） */
  sortOrder: number;
};

/**
 *  类型定义 [UpdateForumLevelRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-28 16:45:52
 */
export type UpdateForumLevelRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 等级徽章URL */
  badge?: null | string;
  /* 等级专属颜色（十六进制） */
  color?: null | string;
  /* 每日收藏次数上限，0表示无限制 */
  dailyFavoriteLimit?: number;
  /* 每日点赞次数上限，0表示无限制 */
  dailyLikeLimit?: number;
  /* 每日回复和评论数量上限，0表示无限制 */
  dailyReplyCommentLimit?: number;
  /* 每日发帖数量上限，0表示无限制 */
  dailyTopicLimit?: number;
  /* 等级描述 */
  description?: null | string;
  /* 等级图标URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 所需登录天数 */
  loginDays?: number;
  /* 等级名称 */
  name?: string;
  /* 发帖间隔秒数（防刷屏），0表示无限制 */
  postInterval?: number;
  /* 所需经验值 */
  requiredExperience?: number;

  /* 排序值（数值越小越靠前） */
  sortOrder?: number;
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
 *  类型定义 [UserForumLevelInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-28 16:45:52
 */
export type UserForumLevelInfoDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前经验值 */
  currentExperience: number;
  /* 等级徽章URL */
  levelBadge?: null | string;
  /* 等级专属颜色（十六进制） */
  levelColor?: null | string;
  /* 等级描述 */
  levelDescription?: null | string;
  /* 等级图标URL */
  levelIcon?: null | string;
  /* 等级ID */
  levelId: number;
  /* 等级名称 */
  levelName: string;
  /* 下一等级所需经验值 */
  nextLevelExperience?: number;
  /* 等级权限 */
  permissions: ForumLevelPermissionsDto;

  /* 升级进度百分比 */
  progressPercentage?: number;
};

/**
 *  类型定义 [ForumLevelPermissionsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-28 16:45:52
 */
export type ForumLevelPermissionsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 每日收藏次数上限，0表示无限制 */
  dailyFavoriteLimit: number;
  /* 每日点赞次数上限，0表示无限制 */
  dailyLikeLimit: number;
  /* 每日回复和评论数量上限，0表示无限制 */
  dailyReplyCommentLimit: number;
  /* 每日发帖数量上限，0表示无限制 */
  dailyTopicLimit: number;

  /* 发帖间隔秒数（防刷屏），0表示无限制 */
  postInterval: number;
};

/**
 *  类型定义 [CheckForumLevelPermissionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-28 16:45:52
 */
export type CheckForumLevelPermissionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 权限类型 */
  permissionType:
    | 'dailyFavoriteLimit'
    | 'dailyLikeLimit'
    | 'dailyReplyCommentLimit'
    | 'dailyTopicLimit'
    | 'postInterval';

  /* 用户ID */
  userId: number;
};

/**
 *  类型定义 [ForumLevelPermissionResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-28 16:45:52
 */
export type ForumLevelPermissionResultDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前等级名称 */
  currentLevel: string;
  /* 是否有权限 */
  hasPermission: boolean;
  /* 限制数量 */
  limit?: number;
  /* 剩余数量 */
  remaining?: number;

  /* 已使用数量 */
  used?: number;
};
