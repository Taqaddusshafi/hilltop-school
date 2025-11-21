'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit, Trash2, X, Download, ExternalLink } from 'lucide-react'

interface StudentsPageManagerProps {
  pageData: any
  downloads: any[]
  elibraryResources: any[]
  achievements: any[]
  alumniStats: any[]
}

export default function StudentsPageManager({
  pageData,
  downloads,
  elibraryResources,
  achievements,
  alumniStats
}: StudentsPageManagerProps) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('page')
  const [loading, setLoading] = useState(false)

  // Page Content State - FIXED null handling
  const [pageForm, setPageForm] = useState({
    hero_title: pageData?.hero_title || '',
    hero_subtitle: pageData?.hero_subtitle || '',
    downloads_heading: pageData?.downloads_heading || '',
    elibrary_heading: pageData?.elibrary_heading || '',
    elibrary_description: pageData?.elibrary_description || '',
    achievements_heading: pageData?.achievements_heading || '',
    alumni_heading: pageData?.alumni_heading || '',
    alumni_description: pageData?.alumni_description || '',
  })

  // Downloads State
  const [showDownloadForm, setShowDownloadForm] = useState(false)
  const [editingDownload, setEditingDownload] = useState<number | null>(null)
  const [downloadForm, setDownloadForm] = useState({
    title: '',
    category: '',
    file_size: '',
    file_url: '',
  })

  // E-Library State
  const [showElibraryForm, setShowElibraryForm] = useState(false)
  const [editingElibrary, setEditingElibrary] = useState<number | null>(null)
  const [elibraryForm, setElibraryForm] = useState({
    title: '',
    description: '',
    icon_name: 'Book',
    link_url: '',
  })

  // Achievements State
  const [showAchievementForm, setShowAchievementForm] = useState(false)
  const [editingAchievement, setEditingAchievement] = useState<number | null>(null)
  const [achievementForm, setAchievementForm] = useState({
    student_name: '',
    class: '',
    achievement: '',
    year: new Date().getFullYear().toString(),
    photo_url: '',
  })

  // Alumni Stats State
  const [showStatForm, setShowStatForm] = useState(false)
  const [editingStat, setEditingStat] = useState<number | null>(null)
  const [statForm, setStatForm] = useState({
    stat_value: '',
    stat_label: '',
  })

  // Update Page Content
  const handlePageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('students_page')
        .update(pageForm)
        .eq('id', pageData.id)
      
      if (error) throw error
      router.refresh()
      alert('Page content updated!')
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Downloads CRUD
  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const supabase = createClient()
      if (editingDownload) {
        await supabase.from('student_downloads').update(downloadForm).eq('id', editingDownload)
      } else {
        await supabase.from('student_downloads').insert([downloadForm])
      }
      router.refresh()
      setShowDownloadForm(false)
      setEditingDownload(null)
      resetDownloadForm()
      alert('Download saved!')
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteDownload = async (id: number) => {
    if (!confirm('Delete this download?')) return
    try {
      const supabase = createClient()
      await supabase.from('student_downloads').delete().eq('id', id)
      router.refresh()
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    }
  }

  // FIXED: Handle null values when editing
  const handleEditDownload = (item: any) => {
    setDownloadForm({
      title: item.title || '',
      category: item.category || '',
      file_size: item.file_size || '',
      file_url: item.file_url || '',
    })
    setEditingDownload(item.id)
    setShowDownloadForm(true)
  }

  const resetDownloadForm = () => {
    setDownloadForm({ title: '', category: '', file_size: '', file_url: '' })
  }

  // E-Library CRUD
  const handleElibrarySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const supabase = createClient()
      if (editingElibrary) {
        await supabase.from('elibrary_resources').update(elibraryForm).eq('id', editingElibrary)
      } else {
        await supabase.from('elibrary_resources').insert([elibraryForm])
      }
      router.refresh()
      setShowElibraryForm(false)
      setEditingElibrary(null)
      resetElibraryForm()
      alert('Resource saved!')
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteElibrary = async (id: number) => {
    if (!confirm('Delete this resource?')) return
    try {
      const supabase = createClient()
      await supabase.from('elibrary_resources').delete().eq('id', id)
      router.refresh()
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    }
  }

  // FIXED: Handle null values when editing
  const handleEditElibrary = (item: any) => {
    setElibraryForm({
      title: item.title || '',
      description: item.description || '',
      icon_name: item.icon_name || 'Book',
      link_url: item.link_url || '',
    })
    setEditingElibrary(item.id)
    setShowElibraryForm(true)
  }

  const resetElibraryForm = () => {
    setElibraryForm({ title: '', description: '', icon_name: 'Book', link_url: '' })
  }

  // Achievements CRUD
  const handleAchievementSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const supabase = createClient()
      if (editingAchievement) {
        await supabase.from('student_achievements').update(achievementForm).eq('id', editingAchievement)
      } else {
        await supabase.from('student_achievements').insert([achievementForm])
      }
      router.refresh()
      setShowAchievementForm(false)
      setEditingAchievement(null)
      resetAchievementForm()
      alert('Achievement saved!')
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAchievement = async (id: number) => {
    if (!confirm('Delete this achievement?')) return
    try {
      const supabase = createClient()
      await supabase.from('student_achievements').delete().eq('id', id)
      router.refresh()
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    }
  }

  // FIXED: Handle null values when editing
  const handleEditAchievement = (item: any) => {
    setAchievementForm({
      student_name: item.student_name || '',
      class: item.class || '',
      achievement: item.achievement || '',
      year: item.year || new Date().getFullYear().toString(),
      photo_url: item.photo_url || '',
    })
    setEditingAchievement(item.id)
    setShowAchievementForm(true)
  }

  const resetAchievementForm = () => {
    setAchievementForm({
      student_name: '',
      class: '',
      achievement: '',
      year: new Date().getFullYear().toString(),
      photo_url: '',
    })
  }

  // Alumni Stats CRUD
  const handleStatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const supabase = createClient()
      if (editingStat) {
        await supabase.from('alumni_stats').update(statForm).eq('id', editingStat)
      } else {
        await supabase.from('alumni_stats').insert([statForm])
      }
      router.refresh()
      setShowStatForm(false)
      setEditingStat(null)
      resetStatForm()
      alert('Stat saved!')
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteStat = async (id: number) => {
    if (!confirm('Delete this stat?')) return
    try {
      const supabase = createClient()
      await supabase.from('alumni_stats').delete().eq('id', id)
      router.refresh()
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    }
  }

  // FIXED: Handle null values when editing
  const handleEditStat = (item: any) => {
    setStatForm({
      stat_value: item.stat_value || '',
      stat_label: item.stat_label || '',
    })
    setEditingStat(item.id)
    setShowStatForm(true)
  }

  const resetStatForm = () => {
    setStatForm({ stat_value: '', stat_label: '' })
  }

  const sections = [
    { id: 'page', label: 'Page Content' },
    { id: 'downloads', label: `Downloads (${downloads.length})` },
    { id: 'elibrary', label: `E-Library (${elibraryResources.length})` },
    { id: 'achievements', label: `Achievements (${achievements.length})` },
    { id: 'alumni', label: `Alumni Stats (${alumniStats.length})` },
  ]

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex gap-2 border-b overflow-x-auto pb-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-t-lg font-medium whitespace-nowrap transition ${
              activeSection === section.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Page Content Section */}
      {activeSection === 'page' && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-bold mb-4">Page Content</h3>
            <form onSubmit={handlePageSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Hero Title *</Label>
                  <Input
                    value={pageForm.hero_title}
                    onChange={(e) => setPageForm({ ...pageForm, hero_title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Hero Subtitle *</Label>
                  <Input
                    value={pageForm.hero_subtitle}
                    onChange={(e) => setPageForm({ ...pageForm, hero_subtitle: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Downloads Heading *</Label>
                  <Input
                    value={pageForm.downloads_heading}
                    onChange={(e) => setPageForm({ ...pageForm, downloads_heading: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>E-Library Heading *</Label>
                  <Input
                    value={pageForm.elibrary_heading}
                    onChange={(e) => setPageForm({ ...pageForm, elibrary_heading: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Achievements Heading *</Label>
                  <Input
                    value={pageForm.achievements_heading}
                    onChange={(e) => setPageForm({ ...pageForm, achievements_heading: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label>E-Library Description *</Label>
                <Textarea
                  value={pageForm.elibrary_description}
                  onChange={(e) => setPageForm({ ...pageForm, elibrary_description: e.target.value })}
                  rows={2}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Alumni Heading *</Label>
                  <Input
                    value={pageForm.alumni_heading}
                    onChange={(e) => setPageForm({ ...pageForm, alumni_heading: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Alumni Description *</Label>
                  <Input
                    value={pageForm.alumni_description}
                    onChange={(e) => setPageForm({ ...pageForm, alumni_description: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                {loading ? 'Updating...' : 'Update Page Content'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Downloads Section */}
      {activeSection === 'downloads' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Student Downloads</h3>
            <Button onClick={() => setShowDownloadForm(!showDownloadForm)} className="bg-green-600 hover:bg-green-700">
              {showDownloadForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
              {showDownloadForm ? 'Cancel' : 'Add Download'}
            </Button>
          </div>

          {showDownloadForm && (
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleDownloadSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title *</Label>
                      <Input
                        value={downloadForm.title}
                        onChange={(e) => setDownloadForm({ ...downloadForm, title: e.target.value })}
                        placeholder="Class Timetable"
                        required
                      />
                    </div>
                    <div>
                      <Label>Category *</Label>
                      <Input
                        value={downloadForm.category}
                        onChange={(e) => setDownloadForm({ ...downloadForm, category: e.target.value })}
                        placeholder="Academic"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>File Size *</Label>
                      <Input
                        value={downloadForm.file_size}
                        onChange={(e) => setDownloadForm({ ...downloadForm, file_size: e.target.value })}
                        placeholder="245 KB"
                        required
                      />
                    </div>
                    <div>
                      <Label>File URL (Google Drive/Dropbox) *</Label>
                      <Input
                        value={downloadForm.file_url}
                        onChange={(e) => setDownloadForm({ ...downloadForm, file_url: e.target.value })}
                        placeholder="https://drive.google.com/file/d/..."
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
                    <p className="font-semibold text-blue-900 mb-1">💡 How to get Google Drive link:</p>
                    <ol className="text-blue-800 space-y-1 ml-4 list-decimal">
                      <li>Upload file to Google Drive</li>
                      <li>Right-click → Share → Change to "Anyone with the link"</li>
                      <li>Click "Copy link" and paste here</li>
                    </ol>
                  </div>

                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                    {loading ? 'Saving...' : editingDownload ? 'Update' : 'Add'} Download
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {downloads.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Download size={18} className="text-green-600" />
                        <h4 className="font-semibold">{item.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{item.category} • {item.file_size}</p>
                      {item.file_url && (
                        <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1">
                          <ExternalLink size={12} /> View File
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditDownload(item)}>
                        <Edit size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteDownload(item.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* E-Library Section */}
      {activeSection === 'elibrary' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">E-Library Resources</h3>
            <Button onClick={() => setShowElibraryForm(!showElibraryForm)} className="bg-green-600 hover:bg-green-700">
              {showElibraryForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
              {showElibraryForm ? 'Cancel' : 'Add Resource'}
            </Button>
          </div>

          {showElibraryForm && (
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleElibrarySubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title *</Label>
                      <Input
                        value={elibraryForm.title}
                        onChange={(e) => setElibraryForm({ ...elibraryForm, title: e.target.value })}
                        placeholder="Study Notes"
                        required
                      />
                    </div>
                    <div>
                      <Label>Icon</Label>
                      <select
                        value={elibraryForm.icon_name}
                        onChange={(e) => setElibraryForm({ ...elibraryForm, icon_name: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="Book">Book</option>
                        <option value="FileText">FileText</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label>Description *</Label>
                    <Textarea
                      value={elibraryForm.description}
                      onChange={(e) => setElibraryForm({ ...elibraryForm, description: e.target.value })}
                      placeholder="Chapter-wise notes for all subjects"
                      rows={2}
                      required
                    />
                  </div>

                  <div>
                    <Label>Link URL (Google Drive folder/website)</Label>
                    <Input
                      value={elibraryForm.link_url}
                      onChange={(e) => setElibraryForm({ ...elibraryForm, link_url: e.target.value })}
                      placeholder="https://drive.google.com/drive/folders/..."
                    />
                  </div>

                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                    {loading ? 'Saving...' : editingElibrary ? 'Update' : 'Add'} Resource
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {elibraryResources.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  {item.link_url && (
                    <a href={item.link_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-3">
                      <ExternalLink size={12} /> Visit Link
                    </a>
                  )}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditElibrary(item)} className="flex-1">
                      <Edit size={14} />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteElibrary(item.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Achievements Section */}
      {activeSection === 'achievements' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Student Achievements</h3>
            <Button onClick={() => setShowAchievementForm(!showAchievementForm)} className="bg-green-600 hover:bg-green-700">
              {showAchievementForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
              {showAchievementForm ? 'Cancel' : 'Add Achievement'}
            </Button>
          </div>

          {showAchievementForm && (
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleAchievementSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Student Name *</Label>
                      <Input
                        value={achievementForm.student_name}
                        onChange={(e) => setAchievementForm({ ...achievementForm, student_name: e.target.value })}
                        placeholder="Aamir Hussain"
                        required
                      />
                    </div>
                    <div>
                      <Label>Class *</Label>
                      <Input
                        value={achievementForm.class}
                        onChange={(e) => setAchievementForm({ ...achievementForm, class: e.target.value })}
                        placeholder="Class 12"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Achievement *</Label>
                      <Input
                        value={achievementForm.achievement}
                        onChange={(e) => setAchievementForm({ ...achievementForm, achievement: e.target.value })}
                        placeholder="State Topper in Science"
                        required
                      />
                    </div>
                    <div>
                      <Label>Year *</Label>
                      <Input
                        value={achievementForm.year}
                        onChange={(e) => setAchievementForm({ ...achievementForm, year: e.target.value })}
                        placeholder="2024"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Photo URL (Optional)</Label>
                    <Input
                      value={achievementForm.photo_url}
                      onChange={(e) => setAchievementForm({ ...achievementForm, photo_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                    {loading ? 'Saving...' : editingAchievement ? 'Update' : 'Add'} Achievement
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {achievements.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">{item.student_name}</h4>
                      <p className="text-sm text-gray-600">{item.class}</p>
                      <p className="text-gray-800 mt-1">{item.achievement}</p>
                      <p className="text-sm text-green-600 mt-1">{item.year}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditAchievement(item)}>
                        <Edit size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteAchievement(item.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Alumni Stats Section */}
      {activeSection === 'alumni' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Alumni Statistics</h3>
            <Button onClick={() => setShowStatForm(!showStatForm)} className="bg-green-600 hover:bg-green-700">
              {showStatForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
              {showStatForm ? 'Cancel' : 'Add Stat'}
            </Button>
          </div>

          {showStatForm && (
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleStatSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Value *</Label>
                      <Input
                        value={statForm.stat_value}
                        onChange={(e) => setStatForm({ ...statForm, stat_value: e.target.value })}
                        placeholder="500+"
                        required
                      />
                    </div>
                    <div>
                      <Label>Label *</Label>
                      <Input
                        value={statForm.stat_label}
                        onChange={(e) => setStatForm({ ...statForm, stat_label: e.target.value })}
                        placeholder="Alumni Worldwide"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                    {loading ? 'Saving...' : editingStat ? 'Update' : 'Add'} Stat
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {alumniStats.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-green-600 mb-1">{item.stat_value}</p>
                  <p className="text-sm text-gray-600 mb-3">{item.stat_label}</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline" onClick={() => handleEditStat(item)}>
                      <Edit size={14} />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteStat(item.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
