<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import CouponDefinitionPanel from './components/coupon-definition-panel.vue';

defineOptions({
  name: 'CouponDefinition',
});
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <CouponDefinitionPanel />
  </Page>
</template>
