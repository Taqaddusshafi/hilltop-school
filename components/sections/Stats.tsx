'use client'

import { Users, BookOpen, Award, GraduationCap, School, Trophy, Star, Target } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

// Icon mapping object
const iconMap = {
  Users,
  BookOpen,
  Award,
  GraduationCap,
  School,
  Trophy,
  Star,
  Target,
}

interface Stat {
  id: number
  icon_name: string
  value: string
  label: string
  display_order: number
}

// Animated counter hook
function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!start) return
    
    let startTime: number
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, start])
  
  return count
}

// Extract number from value string
function extractNumber(value: string): number {
  const match = value.match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

// Single stat card component
function StatCard({ stat, index, isVisible }: { stat: Stat; index: number; isVisible: boolean }) {
  const IconComponent = iconMap[stat.icon_name as keyof typeof iconMap] || Users
  const numericValue = extractNumber(stat.value)
  const suffix = stat.value.replace(/\d+/, '').trim()
  const animatedValue = useCountUp(numericValue, 2000, isVisible)
  
  return (
    <div 
      className={`group relative text-center p-8 rounded-2xl glass-card card-lift ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Gradient Background on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Icon Container */}
      <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-shadow"></div>
        <IconComponent className="relative text-white z-10 group-hover:scale-110 transition-transform duration-300" size={32} />
      </div>
      
      {/* Animated Value */}
      <div className="text-4xl md:text-5xl font-bold mb-3">
        <span className="gradient-text">{animatedValue}</span>
        <span className="gradient-text">{suffix}</span>
      </div>
      
      {/* Label */}
      <div className="text-gray-600 font-semibold text-lg relative">
        {stat.label}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  )
}

export default function Stats() {
  const [stats, setStats] = useState<Stat[]>([
    { id: 1, icon_name: "Users", value: "2000+", label: "Students", display_order: 1 },
    { id: 2, icon_name: "BookOpen", value: "50+", label: "Qualified Teachers", display_order: 2 },
    { id: 3, icon_name: "Award", value: "100+", label: "Awards Won", display_order: 3 },
    { id: 4, icon_name: "GraduationCap", value: "95%", label: "Success Rate", display_order: 4 }
  ])
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Fetch data from Supabase
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('stats')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })
        
        if (data && data.length > 0) {
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }
    
    fetchStats()
  }, [])

  // Intersection Observer for scroll animation
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-gradient"></div>
      <div className="absolute inset-0 pattern-dots"></div>
      
      {/* Floating Decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl animate-float-reverse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            Our Achievements
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Numbers That <span className="gradient-text">Speak</span> For Us
          </h2>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
