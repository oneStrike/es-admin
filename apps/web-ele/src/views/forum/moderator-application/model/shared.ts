import type {
  BaseForumSectionDto,
  ForumModeratorApplicationDto,
  ForumModeratorApplicationSectionDto,
  ForumModeratorApplicationUserDto,
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

type ModeratorApplicationSchemaField = EsFormSchema[number];

const moderatorApplicationFieldCatalog = {
  auditReason: {
    component: 'Input',
    fieldName: 'auditReason',
    label: '审核意见',
  },
  status: {
    component: 'Select',
    fieldName: 'status',
    label: '审核状态',
  },
} satisfies Record<string, ModeratorApplicationSchemaField>;

function withoutColorOptions<T extends { color?: unknown }>(options: T[]) {
  return options.map(({ color: _color, ...rest }) => rest);
}

function createModeratorApplicationField(
  field: keyof typeof moderatorApplicationFieldCatalog,
  overrides: Partial<ModeratorApplicationSchemaField> = {},
): ModeratorApplicationSchemaField {
  const base = moderatorApplicationFieldCatalog[
    field
  ] as ModeratorApplicationSchemaField;
  const componentProps = overrides.componentProps ?? base.componentProps;

  return {
    ...base,
    ...overrides,
    componentProps:
      componentProps &&
      typeof componentProps === 'object' &&
      !Array.isArray(componentProps)
        ? { ...componentProps }
        : componentProps,
  };
}

const applicationListSchema: EsFormSchema = [
  createModeratorApplicationField('status', {
    defaultValue: 0,
    componentProps: {
      clearable: true,
      options: applicationStatusOptions,
      placeholder: '审核状态',
    },
  }),
  {
    component: 'Input',
    fieldName: 'nickname',
    componentProps: {
      clearable: true,
      placeholder: '申请人昵称',
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
  {
    component: 'InputNumber',
    fieldName: 'applicantId',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '申请人编号',
    },
  },
  { component: 'Input', fieldName: 'applicant', label: '申请人' },
  { component: 'Select', fieldName: 'section', label: '申请板块' },
  { component: 'Select', fieldName: 'permissionNames', label: '申请权限' },
  { component: 'Input', fieldName: 'reason', label: '申请理由' },
  createModeratorApplicationField('auditReason'),
  { component: 'DatePicker', fieldName: 'auditAt', label: '审核时间' },
];

export const searchFormSchema = formSchemaTransform.toSearchSchema(
  applicationListSchema,
  {
    status: { show: true },
    nickname: { show: true },
    sectionId: { show: true },
    dateRange: { show: true },
    applicantId: { show: true },
  },
);

export const auditFormSchema: EsFormSchema = [
  createModeratorApplicationField('status', {
    component: 'RadioGroup',
    label: '审核结果',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      options: withoutColorOptions(auditStatusOptions),
      placeholder: '请选择审核结果',
    },
  }),
  createModeratorApplicationField('auditReason', {
    formItemClass: 'col-span-2',
    componentProps: {
      placeholder: '请输入审核意见；拒绝时建议说明原因',
      rows: 4,
      type: 'textarea',
    },
    help: '当审核结果为“已拒绝”时，建议填写拒绝原因',
  }),
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

export const applicationColumns =
  formSchemaTransform.toTableColumns<ForumModeratorApplicationDto>(
    applicationListSchema,
    {
      seq: { width: 60 },
      nickname: { hide: true },
      sectionId: { hide: true },
      dateRange: { hide: true },
      applicantId: { hide: true },
      applicant: {
        fixed: 'left',
        formatter: undefined,
        minWidth: 180,
        slots: { default: 'applicant' },
      },
      section: {
        formatter: undefined,
        minWidth: 160,
        slots: { default: 'section' },
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
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      status: {
        cellRender: {
          name: 'CellTag',
        },
        minWidth: 120,
      },
      auditReason: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      createdAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 160,
        sortable: true,
        title: '申请时间',
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
        minWidth: 220,
      },
    },
  );

export function formatApplicationUser(
  user?: ForumModeratorApplicationUserDto | null,
) {
  return user?.nickname || '-';
}

export function formatApplicationSection(
  section?: ForumModeratorApplicationSectionDto | null,
) {
  return section?.name || '-';
}

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
