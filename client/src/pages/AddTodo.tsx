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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {useForm,Controller} from 'react-hook-form';
import {loginSchema, type LoginFormData} from '@/schemas/UserSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {postSchema, type postFormData} from '@/schemas/TodoSchema';
import axios from 'axios'
import { useLocalStorage } from 'react-use'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AddTodo = () => {
  const [user,_] = useLocalStorage("User");

  const navigate = useNavigate();

  const {control,register,handleSubmit, formState: {errors}} = useForm<postFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
        status: 'PENDING'
    }
  });

  const handleAddTodo = async (data: postFormData) => {
    try{
        console.log(data);

        const addTodo = await axios.post(`http://localhost:3000/api/todo`, data, {
            headers: {
                Authorization: `Bearer ${user.jwt}`
            }
        });

        toast.success(addTodo.data.message);

        setTimeout(() => {
            navigate('/dashboard/inbox')
        }, 2000);
    }catch(err) {
        toast.error("Failed to add todo");
        console.log(err);
    }
  }

  return (
    <div className='px-10'>
        <h1 className='py-5 text-3xl font-semibold'>Add Todo</h1>

        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Add Todo</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleAddTodo)}>
                        <div className='space-y-1 mb-2'>
                            <Label>Title</Label>
                            <Input {...register("title")} placeholder='todo title' />
                        </div>
                        <div className='space-y-1 mb-2'>
                            <Label>Description</Label>
                            <Input {...register("description")} placeholder='description' />
                        </div>
                        <div className='space-y-1 mb-2'>
                            <Label>Status</Label>
                            <Controller 
                                name="status"
                                control={control}
                                render={({field}) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="status">
                                                {field.value}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PENDING">PENDING</SelectItem>
                                            <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        
                        <Button className='mt-1'>Add Todo</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default AddTodo