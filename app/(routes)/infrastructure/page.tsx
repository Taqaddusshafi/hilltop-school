
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, FlaskConical, BookOpen, Laptop, Bus, Activity } from 'lucide-react'

export const metadata = {
  title: 'Infrastructure',
  description: 'Explore our modern facilities and infrastructure.',
}

export default function InfrastructurePage() {
  const facilities = [
    {
      icon: Building,
      title: "Spacious Classrooms",
      description: "Well-ventilated and furnished classrooms with modern teaching aids and comfortable seating arrangements for effective learning."
    },
    {
      icon: FlaskConical,
      title: "Science Laboratories",
      description: "Fully equipped Physics, Chemistry, and Biology labs with latest instruments and safety equipment for practical learning."
    },
    {
      icon: Laptop,
      title: "Computer Lab",
      description: "Modern computer lab with 50+ systems, high-speed internet, and latest software for digital literacy."
    },
    {
      icon: BookOpen,
      title: "Library",
      description: "Well-stocked library with 10,000+ books, journals, magazines, and digital resources for comprehensive learning."
    },
    {
      icon: Activity,
      title: "Sports Complex",
      description: "Large playground, indoor sports facility, basketball court, and dedicated spaces for various sports activities."
    },
    {
      icon: Bus,
      title: "Transport Facility",
      description: "Safe and reliable bus service covering major areas of Ganderbal with GPS tracking and trained drivers."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Infrastructure & Facilities</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Modern amenities for a complete learning experience
          </p>
        </div>
      </section>

      {/* Main Facilities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Facilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <facility.icon className="text-blue-600" size={28} />
                    </div>
                    <CardTitle>{facility.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{facility.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Facilities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Laboratories */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Laboratories</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Physics Lab</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Modern equipment</li>
                      <li>• Safety measures</li>
                      <li>• 30+ experiments</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Chemistry Lab</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Quality chemicals</li>
                      <li>• Safety equipment</li>
                      <li>• Practical sessions</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Biology Lab</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Microscopes</li>
                      <li>• Specimens</li>
                      <li>• Models & charts</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Smart Classrooms */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Smart Classrooms</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">
                    Our smart classrooms are equipped with digital boards, projectors, and multimedia 
                    content to make learning more interactive and engaging. Each classroom is designed 
                    to accommodate 40 students comfortably with proper lighting and ventilation.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">50+</p>
                      <p className="text-sm text-gray-600">Classrooms</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">30</p>
                      <p className="text-sm text-gray-600">Smart Boards</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">100%</p>
                      <p className="text-sm text-gray-600">AC Classrooms</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">40</p>
                      <p className="text-sm text-gray-600">Students/Class</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Library */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Library</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">
                    Our library is the heart of academic excellence, housing a vast collection of books, 
                    reference materials, magazines, and digital resources. Students have access to a 
                    peaceful reading environment with dedicated study areas.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">10,000+</p>
                      <p className="text-sm text-gray-600">Books</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">50+</p>
                      <p className="text-sm text-gray-600">Magazines</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">100+</p>
                      <p className="text-sm text-gray-600">Seating Capacity</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">Yes</p>
                      <p className="text-sm text-gray-600">E-Library</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Security */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Safety & Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>CCTV Surveillance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    24/7 CCTV monitoring across campus for student safety and security.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Medical Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    First aid room with trained staff and tie-up with nearby hospital.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Fire Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Fire extinguishers, emergency exits, and regular safety drills.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Secure Transport</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    GPS-enabled buses with trained drivers and female attendants.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
