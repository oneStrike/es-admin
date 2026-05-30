import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'PaymentRightsManager',
    path: '/payment-rights',
    meta: {
      title: '支付与权益',
      order: 6,
      icon: 'majesticons:creditcard-line',
    },
    children: [
      {
        name: 'WalletCurrencyPackage',
        path: '/payment-rights/currency-package',
        component: () =>
          import('#/views/payment-rights/currency-package/index.vue'),
        meta: {
          title: '虚拟币充值包',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'CouponDefinition',
        path: '/payment-rights/coupon-definition',
        component: () =>
          import('#/views/payment-rights/coupon-definition/index.vue'),
        meta: {
          title: '券定义',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'PaymentOrder',
        path: '/payment-rights/payment-order',
        component: () =>
          import('#/views/payment-rights/payment-order/index.vue'),
        meta: {
          title: '支付订单',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'MembershipManager',
        path: '/payment-rights/membership',
        component: () => import('#/views/payment-rights/membership/index.vue'),
        meta: {
          title: '会员管理',
          icon: 'codex:dot-circle',
        },
      },
    ],
  },
];

export default routes;
