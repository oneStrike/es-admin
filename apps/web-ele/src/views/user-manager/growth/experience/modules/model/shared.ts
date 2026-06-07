import type { ExperienceEventOption } from './constants';

import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type {
  BaseGrowthRewardRuleDto,
  GrowthExperienceRecordPageRequest,
  GrowthExperienceStatsRequest,
  GrowthRewardRulesCreateRequest,
  GrowthRewardRulesPageRequest,
  GrowthRewardRulesUpdateRequest,
  GrowthRuleEventPageItemDto,
  GrowthRuleEventsPageRequest,
  UserExperienceRecordDetailDto,
  UserExperienceRecordDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { createAppUserTableSelectProps } from '#/views/user-manager/shared/app-user-select';

import {
  createExperienceEventOptions,
  EXPERIENCE_ASSET_KEY,
  EXPERIENCE_ASSET_TYPE,
  experienceDeltaDirectionOptions,
  experienceEnabledOptions,
  experienceHasRuleOptions,
  experienceImplStatusOptions,
  experienceRuleArchiveStatusOptions,
  experienceRuleDomainOptions,
  formatExperienceEventLabel,
} from './constants';

type ExperienceRecordSearchValues = GrowthExperienceRecordPageRequest & {
  dateRange?: string[];
};

type ExperienceRuleSearchValues = GrowthRewardRulesPageRequest & {
  dateRange?: string[];
};

type ExperienceEventCoverageSearchValues = GrowthRuleEventsPageRequest & {
  ruleType?: number;
};

type ExperienceRuleSubmitValues =
  | GrowthRewardRulesCreateRequest
  | GrowthRewardRulesUpdateRequest;

type TableColumn<T extends Record<string, unknown>> =
  VxeGridPropTypes.Columns<T>[number];

const eventSelectClass = 'w-full';

function stripEmptyValues<T extends Record<string, unknown>>(values: T) {
  const result: Record<string, unknown> = {};

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (Array.isArray(value) && value.length === 0) return;

    result[key] = value;
  });

  return result;
}

function formatSignedValue(value?: null | number) {
  if (value === null || value === undefined) return '-';

  return value > 0 ? `+${value}` : String(value);
}

function formatLimitValue(value?: null | number) {
  if (value === null || value === undefined) return '-';

  return value === 0 ? '无限制' : String(value);
}

function formatRuleStatus(row: BaseGrowthRewardRuleDto) {
  return row.archivedAt ? '已归档' : '当前规则';
}

function formatJsonBlock(value?: null | string | unknown) {
  if (value === null || value === undefined || value === '') return '-';

  if (typeof value === 'string') {
    try {
      return JSON.stringify(JSON.parse(value), null, 2);
    } catch {
      return value;
    }
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function formatExperienceUser(row: UserExperienceRecordDto) {
  const user = row.user;
  if (user?.nickname) return user.nickname;
  if (user?.account) return user.account;
  return row.userId ? `用户 ${row.userId}` : '-';
}

export function createExperienceEventSelectProps(
  eventOptions: ExperienceEventOption[] = [],
  placeholder = '请选择事件',
) {
  return {
    class: eventSelectClass,
    clearable: true,
    filterable: true,
    options: eventOptions,
    placeholder,
  };
}

export function createExperienceRuleFormSchema(
  eventOptions: ExperienceEventOption[] = [],
): EsFormSchema {
  return [
    {
      component: 'Select',
      componentProps: createExperienceEventSelectProps(
        eventOptions,
        '请选择已接入且可配置的经验事件',
      ),
      fieldName: 'type',
      help: '选项来自服务端事件定义，仅包含已实现且可配置的经验事件',
      label: '经验事件',
      rules: 'selectRequired',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: eventSelectClass,
        max: 9999,
        min: 1,
        placeholder: '请输入经验奖励值',
      },
      fieldName: 'delta',
      help: '仅支持正整数，扣减类经验不通过规则配置发放',
      label: '经验奖励',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: eventSelectClass,
        min: 0,
        placeholder: '0 表示无限制',
      },
      defaultValue: 0,
      fieldName: 'dailyLimit',
      help: '同一事件每日最多发放经验，0 表示不限制',
      label: '每日上限',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: eventSelectClass,
        min: 0,
        placeholder: '0 表示无限制',
      },
      defaultValue: 0,
      fieldName: 'totalLimit',
      help: '同一事件累计最多发放经验，0 表示不限制',
      label: '总上限',
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        class: eventSelectClass,
        options: experienceEnabledOptions,
      },
      defaultValue: true,
      fieldName: 'isEnabled',
      label: '启用状态',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '填写给运营或审计看的备注',
        rows: 4,
        type: 'textarea',
      },
      fieldName: 'remark',
      formItemClass: 'col-span-2',
      label: '备注',
    },
  ];
}

