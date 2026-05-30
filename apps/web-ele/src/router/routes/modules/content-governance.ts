import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'ContentGovernance',
    path: '/content-governance',
    meta: {
      title: '内容治理',
      order: 3,
      icon: 'lucide:shield-check',
    },
    children: [
      {
        name: 'ContentGovernanceReports',
        path: '/content-governance/reports',
        component: () => import('#/views/content-governance/reports/index.vue'),
        meta: {
          title: '举报处理',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'ContentGovernanceComments',
        path: '/content-governance/comments',
        component: () =>
          import('#/views/content-governance/comments/index.vue'),
        meta: {
          title: '评论处理',
          icon: 'codex:dot-circle',
        },
      },
    ],
  },
];

export default routes;
