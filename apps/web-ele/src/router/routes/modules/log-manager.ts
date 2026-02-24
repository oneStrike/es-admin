import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'LogManager',
    path: '/system-manager/log-manager',
    meta: {
      order: 999,
      title: '日志管理',
      icon: 'majesticons:list-box-line',
    },
    children: [
      {
        name: 'LoginLog',
        path: '/system-manager/log-manager/login-log',
        component: () =>
          import('#/views/system-manager/log-manager/login-log/index.vue'),
        meta: {
          title: '登录日志',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'OperationLog',
        path: '/system-manager/log-manager/operation-log',
        component: () =>
          import('#/views/system-manager/log-manager/operation-log/index.vue'),
        meta: {
          title: '操作日志',
          icon: 'codex:dot-circle',
        },
      },
    ],
  },
];

export default routes;