export function createExperienceRuleSearchSchema(
  eventOptions: ExperienceEventOption[] = [],
): EsFormSchema {
  return [
    {
      component: 'Select',
      componentProps: createExperienceEventSelectProps(
        eventOptions,
        '经验事件',
      ),
      fieldName: 'type',
      hideLabel: true,
      label: '',
    },
    {
      component: 'Select',
      componentProps: {
        class: 'w-[180px]',
        clearable: true,
        options: experienceEnabledOptions,
        placeholder: '启用状态',
      },
      fieldName: 'isEnabled',
      hideLabel: true,
      label: '',
    },
    {
      component: 'Select',
      componentProps: {
        class: 'w-[180px]',
        clearable: true,
        options: experienceRuleArchiveStatusOptions,
        placeholder: '规则状态',
      },
      defaultValue: 1,
      fieldName: 'status',
      hideLabel: true,
      label: '',
    },
  ];
}

export function createExperienceRuleColumns(
  eventOptions: ExperienceEventOption[] = [],
): VxeGridPropTypes.Columns<BaseGrowthRewardRuleDto> {
  const schema: EsFormSchema = [
    ...createExperienceRuleFormSchema(eventOptions),
    {
      component: 'Select',
      componentProps: {
        options: experienceRuleArchiveStatusOptions,
      },
      fieldName: 'archivedAt',
      label: '规则状态',
    },
  ];

  return formSchemaTransform.toTableColumns<BaseGrowthRewardRuleDto>(schema, {
    type: {
      formatter: ({ cellValue }) =>
        formatExperienceEventLabel(cellValue, eventOptions),
      fixed: 'left',
      minWidth: 180,
      showOverflow: 'tooltip',
      title: '经验事件',
    },
    delta: {
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: formatSignedValue,
          type: (value: number) => (value > 0 ? 'success' : 'danger'),
        },
      },
      minWidth: 120,
    },
    dailyLimit: {
      formatter: ({ cellValue }) => formatLimitValue(cellValue),
      minWidth: 120,
    },
    totalLimit: {
      formatter: ({ cellValue }) => formatLimitValue(cellValue),
      minWidth: 120,
    },
    isEnabled: {
      minWidth: 110,
      slots: { default: 'isEnabled' },
      title: '启用状态',
    },
    remark: {
      hide: true,
    },
    archivedAt: {
      formatter: ({ row }) => formatRuleStatus(row),
      minWidth: 110,
      title: '规则状态',
    },
    createdAt: {
      show: true,
    },
    updatedAt: {
      show: true,
    },
    actions: {
      show: true,
      width: 180,
    },
  });
}

export function buildExperienceRuleQuery(
  formValues: ExperienceRuleSearchValues = {},
): GrowthRewardRulesPageRequest {
  const { dateRange, ...restFormValues } = formValues;
  const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

  return stripEmptyValues({
    assetKey: EXPERIENCE_ASSET_KEY,
    assetType: EXPERIENCE_ASSET_TYPE,
    endDate,
    includeArchived: restFormValues.includeArchived,
    isEnabled: restFormValues.isEnabled,
    pageIndex: restFormValues.pageIndex,
    pageSize: restFormValues.pageSize,
    startDate,
    status: restFormValues.status ?? 1,
    type: restFormValues.type,
  }) as GrowthRewardRulesPageRequest;
}

