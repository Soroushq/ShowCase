// File: src/app/components/sections/ShowcaseSection.tsx
'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, Eye, X } from 'lucide-react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { portfolioData, portfolioDataFa } from '@/app/data/portfolio'
import { cn } from '@/app/lib/utils'
import Image from 'next/image'

export function ShowcaseSection() {
  const { language, dir } = useLanguage()
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const projects = language === 'fa' ? portfolioDataFa : portfolioData

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    const section = document.getElementById('showcase')
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!previewUrl) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewUrl(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [previewUrl])

  return (
    <>
      <section
        id="showcase"
        className="relative bg-[#f8f9fa] dark:bg-[#050608] border-t border-neutral-200/60 dark:border-neutral-800/60"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb40_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f293740_1px,transparent_1px)] bg-[size:32px_100%]" />

        <div
          dir={dir}
          className={cn(
            'relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24',
            isVisible ? 'opacity-100' : 'opacity-0',
            'transition-opacity duration-700'
          )}
        >
          {/* Top title */}
          <header className="mb-12 sm:mb-16 text-center">
            <p className={cn(
              'text-sm sm:text-base font-bold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-4',
              dir === 'rtl' && 'font-sahel'
            )}>
              {language === 'fa' ? 'نمونه‌کار هام' : 'My projects'}
            </p>
            <h2 className={cn(
              'text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-neutral-50 leading-tight',
              dir === 'rtl' && 'font-sahel'
            )}>
              {language === 'fa' ? 'پروژه‌های منتخب' : 'Featured work'}
            </h2>
          </header>

          {/* Projects stack */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            {projects.map((project) => {
              const isHovered = hoveredId === project.id

              return (
                <div
                  key={project.id}
                  className={cn(
                    'group relative overflow-hidden rounded-xl border border-neutral-200/30 dark:border-neutral-800/30',
                    'hover:border-neutral-300 dark:hover:border-neutral-700/60',
                    'hover:bg-white/40 dark:hover:bg-neutral-950/40',
                    'transition-all duration-500 ease-out shadow-sm hover:shadow-lg',
                    isHovered ? 'py-8 sm:py-10 lg:py-12 min-h-[320px]' : 'py-4 sm:py-6 min-h-[88px]'
                  )}
                >
                  {/* Hover trigger - ONLY on main content, not borders */}
                  <div
                    className="px-6 sm:px-8 lg:px-12 h-full cursor-pointer relative z-10"
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-end lg:gap-8 h-full">
                      {/* LEFT: Title + expandable content */}
                      <div className="lg:w-2/3 flex-1">
                        {/* Title - ALWAYS VISIBLE & BIG */}
                        <h3 className={cn(
                          'text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-neutral-50 mb-3 lg:mb-6 leading-tight',
                          dir === 'rtl' && 'font-sahel',
                          isHovered && 'dark:text-cyan-400'
                        )}>
                          {project.title}
                        </h3>

                        {/* Description - HIDDEN until hover - ALL DEVICES */}
                        <div className={cn(
                          'max-h-0 overflow-hidden opacity-0 -translate-y-2 transition-all duration-500 ease-out lg:max-h-20 lg:opacity-50 lg:translate-y-0 lg:mb-6',
                          isHovered && '!max-h-32 !opacity-100 !translate-y-0'
                        )}>
                          <p className={cn(
                            'text-base lg:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed',
                            dir === 'rtl' && 'font-sahel text-right'
                          )}>
                            {project.description}
                          </p>
                        </div>

                        {/* Tech stack - HIDDEN until hover - ALL DEVICES */}
                        <div className={cn(
                          'max-h-0 opacity-0 -translate-y-2 transition-all duration-500 ease-out lg:max-h-16 lg:opacity-50 lg:translate-y-0 lg:flex lg:flex-wrap lg:gap-2 lg:mb-6',
                          isHovered && '!max-h-20 !opacity-100 !translate-y-0 flex flex-wrap gap-2'
                        )}>
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 text-sm font-medium rounded-full border border-neutral-200/60 dark:border-neutral-700/70 bg-white/70 dark:bg-neutral-950/70 text-neutral-600 dark:text-neutral-200"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-3 py-1.5 text-sm font-medium text-neutral-400 dark:text-neutral-500">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Buttons - HIDDEN until hover - ALL DEVICES */}
                        <div className={cn(
                          'max-h-0 opacity-0 -translate-y-2 transition-all duration-500 ease-out lg:max-h-14 lg:opacity-50 lg:translate-y-0 lg:flex lg:items-center lg:gap-4',
                          isHovered && '!max-h-16 !opacity-100 !translate-y-0 flex items-center gap-4'
                        )}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setPreviewUrl(project.url)
                            }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 hover:border-neutral-900 dark:hover:border-cyan-400 hover:text-neutral-900 dark:hover:text-cyan-300 text-sm font-bold transition-all shadow-sm hover:shadow-md"
                          >
                            <Eye className="w-4 h-4" />
                            <span>{language === 'fa' ? 'پیش‌نمایش' : 'Preview'}</span>
                          </button>

                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-neutral-900 dark:border-cyan-400 bg-neutral-900 hover:bg-black dark:bg-cyan-400 dark:hover:bg-cyan-300 text-white dark:text-black text-sm font-bold transition-all shadow-sm hover:shadow-md"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>{language === 'fa' ? 'مشاهده لایو' : 'Live'}</span>
                          </a>
                        </div>
                      </div>

                      {/* RIGHT: Image - HIDDEN until hover - ALL DEVICES */}
                      <div className="lg:w-1/3 mt-6 lg:mt-0 lg:ml-auto">
                        <div className={cn(
                          'relative w-full aspect-[16/9] rounded-2xl border-2 border-transparent bg-neutral-100 dark:bg-neutral-900 overflow-hidden transition-all duration-500 ease-out opacity-0 scale-95 -translate-y-4 lg:opacity-30 lg:scale-100 lg:translate-y-0',
                          isHovered && 'opacity-100 !scale-100 !translate-y-0 !border-neutral-200/60 dark:!border-cyan-500/60 shadow-2xl'
                        )}>
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                            sizes="400px"
                            unoptimized={project.image.startsWith('http')}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent line - FIXED position */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-200/40 dark:bg-neutral-800/40 mx-6 sm:mx-8 lg:mx-12 overflow-hidden rounded-full">
                    <div className={cn(
                      'h-full bg-gradient-to-r from-neutral-900 via-cyan-500 dark:from-cyan-400 w-0 transition-all duration-700 ease-out origin-left',
                      isHovered && 'w-full',
                      dir === 'rtl' && 'origin-right'
                    )} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Preview modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="relative w-full max-w-6xl h-[85vh] bg-neutral-950 border-2 border-neutral-800/80 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute top-6 right-6 z-10 flex items-center justify-center w-12 h-12 rounded-2xl border-2 border-neutral-700 bg-neutral-900/95 backdrop-blur-sm text-neutral-200 hover:bg-neutral-800 transition-all shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-neutral-700 bg-neutral-100/95 dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-100 hover:bg-white dark:hover:bg-neutral-800 backdrop-blur-sm text-sm font-bold transition-all shadow-lg"
            >
              <ExternalLink className="w-4 h-4" />
              {language === 'fa' ? 'باز کردن در تب جدید' : 'Open in new tab'}
            </a>

            <iframe
              src={previewUrl}
              className="w-full h-full border-0"
              title="Project preview"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>
      )}
    </>
  )
}
