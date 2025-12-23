'use client'

import { useEffect, useState, useRef } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

interface Testimonial {
  id: number
  name: string
  role: string
  photo_url: string | null
  rating: number
  testimonial_text: string
  display_order: number
}

interface SectionContent {
  heading: string
  highlight_text: string
  description: string
  badge_text: string
}

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [section, setSection] = useState<SectionContent>({
    heading: "What Our",
    highlight_text: "Community",
    description: "Hear from parents, students, and alumni about their experience at Hilltop",
    badge_text: "Trusted by Families"
  })
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { id: 1, name: "Dr. Farooq Ahmed", role: "Parent of Class 10 Student", photo_url: null, rating: 5, testimonial_text: "Hilltop has been a transformative experience for my child. The teachers are dedicated, and the holistic approach to education is exactly what we were looking for. My son's academic and personal growth has been remarkable.", display_order: 1 },
    { id: 2, name: "Mehreen Akhtar", role: "Parent of Class 7 Student", photo_url: null, rating: 5, testimonial_text: "The blend of modern education with strong values is what sets Hilltop apart. My daughter loves going to school every day. The extra-curricular activities have helped her discover new talents.", display_order: 2 },
    { id: 3, name: "Arshad Hussain", role: "Alumni - Batch 2020", photo_url: null, rating: 5, testimonial_text: "Hilltop shaped my future. The foundation I received here helped me excel in my higher studies. The teachers were not just educators but mentors who believed in every student's potential.", display_order: 3 },
    { id: 4, name: "Saima Bano", role: "Parent of Class 5 Student", photo_url: null, rating: 5, testimonial_text: "We moved from the city specifically for Hilltop. The peaceful environment, quality infrastructure, and dedicated faculty made it the perfect choice. Our child is thriving here.", display_order: 4 }
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
          .select('heading, highlight_text, description, badge_text')
          .eq('section_name', 'testimonials')
          .eq('is_active', true)
          .single()
        
        if (sectionData) {
          setSection(sectionData)
        }
        
        // Fetch testimonials
        const { data: testimonialData } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })
        
        if (testimonialData && testimonialData.length > 0) {
          setTestimonials(testimonialData)
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
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

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const goToPrev = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  if (testimonials.length === 0) return null

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900"></div>
      
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.343 0L13.857 8.485 15.272 9.9l9.9-9.9h-2.83zM32 0l-3.486 3.485L30 4.97 34.97 0H32zM0 5.373l.828-.83L2.243 5.96 0 8.2V5.374zm0 5.656l.828.83 2.243-2.244L0 6.857v4.172zM0 16.686l.828-.83L7.9 22.93l-1.414 1.414L0 17.857v-1.17zm0 5.657l.828.83 9.9-9.9L9.314 11.86 0 21.172v1.17zM60 5.373l-.828-.83-2.243 2.244L60 8.2V5.374zM60 11.03l-.828-.83-2.243 2.243L60 15.2v-4.172zm0 5.657l-.828.828L51.1 9.444l1.414-1.414L60 15.858v.83zm0 5.656l-.828-.828-9.9 9.9 1.414 1.414L60 22.342v-.001z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl animate-float-reverse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white font-semibold text-sm">{section.badge_text}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {section.heading} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">{section.highlight_text}</span> Says
          </h2>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            {section.description}
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className={`max-w-4xl mx-auto ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          <div className="relative">
            {/* Main Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
              {/* Quote Icon */}
              <div className="absolute -top-6 left-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="pt-4">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[activeIndex]?.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                {/* Text */}
                <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-8">
                  "{testimonials[activeIndex]?.testimonial_text}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  {testimonials[activeIndex]?.photo_url ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      <Image
                        src={testimonials[activeIndex].photo_url!}
                        alt={testimonials[activeIndex].name}
                        width={56}
                        height={56}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[activeIndex]?.name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-white text-lg">{testimonials[activeIndex]?.name}</div>
                    <div className="text-green-200 text-sm">{testimonials[activeIndex]?.role}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false)
                      setActiveIndex(index)
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'w-8 bg-gradient-to-r from-green-400 to-emerald-400' 
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={goToPrev}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
