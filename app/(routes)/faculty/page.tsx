import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Award, Phone } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import Image from 'next/image'

export const metadata = {
  title: 'Faculty',
  description: 'Meet our dedicated and experienced faculty members.',
}

export default async function FacultyPage() {
  const supabase = await createServerSupabaseClient()
  
  // Fetch all data
  let pageData = null
  let facultyMembers: any[] = []
  let supportStaff: any[] = []

  if (supabase) {
    const [page, faculty, support] = await Promise.all([
      supabase.from('faculty_page').select('*').eq('is_active', true).single(),
      supabase.from('faculty_members').select('*').eq('is_active', true).order('display_order'),
      supabase.from('support_staff').select('*').eq('is_active', true).order('display_order')
    ])

    pageData = page.data
    facultyMembers = faculty.data || []
    supportStaff = support.data || []
  }

  // Fallback data
  const facultyPage = pageData || {
    hero_title: "Our Faculty",
    hero_subtitle: "Dedicated educators committed to nurturing young minds",
    intro_heading: "Experienced & Qualified Teachers",
    intro_description: "Our faculty comprises highly qualified and experienced educators...",
    support_staff_heading: "Support Staff",
    support_staff_description: "Our dedicated support staff ensures smooth functioning of all school activities"
  }

  const faculty = facultyMembers.length > 0 ? facultyMembers : [
    {
      id: 1,
      name: "Dr. Aisha Khan",
      position: "Principal",
      qualification: "Ph.D. in Education",
      subject: "School Administration",
      experience: "25 years",
      photo_url: null
    }
  ]

  const support = supportStaff.length > 0 ? supportStaff : [
    { id: 1, title: "Administrative Staff", description: "Office management and student records" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Dynamic */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{facultyPage.hero_title}</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            {facultyPage.hero_subtitle}
          </p>
        </div>
      </section>

      {/* Faculty Introduction - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{facultyPage.intro_heading}</h2>
            <p className="text-gray-600">
              {facultyPage.intro_description}
            </p>
          </div>

          {/* Faculty Grid - Dynamic with Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {faculty.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 relative overflow-hidden">
                    {member.photo_url ? (
                      <Image
                        src={member.photo_url}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-600 font-bold text-2xl">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-center text-lg">{member.name}</CardTitle>
                  <p className="text-center text-green-600 font-medium text-sm">{member.position}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Award className="text-green-600 flex-shrink-0 mt-1" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Qualification</p>
                      <p className="text-sm text-gray-600">{member.qualification}</p>
                    </div>
                  </div>
                  <div className="border-t pt-2">
                    <p className="text-sm font-medium text-gray-900">Subject</p>
                    <p className="text-sm text-gray-600">{member.subject}</p>
                  </div>
                  <div className="border-t pt-2">
                    <p className="text-sm font-medium text-gray-900">Experience</p>
                    <p className="text-sm text-gray-600">{member.experience}</p>
                  </div>
                  {member.email && (
                    <div className="border-t pt-2">
                      <a 
                        href={`mailto:${member.email}`} 
                        className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                      >
                        <Mail size={14} />
                        <span className="truncate">{member.email}</span>
                      </a>
                    </div>
                  )}
                  {member.phone && (
                    <div className="border-t pt-2">
                      <a 
                        href={`tel:${member.phone}`} 
                        className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                      >
                        <Phone size={14} />
                        <span>{member.phone}</span>
                      </a>
                    </div>
                  )}
                  {member.bio && (
                    <div className="border-t pt-2">
                      <p className="text-sm text-gray-600 italic">{member.bio}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Staff - Dynamic */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              {facultyPage.support_staff_heading}
            </h2>
            {facultyPage.support_staff_description && (
              <p className="text-center text-gray-600 mb-8">
                {facultyPage.support_staff_description}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {support.map((staff) => (
                <Card key={staff.id}>
                  <CardHeader>
                    <CardTitle className="text-lg text-center">{staff.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-gray-600 text-sm">
                    {staff.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
