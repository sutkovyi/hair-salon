import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === 'development'
    ? {
        turbopack: {
          resolveAlias: {
            'cloudflare:workers': './src/cloudflare-workers-dev.ts',
          },
        },
      }
    : {}),
};

export default withNextIntl(nextConfig);

