import type { AnnouncementDetailResponse } from '#/api/types';

import { formatUTC } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import {
  announcementPriorityObj,
  announcementTypeObj,
  enablePlatform,
  fanoutStatusObj,
  formatFanoutEventKey,
  formatPublishEndTime,
  getPublishStatus,
  popupBackgroundPositionOptions,
  publishStatusObj,
} from './shared';

/**
 * 获取公告详情卡片配置
 * @param detail 公告详情数据
 * @returns 卡片配置数组
 */
export function getDetailSections(detail: AnnouncementDetailResponse) {
  // 计算发布状态
  const publishStatus = getPublishStatus(
    detail.isPublished,
    detail.publishStartTime,
    detail.publishEndTime,
    detail.publishStatus,
  );

  // 计算平台标签
  const enablePlatformLabels = getOptionLabel(
    enablePlatform,
    detail.enablePlatform ?? [],
  );

  // 计算公告类型信息
  const announcementTypeInfo = announcementTypeObj[detail.announcementType];

  // 计算优先级信息
  const priorityInfo = announcementPriorityObj[detail.priorityLevel];

  // 计算发布状态信息
  const publishStatusInfo = publishStatusObj[publishStatus];

  return [
    {
      title: '基本信息',
      show: true,
      items: [
        {
          label: '公告标题',
          value: detail?.title,
          type: 'text' as const,
        },
        {
          label: '公告类型',
          value: announcementTypeInfo?.label,
          type: 'tag' as const,
          tagText: announcementTypeInfo?.label,
          tagType: announcementTypeInfo?.tagType,
        },
        {
          label: '优先级',
          value: priorityInfo?.label,
          type: 'tag' as const,
          tagText: priorityInfo?.label,
          tagType: priorityInfo?.tagType,
        },
        {
          label: '发布状态',
          value: publishStatusInfo?.label,
          type: 'tag' as const,
          tagText: publishStatusInfo?.label,
          tagType: publishStatusInfo?.tagType,
        },
        {
          label: '发布平台',
          value: enablePlatformLabels || '-',
          type: 'text' as const,
        },
        {
          label: '浏览次数',
          value: detail?.viewCount || 0,
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
          label: '消息中心通知',
          value: detail?.isRealtime,
          type: 'tag' as const,
          tagType: detail?.isRealtime ? 'success' : 'info',
          tagText: detail?.isRealtime ? '是' : '否',
        },
        {
          label: 'APP 弹窗',
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
      items: [
        {
          label: '发布开始时间',
          value: detail?.publishStartTime
            ? formatUTC(detail.publishStartTime, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
        {
          label: '发布结束时间',
          value: formatPublishEndTime(detail?.publishEndTime),
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
      title: '公告摘要',
      show: !!detail?.summary,
      items: [
        {
          label: '摘要内容',
          value: detail?.summary || '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '关联页面',
      show: !!(detail?.pageId || detail?.appPage),
      items: [
        {
          label: '页面代码',
          value: detail?.appPage?.code,
          type: 'text' as const,
          show: !!detail?.appPage?.code,
        },
        {
          label: '页面名称',
          value: detail?.appPage?.name,
          type: 'text' as const,
          show: !!detail?.appPage?.name,
        },
        {
          label: '页面路径',
          value: detail?.appPage?.path,
          type: 'text' as const,
          show: !!detail?.appPage?.path,
        },
      ].filter((field) => field.show),
    },
    {
      title: '弹窗设置',
      show: !!(detail?.popupBackgroundImage || detail?.popupBackgroundPosition),
      items: [
        {
          label: '背景图',
          value: detail?.popupBackgroundImage,
          type: 'image' as const,
          show: !!detail?.popupBackgroundImage,
        },
        {
          label: '背景图位置',
          value: detail?.popupBackgroundPosition
            ? (popupBackgroundPositionOptions.find(
                (item) => item.value === detail.popupBackgroundPosition,
              )?.label ?? detail.popupBackgroundPosition)
            : '-',
          type: 'text' as const,
          show: !!detail?.popupBackgroundPosition,
        },
      ].filter((field) => field.show !== false),
    },
    {
      title: '消息中心通知',
      show:
        detail?.isRealtime ||
        (detail?.fanoutStatus !== null && detail?.fanoutStatus !== undefined) ||
        !!detail?.fanoutDesiredEventKey ||
        !!detail?.fanoutLastError,
      items: [
        {
          label: '通知状态',
          value:
            detail?.fanoutStatus === null || detail?.fanoutStatus === undefined
              ? '-'
              : (fanoutStatusObj[detail.fanoutStatus]?.label ??
                detail.fanoutStatus),
          type: 'tag' as const,
          tagText:
            detail?.fanoutStatus === null || detail?.fanoutStatus === undefined
              ? '-'
              : (fanoutStatusObj[detail.fanoutStatus]?.label ??
                String(detail.fanoutStatus)),
          tagType:
            detail?.fanoutStatus === null || detail?.fanoutStatus === undefined
              ? 'info'
              : (fanoutStatusObj[detail.fanoutStatus]?.tagType ?? 'info'),
        },
        {
          label: '目标事件',
          value: formatFanoutEventKey(detail?.fanoutDesiredEventKey),
          type: 'text' as const,
        },
        {
          label: '通知更新时间',
          value: detail?.fanoutUpdatedAt
            ? formatUTC(detail.fanoutUpdatedAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
        {
          label: '失败原因',
          value: detail?.fanoutLastError || '-',
          type: 'text' as const,
          show: !!detail?.fanoutLastError,
        },
      ].filter((field) => field.show !== false),
    },
    {
      title: '公告内容',
      show: true,
      type: 'html' as const,
      content: detail?.content,
    },
  ];
}
