import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Calendar, FileText, GraduationCap } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Academics',
  description: 'Explore our curriculum, subjects, and academic programs.',
}

const iconMap = {
  BookOpen,
  FileText,
  Calendar,
}

export default async function AcademicsPage() {
  const supabase = await createServerSupabaseClient()
  
  // Fetch all data
  let academicsData = null
  let classLevels: any[] = []
  let teachingMethods: any[] = []
  let calendarEvents: any[] = []

  if (supabase) {
    const [academics, classes, methods, calendar] = await Promise.all([
      supabase.from('academics_page').select('*').eq('is_active', true).single(),
      supabase.from('class_levels').select('*').eq('is_active', true).order('display_order'),
      supabase.from('teaching_methodology').select('*').eq('is_active', true).order('display_order'),
      supabase.from('academic_calendar').select('*').eq('is_active', true).order('display_order')
    ])

    academicsData = academics.data
    classLevels = classes.data || []
    teachingMethods = methods.data || []
    calendarEvents = calendar.data || []
  }

  // Fallback data
  const academics = academicsData || {
    hero_title: "Academics",
    hero_subtitle: "Comprehensive curriculum designed for holistic development",
    curriculum_heading: "Our Curriculum",
    curriculum_description: "We follow the state education board curriculum..."
  }

  const classes = classLevels.length > 0 ? classLevels : [
    { id: 1, level: "Primary", grades: "Class 1 - 5", subjects: "English, Urdu, Mathematics..." }
  ]

  const methods = teachingMethods.length > 0 ? teachingMethods : [
    { id: 1, title: "Interactive Learning", description: "Student-centered approach...", icon_name: "BookOpen" }
  ]

  const calendar = calendarEvents.length > 0 ? calendarEvents : [
    { id: 1, event_name: "School Reopening", event_date: "1st April 2025" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Dynamic */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{academics.hero_title}</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            {academics.hero_subtitle}
          </p>
        </div>
      </section>

      {/* Curriculum Overview - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{academics.curriculum_heading}</h2>
            <p className="text-gray-600">
              {academics.curriculum_description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {classes.map((classInfo) => (
              <Card key={classInfo.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <GraduationCap className="text-green-600" size={24} />
                    {classInfo.level}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-gray-900 mb-2">{classInfo.grades}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Subjects:</span> {classInfo.subjects}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology - Dynamic */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Teaching Methodology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methods.map((method) => {
              const IconComponent = iconMap[method.icon_name as keyof typeof iconMap] || BookOpen
              
              return (
                <Card key={method.id}>
                  <CardHeader>
                    <IconComponent className="text-green-600 mb-2" size={32} />
                    <CardTitle>{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {method.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Academic Calendar - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Academic Calendar {calendar[0]?.academic_year || '2025-26'}
            </h2>
            <div className="bg-white border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Event</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {calendar.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 text-gray-700">{event.event_name}</td>
                      <td className="px-6 py-4 text-gray-600">{event.event_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
