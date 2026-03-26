import type { AnnouncementPageResponseDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formatUTC, formSchemaTransform } from '#/utils';

// 公告类型配置
export const announcementType = [
  {
    label: '平台公告',
    value: 0,
    color: '#1890ff', // 蓝色 - 代表官方、权威
  },
  {
    label: '活动公告',
    value: 1,
    color: '#52c41a', // 绿色 - 代表活力、活动
  },
  {
    label: '维护公告',
    value: 2,
    color: '#faad14', // 橙色 - 代表警示、注意
  },
  {
    label: '更新公告',
    value: 3,
    color: '#722ed1', // 紫色 - 代表创新、更新
  },
  {
    label: '政策公告',
    value: 4,
    color: '#eb2f96', // 洋红色 - 代表重要、规则
  },
];

export const announcementTypeObj: Record<
  number,
  { color: string; label: string }
> = {};
for (const item of announcementType) {
  announcementTypeObj[item.value] = {
    label: item.label,
    color: item.color,
  };
}

// 启用平台配置
export const enablePlatform = [
  {
    label: 'H5',
    value: 1,
  },
  {
    label: 'APP',
    value: 2,
  },
  {
    label: '小程序',
    value: 4,
  },
];

// 公告优先级配置
export const announcementPriority = [
  {
    label: '低优先级',
    value: 0,
    color: '#52c41a',
  },
  {
    label: '中等优先级',
    value: 1,
    color: '#1890ff',
  },
  {
    label: '高优先级',
    value: 2,
    color: '#fa8c16',
  },
  {
    label: '紧急',
    value: 3,
    color: '#ff4d4f',
  },
];

export const announcementPriorityObj: Record<
  number,
  { color: string; label: string }
> = {};
for (const item of announcementPriority) {
  announcementPriorityObj[item.value] = {
    label: item.label,
    color: item.color,
  };
}

// 发布状态配置
export const publishStatus = [
  {
    label: '未发布',
    value: 'unpublished',
    color: '#8c8c8c', // 灰色
  },
  {
    label: '已发布',
    value: 'published',
    color: '#52c41a', // 绿色
  },
  {
    label: '已过期',
    value: 'expired',
    color: '#ff4d4f', // 红色
  },
];

export const publishStatusObj: Record<
  string,
  { color: string; label: string }
> = {};
for (const item of publishStatus) {
  publishStatusObj[item.value] = {
    label: item.label,
    color: item.color,
  };
}

// 获取发布状态的函数
function normalizePublishEndTime(publishEndTime?: null | string) {
  if (!publishEndTime) {
    return undefined;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(publishEndTime)) {
    return `${publishEndTime} 23:59:59`;
  }

  return publishEndTime;
}

export function formatPublishEndTime(publishEndTime?: null | string) {
  const normalizedPublishEndTime = normalizePublishEndTime(publishEndTime);

  return normalizedPublishEndTime
    ? formatUTC(normalizedPublishEndTime, 'YYYY-MM-DD HH:mm:ss')
    : '-';
}

export function getPublishStatus(
  isPublished: boolean,
  publishEndTime?: null | string,
): string {
  if (!isPublished) {
    return 'unpublished';
  }

  const normalizedPublishEndTime = normalizePublishEndTime(publishEndTime);

  if (
    normalizedPublishEndTime &&
    new Date(normalizedPublishEndTime) < new Date()
  ) {
    return 'expired';
  }

  return 'published';
}

// 表单配置
export const formSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入公告标题',
    },
    fieldName: 'title',
    label: '公告标题',
    rules: 'required',
  },
  {
    label: '公告类型',
    fieldName: 'announcementType',
    component: 'Select',
    rules: 'required',
    componentProps: {
      placeholder: '请选择公告类型',
      options: announcementType,
      class: 'w-full',
    },
  },
  {
    label: '发布平台',
    fieldName: 'enablePlatform',
    component: 'CheckboxGroup',
    rules: 'required',
    componentProps: {
      placeholder: '请选择发布平台',
      options: enablePlatform,
      valueType: 'bitMask',
    },
  },
  {
    label: '优先级',
    fieldName: 'priorityLevel',
    component: 'Select',
    rules: 'required',
    componentProps: {
      placeholder: '请选择优先级',
      options: announcementPriority,
      class: 'w-full',
    },
  },
  {
    label: '跳转页面',
    fieldName: 'pageId',
    component: 'Select',
    componentProps: {
      placeholder: '请选择跳转页面',
      options: [],
      class: 'w-full',
    },
  },
  {
    label: '发布时间',
    fieldName: 'dateTimeRange',
    component: 'DatePicker',
    componentProps: {
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
    help: '仅对首页展示的公告有效，时效过期后将不会在首页展示',
  },
  {
    label: '是否置顶',
    fieldName: 'isPinned',
    component: 'RadioGroup',
    defaultValue: false,
    componentProps: {
      placeholder: '请选择是否置顶',
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
  },
  {
    label: '首页弹窗展示',
    fieldName: 'showAsPopup',
    component: 'RadioGroup',
    defaultValue: false,
    componentProps: {
      placeholder: '请选择是否首页弹窗展示',
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
  },
  {
    fieldName: 'popupBackgroundImage',
    component: 'Upload',
    label: '弹窗背景',
    componentProps: {
      maxCount: 1,
      scene: 'common',
      returnDataType: 'url',
    },
  },
  {
    label: '公告摘要',
    fieldName: 'summary',
    component: 'Input',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入公告摘要',
      rows: 3,
      maxlength: 200,
      showWordLimit: true,
    },
  },
  {
    label: '内容',
    fieldName: 'content',
    component: 'RichText',
    formItemClass: 'col-span-2',
    rules: 'required',
    componentProps: {
      placeholder: '请输入内容...',
    },
  },
];

// 表格列配置
export const announcementColumns =
  formSchemaTransform.toTableColumns<AnnouncementPageResponseDto>(formSchema, {
    content: {
      hide: true,
    },
    showAsPopup: {
      hide: true,
    },
    isPinned: {
      hide: true,
    },
    popupBackgroundImage: {
      hide: true,
    },
    summary: {
      hide: true,
    },
    actions: {
      show: true,
      width: 260,
    },
    title: {
      slots: { default: 'title' },
      showOverflow: 'tooltip',
    },
    dateTimeRange: {
      title: '发布时间',
      slots: { default: 'dateTimeRange' },
    },
    publishStatus: {
      title: '发布状态',
      sort: 99,
      width: 120,
      slots: { default: 'publishStatus' },
    },
    announcementType: {
      title: '公告类型',
      cellRender: {
        name: 'CellText',
        props: {
          mapOptions: announcementType,
        },
      },
    },
    priorityLevel: {
      cellRender: {
        name: 'CellText',
        props: {
          mapOptions: announcementPriority,
        },
      },
    },
    enablePlatform: {
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: enablePlatform,
        },
      },
    },
    pageId: {
      slots: { default: 'pageId' },
    },
  });

// 搜索表单配置
export const announcementFilter = formSchemaTransform.toSearchSchema(
  formSchema,
  {
    title: {
      sort: 99,
    },
    dateTimeRange: {
      sort: 98,
    },
    announcementType: {
      sort: 97,
    },
    priorityLevel: {
      sort: 96,
    },
    enablePlatform: {
      sort: 95,
    },
    pageId: {
      sort: 94,
    },
    isPinned: {
      sort: 93,
    },
  },
);
