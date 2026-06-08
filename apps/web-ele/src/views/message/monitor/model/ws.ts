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
      label: '实时消息下发量',
      tone: 'primary',
      value: summary?.requestCount ?? '-',
    },
    {
      label: '消息确认成功率',
      tone: 'info',
      value: formatPercent(summary?.ackSuccessRate),
    },
    {
      label: '已确认消息数',
      tone: 'success',
      value: summary?.ackSuccessCount ?? '-',
    },
    {
      label: '确认失败消息数',
      tone: summary?.ackErrorCount ? 'danger' : 'info',
      value: summary?.ackErrorCount ?? '-',
    },
    {
      label: '平均确认耗时',
      tone: 'info',
      value: formatMilliseconds(summary?.avgAckLatencyMs),
    },
    {
      label: '连接恢复次数',
      tone: summary?.reconnectCount ? 'warning' : 'info',
      value: summary?.reconnectCount ?? '-',
    },
    {
      label: '消息补偿次数',
      tone: summary?.resyncTriggerCount ? 'warning' : 'info',
      value: summary?.resyncTriggerCount ?? '-',
    },
    {
      label: '跨实例跳过次数',
      tone: summary?.fanoutSkippedCount ? 'danger' : 'info',
      value: summary?.fanoutSkippedCount ?? '-',
    },
    {
      label: '跨实例发布失败',
      tone: summary?.fanoutPublishErrorCount ? 'danger' : 'info',
      value: summary?.fanoutPublishErrorCount ?? '-',
    },
    {
      label: '补偿成功次数',
      tone: 'success',
      value: summary?.resyncSuccessCount ?? '-',
    },
    {
      label: '补偿成功率',
      tone: 'info',
      value: formatPercent(summary?.resyncSuccessRate),
    },
    {
      label: '数据更新时间',
      tone: 'info',
      value: summary?.snapshotAt
        ? formatUTC(summary.snapshotAt, 'YYYY-MM-DD HH:mm:ss')
        : '-',
    },
  ];
}

export function getRealtimeSummaryText(
  summary?: MessageWsMonitorSummaryDto | null,
) {
  if (!summary) {
    return '选择统计窗口查看实时消息运行情况';
  }
  if (summary.realtimeDeploymentRisk) {
    return (
      summary.realtimeDeploymentConstraint ||
      '当前窗口存在跨实例实时推送风险，请关注补偿拉取是否正常'
    );
  }
  if (summary.ackErrorCount > 0) {
    return `当前窗口有 ${summary.ackErrorCount} 次确认失败，请结合送达明细查看`;
  }
  if (summary.reconnectCount > 0 || summary.resyncTriggerCount > 0) {
    return '当前窗口出现连接恢复或消息补偿记录，请关注趋势变化';
  }

  return '当前窗口暂无确认失败、连接恢复或补偿记录';
}
