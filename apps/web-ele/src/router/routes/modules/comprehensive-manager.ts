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
        name: 'EmojiManager',
        path: '/comprehensive-manager/emoji-manager',
        component: () =>
          import('#/views/comprehensive-manager/emoji-manager/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '表情管理',
        },
      },
      {
        name: 'MessageNotificationTemplates',
        path: '/message/notification-templates',
        component: () =>
          import('#/views/message/notification-templates/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '通知模板',
        },
      },
      {
        name: 'MessageMonitor',
        path: '/message/monitor',
        component: () => import('#/views/message/monitor/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '消息运行',
        },
      },
      {
        name: 'ForumReports',
        path: '/forum/reports',
        component: () => import('#/views/forum/reports/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '举报管理',
        },
      },
      {
        name: 'ForumComments',
        path: '/forum/comments',
        component: () => import('#/views/forum/comments/index.vue'),
        meta: {
          icon: 'codex:dot-circle',
          title: '评论管理',
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
