import { spawnSync } from 'node:child_process';

const cwd = process.cwd();
const gitCommand = process.platform === 'win32' ? 'git.exe' : 'git';
const useShell = process.platform === 'win32';
const pnpmCommand = useShell ? 'pnpm' : 'pnpm';

const gitCheck = spawnSync(
  gitCommand,
  ['rev-parse', '--is-inside-work-tree'],
  {
    cwd,
    encoding: 'utf8',
    stdio: 'ignore',
  },
);

if (gitCheck.error || gitCheck.status !== 0) {
  console.log('prepare: skip lefthook install (not in a git repository)');
  process.exit(0);
}

const installHooks = spawnSync(pnpmCommand, ['exec', 'lefthook', 'install'], {
  cwd,
  shell: useShell,
  stdio: 'inherit',
});

if (installHooks.error) {
  console.error('prepare: failed to run lefthook install');
  console.error(installHooks.error);
  process.exit(1);
}

process.exit(installHooks.status ?? 0);
