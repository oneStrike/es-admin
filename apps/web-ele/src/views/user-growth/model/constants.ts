/**
 * 用户成长相关类型定义（积分/经验共用）
 */

export const growthTypeOptions = [
  // 论坛相关
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
  {
    label: '主题浏览',
    value: 8,
  },
  {
    label: '举报',
    value: 9,
  },

  // 漫画作品相关
  {
    label: '漫画浏览',
    value: 100,
  },
  {
    label: '漫画点赞',
    value: 101,
  },
  {
    label: '漫画收藏',
    value: 102,
  },

  // 小说作品相关
  {
    label: '小说浏览',
    value: 200,
  },
  {
    label: '小说点赞',
    value: 201,
  },
  {
    label: '小说收藏',
    value: 202,
  },

  // 漫画章节相关
  {
    label: '章节阅读',
    value: 300,
  },
  {
    label: '章节点赞',
    value: 301,
  },
  {
    label: '章节购买',
    value: 302,
  },
  {
    label: '章节下载',
    value: 303,
  },
  {
    label: '章节兑换',
    value: 304,
  },
];

export const growthTypeMap = Object.fromEntries(
  growthTypeOptions.map((option) => [option.value, option.label]),
) as Record<number, string>;
