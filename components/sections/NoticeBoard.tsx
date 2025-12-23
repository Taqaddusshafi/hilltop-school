'use client'

import { Bell, Megaphone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Notice {
  id: number
  message: string
  display_order: number
}

export default function NoticeBoard() {
  const [notices, setNotices] = useState<Notice[]>([
    { id: 1, message: "Admissions Open for Academic Year 2026-27", display_order: 1 },
    { id: 2, message: "Annual Sports Day - 25th November 2025", display_order: 2 },
    { id: 3, message: "Parent-Teacher Meeting - 30th November 2025", display_order: 3 },
    { id: 4, message: "Winter Vacation: 20th December to 5th January", display_order: 4 }
  ])

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const supabase = createClient()
        
        const { data, error } = await supabase
          .from('notices')
          .select('id, message, display_order')
          .eq('is_active', true)
          .order('display_order', { ascending: true })

        if (data && data.length > 0) {
          setNotices(data)
        }
      } catch (error) {
        console.error('Error fetching notices:', error)
      }
    }

    fetchNotices()

    // Set up real-time subscription for live updates
    const supabase = createClient()
    const channel = supabase
      .channel('notices-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notices'
        },
        () => {
          fetchNotices()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-500 to-red-600"></div>
      
      {/* Animated Shimmer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-red-700 to-transparent"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-red-700 to-transparent"></div>
      
      {/* Content Container */}
      <div className="relative py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            {/* Icon with Glow */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-md animate-pulse-glow"></div>
              <div className="relative bg-white/20 backdrop-blur-sm rounded-full p-2.5 border border-white/30">
                <Megaphone size={22} className="text-white animate-pulse" />
              </div>
            </div>
            
            {/* Label Badge */}
            <div className="hidden sm:flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-white font-semibold text-sm uppercase tracking-wide">Live Updates</span>
            </div>
            
            {/* Marquee Container */}
            <div className="flex-1 overflow-hidden mask-gradient">
              <div className="flex animate-marquee whitespace-nowrap">
                {notices.concat(notices).map((notice, index) => (
                  <span 
                    key={`${notice.id}-${index}`} 
                    className="mx-8 text-sm md:text-base font-medium text-white flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-lg shadow-yellow-300/50"></span>
                    {notice.message}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
    </div>
  )
}
