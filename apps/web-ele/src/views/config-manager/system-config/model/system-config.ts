import type { BaseSystemConfigDto, SystemUpdateRequest } from '#/api/types';

export type SystemConfigMenuKey =
  | 'aliyun'
  | 'contentReview'
  | 'forumHashtag'
  | 'maintenance'
  | 'security'
  | 'site'
  | 'thirdPartyResourceParse'
  | 'upload'
  | 'walletCurrency';

export type SystemConfigFormValues = Record<string, unknown>;

export type SystemSecretEncryptor = (value: string) => string;

type BuildSystemConfigUpdatePayloadInput = {
  currentConfig: BaseSystemConfigDto;
  encryptSecret?: SystemSecretEncryptor;
  menuKey: SystemConfigMenuKey;
  values: SystemConfigFormValues;
};

type ContentReviewAction = NonNullable<
  NonNullable<BaseSystemConfigDto['contentReviewPolicy']>['lightAction']
>;
type ContentReviewAuditStatus = NonNullable<ContentReviewAction['auditStatus']>;

const THIRD_PARTY_RESOURCE_PARSE_DEFAULTS = {
  apiIntervalMs: 3000,
  enabled: true,
  hostCacheTtlSeconds: 60,
  imageIntervalMs: 3000,
  maxQueueSize: 1000,
} satisfies NonNullable<BaseSystemConfigDto['thirdPartyResourceParseConfig']>;

const WALLET_CURRENCY_DISPLAY_DEFAULTS = {
  assetKey: 'reading_coin',
  currencyIconUrl: '',
  currencyName: '阅读币',
  currencyUnitName: '币',
} satisfies NonNullable<BaseSystemConfigDto['walletCurrencyDisplayConfig']>;

function textValue(value: unknown) {
  return typeof value === 'string' ? value : undefined;
}

function numberValue(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }

  const normalized = Number(value);
  return Number.isFinite(normalized) ? normalized : undefined;
}

function booleanValue(value: unknown) {
  return typeof value === 'boolean' ? value : undefined;
}

// Generated API narrows audit status to the backend enum, so filter form values.
function contentReviewAuditStatusValue(value: unknown) {
  const status = numberValue(value);

  if (status === 0 || status === 1 || status === 2) {
    return status satisfies ContentReviewAuditStatus;
  }

  return undefined;
}

function uploadProviderValue(value: unknown): 'local' | 'qiniu' | 'superbed' {
  return value === 'qiniu' || value === 'superbed' ? value : 'local';
}

function encryptedSecretValue(
  value: unknown,
  currentValue: null | string | undefined,
  encryptSecret?: SystemSecretEncryptor,
) {
  const plainText = textValue(value);

  if (!plainText) {
    return currentValue;
  }

  return encryptSecret ? encryptSecret(plainText) : plainText;
}

/**
 * 系统配置各分区表单的回填值构造，和页面菜单 key 保持一一对应。
 */
