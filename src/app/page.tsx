// File: src/app/page.tsx
'use client'

import { Navigation } from './components/sections/Navigation'
import { HeroSection } from './components/sections/HeroSection'
import { ShowcaseSection } from './components/sections/ShowcaseSection'
import { InventionSection } from './components/sections/InventionSection'
import { AboutSection } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'
import { MarvelIntro } from './components/ui/MarvelIntro'
import { CatGuide } from './components/ui/CatGuide'

export default function Home() {
  return (
    <>
      <MarvelIntro />
      <CatGuide />
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
        <InventionSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  )
}
