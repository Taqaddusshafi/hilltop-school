
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Award } from 'lucide-react'

export const metadata = {
  title: 'Faculty',
  description: 'Meet our dedicated and experienced faculty members.',
}

export default function FacultyPage() {
  const facultyMembers = [
    {
      name: "Dr. Aisha Khan",
      position: "Principal",
      qualification: "Ph.D. in Education",
      subject: "School Administration",
      experience: "25 years"
    },
    {
      name: "Prof. Sameer Ahmad",
      position: "Vice Principal",
      qualification: "M.A., B.Ed.",
      subject: "English & Administration",
      experience: "20 years"
    },
    {
      name: "Mrs. Rukhsana Bano",
      position: "Senior Teacher",
      qualification: "M.Sc., B.Ed.",
      subject: "Mathematics",
      experience: "15 years"
    },
    {
      name: "Mr. Farooq Ahmed",
      position: "Senior Teacher",
      qualification: "M.Sc., B.Ed.",
      subject: "Physics & Chemistry",
      experience: "18 years"
    },
    {
      name: "Mrs. Shaista Akhtar",
      position: "Teacher",
      qualification: "M.A., B.Ed.",
      subject: "Urdu & Islamic Studies",
      experience: "12 years"
    },
    {
      name: "Mr. Yasir Hamid",
      position: "Teacher",
      qualification: "M.Sc., B.Ed.",
      subject: "Biology",
      experience: "10 years"
    },
    {
      name: "Mrs. Nazia Rashid",
      position: "Teacher",
      qualification: "M.A., B.Ed.",
      subject: "Social Studies",
      experience: "8 years"
    },
    {
      name: "Mr. Imran Shah",
      position: "Teacher",
      qualification: "MCA, B.Ed.",
      subject: "Computer Science",
      experience: "7 years"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Faculty</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Dedicated educators committed to nurturing young minds
          </p>
        </div>
      </section>

      {/* Faculty Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Experienced & Qualified Teachers</h2>
            <p className="text-gray-600">
              Our faculty comprises highly qualified and experienced educators who are passionate 
              about teaching and committed to the holistic development of every student. With a 
              perfect blend of traditional values and modern teaching methodologies, our teachers 
              ensure the best learning experience.
            </p>
          </div>

          {/* Faculty Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyMembers.map((faculty, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <CardTitle className="text-center text-xl">{faculty.name}</CardTitle>
                  <p className="text-center text-blue-600 font-medium">{faculty.position}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Award className="text-blue-600 flex-shrink-0 mt-1" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Qualification</p>
                      <p className="text-sm text-gray-600">{faculty.qualification}</p>
                    </div>
                  </div>
                  <div className="border-t pt-2">
                    <p className="text-sm font-medium text-gray-900">Subject</p>
                    <p className="text-sm text-gray-600">{faculty.subject}</p>
                  </div>
                  <div className="border-t pt-2">
                    <p className="text-sm font-medium text-gray-900">Experience</p>
                    <p className="text-sm text-gray-600">{faculty.experience}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Staff */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Support Staff</h2>
            <p className="text-center text-gray-600 mb-8">
              Our dedicated support staff ensures smooth functioning of all school activities
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-center">Administrative Staff</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-600">
                  Office management and student records
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-center">Lab Assistants</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-600">
                  Science and computer lab support
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-center">Library Staff</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-600">
                  Library management and assistance
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
