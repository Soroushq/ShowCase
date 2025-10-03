/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve modern formats when supported (falls back automatically)
    formats: ['image/avif', 'image/webp'],
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
