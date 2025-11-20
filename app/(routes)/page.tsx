import Hero from '@/components/sections/Hero'
import NoticeBoard from '@/components/sections/NoticeBoard'
import Stats from '@/components/sections/Stats'
import Highlights from '@/components/sections/Highlights'
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
      <Hero heroData={heroData} heroImages={heroImages} />
      <NoticeBoard />
      <Stats />
      <Highlights />
      <ContactInfo />
    </>
  )
}
