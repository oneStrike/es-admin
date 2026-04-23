import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type {
  AdminTaskDefinitionDetailDto,
  AdminTaskDefinitionListItemDto,
  TaskEventTemplateOptionDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

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

export const taskDefinitionColumns: VxeGridPropTypes.Columns<TaskDefinitionRow> =
  [
    {
      field: 'cover',
      fixed: 'left',
      minWidth: 90,
      title: '封面',
      cellRender: {
        name: 'CellImage',
      },
    },
    {
      field: 'title',
      fixed: 'left',
      minWidth: 220,
      showOverflow: 'tooltip',
      slots: { default: 'title' },
      title: '任务标题',
    },
    {
      field: 'code',
      minWidth: 160,
      title: '任务编码',
    },
    {
      field: 'sceneType',
      minWidth: 120,
      title: '任务场景',
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: taskSceneTypeOptions,
        },
      },
    },
    {
      field: 'status',
      minWidth: 120,
      title: '任务状态',
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: taskDefinitionStatusOptions,
        },
      },
    },
    {
      field: 'claimMode',
      minWidth: 120,
      title: '领取方式',
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: taskClaimModeOptions,
        },
      },
    },
    {
      field: 'repeatType',
      minWidth: 120,
      title: '重复周期',
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: taskRepeatTypeOptions,
        },
      },
    },
    {
      field: 'stepCount',
      minWidth: 100,
      title: '步骤数',
    },
    {
      field: 'activeInstanceCount',
      minWidth: 120,
      title: '活跃实例',
    },
    {
      field: 'pendingRewardCompensationCount',
      minWidth: 120,
      title: '待补偿奖励',
    },
    {
      field: 'sortOrder',
      minWidth: 100,
      sortable: true,
      title: '排序值',
    },
    {
      field: 'startAt',
      minWidth: 170,
      title: '开始时间',
      cellRender: {
        name: 'CellDate',
      },
    },
    {
      field: 'endAt',
      minWidth: 170,
      title: '结束时间',
      cellRender: {
        name: 'CellDate',
      },
    },
    {
      field: 'updatedAt',
      minWidth: 170,
      sortable: true,
      title: '更新时间',
      cellRender: {
        name: 'CellDate',
      },
    },
    {
      field: 'actions',
      fixed: 'right',
      minWidth: 260,
      slots: { default: 'actions' },
      title: '操作',
    },
  ];

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
