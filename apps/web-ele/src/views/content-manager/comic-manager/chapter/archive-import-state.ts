export const ARCHIVE_STATUS = {
  DRAFT: 0,
  PENDING: 1,
  PROCESSING: 2,
  SUCCESS: 3,
  PARTIAL_FAILED: 4,
  FAILED: 5,
  EXPIRED: 6,
  CANCELLED: 7,
} as const;

export const ARCHIVE_RESULT_STATUS = {
  PENDING: 0,
  SUCCESS: 1,
  FAILED: 2,
} as const;

const processingStatuses: Set<number> = new Set([
  ARCHIVE_STATUS.PENDING,
  ARCHIVE_STATUS.PROCESSING,
]);

export interface ArchiveImportTaskState {
  backgroundOwned?: boolean;
  status: number;
}

export function shouldShowArchiveTaskSummary(
  task: ArchiveImportTaskState | null | undefined,
) {
  return task?.backgroundOwned === true;
}

export function isArchiveBackgroundTask(
  task: ArchiveImportTaskState | null | undefined,
) {
  if (task?.backgroundOwned !== true) {
    return false;
  }
  return processingStatuses.has(task.status);
}
