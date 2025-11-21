import { requireAdmin, createAdminSupabaseClient } from '@/lib/supabase/admin'
import AdminTabs from '@/components/admin/AdminTabs'

export default async function AdminDashboard() {
  const admin = await requireAdmin()
  const supabase = await createAdminSupabaseClient()

  // Fetch all data
  const [
    { data: news },
    { data: faculty },
    { data: gallery },
    { data: contacts },
    { data: admissions },
    { data: circulars },
    { data: hero },
    { data: heroImages },
    { data: navbar },
    { data: footer },
    { data: aboutPage },
    { data: academicsPage },
    { data: stats },
    { data: highlights },
    { data: notices },
    { data: contactInfo },
    { data: studentsPage },
    { data: studentDownloads },
    { data: elibraryResources },
    { data: studentAchievements },
    { data: alumniStats },
  ] = await Promise.all([
    supabase.from('news_items').select('*').order('news_date', { ascending: false }),
    supabase.from('faculty_members').select('*').order('display_order'),
    supabase.from('gallery_photos').select('*, gallery_categories(category_name)').order('created_at', { ascending: false }).limit(50),
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
    supabase.from('admission_applications').select('*').order('created_at', { ascending: false }),
    supabase.from('circulars').select('*').order('circular_date', { ascending: false }),
    supabase.from('hero').select('*').eq('is_active', true).single(),
    supabase.from('hero_images').select('*').eq('is_active', true).order('display_order'),
    supabase.from('navbar_info').select('*').eq('is_active', true).single(),
    supabase.from('footer_info').select('*').eq('is_active', true).single(),
    supabase.from('about_page').select('*').eq('is_active', true).single(),
    supabase.from('academics_page').select('*').eq('is_active', true).single(),
    supabase.from('stats').select('*').eq('is_active', true).order('display_order'),
    supabase.from('highlights').select('*').eq('is_active', true).order('display_order'),
    supabase.from('notices').select('*').eq('is_active', true).order('display_order'),
    supabase.from('contact_info').select('*').eq('is_active', true).single(),
    supabase.from('students_page').select('*').eq('is_active', true).single(),
    supabase.from('student_downloads').select('*').eq('is_active', true).order('display_order'),
    supabase.from('elibrary_resources').select('*').eq('is_active', true).order('display_order'),
    supabase.from('student_achievements').select('*').eq('is_active', true).order('display_order'),
    supabase.from('alumni_stats').select('*').eq('is_active', true).order('display_order'),
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {admin.full_name}!</h1>
        <p className="text-gray-600 mt-2">Manage all your school content from here</p>
      </div>

      <AdminTabs 
        news={news || []}
        faculty={faculty || []}
        gallery={gallery || []}
        contacts={contacts || []}
        admissions={admissions || []}
        circulars={circulars || []}
        hero={hero}
        heroImages={heroImages || []}
        navbar={navbar}
        footer={footer}
        aboutPage={aboutPage}
        academicsPage={academicsPage}
        stats={stats || []}
        highlights={highlights || []}
        notices={notices || []}
        contactInfo={contactInfo}
        studentsPage={studentsPage}
        studentDownloads={studentDownloads || []}
        elibraryResources={elibraryResources || []}
        studentAchievements={studentAchievements || []}
        alumniStats={alumniStats || []}
      />
    </div>
  )
}
