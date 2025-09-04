'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

// Use React.ComponentProps instead of importing types from next-themes/dist/types
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}
