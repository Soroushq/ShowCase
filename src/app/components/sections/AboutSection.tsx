'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { useScrollAnimation, useParallax } from '@/app/hooks/useScrollAnimation'
import { skills, personalInfo } from '@/app/data/portfolio'
import { Award, Target, Users, TrendingUp } from 'lucide-react'
import Image from 'next/image'

export function AboutSection() {
  const { t, dir } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()
  const [animatedSkills, setAnimatedSkills] = useState<{ [key: string]: number }>({})
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const scrollY = useParallax()

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const animated: { [key: string]: number } = {}
        skills.forEach((skill) => {
          animated[skill.name] = skill.level
        })
        setAnimatedSkills(animated)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 30,
          y: (e.clientY - rect.top - rect.height / 2) / 30
        })
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [ref])

  const stats = [
    { 
      key: 'experience', 
      value: personalInfo.experience, 
      label: t('about.experience'),
      icon: Award,
      lightColor: 'from-purple-500 to-purple-600',
      darkColor: 'dark:from-green-400 dark:to-green-500'
    },
    { 
      key: 'projects', 
      value: personalInfo.projectsCompleted.toString(), 
      label: t('about.projects'),
      icon: Target,
      lightColor: 'from-blue-500 to-blue-600',
      darkColor: 'dark:from-teal-400 dark:to-teal-500'
    },
    { 
      key: 'clients', 
      value: personalInfo.clientsSatisfied.toString(), 
      label: t('about.clients'),
      icon: Users,
      lightColor: 'from-emerald-500 to-emerald-600',
      darkColor: 'dark:from-lime-400 dark:to-lime-500'
    },
  ]

  return (
    <section id="about" className="relative min-h-[150vh] flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      
      {/* Background Image with Wave Mask - Light Mode */}
      <div className="absolute inset-0 dark:opacity-0 opacity-100 transition-opacity duration-500">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/photos/w-abstract-2.jpg)',
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
        {/* Wave Pattern Overlay for Light Mode */}
        <div className="absolute inset-0 bg-white/60">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
            <defs>
              <mask id="wave-mask-light">
                <rect width="100%" height="100%" fill="white"/>
                <path 
                  d="M0,200 Q300,50 600,200 T1200,200 L1200,0 L0,0 Z" 
                  fill="black"
                />
                <path 
                  d="M0,600 Q300,450 600,600 T1200,600 L1200,800 L0,800 Z" 
                  fill="black"
                />
                <ellipse cx="300" cy="400" rx="200" ry="150" fill="black" opacity="0.3"/>
                <ellipse cx="900" cy="300" rx="150" ry="100" fill="black" opacity="0.2"/>
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="white" mask="url(#wave-mask-light)" opacity="0.8"/>
          </svg>
        </div>
      </div>

      {/* Background Image with Wave Mask - Dark Mode */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/photos/d-abstract-1.jpg)',
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
        {/* Wave Pattern Overlay for Dark Mode */}
        <div className="absolute inset-0 bg-gray-900/70">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
            <defs>
              <mask id="wave-mask-dark">
                <rect width="100%" height="100%" fill="white"/>
                <path 
                  d="M0,200 Q300,50 600,200 T1200,200 L1200,0 L0,0 Z" 
                  fill="black"
                />
                <path 
                  d="M0,600 Q300,450 600,600 T1200,600 L1200,800 L0,800 Z" 
                  fill="black"
                />
                <ellipse cx="300" cy="400" rx="200" ry="150" fill="black" opacity="0.4"/>
                <ellipse cx="900" cy="300" rx="150" ry="100" fill="black" opacity="0.3"/>
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="#111827" mask="url(#wave-mask-dark)" opacity="0.8"/>
          </svg>
        </div>
      </div>

      {/* Animated Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/15 to-purple-300/8 dark:from-green-400/10 dark:to-green-600/5 rounded-full blur-3xl transition-colors duration-500"
          style={{ 
            transform: `translateY(${scrollY * 0.2}px) translateX(${mousePosition.x}px)`,
            filter: 'blur(100px)'
          }}
        />
        <div 
          className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-l from-blue-200/12 to-blue-100/6 dark:from-teal-500/8 dark:to-teal-300/4 rounded-full blur-2xl transition-colors duration-500"
          style={{ 
            transform: `translateY(${scrollY * -0.15}px) translateX(${mousePosition.x * -0.5}px)`,
            filter: 'blur(80px)'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-[150vh] flex items-center justify-center px-6 sm:px-12 lg:px-24 xl:px-32" dir={dir}>
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section Header */}
          <div
            ref={ref}
            className={`text-center space-y-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-purple-200/50 dark:border-green-700/30 shadow-lg transition-colors duration-500">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-green-400 transition-colors duration-500" />
              <span className={`text-sm font-semibold text-purple-700 dark:text-green-300 transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                {t('about.subtitle')}
              </span>
            </div>
            
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight ${dir === 'rtl' ? 'font-sahel' : ''}`}>
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent transition-colors duration-500">
                {t('about.title')}
              </span>
            </h2>
          </div>

          {/* Profile Photo Section */}
          <div className={`flex justify-center transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-green-400 dark:to-teal-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse"></div>
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white/50 dark:border-gray-700/50 shadow-2xl backdrop-blur-sm">
                <Image
                  src="/photos/me.jpg"
                  alt="Profile Photo"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column - About Content & Stats */}
            <div className={`space-y-12 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${dir === 'rtl' ? 'translate-x-8' : '-translate-x-8'}`
            }`}>
              
              {/* About Text */}
              <div className="backdrop-blur-md bg-white/20 dark:bg-black/20 rounded-2xl p-8 border border-white/30 dark:border-white/10 shadow-xl transition-colors duration-500">
                <div className={`space-y-6 text-sm sm:text-base lg:text-lg leading-relaxed ${dir === 'rtl' ? 'font-sahel text-right' : ''}`}>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-500">
                    {t('about.description')}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors duration-500">
                    {t('about.background')}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <div
                      key={stat.key}
                      className={`group relative overflow-hidden backdrop-blur-md bg-white/20 dark:bg-black/20 rounded-2xl p-6 border border-white/30 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ 
                        transitionDelay: `${400 + index * 150}ms`,
                      }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.lightColor} ${stat.darkColor} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl`} />
                      
                      <div className="flex justify-center mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.lightColor} ${stat.darkColor} shadow-lg transition-colors duration-500`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      
                      <div className={`text-lg sm:text-2xl font-black text-gray-900 dark:text-white mb-3 text-center transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                        {stat.value}
                      </div>
                      
                      <div className={`text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center font-medium transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                        {stat.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Column - Skills */}
            <div className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${dir === 'rtl' ? '-translate-x-8' : 'translate-x-8'}`
            }`}>
              
              <div className="backdrop-blur-md bg-white/20 dark:bg-black/20 rounded-2xl p-8 border border-white/30 dark:border-white/10 shadow-xl transition-colors duration-500">
                
                <h3 className={`text-lg sm:text-xl lg:text-2xl font-black text-gray-900 dark:text-white mb-8 text-center transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel text-right' : ''}`}>
                  {t('about.skills')}
                </h3>
                
                <div className="space-y-8">
                  {skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className={`transition-all duration-700 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${600 + index * 100}ms` }}
                    >
                      <div className={`flex justify-between items-center mb-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        <span className={`text-sm sm:text-base font-bold text-gray-900 dark:text-white transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                          {skill.name}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-purple-100 dark:bg-green-900/30 text-purple-700 dark:text-green-300 transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                          {animatedSkills[skill.name] || 0}%
                        </span>
                      </div>
                      
                      <div className="relative">
                        <div className="w-full h-2 sm:h-3 bg-gray-200/50 dark:bg-gray-700/30 rounded-full overflow-hidden backdrop-blur-sm transition-colors duration-500">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 dark:from-green-400 dark:via-green-500 dark:to-green-600 rounded-full relative overflow-hidden transition-all duration-2000 ease-out"
                            style={{
                              width: `${animatedSkills[skill.name] || 0}%`,
                              transitionDelay: `${800 + index * 100}ms`
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                          </div>
                        </div>
                        
                        <div className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} -top-8`}>
                          <span className={`text-xs px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                            {skill.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
