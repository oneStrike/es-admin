import type { BasicOption } from '@vben/types';

import type { BaseEmojiPackDto } from '#/api/types';

export type EmojiAssetKind = 1 | 2;
export type EmojiSceneType = 1 | 2 | 3;
export type EmojiKeywordRows = Array<{
  keywords?: unknown;
  locale?: unknown;
}>;
export type EmojiKeywords = Record<string, string[]>;

const RGI_EMOJI_REGEX = /\p{RGI_Emoji}/gv;

export const emojiEnableOptions = [
  { label: '启用', value: true },
  { label: '禁用', value: false },
];

export const emojiVisibilityOptions = [
  { label: '可见', value: true },
  { label: '隐藏', value: false },
];

export const emojiSceneTypeOptions = [
  { label: '聊天', value: 1 },
  { label: '评论', value: 2 },
  { label: '论坛主题', value: 3 },
];

export const emojiKindOptions = [
  { label: 'Unicode', value: 1 },
  { label: '自定义', value: 2 },
];

export const emojiAnimatedOptions = [
  { label: '是', value: true },
  { label: '否', value: false },
];

export function normalizeSceneTypeValue(value: unknown): EmojiSceneType[] {
  if (Array.isArray(value)) {
    return value
      .map(Number)
      .filter((item): item is EmojiSceneType => [1, 2, 3].includes(item));
  }

  if (typeof value === 'number') {
    return [value].filter((item): item is EmojiSceneType =>
      [1, 2, 3].includes(item),
    );
  }

  if (typeof value === 'string') {
    const text = value.trim();
    if (!text) return [];

    try {
      const parsed = JSON.parse(text);
      return normalizeSceneTypeValue(parsed);
    } catch {}

    return text
      .split(/[,\s|/]+/)
      .map(Number)
      .filter((item): item is EmojiSceneType => [1, 2, 3].includes(item));
  }

  return [];
}

export function buildEmojiPackOptions(
  packs: BaseEmojiPackDto[] = [],
): BasicOption[] {
  return sortEmojiPacks(packs).map((item) => ({
    label: `${item.name}（${item.code}）${item.isEnabled ? '' : '（已禁用）'}`,
    value: item.id,
  }));
}

export function sortEmojiPacks(
  packs: BaseEmojiPackDto[] = [],
): BaseEmojiPackDto[] {
  return packs.toSorted((left, right) => {
    if (left.sortOrder !== right.sortOrder) {
      return left.sortOrder - right.sortOrder;
    }
    return left.id - right.id;
  });
}

export function getEmojiPackLabel(
  options: BasicOption[] = [],
  packId?: null | number,
): string {
  const match = options.find(
    (item) => String(item.value) === String(packId ?? ''),
  );
  return String(match?.label ?? packId ?? '-');
}

function parseUnicodeToken(token: string): null | number {
  const normalizedToken = token
    .trim()
    .replaceAll(/U\+/gi, '')
    .replaceAll(/0X/gi, '')
    .replaceAll('\\', '')
    .replaceAll(/[{}]/g, '');

  if (!normalizedToken) return null;

  const codePoint = Number.parseInt(normalizedToken, 16);
  return Number.isFinite(codePoint) ? codePoint : null;
}

export function unicodeSequenceToEmoji(
  unicodeSequence?: null | string,
): string {
  const raw = unicodeSequence?.trim();
  if (!raw) return '';
  if (isRenderedEmojiSequence(raw)) return raw;

  let codePoints: number[] = [];

  if (raw.startsWith('[') && raw.endsWith(']')) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        codePoints = parsed
          .map((item) => parseUnicodeToken(String(item)))
          .filter((item): item is number => item !== null);
      }
    } catch {}
  }

  if (codePoints.length === 0) {
    codePoints = raw
      .split(/[\s,;|/_-]+/)
      .map((item) => parseUnicodeToken(item))
      .filter((item): item is number => item !== null);
  }

  if (codePoints.length === 0) return '';

  try {
    return String.fromCodePoint(...codePoints);
  } catch {
    return '';
  }
}

export function normalizeUnicodeSequenceInput(value?: null | string): string {
  const raw = value?.trim();
  if (!raw) return '';
  return unicodeSequenceToEmoji(raw) || raw;
}

export function formatEmojiKeywordsRows(value: unknown): EmojiKeywordRows {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return [];
  }

  return Object.entries(value as EmojiKeywords).flatMap(
    ([locale, keywords]) => {
      if (!Array.isArray(keywords)) return [];
      const keywordText = keywords
        .map((item) => String(item).trim())
        .filter(Boolean)
        .join('，');

      return keywordText ? [{ keywords: keywordText, locale }] : [];
    },
  );
}

export function buildEmojiKeywords(value: unknown): null | EmojiKeywords {
  if (!Array.isArray(value)) {
    return null;
  }

  const keywords: EmojiKeywords = {};
  for (const item of value) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      continue;
    }

    const row = item as { keywords?: unknown; locale?: unknown };
    const locale = String(row.locale ?? '').trim();
    if (!locale) {
      continue;
    }

    const values = String(row.keywords ?? '')
      .split(/[，,\n]/)
      .map((keyword) => keyword.trim())
      .filter(Boolean);
    const uniqueValues = [...new Set(values)];
    if (uniqueValues.length > 0) {
      keywords[locale] = uniqueValues;
    }
  }

  return Object.keys(keywords).length > 0 ? keywords : null;
}

export function formatEmojiKeywords(value: unknown): string {
  const rows = formatEmojiKeywordsRows(value);
  if (rows.length === 0) return '-';

  return rows.map((row) => `${row.locale}: ${row.keywords}`).join('\n');
}

function isRenderedEmojiSequence(value: string) {
  const matches = Array.from(
    value.matchAll(new RegExp(RGI_EMOJI_REGEX.source, RGI_EMOJI_REGEX.flags)),
    (match) => match[0],
  );
  return matches.length > 0 && matches.join('') === value;
}
