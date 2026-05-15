import type { BaseSystemConfigDto } from '#/api/types';

import { describe, expect, it } from 'vitest';

import {
  buildSystemConfigFormValues,
  buildSystemConfigUpdatePayload,
} from './system-config';
import { thirdPartyResourceParseFormSchema } from '../modules/model/shared';

describe('system config model', () => {
  const baseConfig = {
    aliyunConfig: {
      accessKeyId: 'masked-ak',
      accessKeySecret: 'masked-sk',
    },
    contentReviewPolicy: {
      recordHits: true,
    },
    createdAt: '2026-05-15T00:00:00.000Z',
    id: 1,
    maintenanceConfig: {
      enableMaintenanceMode: false,
      maintenanceMessage: 'ok',
    },
    operationConfig: {
      forumHashtagConfig: {
        creationMode: 2,
      },
    },
    securityConfig: {
      remoteImageImport: {
        enableAddressGuard: true,
      },
    },
    siteConfig: {
      siteName: 'ES',
    },
    thirdPartyResourceParseConfig: {
      apiIntervalMs: 2500,
      enabled: false,
      hostCacheTtlSeconds: 90,
      imageIntervalMs: 3500,
      maxQueueSize: 200,
    },
    updatedAt: '2026-05-15T00:00:00.000Z',
    uploadConfig: {
      provider: 'local',
    },
  } satisfies BaseSystemConfigDto;

  it('hydrates third-party resource parse config form values', () => {
    expect(
      buildSystemConfigFormValues('thirdPartyResourceParse', baseConfig),
    ).toEqual({
      thirdPartyResourceParseApiIntervalMs: 2500,
      thirdPartyResourceParseEnabled: false,
      thirdPartyResourceParseHostCacheTtlSeconds: 90,
      thirdPartyResourceParseImageIntervalMs: 3500,
      thirdPartyResourceParseMaxQueueSize: 200,
    });
  });

  it('uses server defaults when third-party resource parse config is missing', () => {
    expect(
      buildSystemConfigFormValues('thirdPartyResourceParse', {
        ...baseConfig,
        thirdPartyResourceParseConfig: undefined,
      }),
    ).toEqual({
      thirdPartyResourceParseApiIntervalMs: 3000,
      thirdPartyResourceParseEnabled: true,
      thirdPartyResourceParseHostCacheTtlSeconds: 60,
      thirdPartyResourceParseImageIntervalMs: 3000,
      thirdPartyResourceParseMaxQueueSize: 1000,
    });
  });

  it('builds a whitelist update payload for only third-party resource parse config', () => {
    const payload = buildSystemConfigUpdatePayload({
      currentConfig: baseConfig,
      menuKey: 'thirdPartyResourceParse',
      values: {
        siteName: 'must-not-leak',
        thirdPartyResourceParseApiIntervalMs: 4000,
        thirdPartyResourceParseEnabled: true,
        thirdPartyResourceParseHostCacheTtlSeconds: 120,
        thirdPartyResourceParseImageIntervalMs: 5000,
        thirdPartyResourceParseMaxQueueSize: 300,
      },
    });

    expect(payload).toEqual({
      aliyunConfig: baseConfig.aliyunConfig,
      contentReviewPolicy: baseConfig.contentReviewPolicy,
      id: 1,
      maintenanceConfig: baseConfig.maintenanceConfig,
      operationConfig: baseConfig.operationConfig,
      securityConfig: baseConfig.securityConfig,
      siteConfig: baseConfig.siteConfig,
      thirdPartyResourceParseConfig: {
        apiIntervalMs: 4000,
        enabled: true,
        hostCacheTtlSeconds: 120,
        imageIntervalMs: 5000,
        maxQueueSize: 300,
      },
      uploadConfig: baseConfig.uploadConfig,
    });
  });

  it('defines the third-party resource parse form schema fields', () => {
    expect(
      thirdPartyResourceParseFormSchema.map((item) => item.fieldName),
    ).toEqual([
      'divider_third_party_resource_parse',
      'thirdPartyResourceParseEnabled',
      'thirdPartyResourceParseApiIntervalMs',
      'thirdPartyResourceParseImageIntervalMs',
      'thirdPartyResourceParseHostCacheTtlSeconds',
      'thirdPartyResourceParseMaxQueueSize',
    ]);
  });
});
