import { describe, expect, it, vi } from 'vitest';

import { createWorkflowDetailPolling } from './detail-polling';

type PollingJob = {
  status: number;
};

describe('workflow detail polling', () => {
  it('schedules the next poll only after the active load resolves', async () => {
    vi.useFakeTimers();
    const load = vi.fn(async (): Promise<PollingJob> => ({ status: 3 }));
    const polling = createWorkflowDetailPolling({
      intervalMs: 3000,
      isActive: (job) => job.status === 3,
      load,
    });

    await polling.start('job-1');

    expect(load).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(1);

    await vi.advanceTimersByTimeAsync(3000);

    expect(load).toHaveBeenCalledTimes(2);
    polling.stop();
    vi.useRealTimers();
  });

  it('stops scheduling after the refreshed job becomes terminal', async () => {
    vi.useFakeTimers();
    const load = vi
      .fn<() => Promise<PollingJob>>()
      .mockResolvedValueOnce({ status: 3 })
      .mockResolvedValueOnce({ status: 4 });
    const polling = createWorkflowDetailPolling({
      intervalMs: 3000,
      isActive: (job) => job.status === 3,
      load,
    });

    await polling.start('job-1');
    await vi.advanceTimersByTimeAsync(3000);

    expect(load).toHaveBeenCalledTimes(2);
    expect(vi.getTimerCount()).toBe(0);
    vi.useRealTimers();
  });

  it('ignores stale in-flight loads after close or job switch', async () => {
    vi.useFakeTimers();
    let resolveFirst!: (value: PollingJob) => void;
    const firstLoad = new Promise<PollingJob>((resolve) => {
      resolveFirst = resolve;
    });
    const load = vi
      .fn<() => Promise<PollingJob>>()
      .mockReturnValueOnce(firstLoad)
      .mockResolvedValueOnce({ status: 3 });
    const polling = createWorkflowDetailPolling({
      intervalMs: 3000,
      isActive: (job) => job.status === 3,
      load,
    });

    const startPromise = polling.start('job-1');
    polling.stop();
    resolveFirst({ status: 3 });
    await startPromise;

    expect(vi.getTimerCount()).toBe(0);

    await polling.start('job-2');

    expect(load).toHaveBeenNthCalledWith(2, 'job-2');
    expect(vi.getTimerCount()).toBe(1);
    polling.stop();
    vi.useRealTimers();
  });
});
