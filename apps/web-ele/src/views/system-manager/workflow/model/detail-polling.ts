export interface WorkflowDetailPollingOptions<TJob> {
  intervalMs?: number;
  isActive: (job: TJob) => boolean;
  load: (jobId: string) => Promise<TJob>;
}

export function createWorkflowDetailPolling<TJob>({
  intervalMs = 3000,
  isActive,
  load,
}: WorkflowDetailPollingOptions<TJob>) {
  let activeRunId = 0;
  let currentJobId = '';
  let timer: null | ReturnType<typeof setTimeout> = null;

  function clearTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  async function run(jobId: string, runId: number) {
    const job = await load(jobId);
    if (runId !== activeRunId || jobId !== currentJobId) {
      return job;
    }
    if (isActive(job)) {
      timer = setTimeout(() => {
        void run(jobId, runId);
      }, intervalMs);
    }
    return job;
  }

  return {
    start(jobId: string) {
      activeRunId += 1;
      currentJobId = jobId;
      clearTimer();
      return run(jobId, activeRunId);
    },
    stop() {
      activeRunId += 1;
      currentJobId = '';
      clearTimer();
    },
    runOnce(jobId: string) {
      activeRunId += 1;
      currentJobId = jobId;
      clearTimer();
      return run(jobId, activeRunId);
    },
  };
}
