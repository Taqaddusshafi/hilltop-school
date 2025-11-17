import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden">
      {/* Gradient Background (fallback) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-800"></div>
      
      {/* Pattern Overlay for texture */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white animate-fade-in">
            Welcome to Hilltop Educational Institute
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Empowering Minds, Building Futures Since 1995
          </p>
          <p className="text-lg mb-8 text-blue-50">
            Located in the heart of Darend, Ganderbal, we provide quality education with modern facilities, experienced faculty, and a nurturing environment for holistic development.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-gray-100">
              <Link href="/admissions">
                Apply for Admission
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-900">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
