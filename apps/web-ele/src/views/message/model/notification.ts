export type NotificationCategoryKey =
  | 'comment_like'
  | 'comment_mention'
  | 'comment_reply'
  | 'system_announcement'
  | 'task_reminder'
  | 'topic_commented'
  | 'topic_favorited'
  | 'topic_like'
  | 'topic_mentioned'
  | 'user_followed';

export const notificationCategoryOptions: Array<{
  label: string;
  value: NotificationCategoryKey;
}> = [
  { label: '评论回复', value: 'comment_reply' },
  { label: '评论提及', value: 'comment_mention' },
  { label: '评论点赞', value: 'comment_like' },
  { label: '主题点赞', value: 'topic_like' },
  { label: '主题收藏', value: 'topic_favorited' },
  { label: '主题评论', value: 'topic_commented' },
  { label: '主题提及', value: 'topic_mentioned' },
  { label: '用户关注', value: 'user_followed' },
  { label: '系统公告', value: 'system_announcement' },
  { label: '任务提醒', value: 'task_reminder' },
];

export const notificationCategoryMap = Object.fromEntries(
  notificationCategoryOptions.map((item) => [item.value, item]),
) as Record<
  NotificationCategoryKey,
  (typeof notificationCategoryOptions)[number]
>;

export const canonicalTemplateMap: Record<
  NotificationCategoryKey,
  {
    contentTemplate: string;
    remark: string;
    titleTemplate: string;
  }
> = {
  comment_like: {
    contentTemplate: '{{data.object.snippet}}',
    remark: 'canonical notification template: 评论点赞',
    titleTemplate: '{{actor.nickname}} 点赞了你的评论',
  },
  comment_mention: {
    contentTemplate: '{{data.object.snippet}}',
    remark: 'canonical notification template: 评论提及',
    titleTemplate: '{{actor.nickname}} 在评论中提到了你',
  },
  comment_reply: {
    contentTemplate: '{{data.object.snippet}}',
    remark: 'canonical notification template: 评论回复',
    titleTemplate: '{{actor.nickname}} 回复了你的评论',
  },
  system_announcement: {
    contentTemplate: '{{content}}',
    remark: 'canonical notification template: 系统公告',
    titleTemplate: '{{title}}',
  },
  task_reminder: {
    contentTemplate: '{{content}}',
    remark: 'canonical notification template: 任务提醒',
    titleTemplate: '{{title}}',
  },
  topic_commented: {
    contentTemplate: '{{data.object.snippet}}',
    remark: 'canonical notification template: 主题评论',
    titleTemplate: '{{actor.nickname}} 评论了你的主题',
  },
  topic_favorited: {
    contentTemplate: '{{data.object.title}}',
    remark: 'canonical notification template: 主题收藏',
    titleTemplate: '{{actor.nickname}} 收藏了你的主题',
  },
  topic_like: {
    contentTemplate: '{{data.object.title}}',
    remark: 'canonical notification template: 主题点赞',
    titleTemplate: '{{actor.nickname}} 点赞了你的主题',
  },
  topic_mentioned: {
    contentTemplate: '{{data.object.title}}',
    remark: 'canonical notification template: 主题提及',
    titleTemplate: '{{actor.nickname}} 在主题中提到了你',
  },
  user_followed: {
    contentTemplate: '{{actor.nickname}} 关注了你',
    remark: 'canonical notification template: 用户关注',
    titleTemplate: '{{actor.nickname}} 关注了你',
  },
};

export const templateVariableOptions = [
  {
    description: '系统公告、任务提醒标题',
    label: '标题',
    value: '{{title}}',
  },
  {
    description: '系统公告、任务提醒正文',
    label: '正文',
    value: '{{content}}',
  },
  {
    description: '触发通知的用户昵称',
    label: '用户昵称',
    value: '{{actor.nickname}}',
  },
  {
    description: '主题标题',
    label: '对象标题',
    value: '{{data.object.title}}',
  },
  {
    description: '评论或内容摘要',
    label: '对象摘要',
    value: '{{data.object.snippet}}',
  },
];

const categoryVariableMap: Record<NotificationCategoryKey, string[]> = {
  comment_like: ['{{actor.nickname}}', '{{data.object.snippet}}'],
  comment_mention: ['{{actor.nickname}}', '{{data.object.snippet}}'],
  comment_reply: ['{{actor.nickname}}', '{{data.object.snippet}}'],
  system_announcement: ['{{title}}', '{{content}}'],
  task_reminder: ['{{title}}', '{{content}}'],
  topic_commented: ['{{actor.nickname}}', '{{data.object.snippet}}'],
  topic_favorited: ['{{actor.nickname}}', '{{data.object.title}}'],
  topic_like: ['{{actor.nickname}}', '{{data.object.title}}'],
  topic_mentioned: ['{{actor.nickname}}', '{{data.object.title}}'],
  user_followed: ['{{actor.nickname}}'],
};

export function getCanonicalTemplate(categoryKey?: string) {
  if (!isNotificationCategoryKey(categoryKey)) {
    return undefined;
  }

  return canonicalTemplateMap[categoryKey];
}

export function getNotificationCategoryLabel(categoryKey?: null | string) {
  if (!isNotificationCategoryKey(categoryKey)) {
    return categoryKey || '-';
  }

  return notificationCategoryMap[categoryKey].label;
}

export function getTemplateVariables(categoryKey?: null | string) {
  if (!isNotificationCategoryKey(categoryKey)) {
    return templateVariableOptions;
  }

  const values = categoryVariableMap[categoryKey];
  return templateVariableOptions.filter((item) => values.includes(item.value));
}

export function isNotificationCategoryKey(
  value?: null | string,
): value is NotificationCategoryKey {
  return notificationCategoryOptions.some((item) => item.value === value);
}
