/**
 *  类型定义 [WalletCurrencyPackagePageRequest]
 *  @来源 钱包管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type WalletCurrencyPackagePageRequest = {
  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 充值包名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type WalletCurrencyPackagePageResponse = {
  /* 列表数据 */
  list?: AdminCurrencyPackagePageItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [WalletLedgerPageRequest]
 *  @来源 钱包管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type WalletLedgerPageRequest = {
  /* 结束时间 */
  endDate?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 用户 ID */
  userId: number;
};

export type WalletLedgerPageResponse = {
  /* 列表数据 */
  list?: WalletLedgerRecordDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [WalletCurrencyPackageCreateRequest]
 *  @来源 钱包管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type WalletCurrencyPackageCreateRequest = CreateCurrencyPackageDto;

export type WalletCurrencyPackageCreateResponse = boolean;

/**
 *  类型定义 [WalletCurrencyPackageUpdateRequest]
 *  @来源 钱包管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type WalletCurrencyPackageUpdateRequest = UpdateCurrencyPackageDto;

export type WalletCurrencyPackageUpdateResponse = boolean;

/**
 *  类型定义 [WalletCurrencyPackageUpdateStatusRequest]
 *  @来源 钱包管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type WalletCurrencyPackageUpdateStatusRequest = UpdateEnabledStatusDto;

export type WalletCurrencyPackageUpdateStatusResponse = boolean;

/**
 *  类型定义 [AdminCurrencyPackagePageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminCurrencyPackagePageItemDto = {
  /* 赠送虚拟币数量 */
  bonusAmount: number;
  /* 创建时间 */
  createdAt: string;
  /* 发放虚拟币数量 */
  currencyAmount: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 充值包名称 */
  name: string;
  /* 充值包业务键 */
  packageKey: string;
  /* 支付价格，单位为分 */
  price: number;
  /* 排序值 */
  sortOrder: number;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [WalletLedgerRecordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WalletLedgerRecordDto = {
  /* 流水动作（1=发放资产；2=扣减资产；3=规则判定过程；4=授予徽章） */
  action: 1 | 2 | 3 | 4;
  /* 变更后余额 */
  afterValue: number;
  /* 变更值 */
  amount: number;
  /* 变更前余额 */
  beforeValue: number;
  /* 创建时间 */
  createdAt: string;
  /* 流水 ID */
  id: number;
  /* 展示备注 */
  remark: null | string;
  /* 流水来源 */
  source: string;
};

/**
 *  类型定义 [CreateCurrencyPackageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateCurrencyPackageDto = {
  /* 赠送虚拟币数量 */
  bonusAmount?: number;
  /* 发放虚拟币数量 */
  currencyAmount: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 充值包名称 */
  name: string;
  /* 充值包业务键 */
  packageKey: string;
  /* 支付价格，单位为分 */
  price: number;
  /* 排序值 */
  sortOrder?: number;
};

/**
 *  类型定义 [UpdateCurrencyPackageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateCurrencyPackageDto = {
  /* 赠送虚拟币数量 */
  bonusAmount?: number;
  /* 发放虚拟币数量 */
  currencyAmount?: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 充值包名称 */
  name?: string;
  /* 充值包业务键 */
  packageKey?: string;
  /* 支付价格，单位为分 */
  price?: number;
  /* 排序值 */
  sortOrder?: number;
};

/**
 *  类型定义 [UpdateEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateEnabledStatusDto = {
  /* 主键id */
  id: number;
  /* 状态 true启用 false禁用 */
  isEnabled: boolean;
};
