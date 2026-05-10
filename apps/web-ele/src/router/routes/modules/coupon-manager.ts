import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'CouponDefinition',
    path: '/coupon-manager/definition',
    component: () => import('#/views/coupon-manager/definition/index.vue'),
    meta: {
      title: '券定义',
      order: -2,
      icon: 'icon-park-outline:ticket',
    },
  },
];

export default routes;
