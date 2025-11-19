import { requireAdmin } from '@/lib/supabase/admin'
import AdminNav from '@/components/admin/AdminNav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await requireAdmin()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Only show admin nav, no site nav */}
      <AdminNav admin={admin} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
