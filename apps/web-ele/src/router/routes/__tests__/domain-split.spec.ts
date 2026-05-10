import { describe, expect, it } from 'vitest';

import { accessRoutes } from '../index';

const expectedDomainRoutes = [
  {
    name: 'WalletCurrencyPackage',
    path: '/wallet-manager/currency-package',
    title: '虚拟币充值包',
  },
  {
    name: 'CouponDefinition',
    path: '/coupon-manager/definition',
    title: '券定义',
  },
  {
    name: 'PaymentManager',
    path: '/payment-manager',
    title: '支付管理',
  },
  {
    name: 'MembershipManager',
    path: '/membership-manager',
    title: '会员管理',
  },
  {
    name: 'AdRewardManager',
    path: '/ad-reward-manager',
    title: '广告激励',
  },
] as const;

describe('monetization domain split routes', () => {
  it('removes the old monetization manager route shell', () => {
    expect(
      accessRoutes.some(({ name }) => name === 'MonetizationManager'),
    ).toBe(false);
  });

  it('registers locked domain route names, paths, titles, and components', () => {
    for (const expectedRoute of expectedDomainRoutes) {
      expect(
        accessRoutes.find(({ name }) => name === expectedRoute.name),
      ).toEqual(
        expect.objectContaining({
          name: expectedRoute.name,
          path: expectedRoute.path,
          component: expect.any(Function),
          meta: expect.objectContaining({ title: expectedRoute.title }),
        }),
      );
    }
  });
});
