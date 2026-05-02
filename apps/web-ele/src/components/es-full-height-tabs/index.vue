<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

defineOptions({
  name: 'EsFullHeightTabs',
  inheritAttrs: false,
});

const attrs = useAttrs();

const forwardedAttrs = computed(() => {
  const restAttrs = { ...attrs };
  delete restAttrs.class;
  return restAttrs;
});

const tabsClass = computed(() => ['es-full-height-tabs', attrs.class]);
</script>

<template>
  <el-tabs v-bind="forwardedAttrs" :class="tabsClass">
    <slot></slot>
  </el-tabs>
</template>

<style src="./full-height-tabs.css"></style>
