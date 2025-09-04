import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './components/providers/ThemeProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'], // optional for full range
})

export const metadata: Metadata = {
  title: 'Creative Developer Portfolio | Modern Web Development',
  description: 'Showcasing modern web applications with cutting-edge technologies. Full-stack developer specializing in React, Next.js, and innovative digital experiences.',
  keywords: ['portfolio', 'web developer', 'react', 'nextjs', 'full-stack'],
  authors: [{ name: 'Your Name' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Creative Developer Portfolio',
    description: 'Modern portfolio showcase for a full-stack developer',
    siteName: 'Portfolio',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
