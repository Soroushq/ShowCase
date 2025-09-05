'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

// Use React.ComponentProps instead of importing from next-themes/dist/types
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

/**
 * Custom ThemeProvider wrapper around next-themes ThemeProvider.
 * This manages dark/light themes, system preference, and user overrides.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"                // Adds class="dark" or class="light" to <html>
      defaultTheme="system"            // Start by respecting system theme
      enableSystem={true}              // Allow auto-detection of system theme
      disableTransitionOnChange={true} // Prevent flicker when switching themes
      storageKey="portfolio-theme"     // Save user preference to localStorage
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
