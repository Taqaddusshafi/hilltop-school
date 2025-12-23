'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Microscope, Palette, Trophy, Award, Users, Target, Sparkles } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

// Icon mapping object
const iconMap = {
  BookOpen,
  Microscope,
  Palette,
  Trophy,
  Award,
  Users,
  Target,
  Sparkles,
}

interface Highlight {
  id: number
  icon_name: string
  title: string
  description: string
  display_order: number
}

interface SectionContent {
  heading: string
  description: string
}

export default function Highlights() {
  const [section, setSection] = useState<SectionContent>({
    heading: "Why Choose Hilltop?",
    description: "We provide a nurturing environment that fosters academic excellence and holistic development"
  })
  
  const [highlights, setHighlights] = useState<Highlight[]>([
    {
      id: 1,
      icon_name: "BookOpen",
      title: "Quality Education",
      description: "Comprehensive curriculum following latest educational standards with focus on conceptual learning.",
      display_order: 1
    },
    {
      id: 2,
      icon_name: "Microscope",
      title: "Modern Labs",
      description: "Well-equipped science, computer, and language labs for practical learning experience.",
      display_order: 2
    },
    {
      id: 3,
      icon_name: "Palette",
      title: "Co-curricular Activities",
      description: "Sports, arts, music, and cultural activities for overall personality development.",
      display_order: 3
    },
    {
      id: 4,
      icon_name: "Trophy",
      title: "Achievements",
      description: "Consistent excellence in academics and extracurricular competitions at state level.",
      display_order: 4
    }
  ])
  
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient()
        
        // Fetch section content
        const { data: sectionData } = await supabase
          .from('section_content')
          .select('heading, description')
          .eq('section_name', 'highlights')
          .eq('is_active', true)
          .single()
        
        if (sectionData) {
          setSection(sectionData)
        }
        
        // Fetch highlights
        const { data: highlightsData } = await supabase
          .from('highlights')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })
        
        if (highlightsData && highlightsData.length > 0) {
          setHighlights(highlightsData)
        }
      } catch (error) {
        console.error('Error fetching highlights:', error)
      }
    }
    
    fetchData()
  }, [])

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute inset-0 pattern-grid opacity-50"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-60 animate-float"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-100 rounded-full blur-3xl opacity-60 animate-float-reverse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            ✨ Our Strengths
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            {section.heading.split(' ').map((word, i) => (
              <span key={i} className={word.toLowerCase() === 'hilltop?' || word.toLowerCase() === 'choose' ? 'gradient-text' : ''}>
                {word}{' '}
              </span>
            ))}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {section.description}
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {highlights.map((item, index) => {
            const IconComponent = iconMap[item.icon_name as keyof typeof iconMap] || BookOpen
            
            return (
              <Card 
                key={item.id} 
                className={`group relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-2xl card-3d ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px] bg-gradient-to-br from-green-400 via-emerald-500 to-green-600">
                  <div className="absolute inset-[2px] bg-white rounded-[10px]"></div>
                </div>
                
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-green-400 to-emerald-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-xl"></div>
                
                <CardHeader className="relative z-10">
                  {/* Icon */}
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg shadow-green-500/25 group-hover:shadow-green-500/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComponent className="text-white relative z-10 group-hover:scale-110 transition-transform duration-300" size={28} />
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {item.description}
                  </CardDescription>
                  
                  {/* Learn More Link */}
                  <div className="mt-4 flex items-center text-green-600 font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm">Learn More</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
                
                {/* Decorative Corner */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
