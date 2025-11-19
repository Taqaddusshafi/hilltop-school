'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'

interface NewsFormProps {
  initialData?: any
}

export default function NewsForm({ initialData }: NewsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    category: initialData?.category || 'General',
    news_date: initialData?.news_date || new Date().toISOString().split('T')[0],
    is_active: initialData?.is_active ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      
      if (initialData) {
        // Update existing
        const { error: updateError } = await supabase
          .from('news_items')
          .update(formData)
          .eq('id', initialData.id)
        
        if (updateError) throw updateError
      } else {
        // Create new
        const { error: insertError } = await supabase
          .from('news_items')
          .insert([formData])
        
        if (insertError) throw insertError
      }

      router.push('/admin/dashboard/news')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to save news item')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              rows={5}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="General">General</option>
                <option value="Admission">Admission</option>
                <option value="Event">Event</option>
                <option value="Meeting">Meeting</option>
                <option value="Holiday">Holiday</option>
                <option value="Achievement">Achievement</option>
              </select>
            </div>

            <div>
              <Label htmlFor="news_date">Date *</Label>
              <Input
                id="news_date"
                type="date"
                value={formData.news_date}
                onChange={(e) => setFormData({ ...formData, news_date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4"
            />
            <Label htmlFor="is_active">Active (visible on website)</Label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? 'Saving...' : (initialData ? 'Update' : 'Create')} News
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/dashboard/news')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
