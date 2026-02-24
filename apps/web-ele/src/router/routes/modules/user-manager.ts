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
        name: 'UserProfile',
        path: '/user-manager/profile',
        component: () => import('#/views/user-manager/profile/index.vue'),
        meta: {
          title: '用户信息',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'UserMembers',
        path: '/system-manager/members',
        component: () => import('#/views/system-manager/members/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '会员管理',
        },
      },
      {
        name: 'UserCheckIn',
        path: '/system-manager/check-in',
        component: () => import('#/views/system-manager/check-in/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '签到管理',
        },
      },
      {
        name: 'UserTasks',
        path: '/system-manager/tasks',
        component: () => import('#/views/system-manager/tasks/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '任务管理',
        },
      },
      {
        name: 'UserGrowthPoints',
        path: '/user-growth/points',
        component: () => import('#/views/user-growth/points/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '积分管理',
        },
      },
      {
        name: 'UserGrowthExperience',
        path: '/user-growth/experience',
        component: () => import('#/views/user-growth/experience/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '经验管理',
        },
      },
      {
        name: 'UserGrowthLevelRules',
        path: '/user-growth/level-rules',
        component: () => import('#/views/user-growth/level-rules/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '等级管理',
        },
      },
      {
        name: 'UserGrowthBadges',
        path: '/user-growth/badges',
        component: () => import('#/views/user-growth/badges/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '徽章管理',
        },
      },
    ],
  },
];
export default routes;
