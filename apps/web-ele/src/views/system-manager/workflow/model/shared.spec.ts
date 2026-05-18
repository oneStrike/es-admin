import { describe, expect, it } from 'vitest';

import {
  buildWorkflowItemPageRequest,
  buildWorkflowManagerRoute,
  buildWorkflowPageRequest,
  canArchiveWorkflow,
  canCancelWorkflow,
  canRetryWorkflowItems,
  createWorkflowImageProgressActiveState,
  formatWorkflowAttemptStatus,
  formatWorkflowItemImageProgress,
  formatWorkflowJobStatus,
  formatWorkflowItemStatus,
  formatWorkflowItemErrorMessage,
  workflowItemSearchSchema,
  workflowSearchSchema,
  workflowTypeOptions,
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
      archiveScope: 'active',
      pageIndex: 2,
      pageSize: 30,
      startDate: '2026-05-01 00:00:00',
      status: 5,
      workflowType: 'content-import.archive-import',
    });
  });

  it('uses a dropdown for workflow type search', () => {
    const workflowTypeField = workflowSearchSchema.find(
      (item) => item.fieldName === 'workflowType',
    );

    expect(workflowTypeField).toMatchObject({
      component: 'Select',
      componentProps: {
        options: workflowTypeOptions,
        placeholder: '工作流类型',
      },
    });
  });

  it('builds archived and all workflow page requests from archive scope filters', () => {
    expect(
      buildWorkflowPageRequest({
        currentPage: 1,
        filters: { archiveScope: 'archived' },
        pageSize: 15,
      }),
    ).toMatchObject({
      archiveScope: 'archived',
      pageIndex: 1,
      pageSize: 15,
    });
    expect(
      buildWorkflowPageRequest({
        currentPage: 1,
        filters: { archiveScope: 'all' },
        pageSize: 15,
      }),
    ).toMatchObject({
      archiveScope: 'all',
    });
  });

  it('builds workflow item page request with detail pagination', () => {
    expect(
      buildWorkflowItemPageRequest({
        currentPage: 3,
        filters: {
          dateRange: ['2026-05-01 00:00:00', '2026-05-02 00:00:00'],
          status: 4,
        },
        jobId: ' job-001 ',
        pageSize: 45,
        sorts: [{ field: 'updatedAt', order: 'desc' }],
      }),
    ).toEqual({
      endDate: '2026-05-02 00:00:00',
      jobId: 'job-001',
      orderBy: JSON.stringify([{ updatedAt: 'desc' }]),
      pageIndex: 3,
      pageSize: 45,
      startDate: '2026-05-01 00:00:00',
      status: 4,
    });
  });

  it('uses a dropdown for workflow item status search', () => {
    expect(
      workflowItemSearchSchema.find((item) => item.fieldName === 'status'),
    ).toMatchObject({
      component: 'Select',
      componentProps: {
        placeholder: '章节状态',
      },
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

  it('shows active cancellation as canceling and suppresses duplicate cancel', () => {
    const job = {
      cancelRequestedAt: '2026-05-18T03:00:00.000Z',
      status: 3 as const,
    };

    expect(formatWorkflowJobStatus(job).label).toBe('取消中');
    expect(canCancelWorkflow(job)).toBe(false);
  });

  it('does not treat cancel-requested workflows as active image progress sources', () => {
    expect(
      createWorkflowImageProgressActiveState({
        cancelRequestedAt: '2026-05-18T03:00:00.000Z',
        status: 3,
      }),
    ).toBe(false);
    expect(
      createWorkflowImageProgressActiveState({
        cancelRequestedAt: null,
        status: 3,
      }),
    ).toBe(true);
  });

  it('allows archiving terminal non-archived jobs only', () => {
    expect(canArchiveWorkflow({ archivedAt: null, status: 4 })).toBe(true);
    expect(canArchiveWorkflow({ archivedAt: null, status: 8 })).toBe(true);
    expect(canArchiveWorkflow({ archivedAt: null, status: 3 })).toBe(false);
    expect(
      canArchiveWorkflow({
        archivedAt: '2026-05-18T03:00:00.000Z',
        status: 4,
      }),
    ).toBe(false);
  });

  it('does not allow retrying when selection is empty or contains non-failed items', () => {
    expect(canRetryWorkflowItems({ jobId: 'job-001' }, [])).toBe(false);
    expect(
      canRetryWorkflowItems({ jobId: 'job-001' }, [
        { status: 4 },
        { status: 3 },
      ]),
    ).toBe(false);
    expect(canRetryWorkflowItems(null, [{ status: 4 }])).toBe(false);
  });

  it('overlays live image progress for the matching running workflow item', () => {
    expect(
      formatWorkflowItemImageProgress(
        {
          imageSuccessCount: 0,
          imageTotal: 0,
          itemId: 'item-1',
          providerChapterId: 'chapter-1',
          status: 2,
        },
        {
          isActive: true,
          progressDetail: {
            kind: 'content-import.image',
            workflowType: 'content-import.third-party-import',
            itemId: 'item-1',
            providerChapterId: 'chapter-1',
            imageIndex: 19,
            imageTotal: 21,
          },
        },
      ),
    ).toBe('19/21');
  });

  it('matches live image progress by provider or local chapter fallback', () => {
    expect(
      formatWorkflowItemImageProgress(
        {
          imageSuccessCount: 0,
          imageTotal: 0,
          itemId: 'item-other',
          providerChapterId: 'chapter-2',
          status: 2,
        },
        {
          isActive: true,
          progressDetail: {
            kind: 'content-import.image',
            workflowType: 'content-import.third-party-sync',
            providerChapterId: 'chapter-2',
            imageIndex: 3,
            imageTotal: 8,
          },
        },
      ),
    ).toBe('3/8');
    expect(
      formatWorkflowItemImageProgress(
        {
          imageSuccessCount: 0,
          imageTotal: 0,
          itemId: 'item-other',
          localChapterId: 101,
          providerChapterId: null,
          status: 2,
        },
        {
          isActive: true,
          progressDetail: {
            kind: 'content-import.image',
            workflowType: 'content-import.archive-import',
            localChapterId: 101,
            imageIndex: 4,
            imageTotal: 9,
          },
        },
      ),
    ).toBe('4/9');
  });

  it('keeps persisted image counters for inactive, terminal, malformed, or non-matching rows', () => {
    const row = {
      imageSuccessCount: 2,
      imageTotal: 5,
      itemId: 'item-1',
      providerChapterId: 'chapter-1',
      status: 3,
    };
    const progressDetail = {
      kind: 'content-import.image',
      workflowType: 'content-import.third-party-import',
      itemId: 'item-1',
      imageIndex: 4,
      imageTotal: 5,
    };

    expect(
      formatWorkflowItemImageProgress(row, {
        isActive: true,
        progressDetail,
      }),
    ).toBe('2/5');
    expect(
      formatWorkflowItemImageProgress(
        { ...row, status: 2 },
        {
          isActive: false,
          progressDetail,
        },
      ),
    ).toBe('2/5');
    expect(
      formatWorkflowItemImageProgress(
        { ...row, status: 2 },
        {
          isActive: true,
          progressDetail: { ...progressDetail, imageTotal: 0 },
        },
      ),
    ).toBe('2/5');
    expect(
      formatWorkflowItemImageProgress(
        { ...row, status: 2 },
        {
          isActive: true,
          progressDetail: { ...progressDetail, itemId: 'item-other' },
        },
      ),
    ).toBe('2/5');
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
