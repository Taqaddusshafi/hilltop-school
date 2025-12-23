'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { Play, Camera, Video, Eye, Filter, Sparkles, Grid3X3, LayoutGrid, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Category {
  id: number
  category_name: string
}

interface Photo {
  id: number
  title: string
  description: string
  image_url: string
  category_id: number
  event_date: string
}

interface VideoItem {
  id: number
  title: string
  description: string
  video_url: string
  thumbnail_url: string
  duration: string
}

const categoryColors = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-violet-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-amber-500",
  "from-pink-500 to-rose-500",
]

export default function GalleryPage() {
  const [pageData, setPageData] = useState<any>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [photos, setPhotos] = useState<Photo[]>([])
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([])
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
    
    const fetchData = async () => {
      try {
        const supabase = createClient()

        const [pageResult, categoriesResult, photosResult, videosResult] = await Promise.all([
          supabase.from('gallery_page').select('*').eq('is_active', true).single(),
          supabase.from('gallery_categories').select('*').eq('is_active', true).order('display_order'),
          supabase.from('gallery_photos').select('*').eq('is_active', true).order('display_order'),
          supabase.from('gallery_videos').select('*').eq('is_active', true).order('display_order')
        ])

        if (pageResult.data) setPageData(pageResult.data)
        if (categoriesResult.data) setCategories(categoriesResult.data)
        if (photosResult.data) {
          setPhotos(photosResult.data)
          setFilteredPhotos(photosResult.data)
        }
        if (videosResult.data) setVideos(videosResult.data)
      } catch (error) {
        console.error('Error fetching gallery data:', error)
      }
    }

    fetchData()
  }, [])

  const page = pageData || {
    hero_title: "Gallery",
    hero_subtitle: "Moments captured from our vibrant school life",
    photo_heading: "Photo Gallery",
    photo_description: "Browse through our collection of memorable moments",
    video_heading: "Video Gallery",
    virtual_tour_heading: "Virtual Campus Tour",
    virtual_tour_description: "Take a 360° virtual tour of our campus"
  }

  const handleCategoryFilter = (categoryId: number | null) => {
    setSelectedCategory(categoryId)
    if (categoryId === null) {
      setFilteredPhotos(photos)
    } else {
      setFilteredPhotos(photos.filter(photo => photo.category_id === categoryId))
    }
  }

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % filteredPhotos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length)
  }

  const virtualTourUrl = "https://www.google.com/maps/embed?pb=!4v1732187000000!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRDRsSUdRU2c!2m2!1d34.22817847809265!2d74.77046965597594!3f97.26695!4f-9.162485!5f0.7820865974627469"

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl animate-float-reverse"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <Camera className="w-4 h-4 text-purple-300" />
              <span className="text-white/90 text-sm font-medium">Campus Memories</span>
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isLoaded ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
              {page.hero_title}
            </h1>
            <p className={`text-xl md:text-2xl text-gray-300 max-w-2xl ${isLoaded ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
              {page.hero_subtitle}
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats */}
      <section className="py-6 bg-gradient-to-r from-purple-600 to-violet-600 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-white text-center">
            <div className="group">
              <p className="text-3xl font-bold group-hover:scale-110 transition-transform">{photos.length || "100"}+</p>
              <p className="text-purple-100 text-sm">Photos</p>
            </div>
            <div className="group">
              <p className="text-3xl font-bold group-hover:scale-110 transition-transform">{videos.length || "20"}+</p>
              <p className="text-purple-100 text-sm">Videos</p>
            </div>
            <div className="group">
              <p className="text-3xl font-bold group-hover:scale-110 transition-transform">{categories.length || "6"}</p>
              <p className="text-purple-100 text-sm">Categories</p>
            </div>
            <div className="group">
              <p className="text-3xl font-bold group-hover:scale-110 transition-transform">360°</p>
              <p className="text-purple-100 text-sm">Virtual Tour</p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-violet-100 rounded-full px-5 py-2 mb-6">
                <Camera className="w-4 h-4 text-purple-600" />
                <span className="text-purple-700 font-semibold text-sm">Photo Gallery</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{page.photo_heading}</h2>
              <p className="text-gray-600 text-lg">{page.photo_description}</p>
              <div className="mt-6 h-1 w-20 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mx-auto"></div>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => handleCategoryFilter(null)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === null
                    ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-xl shadow-purple-500/25 scale-105'
                    : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-purple-400 hover:text-purple-600 hover:shadow-lg'
                }`}
              >
                <span className="flex items-center gap-2">
                  <LayoutGrid size={16} />
                  All Photos
                </span>
              </button>
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryFilter(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${categoryColors[index % categoryColors.length]} text-white shadow-xl scale-105`
                      : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-purple-400 hover:text-purple-600 hover:shadow-lg'
                  }`}
                >
                  {category.category_name}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo, index) => (
                <div 
                  key={photo.id} 
                  className="group cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <CardContent className="p-0">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <Image
                          src={photo.image_url || "/placeholder.jpg"}
                          alt={photo.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Eye className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="font-bold text-white text-lg">{photo.title}</h3>
                          {photo.event_date && (
                            <p className="text-white/80 text-sm mt-1">
                              {new Date(photo.event_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery - Dark Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
                <Video className="w-4 h-4 text-purple-400" />
                <span className="text-white font-semibold text-sm">Video Gallery</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{page.video_heading}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <div 
                  key={video.id} 
                  className="group cursor-pointer"
                >
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                    <div className="aspect-video relative overflow-hidden bg-black/50">
                      {video.thumbnail_url ? (
                        <>
                          <Image
                            src={video.thumbnail_url}
                            alt={video.title}
                            fill
                            className="object-cover opacity-70 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-violet-700">
                          <Video className="text-white/30" size={48} />
                        </div>
                      )}
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                          <Play className="text-white ml-1" size={32} fill="white" />
                        </div>
                      </div>
                      
                      {video.duration && (
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors">{video.title}</h3>
                      {video.description && (
                        <p className="text-gray-400 text-sm mt-2 line-clamp-2">{video.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full px-5 py-2 mb-6">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="text-blue-700 font-semibold text-sm">360° Experience</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{page.virtual_tour_heading}</h2>
              <p className="text-gray-600 text-lg">{page.virtual_tour_description}</p>
              <div className="mt-6 h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 rounded-3xl blur-sm opacity-30"></div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 rounded-2xl"></div>
              
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white p-1">
                <iframe
                  src={page.virtual_tour_url || virtualTourUrl}
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Virtual Campus Tour - 360° View"
                  className="rounded-lg"
                />
              </div>
              
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white shadow-2xl rounded-full px-8 py-4 flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-gray-900">Explore Our Campus in 360°</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && filteredPhotos[currentPhotoIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
          >
            <X size={32} />
          </button>
          
          <button 
            onClick={prevPhoto}
            className="absolute left-6 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft size={48} />
          </button>
          
          <button 
            onClick={nextPhoto}
            className="absolute right-6 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronRight size={48} />
          </button>
          
          <div className="max-w-5xl max-h-[85vh] relative">
            <Image
              src={filteredPhotos[currentPhotoIndex].image_url || "/placeholder.jpg"}
              alt={filteredPhotos[currentPhotoIndex].title}
              width={1200}
              height={800}
              className="object-contain max-h-[85vh] rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-xl font-bold">{filteredPhotos[currentPhotoIndex].title}</h3>
              <p className="text-white/70 text-sm mt-1">{currentPhotoIndex + 1} / {filteredPhotos.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
