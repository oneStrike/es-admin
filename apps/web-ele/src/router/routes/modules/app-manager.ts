import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'AppManager',
    path: '/app-manager',
    meta: {
      title: 'APP管理',
      order: 996,
      icon: 'majesticons:device-mobile-line',
    },
    children: [
      {
        name: 'Notice',
        path: '/app-manager/notice',
        component: () => import('#/views/app-manager/notice/index.vue'),
        meta: {
          title: '通知公告',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'Agreement',
        path: '/app-manager/agreement',
        component: () => import('#/views/app-manager/agreement/index.vue'),
        meta: {
          title: '协议管理',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'PageManager',
        path: '/app-manager/page-manager',
        component: () => import('#/views/app-manager/page-manager/index.vue'),
        meta: {
          title: '页面配置',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'AppConfig',
        path: '/app-manager/app-config',
        component: () => import('#/views/app-manager/app-config/index.vue'),
        meta: {
          title: '系统配置',
          icon: 'codex:dot-circle',
        },
      },
    ],
  },
];

export default routes;