export function normalizeExperienceRulePayload(
  values: ExperienceRuleSubmitValues,
): ExperienceRuleSubmitValues {
  const payload = {
    assetKey: EXPERIENCE_ASSET_KEY,
    assetType: EXPERIENCE_ASSET_TYPE,
    dailyLimit: Number(values.dailyLimit ?? 0),
    delta: Number(values.delta),
    isEnabled: values.isEnabled ?? true,
    remark: values.remark ?? null,
    totalLimit: Number(values.totalLimit ?? 0),
    type: Number(values.type),
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as GrowthRewardRulesUpdateRequest)
    : (payload as GrowthRewardRulesCreateRequest);
}

export function createExperienceRecordSearchSchema(
  eventOptions: ExperienceEventOption[] = [],
  config: { includeDiagnostics?: boolean } = {},
): EsFormSchema {
  const primarySchema: EsFormSchema = [
    {
      component: 'TableSelect',
      componentProps: createAppUserTableSelectProps({
        emitScalar: true,
        multiple: false,
        placeholder: '按用户筛选',
        title: '选择经验所属用户',
      }),
      fieldName: 'userId',
      hideLabel: true,
      label: '',
    },
    {
      component: 'Select',
      componentProps: createExperienceEventSelectProps(
        eventOptions,
        '经验事件',
      ),
      fieldName: 'ruleType',
      hideLabel: true,
      label: '',
    },
    {
      component: 'Select',
      componentProps: {
        class: 'w-[180px]',
        clearable: true,
        options: experienceHasRuleOptions,
        placeholder: '规则关联',
      },
      fieldName: 'hasRule',
      hideLabel: true,
      label: '',
    },
    {
      component: 'Select',
      componentProps: {
        class: 'w-[180px]',
        clearable: true,
        options: experienceDeltaDirectionOptions,
        placeholder: '经验方向',
      },
      fieldName: 'deltaDirection',
      hideLabel: true,
      label: '',
    },
    {
      component: 'DatePicker',
      componentProps: {
        clearable: true,
        endPlaceholder: '结束时间',
        startPlaceholder: '开始时间',
        type: 'datetimerange',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
      },
      fieldName: 'dateRange',
      hideLabel: true,
      label: '',
    },
  ];

  if (!config.includeDiagnostics) return primarySchema;

  return [
    ...primarySchema,
    { component: 'InputNumber', fieldName: 'ruleId', label: '规则 ID' },
    { component: 'Input', fieldName: 'source', label: '账本来源' },
    { component: 'Input', fieldName: 'bizKey', label: '业务键' },
    { component: 'InputNumber', fieldName: 'targetType', label: '目标类型' },
    { component: 'InputNumber', fieldName: 'targetId', label: '目标 ID' },
    { component: 'InputNumber', fieldName: 'minDelta', label: '最小变化' },
    { component: 'InputNumber', fieldName: 'maxDelta', label: '最大变化' },
  ];
}

export function createExperienceRecordColumns(
  eventOptions: ExperienceEventOption[] = [],
): VxeGridPropTypes.Columns<UserExperienceRecordDto> {
  const schema: EsFormSchema = [
    { component: 'InputNumber', fieldName: 'userId', label: '用户' },
    { component: 'Select', fieldName: 'ruleType', label: '经验事件' },
    { component: 'InputNumber', fieldName: 'experience', label: '经验变化' },
    { component: 'InputNumber', fieldName: 'beforeExperience', label: '变化前' },
    { component: 'InputNumber', fieldName: 'afterExperience', label: '变化后' },
    { component: 'Input', fieldName: 'remark', label: '说明' },
    { component: 'InputNumber', fieldName: 'ruleId', label: '关联规则' },
    { component: 'Input', fieldName: 'source', label: '账本来源' },
    { component: 'Input', fieldName: 'bizKey', label: '业务键' },
    { component: 'InputNumber', fieldName: 'targetType', label: '目标类型' },
    { component: 'InputNumber', fieldName: 'targetId', label: '目标 ID' },
    { component: 'Input', fieldName: 'context', label: '上下文' },
  ];

  return formSchemaTransform.toTableColumns<UserExperienceRecordDto>(schema, {
    userId: {
      formatter: ({ row }) => formatExperienceUser(row),
      fixed: 'left',
      minWidth: 140,
      showOverflow: 'tooltip',
      title: '用户',
    },
    ruleType: {
      formatter: ({ cellValue }) =>
        formatExperienceEventLabel(cellValue, eventOptions),
      fixed: 'left',
      minWidth: 180,
      showOverflow: 'tooltip',
    },
    experience: {
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: formatSignedValue,
          type: (value: number) => (value > 0 ? 'success' : 'danger'),
        },
      },
      minWidth: 120,
    },
    beforeExperience: { minWidth: 110 },
    afterExperience: { minWidth: 110 },
    remark: {
      minWidth: 180,
      showOverflow: 'tooltip',
    },
    ruleId: { hide: true },
    source: { hide: true },
    bizKey: { hide: true },
    targetType: { hide: true },
    targetId: { hide: true },
    context: { hide: true },
    createdAt: {
      show: true,
      sort: 90,
    },
    actions: {
      show: true,
      width: 120,
    },
  });
}

