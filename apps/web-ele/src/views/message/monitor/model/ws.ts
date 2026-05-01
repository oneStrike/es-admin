import type { MessageWsMonitorSummaryDto } from '#/api/types';

import { formatUTC } from '#/utils';

import { formatMilliseconds, formatPercent } from './shared';

export const windowHourOptions = [
  { label: '1 小时', value: 1 },
  { label: '6 小时', value: 6 },
  { label: '24 小时', value: 24 },
  { label: '72 小时', value: 72 },
];

export function getWsSummaryItems(summary?: MessageWsMonitorSummaryDto | null) {
  return [
    {
      label: 'WS 请求总数',
      tone: 'primary',
      value: summary?.requestCount ?? '-',
    },
    {
      label: 'ACK 成功率',
      tone: summary && summary.ackSuccessRate < 0.95 ? 'warning' : 'success',
      value: formatPercent(summary?.ackSuccessRate),
    },
    {
      label: 'ACK 成功数',
      tone: 'success',
      value: summary?.ackSuccessCount ?? '-',
    },
    {
      label: 'ACK 失败数',
      tone: summary?.ackErrorCount ? 'danger' : 'info',
      value: summary?.ackErrorCount ?? '-',
    },
    {
      label: '平均 ACK 延迟',
      tone: 'info',
      value: formatMilliseconds(summary?.avgAckLatencyMs),
    },
    {
      label: '连接/重连次数',
      tone: summary?.reconnectCount ? 'warning' : 'info',
      value: summary?.reconnectCount ?? '-',
    },
    {
      label: '补偿触发次数',
      tone: summary?.resyncTriggerCount ? 'warning' : 'info',
      value: summary?.resyncTriggerCount ?? '-',
    },
    {
      label: '补偿成功数',
      tone: 'success',
      value: summary?.resyncSuccessCount ?? '-',
    },
    {
      label: '补偿成功率',
      tone: summary && summary.resyncSuccessRate < 0.95 ? 'warning' : 'success',
      value: formatPercent(summary?.resyncSuccessRate),
    },
    {
      label: '快照时间',
      tone: 'info',
      value: summary?.snapshotAt
        ? formatUTC(summary.snapshotAt, 'YYYY-MM-DD HH:mm:ss')
        : '-',
    },
  ];
}
