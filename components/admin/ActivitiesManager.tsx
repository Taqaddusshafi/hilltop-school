'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Save, Trophy, Palette, Music, Target, Heart, Users, GripVertical } from 'lucide-react'

// Sports Categories
interface SportsCategory {
  id?: number
  category_name: string
  icon_name: string
  display_order: number
  is_active: boolean
  sports?: Sport[]
}

interface Sport {
  id?: number
  sport_name: string
  category_id?: number
  display_order: number
  is_active: boolean
}

// Arts Categories
interface ArtsCategory {
  id?: number
  category_name: string
  icon_name: string
  display_order: number
  is_active: boolean
  arts?: Art[]
}

interface Art {
  id?: number
  art_name: string
  category_id?: number
  display_order: number
  is_active: boolean
}

// Clubs
interface Club {
  id?: number
  club_name: string
  description: string
  icon_name: string
  members: string
  display_order: number
  is_active: boolean
}

// Annual Events
interface AnnualEvent {
  id?: number
  event_name: string
  event_month: string
  description: string
  highlight: boolean
  display_order: number
  is_active: boolean
}

const iconOptions = ['Trophy', 'Palette', 'Music', 'Target', 'Heart', 'Users']

interface Props {
  sportsCategories: SportsCategory[]
  artsCategories: ArtsCategory[]
  clubs: Club[]
  events: AnnualEvent[]
}

export default function ActivitiesManager({ sportsCategories: initSports, artsCategories: initArts, clubs: initClubs, events: initEvents }: Props) {
  const [tab, setTab] = useState<'clubs' | 'events'>('clubs')
  const [clubs, setClubs] = useState<Club[]>(initClubs || [])
  const [events, setEvents] = useState<AnnualEvent[]>(initEvents || [])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Clubs management
  const addClub = () => {
    setClubs([...clubs, { club_name: '', description: '', icon_name: 'Trophy', members: '', display_order: clubs.length, is_active: true }])
  }

  const updateClub = (index: number, field: keyof Club, value: any) => {
    const updated = [...clubs]
    updated[index] = { ...updated[index], [field]: value }
    setClubs(updated)
  }

  const deleteClub = async (index: number) => {
    const item = clubs[index]
    if (item.id) {
      const supabase = createClient()
      await supabase.from('clubs').delete().eq('id', item.id)
    }
    setClubs(clubs.filter((_, i) => i !== index))
  }

  // Events management
  const addEvent = () => {
    setEvents([...events, { event_name: '', event_month: '', description: '', highlight: false, display_order: events.length, is_active: true }])
  }

  const updateEvent = (index: number, field: keyof AnnualEvent, value: any) => {
    const updated = [...events]
    updated[index] = { ...updated[index], [field]: value }
    setEvents(updated)
  }

  const deleteEvent = async (index: number) => {
    const item = events[index]
    if (item.id) {
      const supabase = createClient()
      await supabase.from('annual_events').delete().eq('id', item.id)
    }
    setEvents(events.filter((_, i) => i !== index))
  }

  const saveAll = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      
      // Save clubs
      for (let i = 0; i < clubs.length; i++) {
        const item = { ...clubs[i], display_order: i }
        if (item.id) {
          await supabase.from('clubs').update(item).eq('id', item.id)
        } else {
          const { data } = await supabase.from('clubs').insert(item).select().single()
          if (data) clubs[i] = data
        }
      }
      
      // Save events
      for (let i = 0; i < events.length; i++) {
        const item = { ...events[i], display_order: i }
        if (item.id) {
          await supabase.from('annual_events').update(item).eq('id', item.id)
        } else {
          const { data } = await supabase.from('annual_events').insert(item).select().single()
          if (data) events[i] = data
        }
      }
      
      setClubs([...clubs])
      setEvents([...events])
      setMessage('Activities saved successfully!')
    } catch (error) {
      setMessage('Error saving activities')
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Activities Manager</h2>
        <Button onClick={saveAll} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
          <Save size={18} className="mr-2" /> {loading ? 'Saving...' : 'Save All'}
        </Button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      {/* Sub-tabs */}
      <div className="flex gap-2 mb-6">
        {['clubs', 'events'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-4 py-2 rounded-lg font-medium capitalize ${tab === t ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Clubs */}
      {tab === 'clubs' && (
        <div>
          <Button onClick={addClub} className="mb-4 bg-green-600 hover:bg-green-700">
            <Plus size={18} className="mr-2" /> Add Club
          </Button>
          
          <div className="space-y-4">
            {clubs.map((club, index) => (
              <div key={index} className="bg-white border rounded-xl p-4 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Club Name</label>
                    <input
                      type="text"
                      value={club.club_name || ''}
                      onChange={(e) => updateClub(index, 'club_name', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Science Club"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <select
                      value={club.icon_name || 'Trophy'}
                      onChange={(e) => updateClub(index, 'icon_name', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      {iconOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Members</label>
                    <input
                      type="text"
                      value={club.members || ''}
                      onChange={(e) => updateClub(index, 'members', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="50+"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => deleteClub(index)} className="text-red-600">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                  <div className="md:col-span-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                      type="text"
                      value={club.description || ''}
                      onChange={(e) => updateClub(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Description..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Events */}
      {tab === 'events' && (
        <div>
          <Button onClick={addEvent} className="mb-4 bg-green-600 hover:bg-green-700">
            <Plus size={18} className="mr-2" /> Add Event
          </Button>
          
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="bg-white border rounded-xl p-4 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                    <input
                      type="text"
                      value={event.event_name || ''}
                      onChange={(e) => updateEvent(index, 'event_name', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Annual Sports Day"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                    <input
                      type="text"
                      value={event.event_month || ''}
                      onChange={(e) => updateEvent(index, 'event_month', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="September"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      checked={event.highlight || false}
                      onChange={(e) => updateEvent(index, 'highlight', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label className="text-sm text-gray-700">Highlight</label>
                  </div>
                  <div className="flex items-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => deleteEvent(index)} className="text-red-600">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                  <div className="md:col-span-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                      type="text"
                      value={event.description || ''}
                      onChange={(e) => updateEvent(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Description..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
