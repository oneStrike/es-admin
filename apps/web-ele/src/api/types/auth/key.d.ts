export type KeyPublicResponse = RsaPublicKeyDto;

/**
 *  类型定义 [RsaPublicKeyDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type RsaPublicKeyDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* RSA公钥 */
  publicKey: string;
};
