'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Save, Megaphone, Calendar, GraduationCap, Phone } from 'lucide-react'

interface CTAData {
  id?: number
  badge_text: string
  heading: string
  highlight_text: string
  description: string
  classes_info: string
  start_date: string
  button_text: string
  button_link: string
  phone: string
  is_active: boolean
}

interface Props {
  initialData: CTAData | null
}

export default function CTABannerManager({ initialData }: Props) {
  const [data, setData] = useState<CTAData>(initialData || {
    badge_text: 'Admissions Open 2025-26',
    heading: 'Give Your Child the',
    highlight_text: 'Best Start',
    description: 'Join our community of learners and discover how Hilltop can shape your child\'s future with quality education and values.',
    classes_info: 'Nursery to Class 12',
    start_date: 'March 2025',
    button_text: 'Apply Now',
    button_link: '/admissions',
    phone: '+919876543210',
    is_active: true
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const updateField = (field: keyof CTAData, value: any) => {
    setData({ ...data, [field]: value })
  }

  const save = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      
      if (data.id) {
        await supabase.from('cta_banner').update(data).eq('id', data.id)
      } else {
        const { data: newData } = await supabase.from('cta_banner').insert(data).select().single()
        if (newData) setData(newData)
      }
      
      setMessage('CTA Banner saved successfully!')
    } catch (error) {
      setMessage('Error saving CTA Banner')
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">CTA Banner Manager</h2>
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
      <div className="mb-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white">
        <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-4 text-sm">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          {data.badge_text}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          {data.heading} <span className="text-yellow-300">{data.highlight_text}</span> in Life
        </h3>
        <p className="text-green-100 mb-4 max-w-xl">{data.description}</p>
        <div className="flex gap-4 text-sm text-white/80">
          <span className="flex items-center gap-2"><Calendar size={16} /> {data.start_date}</span>
          <span className="flex items-center gap-2"><GraduationCap size={16} /> {data.classes_info}</span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
            <input
              type="text"
              value={data.badge_text}
              onChange={(e) => updateField('badge_text', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Admissions Open 2025-26"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
            <input
              type="text"
              value={data.heading}
              onChange={(e) => updateField('heading', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Give Your Child the"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Highlight Text (colored)</label>
            <input
              type="text"
              value={data.highlight_text}
              onChange={(e) => updateField('highlight_text', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Best Start"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Classes Info</label>
            <input
              type="text"
              value={data.classes_info}
              onChange={(e) => updateField('classes_info', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Nursery to Class 12"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="text"
              value={data.start_date}
              onChange={(e) => updateField('start_date', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="March 2025"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={data.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="+919876543210"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
            <input
              type="text"
              value={data.button_text}
              onChange={(e) => updateField('button_text', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Apply Now"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
            <input
              type="text"
              value={data.button_link}
              onChange={(e) => updateField('button_link', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="/admissions"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Description text..."
            />
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.is_active}
              onChange={(e) => updateField('is_active', e.target.checked)}
              className="w-4 h-4 text-green-600"
            />
            <label className="text-sm text-gray-700">Active</label>
          </div>
        </div>
      </div>
    </div>
  )
}
