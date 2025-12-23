'use client'

import { useState } from 'react'
import * as LucideIcons from 'lucide-react'
import NewsManager from './NewsManager'
import FacultyManager from './FacultyManager'
import GalleryManager from './GalleryManager'
import ContactsManager from './ContactsManager'
import AdmissionsManager from './AdmissionsManager'
import CircularsManager from './CircularsManager'
import HeroManager from './HeroManager'
import NavbarManager from './NavbarManager'
import FooterManager from './FooterManager'
import AboutPageManager from './AboutPageManager'
import AcademicsPageManager from './AcademicsPageManager'
import StatsManager from './StatsManager'
import HighlightsManager from './HighlightsManager'
import NoticesManager from './NoticesManager'
import ContactInfoManager from './ContactInfoManager'
import StudentsPageManager from './StudentsPageManager'
import ProgramsManager from './ProgramsManager'
import TestimonialsManager from './TestimonialsManager'
import CTABannerManager from './CTABannerManager'
import ActivitiesManager from './ActivitiesManager'
import PrincipalManager from './PrincipalManager'

interface AdminTabsProps {
  news: any[]
  faculty: any[]
  gallery: any[]
  contacts: any[]
  admissions: any[]
  circulars: any[]
  hero: any
  heroImages: any[]
  navbar: any
  footer: any
  aboutPage: any
  principalMessage: any
  academicsPage: any
  stats: any[]
  highlights: any[]
  notices: any[]
  contactInfo: any
  studentsPage: any
  studentDownloads: any[]
  elibraryResources: any[]
  studentAchievements: any[]
  alumniStats: any[]
  programs: any[]
  testimonials: any[]
  ctaBanner: any
  clubs: any[]
  annualEvents: any[]
}

const tabCategories = [
  {
    label: 'Content',
    icon: 'FileText',
    color: 'from-blue-500 to-blue-600',
    tabs: [
      { id: 'news', label: 'News', icon: 'FileText' },
      { id: 'notices', label: 'Notices', icon: 'Bell' },
      { id: 'circulars', label: 'Circulars', icon: 'File' },
    ]
  },
  {
    label: 'Homepage',
    icon: 'Sparkles',
    color: 'from-green-500 to-emerald-600',
    tabs: [
      { id: 'hero', label: 'Hero Section', icon: 'Sparkles' },
      { id: 'stats', label: 'Statistics', icon: 'BarChart3' },
      { id: 'highlights', label: 'Highlights', icon: 'Star' },
      { id: 'programs', label: 'Programs', icon: 'GraduationCap' },
      { id: 'principal', label: 'Principal', icon: 'User' },
      { id: 'testimonials', label: 'Testimonials', icon: 'Quote' },
      { id: 'cta-banner', label: 'CTA Banner', icon: 'Megaphone' },
    ]
  },
  {
    label: 'Pages',
    icon: 'BookOpen',
    color: 'from-purple-500 to-purple-600',
    tabs: [
      { id: 'about', label: 'About', icon: 'Info' },
      { id: 'academics', label: 'Academics', icon: 'BookOpen' },
      { id: 'students', label: 'Students', icon: 'Users' },
      { id: 'activities', label: 'Activities', icon: 'Trophy' },
    ]
  },
  {
    label: 'People',
    icon: 'Users',
    color: 'from-orange-500 to-orange-600',
    tabs: [
      { id: 'faculty', label: 'Faculty', icon: 'Users' },
      { id: 'admissions', label: 'Admissions', icon: 'GraduationCap' },
      { id: 'contacts', label: 'Messages', icon: 'MessageSquare' },
    ]
  },
  {
    label: 'Media',
    icon: 'Image',
    color: 'from-pink-500 to-pink-600',
    tabs: [
      { id: 'gallery', label: 'Gallery', icon: 'Image' },
    ]
  },
  {
    label: 'Settings',
    icon: 'Settings',
    color: 'from-gray-500 to-gray-600',
    tabs: [
      { id: 'navbar', label: 'Navbar', icon: 'Menu' },
      { id: 'footer', label: 'Footer', icon: 'LayoutTemplate' },
      { id: 'contact-info', label: 'Contact Info', icon: 'Phone' },
    ]
  }
]

