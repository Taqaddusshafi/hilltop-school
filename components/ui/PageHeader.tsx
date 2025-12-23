'use client'

import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  badge?: string
}

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-24 md:py-32 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl animate-float-reverse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-300/10 rounded-full blur-3xl animate-float-slow"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          {badge && (
            <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <Sparkles className="w-4 h-4 text-green-300" />
              <span className="text-white/90 text-sm font-medium">{badge}</span>
            </div>
          )}
          
          {/* Title */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg ${isLoaded ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
            {title}
          </h1>
          
          {/* Subtitle */}
          {subtitle && (
            <p className={`text-xl md:text-2xl text-green-100 max-w-2xl leading-relaxed ${isLoaded ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      
      {/* Decorative Shapes */}
      <div className="absolute right-10 bottom-1/4 w-16 h-16 border-2 border-white/20 rounded-full hidden lg:block"></div>
      <div className="absolute right-32 top-1/3 w-8 h-8 bg-white/10 rounded-lg rotate-45 hidden lg:block"></div>
    </section>
  )
}
