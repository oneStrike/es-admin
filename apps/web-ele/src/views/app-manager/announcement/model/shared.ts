import type { AnnouncementPageResponse } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formatUTC, formSchemaTransform } from '#/utils';

export type AnnouncementRow = NonNullable<
  AnnouncementPageResponse['list']
>[number];
export type AnnouncementPageOption = {
  code?: string;
  label: string;
  name?: string;
  path?: string;
  value: number;
};
export type AnnouncementPublishStatus =
  | 'active'
  | 'expired'
  | 'scheduled'
  | 'unpublished';
export type AnnouncementFanoutStatus = 0 | 1 | 2 | 3;

// 公告类型配置
export const announcementType = [
  {
    label: '平台公告',
    value: 0,
    color: '#1890ff', // 蓝色 - 代表官方、权威
    tagType: 'primary',
  },
  {
    label: '活动公告',
    value: 1,
    color: '#52c41a', // 绿色 - 代表活力、活动
    tagType: 'success',
  },
  {
    label: '维护公告',
    value: 2,
    color: '#faad14', // 橙色 - 代表警示、注意
    tagType: 'warning',
  },
  {
    label: '更新公告',
    value: 3,
    color: '#722ed1', // 紫色 - 代表创新、更新
    tagType: 'primary',
  },
  {
    label: '政策公告',
    value: 4,
    color: '#eb2f96', // 洋红色 - 代表重要、规则
    tagType: 'danger',
  },
] as const;

export const announcementTypeObj = Object.fromEntries(
  announcementType.map((item) => [item.value, item] as const),
);

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
    value: 3,
  },
];

// 公告优先级配置
export const announcementPriority = [
  {
    label: '低优先级',
    value: 0,
    color: '#52c41a',
    tagType: 'success',
  },
  {
    label: '中等优先级',
    value: 1,
    color: '#1890ff',
    tagType: 'primary',
  },
  {
    label: '高优先级',
    value: 2,
    color: '#fa8c16',
    tagType: 'warning',
  },
  {
    label: '紧急',
    value: 3,
    color: '#ff4d4f',
    tagType: 'danger',
  },
] as const;

export const announcementPriorityObj = Object.fromEntries(
  announcementPriority.map((item) => [item.value, item] as const),
);

// 发布状态配置
export const publishStatus = [
  {
    label: '未发布',
    value: 'unpublished',
    color: '#8c8c8c', // 灰色
    tagType: 'info',
  },
  {
    label: '待生效',
    value: 'scheduled',
    color: '#faad14',
    tagType: 'warning',
  },
  {
    label: '生效中',
    value: 'active',
    color: '#52c41a', // 绿色
    tagType: 'success',
  },
  {
    label: '已过期',
    value: 'expired',
    color: '#ff4d4f', // 红色
    tagType: 'danger',
  },
] as const;

export const publishStatusObj = Object.fromEntries(
  publishStatus.map((item) => [item.value, item] as const),
);

export const fanoutStatus = [
  {
    label: '待处理',
    value: 0,
    tagType: 'info',
  },
  {
    label: '处理中',
    value: 1,
    tagType: 'warning',
  },
  {
    label: '成功',
    value: 2,
    tagType: 'success',
  },
  {
    label: '失败',
    value: 3,
    tagType: 'danger',
  },
] as const;

export const fanoutStatusObj = Object.fromEntries(
  fanoutStatus.map((item) => [item.value, item] as const),
);

export const fanoutEventText: Record<string, string> = {
  'announcement.published': '发布通知',
  'announcement.unpublished': '下线通知',
};

export const popupBackgroundPositionOptions = [
  { label: '居中', value: 'center' },
  { label: '顶部居中', value: 'top center' },
  { label: '顶部靠左', value: 'top left' },
  { label: '顶部靠右', value: 'top right' },
  { label: '底部居中', value: 'bottom center' },
  { label: '底部靠左', value: 'bottom left' },
  { label: '底部靠右', value: 'bottom right' },
  { label: '左侧居中', value: 'left center' },
  { label: '右侧居中', value: 'right center' },
] as const;

