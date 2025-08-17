import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout';
import PrivateRoute from './hooks/PrivateRoute';
import NonPrivateRoute from './hooks/NonPrivateRoute';

const Signup = React.lazy(() => import('@/pages/Signup'));
const Login = React.lazy(() => import('@/pages/Login'));
const Inbox = React.lazy(() => import('@/pages/Inbox'));
const Completed = React.lazy(() => import('@/pages/Completed'));
const Settings = React.lazy(() => import('@/pages/Settings'));
const AddTodo = React.lazy(() => import('@/pages/AddTodo'));
const EditTodo = React.lazy(() => import('@/pages/EditTodo'));

const App = () => {
  return (
    <Routes>
      <Route path='/' element={
        <NonPrivateRoute>
          <AuthLayout />
        </NonPrivateRoute>
      }>
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
      </Route>
      <Route path='/dashboard' element={
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      }>
        <Route path='inbox' element={<Inbox />} />
        <Route path='completed' element={<Completed />} />
        <Route path='add' element={<AddTodo />} />
        <Route path='edit/:id' element={<EditTodo />} />
        <Route path='settings' element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App;