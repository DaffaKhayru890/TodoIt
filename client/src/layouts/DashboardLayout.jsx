import Navbar from '@/components/Navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import UserSidebar from '@/components/UserSidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="w-full flex h-screen">
      <SidebarProvider>
        <UserSidebar />

        <div className='w-full flex flex-col'>
          <Navbar />
          <Outlet />
        </div>
      </SidebarProvider>
    </div>

  )
}
