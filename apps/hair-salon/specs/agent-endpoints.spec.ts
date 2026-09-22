import { GET as getAgentHome } from '../src/app/api/agent-home/route';
import { GET as getAgent404 } from '../src/app/api/agent-404/route';
import sitemap from '../src/app/sitemap';

describe('agent-facing resources', () => {
  it('returns a Markdown homepage summary', async () => {
    const response = getAgentHome();

    expect(response.headers.get('content-type')).toContain('text/markdown');
    expect(response.headers.get('vary')).toBe('Accept');
    expect(await response.text()).toContain('# Nataliia Krasovska');
  });

  it('returns a useful Markdown 404', async () => {
    const response = getAgent404();

    expect(response.status).toBe(404);
    expect(response.headers.get('content-type')).toContain('text/markdown');
    expect(await response.text()).toContain('/sitemap.xml');
  });

  it('lists localized indexable pages in the sitemap', () => {
    const entries = sitemap();

    expect(entries.map((entry) => entry.url)).toEqual(
      expect.arrayContaining([
        'https://care-of-your-hair.n-sutkovoy.workers.dev/uk',
        'https://care-of-your-hair.n-sutkovoy.workers.dev/en',
        'https://care-of-your-hair.n-sutkovoy.workers.dev/uk/privacy',
        'https://care-of-your-hair.n-sutkovoy.workers.dev/uk/terms',
      ])
    );
  });
});