import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { useLocalStorage } from 'react-use'
import { useNavigate } from 'react-router-dom'
import {useForm,Controller} from 'react-hook-form';
import {updateCompletedSchema, type updateCompletedFormData} from '@/schemas/TodoSchema';
import { Checkbox } from "@/components/ui/checkbox"

const Inbox = () => {
  const [getTodos,setGetTodos] = useState<any[]>([]);
  const [getPage,setGetPage] = useState(1);
  const [getTotalPages,setGetTotalPages] = useState(1);
  const limit = 5;

  const [user,_] = useLocalStorage("User");

  const navigate = useNavigate();

  const {control, handleSubmit} = useForm<updateCompletedFormData>({
    defaultValues: {
      completed: false,
    }
  });

  React.useEffect(() => {
    const getTodos = async () => {
      try{
        const fetchTodos = await axios.get(`http://localhost:3000/api/todo`, { 
          params: {
            limit,
            page: getPage
          },
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          }
         });

        
        setGetTodos(fetchTodos.data.todos);
        setGetTotalPages(fetchTodos.data.totalPages);
      }catch(err) {
        console.log(err);
      }
    }

    getTodos();
  }, [getPage]);

  const handleUpdateTodo = async (todoId: number) => {
    navigate(`/dashboard/edit/${todoId}`);
  }

  const getPagesItems = () => {
    const items= [];

    for(let i = 1; i < getTotalPages; i++) {
      if(i === 1 || i === getTotalPages || (i >= getPage - 1 && i <= getPage + 1)) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink onClick={() => setGetPage(i)}>{i}</PaginationLink>
          </PaginationItem>
        )
      }else if(i === getPage - 2 || i === getPage  + 2) {
        items.push(
          <PaginationEllipsis key={i} />
        )
      }
    }

    return items;
  }

  const handleUpdateCompletedTodo = async (id: number, val: boolean) => {
    try{
      await axios.patch(`http://localhost:3000/api/todo/${id}`,{completed: val}, {
        headers: {
          Authorization: `Bearer ${user.jwt}`
        }
      });

      console.log(val);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='px-10'>
      {/* header section */}
      <div className='flex mb-4 items-center justify-between'>
        <h1 className='py-5 text-3xl font-semibold'>Inbox</h1>
        
        <Button onClick={() => navigate('/dashboard/add')} type='button'>Add</Button>
      </div>

      {/* table section */}
      <div>
        <Table>
          <TableCaption>A list of your todos.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]"></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getTodos && getTodos.map((item,index) => (
              <TableRow key={index}>
                <TableCell key={index}>
                  <Checkbox 
                    onCheckedChange={(val) => handleUpdateCompletedTodo(item.id,val)}
                  />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Button onClick={() => handleUpdateTodo(item.id)} type='button' className='bg-blue-500 hover:bg-blue-600'>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* paginations */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => {
              if(getPage > 1 ) {
                setGetPage(getPage - 1);
              }
            }} className={getPage === 1 ? "opacity-50" : ""} />
          </PaginationItem>
          
          {getPagesItems()}
          
          <PaginationItem>
            <PaginationNext aria-disabled={getPage === getTotalPages} onClick={() => {
              if(getPage < getTotalPages) {
                setGetPage(getPage + 1);
              }
            }} className={getPage === getTotalPages ? "opacity-50" : ""} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default Inbox