'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { translations } from '@/app/data/translations'

type Language = 'en' | 'fa'
type Direction = 'ltr' | 'rtl'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: Direction
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function useLanguageState(): LanguageContextType {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: unknown = translations[language]

    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        // Index to next nested value
        // @ts-expect-error it is needed indeed
        value = value[k]
      } else {
        return key // fallback to key itself if path invalid
      }
    }

    return typeof value === 'string' ? value : key
  }

  const dir: Direction = language === 'fa' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.lang = language
  }, [language, dir])

  return {
    language,
    setLanguage,
    t,
    dir,
  }
}

export { LanguageContext }
