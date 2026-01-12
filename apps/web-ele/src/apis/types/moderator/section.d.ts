/**
 *  类型定义 [SectionAssignRequest]
 *  @来源 论坛管理/版主管理模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type SectionAssignRequest = AssignModeratorSectionDto;

export type SectionAssignResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 响应状态码 */
  code?: number;

  /* 响应消息 */
  message?: string;
};

/**
 *  类型定义 [AssignModeratorSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type AssignModeratorSectionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 版主ID */
  moderatorId: number;
  /* 权限列表 */
  permissions: number[];

  /* 板块ID列表 */
  sectionIds: number[];
};
