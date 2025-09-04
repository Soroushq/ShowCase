'use client'

import { useEffect, useState } from 'react'
import { Button, buttonVariants } from '@/app/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card'
import { Mail, MessageCircle, Phone, Send, MapPin, Calendar, Sparkles } from 'lucide-react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { useScrollAnimation, useParallax } from '@/app/hooks/useScrollAnimation'
import { socialLinks } from '@/app/data/portfolio'
import { cn } from '@/app/lib/utils'

// Enhanced Dynamic icon mapping
const iconMap: { [key: string]: any } = {
  Github: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ),
  Linkedin: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Twitter: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  ),
  Mail: Mail,
}

export function ContactSection() {
  const { t, dir } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()
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
    <section id="contact" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-500">
      
      {/* Enhanced Background with Parallax */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Large Background Shape */}
          <div 
            className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-emerald-300/10 dark:from-blue-400/15 dark:to-blue-600/8 rounded-full blur-3xl transition-colors duration-500"
            style={{ 
              transform: `translateY(${scrollY * 0.25}px) translateX(${mousePosition.x}px)`,
              filter: 'blur(100px)'
            }}
          />
          
          {/* Medium Floating Element */}
          <div 
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-l from-rose-200/18 to-rose-100/10 dark:from-purple-500/12 dark:to-purple-300/6 rounded-full blur-2xl transition-colors duration-500"
            style={{ 
              transform: `translateY(${scrollY * -0.18}px) translateX(${mousePosition.x * -0.6}px)`,
              filter: 'blur(90px)'
            }}
          />
          
          {/* Small Accent Element */}
          <div 
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-tr from-orange-200/15 to-orange-100/8 dark:from-indigo-500/10 dark:to-indigo-300/5 rounded-full blur-xl transition-colors duration-500"
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
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-emerald-50/80 dark:bg-blue-900/30 backdrop-blur-sm rounded-full border border-emerald-200/50 dark:border-blue-700/30 transition-colors duration-500">
              <Sparkles className="w-6 h-6 text-emerald-600 dark:text-blue-400 transition-colors duration-500" />
              <span className={`text-lg font-semibold text-emerald-700 dark:text-blue-300 transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                {t('contact.subtitle')}
              </span>
            </div>
            
            <h2 className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight ${dir === 'rtl' ? 'font-sahel' : ''}`}>
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent transition-colors duration-500">
                {t('contact.title')}
              </span>
            </h2>
            
            <p className={`text-xl sm:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300 transition-colors duration-500 leading-relaxed ${dir === 'rtl' ? 'font-sahel' : ''}`}>
              {t('contact.description')}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 lg:gap-32 items-start">
            
            {/* Left Column - Contact Info */}
            <div className={`space-y-12 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${dir === 'rtl' ? 'translate-x-8' : '-translate-x-8'}`
            }`}>
              
              {/* Email Card */}
              <Card className="overflow-hidden backdrop-blur-sm bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <CardHeader className="p-10">
                  <CardTitle className={`flex items-center gap-4 text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel flex-row-reverse' : ''}`}>
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-blue-500 dark:to-blue-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    {t('contact.email')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-10 pb-10">
                  <a
                    href="mailto:your.email@example.com"
                    className={`text-xl text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-blue-400 transition-colors duration-300 hover:underline ${dir === 'rtl' ? 'font-sahel' : ''}`}
                  >
                    your.email@example.com
                  </a>
                  <p className={`text-gray-500 dark:text-gray-400 mt-4 transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                    Send me an email and I'll get back to you within 24 hours.
                  </p>
                </CardContent>
              </Card>

              {/* Social Media Card */}
              <Card className="overflow-hidden backdrop-blur-sm bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <CardHeader className="p-10">
                  <CardTitle className={`flex items-center gap-4 text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel flex-row-reverse' : ''}`}>
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 dark:from-indigo-500 dark:to-indigo-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                    {t('contact.social')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-10 pb-10">
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${dir === 'rtl' ? 'text-right' : ''}`}>
                    {socialLinks.map((link) => {
                      const IconComponent = iconMap[link.icon]
                      return (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-3 px-6 py-4 rounded-xl bg-gray-100/80 dark:bg-gray-800/50 hover:bg-purple-100 dark:hover:bg-indigo-900/30 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-indigo-400 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl backdrop-blur-sm ${dir === 'rtl' ? 'font-sahel flex-row-reverse' : ''}`}
                        >
                          {IconComponent && <IconComponent />}
                          <span className="font-semibold">{link.name}</span>
                        </a>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info Card */}
              <Card className="overflow-hidden backdrop-blur-sm bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/10 shadow-xl transition-colors duration-500">
                <CardContent className="p-10">
                  <div className="space-y-6">
                    <div className={`flex items-center gap-4 text-gray-600 dark:text-gray-300 transition-colors duration-500 ${dir === 'rtl' ? 'flex-row-reverse font-sahel' : ''}`}>
                      <MapPin className="w-6 h-6 text-emerald-600 dark:text-blue-400" />
                      <span>Based in Your City, Country</span>
                    </div>
                    <div className={`flex items-center gap-4 text-gray-600 dark:text-gray-300 transition-colors duration-500 ${dir === 'rtl' ? 'flex-row-reverse font-sahel' : ''}`}>
                      <Calendar className="w-6 h-6 text-emerald-600 dark:text-blue-400" />
                      <span>Available for new projects</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - CTA */}
            <div className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${dir === 'rtl' ? '-translate-x-8' : 'translate-x-8'}`
            }`}>
              
              <Card className="overflow-hidden backdrop-blur-sm bg-gradient-to-br from-emerald-50/80 to-emerald-100/60 dark:from-blue-900/30 dark:to-indigo-900/20 border-emerald-200/50 dark:border-blue-700/30 shadow-2xl transition-colors duration-500">
                <CardHeader className="p-12 text-center">
                  <div className="mb-8">
                    <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-blue-500 dark:to-blue-600 shadow-xl mb-6">
                      <Send className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className={`text-3xl sm:text-4xl font-black mb-8 text-gray-900 dark:text-white transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                    {t('contact.cta')}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="px-12 pb-12 text-center space-y-10">
                  <p className={`text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                    Ready to bring your next project to life? Let's discuss how we can work together to create something amazing.
                  </p>
                  
                  <div className="flex flex-col gap-6">
                    <a
                      href="mailto:your.email@example.com"
                      className={cn(
                        buttonVariants({ size: 'lg' }), 
                        `w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white font-semibold py-6 text-xl rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${dir === 'rtl' ? 'font-sahel' : ''}`
                      )}
                    >
                      <Mail className={`w-6 h-6 ${dir === 'rtl' ? 'ml-3' : 'mr-3'}`} />
                      Send Email
                    </a>
                    
                    <a
                      href="https://linkedin.com/in/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'lg' }), 
                        `w-full border-2 border-emerald-300 dark:border-blue-400 text-emerald-700 dark:text-blue-300 hover:bg-emerald-50 dark:hover:bg-blue-900/20 hover:border-emerald-400 dark:hover:border-blue-300 font-semibold py-6 text-xl rounded-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm ${dir === 'rtl' ? 'font-sahel' : ''}`
                      )}
                    >
                      <MessageCircle className={`w-6 h-6 ${dir === 'rtl' ? 'ml-3' : 'mr-3'}`} />
                      LinkedIn
                    </a>
                  </div>
                  
                  {/* Floating Decorative Elements */}
                  <div className="relative">
                    <div className="absolute -top-4 -right-4 w-3 h-3 bg-emerald-400 dark:bg-blue-400 rounded-full animate-pulse opacity-60" />
                    <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 dark:bg-indigo-400 rounded-full animate-pulse opacity-70" style={{ animationDelay: '1s' }} />
                    <p className={`text-sm text-gray-500 dark:text-gray-400 mt-8 transition-colors duration-500 ${dir === 'rtl' ? 'font-sahel' : ''}`}>
                      I typically respond within a few hours during business days.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
