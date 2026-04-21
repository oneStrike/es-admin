<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import CheckInConfigPanel from './components/check-in-config-panel.vue';
import CheckInReconciliationPanel from './components/check-in-reconciliation-panel.vue';
import CheckInStreakPanel from './components/check-in-streak-panel.vue';

defineOptions({
  name: 'CheckInManager',
});

type TabKey = 'config' | 'reconciliation' | 'streak';

const activeTab = ref<TabKey>('config');
</script>

<template>
  <Page auto-content-height title="签到管理">
    <div>
      <el-tabs v-model="activeTab" class="check-in-tabs">
        <el-tab-pane label="基础配置" name="config">
          <CheckInConfigPanel />
        </el-tab-pane>

        <el-tab-pane label="连续签到记录" name="streak">
          <CheckInStreakPanel />
        </el-tab-pane>

        <el-tab-pane label="奖励对账" name="reconciliation">
          <CheckInReconciliationPanel />
        </el-tab-pane>
      </el-tabs>
    </div>
  </Page>
</template>

<style scoped>
:deep(.check-in-tabs .el-tabs__header) {
  margin-bottom: 20px;
}

:deep(.check-in-tabs .el-tabs__item) {
  padding: 0 18px;
  font-weight: 600;
  border-radius: 9999px;
}
</style>
