
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 md:py-32">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
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
