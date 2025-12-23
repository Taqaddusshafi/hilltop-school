import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, FlaskConical, BookOpen, Laptop, Bus, Activity, Shield, Sparkles, Wifi, Monitor } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import PageHeader from '@/components/ui/PageHeader'

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
      {/* Premium Hero Section */}
      <PageHeader 
        title={infrastructurePage.hero_title}
        subtitle={infrastructurePage.hero_subtitle}
        badge="World-Class Facilities"
      />

      {/* Main Facilities */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-green-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-5 py-2 mb-6">
                <Building className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-semibold text-sm">Campus Features</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{infrastructurePage.facilities_heading}</h2>
              <div className="mt-4 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilitiesList.map((facility, index) => {
                const IconComponent = iconMap[facility.icon_name as keyof typeof iconMap] || Building
                
                return (
                  <Card key={facility.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white overflow-hidden card-3d">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardHeader className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <IconComponent className="text-white" size={28} />
                      </div>
                      <CardTitle className="text-xl group-hover:text-green-600 transition-colors">{facility.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-gray-600">{facility.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Facilities */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Laboratories */}
            {labsList.length > 0 && (
              <div>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full px-5 py-2 mb-6">
                    <FlaskConical className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-700 font-semibold text-sm">Practical Learning</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{infrastructurePage.labs_heading}</h2>
                  <div className="mt-4 h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {labsList.map((lab, index) => (
                    <Card key={lab.id} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                      <CardHeader>
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <FlaskConical className="text-white" size={20} />
                        </div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{lab.lab_name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {lab.features.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Smart Classrooms */}
            {classStats.length > 0 && (
              <div>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-violet-100 rounded-full px-5 py-2 mb-6">
                    <Monitor className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-700 font-semibold text-sm">Digital Learning</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{infrastructurePage.smart_classrooms_heading}</h2>
                  <div className="mt-4 h-1 w-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mx-auto"></div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
                    {infrastructurePage.smart_classrooms_description}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {classStats.map((stat, index) => (
                      <div key={stat.id} className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl">
                        <p className="text-3xl font-bold gradient-text mb-1">{stat.stat_value}</p>
                        <p className="text-sm text-gray-600">{stat.stat_label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Library */}
            {libStats.length > 0 && (
              <div>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full px-5 py-2 mb-6">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span className="text-amber-700 font-semibold text-sm">Knowledge Hub</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{infrastructurePage.library_heading}</h2>
                  <div className="mt-4 h-1 w-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto"></div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
                    {infrastructurePage.library_description}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {libStats.map((stat, index) => (
                      <div key={stat.id} className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl">
                        <p className="text-3xl font-bold text-amber-600 mb-1">{stat.stat_value}</p>
                        <p className="text-sm text-gray-600">{stat.stat_label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Safety & Security */}
      {safetyList.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 pattern-grid opacity-20"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-red-100/50 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-rose-100 rounded-full px-5 py-2 mb-6">
                  <Shield className="w-4 h-4 text-red-600" />
                  <span className="text-red-700 font-semibold text-sm">Your Child's Safety</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{infrastructurePage.safety_heading}</h2>
                <div className="mt-4 h-1 w-20 bg-gradient-to-r from-red-500 to-rose-500 rounded-full mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {safetyList.map((safety, index) => (
                  <Card key={safety.id} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Shield className="text-white" size={20} />
                      </div>
                      <CardTitle className="text-lg group-hover:text-red-600 transition-colors">{safety.feature_title}</CardTitle>
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
