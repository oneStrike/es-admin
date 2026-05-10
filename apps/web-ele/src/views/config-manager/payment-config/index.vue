<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import PaymentProviderPanel from './components/payment-provider-panel.vue';

defineOptions({
  name: 'PaymentConfig',
});
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <PaymentProviderPanel />
  </Page>
</template>
