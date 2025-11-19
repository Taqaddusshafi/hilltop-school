import { requireAdmin } from '@/lib/supabase/admin'
import NewsForm from '@/components/admin/NewsForm'

export default async function CreateNewsPage() {
  await requireAdmin()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create News Item</h1>
        <p className="text-gray-600 mt-2">Add a new news item or announcement</p>
      </div>

      <NewsForm />
    </div>
  )
}
