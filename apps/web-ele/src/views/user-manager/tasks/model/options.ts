import type {
  GrowthRewardItemDto,
  TaskEventTemplateOptionDto,
  TaskInstanceStepViewDto,
  TaskLatestEventSummaryDto,
  TaskTemplateFilterFieldDto,
  TaskUniqueFactSummaryDto,
} from '#/api/types';

export type TaskTemplateFilterValueDto = {
  key: string;
  label?: null | string;
  value: string;
};

export const taskSceneTypeOptions = [
  { color: 'success' as const, label: '新手任务', value: 1 },
  { color: 'primary' as const, label: '日常任务', value: 2 },
  { color: 'danger' as const, label: '活动任务', value: 4 },
];

export const taskDefinitionStatusOptions = [
  { color: 'info' as const, label: '草稿', value: 0 },
  { color: 'success' as const, label: '生效中', value: 1 },
  { color: 'warning' as const, label: '已暂停', value: 2 },
  { color: 'danger' as const, label: '已归档', value: 3 },
];

export const taskClaimModeOptions = [
  { label: '自动领取', value: 1 },
  { label: '手动领取', value: 2 },
];

export const taskRepeatTypeOptions = [
  { label: '一次性', value: 0 },
  { label: '每日', value: 1 },
  { label: '每周', value: 2 },
  { label: '每月', value: 3 },
];

export const taskStepTriggerModeOptions = [
  { label: '手动', value: 1 },
  { label: '事件驱动', value: 2 },
];

export const taskStepDedupeScopeOptions = [
  { label: '按周期唯一', value: 1 },
  { label: '终身唯一', value: 2 },
];

export const taskInstanceStatusOptions = [
  { color: 'warning' as const, label: '待开始', value: 0 },
  { color: 'primary' as const, label: '进行中', value: 1 },
  { color: 'success' as const, label: '已完成', value: 2 },
  { color: 'danger' as const, label: '已过期', value: 3 },
];

export const taskVisibleStatusOptions = [
  { color: 'success' as const, label: '可领取', value: 'claimable' },
  { color: 'warning' as const, label: '已领取', value: 'claimed' },
  { color: 'primary' as const, label: '进行中', value: 'in_progress' },
  { color: 'success' as const, label: '已完成', value: 'completed' },
  { color: 'warning' as const, label: '奖励待补偿', value: 'reward_pending' },
  { color: 'success' as const, label: '奖励已到账', value: 'reward_granted' },
  { color: 'danger' as const, label: '已过期', value: 'expired' },
  { color: 'info' as const, label: '不可用', value: 'unavailable' },
];

export const taskRewardSettlementStatusOptions = [
  { color: 'warning' as const, label: '待补偿', value: 0 },
  { color: 'success' as const, label: '已成功', value: 1 },
  { color: 'danger' as const, label: '终态失败', value: 2 },
];

export const taskRewardSettlementResultOptions = [
  { color: 'success' as const, label: '真实落账', value: 1 },
  { color: 'info' as const, label: '幂等命中', value: 2 },
  { color: 'danger' as const, label: '处理失败', value: 3 },
];

export function getOptionLabel<T extends number | string>(
  options: Array<{ label: string; value: T }>,
  value?: null | T,
) {
  return options.find((item) => item.value === value)?.label || '-';
}

export function buildTemplateKeyOptions(
  templateOptions: TaskEventTemplateOptionDto[],
) {
  return templateOptions.map((item) => ({
    disabled: !item.isSelectable,
    label: formatTaskTemplateOptionLabel(item),
    value: item.templateKey,
  }));
}

export function formatCompletionPolicy(policy?: null | number) {
  if (policy === 1) {
    return '所有步骤完成即完成';
  }
  return '-';
}

export function formatTaskTemplateOptionLabel(
  template: TaskEventTemplateOptionDto,
) {
  const parts = [
    `${template.label} (${template.templateKey})`,
    template.targetEntityType,
    getTaskTemplateImplStatusLabel(template.implStatus),
  ];

  if (!template.isSelectable) {
    parts.push('暂不可选');
  }

  return parts.join(' · ');
}

