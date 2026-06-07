import type { ForumModeratorLifecycleLogDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

export const lifecycleEventOptions = [
  { label: '创建版主', value: 1, color: 'success' as const },
  { label: '恢复版主', value: 2, color: 'success' as const },
  { label: '更新作用域', value: 3, color: 'primary' as const },
  { label: '分配板块', value: 4, color: 'primary' as const },
  { label: '启用版主', value: 5, color: 'success' as const },
  { label: '禁用版主', value: 6, color: 'warning' as const },
  { label: '移除版主', value: 7, color: 'danger' as const },
  { label: '申请通过', value: 8, color: 'success' as const },
  { label: '申请拒绝', value: 9, color: 'danger' as const },
];

export const lifecycleEventMap = Object.fromEntries(
  lifecycleEventOptions.map((item) => [item.value, item]),
) as Record<number, (typeof lifecycleEventOptions)[number]>;

const lifecycleLogListSchema: EsFormSchema = [
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: lifecycleEventOptions,
      placeholder: '事件类型',
    },
    fieldName: 'eventType',
    label: '事件类型',
  },
  {
    component: 'DatePicker',
    componentProps: {
      clearable: true,
      endPlaceholder: '结束时间',
      startPlaceholder: '开始时间',
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'dateRange',
    label: '创建时间',
  },
  { component: 'Input', fieldName: 'subject', label: '对象' },
  { component: 'Input', fieldName: 'actor', label: '操作人' },
  { component: 'Input', fieldName: 'reason', label: '原因' },
  { component: 'Input', fieldName: 'beforeData', label: '变更前' },
  { component: 'Input', fieldName: 'afterData', label: '变更后' },
];

export const searchFormSchema = formSchemaTransform.toSearchSchema(
  lifecycleLogListSchema,
  {
    eventType: { show: true },
    dateRange: { show: true },
  },
);

function formatLifecycleSubject(row: ForumModeratorLifecycleLogDto) {
  if (row.moderatorId) {
    return `版主 #${row.moderatorId}`;
  }
  if (row.applicationId) {
    return `申请 #${row.applicationId}`;
  }
  return '-';
}

export const lifecycleLogColumns =
  formSchemaTransform.toTableColumns<ForumModeratorLifecycleLogDto>(
    lifecycleLogListSchema,
    {
      seq: { width: 60 },
      eventType: {
        formatter: ({ cellValue }) =>
          lifecycleEventMap[Number(cellValue)]?.label ?? cellValue ?? '-',
        minWidth: 120,
      },
      subject: {
        formatter: ({ row }) => formatLifecycleSubject(row),
        minWidth: 140,
      },
      actor: {
        formatter: ({ row }) => `后台用户 #${row.actorAdminUserId}`,
        minWidth: 140,
      },
      reason: {
        formatter: ({ row }) => row.reason ?? '-',
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      beforeData: {
        cellRender: { name: 'CellJson' },
        minWidth: 220,
      },
      afterData: {
        cellRender: { name: 'CellJson' },
        minWidth: 220,
      },
      dateRange: { hide: true },
      createdAt: {
        cellRender: { name: 'CellDate' },
        minWidth: 160,
        sortable: true,
      },
    },
  );
