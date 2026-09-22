const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://care-of-your-hair.n-sutkovoy.workers.dev';

export function GET() {
  const body = `# Page not found

The requested page does not exist on this website.

- Sitemap: ${siteUrl}/sitemap.xml
- Agent guidance: ${siteUrl}/llms.txt
`;

  return new Response(body, {
    status: 404,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
    },
  });
}