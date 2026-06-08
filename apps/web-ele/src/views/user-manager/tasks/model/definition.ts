import type { TaskTemplateFilterValueDto } from './options';

import type {
  AdminTaskDefinitionDetailDto,
  AdminTaskDefinitionListItemDto,
  TaskEventTemplateOptionDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import {
  buildTemplateKeyOptions,
  parseTaskRewardItems,
  taskClaimModeOptions,
  taskDefinitionStatusOptions,
  taskRepeatTypeOptions,
  taskSceneTypeOptions,
  taskStepDedupeScopeOptions,
  taskStepTriggerModeOptions,
} from './options';

export type TaskDefinitionRow = AdminTaskDefinitionListItemDto & {
  deleteLoading?: boolean;
  statusLoading?: boolean;
};

type TaskDefinitionSchemaField = EsFormSchema[number];

const taskDefinitionFieldCatalog = {
  sceneType: {
    component: 'Select',
    fieldName: 'sceneType',
    label: '任务场景',
  },
  status: {
    component: 'RadioGroup',
    fieldName: 'status',
    label: '任务状态',
  },
  title: {
    component: 'Input',
    fieldName: 'title',
    label: '任务标题',
  },
} satisfies Record<string, TaskDefinitionSchemaField>;

function withoutColorOptions<T extends { color?: unknown }>(options: T[]) {
  return options.map(({ color: _color, ...rest }) => rest);
}

function createTaskDefinitionField(
  field: keyof typeof taskDefinitionFieldCatalog,
  overrides: Partial<TaskDefinitionSchemaField> = {},
): TaskDefinitionSchemaField {
  const base = taskDefinitionFieldCatalog[field] as TaskDefinitionSchemaField;
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

function getSelectedTemplate(
  templateOptions: TaskEventTemplateOptionDto[],
  templateKey: unknown,
) {
  return typeof templateKey === 'string'
    ? templateOptions.find((item) => item.templateKey === templateKey)
    : undefined;
}

function buildTemplateFilterFieldOptions(
  templateOptions: TaskEventTemplateOptionDto[],
  templateKey: unknown,
) {
  const selectedTemplate = getSelectedTemplate(templateOptions, templateKey);

  return (
    selectedTemplate?.availableFilterFields.map((item) => ({
      label: `${item.label} · ${formatFilterValueType(item.valueType)}`,
      value: item.key,
    })) || []
  );
}

function getTemplateFilterField(
  templateOptions: TaskEventTemplateOptionDto[],
  templateKey: unknown,
  key: unknown,
) {
  const selectedTemplate = getSelectedTemplate(templateOptions, templateKey);
  return typeof key === 'string'
    ? selectedTemplate?.availableFilterFields.find((item) => item.key === key)
    : undefined;
}

function buildTemplateFilterValueOptions(
  templateOptions: TaskEventTemplateOptionDto[],
  values: { key?: string; stepTemplateKey?: string },
) {
  return (
    getTemplateFilterField(templateOptions, values.stepTemplateKey, values.key)
      ?.options || []
  );
}

function shouldShowTemplateFilterFields(
  templateOptions: TaskEventTemplateOptionDto[],
  values: Partial<Record<string, unknown>>,
) {
  return (
    Number(values.stepTriggerMode ?? 1) === 2 &&
    buildTemplateFilterFieldOptions(templateOptions, values.stepTemplateKey)
      .length > 0
  );
}

function formatFilterValueType(valueType: string) {
  if (valueType === 'boolean') return '是/否';
  if (valueType === 'number') return '数字';
  return '文本';
}

function mapTemplateFiltersToFormRecord(
  filters?: null | TaskTemplateFilterValueDto[],
) {
  return {
    stepFilters: filters?.length
      ? filters.map((item) => ({
          key: item.key,
          value: String(item.value ?? ''),
        }))
      : [],
  };
}

export function createTaskDefinitionFormSchema(
  templateOptions: TaskEventTemplateOptionDto[],
): EsFormSchema {
  return [
    {
      component: 'Upload',
      componentProps: {
        accept: 'image/*',
        maxCount: 1,
        multiple: false,
        placeholder: '请上传任务封面',
        scene: 'task',
      },
      fieldName: 'cover',
      label: '任务封面',
    },
    createTaskDefinitionField('title', {
      componentProps: {
        maxlength: 80,
        placeholder: '请输入任务标题',
        showWordLimit: true,
      },
      rules: 'required',
    }),
    createTaskDefinitionField('sceneType', {
      componentProps: {
        class: 'w-full',
        options: taskSceneTypeOptions,
        placeholder: '请选择任务场景',
      },
      defaultValue: 1,
      rules: 'required',
    }),
    createTaskDefinitionField('status', {
      componentProps: {
        class: 'w-full',
        options: withoutColorOptions(taskDefinitionStatusOptions),
      },
      defaultValue: 0,
      rules: 'required',
    }),
    {
      component: 'RadioGroup',
      componentProps: {
        class: 'w-full',
        options: taskClaimModeOptions,
      },
      defaultValue: 1,
      fieldName: 'claimMode',
      label: '领取方式',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        class: 'w-full',
        options: taskRepeatTypeOptions,
        placeholder: '请选择重复周期',
      },
      defaultValue: 0,
      fieldName: 'repeatType',
      label: '重复周期',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: '!w-full',
        min: 0,
        placeholder: '请输入排序值',
      },
      defaultValue: 0,
      fieldName: 'sortOrder',
      help: '数值越小越靠前，0 表示默认排序',
      label: '排序值',
      rules: 'required',
    },
    {
      component: 'DatePicker',
      componentProps: {
        class: '!w-full',
        placeholder: '请选择开始时间',
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
      },
      fieldName: 'startAt',
      label: '开始时间',
    },
    {
      component: 'DatePicker',
      componentProps: {
        class: '!w-full',
        placeholder: '请选择结束时间',
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
      },
      fieldName: 'endAt',
      label: '结束时间',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入任务说明',
        rows: 4,
        type: 'textarea',
      },
      fieldName: 'description',
      formItemClass: 'col-span-2',
      label: '任务说明',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: '!w-full',
        min: 0,
        placeholder: '请输入积分奖励',
      },
      fieldName: 'rewardPoints',
      help: '0 或不填表示不发积分',
      label: '奖励积分',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: '!w-full',
        min: 0,
        placeholder: '请输入经验奖励',
      },
      fieldName: 'rewardExperience',
      help: '0 或不填表示不发经验',
      label: '奖励经验',
    },
    {
      component: 'Divider',
      fieldName: 'stepDivider',
      formItemClass: 'col-span-2',
      label: '完成条件',
    },
    {
      component: 'RadioGroup',
      componentProps: (values) => ({
        class: 'w-full',
        options:
          Number(values.claimMode ?? 1) === 1
            ? taskStepTriggerModeOptions.filter((item) => item.value === 2)
            : taskStepTriggerModeOptions.filter((item) => item.value === 1),
      }),
      defaultValue: 2,
      dependencies: {
        triggerFields: ['claimMode'],
        trigger(values, _actions, controller) {
          void controller.setFieldValue(
            'stepTriggerMode',
            Number(values.claimMode ?? 1) === 1 ? 2 : 1,
          );
        },
      },
      fieldName: 'stepTriggerMode',
      label: '触发方式',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: '!w-full',
        min: 1,
        placeholder: '请输入目标值',
      },
      defaultValue: 1,
      fieldName: 'stepTargetValue',
      label: '完成次数',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        class: 'w-full',
        clearable: true,
        filterable: true,
        options: buildTemplateKeyOptions(templateOptions),
        placeholder: '事件驱动步骤请选择模板',
      },
      fieldName: 'stepTemplateKey',
      help: '不可用模板会在下拉中禁用；标签已包含目标类型和接线状态',
      label: '事件模板',
    },
    {
      component: 'VbenFormFieldArray',
      componentProps: {
        addButtonText: '添加过滤条件',
        emptyText: '当前模板不需要过滤条件',
        schema: [
          {
            component: 'Select',
            componentProps: (values: { stepTemplateKey?: string }) => ({
              class: 'w-full',
              clearable: true,
              filterable: true,
              options: buildTemplateFilterFieldOptions(
                templateOptions,
                values.stepTemplateKey,
              ),
              placeholder: '请选择过滤字段',
            }),
            fieldName: 'key',
            label: '过滤字段',
            rules: 'required',
          },
          {
            component: 'Select',
            componentProps: (values: {
              key?: string;
              stepTemplateKey?: string;
            }) => ({
              allowCreate: true,
              class: 'w-full',
              clearable: true,
              filterable: true,
              options: buildTemplateFilterValueOptions(templateOptions, values),
              placeholder:
                getTemplateFilterField(
                  templateOptions,
                  values.stepTemplateKey,
                  values.key,
                )?.placeholder || '请选择或填写过滤值',
            }),
            fieldName: 'value',
            label: '过滤值',
            rules: 'required',
          },
        ],
      },
      dependencies: {
        show: (values) =>
          shouldShowTemplateFilterFields(templateOptions, values),
        triggerFields: ['stepTriggerMode', 'stepTemplateKey'],
      },
      fieldName: 'stepFilters',
      formItemClass: 'col-span-2',
      label: '过滤条件',
    },
    {
      component: 'Select',
      componentProps: {
        class: 'w-full',
        clearable: true,
        options: taskStepDedupeScopeOptions,
        placeholder: '不填表示按次数累计',
      },
      fieldName: 'stepDedupeScope',
      label: '去重范围',
      help: '仅事件驱动步骤可用；设置后按不同对象累计',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入步骤说明',
        rows: 4,
        type: 'textarea',
      },
      fieldName: 'stepDescription',
      formItemClass: 'col-span-2',
      label: '完成条件说明',
    },
  ];
}

