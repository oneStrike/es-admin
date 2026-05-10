import { describe, expect, it } from 'vitest';

import {
  buildPaymentProviderCreatePayload,
  buildPaymentProviderUpdatePayload,
  mapProviderToFormRecord,
  paymentProviderSearchSchema,
} from './provider';

describe('payment provider model', () => {
  it('builds payment provider payloads from whitelisted fields', () => {
    const base = {
      allowedReturnDomainsText: 'example.com\nm.example.com',
      channel: 1,
      configMetadataText: '{"verifySecretEnvKey":"PAY_SECRET"}',
      credentialVersionRef: 'seed://payment/v1',
      environment: 1,
      paymentScene: 1,
      platform: 1,
      supportsAutoRenew: true,
    };

    expect(buildPaymentProviderCreatePayload(base)).toMatchObject({
      allowedReturnDomains: ['example.com', 'm.example.com'],
      channel: 1,
      configMetadata: { verifySecretEnvKey: 'PAY_SECRET' },
      credentialVersionRef: 'seed://payment/v1',
    });
    expect(buildPaymentProviderUpdatePayload({ ...base, id: 2 })).toMatchObject(
      {
        id: 2,
      },
    );
  });

  it('maps persisted provider JSON and derives search fields', () => {
    expect(
      mapProviderToFormRecord({
        allowedReturnDomains: ['example.com'],
        configMetadata: { verifySecretEnvKey: 'PAY_SECRET' },
      } as any),
    ).toMatchObject({
      allowedReturnDomainsText: 'example.com',
      configMetadataText: '{\n  "verifySecretEnvKey": "PAY_SECRET"\n}',
    });
    expect(paymentProviderSearchSchema.map((item) => item.fieldName)).toContain(
      'dateRange',
    );
  });
});
