import { describe, expect, it } from 'vitest';

import {
  buildPaymentOrderConfirmPayload,
  canConfirmPaymentOrder,
  formatJsonTextarea,
  mapPaymentOrderToConfirmRecord,
} from './order';

describe('payment order model', () => {
  it('allows payment confirmation only for pending orders', () => {
    expect(canConfirmPaymentOrder({ status: 1 })).toBe(true);
    expect(canConfirmPaymentOrder({ status: 2 })).toBe(false);
    expect(canConfirmPaymentOrder({ status: 3 })).toBe(false);
    expect(canConfirmPaymentOrder({ status: 4 })).toBe(false);
    expect(canConfirmPaymentOrder({ status: 5 })).toBe(false);
  });

  it('keeps missing notify payload as empty text for manual settlement', () => {
    expect(formatJsonTextarea(undefined)).toBe('');
    expect(formatJsonTextarea(null)).toBe('');
    const rowWithClientPayload = {
      clientPayPayload: { clientSecret: 'client-only' },
      orderNo: 'ORDER-1',
      payableAmount: 100,
    };

    expect(mapPaymentOrderToConfirmRecord(rowWithClientPayload)).toEqual({
      notifyPayloadText: '',
      orderNo: 'ORDER-1',
      paidAmount: 100,
    });

    expect(
      buildPaymentOrderConfirmPayload({
        notifyPayloadText: '',
        orderNo: 'ORDER-1',
        paidAmount: 100,
        providerTradeNo: 'TRADE-1',
      }),
    ).toMatchObject({
      notifyPayload: null,
      orderNo: 'ORDER-1',
      paidAmount: 100,
      providerTradeNo: 'TRADE-1',
    });
  });

  it('accepts JSON object notify payload and rejects arrays', () => {
    expect(
      buildPaymentOrderConfirmPayload({
        notifyPayloadText: '{"tradeNo":"T1"}',
        orderNo: 'ORDER-1',
      }).notifyPayload,
    ).toEqual({ tradeNo: 'T1' });

    expect(() =>
      buildPaymentOrderConfirmPayload({
        notifyPayloadText: '[]',
        orderNo: 'ORDER-1',
      }),
    ).toThrow('原始通知 payload必须是合法 JSON 对象');
  });
});
