import type { RouteRecordRaw } from 'vue-router';

import type { NotificationItem } from '@vben/layouts';

import type {
  BackgroundTaskMyPageRequest,
  BackgroundTaskMyPageResponse,
  BackgroundTaskNotificationDto,
} from '#/api/types/backgroundTask';

import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useAccessStore } from '@vben/stores';

import { formatUTC } from '#/utils/dayjs';

import { resolveBackgroundTaskProgress } from './progress';
import { formatBackgroundTaskStatus } from './status';
import { formatBackgroundTaskType } from './task-type';

const BACKGROUND_TASK_ROUTE_NAME = 'BackgroundTaskManager';
const BACKGROUND_TASK_ROUTE_PATH = '/system-manager/background-task';
const NOTIFICATION_PAGE_SIZE = 20;
const POLL_INTERVAL_MS = 15_000;
const BACKGROUND_TASK_NOTIFICATION_AVATAR =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22%3E%3Crect width=%2240%22 height=%2240%22 rx=%2220%22 fill=%22%232563eb%22/%3E%3Cpath d=%22M12 13h16v11H12z%22 fill=%22%23fff%22 opacity=%22.92%22/%3E%3Cpath d=%22M15 28h10%22 stroke=%22%23fff%22 stroke-width=%222.5%22 stroke-linecap=%22round%22/%3E%3C/svg%3E';
const ACTIVE_STATUSES = new Set([1, 2, 3]);
const TERMINAL_STATUSES = new Set([4, 5, 6, 7]);

interface BackgroundTaskNotificationGate {
  accessToken: null | string;
  isAccessChecked: boolean;
  isDocumentVisible: boolean;
  isRouteAvailable: boolean;
}

interface BackgroundTaskNotificationOptions {
  fetchPage?: (
    params: BackgroundTaskMyPageRequest,
  ) => Promise<Pick<BackgroundTaskMyPageResponse, 'list'>>;
  notifyTerminal?: (item: NotificationItem) => void;
  onPollError?: (error: unknown) => void;
  pageSize?: number;
}

async function defaultFetchBackgroundTaskPage(
  params: BackgroundTaskMyPageRequest,
) {
  const { backgroundTaskMyPageApi } = await import('#/api/core/backgroundTask');
  return backgroundTaskMyPageApi(params);
}

function canPoll(gate: BackgroundTaskNotificationGate) {
  return Boolean(
    gate.accessToken &&
    gate.isAccessChecked &&
    gate.isDocumentVisible &&
    gate.isRouteAvailable,
  );
}

function isActiveStatus(status: number) {
  return ACTIVE_STATUSES.has(status);
}

function isTerminalStatus(status: number) {
  return TERMINAL_STATUSES.has(status);
}

function buildTaskNotificationItem(
  task: BackgroundTaskNotificationDto,
): NotificationItem {
  const progress = resolveBackgroundTaskProgress(task);
  const status = formatBackgroundTaskStatus(task.status);
  const typeLabel = formatBackgroundTaskType(task.taskType);
  const terminal = isTerminalStatus(task.status);

  return {
    avatar: BACKGROUND_TASK_NOTIFICATION_AVATAR,
    date: formatUTC(task.updatedAt, 'YYYY-MM-DD HH:mm:ss') || task.updatedAt,
    id: task.taskId,
    isRead: false,
    link: BACKGROUND_TASK_ROUTE_PATH,
    message: progress.message,
    query: { taskId: task.taskId },
    state: { taskId: task.taskId },
    title: terminal ? `${typeLabel}：${status.label}` : typeLabel,
  };
}

function upsertNotification(
  notifications: NotificationItem[],
  item: NotificationItem,
  options: { preserveRead?: boolean } = {},
) {
  const index = notifications.findIndex((current) => current.id === item.id);
  if (index === -1) {
    return [item, ...notifications];
  }

  const preserveRead = options.preserveRead ?? true;
  const nextNotifications = [...notifications];
  nextNotifications[index] = {
    ...nextNotifications[index],
    ...item,
    isRead: preserveRead
      ? (nextNotifications[index]?.isRead ?? item.isRead)
      : item.isRead,
  };
  return nextNotifications;
}

