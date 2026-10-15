import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';

const API_VERSION = '2026-06-12';
const CANARY_EVENT_TYPE_ID = 7494072;
const artifactDirectory = fileURLToPath(new URL('../../../artifacts/', import.meta.url));

function parseArgs(args) {
  const options = { address: undefined, isPublic: true, apply: false, help: false };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (argument === '--help' || argument === '-h') {
      options.help = true;
    } else if (argument === '--apply') {
      options.apply = true;
    } else if (argument === '--address') {
      options.address = args[++index];
    } else if (argument === '--public') {
      const value = args[++index];
      if (value !== 'true' && value !== 'false') {
        throw new Error('--public must be true or false.');
      }
      options.isPublic = value === 'true';
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }

  return options;
}

function printHelp() {
  console.log(`Update the address of every Cal.com address location.

Usage:
  npm run update:calcom-event-type-locations -- --address "New address"
  npm run update:calcom-event-type-locations -- --address "New address" --public true --apply

Options:
  --address <text>       New physical address (required except with --help)
  --public <true|false>  Whether the address is shown publicly (default: true)
  --apply                Perform the canary and bulk writes; default is preview only
  --help, -h             Show this help

Set CAL_API_KEY in apps/hair-salon/.env.local or in the environment before --apply.`);
}

function makeTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function validateEventTypes(eventTypes) {
  if (!Array.isArray(eventTypes) || eventTypes.length === 0) {
    throw new Error('Cal.com returned no event types; refusing to continue.');
  }

  const ids = new Set(eventTypes.map((eventType) => eventType.id));
  if (ids.size !== eventTypes.length || eventTypes.some((eventType) => !Number.isInteger(eventType.id))) {
    throw new Error('Cal.com returned duplicate or invalid event type IDs; refusing to continue.');
  }

  for (const eventType of eventTypes) {
    if (!Array.isArray(eventType.locations)) {
      throw new Error(`Event type ${eventType.id} has no locations array; refusing to continue.`);
    }

    for (const location of eventType.locations) {
      if (location.type !== 'address') {
        throw new Error(
          `Event type ${eventType.id} has unsupported location type "${location.type}". ` +
            'No writes were made; review this record before updating.',
        );
      }
    }
  }

  return ids;
}

async function requestEventTypes(headers) {
  const response = await fetch('https://api.cal.com/v2/event-types', {
    headers: {
      Authorization: headers.Authorization,
      'cal-api-version': API_VERSION,
    },
  });

  if (!response.ok) {
    throw new Error(`Cal.com list request failed with HTTP ${response.status}.`);
  }

  const payload = await response.json();
  if (payload.status !== 'success' || !Array.isArray(payload.data)) {
    throw new Error('Cal.com returned an unexpected event type list response.');
  }

  return payload.data;
}

function updateLocations(eventType, address, isPublic) {
  return eventType.locations.map((location) => ({
    ...location,
    address,
    public: isPublic,
  }));
}

