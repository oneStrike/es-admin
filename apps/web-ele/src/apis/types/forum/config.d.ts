export type ConfigGetResponse = BaseForumConfigDto;

/**
 *  类型定义 [ConfigUpdateRequest]
 *  @来源 论坛模块/系统配置
 *  @更新时间 2026-01-28 16:45:52
 */
export type ConfigUpdateRequest = UpdateForumConfigDto;

export type ConfigUpdateResponse = BaseForumConfigDto;

export type ConfigResetResponse = BaseForumConfigDto;

export type ConfigHistoryResponse = ForumConfigHistoryItemDto[];

/**
 *  类型定义 [ConfigRestoreRequest]
 *  @来源 论坛模块/系统配置
 *  @更新时间 2026-01-28 16:45:52
 */
export type ConfigRestoreRequest = IdDto;

export type ConfigRestoreResponse = BaseForumConfigDto;

/**
 *  类型定义 [ConfigDeleteRequest]
 *  @来源 论坛模块/系统配置
 *  @更新时间 2026-01-28 16:45:52
 */
export type ConfigDeleteRequest = IdDto;

export type ConfigDeleteResponse = BaseForumConfigDto;

/**
 *  类型定义 [BaseForumConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-28 16:45:52
 */
export type BaseForumConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否允许匿名发帖 */
  allowAnonymousPost: boolean;
  /* 是否允许匿名回复 */
  allowAnonymousReply: boolean;
  /* 是否允许匿名浏览 */
  allowAnonymousView: boolean;
  /* 是否允许用户注册 */
  allowUserRegister: boolean;
  /* 个人简介最大长度 */
  bioMaxLength: number;
  /* 联系邮箱 */
  contactEmail?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 新注册用户默认发放的积分 */
  defaultPointsForNewUser: number;
  /* 是否启用邮件通知 */
  enableEmailNotification: boolean;
  /* 是否启用收藏通知 */
  enableFavoriteNotification: boolean;
  /* 是否启用站内通知 */
  enableInAppNotification: boolean;
  /* 是否启用点赞通知 */
  enableLikeNotification: boolean;
  /* 是否启用站点维护模式 */
  enableMaintenanceMode: boolean;
  /* 是否启用新回复通知 */
  enableNewReplyNotification: boolean;
  /* 是否启用新主题通知 */
  enableNewTopicNotification: boolean;
  /* 是否启用系统通知 */
  enableSystemNotification: boolean;
  /* 备案号 */
  icpNumber?: null | string;
  /* 主键id */
  id: number;
  /* 维护模式提示信息 */
  maintenanceMessage?: null | string;
  /* 注册是否需要邮箱验证 */
  registerRequireEmailVerify: boolean;
  /* 注册是否需要手机验证 */
  registerRequirePhoneVerify: boolean;
  /* 回复内容最大长度 */
  replyContentMaxLength: number;
  /* 审核策略（0：无需审核，1：触发严重敏感词时审核，2：触一般敏感词时审核，3：触发轻微敏感词时审核，4：强制人工审核） */
  reviewPolicy: number;
  /* 签名最大长度 */
  signatureMaxLength: number;
  /* 站点描述 */
  siteDescription?: null | string;
  /* 站点Favicon URL */
  siteFavicon?: null | string;
  /* 站点关键词 */
  siteKeywords?: null | string;
  /* 站点Logo URL */
  siteLogo?: null | string;
  /* 站点名称 */
  siteName: string;
  /* 主题内容最大长度 */
  topicContentMaxLength: number;
  /* 主题标题最大长度 */
  topicTitleMaxLength: number;
  /* 更新时间 */
  updatedAt: string;
  /* 用户名最大长度 */
  usernameMaxLength: number;

  /* 用户名最小长度 */
  usernameMinLength: number;
};

/**
 *  类型定义 [UpdateForumConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-28 16:45:52
 */
export type UpdateForumConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否允许匿名发帖 */
  allowAnonymousPost: boolean;
  /* 是否允许匿名回复 */
  allowAnonymousReply: boolean;
  /* 是否允许匿名浏览 */
  allowAnonymousView: boolean;
  /* 是否允许用户注册 */
  allowUserRegister: boolean;
  /* 个人简介最大长度 */
  bioMaxLength: number;
  /* 联系邮箱 */
  contactEmail?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 新注册用户默认发放的积分 */
  defaultPointsForNewUser: number;
  /* 是否启用邮件通知 */
  enableEmailNotification: boolean;
  /* 是否启用收藏通知 */
  enableFavoriteNotification: boolean;
  /* 是否启用站内通知 */
  enableInAppNotification: boolean;
  /* 是否启用点赞通知 */
  enableLikeNotification: boolean;
  /* 是否启用站点维护模式 */
  enableMaintenanceMode: boolean;
  /* 是否启用新回复通知 */
  enableNewReplyNotification: boolean;
  /* 是否启用新主题通知 */
  enableNewTopicNotification: boolean;
  /* 是否启用系统通知 */
  enableSystemNotification: boolean;
  /* 备案号 */
  icpNumber?: null | string;
  /* 主键id */
  id: number;
  /* 维护模式提示信息 */
  maintenanceMessage?: null | string;
  /* 变更原因 */
  reason?: null | string;
  /* 注册是否需要邮箱验证 */
  registerRequireEmailVerify: boolean;
  /* 注册是否需要手机验证 */
  registerRequirePhoneVerify: boolean;
  /* 回复内容最大长度 */
  replyContentMaxLength: number;
  /* 审核策略（0：无需审核，1：触发严重敏感词时审核，2：触一般敏感词时审核，3：触发轻微敏感词时审核，4：强制人工审核） */
  reviewPolicy: number;
  /* 签名最大长度 */
  signatureMaxLength: number;
  /* 站点描述 */
  siteDescription?: null | string;
  /* 站点Favicon URL */
  siteFavicon?: null | string;
  /* 站点关键词 */
  siteKeywords?: null | string;
  /* 站点Logo URL */
  siteLogo?: null | string;
  /* 站点名称 */
  siteName: string;
  /* 主题内容最大长度 */
  topicContentMaxLength: number;
  /* 主题标题最大长度 */
  topicTitleMaxLength: number;
  /* 更新时间 */
  updatedAt: string;
  /* 用户名最大长度 */
  usernameMaxLength: number;

  /* 用户名最小长度 */
  usernameMinLength: number;
};

/**
 *  类型定义 [ForumConfigHistoryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-28 16:45:52
 */
export type ForumConfigHistoryItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 变更内容 */
  changes: Record<string, any>;
  /* 变更类型 */
  changeType: Record<string, any>;
  /* 配置ID */
  configId: number;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 操作人IP地址 */
  ipAddress?: string;
  /* 操作时间 */
  operatedAt: string;
  /* 操作人ID */
  operatedById?: number;
  /* 变更原因 */
  reason?: string;
  /* 更新时间 */
  updatedAt: string;

  /* 操作人User-Agent */
  userAgent?: string;
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
