// File: src/app/components/layout/Navigation.tsx
'use client'

import { useState, useEffect } from 'react'
import ThemeToggle from '@/app/components/ui/ThemeToggle'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { scrollToElement } from '@/app/lib/utils'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage, t, dir } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fa' : 'en')
  }

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'work', href: '#showcase' },
    { key: 'about', href: '#about' },
    { key: 'contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        isScrolled || isMenuOpen
          ? 'bg-white/95 dark:bg-[#050608]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-sm' 
          : 'bg-transparent py-4 sm:py-6'
      }`}
      dir={dir}
    >
      {/* Container */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Area */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToElement('hero')}
              className="group flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              {/* Icon Box (Always Visible) */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-neutral-900 dark:bg-white rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white dark:text-black font-black text-lg sm:text-xl leading-none">S</span>
              </div>
              
              {/* Text (Hidden on Mobile) */}
              <span className={`hidden sm:block text-xl font-black tracking-tighter text-neutral-900 dark:text-white ${
                dir === 'rtl' ? 'font-sahel text-2xl' : 'font-mono'
              }`}>
                {dir === 'rtl' ? 'سروش.دِو' : 'SOROUSH.DEV'}
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className={`flex items-center ${dir === 'rtl' ? 'flex-row-reverse' : ''} gap-8 lg:gap-10`}>
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToElement(item.href.slice(1))}
                  className={`text-sm font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all duration-300 hover:-translate-y-0.5 ${
                    dir === 'rtl' ? 'font-sahel tracking-normal text-base' : ''
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Controls Area (Desktop + Mobile Unified Style) */}
          <div className={`flex items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            
            {/* Language Toggle (Simple Button) */}
            <button
              type="button"
              onClick={toggleLanguage}
              className={`w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-black text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-all duration-300 uppercase ${dir === 'rtl' ? 'font-sahel' : ''}`}
              aria-label="Toggle language"
            >
              {language === 'en' ? 'FA' : 'EN'}
            </button>
            
            {/* Theme Toggle */}
            <div className="relative z-10 flex items-center">
              <ThemeToggle />
            </div>
            
            {/* Menu Toggle (Mobile Only - Matching Style) */}
            <div className="md:hidden">
               <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${isMenuOpen ? 'bg-neutral-100 dark:bg-neutral-800' : 'bg-transparent'}`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
              {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 pb-4">
            <div className="mt-2 mx-0 sm:mx-2 backdrop-blur-md bg-white/95 dark:bg-gray-950/95 border border-gray-200/60 dark:border-gray-800/60 rounded-2xl p-4 shadow-2xl">
              <div className="space-y-2">
                {navItems.map(item => (
                  <button
                    key={item.key}
                    onClick={() => {
                      scrollToElement(item.href.slice(1))
                      setIsMenuOpen(false)
                    }}
                    className={`
                      block w-full text-center px-4 py-3
                      text-sm font-bold uppercase tracking-[0.15em]
                      text-neutral-600 dark:text-neutral-300
                      hover:text-white
                      rounded-xl
                      hover:bg-neutral-900 dark:hover:bg-neutral-700
                      transition-all duration-200
                      ${dir === 'rtl' ? 'font-sahel tracking-normal text-base' : ''}
                    `}
                  >
                    {t(`nav.${item.key}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
