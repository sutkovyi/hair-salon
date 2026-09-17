//@ts-check

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js options go here
};

module.exports = withNextIntl(nextConfig);

