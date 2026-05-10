import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'AdRewardManager',
    path: '/ad-reward-manager',
    component: () => import('#/views/ad-reward-manager/index.vue'),
    meta: {
      title: '广告激励',
      order: -2,
      icon: 'lucide:badge-percent',
    },
  },
];

export default routes;
