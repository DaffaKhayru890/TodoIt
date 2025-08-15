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
import { Link, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {loginSchema, type LoginFormData} from '@/schemas/UserSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useLocalStorage} from 'react-use';

interface UserDataFromLogin {
    id: number,
    jwt: string,
}

const Login = () => {
  const [showPassword,setShowPassword] = React.useState<boolean>(false);

  const [_,setUser] = useLocalStorage<UserDataFromLogin>("User", {});

  const navigate = useNavigate();

  const {register,handleSubmit, formState: {errors}} = useForm<LoginFormData>({resolver: zodResolver(loginSchema)});

  const handleSignup = async (data: LoginFormData) => {
    try{
        const response = await axios.post("http://localhost:3000/api/user/login", data);

        setUser({
            id: response.data.id,
            jwt: response.data.jwt,
        })

        toast.success("Success to login user");

        setTimeout(() => {
            navigate('/dashboard/inbox');
        }, 3000);
    }catch(err) {
        console.log(err);

        if(err.response.data.error === 'User not found') {
            toast.error("User not found");
        }
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
        <Card className='w-[30%] max-w-md'>
            <CardHeader>
                <CardTitle className='text-center font-bold text-xl mb-1'>Login</CardTitle>
                <CardDescription className='text-center'>Login to start using todoit</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleSignup)} className='mb-3'>
                    <div>
                        <Label htmlFor="email" className='mb-2 mt-2'>Email</Label>
                        <Input {...register("email")} placeholder='example@gmail.com' />
                        {errors.email && (<p className='text-sm text-red-500'>{errors.email.message}</p>)}
                    </div>
                    <div className='relative mb-3'>
                        <Label htmlFor="password" className='mb-2 mt-2'>password</Label>
                        <Input {...register("password")} placeholder='***********' type={showPassword ? 'text' : 'password'} />
                        {errors.password && (<p className='text-sm text-red-500'>{errors.password.message}</p>)}

                        <Button type='button' onClick={(e) => setShowPassword(prev => !prev)} variant='ghost' size='icon' className='absolute top-6 right-2 flex items-center'>
                            {showPassword ? (<BsEyeSlash />) : (<BsEyeSlashFill />)}
                        </Button>
                    </div>

                    <Button className='cursor-pointer'>Signup</Button>
                </form>

                <Link className='block text-center' to='/signup'>
                    Don't have account? 
                    <span> Signup</span>
                </Link>
            </CardContent>
        </Card>
    </div>
  )
}

export default Login