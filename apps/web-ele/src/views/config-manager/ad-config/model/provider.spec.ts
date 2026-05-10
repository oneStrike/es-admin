import { describe, expect, it } from 'vitest';

import {
  adProviderSearchSchema,
  buildAdProviderCreatePayload,
  buildAdProviderUpdatePayload,
  mapAdProviderToFormRecord,
} from './provider';

describe('ad reward provider model', () => {
  it('builds ad-reward provider payloads from whitelisted fields', () => {
    const base = {
      configMetadataText: '{"verifySecretEnvKey":"AD_SECRET"}',
      credentialVersionRef: 'seed://ad/pangle/v1',
      environment: 1,
      placementKey: 'reward-low-price',
      platform: 1,
      provider: 1,
      targetScope: 1,
    };

    expect(buildAdProviderCreatePayload(base)).toMatchObject({
      configMetadata: { verifySecretEnvKey: 'AD_SECRET' },
      credentialVersionRef: 'seed://ad/pangle/v1',
      placementKey: 'reward-low-price',
    });
    expect(buildAdProviderUpdatePayload({ ...base, id: 4 })).toMatchObject({
      id: 4,
    });
  });

  it('maps persisted provider metadata and derives search fields', () => {
    expect(
      mapAdProviderToFormRecord({
        configMetadata: { verifySecretEnvKey: 'AD_SECRET' },
      } as any),
    ).toMatchObject({
      configMetadataText: '{\n  "verifySecretEnvKey": "AD_SECRET"\n}',
    });
    expect(adProviderSearchSchema.map((item) => item.fieldName)).toContain(
      'dateRange',
    );
  });
});
