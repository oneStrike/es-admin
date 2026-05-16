import { describe, expect, it } from 'vitest';

import type { ContentComicThirdPartyImportConfirmRequest } from '#/api/types/content';

import {
  canSubmitImportAgain,
  hasProviderGroupPathWord,
  resolveExactRelationMatches,
  wizardSubmissionFingerprint,
} from './helpers';

describe('third-party relation auto matching', () => {
  it('selects every exact full-name match from searched options', () => {
    expect(
      resolveExactRelationMatches([
        {
          options: [
            { label: '夏达', value: 1 },
            { label: '夏达', value: 2 },
            { label: '夏达作品', value: 3 },
          ],
          providerName: ' 夏达 ',
        },
        {
          options: [{ label: '冒险', value: 4 }],
          providerName: '冒险',
        },
      ]),
    ).toEqual([
      { label: '夏达', value: 1 },
      { label: '夏达', value: 2 },
      { label: '冒险', value: 4 },
    ]);
  });

  it('does not select partial matches', () => {
    expect(
      resolveExactRelationMatches([
        {
          options: [
            { label: '热血冒险', value: 1 },
            { label: '冒险', value: 2 },
            { label: '冒险中', value: 3 },
          ],
          providerName: '冒险',
        },
      ]),
    ).toEqual([{ label: '冒险', value: 2 }]);
  });

  it('deduplicates repeated exact matches by option value', () => {
    expect(
      resolveExactRelationMatches([
        {
          options: [
            { label: '奇幻', value: 1 },
            { label: '奇幻', value: 2 },
          ],
          providerName: '奇幻',
        },
        {
          options: [
            { label: '奇幻', value: 1 },
            { label: '奇幻', value: 3 },
          ],
          providerName: '奇幻',
        },
      ]),
    ).toEqual([
      { label: '奇幻', value: 1 },
      { label: '奇幻', value: 2 },
      { label: '奇幻', value: 3 },
    ]);
  });
});

describe('third-party import submission fingerprint', () => {
  function createRequest(): ContentComicThirdPartyImportConfirmRequest {
    return {
      chapters: [
        {
          action: 'create',
          canComment: true,
          canDownload: true,
          chapterApiVersion: 2,
          datetimeCreated: '2026-05-11T00:00:00.000Z',
          group: 'default',
          importImages: true,
          isPreview: false,
          isPublished: true,
          overwriteContent: false,
          price: 0,
          providerChapterId: 'chapter-001',
          sortOrder: 1,
          subtitle: '序章',
          title: '第1话',
          viewRule: -1,
        },
      ],
      comicId: 'woduzishenji',
      cover: {
        mode: 'provider',
        providerImageId: 'cover:woduzishenji',
      },
      mode: 'createNew',
      platform: 'copy',
      sourceSnapshot: {
        fetchedAt: '2026-05-11T00:00:00.000Z',
        providerComicId: 'woduzishenji',
        providerGroupPathWord: 'default',
        providerPathWord: 'woduzishenji',
      },
      workDraft: {
        authorIds: [1],
        canComment: true,
        categoryIds: [1],
        chapterPrice: 0,
        description: '作品简介',
        isHot: false,
        isNew: false,
        isPublished: true,
        isRecommended: false,
        language: 'zh-CN',
        name: '我独自升级',
        recommendWeight: 0,
        region: 'CN',
        serialStatus: 1,
        tagIds: [1],
        viewRule: 0,
      },
    };
  }

  it('ignores only source snapshot fetchedAt', () => {
    const request = createRequest();
    const fingerprint = wizardSubmissionFingerprint(request);

    expect(
      wizardSubmissionFingerprint({
        ...request,
        sourceSnapshot: {
          ...request.sourceSnapshot,
          fetchedAt: '2026-05-12T00:00:00.000Z',
        },
      }),
    ).toBe(fingerprint);
    expect(
      wizardSubmissionFingerprint({
        ...request,
        chapters: [
          {
            ...request.chapters[0]!,
            price: 1,
          },
        ],
      }),
    ).not.toBe(fingerprint);
  });

  it('detects whether provider group path word is present', () => {
    expect(hasProviderGroupPathWord(createRequest())).toBe(true);
    expect(
      hasProviderGroupPathWord({
        ...createRequest(),
        sourceSnapshot: {
          ...createRequest().sourceSnapshot,
          providerGroupPathWord: ' ',
        },
      }),
    ).toBe(false);
  });

  it('blocks only unchanged duplicate submissions', () => {
    const activeTask = { status: 1, taskId: 'task-001' };
    const successTask = { status: 4, taskId: 'task-001' };
    const failedTask = { status: 5, taskId: 'task-001' };
    const cancelledTask = { status: 6, taskId: 'task-001' };
    const fingerprint = wizardSubmissionFingerprint(createRequest());

    expect(
      canSubmitImportAgain(activeTask as never, fingerprint, fingerprint),
    ).toBe(false);
    expect(
      canSubmitImportAgain(successTask as never, fingerprint, fingerprint),
    ).toBe(false);
    expect(
      canSubmitImportAgain(failedTask as never, fingerprint, fingerprint),
    ).toBe(true);
    expect(
      canSubmitImportAgain(cancelledTask as never, fingerprint, fingerprint),
    ).toBe(true);
    expect(
      canSubmitImportAgain(
        activeTask as never,
        fingerprint,
        `${fingerprint}:dirty`,
      ),
    ).toBe(true);
    expect(canSubmitImportAgain(null, fingerprint, fingerprint)).toBe(true);
  });
});
