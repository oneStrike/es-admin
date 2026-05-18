import { describe, expect, it } from 'vitest';

import {
  buildWorkflowItemPageRequest,
  buildWorkflowManagerRoute,
  buildWorkflowPageRequest,
  buildWorkflowRecordPageRequest,
  canManualRetryItem,
  canRetryWorkflowItems,
  formatWorkflowAttemptStatus,
  formatWorkflowItemErrorMessage,
  formatWorkflowItemRetrySummary,
  formatWorkflowItemStatus,
  getWorkflowItemCheckboxDisabledReason,
  workflowItemColumns,
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

  it('builds workflow record page request with bounded pagination', () => {
    expect(
      buildWorkflowRecordPageRequest({
        currentPage: 2,
        jobId: ' job-001 ',
        pageSize: 20,
      }),
    ).toEqual({
      jobId: 'job-001',
      pageIndex: 2,
      pageSize: 20,
    });
  });

  it('prepends a checkbox column before item sequence for retry selection', () => {
    expect(workflowItemColumns[0]).toMatchObject({
      fixed: 'left',
      type: 'checkbox',
      width: 48,
    });
    expect(workflowItemColumns[1]).toMatchObject({
      title: '序号',
      type: 'seq',
    });
  });

  it('allows retrying selected failed items from an expired workflow', () => {
    expect(
      canRetryWorkflowItems({ jobId: 'job-001' }, [
        { status: 4 },
        { status: 4 },
      ]),
    ).toBe(true);
  });

  it('allows manual retry only for terminal failed items', () => {
    expect(canManualRetryItem({ status: 4 })).toBe(true);
    expect(canManualRetryItem({ status: 5 })).toBe(false);
  });

  it('does not allow retrying when selection is empty, retrying, or contains non-failed items', () => {
    expect(canRetryWorkflowItems({ jobId: 'job-001' }, [])).toBe(false);
    expect(
      canRetryWorkflowItems({ jobId: 'job-001' }, [
        { status: 4 },
        { status: 3 },
      ]),
    ).toBe(false);
    expect(
      canRetryWorkflowItems({ jobId: 'job-001' }, [
        { status: 4 },
        { status: 5 },
      ]),
    ).toBe(false);
    expect(canRetryWorkflowItems(null, [{ status: 4 }])).toBe(false);
  });

  it('explains disabled retry selection for auto retry and other item states', () => {
    expect(
      getWorkflowItemCheckboxDisabledReason({
        nextRetryAt: '2026-05-18T08:30:00.000Z',
        status: 5,
      }),
    ).toBe(
      '等待自动重试，终态失败后才可手动重试',
    );
    expect(
      getWorkflowItemCheckboxDisabledReason({ nextRetryAt: null, status: 5 }),
    ).toBe('等待恢复执行，终态失败后才可手动重试');
    expect(getWorkflowItemCheckboxDisabledReason({ status: 3 })).toBe(
      '仅终态失败章节可手动重试',
    );
    expect(getWorkflowItemCheckboxDisabledReason({ status: 4 })).toBe('');
  });

  it('formats item auto retry schedule and diagnostics', () => {
    expect(
      formatWorkflowItemRetrySummary({
        autoRetryCount: 2,
        lastRetryCode: 'HTTP_429',
        lastRetryReason: 'Request was throttled.',
        maxAutoRetries: 3,
        nextRetryAt: '2026-05-18T08:30:00.000Z',
        status: 5,
      }),
    ).toBe(
      '等待自动重试，预计 2026-05-18 16:30:00，自动重试 2/3，Request was throttled.，错误码 HTTP_429',
    );
    expect(
      formatWorkflowItemRetrySummary({
        autoRetryCount: 2,
        lastRetryCode: 'ATTEMPT_LEASE_EXPIRED',
        lastRetryReason: 'workflow attempt claim 已过期',
        maxAutoRetries: 3,
        nextRetryAt: null,
        status: 5,
      }),
    ).toBe(
      '等待恢复执行，自动重试 2/3，workflow attempt claim 已过期，错误码 ATTEMPT_LEASE_EXPIRED',
    );
    expect(
      formatWorkflowItemRetrySummary({
        autoRetryCount: 0,
        lastRetryCode: null,
        lastRetryReason: null,
        maxAutoRetries: 3,
        nextRetryAt: null,
        status: 4,
      }),
    ).toBe('-');
  });

  it('shows item problem messages without technical wording', () => {
    expect(formatWorkflowItemErrorMessage('Request was throttled.')).toBe(
      '请求太频繁，稍后会自动继续',
    );
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
