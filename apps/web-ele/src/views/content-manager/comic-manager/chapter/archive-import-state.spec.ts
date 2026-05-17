import { describe, expect, it } from 'vitest';

import {
  ARCHIVE_STATUS,
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
});
