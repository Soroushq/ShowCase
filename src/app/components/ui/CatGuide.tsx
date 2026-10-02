// File: src/app/components/ui/CatGuide.tsx
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { scrollToElement } from '@/app/lib/utils'
import { X, ArrowRight, Sparkles, Briefcase, Smile, MessageCircle, Languages } from 'lucide-react'

type SectionId = 'hero' | 'showcase' | 'invention' | 'about' | 'contact'
type CatPose = 'walking' | 'sitting_attentive' | 'head_tilt_curious' | 'welcoming_stretch' | 'sleeping_loaf'

const SECTION_ORDER: SectionId[] = ['hero', 'showcase', 'invention', 'about', 'contact']

export function CatGuide() {
  const { language, setLanguage, dir } = useLanguage()
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

  // Cat State & Pose
  const [pose, setPose] = useState<CatPose>('walking')
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
        }, 1000)
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

  // When all sections visited -> Sleeping Loaf (Row 5, Column 1-2)
  useEffect(() => {
    if (allVisited && guideMode === 'playful') {
      const timer = setTimeout(() => {
        setPose('sleeping_loaf')
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [allVisited, guideMode])

  // Active Wandering Routine: Strolls around, occasionally pausing to sit, tilt head, or stretch!
  useEffect(() => {
    if (guideMode !== 'playful' || allVisited || isHovered || isBubbleOpen) return

    // Cycles between strolling and brief playful poses
    const wanderingInterval = setInterval(() => {
      setPose((current) => {
        if (current === 'walking') {
          // Pause to observe or stretch
          const r = Math.random()
          if (r < 0.45) return 'sitting_attentive'
          if (r < 0.8) return 'head_tilt_curious'
          return 'welcoming_stretch'
        } else {
          // Resume wandering stroll!
          return 'walking'
        }
      })
    }, 6500)

    return () => clearInterval(wanderingInterval)
  }, [guideMode, allVisited, isHovered, isBubbleOpen])

  // High-performance requestAnimationFrame loop for calm, buttery-smooth wandering
  useEffect(() => {
    if (guideMode !== 'playful' || isDismissed || pose !== 'walking' || isHovered || isBubbleOpen) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      }
      lastTimeRef.current = null
      return
    }

    const SPEED_PERCENT_PER_SEC = 2.0 // Relaxed, cute stroll pace

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
  }, [guideMode, isDismissed, pose, isHovered, isBubbleOpen])

  // Sync initial transform
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translate3d(calc(${posXRef.current}vw - 50%), 0, 0)`
    }
  }, [guideMode])

  // Determine guidance message (with corrected TechnoSaad name and Patent question)
  const getNextTarget = useCallback((): { target: SectionId; msgEn: string; msgFa: string } => {
    if (allVisited) {
      return {
        target: 'contact',
        msgEn: 'Purr... all sections explored! Resting comfortably in a cozy loaf 💤',
        msgFa: 'خرخر... همه بخش‌ها رو با دقت دیدی! پیشی آروم خوابیده 💤',
      }
    }

    if (activeSection === 'hero') {
      return {
        target: 'showcase',
        msgEn: 'Psst! Check out the featured projects & the new TechnoSaad Podcast below! 🎙️🔥',
        msgFa: 'پیسسس! نمونه‌کارها و پادکست جدید تکنوصاد (تلفیق تکنولوژی و اقتصاد) رو این پایین ببین! 🎙️🔥',
      }
    }

    if (!visitedSections.invention) {
      return {
        target: 'invention',
        msgEn: 'Did you know that he has a patented invention under the ID of 114350? Wanna know more about it? 📜🐾',
        msgFa: 'می‌دونستی سروش یک اختراع رسمی ثبت‌شده در حوزه تجارت الکترونیک با شناسه ۱۱۴۳۵۰ داره؟ دوست داری بیشتر درباره‌ش بدونی؟ 📜🐾',
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
      if (pose !== 'sleeping_loaf') {
        setPose('head_tilt_curious')
      }
    } else {
      scrollToElement(guidance.target)
    }
  }

  const handleCloseBubble = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsBubbleOpen(false)
    setHasNewMessage(false)
    if (pose === 'head_tilt_curious') {
      setPose('sitting_attentive')
    }
  }

  const handleDismissCat = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDismissed(true)
    setIsBubbleOpen(false)
  }

  const toggleModalLanguage = () => {
    const nextLang = language === 'en' ? 'fa' : 'en'
    setLanguage(nextLang)
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
      {/* 1. Modal: Experience Preference with Immediate Language Switcher */}
      {guideMode === 'pending' && (
        <div
          dir={dir}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-cat-pop"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl p-6 sm:p-7 shadow-2xl text-center">
            
            {/* Top Bar: Header Badge & Immediate Language Toggle Button */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-mono font-medium">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                <span>{isFa ? 'شخصی‌سازی تجربه بازدید' : 'EXPERIENCE PREFERENCE'}</span>
              </div>

              {/* Language Switcher Button (English / فارسی) inside the modal */}
              <button
                type="button"
                onClick={toggleModalLanguage}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold transition-all shadow-sm cursor-pointer"
                title={isFa ? 'Switch to English' : 'تغییر به زبان فارسی'}
              >
                <Languages className="w-3.5 h-3.5 text-cyan-500" />
                <span>{isFa ? 'English' : 'فارسی'}</span>
              </button>
            </div>

            <h3 className={`text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mb-2 ${isFa ? 'font-sahel' : ''}`}>
              {isFa ? 'نحوه همراهی و نمایش را انتخاب کنید' : 'How would you like to explore?'}
            </h3>

            <p className={`text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed ${isFa ? 'font-sahel' : ''}`}>
              {isFa
                ? 'جهت تنظیم لحن و نحوه راهنمایی صفحه، لطفاً گزینه مورد نظر خود را انتخاب کنید:'
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

      {/* 2. Vector Line-Art Cat Guide (Only rendered when guideMode === 'playful' and !isDismissed) */}
      {guideMode === 'playful' && !isDismissed && (
        <div
          ref={containerRef}
          dir={dir}
          style={{
            transform: `translate3d(calc(${posXRef.current}vw - 50%), 0, 0)`,
          }}
          className="fixed bottom-0 left-0 z-[9990] flex flex-col items-center select-none pointer-events-auto will-change-transform"
          onMouseEnter={() => {
            setIsHovered(true)
            if (pose !== 'sleeping_loaf') setPose('head_tilt_curious')
          }}
          onMouseLeave={() => {
            setIsHovered(false)
            if (pose === 'head_tilt_curious' && !isBubbleOpen) setPose('walking')
          }}
        >
          {/* A. Cute Speech Bubble (CLOSED BY DEFAULT - only opens when clicked or hovered) */}
          {isBubbleOpen && (
            <div
              className={`relative mb-3 max-w-[230px] sm:max-w-[280px] p-3 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-300/80 dark:border-neutral-700/80 shadow-2xl text-neutral-800 dark:text-neutral-100 text-xs sm:text-sm font-medium animate-cat-pop cursor-pointer ${
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
                  {pose === 'sleeping_loaf' ? '💤' : '🐾'}
                </span>
                <p className="leading-snug flex-1">
                  {isFa ? guidance.msgFa : guidance.msgEn}
                </p>
              </div>

              {pose !== 'sleeping_loaf' && (
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
          {!isBubbleOpen && hasNewMessage && pose !== 'sleeping_loaf' && (
            <button
              type="button"
              onClick={() => {
                setIsBubbleOpen(true)
                setHasNewMessage(false)
                setPose('head_tilt_curious')
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

          {/* C. Cute Hand-Drawn Minimalist Line-Art Vector Cat with Solid Fill & 2px Stroke */}
          <div className="relative group/cat pb-0.5">
            
            {/* Quick Dismiss Button */}
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
                transform: pose === 'sleeping_loaf' ? 'none' : `scaleX(${direction})`,
              }}
              className="relative cursor-pointer transition-transform duration-300 select-none"
              title={isFa ? 'پیشی راهنما (کلیک کن)' : 'Cat Guide (Click me)'}
            >
              {/* Floating 'zZz' when sleeping loaf */}
              {pose === 'sleeping_loaf' && (
                <div className="absolute -top-6 right-2 text-xs font-mono font-bold text-cyan-500 dark:text-cyan-400 animate-cat-zzz pointer-events-none select-none">
                  zZz...
                </div>
              )}

              {/* Fluid Posture Wrapper */}
              <div key={pose} className="animate-cat-pose will-change-transform">

                {/* 1. WALKING (Row 2, Column 5-6: Solid, chunky rounded limbs with natural joint pivots - NO SPIDER LEGS!) */}
                {pose === 'walking' && (
                  <div className="w-16 h-13 sm:w-18 sm:h-14 relative animate-cat-walk-bob">
                    <svg
                      viewBox="0 0 100 70"
                      className="w-full h-full drop-shadow-sm overflow-visible"
                    >
                      {/* Curving Tail with upward hook */}
                      <path
                        d="M 24 38 C 14 34, 10 20, 16 14 C 20 10, 24 14, 21 21 C 19 28, 22 36, 26 40"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white animate-cat-tail-swish"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Chunky Main Body */}
                      <path
                        d="M 26 42 C 26 30, 68 28, 72 38 C 74 48, 66 52, 46 52 C 32 52, 26 48, 26 42 Z"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* SOLID, CHUNKY ROUNDED LEGS (Pivot swinging naturally at hip/shoulder joints) */}
                      {/* Back Leg Left (Inside) */}
                      <g className="animate-cat-step-back">
                        <path
                          d="M 28 44 L 28 58 C 28 62, 35 62, 35 58 L 35 44 Z"
                          className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <line x1="31.5" y1="58" x2="31.5" y2="61" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" />
                      </g>

                      {/* Back Leg Right (Outside) */}
                      <g className="animate-cat-step-front">
                        <path
                          d="M 38 44 L 38 58 C 38 62, 45 62, 45 58 L 45 44 Z"
                          className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <line x1="41.5" y1="58" x2="41.5" y2="61" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" />
                      </g>

                      {/* Front Leg Left (Inside) */}
                      <g className="animate-cat-step-back">
                        <path
                          d="M 54 44 L 54 58 C 54 62, 61 62, 61 58 L 61 44 Z"
                          className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <line x1="57.5" y1="58" x2="57.5" y2="61" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" />
                      </g>

                      {/* Front Leg Right (Outside) */}
                      <g className="animate-cat-step-front">
                        <path
                          d="M 64 42 L 64 58 C 64 62, 71 62, 71 58 L 71 42 Z"
                          className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <line x1="67.5" y1="58" x2="67.5" y2="61" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" />
                      </g>

                      {/* Head: Rounded Triangular Contour */}
                      <path
                        d="M 62 28 C 58 38, 86 38, 84 28 C 82 18, 72 16, 62 28 Z"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Pointed Ears with Inner Fold Lines */}
                      <path d="M 64 22 L 63 8 L 73 17 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" strokeLinejoin="round" />
                      <line x1="66" y1="18" x2="66" y2="12" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />

                      <path d="M 77 20 L 85 9 L 83 21 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" strokeLinejoin="round" />
                      <line x1="79" y1="17" x2="82" y2="12" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />

                      {/* Big Cartoon Eyes with Gentle Blink */}
                      <circle cx="70" cy="26" r="1.8" className="fill-[#222222] dark:fill-white animate-cat-blink" />
                      <circle cx="79" cy="26" r="1.8" className="fill-[#222222] dark:fill-white animate-cat-blink" />

                      {/* Inverted Triangle Nose & w-Mouth */}
                      <polygon points="74,29 76,29 75,30.5" className="fill-[#222222] dark:fill-white" />
                      <path d="M 72 31.5 Q 73.5 33 75 31.5 Q 76.5 33 78 31.5" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" fill="none" />

                      {/* Whiskers */}
                      <line x1="58" y1="26" x2="64" y2="27" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.3" strokeLinecap="round" />
                      <line x1="57" y1="30" x2="63" y2="30" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.3" strokeLinecap="round" />
                      <line x1="84" y1="27" x2="90" y2="26" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.3" strokeLinecap="round" />
                      <line x1="84" y1="30" x2="90" y2="31" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                )}

                {/* 2. SITTING_ATTENTIVE (Row 1-2: Upright posture with front paws neatly aligned and tail curled neatly around side) */}
                {pose === 'sitting_attentive' && (
                  <div className={`w-14 h-16 sm:w-16 sm:h-18 relative ${isBubbleOpen ? 'animate-cat-micro-nod' : 'animate-cat-subtle-breathe'}`}>
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full drop-shadow-sm overflow-visible"
                    >
                      {/* Tail Curled Neatly Around the Side with Upward Hook */}
                      <path
                        d="M 32 80 C 18 78, 12 60, 20 48 C 24 42, 28 47, 26 54 C 23 62, 25 74, 35 80"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white animate-cat-tail-swish"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Solid Upright Body with Tucked Haunches */}
                      <path
                        d="M 36 44 C 34 52, 26 62, 26 74 C 26 82, 34 84, 44 84 L 56 84 C 66 84, 74 82, 74 74 C 74 62, 66 52, 64 44 Z"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Chunky Parallel Front Legs with Toe Notches */}
                      <path
                        d="M 44 48 L 44 82 C 44 84.5, 48 84.5, 48 82 L 48 48"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 52 48 L 52 82 C 52 84.5, 56 84.5, 56 82 L 56 48"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line x1="46" y1="81" x2="46" y2="84.5" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="54" y1="81" x2="54" y2="84.5" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.8" strokeLinecap="round" />

                      {/* Head Group: Rounded Triangular Contour */}
                      <g className={isBubbleOpen ? 'animate-cat-micro-nod' : ''}>
                        <path
                          d="M 32 30 C 28 42, 72 42, 68 30 C 66 18, 34 18, 32 30 Z"
                          className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Ears */}
                        <path d="M 34 22 L 30 6 L 46 17 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" strokeLinejoin="round" />
                        <line x1="34" y1="18" x2="36" y2="11" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.6" strokeLinecap="round" />

                        <path d="M 66 22 L 70 6 L 54 17 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" strokeLinejoin="round" />
                        <line x1="66" y1="18" x2="64" y2="11" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.6" strokeLinecap="round" />

                        {/* Dot Eyes */}
                        <circle cx="43" cy="28" r="1.8" className="fill-[#222222] dark:fill-white animate-cat-blink" />
                        <circle cx="57" cy="28" r="1.8" className="fill-[#222222] dark:fill-white animate-cat-blink" />

                        {/* Nose & Mouth */}
                        <polygon points="49,31 51,31 50,32.5" className="fill-[#222222] dark:fill-white" />
                        <path d="M 46 34.5 Q 48.5 36.5 50 34.5 Q 51.5 36.5 54 34.5" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.8" strokeLinecap="round" fill="none" />

                        {/* Whiskers */}
                        <line x1="28" y1="28" x2="36" y2="29" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />
                        <line x1="27" y1="32" x2="35" y2="32" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />
                        <line x1="29" y1="36" x2="36" y2="34" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />

                        <line x1="64" y1="29" x2="72" y2="28" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />
                        <line x1="65" y1="32" x2="73" y2="32" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />
                        <line x1="64" y1="34" x2="71" y2="36" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />
                      </g>
                    </svg>
                  </div>
                )}

                {/* 3. HEAD_TILT_CURIOUS (Row 1, Column 4 - Head tilted slightly to side, attentive & helpful) */}
                {pose === 'head_tilt_curious' && (
                  <div className="w-14 h-16 sm:w-16 sm:h-18 relative animate-cat-subtle-breathe">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full drop-shadow-sm overflow-visible"
                    >
                      {/* Tail */}
                      <path
                        d="M 32 80 C 18 78, 12 60, 20 48 C 24 42, 28 47, 26 54 C 23 62, 25 74, 35 80"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white animate-cat-tail-swish"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Body */}
                      <path
                        d="M 36 44 C 34 52, 26 62, 26 74 C 26 82, 34 84, 44 84 L 56 84 C 66 84, 74 82, 74 74 C 74 62, 66 52, 64 44 Z"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Chunky Parallel Legs */}
                      <path
                        d="M 44 48 L 44 82 C 44 84.5, 48 84.5, 48 82 L 48 48"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 52 48 L 52 82 C 52 84.5, 56 84.5, 56 82 L 56 48"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line x1="46" y1="81" x2="46" y2="84.5" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="54" y1="81" x2="54" y2="84.5" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.8" strokeLinecap="round" />

                      {/* Head Group with Attentive 8° Tilt */}
                      <g transform="rotate(8 50 26)">
                        <path
                          d="M 32 30 C 28 42, 72 42, 68 30 C 66 18, 34 18, 32 30 Z"
                          className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Ears */}
                        <path d="M 34 22 L 30 6 L 46 17 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" strokeLinejoin="round" />
                        <line x1="34" y1="18" x2="36" y2="11" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.6" strokeLinecap="round" />

                        <path d="M 66 22 L 70 6 L 54 17 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" strokeLinejoin="round" />
                        <line x1="66" y1="18" x2="64" y2="11" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.6" strokeLinecap="round" />

                        {/* Inquisitive Wide Eyes */}
                        <circle cx="43" cy="28" r="2.2" className="fill-[#222222] dark:fill-white" />
                        <circle cx="57" cy="28" r="2.2" className="fill-[#222222] dark:fill-white" />

                        {/* Nose & Mouth */}
                        <polygon points="49,31 51,31 50,32.5" className="fill-[#222222] dark:fill-white" />
                        <path d="M 46 34.5 Q 48.5 36.5 50 34.5 Q 51.5 36.5 54 34.5" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.8" strokeLinecap="round" fill="none" />

                        {/* Whiskers */}
                        <line x1="28" y1="28" x2="36" y2="29" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />
                        <line x1="27" y1="32" x2="35" y2="32" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />
                        <line x1="29" y1="36" x2="36" y2="34" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />

                        <line x1="64" y1="29" x2="72" y2="28" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />
                        <line x1="65" y1="32" x2="73" y2="32" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />
                        <line x1="64" y1="34" x2="71" y2="36" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />
                      </g>
                    </svg>
                  </div>
                )}

                {/* 4. WELCOMING_STRETCH (Row 4, Column 6 - Front paws stretched forward, inviting body curve) */}
                {pose === 'welcoming_stretch' && (
                  <div className="w-18 h-14 sm:w-20 sm:h-16 relative">
                    <svg
                      viewBox="0 0 110 75"
                      className="w-full h-full drop-shadow-sm overflow-visible"
                    >
                      {/* Arched Tail */}
                      <path
                        d="M 22 42 C 14 28, 10 14, 18 8 C 22 4, 26 10, 23 18 C 20 26, 24 34, 28 40"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white animate-cat-tail-swish"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Stretched Body Curve */}
                      <path
                        d="M 26 44 C 24 30, 42 26, 48 34 C 54 42, 68 54, 82 56 L 68 56 C 54 56, 42 56, 32 58 C 28 58, 28 52, 26 44 Z"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Back Leg Haunch */}
                      <path
                        d="M 28 48 C 26 56, 30 64, 38 64 C 44 64, 46 56, 44 48"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      {/* Stretched Front Paws */}
                      <path
                        d="M 66 54 L 92 63 C 96 64.5, 98 62, 96 60 L 76 52 Z"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line x1="93" y1="62" x2="96" y2="61" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.8" strokeLinecap="round" />

                      {/* Head looking forward */}
                      <g transform="translate(68, 34)">
                        <path
                          d="M 8 16 C 4 25, 28 25, 24 16 C 22 9, 16 7, 8 16 Z"
                          className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M 8 10 L 6 0 L 16 7 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" strokeLinejoin="round" />
                        <line x1="9" y1="7" x2="10" y2="2" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" />

                        <path d="M 24 10 L 26 0 L 16 7 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" strokeLinejoin="round" />
                        <line x1="23" y1="7" x2="22" y2="2" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" />

                        <circle cx="12" cy="14" r="1.4" className="fill-[#222222] dark:fill-white" />
                        <circle cx="20" cy="14" r="1.4" className="fill-[#222222] dark:fill-white" />
                        <polygon points="15.5,17 16.5,17 16,18" className="fill-[#222222] dark:fill-white" />
                        <path d="M 14 19 Q 15 20.5 16 19 Q 17 20.5 18 19" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                      </g>
                    </svg>
                  </div>
                )}

                {/* 5. SLEEPING_LOAF (Row 5, Column 1-2: Cozy tucked-in sleeping loaf, matches reference sheet perfectly!) */}
                {pose === 'sleeping_loaf' && (
                  <div className="w-18 h-12 sm:w-20 sm:h-14 relative">
                    <svg
                      viewBox="0 0 95 60"
                      className="w-full h-full drop-shadow-sm overflow-visible"
                    >
                      {/* Tail Wrapped Snugly Around Curled Body */}
                      <path
                        d="M 24 44 C 14 42, 10 30, 20 22 C 28 16, 42 16, 52 20 C 58 22, 60 28, 56 30 C 52 32, 46 26, 38 24 C 28 22, 22 28, 22 36 C 22 42, 26 46, 32 46"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Curled Round Body with Deep Breathing Animation */}
                      <path
                        d="M 24 38 C 22 24, 62 18, 76 28 C 84 34, 84 48, 74 52 C 60 56, 26 54, 24 38 Z"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white animate-cat-deep-breathe"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Tucked Paws Curve under Chest */}
                      <path
                        d="M 52 48 C 56 52, 66 52, 70 48"
                        className="stroke-[#222222] dark:stroke-white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                      />

                      {/* Head Resting peacefully on floor/paws */}
                      <g transform="translate(60, 26)">
                        <ellipse
                          cx="14"
                          cy="14"
                          rx="13"
                          ry="11"
                          className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                          strokeWidth="2"
                        />
                        {/* Ears folded back in sleep */}
                        <path d="M 8 6 L 4 -2 L 14 2 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                        <line x1="8" y1="4" x2="7" y2="0" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />

                        <path d="M 20 6 L 24 -2 L 16 3 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                        <line x1="20" y1="4" x2="21" y2="0" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />

                        {/* Peaceful Closed Sleeping Eyes (u u) */}
                        <path d="M 8 13 Q 11 16 14 13" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                        <path d="M 16 13 Q 19 16 22 13" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.8" strokeLinecap="round" fill="none" />

                        {/* Cute Nose and Contented Smile */}
                        <polygon points="14,16.5 16,16.5 15,17.5" className="fill-[#222222] dark:fill-white" />
                        <path d="M 13 18.5 Q 15 20 17 18.5" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" fill="none" />

                        {/* Whiskers */}
                        <line x1="2" y1="13" x2="7" y2="14" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.3" strokeLinecap="round" />
                        <line x1="2" y1="16" x2="7" y2="16" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.3" strokeLinecap="round" />
                        <line x1="21" y1="14" x2="26" y2="13" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.3" strokeLinecap="round" />
                        <line x1="21" y1="16" x2="26" y2="16" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.3" strokeLinecap="round" />
                      </g>
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
