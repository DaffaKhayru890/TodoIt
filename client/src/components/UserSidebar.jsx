import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoInbox } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";
import { NavLink, useLocation } from 'react-router-dom';

const sidebarLinks = [
  {
    path: "/dashboard/inbox",
    text: "inbox",
    icon: GoInbox,
  },
  {
    path: "/dashboard/completed",
    text: "completed",
    icon: FaCheckCircle,
  }
]

export default function UserSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="col-span-2">
      {/* headers */}
      <SidebarHeader />

      {/* content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Todo</SidebarGroupLabel>
          <SidebarMenu asChild>
            {sidebarLinks.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <SidebarMenuButton className={`p-0`}>
                  <NavLink
                    to={isActive ? "#" : item.path} // prevent navigation if already active
                    className={`flex items-center gap-2 w-full
                        ${isActive
                        ? "bg-primary text-white cursor-default hover:bg-primary" // active style, hover disabled
                        : "hover:bg-accent hover:text-accent-foreground"} 
                        rounded-md px-2 py-1 transition-colors`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.text}
                  </NavLink>
                </SidebarMenuButton>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* footer */}
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <SidebarMenuButton asChild>
              <div className="flex items-center justify-between gap-2 py-7 px-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-sm font-semibold truncate max-w-[140px]">daffakhayu</h1>
                  <p className='text-sm truncate max-w-[140px]'>daffakhayru@gmail.com</p>
                </div>
                <BsThreeDotsVertical />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mb-2 ml-3" side="right" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
