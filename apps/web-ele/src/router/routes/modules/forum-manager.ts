import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: 30,
      title: '论坛管理',
    },
    name: 'Forum',
    path: '/forum',
    children: [
      {
        name: 'ForumTopic',
        path: '/forum/topic',
        component: () => import('#/views/forum/topic/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '帖子管理',
        },
      },
      {
        name: 'ForumModerators',
        path: '/forum/moderators',
        component: () => import('#/views/forum/moderators/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '版主管理',
        },
      },
      {
        name: 'ForumSections',
        path: '/forum/sections',
        component: () => import('#/views/forum/sections/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '板块管理',
        },
      },

      {
        name: 'ForumTags',
        path: '/forum/tags',
        component: () => import('#/views/forum/tags/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '话题管理',
        },
      },
      {
        name: 'ForumSensitiveWord',
        path: '/forum/sensitive-word',
        component: () => import('#/views/forum/sensitive-word/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '敏感词管理',
        },
      },
      {
        name: 'ForumSensitiveWordStatistics',
        path: '/forum/sensitive-word-statistics',
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
