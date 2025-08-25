import React from 'react'
import Greetings from '../components/Greetings'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className='h-screen w-full grid grid-cols-2'>
      <Greetings />
      <Outlet />
    </div>
  )
}
