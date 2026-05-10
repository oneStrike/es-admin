<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import PaymentOrderPanel from './components/payment-order-panel.vue';

defineOptions({
  name: 'PaymentOrder',
});
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <PaymentOrderPanel />
  </Page>
</template>
