import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Palette, Music, Beaker } from 'lucide-react'

export const metadata = {
  title: 'Co-curricular Activities',
  description: 'Explore our sports, arts, and extracurricular programs.',
}

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Co-curricular Activities</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Nurturing talents beyond academics
          </p>
        </div>
      </section>

      {/* Sports */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sports & Physical Education</h2>
            <p className="text-center text-gray-600 mb-12">
              We believe in the holistic development of students through sports and physical activities
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Trophy className="text-blue-600 mb-2" size={32} />
                  <CardTitle>Outdoor Sports</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Cricket</li>
                    <li>• Football</li>
                    <li>• Volleyball</li>
                    <li>• Athletics</li>
                    <li>• Kabaddi</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Trophy className="text-blue-600 mb-2" size={32} />
                  <CardTitle>Indoor Sports</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Chess</li>
                    <li>• Table Tennis</li>
                    <li>• Badminton</li>
                    <li>• Carrom</li>
                    <li>• Indoor Games</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Trophy className="text-blue-600 mb-2" size={32} />
                  <CardTitle>Martial Arts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Karate</li>
                    <li>• Judo</li>
                    <li>• Yoga</li>
                    <li>• Self-defense</li>
                    <li>• Physical Fitness</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Arts & Culture */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Arts & Cultural Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <Palette className="text-blue-600 mb-2" size={32} />
                  <CardTitle>Visual Arts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Drawing & Painting</li>
                    <li>• Calligraphy</li>
                    <li>• Craft Work</li>
                    <li>• Poster Making</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Music className="text-blue-600 mb-2" size={32} />
                  <CardTitle>Performing Arts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Music & Singing</li>
                    <li>• Dance</li>
                    <li>• Drama & Theatre</li>
                    <li>• Recitation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Clubs & Societies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Clubs & Societies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Science Club", icon: Beaker, desc: "Experiments & Projects" },
                { name: "Literary Club", icon: Palette, desc: "Reading & Writing" },
                { name: "Debate Society", icon: Music, desc: "Public Speaking" },
                { name: "Environment Club", icon: Trophy, desc: "Eco Activities" },
                { name: "Quiz Club", icon: Beaker, desc: "General Knowledge" },
                { name: "Tech Club", icon: Palette, desc: "Coding & Robotics" }
              ].map((club, index) => (
                <Card key={index}>
                  <CardHeader>
                    <club.icon className="text-blue-600 mb-2" size={28} />
                    <CardTitle className="text-lg">{club.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{club.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Annual Events */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Annual Events</h2>
            <div className="space-y-4">
              {[
                { event: "Annual Sports Day", month: "November", desc: "Inter-house sports competitions and athletic meets" },
                { event: "Science Exhibition", month: "February", desc: "Student projects and scientific demonstrations" },
                { event: "Annual Day", month: "March", desc: "Cultural programs and prize distribution" },
                { event: "Independence Day", month: "August", desc: "Patriotic celebrations and cultural programs" }
              ].map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-blue-600 text-sm">{item.month}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{item.event}</h3>
                        <p className="text-gray-600">{item.desc}</p>
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
