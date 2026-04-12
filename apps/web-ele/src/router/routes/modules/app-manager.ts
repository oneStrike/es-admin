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
        name: 'Announcement',
        path: '/app-manager/announcement',
        component: () => import('#/views/app-manager/announcement/index.vue'),
        meta: {
          title: '公告管理',
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
          title: '应用配置',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'AppUpdate',
        path: '/app-manager/app-update',
        component: () => import('#/views/app-manager/app-update/index.vue'),
        meta: {
          title: '版本更新',
          icon: 'codex:dot-circle',
        },
      },
    ],
  },
];

export default routes;
