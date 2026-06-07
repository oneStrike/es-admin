<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import EsFullHeightTabs from '#/components/es-full-height-tabs';

import TaskDefinitionPanel from './components/task-definition-panel.vue';
import TaskEventFailurePanel from './components/task-event-failure-panel.vue';
import TaskInstancePanel from './components/task-instance-panel.vue';
import TaskReconciliationPanel from './components/task-reconciliation-panel.vue';

defineOptions({
  name: 'TaskManager',
});

type TabKey = 'definition' | 'eventFailure' | 'instance' | 'reconciliation';

const activeTab = ref<TabKey>('definition');
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <EsFullHeightTabs v-model="activeTab" class="es-pill-tabs">
      <el-tab-pane label="任务定义" name="definition">
        <TaskDefinitionPanel />
      </el-tab-pane>

      <el-tab-pane label="任务实例" name="instance">
        <TaskInstancePanel />
      </el-tab-pane>

      <el-tab-pane label="奖励对账" name="reconciliation">
        <TaskReconciliationPanel />
      </el-tab-pane>

      <el-tab-pane label="事件失败" name="eventFailure">
        <TaskEventFailurePanel />
      </el-tab-pane>
    </EsFullHeightTabs>
  </Page>
</template>
