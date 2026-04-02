import { describe, expect, it } from 'vitest';

import {
  planColumns,
  planSearchFormSchema,
  reconciliationColumns,
  reconciliationSearchFormSchema,
} from './shared';

function getColumnKey(column: { field?: null | string; type?: null | string }) {
  return column.type || column.field;
}

describe('check-in shared model schema exports', () => {
  it('normalizes the plan search schema with helper defaults', () => {
    expect(planSearchFormSchema.map((item) => item.fieldName)).toEqual([
      'planCode',
      'planName',
      'status',
    ]);

    for (const item of planSearchFormSchema) {
      expect(item.label).toBe('');
      expect(item.hideLabel).toBe(true);
      expect(item.rules).toBe('');
    }

    expect(planSearchFormSchema[2]).toMatchObject({
      component: 'Select',
      fieldName: 'status',
      componentProps: expect.objectContaining({
        class: 'w-[280px]',
        clearable: true,
        placeholder: '计划状态',
      }),
    });
  });

  it('derives the plan columns through the shared helper pattern', () => {
    expect(planColumns.map((column) => getColumnKey(column))).toEqual([
      'seq',
      'planName',
      'planCode',
      'status',
      'cycleType',
      'startDate',
      'allowMakeupCountPerCycle',
      'baseRewardConfig',
      'updatedAt',
      'actions',
    ]);

    expect(planColumns[0]).toMatchObject({
      fixed: 'left',
      type: 'seq',
    });
    expect(planColumns.at(-1)).toMatchObject({
      field: 'actions',
      fixed: 'right',
      slots: { default: 'planActions' },
    });
  });

  it('normalizes the reconciliation search schema with helper defaults', () => {
    expect(reconciliationSearchFormSchema.map((item) => item.fieldName)).toEqual([
      'userId',
      'planId',
      'cycleId',
      'recordId',
      'grantId',
      'rewardStatus',
      'grantStatus',
      'dateRange',
    ]);

    for (const item of reconciliationSearchFormSchema) {
      expect(item.label).toBe('');
      expect(item.hideLabel).toBe(true);
      expect(item.rules).toBe('');
    }

    expect(reconciliationSearchFormSchema.at(-1)).toMatchObject({
      component: 'DatePicker',
      fieldName: 'dateRange',
      componentProps: expect.objectContaining({
        class: 'w-[280px]',
        clearable: true,
        endPlaceholder: '签到结束日期',
        startPlaceholder: '签到开始日期',
        type: 'daterange',
        valueFormat: 'YYYY-MM-DD',
      }),
    });
  });

  it('derives the reconciliation columns through the shared helper pattern', () => {
    expect(reconciliationColumns.map((column) => getColumnKey(column))).toEqual([
      'seq',
      'recordId',
      'signDate',
      'userId',
      'planId',
      'cycleId',
      'rewardStatus',
      'baseRewardLedgerIds',
      'grants',
      'lastRewardError',
      'createdAt',
      'actions',
    ]);

    expect(reconciliationColumns[0]).toMatchObject({
      fixed: 'left',
      type: 'seq',
    });
    expect(reconciliationColumns.at(-1)).toMatchObject({
      field: 'actions',
      slots: { default: 'reconciliationActions' },
    });
  });
});
