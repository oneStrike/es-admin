import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '论坛管理',
    },
    name: 'Forum',
    path: '/forum',
    children: [
      {
        name: 'ForumSystemConfig',
        path: '/system-config',
        component: () => import('#/views/forum/system-config/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '系统配置',
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
          title: '等级规则管理',
        },
      },
      {
        name: 'ForumModerators',
        path: '/moderators',
        component: () => import('#/views/forum/moderators/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '版主管理',
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
        name: 'ForumReports',
        path: '/reports',
        component: () => import('#/views/forum/reports/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '举报管理',
        },
      },
      {
        name: 'ForumSections',
        path: '/sections',
        component: () => import('#/views/forum/sections/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '板块管理',
        },
      },
      {
        name: 'ForumSensitiveWord',
        path: '/sensitive-word',
        component: () => import('#/views/forum/sensitive-word/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '敏感词管理',
        },
      },
      {
        name: 'ForumSensitiveWordStatistics',
        path: '/sensitive-word-statistics',
        component: () =>
          import('#/views/forum/sensitive-word-statistics/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '敏感词统计',
        },
      },
      {
        name: 'ForumStatistics',
        path: '/statistics',
        component: () => import('#/views/forum/statistics/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '统计管理',
        },
      },
      {
        name: 'ForumTags',
        path: '/tags',
        component: () => import('#/views/forum/tags/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '标签管理',
        },
      },
      {
        name: 'ForumTopic',
        path: '/topic',
        component: () => import('#/views/forum/topic/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '主题管理',
        },
      },
    ],
  },
];

export default routes;
