'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ContactInfoManager({ initialData }: { initialData: any }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    section_heading: initialData?.section_heading || '',
    section_description: initialData?.section_description || '',
    address: initialData?.address || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    office_hours: initialData?.office_hours || '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()
      await supabase
        .from('contact_info')
        .update(formData)
        .eq('id', initialData.id)

      router.refresh()
      alert('Contact info updated!')
    } catch (error) {
      console.error('Error updating contact info:', error)
      alert('Failed to update')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Information (Home Page)</h2>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Section Heading *</Label>
              <Input
                value={formData.section_heading}
                onChange={(e) => setFormData({ ...formData, section_heading: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Section Description *</Label>
              <Textarea
                value={formData.section_description}
                onChange={(e) => setFormData({ ...formData, section_description: e.target.value })}
                rows={3}
                required
              />
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

            <div>
              <Label>Office Hours *</Label>
              <Input
                value={formData.office_hours}
                onChange={(e) => setFormData({ ...formData, office_hours: e.target.value })}
                placeholder="Monday - Saturday: 8:00 AM - 4:00 PM"
                required
              />
            </div>

            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? 'Updating...' : 'Update Contact Info'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
