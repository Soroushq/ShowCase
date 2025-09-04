'use client'

import { useEffect, useState } from 'react'
import { Navigation } from './components/sections/Navigation'
import { HeroSection } from './components/sections/HeroSection'
import { ShowcaseSection } from './components/sections/ShowcaseSection'
import { AboutSection } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'
import { LanguageProvider } from './components/providers/LanguageProvider'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-light-primary dark:bg-dark-primary">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <LanguageProvider>
      <main className="min-h-screen bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text overflow-x-hidden">
        <Navigation />
        <HeroSection />
        <ShowcaseSection />
        <AboutSection />
        <ContactSection />
      </main>
    </LanguageProvider>
  )
}
