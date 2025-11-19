'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import Image from 'next/image'

export default function FacultyManager({ initialFaculty }: { initialFaculty: any[] }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    qualification: '',
    subject: '',
    experience: '',
    email: '',
    phone: '',
    photo_url: '',
    is_active: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    try {
      if (editingId) {
        await supabase.from('faculty_members').update(formData).eq('id', editingId)
      } else {
        await supabase.from('faculty_members').insert([formData])
      }
      
      router.refresh()
      setShowForm(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      console.error('Error saving faculty:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this faculty member?')) return
    
    const supabase = createClient()
    await supabase.from('faculty_members').delete().eq('id', id)
    router.refresh()
  }

  const handleEdit = (item: any) => {
    setFormData(item)
    setEditingId(item.id)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      qualification: '',
      subject: '',
      experience: '',
      email: '',
      phone: '',
      photo_url: '',
      is_active: true,
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Faculty Management</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-green-600 hover:bg-green-700">
          {showForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
          {showForm ? 'Cancel' : 'Add Faculty'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name *</Label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div>
                  <Label>Position *</Label>
                  <Input value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Qualification *</Label>
                  <Input value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} required />
                </div>
                <div>
                  <Label>Subject *</Label>
                  <Input value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Experience</Label>
                  <Input value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} placeholder="10 years" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
              </div>

              <div>
                <Label>Photo URL</Label>
                <Input value={formData.photo_url} onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })} placeholder="https://..." />
              </div>

              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingId ? 'Update' : 'Add'} Faculty
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {initialFaculty.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 bg-gray-200 rounded-full relative overflow-hidden flex-shrink-0">
                  {member.photo_url ? (
                    <Image src={member.photo_url} alt={member.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-600 font-bold">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold truncate">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.position}</p>
                  <p className="text-xs text-gray-500 mt-1">{member.subject}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" onClick={() => handleEdit(member)} className="flex-1">
                  <Edit size={14} className="mr-1" /> Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(member.id)}>
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
