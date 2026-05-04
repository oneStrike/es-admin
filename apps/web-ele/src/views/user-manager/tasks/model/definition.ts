import type {
  AdminTaskDefinitionDetailDto,
  AdminTaskDefinitionListItemDto,
  TaskEventTemplateOptionDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import {
  buildTemplateKeyOptions,
  formatJsonTextarea,
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

export const definitionSearchFormSchema: EsFormSchema = [
  {
    component: 'Input',
    fieldName: 'title',
    componentProps: {
      clearable: true,
      placeholder: '任务标题',
    },
  },
  {
    component: 'Select',
    fieldName: 'sceneType',
    componentProps: {
      clearable: true,
      options: taskSceneTypeOptions,
      placeholder: '任务场景',
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    componentProps: {
      clearable: true,
      options: taskDefinitionStatusOptions,
      placeholder: '任务状态',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'dateRange',
    componentProps: {
      clearable: true,
      endPlaceholder: '结束时间',
      startPlaceholder: '开始时间',
      type: 'datetimerange',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];

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
    {
      component: 'Input',
      componentProps: {
        maxlength: 80,
        placeholder: '请输入任务标题',
        showWordLimit: true,
      },
      fieldName: 'title',
      label: '任务标题',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        class: 'w-full',
        options: taskSceneTypeOptions,
        placeholder: '请选择任务场景',
      },
      defaultValue: 1,
      fieldName: 'sceneType',
      label: '任务场景',
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        class: 'w-full',
        options: taskDefinitionStatusOptions.map(
          ({ color: _color, ...rest }) => rest,
        ),
      },
      defaultValue: 0,
      fieldName: 'status',
      label: '任务状态',
      rules: 'required',
    },
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
      componentProps: {
        class: 'w-full',
        options: taskStepTriggerModeOptions,
      },
      defaultValue: 1,
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
    {
      component: 'Input',
      componentProps: {
        placeholder:
          '请输入过滤条件 JSON 数组，例如 [{"key":"targetType","label":"目标类型","value":"comic_work"}]',
        rows: 4,
        type: 'textarea',
      },
      fieldName: 'stepFiltersText',
      formItemClass: 'col-span-2',
      help: '仅事件驱动步骤使用；会按模板声明的字段键和值类型校验并规范化',
      label: '过滤条件',
    },
  ];
}

const taskDefinitionTableSchema: EsFormSchema = [
  { component: 'Upload', fieldName: 'cover', label: '封面' },
  { component: 'Input', fieldName: 'title', label: '任务标题' },
  { component: 'Input', fieldName: 'code', label: '任务编码' },
  { component: 'Select', fieldName: 'sceneType', label: '任务场景' },
  { component: 'RadioGroup', fieldName: 'status', label: '任务状态' },
  { component: 'RadioGroup', fieldName: 'claimMode', label: '领取方式' },
  { component: 'Select', fieldName: 'repeatType', label: '重复周期' },
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

export const taskDefinitionColumns =
  formSchemaTransform.toTableColumns<TaskDefinitionRow>(
    taskDefinitionTableSchema,
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
        formatter: undefined,
        minWidth: 220,
        showOverflow: 'tooltip',
        slots: { default: 'title' },
      },
      code: {
        minWidth: 160,
      },
      sceneType: {
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: taskSceneTypeOptions,
          },
        },
        minWidth: 120,
      },
      status: {
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: taskDefinitionStatusOptions,
          },
        },
        minWidth: 120,
      },
      claimMode: {
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: taskClaimModeOptions,
          },
        },
        minWidth: 120,
      },
      repeatType: {
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: taskRepeatTypeOptions,
          },
        },
        minWidth: 120,
      },
      stepCount: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 100,
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
        minWidth: 100,
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
        fixed: 'right',
        minWidth: 260,
        slots: { default: 'actions' },
      },
    },
  );

export function mapTaskDefinitionDetailToFormRecord(
  detail: AdminTaskDefinitionDetailDto,
) {
  const step = detail.steps?.[0];

  return {
    ...detail,
    ...parseTaskRewardItems(detail.rewardItems),
    stepDedupeScope: step?.dedupeScope ?? undefined,
    stepDescription: step?.description ?? '',
    stepFiltersText: formatJsonTextarea(step?.filters),
    stepTargetValue: step?.targetValue ?? 1,
    stepTemplateKey: step?.templateKey ?? undefined,
    stepTriggerMode: step?.triggerMode ?? 1,
  };
}
