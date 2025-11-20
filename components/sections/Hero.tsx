'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

interface HeroData {
  title: string
  subtitle: string
  description: string
  background_color_from?: string
  background_color_via?: string
  background_color_to?: string
}

interface HeroImage {
  id: number
  image_url: string
  title?: string | null
  caption?: string | null
  display_order: number
  is_active: boolean
}

// UPDATE THIS INTERFACE TO MATCH YOUR PROPS
interface HeroProps {
  heroData: HeroData | null
  heroImages: HeroImage[]
}

// UPDATE THE FUNCTION PARAMETERS
export default function Hero({ heroData, heroImages }: HeroProps) {
  const hero: HeroData = heroData || {
    title: "Welcome to Hilltop Educational Institute",
    subtitle: "Empowering Minds, Building Futures Since 1995",
    description: "Located in the heart of Darend, Ganderbal, we provide quality education with modern facilities, experienced faculty, and a nurturing environment for holistic development.",
    background_color_from: "green-900",
    background_color_via: "green-700",
    background_color_to: "emerald-800"
  }

  const [currentSlide, setCurrentSlide] = useState(0)
  const hasImages = heroImages && heroImages.length > 0

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
    <section className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden">
      {hasImages ? (
        <>
          <div className="absolute inset-0">
            {heroImages.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
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

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50 z-[1]"></div>

          {heroImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[2] bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[2] bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex gap-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide 
                        ? 'bg-white w-8' 
                        : 'bg-white/50 hover:bg-white/75'
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
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-700 to-emerald-800"></div>
          <div 
            className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
            {hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-md">
            {hero.subtitle}
          </p>
          <p className="text-lg mb-8 text-white/95 drop-shadow-md">
            {hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="bg-white text-green-900 hover:bg-gray-100 shadow-xl">
              <Link href="/admissions">
                Apply for Admission
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="border-2 border-white text-white hover:bg-white hover:text-green-900 shadow-xl backdrop-blur-sm"
            >
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
