// File: src/app/components/sections/ContactSection.tsx
'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import {
  Mail,
  Github,
  Linkedin,
  Phone,
  MapPin,
  Send,
  Clock,
  Copy,
  Check,
  Download,
  ExternalLink,
  MessageSquare,
  Radio,
  FileText,
  Briefcase,
  Zap,
} from 'lucide-react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { personalInfo } from '@/app/data/portfolio'
import { cn } from '@/app/lib/utils'

interface InquiryTopic {
  id: string
  labelEn: string
  labelFa: string
  icon: React.ComponentType<{ className?: string }>
  defaultSubjectEn: string
  defaultSubjectFa: string
  defaultBodyEn: string
  defaultBodyFa: string
}

const INQUIRY_TOPICS: InquiryTopic[] = [
  {
    id: 'startup',
    labelEn: 'Startup Partnership & Investment',
    labelFa: 'شراکت استارتاپ و سرمایه‌گذاری',
    icon: Briefcase,
    defaultSubjectEn: 'Inquiry: Growth Partnership / Pilot Investment',
    defaultSubjectFa: 'درخواست همکاری و سرمایه‌گذاری استارتاپی',
    defaultBodyEn: 'Hi Soroush,\n\nI reviewed your portfolio (specifically Vibe Menus and recent ventures). We would like to discuss pilot opportunities or investment collaboration.\n\nBest regards,\n[Your Name/Company]',
    defaultBodyFa: 'درود بر شما سروش عزیز،\n\nپروژه‌های شما به‌ویژه وایب منوز و استارتاپ‌های اخیرتان را بررسی کردم. تمایل داریم در خصوص فرصت‌های توسعه، همکاری پایلوت یا سرمایه‌گذاری گفت‌وگو کنیم.\n\nبا احترام،\n[نام یا شرکت شما]',
  },
  {
    id: 'patent',
    labelEn: 'Patent #114350 Licensing',
    labelFa: 'استعلام اختراع ۱۱۴۳۵۰ و لایسنس',
    icon: FileText,
    defaultSubjectEn: 'Inquiry: Commercial Licensing for Patent #114350',
    defaultSubjectFa: 'استعلام لایسنس و همکاری تجاری اختراع ۱۱۴۳۵۰',
    defaultBodyEn: 'Hi Soroush,\n\nI am reaching out regarding your official registered e-commerce patent (ID: 114350). We are interested in exploring licensing or technical integration for our ecosystem.\n\nRegards,\n[Your Name]',
    defaultBodyFa: 'درود سروش گرامی،\n\nدر ارتباط با اختراع ثبت‌شده رسمی شما در تجارت الکترونیک (شماره ۱۱۴۳۵۰) پیام می‌دهم. علاقه‌مند به بررسی شرایط لایسنس تجاری یا ادغام فنی با پلتفرم خود هستیم.\n\nارادتمند،\n[نام شما]',
  },
  {
    id: 'consulting',
    labelEn: 'Full-Stack Architecture & Advisory',
    labelFa: 'مشاوره معماری نرم‌افزار و تک‌لید',
    icon: Zap,
    defaultSubjectEn: 'Technical Advisory / Architecture Consultation',
    defaultSubjectFa: 'درخواست مشاوره فنی و معماری نرم‌افزار',
    defaultBodyEn: 'Hi Soroush,\n\nWe have an upcoming product/infrastructure challenge and would love to consult with you on high-performance architecture and full-stack execution.\n\nBest,\n[Your Name]',
    defaultBodyFa: 'سلام سروش عزیز،\n\nدر حال توسعه محصولی با چالش‌های فنی و مقیاس‌پذیری هستیم و تمایل داریم از مشاوره شما در زمینه معماری نرم‌افزار و توسعه پیشرفته استفاده کنیم.\n\nبا تشکر،\n[نام شما]',
  },
  {
    id: 'podcast',
    labelEn: 'TechnoSaad Podcast Collaboration',
    labelFa: 'همکاری در پادکست تکنوصاد',
    icon: Radio,
    defaultSubjectEn: 'TechnoSaad Podcast: Episode / Analysis Collaboration',
    defaultSubjectFa: 'همکاری و پیشنهاد محتوا در پادکست تکنوصاد',
    defaultBodyEn: 'Hi Soroush,\n\nI listen to TechnoSaad (Economics & Tech analyses). I would love to suggest a topic or propose a collaborative episode.\n\nBest,\n[Your Name]',
    defaultBodyFa: 'درود بر شما،\n\nمخاطب پادکست تکنوصاد هستم. علاقه‌مندم در خصوص یک موضوع تحلیلی روز در حوزه اقتصاد و فناوری با شما هم‌فکری یا همکاری داشته باشم.\n\nبا احترام،\n[نام شما]',
  },
  {
    id: 'networking',
    labelEn: 'Casual Tech Chat & Networking',
    labelFa: 'ارتباط کاری و گفت‌وگوی آزاد',
    icon: MessageSquare,
    defaultSubjectEn: 'Connecting: Fellow Engineer / Networking',
    defaultSubjectFa: 'ارتباط کاری و شبکه‌سازی فنی',
    defaultBodyEn: 'Hi Soroush,\n\nCame across your work and engineering philosophy. Would love to connect and exchange ideas!\n\nCheers,\n[Your Name]',
    defaultBodyFa: 'سلام سروش جان،\n\nصفحه و دیدگاه‌های مهندسی‌ات رو دیدم. خوشحال می‌شم در ارتباط باشیم و تبادل نظر داشته باشیم!\n\nارادت،\n[نام شما]',
  },
]

