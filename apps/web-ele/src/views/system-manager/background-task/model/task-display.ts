type BackgroundTaskDisplaySource = {
  [key: string]: unknown;
  displayName?: null | string;
};

export function formatBackgroundTaskDisplayName(
  task?: BackgroundTaskDisplaySource | null,
) {
  const displayName = task?.displayName;
  return typeof displayName === 'string' ? displayName.trim() : '';
}
