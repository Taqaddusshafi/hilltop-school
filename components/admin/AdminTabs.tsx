'use client'

import { useState } from 'react'
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
}

export default function AdminTabs({ 
  news, 
  faculty, 
  gallery, 
  contacts, 
  admissions, 
  circulars,
  hero,
  heroImages,
  navbar,
  footer,
  aboutPage,
  academicsPage,
  stats,
  highlights,
  notices,
  contactInfo,
  studentsPage,
  studentDownloads,
  elibraryResources,
  studentAchievements,
  alumniStats
}: AdminTabsProps) {
  const [activeTab, setActiveTab] = useState('news')

  const tabs = [
    { id: 'news', label: `News (${news.length})` },
    { id: 'faculty', label: `Faculty (${faculty.length})` },
    { id: 'gallery', label: `Gallery (${gallery.length})` },
    { id: 'contacts', label: `Messages (${contacts.length})` },
    { id: 'admissions', label: `Admissions (${admissions.length})` },
    { id: 'circulars', label: `Circulars (${circulars.length})` },
    { id: 'hero', label: 'Home Hero' },
    { id: 'stats', label: `Stats (${stats.length})` },
    { id: 'highlights', label: `Highlights (${highlights.length})` },
    { id: 'notices', label: `Notices (${notices.length})` },
    { id: 'contact-info', label: 'Contact Info' },
    { id: 'navbar', label: 'Navbar' },
    { id: 'footer', label: 'Footer' },
    { id: 'about', label: 'About Page' },
    { id: 'academics', label: 'Academics' },
    { id: 'students', label: 'Students Page' },
  ]

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-4 overflow-x-auto pb-2" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition
                ${activeTab === tab.id
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'news' && <NewsManager initialNews={news} />}
        {activeTab === 'faculty' && <FacultyManager initialFaculty={faculty} />}
        {activeTab === 'gallery' && <GalleryManager initialGallery={gallery} />}
        {activeTab === 'contacts' && <ContactsManager initialContacts={contacts} />}
        {activeTab === 'admissions' && <AdmissionsManager initialAdmissions={admissions} />}
        {activeTab === 'circulars' && <CircularsManager initialCirculars={circulars} />}
        {activeTab === 'hero' && <HeroManager initialHero={hero} initialImages={heroImages} />}
        {activeTab === 'stats' && <StatsManager initialStats={stats} />}
        {activeTab === 'highlights' && <HighlightsManager initialHighlights={highlights} />}
        {activeTab === 'notices' && <NoticesManager initialNotices={notices} />}
        {activeTab === 'contact-info' && <ContactInfoManager initialData={contactInfo} />}
        {activeTab === 'navbar' && <NavbarManager initialNavbar={navbar} />}
        {activeTab === 'footer' && <FooterManager initialFooter={footer} />}
        {activeTab === 'about' && <AboutPageManager initialData={aboutPage} />}
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
      </div>
    </div>
  )
}
