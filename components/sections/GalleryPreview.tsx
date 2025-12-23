'use client'

import { useEffect, useState, useRef } from 'react'
import { Camera, ArrowRight, Grid3X3 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

interface GalleryItem {
  id: number
  title: string
  category: string
  image_url: string
  display_order: number
}

interface SectionContent {
  heading: string
  highlight_text: string
  description: string
  badge_text: string
}

export default function GalleryPreview() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [section, setSection] = useState<SectionContent>({
    heading: "Glimpse of",
    highlight_text: "Campus Life",
    description: "Explore our vibrant campus, modern facilities, and memorable events through our photo gallery",
    badge_text: "Photo Gallery"
  })
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    { id: 1, title: "Campus Overview", category: "Campus", image_url: "", display_order: 1 },
    { id: 2, title: "Science Lab", category: "Infrastructure", image_url: "", display_order: 2 },
    { id: 3, title: "Sports Day 2025", category: "Events", image_url: "", display_order: 3 },
    { id: 4, title: "Computer Lab", category: "Infrastructure", image_url: "", display_order: 4 },
    { id: 5, title: "Annual Day", category: "Events", image_url: "", display_order: 5 },
    { id: 6, title: "Library", category: "Infrastructure", image_url: "", display_order: 6 }
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
          .eq('section_name', 'gallery_preview')
          .eq('is_active', true)
          .single()
        
        if (sectionData) {
          setSection(sectionData)
        }
        
        // Fetch gallery items (limited to 6 for preview)
        const { data: galleryData } = await supabase
          .from('gallery_photos')
          .select('id, title, category:gallery_categories(category_name), image_url, display_order')
          .eq('is_active', true)
          .order('display_order', { ascending: true })
          .limit(6)
        
        if (galleryData && galleryData.length > 0) {
          const formattedData = galleryData.map((item: any) => ({
            id: item.id,
            title: item.title,
            category: item.category?.category_name || 'General',
            image_url: item.image_url,
            display_order: item.display_order
          }))
          setGalleryItems(formattedData)
        }
      } catch (error) {
        console.error('Error fetching gallery:', error)
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
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
      
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, white 2px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <Camera className="w-4 h-4 text-green-400" />
            <span className="text-white font-semibold text-sm">{section.badge_text}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {section.heading} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">{section.highlight_text}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {section.description}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl aspect-square cursor-pointer ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image or Placeholder */}
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-white/20" />
                  </div>
                </div>
              )}
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
                hoveredId === item.id ? 'opacity-100' : 'opacity-60'
              }`}></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <span className={`text-xs font-semibold text-green-400 mb-1 transition-all duration-300 ${
                  hoveredId === item.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  {item.category}
                </span>
                <h3 className={`text-lg md:text-xl font-bold text-white transition-all duration-300 ${
                  hoveredId === item.id ? 'translate-y-0' : 'translate-y-2'
                }`}>
                  {item.title}
                </h3>
              </div>
              
              {/* Hover Effect */}
              <div className={`absolute inset-0 border-2 border-green-400 rounded-2xl transition-all duration-300 ${
                hoveredId === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}></div>
              
              {/* View Icon */}
              <div className={`absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                hoveredId === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}>
                <Grid3X3 className="w-5 h-5 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className={`text-center mt-12 ${isVisible ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
          <Link 
            href="/gallery"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 transition-all duration-300 btn-shine"
          >
            View Full Gallery
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
