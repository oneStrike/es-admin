import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'MonetizationManager',
    path: '/monetization-manager',
    meta: {
      title: '变现管理',
      order: -2,
      icon: 'majesticons:creditcard-line',
    },
    children: [
      {
        name: 'MonetizationVipConfig',
        path: '/monetization-manager/vip-config',
        component: () =>
          import('#/views/monetization-manager/vip-config/index.vue'),
        meta: {
          title: 'VIP 配置',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'MonetizationPaymentConfig',
        path: '/monetization-manager/payment-config',
        component: () =>
          import('#/views/monetization-manager/payment-config/index.vue'),
        meta: {
          title: '支付配置',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'MonetizationCurrencyCoupon',
        path: '/monetization-manager/currency-coupon',
        component: () =>
          import('#/views/monetization-manager/currency-coupon/index.vue'),
        meta: {
          title: '虚拟币与券',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'MonetizationAdConfig',
        path: '/monetization-manager/ad-config',
        component: () =>
          import('#/views/monetization-manager/ad-config/index.vue'),
        meta: {
          title: '广告配置',
          icon: 'codex:dot-circle',
        },
      },
    ],
  },
];

export default routes;
