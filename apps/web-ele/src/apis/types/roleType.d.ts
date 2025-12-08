export type RoleTypeListResponse = RoleTypeListResponseDto[]

export type RoleTypeCreateResponse = IdDto

export type RoleTypeDeleteResponse = IdDto

export type RoleTypeUpdateResponse = IdDto

export type RoleTypeChangeStatusResponse = IdDto

/**
 *  类型定义 [RoleTypeListResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type RoleTypeListResponseDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 角色代码 */
  code: string
  /* 角色名称 */
  name: string
  /* 角色描述 */
  description?: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type IdDto = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}