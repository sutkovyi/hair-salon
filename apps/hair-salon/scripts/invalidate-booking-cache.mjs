import { execFileSync } from 'node:child_process';

const wranglerArgs = [
  'wrangler',
  'kv',
  'key',
  'list',
  '--binding',
  'BOOKING_CACHE',
  '--config',
  'wrangler.jsonc',
  '--remote',
];

let deleted = 0;

while (true) {
  const output = execFileSync('npx', wranglerArgs, { encoding: 'utf8' });
  const keys = JSON.parse(output);

  if (keys.length === 0) break;

  for (const { name } of keys) {
    execFileSync(
      'npx',
      [
        'wrangler',
        'kv',
        'key',
        'delete',
        name,
        '--binding',
        'BOOKING_CACHE',
        '--config',
        'wrangler.jsonc',
        '--remote',
      ],
      { stdio: 'inherit' }
    );
    deleted += 1;
  }
}

console.log(`Cleared ${deleted} KV cache key${deleted === 1 ? '' : 's'}.`);