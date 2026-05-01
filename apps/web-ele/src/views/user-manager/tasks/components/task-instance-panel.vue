<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { TaskInstanceViewDto } from '#/api/types';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import { taskInstancePageApi } from '#/api/core';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import {
  taskInstanceColumns,
  taskInstanceSearchFormSchema,
} from '../model/instance';

const gridOptions: VxeGridProps<TaskInstanceViewDto> = {
  columns: taskInstanceColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const { dateRange, ...restFormValues } = formValues || {};
        const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

        return await taskInstancePageApi(
          formatQuery({
            page,
            formValues: {
              ...restFormValues,
              endDate,
              startDate,
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
  formOptions: createSearchFormOptions(taskInstanceSearchFormSchema, {
    showCollapseButton: false,
    wrapperClass: 'grid-cols-5 gap-4',
  }),
  gridOptions,
});
</script>

<template>
  <div class="user-manager-full-height-pane">
    <Grid class="user-manager-full-height-grid" />
  </div>
</template>
