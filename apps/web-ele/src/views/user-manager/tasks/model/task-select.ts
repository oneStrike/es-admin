import type { AdminTaskDefinitionListItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { taskPageApi } from '#/api/core';
import { formSchemaTransform } from '#/utils';

import {
  taskClaimModeOptions,
  taskDefinitionStatusOptions,
  taskSceneTypeOptions,
} from './options';

const taskSelectListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'title', label: '任务标题' },
  {
    component: 'Select',
    componentProps: { options: taskSceneTypeOptions },
    fieldName: 'sceneType',
    label: '任务场景',
  },
  {
    component: 'Select',
    componentProps: { options: taskDefinitionStatusOptions },
    fieldName: 'status',
    label: '任务状态',
  },
  {
    component: 'Select',
    componentProps: { options: taskClaimModeOptions },
    fieldName: 'claimMode',
    label: '领取方式',
  },
];

const taskSelectSearchSchema = formSchemaTransform.toSearchSchema(
  taskSelectListSchema,
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
      componentProps: {
        clearable: true,
        options: taskDefinitionStatusOptions,
        placeholder: '任务状态',
      },
    },
  },
);

const taskSelectColumns =
  formSchemaTransform.toTableColumns<AdminTaskDefinitionListItemDto>(
    taskSelectListSchema,
    {
      title: {
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      sceneType: {
        minWidth: 110,
      },
      status: {
        minWidth: 100,
      },
      claimMode: {
        minWidth: 110,
      },
    },
  );

export function createTaskDefinitionTableSelectProps(
  options: {
    emitScalar?: boolean;
    multiple?: boolean;
    placeholder?: string;
    title?: string;
  } = {},
) {
  const multiple = options.multiple ?? false;

  return {
    api: taskPageApi,
    columns: taskSelectColumns,
    displayField: 'title',
    emitScalar: options.emitScalar ?? true,
    keyField: 'id',
    multiple,
    onlyKey: true,
    placeholder: options.placeholder ?? '请选择任务',
    searchSchema: taskSelectSearchSchema,
    title: options.title ?? '选择任务',
    width: 1000,
  };
}
