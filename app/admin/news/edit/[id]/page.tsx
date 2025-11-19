import { requireAdmin, createAdminSupabaseClient } from '@/lib/supabase/admin'
import NewsForm from '@/components/admin/NewsForm'
import { notFound } from 'next/navigation'

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  await requireAdmin()
  const supabase = await createAdminSupabaseClient()

  const { data: news } = await supabase
    .from('news_items')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!news) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit News Item</h1>
        <p className="text-gray-600 mt-2">Update news item details</p>
      </div>

      <NewsForm initialData={news} />
    </div>
  )
}
