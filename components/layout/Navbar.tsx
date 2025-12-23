'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail, MapPin, Sparkles, ChevronDown, ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

interface NavbarInfo {
  school_name: string
  tagline: string
  logo_text: string
  phone: string
  email: string
  address_short: string
}

interface MenuItem {
  id: number
  label: string
  href: string
  display_order: number
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const [navbarInfo, setNavbarInfo] = useState<NavbarInfo>({
    school_name: "Hilltop Educational Institute",
    tagline: "Empowering Minds, Building Futures",
    logo_text: "HEI",
    phone: "+91 98765 43210",
    email: "info@hilltop.edu",
    address_short: "Darend, Ganderbal - 191201"
  })
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 1, label: 'Home', href: '/', display_order: 1 },
    { id: 2, label: 'About', href: '/about', display_order: 2 },
    { id: 3, label: 'Academics', href: '/academics', display_order: 3 },
    { id: 4, label: 'Admissions', href: '/admissions', display_order: 4 },
    { id: 5, label: 'Faculty', href: '/faculty', display_order: 5 },
    { id: 6, label: 'Students', href: '/students', display_order: 6 },
    { id: 7, label: 'Activities', href: '/activities', display_order: 7 },
    { id: 8, label: 'Infrastructure', href: '/infrastructure', display_order: 8 },
    { id: 9, label: 'Gallery', href: '/gallery', display_order: 9 },
    { id: 10, label: 'Contact', href: '/contact', display_order: 10 },
  ])

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const supabase = createClient()

        // Fetch navbar info
        const { data: navData } = await supabase
          .from('navbar_info')
          .select('*')
          .eq('is_active', true)
          .single()

        if (navData) {
          setNavbarInfo(navData)
        }

        // Fetch menu items
        const { data: menuData } = await supabase
          .from('menu_items')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })

        if (menuData && menuData.length > 0) {
          setMenuItems(menuData)
        }
      } catch (error) {
        console.error('Error fetching navbar data:', error)
      }
    }

    fetchNavbarData()
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Top Bar - Premium Design with Gradient */}
      <div className="bg-gradient-to-r from-gray-900 via-green-900 to-gray-900 text-white py-3 hidden md:block relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23fff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"></div>
        
        <div className="container mx-auto px-4 flex justify-between items-center text-sm relative z-10">
          <div className="flex gap-8">
            <a 
              href={`tel:${navbarInfo.phone.replace(/\s/g, '')}`} 
              className="flex items-center gap-2 hover:text-green-300 transition-colors group"
            >
              <div className="p-1.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg group-hover:scale-110 transition-transform shadow-lg shadow-green-500/25">
                <Phone size={12} className="flex-shrink-0" />
              </div>
              <span className="font-medium">{navbarInfo.phone}</span>
            </a>
            <a 
              href={`mailto:${navbarInfo.email}`} 
              className="flex items-center gap-2 hover:text-green-300 transition-colors group"
            >
              <div className="p-1.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg group-hover:scale-110 transition-transform shadow-lg shadow-green-500/25">
                <Mail size={12} className="flex-shrink-0" />
              </div>
              <span className="font-medium">{navbarInfo.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 bg-white/10 rounded-lg">
                <Clock size={12} className="flex-shrink-0" />
              </div>
              <span className="text-gray-300">Mon-Sat: 9AM - 4PM</span>
            </div>
            <div className="h-4 w-px bg-white/20"></div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 bg-white/10 rounded-lg">
                <MapPin size={12} className="flex-shrink-0" />
              </div>
              <span className="text-gray-300">{navbarInfo.address_short}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar - With Premium Scroll Effects */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-xl shadow-black/5 border-b border-gray-100' 
          : 'bg-white shadow-lg border-b-4 border-green-500'
      }`}>
        <div className="container mx-auto px-4">
          <div className={`flex justify-between items-center transition-all duration-500 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}>
            {/* Logo - Enhanced with Glow */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl blur transition-all duration-300 ${
                  isScrolled ? 'opacity-0' : 'opacity-50 group-hover:opacity-70'
                }`}></div>
                <div className={`relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-xl shadow-green-500/30 group-hover:shadow-green-500/50 group-hover:scale-105 transition-all duration-300 ${
                  isScrolled ? 'w-10 h-10 text-base' : 'w-12 h-12 text-lg'
                }`}>
                  {navbarInfo.logo_text}
                </div>
              </div>
              <div>
                <h1 className={`font-bold text-gray-900 group-hover:text-green-600 transition-all duration-300 ${
                  isScrolled ? 'text-sm' : 'text-base md:text-lg'
                }`}>
                  {navbarInfo.school_name}
                </h1>
                <p className={`text-green-600 font-medium transition-all duration-300 ${
                  isScrolled ? 'text-[9px] opacity-0 h-0' : 'text-[10px] md:text-xs opacity-100'
                }`}>
                  {navbarInfo.tagline}
                </p>
              </div>
            </Link>

            {/* Desktop Menu - Enhanced with Hover Effects */}
            <div className="hidden lg:flex items-center gap-0.5">
              {menuItems.map((item, index) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`
                      relative px-3 xl:px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 group
                      ${active 
                        ? 'text-white' 
                        : 'text-gray-700 hover:text-green-600'
                      }
                    `}
                  >
                    {/* Active Background */}
                    {active && (
                      <>
                        <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg"></span>
                        <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg blur-sm opacity-50"></span>
                      </>
                    )}
                    
                    {/* Hover Background */}
                    {!active && (
                      <span className="absolute inset-0 bg-green-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    )}
                    
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Underline Effect */}
                    {!active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full group-hover:w-3/4 transition-all duration-300"></span>
                    )}
                  </Link>
                )
              })}
              
              <Button 
                asChild 
                className="ml-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transition-all duration-300 group"
              >
                <Link href="/admissions" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button - Enhanced */}
            <button
              className="lg:hidden relative p-2 rounded-xl hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all active:scale-95 group"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute left-0 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'top-3 rotate-45' : 'top-1'}`}></span>
                <span className={`absolute left-0 top-3 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100'}`}></span>
                <span className={`absolute left-0 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'top-3 -rotate-45' : 'top-5'}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu - Enhanced with Animations */}
          <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
            isOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="pb-6 pt-4 border-t border-gray-100">
              {/* Quick Contact Mobile */}
              <div className="flex justify-center gap-4 mb-4 px-4">
                <a href={`tel:${navbarInfo.phone.replace(/\s/g, '')}`} className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-50 rounded-xl text-green-700 text-sm font-medium">
                  <Phone size={14} />
                  Call
                </a>
                <a href={`mailto:${navbarInfo.email}`} className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-50 rounded-xl text-green-700 text-sm font-medium">
                  <Mail size={14} />
                  Email
                </a>
              </div>
              
              <div className="py-2 space-y-1 px-2">
                {menuItems.map((item, index) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`
                        block py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-300
                        ${active 
                          ? 'text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25' 
                          : 'text-gray-700 hover:bg-green-50 hover:text-green-600 hover:pl-6'
                        }
                      `}
                      onClick={() => setIsOpen(false)}
                      style={{ 
                        animationDelay: `${index * 50}ms`,
                        animation: isOpen ? 'slideInLeft 0.3s ease forwards' : ''
                      }}
                    >
                      <span className="flex items-center justify-between">
                        {item.label}
                        {active && <span className="w-2 h-2 bg-white rounded-full"></span>}
                      </span>
                    </Link>
                  )
                })}
              </div>
              <div className="px-4 pt-4 border-t border-gray-100 mt-2">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/25 h-12"
                >
                  <Link href="/admissions" className="flex items-center justify-center gap-2" onClick={() => setIsOpen(false)}>
                    <Sparkles className="w-4 h-4" />
                    Apply for Admission
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}
