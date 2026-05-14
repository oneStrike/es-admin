import { describe, expect, it } from 'vitest';

import {
  ARCHIVE_STATUS,
  isArchiveBackgroundTask,
  shouldShowArchiveTaskSummary,
} from './archive-import-state';

describe('archive import state gates', () => {
  it('does not expose pre-confirm draft state outside the modal', () => {
    expect(
      shouldShowArchiveTaskSummary({
        backgroundOwned: false,
        status: ARCHIVE_STATUS.DRAFT,
      }),
    ).toBe(false);
  });

  it('does not use raw terminal status as the outside-summary gate', () => {
    expect(
      shouldShowArchiveTaskSummary({
        backgroundOwned: false,
        status: ARCHIVE_STATUS.EXPIRED,
      }),
    ).toBe(false);
    expect(
      shouldShowArchiveTaskSummary({
        backgroundOwned: false,
        status: ARCHIVE_STATUS.CANCELLED,
      }),
    ).toBe(false);
  });

  it('allows confirmed background-owned tasks even when terminal', () => {
    expect(
      shouldShowArchiveTaskSummary({
        backgroundOwned: true,
        status: ARCHIVE_STATUS.EXPIRED,
      }),
    ).toBe(true);
  });

  it('treats only background-owned processing states as active outside tasks', () => {
    expect(
      isArchiveBackgroundTask({
        backgroundOwned: false,
        status: ARCHIVE_STATUS.PROCESSING,
      }),
    ).toBe(false);
    expect(
      isArchiveBackgroundTask({
        backgroundOwned: true,
        status: ARCHIVE_STATUS.PROCESSING,
      }),
    ).toBe(true);
  });
});
