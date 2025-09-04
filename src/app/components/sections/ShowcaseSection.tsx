'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/Card'
import { Button, buttonVariants } from '@/app/components/ui/Button'
import { ExternalLink, Github, Code, Eye, Sparkles } from 'lucide-react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { useScrollAnimation, useParallax } from '@/app/hooks/useScrollAnimation'
import { portfolioData } from '@/app/data/portfolio'
import { cn } from '@/app/lib/utils'
import Image from "next/image";


export function ShowcaseSection() {
  const { t, dir } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const scrollY = useParallax()

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

  return (
    <section id="showcase" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      
      {/* Enhanced Background with Parallax */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Large Background Shape */}
          <div 
            className="absolute top-1/5 left-1/5 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-blue-300/10 dark:from-teal-400/15 dark:to-teal-600/8 rounded-full blur-3xl transition-colors duration-500"
            style={{ 
              transform: `translateY(${scrollY * 0.25}px) translateX(${mousePosition.x}px)`,
              filter: 'blur(100px)'
            }}
          />
          
          {/* Medium Floating Element */}
          <div 
            className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-gradient-to-l from-purple-200/18 to-purple-100/10 dark:from-green-500/12 dark:to-green-300/6 rounded-full blur-2xl transition-colors duration-500"
            style={{ 
              transform: `translateY(${scrollY * -0.18}px) translateX(${mousePosition.x * -0.6}px)`,
              filter: 'blur(90px)'
            }}
          />
          
          {/* Small Accent Element */}
          <div 
            className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-tr from-indigo-200/15 to-indigo-100/8 dark:from-blue-500/10 dark:to-blue-300/5 rounded-full blur-xl transition-colors duration-500"
            style={{ 
              transform: `translateY(${scrollY * 0.15}px) translateX(${mousePosition.y * 0.3}px)`,
              filter: 'blur(70px)'
            }}
          />
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] transition-opacity duration-500">
          <div className="w-full h-full grid-pattern" />
        </div>
      </div>

      {/* Main Content - Full Width with Generous Side Spacing */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-8 sm:px-16 lg:px-32 xl:px-48 py-20" dir={dir}>
        
        {/* Centered Content Container */}
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Section Header */}
          <div
            ref={ref}
            className={`text-center space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <br />
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-blue-50/80 dark:bg-teal-900/30 backdrop-blur-sm rounded-full border border-blue-200/50 dark:border-teal-700/30 transition-colors duration-500">
              <Sparkles className="w-6 h-6 text-blue-600 dark:text-teal-400 transition-colors duration-500" />
              <span className={`text-lg font-semibold text-blue-700 dark:text-teal-300 transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                {t('projects')}
              </span>
            </div>
            
            <h2 className={`text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-black tracking-tight ${dir === 'rtl' ? 'font-sahel' : ''}`}>
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent transition-colors duration-500">
                {t('My samples and previous works')}
              </span>
            </h2>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-16">
            {portfolioData.map((project, index) => (
              <div
                key={project.id}
                className={`group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ 
                  transitionDelay: `${300 + index * 150}ms`,
                  transform: `translateY(${scrollY * 0.05}px)`
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <Card className="h-full overflow-hidden backdrop-blur-sm bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group-hover:-translate-y-2">
                  
                  {/* Project Image */}
                  <div className="relative overflow-hidden h-64 sm:h-72">
                   <Image src={project.image} alt={`${project.title} screenshot`} width={500} height={300} className="object-cover" />

                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Action Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-purple-600/90 to-blue-600/90 dark:from-green-600/90 dark:to-teal-600/90 flex items-center justify-center transition-all duration-500 ${
                      hoveredProject === project.id 
                        ? 'opacity-100 backdrop-blur-sm' 
                        : 'opacity-0 translate-y-4'
                    }`}>
                      <div className={`flex ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-4`}>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            buttonVariants({ variant: 'secondary', size: 'sm' }), 
                            `flex items-center gap-2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all duration-300 ${dir === 'rtl' ? 'font-sahel' : ''}`
                          )}
                        >
                          <Eye className="w-4 h-4" />
                          {t('showcase.viewProject')}
                        </a>
                        
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            buttonVariants({ variant: 'outline', size: 'sm' }), 
                            `flex items-center gap-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all duration-300 ${dir === 'rtl' ? 'font-sahel' : ''}`
                          )}
                        >
                          <Github className="w-4 h-4" />
                          {t('showcase.viewCode')}
                        </a>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-semibold bg-white/20 dark:bg-black/20 backdrop-blur-sm text-white rounded-full border border-white/30 dark:border-white/10">
                        {project.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <CardHeader className="p-8">
                    <CardTitle className={`text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-green-400 transition-colors duration-300 ${dir === 'rtl' ? 'font-sahel text-right' : ''}`}>
                      {project.title}
                    </CardTitle>
                    <CardDescription className={`text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel text-right' : ''}`}>
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-8 pb-8">
                    {/* Technology Tags */}
                    <div className={`flex flex-wrap gap-3 ${dir === 'rtl' ? 'justify-end' : ''}`}>
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-4 py-2 text-sm font-medium bg-purple-100/80 dark:bg-green-900/30 text-purple-700 dark:text-green-300 rounded-xl border border-purple-200/50 dark:border-green-700/30 transition-all duration-300 hover:scale-105 hover:bg-purple-200/80 dark:hover:bg-green-800/40 ${dir === 'rtl' ? 'font-sahel' : ''}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project Stats */}
                    <div className={`mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/30 flex items-center ${dir === 'rtl' ? 'justify-end space-x-reverse' : 'justify-start'} space-x-6 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500`}>
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        <span className={`${dir === 'rtl' ? 'font-sahel' : ''}`}>
                          {project.technologies.length} Technologies
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        <span className={`${dir === 'rtl' ? 'font-sahel' : ''}`}>
                          Live Project
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className={`text-center space-y-8 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="relative inline-block">
              <Button 
                variant="outline" 
                size="lg"
                className={`relative overflow-hidden px-12 py-6 text-xl font-semibold rounded-2xl border-2 border-purple-300 dark:border-green-400 text-purple-700 dark:text-green-300 hover:bg-purple-50 dark:hover:bg-green-900/20 hover:border-purple-400 dark:hover:border-green-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm bg-white/20 dark:bg-black/20 ${dir === 'rtl' ? 'font-sahel' : ''}`}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t('showcase.allProjects')}
                  <ExternalLink className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 dark:from-green-600/20 dark:to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              
              {/* Floating Elements around Button */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 dark:bg-green-400 rounded-full animate-pulse opacity-70" />
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 dark:bg-teal-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }} />
            </div>
            
            <p className={`text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
              Explore more of my work and see how I bring ideas to life through code and design.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
