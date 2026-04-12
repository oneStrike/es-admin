import type { AppUpdateStoreLinkInputDto } from '#/api/types';

export type AppUpdateChannelOption = {
  label: string;
  value: string;
};

export type AppUpdateChannelDictionaryItem = {
  code?: string;
  description?: null | string;
  name?: string;
};

export type AppUpdateStoreLinkFormItem = {
  channelCode?: string;
  channelName?: string;
  storeUrl?: string;
};

const ANDROID_KEYWORDS = ['android', '安卓'];
const IOS_KEYWORDS = [
  'app store',
  'apple',
  'appstore',
  'ios',
  'ipad',
  'iphone',
  '苹果',
];

export function normalizeOptionalString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed || undefined;
}

function normalizeDictionaryItem(
  item: unknown,
): AppUpdateChannelDictionaryItem | undefined {
  if (!item || typeof item !== 'object') {
    return undefined;
  }

  const record = item as Record<string, unknown>;
  const code = normalizeOptionalString(record.code);
  const name = normalizeOptionalString(record.name);
  const description = normalizeOptionalString(record.description);

  if (!code && !name) {
    return undefined;
  }

  return {
    code,
    description,
    name,
  };
}

function parsePlatformFromDescription(
  description?: string,
): 'android' | 'ios' | undefined {
  if (!description) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(description) as Record<string, unknown>;
    const platform = normalizeOptionalString(
      parsed.platform ??
        parsed.platformType ??
        parsed.clientPlatform ??
        parsed.os ??
        parsed.terminal,
    )?.toLowerCase();

    if (platform === 'android') {
      return 'android';
    }

    if (platform === 'ios') {
      return 'ios';
    }
  } catch {}

  return undefined;
}

function containsKeywords(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

export function resolveChannelPlatform(
  item: AppUpdateChannelDictionaryItem,
): 'android' | 'ios' | undefined {
  const description = normalizeOptionalString(item.description);
  const parsedPlatform = parsePlatformFromDescription(description);

  if (parsedPlatform) {
    return parsedPlatform;
  }

  const content = [
    normalizeOptionalString(item.code),
    normalizeOptionalString(item.name),
    description,
  ]
    .filter((value): value is string => !!value)
    .join(' ')
    .toLowerCase();

  if (!content) {
    return undefined;
  }

  if (containsKeywords(content, ANDROID_KEYWORDS)) {
    return 'android';
  }

  if (containsKeywords(content, IOS_KEYWORDS)) {
    return 'ios';
  }

  return undefined;
}

export function normalizeDictionaryItemList(
  response: unknown,
): AppUpdateChannelDictionaryItem[] {
  let source: unknown[] = [];

  if (Array.isArray(response)) {
    source = response;
  } else {
    const responseRecord = response as undefined | { list?: unknown[] };
    if (Array.isArray(responseRecord?.list)) {
      source = responseRecord.list;
    }
  }

  const items: AppUpdateChannelDictionaryItem[] = [];
  for (const item of source) {
    const normalizedItem = normalizeDictionaryItem(item);
    if (normalizedItem) {
      items.push(normalizedItem);
    }
  }

  return items;
}

function toChannelOption(
  item: AppUpdateChannelDictionaryItem,
): AppUpdateChannelOption | undefined {
  const value = normalizeOptionalString(item.code);
  if (!value) {
    return undefined;
  }

  return {
    label: normalizeOptionalString(item.name) || value,
    value,
  };
}

export function filterChannelOptionsByPlatform(
  items: AppUpdateChannelDictionaryItem[],
  platform?: null | string,
): AppUpdateChannelOption[] {
  if (!platform) {
    return [];
  }

  const normalizedItems = items
    .map((item) => normalizeDictionaryItem(item))
    .filter((item): item is AppUpdateChannelDictionaryItem => !!item);

  const matchedItems = normalizedItems.filter(
    (item) => resolveChannelPlatform(item) === platform,
  );

  const targetItems =
    matchedItems.length > 0 ? matchedItems : normalizedItems;

  return targetItems
    .map((item) => toChannelOption(item))
    .filter((item): item is AppUpdateChannelOption => !!item);
}

export function mapStoreLinksToFormValues(
  value: unknown,
): AppUpdateStoreLinkFormItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const storeLinks: AppUpdateStoreLinkFormItem[] = [];

  for (const item of value) {
    const channelCode = normalizeOptionalString(item?.channelCode);
    const channelName = normalizeOptionalString(item?.channelName);
    const storeUrl = normalizeOptionalString(item?.storeUrl);

    if (!channelCode && !channelName && !storeUrl) {
      continue;
    }

    storeLinks.push({
      channelCode,
      channelName,
      storeUrl,
    });
  }

  return storeLinks;
}

export function hasIncompleteStoreLinks(value: unknown): boolean {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.some((item) => {
    const channelCode = normalizeOptionalString(item?.channelCode);
    const channelName = normalizeOptionalString(item?.channelName);
    const storeUrl = normalizeOptionalString(item?.storeUrl);
    const hasAnyValue = !!(channelCode || channelName || storeUrl);

    return hasAnyValue && !(channelCode && storeUrl);
  });
}

export function sanitizeStoreLinks(
  value: unknown,
): AppUpdateStoreLinkInputDto[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const storeLinks: AppUpdateStoreLinkInputDto[] = [];

  for (const item of value) {
    const channelCode = normalizeOptionalString(item?.channelCode);
    const storeUrl = normalizeOptionalString(item?.storeUrl);

    if (!(channelCode && storeUrl)) {
      continue;
    }

    storeLinks.push({
      channelCode,
      storeUrl,
    } satisfies AppUpdateStoreLinkInputDto);
  }

  return storeLinks.length > 0 ? storeLinks : undefined;
}
