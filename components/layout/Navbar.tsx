'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'
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
      {/* Top Bar - Enhanced Green Theme */}
      <div className="bg-gradient-to-r from-green-800 to-green-900 text-white py-2.5 hidden md:block border-b border-green-700">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex gap-6">
            <a 
              href={`tel:${navbarInfo.phone.replace(/\s/g, '')}`} 
              className="flex items-center gap-2 hover:text-green-200 transition-colors"
            >
              <Phone size={15} className="flex-shrink-0" />
              <span className="font-medium">{navbarInfo.phone}</span>
            </a>
            <a 
              href={`mailto:${navbarInfo.email}`} 
              className="flex items-center gap-2 hover:text-green-200 transition-colors"
            >
              <Mail size={15} className="flex-shrink-0" />
              <span className="font-medium">{navbarInfo.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={15} className="flex-shrink-0" />
            <span className="font-medium">{navbarInfo.address_short}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar - Enhanced Design */}
      <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-green-600">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Enhanced */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-shadow">
                {navbarInfo.logo_text}
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition-colors">
                  {navbarInfo.school_name}
                </h1>
                <p className="text-xs text-green-600 font-medium">{navbarInfo.tagline}</p>
              </div>
            </Link>

            {/* Desktop Menu - Enhanced with Active States */}
            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`
                      px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200
                      ${active 
                        ? 'text-white bg-green-600 shadow-md' 
                        : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <Button 
                asChild 
                className="ml-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-md hover:shadow-lg transition-all"
              >
                <Link href="/admissions">Apply Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button - Enhanced */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu - Enhanced */}
          {isOpen && (
            <div className="lg:hidden pb-4 border-t border-gray-200">
              <div className="py-2">
                {menuItems.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`
                        block py-3 px-4 text-sm font-semibold rounded-lg transition-all my-1
                        ${active 
                          ? 'text-white bg-green-600' 
                          : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                        }
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
              <div className="px-4 pt-4 border-t border-gray-200">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-md"
                >
                  <Link href="/admissions">Apply Now</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
