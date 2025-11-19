import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Palette, Music, Beaker } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Co-curricular Activities',
  description: 'Explore our sports, arts, and extracurricular programs.',
}

const iconMap = {
  Trophy,
  Palette,
  Music,
  Beaker,
}

export default async function ActivitiesPage() {
  const supabase = await createServerSupabaseClient()
  
  // Fetch all data
  let pageData = null
  let sportsCategories: any[] = []
  let sportsList: any[] = []
  let artsCategories: any[] = []
  let artsList: any[] = []
  let clubs: any[] = []
  let events: any[] = []

  if (supabase) {
    const [page, sportsCateg, sports, artsCateg, arts, clubsData, eventsData] = await Promise.all([
      supabase.from('activities_page').select('*').eq('is_active', true).single(),
      supabase.from('sports_categories').select('*').eq('is_active', true).order('display_order'),
      supabase.from('sports_list').select('*').eq('is_active', true).order('display_order'),
      supabase.from('arts_categories').select('*').eq('is_active', true).order('display_order'),
      supabase.from('arts_list').select('*').eq('is_active', true).order('display_order'),
      supabase.from('clubs').select('*').eq('is_active', true).order('display_order'),
      supabase.from('annual_events').select('*').eq('is_active', true).order('display_order')
    ])

    pageData = page.data
    sportsCategories = sportsCateg.data || []
    sportsList = sports.data || []
    artsCategories = artsCateg.data || []
    artsList = arts.data || []
    clubs = clubsData.data || []
    events = eventsData.data || []
  }

  // Fallback data
  const activitiesPage = pageData || {
    hero_title: "Co-curricular Activities",
    hero_subtitle: "Nurturing talents beyond academics",
    sports_heading: "Sports & Physical Education",
    sports_description: "We believe in holistic development through sports",
    arts_heading: "Arts & Cultural Activities",
    clubs_heading: "Clubs & Societies",
    events_heading: "Annual Events"
  }

  // Group sports by category
  const sportsGrouped = sportsCategories.map(category => ({
    ...category,
    sports: sportsList.filter(sport => sport.category_id === category.id)
  }))

  // Group arts by category
  const artsGrouped = artsCategories.map(category => ({
    ...category,
    arts: artsList.filter(art => art.category_id === category.id)
  }))

  return (
    <div className="min-h-screen">
      {/* Hero Section - Dynamic */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{activitiesPage.hero_title}</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            {activitiesPage.hero_subtitle}
          </p>
        </div>
      </section>

      {/* Sports - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{activitiesPage.sports_heading}</h2>
            {activitiesPage.sports_description && (
              <p className="text-center text-gray-600 mb-12">
                {activitiesPage.sports_description}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sportsGrouped.map((category) => {
                const IconComponent = iconMap[category.icon_name as keyof typeof iconMap] || Trophy
                
                return (
                  <Card key={category.id}>
                    <CardHeader>
                      <IconComponent className="text-green-600 mb-2" size={32} />
                      <CardTitle>{category.category_name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-gray-600 space-y-2">
                        {category.sports.map((sport: any) => (
                          <li key={sport.id}>• {sport.sport_name}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Arts & Culture - Dynamic */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{activitiesPage.arts_heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artsGrouped.map((category) => {
                const IconComponent = iconMap[category.icon_name as keyof typeof iconMap] || Palette
                
                return (
                  <Card key={category.id}>
                    <CardHeader>
                      <IconComponent className="text-green-600 mb-2" size={32} />
                      <CardTitle>{category.category_name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-gray-600 space-y-2">
                        {category.arts.map((art: any) => (
                          <li key={art.id}>• {art.art_name}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Clubs & Societies - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{activitiesPage.clubs_heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs.map((club) => {
                const IconComponent = iconMap[club.icon_name as keyof typeof iconMap] || Trophy
                
                return (
                  <Card key={club.id}>
                    <CardHeader>
                      <IconComponent className="text-green-600 mb-2" size={28} />
                      <CardTitle className="text-lg">{club.club_name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{club.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Annual Events - Dynamic */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{activitiesPage.events_heading}</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-green-600 text-sm">{event.event_month}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{event.event_name}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
