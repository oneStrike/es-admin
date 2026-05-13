import type { BackgroundTaskDto } from '#/api/types/backgroundTask';

import { describe, expect, it } from 'vitest';

import {
  canCancelBackgroundTask,
  canRetryBackgroundTask,
  getDiagnosticMessage,
  resolveBackgroundTaskProgress,
} from './progress';

function createTask(overrides: Partial<BackgroundTaskDto>): BackgroundTaskDto {
  return {
    createdAt: '2026-05-13 08:00:00',
    id: 1,
    maxRetries: 3,
    payload: {},
    progress: {},
    retryCount: 0,
    status: 2,
    taskId: 'task-1',
    taskType: 'content.third-party-comic-import',
    updatedAt: '2026-05-13 08:00:00',
    ...overrides,
  };
}

describe('background task progress model', () => {
  it('normalizes numeric progress percentages defensively', () => {
    expect(
      resolveBackgroundTaskProgress(
        createTask({ progress: { percent: 37 }, status: 2 }),
      ).percent,
    ).toBe(37);
    expect(
      resolveBackgroundTaskProgress(
        createTask({ progress: { percent: 37.6 }, status: 2 }),
      ).percent,
    ).toBe(38);
    expect(
      resolveBackgroundTaskProgress(
        createTask({ progress: { percent: -20 }, status: 2 }),
      ).percent,
    ).toBe(0);
    expect(
      resolveBackgroundTaskProgress(
        createTask({ progress: { percent: 160 }, status: 2 }),
      ).percent,
    ).toBe(100);
    expect(
      resolveBackgroundTaskProgress(
        createTask({ progress: { percent: '80' }, status: 2 }),
      ).percent,
    ).toBe(0);
  });

  it('falls back to status labels when progress message is unavailable', () => {
    expect(
      resolveBackgroundTaskProgress(
        createTask({
          progress: { message: '已导入 3/10 个章节', percent: 30 },
          status: 2,
        }),
      ).message,
    ).toBe('已导入 3/10 个章节');
    expect(
      resolveBackgroundTaskProgress(
        createTask({ progress: { message: '   ', percent: 30 }, status: 2 }),
      ).message,
    ).toBe('处理中');
  });

  it('derives terminal progress visual states from task status', () => {
    expect(
      resolveBackgroundTaskProgress(createTask({ progress: {}, status: 4 })),
    ).toMatchObject({ percent: 100, status: 'success' });
    expect(
      resolveBackgroundTaskProgress(
        createTask({ progress: { percent: 65 }, status: 5 }),
      ),
    ).toMatchObject({ percent: 65, status: 'exception' });
    expect(
      resolveBackgroundTaskProgress(
        createTask({ progress: { percent: 65 }, status: 7 }),
      ),
    ).toMatchObject({ percent: 65, status: 'exception' });
  });

  it('aligns cancel and retry affordances with backend task semantics', () => {
    expect(canCancelBackgroundTask(createTask({ status: 1 }))).toBe(true);
    expect(canCancelBackgroundTask(createTask({ status: 2 }))).toBe(true);
    expect(canCancelBackgroundTask(createTask({ status: 3 }))).toBe(true);
    expect(canCancelBackgroundTask(createTask({ status: 4 }))).toBe(false);

    expect(canRetryBackgroundTask(createTask({ status: 5 }))).toBe(true);
    expect(canRetryBackgroundTask(createTask({ status: 6 }))).toBe(true);
    expect(canRetryBackgroundTask(createTask({ status: 7 }))).toBe(false);
    expect(
      canRetryBackgroundTask(
        createTask({ rollbackError: { message: 'cleanup failed' }, status: 5 }),
      ),
    ).toBe(false);
    expect(
      canRetryBackgroundTask(
        createTask({ maxRetries: 3, retryCount: 3, status: 5 }),
      ),
    ).toBe(false);
  });

  it('keeps diagnostic objects visible even when message is missing', () => {
    expect(getDiagnosticMessage({ message: '导入失败' })).toBe('导入失败');
    expect(
      getDiagnosticMessage({
        code: 'IMPORT_FAILED',
        detail: '章节文件缺失',
      }),
    ).toContain('IMPORT_FAILED');
    expect(getDiagnosticMessage({})).toBe('');
  });
});
