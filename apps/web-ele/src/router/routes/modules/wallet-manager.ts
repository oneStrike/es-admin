import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'WalletCurrencyPackage',
    path: '/wallet-manager/currency-package',
    component: () =>
      import('#/views/wallet-manager/currency-package/index.vue'),
    meta: {
      title: '虚拟币充值包',
      order: -2,
      icon: 'majesticons:creditcard-line',
    },
  },
];

export default routes;
