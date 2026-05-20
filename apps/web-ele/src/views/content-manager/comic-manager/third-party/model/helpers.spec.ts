import type { ContentComicThirdPartyImportConfirmRequest } from '#/api/types/content';
import type { WorkflowJobDto } from '#/api/types/workflow';

import { describe, expect, it } from 'vitest';

import {
  canSubmitImportAgain,
  hasProviderGroupPathWord,
  resolveExactRelationMatches,
  toChapterImportItem,
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
        toChapterImportItem({
          action: 'create',
          canComment: true,
          canDownload: true,
          coverMode: 'skip',
          chapterApiVersion: 2,
          datetimeCreated: '2026-05-11T00:00:00.000Z',
          group: 'default',
          imageCount: 53,
          importImages: true,
          isPreview: false,
          overwriteContent: false,
          price: 0,
          providerChapterId: 'chapter-001',
          sortOrder: 1,
          subtitle: '序章',
          title: '第1话',
          viewRule: -1,
        }),
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

  function createWorkflowJob(status: WorkflowJobDto['status']): WorkflowJobDto {
    return {
      createdAt: '2026-05-11T00:00:00.000Z',
      displayName: '三方导入',
      failedItemCount: 0,
      finishedAt: null,
      id: status,
      jobId: `job-${status}`,
      operatorType: 1,
      operatorUserId: 1,
      progressPercent: 0,
      selectedItemCount: 1,
      skippedItemCount: 0,
      status,
      successItemCount: 0,
      updatedAt: '2026-05-11T00:00:00.000Z',
      workflowType: 'content-import.third-party-import',
    };
  }

  it('ignores only source snapshot fetchedAt', () => {
    const request = createRequest();
    const [firstChapter] = request.chapters;

    if (!firstChapter) {
      throw new Error('Expected request fixture to include a chapter');
    }

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
            ...firstChapter,
            price: 1,
          },
        ],
      }),
    ).not.toBe(fingerprint);
    expect(
      wizardSubmissionFingerprint({
        ...request,
        chapters: [
          toChapterImportItem({
            ...firstChapter,
            imageCount: 52,
          }),
        ],
      }),
    ).toBe(fingerprint);
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
    const activeTask = createWorkflowJob(1);
    const successTask = createWorkflowJob(4);
    const failedTask = createWorkflowJob(5);
    const cancelledTask = createWorkflowJob(6);
    const fingerprint = wizardSubmissionFingerprint(createRequest());

    expect(canSubmitImportAgain(activeTask, fingerprint, fingerprint)).toBe(
      false,
    );
    expect(canSubmitImportAgain(successTask, fingerprint, fingerprint)).toBe(
      false,
    );
    expect(canSubmitImportAgain(failedTask, fingerprint, fingerprint)).toBe(
      false,
    );
    expect(canSubmitImportAgain(cancelledTask, fingerprint, fingerprint)).toBe(
      false,
    );
    expect(
      canSubmitImportAgain(activeTask, fingerprint, `${fingerprint}:dirty`),
    ).toBe(true);
    expect(canSubmitImportAgain(null, fingerprint, fingerprint)).toBe(true);
  });
});

describe('third-party import request builder', () => {
  it('builds confirm chapter payload without imageCount', () => {
    const chapter = toChapterImportItem({
      action: 'create',
      canComment: true,
      canDownload: true,
      coverMode: 'local',
      chapterApiVersion: 2,
      datetimeCreated: '2026-05-11T00:00:00.000Z',
      group: 'default',
      imageCount: 53,
      importImages: true,
      isPreview: false,
      localCoverPath: '/uploads/chapter-cover.jpg',
      overwriteContent: false,
      price: 0,
      providerChapterId: 'chapter-001',
      sortOrder: 1,
      subtitle: '序章',
      targetChapterId: undefined,
      title: '第1话',
      viewRule: -1,
    });

    expect(chapter).toEqual(
      expect.objectContaining({
        importImages: true,
        providerChapterId: 'chapter-001',
        title: '第1话',
        cover: {
          localPath: '/uploads/chapter-cover.jpg',
          mode: 'local',
        },
      }),
    );
    expect(chapter).not.toHaveProperty('imageCount');
  });
});
