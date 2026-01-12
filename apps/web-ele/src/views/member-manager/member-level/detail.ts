import type { BaseMemberLevelDto } from '#/apis/types';

import { formatUTC } from '#/utils';

/**
 * 获取会员等级详情卡片配置
 * @param detail 会员等级详情数据
 * @returns 卡片配置数组
 */
export function getDetailCards(detail: BaseMemberLevelDto) {
  return [
    {
      title: '基本信息',
      show: true,
      fields: [
        {
          label: '等级图标',
          value: detail?.icon,
          type: 'image' as const,
        },
        {
          label: '等级名称',
          value: detail?.name,
          type: 'text' as const,
        },
        {
          label: '专属颜色',
          value: detail?.color,
          type: 'color' as const,
        },
        {
          label: '等级描述',
          value: detail?.description || '-',
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
      title: '升级要求',
      show: true,
      fields: [
        {
          label: '所需积分',
          value: detail?.points || 0,
          type: 'text' as const,
        },
        {
          label: '所需登录天数',
          value: detail?.loginDays || 0,
          type: 'text' as const,
        },
      ],
    },
    {
      title: '等级特权',
      show: true,
      fields: [
        {
          label: '积分购买折扣',
          value: detail?.discount
            ? `${(detail.discount * 100).toFixed(0)}%`
            : '0%',
          type: 'text' as const,
        },
        {
          label: '作品收藏上限',
          value: detail?.workCollectionLimit || 0,
          type: 'text' as const,
        },
        {
          label: '黑名单上限',
          value: detail?.blacklistLimit || 0,
          type: 'text' as const,
        },
      ],
    },
    {
      title: '其他信息',
      show: true,
      fields: [
        {
          label: '备注信息',
          value: detail?.remark || '-',
          type: 'text' as const,
        },
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
