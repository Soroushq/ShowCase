// File: src/app/components/ui/MarvelIntro.tsx
'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { FastForward, Film, Terminal } from 'lucide-react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { useTheme } from 'next-themes'

const PROJECT_FRAMES = [
  { img: '/pics/sqplanner.jpg', tag: 'SQPLANNER // PWA' },
  { img: '/pics/soroushtp.jpg', tag: 'SOROUSHTP // TELEPROMPTER' },
  { img: '/pics/vibemenus.jpg', tag: 'VIBE MENUS // RESTAURANT OS' },
  { img: '/pics/mashhadoc.jpg', tag: 'MASHHADOC // HEALTHTECH' },
  { img: '/pics/pricing.jpg', tag: 'ARAMCONTROL // ERP' },
  { img: '/pics/shop.jpg', tag: 'SOROUSHOP // E-COMMERCE' },
  { img: '/pics/abrishampoosh.jpg', tag: 'ABRISHAMPOOSH // ENTERPRISE' },
  { img: '/pics/barname.jpg', tag: 'BARNAME // NEXT.JS' },
  { img: '/pics/sajfa.jpg', tag: 'SAJFA // SYSTEM' },
]

export function MarvelIntro() {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [frameIndex, setFrameIndex] = useState(0)
  const [phase, setPhase] = useState<'flipping' | 'climax' | 'zoom-out' | 'closed'>('flipping')
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout[]>([])

  const isFa = language === 'fa'
  const isDark = mounted ? resolvedTheme === 'dark' : true

  useEffect(() => {
    setMounted(true)
  }, [])

  const clearAllTimers = useCallback(() => {
    timerRef.current.forEach(clearTimeout)
    timerRef.current = []
  }, [])

  const closeIntro = useCallback(() => {
    clearAllTimers()
    setPhase('closed')
    setTimeout(() => {
      setIsOpen(false)
      try {
        sessionStorage.setItem('marvel_intro_played', 'true')
      } catch {
        // ignore sessionStorage errors in restricted environments
      }
    }, 450)
  }, [clearAllTimers])

  const startIntro = useCallback(() => {
    clearAllTimers()
    setIsOpen(true)
    setPhase('flipping')
    setProgress(0)
    setFrameIndex(0)

    // Rapid frame flipping interval (every 90ms)
    const frameInterval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % PROJECT_FRAMES.length)
    }, 90)

    // Progress bar runner over 3800ms
    const startTime = Date.now()
    const totalDuration = 3800
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const p = Math.min(100, (elapsed / totalDuration) * 100)
      setProgress(p)
      if (elapsed >= totalDuration) {
        clearInterval(progressInterval)
      }
    }, 30)

    // Phase 2: Climax (camera straightens, specular sweep) at 2.8s
    const tClimax = setTimeout(() => {
      setPhase('climax')
    }, 2800)

    // Phase 3: Snap Zoom Out at 3.3s
    const tZoom = setTimeout(() => {
      setPhase('zoom-out')
      clearInterval(frameInterval)
    }, 3300)

    // Phase 4: Close and unmount at 3.8s
    const tClose = setTimeout(() => {
      closeIntro()
      clearInterval(progressInterval)
    }, 3800)

    timerRef.current.push(
      frameInterval as unknown as NodeJS.Timeout,
      progressInterval as unknown as NodeJS.Timeout,
      tClimax,
      tZoom,
      tClose
    )
  }, [clearAllTimers, closeIntro])

  useEffect(() => {
    // Autoplay when user first opens up the site
    try {
      const seen = sessionStorage.getItem('marvel_intro_played')
      if (!seen) {
        startIntro()
      }
    } catch {
      startIntro()
    }

    const handleReplay = () => {
      startIntro()
    }
    window.addEventListener('replay-marvel-intro', handleReplay)

    return () => {
      clearAllTimers()
      window.removeEventListener('replay-marvel-intro', handleReplay)
    }
  }, [startIntro, clearAllTimers])

  if (!isOpen) return null

  const currentFrame = PROJECT_FRAMES[frameIndex]

  return (
    <div
      dir="ltr"
      className={`fixed inset-0 z-[999999] flex items-center justify-center select-none overflow-hidden transition-all duration-700 ease-out ${
        isDark ? 'bg-[#050608] text-white' : 'bg-[#f8f9fa] text-neutral-900'
      } ${
        phase === 'closed'
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Technical Grid matching site theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Cinematic Vignette */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDark 
          ? 'shadow-[inset_0_0_180px_rgba(0,0,0,0.95)]' 
          : 'shadow-[inset_0_0_150px_rgba(0,0,0,0.12)]'
      }`} />

      {/* Rapid Flipping Background Projects in Pure Grayscale */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full filter grayscale contrast-125 brightness-90 dark:brightness-60 opacity-30 dark:opacity-20 transition-all duration-100">
          <Image
            src={currentFrame.img}
            alt="Technical frame"
            fill
            className="object-cover scale-110 blur-[1px]"
            priority
          />
        </div>
      </div>

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

      {/* Skip Button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          type="button"
          onClick={closeIntro}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md text-xs font-mono transition-all duration-200 shadow-lg cursor-pointer ${
            isDark
              ? 'border-neutral-700 bg-neutral-900/80 text-neutral-300 hover:text-white hover:border-neutral-500'
              : 'border-neutral-300 bg-white/80 text-neutral-700 hover:text-black hover:border-neutral-400'
          }`}
        >
          <FastForward className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>{isFa ? 'رد کردن اینترو' : 'SKIP INTRO'}</span>
        </button>
      </div>

      {/* Bottom Progress Bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 z-50 ${isDark ? 'bg-neutral-900' : 'bg-neutral-200'}`}>
        <div
          className="h-full bg-gradient-to-r from-red-600 via-red-500 to-amber-400 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top Film Frame Stamp */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-2 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        <Film className="w-3.5 h-3.5 text-red-500" />
        <span>SQ // ARCHITECT PROD. {String(frameIndex + 1).padStart(2, '0')}</span>
      </div>

      {/* Main 3D Stage Container */}
      <div
        className={`relative flex flex-col items-center justify-center transition-all duration-700 ease-out px-4 ${
          phase === 'flipping'
            ? 'scale-90 sm:scale-100 [transform:perspective(1200px)_rotateY(-12deg)_rotateX(6deg)]'
            : phase === 'climax'
            ? 'scale-100 sm:scale-110 [transform:perspective(1200px)_rotateY(0deg)_rotateX(0deg)]'
            : 'scale-[3.2] opacity-0 blur-md [transform:perspective(1200px)_rotateY(0deg)_rotateX(0deg)]'
        }`}
      >
        {/* Subtle Technological HUD Corner Accents */}
        <div className="relative p-6 sm:p-10 flex flex-col items-center">
          
          {/* Top Frame corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500/70" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500/70" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-500/70" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500/70" />

          {/* Subtitle Tag */}
          <div className="mb-2 sm:mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] uppercase text-neutral-500 dark:text-neutral-400">
              {currentFrame.tag}
            </span>
          </div>

          {/* The Name Itself in RED with Adaptive Outer Glow:
              - White outer glow in dark mode
              - Dark outer glow in bright mode
              - NO red background!
          */}
          <div className="relative py-2 sm:py-4">
            {/* Specular Light Flare Sweep */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              <div className="absolute top-0 bottom-0 w-36 bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12 animate-marvel-sweep" />
            </div>

            <h1
              className={`text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter leading-none select-none transition-all duration-300 ${
                isDark ? 'animatic-name-dark' : 'animatic-name-light'
              }`}
            >
              {isFa ? 'SOROUSH' : 'SOROUSH'}
            </h1>
          </div>

          {/* Sleek Minimalist Sub-Bar matching the site */}
          <div className={`mt-3 sm:mt-5 flex items-center justify-between w-full max-w-md px-4 py-2 border rounded-md backdrop-blur-md ${
            isDark 
              ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300' 
              : 'border-neutral-200 bg-white/70 text-neutral-700'
          }`}>
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-red-500" />
              <span className="text-[10px] sm:text-xs font-mono font-black tracking-widest uppercase">
                {isFa ? 'سروش قاری • معمار نرم‌افزار' : 'FULL-STACK ARCHITECT // QARY'}
              </span>
            </div>

            <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-red-500 font-bold uppercase">
              {isFa ? 'نوآوری وب' : 'SYS // 2026'}
            </span>
          </div>

        </div>

        {/* Bottom Tagline */}
        <div className="mt-4 text-center">
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
            {isFa ? 'طراحی و ساخت وب‌اپلیکیشن‌های نسل بعد' : 'CRAFTING PRODUCTION DIGITAL ARCHITECTURE'}
          </span>
        </div>
      </div>
    </div>
  )
}
