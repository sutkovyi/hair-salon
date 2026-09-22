const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://care-of-your-hair.n-sutkovoy.workers.dev';

export function GET() {
  const body = `# Nataliia Krasovska

Hair stylist in Valencia, Spain. Kids', men's and women's haircuts, hairstyles, and everyday styling.

## Services

- Children's haircuts and styling
- Women's and men's haircuts
- Everyday styling and festive hairstyles

## Contact

- Website: ${siteUrl}/uk
- Phone: +34 665 499 177
- WhatsApp: https://wa.me/380731819204
- Address: Av. de l'Institut Obrer de València, 21, Quatre Carreres, 46013 València, Spain

## More machine-readable information

- Sitemap: ${siteUrl}/sitemap.xml
- Agent guidance: ${siteUrl}/llms.txt
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
    },
  });
}