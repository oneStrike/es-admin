import type { BasicOption } from '@vben/types';

import type { BaseEmojiPackDto } from '#/api/types';

export type EmojiAssetKind = 1 | 2;
export type EmojiSceneType = 1 | 2 | 3;

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
