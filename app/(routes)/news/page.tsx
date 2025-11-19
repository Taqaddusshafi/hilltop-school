import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import NewsletterForm from '@/components/forms/NewsletterForm'

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
      {/* Hero Section - Dynamic */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{newsPage.hero_title}</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            {newsPage.hero_subtitle}
          </p>
        </div>
      </section>

      {/* Latest News - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{newsPage.latest_news_heading}</h2>
            {news.length > 0 ? (
              <div className="space-y-6">
                {news.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full mb-2">
                            {item.category}
                          </span>
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{item.content}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={16} />
                        <span>{new Date(item.news_date).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No news items available at the moment.</p>
            )}
          </div>
        </div>
      </section>

      {/* Circulars & Notices - Dynamic */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{newsPage.circulars_heading}</h2>
            {circularsList.length > 0 ? (
              <div className="space-y-4">
                {circularsList.map((circular) => (
                  <Card key={circular.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{circular.title}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(circular.circular_date).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })} • {circular.file_size}
                          </p>
                        </div>
                        {circular.file_url ? (
                          <a href={circular.file_url} download target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="hover:bg-green-50">
                              <Download size={16} className="mr-2" />
                              Download
                            </Button>
                          </a>
                        ) : (
                          <Button size="sm" variant="outline" disabled>
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
              <p className="text-center text-gray-500 py-8">No circulars available at the moment.</p>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{newsPage.newsletter_heading}</h2>
            <p className="text-gray-600 mb-8">
              {newsPage.newsletter_description}
            </p>
            <div className="bg-green-50 p-8 rounded-lg">
              <NewsletterForm />
              <p className="text-sm text-gray-600 mt-4">
                Get monthly updates delivered to your inbox
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