export function buildExperienceRecordQuery(
  formValues: ExperienceRecordSearchValues = {},
): GrowthExperienceRecordPageRequest {
  const { dateRange, ...restFormValues } = formValues;
  const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

  return stripEmptyValues({
    bizKey: restFormValues.bizKey,
    deltaDirection: restFormValues.deltaDirection,
    endDate,
    hasRule: restFormValues.hasRule,
    maxDelta: restFormValues.maxDelta,
    minDelta: restFormValues.minDelta,
    pageIndex: restFormValues.pageIndex,
    pageSize: restFormValues.pageSize,
    ruleId: restFormValues.ruleId,
    ruleType: restFormValues.ruleType,
    source: restFormValues.source,
    startDate,
    targetId: restFormValues.targetId,
    targetType: restFormValues.targetType,
    userId: restFormValues.userId,
  }) as GrowthExperienceRecordPageRequest;
}

export function createExperienceStatsSearchSchema(): EsFormSchema {
  return [
    {
      component: 'TableSelect',
      componentProps: createAppUserTableSelectProps({
        emitScalar: true,
        multiple: false,
        placeholder: '选择用户查看经验概览',
        title: '选择经验所属用户',
      }),
      fieldName: 'userId',
      label: '用户',
      rules: 'selectRequired',
    },
  ];
}

export function buildExperienceStatsQuery(
  values: Partial<GrowthExperienceStatsRequest>,
): GrowthExperienceStatsRequest {
  return {
    userId: Number(values.userId),
  };
}

export function createExperienceEventCoverageSearchSchema(
  eventOptions: ExperienceEventOption[] = [],
): EsFormSchema {
  return [
    {
      component: 'Select',
      componentProps: createExperienceEventSelectProps(
        eventOptions,
        '成长事件',
      ),
      fieldName: 'ruleType',
      hideLabel: true,
      label: '',
    },
    {
      component: 'Select',
      componentProps: {
        class: 'w-[180px]',
        clearable: true,
        options: experienceEnabledOptions,
        placeholder: '是否已实现',
      },
      fieldName: 'isImplemented',
      hideLabel: true,
      label: '',
    },
    {
      component: 'Select',
      componentProps: {
        class: 'w-[180px]',
        clearable: true,
        options: experienceEnabledOptions,
        placeholder: '允许配置',
      },
      fieldName: 'isRuleConfigurable',
      hideLabel: true,
      label: '',
    },
  ];
}