export function buildSystemConfigFormValues(
  menuKey: SystemConfigMenuKey,
  config: BaseSystemConfigDto | null,
) {
  const values: SystemConfigFormValues = {};

  switch (menuKey) {
    case 'aliyun': {
      const aliyunConfig = config?.aliyunConfig ?? {};
      const sms = aliyunConfig.sms ?? {};
      values.accessKeyId = aliyunConfig.accessKeyId;
      values.accessKeySecret = aliyunConfig.accessKeySecret;
      values.smsEndpoint = sms.endpoint;
      values.smsSignName = sms.signName;
      values.smsVerifyCodeLength = sms.verifyCodeLength;
      values.smsVerifyCodeExpire = sms.verifyCodeExpire;
      break;
    }
    case 'contentReview': {
      const policy = config?.contentReviewPolicy ?? {};
      const light = policy.lightAction ?? {};
      const general = policy.generalAction ?? {};
      const severe = policy.severeAction ?? {};
      values.recordHits = policy.recordHits;
      values.lightActionIsHidden = light.isHidden;
      values.lightActionAuditStatus = light.auditStatus;
      values.generalActionIsHidden = general.isHidden;
      values.generalActionAuditStatus = general.auditStatus;
      values.severeActionIsHidden = severe.isHidden;
      values.severeActionAuditStatus = severe.auditStatus;
      break;
    }
    case 'forumHashtag': {
      const forumHashtagConfig =
        config?.operationConfig?.forumHashtagConfig ?? {};
      values.forumHashtagCreationMode = forumHashtagConfig.creationMode ?? 1;
      break;
    }
    case 'maintenance': {
      const maintenanceConfig = config?.maintenanceConfig ?? {};
      values.enableMaintenanceMode = maintenanceConfig.enableMaintenanceMode;
      values.maintenanceMessage = maintenanceConfig.maintenanceMessage;
      break;
    }
    case 'security': {
      const remoteImageImport = config?.securityConfig?.remoteImageImport ?? {};
      values.remoteImageImportEnableAddressGuard =
        remoteImageImport.enableAddressGuard ?? true;
      break;
    }
    case 'thirdPartyResourceParse': {
      const thirdPartyResourceParseConfig = {
        ...THIRD_PARTY_RESOURCE_PARSE_DEFAULTS,
        ...config?.thirdPartyResourceParseConfig,
      };
      values.thirdPartyResourceParseEnabled =
        thirdPartyResourceParseConfig.enabled ??
        THIRD_PARTY_RESOURCE_PARSE_DEFAULTS.enabled;
      values.thirdPartyResourceParseApiIntervalMs =
        numberValue(thirdPartyResourceParseConfig.apiIntervalMs) ??
        THIRD_PARTY_RESOURCE_PARSE_DEFAULTS.apiIntervalMs;
      values.thirdPartyResourceParseImageIntervalMs =
        numberValue(thirdPartyResourceParseConfig.imageIntervalMs) ??
        THIRD_PARTY_RESOURCE_PARSE_DEFAULTS.imageIntervalMs;
      values.thirdPartyResourceParseHostCacheTtlSeconds =
        numberValue(thirdPartyResourceParseConfig.hostCacheTtlSeconds) ??
        THIRD_PARTY_RESOURCE_PARSE_DEFAULTS.hostCacheTtlSeconds;
      values.thirdPartyResourceParseMaxQueueSize =
        numberValue(thirdPartyResourceParseConfig.maxQueueSize) ??
        THIRD_PARTY_RESOURCE_PARSE_DEFAULTS.maxQueueSize;
      break;
    }
    case 'upload': {
      const uploadConfig = config?.uploadConfig ?? {};
      const qiniu = uploadConfig.qiniu ?? {};
      const superbed = uploadConfig.superbed ?? {};
      values.uploadProvider = uploadConfig.provider || 'local';
      values.superbedNonImageFallbackToLocal =
        uploadConfig.superbedNonImageFallbackToLocal ?? false;
      values.qiniuAccessKey = qiniu.accessKey;
      values.qiniuSecretKey = qiniu.secretKey;
      values.qiniuBucket = qiniu.bucket;
      values.qiniuDomain = qiniu.domain;
      values.qiniuRegion = qiniu.region;
      values.qiniuPathPrefix = qiniu.pathPrefix;
      values.qiniuUseHttps = qiniu.useHttps ?? true;
      values.qiniuTokenExpires = qiniu.tokenExpires;
      values.superbedToken = superbed.token;
      values.superbedCategories = superbed.categories;
      values.superbedWatermark = superbed.watermark ?? false;
      values.superbedCompress = superbed.compress ?? false;
      values.superbedWebp = superbed.webp ?? false;
      break;
    }
    case 'walletCurrency': {
      const walletCurrencyDisplayConfig = {
        ...WALLET_CURRENCY_DISPLAY_DEFAULTS,
        ...config?.walletCurrencyDisplayConfig,
      };
      values.walletCurrencyAssetKey = walletCurrencyDisplayConfig.assetKey;
      values.walletCurrencyName = walletCurrencyDisplayConfig.currencyName;
      values.walletCurrencyUnitName =
        walletCurrencyDisplayConfig.currencyUnitName;
      values.walletCurrencyIconUrl =
        walletCurrencyDisplayConfig.currencyIconUrl;
      break;
    }
    default: {
      const siteConfig = config?.siteConfig ?? {};
      values.siteName = siteConfig.siteName;
      values.siteDescription = siteConfig.siteDescription;
      values.siteKeywords = siteConfig.siteKeywords;
      values.siteLogo = siteConfig.siteLogo;
      values.siteFavicon = siteConfig.siteFavicon;
      values.contactEmail = siteConfig.contactEmail;
      values.icpNumber = siteConfig.icpNumber;
      break;
    }
  }

  return values;
}

