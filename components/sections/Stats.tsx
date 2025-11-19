import { Users, BookOpen, Award, GraduationCap, School, Trophy, Star, Target } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'

// Icon mapping object
const iconMap = {
  Users,
  BookOpen,
  Award,
  GraduationCap,
  School,
  Trophy,
  Star,
  Target,
}

interface Stat {
  id: number
  icon_name: string
  value: string
  label: string
  display_order: number
}

export default async function Stats() {
  const supabase = await createServerSupabaseClient()
  
  let stats: Stat[] = []

  if (supabase) {
    const { data } = await supabase
      .from('stats')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
    
    stats = data || []
  }

  // Fallback data
  if (stats.length === 0) {
    stats = [
      { id: 1, icon_name: "Users", value: "2000+", label: "Students", display_order: 1 },
      { id: 2, icon_name: "BookOpen", value: "50+", label: "Qualified Teachers", display_order: 2 },
      { id: 3, icon_name: "Award", value: "100+", label: "Awards Won", display_order: 3 },
      { id: 4, icon_name: "GraduationCap", value: "95%", label: "Success Rate", display_order: 4 }
    ]
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const IconComponent = iconMap[stat.icon_name as keyof typeof iconMap] || Users
            
            return (
              <div key={stat.id} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <IconComponent className="text-green-600" size={32} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
