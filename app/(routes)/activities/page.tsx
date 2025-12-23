import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Palette, Music, Beaker, Calendar, Users, Medal, Sparkles, Star, Award, Target, Heart } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import PageHeader from '@/components/ui/PageHeader'

export const metadata = {
  title: 'Co-curricular Activities',
  description: 'Explore our sports, arts, and extracurricular programs.',
}

const iconMap: { [key: string]: any } = {
  Trophy,
  Palette,
  Music,
  Beaker,
  Medal,
  Star,
  Award,
  Target,
  Heart,
}

const categoryColors = [
  { gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  { gradient: "from-orange-500 to-amber-500", bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
  { gradient: "from-purple-500 to-violet-500", bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  { gradient: "from-green-500 to-emerald-500", bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
  { gradient: "from-pink-500 to-rose-500", bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200" },
]

export default async function ActivitiesPage() {
  const supabase = await createServerSupabaseClient()
  
  // Fetch all data from Supabase
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
    hero_subtitle: "Nurturing talents beyond academics through sports, arts, and creative pursuits",
    sports_heading: "Sports & Physical Education",
    sports_description: "We believe in holistic development through sports and physical fitness",
    arts_heading: "Arts & Cultural Activities",
    arts_description: "Fostering creativity and cultural awareness",
    clubs_heading: "Clubs & Societies",
    clubs_description: "Join communities that match your interests",
    events_heading: "Annual Events & Celebrations"
  }

  // Group sports by category
  const sportsGrouped = sportsCategories.length > 0 ? sportsCategories.map(category => ({
    ...category,
    sports: sportsList.filter(sport => sport.category_id === category.id)
  })) : [
    { id: 1, category_name: "Indoor Games", icon_name: "Trophy", sports: [{ id: 1, sport_name: "Chess" }, { id: 2, sport_name: "Carrom" }, { id: 3, sport_name: "Table Tennis" }] },
    { id: 2, category_name: "Outdoor Sports", icon_name: "Medal", sports: [{ id: 4, sport_name: "Cricket" }, { id: 5, sport_name: "Football" }, { id: 6, sport_name: "Volleyball" }] },
    { id: 3, category_name: "Athletics", icon_name: "Target", sports: [{ id: 7, sport_name: "Running" }, { id: 8, sport_name: "Long Jump" }, { id: 9, sport_name: "Shot Put" }] }
  ]

  // Group arts by category
  const artsGrouped = artsCategories.length > 0 ? artsCategories.map(category => ({
    ...category,
    arts: artsList.filter(art => art.category_id === category.id)
  })) : [
    { id: 1, category_name: "Visual Arts", icon_name: "Palette", arts: [{ id: 1, art_name: "Painting" }, { id: 2, art_name: "Sketching" }, { id: 3, art_name: "Craft Work" }] },
    { id: 2, category_name: "Performing Arts", icon_name: "Music", arts: [{ id: 4, art_name: "Music & Singing" }, { id: 5, art_name: "Drama" }, { id: 6, art_name: "Dance" }] }
  ]

  const clubsList = clubs.length > 0 ? clubs : [
    { id: 1, club_name: "Science Club", description: "Explore the wonders of science through experiments", icon_name: "Beaker", members: "50+" },
    { id: 2, club_name: "Literary Club", description: "For lovers of reading, writing, and debate", icon_name: "Star", members: "40+" },
    { id: 3, club_name: "Eco Club", description: "Environmental awareness and conservation activities", icon_name: "Heart", members: "35+" },
    { id: 4, club_name: "Computer Club", description: "Learn coding, web design, and digital skills", icon_name: "Target", members: "45+" },
    { id: 5, club_name: "Art Club", description: "Creative expression through various art forms", icon_name: "Palette", members: "30+" },
    { id: 6, club_name: "Sports Club", description: "Fitness, games, and team building activities", icon_name: "Trophy", members: "60+" }
  ]

  const eventsList = events.length > 0 ? events : [
    { id: 1, event_name: "Annual Sports Week", event_month: "Sep", description: "Week-long sports competition with all indoor and outdoor games", highlight: true },
    { id: 2, event_name: "Science Exhibition", event_month: "Nov", description: "Showcase of innovative science projects by students" },
    { id: 3, event_name: "Cultural Festival", event_month: "Dec", description: "Celebration of art, music, dance, and drama" },
    { id: 4, event_name: "Annual Day", event_month: "Mar", description: "Grand celebration with performances and prize distribution", highlight: true }
  ]

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <PageHeader 
        title={activitiesPage.hero_title}
        subtitle={activitiesPage.hero_subtitle}
        badge="Beyond Academics"
      />

      {/* Stats Banner */}
      <section className="py-6 bg-gradient-to-r from-blue-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-white text-center">
            <div className="group">
              <p className="text-3xl font-bold group-hover:scale-110 transition-transform">10+</p>
              <p className="text-blue-100 text-sm">Sports</p>
            </div>
            <div className="group">
              <p className="text-3xl font-bold group-hover:scale-110 transition-transform">6+</p>
              <p className="text-blue-100 text-sm">Art Forms</p>
            </div>
            <div className="group">
              <p className="text-3xl font-bold group-hover:scale-110 transition-transform">{clubsList.length}</p>
              <p className="text-blue-100 text-sm">Active Clubs</p>
            </div>
            <div className="group">
              <p className="text-3xl font-bold group-hover:scale-110 transition-transform">{eventsList.length}+</p>
              <p className="text-blue-100 text-sm">Annual Events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sports - Dark Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
                <Trophy className="w-4 h-4 text-blue-400" />
                <span className="text-white font-semibold text-sm">Physical Excellence</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{activitiesPage.sports_heading}</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">{activitiesPage.sports_description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sportsGrouped.map((category, index) => {
                const IconComponent = iconMap[category.icon_name as string] || Trophy
                const colors = categoryColors[index % categoryColors.length]
                
                return (
                  <div 
                    key={category.id} 
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <IconComponent className="text-white" size={28} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">{category.category_name}</h3>
                      <ul className="space-y-2">
                        {category.sports.map((sport: any) => (
                          <li key={sport.id} className="flex items-center gap-3 text-gray-300 group/item">
                            <span className={`w-2 h-2 bg-gradient-to-r ${colors.gradient} rounded-full group-hover/item:scale-150 transition-transform`}></span>
                            {sport.sport_name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Arts & Culture */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-violet-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-violet-100 rounded-full px-5 py-2 mb-6">
                <Palette className="w-4 h-4 text-purple-600" />
                <span className="text-purple-700 font-semibold text-sm">Creative Expression</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{activitiesPage.arts_heading}</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">{activitiesPage.arts_description}</p>
              <div className="mt-6 h-1 w-20 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {artsGrouped.map((category, index) => {
                const IconComponent = iconMap[category.icon_name as string] || Palette
                const colors = categoryColors[(index + 2) % categoryColors.length]
                
                return (
                  <div 
                    key={category.id} 
                    className={`group bg-white rounded-3xl shadow-2xl p-8 border-2 ${colors.border} hover:-translate-y-2 transition-all duration-500 overflow-hidden relative`}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.bg} to-transparent rounded-bl-[100px]`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="text-white" size={28} />
                      </div>
                      <h3 className={`text-2xl font-bold text-gray-900 mb-4 group-hover:${colors.text} transition-colors`}>{category.category_name}</h3>
                      <ul className="space-y-3">
                        {category.arts.map((art: any) => (
                          <li key={art.id} className="flex items-center gap-3 group/item">
                            <div className={`w-8 h-8 bg-gradient-to-br ${colors.gradient} rounded-lg flex items-center justify-center flex-shrink-0 shadow group-hover/item:scale-110 transition-transform`}>
                              <Star className="text-white" size={14} />
                            </div>
                            <span className="text-gray-700 font-medium">{art.art_name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Clubs & Societies */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-5 py-2 mb-6">
                <Users className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-semibold text-sm">Join & Explore</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{activitiesPage.clubs_heading}</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">{activitiesPage.clubs_description}</p>
              <div className="mt-6 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubsList.map((club, index) => {
                const IconComponent = iconMap[club.icon_name as string] || Trophy
                const colors = categoryColors[index % categoryColors.length]
                
                return (
                  <div 
                    key={club.id} 
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100"
                  >
                    <div className={`h-2 bg-gradient-to-r ${colors.gradient}`}></div>
                    <div className="p-6">
                      <div className={`w-14 h-14 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <IconComponent className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">{club.club_name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{club.description}</p>
                      {club.members && (
                        <div className={`inline-flex items-center gap-2 ${colors.bg} ${colors.text} rounded-full px-3 py-1 text-sm font-semibold`}>
                          <Users size={14} />
                          {club.members} Members
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Annual Events - Timeline */}
      <section className="py-24 bg-gradient-to-br from-orange-600 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2 mb-6">
                <Calendar className="w-4 h-4 text-white" />
                <span className="text-white font-semibold text-sm">Mark Your Calendar</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{activitiesPage.events_heading}</h2>
            </div>
            
            <div className="space-y-6">
              {eventsList.map((event, index) => (
                <div 
                  key={event.id} 
                  className={`group flex items-start gap-6 bg-white/10 backdrop-blur-sm border ${event.highlight ? 'border-white/40 bg-white/20' : 'border-white/20'} rounded-2xl p-6 hover:bg-white/20 transition-all duration-300`}
                >
                  <div className={`flex-shrink-0 w-20 h-20 ${event.highlight ? 'bg-white text-orange-600' : 'bg-white/20 text-white'} rounded-2xl flex flex-col items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl font-bold">{event.event_month?.substring(0, 3)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors">{event.event_name}</h3>
                        <p className="text-orange-100">{event.description}</p>
                      </div>
                      {event.highlight && (
                        <span className="bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full">
                          Highlight
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
