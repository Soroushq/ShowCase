// File: src/app/components/ui/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Star } from 'lucide-react'

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Show toast on mount to inform user of current theme
    setShowToast(true)
    const timer = setTimeout(() => setShowToast(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    
    // Show toast on toggle
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  if (!mounted) {
    return (
      <div className="w-14 h-7 rounded-full animate-pulse bg-gray-200 dark:bg-gray-700" />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <>
      {/* Animated Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        dir="ltr"
        className="relative w-14 h-7 rounded-full p-0.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-green-500 flex-shrink-0 overflow-hidden"
        style={{
          backgroundColor: isDark ? '#1e293b' : '#38bdf8'
        }}
        whileTap={{ scale: 0.95 }}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {/* Background gradient */}
        <div 
          className="absolute inset-0 rounded-full transition-opacity duration-300"
          style={{
            background: isDark 
              ? 'linear-gradient(to right, #1e293b, #334155)' 
              : 'linear-gradient(to right, #38bdf8, #0ea5e9)',
            opacity: 0.8
          }}
        />

        {/* Stars (Dark mode only) */}
        <AnimatePresence>
          {isDark && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="absolute top-1 left-2"
              >
                <Star size={3} className="text-yellow-200 fill-yellow-200" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="absolute top-2.5 left-3.5"
              >
                <Star size={2} className="text-yellow-100 fill-yellow-100" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="absolute bottom-1.5 left-2.5"
              >
                <Star size={2.5} className="text-yellow-200 fill-yellow-200" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Sliding toggle */}
        <motion.div
          className="relative w-6 h-6 rounded-full shadow-lg flex items-center justify-center z-10"
          animate={{
            x: isDark ? 26 : 0,
            backgroundColor: isDark ? '#fbbf24' : '#fef3c7',
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        >
          {/* Sun/Moon Icon */}
          <AnimatePresence mode="wait">
            {!isDark ? (
              <motion.div
                key="sun"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 180, scale: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Sun size={13} className="text-orange-500" strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -180, scale: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Moon size={13} className="text-slate-700" strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: isDark 
                ? '0 0 8px rgba(251, 191, 36, 0.5)' 
                : '0 0 8px rgba(249, 115, 22, 0.5)'
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Cloud (Light mode only) */}
        <AnimatePresence>
          {!isDark && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 0.6, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.3 }}
              className="absolute right-0.5 top-1/2 -translate-y-1/2"
            >
              <svg width="14" height="10" viewBox="0 0 16 12" fill="none" className="text-white">
                <path 
                  d="M12 6C12 4.89543 11.1046 4 10 4C9.88991 4 9.78143 4.00803 9.67546 4.02344C9.27713 2.28539 7.74835 1 5.93333 1C3.75421 1 2 2.79086 2 5C2 5.34482 2.03571 5.68103 2.10345 6.00483C0.878571 6.27586 0 7.41379 0 8.77778C0 10.0089 0.878571 11 2 11H13.3333C14.8061 11 16 9.88889 16 8.5C16 7.17778 14.9394 6.11111 13.6061 6.00556C13.3636 6.00185 12.5152 6 12 6Z" 
                  fill="currentColor"
                  fillOpacity="0.4"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl backdrop-blur-md border pointer-events-none"
            style={{
              backgroundColor: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderColor: isDark ? 'rgba(71, 85, 105, 0.5)' : 'rgba(209, 213, 219, 0.5)',
            }}
          >
            <motion.div
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {isDark ? (
                <Moon className="w-5 h-5 text-blue-400" />
              ) : (
                <Sun className="w-5 h-5 text-orange-500" />
              )}
            </motion.div>
            <span 
              className="font-semibold text-sm whitespace-nowrap"
              style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
            >
              {isDark ? 'Dark mode active' : 'Light mode active'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