async function patchEventType(eventType, locations, headers) {
  const response = await fetch(`https://api.cal.com/v2/event-types/${eventType.id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ locations, disableGuests: eventType.disableGuests }),
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.status === 'error') {
    throw new Error(`PATCH for event type ${eventType.id} failed with HTTP ${response.status}.`);
  }
}

function compareEventTypes(expected, actual) {
  const actualById = new Map(actual.map((eventType) => [eventType.id, eventType]));
  const mismatches = [];

  for (const expectedEventType of expected) {
    const actualEventType = actualById.get(expectedEventType.id);
    if (!actualEventType) {
      mismatches.push({ id: expectedEventType.id, paths: ['missing'] });
      continue;
    }

    if (!isDeepStrictEqual(expectedEventType, actualEventType)) {
      mismatches.push({ id: expectedEventType.id, paths: findDifferences(expectedEventType, actualEventType) });
    }
  }

  if (actual.length !== expected.length || actualById.size !== expected.length) {
    mismatches.push({ id: null, paths: ['event type count or IDs changed'] });
  }

  return mismatches;
}

function findDifferences(expected, actual) {
  const paths = [];
  const visit = (left, right, path = '') => {
    if (paths.length >= 25 || isDeepStrictEqual(left, right)) return;

    if (
      left === null ||
      right === null ||
      typeof left !== 'object' ||
      typeof right !== 'object' ||
      Array.isArray(left) !== Array.isArray(right)
    ) {
      paths.push(path || '$');
      return;
    }

    const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
    for (const key of keys) {
      if (!(key in left) || !(key in right)) {
        paths.push(`${path}/${key}`);
      } else {
        visit(left[key], right[key], `${path}/${key}`);
      }
      if (paths.length >= 25) return;
    }
  };

  visit(expected, actual);
  return paths;
}

async function saveJson(filename, value) {
  await mkdir(artifactDirectory, { recursive: true });
  const path = join(artifactDirectory, filename);
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, { flag: 'wx' });
  return path;
}

const options = parseArgs(process.argv.slice(2));
if (options.help) {
  printHelp();
  process.exit(0);
}
if (typeof options.address !== 'string' || options.address.trim().length === 0) {
  throw new Error('Provide a non-empty --address value.');
}
options.address = options.address.trim();

const apiKey = process.env.CAL_API_KEY;
if (options.apply && !apiKey) {
  throw new Error('Set CAL_API_KEY in apps/hair-salon/.env.local or the environment before using --apply.');
}

const headers = {
  Authorization: `Bearer ${apiKey ?? ''}`,
  'cal-api-version': API_VERSION,
  'Content-Type': 'application/json',
};
const eventTypes = await requestEventTypes(headers);
const ids = validateEventTypes(eventTypes);
const canary = eventTypes.find((eventType) => eventType.id === CANARY_EVENT_TYPE_ID);
if (!canary) {
  throw new Error(`Required Cal.com canary event type ${CANARY_EVENT_TYPE_ID} was not found.`);
}

const desiredById = new Map(
  eventTypes.map((eventType) => [eventType.id, updateLocations(eventType, options.address, options.isPublic)]),
);
const changed = eventTypes.filter(
  (eventType) => !isDeepStrictEqual(eventType.locations, desiredById.get(eventType.id)),
);
if (changed.length === 0) {
  throw new Error('All address locations already have the requested values; no writes were made.');
}
if (changed.every((eventType) => eventType.id !== CANARY_EVENT_TYPE_ID)) {
  throw new Error(`Canary ${CANARY_EVENT_TYPE_ID} already has the requested values; no writes were made.`);
}

console.log(
  JSON.stringify(
    {
      mode: options.apply ? 'apply' : 'dry-run',
      apiVersion: API_VERSION,
      eventTypeCount: eventTypes.length,
      uniqueIds: ids.size,
      changedCount: changed.length,
      alreadyCorrectCount: eventTypes.length - changed.length,
      canaryEventTypeId: CANARY_EVENT_TYPE_ID,
      requestedLocation: { address: options.address, public: options.isPublic },
      changedEventTypeIds: changed.map((eventType) => eventType.id),
    },
    null,
    2,
  ),
);

if (!options.apply) {
  console.log('Preview only. Add --apply to run the canary and update the event types.');
  process.exit(0);
}

const exportedAt = new Date().toISOString();
const baselinePath = await saveJson(`calcom-event-types-location-baseline-${makeTimestamp()}.json`, {
  source: 'Cal.com API v2 GET /v2/event-types',
  apiVersion: API_VERSION,
  exportedAt,
  count: eventTypes.length,
  eventTypes,
});
const outcomes = [];
const attemptedIds = new Set();
let canaryVerified = false;
let shouldRollback = false;

try {
  attemptedIds.add(CANARY_EVENT_TYPE_ID);
  await patchEventType(canary, desiredById.get(CANARY_EVENT_TYPE_ID), headers);
  outcomes.push({ id: CANARY_EVENT_TYPE_ID, status: 'canary-updated' });

  const afterCanary = await requestEventTypes(headers);
  const expectedCanary = eventTypes.map((eventType) =>
    eventType.id === CANARY_EVENT_TYPE_ID
      ? { ...eventType, locations: desiredById.get(CANARY_EVENT_TYPE_ID) }
      : eventType,
  );
  const canaryMismatches = compareEventTypes(expectedCanary, afterCanary);
  if (canaryMismatches.length > 0) {
    throw new Error(`Canary recursive comparison failed: ${JSON.stringify(canaryMismatches.slice(0, 5))}`);
  }
  canaryVerified = true;

  for (const eventType of changed) {
    if (eventType.id === CANARY_EVENT_TYPE_ID) continue;
    attemptedIds.add(eventType.id);
    await patchEventType(eventType, desiredById.get(eventType.id), headers);
    outcomes.push({ id: eventType.id, status: 'updated' });
  }

  const afterBulk = await requestEventTypes(headers);
  const successfullyUpdatedIds = new Set(
    outcomes
      .filter((outcome) => outcome.status === 'updated' || outcome.status === 'canary-updated')
      .map((outcome) => outcome.id),
  );
  const expectedAfterBulk = eventTypes.map((eventType) =>
    successfullyUpdatedIds.has(eventType.id)
      ? { ...eventType, locations: desiredById.get(eventType.id) }
      : eventType,
  );
  const mismatches = compareEventTypes(expectedAfterBulk, afterBulk);
  if (mismatches.length > 0) {
    shouldRollback = true;
    throw new Error(`Final recursive comparison failed: ${JSON.stringify(mismatches.slice(0, 5))}`);
  }
} catch (error) {
  shouldRollback = shouldRollback || canaryVerified || outcomes.length > 0;
  if (shouldRollback) {
    const rollbackFailures = [];
    for (const id of attemptedIds) {
      const original = eventTypes.find((eventType) => eventType.id === id);
      try {
        await patchEventType(original, original.locations, headers);
      } catch (rollbackError) {
        rollbackFailures.push({ id, error: String(rollbackError) });
      }
    }

    const afterRollback = await requestEventTypes(headers);
    const rollbackMismatches = compareEventTypes(eventTypes, afterRollback);
    const resultPath = await saveJson(`calcom-event-types-location-result-${makeTimestamp()}.json`, {
      source: 'Cal.com API v2 PATCH /v2/event-types/{eventTypeId}',
      apiVersion: API_VERSION,
      baselinePath,
      requestedLocation: { address: options.address, public: options.isPublic },
      outcomes,
      error: String(error),
      rollbackFailures,
      rollbackMismatches,
      rollbackVerified: rollbackFailures.length === 0 && rollbackMismatches.length === 0,
    });
    throw new Error(
      `${error.message}. Rollback ${rollbackFailures.length === 0 && rollbackMismatches.length === 0 ? 'verified' : 'could not be verified'}; result: ${resultPath}`,
    );
  }
  throw error;
}

const resultPath = await saveJson(`calcom-event-types-location-result-${makeTimestamp()}.json`, {
  source: 'Cal.com API v2 PATCH /v2/event-types/{eventTypeId}',
  apiVersion: API_VERSION,
  baselinePath,
  requestedLocation: { address: options.address, public: options.isPublic },
  eventTypeCount: eventTypes.length,
  uniqueIds: ids.size,
  outcomes,
  verified: true,
});
console.log(`Verified ${outcomes.length} location updates. Baseline: ${baselinePath}. Result: ${resultPath}`);