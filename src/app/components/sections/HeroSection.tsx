'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/app/components/ui/Button'
import { ChevronDown, Github, Linkedin, Phone, Mail, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { useParallax } from '@/app/hooks/useScrollAnimation'
import { scrollToElement } from '@/app/lib/utils'
import { personalInfo } from '@/app/data/portfolio'

export function HeroSection() {
  const { t, dir } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const scrollY = useParallax()

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-500"
    >
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
        {/* Floating Blobs */}
        <div className="absolute inset-0">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/30 to-purple-300/20 dark:from-green-400/20 dark:to-green-600/10 rounded-full blur-3xl animate-pulse-slow transition-colors duration-500"
            style={{
              transform: `translateY(${scrollY * 0.3}px) translateX(${mousePosition.x}px)`,
              filter: 'blur(80px)',
            }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-l from-purple-100/25 to-purple-200/15 dark:from-green-500/15 dark:to-green-300/8 rounded-full blur-2xl animate-float-slow transition-colors duration-500"
            style={{
              transform: `translateY(${scrollY * -0.2}px) translateX(${mousePosition.x * -0.8}px)`,
              animationDelay: '1s',
              filter: 'blur(60px)',
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 w-full min-h-screen flex items-center justify-center px-6 sm:px-10 lg:px-20 xl:px-32"
        dir={dir}
      >
        <div className="max-w-7xl mx-auto text-center space-y-16 sm:space-y-20">
          {/* Glass Card */}
          <div
            className={`backdrop-blur-sm bg-white/10 dark:bg-black/10 rounded-3xl p-8 sm:p-12 lg:p-20 border border-white/20 dark:border-white/5 shadow-2xl transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-95'
            }`}
          >
            {/* Greeting Badge */}
            <div
              className={`inline-flex items-center gap-4 px-6 py-3 mb-10 bg-purple-50/80 dark:bg-green-900/30 backdrop-blur-sm rounded-full border border-purple-200/50 dark:border-green-700/30 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${dir === 'rtl' ? 'font-sahel' : ''}`}
            >
              <div className="w-3 h-3 bg-purple-500 dark:bg-green-400 rounded-full animate-pulse" />
              <span className="text-lg font-semibold text-purple-700 dark:text-green-300 transition-colors duration-500">
                {t('hero.greeting')}
              </span>
            </div>
<br />
            {/* Name */}
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-black mb-6 tracking-tight transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${dir === 'rtl' ? 'font-sahel' : ''}`}
            >
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent leading-none transition-colors duration-500">
                {t('hero.name')}
              </span>
            </h1>
<br />
            {/* Title */}
            <h2
              className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-8 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${dir === 'rtl' ? 'font-sahel' : ''}`}
            >
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 dark:from-green-400 dark:via-green-300 dark:to-green-500 bg-clip-text text-transparent transition-colors duration-500">
                {t('hero.title')}
              </span>
            </h2>
<br />
            {/* Subtitle */}
            <h3
              className={`text-lg sm:text-xl lg:text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-10 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${dir === 'rtl' ? 'font-sahel' : ''}`}
            >
              {t('hero.subtitle')}
            </h3>
            {/* Description */}
            <p
              className={`text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed text-gray-700 dark:text-gray-300 mb-12 transition-all duration-700 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${dir === 'rtl' ? 'font-sahel' : ''}`}
            >
              {t('hero.description')}
            </p>
<br />
            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-6 justify-center mb-14 transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Button
                size="lg"
                onClick={() => scrollToElement('showcase')}
                className={`group relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white font-semibold px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                  dir === 'rtl' ? 'font-sahel' : ''
                }`}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t('hero.cta')}
                  <ArrowRight
                    className={`w-5 h-5 transition-transform duration-300 ${
                      dir === 'rtl'
                        ? 'rotate-180 group-hover:-translate-x-1'
                        : 'group-hover:translate-x-1'
                    }`}
                  />
                </span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToElement('contact')}
                className={`group font-semibold px-8 py-4 text-lg rounded-2xl border-2 border-purple-300 dark:border-green-400 text-purple-700 dark:text-green-300 hover:bg-purple-50 dark:hover:bg-green-900/20 hover:border-purple-400 dark:hover:border-green-300 transform hover:scale-105 transition-all duration-300 ${
                  dir === 'rtl' ? 'font-sahel' : ''
                }`}
              >
                {t('hero.ctaSecondary')}
              </Button>
            </div>
<br />
            {/* Social Links */}
            <div
              className={`flex justify-center gap-8 ${
                dir === 'rtl' ? 'space-x-reverse' : ''
              } mb-10`}
              aria-label={t('social links')}
            >
              {[
                { icon: Github, href: personalInfo.github, label: 'GitHub' },
                { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
                { icon:Phone, href:`tel: ${personalInfo.phone}`, label: 'Phone'},
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group inline-flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 backdrop-blur-sm border border-gray-300 dark:border-gray-700 hover:bg-purple-200 dark:hover:bg-green-700 hover:border-purple-400 dark:hover:border-green-500 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-green-400 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  <Icon className="w-8 h-8" />
                </a>
              ))}
            </div>
<br />
            {/* Scroll Indicator */}
            <button
              onClick={() => scrollToElement('showcase')}
              className={`group p-5 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 hover:bg-purple-100/30 dark:hover:bg-green-900 transition-all duration-300 animate-bounce hover:animate-none ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              aria-label="Scroll down to showcase section"
            >
              <ChevronDown className="w-8 h-8 text-purple-600 dark:text-green-400 transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
