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
  title: 'Creative Developer Portfolio | Modern Web Development',
  description:
    'Showcasing modern web applications with cutting-edge technologies. Full-stack developer specializing in React, Next.js, and innovative digital experiences.',
  keywords: ['portfolio', 'web developer', 'react', 'nextjs', 'full-stack'],
  authors: [{ name: 'Your Name' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Creative Developer Portfolio',
    description: 'Modern portfolio showcase for a full-stack developer',
    siteName: 'Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creative Developer Portfolio',
    description: 'Modern portfolio showcase for a full-stack developer',
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
