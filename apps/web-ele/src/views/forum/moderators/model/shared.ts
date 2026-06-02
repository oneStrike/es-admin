import type {
  BaseForumSectionDto,
  BaseForumSectionGroupDto,
  ForumModeratorDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { forumSectionGroupsPageApi, forumSectionsPageApi } from '#/api/core';
import { formSchemaTransform } from '#/utils';
import { createAppUserTableSelectProps } from '#/views/user-manager/shared/app-user-select';

import { moderatorPermissionOptions } from './payload';

export const moderatorRoleOptions = [
  { label: '超级版主', value: 1, color: 'danger' as const },
  { label: '分组版主', value: 2, color: 'warning' as const },
  { label: '板块版主', value: 3, color: 'success' as const },
];

export const enabledOptions = [
  { label: '启用', value: true },
  { label: '禁用', value: false },
];

export const moderatorRoleMap = Object.fromEntries(
  moderatorRoleOptions.map((item) => [item.value, item]),
) as Record<number, (typeof moderatorRoleOptions)[number]>;

export const sectionOptions: Array<{ label: string; value: number }> = [];
export const groupOptions: Array<{ label: string; value: number }> = [];

const roleField: EsFormSchema[number] = {
  component: 'RadioGroup',
  componentProps: {
    class: 'w-full',
    options: moderatorRoleOptions,
    placeholder: '请选择版主角色',
  },
  defaultValue: 3,
  fieldName: 'roleType',
  label: '角色类型',
  rules: 'required',
};

const groupField: EsFormSchema[number] = {
  component: 'Select',
  componentProps: {
    class: 'w-full',
    clearable: true,
    options: groupOptions,
    placeholder: '分组版主时请选择分组',
  },
  fieldName: 'groupId',
  help: '仅分组版主需要填写，其他角色可留空',
  label: '所属分组',
};

const sectionField: EsFormSchema[number] = {
  component: 'Select',
  componentProps: {
    class: 'w-full',
    clearable: true,
    collapseTags: true,
    collapseTagsTooltip: true,
    filterable: true,
    multiple: true,
    options: sectionOptions,
    placeholder: '请选择需要管理的板块',
  },
  fieldName: 'sectionIds',
  help: '板块版主必填；分配板块时也会复用这里的选项',
  label: '管理板块',
};

const permissionField: EsFormSchema[number] = {
  component: 'CheckboxGroup',
  componentProps: {
    class: 'w-full',
    options: moderatorPermissionOptions,
  },
  dependencies: {
    rules: ({ isEnabled, roleType }) =>
      isEnabled !== false && Number(roleType) !== 1 ? 'arrayRequired' : null,
    triggerFields: ['isEnabled', 'roleType'],
  },
  fieldName: 'permissions',
  formItemClass: 'col-span-2',
  help: '超级版主默认拥有全部权限；启用的分组/板块版主必须至少选择一个基础权限',
  label: '基础权限',
};

const enabledField: EsFormSchema[number] = {
  component: 'RadioGroup',
  componentProps: {
    class: 'w-full',
    options: enabledOptions,
    placeholder: '请选择启用状态',
  },
  defaultValue: true,
  fieldName: 'isEnabled',
  label: '启用状态',
  rules: 'required',
};

const remarkField: EsFormSchema[number] = {
  component: 'Input',
  componentProps: {
    placeholder: '请输入备注信息',
    rows: 4,
    type: 'textarea',
  },
  fieldName: 'remark',
  formItemClass: 'col-span-2',
  label: '备注',
};

export const createFormSchema: EsFormSchema = [
  {
    component: 'TableSelect',
    componentProps: () =>
      createAppUserTableSelectProps({
        multiple: false,
        placeholder: '请选择用户',
        title: '选择用户',
      }),
    fieldName: 'selectedUserIds',
    label: '用户',
    rules: 'arrayRequired',
  },
  roleField,
  groupField,
  sectionField,
  permissionField,
  enabledField,
  remarkField,
];

export const editFormSchema: EsFormSchema = [
  roleField,
  groupField,
  sectionField,
  permissionField,
  enabledField,
  remarkField,
];

export const assignSectionFormSchema: EsFormSchema = [
  {
    ...sectionField,
    help: '未额外填写权限时，后端会沿用版主基础权限',
    rules: 'arrayRequired',
  },
  {
    ...permissionField,
    dependencies: undefined,
    help: '可选。留空表示当前板块继承版主基础权限；选择后作为这些板块的自定义权限',
    label: '板块自定义权限',
  },
];

const moderatorListSchema: EsFormSchema = [
  {
    component: 'Input',
    fieldName: 'nickname',
    label: '昵称',
    componentProps: {
      clearable: true,
      placeholder: '昵称',
    },
  },
  {
    component: 'Select',
    fieldName: 'sectionId',
    label: '板块',
    componentProps: {
      class: 'w-full',
      clearable: true,
      filterable: true,
      options: sectionOptions,
      placeholder: '板块',
    },
  },
  {
    component: 'Select',
    fieldName: 'isEnabled',
    label: '启用状态',
    componentProps: {
      clearable: true,
      options: enabledOptions,
      placeholder: '启用状态',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'dateRange',
    componentProps: {
      clearable: true,
      endPlaceholder: '创建结束时间',
      startPlaceholder: '创建开始时间',
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'userId',
    label: '用户编号',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '用户编号',
    },
  },
  { component: 'Input', fieldName: 'moderatorUser', label: '版主' },
  { component: 'RadioGroup', fieldName: 'roleType', label: '角色类型' },
  { component: 'Select', fieldName: 'group', label: '所属分组' },
  { component: 'Select', fieldName: 'sections', label: '管理板块' },
  { component: 'Select', fieldName: 'permissionNames', label: '权限' },
];

export const searchFormSchema = formSchemaTransform.toSearchSchema(
  moderatorListSchema,
  {
    nickname: { show: true },
    sectionId: { show: true },
    isEnabled: { show: true },
    dateRange: { show: true },
    userId: { show: true },
  },
);

export const moderatorColumns =
  formSchemaTransform.toTableColumns<ForumModeratorDto>(moderatorListSchema, {
    seq: { width: 60 },
    nickname: { hide: true },
    sectionId: { hide: true },
    dateRange: { hide: true },
    userId: { hide: true },
    moderatorUser: {
      field: 'nickname',
      fixed: 'left',
      minWidth: 180,
      slots: { default: 'moderatorUser' },
    },
    group: {
      formatter: ({ row }) => row.group?.name || '-',
      minWidth: 140,
    },
    sections: {
      formatter: ({ row }) =>
        row.sections?.length
          ? row.sections.map((item) => item.name).join(' / ')
          : '-',
      minWidth: 220,
      showOverflow: 'tooltip',
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
    isEnabled: {
      minWidth: 110,
      slots: { default: 'isEnabled' },
    },
    createdAt: {
      cellRender: {
        name: 'CellDate',
      },
      minWidth: 160,
      sortable: true,
    },
    updatedAt: {
      cellRender: {
        name: 'CellDate',
      },
      minWidth: 160,
      sortable: true,
    },
    actions: {
      show: true,
      minWidth: 260,
    },
  });

export function syncModeratorOptions(
  groups: BaseForumSectionGroupDto[] = [],
  sections: BaseForumSectionDto[] = [],
) {
  groupOptions.splice(
    0,
    groupOptions.length,
    ...groups.map((item) => ({
      label: item.name,
      value: item.id,
    })),
  );
  sectionOptions.splice(
    0,
    sectionOptions.length,
    ...sections.map((item) => ({
      label: item.name,
      value: item.id,
    })),
  );
}

export async function fetchModeratorOptions() {
  const [groupResp, sectionResp] = await Promise.all([
    forumSectionGroupsPageApi({ pageSize: 500 }),
    forumSectionsPageApi({ isEnabled: true, pageSize: 500 }),
  ]);

  syncModeratorOptions(groupResp.list ?? [], sectionResp.list ?? []);
}

export function mapModeratorToFormRecord(record: ForumModeratorDto) {
  return {
    groupId: record.groupId ?? undefined,
    isEnabled: record.isEnabled,
    permissions: record.permissions ?? [],
    remark: record.remark ?? '',
    roleType: record.roleType,
    sectionIds: record.sections?.map((item) => item.id) ?? [],
  };
}
