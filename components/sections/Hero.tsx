import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'

interface HeroData {
  title: string
  subtitle: string
  description: string
  image_url?: string | null  // Added | null here
  background_color_from?: string
  background_color_via?: string
  background_color_to?: string
}

export default async function Hero() {
  const supabase = await createServerSupabaseClient()
  
  let heroData: HeroData | null = null

  if (supabase) {
    const { data } = await supabase
      .from('hero')
      .select('*')
      .eq('is_active', true)
      .single()
    
    heroData = data
  }

  // Fallback data
  const hero: HeroData = heroData || {
    title: "Welcome to Hilltop Educational Institute",
    subtitle: "Empowering Minds, Building Futures Since 1995",
    description: "Located in the heart of Darend, Ganderbal, we provide quality education with modern facilities, experienced faculty, and a nurturing environment for holistic development.",
    image_url: undefined,  // Changed from null to undefined
    background_color_from: "green-900",
    background_color_via: "green-700",
    background_color_to: "emerald-800"
  }

  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden">
      {/* Background Image or Gradient */}
      {hero.image_url ? (
        <>
          <Image
            src={hero.image_url}
            alt="Hero background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark overlay for better text visibility on images */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>
        </>
      ) : (
        <>
          {/* Gradient background when no image */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-700 to-emerald-800"></div>
          
          {/* Pattern overlay for texture */}
          <div 
            className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </>
      )}
      
      {/* Content with better text visibility */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Text shadow for better readability */}
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
