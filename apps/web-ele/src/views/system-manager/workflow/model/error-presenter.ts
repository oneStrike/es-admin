export type WorkflowErrorTone = 'danger' | 'info' | 'warning';

export type WorkflowErrorLike = {
  code?: null | string;
  context?: null | Record<string, unknown>;
  domain?: null | string;
  retryable?: boolean | null;
  severity?: null | string;
  stage?: null | string;
};

export type WorkflowErrorPresentation = {
  description?: string;
  title: string;
  tone: WorkflowErrorTone;
};

export const knownWorkflowErrorCodes = [
  'ARCHIVE_CHAPTER_IMPORT_FAILED',
  'ARCHIVE_IMPORT_CHAPTER_NOT_FOUND',
  'ARCHIVE_IMPORT_DEPTH_EXCEEDED',
  'ARCHIVE_IMPORT_INVALID_CHAPTER_ID_DIR',
  'ARCHIVE_IMPORT_ITEM_IGNORED',
  'ARCHIVE_IMPORT_MATCHED',
  'ARCHIVE_IMPORT_MISSING_CHAPTER_ID',
  'ARCHIVE_IMPORT_NO_IMAGES',
  'ARCHIVE_IMPORT_OVERWRITE_WARNING',
  'ARCHIVE_IMPORT_PROGRESS_UPDATED',
  'ATTEMPT_LEASE_EXPIRED',
  'CONTENT_IMPORT_IMAGE_PROGRESS_UPDATED',
  'CONTENT_IMPORT_ITEM_FAILED',
  'CONTENT_IMPORT_PROGRESS_UPDATED',
  'CONTENT_IMPORT_RATE_LIMITED',
  'CONTENT_IMPORT_RETRY_EXHAUSTED',
  'COUPON_ADMIN_GRANT_ITEM_FAILED',
  'COUPON_ADMIN_GRANT_ITEM_SUCCEEDED',
  'COUPON_ADMIN_GRANT_PROGRESS_UPDATED',
  'DATABASE_WRITE_FAILED',
  'THIRD_PARTY_CHAPTER_IMPORT_FAILED',
  'THIRD_PARTY_IMAGE_IMPORT_FAILED',
  'THIRD_PARTY_IMPORT_COMPLETED',
  'THIRD_PARTY_RESOURCE_PARSE_FAILED',
  'THIRD_PARTY_SYNC_COMPLETED',
  'UNKNOWN_WORKFLOW_PROGRESS',
  'UNKNOWN_WORKFLOW_ERROR',
] as const;

type WorkflowErrorCode = (typeof knownWorkflowErrorCodes)[number];
type NormalizedWorkflowError = {
  code: string;
  context: Record<string, unknown>;
};
type WorkflowErrorPresenter = (
  error: NormalizedWorkflowError,
) => WorkflowErrorPresentation;

