
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Gallery',
  description: 'Photos and videos from school events and activities.',
}

export default function GalleryPage() {
  const categories = [
    "Annual Day",
    "Sports Day",
    "Science Exhibition",
    "Cultural Events",
    "Independence Day",
    "Republic Day",
    "Classrooms",
    "Infrastructure"
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Moments captured from our vibrant school life
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Photo Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="px-4 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:text-blue-600 transition font-medium"
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-400">Image {item}</p>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">Event Title {item}</h3>
                      <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Video Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-400">Video {item}</p>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">School Promotional Video</h3>
                      <p className="text-sm text-gray-600">Duration: 5:30</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Virtual Campus Tour</h2>
            <p className="text-gray-600 mb-8">
              Take a 360° virtual tour of our campus and explore our facilities
            </p>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">360° Virtual Tour (Coming Soon)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
