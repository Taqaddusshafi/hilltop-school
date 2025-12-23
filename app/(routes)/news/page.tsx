import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Download, Newspaper, Bell, FileText, Sparkles, ArrowRight, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import NewsletterForm from '@/components/forms/NewsletterForm'
import PageHeader from '@/components/ui/PageHeader'
import Link from 'next/link'

export const metadata = {
  title: 'News & Updates',
  description: 'Latest news, notices, and updates from the school.',
}

interface NewsItem {
  id: number
  title: string
  content: string
  category: string
  news_date: string
}

interface Circular {
  id: number
  title: string
  circular_date: string
  file_size: string
  file_url?: string
}

const categoryColors: { [key: string]: string } = {
  'Achievement': 'from-yellow-500 to-amber-500',
  'Event': 'from-blue-500 to-cyan-500',
  'Announcement': 'from-green-500 to-emerald-500',
  'Academic': 'from-purple-500 to-violet-500',
}

export default async function NewsPage() {
  const supabase = await createServerSupabaseClient()
  
  // Fetch all data
  let pageData = null
  let newsItems: NewsItem[] = []
  let circulars: Circular[] = []

  if (supabase) {
    const [page, news, circs] = await Promise.all([
      supabase.from('news_page').select('*').eq('is_active', true).single(),
      supabase.from('news_items').select('*').eq('is_active', true).order('news_date', { ascending: false }),
      supabase.from('circulars').select('*').eq('is_active', true).order('circular_date', { ascending: false })
    ])

    pageData = page.data
    newsItems = news.data || []
    circulars = circs.data || []
  }

  // Fallback data
  const newsPage = pageData || {
    hero_title: "News & Updates",
    hero_subtitle: "Stay informed with the latest school news and announcements",
    latest_news_heading: "Latest News",
    circulars_heading: "Circulars & Notices",
    newsletter_heading: "School Newsletter",
    newsletter_description: "Subscribe to our monthly newsletter for updates and highlights"
  }

  const news = newsItems.length > 0 ? newsItems : []
  const circularsList = circulars.length > 0 ? circulars : []

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <PageHeader 
        title={newsPage.hero_title}
        subtitle={newsPage.hero_subtitle}
        badge="Stay Updated"
      />

      {/* Latest News */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full px-5 py-2 mb-6">
                <Newspaper className="w-4 h-4 text-blue-600" />
                <span className="text-blue-700 font-semibold text-sm">Latest Stories</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{newsPage.latest_news_heading}</h2>
              <div className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
            </div>
            
            {news.length > 0 ? (
              <div className="space-y-6">
                {news.map((item, index) => {
                  const gradient = categoryColors[item.category] || 'from-green-500 to-emerald-500'
                  
                  return (
                    <Card key={item.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <CardHeader className="relative z-10">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <span className={`inline-block px-3 py-1 bg-gradient-to-r ${gradient} text-white text-xs font-bold rounded-full mb-3`}>
                              {item.category}
                            </span>
                            <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{item.title}</CardTitle>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(item.news_date).toLocaleDateString('en-IN', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <p className="text-gray-600 mb-4 leading-relaxed">{item.content}</p>
                        <Link href={`/news/${item.id}`} className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                          Read More <ArrowRight size={16} />
                        </Link>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No news items available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Circulars & Notices */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-orange-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full px-5 py-2 mb-6">
                <Bell className="w-4 h-4 text-orange-600" />
                <span className="text-orange-700 font-semibold text-sm">Official Notices</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{newsPage.circulars_heading}</h2>
              <div className="mt-4 h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto"></div>
            </div>
            
            {circularsList.length > 0 ? (
              <div className="space-y-4">
                {circularsList.map((circular, index) => (
                  <Card key={circular.id} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <FileText className="text-white" size={20} />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">{circular.title}</h3>
                            <p className="text-sm text-gray-500">
                              {new Date(circular.circular_date).toLocaleDateString('en-IN', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })} • {circular.file_size}
                            </p>
                          </div>
                        </div>
                        {circular.file_url ? (
                          <a href={circular.file_url} download target="_blank" rel="noopener noreferrer">
                            <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25">
                              <Download size={16} className="mr-2" />
                              Download
                            </Button>
                          </a>
                        ) : (
                          <Button variant="outline" disabled>
                            <Download size={16} className="mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No circulars available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-br from-green-800 to-emerald-900 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
              <Mail className="w-4 h-4 text-green-300" />
              <span className="text-white font-semibold text-sm">Stay Connected</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{newsPage.newsletter_heading}</h2>
            <p className="text-green-100 text-lg mb-8">{newsPage.newsletter_description}</p>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl">
              <NewsletterForm />
              <p className="text-sm text-green-200 mt-4">
                Get monthly updates delivered to your inbox
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
