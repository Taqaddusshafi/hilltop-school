import Hero from '@/components/sections/Hero'
import NoticeBoard from '@/components/sections/NoticeBoard'
import Stats from '@/components/sections/Stats'
import Highlights from '@/components/sections/Highlights'
import Programs from '@/components/sections/Programs'
import PrincipalMessage from '@/components/sections/PrincipalMessage'
import Testimonials from '@/components/sections/Testimonials'
import GalleryPreview from '@/components/sections/GalleryPreview'
import NewsEvents from '@/components/sections/NewsEvents'
import CTABanner from '@/components/sections/CTABanner'
import ContactInfo from '@/components/sections/ContactInfo'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createServerSupabaseClient()
  
  let heroData = null
  let heroImages = []

  if (supabase) {
    // Fetch hero content
    const { data: hero } = await supabase
      .from('hero')
      .select('*')
      .eq('is_active', true)
      .single()
    
    heroData = hero

    // Fetch hero images ordered by display_order
    const { data: images } = await supabase
      .from('hero_images')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
    
    heroImages = images || []
  }

  return (
    <>
      {/* Hero Section with Image Slider */}
      <Hero heroData={heroData} heroImages={heroImages} />
      
      {/* Live Notice Board */}
      <NoticeBoard />
      
      {/* Statistics with Animated Counters */}
      <Stats />
      
      {/* Why Choose Us Highlights */}
      <Highlights />
      
      {/* Academic Programs */}
      <Programs />
      
      {/* Principal's Message */}
      <PrincipalMessage />
      
      {/* Gallery Preview */}
      <GalleryPreview />
      
      {/* Testimonials Carousel */}
      <Testimonials />
      
      {/* News & Events */}
      <NewsEvents />
      
      {/* CTA Banner */}
      <CTABanner />
      
      {/* Contact Information */}
      <ContactInfo />
    </>
  )
}
