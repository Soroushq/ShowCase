'use client'

import { useEffect, useState } from 'react'
import { buttonVariants } from '@/app/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card'
import { Mail, MessageCircle, Sparkles, MapPin, Calendar } from 'lucide-react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { useScrollAnimation, useParallax } from '@/app/hooks/useScrollAnimation'
import { socialLinks, personalInfo } from '@/app/data/portfolio'
import { cn } from '@/app/lib/utils'

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Github: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99-.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22z"/>
    </svg>
  ),
  Linkedin: MessageCircle,
  Mail: Mail,
}

export function ContactSection() {
  const { t, dir } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const scrollY = useParallax()

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const rect = ref.current?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 40,
          y: (e.clientY - rect.top - rect.height / 2) / 40,
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [ref])

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-500"
    >
      {/* Desktop Background Images with Wave Patterns */}
      <div className="hidden lg:block absolute inset-0">
        {/* Light Mode - Mac Background */}
        <div className="absolute inset-0 dark:opacity-0 opacity-100 transition-opacity duration-500">
          <div 
            className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-40"
            style={{
              backgroundImage: 'url(/photos/w-mac.jpg)',
              transform: `translateY(${scrollY * 0.05}px) translateX(${mousePosition.x * 0.5}px)`,
            }}
          />
          {/* Wave Pattern Overlay - Light Mode */}
          <div className="absolute inset-0 bg-white/70">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
              <defs>
                <mask id="wave-mask-contact-light">
                  <rect width="100%" height="100%" fill="white"/>
                  <path 
                    d="M600,50 Q900,150 1200,50 L1200,0 L600,0 Z" 
                    fill="black"
                  />
                  <path 
                    d="M0,750 Q300,650 600,750 L600,800 L0,800 Z" 
                    fill="black"
                  />
                  <ellipse cx="900" cy="400" rx="300" ry="200" fill="black" opacity="0.3"/>
                </mask>
              </defs>
              <rect width="100%" height="100%" fill="white" mask="url(#wave-mask-contact-light)" opacity="0.9"/>
            </svg>
          </div>
        </div>

        {/* Dark Mode - Keyboard Background */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500">
          <div 
            className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-50"
            style={{
              backgroundImage: 'url(/photos/d-code.jpg)',
              transform: `translateY(${scrollY * 0.05}px) translateX(${mousePosition.x * 0.5}px)`,
            }}
          />
          {/* Wave Pattern Overlay - Dark Mode */}
          <div className="absolute inset-0 bg-gray-900/80">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
              <defs>
                <mask id="wave-mask-contact-dark">
                  <rect width="100%" height="100%" fill="white"/>
                  <path 
                    d="M600,50 Q900,150 1200,50 L1200,0 L600,0 Z" 
                    fill="black"
                  />
                  <path 
                    d="M0,750 Q300,650 600,750 L600,800 L0,800 Z" 
                    fill="black"
                  />
                  <ellipse cx="900" cy="400" rx="300" ry="200" fill="black" opacity="0.4"/>
                </mask>
              </defs>
              <rect width="100%" height="100%" fill="#111827" mask="url(#wave-mask-contact-dark)" opacity="0.9"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Background Images - Abstract Art */}
      <div className="block lg:hidden absolute inset-0">
        {/* Light Mode - Abstract Background */}
        <div className="absolute inset-0 dark:opacity-0 opacity-100 transition-opacity duration-500">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: 'url(/photos/w-abstract-2.jpg)',
              transform: `translateY(${scrollY * 0.03}px)`,
            }}
          />
          <div className="absolute inset-0 bg-white/80" />
        </div>

        {/* Dark Mode - Abstract Background */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: 'url(/photos/d-abstract.jpg)',
              transform: `translateY(${scrollY * 0.03}px)`,
            }}
          />
          <div className="absolute inset-0 bg-gray-900/85" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-1/3 w-72 h-72 bg-gradient-to-r from-emerald-200/15 to-emerald-300/10 dark:from-blue-400/15 dark:to-blue-600/10 rounded-full blur-3xl transition-colors duration-500"
          style={{
            transform: `translateY(${scrollY * 0.25}px) translateX(${mousePosition.x}px)`,
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-l from-rose-200/10 to-rose-100/5 dark:from-purple-500/10 dark:to-purple-300/5 rounded-full blur-2xl transition-colors duration-500"
          style={{
            transform: `translateY(${scrollY * -0.18}px) translateX(${mousePosition.x * -0.6}px)`,
            filter: "blur(90px)",
          }}
        />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 md:py-24`} dir={dir}>
        <div className="w-full max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          
          {/* Header */}
          <div
            ref={ref}
            className={`text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-emerald-100/80 dark:bg-emerald-900/30 backdrop-blur-sm rounded-full border border-emerald-200/50 dark:border-emerald-700/30 shadow-md transition-colors duration-500">
              <Sparkles className="text-emerald-600 dark:text-emerald-400 w-4 h-4 transition-colors duration-500" />
              <span className={`text-sm font-semibold text-emerald-700 dark:text-emerald-300 transition-colors duration-500 ${dir === "rtl" ? "font-sahel" : ""}`}>
                {t("contact.subtitle")}
              </span>
            </div>
            
            <div className="mt-6 sm:mt-8">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${dir === "rtl" ? "font-sahel" : ""}`}>
                <span className="bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-200 bg-clip-text text-transparent transition-colors duration-500">
                  {t("contact.title")}
                </span>
              </h2>
            </div>
            
            <div className="mt-4 sm:mt-6">
              <p className={`text-gray-600 dark:text-gray-400 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto text-sm sm:text-base leading-relaxed transition-colors duration-500 ${dir === "rtl" ? "font-sahel" : ""}`}>
                {t("contact.description")}
              </p>
            </div>
          </div>

          {/* Content Grid - Adjusted for left positioning on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 w-full">
            
            {/* Left Column - Contact Info */}
            <div
              className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${dir === "rtl" ? "translate-x-8" : "-translate-x-8"}`
              }`}
            >
              {/* Email Card */}
              <Card className="backdrop-blur-md bg-white/60 dark:bg-black/40 border border-white/40 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-base sm:text-lg transition-colors duration-500">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" /> 
                    {t("contact.email")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className={`block text-sm sm:text-base font-semibold text-emerald-700 dark:text-emerald-300 hover:underline transition-colors duration-300 ${dir === "rtl" ? "font-sahel text-right" : ""}`}
                  >
                    {personalInfo.email}
                  </a>
                  <p className={`mt-2 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm transition-colors duration-500 ${dir === "rtl" ? "font-sahel text-right" : ""}`}>
                    {t("contact.emailInfo")}
                  </p>
                </CardContent>
              </Card>

              {/* Social Links Card */}
              <Card className="backdrop-blur-md bg-white/60 dark:bg-black/40 border border-white/40 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-base sm:text-lg transition-colors duration-500">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" /> 
                    {t("contact.social")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {socialLinks.map(({ name, url, icon }) => {
                      const IconComponent = iconMap[icon]
                      if (!IconComponent) return null
                      return (
                        <a
                          key={name}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 p-2.5 rounded-lg bg-emerald-100/80 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 text-emerald-700 dark:text-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md text-xs sm:text-sm backdrop-blur-sm ${dir === "rtl" ? "flex-row-reverse font-sahel" : ""}`}
                        >
                          <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                          <span className="font-medium">{name}</span>
                        </a>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card className="backdrop-blur-md bg-white/60 dark:bg-black/40 border border-white/40 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="space-y-3 p-4 sm:p-6">
                  <div className={`flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm transition-colors duration-500 ${dir === "rtl" ? "flex-row-reverse font-sahel" : ""}`}>
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="font-medium">Based in Mashhad, Iran</span>
                  </div>
                  <div className={`flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm transition-colors duration-500 ${dir === "rtl" ? "flex-row-reverse font-sahel" : ""}`}>
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="font-medium">Available for new projects</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - CTA Card */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${dir === "rtl" ? "-translate-x-8" : "translate-x-8"}`
              }`}
            >
              <Card className="backdrop-blur-md bg-gradient-to-br from-emerald-50/80 to-emerald-100/60 dark:from-emerald-900/40 dark:to-emerald-800/30 border border-emerald-200/50 dark:border-emerald-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full">
                <CardHeader className="py-6 sm:py-8">
                  <CardTitle className={`text-center text-lg sm:text-xl lg:text-2xl font-black text-emerald-700 dark:text-emerald-300 leading-tight transition-colors duration-500 ${dir === "rtl" ? "font-sahel" : ""}`}>
                    {t("contact.cta")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6 pb-6 sm:pb-8 text-center">
                  <p className={`text-emerald-600 dark:text-emerald-400 text-sm sm:text-base leading-relaxed transition-colors duration-500 ${dir === "rtl" ? "font-sahel" : ""}`}>
                    {t("contact.readyMessage")}
                  </p>
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className={cn(
                        buttonVariants({ size: "default" }),
                        `bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white rounded-xl px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${dir === "rtl" ? "font-sahel" : ""}`
                      )}
                    >
                      <Mail className={`inline w-4 h-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
                      {t("contact.sendEmail")}
                    </a>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "default" }),
                        `border-2 border-emerald-300 dark:border-emerald-600 rounded-xl px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-800/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base backdrop-blur-sm ${dir === "rtl" ? "font-sahel" : ""}`
                      )}
                    >
                      <MessageCircle className={`inline w-4 h-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
                      {t("contact.linkedin")}
                    </a>
                  </div>
                  <p className={`mt-4 sm:mt-6 text-emerald-600 dark:text-emerald-400 text-xs font-normal leading-relaxed transition-colors duration-500 ${dir === "rtl" ? "font-sahel" : ""}`}>
                    {t("contact.responseTime")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
