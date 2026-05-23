import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: 60,
      title: '统计管理',
    },
    name: 'StatisticsManager',
    path: '/statistics',
    children: [
      {
        name: 'ComicStatistics',
        path: '/statistics/comic',
        component: () => import('#/views/statistics/comic/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: '漫画统计',
        },
      },
      {
        name: 'NovelStatistics',
        path: '/statistics/novel',
        component: () => import('#/views/statistics/novel/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: '小说统计',
        },
      },
      {
        name: 'ForumStatistics',
        path: '/statistics/forum',
        component: () => import('#/views/statistics/forum/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: '论坛统计',
        },
      },
    ],
  },
];

export default routes;
