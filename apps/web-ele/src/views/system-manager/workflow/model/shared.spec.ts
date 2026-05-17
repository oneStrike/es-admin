import { describe, expect, it } from 'vitest';

import {
  buildWorkflowItemPageRequest,
  buildWorkflowManagerRoute,
  buildWorkflowPageRequest,
  formatWorkflowAttemptStatus,
  formatWorkflowItemStatus,
} from './shared';

describe('workflow manager helpers', () => {
  it('builds workflow manager route with jobId query', () => {
    expect(buildWorkflowManagerRoute(' job-001 ')).toEqual({
      name: 'WorkflowManager',
      query: { jobId: 'job-001' },
    });
  });

  it('builds workflow page request from grid filters and sorts', () => {
    expect(
      buildWorkflowPageRequest({
        currentPage: 2,
        filters: {
          dateRange: ['2026-05-01 00:00:00', '2026-05-02 00:00:00'],
          jobId: ' job-001 ',
          status: 5,
          workflowType: ' content-import.archive-import ',
        },
        pageSize: 30,
        sorts: [{ field: 'updatedAt', order: 'desc' }],
      }),
    ).toEqual({
      endDate: '2026-05-02 00:00:00',
      jobId: 'job-001',
      orderBy: JSON.stringify([{ updatedAt: 'desc' }]),
      pageIndex: 2,
      pageSize: 30,
      startDate: '2026-05-01 00:00:00',
      status: 5,
      workflowType: 'content-import.archive-import',
    });
  });

  it('builds workflow item page request with detail pagination', () => {
    expect(
      buildWorkflowItemPageRequest({
        currentPage: 3,
        jobId: ' job-001 ',
        pageSize: 45,
        status: 4,
      }),
    ).toEqual({
      jobId: 'job-001',
      pageIndex: 3,
      pageSize: 45,
      status: 4,
    });
  });

  it('formats every workflow item status without collapsing states', () => {
    expect(formatWorkflowItemStatus(1).label).toBe('待处理');
    expect(formatWorkflowItemStatus(2).label).toBe('处理中');
    expect(formatWorkflowItemStatus(3).label).toBe('成功');
    expect(formatWorkflowItemStatus(4).label).toBe('失败');
    expect(formatWorkflowItemStatus(5).label).toBe('重试中');
    expect(formatWorkflowItemStatus(6).label).toBe('已跳过');
    expect(formatWorkflowItemStatus(99).label).toBe('状态 99');
  });

  it('formats workflow attempt statuses separately from item statuses', () => {
    expect(formatWorkflowAttemptStatus(4).label).toBe('部分失败');
    expect(formatWorkflowAttemptStatus(5).label).toBe('失败');
  });
});
