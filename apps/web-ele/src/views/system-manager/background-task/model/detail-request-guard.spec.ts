import { describe, expect, it } from 'vitest';

import { createBackgroundTaskDetailRequestGuard } from './detail-request-guard';

describe('background task detail request guard', () => {
  it('allows only the latest matching detail response to update state', () => {
    const guard = createBackgroundTaskDetailRequestGuard();
    const firstToken = guard.createToken();
    const secondToken = guard.createToken();

    expect(guard.canApply(firstToken, 'task-1', 'task-1')).toBe(false);
    expect(guard.canApply(secondToken, 'task-1', 'task-2')).toBe(false);
    expect(guard.canApply(secondToken, 'task-1', 'task-1')).toBe(true);
  });

  it('invalidates in-flight detail responses around mutations', () => {
    const guard = createBackgroundTaskDetailRequestGuard();
    const pollingToken = guard.createToken();

    guard.invalidate();

    expect(guard.canApply(pollingToken, 'task-1', 'task-1')).toBe(false);

    const postMutationToken = guard.createToken();

    expect(guard.canApply(postMutationToken, 'task-1', 'task-1')).toBe(true);
  });
});
