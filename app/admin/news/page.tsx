import { requireAdmin, createAdminSupabaseClient } from '@/lib/supabase/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default async function NewsManagementPage() {
  const admin = await requireAdmin()
  const supabase = await createAdminSupabaseClient()

  const { data: newsItems } = await supabase
    .from('news_items')
    .select('*')
    .order('news_date', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-600 mt-2">Manage news items and announcements</p>
        </div>
        <Link href="/admin/dashboard/news/create">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus size={20} className="mr-2" />
            Add News
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {newsItems?.map((news) => (
          <Card key={news.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
                      {news.category}
                    </span>
                    {!news.is_active && (
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                        Inactive
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{news.title}</h3>
                  <p className="text-gray-600 mb-3">{news.content}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(news.news_date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link href={`/admin/dashboard/news/edit/${news.id}`}>
                    <Button size="sm" variant="outline">
                      <Edit size={16} />
                    </Button>
                  </Link>
                  <form action={`/admin/dashboard/news/delete/${news.id}`} method="POST">
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 size={16} />
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
