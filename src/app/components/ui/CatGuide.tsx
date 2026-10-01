// File: src/app/components/ui/CatGuide.tsx
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { scrollToElement } from '@/app/lib/utils'
import { X, ArrowRight, Sparkles, Briefcase, Smile, MessageCircle } from 'lucide-react'

type SectionId = 'hero' | 'showcase' | 'invention' | 'about' | 'contact'
type CatActivity = 'walking' | 'sitting' | 'licking_paw' | 'rolling' | 'belly_nap'

const SECTION_ORDER: SectionId[] = ['hero', 'showcase', 'invention', 'about', 'contact']

export function CatGuide() {
  const { language, dir } = useLanguage()
  const isFa = language === 'fa'

  // Audience & Mode Preference: 'pending' | 'professional' | 'playful'
  const [guideMode, setGuideMode] = useState<'pending' | 'professional' | 'playful'>('pending')
  const [isDismissed, setIsDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Tracking visited sections
  const [visitedSections, setVisitedSections] = useState<Record<SectionId, boolean>>({
    hero: false,
    showcase: false,
    invention: false,
    about: false,
    contact: false,
  })
  const [activeSection, setActiveSection] = useState<SectionId>('hero')

  // Cat Status & Animation
  const [activity, setActivity] = useState<CatActivity>('walking')
  const [isBubbleOpen, setIsBubbleOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(true)

  // Direction facing: 1 = right, -1 = left
  const [direction, setDirection] = useState<1 | -1>(1)

  // High-performance GPU motion via requestAnimationFrame & direct transform
  const containerRef = useRef<HTMLDivElement>(null)
  const posXRef = useRef<number>(20) // in viewport % (10 to 82)
  const directionRef = useRef<1 | -1>(1)
  const animFrameRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)

  // Check stored preference on mount
  useEffect(() => {
    setMounted(true)
    try {
      const stored = sessionStorage.getItem('portfolio_guide_mode') as 'professional' | 'playful' | null
      if (stored === 'professional' || stored === 'playful') {
        setGuideMode(stored)
      } else {
        const t = setTimeout(() => {
          setGuideMode('pending')
        }, 1200)
        return () => clearTimeout(t)
      }
    } catch {
      setGuideMode('pending')
    }
  }, [])

  // Section Observer (ultra-light single passive observer)
  useEffect(() => {
    if (guideMode !== 'playful' || isDismissed) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            const id = entry.target.id as SectionId
            if (SECTION_ORDER.includes(id)) {
              setActiveSection(id)
              setVisitedSections((prev) => {
                if (prev[id]) return prev
                return { ...prev, [id]: true }
              })
              setHasNewMessage(true)
            }
          }
        })
      },
      { threshold: [0.25] }
    )

    SECTION_ORDER.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [guideMode, isDismissed])

  // Check if all sections have been visited
  const allVisited = SECTION_ORDER.every((sec) => visitedSections[sec])

  // When all sections visited -> Garfield style full belly nap!
  useEffect(() => {
    if (allVisited && guideMode === 'playful') {
      const timer = setTimeout(() => {
        setActivity('belly_nap')
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [allVisited, guideMode])

  // Natural Cat Behavior Routine (Grooming, Sitting, Rolling, Strolling)
  useEffect(() => {
    if (guideMode !== 'playful' || allVisited || isHovered || isBubbleOpen) return

    const behaviorInterval = setInterval(() => {
      const rand = Math.random()
      if (rand < 0.45) {
        setActivity('walking')
      } else if (rand < 0.70) {
        setActivity('sitting')
      } else if (rand < 0.88) {
        setActivity('licking_paw')
      } else {
        setActivity('rolling')
      }
    }, 7500)

    return () => clearInterval(behaviorInterval)
  }, [guideMode, allVisited, isHovered, isBubbleOpen])

  // High-performance requestAnimationFrame loop for calm, buttery-smooth walking on 60/120/144Hz screens
  useEffect(() => {
    if (guideMode !== 'playful' || isDismissed || activity !== 'walking' || isHovered || isBubbleOpen) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      }
      lastTimeRef.current = null
      return
    }

    // Speed in viewport percentage per second (very calm: ~1.6% per sec)
    const SPEED_PERCENT_PER_SEC = 1.6

    const step = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = Math.min((time - lastTimeRef.current) / 1000, 0.1)
        let nextPos = posXRef.current + directionRef.current * SPEED_PERCENT_PER_SEC * delta

        if (nextPos >= 82) {
          directionRef.current = -1
          nextPos = 82
          setDirection(-1)
        } else if (nextPos <= 10) {
          directionRef.current = 1
          nextPos = 10
          setDirection(1)
        }

        posXRef.current = nextPos

        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(calc(${nextPos}vw - 50%), 0, 0)`
        }
      }
      lastTimeRef.current = time
      animFrameRef.current = requestAnimationFrame(step)
    }

    animFrameRef.current = requestAnimationFrame(step)

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      }
      lastTimeRef.current = null
    }
  }, [guideMode, isDismissed, activity, isHovered, isBubbleOpen])

  // Sync initial transform
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translate3d(calc(${posXRef.current}vw - 50%), 0, 0)`
    }
  }, [guideMode])

  // Determine guidance message
  const getNextTarget = useCallback((): { target: SectionId; msgEn: string; msgFa: string } => {
    if (allVisited) {
      return {
        target: 'contact',
        msgEn: 'Purr... all sections explored! Full belly and taking a cozy nap 💤',
        msgFa: 'خرخر... همه بخش‌ها رو با دقت دیدی! پیشی حسابی سیر شد و خوابید 💤',
      }
    }

    if (activeSection === 'hero') {
      return {
        target: 'showcase',
        msgEn: 'Psst! Check out the 2 new featured projects below! 🔥',
        msgFa: 'پیسسس! دو تا پروژه جدید و ویژه رو این پایین ببین! 🔥',
      }
    }

    if (!visitedSections.invention) {
      return {
        target: 'invention',
        msgEn: 'Did you see Soroush’s Patented E-Commerce Invention (#114350)? 📜🐾',
        msgFa: 'اختراع رسمی ثبت‌شده در تجارت الکترونیک (۱۱۴۳۵۰) رو دیدی؟ 📜🐾',
      }
    }

    if (!visitedSections.about) {
      return {
        target: 'about',
        msgEn: 'Read about Soroush’s mindset, engineering roots & values! 💡',
        msgFa: 'مسیر، دیدگاه‌های مهندسی و ارزش‌های سروش رو بخون! 💡',
      }
    }

    return {
      target: 'contact',
      msgEn: 'Looking to collaborate or invest? Let’s connect! ✉️🐾',
      msgFa: 'دنبال همکاری یا فرصت سرمایه‌گذاری هستی؟ بیا گپ بزنیم! ✉️🐾',
    }
  }, [activeSection, visitedSections, allVisited])

  const guidance = getNextTarget()

  const handleSelectProfessional = () => {
    setGuideMode('professional')
    try {
      sessionStorage.setItem('portfolio_guide_mode', 'professional')
    } catch {}
  }

  const handleSelectPlayful = () => {
    setGuideMode('playful')
    try {
      sessionStorage.setItem('portfolio_guide_mode', 'playful')
    } catch {}
  }

  const handleCatClick = () => {
    if (!isBubbleOpen) {
      setIsBubbleOpen(true)
      setHasNewMessage(false)
    } else {
      scrollToElement(guidance.target)
    }
  }

  const handleCloseBubble = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsBubbleOpen(false)
    setHasNewMessage(false)
  }

  const handleDismissCat = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDismissed(true)
    setIsBubbleOpen(false)
  }

  if (!mounted) return null

  // If user dismissed, provide discreet paw button to recall kitty anytime
  if (isDismissed && guideMode === 'playful') {
    return (
      <button
        type="button"
        onClick={() => {
          setIsDismissed(false)
          setIsBubbleOpen(true)
        }}
        className={`fixed bottom-3 ${
          dir === 'rtl' ? 'left-3' : 'right-3'
        } z-[9990] p-2.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-300 dark:border-neutral-700 shadow-md hover:scale-110 transition-all text-neutral-600 dark:text-neutral-300 hover:text-cyan-500 cursor-pointer`}
        title={isFa ? 'صدا زدن دوباره پیشی' : 'Call kitty back'}
      >
        <span className="text-base">🐾</span>
      </button>
    )
  }

  return (
    <>
      {/* 1. Modal: Experience & Audience Preference (Men / Professional > 25 vs Playful / <25) */}
      {guideMode === 'pending' && (
        <div
          dir={dir}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-cat-pop"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl p-6 sm:p-7 shadow-2xl text-center">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-mono font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>{isFa ? 'شخصی‌سازی تجربه بازدید' : 'EXPERIENCE PREFERENCE'}</span>
            </div>

            <h3 className={`text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mb-2 ${isFa ? 'font-sahel' : ''}`}>
              {isFa ? 'نحوه همراهی و نمایش را انتخاب کنید' : 'How would you like to explore?'}
            </h3>

            <p className={`text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed ${isFa ? 'font-sahel' : ''}`}>
              {isFa
                ? 'جهت تنظیم لحن و دستیار صفحه، کدام حالت را ترجیح می‌دهید؟'
                : 'Choose your preferred navigation style for this session:'}
            </p>

            <div className="grid grid-cols-1 gap-3.5 text-left">
              
              {/* Option A: Professional / Senior Men > 25 (Disables Cat completely) */}
              <button
                type="button"
                onClick={handleSelectProfessional}
                className={`group flex items-start gap-3.5 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 hover:border-neutral-900 dark:hover:border-cyan-400 hover:bg-white dark:hover:bg-neutral-900 transition-all duration-200 shadow-sm cursor-pointer ${
                  isFa ? 'text-right flex-row-reverse' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-cyan-400 dark:group-hover:text-black transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className={`font-bold text-sm text-neutral-900 dark:text-white flex items-center justify-between ${isFa ? 'font-sahel' : ''}`}>
                    <span>{isFa ? 'رسمی و شرکتی (>۲۵ سال / آقایان)' : 'Executive / Professional (>25 / Men)'}</span>
                    <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase">{isFa ? 'بدون پیشی' : 'NO CAT'}</span>
                  </div>
                  <p className={`text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-snug ${isFa ? 'font-sahel' : ''}`}>
                    {isFa
                      ? 'محیط مینیمال و متمرکز کاری بدون دستیار فانتزی.'
                      : 'Clean minimalist layout focused strictly on technical specs and investments.'}
                  </p>
                </div>
              </button>

              {/* Option B: Playful Companion (<25 or Girls) (Enables Walking Cat) */}
              <button
                type="button"
                onClick={handleSelectPlayful}
                className={`group flex items-start gap-3.5 p-4 rounded-xl border-2 border-cyan-500/50 bg-cyan-500/5 dark:bg-cyan-950/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-200 shadow-md cursor-pointer ${
                  isFa ? 'text-right flex-row-reverse' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Smile className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className={`font-bold text-sm text-neutral-900 dark:text-cyan-300 flex items-center justify-between ${isFa ? 'font-sahel' : ''}`}>
                    <span>{isFa ? 'راهنمای فانتزی و پیشی (<۲۵ سال یا بانوان)' : 'Playful Companion (<25 or Girls)'}</span>
                    <span className="text-sm">🐾</span>
                  </div>
                  <p className={`text-xs text-neutral-600 dark:text-neutral-300 mt-1 leading-snug ${isFa ? 'font-sahel' : ''}`}>
                    {isFa
                      ? 'همراه با گربه خطی بازیگوش که در پایین صفحه قدم می‌زند و شما را هدایت می‌کند.'
                      : 'Includes a cute line-art cat wandering smoothly along the bottom to guide you.'}
                  </p>
                </div>
              </button>

            </div>

            <p className="mt-4 text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
              {isFa ? 'انتخاب شما برای این سشن ذخیره می‌گردد' : 'Your choice applies cleanly for this session'}
            </p>
          </div>
        </div>
      )}

      {/* 2. Walking Cat Guide (Only rendered when guideMode === 'playful' and !isDismissed) */}
      {guideMode === 'playful' && !isDismissed && (
        <div
          ref={containerRef}
          dir={dir}
          style={{
            transform: `translate3d(calc(${posXRef.current}vw - 50%), 0, 0)`,
          }}
          className="fixed bottom-0 left-0 z-[9990] flex flex-col items-center select-none pointer-events-auto will-change-transform"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* A. Cute Speech Bubble (CLOSED BY DEFAULT - only opens when clicked or hovered) */}
          {isBubbleOpen && (
            <div
              className={`relative mb-3 max-w-[230px] sm:max-w-[270px] p-3 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-300/80 dark:border-neutral-700/80 shadow-2xl text-neutral-800 dark:text-neutral-100 text-xs sm:text-sm font-medium animate-cat-pop cursor-pointer ${
                isFa ? 'font-sahel text-right' : 'text-left'
              }`}
              onClick={handleCatClick}
            >
              {/* Close Button on Bubble */}
              <button
                type="button"
                onClick={handleCloseBubble}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-red-500 hover:text-white text-neutral-600 dark:text-neutral-300 flex items-center justify-center transition-colors text-[10px] cursor-pointer shadow-md"
                title={isFa ? 'بستن پیام' : 'Close message'}
              >
                <X className="w-3 h-3" />
              </button>

              <div className="flex items-start gap-2">
                <span className="text-base flex-shrink-0 mt-0.5">
                  {activity === 'belly_nap' ? '💤' : '🐾'}
                </span>
                <p className="leading-snug flex-1">
                  {isFa ? guidance.msgFa : guidance.msgEn}
                </p>
              </div>

              {activity !== 'belly_nap' && (
                <div className="mt-2 pt-1.5 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400">
                  <span>{isFa ? 'کلیک کن تا بریم' : 'Click to teleport'}</span>
                  <ArrowRight className={`w-3 h-3 ${isFa ? 'rotate-180' : ''}`} />
                </div>
              )}

              {/* Triangle pointer */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-neutral-900 border-r border-b border-neutral-300/80 dark:border-neutral-700/80 transform rotate-45" />
            </div>
          )}

          {/* B. Subtle Thought Bubble Alert when dialogue is closed */}
          {!isBubbleOpen && hasNewMessage && activity !== 'belly_nap' && (
            <button
              type="button"
              onClick={() => {
                setIsBubbleOpen(true)
                setHasNewMessage(false)
              }}
              className="mb-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-neutral-900 border border-cyan-500/50 shadow-lg text-[11px] font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5 animate-bounce cursor-pointer hover:scale-110 transition-transform"
              title={isFa ? 'دیدن پیام پیشی' : 'See cat tip'}
            >
              <MessageCircle className="w-3 h-3 text-cyan-500 animate-pulse" />
              <span className={isFa ? 'font-sahel text-[10px]' : 'text-[10px]'}>
                {isFa ? 'پیام پیشی!' : 'Tip!'}
              </span>
            </button>
          )}

          {/* C. The Delicate Hollow Line-Design Cartoon Cat */}
          <div className="relative group/cat pb-0.5">
            
            {/* Quick Dismiss Button (only shown on hover or when clicked) */}
            <button
              type="button"
              onClick={handleDismissCat}
              className="absolute -top-3 -right-3 w-4 h-4 rounded-full bg-neutral-300/80 dark:bg-neutral-700/80 hover:bg-red-500 text-neutral-600 dark:text-neutral-200 hover:text-white opacity-0 group-hover/cat:opacity-100 transition-opacity flex items-center justify-center text-[8px] cursor-pointer shadow z-20"
              title={isFa ? 'بستن پیشی' : 'Dismiss cat'}
            >
              <X className="w-2.5 h-2.5" />
            </button>

            {/* Inner Cat Element with Direction Flip */}
            <div
              onClick={handleCatClick}
              style={{
                transform: activity === 'belly_nap' ? 'none' : `scaleX(${direction})`,
              }}
              className="relative cursor-pointer transition-transform duration-300 select-none"
              title={isFa ? 'پیشی راهنما (کلیک کن)' : 'Cat Guide (Click me)'}
            >
              {/* Floating 'zZz' when belly nap */}
              {activity === 'belly_nap' && (
                <div className="absolute -top-6 right-2 text-xs font-mono font-bold text-cyan-500 dark:text-cyan-400 animate-cat-zzz pointer-events-none select-none">
                  zZz...
                </div>
              )}

              {/* Fluid Posture Wrapper with Keyed Transition */}
              <div key={activity} className="animate-cat-pose will-change-transform">

                {/* 1. BELLY NAP (Full Belly, Garfield style, on back, ready for cozy nap) */}
                {activity === 'belly_nap' && (
                  <div className="w-20 h-14 sm:w-24 sm:h-16 relative">
                    <svg
                      viewBox="0 0 100 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full drop-shadow-sm overflow-visible"
                    >
                      {/* Tail resting on floor */}
                      <path
                        d="M18 52 C10 52 6 42 12 36 C16 32 20 38 18 44 C16 48 20 52 24 52"
                        className="stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />

                      {/* Plump, Round Full Belly (Garfield style with soft breathing) */}
                      <ellipse
                        cx="50"
                        cy="40"
                        rx="26"
                        ry="18"
                        className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200 animate-cat-belly"
                        strokeWidth="2.8"
                      />

                      {/* Belly Swirl / Tummy folds */}
                      <path
                        d="M44 40 Q50 43 56 40"
                        className="stroke-neutral-300 dark:stroke-neutral-700"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />

                      {/* Little Rounded Kitten Feet sticking up in air with cute pink pads */}
                      <ellipse
                        cx="30"
                        cy="26"
                        rx="5"
                        ry="4"
                        className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="2.5"
                      />
                      <circle cx="30" cy="26" r="1.8" className="fill-rose-400" />

                      <ellipse
                        cx="40"
                        cy="23"
                        rx="5"
                        ry="4"
                        className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="2.5"
                      />
                      <circle cx="40" cy="23" r="1.8" className="fill-rose-400" />

                      {/* Front Paws resting cutely folded on tummy */}
                      <ellipse
                        cx="60"
                        cy="30"
                        rx="4.5"
                        ry="3.5"
                        className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="2.2"
                      />
                      <ellipse
                        cx="68"
                        cy="32"
                        rx="4.5"
                        ry="3.5"
                        className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="2.2"
                      />

                      {/* Head tilted back, sleeping peacefully */}
                      <ellipse
                        cx="80"
                        cy="44"
                        rx="14"
                        ry="12"
                        className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="2.8"
                      />

                      {/* Ears flat against floor */}
                      <path
                        d="M74 34 L78 22 L86 32 Z"
                        className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="2.4"
                      />
                      <polygon points="77,32 79,25 84,31" className="fill-rose-300 dark:fill-rose-400/70" />

                      <path
                        d="M86 36 L94 26 L95 38 Z"
                        className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="2.4"
                      />

                      {/* Sleeping Happy Eyes (curved blissful arcs u u) */}
                      <path d="M76 43 Q79 47 82 43" className="stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.2" strokeLinecap="round" />
                      <path d="M85 43 Q88 47 91 43" className="stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.2" strokeLinecap="round" />

                      {/* Cute Nose and Little Smile */}
                      <polygon points="84,47 82,45 86,45" className="fill-rose-400" />
                      <path d="M81 49 Q84 52 87 49" className="stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="1.8" strokeLinecap="round" fill="none" />

                      {/* Rosy Cheeks */}
                      <circle cx="74" cy="46" r="2.5" className="fill-rose-300/60 dark:fill-rose-400/40" />
                      <circle cx="92" cy="46" r="2.5" className="fill-rose-300/60 dark:fill-rose-400/40" />
                    </svg>
                  </div>
                )}

                {/* 2. SITTING (Classic upright kitten, paws tucked in, tail curled) */}
                {activity === 'sitting' && (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 relative">
                    <svg
                      viewBox="0 0 70 70"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full drop-shadow-sm overflow-visible"
                    >
                      <path
                        d="M18 56 C10 52 14 38 24 40 C30 42 26 54 36 56"
                        className="stroke-neutral-800 dark:stroke-neutral-200 animate-cat-tail"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />

                      <ellipse
                        cx="36"
                        cy="44"
                        rx="16"
                        ry="18"
                        className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="2.8"
                      />

                      <ellipse
                        cx="31"
                        cy="60"
                        rx="4.5"
                        ry="3.5"
                        className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="2.2"
                      />
                      <ellipse
                        cx="41"
                        cy="60"
                        rx="4.5"
                        ry="3.5"
                        className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="2.2"
                      />

                      <circle
                        cx="36"
                        cy="24"
                        r="15"
                        className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="2.8"
                      />

                      <path d="M24 16 L22 4 L32 12 Z" className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.4" strokeLinejoin="round" />
                      <polygon points="25,13 24,7 30,11" className="fill-rose-300 dark:fill-rose-400/70" />

                      <path d="M40 12 L50 4 L48 16 Z" className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.4" strokeLinejoin="round" />
                      <polygon points="42,11 48,7 47,13" className="fill-rose-300 dark:fill-rose-400/70" />

                      <ellipse cx="30" cy="23" rx="2.8" ry="3.5" className="fill-neutral-800 dark:fill-white" />
                      <circle cx="31" cy="21.5" r="1.2" className="fill-white dark:fill-neutral-900" />

                      <ellipse cx="42" cy="23" rx="2.8" ry="3.5" className="fill-neutral-800 dark:fill-white" />
                      <circle cx="43" cy="21.5" r="1.2" className="fill-white dark:fill-neutral-900" />

                      <polygon points="36,27 34.5,25 37.5,25" className="fill-rose-400" />
                      <path d="M33 29 Q36 31 36 28 Q36 31 39 29" className="stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="1.8" strokeLinecap="round" fill="none" />

                      <circle cx="26" cy="27" r="2.2" className="fill-rose-300/60 dark:fill-rose-400/40" />
                      <circle cx="46" cy="27" r="2.2" className="fill-rose-300/60 dark:fill-rose-400/40" />
                      <line x1="20" y1="26" x2="26" y2="27" className="stroke-neutral-500 dark:stroke-neutral-400" strokeWidth="1.4" strokeLinecap="round" />
                      <line x1="46" y1="27" x2="52" y2="26" className="stroke-neutral-500 dark:stroke-neutral-400" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </div>
                )}

                {/* 3. LICKING PAW (Grooming face cutely) */}
                {activity === 'licking_paw' && (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 relative">
                    <svg
                      viewBox="0 0 70 70"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full drop-shadow-sm overflow-visible"
                    >
                      <ellipse cx="34" cy="46" rx="15" ry="16" className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.8" />
                      
                      <ellipse cx="28" cy="61" rx="4.5" ry="3.5" className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.2" />
                      <ellipse cx="40" cy="61" rx="4.5" ry="3.5" className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.2" />

                      <g className="animate-cat-lick">
                        <path d="M42 44 C44 36 48 30 52 30 C55 30 55 34 50 40 L46 48" className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="53" cy="31" r="2" className="fill-rose-400" />
                      </g>

                      <circle cx="34" cy="24" r="14" className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.8" />
                      <path d="M22 16 L20 5 L30 13 Z" className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.4" />
                      <path d="M38 13 L48 5 L46 16 Z" className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.4" />

                      <path d="M27 24 Q30 21 33 24" className="stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2" strokeLinecap="round" />
                      <path d="M37 24 Q40 21 43 24" className="stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="34,28 32.5,26 35.5,26" className="fill-rose-400" />
                    </svg>
                  </div>
                )}

                {/* 4. ROLLING / PLAYFUL STRETCH */}
                {activity === 'rolling' && (
                  <div className="w-18 h-12 sm:w-20 sm:h-14 relative">
                    <svg
                      viewBox="0 0 85 55"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full drop-shadow-sm overflow-visible"
                    >
                      <ellipse cx="42" cy="34" rx="22" ry="14" className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.8" />
                      <ellipse cx="36" cy="18" rx="4" ry="3.5" className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.2" />
                      <circle cx="36" cy="18" r="1.5" className="fill-rose-400" />
                      <ellipse cx="46" cy="17" rx="4" ry="3.5" className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.2" />
                      <circle cx="46" cy="17" r="1.5" className="fill-rose-400" />

                      <circle cx="66" cy="30" r="12" className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.6" />
                      <path d="M60 20 L64 10 L72 18 Z" className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.2" />
                      <path d="M72 20 L80 12 L80 24 Z" className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.2" />
                      <path d="M62 30 Q65 26 68 30" className="stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2" strokeLinecap="round" />
                      <path d="M70 30 Q73 26 76 30" className="stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="69,34 67.5,32 70.5,32" className="fill-rose-400" />
                    </svg>
                  </div>
                )}

                {/* 5. WALKING (Calm, slow, gentle rounded stroll) */}
                {activity === 'walking' && (
                  <div className="w-16 h-12 sm:w-18 sm:h-14 relative animate-cat-body-bob">
                    <svg
                      viewBox="0 0 95 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full drop-shadow-sm overflow-visible"
                    >
                      <path
                        d="M18 42 C10 38 8 24 14 18 C18 14 22 18 19 25 C17 32 20 38 23 42"
                        className="stroke-neutral-800 dark:stroke-neutral-200 animate-cat-tail"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />

                      <ellipse
                        cx="46"
                        cy="38"
                        rx="25"
                        ry="15"
                        className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="2.8"
                      />

                      {/* Rounded Kitten Paws with Slow Gentle Stride */}
                      <g className="animate-cat-paw-back">
                        <ellipse
                          cx="28"
                          cy="51"
                          rx="4.5"
                          ry="3.2"
                          className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                          strokeWidth="2.2"
                        />
                      </g>

                      <g className="animate-cat-paw-front">
                        <ellipse
                          cx="38"
                          cy="51"
                          rx="4.5"
                          ry="3.2"
                          className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                          strokeWidth="2.2"
                        />
                      </g>

                      <g className="animate-cat-paw-front">
                        <ellipse
                          cx="56"
                          cy="51"
                          rx="4.5"
                          ry="3.2"
                          className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                          strokeWidth="2.2"
                        />
                      </g>

                      <g className="animate-cat-paw-back">
                        <ellipse
                          cx="66"
                          cy="51"
                          rx="4.5"
                          ry="3.2"
                          className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                          strokeWidth="2.2"
                        />
                      </g>

                      <circle
                        cx="68"
                        cy="28"
                        r="15"
                        className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="2.8"
                      />

                      <path
                        d="M58 22 L62 8 L71 18 Z"
                        className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="2.4"
                        strokeLinejoin="round"
                      />
                      <polygon points="60,19 63,12 69,17" className="fill-rose-300 dark:fill-rose-400/70" />

                      <path
                        d="M71 22 L80 10 L82 22 Z"
                        className="fill-white dark:fill-neutral-900 stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="2.4"
                        strokeLinejoin="round"
                      />
                      <polygon points="73,19 79,13 80,19" className="fill-rose-300 dark:fill-rose-400/70" />

                      {isHovered ? (
                        <g className="stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.4" strokeLinecap="round">
                          <path d="M62 28 Q65 24 68 28" />
                          <path d="M73 28 Q76 24 79 28" />
                        </g>
                      ) : (
                        <g>
                          <ellipse cx="65" cy="27" rx="2.8" ry="3.6" className="fill-neutral-800 dark:fill-white" />
                          <circle cx="66" cy="25.5" r="1.2" className="fill-white dark:fill-neutral-900" />
                          <ellipse cx="76" cy="27" rx="2.8" ry="3.6" className="fill-neutral-800 dark:fill-white" />
                          <circle cx="77" cy="25.5" r="1.2" className="fill-white dark:fill-neutral-900" />
                        </g>
                      )}

                      <polygon points="71,32 69.5,30 72.5,30" className="fill-rose-400" />
                      <path
                        d="M68 34 Q71 36 71 33 Q71 36 74 34"
                        className="stroke-neutral-800 dark:stroke-neutral-200"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        fill="none"
                      />

                      <circle cx="59" cy="31" r="2.2" className="fill-rose-300/60 dark:fill-rose-400/40" />
                      <circle cx="81" cy="31" r="2.2" className="fill-rose-300/60 dark:fill-rose-400/40" />

                      <line x1="53" y1="30" x2="59" y2="31" className="stroke-neutral-500 dark:stroke-neutral-400" strokeWidth="1.4" strokeLinecap="round" />
                      <line x1="53" y1="34" x2="59" y2="33" className="stroke-neutral-500 dark:stroke-neutral-400" strokeWidth="1.4" strokeLinecap="round" />
                      <line x1="81" y1="31" x2="87" y2="30" className="stroke-neutral-500 dark:stroke-neutral-400" strokeWidth="1.4" strokeLinecap="round" />
                      <line x1="81" y1="33" x2="87" y2="34" className="stroke-neutral-500 dark:stroke-neutral-400" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
