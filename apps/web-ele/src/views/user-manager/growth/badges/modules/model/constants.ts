export const badgeTypeOptions = [
  {
    label: '系统徽章',
    value: 1,
  },
  {
    label: '成就徽章',
    value: 2,
  },
  {
    label: '活动徽章',
    value: 3,
  },
];

export const badgeTypeMap = Object.fromEntries(
  badgeTypeOptions.map((option) => [option.value, option.label]),
) as Record<number, string>;
