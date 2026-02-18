import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: 2,
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
        name: 'ForumSystemConfig',
        path: '/forum/system-config',
        component: () => import('#/views/forum/system-config/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '系统配置',
        },
      },
    ],
  },
];

export default routes;
