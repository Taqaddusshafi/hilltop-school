'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Save, User, Upload } from 'lucide-react'

interface PrincipalData {
  id?: number
  badge_text: string
  heading: string
  highlight_text: string
  quote_text: string
  message_text: string
  principal_name: string
  principal_title: string
  principal_initials: string
  photo_url: string
  experience_years: string
  alumni_count: string
  awards_count: string
  is_active: boolean
}

interface Props {
  initialData: PrincipalData | null
}

export default function PrincipalManager({ initialData }: Props) {
  const [data, setData] = useState<PrincipalData>(initialData || {
    badge_text: "From the Principal's Desk",
    heading: 'A Message of',
    highlight_text: 'Hope & Excellence',
    quote_text: 'At Hilltop Educational Institute, we believe every child is blessed with unique talents and potential.',
    message_text: 'For over two decades, we have been committed to providing an education that goes beyond textbooks.',
    principal_name: 'Mohammad Hussain',
    principal_title: 'Principal, Hilltop Educational Institute',
    principal_initials: 'MH',
    photo_url: '',
    experience_years: '25+',
    alumni_count: '10K+',
    awards_count: '100+',
    is_active: true
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const updateField = (field: keyof PrincipalData, value: any) => {
    setData({ ...data, [field]: value })
  }

  const save = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      
      if (data.id) {
        await supabase.from('principal_message').update(data).eq('id', data.id)
      } else {
        const { data: newData } = await supabase.from('principal_message').insert(data).select().single()
        if (newData) setData(newData)
      }
      
      setMessage('Principal message saved successfully!')
    } catch (error) {
      setMessage('Error saving principal message')
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Principal Message Manager</h2>
        <Button onClick={save} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
          <Save size={18} className="mr-2" /> {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      {/* Preview */}
      <div className="mb-8 bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-6 border border-gray-200">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {data.photo_url ? (
              <img src={data.photo_url} alt={data.principal_name} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              data.principal_initials || 'MH'
            )}
          </div>
          <div>
            <p className="text-sm text-green-600 font-semibold mb-2">{data.badge_text}</p>
            <h3 className="text-xl font-bold text-gray-900">{data.heading} <span className="text-green-600">{data.highlight_text}</span></h3>
            <p className="text-gray-600 italic mt-2">"{data.quote_text?.substring(0, 100)}..."</p>
            <p className="font-semibold mt-4">{data.principal_name}</p>
            <p className="text-sm text-gray-500">{data.principal_title}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User size={18} className="text-green-600" />
            Principal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={data.principal_name || ''}
                onChange={(e) => updateField('principal_name', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Mohammad Hussain"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={data.principal_title || ''}
                onChange={(e) => updateField('principal_title', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Principal, Hilltop Educational Institute"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Initials</label>
              <input
                type="text"
                value={data.principal_initials || ''}
                onChange={(e) => updateField('principal_initials', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="MH"
                maxLength={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
              <input
                type="url"
                value={data.photo_url || ''}
                onChange={(e) => updateField('photo_url', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Section Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
              <input
                type="text"
                value={data.badge_text || ''}
                onChange={(e) => updateField('badge_text', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="From the Principal's Desk"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                type="text"
                value={data.heading || ''}
                onChange={(e) => updateField('heading', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="A Message of"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Highlight Text</label>
              <input
                type="text"
                value={data.highlight_text || ''}
                onChange={(e) => updateField('highlight_text', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Hope & Excellence"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Quote Text</label>
            <textarea
              value={data.quote_text || ''}
              onChange={(e) => updateField('quote_text', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Main quote..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message Text</label>
            <textarea
              value={data.message_text || ''}
              onChange={(e) => updateField('message_text', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Additional message..."
            />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience Years</label>
              <input
                type="text"
                value={data.experience_years || ''}
                onChange={(e) => updateField('experience_years', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="25+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alumni Count</label>
              <input
                type="text"
                value={data.alumni_count || ''}
                onChange={(e) => updateField('alumni_count', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="10K+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Awards Count</label>
              <input
                type="text"
                value={data.awards_count || ''}
                onChange={(e) => updateField('awards_count', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="100+"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
