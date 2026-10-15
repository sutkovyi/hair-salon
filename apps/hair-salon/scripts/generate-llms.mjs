import { readFile, writeFile } from 'node:fs/promises';

const locationPath = new URL('../src/config/site-location.json', import.meta.url);
const llmsPath = new URL('../public/llms.txt', import.meta.url);
const location = JSON.parse(await readFile(locationPath, 'utf8'));
const formattedAddress = `${location.salonName}, ${location.streetAddress}, ${location.addressDistrict}, ${location.postalCode} ${location.addressLocality}, ${location.addressRegion}, ${location.countryName}`;
const content = await readFile(llmsPath, 'utf8');
const businessLocationPattern = /^- Location: .*$/m;
const physicalLocationPattern = /(Services are provided at:\r?\n\r?\n)[^\r\n]+/;

if (!businessLocationPattern.test(content) || !physicalLocationPattern.test(content)) {
  throw new Error('Could not find the expected location fields in public/llms.txt.');
}

const updatedContent = content
  .replace(businessLocationPattern, `- Location: ${formattedAddress}`)
  .replace(physicalLocationPattern, `$1${formattedAddress}`);

if (updatedContent !== content) {
  await writeFile(llmsPath, updatedContent);
}

console.log(`Generated public/llms.txt location: ${formattedAddress}`);