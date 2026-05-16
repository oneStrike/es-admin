import type { SelectOption } from './types';

import type {
  ContentComicThirdPartyImportConfirmRequest,
  ThirdPartyComicCoverOptionsDto,
  ThirdPartyComicGroupDto,
} from '#/api/types/content';
import type { BackgroundTaskDto } from '#/api/types/backgroundTask';

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

export function hasProviderGroupPathWord(
  request: ContentComicThirdPartyImportConfirmRequest,
) {
  return Boolean(request.sourceSnapshot.providerGroupPathWord?.trim());
}

export function wizardSubmissionFingerprint(
  request: ContentComicThirdPartyImportConfirmRequest,
) {
  const { sourceSnapshot, ...restRequest } = request;
  const { fetchedAt: _fetchedAt, ...stableSourceSnapshot } = sourceSnapshot;
  return stableStringify({
    ...restRequest,
    sourceSnapshot: stableSourceSnapshot,
  });
}

export function canSubmitImportAgain(
  submittedTask: BackgroundTaskDto | null,
  submittedTaskFingerprint: string,
  currentFingerprint: string,
) {
  if (
    !submittedTask ||
    !submittedTaskFingerprint ||
    submittedTaskFingerprint !== currentFingerprint
  ) {
    return true;
  }
  return isBackgroundTaskRetryableCleanStatus(submittedTask.status);
}

function isBackgroundTaskRetryableCleanStatus(
  status: BackgroundTaskDto['status'],
) {
  return status === 5 || status === 6;
}

function normalizeOptionLabel(value: string) {
  return value.trim();
}

export type ExactRelationMatchSource<T extends SelectOption> = {
  options: T[];
  providerName?: null | string;
};

export function findCreatedOptionByName<T extends SelectOption>(
  options: T[],
  name: string,
) {
  const normalizedName = normalizeOptionLabel(name);
  return options.find(
    (option) => normalizeOptionLabel(option.label) === normalizedName,
  );
}

export function resolveExactRelationMatches<T extends SelectOption>(
  sources: Array<ExactRelationMatchSource<T>>,
) {
  const matchedOptions: T[] = [];
  const selectedValues = new Set<T['value']>();

  for (const source of sources) {
    const providerName = normalizeOptionLabel(source.providerName || '');
    if (!providerName) {
      continue;
    }

    const exactMatches = source.options.filter(
      (option) => normalizeOptionLabel(option.label) === providerName,
    );
    for (const option of exactMatches) {
      if (selectedValues.has(option.value)) {
        continue;
      }
      selectedValues.add(option.value);
      matchedOptions.push(option);
    }
  }

  return matchedOptions;
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

function stableStringify(value: unknown): string {
  return JSON.stringify(toStableJsonValue(value));
}

function toStableJsonValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => toStableJsonValue(item));
  }
  if (!isPlainObject(value)) {
    return value;
  }

  const stableObject: Record<string, unknown> = {};
  for (const key of Object.keys(value).sort()) {
    const item = value[key];
    if (item === undefined) {
      continue;
    }
    stableObject[key] = toStableJsonValue(item);
  }
  return stableObject;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}
