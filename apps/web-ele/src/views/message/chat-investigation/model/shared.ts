import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdminChatConversationPageItemDto,
  AdminChatMessagePageItemDto,
  AdminChatUserSummaryDto,
  MessageChatConversationPageRequest,
  MessageChatMessagePageRequest,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { createAppUserTableSelectProps } from '#/views/user-manager/shared/app-user-select';

type DateRangeSearchValues = {
  dateRange?: string[];
};

export const chatMessageTypeOptions = [
  { label: '文本', value: 1, color: 'primary' as const },
  { label: '图片', value: 2, color: 'success' as const },
  { label: '语音', value: 3, color: 'warning' as const },
  { label: '视频', value: 4, color: 'warning' as const },
  { label: '系统', value: 99, color: 'info' as const },
];

export const chatMessageStatusOptions = [
  { label: '正常', value: 1, color: 'success' as const },
  { label: '已撤回', value: 2, color: 'warning' as const },
  { label: '已删除', value: 3, color: 'info' as const },
];

export const booleanTagOptions = [
  { label: '是', value: true, color: 'success' as const },
  { label: '否', value: false, color: 'info' as const },
];

export const conversationVisibilityOptions = [
  { label: '可见', value: false, color: 'success' as const },
  { label: '已隐藏', value: true, color: 'warning' as const },
];

const userSelectProps = createAppUserTableSelectProps({
  emitScalar: true,
  multiple: false,
  placeholder: '搜索并选择排查用户',
  title: '选择排查用户',
});

const peerUserSelectProps = createAppUserTableSelectProps({
  emitScalar: true,
  multiple: false,
  placeholder: '搜索并选择对方用户',
  title: '选择聊天对方',
});

const conversationSearchBaseSchema: EsFormSchema = [
  {
    component: 'TableSelect',
    componentProps: userSelectProps,
    fieldName: 'userId',
    label: '排查用户',
  },
  {
    component: 'TableSelect',
    componentProps: peerUserSelectProps,
    fieldName: 'peerUserId',
    label: '对方用户',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: booleanTagOptions.map(({ color: _color, ...rest }) => rest),
      placeholder: '未读状态',
    },
    fieldName: 'unreadOnly',
    label: '未读状态',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: conversationVisibilityOptions.map(
        ({ color: _color, ...rest }) => rest,
      ),
      placeholder: '列表状态',
    },
    fieldName: 'hiddenOnly',
    label: '列表状态',
  },
  {
    component: 'DatePicker',
    componentProps: {
      clearable: true,
      endPlaceholder: '结束时间',
      startPlaceholder: '开始时间',
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'dateRange',
    label: '最后消息时间',
  },
  {
    component: 'InputNumber',
    fieldName: 'conversationId',
    label: '会话编号',
  },
];

