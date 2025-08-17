import React from 'react'
import { Navigate } from 'react-router-dom';

const NonPrivateRoute = ({children}: {children: JSX.Element}) => {
  const token = localStorage.getItem("User");
  return !token ? children : <Navigate to="/dashboard/inbox" replace />
}

export default NonPrivateRoute