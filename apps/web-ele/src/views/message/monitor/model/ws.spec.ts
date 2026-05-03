import type { MessageWsMonitorSummaryDto } from '#/api/types';

import { describe, expect, it } from 'vitest';

import { getRealtimeSummaryText, getWsSummaryItems } from './ws';

function createSummary(
  overrides: Partial<MessageWsMonitorSummaryDto> = {},
): MessageWsMonitorSummaryDto {
  return {
    ackErrorCount: 0,
    ackSuccessCount: 98,
    ackSuccessRate: 0.92,
    avgAckLatencyMs: 32,
    reconnectCount: 0,
    requestCount: 100,
    resyncSuccessCount: 4,
    resyncSuccessRate: 0.8,
    resyncTriggerCount: 0,
    snapshotAt: '2026-05-03T14:30:00.000Z',
    windowHours: 24,
    windowStartAt: '2026-05-02T14:30:00.000Z',
    ...overrides,
  };
}

describe('message monitor websocket summary model', () => {
  it('renders realtime metrics with business labels', () => {
    const labels = getWsSummaryItems(createSummary()).map((item) => item.label);

    expect(labels).toEqual([
      '实时消息下发量',
      '消息确认成功率',
      '已确认消息数',
      '确认失败消息数',
      '平均确认耗时',
      '连接恢复次数',
      '消息补偿次数',
      '补偿成功次数',
      '补偿成功率',
      '数据更新时间',
    ]);
    const legacyAckTerm = ['A', 'C', 'K'].join('');

    expect(labels.some((label) => label.includes(legacyAckTerm))).toBe(false);
    expect(labels.some((label) => label.includes('WS'))).toBe(false);
  });

  it('does not invent warning thresholds for success rates', () => {
    const items = getWsSummaryItems(createSummary());

    expect(items.find((item) => item.label === '消息确认成功率')).toMatchObject(
      {
        tone: 'info',
        value: '92.00%',
      },
    );
    expect(items.find((item) => item.label === '补偿成功率')).toMatchObject({
      tone: 'info',
      value: '80.00%',
    });
  });

  it('summarizes realtime health in operator-friendly language', () => {
    expect(getRealtimeSummaryText()).toBe('选择统计窗口查看实时消息运行情况');
    expect(getRealtimeSummaryText(createSummary({ ackErrorCount: 3 }))).toBe(
      '当前窗口有 3 次确认失败，请结合送达明细查看',
    );
    expect(getRealtimeSummaryText(createSummary({ reconnectCount: 1 }))).toBe(
      '当前窗口出现连接恢复或消息补偿记录，请关注趋势变化',
    );
    expect(getRealtimeSummaryText(createSummary())).toBe(
      '当前窗口暂无确认失败、连接恢复或补偿记录',
    );
  });
});