export function createExperienceEventCoverageColumns():
  VxeGridPropTypes.Columns<GrowthRuleEventPageItemDto> {
  const schema: EsFormSchema = [
    { component: 'InputNumber', fieldName: 'ruleType', label: '成长事件' },
    { component: 'Input', fieldName: 'domain', label: '事件域' },
    { component: 'Input', fieldName: 'implStatus', label: '实现状态' },
    { component: 'Input', fieldName: 'isRuleConfigurable', label: '允许配置' },
    { component: 'Input', fieldName: 'supportsExperienceRule', label: '支持经验' },
    { component: 'Input', fieldName: 'disabledReason', label: '不可配置原因' },
  ];

  return formSchemaTransform.toTableColumns<GrowthRuleEventPageItemDto>(schema, {
    ruleType: {
      formatter: ({ row }) => row.eventName || `事件 ${row.ruleType}`,
      fixed: 'left',
      minWidth: 180,
      showOverflow: 'tooltip',
    },
    domain: {
      formatter: ({ cellValue }) =>
        experienceRuleDomainOptions.find((item) => item.value === cellValue)
          ?.label || cellValue || '-',
      minWidth: 120,
    },
    implStatus: {
      cellRender: {
        name: 'CellTag',
        props: { mapOptions: experienceImplStatusOptions },
      },
      minWidth: 120,
    },
    isRuleConfigurable: {
      cellRender: {
        name: 'CellTag',
        props: { mapOptions: experienceEnabledOptions },
      },
      minWidth: 120,
    },
    supportsExperienceRule: {
      cellRender: {
        name: 'CellTag',
        props: { mapOptions: experienceEnabledOptions },
      },
      minWidth: 120,
    },
    disabledReason: {
      minWidth: 180,
      showOverflow: 'tooltip',
    },
    actions: {
      show: true,
      width: 120,
    },
  });
}

export function buildExperienceEventCoverageQuery(
  formValues: ExperienceEventCoverageSearchValues = {},
): GrowthRuleEventsPageRequest {
  return stripEmptyValues({
    isImplemented: formValues.isImplemented,
    isRuleConfigurable: formValues.isRuleConfigurable,
    pageIndex: formValues.pageIndex,
    pageSize: formValues.pageSize,
    type: formValues.ruleType ?? formValues.type,
  }) as GrowthRuleEventsPageRequest;
}

export function createExperienceCoverageEventOptions(
  events: GrowthRuleEventPageItemDto[] = [],
) {
  return createExperienceEventOptions(events, { configurableOnly: false });
}

export function getDiagnosticRecordSections(
  detail: UserExperienceRecordDetailDto,
  eventOptions: ExperienceEventOption[] = [],
) {
  return [
    {
      title: '业务信息',
      show: true,
      items: [
        {
          label: '经验事件',
          type: 'text' as const,
          value: formatExperienceEventLabel(detail.ruleType, eventOptions),
        },
        {
          label: '经验变化',
          tagText: formatSignedValue(detail.experience),
          tagType: detail.experience > 0 ? 'success' : 'danger',
          type: 'tag' as const,
        },
        {
          label: '变化前',
          type: 'text' as const,
          value: detail.beforeExperience,
        },
        {
          label: '变化后',
          type: 'text' as const,
          value: detail.afterExperience,
        },
        {
          label: '说明',
          type: 'text' as const,
          value: detail.remark || '-',
        },
      ],
    },
    {
      title: '诊断信息',
      show: true,
      items: [
        { label: '规则 ID', type: 'text' as const, value: detail.ruleId ?? '-' },
        { label: '账本来源', type: 'text' as const, value: detail.source ?? '-' },
        { label: '业务键', type: 'text' as const, value: detail.bizKey || '-' },
        {
          label: '目标',
          type: 'text' as const,
          value:
            detail.targetType || detail.targetId
              ? `${detail.targetType ?? '-'} / ${detail.targetId ?? '-'}`
              : '-',
        },
        {
          label: '上下文',
          type: 'text' as const,
          value: formatJsonBlock(detail.context),
        },
        {
          label: '诊断上下文',
          type: 'text' as const,
          value: formatJsonBlock(detail.diagnosticContext),
        },
      ],
    },
  ];
}

export const experienceRulePrimaryColumns =
  createExperienceRuleColumns() as TableColumn<BaseGrowthRewardRuleDto>[];

export const experienceRecordPrimaryColumns =
  createExperienceRecordColumns() as TableColumn<UserExperienceRecordDto>[];

export const formSchema = createExperienceRuleFormSchema();
export const pageColumns = createExperienceRuleColumns();
export const searchFormSchema = createExperienceRuleSearchSchema();
