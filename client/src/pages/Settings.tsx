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
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'

const Settings = () => {
  return (
    <div className='px-10'>
        {/* title */}
        <h1 className='py-5 text-3xl font-semibold'>Settings</h1>

        {/* body section */}
        <div className='grid gap-4 grid-cols-2'>
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Edit your username and profile avatar</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action="">
                        <div className='space-y-1'>
                            <Label>Username</Label>
                            <Input type='text' />
                        </div>
                        <div>
                            <Input type='file'/>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Edit your username and profile avatar</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action="">
                        <div className='space-y-1'>
                            <Label>Username</Label>
                            <Input type='text' />
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default Settings