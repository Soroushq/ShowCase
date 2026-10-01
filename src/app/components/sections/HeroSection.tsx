// File: src/app/components/sections/HeroSection.tsx
'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/app/components/ui/Button'
import { Github, Linkedin, Mail, ArrowRight, Terminal, Clapperboard } from 'lucide-react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { scrollToElement } from '@/app/lib/utils'
import { personalInfo } from '@/app/data/portfolio'

export function HeroSection() {
  const { dir, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const triggerReplayIntro = () => {
    window.dispatchEvent(new CustomEvent('replay-marvel-intro'))
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const nameDisplay = language === 'fa' ? 'سروش' : 'SOROUSH'
  const surnameDisplay = language === 'fa' ? 'قاری' : 'Qary'
  
  const shortDescription = language === 'fa' 
    ? 'معمار نرم‌افزار، توسعه‌دهنده وب و مخترع ثبت‌شده. برای جزئیات نگه دارید.'
    : 'Full-Stack Architect, Web Engineer & Patented Inventor. Hover for specs.'

  // Structured data for the description to allow specific highlighting
  const descriptionContent = [
    { text: "I architect modern digital platforms that are ", highlight: false },
    { text: "blazing fast", highlight: true },
    { text: ", privacy-first, and deeply human.", highlight: false },
    { break: true },
    { text: "• Innovation: ", highlight: false },
    { text: "Officially Patented E-Commerce Engine (#114350)", highlight: true },
    { break: true },
    { text: "• Front-end & PWA: ", highlight: false },
    { text: "React, Next.js 15, Angular & TypeScript", highlight: true },
    { break: true },
    { text: "• Back-end & Infra: ", highlight: false },
    { text: "Node.js, Docker, VPS, Cloudflare & Offline-First Systems", highlight: true }
  ]
  
  // Farsi version
  const descriptionContentFa = [
    { text: "طراحی و توسعه پلتفرم‌های دیجیتال مدرن، ", highlight: false },
    { text: "فوق‌سریع", highlight: true },
    { text: "، امن و متعهد به حریم خصوصی.", highlight: false },
    { break: true },
    { text: "• نوآوری و ثبت اختراع: ", highlight: false },
    { text: "سازوکار ثبت‌شده تجارت الکترونیک (شماره ثبت ۱۱۴۳۵۰)", highlight: true },
    { break: true },
    { text: "• فرانت‌اند و وب‌اپلیکیشن: ", highlight: false },
    { text: "React، Next.js 15، Angular و TypeScript", highlight: true },
    { break: true },
    { text: "• بک‌اند و زیرساخت: ", highlight: false },
    { text: "Node.js، داکر، سرورهای VPS و سیستم‌های آفلاین‌محور", highlight: true }
  ]

  const activeContent = language === 'fa' ? descriptionContentFa : descriptionContent

  return (
    <section
      id="hero"
      dir={dir}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8f9fa] dark:bg-[#050608] transition-colors duration-500 px-6"
    >
      {/* Grid Background (Gaming/Tech Vibe) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
        
        {/* Status Pill & Cinematic Marvel Intro Trigger */}
        <div
          className={`mb-10 flex flex-wrap items-center justify-center gap-3 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
            </span>
            <span className={`text-[11px] font-bold tracking-widest uppercase text-neutral-600 dark:text-cyan-400 ${language === 'fa' ? 'font-sahel' : ''}`}>
              {language === 'fa' ? 'آماده پروژه' : 'ONLINE / AVAILABLE'}
            </span>
          </div>

          <button
            type="button"
            onClick={triggerReplayIntro}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-[11px] font-bold tracking-wider uppercase transition-all duration-200 hover:scale-105 shadow-sm cursor-pointer"
            title="Watch Animatic Intro"
          >
            <Clapperboard className="w-3.5 h-3.5" />
            <span className={language === 'fa' ? 'font-sahel' : ''}>
              {language === 'fa' ? 'اینترو انیماتیک' : 'ANIMATIC INTRO'}
            </span>
          </button>
        </div>

        {/* Massive Name */}
        <h1
          className={`relative mb-6 transition-all duration-1000 delay-100 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col items-center leading-[0.85] tracking-tighter select-none drop-shadow-2xl">
            <span className={`text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black text-neutral-900 dark:text-white ${language === 'fa' ? 'font-sahel tracking-normal' : ''}`}>
              {nameDisplay}
            </span>
            <span className={`text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black text-neutral-300 dark:text-neutral-800 ${language === 'fa' ? 'font-sahel tracking-normal text-5xl sm:text-7xl' : ''}`}>
              {surnameDisplay}
            </span>
          </div>
        </h1>

        {/* Tech Roles - Monochromatic */}
        <h2
          className={`mb-12 text-lg sm:text-xl md:text-2xl font-medium tracking-wide text-neutral-600 dark:text-neutral-400 transition-all duration-1000 delay-200 ease-out flex flex-wrap justify-center items-center gap-x-4 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${language === 'fa' ? 'font-sahel' : ''}`}
        >
          <span>{language === 'fa' ? 'معمار فول‌استک' : 'Full-Stack Architect'}</span>
          <span className="text-neutral-300 dark:text-neutral-700 text-sm">/</span>
          <span className="text-neutral-900 dark:text-cyan-400 font-semibold">{language === 'fa' ? 'مخترع رسمی' : 'Patented Inventor'}</span>
          <span className="text-neutral-300 dark:text-neutral-700 text-sm">/</span>
          <span>{language === 'fa' ? 'متخصص Next.js' : 'Next.js Specialist'}</span>
          <span className="text-neutral-300 dark:text-neutral-700 text-sm">/</span>
          <span>{language === 'fa' ? 'طراح محصول' : 'Product Builder'}</span>
        </h2>

        {/* Interactive Description - The "HUD" Effect */}
        <div 
          className={`relative w-full max-w-3xl mx-auto mb-16 group cursor-default transition-all duration-500 ease-out min-h-[140px] flex items-center justify-center ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Short Note (Default) */}
          <div 
            className={`absolute inset-0 w-full flex items-center justify-center transition-all duration-500 ${
              isHovered ? 'opacity-0 scale-95 blur-sm pointer-events-none' : 'opacity-100 scale-100 delay-200'
            }`}
          >
            <p className={`text-sm sm:text-base font-mono text-neutral-400 dark:text-neutral-500 flex items-center gap-2 ${language === 'fa' ? 'font-sahel' : ''}`}>
              <Terminal className="w-4 h-4" />
              {shortDescription}
            </p>
          </div>

          {/* Full Specs (Hover) */}
          <div 
            className={`relative z-10 text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 transition-all duration-500 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            } ${language === 'fa' ? 'font-sahel text-right' : 'text-left'}`}
          >
            <div className="bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-2xl">
              {activeContent.map((item, i) => (
                item.break ? (
                  <br key={i} />
                ) : (
                  <span 
                    key={i}
                    className={`${
                      item.highlight 
                        ? 'text-black dark:text-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]' 
                        : ''
                    }`}
                  >
                    {item.text}
                  </span>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-6 transition-all duration-1000 delay-500 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Button
            onClick={() => scrollToElement('showcase')}
            className={`h-14 px-10 rounded-none skew-x-[-10deg] bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-cyan-400 dark:hover:text-black text-white dark:text-black font-bold text-sm tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] border border-transparent ${language === 'fa' ? 'font-sahel' : ''}`}
          >
            <span className="skew-x-[10deg] inline-flex items-center gap-2">
              {language === 'fa' ? 'دیدن پروژه‌ها' : 'VIEW PROJECTS'}
              <ArrowRight className={`w-4 h-4 ${language === 'fa' ? 'rotate-180' : ''}`} />
            </span>
          </Button>

          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: personalInfo.github, label: 'GitHub' },
              { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' }
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-neutral-900 dark:hover:border-cyan-400 hover:text-neutral-900 dark:hover:text-cyan-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
