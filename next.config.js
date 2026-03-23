const path = require('path')
const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 2592000, // 30 days = 24*60*60*30
    deviceSizes: [768, 1024, 1280, 1440, 2560],
    imageSizes: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    domains: ['localhost', 'cdn.sanity.io'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: false,
  trailingSlash: true,
}

module.exports = withNextIntl(nextConfig)
