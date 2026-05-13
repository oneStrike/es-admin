import type { BackgroundTaskDto } from '#/api/types/backgroundTask';

import { formatBackgroundTaskStatus } from './status';

type ProgressStatus = 'exception' | 'success' | 'warning';

export interface BackgroundTaskProgressView {
  message: string;
  percent: number;
  status?: ProgressStatus;
  striped: boolean;
}

function normalizeProgressPercent(progress: Record<string, unknown>) {
  const percent = progress.percent;
  if (typeof percent !== 'number' || !Number.isFinite(percent)) {
    return 0;
  }
  return Math.min(100, Math.max(0, Math.round(percent)));
}

function normalizeProgressMessage(
  progress: Record<string, unknown>,
  taskStatus: BackgroundTaskDto['status'],
) {
  const message = progress.message;
  if (typeof message === 'string' && message.trim()) {
    return message.trim();
  }
  return formatBackgroundTaskStatus(taskStatus).label;
}

function getProgressRecord(progress: unknown): Record<string, unknown> {
  return typeof progress === 'object' && progress !== null
    ? (progress as Record<string, unknown>)
    : {};
}

export function resolveBackgroundTaskProgress(
  task: BackgroundTaskDto,
): BackgroundTaskProgressView {
  const progress = getProgressRecord(task.progress);
  const percent = normalizeProgressPercent(progress);
  const message = normalizeProgressMessage(progress, task.status);

  if (task.status === 4) {
    return { message, percent: 100, status: 'success', striped: false };
  }
  if (task.status === 5 || task.status === 7) {
    return { message, percent, status: 'exception', striped: false };
  }
  if (task.status === 3) {
    return { message, percent, status: 'warning', striped: true };
  }

  return {
    message,
    percent: task.status === 1 ? 0 : percent,
    striped: task.status === 2,
  };
}

export function canCancelBackgroundTask(task: BackgroundTaskDto) {
  return task.status === 1 || task.status === 2 || task.status === 3;
}

export function canRetryBackgroundTask(task: BackgroundTaskDto) {
  const cleanFailureStatus = task.status === 5 || task.status === 6;
  const rollbackClean =
    task.rollbackError === undefined || task.rollbackError === null;
  return (
    cleanFailureStatus && rollbackClean && task.retryCount < task.maxRetries
  );
}

export function formatDiagnosticJson(value: unknown) {
  if (value === null || value === undefined) {
    return '-';
  }
  try {
    return JSON.stringify(value, null, 2) ?? String(value);
  } catch {
    return String(value);
  }
}

export function getDiagnosticMessage(value: unknown) {
  if (typeof value !== 'object' || value === null) {
    return '';
  }
  const diagnostic = value as Record<string, unknown>;
  const message = diagnostic.message;
  if (typeof message === 'string' && message.trim()) {
    return message.trim();
  }
  return Object.keys(diagnostic).length > 0 ? formatDiagnosticJson(value) : '';
}
