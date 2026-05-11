import type {
  ThirdPartyComicCoverOptionsDto,
  ThirdPartyComicGroupDto,
} from '#/api/types/content';

export type WorkCoverMode = 'local' | 'provider';

export function canUseProviderWorkCover(
  coverOptions: ThirdPartyComicCoverOptionsDto,
) {
  return Boolean(coverOptions.provider) && !coverOptions.localRequired;
}

export function resolveInitialWorkCoverMode(
  coverOptions: ThirdPartyComicCoverOptionsDto,
): WorkCoverMode {
  return canUseProviderWorkCover(coverOptions) ? 'provider' : 'local';
}

export function resolveInitialGroup(groups: ThirdPartyComicGroupDto[]) {
  return groups[0]?.pathWord || '';
}

export function toApiGroup(group: string) {
  return group.trim() || undefined;
}
