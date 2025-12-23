'use client'

import { useEffect, useState, useRef } from 'react'
import { Calendar, ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface NewsItem {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  image_url?: string
}

const defaultNews: NewsItem[] = [
  {
    id: 1,
    title: "Annual Sports Day 2025 - A Grand Success",
    excerpt: "Students showcased their athletic talents with enthusiasm. The event featured track and field events, team sports, and prizes.",
    date: "2025-11-25",
    category: "Events",
    image_url: "/news/sports-day.jpg"
  },
  {
    id: 2,
    title: "Science Exhibition Winners Announced",
    excerpt: "Our students won multiple awards at the district-level science exhibition with innovative projects on renewable energy.",
    date: "2025-11-20",
    category: "Achievement",
    image_url: "/news/science.jpg"
  },
  {
    id: 3,
    title: "New Computer Lab Inaugurated",
    excerpt: "State-of-the-art computer lab with 30 new systems inaugurated to enhance digital learning experience.",
    date: "2025-11-15",
    category: "Infrastructure",
    image_url: "/news/lab.jpg"
  }
]

const upcomingEvents = [
  {
    id: 1,
    title: "Parent-Teacher Meeting",
    date: "2025-12-30",
    time: "10:00 AM - 2:00 PM",
    location: "Main Auditorium"
  },
  {
    id: 2,
    title: "Annual Day Celebration",
    date: "2026-01-15",
    time: "4:00 PM onwards",
    location: "School Campus"
  },
  {
    id: 3,
    title: "Admissions Counseling",
    date: "2026-01-20",
    time: "9:00 AM - 4:00 PM",
    location: "Admin Block"
  }
]

const categoryColors: { [key: string]: string } = {
  Events: "from-blue-500 to-cyan-500",
  Achievement: "from-yellow-500 to-orange-500",
  Infrastructure: "from-purple-500 to-violet-500",
  Academic: "from-green-500 to-emerald-500"
}

export default function NewsEvents() {
  const [isVisible, setIsVisible] = useState(false)
  const [news, setNews] = useState<NewsItem[]>(defaultNews)
  const sectionRef = useRef<HTMLElement>(null)

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

  // Fetch news from Supabase
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('news')
          .select('*')
          .eq('is_published', true)
          .order('date', { ascending: false })
          .limit(3)
        
        if (data && data.length > 0) {
          setNews(data)
        }
      } catch (error) {
        console.error('Error fetching news:', error)
      }
    }
    
    fetchNews()
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>
      <div className="absolute inset-0 pattern-grid opacity-30"></div>
      
      {/* Decorative */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-green-100/50 rounded-full blur-3xl animate-float-reverse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full px-5 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm">Stay Updated</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Latest <span className="gradient-text">News</span> & Events
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay connected with the latest happenings at Hilltop Educational Institute
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Cards */}
          <div className="lg:col-span-2 space-y-6">
            {news.map((item, index) => (
              <div
                key={item.id}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="w-full md:w-48 h-48 md:h-auto bg-gradient-to-br from-green-200 to-emerald-300 flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-80"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-white/50" />
                  </div>
                  
                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${categoryColors[item.category] || 'from-gray-500 to-gray-600'}`}>
                    {item.category}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(item.date)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-1">
                    {item.excerpt}
                  </p>
                  <Link 
                    href={`/news/${item.id}`}
                    className="inline-flex items-center gap-2 text-green-600 font-semibold group-hover:gap-4 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
            
            {/* View All */}
            <div className={`text-center pt-4 ${isVisible ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
              <Link 
                href="/news"
                className="inline-flex items-center gap-2 text-green-600 font-bold hover:gap-4 transition-all"
              >
                View All News
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 shadow-xl text-white sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Events
              </h3>
              
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div 
                    key={event.id}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors"
                  >
                    <div className="text-sm text-green-200 mb-1">{formatDate(event.date)}</div>
                    <h4 className="font-bold text-white mb-2">{event.title}</h4>
                    <div className="flex flex-col gap-1 text-sm text-green-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                href="/activities"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-white text-green-700 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors"
              >
                View Calendar
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
