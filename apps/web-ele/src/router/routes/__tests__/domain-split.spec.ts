import type { RouteRecordRaw } from 'vue-router';

import { describe, expect, it } from 'vitest';

import { accessRoutes } from '../index';

type LockedRoute = {
  name: string;
  path: string;
  title: string;
};

const lockedConfigRoutes: LockedRoute[] = [
  {
    name: 'SystemConfig',
    path: '/config-manager/system-config',
    title: '系统配置',
  },
  {
    name: 'PaymentConfig',
    path: '/config-manager/payment-config',
    title: '支付配置',
  },
  {
    name: 'AdConfig',
    path: '/config-manager/ad-config',
    title: '广告配置',
  },
];

const lockedPaymentRightsRoutes: LockedRoute[] = [
  {
    name: 'WalletCurrencyPackage',
    path: '/payment-rights/currency-package',
    title: '虚拟币充值包',
  },
  {
    name: 'CouponDefinition',
    path: '/payment-rights/coupon-definition',
    title: '券定义',
  },
  {
    name: 'PaymentOrder',
    path: '/payment-rights/payment-order',
    title: '支付订单',
  },
  {
    name: 'MembershipManager',
    path: '/payment-rights/membership',
    title: '会员管理',
  },
];

function flattenRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  return routes.flatMap((route) => [
    route,
    ...flattenRoutes(route.children ?? []),
  ]);
}

function findRoute(routeName: string) {
  return flattenRoutes(accessRoutes).find(
    ({ name }) => String(name) === routeName,
  );
}

function getRoute(routeName: string) {
  const route = findRoute(routeName);
  if (!route) {
    throw new Error(`Route ${routeName} is not registered`);
  }

  return route;
}

function childNames(route: RouteRecordRaw) {
  return route.children?.map(({ name }) => String(name)) ?? [];
}

function expectLockedChildRoute(
  parent: RouteRecordRaw,
  expectedRoute: LockedRoute,
) {
  expect(
    parent.children?.find(({ name }) => String(name) === expectedRoute.name),
  ).toEqual(
    expect.objectContaining({
      name: expectedRoute.name,
      path: expectedRoute.path,
      component: expect.any(Function),
      meta: expect.objectContaining({ title: expectedRoute.title }),
    }),
  );
}

async function expectLazyComponent(route: RouteRecordRaw) {
  const component = route.component;
  expect(component).toEqual(expect.any(Function));

  const resolvedComponent = await (component as () => Promise<unknown>)();
  expect(resolvedComponent).toHaveProperty('default');
}

describe('admin IA split routes', () => {
  it('registers config management as a locked three-child route parent', () => {
    const configManager = getRoute('ConfigManager');

    expect(configManager).toEqual(
      expect.objectContaining({
        name: 'ConfigManager',
        path: '/config-manager',
        meta: expect.objectContaining({ title: '配置管理' }),
      }),
    );
    expect(childNames(configManager)).toEqual([
      'SystemConfig',
      'PaymentConfig',
      'AdConfig',
    ]);
    for (const expectedRoute of lockedConfigRoutes) {
      expectLockedChildRoute(configManager, expectedRoute);
    }
  });

  it('registers payment and rights as a locked four-child business parent', () => {
    const paymentRightsManager = getRoute('PaymentRightsManager');

    expect(paymentRightsManager).toEqual(
      expect.objectContaining({
        name: 'PaymentRightsManager',
        path: '/payment-rights',
        meta: expect.objectContaining({ title: '支付与权益' }),
      }),
    );
    expect(childNames(paymentRightsManager)).toEqual([
      'WalletCurrencyPackage',
      'CouponDefinition',
      'PaymentOrder',
      'MembershipManager',
    ]);
    for (const expectedRoute of lockedPaymentRightsRoutes) {
      expectLockedChildRoute(paymentRightsManager, expectedRoute);
    }
  });

  it('keeps system config out of the system manager route tree', () => {
    expect(childNames(getRoute('SystemManager'))).not.toContain('SystemConfig');
  });

  it('removes old first-level route names and paths', () => {
    const routes = flattenRoutes(accessRoutes);

    expect(routes.map(({ name }) => String(name))).not.toEqual(
      expect.arrayContaining([
        'MonetizationManager',
        'PaymentManager',
        'AdRewardManager',
      ]),
    );
    expect(routes.map(({ path }) => path)).not.toEqual(
      expect.arrayContaining([
        '/monetization-manager',
        '/payment-manager',
        '/wallet-manager/currency-package',
        '/coupon-manager/definition',
        '/membership-manager',
        '/ad-reward-manager',
        '/system-manager/system-config',
      ]),
    );
  });

  it('resolves locked lazy route components', async () => {
    await Promise.all(
      [...lockedConfigRoutes, ...lockedPaymentRightsRoutes].map(
        (expectedRoute) => expectLazyComponent(getRoute(expectedRoute.name)),
      ),
    );
  }, 30_000);
});
