import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Eye, Heart, Award } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import Image from 'next/image'

export const metadata = {
  title: 'About Us',
  description: 'Learn about Hilltop Educational Institute - our history, vision, mission, and values.',
}

const iconMap = {
  Eye,
  Target,
  Heart,
}

export default async function AboutPage() {
  const supabase = await createServerSupabaseClient()
  
  // Fetch all data
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

  // Fallback data with safe defaults
  const about = aboutData || {
    hero_title: "About Us",
    hero_subtitle: "Empowering minds and building futures since 1995",
    legacy_heading: "Our Legacy",
    legacy_content: "Hilltop Educational Institute was established in 1995 with a vision to provide quality education to students in the region. Over the years, we have grown into one of the most respected educational institutions, known for our commitment to academic excellence and holistic development."
  }

  const vmvCards = visionMissionValues.length > 0 ? visionMissionValues : [
    { id: 1, type: 'vision', title: 'Our Vision', content: 'To be a leading educational institution that nurtures young minds and prepares them for a successful future through innovative teaching methods and holistic development.', icon_name: 'Eye' },
    { id: 2, type: 'mission', title: 'Our Mission', content: 'To provide quality education in a nurturing environment, fostering academic excellence, moral values, and leadership skills in every student.', icon_name: 'Target' },
    { id: 3, type: 'values', title: 'Our Values', content: 'Excellence in Education\\nIntegrity & Honesty\\nRespect & Compassion\\nInnovation & Creativity\\nCommunity Service', icon_name: 'Heart' }
  ]

  const principal = principalData || {
    heading: "Principal's Message",
    message: "Dear Students, Parents, and Well-wishers,\\n\\nIt gives me immense pleasure to welcome you to Hilltop Educational Institute. Our institution has always been committed to providing a nurturing environment where students can grow academically, socially, and emotionally.\\n\\nWe believe that education is not just about academic excellence, but about developing well-rounded individuals who are equipped to face the challenges of tomorrow. Our dedicated faculty and modern facilities ensure that every student receives the best possible education.\\n\\nI invite you to be part of our journey towards excellence.",
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
      {/* Hero Section - Enhanced with pattern and animations */}
      <section className="relative bg-gradient-to-r from-green-900 to-green-700 text-white py-24 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              {about.hero_title}
            </h1>
            <p className="text-xl md:text-2xl text-green-100 drop-shadow-md leading-relaxed">
              {about.hero_subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* School History - Enhanced with accent line and better typography */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-4">
              <div className="h-1 w-20 bg-gradient-to-r from-green-600 to-green-400 rounded-full"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {about.legacy_heading}
            </h2>
            
            <div className="prose prose-lg max-w-none">
              {about.legacy_content?.split('\\n\\n').map((paragraph: string, index: number) => (
                <p 
                  key={index} 
                  className={`mb-6 text-gray-700 leading-relaxed text-lg ${
                    index === 0 ? 'first-letter:text-5xl first-letter:font-bold first-letter:text-green-600 first-letter:mr-2 first-letter:float-left' : ''
                  }`}
                >
                  {processText(paragraph)}
                </p>
              )) || <p className="mb-6 text-gray-700 leading-relaxed text-lg">{about.legacy_content}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values - Enhanced with modern card design */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="h-1 w-20 bg-gradient-to-r from-green-600 to-green-400 rounded-full mx-auto"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Foundation</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide us toward excellence in education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {vmvCards.map((item, index) => {
              const IconComponent = iconMap[item.icon_name as keyof typeof iconMap] || Eye
              
              return (
                <Card 
                  key={item.id}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white overflow-hidden group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardHeader className="relative z-10 pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <IconComponent className="text-white" size={28} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    {item.type === 'values' ? (
                      <ul className="text-gray-700 space-y-3 leading-relaxed">
                        {item.content?.split('\\n').filter((v: string) => v.trim()).map((value: string, idx: number) => (
                          <li key={idx} className="flex items-start group/item">
                            <span className="text-green-600 mr-3 text-xl group-hover/item:scale-125 transition-transform">•</span>
                            <span className="flex-1">{value.replace('•', '').trim()}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700 leading-relaxed text-base">
                        {processText(item.content)}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Principal's Message - Enhanced with modern layout */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="inline-block mb-4">
              <div className="h-1 w-20 bg-gradient-to-r from-green-600 to-green-400 rounded-full"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
              {principal.heading || "Principal's Message"}
            </h2>
            
            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 p-8 md:p-12 rounded-3xl shadow-2xl border border-green-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-20"></div>
              
              <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
                <div className="relative flex-shrink-0 group">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl relative overflow-hidden shadow-2xl ring-4 ring-white group-hover:scale-105 transition-transform duration-300">
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
                  <div className="absolute -top-4 -left-4 text-6xl text-green-600 opacity-20 font-serif leading-none">"</div>
                </div>
                
                <div className="flex-1">
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
                        className={`mb-6 leading-relaxed text-base md:text-lg ${
                          index === 0 
                            ? 'text-green-800 font-semibold text-xl md:text-2xl italic border-l-4 border-green-600 pl-6 py-2' 
                            : 'text-gray-800'
                        }`}
                      >
                        {processedParagraph}
                      </p>
                    )
                  })}
                  
                  <div className="mt-8 pt-6 border-t-2 border-green-200">
                    <p className="font-bold text-gray-900 text-xl md:text-2xl mb-1">
                      {principal.principal_name || 'Principal'}
                    </p>
                    <p className="text-green-700 font-semibold text-base md:text-lg">
                      {principal.principal_title || 'Principal'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements - Enhanced with modern grid and animations */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="h-1 w-20 bg-gradient-to-r from-green-600 to-green-400 rounded-full mx-auto"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Recognition and awards that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <Card 
                key={achievement.id}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="pb-3 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-md">
                    <Award className="text-green-600" size={32} />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 leading-snug group-hover:text-green-700 transition-colors duration-300">
                    {achievement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-2">
                    <p className="text-base font-bold text-green-700">{achievement.year}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {achievement.organization}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
