import type { BaseSystemConfigDto } from '#/api/types';

import { describe, expect, it } from 'vitest';

import {
  buildSystemConfigFormValues,
  buildSystemConfigUpdatePayload,
} from './system-config';

const baseConfig: BaseSystemConfigDto = {
  createdAt: '2026-05-10T00:00:00.000Z',
  id: 1,
  updatedAt: '2026-05-10T00:00:00.000Z',
};

describe('system config model', () => {
  it('maps section snapshots to form values', () => {
    expect(
      buildSystemConfigFormValues('site', {
        ...baseConfig,
        siteConfig: {
          contactEmail: 'ops@example.com',
          siteName: 'ES',
        },
      }),
    ).toMatchObject({
      contactEmail: 'ops@example.com',
      siteName: 'ES',
    });
  });

  it('builds encrypted aliyun update payload from whitelisted fields', () => {
    expect(
      buildSystemConfigUpdatePayload({
        currentConfig: {
          ...baseConfig,
          aliyunConfig: {
            accessKeyId: 'old-id',
            accessKeySecret: 'old-secret',
            sms: { endpoint: 'old-endpoint' },
          },
        },
        encryptSecret: (value) => `encrypted:${value}`,
        menuKey: 'aliyun',
        values: {
          accessKeyId: 'new-id',
          smsEndpoint: 'new-endpoint',
          smsVerifyCodeExpire: 120,
          smsVerifyCodeLength: 6,
        },
      }).aliyunConfig,
    ).toMatchObject({
      accessKeyId: 'encrypted:new-id',
      accessKeySecret: 'old-secret',
      sms: {
        endpoint: 'new-endpoint',
        verifyCodeExpire: 120,
        verifyCodeLength: 6,
      },
    });
  });

  it('builds upload provider payload without leaking inactive secrets', () => {
    expect(
      buildSystemConfigUpdatePayload({
        currentConfig: {
          ...baseConfig,
          uploadConfig: {
            provider: 'local',
            qiniu: { accessKey: 'old-ak', secretKey: 'old-sk' },
          },
        },
        encryptSecret: (value) => `encrypted:${value}`,
        menuKey: 'upload',
        values: {
          qiniuAccessKey: 'new-ak',
          qiniuBucket: 'bucket',
          qiniuUseHttps: true,
          uploadProvider: 'qiniu',
        },
      }).uploadConfig,
    ).toMatchObject({
      provider: 'qiniu',
      qiniu: {
        accessKey: 'encrypted:new-ak',
        bucket: 'bucket',
        secretKey: 'old-sk',
        useHttps: true,
      },
      superbedNonImageFallbackToLocal: false,
    });
  });
});
