/**
 *  类型定义 [DetailCodeRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type DetailCodeRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  code: string;
};

export type DetailCodeResponse = BaseAppPageDto;

/**
 *  类型定义 [BaseAppPageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type BaseAppPageDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 页面权限级别 */
  accessLevel: 0 | 1 | 2 | 3;
  /* 页面编码（唯一标识） */
  code: string;
  /* 创建时间 */
  createdAt: string;
  /* 页面描述信息 */
  description?: null | string;
  /* 启用的平台 */
  enablePlatform?: any[] | null;
  /* 主键id */
  id: number;
  /* 页面启用状态 */
  isEnabled: boolean;
  /* 页面名称 */
  name: string;
  /* 页面路径（URL路径） */
  path: string;
  /* 页面标题 */
  title: string;

  /* 更新时间 */
  updatedAt: string;
};
