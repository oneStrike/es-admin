export const experienceTypeOptions = [
  {
    label: '发表主题',
    value: 1,
  },
  {
    label: '发表回复',
    value: 2,
  },
  {
    label: '主题被点赞',
    value: 3,
  },
  {
    label: '回复被点赞',
    value: 4,
  },
  {
    label: '主题被收藏',
    value: 5,
  },
  {
    label: '每日签到',
    value: 6,
  },
  {
    label: '管理员操作',
    value: 7,
  },
];

export const experienceTypeMap = Object.fromEntries(
  experienceTypeOptions.map((option) => [option.value, option.label]),
) as Record<number, string>;