export function createBackgroundTaskNotificationState(
  options: BackgroundTaskNotificationOptions = {},
) {
  const fetchPage = options.fetchPage ?? defaultFetchBackgroundTaskPage;
  const notifyTerminal = options.notifyTerminal ?? (() => undefined);
  const onPollError = options.onPollError ?? (() => undefined);
  const pageSize = options.pageSize ?? NOTIFICATION_PAGE_SIZE;
  const notifications = ref<NotificationItem[]>([]);
  const activeTaskIds = new Set<string>();
  const notifiedTerminalTaskIds = new Set<string>();
  let polling = false;

  async function poll(gate: BackgroundTaskNotificationGate) {
    if (!canPoll(gate) || polling) {
      return;
    }

    polling = true;
    try {
      const page = await fetchPage({
        pageIndex: 1,
        pageSize,
      });

      for (const task of page.list ?? []) {
        const item = buildTaskNotificationItem(task);

        if (isActiveStatus(task.status)) {
          activeTaskIds.add(task.taskId);
          notifications.value = upsertNotification(notifications.value, item);
          continue;
        }

        if (!isTerminalStatus(task.status)) {
          continue;
        }

        const wasActive = activeTaskIds.has(task.taskId);
        activeTaskIds.delete(task.taskId);

        if (notifiedTerminalTaskIds.has(task.taskId)) {
          notifications.value = upsertNotification(notifications.value, item);
          continue;
        }

        if (!wasActive) {
          continue;
        }

        notifiedTerminalTaskIds.add(task.taskId);
        notifications.value = upsertNotification(notifications.value, item, {
          preserveRead: false,
        });
        notifyTerminal(item);
      }
    } catch (error) {
      onPollError(error);
    } finally {
      polling = false;
    }
  }

  function clear() {
    notifications.value = [];
  }

  function markRead(id: number | string) {
    const item = notifications.value.find((current) => current.id === id);
    if (item) {
      item.isRead = true;
    }
  }

  function remove(id: number | string) {
    notifications.value = notifications.value.filter((item) => item.id !== id);
  }

  function markAllRead() {
    notifications.value.forEach((item) => {
      item.isRead = true;
    });
  }

  return {
    clear,
    markAllRead,
    markRead,
    notifications,
    poll,
    remove,
  };
}

function readDocumentVisible() {
  return typeof document === 'undefined'
    ? true
    : document.visibilityState === 'visible';
}

function hasRouteRecord(routes: RouteRecordRaw[]): boolean {
  return routes.some((route): boolean => {
    if (
      route.name === BACKGROUND_TASK_ROUTE_NAME ||
      route.path === BACKGROUND_TASK_ROUTE_PATH
    ) {
      return true;
    }

    return route.children ? hasRouteRecord(route.children) : false;
  });
}

export function useBackgroundTaskNotifications(
  options: Pick<BackgroundTaskNotificationOptions, 'notifyTerminal'> = {},
) {
  const router = useRouter();
  const accessStore = useAccessStore();
  const state = createBackgroundTaskNotificationState({
    notifyTerminal: options.notifyTerminal,
  });
  const isDocumentVisible = ref(readDocumentVisible());
  let timer: number | undefined;

  function resolveGate(): BackgroundTaskNotificationGate {
    return {
      accessToken: accessStore.accessToken,
      isAccessChecked: accessStore.isAccessChecked,
      isDocumentVisible: isDocumentVisible.value,
      isRouteAvailable:
        router.hasRoute(BACKGROUND_TASK_ROUTE_NAME) ||
        hasRouteRecord(accessStore.accessRoutes),
    };
  }

  function pollNow() {
    void state.poll(resolveGate());
  }

  function syncDocumentVisibility() {
    isDocumentVisible.value = readDocumentVisible();
    pollNow();
  }

  function viewAll() {
    void router.push(BACKGROUND_TASK_ROUTE_PATH);
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', syncDocumentVisibility);
    timer = window.setInterval(pollNow, POLL_INTERVAL_MS);
    pollNow();
  });

  onBeforeUnmount(() => {
    document.removeEventListener('visibilitychange', syncDocumentVisibility);
    if (timer) {
      window.clearInterval(timer);
    }
  });

  watch(
    () => [
      accessStore.accessToken,
      accessStore.isAccessChecked,
      accessStore.accessRoutes.length,
      isDocumentVisible.value,
    ],
    pollNow,
    { immediate: true },
  );

  return {
    ...state,
    viewAll,
  };
}
