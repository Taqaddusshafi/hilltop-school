'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function AboutPageManager({ initialData }: { initialData: any }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    hero_title: initialData?.hero_title || '',
    hero_subtitle: initialData?.hero_subtitle || '',
    legacy_heading: initialData?.legacy_heading || '',
    legacy_content: initialData?.legacy_content || '',
  })
  const [loading, setLoading] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSaveSuccess(false)

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('about_page')
        .update(formData)
        .eq('id', initialData.id)

      if (error) {
        console.error('Error updating about page:', error)
        alert('Failed to update about page. Please try again.')
        // Rollback to initial data
        setFormData({
          hero_title: initialData?.hero_title || '',
          hero_subtitle: initialData?.hero_subtitle || '',
          legacy_heading: initialData?.legacy_heading || '',
          legacy_content: initialData?.legacy_content || '',
        })
      } else {
        setSaveSuccess(true)
        router.refresh()
        
        // Show success message and clear it after 3 seconds
        setTimeout(() => setSaveSuccess(false), 3000)
      }
    } catch (error) {
      console.error('Error updating about page:', error)
      alert('Failed to update about page. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setSaveSuccess(false) // Clear success message when editing
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">About Page Content</h2>
        <p className="text-gray-600 mt-1">Manage the main content for the About page</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hero_title">Hero Title *</Label>
                <Input
                  id="hero_title"
                  value={formData.hero_title}
                  onChange={(e) => handleInputChange('hero_title', e.target.value)}
                  placeholder="About Us"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="hero_subtitle">Hero Subtitle *</Label>
                <Input
                  id="hero_subtitle"
                  value={formData.hero_subtitle}
                  onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
                  placeholder="Empowering minds and building futures"
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="legacy_heading">Legacy Section Heading *</Label>
              <Input
                id="legacy_heading"
                value={formData.legacy_heading}
                onChange={(e) => handleInputChange('legacy_heading', e.target.value)}
                placeholder="Our Legacy"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="legacy_content">Legacy Content *</Label>
              <p className="text-sm text-gray-500 mb-2">
                Use \n for line breaks and \n\n for paragraph breaks
              </p>
              <Textarea
                id="legacy_content"
                value={formData.legacy_content}
                onChange={(e) => handleInputChange('legacy_content', e.target.value)}
                rows={8}
                placeholder="Hilltop Educational Institute was established in 1995...\n\nOver the years, we have grown..."
                required
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Character count: {formData.legacy_content.length}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Update About Page'
                )}
              </Button>

              {saveSuccess && (
                <span className="text-green-600 font-medium flex items-center gap-2 animate-fade-in">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Successfully updated!
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Hero Title</p>
              <p className="text-2xl font-bold text-gray-900">{formData.hero_title || 'No title yet'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Hero Subtitle</p>
              <p className="text-lg text-gray-700">{formData.hero_subtitle || 'No subtitle yet'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Legacy Heading</p>
              <p className="text-xl font-bold text-gray-900">{formData.legacy_heading || 'No heading yet'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Legacy Content</p>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {formData.legacy_content ? 
                  formData.legacy_content.replace(/\\n/g, '\n') : 
                  'No content yet'
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
