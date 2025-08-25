import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi"
import { Link } from 'react-router-dom';

export default function Login() {
  const [show, setShow] = useState("");

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center px-20'>
      <div className='w-1/2'>
        {/* header */}
        <header className='space-y-1 mb-3'>
          <h1 className='text-2xl text-center font-semibold'>Signup</h1>
          <p>Login to start using todoit app</p>
        </header>

        {/* form */}
        <form className='space-y-2 mb-2'>
          <div className='space-y-1'>
            <Label>Email</Label>
            <Input placeholder="example@gmail.com" />
          </div>
          <div className='space-y-1'>
            <Label>Password</Label>
            <div className='relative'>
              <Input type={show ? "text" : "password"} placeholder="***********" />

              <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={() => setShow(!show)}>
                {show ? (
                  <HiEyeOff className="h-4 w-4" />
                ) : (
                  <HiEye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button className="w-full">Login</Button>
        </form>

        <div className="mb-2 flex items-center gap-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className='space-y-2 mb-2'>
          <Button variant='outline' className="w-full">
            <FaGoogle />
            <span>continue with google</span>
          </Button>
          <Button variant="outline" className="w-full">
            <FaGithub />
            <span>continue with github</span>
          </Button>
        </div>

        <span className='flex justify-center'>
          Don't have account?
          <Link to="/signup" className='ml-1 duration-200 hover:text-blue-500'>Signup</Link>
        </span>
      </div>
    </div>
  )
}
