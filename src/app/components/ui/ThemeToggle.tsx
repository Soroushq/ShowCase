// File: src/app/components/ui/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  if (!mounted) return <div className="w-14 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="group relative w-14 h-7 rounded-full bg-neutral-200 dark:bg-neutral-800 shadow-inner transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 overflow-hidden border border-neutral-300 dark:border-neutral-700"
      aria-label="Toggle Theme"
    >
      {/* Inner Track Texture (Lines) */}
      <div className="absolute inset-0 flex justify-between px-2.5 items-center pointer-events-none opacity-30">
        <div className="w-0.5 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full" />
        <div className="w-0.5 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full" />
      </div>

      {/* Sliding Mechanical Switch */}
      <motion.div
        className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2)] bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-700 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-600 z-10 flex items-center justify-center"
        animate={{
          x: isDark ? 28 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Icon Crossfade */}
        <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
                className="absolute"
                initial={false}
                animate={{ opacity: isDark ? 1 : 0, rotate: isDark ? 0 : -90, scale: isDark ? 1 : 0.5 }}
                transition={{ duration: 0.2 }}
            >
                 <Moon size={12} className="text-white fill-white drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]" />
            </motion.div>
            <motion.div
                className="absolute"
                initial={false}
                animate={{ opacity: !isDark ? 1 : 0, rotate: !isDark ? 0 : 90, scale: !isDark ? 1 : 0.5 }}
                transition={{ duration: 0.2 }}
            >
                <Sun size={12} className="text-neutral-800 fill-neutral-800" />
            </motion.div>
        </div>

        {/* Grip Lines on the Switch */}
        <div className="absolute inset-0 flex items-center justify-center gap-[2px] opacity-0 group-hover:opacity-20 transition-opacity">
           <div className="w-[1px] h-3 bg-black dark:bg-white" />
           <div className="w-[1px] h-3 bg-black dark:bg-white" />
        </div>
      </motion.div>
    </button>
  )
}
