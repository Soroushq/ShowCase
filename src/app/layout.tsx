import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Script from 'next/script'
import { ThemeProvider } from './components/providers/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

// Local Sahel for RTL
const sahel = localFont({
  variable: '--font-sahel',
  display: 'swap',
  src: [
    { path: '../../public/fonts/sahel/Sahel-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/sahel/Sahel.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/sahel/Sahel-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/sahel/Sahel-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/sahel/Sahel-Black.woff2', weight: '900', style: 'normal' },
  ],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Soroush Qary Ivary Portfolio',
    template: '%s | Soroush Qary Ivary',
  },
  description:
    'Showcasing previous works, capabilities, and contact info for a full‑stackish front‑end developer specializing in React and Next.js.',
  keywords: ['portfolio', 'web developer', 'react', 'nextjs', 'full-stack'],
  authors: [{ name: 'Soroush Qary Ivary' }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'fa-IR': '/fa',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Soroush Qary Ivary Portfolio',
    description: 'Portfolio showcase for a full‑stackish front‑end developer.',
    siteName: 'Portfolio',
    images: [
      {
        url: '/og/cover.png',
        width: 1200,
        height: 630,
        alt: 'Soroush Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soroush Qary Ivary Portfolio',
    description: 'Portfolio showcase for a full‑stackish front‑end developer.',
    images: ['/og/cover.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png' }],
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Allow zoom for accessibility
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sahel.variable}`}
    >
      <body className={`${inter.className} antialiased transition-colors duration-300`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 rounded bg-light-secondary px-3 py-2 text-light-text dark:bg-dark-secondary dark:text-dark-text"
        >
          Skip to content
        </a>

        <ThemeProvider>
          {children}
        </ThemeProvider>

        {/* JSON-LD structured data */}
        <Script
          id="ld-json-site"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Soroush Qary Ivary Portfolio',
              url: siteUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteUrl}/?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <Script
          id="ld-json-person"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Soroush Qary Ivary',
              url: siteUrl,
              jobTitle: 'Front-end / Full-stack Developer',
            }),
          }}
        />
      </body>
    </html>
  )
}
