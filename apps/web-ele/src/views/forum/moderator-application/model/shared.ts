import type {
  BaseForumSectionDto,
  ForumModeratorApplicationDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { forumSectionsPageApi } from '#/api/core';
import { formSchemaTransform } from '#/utils';

export const applicationStatusOptions = [
  { label: '待审核', value: 0, color: 'warning' as const },
  { label: '已通过', value: 1, color: 'success' as const },
  { label: '已拒绝', value: 2, color: 'danger' as const },
];

export const auditStatusOptions = applicationStatusOptions.filter((item) =>
  [1, 2].includes(item.value),
);

export const applicationStatusMap = Object.fromEntries(
  applicationStatusOptions.map((item) => [item.value, item]),
) as Record<number, (typeof applicationStatusOptions)[number]>;

export const sectionOptions: Array<{ label: string; value: number }> = [];

export const searchFormSchema: EsFormSchema = [
  {
    component: 'Input',
    fieldName: 'nickname',
    componentProps: {
      clearable: true,
      placeholder: '申请人昵称',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'applicantId',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '申请人ID',
    },
  },
  {
    component: 'Select',
    fieldName: 'sectionId',
    componentProps: {
      class: 'w-full',
      clearable: true,
      filterable: true,
      options: sectionOptions,
      placeholder: '申请板块',
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    componentProps: {
      clearable: true,
      options: applicationStatusOptions,
      placeholder: '审核状态',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'dateRange',
    componentProps: {
      clearable: true,
      endPlaceholder: '申请结束时间',
      startPlaceholder: '申请开始时间',
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];

export const auditFormSchema: EsFormSchema = [
  {
    component: 'RadioGroup',
    fieldName: 'status',
    label: '审核结果',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      options: auditStatusOptions.map(({ color: _color, ...rest }) => rest),
      placeholder: '请选择审核结果',
    },
  },
  {
    component: 'Input',
    fieldName: 'auditReason',
    label: '审核意见',
    formItemClass: 'col-span-2',
    componentProps: {
      placeholder: '请输入审核意见；拒绝时建议说明原因',
      rows: 4,
      type: 'textarea',
    },
    help: '当审核结果为“已拒绝”时，建议填写拒绝原因',
  },
  {
    component: 'Input',
    fieldName: 'remark',
    label: '处理备注',
    formItemClass: 'col-span-2',
    componentProps: {
      placeholder: '请输入处理备注',
      rows: 4,
      type: 'textarea',
    },
  },
];

const applicationTableSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'applicant', label: '申请人' },
  { component: 'InputNumber', fieldName: 'applicantId', label: '申请人ID' },
  { component: 'Select', fieldName: 'sectionId', label: '申请板块' },
  { component: 'Select', fieldName: 'permissionNames', label: '申请权限' },
  { component: 'Input', fieldName: 'reason', label: '申请理由' },
  { component: 'Select', fieldName: 'status', label: '审核状态' },
  { component: 'Input', fieldName: 'auditReason', label: '审核意见' },
  { component: 'DatePicker', fieldName: 'createdAt', label: '申请时间' },
  { component: 'DatePicker', fieldName: 'auditAt', label: '审核时间' },
];

export const applicationColumns =
  formSchemaTransform.toTableColumns<ForumModeratorApplicationDto>(
    applicationTableSchema,
    {
      applicant: {
        fixed: 'left',
        formatter: ({ row }) => row.applicant?.nickname || '-',
        minWidth: 180,
      },
      applicantId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 100,
      },
      sectionId: {
        formatter: ({ cellValue }) => getSectionLabel(cellValue),
        minWidth: 160,
      },
      permissionNames: {
        cellRender: {
          name: 'CellTag',
          props: {
            type: 'info',
          },
        },
        minWidth: 220,
      },
      reason: {
        formatter: ({ cellValue }) => cellValue || '-',
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      status: {
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: applicationStatusOptions,
          },
        },
        minWidth: 120,
      },
      auditReason: {
        formatter: ({ cellValue }) => cellValue || '-',
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      createdAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 160,
        sortable: true,
      },
      auditAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 160,
        sortable: true,
      },
      actions: {
        show: true,
        fixed: 'right',
        minWidth: 220,
        slots: { default: 'actions' },
      },
    },
  );

export function syncSectionOptions(sections: BaseForumSectionDto[] = []) {
  sectionOptions.splice(
    0,
    sectionOptions.length,
    ...sections.map((item) => ({
      label: item.name,
      value: item.id,
    })),
  );
}

export async function fetchApplicationOptions() {
  const sectionResp = await forumSectionsPageApi({ pageSize: 500 });
  syncSectionOptions(sectionResp.list ?? []);
}

export function getSectionLabel(sectionId?: null | number) {
  if (!sectionId) return '-';
  return (
    sectionOptions.find((item) => item.value === sectionId)?.label ||
    `ID:${sectionId}`
  );
}
