import { describe, expect, it } from 'vitest';

import {
  buildVipPageConfigCreatePayload,
  buildVipPageConfigUpdatePayload,
  mapVipPageConfigToFormRecord,
  vipPageConfigSearchSchema,
} from './page-config';

describe('membership page config model', () => {
  it('builds page config payloads with relation ids', () => {
    expect(
      buildVipPageConfigCreatePayload({
        agreementIds: [1],
        isEnabled: true,
        memberNoticeItemsText: '权益一\n权益二',
        planIds: [2, 3],
        title: '会员中心',
      }),
    ).toMatchObject({
      agreementIds: [1],
      memberNoticeItems: ['权益一', '权益二'],
      planIds: [2, 3],
      title: '会员中心',
    });
    expect(
      buildVipPageConfigUpdatePayload({
        id: 5,
        title: '会员中心',
      }),
    ).toMatchObject({ id: 5, title: '会员中心' });
  });

  it('maps relation snapshots and derives search fields', () => {
    expect(
      mapVipPageConfigToFormRecord({
        agreements: [{ id: 1 }],
        memberNoticeItems: ['权益一'],
        plans: [{ id: 2 }],
      } as any),
    ).toMatchObject({
      agreementIds: [1],
      memberNoticeItemsText: '权益一',
      planIds: [2],
    });
    expect(vipPageConfigSearchSchema.map((item) => item.fieldName)).toContain(
      'dateRange',
    );
  });
});
