'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'

interface AboutPageManagerProps {
  initialData: any
  principalData: any
}

export default function AboutPageManager({ initialData, principalData }: AboutPageManagerProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    hero_title: initialData?.hero_title || '',
    hero_subtitle: initialData?.hero_subtitle || '',
    legacy_heading: initialData?.legacy_heading || '',
    legacy_content: initialData?.legacy_content || '',
  })

  const [principalForm, setPrincipalForm] = useState({
    heading: principalData?.heading || "Principal's Message",
    message: principalData?.message || '',
    principal_name: principalData?.principal_name || '',
    principal_title: principalData?.principal_title || '',
    principal_image_url: principalData?.principal_image_url || '',
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(principalData?.principal_image_url || null)
  const [loading, setLoading] = useState(false)
  const [principalLoading, setPrincipalLoading] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [principalSuccess, setPrincipalSuccess] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

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
        setFormData({
          hero_title: initialData?.hero_title || '',
          hero_subtitle: initialData?.hero_subtitle || '',
          legacy_heading: initialData?.legacy_heading || '',
          legacy_content: initialData?.legacy_content || '',
        })
      } else {
        setSaveSuccess(true)
        router.refresh()
        setTimeout(() => setSaveSuccess(false), 3000)
      }
    } catch (error) {
      console.error('Error updating about page:', error)
      alert('Failed to update about page. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePrincipalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPrincipalLoading(true)
    setPrincipalSuccess(false)

    try {
      const supabase = createClient()
      let imageUrl = principalForm.principal_image_url

      // Upload image if a new file is selected
      if (imageFile) {
        setUploadProgress(10)
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `principal-${Date.now()}.${fileExt}`
        const filePath = `principal/${fileName}`

        setUploadProgress(50)
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, imageFile)

        if (uploadError) {
          console.error('Error uploading image:', uploadError)
          alert('Failed to upload image. Please try again.')
          setPrincipalLoading(false)
          return
        }

        setUploadProgress(75)
        const { data: urlData } = supabase.storage
          .from('images')
          .getPublicUrl(filePath)

        imageUrl = urlData.publicUrl
        setUploadProgress(100)
      }

      const updateData = {
        ...principalForm,
        principal_image_url: imageUrl
      }

      let error
      if (principalData?.id) {
        // Update existing record
        const result = await supabase
          .from('principal_message')
          .update(updateData)
          .eq('id', principalData.id)
        error = result.error
      } else {
        // Insert new record
        const result = await supabase
          .from('principal_message')
          .insert([{ ...updateData, is_active: true }])
        error = result.error
      }

      if (error) {
        console.error('Error updating principal message:', error)
        alert('Failed to update principal message. Please try again.')
      } else {
        setPrincipalSuccess(true)
        router.refresh()
        setTimeout(() => setPrincipalSuccess(false), 3000)
        setImageFile(null)
        setUploadProgress(0)
      }
    } catch (error) {
      console.error('Error updating principal message:', error)
      alert('Failed to update principal message. Please try again.')
    } finally {
      setPrincipalLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setSaveSuccess(false)
  }

  const handlePrincipalChange = (field: string, value: string) => {
    setPrincipalForm(prev => ({ ...prev, [field]: value }))
    setPrincipalSuccess(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setPrincipalForm(prev => ({ ...prev, principal_image_url: '' }))
  }

  return (
    <div className="space-y-8">
      {/* About Page Content */}
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
                  <span className="text-green-600 font-medium flex items-center gap-2">
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
      </div>

      {/* Principal's Message */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Principal's Message</h2>
          <p className="text-gray-600 mt-1">Manage principal information and message</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handlePrincipalSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <Label>Principal's Photo</Label>
                <div className="mt-2 flex items-start gap-4">
                  {imagePreview ? (
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image
                        src={imagePreview}
                        alt="Principal preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                      <Upload className="text-gray-400" size={32} />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mb-2"
                    />
                    <p className="text-sm text-gray-500">
                      Recommended: Square image, max 5MB (JPG, PNG, WebP)
                    </p>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Uploading... {uploadProgress}%</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="principal_heading">Section Heading *</Label>
                <Input
                  id="principal_heading"
                  value={principalForm.heading}
                  onChange={(e) => handlePrincipalChange('heading', e.target.value)}
                  placeholder="Principal's Message"
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="principal_name">Principal's Name *</Label>
                  <Input
                    id="principal_name"
                    value={principalForm.principal_name}
                    onChange={(e) => handlePrincipalChange('principal_name', e.target.value)}
                    placeholder="Dr. Mohammad Ashraf"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="principal_title">Principal's Title *</Label>
                  <Input
                    id="principal_title"
                    value={principalForm.principal_title}
                    onChange={(e) => handlePrincipalChange('principal_title', e.target.value)}
                    placeholder="Principal, Hilltop Educational Institute"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="principal_message">Message *</Label>
                <p className="text-sm text-gray-500 mb-2">
                  Use \n for line breaks and \n\n for paragraph breaks
                </p>
                <Textarea
                  id="principal_message"
                  value={principalForm.message}
                  onChange={(e) => handlePrincipalChange('message', e.target.value)}
                  rows={10}
                  placeholder="Dear Students, Parents, and Well-wishers,\n\nIt gives me immense pleasure..."
                  required
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Character count: {principalForm.message.length}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700" 
                  disabled={principalLoading}
                >
                  {principalLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    'Update Principal Message'
                  )}
                </Button>

                {principalSuccess && (
                  <span className="text-green-600 font-medium flex items-center gap-2">
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
      </div>

      {/* Preview Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Principal's Message Preview</h3>
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl relative overflow-hidden shadow-lg flex-shrink-0">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Principal preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                    {principalForm.principal_name.charAt(0) || 'P'}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-4 whitespace-pre-line text-gray-800 leading-relaxed">
                  {principalForm.message.replace(/\\n/g, '\n') || 'No message yet'}
                </div>
                <div className="pt-4 border-t-2 border-green-200">
                  <p className="font-bold text-gray-900 text-xl">{principalForm.principal_name || 'Principal Name'}</p>
                  <p className="text-green-700 font-semibold">{principalForm.principal_title || 'Principal Title'}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
