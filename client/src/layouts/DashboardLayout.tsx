import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='flex flex-col'>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default DashboardLayout