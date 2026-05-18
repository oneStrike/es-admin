import { describe, expect, it } from 'vitest';

import {
  ARCHIVE_RESULT_STATUS,
  ARCHIVE_STATUS,
  formatArchiveResultImageProgress,
  isArchiveWorkflowRunning,
  shouldShowArchiveTaskSummary,
} from './archive-import-state';

describe('archive import state gates', () => {
  it('does not expose pre-confirm draft state outside the modal', () => {
    expect(
      shouldShowArchiveTaskSummary({
        status: ARCHIVE_STATUS.DRAFT,
      }),
    ).toBe(false);
  });

  it('shows summary after the workflow leaves draft state', () => {
    expect(
      shouldShowArchiveTaskSummary({
        status: ARCHIVE_STATUS.EXPIRED,
      }),
    ).toBe(true);
    expect(
      shouldShowArchiveTaskSummary({
        status: ARCHIVE_STATUS.CANCELLED,
      }),
    ).toBe(true);
  });

  it('treats only workflow processing states as active tasks', () => {
    expect(isArchiveWorkflowRunning({ status: ARCHIVE_STATUS.DRAFT })).toBe(
      false,
    );
    expect(
      isArchiveWorkflowRunning({
        status: ARCHIVE_STATUS.PROCESSING,
      }),
    ).toBe(true);
  });

  it('overlays archive image progress by local chapter while processing', () => {
    expect(
      formatArchiveResultImageProgress(
        {
          chapterId: 101,
          importedImageCount: 0,
          status: ARCHIVE_RESULT_STATUS.PENDING,
        },
        {
          isActive: true,
          progressDetail: {
            kind: 'content-import.image',
            workflowType: 'content-import.archive-import',
            localChapterId: 101,
            imageIndex: 4,
            imageTotal: 9,
          },
        },
      ),
    ).toBe('4/9');
  });

  it('keeps archive final image count when progress is inactive or not matching', () => {
    const item = {
      chapterId: 101,
      importedImageCount: 2,
      status: ARCHIVE_RESULT_STATUS.SUCCESS,
    };

    expect(
      formatArchiveResultImageProgress(item, {
        isActive: true,
        progressDetail: {
          kind: 'content-import.image',
          workflowType: 'content-import.archive-import',
          localChapterId: 102,
          imageIndex: 4,
          imageTotal: 9,
        },
      }),
    ).toBe('2');
    expect(
      formatArchiveResultImageProgress(item, {
        isActive: false,
        progressDetail: {
          kind: 'content-import.image',
          workflowType: 'content-import.archive-import',
          localChapterId: 101,
          imageIndex: 4,
          imageTotal: 9,
        },
      }),
    ).toBe('2');
  });
});
