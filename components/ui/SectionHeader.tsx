'use client'

import { useEffect, useState, useRef } from 'react'

interface SectionHeaderProps {
  badge?: string
  title: string
  highlightWord?: string
  description?: string
  centered?: boolean
}

export default function SectionHeader({ 
  badge, 
  title, 
  highlightWord, 
  description, 
  centered = true 
}: SectionHeaderProps) {
  const [isVisible, setIsVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Process title to highlight specific word
  const renderTitle = () => {
    if (!highlightWord) return title
    
    const parts = title.split(new RegExp(`(${highlightWord})`, 'gi'))
    return parts.map((part, i) => 
      part.toLowerCase() === highlightWord?.toLowerCase() 
        ? <span key={i} className="gradient-text">{part}</span>
        : part
    )
  }

  return (
    <div 
      ref={headerRef}
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
    >
      {badge && (
        <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-5 py-2 mb-6 ${centered ? 'mx-auto' : ''}`}>
          <span className="text-green-700 font-semibold text-sm">{badge}</span>
        </div>
      )}
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {renderTitle()}
      </h2>
      
      {description && (
        <p className={`text-gray-600 text-lg ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
      
      {/* Accent Line */}
      <div className={`mt-6 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full ${centered ? 'mx-auto' : ''}`}></div>
    </div>
  )
}
