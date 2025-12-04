// File: src/app/components/sections/AboutSection.tsx
'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { personalInfo } from '@/app/data/portfolio'
import {
  Award,
  Target,
  Users,
  Code2,
  Database,
  Wrench,
  Sparkles,
} from 'lucide-react'
import Image from 'next/image'

type SkillCategoryKey = 'frontend' | 'backend' | 'tools' | 'familiar'

const skillCategoriesEn: Record<SkillCategoryKey, string[]> = {
  frontend: [
    'React',
    'Next.js',
    'TypeScript',
    'Angular 17',
    'TailwindCSS',
    'Redux Toolkit',
    'Vite',
  ],
  backend: [
    'Node.js',
    'REST APIs',
    'Docker',
    'Cloudflare',
  ],
  tools: [
    'Git',
    'Responsive Design',
    'Performance Optimization',
    'Testing (unit & integration basics)',
    'Accessibility Basics',
    'Agile / Scrum',
    'Team Collaboration',
  ],
  familiar: [
    'Firebase',
    'Python',
    'PHP',
    'WordPress',
  ],
}

const skillCategoriesFa: Record<SkillCategoryKey, string[]> = {
  frontend: [
    'React',
    'Next.js',
    'TypeScript',
    'Angular 17',
    'TailwindCSS',
    'Redux Toolkit',
    'Vite',
  ],
  backend: [
    'Node.js',
    'REST API',
    'Docker',
    'Cloudflare',
  ],
  tools: [
    'Git',
    'طراحی واکنش‌گرا',
    'بهینه‌سازی عملکرد',
    'تست (واحد و ساده)',
    'دسترسی‌پذیری پایه',
    'Agile / Scrum',
    'کار تیمی',
  ],
  familiar: [
    'Firebase',
    'Python',
    'PHP',
    'WordPress',
  ],
}

const categoryIcons: Record<SkillCategoryKey, typeof Code2> = {
  frontend: Code2,
  backend: Database,
  tools: Wrench,
  familiar: Code2,
}

const categoryLabels = {
  en: {
    frontend: 'Frontend',
    backend: 'Backend & Infra',
    tools: 'Tools & Practices',
    familiar: 'Also familiar with',
  },
  fa: {
    frontend: 'فرانت‌اند',
    backend: 'بک‌اند و زیرساخت',
    tools: 'ابزارها و روش‌ها',
    familiar: 'آشنایی دارم با',
  },
}

export function AboutSection() {
  const { t, dir, language } = useLanguage()
  const [hasEntered, setHasEntered] = useState(false)

  const skills =
    language === 'fa' ? skillCategoriesFa : skillCategoriesEn
  const labels =
    categoryLabels[(language as 'en' | 'fa') ?? 'en']

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    const el = document.getElementById('about')
    if (el) observer.observe(el)

    return () => observer.disconnect()
  }, [])

  const stats = [
    {
      value: personalInfo.experience,
      label: t('about.experience'),
      icon: Award,
    },
    {
      value: personalInfo.projectsCompleted.toString(),
      label: t('about.projects'),
      icon: Target,
    },
    {
      value: personalInfo.clientsSatisfied.toString(),
      label: t('about.clients'),
      icon: Users,
    },
  ]

  return (
    <section
      id="about"
      dir={dir}
      className="relative min-h-screen flex items-center bg-[#f5f5f5] dark:bg-[#050608] py-20"
    >
      {/* Soft radial accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-gradient-to-br from-purple-300/20 to-transparent dark:from-purple-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-gradient-to-tr from-sky-300/15 to-transparent dark:from-teal-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:gap-16 lg:px-8">
        {/* Left column: title + about + stats */}
        <div
          className={`flex-1 space-y-8 transition-all duration-700 ${
            hasEntered
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
          }`}
        >
          {/* Section label */}
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-neutral-300/60 bg-white/80 px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm dark:border-neutral-700/60 dark:bg-neutral-900/80 dark:text-neutral-200 ${
              dir === 'rtl' ? 'font-sahel' : ''
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-600 dark:text-teal-400" />
            <span>{t('about.subtitle')}</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2
              className={`text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl ${
                dir === 'rtl' ? 'font-sahel' : ''
              }`}
            >
              {t('about.title')}
            </h2>
            <p
              className={`max-w-xl text-sm text-neutral-700 dark:text-neutral-300 sm:text-base ${
                dir === 'rtl' ? 'font-sahel' : ''
              }`}
            >
              {t('about.description')}
            </p>
            <p
              className={`max-w-xl text-sm text-neutral-600 dark:text-neutral-400 sm:text-base ${
                dir === 'rtl' ? 'font-sahel' : ''
              }`}
            >
              {t('about.background')}
            </p>
          </div>

          {/* Profile + stats */}
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="flex justify-center sm:block">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/40 to-sky-500/40 blur-xl" />
                <div className="relative h-24 w-24 overflow-hidden rounded-full border border-white/80 shadow-lg dark:border-neutral-700">
                  <Image
                    src="/photos/me.jpg"
                    alt="Profile"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid flex-1 grid-cols-3 gap-3">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className={`rounded-xl border border-neutral-200 bg-white px-3 py-3 text-center shadow-sm transition-all duration-500 dark:border-neutral-800 dark:bg-neutral-900 ${
                      hasEntered
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${200 + i * 80}ms` }}
                  >
                    <div className="mb-1 flex justify-center">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <div
                      className={`text-sm font-bold text-neutral-900 dark:text-neutral-50 ${
                        dir === 'rtl' ? 'font-sahel' : ''
                      }`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={`mt-0.5 text-[0.7rem] text-neutral-500 dark:text-neutral-400 ${
                        dir === 'rtl' ? 'font-sahel' : ''
                      }`}
                    >
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right column: skills grid */}
        <div
          className={`flex-1 rounded-2xl border border-neutral-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-700 dark:border-neutral-800 dark:bg-neutral-950/90 ${
            hasEntered
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
          }`}
        >
          <h3
            className={`mb-5 text-sm font-semibold tracking-[0.16em] text-neutral-500 dark:text-neutral-400 ${
              dir === 'rtl' ? 'font-sahel text-right' : 'text-left'
            }`}
          >
            {language === 'fa' ? 'مهارت‌ها و تمرکز' : 'SKILLS & FOCUS'}
          </h3>

          <div className="space-y-6">
            {(Object.keys(skills) as SkillCategoryKey[]).map(
              (key, index) => {
                const Icon = categoryIcons[key]
                const items = skills[key]
                return (
                  <div
                    key={key}
                    className={`transition-all duration-500 ${
                      hasEntered
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${250 + index * 120}ms` }}
                  >
                    <div
                      className={`mb-2 flex items-center gap-2 ${
                        dir === 'rtl'
                          ? 'flex-row-reverse text-right'
                          : 'text-left'
                      }`}
                    >
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span
                        className={`text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400 ${
                          dir === 'rtl' ? 'font-sahel' : ''
                        }`}
                      >
                        {labels[key]}
                      </span>
                    </div>
                    <div
                      className={`flex flex-wrap gap-2 ${
                        dir === 'rtl' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${
                            key === 'familiar'
                              ? 'border-neutral-300 bg-neutral-100 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400'
                              : 'border-neutral-300 bg-white text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100'
                          } ${dir === 'rtl' ? 'font-sahel' : ''}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              }
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
