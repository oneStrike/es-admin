import type { EsFormSchema } from '#/types';

import { describe, expect, it } from 'vitest';

import { deliveryColumns, deliverySearchFormSchema } from './delivery';
import { dispatchColumns, dispatchSearchFormSchema } from './dispatch';

type ColumnLike = {
  cellRender?: unknown;
  field?: string;
  formatter?: unknown;
  slots?: unknown;
  title?: unknown;
};

function getColumn(columns: ColumnLike[], field: string) {
  const column = columns.find((item) => item.field === field);
  expect(column).toBeTruthy();
  return column as ColumnLike;
}

function countColumns(columns: ColumnLike[], field: string) {
  return columns.filter((item) => item.field === field).length;
}

function expectColumnTitles(
  columns: ColumnLike[],
  expectedTitles: Record<string, string>,
) {
  Object.entries(expectedTitles).forEach(([field, title]) => {
    expect(getColumn(columns, field).title).toBe(title);
  });
}

function expectSearchFields(schema: EsFormSchema, fields: string[]) {
  expect(schema.map((item) => item.fieldName)).toEqual(fields);
}

function expectDateRangePickerContract(schema: EsFormSchema) {
  const item = schema.find(
    (schemaItem) => schemaItem.fieldName === 'dateRange',
  );

  expect(item).toMatchObject({
    component: 'DatePicker',
    componentProps: {
      clearable: true,
      endPlaceholder: '结束时间',
      startPlaceholder: '开始时间',
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
    hideLabel: true,
    label: '',
  });
}

describe('message monitor schema derivation', () => {
  it('derives dispatch search and table fields from business labels', () => {
    expectSearchFields(dispatchSearchFormSchema, [
      'dispatchId',
      'eventId',
      'eventKey',
      'domain',
      'dispatchStatus',
      'deliveryStatus',
      'projectionKey',
      'receiverUserId',
      'dateRange',
    ]);
    expectDateRangePickerContract(dispatchSearchFormSchema);
    expectColumnTitles(dispatchColumns, {
      consumer: '处理通道',
      deliveryStatus: '通知送达状态',
      dispatchId: '发送任务编号',
      dispatchStatus: '发送任务状态',
      domain: '业务模块',
      eventId: '业务事件编号',
      eventKey: '通知触发场景',
      lastError: '任务异常原因',
      nextRetryAt: '下次自动重试时间',
      processedAt: '任务处理完成时间',
      projectionKey: '通知关联标识',
      receiverUserId: '接收用户',
      retryCount: '已重试次数',
    });
    expect(countColumns(dispatchColumns, 'dateRange')).toBe(0);
  });

  it('derives delivery search and table fields without raw category fallback', () => {
    expectSearchFields(deliverySearchFormSchema, [
      'dispatchId',
      'eventId',
      'eventKey',
      'categoryKey',
      'status',
      'projectionKey',
      'receiverUserId',
      'dateRange',
    ]);
    expectDateRangePickerContract(deliverySearchFormSchema);
    expectColumnTitles(deliveryColumns, {
      categoryKey: '通知类型',
      createdAt: '创建时间',
      dispatchId: '发送任务编号',
      eventId: '业务事件编号',
      eventKey: '通知触发场景',
      failureReason: '送达失败原因',
      fallbackReason: '模板替代原因',
      id: '送达记录编号',
      lastAttemptAt: '最近发送时间',
      notificationId: '站内信编号',
      projectionKey: '通知关联标识',
      receiverUserId: '接收用户',
      status: '通知送达状态',
      templateId: '通知模板编号',
      updatedAt: '更新时间',
      usedTemplate: '使用通知模板',
    });
    expect(getColumn(deliveryColumns, 'categoryKey').slots).toEqual({
      default: 'category',
    });
    expect(getColumn(deliveryColumns, 'status').slots).toEqual({
      default: 'deliveryStatus',
    });
    expect(getColumn(deliveryColumns, 'usedTemplate').slots).toEqual({
      default: 'usedTemplate',
    });
    expect(countColumns(deliveryColumns, 'categoryLabel')).toBe(0);
    expect(countColumns(deliveryColumns, 'dateRange')).toBe(0);
  });

  it('keeps created and updated time columns appended exactly once', () => {
    expect(countColumns(deliveryColumns, 'createdAt')).toBe(1);
    expect(countColumns(deliveryColumns, 'updatedAt')).toBe(1);
    expect(getColumn(deliveryColumns, 'createdAt').cellRender).toEqual({
      name: 'CellDate',
    });
    expect(getColumn(deliveryColumns, 'updatedAt').cellRender).toEqual({
      name: 'CellDate',
    });
  });
});
