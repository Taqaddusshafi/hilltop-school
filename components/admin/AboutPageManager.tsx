'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function AboutPageManager({ initialData }: { initialData: any }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    hero_title: initialData?.hero_title || '',
    hero_subtitle: initialData?.hero_subtitle || '',
    legacy_heading: initialData?.legacy_heading || '',
    legacy_content: initialData?.legacy_content || '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()
      await supabase
        .from('about_page')
        .update(formData)
        .eq('id', initialData.id)

      router.refresh()
      alert('About page updated!')
    } catch (error) {
      console.error('Error updating about page:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">About Page Content</h2>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Hero Title *</Label>
                <Input
                  value={formData.hero_title}
                  onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Hero Subtitle *</Label>
                <Input
                  value={formData.hero_subtitle}
                  onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Legacy Section Heading *</Label>
              <Input
                value={formData.legacy_heading}
                onChange={(e) => setFormData({ ...formData, legacy_heading: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Legacy Content *</Label>
              <Textarea
                value={formData.legacy_content}
                onChange={(e) => setFormData({ ...formData, legacy_content: e.target.value })}
                rows={6}
                required
              />
            </div>

            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? 'Updating...' : 'Update About Page'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
