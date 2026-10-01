import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://soroushqary.me'
  const base = raw.startsWith('http://') || raw.startsWith('https://') ? raw : `https://${raw}`
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
