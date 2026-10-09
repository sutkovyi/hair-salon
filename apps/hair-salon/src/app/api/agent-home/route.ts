const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://krasovska.beauty';

export function GET() {
  const body = `# Nataliia Krasovska

Hair stylist in Valencia, Spain. Kids', men's and women's haircuts, hairstyles, and everyday styling.

## Services

- Children's haircuts and styling
- Women's and men's haircuts
- Everyday styling and festive hairstyles

## Contact

- Website: ${siteUrl}/
- Phone: +38 073 181 92 04
- WhatsApp: https://wa.me/380731819204
- Address: Talula Head & SPA, C/ de la Font de la Figuera, 7, Quatre Carreres, 46004 València, Valencia, Spain

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