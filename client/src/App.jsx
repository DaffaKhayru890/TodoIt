import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

// import layouts
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout';

// import components
import Loading from './components/Loading';

// import pages
const Signup = lazy(() => import("@/pages/Signup"));
const Login = lazy(() => import("@/pages/Login"));
const Inbox = lazy(() => import("@/pages/Inbox"));
const Completed = lazy(() => import("@/pages/Completed"));

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route path='/signup' element={
          <Suspense fallback={<Loading />}>
            <Signup />
          </Suspense>
        }/>
        <Route path='/login' element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }/>
      </Route>
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route path='inbox' element={
          <Suspense fallback={<Loading />}>
            <Inbox />
          </Suspense>
        }/>
        <Route path='completed' element={
          <Suspense fallback={<Loading />}>
            <Completed />
          </Suspense>
        }/>
      </Route>
    </Routes>
  )
}
