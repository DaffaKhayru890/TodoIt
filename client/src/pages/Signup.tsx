import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { BsEyeSlash } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
import { Link } from 'react-router-dom'

const Signup = () => {
  const [showPassword,setShowPassword] = React.useState<boolean>(false)

  return (
    <div className='flex justify-center items-center h-screen'>
        <Card className='w-[30%] max-w-md'>
            <CardHeader>
                <CardTitle className='text-center font-bold text-xl mb-1'>Signup</CardTitle>
                <CardDescription className='text-center'>Create new account to login</CardDescription>
            </CardHeader>
            <CardContent>
                <form action="" className='mb-3'>
                    <div>
                        <Label htmlFor="username" className='mb-2'>username</Label>
                        <Input placeholder='your username' />
                    </div>
                    <div>
                        <Label htmlFor="email" className='mb-2 mt-2'>Email</Label>
                        <Input placeholder='example@gmail.com' />
                    </div>
                    <div className='relative mb-3'>
                        <Label htmlFor="password" className='mb-2 mt-2'>password</Label>
                        <Input placeholder='***********' type={showPassword ? 'text' : 'password'} />
                        
                        <Button type='button' onClick={(e) => setShowPassword(prev => !prev)} variant='ghost' size='icon' className='absolute top-6 right-2 flex items-center'>
                            {showPassword ? (<BsEyeSlash />) : (<BsEyeSlashFill />)}
                        </Button>
                    </div>

                    <Button className='cursor-pointer'>Signup</Button>
                </form>

                <Link className='block text-center' to='/login'>
                    Already have account? 
                    <span> Login</span>
                </Link>
            </CardContent>
        </Card>
    </div>
  )
}

export default Signup