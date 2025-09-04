'use client'

import { useParallax } from '@/app/hooks/useScrollAnimation'
import { useEffect, useState } from 'react'

interface ParallaxBackgroundProps {
  className?: string
  children?: React.ReactNode
  variant?: 'gradient' | 'geometric' | 'organic' | 'minimal'
}

export function ParallaxBackground({ 
  className = '', 
  children, 
  variant = 'gradient' 
}: ParallaxBackgroundProps) {
  const scrollY = useParallax()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className={className}>{children}</div>

  const renderPattern = () => {
    switch (variant) {
      case 'geometric':
        return (
          <div className="absolute inset-0">
            <div 
              className="absolute top-10 left-10 w-32 h-32 bg-purple-500/5 dark:bg-green-500/5 rounded-lg rotate-45"
              style={{ transform: `translateY(${scrollY * 0.1}px) rotate(45deg)` }}
            />
            <div 
              className="absolute top-40 right-20 w-24 h-24 bg-purple-500/8 dark:bg-green-500/8 rounded-full"
              style={{ transform: `translateY(${scrollY * -0.05}px)` }}
            />
            <div 
              className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-500/3 dark:bg-green-500/3 rounded-2xl rotate-12"
              style={{ transform: `translateY(${scrollY * 0.15}px) rotate(12deg)` }}
            />
          </div>
        )
      
      case 'organic':
        return (
          <div className="absolute inset-0">
            <div 
              className="absolute top-20 left-16 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-purple-500/5 dark:from-green-500/10 dark:to-green-500/5 rounded-full blur-3xl"
              style={{ 
                transform: `translateY(${scrollY * 0.2}px)`,
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
              }}
            />
            <div 
              className="absolute top-64 right-12 w-48 h-48 bg-gradient-to-l from-purple-500/8 to-purple-500/3 dark:from-green-500/8 dark:to-green-500/3 rounded-full blur-2xl"
              style={{ 
                transform: `translateY(${scrollY * -0.1}px)`,
                borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%'
              }}
            />
          </div>
        )
      
      case 'minimal':
        return (
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-30">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(147, 51, 234, 0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(147, 51, 234, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }} />
            </div>
            <div 
              className="absolute top-1/4 left-1/3 w-2 h-2 bg-purple-500 dark:bg-green-500 rounded-full"
              style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            />
            <div 
              className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-500/70 dark:bg-green-500/70 rounded-full"
              style={{ transform: `translateY(${scrollY * -0.2}px)` }}
            />
          </div>
        )
      
      default: // gradient
        return (
          <div className="absolute inset-0">
            <div 
              className="absolute top-16 left-8 w-72 h-72 bg-purple-500/10 dark:bg-green-500/10 rounded-full blur-3xl animate-pulse"
              style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            />
            <div 
              className="absolute top-40 right-16 w-96 h-96 bg-purple-500/5 dark:bg-green-500/5 rounded-full blur-3xl animate-pulse"
              style={{ 
                transform: `translateY(${scrollY * -0.1}px)`,
                animationDelay: '2s'
              }}
            />
            <div 
              className="absolute bottom-32 left-1/3 w-64 h-64 bg-purple-500/8 dark:bg-green-500/8 rounded-full blur-3xl animate-pulse"
              style={{ 
                transform: `translateY(${scrollY * 0.3}px)`,
                animationDelay: '4s'
              }}
            />
          </div>
        )
    }
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {renderPattern()}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}