/**
 *  类型定义 [ExperienceStatsRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type ExperienceStatsRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 应用端用户ID */
  userId: number;
};

export type ExperienceStatsResponse = AdminAppUserExperienceStatsDto;

/**
 *  类型定义 [ExperienceGrantRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type ExperienceGrantRequest = AddAdminAppUserExperienceDto;

export type ExperienceGrantResponse = boolean;

/**
 *  类型定义 [AdminAppUserExperienceStatsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AdminAppUserExperienceStatsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前经验值 */
  currentExperience: number;
  /* 距离下一等级的经验差值 */
  gapToNextLevel?: null | number;
  /* 当前等级信息 */
  level?: AdminAppUserLevelDto;
  /* 下一等级信息 */
  nextLevel?: AdminAppUserLevelDto;

  /* 今日获得经验值 */
  todayEarned: number;
};

/**
 *  类型定义 [AdminAppUserLevelDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AdminAppUserLevelDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 等级ID */
  id: number;
  /* 等级名称 */
  name: string;

  /* 升级所需经验值 */
  requiredExperience: number;
};

/**
 *  类型定义 [AddAdminAppUserExperienceDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AddAdminAppUserExperienceDto = {
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
    | 10
    | 11
    | 12
    | 16
    | 100
    | 101
    | 102
    | 103
    | 104
    | 200
    | 201
    | 202
    | 203
    | 204
    | 300
    | 301
    | 302
    | 303
    | 304
    | 305
    | 306
    | 400
    | 401
    | 402
    | 403
    | 404
    | 405
    | 406
    | 600
    | 601
    | 602
    | 700
    | 701
    | 702
    | 703
    | 800
    | 801;

  /* 用户ID */
  userId: number;
};
