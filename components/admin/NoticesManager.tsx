'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, X } from 'lucide-react'

export default function NoticesManager({ initialNotices }: { initialNotices: any[] }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    message: '',
    start_date: '',
    end_date: '',
    is_active: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    try {
      if (editingId) {
        await supabase.from('notices').update(formData).eq('id', editingId)
      } else {
        await supabase.from('notices').insert([formData])
      }
      
      router.refresh()
      setShowForm(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      console.error('Error saving notice:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this notice?')) return
    const supabase = createClient()
    await supabase.from('notices').delete().eq('id', id)
    router.refresh()
  }

  const handleEdit = (item: any) => {
    setFormData(item)
    setEditingId(item.id)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      message: '',
      start_date: '',
      end_date: '',
      is_active: true,
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Notice Board Management</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-green-600 hover:bg-green-700">
          {showForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
          {showForm ? 'Cancel' : 'Add Notice'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Notice Message *</Label>
                <Input
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Admissions Open for 2026-27"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingId ? 'Update' : 'Add'} Notice
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {initialNotices.map((notice) => (
          <Card key={notice.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-medium">{notice.message}</p>
                  {notice.start_date && (
                    <p className="text-xs text-gray-500 mt-1">
                      {notice.start_date} to {notice.end_date || 'Ongoing'}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(notice)}>
                    <Edit size={14} />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(notice.id)}>
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
