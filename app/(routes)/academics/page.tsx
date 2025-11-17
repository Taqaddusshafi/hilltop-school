import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Calendar, FileText, GraduationCap } from 'lucide-react'

export const metadata = {
  title: 'Academics',
  description: 'Explore our curriculum, subjects, and academic programs.',
}

export default function AcademicsPage() {
  const classes = [
    { level: "Primary", grades: "Class 1 - 5", subjects: "English, Urdu, Mathematics, Science, Social Studies, Computer" },
    { level: "Middle", grades: "Class 6 - 8", subjects: "English, Urdu, Mathematics, Science, Social Studies, Computer, Arts" },
    { level: "Secondary", grades: "Class 9 - 10", subjects: "English, Urdu, Mathematics, Science (Physics, Chemistry, Biology), Social Studies" },
    { level: "Higher Secondary", grades: "Class 11 - 12", subjects: "Science Stream, Commerce Stream, Arts Stream" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academics</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Comprehensive curriculum designed for holistic development
          </p>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Curriculum</h2>
            <p className="text-gray-600">
              We follow the state education board curriculum with a focus on conceptual learning, 
              practical application, and skill development. Our teaching methodology combines 
              traditional values with modern educational practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {classes.map((classInfo, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <GraduationCap className="text-blue-600" size={24} />
                    {classInfo.level}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-gray-900 mb-2">{classInfo.grades}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Subjects:</span> {classInfo.subjects}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Teaching Methodology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="text-blue-600 mb-2" size={32} />
                <CardTitle>Interactive Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Student-centered approach with group discussions, projects, and hands-on activities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="text-blue-600 mb-2" size={32} />
                <CardTitle>Regular Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Continuous evaluation through tests, assignments, and practical examinations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="text-blue-600 mb-2" size={32} />
                <CardTitle>Smart Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Digital boards and multimedia content for enhanced understanding.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Academic Calendar 2025-26</h2>
            <div className="bg-white border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Event</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-gray-700">School Reopening</td>
                    <td className="px-6 py-4 text-gray-600">1st April 2025</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">First Term Exam</td>
                    <td className="px-6 py-4 text-gray-600">15th - 30th July 2025</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Summer Vacation</td>
                    <td className="px-6 py-4 text-gray-600">1st - 15th August 2025</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Second Term Exam</td>
                    <td className="px-6 py-4 text-gray-600">1st - 15th December 2025</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Winter Vacation</td>
                    <td className="px-6 py-4 text-gray-600">20th Dec 2025 - 5th Jan 2026</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Annual Exam</td>
                    <td className="px-6 py-4 text-gray-600">1st - 20th March 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
