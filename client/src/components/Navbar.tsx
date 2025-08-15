import React, { use, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TbDotsVertical } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from 'axios';
import { useLocalStorage } from 'react-use';

const links = [
    {
        text: 'Inbox',
        path: '/dashboard/inbox'
    },
    {
        text: 'Completed',
        path: '/dashboard/completed'
    }
]

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userProfile,setUserProfile] = useState({});

  const [user,_] = useLocalStorage("User");
  
  React.useEffect(() => {
    const getUserProfile = async () => {
        try{ 
            const fetchUserProfile = await axios.get(`http://localhost:3000/api/user/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`
                }
            });

            setUserProfile(fetchUserProfile.data);
        }catch(err) {
            console.log(err);
        }
    };

    getUserProfile();
  }, []);

  return (
    <nav className='px-10 h-12 flex justify-between items-center bg-[#FAFAFA] border-b border-gray-200'>
        <h1 className='font-bold text-xl'>TodoIt</h1>

        {/* links */}
        <div className='space-x-4'>
            {links.map((item,index) => {
                const isAcive = location.pathname === item.path;

                return(
                    <Link key={index} to={item.path}
                        className={cn('rounded-sm p-2', isAcive ? "bg-black text-white" : "")}
                    >
                        <span>{item.text}</span>
                    </Link>
                )
            })}
        </div>

        {/* profile */}
        <div className='flex items-center justify-between space-x-3'>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
                <h3 className='text-sm m-0'>{userProfile.email}</h3>
                <p className='text-sm'>{userProfile.username}</p>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <TbDotsVertical className='h-4 w-4 cursor-pointer' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mt-4 mr-2'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </nav>
  )
}

export default Navbar