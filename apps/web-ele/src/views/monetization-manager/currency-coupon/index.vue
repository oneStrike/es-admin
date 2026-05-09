<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import EsFullHeightTabs from '#/components/es-full-height-tabs';

import CouponDefinitionPanel from './components/coupon-definition-panel.vue';
import CurrencyPackagePanel from './components/currency-package-panel.vue';

defineOptions({
  name: 'MonetizationCurrencyCoupon',
});

type TabKey = 'coupon' | 'currency';

const activeTab = ref<TabKey>('currency');
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <EsFullHeightTabs v-model="activeTab" class="es-pill-tabs">
      <el-tab-pane label="充值包" name="currency">
        <CurrencyPackagePanel />
      </el-tab-pane>

      <el-tab-pane label="券定义" name="coupon">
        <CouponDefinitionPanel />
      </el-tab-pane>
    </EsFullHeightTabs>
  </Page>
</template>
