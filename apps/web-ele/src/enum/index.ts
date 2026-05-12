/**
 * 内容类型枚举
 */
export enum ContentTypeEnum {
  /** 漫画 */
  COMIC = 1,
  /** 小说 */
  NOVEL = 2,
  /** 帖子 */
  TOPIC = 3,
}

// 作者角色类型枚举
export enum AuthorTypeEnum {
  /** 漫画家 */
  MANGA = 1,
  /** 轻小说作者 */
  NOVEL = 2,
}

// / 性别枚举
export enum GenderEnum {
  /** 未知 */
  UNKNOWN = 0,
  /** 男性 */
  MALE = 1,
  /** 女性 */
  FEMALE = 2,
  /** 其他 */
  OTHER = 3,
  /** 保密 */
  SECRET = 4,
}

// 作品阅读权限枚举
export enum ContentPermissionEnum {
  /** 登录可见 */
  ALL = 0,
  /** 公开 */
  LOGIN = 1,
  /** 会员可见 */
  VIP = 2,
  /** 购买可见 */
  PURCHASE = 3,
}

// 作品下载权限枚举
export enum DownloadPermissionEnum {
  /** 禁止 */
  DENY = 0,
  /** 允许 */
  ALLOW = 1,
  /** 会员 */
  VIP = 2,
  /** 购买 */
  PURCHASE = 3,
}
