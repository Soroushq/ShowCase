// File: src/app/components/sections/ShowcaseSection.tsx
'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, Eye, X, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { portfolioData, portfolioDataFa } from '@/app/data/portfolio'
import { cn } from '@/app/lib/utils'
import Image from 'next/image'

export function ShowcaseSection() {
  const { language, dir } = useLanguage()
  const [expandedId, setExpandedId] = useState<number | null>(null)
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
      <style jsx>{`
        @keyframes rotate-border {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .rotating-border {
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 12px;
          animation: rotate-border 3s linear infinite;
          z-index: 1;
        }
        
        .rotating-border.light {
          background: conic-gradient(from 0deg, transparent 0deg, rgba(0,0,0,0.3) 10deg, transparent 20deg);
        }
        
        .rotating-border.dark {
          background: conic-gradient(from 0deg, transparent 0deg, rgb(34, 211, 238) 10deg, transparent 20deg);
        }
        
        .image-wrapper {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          overflow: hidden;
        }
      `}</style>

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
            <p
              className={cn(
                'text-sm sm:text-base font-bold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-4',
                dir === 'rtl' && 'font-sahel'
              )}
            >
              {language === 'fa' ? 'نمونه‌کار هام' : 'My projects'}
            </p>
            <h2
              className={cn(
                'text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-neutral-50 leading-tight',
                dir === 'rtl' && 'font-sahel'
              )}
            >
              {language === 'fa' ? 'پروژه‌های منتخب' : 'Featured work'}
            </h2>
          </header>

          {/* Desktop view: click-to-expand with word-by-word title */}
          <div className="hidden lg:block space-y-0">
            {projects.map((project) => {
              const isExpanded = expandedId === project.id
              const words = project.title.split(' ')

              return (
                <div key={project.id} className="group relative">
                  {/* Fade border separator */}
                  <div className="h-px bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent dark:via-neutral-800/40" />

                  {/* Title row - clickable with increased padding (py-7) */}
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={cn(
                      'w-full px-8 py-7 text-left rounded-none transition-all duration-700 ease-in-out',
                      'bg-white/20 dark:bg-neutral-950/20 hover:bg-white/40 dark:hover:bg-neutral-950/40',
                      'border-l-4 border-r-4 border-transparent',
                      isExpanded && 'border-l-neutral-900 border-r-neutral-900 dark:border-l-cyan-400 dark:border-r-cyan-400 bg-white/30 dark:bg-neutral-950/50'
                    )}
                  >
                    <div className="flex items-center justify-between gap-6">
                      {/* Word-by-word title with first word always visible */}
                      <div className="flex flex-wrap gap-2 flex-1">
                        {words.map((word, i) => (
                          <span
                            key={`${project.id}-word-${i}`}
                            className={cn(
                              'text-2xl lg:text-3xl xl:text-4xl font-black transition-all duration-700 ease-in-out',
                              dir === 'rtl' && 'font-sahel',
                              isExpanded
                                ? 'text-neutral-900 dark:text-cyan-300 opacity-100 translate-y-0'
                                : 'text-neutral-900 dark:text-neutral-50 opacity-100 translate-y-0',
                              // Hide all words except first when collapsed
                              !isExpanded && i > 0 && 'opacity-0 -translate-y-2'
                            )}
                            style={{
                              transitionDelay: isExpanded ? `${100 + i * 50}ms` : '0ms'
                            }}
                          >
                            {word}
                          </span>
                        ))}
                      </div>

                      <ChevronDown
                        className={cn(
                          'w-5 h-5 flex-shrink-0 text-neutral-400 dark:text-neutral-600 transition-all duration-700 ease-in-out',
                          isExpanded && 'text-neutral-900 dark:text-cyan-300 rotate-180'
                        )}
                      />
                    </div>
                  </button>

                  {/* Expanded content - flows naturally */}
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-700 ease-in-out',
                      isExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <div className="px-8 py-8 space-y-6 border-l-4 border-r-4 border-neutral-300/60 dark:border-neutral-700/80 bg-white/40 dark:bg-neutral-950/40">
                      <div className="grid grid-cols-3 gap-8">
                        {/* Left: Description + Tech + Buttons */}
                        <div className="col-span-2 space-y-5">
                          {/* Description */}
                          <div
                            style={{
                              opacity: isExpanded ? 1 : 0,
                              transform: isExpanded ? 'translateY(0)' : 'translateY(8px)',
                              transitionDuration: '700ms',
                              transitionDelay: isExpanded ? '100ms' : '0ms',
                              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                          >
                            <p
                              className={cn(
                                'text-base lg:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed',
                                dir === 'rtl' && 'font-sahel text-right'
                              )}
                            >
                              {project.description}
                            </p>
                          </div>

                          {/* Tech tags */}
                          <div
                            className={cn(
                              'flex flex-wrap gap-2',
                              dir === 'rtl' && 'justify-end'
                            )}
                            style={{
                              opacity: isExpanded ? 1 : 0,
                              transform: isExpanded ? 'translateY(0)' : 'translateY(8px)',
                              transitionDuration: '700ms',
                              transitionDelay: isExpanded ? '200ms' : '0ms',
                              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                          >
                            {project.technologies.slice(0, 5).map((tech) => (
                              <span
                                key={tech}
                                className={cn(
                                  'px-3 py-1.5 text-xs font-medium rounded-full',
                                  'border border-neutral-300/70 dark:border-neutral-700/80',
                                  'bg-white/70 dark:bg-neutral-900/70',
                                  'text-neutral-600 dark:text-neutral-200',
                                  'transition-all duration-300 hover:border-neutral-900 dark:hover:border-cyan-400'
                                )}
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 5 && (
                              <span className="px-3 py-1.5 text-xs font-medium text-neutral-400 dark:text-neutral-500">
                                +{project.technologies.length - 5}
                              </span>
                            )}
                          </div>

                          {/* Buttons */}
                          <div
                            className={cn(
                              'flex items-center gap-4 pt-2',
                              dir === 'rtl' && 'flex-row-reverse'
                            )}
                            style={{
                              opacity: isExpanded ? 1 : 0,
                              transform: isExpanded ? 'translateY(0)' : 'translateY(8px)',
                              transitionDuration: '700ms',
                              transitionDelay: isExpanded ? '300ms' : '0ms',
                              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setPreviewUrl(project.url)
                              }}
                              className={cn(
                                'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm',
                                'border-2 border-neutral-300 dark:border-neutral-700',
                                'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200',
                                'hover:border-neutral-900 dark:hover:border-cyan-400',
                                'hover:text-neutral-900 dark:hover:text-cyan-300',
                                'transition-all duration-300'
                              )}
                            >
                              <Eye className="w-4 h-4" />
                              {language === 'fa' ? 'پیش‌نمایش' : 'Preview'}
                            </button>

                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm',
                                'border-2 border-neutral-900 dark:border-cyan-400',
                                'bg-neutral-900 dark:bg-cyan-400 text-white dark:text-black',
                                'hover:bg-black dark:hover:bg-cyan-300',
                                'transition-all duration-300'
                              )}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-4 h-4" />
                              {language === 'fa' ? 'مشاهده لایو' : 'Live'}
                            </a>
                          </div>
                        </div>

                        {/* Right: Image with animated border beam */}
                        <div
                          className="col-span-1"
                          style={{
                            opacity: isExpanded ? 1 : 0,
                            transform: isExpanded ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(12px)',
                            transitionDuration: '700ms',
                            transitionDelay: isExpanded ? '400ms' : '0ms',
                            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                          }}
                        >
                          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                            {/* Animated border beam - only when expanded */}
                            {isExpanded && (
                              <>
                                {/* Rotating border beam */}
                                <div className="absolute -inset-1 z-0">
                                  <div className="rotating-border light dark:hidden" />
                                  <div className="rotating-border dark dark:block" />
                                </div>
                                
                                {/* Inner border */}
                                <div className="absolute inset-[2px] rounded-lg bg-white dark:bg-neutral-950 z-10" />
                              </>
                            )}

                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-105 relative z-20"
                              sizes="300px"
                              unoptimized={project.image.startsWith('http')}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent pointer-events-none z-30" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            {/* Final border */}
            <div className="h-px bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent dark:via-neutral-800/40" />
          </div>

          {/* Mobile view: click-to-expand */}
          <div className="lg:hidden space-y-3">
            {projects.map((project) => {
              const isExpanded = expandedId === project.id

              return (
                <div key={project.id} className="group relative">
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    className={cn(
                      'w-full px-5 py-4 sm:py-5 rounded-lg border-2 transition-all duration-700 ease-in-out text-left',
                      'flex items-center justify-between gap-4',
                      isExpanded
                        ? 'border-neutral-900 dark:border-cyan-400 bg-white/50 dark:bg-neutral-950/50'
                        : 'border-neutral-200/50 dark:border-neutral-800/50 bg-white/30 dark:bg-neutral-950/20 hover:border-neutral-300 dark:hover:border-neutral-700'
                    )}
                  >
                    <h3
                      className={cn(
                        'text-lg sm:text-xl font-black text-neutral-900 dark:text-neutral-50 flex-1 transition-colors duration-700 ease-in-out',
                        dir === 'rtl' && 'font-sahel',
                        isExpanded && 'dark:text-cyan-300'
                      )}
                    >
                      {project.title}
                    </h3>

                    <ChevronDown
                      className={cn(
                        'w-5 h-5 flex-shrink-0 text-neutral-400 dark:text-neutral-600 transition-all duration-700 ease-in-out',
                        isExpanded && 'text-neutral-900 dark:text-cyan-300 rotate-180'
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-700 ease-in-out',
                      isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <div className="px-5 py-5 sm:py-6 space-y-4 sm:space-y-5 border-t-2 border-neutral-200/50 dark:border-neutral-800/50">
                      <div
                        style={{
                          opacity: isExpanded ? 1 : 0,
                          transform: isExpanded ? 'translateY(0)' : 'translateY(8px)',
                          transitionDuration: '700ms',
                          transitionDelay: isExpanded ? '100ms' : '0ms',
                          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                      >
                        <p
                          className={cn(
                            'text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed',
                            dir === 'rtl' && 'font-sahel text-right'
                          )}
                        >
                          {project.description}
                        </p>
                      </div>

                      <div
                        style={{
                          opacity: isExpanded ? 1 : 0,
                          transform: isExpanded ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(12px)',
                          transitionDuration: '700ms',
                          transitionDelay: isExpanded ? '200ms' : '0ms',
                          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                      >
                        <div className="relative w-full aspect-[16/9] rounded-lg border-2 border-neutral-200/60 dark:border-neutral-700/60 overflow-hidden shadow-md">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            sizes="100vw"
                            unoptimized={project.image.startsWith('http')}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent pointer-events-none" />
                        </div>
                      </div>

                      <div
                        className={cn(
                          'flex flex-wrap gap-2',
                          dir === 'rtl' && 'justify-end'
                        )}
                        style={{
                          opacity: isExpanded ? 1 : 0,
                          transform: isExpanded ? 'translateY(0)' : 'translateY(8px)',
                          transitionDuration: '700ms',
                          transitionDelay: isExpanded ? '300ms' : '0ms',
                          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                      >
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-medium rounded-full border border-neutral-200/70 dark:border-neutral-700/80 bg-white/70 dark:bg-neutral-950/70 text-neutral-600 dark:text-neutral-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2.5 py-1 text-xs font-medium text-neutral-400 dark:text-neutral-500">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      <div
                        className={cn(
                          'flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2',
                          dir === 'rtl' && 'sm:flex-row-reverse'
                        )}
                        style={{
                          opacity: isExpanded ? 1 : 0,
                          transform: isExpanded ? 'translateY(0)' : 'translateY(8px)',
                          transitionDuration: '700ms',
                          transitionDelay: isExpanded ? '400ms' : '0ms',
                          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setPreviewUrl(project.url)
                          }}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 hover:border-neutral-900 dark:hover:border-cyan-400 hover:text-neutral-900 dark:hover:text-cyan-300 text-sm font-bold transition-all flex-1 sm:flex-none"
                        >
                          <Eye className="w-4 h-4" />
                          <span>{language === 'fa' ? 'پیش‌نمایش' : 'Preview'}</span>
                        </button>

                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-neutral-900 dark:border-cyan-400 bg-neutral-900 hover:bg-black dark:bg-cyan-400 dark:hover:bg-cyan-300 text-white dark:text-black text-sm font-bold transition-all flex-1 sm:flex-none"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{language === 'fa' ? 'مشاهده لایو' : 'Live'}</span>
                        </a>
                      </div>
                    </div>
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
