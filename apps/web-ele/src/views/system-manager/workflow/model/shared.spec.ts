import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  formatWorkflowErrorTitle,
  knownWorkflowErrorCodes,
  workflowErrorPresenters,
} from './error-presenter';
import {
  buildWorkflowItemPageRequest,
  buildWorkflowManagerRoute,
  buildWorkflowPageRequest,
  canArchiveWorkflow,
  canCancelWorkflow,
  canManualRetryItem,
  canRetryWorkflowItems,
  createWorkflowImageProgressActiveState,
  formatWorkflowAttemptStatus,
  formatWorkflowItemImageProgress,
  formatWorkflowItemProblem,
  formatWorkflowItemRetrySummary,
  formatWorkflowItemStatus,
  formatWorkflowJobProgress,
  formatWorkflowJobStatus,
  getWorkflowItemCheckboxDisabledReason,
  workflowItemColumns,
  workflowItemSearchSchema,
  workflowSearchSchema,
  workflowTypeOptions,
} from './shared';

function readServerWorkflowErrorCodes() {
  const relativePath = [
    'libs',
    'platform',
    'src',
    'modules',
    'workflow',
    'workflow-error-facts.ts',
  ];
  const candidates = [
    resolve(process.cwd(), '..', 'es-server', ...relativePath),
    resolve(process.cwd(), 'es-server', ...relativePath),
  ];
  const sourcePath = candidates.find((candidate) => existsSync(candidate));
  if (!sourcePath) {
    throw new Error('Cannot locate server workflow error registry');
  }

  const source = readFileSync(sourcePath, 'utf8');
  const enumBody = source.match(
    /export enum WorkflowErrorCodeEnum \{([\s\S]*?)\n\}/,
  );
  const registryBody = source.match(
    /export const WORKFLOW_ERROR_CODES = \{([\s\S]*?)\n\} as const satisfies/,
  );
  if (!enumBody?.[1] || !registryBody?.[1]) {
    throw new Error('Cannot parse server workflow error registry');
  }

  const enumValues = new Map(
    [...enumBody[1].matchAll(/([A-Z0-9_]+)\s*=\s*'([^']+)'/g)].map(
      ([, key, value]) => [key, value],
    ),
  );

  return [
    ...registryBody[1].matchAll(/\[WorkflowErrorCodeEnum\.([A-Z0-9_]+)\]/g),
  ].map(([, key]) => {
    const value = enumValues.get(key);
    if (!value) {
      throw new Error(`Unknown server workflow error enum key: ${key}`);
    }
    return value;
  });
}

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

  it('shows automatic retry diagnostics as a dedicated item column', () => {
    expect(workflowItemColumns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'nextRetryAt',
          formatter: expect.any(Function),
          slots: { default: 'nextRetryAt' },
          title: '自动重试',
        }),
      ]),
    );
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

  it('explains disabled retry selection for auto retry and other item states', () => {
    expect(
      getWorkflowItemCheckboxDisabledReason({
        nextRetryAt: '2026-05-18T08:30:00.000Z',
        status: 5,
      }),
    ).toBe('等待自动重试，终态失败后才可手动重试');
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
        lastRetry: {
          code: 'CONTENT_IMPORT_RATE_LIMITED',
          context: { nextRetryAt: '2026-05-18T08:30:00.000Z' },
          domain: 'content-import',
          retryable: true,
          severity: 'warning',
          stage: 'rate-limit',
        },
        maxAutoRetries: 3,
        nextRetryAt: '2026-05-18T08:30:00.000Z',
        status: 5,
      }),
    ).toBe(
      '等待自动重试，预计 2026-05-18 16:30:00，自动重试 2/3，请求太频繁，稍后会自动继续',
    );
    expect(
      formatWorkflowItemRetrySummary({
        autoRetryCount: 2,
        lastRetry: {
          code: 'ATTEMPT_LEASE_EXPIRED',
          context: {},
          domain: 'workflow',
          retryable: false,
          severity: 'error',
          stage: 'lease-recovery',
        },
        maxAutoRetries: 3,
        nextRetryAt: null,
        status: 5,
      }),
    ).toBe('等待恢复执行，自动重试 2/3，执行占用已过期，系统已进入恢复处理');
    expect(
      formatWorkflowItemRetrySummary({
        autoRetryCount: 0,
        lastRetry: null,
        maxAutoRetries: 3,
        nextRetryAt: null,
        status: 4,
      }),
    ).toBe('-');
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

  it('shows expected image total for a pending inactive import row', () => {
    expect(
      formatWorkflowItemImageProgress(
        {
          imageSuccessCount: 0,
          imageTotal: 53,
          itemId: 'item-1',
          providerChapterId: 'chapter-1',
          status: 1,
        },
        {
          isActive: false,
          progressDetail: undefined,
        },
      ),
    ).toBe('0/53');
  });

  it('shows item problems from frontend-owned mappings', () => {
    expect(
      formatWorkflowItemProblem({
        code: 'CONTENT_IMPORT_RATE_LIMITED',
        context: {},
        domain: 'content-import',
        retryable: true,
        severity: 'warning',
        stage: 'rate-limit',
      }),
    ).toBe('请求太频繁，稍后会自动继续');
  });

  it('formats workflow progress from frontend-owned mappings', () => {
    expect(
      formatWorkflowJobProgress({
        progressCode: 'CONTENT_IMPORT_PROGRESS_UPDATED',
        progressContext: {
          completedItemCount: 2,
          imageSuccessCount: 19,
          imageTotal: 21,
          progressState: 'updated',
          selectedItemCount: 5,
          workflowType: 'content-import.third-party-import',
        },
        progressDetail: null,
      }),
    ).toBe('章节导入进度：图片 19/21，章节 2/5');
  });

  it('keeps the local presenter code list in sync with the server registry', () => {
    expect([...knownWorkflowErrorCodes].toSorted()).toEqual(
      readServerWorkflowErrorCodes().toSorted(),
    );
  });

  it('has a presenter mapping for every server workflow/archive code', () => {
    for (const code of readServerWorkflowErrorCodes()) {
      expect(
        workflowErrorPresenters[code as keyof typeof workflowErrorPresenters],
      ).toBeTypeOf('function');
    }
  });

  it('uses a stable fallback for unknown workflow error codes', () => {
    expect(
      formatWorkflowErrorTitle({ code: 'NEW_SERVER_CODE', context: {} }),
    ).toBe('未知错误（NEW_SERVER_CODE）');
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
