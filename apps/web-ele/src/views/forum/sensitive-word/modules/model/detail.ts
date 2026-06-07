import type { BaseSensitiveWordDto } from '#/api/types';

import { formatUTC } from '#/utils';

import {
  matchModeOptions,
  sensitiveWordLevelOptions,
  sensitiveWordTypeOptions,
} from './constants';

export function getDetailSections(detail: BaseSensitiveWordDto) {
  return [
    {
      title: '基本信息',
      show: true,
      items: [
        {
          label: '敏感词',
          value: detail?.word || '-',
          type: 'text' as const,
        },
        {
          label: '敏感词类型',
          value:
            sensitiveWordTypeOptions.find((item) => item.value === detail?.type)
              ?.label || '-',
          type: 'text' as const,
        },
        {
          label: '敏感词级别',
          value:
            sensitiveWordLevelOptions.find(
              (item) => item.value === detail?.level,
            )?.label || '-',
          type: 'text' as const,
        },
        {
          label: '匹配模式',
          value:
            matchModeOptions.find((item) => item.value === detail?.matchMode)
              ?.label || '-',
          type: 'text' as const,
        },
        {
          label: '替换词',
          value: detail?.replaceWord || '-',
          type: 'text' as const,
        },
        {
          label: '备注',
          value: detail?.remark || '-',
          type: 'text' as const,
        },
        {
          label: '是否启用',
          value: detail?.isEnabled,
          type: 'tag' as const,
          tagType: detail?.isEnabled ? 'success' : 'danger',
          tagText: detail?.isEnabled ? '是' : '否',
        },
      ],
    },
    {
      title: '其他信息',
      show: true,
      items: [
        {
          label: '创建时间',
          value: detail?.createdAt
            ? formatUTC(detail.createdAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
        {
          label: '更新时间',
          value: detail?.updatedAt
            ? formatUTC(detail.updatedAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
      ],
    },
  ];
}