export function formatTemplateWarningHints(
  template?: null | TaskEventTemplateOptionDto,
) {
  if (!template?.warningHints?.length) {
    return '当前模板无额外提醒';
  }

  return template.warningHints.join(' / ');
}

export function formatRewardItems(rewardItems?: GrowthRewardItemDto[] | null) {
  if (!rewardItems?.length) {
    return '未配置';
  }

  return rewardItems
    .map((item) => {
      let assetLabel = `资产 ${item.assetType}`;

      if (item.assetType === 1) {
        assetLabel = '积分';
      } else if (item.assetType === 2) {
        assetLabel = '经验';
      } else if (item.assetKey) {
        assetLabel = `${item.assetType} / ${item.assetKey}`;
      }

      return `${assetLabel} ${item.amount}`;
    })
    .join(' / ');
}

export function buildTaskRewardItems(
  points?: null | number,
  experience?: null | number,
) {
  const rewardItems: GrowthRewardItemDto[] = [];
  const normalizedPoints = normalizeTaskRewardAmount(points, '奖励积分');
  const normalizedExperience = normalizeTaskRewardAmount(
    experience,
    '奖励经验',
  );

  if (normalizedPoints > 0) {
    rewardItems.push({
      amount: normalizedPoints,
      assetKey: '',
      assetType: 1,
    });
  }

  if (normalizedExperience > 0) {
    rewardItems.push({
      amount: normalizedExperience,
      assetKey: '',
      assetType: 2,
    });
  }

  return rewardItems.length > 0 ? rewardItems : undefined;
}

export function parseTaskRewardItems(
  rewardItems?: GrowthRewardItemDto[] | null,
) {
  const rewardValue = {
    experience: undefined as number | undefined,
    points: undefined as number | undefined,
  };
  const parsedAssetTypes = new Set<number>();

  for (const item of rewardItems || []) {
    assertSupportedTaskRewardItem(item);

    if (parsedAssetTypes.has(item.assetType)) {
      throw new Error(
        '当前任务奖励配置存在重复的积分或经验项，请先处理后再编辑',
      );
    }

    parsedAssetTypes.add(item.assetType);

    if (item.assetType === 1) {
      rewardValue.points = Number(item.amount);
    }
    if (item.assetType === 2) {
      rewardValue.experience = Number(item.amount);
    }
  }

  return rewardValue;
}

function assertSupportedTaskRewardItem(item: GrowthRewardItemDto) {
  if (item.assetType !== 1 && item.assetType !== 2) {
    throw new Error(
      `当前任务仅支持积分和经验奖励，存在未支持的资产类型 ${item.assetType}`,
    );
  }

  if (item.assetKey?.trim()) {
    throw new Error('当前任务积分/经验奖励不支持资产键，请先迁移该奖励配置');
  }

  normalizeTaskRewardAmount(
    item.amount,
    item.assetType === 1 ? '奖励积分' : '奖励经验',
  );
}

function normalizeTaskRewardAmount(
  value: null | number | undefined,
  label: string,
) {
  const amount = Number(value ?? 0);

  if (!Number.isFinite(amount) || amount < 0 || !Number.isInteger(amount)) {
    throw new Error(`${label}必须是非负整数`);
  }

  return amount;
}

export function formatInstanceStepSummary(
  steps?: null | TaskInstanceStepViewDto[],
) {
  if (!steps?.length) {
    return '-';
  }

  return steps
    .map((item) => {
      const statusLabel = getOptionLabel(
        taskInstanceStatusOptions,
        item.status,
      );
      return `步骤 ${item.stepId} / 进度 ${item.currentValue}/${item.targetValue} / ${statusLabel}`;
    })
    .join('\n');
}

export function formatCountingMode(dedupeScope?: null | number) {
  return dedupeScope ? '按不同对象累计' : '累计次数';
}

export function formatFilterSummary(
  filters?: null | TaskTemplateFilterValueDto[],
) {
  if (!filters?.length) {
    return '-';
  }

  return filters
    .map((item) => `${item.label || item.key}: ${item.value}`)
    .join(' / ');
}

