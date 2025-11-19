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

export default function HighlightsManager({ initialHighlights }: { initialHighlights: any[] }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    icon_name: 'BookOpen',
    title: '',
    description: '',
    is_active: true,
  })

  const icons = ['BookOpen', 'Microscope', 'Palette', 'Trophy', 'Award', 'Users', 'Target', 'Sparkles']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    try {
      if (editingId) {
        await supabase.from('highlights').update(formData).eq('id', editingId)
      } else {
        await supabase.from('highlights').insert([formData])
      }
      
      router.refresh()
      setShowForm(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      console.error('Error saving highlight:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this highlight?')) return
    const supabase = createClient()
    await supabase.from('highlights').delete().eq('id', id)
    router.refresh()
  }

  const handleEdit = (item: any) => {
    setFormData(item)
    setEditingId(item.id)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      icon_name: 'BookOpen',
      title: '',
      description: '',
      is_active: true,
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Highlights Management</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-green-600 hover:bg-green-700">
          {showForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
          {showForm ? 'Cancel' : 'Add Highlight'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Icon</Label>
                <select
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {icons.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Description *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingId ? 'Update' : 'Add'} Highlight
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {initialHighlights.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(item)} className="flex-1">
                  <Edit size={14} />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
