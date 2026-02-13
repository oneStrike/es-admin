import type {
  EventsPageRequest,
  EventsPageResponse,
} from '../../types/user-growth/events.d';

import { requestClient } from '#/api/request';

/**
 * 获取成长事件分页
 */
export async function eventsPageApi(
  params?: EventsPageRequest,
): Promise<EventsPageResponse> {
  return requestClient.get<EventsPageResponse>(
    '/api/admin/user-growth/events/page',
    { params },
  );
}
