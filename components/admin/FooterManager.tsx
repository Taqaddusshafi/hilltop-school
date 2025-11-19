'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function FooterManager({ initialFooter }: { initialFooter: any }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    school_name: initialFooter?.school_name || '',
    tagline: initialFooter?.tagline || '',
    address: initialFooter?.address || '',
    phone: initialFooter?.phone || '',
    email: initialFooter?.email || '',
    facebook_url: initialFooter?.facebook_url || '',
    instagram_url: initialFooter?.instagram_url || '',
    youtube_url: initialFooter?.youtube_url || '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()
      await supabase
        .from('footer_info')
        .update(formData)
        .eq('id', initialFooter.id)

      router.refresh()
      alert('Footer updated!')
    } catch (error) {
      console.error('Error updating footer:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Footer Settings</h2>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>School Name *</Label>
                <Input
                  value={formData.school_name}
                  onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Tagline *</Label>
                <Input
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Address *</Label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Phone *</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Facebook URL</Label>
                <Input
                  value={formData.facebook_url}
                  onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <Label>Instagram URL</Label>
                <Input
                  value={formData.instagram_url}
                  onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <Label>YouTube URL</Label>
                <Input
                  value={formData.youtube_url}
                  onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>

            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? 'Updating...' : 'Update Footer'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
