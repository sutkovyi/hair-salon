import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const markdownType = 'text/markdown; charset=utf-8';
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://krasovska.beauty';

const markdownHeaders = {
  'Content-Type': markdownType,
  Vary: 'Accept',
};

const homepageMarkdown = `# Nataliia Krasovska

Hair stylist in Valencia, Spain. Kids', men's and women's haircuts, hairstyles, and everyday styling.

## Services

- Children's haircuts and styling
- Women's and men's haircuts
- Everyday styling and festive hairstyles

## Booking

- Booking catalog: ${siteUrl}/booking

## Contact

- Website: ${siteUrl}/
- Phone: +38 073 181 92 04
- WhatsApp: https://wa.me/380731819204
- Address: Talula Head & SPA, C/ de la Font de la Figuera, 7, Quatre Carreres, 46004 València, Valencia, Spain

## More machine-readable information

- Sitemap: ${siteUrl}/sitemap.xml
- Agent guidance: ${siteUrl}/llms.txt
- Privacy: ${siteUrl}/privacy
- Terms: ${siteUrl}/terms
`;

const notFoundMarkdown = `# Page not found

The requested page does not exist on this website.

- Sitemap: ${siteUrl}/sitemap.xml
- Agent guidance: ${siteUrl}/llms.txt
`;

export default function middleware(request: NextRequest) {
  const acceptsMarkdown = request.headers
    .get('accept')
    ?.includes('text/markdown');
  const pathname = request.nextUrl.pathname.replace(/\/$/, '') || '/';

  if (
    acceptsMarkdown &&
    (pathname === '/' ||
      pathname === '/uk' ||
      pathname === '/en' ||
      pathname === '/ru')
  ) {
    return new NextResponse(homepageMarkdown, { headers: markdownHeaders });
  }

  if (acceptsMarkdown) {
    return new NextResponse(notFoundMarkdown, {
      status: 404,
      headers: markdownHeaders,
    });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!_next|api|video/|images/|favicon.ico|icon0.svg|icon1.png|apple-icon.png|manifest.json|og-image-2.jpg|workspace.jpg|workspace-placeholder.jpg|workspace.avif|leaf-bg.png|sitemap.xml|llms.txt).*)',
  ],
};
