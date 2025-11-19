'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      
      const { error: submitError } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          {
            email: email,
            status: 'active'
          }
        ])

      if (submitError) {
        // Check if email already exists
        if (submitError.code === '23505') {
          throw new Error('This email is already subscribed!')
        }
        throw submitError
      }

      setSubmitted(true)
      setEmail('')
      
      // Reset after 3 seconds
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to subscribe. Please try again.')
      console.error('Error subscribing to newsletter:', err)
      
      // Clear error after 3 seconds
      setTimeout(() => setError(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {submitted ? (
        <div className="text-center py-4 px-6 bg-green-100 text-green-700 rounded-lg">
          ✓ Successfully subscribed to newsletter!
        </div>
      ) : error ? (
        <div className="text-center py-4 px-6 bg-red-100 text-red-700 rounded-lg mb-4">
          {error}
        </div>
      ) : null}
      
      {!submitted && (
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
            {loading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </div>
      )}
    </form>
  )
}
