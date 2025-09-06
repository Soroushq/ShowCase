import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './components/providers/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Soroush Qary Ivary Portfolio',
  description:
    'Showcasing previous works, capabilities, contact info. Full-stack developer specializing in React, Next.js, and innovative digital experiences.',
  keywords: ['portfolio', 'web developer', 'react', 'nextjs', 'full-stack'],
  authors: [{ name: 'Soroush Qary Ivary' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Soroush Qary Ivary Portfolio',
    description: 'portfolio showcase for full-stackish front-end developer',
    siteName: 'Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soroush Qary Ivary Portfolio',
    description: 'portfolio showcase for full-stackish front-end developer',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning // Prevent mismatch when theme changes on load
      className={inter.variable}
    >
      <body
        className={`${inter.className} antialiased transition-colors duration-300`}
        suppressHydrationWarning
      >
        {/* ThemeProvider wraps the entire app */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
