import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, FlaskConical, BookOpen, Laptop, Bus, Activity } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Infrastructure',
  description: 'Explore our modern facilities and infrastructure.',
}

const iconMap = {
  Building,
  FlaskConical,
  BookOpen,
  Laptop,
  Bus,
  Activity,
}

export default async function InfrastructurePage() {
  const supabase = await createServerSupabaseClient()
  
  // Fetch all data
  let pageData = null
  let facilities: any[] = []
  let labs: any[] = []
  let classroomStats: any[] = []
  let libraryStats: any[] = []
  let safetyFeatures: any[] = []

  if (supabase) {
    const [page, facilitiesData, labsData, classStats, libStats, safetyData] = await Promise.all([
      supabase.from('infrastructure_page').select('*').eq('is_active', true).single(),
      supabase.from('main_facilities').select('*').eq('is_active', true).order('display_order'),
      supabase.from('laboratories').select('*').eq('is_active', true).order('display_order'),
      supabase.from('classroom_stats').select('*').eq('is_active', true).order('display_order'),
      supabase.from('library_stats').select('*').eq('is_active', true).order('display_order'),
      supabase.from('safety_features').select('*').eq('is_active', true).order('display_order')
    ])

    pageData = page.data
    facilities = facilitiesData.data || []
    labs = labsData.data || []
    classroomStats = classStats.data || []
    libraryStats = libStats.data || []
    safetyFeatures = safetyData.data || []
  }

  // Fallback data
  const infrastructurePage = pageData || {
    hero_title: "Infrastructure & Facilities",
    hero_subtitle: "Modern amenities for a complete learning experience",
    facilities_heading: "Our Facilities",
    labs_heading: "Laboratories",
    smart_classrooms_heading: "Smart Classrooms",
    smart_classrooms_description: "Our smart classrooms are equipped...",
    library_heading: "Library",
    library_description: "Our library is the heart of academic excellence...",
    safety_heading: "Safety & Security"
  }

  const facilitiesList = facilities.length > 0 ? facilities : []
  const labsList = labs.length > 0 ? labs : []
  const classStats = classroomStats.length > 0 ? classroomStats : []
  const libStats = libraryStats.length > 0 ? libraryStats : []
  const safetyList = safetyFeatures.length > 0 ? safetyFeatures : []

  return (
    <div className="min-h-screen">
      {/* Hero Section - Dynamic */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{infrastructurePage.hero_title}</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            {infrastructurePage.hero_subtitle}
          </p>
        </div>
      </section>

      {/* Main Facilities - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{infrastructurePage.facilities_heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilitiesList.map((facility) => {
                const IconComponent = iconMap[facility.icon_name as keyof typeof iconMap] || Building
                
                return (
                  <Card key={facility.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <IconComponent className="text-green-600" size={28} />
                      </div>
                      <CardTitle>{facility.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{facility.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Facilities - Dynamic */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Laboratories - Dynamic */}
            {labsList.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{infrastructurePage.labs_heading}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {labsList.map((lab) => (
                    <Card key={lab.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{lab.lab_name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {lab.features.map((feature: string, idx: number) => (
                            <li key={idx}>• {feature}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Smart Classrooms - Dynamic */}
            {classStats.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{infrastructurePage.smart_classrooms_heading}</h2>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">
                      {infrastructurePage.smart_classrooms_description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {classStats.map((stat) => (
                        <div key={stat.id} className="text-center">
                          <p className="text-2xl font-bold text-green-600">{stat.stat_value}</p>
                          <p className="text-sm text-gray-600">{stat.stat_label}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Library - Dynamic */}
            {libStats.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{infrastructurePage.library_heading}</h2>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">
                      {infrastructurePage.library_description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {libStats.map((stat) => (
                        <div key={stat.id} className="text-center">
                          <p className="text-2xl font-bold text-green-600">{stat.stat_value}</p>
                          <p className="text-sm text-gray-600">{stat.stat_label}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Safety & Security - Dynamic */}
      {safetyList.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{infrastructurePage.safety_heading}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {safetyList.map((safety) => (
                  <Card key={safety.id}>
                    <CardHeader>
                      <CardTitle>{safety.feature_title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{safety.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
