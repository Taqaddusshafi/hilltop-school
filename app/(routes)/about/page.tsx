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

  // Fallback data
  const about = aboutData || {
    hero_title: "About Us",
    hero_subtitle: "Empowering minds and building futures since 1995",
    legacy_heading: "Our Legacy",
    legacy_content: "Hilltop Educational Institute was established in 1995..."
  }

  const vmvCards = visionMissionValues.length > 0 ? visionMissionValues : [
    { id: 1, type: 'vision', title: 'Our Vision', content: 'To be a leading educational institution...', icon_name: 'Eye' },
    { id: 2, type: 'mission', title: 'Our Mission', content: 'To provide quality education...', icon_name: 'Target' },
    { id: 3, type: 'values', title: 'Our Values', content: '• Excellence in Education\n• Integrity & Honesty', icon_name: 'Heart' }
  ]

  const principal = principalData || {
    heading: "Principal's Message",
    message: "Dear Students, Parents, and Well-wishers...",
    principal_name: "Dr. Mohammad Ashraf",
    principal_title: "Principal, Hilltop Educational Institute",
    principal_image_url: null
  }

  const achievements = achievementsData.length > 0 ? achievementsData : [
    { id: 1, title: "Best School Award", year: "2024", organization: "State Education Board" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Dynamic */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{about.hero_title}</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            {about.hero_subtitle}
          </p>
        </div>
      </section>

      {/* School History - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{about.legacy_heading}</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              {about.legacy_content.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values - Dynamic */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vmvCards.map((item) => {
              const IconComponent = iconMap[item.icon_name as keyof typeof iconMap] || Eye
              
              return (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="text-green-600" size={24} />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {item.type === 'values' ? (
                      <ul className="text-gray-600 space-y-2">
                        {item.content.split('\n').map((value: string, idx: number) => (
                          <li key={idx}>{value}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">{item.content}</p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Principal's Message - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{principal.heading}</h2>
            <div className="bg-green-50 p-8 rounded-lg">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex-shrink-0 relative overflow-hidden">
                  {principal.principal_image_url && (
                    <Image
                      src={principal.principal_image_url}
                      alt={principal.principal_name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  {principal.message.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className={`text-gray-700 mb-4 ${index === 0 ? 'italic' : ''}`}>
                      {paragraph}
                    </p>
                  ))}
                  <div className="mt-6">
                    <p className="font-semibold text-gray-900">{principal.principal_name}</p>
                    <p className="text-gray-600">{principal.principal_title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements - Dynamic */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recognition and awards that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <Award className="text-green-600 mb-2" size={32} />
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {achievement.year} - {achievement.organization}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
