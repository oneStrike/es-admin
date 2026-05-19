import type { NotificationItem } from '@vben/layouts';

import type {
  WorkflowNotificationItemDto,
  WorkflowNotificationListRequest,
} from '#/api/types';

import { formatUTC } from '#/utils';

import { buildWorkflowManagerRoute } from './shared';

export const workflowNotificationKinds = [
  'success',
  'retrying',
  'failed',
] as const;

export const workflowNotificationPollLimit = 20;
export const workflowNotificationStorageLimit = 50;
export const workflowNotificationStorageKey =
  'es-admin.workflow-notifications.v1';

export type WorkflowNotificationKind =
  (typeof workflowNotificationKinds)[number];

export type StoredWorkflowNotification = WorkflowNotificationItemDto & {
  isRead?: boolean;
};

export interface WorkflowNotificationState {
  cursorAfterId: null | number;
  cursorCreatedAfter: null | string;
  items: StoredWorkflowNotification[];
}

export function createEmptyWorkflowNotificationState(): WorkflowNotificationState {
  return {
    cursorAfterId: null,
    cursorCreatedAfter: null,
    items: [],
  };
}

export function isWorkflowNotificationKind(
  value: unknown,
): value is WorkflowNotificationKind {
  return workflowNotificationKinds.includes(value as WorkflowNotificationKind);
}

export function normalizeWorkflowNotificationState(
  value: unknown,
): WorkflowNotificationState {
  if (!value || typeof value !== 'object') {
    return createEmptyWorkflowNotificationState();
  }

  const raw = value as Partial<WorkflowNotificationState>;
  const items = Array.isArray(raw.items)
    ? raw.items
        .filter((item): item is StoredWorkflowNotification => {
          return (
            Boolean(item) &&
            typeof item.id === 'number' &&
            typeof item.jobId === 'string' &&
            isWorkflowNotificationKind(item.kind)
          );
        })
        .slice(0, workflowNotificationStorageLimit)
    : [];

  return {
    cursorAfterId:
      typeof raw.cursorAfterId === 'number' ? raw.cursorAfterId : null,
    cursorCreatedAfter:
      typeof raw.cursorCreatedAfter === 'string'
        ? raw.cursorCreatedAfter
        : null,
    items,
  };
}

export function buildWorkflowNotificationListRequest(
  state: WorkflowNotificationState,
): WorkflowNotificationListRequest {
  const request: WorkflowNotificationListRequest = {
    kinds: [...workflowNotificationKinds],
    limit: workflowNotificationPollLimit,
  };

  if (state.cursorCreatedAfter) {
    request.createdAfter = state.cursorCreatedAfter;
  }
  if (typeof state.cursorAfterId === 'number') {
    request.afterId = state.cursorAfterId;
  }

  return request;
}

export function seedWorkflowNotificationCursor(
  state: WorkflowNotificationState,
  serverTime: string,
): WorkflowNotificationState {
  return {
    ...state,
    cursorAfterId: null,
    cursorCreatedAfter: serverTime,
  };
}

export function appendWorkflowNotificationItems(
  state: WorkflowNotificationState,
  incoming: WorkflowNotificationItemDto[],
): {
  added: StoredWorkflowNotification[];
  state: WorkflowNotificationState;
} {
  const byId = new Map<number, StoredWorkflowNotification>();
  for (const item of state.items) {
    byId.set(item.id, item);
  }

  const added: StoredWorkflowNotification[] = [];
  for (const item of incoming) {
    if (!isWorkflowNotificationKind(item.kind) || byId.has(item.id)) {
      continue;
    }
    const stored = { ...item, isRead: false };
    byId.set(item.id, stored);
    added.push(stored);
  }

  const items = [...byId.values()]
    .toSorted((left, right) => {
      const byCreatedAt =
        Date.parse(right.createdAt) - Date.parse(left.createdAt);
      return byCreatedAt === 0 ? right.id - left.id : byCreatedAt;
    })
    .slice(0, workflowNotificationStorageLimit);

  return {
    added,
    state: {
      ...state,
      items,
    },
  };
}

export function advanceWorkflowNotificationCursor(
  state: WorkflowNotificationState,
  response: {
    nextAfterId?: null | number;
    nextCreatedAfter?: null | string;
  },
): WorkflowNotificationState {
  if (!response.nextCreatedAfter) {
    return state;
  }

  return {
    ...state,
    cursorAfterId: response.nextAfterId ?? null,
    cursorCreatedAfter: response.nextCreatedAfter,
  };
}

export function getWorkflowNotificationTitle(
  item: Pick<WorkflowNotificationItemDto, 'kind'>,
) {
  switch (item.kind) {
    case 'failed': {
      return '工作流执行失败';
    }
    case 'retrying': {
      return '工作流异常重试';
    }
    case 'success': {
      return '工作流执行完成';
    }
    default: {
      return '工作流通知';
    }
  }
}

export function getWorkflowNotificationMessage(
  item: Pick<WorkflowNotificationItemDto, 'displayName' | 'kind'>,
) {
  switch (item.kind) {
    case 'failed': {
      return `工作流【${item.displayName}】执行失败`;
    }
    case 'retrying': {
      return `工作流【${item.displayName}】执行异常正在重试`;
    }
    case 'success': {
      return `工作流【${item.displayName}】执行完成`;
    }
    default: {
      return `工作流【${item.displayName}】状态已更新`;
    }
  }
}

export function getWorkflowNotificationType(
  item: Pick<WorkflowNotificationItemDto, 'kind'>,
) {
  if (item.kind === 'success') {
    return 'success' as const;
  }
  if (item.kind === 'retrying') {
    return 'warning' as const;
  }
  return 'error' as const;
}

export function toWorkflowHeaderNotification(
  item: StoredWorkflowNotification,
  options: { avatar: string },
): NotificationItem {
  const route = buildWorkflowManagerRoute(item.jobId);
  return {
    avatar: options.avatar,
    date: formatUTC(item.createdAt),
    id: `workflow:${item.id}`,
    isRead: item.isRead,
    message: getWorkflowNotificationMessage(item),
    query: route.query,
    state: {
      workflowEventId: item.id,
    },
    title: getWorkflowNotificationTitle(item),
    workflowEventId: item.id,
    workflowJobId: item.jobId,
  };
}
