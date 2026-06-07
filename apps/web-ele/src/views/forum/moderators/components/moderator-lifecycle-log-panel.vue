<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { ForumModeratorLifecycleLogDto } from '#/api/types';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import { forumModeratorLifecycleLogPageApi } from '#/api/core';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import {
  lifecycleLogColumns,
  searchFormSchema,
} from '../model/lifecycle-log';

const lifecycleLogGridOptions: VxeGridProps<ForumModeratorLifecycleLogDto> = {
  columns: lifecycleLogColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const { dateRange, ...restFormValues } = formValues || {};
        const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

        return await forumModeratorLifecycleLogPageApi(
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

const [LifecycleLogGrid, lifecycleLogGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(searchFormSchema),
  gridOptions: lifecycleLogGridOptions,
});

async function reload() {
  await lifecycleLogGridApi.reload();
}

defineExpose({
  reload,
});
</script>

<template>
  <div class="es-full-height-pane">
    <LifecycleLogGrid class="es-full-height-grid" />
  </div>
</template>
