'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Save, GripVertical, GraduationCap, Microscope, Palette, Code, Music, Users, BookOpen, Trophy, Target, Beaker } from 'lucide-react'

const iconOptions = [
  { name: 'GraduationCap', icon: GraduationCap },
  { name: 'Microscope', icon: Microscope },
  { name: 'Palette', icon: Palette },
  { name: 'Code', icon: Code },
  { name: 'Music', icon: Music },
  { name: 'Users', icon: Users },
  { name: 'BookOpen', icon: BookOpen },
  { name: 'Trophy', icon: Trophy },
  { name: 'Target', icon: Target },
  { name: 'Beaker', icon: Beaker },
]

interface Program {
  id?: number
  icon_name: string
  title: string
  grades: string
  description: string
  students_count: string
  display_order: number
  is_active: boolean
}

interface Props {
  initialPrograms: Program[]
}

export default function ProgramsManager({ initialPrograms }: Props) {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const addProgram = () => {
    const newProgram: Program = {
      icon_name: 'GraduationCap',
      title: '',
      grades: '',
      description: '',
      students_count: '',
      display_order: programs.length,
      is_active: true
    }
    setPrograms([...programs, newProgram])
  }

  const updateProgram = (index: number, field: keyof Program, value: any) => {
    const updated = [...programs]
    updated[index] = { ...updated[index], [field]: value }
    setPrograms(updated)
  }

  const deleteProgram = async (index: number) => {
    const program = programs[index]
    if (program.id) {
      const supabase = createClient()
      await supabase.from('programs').delete().eq('id', program.id)
    }
    setPrograms(programs.filter((_, i) => i !== index))
    setMessage('Program deleted')
    setTimeout(() => setMessage(''), 3000)
  }

  const saveAll = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      
      for (let i = 0; i < programs.length; i++) {
        const program = { ...programs[i], display_order: i }
        
        if (program.id) {
          await supabase.from('programs').update(program).eq('id', program.id)
        } else {
          const { data } = await supabase.from('programs').insert(program).select().single()
          if (data) {
            programs[i] = data
          }
        }
      }
      
      setPrograms([...programs])
      setMessage('All programs saved successfully!')
    } catch (error) {
      setMessage('Error saving programs')
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Programs Manager</h2>
        <div className="flex gap-3">
          <Button onClick={addProgram} className="bg-green-600 hover:bg-green-700">
            <Plus size={18} className="mr-2" /> Add Program
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

      <div className="space-y-4">
        {programs.map((program, index) => {
          const IconComponent = iconOptions.find(i => i.name === program.icon_name)?.icon || GraduationCap
          
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="cursor-move text-gray-400">
                  <GripVertical size={20} />
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <select
                      value={program.icon_name}
                      onChange={(e) => updateProgram(index, 'icon_name', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      {iconOptions.map(opt => (
                        <option key={opt.name} value={opt.name}>{opt.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={program.title}
                      onChange={(e) => updateProgram(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="Primary Education"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grades</label>
                    <input
                      type="text"
                      value={program.grades}
                      onChange={(e) => updateProgram(index, 'grades', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="Nursery - Class 5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Students Count</label>
                    <input
                      type="text"
                      value={program.students_count}
                      onChange={(e) => updateProgram(index, 'students_count', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="500+"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={program.description}
                      onChange={(e) => updateProgram(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="Description of the program..."
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={program.is_active}
                      onChange={(e) => updateProgram(index, 'is_active', e.target.checked)}
                      className="w-4 h-4 text-green-600"
                    />
                    <label className="text-sm text-gray-700">Active</label>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteProgram(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {programs.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <GraduationCap className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No programs yet. Click "Add Program" to create one.</p>
        </div>
      )}
    </div>
  )
}
