import type {
  ThirdPartyComicCoverOptionsDto,
  ThirdPartyComicGroupDto,
} from '#/api/types/content';

import { describe, expect, it } from 'vitest';

import {
  canUseProviderWorkCover,
  resolveInitialGroup,
  resolveInitialWorkCoverMode,
  toApiGroup,
} from './import';

function coverOptions(
  options: Partial<ThirdPartyComicCoverOptionsDto>,
): ThirdPartyComicCoverOptionsDto {
  return {
    localRequired: false,
    ...options,
  };
}

function groups(...pathWords: string[]): ThirdPartyComicGroupDto[] {
  return pathWords.map((pathWord, index) => ({
    count: index + 1,
    name: `分组 ${index + 1}`,
    pathWord,
  }));
}

describe('third-party comic import helpers', () => {
  it('requires local work cover when the preview marks local upload as required', () => {
    const options = coverOptions({
      localRequired: true,
      provider: {
        providerImageId: 'provider-cover',
        url: 'https://example.test/cover.jpg',
      },
    });

    expect(resolveInitialWorkCoverMode(options)).toBe('local');
    expect(canUseProviderWorkCover(options)).toBe(false);
  });

  it('uses provider work cover only when it is available and not blocked', () => {
    expect(
      resolveInitialWorkCoverMode(
        coverOptions({
          provider: {
            providerImageId: 'provider-cover',
            url: 'https://example.test/cover.jpg',
          },
        }),
      ),
    ).toBe('provider');
    expect(resolveInitialWorkCoverMode(coverOptions({}))).toBe('local');
  });

  it('does not serialize a synthetic default group for ungrouped previews', () => {
    expect(resolveInitialGroup(groups('main', 'extra'))).toBe('main');
    expect(resolveInitialGroup([])).toBe('');
    expect(toApiGroup('')).toBeUndefined();
    expect(toApiGroup('  ')).toBeUndefined();
    expect(toApiGroup('main')).toBe('main');
  });
});
