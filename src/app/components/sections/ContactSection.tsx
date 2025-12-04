// File: src/app/components/sections/ContactSection.tsx
'use client'

import { useEffect, useState } from 'react'
import { buttonVariants } from '@/app/components/ui/Button'
import { Mail, MessageCircle, Github, Linkedin, Phone, MapPin, Send } from 'lucide-react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { socialLinks, personalInfo } from '@/app/data/portfolio'
import { cn } from '@/app/lib/utils'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Mail,
  Phone,
}

export function ContactSection() {
  const { t, dir, language } = useLanguage()
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const el = document.getElementById('contact')
    if (el) observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      dir={dir}
      className="relative min-h-screen flex items-center bg-white dark:bg-[#050608] py-20"
    >
      {/* Subtle corner accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-gradient-to-bl from-cyan-200/30 to-transparent dark:from-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            hasEntered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <h2
            className={`text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl lg:text-5xl ${
              dir === 'rtl' ? 'font-sahel' : ''
            }`}
          >
            {t('contact.title')}
          </h2>
          <p
            className={`mt-4 text-base text-neutral-600 dark:text-neutral-400 sm:text-lg ${
              dir === 'rtl' ? 'font-sahel' : ''
            }`}
          >
            {t('contact.description')}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="mt-16 grid gap-8 lg:grid-cols-5 lg:gap-12">
          
          {/* Left: Contact methods - 2 cols */}
          <div
            className={`space-y-6 lg:col-span-2 transition-all duration-700 ${
              hasEntered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div>
              <h3
                className={`mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400 ${
                  dir === 'rtl' ? 'font-sahel text-right' : ''
                }`}
              >
                {language === 'fa' ? 'تماس مستقیم' : 'GET IN TOUCH'}
              </h3>

              {/* Email */}
              <div className="mb-5">
                <div className={`mb-2 flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Mail className="h-4 w-4 text-neutral-900 dark:text-neutral-100" />
                  <span
                    className={`text-sm font-semibold text-neutral-900 dark:text-neutral-100 ${
                      dir === 'rtl' ? 'font-sahel' : ''
                    }`}
                  >
                    {t('contact.email')}
                  </span>
                </div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className={`block text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors ${
                    dir === 'rtl' ? 'font-sahel text-right' : ''
                  }`}
                >
                  {personalInfo.email}
                </a>
              </div>

              {/* Phone */}
              <div className="mb-5">
                <div className={`mb-2 flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Phone className="h-4 w-4 text-neutral-900 dark:text-neutral-100" />
                  <span
                    className={`text-sm font-semibold text-neutral-900 dark:text-neutral-100 ${
                      dir === 'rtl' ? 'font-sahel' : ''
                    }`}
                  >
                    {language === 'fa' ? 'تلفن' : 'Phone'}
                  </span>
                </div>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className={`block text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors ${
                    dir === 'rtl' ? 'font-sahel text-right' : ''
                  }`}
                >
                  {personalInfo.phone}
                </a>
              </div>

              {/* Location */}
              <div>
                <div className={`mb-2 flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="h-4 w-4 text-neutral-900 dark:text-neutral-100" />
                  <span
                    className={`text-sm font-semibold text-neutral-900 dark:text-neutral-100 ${
                      dir === 'rtl' ? 'font-sahel' : ''
                    }`}
                  >
                    {language === 'fa' ? 'موقعیت' : 'Location'}
                  </span>
                </div>
                <p
                  className={`text-sm text-neutral-600 dark:text-neutral-400 ${
                    dir === 'rtl' ? 'font-sahel text-right' : ''
                  }`}
                >
                  {personalInfo.location}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3
                className={`mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400 ${
                  dir === 'rtl' ? 'font-sahel text-right' : ''
                }`}
              >
                {language === 'fa' ? 'شبکه‌های اجتماعی' : 'SOCIAL'}
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ name, url, icon }) => {
                  const Icon = iconMap[icon]
                  if (!Icon) return null
                  return (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-900 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:border-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900"
                      title={name}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right: CTA card - 3 cols */}
          <div
            className={`lg:col-span-3 transition-all duration-700 ${
              hasEntered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/80 lg:p-10">
              <h3
                className={`mb-3 text-2xl font-black text-neutral-900 dark:text-neutral-50 lg:text-3xl ${
                  dir === 'rtl' ? 'font-sahel text-right' : ''
                }`}
              >
                {t('contact.cta')}
              </h3>
              <p
                className={`mb-8 text-sm text-neutral-600 dark:text-neutral-400 lg:text-base ${
                  dir === 'rtl' ? 'font-sahel text-right' : ''
                }`}
              >
                {t('contact.readyMessage')}
              </p>

              <div className={`space-y-4 ${dir === 'rtl' ? 'text-right' : ''}`}>
                {/* Primary Email Button */}
                <a
                  href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(
                    language === 'fa' ? 'درخواست همکاری' : 'Project Inquiry'
                  )}`}
                  className={cn(
                    'flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200',
                    dir === 'rtl' ? 'font-sahel flex-row-reverse' : ''
                  )}
                >
                  <Send className="h-4 w-4" />
                  {t('contact.sendEmail')}
                </a>

                {/* LinkedIn Button */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex w-full items-center justify-center gap-2 rounded-lg border-2 border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-all hover:border-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:border-neutral-100 dark:hover:bg-neutral-800',
                    dir === 'rtl' ? 'font-sahel flex-row-reverse' : ''
                  )}
                >
                  <Linkedin className="h-4 w-4" />
                  {t('contact.linkedin')}
                </a>
              </div>

              <p
                className={`mt-6 text-xs text-neutral-500 dark:text-neutral-400 ${
                  dir === 'rtl' ? 'font-sahel text-right' : ''
                }`}
              >
                {t('contact.responseTime')}
              </p>
            </div>
          </div>
        </div>

        {/* Availability badge */}
        <div
          className={`mt-12 flex justify-center transition-all duration-700 ${
            hasEntered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-gray-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-gray-700 dark:border-emerald-700 dark:bg-gray-950 dark:text-emerald-300 ${
              dir === 'rtl' ? 'font-sahel flex-row-reverse' : ''
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-400 opacity-75 dark:bg-gray-500" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            </span>
            {language === 'fa' ? 'آماده پروژه‌های جدید' : 'Available for new projects'}
          </div>
        </div>
      </div>
    </section>
  )
}