export function formatUniqueFacts(
  uniqueFacts?: null | TaskUniqueFactSummaryDto[],
) {
  if (!uniqueFacts?.length) {
    return '-';
  }

  return uniqueFacts
    .map((item) => {
      const scopeLabel = getOptionLabel(
        taskStepDedupeScopeOptions,
        item.dedupeScope,
      );
      const parts = [`步骤 ${item.stepId}`, scopeLabel, `${item.factCount} 条`];

      if (item.latestDimensionValue) {
        parts.push(`最近维度 ${item.latestDimensionValue}`);
      }
      if (item.latestOccurredAt) {
        parts.push(`最近命中 ${item.latestOccurredAt}`);
      }

      return parts.join(' / ');
    })
    .join('\n');
}

export function formatLatestEvent(
  latestEvent?: null | TaskLatestEventSummaryDto,
) {
  if (!latestEvent) {
    return '-';
  }

  const parts = [
    latestEvent.eventBizKey ? `幂等键 ${latestEvent.eventBizKey}` : '',
    latestEvent.occurredAt ? `发生于 ${latestEvent.occurredAt}` : '',
    latestEvent.targetType ? `目标 ${latestEvent.targetType}` : '',
    typeof latestEvent.targetId === 'number'
      ? `ID ${latestEvent.targetId}`
      : '',
    latestEvent.accepted ? '已计入' : '未计入',
    latestEvent.rejectReason || '',
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(' / ') : '-';
}

export function formatJsonTextarea(value?: null | unknown) {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export function parseJsonArrayText<T>(value: unknown, label: string) {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) {
      throw new TypeError('not array');
    }
    return parsed as T[];
  } catch {
    throw new Error(`${label}必须是合法的 JSON 数组`);
  }
}

export function normalizeTaskTemplateFilters(
  filters: TaskTemplateFilterValueDto[] | undefined,
  template: TaskEventTemplateOptionDto,
) {
  if (!filters?.length) {
    return undefined;
  }

  const availableFieldMap = new Map(
    template.availableFilterFields.map((field) => [field.key, field]),
  );

  return filters.map((filter, index) => {
    const key = typeof filter?.key === 'string' ? filter.key.trim() : '';
    if (!key) {
      throw new Error(`第 ${index + 1} 条过滤条件缺少 key`);
    }

    const field = availableFieldMap.get(key);
    if (!field) {
      throw new Error(`过滤条件 ${key} 不在当前模板可选字段中`);
    }

    return {
      key,
      label: filter.label || field.label,
      value: normalizeTaskTemplateFilterValue(field, filter.value),
    };
  });
}

function getTaskTemplateImplStatusLabel(
  status: TaskEventTemplateOptionDto['implStatus'],
) {
  switch (status) {
    case 'implemented': {
      return '已接线';
    }
    case 'legacy_compat': {
      return '历史兼容';
    }
    default: {
      return '仅声明';
    }
  }
}

function normalizeTaskTemplateFilterValue(
  field: TaskTemplateFilterFieldDto,
  value: unknown,
) {
  switch (field.valueType) {
    case 'boolean': {
      if (typeof value === 'boolean') {
        return String(value);
      }

      if (typeof value === 'string') {
        const normalizedValue = value.trim().toLowerCase();
        if (normalizedValue === 'true' || normalizedValue === 'false') {
          return normalizedValue;
        }
      }

      throw new Error(`${field.label} 必须是 true 或 false`);
    }
    case 'number': {
      if (typeof value === 'number' && Number.isFinite(value)) {
        return String(value);
      }

      if (typeof value === 'string' && value.trim() !== '') {
        const normalizedValue = Number(value);
        if (!Number.isNaN(normalizedValue)) {
          return String(normalizedValue);
        }
      }

      throw new Error(`${field.label} 必须是数值`);
    }
    default: {
      const normalizedValue =
        typeof value === 'string' ? value.trim() : String(value ?? '').trim();
      if (!normalizedValue) {
        throw new Error(`${field.label} 不能为空`);
      }
      return normalizedValue;
    }
  }
}
