export type RewardAssetType = number;

export type RewardConfigAssetOption = {
  assetKeyLabel?: string;
  assetKeyPlaceholder?: string;
  defaultAssetKey?: string;
  label: string;
  supportsAssetKey?: boolean;
  supportsIcon?: boolean;
  value: RewardAssetType;
};

export type RewardConfigItemValue = {
  amount: number;
  assetKey?: null | string;
  assetType: RewardAssetType;
  iconUrl?: null | string;
};

export type RewardConfigValue = {
  rewardItems: RewardConfigItemValue[];
  rewardOverviewIconUrl?: string;
};
