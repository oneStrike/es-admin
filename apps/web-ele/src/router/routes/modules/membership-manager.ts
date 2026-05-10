import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'MembershipManager',
    path: '/membership-manager',
    component: () => import('#/views/membership-manager/index.vue'),
    meta: {
      title: '会员管理',
      order: -2,
      icon: 'mdi:crown-outline',
    },
  },
];

export default routes;
