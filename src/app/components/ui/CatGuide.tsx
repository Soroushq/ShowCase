// File: src/app/components/ui/CatGuide.tsx
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { scrollToElement } from '@/app/lib/utils'
import { X, ArrowRight, Sparkles, Briefcase, Smile, MessageCircle, Languages, Moon, Play, Pause } from 'lucide-react'

type SectionId = 'hero' | 'showcase' | 'invention' | 'about' | 'contact'
type CatPose =
  | 'walking'
  | 'sitting_attentive'
  | 'head_tilt_curious'
  | 'welcoming_stretch'
  | 'sleeping_loaf'
  | 'yawn_stretch'
  | 'licking_paw'
  | 'chasing_tail'
  | 'playing_yarn'
  | 'jumping_catch'

const SECTION_ORDER: SectionId[] = ['hero', 'showcase', 'invention', 'about', 'contact']

// Safe patrol limits so cat and its accessories never hug or clip screen edges
const MIN_PATROL_PCT = 14
const MAX_PATROL_PCT = 84

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

  // Cat State & Pose (STRICTLY FIXED UNIFORM 64px x 56px, NO SCALE INFLATION)
  const [pose, setPose] = useState<CatPose>('walking')
  const [isBubbleOpen, setIsBubbleOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(true)

  // Explicit Play Mode: ONLY active when user clicks "Play with me!" (false by default)
  const [isPlayingMode, setIsPlayingMode] = useState(false)

  // Clamped cat position state for 100% on-screen speech bubble and toolbar alignment
  const [catPosX, setCatPosX] = useState<number>(25)

  // Mouse / Yarn Ball Tracking & Dynamic Eye Aim (ONLY active in isPlayingMode)
  const [cursorBall, setCursorBall] = useState<{ x: number; y: number } | null>(null)
  const [jumpOffset, setJumpOffset] = useState<number>(0)
  const [jumpRotation, setJumpRotation] = useState<number>(0)
  const [eyeLook, setEyeLook] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  // Direction facing: 1 = right, -1 = left
  const [direction, setDirection] = useState<1 | -1>(1)

  // High-performance GPU motion with inertia & smooth damping
  const containerRef = useRef<HTMLDivElement>(null)
  const posXRef = useRef<number>(25) // in viewport % (14 to 84)
  const currentSpeedRef = useRef<number>(0)
  const directionRef = useRef<1 | -1>(1)
  const animFrameRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const targetXRef = useRef<number | null>(null)
  const isJumpingRef = useRef<boolean>(false)

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
        }, 800)
        return () => clearTimeout(t)
      }
    } catch {
      setGuideMode('pending')
    }
  }, [])

  // Section Observer (lightweight passive observer)
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

  // When all sections visited -> Sleeping Loaf (unless user is playing with it!)
  useEffect(() => {
    if (allVisited && guideMode === 'playful' && !isPlayingMode) {
      const timer = setTimeout(() => {
        setPose('sleeping_loaf')
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [allVisited, guideMode, isPlayingMode])

  // Mouse tracking: ONLY ACTIVE WHEN isPlayingMode is TRUE!
  useEffect(() => {
    if (guideMode !== 'playful' || isDismissed || !isPlayingMode || pose === 'sleeping_loaf') {
      setCursorBall(null)
      setEyeLook({ x: 0, y: 0 })
      targetXRef.current = null
      isJumpingRef.current = false
      setJumpOffset(0)
      setJumpRotation(0)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      const vh = window.innerHeight
      const vw = window.innerWidth

      // Show yarn ball at cursor when mouse is in the bottom half of the screen
      if (e.clientY > vh - 320) {
        setCursorBall({ x: e.clientX, y: e.clientY })

        const mousePct = (e.clientX / vw) * 100
        const currentPct = posXRef.current
        const dxPct = mousePct - currentPct

        // Smooth eye-tracking calculation toward cursor position
        const catPixelX = (currentPct / 100) * vw
        const catPixelY = vh - 50 + jumpOffset
        const deltaX = e.clientX - catPixelX
        const deltaY = e.clientY - catPixelY
        const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || 1

        const lookFactor = Math.min(1.4, Math.max(0.2, dist / 80))
        setEyeLook({
          x: Math.max(-1.4, Math.min(1.4, (deltaX / dist) * lookFactor * directionRef.current)),
          y: Math.max(-1.4, Math.min(1.4, (deltaY / dist) * lookFactor)),
        })

        // Face mouse direction with hysteresis
        if (dxPct > 1.8) {
          if (directionRef.current !== 1) {
            directionRef.current = 1
            setDirection(1)
          }
        } else if (dxPct < -1.8) {
          if (directionRef.current !== -1) {
            directionRef.current = -1
            setDirection(-1)
          }
        }

        // Target for chase clamped to safe bounds
        targetXRef.current = Math.max(MIN_PATROL_PCT, Math.min(MAX_PATROL_PCT, mousePct))

        // Check vertical height: If cursor is higher than cat head, cat leaps parabolic arc!
        const heightDiff = vh - 60 - e.clientY

        if (heightDiff > 35 && Math.abs(dxPct) < 22) {
          isJumpingRef.current = true
          const jumpAmount = -Math.min(26, Math.max(12, heightDiff * 0.28))
          setJumpOffset(jumpAmount)
          setJumpRotation(directionRef.current * -8)
          setPose('jumping_catch')
        } else {
          isJumpingRef.current = false
          setJumpOffset(0)
          setJumpRotation(0)
          if (Math.abs(dxPct) < 5) {
            setPose('playing_yarn')
          } else {
            setPose('walking')
          }
        }
      } else {
        setCursorBall(null)
        targetXRef.current = null
        isJumpingRef.current = false
        setJumpOffset(0)
        setJumpRotation(0)
        setEyeLook({ x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => {
      setCursorBall(null)
      targetXRef.current = null
      isJumpingRef.current = false
      setJumpOffset(0)
      setJumpRotation(0)
      setEyeLook({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [guideMode, isDismissed, isPlayingMode, pose, jumpOffset])

  // Autonomous Cat Routine (Minds its own business: walks, licks paw, chases tail, stretches, sits!)
  useEffect(() => {
    if (
      guideMode !== 'playful' ||
      (allVisited && !isPlayingMode) ||
      isHovered ||
      isBubbleOpen ||
      pose === 'sleeping_loaf' ||
      pose === 'yawn_stretch' ||
      isPlayingMode // When in play mode, controlled by cursor
    )
      return

    const wanderingInterval = setInterval(() => {
      setPose((current) => {
        if (current === 'sleeping_loaf') return current
        if (current === 'walking') {
          const r = Math.random()
          if (r < 0.25) return 'licking_paw' // washes face / licks paw
          if (r < 0.45) return 'chasing_tail' // chases its own tail
          if (r < 0.70) return 'sitting_attentive' // elegant sitting
          if (r < 0.85) return 'head_tilt_curious' // curious listening
          return 'welcoming_stretch' // play-bow stretch
        } else {
          return 'walking' // resumes stroll
        }
      })
    }, 6000)

    return () => clearInterval(wanderingInterval)
  }, [guideMode, allVisited, isPlayingMode, isHovered, isBubbleOpen, pose])

  // High-performance requestAnimationFrame loop with inertia & organic acceleration/braking
  useEffect(() => {
    if (
      guideMode !== 'playful' ||
      isDismissed ||
      pose === 'sleeping_loaf' ||
      pose === 'yawn_stretch' ||
      pose === 'licking_paw' ||
      pose === 'chasing_tail' ||
      pose === 'sitting_attentive' ||
      pose === 'head_tilt_curious' ||
      isHovered ||
      isBubbleOpen
    ) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      }
      lastTimeRef.current = null
      currentSpeedRef.current = 0
      return
    }

    const MAX_CHASE_SPEED = 3.2
    const MAX_STROLL_SPEED = 1.8

    const step = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = Math.min((time - lastTimeRef.current) / 1000, 0.1)
        let nextPos = posXRef.current

        if (isPlayingMode && targetXRef.current !== null) {
          // Chase toward cursor yarn ball in play mode
          const diff = targetXRef.current - nextPos
          const desiredSpeed = Math.abs(diff) > 2 ? Math.sign(diff) * MAX_CHASE_SPEED : diff * 1.5

          currentSpeedRef.current += (desiredSpeed - currentSpeedRef.current) * Math.min(1, delta * 6)
          nextPos += currentSpeedRef.current * delta
        } else {
          // Autonomous natural stroll with safe boundary reversal
          const targetSpeed = directionRef.current * MAX_STROLL_SPEED
          currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * Math.min(1, delta * 4)
          nextPos += currentSpeedRef.current * delta

          if (nextPos >= MAX_PATROL_PCT) {
            directionRef.current = -1
            nextPos = MAX_PATROL_PCT
            setDirection(-1)
          } else if (nextPos <= MIN_PATROL_PCT) {
            directionRef.current = 1
            nextPos = MIN_PATROL_PCT
            setDirection(1)
          }
        }

        posXRef.current = nextPos
        setCatPosX(nextPos)

        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(calc(${nextPos}vw - 50%), ${jumpOffset}px, 0)`
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
  }, [guideMode, isDismissed, pose, jumpOffset, isPlayingMode, isHovered, isBubbleOpen])

  // Sync initial transform
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translate3d(calc(${posXRef.current}vw - 50%), ${jumpOffset}px, 0)`
    }
  }, [guideMode, jumpOffset])

  // Determine guidance message (Clean, helpful, informative tips)
  const getNextTarget = useCallback((): { target: SectionId; msgEn: string; msgFa: string } => {
    if (isPlayingMode) {
      return {
        target: 'contact',
        msgEn: 'Yay! Move your mouse and watch me chase the yarn ball! Click "Stop" when done! 🧶🐾',
        msgFa: 'هورا! ماوس رو تکون بده تا دنبال کلاف بیام و بپرم! هروقت خواستی دکمه توقف بازی رو بزن! 🧶🐾',
      }
    }

    if (allVisited) {
      return {
        target: 'contact',
        msgEn: 'Purr... all sections explored! Tap me to wake me up or play! 💤🐾',
        msgFa: 'خرخر... همه بخش‌ها رو دیدی! کلیک کن تا بیدار شم یا باهم بازی کنیم! 💤🐾',
      }
    }

    if (activeSection === 'hero') {
      return {
        target: 'showcase',
        msgEn: 'Check out the featured products & the new TechnoSaad Podcast below! 🎙️🔥',
        msgFa: 'پروژه‌های شاخص و پادکست تکنوصاد (تحلیل اقتصاد و فناوری) رو این پایین ببین! 🎙️🔥',
      }
    }

    if (!visitedSections.invention) {
      return {
        target: 'invention',
        msgEn: 'Did you know Soroush has an officially registered patent under ID #114350? 📜🐾',
        msgFa: 'می‌دونستی سروش یک اختراع رسمی ثبت‌شده در حوزه تجارت الکترونیک با شماره ۱۱۴۳۵۰ داره؟ 📜🐾',
      }
    }

    if (!visitedSections.about) {
      return {
        target: 'about',
        msgEn: 'Read about Soroush’s mindset, engineering roots & values! 💡',
        msgFa: 'مسیر، دیدگاه‌های مهندسی و ارزش‌های کاری سروش رو مطالعه کن! 💡',
      }
    }

    return {
      target: 'contact',
      msgEn: 'Looking to collaborate, invest, or consult? Let’s connect! ✉️🐾',
      msgFa: 'دنبال همکاری استارتاپی، سرمایه‌گذاری یا مشاوره هستی؟ بیا گپ بزنیم! ✉️🐾',
    }
  }, [activeSection, visitedSections, allVisited, isPlayingMode])

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

  // CAT INTERACTION: Open tips or teleport
  const handleCatClick = () => {
    if (pose === 'sleeping_loaf') {
      setPose('yawn_stretch')
      setIsBubbleOpen(true)
      setHasNewMessage(false)

      setTimeout(() => {
        setPose('sitting_attentive')
      }, 1200)
      return
    }

    if (!isBubbleOpen) {
      setIsBubbleOpen(true)
      setHasNewMessage(false)
      if (pose !== 'playing_yarn' && pose !== 'jumping_catch') {
        setPose('head_tilt_curious')
      }
    } else {
      scrollToElement(guidance.target)
    }
  }

  // START PLAY MODE (Only when user explicitly chooses to play!)
  const handleStartPlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlayingMode(true)
    setPose('playing_yarn')
    setIsBubbleOpen(true)
  }

  // STOP PLAY MODE (Return to minding its own business & strolling)
  const handleStopPlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlayingMode(false)
    setCursorBall(null)
    targetXRef.current = null
    isJumpingRef.current = false
    setJumpOffset(0)
    setJumpRotation(0)
    setEyeLook({ x: 0, y: 0 })
    setPose('sitting_attentive')
  }

  // PUT CAT BACK TO SLEEP (Explicit Sleep Button)
  const handlePutToSleep = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlayingMode(false)
    setCursorBall(null)
    targetXRef.current = null
    isJumpingRef.current = false
    setJumpOffset(0)
    setJumpRotation(0)
    setEyeLook({ x: 0, y: 0 })

    setPose('yawn_stretch')
    setTimeout(() => {
      setPose('sleeping_loaf')
      setIsBubbleOpen(false)
      setHasNewMessage(false)
    }, 1100)
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
        } z-[9990] p-2.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-300 dark:border-neutral-700 shadow-md hover:border-cyan-500 transition-colors text-neutral-600 dark:text-neutral-300 hover:text-cyan-500 cursor-pointer`}
        title={isFa ? 'صدا زدن دوباره پیشی' : 'Call kitty back'}
      >
        <span className="text-base">🐾</span>
      </button>
    )
  }

  // Calculate clamped left position for speech bubble and action buttons:
  // Guaranteed minimum 16px from left screen edge and 16px from right screen edge on ANY screen size!
  const clampedBubbleLeft = `clamp(16px, calc(${catPosX}vw - 130px), calc(100vw - 286px))`
  const clampedButtonsLeft = `clamp(16px, calc(${catPosX}vw - 110px), calc(100vw - 246px))`
  const bubbleArrowPosition = `clamp(24px, calc(${catPosX}vw - ${clampedBubbleLeft}), calc(100% - 24px))`

  return (
    <>
      {/* 0. Floating Yarn Ball Attached to Mouse Cursor (ONLY in Play Mode) */}
      {isPlayingMode && cursorBall && (
        <div
          style={{
            transform: `translate3d(${cursorBall.x + 10}px, ${cursorBall.y + 10}px, 0)`,
          }}
          className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform select-none"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-md">
            <circle cx="12" cy="12" r="8" className="fill-cyan-500 stroke-[#222222] dark:stroke-white" strokeWidth="1.8" />
            <path d="M 8 9 C 11 8, 14 14, 17 11" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <path d="M 8 13 C 11 17, 16 14, 17 12" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <path d="M 17 15 Q 20 18 21 16" className="stroke-cyan-400" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      )}

      {/* 1. Modal: Compact, Fast, Scannable (Under 2 seconds to decide) */}
      {guideMode === 'pending' && (
        <div
          dir={dir}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-cat-pop"
        >
          <div className="relative w-full max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl p-5 sm:p-6 shadow-2xl text-center">
            
            {/* Header Bar */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[11px] font-mono font-medium">
                <Sparkles className="w-3 h-3 text-cyan-500" />
                <span className={isFa ? 'font-sahel' : ''}>{isFa ? 'سبک مرور سایت' : 'EXPERIENCE'}</span>
              </div>

              {/* Instant Language Toggle Button */}
              <button
                type="button"
                onClick={toggleModalLanguage}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-[11px] font-bold transition-colors cursor-pointer"
                title={isFa ? 'Switch to English' : 'تغییر به زبان فارسی'}
              >
                <Languages className="w-3 h-3 text-cyan-500" />
                <span>{isFa ? 'English' : 'فارسی'}</span>
              </button>
            </div>

            <h3 className={`text-lg sm:text-xl font-black text-neutral-900 dark:text-white mb-1 ${isFa ? 'font-sahel' : ''}`}>
              {isFa ? 'نحوه همراهی در سایت' : 'Choose Your Experience'}
            </h3>

            <p className={`text-xs text-neutral-500 dark:text-neutral-400 mb-4 ${isFa ? 'font-sahel' : ''}`}>
              {isFa ? 'شیوه دلخواه خود را برای این بازدید انتخاب کنید:' : 'Select how you would like to explore:'}
            </p>

            <div className="grid grid-cols-1 gap-2.5 text-left">
              
              {/* Option B: Playful Companion with Interactive Cat */}
              <button
                type="button"
                onClick={handleSelectPlayful}
                className={`group flex items-center gap-3 p-3.5 rounded-xl border-2 border-cyan-500/60 bg-cyan-500/5 dark:bg-cyan-950/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition-colors cursor-pointer ${
                  isFa ? 'text-right flex-row-reverse' : ''
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0">
                  <Smile className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-xs sm:text-sm text-neutral-900 dark:text-cyan-300 flex items-center justify-between gap-1.5 ${isFa ? 'font-sahel' : ''}`}>
                    <span>{isFa ? 'همراه با پیشی راهنما' : 'Playful Guide Cat'}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold flex-shrink-0">
                      {isFa ? 'پیشی 🐾' : 'WITH CAT 🐾'}
                    </span>
                  </div>
                  <p className={`text-[11px] text-neutral-600 dark:text-neutral-300 mt-0.5 truncate ${isFa ? 'font-sahel' : ''}`}>
                    {isFa
                      ? 'گربه خطی ملوس که در پایین صفحه می‌چرخد و بخش‌ها را معرفی می‌کند.'
                      : 'Cute line-art cat that guides you & can play when requested.'}
                  </p>
                </div>
              </button>

              {/* Option A: Strict / Executive (No Cat) */}
              <button
                type="button"
                onClick={handleSelectProfessional}
                className={`group flex items-center gap-3 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-white dark:hover:bg-neutral-900 transition-colors cursor-pointer ${
                  isFa ? 'text-right flex-row-reverse' : ''
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 text-neutral-600 dark:text-neutral-400">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-xs sm:text-sm text-neutral-900 dark:text-white flex items-center justify-between gap-1.5 ${isFa ? 'font-sahel' : ''}`}>
                    <span>{isFa ? 'رسمی و شرکتی' : 'Strict & Professional'}</span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase flex-shrink-0">
                      {isFa ? 'بدون پیشی' : 'NO CAT'}
                    </span>
                  </div>
                  <p className={`text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 truncate ${isFa ? 'font-sahel' : ''}`}>
                    {isFa
                      ? 'محیط کاملاً مینیمال و متمرکز کاری بدون دستیار فانتزی.'
                      : 'Minimalist interface focused purely on technical work.'}
                  </p>
                </div>
              </button>

            </div>
          </div>
        </div>
      )}

      {/* 2. DYNAMICALLY CLAMPED SPEECH BUBBLE (NEVER EVER CLIPS OR GOES OUT OF REACH!) */}
      {guideMode === 'playful' && !isDismissed && isBubbleOpen && (
        <div
          dir={dir}
          style={{
            position: 'fixed',
            bottom: '72px',
            left: clampedBubbleLeft,
            width: '270px',
            maxWidth: 'calc(100vw - 32px)',
            zIndex: 9992,
          }}
          className={`p-3.5 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-300/80 dark:border-neutral-700/80 shadow-2xl text-neutral-800 dark:text-neutral-100 text-xs sm:text-sm font-medium animate-cat-pop select-none pointer-events-auto ${
            isFa ? 'font-sahel text-right' : 'text-left'
          }`}
          onClick={handleCatClick}
        >
          {/* Close Button on Bubble (Always easily reachable with 16px safety margin!) */}
          <button
            type="button"
            onClick={handleCloseBubble}
            className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-red-500 hover:text-white text-neutral-600 dark:text-neutral-300 flex items-center justify-center transition-colors text-[10px] cursor-pointer shadow-md z-10"
            title={isFa ? 'بستن پیام' : 'Close message'}
          >
            <X className="w-3 h-3" />
          </button>

          <div className="flex items-start gap-2">
            <span className="text-sm flex-shrink-0 mt-0.5">
              {pose === 'sleeping_loaf' ? '💤' : isPlayingMode ? '🧶' : '🐾'}
            </span>
            <p className="leading-snug flex-1">
              {isFa ? guidance.msgFa : guidance.msgEn}
            </p>
          </div>

          {/* Teleport action link */}
          {pose !== 'sleeping_loaf' && !isPlayingMode && (
            <div className="mt-1.5 pt-1.5 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400">
              <span>{isFa ? 'کلیک کن تا بریم' : 'Click to teleport'}</span>
              <ArrowRight className={`w-3 h-3 ${isFa ? 'rotate-180' : ''}`} />
            </div>
          )}

          {/* ACTION BUTTONS: Play, Stop, Sleep */}
          <div className="mt-2 pt-1.5 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col gap-1.5">
            {/* Play Button (when not playing and awake) */}
            {!isPlayingMode && pose !== 'sleeping_loaf' && (
              <button
                type="button"
                onClick={handleStartPlay}
                className="w-full flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-[11px] font-bold transition-colors cursor-pointer border border-cyan-500/30"
                title={isFa ? 'بازی با کلاف کاموا' : 'Play with cat'}
              >
                <Play className="w-3 h-3" />
                <span className={isFa ? 'font-sahel' : ''}>
                  {isFa ? 'بیا با ماوس بازی کنیم! 🧶' : 'Play with me! 🧶'}
                </span>
              </button>
            )}

            {/* Stop Play Button (when currently playing) */}
            {isPlayingMode && (
              <button
                type="button"
                onClick={handleStopPlay}
                className="w-full flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-[11px] font-bold transition-colors cursor-pointer border border-neutral-300 dark:border-neutral-700"
                title={isFa ? 'توقف بازی و بازگشت به راهنمایی' : 'Stop playing'}
              >
                <Pause className="w-3 h-3 text-neutral-500" />
                <span className={isFa ? 'font-sahel' : ''}>
                  {isFa ? 'کافیه، برگرد سر کارت 🐾' : 'Stop playing (Back to tips) 🐾'}
                </span>
              </button>
            )}

            {/* Put to Sleep Button (when awake) */}
            {pose !== 'sleeping_loaf' && (
              <button
                type="button"
                onClick={handlePutToSleep}
                className="w-full flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 text-[11px] font-medium transition-colors cursor-pointer"
                title={isFa ? 'خواباندن پیشی' : 'Put kitty to sleep'}
              >
                <Moon className="w-3 h-3 text-amber-500" />
                <span className={isFa ? 'font-sahel' : ''}>
                  {isFa ? 'برو بخواب پیشی (استراحت) 💤' : 'Go back to sleep, kitty! 💤'}
                </span>
              </button>
            )}
          </div>

          {/* Pointer triangle clamped dynamically to cat position */}
          <div
            style={{
              position: 'absolute',
              bottom: '-6px',
              left: bubbleArrowPosition,
              transform: 'translateX(-50%) rotate(45deg)',
            }}
            className="w-3 h-3 bg-white dark:bg-neutral-900 border-r border-b border-neutral-300/80 dark:border-neutral-700/80"
          />
        </div>
      )}

      {/* 3. DYNAMICALLY CLAMPED ACTION PILLS (ALWAYS 100% VISIBLE & WITHIN SCREEN BOUNDS) */}
      {guideMode === 'playful' && !isDismissed && (
        <div
          dir={dir}
          style={{
            position: 'fixed',
            bottom: '64px',
            left: clampedButtonsLeft,
            zIndex: 9991,
            maxWidth: 'calc(100vw - 32px)',
          }}
          className="flex items-center gap-1 pointer-events-auto select-none"
        >
          {/* Thought Bubble Tip Alert */}
          {!isBubbleOpen && hasNewMessage && pose !== 'sleeping_loaf' && (
            <button
              type="button"
              onClick={() => {
                setIsBubbleOpen(true)
                setHasNewMessage(false)
                setPose('head_tilt_curious')
              }}
              className="px-2 py-0.5 rounded-full bg-white dark:bg-neutral-900 border border-cyan-500/50 shadow-md text-[10px] font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform"
              title={isFa ? 'دیدن پیام پیشی' : 'See cat tip'}
            >
              <MessageCircle className="w-3 h-3 text-cyan-500" />
              <span className={isFa ? 'font-sahel' : ''}>{isFa ? 'پیام پیشی!' : 'Tip!'}</span>
            </button>
          )}

          {/* Quick Play Pill (when not in play mode & awake) */}
          {!isPlayingMode && pose !== 'sleeping_loaf' && (
            <button
              type="button"
              onClick={handleStartPlay}
              className="px-2 py-0.5 rounded-full bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-800 dark:text-cyan-200 text-[10px] font-bold flex items-center gap-1 shadow cursor-pointer border border-cyan-500/30 transition-colors"
              title={isFa ? 'بازی با کلاف کاموا' : 'Play with cat'}
            >
              <span>🧶</span>
              <span className={isFa ? 'font-sahel' : ''}>{isFa ? 'بازی' : 'Play'}</span>
            </button>
          )}

          {/* Quick Stop Play Pill (when in play mode) */}
          {isPlayingMode && (
            <button
              type="button"
              onClick={handleStopPlay}
              className="px-2 py-0.5 rounded-full bg-neutral-800/85 hover:bg-neutral-800 text-white dark:bg-neutral-200/90 dark:text-neutral-900 text-[10px] font-bold flex items-center gap-1 shadow cursor-pointer transition-colors"
              title={isFa ? 'پایان بازی' : 'Stop play'}
            >
              <Pause className="w-2.5 h-2.5" />
              <span className={isFa ? 'font-sahel' : ''}>{isFa ? 'توقف بازی' : 'Stop'}</span>
            </button>
          )}

          {/* DEDICATED QUICK SLEEP PILL (When cat is awake) */}
          {pose !== 'sleeping_loaf' && (
            <button
              type="button"
              onClick={handlePutToSleep}
              className="px-2 py-0.5 rounded-full bg-neutral-900/85 hover:bg-neutral-900 text-white dark:bg-neutral-100/90 dark:hover:bg-white dark:text-neutral-900 text-[10px] font-bold flex items-center gap-1 shadow cursor-pointer transition-colors"
              title={isFa ? 'خواباندن پیشی' : 'Put kitty to sleep'}
            >
              <Moon className="w-2.5 h-2.5 text-amber-400" />
              <span className={isFa ? 'font-sahel' : ''}>{isFa ? 'بخواب پیشی 💤' : 'Nap 💤'}</span>
            </button>
          )}

          {/* Wake-up tooltip hint when cat is sleeping */}
          {pose === 'sleeping_loaf' && !isBubbleOpen && (
            <div
              onClick={handleCatClick}
              className="px-2.5 py-0.5 rounded-full bg-neutral-900/90 text-white dark:bg-white/90 dark:text-neutral-900 text-[10px] font-bold flex items-center gap-1 shadow cursor-pointer animate-pulse"
              title={isFa ? 'بیدار کردن پیشی' : 'Wake up cat'}
            >
              <span className={isFa ? 'font-sahel' : ''}>
                {isFa ? 'کلیک کن تا بیدار شم! 🐾' : 'Click to wake me up! 🐾'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* 4. Vector Line-Art Cat Guide (STRICTLY FIXED 64px x 56px SIZE - NEVER SCALES UP) */}
      {guideMode === 'playful' && !isDismissed && (
        <div
          ref={containerRef}
          dir={dir}
          style={{
            transform: `translate3d(calc(${posXRef.current}vw - 50%), ${jumpOffset}px, 0)`,
          }}
          className="fixed bottom-0 left-0 z-[9990] flex flex-col items-center select-none pointer-events-auto will-change-transform"
          onMouseEnter={() => {
            setIsHovered(true)
            if (pose !== 'sleeping_loaf' && pose !== 'yawn_stretch' && pose !== 'jumping_catch' && !isPlayingMode) {
              setPose('head_tilt_curious')
            }
          }}
          onMouseLeave={() => {
            setIsHovered(false)
            if (pose === 'head_tilt_curious' && !isBubbleOpen && !isPlayingMode) {
              setPose('walking')
            }
          }}
        >
          {/* FIXED-SIZE CAT CONTAINER WITH DYNAMIC CONTACT SHADOW */}
          <div className="relative group/cat pb-0.5 flex flex-col items-center">
            
            {/* Quick Dismiss Button */}
            <button
              type="button"
              onClick={handleDismissCat}
              className="absolute -top-2.5 -right-2.5 w-4 h-4 rounded-full bg-neutral-300/80 dark:bg-neutral-700/80 hover:bg-red-500 text-neutral-600 dark:text-neutral-200 hover:text-white opacity-0 group-hover/cat:opacity-100 transition-opacity flex items-center justify-center text-[8px] cursor-pointer shadow z-20"
              title={isFa ? 'بستن پیشی' : 'Dismiss cat'}
            >
              <X className="w-2.5 h-2.5" />
            </button>

            {/* Inner Cat Element with Direction Flip & Jump Parabolic Rotation */}
            <div
              onClick={handleCatClick}
              style={{
                transform:
                  pose === 'sleeping_loaf'
                    ? 'none'
                    : `scaleX(${direction}) rotate(${jumpRotation}deg)`,
                transformOrigin: '50% 80%',
              }}
              className="relative cursor-pointer select-none transition-transform duration-150"
              title={
                pose === 'sleeping_loaf'
                  ? isFa
                    ? 'پیشی خوابیده (کلیک کن تا بیدارش کنی!)'
                    : 'Cat sleeping (Click to wake me up!)'
                  : isFa
                  ? 'پیشی راهنما'
                  : 'Guide Cat'
              }
            >
              {/* Floating 'zZz' when sleeping loaf */}
              {pose === 'sleeping_loaf' && (
                <div className="absolute -top-5 right-1 text-[11px] font-mono font-bold text-cyan-500 dark:text-cyan-400 animate-cat-zzz pointer-events-none select-none">
                  zZz...
                </div>
              )}

              {/* Floating Yawn when waking up or settling down */}
              {pose === 'yawn_stretch' && (
                <div className="absolute -top-5 right-0 text-[10px] font-mono font-bold text-amber-500 animate-bounce pointer-events-none select-none">
                  {isFa ? 'خمیـازه... 🥱' : 'Yaaawn... 🥱'}
                </div>
              )}

              {/* Exact Uniform Fixed Bounding Box: 64px x 56px across ALL poses */}
              <div key={pose} className="w-16 h-14 relative flex items-center justify-center overflow-visible">

                {/* 1. WALKING (Strolling naturally with detailed paws & anime catchlight eyes) */}
                {pose === 'walking' && (
                  <svg viewBox="0 0 100 70" className="w-full h-full drop-shadow-sm overflow-visible animate-cat-walk-bob">
                    <path
                      d="M 22 38 C 12 34, 8 18, 14 12 C 18 8, 23 12, 20 19 C 18 26, 21 34, 25 40"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white animate-cat-tail-swish"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 24 42 C 24 28, 68 26, 74 36 C 76 48, 68 54, 46 54 C 30 54, 24 48, 24 42 Z"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <g className="animate-cat-step-back">
                      <path d="M 27 44 L 27 60 C 27 64, 35 64, 35 60 L 35 44 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" strokeLinejoin="round" />
                      <line x1="31" y1="59" x2="31" y2="63" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" />
                    </g>
                    <g className="animate-cat-step-front">
                      <path d="M 38 44 L 38 60 C 38 64, 46 64, 46 60 L 46 44 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" strokeLinejoin="round" />
                      <line x1="42" y1="59" x2="42" y2="63" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" />
                    </g>
                    <g className="animate-cat-step-back">
                      <path d="M 56 44 L 56 60 C 56 64, 64 64, 64 60 L 64 44 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" strokeLinejoin="round" />
                      <line x1="60" y1="59" x2="60" y2="63" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" />
                    </g>
                    <g className="animate-cat-step-front">
                      <path d="M 67 42 L 67 60 C 67 64, 75 64, 75 60 L 75 42 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" strokeLinejoin="round" />
                      <line x1="71" y1="59" x2="71" y2="63" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" />
                    </g>
                    {/* Head with detailed cheeks & pink inner ear triangles */}
                    <path
                      d="M 64 26 C 58 38, 90 38, 87 26 C 85 16, 73 14, 64 26 Z"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <g className="animate-cat-ear-flick">
                      <path d="M 66 20 L 64 6 L 75 15 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <polygon points="66,16 65,9 72,14" className="fill-rose-200 dark:fill-rose-300" />
                    </g>
                    <path d="M 80 18 L 89 7 L 86 19 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                    <polygon points="81,16 87,9 85,17" className="fill-rose-200 dark:fill-rose-300" />

                    {/* Sparkling Anime Eyes with Double Highlight */}
                    <g className="animate-cat-blink">
                      <circle cx="72" cy="24" r="2.3" className="fill-[#222222] dark:fill-white" />
                      <circle cx={72 + eyeLook.x * 0.7} cy={23.2 + eyeLook.y * 0.7} r="0.8" fill="#ffffff" />
                      <circle cx={72.8 + eyeLook.x * 0.7} cy={24.2 + eyeLook.y * 0.7} r="0.4" fill="#ffffff" />
                      <circle cx="82" cy="24" r="2.3" className="fill-[#222222] dark:fill-white" />
                      <circle cx={82 + eyeLook.x * 0.7} cy={23.2 + eyeLook.y * 0.7} r="0.8" fill="#ffffff" />
                      <circle cx={82.8 + eyeLook.x * 0.7} cy={24.2 + eyeLook.y * 0.7} r="0.4" fill="#ffffff" />
                    </g>
                    <polygon points="76,27.5 78,27.5 77,29" className="fill-rose-400 stroke-[#222222] dark:stroke-white" strokeWidth="0.8" />
                    <path d="M 74 30 Q 75.5 31.5 77 30 Q 78.5 31.5 80 30" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                    <line x1="60" y1="25" x2="67" y2="26" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.3" strokeLinecap="round" />
                    <line x1="87" y1="26" x2="94" y2="25" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                )}

                {/* 2. LICKING_PAW (Minding its own business: washing face & licking paw!) */}
                {pose === 'licking_paw' && (
                  <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-sm overflow-visible">
                    <path
                      d="M 32 64 C 18 64, 12 48, 18 38 C 22 34, 26 38, 24 44 C 22 50, 24 60, 34 64"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white animate-cat-tail-swish"
                      strokeWidth="2"
                    />
                    <path
                      d="M 34 40 C 32 48, 24 56, 24 68 C 24 74, 34 76, 44 76 L 56 76 C 66 76, 76 74, 76 68 C 76 56, 68 48, 66 40 Z"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                      strokeWidth="2"
                    />
                    <path d="M 44 46 L 44 74 C 44 76, 49 76, 49 74 L 49 46" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                    {/* Raised Front Paw Licking Face with cute pink bean pad */}
                    <g className="animate-cat-lick-paw">
                      <path
                        d="M 54 44 C 54 36, 62 30, 68 36 C 70 39, 68 42, 64 42 C 60 42, 58 46, 56 50 Z"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                        strokeWidth="2"
                      />
                      <ellipse cx="66" cy="36" rx="2" ry="1.5" className="fill-rose-300 dark:fill-rose-400" />
                    </g>
                    {/* Head tilted down licking paw */}
                    <g transform="translate(48, 22) rotate(12)">
                      <circle cx="16" cy="16" r="14" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <path d="M 8 6 L 4 -2 L 14 3 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <path d="M 22 6 L 26 -2 L 18 3 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <polygon points="8,4 5,0 12,3" className="fill-rose-200" />
                      <polygon points="22,4 25,0 18,3" className="fill-rose-200" />
                      {/* Contented closed eyes (u u) */}
                      <path d="M 9 15 Q 12 18 15 15" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.8" fill="none" />
                      <path d="M 17 15 Q 20 18 23 15" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.8" fill="none" />
                      {/* Little pink tongue licking */}
                      <path d="M 14 20 Q 16 23 18 20 Z" className="fill-rose-400 stroke-[#222222] dark:stroke-white" strokeWidth="1" />
                    </g>
                  </svg>
                )}

                {/* 3. CHASING_TAIL (Minding its own business: spinning chasing its own tail!) */}
                {pose === 'chasing_tail' && (
                  <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-sm overflow-visible animate-cat-chase-tail">
                    {/* Body curved tightly in a circle */}
                    <path
                      d="M 30 46 C 24 32, 54 22, 68 34 C 78 44, 72 62, 56 64 C 40 66, 28 58, 30 46 Z"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                      strokeWidth="2"
                    />
                    {/* Tail curving around in front of face! */}
                    <path
                      d="M 28 50 C 16 52, 14 32, 26 24 C 36 18, 48 20, 52 26"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    {/* Head looking back at tail with wide eager eyes */}
                    <g transform="translate(52, 28) rotate(24)">
                      <circle cx="14" cy="14" r="12" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <path d="M 6 6 L 2 0 L 12 4 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <path d="M 20 6 L 24 0 L 14 4 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <circle cx="10" cy="13" r="2.2" className="fill-[#222222] dark:fill-white" />
                      <circle cx="9.6" cy="12.3" r="0.8" fill="#ffffff" />
                      <circle cx="18" cy="13" r="2.2" className="fill-[#222222] dark:fill-white" />
                      <circle cx="17.6" cy="12.3" r="0.8" fill="#ffffff" />
                      <polygon points="13.5,16 15.5,16 14.5,17" className="fill-rose-400" />
                    </g>
                  </svg>
                )}

                {/* 4. SITTING_ATTENTIVE */}
                {pose === 'sitting_attentive' && (
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm overflow-visible animate-cat-subtle-breathe">
                    <path
                      d="M 32 80 C 16 78, 10 58, 18 46 C 23 40, 28 45, 25 52 C 22 60, 24 74, 35 80"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white animate-cat-tail-swish"
                      strokeWidth="2"
                    />
                    <path
                      d="M 34 44 C 32 52, 22 62, 22 76 C 22 84, 34 86, 44 86 L 56 86 C 66 86, 78 84, 78 76 C 78 62, 68 52, 66 44 Z"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                      strokeWidth="2"
                    />
                    <path d="M 43 48 L 43 84 C 43 86.5, 48 86.5, 48 84 L 48 48" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                    <path d="M 52 48 L 52 84 C 52 86.5, 57 86.5, 57 84 L 57 48" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                    <path
                      d="M 30 30 C 26 44, 74 44, 70 30 C 68 16, 32 16, 30 30 Z"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                      strokeWidth="2"
                    />
                    <g className="animate-cat-ear-flick">
                      <path d="M 32 22 L 28 5 L 45 16 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <polygon points="32,18 29,8 41,14" className="fill-rose-200" />
                    </g>
                    <path d="M 68 22 L 72 5 L 55 16 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                    <polygon points="68,18 71,8 59,14" className="fill-rose-200" />
                    <g className="animate-cat-blink">
                      <circle cx="42" cy="27" r="2.3" className="fill-[#222222] dark:fill-white" />
                      <circle cx="42.7" cy="26.3" r="0.7" fill="#ffffff" />
                      <circle cx="58" cy="27" r="2.3" className="fill-[#222222] dark:fill-white" />
                      <circle cx="58.7" cy="26.3" r="0.7" fill="#ffffff" />
                    </g>
                    <polygon points="49,30.5 51,30.5 50,32" className="fill-rose-400 stroke-[#222222] dark:stroke-white" strokeWidth="0.8" />
                    <path d="M 46 34 Q 48.5 36 50 34 Q 51.5 36 54 34" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    <line x1="26" y1="28" x2="34" y2="29" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />
                    <line x1="66" y1="29" x2="74" y2="28" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                )}

                {/* 5. HEAD_TILT_CURIOUS */}
                {pose === 'head_tilt_curious' && (
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm overflow-visible animate-cat-subtle-breathe">
                    <path
                      d="M 32 80 C 16 78, 10 58, 18 46 C 23 40, 28 45, 25 52 C 22 60, 24 74, 35 80"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white animate-cat-tail-swish"
                      strokeWidth="2"
                    />
                    <path
                      d="M 34 44 C 32 52, 22 62, 22 76 C 22 84, 34 86, 44 86 L 56 86 C 66 86, 78 84, 78 76 C 78 62, 68 52, 66 44 Z"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                      strokeWidth="2"
                    />
                    <path d="M 43 48 L 43 84 C 43 86.5, 48 86.5, 48 84 L 48 48" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                    <path d="M 52 48 L 52 84 C 52 86.5, 57 86.5, 57 84 L 57 48" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                    <g transform="rotate(10 50 26)">
                      <path
                        d="M 30 30 C 26 44, 74 44, 70 30 C 68 16, 32 16, 30 30 Z"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                        strokeWidth="2"
                      />
                      <path d="M 32 22 L 28 5 L 45 16 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <path d="M 68 22 L 72 5 L 55 16 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <polygon points="32,18 29,8 41,14" className="fill-rose-200" />
                      <polygon points="68,18 71,8 59,14" className="fill-rose-200" />
                      <circle cx="42" cy="27" r="2.5" className="fill-[#222222] dark:fill-white" />
                      <circle cx="42.8" cy="26" r="0.9" fill="#ffffff" />
                      <circle cx="58" cy="27" r="2.5" className="fill-[#222222] dark:fill-white" />
                      <circle cx="58.8" cy="26" r="0.9" fill="#ffffff" />
                      <polygon points="49,30.5 51,30.5 50,32" className="fill-rose-400" />
                      <path d="M 46 34 Q 48.5 36 50 34 Q 51.5 36 54 34" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.8" fill="none" />
                      <line x1="26" y1="28" x2="34" y2="29" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" />
                      <line x1="66" y1="29" x2="74" y2="28" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.4" />
                    </g>
                  </svg>
                )}

                {/* 6. WELCOMING_STRETCH */}
                {pose === 'welcoming_stretch' && (
                  <svg viewBox="0 0 110 75" className="w-full h-full drop-shadow-sm overflow-visible">
                    <path
                      d="M 22 42 C 14 28, 10 14, 18 8 C 22 4, 26 10, 23 18 C 20 26, 24 34, 28 40"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white animate-cat-tail-swish"
                      strokeWidth="2"
                    />
                    <path
                      d="M 26 44 C 24 30, 42 26, 48 34 C 54 42, 68 54, 82 56 L 68 56 C 54 56, 42 56, 32 58 C 28 58, 28 52, 26 44 Z"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                      strokeWidth="2"
                    />
                    <path d="M 66 54 L 92 63 C 96 64.5, 98 62, 96 60 L 76 52 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                    <g transform="translate(68, 34)">
                      <path d="M 8 16 C 4 25, 28 25, 24 16 C 22 9, 16 7, 8 16 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <path d="M 8 10 L 6 0 L 16 7 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <path d="M 24 10 L 26 0 L 16 7 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <circle cx="12" cy="14" r="1.6" className="fill-[#222222] dark:fill-white" />
                      <circle cx="20" cy="14" r="1.6" className="fill-[#222222] dark:fill-white" />
                    </g>
                  </svg>
                )}

                {/* 7. SLEEPING_LOAF */}
                {pose === 'sleeping_loaf' && (
                  <svg viewBox="0 0 95 60" className="w-full h-full drop-shadow-sm overflow-visible">
                    <path
                      d="M 24 44 C 14 42, 10 30, 20 22 C 28 16, 42 16, 52 20 C 58 22, 60 28, 56 30 C 52 32, 46 26, 38 24 C 28 22, 22 28, 22 36 C 22 42, 26 46, 32 46"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                      strokeWidth="2"
                    />
                    <path
                      d="M 24 38 C 22 24, 62 18, 76 28 C 84 34, 84 48, 74 52 C 60 56, 26 54, 24 38 Z"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white animate-cat-deep-breathe"
                      strokeWidth="2"
                    />
                    <path d="M 52 48 C 56 52, 66 52, 70 48" className="stroke-[#222222] dark:stroke-white" strokeWidth="2" fill="none" />
                    <g transform="translate(60, 26)">
                      <ellipse cx="14" cy="14" rx="13" ry="11" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <path d="M 8 6 L 4 -2 L 14 2 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <path d="M 20 6 L 24 -2 L 16 3 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <path d="M 8 13 Q 11 16 14 13" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.8" fill="none" />
                      <path d="M 16 13 Q 19 16 22 13" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.8" fill="none" />
                    </g>
                  </svg>
                )}

                {/* 8. YAWN_STRETCH */}
                {pose === 'yawn_stretch' && (
                  <svg viewBox="0 0 105 75" className="w-full h-full drop-shadow-sm overflow-visible animate-cat-yawn-stretch">
                    <path
                      d="M 22 42 C 14 30, 10 14, 18 8 C 22 4, 26 10, 23 18 C 20 26, 24 34, 28 40"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                      strokeWidth="2"
                    />
                    <path
                      d="M 26 44 C 24 24, 52 18, 62 28 C 72 38, 76 54, 84 56 L 68 56 C 54 56, 42 56, 32 58 C 28 58, 28 52, 26 44 Z"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                      strokeWidth="2"
                    />
                    <path d="M 68 52 L 92 61 C 96 62.5, 98 60, 96 58 L 78 50 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                    <g transform="translate(70, 28)">
                      <ellipse cx="14" cy="14" rx="12" ry="11" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <path d="M 8 7 L 4 0 L 14 5 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <path d="M 20 7 L 24 0 L 14 5 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <path d="M 8 11 L 12 13 L 8 15" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.6" fill="none" />
                      <path d="M 20 11 L 16 13 L 20 15" className="stroke-[#222222] dark:stroke-white" strokeWidth="1.6" fill="none" />
                      <path d="M 12 17 Q 14 23 16 17 Z" className="fill-rose-400 stroke-[#222222] dark:stroke-white" strokeWidth="1.5" />
                    </g>
                  </svg>
                )}

                {/* 9. PLAYING_YARN (Swatting at Cursor Yarn Ball with Pink Paw Pad) */}
                {pose === 'playing_yarn' && (
                  <svg viewBox="0 0 100 75" className="w-full h-full drop-shadow-sm overflow-visible">
                    <path
                      d="M 22 42 C 12 36, 8 20, 16 14 C 20 10, 25 14, 21 22 C 18 30, 22 38, 26 42"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white animate-cat-tail-wag-lively"
                      strokeWidth="2"
                    />
                    <path
                      d="M 24 44 C 24 30, 64 28, 70 38 C 72 48, 64 54, 46 54 C 30 54, 24 50, 24 44 Z"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                      strokeWidth="2"
                    />
                    <path d="M 28 46 L 28 62 C 28 65, 36 65, 36 62 L 36 46 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                    <path d="M 56 46 L 56 62 C 56 65, 63 65, 63 62 L 63 46 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                    <g className="animate-cat-paw-swat">
                      <path
                        d="M 66 42 C 72 38, 80 40, 84 46 C 85 49, 83 51, 80 50 C 76 49, 72 48, 68 50 Z"
                        className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                        strokeWidth="2"
                      />
                      <ellipse cx="80" cy="46" rx="2.5" ry="2" className="fill-rose-300 dark:fill-rose-400" />
                    </g>
                    <path
                      d="M 62 26 C 58 38, 88 38, 85 26 C 83 16, 72 14, 62 26 Z"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                      strokeWidth="2"
                    />
                    <path d="M 64 20 L 62 6 L 73 15 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                    <path d="M 78 18 L 87 7 L 84 19 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                    <circle cx="70" cy="24" r="2.5" className="fill-[#222222] dark:fill-white" />
                    <circle cx={71 + eyeLook.x * 0.7} cy={23.2 + eyeLook.y * 0.7} r="0.8" fill="#ffffff" />
                    <circle cx="80" cy="24" r="2.5" className="fill-[#222222] dark:fill-white" />
                    <circle cx={81 + eyeLook.x * 0.7} cy={23.2 + eyeLook.y * 0.7} r="0.8" fill="#ffffff" />
                    <polygon points="74.5,27.5 76.5,27.5 75.5,29" className="fill-rose-400" />
                    <path d="M 73 30 Q 75.5 33 78 30 Z" className="fill-rose-400 stroke-[#222222] dark:stroke-white" strokeWidth="1.4" />
                  </svg>
                )}

                {/* 10. JUMPING_CATCH (Detailed Leap with Reach & Pink Paw Beans) */}
                {pose === 'jumping_catch' && (
                  <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-sm overflow-visible">
                    <path
                      d="M 20 54 C 14 58, 8 46, 12 36 C 15 30, 20 38, 18 46 C 17 50, 22 54, 25 54"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white animate-cat-tail-wag-lively"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 24 54 C 28 42, 54 36, 68 32 C 74 38, 72 48, 54 54 C 38 58, 28 58, 24 54 Z"
                      className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path d="M 22 56 L 16 68 C 15 71, 20 72, 22 68 L 28 58 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                    <g>
                      <path d="M 64 34 L 72 16 C 73 13, 78 14, 77 18 L 70 36 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <circle cx="75" cy="15" r="1.8" className="fill-rose-300 dark:fill-rose-400" />
                    </g>
                    <g>
                      <path d="M 58 36 L 62 18 C 63 15, 68 16, 67 20 L 64 38 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <circle cx="65" cy="17" r="1.8" className="fill-rose-300 dark:fill-rose-400" />
                    </g>
                    <g transform="translate(62, 20) rotate(-20)">
                      <ellipse cx="14" cy="14" rx="12" ry="10" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <path d="M 6 8 L 2 0 L 12 5 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <path d="M 18 8 L 22 0 L 14 5 Z" className="fill-white dark:fill-neutral-900 stroke-[#222222] dark:stroke-white" strokeWidth="2" />
                      <circle cx="10" cy="11" r="2.4" className="fill-[#222222] dark:fill-white" />
                      <circle cx={10.6 + eyeLook.x * 0.5} cy={10 + eyeLook.y * 0.5} r="0.8" fill="#ffffff" />
                      <circle cx="18" cy="11" r="2.4" className="fill-[#222222] dark:fill-white" />
                      <circle cx={18.6 + eyeLook.x * 0.5} cy={10 + eyeLook.y * 0.5} r="0.8" fill="#ffffff" />
                      <polygon points="13.5,14 15.5,14 14.5,15.5" className="fill-rose-400" />
                      <path d="M 12 16 Q 14 18.5 16 16 Z" className="fill-rose-400 stroke-[#222222] dark:stroke-white" strokeWidth="1.2" />
                    </g>
                  </svg>
                )}

              </div>
            </div>

            {/* Dynamic Ground Contact Shadow (Reacts in real-time to Jump Height) */}
            <div className="w-16 h-2 flex items-center justify-center pointer-events-none mt-0.5">
              <div
                style={{
                  width: jumpOffset < -4 ? '36px' : '52px',
                  height: jumpOffset < -4 ? '3px' : '5px',
                  opacity: jumpOffset < -4 ? 0.2 : 0.45,
                }}
                className="rounded-full bg-neutral-950/30 dark:bg-white/20 blur-[1px] transition-all duration-150"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
