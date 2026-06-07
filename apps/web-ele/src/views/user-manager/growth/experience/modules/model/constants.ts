import type {
  GrowthConfigurableRewardEventOptionDto,
  GrowthRuleEventPageItemDto,
} from '#/api/types';

export const EXPERIENCE_ASSET_KEY = '';
export const EXPERIENCE_ASSET_TYPE = 2 as const;

export const experienceEnabledOptions = [
  { color: 'success' as const, label: '启用', value: true },
  { color: 'danger' as const, label: '禁用', value: false },
];

export const experienceHasRuleOptions = [
  { label: '有关联规则', value: true },
  { label: '无关联规则', value: false },
];

export const experienceDeltaDirectionOptions = [
  { color: 'success' as const, label: '增加', value: 1 },
  { color: 'danger' as const, label: '减少', value: 2 },
];

export const experienceRuleArchiveStatusOptions = [
  { color: 'success' as const, label: '当前规则', value: 1 },
  { color: 'info' as const, label: '已归档', value: 2 },
  { color: 'warning' as const, label: '全部规则', value: 3 },
];

export const experienceImplStatusOptions = [
  { color: 'info' as const, label: '已声明', value: 'declared' },
  { color: 'success' as const, label: '已实现', value: 'implemented' },
  { color: 'warning' as const, label: '历史兼容', value: 'legacy_compat' },
];

export const experienceRuleDomainOptions = [
  { label: '徽章', value: 'badge' },
  { label: '漫画章节', value: 'comic_chapter' },
  { label: '漫画作品', value: 'comic_work' },
  { label: '评论', value: 'comment' },
  { label: '互动', value: 'engagement' },
  { label: '论坛', value: 'forum' },
  { label: '小说章节', value: 'novel_chapter' },
  { label: '小说作品', value: 'novel_work' },
  { label: '资料', value: 'profile' },
  { label: '举报', value: 'report' },
  { label: '社交', value: 'social' },
  { label: '系统', value: 'system' },
];

export const experienceGovernanceGateOptions = [
  { label: '无闸门', value: 'none' },
  { label: '主题审核', value: 'topic_approval' },
  { label: '评论审核', value: 'comment_approval' },
  { label: '举报裁决', value: 'report_judgement' },
];

export type ExperienceEventOption = {
  disabled?: boolean;
  disabledReason?: null | string;
  domain?: null | string;
  eventName: string;
  implStatus?: null | string;
  isImplemented?: boolean;
  isRuleConfigurable?: boolean;
  label: string;
  ruleKey?: null | string;
  supportsExperienceRule?: boolean;
  value: number;
};

type ConfigurableEventOption = GrowthConfigurableRewardEventOptionDto;
type CoverageEventOption = GrowthRuleEventPageItemDto;
type ServerEventOption = ConfigurableEventOption | CoverageEventOption;

function hasCoverageFields(
  event: ServerEventOption,
): event is CoverageEventOption {
  return 'disabledReason' in event || 'supportsExperienceRule' in event;
}

export function isConfigurableExperienceEvent(event: ServerEventOption) {
  const supportsExperienceRule = hasCoverageFields(event)
    ? event.supportsExperienceRule
    : true;

  return (
    event.implStatus === 'implemented' &&
    event.isImplemented === true &&
    event.isRuleConfigurable === true &&
    supportsExperienceRule !== false
  );
}

function createEventLabel(event: ServerEventOption) {
  return event.eventName;
}

function createDisabledReason(event: ServerEventOption) {
  if (isConfigurableExperienceEvent(event)) return undefined;
  if (hasCoverageFields(event) && event.disabledReason) {
    return event.disabledReason;
  }
  if (event.implStatus !== 'implemented') return '事件尚未正式接入';
  if (event.isRuleConfigurable !== true) return '事件不允许配置基础奖励';
  return '事件暂不支持经验规则';
}

export function createExperienceEventOptions(
  events: ServerEventOption[] = [],
  config: { configurableOnly?: boolean } = {},
): ExperienceEventOption[] {
  const configurableOnly = config.configurableOnly ?? true;

  return events
    .filter((event) =>
      configurableOnly ? isConfigurableExperienceEvent(event) : true,
    )
    .map((event) => {
      const disabledReason = createDisabledReason(event);

      return {
        disabled: Boolean(disabledReason),
        disabledReason,
        domain: event.domain,
        eventName: event.eventName,
        implStatus: event.implStatus,
        isImplemented: event.isImplemented,
        isRuleConfigurable: event.isRuleConfigurable,
        label: createEventLabel(event),
        ruleKey: event.ruleKey,
        supportsExperienceRule: hasCoverageFields(event)
          ? event.supportsExperienceRule
          : true,
        value: Number(event.ruleType),
      };
    });
}

export function createExperienceEventLabelMap(
  options: ExperienceEventOption[] = [],
) {
  return Object.fromEntries(
    options.map((option) => [option.value, option.label]),
  ) as Record<number, string>;
}

export function formatExperienceEventLabel(
  value?: null | number,
  options: ExperienceEventOption[] = [],
) {
  if (value === null || value === undefined) return '-';

  return createExperienceEventLabelMap(options)[Number(value)] || `事件 ${value}`;
}
