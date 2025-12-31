/**
 * 内容类型枚举 bitmask
 */
export enum ContentTypeEnum {
  /** 漫画 */
  COMIC = 1,
  /** 插画 */
  ILLUSTRATION = 4,
  /** 小说 */
  NOVEL = 2,
  /** 写真 */
  PHOTO = 8,
}

// 作者角色类型枚举 bitmask
export enum AuthorTypeEnum {
  /** 漫画家 */
  COMIC_COVER = 4,
  /** 插画家 */
  ILLUSTRATOR = 2,
  /** 模特 */
  MODEL = 8,
  /** 作家 */
  WRITER = 1,
}

// / 性别枚举
export enum GenderEnum {
  /** 女性 */
  FEMALE = 2,
  /** 男性 */
  MALE = 1,
  /** 其他 */
  OTHER = 3,
  /** 保密 */
  SECRET = 4,
  /** 未知 */
  UNKNOWN = 0,
}

// 作品阅读权限枚举
export enum ContentPermissionEnum {
  /** 登录可见 */
  ALL = 1,
  /** 公开 */
  LOGIN = 0,
  /** 购买可见 */
  PURCHASE = 3,
  /** 会员可见 */
  VIP = 2,
}

// 作品下载权限枚举
export enum DownloadPermissionEnum {
  /** 允许 */
  ALLOW = 1,
  /** 禁止 */
  DENY = 0,
  /** 购买 */
  PURCHASE = 3,
  /** 会员 */
  VIP = 2,
}
