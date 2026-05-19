import type { Router } from 'vue-router';

import type { NotificationItem } from '@vben/layouts';

import type { WorkflowNotificationListResponse } from '#/api/types';

import { computed, onBeforeUnmount, ref } from 'vue';

import { ElNotification } from 'element-plus';

import { workflowNotificationListApi } from '#/api/core';

import {
  advanceWorkflowNotificationCursor,
  appendWorkflowNotificationItems,
  buildWorkflowNotificationListRequest,
  createEmptyWorkflowNotificationState,
  getWorkflowNotificationMessage,
  getWorkflowNotificationTitle,
  getWorkflowNotificationType,
  normalizeWorkflowNotificationState,
  seedWorkflowNotificationCursor,
  toWorkflowHeaderNotification,
  workflowNotificationStorageKey,
} from './notification';
import {
  buildWorkflowManagerRoute,
  WORKFLOW_MANAGER_ROUTE_NAME,
} from './shared';

type StorageLike = Pick<Storage, 'getItem' | 'removeItem' | 'setItem'>;

export interface UseWorkflowGlobalNotificationsOptions {
  avatar: () => string;
  isEnabled: () => boolean;
  pollIntervalMs?: number;
  router: Router;
  storage?: StorageLike;
}

function getStorage(storage?: StorageLike): null | StorageLike {
  if (storage) {
    return storage;
  }
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch (error) {
    console.warn('[workflow-notification] storage unavailable', error);
    return null;
  }
}

function readStoredState(storage: null | StorageLike) {
  if (!storage) {
    return createEmptyWorkflowNotificationState();
  }

  try {
    const raw = storage.getItem(workflowNotificationStorageKey);
    return normalizeWorkflowNotificationState(raw ? JSON.parse(raw) : null);
  } catch (error) {
    console.warn('[workflow-notification] storage read failed', error);
    try {
      storage.removeItem(workflowNotificationStorageKey);
    } catch (cleanupError) {
      console.warn(
        '[workflow-notification] storage cleanup failed',
        cleanupError,
      );
    }
    return createEmptyWorkflowNotificationState();
  }
}

export function useWorkflowGlobalNotifications({
  avatar,
  isEnabled,
  pollIntervalMs = 30_000,
  router,
  storage: inputStorage,
}: UseWorkflowGlobalNotificationsOptions) {
  const storage = getStorage(inputStorage);
  const state = ref(readStoredState(storage));
  const inFlight = ref(false);
  let timer: null | number = null;
  let stopped = true;

  const notifications = computed<NotificationItem[]>(() =>
    state.value.items.map((item) =>
      toWorkflowHeaderNotification(item, { avatar: avatar() }),
    ),
  );
  const showDot = computed(() =>
    state.value.items.some((item) => !item.isRead),
  );

  function persist() {
    if (!storage) {
      return;
    }
    try {
      storage.setItem(
        workflowNotificationStorageKey,
        JSON.stringify(state.value),
      );
    } catch (error) {
      console.warn('[workflow-notification] storage write failed', error);
    }
  }

  function clearTimer() {
    if (timer) {
      window.clearTimeout(timer);
      timer = null;
    }
  }

  function scheduleNextPoll() {
    clearTimer();
    if (stopped) {
      return;
    }
    timer = window.setTimeout(() => {
      void pollOnce().finally(scheduleNextPoll);
    }, pollIntervalMs);
  }

  function notify(item: WorkflowNotificationListResponse['list'][number]) {
    ElNotification({
      duration: 5000,
      message: getWorkflowNotificationMessage(item),
      onClick: () => {
        void router.push(buildWorkflowManagerRoute(item.jobId));
      },
      title: getWorkflowNotificationTitle(item),
      type: getWorkflowNotificationType(item),
    });
  }

  async function pollOnce() {
    if (!isEnabled() || inFlight.value) {
      return;
    }

    inFlight.value = true;
    try {
      const wasSeeded = Boolean(state.value.cursorCreatedAfter);
      const response = await workflowNotificationListApi(
        buildWorkflowNotificationListRequest(state.value),
      );

      if (stopped || !isEnabled()) {
        return;
      }

      if (!wasSeeded) {
        state.value = seedWorkflowNotificationCursor(
          state.value,
          response.serverTime,
        );
        persist();
        return;
      }

      const merged = appendWorkflowNotificationItems(
        state.value,
        response.list,
      );
      state.value = advanceWorkflowNotificationCursor(merged.state, response);
      persist();
      for (const item of merged.added) {
        notify(item);
      }
    } catch (error) {
      console.warn('[workflow-notification] polling failed', error);
    } finally {
      inFlight.value = false;
    }
  }

  function start() {
    if (!stopped) {
      return;
    }
    stopped = false;
    void pollOnce().finally(scheduleNextPoll);
  }

  function stop() {
    stopped = true;
    clearTimer();
  }

  function markRead(item: NotificationItem) {
    const eventId = Number(item.workflowEventId);
    state.value = {
      ...state.value,
      items: state.value.items.map((current) =>
        current.id === eventId ? { ...current, isRead: true } : current,
      ),
    };
    persist();
  }

  function remove(item: NotificationItem) {
    const eventId = Number(item.workflowEventId);
    state.value = {
      ...state.value,
      items: state.value.items.filter((current) => current.id !== eventId),
    };
    persist();
  }

  function clear() {
    state.value = {
      ...state.value,
      items: [],
    };
    persist();
  }

  function makeAll() {
    state.value = {
      ...state.value,
      items: state.value.items.map((item) => ({ ...item, isRead: true })),
    };
    persist();
  }

  function openNotification(item: NotificationItem) {
    markRead(item);
    const jobId =
      typeof item.workflowJobId === 'string' ? item.workflowJobId : '';
    if (jobId) {
      void router.push(buildWorkflowManagerRoute(jobId));
    }
  }

  function viewAll() {
    void router.push({ name: WORKFLOW_MANAGER_ROUTE_NAME });
  }

  onBeforeUnmount(stop);

  return {
    clear,
    makeAll,
    markRead,
    notifications,
    openNotification,
    pollOnce,
    remove,
    showDot,
    start,
    stop,
    viewAll,
  };
}