export const booleanOptions = [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  },
];

export function formatPageOptionLabel(page: {
  code?: null | string;
  name?: null | string;
  path?: null | string;
}) {
  return [page.name, page.code, page.path]
    .filter((item): item is string => typeof item === 'string' && !!item)
    .join(' · ');
}

function normalizePublishTime(
  value?: null | string,
  boundary: 'end' | 'start' = 'start',
) {
  if (!value) {
    return undefined;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return boundary === 'end' ? `${value} 23:59:59` : `${value} 00:00:00`;
  }

  return value;
}

export function formatPublishEndTime(publishEndTime?: null | string) {
  const normalizedPublishEndTime = normalizePublishTime(publishEndTime, 'end');

  return normalizedPublishEndTime
    ? formatUTC(normalizedPublishEndTime, 'YYYY-MM-DD HH:mm:ss')
    : '-';
}

export function formatPublishTime(value?: null | string) {
  const normalizedValue = normalizePublishTime(value);

  return normalizedValue
    ? formatUTC(normalizedValue, 'YYYY-MM-DD HH:mm:ss')
    : '-';
}

export function getPublishStatus(
  isPublished: boolean,
  publishStartTime?: null | string,
  publishEndTime?: null | string,
  serverPublishStatus?: AnnouncementPublishStatus | null,
): AnnouncementPublishStatus {
  if (serverPublishStatus) {
    return serverPublishStatus;
  }
  if (!isPublished) {
    return 'unpublished';
  }

  const now = new Date();
  const normalizedPublishStartTime = normalizePublishTime(
    publishStartTime,
    'start',
  );
  const normalizedPublishEndTime = normalizePublishTime(publishEndTime, 'end');

  if (
    normalizedPublishStartTime &&
    new Date(normalizedPublishStartTime) > now
  ) {
    return 'scheduled';
  }

  if (normalizedPublishEndTime && new Date(normalizedPublishEndTime) <= now) {
    return 'expired';
  }

  return 'active';
}

