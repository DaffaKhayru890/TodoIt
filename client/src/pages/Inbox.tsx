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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Inbox = () => {
  return (
    <div className='px-10'>
      {/* header section */}
      <div className='flex mb-4 items-center justify-between'>
        <h1 className='py-5 text-3xl font-semibold'>Inbox</h1>
        
        <Dialog>
          <DialogTrigger className='bg-black text-white rounded-md p-2'>Add</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new todo list</DialogTitle>
            </DialogHeader>
            
            <form action="">
              <div className='space-y-1'>
                <Label>Title</Label>
                <Input type='text' />
              </div>
              <div className='mt-2 space-y-1'>
                <Label>Desription</Label>
                <Input type='text' />
              </div>
              <div className='mt-2 space-y-1'> 
                <Label>Status</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">PENDING</SelectItem>
                    <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
                    <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className='mt-2'>Submit</Button>
            </form>  
          </DialogContent>
        </Dialog>
      </div>

      {/* table section */}
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]">
                <Input type='checkbox' className='w-4 h-4' />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* paginations */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default Inbox