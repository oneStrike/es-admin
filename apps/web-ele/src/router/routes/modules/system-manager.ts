import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'SystemManager',
    path: '/system-manager',
    meta: {
      title: '系统管理',
      order: 998,
      icon: 'majesticons:cog-line',
    },
    children: [
      {
        name: 'Profile',
        path: '/system-manager/profile',
        component: () => import('#/views/system-manager/profile/index.vue'),
        meta: {
          title: '个人中心',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'DataDictionary',
        path: '/system-manager/data-dictionary',
        component: () =>
          import('#/views/system-manager/data-dictionary/index.vue'),
        meta: {
          title: '数据字典',
          icon: 'codex:dot-circle',
        },
      },

      {
        name: 'SystemUserManager',
        path: '/system-manager/user-manager',
        component: () =>
          import('#/views/system-manager/user-manager/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'ServerStatus',
        path: '/system-manager/server-status',
        component: () =>
          import('#/views/system-manager/server-status/index.vue'),
        meta: {
          title: '系统状态',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'WorkflowManager',
        path: '/system-manager/workflow',
        component: () => import('#/views/system-manager/workflow/index.vue'),
        meta: {
          title: '工作流任务',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'IpGeolocationManager',
        path: '/system-manager/ip-geolocation',
        component: () =>
          import('#/views/system-manager/ip-geolocation/index.vue'),
        meta: {
          title: 'IP 属地库',
          icon: 'codex:dot-circle',
        },
      },
    ],
  },
];

export default routes;
