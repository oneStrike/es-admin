import type {
  ThirdPartyComicCoverOptionsDto,
  ThirdPartyComicGroupDto,
} from '#/api/types/content';

export interface SelectOption {
  label: string;
  value: number | string;
}

export const SERVER_MANGA_AUTHOR_TYPE = 1;
export const SERVER_COMIC_CATEGORY_TYPE = 1;

export function canUseProviderWorkCover(
  coverOptions: ThirdPartyComicCoverOptionsDto,
) {
  return Boolean(coverOptions.provider) && !coverOptions.localRequired;
}

export function resolveInitialWorkCoverMode(
  coverOptions: ThirdPartyComicCoverOptionsDto,
) {
  return canUseProviderWorkCover(coverOptions) ? 'provider' : 'local';
}

export function resolveInitialGroup(groups: ThirdPartyComicGroupDto[]) {
  return groups[0]?.pathWord || '';
}

export function toApiGroup(group: string) {
  return group.trim() || undefined;
}

function normalizeOptionLabel(value: string) {
  return value.trim();
}

export function findCreatedOptionByName<T extends SelectOption>(
  options: T[],
  name: string,
) {
  const normalizedName = normalizeOptionLabel(name);
  return options.find(
    (option) => normalizeOptionLabel(option.label) === normalizedName,
  );
}

export function resolveSelectDefault(
  options: Array<{ value: string }>,
  preferred?: null | string,
  fallback = '',
) {
  const values = new Set(options.map((item) => item.value));
  if (preferred && values.has(preferred)) {
    return preferred;
  }
  if (fallback && values.has(fallback)) {
    return fallback;
  }
  return '';
}
