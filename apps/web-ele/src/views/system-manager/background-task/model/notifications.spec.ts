import type { BackgroundTaskDto } from '#/api/types/backgroundTask';

import { describe, expect, it, vi } from 'vitest';

import { createBackgroundTaskNotificationState } from './notifications';

function createTask(overrides: Partial<BackgroundTaskDto>): BackgroundTaskDto {
  return {
    createdAt: '2026-05-15 10:00:00',
    id: 1,
    maxRetries: 3,
    operatorType: 1,
    operatorUserId: 7,
    payload: {},
    progress: { message: '处理中', percent: 40 },
    retryCount: 0,
    status: 2,
    taskId: 'task-1',
    taskType: 'content.third-party-comic-import',
    updatedAt: '2026-05-15 10:00:00',
    ...overrides,
  };
}

const openGate = {
  accessToken: 'token',
  isAccessChecked: true,
  isDocumentVisible: true,
  isRouteAvailable: true,
};

describe('background task notifications', () => {
  it('does not poll until login, access, route, and visibility gates are open', async () => {
    const fetchPage = vi.fn(async () => ({ list: [] }));
    const state = createBackgroundTaskNotificationState({ fetchPage });

    await state.poll({ ...openGate, accessToken: null });
    await state.poll({ ...openGate, isAccessChecked: false });
    await state.poll({ ...openGate, isDocumentVisible: false });
    await state.poll({ ...openGate, isRouteAvailable: false });

    expect(fetchPage).not.toHaveBeenCalled();
  });

  it('polls the current admin task page only', async () => {
    const fetchPage = vi.fn(async () => ({ list: [] }));
    const state = createBackgroundTaskNotificationState({ fetchPage });

    await state.poll(openGate);

    expect(fetchPage).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 20 });
  });

  it('keeps first terminal observations silent', async () => {
    const notifyTerminal = vi.fn();
    const fetchPage = vi.fn(async () => ({
      list: [createTask({ progress: { percent: 100 }, status: 4 })],
    }));
    const state = createBackgroundTaskNotificationState({
      fetchPage,
      notifyTerminal,
    });

    await state.poll(openGate);

    expect(state.notifications.value).toEqual([]);
    expect(notifyTerminal).not.toHaveBeenCalled();
  });

  it('notifies exactly once when an active task becomes terminal', async () => {
    const notifyTerminal = vi.fn();
    const fetchPage = vi
      .fn()
      .mockResolvedValueOnce({
        list: [createTask({ progress: { message: '导入中', percent: 40 } })],
      })
      .mockResolvedValueOnce({
        list: [
          createTask({
            progress: { message: '导入完成', percent: 100 },
            status: 4,
          }),
        ],
      })
      .mockResolvedValueOnce({
        list: [
          createTask({
            progress: { message: '导入完成', percent: 100 },
            status: 4,
          }),
        ],
      });
    const state = createBackgroundTaskNotificationState({
      fetchPage,
      notifyTerminal,
    });

    await state.poll(openGate);
    await state.poll(openGate);
    await state.poll(openGate);

    expect(notifyTerminal).toHaveBeenCalledTimes(1);
    expect(state.notifications.value).toHaveLength(1);
    expect(state.notifications.value[0]).toMatchObject({
      avatar: expect.stringMatching(/^data:image\/svg\+xml,/),
      id: 'task-1',
      isRead: false,
      link: '/system-manager/background-task',
      query: { taskId: 'task-1' },
    });
  });

  it('marks terminal transitions unread even when the active notification was read', async () => {
    const fetchPage = vi
      .fn()
      .mockResolvedValueOnce({ list: [createTask({ status: 2 })] })
      .mockResolvedValueOnce({ list: [createTask({ status: 4 })] });
    const state = createBackgroundTaskNotificationState({ fetchPage });

    await state.poll(openGate);
    state.markRead('task-1');
    await state.poll(openGate);

    expect(state.notifications.value[0]).toMatchObject({
      id: 'task-1',
      isRead: false,
      title: expect.stringContaining('成功'),
    });
  });

  it('swallows poll request failures and allows the next poll to continue', async () => {
    const pollError = new Error('network failed');
    const onPollError = vi.fn();
    const fetchPage = vi
      .fn()
      .mockRejectedValueOnce(pollError)
      .mockResolvedValueOnce({ list: [createTask({ status: 2 })] });
    const state = createBackgroundTaskNotificationState({
      fetchPage,
      onPollError,
    });

    await expect(state.poll(openGate)).resolves.toBeUndefined();
    await state.poll(openGate);

    expect(onPollError).toHaveBeenCalledWith(pollError);
    expect(state.notifications.value).toEqual([
      expect.objectContaining({ id: 'task-1' }),
    ]);
  });
});