export default function AdminTabs({ 
  news, faculty, gallery, contacts, admissions, circulars,
  hero, heroImages, navbar, footer, aboutPage, principalMessage,
  academicsPage, stats, highlights, notices, contactInfo,
  studentsPage, studentDownloads, elibraryResources, studentAchievements, alumniStats,
  programs, testimonials, ctaBanner, clubs, annualEvents
}: AdminTabsProps) {
  const [activeTab, setActiveTab] = useState('news')
  const [activeCategory, setActiveCategory] = useState('Content')

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Circle
    return Icon
  }

  const getCounts = (id: string) => {
    switch(id) {
      case 'news': return news.length
      case 'faculty': return faculty.length
      case 'gallery': return gallery.length
      case 'contacts': return contacts.length
      case 'admissions': return admissions.length
      case 'circulars': return circulars.length
      case 'stats': return stats.length
      case 'highlights': return highlights.length
      case 'notices': return notices.length
      case 'programs': return programs.length
      case 'testimonials': return testimonials.length
      default: return null
    }
  }

  const currentCategory = tabCategories.find(c => c.label === activeCategory)

  return (
    <div className="flex gap-6">
      {/* Left Sidebar */}
      <div className="w-56 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Categories</h3>
          </div>
          <div className="p-2">
            {tabCategories.map((category) => {
              const Icon = getIcon(category.icon)
              const isActive = activeCategory === category.label
              return (
                <button
                  key={category.label}
                  onClick={() => {
                    setActiveCategory(category.label)
                    setActiveTab(category.tabs[0].id)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    isActive 
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{category.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b flex items-center gap-3">
            {currentCategory && (
              <>
                {(() => {
                  const Icon = getIcon(currentCategory.icon)
                  return (
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${currentCategory.color} flex items-center justify-center shadow-lg`}>
                      <Icon size={20} className="text-white" />
                    </div>
                  )
                })()}
                <div>
                  <h2 className="font-bold text-gray-900">{currentCategory.label}</h2>
                  <p className="text-xs text-gray-500">{currentCategory.tabs.length} sections</p>
                </div>
              </>
            )}
          </div>
          <div className="p-3 flex gap-2 overflow-x-auto">
            {currentCategory?.tabs.map((tab) => {
              const Icon = getIcon(tab.icon)
              const count = getCounts(tab.id)
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                    isActive 
                      ? 'bg-green-600 text-white shadow-lg shadow-green-500/25' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                  {count !== null && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          {activeTab === 'news' && <NewsManager initialNews={news} />}
          {activeTab === 'notices' && <NoticesManager initialNotices={notices} />}
          {activeTab === 'circulars' && <CircularsManager initialCirculars={circulars} />}
          
          {activeTab === 'hero' && <HeroManager initialHero={hero} initialImages={heroImages} />}
          {activeTab === 'stats' && <StatsManager initialStats={stats} />}
          {activeTab === 'highlights' && <HighlightsManager initialHighlights={highlights} />}
          {activeTab === 'programs' && <ProgramsManager initialPrograms={programs} />}
          {activeTab === 'principal' && <PrincipalManager initialData={principalMessage} />}
          {activeTab === 'testimonials' && <TestimonialsManager initialTestimonials={testimonials} />}
          {activeTab === 'cta-banner' && <CTABannerManager initialData={ctaBanner} />}
          
          {activeTab === 'about' && <AboutPageManager initialData={aboutPage} principalData={principalMessage} />}
          {activeTab === 'academics' && <AcademicsPageManager initialData={academicsPage} />}
          {activeTab === 'students' && (
            <StudentsPageManager
              pageData={studentsPage}
              downloads={studentDownloads}
              elibraryResources={elibraryResources}
              achievements={studentAchievements}
              alumniStats={alumniStats}
            />
          )}
          {activeTab === 'activities' && (
            <ActivitiesManager sportsCategories={[]} artsCategories={[]} clubs={clubs} events={annualEvents} />
          )}
          
          {activeTab === 'faculty' && <FacultyManager initialFaculty={faculty} />}
          {activeTab === 'admissions' && <AdmissionsManager initialAdmissions={admissions} />}
          {activeTab === 'contacts' && <ContactsManager initialContacts={contacts} />}
          
          {activeTab === 'gallery' && <GalleryManager initialGallery={gallery} />}
          
          {activeTab === 'navbar' && <NavbarManager initialNavbar={navbar} />}
          {activeTab === 'footer' && <FooterManager initialFooter={footer} />}
          {activeTab === 'contact-info' && <ContactInfoManager initialData={contactInfo} />}
        </div>
      </div>
    </div>
  )
}
