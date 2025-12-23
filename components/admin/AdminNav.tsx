'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, LogOut, ExternalLink, Bell, Settings, Home, HelpCircle } from 'lucide-react'

export default function AdminNav({ admin }: { admin: any }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/admin/dashboard" className="flex items-center gap-3 hover:opacity-90 transition group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl blur-sm opacity-60"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">HEI</span>
                </div>
              </div>
              <div>
                <span className="font-bold text-lg text-white block group-hover:text-green-300 transition-colors">Admin Panel</span>
                <span className="text-xs text-gray-400">Hilltop Educational Institute</span>
              </div>
            </Link>

            {/* Quick Links */}
            <div className="hidden lg:flex items-center gap-1 ml-4 border-l border-gray-700 pl-6">
              <Link
                href="/admin/dashboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === '/admin/dashboard'
                    ? 'bg-green-500/20 text-green-400 shadow-inner'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition"
              >
                <Home size={18} />
                View Site
                <ExternalLink size={14} className="opacity-50" />
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"></span>
            </button>
            
            {/* User Info */}
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {(admin.full_name || 'A').charAt(0).toUpperCase()}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">{admin.full_name || 'Admin User'}</p>
                <p className="text-xs text-gray-400">{admin.role || 'Administrator'}</p>
              </div>
            </div>
            
            {/* Logout */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-300 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
