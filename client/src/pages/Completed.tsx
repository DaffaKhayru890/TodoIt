import { Button } from '@/components/ui/button'
import axios from 'axios';
import React, { useState } from 'react'
import { useLocalStorage } from 'react-use';
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
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

const Completed = () => {
  const limit = 5;

  const [page,setPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1)
  const [todos,setTodos] = useState([]);

  const [user,_] = useLocalStorage("User");

  const handleDeleteTodo = async (todoId: number) => {
    try{
      await axios.delete(`http://localhost:3000/api/todo/${todoId}`, {
        headers: {
          Authorization: `Bearer ${user.jwt}`
        }
      });

      toast.success("Delete success");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }catch(err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    const getCompletedTodos = async () => {
      try{
        const fetchCompletedTodos = await axios.get(`http://localhost:3000/api/todo?completed=${true}&page=${page}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${user.jwt}`
          }
        });

        console.log(fetchCompletedTodos.data.todos);
        setTodos(fetchCompletedTodos.data.todos)
        setPage(fetchCompletedTodos.data.page);
        setTotalPages(fetchCompletedTodos.data.totalPages);
      }catch(err) {

      }
    }

    getCompletedTodos();
  }, []);

  const getPagesItems = () => {
      const items= [];
  
      for(let i = 1; i < totalPages; i++) {
        if(i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink onClick={() => setPage(i)}>{i}</PaginationLink>
            </PaginationItem>
          )
        }else if(i === page - 2 || i === page  + 2) {
          items.push(
            <PaginationEllipsis key={i} />
          )
        }
      }
  
      return items;
    }

  return (
    <div className='px-10'>
      {/* header section */}
      <div className='flex mb-4 items-center justify-between'>
        <h1 className='py-5 text-3xl font-semibold'>Inbox</h1>
        
        <Button className='bg-red-500 hover:bg-red-600 cursor-pointer' type='button'>Remove All</Button>
      </div>
      
      {/* table section */}
      <div>
        {todos.length === 0 ? "No completed todos" : <Table>
          <TableCaption>A list of your todos.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]">
                <Input type='checkbox' className='w-4 h-4' />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((item,index) => (
              <TableRow key={index}>
                <TableCell key={index}>
                  <Input type='checkbox' className='w-4 h-4' />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Button type='button' onClick={() => handleDeleteTodo(item.id)} className='bg-red-500 hover:bg-red-600'>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>}
      </div>

      {/* paginations */}
      {todos.length === 0 ? "" : <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => {
              if(page > 1 ) {
                setPage(page - 1);
              }
            }} className={page === 1 ? "opacity-50" : ""} />
          </PaginationItem>
          
          {getPagesItems()}
          
          <PaginationItem>
            <PaginationNext aria-disabled={page === totalPages} onClick={() => {
              if(page < totalPages) {
                setPage(page + 1);
              }
            }} className={page === totalPages ? "opacity-50" : ""} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>}
    </div>
  )
}

export default Completed