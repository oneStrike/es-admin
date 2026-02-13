import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: 997,
      title: '综合管理',
    },
    name: 'ComprehensiveManager',
    path: '/comprehensive-manager',
    children: [
      {
        name: 'ForumReports',
        path: '/comprehensive-manager/reports',
        component: () => import('#/views/forum/reports/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '举报管理',
        },
      },
      {
        name: 'ForumSensitiveWord',
        path: '/comprehensive-manager/sensitive-word',
        component: () => import('#/views/forum/sensitive-word/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '敏感词管理',
        },
      },
      {
        name: 'ForumSensitiveWordStatistics',
        path: '/comprehensive-manager/sensitive-word-statistics',
        component: () =>
          import('#/views/forum/sensitive-word-statistics/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '敏感词统计',
        },
      },
    ],
  },
];

export default routes;
