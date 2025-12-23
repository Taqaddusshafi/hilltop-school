import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, FileText, Book, Trophy, GraduationCap, Users, Star, Sparkles, Award, Medal, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import Image from 'next/image'
import PageHeader from '@/components/ui/PageHeader'

export const metadata = {
  title: 'Students Corner',
  description: 'Resources and information for students.',
}

const iconMap: { [key: string]: any } = {
  Book,
  FileText,
  Download,
  Star,
  Trophy,
  Award,
  Medal,
}

const resourceColors = [
  { gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50", text: "text-blue-600" },
  { gradient: "from-purple-500 to-violet-500", bg: "bg-purple-50", text: "text-purple-600" },
  { gradient: "from-green-500 to-emerald-500", bg: "bg-green-50", text: "text-green-600" },
  { gradient: "from-orange-500 to-amber-500", bg: "bg-orange-50", text: "text-orange-600" },
]

export default async function StudentsPage() {
  const supabase = await createServerSupabaseClient()
  
  // Fetch all data from Supabase
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
    hero_subtitle: "Resources, achievements, and essential downloads for our students",
    downloads_heading: "Downloads & Resources",
    downloads_description: "Access important documents, forms, and study materials",
    elibrary_heading: "E-Library",
    elibrary_description: "Access digital resources, study materials, and reference books",
    achievements_heading: "Student Achievements",
    achievements_description: "Celebrating our stars who make us proud",
    alumni_heading: "Alumni Network",
    alumni_description: "Our alumni are making us proud in various fields across the country"
  }

  const downloadsList = downloads.length > 0 ? downloads : [
    { id: 1, title: "Class Timetable", category: "Academic", file_size: "245 KB", icon_name: "FileText" },
    { id: 2, title: "Exam Schedule", category: "Academic", file_size: "180 KB", icon_name: "Calendar" },
    { id: 3, title: "Syllabus PDF", category: "Academic", file_size: "1.2 MB", icon_name: "Book" },
    { id: 4, title: "Holiday Calendar", category: "General", file_size: "320 KB", icon_name: "Calendar" },
    { id: 5, title: "Fee Structure", category: "Administrative", file_size: "156 KB", icon_name: "FileText" },
    { id: 6, title: "School Rules", category: "General", file_size: "420 KB", icon_name: "FileText" }
  ]

  const elibraryList = elibraryResources.length > 0 ? elibraryResources : [
    { id: 1, title: "Study Notes", description: "Chapter-wise notes for all subjects", icon_name: "Book", count: "500+" },
    { id: 2, title: "Previous Papers", description: "Past exam papers with solutions", icon_name: "FileText", count: "200+" },
    { id: 3, title: "Video Lectures", description: "Recorded lessons by our teachers", icon_name: "Star", count: "100+" },
    { id: 4, title: "Reference Books", description: "Digital library of textbooks", icon_name: "Book", count: "300+" }
  ]

  const achievementsList = achievements.length > 0 ? achievements : [
    { id: 1, student_name: "Aamir Hussain", class_name: "Class 12", achievement: "State Topper - Science", year: "2024", photo_url: null },
    { id: 2, student_name: "Fatima Khan", class_name: "Class 10", achievement: "District Topper - Overall", year: "2024", photo_url: null },
    { id: 3, student_name: "Mohammad Irfan", class_name: "Class 11", achievement: "National Science Olympiad Winner", year: "2023", photo_url: null },
    { id: 4, student_name: "Zainab Akhtar", class_name: "Class 9", achievement: "State Art Competition - 1st Prize", year: "2023", photo_url: null }
  ]

  const statsList = alumniStats.length > 0 ? alumniStats : [
    { id: 1, stat_value: "5000+", stat_label: "Alumni Worldwide" },
    { id: 2, stat_value: "150+", stat_label: "Doctors & Engineers" },
    { id: 3, stat_value: "50+", stat_label: "Government Officers" },
    { id: 4, stat_value: "100+", stat_label: "Entrepreneurs" }
  ]

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <PageHeader 
        title={studentsPage.hero_title}
        subtitle={studentsPage.hero_subtitle}
        badge="Student Resources"
      />

      {/* Quick Stats */}
      <section className="py-6 bg-gradient-to-r from-blue-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-white text-center">
            <div className="group">
              <p className="text-3xl font-bold group-hover:scale-110 transition-transform">{downloadsList.length}+</p>
              <p className="text-blue-100 text-sm">Downloads</p>
            </div>
            <div className="group">
              <p className="text-3xl font-bold group-hover:scale-110 transition-transform">1000+</p>
              <p className="text-blue-100 text-sm">Study Resources</p>
            </div>
            <div className="group">
              <p className="text-3xl font-bold group-hover:scale-110 transition-transform">{achievementsList.length}+</p>
              <p className="text-blue-100 text-sm">Award Winners</p>
            </div>
            <div className="group">
              <p className="text-3xl font-bold group-hover:scale-110 transition-transform">5000+</p>
              <p className="text-blue-100 text-sm">Alumni</p>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-5 py-2 mb-6">
                <Download className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-semibold text-sm">Quick Access</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{studentsPage.downloads_heading}</h2>
              <p className="text-gray-600 text-lg">{studentsPage.downloads_description}</p>
              <div className="mt-6 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {downloadsList.map((item, index) => {
                const colors = resourceColors[index % resourceColors.length]
                const IconComponent = iconMap[item.icon_name as string] || FileText
                
                return (
                  <div 
                    key={item.id} 
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden"
                  >
                    <div className={`h-2 bg-gradient-to-r ${colors.gradient}`}></div>
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`w-14 h-14 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                            <IconComponent className="text-white" size={24} />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">{item.title}</h3>
                            <p className="text-sm text-gray-500">
                              {item.category} • {item.file_size}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        {item.file_url ? (
                          <a href={item.file_url} download>
                            <Button className={`w-full bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white shadow-lg group/btn`}>
                              <Download size={16} className="mr-2 group-hover/btn:animate-bounce" />
                              Download
                            </Button>
                          </a>
                        ) : (
                          <Button variant="outline" className="w-full" disabled>
                            <Download size={16} className="mr-2" />
                            Coming Soon
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* E-Library - Dark Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
                <Book className="w-4 h-4 text-blue-400" />
                <span className="text-white font-semibold text-sm">Digital Resources</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{studentsPage.elibrary_heading}</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">{studentsPage.elibrary_description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {elibraryList.map((resource, index) => {
                const IconComponent = iconMap[resource.icon_name as string] || Book
                const colors = resourceColors[index % resourceColors.length]
                
                return (
                  <div 
                    key={resource.id} 
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <IconComponent className="text-white" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{resource.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
                      {resource.count && (
                        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                          <span className="text-blue-400 font-bold">{resource.count}</span>
                          <span className="text-gray-400 text-sm">Resources</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div className="mt-12 text-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-xl group">
                Access E-Library
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Student Achievements */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-20"></div>
        <div className="absolute top-20 right-20 w-80 h-80 bg-yellow-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full px-5 py-2 mb-6">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span className="text-yellow-700 font-semibold text-sm">Stars of Hilltop</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{studentsPage.achievements_heading}</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">{studentsPage.achievements_description}</p>
              <div className="mt-6 h-1 w-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievementsList.map((student, index) => (
                <div 
                  key={student.id} 
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-5">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-yellow-100 shadow-xl">
                          {student.photo_url ? (
                            <Image
                              src={student.photo_url}
                              alt={student.student_name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-400 to-amber-500 text-white font-bold text-2xl">
                              {student.student_name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">{student.student_name}</h3>
                            <p className="text-gray-500 text-sm">{student.class_name}</p>
                          </div>
                          <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-sm font-bold rounded-full shadow">
                            {student.year}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Trophy className="text-yellow-500 flex-shrink-0" size={18} />
                          <p className="text-gray-700 font-medium">{student.achievement}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Section - Dark */}
      <section className="py-24 bg-gradient-to-br from-green-800 to-emerald-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
                <Users className="w-4 h-4 text-green-300" />
                <span className="text-white font-semibold text-sm">Our Pride</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{studentsPage.alumni_heading}</h2>
              <p className="text-green-100 text-lg max-w-2xl mx-auto">{studentsPage.alumni_description}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statsList.map((stat, index) => (
                <div 
                  key={stat.id} 
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">{stat.stat_value}</p>
                  <p className="text-green-200 text-sm">{stat.stat_label}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 shadow-xl group font-bold">
                <Users className="mr-2" size={18} />
                Join Alumni Network
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
