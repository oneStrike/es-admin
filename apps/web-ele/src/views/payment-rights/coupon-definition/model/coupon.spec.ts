import { describe, expect, it } from 'vitest';

import {
  buildCouponCreatePayload,
  buildCouponGrantPayload,
  buildCouponUpdatePayload,
  couponSearchSchema,
} from './coupon';

describe('coupon definition model', () => {
  it('builds whitelisted coupon definition and grant payloads', () => {
    expect(
      buildCouponCreatePayload({
        configPayloadText: '{"channel":"admin"}',
        couponType: 1,
        isEnabled: true,
        name: '阅读券',
        targetScope: 1,
        usageLimit: 1,
        validDays: 30,
      }),
    ).toMatchObject({
      configPayload: { channel: 'admin' },
      couponType: 1,
      name: '阅读券',
      targetScope: 1,
    });
    expect(
      buildCouponUpdatePayload({
        couponType: 1,
        id: 3,
        name: '阅读券',
        targetScope: 1,
      }),
    ).toMatchObject({ id: 3, name: '阅读券' });
    expect(
      buildCouponGrantPayload({
        couponDefinitionId: 3,
        userId: 8,
      }),
    ).toEqual({
      couponDefinitionId: 3,
      sourceId: null,
      sourceType: 3,
      userId: 8,
    });
  });

  it('keeps query schema and rejects invalid JSON payloads', () => {
    expect(couponSearchSchema.map((item) => item.fieldName)).toContain(
      'dateRange',
    );
    expect(() =>
      buildCouponCreatePayload({
        configPayloadText: '[]',
        couponType: 1,
        name: '阅读券',
        targetScope: 1,
      }),
    ).toThrow('额外配置快照必须是合法 JSON 对象');
  });
});
