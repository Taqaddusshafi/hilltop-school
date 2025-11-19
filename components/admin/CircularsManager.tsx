'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, X, Download } from 'lucide-react'

export default function CircularsManager({ initialCirculars }: { initialCirculars: any[] }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    circular_date: new Date().toISOString().split('T')[0],
    file_size: '',
    file_url: '',
    is_active: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    try {
      if (editingId) {
        await supabase.from('circulars').update(formData).eq('id', editingId)
      } else {
        await supabase.from('circulars').insert([formData])
      }
      
      router.refresh()
      setShowForm(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      console.error('Error saving circular:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this circular?')) return
    
    const supabase = createClient()
    await supabase.from('circulars').delete().eq('id', id)
    router.refresh()
  }

  const handleEdit = (item: any) => {
    setFormData(item)
    setEditingId(item.id)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      circular_date: new Date().toISOString().split('T')[0],
      file_size: '',
      file_url: '',
      is_active: true,
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Circulars & Notices</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-green-600 hover:bg-green-700">
          {showForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
          {showForm ? 'Cancel' : 'Add Circular'}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date *</Label>
                  <Input
                    type="date"
                    value={formData.circular_date}
                    onChange={(e) => setFormData({ ...formData, circular_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>File Size *</Label>
                  <Input
                    value={formData.file_size}
                    onChange={(e) => setFormData({ ...formData, file_size: e.target.value })}
                    placeholder="e.g., 245 KB"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>File URL</Label>
                <Input
                  value={formData.file_url}
                  onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                  placeholder="https://... (optional)"
                />
                <p className="text-xs text-gray-500 mt-1">Upload PDF to Supabase Storage first</p>
              </div>

              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingId ? 'Update' : 'Add'} Circular
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {initialCirculars.map((circular) => (
          <Card key={circular.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-bold">{circular.title}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(circular.circular_date).toLocaleDateString()} • {circular.file_size}
                  </p>
                </div>
                <div className="flex gap-2">
                  {circular.file_url && (
                    <a href={circular.file_url} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline">
                        <Download size={14} />
                      </Button>
                    </a>
                  )}
                  <Button size="sm" variant="outline" onClick={() => handleEdit(circular)}>
                    <Edit size={14} />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(circular.id)}>
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
