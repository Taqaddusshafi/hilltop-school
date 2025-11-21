'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, X, Loader2, Check, Trophy } from 'lucide-react'

export default function StatsManager({ initialStats }: { initialStats: any[] }) {
  const router = useRouter()
  const [stats, setStats] = useState(initialStats)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [processingId, setProcessingId] = useState<number | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [formData, setFormData] = useState({
    icon_name: 'Users',
    value: '',
    label: '',
    display_order: 0,
    is_active: true,
  })

  const icons = ['Users', 'BookOpen', 'Award', 'GraduationCap', 'School', 'Trophy', 'Star', 'Target']

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()

    try {
      if (editingId) {
        // Update existing stat
        const { data, error } = await supabase
          .from('stats')
          .update(formData)
          .eq('id', editingId)
          .select()
          .single()

        if (error) throw error

        // Optimistically update UI
        setStats(stats.map(stat => stat.id === editingId ? data : stat))
        showSuccess('Stat updated successfully!')
      } else {
        // Add new stat
        const { data, error } = await supabase
          .from('stats')
          .insert([formData])
          .select()
          .single()

        if (error) throw error

        // Optimistically update UI
        setStats([...stats, data])
        showSuccess('Stat added successfully!')
      }
      
      router.refresh()
      setShowForm(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      console.error('Error saving stat:', error)
      alert('Failed to save stat')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this stat?')) return
    
    setProcessingId(id)
    const supabase = createClient()
    
    try {
      await supabase.from('stats').delete().eq('id', id)
      
      // Optimistically update UI
      setStats(stats.filter(stat => stat.id !== id))
      showSuccess('Stat deleted successfully!')
      router.refresh()
    } catch (error) {
      console.error('Error deleting stat:', error)
      alert('Failed to delete stat')
    } finally {
      setProcessingId(null)
    }
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
        <Button 
          onClick={() => {
            setShowForm(!showForm)
            if (showForm) {
              setEditingId(null)
              resetForm()
            }
          }} 
          className="bg-green-600 hover:bg-green-700"
          disabled={loading}
        >
          {showForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
          {showForm ? 'Cancel' : 'Add Stat'}
        </Button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2 animate-in slide-in-from-top">
          <Check className="w-4 h-4" />
          {successMessage}
        </div>
      )}

      {showForm && (
        <Card className="mb-6 animate-in slide-in-from-top">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Icon</Label>
                  <select
                    value={formData.icon_name}
                    onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label>Label *</Label>
                  <Input
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="Students"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {editingId ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  <>
                    {editingId ? 'Update' : 'Add'} Stat
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card 
            key={stat.id}
            className={`transition-all duration-300 ${
              processingId === stat.id 
                ? 'opacity-50 scale-95' 
                : 'opacity-100 scale-100 hover:shadow-lg'
            }`}
          >
            <CardContent className="p-4 text-center relative">
              {processingId === stat.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
                  <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                </div>
              )}
              
              <div className="text-3xl font-bold text-green-600 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-3">{stat.label}</div>
              <div className="flex gap-2 justify-center">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleEdit(stat)}
                  disabled={processingId === stat.id || loading}
                  className="hover:bg-blue-50 hover:border-blue-500"
                >
                  <Edit size={14} />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleDelete(stat.id)}
                  disabled={processingId === stat.id || loading}
                  className="hover:bg-red-50 hover:border-red-500"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {stats.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-2">
              <Trophy className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Stats Yet</h3>
            <p className="text-gray-500 mb-4">Add your first stat to get started</p>
            <Button 
              onClick={() => setShowForm(true)} 
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus size={16} className="mr-2" />
              Add First Stat
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
