'use client'

import { Bell } from 'lucide-react'

export default function NoticeBoard() {
  const notices = [
    "Admissions Open for Academic Year 2026-27",
    "Annual Sports Day - 25th November 2025",
    "Parent-Teacher Meeting - 30th November 2025",
    "Winter Vacation: 20th December to 5th January"
  ]

  return (
    <div className="bg-red-600 text-white py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <Bell size={20} className="flex-shrink-0 animate-pulse" />
          <div className="flex-1 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {notices.concat(notices).map((notice, index) => (
                <span key={index} className="mx-8 text-sm md:text-base">
                  • {notice}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
