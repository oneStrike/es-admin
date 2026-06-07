import type { AdminAppUserDetailDto } from '#/api/types';

import { formatUTC } from '#/utils';

import {
  genderMap,
  getUserBanUntilText,
  getUserStatusText,
  normalUserStatus,
  userStatusMap,
} from './shared';

export function getDetailSections(detail: AdminAppUserDetailDto) {
  const counts = detail.counts;
  const pointStats = detail.pointStats;
  const experienceStats = detail.experienceStats;
  const currentStatus = userStatusMap[detail.status];

  return [
    {
      title: '头像',
      show: !!detail.avatarUrl,
      type: 'image' as const,
      imageUrl: detail.avatarUrl,
    },
    {
      title: '',
      show: true,
      items: [
        {
          label: '昵称',
          value: detail.nickname || detail.account,
          type: 'title' as const,
        },
        {
          label: '用户 ID',
          value: detail.id,
          type: 'text' as const,
        },
        {
          label: '账号',
          value: detail.account,
          type: 'text' as const,
        },
        {
          label: '启用状态',
          value: detail.isEnabled,
          type: 'tag' as const,
          tagText: detail.isEnabled ? '启用' : '禁用',
          tagType: detail.isEnabled ? 'success' : 'danger',
        },
        {
          label: '用户状态',
          value: detail.status,
          type: 'tag' as const,
          tagText: getUserStatusText(detail.status),
          tagType: currentStatus?.tagType ?? 'info',
        },
        {
          label: '等级',
          value: detail.level?.name || '-',
          type: 'text' as const,
        },
        {
          label: '徽章数',
          value: detail.badgeCount ?? 0,
          type: 'text' as const,
        },
      ],
    },
    {
      title: '基础资料',
      show: true,
      items: [
        {
          label: '手机号',
          value: detail.phoneNumber || '-',
          type: 'text' as const,
        },
        {
          label: '邮箱',
          value: detail.emailAddress || '-',
          type: 'text' as const,
        },
        {
          label: '性别',
          value: genderMap[detail.genderType]?.label || '-',
          type: 'text' as const,
        },
        {
          label: '出生日期',
          value: detail.birthDate || '-',
          type: 'text' as const,
        },
        {
          label: '最后登录时间',
          value: detail.lastLoginAt,
          type: 'date' as const,
        },
        {
          label: '最后登录 IP',
          value: detail.lastLoginIp || '-',
          type: 'text' as const,
        },
        {
          label: '注册时间',
          value: detail.createdAt,
          type: 'date' as const,
        },
        {
          label: '更新时间',
          value: detail.updatedAt,
          type: 'date' as const,
        },
      ],
    },
    {
      title: '成长数据',
      show: true,
      items: [
        {
          label: '当前积分',
          value: detail.points,
          type: 'text' as const,
        },
        {
          label: '今日获得积分',
          value: pointStats?.todayEarned ?? 0,
          type: 'text' as const,
        },
        {
          label: '今日消耗积分',
          value: pointStats?.todayConsumed ?? 0,
          type: 'text' as const,
        },
        {
          label: '当前经验',
          value: detail.experience,
          type: 'text' as const,
        },
        {
          label: '今日获得经验',
          value: experienceStats?.todayEarned ?? 0,
          type: 'text' as const,
        },
        {
          label: '当前等级',
          value: experienceStats?.level?.name || detail.level?.name || '-',
          type: 'text' as const,
        },
        {
          label: '下一等级',
          value: experienceStats?.nextLevel?.name || '-',
          type: 'text' as const,
        },
        {
          label: '升级差值',
          value:
            experienceStats?.gapToNextLevel === null
              ? '-'
              : (experienceStats?.gapToNextLevel ?? '-'),
          type: 'text' as const,
        },
      ],
    },
    {
      title: '社区画像',
      show: true,
      items: [
        {
          label: '主题数',
          value: counts?.forumTopicCount ?? 0,
          type: 'text' as const,
        },
        {
          label: '回复数',
          value: counts?.commentCount ?? 0,
          type: 'text' as const,
        },
        {
          label: '获赞数',
          value:
            (counts?.forumTopicReceivedLikeCount ?? 0) +
            (counts?.commentReceivedLikeCount ?? 0),
          type: 'text' as const,
        },
        {
          label: '获收藏数',
          value: counts?.forumTopicReceivedFavoriteCount ?? 0,
          type: 'text' as const,
        },
        {
          label: '论坛签名',
          value: detail.signature || '-',
          type: 'text' as const,
        },
        {
          label: '论坛简介',
          value: detail.bio || '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '管控信息',
      show:
        detail.status !== normalUserStatus ||
        !!detail.banReason ||
        !!detail.banUntil,
      items: [
        {
          label: '当前状态',
          value: getUserStatusText(detail.status),
          type: 'tag' as const,
          tagText: getUserStatusText(detail.status),
          tagType: currentStatus?.tagType,
        },
        {
          label: '处理原因',
          value: detail.banReason || '-',
          type: 'text' as const,
        },
        {
          label: '状态截止',
          value: getUserBanUntilText(detail.status, detail.banUntil),
          type: 'text' as const,
        },
      ],
    },
    {
      title: '等级详情',
      show:
        !!detail.level ||
        !!experienceStats?.level ||
        !!experienceStats?.nextLevel,
      items: [
        {
          label: '当前等级所需经验',
          value:
            experienceStats?.level?.requiredExperience ??
            detail.level?.requiredExperience ??
            '-',
          type: 'text' as const,
        },
        {
          label: '下一等级所需经验',
          value: experienceStats?.nextLevel?.requiredExperience ?? '-',
          type: 'text' as const,
        },
        {
          label: '状态更新时间',
          value: detail.updatedAt
            ? formatUTC(detail.updatedAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
      ],
    },
  ];
}
