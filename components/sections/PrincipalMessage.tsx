'use client'

import { useEffect, useState, useRef } from 'react'
import { Quote, Award, BookOpen, Users, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

interface PrincipalData {
  badge_text: string
  heading: string
  highlight_text: string
  quote_text: string
  message_text: string
  principal_name: string
  principal_title: string
  principal_initials: string
  photo_url: string | null
  experience_years: string
  alumni_count: string
  awards_count: string
}

export default function PrincipalMessage() {
  const [isVisible, setIsVisible] = useState(false)
  const [principalData, setPrincipalData] = useState<PrincipalData>({
    badge_text: "From the Principal's Desk",
    heading: "A Message of",
    highlight_text: "Hope & Excellence",
    quote_text: "At Hilltop Educational Institute, we believe every child is blessed with unique talents and potential. Our mission is to nurture these gifts through a blend of academic excellence, moral values, and practical skills.",
    message_text: "For over two decades, we have been committed to providing an education that goes beyond textbooks. We focus on building character, fostering creativity, and preparing our students to face the challenges of the modern world with confidence and integrity.",
    principal_name: "Mohammad Hussain",
    principal_title: "Principal, Hilltop Educational Institute",
    principal_initials: "MH",
    photo_url: null,
    experience_years: "25+",
    alumni_count: "10K+",
    awards_count: "100+"
  })
  const sectionRef = useRef<HTMLElement>(null)

  // Fetch data from Supabase
  useEffect(() => {
    const fetchPrincipalData = async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('principal_message')
          .select('*')
          .eq('is_active', true)
          .single()
        
        if (data) {
          setPrincipalData(data)
        }
      } catch (error) {
        console.error('Error fetching principal data:', error)
      }
    }
    
    fetchPrincipalData()
  }, [])

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
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-green-50"></div>
      <div className="absolute inset-0 pattern-dots opacity-20"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-50 to-transparent"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-100/50 rounded-full blur-3xl animate-float"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Section */}
          <div className={`relative ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl rotate-3 opacity-20"></div>
              <div className="absolute -inset-4 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl -rotate-3 opacity-10"></div>
              
              {/* Image Container */}
              <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
                {principalData.photo_url ? (
                  <Image
                    src={principalData.photo_url}
                    alt={principalData.principal_name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-600 to-emerald-700">
                    <div className="text-center text-white">
                      <div className="w-32 h-32 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center text-5xl font-bold">
                        {principalData.principal_initials}
                      </div>
                      <p className="text-lg font-medium opacity-80">Principal</p>
                    </div>
                  </div>
                )}
                
                {/* Quote Badge */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg flex items-center justify-center rotate-12">
                  <Quote className="w-10 h-10 text-white -rotate-12" />
                </div>
              </div>
              
              {/* Experience Badge */}
              <div className="absolute -left-6 top-1/4 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{principalData.experience_years}</div>
                    <div className="text-sm text-gray-500">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className={isVisible ? 'animate-fade-in-right' : 'opacity-0'}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-semibold text-sm">{principalData.badge_text}</span>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {principalData.heading} <span className="gradient-text">{principalData.highlight_text}</span>
            </h2>
            
            {/* Quote */}
            <div className="relative mb-8">
              <Quote className="absolute -top-4 -left-4 w-12 h-12 text-green-200" />
              <p className="text-lg text-gray-600 leading-relaxed pl-8 italic">
                {principalData.quote_text}
              </p>
            </div>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              {principalData.message_text}
            </p>
            
            {/* Principal Info */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {principalData.principal_initials}
              </div>
              <div>
                <div className="font-bold text-gray-900 text-lg">{principalData.principal_name}</div>
                <div className="text-green-600 font-medium">{principalData.principal_title}</div>
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: BookOpen, value: principalData.experience_years, label: "Years" },
                { icon: Users, value: principalData.alumni_count, label: "Alumni" },
                { icon: Award, value: principalData.awards_count, label: "Awards" }
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
