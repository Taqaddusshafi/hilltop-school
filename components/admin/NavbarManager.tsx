'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function NavbarManager({ initialNavbar }: { initialNavbar: any }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    school_name: initialNavbar?.school_name || '',
    tagline: initialNavbar?.tagline || '',
    logo_text: initialNavbar?.logo_text || '',
    phone: initialNavbar?.phone || '',
    email: initialNavbar?.email || '',
    address_short: initialNavbar?.address_short || '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()
      await supabase
        .from('navbar_info')
        .update(formData)
        .eq('id', initialNavbar.id)

      router.refresh()
      alert('Navbar updated!')
    } catch (error) {
      console.error('Error updating navbar:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Navbar Settings</h2>
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
                <Label>Logo Text *</Label>
                <Input
                  value={formData.logo_text}
                  onChange={(e) => setFormData({ ...formData, logo_text: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Tagline *</Label>
              <Input
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
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
              <div>
                <Label>Address (Short) *</Label>
                <Input
                  value={formData.address_short}
                  onChange={(e) => setFormData({ ...formData, address_short: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? 'Updating...' : 'Update Navbar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
