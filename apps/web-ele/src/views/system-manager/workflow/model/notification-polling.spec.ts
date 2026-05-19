import type { Router } from 'vue-router';

import type {
  WorkflowNotificationItemDto,
  WorkflowNotificationListResponse,
} from '#/api/types';

import { createApp, defineComponent } from 'vue';

import { ElNotification } from 'element-plus';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { workflowNotificationListApi } from '#/api/core';

import { workflowNotificationStorageKey } from './notification';
import { useWorkflowGlobalNotifications } from './notification-polling';

vi.mock('#/api/core', () => ({
  workflowNotificationListApi: vi.fn(),
}));

vi.mock('element-plus', () => ({
  ElNotification: vi.fn(),
}));

type StorageLike = Pick<Storage, 'getItem' | 'removeItem' | 'setItem'>;

function createMemoryStorage(initialValue?: string): StorageLike {
  const values = new Map<string, string>();
  if (initialValue) {
    values.set(workflowNotificationStorageKey, initialValue);
  }

  return {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    removeItem: vi.fn((key: string) => {
      values.delete(key);
    }),
    setItem: vi.fn((key: string, value: string) => {
      values.set(key, value);
    }),
  };
}

function createNotification(
  overrides: Partial<WorkflowNotificationItemDto> = {},
): WorkflowNotificationItemDto {
  return {
    createdAt: '2026-05-19T08:00:00.000Z',
    displayName: '导入任务',
    failedItemCount: 0,
    id: 2,
    jobId: 'job-002',
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

function createResponse(
  overrides: Partial<WorkflowNotificationListResponse> = {},
): WorkflowNotificationListResponse {
  return {
    list: [createNotification()],
    nextAfterId: 2,
    nextCreatedAfter: '2026-05-19T08:00:00.000Z',
    serverTime: '2026-05-19T08:00:02.000Z',
    ...overrides,
  };
}

function createDeferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolver) => {
    resolve = resolver;
  });

  return { promise, resolve };
}

function mountWorkflowNotifications({
  enabled = { value: true },
  storage,
}: {
  enabled?: { value: boolean };
  storage?: StorageLike;
} = {}) {
  const router = { push: vi.fn() };
  let composable: ReturnType<typeof useWorkflowGlobalNotifications> | undefined;

  const app = createApp(
    defineComponent({
      setup() {
        composable = useWorkflowGlobalNotifications({
          avatar: () => '/avatar.png',
          isEnabled: () => enabled.value,
          pollIntervalMs: 60_000,
          router: router as unknown as Router,
          storage,
        });
        return () => null;
      },
    }),
  );
  const root = document.createElement('div');
  document.body.append(root);
  app.mount(root);
  expect(composable).toBeDefined();

  return {
    api: composable as ReturnType<typeof useWorkflowGlobalNotifications>,
    enabled,
    router,
    unmount: () => {
      app.unmount();
      root.remove();
    },
  };
}

describe('workflow notification polling', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('drops an in-flight poll response after auth becomes unavailable', async () => {
    const initialState = JSON.stringify({
      cursorAfterId: 1,
      cursorCreatedAfter: '2026-05-19T07:59:00.000Z',
      items: [],
    });
    const storage = createMemoryStorage(initialState);
    const enabled = { value: true };
    const deferred = createDeferred<WorkflowNotificationListResponse>();
    vi.mocked(workflowNotificationListApi).mockReturnValueOnce(
      deferred.promise,
    );
    const mounted = mountWorkflowNotifications({ enabled, storage });

    const poll = mounted.api.pollOnce();
    enabled.value = false;
    deferred.resolve(createResponse());
    await poll;

    const storedState = storage.getItem(workflowNotificationStorageKey);
    expect(storedState).toBeTruthy();
    expect(JSON.parse(storedState as string)).toEqual(JSON.parse(initialState));
    expect(ElNotification).not.toHaveBeenCalled();

    mounted.unmount();
  });

  it('keeps in-memory state usable when storage cleanup or writes fail', () => {
    const storage: StorageLike = {
      getItem: vi.fn(() => {
        throw new Error('blocked storage read');
      }),
      removeItem: vi.fn(() => {
        throw new Error('blocked storage cleanup');
      }),
      setItem: vi.fn(() => {
        throw new Error('blocked storage write');
      }),
    };

    const mounted = mountWorkflowNotifications({ storage });

    expect(mounted.api.notifications.value).toEqual([]);
    expect(() => mounted.api.clear()).not.toThrow();
    expect(storage.removeItem).toHaveBeenCalledWith(
      workflowNotificationStorageKey,
    );
    expect(storage.setItem).toHaveBeenCalledWith(
      workflowNotificationStorageKey,
      expect.any(String),
    );

    mounted.unmount();
  });
});
