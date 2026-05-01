<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import TaskDefinitionPanel from './components/task-definition-panel.vue';
import TaskInstancePanel from './components/task-instance-panel.vue';
import TaskReconciliationPanel from './components/task-reconciliation-panel.vue';

import '../styles/full-height-tabs.css';

defineOptions({
  name: 'TaskManager',
});

type TabKey = 'definition' | 'instance' | 'reconciliation';

const activeTab = ref<TabKey>('definition');
</script>

<template>
  <Page
    auto-content-height
    content-class="user-manager-page-content"
    title="任务管理"
  >
    <el-tabs
      v-model="activeTab"
      class="user-manager-full-height-tabs task-manager-tabs"
    >
      <el-tab-pane label="任务定义" name="definition">
        <TaskDefinitionPanel />
      </el-tab-pane>

      <el-tab-pane label="任务实例" name="instance">
        <TaskInstancePanel />
      </el-tab-pane>

      <el-tab-pane label="奖励对账" name="reconciliation">
        <TaskReconciliationPanel />
      </el-tab-pane>
    </el-tabs>
  </Page>
</template>
