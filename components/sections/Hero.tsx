'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Play, Award, Users, Calendar, Phone } from 'lucide-react'

interface HeroData {
  title: string
  subtitle: string
  description: string
  background_color_from?: string
  background_color_via?: string
  background_color_to?: string
  badge_text?: string
  phone?: string
  admission_deadline?: string
  quick_stat_1_value?: string
  quick_stat_1_label?: string
  quick_stat_2_value?: string
  quick_stat_2_label?: string
  quick_stat_3_value?: string
  quick_stat_3_label?: string
}

interface HeroImage {
  id: number
  image_url: string
  title?: string | null
  caption?: string | null
  display_order: number
  is_active: boolean
}

interface HeroProps {
  heroData: HeroData | null
  heroImages: HeroImage[]
}

export default function Hero({ heroData, heroImages }: HeroProps) {
  const hero: HeroData = heroData || {
    title: "Welcome to Hilltop Educational Institute",
    subtitle: "Empowering Minds, Building Futures Since 1995",
    description: "Located in the heart of Darend, Ganderbal, we provide quality education with modern facilities, experienced faculty, and a nurturing environment for holistic development.",
    background_color_from: "green-900",
    background_color_via: "green-700",
    background_color_to: "emerald-800",
    badge_text: "Admissions Open for 2025-26",
    phone: "+91 98765 43210",
    admission_deadline: "31st March 2025",
    quick_stat_1_value: "2000+",
    quick_stat_1_label: "Students",
    quick_stat_2_value: "30+",
    quick_stat_2_label: "Years",
    quick_stat_3_value: "95%",
    quick_stat_3_label: "Pass Rate"
  }

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const hasImages = heroImages && heroImages.length > 0

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Autoplay functionality
  useEffect(() => {
    if (!hasImages || heroImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === heroImages.length - 1 ? 0 : prev + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [hasImages, heroImages])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? heroImages.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentSlide((prev) => 
      prev === heroImages.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <section className="relative min-h-[700px] md:min-h-[800px] flex items-center overflow-hidden">
      {/* Animated Background */}
      {hasImages ? (
        <>
          <div className="absolute inset-0">
            {heroImages.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              >
                <Image
                  src={image.image_url}
                  alt={image.title || `Hero background ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>

          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 z-[1]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 z-[1]"></div>
          
          {/* Animated Mesh Gradient */}
          <div className="absolute inset-0 opacity-40 z-[1]">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/30 rounded-full blur-[120px] animate-float"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-400/25 rounded-full blur-[100px] animate-float-reverse"></div>
            <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-cyan-400/20 rounded-full blur-[80px] animate-float-slow"></div>
          </div>

          {heroImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-[3] w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 group border border-white/20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:text-green-300 transition-colors" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-[3] w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 group border border-white/20"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:text-green-300 transition-colors" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex gap-3">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      index === currentSlide 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-400 w-12 shadow-lg shadow-green-400/50' 
                        : 'bg-white/40 hover:bg-white/60 w-2.5'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-green-900 to-gray-900">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-800/50 via-transparent to-emerald-600/30"></div>
          </div>
          
          {/* Floating Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-green-500/25 rounded-full blur-[100px] animate-float"></div>
            <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[120px] animate-float-reverse"></div>
            <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-green-300/15 rounded-full blur-[80px] animate-float-slow"></div>
          </div>
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </>
      )}
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 mb-8 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 text-sm font-medium">{hero.badge_text || 'Admissions Open for 2025-26'}</span>
            </div>
            
            {/* Title */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-[1.1] text-white ${isLoaded ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
              {hero.title.split(' ').map((word, i) => (
                <span 
                  key={i} 
                  className={
                    word.toLowerCase() === 'hilltop' || word.toLowerCase() === 'welcome' 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-green-300' 
                      : ''
                  }
                >
                  {word}{' '}
                </span>
              ))}
            </h1>
            
            <p className={`text-xl md:text-2xl mb-6 text-white/90 font-light ${isLoaded ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
              {hero.subtitle}
            </p>
            
            <p className={`text-lg mb-10 text-white/75 max-w-xl leading-relaxed ${isLoaded ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
              {hero.description}
            </p>
            
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 mb-12 ${isLoaded ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
              <Button 
                size="lg" 
                asChild 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-2xl shadow-green-500/30 border-0 text-base px-8 py-7 rounded-xl group"
              >
                <Link href="/admissions" className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Apply for Admission
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 shadow-xl transition-all duration-300 text-base px-8 py-7 rounded-xl group"
              >
                <Link href="/about" className="flex items-center gap-2">
                  Explore More
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className={`flex flex-wrap gap-6 ${isLoaded ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{hero.quick_stat_1_value || '2000+'}</p>
                  <p className="text-xs text-white/60">{hero.quick_stat_1_label || 'Students'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <Award className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{hero.quick_stat_2_value || '30+'}</p>
                  <p className="text-xs text-white/60">{hero.quick_stat_2_label || 'Years'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <Calendar className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{hero.quick_stat_3_value || '95%'}</p>
                  <p className="text-xs text-white/60">{hero.quick_stat_3_label || 'Pass Rate'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Info Card (Desktop only) */}
          <div className={`hidden lg:block ${isLoaded ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-2xl"></div>
              
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-green-400" />
                  Quick Contact
                </h3>
                
                <div className="space-y-4 mb-6">
                  <a href={`tel:${(hero.phone || '+919876543210').replace(/\s/g, '')}`} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Call Us Now</p>
                      <p className="text-white font-semibold group-hover:text-green-300 transition-colors">{hero.phone || '+91 98765 43210'}</p>
                    </div>
                  </a>
                  
                  <Link href="/admissions" className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl hover:from-green-500/30 hover:to-emerald-500/30 transition-colors group border border-green-500/30">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white/60">Admission Deadline</p>
                      <p className="text-white font-semibold">{hero.admission_deadline || '31st March 2025'}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                <div className="pt-6 border-t border-white/10">
                  <p className="text-white/60 text-sm mb-3">Follow Us</p>
                  <div className="flex gap-3">
                    <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-500/20 transition-colors">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-pink-500/20 transition-colors">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-colors">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-[2]"></div>
      
      {/* Decorative Shapes */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 z-[1] hidden xl:block pointer-events-none">
        <div className="absolute top-1/4 right-20 w-24 h-24 border-2 border-white/10 rounded-full animate-float"></div>
        <div className="absolute top-1/2 right-40 w-16 h-16 bg-green-400/10 rounded-lg rotate-45 animate-float-reverse"></div>
        <div className="absolute bottom-1/4 right-24 w-20 h-20 border-2 border-emerald-300/15 rounded-lg animate-float-slow"></div>
      </div>
    </section>
  )
}
