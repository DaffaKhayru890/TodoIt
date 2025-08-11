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