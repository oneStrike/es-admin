import type { WorkflowNotificationItemDto } from '#/api/types';

import { describe, expect, it } from 'vitest';

import {
  advanceWorkflowNotificationCursor,
  appendWorkflowNotificationItems,
  buildWorkflowNotificationListRequest,
  createEmptyWorkflowNotificationState,
  getWorkflowNotificationMessage,
  normalizeWorkflowNotificationState,
  seedWorkflowNotificationCursor,
  toWorkflowHeaderNotification,
} from './notification';

function createNotification(
  overrides: Partial<WorkflowNotificationItemDto> = {},
): WorkflowNotificationItemDto {
  return {
    createdAt: '2026-05-19T08:00:00.000Z',
    displayName: '导入任务',
    failedItemCount: 0,
    id: 1,
    jobId: 'job-001',
    kind: 'success',
    nextRetryAt: null,
    selectedItemCount: 2,
    skippedItemCount: 0,
    status: 4,
    successItemCount: 2,
    updatedAt: '2026-05-19T08:00:01.000Z',
    workflowType: 'content-import.third-party-import',
    ...overrides,
  };
}

describe('workflow notification model', () => {
  it('builds an explicit polling request from the stored cursor', () => {
    expect(
      buildWorkflowNotificationListRequest({
        cursorAfterId: 12,
        cursorCreatedAfter: '2026-05-19T08:00:00.000Z',
        items: [],
      }),
    ).toEqual({
      afterId: 12,
      createdAfter: '2026-05-19T08:00:00.000Z',
      kinds: ['success', 'retrying', 'failed'],
      limit: 20,
    });
  });

  it('seeds the first-load cursor from server time without storing historical rows', () => {
    const state = seedWorkflowNotificationCursor(
      createEmptyWorkflowNotificationState(),
      '2026-05-19T08:01:00.000Z',
    );

    expect(state).toEqual({
      cursorAfterId: null,
      cursorCreatedAfter: '2026-05-19T08:01:00.000Z',
      items: [],
    });
  });

  it('maps notification facts to admin-owned copy', () => {
    expect(getWorkflowNotificationMessage(createNotification())).toBe(
      '工作流【导入任务】执行完成',
    );
    expect(
      getWorkflowNotificationMessage(createNotification({ kind: 'retrying' })),
    ).toBe('工作流【导入任务】执行异常正在重试');
    expect(
      getWorkflowNotificationMessage(createNotification({ kind: 'failed' })),
    ).toBe('工作流【导入任务】执行失败');
  });

  it('deduplicates incoming facts and keeps recent header items first', () => {
    const first = createNotification({
      createdAt: '2026-05-19T08:00:00.000Z',
      id: 1,
    });
    const second = createNotification({
      createdAt: '2026-05-19T08:00:00.000Z',
      id: 2,
      jobId: 'job-002',
    });

    const merged = appendWorkflowNotificationItems(
      { cursorAfterId: null, cursorCreatedAfter: null, items: [first] },
      [first, second],
    );

    expect(merged.added).toEqual([{ ...second, isRead: false }]);
    expect(merged.state.items.map((item) => item.id)).toEqual([2, 1]);
  });

  it('advances the cursor only when the server returns a next row cursor', () => {
    const state = {
      cursorAfterId: 1,
      cursorCreatedAfter: '2026-05-19T08:00:00.000Z',
      items: [],
    };

    expect(
      advanceWorkflowNotificationCursor(state, {
        nextAfterId: 2,
        nextCreatedAfter: '2026-05-19T08:00:01.000Z',
      }),
    ).toMatchObject({
      cursorAfterId: 2,
      cursorCreatedAfter: '2026-05-19T08:00:01.000Z',
    });
    expect(
      advanceWorkflowNotificationCursor(state, {
        nextAfterId: null,
        nextCreatedAfter: null,
      }),
    ).toBe(state);
  });

  it('normalizes persisted state and drops invalid or unknown-kind items', () => {
    expect(
      normalizeWorkflowNotificationState({
        cursorAfterId: 3,
        cursorCreatedAfter: '2026-05-19T08:00:00.000Z',
        items: [
          createNotification(),
          createNotification({ id: 4, kind: 'ignored' as any }),
          { id: 5 },
        ],
      }),
    ).toMatchObject({
      cursorAfterId: 3,
      cursorCreatedAfter: '2026-05-19T08:00:00.000Z',
      items: [createNotification()],
    });
  });

  it('creates header notification items that route back to workflow manager', () => {
    expect(
      toWorkflowHeaderNotification(
        { ...createNotification(), isRead: true },
        { avatar: '/avatar.png' },
      ),
    ).toMatchObject({
      avatar: '/avatar.png',
      id: 'workflow:1',
      isRead: true,
      message: '工作流【导入任务】执行完成',
      query: { jobId: 'job-001' },
      title: '工作流执行完成',
      workflowEventId: 1,
      workflowJobId: 'job-001',
    });
  });
});
