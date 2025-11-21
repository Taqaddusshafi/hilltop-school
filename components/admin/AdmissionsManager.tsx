'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Trash2, GraduationCap } from 'lucide-react'

export default function AdmissionsManager({ initialAdmissions }: { initialAdmissions: any[] }) {
  const router = useRouter()
  const [admissions, setAdmissions] = useState(initialAdmissions)

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this application?')) return
    
    // Optimistic update: Remove from UI immediately
    setAdmissions(prev => prev.filter(app => app.id !== id))
    
    const supabase = createClient()
    const { error } = await supabase.from('admission_applications').delete().eq('id', id)
    
    if (error) {
      console.error('Error deleting admission:', error)
      // Rollback on error
      setAdmissions(initialAdmissions)
      alert('Failed to delete admission. Please try again.')
    } else {
      router.refresh()
    }
  }

  const handleUpdateStatus = async (id: number, status: string) => {
    // Optimistic update: Update UI immediately
    setAdmissions(prev => 
      prev.map(app => 
        app.id === id 
          ? { ...app, status } 
          : app
      )
    )
    
    const supabase = createClient()
    const { error } = await supabase
      .from('admission_applications')
      .update({ status })
      .eq('id', id)
    
    if (error) {
      console.error('Error updating status:', error)
      // Rollback on error
      setAdmissions(initialAdmissions)
      alert('Failed to update status. Please try again.')
    } else {
      router.refresh()
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Admission Applications</h2>
        <p className="text-gray-600 mt-1">Manage admission enquiries and applications</p>
      </div>

      <div className="space-y-4">
        {admissions.map((app) => (
          <Card key={app.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{app.student_name}</h3>
                    <p className="text-sm text-gray-600">Parent: {app.parent_name}</p>
                    <div className="flex gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail size={14} />
                        {app.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone size={14} />
                        {app.phone}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={app.status}
                    onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                    className="px-3 py-1 border rounded text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(app.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm font-semibold">Class Applying:</span>
                  <p className="text-gray-700">{app.class_applying}</p>
                </div>
                {app.previous_school && (
                  <div>
                    <span className="text-sm font-semibold">Previous School:</span>
                    <p className="text-gray-700">{app.previous_school}</p>
                  </div>
                )}
              </div>

              {app.message && (
                <div className="mt-4">
                  <span className="text-sm font-semibold">Message:</span>
                  <p className="text-gray-700 mt-1">{app.message}</p>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-3">
                Applied: {new Date(app.created_at).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}

        {admissions.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center text-gray-500">
              No admission applications yet
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
