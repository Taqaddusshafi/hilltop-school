import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Microscope, Palette, Trophy, Award, Users, Target, Sparkles } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'

// Icon mapping object
const iconMap = {
  BookOpen,
  Microscope,
  Palette,
  Trophy,
  Award,
  Users,
  Target,
  Sparkles,
}

interface Highlight {
  id: number
  icon_name: string
  title: string
  description: string
  display_order: number
}

interface SectionContent {
  heading: string
  description: string
}

export default async function Highlights() {
  const supabase = await createServerSupabaseClient()
  
  // Fetch section heading and description
  const { data: sectionData } = await supabase
    .from('section_content')
    .select('heading, description')
    .eq('section_name', 'highlights')
    .eq('is_active', true)
    .single()

  // Fetch highlights data
  const { data: highlightsData } = await supabase
    .from('highlights')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  // Fallback data
  const section: SectionContent = sectionData || {
    heading: "Why Choose Hilltop?",
    description: "We provide a nurturing environment that fosters academic excellence and holistic development"
  }

  const highlights: Highlight[] = highlightsData || [
    {
      id: 1,
      icon_name: "BookOpen",
      title: "Quality Education",
      description: "Comprehensive curriculum following latest educational standards with focus on conceptual learning.",
      display_order: 1
    },
    {
      id: 2,
      icon_name: "Microscope",
      title: "Modern Labs",
      description: "Well-equipped science, computer, and language labs for practical learning experience.",
      display_order: 2
    },
    {
      id: 3,
      icon_name: "Palette",
      title: "Co-curricular Activities",
      description: "Sports, arts, music, and cultural activities for overall personality development.",
      display_order: 3
    },
    {
      id: 4,
      icon_name: "Trophy",
      title: "Achievements",
      description: "Consistent excellence in academics and extracurricular competitions at state level.",
      display_order: 4
    }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {section.heading}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {section.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item) => {
            const IconComponent = iconMap[item.icon_name as keyof typeof iconMap] || BookOpen
            
            return (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="text-green-600" size={24} />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
