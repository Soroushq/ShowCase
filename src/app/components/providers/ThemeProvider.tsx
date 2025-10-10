'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"                // Adds "dark" or "light" to <html>
      defaultTheme="system"            // Start based on system theme
      enableSystem={true}              // Allow automatic detection
      disableTransitionOnChange={true} // Prevent flicker
      storageKey="portfolio-theme"     // Save user choice
    >
      {children}
    </NextThemesProvider>
  )
}


