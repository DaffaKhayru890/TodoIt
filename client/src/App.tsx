import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout';

const Signup = React.lazy(() => import('@/pages/Signup'));
const Login = React.lazy(() => import('@/pages/Login'));
const Inbox = React.lazy(() => import('@/pages/Inbox'));
const Completed = React.lazy(() => import('@/pages/Completed'));
const Settings = React.lazy(() => import('@/pages/Settings'));

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
      </Route>
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route path='inbox' element={<Inbox />} />
        <Route path='completed' element={<Completed />} />
        <Route path='settings' element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'

const Signup = React.lazy(() => import('@/pages/Signup'));
const Login = React.lazy(() => import('@/pages/Login'));

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App