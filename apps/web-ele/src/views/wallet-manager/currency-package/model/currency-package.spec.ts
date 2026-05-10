import { describe, expect, it } from 'vitest';

import {
  buildCurrencyPackageCreatePayload,
  buildCurrencyPackageUpdatePayload,
  currencyPackageSearchSchema,
} from './currency-package';

describe('currency package model', () => {
  it('builds whitelisted wallet payloads', () => {
    expect(
      buildCurrencyPackageCreatePayload({
        bonusAmount: 10,
        currencyAmount: 100,
        isEnabled: true,
        name: '100 阅读币',
        packageKey: 'coin_100',
        price: 100,
        sortOrder: 1,
      }),
    ).toEqual({
      bonusAmount: 10,
      currencyAmount: 100,
      isEnabled: true,
      name: '100 阅读币',
      packageKey: 'coin_100',
      price: 100,
      sortOrder: 1,
    });

    expect(
      buildCurrencyPackageUpdatePayload({
        currencyAmount: 100,
        id: 9,
        name: '100 阅读币',
        packageKey: 'coin_100',
        price: 100,
      }),
    ).toMatchObject({ id: 9, packageKey: 'coin_100' });
  });

  it('derives search schema for pagination filters', () => {
    expect(currencyPackageSearchSchema.map((item) => item.fieldName)).toContain(
      'dateRange',
    );
  });
});
