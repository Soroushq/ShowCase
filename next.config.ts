/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint
  },
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checking
  },
}

module.exports = nextConfig