const taskDefinitionListSchema: EsFormSchema = [
  { component: 'Upload', fieldName: 'cover', label: '封面' },
  createTaskDefinitionField('title'),
  { component: 'Input', fieldName: 'code', label: '任务编码' },
  createTaskDefinitionField('sceneType'),
  createTaskDefinitionField('status'),
  {
    component: 'RadioGroup',
    componentProps: { options: taskClaimModeOptions },
    fieldName: 'claimMode',
    label: '领取方式',
  },
  {
    component: 'Select',
    componentProps: { options: taskRepeatTypeOptions },
    fieldName: 'repeatType',
    label: '重复周期',
  },
  { component: 'InputNumber', fieldName: 'stepCount', label: '步骤数' },
  {
    component: 'InputNumber',
    fieldName: 'activeInstanceCount',
    label: '活跃实例',
  },
  {
    component: 'InputNumber',
    fieldName: 'pendingRewardCompensationCount',
    label: '待补偿奖励',
  },
  { component: 'InputNumber', fieldName: 'sortOrder', label: '排序值' },
  { component: 'DatePicker', fieldName: 'startAt', label: '开始时间' },
  { component: 'DatePicker', fieldName: 'endAt', label: '结束时间' },
];

export const definitionSearchFormSchema = formSchemaTransform.toSearchSchema(
  taskDefinitionListSchema,
  {
    title: {
      show: true,
      componentProps: {
        clearable: true,
        placeholder: '任务标题',
      },
    },
    sceneType: {
      show: true,
      componentProps: {
        clearable: true,
        options: taskSceneTypeOptions,
        placeholder: '任务场景',
      },
    },
    status: {
      show: true,
      component: 'Select',
      componentProps: {
        clearable: true,
        options: taskDefinitionStatusOptions,
        placeholder: '任务状态',
      },
    },
    dateRange: {
      component: 'DatePicker',
      componentProps: {
        clearable: true,
        endPlaceholder: '结束日期',
        startPlaceholder: '开始日期',
        type: 'daterange',
        valueFormat: 'YYYY-MM-DD',
      },
      fieldName: 'dateRange',
    },
  },
);

