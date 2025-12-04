// File: next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve modern formats when supported (falls back automatically)
    formats: ['image/avif', 'image/webp'],
    // Allow external image sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.thum.io',
        pathname: '/get/**',
      },
      {
        protocol: 'https',
        hostname: 'api.apiflash.com',
        pathname: '/v1/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    // lucide-react is auto-optimized in recent Next, but this is safe to keep
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
