'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Trash2 } from 'lucide-react'

export default function ContactsManager({ initialContacts }: { initialContacts: any[] }) {
  const router = useRouter()
  const [contacts] = useState(initialContacts)

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this message?')) return
    
    const supabase = createClient()
    await supabase.from('contact_submissions').delete().eq('id', id)
    router.refresh()
  }

  const handleUpdateStatus = async (id: number, status: string) => {
    const supabase = createClient()
    await supabase.from('contact_submissions').update({ status }).eq('id', id)
    router.refresh()
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <p className="text-gray-600 mt-1">View and manage contact form submissions</p>
      </div>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <Card key={contact.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{contact.name}</h3>
                  <div className="flex gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Mail size={14} />
                      {contact.email}
                    </span>
                    {contact.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={14} />
                        {contact.phone}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={contact.status}
                    onChange={(e) => handleUpdateStatus(contact.id, e.target.value)}
                    className="px-3 py-1 border rounded text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="replied">Replied</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(contact.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              {contact.subject && (
                <div className="mb-2">
                  <span className="text-sm font-semibold">Subject:</span> {contact.subject}
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{contact.message}</p>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Received: {new Date(contact.created_at).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}

        {contacts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center text-gray-500">
              No contact messages yet
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
