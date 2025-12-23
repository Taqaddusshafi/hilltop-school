'use client'

import { useEffect, useState, useRef } from 'react'
import { GraduationCap, Microscope, Palette, Code, Music, Users, ChevronRight, Sparkles, BookOpen, Trophy, Target, Beaker } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const iconMap: { [key: string]: any } = {
  GraduationCap,
  Microscope,
  Palette,
  Code,
  Music,
  Users,
  BookOpen,
  Trophy,
  Target,
  Beaker,
}

const colorSchemes = [
  { color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50" },
  { color: "from-emerald-500 to-green-500", bgColor: "bg-emerald-50" },
  { color: "from-purple-500 to-violet-500", bgColor: "bg-purple-50" },
  { color: "from-orange-500 to-amber-500", bgColor: "bg-orange-50" },
  { color: "from-rose-500 to-pink-500", bgColor: "bg-rose-50" },
  { color: "from-teal-500 to-cyan-500", bgColor: "bg-teal-50" },
]

interface Program {
  id: number
  icon_name: string
  title: string
  grades: string
  description: string
  students_count: string
  display_order: number
}

interface SectionContent {
  heading: string
  description: string
  badge_text: string
}

export default function Programs() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [section, setSection] = useState<SectionContent>({
    heading: "Our Programs & Facilities",
    description: "Comprehensive education programs designed to nurture every aspect of student development",
    badge_text: "Academic Excellence"
  })
  const [programs, setPrograms] = useState<Program[]>([
    { id: 1, icon_name: "GraduationCap", title: "Primary Education", grades: "Nursery - Class 5", description: "Building strong foundations with interactive learning, phonics, and activity-based education.", students_count: "500+", display_order: 1 },
    { id: 2, icon_name: "Microscope", title: "Secondary Education", grades: "Class 6 - Class 10", description: "Comprehensive curriculum with science labs, practical learning, and board exam preparation.", students_count: "800+", display_order: 2 },
    { id: 3, icon_name: "Code", title: "Computer Science", grades: "All Classes", description: "Modern computer labs with latest technology, coding fundamentals, and digital literacy.", students_count: "600+", display_order: 3 },
    { id: 4, icon_name: "Palette", title: "Arts & Culture", grades: "All Classes", description: "Creative arts, traditional crafts, painting, and cultural activities for holistic development.", students_count: "400+", display_order: 4 },
    { id: 5, icon_name: "Music", title: "Music & Sports", grades: "All Classes", description: "Musical instruments, vocal training, indoor & outdoor sports facilities for physical growth.", students_count: "350+", display_order: 5 },
    { id: 6, icon_name: "Users", title: "Student Activities", grades: "All Classes", description: "Clubs, competitions, leadership programs, and community service initiatives.", students_count: "700+", display_order: 6 }
  ])
  const sectionRef = useRef<HTMLElement>(null)

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient()
        
        // Fetch section content
        const { data: sectionData } = await supabase
          .from('section_content')
          .select('heading, description, badge_text')
          .eq('section_name', 'programs')
          .eq('is_active', true)
          .single()
        
        if (sectionData) {
          setSection(sectionData)
        }
        
        // Fetch programs
        const { data: programsData } = await supabase
          .from('programs')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })
        
        if (programsData && programsData.length > 0) {
          setPrograms(programsData)
        }
      } catch (error) {
        console.error('Error fetching programs:', error)
      }
    }
    
    fetchData()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 pattern-grid opacity-30"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-green-200/40 to-emerald-200/40 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl animate-float-reverse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-5 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-green-700 font-semibold text-sm">{section.badge_text}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {section.heading.split(' ').map((word, i) => (
              <span key={i} className={word.toLowerCase() === 'programs' ? 'gradient-text' : ''}>
                {word}{' '}
              </span>
            ))}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {section.description}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, index) => {
            const IconComponent = iconMap[program.icon_name] || GraduationCap
            const colorScheme = colorSchemes[index % colorSchemes.length]
            const isHovered = hoveredId === program.id
            
            return (
              <div
                key={program.id}
                className={`group relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredId(program.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Gradient Border on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
                <div className="absolute inset-[2px] bg-white rounded-[14px]"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`relative w-16 h-16 mb-6 ${colorScheme.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    <IconComponent className={`w-8 h-8 relative z-10 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-700'}`} />
                  </div>
                  
                  {/* Title & Grades */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-900">
                    {program.title}
                  </h3>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-gradient-to-r ${colorScheme.color} text-white`}>
                    {program.grades}
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{program.students_count} Students</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Learn More</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All CTA */}
        <div className={`text-center mt-12 ${isVisible ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
          <Link 
            href="/academics"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 transition-all duration-300 btn-shine"
          >
            Explore All Programs
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
