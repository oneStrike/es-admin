<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import CurrencyPackagePanel from './components/currency-package-panel.vue';

defineOptions({
  name: 'WalletCurrencyPackage',
});
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <CurrencyPackagePanel />
  </Page>
</template>
