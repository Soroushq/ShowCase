// File: src/app/components/sections/AboutSection.tsx
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { useScrollAnimation, useParallax } from '@/app/hooks/useScrollAnimation'
import { skills, personalInfo } from '@/app/data/portfolio'
import { Award, Target, Users, TrendingUp } from 'lucide-react'
import Image from 'next/image'

type AnimatedMap = Record<string, number>

export function AboutSection() {
  const { t, dir } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()
  const [animatedSkills, setAnimatedSkills] = useState<AnimatedMap>({})
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const scrollY = useParallax()

  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 30,
          y: (e.clientY - rect.top - rect.height / 2) / 30,
        })
      })
    }
    el.addEventListener('mousemove', onMove)
    return () => {
      el.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  // ✅ Slower animation start: 800ms delay
  useEffect(() => {
    if (!isVisible) return
    const timer = setTimeout(() => {
      const next: AnimatedMap = {}
      for (const skill of skills) next[skill.name] = skill.level
      setAnimatedSkills(next)
    }, 800) // Changed from 300ms to 800ms
    return () => clearTimeout(timer)
  }, [isVisible])

  const stats = useMemo(
    () => [
      {
        key: 'experience',
        value: personalInfo.experience,
        label: t('about.experience'),
        icon: Award,
        lightColor: 'from-purple-500 to-purple-600',
        darkColor: 'dark:from-green-400 dark:to-green-500',
      },
      {
        key: 'projects',
        value: personalInfo.projectsCompleted.toString(),
        label: t('about.projects'),
        icon: Target,
        lightColor: 'from-blue-500 to-blue-600',
        darkColor: 'dark:from-teal-400 dark:to-teal-500',
      },
      {
        key: 'clients',
        value: personalInfo.clientsSatisfied.toString(),
        label: t('about.clients'),
        icon: Users,
        lightColor: 'from-emerald-500 to-emerald-600',
        darkColor: 'dark:from-lime-400 dark:to-lime-500',
      },
    ],
    [t]
  )

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
      dir={dir}
    >
      {/* Lightweight gradient on mobile */}
      <div className="absolute inset-0 sm:hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/60 to-transparent dark:from-gray-800/70" />
      </div>

      {/* Background Image with Wave Mask - Light Mode */}
      <div className="absolute inset-0 hidden sm:block dark:opacity-0 opacity-100 transition-opacity duration-500">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{
            backgroundImage: 'url(/photos/w-abstract-2.jpg)',
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
            <defs>
              <mask id="wave-mask-light">
                <rect width="100%" height="100%" fill="white" />
                <path d="M0,200 Q300,50 600,200 T1200,200 L1200,0 L0,0 Z" fill="black" />
                <path d="M0,600 Q300,450 600,600 T1200,600 L1200,800 L0,800 Z" fill="black" />
                <ellipse cx="300" cy="400" rx="200" ry="150" fill="black" opacity="0.3" />
                <ellipse cx="900" cy="300" rx="150" ry="100" fill="black" opacity="0.2" />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="white" mask="url(#wave-mask-light)" opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* Background Image - Dark Mode */}
      <div className="absolute inset-0 hidden sm:block opacity-0 dark:opacity-100 transition-opacity duration-500">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{
            backgroundImage: 'url(/photos/d-abstract-1.jpg)',
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
            <defs>
              <mask id="wave-mask-dark">
                <rect width="100%" height="100%" fill="white" />
                <path d="M0,200 Q300,50 600,200 T1200,200 L1200,0 L0,0 Z" fill="black" />
                <path d="M0,600 Q300,450 600,600 T1200,600 L1200,800 L0,800 Z" fill="black" />
                <ellipse cx="300" cy="400" rx="200" ry="150" fill="black" opacity="0.4" />
                <ellipse cx="900" cy="300" rx="150" ry="100" fill="black" opacity="0.3" />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="#111827" mask="url(#wave-mask-dark)" opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div
          className="absolute top-1/4 right-1/4 w-72 lg:w-96 h-72 lg:h-96 rounded-full transition-colors duration-500"
          style={{
            transform: `translateY(${scrollY * 0.2}px) translateX(${mousePosition.x}px)`,
            background: 'radial-gradient(closest-side, rgba(147,51,234,0.12), rgba(147,51,234,0) 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-56 lg:w-72 h-56 lg:h-72 rounded-full transition-colors duration-500"
          style={{
            transform: `translateY(${scrollY * -0.15}px) translateX(${mousePosition.x * -0.5}px)`,
            background: 'radial-gradient(closest-side, rgba(59,130,246,0.10), rgba(59,130,246,0) 70%)',
            filter: 'blur(64px)',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 section-padding container-width">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center space-y-4 sm:space-y-6 transition-all duration-700 motion-safe:duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/80 dark:bg-gray-800/80 sm:backdrop-blur-sm rounded-full border border-purple-200/50 dark:border-green-700/30 shadow transition-colors duration-500">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-green-400 transition-colors duration-500" />
            <span className={`text-[0.82rem] sm:text-sm font-semibold text-purple-700 dark:text-green-300 transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
              {t('about.subtitle')}
            </span>
          </div>

          <h2 className={`font-black tracking-tight ${dir === 'rtl' ? 'font-sahel' : ''}`}>
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent transition-colors duration-500">
              {t('about.title')}
            </span>
          </h2>
        </div>

        {/* Profile */}
        <div className={`mt-8 sm:mt-10 flex justify-center transition-all motion-safe:duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative group">
            <div className="absolute -inset-3 sm:-inset-4 rounded-full opacity-30 group-hover:opacity-50 transition-all motion-safe:duration-500" />
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden border-3 sm:border-4 border-white/50 dark:border-gray-700/50 shadow-xl">
              <Image
                src="/photos/me.jpg"
                alt="Profile Photo"
                width={200}
                height={200}
                className="w-full h-full object-cover transition-transform motion-safe:duration-500 group-hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Left: About + Stats */}
          <div className={`space-y-8 transition-all motion-safe:duration-700 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${dir === 'rtl' ? 'translate-x-6' : '-translate-x-6'}`}`}>
            <div className="rounded-2xl p-6 sm:p-8 border border-white/30 dark:border-white/10 shadow-xl bg-white/70 dark:bg-black/20 sm:backdrop-blur-md">
              <div className={`space-y-4 sm:space-y-6 leading-relaxed ${dir === 'rtl' ? 'font-sahel text-right' : ''}`}>
                <p className="text-gray-700 dark:text-gray-300 transition-colors duration-500">
                  {t('about.description')}
                </p>
                <p className="text-gray-600 dark:text-gray-400 transition-colors duration-500">
                  {t('about.background')}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-5">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.key}
                    className={`group relative overflow-hidden rounded-xl p-4 sm:p-5 border border-white/30 dark:border-white/10 shadow bg-white/70 dark:bg-black/20 sm:backdrop-blur-md transition-all motion-safe:duration-500 md:hover:shadow-lg md:hover:scale-[1.02] ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${200 + index * 120}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.lightColor} ${stat.darkColor} opacity-0 group-hover:opacity-10 transition-opacity motion-safe:duration-500 rounded-xl`} />
                    <div className="flex justify-center mb-2">
                      <div className={`p-2.5 rounded-lg bg-gradient-to-br ${stat.lightColor} ${stat.darkColor} shadow`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                    </div>
                    <div className={`text-base sm:text-xl font-black text-gray-900 dark:text-white text-center ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                      {stat.value}
                    </div>
                    <div className={`mt-1 text-[0.72rem] sm:text-xs text-gray-600 dark:text-gray-400 text-center font-medium ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Skills */}
          <div className={`transition-all motion-safe:duration-700 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${dir === 'rtl' ? '-translate-x-6' : 'translate-x-6'}`}`}>
            <div className="rounded-2xl p-6 sm:p-8 border border-white/30 dark:border-white/10 shadow-xl bg-white/70 dark:bg-black/20 sm:backdrop-blur-md">
              <h3 className={`text-base sm:text-lg lg:text-xl font-black text-gray-900 dark:text-white mb-6 sm:mb-8 ${dir === 'rtl' ? 'font-sahel text-right' : ''}`}>
                {t('about.skills')}
              </h3>

              <div className="space-y-6 sm:space-y-7">
                {skills.map((skill, index) => {
                  const val = animatedSkills[skill.name] || 0
                  return (
                    <div
                      key={skill.name}
                      className={`isolate transition-all motion-safe:duration-500 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                      }`}
                      style={{ transitionDelay: `${300 + index * 90}ms` }}
                    >
                      <div className={`flex items-center justify-between gap-2 flex-wrap ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center gap-2 min-w-0 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                          <span className={`truncate text-sm sm:text-[0.95rem] font-bold text-gray-900 dark:text-white ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                            {skill.name}
                          </span>
                          <span className={`hidden xs:inline-block text-[0.7rem] sm:text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                            {skill.category}
                          </span>
                        </div>
                        <span className={`shrink-0 px-2.5 py-1 rounded-full text-[0.72rem] sm:text-xs font-bold bg-purple-100 dark:bg-green-900/30 text-purple-700 dark:text-green-300 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                          {val}%
                        </span>
                      </div>

                      {/* ✅ Slower progress bar animation: 1400ms */}
                      <div className="relative mt-2">
                        <div
                          className="relative w-full h-2 sm:h-2.5 bg-gray-200/60 dark:bg-gray-700/30 rounded-full overflow-hidden"
                          role="progressbar"
                          aria-valuenow={val}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={skill.name}
                        >
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 dark:from-green-400 dark:via-green-500 dark:to-green-600 transition-all ease-out duration-[1400ms]"
                            style={{ width: `${val}%` }}
                          />
                        </div>
                        <div className="xs:hidden mt-2">
                          <span className={`text-[0.7rem] px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                            {skill.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="pb-[clamp(2.5rem,2rem+2vw,4rem)]" />
      </div>
    </section>
  )
}
