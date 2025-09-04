'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/app/components/ui/Button'
import { ThemeToggle } from '@/app/components/ui/ThemeToggle'
import { Globe, Menu, X } from 'lucide-react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { scrollToElement } from '@/app/lib/utils'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage, t, dir } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl border-b border-gray-200/50 dark:border-gray-700/50' 
          : 'bg-transparent'
      }`}
      dir={dir}
    >
      {/* Fixed Width Container - Prevents RTL/LTR Shifting */}
      <div className="w-full max-w-full mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - Fixed Position */}
          <div className="flex-shrink-0 w-48">
            <button
              onClick={() => scrollToElement('hero')}
              className={`text-2xl sm:text-3xl font-black text-purple-600 dark:text-green-400 hover:text-purple-700 dark:hover:text-green-300 transition-all duration-300 hover:scale-105 ${
                dir === 'rtl' ? 'font-sahel' : ''
              }`}
            >
              {dir === 'rtl' ? 'نمونه کار ها' : 'Portfolio'}
            </button>
          </div>

          {/* Desktop Navigation - Centered with Better Spacing */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className={`flex items-center ${dir === 'rtl' ? 'flex-row-reverse' : ''} gap-8 lg:gap-12`}>
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToElement(item.href.slice(1))}
                  className={`text-lg font-semibold text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-green-400 px-4 py-2 rounded-xl hover:bg-purple-50 dark:hover:bg-green-900/20 transition-all duration-300 hover:scale-105 ${
                    dir === 'rtl' ? 'font-sahel' : ''
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Controls - Fixed Position */}
          <div className={`hidden md:flex items-center w-48 justify-end ${dir === 'rtl' ? 'flex-row-reverse' : ''} gap-4`}>
            {/* Language Toggle - Standalone Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="relative h-12 w-12 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-purple-100 dark:hover:bg-green-900/30 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:scale-105 flex items-center justify-center"
              aria-label="Toggle language"
            >
              <Globe className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              <span className="absolute -top-2 -right-2 text-xs font-bold bg-purple-600 dark:bg-green-500 text-white px-2 py-1 rounded-full">
                {language.toUpperCase()}
              </span>
            </button>
            
            {/* Theme Toggle - Isolated and Clickable */}
            <div className="relative z-10">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Controls */}
          <div className={`md:hidden flex items-center ${dir === 'rtl' ? 'flex-row-reverse' : ''} gap-3`}>
            {/* Language Toggle Mobile */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="relative h-10 w-10 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-purple-100 dark:hover:bg-green-900/30 flex items-center justify-center"
              aria-label="Toggle language"
            >
              <Globe className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 text-xs font-bold bg-purple-600 dark:bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                {language.toUpperCase()}
              </span>
            </button>
            
            {/* Theme Toggle Mobile - Isolated */}
            <div className="relative z-10">
              <ThemeToggle />
            </div>
            
            {/* Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-10 w-10 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-purple-100 dark:hover:bg-green-900/30 text-gray-600 dark:text-gray-300 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-6">
            <div className="mx-4 mt-4 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-2xl">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      scrollToElement(item.href.slice(1))
                      setIsMenuOpen(false)
                    }}
                    className={`block w-full text-center px-4 py-4 text-lg font-semibold text-gray-700 dark:text-gray-200 hover:text-white rounded-xl hover:bg-purple-600 dark:hover:bg-green-600 transition-all duration-300 ${
                      dir === 'rtl' ? 'font-sahel' : ''
                    }`}
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
