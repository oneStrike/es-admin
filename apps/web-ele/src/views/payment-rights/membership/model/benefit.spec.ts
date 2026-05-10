import { describe, expect, it } from 'vitest';

import {
  buildVipBenefitCreatePayload,
  buildVipBenefitUpdatePayload,
  vipBenefitSearchSchema,
} from './benefit';

describe('membership benefit model', () => {
  it('builds membership benefit payloads', () => {
    expect(
      buildVipBenefitCreatePayload({
        benefitType: 1,
        description: '展示权益',
        isEnabled: true,
        name: '会员标识',
      }),
    ).toMatchObject({ benefitType: 1, name: '会员标识' });
    expect(
      buildVipBenefitUpdatePayload({
        benefitType: 1,
        id: 6,
        name: '会员标识',
      }),
    ).toMatchObject({ id: 6, name: '会员标识' });
    expect(vipBenefitSearchSchema.map((item) => item.fieldName)).toContain(
      'dateRange',
    );
  });
});
