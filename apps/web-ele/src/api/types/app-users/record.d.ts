/**
 *  类型定义 [RecordPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type RecordPageRequest = {
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

  /* 关联目标ID */
  targetId?: null | number;

  /* 关联目标类型 */
  targetType?: null | number;

  /* 应用端用户ID */
  userId: number;
};

export type RecordPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: AdminAppUserPointRecordDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [RecordPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type RecordPageRequest = {
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

  /* 应用端用户ID */
  userId: number;
};

export type RecordPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: AdminAppUserExperienceRecordDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [RecordPageRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type RecordPageRequest = {
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

export type RecordPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: UserExperienceRecordDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [RecordDetailRequest]
 *  @来源 用户成长/经验管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type RecordDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type RecordDetailResponse = UserExperienceRecordDetailDto;

/**
 *  类型定义 [AdminAppUserPointRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AdminAppUserPointRecordDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 变化后积分 */
  afterPoints: number;
  /* 变化前积分 */
  beforePoints: number;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 积分变化（正数为获得，负数为消费） */
  points: number;
  /* 备注 */
  remark?: null | string;
  /* 关联的规则ID */
  ruleId?: null | number;
  /* 关联目标ID */
  targetId?: null | number;
  /* 关联目标类型 */
  targetType?: null | number;

  /* 关联的用户ID */
  userId: number;
};

/**
 *  类型定义 [AdminAppUserExperienceRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AdminAppUserExperienceRecordDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 变化后经验值 */
  afterExperience: number;
  /* 变化前经验值 */
  beforeExperience: number;
  /* 创建时间 */
  createdAt: string;
  /* 经验值变化 */
  experience: number;
  /* 主键id */
  id: number;
  /* 备注 */
  remark?: null | string;
  /* 关联的规则ID */
  ruleId?: null | number;

  /* 关联的用户ID */
  userId: number;
};

/**
 *  类型定义 [UserExperienceRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UserExperienceRecordDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 变化后经验值 */
  afterExperience: number;
  /* 变化前经验值 */
  beforeExperience: number;
  /* 创建时间 */
  createdAt: string;
  /* 经验值变化 */
  experience: number;
  /* 主键id */
  id: number;
  /* 备注 */
  remark?: null | string;
  /* 关联的规则ID */
  ruleId?: null | number;

  /* 关联的用户ID */
  userId: number;
};

/**
 *  类型定义 [UserExperienceRecordDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UserExperienceRecordDetailDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 变化后经验值 */
  afterExperience: number;
  /* 变化前经验值 */
  beforeExperience: number;
  /* 创建时间 */
  createdAt: string;
  /* 经验值变化 */
  experience: number;
  /* 主键id */
  id: number;
  /* 备注 */
  remark?: null | string;
  /* 关联的规则ID */
  ruleId?: null | number;
  /* 经验所属用户 */
  user: ForumAppUserInfoDto;

  /* 关联的用户ID */
  userId: number;
};

/**
 *  类型定义 [ForumAppUserInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type ForumAppUserInfoDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 账号 */
  account: string;
  /* 头像URL */
  avatarUrl?: null | string;
  /* 出生日期 */
  birthDate?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 邮箱 */
  emailAddress?: null | string;
  /* 性别（0=未知，1=男，2=女，3=其他，4=保密） */
  genderType: 0 | 1 | 2 | 3 | 4;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 最后登录时间 */
  lastLoginAt?: null | string;
  /* 最后登录IP */
  lastLoginIp?: null | string;
  /* 昵称 */
  nickname: string;
  /* 手机号 */
  phoneNumber?: null | string;

  /* 更新时间 */
  updatedAt: string;
};
