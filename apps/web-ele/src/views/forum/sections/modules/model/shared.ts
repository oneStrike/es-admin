import type { BaseForumSectionDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { UploadSceneEnum } from '#/enum/api';
import { formSchemaTransform } from '#/utils';

import { topicReviewPolicy } from './constants';

const HTML_TAG_REGEX = /<[^>]+>/g;
const HTML_SPACE_ENTITY_REGEX = /&nbsp;/gi;
const EXTRA_WHITESPACE_REGEX = /\s+/g;

function toPlainTextFromRichText(content?: null | string) {
  if (!content) {
    return '-';
  }

  const text = content
    .replaceAll(HTML_TAG_REGEX, ' ')
    .replaceAll(HTML_SPACE_ENTITY_REGEX, ' ')
    .replaceAll(EXTRA_WHITESPACE_REGEX, ' ')
    .trim();

  return text || '-';
}

// 表单配置
export const formSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入板块名称',
    },
    fieldName: 'name',
    label: '板块名称',
    rules: 'required',
  },
  {
    label: '板块状态',
    fieldName: 'isEnabled',
    component: 'RadioGroup',
    rules: 'required',
    defaultValue: true,
    componentProps: {
      placeholder: '请选择板块状态',
      options: [
        {
          label: '启用',
          value: true,
        },
        {
          label: '禁用',
          value: false,
        },
      ],
      class: 'w-full',
    },
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入排序权重',
      min: 0,
      controlsPosition: 'right',
      class: 'w-full',
    },
    fieldName: 'sortOrder',
    label: '排序权重',
    rules: 'required',
  },
  {
    label: '审核策略',
    fieldName: 'topicReviewPolicy',
    component: 'Select',
    rules: 'required',
    defaultValue: 0,
    componentProps: {
      placeholder: '请选择审核策略',
      options: topicReviewPolicy,
      class: 'w-full',
    },
  },
  {
    label: '访问等级规则',
    fieldName: 'userLevelRuleId',
    component: 'Select',
    componentProps: {
      placeholder: '不选择表示所有用户可访问',
      options: [],
      clearable: true,
      filterable: true,
      class: 'w-full',
    },
  },
  {
    component: 'Upload',
    componentProps: {
      accept: 'image/*',
      maxCount: 1,
      multiple: false,
      returnDataType: 'url',
      scene: UploadSceneEnum.SHARED,
    },
    fieldName: 'icon',
    label: '板块图标',
    rules: 'required',
  },
  {
    component: 'Upload',
    componentProps: {
      accept: 'image/*',
      maxCount: 1,
      multiple: false,
      returnDataType: 'url',
      scene: UploadSceneEnum.SHARED,
    },
    fieldName: 'cover',
    label: '背景图',
    rules: 'required',
  },
  {
    label: '板块描述',
    fieldName: 'description',
    component: 'RichText',
    formItemClass: 'col-span-2',
    componentProps: {
      placeholder: '请输入板块描述信息...',
    },
  },
  {
    label: '运营备注',
    fieldName: 'remark',
    component: 'Input',
    formItemClass: 'col-span-2',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入运营备注，仅后台可见',
      rows: 3,
    },
  },
];

// 表格列配置
export const sectionColumns =
  formSchemaTransform.toTableColumns<BaseForumSectionDto>(formSchema, {
    icon: {
      hide: true,
    },
    cover: {
      hide: true,
    },
    actions: {
      show: true,
      width: 260,
    },
    description: {
      formatter: ({ cellValue }) => toPlainTextFromRichText(cellValue),
      showOverflow: 'tooltip',
      sort: 0,
    },
    isEnabled: {
      slots: { default: 'isEnabled' },
      width: 100,
    },
    sortOrder: {
      width: 100,
      sortable: true,
    },
    followersCount: {
      show: true,
      width: 100,
      sortable: true,
    },
    topicCount: {
      show: true,
      width: 100,
      sortable: true,
    },
    commentCount: {
      show: true,
      width: 100,
      sortable: true,
    },
    topicReviewPolicy: {
      width: 100,
    },
    userLevelRuleId: {
      hide: true,
    },
    remark: {
      hide: true,
    },
    createdAt: {
      show: true,
    },
    updatedAt: {
      show: true,
    },
    seq: {
      dragSort: true,
    },
  });

// 搜索表单配置
export const sectionFilter = formSchemaTransform
  .toSearchSchema(formSchema, {
    name: {
      show: true,
    },
    isEnabled: {
      show: true,
    },
    topicReviewPolicy: {
      show: true,
    },
  })
  .toReversed();
