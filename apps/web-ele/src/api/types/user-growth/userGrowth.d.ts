/**
 *  类型定义 [UserGrowthOverviewRequest]
 *  @来源 用户成长/概览
 *  @更新时间 2026-03-01 00:17:14
 */
export type UserGrowthOverviewRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  userId: number;
};

export type UserGrowthOverviewResponse = UserGrowthOverviewDto;

/**
 *  类型定义 [UserGrowthOverviewDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 00:17:14
 */
export type UserGrowthOverviewDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 徽章列表 */
  badges: UserGrowthOverviewBadgeDto[];
  /* 经验 */
  experience: number;
  /* 等级ID */
  levelId?: null | number;
  /* 等级信息 */
  levelInfo?: UserLevelInfoDto;

  /* 积分 */
  points: number;
};

/**
 *  类型定义 [UserLevelInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 00:17:14
 */
export type UserLevelInfoDto = {
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
  nextLevelExperience?: null | number;
  /* 等级权限 */
  permissions: UserLevelPermissionsDto;

  /* 升级进度百分比 */
  progressPercentage?: null | number;
};

/**
 *  类型定义 [UserLevelPermissionsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 00:17:14
 */
export type UserLevelPermissionsDto = {
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
 *  类型定义 [UserGrowthOverviewBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 00:17:14
 */
export type UserGrowthOverviewBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 徽章信息 */
  badge: UserGrowthOverviewBadgeInfoDto;
  /* 徽章ID */
  badgeId: number;
  /* 获得时间 */
  createdAt: string;

  /* 用户ID */
  userId: number;
};

/**
 *  类型定义 [UserGrowthOverviewBadgeInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 00:17:14
 */
export type UserGrowthOverviewBadgeInfoDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 徽章描述 */
  description?: null | string;
  /* 徽章图标URL */
  icon?: null | string;
  /* 徽章ID */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 徽章名称 */
  name: string;
  /* 排序值 */
  sortOrder: number;

  /* 徽章类型 */
  type: number;
};
