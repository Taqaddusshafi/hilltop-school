'use client'

import { MapPin, Phone, Mail, Clock, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ContactData {
  section_heading: string
  section_description: string
  address: string
  phone: string
  email: string
  office_hours: string
}

const contactItems = [
  { icon: MapPin, key: 'address', label: 'Address' },
  { icon: Phone, key: 'phone', label: 'Phone' },
  { icon: Mail, key: 'email', label: 'Email' },
  { icon: Clock, key: 'office_hours', label: 'Office Hours' },
]

export default function ContactInfo() {
  const [contact, setContact] = useState<ContactData>({
    section_heading: "Get in Touch",
    section_description: "Have questions? We're here to help. Contact us for admissions, inquiries, or visit our campus.",
    address: "Darend, Ganderbal, Jammu & Kashmir - 191201",
    phone: "+91 98765 43210",
    email: "info@hilltop.edu",
    office_hours: "Monday - Saturday: 8:00 AM - 4:00 PM"
  })
  
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Fetch data from Supabase
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('contact_info')
          .select('*')
          .eq('is_active', true)
          .single()
        
        if (data) {
          setContact(data)
        }
      } catch (error) {
        console.error('Error fetching contact:', error)
      }
    }
    
    fetchContact()
  }, [])

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const getValue = (key: string): string => {
    switch (key) {
      case 'address': return contact.address
      case 'phone': return contact.phone
      case 'email': return contact.email
      case 'office_hours': return contact.office_hours
      default: return ''
    }
  }

  const getLink = (key: string, value: string): string | null => {
    if (key === 'phone') return `tel:${value.replace(/\s/g, '')}`
    if (key === 'email') return `mailto:${value}`
    return null
  }

  return (
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100"></div>
      <div className="absolute inset-0 pattern-dots opacity-30"></div>
      
      {/* Floating Decorations */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-green-200/50 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-200/50 rounded-full blur-3xl animate-float-reverse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contact Details */}
          <div className={isVisible ? 'animate-fade-in-left' : 'opacity-0'}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white shadow-lg shadow-green-100 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-green-700 text-sm font-semibold">We'd Love to Hear From You</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              {contact.section_heading.split(' ').map((word, i) => (
                <span key={i} className={word.toLowerCase() === 'touch' ? 'gradient-text' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h2>
            <p className="text-gray-600 text-lg mb-10 max-w-lg">
              {contact.section_description}
            </p>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactItems.map((item, index) => {
                const IconComponent = item.icon
                const value = getValue(item.key)
                const link = getLink(item.key, value)
                
                return (
                  <div 
                    key={item.key}
                    className={`group flex items-start gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg shadow-green-100/50 hover:shadow-xl hover:shadow-green-200/50 transition-all duration-300 hover:-translate-y-1 border border-green-100 ${
                      isVisible ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 100 + 200}ms` }}
                  >
                    {/* Icon */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl blur-sm opacity-50 group-hover:opacity-70 transition-opacity"></div>
                      <div className="relative w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="text-white" size={24} />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                        {item.label}
                      </h3>
                      {link ? (
                        <a 
                          href={link} 
                          className="text-gray-600 hover:text-green-600 transition-colors inline-flex items-center gap-1 group/link"
                        >
                          {value}
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                        </a>
                      ) : (
                        <p className="text-gray-600">{value}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA Button */}
            <div className={`mt-10 ${isVisible ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
              <Button 
                size="lg" 
                asChild 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-xl shadow-green-500/25 btn-shine btn-glow text-base px-8"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Contact Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Google Maps */}
          <div className={`relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            {/* Decorative Frame */}
            <div className="absolute -inset-4 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-3xl blur-sm opacity-50"></div>
            <div className="absolute -inset-2 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-2xl"></div>
            
            {/* Map Container */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl h-[450px] lg:h-[520px] bg-white p-1">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3299.6237518474204!2d74.7967687!3d34.2070885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1833cfd2c4f7d%3A0xeff016c6614b322e!2sHill%20Top%20Educational%20Institute%20Ganderbal!5e0!3m2!1sen!2sin!4v1763399008250!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hilltop Educational Institute Location"
                className="rounded-lg"
              />
            </div>
            
            {/* Location Tag */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-full px-6 py-3 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-gray-900 text-sm">Darend, Ganderbal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
