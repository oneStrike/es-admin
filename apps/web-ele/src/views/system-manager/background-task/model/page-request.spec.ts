import { describe, expect, it } from 'vitest';

import { buildBackgroundTaskPageRequest } from './page-request';

describe('background task page request model', () => {
  it('emits only pagination fields when filters are empty', () => {
    expect(
      buildBackgroundTaskPageRequest({
        currentPage: 1,
        pageSize: 15,
      }),
    ).toEqual({
      pageIndex: 1,
      pageSize: 15,
    });
  });

  it('normalizes whitelisted filters before sending them to the backend', () => {
    expect(
      buildBackgroundTaskPageRequest({
        currentPage: 2,
        filters: {
          dateRange: ['2026-05-01 00:00:00', '2026-05-16 23:59:59'],
          ignored: 'ui-only',
          status: 5,
          taskId: '  task-1001  ',
          taskType: '  content.third-party-comic-import  ',
        },
        pageSize: 30,
      }),
    ).toEqual({
      endDate: '2026-05-16 23:59:59',
      pageIndex: 2,
      pageSize: 30,
      startDate: '2026-05-01 00:00:00',
      status: 5,
      taskId: 'task-1001',
      taskType: 'content.third-party-comic-import',
    });
  });

  it('omits invalid filter values instead of leaking UI state', () => {
    expect(
      buildBackgroundTaskPageRequest({
        currentPage: 3,
        filters: {
          dateRange: ['2026-05-01 00:00:00', null],
          status: '5',
          taskId: '   ',
          taskType: '',
        },
        pageSize: 45,
      }),
    ).toEqual({
      pageIndex: 3,
      pageSize: 45,
      startDate: '2026-05-01 00:00:00',
    });
  });

  it('serializes supported remote sort fields as backend orderBy', () => {
    expect(
      buildBackgroundTaskPageRequest({
        currentPage: 4,
        pageSize: 75,
        sorts: [
          { field: 'startedAt', order: 'desc' },
          { field: 'updatedAt', order: 'asc' },
        ],
      }),
    ).toEqual({
      orderBy: JSON.stringify([{ startedAt: 'desc' }, { updatedAt: 'asc' }]),
      pageIndex: 4,
      pageSize: 75,
    });
  });

  it('keeps page size changes independent from filter state', () => {
    expect(
      buildBackgroundTaskPageRequest({
        currentPage: 1,
        filters: { taskId: 'task-1' },
        pageSize: 100,
      }),
    ).toMatchObject({
      pageIndex: 1,
      pageSize: 100,
      taskId: 'task-1',
    });
  });
});
