import Link from 'next/link'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ExternalLink, ArrowRight, Sparkles, Send, ChevronRight, Heart } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import NewsletterForm from '@/components/forms/NewsletterForm'

interface FooterData {
  school_name: string
  tagline: string
  address: string
  phone: string
  email: string
  facebook_url?: string
  instagram_url?: string
  youtube_url?: string
  twitter_url?: string
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
    facebook_url: "https://facebook.com",
    instagram_url: "https://instagram.com",
    youtube_url: "https://youtube.com"
  }

  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Academics', href: '/academics' },
    { label: 'Admissions', href: '/admissions' },
    { label: 'Faculty', href: '/faculty' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact Us', href: '/contact' },
  ]

  const resources = [
    { label: 'Student Corner', href: '/students' },
    { label: 'News & Updates', href: '/news' },
    { label: 'Infrastructure', href: '/infrastructure' },
    { label: 'Activities', href: '/activities' },
    { label: 'Downloads', href: '/students' },
    { label: 'E-Library', href: '/students' },
  ]

  return (
    <footer className="relative overflow-hidden">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-12 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Stay Connected</h3>
              <p className="text-green-100">Subscribe to get updates on admissions, events, and more</p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 md:w-72 px-5 py-3 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:border-white/50 transition-colors"
                />
                <Button className="bg-white text-green-600 hover:bg-gray-100 shadow-xl px-6 font-bold group">
                  <Send size={18} className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            
            {/* About Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl blur-sm opacity-50"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-xl">
                    HEI
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{footer.school_name}</h3>
                  <p className="text-green-400 text-xs font-medium">Est. 1995</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                {footer.tagline}
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {footer.facebook_url && (
                  <a 
                    href={footer.facebook_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-white/5 backdrop-blur-sm hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:-rotate-6 group border border-white/10"
                    aria-label="Facebook"
                  >
                    <Facebook size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                )}
                {footer.instagram_url && (
                  <a 
                    href={footer.instagram_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-white/5 backdrop-blur-sm hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:rotate-6 group border border-white/10"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                )}
                {footer.youtube_url && (
                  <a 
                    href={footer.youtube_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-white/5 backdrop-blur-sm hover:bg-gradient-to-br hover:from-red-500 hover:to-red-600 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:-rotate-6 group border border-white/10"
                    aria-label="YouTube"
                  >
                    <Youtube size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></span>
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-all hover:translate-x-2 inline-flex items-center gap-2 group"
                    >
                      <ChevronRight size={14} className="text-green-500 group-hover:translate-x-1 transition-transform" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></span>
                Resources
              </h3>
              <ul className="space-y-3 text-sm">
                {resources.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-all hover:translate-x-2 inline-flex items-center gap-2 group"
                    >
                      <ChevronRight size={14} className="text-green-500 group-hover:translate-x-1 transition-transform" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></span>
                Contact Us
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-green-500 group-hover:to-emerald-600 transition-all border border-green-500/30">
                    <MapPin size={16} className="text-green-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-gray-400 leading-relaxed group-hover:text-white transition-colors">{footer.address}</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-green-500 group-hover:to-emerald-600 transition-all border border-green-500/30">
                    <Phone size={16} className="text-green-400 group-hover:text-white transition-colors" />
                  </div>
                  <a 
                    href={`tel:${footer.phone.replace(/\s/g, '')}`} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {footer.phone}
                  </a>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-green-500 group-hover:to-emerald-600 transition-all border border-green-500/30">
                    <Mail size={16} className="text-green-400 group-hover:text-white transition-colors" />
                  </div>
                  <a 
                    href={`mailto:${footer.email}`} 
                    className="text-gray-400 hover:text-white transition-colors break-all"
                  >
                    {footer.email}
                  </a>
                </li>
              </ul>
              
              {/* Apply Button */}
              <div className="mt-6">
                <Button asChild className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/25 group">
                  <Link href="/admissions" className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Apply Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm relative z-10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-gray-500 flex items-center gap-1">
                © {currentYear} <span className="text-white font-semibold">{footer.school_name}</span>. All rights reserved.
              </p>
              <p className="text-gray-500 flex items-center gap-2">
                Made with <Heart size={14} className="text-red-500 fill-red-500" /> by{' '}
                <a 
                  href="https://hitechglobals.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-400 font-semibold hover:text-green-300 transition-colors inline-flex items-center gap-1 group"
                >
                  Hitech Globals
                  <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