export function ContactSection() {
  const { dir, language } = useLanguage()
  const isFa = language === 'fa'

  const [hasEntered, setHasEntered] = useState(false)
  const [selectedTopicId, setSelectedTopicId] = useState<string>('startup')
  const [senderName, setSenderName] = useState<string>('')
  const [senderContact, setSenderContact] = useState<string>('')
  const [customMessage, setCustomMessage] = useState<string>('')
  const [copiedType, setCopiedType] = useState<string | null>(null)
  const [tehranTime, setTehranTime] = useState<string>('')

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Selected topic object
  const currentTopic = useMemo(
    () => INQUIRY_TOPICS.find((t) => t.id === selectedTopicId) || INQUIRY_TOPICS[0],
    [selectedTopicId]
  )

  // Initialize custom message on topic change if empty or matches previous default
  useEffect(() => {
    const defaultText = isFa ? currentTopic.defaultBodyFa : currentTopic.defaultBodyEn
    setCustomMessage(defaultText)
  }, [currentTopic, isFa])

  // Live Tehran clock (UTC+03:30)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const timeStr = now.toLocaleTimeString(isFa ? 'fa-IR' : 'en-US', {
          timeZone: 'Asia/Tehran',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
        setTehranTime(timeStr)
      } catch {
        setTehranTime('12:00 PM')
      }
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [isFa])

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    const el = document.getElementById('contact')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Minimal interactive ambient particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle nodes
    const nodeCount = Math.floor(Math.min(width, 1200) / 36)
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 1,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Connect nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i]
        n1.x += n1.vx
        n1.y += n1.vy

        if (n1.x < 0 || n1.x > width) n1.vx *= -1
        if (n1.y < 0 || n1.y > height) n1.vy *= -1

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]
          const dx = n1.x - n2.x
          const dy = n1.y - n2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.12
            ctx.beginPath()
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.moveTo(n1.x, n1.y)
            ctx.lineTo(n2.x, n2.y)
            ctx.stroke()
          }
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(6, 182, 212, 0.25)'
        ctx.fill()
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Build mailto URL
  const mailtoUrl = useMemo(() => {
    const subject = isFa ? currentTopic.defaultSubjectFa : currentTopic.defaultSubjectEn
    let bodyText = customMessage
    if (senderName || senderContact) {
      bodyText += `\n\n---\nSender: ${senderName || 'Not specified'}\nContact Info: ${senderContact || 'Not specified'}`
    }
    return `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`
  }, [currentTopic, customMessage, senderName, senderContact, isFa])

  // Copy text helper
  const handleCopy = (text: string, typeKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedType(typeKey)
    setTimeout(() => setCopiedType(null), 2500)
  }

  // Generate downloadable vCard
  const handleDownloadVCard = () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Soroush Qary',
      'N:Qary;Soroush;;;',
      'TITLE:Full-Stack Engineer & Founder',
      `EMAIL;TYPE=INTERNET,PREF:${personalInfo.email}`,
      `TEL;TYPE=CELL:${personalInfo.phone}`,
      `ADR;TYPE=WORK:;;${personalInfo.location};;;;`,
      'URL:https://t.me/technosaad',
      'NOTE:Inventor of Patent #114350 | Host of TechnoSaad Podcast | Creator of Vibe Menus',
      'END:VCARD',
    ].join('\r\n')

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Soroush-Qary.vcf')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <section
      id="contact"
      dir={dir}
      className="relative min-h-screen flex flex-col justify-center bg-white dark:bg-[#040608] py-24 sm:py-32 overflow-hidden border-t border-neutral-200/60 dark:border-neutral-800/60"
    >
      {/* 1. Animated Ambient Mesh Gradient & Minimal Blueprint Grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        {/* Ambient moving gradient orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-teal-500/10 to-transparent blur-3xl animate-ambient-mesh" />
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-bl from-cyan-400/10 via-blue-500/10 to-emerald-400/5 blur-3xl animate-ambient-mesh"
          style={{ animationDelay: '-6s' }}
        />

        {/* Minimal Blueprint Coordinate Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Dynamic Interactive Node Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 dark:opacity-40" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        
        {/* Section Header: Anti-slop, clean typographic punch */}
        <div
          className={cn(
            'mb-14 sm:mb-20 max-w-3xl transition-all duration-700',
            hasEntered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          )}
        >
          <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
            <span>[ CONTACT // DISPATCH ]</span>
            <span>·</span>
            <span>{isFa ? 'مسیر ارتباط مستقیم' : 'DIRECT PIPELINE'}</span>
          </div>

          <h2
            className={cn(
              'text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white tracking-tight',
              isFa ? 'font-sahel leading-tight' : 'tracking-tight'
            )}
          >
            {isFa ? 'آغاز یک همکاری تأثیرگذار یا استعلام تجاری' : 'Initiate an Impactful Venture or Inquiry.'}
          </h2>

          <p
            className={cn(
              'mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed',
              isFa ? 'font-sahel' : ''
            )}
          >
            {isFa
              ? 'چه به دنبال مشارکت در استارتاپ‌ها، لایسنس اختراع رسمی، مشاوره تخصصی معماری نرم‌افزار، یا تبادل نظر در پادکست تکنوصاد باشید، از کنسول اختصاصی زیر برای ارتباط مستقیم استفاده کنید.'
              : 'Whether you are seeking startup growth partnership, patent licensing, full-stack architectural leadership, or discussing TechnoSaad podcast insights, dispatch a structured inquiry below.'}
          </p>
        </div>

        {/* Main Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Column (7 cols): Interactive Inquiry Dispatch Console */}
          <div
            className={cn(
              'lg:col-span-7 flex flex-col rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl transition-all duration-700',
              hasEntered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            )}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="flex items-center justify-between gap-4 pb-5 border-b border-neutral-200/60 dark:border-neutral-800/60">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                  {isFa ? 'کنسول تنظیم پیام مستقیم' : 'INTERACTIVE INQUIRY DISPATCHER'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                {isFa ? 'آماده ارسال فوری' : 'PRE-POPULATED'}
              </span>
            </div>

            {/* Step 1: Intent Selection */}
            <div className="mt-6">
              <label
                className={cn(
                  'block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3',
                  isFa ? 'font-sahel text-right' : ''
                )}
              >
                {isFa ? '۱. موضوع یا هدف ارتباط را انتخاب کنید:' : '1. SELECT INQUIRY DOMAIN:'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {INQUIRY_TOPICS.map((topic) => {
                  const Icon = topic.icon
                  const isSelected = topic.id === selectedTopicId
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => setSelectedTopicId(topic.id)}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-xl border text-left transition-all text-xs font-medium cursor-pointer',
                        isFa ? 'text-right flex-row-reverse font-sahel' : '',
                        isSelected
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-900 dark:text-cyan-200 font-bold shadow-sm'
                          : 'border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-950/40 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600'
                      )}
                    >
                      <div
                        className={cn(
                          'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors',
                          isSelected
                            ? 'bg-cyan-500 text-white'
                            : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate">{isFa ? topic.labelFa : topic.labelEn}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Sender Details (Optional) */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label
                  htmlFor="contact-sender-name"
                  className={cn(
                    'block text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 mb-1.5',
                    isFa ? 'font-sahel text-right' : ''
                  )}
                >
                  {isFa ? 'نام شما یا سازمان (اختیاری):' : 'Your Name / Org (Optional):'}
                </label>
                <input
                  id="contact-sender-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder={isFa ? 'مثال: علی رضایی / شرکت توسعه' : 'e.g. Alex Mercer / Venture Labs'}
                  className={cn(
                    'w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/50 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-cyan-500 transition-colors',
                    isFa ? 'font-sahel text-right' : ''
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-sender-contact"
                  className={cn(
                    'block text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 mb-1.5',
                    isFa ? 'font-sahel text-right' : ''
                  )}
                >
                  {isFa ? 'ایمیل یا آیدی تلگرام شما:' : 'Your Contact / Email / Telegram:'}
                </label>
                <input
                  id="contact-sender-contact"
                  type="text"
                  value={senderContact}
                  onChange={(e) => setSenderContact(e.target.value)}
                  placeholder={isFa ? 'name@domain.com یا @username' : 'name@domain.com or @handle'}
                  className={cn(
                    'w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/50 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-cyan-500 transition-colors',
                    isFa ? 'font-sahel text-right' : ''
                  )}
                />
              </div>
            </div>

            {/* Step 3: Message Body / Template Editor */}
            <div className="mt-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="contact-custom-message"
                  className={cn(
                    'text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400',
                    isFa ? 'font-sahel' : ''
                  )}
                >
                  {isFa ? '۲. متن پیام ساختاریافته (قابل ویرایش):' : '2. STRUCTURED MESSAGE BODY (EDITABLE):'}
                </label>
                <span className="text-[10px] font-mono text-neutral-400">
                  {customMessage.length} chars
                </span>
              </div>

              <textarea
                id="contact-custom-message"
                rows={5}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className={cn(
                  'w-full p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/90 dark:bg-neutral-950/70 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed focus:outline-none focus:border-cyan-500 transition-colors resize-none font-sans',
                  isFa ? 'font-sahel text-right' : ''
                )}
              />
            </div>

            {/* Actions: Direct Mailto Dispatch & Copy Draft */}
            <div className="mt-6 pt-5 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={mailtoUrl}
                className={cn(
                  'flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-neutral-950 text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-[0.98]',
                  isFa ? 'font-sahel flex-row-reverse' : ''
                )}
              >
                <Send className="w-4 h-4" />
                <span>{isFa ? 'ارسال از طریق ایمیل پیش‌فرض' : 'Dispatch via Default Mail Client'}</span>
              </a>

              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    `${isFa ? currentTopic.defaultSubjectFa : currentTopic.defaultSubjectEn}\n\n${customMessage}\n\nSender: ${
                      senderName || 'Anonymous'
                    } (${senderContact || 'N/A'})`,
                    'draft'
                  )
                }
                className={cn(
                  'inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer active:scale-[0.98]',
                  isFa ? 'font-sahel' : ''
                )}
              >
                {copiedType === 'draft' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {isFa ? 'پیش‌نویس کپی شد!' : 'Draft Copied!'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-neutral-500" />
                    <span>{isFa ? 'کپی متن برای ارسال دستی' : 'Copy Formatted Draft'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Direct Coordinates, Telemetry & vCard */}
          <div
            className={cn(
              'lg:col-span-5 flex flex-col gap-6 transition-all duration-700',
              hasEntered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Live Operational Status & Clock Card */}
            <div className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-900/40 backdrop-blur-xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200/60 dark:border-neutral-800/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-500" />
                  <span className="text-xs font-mono font-bold uppercase text-neutral-600 dark:text-neutral-300">
                    {isFa ? 'زمان محلی مهندس' : 'ENGINEER LOCAL TIME'}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-neutral-900 dark:text-cyan-400">
                  {tehranTime || '12:00 PM'}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400 font-mono">
                    {isFa ? 'موقعیت زمانی:' : 'Timezone:'}
                  </span>
                  <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">
                    Tehran (UTC+03:30)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400 font-mono">
                    {isFa ? 'وضعیت دسترسی:' : 'Availability:'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>{isFa ? 'آماده پذیرش پروژه‌های شاخص' : 'Accepting Selective Ventures'}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400 font-mono">
                    {isFa ? 'میانگین پاسخ‌دهی:' : 'Response Latency:'}
                  </span>
                  <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">
                    &lt; 6 Hours
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Verified Channels Card */}
            <div className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/90 dark:bg-neutral-900/60 backdrop-blur-xl p-6 sm:p-7 shadow-sm">
              <h3
                className={cn(
                  'text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-5',
                  isFa ? 'font-sahel text-right' : ''
                )}
              >
                {isFa ? 'راه‌های ارتباطی مستقیم' : 'DIRECT VERIFIED CHANNELS'}
              </h3>

              <div className="space-y-4">
                {/* Email with 1-click copy */}
                <div className="p-3.5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/80 dark:bg-neutral-950/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="block text-[10px] font-mono text-neutral-400 uppercase">
                        {isFa ? 'ایمیل کاری' : 'PRIMARY EMAIL'}
                      </span>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:text-cyan-500 truncate block transition-colors"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(personalInfo.email, 'email')}
                    className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                    title={isFa ? 'کپی ایمیل' : 'Copy email'}
                  >
                    {copiedType === 'email' ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Telegram & Podcast Link */}
                <div className="p-3.5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/80 dark:bg-neutral-950/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                      <Radio className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="block text-[10px] font-mono text-neutral-400 uppercase">
                        {isFa ? 'پادکست و کانال تلگرام' : 'TELEGRAM / PODCAST'}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate block">
                        @technosaad (تکنوصاد)
                      </span>
                    </div>
                  </div>

                  <a
                    href="https://t.me/technosaad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 hover:text-cyan-500 transition-colors"
                    title={isFa ? 'عضویت در تلگرام' : 'Open Telegram Channel'}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Phone */}
                <div className="p-3.5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/80 dark:bg-neutral-950/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="block text-[10px] font-mono text-neutral-400 uppercase">
                        {isFa ? 'تلفن تماس' : 'DIRECT LINE'}
                      </span>
                      <a
                        href={`tel:${personalInfo.phone}`}
                        className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:text-emerald-500 truncate block transition-colors"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(personalInfo.phone, 'phone')}
                    className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                    title={isFa ? 'کپی شماره' : 'Copy phone'}
                  >
                    {copiedType === 'phone' ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location */}
                <div className="p-3.5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/80 dark:bg-neutral-950/40 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-neutral-400 uppercase">
                      {isFa ? 'موقعیت جغرافیایی' : 'BASE LOCATION'}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Profiles & Download vCard Bar */}
              <div className="mt-6 pt-5 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-900 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-black transition-all"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>

                  <a
                    href="https://github.com/soroushq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-900 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-black transition-all"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  <a
                    href="https://t.me/technosaad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-900 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-black transition-all"
                    title="Telegram TechnoSaad"
                  >
                    <Radio className="w-4 h-4" />
                  </a>
                </div>

                {/* Practical vCard Download Button */}
                <button
                  type="button"
                  onClick={handleDownloadVCard}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-[11px] font-mono font-bold text-neutral-800 dark:text-neutral-200 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all cursor-pointer shadow-sm',
                    isFa ? 'font-sahel' : ''
                  )}
                  title={isFa ? 'دانلود کارت ویزیت دیجیتال' : 'Download vCard (.vcf)'}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isFa ? 'دریافت مخاطب (vCard)' : 'Save Contact (.vcf)'}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
