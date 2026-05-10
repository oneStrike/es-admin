<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import AdProviderPanel from './components/ad-provider-panel.vue';

defineOptions({
  name: 'AdConfig',
});
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <AdProviderPanel />
  </Page>
</template>
