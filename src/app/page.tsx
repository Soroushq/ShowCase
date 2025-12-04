// File: src/app/page.tsx
'use client'

import dynamic from 'next/dynamic'
import { Navigation } from './components/sections/Navigation'
import { HeroSection } from './components/sections/HeroSection'
import { LanguageProvider } from './components/providers/LanguageProvider'

const ShowcaseSection = dynamic(
  () => import('./components/sections/ShowcaseSection').then(m => m.ShowcaseSection),
  { ssr: true, loading: () => <div className="section-padding container-width">Loading showcase…</div> }
)

const AboutSection = dynamic(
  () => import('./components/sections/AboutSection').then(m => m.AboutSection),
  { ssr: true, loading: () => <div className="section-padding container-width">Loading about…</div> }
)

const ContactSection = dynamic(
  () => import('./components/sections/ContactSection').then(m => m.ContactSection),
  { ssr: true, loading: () => <div className="section-padding container-width">Loading contact…</div> }
)

export default function Home() {
  return (
    <LanguageProvider>
      <main
        id="main"
        className="
          min-h-screen
          bg-light-primary dark:bg-dark-primary
          text-light-text dark:text-dark-text
          overflow-x-hidden
          pt-24 sm:pt-28
        "
      >
        <Navigation />
        <HeroSection />
        <ShowcaseSection />
        <AboutSection />
        <ContactSection />
      </main>
    </LanguageProvider>
  )
}
