'use client'

import { createContext, ReactNode } from 'react'
import { LanguageContext, useLanguageState } from '@/app/hooks/useLanguage'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const languageState = useLanguageState()

  return (
    <LanguageContext.Provider value={languageState}>
      {children}
    </LanguageContext.Provider>
  )
}