export function formatFanoutEventKey(value?: null | string) {
  if (!value) {
    return '-';
  }

  return fanoutEventText[value] ?? value;
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
    label: '消息中心通知',
    fieldName: 'isRealtime',
    component: 'RadioGroup',
    defaultValue: false,
    componentProps: {
      placeholder: '请选择是否同步到消息中心',
      options: booleanOptions,
    },
  },
  {
    label: '跳转页面',
    fieldName: 'pageId',
    component: 'Select',
    componentProps: {
      placeholder: '请选择跳转页面',
      options: [],
      clearable: true,
      filterable: true,
      class: 'w-full',
    },
  },
  {
    label: '发布时间',
    fieldName: 'dateTimeRange',
    component: 'DatePicker',
    componentProps: {
      type: 'datetimerange',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    help: '有效时间，影响 APP 展示、弹窗和消息中心通知',
  },
  {
    label: '是否置顶',
    fieldName: 'isPinned',
    component: 'RadioGroup',
    defaultValue: false,
    componentProps: {
      placeholder: '请选择是否置顶',
      options: booleanOptions,
    },
  },
  {
    label: 'APP 弹窗展示',
    fieldName: 'showAsPopup',
    component: 'RadioGroup',
    defaultValue: false,
    componentProps: {
      placeholder: '请选择是否 APP 弹窗展示',
      options: booleanOptions,
    },
  },
  {
    fieldName: 'popupBackgroundImage',
    component: 'Upload',
    label: '弹窗背景',
    componentProps: {
      accept: '.jpg,.jpeg,.png,.webp,image/*',
      listType: 'picture-card',
      maxCount: 1,
      scene: 'common',
      returnDataType: 'url',
    },
    dependencies: {
      show: ({ showAsPopup }) => showAsPopup === true,
      triggerFields: ['showAsPopup'],
    },
    help: '开启 APP 弹窗时必填',
  },
  {
    label: '背景图位置',
    fieldName: 'popupBackgroundPosition',
    component: 'Select',
    defaultValue: 'center',
    componentProps: {
      placeholder: '请选择背景图位置',
      options: popupBackgroundPositionOptions,
      class: 'w-full',
    },
    dependencies: {
      show: ({ showAsPopup }) => showAsPopup === true,
      triggerFields: ['showAsPopup'],
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
    component: 'VbenTiptap',
    formItemClass: 'col-span-2',
    rules: 'required',
    componentProps: {
      placeholder: '请输入内容...',
    },
  },
];

// 表格列配置
export function createAnnouncementColumns(
  pageOptions: AnnouncementPageOption[] = [],
) {
  return formSchemaTransform.toTableColumns<AnnouncementRow>(formSchema, {
    content: {
      hide: true,
    },
    showAsPopup: {
      hide: true,
    },
    isPinned: {
      hide: true,
    },
    isRealtime: {
      title: '消息中心',
      width: 110,
      cellRender: {
        name: 'CellTag',
      },
    },
    popupBackgroundImage: {
      hide: true,
    },
    popupBackgroundPosition: {
      hide: true,
    },
    summary: {
      hide: true,
    },
    fanoutDesiredEventKey: {
      hide: true,
    },
    fanoutLastError: {
      hide: true,
    },
    actions: {
      show: true,
      width: 320,
    },
    title: {
      slots: { default: 'title' },
      showOverflow: 'tooltip',
    },
    announcementType: {
      cellRender: {
        name: 'CellTag',
        props: { textColor: '#fff' },
      },
    },
    priorityLevel: {
      cellRender: {
        name: 'CellTag',
        props: { textColor: '#fff' },
      },
    },
    dateTimeRange: {
      title: '有效时间',
      formatter: ({ row }) =>
        row.publishStartTime || row.publishEndTime
          ? `${formatPublishTime(row.publishStartTime)} - ${formatPublishEndTime(row.publishEndTime)}`
          : '-',
    },
    publishStatus: {
      title: '发布状态',
      sort: 99,
      width: 120,
      slots: { default: 'publishStatus' },
    },
    pageId: {
      cellRender:
        pageOptions.length > 0
          ? {
              name: 'CellText',
              props: { mapOptions: pageOptions },
            }
          : undefined,
      formatter:
        pageOptions.length > 0
          ? undefined
          : ({ row }) => (row.pageId ? '未加载页面' : '-'),
    },
    fanoutStatus: {
      title: '消息中心状态',
      width: 130,
      slots: { default: 'fanoutStatus' },
    },
    fanoutUpdatedAt: {
      title: '通知更新时间',
      width: 170,
      slots: { default: 'fanoutUpdatedAt' },
    },
  });
}

// 搜索表单配置
export const announcementFilter = formSchemaTransform.toSearchSchema(
  formSchema,
  {
    publishStatus: {
      component: 'Select',
      componentProps: {
        clearable: true,
        class: 'w-[180px]',
        options: publishStatus,
        placeholder: '发布状态',
      },
      fieldName: 'publishStatus',
      hideLabel: true,
      label: '',
      sort: 100,
    },
    fanoutStatus: {
      component: 'Select',
      componentProps: {
        clearable: true,
        class: 'w-[180px]',
        options: fanoutStatus,
        placeholder: '消息中心状态',
      },
      fieldName: 'fanoutStatus',
      hideLabel: true,
      label: '',
      sort: 99,
    },
    title: {
      sort: 98,
    },
    dateTimeRange: {
      sort: 97,
    },
    announcementType: {
      sort: 96,
    },
    priorityLevel: {
      sort: 95,
    },
    isRealtime: {
      sort: 94,
    },
    showAsPopup: {
      sort: 93,
    },
    enablePlatform: {
      sort: 92,
    },
    pageId: {
      sort: 91,
    },
    isPinned: {
      sort: 90,
    },
  },
);
