'use client'

import { Bell } from 'lucide-react'
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
        // Keep fallback data
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
    <div className="bg-red-600 text-white py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <Bell size={20} className="flex-shrink-0 animate-pulse" />
          <div className="flex-1 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {notices.concat(notices).map((notice, index) => (
                <span key={`${notice.id}-${index}`} className="mx-8 text-sm md:text-base">
                  • {notice.message}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
