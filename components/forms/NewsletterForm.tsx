
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setEmail('')
      
      // Reset after 3 seconds
      setTimeout(() => setSubmitted(false), 3000)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {submitted ? (
        <div className="text-center py-4 px-6 bg-green-100 text-green-700 rounded-lg">
          ✓ Successfully subscribed to newsletter!
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </div>
      )}
    </form>
  )
}
