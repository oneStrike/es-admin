<script setup lang="ts">
import type { ActionItem } from '@vben/common-ui';

import type { EsTableActionProps } from './types';

import { computed } from 'vue';

import { VbenTableAction } from '@vben/common-ui';

const props = withDefaults(defineProps<EsTableActionProps>(), {
  actions: () => [],
  align: 'start',
  divider: true,
  dropdownActions: () => [],
  hasPermission: undefined,
  moreText: undefined,
});

const actions = computed<ActionItem[]>(() => props.actions);
const dropdownActions = computed<ActionItem[]>(() => props.dropdownActions);
</script>

<template>
  <VbenTableAction
    :actions="actions"
    :align="align"
    :divider="divider"
    :dropdown-actions="dropdownActions"
    :has-permission="hasPermission"
    :more-text="moreText"
  />
</template>
