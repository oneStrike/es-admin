import { describe, expect, it } from 'vitest';

import {
  buildVipPlanCreatePayload,
  buildVipPlanUpdatePayload,
  mapVipPlanToFormRecord,
  vipPlanSearchSchema,
} from './plan';

describe('membership plan model', () => {
  it('builds membership plan payloads with benefit input whitelist', () => {
    const base = {
      autoRenewEnabled: true,
      benefitIds: [9],
      benefitRows: [
        {
          benefitId: 9,
          benefitValue: { couponDefinitionId: 3, grantCount: 1, validDays: 30 },
          grantPolicy: 2,
          isEnabled: true,
          sortOrder: 1,
        },
      ],
      durationDays: 30,
      isEnabled: true,
      name: '月度 VIP',
      priceAmount: 1800,
      tier: 1,
    };

    expect(buildVipPlanCreatePayload(base as any)).toMatchObject({
      benefits: [
        expect.objectContaining({
          benefitId: 9,
          grantPolicy: 2,
        }),
      ],
      name: '月度 VIP',
    });
    expect(buildVipPlanUpdatePayload({ ...base, id: 4 } as any)).toMatchObject({
      id: 4,
    });
  });

  it('maps persisted benefits and derives search fields', () => {
    expect(
      mapVipPlanToFormRecord({
        benefits: [{ benefitId: 1, grantPolicy: 1 }],
      } as any),
    ).toMatchObject({
      benefitRows: [expect.objectContaining({ benefitId: 1 })],
    });
    expect(vipPlanSearchSchema.map((item) => item.fieldName)).toContain(
      'dateRange',
    );
  });
});