/**
 * 系统配置更新 payload 只白名单提交当前分区相关字段，保留其它配置快照。
 */
export function buildSystemConfigUpdatePayload({
  currentConfig,
  encryptSecret,
  menuKey,
  values,
}: BuildSystemConfigUpdatePayloadInput): SystemUpdateRequest {
  const submitData: SystemUpdateRequest = {
    aliyunConfig: currentConfig.aliyunConfig,
    contentReviewPolicy: currentConfig.contentReviewPolicy,
    id: currentConfig.id,
    maintenanceConfig: currentConfig.maintenanceConfig,
    operationConfig: currentConfig.operationConfig,
    securityConfig: currentConfig.securityConfig,
    siteConfig: currentConfig.siteConfig,
    thirdPartyResourceParseConfig: currentConfig.thirdPartyResourceParseConfig,
    uploadConfig: currentConfig.uploadConfig,
    walletCurrencyDisplayConfig: currentConfig.walletCurrencyDisplayConfig,
  };

  switch (menuKey) {
    case 'aliyun': {
      const currentAliyunConfig = currentConfig.aliyunConfig ?? {};
      submitData.aliyunConfig = {
        ...currentAliyunConfig,
        accessKeyId: encryptedSecretValue(
          values.accessKeyId,
          currentAliyunConfig.accessKeyId,
          encryptSecret,
        ),
        accessKeySecret: encryptedSecretValue(
          values.accessKeySecret,
          currentAliyunConfig.accessKeySecret,
          encryptSecret,
        ),
        sms: {
          ...currentAliyunConfig.sms,
          endpoint: textValue(values.smsEndpoint),
          signName: textValue(values.smsSignName),
          verifyCodeExpire: numberValue(values.smsVerifyCodeExpire),
          verifyCodeLength: numberValue(values.smsVerifyCodeLength),
        },
      };
      break;
    }
    case 'contentReview': {
      const currentPolicy = currentConfig.contentReviewPolicy ?? {};
      submitData.contentReviewPolicy = {
        ...currentPolicy,
        recordHits: booleanValue(values.recordHits),
        lightAction: {
          ...currentPolicy.lightAction,
          auditStatus: contentReviewAuditStatusValue(
            values.lightActionAuditStatus,
          ),
          isHidden: booleanValue(values.lightActionIsHidden),
        },
        generalAction: {
          ...currentPolicy.generalAction,
          auditStatus: contentReviewAuditStatusValue(
            values.generalActionAuditStatus,
          ),
          isHidden: booleanValue(values.generalActionIsHidden),
        },
        severeAction: {
          ...currentPolicy.severeAction,
          auditStatus: contentReviewAuditStatusValue(
            values.severeActionAuditStatus,
          ),
          isHidden: booleanValue(values.severeActionIsHidden),
        },
      };
      break;
    }
    case 'forumHashtag': {
      const currentOperationConfig = currentConfig.operationConfig ?? {};
      const currentForumHashtagConfig =
        currentOperationConfig.forumHashtagConfig ?? {};
      submitData.operationConfig = {
        ...currentOperationConfig,
        forumHashtagConfig: {
          ...currentForumHashtagConfig,
          creationMode: numberValue(values.forumHashtagCreationMode) ?? 1,
        },
      };
      break;
    }
    case 'maintenance': {
      const currentMaintenanceConfig = currentConfig.maintenanceConfig ?? {};
      submitData.maintenanceConfig = {
        ...currentMaintenanceConfig,
        enableMaintenanceMode: booleanValue(values.enableMaintenanceMode),
        maintenanceMessage: textValue(values.maintenanceMessage),
      };
      break;
    }
    case 'security': {
      const currentSecurityConfig = currentConfig.securityConfig ?? {};
      const currentRemoteImageImport =
        currentSecurityConfig.remoteImageImport ?? {};
      submitData.securityConfig = {
        ...currentSecurityConfig,
        remoteImageImport: {
          ...currentRemoteImageImport,
          enableAddressGuard:
            booleanValue(values.remoteImageImportEnableAddressGuard) ?? true,
        },
      };
      break;
    }
    case 'thirdPartyResourceParse': {
      const currentThirdPartyResourceParseConfig =
        currentConfig.thirdPartyResourceParseConfig ?? {};
      submitData.thirdPartyResourceParseConfig = {
        ...currentThirdPartyResourceParseConfig,
        apiIntervalMs:
          numberValue(values.thirdPartyResourceParseApiIntervalMs) ??
          THIRD_PARTY_RESOURCE_PARSE_DEFAULTS.apiIntervalMs,
        enabled:
          booleanValue(values.thirdPartyResourceParseEnabled) ??
          THIRD_PARTY_RESOURCE_PARSE_DEFAULTS.enabled,
        hostCacheTtlSeconds:
          numberValue(values.thirdPartyResourceParseHostCacheTtlSeconds) ??
          THIRD_PARTY_RESOURCE_PARSE_DEFAULTS.hostCacheTtlSeconds,
        imageIntervalMs:
          numberValue(values.thirdPartyResourceParseImageIntervalMs) ??
          THIRD_PARTY_RESOURCE_PARSE_DEFAULTS.imageIntervalMs,
        maxQueueSize:
          numberValue(values.thirdPartyResourceParseMaxQueueSize) ??
          THIRD_PARTY_RESOURCE_PARSE_DEFAULTS.maxQueueSize,
      } satisfies NonNullable<
        SystemUpdateRequest['thirdPartyResourceParseConfig']
      >;
      break;
    }
    case 'upload': {
      const currentUploadConfig = currentConfig.uploadConfig ?? {};
      const currentQiniu = currentUploadConfig.qiniu ?? {};
      const currentSuperbed = currentUploadConfig.superbed ?? {};
      const provider = uploadProviderValue(values.uploadProvider);
      submitData.uploadConfig = {
        ...currentUploadConfig,
        provider,
        superbedNonImageFallbackToLocal:
          provider === 'superbed'
            ? booleanValue(values.superbedNonImageFallbackToLocal)
            : false,
        qiniu:
          provider === 'qiniu'
            ? {
                ...currentQiniu,
                accessKey: encryptedSecretValue(
                  values.qiniuAccessKey,
                  currentQiniu.accessKey,
                  encryptSecret,
                ),
                bucket: textValue(values.qiniuBucket),
                domain: textValue(values.qiniuDomain),
                pathPrefix: textValue(values.qiniuPathPrefix),
                region: textValue(values.qiniuRegion),
                secretKey: encryptedSecretValue(
                  values.qiniuSecretKey,
                  currentQiniu.secretKey,
                  encryptSecret,
                ),
                tokenExpires: numberValue(values.qiniuTokenExpires),
                useHttps: booleanValue(values.qiniuUseHttps),
              }
            : currentQiniu,
        superbed:
          provider === 'superbed'
            ? {
                ...currentSuperbed,
                categories: textValue(values.superbedCategories),
                compress: booleanValue(values.superbedCompress),
                token: encryptedSecretValue(
                  values.superbedToken,
                  currentSuperbed.token,
                  encryptSecret,
                ),
                watermark: booleanValue(values.superbedWatermark),
                webp: booleanValue(values.superbedWebp),
              }
            : currentSuperbed,
      };
      break;
    }
    case 'walletCurrency': {
      submitData.walletCurrencyDisplayConfig = {
        assetKey: WALLET_CURRENCY_DISPLAY_DEFAULTS.assetKey,
        currencyIconUrl:
          textValue(values.walletCurrencyIconUrl) ??
          WALLET_CURRENCY_DISPLAY_DEFAULTS.currencyIconUrl,
        currencyName:
          textValue(values.walletCurrencyName) ??
          WALLET_CURRENCY_DISPLAY_DEFAULTS.currencyName,
        currencyUnitName:
          textValue(values.walletCurrencyUnitName) ??
          WALLET_CURRENCY_DISPLAY_DEFAULTS.currencyUnitName,
      };
      break;
    }
    default: {
      const currentSiteConfig = currentConfig.siteConfig ?? {};
      submitData.siteConfig = {
        ...currentSiteConfig,
        contactEmail: textValue(values.contactEmail),
        icpNumber: textValue(values.icpNumber),
        siteDescription: textValue(values.siteDescription),
        siteFavicon: textValue(values.siteFavicon),
        siteKeywords: textValue(values.siteKeywords),
        siteLogo: textValue(values.siteLogo),
        siteName: textValue(values.siteName),
      };
      break;
    }
  }

  return submitData;
}
