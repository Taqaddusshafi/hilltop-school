import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Award, Phone, Users, GraduationCap, BookOpen, Sparkles, Star, Clock, Trophy } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import Image from 'next/image'
import PageHeader from '@/components/ui/PageHeader'

export const metadata = {
  title: 'Faculty',
  description: 'Meet our dedicated and experienced faculty members.',
}

const departmentColors = [
  { gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600" },
  { gradient: "from-purple-500 to-violet-500", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600" },
  { gradient: "from-green-500 to-emerald-500", bg: "bg-green-50", border: "border-green-200", text: "text-green-600" },
  { gradient: "from-orange-500 to-amber-500", bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-600" },
  { gradient: "from-pink-500 to-rose-500", bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-600" },
]

export default async function FacultyPage() {
  const supabase = await createServerSupabaseClient()
  
  // Fetch all data from Supabase
  let pageData = null
  let facultyMembers: any[] = []
  let supportStaff: any[] = []
  let departments: any[] = []

  if (supabase) {
    const [page, faculty, support, depts] = await Promise.all([
      supabase.from('faculty_page').select('*').eq('is_active', true).single(),
      supabase.from('faculty_members').select('*').eq('is_active', true).order('display_order'),
      supabase.from('support_staff').select('*').eq('is_active', true).order('display_order'),
      supabase.from('departments').select('*').eq('is_active', true).order('display_order')
    ])

    pageData = page.data
    facultyMembers = faculty.data || []
    supportStaff = support.data || []
    departments = depts.data || []
  }

  // Fallback data
  const facultyPage = pageData || {
    hero_title: "Our Faculty",
    hero_subtitle: "Dedicated educators committed to nurturing young minds and shaping futures",
    intro_heading: "Experienced & Qualified Teachers",
    intro_description: "Our faculty comprises highly qualified and experienced educators who are passionate about teaching and dedicated to bringing out the best in every student. With expertise in their respective subjects and a commitment to continuous learning, our teachers create an engaging and supportive learning environment.",
    support_staff_heading: "Support Staff",
    support_staff_description: "Our dedicated support staff ensures smooth functioning of all school activities"
  }

  const faculty = facultyMembers.length > 0 ? facultyMembers : [
    { id: 1, name: "Dr. Mohammad Ashraf", position: "Principal", qualification: "Ph.D. in Education Management", subject: "School Administration", experience: "25 years", department: "Administration", photo_url: null, achievements: "State Education Award 2020" },
    { id: 2, name: "Mrs. Fatima Khan", position: "Vice Principal", qualification: "M.A. English, B.Ed", subject: "English Language", experience: "20 years", department: "Languages", photo_url: null },
    { id: 3, name: "Mr. Abdul Rashid", position: "Senior Teacher", qualification: "M.Sc. Mathematics", subject: "Mathematics", experience: "18 years", department: "Science", photo_url: null },
    { id: 4, name: "Mrs. Shabnam Parveen", position: "Teacher", qualification: "M.Sc. Physics, B.Ed", subject: "Physics", experience: "15 years", department: "Science", photo_url: null },
    { id: 5, name: "Mr. Javaid Ahmad", position: "Teacher", qualification: "M.A. Urdu, B.Ed", subject: "Urdu", experience: "12 years", department: "Languages", photo_url: null },
    { id: 6, name: "Ms. Zainab Akhtar", position: "Teacher", qualification: "M.Sc. Computer Science", subject: "Computer Science", experience: "8 years", department: "Technology", photo_url: null },
    { id: 7, name: "Mr. Bilal Ahmad", position: "Teacher", qualification: "M.A. Social Science", subject: "Social Studies", experience: "10 years", department: "Humanities", photo_url: null },
    { id: 8, name: "Mrs. Nusrat Jahan", position: "Teacher", qualification: "M.Sc. Biology, B.Ed", subject: "Biology", experience: "14 years", department: "Science", photo_url: null }
  ]

  const support = supportStaff.length > 0 ? supportStaff : [
    { id: 1, title: "Administrative Office", description: "Handles admissions, records, and official correspondence", staff_count: "4" },
    { id: 2, title: "Library Staff", description: "Manages the school library and digital resources", staff_count: "2" },
    { id: 3, title: "Lab Technicians", description: "Maintains and operates science laboratories", staff_count: "3" },
    { id: 4, title: "Sports Department", description: "Oversees physical education and sports activities", staff_count: "2" }
  ]

  // Group faculty by department
  const groupedFaculty = faculty.reduce((acc: any, member: any) => {
    const dept = member.department || 'General'
    if (!acc[dept]) acc[dept] = []
    acc[dept].push(member)
    return acc
  }, {})

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <PageHeader 
        title={facultyPage.hero_title}
        subtitle={facultyPage.hero_subtitle}
        badge="Meet Our Team"
      />

      {/* Stats Banner */}
      <section className="py-8 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="group">
              <p className="text-3xl md:text-4xl font-bold mb-1 group-hover:scale-110 transition-transform">25+</p>
              <p className="text-green-100 text-sm">Qualified Teachers</p>
            </div>
            <div className="group">
              <p className="text-3xl md:text-4xl font-bold mb-1 group-hover:scale-110 transition-transform">15+</p>
              <p className="text-green-100 text-sm">Years Avg. Experience</p>
            </div>
            <div className="group">
              <p className="text-3xl md:text-4xl font-bold mb-1 group-hover:scale-110 transition-transform">100%</p>
              <p className="text-green-100 text-sm">Qualified Staff</p>
            </div>
            <div className="group">
              <p className="text-3xl md:text-4xl font-bold mb-1 group-hover:scale-110 transition-transform">10+</p>
              <p className="text-green-100 text-sm">Departments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Introduction */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-5 py-2 mb-6">
              <GraduationCap className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-semibold text-sm">Expert Educators</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{facultyPage.intro_heading}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{facultyPage.intro_description}</p>
            <div className="mt-8 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto"></div>
          </div>

          {/* Leadership Team (Principal etc.) */}
          {faculty.filter(m => m.position === 'Principal' || m.position === 'Vice Principal').length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">School Leadership</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {faculty.filter(m => m.position === 'Principal' || m.position === 'Vice Principal').map((member, index) => (
                  <div 
                    key={member.id}
                    className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <div className="absolute -inset-2 bg-white/20 rounded-full animate-pulse"></div>
                        <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                          {member.photo_url ? (
                            <Image
                              src={member.photo_url}
                              alt={member.name}
                              fill
                              className="object-cover"
                              sizes="128px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-white/20 text-white font-bold text-4xl">
                              {member.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-green-100 font-semibold">{member.position}</p>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <Award className="text-green-600 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Qualification</p>
                          <p className="text-gray-900">{member.qualification}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-green-600 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Experience</p>
                          <p className="text-gray-900 font-semibold text-green-600">{member.experience}</p>
                        </div>
                      </div>
                      {member.achievements && (
                        <div className="flex items-center gap-3">
                          <Trophy className="text-yellow-500 flex-shrink-0" size={18} />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Achievement</p>
                            <p className="text-gray-900">{member.achievements}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Faculty Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {faculty.filter(m => m.position !== 'Principal' && m.position !== 'Vice Principal').map((member, index) => {
              const colors = departmentColors[index % departmentColors.length]
              
              return (
                <div 
                  key={member.id} 
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100"
                >
                  <div className={`h-2 bg-gradient-to-r ${colors.gradient}`}></div>
                  
                  <div className="p-6 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-full opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                      <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                        {member.photo_url ? (
                          <Image
                            src={member.photo_url}
                            alt={member.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        ) : (
                          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${colors.gradient} text-white font-bold text-2xl`}>
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">{member.name}</h3>
                    <p className={`${colors.text} font-semibold text-sm mb-4`}>{member.position}</p>
                    
                    <div className="space-y-3 text-left">
                      <div className="flex items-start gap-2">
                        <BookOpen className={`${colors.text} flex-shrink-0 mt-0.5`} size={14} />
                        <div>
                          <p className="text-xs text-gray-500">Subject</p>
                          <p className="text-sm text-gray-900">{member.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className={`${colors.text} flex-shrink-0 mt-0.5`} size={14} />
                        <div>
                          <p className="text-xs text-gray-500">Qualification</p>
                          <p className="text-sm text-gray-900">{member.qualification}</p>
                        </div>
                      </div>
                      <div className={`flex items-center justify-between pt-3 border-t ${colors.border}`}>
                        <span className="text-xs text-gray-500">Experience</span>
                        <span className={`font-bold ${colors.text}`}>{member.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Support Staff - Dark Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-white font-semibold text-sm">Behind the Scenes</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{facultyPage.support_staff_heading}</h2>
              {facultyPage.support_staff_description && (
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">{facultyPage.support_staff_description}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {support.map((staff, index) => {
                const colors = departmentColors[index % departmentColors.length]
                
                return (
                  <div 
                    key={staff.id} 
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <Users className="text-white" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors">{staff.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{staff.description}</p>
                      {staff.staff_count && (
                        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                          <span className="text-green-400 font-bold">{staff.staff_count}</span>
                          <span className="text-gray-400 text-sm">Staff Members</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Join Our Teaching Team</h2>
          <p className="text-green-100 mb-6 max-w-xl mx-auto">We're always looking for passionate educators to join our family</p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-white text-green-600 font-bold px-8 py-3 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <Mail size={18} />
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}
