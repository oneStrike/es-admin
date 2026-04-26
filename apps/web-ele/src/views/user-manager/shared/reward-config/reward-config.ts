import type {
  RewardConfigAssetOption,
  RewardConfigItemValue,
  RewardConfigValue,
} from './reward-config.types';

export const defaultRewardAssetOptions: RewardConfigAssetOption[] = [
  {
    defaultAssetKey: '',
    label: '积分',
    supportsIcon: true,
    value: 1,
  },
  {
    defaultAssetKey: '',
    label: '经验',
    supportsIcon: true,
    value: 2,
  },
];

export function normalizeOptionalString(value?: null | string) {
  const text = typeof value === 'string' ? value.trim() : '';
  return text || undefined;
}

export function createEmptyRewardConfigValue(): RewardConfigValue {
  return {
    rewardItems: [],
    rewardOverviewIconUrl: undefined,
  };
}

export function cloneRewardItems<T extends RewardConfigItemValue>(
  rewardItems?: null | T[],
): T[] {
  return (rewardItems || []).map((item) => ({
    ...item,
    amount: Number(item.amount),
    assetKey: normalizeOptionalString(item.assetKey) ?? '',
    iconUrl: normalizeOptionalString(item.iconUrl),
  }));
}

export function cloneRewardConfigValue(
  value?: null | Partial<RewardConfigValue>,
): RewardConfigValue {
  return {
    rewardItems: cloneRewardItems(value?.rewardItems),
    rewardOverviewIconUrl: normalizeOptionalString(value?.rewardOverviewIconUrl),
  };
}

export function hasRewardItems(rewardItems?: null | RewardConfigItemValue[]) {
  return (rewardItems || []).length > 0;
}

export function createRewardItemValue(
  assetOptions: RewardConfigAssetOption[] = defaultRewardAssetOptions,
  assetType = assetOptions[0]?.value ?? 1,
): RewardConfigItemValue {
  const assetOption = getRewardAssetOption(assetType, assetOptions);

  return {
    amount: 1,
    assetKey: assetOption?.defaultAssetKey ?? '',
    assetType,
    iconUrl: undefined,
  };
}

export function getRewardAssetOption(
  assetType?: RewardConfigItemValue['assetType'],
  assetOptions: RewardConfigAssetOption[] = defaultRewardAssetOptions,
) {
  return assetOptions.find((option) => option.value === assetType);
}

export function normalizeRewardItem(
  item: RewardConfigItemValue,
  assetOptions: RewardConfigAssetOption[] = defaultRewardAssetOptions,
): RewardConfigItemValue {
  const assetOption = getRewardAssetOption(item.assetType, assetOptions);

  return {
    ...item,
    amount: Number(item.amount),
    assetKey: assetOption?.supportsAssetKey
      ? normalizeOptionalString(item.assetKey)
      : (assetOption?.defaultAssetKey ?? ''),
    assetType: Number(item.assetType) as RewardConfigItemValue['assetType'],
    iconUrl: assetOption?.supportsIcon
      ? normalizeOptionalString(item.iconUrl)
      : undefined,
  };
}

export function formatRewardSummary(
  rewardItems?: null | RewardConfigItemValue[],
  assetOptions: RewardConfigAssetOption[] = defaultRewardAssetOptions,
) {
  if (!rewardItems?.length) {
    return '未配置';
  }

  return rewardItems
    .map((item) => {
      const assetOption = getRewardAssetOption(item.assetType, assetOptions);
      const assetLabel =
        assetOption?.label ||
        (item.assetKey
          ? `资产 ${item.assetType} / ${item.assetKey}`
          : `资产 ${item.assetType}`);

      return `${assetLabel} ${Number(item.amount)}`;
    })
    .join(' / ');
}
