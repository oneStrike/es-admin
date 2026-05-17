import { describe, expect, it } from 'vitest';

import { formatBackgroundTaskDisplayName } from './task-display';

describe('background task display name', () => {
  it('formats the explicit display name for task surfaces', () => {
    expect(
      formatBackgroundTaskDisplayName({ displayName: '  我独自升级  ' }),
    ).toBe('我独自升级');
  });

  it('does not derive display names from payload content', () => {
    expect(
      formatBackgroundTaskDisplayName({
        displayName: null,
        payload: { workDraft: { name: '旧负载作品名' } },
      }),
    ).toBe('');
  });
});
