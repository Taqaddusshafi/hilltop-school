import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, FileText, Book, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Students Corner',
  description: 'Resources and information for students.',
}

export default function StudentsPage() {
  const downloads = [
    { title: "Class Timetable", category: "Academic", size: "245 KB" },
    { title: "Annual Syllabus", category: "Academic", size: "1.2 MB" },
    { title: "Examination Schedule", category: "Exam", size: "180 KB" },
    { title: "School Handbook", category: "General", size: "3.5 MB" },
    { title: "Assignment Guidelines", category: "Academic", size: "420 KB" },
  ]

  const achievements = [
    {
      name: "Aamir Hussain",
      class: "Class 12",
      achievement: "State Topper in Science Stream",
      year: "2024"
    },
    {
      name: "Sana Mir",
      class: "Class 10",
      achievement: "Gold Medal in State Science Exhibition",
      year: "2024"
    },
    {
      name: "Bilal Ahmad",
      class: "Class 11",
      achievement: "National Level Chess Championship Winner",
      year: "2023"
    },
    {
      name: "Hina Rashid",
      class: "Class 9",
      achievement: "Best Speaker Award - Debate Competition",
      year: "2023"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Students Corner</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Resources, achievements, and essential downloads
          </p>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Downloads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {downloads.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="text-blue-600" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600">
                            {item.category} • {item.size}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* E-Library Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">E-Library</h2>
            <p className="text-gray-600 mb-8">
              Access digital resources, study materials, and reference books
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Book className="text-blue-600 mx-auto mb-2" size={32} />
                  <CardTitle className="text-lg">Study Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Chapter-wise notes for all subjects
                  </p>
                  <Button className="mt-4" variant="outline">Access Now</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <FileText className="text-blue-600 mx-auto mb-2" size={32} />
                  <CardTitle className="text-lg">Previous Papers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Previous year question papers
                  </p>
                  <Button className="mt-4" variant="outline">Access Now</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Book className="text-blue-600 mx-auto mb-2" size={32} />
                  <CardTitle className="text-lg">Reference Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Digital library of reference books
                  </p>
                  <Button className="mt-4" variant="outline">Access Now</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Student Achievements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Student Achievements</h2>
            <div className="space-y-4">
              {achievements.map((student, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Trophy className="text-yellow-600" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">{student.name}</h3>
                        <p className="text-sm text-gray-600">{student.class}</p>
                        <p className="text-gray-800 mt-2">{student.achievement}</p>
                        <p className="text-sm text-blue-600 mt-1">{student.year}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Alumni Network</h2>
            <p className="text-gray-600 mb-8">
              Our alumni are making us proud in various fields across the country
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">500+</p>
                <p className="text-sm text-gray-600 mt-2">Alumni Worldwide</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">50+</p>
                <p className="text-sm text-gray-600 mt-2">In Higher Studies</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">100+</p>
                <p className="text-sm text-gray-600 mt-2">Working Professionals</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">20+</p>
                <p className="text-sm text-gray-600 mt-2">Entrepreneurs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
