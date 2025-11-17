
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Eye, Heart, Award } from 'lucide-react'

export const metadata = {
  title: 'About Us',
  description: 'Learn about Hilltop Educational Institute - our history, vision, mission, and values.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Empowering minds and building futures since 1995
          </p>
        </div>
      </section>

      {/* School History */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Legacy</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                Hilltop Educational Institute was established in 1995 with a vision to provide quality education 
                to the students of Darend, Ganderbal and surrounding areas. Over the past three decades, we have 
                grown from a small school with 100 students to a premier educational institution serving over 2000 students.
              </p>
              <p className="mb-4">
                Our journey has been marked by continuous improvement, innovation in teaching methodologies, 
                and unwavering commitment to academic excellence. We take pride in our state-of-the-art infrastructure, 
                dedicated faculty, and holistic approach to education.
              </p>
              <p>
                Today, Hilltop Educational Institute stands as a beacon of quality education in the region, 
                with our alumni excelling in various fields across the country and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="text-blue-600" size={24} />
                </div>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To be a leading educational institution that nurtures future leaders, innovators, 
                  and responsible citizens who contribute positively to society.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="text-blue-600" size={24} />
                </div>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To provide quality education that empowers students with knowledge, skills, and values 
                  for holistic development and lifelong learning.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="text-blue-600" size={24} />
                </div>
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2">
                  <li>• Excellence in Education</li>
                  <li>• Integrity & Honesty</li>
                  <li>• Respect & Compassion</li>
                  <li>• Innovation & Creativity</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Principal's Message</h2>
            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div>
                  <p className="text-gray-700 mb-4 italic">
                    "Dear Students, Parents, and Well-wishers,
                  </p>
                  <p className="text-gray-700 mb-4">
                    It gives me immense pleasure to welcome you to Hilltop Educational Institute. 
                    Our institution has always been committed to providing a nurturing environment 
                    where students can grow academically, socially, and emotionally.
                  </p>
                  <p className="text-gray-700 mb-4">
                    We believe that education is not just about academic excellence, but about 
                    developing well-rounded individuals who are equipped to face the challenges 
                    of tomorrow. Our dedicated faculty and modern facilities ensure that every 
                    student receives the best possible education.
                  </p>
                  <p className="text-gray-700 mb-4">
                    I invite you to be part of our journey towards excellence."
                  </p>
                  <div className="mt-6">
                    <p className="font-semibold text-gray-900">Dr. Mohammad Ashraf</p>
                    <p className="text-gray-600">Principal, Hilltop Educational Institute</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recognition and awards that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Best School Award", year: "2024", org: "State Education Board" },
              { title: "Excellence in Sports", year: "2023", org: "Regional Sports Authority" },
              { title: "Academic Excellence", year: "2023", org: "District Education Office" },
              { title: "Innovation in Teaching", year: "2022", org: "National Education Forum" }
            ].map((achievement, index) => (
              <Card key={index}>
                <CardHeader>
                  <Award className="text-blue-600 mb-2" size={32} />
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {achievement.year} - {achievement.org}
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
