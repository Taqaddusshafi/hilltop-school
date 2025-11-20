'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Trash2, Plus } from 'lucide-react'

interface HeroProps {
  initialHero: any
  initialImages: any[]
}

export default function HeroManager({ initialHero, initialImages }: HeroProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: initialHero?.title || '',
    subtitle: initialHero?.subtitle || '',
    description: initialHero?.description || '',
  })
  const [images, setImages] = useState(initialImages || [])
  const [newImageUrl, setNewImageUrl] = useState('')
  const [newImageTitle, setNewImageTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()
      await supabase
        .from('hero')
        .update(formData)
        .eq('id', initialHero.id)

      router.refresh()
      alert('Hero section updated!')
    } catch (error) {
      console.error('Error updating hero:', error)
      alert('Failed to update')
    } finally {
      setLoading(false)
    }
  }

  const handleAddImage = async () => {
    if (!newImageUrl) return

    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('hero_images')
        .insert({
          image_url: newImageUrl,
          title: newImageTitle || null,
          display_order: images.length,
          is_active: true
        })
        .select()
        .single()

      if (error) throw error

      // Optimistically update the UI immediately
      if (data) {
        setImages([...images, data])
      }

      setNewImageUrl('')
      setNewImageTitle('')
      
      // Still refresh to sync with server
      router.refresh()
      alert('Image added!')
    } catch (error) {
      console.error('Error adding image:', error)
      alert('Failed to add image')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteImage = async (id: number) => {
    if (!confirm('Delete this image?')) return

    setLoading(true)
    try {
      const supabase = createClient()
      await supabase
        .from('hero_images')
        .delete()
        .eq('id', id)

      // Optimistically update the UI immediately
      setImages(images.filter(img => img.id !== id))

      // Still refresh to sync with server
      router.refresh()
      alert('Image deleted!')
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Failed to delete')
      // Revert on error
      setImages(initialImages)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    setLoading(true)
    try {
      const supabase = createClient()
      await supabase
        .from('hero_images')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      // Optimistically update the UI immediately
      setImages(images.map(img => 
        img.id === id ? { ...img, is_active: !currentStatus } : img
      ))

      // Still refresh to sync with server
      router.refresh()
    } catch (error) {
      console.error('Error toggling image:', error)
      alert('Failed to update')
      // Revert on error
      setImages(initialImages)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Home Hero Section</h2>
      
      {/* Hero Text Content */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Hero Content</h3>
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
              <Label>Subtitle *</Label>
              <Input
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>

            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? 'Updating...' : 'Update Hero Content'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Hero Images Management */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Background Images</h3>
          
          {/* Add New Image */}
          <div className="space-y-3 mb-6 p-4 border rounded-lg bg-gray-50">
            <div>
              <Label>Image URL *</Label>
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            <div>
              <Label>Title (Optional)</Label>
              <Input
                value={newImageTitle}
                onChange={(e) => setNewImageTitle(e.target.value)}
                placeholder="Campus view"
              />
            </div>
            <Button 
              onClick={handleAddImage} 
              disabled={!newImageUrl || loading}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </div>

          {/* Existing Images */}
          <div className="space-y-3">
            {images.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No images added yet</p>
            ) : (
              images.map((image, index) => (
                <div key={image.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <img 
                    src={image.image_url} 
                    alt={image.title || `Image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{image.title || `Image ${index + 1}`}</p>
                    <p className="text-sm text-gray-500 truncate">{image.image_url}</p>
                    <p className="text-xs text-gray-400">Order: {image.display_order}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={image.is_active ? "default" : "outline"}
                      onClick={() => handleToggleActive(image.id, image.is_active)}
                      disabled={loading}
                    >
                      {image.is_active ? 'Active' : 'Inactive'}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteImage(image.id)}
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
