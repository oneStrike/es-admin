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
    expect(basicVueSource).toContain('<Notification ');
    expect(basicVueSource).toMatch(
      /import\s*\{[^}]*\bNotification\b[^}]*\}\s*from\s*'@vben\/layouts'/s,
    );
  });
});
