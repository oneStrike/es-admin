<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';

const route = useRoute();
const title = computed(() => String(route.meta.title || '会员管理'));
</script>

<template>
  <Page auto-content-height>
    <div class="p-4">
      <el-card shadow="never" class="mb-4">
        <template #header>{{ title }}</template>
        <div>这里是{{ title }}的占位页面，用于后续功能接入。</div>
      </el-card>
    </div>
  </Page>
</template>

<style scoped></style>
