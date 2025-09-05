'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

/**
 * ThemeToggle button to manually switch between light and dark themes.
 * Works with system theme detection + user overrides.
 */
export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Fix hydration mismatch by waiting until client mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse"
        aria-label="Loading theme toggle"
        disabled
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="
        p-2 rounded-full transition-all duration-300
        bg-gray-200 dark:bg-gray-800
        hover:bg-gray-300 dark:hover:bg-gray-700
        border border-gray-300 dark:border-gray-600
        shadow-md hover:shadow-lg
      "
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-yellow-500 transition-transform duration-300" />
      ) : (
        <Moon className="w-6 h-6 text-blue-600 transition-transform duration-300" />
      )}
    </button>
  )
}
