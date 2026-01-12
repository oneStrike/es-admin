import type { NoticeDetailResponse } from '#/apis/types';

import { formatUTC } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import {
  enablePlatform,
  getPublishStatus,
  noticePriorityObj,
  noticeTypeObj,
  publishStatusObj,
} from './shared';

/**
 * 获取通知公告详情卡片配置
 * @param detail 通知公告详情数据
 * @returns 卡片配置数组
 */
export function getDetailCards(detail: NoticeDetailResponse) {
  // 计算发布状态
  const publishStatus = getPublishStatus(
    detail.isPublished,
    detail.publishEndTime,
  );

  // 计算平台标签
  const enablePlatformLabels = getOptionLabel(
    enablePlatform,
    detail.enablePlatform,
  );

  // 计算通知类型信息
  const noticeTypeInfo = noticeTypeObj[detail.noticeType];

  // 计算优先级信息
  const priorityInfo = noticePriorityObj[detail.priorityLevel];

  // 计算发布状态信息
  const publishStatusInfo = publishStatusObj[publishStatus];

  return [
    {
      title: '基本信息',
      show: true,
      fields: [
        {
          label: '通知标题',
          value: detail?.title,
          type: 'text' as const,
        },
        {
          label: '通知类型',
          value: noticeTypeInfo?.label,
          type: 'colored-text' as const,
          color: noticeTypeInfo?.color,
        },
        {
          label: '优先级',
          value: priorityInfo?.label,
          type: 'colored-text' as const,
          color: priorityInfo?.color,
        },
        {
          label: '发布状态',
          value: publishStatusInfo?.label,
          type: 'colored-text' as const,
          color: publishStatusInfo?.color,
        },
        {
          label: '发布平台',
          value: enablePlatformLabels || '-',
          type: 'text' as const,
        },
        {
          label: '阅读次数',
          value: detail?.readCount || 0,
          type: 'text' as const,
        },
        {
          label: '是否置顶',
          value: detail?.isPinned,
          type: 'tag' as const,
          tagType: detail?.isPinned ? 'success' : 'info',
          tagText: detail?.isPinned ? '是' : '否',
        },
        {
          label: '首页弹窗',
          value: detail?.showAsPopup,
          type: 'tag' as const,
          tagType: detail?.showAsPopup ? 'success' : 'info',
          tagText: detail?.showAsPopup ? '是' : '否',
        },
      ],
    },
    {
      title: '时间信息',
      show: true,
      fields: [
        {
          label: '发布开始时间',
          value: detail?.publishStartTime
            ? formatUTC(detail.publishStartTime, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
        {
          label: '发布结束时间',
          value: detail?.publishEndTime
            ? `${formatUTC(detail.publishEndTime, 'YYYY-MM-DD')} 23:59:59`
            : '-',
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
    {
      title: '关联页面',
      show: !!(detail?.pageId || detail?.clientPage),
      fields: [
        {
          label: '页面代码',
          value: detail?.clientPage?.code,
          type: 'text' as const,
          show: !!detail?.clientPage?.code,
        },
        {
          label: '页面名称',
          value: detail?.clientPage?.name,
          type: 'text' as const,
          show: !!detail?.clientPage?.name,
        },
        {
          label: '页面路径',
          value: detail?.clientPage?.path,
          type: 'text' as const,
          show: !!detail?.clientPage?.path,
        },
      ].filter((field) => field.show),
    },
    {
      title: '弹窗背景图',
      show: !!detail?.popupBackgroundImage,
      type: 'image' as const,
      imageUrl: detail?.popupBackgroundImage,
    },
    {
      title: '通知内容',
      show: true,
      type: 'html' as const,
      content: detail?.content,
    },
  ];
}
