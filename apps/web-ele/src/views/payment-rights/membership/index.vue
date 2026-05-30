<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import EsFullHeightTabs from '#/components/es-full-height-tabs';

import VipBenefitPanel from './components/vip-benefit-panel.vue';
import VipPageConfigPanel from './components/vip-page-config-panel.vue';
import VipPlanPanel from './components/vip-plan-panel.vue';

defineOptions({
  name: 'MembershipManager',
});

type TabKey = 'benefit' | 'pageConfig' | 'plan';

const activeTab = ref<TabKey>('plan');
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <EsFullHeightTabs v-model="activeTab" class="es-pill-tabs">
      <el-tab-pane label="套餐" name="plan">
        <VipPlanPanel />
      </el-tab-pane>

      <el-tab-pane label="权益" name="benefit">
        <VipBenefitPanel />
      </el-tab-pane>

      <el-tab-pane label="订阅页配置" name="pageConfig">
        <VipPageConfigPanel />
      </el-tab-pane>
    </EsFullHeightTabs>
  </Page>
</template>
