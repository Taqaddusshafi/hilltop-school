import Link from 'next/link'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'

interface FooterData {
  school_name: string
  tagline: string
  address: string
  phone: string
  email: string
  facebook_url?: string
  instagram_url?: string
  youtube_url?: string
}

export default async function Footer() {
  const supabase = await createServerSupabaseClient()
  
  let footerData: FooterData | null = null

  if (supabase) {
    const { data } = await supabase
      .from('footer_info')
      .select('*')
      .eq('is_active', true)
      .single()
    
    footerData = data
  }

  // Fallback data
  const footer: FooterData = footerData || {
    school_name: "Hilltop Educational Institute",
    tagline: "Empowering Minds, Building Futures - Providing quality education with modern facilities and experienced faculty since 1995.",
    address: "Darend, Ganderbal, Jammu & Kashmir - 191201",
    phone: "+91 98765 43210",
    email: "info@hilltop.edu",
    facebook_url: "",
    instagram_url: "",
    youtube_url: ""
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* About Section - Dynamic */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-green-700 font-bold text-xl shadow-2xl">
                HEI
              </div>
              <h3 className="text-white font-bold text-xl">{footer.school_name}</h3>
            </div>
            <p className="text-sm text-green-100 mb-6 leading-relaxed">
              {footer.tagline}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {footer.facebook_url && (
                <a 
                  href={footer.facebook_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white rounded-lg flex items-center justify-center transition-all hover:scale-110 group border border-white/20"
                  aria-label="Facebook"
                >
                  <Facebook size={20} className="text-white group-hover:text-green-700 transition-colors" />
                </a>
              )}
              {footer.instagram_url && (
                <a 
                  href={footer.instagram_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white rounded-lg flex items-center justify-center transition-all hover:scale-110 group border border-white/20"
                  aria-label="Instagram"
                >
                  <Instagram size={20} className="text-white group-hover:text-green-700 transition-colors" />
                </a>
              )}
              {footer.youtube_url && (
                <a 
                  href={footer.youtube_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white rounded-lg flex items-center justify-center transition-all hover:scale-110 group border border-white/20"
                  aria-label="YouTube"
                >
                  <Youtube size={20} className="text-white group-hover:text-green-700 transition-colors" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 pb-2 border-b-2 border-green-400 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-green-100 hover:text-white transition-all hover:translate-x-1 inline-flex items-center gap-1">
                  <span className="text-green-400">→</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-green-100 hover:text-white transition-all hover:translate-x-1 inline-flex items-center gap-1">
                  <span className="text-green-400">→</span> Academics
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-green-100 hover:text-white transition-all hover:translate-x-1 inline-flex items-center gap-1">
                  <span className="text-green-400">→</span> Admissions
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="text-green-100 hover:text-white transition-all hover:translate-x-1 inline-flex items-center gap-1">
                  <span className="text-green-400">→</span> Faculty
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-green-100 hover:text-white transition-all hover:translate-x-1 inline-flex items-center gap-1">
                  <span className="text-green-400">→</span> Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-green-100 hover:text-white transition-all hover:translate-x-1 inline-flex items-center gap-1">
                  <span className="text-green-400">→</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 pb-2 border-b-2 border-green-400 inline-block">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/students" className="text-green-100 hover:text-white transition-all hover:translate-x-1 inline-flex items-center gap-1">
                  <span className="text-green-400">→</span> Student Corner
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-green-100 hover:text-white transition-all hover:translate-x-1 inline-flex items-center gap-1">
                  <span className="text-green-400">→</span> News & Updates
                </Link>
              </li>
              <li>
                <Link href="/infrastructure" className="text-green-100 hover:text-white transition-all hover:translate-x-1 inline-flex items-center gap-1">
                  <span className="text-green-400">→</span> Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-green-100 hover:text-white transition-all hover:translate-x-1 inline-flex items-center gap-1">
                  <span className="text-green-400">→</span> Activities
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Dynamic */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 pb-2 border-b-2 border-green-400 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:scale-110 transition-all border border-white/30">
                  <MapPin size={16} className="text-white group-hover:text-green-700 transition-colors" />
                </div>
                <span className="text-green-100 leading-relaxed">{footer.address}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:scale-110 transition-all border border-white/30">
                  <Phone size={16} className="text-white group-hover:text-green-700 transition-colors" />
                </div>
                <a 
                  href={`tel:${footer.phone.replace(/\s/g, '')}`} 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  {footer.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:scale-110 transition-all border border-white/30">
                  <Mail size={16} className="text-white group-hover:text-green-700 transition-colors" />
                </div>
                <a 
                  href={`mailto:${footer.email}`} 
                  className="text-green-100 hover:text-white transition-colors break-all"
                >
                  {footer.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-700/50 bg-green-950/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-green-100">
              &copy; {currentYear} <span className="text-white font-semibold">{footer.school_name}</span>. All rights reserved.
            </p>
            <p className="text-green-200 flex items-center gap-2">
              Designed & Developed by{' '}
              <a 
                href="https://hitechglobals.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white font-semibold hover:text-green-300 transition-colors inline-flex items-center gap-1 group"
              >
                Hitech Globals
                <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