function text(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function numberText(value: unknown, fallback = '') {
  return typeof value === 'number' && Number.isFinite(value)
    ? String(value)
    : fallback;
}

function pathText(context: Record<string, unknown>) {
  return text(context.path, '当前条目');
}

function imageProgressTitle(context: Record<string, unknown>) {
  const chapterIndex = numberText(context.chapterIndex, '?');
  const chapterTotal = numberText(context.chapterTotal, '?');
  const imageIndex = numberText(context.imageIndex, '?');
  const imageTotal = numberText(context.imageTotal, '?');
  return `正在导入章节 ${chapterIndex}/${chapterTotal} 的图片 ${imageIndex}/${imageTotal}`;
}

function contentImportProgressTitle(context: Record<string, unknown>) {
  const action =
    text(context.workflowType) === 'content-import.third-party-sync'
      ? '章节同步'
      : '章节导入';
  const state = text(context.progressState);
  let stateText = '进度';
  if (state === 'cancelled') {
    stateText = '已取消';
  } else if (state === 'prepare-failed') {
    stateText = '准备失败';
  }
  const completedItemCount = numberText(context.completedItemCount, '?');
  const selectedItemCount = numberText(context.selectedItemCount, '?');
  const imageTotal =
    typeof context.imageTotal === 'number' && context.imageTotal > 0
      ? context.imageTotal
      : 0;
  if (imageTotal > 0) {
    return `${action}${stateText}：图片 ${numberText(
      context.imageSuccessCount,
      '0',
    )}/${imageTotal}，章节 ${completedItemCount}/${selectedItemCount}`;
  }
  return `${action}${stateText}：章节 ${completedItemCount}/${selectedItemCount}`;
}

function couponGrantProgressTitle(context: Record<string, unknown>) {
  const completedItemCount = numberText(context.completedItemCount, '?');
  const selectedItemCount = numberText(context.selectedItemCount, '?');
  return `批量发券进度：用户 ${completedItemCount}/${selectedItemCount}`;
}

export const workflowErrorPresenters: Record<
  WorkflowErrorCode,
  WorkflowErrorPresenter
> = {
  ARCHIVE_CHAPTER_IMPORT_FAILED: ({ context }) => ({
    title: `${text(context.chapterTitle, '章节')} 导入失败`,
    tone: 'danger',
  }),
  ARCHIVE_IMPORT_CHAPTER_NOT_FOUND: ({ context }) => ({
    title: `${pathText(context)} 未匹配到章节`,
    tone: 'warning',
  }),
  ARCHIVE_IMPORT_DEPTH_EXCEEDED: ({ context }) => ({
    title: `${pathText(context)} 的目录层级过深`,
    tone: 'warning',
  }),
  ARCHIVE_IMPORT_INVALID_CHAPTER_ID_DIR: ({ context }) => ({
    title: `${pathText(context)} 不是有效章节 ID`,
    tone: 'warning',
  }),
  ARCHIVE_IMPORT_ITEM_IGNORED: ({ context }) => ({
    title: `${pathText(context)} 已忽略`,
    tone: 'warning',
  }),
  ARCHIVE_IMPORT_MATCHED: ({ context }) => ({
    title: `${text(context.chapterTitle, pathText(context))} 可导入`,
    tone: 'info',
  }),
  ARCHIVE_IMPORT_MISSING_CHAPTER_ID: ({ context }) => ({
    title: `${pathText(context)} 缺少章节 ID`,
    tone: 'warning',
  }),
  ARCHIVE_IMPORT_NO_IMAGES: ({ context }) => ({
    title: `${pathText(context)} 没有可导入图片`,
    tone: 'warning',
  }),
  ARCHIVE_IMPORT_OVERWRITE_WARNING: ({ context }) => ({
    title: `将覆盖已有 ${numberText(context.existingImageCount, '0')} 张图片`,
    tone: 'warning',
  }),
  ARCHIVE_IMPORT_PROGRESS_UPDATED: ({ context }) => ({
    title: imageProgressTitle(context),
    tone: 'info',
  }),
  ATTEMPT_LEASE_EXPIRED: ({ context }) => ({
    description: text(context.recoveredAt)
      ? `恢复时间 ${text(context.recoveredAt)}`
      : undefined,
    title: '执行占用已过期，系统已进入恢复处理',
    tone: 'warning',
  }),
  CONTENT_IMPORT_IMAGE_PROGRESS_UPDATED: ({ context }) => ({
    title: imageProgressTitle(context),
    tone: 'info',
  }),
  CONTENT_IMPORT_ITEM_FAILED: ({ context }) => ({
    title: `${text(context.chapterTitle, '章节')} 导入失败`,
    tone: 'danger',
  }),
  CONTENT_IMPORT_PROGRESS_UPDATED: ({ context }) => ({
    title: contentImportProgressTitle(context),
    tone: 'info',
  }),
  CONTENT_IMPORT_RATE_LIMITED: ({ context }) => ({
    description: text(context.nextRetryAt)
      ? `预计 ${text(context.nextRetryAt)} 后继续`
      : undefined,
    title: '请求太频繁，稍后会自动继续',
    tone: 'warning',
  }),
  CONTENT_IMPORT_RETRY_EXHAUSTED: ({ context }) => ({
    title: `${text(context.chapterTitle, '章节')} 自动重试已用完`,
    tone: 'danger',
  }),
  COUPON_ADMIN_GRANT_ITEM_FAILED: ({ context }) => ({
    title: `${text(context.userLabel, text(context.userId, '用户'))} 发券失败`,
    tone: 'danger',
  }),
  COUPON_ADMIN_GRANT_ITEM_SUCCEEDED: ({ context }) => ({
    title: `${text(context.userLabel, text(context.userId, '用户'))} 发券完成`,
    tone: 'info',
  }),
  COUPON_ADMIN_GRANT_PROGRESS_UPDATED: ({ context }) => ({
    title: couponGrantProgressTitle(context),
    tone: 'info',
  }),
  DATABASE_WRITE_FAILED: () => ({
    title: '数据写入失败',
    tone: 'danger',
  }),
  THIRD_PARTY_CHAPTER_IMPORT_FAILED: ({ context }) => ({
    title: `${text(context.chapterTitle, '章节')} 导入失败`,
    tone: 'danger',
  }),
  THIRD_PARTY_IMAGE_IMPORT_FAILED: ({ context }) => ({
    title: `第 ${numberText(context.imageIndex, '?')} 张图片导入失败`,
    tone: 'danger',
  }),
  THIRD_PARTY_IMPORT_COMPLETED: () => ({
    title: '第三方漫画导入完成',
    tone: 'info',
  }),
  THIRD_PARTY_RESOURCE_PARSE_FAILED: ({ context }) => ({
    title: `${text(context.source, '三方资源')} 解析失败`,
    tone: 'danger',
  }),
  THIRD_PARTY_SYNC_COMPLETED: () => ({
    title: '第三方漫画最新章节同步完成',
    tone: 'info',
  }),
  UNKNOWN_WORKFLOW_PROGRESS: () => ({
    title: '工作流进度已更新',
    tone: 'info',
  }),
  UNKNOWN_WORKFLOW_ERROR: () => ({
    title: '未知工作流错误',
    tone: 'danger',
  }),
};

export function presentWorkflowError(
  error: null | undefined | WorkflowErrorLike,
  fallback = '-',
): WorkflowErrorPresentation {
  const code = text(error?.code);
  if (!code) {
    return { title: fallback, tone: 'info' };
  }

  const context =
    error?.context && typeof error.context === 'object' ? error.context : {};
  const presenter = workflowErrorPresenters[code as WorkflowErrorCode];
  if (presenter) {
    return presenter({ code, context });
  }

  return {
    title: `未知错误（${code}）`,
    tone: error?.severity === 'warning' ? 'warning' : 'danger',
  };
}

export function formatWorkflowErrorTitle(
  error: null | undefined | WorkflowErrorLike,
  fallback = '-',
) {
  return presentWorkflowError(error, fallback).title;
}
