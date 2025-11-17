
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Microscope, Palette, Trophy } from 'lucide-react'

export default function Highlights() {
  const highlights = [
    {
      icon: BookOpen,
      title: "Quality Education",
      description: "Comprehensive curriculum following latest educational standards with focus on conceptual learning."
    },
    {
      icon: Microscope,
      title: "Modern Labs",
      description: "Well-equipped science, computer, and language labs for practical learning experience."
    },
    {
      icon: Palette,
      title: "Co-curricular Activities",
      description: "Sports, arts, music, and cultural activities for overall personality development."
    },
    {
      icon: Trophy,
      title: "Achievements",
      description: "Consistent excellence in academics and extracurricular competitions at state level."
    }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Hilltop?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide a nurturing environment that fosters academic excellence and holistic development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="text-blue-600" size={24} />
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
