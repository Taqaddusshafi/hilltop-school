'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Save, Star, Quote, User } from 'lucide-react'

interface Testimonial {
  id?: number
  name: string
  role: string
  photo_url: string
  rating: number
  testimonial_text: string
  display_order: number
  is_active: boolean
}

interface Props {
  initialTestimonials: Testimonial[]
}

export default function TestimonialsManager({ initialTestimonials }: Props) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const addTestimonial = () => {
    const newItem: Testimonial = {
      name: '',
      role: '',
      photo_url: '',
      rating: 5,
      testimonial_text: '',
      display_order: testimonials.length,
      is_active: true
    }
    setTestimonials([...testimonials, newItem])
  }

  const updateTestimonial = (index: number, field: keyof Testimonial, value: any) => {
    const updated = [...testimonials]
    updated[index] = { ...updated[index], [field]: value }
    setTestimonials(updated)
  }

  const deleteTestimonial = async (index: number) => {
    const item = testimonials[index]
    if (item.id) {
      const supabase = createClient()
      await supabase.from('testimonials').delete().eq('id', item.id)
    }
    setTestimonials(testimonials.filter((_, i) => i !== index))
    setMessage('Testimonial deleted')
    setTimeout(() => setMessage(''), 3000)
  }

  const saveAll = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      
      for (let i = 0; i < testimonials.length; i++) {
        const item = { ...testimonials[i], display_order: i }
        
        if (item.id) {
          await supabase.from('testimonials').update(item).eq('id', item.id)
        } else {
          const { data } = await supabase.from('testimonials').insert(item).select().single()
          if (data) {
            testimonials[i] = data
          }
        }
      }
      
      setTestimonials([...testimonials])
      setMessage('All testimonials saved successfully!')
    } catch (error) {
      setMessage('Error saving testimonials')
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Testimonials Manager</h2>
        <div className="flex gap-3">
          <Button onClick={addTestimonial} className="bg-green-600 hover:bg-green-700">
            <Plus size={18} className="mr-2" /> Add Testimonial
          </Button>
          <Button onClick={saveAll} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
            <Save size={18} className="mr-2" /> {loading ? 'Saving...' : 'Save All'}
          </Button>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <div className="space-y-6">
        {testimonials.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                {item.photo_url ? (
                  <img src={item.photo_url} alt={item.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-green-600" />
                )}
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Dr. Farooq Ahmed"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    value={item.role}
                    onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Parent of Class 10 Student"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                  <input
                    type="url"
                    value={item.photo_url}
                    onChange={(e) => updateTestimonial(index, 'photo_url', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="https://..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => updateTestimonial(index, 'rating', star)}
                        className={`p-1 ${item.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        <Star size={24} fill={item.rating >= star ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Text</label>
                  <textarea
                    value={item.testimonial_text}
                    onChange={(e) => updateTestimonial(index, 'testimonial_text', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="What they said about the school..."
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.is_active}
                    onChange={(e) => updateTestimonial(index, 'is_active', e.target.checked)}
                    className="w-4 h-4 text-green-600"
                  />
                  <label className="text-sm text-gray-700">Active</label>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTestimonial(index)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Quote className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No testimonials yet. Click "Add Testimonial" to create one.</p>
        </div>
      )}
    </div>
  )
}
