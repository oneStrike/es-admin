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
        path: '/user-manager/members',
        component: () => import('#/views/user-manager/members/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '会员管理',
        },
      },
      {
        name: 'UserCheckIn',
        path: '/user-manager/check-in',
        component: () => import('#/views/user-manager/check-in/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '签到管理',
        },
      },
      {
        name: 'UserTasks',
        path: '/user-manager/tasks',
        component: () => import('#/views/user-manager/tasks/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '任务管理',
        },
      },
      {
        name: 'UserGrowthPoints',
        path: '/user-manager/growth/points',
        component: () => import('#/views/user-manager/growth/points/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '积分管理',
        },
      },
      {
        name: 'UserGrowthExperience',
        path: '/user-manager/growth/experience',
        component: () =>
          import('#/views/user-manager/growth/experience/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '经验管理',
        },
      },
      {
        name: 'UserGrowthLevelRules',
        path: '/user-manager/growth/level-rules',
        component: () =>
          import('#/views/user-manager/growth/level-rules/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '等级管理',
        },
      },
      {
        name: 'UserGrowthBadges',
        path: '/user-manager/growth/badges',
        component: () => import('#/views/user-manager/growth/badges/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '徽章管理',
        },
      },
      {
        name: 'UserGrowthOperations',
        path: '/user-manager/growth/operations',
        component: () =>
          import('#/views/user-manager/growth/operations/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '成长运营',
        },
      },
    ],
  },
];
export default routes;
