import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Eye, Heart, Award, Quote, Users, Trophy, Sparkles } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import Image from 'next/image'
import PageHeader from '@/components/ui/PageHeader'

export const metadata = {
  title: 'About Us',
  description: 'Learn about Hilltop Educational Institute - our history, vision, mission, and values.',
}

const iconMap: { [key: string]: any } = {
  Eye,
  Target,
  Heart,
}

const cardColors = [
  { gradient: "from-blue-500 to-cyan-500", bg: "from-blue-50 to-cyan-50", text: "text-blue-600" },
  { gradient: "from-green-500 to-emerald-500", bg: "from-green-50 to-emerald-50", text: "text-green-600" },
  { gradient: "from-purple-500 to-violet-500", bg: "from-purple-50 to-violet-50", text: "text-purple-600" },
]

export default async function AboutPage() {
  const supabase = await createServerSupabaseClient()
  
  // Fetch all data from Supabase
  let aboutData = null
  let visionMissionValues: any[] = []
  let principalData = null
  let achievementsData: any[] = []

  if (supabase) {
    const [about, vmv, principal, achievements] = await Promise.all([
      supabase.from('about_page').select('*').eq('is_active', true).single(),
      supabase.from('vision_mission_values').select('*').eq('is_active', true).order('display_order'),
      supabase.from('principal_message').select('*').eq('is_active', true).single(),
      supabase.from('achievements').select('*').eq('is_active', true).order('display_order')
    ])

    aboutData = about.data
    visionMissionValues = vmv.data || []
    principalData = principal.data
    achievementsData = achievements.data || []
  }

  // Fallback data
  const about = aboutData || {
    hero_title: "About Us",
    hero_subtitle: "Empowering minds and building futures since 1995",
    legacy_heading: "Our Legacy",
    legacy_content: "Hilltop Educational Institute was established in 1995 with a vision to provide quality education to students in the region. Over the years, we have grown into one of the most respected educational institutions, known for our commitment to academic excellence and holistic development."
  }

  const vmvCards = visionMissionValues.length > 0 ? visionMissionValues : [
    { id: 1, type: 'vision', title: 'Our Vision', content: 'To be a leading educational institution that nurtures young minds...', icon_name: 'Eye' },
    { id: 2, type: 'mission', title: 'Our Mission', content: 'To provide quality education in a nurturing environment...', icon_name: 'Target' },
    { id: 3, type: 'values', title: 'Our Values', content: 'Excellence in Education\\nIntegrity & Honesty\\nRespect & Compassion', icon_name: 'Heart' }
  ]

  const principal = principalData || {
    heading: "Principal's Message",
    message: "Dear Students, Parents, and Well-wishers,\\n\\nIt gives me immense pleasure to welcome you to Hilltop Educational Institute...",
    principal_name: "Dr. Mohammad Ashraf",
    principal_title: "Principal, Hilltop Educational Institute",
    principal_image_url: null
  }

  const achievements = achievementsData.length > 0 ? achievementsData : [
    { id: 1, title: "Best School Award", year: "2024", organization: "State Education Board" },
    { id: 2, title: "Academic Excellence", year: "2023", organization: "Regional Education Authority" },
    { id: 3, title: "Sports Championship", year: "2023", organization: "Inter-School Competition" },
    { id: 4, title: "Community Service Award", year: "2022", organization: "District Administration" }
  ]

  // Helper function to safely process text with line breaks
  const processText = (text: string | null | undefined) => {
    if (!text) return null
    return text.split('\\n').map((line, index, array) => (
      <span key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <PageHeader 
        title={about.hero_title}
        subtitle={about.hero_subtitle}
        badge="Est. 1995"
      />

      {/* School History - Premium Design */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-5 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-semibold text-sm">Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {about.legacy_heading}
              </h2>
              <div className="mt-4 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto"></div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-bl-[100px]"></div>
              <Quote className="absolute top-8 right-8 w-8 h-8 text-green-300" />
              
              <div className="prose prose-lg max-w-none relative z-10">
                {about.legacy_content?.split('\\n\\n').map((paragraph: string, index: number) => (
                  <p 
                    key={index} 
                    className={`mb-6 text-gray-700 leading-relaxed text-lg ${
                      index === 0 ? 'first-letter:text-5xl first-letter:font-bold first-letter:text-green-600 first-letter:mr-2 first-letter:float-left first-letter:leading-none' : ''
                    }`}
                  >
                    {processText(paragraph)}
                  </p>
                )) || <p className="mb-6 text-gray-700 leading-relaxed text-lg">{about.legacy_content}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values - Premium Cards */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
              <Target className="w-4 h-4 text-green-400" />
              <span className="text-white font-semibold text-sm">Our Foundation</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              What <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Drives Us</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The principles that guide us toward excellence in education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {vmvCards.map((item, index) => {
              const IconComponent = iconMap[item.icon_name as keyof typeof iconMap] || Eye
              const colors = cardColors[index % cardColors.length]
              
              return (
                <div 
                  key={item.id}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <IconComponent className="text-white" size={28} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors">
                      {item.title}
                    </h3>
                    
                    {item.type === 'values' ? (
                      <ul className="text-gray-300 space-y-3 leading-relaxed">
                        {item.content?.split('\\n').filter((v: string) => v.trim()).map((value: string, idx: number) => (
                          <li key={idx} className="flex items-start group/item">
                            <span className={`${colors.text} mr-3 text-xl`}>•</span>
                            <span className="flex-1">{value.replace('•', '').trim()}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-300 leading-relaxed">
                        {processText(item.content)}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Principal's Message - Premium Design */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-5 py-2 mb-6">
                <Quote className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-semibold text-sm">Leadership</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {principal.heading || "Principal's Message"}
              </h2>
              <div className="mt-4 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Principal Image Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 text-center">
                    <div className="relative w-40 h-40 mx-auto mb-6">
                      <div className="absolute -inset-2 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full opacity-20 animate-pulse"></div>
                      <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-full overflow-hidden ring-4 ring-white shadow-2xl">
                        {principal.principal_image_url ? (
                          <Image
                            src={principal.principal_image_url}
                            alt={principal.principal_name || 'Principal'}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white text-5xl font-bold">
                            {principal.principal_name?.charAt(0) || 'P'}
                          </div>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {principal.principal_name || 'Principal'}
                    </h3>
                    <p className="text-green-600 font-medium text-sm">
                      {principal.principal_title || 'Principal'}
                    </p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                      <div className="text-center">
                        <p className="text-2xl font-bold gradient-text">25+</p>
                        <p className="text-xs text-gray-500">Years Exp.</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold gradient-text">10K+</p>
                        <p className="text-xs text-gray-500">Alumni</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Message Content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-green-100" />
                  
                  <div className="relative z-10">
                    {principal.message?.split('\\n\\n').map((paragraph: string, index: number) => {
                      const processedParagraph = paragraph.split('\\n').map((line, lineIndex, lineArray) => (
                        <span key={lineIndex}>
                          {line}
                          {lineIndex < lineArray.length - 1 && <br />}
                        </span>
                      ))

                      return (
                        <p 
                          key={index} 
                          className={`mb-6 leading-relaxed ${
                            index === 0 
                              ? 'text-xl md:text-2xl text-green-800 font-medium italic border-l-4 border-green-500 pl-6 py-2' 
                              : 'text-gray-700 text-lg'
                          }`}
                        >
                          {processedParagraph}
                        </p>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements - Premium Grid */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full px-5 py-2 mb-6">
              <Trophy className="w-4 h-4 text-yellow-600" />
              <span className="text-yellow-700 font-semibold text-sm">Recognition</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Recognition and awards that reflect our commitment to excellence
            </p>
            <div className="mt-6 h-1 w-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-6 border border-gray-100 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Award className="text-white" size={24} />
                  </div>
                  
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded-full mb-3">
                    {achievement.year}
                  </span>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600">
                    {achievement.organization}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
