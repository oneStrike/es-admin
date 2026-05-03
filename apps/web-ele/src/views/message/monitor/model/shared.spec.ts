import { describe, expect, it } from 'vitest';

import {
  attentionSummaryQueries,
  dispatchStatusOptions,
  getMonitorNotificationCategoryLabel,
  getPageTotal,
  splitDateRange,
} from './shared';

describe('message monitor shared helpers', () => {
  it('keeps attention summaries on page-size-one total queries', () => {
    expect(attentionSummaryQueries.failedDelivery).toEqual({
      pageIndex: 1,
      pageSize: 1,
      status: 2,
    });
    expect(attentionSummaryQueries.retryingDelivery).toEqual({
      pageIndex: 1,
      pageSize: 1,
      status: 3,
    });
    expect(attentionSummaryQueries.failedDispatch).toEqual({
      dispatchStatus: 3,
      pageIndex: 1,
      pageSize: 1,
    });
  });

  it('splits date ranges into backend contract fields', () => {
    expect(
      splitDateRange({
        dateRange: ['2026-05-01', '2026-05-03'],
        empty: '',
        eventKey: 'topic_like',
        keepZero: 0,
        nil: null,
      }),
    ).toEqual({
      endDate: '2026-05-03',
      eventKey: 'topic_like',
      keepZero: 0,
      startDate: '2026-05-01',
    });
  });

  it('reads totals from existing page responses only', () => {
    expect(getPageTotal({ total: 12 })).toBe(12);
    expect(getPageTotal({})).toBe(0);
    expect(getPageTotal(null)).toBe(0);
  });

  it('resolves notification category as a business label', () => {
    expect(
      getMonitorNotificationCategoryLabel({
        categoryKey: 'topic_like',
      }),
    ).toBe('主题点赞');
    expect(
      getMonitorNotificationCategoryLabel({
        categoryKey: 'topic_like',
        categoryLabel: '自定义业务通知',
      }),
    ).toBe('自定义业务通知');
    expect(
      getMonitorNotificationCategoryLabel({
        categoryKey: 'raw_unknown_category',
      }),
    ).toBe('未识别通知类型');
  });

  it('uses business status names for dispatch states', () => {
    expect(dispatchStatusOptions.map((item) => item.label)).toEqual([
      '等待发送',
      '发送处理中',
      '发送任务成功',
      '发送任务失败',
    ]);
  });
});
