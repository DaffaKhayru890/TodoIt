import React, { useState } from 'react'
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
import { Button } from '@/components/ui/button'
import {useForm} from 'react-hook-form';
import {updateSchema, type updateFormData} from '@/schemas/UserSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import axios from 'axios'
import { useLocalStorage } from 'react-use'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
  const {register,handleSubmit, formState: {errors}} = useForm<updateFormData>({resolver: zodResolver(updateSchema)});
  
  const [user,_] = useLocalStorage("User");

  const [file,setFile] = useState("");

  const navigate = useNavigate();

  const handleUpdateUserProfile = async (data: updateFormData) => {
    try{
        await axios.patch(`http://localhost:3000/api/user/update`, data, {
            headers: {
                Authorization: `Bearer ${user.jwt}`
            }
        });

        toast.success("Success update new profile");
    }catch(err) {
        console.log(err);
    }
  };

  const handleDeleteUser = async () => {
    try{
        await axios.delete(`http://localhost:3000/api/user/delete`, {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            }
        });
        
        localStorage.clear();
        navigate('/login');
    }catch(err) {

    }
  };

  const handleUploadProfilePicture = async () => {
    const formdata = new FormData();
    formdata.append("file", file);

    try{
        const uploadProfilePicture = await axios.patch(`http://localhost:3000/api/user/upload`, formdata, {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
                "Content-Type": "multipart/form-data"
            }
        });

        toast.success(uploadProfilePicture.data.message);
    }catch(err) {
        console.log(err);
    }
  };

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
                    <form onSubmit={handleSubmit(handleUpdateUserProfile)}>
                        <div className='space-y-1 mb-2'>
                            <Label>Username</Label>
                            <Input {...register('username')} type='text' placeholder='your new username' />
                        </div>
                        <div className='space-y-1 mb-2'>
                            <Label>Password</Label>
                            <Input {...register('password')} type='password' placeholder='**********' />
                        </div>
                        <div className='space-y-1 mb-2'>
                            <Label>Profile Picture</Label>
                            <Input name='profile' onChange={(e) => setFile(e.target.files[0])} type='file'/>
                        </div>

                        <div className='flex justify-between'>
                            <Button>Update Profile</Button>
                            <Button onClick={() => handleDeleteUser()} type='button' className='bg-red-500 hover:bg-red-600'>Delete User</Button>
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
                    <form onSubmit={handleSubmit(handleUpdateUserProfile)}>
                        <div className='space-y-1 mb-2'>
                            <Label>Profile Picture</Label>
                            <Input name='profile' onChange={(e) => setFile(e.target.files[0])} type='file'/>
                        </div>

                        <div className='flex justify-between'>
                            <Button type='button' onClick={() => handleUploadProfilePicture()}>Update Profile Picture</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default Settings