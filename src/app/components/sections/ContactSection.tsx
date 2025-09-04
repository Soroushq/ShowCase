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
  Linkedin: MessageCircle, // assumed mapped correctly; replace with linked svg if needed
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
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
        {/* Background blobs */}
        <div className="absolute inset-0">
          <div
            className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-emerald-200 to-emerald-300 dark:from-blue-400 dark:to-blue-600 rounded-full blur-3xl"
            style={{
              transform: `translateY(${scrollY * 0.25}px) translateX(${mousePosition.x}px)`,
              filter: "blur(100px)",
            }}
          />
          <div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-l from-rose-200 to-rose-100 dark:from-purple-500 dark:to-purple-300 rounded-full blur-2xl"
            style={{
              transform: `translateY(${scrollY * -0.18}px) translateX(${mousePosition.x * -0.6}px)`,
              filter: "blur(90px)",
            }}
          />
          <div
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-tr from-orange-200 to-orange-100 dark:from-indigo-500 dark:to-indigo-300 rounded-full blur-xl"
            style={{
              transform: `translateY(${scrollY * 0.15}px) translateX(${mousePosition.y * 0.3}px)`,
              filter: "blur(70px)",
            }}
          />
        </div>
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="grid grid-pattern" />
        </div>
      </div>

      <div className={`relative z-10 w-full min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-20`} dir={dir}>
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Header */}
          <div
            ref={ref}
            className={`text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-100 rounded-full border border-green-300 dark:bg-green-800 dark:border-green-600">
              <Sparkles className="text-green-600 dark:text-green-300" />
              <span className={`text-lg font-semibold text-green-700 dark:text-green-300 ${dir === "rtl" ? "font-sahel" : ""}`}>
                {t("contact.subtitle")}
              </span>
            </div>
            <h2 className={`text-5xl font-extrabold tracking-tight leading-tight ${dir === "rtl" ? "font-sahel" : ""}`}>
              <span className="bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-200 bg-clip-text text-transparent">{t("contact.title")}</span>
            </h2>
            <p className={`mt-6 max-w-xl mx-auto text-gray-700 dark:text-gray-300 text-lg ${dir === "rtl" ? "font-sahel" : ""}`}>
              {t("contact.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            {/* Left side */}
            <div
              className={`space-y-10 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${dir === "rtl" ? "translate-x-8" : "-translate-x-8"}`
              }`}
            >
              {/* Email Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-300">
                    <Mail /> {t("contact.email")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className={`inline-block text-lg font-semibold text-green-700 dark:text-green-300 hover:underline ${dir === "rtl" ? "font-sahel" : ""}`}
                  >
                    {personalInfo.email}
                  </a>
                  <p className={`mt-2 text-green-600 dark:text-green-300 ${dir === "rtl" ? "font-sahel" : ""}`}>{t("contact.emailInfo")}</p>
                </CardContent>
              </Card>
              {/* Social Links Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-300">
                    <MessageCircle /> {t("contact.social")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${dir === "rtl" ? "rtl text-right" : ""}`}>
                    {socialLinks.map(({ name, url, icon }) => {
                      const IconComponent = iconMap[icon]
                      if (!IconComponent) return null
                      return (
                        <a
                          key={name}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-3 p-3 rounded-lg bg-green-100 dark:bg-green-900 hover:bg-green-300 dark:hover:bg-green-800 text-green-700 dark:text-green-300 transition-colors duration-300 shadow-md hover:shadow-lg ${dir === "rtl" ? "flex-row-reverse" : ""}`}
                        >
                          <IconComponent />
                          <span>{name}</span>
                        </a>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
              {/* Info Card */}
              <Card>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-green-700 dark:text-green-300">
                    <MapPin />
                    <span>Based in Mashhad, Iran</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-700 dark:text-green-300">
                    <Calendar />
                    <span>Available for new projects</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right side (CTA) */}
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${dir === "rtl" ? "-translate-x-8" : "translate-x-8"}`
              }`}
            >
              <Card
                className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border border-green-200 dark:border-green-700 shadow-xl"
              >
                <CardHeader className="py-14">
                  <CardTitle className="text-center text-3xl font-extrabold text-green-700 dark:text-green-300">{t("contact.cta")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-10 px-12 pb-14 text-center">
                  <p className={`text-green-700 dark:text-green-300 text-xl ${dir === "rtl" ? "font-sahel" : ""}`}>
                    {t("contact.readyMessage")}
                  </p>
                  <div className="flex flex-col gap-6">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        `bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-2xl px-14 py-5 font-semibold text-xl transition-shadow duration-300 ${dir === "rtl" ? "font-sahel" : ""}`
                      )}
                    >
                      <Mail className={`inline mr-3 ${dir === "rtl" ? "ml-3" : ""}`} />
                      {t("contact.sendEmail")}
                    </a>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        `border-2 border-green-300 dark:border-green-600 rounded-2xl px-14 py-5 font-semibold text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800 transition-shadow duration-300 ${dir === "rtl" ? "font-sahel" : ""}`
                      )}
                    >
                      <MessageCircle className={`inline mr-3 ${dir === "rtl" ? "ml-3" : ""}`} />
                      {t("contact.linkedin")}
                    </a>
                  </div>
                  <p className={`mt-10 text-green-600 dark:text-green-300 text-sm font-normal ${dir === "rtl" ? "font-sahel" : ""}`}>
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
