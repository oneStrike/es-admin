import type { TagProps } from 'element-plus';

import type { BackgroundTaskDto } from '#/api/types/backgroundTask';

type BackgroundTaskStatus = BackgroundTaskDto['status'];

type BackgroundTaskStatusOption = {
  label: string;
  type: TagProps['type'];
  value: BackgroundTaskStatus;
};

export const backgroundTaskStatusOptions = [
  { label: '待处理', type: 'info', value: 1 },
  { label: '处理中', type: 'warning', value: 2 },
  { label: '最终写入中', type: 'warning', value: 3 },
  { label: '成功', type: 'success', value: 4 },
  { label: '失败', type: 'danger', value: 5 },
  { label: '已取消', type: 'info', value: 6 },
  { label: '回滚失败', type: 'danger', value: 7 },
] as const satisfies readonly BackgroundTaskStatusOption[];

export function formatBackgroundTaskStatus(status?: null | number) {
  return (
    backgroundTaskStatusOptions.find((item) => item.value === status) ?? {
      label: status === undefined || status === null ? '-' : String(status),
      type: 'info' as const,
      value: status ?? 0,
    }
  );
}
