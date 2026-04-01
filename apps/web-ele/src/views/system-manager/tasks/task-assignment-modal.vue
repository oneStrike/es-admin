<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdminTaskAssignmentPageResponseDto,
  AdminTaskPageResponseDto,
} from '#/api/types';

import { useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import { taskAssignmentPageApi } from '#/api/core';
import { createSearchFormOptions } from '#/utils';

import {
  assignmentColumns,
  assignmentSearchSchema,
} from './model/shared';

type ShareData = {
  task: AdminTaskPageResponseDto;
};

defineOptions({
  name: 'TaskAssignmentModal',
});

const shareData = ref<ShareData>();

const gridOptions: VxeGridProps<AdminTaskAssignmentPageResponseDto> = {
  columns: assignmentColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const { dateRange, ...restFormValues } = formValues || {};
        const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

        return await taskAssignmentPageApi(
          formatQuery({
            page,
            formValues: {
              ...restFormValues,
              endDate,
              startDate,
              taskId: shareData.value?.task.id,
            },
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
};

const [Grid] = useVbenVxeGrid({
  gridOptions,
  formOptions: createSearchFormOptions(assignmentSearchSchema, {
    showCollapseButton: false,
    wrapperClass: 'grid-cols-3 gap-4',
  }),
});

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (isOpen) {
      shareData.value = modalApi.getData<ShareData>();
      modalApi.setState({
        title: `${shareData.value?.task.title || '任务'} - 领取记录`,
      });
    }
  },
});
</script>

<template>
  <Modal v-if="shareData" class="h-[900px] w-[1200px]">
    <Grid />
  </Modal>
</template>
