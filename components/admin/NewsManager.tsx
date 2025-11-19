'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit, Trash2, X } from 'lucide-react'

export default function NewsManager({ initialNews }: { initialNews: any[] }) {
  const router = useRouter()
  const [news, setNews] = useState(initialNews)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    news_date: new Date().toISOString().split('T')[0],
    is_active: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    try {
      if (editingId) {
        await supabase.from('news_items').update(formData).eq('id', editingId)
      } else {
        await supabase.from('news_items').insert([formData])
      }
      
      router.refresh()
      setShowForm(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      console.error('Error saving news:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this news item?')) return
    
    const supabase = createClient()
    await supabase.from('news_items').delete().eq('id', id)
    router.refresh()
  }

  const handleEdit = (item: any) => {
    setFormData({
      title: item.title,
      content: item.content,
      category: item.category,
      news_date: item.news_date,
      is_active: item.is_active,
    })
    setEditingId(item.id)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'General',
      news_date: new Date().toISOString().split('T')[0],
      is_active: true,
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">News Management</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-green-600 hover:bg-green-700">
          {showForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
          {showForm ? 'Cancel' : 'Add News'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option>General</option>
                    <option>Admission</option>
                    <option>Event</option>
                    <option>Meeting</option>
                    <option>Holiday</option>
                    <option>Achievement</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.news_date}
                    onChange={(e) => setFormData({ ...formData, news_date: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="active">Active</Label>
              </div>

              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingId ? 'Update' : 'Create'} News
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {news.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-600 text-xs rounded mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.content}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {item.news_date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Edit size={14} />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
