import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'ConfigManager',
    path: '/config-manager',
    meta: {
      title: '配置管理',
      order: 10,
      icon: 'lucide:sliders-horizontal',
    },
    children: [
      {
        name: 'SystemConfig',
        path: '/config-manager/system-config',
        component: () =>
          import('#/views/config-manager/system-config/index.vue'),
        meta: {
          title: '系统配置',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'PaymentConfig',
        path: '/config-manager/payment-config',
        component: () =>
          import('#/views/config-manager/payment-config/index.vue'),
        meta: {
          title: '支付配置',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'AdConfig',
        path: '/config-manager/ad-config',
        component: () => import('#/views/config-manager/ad-config/index.vue'),
        meta: {
          title: '广告配置',
          icon: 'codex:dot-circle',
        },
      },
    ],
  },
];

export default routes;
