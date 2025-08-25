import React from 'react'
import { useLocation } from 'react-router-dom'
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { Button } from './ui/button';

export default function Navbar() {
  const location = useLocation();

  let title;
  
  switch(location.pathname) {
    case "/dashboard/inbox":
        title = "Inbox";
      break;
    case "/dashboard/completed":
        title = "Completed"
      break;
  }

  return (
    <div className='flex border-b fixed top-0 z-50 bg-white shadow p-4 border-gray-200 px-3 gap-4 w-full h-12 items-center'>
        <Button type="button" variant="ghost">
            <BsLayoutSidebarReverse  />
        </Button>
        <h1 className='text-2xl font-bold'>{title}</h1>
    </div>
  )
}
