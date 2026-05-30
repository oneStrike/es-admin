import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'MessageManager',
    path: '/message',
    meta: {
      title: '消息管理',
      order: 7,
      icon: 'lucide:message-square-text',
    },
    children: [
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
    ],
  },
];

export default routes;
