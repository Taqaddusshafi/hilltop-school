
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'News & Updates',
  description: 'Latest news, notices, and updates from the school.',
}

export default function NewsPage() {
  const news = [
    {
      title: "Admissions Open for Academic Year 2026-27",
      date: "15th November 2025",
      category: "Admission",
      content: "Online and offline admission process has started. Apply before 31st December 2025."
    },
    {
      title: "Annual Sports Day - 25th November 2025",
      date: "10th November 2025",
      category: "Event",
      content: "All students are requested to participate in the annual sports day. Parents are invited."
    },
    {
      title: "Parent-Teacher Meeting Scheduled",
      date: "5th November 2025",
      category: "Meeting",
      content: "PTM will be held on 30th November. All parents are requested to attend."
    },
    {
      title: "Winter Vacation Notice",
      date: "1st November 2025",
      category: "Holiday",
      content: "Winter vacation from 20th December 2025 to 5th January 2026."
    },
    {
      title: "Science Exhibition Results",
      date: "28th October 2025",
      category: "Achievement",
      content: "Our students won 3 gold medals in the district science exhibition."
    }
  ]

  const circulars = [
    { title: "Fee Payment Reminder", date: "12th Nov 2025", size: "120 KB" },
    { title: "Examination Schedule", date: "10th Nov 2025", size: "245 KB" },
    { title: "Uniform Guidelines", date: "5th Nov 2025", size: "180 KB" },
    { title: "Transport Route Update", date: "1st Nov 2025", size: "95 KB" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Updates</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Stay informed with the latest school news and announcements
          </p>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest News</h2>
            <div className="space-y-6">
              {news.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full mb-2">
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
                      <span>{item.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Circulars & Notices */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Circulars & Notices</h2>
            <div className="space-y-4">
              {circulars.map((circular, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{circular.title}</h3>
                        <p className="text-sm text-gray-600">
                          {circular.date} • {circular.size}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download size={16} className="mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">School Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our monthly newsletter for updates and highlights
            </p>
            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="max-w-md mx-auto">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button size="lg">Subscribe</Button>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Get monthly updates delivered to your inbox
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