export const taskDefinitionColumns =
  formSchemaTransform.toTableColumns<TaskDefinitionRow>(
    taskDefinitionListSchema,
    {
      cover: {
        cellRender: {
          name: 'CellImage',
        },
        fixed: 'left',
        minWidth: 90,
      },
      title: {
        fixed: 'left',
        minWidth: 220,
        showOverflow: 'tooltip',
        slots: { default: 'title' },
      },
      code: {
        minWidth: 160,
      },
      stepCount: {
        formatter: ({ cellValue }) => cellValue ?? '-',
      },
      activeInstanceCount: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 120,
      },
      pendingRewardCompensationCount: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 120,
      },
      sortOrder: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        sortable: true,
      },
      startAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 170,
      },
      endAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 170,
      },
      updatedAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 170,
        sortable: true,
      },
      actions: {
        show: true,
        minWidth: 260,
      },
    },
  );

export function mapTaskDefinitionDetailToFormRecord(
  detail: AdminTaskDefinitionDetailDto,
) {
  const step = detail.steps?.[0];
  const filterRecord = mapTemplateFiltersToFormRecord(step?.filters);

  return {
    ...detail,
    ...parseTaskRewardItems(detail.rewardItems),
    ...filterRecord,
    stepDedupeScope: step?.dedupeScope ?? undefined,
    stepDescription: step?.description ?? '',
    stepTargetValue: step?.targetValue ?? 1,
    stepTemplateKey: step?.templateKey ?? undefined,
    stepTriggerMode: step?.triggerMode ?? 1,
  };
}
