import ContactForm from '@/components/forms/ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Hilltop Educational Institute.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            We&apos;re here to help. Reach out to us for any queries or visit our campus
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      Hilltop Educational Institute<br />
                      Darend, Ganderbal<br />
                      Jammu &amp; Kashmir - 191201
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+919876543210" className="hover:text-blue-600 transition">+91 98765 43210</a><br />
                      <a href="tel:+919876543211" className="hover:text-blue-600 transition">+91 98765 43211</a> (Admissions)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:info@hilltop.edu" className="hover:text-blue-600 transition">info@hilltop.edu</a><br />
                      <a href="mailto:admissions@hilltop.edu" className="hover:text-blue-600 transition">admissions@hilltop.edu</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday - Saturday: 8:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Location Map</h2>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg overflow-hidden shadow-lg border-0">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3299.6237518474204!2d74.7967687!3d34.2070885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1833cfd2c4f7d%3A0xeff016c6614b322e!2sHill%20Top%20Educational%20Institute%20Ganderbal!5e0!3m2!1sen!2sin!4v1763399008250!5m2!1sen!2sin"
                width="100%"
                height="450"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hilltop Educational Institute Location"
              />
            </div>
            <p className="text-center text-gray-600 mt-4">
              Located in the heart of Darend, easily accessible from all major areas of Ganderbal
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
