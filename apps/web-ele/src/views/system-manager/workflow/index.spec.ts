import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const workflowVueSource = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), 'index.vue'),
  'utf8',
);

describe('workflow manager detail modal source wiring', () => {
  it('removes the previous detail auto polling helper', () => {
    expect(workflowVueSource).not.toContain('createWorkflowDetailPolling');
    expect(workflowVueSource).not.toContain('./model/detail-polling');
    expect(workflowVueSource).not.toContain('detailPolling.start');
  });

  it('exposes a manual detail refresh that preserves the current item grid state', () => {
    expect(workflowVueSource).toContain('function refreshCurrentDetail');
    expect(workflowVueSource).toContain('loadDetail(jobId, { reset: false })');
    expect(workflowVueSource).toContain('@click="refreshCurrentDetail"');
    expect(workflowVueSource).toContain('刷新详情');
  });
});
