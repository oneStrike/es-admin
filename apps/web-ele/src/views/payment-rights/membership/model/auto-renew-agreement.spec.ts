import { describe, expect, it } from 'vitest';

import {
  autoRenewAgreementSearchSchema,
  buildAutoRenewAgreementCancellationPayload,
  getAutoRenewAgreementDetailCards,
} from './auto-renew-agreement';

describe('membership auto-renew agreement model', () => {
  it('builds cancellation payload and exposes search/detail model', () => {
    expect(
      buildAutoRenewAgreementCancellationPayload({ id: 8 } as any),
    ).toEqual({
      id: 8,
    });
    expect(
      autoRenewAgreementSearchSchema.map((item) => item.fieldName),
    ).toContain('dateRange');
    expect(
      getAutoRenewAgreementDetailCards({
        agreementNo: 'AGR-1',
        channel: 1,
        environment: 1,
        paymentScene: 1,
        platform: 1,
        status: 1,
      } as any),
    ).toEqual(expect.any(Array));
  });
});
