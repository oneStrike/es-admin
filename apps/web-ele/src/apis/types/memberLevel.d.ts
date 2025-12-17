export type MemberLevelListResponse = BaseMemberLevelDto;

/**
 *  类型定义 [MemberLevelDetailRequest]
 *  @来源 会员模块/会员等级模块
 *  @更新时间 2025-12-17 08:24:05
 */
export type MemberLevelDetailRequest = IdDto;

export type MemberLevelDetailResponse = BaseMemberLevelDto;

/**
 *  类型定义 [MemberLevelCreateRequest]
 *  @来源 会员模块/会员等级模块
 *  @更新时间 2025-12-17 08:24:05
 */
export type MemberLevelCreateRequest = CreateMemberLevelDto;

export type MemberLevelCreateResponse = IdDto;

/**
 *  类型定义 [MemberLevelUpdateRequest]
 *  @来源 会员模块/会员等级模块
 *  @更新时间 2025-12-17 08:24:05
 */
export type MemberLevelUpdateRequest = UpdateMemberLevelDto;

export type MemberLevelUpdateResponse = IdDto;

/**
 *  类型定义 [MemberLevelDeleteRequest]
 *  @来源 会员模块/会员等级模块
 *  @更新时间 2025-12-17 08:24:05
 */
export type MemberLevelDeleteRequest = IdDto;

export type MemberLevelDeleteResponse = IdDto;

/**
 *  类型定义 [MemberLevelChangeStatusRequest]
 *  @来源 会员模块/会员等级模块
 *  @更新时间 2025-12-17 08:24:05
 */
export type MemberLevelChangeStatusRequest = UpdateStatusDto;

export type MemberLevelChangeStatusResponse = IdDto;

/**
 *  类型定义 [BaseMemberLevelDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-17 08:24:05
 */
export type BaseMemberLevelDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 黑名单上限 */
  blacklistLimit: number;
  /* 会员等级专属标识颜色 */
  color: string;
  /* 创建时间 */
  createdAt: string;
  /* 会员等级描述 */
  description: string;
  /* 积分购买折扣（0-1之间的小数，0表示不打折） */
  discount: number;
  /* 会员等级图表 */
  icon: string;
  /* 主键id */
  id: number;
  /* 是否启用该等级 */
  isEnabled: boolean;
  /* 会员等级所需要的登录天数 */
  loginDays: number;
  /* 会员等级名称 */
  name: string;
  /* 会员等级所需要的积分 */
  points: number;
  /* 备注信息 */
  remark?: string;
  /* 更新时间 */
  updatedAt: string;

  /* 作品收藏上限 */
  workCollectionLimit: number;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-17 08:24:05
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [CreateMemberLevelDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-17 08:24:05
 */
export type CreateMemberLevelDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 黑名单上限 */
  blacklistLimit: number;
  /* 会员等级专属标识颜色 */
  color: string;
  /* 会员等级描述 */
  description: string;
  /* 积分购买折扣（0-1之间的小数，0表示不打折） */
  discount: number;
  /* 会员等级图表 */
  icon: string;
  /* 是否启用该等级 */
  isEnabled: boolean;
  /* 会员等级所需要的登录天数 */
  loginDays: number;
  /* 会员等级名称 */
  name: string;
  /* 会员等级所需要的积分 */
  points: number;
  /* 备注信息 */
  remark?: string;

  /* 作品收藏上限 */
  workCollectionLimit: number;
};

/**
 *  类型定义 [UpdateMemberLevelDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-17 08:24:05
 */
export type UpdateMemberLevelDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 黑名单上限 */
  blacklistLimit?: number;
  /* 会员等级专属标识颜色 */
  color?: string;
  /* 会员等级描述 */
  description?: string;
  /* 积分购买折扣（0-1之间的小数，0表示不打折） */
  discount?: number;
  /* 会员等级图表 */
  icon?: string;
  /* 主键id */
  id: number;
  /* 是否启用该等级 */
  isEnabled?: boolean;
  /* 会员等级所需要的登录天数 */
  loginDays?: number;
  /* 会员等级名称 */
  name?: string;
  /* 会员等级所需要的积分 */
  points?: number;
  /* 备注信息 */
  remark?: string;

  /* 作品收藏上限 */
  workCollectionLimit?: number;
};

/**
 *  类型定义 [UpdateStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-17 08:24:05
 */
export type UpdateStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 状态 true启用 false禁用 */
  isEnabled: boolean;
};
