import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const basicVueSource = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), 'basic.vue'),
  'utf8',
);

describe('basic layout imports', () => {
  it('imports the notification widget when rendering the notification slot', () => {
    expect(basicVueSource).toMatch(/<Notification[\s>]/);
    expect(basicVueSource).toMatch(
      /import\s*\{[^}]*\bNotification\b[^}]*\}\s*from\s*'@vben\/layouts'/s,
    );
  });

  it('wires workflow notification state and header actions', () => {
    expect(basicVueSource).toContain('useWorkflowGlobalNotifications');
    expect(basicVueSource).toContain('@read="markWorkflowNotificationRead"');
    expect(basicVueSource).toContain('@remove="removeWorkflowNotification"');
    expect(basicVueSource).toContain('@clear="clearWorkflowNotifications"');
    expect(basicVueSource).toContain(
      '@make-all="makeAllWorkflowNotifications"',
    );
    expect(basicVueSource).toContain('@on-click="openWorkflowNotification"');
    expect(basicVueSource).toContain(
      '@view-all="viewAllWorkflowNotifications"',
    );
  });
});
