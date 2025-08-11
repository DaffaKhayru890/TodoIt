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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


const Signup = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <Card className='w-[30%] max-w-md'>
            <CardHeader>
                <CardTitle className='text-center font-bold text-xl mb-1'>Signup</CardTitle>
                <CardDescription className='text-center'>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <form action="">
                    <Label htmlFor="username" className='mb-4'>username</Label>
                    <Input />
                    <Label htmlFor="email" className='mb-4 mt-4'>Email</Label>
                    <Input />
                    <Label htmlFor="password" className='mb-4 mt-4'>password</Label>
                    <Input />
                </form>
            </CardContent>
            <CardFooter>
                <div className="flex justify-center text-gray-500 my-4">
                    <div className="border-t-2 border-gray-300"></div>
                    <span className="mx-3">or</span>
                    <div className="border-t-2 border-gray-300"></div>
                </div>
            </CardFooter>
        </Card>
    </div>
  )
}

export default Signup