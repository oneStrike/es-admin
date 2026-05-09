<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import EsFullHeightTabs from '#/components/es-full-height-tabs';

import PaymentOrderPanel from './components/payment-order-panel.vue';
import PaymentProviderPanel from './components/payment-provider-panel.vue';

defineOptions({
  name: 'MonetizationPaymentConfig',
});

type TabKey = 'order' | 'provider';

const activeTab = ref<TabKey>('provider');
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <EsFullHeightTabs v-model="activeTab" class="es-pill-tabs">
      <el-tab-pane label="Provider 配置" name="provider">
        <PaymentProviderPanel />
      </el-tab-pane>

      <el-tab-pane label="支付订单" name="order">
        <PaymentOrderPanel />
      </el-tab-pane>
    </EsFullHeightTabs>
  </Page>
</template>
