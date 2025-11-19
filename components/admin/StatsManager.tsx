'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, X } from 'lucide-react'

export default function StatsManager({ initialStats }: { initialStats: any[] }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    icon_name: 'Users',
    value: '',
    label: '',
    display_order: 0,
    is_active: true,
  })

  const icons = ['Users', 'BookOpen', 'Award', 'GraduationCap', 'School', 'Trophy', 'Star', 'Target']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    try {
      if (editingId) {
        await supabase.from('stats').update(formData).eq('id', editingId)
      } else {
        await supabase.from('stats').insert([formData])
      }
      
      router.refresh()
      setShowForm(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      console.error('Error saving stat:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this stat?')) return
    const supabase = createClient()
    await supabase.from('stats').delete().eq('id', id)
    router.refresh()
  }

  const handleEdit = (item: any) => {
    setFormData(item)
    setEditingId(item.id)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      icon_name: 'Users',
      value: '',
      label: '',
      display_order: 0,
      is_active: true,
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Stats Management</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-green-600 hover:bg-green-700">
          {showForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
          {showForm ? 'Cancel' : 'Add Stat'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
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
                  <Label>Value *</Label>
                  <Input
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder="2000+"
                    required
                  />
                </div>
                <div>
                  <Label>Label *</Label>
                  <Input
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="Students"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingId ? 'Update' : 'Add'} Stat
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {initialStats.map((stat) => (
          <Card key={stat.id}>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-3">{stat.label}</div>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline" onClick={() => handleEdit(stat)}>
                  <Edit size={14} />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(stat.id)}>
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
