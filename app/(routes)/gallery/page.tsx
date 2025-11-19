'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { Play } from 'lucide-react'

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

interface Video {
  id: number
  title: string
  description: string
  video_url: string
  thumbnail_url: string
  duration: string
}

export default function GalleryPage() {
  const [pageData, setPageData] = useState<any>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [photos, setPhotos] = useState<Photo[]>([])
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  useEffect(() => {
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
    photo_categories_heading: "Photo Categories",
    video_gallery_heading: "Video Gallery",
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

  return (
    <div className="min-h-screen">
      {/* Hero Section - Dynamic */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{page.hero_title}</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            {page.hero_subtitle}
          </p>
        </div>
      </section>

      {/* Categories - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{page.photo_categories_heading}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <button
                onClick={() => handleCategoryFilter(null)}
                className={`px-4 py-3 bg-white border-2 rounded-lg transition font-medium ${
                  selectedCategory === null
                    ? 'border-green-600 text-green-600'
                    : 'border-gray-200 hover:border-green-600 hover:text-green-600'
                }`}
              >
                All Photos
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryFilter(category.id)}
                  className={`px-4 py-3 bg-white border-2 rounded-lg transition font-medium ${
                    selectedCategory === category.id
                      ? 'border-green-600 text-green-600'
                      : 'border-gray-200 hover:border-green-600 hover:text-green-600'
                  }`}
                >
                  {category.category_name}
                </button>
              ))}
            </div>

            {/* Gallery Grid - Dynamic */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-0">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={photo.image_url}
                        alt={photo.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{photo.title}</h3>
                      {photo.event_date && (
                        <p className="text-sm text-gray-600">
                          Date: {new Date(photo.event_date).toLocaleDateString()}
                        </p>
                      )}
                      {photo.description && (
                        <p className="text-sm text-gray-500 mt-1">{photo.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery - Dynamic */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{page.video_gallery_heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-0">
                    <div className="aspect-video relative overflow-hidden bg-black">
                      {video.thumbnail_url ? (
                        <>
                          <Image
                            src={video.thumbnail_url}
                            alt={video.title}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Play className="text-white ml-1" size={28} fill="white" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Play className="text-green-600" size={48} />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{video.title}</h3>
                      {video.duration && (
                        <p className="text-sm text-gray-600">Duration: {video.duration}</p>
                      )}
                      {video.description && (
                        <p className="text-sm text-gray-500 mt-1">{video.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{page.virtual_tour_heading}</h2>
            <p className="text-gray-600 mb-8">
              {page.virtual_tour_description}
            </p>
            {page.virtual_tour_url ? (
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={page.virtual_tour_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  title="Virtual Campus Tour"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">360° Virtual Tour (Coming Soon)</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
