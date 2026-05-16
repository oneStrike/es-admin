export function createBackgroundTaskDetailRequestGuard() {
  let version = 0;

  return {
    canApply(token: number, taskId: string, currentTaskId?: null | string) {
      return token === version && currentTaskId === taskId;
    },
    createToken() {
      version += 1;
      return version;
    },
    invalidate() {
      version += 1;
    },
  };
}
