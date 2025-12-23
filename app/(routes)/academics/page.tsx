import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Calendar, FileText, GraduationCap, Users, Sparkles, Clock, CheckCircle, Award, Lightbulb, Target, Presentation } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import PageHeader from '@/components/ui/PageHeader'

export const metadata = {
  title: 'Academics',
  description: 'Explore our curriculum, subjects, and academic programs.',
}

const iconMap: { [key: string]: any } = {
  BookOpen,
  FileText,
  Calendar,
  Users,
  Lightbulb,
  Target,
  Presentation,
  CheckCircle,
}

const classColors = [
  { gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  { gradient: "from-purple-500 to-violet-500", bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  { gradient: "from-green-500 to-emerald-500", bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
  { gradient: "from-orange-500 to-amber-500", bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
]

export default async function AcademicsPage() {
  const supabase = await createServerSupabaseClient()
  
  // Fetch all data from Supabase
  let academicsData = null
  let classLevels: any[] = []
  let teachingMethods: any[] = []
  let calendarEvents: any[] = []
  let subjectsData: any[] = []

  if (supabase) {
    const [academics, classes, methods, calendar, subjects] = await Promise.all([
      supabase.from('academics_page').select('*').eq('is_active', true).single(),
      supabase.from('class_levels').select('*').eq('is_active', true).order('display_order'),
      supabase.from('teaching_methodology').select('*').eq('is_active', true).order('display_order'),
      supabase.from('academic_calendar').select('*').eq('is_active', true).order('display_order'),
      supabase.from('subjects').select('*').eq('is_active', true).order('display_order')
    ])

    academicsData = academics.data
    classLevels = classes.data || []
    teachingMethods = methods.data || []
    calendarEvents = calendar.data || []
    subjectsData = subjects.data || []
  }

  // Fallback data
  const academics = academicsData || {
    hero_title: "Academics",
    hero_subtitle: "Comprehensive curriculum designed for holistic development and future success",
    curriculum_heading: "Our Curriculum",
    curriculum_description: "We follow the JKBOSE curriculum with additional enrichment programs to ensure well-rounded development. Our academic program is designed to build strong foundations while encouraging critical thinking and creativity.",
    methodology_heading: "Teaching Methodology",
    methodology_description: "Our innovative teaching approaches ensure effective learning",
    calendar_heading: "Academic Calendar",
    academic_year: "2025-26",
    subjects_heading: "Subjects Offered",
    subjects_description: "A comprehensive range of subjects to build well-rounded individuals"
  }

  const classes = classLevels.length > 0 ? classLevels : [
    { id: 1, level: "Primary Section", grades: "Class 1 - 5", subjects: "English, Urdu, Hindi, Mathematics, Science, Social Studies, Computer Science, Art & Craft, Physical Education", features: "Phonics-based learning, Interactive activities, Project-based assessment" },
    { id: 2, level: "Middle Section", grades: "Class 6 - 8", subjects: "English, Urdu, Hindi, Mathematics, Science, Social Science, Computer Education, Physical Education", features: "Conceptual learning, Lab experiments, Group projects" },
    { id: 3, level: "Secondary Section", grades: "Class 9 - 10", subjects: "English, Urdu/Arabic, Mathematics, Science (Physics, Chemistry, Biology), Social Science, Computer Applications", features: "Board exam preparation, Career counseling, Special coaching" },
    { id: 4, level: "Higher Secondary", grades: "Class 11 - 12", subjects: "Science Stream: Physics, Chemistry, Biology/Mathematics, Computer Science; Arts Stream: Available subjects", features: "Specialized coaching, Entrance exam prep, Research projects" }
  ]

  const methods = teachingMethods.length > 0 ? teachingMethods : [
    { id: 1, title: "Interactive Learning", description: "Student-centered approach with active participation, discussions, and hands-on activities that make learning engaging and effective.", icon_name: "Users" },
    { id: 2, title: "Smart Classrooms", description: "Technology-enhanced learning with digital boards, multimedia presentations, and interactive educational tools.", icon_name: "Presentation" },
    { id: 3, title: "Project-Based Learning", description: "Real-world projects that develop critical thinking, problem-solving skills, and practical application of knowledge.", icon_name: "Target" },
    { id: 4, title: "Continuous Assessment", description: "Regular evaluations through tests, assignments, and presentations to track and improve student progress.", icon_name: "CheckCircle" },
    { id: 5, title: "Remedial Classes", description: "Special attention to students who need extra support to ensure no one is left behind.", icon_name: "Lightbulb" },
    { id: 6, title: "Activity-Based Learning", description: "Learning through games, simulations, and creative activities that make education fun and memorable.", icon_name: "BookOpen" }
  ]

  const calendar = calendarEvents.length > 0 ? calendarEvents : [
    { id: 1, event_name: "School Reopening", event_date: "15th March 2025", category: "Academic" },
    { id: 2, event_name: "First Term Exams", event_date: "10th - 25th July 2025", category: "Examination" },
    { id: 3, event_name: "Summer Vacation", event_date: "1st - 31st August 2025", category: "Holiday" },
    { id: 4, event_name: "Annual Sports Week", event_date: "15th - 20th September 2025", category: "Event" },
    { id: 5, event_name: "Mid-Term Examinations", event_date: "1st - 15th October 2025", category: "Examination" },
    { id: 6, event_name: "Winter Break", event_date: "20th Dec - 28th Feb 2026", category: "Holiday" },
    { id: 7, event_name: "Annual Day Celebration", event_date: "5th March 2026", category: "Event" },
    { id: 8, event_name: "Final Examinations", event_date: "1st - 15th March 2026", category: "Examination" }
  ]

  const subjects = subjectsData.length > 0 ? subjectsData : [
    { id: 1, name: "English Language", category: "Languages" },
    { id: 2, name: "Urdu/Arabic", category: "Languages" },
    { id: 3, name: "Hindi", category: "Languages" },
    { id: 4, name: "Mathematics", category: "Core" },
    { id: 5, name: "Science", category: "Core" },
    { id: 6, name: "Social Studies", category: "Core" },
    { id: 7, name: "Computer Science", category: "Technology" },
    { id: 8, name: "Physical Education", category: "Co-curricular" }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Examination': return 'from-red-500 to-rose-500'
      case 'Holiday': return 'from-blue-500 to-cyan-500'
      case 'Event': return 'from-purple-500 to-violet-500'
      default: return 'from-green-500 to-emerald-500'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <PageHeader 
        title={academics.hero_title}
        subtitle={academics.hero_subtitle}
        badge="Academic Excellence"
      />

      {/* Curriculum Overview */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-5 py-2 mb-6">
              <BookOpen className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-semibold text-sm">JKBOSE Curriculum</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{academics.curriculum_heading}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{academics.curriculum_description}</p>
            <div className="mt-8 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto"></div>
          </div>

          {/* Class Level Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {classes.map((classInfo, index) => {
              const colors = classColors[index % classColors.length]
              
              return (
                <Card 
                  key={classInfo.id} 
                  className={`group border-2 ${colors.border} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                  
                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-start justify-between">
                      <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <GraduationCap className="text-white" size={28} />
                      </div>
                      <span className={`px-4 py-1.5 bg-gradient-to-r ${colors.gradient} text-white text-sm font-bold rounded-full`}>
                        {classInfo.grades}
                      </span>
                    </div>
                    <CardTitle className="text-2xl font-bold mt-4 group-hover:text-green-700 transition-colors">
                      {classInfo.level}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <BookOpen size={16} className={colors.text} />
                        Subjects Offered
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">{classInfo.subjects}</p>
                    </div>
                    
                    {classInfo.features && (
                      <div className={`pt-4 border-t ${colors.border}`}>
                        <p className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Sparkles size={16} className={colors.text} />
                          Key Features
                        </p>
                        <ul className="space-y-1">
                          {classInfo.features.split(',').map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle size={14} className={colors.text} />
                              {feature.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Teaching Methodology - Dark Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
              <Users className="w-4 h-4 text-green-400" />
              <span className="text-white font-semibold text-sm">Our Approach</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {academics.methodology_heading || "Teaching Methodology"}
            </h2>
            {academics.methodology_description && (
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">{academics.methodology_description}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {methods.map((method, index) => {
              const IconComponent = iconMap[method.icon_name as keyof typeof iconMap] || BookOpen
              
              return (
                <div 
                  key={method.id} 
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">{method.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{method.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-20"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full px-5 py-2 mb-6">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-blue-700 font-semibold text-sm">Important Dates</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {academics.calendar_heading || "Academic Calendar"} {academics.academic_year}
              </h2>
              <div className="mt-6 h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
            </div>
            
            {/* Timeline Calendar */}
            <div className="relative">
              {/* Center Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-blue-400 to-purple-400 hidden md:block"></div>
              
              <div className="space-y-6">
                {calendar.map((event, index) => {
                  const isLeft = index % 2 === 0
                  const gradient = getCategoryColor(event.category)
                  
                  return (
                    <div 
                      key={event.id} 
                      className={`flex items-center gap-4 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
                    >
                      {/* Card */}
                      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 border border-gray-100 inline-block w-full max-w-md">
                          <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                            <span className={`px-3 py-1 bg-gradient-to-r ${gradient} text-white text-xs font-bold rounded-full`}>
                              {event.category}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors">{event.event_name}</h3>
                          <p className="text-gray-500 flex items-center gap-2 mt-2 text-sm">
                            <Clock size={14} />
                            {event.event_date}
                          </p>
                        </div>
                      </div>
                      
                      {/* Center Dot */}
                      <div className="relative z-10 hidden md:block">
                        <div className={`w-5 h-5 bg-gradient-to-br ${gradient} rounded-full ring-4 ring-white shadow-lg`}></div>
                      </div>
                      
                      {/* Spacer */}
                      <div className="flex-1 hidden md:block"></div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div className="group">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">500+</p>
              <p className="text-green-100 text-sm">Happy Students</p>
            </div>
            <div className="group">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">25+</p>
              <p className="text-green-100 text-sm">Qualified Teachers</p>
            </div>
            <div className="group">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">95%</p>
              <p className="text-green-100 text-sm">Pass Rate</p>
            </div>
            <div className="group">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">30+</p>
              <p className="text-green-100 text-sm">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
