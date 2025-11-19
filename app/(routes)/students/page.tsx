import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, FileText, Book, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import Image from 'next/image'

export const metadata = {
  title: 'Students Corner',
  description: 'Resources and information for students.',
}

const iconMap = {
  Book,
  FileText,
}

export default async function StudentsPage() {
  const supabase = await createServerSupabaseClient()
  
  // Fetch all data
  let pageData = null
  let downloads: any[] = []
  let elibraryResources: any[] = []
  let achievements: any[] = []
  let alumniStats: any[] = []

  if (supabase) {
    const [page, downloadsData, elibraryData, achievementsData, statsData] = await Promise.all([
      supabase.from('students_page').select('*').eq('is_active', true).single(),
      supabase.from('student_downloads').select('*').eq('is_active', true).order('display_order'),
      supabase.from('elibrary_resources').select('*').eq('is_active', true).order('display_order'),
      supabase.from('student_achievements').select('*').eq('is_active', true).order('display_order'),
      supabase.from('alumni_stats').select('*').eq('is_active', true).order('display_order')
    ])

    pageData = page.data
    downloads = downloadsData.data || []
    elibraryResources = elibraryData.data || []
    achievements = achievementsData.data || []
    alumniStats = statsData.data || []
  }

  // Fallback data
  const studentsPage = pageData || {
    hero_title: "Students Corner",
    hero_subtitle: "Resources, achievements, and essential downloads",
    downloads_heading: "Downloads",
    elibrary_heading: "E-Library",
    elibrary_description: "Access digital resources, study materials, and reference books",
    achievements_heading: "Student Achievements",
    alumni_heading: "Alumni Network",
    alumni_description: "Our alumni are making us proud in various fields across the country"
  }

  const downloadsList = downloads.length > 0 ? downloads : [
    { id: 1, title: "Class Timetable", category: "Academic", file_size: "245 KB" }
  ]

  const elibraryList = elibraryResources.length > 0 ? elibraryResources : [
    { id: 1, title: "Study Notes", description: "Chapter-wise notes", icon_name: "Book" }
  ]

  const achievementsList = achievements.length > 0 ? achievements : [
    { id: 1, student_name: "Aamir Hussain", class: "Class 12", achievement: "State Topper", year: "2024" }
  ]

  const statsList = alumniStats.length > 0 ? alumniStats : [
    { id: 1, stat_value: "500+", stat_label: "Alumni Worldwide" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Dynamic */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{studentsPage.hero_title}</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            {studentsPage.hero_subtitle}
          </p>
        </div>
      </section>

      {/* Download Section - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{studentsPage.downloads_heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {downloadsList.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="text-green-600" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600">
                            {item.category} • {item.file_size}
                          </p>
                        </div>
                      </div>
                      {item.file_url ? (
                        <a href={item.file_url} download>
                          <Button size="sm" variant="outline" className="hover:bg-green-50">
                            <Download size={16} />
                          </Button>
                        </a>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          <Download size={16} />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* E-Library Section - Dynamic */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{studentsPage.elibrary_heading}</h2>
            <p className="text-gray-600 mb-8">
              {studentsPage.elibrary_description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {elibraryList.map((resource) => {
                const IconComponent = iconMap[resource.icon_name as keyof typeof iconMap] || Book
                
                return (
                  <Card key={resource.id}>
                    <CardHeader>
                      <IconComponent className="text-green-600 mx-auto mb-2" size={32} />
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        {resource.description}
                      </p>
                      {resource.link_url ? (
                        <a href={resource.link_url} target="_blank" rel="noopener noreferrer">
                          <Button className="mt-4 bg-green-600 hover:bg-green-700" variant="outline">
                            Access Now
                          </Button>
                        </a>
                      ) : (
                        <Button className="mt-4" variant="outline" disabled>
                          Coming Soon
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Student Achievements - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{studentsPage.achievements_heading}</h2>
            <div className="space-y-4">
              {achievementsList.map((student) => (
                <Card key={student.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {student.photo_url ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 relative">
                          <Image
                            src={student.photo_url}
                            alt={student.student_name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Trophy className="text-yellow-600" size={24} />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">{student.student_name}</h3>
                        <p className="text-sm text-gray-600">{student.class}</p>
                        <p className="text-gray-800 mt-2">{student.achievement}</p>
                        <p className="text-sm text-green-600 mt-1">{student.year}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Section - Dynamic */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{studentsPage.alumni_heading}</h2>
            <p className="text-gray-600 mb-8">
              {studentsPage.alumni_description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statsList.map((stat) => (
                <div key={stat.id} className="bg-white p-6 rounded-lg shadow">
                  <p className="text-3xl font-bold text-green-600">{stat.stat_value}</p>
                  <p className="text-sm text-gray-600 mt-2">{stat.stat_label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
