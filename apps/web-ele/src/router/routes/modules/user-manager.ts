import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'UserManager',
    path: '/user-manager',
    meta: {
      title: '用户管理',
      order: -1,
      icon: 'majesticons:user-line',
    },
    children: [
      {
        name: 'Profile',
        path: '/profile',
        component: () => import('#/views/system-manager/profile/index.vue'),
        meta: {
          title: '用户信息',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'ForumReports',
        path: '/reports',
        component: () => import('#/views/forum/reports/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '会员管理',
        },
      },
      {
        name: 'ForumReports',
        path: '/reports',
        component: () => import('#/views/forum/reports/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '签到管理',
        },
      },
      {
        name: 'ForumReports',
        path: '/reports',
        component: () => import('#/views/forum/reports/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '任务管理',
        },
      },
      {
        name: 'ForumPoints',
        path: '/points',
        component: () => import('#/views/forum/points/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '积分管理',
        },
      },
      {
        name: 'ForumExperience',
        path: '/experience',
        component: () => import('#/views/forum/experience/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '经验管理',
        },
      },
      {
        name: 'ForumLevelRules',
        path: '/level-rules',
        component: () => import('#/views/forum/level-rules/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '等级管理',
        },
      },
      {
        name: 'ForumBadges',
        path: '/badges',
        component: () => import('#/views/forum/badges/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '徽章管理',
        },
      },
    ],
  },
];
export default routes;
