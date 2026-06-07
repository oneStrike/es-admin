// 审核策略配置
export const topicReviewPolicy = [
  {
    label: '不额外审核',
    value: 0,
  },
  {
    label: '严重敏感词额外进入待审',
    value: 1,
  },
  {
    label: '一般及以上额外进入待审',
    value: 2,
  },
  {
    label: '任意敏感词额外进入待审',
    value: 3,
  },
  {
    label: '全部人工审核',
    value: 4,
  },
];
