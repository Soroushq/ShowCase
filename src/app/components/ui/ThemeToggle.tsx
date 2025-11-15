'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'

export default function ThemeToggle() {
  const { setTheme, resolvedTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log('Theme Debug - Current theme:', theme, 'Resolved theme:', resolvedTheme)
  }, [theme, resolvedTheme])

  if (!mounted) {
    return (
      <button
        className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"
        aria-label="Loading theme toggle"
        disabled
      />
    )
  }

  const cycleTheme = () => {
    console.log('Before cycle - Theme:', theme, 'Resolved:', resolvedTheme)
    if (theme === 'system') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('system')
    }
    console.log('After cycle - New theme should be:', theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system')
  }

  const getCurrentThemeIcon = () => {
    if (theme === 'system') {
      return <Monitor className="w-5 h-5 text-gray-600 dark:text-gray-300" />
    } else if (theme === 'light') {
      return <Sun className="w-5 h-5 text-yellow-500" />
    } else {
      return <Moon className="w-5 h-5 text-blue-400" />
    }
  }

  const getNextTheme = () => {
    if (theme === 'system') return 'light'
    if (theme === 'light') return 'dark'
    return 'system'
  }

  return (
    <button
      onClick={cycleTheme}
      aria-label={`Switch to ${getNextTheme()} theme`}
      title={`Current: ${theme} - Click for ${getNextTheme()}`}
      className="
        p-3 rounded-xl transition-all duration-300
        bg-gray-100 dark:bg-gray-800
        hover:bg-gray-200 dark:hover:bg-gray-700
        border border-gray-300 dark:border-gray-600
        shadow-md hover:shadow-lg
        flex items-center justify-center
      "
    >
      {getCurrentThemeIcon()}
    </button>
  )
}