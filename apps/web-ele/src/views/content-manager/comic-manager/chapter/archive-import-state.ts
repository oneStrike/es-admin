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
  status: number;
}

type ArchiveProgressDetail = null | Record<string, unknown> | undefined;

export interface ArchiveResultImageProgressItem {
  chapterId?: null | number;
  importedImageCount: number;
  status: number;
}

export function shouldShowArchiveTaskSummary(
  task: ArchiveImportTaskState | null | undefined,
) {
  return Boolean(task && task.status !== ARCHIVE_STATUS.DRAFT);
}

export function isArchiveWorkflowRunning(
  task: ArchiveImportTaskState | null | undefined,
) {
  return Boolean(task && processingStatuses.has(task.status));
}

export function formatArchiveResultImageProgress(
  item: ArchiveResultImageProgressItem,
  options: { isActive: boolean; progressDetail: ArchiveProgressDetail },
) {
  const fallback = String(item.importedImageCount);
  if (!options.isActive || item.status !== ARCHIVE_RESULT_STATUS.PENDING) {
    return fallback;
  }
  const detail = options.progressDetail;
  if (!detail || typeof detail !== 'object') {
    return fallback;
  }
  if (
    detail.kind !== 'content-import.image' ||
    detail.workflowType !== 'content-import.archive-import' ||
    detail.localChapterId !== item.chapterId
  ) {
    return fallback;
  }
  const imageIndex = Number(detail.imageIndex);
  const imageTotal = Number(detail.imageTotal);
  if (!Number.isFinite(imageIndex) || !Number.isFinite(imageTotal)) {
    return fallback;
  }
  if (imageIndex <= 0 || imageTotal <= 0) {
    return fallback;
  }
  return `${imageIndex}/${imageTotal}`;
}
