
import Link from 'next/link'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Hilltop Educational Institute</h3>
            <p className="text-sm mb-4">
              Providing quality education with modern facilities and experienced faculty since 1995.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
              <li><Link href="/academics" className="hover:text-blue-400">Academics</Link></li>
              <li><Link href="/admissions" className="hover:text-blue-400">Admissions</Link></li>
              <li><Link href="/faculty" className="hover:text-blue-400">Faculty</Link></li>
              <li><Link href="/gallery" className="hover:text-blue-400">Gallery</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/students" className="hover:text-blue-400">Student Corner</Link></li>
              <li><Link href="/news" className="hover:text-blue-400">News & Updates</Link></li>
              <li><Link href="/infrastructure" className="hover:text-blue-400">Infrastructure</Link></li>
              <li><Link href="/activities" className="hover:text-blue-400">Activities</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Darend, Ganderbal<br />Jammu & Kashmir - 191201</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <a href="tel:+919876543210" className="hover:text-blue-400">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <a href="mailto:info@hilltop.edu" className="hover:text-blue-400">info@hilltop.edu</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Hilltop Educational Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
