import ContactForm from '@/components/forms/ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Hilltop Educational Institute.',
}

const iconMap = {
  MapPin,
  Phone,
  Mail,
  Clock,
}

interface ContactDetail {
  id: number
  detail_type: string
  icon_name: string
  heading: string
  content: string
  display_order: number
}

export default async function ContactPage() {
  const supabase = await createServerSupabaseClient()
  
  // Fetch all data
  let pageData = null
  let contactDetails: ContactDetail[] = []

  if (supabase) {
    const [page, details] = await Promise.all([
      supabase.from('contact_page').select('*').eq('is_active', true).single(),
      supabase.from('contact_details').select('*').eq('is_active', true).order('display_order')
    ])

    pageData = page.data
    contactDetails = details.data || []
  }

  // Fallback data
  const contactPage = pageData || {
    hero_title: "Contact Us",
    hero_subtitle: "We're here to help. Reach out to us for any queries or visit our campus",
    contact_info_heading: "Get in Touch",
    location_map_heading: "Location Map",
    map_description: "Located in the heart of Darend, easily accessible from all major areas of Ganderbal",
    map_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3299.6237518474204!2d74.7967687!3d34.2070885"
  }

  const details: ContactDetail[] = contactDetails.length > 0 ? contactDetails : [
    {
      id: 1,
      detail_type: 'address',
      icon_name: 'MapPin',
      heading: 'Address',
      content: 'Hilltop Educational Institute\nDarend, Ganderbal\nJammu & Kashmir - 191201',
      display_order: 1
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Dynamic */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{contactPage.hero_title}</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            {contactPage.hero_subtitle}
          </p>
        </div>
      </section>

      {/* Contact Information & Form - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info - Dynamic */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{contactPage.contact_info_heading}</h2>
              
              <div className="space-y-6">
                {details.map((detail) => {
                  const IconComponent = iconMap[detail.icon_name as keyof typeof iconMap] || MapPin
                  const lines: string[] = detail.content.split('\n')
                  const isPhone = detail.detail_type === 'phone'
                  const isEmail = detail.detail_type === 'email'
                  
                  return (
                    <div key={detail.id} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{detail.heading}</h3>
                        <div className="text-gray-600">
                          {lines.map((line: string, idx: number) => (
                            <div key={idx}>
                              {isPhone ? (
                                <a href={`tel:${line.replace(/\s/g, '').split('(')[0]}`} className="hover:text-green-600 transition">
                                  {line}
                                </a>
                              ) : isEmail ? (
                                <a href={`mailto:${line}`} className="hover:text-green-600 transition">
                                  {line}
                                </a>
                              ) : (
                                line
                              )}
                              {idx < lines.length - 1 && <br />}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section - Dynamic */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{contactPage.location_map_heading}</h2>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg overflow-hidden shadow-lg border-0">
              <iframe 
                src={contactPage.map_embed_url}
                width="100%"
                height="450"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hilltop Educational Institute Location"
              />
            </div>
            {contactPage.map_description && (
              <p className="text-center text-gray-600 mt-4">
                {contactPage.map_description}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
