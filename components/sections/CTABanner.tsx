'use client'

import { useEffect, useState, useRef } from 'react'
import { ArrowRight, GraduationCap, Phone, Calendar } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface CTAData {
  badge_text: string
  heading: string
  highlight_text: string
  description: string
  classes_info: string
  start_date: string
  button_text: string
  button_link: string
  phone: string
}

export default function CTABanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [ctaData, setCtaData] = useState<CTAData>({
    badge_text: "Admissions Open 2025-26",
    heading: "Give Your Child the",
    highlight_text: "Best Start",
    description: "Join our community of learners and discover how Hilltop can shape your child's future with quality education and values.",
    classes_info: "Nursery to Class 12",
    start_date: "March 2025",
    button_text: "Apply Now",
    button_link: "/admissions",
    phone: "+919876543210"
  })
  const sectionRef = useRef<HTMLElement>(null)

  // Fetch data from Supabase
  useEffect(() => {
    const fetchCTAData = async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('cta_banner')
          .select('*')
          .eq('is_active', true)
          .single()
        
        if (data) {
          setCtaData(data)
        }
      } catch (error) {
        console.error('Error fetching CTA data:', error)
      }
    }
    
    fetchCTAData()
  }, [])

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
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700"></div>
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute top-0 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-0 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-float-reverse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center justify-between gap-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium text-sm">{ctaData.badge_text}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {ctaData.heading}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">{ctaData.highlight_text}</span> in Life
            </h2>
            
            <p className="text-green-100 text-lg mb-8">
              {ctaData.description}
            </p>
            
            {/* Quick Info */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Classes Start: {ctaData.start_date}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                <span>{ctaData.classes_info}</span>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={ctaData.button_link}
              className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 btn-shine text-lg"
            >
              {ctaData.button_text}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`tel:${ctaData.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-green-700 transition-all duration-300 text-lg"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
