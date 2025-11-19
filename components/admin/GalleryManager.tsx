'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, X } from 'lucide-react'
import Image from 'next/image'

export default function GalleryManager({ initialGallery }: { initialGallery: any[] }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category_id: 1,
    event_date: new Date().toISOString().split('T')[0],
    is_active: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    try {
      await supabase.from('gallery_photos').insert([formData])
      router.refresh()
      setShowForm(false)
      resetForm()
    } catch (error) {
      console.error('Error adding photo:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this photo?')) return
    
    const supabase = createClient()
    await supabase.from('gallery_photos').delete().eq('id', id)
    router.refresh()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      category_id: 1,
      event_date: new Date().toISOString().split('T')[0],
      is_active: true,
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gallery Management</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-green-600 hover:bg-green-700">
          {showForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
          {showForm ? 'Cancel' : 'Add Photo'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <Label>Image URL *</Label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Use Unsplash or upload to Supabase Storage</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="1">Annual Day</option>
                    <option value="2">Sports Day</option>
                    <option value="3">Science Exhibition</option>
                    <option value="4">Cultural Events</option>
                    <option value="5">Independence Day</option>
                    <option value="6">Republic Day</option>
                    <option value="7">Classrooms</option>
                    <option value="8">Infrastructure</option>
                  </select>
                </div>

                <div>
                  <Label>Event Date</Label>
                  <Input
                    type="date"
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Add Photo
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {initialGallery.map((photo) => (
          <Card key={photo.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <Image
                src={photo.image_url}
                alt={photo.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <CardContent className="p-3">
              <h3 className="font-semibold text-sm truncate">{photo.title}</h3>
              <p className="text-xs text-gray-500">{photo.gallery_categories?.category_name}</p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(photo.id)}
                className="w-full mt-2 text-red-600"
              >
                <Trash2 size={14} className="mr-1" /> Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
