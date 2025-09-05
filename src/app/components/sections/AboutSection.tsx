'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { useScrollAnimation, useParallax } from '@/app/hooks/useScrollAnimation'
import { skills, personalInfo } from '@/app/data/portfolio'
import { Award, Target, Users, TrendingUp } from 'lucide-react'

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
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-purple-300/10 dark:from-green-400/15 dark:to-green-600/8 rounded-full blur-3xl transition-colors duration-500"
            style={{ 
              transform: `translateY(${scrollY * 0.2}px) translateX(${mousePosition.x}px)`,
              filter: 'blur(100px)'
            }}
          />
          
          <div 
            className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-l from-blue-200/15 to-blue-100/8 dark:from-teal-500/12 dark:to-teal-300/6 rounded-full blur-2xl transition-colors duration-500"
            style={{ 
              transform: `translateY(${scrollY * -0.15}px) translateX(${mousePosition.x * -0.5}px)`,
              filter: 'blur(80px)'
            }}
          />
        </div>
      </div>

      {/* Main Content - Full Width with Generous Side Spacing */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-8 sm:px-16 lg:px-32 xl:px-48" dir={dir}>
        
        {/* Centered Content Container */}
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Section Header */}
          <div
            ref={ref}
            className={`text-center space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-purple-50/80 dark:bg-green-900/30 backdrop-blur-sm rounded-full border border-purple-200/50 dark:border-green-700/30 transition-colors duration-500">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-green-400 transition-colors duration-500" />
              <span className={`text-lg font-semibold text-purple-700 dark:text-green-300 transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                {t('about.subtitle')}
              </span>
            </div>
            <br />
            
            <h2 className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight ${dir === 'rtl' ? 'font-sahel' : ''}`}>
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent transition-colors duration-500">
                {t('about.title')}
              </span>
            </h2>
          </div>
<br /><br /><br />
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-24 lg:gap-32 items-start">
            
            {/* Left Column - About Content & Stats */}
            <div className={`space-y-20 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${dir === 'rtl' ? 'translate-x-8' : '-translate-x-8'}`
            }`}>
              
              {/* About Text */}
              <div className="backdrop-blur-sm bg-white/20 dark:bg-black/20 rounded-3xl p-16 border border-white/30 dark:border-white/10 shadow-xl transition-colors duration-500">
                <div className={`space-y-10 text-xl sm:text-2xl leading-relaxed ${dir === 'rtl' ? 'font-sahel text-right' : ''}`}>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-500">
                    {t('about.description')}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors duration-500">
                    {t('about.background')}
                  </p>
                </div>
              </div>
              <br />

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <div
                      key={stat.key}
                      className={`group relative overflow-hidden backdrop-blur-sm bg-white/20 dark:bg-black/20 rounded-3xl p-10 border border-white/30 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ 
                        transitionDelay: `${400 + index * 150}ms`,
                      }}
                    >
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.lightColor} ${stat.darkColor} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-3xl`} />
                      
                      {/* Icon */}
                      <div className="flex justify-center mb-8">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.lightColor} ${stat.darkColor} shadow-lg transition-colors duration-500`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      {/* Value */}
                      <div className={`text-xl sm:text-3xl font-black text-gray-900 dark:text-white mb-6 text-center transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                        {stat.value}+
                      </div>
                      
                      {/* Label */}
                      <div className={`text-base text-gray-600 dark:text-gray-400 text-center font-medium transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                        {stat.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Column - Skills */}
            <div className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${dir === 'rtl' ? '-translate-x-8' : 'translate-x-8'}`
            }`}>
              
              <div className="backdrop-blur-sm bg-white/20 dark:bg-black/20 rounded-3xl p-24 border border-white/30 dark:border-white/10 shadow-xl transition-colors duration-500">
                
                <h3 className={`text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-16 transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel text-right' : ''}`}>
                  {t('about.skills')}
                </h3><br />
                
                <div className="space-y-12">
                  {skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className={`transition-all duration-700 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${600 + index * 100}ms` }}
                    >
                      {/* Skill Header */}
                      <div className={`flex justify-between items-center mb-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        <span className={`text-md sm:text-lg font-bold text-gray-900 dark:text-white transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                          {skill.name}
                        </span>
                        <span className={`px-5 py-2 rounded-full text-base font-lights sm:font-bold bg-purple-100 dark:bg-green-900/30 text-purple-700 dark:text-green-300 transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                          {animatedSkills[skill.name] || 0}%
                        </span>
                      </div>
                      
                      {/* Skill Bar Container */}
                      <div className="relative">
                        <div className="w-full h-2 sm:h-5 bg-gray-200/50 dark:bg-gray-700/30 rounded-full overflow-hidden backdrop-blur-sm transition-colors duration-500">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 dark:from-green-400 dark:via-green-500 dark:to-green-600 rounded-full relative overflow-hidden transition-all duration-2000 ease-out"
                            style={{
                              width: `${animatedSkills[skill.name] || 0}%`,
                              transitionDelay: `${800 + index * 100}ms`
                            }}
                          >
                            {/* Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                          </div>
                        </div>
                        
                        {/* Skill Category Badge */}
                        <div className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} -top-2 sm:-top-12`}>
                          <span className={`text-xs sm:text-sm px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
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
