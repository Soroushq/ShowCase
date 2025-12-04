// File: src/app/components/sections/ShowcaseSection.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/Card'
import { buttonVariants } from '@/app/components/ui/Button'
import { ExternalLink, Code, Eye, Sparkles, X } from 'lucide-react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { useScrollAnimation, useParallax } from '@/app/hooks/useScrollAnimation'
import { portfolioData, portfolioDataFa } from '@/app/data/portfolio'
import { cn } from '@/app/lib/utils'
import Image from "next/image"

export function ShowcaseSection() {
  const { t, dir, language } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const scrollY = useParallax()

  const projects = language === 'fa' ? portfolioDataFa : portfolioData

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 40,
          y: (e.clientY - rect.top - rect.height / 2) / 40
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [ref])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewUrl(null)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      <section id="showcase" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        
        {/* Light Mode Background */}
        <div className="absolute inset-0 dark:opacity-0 opacity-100 transition-opacity duration-500">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/photos/w-abstract.jpg)',
              transform: `translateY(${scrollY * 0.08}px) translateX(${mousePosition.x * 0.3}px)`,
            }}
          />
          <div className="absolute inset-0 bg-white/65">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
              <defs>
                <mask id="wave-mask-showcase">
                  <rect width="100%" height="100%" fill="white"/>
                  <path d="M0,150 Q300,50 600,150 T1200,150 L1200,0 L0,0 Z" fill="black" />
                  <path d="M0,650 Q300,550 600,650 T1200,650 L1200,800 L0,800 Z" fill="black" />
                  <ellipse cx="200" cy="300" rx="180" ry="120" fill="black" opacity="0.4"/>
                  <ellipse cx="800" cy="500" rx="200" ry="150" fill="black" opacity="0.3"/>
                  <ellipse cx="1000" cy="200" rx="150" ry="100" fill="black" opacity="0.35"/>
                </mask>
              </defs>
              <rect width="100%" height="100%" fill="white" mask="url(#wave-mask-showcase)" opacity="0.85"/>
            </svg>
          </div>
        </div>

        {/* Dark Mode Background */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="absolute inset-0">
              <div 
                className="absolute top-1/5 left-1/5 w-72 lg:w-96 h-72 lg:h-96 bg-gradient-to-r from-teal-400/15 to-teal-600/8 rounded-full blur-3xl"
                style={{ 
                  transform: `translateY(${scrollY * 0.25}px) translateX(${mousePosition.x}px)`,
                  filter: 'blur(100px)'
                }}
              />
              <div 
                className="absolute bottom-1/4 right-1/5 w-64 lg:w-80 h-64 lg:h-80 bg-gradient-to-l from-green-500/12 to-green-300/6 rounded-full blur-2xl"
                style={{ 
                  transform: `translateY(${scrollY * -0.18}px) translateX(${mousePosition.x * -0.6}px)`,
                  filter: 'blur(90px)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <div className="w-full h-full grid-pattern" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 py-12 sm:py-16" dir={dir}>
          <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
            
            {/* Section Header */}
            <div
              ref={ref}
              className={`text-center space-y-4 sm:space-y-5 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-50/90 dark:bg-teal-900/40 backdrop-blur-sm rounded-full border border-blue-200/60 dark:border-teal-700/40 shadow-lg">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-teal-400" />
                <span className={`text-xs sm:text-sm font-semibold text-blue-700 dark:text-teal-300 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                  {t('projects')}
                </span>
              </div>
              
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                  {language === 'fa' ? 'نمونه‌کارهای برجسته' : 'Featured Work'}
                </span>
              </h2>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ 
                    transitionDelay: `${200 + index * 120}ms`,
                    transform: `translateY(${scrollY * 0.05}px)`
                  }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <Card className="h-full overflow-hidden backdrop-blur-md bg-white/40 dark:bg-black/30 border border-white/50 dark:border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group-hover:-translate-y-1">
                    
                    {/* Project Image */}
                    <div className="relative overflow-hidden h-44 sm:h-52 lg:h-56">
                      <Image 
                        src={project.image} 
                        alt={`${project.title} screenshot`} 
                        width={500} 
                        height={300} 
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                        unoptimized={project.image.startsWith('http')}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.title)}&size=500&background=6366f1&color=fff&bold=true&font-size=0.33`;
                        }}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      
                      {/* Action Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-purple-800/90 to-cyan-700/90 dark:from-cyan-900/90 dark:to-teal-500/90 flex items-center justify-center gap-2 sm:gap-3 transition-all duration-500 ${
                        hoveredProject === project.id ? 'opacity-100 backdrop-blur-sm' : 'opacity-0 translate-y-4'
                      }`}>
                        <button
                          onClick={() => setPreviewUrl(project.url)}
                          className={cn(
                            buttonVariants({ variant: 'secondary', size: 'sm' }), 
                            `flex items-center gap-1.5 bg-white/30 border-white/40 text-white hover:bg-white/40 backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all duration-300 text-xs px-3 py-2 ${dir === 'rtl' ? 'font-sahel' : ''}`
                          )}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          {language === 'fa' ? 'پیش‌نمایش' : 'Preview'}
                        </button>
                        
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            buttonVariants({ variant: 'outline', size: 'sm' }), 
                            `flex items-center gap-1.5 border-white/40 text-white hover:bg-white/30 backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all duration-300 text-xs px-3 py-2 ${dir === 'rtl' ? 'font-sahel' : ''}`
                          )}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          {language === 'fa' ? 'باز کردن' : 'Open'}
                        </a>
                      </div>

                      {/* Category Badge */}
                      <div className={`absolute top-2 sm:top-3 ${dir === 'rtl' ? 'right-2 sm:right-3' : 'left-2 sm:left-3'}`}>
                        <span className={`px-2 py-1 text-[0.65rem] sm:text-xs font-semibold bg-white/30 dark:bg-black/30 backdrop-blur-sm text-white rounded-full border border-white/40 dark:border-white/20 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                          {project.category.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <CardHeader className="p-4 sm:p-5">
                      <CardTitle className={`text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-teal-400 transition-colors duration-300 line-clamp-2 ${dir === 'rtl' ? 'font-sahel text-right' : ''}`}>
                        {project.title}
                      </CardTitle>
                      <CardDescription className={`text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3 ${dir === 'rtl' ? 'font-sahel text-right' : ''}`}>
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="px-4 sm:px-5 pb-4 sm:pb-5">
                      {/* Technology Tags */}
                      <div className={`flex flex-wrap gap-1.5 sm:gap-2 mb-3 ${dir === 'rtl' ? 'justify-end' : ''}`}>
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 sm:px-2.5 py-1 text-[0.65rem] sm:text-xs font-medium bg-purple-100/90 dark:bg-teal-900/40 text-purple-700 dark:text-teal-300 rounded-lg border border-purple-200/60 dark:border-teal-700/40 transition-all duration-300 hover:scale-105 backdrop-blur-sm ${dir === 'rtl' ? 'font-sahel' : ''}`}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 sm:px-2.5 py-1 text-[0.65rem] sm:text-xs font-medium bg-gray-100/90 dark:bg-gray-700/40 text-gray-600 dark:text-gray-400 rounded-lg border border-gray-200/60 dark:border-gray-600/40 backdrop-blur-sm">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Project Stats */}
                      <div className={`pt-3 border-t border-gray-200/60 dark:border-gray-700/40 flex items-center ${dir === 'rtl' ? 'justify-end space-x-reverse' : 'justify-start'} space-x-3 text-[0.65rem] sm:text-xs text-gray-500 dark:text-gray-400`}>
                        <div className="flex items-center gap-1">
                          <Code className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span className={`${dir === 'rtl' ? 'font-sahel' : ''}`}>
                            {project.technologies.length} Tech
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span className={`${dir === 'rtl' ? 'font-sahel' : ''}`}>
                            Live
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Preview Modal */}
      {previewUrl && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setPreviewUrl(null)}
        >
          <div 
            className="relative w-full max-w-7xl h-[85vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* External Link Button */}
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-105 text-sm font-semibold"
            >
              <ExternalLink className="w-4 h-4" />
              {language === 'fa' ? 'باز کردن در تب جدید' : 'Open in New Tab'}
            </a>

            {/* Iframe */}
            <iframe
              src={previewUrl}
              className="w-full h-full border-0"
              title="Live Preview"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>
      )}
    </>
  )
}
