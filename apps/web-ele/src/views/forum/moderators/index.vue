<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import EsFullHeightTabs from '#/components/es-full-height-tabs';

import ModeratorApplicationPanel from './components/moderator-application-panel.vue';
import ModeratorListPanel from './components/moderator-list-panel.vue';

defineOptions({
  name: 'ForumModerators',
});

type ModeratorTab = 'applications' | 'moderators';

const route = useRoute();
const router = useRouter();

function resolveModeratorTab(tab: unknown): ModeratorTab {
  return tab === 'applications' ? 'applications' : 'moderators';
}

const activeTab = ref<ModeratorTab>(resolveModeratorTab(route.query.tab));
const moderatorListRef = ref<{ reload: () => Promise<void> }>();

watch(
  () => route.query.tab,
  (tab) => {
    activeTab.value = resolveModeratorTab(tab);
  },
);

async function handleTabChange(tab: number | string) {
  const nextTab = resolveModeratorTab(tab);

  await router.replace({
    query: {
      ...route.query,
      tab: nextTab === 'applications' ? nextTab : undefined,
    },
  });
}

async function handleApplicationApproved() {
  await moderatorListRef.value?.reload();
}
</script>

<template>
  <Page
    auto-content-height
    content-class="es-full-height-page-content"
    title="版主管理"
  >
    <EsFullHeightTabs
      v-model="activeTab"
      class="es-pill-tabs"
      @tab-change="handleTabChange"
    >
      <el-tab-pane label="版主列表" name="moderators">
        <ModeratorListPanel ref="moderatorListRef" />
      </el-tab-pane>

      <el-tab-pane label="申请审核" name="applications">
        <ModeratorApplicationPanel @approved="handleApplicationApproved" />
      </el-tab-pane>
    </EsFullHeightTabs>
  </Page>
</template>

<style scoped></style>
