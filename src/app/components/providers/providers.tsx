'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"  // 👈 Respect the user's device settings on first load
      enableSystem={true}    // 👈 Allow automatic detection
    >
      {children}
    </ThemeProvider>
  )
}
