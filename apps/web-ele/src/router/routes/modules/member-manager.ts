import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'MemberManager',
    path: '/member-manager',
    meta: {
      title: '会员管理',
      order: 3,
      icon: 'majesticons:users-line',
    },
    children: [
      {
        name: 'MemberLevel',
        path: '/member-manager/member-level',
        component: () =>
          import('#/views/member-manager/member-level/index.vue'),
        meta: {
          title: '会员等级管理',
          icon: 'codex:dot-circle',
        },
      },
    ],
  },
];

export default routes;
