'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, LogOut } from 'lucide-react'

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
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/admin/dashboard" className="flex items-center gap-3 hover:opacity-80 transition">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">HEI</span>
              </div>
              <div>
                <span className="font-bold text-lg block">Admin Panel</span>
                <span className="text-xs text-gray-500">Hilltop Educational Institute</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/admin/dashboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                  pathname === '/admin/dashboard'
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{admin.full_name || 'Admin User'}</p>
              <p className="text-xs text-gray-500">{admin.email}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
