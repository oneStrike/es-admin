/**
 *  类型定义 [PointsStatsRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type PointsStatsRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 应用端用户ID */
  userId: number;
};

export type PointsStatsResponse = AdminAppUserPointStatsDto;

/**
 *  类型定义 [PointsGrantRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type PointsGrantRequest = AddAdminAppUserPointsDto;

export type PointsGrantResponse = boolean;

/**
 *  类型定义 [PointsConsumeRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type PointsConsumeRequest = ConsumeAdminAppUserPointsDto;

export type PointsConsumeResponse = boolean;

/**
 *  类型定义 [AdminAppUserPointStatsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AdminAppUserPointStatsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前积分 */
  currentPoints: number;
  /* 今日消耗积分 */
  todayConsumed: number;

  /* 今日获得积分 */
  todayEarned: number;
};

/**
 *  类型定义 [AddAdminAppUserPointsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AddAdminAppUserPointsDto = {
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

/**
 *  类型定义 [ConsumeAdminAppUserPointsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type ConsumeAdminAppUserPointsDto = {
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
