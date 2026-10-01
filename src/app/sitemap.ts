import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://soroushqary.me'
  const base = raw.startsWith('http://') || raw.startsWith('https://') ? raw : `https://${raw}`
  const now = new Date().toISOString()
  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Add project detail routes when they exist
  ]
}
