import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const apiKey = process.env.CAL_API_KEY;

if (!apiKey) {
  throw new Error('Set CAL_API_KEY before running this script.');
}

const response = await fetch('https://api.cal.com/v2/event-types', {
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

if (!response.ok) {
  throw new Error(`Cal.com returned HTTP ${response.status}: ${await response.text()}`);
}

const payload = await response.json();
const eventTypes = Array.isArray(payload.data)
  ? payload.data
  : (payload.data?.eventTypeGroups ?? []).flatMap((group) => group.eventTypes);

if (eventTypes.length === 0) {
  throw new Error('Cal.com returned no event types; refusing to save an empty backup.');
}

const exportedAt = new Date().toISOString();
const filename = `calcom-event-types-backup-${exportedAt.replace(/[:.]/g, '-')}.json`;
const artifactDirectory = fileURLToPath(new URL('../../../artifacts/', import.meta.url));
const outputPath = join(artifactDirectory, filename);
const backup = {
  source: 'Cal.com API v2 GET /v2/event-types',
  exportedAt,
  count: eventTypes.length,
  eventTypes,
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(backup, null, 2)}\n`, { flag: 'wx' });

console.log(`Saved ${backup.count} event types to ${outputPath}`);
