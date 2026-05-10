import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'PaymentManager',
    path: '/payment-manager',
    component: () => import('#/views/payment-manager/index.vue'),
    meta: {
      title: '支付管理',
      order: -2,
      icon: 'mdi:credit-card-check-outline',
    },
  },
];

export default routes;
