import { describe, expect, it } from 'vitest';

import { formatBackgroundTaskType } from './task-type';

describe('background task type model', () => {
  it('maps known task types to operator-friendly labels', () => {
    expect(formatBackgroundTaskType('content.third-party-comic-import')).toBe(
      '第三方漫画导入',
    );
  });

  it('keeps unknown task types visible', () => {
    expect(formatBackgroundTaskType('custom.future-task')).toBe(
      'custom.future-task',
    );
    expect(formatBackgroundTaskType(null)).toBe('-');
  });
});