const messageSearchBaseSchema: EsFormSchema = [
  {
    component: 'TableSelect',
    componentProps: createAppUserTableSelectProps({
      emitScalar: true,
      multiple: false,
      placeholder: '搜索并选择发送用户',
      title: '选择发送用户',
    }),
    fieldName: 'senderUserId',
    label: '发送用户',
  },
  {
    component: 'DatePicker',
    componentProps: {
      clearable: true,
      endPlaceholder: '结束时间',
      startPlaceholder: '开始时间',
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'dateRange',
    label: '发送时间',
  },
];

export const conversationSearchFormSchema = formSchemaTransform.toSearchSchema(
  conversationSearchBaseSchema,
  {
    userId: {
      show: true,
      component: 'TableSelect',
      componentProps: userSelectProps,
    },
    peerUserId: {
      show: true,
      component: 'TableSelect',
      componentProps: peerUserSelectProps,
    },
    unreadOnly: { show: true },
    hiddenOnly: { show: true },
    dateRange: { show: true },
    conversationId: {
      show: false,
      componentProps: {
        min: 1,
        placeholder: '高级诊断：会话编号',
      },
    },
  },
);

export const messageSearchFormSchema = formSchemaTransform.toSearchSchema(
  messageSearchBaseSchema,
  {
    senderUserId: { show: true },
    dateRange: { show: true },
  },
);

export const conversationColumns: VxeGridProps<AdminChatConversationPageItemDto>['columns'] =
  [
    { fixed: 'left', title: '序号', type: 'seq', width: 70 },
    {
      field: 'user',
      minWidth: 180,
      slots: { default: 'user' },
      title: '排查用户',
    },
    {
      field: 'peerUser',
      minWidth: 180,
      slots: { default: 'peerUser' },
      title: '对方用户',
    },
    {
      field: 'lastMessagePreview',
      formatter: ({ cellValue }) => cellValue ?? '-',
      minWidth: 260,
      showOverflow: 'tooltip',
      title: '最后消息摘要',
    },
    {
      field: 'unreadCount',
      minWidth: 110,
      title: '未读数',
    },
    {
      field: 'isPinned',
      minWidth: 100,
      slots: { default: 'isPinned' },
      title: '置顶',
    },
    {
      field: 'isHiddenForUser',
      minWidth: 110,
      slots: { default: 'visibility' },
      title: '列表状态',
    },
    {
      cellRender: { name: 'CellDate' },
      field: 'lastMessageAt',
      minWidth: 170,
      sortable: true,
      title: '最后消息时间',
    },
  ];

export const messageColumns: VxeGridProps<AdminChatMessagePageItemDto>['columns'] =
  [
    { fixed: 'left', title: '序号', type: 'seq', width: 70 },
    {
      field: 'senderId',
      minWidth: 150,
      slots: { default: 'sender' },
      title: '发送用户',
    },
    {
      field: 'messageType',
      minWidth: 110,
      slots: { default: 'messageType' },
      title: '消息类型',
    },
    {
      field: 'contentPreview',
      minWidth: 320,
      showOverflow: 'tooltip',
      title: '消息摘要',
    },
    {
      field: 'status',
      minWidth: 110,
      slots: { default: 'messageStatus' },
      title: '消息状态',
    },
    {
      field: 'hasPayload',
      minWidth: 120,
      slots: { default: 'hasPayload' },
      title: '扩展信息',
    },
    {
      field: 'hasBodyTokens',
      minWidth: 120,
      slots: { default: 'hasBodyTokens' },
      title: '模板变量',
    },
    {
      cellRender: { name: 'CellDate' },
      field: 'createdAt',
      minWidth: 170,
      sortable: true,
      title: '发送时间',
    },
  ];

function removeEmptyValues<T extends Record<string, unknown>>(values: T) {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => {
      if (value === '' || value === null || value === undefined) return false;
      if (Array.isArray(value) && value.length === 0) return false;

      return true;
    }),
  ) as Partial<T>;
}

function toOptionalNumber(value: unknown) {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : undefined;
}

function toOptionalBoolean(value: unknown) {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  return value === true || value === 'true';
}

function splitDateRange(formValues?: DateRangeSearchValues) {
  const { dateRange } = formValues || {};
  const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

  return { endDate, startDate };
}

export function buildConversationPageQuery(
  formValues?: DateRangeSearchValues &
    Partial<MessageChatConversationPageRequest>,
) {
  const { endDate, startDate } = splitDateRange(formValues);

  return removeEmptyValues({
    conversationId: toOptionalNumber(formValues?.conversationId),
    endDate,
    peerUserId: toOptionalNumber(formValues?.peerUserId),
    hiddenOnly: toOptionalBoolean(formValues?.hiddenOnly),
    startDate,
    unreadOnly: toOptionalBoolean(formValues?.unreadOnly),
    userId: toOptionalNumber(formValues?.userId),
  });
}

export function buildMessagePageQuery(
  conversationId: number,
  userId: number,
  formValues?: DateRangeSearchValues & Partial<MessageChatMessagePageRequest>,
) {
  const { endDate, startDate } = splitDateRange(formValues);

  return removeEmptyValues({
    conversationId,
    endDate,
    senderUserId: toOptionalNumber(formValues?.senderUserId),
    startDate,
    userId,
  });
}

export function formatChatUser(user?: AdminChatUserSummaryDto | null) {
  if (!user) {
    return '-';
  }

  return user.nickname
    ? `${user.nickname}（${user.userId}）`
    : `用户 ${user.userId}`;
}
