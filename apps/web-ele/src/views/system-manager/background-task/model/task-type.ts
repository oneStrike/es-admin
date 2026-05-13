type BackgroundTaskTypeOption = {
  label: string;
  value: string;
};

export const backgroundTaskTypeOptions = [
  {
    label: '第三方漫画导入',
    value: 'content.third-party-comic-import',
  },
] as const satisfies readonly BackgroundTaskTypeOption[];

export function formatBackgroundTaskType(taskType?: null | string) {
  return (
    backgroundTaskTypeOptions.find((item) => item.value === taskType)?.label ??
    (taskType ? String(taskType) : '-')
  );
}
