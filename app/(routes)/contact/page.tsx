import ContactForm from '@/components/forms/ContactForm'
import { MapPin, Phone, Mail, Clock, ArrowRight, Sparkles, MessageCircle, Send, Navigation, Globe } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import PageHeader from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Hilltop Educational Institute.',
}

const iconMap: { [key: string]: any } = {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
}

const contactColors = [
  { gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50", text: "text-blue-600" },
  { gradient: "from-green-500 to-emerald-500", bg: "bg-green-50", text: "text-green-600" },
  { gradient: "from-purple-500 to-violet-500", bg: "bg-purple-50", text: "text-purple-600" },
  { gradient: "from-orange-500 to-amber-500", bg: "bg-orange-50", text: "text-orange-600" },
]

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
  
  // Fetch all data from Supabase
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
    contact_info_description: "Have questions? We're here to help and answer any question you might have",
    form_heading: "Send us a Message",
    form_description: "Fill out the form and we'll get back to you within 24 hours",
    location_map_heading: "Visit Our Campus",
    map_description: "Located in the heart of Darend, easily accessible from all major areas of Ganderbal",
    map_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3299.6237518474204!2d74.7967687!3d34.2070885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1833cfd2c4f7d%3A0xeff016c6614b322e!2sHill%20Top%20Educational%20Institute%20Ganderbal!5e0!3m2!1sen!2sin!4v1763399008250!5m2!1sen!2sin"
  }

  const details: ContactDetail[] = contactDetails.length > 0 ? contactDetails : [
    { id: 1, detail_type: 'address', icon_name: 'MapPin', heading: 'Our Address', content: 'Hilltop Educational Institute\nDarend, Ganderbal\nJammu & Kashmir - 191201', display_order: 1 },
    { id: 2, detail_type: 'phone', icon_name: 'Phone', heading: 'Phone Numbers', content: '+91 9876543210\n+91 9123456789', display_order: 2 },
    { id: 3, detail_type: 'email', icon_name: 'Mail', heading: 'Email Address', content: 'info@hilltopschool.edu\nadmissions@hilltopschool.edu', display_order: 3 },
    { id: 4, detail_type: 'hours', icon_name: 'Clock', heading: 'Office Hours', content: 'Monday - Saturday\n9:00 AM - 4:00 PM', display_order: 4 }
  ]

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <PageHeader 
        title={contactPage.hero_title}
        subtitle={contactPage.hero_subtitle}
        badge="We'd Love to Hear From You"
      />

      {/* Quick Contact Banner */}
      <section className="py-6 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-white">
            <a href="tel:+919876543210" className="flex items-center gap-3 hover:scale-105 transition-transform group">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-green-100">Call Us</p>
                <p className="font-bold">+91 9876543210</p>
              </div>
            </a>
            <a href="mailto:info@hilltopschool.edu" className="flex items-center gap-3 hover:scale-105 transition-transform group">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-green-100">Email</p>
                <p className="font-bold">info@hilltopschool.edu</p>
              </div>
            </a>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-green-100">Office Hours</p>
                <p className="font-bold">Mon-Sat: 9AM - 4PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Info */}
              <div>
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-5 py-2 mb-6">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-700 font-semibold text-sm">Contact Information</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{contactPage.contact_info_heading}</h2>
                  <p className="text-gray-600 text-lg">{contactPage.contact_info_description}</p>
                  <div className="mt-6 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                </div>
                
                <div className="space-y-5">
                  {details.map((detail, index) => {
                    const IconComponent = iconMap[detail.icon_name as keyof typeof iconMap] || MapPin
                    const lines: string[] = detail.content.split('\n')
                    const isPhone = detail.detail_type === 'phone'
                    const isEmail = detail.detail_type === 'email'
                    const colors = contactColors[index % contactColors.length]
                    
                    return (
                      <div 
                        key={detail.id} 
                        className="group flex items-start gap-5 p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100"
                      >
                        <div className="relative flex-shrink-0">
                          <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-xl blur-sm opacity-50 group-hover:opacity-70 transition-opacity`}></div>
                          <div className={`relative w-14 h-14 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                            <IconComponent className="text-white" size={24} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors">{detail.heading}</h3>
                          <div className="text-gray-600 space-y-1">
                            {lines.map((line: string, idx: number) => (
                              <div key={idx}>
                                {isPhone ? (
                                  <a href={`tel:${line.replace(/\s/g, '').split('(')[0]}`} className="hover:text-green-600 transition inline-flex items-center gap-2 group/link">
                                    {line}
                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                                  </a>
                                ) : isEmail ? (
                                  <a href={`mailto:${line}`} className="hover:text-green-600 transition inline-flex items-center gap-2 group/link">
                                    {line}
                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                                  </a>
                                ) : (
                                  <span>{line}</span>
                                )}
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
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-bl-[100px]"></div>
                  <Send className="absolute top-8 right-8 w-8 h-8 text-green-200" />
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{contactPage.form_heading}</h3>
                    <p className="text-gray-600 mb-8">{contactPage.form_description}</p>
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section - Dark */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
                <Navigation className="w-4 h-4 text-green-400" />
                <span className="text-white font-semibold text-sm">Find Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{contactPage.location_map_heading}</h2>
              {contactPage.map_description && (
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">{contactPage.map_description}</p>
              )}
            </div>
            
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-3xl blur-lg opacity-30"></div>
              <div className="absolute -inset-1 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-2xl"></div>
              
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-800 p-1">
                <iframe 
                  src={contactPage.map_embed_url}
                  width="100%"
                  height="450"
                  className="border-0 rounded-lg"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hilltop Educational Institute Location"
                />
              </div>
              
              {/* Location Tag */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-2xl rounded-full px-8 py-4 flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-gray-900">Darend, Ganderbal - J&K</span>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl group">
                <Navigation className="mr-2" size={18} />
                Get Directions
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Join Our Family?</h2>
          <p className="text-green-100 mb-6 max-w-xl mx-auto">Take the first step towards quality education for your child</p>
          <a 
            href="/admissions" 
            className="inline-flex items-center gap-2 bg-white text-green-600 font-bold px-8 py-3 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            Apply for Admission
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  )
}
