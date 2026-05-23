import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'SystemManager',
    path: '/system-manager',
    meta: {
      title: '系统管理',
      order: 80,
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
        name: 'SystemAccountManager',
        path: '/system-manager/accounts',
        component: () =>
          import('#/views/system-manager/account-manager/index.vue'),
        meta: {
          title: '后台账号',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'LogManager',
        path: '/system-manager/log-manager',
        meta: {
          title: '日志管理',
          icon: 'codex:dot-circle',
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
